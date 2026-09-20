import os, sys

fpath = "scripts/generators/soc/slots_1_10.py"

# We will load the existing demo_q2_stmts, demo_q3_ars, caste_q4_items from gen_soc_direct.py
# and format them into SLOTS[2], SLOTS[3], SLOTS[4]!

code_slots_2_4 = '''
# ==============================================================================
# SLOT 2: Demographic Statements & Dual-Proposition Evaluations (20 Questions)
# ==============================================================================
SLOTS[2] = [
    ("stmt", CH_DEMO, "Malthusian Checks & Population Growth",
     "Malthus identified 'positive checks' as natural catastrophes such as famines, wars, and epidemics.",
     "Malthus identified 'preventive checks' as voluntary human postponements of marriage and moral restraint.", 1,
     "Both statements are correct: Malthus distinguished between natural positive checks and voluntary preventive checks.\\nHence, Option {{CORR}} is correct.",
     "Differentiates Malthusian positive and preventive checks."),

    ("stmt", CH_DEMO, "Demographic Transition Stages 1 and 2",
     "Stage 1 of demographic transition has low population growth because high birth rates are canceled out by high death rates.",
     "Stage 2 of demographic transition witnesses zero population growth because death rates equal birth rates.", 3,
     "Statement I is correct; Statement II is incorrect because Stage 2 experiences rapid population explosion due to falling death rates.\\nHence, Option {{CORR}} is correct.",
     "Analyzes growth disparities between Stage 1 and Stage 2."),

    ("stmt", CH_DEMO, "Stage 2 vs Stage 3 Dynamics",
     "Stage 2 population explosion occurs because death rates plummet while birth rates decline slowly with cultural lag.",
     "Stage 3 of demographic transition is marked by low birth rates and low death rates in an industrialized urban society.", 1,
     "Both statements are correct: Stage 2 features rapid explosion while Stage 3 reaches low vital equilibrium.\\nHence, Option {{CORR}} is correct.",
     "Contrasts Stage 2 explosion with Stage 3 low-growth equilibrium."),

    ("stmt", CH_DEMO, "Demographic Dividend Prerequisites",
     "The demographic dividend automatically generates economic prosperity without any requirement of government schooling or job creation.",
     "If working-age youth remain uneducated and unemployed, the demographic dividend can transform into a demographic disaster.", 4,
     "Statement I is incorrect because the dividend requires investment; Statement II is correct regarding unemployment risks.\\nHence, Option {{CORR}} is correct.",
     "Understands institutional prerequisites for realizing the demographic dividend."),

    ("stmt", CH_DEMO, "Dependency Ratio Trends",
     "India's demographic dividend window is expected to last for several decades into the 2040s.",
     "The dependency ratio is highest when the working-age population constitutes 90 percent of the total population.", 3,
     "Statement I is correct; Statement II is incorrect because dependency ratio is lowest when working-age cohort is maximized.\\nHence, Option {{CORR}} is correct.",
     "Evaluates demographic dividend duration and dependency ratio formula."),

    ("stmt", CH_DEMO, "Sex Ratio vs Child Sex Ratio 2011",
     "The 2011 Census recorded an overall sex ratio of 943 females per 1,000 males in India.",
     "The child sex ratio (0-6 years) in the 2011 Census improved to 980 females per 1,000 males across north India.", 3,
     "Statement I is correct (943); Statement II is incorrect as child sex ratio dropped to an alarming 919 girls per 1,000 boys.\\nHence, Option {{CORR}} is correct.",
     "Recalls 2011 Census sex ratio and child sex ratio statistics."),

    ("stmt", CH_DEMO, "Northwestern Child Sex Ratio Deficits",
     "States like Punjab and Haryana historically recorded acute deficits in the child sex ratio despite being economically prosperous.",
     "Prosperous families in northwestern India historically possessed greater access to sex-selective diagnostic ultrasound clinics.", 1,
     "Both statements are correct: Prosperity combined with son preference and medical access accelerated female foeticide.\\nHence, Option {{CORR}} is correct.",
     "Links economic prosperity with sex-selective technologies in northwestern India."),

    ("stmt", CH_DEMO, "Literacy Rates and Gender Parity",
     "Female literacy in India increased substantially between 2001 and 2011.",
     "The gender gap in literacy was completely eliminated by 2011, with male and female literacy reaching perfect parity.", 3,
     "Statement I is correct; Statement II is incorrect because a substantial gender gap of 16.3 percentage points persisted in 2011.\\nHence, Option {{CORR}} is correct.",
     "Identifies female literacy improvements and persistent gender gaps."),

    ("stmt", CH_DEMO, "Kerala Demographic Exceptionalism",
     "Kerala's total fertility rate fell below replacement level well before most northern states.",
     "Kerala achieved fertility transition primarily through high female literacy, healthcare access, and social reform.", 1,
     "Both statements are correct: Kerala achieved early fertility transition via social development rather than coercive mandates.\\nHence, Option {{CORR}} is correct.",
     "Explains socio-developmental drivers of Kerala's fertility transition."),

    ("stmt", CH_DEMO, "History of Family Planning Programme",
     "India was the first country in the developing world to establish an official state Family Planning Programme in 1952.",
     "During the National Emergency (1975-77), the Family Planning Programme relied strictly on voluntary counseling without quotas.", 3,
     "Statement I is correct; Statement II is incorrect because Emergency family planning enforced coercive mass vasectomy quotas.\\nHence, Option {{CORR}} is correct.",
     "Contrasts 1952 policy origins with 1975-77 coercive excesses."),

    ("stmt", CH_DEMO, "Post-Emergency Family Welfare Paradigm",
     "Following public anger over Emergency sterilization drives, the Family Planning Programme was renamed the Family Welfare Programme.",
     "The National Population Policy 2000 emphasized target-free, voluntary approach to reproductive health.", 1,
     "Both statements are correct: Post-1977 policy shifted to family welfare and target-free reproductive healthcare.\\nHence, Option {{CORR}} is correct.",
     "Tracks policy evolution from coercive targets to rights-based reproductive welfare."),

    ("stmt", CH_DEMO, "Post-Independence Vital Rate Trends",
     "Crude death rates in India declined sharply in the post-independence decades due to the control of famines and epidemic diseases.",
     "Crude birth rates in India declined at the exact same speed as crude death rates between 1950 and 1980.", 3,
     "Statement I is correct; Statement II is incorrect because death rates fell much faster than birth rates, creating rapid growth.\\nHence, Option {{CORR}} is correct.",
     "Analyzes differential pacing of mortality decline vs fertility decline."),

    ("stmt", CH_DEMO, "Population Pyramid Morphology",
     "A population pyramid with an expansive broad base indicates a high proportion of young children in the population.",
     "A constrictive population pyramid with a narrow base indicates high fertility and rapid population growth.", 3,
     "Statement I is correct; Statement II is incorrect because a narrow base indicates falling fertility and population aging.\\nHence, Option {{CORR}} is correct.",
     "Interprets population pyramid morphologies."),

    ("stmt", CH_DEMO, "Rural-Urban Migration Drivers",
     "Rural-to-urban migration in India is driven by push factors like land fragmentation and agrarian unemployment in villages.",
     "Urban pull factors include better educational institutions, infrastructure, and perceived formal wage jobs.", 1,
     "Both statements are correct: Push factors expel rural labour while pull factors attract migrants to urban agglomerations.\\nHence, Option {{CORR}} is correct.",
     "Differentiates push and pull factors in internal migration."),

    ("stmt", CH_DEMO, "Circular and Seasonal Migration",
     "Seasonal and circular migrants in India maintain strong socio-cultural and kinship ties with their native villages.",
     "Circular migrants receive formal permanent employment contracts and company housing in metropolitan cities.", 3,
     "Statement I is correct; Statement II is incorrect as circular migrants work in the vulnerable informal sector without contracts.\\nHence, Option {{CORR}} is correct.",
     "Characterizes the informal nature of seasonal circular migration."),

    ("stmt", CH_DEMO, "Total Fertility Rate & Replacement Threshold",
     "Total Fertility Rate represents the average number of children a woman would bear during her reproductive years.",
     "A Total Fertility Rate of 2.1 is considered the replacement level fertility for a population.", 1,
     "Both statements are correct: TFR measures cumulative fertility, and 2.1 ensures generational replacement.\\nHence, Option {{CORR}} is correct.",
     "Defines TFR and replacement level threshold."),

    ("stmt", CH_DEMO, "Statutory Provisions of PCPNDT Act",
     "The Pre-Conception and Pre-Natal Diagnostic Techniques Act prohibits the determination and disclosure of the sex of a foetus.",
     "The PCPNDT Act permits ultrasound clinics to advertise prenatal sex-selection services openly in newspapers.", 3,
     "Statement I is correct; Statement II is incorrect as advertising sex-selection is strictly punishable by imprisonment.\\nHence, Option {{CORR}} is correct.",
     "Identifies regulatory prohibitions under the PCPNDT Act 1994."),

    ("stmt", CH_DEMO, "Mathematical Structure of Dependency Ratio",
     "The dependency ratio compares the dependent population (below 15 and over 64) to the productive working-age population (15-64).",
     "A falling dependency ratio means that there are fewer workers available to support each dependent child or elderly person.", 3,
     "Statement I is correct; Statement II is incorrect because a falling ratio indicates more workers per dependent.\\nHence, Option {{CORR}} is correct.",
     "Explains the mathematical logic of the dependency ratio."),

    ("stmt", CH_DEMO, "Urban Growth and Slum Formation",
     "Internal migration from rural to urban areas in India has resulted in rapid expansion of informal settlement slums in metropolitan cities.",
     "Metropolitan municipal corporations provide free luxury housing to all arriving rural migrant families.", 3,
     "Statement I is correct; Statement II is incorrect as municipal infrastructure is severely strained, forcing migrants into slums.\\nHence, Option {{CORR}} is correct.",
     "Analyzes urban informal housing and infrastructure bottlenecks."),

    ("stmt", CH_DEMO, "National Family Health Survey Utility",
     "The National Family Health Survey (NFHS) collects nationwide representative data on fertility, infant mortality, and maternal health.",
     "NFHS surveys are conducted strictly by private international advertising corporations without government sanction.", 3,
     "Statement I is correct; Statement II is incorrect as NFHS is coordinated by the Ministry of Health and Family Welfare via IIPS Mumbai.\\nHence, Option {{CORR}} is correct.",
     "Identifies institutional authority and scope of NFHS data.")
]
assert len(SLOTS[2]) == 20

# ==============================================================================
# SLOT 3: Demographic Assertion-Reasoning (20 Questions)
# ==============================================================================
SLOTS[3] = [
    ("ar", CH_DEMO, "Malthusian Catastrophe Premise",
     "Thomas Malthus argued that population growth would outstrip food supply unless checked.",
     "He believed that population grows geometrically while agricultural food production increases arithmetically.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Analyzes Malthusian geometric/arithmetic premise."),

    ("ar", CH_DEMO, "Developing Countries Stage 2 Boom",
     "Developing countries experience a population explosion during Stage 2 of demographic transition.",
     "Death rates decline rapidly due to public health measures while birth rates remain stubbornly high.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Explains population explosion in developing nations."),

    ("ar", CH_DEMO, "Demographic Dividend Window",
     "The demographic dividend offers a temporary economic opportunity for developing nations.",
     "The proportion of working-age population expands relative to the dependent child and elderly population.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Explains age structure mechanics of the demographic dividend."),

    ("ar", CH_DEMO, "Northwestern Child Sex Ratio Deficit",
     "The child sex ratio in India dropped significantly in prosperous northwestern states in 2011.",
     "Affluent families utilized modern diagnostic ultrasound technologies to practice sex-selective abortions.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Connects diagnostic technology to declining child sex ratios."),

    ("ar", CH_DEMO, "Emergency Family Planning Backlash",
     "The Indian Family Planning Programme suffered a severe political setback in the late 1970s.",
     "Coercive mass vasectomy drives during the National Emergency generated deep public resentment.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Identifies political backlash against coercive sterilization."),

    ("ar", CH_DEMO, "Kerala Female Autonomy and Fertility",
     "Kerala achieved sub-replacement fertility rates ahead of other Indian states.",
     "High female literacy, female autonomy, and accessible public healthcare lowered fertility preferences.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Explains Kerala's human development path to fertility transition."),

    ("ar", CH_DEMO, "Declining Dependency Ratio Trends",
     "The dependency ratio in India has been steadily declining in recent decades.",
     "The proportion of children under fifteen has decreased due to falling birth rates while the working-age cohort has grown.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Explains dependency ratio decline via age structure transition."),

    ("ar", CH_DEMO, "Agrarian Distress Migration",
     "Rural-to-urban migration continues to expand across developing regions of India.",
     "Agrarian distress and land fragmentation push rural youth towards urban informal labor markets.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Analyzes push factors driving agrarian outmigration."),

    ("ar", CH_DEMO, "Enactment of PCPNDT Act",
     "The Government of India enacted the PCPNDT Act in 1994.",
     "Unregulated pre-natal diagnostic techniques were facilitating sex-selective abortions of female foetuses.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Explains legislative intent of the PCPNDT Act."),

    ("ar", CH_DEMO, "Urban Living Costs and Fertility",
     "Total Fertility Rate has reached replacement level (2.1) in many Indian states.",
     "Couples increasingly prefer smaller family sizes due to urban living costs and education priorities.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Connects urbanization to family size preference changes."),

    ("ar", CH_DEMO, "Circular Migration Livelihood Strategy",
     "Circular migration is widely practiced by landless rural labourers in India.",
     "Migrants circulate between rural agricultural harvest work and urban construction to survive seasonal unemployment.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Explains seasonal circular migration as household survival strategy."),

    ("ar", CH_DEMO, "Population Momentum Dynamics",
     "Population growth in India will continue for several decades even after achieving replacement fertility.",
     "A large cohort of young people entering their reproductive years creates population momentum.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Explains demographic concept of population momentum."),

    ("ar", CH_DEMO, "Regional Literacy Disparities",
     "Literacy rates in India display significant interstate regional disparities.",
     "Historical differences in social reform, state expenditure on schooling, and female empowerment shaped literacy.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Explains interstate educational variation in India."),

    ("ar", CH_DEMO, "NPP 2000 Target-Free Approach",
     "The National Population Policy 2000 rejected coercive sterilization targets.",
     "Global and national evidence demonstrated that voluntary, informed choice is more effective for reproductive health.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Explains evidence-based rationale of target-free population policy."),

    ("ar", CH_DEMO, "Post-Independence Infant Mortality Decline",
     "Infant mortality rates have declined substantially in India since independence.",
     "Universal childhood immunization, institutional delivery incentives, and sanitation have reduced child deaths.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Identifies public health drivers of infant mortality decline."),

    ("ar", CH_DEMO, "Age Structure Comparison with Europe",
     "India's age structure is younger compared to Western European countries.",
     "Past high fertility rates created a large demographic bulge of youth in the national population.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Contrasts India's young age structure with Western Europe."),

    ("ar", CH_DEMO, "Metropolitan Urban Primacy",
     "Urbanization in India is characterized by rapid growth of million-plus cities.",
     "Metropolitan cities offer concentrated commercial, industrial, and informal employment opportunities.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Explains growth concentration in Indian metropolitan cities."),

    ("ar", CH_DEMO, "Female Labor Force Nuances",
     "Female labor force participation in India shows complex structural patterns.",
     "Increased female school enrollment and household income effects influence women's formal labor supply.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Analyzes factors influencing female labor participation."),

    ("ar", CH_DEMO, "Statutory Decennial Census Authority",
     "Census operations in India are conducted decennially under statutory authority.",
     "The Census provides authoritative demographic, socio-economic, and housing data for national planning.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Affirms statutory basis and planning utility of the Indian Census."),

    ("ar", CH_DEMO, "Crude Death Rate Historic Reduction",
     "The crude death rate in India fell from over 27 per thousand at independence to below 7 per thousand.",
     "Eradication of famines and control of epidemic diseases (like smallpox and plague) reduced mass mortality.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A).\\nHence, Option {{CORR}} is correct.",
     "Explains mortality reduction drivers in post-independence India.")
]
assert len(SLOTS[3]) == 20

# ==============================================================================
# SLOT 4: Social Institutions - Core Conceptual MCQs (20 Questions)
# ==============================================================================
SLOTS[4] = [
    ("mcq", CH_INST, "Varna vs Jati",
     "In sociological theory, how is 'Varna' fundamentally differentiated from 'Jati'?",
     "Varna is an all-India four-fold scriptural model, whereas Jati refers to thousands of localized, regional endogamous groups",
     ["Varna refers to modern political parties, whereas Jati refers strictly to university alumni associations",
      "Varna is an economic trade union, while Jati is an international maritime shipping agreement",
      "Varna allows unlimited inter-caste marriages, whereas Jati was created by British municipal councils"],
     "Varna is the all-India textual division of four ranks, whereas Jati encompasses thousands of regional occupational groups.\\nHence, Option {{CORR}} is correct.",
     "Differentiates Varna from Jati."),

    ("mcq", CH_INST, "Purity and Pollution Principle",
     "In Louis Dumont's structural analysis of the caste system, hierarchy is fundamentally grounded in:",
     "The religious and ritual opposition between the pure and the impure (purity and pollution)",
     ["Purely capitalist market competition based on annual corporate profits and stock ownership",
      "A random lottery conducted annually by village elders to decide occupational status",
      "The total elimination of all dietary taboos and commensal restrictions across social groups"],
     "Louis Dumont argued in *Homo Hierarchicus* that caste hierarchy rests on the religious opposition of pure and impure.\\nHence, Option {{CORR}} is correct.",
     "Identifies Louis Dumont's purity and pollution concept."),

    ("mcq", CH_INST, "Dominant Caste Concept",
     "Which combination of attributes was formulated by M.N. Srinivas to define a 'Dominant Caste' in rural India?",
     "Ownership of a sizable amount of arable land, numerical strength in the village, and local political power",
     ["Highest ritual Brahminical status without any landholding or numerical presence in the locality",
      "Complete control over urban textile mills and foreign direct investment banks exclusively",
      "Recognition by the British Crown as a sovereign royal dynasty with private artillery forces"],
     "M.N. Srinivas defined dominant caste by intermediate landownership, decisive numerical strength, and local political dominance.\\nHence, Option {{CORR}} is correct.",
     "Identifies M.N. Srinivas's dominant caste criteria."),

    ("mcq", CH_INST, "Regional Dominant Castes",
     "Which of the following regional caste groups historically exemplified M.N. Srinivas's concept of 'Dominant Caste' following post-independence land reforms?",
     "Jats in Haryana and Western UP, Yadavs in Bihar and UP, Vokkaligas and Lingayats in Karnataka, and Kammas in Andhra Pradesh",
     ["Nomadic hunter-gatherers of the Andaman Islands and pastoral shepherds of Ladakh",
      "Urban European merchant expatriates residing in the diplomatic enclaves of New Delhi",
      "Landless bonded agricultural labourers working on sugarcane plantations in Gujarat"],
     "Land reforms transferred ownership to cultivating peasant castes who became dominant castes across regional states.\\nHence, Option {{CORR}} is correct.",
     "Names specific regional dominant castes."),

    ("mcq", CH_INST, "Segmentary Nature of Caste",
     "In sociological theory, what does the 'segmentary' nature of caste imply?",
     "Each caste is further subdivided into sub-castes, and sub-castes into sub-sub-castes, creating a nested hierarchy",
     ["Castes operate as fully equal and sovereign mini-states that mint their own legal currency",
      "Castes are completely separate racial biological species that cannot communicate verbally",
      "Castes are identical to modern trade unions where membership is acquired through written examination"],
     "Caste is segmentary because each category contains nested sub-divisions that unite or divide depending on the social context.\\nHence, Option {{CORR}} is correct.",
     "Defines the segmentary character of caste."),

    ("mcq", CH_INST, "Endogamy and Gotra Exogamy",
     "How do kinship rules structure traditional upper-caste marriages in northern India?",
     "Marriage is strictly endogamous at the level of Jati, but strictly exogamous at the level of the Gotra (clan)",
     ["Marriage is exogamous at the level of Jati, but strictly endogamous within the same nuclear family",
      "Marriage requires both partners to belong to completely different religious denominations",
      "Marriage is prohibited between individuals residing in the same geographic hemisphere"],
     "Traditional North Indian marriage rules mandate Jati endogamy (marrying within caste) and Gotra exogamy (marrying outside clan).\\nHence, Option {{CORR}} is correct.",
     "Differentiates Jati endogamy from Gotra exogamy."),

    ("mcq", CH_INST, "Colonial Decennial Censuses",
     "How did the decennial census operations directed by Sir Herbert Risley in 1901 transform caste in India?",
     "They attempted to rank castes systematically according to their perceived social and ritual precedence, provoking intense inter-caste rivalry",
     ["They completely abolished all caste categories and forbade the public mention of caste names",
      "They classified all Indian citizens into two identical economic classes based on bank deposits",
      "They granted independent sovereign kingdoms to every registered non-Brahmin caste association"],
     "The 1901 Census attempted official hierarchical ranking, leading hundreds of caste associations to petition for higher rank.\\nHence, Option {{CORR}} is correct.",
     "Analyzes the colonial hardening of caste under Risley's 1901 Census."),

    ("mcq", CH_INST, "Government of India Act 1935",
     "What was the historic administrative significance of the Government of India Act, 1935 regarding caste?",
     "It created the official legal schedule identifying 'Scheduled Castes' (depressed classes) entitled to legal safeguards",
     ["It outlawed the practice of agriculture and mandated that all citizens work in railway workshops",
      "It made the Sanskrit language mandatory for all business correspondence across the empire",
      "It dissolved all village panchayats and placed local governance under British naval officers"],
     "The 1935 Act formalized the administrative term 'Scheduled Castes' to provide affirmative representation and safeguards.\\nHence, Option {{CORR}} is correct.",
     "Identifies origin of the term 'Scheduled Castes' in GoI Act 1935."),

    ("mcq", CH_INST, "Permanent Traits of Tribes",
     "In Indian anthropological classification, which of the following is categorized as a 'Permanent Trait' of tribal communities?",
     "Linguistic affiliation (such as Austro-Asiatic, Tibeto-Burman, Dravidian, or Indo-Aryan) and ecological region",
     ["Degree of assimilation into the formal urban banking sector and IT service industry",
      "Conversion to modern reformist religious movements or parliamentary political parties",
      "Adoption of intensive tractor-based commercial agribusiness and chemical farming"],
     "Permanent traits are ecological habitat, language family, and physical racial characteristics; acquired traits relate to livelihood and assimilation.\\nHence, Option {{CORR}} is correct.",
     "Distinguishes permanent tribal traits from acquired traits."),

    ("mcq", CH_INST, "Acquired Traits of Tribes",
     "What constitutes an 'Acquired Trait' in the sociological classification of Indian tribal groups?",
     "The degree of incorporation into Hindu agrarian society, adoption of Christianity, and mode of livelihood",
     ["Physical racial phenotype (such as Proto-Australoid, Mongoloid, or Negrito features)",
      "The geographic coordinates of their traditional ancestral hilly or forested terrain",
      "The ancestral language family spoken in their pre-colonial isolated settlements"],
     "Acquired traits encompass livelihood patterns (settled farming vs peasantization) and religious/cultural assimilation.\\nHence, Option {{CORR}} is correct.",
     "Defines acquired traits of tribes."),

    ("mcq", CH_INST, "Isolationist vs Integrationist Tribal Debate",
     "In the historic pre-independence debate on tribal welfare, how did Verrier Elwin's perspective contrast with G.S. Ghurye's?",
     "Elwin advocated protection and isolation in 'National Parks' to preserve culture, while Ghurye viewed tribes as 'backward Hindus' needing integration",
     ["Elwin proposed commercial logging of all tribal forests, while Ghurye demanded complete tribal sovereignty",
      "Both scholars demanded the immediate forced conversion of all tribes to Western Christianity",
      "Elwin argued tribes were advanced industrial workers, while Ghurye claimed they were European immigrants"],
     "Elwin advocated protective enclaves to prevent cultural ruin, whereas Ghurye treated tribes as imperfectly integrated Hindus.\\nHence, Option {{CORR}} is correct.",
     "Contrasts Elwin's isolationism with Ghurye's assimilationism."),

    ("mcq", CH_INST, "Nehru's Tribal Panchsheel",
     "A fundamental guiding tenet of Jawaharlal Nehru's 'Tribal Panchsheel' (Five Principles for Tribal Development) was that:",
     "Tribal people should develop along the lines of their own genius, avoiding the imposition of alien cultural values",
     ["Tribal languages should be immediately suppressed and replaced by standard bureaucratic English",
      "Tribal forest lands should be unconditionally transferred to private transnational mining companies",
      "Traditional tribal arts and customs should be banned as primitive superstitions"],
     "Nehru's Tribal Panchsheel stressed development respecting tribal genius and rights to land/forests without outside imposition.\\nHence, Option {{CORR}} is correct.",
     "Identifies Nehru's Tribal Panchsheel core philosophy."),

    ("mcq", CH_INST, "Concept of Dikus",
     "In the tribal sociology of central India (Chota Nagpur), the term 'Diku' referred specifically to:",
     "Exploitative outsiders (moneylenders, traders, revenue contractors, and landlords) who alienated tribal lands",
     ["Traditional village deities worshipped during sacred grove harvesting ceremonies",
      "Honored spiritual teachers invited to settle boundary disputes between friendly clans",
      "The sacred bamboo flutes played during annual community hunting expeditions"],
     "'Diku' was the tribal term for alien exploitative outsiders who grabbed tribal land and imposed debt bondage.\\nHence, Option {{CORR}} is correct.",
     "Explains the socio-political meaning of 'Diku'."),

    ("mcq", CH_INST, "Forest Acts of 1878 and 1927",
     "How did British colonial forest legislation (1878 and 1927) fundamentally undermine tribal autonomy in India?",
     "It declared forests state property, categorized them into Reserved/Protected forests, and criminalized customary forest gathering",
     ["It handed total ownership and legal title of all timber reserves directly to tribal clan chiefs",
      "It prohibited British administrators and timber contractors from ever entering forested districts",
      "It required colonial paper mills to pay full market royalty to tribal village councils"],
     "Colonial Forest Acts nationalized forests for British railway/timber revenues, dispossessing Adivasis of traditional usufruct rights.\\nHence, Option {{CORR}} is correct.",
     "Analyzes colonial dispossession of tribal forest rights."),

    ("mcq", CH_INST, "Khasi Matrilineal System",
     "In the matrilineal system of the Khasi community of Meghalaya, ancestral property is traditionally inherited by:",
     "The youngest daughter (Khadduh), while lineage and clan membership are traced strictly through the mother",
     ["The eldest son, who takes up residence with his father's patriarchal lineage head",
      "The village council headman, who auctions the land to non-tribal commercial buyers",
      "The maternal uncle's eldest male child, who must migrate to an urban center upon marriage"],
     "Khasi matriliny traces descent through the mother and awards ancestral inheritance to the youngest daughter (Khadduh).\\nHence, Option {{CORR}} is correct.",
     "Identifies Khasi matrilineal inheritance rules."),

    ("mcq", CH_INST, "Matrilineal Dilemma in Meghalaya",
     "Sociologist Tiplut Nongbri observed that the matrilineal system among the Khasi generates an inherent structural tension between:",
     "A man's responsibilities to his sister's house (as maternal uncle / Kni) versus his responsibilities to his own wife and children",
     ["The village blacksmith and the urban money lending corporate banking executive",
      "The demand for traditional cotton handloom fabrics versus imported synthetic rayon textiles",
      "The younger generation of educated daughters and their foreign university professors"],
     "Tiplut Nongbri highlighted the structural conflict Khasi men face between uncle obligations to natal clan and husband duties.\\nHence, Option {{CORR}} is correct.",
     "Explains Tiplut Nongbri's analysis of Khasi matriliny."),

    ("mcq", CH_INST, "Joint Family Transformation",
     "Sociological studies of the modern Indian family demonstrate that the joint family system has:",
     "Undergone structural adaptations into nuclear households while maintaining strong extended kinship solidarity and ritual ties",
     ["Completely disappeared without leaving any trace in emotional, financial, or ceremonial relations",
      "Expanded to include over five hundred relatives living inside a single communal barracks",
      "Been declared unconstitutional by the Supreme Court of India under fundamental equality rights"],
     "Indian family structures show functional adaptation: physical residential nuclearization alongside strong extended joint ties.\\nHence, Option {{CORR}} is correct.",
     "Analyzes adaptation vs breakdown of the joint family in India."),

    ("mcq", CH_INST, "Caste Associations & Politics",
     "How has the political role of caste transformed in modern democratic India?",
     "Caste groups have formed modern horizontal associations and political vote banks to compete for state resources and political power",
     ["Caste has completely ceased to play any role in voting behavior, political mobilization, or cabinet formation",
      "Caste groups have united to demand the restoration of pre-colonial hereditary monarchy",
      "Caste organizations now function strictly as international sports clubs without political goals"],
     "Caste has modernized into horizontal interest groups and political associations competing for democratic representation.\\nHence, Option {{CORR}} is correct.",
     "Explains the politicization of caste in democratic India."),

    ("mcq", CH_INST, "Sanskritisation & Lower Castes",
     "According to M.N. Srinivas, how did intermediate and lower castes seek upward social mobility under Sanskritisation?",
     "By adopting the dietary taboos (vegetarianism), rituals, sacred thread, and lifestyle of the twice-born (dvija) castes",
     ["By joining British naval forces and adopting Western European dietary customs and dress exclusively",
      "By discarding all religious rituals and advocating militant atheism in municipal elections",
      "By emigrating en masse to industrial factories in Manchester and Birmingham in the 19th century"],
     "Sanskritisation involves emulating the lifestyle, vegetarianism, and ritual practices of upper twice-born castes.\\nHence, Option {{CORR}} is correct.",
     "Defines the process of Sanskritisation."),

    ("mcq", CH_INST, "Dalit Critique of Sanskritisation",
     "A major Dalit critique of the concept of 'Sanskritisation' voiced by modern social theorists is that:",
     "It uncritically accepts the supremacy of Brahminical hierarchy as the universal reference group and denigrates Dalit culture",
     ["It forces high-caste landlords to perform menial sanitary labour in village streets",
      "It was formulated by British colonial officers who had never visited an Indian village",
      "It bans lower-caste students from enrolling in modern technical and medical degree programmes"],
     "Dalit scholars critique Sanskritisation for glorifying Brahminical hegemony and dismissing rich egalitarian Dalit traditions.\\nHence, Option {{CORR}} is correct.",
     "Articulates the anti-caste critique of Sanskritisation.")
]
assert len(SLOTS[4]) == 20
'''

with open(fpath, "a", encoding="utf-8") as f:
    f.write(code_slots_2_4)

print("Slots 2, 3, 4 appended successfully.")
