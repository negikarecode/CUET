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

CHAPTER = "Colonial Cities, Partition and the Constitution"

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen_texts:
        raise ValueError(f"Duplicate question inside Unit 12: {q['questionText'][:60]}")
    if norm in pyq_set:
        raise ValueError(f"Question matches PYQ: {q['questionText'][:60]}")
    seen_texts.add(norm)
    q["questionNumber"] = len(questions) + 1
    questions.append(q)

print("Generating 40 unique questions for Unit 12: Colonial Cities, Partition & Constitution...")

# --- 1. Colonial Cities (Theme 12) ---

opts, corr, sol = rotate_options(
    "Madras, Calcutta, and Bombay",
    ["Delhi, Agra, and Lahore", "Surat, Masulipatnam, and Calicut", "Ahmedabad, Kanpur, and Pune"],
    "A",
    "1. The three principal colonial port cities that grew into administrative and commercial centers of British power were the presidency capitals: Madras, Calcutta, and Bombay.\nHence, Option {{CORR}} is correct.",
    "Identifies Madras, Calcutta, and Bombay as Presidency cities."
)
add_q(make_question(CHAPTER, "Colonial Presidency Cities", "Which three coastal trading settlements established by the East India Company grew into the premier Presidency capitals of British India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Fort St. George in Madras and Fort William in Calcutta",
    ["Fort St. Angelo and Fort Emmanuel", "Red Fort and Agra Fort", "Gwalior Fort and Golconda Fort"],
    "B",
    "1. The British built Fort St. George in Madras (1639) and Fort William in Calcutta (1696/1757) as fortified administrative compounds enclosing the 'White Town'.\nHence, Option {{CORR}} is correct.",
    "Identifies Fort St. George and Fort William."
)
add_q(make_question(CHAPTER, "Fortified Settlements", "Which two historic colonial forts formed the nucleus of British settlement and military defence in Madras and Calcutta respectively?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The 'White Town' was the fortified European quarter with wide roads and barracks, while the 'Black Town' was the native Indian residential and commercial area outside",
    ["The 'White Town' was built of white marble, while the 'Black Town' was built of black basalt", "The 'White Town' was for naval officers, while the 'Black Town' was for cavalry", "The 'White Town' was in London, while the 'Black Town' was in India"],
    "C",
    "1. Colonial cities were segregated along racial lines: Europeans resided in the spacious, sanitized 'White Town' inside or near forts, while Indians lived in the congested 'Black Town'.\nHence, Option {{CORR}} is correct.",
    "Distinguishes White Town and Black Town."
)
add_q(make_question(CHAPTER, "Urban Segregation", "How did British colonial planning delineate racial and spatial segregation in port cities like Madras and Calcutta?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Victoria Terminus (VT) in Bombay, designed by F.W. Stevens",
    ["Gateway of India", "Bombay Town Hall", "Taj Mahal Hotel"],
    "D",
    "1. Victoria Terminus (now Chhatrapati Shivaji Maharaj Terminus), designed by F.W. Stevens in the Neo-Gothic style with pointed arches and ribbed vaults, was completed in 1888.\nHence, Option {{CORR}} is correct.",
    "Identifies Victoria Terminus as Neo-Gothic architecture."
)
add_q(make_question(CHAPTER, "Neo-Gothic Architecture", "Which monumental railway station in Bombay, designed by F.W. Stevens with pointed arches and elaborate stone vaults, is the finest exemplar of Victorian Neo-Gothic architecture?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Indo-Saracenic style, blending Indian architectural motifs (domes, chhatris, jalis) with European structural frameworks",
    ["Pure Classical Greek Doric style", "Modern Bauhaus functionalist style", "Ancient Egyptian obelisk style"],
    "A",
    "1. The Indo-Saracenic architectural style combined traditional Indian features like domes, chhatris, and cusped arches with European masonry, as seen in the Gateway of India.\nHence, Option {{CORR}} is correct.",
    "Defines Indo-Saracenic architectural style."
)
add_q(make_question(CHAPTER, "Indo-Saracenic Architecture", "What architectural style, prominently showcased in the Gateway of India and the Taj Mahal Hotel, creatively synthesized Hindu and Islamic domes and chhatris with European arches?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Gateway of India in Bombay, designed by George Wittet",
    ["Victoria Memorial in Calcutta", "Chepauk Palace in Madras", "India Gate in New Delhi"],
    "B",
    "1. The Gateway of India was designed by George Wittet in the Indo-Saracenic style to commemorate the visit of King George V and Queen Mary to India in December 1911.\nHence, Option {{CORR}} is correct.",
    "Identifies Gateway of India built for George V."
)
add_q(make_question(CHAPTER, "Gateway of India", "Which iconic Indo-Saracenic monument in Bombay was designed by architect George Wittet to commemorate the royal visit of King George V and Queen Mary in 1911?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Shimla, designated the official summer capital of British India in 1864 by Sir John Lawrence",
    ["Darjeeling", "Mount Abu", "Ootacamund (Ooty)"],
    "C",
    "1. Shimla, founded during the Gurkha War (1815–16), became the official summer capital of the Government of India under Viceroy Sir John Lawrence in 1864.\nHence, Option {{CORR}} is correct.",
    "Identifies Shimla as official summer capital in 1864."
)
add_q(make_question(CHAPTER, "Colonial Hill Stations", "Which Himalayan hill station was established during the Gurkha War and formally designated the official summer capital of British India in 1864?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "1881",
    ["1858", "1872", "1901"],
    "D",
    "1. Although the first non-synchronous census was initiated in 1872, the first regular decennial all-India census was systematically conducted in 1881.\nHence, Option {{CORR}} is correct.",
    "Identifies 1881 as first regular decennial census."
)
add_q(make_question(CHAPTER, "Colonial Census", "From which year onward was the systematic, regular all-India decennial census conducted across British India, institutionalizing demographic data collection?", opts, corr, sol))

# --- 2. Understanding Partition (Theme 14) ---

opts, corr, sol = rotate_options(
    "Morley-Minto Reforms (Indian Councils Act) of 1909",
    ["Government of India Act of 1858", "Montagu-Chelmsford Reforms of 1919", "Government of India Act of 1935"],
    "A",
    "1. Separate electorates for Muslims were first introduced by the British colonial state through the Morley-Minto Reforms of 1909, creating institutionalized communal constituencies.\nHence, Option {{CORR}} is correct.",
    "Identifies Morley-Minto Reforms 1909 introducing separate electorates."
)
add_q(make_question(CHAPTER, "Separate Electorates", "Under which landmark colonial constitutional reform were separate communal electorates for Muslims first introduced in British India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Congress rejected the Muslim League's proposal to form a joint coalition government in the province",
    ["The Muslim League won every single seat in the province", "The Governor suspended the provincial legislative assembly", "The two parties jointly passed a resolution for partition"],
    "B",
    "1. In the United Provinces in 1937, the Congress refused to accept the Muslim League's proposal to form a joint coalition cabinet, widening the rift between the two parties.\nHence, Option {{CORR}} is correct.",
    "Explains UP coalition rejection in 1937."
)
add_q(make_question(CHAPTER, "The 1937 Elections Fallout", "What political decision by the Congress in the United Provinces after the 1937 elections deeply embittered Muhammad Ali Jinnah and the Muslim League?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A.K. Fazlul Huq",
    ["Muhammad Ali Jinnah", "Liaquat Ali Khan", "Sikandar Hayat Khan"],
    "C",
    "1. The famous Lahore Resolution of 23 March 1940 (the Pakistan Resolution) was drafted and formally moved in the Muslim League session by Bengal Premier A.K. Fazlul Huq.\nHence, Option {{CORR}} is correct.",
    "Identifies A.K. Fazlul Huq moving Lahore Resolution."
)
add_q(make_question(CHAPTER, "Lahore Resolution 1940", "Which prominent Bengali leader formally moved the historic Lahore Resolution at the Muslim League's annual session in March 1940?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Great Calcutta Killings",
    ["Jallianwala Bagh tragedy", "Chauri Chaura incident", "Rawalpindi massacre"],
    "D",
    "1. The communal violence unleashed on Direct Action Day (16 August 1946) in Calcutta resulted in thousands of deaths and is historically known as the 'Great Calcutta Killings'.\nHence, Option {{CORR}} is correct.",
    "Identifies Great Calcutta Killings on Direct Action Day."
)
add_q(make_question(CHAPTER, "Direct Action Day Aftermath", "What gruesome historical name is given to the catastrophic multi-day communal butchery that broke out in Calcutta on 16 August 1946?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Saadat Hasan Manto",
    ["Faiz Ahmad Faiz", "Ismat Chughtai", "Amrita Pritam"],
    "A",
    "1. Renowned Urdu writer Saadat Hasan Manto captured the madness and tragedy of Partition through his immortal short story 'Toba Tek Singh', set in an asylum.\nHence, Option {{CORR}} is correct.",
    "Identifies Saadat Hasan Manto's Toba Tek Singh."
)
add_q(make_question(CHAPTER, "Partition Literature", "Which celebrated Urdu writer captured the psychological trauma and absurdity of the 1947 Partition in his iconic masterpiece 'Toba Tek Singh'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Amrita Pritam",
    ["Mahadevi Varma", "Sarojini Naidu", "Krishna Sobti"],
    "B",
    "1. Punjabi poetess Amrita Pritam composed the deeply poignant lament 'Ajj Aakhaan Waris Shah Nu' (Today I call upon Waris Shah), evoking the agony of Punjab's women during Partition.\nHence, Option {{CORR}} is correct.",
    "Identifies Amrita Pritam authoring Ajj Aakhaan Waris Shah Nu."
)
add_q(make_question(CHAPTER, "Partition Poetry", "Which legendary Punjabi poetess invoked the 18th-century mystic poet Waris Shah in her heart-rending poem 'Ajj Aakhaan Waris Shah Nu' mourning the partition of Punjab?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Over ten to fifteen million people were displaced across borders, and around one to two million were killed",
    ["Zero casualties occurred because migration was purely voluntary and peaceful", "All refugees were immediately provided permanent modern housing within a month", "Only British soldiers were killed during the migration"],
    "C",
    "1. Partition produced one of the greatest forced migrations in human history: between 10 to 15 million people were uprooted and an estimated 1 to 2 million perished in communal slaughter.\nHence, Option {{CORR}} is correct.",
    "States human scale of Partition displacement and mortality."
)
add_q(make_question(CHAPTER, "Scale of Partition Catastrophe", "What was the estimated human scale of displacement and mortality resulting from the chaotic 1947 Partition of India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The Central Recovery Operation undertaken jointly by the governments of India and Pakistan",
    ["The Radcliffe Border Patrol", "The Mountbatten Resettlement Scheme", "The Red Cross Evacuation Convoy"],
    "D",
    "1. Following the widespread abduction of an estimated 75,000 women during Partition, both governments organized the 'Central Recovery Operation' to trace and repatriate abducted women.\nHence, Option {{CORR}} is correct.",
    "Identifies Central Recovery Operation for abducted women."
)
add_q(make_question(CHAPTER, "Abducted Women", "What official bilateral state initiative was launched by India and Pakistan in late 1947 to recover and repatriate thousands of women abducted during communal violence?", opts, corr, sol))

# --- 3. Framing the Constitution (Theme 15) ---

opts, corr, sol = rotate_options(
    "9 December 1946",
    ["15 August 1947", "26 January 1950", "26 November 1949"],
    "A",
    "1. The Constituent Assembly of India held its inaugural historic meeting on 9 December 1946 in the Constitution Hall (now Central Hall of Parliament) in New Delhi.\nHence, Option {{CORR}} is correct.",
    "Identifies first meeting of Constituent Assembly on 9 December 1946."
)
add_q(make_question(CHAPTER, "Constituent Assembly", "On which historic date did the Constituent Assembly of India convene its very first official sitting in New Delhi?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Dr. Rajendra Prasad",
    ["Dr. B.R. Ambedkar", "Dr. Sachchidananda Sinha", "Jawaharlal Nehru"],
    "B",
    "1. While Dr. Sachchidananda Sinha served as the temporary interim president, Dr. Rajendra Prasad was elected permanent President of the Constituent Assembly on 11 December 1946.\nHence, Option {{CORR}} is correct.",
    "Identifies Dr. Rajendra Prasad as permanent President."
)
add_q(make_question(CHAPTER, "Assembly Leadership", "Who was unanimously elected as the permanent President of the Constituent Assembly of India on 11 December 1946?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Dr. B.R. Ambedkar",
    ["Sir B.N. Rau", "Dr. Rajendra Prasad", "K.M. Munshi"],
    "C",
    "1. Dr. B.R. Ambedkar served as the Chairman of the seven-member Drafting Committee, playing the architectonic role in crafting the constitutional provisions.\nHence, Option {{CORR}} is correct.",
    "Identifies Dr. B.R. Ambedkar as Drafting Committee Chairman."
)
add_q(make_question(CHAPTER, "Drafting Committee", "Who served as the Chairman of the Drafting Committee of the Constituent Assembly, earning the revered title 'Father of the Indian Constitution'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sir B.N. Rau",
    ["S.N. Mukherjee", "K.M. Munshi", "Alladi Krishnaswami Ayyar"],
    "D",
    "1. Sir Benegal Narsing Rau (B.N. Rau) was the Constitutional Advisor to the Assembly who prepared the initial draft based on extensive global comparative studies.\nHence, Option {{CORR}} is correct.",
    "Identifies Sir B.N. Rau as Constitutional Advisor."
)
add_q(make_question(CHAPTER, "Constitutional Advisor", "Which distinguished civil servant and jurist was appointed Constitutional Advisor to the Constituent Assembly, preparing the foundational draft of the Constitution?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "S.N. Mukherjee",
    ["Sir B.N. Rau", "H.V.R. Iengar", "Sachchidananda Sinha"],
    "A",
    "1. Dr. B.R. Ambedkar explicitly praised S.N. Mukherjee, the Chief Draughtsman of the Constitution, for his remarkable ability to translate complex political ideas into precise legal language.\nHence, Option {{CORR}} is correct.",
    "Identifies S.N. Mukherjee as Chief Draughtsman."
)
add_q(make_question(CHAPTER, "Chief Draughtsman", "Whom did Dr. B.R. Ambedkar warmly praise in the Assembly for his extraordinary legal clarity and draftsmanship as the Chief Draughtsman of the Constitution?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Objectives Resolution moved on 13 December 1946",
    ["Fundamental Rights Charter of 1947", "Preamble Draft of 1948", "Socialist Manifesto of 1946"],
    "B",
    "1. On 13 December 1946, Jawaharlal Nehru moved the historic 'Objectives Resolution' outlining the philosophical ideals, fundamental values, and democratic architecture of independent India.\nHence, Option {{CORR}} is correct.",
    "Identifies Nehru moving Objectives Resolution on 13 December 1946."
)
add_q(make_question(CHAPTER, "Objectives Resolution", "What momentous constitutional declaration, defining independent India as an 'Independent Sovereign Republic', was moved by Jawaharlal Nehru on 13 December 1946?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Hindustani (a composite blend of Hindi and Urdu widely spoken across north India)",
    ["Pure classical Sanskrit", "English exclusively for all time", "Bengali"],
    "C",
    "1. Mahatma Gandhi fervently pleaded that 'Hindustani'—a multi-cultural, composite idiom blending Hindi and Urdu—should be the national language of free India.\nHence, Option {{CORR}} is correct.",
    "Identifies Gandhi advocating Hindustani."
)
add_q(make_question(CHAPTER, "Language Debate", "Which composite, inclusive language blending Hindi and Urdu did Mahatma Gandhi champion as the ideal national language of independent India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "R.V. Dhulekar",
    ["Shankarrao Deo", "T.A. Ramalingam Chettiar", "Frank Anthony"],
    "D",
    "1. R.V. Dhulekar, a Congressman from the United Provinces, made an aggressive speech in the Assembly demanding that Hindi be declared the national language, asserting that those who did not know Hindi had no right to remain in India.\nHence, Option {{CORR}} is correct.",
    "Identifies R.V. Dhulekar demanding Hindi as national language."
)
add_q(make_question(CHAPTER, "Language Debate", "Which outspoken representative from the United Provinces provoked fiery controversy in the Assembly by aggressively demanding that Hindi in Devanagari script be made the sole national language?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Hindi in the Devanagari script was declared the official language of the Union, with English continuing for official purposes for fifteen years",
    ["Sanskrit was made the compulsory medium of all higher education", "English was completely banned from all government offices immediately", "No official language was designated for the Union"],
    "A",
    "1. The Assembly adopted a compromise formula: Hindi in Devanagari script became the 'official language' (not national language), with English continuing for 15 years for official interstate communication.\nHence, Option {{CORR}} is correct.",
    "Explains the compromise on the official language question."
)
add_q(make_question(CHAPTER, "Official Language Compromise", "What balanced compromise formula was ultimately adopted by the Constituent Assembly to resolve the fierce debate over national language?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sardar Vallabhbhai Patel and Govind Ballabh Pant",
    ["Dr. B.R. Ambedkar and Jawaharlal Nehru", "Begum Aizaz Rasul and K.M. Munshi", "Maulana Azad and Rafi Ahmed Kidwai"],
    "B",
    "1. Sardar Vallabhbhai Patel and Govind Ballabh Pant forcefully argued that separate electorates had permanently divided communities and culminated in the tragedy of Partition, warning that they had no place in a unified nation.\nHence, Option {{CORR}} is correct.",
    "Identifies Patel and Pant opposing separate electorates."
)
add_q(make_question(CHAPTER, "Debate on Separate Electorates", "Which national leaders led the forceful intellectual argument in the Assembly that separate electorates were a poison that had caused Partition and must be eliminated?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Begum Aizaz Rasul",
    ["Hansa Mehta", "Amrit Kaur", "Dakshayani Velayudhan"],
    "C",
    "1. Begum Aizaz Rasul, a prominent Muslim member from the UP, courageously declared that separate electorates were self-destructive for minorities, isolating them from the national mainstream.\nHence, Option {{CORR}} is correct.",
    "Identifies Begum Aizaz Rasul opposing separate electorates."
)
add_q(make_question(CHAPTER, "Minority Perspectives", "Which prominent Muslim nationalist woman member in the Constituent Assembly strongly opposed separate electorates as being suicidal for minority communities?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "K. Santhanam",
    ["N. Gopalaswami Ayyangar", "Alladi Krishnaswami Ayyar", "Dr. B.R. Ambedkar"],
    "D",
    "1. K. Santhanam from Madras passionately defended provincial autonomy, warning that overburdening the Centre with responsibilities and financially starving states would lead to systemic collapse.\nHence, Option {{CORR}} is correct.",
    "Identifies K. Santhanam defending states' financial rights."
)
add_q(make_question(CHAPTER, "Federalism Debates", "Which member from Madras presciently argued in the Assembly that a financially crippled provincial government would weaken rather than strengthen the Centre?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Three legislative lists: Union List, State List, and Concurrent List",
    ["Two lists: Imperial List and Colonial List", "A single unified code of central statutes", "Ten regional lists administered by Governors"],
    "A",
    "1. The Constitution established a robust federal framework with three legislative lists: Union List (central exclusive), State List (provincial exclusive), and Concurrent List (shared jurisdiction).\nHence, Option {{CORR}} is correct.",
    "Identifies the three legislative lists."
)
add_q(make_question(CHAPTER, "Division of Powers", "Under what tripartite constitutional structure did the Constituent Assembly allocate legislative powers between the Union government and the States?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Article 17",
    ["Article 14", "Article 19", "Article 21"],
    "B",
    "1. Article 17 of the Indian Constitution unequivocally abolished the practice of 'Untouchability' and forbade its practice in any form, making it a punishable offense.\nHence, Option {{CORR}} is correct.",
    "Identifies Article 17 abolishing Untouchability."
)
add_q(make_question(CHAPTER, "Abolition of Untouchability", "Under which historic Article of the Indian Constitution was the age-old practice of 'Untouchability' formally abolished and made a punishable crime?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "26 November 1949",
    ["15 August 1947", "26 January 1950", "30 January 1948"],
    "C",
    "1. The Constituent Assembly formally adopted and enacted the Constitution of India on 26 November 1949, when members affixed their signatures to the sacred document.\nHence, Option {{CORR}} is correct.",
    "Identifies 26 November 1949 as adoption of Constitution."
)
add_q(make_question(CHAPTER, "Adoption of Constitution", "On which historic date did the Constituent Assembly of India formally adopt, enact, and give to themselves the Constitution of India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "26 January 1950, to commemorate the 1930 Poorna Swaraj pledge",
    ["15 August 1950", "2 October 1950", "1 January 1950"],
    "D",
    "1. Although adopted in November 1949, the Constitution came into full legal force on 26 January 1950 to honor the anniversary of the 1930 Poorna Swaraj declaration.\nHence, Option {{CORR}} is correct.",
    "Explains why 26 January was chosen as Republic Day."
)
add_q(make_question(CHAPTER, "Republic Day Significance", "Why was 26 January 1950 specifically chosen as the momentous date for the Constitution of India to come into full legal effect?", opts, corr, sol))

# --- 4. Statement & Assertion Questions ---

add_q(make_statement_question(
    CHAPTER, "Constituent Assembly Composition",
    "The members of the Constituent Assembly were chosen by direct adult franchise where all Indian citizens voted.",
    "Members of the Constituent Assembly were elected indirectly by the members of the Provincial Legislative Assemblies established under the 1935 Act.",
    4,
    "A",
    "1. Statement I is incorrect: The Assembly was not elected through universal adult franchise.\n2. Statement II is correct: Members were elected indirectly by provincial legislatures under restricted franchise.\nHence, Statement I is incorrect but Statement II is correct.",
    "Clarifies indirect election of the Constituent Assembly."
))

add_q(make_statement_question(
    CHAPTER, "Colonial Urban Fortifications",
    "Following the 1857 Revolt, British colonial town planning placed overwhelming emphasis on defensive security, spacious parade grounds, and sanitised civil lines separated from native quarters.",
    "British authorities completely demolished all fortifications in Calcutta and Bombay after 1857 to encourage open racial integration.",
    3,
    "B",
    "1. Statement I is correct: 1857 stimulated military town planning, open firing fields around forts, and segregated cantonments.\n2. Statement II is incorrect: The British reinforced segregation and built new civil lines rather than integrating populations.",
    "Analyzes colonial urban planning after the 1857 Revolt."
))

add_q(make_assertion_question(
    CHAPTER, "A Strong Central Government",
    "The framers of the Indian Constitution deliberately created a Constitution with a powerful, dominant Central government.",
    "The traumatic horrors of the 1857 Revolt and the 1947 Partition convinced leaders like Nehru and Ambedkar that a weak Centre would lead to national disintegration and chaotic civil chaos.",
    1,
    "A",
    "1. Assertion (A) is true: The Constitution vests overriding emergency and financial powers in the Centre.\n2. Reason (R) is true: The fresh memory of Partition made national unity and territorial integrity the foremost priority.\n3. Reason (R) directly explains Assertion (A).",
    "Explains why the Constituent Assembly favored a strong Centre."
))

add_q(make_assertion_question(
    CHAPTER, "Oral History and Partition",
    "Oral historical narratives and personal testimonies have emerged as an invaluable source for understanding the human trauma of Partition.",
    "Official government records and diplomatic dispatches focused predominantly on boundary demarcations and high politics, largely ignoring the lived experiences, suffering, and memory of ordinary survivors.",
    1,
    "A",
    "1. Assertion (A) is true: Oral histories have enriched our understanding of the tragedy beyond statistics.\n2. Reason (R) is true: State archives record political agreements, while oral history captures personal agony and trauma.\n3. Reason (R) directly explains Assertion (A).",
    "Evaluates the vital methodological role of oral history in Partition studies."
))

# --- 5. Match and Sequence Questions ---

add_q(make_match_question(
    CHAPTER, "Architectural Styles of Colonial Bombay",
    "Match the colonial building in List I with its architectural style in List II:",
    [
        ("A", "Victoria Terminus"),
        ("B", "Bombay Town Hall"),
        ("C", "Gateway of India"),
        ("D", "Rajabai Tower")
    ],
    [
        ("i", "Neo-Classical (Greco-Roman) style"),
        ("ii", "Victorian Neo-Gothic style"),
        ("iii", "Indo-Saracenic hybrid style"),
        ("iv", "Venetian Gothic campanile style")
    ],
    "A-ii, B-i, C-iii, D-iv",
    "C",
    "1. Victoria Terminus = Neo-Gothic (A-ii), Bombay Town Hall = Neo-Classical (B-i), Gateway of India = Indo-Saracenic (C-iii), Rajabai Tower = Venetian Gothic (D-iv).",
    "Matches colonial monuments with architectural styles."
))

add_q(make_match_question(
    CHAPTER, "Key Figures of the Constituent Assembly",
    "Match the Constituent Assembly leader in List I with their historic contribution in List II:",
    [
        ("A", "Dr. B.R. Ambedkar"),
        ("B", "Jawaharlal Nehru"),
        ("C", "Dr. Rajendra Prasad"),
        ("D", "Sir B.N. Rau")
    ],
    [
        ("i", "Moved the Objectives Resolution on 13 December 1946"),
        ("ii", "Chairman of the Drafting Committee"),
        ("iii", "Constitutional Advisor to the Assembly"),
        ("iv", "Permanent President of the Constituent Assembly")
    ],
    "A-ii, B-i, C-iv, D-iii",
    "D",
    "1. Ambedkar = Drafting Committee (A-ii), Nehru = Objectives Resolution (B-i), Rajendra Prasad = President (C-iv), B.N. Rau = Constitutional Advisor (D-iii).",
    "Matches Constituent Assembly leaders with their roles."
))

add_q(make_sequence_question(
    CHAPTER, "Steps in Framing the Constitution",
    "Arrange the following milestones in the making of the Indian Constitution in chronological sequence:\nI. First inaugural sitting of the Constituent Assembly\nII. Jawaharlal Nehru moves the Objectives Resolution\nIII. Constituent Assembly formally adopts and enacts the Constitution\nIV. The Constitution of India comes into full legal force",
    [
        ("A", "I"),
        ("B", "II"),
        ("C", "III"),
        ("D", "IV")
    ],
    "A, B, C, D",
    "A",
    "1. Chronology: First sitting (9 Dec 1946) -> Objectives Resolution (13 Dec 1946) -> Constitution adopted (26 Nov 1949) -> Full enforcement (26 Jan 1950).",
    "Orders the constitutional making process chronologically."
))

add_q(make_sequence_question(
    CHAPTER, "Colonial Architecture Milestones",
    "Arrange the construction/founding of the following colonial monuments and institutions in chronological order:\nI. Founding of Fort St. George in Madras\nII. Construction of Bombay Town Hall in Neo-Classical style\nIII. Completion of Victoria Terminus (VT) in Neo-Gothic style\nIV. Construction of the Gateway of India in Indo-Saracenic style",
    [
        ("A", "I"),
        ("B", "II"),
        ("C", "III"),
        ("D", "IV")
    ],
    "A, B, C, D",
    "A",
    "1. Chronology: Fort St. George (1639) -> Bombay Town Hall (1833) -> Victoria Terminus (1888) -> Gateway of India (1911/1924).",
    "Orders colonial architectural monuments chronologically."
))

# Verification of Unit 12
print(f"Total questions generated for Unit 12: {len(questions)}")
assert len(questions) == 40, f"Expected 40 questions, got {len(questions)}"

out_path = "mock/history_units/unit12.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved 40 questions to {out_path}!")
