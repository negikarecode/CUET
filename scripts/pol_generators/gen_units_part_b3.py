import json
import os
import sys

# Ensure local imports work
sys.path.append(os.path.dirname(__file__))
from common import (
    normalize_text,
    get_pyq_normalized_set,
    rotate_options,
    make_question,
    make_match_question,
    make_sequence_question,
    make_statement_question,
    make_assertion_question,
    make_multi_statement_question,
)

pyq_seen = get_pyq_normalized_set()
global_seen = set()

# Preload all 700 questions from units 1 to 13
for i in range(1, 14):
    p = f"mock/pol_units/unit{i}.json"
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            data = json.load(f)
            for item in data:
                global_seen.add(normalize_text(item.get("questionText", "")))

print(f"Loaded {len(global_seen)} questions from Units 1-13 into global_seen.")

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
# UNIT 14: Regional Aspirations (60 Questions)
# =================================================================================================
CHAPTER_U14 = "Regional Aspirations"
u14_qs = []
u14_seen = set()

def add_u14(q):
    u14_qs.append(q)

opts, c, s = rotate_options(
    "26 October 1947",
    ["15 August 1947", "26 January 1950", "1 January 1949"],
    "A",
    "Maharaja Hari Singh signed the Instrument of Accession on 26 October 1947 following tribal invasion from Pakistan, acceding Jammu and Kashmir to the Dominion of India.\nHence, Option {{CORR}} is correct.",
    "Identifies 26 October 1947 as signing date of Instrument of Accession."
)
add_u14(make_question(CHAPTER_U14, "Accession of Jammu and Kashmir", "On which date did Maharaja Hari Singh sign the Instrument of Accession to accede Jammu and Kashmir to India?", opts, c, s))

opts, c, s = rotate_options(
    "Sheikh Mohammad Abdullah",
    ["Bakshi Ghulam Mohammad", "Mirza Afzal Beg", "Farooq Abdullah"],
    "B",
    "Sheikh Abdullah, leader of the National Conference, led the popular movement against the Maharaja and became Prime Minister of Jammu and Kashmir in March 1948.\nHence, Option {{CORR}} is correct.",
    "Identifies Sheikh Abdullah heading the popular struggle."
)
add_u14(make_question(CHAPTER_U14, "National Conference Leadership", "Which leader led the National Conference and became the head of the emergency government in Jammu and Kashmir in 1948?", opts, c, s))

opts, c, s = rotate_options(
    "1953 (dismissed by Sadr-i-Riyasat Karan Singh)",
    ["1947", "1965", "1975"],
    "C",
    "Sheikh Abdullah was dismissed as Prime Minister of Jammu and Kashmir in August 1953 due to ideological differences with the Centre and imprisoned for over a decade.\nHence, Option {{CORR}} is correct.",
    "Identifies August 1953 as dismissal and arrest of Sheikh Abdullah."
)
add_u14(make_question(CHAPTER_U14, "Sheikh Abdullah Arrest 1953", "In which year was Sheikh Abdullah dismissed as Prime Minister of Jammu and Kashmir and placed under detention by the central government?", opts, c, s))

opts, c, s = rotate_options(
    "Indira Gandhi and Sheikh Abdullah (Indira-Sheikh Accord)",
    ["Jawaharlal Nehru and Sheikh Abdullah", "Rajiv Gandhi and Farooq Abdullah", "Morarji Desai and Karan Singh"],
    "D",
    "The 1974-75 Accord was negotiated between G. Parthasarathi and Mirza Afzal Beg, signed by Indira Gandhi and Sheikh Abdullah, enabling Sheikh Abdullah to become Chief Minister in 1975.\nHence, Option {{CORR}} is correct.",
    "Identifies Indira-Sheikh Accord of 1975."
)
add_u14(make_question(CHAPTER_U14, "Kashmir Accord 1975", "Between which two prominent leaders was the historic 1975 Kashmir Accord signed that paved the way for Sheikh Abdullah's return as Chief Minister?", opts, c, s))

# Match questions for Unit 14
add_u14(make_match_question(
    CHAPTER_U14, "Regional Accords and Signatories",
    "Match List I (Accord/Settlement) with List II (Key Signatory / Year):",
    [("A", "Punjab Accord"), ("B", "Assam Accord"), ("C", "Mizoram Peace Accord"), ("D", "Kashmir Accord")],
    [("I", "Rajiv Gandhi and Sant Harchand Singh Longowal (July 1985)"), ("II", "Rajiv Gandhi and AASU leaders (August 1985)"), ("III", "Rajiv Gandhi and Laldenga (June 1986)"), ("IV", "Indira Gandhi and Sheikh Abdullah (February 1975)")],
    "A-I, B-II, C-III, D-IV", "A",
    "Punjab Accord signed in July 1985 with Longowal; Assam Accord in August 1985 with AASU; Mizo Accord in June 1986 with Laldenga; Kashmir Accord in 1975 with Sheikh Abdullah.",
    "Matches landmark peace accords of the 1970s and 1980s with their signatories."
))

add_u14(make_match_question(
    CHAPTER_U14, "Regional Autonomy Demands Leaders",
    "Match List I (Regional Movement Leader) with List II (State / Movement):",
    [("A", "Laldenga"), ("B", "Angami Zapu Phizo"), ("C", "Sant Harchand Singh Longowal"), ("D", "Prafulla Kumar Mahanta")],
    [("I", "Mizo National Front (Mizoram)"), ("II", "Naga National Council (Nagaland)"), ("III", "Shiromani Akali Dal (Punjab)"), ("IV", "All Assam Students Union (Assam)")],
    "A-I, B-II, C-III, D-IV", "B",
    "Laldenga led MNF in Mizoram; Phizo led NNC in Nagaland; Longowal was Akali Dal president in Punjab; Mahanta led AASU in Assam.",
    "Matches regional movement leaders with their respective organizations and states."
))

# Sequence questions for Unit 14
add_u14(make_sequence_question(
    CHAPTER_U14, "Punjab Crisis Sequence",
    "Arrange the following historic events related to the Punjab crisis in correct chronological order:",
    [("A", "Adoption of the Anandpur Sahib Resolution by Akali Dal"),
     ("B", "Launch of Operation Blue Star at Golden Temple"),
     ("C", "Assassination of Prime Minister Indira Gandhi"),
     ("D", "Signing of the Rajiv-Longowal Punjab Accord")],
    "A, B, C, D", "C",
    "Anandpur Sahib Resolution adopted in 1973; Operation Blue Star conducted in June 1984; Indira Gandhi assassinated on 31 October 1984; Rajiv-Longowal Accord signed in July 1985.",
    "Arranges landmark events of the Punjab crisis in chronological order."
))

add_u14(make_sequence_question(
    CHAPTER_U14, "North-East State Reorganization Sequence",
    "Arrange the following North-Eastern state formations in correct chronological sequence:",
    [("A", "Creation of Nagaland as a full state"),
     ("B", "Creation of Meghalaya, Manipur, and Tripura as full states"),
     ("C", "Sikkim becomes the 22nd state of the Indian Union"),
     ("D", "Mizoram and Arunachal Pradesh granted full statehood")],
    "A, B, C, D", "D",
    "Nagaland formed in 1963; Meghalaya, Manipur, and Tripura created in 1972; Sikkim merged in 1975; Mizoram and Arunachal Pradesh became full states in 1987.",
    "Arranges statehood timeline of North-Eastern states."
))

# Statement questions for Unit 14
add_u14(make_statement_question(
    CHAPTER_U14, "Article 370 Special Status",
    "Article 370 conferred a special autonomous status on Jammu and Kashmir, allowing it to have its own State Constitution.",
    "All provisions of the Union and Concurrent Lists applied automatically to Jammu and Kashmir without concurrence of the State Government.",
    3, "A",
    "Statement I is correct: Article 370 provided special status and permitted J&K to have its own constitution. Statement II is incorrect: Union laws required state government concurrence or approval before application.",
    "Evaluates constitutional provisions of Article 370."
))

add_u14(make_statement_question(
    CHAPTER_U14, "Assam Movement Migrant Cutoff",
    "The Assam Accord established 25 March 1971 as the cutoff date for detecting and deporting illegal foreigners.",
    "AASU demanded that all migrants entering Assam after 1947 should immediately receive Indian citizenship.",
    3, "B",
    "Statement I is correct: The Assam Accord identified 25 March 1971 as the cutoff date. Statement II is incorrect: AASU demanded detection and deportation of illegal post-1951/post-1961 foreigners, not immediate blanket citizenship.",
    "Evaluates specific cutoff provisions of the Assam Accord."
))

# Assertion-Reason for Unit 14
add_u14(make_assertion_question(
    CHAPTER_U14, "Indian Model of Nation Building Federalism",
    "The Indian approach to nation-building sought to balance national unity with regional aspirations rather than imposing uniform cultural homogenization.",
    "The Indian Constitution provides asymmetric federal arrangements and special autonomy provisions under Articles 370 and 371 to accommodate regional diversity.",
    1, "A",
    "Both (A) and (R) are correct. India recognized diversity and created asymmetric federal mechanisms like Articles 370 and 371A-371J rather than enforcing cultural uniformity.",
    "Explains India's democratic approach to regional diversity."
))

add_u14(make_assertion_question(
    CHAPTER_U14, "Mizo Insurgency Settlement",
    "The Mizoram Peace Accord of 1986 is regarded as one of the most successful peace agreements in post-independence India.",
    "Laldenga and MNF renounced violence, laid down weapons, and integrated into the democratic electoral process, winning state elections peacefully.",
    1, "B",
    "Both (A) and (R) are correct and (R) explains (A). The 1986 Accord successfully ended two decades of insurgency as MNF surrendered arms and Laldenga became Chief Minister.",
    "Explains success of the 1986 Mizoram Peace Accord."
))

# Multi-statement evaluation
add_u14(make_multi_statement_question(
    CHAPTER_U14, "Anandpur Sahib Resolution Provisions",
    "Which of the following statements regarding the Anandpur Sahib Resolution passed by the Shiromani Akali Dal in 1973 are correct?",
    [("A", "It demanded greater regional autonomy for Punjab and redefining Centre-State relations on true federal principles"),
     ("B", "It sought protection for the cultural and religious identity of Sikhs"),
     ("C", "It advocated the violent overthrow of the Indian Constitution and merger with Pakistan"),
     ("D", "It called for vesting residual powers in the state legislature while restricting Centre's jurisdiction to defence, foreign affairs, currency, and communications")],
    "(A), (B) and (D) only",
    ["(A) and (C) only", "(B) and (C) only", "(A), (B), (C) and (D)"],
    "C",
    "(A), (B), and (D) are correct. The Anandpur Sahib Resolution asserted federal autonomy and cultural rights; it did not seek merger with Pakistan.",
    "Identifies core demands of the 1973 Anandpur Sahib Resolution."
))

add_u14(make_multi_statement_question(
    CHAPTER_U14, "Goa Opinion Poll 1967",
    "Which of the following statements regarding Goa's transition to full statehood are correct?",
    [("A", "Goa was liberated from Portuguese colonial rule in December 1961 through military action named Operation Vijay"),
     ("B", "In January 1967, an unprecedented Opinion Poll was held to decide whether Goa should merge with Maharashtra"),
     ("C", "The people of Goa voted overwhelmingly to merge with the State of Maharashtra"),
     ("D", "Goa remained a Union Territory until it was conferred full statehood in May 1987")],
    "(A), (B) and (D) only",
    ["(A) and (C) only", "(B) and (C) only", "(A), (B), (C) and (D)"],
    "D",
    "(A), (B), and (D) are correct. Statement (C) is false: the people of Goa voted decisively in the 1967 Opinion Poll to reject merger with Maharashtra and retain separate identity.",
    "Details Goa's liberation, 1967 Opinion Poll, and statehood."
))

# 46 Direct concept and factual questions for Unit 14
u14_direct = [
    ("Operation Blue Star Dates", "Operation Blue Star, the military assault to flush out armed militants from the Golden Temple complex in Amritsar, was conducted in:",
     "June 1984", ["January 1980", "October 1984", "August 1985"], "A",
     "Operation Blue Star was conducted by the Indian Army between 1 and 8 June 1984 under Prime Minister Indira Gandhi.", "Recalls dates of Operation Blue Star in June 1984."),
    ("Anti-Sikh Violence 1984 Inquiries", "Which judicial commission was appointed in 2000 to investigate the organized anti-Sikh violence in Delhi following Indira Gandhi's assassination?",
     "Justice Nanavati Commission", ["Shah Commission", "Sarkaria Commission", "Mandal Commission"], "A",
     "The Justice G.T. Nanavati Commission was appointed in May 2000 to investigate the 1984 anti-Sikh violence.", "Identifies Nanavati Commission on 1984 riots."),
    ("Prime Minister Apology 1984", "In August 2005, which Prime Minister of India officially tendered an unconditional apology in Parliament to the Sikh community and the nation for the 1984 violence?",
     "Dr. Manmohan Singh", ["Atal Bihari Vajpayee", "Rajiv Gandhi", "Narendra Modi"], "A",
     "Prime Minister Dr. Manmohan Singh delivered a deeply moving apology in the Rajya Sabha in August 2005 on behalf of the government.", "Identifies Dr. Manmohan Singh's 2005 apology."),
    ("Sikkim Chogyal Monarchy", "Prior to its merger with the Indian Union in 1975, Sikkim was ruled by which monarchical dynasty?",
     "The Chogyal dynasty", ["The Ahom dynasty", "The Dogra dynasty", "The Meitei dynasty"], "A",
     "Sikkim was ruled by hereditary Buddhist monarchs known as the Chogyal until popular protests led to its accession to India.", "Identifies Chogyal monarchy in Sikkim."),
    ("36th Amendment Sikkim", "Which Constitutional Amendment Act of 1975 made Sikkim the 22nd full-fledged state of the Indian Union?",
     "36th Constitutional Amendment Act", ["35th Constitutional Amendment Act", "42nd Constitutional Amendment Act", "44th Constitutional Amendment Act"], "A",
     "The 35th Amendment made Sikkim an 'associate state', and the 36th Amendment in 1975 formally integrated it as India's 22nd state.", "Identifies 36th Amendment for Sikkim's statehood."),
    ("Kazi Lhendup Dorjee", "Who was the first Chief Minister of Sikkim who led the democratic struggle against the Chogyal's absolute monarchy?",
     "Kazi Lhendup Dorjee", ["Pawan Kumar Chamling", "Nar Bahadur Bhandari", "B.B. Gurung"], "A",
     "Kazi Lhendup Dorjee led the Sikkim National Congress, winning a massive democratic mandate that voted for accession to India.", "Identifies Kazi Lhendup Dorjee as first CM of Sikkim."),
    ("Operation Vijay Goa 1961", "In December 1961, the Government of India launched which military operation to liberate Goa, Daman, and Diu from 451 years of Portuguese colonial occupation?",
     "Operation Vijay", ["Operation Polo", "Operation Blue Star", "Operation Meghdoot"], "A",
     "Operation Vijay commenced on 17-18 December 1961, swiftly compelling Portuguese Governor-General Vassalo e Silva to sign the instrument of surrender.", "Recalls Operation Vijay for Goa liberation."),
    ("Ram Manohar Lohia Goa 1946", "Which prominent socialist leader initiated the historic civil rights struggle in Margao, Goa in June 1946 to demand civil liberties against Portuguese fascist rule?",
     "Dr. Ram Manohar Lohia", ["Jayaprakash Narayan", "Acharya Narendra Deva", "Purushottam Trikamdas"], "A",
     "Dr. Ram Manohar Lohia visited Goa on 18 June 1946, defying Portuguese bans and launching the Goa Civil Disobedience movement.", "Identifies Dr. Lohia launching Goa civil rights in 1946."),
    ("Dravidar Kazhagam Founder", "Which iconic social reformer founded the Self-Respect Movement and established the Dravidar Kazhagam (DK) in Tamil Nadu?",
     "E.V. Ramasamy 'Periyar'", ["C.N. Annadurai", "M.G. Ramachandran", "K. Kamaraj"], "A",
     "Periyar E.V. Ramasamy led the Self-Respect Movement, attacking caste hierarchy, Brahminical orthodoxy, and North Indian linguistic domination.", "Identifies Periyar as founder of DK."),
    ("DMK Split 1949 Annadurai", "In 1949, C.N. Annadurai broke away from Periyar's Dravidar Kazhagam to form which political party to participate in electoral democracy?",
     "Dravida Munnetra Kazhagam (DMK)", ["All India Anna DMK (AIADMK)", "Pattali Makkal Katchi (PMK)", "Desiya Murpokku Dravida Kazhagam"], "A",
     "Annadurai established the DMK in September 1949, transforming the cultural anti-Brahmin movement into an effective political party.", "Identifies C.N. Annadurai founding DMK in 1949."),
    ("Anti-Hindi Agitation 1965 Tamil Nadu", "Massive violent student agitations erupted across Tamil Nadu in January 1965 to protest against:",
     "The constitutional provision making Hindi the sole official language of India on 26 January 1965", ["The abolition of state assembly elections", "The ban on agricultural fertilizer subsidies", "The nationalisation of Tamil cinema production"], "A",
     "The impending end of English as an official language on 26 January 1965 sparked fierce student agitations in Tamil Nadu, leading Lal Bahadur Shastri to pledge continuation of English.", "Explains 1965 anti-Hindi agitations in Tamil Nadu."),
    ("AIADMK Formation 1972", "In 1972, popular film star and politician M.G. Ramachandran (MGR) split from the DMK to establish which formidable regional party?",
     "All India Anna Dravida Munnetra Kazhagam (AIADMK)", ["Dravidar Kazhagam (DK)", "Tamil Maanila Congress (TMC)", "Marumalarchi DMK (MDMK)"], "A",
     "MGR founded the AIADMK in October 1972 after falling out with DMK Chief Minister M. Karunanidhi, sweeping Tamil Nadu elections in 1977.", "Identifies MGR founding AIADMK in 1972."),
    ("Dravidian Dominance Since 1967", "Since the historic Fourth General Elections of 1967, state power in Tamil Nadu has been held exclusively by:",
     "Regional Dravidian parties (DMK or AIADMK)", ["The Indian National Congress exclusively", "Coalitions led by the Communist Party", "The Bharatiya Janata Party"], "A",
     "The 1967 DMK victory permanently ended national party dominance in Tamil Nadu, inaugurating uninterrupted regional Dravidian governance.", "Validates Dravidian party dominance in Tamil Nadu."),
    ("Naga National Council Phizo", "The Naga National Council (NNC), which declared Naga independence under sovereign status on 14 August 1947, was led by:",
     "Angami Zapu Phizo", ["Laldenga", "T.N. Angami", "S.C. Jamir"], "A",
     "Angami Zapu Phizo rejected integration into the Indian Union, leading an armed secessionist insurgency for an independent Nagaland.", "Identifies A.Z. Phizo heading the NNC."),
    ("Nagaland Statehood 1963", "Nagaland was carved out of Assam and inaugurated as a separate state of the Indian Union in which year?",
     "1963", ["1950", "1972", "1987"], "A",
     "Nagaland was formally inaugurated as the 16th state of the Indian Union on 1 December 1963 by President Sarvepalli Radhakrishnan.", "Identifies 1963 as year of Nagaland statehood."),
    ("Article 371A Nagaland Protections", "Article 371A of the Indian Constitution grants special constitutional protection to Nagaland regarding:",
     "Religious or social practices, customary law, and ownership/transfer of land and its resources", ["Exemption from Indian currency and foreign passport regulations", "The right to maintain an independent standing army", "Direct diplomatic representation in the United Nations"], "A",
     "Article 371A ensures that no act of Parliament affecting Naga customary practices, land rights, or civil procedures applies without the assent of the State Legislative Assembly.", "Details special protections under Article 371A."),
    ("Mizo Famine 1959 Mau Tam", "The armed insurgency in the Mizo Hills was triggered by widespread local outrage over the Assam government's inadequate relief during which severe 1959 ecological disaster?",
     "The Great Mau Tam (Bamboo flowering) famine", ["A massive earthquake destroying Aizawl", "A flood in the Brahmaputra river basin", "A locust swarm devouring tea plantations"], "A",
     "The Mau Tam famine in 1959 was caused by rodent proliferation feeding on flowering bamboo; local resentment led Laldenga to form the Mizo National Famine Front.", "Identifies Mau Tam famine in 1959."),
    ("Mizo Uprising 1966 Air Strikes", "In March 1966, following the MNF's declaration of independence, the Indian government took the unprecedented step of:",
     "Deploying the Indian Air Force to conduct aerial bombing strikes in Aizawl and Mizo hills", ["Ceding the Mizo hills permanently to Burma", "Imposing military martial law across all of West Bengal", "Dissolving the Parliament of India"], "A",
     "In March 1966, Indira Gandhi's government deployed IAF fighter jets to strafe and bomb rebel positions in Aizawl, the only instance of domestic air strikes.", "Recalls 1966 IAF air strikes in Mizoram."),
    ("Laldenga Mizoram Chief Minister", "Under the Mizoram Peace Accord signed in June 1986, which insurgent leader was sworn in as the Chief Minister of Mizoram?",
     "Laldenga", ["Brigadier Sailo", "Zoramthanga", "Lal Thanhawla"], "A",
     "Chief Minister Lal Thanhawla stepped aside to allow Laldenga to head a transitional coalition government before winning general assembly elections.", "Identifies Laldenga becoming Chief Minister."),
    ("Assam Movement AASU 1979", "The Assam Movement between 1979 and 1985 was spearheaded by which premier student body?",
     "All Assam Students Union (AASU)", ["National Students' Union of India (NSUI)", "Akhil Bharatiya Vidyarthi Parishad (ABVP)", "Students' Federation of India (SFI)"], "A",
     "AASU, led by Prafulla Kumar Mahanta and Bhrigu Kumar Phukan, mobilized massive popular non-violent satyagrahas and bandhs against illegal migrants.", "Identifies AASU spearheading Assam movement."),
    ("Nellie Massacre 1983", "During the highly controversial Assam Assembly elections of February 1983, one of the worst ethnic pogroms in modern Indian history occurred at:",
     "Nellie (in Nagaon district)", ["Guwahati", "Dibrugarh", "Silchar"], "A",
     "The Nellie massacre resulted in the brutal slaughter of over 2,000 Bengali-origin Muslims in a single morning amidst boycott of the 1983 polls.", "Identifies Nellie massacre of 1983."),
    ("Asom Gana Parishad Formation 1985", "Following the signing of the Assam Accord in August 1985, AASU and the All Assam Gana Sangram Parishad organized which regional political party?",
     "Asom Gana Parishad (AGP)", ["Assam United Democratic Front (AUDF)", "Bodoland People's Front (BPF)", "United Minorities Front (UMF)"], "A",
     "The AGP was formed in Golaghat in October 1985 and swept the December 1985 Assam assembly elections, making 32-year-old Prafulla Mahanta Chief Minister.", "Identifies formation of AGP in 1985."),
    ("Bodo Autonomy Demand", "Which major plains indigenous tribal community of Assam launched prolonged agitations demanding a separate homeland ('Bodoland')?",
     "Bodos (All Bodo Students Union - ABSU)", ["Khasis", "Mizos", "Apatanis"], "A",
     "Led by Upendranath Brahma, ABSU launched the Bodoland movement in 1987 demanding a separate state bifurcated from Assam.", "Identifies Bodo community demanding autonomy."),
    ("Tripura Demographic Inversion", "Tripura witnessed violent tribal insurgency beginning in the late 1970s primarily because:",
     "Massive influx of Bengali refugees from East Pakistan/Bangladesh reduced the indigenous tribal population from a majority to a tiny minority", ["The central government banned all agricultural activity", "The state was merged with West Bengal against local wishes", "The Indian army occupied all rubber plantations"], "A",
     "Indigenous tribals fell from 64% of Tripura's population in 1941 to under 30% by 1981 due to migrant settlement, sparking fierce ethnic conflict.", "Explains root cause of Tripura tribal insurgency."),
    ("Sarkaria Commission Centre-State", "Which judicial commission was appointed by the Union government in June 1983 to examine and recommend changes in Centre-State relations?",
     "Justice R.S. Sarkaria Commission", ["Justice Kothari Commission", "Justice Verma Commission", "Justice Balwant Rai Mehta Committee"], "A",
     "The Sarkaria Commission submitted its report in 1988, recommending inter-state councils and circumscribing the misuse of Article 356.", "Identifies Sarkaria Commission on Centre-State ties."),
    ("Rajiv-Longowal Accord Date", "The Memorandum of Settlement on Punjab, popularly known as the Rajiv-Longowal Accord, was signed on which date?",
     "24 July 1985", ["15 August 1984", "31 October 1984", "26 January 1986"], "A",
     "Prime Minister Rajiv Gandhi and Akali leader Sant Harchand Singh Longowal signed the Punjab Accord in New Delhi on 24 July 1985.", "Recalls signing date of Rajiv-Longowal Accord."),
    ("Sant Longowal Assassination", "Less than a month after signing the historic Punjab Accord, Sant Harchand Singh Longowal was:",
     "Assassinated by Sikh extremists who opposed any compromise with the Indian government", ["Elected unanimously as President of India", "Appointed Chief Minister of Haryana", "Deported to the United Kingdom"], "A",
     "Militants viewed Longowal's peace pact as treason, assassinating him inside a gurdwara in Sherpur on 20 August 1985.", "Recalls tragic assassination of Sant Longowal."),
    ("Chandigarh Transfer Clause Punjab Accord", "Under the Rajiv-Longowal Accord of 1985, what was agreed regarding the union territory of Chandigarh?",
     "Chandigarh would be transferred exclusively to Punjab as its capital, with compensation to Haryana", ["Chandigarh would be partitioned into two distinct sovereign city-states", "Chandigarh would be annexed by Himachal Pradesh", "Chandigarh would be completely demolished and rebuilt"], "A",
     "The accord stipulated the transfer of Chandigarh to Punjab by 26 January 1986, though the transfer remained unimplemented due to disputes over Hindi-speaking areas.", "Identifies Chandigarh transfer provision in Punjab Accord."),
    ("Ravi-Beas Waters Tribunal", "The Rajiv-Longowal Accord provided for the adjudication of the disputed sharing of Ravi-Beas river waters between Punjab, Haryana, and Rajasthan by appointing:",
     "A Supreme Court Judge Tribunal (Eradi Tribunal)", ["The International Court of Justice at The Hague", "The World Bank Indus Commission", "The British Privy Council"], "A",
     "A tribunal headed by Supreme Court Justice V. Balakrishna Eradi was constituted to determine water shares among Punjab, Haryana, and Rajasthan.", "Identifies Eradi Tribunal for Ravi-Beas waters."),
    ("Kashmir Insurgency Eruption 1989", "Widespread armed secessionist insurgency and youth militancy erupted in the Kashmir Valley in 1989-1990, fueled in large part by public outrage over:",
     "Allegations of widespread vote rigging and electoral manipulation in the March 1987 State Assembly elections", ["The complete closure of all schools and hospitals in Srinagar", "The abolition of Indian rupee currency notes", "The construction of the Mughal Road"], "A",
     "The perceived fraudulent rigging of the 1987 elections against the Muslim United Front (MUF) alienated Kashmiri youth, triggering armed militancy.", "Identifies rigged 1987 election triggering Kashmir insurgency."),
    ("Kashmiri Pandits Displacement 1990", "In early 1990, the eruption of targeted militant violence and terror in the Kashmir Valley led to the tragic mass exodus of which minority community?",
     "Kashmiri Pandits (Hindus)", ["Sikh farmers of Drass", "Ladakhi Buddhists", "Balti Muslims"], "A",
     "Over 150,000 Kashmiri Pandits were forced to flee their ancestral homeland in early 1990, living as displaced refugees in Jammu, Delhi, and across India.", "Recalls mass displacement of Kashmiri Pandits in 1990."),
    ("Article 370 Abrogation 2019", "Through the Jammu and Kashmir Reorganisation Act passed by Parliament in August 2019, the special autonomous status under Article 370 was revoked, and the state was bifurcated into:",
     "Two Union Territories: Jammu & Kashmir, and Ladakh", ["Three independent sovereign republics", "One Union Territory and one full state", "A military command district without administration"], "A",
     "Parliament enacted the bifurcation of Jammu & Kashmir into two Union Territories—J&K (with legislature) and Ladakh (without legislature)—in August 2019.", "Recalls 2019 Jammu and Kashmir Reorganisation Act."),
    ("Delhi Agreement 1952 Kashmir", "The Delhi Agreement of July 1952 negotiated between Jawaharlal Nehru and Sheikh Abdullah provided that:",
     "The state of Jammu and Kashmir would have its own state flag, Sadr-i-Riyasat, and separate citizenship provisions alongside Indian citizenship", ["Jammu and Kashmir would be immediately annexed by Punjab", "All state revenue would be transferred to the Bank of England", "The Indian army would be barred from the Himalayas"], "A",
     "The 1952 Delhi Agreement settled terms of autonomy, permitting a separate state flag and replacing the hereditary ruler with an elected Sadr-i-Riyasat.", "Details core terms of Delhi Agreement 1952."),
    ("Sadr-i-Riyasat Karan Singh", "Who was the first and only elected Sadr-i-Riyasat (Head of State) of Jammu and Kashmir before the title was changed to Governor in 1965?",
     "Dr. Karan Singh", ["Hari Singh", "Ghulam Mohammad Sadiq", "Sheikh Abdullah"], "A",
     "Dr. Karan Singh served as Regent from 1949 and then as elected Sadr-i-Riyasat from 1952 until 1965 when the post was redesignated as Governor.", "Identifies Dr. Karan Singh as Sadr-i-Riyasat."),
    ("Farooq Abdullah NC Victory 1983", "Following Sheikh Abdullah's death in September 1982, his son Dr. Farooq Abdullah became Chief Minister and led the National Conference to an emphatic victory in the:",
     "June 1983 Jammu and Kashmir Assembly elections", ["1977 general elections", "1971 parliamentary elections", "1996 assembly elections"], "A",
     "Farooq Abdullah demonstrated his popular mandate by winning 46 of 76 seats in the June 1983 state elections, resisting central Congress pressure.", "Identifies Farooq Abdullah's 1983 election triumph."),
    ("Dismissal of Farooq Government 1984", "In July 1984, the central government orchestrated the controversial dismissal of Dr. Farooq Abdullah's elected ministry by sponsoring defections led by his brother-in-law:",
     "Ghulam Mohammad Shah (G.M. Shah)", ["Mufti Mohammad Sayeed", "Mir Qasim", "Abdul Ghani Lone"], "A",
     "Governor Jagmohan dismissed Farooq Abdullah and installed G.M. Shah heading a minority puppet ministry, severely alienating Kashmiri public sentiment.", "Identifies G.M. Shah's defection ministry in 1984."),
    ("Rajiv-Farooq Accord 1986", "In November 1986, Dr. Farooq Abdullah signed an electoral coalition accord with Prime Minister Rajiv Gandhi, which was criticized locally as:",
     "A surrender of the National Conference's traditional regional autonomy stance to Delhi's centralizing impulses", ["A declaration of war against China", "An agreement to ban the Urdu language", "A scheme to sell Dal Lake to private hotels"], "A",
     "The Rajiv-Farooq alliance created immense public cynicism in the Valley, leaving a political vacuum filled by the Muslim United Front.", "Explains backlash against Rajiv-Farooq Accord."),
    ("Meghalaya Autonomous State 1970", "Before attaining full statehood in January 1972, Meghalaya was created as an 'autonomous sub-state' within Assam in:",
     "1970 (under the Assam Reorganisation Act 1969)", ["1955", "1960", "1980"], "A",
     "Meghalaya was carved out of Assam as an autonomous sub-state in April 1970 before being upgraded to full statehood in 1972.", "Identifies 1970 autonomous status of Meghalaya."),
    ("Assam Official Language Act 1960", "The movement for separate tribal hill states in the North-East gained massive momentum after the Assam government enacted which controversial legislation in 1960?",
     "The Assam Official Language Act declaring Assamese as the sole official language", ["The Tribal Land Confiscation Act", "The Compulsory Military Training Act", "The Plantation Nationalisation Act"], "A",
     "Imposing Assamese as the sole official language alienated tribal hill peoples (Khasis, Garos, Mizos), sparking demands for separate statehood.", "Explains 1960 Assamese Language Act trigger."),
    ("All Party Hill Leaders Conference", "Which political party led the peaceful constitutional movement that successfully secured statehood for Meghalaya in 1972?",
     "All Party Hill Leaders Conference (APHLC)", ["Mizo National Front (MNF)", "Naga National Council (NNC)", "United Liberation Front of Asom (ULFA)"], "A",
     "Formed in 1960 by tribal leaders like Williamson Sangma, the APHLC waged a disciplined constitutional campaign to win separate statehood for Meghalaya.", "Identifies APHLC leading Meghalaya movement."),
    ("ULFA Formation 1979", "The United Liberation Front of Asom (ULFA) was established in April 1979 at Sibsagar with the radical secessionist objective of:",
     "Establishing a sovereign, independent socialist state of Assam through armed struggle", ["Promoting Hindi literacy across tea estates", "Constructing thermal power plants in lower Assam", "Merging Assam with the kingdom of Bhutan"], "A",
     "Formed by Paresh Baruah, Arabinda Rajkhowa, and others at Rang Ghar, ULFA abandoned democratic methods for armed insurgent warfare.", "Identifies founding objective of ULFA."),
    ("Operation Bajrang 1990", "In November 1990, the central government dismissed the AGP ministry in Assam, imposed President's rule, and launched which military operation against ULFA?",
     "Operation Bajrang", ["Operation Rhino", "Operation Blue Star", "Operation Vijay"], "A",
     "Operation Bajrang was launched by the Indian Army in November 1990 to track down ULFA training camps and dismantle insurgent infrastructure.", "Identifies Operation Bajrang against ULFA."),
    ("Operation Rhino 1991", "Following the resurgence of ULFA militant attacks in 1991, the Indian Army launched which decisive counter-insurgency operation?",
     "Operation Rhino", ["Operation Cactus", "Operation Meghdoot", "Operation Pawan"], "A",
     "Operation Rhino was launched in September 1991, successfully capturing thousands of ULFA cadres and forcing leaders to flee across borders.", "Recalls Operation Rhino in Assam."),
    ("Dravidian Non-Brahmin Movement", "The Dravidian movement in the early 20th century was fundamentally a mobilization of which social section against upper-caste hegemony?",
     "Non-Brahmin backward classes, Dalits, and marginalized vernacular social strata", ["Urban European trading merchants", "Orthodox Sanskrit priests exclusively", "Hereditary landlords of North India"], "A",
     "The Justice Party and Periyar's movement mobilized intermediate castes and oppressed classes against Brahminical monopoly over education and public services.", "Identifies social base of the Dravidian movement."),
    ("Maharani Jindan Akali Movement", "The historic Akali movement of the 1920s in Punjab was launched by Sikhs to achieve which primary objective?",
     "To liberate historical Gurdwaras from the corrupt control of hereditary Mahants and transfer management to the community", ["To establish an independent sovereign monarchical empire", "To conquer Kashmir by military force", "To oppose the construction of canal colonies"], "A",
     "The peaceful Akali agitation led to the historic Sikh Gurdwaras Act of 1925, establishing the Shiromani Gurdwara Parbandhak Committee (SGPC).", "Explains historical origins of the Akali movement."),
    ("Sarkaria Commission Recommendations", "Among its key institutional recommendations in 1988, the Sarkaria Commission strongly urged:",
     "The establishment of a permanent Inter-State Council under Article 263 and restricting Article 356 to extreme situations of last resort", ["The complete abolition of all State Legislative Assemblies", "The replacement of state governors by military colonels", "The elimination of all regional languages from schools"], "A",
     "The Sarkaria Commission championed collaborative federalism, advising that Article 356 must be an exception of last resort.", "Summarizes Sarkaria Commission recommendations.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u14_direct:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u14(make_question(CHAPTER_U14, topic, stem, opts, c, s))

u14_qs = u14_qs[:60]
assert len(u14_qs) == 60, f"Expected 60 questions for Unit 14, got {len(u14_qs)}"
validate_and_collect(u14_qs, u14_seen)
print("Unit 14 validated: 60 unique questions.")


# =================================================================================================
# UNIT 15: Recent Developments in Indian Politics (40 Questions)
# =================================================================================================
CHAPTER_U15 = "Recent Developments in Indian Politics"
u15_qs = []
u15_seen = set()

def add_u15(q):
    u15_qs.append(q)

opts, c, s = rotate_options(
    "1978 under the chairmanship of Bindeshwari Prasad Mandal (Morarji Desai Government)",
    ["1953 under Kaka Kalelkar (Nehru Government)", "1990 under V.P. Singh (National Front Government)", "1975 under Indira Gandhi (Emergency Regime)"],
    "A",
    "The Second Backward Classes Commission, popularly known as the Mandal Commission, was appointed in December 1978 by the Morarji Desai Janata government under B.P. Mandal.\nHence, Option {{CORR}} is correct.",
    "Identifies 1978 under B.P. Mandal by Janata Party government."
)
add_u15(make_question(CHAPTER_U15, "Mandal Commission Appointment", "In which year and under whose prime ministership was the Second Backward Classes Commission (Mandal Commission) appointed?", opts, c, s))

opts, c, s = rotate_options(
    "27 percent reservation in central government jobs and public sector undertakings for OBCs",
    ["50 percent reservation in Lok Sabha seats for OBCs", "10 percent reservation for economically weaker sections", "Reservation of all cabinet minister posts for backward classes"],
    "B",
    "The Mandal Commission submitted its report in December 1980 recommending 27% reservation in central government employment and educational admissions for Socially and Educationally Backward Classes (SEBCs/OBCs).\nHence, Option {{CORR}} is correct.",
    "Identifies 27% OBC job quota recommendation."
)
add_u15(make_question(CHAPTER_U15, "Mandal Commission Recommendations", "What was the principal reservation quota recommended by the Mandal Commission for Socially and Educationally Backward Classes (OBCs)?", opts, c, s))

opts, c, s = rotate_options(
    "V.P. Singh (National Front Government on 7 August 1990)",
    ["Chandra Shekhar", "P.V. Narasimha Rao", "Atal Bihari Vajpayee"],
    "C",
    "Prime Minister Vishwanath Pratap Singh announced the implementation of the Mandal Commission's recommendation of 27% job quota for OBCs on 7 August 1990 in Parliament.\nHence, Option {{CORR}} is correct.",
    "Identifies V.P. Singh announcing Mandal implementation in August 1990."
)
add_u15(make_question(CHAPTER_U15, "Mandal Implementation Announcement", "Which Prime Minister announced the formal implementation of the Mandal Commission's 27% reservation in central government jobs in August 1990?", opts, c, s))

opts, c, s = rotate_options(
    "Indra Sawhney v. Union of India (1992 Mandal Case)",
    ["Kesavananda Bharati v. State of Kerala (1973)", "Minerva Mills v. Union of India (1980)", "Maneka Gandhi v. Union of India (1978)"],
    "D",
    "In the landmark Nine-Judge Constitution Bench ruling in Indra Sawhney v. Union of India (November 1992), the Supreme Court upheld the 27% OBC quota while excluding the 'creamy layer' and capping total reservation at 50%.\nHence, Option {{CORR}} is correct.",
    "Identifies Indra Sawhney case of 1992 upholding 27% OBC reservation."
)
add_u15(make_question(CHAPTER_U15, "Indra Sawhney Ruling", "In which landmark 1992 judgment did the Supreme Court of India uphold the constitutional validity of 27% reservation for OBCs?", opts, c, s))

# Match questions for Unit 15
add_u15(make_match_question(
    CHAPTER_U15, "Coalition Governments and Prime Ministers",
    "Match List I (Coalition Era Government) with List II (Prime Minister):",
    [("A", "National Front Government (1989-1990)"), ("B", "United Front Government (1996-1997)"), ("C", "NDA Government (1998-2004)"), ("D", "UPA Government (2004-2014)")],
    [("I", "V.P. Singh"), ("II", "H.D. Deve Gowda"), ("III", "Atal Bihari Vajpayee"), ("IV", "Dr. Manmohan Singh")],
    "A-I, B-II, C-III, D-IV", "A",
    "National Front headed by V.P. Singh; United Front headed by Deve Gowda; NDA headed by Vajpayee; UPA headed by Manmohan Singh.",
    "Matches coalition governments with their respective Prime Ministers."
))

add_u15(make_match_question(
    CHAPTER_U15, "Political Parties and Ideological Base",
    "Match List I (Party / Organization) with List II (Founding Leader / Key Association):",
    [("A", "Bahujan Samaj Party (BSP)"), ("B", "Samajwadi Party (SP)"), ("C", "Rashtriya Janata Dal (RJD)"), ("D", "BAMCEF / DS4")],
    [("I", "Kanshi Ram (formed in 1984)"), ("II", "Mulayam Singh Yadav (formed in 1992)"), ("III", "Lalu Prasad Yadav (formed in 1997)"), ("IV", "Kanshi Ram (All India Backward and Minority Communities Employees Federation)")],
    "A-I, B-II, C-III, D-IV", "B",
    "BSP founded by Kanshi Ram in 1984; Samajwadi Party founded by Mulayam Singh Yadav in 1992; RJD founded by Lalu Yadav in 1997; BAMCEF established by Kanshi Ram in 1978.",
    "Matches backward classes parties and organizations with their founders."
))

# Sequence questions for Unit 15
add_u15(make_sequence_question(
    CHAPTER_U15, "Chronology of Political Transitions 1989-2004",
    "Arrange the following pivotal political events in correct chronological sequence:",
    [("A", "Ninth Lok Sabha elections marking the end of Congress one-party dominance"),
     ("B", "Announcement of Mandal Commission implementation by V.P. Singh"),
     ("C", "Demolition of the disputed Babri Masjid structure in Ayodhya"),
     ("D", "Swearing-in of the first 13-day Atal Bihari Vajpayee NDA ministry")],
    "A, B, C, D", "C",
    "Ninth General Elections held in Nov 1989; Mandal announced in Aug 1990; Babri structure demolished on 6 Dec 1992; First Vajpayee government sworn in in May 1996.",
    "Arranges landmark political transitions from 1989 to 1996 in order."
))

add_u15(make_sequence_question(
    CHAPTER_U15, "Prime Ministers of India Chronology",
    "Arrange the following Prime Ministers in correct chronological order of their assumption of office:",
    [("A", "Vishwanath Pratap Singh"),
     ("B", "Chandra Shekhar"),
     ("C", "P.V. Narasimha Rao"),
     ("D", "H.D. Deve Gowda")],
    "A, B, C, D", "D",
    "V.P. Singh (Dec 1989 - Nov 1990); Chandra Shekhar (Nov 1990 - June 1991); P.V. Narasimha Rao (June 1991 - May 1996); H.D. Deve Gowda (June 1996 - April 1997).",
    "Chronological sequence of Prime Ministers of India (1989-1996)."
))

# Statement questions for Unit 15
add_u15(make_statement_question(
    CHAPTER_U15, "National Front Outside Support",
    "The National Front government headed by V.P. Singh was supported from outside by both the Bharatiya Janata Party (BJP) and the Left Front.",
    "The BJP and the Left Front joined the Union Cabinet as formal coalition partners with cabinet portfolios.",
    3, "A",
    "Statement I is correct: Both BJP and the Left Front provided outside legislative support to keep Congress out. Statement II is incorrect: neither party joined the council of ministers; they supported from the outside.",
    "Evaluates external support dynamics of the National Front Government."
))

add_u15(make_statement_question(
    CHAPTER_U15, "Kanshi Ram BAMCEF DS4 BSP",
    "Kanshi Ram founded BAMCEF in 1978 and later established the Bahujan Samaj Party (BSP) in 1984 to champion political power for the 'Bahujan' majority.",
    "Kanshi Ram argued that Dalits should remain permanently subordinate to upper-caste patron parties rather than forming an independent party.",
    3, "B",
    "Statement I is correct: Kanshi Ram created BAMCEF, DS4, and BSP (1984). Statement II is completely contrary to Kanshi Ram's philosophy, which proclaimed political power as the master key for Dalit emancipation.",
    "Details Kanshi Ram's political ideology and organizations."
))

# Assertion-Reason for Unit 15
add_u15(make_assertion_question(
    CHAPTER_U15, "Era of Multi-Party Coalitions",
    "The general elections of 1989 initiated an era of multi-party coalition governments at the Centre that lasted for twenty-five years until 2014.",
    "No single political party succeeded in securing an absolute majority on its own in the Lok Sabha in any general election between 1989 and 2014.",
    1, "A",
    "Both (A) and (R) are correct and (R) directly explains (A). The absence of a single-party majority compelled major parties to construct broad coalitions with regional players.",
    "Explains the emergence and endurance of coalition politics in India."
))

add_u15(make_assertion_question(
    CHAPTER_U15, "Consensus on Economic Reforms",
    "Despite fierce electoral competition and frequent changes of government after 1991, broad consensus persisted among major political parties regarding the new economic policies.",
    "Most political parties realized that integration into the global economy, deregulation, and infrastructure growth were essential for national development.",
    1, "B",
    "Both (A) and (R) are correct and (R) explains (A). Successive governments of different ideological hues (Congress, United Front, NDA, UPA) sustained the post-1991 economic reform path.",
    "Explains cross-party consensus on post-1991 economic reforms."
))

# Multi-statement evaluation for Unit 15
add_u15(make_multi_statement_question(
    CHAPTER_U15, "Core Dimensions of 1990s Political Consensus",
    "Which of the following elements represent the four core dimensions of growing political consensus in India identified in the post-1990 period?",
    [("A", "Consensus on the continuation and expansion of the New Economic Policies"),
     ("B", "Acceptance of the political and social claims of the Other Backward Classes (OBCs)"),
     ("C", "Acceptance of the crucial role and participation of state-level regional parties in national governance"),
     ("D", "Reversion to strict centralized one-party socialist state ownership of all private businesses")],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "C",
    "(A), (B), and (C) are correct. The four areas of consensus were: economic reforms, OBC empowerment, regional parties in governance, and emphasis on pragmatic governance over pure ideology. Statement (D) is false.",
    "Identifies four key dimensions of consensus in contemporary Indian politics."
))

add_u15(make_multi_statement_question(
    CHAPTER_U15, "Demolition of Babri Masjid Aftermath",
    "Which of the following events occurred in the immediate aftermath of the demolition of the Babri Masjid structure on 6 December 1992?",
    [("A", "The Central Government dismissed the BJP state government in Uttar Pradesh headed by Chief Minister Kalyan Singh"),
     ("B", "President's Rule was imposed in other BJP-ruled states including Madhya Pradesh, Rajasthan, and Himachal Pradesh"),
     ("C", "Widespread communal violence and riots broke out across several Indian cities, notably Mumbai in December 1992 and January 1993"),
     ("D", "The Supreme Court abolished the Constitution of India and ordered military rule")],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "D",
    "(A), (B), and (C) are correct. Kalyan Singh's government resigned/was dismissed, President's Rule was imposed in 4 BJP states, and severe communal riots erupted in Mumbai and elsewhere. Statement (D) is absurd.",
    "Recalls constitutional and political fallout of Babri demolition in 1992."
))

# 26 Direct concept and factual questions for Unit 15
u15_direct = [
    ("First Backward Classes Commission", "The First Backward Classes Commission was appointed by the Government of India in 1953 under the chairmanship of:",
     "Kaka Kalelkar", ["B.P. Mandal", "Dr. B.R. Ambedkar", "Jagjivan Ram"], "A",
     "The Kaka Kalelkar Commission was appointed in January 1953 and submitted its report in 1955, but its recommendations were not implemented at the Centre.", "Identifies Kaka Kalelkar as head of First Backward Classes Commission."),
    ("Mandal Commission Terms of Reference", "The Mandal Commission was officially tasked to determine the criteria for defining which marginalized social group in India?",
     "Socially and Educationally Backward Classes (SEBCs)", ["Religious minorities exclusively", "Landless tribal agricultural serfs exclusively", "Ex-servicemen of the Indian Army"], "A",
     "Article 340 empowered the President to appoint a commission to investigate the conditions of socially and educationally backward classes.", "Details Mandal Commission constitutional mandate under Article 340."),
    ("Mandal Commission Identification Percentage", "According to the Mandal Commission's survey and calculations, Socially and Educationally Backward Classes (OBCs) constituted approximately what proportion of India's population?",
     "52 percent", ["27 percent", "15 percent", "75 percent"], "A",
     "The Mandal Commission calculated OBCs to comprise roughly 52% of the population, but limited its quota recommendation to 27% due to the 50% judicial ceiling.", "Recalls 52% OBC population calculation."),
    ("L.K. Advani Somnath to Ayodhya Rath Yatra", "In September 1990, BJP President L.K. Advani embarked on a nationwide Rath Yatra to mobilize support for the Ram Janmabhoomi movement, starting from:",
     "Somnath in Gujarat to Ayodhya in Uttar Pradesh", ["Kanyakumari to Kashmir", "Varanasi to Kolkata", "Haridwar to New Delhi"], "A",
     "The Rath Yatra commenced at Somnath on 25 September 1990 and generated immense political polarization across northern India.", "Identifies Somnath as starting point of 1990 Rath Yatra."),
    ("Advani Arrest Samastipur 1990", "In October 1990, L.K. Advani's Rath Yatra was halted and he was arrested at Samastipur by the state government headed by Chief Minister:",
     "Lalu Prasad Yadav (in Bihar)", ["Mulayam Singh Yadav (in UP)", "Bhairon Singh Shekhawat (in Rajasthan)", "Jyoti Basu (in West Bengal)"], "A",
     "Bihar Chief Minister Lalu Prasad Yadav ordered the arrest of L.K. Advani at Samastipur on 23 October 1990, leading the BJP to withdraw support from V.P. Singh.", "Identifies Lalu Prasad Yadav arresting Advani in 1990."),
    ("National Front Fall November 1990", "Following the arrest of L.K. Advani, the BJP withdrew support, causing V.P. Singh's National Front government to lose a vote of confidence in:",
     "November 1990", ["December 1989", "August 1991", "May 1996"], "A",
     "V.P. Singh resigned on 7 November 1990 after losing the floor test 142 to 346, leading Chandra Shekhar to form a short-lived government.", "Recalls fall of V.P. Singh government in November 1990."),
    ("Chandra Shekhar Prime Ministership", "Chandra Shekhar served as Prime Minister from November 1990 to June 1991 leading the Samajwadi Janata Party with the outside legislative support of:",
     "The Indian National Congress led by Rajiv Gandhi", ["The Bharatiya Janata Party", "The Left Front", "The Bahujan Samaj Party"], "A",
     "Chandra Shekhar ruled with just 64 MPs supported from outside by Rajiv Gandhi's Congress until Congress withdrew support over surveillance allegations.", "Identifies Congress backing Chandra Shekhar in 1990-91."),
    ("Rajiv Gandhi Assassination Sriperumbudur", "Former Prime Minister Rajiv Gandhi was tragically assassinated by an LTTE suicide bomber on 21 May 1991 during an election rally at:",
     "Sriperumbudur (Tamil Nadu)", ["Madurai", "Coimbatore", "Thiruvananthapuram"], "A",
     "Rajiv Gandhi was assassinated by LTTE operative Thenmozhi Rajaratnam (Dhanu) on 21 May 1991 during campaign rallies in Tamil Nadu.", "Recalls assassination of Rajiv Gandhi at Sriperumbudur."),
    ("New Economic Policy Launch 1991", "The historic New Economic Policy embodying Liberalisation, Privatisation, and Globalisation (LPG) was unveiled in July 1991 by Finance Minister:",
     "Dr. Manmohan Singh", ["P. Chidambaram", "Pranab Mukherjee", "Yashwant Sinha"], "A",
     "Finance Minister Dr. Manmohan Singh presented the pathbreaking Union Budget on 24 July 1991 under Prime Minister P.V. Narasimha Rao, dismantling the License Raj.", "Identifies Dr. Manmohan Singh launching 1991 economic reforms."),
    ("Narasimha Rao Full Five-Year Term", "P.V. Narasimha Rao achieved the unique political distinction of becoming the first non-Nehru-Gandhi Prime Minister to:",
     "Complete a full five-year term in office heading a minority/narrow-majority government (1991-1996)", ["Win 500 seats in the Lok Sabha", "Serve as Chief Justice simultaneously", "Abolish the Rajya Sabha"], "A",
     "P.V. Narasimha Rao successfully steered a minority government to complete a full five-year term from June 1991 to May 1996.", "Highlights Narasimha Rao completing a full five-year term."),
    ("Babri Masjid Demolition Date", "On which fateful date was the disputed 16th-century Babri Masjid structure in Ayodhya demolished by kar sevaks?",
     "6 December 1992", ["15 August 1990", "26 January 1992", "23 October 1990"], "A",
     "The Babri Masjid was pulled down on 6 December 1992 during a massive kar seva gathering, triggering widespread communal disturbances.", "Identifies 6 December 1992 as date of Babri demolition."),
    ("Liberhan Commission Ayodhya", "Which Commission of Inquiry was appointed by the Government of India in December 1992 to investigate the demolition of the Babri Masjid?",
     "Justice M.S. Liberhan Commission", ["Shah Commission", "Sarkaria Commission", "Nanavati Commission"], "A",
     "The Liberhan Commission was appointed on 16 December 1992 and submitted its extensive inquiry report to Prime Minister Manmohan Singh in June 2009.", "Identifies Liberhan Commission on Babri demolition."),
    ("United Front Government 1996", "Following the collapse of the 13-day Vajpayee government in May 1996, the United Front government assumed power under Prime Minister:",
     "H.D. Deve Gowda (supported from outside by the Congress)", ["I.K. Gujral", "Jyoti Basu", "Mulayam Singh Yadav"], "A",
     "Janata Dal leader and Karnataka Chief Minister H.D. Deve Gowda was chosen as the compromise United Front Prime Minister with outside Congress backing.", "Identifies H.D. Deve Gowda heading United Front in 1996."),
    ("I.K. Gujral Prime Ministership", "In April 1997, after Congress withdrew support to Deve Gowda, who was sworn in as the next United Front Prime Minister?",
     "Inder Kumar Gujral (I.K. Gujral)", ["P. Chidambaram", "Murli Manohar Joshi", "Chandra Shekhar"], "A",
     "I.K. Gujral served as Prime Minister from April 1997 to March 1998, renowned for articulating the 'Gujral Doctrine' of non-reciprocal neighbourhood diplomacy.", "Identifies I.K. Gujral as United Front PM in 1997."),
    ("NDA First Majority Term 1999-2004", "The National Democratic Alliance (NDA) government led by Atal Bihari Vajpayee won a decisive parliamentary majority and completed a full five-year term following which general elections?",
     "The 1999 Thirteenth Lok Sabha elections", ["The 1996 elections", "The 1998 elections", "The 1989 elections"], "A",
     "The NDA won 303 seats in the post-Kargil general elections of September-October 1999, governing smoothly until 2004.", "Identifies 1999 elections inaugurating full NDA term."),
    ("UPA Coalition Formation 2004", "Following the surprise defeat of the NDA's 'India Shining' campaign in May 2004, which multi-party coalition assumed power at the Centre?",
     "United Progressive Alliance (UPA) headed by the Congress", ["National Front", "United Front", "Third Front"], "A",
     "The UPA government was formed in May 2004 under Prime Minister Dr. Manmohan Singh, supported from outside by the Left Front.", "Identifies UPA coalition formed in 2004."),
    ("Mayawati First Dalit Woman CM", "In June 1995, BSP leader Mayawati scripted history by becoming the first Dalit woman Chief Minister of which state?",
     "Uttar Pradesh", ["Bihar", "Madhya Pradesh", "Rajasthan"], "A",
     "Mayawati became Chief Minister of Uttar Pradesh in June 1995 with the outside legislative support of the BJP, shattering traditional upper-caste hegemony.", "Identifies Mayawati as first Dalit woman CM of UP in 1995."),
    ("BAMCEF Formation Year", "Kanshi Ram established BAMCEF (Backward and Minority Communities Employees Federation) in which year to mobilize government employees?",
     "1978", ["1984", "1971", "1990"], "A",
     "BAMCEF was formally launched on 6 December 1978 by Kanshi Ram to build an intellectual and financial backbone among Dalit and OBC public servants.", "Recalls 1978 formation of BAMCEF."),
    ("DS4 Precursor to BSP", "In 1981, Kanshi Ram formed DS-4 as an agitational wing before launching the BSP, where DS-4 stood for:",
     "Dalit Shoshit Samaj Sangharsh Samiti", ["Democratic Secular Socialist Student Society", "Direct Social Struggle for State Supremacy", "Dr. Ambedkar Samata Sewa Sangh"], "A",
     "DS-4 was established in December 1981 to organize mass awareness campaigns across North India ahead of launching the Bahujan Samaj Party.", "Details acronym and purpose of DS-4."),
    ("BSP Formation Date 1984", "The Bahujan Samaj Party (BSP) was formally founded by Kanshi Ram on 14 April (Ambedkar Jayanti) of which year?",
     "1984", ["1977", "1989", "1992"], "A",
     "The BSP was launched on 14 April 1984, claiming to represent the 85% majority ('Bahujan') against the 15% upper-caste elite.", "Identifies 1984 as founding year of BSP."),
    ("Samajwadi Party Founding Year 1992", "The Samajwadi Party was founded by veteran socialist leader Mulayam Singh Yadav in October of which historic year?",
     "1992", ["1989", "1980", "1996"], "A",
     "Mulayam Singh Yadav founded the Samajwadi Party in Lucknow on 4 October 1992, drawing strong support from Yadavs and minority communities.", "Identifies 1992 founding of Samajwadi Party."),
    ("Godhra Train Burning 2002", "In February 2002, tragic communal violence erupted across Gujarat following the burning of a passenger train coach carrying kar sevaks at Godhra station, known as the:",
     "Sabarmati Express (Coach S-6)", ["Samjhauta Express", "Rajdhani Express", "Gitanjali Express"], "A",
     "Fifty-nine people died when Coach S-6 of the Sabarmati Express was set on fire at Godhra station on 27 February 2002, sparking extensive retaliatory riots.", "Identifies Sabarmati Express at Godhra in 2002."),
    ("National Human Rights Commission NHRC", "Following the 2002 Gujarat riots, which statutory body intervened decisively to protect riot victims, ordering fair investigations and transfer of sensitive trials?",
     "National Human Rights Commission (NHRC)", ["Law Commission of India", "Union Public Service Commission", "University Grants Commission"], "A",
     "The NHRC, headed by Justice J.S. Verma, intervened strongly, petitioning the Supreme Court to transfer key riot trials outside Gujarat to ensure justice.", "Details NHRC intervention after 2002 riots."),
    ("Historic 2014 Lok Sabha Majority", "The Sixteenth Lok Sabha elections of 2014 marked a historic watershed in contemporary Indian politics because:",
     "For the first time in thirty years since 1984, a single political party (BJP) secured an outright absolute majority on its own", ["All regional parties decided to dissolve themselves", "The coalition system was made illegal by constitutional amendment", "Voting was made compulsory under penalty of imprisonment"], "A",
     "The BJP won 282 seats on its own (336 for NDA) under Narendra Modi in May 2014, ending three decades of hung parliaments and coalition dependency.", "Explains historical watershed of the 2014 elections."),
    ("BJP Foundation April 1980", "The Bharatiya Janata Party (BJP) was founded in its present form in April 1980 in New Delhi, with its first party president being:",
     "Atal Bihari Vajpayee", ["L.K. Advani", "Murli Manohar Joshi", "Dr. Syama Prasad Mookerjee"], "A",
     "Following the split in the Janata Party over the dual membership controversy, former Jana Sangh leaders founded the BJP on 6 April 1980 with Vajpayee as president.", "Identifies Vajpayee as first President of BJP in 1980."),
    ("Gandhian Socialism Early BJP Goal", "In its initial platform in 1980, the newly formed Bharatiya Janata Party adopted which unique socio-economic ideological plank alongside nationalism?",
     "'Gandhian Socialism'", ["Marxist-Leninist Collectivism", "Unregulated Laissez-Faire Capitalism", "Feudal Aristocracy"], "A",
     "To broaden its mass appeal beyond its traditional urban Hindu merchant base, the early BJP officially committed itself to 'Gandhian Socialism'.", "Recalls 'Gandhian Socialism' in early BJP platform.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u15_direct:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u15(make_question(CHAPTER_U15, topic, stem, opts, c, s))

u15_qs = u15_qs[:40]
assert len(u15_qs) == 40, f"Expected 40 questions for Unit 15, got {len(u15_qs)}"
validate_and_collect(u15_qs, u15_seen)
print("Unit 15 validated: 40 unique questions.")

# Save unit files
with open("mock/pol_units/unit14.json", "w", encoding="utf-8") as f:
    json.dump(u14_qs, f, indent=2, ensure_ascii=False)
print("Wrote mock/pol_units/unit14.json (60 questions)")

with open("mock/pol_units/unit15.json", "w", encoding="utf-8") as f:
    json.dump(u15_qs, f, indent=2, ensure_ascii=False)
print("Wrote mock/pol_units/unit15.json (40 questions)")
