import json
from common import (
    normalize_text,
    get_pyq_normalized_set,
    make_question,
    make_match_question,
    make_sequence_question,
    make_statement_question,
    make_assertion_question,
    rotate_options
)

pyq_set = get_pyq_normalized_set()
seen_texts = set()
questions = []

CHAPTER = "Peasants, Zamindars and the State: Mughal Agrarian Society & Chronicles"

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen_texts:
        raise ValueError(f"Duplicate question inside Unit 8: {q['questionText'][:60]}")
    if norm in pyq_set:
        raise ValueError(f"Question matches PYQ: {q['questionText'][:60]}")
    seen_texts.add(norm)
    q["questionNumber"] = len(questions) + 1
    questions.append(q)

print("Generating 80 unique questions for Unit 8: Mughal Agrarian Society & Chronicles...")

# --- 1. Agrarian Society: Peasants & Terminology ---

opts, corr, sol = rotate_options(
    "Raiyat (or muzarian) and asami",
    ["Mansabdar and jagirdar", "Muqaddam and patwari", "Kotwal and qazi"],
    "A",
    "1. In 17th-century Indo-Persian sources, peasants were commonly referred to as raiyat (plural riaya), muzarian, kisan, or asami.\nHence, Option {{CORR}} is correct.",
    "Identifies terms used for peasants in Mughal sources."
)
add_q(make_question(CHAPTER, "Peasant Terminology", "Which term was most commonly used in 17th-century Persian chronicles to designate the peasantry of Mughal India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Khud-kasht and Pahi-kasht",
    ["Zamindar and Talukdar", "Polaj and Parauti", "Zat and Sawar"],
    "B",
    "1. Sources distinguish between two primary categories of peasants: Khud-kasht (resident cultivators holding land in their village) and Pahi-kasht (non-resident cultivators who farmed on a contractual basis elsewhere).\nHence, Option {{CORR}} is correct.",
    "Distinguishes Khud-kasht and Pahi-kasht."
)
add_q(make_question(CHAPTER, "Peasant Classification", "Into which two broad categories were cultivators classified based on their residential status and landholding in the village?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Cultivators who lived in the village where they owned and tilled their hereditary agricultural plots",
    ["Wandering nomadic pastoralists who traded cattle", "Indentured labourers working in imperial karkhanas", "Revenue officials appointed by the provincial governor"],
    "C",
    "1. Khud-kasht peasants were permanent residents of the village who cultivated their own hereditary lands with family labour.\nHence, Option {{CORR}} is correct.",
    "Defines Khud-kasht peasants."
)
add_q(make_question(CHAPTER, "Khud-kasht Peasants", "What defined the status of a 'Khud-kasht' peasant in the Mughal agrarian economy?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Non-resident cultivators who cultivated lands in other villages on a contractual basis, often seeking better revenue rates",
    ["Hereditary landlords owning large fortified estates", "Slaves captured during military expeditions", "Village headmen collecting revenue for the state"],
    "D",
    "1. Pahi-kasht were mobile or non-resident peasants who moved to distant villages, often driven by famine or attracted by lower revenue demands on newly cleared lands.\nHence, Option {{CORR}} is correct.",
    "Defines Pahi-kasht peasants."
)
add_q(make_question(CHAPTER, "Pahi-kasht Peasants", "Who were the 'Pahi-kasht' cultivators in the agrarian setup of 17th-century Mughal India?", opts, corr, sol))

# --- 2. Agricultural Cycles & Cash Crops ---

opts, corr, sol = rotate_options(
    "Kharif (autumn/monsoon) and Rabi (spring)",
    ["Zaid and Boro", "Aman and Aus", "Samba and Kuruvai"],
    "A",
    "1. Agriculture in Mughal India revolved around two principal seasonal cycles: Kharif (autumn harvest after the monsoon) and Rabi (spring harvest).\nHence, Option {{CORR}} is correct.",
    "Identifies Kharif and Rabi agricultural cycles."
)
add_q(make_question(CHAPTER, "Agricultural Cycles", "Around which two principal seasonal crop cycles did the agricultural rhythms of Mughal India revolve?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Jins-i kamil (perfect / cash crops)",
    ["Jizya crops", "Zat crops", "Suyurghal crops"],
    "B",
    "1. The Mughal state encouraged the cultivation of high-value commercial crops like cotton, sugarcane, and oilseeds, officially terming them 'jins-i kamil' (literally perfect crops).\nHence, Option {{CORR}} is correct.",
    "Defines jins-i kamil as perfect cash crops."
)
add_q(make_question(CHAPTER, "Cash Crops", "What special term was applied by the Mughal imperial revenue administration to high-value commercial cash crops such as cotton, sugarcane, and indigo?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Cotton and sugarcane",
    ["Wheat and barley", "Millets and pulses", "Jowar and bajra"],
    "C",
    "1. Ain-i-Akbari explicitly highlights cotton (spread over central India and Deccan) and sugarcane (Bengal) as premier examples of jins-i kamil.\nHence, Option {{CORR}} is correct.",
    "Identifies cotton and sugarcane as prime jins-i kamil."
)
add_q(make_question(CHAPTER, "Cash Crops", "Which two agricultural commodities were identified by Abul Fazl in the Ain-i-Akbari as the finest examples of 'jins-i kamil' yielding maximum revenue?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Emperor Jahangir in 1617",
    ["Emperor Akbar in 1582", "Emperor Shah Jahan in 1635", "Emperor Aurangzeb in 1669"],
    "D",
    "1. Tobacco arrived in northern India from the Deccan in the early 17th century; Jahangir became so concerned about its harmful addictive effects that he banned smoking in 1617.\nHence, Option {{CORR}} is correct.",
    "Identifies Jahangir banning tobacco smoking in 1617."
)
add_q(make_question(CHAPTER, "New World Crops", "Which Mughal emperor issued an imperial decree in 1617 banning the smoking of tobacco due to its deleterious effects on public health?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Maize (makka), tomatoes, potatoes, chilies, and pineapple",
    ["Wheat, barley, lentils, and mustard", "Rice, sugarcane, and betel nut", "Cotton, indigo, and opium"],
    "A",
    "1. Crops originating from the Americas (the New World) that transformed Indian agriculture in the 16th and 17th centuries include maize, potatoes, tomatoes, chilies, papaya, and pineapple.\nHence, Option {{CORR}} is correct.",
    "Identifies New World crops introduced to India."
)
add_q(make_question(CHAPTER, "New World Crops", "Which group of crops was introduced to the Indian subcontinent from the Americas during the 16th and 17th centuries via European maritime trade?", opts, corr, sol))

# --- 3. The Village Community: Headman, Panchayat & Artisans ---

opts, corr, sol = rotate_options(
    "Muqaddam or Mandal",
    ["Kotwal", "Qanungo", "Patwari"],
    "B",
    "1. The headman of the village community was known as the 'muqaddam' or 'mandal', chosen by village elders with the ratification of the zamindar.\nHence, Option {{CORR}} is correct.",
    "Identifies Muqaddam or Mandal as village headman."
)
add_q(make_question(CHAPTER, "Village Headman", "What official title was given to the village headman in northern and central India, who was responsible for maintaining community order and collecting state revenue?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Levy monetary fines, enforce community labour, or order expulsion from the caste community (jati bahishkar)",
    ["Sentence convicted offenders to capital execution", "Impose import tariffs on foreign maritime traders", "Confiscate imperial crown lands"],
    "C",
    "1. The village panchayat had substantial judicial authority, including the power to levy fines and, in severe cases, order expulsion from the caste (jati bahishkar), which meant loss of livelihood.\nHence, Option {{CORR}} is correct.",
    "Explains punitive powers of village panchayats."
)
add_q(make_question(CHAPTER, "Village Panchayat Authority", "Which significant punitive power could be exercised by a traditional village panchayat against individuals who violated customary moral norms?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Jati Panchayat",
    ["Subahdar", "Diwan", "Mir Bakhshi"],
    "D",
    "1. In addition to the multi-caste village panchayat, each caste possessed its own 'Jati Panchayat' to arbitrate civil disputes, marriage alliances, and ritual purity.\nHence, Option {{CORR}} is correct.",
    "Identifies Jati Panchayat regulating caste disputes."
)
add_q(make_question(CHAPTER, "Caste Panchayats", "Which communal institution adjudicated internal civil disputes, ritual conduct, and occupational regulations among members of a specific caste in medieval villages?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Miras or Watan",
    ["Inam", "Suyurghal", "Madad-i ma'ash"],
    "A",
    "1. In Maharashtra, village artisans held hereditary rights to plots of land known as 'miras' or 'watan' in exchange for rendering specialized services to the community.\nHence, Option {{CORR}} is correct.",
    "Identifies Miras or Watan in Maharashtra."
)
add_q(make_question(CHAPTER, "Artisanal Landholdings", "What were the hereditary lands allocated to village artisans and service providers in medieval Maharashtra called?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Jajmani system",
    ["Ryotwari system", "Mahalwari system", "Iqtadari system"],
    "B",
    "1. The customary non-monetary economic arrangement where village artisans provided goods and services to cultivating households in exchange for a customary share of the grain harvest was known as the Jajmani system.\nHence, Option {{CORR}} is correct.",
    "Defines Jajmani system."
)
add_q(make_question(CHAPTER, "Customary Remuneration", "What was the customary socio-economic system in which village artisans were remunerated with a fixed share of agricultural harvest rather than cash wages?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Women performed essential agricultural operations like sowing, weeding, and threshing, as well as artisanal production like spinning",
    ["Women were legally barred from ever stepping onto agricultural lands", "Women exclusively performed priestly rituals in the village temple", "Women were forbidden from owning or inheriting property in all communities"],
    "C",
    "1. In agrarian households, labour was divided along functional lines: men ploughed and tilled, while women weeded, sowed, threshed, winnowed, and performed artisanal spinning and embroidery.\nHence, Option {{CORR}} is correct.",
    "Describes agrarian labour contributions of women."
)
add_q(make_question(CHAPTER, "Women in Agrarian Society", "What was the reality of women's labour participation in the rural agrarian economy of Mughal India?", opts, corr, sol))

# --- 4. Forests and Forest Dwellers ---

opts, corr, sol = rotate_options(
    "Jangli",
    ["Mlechchha", "Chandalas", "Dasyus"],
    "D",
    "1. Contemporary Persian chronicles used the term 'jangli' to describe forest dwellers, which signified people whose livelihood came from forest products rather than barbarism.\nHence, Option {{CORR}} is correct.",
    "Identifies term jangli for forest dwellers."
)
add_q(make_question(CHAPTER, "Forest Populations", "What specific descriptive Persian term was used in Mughal official records to designate communities who inhabited dense forested tracts?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Wild elephants captured from the forests for the imperial cavalry and armies",
    ["Fine silk brocades imported from Venice", "Carved granite pillars for royal palaces", "Arabian warhorses imported via Calicut"],
    "A",
    "1. The Mughal state regularly demanded tribute (peshkash) from forest tribal chieftains in the form of wild elephants captured for imperial warfare.\nHence, Option {{CORR}} is correct.",
    "Identifies wild elephants as imperial tribute from tribes."
)
add_q(make_question(CHAPTER, "Forest Economy", "What valuable forest resource did the Mughal emperors frequently demand as regular tribute (peshkash) from tribal chieftains?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Babur in the Baburnama",
    ["Humayun in the Humayun Nama", "Akbar in the Ain-i-Akbari", "Aurangzeb in the Alamgirnama"],
    "B",
    "1. In his memoirs (Baburnama), Babur observed that dense jungles provided Indian peasants and rebels with impenetrable defenses where they could defy imperial revenue collectors.\nHence, Option {{CORR}} is correct.",
    "Identifies Babur remarking on jungles in Baburnama."
)
add_q(make_question(CHAPTER, "Mughal Chronicles", "Which Mughal emperor noted in his memoirs that the dense jungles of Hindustan served as formidable natural fortresses for recalcitrant villagers evading tax payment?", opts, corr, sol))

# --- 5. Zamindars and Agrarian Hierarchy ---

opts, corr, sol = rotate_options(
    "Milkiyat",
    ["Inam", "Jagir", "Khalsa"],
    "C",
    "1. Zamindars held extensive personal lands known as 'milkiyat' (property), which were cultivated for the private benefit of the zamindar using hired or bonded agricultural labour.\nHence, Option {{CORR}} is correct.",
    "Defines Milkiyat as zamindars' personal lands."
)
add_q(make_question(CHAPTER, "Zamindari Landholdings", "What technical term was used to designate the personal proprietary agricultural lands held by zamindars in Mughal India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Possession of armed cavalry, infantry, artillery, and personal brick or mud fortresses (qilas)",
    ["Sole ownership of all merchant trading ships on the western coast", "Monopoly over the minting of imperial gold mohurs", "Hereditary command of the imperial court library"],
    "D",
    "1. Zamindars derived substantial coercive power from their private armed retinues, consisting of cavalry, matchlock-men, foot-soldiers, and fortified castles (qilas).\nHence, Option {{CORR}} is correct.",
    "Explains military power of zamindars."
)
add_q(make_question(CHAPTER, "Military Power of Zamindars", "What distinctive military asset enabled zamindars to exert immense social and physical control across their rural domains?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "They acted as revenue intermediaries collecting taxes from peasants, pocketing a hereditary commission, and sometimes siding with peasants in rural revolts",
    ["They were itinerant traders selling spice caravans across Central Asia", "They were exclusively European mercenaries serving in the artillery corps", "They were ascetic wandering monks who rejected private property"],
    "A",
    "1. Zamindars occupied an intermediary position between the state and peasants: they collected land revenue for the state, received a commission (nankar), and often mobilized peasants during agrarian uprisings.\nHence, Option {{CORR}} is correct.",
    "Describes intermediary role of zamindars."
)
add_q(make_question(CHAPTER, "Role of Zamindars", "How did zamindars function within the broader administrative and social structure of the Mughal countryside?", opts, corr, sol))

# --- 6. The Ain-i-Akbari and Abul Fazl ---

opts, corr, sol = rotate_options(
    "Abul Fazl",
    ["Badauni", "Faizi", "Abdul Hamid Lahori"],
    "B",
    "1. Abul Fazl, the chief court historian, confidant, and ideologue of Emperor Akbar, authored the Akbar Nama, the third volume of which is the Ain-i-Akbari.\nHence, Option {{CORR}} is correct.",
    "Identifies Abul Fazl as author of Ain-i-Akbari."
)
add_q(make_question(CHAPTER, "Mughal Historiography", "Who was the distinguished court scholar and grand vizier of Emperor Akbar who authored the monumental tripartite chronicle Akbar Nama?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Five daftars (books)",
    ["Three daftars", "Seven daftars", "Ten daftars"],
    "C",
    "1. The Ain-i-Akbari is systematically organized into five books (daftars): Manzil-abadi, Sipah-abadi, Mulk-abadi, and two books dealing with Indian religions, sciences, and Akbar's sayings.\nHence, Option {{CORR}} is correct.",
    "Identifies five books of the Ain-i-Akbari."
)
add_q(make_question(CHAPTER, "Structure of Ain-i-Akbari", "Into how many systematic books or 'daftars' is the Ain-i-Akbari formally organized?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Manzil-abadi",
    ["Sipah-abadi", "Mulk-abadi", "Dahsala"],
    "D",
    "1. The first book of the Ain-i-Akbari, titled 'Manzil-abadi', is devoted to the imperial household, court maintenance, royal mints, and treasury.\nHence, Option {{CORR}} is correct.",
    "Identifies Manzil-abadi dealing with the royal household."
)
add_q(make_question(CHAPTER, "Books of Ain-i-Akbari", "Which book (daftar) of the Ain-i-Akbari concerns the imperial household, royal mint, treasury, and personal establishment of the emperor?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sipah-abadi",
    ["Manzil-abadi", "Mulk-abadi", "Kharaj"],
    "A",
    "1. The second book, 'Sipah-abadi', covers the military and civil establishment, including biographical sketches of mansabdars, learned scholars, and poets.\nHence, Option {{CORR}} is correct.",
    "Identifies Sipah-abadi dealing with military and mansabdars."
)
add_q(make_question(CHAPTER, "Books of Ain-i-Akbari", "Which daftar of the Ain-i-Akbari details the military and civil administration, royal retainers, and ranks of the mansabdars?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Mulk-abadi",
    ["Manzil-abadi", "Sipah-abadi", "Badauni"],
    "B",
    "1. The third book, 'Mulk-abadi', contains comprehensive statistical information on the empire's provinces (subahs), revenue rates, and administrative units (sarkars and parganas).\nHence, Option {{CORR}} is correct.",
    "Identifies Mulk-abadi containing fiscal and provincial data."
)
add_q(make_question(CHAPTER, "Books of Ain-i-Akbari", "Which book of the Ain-i-Akbari presents exhaustive fiscal, geographical, and statistical data for each subah (province) of the Mughal Empire?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Raja Todar Mal",
    ["Raja Birbal", "Raja Man Singh", "Raja Bhagwan Das"],
    "C",
    "1. Raja Todar Mal, Akbar's brilliant finance minister (diwan-i ashraf), devised the Dahsala system and standard revenue assessment tables based on 10-year crop averages.\nHence, Option {{CORR}} is correct.",
    "Identifies Raja Todar Mal developing the revenue system."
)
add_q(make_question(CHAPTER, "Mughal Revenue Administration", "Which famous revenue minister of Akbar introduced the Dahsala system of revenue settlement based on a ten-year average of agricultural productivity and prices?", opts, corr, sol))

# --- 7. Land Classification and Revenue Assessment ---

opts, corr, sol = rotate_options(
    "Polaj, Parauti, Chachar, and Banjar",
    ["Kharif, Rabi, Zaid, and Boro", "Khud-kasht, Pahi-kasht, Muzarian, and Asami", "Zat, Sawar, Jagir, and Mansab"],
    "D",
    "1. Akbar's revenue administration classified arable land into four distinct categories: Polaj, Parauti, Chachar, and Banjar based on cultivation continuity.\nHence, Option {{CORR}} is correct.",
    "Lists the four land classifications under Akbar."
)
add_q(make_question(CHAPTER, "Land Classification", "Into which four categories was cultivable land categorized under Akbar's revenue administration to determine tax assessment?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Polaj",
    ["Parauti", "Chachar", "Banjar"],
    "A",
    "1. Polaj was prime agricultural land that was annually cultivated for each harvest successively and was never left fallow.\nHence, Option {{CORR}} is correct.",
    "Identifies Polaj as continuously cultivated land."
)
add_q(make_question(CHAPTER, "Land Classification", "Which class of agricultural land under Akbar was cultivated continuously for each crop in succession and was never permitted to lie fallow?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Parauti",
    ["Polaj", "Chachar", "Banjar"],
    "B",
    "1. Parauti was land temporarily left out of cultivation for a year or two so that the soil could recover its natural fertility.\nHence, Option {{CORR}} is correct.",
    "Identifies Parauti as land left fallow temporarily."
)
add_q(make_question(CHAPTER, "Land Classification", "What was the term for land that was left fallow for a year or two in order to restore its productive vitality?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Chachar",
    ["Polaj", "Parauti", "Banjar"],
    "C",
    "1. Chachar was land that had lain fallow for three to four continuous years before being brought back under the plough.\nHence, Option {{CORR}} is correct.",
    "Identifies Chachar as fallow for 3 to 4 years."
)
add_q(make_question(CHAPTER, "Land Classification", "What category of land had remained uncultivated for three or four consecutive years before cultivation was resumed?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Banjar",
    ["Polaj", "Parauti", "Chachar"],
    "D",
    "1. Banjar was barren or uncultivated land that had remained abandoned or unseeded for five years or more.\nHence, Option {{CORR}} is correct.",
    "Identifies Banjar as land fallow for 5+ years."
)
add_q(make_question(CHAPTER, "Land Classification", "Which term designated marginal or waste agricultural land that had lain uncultivated for five years or longer?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Jama was the assessed tax obligation, while Hasil was the actual revenue collected",
    ["Jama was paid in gold, while Hasil was paid in silver", "Jama was collected by the village priest, while Hasil went to the zamindar", "Jama was the military salary, while Hasil was the horse maintenance allowance"],
    "A",
    "1. In Mughal fiscal terminology, 'Jama' represented the revenue amount formally assessed, whereas 'Hasil' was the amount actually realized and deposited.\nHence, Option {{CORR}} is correct.",
    "Distinguishes Jama from Hasil."
)
add_q(make_question(CHAPTER, "Fiscal Terminology", "How did Mughal revenue administration differentiate between the terms 'Jama' and 'Hasil'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Amil-guzar",
    ["Kotwal", "Mir Bakhshi", "Muhtasib"],
    "B",
    "1. The Amil-guzar was the revenue collector at the sarkar level, instructed by Akbar to act as an encouraging father figure to cultivators and promote cash crop production.\nHence, Option {{CORR}} is correct.",
    "Identifies Amil-guzar as revenue collector."
)
add_q(make_question(CHAPTER, "Revenue Administration", "What was the official designation of the Mughal imperial revenue collector at the district (sarkar) level?", opts, corr, sol))

# --- 8. Court Ideology, Chronicles, and Royal Rituals ---

opts, corr, sol = rotate_options(
    "Sulh-i kul (universal peace / absolute peace)",
    ["Din-i Ilahi", "Jihad", "Shari'a"],
    "C",
    "1. Akbar's state policy of universal peace and religious coexistence was known as 'Sulh-i kul', where all religions enjoyed freedom of worship without state persecution.\nHence, Option {{CORR}} is correct.",
    "Identifies Sulh-i kul as state policy of absolute peace."
)
add_q(make_question(CHAPTER, "Imperial Ideology", "What foundational political philosophy of universal tolerance and absolute peace was formulated by Abul Fazl and championed by Emperor Akbar?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Jharokha Darshan",
    ["Taslim", "Zaminbos", "Chahar Taslim"],
    "D",
    "1. Jharokha Darshan was the custom instituted by Akbar where the emperor appeared every morning at an eastern-facing balcony to be seen and greeted by gathered subjects.\nHence, Option {{CORR}} is correct.",
    "Identifies Jharokha Darshan as balcony appearance."
)
add_q(make_question(CHAPTER, "Court Ceremonial", "What daily morning ceremonial ritual was introduced by Emperor Akbar, wherein he appeared before the public at an ornate palace balcony facing east?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Zaminbos (prostration / kissing the ground)",
    ["Kornish", "Taslim", "Chahar Taslim"],
    "A",
    "1. Zaminbos was the court etiquette of complete prostration and kissing the ground before the Mughal throne, signifying utter submission to royal majesty.\nHence, Option {{CORR}} is correct.",
    "Defines Zaminbos as ground-kissing prostration."
)
add_q(make_question(CHAPTER, "Court Etiquette", "Which court ceremonial form of salutation required nobles to bow completely and kiss the ground before the emperor?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Zat indicated personal status and salary, while Sawar specified the number of cavalrymen to be maintained",
    ["Zat was military rank, while Sawar was judicial status", "Zat was for Hindu nobles, while Sawar was for Muslim nobles", "Zat indicated land area, while Sawar was revenue assessment"],
    "B",
    "1. Under the Mansabdari system, 'Zat' fixed the officer's personal standing in the hierarchy and salary, while 'Sawar' determined the quota of mounted horsemen he had to maintain.\nHence, Option {{CORR}} is correct.",
    "Explains Zat and Sawar in Mansabdari system."
)
add_q(make_question(CHAPTER, "Mansabdari System", "How were the dual ranks of 'Zat' and 'Sawar' distinguished under Akbar's Mansabdari administrative framework?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Pilgrimage tax in 1563 and Jizya in 1564",
    ["Salt tax in 1570", "Customs duty on horses in 1575", "Agricultural land revenue in 1580"],
    "C",
    "1. In a major step toward religious conciliation, Akbar abolished the tax on Hindu pilgrims in 1563 and the discriminatory jizya tax on non-Muslims in 1564.\nHence, Option {{CORR}} is correct.",
    "Identifies abolition of pilgrimage tax and jizya."
)
add_q(make_question(CHAPTER, "Religious Reforms", "Which two controversial discriminatory religious levies were abolished by Emperor Akbar in 1563 and 1564 respectively?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Reimposed the jizya tax on non-Muslim subjects in 1679",
    ["Abolished the Mansabdari system entirely", "Relocated the imperial capital to Kabul", "Banned all trade with European merchants"],
    "D",
    "1. In 1679, Emperor Aurangzeb reversed Akbar's policy and reimposed the jizya tax on non-Muslim subjects, causing widespread discontent.\nHence, Option {{CORR}} is correct.",
    "Identifies Aurangzeb reimposing jizya in 1679."
)
add_q(make_question(CHAPTER, "Aurangzeb's Policies", "What major fiscal and religious measure did Emperor Aurangzeb take in 1679, reversing Akbar's century-old policy of tolerance?", opts, corr, sol))

# --- 9. Statement & Assertion Questions ---

add_q(make_statement_question(
    CHAPTER, "Mughal Monetization and Silver",
    "The Mughal Empire experienced significant monetization of its agrarian economy due to a massive influx of silver bullion from European trade.",
    "The Mughal state refused to accept land revenue in cash, strictly forcing all peasants to pay taxes solely in grain and cattle.",
    3,
    "A",
    "1. Statement I is correct: Global trade brought massive silver inflows into India, enabling extensive minting of silver rupees.\n2. Statement II is incorrect: The Mughal revenue system actively encouraged and preferred revenue collection in cash.",
    "Examines monetization and silver inflows in Mughal India."
))

add_q(make_statement_question(
    CHAPTER, "Ain-i-Akbari Limitations",
    "The Ain-i-Akbari provides an unprecedented and meticulous statistical record of the Mughal administration under Akbar.",
    "Abul Fazl's data in the Ain-i-Akbari is equally detailed, complete, and uniformly accurate across all provinces of the empire, including Bengal and Assam.",
    3,
    "B",
    "1. Statement I is correct: Ain-i-Akbari is a monumental mine of administrative, fiscal, and social data.\n2. Statement II is incorrect: As historians have pointed out, data for peripheral regions like Bengal, Orissa, and Assam was far less detailed and reliable than for core northern provinces.",
    "Evaluates the strengths and limitations of the Ain-i-Akbari."
))

add_q(make_assertion_question(
    CHAPTER, "Promotion of Cash Crops",
    "The Mughal imperial state actively encouraged peasants to cultivate 'jins-i kamil' such as cotton and sugarcane rather than subsistence foodgrains alone.",
    "High-value cash crops fetched higher market prices and yielded significantly higher land revenue for the royal treasury.",
    1,
    "A",
    "1. Assertion (A) is true: The Mughal administration promoted commercial cash crops through tax incentives and loans.\n2. Reason (R) is true: Commercial cash crops enriched the state through higher revenue assessments.\n3. Reason (R) directly explains Assertion (A).",
    "Explains state support for commercial agriculture."
))

add_q(make_assertion_question(
    CHAPTER, "Village Community Structure",
    "The Mughal village community functioned as a closely integrated social and economic unit comprising cultivators, panchayats, and hereditary artisans.",
    "Individual cultivators could alienate, mortgage, or sell their lands to outsiders without any consultation with the village community or zamindar.",
    3,
    "C",
    "1. Assertion (A) is true: The village formed an interdependent community binding peasants, artisans, and headmen.\n2. Reason (R) is false: Land transactions and entries into the village were strictly monitored by village panchayats and headmen to prevent disruption.",
    "Analyzes the collective cohesion of the village community."
))

# --- 10. Match and Sequence Questions ---

add_q(make_match_question(
    CHAPTER, "Land Classification under Akbar",
    "Match the category of land in List I with its definition under Akbar's revenue system in List II:",
    [
        ("A", "Polaj"),
        ("B", "Parauti"),
        ("C", "Chachar"),
        ("D", "Banjar")
    ],
    [
        ("i", "Fallow for three or four years"),
        ("ii", "Cultivated annually without fallow"),
        ("iii", "Uncultivated for five years or more"),
        ("iv", "Left fallow for a year or two to recover fertility")
    ],
    "A-ii, B-iv, C-i, D-iii",
    "D",
    "1. Polaj = Annually cultivated (A-ii), Parauti = Fallow for 1-2 years (B-iv), Chachar = Fallow for 3-4 years (C-i), Banjar = Fallow for 5+ years (D-iii).",
    "Matches Akbar's land classifications with definitions."
))

add_q(make_match_question(
    CHAPTER, "Books of Ain-i-Akbari",
    "Match the book (daftar) of the Ain-i-Akbari in List I with its subject matter in List II:",
    [
        ("A", "Manzil-abadi"),
        ("B", "Sipah-abadi"),
        ("C", "Mulk-abadi"),
        ("D", "Fourth & Fifth Books")
    ],
    [
        ("i", "Military and civil administration, mansabdars"),
        ("ii", "Fiscal data, revenue rates, and provincial statistics"),
        ("iii", "Imperial household, royal mint, and treasury"),
        ("iv", "Religious and philosophical traditions of India, and Akbar's sayings")
    ],
    "A-iii, B-i, C-ii, D-iv",
    "A",
    "1. Manzil-abadi = Imperial household (A-iii), Sipah-abadi = Military/mansabdars (B-i), Mulk-abadi = Fiscal/provincial data (C-ii), Books 4-5 = Traditions and sayings (D-iv).",
    "Matches daftars of Ain-i-Akbari with contents."
))

add_q(make_match_question(
    CHAPTER, "Mughal Administrative Officials",
    "Match the Mughal administrative official in List I with their primary duty in List II:",
    [
        ("A", "Amil-guzar"),
        ("B", "Qanungo"),
        ("C", "Muqaddam"),
        ("D", "Patwari")
    ],
    [
        ("i", "Village headman responsible for maintaining order and collecting revenue"),
        ("ii", "District revenue collector at the sarkar level"),
        ("iii", "Village accountant keeping records of peasant landholdings"),
        ("iv", "Hereditary keeper of local land and revenue records")
    ],
    "A-ii, B-iv, C-i, D-iii",
    "B",
    "1. Amil-guzar = District revenue collector (A-ii), Qanungo = Hereditary keeper of revenue records (B-iv), Muqaddam = Village headman (C-i), Patwari = Village accountant (D-iii).",
    "Matches Mughal local officials with functions."
))

add_q(make_sequence_question(
    CHAPTER, "Mughal Chroniclers and Treatises",
    "Arrange the composition of the following Mughal chronicles and memoirs in chronological order:\nI. Baburnama (Tuzuk-i Baburi) by Emperor Babur\nII. Akbar Nama and Ain-i-Akbari by Abul Fazl\nIII. Jahangirnama (Tuzuk-i Jahangiri) by Emperor Jahangir\nIV. Badshahnama by Abdul Hamid Lahori",
    [
        ("A", "I"),
        ("B", "II"),
        ("C", "III"),
        ("D", "IV")
    ],
    "A, B, C, D",
    "A",
    "1. Chronology: Baburnama (early 16th c.) -> Akbar Nama (late 16th c., 1590s) -> Jahangirnama (early 17th c.) -> Badshahnama (mid-17th c. under Shah Jahan).",
    "Orders major Mughal historical chronicles chronologically."
))

add_q(make_sequence_question(
    CHAPTER, "Reforms of Akbar",
    "Arrange the following key policy measures of Emperor Akbar in chronological sequence:\nI. Abolition of pilgrimage tax on Hindus\nII. Abolition of the Jizya tax\nIII. Construction of the Ibadat Khana at Fatehpur Sikri\nIV. Promulgation of the Dahsala revenue settlement",
    [
        ("A", "I"),
        ("B", "II"),
        ("C", "III"),
        ("D", "IV")
    ],
    "A, B, C, D",
    "A",
    "1. Chronology: Pilgrimage tax abolished (1563) -> Jizya abolished (1564) -> Ibadat Khana built (1575) -> Dahsala system promulgated (1580-82).",
    "Orders landmark reforms of Akbar chronologically."
))

# --- 11. More Varied Questions to Complete 80 Questions ---

opts, corr, sol = rotate_options(
    "Abdul Hamid Lahori",
    ["Abul Fazl", "Badauni", "Inayat Khan"],
    "A",
    "1. Abdul Hamid Lahori, a disciple of Abul Fazl, was commissioned by Emperor Shah Jahan to author the Badshahnama, chronicling the first two decades of his reign.\nHence, Option {{CORR}} is correct.",
    "Identifies Abdul Hamid Lahori as author of Badshahnama."
)
add_q(make_question(CHAPTER, "Badshahnama Chronicler", "Which distinguished historian and student of Abul Fazl authored the monumental official chronicle 'Badshahnama' for Emperor Shah Jahan?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Asiatic Society of Bengal founded by Sir William Jones in 1784",
    ["Archaeological Survey of India in 1861", "Royal Geographical Society in 1830", "Fort William College in 1800"],
    "B",
    "1. The Asiatic Society of Bengal, founded by Sir William Jones in 1784, undertook the monumental task of editing and translating Indian chronicles including the Akbar Nama and Badshahnama.\nHence, Option {{CORR}} is correct.",
    "Identifies Asiatic Society of Bengal translating chronicles."
)
add_q(make_question(CHAPTER, "Colonial Translation of Chronicles", "Which scholarly institution founded in Calcutta in 1784 undertook the printing and English translation of Mughal texts like the Akbar Nama and Badshahnama?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Henry Beveridge",
    ["H.S. Jarrett", "H. Blochmann", "Alexander Cunningham"],
    "C",
    "1. Henry Beveridge translated the Akbar Nama into English over decades of painstaking editorial work for the Asiatic Society.\nHence, Option {{CORR}} is correct.",
    "Identifies Henry Beveridge translating Akbar Nama."
)
add_q(make_question(CHAPTER, "English Translations", "Which British orientalist scholar translated the complete text of the Akbar Nama into English for the Asiatic Society of Bengal?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "H. Blochmann and H.S. Jarrett",
    ["William Jones and Charles Wilkins", "James Prinsep and Colin Mackenzie", "John Marshall and Mortimer Wheeler"],
    "D",
    "1. The Ain-i-Akbari was translated into English by Heinrich Blochmann (Volume 1) and Colonel H.S. Jarrett (Volumes 2 and 3).\nHence, Option {{CORR}} is correct.",
    "Identifies Blochmann and Jarrett translating Ain-i-Akbari."
)
add_q(make_question(CHAPTER, "Ain-i-Akbari Translators", "Which two British scholars produced the standard three-volume English translation of the Ain-i-Akbari published by the Asiatic Society?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Persian",
    ["Arabic", "Turkish (Chaghtai)", "Urdu"],
    "A",
    "1. Akbar made Persian the official language of the Mughal court, administration, and chronicle writing, cementing its status across the empire.\nHence, Option {{CORR}} is correct.",
    "Identifies Persian as official Mughal administrative language."
)
add_q(make_question(CHAPTER, "Mughal Linguistic Policy", "Which language did Emperor Akbar establish as the pre-eminent official language of Mughal imperial administration and elite historiography?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Razmnama (Book of War)",
    ["Shahnama", "Hamzanama", "Tutinama"],
    "B",
    "1. Akbar commissioned the translation of the Sanskrit epic Mahabharata into Persian, which was titled the 'Razmnama' (Book of War) and illustrated with exquisite miniatures.\nHence, Option {{CORR}} is correct.",
    "Identifies Razmnama as Persian translation of Mahabharata."
)
add_q(make_question(CHAPTER, "Translations of Sanskrit Epics", "Under what title was the grand Sanskrit epic Mahabharata translated into Persian and illustrated by imperial artists at Akbar's court?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kitabkhana (the imperial royal library and atelier)",
    ["Diwan-i Khas", "Karkhana", "Naqqar Khana"],
    "C",
    "1. All Mughal handwritten and painted manuscripts were produced in the imperial manuscript atelier known as the 'Kitabkhana' (literally book-house).\nHence, Option {{CORR}} is correct.",
    "Identifies Kitabkhana as manuscript atelier."
)
add_q(make_question(CHAPTER, "Manuscript Production", "What was the name of the imperial Mughal establishment where scribes, calligraphers, paper-makers, and painters collaboratively produced illuminated manuscripts?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Nastaliq",
    ["Naskh", "Shikasteh", "Kufic"],
    "D",
    "1. Nastaliq was Akbar's favourite calligraphic script, characterized by fluid horizontal strokes and flowing, graceful curves.\nHence, Option {{CORR}} is correct.",
    "Identifies Nastaliq as Akbar's favourite calligraphic script."
)
add_q(make_question(CHAPTER, "Calligraphy", "Which fluid, cursive calligraphic style characterized by long horizontal strokes was the favourite script of Emperor Akbar?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Muhammad Husayn of Kashmir, honoured as 'Zarrin Qalam' (Golden Pen)",
    ["Mir Sayyid Ali", "Abdus Samad", "Bishandas"],
    "A",
    "1. Akbar's master calligrapher was Muhammad Husayn of Kashmir, who was bestowed with the imperial title 'Zarrin Qalam' (Golden Pen) for his mastery of Nastaliq.\nHence, Option {{CORR}} is correct.",
    "Identifies Muhammad Husayn of Kashmir honoured as Zarrin Qalam."
)
add_q(make_question(CHAPTER, "Calligraphers", "Which master calligrapher of Akbar's court was awarded the coveted title 'Zarrin Qalam' (Golden Pen) in recognition of his exquisite Nastaliq handwriting?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Painting was viewed by orthodox theologians as an unlawful attempt to imitate God's unique power of creation",
    ["Painting required pigments made of prohibited chemical compounds", "Painting encouraged European maritime smugglers", "Painting drained imperial gold reserves unnecessarily"],
    "B",
    "1. Conservative Muslim theologians (ulama) opposed human and animal portraiture on the grounds that creating life forms was the sole prerogative of God.\nHence, Option {{CORR}} is correct.",
    "Explains theological objections to painting."
)
add_q(make_question(CHAPTER, "Visual Arts and Ideology", "Why did orthodox Muslim theologians (ulama) raise objections against the depiction of living beings in Mughal court paintings?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Shah Jahan",
    ["Akbar", "Jahangir", "Aurangzeb"],
    "C",
    "1. Shah Jahan laid the foundation of his grand new walled capital city, Shahjahanabad (Delhi), in 1639, building the Red Fort and Jama Masjid.\nHence, Option {{CORR}} is correct.",
    "Identifies Shah Jahan founding Shahjahanabad."
)
add_q(make_question(CHAPTER, "Imperial Capitals", "Which Mughal emperor designed and constructed the grand new walled capital city of Shahjahanabad in Delhi beginning in 1639?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Princess Jahanara",
    ["Empress Nur Jahan", "Princess Roshanara", "Princess Zeb-un-Nisa"],
    "D",
    "1. Princess Jahanara, eldest daughter of Shah Jahan, designed the bustling central market avenue of Chandni Chowk in Shahjahanabad, complete with a reflecting canal.\nHence, Option {{CORR}} is correct.",
    "Identifies Jahanara designing Chandni Chowk."
)
add_q(make_question(CHAPTER, "Imperial Architecture", "Which Mughal royal princess designed the celebrated bazaar avenue of Chandni Chowk in the imperial city of Shahjahanabad?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Empress Nur Jahan",
    ["Mumtaz Mahal", "Jahanara Begum", "Hamida Banu Begum"],
    "A",
    "1. Empress Nur Jahan wielded immense political authority during Jahangir's reign; imperial farmans were issued in her name, and coins were minted bearing her title alongside Jahangir.\nHence, Option {{CORR}} is correct.",
    "Identifies Nur Jahan issuing farmans and coins."
)
add_q(make_question(CHAPTER, "Women in Mughal Governance", "Which Mughal empress exercised unprecedented sovereign authority, issuing imperial decrees (farmans) in her own name and having her name struck on silver coins?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Gulbadan Begum",
    ["Jahanara Begum", "Nur Jahan", "Maham Anaga"],
    "B",
    "1. Gulbadan Begum, daughter of Babur and aunt of Akbar, authored the 'Humayun Nama' at Akbar's request to preserve eyewitness memories of Babur and Humayun.\nHence, Option {{CORR}} is correct.",
    "Identifies Gulbadan Begum authoring Humayun Nama."
)
add_q(make_question(CHAPTER, "Women Chroniclers", "Which royal Mughal woman authored the biographical memoir 'Humayun Nama', offering intimate glimpses into domestic life within the early Mughal court?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Mir Bakhshi",
    ["Diwan-i Ala", "Sadr-us Sudur", "Khan-i Saman"],
    "C",
    "1. The Mir Bakhshi was the supreme military paymaster who reviewed mansabdars, inspected contingents, and presented candidates for royal appointments.\nHence, Option {{CORR}} is correct.",
    "Identifies Mir Bakhshi as head of military administration."
)
add_q(make_question(CHAPTER, "Central Administration", "Which imperial Mughal minister was the supreme paymaster of the army, responsible for inspecting mansabdar contingents and issuing salary certificates?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Diwan-i Ala",
    ["Mir Bakhshi", "Sadr-us Sudur", "Mir Atish"],
    "D",
    "1. The Diwan-i Ala (or Finance Minister) was in supreme charge of the empire's fiscal affairs, revenue assessments, expenditures, and imperial treasuries.\nHence, Option {{CORR}} is correct.",
    "Identifies Diwan-i Ala as chief finance minister."
)
add_q(make_question(CHAPTER, "Central Administration", "What was the official designation of the imperial minister who exercised supreme oversight over Mughal finances, taxation, and treasury disbursements?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sadr-us Sudur",
    ["Mir Bakhshi", "Diwan-i Ala", "Kotwal"],
    "A",
    "1. The Sadr-us Sudur was the minister for religious affairs, judicial appointments, and the distribution of charitable grants (madad-i ma'ash) and pensions.\nHence, Option {{CORR}} is correct.",
    "Identifies Sadr-us Sudur managing religious endowments."
)
add_q(make_question(CHAPTER, "Central Administration", "Which Mughal imperial minister was in charge of religious endowments, ecclesiastical appointments, and royal charitable grants (madad-i ma'ash)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Subahs (provinces), Sarkars (districts), and Parganas (sub-districts)",
    ["Deshams, Nadus, and Urs", "Mandalams, Valanadus, and Kottams", "Prants, Tarfs, and Mauzas"],
    "B",
    "1. The Mughal Empire was divided into Subahs (provinces), each subah into Sarkars (districts), and each sarkar into Parganas (sub-districts consisting of villages).\nHence, Option {{CORR}} is correct.",
    "Identifies administrative divisions of the Mughal Empire."
)
add_q(make_question(CHAPTER, "Provincial Administration", "What was the hierarchical administrative division of the Mughal Empire from the provincial level down to the sub-district level?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Subahdar",
    ["Kotwal", "Faujdar", "Qanungo"],
    "C",
    "1. The governor of a Mughal province (subah) was officially designated as the 'Subahdar', who reported directly to the emperor.\nHence, Option {{CORR}} is correct.",
    "Identifies Subahdar as provincial governor."
)
add_q(make_question(CHAPTER, "Provincial Administration", "What title was held by the executive provincial governor in charge of military, civil, and judicial affairs in a Mughal subah?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Faujdar",
    ["Subahdar", "Kotwal", "Qazi"],
    "D",
    "1. The Faujdar was the military commander at the sarkar (district) level, responsible for maintaining law and order, subduing rebellious zamindars, and assisting revenue collectors.\nHence, Option {{CORR}} is correct.",
    "Identifies Faujdar as district military commander."
)
add_q(make_question(CHAPTER, "District Administration", "Which Mughal military officer was stationed at the sarkar level to maintain public order and deploy armed troops to assist revenue collection?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kotwal",
    ["Faujdar", "Muhtasib", "Amil"],
    "A",
    "1. The Kotwal was the chief police officer and municipal magistrate of a Mughal city, responsible for nighttime patrols, markets, weights and measures, and crime prevention.\nHence, Option {{CORR}} is correct.",
    "Identifies Kotwal as city police chief."
)
add_q(make_question(CHAPTER, "Urban Administration", "What was the official designation of the chief municipal police officer and magistrate responsible for maintaining peace and order in Mughal cities?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Patwari",
    ["Muqaddam", "Qanungo", "Chowdhury"],
    "B",
    "1. The Patwari was the village accountant who kept detailed records of agricultural landholdings, crop yields, and tax payments by individual cultivators.\nHence, Option {{CORR}} is correct.",
    "Identifies Patwari as village accountant."
)
add_q(make_question(CHAPTER, "Village Administration", "Who was the indispensable village record-keeper responsible for maintaining land ownership registers, field maps, and tax receipts in rural India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Qanungo",
    ["Patwari", "Muqaddam", "Amil"],
    "C",
    "1. The Qanungo was the hereditary keeper of land revenue accounts and customary rates at the pargana level, serving as a repository of historical revenue practices.\nHence, Option {{CORR}} is correct.",
    "Identifies Qanungo as pargana revenue record-keeper."
)
add_q(make_question(CHAPTER, "Pargana Administration", "Which hereditary official kept the historical revenue records, customary tax schedules, and boundary surveys at the pargana level?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The divine light (farr-i izadi) transmitted from God to the monarch",
    ["The physical inheritance of the Caliphate in Baghdad", "The unanimous election by the council of Islamic scholars", "The conquest of the holy cities of Mecca and Medina"],
    "D",
    "1. Abul Fazl articulated the doctrine of 'farr-i izadi' (divine light), drawing from philosopher Shihabuddin Suhrawardi, asserting that royal authority flowed directly from God to the sovereign.\nHence, Option {{CORR}} is correct.",
    "Identifies farr-i izadi as foundation of Mughal kingship."
)
add_q(make_question(CHAPTER, "Ideology of Kingship", "According to Abul Fazl's philosophical formulation, what was the ultimate divine origin of the Mughal emperor's supreme sovereign authority?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "European Christian art brought by Jesuit missionaries to the Mughal court",
    ["Ancient Persian rock-cut reliefs at Persepolis", "Chinese Ming porcelain decorative patterns", "Egyptian hieroglyphic wall paintings"],
    "A",
    "1. The visual convention of painting a halo or nimbus around the heads of Mughal emperors (especially under Jahangir and Shah Jahan) was borrowed from Renaissance Christian art introduced by Portuguese Jesuit fathers.\nHence, Option {{CORR}} is correct.",
    "Identifies European Jesuit influence on halo in Mughal portraits."
)
add_q(make_question(CHAPTER, "Mughal Miniature Art", "From which artistic tradition did Mughal court painters adopt the visual symbol of the radiant halo (nimbus) encircling the emperor's head to symbolize divine majesty?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Father Rodolfo Acquaviva and Father Antonio Monserrate",
    ["Father Roberto Nobili and Father Matteo Ricci", "Father Thomas Stephens and Father Francis Xavier", "Father Alexandre de Rhodes and Father Paul Le Jeune"],
    "B",
    "1. The first Jesuit mission sent from Goa to Akbar's court at Fatehpur Sikri in 1580 was led by Father Rodolfo Acquaviva and Father Antonio Monserrate.\nHence, Option {{CORR}} is correct.",
    "Identifies Acquaviva and Monserrate leading first Jesuit mission."
)
add_q(make_question(CHAPTER, "Jesuit Missions", "Which two Catholic Jesuit priests led the first Portuguese religious delegation to Emperor Akbar's court at Fatehpur Sikri in 1580?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Chandar Bhan Brahman",
    ["Banarasidas", "Madho Das", "Haridas"],
    "C",
    "1. Chandar Bhan Brahman was a Hindu munshi (secretary) who served under Shah Jahan and authored the celebrated Persian work 'Chahar Chaman' (Four Gardens) depicting court life.\nHence, Option {{CORR}} is correct.",
    "Identifies Chandar Bhan Brahman authoring Chahar Chaman."
)
add_q(make_question(CHAPTER, "Court Chroniclers", "Which prominent Hindu secretary and Persian poet in Shah Jahan's administration authored the celebrated court treatise 'Chahar Chaman'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Khalisa lands were administered directly by the imperial crown with revenues entering the royal treasury, whereas Jagir lands were assigned to nobles in lieu of salary",
    ["Khalisa lands were barren wastelands, while Jagir lands were fertile riverbeds", "Khalisa lands were gifted to European merchants, while Jagir lands went to tribal chiefs", "Khalisa lands paid taxes in grain, while Jagir lands paid taxes in horses"],
    "D",
    "1. In Mughal fiscal administration, Khalisa referred to crown lands whose revenue went straight to the imperial treasury, whereas Jagir lands were assigned to mansabdars for salary upkeep.\nHence, Option {{CORR}} is correct.",
    "Distinguishes Khalisa lands from Jagir assignments."
)
add_q(make_question(CHAPTER, "Fiscal Land Categories", "How did the Mughal imperial administration distinguish between 'Khalisa' land and 'Jagir' land?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Peshkash",
    ["Inam", "Madad-i ma'ash", "Suyurghal"],
    "A",
    "1. Peshkash was the formal ceremonial offering or tribute presented by nobles, feudatories, or foreign ambassadors to the emperor to reaffirm submission and loyalty.\nHence, Option {{CORR}} is correct.",
    "Defines Peshkash as ceremonial tribute."
)
add_q(make_question(CHAPTER, "Court Protocol", "What technical Persian term denoted the mandatory ceremonial tribute or valuable gift presented by a noble or vassal to the Mughal emperor?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Khil'at (robe of honour)",
    ["Sarpech", "Chhatra", "Aftabgir"],
    "B",
    "1. The Khil'at was a ceremonial robe of honour gifted by the emperor to an official or noble, symbolizing that the recipient was infused with the sovereign's personal aura and protection.\nHence, Option {{CORR}} is correct.",
    "Identifies Khil'at as imperial robe of honour."
)
add_q(make_question(CHAPTER, "Imperial Regalia", "What was the term for the ceremonial 'robe of honour' traditionally bestowed by the Mughal sovereign upon favored nobles and visiting envoys?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "1526 by Babur after the First Battle of Panipat",
    ["1556 by Akbar after the Second Battle of Panipat", "1540 by Sher Shah Suri", "1504 by Babur after capturing Kabul"],
    "C",
    "1. The Mughal Empire was founded in 1526 when Zahiruddin Muhammad Babur defeated Ibrahim Lodi at the First Battle of Panipat.\nHence, Option {{CORR}} is correct.",
    "Identifies 1526 First Battle of Panipat founding Mughal Empire."
)
add_q(make_question(CHAPTER, "Foundation of Empire", "In which year and following which decisive military battle was the Mughal Empire formally established in northern India?", opts, corr, sol))

# Verification of Unit 8
print(f"Total questions generated for Unit 8: {len(questions)}")
assert len(questions) == 80, f"Expected 80 questions, got {len(questions)}"

out_path = "mock/history_units/unit8.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved 80 questions to {out_path}!")
