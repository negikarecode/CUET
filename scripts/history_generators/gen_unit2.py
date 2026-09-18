import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.history_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text,
    get_pyq_normalized_set
)

CHAPTER = "Kings, Farmers and Towns: Early States and Economies (c. 600 BCE - 600 CE)"
questions = []
seen = set()
pyq_seen = get_pyq_normalized_set()

# Load Unit 1 questions to ensure no duplicates
if os.path.exists("mock/history_units/unit1.json"):
    with open("mock/history_units/unit1.json", "r", encoding="utf-8") as f:
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

print("Generating 80 unique questions for Unit 2: Kings, Farmers and Towns...")

# =================================================================================================
# 1. Epigraphy, James Prinsep & 16 Mahajanapadas (Q1 - Q20)
# =================================================================================================

opts, corr, sol = rotate_options(
    "James Prinsep in 1838",
    ["Alexander Cunningham in 1861", "John Marshall in 1924", "Mortimer Wheeler in 1944"],
    "A",
    "1. In 1838, James Prinsep, an officer in the mint of the East India Company, deciphered Brahmi and Kharosthi scripts.\nHence, Option {{CORR}} is correct.",
    "Identifies James Prinsep deciphering Brahmi and Kharosthi in 1838."
)
add_q(make_question(CHAPTER, "Decipherment of Scripts", "Who deciphered the ancient Indian scripts Brahmi and Kharosthi in the year 1838?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Devanampiya ('beloved of the gods') and Piyadasi ('pleasant to behold')",
    ["Maharajadhiraja and Chakravartin", "Vikramaditya and Shakari", "Devaputra and Shahanshah"],
    "B",
    "1. Most Asokan inscriptions referred to the king using royal honorific titles: Devanampiya ('beloved of the gods') and Piyadasi ('pleasant to behold').\nHence, Option {{CORR}} is correct.",
    "Identifies Devanampiya and Piyadasi as Asokan royal titles."
)
add_q(make_question(CHAPTER, "Asokan Epigraphy", "Which honorific titles meaning 'beloved of the gods' and 'pleasant to behold' were predominantly used by Asoka in his inscriptions?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Maski (and Gujarra, Nittur, Udegolam)",
    ["Sanchi", "Sarnath", "Kausambi"],
    "C",
    "1. The personal name 'Asoka' occurs explicitly in minor rock edicts at Maski, Gujarra, Nittur, and Udegolam.\nHence, Option {{CORR}} is correct.",
    "Identifies Maski as site where Asoka's personal name is explicitly mentioned."
)
add_q(make_question(CHAPTER, "Asokan Epigraphy", "In which of the following inscriptional sites is the personal name 'Asoka' explicitly mentioned alongside royal titles?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sixteen Mahajanapadas",
    ["Eight Janapadas", "Twenty-four Rashtras", "Thirty-two Mandalas"],
    "D",
    "1. Early Buddhist and Jaina texts mention sixteen states known as the Mahajanapadas, flourishing from c. 600 BCE.\nHence, Option {{CORR}} is correct.",
    "Identifies 16 Mahajanapadas."
)
add_q(make_question(CHAPTER, "The Sixteen Mahajanapadas", "Early Buddhist and Jaina religious literature universally recognizes the existence of how many major territorial states (Mahajanapadas) by the 6th century BCE?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Vajji",
    ["Magadha", "Koshala", "Avanti"],
    "A",
    "1. While most mahajanapadas were ruled by hereditary monarchs, some, known as ganas or sanghas, were oligarchies where power was shared by a group of men (e.g. the Vajji sangha).\nHence, Option {{CORR}} is correct.",
    "Identifies Vajji as an oligarchy / gana-sangha."
)
add_q(make_question(CHAPTER, "The Sixteen Mahajanapadas", "Which of the following prominent Mahajanapadas was an oligopoly (gana or sangha) ruled collectively by a group of rajas rather than a single hereditary monarch?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Dharmasutras composed in Sanskrit by Brahmanas",
    ["Zend Avesta composed in Old Persian", "Vinaya Pitaka composed in Pali by Buddhist sanghas", "Sangam anthologies composed in Old Tamil"],
    "B",
    "1. From c. 6th century BCE onwards, Brahmanas began composing Sanskrit texts known as the Dharmasutras, laying down norms for rulers and society.\nHence, Option {{CORR}} is correct.",
    "Identifies Dharmasutras as normative Sanskrit legal codes for rulers."
)
add_q(make_question(CHAPTER, "Norms for Rulers", "From c. 6th century BCE onwards, which normative texts composed in Sanskrit by Brahmanas laid down legal codes and duties for rulers (Kshatriyas)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Agricultural productivity of Ganga valley, rich iron ore mines in Jharkhand, availability of war elephants in forests, and Ganga-Son river trade routes",
    ["Direct military intervention by Alexander the Great", "Total absence of any peasant taxation or trade levies", "Exemption of Magadha from all external warfare"],
    "C",
    "1. Magadha became the most powerful Mahajanapada due to fertile agriculture, iron mines in Jharkhand for tools/weapons, forest elephants for the army, and river transport.\nHence, Option {{CORR}} is correct.",
    "Explains reasons for Magadha's rise to prominence."
)
add_q(make_question(CHAPTER, "Rise of Magadha", "Which combination of geographical and economic factors enabled Magadha to emerge as the most powerful Mahajanapada between the 6th and 4th centuries BCE?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Rajagriha (modern Rajgir in Bihar), meaning 'house of the king'",
    ["Pataliputra", "Ujjayini", "Varanasi"],
    "D",
    "1. Initially, Rajagriha (meaning 'house of the king') was the capital of Magadha, a fortified settlement located amongst hills, before shifting to Pataliputra.\nHence, Option {{CORR}} is correct.",
    "Identifies Rajagriha as early fortified capital of Magadha."
)
add_q(make_question(CHAPTER, "Rise of Magadha", "What was the initial capital city of Magadha before it was transferred to Pataliputra in the 4th century BCE?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "In the fourth century BCE",
    ["In the sixth century BCE", "In the second century CE", "In the fourth century CE"],
    "A",
    "1. In the fourth century BCE, the capital of Magadha was shifted from Rajagriha to Pataliputra (modern Patna), commanding communication routes along the Ganga.\nHence, Option {{CORR}} is correct.",
    "Identifies 4th century BCE as time of capital shift to Pataliputra."
)
add_q(make_question(CHAPTER, "Rise of Magadha", "In which century BCE was the capital of Magadha relocated from Rajagriha to Pataliputra?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Chandragupta Maurya in c. 321 BCE",
    ["Asoka in c. 268 BCE", "Bindusara in c. 297 BCE", "Bimbisara in c. 544 BCE"],
    "B",
    "1. The growth of Magadha culminated in the Mauryan Empire founded by Chandragupta Maurya in c. 321 BCE.\nHence, Option {{CORR}} is correct.",
    "Identifies Chandragupta Maurya founding Mauryan Empire in c. 321 BCE."
)
add_q(make_question(CHAPTER, "The Mauryan Empire", "Who founded the Mauryan Empire in c. 321 BCE, extending control as far northwest as Afghanistan and Baluchistan?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Indica written by Megasthenes, a Greek ambassador to the court of Chandragupta Maurya",
    ["Geographia written by Ptolemy", "Periplus of the Erythraean Sea", "Naturalis Historia by Pliny the Elder"],
    "C",
    "1. An invaluable contemporary Greek account of the Mauryan court was preserved in surviving fragments of the Indica by Megasthenes.\nHence, Option {{CORR}} is correct.",
    "Identifies Megasthenes' Indica."
)
add_q(make_question(CHAPTER, "Mauryan Administration", "Which classical Greek account written by an ambassador in Chandragupta Maurya's court serves as a major source for reconstructing Mauryan administration?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kautilya (Chanakya), traditionally believed to be the chief minister of Chandragupta Maurya",
    ["Harishena, court poet of Samudragupta", "Banabhatta, court poet of Harshavardhana", "Kalidasa, dramatist under Chandragupta II"],
    "D",
    "1. The Arthashastra is traditionally attributed to Kautilya or Chanakya, the chief minister and mentor of Chandragupta Maurya.\nHence, Option {{CORR}} is correct.",
    "Identifies Kautilya as author of Arthashastra."
)
add_q(make_question(CHAPTER, "Mauryan Administration", "Parts of the ancient treatise on statecraft, the Arthashastra, were composed by:", opts, corr, sol))

add_q(make_match_question(
    CHAPTER, "Mauryan Provincial Centres",
    "Match the Mauryan administrative centre in List I with its geographical/strategic significance in List II:",
    [("A", "Taxila"), ("B", "Ujjayini"), ("C", "Suvarnagiri"), ("D", "Tosali")],
    [("i", "Situated on long-distance overland trade routes to the northwest"), ("ii", "Important for tapping the gold mines of Karnataka"), ("iii", "Situated on trade routes through central India"), ("iv", "Coastal administrative centre in Kalinga (Odisha)")],
    "A-i, B-iii, C-ii, D-iv",
    "A",
    "1. Taxila was on northwest routes (A-i), Ujjayini in central trade route (B-iii), Suvarnagiri 'golden mountain' for Karnataka gold (C-ii), Tosali in coastal Odisha (D-iv).",
    "Matches Mauryan provincial capitals with strategic functions."
))

opts, corr, sol = rotate_options(
    "Suvarnagiri (literally, 'the golden mountain')",
    ["Taxila", "Ujjayini", "Tosali"],
    "B",
    "1. Suvarnagiri (literally, 'the golden mountain') in Karnataka was strategically important for tapping the gold mines of the region.\nHence, Option {{CORR}} is correct.",
    "Identifies Suvarnagiri as golden mountain tapping Karnataka gold."
)
add_q(make_question(CHAPTER, "Mauryan Provincial Centres", "Which Mauryan provincial capital located in modern Karnataka had a name translating literally as 'the golden mountain'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A committee with six sub-committees",
    ["A council of four hereditary kings", "A single military dictator without advisory bodies", "A judicial panel of ten foreign ambassadors"],
    "C",
    "1. Megasthenes mentions a committee with six sub-committees for coordinating military activity in the Mauryan empire.\nHence, Option {{CORR}} is correct.",
    "Identifies committee with six subcommittees for Mauryan military."
)
add_q(make_question(CHAPTER, "Mauryan Military Administration", "According to the account of Megasthenes, how was military activity coordinated in the Mauryan empire?", opts, corr, sol))

add_q(make_match_question(
    CHAPTER, "Megasthenes Military Sub-committees",
    "Match the Mauryan military sub-committee in List I with its assigned operational responsibility in List II as recorded by Megasthenes:",
    [("A", "First sub-committee"), ("B", "Second sub-committee"), ("C", "Third sub-committee"), ("D", "Fifth sub-committee")],
    [("i", "Coordinated transport and provisions"), ("ii", "Looked after the navy"), ("iii", "Responsible for foot-soldiers (infantry)"), ("iv", "Responsible for chariots")],
    "A-ii, B-i, C-iii, D-iv",
    "D",
    "1. Megasthenes: 1st navy (A-ii), 2nd transport/provisions (B-i), 3rd foot-soldiers (C-iii), 4th horses/cavalry, 5th chariots (D-iv), 6th elephants.",
    "Matches Megasthenes' military sub-committees with roles."
))

opts, corr, sol = rotate_options(
    "Dhamma Mahamattas",
    ["Samahartas", "Sannidhatas", "Rajukas"],
    "A",
    "1. Special officers known as the Dhamma Mahamattas were appointed by Asoka to spread the message of Dhamma across the empire.\nHence, Option {{CORR}} is correct.",
    "Identifies Dhamma Mahamattas."
)
add_q(make_question(CHAPTER, "Asoka's Dhamma", "Special administrative officers appointed by Asoka to propagate the principles of Dhamma throughout his empire were designated as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Respect towards elders, generosity towards Brahmanas and renouncers, treating slaves and servants kindly, and religious tolerance",
    ["Mandatory conversion of all citizens to Buddhism under penalty of exile", "Extermination of all foreign merchants trading along the silk route", "Abolition of all agricultural grain taxation across the empire"],
    "B",
    "1. Asoka's Dhamma included respect for elders, generosity towards Brahmanas and ascetics, kind treatment of slaves and servants, and mutual respect among religions.\nHence, Option {{CORR}} is correct.",
    "Identifies core tenets of Asoka's Dhamma."
)
add_q(make_question(CHAPTER, "Asoka's Dhamma", "Which of the following represents the core universal tenets of Asoka's policy of Dhamma?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Prakrit written in Brahmi, while in the northwest Aramaic and Greek scripts were used",
    ["Classical Sanskrit written exclusively in modern Devanagari", "Tamil written in Grantha script across all northern provinces", "Old Persian cuneiform inscribed on baked clay cylinders"],
    "C",
    "1. Most Asokan inscriptions were in Prakrit written in Brahmi script; those in the northwest were in Aramaic and Greek, and Kharosthi.\nHence, Option {{CORR}} is correct.",
    "Identifies languages and scripts of Asokan inscriptions."
)
add_q(make_question(CHAPTER, "Asokan Epigraphy", "Most of Asoka's inscriptions across the Indian subcontinent were composed in which language and script?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kalinga (present-day coastal Odisha)",
    ["Taxila", "Kandahar", "Ujjayini"],
    "D",
    "1. In Major Rock Edict XIII, Asoka expressed profound remorse and sorrow after the conquest of Kalinga (modern coastal Odisha), renouncing aggressive conquest.\nHence, Option {{CORR}} is correct.",
    "Identifies Kalinga conquest described in Major Rock Edict XIII."
)
add_q(make_question(CHAPTER, "Asokan Epigraphy", "In Major Rock Edict XIII, Asoka expressed deep remorse and suffering resulting from his bloody conquest of which region?", opts, corr, sol))

# =================================================================================================
# 2. Kushanas, Guptas & Prashastis (Q21 - Q40)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Mat near Mathura (Uttar Pradesh) and in Afghanistan",
    ["Sanchi and Bharhut (Madhya Pradesh)", "Lothal and Dholavira (Gujarat)", "Kaveripattinam and Madurai (Tamil Nadu)"],
    "A",
    "1. Colossal statues of Kushana rulers have been found installed in a shrine at Mat near Mathura (UP) and at a temple in Afghanistan.\nHence, Option {{CORR}} is correct.",
    "Identifies Mat near Mathura and Afghanistan for Kushana colossal statues."
)
add_q(make_question(CHAPTER, "Divine Kingship", "Colossal stone statues of Kushana rulers claiming divine status have been discovered in shrines at which locations?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Devaputra, meaning 'son of god', inspired by Chinese emperors who called themselves 'sons of heaven'",
    ["Kaiser, inspired by Roman emperors", "Pharaoh, inspired by Egyptian god-kings", "Caliph, inspired by Islamic rulers"],
    "B",
    "1. Many Kushana rulers adopted the title Devaputra, or 'son of god', possibly inspired by Chinese rulers who called themselves sons of heaven.\nHence, Option {{CORR}} is correct.",
    "Explains Devaputra title adopted by Kushanas."
)
add_q(make_question(CHAPTER, "Divine Kingship", "Which title meaning 'son of god' was adopted by Kushana rulers, likely influenced by Chinese imperial concepts?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kushanas (1st century CE)",
    ["Mauryas (4th century BCE)", "Guptas (4th century CE)", "Satavahanas (2nd century BCE)"],
    "C",
    "1. The first gold coins in the subcontinent were issued in the first century CE by the Kushanas, virtually identical in weight to Roman and Parthian coins.\nHence, Option {{CORR}} is correct.",
    "Identifies Kushanas as first to issue gold coins in India."
)
add_q(make_question(CHAPTER, "Coins and Kings", "The earliest gold coins in the Indian subcontinent were issued in the first century CE by which dynasty?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Harishena, the court poet of Samudragupta",
    ["Kalidasa, court poet of Chandragupta II", "Banabhatta, court poet of Harshavardhana", "Ravikirti, court poet of Pulakeshin II"],
    "D",
    "1. The Prayaga Prashasti (Allahabad Pillar Inscription) was composed in refined Sanskrit by Harishena, the court poet (sandhivigrahika) of Samudragupta.\nHence, Option {{CORR}} is correct.",
    "Identifies Harishena as composer of Prayaga Prashasti."
)
add_q(make_question(CHAPTER, "Gupta Inscriptions", "The famous Prayaga Prashasti (also known as the Allahabad Pillar Inscription) was composed in classical Sanskrit by:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Prayaga Prashasti (Allahabad Pillar Inscription)",
    ["Junagadh Rock Inscription", "Mehrauli Iron Pillar Inscription", "Aihole Inscription"],
    "A",
    "1. The Prayaga Prashasti portrays Samudragupta as a deity dwelling on earth whose intellect surpassed Brihaspati and whose compassion knew no bounds.\nHence, Option {{CORR}} is correct.",
    "Identifies Prayaga Prashasti portraying Samudragupta."
)
add_q(make_question(CHAPTER, "Gupta Inscriptions", "Which monumental Sanskrit prashasti describes the military campaigns, poetic talents, and divine stature of Samudragupta?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Land granted to a Brahmana, who was exempt from paying land revenue and often given the right to collect local taxes",
    ["Agricultural land reserved for imperial war elephant cavalry", "Urban marketplace land leased to foreign Roman merchants", "Forest land cleared by tribal hunter-gatherers for slash-and-burn farming"],
    "B",
    "1. An agrahara was land granted to a Brahmana, who was usually exempted from paying land revenue and other dues to the king.\nHence, Option {{CORR}} is correct.",
    "Defines Agrahara."
)
add_q(make_question(CHAPTER, "Land Grants", "In early Indian history, what did the term 'agrahara' specifically denote?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "She was the daughter of Chandragupta II and married into the Vakataka ruling family of the Deccan",
    ["She was the queen of Asoka who financed the construction of the Great Stupa at Sanchi", "She was a Greek princess married to Seleucus Nicator in Babylon", "She was the first female ruler of the Chola empire in Thanjavur"],
    "C",
    "1. Prabhavati Gupta was the daughter of the Gupta monarch Chandragupta II and queen of the Vakataka king Rudrasena II in the Deccan.\nHence, Option {{CORR}} is correct.",
    "Identifies Prabhavati Gupta's royal lineage."
)
add_q(make_question(CHAPTER, "Land Grants and Women", "Prabhavati Gupta, who famously issued copperplate land grants in her own name, held what dynastic background?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "According to Sanskrit legal texts (Manusmriti), women were not supposed to have independent access to resources like land",
    ["Royal women were strictly prohibited from wearing gold ornaments", "Women were required to perform compulsory military infantry service", "Queens were legally required to surrender their dowries to foreign ambassadors"],
    "D",
    "1. The inscription of Prabhavati Gupta is significant because, according to Brahmanical legal texts, women were not supposed to have independent access to land.\nHence, Option {{CORR}} is correct.",
    "Explains legal significance of Prabhavati Gupta's land grant."
)
add_q(make_question(CHAPTER, "Land Grants and Women", "Why is the copperplate land grant of Prabhavati Gupta considered exceptional by social historians?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sudarshana Lake in Gujarat",
    ["Chilika Lake in Odisha", "Dal Lake in Kashmir", "Pulicat Lake in Andhra Pradesh"],
    "A",
    "1. The Junagadh rock inscription of the Shaka ruler Rudradaman (2nd century CE) records the repair of Sudarshana Lake, an artificial water reservoir.\nHence, Option {{CORR}} is correct.",
    "Identifies Sudarshana Lake repaired by Rudradaman."
)
add_q(make_question(CHAPTER, "Water Reservoirs", "A celebrated Sanskrit rock inscription at Junagadh records the repair of which ancient artificial reservoir by the Shaka ruler Rudradaman?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Mauryan rulers (begun under Chandragupta Maurya and completed under Asoka)",
    ["Gupta rulers in the 4th century CE", "Satavahana monarchs in Maharashtra", "Chola kings in Tamil Nadu"],
    "B",
    "1. The Junagadh inscription records that the embankment of Sudarshana Lake was originally built during the Mauryan period.\nHence, Option {{CORR}} is correct.",
    "Identifies Mauryas as original builders of Sudarshana Lake embankment."
)
add_q(make_question(CHAPTER, "Water Reservoirs", "According to the Junagadh rock inscription, who originally constructed the embankment of Sudarshana Lake?", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Gupta Prashastis",
    "Prashastis were composed in praise of kings in particular, and patrons in general, by court poets.",
    "While historians do not take prashastis as literal facts, they provide valuable insights into the ideals of kingship.",
    1, "A",
    "1. Both statements are accurate NCERT assessments: prashastis were laudatory poetic compositions reflecting royal ideals rather than objective factual chronicles.",
    "Confirms both statements are correct regarding prashastis."
))

add_q(make_assertion_question(
    CHAPTER, "Coins and Kings",
    "Indo-Greek rulers were the first in the subcontinent to issue coins which bore the names and portraits of rulers.",
    "The Indo-Greeks established control over the northwestern part of the subcontinent in the second century BCE.",
    1, "A",
    "1. Both (A) and (R) are true, and the Indo-Greek establishment of northwest rule introduced hellenistic numismatic traditions of placing royal portraits on coins.",
    "Confirms (R) is the correct explanation of (A)."
))

opts, corr, sol = rotate_options(
    "Samantas",
    ["Mansabdars", "Amara-nayakas", "Iqtadars"],
    "C",
    "1. In the Gupta period, kings depended on samantas, men who maintained themselves through local resources including control over land and offered military support to rulers.\nHence, Option {{CORR}} is correct.",
    "Identifies Samantas in Gupta period."
)
add_q(make_question(CHAPTER, "Gupta Political Structure", "During the Gupta period, regional landed subordinates who controlled local resources and provided military support to the sovereign were termed:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Cholas, Cheras, and Pandyas in Tamilakam",
    ["Kushanas, Shakas, and Pahlavas in Gandhara", "Kambojas, Gandharas, and Kurus in the Indus valley", "Vakatakas, Ikshvakus, and Kadambas in Malwa"],
    "D",
    "1. The kingdoms of the Cholas, Cheras, and Pandyas emerged in Tamilakam (ancient Tamil country encompassing parts of Andhra, Karnataka, and Tamil Nadu).\nHence, Option {{CORR}} is correct.",
    "Identifies southern chiefdoms in Tamilakam."
)
add_q(make_question(CHAPTER, "Chiefs and Chiefdoms", "Which three prominent ruling dynasties (known as the muvendar) emerged in ancient Tamilakam in southern India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A chiefdom was ruled by a chief whose position was not strictly hereditary and who relied on voluntary gifts from his kinfolk rather than regular taxes",
    ["A chiefdom was an industrial trade corporation registered with Roman banking houses", "A chiefdom had no social hierarchy and was purely an egalitarian pastoral commune", "A chiefdom was an administrative province governed by foreign Buddhist monks"],
    "A",
    "1. A chief was a tribal or clan leader who received gifts (not regular taxes) from his kinfolk and redistributed wealth, unlike a territorial monarch.\nHence, Option {{CORR}} is correct.",
    "Contrasts chiefdom with territorial monarchy."
)
add_q(make_question(CHAPTER, "Chiefs and Chiefdoms", "How did a 'chiefdom' in ancient Tamilakam differ structurally from an established monarchical state?", opts, corr, sol))

# =================================================================================================
# 3. Rural Society, Agricultural Technologies & Land Categories (Q41 - Q60)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Gandatindu Jataka",
    ["Mahasutasoma Jataka", "Vessantara Jataka", "Vidhurapandita Jataka"],
    "A",
    "1. The Gandatindu Jataka describes the plight of the subjects of a wicked king, showing how elderly people, women, and peasants fled into the forest to escape plunder by tax collectors.\nHence, Option {{CORR}} is correct.",
    "Identifies Gandatindu Jataka describing subjects under wicked king."
)
add_q(make_question(CHAPTER, "Popular Perceptions of Kings", "Which Jataka story vividly depicts the misery of peasants suffering under an oppressive king whose tax collectors plunder villages by day while robbers attack by night?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Iron-tipped ploughshare and transplantation of paddy seedlings",
    ["Tractor-drawn mechanized seed drills", "Deep chemical fertilizers and drip irrigation sprinklers", "Steam-driven hydraulic river water pumps"],
    "B",
    "1. From the 6th century BCE, agricultural productivity surged due to the spread of iron-tipped ploughshares and the introduction of transplantation of paddy in waterlogged fields.\nHence, Option {{CORR}} is correct.",
    "Identifies iron ploughshare and paddy transplantation as productivity innovations."
)
add_q(make_question(CHAPTER, "Strategies for Increasing Production", "Which two major technological innovations significantly accelerated agricultural output in the alluvial plains of the Ganga and Kaveri from c. 6th century BCE?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Transplantation involves germinating seeds in nursery beds and then transferring healthy saplings to waterlogged fields, ensuring dramatically higher yields",
    ["Transplantation is the clearing of virgin forests by burning undergrowth for shifting cultivation", "Transplantation refers to moving peasant families forcibly across provincial borders", "Transplantation is the mechanical storage of grain inside underground granaries"],
    "C",
    "1. Transplantation of paddy involves growing seedlings in nurseries and transplanting them to flooded fields, drastically reducing seed mortality and multiplying yields.\nHence, Option {{CORR}} is correct.",
    "Defines transplantation of paddy."
)
add_q(make_question(CHAPTER, "Strategies for Increasing Production", "What does the technique of 'transplantation' in ancient Indian rice cultivation refer to?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Semi-arid parts of Punjab and Rajasthan and hilly tracts in central and northeastern India",
    ["The fertile alluvial delta of the Kaveri river basin", "The floodplains of the central Ganga valley in Bihar", "The coastal agrarian plains of southern Bengal"],
    "D",
    "1. Iron ploughshares were not used everywhere: cultivators in semi-arid areas of Punjab and Rajasthan did not adopt it till the 20th century, and hoe agriculture was practiced in hilly tracts.\nHence, Option {{CORR}} is correct.",
    "Identifies regions where hoe rather than iron ploughshare prevailed."
)
add_q(make_question(CHAPTER, "Strategies for Increasing Production", "In which regions of ancient India was hoe agriculture far more suited and widely practiced than heavy iron ploughshare cultivation?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Gahapati",
    ["Kutumbin", "Vellalar", "Adimai"],
    "A",
    "1. A gahapati was the owner, master, or head of a household who exercised control over women, children, slaves, and workers, and also owned resources like land and cattle.\nHence, Option {{CORR}} is correct.",
    "Defines Gahapati."
)
add_q(make_question(CHAPTER, "Rural Society", "In Pali Buddhist canonical texts, the master or head of a household who owned and managed land, cattle, and resources was designated as a:", opts, corr, sol))

add_q(make_match_question(
    CHAPTER, "Tamil Agrarian Terminology",
    "Match the ancient Tamil social category in List I with its description in List II as recorded in Sangam literature:",
    [("A", "Vellalar"), ("B", "Uzhavar"), ("C", "Adimai"), ("D", "Gahapati (Pali equivalent)")],
    [("i", "Large landowners"), ("ii", "Ploughmen"), ("iii", "Slaves / landless laborers"), ("iv", "Head of an agrarian household")],
    "A-i, B-ii, C-iii, D-iv",
    "A",
    "1. Sangam texts: Vellalar = large landowners (A-i), Uzhavar = ploughmen (B-ii), Adimai = slaves (C-iii), Gahapati = household head (D-iv).",
    "Matches Sangam agrarian categories."
))

opts, corr, sol = rotate_options(
    "Large landowners (vellalar) and ploughmen (uzhavar)",
    ["Royal tax collectors and Buddhist monks", "Foreign Greek cavalrymen and Roman miners", "Temple sculptors and municipal sweepers"],
    "B",
    "1. Sangam poems mention different categories of people based on land and technology: large landowners (vellalar) and ploughmen (uzhavar).\nHence, Option {{CORR}} is correct.",
    "Identifies Vellalar and Uzhavar as agrarian classes."
)
add_q(make_question(CHAPTER, "Rural Society", "In early south Indian rural society, social differentiation was primarily based on control over land between:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Extending agriculture to new areas, winning political allies, and asserting royal authority as state power weakened",
    ["Completely abolishing all private ownership of property", "Enforcing compulsory conversion of tribal populations to Roman mythology", "Repaying international commercial debts to Greek banks"],
    "C",
    "1. Historians debate land grants: some argue kings used grants to extend agriculture to new areas; others suggest rulers used grants to forge alliances when royal control was weakening.\nHence, Option {{CORR}} is correct.",
    "Analyzes historical motives behind royal land grants."
)
add_q(make_question(CHAPTER, "Land Grants and Society", "What strategic motives did ancient rulers have when making extensive land grants to Brahmanas and religious institutions?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Danguna village (in modern Madhya Pradesh / Maharashtra region)",
    ["Maski village in Karnataka", "Lumbini village in Nepal", "Aihole village in Karnataka"],
    "D",
    "1. The copperplate charter of Prabhavati Gupta grants the village of Danguna to a Brahmana teacher, Acharya Chanalasvamin.\nHence, Option {{CORR}} is correct.",
    "Identifies Danguna village in Prabhavati Gupta's land grant."
)
add_q(make_question(CHAPTER, "Land Grants and Women", "Which specific village was granted along with exemptions by Prabhavati Gupta in her celebrated copperplate inscription?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Puhar (Kaveripattinam)",
    ["Ujjayini", "Pataliputra", "Vidisha"],
    "A",
    "1. Puhar (Kaveripattinam) was a bustling coastal port town in early Tamilakam from where sea routes commenced.\nHence, Option {{CORR}} is correct.",
    "Identifies Puhar as prominent coastal port in Tamilakam."
)
add_q(make_question(CHAPTER, "Urban Centres", "Which prominent urban center in ancient south India was a major coastal port located at the mouth of the Kaveri river?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Mathura",
    ["Taxila", "Shravasti", "Rajgir"],
    "B",
    "1. Mathura was located at the crossroads of two major trade routes—from northwest to east and from north to south—and was a bustling commercial and cultural centre.\nHence, Option {{CORR}} is correct.",
    "Identifies Mathura as crossroads of trade routes."
)
add_q(make_question(CHAPTER, "Urban Centres", "Which ancient city was strategically situated at the intersection of two major trans-regional trade routes and also served as the second capital of the Kushanas?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Inscriptions recording gifts made by individuals and craftspeople to religious institutions",
    ["Royal decrees declaring emergency war mobilization", "Legal deeds documenting slave auctions", "Treaties partitioning conquered border territories"],
    "C",
    "1. Votive inscriptions record gifts made to religious institutions by guild members, weavers, potters, blacksmiths, and merchants.\nHence, Option {{CORR}} is correct.",
    "Defines Votive Inscriptions."
)
add_q(make_question(CHAPTER, "Urban Crafts and Guilds", "What are 'votive inscriptions' found in large numbers at early urban religious sites?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Shrenis (Guilds)",
    ["Panchayats", "Sabhas", "Samitis"],
    "D",
    "1. Guilds or shrenis were associations of craft producers and merchants that procured raw materials, regulated production, and marketed finished goods.\nHence, Option {{CORR}} is correct.",
    "Defines Shrenis (Guilds)."
)
add_q(make_question(CHAPTER, "Urban Crafts and Guilds", "Organized associations of craftspeople and merchants that regulated craft training, controlled quality, and managed trade in early cities were called:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Guild of silk weavers originally from Lata (Gujarat) who migrated to Dasapura and built a Sun temple",
    ["Guild of iron weapon smiths who manufactured Mauryan battle chariots", "Guild of maritime pearl divers based in Sri Lanka", "Association of Sanskrit grammarians residing at Nalanda University"],
    "A",
    "1. The famous Mandasor stone inscription (5th century CE) records the fascinating history of a guild of silk weavers who migrated from Lata (Gujarat) to Dasapura (Madhya Pradesh).\nHence, Option {{CORR}} is correct.",
    "Describes Mandasor stone inscription of silk weavers."
)
add_q(make_question(CHAPTER, "Urban Crafts and Guilds", "The famous 5th-century CE stone inscription found at Mandasor (Madhya Pradesh) records the history of which professional guild?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Salt, grain, cloth, metal ores, finished tools, spices (especially pepper), and medicinal herbs",
    ["Petroleum distillates, synthetic plastics, and computer circuits", "Firearms, gunpowder cannons, and ironclad warships", "Printed paper books and mechanical clockworks"],
    "B",
    "1. Commodities carried along trade routes included salt, grain, cloth, metal ores, spices (notably black pepper in high demand in Rome), and medicinal plants.\nHence, Option {{CORR}} is correct.",
    "Identifies commodities in early trade networks."
)
add_q(make_question(CHAPTER, "Trade across Subcontinent and Beyond", "Which commodities were extensively traded along trans-regional Indian and maritime routes reaching the Roman Empire?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Periplus of the Erythraean Sea",
    ["Geography by Strabo", "Anabasis of Alexander by Arrian", "Universal History by Polybius"],
    "C",
    "1. The Periplus of the Erythraean Sea was composed by an anonymous Greek sailor in the 1st century CE, describing ports and trade around the Indian Ocean ('Erythraean Sea').\nHence, Option {{CORR}} is correct.",
    "Identifies Periplus of the Erythraean Sea."
)
add_q(make_question(CHAPTER, "Trade across Subcontinent and Beyond", "Which ancient Greek maritime guide composed in the first century CE provides detailed navigational and commercial descriptions of Indian coastal ports?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Punch-marked coins made of silver and copper (c. 6th century BCE onwards)",
    ["Machine-minted milled gold sovereigns", "Cast-bronze heavy medallions", "Glazed ceramic tokens stamped with royal monograms"],
    "D",
    "1. The earliest coins in India were punch-marked coins made of silver and copper, stamped with symbols using special punches.\nHence, Option {{CORR}} is correct.",
    "Identifies punch-marked coins as earliest coinage."
)
add_q(make_question(CHAPTER, "Coins and Trade", "The earliest coins to be minted and circulated across the Indian subcontinent from c. 6th century BCE were:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Yaudheyas (martial tribal republics of Punjab and Haryana)",
    ["Satavahanas of Deccan", "Cholas of Thanjavur", "Cheras of Kerala"],
    "A",
    "1. Tribal republics such as the Yaudheyas of Punjab and Haryana (c. 1st century CE) issued thousands of copper coins, showing their active participation in trade.\nHence, Option {{CORR}} is correct.",
    "Identifies Yaudheyas as tribal republic issuing copper coins."
)
add_q(make_question(CHAPTER, "Coins and Trade", "Which tribal republic of Punjab and Haryana issued thousands of copper coins in the early centuries CE depicting the warrior deity Karttikeya?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Gupta rulers",
    ["Mauryan emperors", "Satavahana kings", "Pandyas of Madurai"],
    "B",
    "1. Some of the most spectacular gold coins in Indian history were issued by the Gupta rulers, remarkable for their artistic design and exceptional metallurgical purity.\nHence, Option {{CORR}} is correct.",
    "Identifies Guptas for spectacular pure gold coins."
)
add_q(make_question(CHAPTER, "Coins and Trade", "Which ancient Indian ruling dynasty issued some of the most artistically accomplished and metallurgically purest gold coins depicting kings performing sacrifices and playing the veena?", opts, corr, sol))

# =================================================================================================
# 4. Inscriptional Evidence & Limitations (Q61 - Q80)
# =================================================================================================

opts, corr, sol = rotate_options(
    "From around the 6th century CE onwards, finds of gold coins tapered off dramatically",
    ["Gold coins were completely replaced by printed paper bank currency", "Gold coins were declared illegal by Buddhist ecumenical councils", "The Roman Senate conquered the entire Indian subcontinent"],
    "C",
    "1. From c. 6th century CE onwards, finds of gold coins became fewer, sparking historical debate over whether this signified an economic crisis or new commercial arrangements.\nHence, Option {{CORR}} is correct.",
    "Notes decline in gold coin finds from 6th century CE."
)
add_q(make_question(CHAPTER, "Coins and Trade", "What significant numismatic trend is observed in the Indian archaeological record from approximately the sixth century CE onwards?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Bilingual coins issued by Indo-Greek kings bearing Greek and Kharosthi inscriptions",
    ["Bilingual papyrus rolls discovered in Alexandria", "Hieroglyphic royal monuments in Upper Egypt", "Cuneiform clay tablets preserved in Babylon"],
    "D",
    "1. Kharosthi was deciphered by European scholars by examining bilingual coins of Indo-Greek rulers, matching Greek letters against Kharosthi characters.\nHence, Option {{CORR}} is correct.",
    "Explains decipherment of Kharosthi via bilingual Indo-Greek coins."
)
add_q(make_question(CHAPTER, "Deciphering Kharosthi", "What primary archaeological artifact facilitated the successful decipherment of the Kharosthi script by epigraphists?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Letters may be faintly engraved, inscriptions may be damaged, reconstruction of words is uncertain, and elite inscriptions omit routine daily life events of ordinary peasants",
    ["Inscriptions were made of radioactive stone materials dangerous to inspect", "Ancient rulers were legally banned from carving true historical dates", "Inscriptions can only be translated using automated computer software"],
    "A",
    "1. Epigraphy has limitations: letters are faint, stone surfaces weather away, meanings of technical terms remain uncertain, and elite biases ignore common people's lives.\nHence, Option {{CORR}} is correct.",
    "Summarizes fundamental limitations of inscriptional evidence."
)
add_q(make_question(CHAPTER, "The Limitations of Inscriptional Evidence", "Which of the following highlights the primary technical and contextual limitations faced by historians when utilizing inscriptional sources?", opts, corr, sol))

add_q(make_sequence_question(
    CHAPTER, "Political Developments Chronology",
    "Arrange the following political and dynastic developments in chronological order:",
    [
        ("A", "Rise of the Mauryan Empire under Chandragupta Maurya"),
        ("B", "Alexander of Macedon invades the northwest of the subcontinent"),
        ("C", "Kushana rulers issue the earliest gold coins in the subcontinent"),
        ("D", "Establishment of the Gupta Empire in northern India")
    ],
    "B, A, C, D",
    "B",
    "1. Alexander's invasion (c. 327-325 BCE), Mauryan Empire (c. 321 BCE), Kushanas (1st century CE), Gupta Empire (4th century CE / c. 320 CE).",
    "Orders ancient political developments chronologically."
))

add_q(make_sequence_question(
    CHAPTER, "Epigraphic and Literary Milestones",
    "Arrange the following archaeological and epigraphic milestones in chronological order:",
    [
        ("A", "James Prinsep deciphers Asokan Brahmi"),
        ("B", "Alexander Cunningham is appointed the first Director-General of the Archaeological Survey of India"),
        ("C", "Founding of the Asiatic Society of Bengal by William Jones"),
        ("D", "John Marshall announces the discovery of the Indus Valley Civilisation")
    ],
    "C, A, B, D",
    "C",
    "1. Asiatic Society founded (1784), Prinsep deciphers Brahmi (1838), Cunningham becomes ASI Director-General (1861), Marshall announces discovery (1924).",
    "Orders archaeological and epigraphic milestones chronologically."
))

add_q(make_statement_question(
    CHAPTER, "Brahmi Decipherment",
    "Scholars who studied early inscriptions sometimes assumed these were in Sanskrit, although the earliest inscriptions were actually in Prakrit.",
    "It was only after decades of painstaking work by epigraphists that James Prinsep was able to read Asokan Brahmi in 1838.",
    1, "A",
    "1. Both statements are accurate NCERT facts regarding the historiography of deciphering Brahmi.",
    "Confirms both statements are correct regarding Brahmi decipherment."
))

add_q(make_assertion_question(
    CHAPTER, "Limitations of Epigraphy",
    "Epigraphists face significant challenges in deciphering ancient stone inscriptions.",
    "Letters are often very faintly engraved, stones are weathered, and large portions of inscriptions are damaged or missing.",
    1, "A",
    "1. Both (A) and (R) are true, and the physical degradation and faintness of inscriptions directly explain the challenges faced by epigraphists.",
    "Confirms (R) is the correct explanation of (A)."
))

opts, corr, sol = rotate_options(
    "A Prakrit word designating the common assembly or state council of a gana-sangha",
    ["A territorial term meaning the land where a jana (people, clan) sets its foot or settles", "A Sanskrit word referring exclusively to royal sacrificial altars", "A Persian legal code governing caravan merchants"],
    "B",
    "1. Janapada is a word used in both Prakrit and Sanskrit meaning the land where a jana (a people, clan, or tribe) sets its foot or settles.\nHence, Option {{CORR}} is correct.",
    "Defines Janapada."
)
add_q(make_question(CHAPTER, "Early States", "What does the ancient term 'Janapada' literally signify in early Indian political history?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sixth century BCE",
    ["Second century CE", "First century BCE", "Fourth century CE"],
    "C",
    "1. The 6th century BCE is regarded as a major turning point: early states, cities, growing use of iron, development of coinage, and emergence of Buddhism and Jainism.\nHence, Option {{CORR}} is correct.",
    "Identifies 6th century BCE as major turning point in early Indian history."
)
add_q(make_question(CHAPTER, "Early States", "Which era is widely designated by ancient historians as a major turning point marked by urbanization, coinage, iron tools, and the rise of Buddhism and Jainism?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Taxes were demanded on agricultural produce (usually one-sixth), trade, and artisanal crafts, while raiding neighboring states for tribute was considered legitimate",
    ["Kings lived entirely on voluntary donations from foreign Roman emperors", "Rulers distributed 100% of their private wealth to agricultural laborers every spring", "Taxation was legally restricted to Buddhist monasteries"],
    "D",
    "1. Dharmasutras advised that rulers could collect taxes from cultivators (often one-sixth of produce), traders, and artisans, and raids on neighboring states were considered legitimate means of acquiring wealth.\nHence, Option {{CORR}} is correct.",
    "Describes revenue and taxation norms in Dharmasutras."
)
add_q(make_question(CHAPTER, "Norms for Rulers", "According to early Brahmanical legal texts (Dharmasutras), how were rulers expected to generate state revenue?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A Prakrit word meaning 'pleasant to behold', used as a royal title by Asoka",
    ["A Sanskrit term denoting a military general of chariot divisions", "A Greek title given to ambassadors resident in Taxila", "A tribal title denoting the commander of war elephant brigades"],
    "A",
    "1. Piyadasi is a Prakrit title meaning 'pleasant to behold' or 'pleasing of appearance', widely used by Asoka in his inscriptions.\nHence, Option {{CORR}} is correct.",
    "Defines Piyadasi."
)
add_q(make_question(CHAPTER, "Asokan Epigraphy", "What does the imperial title 'Piyadasi' literally mean in the context of Asoka's inscriptions?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kharosthi was written from right to left, whereas Brahmi was written from left to right",
    ["Kharosthi was written from top to bottom, whereas Brahmi was circular", "Kharosthi was used only on gold coins, while Brahmi was used only on wood", "Kharosthi was invented by the British, while Brahmi was ancient"],
    "B",
    "1. Kharosthi script was written from right to left (derived from Aramaic), whereas Brahmi was written from left to right.\nHence, Option {{CORR}} is correct.",
    "Contrasts direction of Kharosthi and Brahmi scripts."
)
add_q(make_question(CHAPTER, "Decipherment of Scripts", "How did the writing direction of the Kharosthi script differ from that of the Brahmi script?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Alexander Cunningham",
    ["James Prinsep", "Colin Mackenzie", "Dayaram Sahni"],
    "C",
    "1. Alexander Cunningham, the first Director-General of the ASI, published a collection of Asokan inscriptions in 1877.\nHence, Option {{CORR}} is correct.",
    "Identifies Alexander Cunningham publishing Asokan inscriptions in 1877."
)
add_q(make_question(CHAPTER, "Epigraphy Historiography", "Which pioneer of Indian archaeology published the first comprehensive corpus of Asokan inscriptions (Inscriptiones Indicae) in 1877?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "D.C. Sircar",
    ["R.E.M. Wheeler", "V.A. Smith", "B.B. Lal"],
    "D",
    "1. D.C. Sircar was one of India's foremost 20th-century epigraphists who published extensive volumes on early Indian inscriptional studies.\nHence, Option {{CORR}} is correct.",
    "Identifies D.C. Sircar as eminent 20th century Indian epigraphist."
)
add_q(make_question(CHAPTER, "Epigraphy Historiography", "Which renowned Indian epigraphist and historian authored fundamental twentieth-century reference works on Indian epigraphy and inscriptions?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Pativedakas",
    ["Rajukas", "Yuktas", "Sthanikas"],
    "A",
    "1. In Rock Edict VI, Asoka states that reporters (pativedakas) should report the affairs of the people to him at all times and in all places.\nHence, Option {{CORR}} is correct.",
    "Identifies Pativedakas as reporters in Asokan edicts."
)
add_q(make_question(CHAPTER, "Asokan Administration", "In his inscriptions, Asoka commanded which special reporting officials to report public affairs to him at all hours, even when he was dining or in his private chambers?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kalinga Rock Edict at Dhauli / Jaugada",
    ["Rummindei Pillar Edict", "Nigali Sagar Pillar Edict", "Bhabru Minor Rock Edict"],
    "B",
    "1. In the special rock edicts at Dhauli and Jaugada in conquered Kalinga, Asoka expressed his paternal vision, declaring 'All men are my children'.\nHence, Option {{CORR}} is correct.",
    "Identifies Dhauli / Jaugada Kalinga edicts for 'All men are my children'."
)
add_q(make_question(CHAPTER, "Asokan Administration", "In which rock edicts located in Kalinga (Odisha) did Asoka proclaim the paternal maxim: 'All men are my children'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Rummindei Pillar Inscription in Nepal",
    ["Sanchi Pillar Inscription", "Allahabad Pillar Inscription", "Mehrauli Pillar Inscription"],
    "C",
    "1. At Rummindei (Lumbini, birthplace of the Buddha), Asoka reduced the land tax (bhaga) to one-eighth and exempted the village from religious cess (bali).\nHence, Option {{CORR}} is correct.",
    "Identifies Rummindei Pillar inscription recording tax reductions."
)
add_q(make_question(CHAPTER, "Asokan Administration", "Which pillar inscription records that Asoka visited the birthplace of the Buddha and reduced the land tax of the village to one-eighth?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Chanakya's Arthashastra",
    ["Megasthenes' Indica", "Asoka's Rock Edicts", "Vishakhadatta's Mudrarakshasa"],
    "D",
    "1. The Saptanga theory of the state (Swami, Amatya, Janapada, Durga, Kosha, Danda, Mitra) is propounded in Kautilya's Arthashastra.\nHence, Option {{CORR}} is correct.",
    "Identifies Saptanga theory in Kautilya's Arthashastra."
)
add_q(make_question(CHAPTER, "Statecraft and Political Theory", "The classical 'Saptanga Theory' of the state, conceptualizing the kingdom as an organism with seven limbs, is formulated in:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Mudrarakshasa composed by Vishakhadatta",
    ["Malavikagnimitram composed by Kalidasa", "Ratnavali composed by Harsha", "Mrichchhakatika composed by Shudraka"],
    "A",
    "1. Mudrarakshasa, a Sanskrit political drama by Vishakhadatta (c. 5th-6th century CE), narrates the political machinations of Chanakya to secure Chandragupta's throne.\nHence, Option {{CORR}} is correct.",
    "Identifies Vishakhadatta's Mudrarakshasa."
)
add_q(make_question(CHAPTER, "Literary Sources", "Which celebrated Sanskrit historical drama composed by Vishakhadatta dramatizes the overthrow of the Nanda dynasty by Chanakya and Chandragupta Maurya?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Mahasthan stone inscription in Bangladesh",
    ["Sohgaura copper plate in Uttar Pradesh", "Aihole stone inscription in Karnataka", "Girnar rock inscription in Gujarat"],
    "B",
    "1. The Sohgaura copper plate inscription (Gorakhpur, UP) contains orders regarding grain storage in state storehouses to mitigate famines and droughts.\nHence, Option {{CORR}} is correct.",
    "Identifies Sohgaura copper plate inscription on famine relief granaries."
)
add_q(make_question(CHAPTER, "Inscriptions and Famine Relief", "Which early Mauryan-period Brahmi inscription found in Gorakhpur district of Uttar Pradesh mentions the maintenance of two storehouses to relieve drought and famine?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Northern Black Polished Ware (NBPW)",
    ["Painted Grey Ware (PGW)", "Ochre Coloured Pottery (OCP)", "Black and Red Ware (BRW)"],
    "A",
    "1. Northern Black Polished Ware (NBPW), a fine deluxe pottery with a glossy black surface, is archaeological hallmark of 6th c. BCE urban centers.\nHence, Option {{CORR}} is correct.",
    "Identifies NBPW pottery associated with 6th century BCE urbanization."
)
add_q(make_question(CHAPTER, "Archaeology of Early Cities", "Which fine deluxe pottery characterized by a brilliant glossy surface was used by urban elites in the Ganga valley from c. 6th century BCE?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Satavahana rulers in the Deccan",
    ["Kushana kings in Gandhara", "Gupta emperors in Magadha", "Mauryan monarchs in Pataliputra"],
    "B",
    "1. Satavahana rulers were identified through metronymics (names derived from mothers, e.g. Gotamiputa, Vasisthiputa), although royal succession was generally patrilineal.\nHence, Option {{CORR}} is correct.",
    "Identifies Satavahanas for metronymics."
)
add_q(make_question(CHAPTER, "Royal Lineage and Metronymics", "Which dynasty of the Deccan famously used metronymics (names derived from mothers) in their royal titles, such as Gautamiputra and Vasishthiputra?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Milindapanho (Questions of King Milinda)",
    ["Dipavamsa", "Mahavamsa", "Buddhacharita"],
    "C",
    "1. The Milindapanho records the famous philosophical dialogue on Buddhism between the Indo-Greek king Menander (Milinda) and the Buddhist monk Nagasena.\nHence, Option {{CORR}} is correct.",
    "Identifies Milindapanho recording dialogue between Menander and Nagasena."
)
add_q(make_question(CHAPTER, "Indo-Greek Kingdoms", "Which famous Buddhist text records the philosophical dialogue between the Indo-Greek king Menander and the revered monk Nagasena?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kanishka I (c. 78 CE)",
    ["Vima Kadphises", "Huvishka", "Vasudeva"],
    "D",
    "1. The most celebrated Kushana ruler was Kanishka I (who ascended the throne around 78 CE, founding the Shaka era) and convened the Fourth Buddhist Council in Kashmir.\nHence, Option {{CORR}} is correct.",
    "Identifies Kanishka I convening the Fourth Buddhist Council."
)
add_q(make_question(CHAPTER, "Kushanas", "Which renowned Kushana ruler ascended the throne around 78 CE and convened the Fourth Buddhist Council in Kashmir?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Acting as ancient banking institutions that accepted monetary endowments and invested capital to pay perpetual interest",
    ["Operating modern stock markets for trading multinational corporate shares", "Issuing sovereign paper fiat currency under government authority", "Conducting mandatory military conscription of all agricultural peasants"],
    "A",
    "1. Inscriptions from western Indian cave temples (e.g. Nasik, Junnar) show that craft guilds (shrenis) functioned as banks, accepting perpetual endowments (akshayanivi) and paying annual interest for religious rituals.\nHence, Option {{CORR}} is correct.",
    "Describes banking functions of ancient craft guilds."
)
add_q(make_question(CHAPTER, "Urban Guilds", "Inscriptional evidence from western Indian rock-cut cave temples reveals that urban merchant guilds (shrenis) performed which financial function?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Bhabru (Bairat) Minor Rock Edict",
    ["Rummindei Pillar Inscription", "Nigali Sagar Pillar Inscription", "Rampurwa Bull Capital"],
    "B",
    "1. In the Bhabru (Bairat) edict in Rajasthan, Asoka specifically addresses the Buddhist Sangha, professing his faith in the Buddha, the Dhamma, and the Sangha.\nHence, Option {{CORR}} is correct.",
    "Identifies Bhabru edict expressing faith in Buddha, Dhamma, and Sangha."
)
add_q(make_question(CHAPTER, "Asokan Epigraphy", "In which specific minor rock edict does Asoka explicitly declare his personal devotion to the Buddhist Trinity: the Buddha, the Dhamma, and the Sangha?", opts, corr, sol))

# Verification of Unit 2
print(f"Total questions generated for Unit 2: {len(questions)}")
assert len(questions) == 80, f"Expected 80 questions, got {len(questions)}"

out_path = "mock/history_units/unit2.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved 80 questions to {out_path}!")
