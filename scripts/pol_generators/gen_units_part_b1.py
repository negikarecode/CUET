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

for u in range(1, 8):
    p = f"mock/pol_units/unit{u}.json"
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            for item in json.load(f):
                global_seen.add(normalize_text(item.get("questionText", "")))

print(f"Loaded {len(global_seen)} questions from Units 1-7 into global_seen.")

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
# UNIT 8: Challenges of Nation Building (60 Questions)
# =================================================================================================
CHAPTER_U8 = "Challenges of Nation Building"
u8_qs = []
u8_seen = set()

def add_u8(q):
    u8_qs.append(q)

opts, c, s = rotate_options(
    "Shaping a united nation that was accommodating of the immense diversity of the country",
    ["Building an intercontinental ballistic missile defense shield", "Conquering neighbouring territories across the Indian Ocean", "Banning all regional languages and enforcing a single dialect"],
    "A",
    "The first and most immediate challenge immediately after independence was to shape a nation that was united yet deeply appreciative and accommodating of India's linguistic, regional, and cultural diversity.\nHence, Option {{CORR}} is correct.",
    "Identifies the first challenge of nation building as unity amidst diversity."
)
add_u8(make_question(CHAPTER_U8, "Three Challenges", "Which was the first and most immediate challenge faced by independent India among the three core nation-building challenges outlined in NCERT?", opts, c, s))

opts, c, s = rotate_options(
    "Instrument of Accession",
    ["Standstill Covenant", "Paramountcy Treaty", "Accession Charter"],
    "B",
    "Rulers of most princely states signed a formal legal document known as the 'Instrument of Accession', thereby agreeing that their state would become part of the Union of India.\nHence, Option {{CORR}} is correct.",
    "Identifies the Instrument of Accession."
)
add_u8(make_question(CHAPTER_U8, "Integration of Princely States", "What was the official legal title of the document signed by rulers of princely states consenting to join the Indian Union?", opts, c, s))

opts, c, s = rotate_options(
    "Manipur in June 1948",
    ["Travancore in August 1947", "Hyderabad in September 1948", "Mysore in January 1950"],
    "C",
    "The Maharaja of Manipur, Bodhchandra Singh, held legislative assembly elections in June 1948 based on universal adult franchise, making Manipur the first part of India to hold an election under adult suffrage.\nHence, Option {{CORR}} is correct.",
    "Identifies Manipur in June 1948 as first election under universal adult franchise."
)
add_u8(make_question(CHAPTER_U8, "Manipur Integration", "Which was the very first part of India to hold general elections based on universal adult franchise in June 1948?", opts, c, s))

opts, c, s = rotate_options(
    "Potti Sriramulu",
    ["Tanguturi Prakasam", "K. Kamaraj", "C. Rajagopalachari"],
    "D",
    "Potti Sriramulu, a veteran Gandhian leader, went on an indefinite hunger strike demanding a separate Andhra state for Telugu speakers, and died on 15 December 1952 after 56 days of fasting.\nHence, Option {{CORR}} is correct.",
    "Identifies Potti Sriramulu's 56-day fast unto death."
)
add_u8(make_question(CHAPTER_U8, "Creation of Andhra State", "Which veteran Gandhian leader died after a 56-day fast unto death demanding a separate Andhra state for Telugu-speaking people?", opts, c, s))

# Match questions for Unit 8
add_u8(make_match_question(
    CHAPTER_U8, "Princely States Integration",
    "Match List I (Princely State) with List II (Associated Ruler / Event):",
    [("A", "Hyderabad"), ("B", "Manipur"), ("C", "Junagadh"), ("D", "Kashmir")],
    [("I", "Nizam Mir Osman Ali Khan and Razakars militia"), ("II", "Maharaja Bodhchandra Singh and 1948 adult franchise election"), ("III", "Nawab fled to Pakistan following a popular revolt and plebiscite"), ("IV", "Maharaja Hari Singh signed Instrument of Accession in Oct 1947")],
    "A-I, B-II, C-III, D-IV", "A",
    "Hyderabad was ruled by Nizam Osman Ali Khan; Manipur by Maharaja Bodhchandra Singh; Junagadh's Nawab fled after plebiscite; Kashmir's Hari Singh signed accession in 1947.",
    "Matches princely states with rulers and historic accession circumstances."
))

add_u8(make_match_question(
    CHAPTER_U8, "State Reorganisation Timeline",
    "Match List I (State Created) with List II (Year of Formation):",
    [("A", "Andhra State"), ("B", "Maharashtra and Gujarat"), ("C", "Nagaland"), ("D", "Haryana and Punjab")],
    [("I", "1953"), ("II", "1960"), ("III", "1963"), ("IV", "1966")],
    "A-I, B-II, C-III, D-IV", "B",
    "Andhra state created in 1953; Bombay divided into Maharashtra and Gujarat in 1960; Nagaland created in 1963; Punjab divided into Punjab and Haryana in 1966.",
    "Matches creation of Indian states with official enactment years."
))

# Chronology questions for Unit 8
add_u8(make_sequence_question(
    CHAPTER_U8, "Reorganisation Milestones",
    "Arrange the following milestones in the reorganisation of Indian states in chronological order:",
    [("A", "Nagpur session of Congress recognizes linguistic principle for PCCs"), ("B", "Death of Potti Sriramulu following hunger strike"), ("C", "Appointment of the States Reorganisation Commission (SRC)"), ("D", "Passing of the States Reorganisation Act creating 14 states and 6 UTs")],
    "A, B, C, D", "C",
    "1. Nagpur Congress session (1920).\n2. Death of Potti Sriramulu (December 1952).\n3. SRC appointed (December 1953).\n4. States Reorganisation Act enacted (1956).",
    "Sequences events leading to the States Reorganisation Act 1956."
))

add_u8(make_sequence_question(
    CHAPTER_U8, "Partition and Accession Timeline",
    "Arrange the following historical events of 1947-1948 in chronological sequence:",
    [("A", "Mountbatten Plan announcing Partition of British India"), ("B", "Nehru's 'Tryst with Destiny' speech at midnight"), ("C", "Accession of Jammu and Kashmir following tribal invasion"), ("D", "Operation Polo police action integrating Hyderabad")],
    "A, B, C, D", "D",
    "1. Mountbatten Plan (3 June 1947).\n2. Tryst with Destiny speech (14-15 August 1947).\n3. Kashmir Accession (26 October 1947).\n4. Operation Polo in Hyderabad (September 1948).",
    "Sequences critical events of 1947-1948 nation building."
))

# Statement questions for Unit 8
add_u8(make_statement_question(
    CHAPTER_U8, "States Reorganisation Commission",
    "The States Reorganisation Commission (SRC) headed by Justice Fazal Ali recommended that state boundaries should reflect linguistic boundaries.",
    "The States Reorganisation Act of 1956 divided India into 50 tiny princely protectorates ruled by hereditary kings.",
    3, "C",
    "Statement I is correct: The SRC accepted language as the primary basis for redrawing provincial boundaries. Statement II is false: The 1956 Act reorganized India into 14 States and 6 Union Territories, completely eliminating princely status.",
    "Evaluates recommendations and outcome of the States Reorganisation Act 1956."
))

add_u8(make_statement_question(
    CHAPTER_U8, "Telangana Peasant Movement",
    "The peasant movement in the Telangana region of Hyderabad princely state was directed against the oppressive feudal rule of the Nizam and his landlords.",
    "The Razakars were a progressive, peaceful cultural organisation that promoted interfaith harmony across Hyderabad villages.",
    3, "C",
    "Statement I is correct: Peasants in Telangana revolted against the extortionate feudal Deshmukhs and the Nizam. Statement II is completely false: The Razakars were a fanatical communal paramilitary militia that unleashed murder, rape, and plunder against citizens.",
    "Characterizes the Telangana peasant uprising and the Razakars."
))

# Assertion Reason for Unit 8
add_u8(make_assertion_question(
    CHAPTER_U8, "Linguistic States Unity",
    "The creation of linguistic states did not lead to the disintegration of India as feared by some leaders; instead, it strengthened national unity.",
    "Drawing state boundaries on the basis of language accommodated regional identities and democratic aspirations without threatening the federal union.",
    1, "A",
    "Both (A) and (R) are true, and (R) explains why linguistic reorganisation succeeded—it fulfilled legitimate democratic and cultural aspirations, removing grievances that could have otherwise fueled separatism.",
    "Explains how linguistic federalism reinforced Indian national unity."
))

add_u8(make_assertion_question(
    CHAPTER_U8, "Patel's Princely States Integration",
    "Sardar Vallabhbhai Patel played a historic and masterly role in negotiating the integration of over 500 princely states into the Indian Union.",
    "The British colonial government mandated that all princely states must unconditionally and automatically merge into the Indian republic upon British withdrawal.",
    3, "C",
    "Assertion (A) is true: Patel's diplomacy and firmness united the princely states. Reason (R) is false: The British lapse of paramountcy left rulers legally free to join India, Pakistan, or remain independent, creating a grave threat of balkanisation.",
    "Highlights Sardar Patel's diplomatic feat amidst British legal lapse of paramountcy."
))

# Multi statement for Unit 8
add_u8(make_multi_statement_question(
    CHAPTER_U8, "Partition Tragedies",
    "Which of the following tragedies occurred during the Partition of British India in 1947?",
    [
        ("A", "Mass communal slaughter and displacement affecting an estimated 80 lakh refugees"),
        ("B", "Abduction, forced conversions, and systemic sexual violence against thousands of women"),
        ("C", "Division of government assets, police forces, financial reserves, and even office stationery and railway wagons"),
        ("D", "Unanimous celebratory peace parades held jointly by all political parties across Lahore and Delhi")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements A, B, and C depict the painful historical realities of Partition documented in NCERT. D is completely false as Partition was marked by horrific communal violence and grief.",
    "Recalls multi-faceted human and administrative dimensions of Partition."
))

add_u8(make_multi_statement_question(
    CHAPTER_U8, "States Reorganisation Commission Members",
    "Which of the following distinguished figures were appointed to the three-member States Reorganisation Commission (SRC) in December 1953?",
    [
        ("A", "Justice Fazal Ali (Chairman)"),
        ("B", "H.N. Kunzru (Member)"),
        ("C", "K.M. Panikkar (Member)"),
        ("D", "Lord Mountbatten (Chief Advisor)")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "The three members of the SRC were Justice Fazal Ali, H.N. Kunzru, and K.M. Panikkar. Mountbatten was not a member.",
    "Lists members of the States Reorganisation Commission."
))

# Direct MCQs for Unit 8
u8_direct = [
    ("Tryst with Destiny Speech", "Jawaharlal Nehru delivered his famous 'Tryst with Destiny' speech at the midnight hour of 14-15 August 1947 addressing:",
     "The Constituent Assembly of India", ["The United Nations General Assembly", "The British House of Commons", "A mass rally at the Red Fort in Delhi"], "A",
     "Nehru addressed the special midnight session of the Constituent Assembly on 14-15 August 1947 with his immortal 'Tryst with Destiny' speech.", "Identifies Constituent Assembly as venue of 'Tryst with Destiny' speech."),
    ("Two Nation Theory Advocate", "The 'Two-Nation Theory', asserting that India consisted of two distinct nations (Hindus and Muslims), was officially advanced by:",
     "The Muslim League led by Muhammad Ali Jinnah", ["The Indian National Congress led by Mahatma Gandhi", "The Communist Party of India", "The Dravida Kazhagam"], "A",
     "The Muslim League advanced the Two-Nation Theory to demand the creation of Pakistan as a separate homeland for Muslims.", "Identifies Muslim League advocating Two-Nation Theory."),
    ("Congress Rejection Two Nation", "What was the official position of the Indian National Congress regarding the Two-Nation Theory?",
     "Congress categorically rejected the theory, affirming that India is a secular nation belonging equally to all communities", ["Congress embraced the theory and initiated the partition of provinces", "Congress demanded that India be declared a single-religion theocratic state", "Congress boycotted the Constituent Assembly in protest"], "A",
     "Congress and national leaders like Gandhi and Nehru rejected the communal two-nation premise, insisting on secular democratic citizenship.", "States Congress opposition to Two-Nation Theory."),
    ("Radcliffe Line Boundary", "The boundary commission that demarcated the international frontiers partitioning Punjab and Bengal was headed by:",
     "Sir Cyril Radcliffe", ["Lord Mountbatten", "Sir Stafford Cripps", "Lord Pethick-Lawrence"], "A",
     "Sir Cyril Radcliffe, a British lawyer, chaired the two boundary commissions for Punjab and Bengal, drawing the Radcliffe Line in August 1947.", "Identifies Sir Cyril Radcliffe."),
    ("Travancore Independence Threat", "Which was the very first princely state whose Dewan announced an intention to declare independence from India in 1947?",
     "Travancore (under Dewan C.P. Ramaswamy Aiyar)", ["Hyderabad", "Bhopal", "Gwalior"], "A",
     "The Dewan of Travancore announced independence in June 1947, followed by the Nizam of Hyderabad, before Sardar Patel resolved the crisis.", "Identifies Travancore's initial independence announcement."),
    ("Number of Princely States", "Approximately how many princely states covered about one-third of the land area and one-fourth of the population of British India on the eve of independence?",
     "565 princely states", ["100 princely states", "1,200 princely states", "50 princely states"], "A",
     "British India comprised directly ruled provinces alongside 565 autonomous princely states governed by hereditary princes under British paramountcy.", "Specifies 565 princely states on eve of independence."),
    ("Operation Polo Hyderabad", "The military police action launched by the Government of India in September 1948 to integrate the princely state of Hyderabad was code-named:",
     "Operation Polo", ["Operation Vijay", "Operation Cactus", "Operation Blue Star"], "A",
     "Operation Polo was executed from 13 to 18 September 1948, leading to the surrender of the Nizam's forces and the Razakars.", "Identifies Operation Polo in Hyderabad."),
    ("Standstill Agreement Hyderabad", "In November 1947, the Nizam of Hyderabad signed which temporary agreement with the Government of India for one year while negotiations continued?",
     "Standstill Agreement", ["Permanent Accession Treaty", "Confederation Charter", "Neutrality Pact"], "A",
     "The Nizam signed a one-year Standstill Agreement on 29 November 1947 to maintain the status quo while final accession terms were discussed.", "Identifies 1947 Standstill Agreement with Hyderabad."),
    ("Bodhchandra Singh Merger", "The Maharaja of Manipur who signed the Merger Agreement with the Indian Union in September 1949 amidst local controversy was:",
     "Maharaja Bodhchandra Singh", ["Maharaja Hari Singh", "Maharaja Yadavindra Singh", "Maharaja Martand Singh"], "A",
     "Maharaja Bodhchandra Singh signed the Merger Agreement on 21 September 1949 in Shillong, integrating Manipur directly into India.", "Identifies Bodhchandra Singh in Manipur merger."),
    ("Junagadh Accession Plebiscite", "How was the accession of the princely state of Junagadh to the Indian Union definitively confirmed in February 1948?",
     "Through a democratic plebiscite where over 99% of the voters chose to join India", ["Through a military invasion led by the British Navy", "Through a decree issued by the King of Nepal", "Through a monetary auction supervised by the World Bank"], "A",
     "Following the Nawab's flight to Pakistan, a free plebiscite was conducted on 20 February 1948, resulting in an overwhelming mandate to join India.", "Explains Junagadh plebiscite in 1948."),
    ("Kashmir Tribal Invasion", "In October 1947, Pakistan sent armed tribal infiltrators backed by its regular army into Jammu and Kashmir, compelling Maharaja Hari Singh to:",
     "Sign the Instrument of Accession to India in exchange for immediate military assistance", ["Surrender all state territory to the United Nations", "Declare Kashmir a permanent satellite of the Soviet Union", "Abolish the Dogra dynasty and resign immediately"], "A",
     "Faced with the fall of Srinagar to tribal raiders, Maharaja Hari Singh signed the Instrument of Accession on 26 October 1947, prompting Indian troops to airlift into Srinagar.", "Explains Kashmir accession crisis of October 1947."),
    ("Article 370 Background", "Which special article was incorporated into the Indian Constitution in 1949 to grant temporary special autonomy to Jammu and Kashmir?",
     "Article 370", ["Article 356", "Article 352", "Article 360"], "A",
     "Article 370 was drafted to govern the constitutional relationship between the Union of India and Jammu and Kashmir.", "Identifies Article 370."),
    ("Andhra State Creation Date", "The separate state of Andhra for Telugu-speaking people was officially formed in:",
     "October 1953", ["January 1950", "November 1956", "May 1960"], "A",
     "Prime Minister Nehru announced the decision in December 1952, and Andhra State was formally carved out of Madras State on 1 October 1953.", "Identifies October 1953 creation of Andhra State."),
    ("SRC Act 1956 States and UTs", "The States Reorganisation Act enacted in November 1956 established how many States and Union Territories?",
     "14 States and 6 Union Territories", ["28 States and 8 Union Territories", "20 States and 10 Union Territories", "10 States and 2 Union Territories"], "A",
     "The 1956 Act redrew internal borders to create 14 linguistic states and 6 centrally administered union territories.", "Identifies 14 States and 6 UTs created in 1956."),
    ("Bombay State Bifurcation", "In 1960, bilingual Bombay State was bifurcated into which two linguistic states following intense public agitation?",
     "Maharashtra (for Marathi speakers) and Gujarat (for Gujarati speakers)", ["Punjab and Haryana", "Karnataka and Kerala", "Madhya Pradesh and Chhattisgarh"], "A",
     "The Samyukta Maharashtra and Mahagujarat movements led to the bifurcation of Bombay state on 1 May 1960.", "Identifies Maharashtra and Gujarat creation in 1960."),
    ("Punjab Trifurcation 1966", "In 1966, the composite state of Punjab was reorganised to create:",
     "Punjab (for Punjabi speakers), Haryana (for Hindi speakers), and Himachal Pradesh as a Union Territory", ["Rajasthan, Gujarat, and Punjab", "Jammu, Kashmir, and Ladakh", "Delhi, Punjab, and Uttarakhand"], "A",
     "Under the Punjab Reorganisation Act 1966, Punjab and Haryana became separate states, with Chandigarh as a joint capital and UT.", "Describes 1966 Punjab-Haryana reorganisation."),
    ("North-East Reorganisation 1972", "Major statehood reorganisation in the North-East in 1972 elevated which units to full statehood?",
     "Meghalaya, Manipur, and Tripura", ["Nagaland, Mizoram, and Sikkim", "Assam, Arunachal Pradesh, and Bhutan", "Sikkim, Darjeeling, and Cooch Behar"], "A",
     "In 1972, the North-Eastern Areas (Reorganisation) Act granted statehood to Meghalaya, Manipur, and Tripura.", "Identifies 1972 North-East statehood enactments."),
    ("Year 2000 New States", "In November 2000, three new states were carved out of existing states: Chhattisgarh, Uttarakhand, and Jharkhand, bifurcated from:",
     "Madhya Pradesh, Uttar Pradesh, and Bihar respectively", ["Maharashtra, Rajasthan, and West Bengal", "Punjab, Haryana, and Himachal Pradesh", "Andhra Pradesh, Karnataka, and Odisha"], "A",
     "In 2000, Chhattisgarh was carved from Madhya Pradesh, Uttarakhand from Uttar Pradesh, and Jharkhand from Bihar.", "Identifies parent states of Chhattisgarh, Uttarakhand, and Jharkhand."),
    ("Telangana Formation 2014", "Telangana officially became the 29th state of the Indian Union on 2 June 2014, carved out of which state?",
     "Andhra Pradesh", ["Karnataka", "Tamil Nadu", "Maharashtra"], "A",
     "Telangana was bifurcated from Andhra Pradesh on 2 June 2014 following decades of regional agitation.", "Identifies Andhra Pradesh as parent state of Telangana."),
    ("Goa Liberation 1961", "Goa, Daman, and Diu were liberated from Portuguese colonial rule and integrated into the Indian Union in December 1961 through:",
     "Operation Vijay", ["Operation Polo", "Operation Blue Star", "Operation Meghdoot"], "A",
     "Indian armed forces executed Operation Vijay on 18-19 December 1961, ending 451 years of Portuguese colonial enclave rule in Goa.", "Identifies Operation Vijay for Goa liberation."),
    ("Sikkim Merger 1975", "Sikkim was integrated into the Indian Union as a full-fledged 22nd state in 1975 through which constitutional amendment?",
     "36th Constitutional Amendment Act, 1975", ["42nd Constitutional Amendment Act, 1976", "44th Constitutional Amendment Act, 1978", "1st Constitutional Amendment Act, 1951"], "A",
     "The 36th Amendment Act of 1975 repealed associate state status and made Sikkim a full state of India following a referendum.", "Identifies 36th Amendment for Sikkim's merger."),
    ("Nagpur Congress Linguistic Pledge", "At which famous annual session in 1920 did the Indian National Congress formally commit to reorganising provinces on a linguistic basis?",
     "Nagpur Session of December 1920", ["Lahore Session of 1929", "Karachi Session of 1931", "Belgaum Session of 1924"], "A",
     "At the 1920 Nagpur session under Gandhi's leadership, Congress reorganized its provincial committees (PCCs) on linguistic lines.", "Identifies 1920 Nagpur Congress session."),
    ("VP Menon Patel Associate", "Which senior civil servant served as the Secretary of the Ministry of States, working alongside Sardar Patel to negotiate princely integration?",
     "V.P. Menon", ["Sukumar Sen", "Sir B.N. Rau", "K.P.S. Menon"], "A",
     "V.P. Menon was Sardar Patel's indispensable right-hand administrative diplomat in negotiating the integration of princely states.", "Identifies V.P. Menon."),
    ("Gandhi Assassination Date", "Mahatma Gandhi was assassinated by Nathuram Godse in New Delhi on:",
     "30 January 1948", ["15 August 1947", "26 January 1950", "2 October 1948"], "A",
     "Mahatma Gandhi was shot at Birla House on 30 January 1948 while heading to his evening prayer meeting.", "Identifies 30 January 1948 for Gandhi's assassination."),
    ("RSS Ban 1948", "Following the tragic assassination of Mahatma Gandhi in January 1948, the Government of India banned which organization for over a year?",
     "Rashtriya Swayamsevak Sangh (RSS)", ["Indian National Congress", "Communist Party of India", "Dravida Munnetra Kazhagam"], "A",
     "The Union Home Ministry banned the RSS in February 1948 to suppress communal hatred, lifting the ban in July 1949 after unconditional assurances.", "Recalls 1948 ban on RSS."),
    ("Faiz Ahmed Faiz Partition Poet", "Which renowned Urdu poet wrote the iconic melancholic Partition poem 'Subh-e-Azadi' ('Dawn of Freedom') expressing grief over independence?",
     "Faiz Ahmed Faiz", ["Allama Iqbal", "Mirza Ghalib", "Sahir Ludhianvi"], "A",
     "Faiz Ahmed Faiz composed 'Subh-e-Azadi' in August 1947, mourning the tragedy of partition with the famous line 'Ye daag daag ujala, ye shab-gazida sahar'.", "Identifies Faiz Ahmed Faiz and 'Subh-e-Azadi'."),
    ("Amrita Pritam Poem", "Which celebrated Punjabi writer and poetess captured the agony of Partition in her haunting poem addressed to Waris Shah ('Ajj Aakhaan Waris Shah Nu')?",
     "Amrita Pritam", ["Mahadevi Verma", "Ismat Chughtai", "Sarojini Naidu"], "A",
     "Amrita Pritam wrote 'Ajj Aakhaan Waris Shah Nu' while traveling as a refugee from Lahore to Dehradun in 1947.", "Identifies Amrita Pritam."),
    ("Privy Purse Concept", "The financial pension and privileges guaranteed to the former hereditary rulers of princely states under the integration accords were known as:",
     "Privy Purse", ["Crown Subsidies", "Royal Annuity", "Dynastic Reparations"], "A",
     "The Privy Purse was a constitutional grant paid to former princes in consideration of surrendering their ruling powers and territories.", "Defines Privy Purse."),
    ("Privy Purse Abolition", "The Privy Purses and royal privileges of the former princes were constitutionally abolished in 1971 under Indira Gandhi through the:",
     "26th Constitutional Amendment Act, 1971", ["42nd Constitutional Amendment Act, 1976", "24th Constitutional Amendment Act, 1971", "44th Constitutional Amendment Act, 1978"], "A",
     "The 26th Amendment of 1971 derecognized all former rulers and abolished Privy Purses to promote social and constitutional equality.", "Identifies 26th Amendment abolishing Privy Purses."),
    ("Refugee Rehabilitation Ministry", "Which dedicated central government ministry was established immediately after Partition to oversee the settlement and housing of millions of refugees?",
     "Ministry of Relief and Rehabilitation", ["Ministry of Home Affairs", "Ministry of Planning", "Ministry of Social Justice"], "A",
     "The Ministry of Relief and Rehabilitation was created in September 1947 to organize refugee transit camps, ration distributions, and permanent housing colonies.", "Identifies Ministry of Relief and Rehabilitation.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u8_direct:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u8(make_question(CHAPTER_U8, topic, stem, opts, c, s))

# Extra questions for Unit 8 to guarantee 60
u8_extras = [
    ("Bhopal Accession", "The Nawab of Bhopal, Hamidullah Khan, initially opposed joining the Indian Constituent Assembly because:",
     "He wished to maintain Bhopal as an independent princely state and led the Chamber of Princes in resisting merger", ["He wanted to merge Bhopal with France", "He demanded that Bhopal become a naval naval port", "He refused to pay Indian income taxes"], "A",
     "Nawab Hamidullah Khan of Bhopal was Chancellor of the Chamber of Princes and championed princely independence before signing accession in 1949.", "Identifies Nawab of Bhopal resisting merger."),
    ("Telangana Armed Struggle CPI", "Which political party led and coordinated the peasant armed struggle in the Telangana region of Hyderabad from 1946 to 1951?",
     "The Communist Party of India (CPI)", ["The Bharatiya Jana Sangh", "The Swatantra Party", "The Muslim League"], "A",
     "The Telangana armed peasant uprising against the Nizam and feudal Deshmukhs was organized and led by the Communist Party of India.", "Identifies CPI leading Telangana peasant struggle."),
    ("Kashmir Special Status Article 35A", "Article 35A, added to the Constitution in 1954 via Presidential Order, empowered the Jammu and Kashmir state legislature to:",
     "Define 'permanent residents' of the state and confer special rights regarding government employment and property purchase", ["Establish a nuclear weapon laboratory in Leh", "Sign international trade treaties without Indian cabinet approval", "Appoint foreign ambassadors to the United Nations"], "A",
     "Article 35A allowed the J&K legislature to define permanent residents and regulate land ownership and public employment privileges.", "Explains provisions of Article 35A."),
    ("Linguistic Diversity Tolerance", "Why was India's decision to preserve linguistic diversity celebrated as a triumph for democratic nation-building?",
     "Because it demonstrated that unity does not require cultural uniformity, and multiple linguistic identities can coexist harmoniously within a single federation", ["Because it required all citizens to learn six languages every week", "Because it allowed state governments to print their own separate currencies", "Because it abolished all central government powers permanently"], "A",
     "Accommodating linguistic diversity through linguistic federalism proved that unity in diversity is stronger than forced assimilation.", "Explains theoretical significance of linguistic federalism in India."),
    ("Nagaland Statehood Creation", "Nagaland was carved out of Assam and inaugurated as a separate state in December 1963 primarily to:",
     "Appease armed Naga separatist agitation and fulfill political accords with moderate Naga leaders", ["Build a spaceport along the Myanmar border", "Grow tea plantations for export to the Soviet Union", "Establish a Hindi-language central university"], "A",
     "Statehood was granted to Nagaland in 1963 to address ethnic aspirations and bring moderate Naga factions into the constitutional mainstream.", "Explains creation of Nagaland in 1963."),
    ("J&K Constituent Assembly", "Jammu and Kashmir drafted its own separate state constitution through a state Constituent Assembly that functioned between:",
     "1951 and 1956", ["1947 and 1948", "1965 and 1971", "1980 and 1985"], "A",
     "The J&K Constituent Assembly framed the state constitution between 1951 and 1956, dissolving itself after adopting the constitution in January 1957.", "Recalls J&K Constituent Assembly tenure."),
    ("Delhi Reorganisation Status", "Under the 69th Constitutional Amendment Act of 1991, the Union Territory of Delhi was officially redesignated as the:",
     "National Capital Territory (NCT) of Delhi with a legislative assembly", ["Separate sovereign princely state", "Permanent military headquarters zone", "Direct British crown colony"], "A",
     "The 69th Amendment created the Legislative Assembly of Delhi and designated Delhi as the National Capital Territory.", "Identifies 69th Amendment and NCT of Delhi."),
    ("Integration of Chandernagore", "The French colonial enclave of Chandernagore near Calcutta was integrated into West Bengal following a plebiscite in:",
     "May 1950", ["August 1947", "October 1965", "January 1980"], "A",
     "Chandernagore voted in a popular referendum in 1949 to join India, being formally transferred by France to India in May 1950.", "Identifies French handover of Chandernagore."),
    ("French Enclaves Integration", "The French colonial territories of Pondicherry, Karikal, Mahe, and Yanam were formally handed over to the Indian Union under a treaty signed in:",
     "1954", ["1947", "1962", "1975"], "A",
     "France de facto transferred administration of its four remaining Indian enclaves (Pondicherry, Karikal, Mahe, Yanam) to India in November 1954.", "Identifies 1954 transfer of French enclaves."),
    ("SRC Report Year", "In which year did the States Reorganisation Commission (SRC) formally submit its landmark comprehensive report to the Government of India?",
     "September 1955", ["August 1947", "December 1950", "January 1960"], "A",
     "The SRC submitted its historic report on 30 September 1955, leading directly to the States Reorganisation Act 1956.", "Identifies September 1955 for SRC report submission."),
    ("Boundary Commission Setup", "The two Boundary Commissions for Punjab and Bengal established in June 1947 each consisted of:",
     "Four judges nominated equally by the Congress and Muslim League, chaired by Sir Cyril Radcliffe", ["Ten British army generals", "Only United Nations international observers", "Members of the Chamber of Princes"], "A",
     "Each commission comprised two Congress-nominated and two Muslim League-nominated high court judges, with Radcliffe casting deciding votes.", "Details composition of 1947 Boundary Commissions."),
    ("Kashmir Standstill Offer", "In August 1947, Maharaja Hari Singh offered a Standstill Agreement to both India and Pakistan; how did Pakistan respond?",
     "Pakistan signed the Standstill Agreement with Kashmir immediately, while India delayed asking for further negotiations", ["Pakistan rejected it and invaded Jammu city the same night", "Pakistan merged its government with Kashmir", "Pakistan referred the treaty to the Soviet Union"], "A",
     "Pakistan signed the Standstill Agreement in August 1947, but subsequently organized an armed economic blockade and tribal invasion.", "Explains Pakistan signing Standstill Agreement with Kashmir."),
    ("Junagadh Vassal States", "Which two small feudatory states under the Nawab of Junagadh declared their accession to India in 1947, provoking military tensions?",
     "Mangrol and Babariawad", ["Bhopal and Gwalior", "Baroda and Rajkot", "Travancore and Cochin"], "A",
     "Mangrol and Babariawad acceded to India, and when Junagadh troops occupied them, Indian armed forces intervened.", "Identifies Mangrol and Babariawad in Junagadh conflict."),
    ("Mahagujarat Movement Leader", "The Mahagujarat movement that demanded a separate state for Gujarati speakers from bilingual Bombay state was led by:",
     "Indulal Yagnik", ["Sardar Vallabhbhai Patel", "Morarji Desai", "K.M. Munshi"], "A",
     "Indulal Yagnik founded the Mahagujarat Janata Parishad in 1956, leading the popular agitation that achieved statehood for Gujarat in 1960.", "Identifies Indulal Yagnik leading Mahagujarat movement."),
    ("Samyukta Maharashtra Samiti", "Which united front of political parties and writers led the mass movement for the creation of Maharashtra with Bombay as its capital?",
     "Samyukta Maharashtra Samiti", ["Shiv Sena", "Maharashtra Navnirman Sena", "Bombay Citizen Council"], "A",
     "The Samyukta Maharashtra Samiti, led by leaders like S.M. Joshi, S.A. Dange, and Acharya Atre, spearheaded the struggle for Maharashtra statehood.", "Identifies Samyukta Maharashtra Samiti."),
    ("Shillong Accord 1975", "The Shillong Accord was signed in November 1975 between the Government of India and representatives of which underground group?",
     "Underground Naga leaders (Naga National Council)", ["Mizo National Front", "All Assam Students Union", "Tripura Upajati Juba Samiti"], "A",
     "The Shillong Accord of November 1975 was signed by underground Naga leaders who agreed to surrender arms and accept the Indian Constitution.", "Identifies 1975 Shillong Accord with Naga underground leaders.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u8_extras:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u8(make_question(CHAPTER_U8, topic, stem, opts, c, s))

u8_qs = u8_qs[:60]
assert len(u8_qs) == 60, f"Expected 60 questions for Unit 8, got {len(u8_qs)}"
validate_and_collect(u8_qs, u8_seen)
print("Unit 8 validated: 60 unique questions.")


# =================================================================================================
# UNIT 9: Era of One-Party Dominance (40 Questions)
# =================================================================================================
CHAPTER_U9 = "Era of One-Party Dominance"
u9_qs = []
u9_seen = set()

def add_u9(q):
    u9_qs.append(q)

opts, c, s = rotate_options(
    "Sukumar Sen",
    ["T.N. Seshan", "K.V.K. Sundaram", "Dr. B.R. Ambedkar"],
    "A",
    "Sukumar Sen, an Indian Civil Service (ICS) officer, was appointed the first Chief Election Commissioner of India in March 1950 and conducted the historic 1951-52 general elections.\nHence, Option {{CORR}} is correct.",
    "Identifies Sukumar Sen as first Chief Election Commissioner."
)
add_u9(make_question(CHAPTER_U9, "Election Commission", "Who was appointed as the very first Chief Election Commissioner (CEC) of independent India in March 1950?", opts, c, s))

opts, c, s = rotate_options(
    "First-Past-The-Post (FPTP) simple plurality electoral system",
    ["Proportional Representation with Single Transferable Vote", "Electoral College system based on landownership", "Two-round runoff system requiring 50% absolute majority"],
    "B",
    "Under the First-Past-The-Post electoral system, Congress won over 70% of the Lok Sabha seats despite winning around 45% of the popular vote, as non-Congress opposition votes were fragmented.\nHence, Option {{CORR}} is correct.",
    "Explains how FPTP magnified Congress seat share in early elections."
)
add_u9(make_question(CHAPTER_U9, "Nature of Congress Dominance", "Which feature of the Indian electoral system enabled the Congress party to win an overwhelming majority of parliamentary seats with approximately 45% of the popular vote?", opts, c, s))

opts, c, s = rotate_options(
    "Communist Party of India (CPI) in Kerala under E.M.S. Namboodiripad",
    ["Bharatiya Jana Sangh in Uttar Pradesh under Shyama Prasad Mukherjee", "Praja Socialist Party in Bihar under Jayaprakash Narayan", "Swatantra Party in Gujarat under C. Rajagopalachari"],
    "C",
    "In the 1957 state assembly elections, the Communist Party of India won 60 out of 126 seats in Kerala and formed the world's first democratically elected communist government with independent support, led by E.M.S. Namboodiripad.\nHence, Option {{CORR}} is correct.",
    "Identifies 1957 Kerala CPI government led by E.M.S. Namboodiripad."
)
add_u9(make_question(CHAPTER_U9, "First Non-Congress Government", "In 1957, which political party made global history by forming the first democratically elected non-Congress government in an Indian state?", opts, c, s))

opts, c, s = rotate_options(
    "C. Rajagopalachari (Rajaji)",
    ["Acharya Narendra Deva", "Deen Dayal Upadhyaya", "A.K. Gopalan"],
    "D",
    "The Swatantra Party was formed in August 1959 by C. Rajagopalachari (the first Indian Governor-General), advocating free enterprise, opposition to license-permit raj, and private property rights.\nHence, Option {{CORR}} is correct.",
    "Identifies C. Rajagopalachari founding the Swatantra Party in 1959."
)
add_u9(make_question(CHAPTER_U9, "Swatantra Party", "Who among the following veteran leaders founded the Swatantra Party in August 1959 to champion free market enterprise and oppose state socialism?", opts, c, s))

# Match question for Unit 9
add_u9(make_match_question(
    CHAPTER_U9, "Early Opposition Parties",
    "Match List I (Opposition Party) with List II (Key Founder / Leader):",
    [("A", "Socialist Party"), ("B", "Bharatiya Jana Sangh"), ("C", "Communist Party of India"), ("D", "Swatantra Party")],
    [("I", "Acharya Narendra Deva and Jayaprakash Narayan"), ("II", "Shyama Prasad Mukherjee and Deen Dayal Upadhyaya"), ("III", "A.K. Gopalan and E.M.S. Namboodiripad"), ("IV", "C. Rajagopalachari and Minoo Masani")],
    "A-I, B-II, C-III, D-IV", "A",
    "Socialists led by Narendra Deva and JP; Jana Sangh by Shyama Prasad Mukherjee; CPI by A.K. Gopalan and EMS; Swatantra by Rajaji and Masani.",
    "Matches early political parties with their primary founders."
))

# Chronology question for Unit 9
add_u9(make_sequence_question(
    CHAPTER_U9, "First Three Elections Timeline",
    "Arrange the following milestones of Indian democratic elections in chronological sequence:",
    [("A", "First General Elections held under universal adult franchise"), ("B", "Second General Elections and communist victory in Kerala"), ("C", "Imposition of Article 356 dismissing Kerala communist ministry"), ("D", "Third General Elections returning Nehru's Congress to power")],
    "A, B, C, D", "B",
    "1. First General Elections (October 1951 - February 1952).\n2. Second General Elections (1957).\n3. Dismissal of Kerala ministry under Article 356 (July 1959).\n4. Third General Elections (1962).",
    "Sequences major milestones of the era of one-party dominance."
))

# Statement question for Unit 9
add_u9(make_statement_question(
    CHAPTER_U9, "Congress Social Coalition",
    "The Congress party functioned as a broad social and ideological umbrella coalition accommodating diverse social classes, ideologies, and interest groups.",
    "During the first three general elections, the Congress constitution banned internal factions and expelled anyone who expressed differing political views.",
    3, "C",
    "Statement I is correct: Rajni Kothari noted that Congress was an open umbrella coalition. Statement II is false: Congress's internal strength came from its tolerance of internal factions, which acted as an internal balancing system.",
    "Evaluates Congress as an ideological coalition with an internal factional system."
))

# Assertion Reason for Unit 9
add_u9(make_assertion_question(
    CHAPTER_U9, "First Election Gamble",
    "An Indian editor called the 1951-52 general elections 'the biggest gamble in history'.",
    "Universal adult franchise had never been tested on such a colossal scale in a poor, predominantly illiterate country with over 17 crore eligible voters.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains why it was viewed as a massive gamble—Western skeptics believed democracy could only function in wealthy, literate Western nations.",
    "Explains why the first general election was described as the biggest gamble in history."
))

# Multi statement for Unit 9
add_u9(make_multi_statement_question(
    CHAPTER_U9, "Bharatiya Jana Sangh Ideology",
    "Which of the following were core ideological tenets of the Bharatiya Jana Sangh founded in 1951?",
    [
        ("A", "Advocating 'One country, One nation, and One culture'"),
        ("B", "Calling for the reunification of India and Pakistan into an 'Akhand Bharat'"),
        ("C", "Advocating the replacement of English by Hindi as the sole official language"),
        ("D", "Demanding the complete abolition of all private property and establishing Soviet communes")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements A, B, and C are core Jana Sangh principles per NCERT. Statement D is completely false as the Jana Sangh supported private enterprise and opposed communist collectivisation.",
    "Lists fundamental ideological principles of the Bharatiya Jana Sangh."
))

# Direct MCQs for Unit 9
u9_direct = [
    ("First General Election Voters", "Approximately how many eligible voters were registered for India's first general elections held in 1951-1952?",
     "Over 17 crore (173 million) voters, of whom only about 15% were literate", ["Only 50 lakh wealthy taxpayers", "Over 50 crore voters with 90% literacy", "Exactly 1 crore military personnel"], "A",
     "The electorate in 1951-52 numbered approximately 17.3 crore citizens, with widespread illiteracy necessitating unique party symbols and visual ballot boxes.", "Quantifies electorate size and literacy in first general election."),
    ("Ballot Box Method 1952", "In the first general elections of 1952, how was secret voting physically executed inside polling booths?",
     "Each candidate had a separate steel ballot box marked with their election symbol, and voters dropped a blank ballot paper into their chosen box", ["Voters shouted their choice loudly to the election officer", "Voters pressed electronic buttons on microchip voting machines", "Voters raised hands in front of police officers"], "A",
     "Over 20 lakh steel ballot boxes were manufactured; each booth had separate boxes for each candidate bearing their symbol.", "Describes the multi-ballot box system of 1952."),
    ("Second Largest Party 1952", "Which political party won 16 seats in the first Lok Sabha elections in 1952, emerging as the second-largest party behind the Congress?",
     "Communist Party of India (CPI)", ["Bharatiya Jana Sangh", "Socialist Party", "Swatantra Party"], "A",
     "The CPI won 16 seats in 1952, becoming the largest opposition formation in the first Lok Sabha.", "Identifies CPI as largest opposition in first Lok Sabha."),
    ("Congress Vote Share 1952", "In the 1952 general elections, what percentage of the popular vote did the Congress party secure to win 364 out of 489 seats?",
     "Approximately 45 percent", ["Over 90 percent", "Exactly 75 percent", "Less than 20 percent"], "A",
     "Congress secured 45% of the total vote, which translated into 74.4% of the Lok Sabha seats due to the FPTP electoral system.", "Recalls Congress 1952 vote share."),
    ("Congress Socialist Party 1934", "The Congress Socialist Party (CSP) was originally formed in 1934 within the Indian National Congress by young leaders who:",
     "Wanted a more radical and egalitarian socialist orientation within the nationalist movement", ["Supported British imperial rule against Mahatma Gandhi", "Demanded the restoration of the Mughal empire", "Advocated for private monopoly banks"], "A",
     "Young socialists like JP Narayan, Narendra Deva, and Rammanohar Lohia formed the CSP in 1934 to promote socialist goals within the national movement.", "Explains origin of Congress Socialist Party 1934."),
    ("Socialist Split 1948", "In 1948, the Socialists formally split from Congress to establish a separate Socialist Party because:",
     "The Congress amended its constitution to prevent its members from holding dual party membership", ["The Congress ordered all socialists to leave India", "The Socialists wanted to merge with the Muslim League", "Nehru abolished all opposition parties by law"], "A",
     "Congress amended party rules in 1948 forbidding dual membership, prompting the socialists to form the independent Socialist Party.", "Explains 1948 Socialist Party formation."),
    ("CPI Armed Insurrection Abandoned", "In which year did the Communist Party of India officially abandon its policy of armed peasant insurrection (Telangana) and decide to participate in parliamentary elections?",
     "1951", ["1947", "1957", "1964"], "A",
     "In 1951, after discussions and tactical reassessment, the CPI gave up armed revolution and resolved to contest democratic elections.", "Identifies 1951 CPI shift to democratic elections."),
    ("Kerala 1959 Article 356", "In July 1959, the central government led by Jawaharlal Nehru dismissed the elected communist government in Kerala using:",
     "Article 356 of the Constitution (President's Rule)", ["Article 370 of the Constitution", "Article 352 (National Emergency)", "Article 360 (Financial Emergency)"], "A",
     "The dismissal of EMS Namboodiripad's Kerala ministry in 1959 following the 'Vimochana Samaram' (Liberation Struggle) was the first controversial use of Article 356.", "Identifies 1959 Kerala dismissal under Article 356."),
    ("CPI Split 1964", "The ideological split within the Communist Party of India in 1964, which created the CPI(M), was primarily triggered by:",
     "The Sino-Soviet ideological split and differing stances on the 1962 India-China border war", ["Disputes over Hindi language implementation in primary schools", "The nationalisation of commercial banks in Bombay", "Personal rivalries over the construction of Bhakra dam"], "A",
     "The pro-Soviet faction remained the CPI, while the faction critical of Soviet revisionism and supportive of mass mobilization formed the CPI(Marxist) in 1964.", "Explains causes of the 1964 CPI split."),
    ("Shyama Prasad Mukherjee Role", "Shyama Prasad Mukherjee, who founded the Bharatiya Jana Sangh in 1951, had previously served in Nehru's first interim cabinet as Minister for:",
     "Industry and Supply", ["External Affairs", "Defence", "Railways"], "A",
     "Shyama Prasad Mukherjee resigned as Union Minister for Industry and Supply in 1950 over differences with Nehru regarding the Delhi Pact with Pakistan.", "Identifies Mukherjee's cabinet portfolio."),
    ("Deen Dayal Upadhyaya Ideology", "Pandit Deen Dayal Upadhyaya propounded which comprehensive political and socio-economic philosophy for the Jana Sangh?",
     "Integral Humanism (Ekatma Manavavad)", ["Democratic Socialism", "Scientific Materialism", "Laissez-Faire Capitalism"], "A",
     "Integral Humanism presented an indigenous holistic model focusing on human well-being, balancing the physical, social, intellectual, and spiritual dimensions.", "Identifies Integral Humanism."),
    ("BJS Nuclear Demand", "In the 1950s and 1960s, the Bharatiya Jana Sangh was the foremost political party advocating that India should:",
     "Develop its own indigenous nuclear weapons capability, especially after China's 1964 atomic test", ["Surrender all military rifles to the United Nations", "Disband the Indian Air Force to save revenue", "Ban all scientific research in universities"], "A",
     "The Jana Sangh consistently campaigned for an independent nuclear weapons deterrent to safeguard national sovereignty.", "Identifies Jana Sangh's early nuclear advocacy."),
    ("Swatantra Party Social Base", "The social and electoral base of the Swatantra Party in the 1960s was drawn primarily from:",
     "Landlords, former princes, wealthy business industrialists, and prosperous farmers opposed to state controls", ["Landless rural agricultural labourers and tenant farmers", "Urban industrial trade union workers in textile mills", "Marxist student intellectuals in universities"], "A",
     "Swatantra gained strength in Rajasthan, Gujarat, and Bihar by mobilizing former royalty, big business magnates, and rich landowners against Congress socialism.", "Profiles social base of Swatantra Party."),
    ("B.R. Ambedkar Party", "Dr. B.R. Ambedkar, chief architect of the Constitution, established which political party to mobilize Dalits and backward classes in 1956?",
     "Republican Party of India (RPI) / Scheduled Castes Federation", ["Bahujan Samaj Party", "Dalit Panthers", "Swatantra Party"], "A",
     "Dr. Ambedkar founded the Independent Labour Party (1936), the Scheduled Castes Federation (1942), and conceived the Republican Party of India before his death in 1956.", "Identifies Dr. Ambedkar's political parties."),
    ("First Cabinet Non-Congress Members", "To ensure broad national representation, Jawaharlal Nehru invited which prominent opposition figures into his first post-independence cabinet?",
     "Dr. B.R. Ambedkar (Law) and Shyama Prasad Mukherjee (Industry)", ["A.K. Gopalan and E.M.S. Namboodiripad", "Muhammad Ali Jinnah and Liaquat Ali Khan", "C.N. Annadurai and M. Karunanidhi"], "A",
     "Nehru's first cabinet was a national coalition that included Dr. Ambedkar (Scheduled Castes Federation) and Shyama Prasad Mukherjee (Hindu Mahasabha/Jana Sangh).", "Highlights inclusive character of Nehru's first cabinet."),
    ("Rafi Ahmed Kidwai Food Ministry", "Which veteran Congress socialist leader successfully solved the national food rationing and grain supply crisis as Union Food Minister in 1952?",
     "Rafi Ahmed Kidwai", ["Morarji Desai", "K. Kamaraj", "Gulzarilal Nanda"], "A",
     "Rafi Ahmed Kidwai introduced bold decontrol of food grains and market interventions, ending post-war rationing shortages.", "Identifies Rafi Ahmed Kidwai."),
    ("PCO Concept Rajni Kothari", "Political scientist Rajni Kothari famously characterized the one-party dominance of the 1950s and 1960s as the:",
     "'The Congress System'", ["'The Fascist Dictatorship'", "'The Monarchy Regime'", "'The Military Feudalism'"], "A",
     "Rajni Kothari coined 'The Congress System' to explain how Congress functioned as a ruling party and internal opposition system simultaneously through factions.", "Identifies Rajni Kothari's 'Congress System' concept."),
    ("Symbols System Reason", "Why did the Election Commission introduce visual pictorial symbols for political parties in the first general elections?",
     "Because over 80 percent of the electorate could not read or write candidate names on ballots", ["Because candidates were forbidden from revealing their real names", "Because the British Crown mandated pictograms by royal charter", "Because symbols saved ink during printing"], "A",
     "Party symbols allowed illiterate citizens to recognize their preferred political party on ballot boxes and vote autonomously.", "Explains why visual election symbols were introduced."),
    ("First Lok Sabha Total Seats", "How many total Lok Sabha constituencies were contested in the historic First General Elections of 1951-1952?",
     "489 seats", ["543 seats", "250 seats", "400 seats"], "A",
     "In the first general elections, 489 seats were contested across single-member and multi-member parliamentary constituencies.", "Recalls total seats in first Lok Sabha (489)."),
    ("Third General Elections 1962", "In the Third General Elections of 1962, the Congress party retained its sweeping parliamentary majority by winning:",
     "361 out of 494 Lok Sabha seats", ["Only 100 seats, forcing a coalition", "All 494 seats with zero opposition", "Exactly 200 seats"], "A",
     "In 1962, Nehru led Congress to its third consecutive sweeping triumph, winning 361 seats with 44.7% of the vote.", "Recalls 1962 election results."),
    ("Ashoka Mehta PSP Theory", "Praja Socialist Party (PSP) leader Asoka Mehta advocated which controversial political stance regarding the Congress in the 1950s?",
     "'Compulsions of a developing economy' warranting cooperation with Congress in national reconstruction", ["Armed violent uprising to overthrow the central government", "Boycotting all future parliamentary elections", "Demanding India merge with the United States"], "A",
     "Asoka Mehta argued that backward developing nations require broad cooperation between democratic parties, leading him eventually into the Planning Commission and Congress.", "Explains Asoka Mehta's thesis on Congress cooperation."),
    ("Rammanohar Lohia Sapta Kranti", "Which socialist thinker propounded the ideology of 'Sapta Kranti' (Seven Revolutions) fighting gender, caste, colonial, and economic inequalities?",
     "Dr. Rammanohar Lohia", ["Acharya Narendra Deva", "Jayaprakash Narayan", "E.M.S. Namboodiripad"], "A",
     "Dr. Rammanohar Lohia advocated Sapta Kranti, an indigenous democratic socialist doctrine targeting comprehensive societal transformation.", "Identifies Rammanohar Lohia and Sapta Kranti."),
    ("Lohia Non-Congressism", "The theoretical concept of 'Non-Congressism' formulated by Rammanohar Lohia urged:",
     "All disparate opposition parties, left and right, to unite on a common platform to defeat the Congress in elections", ["Congress leaders to dissolve their party and join the civil service", "Citizens to boycott general elections and pay no taxes", "The military to take control of state assemblies"], "A",
     "Lohia argued that Congress rule was undemocratic and sustained only by opposition division, necessitating non-Congress electoral pacts.", "Explains Lohia's concept of Non-Congressism."),
    ("JP Sarvodaya and Bhoodan", "In the mid-1950s, Jayaprakash Narayan (JP) withdrew from active electoral politics to dedicate himself to which Gandhian movement?",
     "Vinoba Bhave's Bhoodan and Sarvodaya movement", ["The Royal Navy Mutiny relief", "The Swatantra Party free trade lobby", "The British Commonwealth secretariat"], "A",
     "JP announced 'Jeevandan' (dedicating his life) in 1954 to Vinoba Bhave's Bhoodan-Gramdan land gift movement.", "Identifies JP's dedication to Bhoodan and Sarvodaya."),
    ("Acharya Narendra Deva Profile", "Which founding leader of the Congress Socialist Party was a renowned Buddhist scholar, principal of Kashi Vidyapith, and Vice-Chancellor of Lucknow University?",
     "Acharya Narendra Deva", ["Sampurnanand", "J.B. Kripalani", "Purushottam Das Tandon"], "A",
     "Acharya Narendra Deva was the foremost intellectual theorist of democratic socialism in India, revered for moral integrity.", "Identifies Acharya Narendra Deva."),
    ("1957 Second Election Congress Seats", "In the Second General Elections of 1957, how many Lok Sabha seats did the Congress party secure out of 494?",
     "371 seats", ["250 seats", "494 seats", "150 seats"], "A",
     "Congress won 371 seats (47.8% of the vote) in 1957, reaffirming Nehru's unshakeable national dominance.", "Recalls Congress seat count in 1957 elections."),
    ("Election Commission Day", "National Voters' Day is celebrated in India every year on 25 January to mark:",
     "The official foundation day of the Election Commission of India in 1950", ["The declaration of India as a Republic", "The passing of the Representation of the People Act", "The holding of the first national referendum"], "A",
     "The Election Commission of India was established on 25 January 1950, celebrated annually as National Voters' Day since 2011.", "Identifies National Voters' Day on 25 January."),
    ("Jana Sangh Symbol", "What was the official election symbol of the Bharatiya Jana Sangh during the 1950s and 1960s?",
     "Deepak (Earthen Lamp)", ["Tree", "Lotus", "Two Bullocks with Yoke"], "A",
     "The Bharatiya Jana Sangh's historic election symbol was the Deepak (oil lamp).", "Identifies Jana Sangh's election symbol as Deepak."),
    ("Socialist Party Symbol", "What was the recognized election symbol of the Socialist Party / Praja Socialist Party in early general elections?",
     "Tree", ["Hut", "Ears of Corn and Sickle", "Elephant"], "A",
     "The Socialist Party was allotted the 'Tree' symbol (and the PSP later used the 'Hut' and 'Tree').", "Identifies Socialist Party symbol as Tree."),
    ("CPI Election Symbol", "What was the traditional election symbol of the undivided Communist Party of India (CPI)?",
     "Ears of Corn and Sickle", ["Hammer, Sickle and Star", "Plough", "Wheel"], "A",
     "The CPI's recognized symbol was the Ears of Corn and Sickle, while the CPI(M) later adopted the Hammer, Sickle and Star.", "Identifies CPI election symbol."),
    ("Congress 1950s Symbol", "What was the official election symbol of the Indian National Congress during the first three general elections under Nehru?",
     "Two Bullocks with Yoke (Pair of Bullocks)", ["Hand", "Cow and Calf", "Spinning Wheel (Charkha)"], "A",
     "During Nehru's era, the Congress party symbol was a Pair of Bullocks with Yoke (it became Cow and Calf in 1971, and Hand in 1978).", "Identifies original Congress symbol as Two Bullocks with Yoke.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u9_direct:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u9(make_question(CHAPTER_U9, topic, stem, opts, c, s))

u9_qs = u9_qs[:40]
assert len(u9_qs) == 40, f"Expected 40 questions for Unit 9, got {len(u9_qs)}"
validate_and_collect(u9_qs, u9_seen)
print("Unit 9 validated: 40 unique questions.")


# =================================================================================================
# UNIT 10: Politics of Planned Development (60 Questions)
# =================================================================================================
CHAPTER_U10 = "Politics of Planned Development"
u10_qs = []
u10_seen = set()

def add_u10(q):
    u10_qs.append(q)

opts, c, s = rotate_options(
    "March 1950 by a simple resolution of the Union Cabinet",
    ["January 1950 through Article 371 of the Constitution", "August 1947 by an act of the British Parliament", "December 1952 by a national popular referendum"],
    "A",
    "The Planning Commission was established in March 1950 by an executive resolution of the Government of India. It was not created by the Constitution or an act of Parliament, making it an extra-constitutional, advisory body.\nHence, Option {{CORR}} is correct.",
    "Identifies Planning Commission established in March 1950 as an extra-constitutional body."
)
add_u10(make_question(CHAPTER_U10, "Planning Commission Origin", "When and through which legal mechanism was the Planning Commission of India originally established?", opts, c, s))

opts, c, s = rotate_options(
    "P.C. Mahalanobis",
    ["K.N. Raj", "J.C. Kumarappa", "Charan Singh"],
    "B",
    "The Second Five Year Plan (1956-1961), which focused on rapid industrialisation and heavy capital goods industries, was drafted under the leadership of renowned statistician Prasanta Chandra Mahalanobis.\nHence, Option {{CORR}} is correct.",
    "Identifies P.C. Mahalanobis as architect of Second Five Year Plan."
)
add_u10(make_question(CHAPTER_U10, "Second Five Year Plan", "Who among the following was the chief architect and mastermind behind the drafting of the Second Five Year Plan?", opts, c, s))

opts, c, s = rotate_options(
    "Bombay Plan of 1944",
    ["Calcutta Declaration of 1946", "Delhi Industrial Charter of 1950", "Madras Pact of 1942"],
    "C",
    "In 1944, a group of prominent industrialists (including JRD Tata and GD Birla) drafted the 'Bombay Plan', jointly proposing that the state must play an active, leading role in economic planning and capital goods investment.\nHence, Option {{CORR}} is correct.",
    "Identifies the Bombay Plan of 1944."
)
add_u10(make_question(CHAPTER_U10, "Bombay Plan", "What was the name of the joint economic proposal drafted in 1944 by leading Indian industrialists advocating state-led economic planning?", opts, c, s))

opts, c, s = rotate_options(
    "1 January 2015",
    ["15 August 2014", "26 January 2015", "1 April 2017"],
    "D",
    "The Government of India replaced the 65-year-old Planning Commission with the National Institution for Transforming India (NITI Aayog) on 1 January 2015.\nHence, Option {{CORR}} is correct.",
    "Identifies 1 January 2015 as the date NITI Aayog replaced the Planning Commission."
)
add_u10(make_question(CHAPTER_U10, "NITI Aayog Creation", "On which date was NITI Aayog officially constituted by the Government of India, replacing the Planning Commission?", opts, c, s))

# Match questions for Unit 10
add_u10(make_match_question(
    CHAPTER_U10, "Economic Planners and Models",
    "Match List I (Thinker / Planner) with List II (Core Economic Contribution):",
    [("A", "K.N. Raj"), ("B", "P.C. Mahalanobis"), ("C", "J.C. Kumarappa"), ("D", "Verghese Kurien")],
    [("I", "Young economist involved in drafting the First FYP ('Hasten slowly')"), ("II", "Architect of Second FYP focusing on heavy capital goods and state industry"), ("III", "Gandhian economist author of 'Economy of Permanence'"), ("IV", "'Milkman of India' who spearheaded the White Revolution and Amul")],
    "A-I, B-II, C-III, D-IV", "A",
    "K.N. Raj drafted First FYP; Mahalanobis drafted Second FYP; Kumarappa advocated Gandhian rural economics; Kurien led Amul and Operation Flood.",
    "Matches economic architects with their foundational contributions."
))

add_u10(make_match_question(
    CHAPTER_U10, "Five Year Plans Milestones",
    "Match List I (Five Year Plan) with List II (Primary Strategic Priority):",
    [("A", "First Five Year Plan (1951-56)"), ("B", "Second Five Year Plan (1956-61)"), ("C", "Plan Holidays (1966-69)"), ("D", "NITI Aayog (from 2015)")],
    [("I", "Agricultural investment, irrigation canals, and dams like Bhakra Nangal"), ("II", "Heavy industries, steel mills, capital goods, and import substitution"), ("III", "Annual plans necessitated by food crisis, devaluation, and wars"), ("IV", "Think tank promoting cooperative federalism and bottom-up planning")],
    "A-I, B-II, C-III, D-IV", "B",
    "First FYP focused on agriculture and dams; Second FYP on heavy industry; 1966-69 saw annual plan holidays; NITI Aayog provides bottom-up think-tank strategy.",
    "Categorises phases of Indian planning by strategic focus."
))

# Chronology questions for Unit 10
add_u10(make_sequence_question(
    CHAPTER_U10, "Planning History Timeline",
    "Arrange the following milestones of Indian planning and economic history in chronological sequence:",
    [("A", "Formulation of the Bombay Plan by leading industrialists"), ("B", "Establishment of the Planning Commission of India"), ("C", "Establishment of the National Development Council (NDC)"), ("D", "Adoption of the 'Socialistic Pattern of Society' resolution at Avadi")],
    "A, B, C, D", "C",
    "1. Bombay Plan (1944).\n2. Planning Commission established (March 1950).\n3. National Development Council established (August 1952).\n4. Avadi Congress resolution on socialistic pattern (January 1955).",
    "Sequences formative milestones of Indian economic planning."
))

add_u10(make_sequence_question(
    CHAPTER_U10, "Agricultural Revolutions Timeline",
    "Arrange the following agricultural and dairy milestones in chronological order:",
    [("A", "Severe drought and food crisis in Bihar necessitating US PL 480 food imports"), ("B", "Introduction of High Yielding Variety (HYV) seeds launching the Green Revolution"), ("C", "Establishment of the National Dairy Development Board (NDDB)"), ("D", "Launch of Operation Flood initiating the White Revolution")],
    "A, B, C, D", "D",
    "1. Bihar food crisis (1965-1967).\n2. Green Revolution launched (1966-1967).\n3. NDDB established (1965).\n4. Operation Flood launched (1970).",
    "Sequences agricultural and dairy revolutions in India."
))

# Statement questions for Unit 10
add_u10(make_statement_question(
    CHAPTER_U10, "First vs Second FYP",
    "The First Five Year Plan prioritized agriculture and irrigation because the nation faced urgent food shortages and partition had severed fertile irrigated tracts.",
    "The Second Five Year Plan urged people to slow down development and banned all steel factory construction.",
    3, "C",
    "Statement I is correct: First FYP addressed agrarian devastation caused by partition. Statement II is false: Second FYP aggressively pursued heavy industrialisation, building gigantic steel plants at Bhilai, Durgapur, and Rourkela.",
    "Contrasts strategic priorities of the First and Second Five Year Plans."
))

add_u10(make_statement_question(
    CHAPTER_U10, "Green Revolution Impact",
    "The Green Revolution enabled India to achieve national self-sufficiency in food grain production and end dependence on foreign food aid.",
    "The benefits of the Green Revolution were distributed identically and equally across every village and district in India.",
    3, "C",
    "Statement I is correct: India broke free from famine and PL 480 food reliance. Statement II is incorrect: The Green Revolution exacerbated regional disparities, benefiting primarily prosperous farmers in Punjab, Haryana, and Western UP.",
    "Evaluates the socio-economic and regional impact of the Green Revolution."
))

# Assertion Reason for Unit 10
add_u10(make_assertion_question(
    CHAPTER_U10, "Mixed Economy Rationale",
    "India chose a 'Mixed Economy' model rather than adopting an unadulterated capitalist or fully communist model.",
    "The mixed economy sought to combine the economic dynamism of private enterprise with public ownership of commanding heights to ensure social equity and planned growth.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains why the mixed economy was chosen—it aimed to prevent private monopolies while avoiding totalitarian state collectivisation.",
    "Explains the rationale behind India's mixed economy model."
))

add_u10(make_assertion_question(
    CHAPTER_U10, "Charan Singh Agriculture Advocacy",
    "Chaudhary Charan Singh broke away from the Congress party and formed the Bharatiya Kranti Dal in the late 1960s.",
    "Charan Singh forcefully argued that the Nehruvian model of heavy industrialisation neglected agriculture and unfairly drained rural wealth into urban industrial centres.",
    1, "A",
    "Both (A) and (R) are true, and (R) explains why Charan Singh split—he championed the economic interests of the peasantry against state-centric industrial priorities.",
    "Explains Charan Singh's rural peasant critique of Nehruvian industrial planning."
))

# Multi statement for Unit 10
add_u10(make_multi_statement_question(
    CHAPTER_U10, "NITI Aayog Structure",
    "Which of the following statements are correct regarding the structure and mandate of NITI Aayog?",
    [
        ("A", "The Prime Minister of India serves as the ex-officio Chairperson of NITI Aayog."),
        ("B", "The Governing Council of NITI Aayog includes Chief Ministers of all States and Lt. Governors of UTs."),
        ("C", "It serves as a policy think-tank to foster cooperative federalism and bottom-up development."),
        ("D", "It has the constitutional power to arrest state finance ministers who exceed budget deficits.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements A, B, and C accurately describe NITI Aayog's governance and think-tank role. Statement D is completely fictitious.",
    "Identifies institutional features of NITI Aayog."
))

add_u10(make_multi_statement_question(
    CHAPTER_U10, "Land Reforms Appraisal",
    "Which of the following were major components of post-independence land reforms in India?",
    [
        ("A", "Abolition of the colonial Zamindari intermediary system"),
        ("B", "Consolidation of fragmented land holdings (Chakbandi)"),
        ("C", "Imposition of legal ceilings on agricultural land ownership"),
        ("D", "Total confiscation of all farming land by the state without any compensation to peasants")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A, B, and C represent the genuine components of land reform in India (Zamindari abolition was most successful, while ceiling laws were largely evaded). D is false as private ownership remained intact.",
    "Evaluates successes and limitations of land reforms in independent India."
))

# Direct MCQs for Unit 10
u10_direct = [
    ("National Development Council Setup", "The National Development Council (NDC), comprising the Prime Minister, Union Cabinet Ministers, and State Chief Ministers, was set up in:",
     "August 1952", ["January 1950", "March 1950", "November 1956"], "A",
     "The NDC was created in August 1952 to review national plans and mobilize federal cooperation between states and the Centre.", "Identifies August 1952 for National Development Council."),
    ("Kaira Milk Cooperative", "The cooperative milk movement that gave birth to the 'Amul' brand was founded in which Gujarat town?",
     "Anand (Kaira district)", ["Surat", "Ahmedabad", "Vadodara"], "A",
     "Amul was founded in 1946 in Anand, Gujarat, uniting small milk producers under the guidance of Tribhuvandas Patel and Verghese Kurien.", "Identifies Anand, Gujarat as home of Amul."),
    ("Operation Flood Concept", "What was 'Operation Flood' launched in 1970 under the National Dairy Development Board?",
     "A nationwide rural development program creating a national milk grid and empowering dairy cooperatives", ["A flood control embankment project across the Brahmaputra river", "An emergency submarine rescue project in the Arabian Sea", "A project to divert seawater into the Thar desert"], "A",
     "Operation Flood (the White Revolution) made India the world's largest milk producer by linking rural milk producers directly to urban consumers through cooperatives.", "Defines Operation Flood."),
    ("Public Sector Commanding Heights", "In early Indian planning, the strategy of placing basic infrastructure, mining, railways, and steel under state control was known as:",
     "Capturing the 'commanding heights' of the economy", ["The laissez-faire market doctrine", "The private monopoly cartel", "The feudal guild reservation"], "A",
     "The Mahalanobis framework placed heavy capital goods and infrastructure under the public sector to direct overall industrial growth.", "Defines 'commanding heights' strategy."),
    ("Avadi Congress Resolution 1955", "At its historic Avadi Session in January 1955, the Indian National Congress officially declared its goal to establish a:",
     "'Socialistic pattern of society'", ["Laissez-faire capitalist commonwealth", "Dictatorship of the proletariat", "Monarchical trading company"], "A",
     "The Avadi resolution declared that planning should aim at establishing a 'socialistic pattern of society' where principal means of production are under social control.", "Recalls 1955 Avadi resolution on socialistic pattern of society."),
    ("Bhakra Nangal Dam", "Which monumental river valley project hailed by Nehru as a 'temple of modern India' was completed during the First Five Year Plan?",
     "Bhakra-Nangal Project on the Sutlej River", ["Sardar Sarovar on the Narmada River", "Tehri Dam on the Bhagirathi River", "Nagarjuna Sagar on the Krishna River"], "A",
     "The Bhakra-Nangal dam on the Sutlej provided massive irrigation to Punjab, Haryana, and Rajasthan, and generated hydroelectric power for new industries.", "Identifies Bhakra Nangal on Sutlej River."),
    ("Steel Plants Second FYP", "The three major public sector steel plants established with foreign collaboration during the Second Five Year Plan were located at:",
     "Bhilai (USSR), Rourkela (Germany), and Durgapur (UK)", ["Jamshedpur, Bokaro, and Salem", "Visakhapatnam, Surat, and Mumbai", "Kolkata, Chennai, and Kanpur"], "A",
     "India collaborated with the Soviet Union at Bhilai, West Germany at Rourkela, and Great Britain at Durgapur to build modern integrated steel plants.", "Lists Second FYP steel plants and foreign partners."),
    ("Plan Holidays 1966-69", "Why was the Fourth Five Year Plan delayed and replaced by three Annual Plans ('Plan Holidays') between 1966 and 1969?",
     "Due to back-to-back wars (1962 and 1965), acute monsoon failure, rupee devaluation, and food crisis", ["Because the Planning Commission was banned by the Supreme Court", "Because all factories across India were nationalised by the United Nations", "Because Parliament was dissolved permanently for three years"], "A",
     "Consecutive droughts, the 1965 Indo-Pak war, foreign exchange depletion, and rupee devaluation forced India to adopt annual plans from 1966 to 1969.", "Explains causes of Plan Holidays (1966-1969)."),
    ("Rupee Devaluation 1966", "Under intense economic pressure from the World Bank and US during the 1965-66 food crisis, the Indira Gandhi government in June 1966:",
     "Devalued the Indian Rupee from Rs. 4.76 to Rs. 7.50 per US Dollar", ["Adopted the British Pound as the official domestic currency", "Banned all private citizens from holding gold jewelry", "Abolished the Reserve Bank of India's minting powers"], "A",
     "India devalued the rupee by 36.5% on 6 June 1966 to stimulate exports and secure vital foreign aid and food shipments.", "Identifies June 1966 Rupee devaluation."),
    ("US PL 480 Food Aid", "The controversial American food assistance program under which India imported millions of tonnes of wheat during the 1960s food crisis was known as:",
     "Public Law 480 (PL 480 / Food for Peace)", ["Marshall Agricultural Pact", "Bretton Woods Grain Compact", "Point Four Wheat Grant"], "A",
     "PL 480 shipments kept millions from starvation, but US conditions (such as pressure on Vietnam policy) created deep resentment and inspired the quest for self-sufficiency.", "Identifies US PL 480 food program."),
    ("Green Revolution Pioneer India", "Which Indian agricultural scientist is revered as the father of the Green Revolution in India?",
     "Dr. M.S. Swaminathan", ["Dr. Verghese Kurien", "Dr. Homi J. Bhabha", "Dr. Vikram Sarabhai"], "A",
     "Dr. M.S. Swaminathan collaborated with Norman Borlaug to adapt semi-dwarf wheat varieties to Indian soil and climate, transforming grain yields.", "Identifies M.S. Swaminathan as Father of Green Revolution in India."),
    ("Norman Borlaug Wheat", "Dr. Norman Borlaug, who developed the high-yielding semi-dwarf wheat varieties that fueled the Green Revolution, was based at:",
     "CIMMYT in Mexico", ["IRRI in the Philippines", "FAO in Rome", "ICRISAT in Hyderabad"], "A",
     "Norman Borlaug developed rust-resistant, high-yielding dwarf wheat varieties at CIMMYT in Mexico, winning the Nobel Peace Prize in 1970.", "Identifies Norman Borlaug and Mexico CIMMYT."),
    ("IR8 Miracle Rice", "The semi-dwarf miracle rice variety 'IR8' that revolutionized rice production across Asia in the late 1960s was developed by:",
     "International Rice Research Institute (IRRI) in the Philippines", ["Indian Council of Agricultural Research in New Delhi", "Food and Agriculture Organisation in Rome", "World Bank Agriculture Bureau in Washington"], "A",
     "IR8 was developed by the International Rice Research Institute (IRRI) in Los Baños, Philippines, dramatically expanding paddy yields.", "Identifies IRRI in the Philippines for IR8 miracle rice."),
    ("Green Revolution States", "Which Indian states were the primary initial beneficiaries of the Green Revolution package due to assured canal and tube-well irrigation?",
     "Punjab, Haryana, and Western Uttar Pradesh", ["Assam, Odisha, and Bihar", "Kerala, Tamil Nadu, and Goa", "Rajasthan, Gujarat, and Madhya Pradesh"], "A",
     "The Green Revolution was deliberately concentrated in well-endowed irrigated wheat-growing regions: Punjab, Haryana, and Western UP.", "Identifies primary Green Revolution states."),
    ("Political Consequence Green Revolution", "A major political consequence of the Green Revolution was the emergence of:",
     "A politically assertive and prosperous class of middle and rich peasants (OBC rural elites) who formed powerful agrarian parties", ["A landless agricultural proletariat that overthrew state governments", "The total abandonment of villages as all farmers migrated to London", "The return of British landlords to rule rural districts"], "A",
     "Prosperous agricultural castes (Jats, Yadavs, Kurmis, Marathas) gained immense economic clout, reshaping state politics through regional peasant parties.", "Analyzes political empowerment of middle peasants."),
    ("Economy of Permanence Book", "The seminal book 'Economy of Permanence', which advocated an ecological and decentralized village-based Gandhian economic model, was authored by:",
     "J.C. Kumarappa", ["Mahatma Gandhi", "Vinoba Bhave", "P.C. Mahalanobis"], "A",
     "Joseph Chelladurai Kumarappa published 'Economy of Permanence' in 1945, warning against industrial resource exhaustion and championing village crafts.", "Identifies J.C. Kumarappa and 'Economy of Permanence'."),
    ("Zoning Policy Food Crisis", "During the 1965-67 food crisis, the government enforced a 'zoning policy' which prohibited:",
     "The movement of food grains across state borders, leaving deficit states like Bihar in extreme distress", ["The cooking of rice inside private homes", "The export of mangoes to the Soviet Union", "The purchase of vegetables on Sundays"], "A",
     "State agricultural zoning prevented trade between states, meaning surplus states could not sell grain to deficit states, intensifying famine in Bihar.", "Explains state food zoning policy during 1960s food crisis."),
    ("Bank Nationalisation 1969", "In July 1969, Prime Minister Indira Gandhi nationalised 14 major commercial banks primarily to:",
     "Channel banking credit and financial resources toward agriculture, small farmers, and priority rural sectors", ["Confiscate private citizen gold to buy foreign yachts", "Close all bank branches in rural villages", "Transfer Indian currency printing to London"], "A",
     "Bank nationalisation ended urban corporate monopoly over banking deposits, mandating rural branch expansion and agricultural lending quotas.", "Explains rationale behind 1969 bank nationalisation."),
    ("Monopolies Commission MRTP", "The Monopolies and Restrictive Trade Practices (MRTP) Act was passed in 1969 to:",
     "Prevent the concentration of economic power and curb monopolistic practices by large business houses", ["Force all small shops to merge into a single private monopoly", "Ban foreign tourists from shopping in Indian bazaars", "Prohibit the state from building schools"], "A",
     "The MRTP Act regulated corporate mergers and asset expansions of large business houses to curb industrial monopolies.", "Identifies purpose of MRTP Act 1969."),
    ("Bodo / Dairying Leader Tribhuvandas", "Who was the dedicated social worker and freedom fighter who founded the Kaira Cooperative with Sardar Patel's blessings, later working with Verghese Kurien?",
     "Tribhuvandas Patel", ["Morarji Desai", "K.M. Munshi", "Ravishankar Maharaj"], "A",
     "Tribhuvandas Patel organized the farmers of Kaira in 1946 to eliminate exploitative milk middlemen, serving as Amul's founding chairman.", "Identifies Tribhuvandas Patel."),
    ("NITI Aayog First Vice Chairperson", "Who served as the distinguished first Vice-Chairperson of NITI Aayog upon its establishment in 2015?",
     "Arvind Panagariya", ["Raghuram Rajan", "Montek Singh Ahluwalia", "Bibek Debroy"], "A",
     "Columbia University economist Arvind Panagariya was appointed as the inaugural Vice-Chairperson of NITI Aayog in January 2015.", "Identifies Arvind Panagariya."),
    ("Planning Commission Disbandment Announcement", "In which historic Independence Day speech did Prime Minister Narendra Modi announce the plan to abolish the Planning Commission?",
     "15 August 2014 from the ramparts of the Red Fort", ["15 August 2019", "26 January 2015", "15 August 2016"], "A",
     "In his maiden Red Fort address on 15 August 2014, Prime Minister Modi announced that the Planning Commission had outlived its utility and would be replaced.", "Identifies 15 August 2014 speech abolishing Planning Commission."),
    ("Left Critique Mixed Economy", "Leftist critics argued that India's planning and mixed economy model primarily served to:",
     "Create a state-funded infrastructure that subsidised the expansion and profits of the private capitalist class", ["Abolish all factories and return India to the Stone Age", "Eliminate private property completely across the country", "Enforce full communism across all five-year plans"], "A",
     "Marxist critics argued the public sector merely built expensive, loss-making infrastructure (steel, coal, rail) that allowed private big business to flourish.", "Explains Left critique of Indian mixed economy."),
    ("Right Critique Mixed Economy", "Right-wing critics (such as the Swatantra Party) criticized the planning model for creating a:",
     "'License-Permit-Quota Raj' that stifled private initiative and fostered corruption and inefficiency", ["Pure communist society without any private businesses", "System that paid too much money to private farmers", "Monarchy dominated by the British governor-general"], "A",
     "Right-wing economists and businessmen argued that state bureaucratic controls, industrial licenses, and import quotas bred red-tapism and corruption.", "Explains Right critique of License Raj."),
    ("Ceiling on Land Holdings Evasion", "Why were the laws imposing legal ceilings on agricultural landholdings largely ineffective across most Indian states?",
     "Landowners exploited legal loopholes, registering land under fictitious names (benami transfers) and divorcing wives on paper to keep land", ["Because all rich landowners voluntarily surrendered their land to the poor", "Because state governments immediately arrested any landowner who owned a tractor", "Because the Supreme Court abolished all private farms"], "A",
     "Big landlords transferred holdings to relatives or benami accounts, with state political elites delaying implementation to protect landed allies.", "Analyzes failure of land ceiling legislation."),
    ("Cooperative Farming Opposition", "Why did the proposal for joint cooperative farming endorsed by Congress at the 1959 Nagpur session fail to take off?",
     "Peasants resisted surrendering individual ownership of land, and leaders like Charan Singh organized fierce resistance against collectivisation", ["Because farmers preferred to import all food from the Soviet Union", "Because the United Nations passed a resolution banning all farming", "Because cooperative banks had too much gold bullion"], "A",
     "Indian peasants possess an intense emotional attachment to their land; Charan Singh and Rajaji mobilized peasant resistance against collectivisation.", "Explains opposition to cooperative farming."),
    ("National Food Security Act", "The National Food Security Act (NFSA) passed by Parliament in 2013 legally entitled:",
     "Up to 75% of the rural population and 50% of the urban population to receive subsidised food grains", ["All citizens to free gold coins every month", "Private companies to export all domestic wheat", "Farmers to pay 100% tax on rice"], "A",
     "The NFSA legally binds the state to provide 5 kg of food grains per person per month at subsidized prices to priority households.", "Details the coverage of the National Food Security Act 2013."),
    ("Food Corporation of India Setup", "The Food Corporation of India (FCI) was established in 1965 under an act of Parliament primarily to:",
     "Procure food grains from farmers at MSP, maintain national buffer stocks, and distribute food through the PDS", ["Export all Indian grains to Wall Street markets", "Speculate in international currency markets", "Collect land revenue taxes from peasants"], "A",
     "The FCI was established in 1965 to secure price support for farmers, distribute grain across the nation via PDS, and manage strategic buffer stocks.", "Identifies the core mandate of the Food Corporation of India."),
    ("CACP Role", "Which specialized government body recommends Minimum Support Prices (MSP) for agricultural crops to incentivize farmers?",
     "Commission for Agricultural Costs and Prices (CACP)", ["NITI Aayog Fiscal Wing", "National Development Council", "Reserve Bank of India Monetary Committee"], "A",
     "The CACP (established in 1965 as the Agricultural Prices Commission) analyzes cost of cultivation data to recommend MSPs to the government.", "Identifies CACP recommending MSP."),
    ("Hirakud Dam First FYP", "The multipurpose Hirakud Dam, built during the First Five Year Plan across the Mahanadi River, is situated in which state?",
     "Odisha", ["West Bengal", "Andhra Pradesh", "Bihar"], "A",
     "Hirakud Dam on the Mahanadi River in Odisha is one of the longest earthen dams in the world, constructed to control floods and supply irrigation.", "Identifies Hirakud Dam on Mahanadi in Odisha."),
    ("Damodar Valley Corporation", "The Damodar Valley Corporation (DVC), India's first multipurpose river valley project established in 1948, was modeled directly on the:",
     "Tennessee Valley Authority (TVA) of the United States", ["Volga River Directorate of the USSR", "Rhine River Commission of Germany", "Suez Canal Company of Egypt"], "A",
     "DVC was created in July 1948, modeled on the famous US Tennessee Valley Authority (TVA) to control floods and produce power in Bengal and Bihar.", "Identifies TVA model for Damodar Valley Corporation."),
    ("Indian Statistical Institute Founder", "The Indian Statistical Institute (ISI) in Calcutta, which played a pivotal role in formulating the Second Five Year Plan, was founded in 1931 by:",
     "Prof. P.C. Mahalanobis", ["Dr. Homi Bhabha", "Prof. Amartya Sen", "C.V. Raman"], "A",
     "Prasanta Chandra Mahalanobis founded the Indian Statistical Institute in Calcutta, transforming it into a world-renowned centre for statistics and planning.", "Identifies P.C. Mahalanobis as founder of ISI."),
    ("ISI Act of 1959", "Under an act of Parliament in 1959, the Indian Statistical Institute (ISI) was officially recognized as an:",
     "'Institute of National Importance'", ["Autonomous commercial bank", "International trade guild", "Export-import corporation"], "A",
     "The Indian Statistical Institute Act of 1959 declared ISI an Institute of National Importance, empowering it to grant degrees.", "Identifies 1959 ISI Act."),
    ("Sylvester da Cunha Amul Campaign", "The famous, witty topical advertising campaign featuring the 'Amul Girl' and the slogan 'Utterly Butterly Delicious' was conceived in 1966 by:",
     "Sylvester da Cunha", ["Alyque Padamsee", "Prasoon Joshi", "R.K. Laxman"], "A",
     "Sylvester da Cunha created the beloved Amul butter topical hoarding campaign in 1966, which holds the Guinness World Record as the longest-running ad campaign.", "Identifies Sylvester da Cunha for Amul Girl campaign."),
    ("NDDB Headquarters", "The headquarters of the National Dairy Development Board (NDDB), established by the Government of India in 1965, is located in:",
     "Anand, Gujarat", ["New Delhi", "Karnal, Haryana", "Pune, Maharashtra"], "A",
     "NDDB was set up in 1965 with its headquarters in Anand, Gujarat, to replicate the successful Anand cooperative model nationwide.", "Identifies Anand as NDDB headquarters."),
    ("KN Raj Centre Development Studies", "Prof. K.N. Raj founded which globally acclaimed research institution in Thiruvananthapuram, Kerala, in 1971 to study development economics?",
     "Centre for Development Studies (CDS)", ["Indian Institute of Science", "National Council of Applied Economic Research", "Tata Institute of Social Sciences"], "A",
     "K.N. Raj founded the Centre for Development Studies (CDS) in Kerala in 1971, which pioneered research on the famous 'Kerala Model' of development.", "Identifies K.N. Raj founding CDS in Kerala."),
    ("Rolling Plan Concept", "The 'Rolling Plan' was introduced in 1978 by the Janata Party government under Prime Minister Morarji Desai to replace the:",
     "Fifth Five Year Plan (terminated a year early)", ["First Five Year Plan", "Planning Commission with NITI Aayog", "Annual Budget of Parliament"], "A",
     "The Janata Party terminated the Fifth Plan in 1978 and introduced a Rolling Plan with yearly evaluations, which was discarded when Congress returned in 1980.", "Explains Rolling Plan introduced in 1978."),
    ("Sixth FYP Poverty Programs", "The Sixth Five Year Plan (1980-1985) marked a decisive shift toward targeted direct anti-poverty programs such as the:",
     "Integrated Rural Development Programme (IRDP) and National Rural Employment Programme (NREP)", ["Compulsory urban relocation scheme", "Abolition of all village post offices", "Banning of all tractor manufacturing"], "A",
     "The Sixth Plan launched major rural self-employment and wage-employment programs like IRDP, NREP, and RLEGP to tackle entrenched poverty.", "Identifies IRDP and NREP in the Sixth Plan."),
    ("Fifth FYP Garibi Hatao", "Which Five Year Plan explicitly made 'Removal of Poverty' (Garibi Hatao) and 'Attainment of Self-Reliance' its twin central objectives?",
     "Fifth Five Year Plan (1974-1979)", ["First Five Year Plan (1951-1956)", "Second Five Year Plan (1956-1961)", "Eighth Five Year Plan (1992-1997)"], "A",
     "The Fifth Plan drafted under D.D. Dhar prioritized poverty alleviation ('Garibi Hatao') alongside agricultural and energy self-reliance.", "Identifies Fifth Five Year Plan focusing on Garibi Hatao."),
    ("Community Development Programme", "The nationwide Community Development Programme (CDP) aimed at comprehensive rural self-help and village development was launched on:",
     "2 October 1952 (Gandhi Jayanti)", ["15 August 1947", "26 January 1950", "14 November 1956"], "A",
     "The Community Development Programme was inaugurated on 2 October 1952 across 55 project areas, laying the foundation for modern rural administration.", "Identifies 2 October 1952 launch of CDP."),
    ("National Extension Service", "The National Extension Service (NES) was launched in 1953 to serve as the permanent administrative machinery for rural development under:",
     "Community Development Blocks headed by Block Development Officers (BDOs)", ["Military district commanders", "British colonial tax collectors", "Village feudal landlords"], "A",
     "The NES institutionalized the Block Development Officer (BDO) and Village Level Worker (Gram Sevak) administrative network across India.", "Identifies National Extension Service in 1953."),
    ("Gadgil Formula Regional Equity", "The 'Gadgil Formula' adopted by the National Development Council in 1969 was designed to:",
     "Allocate central financial assistance and plan grants to states objectively based on population, poverty, and tax effort", ["Distribute food grains exclusively to coastal states", "Levy special income taxes on desert areas", "Fund private multinational corporations"], "A",
     "The Gadgil Formula provided transparent, objective criteria for distributing central plan assistance to states, ensuring equitable federal allocations.", "Explains Gadgil Formula adopted in 1969."),
    ("Industrial Policy Resolution 1956", "The Industrial Policy Resolution of 1956 (IPR 1956), often called the 'economic constitution of India', divided industries into:",
     "Three categories: Schedule A (exclusive state monopoly), Schedule B (state-led with private supplement), and Schedule C (private sector)", ["Two categories: Urban factories and Rural farms", "Four categories: Military, Foreign, Royal, and British", "A single category owned completely by Wall Street"], "A",
     "IPR 1956 laid down the foundational framework of the public sector, reserving 17 basic industries (Schedule A) exclusively for the state.", "Outlines the three schedules of IPR 1956."),
    ("Steel Authority of India Setup", "The Steel Authority of India Limited (SAIL) was incorporated in 1973 to manage:",
     "All major public sector steel plants (Bhilai, Rourkela, Durgapur, Bokaro) under a single holding company", ["All private bicycle factories across Gujarat", "The export of mangoes to Europe", "The import of foreign diesel locomotives"], "A",
     "SAIL was established in January 1973 as a state holding company to integrate planning, development, and operations across public sector steel plants.", "Identifies creation of SAIL in 1973."),
    ("Wheat Revolution Stamp 1968", "In July 1968, Prime Minister Indira Gandhi officially celebrated the triumph of the Green Revolution by releasing a special postage stamp titled:",
     "'The Wheat Revolution'", ["'The Industrial Leap'", "'The Space Explorer'", "'The Dairy Miracle'"], "A",
     "Indira Gandhi released the historic commemorative stamp 'Wheat Revolution' in July 1968 to mark the record-shattering harvest of 17 million tonnes of wheat.", "Identifies 'Wheat Revolution' postage stamp released in July 1968."),
    ("Poverty Line Calorie Norms", "In traditional Indian planning, the Planning Commission defined the poverty line on the basis of minimum daily nutritional requirements of:",
     "2,400 calories per person per day in rural areas and 2,100 calories in urban areas", ["5,000 calories per person in all areas", "1,000 calories per person in rural areas and 3,000 in urban areas", "Zero calories if the citizen owns a television set"], "A",
     "The Task Force on Minimum Needs and Effective Consumption Demand (1979) established the 2,400 calorie (rural) and 2,100 calorie (urban) nutritional poverty thresholds.", "Identifies traditional nutritional calorie norms for the poverty line.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u10_direct:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u10(make_question(CHAPTER_U10, topic, stem, opts, c, s))

u10_qs = u10_qs[:60]
assert len(u10_qs) == 60, f"Expected 60 questions for Unit 10, got {len(u10_qs)}"
validate_and_collect(u10_qs, u10_seen)
print("Unit 10 validated: 60 unique questions.")

# Save unit files
with open("mock/pol_units/unit8.json", "w", encoding="utf-8") as f:
    json.dump(u8_qs, f, indent=2, ensure_ascii=False)
print("Wrote mock/pol_units/unit8.json (60 questions)")

with open("mock/pol_units/unit9.json", "w", encoding="utf-8") as f:
    json.dump(u9_qs, f, indent=2, ensure_ascii=False)
print("Wrote mock/pol_units/unit9.json (40 questions)")

with open("mock/pol_units/unit10.json", "w", encoding="utf-8") as f:
    json.dump(u10_qs, f, indent=2, ensure_ascii=False)
print("Wrote mock/pol_units/unit10.json (60 questions)")
