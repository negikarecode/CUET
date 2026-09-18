import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.pol_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, make_multi_statement_question,
    rotate_options, normalize_text, get_pyq_normalized_set
)

pyq_seen = get_pyq_normalized_set()
global_seen = set()

# Load already generated units to prevent any duplicate
for u in [1, 2]:
    p = f"mock/pol_units/unit{u}.json"
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            for item in json.load(f):
                global_seen.add(normalize_text(item.get("questionText", "")))

print(f"Loaded {len(global_seen)} questions from previous units into global_seen.")

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
# UNIT 3: Contemporary South Asia (60 Questions)
# =================================================================================================
CHAPTER_U3 = "Contemporary South Asia"
u3_qs = []
u3_seen = set()

def add_u3(q):
    u3_qs.append(q)

opts, c, s = rotate_options(
    "Indus Waters Treaty (1960)",
    ["Tashkent Agreement (1966)", "Simla Agreement (1972)", "Lahore Declaration (1999)"],
    "A",
    "The Indus Waters Treaty was signed in Karachi on 19 September 1960 by Prime Minister Jawaharlal Nehru and President Ayub Khan with the World Bank acting as mediator and signatory.\nHence, Option {{CORR}} is correct.",
    "Identifies Indus Waters Treaty brokered by World Bank in 1960."
)
add_u3(make_question(CHAPTER_U3, "India-Pakistan Water Treaties", "Which historic water-sharing treaty between India and Pakistan was brokered by the World Bank and signed in September 1960?", opts, c, s))

opts, c, s = rotate_options(
    "1985 in Dhaka, Bangladesh",
    ["1971 in New Delhi, India", "1991 in Colombo, Sri Lanka", "1999 in Islamabad, Pakistan"],
    "B",
    "The South Asian Association for Regional Cooperation (SAARC) was formally founded on 8 December 1985 in Dhaka at its inaugural summit meeting.\nHence, Option {{CORR}} is correct.",
    "Identifies 1985 and Dhaka as founding year and place of SAARC."
)
add_u3(make_question(CHAPTER_U3, "SAARC Founding", "In which year and city was the South Asian Association for Regional Cooperation (SAARC) formally established?", opts, c, s))

opts, c, s = rotate_options(
    "Liberation Tigers of Tamil Eelam (LTTE)",
    ["Tamil National Alliance (TNA)", "Sinhala Maha Sabha", "Janatha Vimukthi Peramuna (JVP)"],
    "C",
    "The LTTE was founded in 1976 under the leadership of Velupillai Prabhakaran to demand an independent state ('Tamil Eelam') for Sri Lankan Tamils.\nHence, Option {{CORR}} is correct.",
    "Identifies LTTE as militant Tamil separatist organisation in Sri Lanka."
)
add_u3(make_question(CHAPTER_U3, "Sri Lanka Conflict", "Which militant organisation led an armed struggle against the Sri Lankan military from 1983 to 2009 demanding an independent homeland called 'Tamil Eelam'?", opts, c, s))

opts, c, s = rotate_options(
    "General Pervez Musharraf",
    ["General Zia-ul-Haq", "General Ayub Khan", "General Yahya Khan"],
    "D",
    "General Pervez Musharraf led a bloodless military coup in October 1999 that overthrew the democratically elected government of Prime Minister Nawaz Sharif.\nHence, Option {{CORR}} is correct.",
    "Identifies General Pervez Musharraf in the 1999 coup."
)
add_u3(make_question(CHAPTER_U3, "Pakistan Military Rule", "Which Pakistani military ruler overthrew Prime Minister Nawaz Sharif in a military coup d'etat in October 1999?", opts, c, s))

# Match questions
add_u3(make_match_question(
    CHAPTER_U3, "South Asian Accords and Treaties",
    "Match List I (Treaty/Accord) with List II (Associated Year):",
    [("A", "Tashkent Agreement"), ("B", "Simla Agreement"), ("C", "Farakka Treaty on Ganga Waters"), ("D", "SAFTA enters into operational force")],
    [("I", "1966"), ("II", "1972"), ("III", "1996"), ("IV", "2006")],
    "A-I, B-II, C-III, D-IV", "A",
    "Tashkent Agreement signed in 1966; Simla Agreement signed in 1972; Farakka Ganga Water Treaty signed in 1996; SAFTA took effect on 1 January 2006.",
    "Matches South Asian bilateral and regional agreements with enactment years."
))

add_u3(make_match_question(
    CHAPTER_U3, "South Asian Political Leaders",
    "Match List I (Leader) with List II (Country / Historical Role):",
    [("A", "Sheikh Mujibur Rahman"), ("B", "Zulfikar Ali Bhutto"), ("C", "Velupillai Prabhakaran"), ("D", "Mohamed Nasheed")],
    [("I", "Founding Father of Bangladesh and Awami League leader"), ("II", "Elected Prime Minister of Pakistan who signed Simla Agreement"), ("III", "Supreme commander of the militant LTTE in Sri Lanka"), ("IV", "First democratically elected multi-party President of Maldives")],
    "A-I, B-II, C-III, D-IV", "A",
    "Sheikh Mujib led Bangladesh to independence; Z.A. Bhutto led Pakistan after 1971; Prabhakaran led the LTTE; Mohamed Nasheed was elected Maldivian President in 2008.",
    "Matches South Asian political leaders with their historic roles."
))

add_u3(make_match_question(
    CHAPTER_U3, "India Bilateral Disputes",
    "Match List I (Neighboring Country) with List II (Key Bilateral Dispute/Issue with India):",
    [("A", "Pakistan"), ("B", "Bangladesh"), ("C", "Sri Lanka"), ("D", "Nepal")],
    [("I", "Cross-border terrorism and territorial conflict in Kashmir"), ("II", "Illegal migration across porous borders and Teesta river dispute"), ("III", "Plight and political rights of ethnic Tamils and fishing rights around Katchatheevu"), ("IV", "Kalapani-Lipulekh territorial demarcation and Treaty of Peace and Friendship 1950 review")],
    "A-I, B-II, C-III, D-IV", "B",
    "Pakistan is linked to Kashmir terrorism; Bangladesh with illegal immigration and river disputes; Sri Lanka with Tamil rights; Nepal with border maps and the 1950 treaty.",
    "Categorises bilateral friction points between India and its neighbors."
))

# Chronology questions
add_u3(make_sequence_question(
    CHAPTER_U3, "Bangladesh Liberation History",
    "Arrange the following events leading to and following the creation of Bangladesh in chronological order:",
    [("A", "Six-Point Programme announced by Sheikh Mujibur Rahman"), ("B", "General elections in Pakistan won by Awami League"), ("C", "Operation Searchlight and genocide by Pakistani military in East Pakistan"), ("D", "Formal surrender of Pakistani armed forces in Dhaka and emergence of Bangladesh")],
    "A, B, C, D", "B",
    "1. Sheikh Mujib proposed 6-point autonomy in 1966 (A).\n2. Awami League swept general elections in December 1970 (B).\n3. Pakistani army launched Operation Searchlight in March 1971 (C).\n4. Pakistani forces surrendered on 16 December 1971 (D).",
    "Chronologically sequences Bangladesh liberation milestones."
))

add_u3(make_sequence_question(
    CHAPTER_U3, "India-Pakistan War Timeline",
    "Arrange the following India-Pakistan military conflicts in chronological order:",
    [("A", "Indo-Pak War over Kashmir following tribal invasion"), ("B", "Full-scale war over the Rann of Kutch and Kashmir ending in Tashkent"), ("C", "War leading to the liberation of Bangladesh"), ("D", "Kargil conflict in the high-altitude frontier")],
    "A, B, C, D", "C",
    "1. First Kashmir War (1947-1948).\n2. Second Indo-Pak War (1965).\n3. Bangladesh Liberation War (December 1971).\n4. Kargil War (May-July 1999).",
    "Sequences all four India-Pakistan wars."
))

add_u3(make_sequence_question(
    CHAPTER_U3, "SAARC Milestones",
    "Arrange the following milestones in South Asian regional cooperation in chronological sequence:",
    [("A", "First SAARC Summit held in Dhaka"), ("B", "Signing of the SAARC Preferential Trading Arrangement (SAPTA)"), ("C", "Signing of the South Asian Free Trade Area (SAFTA) in Islamabad"), ("D", "Admission of Afghanistan as the eighth member of SAARC")],
    "A, B, C, D", "D",
    "1. First SAARC Summit (1985).\n2. SAPTA signed (1993).\n3. SAFTA signed (2004).\n4. Afghanistan admitted (2007).",
    "Sequences SAARC trade and membership milestones."
))

# Statement questions
add_u3(make_statement_question(
    CHAPTER_U3, "Nepal Democratic Transition",
    "In April 2006, massive pro-democracy demonstrations organised by the Seven Party Alliance (SPA) and Maoists forced King Gyanendra to reinstate Parliament.",
    "Following the democratic transition, Nepal retained its status as the world's only official Hindu Kingdom under the 2015 Constitution.",
    3, "C",
    "Statement I is correct: The April 2006 Loktantra Andolan forced King Gyanendra to surrender absolute power and restore parliament. Statement II is incorrect: The interim parliament and the 2015 Constitution declared Nepal a secular, federal democratic republic, ending the Hindu monarchy.",
    "Evaluates the transition of Nepal from monarchy to secular republic."
))

add_u3(make_statement_question(
    CHAPTER_U3, "Bhutan-India Friendship",
    "India and Bhutan share open borders and citizens do not require passports to travel between the two nations.",
    "Bhutan flushed out anti-India Northeast insurgent groups (ULFA and NDFB) from its territory during Operation All Clear in 2003.",
    1, "A",
    "Both Statement I and Statement II are correct. Under the 1949/2007 Friendship Treaty, travel is passport-free, and in December 2003, Bhutan's Royal Army launched Operation All Clear to destroy Indian insurgent camps.",
    "Evaluates the India-Bhutan strategic partnership."
))

add_u3(make_statement_question(
    CHAPTER_U3, "Pakistan Democracy Challenges",
    "The Pakistani military, clergy, and landowning aristocracy have historically colluded to weaken elected civilian governments.",
    "Pakistan has experienced uninterrupted, stable civilian rule without a single military coup since its independence in 1947.",
    3, "C",
    "Statement I is correct: Sociological dominance of the military-feudal-religious elite has undermined democratic institutions. Statement II is false: Pakistan experienced multiple coups led by Ayub Khan, Yahya Khan, Zia-ul-Haq, and Pervez Musharraf.",
    "Explains obstacles to civilian democracy in Pakistan."
))

# Assertion Reason questions
add_u3(make_assertion_question(
    CHAPTER_U3, "Sri Lanka Development Record",
    "Sri Lanka was one of the first developing countries to successfully control the rate of growth of population and liberalise its economy.",
    "Despite experiencing protracted ethnic strife and civil war for over two decades, Sri Lanka maintained high Human Development Index (HDI) indicators and sustained GDP growth.",
    2, "B",
    "Both (A) and (R) are correct historical facts highlighted in NCERT. Sri Lanka achieved rapid demographic transition and opened its economy early (1970s), and also preserved high literacy and healthcare amidst civil war. However, (R) describes resilience rather than the direct causal reason of (A).",
    "Distinguishes Sri Lanka's socio-economic resilience from demographic policy."
))

add_u3(make_assertion_question(
    CHAPTER_U3, "SAARC Limitations",
    "SAARC has not met with the same level of success and economic integration as the European Union or ASEAN.",
    "Persistent bilateral political conflicts, mutual suspicion, and India-Pakistan rivalry have severely constrained the efficacy of SAARC.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains why SAARC underperformed—bilateral disputes, primarily between India and Pakistan, stalled regional consensus and intra-regional trade.",
    "Analyzes constraints on South Asian regional integration."
))

add_u3(make_assertion_question(
    CHAPTER_U3, "Bangladesh Secularism",
    "The 1972 Constitution of Bangladesh declared the state to be secular, democratic, and socialist.",
    "General Ziaur Rahman removed secularism from the constitution and introduced Islamic orientation into state affairs after the assassination of Sheikh Mujibur Rahman.",
    2, "B",
    "Both (A) and (R) are true historical facts from NCERT. Sheikh Mujib enshrined secularism in 1972, and military ruler Ziaur Rahman amended the constitution in the late 1970s. However, (R) represents a subsequent political reversal rather than an explanation of (A).",
    "Details constitutional evolution of secularism in Bangladesh."
))

# Multi statement questions
add_u3(make_multi_statement_question(
    CHAPTER_U3, "SAARC and SAFTA",
    "Which of the following statements are correct regarding SAARC and the South Asian Free Trade Area (SAFTA)?",
    [
        ("A", "SAFTA agreement was signed in January 2004 at the 12th SAARC Summit in Islamabad."),
        ("B", "SAFTA aims at lowering trade tariffs across member states to promote intra-regional commerce."),
        ("C", "Afghanistan was admitted as the eighth member state of SAARC at the New Delhi Summit in 2007."),
        ("D", "SAARC member states maintain a single unified currency called the 'Rupee' administered by Nepal.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements A, B, and C are true facts. Statement D is false because SAARC has no common currency; each nation retains its own independent currency.",
    "Evaluates institutional milestones of SAARC and SAFTA."
))

add_u3(make_multi_statement_question(
    CHAPTER_U3, "Indo-Bangladesh Cooperation",
    "Which of the following are significant areas of positive cooperation between India and Bangladesh?",
    [
        ("A", "Bilateral trade has expanded substantially under duty-free access provisions for Bangladeshi goods."),
        ("B", "Bangladesh is an active partner in India's Look East / Act East policy, connecting India to Southeast Asia."),
        ("C", "Cooperation in disaster management and climate resilience in the Bay of Bengal region."),
        ("D", "Bangladesh has permanently banned all transit and transshipment of Indian goods to the North-Eastern states.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A, B, and C describe key pillars of cooperation. Statement D is false because Bangladesh has granted transit and transshipment rights (via Chittagong and Mongla ports) to India's landlocked North-East.",
    "Captures modern dimensions of India-Bangladesh bilateral partnership."
))

add_u3(make_multi_statement_question(
    CHAPTER_U3, "South Asian Democracies",
    "Which of the following statements are correct regarding democracy across South Asian countries?",
    [
        ("A", "India and Sri Lanka have successfully operated continuous democratic political systems since independence."),
        ("B", "Surveys show that ordinary citizens in all South Asian nations overwhelmingly prefer democracy over authoritarian rule."),
        ("C", "Support for democracy is confined strictly to wealthy, educated urban elites in South Asia."),
        ("D", "Pakistan and Bangladesh have experienced alternating periods of civilian democracy and military rule.")
    ],
    "(A), (B) and (D) only",
    ["(A) and (C) only", "(B) and (C) only", "(A), (B), (C) and (D)"],
    "C",
    "Statements A, B, and D are accurate per NCERT survey findings. Statement C is completely false: democratic aspirations are equally robust among poor, rural, and uneducated South Asian citizens.",
    "Interprets empirical research on democratic aspirations in South Asia."
))

# Direct MCQs for Unit 3
u3_direct = [
    ("Maldives Democratic Transition", "In the Maldives, the political system was transformed into a multi-party democracy following constitutional reforms in which year?",
     "2005", ["1968", "1988", "2018"], "B",
     "In June 2005, the Maldivian Parliament voted unanimously to introduce a multi-party system, leading to democratic presidential elections in 2008 won by Mohamed Nasheed.", "Identifies 2005 multi-party reform in Maldives."),
    ("Maldives Transformation 1968", "Until 1968, the Maldives was governed under which political structure before becoming a presidential republic?",
     "A Sultanate", ["A French protectorate", "A communist soviet republic", "A Portuguese military junta"], "C",
     "The Maldives was a Sultanate until 1968, when a national referendum transformed it into a republic with a presidential form of government.", "Identifies Maldives as Sultanate until 1968."),
    ("IPKF Intervention", "The Indian Peace Keeping Force (IPKF) was deployed to Sri Lanka following an accord signed in 1987 between Rajiv Gandhi and which Sri Lankan President?",
     "J.R. Jayewardene", ["Sirimavo Bandaranaike", "Chandrika Kumaratunga", "Ranasinghe Premadasa"], "D",
     "The Indo-Sri Lanka Peace Accord was signed on 29 July 1987 in Colombo by Prime Minister Rajiv Gandhi and President J.R. Jayewardene.", "Identifies J.R. Jayewardene in 1987 Accord."),
    ("IPKF Withdrawal", "In which year did the Indian Peace Keeping Force (IPKF) pull out of Sri Lanka without achieving its military objectives?",
     "1990", ["1987", "1994", "2009"], "A",
     "Under the V.P. Singh government in India and amidst hostility from Sri Lankan leaders, the IPKF completed its withdrawal in March 1990.", "Identifies 1990 withdrawal of IPKF."),
    ("Kargil Conflict", "The Kargil military confrontation between India and Pakistan erupted in which year following intrusions across the Line of Control?",
     "1999", ["1984", "1993", "2002"], "B",
     "In May-July 1999, Indian armed forces fought the Kargil War (Operation Vijay) to evict Pakistani intruders and military regulars from the heights of Kargil-Drass.", "Identifies 1999 Kargil War."),
    ("Siachen Glacier Conflict", "In 1984, the Indian Army launched which military operation to secure control over the strategic Siachen Glacier?",
     "Operation Meghdoot", ["Operation Vijay", "Operation Cactus", "Operation Blue Star"], "C",
     "Operation Meghdoot was launched on 13 April 1984, securing the heights of the Siachen Glacier in northern Ladakh before Pakistan could occupy them.", "Identifies Operation Meghdoot on Siachen."),
    ("Operation Cactus Maldives", "In November 1988, India swiftly dispatched military paratroopers to the Maldives under 'Operation Cactus' to:",
     "Foil a coup attempt by mercenary rebels against President Maumoon Abdul Gayoom", ["Install a permanent Indian military governor in Male", "Annex the southern atolls into Lakshadweep", "Force the Maldives to join the Warsaw Pact"], "D",
     "India launched Operation Cactus in November 1988 upon the urgent request of President Gayoom, neutralizing a mercenary coup led by a Sri Lankan militant group.", "Explains Operation Cactus in Maldives."),
    ("Bhutan Political Reform", "Under the guidance of its monarch, Bhutan held its first democratic general elections and enacted a new constitution in which year?",
     "2008", ["1990", "2001", "2016"], "A",
     "Bhutan transitioned peacefully into a constitutional democratic monarchy in 2008, holding historic multi-party parliamentary elections.", "Identifies 2008 Bhutan democratic transition."),
    ("Gross National Happiness", "Which South Asian country officially adopted 'Gross National Happiness' (GNH) as its primary index of national progress rather than GDP?",
     "Bhutan", ["Nepal", "Maldives", "Sri Lanka"], "B",
     "Bhutan's Fourth King, Jigme Singye Wangchuck, coined the philosophy of Gross National Happiness in the 1970s, prioritising spiritual, environmental, and cultural well-being.", "Identifies Bhutan and GNH."),
    ("Shimla Agreement Signatories", "The historic Shimla Agreement of July 1972 was signed by Prime Minister Indira Gandhi and which Pakistani leader?",
     "Zulfikar Ali Bhutto", ["Ayub Khan", "Yahya Khan", "Zia-ul-Haq"], "C",
     "The Shimla Agreement was signed on 2 July 1972 by Indira Gandhi and Zulfikar Ali Bhutto, committing both nations to settle disputes bilaterally through peaceful negotiations.", "Identifies Zulfikar Ali Bhutto at Shimla."),
    ("Tashkent Agreement Mediator", "Which foreign leader acted as the neutral mediator between Lal Bahadur Shastri and Ayub Khan at Tashkent in January 1966?",
     "Alexei Kosygin (Premier of the USSR)", ["Dwight Eisenhower (President of USA)", "U Thant (UN Secretary-General)", "Zhou Enlai (Premier of China)"], "D",
     "Soviet Premier Alexei Kosygin hosted and brokered the Tashkent Agreement between Indian Prime Minister Lal Bahadur Shastri and Pakistani President Ayub Khan.", "Identifies Alexei Kosygin at Tashkent."),
    ("Line of Control Origin", "The 'Line of Control' (LoC) dividing Jammu and Kashmir between India and Pakistan was formally delineated following which accord?",
     "Simla Agreement of 1972", ["Karachi Agreement of 1949", "Tashkent Declaration of 1966", "Lahore Declaration of 1999"], "A",
     "Under the Simla Agreement of 1972, the old 1949 Ceasefire Line was mutually converted and mapped as the Line of Control (LoC) with a commitment not to alter it unilaterally.", "Identifies Simla Agreement establishing the LoC."),
    ("Sir Creek Dispute", "The Sir Creek boundary dispute between India and Pakistan concerns a 96-km strip of water located between:",
     "Gujarat and Sindh in the Rann of Kutch", ["Punjab and Khyber Pakhtunkhwa", "Rajasthan and Bahawalpur", "Jammu and Pakistani-administered Kashmir"], "B",
     "Sir Creek is a tidal estuary and disputed marshland between the Kutch region of Gujarat (India) and Sindh (Pakistan).", "Locates Sir Creek between Gujarat and Sindh."),
    ("Farakka Barrage Dispute", "The Farakka Barrage constructed by India on the Ganga River in West Bengal caused disputes with Bangladesh primarily regarding:",
     "Water sharing during the dry lean season months (January to May)", ["Disposal of industrial chemical effluents into the Padma", "Banning of all Bangladeshi fishing vessels", "Building a hydroelectric nuclear dam across the border"], "C",
     "Bangladesh argued that the diversion of Ganga waters through the Farakka Barrage into the Hooghly reduced dry-season river flows into southwestern Bangladesh.", "Explains Farakka Ganga water sharing issue."),
    ("Enclave Exchange 2015", "The historic Land Boundary Agreement (LBA) ratified by the Indian Parliament through the 100th Constitutional Amendment in 2015 resolved:",
     "The exchange of adverse possessions and 162 enclaves between India and Bangladesh", ["The boundary demarcation along the McMahon Line", "The division of the Rann of Kutch marshlands", "The partition of the Sundarbans forest reserve"], "D",
     "The 2015 India-Bangladesh Land Boundary Agreement swapped 111 Indian enclaves in Bangladesh with 51 Bangladeshi enclaves in India, granting citizenship to thousands.", "Details 2015 India-Bangladesh enclave swap."),
    ("Nepal Monarchy Mass Murder", "The tragic palace massacre in Nepal that claimed the lives of King Birendra and Queen Aishwarya occurred in which year?",
     "June 2001", ["April 1990", "December 2005", "May 2008"], "A",
     "On 1 June 2001, Crown Prince Dipendra shot King Birendra, Queen Aishwarya, and other royal family members at the Narayanhiti Palace before taking his own life.", "Recalls 2001 Nepal royal massacre."),
    ("King Gyanendra Royal Coup", "In February 2005, which King of Nepal dismissed the Prime Minister and assumed direct autocratic royal rule, sparking the 2006 democracy movement?",
     "King Gyanendra", ["King Birendra", "King Mahendra", "King Tribhuvan"], "B",
     "King Gyanendra seized absolute power on 1 February 2005, declaring a state of emergency and arresting political leaders.", "Identifies King Gyanendra."),
    ("Pakistan Nuclear Tests 1998", "Following India's nuclear tests in Pokhran in May 1998, Pakistan conducted its nuclear detonations in which mountain range?",
     "Chagai Hills (Baluchistan)", ["Hindu Kush", "Sulaiman Mountains", "Karakoram Range"], "C",
     "Pakistan conducted retaliatory underground nuclear tests in the Chagai Hills of Baluchistan on 28 and 30 May 1998.", "Identifies Chagai Hills for Pakistan nuclear tests."),
    ("Norwegian Peace Mediation", "Which neutral European country acted as an official peace facilitator and mediator between the Sri Lankan government and the LTTE in 2002?",
     "Norway", ["Switzerland", "Sweden", "Finland"], "A",
     "Norway facilitated ceasefire negotiations between the government of Sri Lanka and the LTTE from 2000 to 2006, leading to the 2002 Ceasefire Agreement.", "Identifies Norway as Sri Lanka peace mediator."),
    ("Tamil Minorities in Sri Lanka", "Tamils in Sri Lanka belong primarily to which two distinct historical groups?",
     "Sri Lankan Tamils (native to the north and east) and Indian Tamils (descendants of plantation workers brought by the British)", ["Buddhist Tamils and Christian Tamils", "Urban Tamils and Desert Tamils", "Sinhala Tamils and Burgher Tamils"], "A",
     "Sri Lankan Tamils trace centuries of ancestry in the Jaffna peninsula and east, while Indian Tamils migrated in the 19th century as indentured tea plantation labour.", "Classifies the two Tamil communities in Sri Lanka."),
    ("1956 Sinhala Only Act", "The 1956 Sinhala Only Act passed by the Sri Lankan parliament alienated the Tamil population because it:",
     "Made Sinhala the sole official language of the country, disqualifying non-Sinhala speakers from civil service jobs", ["Banned Tamils from practicing Hinduism in public temples", "Deported all Tamil tea plantation workers to Pakistan", "Abolished the Supreme Court of Sri Lanka"], "B",
     "The Official Language Act of 1956 declared Sinhala as the sole official language, triggering ethnic alienation among Tamil citizens.", "Explains impact of 1956 Sinhala Only Act."),
    ("LTTE Defeat", "In which year was the LTTE completely defeated militarily by the Sri Lankan armed forces, and its chief Prabhakaran killed?",
     "May 2009", ["January 2000", "October 2005", "December 2012"], "C",
     "The Sri Lankan civil war culminated in May 2009 with the complete military encirclement and death of Velupillai Prabhakaran in Mullaitivu.", "Identifies May 2009 defeat of LTTE."),
    ("Awami League Founder", "The political party that spearheaded the movement for Bangladesh's liberation and won a landslide majority in the 1970 Pakistan elections was:",
     "Awami League", ["Muslim League", "Pakistan Peoples Party", "Jamat-e-Islami"], "D",
     "The Awami League, founded in 1949 and led by Sheikh Mujibur Rahman, championed Bengali national autonomy.", "Identifies Awami League."),
    ("Ziaur Rahman Party", "Which prominent political party in Bangladesh was founded by military ruler Major General Ziaur Rahman in 1978?",
     "Bangladesh Nationalist Party (BNP)", ["Awami League", "Jatiya Party", "Communist Party of Bangladesh"], "A",
     "Ziaur Rahman established the Bangladesh Nationalist Party (BNP) in September 1978, later led by his widow Begum Khaleda Zia.", "Identifies BNP founder Ziaur Rahman."),
    ("HM Ershad Rule", "Lt. General H.M. Ershad seized power in Bangladesh in 1982 and ruled until he was forced to step down amidst mass protests in:",
     "1990", ["1985", "1996", "2001"], "B",
     "General Ershad ruled from 1982 until pro-democracy uprisings forced his resignation in December 1990, paving the way for multi-party elections in 1991.", "Identifies 1990 resignation of General Ershad."),
    ("Maoist Insurgency in Nepal", "The Communist Party of Nepal (Maoist) waged an armed insurgency from 1996 to 2006 against:",
     "The constitutional monarchy and the feudal state structure", ["The United Nations Peacekeeping Department", "The Chinese People's Liberation Army", "The International Monetary Fund's regional headquarters"], "C",
     "The Maoists launched the 'People's War' in February 1996 to overthrow the monarchy and establish a people's republic.", "Explains Nepal Maoist insurgency goals."),
    ("Comprehensive Peace Accord Nepal", "In November 2006, the Maoists signed the Comprehensive Peace Accord (CPA) with the Government of Nepal, formally ending:",
     "A decade-long armed conflict that cost over 15,000 lives", ["The border war with India over Kalapani", "The diplomatic confrontation with Bhutan", "The transit blockade of the Himalayas"], "D",
     "The Comprehensive Peace Accord of 21 November 2006 formally concluded the 10-year Maoist conflict and integrated Maoists into mainstream politics.", "Identifies 2006 Comprehensive Peace Accord in Nepal."),
    ("SAFTA Tariff Goals", "The ultimate economic objective of the SAFTA agreement was to:",
     "Reduce customs tariffs to less than 20% within a phased timetable to create a free trade zone", ["Impose a 100% tariff on all goods manufactured in Asia", "Abolish all private factories across South Asia", "Prohibit the sale of agricultural seeds between members"], "A",
     "SAFTA aimed at reducing tariffs by 20% by 2007 and progressively bringing them down to 0-5% for member countries.", "Details SAFTA tariff reduction targets."),
    ("Lahore Bus Diplomacy", "In February 1999, Prime Minister Atal Bihari Vajpayee undertook a historic bus journey to Lahore to:",
     "Inaugurate the Delhi-Lahore bus service and sign the Lahore Declaration with Nawaz Sharif", ["Demand Pakistan's unconditional merger into the Indian union", "Sign a secret pact to partition Kashmir along the Chenab river", "Surrender Indian sovereignty over the Siachen Glacier"], "B",
     "Vajpayee traveled on the inaugural Delhi-Lahore bus on 19 February 1999, signing the Lahore Declaration aimed at reducing the risk of accidental nuclear war.", "Recalls Vajpayee's February 1999 bus diplomacy to Lahore."),
    ("Agra Summit", "The bilateral summit between Prime Minister Atal Bihari Vajpayee and General Pervez Musharraf held in July 2001 took place in:",
     "Agra", ["New Delhi", "Islamabad", "Shimla"], "C",
     "The Agra Summit of 14-16 July 2001 failed to produce a joint declaration due to irreconcilable differences on Kashmir and cross-border terrorism.", "Identifies Agra Summit 2001."),
    ("Indus Waters Treaty Arbitrator", "Under the Indus Waters Treaty, which rivers were allocated for unrestricted use by India?",
     "Sutlej, Beas, and Ravi (Eastern Rivers)", ["Indus, Jhelum, and Chenab (Western Rivers)", "Ganga, Yamuna, and Brahmaputra", "Teesta, Meghna, and Barak"], "A",
     "The treaty gave India exclusive control over the three eastern rivers (Ravi, Beas, Sutlej), while Pakistan received the three western rivers (Indus, Jhelum, Chenab).", "Specifies rivers allocated to India under Indus Waters Treaty."),
    ("Pakistan First General Elections", "Pakistan's first-ever nationwide direct elections based on adult franchise were held in:",
     "December 1970", ["August 1947", "October 1958", "March 1985"], "B",
     "Pakistan held its first direct parliamentary elections on 7 December 1970 under General Yahya Khan's Legal Framework Order.", "Identifies December 1970 elections in Pakistan."),
    ("Benazir Bhutto First Term", "Benazir Bhutto made history in 1988 by becoming the:",
     "First female prime minister of a Muslim-majority nation", ["First female Secretary-General of the United Nations", "First female President of the World Bank", "Sole female military general in the Pakistani army"], "C",
     "Following Zia-ul-Haq's death in an air crash, Benazir Bhutto led the PPP to victory in 1988, becoming the first female Prime Minister of a Muslim state.", "Identifies Benazir Bhutto's historic 1988 milestone."),
    ("Teesta River Dispute", "Which shared river between India and Bangladesh remains a subject of ongoing dispute over dry-season water allocation?",
     "Teesta River", ["Brahmaputra", "Karnaphuli", "Meghna"], "D",
     "The Teesta River, originating in Sikkim and flowing through West Bengal into Bangladesh, has been subject to prolonged water-sharing discussions.", "Identifies Teesta River dispute."),
    ("1950 Indo-Nepal Treaty", "Under the historic 1950 Treaty of Peace and Friendship between India and Nepal, citizens of both countries are granted:",
     "The reciprocal right to free movement, employment, residence, and property ownership without visa requirements", ["Exclusive military command over each other's defense ministries", "A joint single parliament based in Kathmandu", "Immunity from criminal prosecution in all international courts"], "A",
     "The 1950 Treaty establishes a special relationship allowing free movement of citizens across open borders and equal treatment in economic matters.", "Identifies 1950 Indo-Nepal Treaty provisions."),
    ("Chittagong Hill Tracts Accord", "The Chittagong Hill Tracts (CHT) Peace Accord in Bangladesh was signed in 1997 between the government and which indigenous tribal body?",
     "Parbatya Chattagram Jana Samhati Samiti (PCJSS)", ["Awami League Volunteer Corps", "East Pakistan Tribal Council", "Mizo National Front"], "B",
     "The 1997 CHT Accord ended decades of indigenous tribal conflict in the Chittagong Hill Tracts, recognizing special administrative status.", "Identifies PCJSS in CHT Accord."),
    ("Punatsangchhu Hydro Project", "In which neighbouring Himalayan nation has India extensively funded and constructed major hydroelectric power plants like Punatsangchhu and Tala?",
     "Bhutan", ["Nepal", "Myanmar", "Tibet"], "C",
     "India's economic assistance to Bhutan is anchored in massive hydroelectric projects like Chukha, Kurichhu, Tala, and Punatsangchhu, from which India imports electricity.", "Identifies Bhutan for Indian hydroelectric cooperation."),
    ("Durand Line Border", "The contested 2,670-kilometre frontier known as the Durand Line demarcates the international boundary between:",
     "Pakistan and Afghanistan", ["India and China", "Pakistan and Iran", "India and Myanmar"], "D",
     "The Durand Line established in 1893 divides Pakistan and Afghanistan, and has historically been contested by Afghan governments.", "Identifies Durand Line between Pakistan and Afghanistan."),
    ("Sri Lanka 13th Amendment", "Which constitutional amendment in Sri Lanka introduced in 1987 following the Indo-Sri Lanka Accord created Provincial Councils to devolve power to Tamil areas?",
     "13th Constitutional Amendment", ["1st Constitutional Amendment", "18th Constitutional Amendment", "20th Constitutional Amendment"], "A",
     "The 13th Amendment enacted in November 1987 created Provincial Councils and recognized Tamil as an official language in Sri Lanka.", "Identifies 13th Amendment in Sri Lanka."),
    ("1965 War Conclusion", "The armed conflict between India and Pakistan in 1965 was formally concluded through the signing of which diplomatic document?",
     "Tashkent Declaration of January 1966", ["Simla Agreement of July 1972", "Karachi Agreement of July 1949", "Delhi Pact of April 1950"], "B",
     "The 1965 war ended with a UN ceasefire, followed by the Tashkent Declaration signed on 10 January 1966 by Shastri and Ayub Khan.", "Identifies Tashkent Declaration ending 1965 war."),
    ("Zia Cricket Diplomacy", "General Zia-ul-Haq used cricket diplomacy to de-escalate military tensions with India during 'Operation Brasstacks' by visiting Jaipur to watch a cricket match in:",
     "1987", ["1977", "1982", "1999"], "C",
     "In February 1987, General Zia visited Jaipur during a tense standoff caused by Operation Brasstacks, easing military friction through cricket diplomacy.", "Identifies 1987 cricket diplomacy.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u3_direct:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u3(make_question(CHAPTER_U3, topic, stem, opts, c, s))

u3_qs = u3_qs[:60]
assert len(u3_qs) == 60, f"Expected 60 questions for Unit 3, got {len(u3_qs)}"
validate_and_collect(u3_qs, u3_seen)
print("Unit 3 validated: 60 unique questions.")


# =================================================================================================
# UNIT 4: International Organisations (60 Questions)
# =================================================================================================
CHAPTER_U4 = "International Organisations"
u4_qs = []
u4_seen = set()

def add_u4(q):
    u4_qs.append(q)

opts, c, s = rotate_options(
    "24 October 1945",
    ["15 August 1945", "10 January 1920", "26 June 1945"],
    "A",
    "The United Nations came into official existence on 24 October 1945 upon ratification of the Charter by the five permanent members and a majority of signatories. United Nations Day is celebrated globally on this date.\nHence, Option {{CORR}} is correct.",
    "Identifies 24 October 1945 as founding date of the United Nations."
)
add_u4(make_question(CHAPTER_U4, "UN Founding", "On which date did the United Nations formally come into existence following the ratification of the UN Charter by the founding signatories?", opts, c, s))

opts, c, s = rotate_options(
    "30 October 1945",
    ["24 October 1945", "15 August 1947", "26 January 1950"],
    "B",
    "India signed the UN Charter at San Francisco and formally became a member state of the United Nations on 30 October 1945, six days after the Charter entered into force.\nHence, Option {{CORR}} is correct.",
    "Identifies 30 October 1945 as India's entry date to the UN."
)
add_u4(make_question(CHAPTER_U4, "India UN Entry", "On which date did India formally become a member of the United Nations as one of its original founding signatories?", opts, c, s))

opts, c, s = rotate_options(
    "General Assembly",
    ["Security Council", "Economic and Social Council", "Trusteeship Council"],
    "C",
    "In the UN General Assembly, all 193 member states have equal representation, and each member nation exercises exactly one vote regardless of its size, wealth, or population.\nHence, Option {{CORR}} is correct.",
    "Identifies UN General Assembly as organ where every state has one equal vote."
)
add_u4(make_question(CHAPTER_U4, "UN General Assembly", "In which principal organ of the United Nations do all member states enjoy equal representation with each member having one vote?", opts, c, s))

opts, c, s = rotate_options(
    "10 non-permanent members serving for 2-year terms",
    ["5 non-permanent members serving for 5-year terms", "15 non-permanent members serving for 1-year terms", "20 non-permanent members serving for 3-year terms"],
    "D",
    "The UN Security Council consists of 5 permanent members and 10 non-permanent members who are elected by the General Assembly for a non-renewable two-year term.\nHence, Option {{CORR}} is correct.",
    "Identifies 10 non-permanent members serving 2-year terms in the UNSC."
)
add_u4(make_question(CHAPTER_U4, "UN Security Council Structure", "How many non-permanent members are elected to the United Nations Security Council, and for what tenure do they serve?", opts, c, s))

# Match questions
add_u4(make_match_question(
    CHAPTER_U4, "UN Specialised Agencies",
    "Match List I (Specialised Agency) with List II (Headquarters City):",
    [("A", "International Atomic Energy Agency (IAEA)"), ("B", "World Health Organisation (WHO)"), ("C", "United Nations Educational, Scientific and Cultural Organisation (UNESCO)"), ("D", "International Court of Justice (ICJ)")],
    [("I", "Vienna, Austria"), ("II", "Geneva, Switzerland"), ("III", "Paris, France"), ("IV", "The Hague, Netherlands")],
    "A-I, B-II, C-III, D-IV", "A",
    "IAEA is based in Vienna; WHO in Geneva; UNESCO in Paris; ICJ at the Peace Palace in The Hague.",
    "Matches UN specialised agencies with their headquarters cities."
))

add_u4(make_match_question(
    CHAPTER_U4, "UN Secretaries-General and Nationalities",
    "Match List I (UN Secretary-General) with List II (Country of Origin):",
    [("A", "U Thant"), ("B", "Kurt Waldheim"), ("C", "Javier Perez de Cuellar"), ("D", "Boutros Boutros-Ghali")],
    [("I", "Burma (Myanmar)"), ("II", "Austria"), ("III", "Peru"), ("IV", "Egypt")],
    "A-I, B-II, C-III, D-IV", "A",
    "U Thant was from Burma; Kurt Waldheim from Austria; Perez de Cuellar from Peru; Boutros-Ghali from Egypt.",
    "Matches UN Secretaries-General with their native countries."
))

add_u4(make_match_question(
    CHAPTER_U4, "UN Principal Organs and Functions",
    "Match List I (UN Principal Organ) with List II (Primary Mandate):",
    [("A", "Security Council"), ("B", "Economic and Social Council (ECOSOC)"), ("C", "International Court of Justice (ICJ)"), ("D", "Secretariat")],
    [("I", "Maintenance of international peace and security"), ("II", "Coordinating economic, social, cultural, and humanitarian fields"), ("III", "Settling legal disputes submitted by states in accordance with international law"), ("IV", "Carrying out day-to-day administrative operations of the UN")],
    "A-I, B-II, C-III, D-IV", "B",
    "Security Council maintains peace; ECOSOC coordinates social-economic development; ICJ settles legal disputes; Secretariat handles administration.",
    "Categorises principal UN organs and mandates."
))

# Chronology questions
add_u4(make_sequence_question(
    CHAPTER_U4, "Evolution of the United Nations",
    "Arrange the following milestones leading to the establishment of the United Nations in chronological sequence:",
    [("A", "Signing of the Atlantic Charter by Roosevelt and Churchill"), ("B", "Declaration by United Nations signed in Washington by 26 nations"), ("C", "Yalta Conference of the 'Big Three' deciding to convene a world conference"), ("D", "San Francisco Conference drafting and signing the United Nations Charter")],
    "A, B, C, D", "B",
    "1. Atlantic Charter signed (August 1941).\n2. Declaration by United Nations (January 1942).\n3. Yalta Conference (February 1945).\n4. San Francisco Conference (April-June 1945).",
    "Sequences diplomatic conferences establishing the United Nations."
))

add_u4(make_sequence_question(
    CHAPTER_U4, "Tenure of Secretaries-General",
    "Arrange the following United Nations Secretaries-General in the chronological order of their service:",
    [("A", "Kurt Waldheim"), ("B", "Boutros Boutros-Ghali"), ("C", "Kofi Annan"), ("D", "Ban Ki-moon")],
    "A, B, C, D", "C",
    "1. Kurt Waldheim (1972-1981).\n2. Boutros Boutros-Ghali (1992-1996).\n3. Kofi Annan (1997-2006).\n4. Ban Ki-moon (2007-2016).",
    "Chronologically sequences UN Secretaries-General tenures."
))

add_u4(make_sequence_question(
    CHAPTER_U4, "Global Organisations Chronology",
    "Arrange the creation of the following international institutions in chronological order:",
    [("A", "International Labour Organisation (ILO)"), ("B", "International Monetary Fund (IMF)"), ("C", "International Atomic Energy Agency (IAEA)"), ("D", "World Trade Organisation (WTO)")],
    "A, B, C, D", "D",
    "1. ILO established under League of Nations (1919).\n2. IMF created at Bretton Woods (1944).\n3. IAEA established (1957).\n4. WTO established (1995).",
    "Sequences founding dates of global multilateral organisations."
))

# Statement questions
add_u4(make_statement_question(
    CHAPTER_U4, "UN Veto Power",
    "The five permanent members of the UN Security Council possess veto power, meaning a negative vote by any one of them blocks any substantive resolution.",
    "The UN Charter allows the General Assembly to override a permanent member's Security Council veto by a simple majority vote.",
    3, "C",
    "Statement I is correct: Under Article 27 of the UN Charter, a negative vote by any P5 member halts adoption of substantive resolutions. Statement II is incorrect: The General Assembly cannot constitutionally override a Security Council veto.",
    "Explains legal operation and limits of the UNSC veto."
))

add_u4(make_statement_question(
    CHAPTER_U4, "International Court of Justice Jurisdiction",
    "Only sovereign states can be parties in contentious cases before the International Court of Justice (ICJ).",
    "Private multinational corporations and individual private citizens can directly file lawsuits against foreign governments in the ICJ.",
    3, "C",
    "Statement I is correct: Under Article 34 of the ICJ Statute, only states may be parties in contentious cases. Statement II is incorrect: Individuals, NGOs, and private corporations cannot file cases before the ICJ.",
    "Identifies standing rules before the International Court of Justice."
))

add_u4(make_statement_question(
    CHAPTER_U4, "UN Peacekeeping Mandate",
    "United Nations peacekeeping operations are established by the Security Council and peacekeepers are provided on a voluntary basis by member states.",
    "The United Nations maintains its own standing global army of two million full-time soldiers stationed at its headquarters in New York.",
    3, "C",
    "Statement I is correct: Peacekeeping missions are mandated by the UNSC, with soldiers contributed by member countries. Statement II is completely false: The UN possesses no standing army of its own.",
    "Distinguishes voluntary peacekeeping contributions from non-existent UN standing army."
))

# Assertion Reason questions
add_u4(make_assertion_question(
    CHAPTER_U4, "India UNSC Claim",
    "India has consistently staked a claim for a permanent seat in an expanded United Nations Security Council.",
    "India is the world's most populous country, the largest democracy, an economic powerhouse, and historically one of the largest troop contributors to UN peacekeeping missions.",
    1, "A",
    "Both (A) and (R) are true, and (R) provides the core factual justifications underpinning India's permanent membership claim outlined in official diplomatic policy.",
    "Justifies India's candidature for a permanent seat in the UN Security Council."
))

add_u4(make_assertion_question(
    CHAPTER_U4, "UN Relevance Appraisal",
    "Despite its structural shortcomings and occasional paralysis, the United Nations remains an indispensable international organisation.",
    "In an interdependent globalised world, no single nation can address cross-border challenges like nuclear proliferation, epidemics, and climate change without multilateral cooperation.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains why the UN remains vital—global challenges inherently require a universal multilateral forum for coordinated international action.",
    "Validates multilateral necessity of the United Nations."
))

add_u4(make_assertion_question(
    CHAPTER_U4, "Veto Reform Obstacle",
    "Abolishing or diluting the veto power of the permanent five members of the UN Security Council is practically impossible to achieve legally.",
    "Under the United Nations Charter, any constitutional amendment to the Charter itself requires the affirmative ratification of all five permanent members.",
    1, "A",
    "Both (A) and (R) are true, and (R) explains the legal catch-22—under Article 108 of the Charter, any amendment must be ratified by all P5 members, who will veto any measure stripping them of their veto.",
    "Explains institutional deadlock surrounding UNSC veto reform."
))

# Multi statement questions
add_u4(make_multi_statement_question(
    CHAPTER_U4, "Kofi Annan 1997 Reform Criteria",
    "Which of the following criteria were proposed by UN Secretary-General Kofi Annan in 1997 for selecting new permanent and non-permanent members of the Security Council?",
    [
        ("A", "A major economic power"),
        ("B", "A major military power"),
        ("C", "A substantial contributor to the United Nations budget"),
        ("D", "A nation possessing at least 500 thermonuclear warheads")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Kofi Annan's 1997 criteria included: major economic power, major military power, substantial UN budget contributor, large population, respect for democracy/human rights, and representativeness of world diversity. Possession of nuclear warheads (D) was never a proposed criterion.",
    "Lists Kofi Annan's 1997 UNSC reform criteria."
))

add_u4(make_multi_statement_question(
    CHAPTER_U4, "UN General Assembly Competence",
    "Which of the following functions are entrusted to the United Nations General Assembly?",
    [
        ("A", "Electing the non-permanent members of the Security Council"),
        ("B", "Approving the annual budget of the United Nations Organisation"),
        ("C", "Appointing the Secretary-General upon recommendation of the Security Council"),
        ("D", "Authorising mandatory military invasions without consulting the Security Council")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements A, B, and C are core powers of the General Assembly under Articles 17, 23, and 97. D is false because Chapter VII enforcement measures and military authorizations are the exclusive prerogative of the Security Council.",
    "Defines powers and limitations of the UN General Assembly."
))

add_u4(make_multi_statement_question(
    CHAPTER_U4, "Criticisms of WTO",
    "Which of the following criticisms are commonly leveled against the World Trade Organisation (WTO)?",
    [
        ("A", "Major trade policies and agendas are dominated by powerful industrialised economies such as the US, EU, and Japan."),
        ("B", "Developing countries are frequently pressured to open their domestic markets while developed nations maintain agricultural subsidies."),
        ("C", "Decision-making processes in informal 'Green Room' meetings often lack transparency for developing members."),
        ("D", "The WTO operates its own global navy to seize merchant ships violating patent laws.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A, B, and C reflect standard criticisms of the WTO documented in NCERT. D is completely absurd as the WTO is an administrative body with no military enforcement assets.",
    "Evaluates developing nations' critique of the World Trade Organisation."
))

# Direct MCQs for Unit 4
u4_direct = [
    ("League of Nations Predecessor", "Which international organisation established in 1919 after World War I served as the immediate predecessor to the United Nations?",
     "The League of Nations", ["The Concert of Europe", "The Comintern", "The Warsaw Alliance"], "B",
     "The League of Nations was founded under the Treaty of Versailles in 1919 to maintain global peace, but failed to prevent the Second World War.", "Identifies League of Nations as predecessor to the UN."),
    ("Trusteeship Council Suspension", "The United Nations Trusteeship Council formally suspended its operations in 1994 following the independence of which last trust territory?",
     "Palau", ["Namibia", "Papua New Guinea", "Western Samoa"], "C",
     "The Trusteeship Council suspended active operations on 1 November 1994 following the independence of Palau, the last remaining UN trust territory.", "Identifies Palau and Trusteeship Council suspension."),
    ("UN Peacebuilding Commission", "At the 2005 World Summit, UN leaders agreed to establish which new body to assist countries emerging from violent conflict?",
     "The Peacebuilding Commission", ["The International Monetary Police", "The Nuclear Disarmament Army", "The Global Sanctions Tribunal"], "D",
     "The UN Peacebuilding Commission was created in December 2005 to mobilize resources and coordinate recovery in post-conflict zones.", "Identifies Peacebuilding Commission established in 2005."),
    ("Human Rights Council Creation", "In 2006, the United Nations General Assembly replaced the heavily criticised Commission on Human Rights with the newly created:",
     "United Nations Human Rights Council (UNHRC)", ["Amnesty International Council", "Global Rights Tribunal", "International Court of Human Rights"], "A",
     "The UN Human Rights Council was established by the General Assembly on 15 March 2006 to replace the old Commission on Human Rights.", "Identifies UNHRC created in 2006."),
    ("IAEA Establishment", "The International Atomic Energy Agency (IAEA) was established in 1957 following which famous speech by US President Dwight Eisenhower?",
     "'Atoms for Peace' speech", ["'Iron Curtain' speech", "'Four Freedoms' speech", "'Tryst with Destiny' speech"], "B",
     "Eisenhower delivered his 'Atoms for Peace' address to the UN General Assembly in 1953, proposing an international agency to promote peaceful nuclear energy, leading to IAEA's creation in 1957.", "Identifies Eisenhower's 'Atoms for Peace' speech."),
    ("WTO vs GATT", "The World Trade Organisation (WTO) was officially established on 1 January 1995, succeeding which historical trading arrangement?",
     "General Agreement on Tariffs and Trade (GATT)", ["Bretton Woods Currency Council", "UN Conference on Trade Monopolies", "International Clearing Union"], "C",
     "The WTO succeeded GATT (which was signed in 1947) following the conclusion of the 1986-1994 Uruguay Round negotiations in Marrakesh.", "Identifies GATT as predecessor to WTO."),
    ("Amnesty International Focus", "Amnesty International is an international non-governmental organisation (NGO) whose global campaign primarily focuses on:",
     "Advocating and defending human rights, and opposing torture and arbitrary imprisonment", ["Regulating international commercial shipping routes", "Distributing emergency food rations to high-income nations", "Supervising multi-currency foreign exchange markets"], "D",
     "Amnesty International campaigns for the release of prisoners of conscience, abolition of torture, and protection of universal human rights.", "Defines Amnesty International's core mission."),
    ("Human Rights Watch Role", "Human Rights Watch (HRW) is best known for its global contributions in:",
     "Investigating and drawing global media attention to human rights abuses across governments and armed groups", ["Deploying armed private mercenary contractors to civil wars", "Printing counterfeit currencies to destabilise dictatorships", "Operating deep-sea oil drilling platforms in Antarctica"], "A",
     "HRW conducts detailed investigative research on human rights abuses and conducts advocacy to hold abusers accountable.", "Defines Human Rights Watch role."),
    ("World Bank Founding", "The World Bank and the International Monetary Fund (IMF) were created in July 1944 at a historic conference held in:",
     "Bretton Woods, New Hampshire (USA)", ["Yalta, Soviet Union", "Potsdam, Germany", "Geneva, Switzerland"], "B",
     "The Bretton Woods Conference of July 1944 established the IMF and the International Bank for Reconstruction and Development (World Bank).", "Identifies Bretton Woods conference of 1944."),
    ("IMF Voting System", "Voting power within the International Monetary Fund (IMF) is determined by:",
     "The financial quota allocated to each member country based on its weight in the global economy", ["The total territorial land area of each member state", "Equal voting with each nation possessing exactly one vote", "The chronological date on which the nation entered the United Nations"], "C",
     "IMF voting weight is based on financial quotas contributed; major economies like the US, Japan, and Germany hold disproportionately high voting shares.", "Explains IMF quota-based voting power."),
    ("Dag Hammarskjold Death", "The second UN Secretary-General, Dag Hammarskjold, tragically died in 1961 in an air crash while on a peace mission to:",
     "The Congo (Africa)", ["Kashmir", "Cyprus", "Korea"], "D",
     "Dag Hammarskjold was killed in a plane crash on 18 September 1961 near Ndola, Northern Rhodesia (now Zambia), while attempting to broker a ceasefire in the Congo crisis.", "Identifies Dag Hammarskjold's death in the Congo mission."),
    ("First UN Secretary General", "Who served as the very first Secretary-General of the United Nations from 1946 to 1952?",
     "Trygve Lie of Norway", ["Dag Hammarskjold of Sweden", "U Thant of Burma", "Kurt Waldheim of Austria"], "A",
     "Trygve Lie, a Norwegian politician and lawyer, was elected the first UN Secretary-General in February 1946.", "Identifies Trygve Lie of Norway as first UN Secretary-General."),
    ("Kofi Annan Nobel Prize", "In 2001, the Nobel Peace Prize was jointly awarded to the United Nations and its Ghanaian Secretary-General:",
     "Kofi Annan", ["Boutros Boutros-Ghali", "Ban Ki-moon", "Antonio Guterres"], "B",
     "Kofi Annan and the United Nations were jointly awarded the 2001 Nobel Peace Prize for their work for a better organized and more peaceful world.", "Identifies Kofi Annan's 2001 Nobel Peace Prize."),
    ("Millennium Development Goals", "In September 2000, world leaders assembled at the UN Millennium Summit in New York to adopt which set of time-bound targets?",
     "Millennium Development Goals (MDGs)", ["Sustainable Oceans Compact", "Global Military Ceasefire Accord", "Washington Consensus Roadmap"], "C",
     "The Millennium Declaration adopted 8 Millennium Development Goals (MDGs) to eradicate extreme poverty, promote education, and combat disease by 2015.", "Identifies Millennium Development Goals 2000."),
    ("Responsibility to Protect Concept", "The diplomatic doctrine of 'Responsibility to Protect' (R2P) adopted at the 2005 UN World Summit affirms that:",
     "The international community has a duty to intervene when a sovereign government fails to protect its citizens from genocide and war crimes", ["Every nation has an unlimited right to attack its neighbours pre-emptively", "The United Nations must dissolve all national borders and establish world government", "Refugees should be legally banned from crossing sovereign boundaries"], "A",
     "R2P holds that sovereignty is a responsibility; if a state cannot or will not protect its people from mass atrocities, the international community must act through the UN.", "Defines Responsibility to Protect doctrine."),
    ("UN Secretariat Leadership", "The United Nations Secretariat is headed by the Secretary-General, who is appointed by:",
     "The General Assembly upon the recommendation of the Security Council", ["A secret referendum among all citizens of Europe", "The International Court of Justice judges", "The executive directors of the World Bank"], "B",
     "Under Article 97 of the UN Charter, the Secretary-General is appointed by the General Assembly on the recommendation of the Security Council.", "Details appointment mechanism of UN Secretary-General."),
    ("UN Democracy Fund", "The United Nations Democracy Fund (UNDEF), created at the 2005 World Summit, was heavily championed by which two nations as lead donors?",
     "India and the United States", ["Russia and North Korea", "China and Cuba", "France and Iran"], "A",
     "India and the United States were the primary co-founders and largest donors to the UN Democracy Fund established in 2005.", "Identifies India and US as founders of UN Democracy Fund."),
    ("Permanent Court of Arbitration", "The Permanent Court of Arbitration, established in 1899 to facilitate arbitration of international disputes, is located in:",
     "The Hague (Peace Palace)", ["Geneva", "Brussels", "Strasbourg"], "B",
     "The Permanent Court of Arbitration is based at the Peace Palace in The Hague, Netherlands.", "Identifies The Hague for Permanent Court of Arbitration."),
    ("UN Membership Today", "How many sovereign member states are currently represented in the United Nations General Assembly?",
     "193 member states", ["150 member states", "205 member states", "100 member states"], "C",
     "Following the admission of South Sudan in July 2011, the United Nations comprises 193 sovereign member states.", "Identifies 193 member states in the UN."),
    ("Holy See and Palestine Status", "What is the official status of the Holy See (Vatican City) and the State of Palestine in the United Nations?",
     "Non-member Permanent Observer States", ["Full permanent members with veto power", "Trust territories governed by the Secretariat", "Members of the Trusteeship Council only"], "D",
     "The Holy See and the State of Palestine hold non-member Permanent Observer State status in the UN General Assembly.", "Identifies observer status of Holy See and Palestine."),
    ("ECOSOC Membership", "How many member states are elected by the General Assembly to serve on the Economic and Social Council (ECOSOC)?",
     "54 member states serving for 3-year terms", ["15 member states serving for 1-year terms", "30 member states serving for 5-year terms", "100 member states serving permanently"], "A",
     "ECOSOC has 54 member states elected by the UN General Assembly for staggered three-year terms.", "Identifies 54 members in ECOSOC."),
    ("Universal Declaration of Human Rights", "The Universal Declaration of Human Rights (UDHR) was adopted by the UN General Assembly on:",
     "10 December 1948", ["24 October 1945", "15 August 1947", "1 January 1950"], "B",
     "The UDHR was adopted on 10 December 1948 in Paris, a date celebrated annually as International Human Rights Day.", "Identifies 10 December 1948 for UDHR."),
    ("World Bank Focus", "The International Bank for Reconstruction and Development (IBRD), commonly known as the World Bank, primarily provides loans to:",
     "Developing and middle-income countries for infrastructure, education, and health development projects", ["Private Wall Street hedge funds experiencing bankruptcy", "Rich European countries to fund space tourism", "Arms dealers to finance regional conflicts"], "C",
     "The World Bank works for poverty reduction by providing low-interest loans and grants to developing countries for human and physical capital development.", "Defines World Bank development lending focus."),
    ("ICJ Judge Bench", "How many judges comprise the bench of the International Court of Justice (ICJ), and for what term are they elected?",
     "15 judges elected for 9-year terms", ["9 judges elected for life", "25 judges elected for 4-year terms", "5 judges elected for 2-year terms"], "D",
     "The ICJ consists of 15 judges elected by the General Assembly and Security Council for nine-year terms, with one-third retiring every three years.", "Identifies ICJ bench size and tenure."),
    ("Boutros-Ghali Agenda for Peace", "Which UN Secretary-General issued the influential 1992 report titled 'An Agenda for Peace', outlining concepts of preventive diplomacy and post-conflict peacebuilding?",
     "Boutros Boutros-Ghali", ["Kurt Waldheim", "U Thant", "Javier Perez de Cuellar"], "A",
     "Boutros Boutros-Ghali published 'An Agenda for Peace' in 1992 following the end of the Cold War, revitalizing the UN's peacekeeping and peacebuilding mandates.", "Identifies Boutros Boutros-Ghali's 'An Agenda for Peace'."),
    ("Ban Ki-moon Nationality", "Ban Ki-moon, who served as the eighth UN Secretary-General from 2007 to 2016, is a diplomat from which country?",
     "South Korea", ["Japan", "Singapore", "Thailand"], "B",
     "Ban Ki-moon was the Minister of Foreign Affairs and Trade of the Republic of Korea (South Korea) prior to becoming UN Secretary-General.", "Identifies South Korea as Ban Ki-moon's native country."),
    ("Antonio Guterres Service", "Before becoming the ninth UN Secretary-General in 2017, Antonio Guterres served as:",
     "Prime Minister of Portugal and UN High Commissioner for Refugees (UNHCR)", ["President of the World Bank", "Chief Prosecutor of the International Criminal Court", "Secretary General of NATO"], "C",
     "Antonio Guterres was Prime Minister of Portugal (1995-2002) and served as UN High Commissioner for Refugees from 2005 to 2015.", "Identifies Antonio Guterres's background."),
    ("UNICEF Mandate", "The United Nations Children's Fund (UNICEF), established in 1946, has its global headquarters located in:",
     "New York, USA", ["Geneva, Switzerland", "Paris, France", "Rome, Italy"], "A",
     "UNICEF is headquartered in New York City, providing humanitarian and developmental aid to children worldwide.", "Identifies New York as UNICEF headquarters."),
    ("UNESCO Mandate", "Which specialized UN agency promotes international collaboration in education, science, culture, and communication, and designates World Heritage Sites?",
     "UNESCO", ["UNCTAD", "UNIDO", "UNDP"], "B",
     "UNESCO (headquartered in Paris) is dedicated to educational, scientific, cultural preservation, and intellectual cooperation.", "Identifies UNESCO."),
    ("WHO Smallpox Eradication", "In which year did the World Health Organisation (WHO) officially declare the global eradication of the deadly smallpox virus?",
     "1980", ["1965", "1995", "2005"], "C",
     "Following a worldwide vaccination campaign spearheaded by WHO, smallpox was certified as officially eradicated in May 1980.", "Recalls WHO smallpox eradication in 1980."),
    ("UN Charter Chapter VII", "Under which chapter of the United Nations Charter can the Security Council authorise economic sanctions or military enforcement action?",
     "Chapter VII", ["Chapter I", "Chapter V", "Chapter XIV"], "D",
     "Chapter VII of the UN Charter (Articles 39-51) grants the Security Council the authority to determine threats to peace and authorize sanctions or armed collective action.", "Identifies Chapter VII of the UN Charter."),
    ("Uniting for Peace Resolution", "The 'Uniting for Peace' Resolution (Resolution 377 A) adopted by the General Assembly in 1950 during the Korean War established that:",
     "If the Security Council is paralyzed by a veto during a breach of peace, the General Assembly can consider the matter immediately to recommend collective measures", ["The Secretary-General can dissolve any parliament that passes anti-UN laws", "Permanent members can be stripped of their veto if they fail to pay UN dues", "The General Assembly can draft all national budgets in wartime"], "A",
     "Resolution 377 A allows the General Assembly to meet in emergency special session when the Security Council is deadlocked by a veto to recommend collective action.", "Explains Uniting for Peace Resolution 1950."),
    ("UN Budget Assessment US", "Which country is legally assessed the largest individual contributor share of the regular United Nations budget, capped at 22 percent?",
     "United States", ["China", "Japan", "Germany"], "A",
     "The United States is assessed the ceiling rate of 22% of the UN regular budget, followed by China and Japan.", "Identifies the US as largest UN budget contributor."),
    ("G4 Nations UNSC Coalition", "The 'G4' coalition, comprising four nations that mutually support each other's bids for permanent seats in the UN Security Council, consists of:",
     "India, Brazil, Germany, and Japan", ["India, Pakistan, South Africa, and Egypt", "UK, France, Russia, and China", "Canada, Australia, New Zealand, and Singapore"], "A",
     "The G4 nations (India, Germany, Japan, and Brazil) advocate for UNSC reform and mutually support one another's permanent membership.", "Identifies G4 nations."),
    ("Uniting for Consensus Coffee Club", "The 'Uniting for Consensus' group (famously known as the 'Coffee Club') led by Italy and Pakistan primarily aims to:",
     "Oppose the creation of new permanent seats in the Security Council and advocate expanding only non-permanent seats", ["Demand that all 193 UN members receive individual veto power", "Abolish the United Nations and replace it with a European council", "Require all ambassadors to meet only in coffee houses"], "A",
     "The Coffee Club opposes new permanent seats for rivals (e.g. Pakistan opposes India, Italy opposes Germany) and proposes expanding elected non-permanent seats instead.", "Explains Coffee Club / Uniting for Consensus position."),
    ("First Indian Judge ICJ", "Who served as the distinguished first Indian judge on the International Court of Justice (ICJ) in 1952?",
     "Sir Benegal Narsing Rau (B.N. Rau)", ["Dr. Nagendra Singh", "Justice Dalveer Bhandari", "Justice P.N. Bhagwati"], "A",
     "Sir B.N. Rau, key constitutional advisor to the Constituent Assembly, was elected as a judge of the ICJ in 1952.", "Identifies B.N. Rau as first Indian judge at the ICJ."),
    ("Hansa Mehta UDHR", "Which Indian delegate played a pivotal role in the UN Human Rights Commission by ensuring Article 1 of the UDHR changed 'All men are born free and equal' to 'All human beings are born free and equal'?",
     "Hansa Mehta", ["Sarojini Naidu", "Vijaya Lakshmi Pandit", "Sucheta Kripalani"], "A",
     "Hansa Mehta championed gender equality, ensuring the universal phrasing 'all human beings' replaced 'all men' in the 1948 UDHR.", "Identifies Hansa Mehta's historic contribution to UDHR."),
    ("UNEP Headquarters", "The United Nations Environment Programme (UNEP), established following the 1972 Stockholm Conference, has its headquarters located in:",
     "Nairobi, Kenya", ["Geneva, Switzerland", "Vienna, Austria", "Bonn, Germany"], "A",
     "UNEP was established in 1972 with its headquarters in Nairobi, Kenya, making it the first UN agency based in the Global South.", "Identifies Nairobi as UNEP headquarters."),
    ("ICC Headquarters", "The International Criminal Court (ICC), established under the Rome Statute to prosecute individuals for genocide and war crimes, is situated in:",
     "The Hague, Netherlands", ["Geneva, Switzerland", "New York, USA", "Rome, Italy"], "A",
     "The ICC is an independent judicial body located in The Hague, Netherlands.", "Identifies The Hague as ICC seat."),
    ("WFP Headquarters", "The United Nations World Food Programme (WFP), which was awarded the Nobel Peace Prize in 2020, has its global headquarters in:",
     "Rome, Italy", ["Paris, France", "Geneva, Switzerland", "London, UK"], "A",
     "The World Food Programme, alongside the FAO and IFAD, is headquartered in Rome, Italy.", "Identifies Rome as WFP headquarters."),
    ("UNEF Suez 1956", "The first classic United Nations Emergency Force (UNEF I) peacekeeping mission was dispatched in 1956 to supervise the withdrawal of foreign forces from:",
     "The Suez Canal and Sinai (Egypt)", ["The Korean Peninsula", "The Kashmir Valley", "The Congo"], "A",
     "UNEF I was created in November 1956 by General Assembly Resolution 998 to supervise the cessation of hostilities during the Suez Crisis.", "Identifies Suez Canal Crisis for UNEF I deployment.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u4_direct:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u4(make_question(CHAPTER_U4, topic, stem, opts, c, s))

u4_qs = u4_qs[:60]
assert len(u4_qs) == 60, f"Expected 60 questions for Unit 4, got {len(u4_qs)}"
validate_and_collect(u4_qs, u4_seen)
print("Unit 4 validated: 60 unique questions.")

# Save unit files
with open("mock/pol_units/unit3.json", "w", encoding="utf-8") as f:
    json.dump(u3_qs, f, indent=2, ensure_ascii=False)
print("Wrote mock/pol_units/unit3.json (60 questions)")

with open("mock/pol_units/unit4.json", "w", encoding="utf-8") as f:
    json.dump(u4_qs, f, indent=2, ensure_ascii=False)
print("Wrote mock/pol_units/unit4.json (60 questions)")
