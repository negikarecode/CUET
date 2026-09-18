import json
import os
import sys

# Ensure local imports work
sys.path.append(os.path.dirname(__file__))
from common import (
    normalize_text,
    get_pyq_normalized_set,
    rotate_options,
    make_question
)

pyq_seen = get_pyq_normalized_set()
global_seen = set()

# Preload all 800 questions from units 1 to 15
for i in range(1, 16):
    p = f"mock/pol_units/unit{i}.json"
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            data = json.load(f)
            for item in data:
                global_seen.add(normalize_text(item.get("questionText", "")))

# Preload 100 questions from passages_part1.json
p1_path = "mock/pol_units/passages_part1.json"
if os.path.exists(p1_path):
    with open(p1_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        for item in data:
            global_seen.add(normalize_text(item.get("questionText", "")))

print(f"Loaded {len(global_seen)} questions from Units 1-15 and Passages Part 1 into global_seen.")

passages_part2 = []
seen_part2 = set()

def add_p(q):
    norm = normalize_text(q["questionText"])
    if norm in seen_part2:
        raise ValueError(f"Duplicate within passages part 2: {q['questionText'][:80]}")
    if norm in global_seen:
        raise ValueError(f"Cross-mock duplicate: {q['questionText'][:80]}")
    if norm in pyq_seen:
        raise ValueError(f"PYQ duplicate: {q['questionText'][:80]}")
    seen_part2.add(norm)
    global_seen.add(norm)
    assert len(q["options"]) == 4
    assert q["correctOption"] in ["A", "B", "C", "D"]
    assert any(opt["id"] == q["correctOption"] and opt["isCorrect"] for opt in q["options"])
    assert q["detailedSolution"]
    passages_part2.append(q)

def make_pq(chap, topic, p_text, stem, corr_t, wr_t, target_opt, sol_t, mist):
    full_prompt = (
        f"Read the following passage carefully and answer the question that follows:\n\n"
        f"\"{p_text.strip()}\"\n\n"
        f"Question: {stem}"
    )
    opts, c, s = rotate_options(corr_t, wr_t, target_opt, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    return {
        "chapter": chap,
        "topic": topic,
        "questionText": full_prompt,
        "options": opts,
        "correctOption": c,
        "detailedSolution": s
    }

# =================================================================================================
# PASSAGE 21: Nehru's "Tryst with Destiny" Midnight Address
# =================================================================================================
P21_TEXT = (
    "At the stroke of the midnight hour on 14–15 August 1947, as the world slept, India awoke to life and freedom. "
    "Addressing the special midnight session of the Constituent Assembly in New Delhi, Jawaharlal Nehru delivered his "
    "immortal 'Tryst with Destiny' speech, heralding the dawn of an independent nation. Nehru proclaimed that freedom and power "
    "bring responsibility—a responsibility resting upon the assembly representing the sovereign people of India. "
    "He emphasized that the achievement of political independence was merely a step, an opening of opportunity, to the greater "
    "triumphs that awaited: the ending of poverty, ignorance, disease, and inequality of opportunity. Echoing Mahatma Gandhi, "
    "Nehru declared that the ambition of the greatest man of their generation had been to wipe every tear from every eye. "
    "As long as there were tears and suffering, their redemptive national work would not be complete."
)
P21_CHAP = "Challenges of Nation Building"

add_p(make_pq(P21_CHAP, "Tryst with Destiny Forum", P21_TEXT,
    "Jawaharlal Nehru delivered his historic 'Tryst with Destiny' speech at the midnight hour of 14-15 August 1947 addressing which august forum?",
    "The Constituent Assembly of India in New Delhi",
    ["The United Nations General Assembly in New York", "The British Parliament in London", "A mass rally at the Red Fort"],
    "A", "Nehru addressed the Constituent Assembly in the Central Hall of Parliament at midnight on 14-15 August 1947.", "Identifies Constituent Assembly as venue."))

add_p(make_pq(P21_CHAP, "Greatest Ambition Quotation", P21_TEXT,
    "In his midnight address, whose ambition to 'wipe every tear from every eye' did Jawaharlal Nehru invoke as the guiding mission of independent India?",
    "Mahatma Gandhi", ["Sardar Vallabhbhai Patel", "Dr. B.R. Ambedkar", "Rabindranath Tagore"],
    "B", "Nehru cited Mahatma Gandhi's supreme humanitarian ambition to eliminate all suffering and wipe every tear.", "Identifies Mahatma Gandhi's moral ambition."))

add_p(make_pq(P21_CHAP, "Core Tasks Ahead of Independent India", P21_TEXT,
    "According to Nehru's speech, what were the supreme socio-economic tasks confronting the newly liberated Indian republic?",
    "The ending of poverty, ignorance, disease, and inequality of opportunity",
    ["The immediate military conquest of neighbouring foreign territories", "The abolition of all private farming and domestic trade", "The compulsory imposition of a single universal religion"],
    "C", "Nehru emphasized eradicating mass poverty, illiteracy, disease, and social inequalities through democratic nation-building.", "Outlines foundational goals in Tryst with Destiny."))

add_p(make_pq(P21_CHAP, "Freedom and Responsibility Nexus", P21_TEXT,
    "What core philosophical principle regarding sovereign power did Nehru articulate in the opening passages of his address?",
    "That freedom and power inevitably bring responsibility to serve the sovereign people of India",
    ["That freedom grants the executive unconditional immunity from judicial laws", "That power should be exercised without accountability to the public", "That independence requires eliminating all opposition political parties"],
    "D", "Nehru asserted that sovereign independence imposes a solemn responsibility upon elected representatives.", "Explains the nexus between freedom and responsibility."))

add_p(make_pq(P21_CHAP, "Two Foundational Goals of 1947", P21_TEXT,
    "Almost everyone in the Indian national movement was agreed on two fundamental goals upon attaining independence: democratic governance and:",
    "A government run for the good of all, especially the poor and socially disadvantaged sections",
    ["A capitalist laissez-faire regime without government welfare", "A hereditary military council governing the provinces", "The complete isolation of India from international diplomacy"],
    "A", "The twin national consensus was democratic governance and governance oriented toward the welfare of the poor.", "Identifies twin national goals at independence."))


# =================================================================================================
# PASSAGE 22: The Trauma and Tragedy of the 1947 Partition
# =================================================================================================
P22_TEXT = (
    "The year 1947 was a time of unprecedented freedom, but it was also a year of colossal violence, displacement, and trauma. "
    "The partition of British India into two independent dominions—India and Pakistan—unleashed one of the largest, most abrupt, "
    "and most tragic transfers of human population in recorded history. Nearly 80 lakh people were forced to abandon their ancestral homes "
    "and migrate across newly drawn borders under harrowing conditions. Communal killings engulfed Punjab, Bengal, Delhi, and Bihar. "
    "Between 5 to 10 lakh people lost their lives in sectarian slaughter. Women suffered unspeakable atrocities: an estimated 75,000 women "
    "were abducted on both sides of the border, raped, and forcibly converted or married. Countless families were broken, children "
    "orphaned, and refugees spent years languishing in squalid makeshift relief camps, transforming partition into an indelible psychological scar."
)
P22_CHAP = "Challenges of Nation Building"

add_p(make_pq(P22_CHAP, "Partition Population Displaced", P22_TEXT,
    "Approximately how many people were uprooted and forced to migrate across the newly created international borders during the 1947 Partition?",
    "Around 80 lakh (8 million) people", ["Less than 50,000 people", "Over 5 crore people", "Exactly 10 lakh people"],
    "A", "Historians estimate that roughly 8 million (80 lakh) individuals crossed the borders during the Partition of 1947.", "Recalls 80 lakh displaced during Partition."))

add_p(make_pq(P22_CHAP, "Estimated Casualties Partition", P22_TEXT,
    "Historical scholarship estimates that how many people were killed in the sectarian massacres accompanying the 1947 Partition?",
    "Between 5 to 10 lakh (500,000 to 1,000,000) people", ["Fewer than 1,000 people", "Over 10 million people", "Exactly 10,000 people"],
    "B", "Between 500,000 and 1 million lives were lost during the communal slaughter across Punjab, Bengal, and elsewhere.", "Recalls estimated casualty figures of Partition."))

add_p(make_pq(P22_CHAP, "Atrocities against Women 1947", P22_TEXT,
    "Approximately how many women were abducted, subjected to sexual violence, and forcibly converted or married on both sides during the Partition?",
    "Around 75,000 women", ["Less than 500 women", "Over 2 million women", "Exactly 5,000 women"],
    "C", "Historical records document that around 75,000 women were abducted and subjected to trauma across both new nations.", "Recalls estimated 75,000 abducted women in Partition."))

add_p(make_pq(P22_CHAP, "Provinces Most Severely Partitioned", P22_TEXT,
    "The territorial partition of British India was uniquely traumatic because it required the bifurcation of which two deeply mixed populous provinces?",
    "Punjab and Bengal", ["Gujarat and Maharashtra", "Madras and Bombay", "Assam and Orissa"],
    "D", "Punjab in the west and Bengal in the east had deeply intermixed Hindu, Muslim, and Sikh populations and had to be bifurcated.", "Identifies Punjab and Bengal as bifurcated provinces."))

add_p(make_pq(P22_CHAP, "Two-Nation Theory Author", P22_TEXT,
    "The ideological justification for the creation of Pakistan through Partition was advanced under the 'Two-Nation Theory' formulated by:",
    "The All-India Muslim League led by Muhammad Ali Jinnah",
    ["The Indian National Congress led by Mahatma Gandhi", "The Communist Party of India led by P.C. Joshi", "The Shiromani Akali Dal led by Master Tara Singh"],
    "A", "The Muslim League asserted that Hindus and Muslims constituted two separate nations demanding separate homelands.", "Identifies Muslim League advancing Two-Nation Theory."))


# =================================================================================================
# PASSAGE 23: Sardar Patel and the Integration of Princely States
# =================================================================================================
P23_TEXT = (
    "On the eve of Indian independence, the British Crown announced the lapse of paramountcy, meaning that 565 princely states "
    "became legally independent and were free to join either India or Pakistan, or remain independent sovereign entities. "
    "This posed a mortal danger to the unity and territorial integrity of India, threatening to fragment the subcontinent into "
    "dozens of small kingdoms. The monumental task of integrating these heterogeneous principalities fell upon the iron shoulders "
    "of Deputy Prime Minister and Home Minister Sardar Vallabhbhai Patel, ably assisted by Secretary V.P. Menon. "
    "Employing a masterful combination of diplomatic persuasion, historical vision, and firm resolve, Patel negotiated with "
    "the rulers. Most signed the 'Instrument of Accession', surrendering defence, foreign affairs, and communications to the Union. "
    "Through tactical brilliance and decisive actions in recalcitrant states like Junagadh, Hyderabad (Operation Polo), and Manipur, "
    "Patel unified India without bloodshed, forging the modern political map of the republic."
)
P23_CHAP = "Challenges of Nation Building"

add_p(make_pq(P23_CHAP, "Number of Princely States 1947", P23_TEXT,
    "At the time of British withdrawal in August 1947, how many semi-autonomous princely states existed across the Indian subcontinent?",
    "565 princely states", ["100 princely states", "50 princely states", "Over 1,200 princely states"],
    "A", "There were 565 princely states covering roughly 40% of the land area and one-third of the population of British India.", "Recalls 565 princely states in 1947."))

add_p(make_pq(P23_CHAP, "Patel Chief Administrative Collaborator", P23_TEXT,
    "Which distinguished senior civil servant served as the Secretary of the Ministry of States, working alongside Sardar Patel to integrate princely states?",
    "V.P. Menon", ["Sukumar Sen", "Sir B.N. Rau", "P.C. Mahalanobis"],
    "B", "V.P. Menon was the brilliant civil servant who drafted the Instrument of Accession and negotiated tirelessly with Patel.", "Identifies V.P. Menon as Patel's chief collaborator."))

add_p(make_pq(P23_CHAP, "Instrument of Accession Surrendered Subjects", P23_TEXT,
    "By signing the standard 'Instrument of Accession', princely rulers agreed to transfer jurisdiction to the Indian Union over which three vital subjects?",
    "Defence, External Affairs (Foreign Affairs), and Communications",
    ["Police, Agriculture, and Primary Education", "Railways, Income Tax, and Religious Temples", "Forests, Fisheries, and Municipal Sanitation"],
    "C", "Rulers acceded defence, foreign affairs, and communications to the Union while retaining internal autonomy.", "Lists the three core subjects surrendered under Instrument of Accession."))

add_p(make_pq(P23_CHAP, "Operation Polo Hyderabad 1948", P23_TEXT,
    "In September 1948, the Indian government launched a decisive military police action code-named 'Operation Polo' to integrate which princely state?",
    "Hyderabad", ["Junagadh", "Kashmir", "Travancore"],
    "D", "Operation Polo was the police action launched in September 1948 to end Nizam's rule and integrate Hyderabad.", "Identifies Operation Polo for Hyderabad integration."))

add_p(make_pq(P23_CHAP, "First Princely State Universal Suffrage", P23_TEXT,
    "Which princely state was the first part of India to hold an election based on universal adult franchise in June 1948?",
    "Manipur (under Maharaja Bodhachandra Singh)",
    ["Hyderabad (under the Nizam)", "Junagadh (under the Nawab)", "Gwalior (under Scindia)"],
    "A", "Manipur held legislative assembly elections based on universal adult franchise in June 1948, becoming a constitutional monarchy.", "Identifies Manipur as first to hold universal adult franchise election."))


# =================================================================================================
# PASSAGE 24: Linguistic Reorganisation of States and the SRC
# =================================================================================================
P24_TEXT = (
    "The national movement had promised that once independence was achieved, provinces would be reorganised on a linguistic basis. "
    "However, in the traumatic aftermath of Partition, national leaders, including Nehru and Patel, hesitated, fearing that linguistic "
    "division might foster regionalism and endanger fragile national unity. This hesitation sparked intense unrest in the Telugu-speaking "
    "districts of Madras province. Veteran Gandhian freedom fighter Potti Sriramulu undertook a fast unto death, succumbing on the 56th day "
    "of his hunger strike in December 1952. His martyrdom triggered widespread riots and protests, compelling the central government to "
    "announce the creation of the first linguistic state—Andhra State—in December 1952. The creation of Andhra opened the floodgates for "
    "similar linguistic demands across India. In December 1953, the central government appointed the States Reorganisation Commission (SRC), "
    "headed by Justice Fazal Ali, with K.M. Panikkar and H.N. Kunzru. The SRC recommended redrawing boundaries along linguistic lines, "
    "culminating in the States Reorganisation Act of 1956, which created 14 states and 6 union territories."
)
P24_CHAP = "Challenges of Nation Building"

add_p(make_pq(P24_CHAP, "Potti Sriramulu Martyrdom", P24_TEXT,
    "The martyrdom of veteran Gandhian Potti Sriramulu after a 56-day hunger strike led directly to the creation of which first linguistic state?",
    "Andhra State", ["Kerala", "Karnataka", "Tamil Nadu"],
    "A", "Potti Sriramulu died on 15 December 1952, forcing Nehru to announce the formation of Andhra State.", "Identifies creation of Andhra State following Sriramulu's death."))

add_p(make_pq(P24_CHAP, "States Reorganisation Commission Members", P24_TEXT,
    "The three-member States Reorganisation Commission (SRC) appointed in December 1953 comprised Justice Fazal Ali, H.N. Kunzru, and:",
    "K.M. Panikkar", ["Sardar Vallabhbhai Patel", "Dr. B.R. Ambedkar", "C. Rajagopalachari"],
    "B", "The SRC consisted of Justice Fazal Ali (Chairman), K.M. Panikkar, and H.N. Kunzru.", "Lists members of States Reorganisation Commission."))

add_p(make_pq(P24_CHAP, "States Reorganisation Act 1956 Units", P24_TEXT,
    "The landmark States Reorganisation Act enacted by Parliament in 1956 created how many States and Union Territories?",
    "14 States and 6 Union Territories",
    ["28 States and 8 Union Territories", "50 States and 12 Union Territories", "10 States and 3 Union Territories"],
    "C", "The 1956 Act reorganized India into 14 States and 6 Union Territories based on linguistic principles.", "Recalls 14 states and 6 UTs under 1956 Act."))

add_p(make_pq(P24_CHAP, "Nagpur Congress Resolution 1920", P24_TEXT,
    "The principle of reorganizing administrative units on a linguistic basis had been officially endorsed by the Indian National Congress as early as:",
    "The 1920 Nagpur Congress Session",
    ["The 1885 Bombay Congress Session", "The 1929 Lahore Congress Session", "The 1942 Quit India Session"],
    "D", "The 1920 Nagpur session restructured Provincial Congress Committees along linguistic lines.", "Identifies 1920 Nagpur session endorsing linguistic principle."))

add_p(make_pq(P24_CHAP, "Democratic Impact Linguistic Reorganisation", P24_TEXT,
    "Contrary to initial fears that linguistic states would fracture India, historical experience proved that linguistic reorganisation:",
    "Strengthened national unity and deepened democratic participation by legitimating local languages and vernacular identities",
    ["Caused the immediate territorial disintegration of the republic", "Eliminated all regional cultural celebrations across provinces", "Made English the only language spoken in provincial offices"],
    "A", "Accommodating linguistic identities fortified Indian federalism and broadened democratic ownership.", "Summarizes democratic benefits of linguistic reorganisation."))


# =================================================================================================
# PASSAGE 25: The First General Elections of 1952
# =================================================================================================
P25_TEXT = (
    "Holding India's first general election in 1951–1952 was a monumental gamble and an act of profound democratic faith. "
    "No country of India's size, poverty, and illiteracy had ever attempted universal adult franchise on such an enormous scale. "
    "Western commentators were openly skeptical: an Indian editor called it 'the biggest gamble in history', while a British magazine "
    "claimed that universal suffrage was an absurd dream for an illiterate nation. Chief Election Commissioner Sukumar Sen oversaw "
    "the colossal logistical exercise. Over 17.3 crore eligible voters had to be registered, 85 percent of whom could neither read nor write. "
    "To overcome mass illiteracy, the Election Commission assigned distinctive symbols to candidates and placed separate ballot boxes "
    "for each candidate inside polling booths. The elections, held between October 1951 and February 1952, saw enthusiastic voter turnout, "
    "including millions of women. The fair and peaceful conduct of the polls silenced critics, proving that democracy could flourish "
    "in conditions of poverty and illiteracy."
)
P25_CHAP = "Era of One-Party Dominance"

add_p(make_pq(P25_CHAP, "First CEC Sukumar Sen", P25_TEXT,
    "Who served as India's first Chief Election Commissioner, orchestrating the logistical miracle of the 1951-1952 General Elections?",
    "Sukumar Sen", ["T.N. Seshan", "K.V.K. Sundaram", "Dr. Nagendra Singh"],
    "A", "Sukumar Sen was appointed the first Chief Election Commissioner of India in March 1950.", "Identifies Sukumar Sen as first Chief Election Commissioner."))

add_p(make_pq(P25_CHAP, "First Election Electorate Size", P25_TEXT,
    "Approximately how many citizens were enrolled as eligible voters in India's first general elections of 1951-1952?",
    "Around 17.3 crore (173 million) voters",
    ["Barely 2 crore voters", "Over 50 crore voters", "Less than 10 lakh voters"],
    "B", "The 1951-52 electorate numbered approximately 173 million citizens, of whom over 80% were illiterate.", "Recalls 17.3 crore eligible voters in 1951-52."))

add_p(make_pq(P25_CHAP, "Literacy Rate at First Election", P25_TEXT,
    "What proportion of the Indian electorate was illiterate at the time of the first general elections in 1951-1952?",
    "Approximately 85 percent of voters were illiterate",
    ["Only 10 percent were illiterate", "50 percent were literate", "100 percent were university graduates"],
    "C", "Roughly 85% of eligible voters could neither read nor write, requiring election symbols and innovative ballot boxes.", "Recalls 85% illiteracy of 1951-52 electorate."))

add_p(make_pq(P25_CHAP, "Voting Method Illiterate Citizens", P25_TEXT,
    "How did the Election Commission enable illiterate citizens to cast their secret ballots during the first two general elections?",
    "By assigning distinctive election symbols to each candidate and placing separate ballot boxes for each candidate inside polling booths",
    ["By having police officers mark ballots on behalf of citizens", "By using computerized electronic voting machines with voice recognition", "By testing voters on Sanskrit grammar before issuing ballots"],
    "D", "Voters dropped a blank ballot paper into the sealed steel box bearing the symbol and name of their chosen candidate.", "Explains separate ballot box voting mechanism."))

add_p(make_pq(P25_CHAP, "Significance of 1952 Elections", P25_TEXT,
    "Why is India's first general election considered a landmark milestone in global democratic history?",
    "It proved to a skeptical world that universal adult democracy could be successfully practiced in a poor, developing, and illiterate society",
    ["It proved that only monarchies can govern large multi-ethnic territories", "It established that elections must be conducted exclusively in English", "It showed that multi-party competition leads inevitably to military dictatorships"],
    "A", "The 1952 election demonstrated that democracy was not an exclusive luxury of wealthy Western industrialized states.", "Explains historical significance of 1952 general elections."))


# =================================================================================================
# PASSAGE 26: The Congress "System" as an Umbrella Coalition
# =================================================================================================
P26_TEXT = (
    "In the first three general elections (1952, 1957, and 1962), the Indian National Congress completely dominated the political "
    "landscape at both the national and state levels. Renowned political scientist Rajni Kothari famously characterized this era "
    "as the 'Congress System'. The extraordinary dominance of the Congress was rooted in its historical role as the leader of the "
    "freedom struggle. Having inherited the moral mantle of Mahatma Gandhi and Jawaharlal Nehru, Congress functioned as a broad-based, "
    "accommodative 'umbrella coalition'. It brought together diverse social groups—peasants and industrialists, urban intellectuals "
    "and rural landlords, upper castes and Dalits. Ideologically, it accommodated capitalists, socialists, conservatives, and radicals. "
    "Instead of crushing internal dissent, the Congress institutionalised a network of internal factions that competed and bargained. "
    "These factions functioned as an internal balancing mechanism, allowing Congress to absorb opposition discontent while remaining "
    "firmly in power as both the ruling party and its own internal opposition."
)
P26_CHAP = "Era of One-Party Dominance"

add_p(make_pq(P26_CHAP, "Congress System Coiner", P26_TEXT,
    "Which prominent Indian political scientist formulated the influential conceptual term 'The Congress System' to describe India's early one-party dominance?",
    "Rajni Kothari", ["Ramachandra Guha", "Amartya Sen", "Pratap Bhanu Mehta"],
    "A", "Rajni Kothari coined the term 'Congress System' in 1964 to describe Congress's factional and consensus-based dominance.", "Identifies Rajni Kothari formulating 'Congress System'."))

add_p(make_pq(P26_CHAP, "Social Umbrella Metaphor", P26_TEXT,
    "Why was the early Indian National Congress described by political analysts as an 'accommodative umbrella coalition'?",
    "Because it encompassed diverse, conflicting social classes, castes, and ideological tendencies within its broad fold",
    ["Because party members were required to carry physical umbrellas during monsoon rallies", "Because it refused admission to anyone who was not a feudal aristocrat", "Because it exclusively represented urban commercial traders"],
    "B", "Congress accommodated landlords, peasants, industrialists, Dalits, socialists, and conservatives in a broad centrist tent.", "Explains the 'umbrella coalition' concept."))

add_p(make_pq(P26_CHAP, "Internal Factional Balancing Role", P26_TEXT,
    "How did internal factions within the Congress party function to stabilize its long-term political supremacy?",
    "Factions acted as internal balancing mechanisms, enabling the party to accommodate diverse interests and absorb opposition grievances",
    ["Factions engaged in armed civil war to overthrow the party high command", "Factions expelled all members who disagreed with the party president", "Factions ensured that state elections were cancelled indefinitely"],
    "C", "Internal factional competition allowed the Congress to mediate social conflicts without losing its hold on power.", "Details role of internal factions in the Congress System."))

add_p(make_pq(P26_CHAP, "Congress Popular Vote Share Paradox", P26_TEXT,
    "Under India's First-Past-The-Post (FPTP) electoral system, the Congress won over 70% of Lok Sabha seats in the first three elections with roughly what popular vote share?",
    "Around 45 percent of the popular vote",
    ["Over 95 percent of the popular vote", "Less than 10 percent of the popular vote", "Exactly 100 percent of the popular vote"],
    "D", "Due to a fragmented opposition, Congress secured roughly 75% of parliamentary seats with around 45% of total votes.", "Explains FPTP seat-vote distortion for early Congress."))

add_p(make_pq(P26_CHAP, "Opposition Nature Congress Era", P26_TEXT,
    "What role did opposition political parties play during the era of the 'Congress System' despite their small legislative numbers?",
    "They offered principled ideological critiques, groomed future national leaders, and exerted indirect checks on government policies",
    ["They were legally outlawed and all opposition leaders were imprisoned", "They boycotted all elections and lived in foreign exile", "They commanded the military to dissolve the Parliament"],
    "A", "Opposition parties maintained a vibrant democratic presence, preventing authoritarian complacency within Congress.", "Outlines role of opposition parties in the 1950s."))


# =================================================================================================
# PASSAGE 27: The 1957 Communist Ministry in Kerala
# =================================================================================================
P27_TEXT = (
    "In the Second General Elections of March 1957, Indian democracy witnessed a historic and unprecedented milestone: for the "
    "first time in world history, a Communist party came to power through competitive, multi-party democratic elections. "
    "In the newly formed state of Kerala, the Communist Party of India (CPI) won 60 out of 126 assembly seats and formed the "
    "government with the support of five independent legislators. E.M.S. Namboodiripad was sworn in as the Chief Minister. "
    "The communist government immediately embarked on radical progressive policies, prioritizing comprehensive land reforms "
    "and educational restructuring aimed at curbing private Christian church and Nair community monopolies. These measures sparked "
    "fierce resistance from vested landed interests, the Catholic Church, and the Nair Service Society, who launched a mass "
    "'Liberation Struggle' (Vimochana Samaram). In July 1959, the central Congress government led by Nehru controversially invoked "
    "Article 356 of the Constitution, dismissing the Namboodiripad ministry—marking the first blatant partisan misuse of emergency powers."
)
P27_CHAP = "Era of One-Party Dominance"

add_p(make_pq(P27_CHAP, "Historic 1957 Milestone Kerala", P27_TEXT,
    "The 1957 assembly elections in Kerala achieved global historical significance because:",
    "For the first time anywhere in the world, a Communist party assumed power through democratic multi-party ballot box elections",
    ["The state abolished all taxation and currency", "The British monarch was invited to rule the province", "All political parties merged into a single state apparatus"],
    "A", "The 1957 CPI victory in Kerala was the world's first instance of a communist government elected democratically.", "Identifies historical uniqueness of 1957 Kerala communist victory."))

add_p(make_pq(P27_CHAP, "First Communist Chief Minister", P27_TEXT,
    "Who was sworn in as the first Communist Chief Minister of Kerala heading the historic ministry formed in March 1957?",
    "E.M.S. Namboodiripad", ["A.K. Gopalan", "P. Sundarayya", "C. Achutha Menon"],
    "B", "Elamkulam Manakkal Sankaran (E.M.S.) Namboodiripad headed the first elected communist government in Kerala.", "Identifies E.M.S. Namboodiripad as Chief Minister in 1957."))

add_p(make_pq(P27_CHAP, "Vimochana Samaram Agitation", P27_TEXT,
    "The conservative anti-communist agitation launched against the Namboodiripad ministry's land and education reforms was popularly called:",
    "Vimochana Samaram (Liberation Struggle)",
    ["Navnirman Andolan", "Sampoorna Kranti", "Chipko Andolan"],
    "C", "The Nair Service Society, Catholic Church, and Congress united to wage the 'Vimochana Samaram' (Liberation Struggle).", "Identifies Vimochana Samaram in Kerala."))

add_p(make_pq(P27_CHAP, "Article 356 Dismissal 1959", P27_TEXT,
    "In July 1959, the central government dismissed the democratically elected Kerala government by invoking which controversial constitutional article?",
    "Article 356 (President's Rule)",
    ["Article 370", "Article 352", "Article 360"],
    "D", "The Centre invoked Article 356 in July 1959, dismissing the CPI ministry amidst charges of authoritarian central overreach.", "Identifies Article 356 dismissal of Kerala government in 1959."))

add_p(make_pq(P27_CHAP, "Kerala Communist Land Reforms", P27_TEXT,
    "What was the primary socio-economic reform championed by the 1957 Namboodiripad ministry that enraged traditional landed elites?",
    "Radical land reform legislation granting tenancy rights and security of tenure to peasant agricultural cultivators",
    ["A complete ban on all traditional Ayurvedic medicine", "The privatisation of all coconut groves to foreign multinational firms", "The eviction of all tenant farmers from agricultural land"],
    "A", "The Agrarian Relations Bill introduced revolutionary land ceilings and tenancy rights for landless peasant cultivators.", "Outlines land reforms under 1957 Kerala CPI ministry."))


# =================================================================================================
# PASSAGE 28: P.C. Mahalanobis and the Second Five-Year Plan Model
# =================================================================================================
P28_TEXT = (
    "While the First Five-Year Plan (1951–1956) had focused on agricultural rehabilitation and irrigation dams, the Second Five-Year Plan "
    "(1956–1961) articulated a radical structural shift toward rapid industrialisation, particularly the development of heavy and capital "
    "goods industries. The intellectual architect of the Second Plan was the brilliant statistician and founder of the Indian Statistical "
    "Institute, Prasanta Chandra Mahalanobis. Guided by the Mahalanobis model, the Indian state resolved to occupy the 'commanding heights "
    "of the economy'. The plan emphasized domestic steel plants, heavy machinery, power generation, and railway infrastructure, "
    "largely developed through public sector enterprises. To insulate infant domestic industries from global competition, the government "
    "imposed high tariffs and strict import substitution quotas. While this strategy established an extensive industrial and technological "
    "foundation, it was subsequently criticized for neglecting agriculture, causing food shortages, and breeding an inefficient, bureaucratic "
    "license-permit system."
)
P28_CHAP = "Politics of Planned Development"

add_p(make_pq(P28_CHAP, "Second Plan Architect", P28_TEXT,
    "Who was the chief intellectual architect and statistician behind India's Second Five-Year Plan (1956-1961)?",
    "Prasanta Chandra Mahalanobis", ["K.N. Raj", "J.C. Kumarappa", "Dr. B.R. Ambedkar"],
    "A", "P.C. Mahalanobis, founder of the Indian Statistical Institute (ISI), formulated the Second Plan strategy.", "Identifies P.C. Mahalanobis as architect of Second Plan."))

add_p(make_pq(P28_CHAP, "Second Plan Strategic Focus", P28_TEXT,
    "In sharp contrast to the agriculture-centric First Plan, the Second Five-Year Plan placed primary strategic emphasis on:",
    "Rapid industrialisation with priority on heavy, capital goods, and basic infrastructure industries",
    ["The expansion of luxury foreign passenger car imports", "The complete deregulation of private real estate markets", "The export of raw unrefined petroleum to Europe"],
    "B", "The Second Plan prioritized heavy machinery, steel plants (Bhilai, Rourkela, Durgapur), and power infrastructure.", "Contrasts Second Plan industrial focus with First Plan."))

add_p(make_pq(P28_CHAP, "Import Substitution Strategy", P28_TEXT,
    "Under the Mahalanobis developmental model, how did the state seek to protect infant domestic industries from foreign competition?",
    "By imposing high import tariffs, quantitative trade quotas, and strict import-substitution regulations",
    ["By paying foreign corporations to run domestic factories", "By abolishing all taxes on foreign luxury manufactured imports", "By banning Indian engineers from working in public sector enterprises"],
    "C", "High tariffs and quotas insulated Indian domestic producers from multinational corporate competition.", "Explains import substitution and protectionism in Second Plan."))

add_p(make_pq(P28_CHAP, "Commanding Heights Concept", P28_TEXT,
    "The policy phrase 'commanding heights of the economy' meant that the Indian state would:",
    "Retain exclusive public sector ownership and control over strategic heavy industries, railways, and energy infrastructure",
    ["Construct all government offices at the highest mountain peaks in the Himalayas", "Transfer all national banking assets to foreign private hedge funds", "Abolish the planning commission and let market prices dictate investments"],
    "D", "The state assumed primary responsibility for capital-intensive heavy industries that private capital could not finance.", "Defines 'commanding heights of the economy'."))

add_p(make_pq(P28_CHAP, "Critique of Second Plan", P28_TEXT,
    "What was a major socio-economic critique leveled against the heavy-industry strategy of the Second Five-Year Plan?",
    "It severely neglected agricultural investment and rural development, contributing to acute food crises in the 1960s",
    ["It spent too much national revenue on rural organic horticulture", "It made India completely dependent on foreign agricultural exports", "It caused all university engineering colleges to shut down"],
    "A", "Critics argued that neglecting agriculture forced India into humiliating dependence on US PL-480 foodgrain imports.", "Identifies critique of agricultural neglect in Second Plan."))


# =================================================================================================
# PASSAGE 29: The Green Revolution in Indian Agriculture
# =================================================================================================
P29_TEXT = (
    "In the mid-1960s, India faced an existential food crisis triggered by back-to-back catastrophic droughts, war expenses, "
    "and a humiliating reliance on American food aid under Public Law 480 (PL-480). To escape foreign vulnerability, the government "
    "abandoned its earlier policy of spreading agricultural subsidies evenly across poor regions, adopting instead a focused strategy: "
    "concentrating modern inputs on well-endowed agricultural zones with assured irrigation. Launched in 1966 under Prime Minister "
    "Indira Gandhi, with leadership from Agriculture Minister C. Subramaniam and scientist M.S. Swaminathan, this strategy came to be "
    "known as the 'Green Revolution'. It introduced High Yielding Varieties (HYV) of wheat and rice seeds developed by Norman Borlaug, "
    "combined with chemical fertilizers, pesticides, canal irrigation, and state-guaranteed Minimum Support Prices (MSP). "
    "While the Green Revolution delivered national foodgrain self-sufficiency, it exacerbated regional disparities—concentrating "
    "prosperity in Punjab, Haryana, and Western Uttar Pradesh—and widened the gulf between rich farmers and impoverished landless laborers."
)
P29_CHAP = "Politics of Planned Development"

add_p(make_pq(P29_CHAP, "Green Revolution Key Figures", P29_TEXT,
    "The scientific leadership of India's Green Revolution in introducing High Yielding Variety (HYV) seeds was spearheaded by:",
    "Dr. M.S. Swaminathan", ["Dr. Verghese Kurien", "Homi J. Bhabha", "Vikram Sarabhai"],
    "A", "Dr. M.S. Swaminathan collaborated with Norman Borlaug to adapt dwarf HYV wheat strains to Indian soils.", "Identifies Dr. M.S. Swaminathan leading Green Revolution."))

add_p(make_pq(P29_CHAP, "PL-480 Food Aid Dependency", P29_TEXT,
    "During the acute food crises of the 1960s, India was dangerously dependent on subsidized wheat shipments under which US program?",
    "Public Law 480 (PL-480)", ["Marshall Plan", "Lend-Lease Act", "Point Four Program"],
    "B", "PL-480 food imports from the United States subjected Indian foreign policy to severe diplomatic arm-twisting.", "Identifies US PL-480 food aid program."))

add_p(make_pq(P29_CHAP, "Regions Benefiting Green Revolution", P29_TEXT,
    "The prosperity unleashed by the first phase of the Green Revolution was geographically concentrated primarily in which region?",
    "Punjab, Haryana, and Western Uttar Pradesh",
    ["Bihar, Odisha, and West Bengal", "Kerala, Tamil Nadu, and Karnataka", "Rajasthan, Gujarat, and Madhya Pradesh"],
    "C", "Areas with existing canal irrigation and wealthy farmers—Punjab, Haryana, and Western UP—reaped the maximum gains.", "Identifies regions benefiting from Green Revolution."))

add_p(make_pq(P29_CHAP, "Core Technological Package Green Rev", P29_TEXT,
    "The technological package of the Green Revolution fundamentally depended on which combination of inputs?",
    "High Yielding Variety (HYV) seeds, chemical fertilizers, chemical pesticides, and assured canal/tubewell irrigation",
    ["Traditional organic compost and reliance on dryland monsoon rainfall exclusively", "Genetically modified eucalyptus trees and solar desalination plants", "Aerial seed bombing and manual hand ploughing without fertilizer"],
    "D", "HYV dwarf varieties required intensive chemical fertilizer applications and controlled, predictable water supply.", "Lists technological inputs of Green Revolution."))

add_p(make_pq(P29_CHAP, "Socio-Economic Inequality Fallout", P29_TEXT,
    "What was a profound socio-economic criticism regarding the distributional fallout of the Green Revolution?",
    "It widened the class divide between rich capitalist farmers and impoverished landless laborers, while exacerbating regional imbalances",
    ["It caused the complete collapse of all wheat harvesting across Punjab", "It made India permanently dependent on foodgrain imports from Africa", "It forced all urban citizens to relocate to rural farming villages"],
    "A", "Rich farmers accumulated capital while smallholders were marginalized, creating agrarian polarization and regional disparity.", "Details socio-economic disparities caused by Green Revolution."))


# =================================================================================================
# PASSAGE 30: Tribal Displacement and the Narmada Bachao Andolan
# =================================================================================================
P30_TEXT = (
    "In post-independence India, large river-valley multipurpose dam projects were celebrated by Jawaharlal Nehru as the "
    "'temples of modern India', symbolizing technological mastery and national progress. However, by the 1980s, the human and ecological "
    "costs of mega-dams came under intense scrutiny. The Narmada Valley Development Project, which envisaged the construction of 30 major, "
    "135 medium, and some 3,000 minor dams on the Narmada river flowing through Madhya Pradesh, Gujarat, and Maharashtra, sparked the "
    "longest-running anti-dam movement in modern history: the Narmada Bachao Andolan (NBA). Led by activist Medha Patkar, the NBA "
    "mobilized indigenous tribal (Adivasi) communities, peasants, and environmentalists against the giant Sardar Sarovar Project. "
    "The movement highlighted the catastrophic submergence of forests, the destruction of delicate riverine ecosystems, and the forced "
    "displacement of over 250,000 vulnerable people without adequate, just rehabilitation. The NBA transformed the national debate "
    "from a narrow focus on engineering feats to fundamental questions of human rights, environmental justice, and democratic development."
)
P30_CHAP = "Politics of Planned Development"

add_p(make_pq(P30_CHAP, "Narmada Bachao Andolan Leader", P30_TEXT,
    "The grassroots environmental and human rights movement named Narmada Bachao Andolan (NBA) was founded and led by prominent activist:",
    "Medha Patkar", ["Sundarlal Bahuguna", "Chandi Prasad Bhatt", "Vandana Shiva"],
    "A", "Medha Patkar spearheaded the Narmada Bachao Andolan starting in 1985, defending displaced tribal rights.", "Identifies Medha Patkar leading NBA."))

add_p(make_pq(P30_CHAP, "Temples of Modern India Metaphor", P30_TEXT,
    "Which founding Prime Minister of India famously coined the phrase 'temples of modern India' to celebrate massive dams and steel plants?",
    "Jawaharlal Nehru", ["Sardar Patel", "Lal Bahadur Shastri", "Morarji Desai"],
    "B", "Nehru described giant irrigation dams like Bhakra Nangal as the 'temples of modern India' driving nation-building.", "Recalls Nehru coining 'temples of modern India'."))

add_p(make_pq(P30_CHAP, "Core Human Rights Grievance NBA", P30_TEXT,
    "What was the primary human rights grievance articulated by the NBA against the Sardar Sarovar Project?",
    "The involuntary displacement of over 250,000 indigenous tribals and farmers without comprehensive, just, and dignified rehabilitation",
    ["The refusal of dam authorities to build luxury tourist casinos on the reservoir", "The construction of excessive primary schools along the canal banks", "The requirement that all dam engineers must speak French"],
    "C", "The NBA exposed the state's failure to provide 'land for land' rehabilitation to displaced Adivasi communities.", "Identifies displacement and rehabilitation failure."))

add_p(make_pq(P30_CHAP, "States Traversed by Narmada River", P30_TEXT,
    "The Narmada River and its proposed dam projects traverse across which three Indian states?",
    "Madhya Pradesh, Gujarat, and Maharashtra",
    ["Punjab, Haryana, and Rajasthan", "Bihar, West Bengal, and Assam", "Tamil Nadu, Kerala, and Karnataka"],
    "D", "The Narmada flows through Madhya Pradesh, Maharashtra, and Gujarat into the Arabian Sea.", "Identifies three states sharing Narmada basin."))

add_p(make_pq(P30_CHAP, "Broader Democratic Impact NBA", P30_TEXT,
    "How did the Narmada Bachao Andolan fundamentally transform the discourse on economic development in India?",
    "It shifted the focus from narrow engineering GDP metrics to ethical questions of environmental justice, tribal rights, and participatory democracy",
    ["It proved that all dams should be destroyed using military explosives", "It resulted in a total constitutional ban on electricity generation", "It convinced the government to abandon all agriculture in Gujarat"],
    "A", "The NBA established that genuine development must respect human rights, ecological sustainability, and marginalized communities.", "Summarizes broader impact of NBA."))

# =================================================================================================
# PASSAGE 31: The Non-Aligned Movement and the Bandung Spirit of 1955
# =================================================================================================
P31_TEXT = (
    "In the post-World War II international system, newly decolonised nations in Asia, Africa, and Latin America were confronted "
    "with immense pressure to align with one of the two competing Cold War military blocs headed by the United States and the Soviet Union. "
    "Recognizing that military alignment would compromise their fragile, hard-won sovereignty, visionary leaders formulated the doctrine "
    "of Non-Alignment. The historic Afro-Asian Conference held in Bandung, Indonesia, in April 1955 marked the high-water mark of third-world "
    "solidarity, establishing the 'Bandung Spirit' of anti-colonialism, mutual non-aggression, and economic cooperation. "
    "Six years later, in September 1961, the First Summit of the Non-Aligned Movement (NAM) was convened in Belgrade, Yugoslavia. "
    "NAM was founded by five visionary statesmen: Jawaharlal Nehru of India, Josip Broz Tito of Yugoslavia, Gamal Abdel Nasser of Egypt, "
    "Sukarno of Indonesia, and Kwame Nkrumah of Ghana. Rejecting accusations of neutrality or isolationism, Nehru insisted that non-alignment "
    "was an active, dynamic policy dedicated to mediating Cold War rivalries, preventing nuclear confrontation, and defending global peace."
)
P31_CHAP = "India's External Relations"

add_p(make_pq(P31_CHAP, "Bandung Conference 1955", P31_TEXT,
    "The landmark Afro-Asian Conference that crystallized Third World solidarity and laid the foundation for NAM was convened in 1955 in which city?",
    "Bandung (Indonesia)", ["Belgrade (Yugoslavia)", "Cairo (Egypt)", "New Delhi (India)"],
    "A", "The Bandung Conference was hosted in Indonesia in April 1955, gathering 29 newly independent Afro-Asian states.", "Identifies Bandung, Indonesia as venue of 1955 conference."))

add_p(make_pq(P31_CHAP, "Five Founding Leaders of NAM", P31_TEXT,
    "Which five world leaders are universally recognized as the foundational co-founders of the Non-Aligned Movement?",
    "Jawaharlal Nehru, Josip Broz Tito, Gamal Abdel Nasser, Sukarno, and Kwame Nkrumah",
    ["Winston Churchill, Harry Truman, Joseph Stalin, Charles de Gaulle, and Mao Zedong", "Mahatma Gandhi, Nelson Mandela, Martin Luther King Jr., Che Guevara, and Fidel Castro", "Zhou Enlai, Ho Chi Minh, Kim Il-sung, Pol Pot, and Enver Hoxha"],
    "B", "The five founding fathers were Nehru (India), Tito (Yugoslavia), Nasser (Egypt), Sukarno (Indonesia), and Nkrumah (Ghana).", "Lists the five founding leaders of NAM."))

add_p(make_pq(P31_CHAP, "First NAM Summit 1961", P31_TEXT,
    "Where and in which year was the First Official Summit Conference of the Non-Aligned Movement convened?",
    "Belgrade, Yugoslavia in September 1961 (attended by 25 nations)",
    ["Bandung, Indonesia in April 1955", "Cairo, Egypt in October 1964", "New Delhi, India in March 1983"],
    "C", "The First NAM Summit was held in Belgrade in September 1961 under President Tito, attended by 25 member states.", "Identifies Belgrade 1961 as First NAM Summit."))

add_p(make_pq(P31_CHAP, "Nehru Dynamic Non-Alignment vs Neutrality", P31_TEXT,
    "How did Jawaharlal Nehru distinguish India's policy of Non-Alignment from passive isolationism or traditional Swiss-style neutrality?",
    "He argued that non-alignment was an active, interventionist policy dedicated to mediating global conflicts and defusing Cold War crises",
    ["He stated that India would never express any opinion on international affairs", "He promised that India would secretly join NATO while pretending to be non-aligned", "He declared that India would refuse all commercial diplomatic relations with the world"],
    "D", "Nehru insisted that non-alignment meant dynamic, independent judgment on each issue rather than passivity or isolationism.", "Explains difference between non-alignment and neutrality."))

add_p(make_pq(P31_CHAP, "Panchsheel Agreement 1954", P31_TEXT,
    "The Five Principles of Peaceful Coexistence ('Panchsheel'), which formed the core ideological bedrock of NAM, were first signed between India and:",
    "China (Prime Minister Nehru and Premier Zhou Enlai in April 1954)",
    ["Pakistan (in the Tashkent Agreement 1966)", "The Soviet Union (in the 1971 Friendship Treaty)", "The United States (in the PL-480 accord)"],
    "A", "Panchsheel was signed on 29 April 1954 between Nehru and Zhou Enlai regarding trade and intercourse with Tibet.", "Identifies 1954 Panchsheel agreement with China."))


# =================================================================================================
# PASSAGE 32: The 1962 Sino-Indian Border War and Its Domestic Fallout
# =================================================================================================
P32_TEXT = (
    "Relations between independent India and the People's Republic of China began with great warmth, celebrated in the popular "
    "slogan 'Hindi-Chini Bhai-Bhai'. However, this bonhomie was shattered by two irreconcilable disputes: China's military annexation "
    "of Tibet in 1950 and the protracted boundary dispute. Tensions escalated dramatically in March 1959 when India granted political "
    "asylum to the Dalai Lama and thousands of Tibetan refugees in McLeod Ganj, Dharamshala—an act Beijing denounced as hostile interference. "
    "The boundary conflict centered on two disputed sectors: Aksai Chin in the western sector (Ladakh), where China secretly built a strategic "
    "military highway, and Arunachal Pradesh (then NEFA) in the eastern sector, where China contested the McMahon Line. "
    "On 20 October 1962, the Chinese People's Liberation Army launched massive simultaneous surprise assaults across both sectors. "
    "Indian forces suffered disastrous military defeats. China unilaterally declared a ceasefire on 21 November 1962, withdrawing to its "
    "claimed lines. The conflict dealt an irreparable psychological blow to Nehru, led to the resignation of Defence Minister V.K. Krishna Menon, "
    "provoked the first-ever parliamentary no-confidence motion against the government, and accelerated the ideological split of the CPI in 1964."
)
P32_CHAP = "India's External Relations"

add_p(make_pq(P32_CHAP, "Dalai Lama Asylum Year", P32_TEXT,
    "The deterioration of Sino-Indian diplomatic ties accelerated sharply in 1959 when India granted political sanctuary to:",
    "The Dalai Lama and thousands of Tibetan refugees fleeing Chinese military suppression",
    ["General Chiang Kai-shek and the Nationalist government of Taiwan", "The Panchen Lama after his conversion to Hinduism", "Emperor Puyi of the Qing dynasty"],
    "A", "In March 1959, Nehru granted asylum to the Dalai Lama at Dharamshala, infuriating the Chinese leadership.", "Identifies Dalai Lama's 1959 asylum."))

add_p(make_pq(P32_CHAP, "Disputed Sectors 1962 War", P32_TEXT,
    "The 1962 Sino-Indian border war was fought primarily across which two geographical sectors?",
    "Aksai Chin in Ladakh (Western Sector) and NEFA / Arunachal Pradesh (Eastern Sector)",
    ["The Rann of Kutch (Gujarat) and the Thar Desert (Rajasthan)", "The Siachen Glacier and the Wagah Border", "The Andaman Islands and the Bay of Bengal"],
    "B", "The 1962 war occurred in the Western sector (Aksai Chin in Ladakh) and Eastern sector (NEFA, now Arunachal Pradesh).", "Lists the two disputed sectors in the 1962 war."))

add_p(make_pq(P32_CHAP, "Resignation Defence Minister 1962", P32_TEXT,
    "Which Union Defence Minister was compelled to resign from Nehru's cabinet following intense parliamentary outrage over military unpreparedness in 1962?",
    "V.K. Krishna Menon", ["Y.B. Chavan", "Baldev Singh", "Swaran Singh"],
    "C", "V.K. Krishna Menon resigned in November 1962 amidst heavy criticism over lack of military equipment and planning.", "Identifies V.K. Krishna Menon resigning in 1962."))

add_p(make_pq(P32_CHAP, "First No-Confidence Motion 1963", P32_TEXT,
    "Following the catastrophic reverses in the 1962 war, what historic constitutional procedure was moved in the Lok Sabha for the first time in August 1963?",
    "The first-ever Motion of No-Confidence against the Jawaharlal Nehru government (moved by J.B. Kripalani)",
    ["The impeachment of President Sarvepalli Radhakrishnan", "The dissolution of the Supreme Court of India", "The abolition of the Indian Army"],
    "D", "Acharya J.B. Kripalani moved the first-ever no-confidence motion against the Nehru ministry in August 1963.", "Recalls first-ever no-confidence motion in August 1963."))

add_p(make_pq(P32_CHAP, "CPI Split 1964 Catalyst", P32_TEXT,
    "How did the 1962 Sino-Indian War trigger an ideological rupture within the Communist Party of India (CPI) in 1964?",
    "It split the party into the pro-Soviet CPI and the pro-China CPI(M), which opposed aligning with the bourgeois Congress state",
    ["All communist members resigned from politics and joined the Swatantra Party", "The party merged completely with the Bharatiya Jana Sangh", "The party relocated its headquarters permanently to Moscow"],
    "A", "The 1962 war sharpened the Sino-Soviet split locally, causing the CPI to split into CPI and CPI(M) in 1964.", "Explains the 1964 split of the CPI."))


# =================================================================================================
# PASSAGE 33: The 1971 Bangladesh Liberation War and the Shimla Agreement
# =================================================================================================
P33_TEXT = (
    "The creation of Pakistan in 1947 had joined two geographically disparate wings—West Pakistan and East Pakistan—separated by "
    "over a thousand miles of Indian territory. West Pakistani rulers systematically dominated East Pakistan, suppressing the Bengali "
    "language and culture and siphoning away its economic resources. In the general elections of December 1970, the Awami League, "
    "led by Sheikh Mujibur Rahman, achieved a sweeping democratic victory, winning 160 of 162 seats in East Pakistan, securing an "
    "outright majority in the national assembly. However, the military regime of General Yahya Khan refused to hand over power. "
    "On 25 March 1971, the Pakistani army unleashed a genocidal crackdown ('Operation Searchlight') on Dhaka. Over 10 million terrorized "
    "Bengali refugees flooded into India. Prime Minister Indira Gandhi provided diplomatic, humanitarian, and military backing to the "
    "Bengali liberation fighters (Mukti Bahini). When Pakistan launched pre-emptive air strikes on north Indian airfields on 3 December 1971, "
    "full-scale war erupted. Within 14 days, Indian armed forces encircled Dhaka. On 16 December 1971, Lt. Gen. A.A.K. Niazi surrendered "
    "with 93,000 Pakistani soldiers—the largest post-WWII military capitulation—birthing the independent nation of Bangladesh. "
    "In July 1972, Indira Gandhi and Zulfikar Ali Bhutto signed the Shimla Agreement, converting the ceasefire line into the Line of Control (LoC)."
)
P33_CHAP = "India's External Relations"

add_p(make_pq(P33_CHAP, "Awami League 1970 Victory", P33_TEXT,
    "In the December 1970 Pakistan general elections, which political party led by Sheikh Mujibur Rahman won a landslide majority in East Pakistan?",
    "The Awami League", ["The Pakistan People's Party (PPP)", "The Muslim League (Qayyum)", "Jamaat-e-Islami"],
    "A", "The Awami League won 160 of 162 seats in East Pakistan, securing an absolute majority in the all-Pakistan National Assembly.", "Identifies Awami League winning 1970 elections."))

add_p(make_pq(P33_CHAP, "Operation Searchlight 1971", P33_TEXT,
    "What was the code name of the brutal military crackdown launched by the West Pakistani army against Bengali civilians on 25 March 1971?",
    "Operation Searchlight", ["Operation Fair Play", "Operation Gibraltar", "Operation Grand Slam"],
    "B", "Operation Searchlight was unleashed on the night of 25 March 1971, arresting Mujib and killing thousands of Bengalis in Dhaka.", "Identifies Operation Searchlight in East Pakistan."))

add_p(make_pq(P33_CHAP, "Historic Surrender December 1971", P33_TEXT,
    "On 16 December 1971, approximately how many Pakistani armed personnel signed the instrument of surrender before Lt. Gen. J.S. Aurora in Dhaka?",
    "Around 93,000 Pakistani armed personnel",
    ["Exactly 5,000 soldiers", "Over 500,000 soldiers", "Less than 1,000 soldiers"],
    "C", "Lt. Gen. A.A.K. Niazi surrendered with 93,000 Pakistani troops, marking the largest military surrender since World War II.", "Recalls 93,000 soldiers surrendering on 16 December 1971."))

add_p(make_pq(P33_CHAP, "Shimla Agreement 1972 LoC Clause", P33_TEXT,
    "Under the historic Shimla Agreement signed on 2 July 1972 by Indira Gandhi and Zulfikar Ali Bhutto, the 1971 ceasefire line in Jammu and Kashmir was:",
    "Redesignated as the 'Line of Control' (LoC), with both sides pledging to respect it without unilateral alterations",
    ["Abolished completely to create an open border without checkposts", "Transferred entirely to United Nations blue helmet administration", "Merged with the international border along Rajasthan"],
    "D", "The Shimla Agreement converted the ceasefire line into the Line of Control (LoC) and mandated bilateral dispute resolution.", "Details Line of Control conversion under Shimla Agreement."))

add_p(make_pq(P33_CHAP, "Indo-Soviet 20-Year Treaty 1971", P33_TEXT,
    "Ahead of the 1971 war, Prime Minister Indira Gandhi secured India against potential US-China military intervention by signing which treaty in August 1971?",
    "The 20-Year Indo-Soviet Treaty of Peace, Friendship and Cooperation",
    ["The Warsaw Pact Military Alliance", "The Treaty of Non-Aggression with Great Britain", "The Southeast Asia Treaty Organization (SEATO)"],
    "A", "The August 1971 Indo-Soviet Treaty provided mutual security consultations, neutralizing the threat of US-China intervention.", "Identifies 1971 Indo-Soviet 20-Year Treaty."))


# =================================================================================================
# PASSAGE 34: The 1967 General Elections: The Political Earthquake
# =================================================================================================
P34_TEXT = (
    "The Fourth General Elections held in February 1967 were described by political analysts as a 'political earthquake' for Indian "
    "democracy. For the first time, the Congress faced the electorate without the towering, charismatic leadership of Jawaharlal Nehru, "
    "who had died in 1964, and Lal Bahadur Shastri, who had passed away suddenly in Tashkent in January 1966. Prime Minister Indira Gandhi "
    "had been in office for barely a year and was derided by opposition leaders as a 'Gungi Gudiya' (silent doll). The country was reeling "
    "under acute economic distress: consecutive monsoon droughts had devastated agriculture, food riots erupted in cities, foreign exchange "
    "was depleted, and the controversial 1966 devaluation of the rupee caused widespread inflation. In response, socialist visionary "
    "Ram Manohar Lohia formulated the strategy of 'Non-Congressism' (Gair-Congressvad), urging all disparate opposition forces to unite "
    "to defeat the ruling party. The election results shattered the Congress party's invincibility: while it scraped a narrow majority "
    "of 283 seats in the Lok Sabha, it lost power across eight states, paving the way for multi-party Samyukta Vidhayak Dal (SVD) coalitions "
    "and the infamous culture of political defections ('Aya Ram, Gaya Ram')."
)
P34_CHAP = "Challenges to and Restoration of the Congress System"

add_p(make_pq(P34_CHAP, "Political Earthquake Metaphor 1967", P34_TEXT,
    "Why did political commentators universally characterize the Fourth General Elections of 1967 as a 'political earthquake'?",
    "The ruling Congress suffered unprecedented electoral setbacks, losing power across eight state assemblies and retaining only a fragile Lok Sabha majority",
    ["A massive natural seismic earthquake destroyed the Parliament building in New Delhi", "The military cancelled the elections and imposed martial law across all provinces", "All political parties dissolved themselves and merged into a single faction"],
    "A", "The 1967 polls shattered Congress dominance across eight state assemblies and slashed its Lok Sabha tally to 283 seats.", "Explains 'political earthquake' of 1967 elections."))

add_p(make_pq(P34_CHAP, "Non-Congressism Strategy Formulator", P34_TEXT,
    "Which prominent socialist thinker and politician formulated the strategy of 'Non-Congressism' to unify opposition parties against Congress in 1967?",
    "Dr. Ram Manohar Lohia", ["Jayaprakash Narayan", "Acharya Narendra Deva", "Chaudhary Charan Singh"],
    "B", "Ram Manohar Lohia advocated Non-Congressism, arguing that Congress rule was undemocratic and required opposition unity to defeat.", "Identifies Dr. Ram Manohar Lohia formulating Non-Congressism."))

add_p(make_pq(P34_CHAP, "Economic Factors Shaping 1967 Polls", P34_TEXT,
    "Which major economic factors contributed heavily to widespread public anger against the ruling party in the run-up to the 1967 elections?",
    "Catastrophic monsoon droughts, severe foodgrain shortages, high inflation, and the controversial 1966 devaluation of the rupee",
    ["An excessive national surplus of gold coins causing zero prices", "The sudden closure of all private banks in rural villages", "The total abolition of all taxes across urban cities"],
    "C", "Agricultural drought, food shortages, 30% price inflation, and the 1966 devaluation eroded popular support for Congress.", "Lists economic grievances shaping 1967 election outcome."))

add_p(make_pq(P34_CHAP, "Samyukta Vidhayak Dal Governments", P34_TEXT,
    "The multi-party non-Congress coalition ministries that came to power across North Indian states following the 1967 elections were known as:",
    "Samyukta Vidhayak Dal (SVD) governments",
    ["National Democratic Alliance (NDA)", "United Progressive Alliance (UPA)", "National Front (NF)"],
    "D", "SVD governments were rainbow coalitions comprising socialists, Jana Sangh, BKD, and Congress defectors across North India.", "Identifies Samyukta Vidhayak Dal governments."))

add_p(make_pq(P34_CHAP, "Aya Ram Gaya Ram Origin State", P34_TEXT,
    "The notorious political slogan 'Aya Ram, Gaya Ram', which symbolized the rampant culture of opportunistic legislative defections, originated in:",
    "Haryana (following the rapid floor-crossing of MLA Gaya Lal in 1967)",
    ["Punjab", "Uttar Pradesh", "Bihar"],
    "A", "The phrase was coined after Haryana MLA Gaya Lal switched party allegiances three times in a single fortnight in 1967.", "Identifies Haryana and Gaya Lal in Aya Ram Gaya Ram."))


# =================================================================================================
# PASSAGE 35: The 1969 Congress Split and Privy Purses
# =================================================================================================
P35_TEXT = (
    "Following the 1967 setbacks, internal factional warfare erupted within the Congress party between Prime Minister Indira Gandhi "
    "and the powerful conservative organizational party bosses collectively known as the 'Syndicate' (led by K. Kamaraj, S. Nijalingappa, "
    "N. Sanjiva Reddy, and Morarji Desai). The conflict reached a climax during the Presidential election of August 1969 following the death "
    "of President Dr. Zakir Husain. The Syndicate nominated Lok Sabha Speaker Neelam Sanjiva Reddy as the official Congress candidate. "
    "Indira Gandhi retaliated by encouraging Vice-President V.V. Giri to contest as an independent candidate, dramatically appealing to "
    "Congress MPs and MLAs to vote according to their 'conscience'. V.V. Giri triumphed, delivering a crushing humiliation to the Syndicate. "
    "In November 1969, the Syndicate expelled Indira Gandhi, formally splitting the party into Congress (Organisation) and Congress (Requisitionists). "
    "Indira Gandhi converted this organizational battle into an ideological crusade for the poor: she nationalised 14 major commercial banks, "
    "abolished the hereditary Privy Purses paid to former princely rulers (26th Amendment 1971), and coined the electrifying slogan 'Garibi Hatao' "
    "which swept the 1971 general elections."
)
P35_CHAP = "Challenges to and Restoration of the Congress System"

add_p(make_pq(P35_CHAP, "1969 Presidential Conscience Vote", P35_TEXT,
    "In the pivotal August 1969 Presidential election, Prime Minister Indira Gandhi defied her party bosses by appealing for a 'conscience vote' in favor of:",
    "Vice-President V.V. Giri (who contested as an independent candidate)",
    ["Neelam Sanjiva Reddy (the official Congress candidate)", "C.D. Deshmukh (the Swatantra-Jana Sangh candidate)", "Dr. Zakir Husain"],
    "A", "Indira Gandhi urged electors to vote their conscience, securing the victory of independent candidate V.V. Giri.", "Identifies V.V. Giri in 1969 Presidential election."))

add_p(make_pq(P35_CHAP, "Congress Split 1969 Factions", P35_TEXT,
    "The formal split of the Indian National Congress in November 1969 resulted in which two rival parties?",
    "Congress (O) led by the Syndicate and Congress (R) led by Indira Gandhi",
    ["Congress (I) and Congress (U)", "Congress (Secular) and Congress (Socialist)", "Indian National Congress and Bharatiya Jana Sangh"],
    "B", "The party bifurcated into Congress (Organisation) under Nijalingappa and Congress (Requisitionists) under Indira Gandhi.", "Lists the two factions in 1969 Congress split."))

add_p(make_pq(P35_CHAP, "Privy Purses Abolition Amendment", P35_TEXT,
    "Which Constitutional Amendment Act passed in 1971 formally abolished the hereditary Privy Purses and feudal privileges of former princely rulers?",
    "The 26th Constitutional Amendment Act of 1971",
    ["The 24th Constitutional Amendment Act", "The 42nd Constitutional Amendment Act", "The 44th Constitutional Amendment Act"],
    "C", "The 26th Amendment in 1971 abolished privy purses, ending special constitutional privileges for former rulers.", "Identifies 26th Amendment 1971 abolishing Privy Purses."))

add_p(make_pq(P35_CHAP, "Bank Nationalisation July 1969", P35_TEXT,
    "In July 1969, Indira Gandhi implemented a radical socialist measure by promulgating an ordinance nationalising how many top commercial banks?",
    "14 major commercial banks", ["50 banks", "6 banks", "All foreign banks exclusively"],
    "D", "Fourteen leading commercial banks were nationalised on 19 July 1969 to reorient credit toward agriculture and small enterprises.", "Recalls 14 commercial banks nationalised in July 1969."))

add_p(make_pq(P35_CHAP, "Garibi Hatao 1971 Slogan", P35_TEXT,
    "What was the iconic, populist campaign slogan championed by Indira Gandhi in the 1971 general elections that countered the opposition's 'Indira Hatao'?",
    "'Garibi Hatao' (Remove Poverty)",
    ["'Jai Jawan, Jai Kisan'", "'Sampoorna Kranti' (Total Revolution)", "'Roti, Kapda aur Makaan'"],
    "A", "Indira framed the 1971 poll as a battle between the Grand Alliance's personal agenda ('Indira Hatao') and her social agenda ('Garibi Hatao').", "Identifies 'Garibi Hatao' slogan in 1971."))


# =================================================================================================
# PASSAGE 36: Jayaprakash Narayan and 'Total Revolution'
# =================================================================================================
P36_TEXT = (
    "By 1973–1974, popular disenchantment with the Indira Gandhi government reached boiling point amidst runaway inflation (nearly 30%), "
    "food shortages, rising unemployment, and pervasive corruption. In January 1974, engineering students in Gujarat launched the 'Navnirman "
    "Movement' protesting hostel mess bill hikes, which mushroomed into a statewide rebellion that forced the dissolution of the state assembly. "
    "In March 1974, students in Bihar rose in protest against unemployment and corruption. The Bihar students invited veteran socialist "
    "freedom fighter Jayaprakash Narayan (JP), who had withdrawn from active electoral politics to Sarvodaya work, to lead the movement. "
    "JP accepted leadership on two non-negotiable conditions: the movement must remain strictly non-violent, and it must not confine itself "
    "to Bihar but become a nationwide struggle. JP issued the historic clarion call for 'Sampoorna Kranti' (Total Revolution)—a comprehensive "
    "transformation encompassing moral, cultural, economic, and political spheres. Simultaneously, George Fernandes led a 20-day nationwide "
    "Railway Strike in May 1974. The movement culminated on 25 June 1975 at Delhi's Ramlila Ground, where JP called on the military and police "
    "to obey their conscience and refuse unconstitutional orders, prompting Indira Gandhi to declare a National Emergency that very night."
)
P36_CHAP = "The Crisis of Democratic Order"

add_p(make_pq(P36_CHAP, "Total Revolution Clarion Call", P36_TEXT,
    "The historic clarion call for 'Total Revolution' (Sampoorna Kranti) across political, moral, and economic life was issued in 1974 by:",
    "Jayaprakash Narayan (JP)", ["Ram Manohar Lohia", "Morarji Desai", "Acharya Kripalani"],
    "A", "Jayaprakash Narayan demanded a holistic 'Total Revolution' to purge Indian public life of corruption and authoritarianism.", "Identifies Jayaprakash Narayan calling for Total Revolution."))

add_p(make_pq(P36_CHAP, "JP Two Conditions Leadership", P36_TEXT,
    "On which two fundamental conditions did Jayaprakash Narayan accept the leadership of the Bihar student movement in 1974?",
    "The movement must remain strictly non-violent, and it must expand beyond Bihar into a nationwide struggle",
    ["All student leaders must join the army, and all universities must close permanently", "The movement must support the Congress party, and reject all socialist ideals", "The movement must use armed violence, and confine itself strictly to Patna"],
    "B", "JP insisted on absolute non-violence and nationalizing the struggle across India.", "Lists JP's two conditions for leading Bihar movement."))

add_p(make_pq(P36_CHAP, "Gujarat Navnirman 1974 Trigger", P36_TEXT,
    "The Gujarat Navnirman Movement of January 1974, which forced the dissolution of the state assembly, was initially ignited by:",
    "Engineering college students in Ahmedabad protesting against excessive mess food fees and rising canteen bills",
    ["A strike by textile mill owners demanding tax exemptions", "A farmers' agitation demanding free canal water", "A protest against the construction of international airports"],
    "C", "Ahmedabad engineering students launched protests over food charges, sparking a statewide movement that forced assembly dissolution.", "Identifies Gujarat Navnirman trigger in January 1974."))

add_p(make_pq(P36_CHAP, "Railway Strike May 1974 Leader", P36_TEXT,
    "The 20-day nationwide Railway Strike in May 1974 that paralyzed logistics across India was organized under the leadership of:",
    "George Fernandes (National Coordination Committee for Railwaymen's Struggle)",
    ["Charan Singh", "Babu Jagjivan Ram", "A.K. Gopalan"],
    "D", "George Fernandes led the historic 20-day railway strike in May 1974 demanding bonus and parity in service conditions.", "Identifies George Fernandes leading May 1974 Railway Strike."))

add_p(make_pq(P36_CHAP, "Ramlila Ground Speech 25 June 1975", P36_TEXT,
    "What controversial appeal did Jayaprakash Narayan make to security forces during his massive Ramlila Ground rally on 25 June 1975?",
    "He appealed to the police, civil servants, and military personnel to uphold the Constitution and refuse illegal and unconstitutional orders",
    ["He ordered the army to stage an immediate armed military coup", "He called on foreign nations to invade New Delhi", "He demanded that all soldiers abandon their weapons and return home"],
    "A", "JP called on soldiers and police to obey their constitutional conscience, which Indira Gandhi cited to declare Emergency.", "Details JP's speech at Ramlila Ground on 25 June 1975."))


# =================================================================================================
# PASSAGE 37: The 1975 National Emergency and the ADM Jabalpur Ruling
# =================================================================================================
P37_TEXT = (
    "On 12 June 1975, Justice Jagmohan Lal Sinha of the Allahabad High Court delivered a sensational verdict unseating Prime Minister "
    "Indira Gandhi, finding her guilty of electoral malpractices in Rae Bareli. On 24 June, Supreme Court vacation judge Justice V.R. Krishna Iyer "
    "granted only a conditional stay. Faced with calls for her resignation, on the night of 25 June 1975, Indira Gandhi advised President "
    "Fakhruddin Ali Ahmed to proclaim a National Emergency under Article 352 on the subjective grounds of 'internal disturbance'. "
    "Before the Union Cabinet was even informed, electricity to major newspaper printing presses in Delhi was severed, and top opposition "
    "leaders—including JP, Morarji Desai, and Atal Bihari Vajpayee—were arrested under MISA. Fundamental rights were suspended, strict "
    "press censorship was imposed, and extra-constitutional power was wielded by Sanjay Gandhi, who enforced ruthless slum demolitions "
    "at Turkman Gate and coercive sterilization quotas. In April 1976, in the infamous ADM Jabalpur v. Shivkant Shukla (Habeas Corpus) case, "
    "the Supreme Court four-judge majority disgracefully ruled that citizens could not approach courts for protection of life or liberty "
    "during Emergency. Only Justice H.R. Khanna courageously dissented, defending inviolable human liberty."
)
P37_CHAP = "The Crisis of Democratic Order"

add_p(make_pq(P37_CHAP, "Emergency Proclamation Date Article", P37_TEXT,
    "The National Emergency was proclaimed by President Fakhruddin Ali Ahmed on the night of 25 June 1975 under which constitutional article?",
    "Article 352 on grounds of 'internal disturbance'",
    ["Article 356 on grounds of constitutional failure", "Article 360 on grounds of financial collapse", "Article 370 on grounds of regional autonomy"],
    "A", "Emergency was declared under Article 352 citing 'internal disturbance', without prior consultation of the Union Cabinet.", "Identifies Article 352 and 25 June 1975."))

add_p(make_pq(P37_CHAP, "Allahabad High Court Judge 1975", P37_TEXT,
    "Which courageous judge of the Allahabad High Court delivered the historic 12 June 1975 judgment declaring Indira Gandhi's election invalid?",
    "Justice Jagmohan Lal Sinha", ["Justice H.R. Khanna", "Justice A.N. Ray", "Justice P.N. Bhagwati"],
    "B", "Justice Jagmohan Lal Sinha invalidated Indira Gandhi's election in the election petition filed by Raj Narain.", "Identifies Justice Jagmohan Lal Sinha."))

add_p(make_pq(P37_CHAP, "ADM Jabalpur Case Sole Dissent", P37_TEXT,
    "In the notorious ADM Jabalpur (1976) Habeas Corpus ruling, which lone Supreme Court judge bravely dissented to uphold the sanctity of life and liberty?",
    "Justice H.R. Khanna", ["Justice A.N. Ray", "Justice M.H. Beg", "Justice Y.V. Chandrachud"],
    "C", "Justice H.R. Khanna delivered his immortal dissent, holding that the state cannot deprive any citizen of life without authority of law.", "Identifies Justice H.R. Khanna's lone dissent in ADM Jabalpur."))

add_p(make_pq(P37_CHAP, "Turkman Gate Demolitions 1976", P37_TEXT,
    "The violent demolition of historic residential settlements and forced sterilisation drives in Old Delhi in April 1976 occurred at:",
    "Turkman Gate", ["India Gate", "Kashmere Gate", "Ajmeri Gate"],
    "D", "Under Sanjay Gandhi's urban clearance drive, Turkman Gate was bulldozed in April 1976, sparking police firing and outrage.", "Identifies Turkman Gate demolition in 1976."))

add_p(make_pq(P37_CHAP, "Emergency Preventive Detention Act", P37_TEXT,
    "Which draconian preventive detention statute was ruthlessly deployed during the Emergency to imprison opposition politicians without trial?",
    "Maintenance of Internal Security Act (MISA)",
    ["Prevention of Terrorism Act (POTA)", "Armed Forces Special Powers Act (AFSPA)", "Unlawful Activities Prevention Act (UAPA)"],
    "A", "MISA was used to jail over 110,000 political activists without judicial hearings or communication of charges.", "Identifies MISA as Emergency detention tool."))


# =================================================================================================
# PASSAGE 38: The 1977 Democratic Transition and the Shah Commission
# =================================================================================================
P38_TEXT = (
    "In January 1977, after nineteen months of authoritarian Emergency rule, Prime Minister Indira Gandhi unexpectedly announced "
    "that elections to the Lok Sabha would be held in March. Political prisoners were released, and censorship was relaxed. "
    "Seizing this democratic opening, the major opposition parties—Congress (O), Bharatiya Jana Sangh, Bharatiya Lok Dal, and the "
    "Socialist Party—united to form the Janata Party under the moral mentorship of Jayaprakash Narayan. Senior Congress leader Jagjivan Ram "
    "resigned from the cabinet and formed the Congress for Democracy, which aligned with Janata. The March 1977 general election was fought "
    "as a referendum on democracy versus dictatorship. The results were historic: the Janata alliance swept 330 seats, completely wiping out "
    "the Congress across the northern Hindi belt. Both Indira Gandhi and her son Sanjay suffered humiliating personal defeats in Rae Bareli "
    "and Amethi. On 24 March 1977, Morarji Desai was sworn in as the first non-Congress Prime Minister of independent India. In May 1977, "
    "the new government appointed the Shah Commission of Inquiry, headed by retired Chief Justice J.C. Shah, to investigate Emergency atrocities."
)
P38_CHAP = "The Crisis of Democratic Order"

add_p(make_pq(P38_CHAP, "Janata Party Constituent Forces", P38_TEXT,
    "The victorious Janata Party that swept the historic March 1977 general elections was an amalgamation of:",
    "Congress (O), Bharatiya Jana Sangh, Bharatiya Lok Dal, and the Socialist Party",
    ["CPI, CPI(M), DMK, and Akali Dal", "Muslim League, Swatantra Party, and Hindu Mahasabha", "Congress (R), Congress (I), and AIADMK"],
    "A", "The Janata Party brought together Congress (O), Jana Sangh, Charan Singh's BLD, and socialists on a common symbol.", "Lists constituent parties of Janata Party 1977."))

add_p(make_pq(P38_CHAP, "First Non-Congress Prime Minister", P38_TEXT,
    "Who was sworn in as the first non-Congress Prime Minister of independent India on 24 March 1977?",
    "Morarji Desai", ["Chaudhary Charan Singh", "Babu Jagjivan Ram", "Jayaprakash Narayan"],
    "B", "Morarji Desai headed the Janata Party government, becoming India's first non-Congress Prime Minister.", "Identifies Morarji Desai as first non-Congress PM in 1977."))

add_p(make_pq(P38_CHAP, "Indira Gandhi Personal Defeat 1977", P38_TEXT,
    "In the 1977 elections, Prime Minister Indira Gandhi suffered a historic personal electoral defeat in her pocket borough of Rae Bareli to:",
    "Raj Narain", ["George Fernandes", "Madhu Limaye", "Chandra Shekhar"],
    "C", "Socialist rival Raj Narain defeated Indira Gandhi in Rae Bareli by over 55,000 votes in March 1977.", "Identifies Raj Narain defeating Indira Gandhi in Rae Bareli."))

add_p(make_pq(P38_CHAP, "Shah Commission Head", P38_TEXT,
    "The Commission of Inquiry appointed by the Janata government in May 1977 to investigate illegalities and excesses of the Emergency was headed by:",
    "Justice J.C. Shah (former Chief Justice of India)",
    ["Justice R.S. Sarkaria", "Justice B.P. Mandal", "Justice G.T. Nanavati"],
    "D", "Justice J.C. Shah headed the Shah Commission, conducting extensive open public hearings on Emergency abuses.", "Identifies Justice J.C. Shah heading Shah Commission."))

add_p(make_pq(P38_CHAP, "Congress Northern Wipeout 1977", P38_TEXT,
    "In which geographic zone of India was the ruling Congress party completely wiped out, winning zero seats in the 1977 elections?",
    "The northern Hindi heartland states: Uttar Pradesh, Bihar, Punjab, Haryana, and Delhi",
    ["The southern states: Andhra Pradesh, Karnataka, and Kerala", "The western states: Maharashtra and Gujarat", "The northeastern states: Assam and Tripura"],
    "A", "Congress lost every single seat in UP (out of 85), Bihar (out of 54), Punjab, Haryana, and Delhi due to Emergency excesses.", "Details Northern wipeout of Congress in 1977."))


# =================================================================================================
# PASSAGE 39: The Punjab Crisis, Operation Blue Star and the Punjab Accord
# =================================================================================================
P39_TEXT = (
    "In the 1970s, regional aspirations in Punjab were articulated by the Shiromani Akali Dal through the Anandpur Sahib Resolution of 1973, "
    "which demanded greater state autonomy, devolution of financial powers, and cultural protections within a restructured federal framework. "
    "By the early 1980s, the political leadership of the Akali movement was eclipsed by radical militant elements led by Jarnail Singh Bhindranwale, "
    "who transformed the agitation into an armed secessionist struggle for an independent Sikh homeland called 'Khalistan'. "
    "Militants fortified themselves inside the holiest Sikh shrine, the Golden Temple complex in Amritsar. In June 1984, Prime Minister "
    "Indira Gandhi ordered the Indian Army to launch 'Operation Blue Star' to flush out the militants. The operation caused heavy casualties, "
    "damaged the sacred Akal Takht, and caused profound trauma to the Sikh community worldwide. On 31 October 1984, Indira Gandhi was "
    "assassinated by two of her Sikh bodyguards, triggering horrific, organized anti-Sikh violence across Delhi and other cities, resulting "
    "in over 2,700 deaths. In July 1985, Prime Minister Rajiv Gandhi and Akali Dal President Sant Harchand Singh Longowal signed the historic "
    "Punjab Accord to restore peace and transfer Chandigarh to Punjab."
)
P39_CHAP = "Regional Aspirations"

add_p(make_pq(P39_CHAP, "Operation Blue Star Date Target", P39_TEXT,
    "Operation Blue Star was conducted by the Indian Army in June 1984 to flush out armed militants from which sacred shrine?",
    "The Golden Temple (Harmandir Sahib) complex in Amritsar",
    ["The Bangla Sahib Gurdwara in New Delhi", "The Anandpur Sahib Gurdwara", "The Sis Ganj Sahib Gurdwara"],
    "A", "Operation Blue Star took place between 1 and 8 June 1984 inside the Golden Temple complex in Amritsar.", "Identifies Golden Temple complex as target of Operation Blue Star."))

add_p(make_pq(P39_CHAP, "Rajiv-Longowal Accord Date", P39_TEXT,
    "The Memorandum of Settlement on Punjab, popularly known as the Rajiv-Longowal Punjab Accord, was signed in:",
    "July 1985", ["June 1984", "October 1984", "January 1986"],
    "B", "Rajiv Gandhi and Sant Harchand Singh Longowal signed the Punjab Accord on 24 July 1985.", "Identifies July 1985 for Rajiv-Longowal Accord."))

add_p(make_pq(P39_CHAP, "Anandpur Sahib Resolution Year", P39_TEXT,
    "The Anandpur Sahib Resolution, which demanded greater regional autonomy and true federal decentralisation, was adopted by the Akali Dal in:",
    "1973", ["1966", "1984", "1990"],
    "C", "The Shiromani Akali Dal adopted the Anandpur Sahib Resolution at Anandpur Sahib in October 1973.", "Recalls 1973 adoption of Anandpur Sahib Resolution."))

add_p(make_pq(P39_CHAP, "Chandigarh Clause Punjab Accord", P39_TEXT,
    "Under the terms of the 1985 Rajiv-Longowal Accord, what provision was agreed regarding the union territory of Chandigarh?",
    "Chandigarh would be transferred exclusively to Punjab as its state capital",
    ["Chandigarh would be permanently ceded to Himachal Pradesh", "Chandigarh would be divided into two sovereign city-states", "Chandigarh would remain a Union Territory under central rule forever"],
    "D", "The accord stipulated the transfer of Chandigarh to Punjab by 26 January 1986, though it was delayed by border disputes.", "Identifies Chandigarh transfer provision in Punjab Accord."))

add_p(make_pq(P39_CHAP, "Indira Gandhi Assassination Date", P39_TEXT,
    "Prime Minister Indira Gandhi was tragically assassinated by two of her Sikh bodyguards at her official residence on:",
    "31 October 1984", ["15 August 1984", "1 June 1984", "26 January 1985"],
    "A", "Indira Gandhi was assassinated on 31 October 1984 at 1 Safdarjung Road, New Delhi, sparking horrific anti-Sikh violence.", "Identifies 31 October 1984 as date of Indira Gandhi's assassination."))


# =================================================================================================
# PASSAGE 40: The Mandal Commission and Coalition Politics
# =================================================================================================
P40_TEXT = (
    "The political landscape of India underwent a profound structural transformation in the 1990s, driven by the twin forces of "
    "'Mandal' (caste-based affirmative action) and the arrival of the coalition era. In December 1978, the Morarji Desai Janata government "
    "had appointed the Second Backward Classes Commission under the chairmanship of Bindeshwari Prasad Mandal. Submitting its report in "
    "December 1980, the Mandal Commission calculated that Other Backward Classes (OBCs) constituted roughly 52 percent of India's population "
    "and recommended a 27 percent reservation in central government jobs and public sector undertakings for these communities. "
    "On 7 August 1990, Prime Minister Vishwanath Pratap Singh announced in Parliament that his National Front government would implement "
    "the Mandal recommendations. This triggered explosive, violent student agitations across North India and sharp political polarization. "
    "In November 1992, in the landmark Indra Sawhney v. Union of India case, a nine-judge Constitution Bench of the Supreme Court upheld "
    "the 27 percent OBC quota while excluding the 'creamy layer' and imposing a 50 percent ceiling on total reservations. "
    "The implementation of Mandal irrevocably reshaped Indian democracy, unleashing a 'Second Democratic Upsurge' that empowered backward caste "
    "parties like the BSP, SP, and RJD, permanently cementing multi-party coalition governance at the Centre."
)
P40_CHAP = "Recent Developments in Indian Politics"

add_p(make_pq(P40_CHAP, "Mandal Commission Head", P40_TEXT,
    "The Second Backward Classes Commission appointed in 1978 by the Janata government was chaired by former Bihar Chief Minister:",
    "Bindeshwari Prasad Mandal (B.P. Mandal)",
    ["Kaka Kalelkar", "Karpoori Thakur", "Jagjivan Ram"],
    "A", "B.P. Mandal chaired the Second Backward Classes Commission, which submitted its landmark report in December 1980.", "Identifies B.P. Mandal heading Second Backward Classes Commission."))

add_p(make_pq(P40_CHAP, "Mandal Implementation Announcement Year", P40_TEXT,
    "Which Prime Minister formally announced the implementation of the Mandal Commission's 27% job quota recommendation on 7 August 1990?",
    "Vishwanath Pratap Singh (V.P. Singh)",
    ["Rajiv Gandhi", "Chandra Shekhar", "P.V. Narasimha Rao"],
    "B", "Prime Minister V.P. Singh announced the implementation of the 27% OBC reservation in Parliament on 7 August 1990.", "Identifies V.P. Singh announcing Mandal implementation in 1990."))

add_p(make_pq(P40_CHAP, "Indra Sawhney 1992 Ruling Limits", P40_TEXT,
    "In the landmark Indra Sawhney judgment (1992), what crucial conditions did the Supreme Court attach while upholding the 27% OBC quota?",
    "The exclusion of the socially advanced 'creamy layer' from quota benefits and a strict 50 percent ceiling on total reservations",
    ["The complete abolition of reservations for Scheduled Castes and Scheduled Tribes", "The requirement that all candidates must score 100 percent in entrance exams", "The limitation of reservations only to metropolitan capital cities"],
    "C", "The Supreme Court upheld 27% OBC reservation subject to excluding the 'creamy layer' and capping total quotas at 50%.", "Details Indra Sawhney creamy layer and 50% ceiling conditions."))

add_p(make_pq(P40_CHAP, "Mandal Estimated OBC Population Share", P40_TEXT,
    "According to the survey and demographic calculations of the Mandal Commission, what proportion of India's population belonged to the OBC category?",
    "Approximately 52 percent", ["Around 27 percent", "Around 15 percent", "Over 80 percent"],
    "D", "The Mandal Commission estimated OBCs to constitute 52% of the Indian population, recommending 27% reservation to adhere to court limits.", "Recalls 52% OBC population estimation."))

add_p(make_pq(P40_CHAP, "Second Democratic Upsurge Impact", P40_TEXT,
    "The 'Second Democratic Upsurge' catalyzed by the Mandal mobilization in the 1990s is fundamentally characterized by:",
    "The dramatic rise and political empowerment of backward caste and Dalit parties, permanently democratizing parliamentary governance",
    ["The total restoration of one-party Congress dominance across all states", "The complete cessation of all election voting across rural constituencies", "The privatization of all government departments to foreign corporations"],
    "A", "Mandal politics democratized power, propelling intermediate and backward castes into the epicenter of state and national governance.", "Summarizes the impact of the Second Democratic Upsurge."))


# Save Passages Part 2 to disk
with open("mock/pol_units/passages_part2.json", "w", encoding="utf-8") as f:
    json.dump(passages_part2, f, indent=2, ensure_ascii=False)

print(f"SUCCESS: Generated and validated all 20 passages (100 questions) in mock/pol_units/passages_part2.json")
