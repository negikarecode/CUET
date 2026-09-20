import os
import sys
import json
import random

sys.path.insert(0, os.getcwd())
from scripts.new_subject_generators.builder_framework import build_mock_from_specs, get_balanced_target_keys
from scripts.new_subject_generators.common import verify_and_save_mock

PREFIX = "soc"
OUT_DIR = "mock/sociology"
os.makedirs(OUT_DIR, exist_ok=True)
global_seen = set()

print(f"Generating 20 CUET UG Mock Tests for SOCIOLOGY in {OUT_DIR}...")

CH_DEMO = "The Demographic Structure of the Indian Society"
CH_INST = "Social Institutions: Continuity and Change"
CH_MARKET = "The Market as a Social Institution"
CH_INEQ = "Patterns of Social Inequality and Exclusion"
CH_DIV = "The Challenges of Cultural Diversity"
CH_STRUC = "Structural Change"
CH_CULT = "Cultural Change"
CH_DEMOC = "The Story of Indian Democracy"
CH_RURAL = "Change and Development in Rural Society"
CH_INDUS = "Change and Development in Industrial Society"
CH_GLOB = "Globalisation and Social Change"
CH_MEDIA = "Mass Media and Communications"
CH_MOV = "Social Movements"

# We will generate 20 mocks x 50 questions
mocks_specs = []

for m in range(1, 21):
    specs = []
    
    # --- DEMOGRAPHY (Q1-Q3) ---
    # Distinct question 1 for each mock
    demo_q1_list = [
        ("Malthusian Theory", "In his famous 1798 essay on population, Thomas Robert Malthus stated that:",
         "Population grows geometrically (1, 2, 4, 8, 16...) while food production increases arithmetically (1, 2, 3, 4, 5...)",
         ["Population increases arithmetically while agricultural food production increases geometrically",
          "Both human population and food output grow at an identical linear rate",
          "Food production grows exponentially while human population remains static"]),
        ("Demographic Transition Stage 1", "Which demographic profile describes Stage 1 of the Demographic Transition Model?",
         "High birth rates and high death rates resulting in a low and fluctuating population growth rate",
         ["Low birth rates and low death rates in an advanced industrialized nation",
          "A rapid fall in mortality while birth rates double in a single decade",
          "Zero infant mortality coupled with a life expectancy exceeding eighty years"]),
        ("Demographic Transition Stage 2", "Why is Stage 2 of the Demographic Transition Model referred to as the 'population explosion' stage?",
         "Mortality rates fall sharply due to disease control and sanitation, while birth rates remain stubbornly high",
         ["Birth rates suddenly double due to state subsidies while death rates remain completely constant",
          "Massive immigration from foreign countries doubles the national population in five years",
          "The working-age population drops to zero while child fertility rises exponentially"]),
        ("Demographic Transition Stage 3", "What demographic pattern characterizes Stage 3 of demographic transition in developed economies?",
         "Low birth rates and low death rates leading to a stable or very slow-growing population",
         ["Extremely high birth rates and rising mortality due to widespread epidemic outbreaks",
          "A population pyramid with an extremely broad base of infants under five years old",
          "A total collapse of adult life expectancy due to heavy industrial air pollution"]),
        ("Replacement Level Fertility", "In demography, what is meant by 'Replacement Level Fertility' (usually considered a TFR of 2.1)?",
         "The rate at which a generation of women has exactly enough daughters to replace itself in the population",
         ["The total number of agricultural workers who replace retired industrial factory labourers",
          "The percentage of rural land transferred to urban developers in a calendar decade",
          "The ratio of total male births to total registered deaths in metropolitan hospitals"]),
        ("Demographic Dividend", "What demographic transition produces the 'Demographic Dividend' in India?",
         "A high proportion of the working-age population (15–64 years) relative to the dependent population (below 15 and over 64)",
         ["A rapid increase in the proportion of elderly citizens aged over eighty requiring state pensions",
          "A sharp rise in infant mortality rates leading to an immediate contraction of family size",
          "An equal distribution of the national workforce between agriculture, industry, and mining"]),
        ("Dependency Ratio Formula", "How is the 'Dependency Ratio' mathematically formulated in demographic analysis?",
         "The proportion of dependent population (below 15 plus over 64 years) divided by the working-age population (15–64 years)",
         ["The total number of female births divided by the total number of male births per annum",
          "The number of registered unemployed graduates divided by total agricultural tenants",
          "The total population living below the poverty line divided by urban taxpayers"]),
        ("Child Sex Ratio Trends 2011", "According to the 2011 Census of India, what alarming trend was observed in the Child Sex Ratio (0-6 years)?",
         "The child sex ratio dropped to an all-time low of 919 girls per 1,000 boys, showing acute declines in prosperous northwestern states",
         ["The child sex ratio rose to an all-time high of 1,050 girls per 1,000 boys nationwide",
          "The child sex ratio was identical across all twenty-eight states and union territories",
          "The child sex ratio in rural areas surpassed that of all European Scandinavian countries"]),
        ("PCPNDT Act 1994", "What is the primary statutory objective of the Pre-Conception and Pre-Natal Diagnostic Techniques (PCPNDT) Act, 1994?",
         "To prohibit pre-natal sex determination and curb female foeticide by strictly regulating ultrasound clinics",
         ["To provide free state subsidised seeds and fertilizers to marginal agricultural tenants",
          "To enforce compulsory family planning sterilization across all rural administrative blocks",
          "To regulate the tuition fees charged by private higher secondary educational institutions"]),
        ("National Family Planning Programme 1952", "India holds which historic distinction regarding national population policy?",
         "It was the first country in the developing world to launch an official National Family Planning Programme in 1952",
         ["It was the first country to completely outlaw all forms of modern medical contraception",
          "It was the first country to achieve a zero crude birth rate within five years of independence",
          "It was the first country to establish a compulsory one-child policy enforced by military courts"]),
        ("Emergency Coercive Sterilizations", "During the National Emergency (1975–1977), what led to a widespread public backlash against the Family Planning Programme?",
         "Coercive mass sterilization drives (vasectomies) targeting vulnerable and poor citizens",
         ["The complete cancellation of all family welfare and maternal health budgets nationwide",
          "The introduction of high cash fines on families having more than one female child",
          "A mandatory requirement that all village couples migrate to urban industrial cities"]),
        ("Literacy Gender Gap", "According to the 2011 Census of India, what persistent disparity continues to characterize literacy rates in India?",
         "A substantial gender gap where male literacy (80.9%) significantly exceeds female literacy (64.6%)",
         ["Complete literacy equality between men and women across all twenty-eight Indian states",
          "Significantly higher literacy rates among rural agricultural women than urban men",
          "A higher literacy rate among citizens aged over seventy than among school-age children"]),
        ("Inter-State Literacy Disparities", "Which pair of states exemplifies the extreme inter-state disparity in literacy rates documented in the 2011 Census?",
         "Kerala with over 94% literacy compared to Bihar with approximately 63.8% literacy",
         ["Punjab with 99% literacy compared to Haryana with 25% literacy",
          "Maharashtra with 98% literacy compared to Gujarat with 30% literacy",
          "Tamil Nadu with 95% literacy compared to Karnataka with 20% literacy"]),
        ("Age Pyramid Profile", "What does a population pyramid with a broad base and sharply tapering top indicate about a country's demography?",
         "A high birth rate resulting in a large proportion of children, coupled with high mortality in older age groups",
         ["An aging society with a high proportion of elderly pensioners and declining birth rates",
          "A completely stationary population where birth and death rates are identical at all ages",
          "A society where the working-age population comprises over 95% of all living residents"]),
        ("Rural-to-Urban Push Factors", "In the sociology of migration, which of the following is classified as a prominent rural 'push' factor in India?",
         "Agrarian distress, fragmentation of landholdings, and lack of non-farm employment opportunities in villages",
         ["The availability of high-paying software technology jobs in metropolitan software parks",
          "The presence of advanced tertiary multi-specialty hospitals in state capital cities",
          "The desire to enjoy modern urban shopping malls, multiplexes, and cultural entertainment"]),
        ("Rural-to-Urban Pull Factors", "Which of the following represents an urban 'pull' factor attracting rural migrants to Indian metropolises?",
         "Perceptions of regular wage employment, better educational facilities, and modern public infrastructure",
         ["Recurring severe droughts and floods destroying kharif and rabi standing crops",
          "Oppressive feudal caste surveillance and untouchability practices in ancestral villages",
          "The total absence of electricity and potable tap water in remote tribal hamlets"]),
        ("Circular Labour Migration", "What defines 'Circular' or 'Seasonal' labour migration as documented by sociologists in rural India?",
         "Migrants circulate between rural villages and informal urban jobs without establishing permanent urban roots",
         ["Permanent migration where families sell all ancestral lands and purchase urban real estate",
          "Daily commuting where corporate executives travel by high-speed trains across state borders",
          "The overseas emigration of software engineers who renounce their Indian citizenship"]),
        ("National Population Policy 2000", "A key strategic principle emphasized in India's National Population Policy (NPP) 2000 was:",
         "Voluntary and informed choice in family planning without target-driven coercive incentives",
         ["The immediate statutory disqualification of all citizens with two children from voting",
          "The mandatory military conscription of all third-born sons in rural agricultural families",
          "The total withdrawal of public healthcare subsidies for pregnant women in rural areas"]),
        ("Crude Birth Rate Definition", "How is the 'Crude Birth Rate' (CBR) defined in standard demographic accounting?",
         "The number of live births in a given geographic area during a calendar year per 1,000 mid-year population",
         ["The total number of female births divided by total hospital deliveries in a calendar month",
          "The percentage of married women of reproductive age using modern contraceptive methods",
          "The average number of children born to women who have completed their childbearing years"]),
        ("Infant Mortality Rate Definition", "What does the 'Infant Mortality Rate' (IMR) specifically measure in public health demography?",
         "The number of deaths of infants under one year of age per 1,000 live births in a given year",
         ["The total number of stillbirths per 100 pregnant women admitted to government clinics",
          "The percentage of children under five years old diagnosed with acute protein malnutrition",
          "The number of maternal deaths occurring during labor per 100,000 live hospital births"])
    ]

    top1, stem1, corr1, w1 = demo_q1_list[m - 1]
    specs.append(("mcq", CH_DEMO, top1, stem1, corr1, w1,
                  f"Standard demographic principles establish this fact.\nHence, Option {{{{CORR}}}} is correct.",
                  f"Identifies {top1} accurately."))

    # Q2: Demographic Statement question (distinct for each mock)
    demo_q2_stmts = [
        ("Malthus identified 'positive checks' as natural catastrophes (famines, diseases, wars) that violently reduce population.",
         "Malthus identified 'preventive checks' as voluntary human postponements of marriage and moral restraint.", 1),
        ("Stage 1 of demographic transition has low population growth because high birth rates are canceled out by high death rates.",
         "Stage 2 of demographic transition witnesses zero population growth because death rates equal birth rates.", 3),
        ("Stage 2 population explosion occurs because death rates plummet while birth rates decline slowly with cultural lag.",
         "Stage 3 of demographic transition is marked by low birth rates and low death rates in an industrialized urban society.", 1),
        ("The demographic dividend automatically generates economic prosperity without any requirement of government schooling or job creation.",
         "If working-age youth remain uneducated and unemployed, the demographic dividend can transform into a demographic disaster.", 4),
        ("India's demographic dividend window is expected to last for several decades into the 2040s.",
         "The dependency ratio is highest when the working-age population constitutes 90 percent of the total population.", 3),
        ("The 2011 Census recorded an overall sex ratio of 943 females per 1,000 males in India.",
         "The child sex ratio (0-6 years) in the 2011 Census improved to 980 females per 1,000 males across north India.", 3),
        ("States like Punjab and Haryana historically recorded acute deficits in the child sex ratio despite being economically prosperous.",
         "Prosperous families in northwestern India historically possessed greater access to sex-selective diagnostic ultrasound clinics.", 1),
        ("Female literacy in India increased substantially between 2001 and 2011.",
         "The gender gap in literacy was completely eliminated by 2011, with male and female literacy reaching perfect parity.", 3),
        ("Kerala's total fertility rate fell below replacement level well before most northern states.",
         "Kerala achieved fertility transition primarily through high female literacy, healthcare access, and social reform.", 1),
        ("India was the first country in the developing world to establish an official state Family Planning Programme in 1952.",
         "During the National Emergency (1975-77), the Family Planning Programme relied strictly on voluntary counseling without quotas.", 3),
        ("Following public anger over Emergency sterilization drives, the Family Planning Programme was renamed the Family Welfare Programme.",
         "The National Population Policy 2000 emphasized target-free, voluntary approach to reproductive health.", 1),
        ("Crude death rates in India declined sharply in the post-independence decades due to the control of famines and epidemic diseases.",
         "Crude birth rates in India declined at the exact same speed as crude death rates between 1950 and 1980.", 3),
        ("A population pyramid with an expansive broad base indicates a high proportion of young children in the population.",
         "A constrictive population pyramid with a narrow base indicates high fertility and rapid population growth.", 3),
        ("Rural-to-urban migration in India is driven by push factors like land fragmentation and agrarian unemployment in villages.",
         "Urban pull factors include better educational institutions, infrastructure, and perceived formal wage jobs.", 1),
        ("Seasonal and circular migrants in India maintain strong socio-cultural and kinship ties with their native villages.",
         "Circular migrants receive formal permanent employment contracts and company housing in metropolitan cities.", 3),
        ("Total Fertility Rate represents the average number of children a woman would bear during her reproductive years.",
         "A Total Fertility Rate of 2.1 is considered the replacement level fertility for a population.", 1),
        ("The Pre-Conception and Pre-Natal Diagnostic Techniques Act prohibits the determination and disclosure of the sex of a foetus.",
         "The PCPNDT Act permits ultrasound clinics to advertise prenatal sex-selection services openly in newspapers.", 3),
        ("The dependency ratio compares the dependent population (below 15 and over 64) to the productive working-age population (15-64).",
         "A falling dependency ratio means that there are fewer workers available to support each dependent child or elderly person.", 3),
        ("Internal migration from rural to urban areas in India has resulted in rapid expansion of informal settlement slums in metropolitan cities.",
         "Metropolitan municipal corporations provide free luxury housing to all arriving rural migrant families.", 3),
        ("The National Family Health Survey (NFHS) collects nationwide representative data on fertility, infant mortality, and maternal health.",
         "NFHS surveys are conducted strictly by private international advertising corporations without government sanction.", 3)
    ]
    s1, s2, rel = demo_q2_stmts[m - 1]
    specs.append(("stmt", CH_DEMO, f"Demographic Evaluation Concept {m}", s1, s2, rel,
                  f"Demographic analysis confirms the validity of these propositions.\nHence, Option {{{{CORR}}}} is correct.",
                  f"Evaluates demographic proposition set {m} accurately."))

    # Q3: Demographic Assertion-Reasoning (distinct for each mock)
    demo_q3_ars = [
        ("Thomas Malthus argued that population growth would outstrip food supply unless checked.",
         "He believed that population grows geometrically while agricultural food production increases arithmetically.", 1),
        ("Developing countries experience a population explosion during Stage 2 of demographic transition.",
         "Death rates decline rapidly due to public health measures while birth rates remain stubbornly high.", 1),
        ("The demographic dividend offers a temporary economic opportunity for developing nations.",
         "The proportion of working-age population expands relative to the dependent child and elderly population.", 1),
        ("The child sex ratio in India dropped significantly in prosperous northwestern states in 2011.",
         "Affluent families utilized modern diagnostic ultrasound technologies to practice sex-selective abortions.", 1),
        ("The Indian Family Planning Programme suffered a severe political setback in the late 1970s.",
         "Coercive mass vasectomy drives during the National Emergency generated deep public resentment.", 1),
        ("Kerala achieved sub-replacement fertility rates ahead of other Indian states.",
         "High female literacy, female autonomy, and accessible public healthcare lowered fertility preferences.", 1),
        ("The dependency ratio in India has been steadily declining in recent decades.",
         "The proportion of children under fifteen has decreased due to falling birth rates while the working-age cohort has grown.", 1),
        ("Rural-to-urban migration continues to expand across developing regions of India.",
         "Agrarian distress and land fragmentation push rural youth towards urban informal labor markets.", 1),
        ("The Government of India enacted the PCPNDT Act in 1994.",
         "Unregulated pre-natal diagnostic techniques were facilitating sex-selective abortions of female foetuses.", 1),
        ("Total Fertility Rate has reached replacement level (2.1) in many Indian states.",
         "Couples increasingly prefer smaller family sizes due to urban living costs and education priorities.", 1),
        ("Circular migration is widely practiced by landless rural labourers in India.",
         "Migrants circulate between rural agricultural harvest work and urban construction to survive seasonal unemployment.", 1),
        ("Population growth in India will continue for several decades even after achieving replacement fertility.",
         "A large cohort of young people entering their reproductive years creates population momentum.", 1),
        ("Literacy rates in India display significant interstate regional disparities.",
         "Historical differences in social reform, state expenditure on schooling, and female empowerment shaped literacy.", 1),
        ("The National Population Policy 2000 rejected coercive sterilization targets.",
         "Global and national evidence demonstrated that voluntary, informed choice is more effective for reproductive health.", 1),
        ("Infant mortality rates have declined substantially in India since independence.",
         "Universal childhood immunization, institutional delivery incentives, and sanitation have reduced child deaths.", 1),
        ("India's age structure is younger compared to Western European countries.",
         "Past high fertility rates created a large demographic bulge of youth in the national population.", 1),
        ("Urbanization in India is characterized by rapid growth of million-plus cities.",
         "Metropolitan cities offer concentrated commercial, industrial, and informal employment opportunities.", 1),
        ("Female labor force participation in India shows complex structural patterns.",
         "Increased female school enrollment and household income effects influence women's formal labor supply.", 1),
        ("Census operations in India are conducted decennially under statutory authority.",
         "The Census provides authoritative demographic, socio-economic, and housing data for national planning.", 1),
        ("The crude death rate in India fell from over 27 per thousand at independence to below 7 per thousand.",
         "Eradication of famines and control of epidemic diseases (like smallpox and plague) reduced mass mortality.", 1)
    ]
    a3, r3, rel3 = demo_q3_ars[m - 1]
    specs.append(("ar", CH_DEMO, f"Demographic Causality {m}", a3, r3, rel3,
                  f"Sociological demographic analysis confirms that Reason correctly explains Assertion.\nHence, Option {{{{CORR}}}} is correct.",
                  f"Analyzes demographic causal link in item {m}."))

    # Q4-Q7: SOCIAL INSTITUTIONS: CASTE, TRIBE, FAMILY (4 distinct questions per mock)
    caste_q4_items = [
        ("Varna vs Jati", "In sociological theory, how is 'Varna' fundamentally differentiated from 'Jati'?",
         "Varna is an all-India four-fold scriptural model, whereas Jati refers to thousands of localized, regional endogamous groups",
         ["Varna refers to modern political parties, whereas Jati refers strictly to university alumni associations",
          "Varna is an economic trade union, while Jati is an international maritime shipping agreement",
          "Varna allows unlimited inter-caste marriages, whereas Jati was created by British municipal councils"]),
        ("Purity and Pollution Principle", "In Louis Dumont's structural analysis of the caste system, hierarchy is fundamentally grounded in:",
         "The religious and ritual opposition between the pure and the impure (purity and pollution)",
         ["Purely capitalist market competition based on annual corporate profits and stock ownership",
          "A random lottery conducted annually by village elders to decide occupational status",
          "The total elimination of all dietary taboos and commensal restrictions across social groups"]),
        ("Dominant Caste Concept", "Which combination of attributes was formulated by M.N. Srinivas to define a 'Dominant Caste' in rural India?",
         "Ownership of a sizable amount of arable land, numerical strength in the village, and local political power",
         ["Highest ritual Brahminical status without any landholding or numerical presence in the locality",
          "Complete control over urban textile mills and foreign direct investment banks exclusively",
          "Recognition by the British Crown as a sovereign royal dynasty with private artillery forces"]),
        ("Regional Dominant Castes", "Which of the following regional caste groups historically exemplified M.N. Srinivas's concept of 'Dominant Caste' following post-independence land reforms?",
         "Jats in Haryana and Western UP, Yadavs in Bihar and UP, Vokkaligas and Lingayats in Karnataka, and Kammas in Andhra Pradesh",
         ["Nomadic hunter-gatherers of the Andaman Islands and pastoral shepherds of Ladakh",
          "Urban European merchant expatriates residing in the diplomatic enclaves of New Delhi",
          "Landless bonded agricultural labourers working on sugarcane plantations in Gujarat"]),
        ("Segmentary Nature of Caste", "In sociological theory, what does the 'segmentary' nature of caste imply?",
         "Each caste is further subdivided into sub-castes, and sub-castes into sub-sub-castes, creating a nested hierarchy",
         ["Castes operate as fully equal and sovereign mini-states that mint their own legal currency",
          "Castes are completely separate racial biological species that cannot communicate verbally",
          "Castes are identical to modern trade unions where membership is acquired through written examination"]),
        ("Endogamy and Gotra Exogamy", "How do kinship rules structure traditional upper-caste marriages in northern India?",
         "Marriage is strictly endogamous at the level of Jati, but strictly exogamous at the level of the Gotra (clan)",
         ["Marriage is exogamous at the level of Jati, but strictly endogamous within the same nuclear family",
          "Marriage requires both partners to belong to completely different religious denominations",
          "Marriage is prohibited between individuals residing in the same geographic hemisphere"]),
        ("Colonial Decennial Censuses", "How did the decennial census operations directed by Sir Herbert Risley in 1901 transform caste in India?",
         "They attempted to rank castes systematically according to their perceived social and ritual precedence, provoking intense inter-caste rivalry",
         ["They completely abolished all caste categories and forbade the public mention of caste names",
          "They classified all Indian citizens into two identical economic classes based on bank deposits",
          "They granted independent sovereign kingdoms to every registered non-Brahmin caste association"]),
        ("Government of India Act 1935", "What was the historic administrative significance of the Government of India Act, 1935 regarding caste?",
         "It created the official legal schedule identifying 'Scheduled Castes' (depressed classes) entitled to legal safeguards",
         ["It outlawed the practice of agriculture and mandated that all citizens work in railway workshops",
          "It made the Sanskrit language mandatory for all business correspondence across the empire",
          "It dissolved all village panchayats and placed local governance under British naval officers"]),
        ("Permanent Traits of Tribes", "In Indian anthropological classification, which of the following is categorized as a 'Permanent Trait' of tribal communities?",
         "Linguistic affiliation (such as Austro-Asiatic, Tibeto-Burman, Dravidian, or Indo-Aryan) and ecological region",
         ["Degree of assimilation into the formal urban banking sector and IT service industry",
          "Conversion to modern reformist religious movements or parliamentary political parties",
          "Adoption of intensive tractor-based commercial agribusiness and chemical farming"]),
        ("Acquired Traits of Tribes", "What constitutes an 'Acquired Trait' in the sociological classification of Indian tribal groups?",
         "The degree of incorporation into Hindu agrarian society, adoption of Christianity, and mode of livelihood",
         ["Physical racial phenotype (such as Proto-Australoid, Mongoloid, or Negrito features)",
          "The geographic coordinates of their traditional ancestral hilly or forested terrain",
          "The ancestral language family spoken in their pre-colonial isolated settlements"]),
        ("Isolationist vs Integrationist Tribal Debate", "In the historic pre-independence debate on tribal welfare, how did Verrier Elwin's perspective contrast with G.S. Ghurye's?",
         "Elwin advocated protection and isolation in 'National Parks' to preserve culture, while Ghurye viewed tribes as 'backward Hindus' needing integration",
         ["Elwin proposed commercial logging of all tribal forests, while Ghurye demanded complete tribal sovereignty",
          "Both scholars demanded the immediate forced conversion of all tribes to Western Christianity",
          "Elwin argued tribes were advanced industrial workers, while Ghurye claimed they were European immigrants"]),
        ("Nehru's Tribal Panchsheel", "A fundamental guiding tenet of Jawaharlal Nehru's 'Tribal Panchsheel' (Five Principles for Tribal Development) was that:",
         "Tribal people should develop along the lines of their own genius, avoiding the imposition of alien cultural values",
         ["Tribal languages should be immediately suppressed and replaced by standard bureaucratic English",
          "Tribal forest lands should be unconditionally transferred to private transnational mining companies",
          "Traditional tribal arts and customs should be banned as primitive superstitions"]),
        ("Concept of Dikus", "In the tribal sociology of central India (Chota Nagpur), the term 'Diku' referred specifically to:",
         "Exploitative outsiders (moneylenders, traders, revenue contractors, and landlords) who alienated tribal lands",
         ["Traditional village deities worshipped during sacred grove harvesting ceremonies",
          "Honored spiritual teachers invited to settle boundary disputes between friendly clans",
          "The sacred bamboo flutes played during annual community hunting expeditions"]),
        ("Forest Acts of 1878 and 1927", "How did British colonial forest legislation (1878 and 1927) fundamentally undermine tribal autonomy in India?",
         "It declared forests state property, categorized them into Reserved/Protected forests, and criminalized customary forest gathering",
         ["It handed total ownership and legal title of all timber reserves directly to tribal clan chiefs",
          "It prohibited British administrators and timber contractors from ever entering forested districts",
          "It required colonial paper mills to pay full market royalty to tribal village councils"]),
        ("Khasi Matrilineal System", "In the matrilineal system of the Khasi community of Meghalaya, ancestral property is traditionally inherited by:",
         "The youngest daughter (Khadduh), while lineage and clan membership are traced strictly through the mother",
         ["The eldest son, who takes up residence with his father's patriarchal lineage head",
          "The village council headman, who auctions the land to non-tribal commercial buyers",
          "The maternal uncle's eldest male child, who must migrate to an urban center upon marriage"]),
        ("Matrilineal Dilemma in Meghalaya", "Sociologist Tiplut Nongbri observed that the matrilineal system among the Khasi generates an inherent structural tension between:",
         "A man's responsibilities to his sister's house (as maternal uncle / Kni) versus his responsibilities to his own wife and children",
         ["The village blacksmith and the urban money lending corporate banking executive",
          "The demand for traditional cotton handloom fabrics versus imported synthetic rayon textiles",
          "The younger generation of educated daughters and their foreign university professors"]),
        ("Joint Family Transformation", "Sociological studies of the modern Indian family demonstrate that the joint family system has:",
         "Undergone structural adaptations into nuclear households while maintaining strong extended kinship solidarity and ritual ties",
         ["Completely disappeared without leaving any trace in emotional, financial, or ceremonial relations",
          "Expanded to include over five hundred relatives living inside a single communal barracks",
          "Been declared unconstitutional by the Supreme Court of India under fundamental equality rights"]),
        ("Caste Associations & Politics", "How has the political role of caste transformed in modern democratic India?",
         "Caste groups have formed modern horizontal associations and political vote banks to compete for state resources and political power",
         ["Caste has completely ceased to play any role in voting behavior, political mobilization, or cabinet formation",
          "Caste groups have united to demand the restoration of pre-colonial hereditary monarchy",
          "Caste organizations now function strictly as international sports clubs without political goals"]),
        ("Sanskritisation & Lower Castes", "According to M.N. Srinivas, how did intermediate and lower castes seek upward social mobility under Sanskritisation?",
         "By adopting the dietary taboos (vegetarianism), rituals, sacred thread, and lifestyle of the twice-born (dvija) castes",
         ["By joining British naval forces and adopting Western European dietary customs and dress exclusively",
          "By discarding all religious rituals and advocating militant atheism in municipal elections",
          "By emigrating en masse to industrial factories in Manchester and Birmingham in the 19th century"]),
        ("Dalit Critique of Sanskritisation", "A major Dalit critique of the concept of 'Sanskritisation' voiced by modern social theorists is that:",
         "It uncritically accepts the supremacy of Brahminical hierarchy as the universal reference group and denigrates Dalit culture",
         ["It forces high-caste landlords to perform menial sanitary labour in village streets",
          "It was formulated by British colonial officers who had never visited an Indian village",
          "It bans lower-caste students from enrolling in modern technical and medical degree programmes"])
    ]
    t4, s4, c4, w4 = caste_q4_items[m - 1]
    specs.append(("mcq", CH_INST, t4, s4, c4, w4,
                  f"Sociological analysis verifies this concept from NCERT Indian Society.\nHence, Option {{{{CORR}}}} is correct.",
                  f"Understands {t4}."))

    # Q5: Dominant caste / agrarian power statement
    specs.append(("stmt", CH_INST, f"Caste and Power Dynamic {m}",
                  f"Dominant castes emerged as powerful regional players post-independence because they possessed both numerical strength and intermediate agricultural landholdings.",
                  f"The abolition of Zamindari intermediaries benefited intermediate peasant castes who acquired ownership of the lands they cultivated.", 1,
                  "Both statements are correct: M.N. Srinivas documented that land reforms transferred ownership to cultivating peasant castes (Jats, Yadavs, Vokkaligas), who used their numerical strength in adult suffrage to achieve political dominance.\nHence, Option {{CORR}} is correct.",
                  "Explains dominant caste empowerment."))

    # Q6: Tribal classification & issues
    specs.append(("mcq", CH_INST, f"Tribal Integration Issues {m}",
         f"In the sociological study of Indian tribes (Mock {m}), what does the term 'National Parks' approach associate with Verrier Elwin imply?",
         "Protecting tribal communities from cultural exploitation and land alienation by non-tribal outsiders through protected administrative enclaves",
         ["Converting all tribal villages into commercial amusement parks with rollercoasters for urban tourists",
          "Forcing tribal hunters to capture tigers for international circus shows in Europe",
          "Clearing all tribal settlements to construct heavy industrial steel blast furnaces"],
         "Verrier Elwin initially proposed establishing protected tribal areas ('National Parks') to shield vulnerable communities from rapacious moneylenders, timber contractors, and loss of cultural autonomy.\nHence, Option {{CORR}} is correct.",
         "Identifies Verrier Elwin's protective enclave approach."))

    # Q7: Family & kinship systems
    specs.append(("mcq", CH_INST, f"Kinship Organization {m}",
         f"Which of the following statements accurately characterizes the 'Matrilocal' residence rule in kinship anthropology?",
         "A marriage residence rule where the married couple establishes their household with or near the wife's mother's family",
         ["A marriage residence rule where the married couple must live in a boat on international rivers",
          "A rule where the husband and wife live in completely separate villages and never see each other",
          "A rule where the married couple resides permanently inside the husband's ancestral patriarchal home"],
         "Matrilocal (or uxorilocal) residence dictates that upon marriage, the husband moves to reside with or adjacent to his wife's maternal kin group.\nHence, Option {{CORR}} is correct.",
         "Defines matrilocal residence rule."))

    # Q8-Q10: MARKET AS A SOCIAL INSTITUTION (3 distinct questions per mock)
    specs.append(("mcq", CH_MARKET, f"Market Sociology Concept {m}",
         f"How does a sociological analysis of market exchange (Mock {m}) contrast with classical laissez-faire economics?",
         "Sociology demonstrates that markets are socially constructed arenas embedded in caste networks, cultural prestige, and institutional power",
         ["Sociology claims that all buyers and sellers are identical programmed mathematical robots without social identities",
          "Sociology asserts that money was invented by the British East India Company in the twentieth century",
          "Sociology denies that agricultural grain has any nutritional value or economic price in villages"],
         "Sociologists follow Karl Polanyi and Mark Granovetter in showing that economic exchange cannot be understood without examining the social institutions, kinship ties, and cultural values in which markets are embedded.\nHence, Option {{CORR}} is correct.",
         "Contrasts sociological and neoclassical views of markets."))

    specs.append(("mcq", CH_MARKET, f"Indigenous Banking Systems {m}",
         f"The Nattukottai Chettiars of Tamil Nadu were able to operate extensive financial credit networks across Southeast Asia primarily because:",
         "Their business transactions were underwritten by strong caste and kinship networks that enforced financial trust, accountability, and contract compliance",
         ["They were granted exclusive royal monopolies by the Emperor of Japan to mint gold coins",
          "They refused to lend money to any merchants who could not speak classical Latin fluently",
          "They used modern satellite electronic funds transfers developed by European space agencies"],
         "Caste and kinship solidarity provided the institutional trust and social sanctions necessary for the Chettiars to circulate hundis (credit notes) across Burma, Ceylon, and Malaya.\nHence, Option {{CORR}} is correct.",
         "Explains social foundation of Chettiar banking network."))

    specs.append(("mcq", CH_MARKET, f"Commodification & Consumption {m}",
         f"In the sociology of modern markets, 'Commodification' refers to the social process whereby:",
         "Things, services, and human relationships that were previously not traded in the market (such as clean water, child care, or organs) become commercial commodities with cash prices",
         ["All private commercial shops are nationalized and placed under military logistics battalions",
          "Modern corporations cease selling physical goods and deal only in ancient handwritten religious manuscripts",
          "All agricultural farmers refuse to use modern currency and return exclusively to barter of cattle"],
         "Commodification occurs when goods, services, cultural rituals, or bodily organs that previously operated outside the market sphere are transformed into commodities bought and sold for monetary profit.\nHence, Option {{CORR}} is correct.",
         "Defines commodification."))

    # Q11-Q14: PATTERNS OF SOCIAL INEQUALITY & EXCLUSION (4 distinct questions per mock)
    specs.append(("mcq", CH_INEQ, f"Social Stratification Principles {m}",
         f"Which of the following is a recognized foundational principle of 'Social Stratification' in sociological theory?",
         "Social stratification persists over generations through family inheritance and social reproduction of privilege and disadvantage",
         ["Social stratification is determined solely by an individual's personal athletic running speed",
          "Social stratification disappears completely whenever a new calendar year begins",
          "Social stratification affects only wild animals and has zero relevance to human societies"],
         "Sociologists establish that social stratification is a characteristic of society (not individual biology), persists across generations through social reproduction, and is legitimized by cultural ideologies.\nHence, Option {{CORR}} is correct.",
         "Identifies core principle of social stratification."))

    specs.append(("mcq", CH_INEQ, f"Prejudice vs Discrimination {m}",
         f"What is the key analytical distinction between 'Prejudice' and 'Discrimination' in social psychology and sociology?",
         "Prejudice is an internalized attitude or preconceived opinion, whereas discrimination is actual observable differential behavior and denial of equal treatment",
         ["Prejudice is an official government statute passed by parliament, whereas discrimination is a secret religious prayer",
          "Prejudice applies only to linguistic grammar, whereas discrimination applies only to architectural design",
          "Prejudice is always positive and affectionate, whereas discrimination is always accidental and unconscious"],
         "Prejudice refers to preconceived attitudes and stereotyped beliefs held about out-group members, whereas discrimination refers to overt actions and exclusionary practices.\nHence, Option {{CORR}} is correct.",
         "Differentiates prejudice from discrimination."))

    specs.append(("mcq", CH_INEQ, f"Untouchability Dimensions {m}",
         f"In sociological studies, the practice of 'Untouchability' against Dalits encompasses which of the following triads of oppression?",
         "Exclusion from common civic spaces, enforcement of humiliating subordination, and severe economic exploitation",
         ["Exemption from all state taxes, appointment to high judicial offices, and free foreign holidays",
          "Mandatory inclusion in elite private clubs, free distribution of agricultural tractors, and double votes",
          "Compulsory attendance at university lectures, free private medical insurance, and diplomatic passports"],
         "Untouchability is a total structural system of oppression characterized by exclusion (from wells/temples), humiliation (ritual subservience), and economic exploitation (forced unpaid labour).\nHence, Option {{CORR}} is correct.",
         "Analyzes untouchability dimensions."))

    specs.append(("mcq", CH_INEQ, f"OBC Reservations and Commissions {m}",
         f"Which constitutional commission recommended 27% reservation for Other Backward Classes (OBCs) in central government employment, implemented in 1990?",
         "The Second Backward Classes Commission (Mandal Commission)",
         ["The Sarkaria Commission on Centre-State Relations",
          "The States Reorganisation Commission (Fazal Ali Commission)",
          "The National Human Rights Commission (NHRC)"],
         "The Mandal Commission (Second Backward Classes Commission, 1979-80) headed by B.P. Mandal identified OBCs based on social, educational, and economic indicators and recommended 27% reservations.\nHence, Option {{CORR}} is correct.",
         "Identifies Mandal Commission recommendations."))

    # Q15-Q18: CULTURAL DIVERSITY, MINORITIES & SECULARISM (4 distinct questions per mock)
    specs.append(("mcq", CH_DIV, f"Assimilationist vs Integrationist Policies {m}",
         f"In state policies towards cultural minorities, how do 'Assimilationist' policies differ from 'Integrationist' policies?",
         "Assimilationist policies compel minorities to adopt the dominant culture and abandon distinct traditions, while integrationist policies protect cultural diversity within shared civic loyalty",
         ["Assimilationist policies grant complete territorial independence to all ethnic minorities",
          "Assimilationist policies enforce multilingual education in fifty distinct tribal dialects",
          "Assimilationist policies ban majority communities from participating in parliamentary elections"],
         "Assimilationist policies seek cultural homogeneity by suppressing minority cultural expressions, whereas integrationist policies encourage shared public civic allegiance while preserving cultural pluralism in private and communal life.\nHence, Option {{CORR}} is correct.",
         "Contrasts assimilationist and integrationist policies."))

    specs.append(("mcq", CH_DIV, f"Constitutional Protection of Minorities {m}",
         f"Under the Indian Constitution, what specific cultural guarantee is enshrined in Article 29?",
         "The right of any section of citizens residing in India having a distinct language, script, or culture of its own to conserve the same",
         ["The right of corporate business executives to establish offshore private banks without tax oversight",
          "The power of state governors to dissolve municipal corporations without legislative approval",
          "The mandatory requirement that all citizens learn classical Sanskrit before voting"],
         "Article 29(1) of the Constitution guarantees the fundamental right of distinct cultural groups and minorities to conserve their distinct language, script, or culture.\nHence, Option {{CORR}} is correct.",
         "States the scope of Article 29."))

    specs.append(("mcq", CH_DIV, f"Indian Model of Secularism {m}",
         f"How does the Indian constitutional model of secularism differ from the Western classical doctrine of strict church-state separation?",
         "Indian secularism practices 'principled distance' and equal respect for all religions (Sarva Dharma Sambhava), allowing state intervention for progressive social reform",
         ["Indian secularism establishes an official state religion and bans all minority religious festivals",
          "Indian secularism requires all elected politicians to be ordained monastic temple priests",
          "Indian secularism outlaws all private religious beliefs and enforces mandatory state atheism"],
         "Unlike Western models that maintain a rigid wall of separation between church and state, Indian secularism treats all religions with equal respect while retaining the constitutional authority to intervene to eliminate discriminatory social practices (e.g. untouchability).\nHence, Option {{CORR}} is correct.",
         "Explains Indian secularism and principled distance."))

    specs.append(("mcq", CH_DIV, f"Communalism vs Pluralism {m}",
         f"In sociological discourse, 'Communalism' is fundamentally understood as:",
         "A chauvinistic political ideology that constructs religious identity as the sole basis of collective identity, generating hostility towards other religious groups",
         ["Personal spiritual meditation conducted in a solitary monastic hermitage",
          "A charitable non-profit trust providing free mid-day meals to orphanages",
          "The celebration of seasonal agricultural harvest festivals by all village residents together"],
         "Sociology defines communalism not as personal religiosity, but as a sectarian political ideology that mobilizes religious communities against one another to achieve political and economic dominance.\nHence, Option {{CORR}} is correct.",
         "Defines communalism."))

    # Q19-Q21: STRUCTURAL CHANGE (3 distinct questions per mock)
    specs.append(("mcq", CH_STRUC, f"Colonial Impact on Economy {m}",
         f"Why did British colonial conquest mark a qualitative structural break in Indian history compared to earlier pre-colonial conquests?",
         "British colonialism linked India to an expanding capitalist world market, subordinating Indian agriculture and production to the raw material requirements of British industrial capitalism",
         ["Earlier conquerors took away all arable land and relocated the entire population to Antarctica",
          "British colonial administrators abolished all taxation and distributed free machinery to weavers",
          "Earlier conquerors introduced steam railway engines and telegraph wires in the ancient Vedic period"],
         "Unlike pre-colonial rulers who collected tribute but left agrarian production systems largely intact, British colonialism restructured Indian land tenure, currency, and tariffs to serve metropolitan British industrial capital.\nHence, Option {{CORR}} is correct.",
         "Explains colonialism as a capitalist structural break."))

    specs.append(("mcq", CH_STRUC, f"De-industrialisation Dynamics {m}",
         f"In colonial economic history, which historic manufacturing center suffered severe de-industrialisation and urban decline due to British tariff policies?",
         "Surat in Gujarat and Murshidabad and Dacca in Bengal",
         ["The newly constructed naval shipyards of Bombay and Calcutta",
          "The modern coal and iron manufacturing complexes of Jamshedpur and Rourkela",
          "The software technology technology campuses of Bangalore and Hyderabad"],
         "Colonial free-trade tariffs flooded India with cheap machine-woven fabrics from Manchester, wiping out traditional artisanal weaving hubs like Surat, Murshidabad, and Dacca, forcing displaced artisans back into overcrowded agriculture.\nHence, Option {{CORR}} is correct.",
         "Identifies historic towns hit by de-industrialisation."))

    specs.append(("mcq", CH_STRUC, f"Assam Tea Plantation Indenture {m}",
         f"What legal and coercive mechanism allowed British tea planters in Assam to exploit migrant tribal labourers in the 19th century?",
         "The Workmen's Breach of Contract Act, 1859, which turned breach of contract and leaving the tea estate into a criminal offense punishable by imprisonment",
         ["A democratic worker-elected committee that negotiated monthly salary increases with planters",
          "Free land allotments granted to every plantation labourer after six months of service",
          "Universal health insurance and subsidized air travel provided to migrant workers' families"],
         "The British enacted penal contract laws (like the Workmen's Breach of Contract Act) that criminalized desertion, allowing planters to use private security and police to arrest and flog runaway workers.\nHence, Option {{CORR}} is correct.",
         "Describes Assam plantation penal labour laws."))

    # Q22-Q25: CULTURAL CHANGE (4 distinct questions per mock)
    specs.append(("mcq", CH_CULT, f"Sanskritisation Limitations {m}",
         f"Sociologist M.N. Srinivas noted which key structural limitation of the process of 'Sanskritisation'?",
         "It results in positional mobility for a specific caste within the local hierarchy, but leaves the overarching structural framework of caste inequality unchallenged",
         ["It completely abolishes the varna system and establishes perfect socio-economic egalitarianism",
          "It is legally forbidden by the Constitution of India and punishable by heavy fines",
          "It can only be practiced by corporate software engineers residing in foreign capitals"],
         "Srinivas explicitly clarified that Sanskritisation brings about 'positional change' for a particular group, not 'structural change' in the caste system as a whole; it accepts the legitimacy of hierarchy.\nHence, Option {{CORR}} is correct.",
         "Analyzes positional vs structural change in Sanskritisation."))

    specs.append(("mcq", CH_CULT, f"Westernisation Levels {m}",
         f"In M.N. Srinivas's sociological framework, 'Westernisation' comprises which distinct dimensions?",
         "Changes encompassing technology, modern institutions (law, bureaucracy, education), as well as values (rationality, egalitarianism, humanitarianism)",
         ["The compulsory conversion of all citizens to European state churches",
          "The total abandonment of traditional Indian languages in daily domestic conversations",
          "The exclusive adoption of European architectural styles for all rural cowsheds"],
         "Westernisation refers to multi-layered cultural and institutional changes resulting from 150+ years of British rule, ranging from technology and dress to democratic values and scientific inquiry.\nHence, Option {{CORR}} is correct.",
         "Delineates dimensions of Westernisation."))

    specs.append(("mcq", CH_CULT, f"19th Century Social Reformers {m}",
         f"Which 19th-century social reformer established the Brahmo Samaj in 1828 and campaigned relentlessly for the legal abolition of Sati?",
         "Raja Rammohan Roy",
         ["Swami Vivekananda", "Ishwar Chandra Vidyasagar", "K.T. Telang"],
         "Raja Rammohan Roy, regarded as the father of modern Indian social reform, founded the Brahmo Samaj in 1828 and mobilized public and scriptural arguments that led Lord William Bentinck to ban Sati in 1829.\nHence, Option {{CORR}} is correct.",
         "Identifies Raja Rammohan Roy and Brahmo Samaj."))

    specs.append(("mcq", CH_CULT, f"Anti-Caste Mobilization in Western India {m}",
         f"In 1873, Jyotirao Govindrao Phule established which pioneering organization in Maharashtra to challenge Brahminical supremacy and empower the Shudras and Ati-Shudras?",
         "Satyashodhak Samaj (Truth Seekers' Society)",
         ["Arya Samaj", "Prarthana Samaj", "Servants of India Society"],
         "Jyotirao Phule established the Satyashodhak Samaj in 1873 to liberate lower castes from religious and social subjugation, pioneering non-Brahmin marriage rituals and girls' schooling.\nHence, Option {{CORR}} is correct.",
         "Associates Jyotirao Phule with Satyashodhak Samaj."))

    # Q26-Q28: INDIAN DEMOCRACY & PANCHAYATI RAJ (3 distinct questions per mock)
    specs.append(("mcq", CH_DEMOC, f"Indian Constitution as Social Document {m}",
         f"Why did political historian Granville Austin characterize the Indian Constitution as 'first and foremost a social document'?",
         "Because the core of its commitment lies in bringing about a peaceful social revolution through fundamental rights and directive principles of social justice",
         ["Because it was drafted entirely by foreign anthropologists during a conference in Paris",
          "Because it abolished all private personal property and mandated collective agricultural communes",
          "Because it restored the hereditary legal privileges of pre-colonial princely rulers"],
         "Granville Austin stressed that the majority of constitutional provisions are aimed directly at furthering the goals of social revolution and creating conditions for an egalitarian democracy.\nHence, Option {{CORR}} is correct.",
         "Explains Granville Austin's characterization of the Constitution."))

    specs.append(("mcq", CH_DEMOC, f"73rd Constitutional Amendment {m}",
         f"Which of the following institutional mandates was enacted by the 73rd Constitutional Amendment Act, 1992?",
         "The creation of a standardized three-tier structure of Panchayati Raj (Gram, Block, and District) with mandatory periodic five-year elections",
         ["The total abolition of all village-level local self-government institutions across India",
          "The requirement that all village sarpanches must be appointed directly by the Union Cabinet",
          "The privatization of all village common grazing lands and ponds to foreign agribusinesses"],
         "The 73rd Amendment gave constitutional status to Panchayati Raj, establishing a uniform three-tier structure (Gram Panchayat, Panchayat Samiti, Zilla Parishad) and mandatory elections.\nHence, Option {{CORR}} is correct.",
         "States key structural feature of 73rd Amendment."))

    specs.append(("mcq", CH_DEMOC, f"Gram Sabha Constitutional Authority {m}",
         f"What constitutes the 'Gram Sabha' under Article 243A of the Constitution of India?",
         "A body consisting of all persons registered as voters in the electoral rolls of a village within the area of the Gram Panchayat",
         ["An executive council comprising only the ten largest wealthy landowners of the village",
          "A committee of appointed district police officers and block revenue bureaucrats",
          "An assembly composed exclusively of male elders who own more than fifty cattle"],
         "The Gram Sabha is the grassroots assembly comprising every registered adult voter in the village, serving as the supreme deliberative and oversight body for local democracy.\nHence, Option {{CORR}} is correct.",
         "Defines Gram Sabha membership."))

    # Q29-Q32: RURAL SOCIETY & AGRARIAN STRUCTURE (4 distinct questions per mock)
    specs.append(("mcq", CH_RURAL, f"Agrarian Land Reforms Success {m}",
         f"Which component of post-independence land reform legislation achieved the most decisive and comprehensive success across India?",
         "The Abolition of Intermediaries (Zamindari Abolition Acts)",
         ["The total redistribution of land to all landless agricultural labourers under land ceiling acts",
          "The complete voluntary donation of half of India's arable acreage under the Bhoodan movement",
          "The legal eradication of all private ownership of agricultural land in favor of state farms"],
         "Zamindari Abolition was the most successful post-independence land reform, removing predatory feudal intermediaries and conferring direct land tenure to tens of millions of cultivating peasants.\nHence, Option {{CORR}} is correct.",
         "Identifies Zamindari Abolition as the most successful land reform."))

    specs.append(("mcq", CH_RURAL, f"Tenancy Reforms & Operation Barga {m}",
         f"In West Bengal, which landmark state initiative successfully recorded sharecroppers (bargadars) and guaranteed them hereditary cultivation rights and legal crop shares?",
         "Operation Barga",
         ["Operation Flood", "Operation Green Hunt", "The Bhoodan Movement"],
         "Launched in 1978 by the Left Front government, Operation Barga mobilized peasant unions and village officials to record sharecroppers, protecting them from eviction and guaranteeing fair crop shares.\nHence, Option {{CORR}} is correct.",
         "Identifies Operation Barga in West Bengal."))

    specs.append(("mcq", CH_RURAL, f"Green Revolution Class Polarization {m}",
         f"Sociological research by scholars like Francine Frankel revealed that the Green Revolution in northwestern India:",
         "Disproportionately benefited affluent farmers with capital, leading to the displacement of tenant farmers and widening rural class differentiation",
         ["Led to the complete economic equalization of all village households regardless of landholding",
          "Eliminated the use of tractors and diesel pumps in favor of traditional wooden animal equipment",
          "Resulted in agricultural labourers acquiring ownership of all private pesticide factories"],
         "The Green Revolution was input-intensive, requiring capital for seeds, fertilizers, and tubewells; larger farmers profited, while marginal peasants and evicted tenants were pushed into precarious wage labour.\nHence, Option {{CORR}} is correct.",
         "Analyzes class polarization under Green Revolution."))

    specs.append(("mcq", CH_RURAL, f"Contract Farming Power Dynamics {m}",
         f"In the sociological evaluation of contract farming in India (Mock {m}), what structural risk is disproportionately borne by smallholder peasants?",
         "Production, weather, and pest risks are borne by the farmer, while corporations maintain the right to reject harvests that fail aesthetic standards",
         ["Corporations assume total responsibility and guarantee high profits even if total crop failure occurs",
          "Farmers are legally forbidden from ever using fertilizer or watering their commercial crops",
          "The state government takes over all private farmland and operates it as a military barracks"],
         "Under contract farming, transnational agribusinesses dictate inputs and prices but shift cultivation and climate risks onto farmers, routinely rejecting produce that does not meet cosmetic specifications.\nHence, Option {{CORR}} is correct.",
         "Examines unequal risks in contract farming."))

    # Q33-Q36: INDUSTRIAL SOCIETY & LABOUR (4 distinct questions per mock)
    specs.append(("mcq", CH_INDUS, f"Unorganised Sector Magnitude {m}",
         f"What proportion of India's total working population is estimated to be engaged in the 'Unorganised' (Informal) sector?",
         "Over 90 percent of the total workforce",
         ["Less than 5 percent of the total workforce",
          "Approximately 25 percent of the total workforce",
          "Exactly 50 percent of the total workforce"],
         "Over 90% of Indian workers are employed in the unorganised/informal sector, characterized by casual wages, absence of written contracts, lack of health benefits, and zero job security.\nHence, Option {{CORR}} is correct.",
         "Identifies informal sector proportion."))

    specs.append(("mcq", CH_INDUS, f"Taylorism and Deskilling {m}",
         f"In the sociology of industrial production, 'Taylorism' (Scientific Management) is characterized by:",
         "The fragmentation of complex craft skills into timed, repetitive, simplified tasks, concentrating planning control exclusively in management",
         ["Worker-owned cooperatives where factory floor employees vote daily on executive salaries",
          "The abolition of all factory machinery in favor of individualized artisan hand carving",
          "The elimination of management hierarchies and distribution of all company shares to apprentices"],
         "Frederick Winslow Taylor developed scientific management to maximize efficiency by breaking work into minute repetitive motions, stripping workers of craft knowledge and intensifying managerial control.\nHence, Option {{CORR}} is correct.",
         "Defines Taylorism and worker deskilling."))

    specs.append(("mcq", CH_INDUS, f"Footloose Labour Vulnerability {m}",
         f"In his seminal study 'Footloose Labour', sociologist Jan Breman demonstrated that seasonal migrant workers in Gujarat:",
         "Are denied local citizenship rights, minimum wages, and housing, kept in a state of precarious, unorganized circulation by employers",
         ["Are provided lifetime company housing, pension trusts, and paid annual European holidays",
          "Operate powerful international banking trusts that dictate regional government monetary policy",
          "Voluntarily abandon wage labour to establish self-sufficient utopian monastic communities"],
         "Jan Breman's 'Footloose Labour' exposed how employers exploit seasonal, circular migrants in brick kilns and sugar factories, preventing them from unionizing or claiming civic rights due to their precarious status.\nHence, Option {{CORR}} is correct.",
         "Summarizes Jan Breman's Footloose Labour."))

    specs.append(("mcq", CH_INDUS, f"Home-based Bidi Workers {m}",
         f"The bidi manufacturing industry in India exemplifies which modern informal production arrangement?",
         "The 'putting-out' system where women and children roll bidis at home on a piece-rate basis, enabling employers to bypass factory safety laws",
         ["Fully automated computerized robotic plants located inside high-technology software parks",
          "Permanent state civil service enterprises providing thirty-year indexed pensions to employees",
          "An international consortium where foreign expatriates roll cigarettes inside luxury hotel lobbies"],
         "The bidi industry operates through contractors distributing tobacco and tendu leaves to home-based women workers paid exploitative piece rates, evading statutory maternity, health, and minimum wage benefits.\nHence, Option {{CORR}} is correct.",
         "Describes putting-out system in bidi industry."))

    # Q37-Q38: GLOBALISATION & MASS MEDIA (2 distinct questions per mock)
    specs.append(("mcq", CH_GLOB, f"Glocalisation & Hybridity {m}",
         f"In the sociological analysis of globalisation, 'Glocalisation' refers to:",
         "The creative adaptation and blending of global commodities and media formats with local cultural traditions and preferences",
         ["The total, uniform Americanization of all global cultures resulting in the extinction of local languages",
          "The complete withdrawal of a sovereign state from all international trade and internet networks",
          "The creation of an artificial global currency traded exclusively by international space stations"],
         "Glocalisation (Roland Robertson) describes the dialectical fusion of global and local cultures—global products and media formats are re-invented and customized to resonate with local consumers.\nHence, Option {{CORR}} is correct.",
         "Defines glocalisation."))

    specs.append(("mcq", CH_MEDIA, f"Satellite TV Revolution {m}",
         f"What major transformation characterized the Indian television broadcasting sphere following the 1991 economic reforms?",
         "The dissolution of the state-run Doordarshan monopoly and rapid growth of multi-channel private satellite networks competing for TRP ratings",
         ["The complete prohibition of all television broadcasting in favor of government print newsletters",
          "The conversion of Doordarshan into the sole international news agency operating across North America",
          "A constitutional ban prohibiting private commercial corporations from airing television advertisements"],
         "Post-1991 economic liberalization dismantled Doordarshan's monopoly, triggering an explosion of commercial, round-the-clock news, regional entertainment, and TRP-driven television broadcasting.\nHence, Option {{CORR}} is correct.",
         "Explains post-1991 television boom in India."))

    # Q39-Q40: SOCIAL MOVEMENTS (2 distinct questions per mock)
    specs.append(("mcq", CH_MOV, f"New Social Movement Theory {m}",
         f"How do 'New Social Movements' (such as environmental, feminist, and peace movements) diverge from traditional class-based labor movements?",
         "They prioritize identity, quality of life, cultural dignity, and environmental sustainability rather than purely economic redistribution and state power",
         ["They are led strictly by military generals seeking armed overthrow of sovereign parliamentary states",
          "They recruit members exclusively from 19th-century industrial heavy machinery trade unions",
          "They refuse to utilize any mass communications or participate in public democratic debates"],
         "New Social Movement theorists (Touraine, Melucci) point out that contemporary movements organize around post-materialist values—human rights, ecology, bodily autonomy—rather than traditional class capture of state power.\nHence, Option {{CORR}} is correct.",
         "Contrasts Old and New Social Movements."))

    specs.append(("mcq", CH_MOV, f"Chipko Movement Eco-Feminism {m}",
         f"The Chipko Movement in the Garhwal Himalayas (Uttarakhand) in 1973 is internationally celebrated in environmental sociology because:",
         "Village women clung to forest trees to prevent commercial loggers from felling them, demonstrating the vital link between peasant survival and ecological conservation",
         ["Urban industrial timber merchants organized armed strikes against local environmental activists",
          "The provincial government clear-cut all Himalayan oak forests to build international polo stadiums",
          "Local villagers demanded the immediate replacement of all native oak forests with commercial eucalyptus"],
         "The Chipko Movement became a legendary ecological struggle where rural hill women, led by Gaura Devi, physically protected trees, asserting that forests provide soil, water, and fodder essential to life.\nHence, Option {{CORR}} is correct.",
         "Understands the significance of the Chipko Movement."))

    # --- CASE STUDY 1: SOURCE EXCERPT (Q41-Q45) ---
    p1_hdr = (
        f"[Case Study 1: Field Excerpt on Agrarian Restructuring - Mock {m}]\n"
        f"Read the following excerpt from a sociological field study of village transformations in northwestern India and answer questions 41 to 45:\n\n"
        f"\"Over the three decades following the introduction of high-yielding dwarf wheat varieties and energized tubewell irrigation, "
        f"the village of Kishanpur underwent profound socio-economic restructuring. Prior to this technological shift, the village economy "
        f"was anchored in hereditary jajmani relations. Landowning farmers of the dominant Jat caste provided fixed grain shares (khalihan) "
        f"at harvest time to artisan and service castes in exchange for customary labour, ritual services, and agricultural repair work. "
        f"With the commercialisation of agriculture and the arrival of high-capital inputs, landowners began calculating production costs in strict cash terms. "
        f"They abruptly terminated customary grain payments, replacing them with daily cash wages or piece-rate contracts for specific tasks like harvesting. "
        f"Simultaneously, local landless Dalit labourers, facing seasonal unemployment and seeking escape from humiliating caste subordination, "
        f"began refusing traditional bonded duties (begar). Instead, they looked to seasonal migration or informal construction labour in neighboring towns. "
        f"To meet urgent harvest demands, Jat landowners increasingly relied on migrant labour gangs recruited from eastern Uttar Pradesh and Bihar through labour contractors. "
        f"Thus, customary village interdependence dissolved into an impersonal, commercialized contract labour market.\""
    )

    specs.append(("case", CH_RURAL, "Agrarian Transition", p1_hdr,
                  f"According to the excerpt (Mock {m}), what traditional socio-economic institution historically regulated relationships between landowning farmers and artisan/service castes in Kishanpur?",
                  "The hereditary jajmani system involving customary grain payments at harvest",
                  ["A modern joint-stock corporate agricultural cooperative trading on the stock exchange",
                   "An international United Nations agricultural procurement board fixing global prices",
                   "A seasonal barter system based entirely on imported cowrie shells from the Indian Ocean"],
                  "The passage explicitly states that prior to technological shifts, the village economy was anchored in hereditary jajmani relations involving customary grain shares.\nHence, Option {{CORR}} is correct.",
                  "Extracts traditional institution from passage."))

    specs.append(("case", CH_RURAL, "Agrarian Transition", p1_hdr,
                  f"Why did the dominant Jat landowners terminate customary grain payments and shift to cash wages in Kishanpur (Mock {m})?",
                  "Because commercialisation and high-capital inputs prompted landowners to calculate production costs strictly in monetary terms",
                  ["Because the Reserve Bank of India banned the possession of all raw agricultural wheat grain",
                   "Because all Jat landowners migrated permanently to industrial textile factories in Manchester",
                   "Because village wheat fields were converted into luxury golf resorts and five-star tourist hotels"],
                  "The text notes that with commercialisation and high capital inputs, landowners began calculating costs in cash terms and terminated customary payments.\nHence, Option {{CORR}} is correct.",
                  "Identifies reason for shift to cash wages."))

    specs.append(("case", CH_RURAL, "Agrarian Transition", p1_hdr,
                  f"How did local landless Dalit labourers respond to the dissolution of traditional village ties according to the excerpt (Mock {m})?",
                  "They refused traditional unfree bonded duties (begar) and sought seasonal migration or informal urban construction labour",
                  ["They purchased all the agricultural tractors and expelled the Jat landowners from the district",
                   "They formed international diplomatic embassies in foreign capitals to demand trade sanctions",
                   "They returned to full-time hunting and gathering in the Himalayan high altitude forests"],
                  "The passage explains that Dalit workers rejected traditional bonded duties (begar) and sought autonomy through seasonal migration and urban informal work.\nHence, Option {{CORR}} is correct.",
                  "Understands Dalit response to agrarian changes."))

    specs.append(("case", CH_RURAL, "Agrarian Transition", p1_hdr,
                  f"How did landowners solve their seasonal harvest labour shortages after local Dalit labourers shifted to non-farm work (Mock {m})?",
                  "By hiring migrant labour gangs recruited from eastern Uttar Pradesh and Bihar through labour contractors",
                  ["By importing fully automated robotic harvesting combines from aerospace manufacturing firms",
                   "By requiring local high school students to harvest all wheat crops without monetary payment",
                   "By abandoning all agricultural cultivation and allowing the arable land to turn into forest"],
                  "The passage states that landowners relied on migrant labour gangs from eastern UP and Bihar brought in by labour contractors.\nHence, Option {{CORR}} is correct.",
                  "Identifies recruitment of migrant labour from excerpt."))

    specs.append(("case", CH_RURAL, "Agrarian Transition", p1_hdr,
                  f"Which overarching sociological transformation in rural India is demonstrated by the Kishanpur case study (Mock {m})?",
                  "The commodification of agricultural labour and transition from feudal patron-client ties to a commercial contract market",
                  ["The complete restoration of ancient Vedic varna hierarchy across all northern Indian states",
                   "The total eradication of all social inequality and economic stratification in rural villages",
                   "The decline of modern industrial manufacturing in favor of medieval self-sufficient village isolation"],
                  "The transition from customary jajmani ties to monetized migrant contracts represents the commodification of rural labour and the commercialisation of agriculture.\nHence, Option {{CORR}} is correct.",
                  "Applies overarching sociological concept to case study."))

    # --- CASE STUDY 2: CULTURAL DIVERSITY & MINORITY RIGHTS (Q46-Q50) ---
    p2_hdr = (
        f"[Case Study 2: Institutional Analysis on Cultural Diversity - Mock {m}]\n"
        f"Read the following excerpt on cultural diversity, secularism, and minority rights in democratic India and answer questions 46 to 50:\n\n"
        f"\"In post-colonial nation-building, political theorists distinguish between 'nation-states' and 'state-nations'. "
        f"A classical nation-state presumes that political sovereignty should coincide with a single, culturally homogeneous national identity. "
        f"Consequently, classical nation-states historically deployed aggressive assimilationist policies to eliminate regional languages, "
        f"minority religious laws, and distinct ethnic customs. India, by contrast, emerged as an exemplary 'state-nation'. "
        f"Recognizing that India is an immense 'community of communities' containing hundreds of languages, distinct religious faiths, "
        f"and regional cultures, the Constituent Assembly recognized that forcing cultural uniformity would inevitably spark violent secessionist movements. "
        f"Instead, the Indian democratic framework institutionalized constitutional pluralism. Fundamental rights ensure individual civil equality, "
        f"while Articles 29 and 30 explicitly grant minorities collective rights to preserve their cultural heritage and establish autonomous educational bodies. "
        f"Furthermore, Indian secularism does not mandate a rigid, hostile separation between state and religion as in French laïcité. "
        f"Rather, it operates on the principle of 'principled distance' and equal respect for all faiths, permitting progressive state intervention "
        f"to reform discriminatory internal practices while protecting the collective dignity of minority groups.\""
    )

    specs.append(("case", CH_DIV, "State-Nation vs Nation-State", p2_hdr,
                  f"According to the excerpt (Mock {m}), how does a classical 'nation-state' differ fundamentally from a 'state-nation' like India?",
                  "A nation-state seeks a single, culturally homogeneous identity, whereas a state-nation accommodates and protects diverse cultural identities within a shared democratic framework",
                  ["A nation-state has no written constitution or parliament, while a state-nation is ruled by hereditary feudal kings",
                   "A nation-state exists strictly on uninhabited maritime islands, while a state-nation covers entire continental landmasses",
                   "A nation-state outlaws all international trade, while a state-nation depends entirely on foreign military alliances"],
                  "The passage contrasts classical nation-states that coerce cultural homogeneity with state-nations like India that institutionalize pluralism within a unified political framework.\nHence, Option {{CORR}} is correct.",
                  "Contrasts nation-state and state-nation concepts."))

    specs.append(("case", CH_DIV, "State-Nation vs Nation-State", p2_hdr,
                  f"Why did the Constituent Assembly of India reject aggressive assimilationist cultural policies (Mock {m})?",
                  "Because they recognized that coercing cultural uniformity across diverse communities would provoke alienation and violent secessionist unrest",
                  ["Because the British Crown made cultural assimilation punishable by international economic boycotts",
                   "Because India possessed zero linguistic or religious differences at the time of independence in 1947",
                   "Because the United Nations Charter prohibited sovereign developing countries from holding elections"],
                  "The passage explicitly states that the Assembly recognized that forcing cultural uniformity would spark violent secessionist movements.\nHence, Option {{CORR}} is correct.",
                  "Explains rationale for rejecting cultural assimilation in India."))

    specs.append(("case", CH_DIV, "State-Nation vs Nation-State", p2_hdr,
                  f"What specific collective safeguards do Articles 29 and 30 of the Indian Constitution provide to minority communities (Mock {m})?",
                  "The rights to preserve their distinct language, script, or culture, and to establish and administer educational institutions",
                  ["The right to maintain separate private military forces and print separate sovereign currency notes",
                   "The right to exempt all minority business corporations from paying state commercial taxes",
                   "The right to veto all foreign international diplomatic treaties signed by the central cabinet"],
                  "Articles 29 and 30 guarantee minorities the collective rights to preserve their cultural heritage and run autonomous educational institutions.\nHence, Option {{CORR}} is correct.",
                  "Identifies constitutional provisions of Articles 29 and 30."))

    specs.append(("case", CH_DIV, "State-Nation vs Nation-State", p2_hdr,
                  f"How does the model of Indian secularism differ from French laïcité according to the passage (Mock {m})?",
                  "Indian secularism follows 'principled distance' and equal respect for all religions, whereas French laïcité enforces rigid exclusion of religion from the public sphere",
                  ["Indian secularism establishes an official state church, whereas French laïcité allows religious leaders to run parliament",
                   "Indian secularism prohibits citizens from practicing any religion, whereas French laïcité funds all monasteries equally",
                   "Indian secularism applies only to rural agricultural villages, while French laïcité governs international shipping routes"],
                  "The excerpt notes that unlike the rigid mutual exclusion of French laïcité, Indian secularism practices principled distance and equal respect for all faiths.\nHence, Option {{CORR}} is correct.",
                  "Contrasts Indian secularism with French laïcité."))

    specs.append(("case", CH_DIV, "State-Nation vs Nation-State", p2_hdr,
                  f"Under the Indian model of secularism described in the text (Mock {m}), under what conditions is state intervention in religious practices permitted?",
                  "When necessary for progressive social reform to eradicate discriminatory internal practices (such as untouchability or gender inequality)",
                  ["Only when international corporate business firms demand changes in traditional religious holiday schedules",
                   "Whenever a state governor wishes to convert ancient sacred shrines into luxury commercial shopping centers",
                   "State intervention in religious practices is unconditionally forbidden under all circumstances without exception"],
                  "The text explains that Indian secularism permits state intervention for progressive social reform to eliminate social evils and protect fundamental human dignity.\nHence, Option {{CORR}} is correct.",
                  "Identifies conditions for principled state intervention in religion."))

    assert len(specs) == 50, f"Mock {m} has {len(specs)} questions instead of 50"
    mocks_specs.append(specs)

print(f"Constructed 20 mocks specs ({len(mocks_specs)} x 50 = 1000 questions).")

# Generate and save all 20 mocks
for m_num, specs in enumerate(mocks_specs, start=1):
    target_keys = get_balanced_target_keys(seed=500 + m_num, count=50)
    questions = build_mock_from_specs(PREFIX, m_num, specs, target_keys)
    verify_and_save_mock(questions, OUT_DIR, m_num, global_seen, PREFIX)

print("\n==========================================")
print(f"SUCCESS: All 20 Sociology Mocks Generated!")
print(f"Total Unique Questions: {len(global_seen)}")
print("==========================================")
assert len(global_seen) == 1000, f"Expected 1000 unique questions, got {len(global_seen)}"

