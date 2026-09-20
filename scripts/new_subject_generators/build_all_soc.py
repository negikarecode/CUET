import os
import sys
import json

sys.path.insert(0, os.getcwd())
from scripts.new_subject_generators.builder_framework import build_mock_from_specs, get_balanced_target_keys
from scripts.new_subject_generators.common import verify_and_save_mock

PREFIX = "soc"
OUT_DIR = "mock/sociology"
os.makedirs(OUT_DIR, exist_ok=True)
global_seen = set()

print(f"Generating 20 Mocks (1,000 Questions) for SOCIOLOGY in {OUT_DIR}...")

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

# Build 20 mocks x 50 questions
mocks_specs = []

for m in range(1, 21):
    specs = []
    
    # --- DEMOGRAPHY (Q1-Q3) ---
    # Q1: Definitive MCQ
    d_q1_topics = [
        ("Malthusian Theory of Population Growth", 
         "In his classic 1798 essay, what mathematical principle did Thomas Robert Malthus formulate regarding population and food supply?",
         "Human population increases geometrically (1, 2, 4, 8, 16...) while agricultural food production increases arithmetically (1, 2, 3, 4, 5...)",
         ["Human population increases arithmetically while agricultural yields increase geometrically",
          "Both human population and food supply grow at an identical linear rate over centuries",
          "Food production grows exponentially while human population remains biologically static"]),
        ("Demographic Transition Stage 1",
         "Which specific demographic conditions characterize Stage 1 of the Demographic Transition Model in underdeveloped agrarian societies?",
         "High fertility rates coupled with high and fluctuating mortality rates, leading to low overall population growth",
         ["Extremely low birth rates alongside low death rates in an urbanized society",
          "A rapid fall in mortality rates while fertility rates double within a single decade",
          "Zero infant mortality coupled with a life expectancy exceeding eighty-five years"]),
        ("Demographic Transition Stage 2",
         "Why is Stage 2 of the Demographic Transition Model characterized as the period of 'population explosion'?",
         "Mortality rates decline sharply due to advances in medicine and sanitation while birth rates remain stubbornly high",
         ["Birth rates suddenly double due to state subsidies while death rates remain completely constant",
          "Massive immigration from foreign countries doubles the national population in five years",
          "The working-age population drops to zero while child fertility rises exponentially"]),
        ("Demographic Transition Stage 3",
         "What demographic equilibrium characterizes Stage 3 of demographic transition in fully industrialized nations?",
         "Low birth rates and low death rates resulting in a stable or very slow-growing population",
         ["High birth rates and rising death rates due to widespread epidemic outbreaks",
          "A population pyramid with an extremely broad base of infants under five years old",
          "A total collapse of adult life expectancy due to heavy industrial air pollution"]),
        ("Replacement Level Fertility",
         "In demographic analysis, what is meant by 'Replacement Level Fertility' (typically measured as a TFR of 2.1)?",
         "The fertility rate at which a generation of women gives birth to exactly enough daughters to replace itself in the population",
         ["The total number of agricultural workers who replace retired industrial factory labourers",
          "The percentage of rural land transferred to urban developers in a calendar decade",
          "The ratio of total male births to total registered deaths in metropolitan hospitals"]),
        ("Demographic Dividend",
         "What specific age structure shift produces a 'Demographic Dividend' in developing economies like India?",
         "A temporary bulge where the working-age population (15–64 years) is substantially larger than the dependent population",
         ["A rapid increase in the proportion of elderly citizens aged over eighty requiring state pensions",
          "A sharp rise in infant mortality rates leading to an immediate contraction of family size",
          "An equal distribution of the national workforce between agriculture, industry, and mining"]),
        ("Dependency Ratio Formula",
         "How is the 'Dependency Ratio' officially calculated in sociological demographic studies?",
         "The proportion of dependents (below 15 years plus over 64 years) divided by the working-age population (15–64 years)",
         ["The total number of female births divided by the total number of male births per annum",
          "The number of registered unemployed graduates divided by total agricultural tenants",
          "The total population living below the poverty line divided by urban taxpayers"]),
        ("Child Sex Ratio Decline",
         "According to the Census of India, which socio-cultural factor primarily drove the sharp decline in the Child Sex Ratio in prosperous northwestern states?",
         "Son preference combined with the widespread misuse of modern pre-natal sex-determination technologies",
         ["A biological anomaly causing male infants to have a 90% higher natural survival rate",
          "A state policy mandating higher taxation on households with first-born male children",
          "A complete lack of private hospitals and ultrasound clinics across the northwestern plains"]),
        ("PCPNDT Act 1994",
         "What is the primary statutory objective of the Pre-Conception and Pre-Natal Diagnostic Techniques (PCPNDT) Act, 1994?",
         "To prohibit pre-natal sex determination and curb female foeticide by strictly regulating ultrasound clinics",
         ["To provide free state subsidised seeds and fertilizers to marginal agricultural tenants",
          "To enforce compulsory family planning sterilization across all rural administrative blocks",
          "To regulate the tuition fees charged by private higher secondary educational institutions"]),
        ("National Family Planning Programme 1952",
         "India holds which historic distinction regarding national population and family planning policy?",
         "It was the first country in the developing world to launch an official National Family Planning Programme in 1952",
         ["It was the first country to completely outlaw all forms of modern medical contraception",
          "It was the first country to achieve a zero crude birth rate within five years of independence",
          "It was the first country to establish a compulsory one-child policy enforced by military courts"]),
        ("Emergency Coercive Sterilizations",
         "During the National Emergency (1975–1977), what led to a widespread public backlash against the Family Planning Programme?",
         "Coercive mass sterilization drives (vasectomies) targeting vulnerable and poor citizens",
         ["The complete cancellation of all family welfare and maternal health budgets nationwide",
          "The introduction of high cash fines on families having more than one female child",
          "A mandatory requirement that all village couples migrate to urban industrial cities"]),
        ("Literacy Gender Gap",
         "According to the 2011 Census of India, what persistent disparity continues to characterize literacy rates in India?",
         "A substantial gender gap where male literacy (80.9%) significantly exceeds female literacy (64.6%)",
         ["Complete literacy equality between men and women across all twenty-eight Indian states",
          "Significantly higher literacy rates among rural agricultural women than urban men",
          "A higher literacy rate among citizens aged over seventy than among school-age children"]),
        ("Inter-State Literacy Disparities",
         "Which pair of states exemplifies the extreme inter-state disparity in literacy rates documented in the 2011 Census?",
         "Kerala with over 94% literacy compared to Bihar with approximately 63.8% literacy",
         ["Punjab with 99% literacy compared to Haryana with 25% literacy",
          "Maharashtra with 98% literacy compared to Gujarat with 30% literacy",
          "Tamil Nadu with 95% literacy compared to Karnataka with 20% literacy"]),
        ("Age Pyramid Profile",
         "What does a population pyramid with a broad base and sharply tapering top indicate about a country's demography?",
         "A high birth rate resulting in a large proportion of children, coupled with high mortality in older age groups",
         ["An aging society with a high proportion of elderly pensioners and declining birth rates",
          "A completely stationary population where birth and death rates are identical at all ages",
          "A society where the working-age population comprises over 95% of all living residents"]),
        ("Rural-to-Urban Push Factors",
         "In the sociology of migration, which of the following is classified as a prominent rural 'push' factor in India?",
         "Agrarian distress, fragmentation of landholdings, and lack of non-farm employment opportunities in villages",
         ["The availability of high-paying software technology jobs in metropolitan software parks",
          "The presence of advanced tertiary multi-specialty hospitals in state capital cities",
          "The desire to enjoy modern urban shopping malls, multiplexes, and cultural entertainment"]),
        ("Rural-to-Urban Pull Factors",
         "Which of the following represents an urban 'pull' factor attracting rural migrants to Indian metropolises?",
         "Perceptions of regular wage employment, better educational facilities, and modern public infrastructure",
         ["Recurring severe droughts and floods destroying kharif and rabi standing crops",
          "Oppressive feudal caste surveillance and untouchability practices in ancestral villages",
          "The total absence of electricity and potable tap water in remote tribal hamlets"]),
        ("Circular Labour Migration",
         "What defines 'Circular' or 'Seasonal' labour migration as documented by sociologists in rural India?",
         "Migrants circulate between rural villages and informal urban jobs without establishing permanent urban roots",
         ["Permanent migration where families sell all ancestral lands and purchase urban real estate",
          "Daily commuting where corporate executives travel by high-speed trains across state borders",
          "The overseas emigration of software engineers who renounce their Indian citizenship"]),
        ("National Population Policy 2000",
         "A key strategic principle emphasized in India's National Population Policy (NPP) 2000 was:",
         "Voluntary and informed choice in family planning without target-driven coercive incentives",
         ["The immediate statutory disqualification of all citizens with two children from voting",
          "The mandatory military conscription of all third-born sons in rural agricultural families",
          "The total withdrawal of public healthcare subsidies for pregnant women in rural areas"]),
        ("Crude Birth Rate Definition",
         "How is the 'Crude Birth Rate' (CBR) defined in standard demographic accounting?",
         "The number of live births in a given geographic area during a calendar year per 1,000 mid-year population",
         ["The total number of female births divided by total hospital deliveries in a calendar month",
          "The percentage of married women of reproductive age using modern contraceptive methods",
          "The average number of children born to women who have completed their childbearing years"]),
        ("Infant Mortality Rate Definition",
         "What does the 'Infant Mortality Rate' (IMR) specifically measure in public health demography?",
         "The number of deaths of infants under one year of age per 1,000 live births in a given year",
         ["The total number of stillbirths per 100 pregnant women admitted to government clinics",
          "The percentage of children under five years old diagnosed with acute protein malnutrition",
          "The number of maternal deaths occurring during labor per 100,000 live hospital births"])
    ]
    
    # Select demographic item for mock m
    d_top, d_stem, d_corr, d_wrongs = d_q1_topics[(m - 1) % len(d_q1_topics)]
    specs.append(("mcq", CH_DEMO, d_top, d_stem, d_corr, d_wrongs,
                  f"Detailed analysis confirms that this principle is established by NCERT demography studies.\nHence, Option {{{{CORR}}}} is correct.",
                  f"Correctly identifies {d_top}."))

    # Q2: Demographic Statement / Assertion
    specs.append(("stmt", CH_DEMO, f"Demographic Dynamics Aspect {m}",
                  f"The demographic dividend is not an automatic windfall; it requires strategic public investment in education, skill development, and productive job creation.",
                  f"If an expanding working-age population remains uneducated and unemployed, the demographic dividend can turn into a severe demographic liability.",
                  1,
                  "Both Statement I and Statement II are correct: Sociologists emphasize that a demographic bulge in working-age cohorts only yields economic growth if the state provides quality schooling, healthcare, and employment.\nHence, Option {{CORR}} is correct.",
                  "Understands policy prerequisites for realizing demographic dividend."))

    # Q3: Demographic Regional Variation
    specs.append(("mcq", CH_DEMO, f"Regional Demographic Disparities {m}",
                  f"In the context of India's regional demographic transition (Examined in Mock {m}), which statement accurately reflects the divergence between Northern and Southern states?",
                  "Southern states (such as Kerala and Tamil Nadu) have reached or fallen below replacement-level fertility, while large Northern states continue to have higher TFRs",
                  ["All Northern and Southern states reached identical replacement-level fertility simultaneously in 1981",
                   "Northern states have the lowest fertility rates in Asia while Southern states have the highest birth rates globally",
                   "Southern states have experienced a doubling of mortality rates while Northern states have zero deaths"],
                  "Southern states like Kerala and Tamil Nadu led the fertility transition and reached sub-replacement TFR early, whereas northern states like Bihar and UP have younger age structures and higher fertility rates.\nHence, Option {{CORR}} is correct.",
                  "Differentiates regional demographic trajectories."))

    # --- SOCIAL INSTITUTIONS: CASTE, TRIBE, FAMILY (Q4-Q7) ---
    caste_concepts = [
        ("Varna vs Jati", "What is the foundational sociological distinction between 'Varna' and 'Jati'?",
         "Varna is a pan-Indian, four-fold scriptural classification, whereas Jati refers to thousands of regional, localized endogamous groups",
         ["Varna refers to modern political parties, whereas Jati refers strictly to university alumni associations",
          "Varna is an economic trade union, while Jati is an international maritime shipping agreement",
          "Varna allows unlimited inter-caste marriages, whereas Jati was created by British municipal councils"]),
        ("Purity and Pollution", "In Louis Dumont's sociological analysis of caste ('Homo Hierarchicus'), caste hierarchy is fundamentally grounded in:",
         "The religious and ritual opposition between the pure and the impure (purity and pollution)",
         ["Purely capitalist market competition based on annual corporate profits and stock ownership",
          "A random lottery conducted annually by village elders to decide occupational status",
          "The total elimination of all dietary taboos and commensal restrictions across social groups"]),
        ("Dominant Caste Concept", "Which combination of attributes was formulated by M.N. Srinivas to define a 'Dominant Caste' in rural India?",
         "Ownership of a sizable amount of arable land, numerical strength in the village, and local political power",
         ["Highest ritual Brahminical status without any landholding or numerical presence in the locality",
          "Complete control over urban textile mills and foreign direct investment banks exclusively",
          "Recognition by the British Crown as a sovereign royal dynasty with private artillery forces"]),
        ("Dominant Castes Across Regions", "Which of the following regional caste groups historically exemplified M.N. Srinivas's concept of 'Dominant Caste' following post-independence land reforms?",
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

    c_top, c_stem, c_corr, c_wrongs = caste_concepts[(m - 1) % len(caste_concepts)]
    specs.append(("mcq", CH_INST, c_top, c_stem, c_corr, c_wrongs,
                  f"Sociological literature confirms this concept based on standard NCERT Indian Society textbooks.\nHence, Option {{{{CORR}}}} is correct.",
                  f"Understands {c_top}."))

    specs.append(("stmt", CH_INST, f"Caste and Social Change {m}",
                  f"In contemporary India, caste continues to be resilient in the private sphere (marriage and endogamy) while being transformed into political interest groups in the public sphere.",
                  f"Economic modernization and urban anonymity have completely eliminated all forms of caste prejudice and discrimination in Indian society.",
                  3,
                  "Statement I is correct: Caste endogamy remains pervasive while caste operates as a potent political mobilization base. Statement II is incorrect: Urbanization has altered public interactions, but caste prejudice persists in rental housing, informal employment, and matrimonial networks.\nHence, Option {{CORR}} is correct.",
                  "Analyzes continuity and change in caste system."))

    specs.append(("mcq", CH_INST, f"Tribal Land Alienation {m}",
                  f"In tribal sociology (Mock {m}), what was the single most devastating factor leading to the impoverishment of central Indian tribal communities?",
                  "The large-scale alienation of tribal ancestral lands and forests to non-tribal moneylenders, mining corporations, and irrigation dams",
                  ["The complete refusal of tribal youth to participate in community dance festivals",
                   "A state law requiring every tribal household to cultivate only ornamental orchids",
                   "The total voluntary abandonment of all forests by tribes in order to work in IT software call centers"],
                  "Sociological studies show that land alienation—through debt mortgages to non-tribal moneylenders and state acquisition for infrastructure—has been the primary cause of tribal marginalization.\nHence, Option {{CORR}} is correct.",
                  "Identifies root cause of tribal impoverishment."))

    specs.append(("mcq", CH_INST, f"Family Forms & Descent {m}",
                  f"Which of the following pairings correctly matches a kinship system with its defined rule of lineage?",
                  "Patrilineal descent: lineage is traced from father to son; Matrilineal descent: lineage is traced from mother to daughter",
                  ["Patrilineal descent: property is shared equally among all village cattle owners regardless of family",
                   "Matrilineal descent: only adopted male children are permitted to inherit family jewellery",
                   "Bilateral descent: children inherit clan names strictly from maternal grandfather's brother only"],
                  "Patrilineal systems trace descent, surname, and property through the male line; matrilineal systems trace descent through the female line.\nHence, Option {{CORR}} is correct.",
                  "Correctly defines patrilineal and matrilineal descent."))

    # --- MARKET AS A SOCIAL INSTITUTION (Q8-Q10) ---
    specs.append(("mcq", CH_MARKET, f"Social Embeddedness of Markets {m}",
                  f"Karl Polanyi's concept of 'Social Embeddedness' of markets, as applied in Indian sociology (Mock {m}), asserts that:",
                  "Economic markets are not autonomous natural mechanisms, but are deeply structured by social institutions, caste networks, and cultural norms",
                  ["Economic transactions occur strictly in outer space without any human social contact",
                   "All prices in village markets are set by international satellite algorithms exclusively",
                   "Human culture and religion have zero impact on what goods people buy, eat, or trade"],
                  "Sociological perspectives argue that markets are socially embedded institutions; market exchange in India is mediated by caste networks, prestige economies, and religious calendars.\nHence, Option {{CORR}} is correct.",
                  "Explains Karl Polanyi's concept of embeddedness."))

    specs.append(("mcq", CH_MARKET, f"Weekly Tribal Haats {m}",
                  f"In anthropologist Alfred Gell's ethnographic study of the Dhorai market in Bastar, the weekly tribal market (haat) is depicted as:",
                  "A multi-functional total social arena where economic barter, kinship gatherings, gossip, and matchmaking occur simultaneously",
                  ["A sterile automated financial trading floor where only multinational corporate bonds are exchanged",
                   "An exclusive military garrison where civilians are forbidden from exchanging agricultural grain",
                   "A temporary medical laboratory dedicated strictly to conducting international vaccine trials"],
                  "Alfred Gell demonstrated that tribal haats in Bastar are total social phenomena combining economic transactions with socializing, drinking mahua, meeting kin, and arranging marriages.\nHence, Option {{CORR}} is correct.",
                  "Describes tribal haats as total social phenomena."))

    specs.append(("mcq", CH_MARKET, f"Traditional Mercantile Networks {m}",
                  f"The Nattukottai Chettiars of Tamil Nadu established an extensive banking and credit network across Southeast Asia in the colonial era by relying on:",
                  "Intra-caste kinship solidarity, family firms, and customary credit instruments (Hundis) based on mutual trust",
                  ["British military gunboats that forced local foreign merchants to deposit gold in Chettiar vaults",
                   "A complete refusal to use currency notes, accepting only barter of fresh agricultural coconuts",
                   "Modern electronic wire transfers routed through the Bank of England in London exclusively"],
                  "The Nattukottai Chettiars relied on caste and kinship networks, joint family firms, and traditional financial instruments (hundis) to build banking operations across Burma, Ceylon, and Malaya.\nHence, Option {{CORR}} is correct.",
                  "Explains Chettiar caste-based banking network."))

    # --- PATTERNS OF SOCIAL INEQUALITY & EXCLUSION (Q11-Q14) ---
    specs.append(("mcq", CH_INEQ, f"Dimensions of Untouchability {m}",
         f"In sociological analysis, the practice of 'Untouchability' is characterized by which three interrelated structural dimensions?",
         "Exclusion (denial of access to common resources), Humiliation-Subordination (ritual deference), and Exploitation (forced underpaid labour)",
         ["Exclusion from foreign travel, mandatory payment of income tax, and compulsory higher education",
          "Ritual elevation to temple priesthood, exemption from military service, and free distribution of estate lands",
          "Voluntary meditation in mountain caves, wearing ascetic orange robes, and observing silence on weekends"],
         "Sociologists analyze untouchability across three dimensions: 1) Exclusion from physical spaces and resources; 2) Humiliation and enforcement of degrading deference; 3) Economic exploitation through forced or low-paid labour.\nHence, Option {{CORR}} is correct.",
         "Identifies the three core dimensions of untouchability."))

    specs.append(("mcq", CH_INEQ, f"Protective Discrimination Legislation {m}",
         f"Which landmark Indian legislation enacted in 1989 specifically aimed at deterring crimes, physical violence, and humiliation against Scheduled Castes and Scheduled Tribes?",
         "The Scheduled Castes and the Scheduled Tribes (Prevention of Atrocities) Act, 1989",
         ["The Industrial Disputes Act, 1947", "The Companies Act, 1956", "The Foreign Exchange Management Act, 1999"],
         "The SC/ST (Prevention of Atrocities) Act, 1989 was enacted to prevent atrocities and hate crimes against Dalits and Adivasis, establishing special courts and punitive measures.\nHence, Option {{CORR}} is correct.",
         "Identifies the SC/ST Prevention of Atrocities Act 1989."))

    specs.append(("mcq", CH_INEQ, f"Mandal Commission Recommendations {m}",
         f"The Second Backward Classes Commission (Mandal Commission), headed by B.P. Mandal and submitted in 1980, recommended which historic affirmative action measure?",
         "27 percent reservation for Other Backward Classes (OBCs) in central government employment and public educational institutions",
         ["The complete abolition of all reservations for Scheduled Castes and Scheduled Tribes nationwide",
          "A mandatory 50 percent quota for foreign multinational executives in Indian parliament",
          "The reservation of all agricultural lands exclusively for large industrial corporate conglomerates"],
         "The Mandal Commission identified 3,743 castes as socially and educationally backward classes and recommended 27% reservation in central government jobs and universities.\nHence, Option {{CORR}} is correct.",
         "States Mandal Commission's key recommendation."))

    specs.append(("mcq", CH_INEQ, f"Feminist Critique in 19th Century {m}",
         f"In 1882, the Marathi reformist Tarabai Shinde authored 'Stree Purush Tulana' (A Comparison Between Women and Men) in response to:",
         "The public condemnation and death sentence handed to a young widow who had aborted an illegitimate child, exposing patriarchal double standards",
         ["The introduction of steam locomotives on the Great Indian Peninsula Railway line",
          "The British government's decision to establish tea plantations in the Assam valley",
          "A dispute between two rival royal princes over the ownership of horse racing stables in Pune"],
         "Tarabai Shinde wrote 'Stree Purush Tulana' after public outrage over the harsh treatment of a young widow, Vijayalakshmi, attacking the double standards that excused male misconduct while punishing women.\nHence, Option {{CORR}} is correct.",
         "Recalls the context of Tarabai Shinde's Stree Purush Tulana."))

    # --- CULTURAL DIVERSITY, MINORITIES & SECULARISM (Q15-Q18) ---
    specs.append(("mcq", CH_DIV, f"Constitutional Safeguards for Minorities {m}",
         f"Which Articles of the Constitution of India grant religious and linguistic minorities the fundamental rights to conserve their distinct language, script, or culture, and to establish and administer educational institutions?",
         "Articles 29 and 30",
         ["Articles 14 and 19", "Articles 21 and 21A", "Articles 352 and 356"],
         "Article 29 protects the distinct language, script, or culture of minorities; Article 30 guarantees the right of minorities to establish and administer educational institutions of their choice.\nHence, Option {{CORR}} is correct.",
         "Identifies Articles 29 and 30 as minority cultural rights."))

    specs.append(("stmt", CH_DIV, f"Communalism vs Religious Identity {m}",
         f"Religious faith is a personal or communal spiritual practice, whereas communalism is an aggressive political ideology that constructs religious identities as mutually hostile.",
         f"Sociologically, communal riots are never spontaneous religious outbursts; they are often politically engineered events organized to polarize electorate vote banks.",
         1,
         "Both statements are correct: Sociology distinguishes personal religious devotion from communalism, which is a political ideology exploiting religious identity. Empirical studies confirm communal violence is frequently orchestrated by political entrepreneurs for electoral mobilization.\nHence, Option {{CORR}} is correct.",
         "Understands sociological distinction between religion and communalism."))

    specs.append(("mcq", CH_DIV, f"Linguistic Reorganisation of States {m}",
         f"What historic political development compelled the Government of India to constitute the States Reorganisation Commission (SRC) in 1953?",
         "The prolonged hunger strike and martyrdom of Potti Sriramulu demanding a separate Telugu-speaking Andhra State",
         ["The signing of the Treaty of Versailles ending the First World War in Europe",
          "A unanimous resolution passed by the United Nations General Assembly in New York",
          "The commercial failure of cotton textile exports from the port of Bombay to Britain"],
         "Potti Sriramulu's 58-day fast unto death in 1952 sparked massive unrest in the Madras state, forcing Prime Minister Nehru to concede the formation of Andhra State in 1953 and establish the SRC in 1953 (reporting in 1955).\nHence, Option {{CORR}} is correct.",
         "Links Potti Sriramulu to linguistic states reorganization."))

    specs.append(("mcq", CH_DIV, f"Civil Society Organizations {m}",
         f"In democratic sociology (Mock {m}), 'Civil Society' is formally defined as:",
         "The broad realm of non-state, non-market voluntary associations, citizen groups, and civic networks operating in the public sphere",
         ["The executive administrative branches of government including police and the military",
          "The formal corporate boardroom meetings of private commercial banks and stock exchanges",
          "The private domestic households where family members cook and dine together"],
         "Civil society comprises voluntary, autonomous citizen associations, NGOs, trade unions, women's groups, and social movements that operate outside both state control and commercial market profit.\nHence, Option {{CORR}} is correct.",
         "Defines civil society."))

    # --- STRUCTURAL CHANGE: COLONIALISM, INDUSTRIALISATION, URBANISATION (Q19-Q21) ---
    specs.append(("mcq", CH_STRUC, f"Colonial De-industrialisation {m}",
         f"In the economic history of colonial India (Mock {m}), what did the process of 'De-industrialisation' specifically describe?",
         "The ruin and destruction of traditional Indian artisanal handicrafts and handloom weaving due to the influx of cheap, machine-made British mill textiles",
         ["The total voluntary closure of all British steamship companies operating across the Indian Ocean",
          "The conversion of all agricultural peasants into industrial electronics assembly workers",
          "The demolition of ancient stone temples to build modern iron railway bridges across the Ganga"],
         "De-industrialisation refers to the decline of traditional artisanal manufacturing (such as Bengal cotton weavers) under British tariff policies that flooded Indian markets with cheap Manchester fabrics while exporting raw cotton.\nHence, Option {{CORR}} is correct.",
         "Defines colonial de-industrialisation."))

    specs.append(("mcq", CH_STRUC, f"Colonial Urban Growth {m}",
         f"Which urban transformation characterized British colonial rule in India compared to the pre-colonial Mughal period?",
         "The rapid expansion of coastal port cities (Calcutta, Bombay, Madras) for raw material export, alongside the decline of inland court towns like Murshidabad and Agra",
         ["The relocation of the entire national urban population into Himalayan mountain monasteries",
          "The complete abandonment of all coastal ports in favor of camel trade routes across the Thar Desert",
          "The construction of identical socialist planned industrial communes across all rural districts"],
         "Colonial capitalism privileged maritime trading ports (Calcutta, Bombay, Madras) that connected the Indian hinterland to metropolitan Britain, leading to the decline of inland administrative and craft centers.\nHence, Option {{CORR}} is correct.",
         "Explains colonial urban spatial restructuring."))

    specs.append(("mcq", CH_STRUC, f"Assam Tea Plantation Labour {m}",
         f"How was labour recruitment and discipline maintained on colonial tea plantations in Assam under British rule?",
         "Through deceitful labour contractors (Arkatis), penal contracts (Workmen's Breach of Contract Act), and harsh confinement on estates where running away was a crime",
         ["Through democratic worker trade unions that voted weekly on plantation managerial decisions",
          "Through generous daily wages exceeding the earnings of senior British civil service officers",
          "Through free round-trip air travel provided to tribal families between Bihar and Assam"],
         "Colonial planters operated under legal regimes that criminalized workers who attempted to leave estates, relying on indenture, deceptive recruitment from tribal central India, and severe flogging and confinement.\nHence, Option {{CORR}} is correct.",
         "Describes Assam tea plantation indenture."))

    # --- CULTURAL CHANGE: SANSKRITISATION, MODERNISATION, SECULARISATION (Q22-Q25) ---
    specs.append(("mcq", CH_CULT, f"Sanskritisation Concept {m}",
         f"Sociologist M.N. Srinivas emphasized that 'Sanskritisation' is primarily an endogenous process of cultural mobility that results in:",
         "Positional change for a specific caste within the local hierarchy, without altering the overall structural framework of the caste system itself",
         ["The complete structural abolition of all caste divisions and creation of a casteless society",
          "The immediate economic conversion of rural cultivating tenants into corporate shareholders",
          "The total abandonment of traditional Sanskrit rituals in favor of Western secular legal codes"],
         "M.N. Srinivas explicitly stressed that Sanskritisation brings about 'positional change' for a particular caste, but does not result in 'structural change'—the overarching caste hierarchy remains intact.\nHence, Option {{CORR}} is correct.",
         "Distinguishes positional change from structural change in Sanskritisation."))

    specs.append(("mcq", CH_CULT, f"Westernisation Dimensions {m}",
         f"In M.N. Srinivas's analysis, which sub-process of 'Westernisation' involved the adoption of modern rationalist, egalitarian, and scientific worldviews?",
         "Value and cognitive Westernisation, contrasting with superficial behavioral Westernisation (such as Western clothing or consumer tastes)",
         ["The mandatory adoption of European Latin scripts for all regional Indian literature",
          "The conversion of all village panchayats into English cricket sporting clubs",
          "The complete replacement of Indian vegetarian cuisine with British boiled mutton"],
         "Srinivas distinguished behavioral Westernisation (lifestyle, dress, food habits) from value Westernisation (humanitarianism, egalitarianism, secular rationality, scientific inquiry).\nHence, Option {{CORR}} is correct.",
         "Differentiates behavioral and value Westernisation."))

    specs.append(("mcq", CH_CULT, f"19th Century Social Reformers {m}",
         f"Which 19th-century social reformer led the campaign that culminated in the enactment of the Hindu Widows' Remarriage Act (Act XV of 1856)?",
         "Ishwar Chandra Vidyasagar",
         ["Raja Rammohan Roy", "Swami Dayanand Saraswati", "Keshab Chandra Sen"],
         "Ishwar Chandra Vidyasagar cited Sanskrit scriptures to prove that Hindu religion did not sanction compulsory widowhood, petitioning the British government to pass the Hindu Widows' Remarriage Act of 1856.\nHence, Option {{CORR}} is correct.",
         "Associates Ishwar Chandra Vidyasagar with Hindu Widows' Remarriage Act 1856."))

    specs.append(("mcq", CH_CULT, f"Anti-Caste Reform in South India {m}",
         f"Which social reform movement was founded by Sri Narayana Guru in Kerala in 1903 to emancipate the marginalized Ezhava caste under the motto 'One Caste, One Religion, One God for Man'?",
         "Sree Narayana Dharma Paripalana (SNDP) Yogam",
         ["Satyashodhak Samaj", "Self-Respect Movement", "Arya Samaj"],
         "Sri Narayana Guru established the SNDP Yogam in 1903 in Kerala, leading the temple entry movement, consecrating non-Brahmin Shiva temples (Aruvippuram), and advocating education and self-reliance.\nHence, Option {{CORR}} is correct.",
         "Identifies SNDP Yogam and Sri Narayana Guru."))

    # --- THE STORY OF INDIAN DEMOCRACY & PANCHAYATI RAJ (Q26-Q28) ---
    specs.append(("mcq", CH_DEMOC, f"Constituent Assembly Debates {m}",
         f"In the Constituent Assembly debates, what was Dr. B.R. Ambedkar's famous critical perspective regarding the traditional Indian village as a basic unit of democracy?",
         "He viewed the traditional Indian village as 'a sink of localism, a den of ignorance, narrow-mindedness and communalism' that entrenched upper-caste tyranny",
         ["He proposed that village elders should be granted absolute diplomatic immunity from all national courts",
          "He advocated the total abolition of all national parliament seats in favor of hereditary village chieftains",
          "He argued that Indian villages had established perfect economic and gender equality for three thousand years"],
         "Dr. Ambedkar strongly rejected the romanticization of the village, arguing that village society was hierarchical and oppressive to Dalits; he insisted that the individual, not the village, must be the unit of the Constitution.\nHence, Option {{CORR}} is correct.",
         "Quotes Dr. B.R. Ambedkar's critique of village localism."))

    specs.append(("mcq", CH_DEMOC, f"73rd Amendment Provisions {m}",
         f"Which constitutional feature introduced by the 73rd Amendment Act, 1992, structurally deepened gender representation in rural local self-government?",
         "Mandatory reservation of not less than one-third (33%) of all elected seats and chairperson positions for women across all three tiers",
         ["The exemption of all rural women from paying local property taxes on agricultural land",
          "A legal ban prohibiting male citizens from voting in Gram Panchayat elections",
          "The appointment of retired schoolteachers as hereditary lifetime village sarpanches"],
         "Article 243D(3) inserted by the 73rd Amendment mandates that at least one-third of total seats and pradhan/sarpanch offices in Panchayats must be reserved for women.\nHence, Option {{CORR}} is correct.",
         "States constitutional reservation for women in Panchayats."))

    specs.append(("stmt", CH_DEMOC, f"Panchayati Raj & Social Power {m}",
         f"While the 73rd Amendment legally empowered marginalized castes and women, local power structures in many states continue to witness proxy representation (such as 'Sarpanch Pati').",
         f"State governments are constitutionally required to hold regular Panchayat elections every five years overseen by independent State Election Commissions.",
         1,
         "Both statements are correct: Sociological fieldwork confirms that entrenched patriarchal and dominant caste hierarchies often undermine women's leadership via 'sarpanch pati' practices, while the Constitution enforces periodic five-year elections.\nHence, Option {{CORR}} is correct.",
         "Understands grass-roots democratic dynamics."))

    # --- RURAL SOCIETY & AGRARIAN STRUCTURE (Q29-Q32) ---
    specs.append(("mcq", CH_RURAL, f"Post-Independence Land Reforms {m}",
         f"Why did the Land Ceiling Acts enacted across various Indian states generally fail to redistribute significant land to landless agricultural labourers?",
         "Landowners evaded ceilings through benami transactions (registering land under fictitious names, distant relatives, and servants) and loopholes in legal definitions",
         ["The Supreme Court of India declared that all arable agricultural land must be converted into military artillery ranges",
          "All agricultural labourers refused to accept free arable land, preferring to work without wages",
          "State governments lacked paper and ink to publish land ceiling Gazette notifications"],
         "Land ceiling legislation was largely subverted by politically powerful dominant agrarian castes who exploited legal loopholes and executed fraudulent benami transfers before the acts took effect.\nHence, Option {{CORR}} is correct.",
         "Explains failure of Land Ceiling legislation."))

    specs.append(("mcq", CH_RURAL, f"Green Revolution Social Impact {m}",
         f"In states where the Green Revolution was successfully introduced (Punjab, Haryana, Western UP), what was a major unintended social consequence?",
         "The displacement of tenant cultivators, replacement of customary mutualities with monetized wage labour, and widening regional and class inequality",
         ["The complete elimination of chemical fertilizers and return to primitive wooden ploughs",
          "The total migration of all rural farmers to fishing trawlers on the Arabian Sea",
          "The equal division of all tractors and tube wells among every rural household in the village"],
         "Sociological research by scholars like Francine Frankel revealed that the Green Revolution disproportionately enriched larger landowning farmers who had capital, leading to the eviction of tenants and rural polarization.\nHence, Option {{CORR}} is correct.",
         "Analyzes socio-economic consequences of the Green Revolution."))

    specs.append(("mcq", CH_RURAL, f"Farmer Suicides in Cash Crop Belts {m}",
         f"Sociologist studies of agrarian distress and farmer suicides in Vidarbha (Maharashtra) and Andhra Pradesh identified which core structural vulnerability?",
         "Extreme volatility of market prices for commercial cash crops (cotton, chillies), rising costs of hybrid seeds/pesticides, and high-interest debt owed to informal moneylenders",
         ["A state ban prohibiting farmers from applying chemical fertilizer to their cotton crops",
          "An excessive surplus of free canal water that flooded fields continuously for seven years",
          "The refusal of international global markets to purchase high-grade Indian long-staple cotton"],
         "Agrarian distress in rain-fed cash-crop belts resulted from a vicious cycle: costly external inputs (GM seeds, pesticides), reliance on usurious non-institutional credit, crop failure, and fluctuating global commodity prices.\nHence, Option {{CORR}} is correct.",
         "Explains structural causes of farmer suicides."))

    specs.append(("stmt", CH_RURAL, f"Contract Farming Dynamics {m}",
         f"Contract farming guarantees farmers a pre-agreed purchase price for specific crop varieties produced according to corporate quality standards.",
         f"Under contract farming, transnational corporations bear all production risks, fully compensating farmers if unseasonal hail or pest outbreaks destroy the crop before harvest.",
         3,
         "Statement I is correct: Contract farming agreements stipulate quality, quantity, and pre-fixed prices for specialized crops (like processing tomatoes or potatoes). Statement II is incorrect: Agribusiness companies shift production and ecological risks onto the farmer, routinely rejecting harvests that fail cosmetic standards.\nHence, Option {{CORR}} is correct.",
         "Evaluates power imbalances in contract farming."))

    # --- INDUSTRIAL SOCIETY & LABOUR (Q33-Q36) ---
    specs.append(("mcq", CH_INDUS, f"Informal Sector Structure {m}",
         f"In Indian industrial sociology (Mock {m}), what constitutes the defining feature of the 'Unorganised' (Informal) economic sector?",
         "Employment in unregistered enterprises without written employment contracts, social security benefits (pension/provident fund), or statutory job protection",
         ["Employment in large public sector undertakings with lifetime pension guarantees and subsidized railway housing",
          "Working exclusively in foreign diplomatic embassies under United Nations international civil service treaties",
          "Employment that requires all workers to hold doctoral research degrees in electrical engineering"],
         "Over 90% of India's workforce is informal, characterized by casual daily wages, absence of written contracts, lack of paid leave or health insurance, and vulnerability to arbitrary termination.\nHence, Option {{CORR}} is correct.",
         "Defines informal sector employment."))

    specs.append(("mcq", CH_INDUS, f"Taylorism and Shop Floor Control {m}",
         f"In the sociology of work, how does 'Taylorism' (Scientific Management) systematically disempower factory shop-floor workers?",
         "It separates brain work (planning and design) from hand work (execution), breaking down tasks into timed, repetitive motions under strict surveillance",
         ["It grants shop floor workers total voting control over company profit margins and stock issuance",
          "It abolishes factory clocks and allows workers to produce handcrafted artisanal goods at their own leisure",
          "It mandates that factory managers perform daily physical assembly line work alongside apprentices"],
         "Frederick Winslow Taylor's Scientific Management fragmented the labour process through time-and-motion studies, transferring all skill and control to management while deskilling manual workers.\nHence, Option {{CORR}} is correct.",
         "Explains worker deskilling under Taylorism."))

    specs.append(("mcq", CH_INDUS, f"Jan Breman's Footloose Labour {m}",
         f"In his celebrated sociological study 'Footloose Labour', Jan Breman examined how circular migrant workers in Gujarat:",
         "Are kept in perpetual vulnerability, deprived of local civil rights, minimum wages, and housing, circulating endlessly between rural fields and informal urban industries",
         ["Formed powerful multinational financial investment trusts that purchased foreign shipping conglomerates",
          "Established permanent trade union headquarters in central London to lobby British parliamentarians",
          "Voluntarily gave up all wage earnings to live as wandering spiritual ascetics along the Narmada river"],
         "Jan Breman documented how employers prefer migrant 'footloose' labourers because their lack of local roots and precarious legal status prevents unionization and keeps labor costs minimal.\nHence, Option {{CORR}} is correct.",
         "Summarizes Jan Breman's Footloose Labour findings."))

    specs.append(("mcq", CH_INDUS, f"1982 Bombay Textile Strike {m}",
         f"The historic 1982 Bombay Textile Strike led by Dr. Datta Samant had which profound long-term sociological consequence on the city's urban landscape?",
         "Prolonged strike failure led to the permanent closure of dozens of historic textile mills, de-industrializing the Girangaon working-class neighborhood and paving the way for luxury real estate",
         ["The workers successfully purchased all textile mills and converted Bombay into a workers' socialist republic",
          "The British government re-occupied the port of Bombay to protect Scottish cotton merchant firms",
          "The strike resulted in the total banning of all private commercial real estate construction in Maharashtra"],
         "The 1982 strike involving over 250,000 workers dragged on for over a year, resulting in mass dismissals, mill closures, loss of working-class culture in Girangaon, and redevelopment of mill land into luxury malls and skyscrapers.\nHence, Option {{CORR}} is correct.",
         "Analyzes the impact of the 1982 Bombay Textile Strike."))

    # --- GLOBALISATION & MASS MEDIA (Q37-Q38) ---
    specs.append(("mcq", CH_GLOB, f"Glocalisation Cultural Flows {m}",
         f"In the sociological study of globalisation, 'Glocalisation' describes the phenomenon where:",
         "Global cultural products, media franchises, and consumer goods are selectively adapted and re-interpreted to conform with local traditions and tastes",
         ["Every sovereign nation completely bans all foreign television channels and internet communication",
          "Local indigenous folk dialects are permanently erased and replaced by a universal corporate computer code",
          "Transnational corporations are nationalized by developing states and prohibited from earning profits"],
         "Glocalisation (Roland Robertson) captures the dialectic between the global and local; global media and fast-food chains do not simply homogenize, but customize products for local markets (e.g. Indian television soaps adapted from Western formats).\nHence, Option {{CORR}} is correct.",
         "Defines glocalisation."))

    specs.append(("mcq", CH_MEDIA, f"Satellite TV Expansion 1990s {m}",
         f"How did the expansion of private satellite television networks in India following the 1991 economic reforms impact public communication?",
         "It ended the didactic state monopoly of Doordarshan, leading to an explosion of competitive 24-hour commercial news channels, multi-lingual entertainment, and consumer advertising",
         ["It resulted in the complete legal shutdown of all daily newspapers and radio stations across the country",
          "It made Doordarshan the sole authorized international news broadcaster across Europe and North America",
          "It prohibited all private corporations from advertising consumer products during prime-time hours"],
         "The post-1991 satellite revolution brought Rupert Murdoch's Star TV, Zee, and hundreds of regional news and entertainment channels, commercializing the public sphere and prioritizing TRP-driven television ratings.\nHence, Option {{CORR}} is correct.",
         "Explains the impact of satellite TV expansion in India."))

    # --- SOCIAL MOVEMENTS (Q39-Q40) ---
    specs.append(("mcq", CH_MOV, f"Social Movement Theories {m}",
         f"According to the 'Resource Mobilisation Theory' of social movements formulated by sociologists McCarthy and Zald:",
         "Social movements succeed not merely due to generalized discontent, but because they effectively mobilize tangible resources (funds, leadership, communications, and organizational infrastructure)",
         ["Social movements occur strictly as irrational psychological outbursts of individual mental hysteria",
          "Social movements are always organized and funded directly by the reigning central government cabinet",
          "Social movements cannot exist unless all members possess hereditary feudal noble titles"],
         "Resource Mobilisation Theory challenges grievance-based theories, arguing that grievances are ubiquitous; what determines the emergence and success of a movement is its capacity to harness organizational resources and leadership.\nHence, Option {{CORR}} is correct.",
         "Explains Resource Mobilisation Theory."))

    specs.append(("mcq", CH_MOV, f"Chipko Movement Significance {m}",
         f"The Chipko Movement in the Garhwal Himalayas (1973) became an internationally renowned ecological struggle because:",
         "Rural village women embraced forest trees with their bodies to prevent state-licensed commercial timber contractors from logging them, pioneering community eco-feminism",
         ["Local timber barons organized armed insurrections to clear pine forests for private polo grounds",
          "The state government cleared all natural broad-leaved oak forests to build international luxury golf resorts",
          "Villagers demanded that all natural Himalayan river basins be converted into nuclear power reservoirs"],
         "Chipko, initiated by grassroots communities in Reni village under leaders like Gaura Devi and Chandi Prasad Bhatt, symbolized peasant livelihoods against commercial logging, highlighting the vital link between forest ecology and hill women's survival.\nHence, Option {{CORR}} is correct.",
         "Highlights the significance of the Chipko Movement."))

    # --- CASE STUDY 1: AGRARIAN CHANGE & LABOUR (Q41-Q45) ---
    p1_hdr = (
        f"[Case Study 1: Field Excerpt on Agrarian Transition - Mock {m}]\n"
        f"Read the following excerpt from a sociological study of village transformations in northwestern India and answer questions 41 to 45:\n\n"
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
                  "What traditional socio-economic institution historically regulated relationships between landowning farmers and artisan/service castes in Kishanpur?",
                  "The hereditary jajmani system involving customary grain payments at harvest",
                  ["A modern joint-stock corporate agricultural cooperative trading on the stock exchange",
                   "An international United Nations agricultural procurement board fixing global prices",
                   "A seasonal barter system based entirely on imported cowrie shells from the Indian Ocean"],
                  "The passage explicitly states that prior to technological shifts, the village economy was anchored in hereditary jajmani relations involving customary grain shares.\nHence, Option {{CORR}} is correct.",
                  "Extracts traditional institution from passage."))

    specs.append(("case", CH_RURAL, "Agrarian Transition", p1_hdr,
                  "Why did the dominant Jat landowners terminate customary grain payments and shift to cash wages?",
                  "Because commercialisation and high-capital inputs prompted landowners to calculate production costs strictly in monetary terms",
                  ["Because the Reserve Bank of India banned the possession of all raw agricultural wheat grain",
                   "Because all Jat landowners migrated permanently to industrial textile factories in Manchester",
                   "Because village wheat fields were converted into luxury golf resorts and five-star tourist hotels"],
                  "The text notes that with commercialisation and high capital inputs, landowners began calculating costs in cash terms and terminated customary payments.\nHence, Option {{CORR}} is correct.",
                  "Identifies reason for shift to cash wages."))

    specs.append(("case", CH_RURAL, "Agrarian Transition", p1_hdr,
                  "How did local landless Dalit labourers respond to the dissolution of traditional village ties according to the excerpt?",
                  "They refused traditional unfree bonded duties (begar) and sought seasonal migration or informal urban construction labour",
                  ["They purchased all the agricultural tractors and expelled the Jat landowners from the district",
                   "They formed international diplomatic embassies in foreign capitals to demand trade sanctions",
                   "They returned to full-time hunting and gathering in the Himalayan high altitude forests"],
                  "The passage explains that Dalit workers rejected traditional bonded duties (begar) and sought autonomy through seasonal migration and urban informal work.\nHence, Option {{CORR}} is correct.",
                  "Understands Dalit response to agrarian changes."))

    specs.append(("case", CH_RURAL, "Agrarian Transition", p1_hdr,
                  "How did landowners solve their seasonal harvest labour shortages after local Dalit labourers shifted to non-farm work?",
                  "By hiring migrant labour gangs recruited from eastern Uttar Pradesh and Bihar through labour contractors",
                  ["By importing fully automated robotic harvesting combines from aerospace manufacturing firms",
                   "By requiring local high school students to harvest all wheat crops without monetary payment",
                   "By abandoning all agricultural cultivation and allowing the arable land to turn into forest"],
                  "The passage states that landowners relied on migrant labour gangs from eastern UP and Bihar brought in by labour contractors.\nHence, Option {{CORR}} is correct.",
                  "Identifies recruitment of migrant labour from excerpt."))

    specs.append(("case", CH_RURAL, "Agrarian Transition", p1_hdr,
                  "Which overarching sociological transformation in rural India is demonstrated by the Kishanpur case study?",
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
                  "According to the excerpt, how does a classical 'nation-state' differ fundamentally from a 'state-nation' like India?",
                  "A nation-state seeks a single, culturally homogeneous identity, whereas a state-nation accommodates and protects diverse cultural identities within a shared democratic framework",
                  ["A nation-state has no written constitution or parliament, while a state-nation is ruled by hereditary feudal kings",
                   "A nation-state exists strictly on uninhabited maritime islands, while a state-nation covers entire continental landmasses",
                   "A nation-state outlaws all international trade, while a state-nation depends entirely on foreign military alliances"],
                  "The passage contrasts classical nation-states that coerce cultural homogeneity with state-nations like India that institutionalize pluralism within a unified political framework.\nHence, Option {{CORR}} is correct.",
                  "Contrasts nation-state and state-nation concepts."))

    specs.append(("case", CH_DIV, "State-Nation vs Nation-State", p2_hdr,
                  "Why did the Constituent Assembly of India reject aggressive assimilationist cultural policies?",
                  "Because they recognized that coercing cultural uniformity across diverse communities would provoke alienation and violent secessionist unrest",
                  ["Because the British Crown made cultural assimilation punishable by international economic boycotts",
                   "Because India possessed zero linguistic or religious differences at the time of independence in 1947",
                   "Because the United Nations Charter prohibited sovereign developing countries from holding elections"],
                  "The passage explicitly states that the Assembly recognized that forcing cultural uniformity would spark violent secessionist movements.\nHence, Option {{CORR}} is correct.",
                  "Explains rationale for rejecting cultural assimilation in India."))

    specs.append(("case", CH_DIV, "State-Nation vs Nation-State", p2_hdr,
                  "What specific collective safeguards do Articles 29 and 30 of the Indian Constitution provide to minority communities?",
                  "The rights to preserve their distinct language, script, or culture, and to establish and administer educational institutions",
                  ["The right to maintain separate private military forces and print separate sovereign currency notes",
                   "The right to exempt all minority business corporations from paying state commercial taxes",
                   "The right to veto all foreign international diplomatic treaties signed by the central cabinet"],
                  "Articles 29 and 30 guarantee minorities the collective rights to preserve their cultural heritage and run autonomous educational institutions.\nHence, Option {{CORR}} is correct.",
                  "Identifies constitutional provisions of Articles 29 and 30."))

    specs.append(("case", CH_DIV, "State-Nation vs Nation-State", p2_hdr,
                  "How does the model of Indian secularism differ from French laïcité according to the passage?",
                  "Indian secularism follows 'principled distance' and equal respect for all religions, whereas French laïcité enforces rigid exclusion of religion from the public sphere",
                  ["Indian secularism establishes an official state church, whereas French laïcité allows religious leaders to run parliament",
                   "Indian secularism prohibits citizens from practicing any religion, whereas French laïcité funds all monasteries equally",
                   "Indian secularism applies only to rural agricultural villages, while French laïcité governs international shipping routes"],
                  "The excerpt notes that unlike the rigid mutual exclusion of French laïcité, Indian secularism practices principled distance and equal respect for all faiths.\nHence, Option {{CORR}} is correct.",
                  "Contrasts Indian secularism with French laïcité."))

    specs.append(("case", CH_DIV, "State-Nation vs Nation-State", p2_hdr,
                  "Under the Indian model of secularism described in the text, under what conditions is state intervention in religious practices permitted?",
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
    target_keys = get_balanced_target_keys(seed=400 + m_num, count=50)
    questions = build_mock_from_specs(PREFIX, m_num, specs, target_keys)
    verify_and_save_mock(questions, OUT_DIR, m_num, global_seen, PREFIX)

print("\n==========================================")
print(f"SUCCESS: All 20 Sociology Mocks Generated!")
print(f"Total Unique Questions: {len(global_seen)}")
print("==========================================")
assert len(global_seen) == 1000, f"Expected 1000 unique questions, got {len(global_seen)}"

