import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.history_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text,
    get_pyq_normalized_set
)

CHAPTER = "Through the Eyes of Travellers: Perceptions of Society (c. 10th - 17th Century)"
questions = []
seen = set()
pyq_seen = get_pyq_normalized_set()

# Load prior units
for u in ["unit1.json", "unit2.json", "unit3.json", "unit4.json"]:
    p = f"mock/history_units/{u}"
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            for q in json.load(f):
                seen.add(normalize_text(q["questionText"]))

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:80]}")
    if norm in pyq_seen:
        raise ValueError(f"Matches PYQ: {q['questionText'][:80]}")
    seen.add(norm)
    questions.append(q)

print("Generating 60 unique questions for Unit 5: Through the Eyes of Travellers...")

# =================================================================================================
# 1. Al-Biruni and Kitab-ul-Hind (Q1 - Q20)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Khwarizm in modern Uzbekistan in 973 CE",
    ["Tangier in Morocco in 1304 CE", "Paris in France in 1620 CE", "Venice in Italy in 1254 CE"],
    "A",
    "1. Al-Biruni was born in 973 CE in Khwarizm in present-day Uzbekistan, an important center of learning in the Islamic world.\nHence, Option {{CORR}} is correct.",
    "Identifies birthplace of Al-Biruni in Khwarizm."
)
add_q(make_question(CHAPTER, "Al-Biruni", "Where and in which year was the great polymath Al-Biruni born?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sultan Mahmud of Ghazni invaded Khwarizm in 1017 CE and brought scholars including Al-Biruni to Ghazni",
    ["He travelled as a Buddhist pilgrim to study at Nalanda", "He was dispatched as an official ambassador by the Pope of Rome", "He was shipwrecked off the coast of Gujarat during a maritime storm"],
    "B",
    "1. In 1017, when Sultan Mahmud invaded Khwarizm, he took several scholars and poets back to his capital, Ghazni; Al-Biruni was one of them.\nHence, Option {{CORR}} is correct.",
    "Explains how Al-Biruni arrived in Ghazni."
)
add_q(make_question(CHAPTER, "Al-Biruni", "How did Al-Biruni initially arrive in the Afghan capital of Ghazni, from where he later travelled to India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Arabic, consisting of 80 chapters covering religion, philosophy, astronomy, customs, social life, and metrology",
    ["Classical Persian, consisting of 100 poetic ghazals celebrating royal banquets", "Sanskrit, written in Brahmi script on palm-leaf folios", "Turkic, consisting of military tactics and cavalry manuals"],
    "C",
    "1. Al-Biruni's Kitab-ul-Hind was written in Arabic, simple and lucid, divided into 80 chapters on religion, philosophy, festivals, astronomy, laws, and customs.\nHence, Option {{CORR}} is correct.",
    "Describes language and structure of Kitab-ul-Hind."
)
add_q(make_question(CHAPTER, "Kitab-ul-Hind", "Al-Biruni's celebrated encyclopedic account of India, the 'Kitab-ul-Hind', was composed in which language and structural format?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Beginning with a question, followed by a description based on Sanskritic traditions, and concluding with a comparison with other cultures",
    ["Written in rhyming Persian couplets praising the Delhi Sultans", "Arranged chronologically year-by-year as an imperial royal diary", "Written in dialogue form between a Greek philosopher and an Indian raja"],
    "D",
    "1. Al-Biruni adopted a distinctive geometric structure in each chapter: beginning with a question, following with a Sanskritic description, and concluding with cross-cultural comparisons.\nHence, Option {{CORR}} is correct.",
    "Describes distinctive geometric chapter structure of Kitab-ul-Hind."
)
add_q(make_question(CHAPTER, "Kitab-ul-Hind", "What distinctive, geometric methodological structure did Al-Biruni employ in each chapter of the Kitab-ul-Hind?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The Sanskrit language, religious beliefs and practices, and the self-absorption and insularity of the local population",
    ["Extreme tropical heat, lack of transport horses, and banditry", "Absence of paper, lack of ink, and destruction of libraries by fire", "Total prohibition on foreigners speaking to Brahmanas"],
    "A",
    "1. Al-Biruni identified three major barriers: (1) Sanskrit (so different from Arabic/Persian), (2) religious beliefs and practices, and (3) insularity of the local population.\nHence, Option {{CORR}} is correct.",
    "Identifies three barriers identified by Al-Biruni."
)
add_q(make_question(CHAPTER, "Al-Biruni's Barriers", "Which three fundamental barriers to cross-cultural understanding did Al-Biruni identify when researching Indian society?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ancient Persian society, which recognized four social categories (knights/princes, monks/priests/lawyers, physicians/astronomers/artisans, and peasants/laborers)",
    ["Ancient Greek city-states of Athens and Sparta", "Feudal kingdoms of Norman England", "Imperial courts of Tang dynasty China"],
    "B",
    "1. Al-Biruni sought to show that caste was not unique by comparing the four Indian varnas to ancient Persia's four classes: knights, priests, scientists/artisans, and peasants.\nHence, Option {{CORR}} is correct.",
    "Describes Al-Biruni comparing Indian varnas to ancient Persian classes."
)
add_q(make_question(CHAPTER, "Al-Biruni on Caste", "To contextualize the Indian fourfold varna system, Al-Biruni drew an explicit historical comparison with the social structure of:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "He rejected it, asserting that everything which falls into impurity strives to regain its original state of purity, as the sun cleanses air and salt cleanses sea",
    ["He enthusiastically endorsed it as an eternal law of planetary physics", "He recommended that all untouchables be forcibly drafted into the army", "He claimed that ritual pollution was practiced in identical fashion in Mecca"],
    "C",
    "1. Al-Biruni rejected the notion of pollution, insisting that nature always purifies what is polluted (the sun cleanses air, salt purifies the sea), calling pollution contrary to natural laws.\nHence, Option {{CORR}} is correct.",
    "Explains Al-Biruni's rejection of ritual pollution."
)
add_q(make_question(CHAPTER, "Al-Biruni on Caste", "How did Al-Biruni critique and evaluate the Brahmanical concept of ritual 'pollution' (untouchability)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Antyaja (literally born outside the system), who performed inexpensive labor for society",
    ["Kshatriyas", "Samantas", "Agraharas"],
    "D",
    "1. Al-Biruni noted that those who fell outside the fourfold varna system were known as antyaja, who provided various services but were socially marginalized.\nHence, Option {{CORR}} is correct.",
    "Identifies Antyaja in Al-Biruni's account."
)
add_q(make_question(CHAPTER, "Al-Biruni on Caste", "In Al-Biruni's account, marginalized groups who lived outside the traditional fourfold varna system and provided menial services were referred to as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Vedas, Puranas, Bhagavad Gita, Manusmriti, and treatises by Patanjali and Varahamihira",
    ["Oral folk songs sung by camel caravan drivers in Sindh", "Secret Persian spy reports dispatched to Baghdad", "Records kept by Christian Franciscan missionaries in Goa"],
    "A",
    "1. Al-Biruni depended heavily on Sanskritic texts: the Vedas, Puranas, Bhagavad Gita, Manusmriti, Patanjali's Yogasutra, and astronomical works by Varahamihira.\nHence, Option {{CORR}} is correct.",
    "Lists primary Sanskritic sources used by Al-Biruni."
)
add_q(make_question(CHAPTER, "Al-Biruni's Sources", "Which classical Sanskritic texts did Al-Biruni extensively consult and translate to understand Indian philosophical and social traditions?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Hebrew and Syriac, in addition to Arabic and Persian (though he did not know Greek)",
    ["Latin and English", "Chinese and Japanese", "Russian and German"],
    "B",
    "1. Al-Biruni was well-versed in Syriac, Arabic, Persian, Hebrew, and Sanskrit. Although he did not know Greek, he read Plato and Aristotle in Arabic translations.\nHence, Option {{CORR}} is correct.",
    "Identifies linguistic repertoire of Al-Biruni."
)
add_q(make_question(CHAPTER, "Al-Biruni", "Besides Arabic, Persian, and Sanskrit, which other classical West Asian languages was Al-Biruni proficient in?", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Al-Biruni",
    "Al-Biruni spent years in the company of Brahmana priests and scholars, learning Sanskrit and studying religious and philosophical texts.",
    "Al-Biruni travelled widely across Punjab and northern India during the 11th century.",
    1, "A",
    "1. Both statements are true NCERT facts regarding Al-Biruni's intellectual journey in 11th-century northern India.",
    "Confirms both statements are correct regarding Al-Biruni."
))

add_q(make_assertion_question(
    CHAPTER, "Al-Biruni on Caste",
    "Al-Biruni argued that the Brahmanical concept of ritual pollution was contrary to the laws of nature.",
    "According to Al-Biruni, everything that falls into a state of impurity strives to and succeeds in regaining its original condition of purity.",
    1, "A",
    "1. Both (A) and (R) are true, and (R) is the precise philosophical reason why Al-Biruni rejected the permanence of ritual pollution.",
    "Confirms (R) is the correct explanation of (A)."
))

# =================================================================================================
# 2. Ibn Battuta and the Rihla (Q21 - Q40)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Tangier in Morocco, North Africa in 1304 CE",
    ["Cairo in Egypt in 1250 CE", "Damascus in Syria in 1400 CE", "Baghdad in Iraq in 1150 CE"],
    "A",
    "1. Ibn Battuta was born in Tangier, Morocco, into one of the most respectable and educated families known for their expertise in Islamic religious law (sharia).\nHence, Option {{CORR}} is correct.",
    "Identifies birthplace of Ibn Battuta in Tangier, Morocco."
)
add_q(make_question(CHAPTER, "Ibn Battuta", "In which North African city was the celebrated 14th-century globe-trotter Ibn Battuta born in 1304 CE?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Rihla, written in Arabic",
    ["Kitab-ul-Hind, written in Persian", "Baburnama, written in Chaghatai Turkic", "Akbarnama, written in Urdu"],
    "B",
    "1. Ibn Battuta's book of travels is called the Rihla, written in Arabic, providing rich details about the social and cultural life in 14th-century India.\nHence, Option {{CORR}} is correct.",
    "Identifies Rihla composed in Arabic."
)
add_q(make_question(CHAPTER, "The Rihla", "The famous travelogue composed by Ibn Battuta chronicling his extensive journeys across Africa and Asia is titled:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Muhammad bin Tughlaq",
    ["Alauddin Khalji", "Iltutmish", "Firoz Shah Tughlaq"],
    "C",
    "1. Lured by the reputation of Sultan Muhammad bin Tughlaq for generous patronage of scholars, Ibn Battuta reached Delhi in 1334 and was appointed Qazi.\nHence, Option {{CORR}} is correct.",
    "Identifies Sultan Muhammad bin Tughlaq patronizing Ibn Battuta."
)
add_q(make_question(CHAPTER, "Ibn Battuta in Delhi", "Which Sultan of Delhi appointed Ibn Battuta as the Qazi (judge) of Delhi after being impressed by his scholarly credentials?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Appointed him as the Sultan's imperial envoy to the Mongol ruler of China",
    ["Banished him permanently to a remote island in the Atlantic Ocean", "Ordered him to translate the Mahabharata into Latin", "Demanded that he lead an army against the Byzantine Empire"],
    "D",
    "1. In 1342, after restoring him to imperial favour, Muhammad bin Tughlaq ordered Ibn Battuta to proceed to China as the Sultan's envoy to the Mongol emperor.\nHence, Option {{CORR}} is correct.",
    "Identifies mission to China as Sultan's envoy."
)
add_q(make_question(CHAPTER, "Ibn Battuta in Delhi", "In 1342, Sultan Muhammad bin Tughlaq dispatched Ibn Battuta on which high-level diplomatic assignment?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Served as a qazi (judge) for eighteen months in the Maldive islands",
    ["Built a naval war fleet to invade Sri Lanka", "Established an ivory merchant bank in Goa", "Was imprisoned by the Portuguese governor of Cochin"],
    "A",
    "1. En route to China, Ibn Battuta visited the Maldive islands where he served as a qazi for eighteen months before proceeding to Bengal and Sumatra.\nHence, Option {{CORR}} is correct.",
    "Notes Ibn Battuta serving as Qazi in Maldives for 18 months."
)
add_q(make_question(CHAPTER, "Ibn Battuta's Travels", "During his maritime travels to China, what official role did Ibn Battuta fulfill for eighteen months in the Maldive Islands?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The coconut (which looked like a human head with two eyes and a mouth) and paan (betel leaves)",
    ["Tea leaves and porcelain teacups", "Silk cocoons and opium pipes", "Coffee beans and dark chocolate"],
    "B",
    "1. Ibn Battuta was thoroughly fascinated by two plants previously unknown to his readers: the coconut (resembling a human face) and the betel leaf (paan).\nHence, Option {{CORR}} is correct.",
    "Identifies coconut and paan as plants described with amazement by Ibn Battuta."
)
add_q(make_question(CHAPTER, "The Coconut and the Paan", "Which two Indian agricultural commodities did Ibn Battuta describe with intense fascination to his North African readers as botanical wonders?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Vibrant, densely populated, and prosperous, with colorful bazaars that served as hubs of both commerce and social/cultural activity",
    ["Depopulated ghost towns deserted by fleeing citizens", "Pure military garrison cantonments with zero commercial trading shops", "Impoverished collections of mud huts without fortifications"],
    "C",
    "1. Ibn Battuta described Indian cities as full of exciting opportunities for those with drive, densely populated and prosperous, with bustling bazaars.\nHence, Option {{CORR}} is correct.",
    "Describes Ibn Battuta's perception of Indian cities."
)
add_q(make_question(CHAPTER, "Indian Cities", "How did Ibn Battuta describe the urban centres of 14th-century India, particularly Delhi and Daulatabad?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Twenty-eight gates, of which the Badaun Darwaza was the greatest",
    ["Four gates positioned at cardinal directions", "A single iron drawbridge across the Yamuna", "Fifty gates made of solid silver"],
    "D",
    "1. Ibn Battuta described Delhi as a vast city with a formidable wall breached by 28 gates, of which the Badaun Darwaza was the largest.\nHence, Option {{CORR}} is correct.",
    "Identifies 28 gates of Delhi in Ibn Battuta's account."
)
add_q(make_question(CHAPTER, "Delhi in Ibn Battuta's Account", "According to Ibn Battuta, the formidable city wall of Delhi was pierced by how many massive gates, and which was the greatest?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Tarababad (a marketplace for male and female singers, lavishly decorated with swings and carpets)",
    ["Chandni Chowk", "Meena Bazaar", "Sadak-e-Azam"],
    "A",
    "1. In Daulatabad, Ibn Battuta described Tarababad, a bazaar for female and male singers with decorated shops, mosques, and entertainment platforms.\nHence, Option {{CORR}} is correct.",
    "Identifies Tarababad in Daulatabad."
)
add_q(make_question(CHAPTER, "Bazaars in Medieval Cities", "In Daulatabad (Maharashtra), Ibn Battuta described a unique musical and entertainment marketplace known as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The extreme natural fertility of the soil, which allowed farmers to harvest two crops a year (autumn kharif and spring rabi)",
    ["Continuous subsidies paid directly by the Abbasid Caliph in Cairo", "Imports of grain shipped from European agricultural estates", "The total abolition of all land revenue dues on peasantry"],
    "B",
    "1. Ibn Battuta explained that Indian agriculture was remarkably productive because the fertility of the soil enabled farmers to harvest two crops a year.\nHence, Option {{CORR}} is correct.",
    "Explains agricultural fertility enabling two crops a year."
)
add_q(make_question(CHAPTER, "Indian Agriculture", "What foundational ecological factor underpinned the prosperity of 14th-century Indian cities and manufactures according to Ibn Battuta?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The postal system was so efficient that news travelled from Sindh to Delhi in 5 days, while travellers took 50 days",
    ["Postal delivery was entirely conducted by carrier pigeons flying to Mecca", "Messages took five years to reach Delhi from provincial governors", "The postal service operated exclusively during full moon nights"],
    "C",
    "1. Ibn Battuta was amazed by the postal system: while it took 50 days to travel from Sindh to Delhi, the Sultan's spies and couriers delivered news in just 5 days.\nHence, Option {{CORR}} is correct.",
    "Notes efficiency of postal system delivering in 5 days vs 50 days."
)
add_q(make_question(CHAPTER, "Communication and Postal System", "What astonishing fact did Ibn Battuta record regarding the speed of the Indian postal communication system under Muhammad bin Tughlaq?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ulagh was the horse post stationed every four miles; Dawa was the foot post stationed every third of a mile",
    ["Ulagh was the camel caravan; Dawa was the royal river barge", "Ulagh was the pigeon dispatch; Dawa was the smoke signal network", "Ulagh was the elephant cavalry; Dawa was the foot archer division"],
    "D",
    "1. Ibn Battuta describes two postal systems: the horse post, called ulagh (run by royal horses every four miles), and the foot post, called dawa (three stations per mile).\nHence, Option {{CORR}} is correct.",
    "Distinguishes between Ulagh (horse post) and Dawa (foot post)."
)
add_q(make_question(CHAPTER, "Communication and Postal System", "How did the two postal networks in 14th-century India, the 'Ulagh' and the 'Dawa', operate?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The foot post (dawa) was often even faster than the horse post, and was used to transport fresh fruit from Khurasan for the Sultan",
    ["The foot post carried only royal war armor", "The foot post operated only inside palace corridors", "The foot post was operated by foreign Roman slaves"],
    "A",
    "1. The foot post was often faster than the horse post; fresh fruits from Khurasan (which were in high demand in India) were transported using foot couriers.\nHence, Option {{CORR}} is correct.",
    "Explains that Dawa (foot post) was faster and transported fruits."
)
add_q(make_question(CHAPTER, "Communication and Postal System", "Why was the foot post (dawa) considered particularly remarkable by Ibn Battuta in terms of operational speed?", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Ibn Battuta's Travel Passion",
    "Ibn Battuta considered experience gained through travelling to be a more important source of knowledge than books.",
    "He spent around thirty years of his life travelling through North Africa, West Asia, parts of Central Asia, India, Maldives, and China.",
    1, "A",
    "1. Both statements are accurate NCERT facts reflecting Ibn Battuta's passion for experiential travel over book learning.",
    "Confirms both statements are correct regarding Ibn Battuta."
))

add_q(make_assertion_question(
    CHAPTER, "Trade and Commerce",
    "Indian textiles such as fine muslins, silks, and brocades were in tremendous demand across Asian and Mediterranean markets.",
    "Ibn Battuta recorded that Indian merchants were connected to inter-Asian trade networks linking West Asia, Southeast Asia, and China.",
    1, "A",
    "1. Both (A) and (R) are true, and active participation in vast oceanic networks facilitated the widespread demand for Indian luxury textiles.",
    "Confirms (R) is the correct explanation of (A)."
))

# =================================================================================================
# 3. Francois Bernier & Other European Travellers (Q41 - Q60)
# =================================================================================================

opts, corr, sol = rotate_options(
    "France, and he was a physician, political philosopher, and historian who resided in India from 1656 to 1668",
    ["Portugal, and he was a Catholic Jesuit priest who lived in Goa from 1510 to 1520", "England, and he was a captain in the East India Company's army under Robert Clive", "Holland, and he was a gem merchant trading diamonds with Golconda"],
    "A",
    "1. Francois Bernier was a Frenchman, a physician, philosopher, and historian who lived in India for twelve years (1656 to 1668), closely observing the Mughal court.\nHence, Option {{CORR}} is correct.",
    "Identifies nationality and background of Francois Bernier."
)
add_q(make_question(CHAPTER, "Francois Bernier", "What was the nationality and professional background of the 17th-century European traveller Francois Bernier?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Prince Dara Shukoh (eldest son of Emperor Shah Jahan) and Danishmand Khan (an intellectual Mughal nobleman)",
    ["Emperor Babur and Bairam Khan", "Shivaji Maharaj and Afzal Khan", "Siraj-ud-Daulah and Mir Jafar"],
    "B",
    "1. Bernier was closely associated with the Mughal court: he was physician to Prince Dara Shukoh and later attached to Danishmand Khan, a patron of intellect.\nHence, Option {{CORR}} is correct.",
    "Identifies Bernier's association with Dara Shukoh and Danishmand Khan."
)
add_q(make_question(CHAPTER, "Francois Bernier", "With which prominent figures in the Mughal court was Francois Bernier closely associated during his stay in India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "He constantly compared Mughal India with contemporary Western Europe, framing India as a dismal picture of decay and Europe as the pinnacle of progress",
    ["He praised the Mughal system as a perfect utopia superior to European monarchies in every respect", "He focused solely on compiling Sanskrit botanical herbals without discussing politics", "He wrote exclusively about pirate ships operating in the Arabian Sea"],
    "C",
    "1. Bernier's Travels in the Mughal Empire is marked by binary contrasts: he compared India to Europe, consistently portraying India as inferior and Europe as superior.\nHence, Option {{CORR}} is correct.",
    "Explains Bernier's binary comparative method contrasting India and Europe."
)
add_q(make_question(CHAPTER, "Travels in the Mughal Empire", "What distinctive analytical method characterized Francois Bernier's descriptions in 'Travels in the Mughal Empire'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "King Louis XIV of France",
    ["Queen Elizabeth I of England", "Emperor Charles V of the Holy Roman Empire", "Pope Clement VIII in Rome"],
    "D",
    "1. Bernier dedicated his principal works to King Louis XIV of France, and his letters were addressed to French ministers and intellectuals.\nHence, Option {{CORR}} is correct.",
    "Identifies King Louis XIV as dedicatee of Bernier's work."
)
add_q(make_question(CHAPTER, "Travels in the Mughal Empire", "To which European monarch did Francois Bernier officially dedicate his principal writings on Mughal India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Crown ownership of land (the Emperor owned all land and private property did not exist)",
    ["Excessive freedom granted to peasant agricultural cooperatives", "Democratic election of provincial subahdars by village assemblies", "Total absence of any monetary currency in rural trade"],
    "A",
    "1. Bernier argued that one of the fundamental differences between India and Europe was the absence of private property in land, claiming the Mughal king owned all land.\nHence, Option {{CORR}} is correct.",
    "Identifies absence of private property in land in Bernier's theory."
)
add_q(make_question(CHAPTER, "The Question of Landownership", "According to Francois Bernier, what was the primary structural flaw causing the economic ruin of Mughal India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Because landholders could not pass land to their children, they had no incentive to invest long-term capital, ruining agriculture and impoverishing peasants",
    ["Because peasants refused to cultivate food crops and grew only decorative flowers", "Because all agricultural land was flooded annually by ocean tsunamis", "Because European merchants bought all available fertile land in Bengal"],
    "B",
    "1. Bernier asserted that because land could not be inherited by children, landholders neglected long-term investments, causing ruined towns, barren fields, and impoverished ryots.\nHence, Option {{CORR}} is correct.",
    "Explains Bernier's argument on consequences of crown landownership."
)
add_q(make_question(CHAPTER, "The Question of Landownership", "Why did the purported absence of private property in land lead to disastrous economic consequences, in Bernier's assessment?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A king of beggars and barbarians, ruling over cities that were contaminated with ill air and fields pestilential with weeds",
    ["The most enlightened constitutional monarch in human history", "A benevolent father figure adored by every peasant household", "A democratic president presiding over elected provincial assemblies"],
    "C",
    "1. In an extreme rhetorical statement, Bernier described the Mughal emperor as a 'king of beggars and barbarians', presiding over a ruined and impoverished land.\nHence, Option {{CORR}} is correct.",
    "Quotes Bernier's characterization of Mughal king as king of beggars."
)
add_q(make_question(CHAPTER, "Bernier on Mughal Kingship", "In his vivid polemical writings, Francois Bernier described the Mughal Emperor as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Montesquieu (concept of 'Oriental Despotism') and Karl Marx (concept of the 'Asiatic Mode of Production')",
    ["Jean-Jacques Rousseau and Voltaire", "John Locke and Thomas Hobbes", "Adam Smith and David Ricardo"],
    "D",
    "1. Bernier's thesis on crown ownership influenced Montesquieu (oriental despotism where a ruler owns all property) and later Karl Marx (Asiatic mode of production).\nHence, Option {{CORR}} is correct.",
    "Identifies Montesquieu and Marx influenced by Bernier."
)
add_q(make_question(CHAPTER, "Influence on Western Thinkers", "Francois Bernier's erroneous thesis regarding state landownership in the East significantly influenced which major European political philosophers?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Camp Towns (towns that owed their existence and survival entirely to the presence of the imperial court, and declined when the court moved away)",
    ["Autonomous Commercial Republics", "Temple Sanctuary Cities", "Monastic Academic Enclaves"],
    "A",
    "1. Bernier described Mughal cities as 'camp towns', suggesting they depended for their existence on the imperial camp, flourishing when it arrived and withering when it left.\nHence, Option {{CORR}} is correct.",
    "Defines Bernier's concept of Camp Towns."
)
add_q(make_question(CHAPTER, "Bernier on Urban Towns", "Francois Bernier characterized 17th-century Mughal urban centres with which dismissive sociological label?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Mahajans (merchant guilds) headed by their corporate leader, the Nagarsheth",
    ["Sufi khanqahs headed by a pir", "Zila parishads headed by a district magistrate", "Peasant panchayats headed by an uzhavar"],
    "B",
    "1. In western Indian trading centers like Gujarat, urban mercantile communities were organized into occupational bodies called mahajans, headed by the nagarsheth.\nHence, Option {{CORR}} is correct.",
    "Identifies Mahajans and Nagarsheth in western Indian towns."
)
add_q(make_question(CHAPTER, "Urban Merchant Communities", "In urban commercial centres of western India such as Ahmedabad, merchant communities were organized into bodies called:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The tragic visual account of a weeping twelve-year-old widow being forcibly held down and burned alive on her deceased husband's funeral pyre at Lahore",
    ["The triumphant military victory of Rani Durgavati", "The coronation ceremony of Empress Nur Jahan", "The educational curriculum of women scholars at Nalanda"],
    "C",
    "1. Bernier left an agonizing account of sati that he witnessed at Lahore: a young girl of barely twelve years old being dragged weeping to the pyre and held down with logs.\nHence, Option {{CORR}} is correct.",
    "Describes Bernier's account of sati at Lahore."
)
add_q(make_question(CHAPTER, "Women, Slaves and Sati", "Which harrowing social practice in 17th-century India did Francois Bernier describe in detail after witnessing it firsthand at Lahore?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Jean-Baptiste Tavernier",
    ["Duarte Barbosa", "Niccolao Manucci", "Roberto Nobili"],
    "D",
    "1. Jean-Baptiste Tavernier, a French jeweller, travelled to India at least six times, fascinated by trading conditions and comparing India's diamond trade with Iran and Ottoman empire.\nHence, Option {{CORR}} is correct.",
    "Identifies Jean-Baptiste Tavernier as French jeweller."
)
add_q(make_question(CHAPTER, "European Travellers", "Which French jeweller visited India at least six times during the 17th century and wrote extensively about Indian gem trading networks?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Niccolao Manucci",
    ["Francois Bernier", "Duarte Barbosa", "Jean-Baptiste Tavernier"],
    "A",
    "1. Italian doctor Niccolao Manucci never returned to Europe and settled down permanently in India, writing the celebrated 'Storia do Mogor'.\nHence, Option {{CORR}} is correct.",
    "Identifies Niccolao Manucci settling in India."
)
add_q(make_question(CHAPTER, "European Travellers", "Which Italian physician came to India during the 17th century, never returned to Europe, and settled down permanently while chronicling Mughal court intrigues?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Abdur Razzaq Samarqandi in the 1440s",
    ["Al-Biruni in the 1020s", "Ibn Battuta in the 1330s", "Francois Bernier in the 1660s"],
    "B",
    "1. Abdur Razzaq Samarqandi was an envoy sent by the ruler of Herat who visited south India and the Vijayanagara Empire in the 1440s, describing its fortifications.\nHence, Option {{CORR}} is correct.",
    "Identifies Abdur Razzaq Samarqandi visiting Vijayanagara."
)
add_q(make_question(CHAPTER, "Travellers to the South", "Which Persian diplomat and scholar from Herat visited the southern kingdom of Vijayanagara in the 1440s, leaving a remarkable account of its seven lines of defensive walls?", opts, corr, sol))

add_q(make_match_question(
    CHAPTER, "Postal System Features",
    "Match the term associated with the medieval communication system described by Ibn Battuta in List I with its correct definition in List II:",
    [
        ("A", "Uluq"),
        ("B", "Dawa"),
        ("C", "Rabwa"),
        ("D", "Tarababad")
    ],
    [
        ("i", "Foot-post with stations spaced every third of a mile"),
        ("ii", "Horse-post stationed every four miles"),
        ("iii", "Three stations positioned in every mile for couriers"),
        ("iv", "Marketplace in Daulatabad famous for male and female singers")
    ],
    "A-ii, B-i, C-iii, D-iv",
    "B",
    "1. Ibn Battuta describes the postal system: Uluq is the horse-post stationed every 4 miles (A-ii), Dawa is the foot-post (B-i), Rabwa refers to the three stations per mile for foot couriers (C-iii), and Tarababad was the famous music market in Daulatabad (D-iv).",
    "Matches terms from Ibn Battuta's description of medieval postal and urban networks."
))

add_q(make_statement_question(
    CHAPTER, "Al-Biruni's Linguistic Knowledge",
    "Al-Biruni was well-versed in Syriac, Arabic, Persian, and Sanskrit, but did not know Greek.",
    "Despite not knowing Greek, Al-Biruni was thoroughly familiar with the philosophical works of Plato and Aristotle through Arabic translations.",
    1,
    "A",
    "1. Statement I is correct: Al-Biruni mastered Syriac, Arabic, Persian, and later Sanskrit, though he did not know Greek.\n2. Statement II is correct: He was well acquainted with Plato, Aristotle, and other Greek philosophers through translations into Arabic.",
    "Assesses knowledge of Al-Biruni's linguistic expertise and intellectual background."
))

add_q(make_statement_question(
    CHAPTER, "Ibn Battuta on Indian Flora",
    "Ibn Battuta described the coconut tree by noting that it closely resembled date palms, but produced nuts that resembled human faces with two eyes and a mouth.",
    "Ibn Battuta described betel leaves (paan) as a fruit that grew on trees like apples and was consumed solely for its medicinal juice.",
    3,
    "B",
    "1. Statement I is correct: Ibn Battuta wrote vivid comparisons of the coconut to human heads with eyes and mouths, and the tree to date palms.\n2. Statement II is incorrect: He noted that betel is not a fruit but a vine grown like grape vines, cultivated solely for its leaves, which are chewed with areca nut and lime.",
    "Examines Ibn Battuta's descriptions of unusual flora (coconut and paan)."
))

add_q(make_assertion_question(
    CHAPTER, "Bernier on Mughal Property",
    "Francois Bernier argued that the absence of private property in land was the primary cause for the ruination of agriculture and impoverishment of peasants in Mughal India.",
    "Bernier believed that because the Mughal emperor owned all land, landholders could not pass land on to their children and therefore had no incentive to invest long-term capital in soil improvement.",
    1,
    "A",
    "1. Assertion (A) is true: Bernier identified crown ownership of land as the fundamental difference between Mughal India and Western Europe, leading to economic ruin.\n2. Reason (R) is true: Bernier asserted that since the king owned all land, holders could not bequeath estates to heirs, discouraging long-term improvements.\n3. Reason (R) directly explains Assertion (A).",
    "Analyzes Bernier's core thesis on crown ownership of land."
))

opts, corr, sol = rotate_options(
    "Montesquieu",
    ["Voltaire", "Jean-Jacques Rousseau", "Thomas Hobbes"],
    "C",
    "1. French philosopher Montesquieu used Bernier's accounts to develop the concept of 'Oriental Despotism', arguing that Asian rulers enjoyed absolute tyranny over subjects who lacked private property.\nHence, Option {{CORR}} is correct.",
    "Identifies Montesquieu formulating Oriental Despotism from Bernier's writing."
)
add_q(make_question(CHAPTER, "Influence of Bernier's Ideas", "Which prominent 18th-century French Enlightenment philosopher used Francois Bernier's travel accounts to formulate the theory of 'Oriental Despotism'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Tarababad",
    ["Chandni Chowk", "Meena Bazar", "Johari Bazar"],
    "B",
    "1. Ibn Battuta was amazed by Tarababad, a dedicated marketplace for male and female singers in Daulatabad, which featured elaborately decorated shops and swings for singers.\nHence, Option {{CORR}} is correct.",
    "Identifies Tarababad as Daulatabad's market for singers."
)
add_q(make_question(CHAPTER, "Medieval Urban Culture", "What was the name of the grand marketplace in Daulatabad described by Ibn Battuta as being exclusively dedicated to male and female singers and entertainers?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ancient Persia",
    ["Ancient Greece", "The Roman Empire", "Pharaonic Egypt"],
    "D",
    "1. Al-Biruni tried to explain the Indian caste system by comparing it to ancient Persia, which was divided into four categories: knights and princes; monks and priests; lawyers and physicians; and peasants and artisans.\nHence, Option {{CORR}} is correct.",
    "Identifies Ancient Persia as Al-Biruni's comparative social model."
)
add_q(make_question(CHAPTER, "Al-Biruni on Social Divisions", "To which ancient civilization's four-fold social hierarchy did Al-Biruni compare the Indian varna system to show that social divisions were not unique to India?", opts, corr, sol))

add_q(make_sequence_question(
    CHAPTER, "Ibn Battuta's Itinerary",
    "Arrange the following key stages of Ibn Battuta's travels in the correct chronological order:\nI. Departure from his hometown Tangier and pilgrimage to Mecca\nII. Appointment as Qazi of Delhi under Muhammad bin Tughlaq\nIII. Travel to China as Sultan's envoy via the Maldives and Sumatra\nIV. Return to Morocco and dictation of the Rihla to Ibn Juzayy",
    [
        ("A", "I"),
        ("B", "II"),
        ("C", "III"),
        ("D", "IV")
    ],
    "A, B, C, D",
    "A",
    "1. Chronological order: Leaves Tangier in 1325 and visits Mecca (I), reaches Delhi in 1333 to serve as Qazi (II), sent to China in 1342 via Maldives/Sumatra (III), returns to Morocco in 1354 and dictates Rihla to Ibn Juzayy (IV).",
    "Orders stages of Ibn Battuta's global journey chronologically."
))

add_q(make_match_question(
    CHAPTER, "17th-Century Travellers",
    "Match the 17th-century European traveller in List I with their background or profession in List II:",
    [
        ("A", "Francois Bernier"),
        ("B", "Jean-Baptiste Tavernier"),
        ("C", "Niccolao Manucci"),
        ("D", "Roberto Nobili")
    ],
    [
        ("i", "French jeweller who made six voyages to India"),
        ("ii", "French physician and intellectual attached to the Mughal court"),
        ("iii", "Italian physician who settled permanently in India and wrote Storia do Mogor"),
        ("iv", "Jesuit missionary who lived in South India and adopted Indian customs")
    ],
    "A-ii, B-i, C-iii, D-iv",
    "D",
    "1. Bernier = French physician (A-ii), Tavernier = French jeweller (B-i), Manucci = Italian physician (C-iii), Roberto Nobili = Jesuit missionary (D-iv).",
    "Matches 17th-century travellers with their backgrounds."
))

opts, corr, sol = rotate_options(
    "Danishmand Khan",
    ["Mir Jumla", "Asad Khan", "Shaista Khan"],
    "B",
    "1. In Mughal India, Francois Bernier was closely associated with Danishmand Khan, an Armenian/Persian intellectual noble who was fascinated by Western scientific discoveries and translations.\nHence, Option {{CORR}} is correct.",
    "Identifies Danishmand Khan as Bernier's patron."
)
add_q(make_question(CHAPTER, "Bernier's Patronage", "Which prominent Mughal court noble and intellectual patronized Francois Bernier, engaging with him to translate works of William Harvey and Rene Descartes into Persian?", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Bernier on Mughal Cities",
    "Bernier described Mughal cities as 'camp towns', meaning cities that owed their existence and survival entirely to the presence of the imperial court.",
    "Bernier claimed that once the Mughal court moved away, these camp towns rapidly declined and lost all economic and demographic viability.",
    1,
    "A",
    "1. Statement I is correct: Bernier characterized Mughal towns as 'camp towns', suggesting they were dependent on the imperial camp.\n2. Statement II is correct: He believed they flourished when the court arrived and fell into decay when the emperor moved.",
    "Assesses Bernier's concept of camp towns in Mughal India."
))

add_q(make_assertion_question(
    CHAPTER, "Postal Foot-Post Efficiency",
    "According to Ibn Battuta, news from Sindh reached Sultan Muhammad bin Tughlaq in Delhi in just five days via the postal system.",
    "The foot-post (dawa) was exceptionally swift because runners stationed at every third of a mile sprinted at top speed holding a rod with copper bells to warn the next runner.",
    1,
    "C",
    "1. Assertion (A) is true: The journey from Sindh to Delhi usually took 50 days, but news via the postal runners reached the Sultan in just 5 days.\n2. Reason (R) is true: Ibn Battuta noted that foot-post runners carried rods with ringing copper bells, allowing seamless handover at top sprint.\n3. Reason (R) correctly explains Assertion (A).",
    "Evaluates the speed and mechanism of the medieval foot-post system."
))

opts, corr, sol = rotate_options(
    "Asiatic Mode of Production",
    ["Feudal Mode of Production", "Capitalist Accumulation", "Mercantile Monopoly"],
    "A",
    "1. Karl Marx built upon Bernier's idea of the king owning all land and self-sufficient village communities to conceptualize the 'Asiatic Mode of Production'.\nHence, Option {{CORR}} is correct.",
    "Identifies Karl Marx's Asiatic Mode of Production."
)
add_q(make_question(CHAPTER, "Marxist Historiography", "Which theoretical concept did Karl Marx develop in the 19th century, drawing directly upon Francois Bernier's thesis of crown ownership of land and autonomous village republics?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Antyaja",
    ["Dasa", "Mlechchha", "Chandalas"],
    "C",
    "1. Al-Biruni noted the existence of people outside the four varnas called 'Antyaja' (literally born outside), who performed inexpensive labour for communities yet suffered severe social ostracism.\nHence, Option {{CORR}} is correct.",
    "Identifies Antyaja in Al-Biruni's Kitab-ul-Hind."
)
add_q(make_question(CHAPTER, "Al-Biruni on Social Exclusions", "What specific term did Al-Biruni use in Kitab-ul-Hind to describe social groups positioned outside the four-fold varna system who performed essential service tasks for society?", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Structure of Kitab-ul-Hind",
    "Each of the 80 chapters of Kitab-ul-Hind typically begins with a question, followed by a detailed description based on Sanskrit traditions, and concludes with a cross-cultural comparison.",
    "Al-Biruni composed Kitab-ul-Hind entirely in Classical Persian for the courtiers of Mahmud of Ghazni.",
    3,
    "B",
    "1. Statement I is correct: Al-Biruni employed a geometric, systematic layout: opening with a question, providing Sanskrit citations/descriptions, and concluding with comparisons.\n2. Statement II is incorrect: Kitab-ul-Hind was written in Arabic, known for its simple and lucid prose, not Classical Persian.",
    "Analyzes the structure and original language of Kitab-ul-Hind."
))

opts, corr, sol = rotate_options(
    "Peter Mundy",
    ["Ralph Fitch", "William Hawkins", "Thomas Roe"],
    "B",
    "1. English traveller Peter Mundy visited India in the early 1630s and recorded harrowing eyewitness accounts of the catastrophic famine that struck Gujarat and the Deccan in 1630–32.\nHence, Option {{CORR}} is correct.",
    "Identifies Peter Mundy's famine accounts."
)
add_q(make_question(CHAPTER, "European Travellers and Famine", "Which 17th-century English traveller provided vivid and grim eyewitness descriptions of the devastating famine of 1630–32 that struck the Deccan and Gujarat provinces under Mughal rule?", opts, corr, sol))

add_q(make_match_question(
    CHAPTER, "Urban Economic Institutions",
    "Match the mercantile term from medieval and early modern India in List I with its description in List II:",
    [
        ("A", "Nagarsheth"),
        ("B", "Mahajan"),
        ("C", "Karkhana"),
        ("D", "Sarraf")
    ],
    [
        ("i", "Corporate body or guild of merchants in urban centres"),
        ("ii", "Supreme head or chief of all merchant communities in a city"),
        ("iii", "State workshop where skilled artisans produced luxury goods for the court"),
        ("iv", "Money-changer and banker facilitating currency exchange and credit (hundi)")
    ],
    "A-ii, B-i, C-iii, D-iv",
    "C",
    "1. Nagarsheth = Chief of merchant community (A-ii), Mahajan = Guild/body of merchants (B-i), Karkhana = Royal workshop (C-iii), Sarraf = Money-changer/banker (D-iv).",
    "Matches mercantile terms with their functions."
))
opts, corr, sol = rotate_options(
    "Duarte Barbosa",
    ["Vasco da Gama", "Afonso de Albuquerque", "Domingo Paes"],
    "A",
    "1. Duarte Barbosa was a Portuguese official and writer who visited South India in the early 16th century and wrote a detailed narrative of trade, customs, and ports along the Malabar coast.\nHence, Option {{CORR}} is correct.",
    "Identifies Duarte Barbosa's account of South Indian trade."
)
add_q(make_question(CHAPTER, "Portuguese Accounts", "Which Portuguese writer travelled to South India in the early sixteenth century and provided an extensive documentation of Indian customs, caste relations, and Malabar maritime trade?", opts, corr, sol))

add_q(make_assertion_question(
    CHAPTER, "Slaves in Delhi Sultanate",
    "According to Ibn Battuta, female slaves were employed by Sultan Muhammad bin Tughlaq not only for domestic service but also for state surveillance.",
    "The Sultan deployed skilled female slaves as undercover informants to monitor the loyalty, conversations, and intrigues of his nobles.",
    1,
    "A",
    "1. Assertion (A) is true: Ibn Battuta noted that female slaves were gifted, employed in households, and actively used by the Sultan for surveillance.\n2. Reason (R) is true: Ibn Battuta recorded that female slaves acted as spies and kept the Sultan informed of what his amirs and nobles were saying.\n3. Reason (R) correctly explains Assertion (A).",
    "Explains Ibn Battuta's observations on the multifaceted roles of slaves."
))

# Verification of Unit 5
print(f"Total questions generated for Unit 5: {len(questions)}")
assert len(questions) == 60, f"Expected 60 questions, got {len(questions)}"

out_path = "mock/history_units/unit5.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved 60 questions to {out_path}!")
