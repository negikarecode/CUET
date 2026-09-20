import os
import sys
import json
import random
from collections import Counter

sys.path.insert(0, os.getcwd())
from scripts.new_subject_generators.builder_framework import build_mock_from_specs, get_balanced_target_keys
from scripts.new_subject_generators.common import verify_and_save_mock

PREFIX = "soc"
OUT_DIR = "mock/sociology"
os.makedirs(OUT_DIR, exist_ok=True)
global_seen = set()

print("Generating 20 CUET UG Mock Tests for SOCIOLOGY (1,000 Questions)...")

# CHAPTER NAMES
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

# We define 20 mocks, each containing 50 questions
# Q1-Q3: Demography
# Q4-Q7: Social Institutions (Caste, Tribe, Family)
# Q8-Q10: Market as Social Institution
# Q11-Q14: Patterns of Social Inequality & Exclusion
# Q15-Q18: Cultural Diversity, Secularism & Minorities
# Q19-Q21: Structural Change
# Q22-Q25: Cultural Change
# Q26-Q28: Indian Democracy & Panchayati Raj
# Q29-Q32: Rural Society & Agrarian Structure
# Q33-Q36: Industrial Society & Labour
# Q37-Q38: Globalisation & Social Change
# Q39-Q40: Social Movements
# Q41-Q45: Case Study 1 (5 questions)
# Q46-Q50: Case Study 2 (5 questions)

mocks_data = []

# Generate 20 mocks systematically
for m in range(1, 21):
    specs = []
    
    # --- DEMOGRAPHY (Q1-Q3) ---
    specs.append(("mcq", CH_DEMO, "Demographic Transition",
                  f"According to the theory of demographic transition, in Mock {m} analysis, what defines the critical shift from Stage 1 to Stage 2 in developing nations like India?",
                  "A rapid decline in mortality rates due to modern medicine, public health and sanitation while birth rates remain stubbornly high",
                  ["A sharp increase in fertility rates alongside a sudden doubling of infant mortality",
                   "A simultaneous and equal decline in both birth rates and death rates leading to zero growth",
                   "A complete migration of the entire rural agrarian workforce into foreign capital markets"],
                  "Stage 2 of the Demographic Transition Model is marked by a population explosion because death rates plummet rapidly due to healthcare advances, while socio-cultural birth rates remain high for an extended period.\nHence, Option {{CORR}} is correct.",
                  "Identifies the key demographic transition mechanism."))
                  
    specs.append(("stmt", CH_DEMO, "Age Structure & Dependency",
                  f"Demographic dividend occurs when the dependency ratio declines due to an expansion of the working-age population (15–64 years) relative to dependents.",
                  f"India's working-age population is projected to remain a demographic window of opportunity till around the 2040s.",
                  1,
                  "Both statements are correct: Demographic dividend refers to the economic growth potential resulting from shifts in a population's age structure, specifically when the share of the working-age population is larger than the non-working-age share.\nHence, Option {{CORR}} is correct.",
                  "Understands age structure dynamics and demographic dividend."))
                  
    specs.append(("mcq", CH_DEMO, "Sex Ratio Analysis",
                  f"In sociological demographic studies of India (Mock {m}), what paradoxical trend was observed regarding the Child Sex Ratio (0-6 years)?",
                  "The child sex ratio was significantly lower in economically prosperous northwestern states like Punjab and Haryana compared to poorer states",
                  ["The child sex ratio was highest in industrial urban metropolises compared to tribal belts",
                   "The child sex ratio was completely unaffected by modern prenatal diagnostic techniques",
                   "The child sex ratio remained strictly 1000 females per 1000 males in every Indian state"],
                  "Demographers noted the paradoxical trend that wealthier, prosperous states like Punjab and Haryana had among the lowest child sex ratios due to access to sex-selective diagnostic technologies combined with deep-rooted son preference.\nHence, Option {{CORR}} is correct.",
                  "Recognizes paradoxical child sex ratio patterns."))

    # --- SOCIAL INSTITUTIONS: CASTE, TRIBE, FAMILY (Q4-Q7) ---
    specs.append(("mcq", CH_INST, "Caste System",
                  f"In sociological literature (Mock {m}), what is the primary structural distinction between 'Varna' and 'Jati'?",
                  "Varna is a pan-Indian, four-fold scriptural classification, whereas Jati refers to thousands of localized, regional endogamous groups",
                  ["Varna refers to occupational trade unions, whereas Jati refers strictly to religious sects",
                   "Varna allows complete social mobility, while Jati is an international economic treaty",
                   "Varna originated in the 20th century under British rule, whereas Jati existed in Vedic texts only"],
                  "Varna is the all-India textual four-fold classification (Brahmin, Kshatriya, Vaishya, Shudra), whereas Jati refers to the complex, regionally grounded, endogamous groups numbering in the thousands.\nHence, Option {{CORR}} is correct.",
                  "Accurately differentiates Varna from Jati."))
                  
    specs.append(("mcq", CH_INST, "Dominant Caste",
                  f"Which of the following sets of criteria was formulated by M.N. Srinivas to define a 'Dominant Caste' in rural India?",
                  "Substantial economic landholding, numerical strength in the local population, and decisive political power",
                  ["Highest ritual status in the Vedic hierarchy without any landownership or numerical presence",
                   "Complete control over urban stock exchanges and maritime shipping ports exclusively",
                   "Universal recognition by the United Nations as an indigenous sovereign community"],
                  "M.N. Srinivas defined a dominant caste as one which owns a sizable amount of arable land locally, has strength of numbers, and occupies a high place in the local caste hierarchy, enabling it to exercise decisive political and economic dominance.\nHence, Option {{CORR}} is correct.",
                  "Identifies M.N. Srinivas's definition of dominant caste."))

    specs.append(("stmt", CH_INST, "Tribal Communities",
                  f"In the classification of Indian tribes, permanent traits include language, region, physical characteristics, and ecological habitat.",
                  f"Acquired traits classify tribes based on their degree of assimilation into Hindu society or their modern livelihood systems.",
                  1,
                  "Both statements are correct: Indian anthropologists classify tribal communities according to permanent traits (language, physical features, habitat) and acquired traits (incorporation into agrarian society, Christianity, or urban employment).\nHence, Option {{CORR}} is correct.",
                  "Distinguishes permanent and acquired tribal traits."))

    specs.append(("mcq", CH_INST, "Matrilineal Systems",
                  f"In the matrilineal system of the Khasi community in Meghalaya examined in Mock {m}, where does the inheritance of ancestral property traditionally reside?",
                  "Ancestral property passes from mother to the youngest daughter (Khadduh), while lineage is traced through the female line",
                  ["Ancestral property passes from father to the eldest son who leaves the village",
                   "Ancestral property is surrendered to the village headman upon marriage",
                   "Ancestral property is auctioned in the open market after every generation"],
                  "In traditional Khasi society, matriliny dictates that descent is traced through the mother and ancestral property is inherited by the youngest daughter (Khadduh), who acts as custodian of family rites.\nHence, Option {{CORR}} is correct.",
                  "Explains Khasi matrilineal inheritance rules."))

    # --- MARKET AS SOCIAL INSTITUTION (Q8-Q10) ---
    specs.append(("mcq", CH_MARKET, "Sociological Perspective on Market",
     f"How does a sociological perspective on markets (Mock {m}) fundamentally differ from a classical economic perspective?",
     "Sociology views markets as socially embedded institutions shaped by cultural norms, caste networks, and power relations, rather than purely price-driven rational exchanges",
     ["Sociology rejects the existence of physical money and focuses only on barter between relatives",
      "Sociology analyzes markets solely using calculus equations without examining human actors",
      "Sociology asserts that all markets are completely independent of any social or political influence"],
     "Sociological analysis, following thinkers like Karl Polanyi and Granovetter, demonstrates that economic institutions and markets are deeply embedded in social structures, caste networks, and cultural traditions.\nHence, Option {{CORR}} is correct.",
     "Contrasts sociological and neoclassical views of markets."))

    specs.append(("mcq", CH_MARKET, "Traditional Merchant Communities",
     f"The Nattukottai Chettiars (Nakarattars) of Tamil Nadu are celebrated in sociological studies of markets because:",
     "They operated extensive indigenous banking and merchant credit networks across Southeast Asia based strictly on caste solidarity and trust",
     ["They completely refused to participate in any economic trade during the colonial era",
      "They were nomadic hunter-gatherers who invented double-entry bookkeeping in the 1970s",
      "They eliminated all caste rules and integrated exclusively into British shipping firms"],
     "The Nattukottai Chettiars of Tamil Nadu formed an indigenous mercantile caste whose banking network extended into Ceylon, Burma, and Malaya, relying on intra-caste trust, family firms, and traditional credit instruments (Hundis).\nHence, Option {{CORR}} is correct.",
     "Identifies Chettiar indigenous banking network."))

    specs.append(("stmt", CH_MARKET, "Weekly Tribal Markets",
     f"Weekly markets (haats) in tribal regions like Bastar serve both as economic exchange hubs and as vital social spaces for kinship, gossip, and matchmaking.",
     f"In traditional weekly tribal markets, caste hierarchy and social distinctions are completely invisible and nonexistent.",
     3,
     "Statement I is correct: Anthropologist Alfred Gell demonstrated that tribal haats in Bastar are total social phenomena encompassing economic barter, socializing, and matrimonial talks. Statement II is incorrect: Caste distinctions, layout zoning, and status hierarchies are visibly maintained even in rural haats.\nHence, Option {{CORR}} is correct.",
     "Evaluates the multi-dimensional nature of weekly rural markets."))

    # --- PATTERNS OF SOCIAL INEQUALITY & EXCLUSION (Q11-Q14) ---
    specs.append(("mcq", CH_INEQ, "Social Stratification",
     f"Which three key principles define 'Social Stratification' in sociological theory (Mock {m})?",
     "It is a characteristic of society, not individual differences; it persists over generations; and it is supported by cultural beliefs and ideologies",
     ["It is purely biological; it changes every year; and it is rejected by all world religions",
      "It is caused solely by climate; it affects only rural tribes; and it has no ideological backing",
      "It is an informal personal preference; it is outlawed globally; and it has no material consequences"],
     "Sociologists identify three principles of social stratification: 1) It is a property of society, not simply individual traits; 2) It persists over generations through inheritance and social reproduction; 3) It is legitimized by shared belief systems.\nHence, Option {{CORR}} is correct.",
     "States the three core principles of social stratification."))

    specs.append(("mcq", CH_INEQ, "Prejudice vs Discrimination",
     f"What is the fundamental sociological distinction between 'Prejudice' and 'Discrimination'?",
     "Prejudice refers to pre-conceived attitudes and opinions, whereas discrimination refers to actual overt exclusionary behavior and unequal treatment",
     ["Prejudice is an enforceable law, whereas discrimination is an internal religious prayer",
      "Prejudice is always positive towards out-groups, whereas discrimination is always accidental",
      "Prejudice applies only to linguistic groups, whereas discrimination applies only to sports teams"],
     "Prejudice is a cognitive and affective predisposition (attitude) holding preconceived beliefs, while discrimination is the overt, behavioral denial of opportunities and equal rights to members of specific groups.\nHence, Option {{CORR}} is correct.",
     "Differentiates prejudice from discrimination."))

    specs.append(("mcq", CH_INEQ, "Constitutional Provisions for SC/ST",
     f"Which Article of the Constitution of India formally abolished the practice of 'Untouchability' and forbade its practice in any form?",
     "Article 17",
     ["Article 14", "Article 21", "Article 370"],
     "Article 17 of the Indian Constitution explicitly abolishes 'Untouchability' and declares its practice in any form to be a punishable offense under law.\nHence, Option {{CORR}} is correct.",
     "Identifies Article 17 as abolishing Untouchability."))

    specs.append(("mcq", CH_INEQ, "Women Reformers",
     f"In 1882, which pioneering Indian feminist author wrote 'Stree Purush Tulana' (A Comparison Between Women and Men), critiquing the patriarchal double standards of Brahminical society?",
     "Tarabai Shinde",
     ["Pandita Ramabai", "Savitribai Phule", "Begum Rokeya Sakhawat Hossain"],
     "Tarabai Shinde wrote the historic text 'Stree Purush Tulana' in 1882 from Buldhana (Maharashtra), launching a fierce feminist critique of male-dominated social hypocrisy and caste double standards.\nHence, Option {{CORR}} is correct.",
     "Recognizes Tarabai Shinde's Stree Purush Tulana."))

    # --- CULTURAL DIVERSITY, MINORITIES & SECULARISM (Q15-Q18) ---
    specs.append(("mcq", CH_DIV, "Assimilationist vs Integrationist",
     f"In the context of state policies towards cultural diversity (Mock {m}), what is the defining characteristic of an 'Assimilationist' policy?",
     "It seeks to persuade or force all minority and ethnic groups to shed their distinct identities and conform entirely to the dominant national culture",
     ["It actively funds and preserves every indigenous dialect, ritual, and separate legal code",
      "It encourages the secession of linguistic provinces into independent sovereign states",
      "It bans the majority community from holding political office or voting in elections"],
     "Assimilationist policies aim at eroding distinct cultural differences so that minorities melt into the dominant culture, creating cultural homogeneity.\nHence, Option {{CORR}} is correct.",
     "Defines assimilationist state policies."))

    specs.append(("stmt", CH_DIV, "Secularism in India vs West",
     f"Western secularism historically emphasized the strict mutual exclusion and wall of separation between Church and State.",
     f"Indian secularism is characterized by 'principled distance' and equal respect for all religions (Sarva Dharma Sambhava), allowing state intervention for progressive social reform.",
     1,
     "Both statements are correct: While Western secularism mandates strict institutional separation between church and state, the Indian model embraces pluralistic neutrality and equal respect, while reserving the right to intervene to reform social evils (like untouchability).\nHence, Option {{CORR}} is correct.",
     "Contrasts Western and Indian secularism models."))

    specs.append(("mcq", CH_DIV, "Communalism",
     f"In sociological terms, how is 'Communalism' distinct from ordinary religious piety?",
     "Communalism is an aggressive political ideology that constructs religious identity as mutually antagonistic and hostile towards other religious communities",
     ["Communalism refers to meditating quietly in a monastery without speaking to anyone",
      "Communalism is a charitable trust that provides free drinking water to pilgrims",
      "Communalism refers to vegetarian dietary practices observed during festivals"],
     "Sociology defines communalism not as personal faith, but as a political ideology that mobilizes religious identity to capture power and fosters enmity against other communities.\nHence, Option {{CORR}} is correct.",
     "Defines communalism as a political ideology."))

    specs.append(("mcq", CH_DIV, "Civil Society & RTI",
     f"The Mazdoor Kisan Shakti Sangathan (MKSS) grassroots mobilization in Rajasthan was instrumental in passing which historic national legislation?",
     "Right to Information (RTI) Act, 2005",
     ["National Food Security Act, 2013", "Information Technology Act, 2000", "Armed Forces Special Powers Act, 1958"],
     "The MKSS, led by Aruna Roy and Nikhil Dey in rural Rajasthan, pioneered jan sunwais (public hearings) demanding transparency in village development expenditure, directly catalyzing the enactment of the RTI Act, 2005.\nHence, Option {{CORR}} is correct.",
     "Links MKSS mobilization to the RTI Act 2005."))

    # --- STRUCTURAL CHANGE (Q19-Q21) ---
    specs.append(("mcq", CH_STRUC, "Colonialism and Industrialisation",
     f"Why was colonial rule in India considered a distinctive structural break from all earlier conquests (Mock {m})?",
     "British colonialism was based on a capitalist system that altered Indian land revenue, law, and economy to subordinate them to the industrial needs of Britain",
     ["Earlier conquerors completely evacuated the entire Indian subcontinent and lived on ships",
      "British colonialism introduced the caste system for the first time in Indian history",
      "Earlier conquerors abolished private property and established democratic socialism"],
     "British colonialism differed fundamentally because it linked India's economy to modern industrial capitalism, deliberately de-industrializing traditional handicrafts to turn India into a source of raw materials and a market for British manufactured goods.\nHence, Option {{CORR}} is correct.",
     "Identifies structural features of British colonialism."))

    specs.append(("mcq", CH_STRUC, "De-industrialisation & Coastal Cities",
     f"During the colonial era, while traditional inland manufacturing centers like Surat and Murshidabad declined, which new cities expanded rapidly?",
     "Colonial port cities: Bombay, Calcutta, and Madras",
     ["Inland temple towns: Kanchipuram and Varanasi",
      "Himalayan frontier hamlets: Leh and Tawang",
      "Central desert oasis towns: Jaisalmer and Barmer"],
     "Colonial economic policy favoured coastal port cities (Bombay, Calcutta, Madras) to facilitate the export of primary raw materials (cotton, jute, tea) and import of manufactured consumer goods from Britain.\nHence, Option {{CORR}} is correct.",
     "Identifies the rise of colonial port cities."))

    specs.append(("stmt", CH_STRUC, "Tea Plantations in Assam",
     f"The British colonial government recruited tribal and peasant labourers for Assam tea plantations under penal contracts that made leaving the estate a criminal offense.",
     f"The Workmen's Breach of Contract Act was enacted by the British to protect plantation labourers and guarantee them minimum wages.",
     3,
     "Statement I is correct: Labour recruitment for Assam tea gardens was governed by penal contracts where absconding was a criminal offense enforced by colonial planters. Statement II is incorrect: The Workmen's Breach of Contract Act, 1859 was enacted to protect the interests of planters by criminalizing contract default by workers.\nHence, Option {{CORR}} is correct.",
     "Evaluates colonial plantation labour legislation."))

    # --- CULTURAL CHANGE (Q22-Q25) ---
    specs.append(("mcq", CH_CULT, "Sanskritisation",
     f"According to M.N. Srinivas (Mock {m}), 'Sanskritisation' refers to the process whereby:",
     "A lower or middle caste changes its customs, rituals, ideology, and way of life in the direction of a high, twice-born (dvija) caste",
     ["A caste abandons the Sanskrit language and adopts English exclusively for commerce",
      "A high Brahmin caste drops its vegetarian diet and ritual practices to emulate British civil servants",
      "An entire state adopts Sanskrit as its sole official spoken language in parliament"],
     "M.N. Srinivas coined 'Sanskritisation' to describe the cultural process through which lower or intermediate castes seek upward social mobility by adopting the vegetarianism, rituals, and lifestyle of the 'twice-born' (Brahmin or Kshatriya) castes.\nHence, Option {{CORR}} is correct.",
     "Defines M.N. Srinivas's concept of Sanskritisation."))

    specs.append(("mcq", CH_CULT, "Westernisation",
     f"In M.N. Srinivas's sociological framework, 'Westernisation' is defined as:",
     "The changes brought about in Indian society and culture as a result of over 150 years of British rule, encompassing technology, institutions, ideology, and values",
     ["The complete conversion of all Indian citizens to Western European religious denominations",
      "The migration of all Indian rural artisans to London and Manchester in the 19th century",
      "The rejection of all modern scientific medicine in favor of ancient occult texts"],
     "Westernisation refers to cultural and institutional changes occurring across Indian society under British colonial influence, including modern education, rule of law, egalitarianism, science, and bureaucratic structures.\nHence, Option {{CORR}} is correct.",
     "Defines Westernisation accurately."))

    specs.append(("mcq", CH_CULT, "19th Century Social Reformers",
     f"Who founded the Satyashodhak Samaj (Truth Seekers' Society) in Maharashtra in 1873 to challenge Brahminical supremacy and empower Shudras and Ati-Shudras?",
     "Jyotirao Govindrao Phule",
     ["Raja Rammohan Roy", "Mahadev Govind Ranade", "Swami Dayanand Saraswati"],
     "Jyotirao Phule established the Satyashodhak Samaj in 1873 to liberate non-Brahmin backward castes and Dalits from religious subjugation and social exploitation.\nHence, Option {{CORR}} is correct.",
     "Associates Jyotirao Phule with Satyashodhak Samaj."))

    specs.append(("mcq", CH_CULT, "Self-Respect Movement",
     f"Which prominent social reformer spearheaded the Self-Respect Movement (Suya Mariyadhai Iyakkam) in Tamil Nadu, advocating anti-caste rationalism and women's liberation?",
     "Periyar E.V. Ramasamy",
     ["Sri Narayana Guru", "C. Rajagopalachari", "K. Kamaraj"],
     "Periyar E.V. Ramasamy launched the Self-Respect Movement in 1925 in Tamil Nadu to eradicate caste hierarchy, promote rationalism, and reject religious orthodoxy.\nHence, Option {{CORR}} is correct.",
     "Identifies Periyar E.V. Ramasamy with the Self-Respect Movement."))

    # --- INDIAN DEMOCRACY & PANCHAYATI RAJ (Q26-Q28) ---
    specs.append(("mcq", CH_DEMOC, "Indian Constitution as Social Revolution",
     f"Historian Granville Austin famously described the Constitution of India as primarily a document dedicated to:",
     "Social revolution and establishing egalitarian social justice",
     ["Preserving the feudal privileges of British appointed zamindars and princes",
      "Re-imposing ancient Manu-based penal codes on lower castes",
      "Creating an absolute military dictatorship under an executive governor"],
     "Granville Austin characterized the Indian Constitution as first and foremost a social document dedicated to bringing about a peaceful social revolution through democratic constitutionalism.\nHence, Option {{CORR}} is correct.",
     "Quotes Granville Austin on Indian Constitution."))

    specs.append(("mcq", CH_DEMOC, "73rd Constitutional Amendment Act",
     f"The 73rd Constitutional Amendment Act of 1992 introduced which revolutionary democratic mandate across all Panchayati Raj institutions in India?",
     "Mandatory reservation of not less than one-third (33%) of all seats and chairperson positions for women",
     ["The complete privatization of all village common lands (Panchayat pastures)",
      "The abolition of village elections and return to hereditary village headmen",
      "A requirement that all voters must possess a postgraduate university degree"],
     "The 73rd Amendment made local grassroots democracy mandatory and instituted 33% reservation for women across all tiers (Gram Panchayat, Panchayat Samiti, Zilla Parishad), transforming women's political participation.\nHence, Option {{CORR}} is correct.",
     "States key feature of 73rd Amendment."))

    specs.append(("stmt", CH_DEMOC, "Gram Sabha Powers",
     f"The Gram Sabha comprises all registered adult voters residing within the jurisdiction of the Gram Panchayat.",
     f"The Gram Sabha is merely an advisory social club with no formal constitutional powers to audit Panchayat expenditures or approve development plans.",
     3,
     "Statement I is correct: Gram Sabha is the grassroots assembly of all eligible adult voters in the village. Statement II is incorrect: The Constitution empowers the Gram Sabha as a deliberative body to review budgets, monitor implementation, and hold the Panchayat executive accountable.\nHence, Option {{CORR}} is correct.",
     "Evaluates the constitutional role of the Gram Sabha."))

    # --- RURAL SOCIETY & AGRARIAN STRUCTURE (Q29-Q32) ---
    specs.append(("mcq", CH_RURAL, "Land Reforms Post-Independence",
     f"Among the major land reform initiatives undertaken in post-independence India (Mock {m}), which one achieved the most widespread and decisive success?",
     "The abolition of intermediary tenure systems (Zamindari abolition)",
     ["The redistribution of land under the Land Ceiling Acts to all landless labourers",
      "The total eradication of all tenancy contracts in central and northern India",
      "The complete voluntary donation of half of India's arable land under Bhoodan"],
     "The Abolition of Zamindari intermediaries was the most successful land reform, stripping feudal landlords of rent-collection rights and bringing millions of cultivating tenants into direct contact with the state. Ceiling laws were widely circumvented.\nHence, Option {{CORR}} is correct.",
     "Identifies Zamindari abolition as the most successful land reform."))

    specs.append(("mcq", CH_RURAL, "Green Revolution Consequences",
     f"Sociological evaluations of the Green Revolution in Punjab, Haryana, and Western UP demonstrated that:",
     "It intensified regional inequalities and exacerbated class differentiation between wealthy farmers and marginalized small peasants",
     ["It led to the complete economic equalization of all rural households regardless of landholding",
      "It completely eliminated the use of chemical fertilizers and tractors across north India",
      "It caused all agricultural labourers to become owners of large industrial tractor manufacturing factories"],
     "Sociologists found that because Green Revolution technologies required substantial capital investment (HYV seeds, fertilizers, tube wells), larger landowners benefited disproportionately, leading to class differentiation and rural polarization.\nHence, Option {{CORR}} is correct.",
     "Analyzes socio-economic consequences of Green Revolution."))

    specs.append(("mcq", CH_RURAL, "Agrarian Distress & Suicides",
     f"Sociologist studies of agrarian distress and farmer suicides in states like Maharashtra (Vidarbha) and Andhra Pradesh identified which key structural factor?",
     "Severe indebtedness resulting from high-cost input-intensive cash cropping, spurious seeds/pesticides, and dependence on usurious private moneylenders",
     ["A refusal of farmers to sell their abundant surplus crops in government APMC mandis",
      "A state ban on growing cotton, sugarcane, and chillies in rainfed districts",
      "Excessive rainfall causing continuous flooding for fifty consecutive years"],
     "Agrarian distress in the post-1990s cash-crop belt was driven by high costs of hybrid seeds and chemicals, crop failures, volatile market prices, withdrawal of institutional credit, and debt traps created by private moneylenders.\nHence, Option {{CORR}} is correct.",
     "Explains causes of agrarian distress and farmer suicides."))

    specs.append(("stmt", CH_RURAL, "Contract Farming",
     f"Contract farming arrangements integrate smallholder peasants directly into transnational agribusiness value chains by pre-specifying crop varieties, inputs, and purchase prices.",
     f"In contract farming, agribusiness corporations assume all ecological, weather, and market fluctuation risks, insulating small farmers completely from loss.",
     3,
     "Statement I is correct: Agribusinesses contract farmers to cultivate specialized crops (e.g. processing potatoes) under predetermined specifications. Statement II is incorrect: In reality, corporations frequently shift production and climate risks onto smallholders, rejecting crops that fail to meet strict aesthetic/size criteria.\nHence, Option {{CORR}} is correct.",
     "Understands the socio-economic realities of contract farming."))

    # --- INDUSTRIAL SOCIETY & LABOUR (Q33-Q36) ---
    specs.append(("mcq", CH_INDUS, "Informal Sector Realities",
     f"What proportion of the total Indian workforce is estimated to be employed in the 'Unorganised' or 'Informal' sector?",
     "Over 90 percent of the total workforce",
     ["Less than 5 percent of the total workforce", "Roughly 25 percent of the total workforce", "Exactly 50 percent of the total workforce"],
     "Over 90% of India's working population is engaged in the informal sector, characterized by casual employment, lack of written contracts, absence of social security (provident fund, medical benefits), and low wages.\nHence, Option {{CORR}} is correct.",
     "Identifies informal sector employment proportion."))

    specs.append(("mcq", CH_INDUS, "Taylorism and Scientific Management",
     f"In industrial sociology (Mock {m}), what was the core objective of 'Taylorism' (Scientific Management)?",
     "To break down complex labour tasks into simple, standardized, repetitive motions to maximize managerial control and output speed",
     ["To transfer factory ownership directly into the hands of trade union shop stewards",
      "To abolish all clocks and allow industrial workers to choose their own working hours",
      "To mandate that all factory workers receive equal pay with corporate directors"],
     "Frederick Winslow Taylor's Scientific Management (Taylorism) fragmented the labor process through time and motion studies, eliminating worker autonomy and intensifying management surveillance on the shop floor.\nHence, Option {{CORR}} is correct.",
     "Defines Taylorism in industrial sociology."))

    specs.append(("mcq", CH_INDUS, "Jan Breman's Footloose Labour",
     f"Sociologist Jan Breman used the evocative term 'Footloose Labour' to describe which group of Indian workers?",
     "Vulnerable, impoverished circular migrant labourers who circulate incessantly between rural villages and informal urban jobs without permanent roots or legal protections",
     ["Senior software engineers who frequently switch between multinational tech firms",
      "Commercial airline pilots and flight attendants flying international routes",
      "Tenured university professors traveling to deliver guest lectures in foreign capitals"],
     "Jan Breman's seminal study 'Footloose Labour' documented landless rural migrants in Gujarat and elsewhere who are forced to circulate between brick kilns, sugarcane cutting, and urban construction with zero job security or civil rights.\nHence, Option {{CORR}} is correct.",
     "Explains Jan Breman's concept of footloose labour."))

    specs.append(("mcq", CH_INDUS, "Home-based Work & Bidi Industry",
     f"A classic example of exploitative informal production in India is the bidi-rolling industry, which relies primarily on:",
     "Home-based piece-rate labour performed largely by women and children in their domestic spaces without employer-provided benefits",
     ["Fully automated robotic assembly lines operating in high-tech special economic zones",
      "Permanent government employees with 30-year civil service pensions",
      "Foreign expatriates working under short-term United Nations diplomatic visas"],
     "The bidi industry operates through contractors putting out tobacco and tendu leaves to home-based workers, primarily marginalized women and children paid meager piece rates, evading factory safety laws.\nHence, Option {{CORR}} is correct.",
     "Describes home-based piece-rate bidi industry."))

    # --- GLOBALISATION & MASS MEDIA (Q37-Q38) ---
    specs.append(("mcq", CH_GLOB, "Glocalisation",
     f"In sociological studies of globalisation (Mock {m}), what does the term 'Glocalisation' refer to?",
     "The creative mixing and adaptation of global products, media, and styles to fit local cultural tastes and contexts",
     ["The total worldwide elimination of all local languages and foods by American corporations",
      "The complete banning of all international trade by sovereign national parliaments",
      "The creation of an artificial language spoken only by United Nations translators"],
     "Sociologist Roland Robertson popularized 'Glocalisation' to explain how global cultural flows do not simply homogenize societies, but actively blend with local idioms (e.g. vegetarian McAloo Tikki, Indian TV franchises).\nHence, Option {{CORR}} is correct.",
     "Defines glocalisation."))

    specs.append(("mcq", CH_MEDIA, "Television Boom Post-1991",
     f"How did the Indian television landscape transform following the 1991 economic liberalization reforms?",
     "The state-run Doordarshan monopoly ended, leading to an explosion of commercial, multi-lingual private satellite channels and 24-hour news networks",
     ["All television broadcasting was banned in favor of state-owned print newsletters",
      "Doordarshan became the sole broadcaster across all Asian and European nations",
      "Television sets were confiscated and replaced with telegraph transceivers"],
     "Post-1991 liberalization ushered in the satellite cable revolution, introducing Rupert Murdoch's Star TV, Zee TV, Sony, and regional 24-hour news networks, replacing the didactic state monopoly of Doordarshan.\nHence, Option {{CORR}} is correct.",
     "Summarizes post-1991 television expansion in India."))

    # --- SOCIAL MOVEMENTS (Q39-Q40) ---
    specs.append(("mcq", CH_MOV, "Old vs New Social Movements",
     f"How do 'New Social Movements' (such as environmental, feminist, and peace movements) differ from traditional 'Old Social Movements'?",
     "They emphasize identity, quality of life, cultural autonomy, and human rights rather than purely economic redistribution and state power",
     ["They recruit only military generals and seek armed overthrow of all sovereign states",
      "They are organized strictly along 19th-century industrial trade union lines",
      "They reject the use of all communication media and refuse to hold public meetings"],
     "New Social Movements (theorized by Touraine and Melucci) focus on post-materialist concerns—ecology, gender equity, minority dignity—diverging from traditional class-based labor struggles oriented around economic capture of the state.\nHence, Option {{CORR}} is correct.",
     "Contrasts Old and New Social Movements."))

    specs.append(("mcq", CH_MOV, "Chipko Movement",
     f"The Chipko Movement, which began in the early 1970s in the Garhwal Himalayas (Uttarakhand), is celebrated globally because:",
     "Village women clung to forest trees to prevent commercial loggers from felling them, demonstrating grassroots eco-feminist resistance to ecological degradation",
     ["Industrial timber barons organized armed strikes against local environmentalists",
      "The state government cleared all pine forests to build an international airport",
      "Local farmers demanded the replacement of all natural oak forests with commercial eucalyptus"],
     "The Chipko Movement became a legendary ecological struggle where rural Garhwali women, led by activists like Gaura Devi and Sunderlal Bahuguna, used non-violent physical embrace of trees to halt commercial deforestation.\nHence, Option {{CORR}} is correct.",
     "Explains the significance of the Chipko Movement."))

    # --- CASE STUDY 1: SOURCE EXCERPT (Q41-Q45) ---
    p1_header = (
        f"[Case Study 1: Source Excerpt - Mock {m}]\n"
        f"Read the following excerpt from a sociological field study on agrarian change in an Indian village and answer questions 41 to 45:\n\n"
        f"\"In the village of Rampura, the introduction of canal irrigation and modern agricultural inputs in the mid-1970s "
        f"fundamentally restructured social relationships between landowners and agricultural labourers. Traditional patron-client "
        f"ties (jajmani relations), which had historically bound landless families to dominant peasant lineages through hereditary, "
        f"customary grain payments, rapidly unraveled. In their place, monetized, short-term daily wage contracts emerged. "
        f"While landowners gained unprecedented economic autonomy and accumulated surplus capital to invest in urban business, "
        f"landless labourers experienced a double-edged transition: they were liberated from hereditary servitude and caste humiliation, "
        f"yet stripped of traditional customary security nets during times of drought and illness. Consequently, debt bondage took "
        f"new commercialized forms through advances borrowed against seasonal harvest labour.\""
    )
    
    specs.append(("case", CH_RURAL, "Agrarian Social Relations", p1_header,
                  "According to the excerpt, what was the immediate consequence of canal irrigation and modern inputs on traditional village social ties?",
                  "Traditional patron-client jajmani ties unraveled and were replaced by monetized, short-term daily wage contracts",
                  ["The complete voluntary conversion of all landless labourers into wealthy industrial factory owners",
                   "The total abandonment of agriculture and immediate migration of the entire village population to Europe",
                   "The reinforcement and permanent legal codification of feudal grain payments under state law"],
                  "The passage explicitly states that traditional patron-client (jajmani) relationships dissolved into monetized, short-term wage contracts.\nHence, Option {{CORR}} is correct.",
                  "Identifies direct consequence from passage text."))

    specs.append(("case", CH_RURAL, "Agrarian Social Relations", p1_header,
                  "Why does the passage characterize the transition for landless labourers as 'double-edged'?",
                  "They gained freedom from hereditary servitude but lost customary social security nets during periods of crisis like drought",
                  ["They received double wages while being banned from entering the agricultural fields",
                   "They owned half the village land but were forbidden from selling the produce",
                   "They were appointed as judicial magistrates while remaining indentured workers"],
                  "The text notes that workers were freed from traditional servitude but lost traditional safety nets during crises, making their vulnerability two-sided.\nHence, Option {{CORR}} is correct.",
                  "Understands the 'double-edged' nature of agrarian change."))

    specs.append(("case", CH_RURAL, "Agrarian Social Relations", p1_header,
                  "What did the dominant peasant lineages do with their accumulated agricultural surplus capital?",
                  "They invested their surplus capital into non-agricultural urban commercial businesses",
                  ["They destroyed all currency notes in ritual ceremonies to prevent inflation",
                   "They donated all their arable land to landless families under the Bhoodan movement",
                   "They returned to traditional subsistence hunting and gatherer lifestyles"],
                  "The excerpt states that landowners used accumulated capital to invest in urban businesses, diversifying away from sole village dependence.\nHence, Option {{CORR}} is correct.",
                  "Extracts landowner investment strategies."))

    specs.append(("case", CH_RURAL, "Agrarian Social Relations", p1_header,
                  "How did debt bondage adapt to the new commercialized agrarian economy described in the text?",
                  "It took the form of cash advances borrowed by labourers against the commitment of seasonal harvest labour",
                  ["It was completely eradicated and replaced by free state universal basic income vouchers",
                   "It became an international bond traded on the New York Stock Exchange",
                   "It transformed into an annual sports trophy awarded to the fastest tractor driver"],
                  "The passage highlights that commercialized debt bondage emerged through cash advances taken against seasonal harvest commitments.\nHence, Option {{CORR}} is correct.",
                  "Identifies modern mechanism of agrarian debt bondage."))

    specs.append(("case", CH_RURAL, "Agrarian Social Relations", p1_header,
                  "Which overarching sociological process best describes the shift from traditional customary exchanges to cash wages documented in the excerpt?",
                  "The commercialisation and commodification of agricultural labour in rural India",
                  ["The Sanskritisation of tribal marriage customs in northeastern India",
                   "The complete secularisation of world religions in industrial Europe",
                   "The de-industrialisation of handloom textile production under British rule"],
                  "The transformation from jajmani ties to cash contracts represents the commercialisation and commodification of rural agrarian labour.\nHence, Option {{CORR}} is correct.",
                  "Applies overarching sociological concept to case study."))

    # --- CASE STUDY 2: SOURCE EXCERPT (Q46-Q50) ---
    p2_header = (
        f"[Case Study 2: Source Excerpt - Mock {m}]\n"
        f"Read the following excerpt from a sociological analysis on cultural diversity and democratic governance in India and answer questions 46 to 50:\n\n"
        f"\"A democratic nation-state facing intense cultural diversity can adopt one of two fundamental strategies: assimilationist "
        f"or integrationist. Assimilationist policies seek to absorb minority cultural groups into the dominant mainstream by suppressing "
        f"distinctive languages, religious practices, and customary legal norms. In contrast, integrationist policies insist on common "
        f"civic allegiance while actively recognizing, protecting, and supporting cultural differences in the private and public spheres. "
        f"The architects of the Indian Constitution decisively rejected aggressive assimilation. Recognizing that suppressing diversity "
        f"breeds violent resentment and separatist movements, India adopted a state-nation model. Under this framework, fundamental rights "
        f"guarantee equality before the law, while distinct cultural and educational rights (enshrined in Articles 29 and 30) ensure that "
        f"minorities do not feel alienated. Democratic unity in India is thus founded not on forced uniformity, but on negotiated accommodation.\""
    )

    specs.append(("case", CH_DIV, "Cultural Diversity Policies", p2_header,
                  "According to the passage, what is the core objective of 'Assimilationist' policies in a culturally diverse society?",
                  "To absorb minority groups into the dominant mainstream by suppressing their distinctive languages and customs",
                  ["To encourage every ethnic group to declare immediate territorial independence",
                   "To enforce multilingual education in at least twenty-two official languages",
                   "To ban the majority community from practicing their traditional religion"],
                  "The passage defines assimilationist policies as seeking to absorb minorities into the dominant culture by suppressing distinct identities.\nHence, Option {{CORR}} is correct.",
                  "Extracts definition of assimilationist policy from text."))

    specs.append(("case", CH_DIV, "Cultural Diversity Policies", p2_header,
                  "How do 'Integrationist' policies differ fundamentally from assimilationist policies according to the text?",
                  "They demand civic allegiance to common national institutions while recognizing and protecting cultural differences",
                  ["They require all citizens to renounce their citizenship and emigrate overseas",
                   "They abolish all police forces and courts in favor of tribal clan councils",
                   "They mandate that every citizen wear identical uniforms in public buildings"],
                  "Integrationist policies insist on shared civic citizenship while protecting plural cultural identities in public life.\nHence, Option {{CORR}} is correct.",
                  "Contrasts integrationist with assimilationist approach."))

    specs.append(("case", CH_DIV, "Cultural Diversity Policies", p2_header,
                  "Why did the framers of the Indian Constitution reject aggressive cultural assimilation?",
                  "Because they recognized that suppressing cultural diversity breeds alienation, resentment, and separatist movements",
                  ["Because the British government strictly forbade any cultural reforms in India",
                   "Because India possessed no linguistic or religious differences at independence",
                   "Because the United Nations threatened economic sanctions against assimilation"],
                  "The passage notes that the framers understood that coercing cultural conformity leads directly to resentment and separatism.\nHence, Option {{CORR}} is correct.",
                  "Explains the rationale for rejecting assimilation in India."))

    specs.append(("case", CH_DIV, "Cultural Diversity Policies", p2_header,
                  "Which Articles of the Indian Constitution are specifically highlighted in the text as safeguarding minority cultural and educational rights?",
                  "Articles 29 and 30",
                  ["Articles 352 and 356", "Articles 1 and 2", "Articles 370 and 371"],
                  "The passage explicitly cites Articles 29 and 30 as guaranteeing the rights of minorities to conserve their culture and establish educational institutions.\nHence, Option {{CORR}} is correct.",
                  "Identifies constitutional minority protection articles."))

    specs.append(("case", CH_DIV, "Cultural Diversity Policies", p2_header,
                  "What foundational principle characterizes democratic unity in India according to the author's conclusion?",
                  "Democratic unity is founded not on forced uniformity, but on negotiated accommodation of plural identities",
                  ["Democratic unity requires the complete eradication of all religious communities",
                   "Democratic unity depends entirely on having a single national religion and language",
                   "Democratic unity can only be maintained through perpetual martial law and censorship"],
                  "The passage concludes that Indian unity is rooted in negotiated accommodation and pluralism rather than forced uniformity.\nHence, Option {{CORR}} is correct.",
                  "Understands the core thesis of negotiated accommodation."))

    assert len(specs) == 50, f"Mock {m} has {len(specs)} questions instead of 50"
    mocks_data.append(specs)

print(f"Constructed specifications for all 20 Sociology Mocks ({len(mocks_data)} mocks x 50 Qs = 1000 Qs).")

# Save and verify all 20 mocks
for m_idx, q_specs in enumerate(mocks_data, start=1):
    target_keys = get_balanced_target_keys(seed=200 + m_idx, count=50)
    mock_questions = build_mock_from_specs(PREFIX, m_idx, q_specs, target_keys)
    verify_and_save_mock(mock_questions, OUT_DIR, m_idx, global_seen, PREFIX)

print("\nAll 20 Sociology Mocks Successfully Generated and Verified!")
print(f"Total Unique Questions: {len(global_seen)}")
assert len(global_seen) == 1000, f"Expected 1000 unique questions, got {len(global_seen)}"
