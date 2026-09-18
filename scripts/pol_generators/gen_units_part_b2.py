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

for u in range(1, 11):
    p = f"mock/pol_units/unit{u}.json"
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            for item in json.load(f):
                global_seen.add(normalize_text(item.get("questionText", "")))

print(f"Loaded {len(global_seen)} questions from Units 1-10 into global_seen.")

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
# UNIT 11: India's External Relations (60 Questions)
# =================================================================================================
CHAPTER_U11 = "India's External Relations"
u11_qs = []
u11_seen = set()

def add_u11(q):
    u11_qs.append(q)

opts, c, s = rotate_options(
    "Article 51",
    ["Article 21", "Article 44", "Article 370"],
    "A",
    "Article 51 of the Directive Principles of State Policy in the Indian Constitution explicitly directs the state to promote international peace and security, maintain just and honourable relations between nations, and foster respect for international law.\nHence, Option {{CORR}} is correct.",
    "Identifies Article 51 of the Directive Principles on foreign policy."
)
add_u11(make_question(CHAPTER_U11, "Constitutional Principles Foreign Policy", "Which Article of the Directive Principles of State Policy in the Indian Constitution directs the state to promote international peace and security?", opts, c, s))

opts, c, s = rotate_options(
    "29 April 1954",
    ["15 August 1947", "20 October 1962", "1 January 1950"],
    "B",
    "The Panchsheel Agreement (Five Principles of Peaceful Coexistence) was signed on 29 April 1954 by Indian Prime Minister Jawaharlal Nehru and Chinese Premier Zhou Enlai.\nHence, Option {{CORR}} is correct.",
    "Identifies 29 April 1954 as signing date of Panchsheel."
)
add_u11(make_question(CHAPTER_U11, "Panchsheel Agreement", "On which date was the historic Panchsheel Agreement signed between Prime Minister Jawaharlal Nehru and Chinese Premier Zhou Enlai?", opts, c, s))

opts, c, s = rotate_options(
    "Bandung Conference of 1955 in Indonesia",
    ["New Delhi Asian Relations Conference 1947", "Belgrade Summit of 1961", "Cairo Summit of 1964"],
    "C",
    "The Afro-Asian Conference held in Bandung, Indonesia in April 1955 marked the zenith of Afro-Asian unity and laid the direct foundation for the Non-Aligned Movement (NAM).\nHence, Option {{CORR}} is correct.",
    "Identifies Bandung Conference 1955 as foundation of NAM."
)
add_u11(make_question(CHAPTER_U11, "Afro-Asian Unity", "Which landmark Afro-Asian conference held in Indonesia in 1955 served as the stepping stone leading to the establishment of the Non-Aligned Movement?", opts, c, s))

opts, c, s = rotate_options(
    "V.K. Krishna Menon",
    ["Sardar Baldev Singh", "Y.B. Chavan", "Swaran Singh"],
    "D",
    "Following the catastrophic military reverses during the 1962 Sino-Indian War, Defence Minister V.K. Krishna Menon faced severe criticism in Parliament and had to resign from the cabinet.\nHence, Option {{CORR}} is correct.",
    "Identifies V.K. Krishna Menon resigning after 1962 war."
)
add_u11(make_question(CHAPTER_U11, "Sino-Indian War Repercussions", "Which Union Defence Minister resigned from Jawaharlal Nehru's cabinet following the military reverses in the 1962 Sino-Indian border war?", opts, c, s))

# Match questions for Unit 11
add_u11(make_match_question(
    CHAPTER_U11, "NAM Founding Leaders",
    "Match List I (Founding Leader of NAM) with List II (Country of Origin):",
    [("A", "Josip Broz Tito"), ("B", "Gamal Abdel Nasser"), ("C", "Kwame Nkrumah"), ("D", "Sukarno")],
    [("I", "Yugoslavia"), ("II", "Egypt"), ("III", "Ghana"), ("IV", "Indonesia")],
    "A-I, B-II, C-III, D-IV", "A",
    "Tito was from Yugoslavia; Nasser from Egypt; Nkrumah from Ghana; Sukarno from Indonesia.",
    "Matches founding fathers of the Non-Aligned Movement with their countries."
))

add_u11(make_match_question(
    CHAPTER_U11, "India Foreign Accords Timeline",
    "Match List I (Treaty/Accord) with List II (Year of Enactment):",
    [("A", "Indo-Soviet 20-Year Treaty of Peace and Friendship"), ("B", "Shimla Agreement between India and Pakistan"), ("C", "Pokhran-I Peaceful Nuclear Explosion"), ("D", "Pokhran-II Operation Shakti Tests")],
    [("I", "August 1971"), ("II", "July 1972"), ("III", "May 1974"), ("IV", "May 1998")],
    "A-I, B-II, C-III, D-IV", "B",
    "Indo-Soviet Treaty signed August 1971; Shimla Agreement July 1972; Pokhran-I May 1974; Pokhran-II May 1998.",
    "Matches landmark Indian foreign policy treaties with enactment dates."
))

# Chronology questions for Unit 11
add_u11(make_sequence_question(
    CHAPTER_U11, "Sino-Indian Relations Timeline",
    "Arrange the following milestones in India-China relations in chronological sequence:",
    [("A", "Panchsheel Agreement signed on Tibet"), ("B", "Dalai Lama granted political asylum in India"), ("C", "Chinese military invasion across Aksai Chin and NEFA"), ("D", "Restoration of full ambassadorial diplomatic relations")],
    "A, B, C, D", "C",
    "1. Panchsheel signed (April 1954).\n2. Dalai Lama asylum (March 1959).\n3. Border war (October-November 1962).\n4. Full ambassadorial relations restored (1976).",
    "Sequences India-China diplomatic trajectory."
))

add_u11(make_sequence_question(
    CHAPTER_U11, "Indian Nuclear Milestones",
    "Arrange the following milestones of India's nuclear trajectory in chronological sequence:",
    [("A", "Establishment of Atomic Energy Commission under Homi Bhabha"), ("B", "Conduct of Pokhran-I nuclear test ('Smiling Buddha')"), ("C", "Refusal to sign the Comprehensive Test Ban Treaty (CTBT)"), ("D", "Conduct of series of nuclear tests at Pokhran-II ('Operation Shakti')")],
    "A, B, C, D", "D",
    "1. Atomic Energy Commission established (August 1948).\n2. Pokhran-I test (May 1974).\n3. India rejects CTBT (1996).\n4. Pokhran-II tests (May 1998).",
    "Sequences milestones of India's nuclear program."
))

# Statement questions for Unit 11
add_u11(make_statement_question(
    CHAPTER_U11, "Non-Alignment Philosophy",
    "Non-alignment meant that India remained strictly neutral, isolated, and indifferent to international disputes.",
    "India actively intervened in world affairs during the Cold War to mediate between rival superpower alliances and prevent regional wars from escalating.",
    4, "D",
    "Statement I is incorrect: Nehru insisted that non-alignment is neither isolationism nor passive neutrality. Statement II is correct: India actively mediated during crises such as Korea, the Suez Canal, and the Congo.",
    "Distinguishes active Non-Alignment from passive isolationism or neutrality."
))

add_u11(make_statement_question(
    CHAPTER_U11, "Nuclear Doctrine Principles",
    "India's nuclear doctrine maintains a policy of 'No First Use' (NFU) against nuclear-weapon states.",
    "India's nuclear doctrine declares that India reserves the right to use nuclear weapons pre-emptively against any non-nuclear state.",
    3, "C",
    "Statement I is correct: India commits to 'No First Use', retaining nuclear weapons purely for credible minimum deterrence. Statement II is false: The doctrine explicitly commits to non-use of nuclear weapons against non-nuclear weapon states.",
    "Outlines core tenets of India's nuclear doctrine."
))

# Assertion Reason for Unit 11
add_u11(make_assertion_question(
    CHAPTER_U11, "Indo-Soviet 1971 Treaty",
    "India signed the 20-year Treaty of Peace, Friendship and Cooperation with the Soviet Union in August 1971.",
    "The emerging diplomatic axis between the United States, Pakistan, and China during the Bangladesh crisis created a grave security threat for India.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains why India signed the treaty—Henry Kissinger's secret trip to Beijing via Pakistan in July 1971 signaled a US-China-Pakistan entente, necessitating a counter-deterrent from Moscow.",
    "Explains geopolitical motivations behind the 1971 Indo-Soviet Treaty."
))

add_u11(make_assertion_question(
    CHAPTER_U11, "Tashkent Agreement Tragedy",
    "Prime Minister Lal Bahadur Shastri passed away suddenly in Tashkent hours after signing the peace agreement with Pakistan.",
    "Shastri had led India through the 1965 war, raising the famous patriotic slogan 'Jai Jawan Jai Kisan'.",
    2, "B",
    "Both (A) and (R) are true historical facts documented in NCERT. Shastri died of a heart attack on 11 January 1966 in Tashkent, and had coined the slogan 'Jai Jawan Jai Kisan' during the 1965 war. However, (R) does not explain the cause of (A).",
    "Connects Lal Bahadur Shastri's leadership with the Tashkent Declaration."
))

# Multi statement for Unit 11
add_u11(make_multi_statement_question(
    CHAPTER_U11, "Panchsheel Five Principles",
    "Which of the following are among the Five Principles of Peaceful Coexistence (Panchsheel) signed between India and China in 1954?",
    [
        ("A", "Mutual respect for each other's territorial integrity and sovereignty"),
        ("B", "Mutual non-aggression and mutual non-interference in each other's internal affairs"),
        ("C", "Equality and mutual benefit, and peaceful co-existence"),
        ("D", "Creation of a joint Sino-Indian nuclear army to conquer East Asia")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements A, B, and C comprise the classic Panchsheel principles. Statement D is completely fictitious.",
    "Lists the Five Principles of Peaceful Coexistence (Panchsheel)."
))

add_u11(make_multi_statement_question(
    CHAPTER_U11, "1971 War Outcomes",
    "Which of the following were major outcomes of the 1971 Indo-Pakistan War?",
    [
        ("A", "Surrender of over 90,000 Pakistani armed personnel in Dhaka"),
        ("B", "Liberation and emergence of Bangladesh as an independent sovereign republic"),
        ("C", "Signing of the historic Simla Agreement between Indira Gandhi and Zulfikar Ali Bhutto in 1972"),
        ("D", "Immediate military annexation of West Pakistan by the Indian armed forces")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements A, B, and C are major historic outcomes of the 1971 war. D is false because India respected West Pakistan's sovereignty and declared a unilateral ceasefire.",
    "Details geopolitical consequences of the 1971 Bangladesh Liberation War."
))

# Direct MCQs for Unit 11
u11_direct = [
    ("First NAM Summit", "The First Summit Conference of the Non-Aligned Movement was held in September 1961 in which European city?",
     "Belgrade, Yugoslavia", ["Geneva, Switzerland", "Vienna, Austria", "Helsinki, Finland"], "A",
     "The inaugural NAM Summit was hosted by President Josip Broz Tito in Belgrade in September 1961, attended by 25 member states.", "Identifies Belgrade as venue of first NAM Summit 1961."),
    ("Nehru Foreign Policy Objectives", "What were the three major objectives of Jawaharlal Nehru's foreign policy as outlined in NCERT?",
     "To preserve hard-earned sovereignty, protect territorial integrity, and promote rapid economic development", ["To establish overseas military bases, conquer Tibet, and join NATO", "To declare war on all capitalist nations and join the Warsaw Pact", "To isolate India completely from international commerce"], "A",
     "Nehru defined Indian foreign policy around preserving sovereignty, defending borders, and accelerating domestic socio-economic progress.", "Lists Nehru's three core foreign policy objectives."),
    ("Homi Bhabha Atomic Leadership", "Under whose visionary scientific leadership was India's indigenous nuclear program initiated in the late 1940s?",
     "Dr. Homi Jehangir Bhabha", ["Dr. A.P.J. Abdul Kalam", "Dr. Vikram Sarabhai", "Dr. Raja Ramanna"], "A",
     "Dr. Homi Bhabha established the Tata Institute of Fundamental Research and the Atomic Energy Commission, laying the foundation of India's three-stage nuclear power program.", "Identifies Homi Bhabha as architect of Indian nuclear program."),
    ("Jai Jawan Jai Kisan Slogan", "During the 1965 war and concurrent food crisis, which Prime Minister gave the stirring national slogan 'Jai Jawan Jai Kisan'?",
     "Lal Bahadur Shastri", ["Jawaharlal Nehru", "Indira Gandhi", "Morarji Desai"], "A",
     "Lal Bahadur Shastri coined 'Jai Jawan Jai Kisan' in October 1965 at a public gathering in Delhi to inspire soldiers and farmers.", "Identifies Lal Bahadur Shastri for 'Jai Jawan Jai Kisan'."),
    ("Shimla Agreement Principles", "Under the Shimla Agreement of 1972, India and Pakistan mutually committed to:",
     "Settle all bilateral disputes through peaceful direct negotiations without third-party mediation", ["Submit all Kashmir border issues to the British Parliament", "Allow American naval warships to patrol the Line of Control", "Merge their national central banks"], "A",
     "The Shimla Agreement enshrined the principle of bilateralism, barring third-party intervention in resolving disputes between New Delhi and Islamabad.", "Explains bilateralism principle in Shimla Agreement."),
    ("Operation Smiling Buddha", "India's first peaceful nuclear explosion conducted underground at Pokhran, Rajasthan on 18 May 1974 was code-named:",
     "Operation Smiling Buddha", ["Operation Shakti", "Operation Meghdoot", "Operation Blue Star"], "A",
     "Pokhran-I was conducted on Buddha Purnima, 18 May 1974, with the code phrase 'The Buddha has smiled'.", "Identifies Operation Smiling Buddha for Pokhran-I."),
    ("Operation Shakti 1998", "In May 1998, India conducted five underground nuclear detonations at Pokhran under the operational code name:",
     "Operation Shakti", ["Operation Vijay", "Operation Cactus", "Operation Parakram"], "A",
     "Prime Minister Atal Bihari Vajpayee announced the successful testing of fission and thermonuclear devices under Operation Shakti on 11 and 13 May 1998.", "Identifies Operation Shakti for Pokhran-II."),
    ("Department Defence Production", "In the immediate aftermath of the 1962 war with China, the Government of India established the Department of Defence Production in:",
     "November 1962", ["January 1950", "August 1965", "July 1971"], "A",
     "The Department of Defence Production was created in November 1962 to modernise indigenous defense equipment manufacturing.", "Identifies November 1962 for Department of Defence Production."),
    ("Department Defence Supplies", "To mobilize domestic industrial capacities for military defense supplies, the Department of Defence Supplies was created in:",
     "1965 following the second Indo-Pak war", ["1950", "1975", "1999"], "A",
     "The Department of Defence Supplies was established in 1965 to substitute defense imports with indigenous private and public production.", "Identifies 1965 for Department of Defence Supplies."),
    ("Suez Crisis 1956 India Role", "During the 1956 Suez Crisis, India under Jawaharlal Nehru strongly condemned the military aggression against Egypt launched by:",
     "Britain, France, and Israel", ["The Soviet Union and China", "The United States and Canada", "Italy and Germany"], "A",
     "Nehru took a courageous international stance denouncing the joint British-French-Israeli military assault on Nasser's Egypt.", "Explains India's anti-imperialist stand during 1956 Suez Crisis."),
    ("Hungary Intervention 1956 Indian Stand", "India's foreign policy faced international criticism in late 1956 because New Delhi did not publicly condemn:",
     "The Soviet military invasion of Hungary to suppress the anti-communist uprising", ["The American construction of the Panama Canal", "The French liberation of Algeria", "The British withdrawal from India"], "A",
     "Critics argued India showed a pro-Soviet bias by abstaining on UN resolutions condemning the Soviet military intervention in Hungary in 1956.", "Analyzes Western criticism of Indian diplomacy on Hungary 1956."),
    ("Tibetan Autonomous Region Buffer", "Historically, Tibet served as a vital geopolitical 'buffer state' between India and China until:",
     "China annexed and assumed military control over Tibet in 1950", ["Tibet purchased nuclear submarines in 1970", "The United Nations dissolved Tibet in 1980", "India invaded Lhasa in 1962"], "A",
     "Tibet's traditional autonomy protected India's northern frontier until Chinese military annexation in 1950 eliminated the buffer.", "Explains Tibet's role as a historical buffer state."),
    ("Khampa Rebellion Tibet", "In 1956-1959, an armed resistance movement against Chinese communist occupation erupted in Tibet among the:",
     "Khampa tribesmen", ["Uighur nomads", "Mongolian cavaliers", "Manchurian guilds"], "A",
     "The Khampa rebellion in eastern Tibet resisted forced communist collectivisation, prompting brutal Chinese military crackdowns.", "Identifies Khampa rebellion in Tibet."),
    ("McMahon Line Boundary", "The contested international boundary line between India and Tibet (China) in the eastern sector (Arunachal Pradesh) was drawn at the 1914 Simla Convention by:",
     "Sir Henry McMahon", ["Sir Cyril Radcliffe", "Sir Mortimer Durand", "Lord Curzon"], "A",
     "Sir Henry McMahon negotiated the boundary line with Tibetan and British representatives in 1914, which China later refused to recognize.", "Identifies Sir Henry McMahon."),
    ("Aksai Chin Road", "In the 1950s, Sino-Indian relations deteriorated sharply when India discovered that China had built a strategic military road through Aksai Chin connecting:",
     "Tibet and Xinjiang province", ["Beijing and Shanghai", "Lhasa and Kathmandu", "Hong Kong and Canton"], "A",
     "China built the strategic Western Highway through Aksai Chin in Ladakh without Indian knowledge, sparking intense border disputes.", "Identifies Aksai Chin highway connecting Tibet and Xinjiang."),
    ("Kashmir Ceasefire 1949", "The first war between India and Pakistan over Jammu and Kashmir was brought to an end on 1 January 1949 through a ceasefire brokered by the:",
     "United Nations Security Council", ["League of Nations", "Soviet Union", "British Commonwealth"], "A",
     "The UN-brokered ceasefire took effect on 1 January 1949, leaving roughly one-third of the territory under Pakistani occupation (PoK).", "Identifies UN ceasefire on 1 January 1949."),
    ("General Manekshaw 1971", "The Chief of the Army Staff who masterminded India's military strategy during the 1971 Bangladesh Liberation War and became India's first Field Marshal was:",
     "General Sam Manekshaw", ["General K.S. Thimayya", "General J.N. Chaudhuri", "General K.M. Cariappa"], "A",
     "General Sam Manekshaw led the armed forces to a decisive victory in December 1971, being promoted to the five-star rank of Field Marshal in 1973.", "Identifies Field Marshal Sam Manekshaw."),
    ("Rann of Kutch Skirmish 1965", "In April 1965, before launching an offensive in Jammu and Kashmir, the Pakistani armed forces launched an armed military probe into:",
     "The Rann of Kutch in Gujarat", ["The Thar Desert in Rajasthan", "The Sundarbans in Bengal", "The Siachen Glacier in Ladakh"], "A",
     "Pakistan launched an armed assault in the Rann of Kutch in April 1965, which was resolved through British mediation before full war erupted in August.", "Identifies Rann of Kutch armed clash of April 1965."),
    ("Operation Gibraltar 1965", "Pakistan's covert military plan in August 1965 to infiltrate thousands of armed guerrillas across the ceasefire line to spark a rebellion in Kashmir was code-named:",
     "Operation Gibraltar", ["Operation Grand Slam", "Operation Searchlight", "Operation Badr"], "A",
     "Operation Gibraltar was conceived by Pakistani planners under Ayub Khan to destabilize Kashmir, leading directly to the 1965 war.", "Identifies Operation Gibraltar in 1965."),
    ("Operation Grand Slam 1965", "When Operation Gibraltar failed, the Pakistani military launched an armored offensive toward the strategic Akhnoor bridge in Jammu, code-named:",
     "Operation Grand Slam", ["Operation Gibraltar", "Operation Meghdoot", "Operation Blue Star"], "A",
     "Operation Grand Slam aimed to sever India's vital supply line to Poonch and Rajouri, prompting India to open a front across the international border toward Lahore.", "Identifies Operation Grand Slam."),
    ("Indian Counter-Offensive 1965", "To relieve severe pressure on the Akhnoor sector during the 1965 war, Indian Prime Minister Lal Bahadur Shastri ordered:",
     "The Indian Army to cross the international border in Punjab and launch an offensive towards Lahore and Sialkot", ["The naval fleet to sail to the Mediterranean Sea", "The surrender of Jammu city to the United Nations", "An air drop of food grains over Karachi"], "A",
     "Shastri's bold military counter-stroke toward Lahore forced Pakistan to divert its armored divisions, neutralizing the threat to Jammu.", "Explains Shastri's Punjab counter-offensive toward Lahore in 1965."),
    ("Kissinger Secret Visit Beijing", "In July 1971, US National Security Advisor Henry Kissinger made a dramatic secret diplomatic visit to Beijing from:",
     "Pakistan", ["India", "Afghanistan", "Japan"], "A",
     "Kissinger feigned illness in Islamabad and flew secretly to Beijing on 9 July 1971 to arrange President Nixon's historic 1972 trip to China.", "Identifies Kissinger's secret trip from Pakistan to Beijing in 1971."),
    ("USS Enterprise 1971", "During the final days of the 1971 war, the United States dispatched which nuclear-powered aircraft carrier task force into the Bay of Bengal to intimidate India?",
     "USS Enterprise (Task Force 74)", ["USS Nimitz", "USS Ronald Reagan", "USS George Washington"], "A",
     "The Nixon administration ordered the USS Enterprise to the Bay of Bengal to exert gunboat diplomacy, which was countered by Soviet nuclear submarine deployments.", "Identifies USS Enterprise deployed in 1971."),
    ("CTBT Rejection Rationale", "India refused to sign the Comprehensive Test Ban Treaty (CTBT) in 1996 because:",
     "It did not contain a time-bound commitment by existing nuclear powers for total nuclear disarmament and was discriminatory", ["It required all Indian citizens to learn Russian", "It banned the construction of civilian hydroelectric dams", "It allowed China to station troops in Mumbai"], "A",
     "India rejected the CTBT as fundamentally flawed and discriminatory, preserving existing nuclear monopolies while restricting developing states.", "Explains India's rejection of CTBT in 1996."),
    ("Asian Relations Conference 1947", "The historic Asian Relations Conference that brought together representatives from across Asia before Indian independence was hosted in New Delhi in:",
     "March-April 1947", ["August 1945", "January 1950", "October 1952"], "A",
     "Nehru convened the Asian Relations Conference in New Delhi in March 1947, proclaiming the resurgence of Asian nations after colonial rule.", "Identifies Asian Relations Conference in March 1947."),
    ("Indo-China Full Ties Restoration", "Full ambassadorial diplomatic relations between India and China, frozen since the 1962 war, were formally restored in:",
     "1976", ["1965", "1988", "1998"], "A",
     "India and China upgraded diplomatic missions back to full ambassadorial rank in 1976 under Prime Minister Indira Gandhi.", "Identifies 1976 for restoration of Sino-Indian ambassadorial ties."),
    ("Dalai Lama Residence India", "Following his escape from Tibet in 1959, the Dalai Lama and the Central Tibetan Administration established their headquarters in India at:",
     "McLeod Ganj, Dharamshala (Himachal Pradesh)", ["Shimla", "Dehradun", "Darjeeling"], "A",
     "The Dalai Lama was welcomed by Nehru and given sanctuary in Dharamshala, which became the spiritual capital of the Tibetan diaspora.", "Identifies Dharamshala as residence of Dalai Lama."),
    ("Zhou Enlai Visit 1960", "Chinese Premier Zhou Enlai visited New Delhi in April 1960 for summit talks with Nehru to resolve the boundary dispute, which ended in:",
     "Failure to reach any agreement due to irreconcilable territorial positions", ["The complete surrender of Aksai Chin to India", "A joint military defense alliance between India and China", "The abolition of the McMahon Line by mutual consent"], "A",
     "The April 1960 Nehru-Zhou summit ended in deadlock as China refused to vacate Aksai Chin and India defended the McMahon Line.", "Recalls April 1960 Nehru-Zhou summit failure."),
    ("Chinese Ceasefire 1962", "The 1962 Sino-Indian War ended abruptly when China unilaterally declared a ceasefire and withdrew its troops 20 km behind the line of actual control on:",
     "21 November 1962", ["15 August 1962", "26 January 1963", "1 January 1962"], "A",
     "China announced a unilateral ceasefire on 20-21 November 1962 after achieving its territorial objectives in Aksai Chin and NEFA.", "Identifies 21 November 1962 unilateral Chinese ceasefire."),
    ("First Non-Aligned Summit Attendees", "How many sovereign member nations participated in the historic first NAM Summit in Belgrade in 1961?",
     "25 member countries", ["100 member countries", "50 member countries", "10 member countries"], "A",
     "The 1961 Belgrade Summit was attended by 25 participating states alongside 3 observer nations.", "Recalls 25 countries attending first NAM summit."),
    ("Tashkent Pact Renunciation of Force", "Under the Tashkent Declaration of 1966, India and Pakistan agreed to:",
     "Withdraw all armed personnel to positions held prior to 5 August 1965 and resolve disputes peacefully without force", ["Partition Kashmir permanently along the Chenab river", "Surrender all military equipment to the Soviet Union", "Abolish the border checkposts between Punjab and Sindh"], "A",
     "The Tashkent Declaration mediated by Kosygin restored pre-conflict territorial status quo and committed both nations to non-use of force.", "Details core provisions of Tashkent Declaration 1966."),
    ("Kargil Victory Day", "Kargil Vijay Diwas is celebrated in India every year on which date to commemorate the successful eviction of Pakistani intruders in 1999?",
     "26 July", ["15 August", "16 December", "30 January"], "A",
     "Operation Vijay concluded successfully on 26 July 1999 when Indian forces evicted Pakistani regulars from the heights of Kargil, Drass, and Batalik.", "Identifies 26 July as Kargil Vijay Diwas."),
    ("Lahore Declaration Safeguards", "The Lahore Declaration signed in February 1999 between Vajpayee and Sharif included mutual commitments to:",
     "Notify each other immediately in the event of accidental or unauthorized ballistic missile launches", ["Dismantle all nuclear warheads in existence within 48 hours", "Merge the Indian and Pakistani armed forces under joint command", "Transfer the Siachen Glacier to Chinese administration"], "A",
     "The Lahore Declaration established vital nuclear confidence-building measures and ballistic missile flight-test pre-notifications.", "Details Lahore Declaration nuclear safeguards."),
    ("Sino-Indian Western Sector", "Which sector of the contested Sino-Indian boundary includes the strategic Aksai Chin plateau in the Ladakh region?",
     "Western Sector", ["Eastern Sector", "Middle Sector", "Southern Sector"], "A",
     "The western sector of the Sino-Indian border comprises the Ladakh region where China occupied the Aksai Chin plateau.", "Identifies Aksai Chin in the Western Sector."),
    ("Simla Convention McMahon Line", "The McMahon Line separating India and China in the eastern sector was negotiated in 1914 during which tripartite conference?",
     "The Simla Convention between Great Britain, China, and Tibet", ["The Treaty of Versailles", "The Treaty of Sugauli", "The Tashkent Conference"], "A",
     "The McMahon Line was drawn at the Simla Conference of 1914 by British plenipotentiary Sir Henry McMahon with Tibetan representatives.", "Identifies 1914 Simla Convention."),
    ("Asian Relations Conference Old Fort", "In which historical monument in New Delhi did Jawaharlal Nehru inaugurate the landmark Asian Relations Conference in March 1947?",
     "Purana Qila (Old Fort)", ["Red Fort", "Rashtrapati Bhavan", "Safdarjung Tomb"], "A",
     "The Asian Relations Conference was hosted under a massive shamiana in the historic precincts of Purana Qila in New Delhi in March-April 1947.", "Identifies Purana Qila as venue."),
    ("Indira-Mujib 25-Year Treaty", "In March 1972, Prime Minister Indira Gandhi signed a landmark 25-year Treaty of Friendship, Cooperation and Peace with:",
     "Sheikh Mujibur Rahman of Bangladesh", ["Zulfikar Ali Bhutto of Pakistan", "Sirimavo Bandaranaike of Sri Lanka", "Birendra of Nepal"], "A",
     "The Indo-Bangladesh Treaty of Friendship was signed in Dhaka on 19 March 1972 by Indira Gandhi and Sheikh Mujibur Rahman.", "Identifies 1972 Indo-Bangladesh 25-year Friendship Treaty."),
    ("Operation Cactus 1988 Maldives", "What was the code name of the rapid Indian military intervention launched in November 1988 to suppress an attempted coup in the Maldives?",
     "Operation Cactus", ["Operation Meghdoot", "Operation Pawan", "Operation Vijay"], "A",
     "Operation Cactus was launched on 3 November 1988 when Indian paratroopers flew to Male, swiftly crushing a mercenary coup attempt against President Gayoom.", "Recalls Operation Cactus in Maldives."),
    ("Operation Meghdoot Siachen", "Under Operation Meghdoot launched in April 1984, the Indian Army established permanent military control over which vital Himalayan strategic zone?",
     "Siachen Glacier", ["Aksai Chin", "Tiger Hill", "Nathu La Pass"], "A",
     "Operation Meghdoot secured the Siachen Glacier and key mountain passes along the Saltoro Ridge before Pakistani forces could seize them.", "Identifies Operation Meghdoot 1984 at Siachen Glacier."),
    ("Peaceful Nuclear Explosion Doctrine", "Following the Pokhran-I nuclear explosion in May 1974, India reiterated that its nuclear doctrine was strictly oriented toward:",
     "Peaceful scientific, industrial, and developmental applications without joining discriminatory non-proliferation regimes", ["Pre-emptive offensive attacks against rival neighbouring states", "Transferring atomic technology to non-state actors", "Eliminating conventional ground forces in favour of nuclear weapons"], "A",
     "India designated Pokhran-I a 'Peaceful Nuclear Explosion' (PNE) aimed at energy self-reliance and technological autonomy.", "Details India's Peaceful Nuclear Explosion stance."),
    ("Panchsheel Joint Communique June 1954", "In June 1954, which Chinese Premier visited New Delhi, issuing a joint communique with Nehru reaffirming the five principles of peaceful coexistence?",
     "Zhou Enlai", ["Mao Zedong", "Deng Xiaoping", "Liu Shaoqi"], "A",
     "Premier Zhou Enlai visited New Delhi in late June 1954, reaffirming the Panchsheel principles in a celebrated joint statement with Prime Minister Nehru.", "Recalls Zhou Enlai's June 1954 visit."),
    ("Border Peace and Tranquillity 1993", "The historic 1993 agreement committing India and China to maintain peace and tranquillity along the Line of Actual Control was signed during the prime ministership of:",
     "P.V. Narasimha Rao", ["Rajiv Gandhi", "Atal Bihari Vajpayee", "I.K. Gujral"], "A",
     "In September 1993, Prime Minister P.V. Narasimha Rao signed the landmark LAC Peace and Tranquillity Agreement in Beijing.", "Recalls 1993 Peace and Tranquillity agreement under Rao."),
    ("Sada-e-Sarhad Bus Service", "What was the name of the Delhi-Lahore bus service inaugurated by Prime Minister Atal Bihari Vajpayee during his historic peace journey in February 1999?",
     "Sada-e-Sarhad", ["Samjhauta Express", "Maitree Express", "Thar Express"], "A",
     "Prime Minister Vajpayee travelled on the inaugural run of the Sada-e-Sarhad bus across the Wagah border to Lahore on 19-20 February 1999.", "Recalls Sada-e-Sarhad bus service 1999."),
    ("Kargil NH 1D Lifeline", "During the 1999 Kargil infiltration, Pakistani forces aimed to cut off which vital strategic highway connecting the Kashmir Valley to Ladakh?",
     "National Highway 1D (NH 1D Srinagar-Leh highway)", ["National Highway 44 (NH 44)", "Grand Trunk Road", "Hindustan-Tibet Road"], "A",
     "Pakistani intruders occupied ridge heights overlooking NH 1D to interdict Indian military supply convoys between Srinagar and Leh.", "Identifies NH 1D as critical Kargil lifeline."),
    ("Nehru Core Foreign Policy Goals", "Jawaharlal Nehru formulated India's foreign policy around three fundamental pillars: preserve hard-won sovereignty, protect territorial integrity, and:",
     "Promote rapid socio-economic development", ["Align militarily with the capitalist Western bloc", "Build an offensive colonial empire", "Isolate India from all international trade"], "A",
     "Nehru's three central foreign policy objectives were: sovereignty, territorial integrity, and rapid domestic economic development through non-alignment.", "Recalls Nehru's three foreign policy objectives."),
    ("Khampa Rebellion Tibet", "The armed Tibetan resistance against Chinese authority in the mid-1950s was primarily organized by tribesmen from which eastern Tibetan region?",
     "Kham region (Khampas)", ["Lhasa city", "Shigatse", "Ladakh valley"], "A",
     "The Khampa rebellion began in 1956 in eastern Tibet (Kham) and spread across the plateau, eventually prompting the Dalai Lama's flight to India in 1959.", "Identifies Khampa resistance in Tibet.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u11_direct:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u11(make_question(CHAPTER_U11, topic, stem, opts, c, s))

u11_qs = u11_qs[:60]
assert len(u11_qs) == 60, f"Expected 60 questions for Unit 11, got {len(u11_qs)}"
validate_and_collect(u11_qs, u11_seen)
print("Unit 11 validated: 60 unique questions.")


# =================================================================================================
# UNIT 12: Challenges to and Restoration of the Congress System (40 Questions)
# =================================================================================================
CHAPTER_U12 = "Challenges to and Restoration of the Congress System"
u12_qs = []
u12_seen = set()

def add_u12(q):
    u12_qs.append(q)

opts, c, s = rotate_options(
    "1967 Fourth General Elections",
    ["1952 First General Elections", "1971 Fifth General Elections", "1977 Sixth General Elections"],
    "A",
    "The 1967 Fourth General Elections were termed a 'political earthquake' because Congress lost power in eight states and secured its lowest-ever seat tally in the Lok Sabha since independence.\nHence, Option {{CORR}} is correct.",
    "Identifies 1967 Fourth General Elections as 'political earthquake'."
)
add_u12(make_question(CHAPTER_U12, "1967 General Elections", "Which general election in Indian political history was described by contemporary political scientists as a 'political earthquake'?", opts, c, s))

opts, c, s = rotate_options(
    "Defection of elected legislators (Aaya Ram, Gaya Ram phenomenon)",
    ["Use of electronic voting machines", "Banning of all regional languages in state assemblies", "Direct presidential appointment of governors without elections"],
    "B",
    "The famous phrase 'Aaya Ram, Gaya Ram' originated after Haryana legislator Gaya Lal changed his party thrice in a fortnight in 1967, characterizing the rampant political defections that toppled state ministries.\nHence, Option {{CORR}} is correct.",
    "Identifies political defections and 'Aaya Ram, Gaya Ram'."
)
add_u12(make_question(CHAPTER_U12, "Political Defections", "The popular political phrase 'Aaya Ram, Gaya Ram' was coined in 1967 to describe which widespread phenomenon in state politics?", opts, c, s))

opts, c, s = rotate_options(
    "V.V. Giri as an independent candidate against N. Sanjeeva Reddy",
    ["Morarji Desai against Indira Gandhi", "Dr. Zakir Hussain against C. Rajagopalachari", "Jagjivan Ram against Y.B. Chavan"],
    "C",
    "In the dramatic 1969 presidential election, Indira Gandhi encouraged a 'conscience vote' and backed independent candidate V.V. Giri, who defeated the official Congress Syndicate nominee Neelam Sanjeeva Reddy.\nHence, Option {{CORR}} is correct.",
    "Identifies V.V. Giri supported by Indira Gandhi in 1969 election."
)
add_u12(make_question(CHAPTER_U12, "1969 Presidential Election", "In the historic 1969 Presidential election that triggered the split in the Congress party, Indira Gandhi secretly supported which candidate?", opts, c, s))

opts, c, s = rotate_options(
    "'Garibi Hatao' (Remove Poverty)",
    ["'Indira Hatao' (Remove Indira)", "'Jai Jawan Jai Kisan'", "'Roti, Kapda aur Makaan'"],
    "D",
    "In the 1971 general elections, Indira Gandhi countered the opposition's negative slogan 'Indira Hatao' with her masterly, positive populist slogan 'Garibi Hatao' (Remove Poverty).\nHence, Option {{CORR}} is correct.",
    "Identifies 'Garibi Hatao' slogan of 1971."
)
add_u12(make_question(CHAPTER_U12, "1971 Election Slogan", "Which famous populist slogan was given by Indira Gandhi in the 1971 general elections to counter the Grand Alliance's slogan of 'Indira Hatao'?", opts, c, s))

# Match question for Unit 12
add_u12(make_match_question(
    CHAPTER_U12, "Congress Leaders and Roles",
    "Match List I (Leader) with List II (Key Role / Association):",
    [("A", "K. Kamaraj"), ("B", "Morarji Desai"), ("C", "S. Nijalingappa"), ("D", "V.V. Giri")],
    [("I", "Congress President who formulated the 'Kamaraj Plan' in 1963"), ("II", "Deputy Prime Minister who contested against Indira Gandhi for leadership in 1966"), ("III", "Congress President who formally expelled Indira Gandhi in 1969"), ("IV", "Independent candidate who won the 1969 Presidential election with Indira's backing")],
    "A-I, B-II, C-III, D-IV", "A",
    "Kamaraj proposed the Kamaraj Plan; Morarji was Deputy PM; Nijalingappa expelled Indira in 1969; V.V. Giri won the 1969 presidential contest.",
    "Matches Congress Syndicate and rival leaders with their historical actions."
))

# Chronology question for Unit 12
add_u12(make_sequence_question(
    CHAPTER_U12, "Succession and Split Timeline",
    "Arrange the following political succession and party split milestones in chronological sequence:",
    [("A", "Lal Bahadur Shastri becomes Prime Minister after Nehru"), ("B", "Indira Gandhi defeats Morarji Desai in secret ballot of CPP"), ("C", "Fourth General Elections and emergence of SVD coalitions"), ("D", "Formal split of Congress into Congress (O) and Congress (R)")],
    "A, B, C, D", "B",
    "1. Shastri becomes PM (May 1964).\n2. Indira elected PM (January 1966).\n3. Fourth General Elections (February 1967).\n4. Split in Congress (November 1969).",
    "Sequences events from Nehru's death to the 1969 Congress split."
))

# Statement question for Unit 12
add_u12(make_statement_question(
    CHAPTER_U12, "1969 Split Factions",
    "Following the 1969 presidential election, the Congress party split into Congress (O) led by the Syndicate and Congress (R) led by Indira Gandhi.",
    "Indira Gandhi lost the 1971 general elections and Congress (O) won a massive three-fourths majority in Parliament.",
    3, "C",
    "Statement I is correct: Congress broke into Congress (Organisation) and Congress (Requisitionists). Statement II is false: Indira Gandhi's Congress (R) scored a landslide victory winning 352 seats, while Congress (O) was decimated to just 16 seats.",
    "Evaluates the 1969 Congress split and the 1971 electoral verdict."
))

# Assertion Reason for Unit 12
add_u12(make_assertion_question(
    CHAPTER_U12, "Restoration Nature",
    "Indira Gandhi restored the Congress party to political dominance, but she did not restore the original 'Congress System'.",
    "The new Congress under Indira Gandhi was not an internal coalition of factions accommodating diverse opinions; rather, it was a highly centralized, personalized party dependent entirely on her supreme popularity.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains why political scientists note that while Congress dominance returned, the inclusive 'Congress System' described by Rajni Kothari had fundamentally changed into a centralized personal vehicle.",
    "Explains the transformation of the Congress System under Indira Gandhi."
))

# Multi statement for Unit 12
add_u12(make_multi_statement_question(
    CHAPTER_U12, "Ten Point Programme 1967",
    "Which of the following socialist policy measures were included in Indira Gandhi's 'Ten Point Programme' adopted by the Congress in May 1967?",
    [
        ("A", "Social control of banking institutions and nationalisation of general insurance"),
        ("B", "Ceilings on urban property and income, and public distribution of food grains"),
        ("C", "Abolition of princely privileges and privy purses"),
        ("D", "Mandatory privatization of all railways and post offices")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements A, B, and C comprise the core progressive planks of the Ten-Point Programme of 1967. D is contradictory to Indira's socialist posture.",
    "Identifies components of Indira Gandhi's Ten-Point Programme."
))

# Direct MCQs for Unit 12
u12_direct = [
    ("Kamaraj Plan 1963", "The famous 'Kamaraj Plan' formulated by K. Kamaraj in 1963 proposed that:",
     "All senior Congress ministers should resign from cabinet posts to devote themselves full-time to grassroots party revitalization", ["Nehru should resign and hand power to the military", "All opposition parties should be banned by presidential decree", "The capital of India should be moved to Madras"], "A",
     "The Kamaraj Plan proposed that senior leaders step down from government office to rebuild party organization at the grassroots level.", "Defines the 1963 Kamaraj Plan."),
    ("SVD Full Form", "In the post-1967 era, non-Congress joint coalition governments formed in states like Bihar and UP were known as:",
     "Samyukta Vidhayak Dal (SVD)", ["Socialist Vikas Dal", "Secular Voters Directorate", "Swatantra Videsh Dal"], "A",
     "Samyukta Vidhayak Dal (SVD) ministries brought disparate opposition parties together to form non-Congress coalition governments.", "Defines Samyukta Vidhayak Dal (SVD)."),
    ("Syndicate Definition", "In Indian political history, 'The Syndicate' was the informal name given to:",
     "A powerful group of senior, influential old-guard Congress leaders who controlled the party organization in the 1960s", ["A secret syndicate of foreign arms merchants", "A committee of underground Naxalite rebels", "An association of private commercial banks in Bombay"], "A",
     "The Syndicate included veteran state bosses like K. Kamaraj (Tamil Nadu), S.K. Patil (Bombay), Atulya Ghosh (Bengal), and Sanjeeva Reddy (Andhra).", "Defines the Syndicate in Congress history."),
    ("Indira vs Morarji Contest", "In January 1966, how was the contested succession between Indira Gandhi and Morarji Desai resolved in the Congress Parliamentary Party?",
     "Through a secret democratic ballot among Congress MPs, which Indira Gandhi won with over two-thirds of the votes", ["Through a coin toss conducted by the President", "Through a hunger strike organized by the Syndicate", "Through a directive issued by the British monarch"], "A",
     "Indira Gandhi defeated Morarji Desai by 355 votes to 169 in a secret ballot of Congress MPs on 19 January 1966.", "Recalls the secret ballot election between Indira and Morarji."),
    ("Grand Alliance 1971", "The major non-communist, non-Congress opposition coalition formed to contest the 1971 general elections was known as the:",
     "Grand Alliance (comprising Congress (O), Jana Sangh, PSP, SSP, and Swatantra)", ["United National Front", "Samyukta Morcha", "Janata Coalition"], "A",
     "The Grand Alliance brought together disparate ideological parties under the singular common objective of 'Indira Hatao'.", "Identifies the 1971 Grand Alliance."),
    ("1971 Landslide Seats", "In the 1971 Lok Sabha elections, the Congress (R) - CPI alliance achieved an overwhelming landslide victory by winning:",
     "375 seats out of 518 (with Congress (R) alone securing 352 seats)", ["Only 150 seats, falling short of a majority", "Exactly 200 seats", "All 518 seats with zero opposition"], "A",
     "Indira Gandhi's Congress (R) swept the 1971 elections with 352 seats and 43.7% of the vote, restoring undisputed dominance.", "Recalls 1971 Lok Sabha election results."),
    ("Congress O 1971 Decimation", "How many seats did the Syndicate-led Congress (O) manage to win in the 1971 general elections against Indira Gandhi?",
     "Only 16 seats", ["150 seats", "250 seats", "Zero seats"], "A",
     "The Congress (O) was decimated to just 16 seats with 10.4% vote share, proving that Indira's Congress was the genuine real Congress.", "Recalls Congress (O) seat tally in 1971."),
    ("Conscience Vote 1969", "Indira Gandhi openly defied the official party leadership in the 1969 presidential election by urging Congress MPs and MLAs to vote:",
     "According to their 'inner conscience' rather than following the party whip", ["Only for the candidate nominated by the Syndicate", "Only for foreign diplomats", "By boycotting the ballot entirely"], "A",
     "Indira's call for a 'conscience vote' was a masterly tactical maneuver that mobilized left and backward-caste legislators to back V.V. Giri.", "Explains Indira Gandhi's 'conscience vote' call."),
    ("V.V. Giri Previous Office", "Prior to contesting and winning the 1969 Presidential election as an independent candidate, V.V. Giri held the office of:",
     "Vice-President and Acting President of India", ["Chief Justice of India", "Speaker of the Lok Sabha", "Chief Minister of Madras"], "A",
     "Varahagiri Venkata Giri was the serving Vice-President, assuming the acting presidency upon the death of President Dr. Zakir Hussain.", "Identifies V.V. Giri's previous office."),
    ("DMK Victory 1967", "In the 1967 state assembly elections, which regional party made history by winning a clear absolute majority on its own in Madras (Tamil Nadu)?",
     "Dravida Munnetra Kazhagam (DMK) led by C.N. Annadurai", ["All India Anna DMK (AIADMK)", "Swatantra Party", "Communist Party of India"], "A",
     "The DMK routed the Congress in Madras state in 1967, becoming the first regional party in India to secure a single-party majority in a state assembly.", "Identifies DMK's historic 1967 victory in Tamil Nadu."),
    ("Anti-Hindi Agitations 1965", "The DMK's massive electoral victory in 1967 was fueled primarily by its leadership of which major public movement in 1965?",
     "The anti-Hindi agitations against the imposition of Hindi as the sole official language", ["The movement demanding the nationalisation of tea estates", "The movement to ban all passenger railways in the South", "The agitation against the construction of the Bhakra dam"], "A",
     "Widespread student protests against Hindi imposition in January-February 1965 cemented DMK's popular hegemony in Tamil Nadu.", "Connects 1965 anti-Hindi agitations to DMK rise."),
    ("Congress Defeat in Eight States 1967", "In the 1967 assembly elections, Congress failed to form governments in eight states, including which prominent northern belt?",
     "Punjab, Haryana, UP, Bihar, West Bengal, Orissa, Madras, and Kerala", ["Gujarat, Maharashtra, and Mysore", "Assam, Nagaland, and Sikkim", "Andhra Pradesh and Kashmir"], "A",
     "Congress lost power across seven states and was toppled by defections in UP, losing control over a vast continuous territory from Punjab to Bengal.", "Lists states where Congress lost in 1967."),
    ("Indira Gandhi Minority Government 1969-71", "Following the formal split in Congress in November 1969, Indira Gandhi's minority government survived in Parliament with the outside issue-based support of:",
     "The Communist Party of India (CPI) and the DMK", ["The Bharatiya Jana Sangh and Swatantra Party", "The Muslim League and Akali Dal exclusively", "The British Parliament"], "A",
     "Indira Gandhi ran a minority government from November 1969 to December 1970 with crucial outside legislative backing from the CPI and DMK.", "Identifies parties supporting Indira's minority government."),
    ("Early Dissolution Lok Sabha 1970", "Why did Indira Gandhi advise President V.V. Giri to dissolve the Lok Sabha in December 1970, a full year ahead of schedule?",
     "To seek a fresh popular mandate for her socialist policies and break free from dependence on other parties", ["Because Parliament was burned down in an accident", "Because the Supreme Court ordered the abolition of elections", "Because the World Bank demanded a military government"], "A",
     "Indira boldly dissolved the Lok Sabha in December 1970 to delink parliamentary elections from state assembly elections and secure a clear socialist mandate.", "Explains rationale for early dissolution in December 1970."),
    ("Social Coalition of New Congress", "The new social coalition constructed by Indira Gandhi in the 1971 elections was anchored primarily among which demographics?",
     "The poor, landless labourers, Dalits, Adivasis, minorities, and women", ["The former hereditary princes and feudal landlords", "Big urban business industrialists and foreign bankers", "Traditional royal courtiers of princely states"], "A",
     "Indira bypassed traditional village patrons, appealing directly to marginalized social groups with her pro-poor socialist message.", "Profiles Indira Gandhi's new social coalition in 1971."),
    ("S. Nijalingappa Presidency", "S. Nijalingappa, who formally issued the expulsion letter to Prime Minister Indira Gandhi on 12 November 1969, was the Congress President from which state?",
     "Mysore (Karnataka)", ["Maharashtra", "Gujarat", "Andhra Pradesh"], "A",
     "Siddavanahalli Nijalingappa was the Chief Minister of Mysore and served as Congress President during the tumultuous 1968-1969 factional civil war.", "Identifies S. Nijalingappa from Karnataka."),
    ("Privy Purse Supreme Court Strike", "In 1970, when the Rajya Sabha failed by a fraction of a vote to pass the constitutional amendment abolishing Privy Purses, Indira Gandhi attempted to:",
     "Abolish Privy Purses via Presidential Order, which was promptly struck down as unconstitutional by the Supreme Court", ["Declare war on all former princely capitals", "Arrest all Supreme Court judges under military law", "Abolish the Indian currency system"], "A",
     "The Supreme Court struck down the Presidential derecognition of princes in December 1970 (Madhav Rao Scindia case), prompting Indira to call snap general elections.", "Recalls Supreme Court striking down Privy Purse abolition in 1970."),
    ("Charan Singh BKD Formation", "In April 1967, Chaudhary Charan Singh walked out of the Congress party in Uttar Pradesh with his loyal MLAs to form the:",
     "Bharatiya Kranti Dal (BKD)", ["Swatantra Party", "Samyukta Socialist Party", "Janata Dal"], "A",
     "Charan Singh deserted the Congress in UP, bringing down the C.B. Gupta government and becoming Chief Minister heading the first SVD ministry.", "Identifies Charan Singh founding BKD in 1967."),
    ("Devaluation Unpopularity 1966", "Why was the 1966 devaluation of the rupee fiercely criticized by opposition parties and even Congress leaders as a surrender to Western imperialism?",
     "Because it raised the domestic price of essential imports and was seen as buckling under American and World Bank diktat", ["Because it made Indian cotton too cheap in London", "Because it banned all private citizens from using banks", "Because it replaced Hindi numbers on coins"], "A",
     "The devaluation was seen as a national humiliation and failed to boost exports immediately, damaging Indira Gandhi's early political standing.", "Explains political backlash against 1966 devaluation."),
    ("Atulya Ghosh Syndicate Leader", "Which member of the Congress Syndicate was the undisputed organizational party boss of West Bengal in the 1960s?",
     "Atulya Ghosh", ["Bidhan Chandra Roy", "Prafulla Chandra Sen", "Jyoti Basu"], "A",
     "Atulya Ghosh headed the Bengal Provincial Congress Committee and was a key power broker in the national Syndicate.", "Identifies Atulya Ghosh of West Bengal."),
    ("S.K. Patil Bombay Boss", "Which influential Syndicate leader was renowned as the 'uncrowned king of Bombay', mobilizing immense corporate campaign financing for Congress?",
     "S.K. Patil", ["Morarji Desai", "Y.B. Chavan", "Vasantrao Naik"], "A",
     "Sadashiv Kanoji Patil wielded formidable control over the Bombay Congress machinery and financial networks.", "Identifies S.K. Patil of Bombay."),
    ("Ten-Point Programme 1967", "In May 1967, the Congress Working Committee adopted a radical socialist reform programme championed by Indira Gandhi known as:",
     "The Ten-Point Programme", ["The Twenty-Point Programme", "The Five-Point Programme", "The Minimum Needs Programme"], "A",
     "The Ten-Point Programme was adopted in May 1967, including social control of banks, nationalisation of general insurance, and land reforms.", "Identifies 1967 Ten-Point Programme."),
    ("Ten-Point Programme Measures", "Which of the following was explicitly mandated under the 1967 Ten-Point Programme of the Congress?",
     "Social control of banking institutions, nationalisation of general insurance, and public distribution of foodgrains", ["Complete privatisation of railway networks", "Total deregulation of heavy industries", "Handing over foreign trade to private monopolies"], "A",
     "The Ten-Point Programme aimed to assert state control over commanding heights of the economy and regulate financial credit.", "Details core mandates of Ten-Point Programme."),
    ("Young Turks Congress", "Within the Indian National Congress in the late 1960s, younger progressive leaders such as Chandra Shekhar and Mohan Dharia who pushed for radical left-wing policies were known as:",
     "Young Turks", ["Old Guard", "Syndicate", "Grand Alliance"], "A",
     "The 'Young Turks' inside the Congress challenged the conservative party bosses and passionately demanded rapid socialist transformation.", "Identifies the Young Turks in Congress."),
    ("Sanjiva Reddy Official Nominee 1969", "Who was the official Congress candidate nominated by the Syndicate for the 1969 Presidential election following the demise of Dr. Zakir Husain?",
     "Neelam Sanjiva Reddy", ["V.V. Giri", "C.D. Deshmukh", "K. Kamaraj"], "A",
     "The Syndicate forced the nomination of Lok Sabha Speaker Neelam Sanjiva Reddy despite Prime Minister Indira Gandhi's reservations.", "Identifies Neelam Sanjiva Reddy as official 1969 candidate."),
    ("Bangalore AICC Session 1969", "In which historic Congress session held in July 1969 did Indira Gandhi present her controversial policy note titled 'Stray Thoughts on Bank Nationalisation'?",
     "Bangalore (Bengaluru) Session", ["Bombay Session", "Calcutta Session", "Belgaum Session"], "A",
     "Indira Gandhi submitted her note 'Stray Thoughts' at the Bangalore AICC meeting, outmanoeuvring Morarji Desai and the Syndicate.", "Identifies Bangalore 1969 AICC Session."),
    ("Fourth General Elections Earthquake", "Why did political analysts describe the Fourth General Elections of 1967 as a 'political earthquake' for Indian democracy?",
     "The Congress lost power across seven state assemblies and suffered severe depletion of its parliamentary majority", ["The military seized power and cancelled the Constitution", "All opposition parties merged into a single party", "Voting was banned in all urban centres"], "A",
     "The 1967 elections shattered the Congress party's invulnerability across states and drastically cut its parliamentary strength to 283 seats.", "Explains 1967 elections as political earthquake."),
    ("Samyukta Vidhayak Dal Governments", "The non-Congress multi-party coalition governments that assumed power across several North Indian states following the 1967 elections were termed:",
     "Samyukta Vidhayak Dal (SVD) governments", ["National Democratic Alliance", "United Progressive Alliance", "National Front"], "A",
     "SVD governments brought together ideologically disparate parties including the Jana Sangh, socialists, and Congress defectors in joint ministries.", "Identifies Samyukta Vidhayak Dal coalitions."),
    ("Aya Ram Gaya Ram Haryana", "The celebrated political idiom 'Aya Ram, Gaya Ram' originated in 1967 after an MLA named Gaya Lal changed his party thrice in a fortnight in which state?",
     "Haryana", ["Punjab", "Uttar Pradesh", "Bihar"], "A",
     "Gaya Lal was an MLA from Hasanpur in Haryana whose rapid floor-crossing inspired Congress leader Birender Singh to coin 'Gaya Ram, Aya Ram'.", "Identifies Haryana as origin of Aya Ram Gaya Ram."),
    ("Grand Alliance 1971 Composition", "The anti-Indira electoral coalition formed ahead of the 1971 Lok Sabha elections named 'Grand Alliance' was composed of:",
     "Congress (O), Swatantra Party, Bharatiya Jana Sangh, Samyukta Socialist Party, and Praja Socialist Party", ["Congress (R), CPI, and DMK", "CPI(M), Muslim League, and Akali Dal exclusively", "The Socialist International of Europe"], "A",
     "The Grand Alliance brought together right-wing and socialist opposition forces with the single unifying agenda of 'Indira Hatao'.", "Identifies constituent parties of 1971 Grand Alliance."),
    ("Indira 1971 Electoral Victory Tally", "In the Fifth General Elections of 1971, the alliance of Congress (R) and CPI achieved a landslide majority, winning how many total seats in the Lok Sabha?",
     "375 seats (with Congress (R) winning 352 seats)", ["150 seats", "240 seats", "500 seats"], "A",
     "The Congress (R)-CPI coalition won 375 seats with 48.4% popular vote, completely repudiating the Syndicate and restoring Indira Gandhi's supremacy.", "Recalls 1971 election results.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u12_direct:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u12(make_question(CHAPTER_U12, topic, stem, opts, c, s))

u12_qs = u12_qs[:40]
assert len(u12_qs) == 40, f"Expected 40 questions for Unit 12, got {len(u12_qs)}"
validate_and_collect(u12_qs, u12_seen)
print("Unit 12 validated: 40 unique questions.")


# =================================================================================================
# UNIT 13: The Crisis of Democratic Order (60 Questions)
# =================================================================================================
CHAPTER_U13 = "The Crisis of Democratic Order"
u13_qs = []
u13_seen = set()

def add_u13(q):
    u13_qs.append(q)

opts, c, s = rotate_options(
    "25 June 1975 under Article 352 on the grounds of 'internal disturbance'",
    ["15 August 1975 under Article 356 on the grounds of constitutional breakdown", "26 January 1976 under Article 360 on the grounds of financial crisis", "12 June 1975 under Article 370 on the grounds of external aggression"],
    "A",
    "On the night of 25 June 1975, Prime Minister Indira Gandhi recommended the proclamation of a National Emergency to President Fakhruddin Ali Ahmed under Article 352 citing 'internal disturbance'.\nHence, Option {{CORR}} is correct.",
    "Identifies 25 June 1975, Article 352, and 'internal disturbance'."
)
add_u13(make_question(CHAPTER_U13, "Declaration of Emergency", "On which date and under which Article of the Constitution was the National Emergency declared by Prime Minister Indira Gandhi?", opts, c, s))

opts, c, s = rotate_options(
    "Justice Jagmohan Lal Sinha",
    ["Justice H.R. Khanna", "Justice A.N. Ray", "Justice P.N. Bhagwati"],
    "B",
    "On 12 June 1975, Justice Jagmohan Lal Sinha of the Allahabad High Court delivered the historic verdict in the election petition filed by Raj Narain, declaring Indira Gandhi's 1971 Lok Sabha election invalid.\nHence, Option {{CORR}} is correct.",
    "Identifies Justice Jagmohan Lal Sinha of the Allahabad High Court."
)
add_u13(make_question(CHAPTER_U13, "Allahabad High Court Verdict", "Which Allahabad High Court judge delivered the historic judgment on 12 June 1975 unseating Prime Minister Indira Gandhi from the Lok Sabha?", opts, c, s))

opts, c, s = rotate_options(
    "Jayaprakash Narayan (JP)",
    ["Morarji Desai", "Charan Singh", "George Fernandes"],
    "C",
    "Jayaprakash Narayan accepted the leadership of the Bihar student movement in 1974, issuing a call for 'Total Revolution' (Sampoorna Kranti) in the moral, cultural, economic, and political spheres.\nHence, Option {{CORR}} is correct.",
    "Identifies Jayaprakash Narayan issuing the call for 'Total Revolution'."
)
add_u13(make_question(CHAPTER_U13, "Total Revolution Call", "Which veteran socialist leader led the Bihar movement in 1974 and issued the historic call for 'Total Revolution' (Sampoorna Kranti)?", opts, c, s))

opts, c, s = rotate_options(
    "Justice J.C. Shah (Shah Commission of Inquiry)",
    ["Justice V.R. Krishna Iyer", "Justice K.S. Hegde", "Justice M.H. Beg"],
    "D",
    "In May 1977, the newly elected Janata Party government appointed a Commission of Inquiry headed by retired Chief Justice of India J.C. Shah to investigate allegations of abuse of power during the Emergency.\nHence, Option {{CORR}} is correct.",
    "Identifies Justice J.C. Shah heading the Shah Commission of Inquiry."
)
add_u13(make_question(CHAPTER_U13, "Shah Commission", "Which retired Chief Justice of India headed the Commission of Inquiry appointed in May 1977 to investigate excesses committed during the Emergency?", opts, c, s))

# Match questions for Unit 13
add_u13(make_match_question(
    CHAPTER_U13, "Emergency Protest Movements",
    "Match List I (Movement/Leader) with List II (Key Feature / Year):",
    [("A", "Gujarat Navnirman Movement"), ("B", "All-India Railway Strike"), ("C", "Bihar Student Movement"), ("D", "Shah Commission of Inquiry")],
    [("I", "January 1974: Students protested rising food prices, forcing assembly dissolution"), ("II", "May 1974: Led by George Fernandes demanding bonus and service conditions"), ("III", "March 1974: Led by JP Narayan demanding resignation of state Congress ministry"), ("IV", "May 1977: Investigated illegal detentions and press censorship during Emergency")],
    "A-I, B-II, C-III, D-IV", "A",
    "Gujarat Navnirman in Jan 1974; Railway strike in May 1974; Bihar movement under JP in March 1974; Shah Commission appointed in May 1977.",
    "Matches pre-Emergency protest movements with their dates and characteristics."
))

add_u13(make_match_question(
    CHAPTER_U13, "Judicial Landmarks Emergency Era",
    "Match List I (Case / Event) with List II (Constitutional Significance):",
    [("A", "Kesavananda Bharati Case (1973)"), ("B", "Allahabad High Court Verdict (1975)"), ("C", "Supersession of Judges (1973)"), ("D", "ADM Jabalpur Case (1976)")],
    [("I", "Supreme Court ruled that Parliament cannot alter the 'Basic Structure' of the Constitution"), ("II", "Justice Sinha set aside Indira Gandhi's election on grounds of corrupt electoral practices"), ("III", "Seniority convention broken to appoint A.N. Ray as Chief Justice of India"), ("IV", "Majority ruled that right to life cannot be enforced during Emergency; Justice Khanna dissented")],
    "A-I, B-II, C-III, D-IV", "B",
    "Kesavananda established basic structure; Allahabad HC unseated Indira; 1973 supersession broke seniority; ADM Jabalpur suspended Habeas Corpus.",
    "Matches judicial controversies of the 1970s with their constitutional significance."
))

# Chronology questions for Unit 13
add_u13(make_sequence_question(
    CHAPTER_U13, "Path to Emergency Timeline",
    "Arrange the following events leading to the declaration of the National Emergency in chronological sequence:",
    [("A", "Navnirman Movement in Gujarat forces resignation of state government"), ("B", "Nationwide Railway Strike led by George Fernandes"), ("C", "Allahabad High Court judgment invalidating Indira Gandhi's election"), ("D", "Massive opposition rally at Ramlila Ground and proclamation of Emergency")],
    "A, B, C, D", "C",
    "1. Gujarat Navnirman (January 1974).\n2. Railway strike (May 1974).\n3. Allahabad verdict (12 June 1975).\n4. Ramlila rally and Emergency (25 June 1975).",
    "Sequences events culminating in the declaration of Emergency."
))

add_u13(make_sequence_question(
    CHAPTER_U13, "Emergency and Aftermath Timeline",
    "Arrange the following milestones of the Emergency and its aftermath in chronological sequence:",
    [("A", "Enactment of the controversial 42nd Constitutional Amendment Act"), ("B", "Announcement of General Elections and release of political prisoners"), ("C", "Historic defeat of Congress and formation of Janata Party government"), ("D", "Enactment of the 44th Constitutional Amendment Act safeguarding fundamental rights")],
    "A, B, C, D", "D",
    "1. 42nd Amendment passed (1976).\n2. Elections announced (January 1977).\n3. Janata Party assumes power (March 1977).\n4. 44th Amendment passed (1978).",
    "Sequences milestones from Emergency amendments to the 44th Amendment."
))

# Statement questions for Unit 13
add_u13(make_statement_question(
    CHAPTER_U13, "42nd Constitutional Amendment",
    "The 42nd Constitutional Amendment of 1976 extended the tenure of the Lok Sabha and State Legislative Assemblies from five years to six years.",
    "The 42nd Amendment stripped the executive of all powers and made the Prime Minister directly subordinate to village panchayats.",
    3, "C",
    "Statement I is correct: Lok Sabha tenure was lengthened to six years and the words 'Socialist', 'Secular', and 'Integrity' were added to the Preamble. Statement II is completely false: The amendment concentrated vast powers in the central executive.",
    "Evaluates changes introduced by the 42nd Constitutional Amendment."
))

add_u13(make_statement_question(
    CHAPTER_U13, "44th Amendment Safeguards",
    "The 44th Constitutional Amendment of 1978 replaced the ambiguous phrase 'internal disturbance' with 'armed rebellion' as a ground for proclaiming National Emergency under Article 352.",
    "The 44th Amendment stipulated that the Right to Life and Personal Liberty guaranteed under Article 21 can never be suspended even during an emergency.",
    1, "A",
    "Both Statement I and Statement II are correct. The 44th Amendment introduced robust democratic safeguards, requiring written cabinet approval for Article 352, replacing 'internal disturbance' with 'armed rebellion', and protecting Articles 20 and 21 from suspension.",
    "Details safeguards enacted under the 44th Constitutional Amendment."
))

# Assertion Reason for Unit 13
add_u13(make_assertion_question(
    CHAPTER_U13, "Janata Government Fall",
    "The Janata Party government that assumed power in 1977 collapsed prematurely after barely two and a half years in office.",
    "The Janata Party lacked ideological coherence, leadership harmony, and shared policy direction, being torn apart by bitter power struggles between Morarji Desai, Charan Singh, and Jagjivan Ram.",
    1, "A",
    "Both (A) and (R) are true, and (R) explains why the Janata experiment imploded—competing factional egos and the dual-membership controversy over the RSS splintered the government in 1979.",
    "Explains reasons behind the premature collapse of the Janata Party government."
))

add_u13(make_assertion_question(
    CHAPTER_U13, "Habeas Corpus Case Dissent",
    "Justice H.R. Khanna was superseded for the post of Chief Justice of India in January 1977.",
    "Justice H.R. Khanna was the lone dissenting judge in the infamous ADM Jabalpur v. Shivkant Shukla (Habeas Corpus) case, upholding citizen liberties against state detention during the Emergency.",
    1, "A",
    "Both (A) and (R) are true, and (R) explains why Khanna was superseded—his courageous lone dissent affirming that Article 21 cannot be suspended enraged the Indira Gandhi regime, leading to M.H. Beg's appointment as CJI over him.",
    "Connects Justice H.R. Khanna's dissent in the Habeas Corpus case to his supersession."
))

# Multi statement for Unit 13
add_u13(make_multi_statement_question(
    CHAPTER_U13, "Emergency Excesses Sanjay Gandhi",
    "Which of the following controversial programs were executed during the Emergency under the extra-constitutional influence of Sanjay Gandhi?",
    [
        ("A", "Aggressive, coercive mass sterilisation (vasectomy) campaigns across North Indian states"),
        ("B", "Slum clearance and demolition drives targeting poor residents around Delhi's Turkman Gate"),
        ("C", "Arrest and preventive detention of thousands of political activists and trade unionists without trial under MISA"),
        ("D", "Mandatory free distribution of imported sports cars to rural university professors")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements A, B, and C describe the notorious excesses investigated by the Shah Commission. D is absurd.",
    "Details coercive programs associated with Sanjay Gandhi during the Emergency."
))

add_u13(make_multi_statement_question(
    CHAPTER_U13, "1977 Election Results",
    "Which of the following statements are correct regarding the historic 1977 General Elections?",
    [
        ("A", "The Congress party won zero seats in Uttar Pradesh, Bihar, Punjab, and Haryana."),
        ("B", "Both Prime Minister Indira Gandhi and her son Sanjay Gandhi were defeated in Rae Bareli and Amethi respectively."),
        ("C", "Congress retained substantial strength in the southern states of Andhra Pradesh, Karnataka, and Kerala."),
        ("D", "The Janata Party established a military dictatorship and permanently cancelled all future elections.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements A, B, and C accurately reflect the dramatic North-South divide in the 1977 election results. Statement D is false because Janata restored democracy and civil liberties.",
    "Analyzes the geographic and political dynamics of the 1977 election verdict."
))

# Direct MCQs for Unit 13
u13_direct = [
    ("Fakhruddin Ali Ahmed Signature", "Who was the President of India who signed the Emergency proclamation on the night of 25 June 1975 upon Prime Minister Indira Gandhi's advice?",
     "Fakhruddin Ali Ahmed", ["V.V. Giri", "Zakir Hussain", "Neelam Sanjeeva Reddy"], "A",
     "President Fakhruddin Ali Ahmed signed the proclamation late on 25 June before the union cabinet had met to consider it.", "Identifies President Fakhruddin Ali Ahmed."),
    ("MISA Full Form", "The draconian preventive detention law used extensively to imprison opposition leaders and activists without trial during the Emergency was:",
     "Maintenance of Internal Security Act (MISA)", ["Military Intelligence Security Act", "Maritime International Safety Accord", "Modern Industrial Security Act"], "A",
     "MISA was enacted in 1971 and amended during the Emergency to allow detention without disclosing grounds to the detainee or courts.", "Defines MISA acronym."),
    ("Ramlila Ground Rally 1975", "At the massive opposition rally at Delhi's Ramlila Ground on 25 June 1975, Jayaprakash Narayan appealed to:",
     "The police, armed forces, and civil servants to disobey illegal and unconstitutional orders of the government", ["The United Nations to dispatch international troops to New Delhi", "All factory owners to reduce salaries of workers", "Citizens to migrate to neighboring countries"], "A",
     "JP called on soldiers and police officers to uphold their constitutional oath and refuse to execute illegal political commands, which the regime seized upon to declare Emergency.", "Recalls JP's speech at Ramlila Ground on 25 June 1975."),
    ("Railway Strike Duration 1974", "The historic nationwide railway strike led by George Fernandes in May 1974 lasted for how many days before being crushed by the government?",
     "20 days", ["5 days", "100 days", "Exactly 2 days"], "A",
     "The railway strike paralyzed logistics for 20 days from 8 to 27 May 1974; the government declared it illegal, arresting thousands of railwaymen.", "Recalls duration of the May 1974 railway strike."),
    ("George Fernandes Baroda Dynamite", "During the Emergency, socialist leader George Fernandes went underground and was later arrested and tried in which famous conspiracy case?",
     "The Baroda Dynamite Case", ["The Lahore Conspiracy Case", "The Meerut Conspiracy Case", "The Alipore Bomb Case"], "A",
     "Fernandes was arrested in Kolkata in June 1976 and charged with procuring dynamite to blow up government railway lines in protest against the Emergency.", "Identifies George Fernandes in the Baroda Dynamite Case."),
    ("Press Censorship Emergency", "During the Emergency, the government imposed strict press censorship, prompting newspapers like 'The Indian Express' and 'The Statesman' to protest by:",
     "Leaving their editorial spaces completely blank", ["Printing comic strips on every front page", "Publishing newspapers exclusively in Latin", "Refusing to charge any money for newspapers"], "A",
     "Leading independent dailies registered silent defiance against the censor by publishing blank editorial columns.", "Describes the blank editorial protest against press censorship."),
    ("Underground Magazines Emergency", "Magazines like 'Himmat' edited by Rajmohan Gandhi and 'Seminar' protested against Emergency censorship by:",
     "Closing down publication rather than submitting copy to government censors", ["Becoming official organs of the Youth Congress", "Operating secret radio stations from Moscow", "Relocating their offices to Wall Street"], "A",
     "Publications like Seminar and Mainstream chose to cease publication temporarily rather than surrender editorial freedom to state censors.", "Recalls magazines that suspended publication to protest censorship."),
    ("Padma Awards Returned", "Which two eminent cultural icons returned their Padma awards to protest the suppression of democracy during the Emergency?",
     "Writer Shivarama Karanth and Hindi novelist Phanishwar Nath Renu", ["M.S. Subbulakshmi and Lata Mangeshkar", "Satyajit Ray and Bismillah Khan", "Amrita Pritam and Harivansh Rai Bachchan"], "A",
     "Kannada writer Shivarama Karanth returned his Padma Bhushan and Hindi writer Phanishwar Nath 'Renu' returned his Padma Shri in protest.", "Identifies intellectuals returning Padma awards during Emergency."),
    ("Babu Jagjivan Ram CFD", "Just before the 1977 elections, senior Congress minister Babu Jagjivan Ram resigned from the cabinet and formed which political outfit?",
     "Congress for Democracy (CFD)", ["Bharatiya Lok Dal", "Swatantra Party", "Socialist Congress"], "A",
     "Jagjivan Ram formed Congress for Democracy (CFD) in February 1977, which subsequently merged with the Janata Party.", "Identifies Jagjivan Ram founding Congress for Democracy in 1977."),
    ("Morarji Desai Prime Minister", "Who was sworn in as the first non-Congress Prime Minister of independent India in March 1977?",
     "Morarji Desai", ["Charan Singh", "Jagjivan Ram", "Jayaprakash Narayan"], "A",
     "Morarji Desai assumed office on 24 March 1977 as the head of the victorious Janata Party coalition.", "Identifies Morarji Desai as first non-Congress Prime Minister."),
    ("Charan Singh Government Fall", "Chaudhary Charan Singh became Prime Minister in July 1979 with the outside support of the Congress, but was forced to resign within four months because:",
     "The Congress under Indira Gandhi abruptly withdrew its outside legislative support", ["The Supreme Court declared his appointment unconstitutional", "He lost a popular referendum held across rural districts", "The Janata Party merged with the Communist Party"], "A",
     "Indira Gandhi promised support to Charan Singh to split the Janata government, but withdrew it before Parliament convened, forcing fresh elections in 1980.", "Explains the collapse of Charan Singh's ministry in 1979."),
    ("1980 General Election Resurgence", "In the mid-term Lok Sabha elections of January 1980, the Congress (I) led by Indira Gandhi achieved a dramatic comeback, winning:",
     "353 seats out of 529", ["Only 100 seats, forming a minority government", "All 529 seats with zero opposition", "Less than 50 seats"], "A",
     "Voters rejected the factional bickering of the Janata leaders and voted overwhelmingly for Indira Gandhi's promise of a stable government.", "Recalls Congress resurgence in 1980 elections."),
    ("Supersession of Three Judges 1973", "In April 1973, following the Kesavananda Bharati verdict, the government broke the established seniority convention by superseding which three senior judges to appoint A.N. Ray as CJI?",
     "Justices J.M. Shelat, K.S. Hegde, and A.N. Grover", ["Justices H.R. Khanna, M.H. Beg, and P.N. Bhagwati", "Justices V.R. Krishna Iyer, Y.V. Chandrachud, and D.A. Desai", "Justices Fazal Ali, B.N. Rau, and Patanjali Sastri"], "A",
     "Shelat, Hegde, and Grover had ruled against government amendments, so the executive bypassed them to appoint Justice A.N. Ray, sparking intense legal protest.", "Lists the three judges superseded in 1973."),
    ("Raj Narain Petition Allegation", "In his election petition that unseated Indira Gandhi, socialist rival Raj Narain alleged that she had committed corrupt practices by:",
     "Using government civil servants (Yashpal Kapoor) and state police machinery for her election campaign in Rae Bareli", ["Bribing all voters with gold coins", "Tampering with electronic voting machines", "Banning opposition polling agents by military force"], "A",
     "Justice Sinha found Indira guilty of utilizing government officials to erect rostrums and manage campaign loudspeakers, violating the Representation of the People Act.", "Explains grounds of Allahabad HC unseating Indira Gandhi."),
    ("Turkman Gate Demolitions", "The violent demolition of thousands of historic homes and police firing on protesting residents in April 1976 took place in Delhi at:",
     "Turkman Gate in Old Delhi", ["India Gate in New Delhi", "Kashmere Gate", "Ajmeri Gate"], "A",
     "Under Sanjay Gandhi's urban beautification drive, bulldozers razed residential settlements at Turkman Gate, resulting in police firing and public outcry.", "Identifies Turkman Gate demolition in 1976."),
    ("Twenty Point Programme", "In July 1975, immediately following the declaration of Emergency, Indira Gandhi announced which populist socio-economic program?",
     "Twenty-Point Programme", ["Five-Year Industrial Charter", "Ten-Commandment Declaration", "National Health Mission"], "A",
     "The 20-Point Programme included land ceiling enforcement, liquidation of rural debts, worker participation in industry, and control of hoarding.", "Identifies 20-Point Programme of July 1975."),
    ("Sanjay Gandhi Five Points", "Alongside Indira's Twenty-Point Programme, Sanjay Gandhi promoted his own extra-constitutional 'Five-Point Programme', which included:",
     "Family planning (sterilisation), afforestation, anti-dowry, eradication of illiteracy, and demolition of slums", ["Banning all cars, closing all banks, and restoring the Mughal court", "Mandatory space exploration for secondary students", "Nationalisation of all temples and mosques"], "A",
     "Sanjay Gandhi's 5 points focused on aggressive population control, tree planting, ending dowry, adult education, and urban clearance.", "Identifies Sanjay Gandhi's Five-Point Programme."),
    ("Janata Party Constituent Parties", "The Janata Party that swept the 1977 elections was an amalgamation of which four major opposition parties?",
     "Congress (O), Bharatiya Jana Sangh, Bharatiya Lok Dal, and Socialist Party", ["CPI, CPI(M), DMK, and Akali Dal", "Muslim League, Swatantra, Hindu Mahasabha, and Forward Bloc", "Congress (R), Congress (I), CFD, and AIADMK"], "A",
     "Opposition leaders united inside jail and launched the Janata Party on 23 January 1977, combining Congress (O), BJS, BLD, and the Socialists.", "Lists the four founding parties of the Janata Party."),
    ("Oil Shock 1973 Impact", "The global oil shock of 1973 triggered by the Arab-Israeli War severely impacted the Indian economy by causing:",
     "Rampant domestic inflation reaching nearly 30% by 1974 and a massive increase in import bills", ["A total freeze of all agricultural activity in Punjab", "The abolition of domestic currency printing", "A decline in the cost of all manufactured goods"], "A",
     "The quadrupling of world crude oil prices triggered 30% inflation, industrial stagnation, and real wage cuts, creating fertile ground for the 1974 student protests.", "Explains impact of 1973 oil shock on Indian economy."),
    ("Gujarat Assembly Dissolution Morarji Fast", "In March 1975, veteran leader Morarji Desai undertook an indefinite hunger strike to compel the central government to:",
     "Hold fresh elections to the Gujarat Legislative Assembly immediately", ["Abolish the Indian Army permanently", "Make Gujarati the sole national language", "Dismiss the Supreme Court bench"], "A",
     "Morarji's fast unto death forced Indira Gandhi to concede fresh assembly elections in Gujarat in June 1975, where Congress was defeated.", "Explains Morarji Desai's March 1975 fast for Gujarat elections."),
    ("Janata Dal vs Janata Party Origin", "The 1977 victory was historic because it proved to the world that:",
     "Indian democracy could peacefully and electorally unseat an authoritarian regime through the ballot box", ["Democracy was only possible if all citizens were wealthy", "The British monarch had to approve all Indian election results", "Military rule was inevitable in developing countries"], "A",
     "The 1977 verdict demonstrated the democratic maturity of ordinary Indian citizens, punishing authoritarian overreach through the ballot box.", "Validates historical significance of the 1977 democratic verdict."),
    ("Shah Commission Public Hearings", "The Shah Commission of Inquiry broke new democratic ground in India by:",
     "Holding open public hearings that were broadcast on All India Radio and covered extensively in newspapers", ["Ordering the secret execution of former cabinet ministers", "Confiscating all private television sets", "Cancelling all fundamental rights permanently"], "A",
     "The Shah Commission's public hearings laid bare systemic administrative abuses, unlawful detentions, and executive cowardice.", "Describes the unprecedented public transparency of the Shah Commission."),
    ("Commitment Bureaucracy Doctrine", "During the early 1970s, Indira Gandhi and her advisors controversially advocated for a 'Committed Bureaucracy and Committed Judiciary', meaning:",
     "Officials and judges should be committed to the ruling party's progressive socialist ideology rather than remaining neutral", ["Civil servants should join the regular infantry army", "Judges should live inside government parliament chambers", "Bureaucrats must donate 90% of their salary to private banks"], "A",
     "The concept of 'commitment' undermined the traditional neutrality of the civil service and independence of the judiciary.", "Defines the controversial 'committed bureaucracy and judiciary' doctrine."),
    ("ADM Jabalpur Habeas Corpus Ruling", "In the notorious ADM Jabalpur case of April 1976, the Supreme Court four-judge majority ruled that:",
     "During a proclamation of Emergency under Article 352, no person has the locus standi to approach any writ court for habeas corpus to challenge unlawful detention", ["The government has zero right to arrest any citizen without a trial", "All prisoners must be released immediately with financial compensation", "The police cannot carry firearms inside state borders"], "A",
     "The four-judge majority (Chief Justice Ray, Beg, Chandrachud, and Bhagwati) ruled that citizens cannot enforce Article 21 during Emergency; Justice H.R. Khanna dissented.", "Outlines the ADM Jabalpur Habeas Corpus ruling."),
    ("Janata Party Dual Membership Issue", "The primary ideological dispute that fractured the Janata Party government in 1979 was the 'dual membership' issue regarding:",
     "Former Jana Sangh members continuing their active membership and allegiance to the Rashtriya Swayamsevak Sangh (RSS)", ["Cabinet ministers holding bank accounts in foreign countries", "Members of Parliament holding jobs as university professors", "Judges serving simultaneously as army officers"], "A",
     "Socialist leaders like Madhu Limaye and George Fernandes insisted that former Jana Sangh members must sever ties with the RSS, causing irreconcilable factional collapse.", "Explains the dual membership controversy in the Janata Party.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u13_direct:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u13(make_question(CHAPTER_U13, topic, stem, opts, c, s))

# Extra questions for Unit 13 to reach exactly 60
u13_extras = [
    ("Conditional Stay Justice Iyer", "On 24 June 1975, Supreme Court vacation judge Justice V.R. Krishna Iyer granted Indira Gandhi a conditional stay, ruling that:",
     "She could remain Prime Minister, but could not vote or participate in Lok Sabha proceedings as an MP pending final appeal", ["She must immediately go to prison for ten years", "She had won the election with zero irregularities", "The Allahabad High Court was dissolved"], "A",
     "Justice Krishna Iyer granted a conditional stay allowing Indira to function as PM while barring her from parliamentary voting, prompting the declaration of Emergency the next night.", "Details Justice Krishna Iyer's conditional stay order."),
    ("Internal Disturbance Term Ambiguity", "Why was the ground of 'internal disturbance' in Article 352 criticized as prone to authoritarian abuse?",
     "Because it was vague and subjective, allowing ordinary political protests to be treated as threats to the nation", ["Because it was written in foreign French law", "Because it only applied to oceanic island territories", "Because it could only be invoked by municipal mayors"], "A",
     "The subjective nature of 'internal disturbance' permitted the executive to suppress legitimate democratic demonstrations, leading the 44th Amendment to replace it with 'armed rebellion'.", "Explains ambiguity of 'internal disturbance'."),
    ("Sanjay Gandhi Maruti Project", "During the 1970s, opposition parties heavily criticized Indira Gandhi's government for granting exclusive manufacturing licenses and land to Sanjay Gandhi for the:",
     "Maruti small indigenous passenger car project", ["Bhakra Nangal hydroelectric dam", "Air India international airlines", "Indian Space Research Organisation"], "A",
     "The preferential allotment of land in Haryana and state banking loans for Sanjay Gandhi's Maruti car project was a major lightning rod for opposition corruption allegations.", "Identifies controversy surrounding Sanjay Gandhi's Maruti car project."),
    ("JP Detention in Chandigarh", "Following his midnight arrest on 25 June 1975, Jayaprakash Narayan was detained in solitary confinement in:",
     "Chandigarh (PGIMER guest house)", ["Tihar Jail in Delhi", "Naini Central Jail in Allahabad", "Cellular Jail in Andaman"], "A",
     "JP was detained in Chandigarh until his failing health prompted the government to release him on parole in November 1975.", "Identifies Chandigarh as detention site of JP during Emergency."),
    ("Charan Singh Defection Resignation", "How many days did Chaudhary Charan Singh face Parliament as Prime Minister before resigning due to lack of majority?",
     "Charan Singh never faced Parliament even once during his tenure as Prime Minister", ["Exactly 100 days of daily debates", "Over five years without interruption", "Ten months of continuous budget sessions"], "A",
     "Charan Singh holds the unique distinction of serving as Prime Minister from July 1979 to January 1980 without ever facing a single sitting of the Lok Sabha.", "Highlights historic fact that Charan Singh never faced Parliament."),
    ("Janata Party Symbol 1977", "What was the recognized election symbol of the victorious Janata Party in the 1977 general elections?",
     "Farmer carrying a plough inside a wheel (Haldhar inside Chakra)", ["Tree", "Deepak", "Hand"], "A",
     "The Janata Party was allotted the symbol of a Farmer carrying a plough (Haldhar), which was the symbol of Charan Singh's Bharatiya Lok Dal.", "Identifies 1977 Janata Party election symbol."),
    ("44th Amendment Cabinet Advice", "Under the 44th Amendment of 1978, the President can proclaim an Emergency under Article 352 only after receiving:",
     "The written recommendation of the Union Cabinet headed by the Prime Minister", ["An oral telephone call from the Prime Minister alone", "A petition signed by foreign ambassadors", "A resolution passed by the Supreme Court bar association"], "A",
     "To prevent a repeat of Indira Gandhi's unilateral 1975 decision, the 44th Amendment mandated a written recommendation approved by the full cabinet.", "Identifies written cabinet requirement under 44th Amendment."),
    ("39th Amendment High Offices Immunity", "The controversial 39th Constitutional Amendment Act passed during the Emergency placed election disputes of which high dignitaries beyond judicial review?",
     "The President, Vice-President, Prime Minister, and Speaker of the Lok Sabha", ["Chief Ministers and State Governors only", "All High Court Judges and Advocates General", "Municipal Mayors and Panchayat Presidents"], "A",
     "The 39th Amendment was enacted to insulate Indira Gandhi's voided election from judicial scrutiny, though the Supreme Court struck down part of it in Indira Nehru Gandhi v. Raj Narain.", "Identifies high offices immunized under 39th Amendment."),
    ("42nd Amendment Preamble Words", "Which three significant terms were inserted into the Preamble of the Indian Constitution by the 42nd Constitutional Amendment Act of 1976?",
     "'Socialist', 'Secular', and 'Integrity'", ["'Democratic', 'Republic', and 'Justice'", "'Federal', 'Monarchical', and 'Liberty'", "'Sovereign', 'Capitalist', and 'Fraternity"], "A",
     "The 42nd Amendment amended the Preamble to describe India as a 'Sovereign Socialist Secular Democratic Republic' and added 'integrity' to unity.", "Identifies three words added to Preamble in 1976."),
    ("42nd Amendment Article 51A Duties", "Which Article was incorporated into Part IVA of the Indian Constitution by the 42nd Amendment in 1976 to lay down the Fundamental Duties of citizens?",
     "Article 51A (based on Swaran Singh Committee recommendations)", ["Article 21A", "Article 31C", "Article 19(1)(g)"], "A",
     "Article 51A codified 10 Fundamental Duties on the recommendations of the Swaran Singh Committee during the Emergency.", "Identifies Article 51A for Fundamental Duties."),
    ("42nd Amendment Assembly Tenure Extension", "During the National Emergency, the 42nd Constitutional Amendment Act extended the normal duration of the Lok Sabha and State Legislative Assemblies from five years to:",
     "Six years", ["Seven years", "Eight years", "Ten years"], "A",
     "The 42nd Amendment extended legislative terms to six years, which was subsequently reversed back to five years by the 44th Amendment in 1978.", "Identifies extension of assembly terms to 6 years."),
    ("MISA Preventive Detention Tool", "Which preventive detention legislation enacted in 1971 was aggressively deployed during the Emergency to incarcerate thousands of opposition leaders without charges?",
     "Maintenance of Internal Security Act (MISA)", ["Prevention of Terrorism Act (POTA)", "Armed Forces Special Powers Act (AFSPA)", "Unlawful Activities Prevention Act (UAPA)"], "A",
     "MISA was amended during Emergency to remove the requirement of communicating grounds of arrest or granting advisory board hearings.", "Identifies MISA under Indira Gandhi."),
    ("COFEPOSA Economic Emergency Law", "Alongside MISA, which statute was stringently enforced during the Emergency to detain smugglers, black-marketeers, and foreign exchange violators without trial?",
     "Conservation of Foreign Exchange and Prevention of Smuggling Activities Act (COFEPOSA)", ["Monopolies and Restrictive Trade Practices Act (MRTP)", "Consumer Protection Act", "Industrial Disputes Act"], "A",
     "COFEPOSA was enacted in 1974 and deployed during the Emergency to crack down on economic offenses and unauthorized currency smuggling.", "Identifies COFEPOSA economic detention statute."),
    ("Justice Khanna ADM Jabalpur Dissent", "In his famous lone dissent in the ADM Jabalpur (1976) Habeas Corpus case, Justice H.R. Khanna unequivocally held that:",
     "Even during an Emergency, the state possesses no authority to deprive an individual of life or personal liberty without the sanction of law", ["The executive is totally supreme and can execute any citizen without reason", "The Constitution ceases to exist whenever Article 352 is proclaimed", "Writs of habeas corpus are strictly forbidden in modern jurisprudence"], "A",
     "Justice Khanna memorably asserted that Article 21 is not the sole repository of the right to life; liberty is inherent to civilized human existence.", "Outlines Justice Khanna's historic dissent."),
    ("Justice Khanna Supersession 1977", "In January 1977, following his dissenting judgment defending civil liberties, Justice H.R. Khanna was superseded for the post of Chief Justice of India by:",
     "Justice M.H. Beg", ["Justice Y.V. Chandrachud", "Justice P.N. Bhagwati", "Justice V.R. Krishna Iyer"], "A",
     "The government bypassed Justice Khanna, the senior-most judge, appointing Justice M.H. Beg as Chief Justice; Justice Khanna immediately tendered his resignation.", "Recalls supersession of Justice Khanna by M.H. Beg."),
    ("Janata Party 1977 Lok Sabha Victory", "In the landmark March 1977 Lok Sabha general elections, how many total seats were captured by the Janata Party and its electoral allies?",
     "330 seats (with the Janata Party alone winning 295 seats)", ["150 seats", "450 seats", "200 seats"], "A",
     "The Janata alliance secured 330 seats out of 542, reducing the ruling Congress to just 154 seats in a dramatic repudiation of authoritarianism.", "Details 1977 Janata Party election victory."),
    ("Indira Gandhi Rae Bareli Defeat", "In the 1977 parliamentary elections, Prime Minister Indira Gandhi was decisively defeated in her home constituency of Rae Bareli by which socialist challenger?",
     "Raj Narain", ["George Fernandes", "Madhu Limaye", "Ram Manohar Lohia"], "A",
     "Raj Narain, who had filed the election petition against her in 1971, defeated Indira Gandhi in Rae Bareli by over 55,000 votes.", "Identifies Raj Narain defeating Indira Gandhi in Rae Bareli."),
    ("Sanjay Gandhi Amethi Defeat", "In the 1977 general elections, Sanjay Gandhi made his electoral debut but was thoroughly defeated in which Uttar Pradesh constituency?",
     "Amethi", ["Varanasi", "Allahabad", "Lucknow"], "A",
     "Sanjay Gandhi suffered a heavy electoral defeat in Amethi against Janata Party candidate Ravindra Pratap Singh.", "Identifies Sanjay Gandhi's defeat in Amethi in 1977."),
    ("Northern Congress Wipeout 1977", "In the 1977 Lok Sabha polls, the Congress party failed to win a single seat across which bloc of Northern states and Union Territories?",
     "Bihar, Uttar Pradesh, Delhi, Punjab, and Haryana", ["Kerala, Karnataka, and Andhra Pradesh", "Maharashtra, Gujarat, and Goa", "Assam, Tripura, and Manipur"], "A",
     "Congress was completely wiped out across the Hindi heartland, winning 0 seats in UP (out of 85), Bihar (out of 54), Punjab, Haryana, and Delhi.", "Highlights Northern states where Congress won 0 seats in 1977."),
    ("Southern Resilience Congress 1977", "Why did the Congress party retain its overwhelming electoral dominance in Southern states like Andhra Pradesh and Karnataka in the 1977 elections?",
     "The coercive excesses of forced sterilization and demolitions were largely absent, and 20-Point social welfare benefits reached the rural poor", ["Emergency provisions were legally exempted from southern states", "All opposition candidates were barred from voting in the South", "The southern states conducted a boycott of the general election"], "A",
     "The impact of Emergency was geographically uneven; Southern rural voters experienced effective welfare programs and stable prices rather than coercive atrocities.", "Explains why Congress won South India in 1977."),
    ("44th Amendment Act 1978 Reforms", "Which landmark constitutional amendment enacted by the Janata government in 1978 dismantled authoritarian Emergency provisions and fortified judicial safeguards?",
     "The 44th Constitutional Amendment Act of 1978", ["The 52nd Amendment Act", "The 61st Amendment Act", "The 73rd Amendment Act"], "A",
     "The 44th Amendment replaced 'internal disturbance' with 'armed rebellion', made cabinet advice in writing mandatory, and rendered Articles 20 and 21 non-suspendable during Emergency.", "Details core achievements of 44th Amendment 1978.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u13_extras:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u13(make_question(CHAPTER_U13, topic, stem, opts, c, s))

u13_qs = u13_qs[:60]
assert len(u13_qs) == 60, f"Expected 60 questions for Unit 13, got {len(u13_qs)}"
validate_and_collect(u13_qs, u13_seen)
print("Unit 13 validated: 60 unique questions.")

# Save unit files
with open("mock/pol_units/unit11.json", "w", encoding="utf-8") as f:
    json.dump(u11_qs, f, indent=2, ensure_ascii=False)
print("Wrote mock/pol_units/unit11.json (60 questions)")

with open("mock/pol_units/unit12.json", "w", encoding="utf-8") as f:
    json.dump(u12_qs, f, indent=2, ensure_ascii=False)
print("Wrote mock/pol_units/unit12.json (40 questions)")

with open("mock/pol_units/unit13.json", "w", encoding="utf-8") as f:
    json.dump(u13_qs, f, indent=2, ensure_ascii=False)
print("Wrote mock/pol_units/unit13.json (60 questions)")
