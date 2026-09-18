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

CHAPTER = "Colonialism and the Countryside"

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen_texts:
        raise ValueError(f"Duplicate question inside Unit 9: {q['questionText'][:60]}")
    if norm in pyq_set:
        raise ValueError(f"Question matches PYQ: {q['questionText'][:60]}")
    seen_texts.add(norm)
    q["questionNumber"] = len(questions) + 1
    questions.append(q)

print("Generating 60 unique questions for Unit 9: Colonialism and the Countryside...")

# --- 1. Permanent Settlement in Bengal ---

opts, corr, sol = rotate_options(
    "Lord Charles Cornwallis in 1793",
    ["Warren Hastings in 1773", "Lord Wellesley in 1798", "Lord William Bentinck in 1828"],
    "A",
    "1. The Permanent Settlement of land revenue in Bengal was introduced in 1793 under the governor-generalship of Lord Charles Cornwallis.\nHence, Option {{CORR}} is correct.",
    "Identifies Cornwallis introducing Permanent Settlement in 1793."
)
add_q(make_question(CHAPTER, "Permanent Settlement", "Under which Governor General was the Permanent Settlement of land revenue introduced in Bengal in 1793?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The revenue demand of the East India Company was permanently fixed in perpetuity and could not be enhanced in future",
    ["The revenue was reassessed every ten years based on crop yield", "The revenue was paid directly by individual cultivators to British district collectors", "The revenue was eliminated completely for all tea and indigo plantations"],
    "B",
    "1. Under the Permanent Settlement, the state's revenue demand was fixed in perpetuity, giving zamindars hereditary ownership of estates as long as they paid the fixed sum.\nHence, Option {{CORR}} is correct.",
    "Explains the defining feature of Permanent Settlement."
)
add_q(make_question(CHAPTER, "Permanent Settlement Features", "What was the defining economic feature of the Permanent Settlement introduced in Bengal?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sunset Law",
    ["Limitation Law", "Cornwallis Code", "Doctrine of Lapse"],
    "C",
    "1. According to the Sunset Law, if the zamindar failed to clear his revenue installment by sunset of the specified due date, his estate was liable to be auctioned publicly.\nHence, Option {{CORR}} is correct.",
    "Identifies Sunset Law."
)
add_q(make_question(CHAPTER, "Sunset Law", "Which colonial administrative regulation mandated that a zamindar's estate would be auctioned off if the revenue instalment was not paid by sunset of the appointed day?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Raja of Burdwan (Bardhaman)",
    ["Nawab of Murshidabad", "Raja of Darbhanga", "Maharaja of Cooch Behar"],
    "D",
    "1. In 1797, when the Raja of Burdwan defaulted on revenue, his vast estates (mehal) were put up for public auction, though his agents repurchased them through fictitious bidding.\nHence, Option {{CORR}} is correct.",
    "Identifies Raja of Burdwan's auction in 1797."
)
add_q(make_question(CHAPTER, "Zamindari Defaults", "The public auction of whose massive estates in Bengal in 1797 became a celebrated historical example of fictitious bidding and zamindari survival strategies?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Purchased the estates through secret agents and benami transactions, then refused to pay the bid money to force re-auctions at lower prices",
    ["Surrendered their weapons and migrated to Burma", "Joined hands with French privateers in the Bay of Bengal", "Assassinated all British district magistrates in Bengal"],
    "A",
    "1. Zamindars used benami transactions: their own servants and amlahs bid for estates, failed to deposit money, and forced repeated auctions until the estate was bought back cheaply.\nHence, Option {{CORR}} is correct.",
    "Explains benami fictitious auctions."
)
add_q(make_question(CHAPTER, "Zamindari Survival Strategies", "How did defaulting zamindars like the Raja of Burdwan cleverly manipulate public auctions to retain control of their auctioned estates?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "They transferred estates into the names of their mothers, because Company law forbade the seizure of women's property",
    ["They converted to Christianity to gain legal immunity", "They moved their legal headquarters to Dutch Chinsurah", "They destroyed all land registers in the district courts"],
    "B",
    "1. The Raja of Burdwan transferred large parts of his zamindari to his mother, knowing that the East India Company had decreed that women's property could not be attached for revenue defaults.\nHence, Option {{CORR}} is correct.",
    "Explains property transfer to female relatives."
)
add_q(make_question(CHAPTER, "Zamindari Survival Strategies", "What ingenious legal loophole was utilized by the Raja of Burdwan to protect large parts of his estate from being seized by the British government?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Lathyals",
    ["Santhals", "Barkandazes", "Paiks"],
    "C",
    "1. Zamindars maintained retinues of club-men or muscle-men armed with bamboo sticks known as 'lathyals' to intimidate outside auction purchasers and rebellious ryots.\nHence, Option {{CORR}} is correct.",
    "Identifies lathyals as club-men of zamindars."
)
add_q(make_question(CHAPTER, "Rural Coercion", "What were the armed club-men hired by Bengali zamindars to physically attack outside purchasers and enforce rural authority called?", opts, corr, sol))

# --- 2. Rise of Jotedars ---

opts, corr, sol = rotate_options(
    "Jotedars (or haoladars, gantidars, mandals)",
    ["Amils", "Talukdars", "Paharias"],
    "D",
    "1. In northern Bengal, wealthy peasants who owned large lands, lent money, controlled the grain trade, and directly commanded the village community were known as Jotedars.\nHence, Option {{CORR}} is correct.",
    "Identifies Jotedars as wealthy village oligarchs."
)
add_q(make_question(CHAPTER, "The Rise of Jotedars", "What was the name given to the class of affluent, landowning rich peasants who emerged as powerful rural oligarchs in northern Bengal, undermining the traditional zamindars?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Jotedars lived directly in the villages where their economic and personal influence over ryots was far more direct and pervasive than absent zamindars",
    ["Jotedars possessed private artillery regiments supplied by the French", "Jotedars were appointed directly by the British Parliament", "Jotedars were exempt from all taxes under the Cornwallis Code"],
    "A",
    "1. Unlike zamindars who often lived in urban mansions, jotedars resided directly in the villages, practicing moneylending, controlling local markets, and exercising direct sway over poor sharecroppers (adhiyars/bargadars).\nHence, Option {{CORR}} is correct.",
    "Explains the rural power base of Jotedars."
)
add_q(make_question(CHAPTER, "Power of Jotedars", "Why was the local power and influence of Jotedars often more formidable and immediate in the Bengal countryside than that of the big zamindars?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sharecroppers who cultivated the jotedars' lands, delivering half the harvested crop to the jotedar",
    ["Hereditary British revenue surveyors", "Armed guards at the collectorate", "Indigo factory owners"],
    "B",
    "1. Adhiyars or bargadars were poor sharecroppers who provided labour and farming implements, handing over half of the agricultural produce to the jotedar.\nHence, Option {{CORR}} is correct.",
    "Defines adhiyars and bargadars."
)
add_q(make_question(CHAPTER, "Rural Labour", "Who were the 'adhiyars' or 'bargadars' who cultivated the vast landholdings owned by the Jotedars in northern Bengal?", opts, corr, sol))

# --- 3. The Fifth Report ---

opts, corr, sol = rotate_options(
    "Fifth Report submitted to the British Parliament in 1813",
    ["Cornwallis Minutes of 1793", "Macaulay's Minute of 1835", "Hunter Commission Report of 1882"],
    "C",
    "1. The Fifth Report was submitted to the British Parliament in 1813 by a Select Committee, running to 1,002 pages detailing the administration and revenue conditions of Bengal.\nHence, Option {{CORR}} is correct.",
    "Identifies the Fifth Report of 1813."
)
add_q(make_question(CHAPTER, "Colonial Reports", "Which monumental 1,002-page report on the East India Company's revenue and judicial administration in Bengal was submitted to the British Parliament in 1813?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Rival British merchants and politicians who sought to revoke the East India Company's monopoly over Indian trade",
    ["The Mughal Emperor Bahadur Shah Zafar", "The French East India Company at Pondicherry", "Bengali peasants petitioning against zamindars"],
    "D",
    "1. British merchant lobbies and parliamentary groups hostile to the East India Company's trading monopoly commissioned and utilized the Fifth Report to highlight corruption and misrule.\nHence, Option {{CORR}} is correct.",
    "Explains political motivations behind the Fifth Report."
)
add_q(make_question(CHAPTER, "The Fifth Report", "Which group in Britain actively used the critical evidence compiled in the Fifth Report to challenge the East India Company's exclusive commercial monopoly?", opts, corr, sol))

# --- 4. The Hoe and the Plough: Rajmahal Hills & Francis Buchanan ---

opts, corr, sol = rotate_options(
    "Francis Buchanan (later Buchanan-Hamilton)",
    ["Colin Mackenzie", "Augustus Cleveland", "William Hodges"],
    "A",
    "1. Francis Buchanan was a Scottish physician, botanist, and surveyor employed by the East India Company who conducted extensive surveys of the Rajmahal hills and eastern India in the early 19th century.\nHence, Option {{CORR}} is correct.",
    "Identifies Francis Buchanan's surveys."
)
add_q(make_question(CHAPTER, "Colonial Surveys", "Which Scottish surgeon and naturalist travelled extensively through the Rajmahal hills in the early 19th century, keeping meticulous diaries on land and natural resources?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Shifting cultivation (jhum) using the hoe and gathering forest produce",
    ["Intensive wet-rice paddy cultivation using iron ploughs", "Maritime fishing and deep-sea pearl diving", "Industrial coal mining and iron smelting"],
    "B",
    "1. The Paharias practiced shifting agriculture (jhum) using the hoe, scratching patches of cleared forest land, and depended heavily on forest products like mahua, resin, and charcoal.\nHence, Option {{CORR}} is correct.",
    "Describes Paharia subsistence and use of the hoe."
)
add_q(make_question(CHAPTER, "The Paharias", "What was the traditional mode of agricultural livelihood and environmental subsistence practiced by the Paharia community in the Rajmahal hills?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Augustus Cleveland",
    ["Francis Buchanan", "Charles Cornwallis", "Thomas Munro"],
    "C",
    "1. In the 1780s, Augustus Cleveland, Collector of Bhagalpur, initiated a policy of pacification, providing annual allowances to Paharia chiefs in return for maintaining peace.\nHence, Option {{CORR}} is correct.",
    "Identifies Augustus Cleveland's pacification policy."
)
add_q(make_question(CHAPTER, "Paharia Pacification", "Which Collector of Bhagalpur proposed a policy of pacification in the 1780s, granting annual stipends to Paharia chiefs to ensure their cooperation?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Hoe",
    ["Plough", "Sickle", "Sword"],
    "D",
    "1. Historians use the 'hoe' as the symbol of the Paharias' shifting hill cultivation, in contrast to the 'plough' which symbolized the settled agriculture of the Santhals.\nHence, Option {{CORR}} is correct.",
    "Identifies the hoe as the symbol of Paharias."
)
add_q(make_question(CHAPTER, "Hoe and Plough", "Which agricultural implement was used by historical chroniclers as the defining symbol of the Paharias' shifting cultivation and hill identity?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Plough",
    ["Hoe", "Bow and Arrow", "Spade"],
    "A",
    "1. The plough symbolized the settled, commercial agrarian lifestyle brought into the Rajmahal foothills by the newly arriving Santhal settlers.\nHence, Option {{CORR}} is correct.",
    "Identifies the plough as symbol of Santhals."
)
add_q(make_question(CHAPTER, "Hoe and Plough", "Which implement stood as the powerful historical symbol of the settled agricultural frontier introduced by the Santhals?", opts, corr, sol))

# --- 5. The Santhals and Damin-i-Koh ---

opts, corr, sol = rotate_options(
    "Damin-i-Koh",
    ["Jangal Mahal", "Chota Nagpur", "Santhal Pargana"],
    "B",
    "1. In 1832, a large area of land in the foothills of Rajmahal was demarcated, fenced with pillars, and designated as 'Damin-i-Koh' (skirt of the hills) for Santhal settlement.\nHence, Option {{CORR}} is correct.",
    "Identifies Damin-i-Koh demarcated in 1832."
)
add_q(make_question(CHAPTER, "Santhal Settlement", "What was the official name of the demarcated tract of forested foothill land in Rajmahal designated by the British in 1832 for permanent Santhal settlement?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sidhu and Kanhu Santhal in 1855–56",
    ["Birsa Munda in 1899", "Tilka Manjhi in 1785", "Alluri Sitarama Raju in 1922"],
    "C",
    "1. The Santhal Hool (Rebellion) of 1855–56 was led by the charismatic brothers Sidhu and Kanhu against oppressive dikus (moneylenders) and British revenue officials.\nHence, Option {{CORR}} is correct.",
    "Identifies Sidhu and Kanhu leading Santhal rebellion in 1855-56."
)
add_q(make_question(CHAPTER, "Santhal Rebellion", "Who were the two brothers who led the massive Santhal rebellion (Hool) against colonial officials and exploitative moneylenders in 1855–56?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Dikus",
    ["Jotedars", "Paharias", "Sahukars"],
    "D",
    "1. The Santhals applied the derogatory term 'Diku' to outsiders—traders, moneylenders, and landlords from the plains—who seized their cleared lands through debt traps.\nHence, Option {{CORR}} is correct.",
    "Defines Dikus as exploitative outsiders."
)
add_q(make_question(CHAPTER, "Santhal Insurgency", "What term was used by the Santhals to describe exploitative outsiders, particularly grasping moneylenders and merchants from the plains?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Creation of a separate administrative district called the Santhal Parganas",
    ["Immediate expulsion of all Santhals across the Himalayas", "Reimposition of the Permanent Settlement across the hills", "Abolition of all tribal agricultural reservations"],
    "A",
    "1. To pacify the Santhals after the 1855–56 revolt was crushed, the British created a separate 5,500-square-mile district called the Santhal Pargana with special tribal protective laws.\nHence, Option {{CORR}} is correct.",
    "Identifies creation of Santhal Parganas district."
)
add_q(make_question(CHAPTER, "Post-Revolt Settlement", "What major administrative concession was granted by the colonial state following the suppression of the 1855–56 Santhal rebellion to placate the tribe?", opts, corr, sol))

# --- 6. The Bombay Deccan & Ryotwari System ---

opts, corr, sol = rotate_options(
    "Ryotwari system",
    ["Permanent Settlement", "Mahalwari system", "Malguzari system"],
    "B",
    "1. In the Bombay Deccan and Madras presidencies, the British instituted the Ryotwari system, settling revenue directly with the individual peasant (ryot) rather than zamindars.\nHence, Option {{CORR}} is correct.",
    "Identifies Ryotwari system in Bombay Deccan."
)
add_q(make_question(CHAPTER, "Deccan Revenue Settlement", "Which land revenue system was introduced by the British in the Bombay Deccan, where revenue contracts were settled directly with the individual cultivator?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "David Ricardo",
    ["Adam Smith", "Thomas Malthus", "John Stuart Mill"],
    "C",
    "1. British revenue officials in the 1820s were heavily influenced by David Ricardo's economic theory of rent, believing that the state should claim all surplus agricultural rent.\nHence, Option {{CORR}} is correct.",
    "Identifies David Ricardo influencing Ryotwari revenue design."
)
add_q(make_question(CHAPTER, "Economic Ideology", "Which famous classical British economist's theory of rent strongly influenced colonial administrators when fixing the steep revenue demands in the Bombay Deccan?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Supa in Poona district in May 1875",
    ["Bardoli in Gujarat in 1928", "Champaran in Bihar in 1917", "Chauri Chaura in Gorakhpur in 1922"],
    "D",
    "1. The Deccan agrarian riots erupted on 12 May 1875 at Supa, a market village in Poona district, where ryots attacked moneylenders' shops and burnt debt records.\nHence, Option {{CORR}} is correct.",
    "Identifies Supa as starting point of Deccan Riots 1875."
)
add_q(make_question(CHAPTER, "Deccan Riots", "In which market village of Poona district did the Deccan Riots of 1875 first break out on 12 May 1875?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "They stormed moneylenders' residences to seize and burn the bahi-khatas (debt account books) and loan bonds",
    ["They proclaimed a new independent Maratha Empire", "They destroyed railway stations and telegraph poles", "They demanded the immediate return of the Peshwa to Poona"],
    "A",
    "1. The primary target of the rioting peasants was debt bonds: they systematically attacked sahukars, seized account books (bahi-khatas), and burnt them in public bonfires.\nHence, Option {{CORR}} is correct.",
    "Explains burning of bahi-khatas in Deccan Riots."
)
add_q(make_question(CHAPTER, "Deccan Riots Targets", "What was the principal objective and symbolic action carried out by rebellious ryots during the Deccan Riots of 1875?", opts, corr, sol))

# --- 7. Cotton Boom and Limitation Law ---

opts, corr, sol = rotate_options(
    "Outbreak of the American Civil War in 1861, cutting off American raw cotton supplies to Britain",
    ["Discovery of vast gold reserves in the Western Ghats", "Complete failure of the Chinese silk harvest", "The opening of the Panama Canal"],
    "B",
    "1. When the American Civil War broke out in 1861, raw cotton imports to Britain from the USA collapsed, prompting British mills to look to the Bombay Deccan, triggering a massive cotton boom.\nHence, Option {{CORR}} is correct.",
    "Explains American Civil War triggering cotton boom in 1861."
)
add_q(make_question(CHAPTER, "Cotton Boom", "What international geopolitical event in 1861 sparked an unprecedented speculative cotton boom in the Bombay Deccan?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "End of the American Civil War in 1865, leading to the collapse of international cotton prices and credit withdrawal by moneylenders",
    ["Invasion of Bombay by French naval fleets", "Imposition of heavy income tax on all cotton spinning mills", "Outbreak of the Great Plague of London"],
    "C",
    "1. In 1865, the American Civil War ended, American cotton flooded Britain again, prices plummeted, and sahukars refused further loans and demanded instant repayment from indebted ryots.\nHence, Option {{CORR}} is correct.",
    "Explains post-1865 cotton price crash."
)
add_q(make_question(CHAPTER, "Agrarian Crisis", "What triggered the catastrophic financial collapse and acute agrarian distress in the Bombay countryside after 1865?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Limitation Law of 1859",
    ["Vernacular Press Act of 1878", "Ilbert Bill of 1883", "Deccan Agriculturists' Relief Act of 1879"],
    "D",
    "1. The Limitation Law passed by the British in 1859 stated that loan bonds signed between moneylenders and ryots would have legal validity for only three years.\nHence, Option {{CORR}} is correct.",
    "Identifies Limitation Law of 1859 enforcing 3-year validity."
)
add_q(make_question(CHAPTER, "Colonial Legislation", "Which colonial law enacted in 1859 stipulated that loan bonds signed between moneylenders and borrowers were legally valid for only three years?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Forced ryots to sign completely new bonds every three years, compounding unpaid interest into the new principal debt",
    ["Forgave all pending debts after three years had elapsed", "Surrendered all their gold mortgages to the colonial treasury", "Refused to issue any fresh currency loans to peasants"],
    "A",
    "1. Moneylenders manipulated the Limitation Law by forcing illiterate ryots to execute new bonds every 3 years, rolling overdue interest into the principal and escalating debt traps.\nHence, Option {{CORR}} is correct.",
    "Explains moneylenders manipulating the Limitation Law."
)
add_q(make_question(CHAPTER, "Debt Exploitation", "How did crafty moneylenders in the Deccan evade the restrictions imposed by the Limitation Law of 1859?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The interest charged by a moneylender could never exceed the original principal sum borrowed",
    ["A borrower could never be imprisoned for debt under any circumstances", "Land could never be mortgaged against grain advances", "All cattle belonging to the cultivator were exempt from legal attachment"],
    "B",
    "1. Under customary Hindu law and tradition, the rule of 'damdupat' dictated that total accumulated interest could never exceed the original principal loan.\nHence, Option {{CORR}} is correct.",
    "Explains customary rule of damdupat."
)
add_q(make_question(CHAPTER, "Customary Norms", "What was the long-standing customary socio-economic norm of 'damdupat' that sahukars brazenly violated in the 19th-century Deccan?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Deccan Riots Commission Report presented to the British Parliament in 1878",
    ["Fifth Report of 1813", "Strachey Commission Report of 1880", "Welby Commission Report of 1895"],
    "C",
    "1. The inquiry instituted by the government of Bombay into the peasant uprisings produced the celebrated 'Deccan Riots Commission Report', presented to Parliament in 1878.\nHence, Option {{CORR}} is correct.",
    "Identifies Deccan Riots Commission Report of 1878."
)
add_q(make_question(CHAPTER, "Official Commissions", "Which comprehensive official investigative report on agrarian unrest in western India was presented to the British Parliament in 1878?", opts, corr, sol))

# --- 8. Statement & Assertion Questions ---

add_q(make_statement_question(
    CHAPTER, "Permanent Settlement Intentions",
    "The British introduced the Permanent Settlement hoping to create a loyal class of improving landed proprietors similar to English country squires.",
    "The Permanent Settlement immediately produced rapid agrarian investment, technological modernisation, and universal peasant prosperity across Bengal.",
    3,
    "A",
    "1. Statement I is correct: British officials hoped zamindars would become enterprising landlords who would invest capital in soil improvements.\n2. Statement II is incorrect: High revenue assessments, absenteeism, and peasant impoverishment prevented agricultural modernization.",
    "Analyzes British ideological intentions versus realities of the Permanent Settlement."
))

add_q(make_statement_question(
    CHAPTER, "Buchanan's Survey Perspective",
    "Francis Buchanan observed the Indian landscape and natural resources primarily through the commercial lens of the East India Company.",
    "Buchanan assessed forests, minerals, and hills in terms of how they could be transformed into taxable agricultural land and profitable raw materials.",
    1,
    "A",
    "1. Statement I is correct: Buchanan travelled as an imperial agent recording resources for British commerce.\n2. Statement II is correct: He assessed forests and minerals for imperial economic exploitation.\nHence, Both Statement I and Statement II are correct.",
    "Assesses Francis Buchanan's utilitarian and imperial gaze."
))

add_q(make_assertion_question(
    CHAPTER, "Paharias and the British Frontier",
    "The British came to view the Paharias of the Rajmahal hills as turbulent, unruly savages who needed to be subdued and civilised.",
    "The British associated settled agriculture with order, peace, and regular tax revenue, viewing forest dwellers as inherently ungovernable.",
    1,
    "A",
    "1. Assertion (A) is true: British administrators regarded shifting cultivators as wild and lawless.\n2. Reason (R) is true: Colonial ideology equated settled plough agriculture with civilization and state revenue extraction.\n3. Reason (R) directly explains Assertion (A).",
    "Explains colonial prejudice against forest shifting cultivators."
))

add_q(make_assertion_question(
    CHAPTER, "Deccan Peasant Resentment",
    "In the Deccan Riots of 1875, peasants directed their fury against the moneylenders (sahukars) rather than the colonial state or its police.",
    "Peasants felt that the sahukars had violated customary moral norms by charging exorbitant compound interest and refusing traditional credit flexibility.",
    1,
    "A",
    "1. Assertion (A) is true: The ryots specifically attacked moneylenders' residences and bonds, avoiding attacks on government buildings.\n2. Reason (R) is true: Peasants felt a profound moral outrage that sahukars had breached the customary ethic of fair interest and community reciprocity.\n3. Reason (R) directly explains Assertion (A).",
    "Analyzes the moral economy behind the Deccan Riots."
))

# --- 9. Match and Sequence Questions ---

add_q(make_match_question(
    CHAPTER, "Colonial Regions and Revenue Settlements",
    "Match the revenue settlement or system in List I with its primary region of implementation in List II:",
    [
        ("A", "Permanent Settlement"),
        ("B", "Ryotwari Settlement"),
        ("C", "Damin-i-Koh"),
        ("D", "Mahalwari Settlement")
    ],
    [
        ("i", "Bombay Deccan and Madras Presidency"),
        ("ii", "Bengal, Bihar, and Orissa"),
        ("iii", "North-Western Provinces and Punjab"),
        ("iv", "Rajmahal foothills for Santhal settlement")
    ],
    "A-ii, B-i, C-iv, D-iii",
    "B",
    "1. Permanent Settlement = Bengal (A-ii), Ryotwari = Bombay/Madras (B-i), Damin-i-Koh = Rajmahal foothills (C-iv), Mahalwari = NW Provinces/Punjab (D-iii).",
    "Matches revenue systems with geographical regions."
))

add_q(make_match_question(
    CHAPTER, "Historical Actors and Identities",
    "Match the historical group or personality in List I with their description in List II:",
    [
        ("A", "Jotedars"),
        ("B", "Augustus Cleveland"),
        ("C", "Sidhu and Kanhu"),
        ("D", "Lathyals")
    ],
    [
        ("i", "Armed retainers hired by zamindars to enforce rural dominance"),
        ("ii", "Rich landowning peasants in northern Bengal"),
        ("iii", "Collector of Bhagalpur who pacified the Paharias"),
        ("iv", "Brothers who led the Santhal rebellion of 1855–56")
    ],
    "A-ii, B-iii, C-iv, D-i",
    "C",
    "1. Jotedars = Rich peasants (A-ii), Cleveland = Pacified Paharias (B-iii), Sidhu & Kanhu = Santhal rebellion (C-iv), Lathyals = Armed retainers (D-i).",
    "Matches agrarian personalities and groups with descriptions."
))

add_q(make_sequence_question(
    CHAPTER, "Chronology of Colonial Agrarian Policies",
    "Arrange the following agrarian developments in colonial India in chronological order:\nI. Introduction of the Permanent Settlement in Bengal\nII. Demarcation of Damin-i-Koh for Santhal settlement\nIII. Outbreak of the Santhal Rebellion (Hool)\nIV. Deccan Riots in Poona and Ahmadnagar districts",
    [
        ("A", "I"),
        ("B", "II"),
        ("C", "III"),
        ("D", "IV")
    ],
    "A, B, C, D",
    "A",
    "1. Chronology: Permanent Settlement (1793) -> Damin-i-Koh created (1832) -> Santhal Rebellion (1855-56) -> Deccan Riots (1875).",
    "Orders landmark colonial agrarian events chronologically."
))

add_q(make_sequence_question(
    CHAPTER, "Deccan Agrarian Crisis Timeline",
    "Arrange the sequence of events leading up to the Deccan Riots in chronological order:\nI. Limitation Law passed by the British\nII. American Civil War breaks out, causing cotton boom in India\nIII. End of American Civil War leading to crash in cotton prices\nIV. Outbreak of peasant riots at Supa in Poona district",
    [
        ("A", "I"),
        ("B", "II"),
        ("C", "III"),
        ("D", "IV")
    ],
    "A, B, C, D",
    "A",
    "1. Chronology: Limitation Law passed (1859) -> American Civil War begins (1861) -> Civil War ends (1865) -> Deccan Riots at Supa (1875).",
    "Orders the sequence of the Deccan cotton cycle and unrest."
))

# --- 10. Additional Detailed Questions to Reach 60 ---

opts, corr, sol = rotate_options(
    "Gantidars, haoladars, and mandals",
    ["Sirdars, subahdars, and mansabdars", "Amils, patwaris, and muqaddams", "Zamindars, jagirdars, and inamdars"],
    "A",
    "1. Depending on the district in Bengal, rich jotedars were also locally known as gantidars, haoladars, or mandals.\nHence, Option {{CORR}} is correct.",
    "Identifies local regional synonyms for Jotedars."
)
add_q(make_question(CHAPTER, "Regional Jotedar Terminology", "By what other regional titles were the wealthy jotedars known in different districts of northern Bengal?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Amlah and Gomasta",
    ["Kotwal and Thanadar", "Qazi and Mufti", "Diwan and Mir Bakhshi"],
    "B",
    "1. The zamindar's revenue-collecting manager who visited villages to demand rents was known as the 'amlah' or 'gomasta'.\nHence, Option {{CORR}} is correct.",
    "Identifies amlah and gomasta as zamindar's agents."
)
add_q(make_question(CHAPTER, "Zamindari Bureaucracy", "What official title was held by the zamindar's personal estate manager or agent who toured villages to collect rent instalments?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Deliberately delayed paying revenue to the zamindar to provoke his insolvency and buy up his auctioned lands",
    ["Helped the zamindar recruit mercenaries to attack British garrisons", "Donated their agricultural harvests to pay the zamindar's revenue arrears", "Migrated permanently to Assam to work on tea gardens"],
    "C",
    "1. Jotedars fiercely resisted zamindars: they mobilized ryots to withhold rents, engineered revenue defaults, and then snapped up auctioned zamindari lands.\nHence, Option {{CORR}} is correct.",
    "Explains jotedars undermining zamindars."
)
add_q(make_question(CHAPTER, "Jotedar-Zamindar Rivalry", "How did ambitious jotedars strategically exploit the strict default clauses of the Permanent Settlement to undermine traditional zamindars?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Mahua",
    ["Neem", "Sal", "Peepal"],
    "D",
    "1. The Paharias relied heavily on the Mahua tree, using its flowers for food and brewing liquor, and its seeds for extracting cooking oil.\nHence, Option {{CORR}} is correct.",
    "Identifies Mahua as vital forest tree for Paharias."
)
add_q(make_question(CHAPTER, "Paharia Forest Economy", "Which indigenous forest tree was of paramount survival importance to the Paharias, providing edible sweet flowers for food and seeds for oil?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Santhal Hool",
    ["Ulgulan", "Fituri", "Danya"],
    "A",
    "1. In the Santhali language, the great rebellion of 1855–56 is remembered as the 'Santhal Hool' (literally Santhal uprising/liberation war).\nHence, Option {{CORR}} is correct.",
    "Identifies Hool as Santhal rebellion."
)
add_q(make_question(CHAPTER, "Santhal Terminology", "What traditional term in the Santhali language is applied to the momentous rebellion of 1855–56 against colonial authority?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "William Hodges",
    ["Thomas Daniell", "William Daniell", "James Prinsep"],
    "B",
    "1. British landscape artist William Hodges accompanied Augustus Cleveland to the Rajmahal hills in the early 1780s, producing famous aquatints and romantic paintings of the landscape.\nHence, Option {{CORR}} is correct.",
    "Identifies William Hodges painting Rajmahal hills."
)
add_q(make_question(CHAPTER, "Colonial Visual Art", "Which renowned British landscape painter visited the Rajmahal hills with Augustus Cleveland in 1782, creating influential romantic aquatints of the jungle terrain?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Revenue was reassessed and revised upwards every 30 years after a fresh land survey",
    ["Revenue was fixed permanently in perpetuity just like Bengal", "No land revenue was charged if cotton was cultivated", "Revenue was collected exclusively in silver rupees imported from France"],
    "C",
    "1. Unlike the Permanent Settlement of Bengal, the Ryotwari system in Bombay Deccan was temporary: lands were resurveyed every 30 years and revenue rates were revised upwards.\nHence, Option {{CORR}} is correct.",
    "Explains 30-year revision in Ryotwari."
)
add_q(make_question(CHAPTER, "Ryotwari System Features", "How did the revenue revision policy under the Bombay Deccan Ryotwari system contrast fundamentally with Bengal's Permanent Settlement?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Moneylenders refused to give receipts for payments made by ryots, allowing them to claim that the debt was never repaid",
    ["Moneylenders paid all court fees on behalf of default debtors", "Moneylenders returned the land mortgage deeds immediately upon verbal agreement", "Moneylenders charged zero interest during famine years"],
    "D",
    "1. A recurrent complaint recorded by the Deccan Riots Commission was that moneylenders systematically refused to provide written receipts for grain or cash repayments, entering false debt amounts.\nHence, Option {{CORR}} is correct.",
    "Explains sahukars refusing payment receipts."
)
add_q(make_question(CHAPTER, "Peasant Grievances", "What deceitful practice by sahukars was highlighted by peasants before the Deccan Riots Commission as a primary cause for their hopeless indebtedness?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Deccan Agriculturists' Relief Act of 1879",
    ["Permanent Settlement Act of 1793", "Santhal Parganas Tenancy Act of 1885", "Bengal Tenancy Act of 1885"],
    "A",
    "1. Following the recommendations of the Deccan Riots Commission, the colonial government passed the Deccan Agriculturists' Relief Act in 1879 to protect peasants against imprisonment for debt and excessive interest.\nHence, Option {{CORR}} is correct.",
    "Identifies Deccan Agriculturists' Relief Act of 1879."
)
add_q(make_question(CHAPTER, "Relief Legislation", "Which protective legislative measure was enacted by the British colonial government in 1879 to shield indebted Deccan cultivators from arrest and land alienation?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Cotton Supply Association founded in Manchester in 1857",
    ["East India Company Board of Control", "Royal Agricultural Society of England", "Calcutta Chamber of Commerce"],
    "B",
    "1. British textile manufacturers formed the Cotton Supply Association in Manchester in 1857 to encourage cotton cultivation in India and reduce dependence on American cotton.\nHence, Option {{CORR}} is correct.",
    "Identifies Cotton Supply Association in Manchester."
)
add_q(make_question(CHAPTER, "British Industrial Interests", "Which British commercial body was founded in Manchester in 1857 to actively promote cotton cultivation across the British Empire, especially in India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Cultivators deliberately left lands uncultivated and abandoned their villages, migrating to neighboring princely territories",
    ["Cultivators immediately bought shares in the East India Company", "Cultivators destroyed all canal irrigation embankments", "Cultivators surrendered their cattle voluntarily to the district collector"],
    "C",
    "1. Faced with exorbitant revenue assessments in the 1820s and 1830s, Deccan ryots abandoned their fields en masse and migrated into neighbouring states like the Nizam's dominions.\nHence, Option {{CORR}} is correct.",
    "Describes peasants deserting villages to escape taxation."
)
add_q(make_question(CHAPTER, "Peasant Resistance Strategies", "How did desperate cultivators in the Bombay Deccan frequently react when faced with impossible revenue demands during the agricultural depression of the 1830s?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "They held the land directly from the British state without any intermediary zamindar, but had no proprietary security if they defaulted on revenue",
    ["They were declared absolute hereditary owners with zero tax obligations", "They were legally designated as bonded serfs of the British collectors", "They could sell land only to European merchants"],
    "D",
    "1. Under Ryotwari, the peasant was recognized as the direct landholder paying taxes to the state, but could be evicted summarily whenever the high revenue was not paid.\nHence, Option {{CORR}} is correct.",
    "Explains landholding status under Ryotwari."
)
add_q(make_question(CHAPTER, "Status of the Ryot", "What was the legal status of the 'ryot' under the colonial land settlement introduced in the Bombay Deccan?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A major drought and famine that devastated crop yields and wiped out peasant cattle herds",
    ["A sudden boom in international grain exports", "A massive flood that washed away British collectorates", "A royal visit by the Prince of Wales"],
    "A",
    "1. In 1832–34, a devastating drought struck the western Deccan, decimating over half the cattle and plunging the peasantry into unpayable debt.\nHence, Option {{CORR}} is correct.",
    "Identifies drought of 1832-34 in the Deccan."
)
add_q(make_question(CHAPTER, "Deccan Ecological Crises", "What severe environmental crisis struck the Bombay Deccan in 1832–34, compounding the misery caused by colonial revenue assessments?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Titu Mir",
    ["Haji Shariatullah", "Dudu Miyan", "Sidhu Santhal"],
    "B",
    "1. Titu Mir (Mir Nithar Ali) organized peasant resistance in Bengal in the late 1820s against Hindu zamindars who levied a tax on beards and against British indigo planters, constructing a famous bamboo fort (Banser Kella).\nHence, Option {{CORR}} is correct.",
    "Identifies Titu Mir leading peasant resistance."
)
add_q(make_question(CHAPTER, "Bengal Agrarian Resistance", "Which charismatic peasant leader built a famous bamboo fort (Banser Kella) in 1831 to resist the illegal cesses of local zamindars and British indigo planters in Bengal?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kallars and Maravars",
    ["Paharias and Santhals", "Bhil and Koli", "Munda and Oraon"],
    "C",
    "1. In western India, British pacification campaigns in the early 19th century targeted hill and forest tribes like the Bhils and Kolis who resisted colonial forest laws.\nHence, Option {{CORR}} is correct.",
    "Identifies Bhils and Kolis in western India."
)
add_q(make_question(CHAPTER, "Western Tribal Resistance", "Which two prominent hill and forest communities of western India mounted protracted resistance against British colonial expansion and forest reservations in the early 19th century?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Marwaris and Gujaratis",
    ["Chettiars and Komatis", "Parsis and Armenians", "Bohras and Memons"],
    "D",
    "1. In the Bombay Deccan, the moneylenders (sahukars) against whom peasant fury erupted during the 1875 riots were predominantly immigrant Marwari and Gujarati sahukars.\nHence, Option {{CORR}} is correct.",
    "Identifies Marwari and Gujarati moneylenders in Deccan."
)
add_q(make_question(CHAPTER, "Moneylending Communities", "From which two immigrant mercantile communities did the prominent sahukars in the Bombay Deccan rural cotton belt primarily hail?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Cornwallis Code of 1793",
    ["Indian Penal Code of 1860", "Civil Procedure Code of 1859", "Charter Act of 1833"],
    "A",
    "1. The Cornwallis Code of 1793 laid down detailed judicial and administrative regulations governing the Permanent Settlement and separating revenue administration from judicial authority.\nHence, Option {{CORR}} is correct.",
    "Identifies Cornwallis Code of 1793."
)
add_q(make_question(CHAPTER, "Colonial Legal Framework", "What comprehensive legal code enacted in 1793 separated revenue collection from judicial administration across the Bengal Presidency?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The initial revenue demand fixed in 1793 was excessively high because the British feared they could never increase it later",
    ["The peasants were forbidden from selling crops in local markets", "The zamindars were forced to build stone roads at their personal expense", "The French invaded Bengal and looted all zamindari grain stores"],
    "B",
    "1. British administrators deliberately fixed the 1793 revenue at an exceptionally high rate, fearing that since it was permanent, the Company would lose out on future price rises.\nHence, Option {{CORR}} is correct.",
    "Explains reasons for initial zamindari defaults under Permanent Settlement."
)
add_q(make_question(CHAPTER, "Permanent Settlement Flaws", "Why was the initial revenue demand of the Permanent Settlement in 1793 set at such an extraordinarily burdensome pitch that over 75 percent of zamindaris defaulted?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Buchanan-Hamilton",
    ["Menzies-Campbell", "Macaulay-Trevelyan", "Elphinstone-Jackson"],
    "C",
    "1. Francis Buchanan later adopted the surname 'Hamilton' upon inheriting his mother's family estate, and is frequently referred to as Buchanan-Hamilton in historical literature.\nHence, Option {{CORR}} is correct.",
    "Identifies Buchanan adopting the name Hamilton."
)
add_q(make_question(CHAPTER, "Colonial Surveyors", "By what dual surname was the colonial surveyor and naturalist Francis Buchanan known in later historical and scientific records after inheriting his maternal estate?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Signing blank paper bonds (khatas) where the moneylender later wrote arbitrary figures",
    ["Surrendering their ancestral temple icons to the collector", "Pledging to pay taxes directly to the Queen in London", "Trading their draft bullocks for British rifles"],
    "D",
    "1. A pervasive peasant complaint in the Deccan Riots Commission report was that illiterate ryots were pressured into signing or placing thumb-impressions on blank bond papers, in which moneylenders later filled fictitious inflated sums.\nHence, Option {{CORR}} is correct.",
    "Describes ryots tricked into signing blank bonds."
)
add_q(make_question(CHAPTER, "Moneylender Exploitation", "What fraudulent practice involving loan documentation was widespread in the Bombay Deccan, leaving illiterate ryots at the absolute mercy of sahukars?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Village headman (Patel)",
    ["District Collector", "Provincial Subahdar", "Court Amin"],
    "A",
    "1. In the Bombay Deccan, the village headman (Patel) traditionally played a central leadership role in organizing community petitions and leading peasant solidarity against outside sahukars.\nHence, Option {{CORR}} is correct.",
    "Identifies village Patel as traditional leader in Deccan."
)
add_q(make_question(CHAPTER, "Deccan Village Leadership", "What traditional village leadership office in the Bombay Deccan, held by prominent local cultivators, frequently helped coordinate rural resistance against grasping sahukars?", opts, corr, sol))

# Verification of Unit 9
print(f"Total questions generated for Unit 9: {len(questions)}")
assert len(questions) == 60, f"Expected 60 questions, got {len(questions)}"

out_path = "mock/history_units/unit9.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved 60 questions to {out_path}!")
