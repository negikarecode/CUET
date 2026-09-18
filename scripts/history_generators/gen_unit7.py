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

CHAPTER = "An Imperial Capital: Vijayanagara"

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen_texts:
        raise ValueError(f"Duplicate question inside Unit 7: {q['questionText'][:60]}")
    if norm in pyq_set:
        raise ValueError(f"Question matches PYQ: {q['questionText'][:60]}")
    seen_texts.add(norm)
    q["questionNumber"] = len(questions) + 1
    questions.append(q)

print("Generating 60 unique questions for Unit 7: Vijayanagara Empire...")

# --- 1. Discovery and Geographical Setting ---

opts, corr, sol = rotate_options(
    "Colonel Colin Mackenzie in 1800",
    ["Alexander Greenlaw in 1856", "John Marshall in 1902", "Robert Sewell in 1900"],
    "A",
    "1. The ruins at Hampi were brought to light in 1800 by Colonel Colin Mackenzie, an engineer and antiquarian of the English East India Company.\nHence, Option {{CORR}} is correct.",
    "Identifies Colin Mackenzie discovering ruins of Hampi in 1800."
)
add_q(make_question(CHAPTER, "Discovery of Hampi", "Which antiquarian, engineer, and cartographer of the English East India Company brought the ruins of Hampi to modern light in 1800?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "First Surveyor General of India in 1815",
    ["Director General of the Archaeological Survey of India", "Governor General of Fort William", "Chief Collector of Madras Presidency"],
    "B",
    "1. Colin Mackenzie prepared the first survey map of Hampi and was appointed the first Surveyor General of India in 1815.\nHence, Option {{CORR}} is correct.",
    "Identifies Colin Mackenzie as first Surveyor General of India."
)
add_q(make_question(CHAPTER, "Colin Mackenzie", "What prominent imperial official position was Colin Mackenzie appointed to in 1815 after surveying Hampi and southern India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Tungabhadra",
    ["Krishna", "Kaveri", "Godavari"],
    "C",
    "1. The city of Vijayanagara stood on the south bank of the river Tungabhadra, which flows in a north-easterly direction.\nHence, Option {{CORR}} is correct.",
    "Identifies Tungabhadra as river flowing by Vijayanagara."
)
add_q(make_question(CHAPTER, "Geographical Setting", "Along the banks of which major river was the imperial capital of Vijayanagara strategically founded?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Pampadevi",
    ["Meenakshi", "Kamakhya", "Bhagavati"],
    "D",
    "1. The name Hampi is derived from the local mother goddess Pampadevi, who did penance in these hills to marry Virupaksha.\nHence, Option {{CORR}} is correct.",
    "Identifies goddess Pampadevi giving name to Hampi."
)
add_q(make_question(CHAPTER, "Origin of Hampi", "From which local mother goddess of the Tungabhadra region is the historical place-name 'Hampi' derived?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Harihara and Bukka in 1336",
    ["Krishnadeva Raya in 1509", "Rama Raya in 1565", "Deva Raya II in 1422"],
    "A",
    "1. According to tradition and epigraphic evidence, two brothers, Harihara and Bukka, founded the Vijayanagara Empire in 1336.\nHence, Option {{CORR}} is correct.",
    "Identifies Harihara and Bukka founding Vijayanagara in 1336."
)
add_q(make_question(CHAPTER, "Foundation of Vijayanagara", "Who were the two brothers who laid the foundation of the Vijayanagara Empire in 1336?", opts, corr, sol))

# --- 2. Water Resources & Fortifications ---

opts, corr, sol = rotate_options(
    "Kamalapuram tank",
    ["Sudarshana lake", "Hauzi-Khas", "Bhojpur lake"],
    "B",
    "1. The Kamalapuram tank, built in the early 15th century, irrigated nearby fields and channelled water through an aqueduct into the Royal Centre.\nHence, Option {{CORR}} is correct.",
    "Identifies Kamalapuram tank as key water reservoir."
)
add_q(make_question(CHAPTER, "Water Management", "Which prominent water reservoir built in the early 15th century irrigated agricultural fields and supplied water to the Royal Centre via an aqueduct?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Hiriya canal",
    ["Tungabhadra canal", "Nagalapuram canal", "Krishna canal"],
    "C",
    "1. The Hiriya canal drew water from a dam across the Tungabhadra and irrigated the cultivated valley separating the Sacred Centre from the Urban Core.\nHence, Option {{CORR}} is correct.",
    "Identifies Hiriya canal built by Sangama kings."
)
add_q(make_question(CHAPTER, "Water Management", "Which vital canal, built by kings of the Sangama dynasty, drew water from a dam across the Tungabhadra to irrigate the fertile valley between the Sacred Centre and Urban Core?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Seven concentric lines of fortification",
    ["Three earthen ramparts", "Two concentric circular trenches", "Twelve brick watchtowers"],
    "D",
    "1. Persian diplomat Abdur Razzaq Samarqandi noted in the 1440s that the city was surrounded by seven lines of forts.\nHence, Option {{CORR}} is correct.",
    "Identifies seven lines of fortification recorded by Abdur Razzaq."
)
add_q(make_question(CHAPTER, "Fortifications", "According to the 15th-century Persian envoy Abdur Razzaq Samarqandi, how many concentric lines of fortifications defended Vijayanagara?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The fortifications enclosed agricultural fields, cultivated tracts, and orchards along with urban settlements",
    ["The walls were constructed entirely of kiln-baked red bricks", "Mortar made of lime and cement was heavily used to bind the outer stones", "The walls excluded all water bodies and hill ranges"],
    "A",
    "1. Abdur Razzaq was struck by the fact that the outer line of fortification enclosed massive agricultural fields and gardens to withstand prolonged sieges.\nHence, Option {{CORR}} is correct.",
    "Explains agricultural fields inside Vijayanagara fortifications."
)
add_q(make_question(CHAPTER, "Fortifications", "What unique strategic feature of Vijayanagara's outer defensive walls astonished the Persian ambassador Abdur Razzaq?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Wedge-shaped stone blocks that held each other in place by gravity without any mortar",
    ["Sun-dried mud bricks reinforced with wooden poles", "Poured concrete faced with polished marble slabs", "Rubble masonry bound with bitumen and asphalt"],
    "B",
    "1. The masonry construction of Vijayanagara walls featured wedge-shaped stone blocks without mortar or cementing agent, fitting together snugly.\nHence, Option {{CORR}} is correct.",
    "Identifies wedge-shaped stone construction of walls."
)
add_q(make_question(CHAPTER, "Masonry Techniques", "How were the colossal granite stones of Vijayanagara's fortifications joined together without the use of mortar?", opts, corr, sol))

# --- 3. Dynasties & Kings ---

opts, corr, sol = rotate_options(
    "Sangama, Saluva, Tuluva, Aravidu",
    ["Saluva, Sangama, Aravidu, Tuluva", "Tuluva, Sangama, Saluva, Aravidu", "Sangama, Tuluva, Saluva, Aravidu"],
    "A",
    "1. The four ruling dynasties of Vijayanagara in chronological sequence were: Sangama (1336–1485), Saluva (1485–1505), Tuluva (1505–1570), and Aravidu (1570–mid-17th c.).\nHence, Option {{CORR}} is correct.",
    "Orders the four ruling dynasties of Vijayanagara."
)
add_q(make_question(CHAPTER, "Dynastic Succession", "Which of the following correctly lists the four ruling dynasties of the Vijayanagara Empire in chronological order?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Tuluva dynasty",
    ["Sangama dynasty", "Saluva dynasty", "Aravidu dynasty"],
    "C",
    "1. Krishnadeva Raya belonged to the Tuluva dynasty, ruling from 1509 to 1529.\nHence, Option {{CORR}} is correct.",
    "Identifies Krishnadeva Raya belonging to Tuluva dynasty."
)
add_q(make_question(CHAPTER, "Krishnadeva Raya", "To which ruling dynasty of Vijayanagara did the illustrious ruler Krishnadeva Raya (1509–1529) belong?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Acquisition of the fertile Raichur Doab between the Krishna and Tungabhadra rivers in 1512",
    ["Conquest of the Mughal capital at Agra", "Establishment of naval bases in Sri Lanka and Maldives", "Annexation of the Bengal Sultanate"],
    "A",
    "1. In 1512, Krishnadeva Raya secured the fertile land between the Krishna and Tungabhadra rivers known as the Raichur Doab.\nHence, Option {{CORR}} is correct.",
    "Identifies acquisition of Raichur Doab in 1512."
)
add_q(make_question(CHAPTER, "Military Campaigns", "Which strategic and highly fertile territory was annexed by Krishnadeva Raya in 1512, consolidating the empire's northern frontier?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Nagalapuram",
    ["Bhatkal", "Penukonda", "Chandragiri"],
    "B",
    "1. Krishnadeva Raya founded a suburban township near Vijayanagara called Nagalapuram, named in honor of his mother Nagala Devi.\nHence, Option {{CORR}} is correct.",
    "Identifies Nagalapuram founded by Krishnadeva Raya."
)
add_q(make_question(CHAPTER, "Urban Suburbs", "What was the name of the new suburban township established near the capital by Krishnadeva Raya in honor of his mother?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Amuktamalyada",
    ["Madhura Vijayam", "Rayavachakamu", "Manucharitamu"],
    "C",
    "1. Krishnadeva Raya composed Amuktamalyada, a celebrated work on statecraft and political morality, in Telugu.\nHence, Option {{CORR}} is correct.",
    "Identifies Amuktamalyada composed by Krishnadeva Raya."
)
add_q(make_question(CHAPTER, "Literary Works", "Which masterwork on statecraft and royal governance was authored by Krishnadeva Raya in the Telugu language?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Battle of Talikota (Rakshasi-Tangadi) in 1565",
    ["First Battle of Panipat in 1526", "Battle of Khanwa in 1527", "Battle of Haldighati in 1576"],
    "D",
    "1. In 1565, the Vijayanagara army commanded by Rama Raya was decisively routed at the Battle of Talikota (Rakshasi-Tangadi) by the combined forces of Bijapur, Ahmadnagar, and Golconda.\nHence, Option {{CORR}} is correct.",
    "Identifies Battle of Talikota in 1565."
)
add_q(make_question(CHAPTER, "Decline of Vijayanagara", "In which catastrophic military engagement in 1565 was the army of Vijayanagara routed by the combined forces of the Deccan Sultanates?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Rama Raya",
    ["Tirumala Raya", "Sadashiva Raya", "Aliya Rama Raya II"],
    "A",
    "1. Rama Raya, the powerful chief minister, led the Vijayanagara forces into battle at Rakshasi-Tangadi, having overplayed his diplomatic intrigues against the Sultanates.\nHence, Option {{CORR}} is correct.",
    "Identifies Rama Raya leading forces at Talikota."
)
add_q(make_question(CHAPTER, "Battle of Talikota", "Who was the chief minister and de facto ruler who led the imperial forces of Vijayanagara into the fatal Battle of Talikota?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Penukonda and later Chandragiri",
    ["Madurai and Thanjavur", "Kanchipuram and Tirupati", "Mysore and Srirangapatna"],
    "B",
    "1. Following the sacking of Vijayanagara, the surviving Aravidu dynasty shifted their capital eastwards, first to Penukonda and later to Chandragiri.\nHence, Option {{CORR}} is correct.",
    "Identifies shifting of capital to Penukonda and Chandragiri."
)
add_q(make_question(CHAPTER, "Later Vijayanagara", "To which fortified regional centers did the Aravidu dynasty relocate their imperial capital after the destruction of the city in 1565?", opts, corr, sol))

# --- 4. Foreign Travellers to Vijayanagara ---

opts, corr, sol = rotate_options(
    "Nicolo de Conti",
    ["Afanasii Nikitin", "Duarte Barbosa", "Domingo Paes"],
    "C",
    "1. Nicolo de Conti was an Italian merchant who visited Vijayanagara around 1420 and wrote early descriptions of the city.\nHence, Option {{CORR}} is correct.",
    "Identifies Nicolo de Conti visiting in 1420."
)
add_q(make_question(CHAPTER, "Foreign Travellers", "Which Italian merchant visited Vijayanagara around 1420, leaving behind one of the earliest Western travel accounts of the capital?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Domingo Paes",
    ["Nicolo de Conti", "Fernao Nuniz", "Abdur Razzaq"],
    "D",
    "1. Portuguese traveller Domingo Paes visited Vijayanagara around 1520 during the reign of Krishnadeva Raya and left an exceptionally detailed description of the city and court.\nHence, Option {{CORR}} is correct.",
    "Identifies Domingo Paes visiting during Krishnadeva Raya's reign."
)
add_q(make_question(CHAPTER, "Foreign Travellers", "Which Portuguese visitor spent considerable time at the court of Krishnadeva Raya around 1520, leaving vivid descriptions of the bazaar, palace, and military parades?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Fernao Nuniz",
    ["Duarte Barbosa", "Domingo Paes", "Afanasii Nikitin"],
    "A",
    "1. Fernao Nuniz, a Portuguese horse-trader, visited Vijayanagara in the 1530s during the reign of Achyuta Deva Raya and composed a detailed chronicle.\nHence, Option {{CORR}} is correct.",
    "Identifies Fernao Nuniz as horse-trader chronicler."
)
add_q(make_question(CHAPTER, "Foreign Travellers", "Which Portuguese horse-trader visited Vijayanagara during the 1530s and compiled an extensive historical chronicle of the empire's rulers?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Russia",
    ["Venice", "Portugal", "France"],
    "B",
    "1. Afanasii Nikitin was a Russian merchant from Tver who travelled through India in the 1470s, describing northern Deccan and Vijayanagara.\nHence, Option {{CORR}} is correct.",
    "Identifies Nikitin originating from Russia."
)
add_q(make_question(CHAPTER, "Foreign Travellers", "From which country did the 15th-century merchant Afanasii Nikitin travel before compiling his accounts of the Deccan and South India?", opts, corr, sol))

# --- 5. The Royal Centre & Monuments ---

opts, corr, sol = rotate_options(
    "Mahanavami Dibba",
    ["King's Audience Hall", "Lotus Mahal", "Hazara Rama platform"],
    "C",
    "1. The Mahanavami Dibba is a massive stone platform rising to about 40 feet from an 11,000 sq ft base, decorated with intricate bas-reliefs.\nHence, Option {{CORR}} is correct.",
    "Identifies Mahanavami Dibba as colossal ceremonial platform."
)
add_q(make_question(CHAPTER, "Royal Centre", "Which imposing ceremonial stone platform, rising to a height of 40 feet from an 11,000 square foot base, was located on one of the highest points of the Royal Centre?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Perform state rituals, witness wresting matches, and inspect the armies of his Nayakas during the 10-day autumn festival",
    ["Deliver daily theological lectures to temple priests", "Host European diamond merchants for auctions", "Conduct secret trials for court conspiracies"],
    "D",
    "1. On the Mahanavami festival (Dussehra/Navaratri), the king displayed his sovereignty, worshiped state icons, inspected troops, and received tribute and gifts from nayakas.\nHence, Option {{CORR}} is correct.",
    "Explains royal ceremonial rituals at Mahanavami Dibba."
)
add_q(make_question(CHAPTER, "Mahanavami Festival", "What grand political and religious function did the Vijayanagara monarch perform atop the Mahanavami Dibba?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Lotus Mahal",
    ["Queen's Bath", "Zanana Enclosure", "Elephant Stables"],
    "A",
    "1. The graceful structure with cusped arches and nine pavilions was named 'Lotus Mahal' by 19th-century British visitors, though Mackenzie suggested it was a council chamber.\nHence, Option {{CORR}} is correct.",
    "Identifies Lotus Mahal in the Royal Centre."
)
add_q(make_question(CHAPTER, "Secular Architecture", "Which picturesque secular pavilion in the Royal Centre, characterized by cusped arches and multi-tiered domes, was suggested by Colin Mackenzie to have been a council chamber?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Indo-Islamic architectural style characterized by vaulted arches and plaster domes",
    ["Pure classical Dravidian granite column style", "Gothic style influenced by Portuguese cathedrals", "Buddhist rock-cut cave style"],
    "B",
    "1. The Elephant Stables at Vijayanagara feature vaulted ceilings, cusped arches, and domes influenced by contemporary Sultanate architecture (Indo-Islamic).\nHence, Option {{CORR}} is correct.",
    "Identifies Indo-Islamic style of Elephant Stables."
)
add_q(make_question(CHAPTER, "Monumental Architecture", "What distinctive hybrid architectural style is prominently exhibited in the design and domes of the Elephant Stables at Vijayanagara?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Hazara Rama temple",
    ["Virupaksha temple", "Vitthala temple", "Achyutaraya temple"],
    "C",
    "1. The Hazara Rama temple was located in the Royal Centre and was meant to be used only by the king and his immediate family, featuring carved bas-relief scenes from the Ramayana.\nHence, Option {{CORR}} is correct.",
    "Identifies Hazara Rama temple reserved for royalty."
)
add_q(make_question(CHAPTER, "Royal Centre Temples", "Which exquisitely sculpted temple situated inside the Royal Centre was reserved primarily for the king and the royal family, featuring continuous panels illustrating the Ramayana?", opts, corr, sol))

# --- 6. Sacred Centre & Temple Architecture ---

opts, corr, sol = rotate_options(
    "Lord Shiva",
    ["Lord Rama", "Lord Vishnu", "Lord Murugan"],
    "D",
    "1. Virupaksha was a manifestation of Shiva, regarded as the guardian deity of the kingdom of Vijayanagara.\nHence, Option {{CORR}} is correct.",
    "Identifies Virupaksha as manifestation of Shiva."
)
add_q(make_question(CHAPTER, "Sacred Centre", "Under what manifestation was the principal guardian deity of the realm, Virupaksha, venerated at Hampi?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "'Sri Virupaksha' in the Kannada script",
    ["'Sri Rama' in Sanskrit", "'Sri Venkatesha' in Telugu", "'Narayana' in Tamil"],
    "A",
    "1. Vijayanagara kings claimed to rule on behalf of the god Virupaksha, and all royal orders were signed 'Sri Virupaksha' in the Kannada script.\nHence, Option {{CORR}} is correct.",
    "Identifies royal sign-off 'Sri Virupaksha' in Kannada."
)
add_q(make_question(CHAPTER, "Royal Legitimation", "What divine signature in the Kannada script was appended to all royal orders issued by the rulers of Vijayanagara?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Hindu Suratrana (Hindu Sultan)",
    ["Chhatrapati", "Samrat Chakravartin", "Maharajadhiraja"],
    "B",
    "1. Vijayanagara rulers adopted the title 'Hindu Suratrana', a Sanskritisation of the Arabic term 'Sultan', meaning 'Hindu Sultan'.\nHence, Option {{CORR}} is correct.",
    "Identifies royal title Hindu Suratrana."
)
add_q(make_question(CHAPTER, "Royal Titles", "Which Sanskritised political title derived from Arabic was proudly adopted by the rulers of Vijayanagara to indicate their imperial status?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Raya Gopurams",
    ["Vimanas", "Mandapas", "Shikharas"],
    "C",
    "1. The royal gateway towers built by Vijayanagara rulers were known as 'raya gopurams', whose immense height overshadowed the central sanctum tower (vimana).\nHence, Option {{CORR}} is correct.",
    "Identifies Raya Gopurams as monumental gateways."
)
add_q(make_question(CHAPTER, "Temple Architecture", "What technical name was given to the monumental gateway towers built by Vijayanagara monarchs at temple entrances, which signaled the presence of the temple from miles away?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kalyana Mandapa",
    ["Garbhagriha", "Ardhamandapa", "Antarala"],
    "D",
    "1. Kalyana mandapas were pillared halls constructed specifically to celebrate the divine marriages of gods and goddesses during annual temple festivals.\nHence, Option {{CORR}} is correct.",
    "Identifies Kalyana Mandapa as divine wedding hall."
)
add_q(make_question(CHAPTER, "Temple Architecture", "Which ceremonial pillared hall inside southern temple complexes was dedicated to celebrating the divine matrimonial ceremonies of deities?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Monolithic stone chariot shrine standing in the temple courtyard",
    ["Tallest spire in Asia constructed out of white marble", "Subterranean crypt decorated with gold leaf", "Natural spring emerging inside the sanctum sanctorum"],
    "A",
    "1. The Vitthala temple at Hampi is internationally renowned for its sculpted stone chariot shrine standing prominently within the open courtyard.\nHence, Option {{CORR}} is correct.",
    "Identifies stone chariot in Vitthala temple."
)
add_q(make_question(CHAPTER, "Vitthala Temple", "What world-famous monolithic architectural feature forms the centerpiece of the courtyard of the Vitthala temple at Hampi?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Lord Vishnu primarily worshipped in Maharashtra",
    ["Lord Shiva worshipped in Kashmir", "Goddess Kali worshipped in Bengal", "Lord Skanda worshipped in Tamil Nadu"],
    "B",
    "1. Vitthala was a form of Vishnu generally worshipped in Maharashtra; the establishment of his worship in Vijayanagara reflected imperial cultural assimilation.\nHence, Option {{CORR}} is correct.",
    "Identifies Vitthala as Maharashtrian form of Vishnu."
)
add_q(make_question(CHAPTER, "Vitthala Cult", "Which deity, traditionally worshipped in Maharashtra, was introduced into Vijayanagara temple architecture as a testament to the empire's cosmopolitan patronage?", opts, corr, sol))

# --- 7. The Amara-Nayaka System ---

opts, corr, sol = rotate_options(
    "The Iqta system of the Delhi Sultanate",
    ["The Mansabdari system of the Mughals", "The Jagirdari system of Marathas", "The Feudal fief system of medieval France"],
    "C",
    "1. Historians consider the Amara-Nayaka system to be a major political innovation of Vijayanagara, heavily derived from the Iqta system of the Delhi Sultanate.\nHence, Option {{CORR}} is correct.",
    "Identifies Iqta system as prototype of Amara-Nayaka system."
)
add_q(make_question(CHAPTER, "Amara-Nayaka System", "From which administrative and revenue system of the Delhi Sultanate was the Amara-Nayaka system of Vijayanagara largely derived?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "They collected taxes from peasants and artisans, maintaining a specified troop contingent and paying annual tribute to the king",
    ["They were hereditary temple priests in charge of chanting rituals", "They were guild merchants who monopolized the diamond trade", "They were foreign diplomats residing permanently in the capital"],
    "D",
    "1. Amara-nayakas were military commanders given territories (amaram); they retained revenue for personal upkeep, troops, and horses, remitting tribute to the raya.\nHence, Option {{CORR}} is correct.",
    "Defines role of Amara-nayakas."
)
add_q(make_question(CHAPTER, "Amara-Nayaka System", "What were the primary administrative and military responsibilities assigned to an Amara-nayaka in Vijayanagara?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Personally appeared in the royal court to deliver tribute and present gifts",
    ["Conducted military invasions of neighboring kingdoms without permission", "Appointed the high priest of the Virupaksha temple", "Issued gold coins bearing their personal portraits"],
    "A",
    "1. Amara-nayakas sent tribute annually to the king and personally appeared at the court during festivals with gifts to express loyalty.\nHence, Option {{CORR}} is correct.",
    "Describes annual tribute obligation of nayakas."
)
add_q(make_question(CHAPTER, "Amara-Nayaka Obligations", "How did the Amara-nayakas demonstrate their formal vassalage and loyalty to the Vijayanagara monarch each year?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "By occasionally transferring them from one territory to another",
    ["By forcing them to surrender all personal wealth upon retirement", "By requiring them to take oaths of celibacy", "By executing one member of each nayaka family every five years"],
    "B",
    "1. Kings maintained sovereign control over nayakas by occasionally transferring them from one territory to another to prevent them from building local autonomous bases.\nHence, Option {{CORR}} is correct.",
    "Identifies king's power to transfer nayakas."
)
add_q(make_question(CHAPTER, "Royal Control over Nayakas", "How did strong Vijayanagara monarchs effectively assert their supremacy over potentially rebellious Amara-nayakas?", opts, corr, sol))

# --- 8. Trade, Horses, and Markets ---

opts, corr, sol = rotate_options(
    "Kudirai Chettis",
    ["Nanadesis", "Manigramam", "Banjaras"],
    "C",
    "1. Local merchants who were actively involved in horse trade in south India were known as 'Kudirai Chettis' (literally horse merchants).\nHence, Option {{CORR}} is correct.",
    "Identifies Kudirai Chettis as horse merchants."
)
add_q(make_question(CHAPTER, "Horse Trade", "What specific local term was used in south India for indigenous merchants who specialized in the lucrative import and trade of war horses?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "They introduced superior firearm technology and controlled Arabian horse shipments via Goa",
    ["They possessed exclusive rights to mine diamonds at Golconda", "They constructed the monumental raya gopurams across Tamil Nadu", "They held the supreme command of the Vijayanagara navy"],
    "D",
    "1. The Portuguese arrival in 1510 on the west coast gave them control of the horse trade and superior musketry/firearms, making them valuable trading partners for Krishnadeva Raya.\nHence, Option {{CORR}} is correct.",
    "Explains importance of Portuguese horse and gun trade."
)
add_q(make_question(CHAPTER, "Portuguese Trade", "Why were the Portuguese, who established trading settlements on the western coast from 1498 onwards, courted by Vijayanagara rulers?", opts, corr, sol))

# --- 9. Statement & Assertion Questions ---

add_q(make_statement_question(
    CHAPTER, "Vijayanagara Fortifications",
    "The outer fortifications of Vijayanagara enclosed vast swathes of cultivated fields, orchards, and agricultural valleys.",
    "Medieval sieges were intended to starve the defenders into submission, so rulers built massive granaries and agricultural fields within the walls.",
    1,
    "A",
    "1. Statement I is correct: Foreign accounts confirm that extensive agricultural fields were fortified inside the city.\n2. Statement II is correct: Protecting fields inside the walls prevented starvation during months-long sieges.\nHence, Both Statement I and Statement II are correct.",
    "Analyzes the strategic purpose of agricultural fortifications."
))

add_q(make_statement_question(
    CHAPTER, "Religious Legitimacy",
    "All royal orders issued by Vijayanagara kings were signed in the name of 'Sri Virupaksha'.",
    "Vijayanagara rulers completely banned all Islamic customs, architecture, and Arabic terminology throughout their dominions.",
    3,
    "B",
    "1. Statement I is correct: Royal edicts were signed 'Sri Virupaksha' in Kannada script.\n2. Statement II is incorrect: They used the title 'Hindu Suratrana', built Indo-Islamic structures (Elephant Stables), and employed Muslim archers and horsemen.",
    "Examines royal legitimation and cosmopolitan court practices."
))

add_q(make_assertion_question(
    CHAPTER, "Battle of Talikota Causes",
    "The Battle of Talikota (1565) resulted in the crushing defeat of Vijayanagara and the plunder of the capital.",
    "Chief Minister Rama Raya's policy of playing off one Deccan Sultan against another backfired, prompting the Sultans to form an allied coalition.",
    1,
    "A",
    "1. Assertion (A) is true: The city of Vijayanagara was abandoned and sacked following the 1565 battle.\n2. Reason (R) is true: Rama Raya's diplomatic intrigues alienated the Sultans, who resolved their rivalries to defeat him.\n3. Reason (R) directly explains Assertion (A).",
    "Explains political background of the 1565 Battle of Talikota."
))

add_q(make_assertion_question(
    CHAPTER, "Sacred Centre Location",
    "The Sacred Centre of Vijayanagara was established along the rocky northern banks of the Tungabhadra river.",
    "The rocky granite landscape was traditionally associated with the monkey kingdom of Kishkindha mentioned in the Ramayana.",
    1,
    "A",
    "1. Assertion (A) is true: The Sacred Centre containing temples was situated on the river banks.\n2. Reason (R) is true: Local traditions associated these hills with Vali, Sugriva, and the Kishkindha episode of the Ramayana.\n3. Reason (R) directly explains Assertion (A).",
    "Analyzes religious geography of the Sacred Centre."
))

# --- 10. Match and Sequence Questions ---

add_q(make_match_question(
    CHAPTER, "Travellers to Vijayanagara",
    "Match the foreign traveller in List I with their country of origin in List II:",
    [
        ("A", "Nicolo de Conti"),
        ("B", "Abdur Razzaq Samarqandi"),
        ("C", "Afanasii Nikitin"),
        ("D", "Fernao Nuniz")
    ],
    [
        ("i", "Persia (Herat)"),
        ("ii", "Italy (Venice)"),
        ("iii", "Portugal"),
        ("iv", "Russia")
    ],
    "A-ii, B-i, C-iv, D-iii",
    "C",
    "1. Nicolo de Conti = Italy (A-ii), Abdur Razzaq = Persia/Herat (B-i), Nikitin = Russia (C-iv), Nuniz = Portugal (D-iii).",
    "Matches foreign travellers with countries of origin."
))

add_q(make_match_question(
    CHAPTER, "Monuments and Locations",
    "Match the monument in List I with its architectural character or function in List II:",
    [
        ("A", "Mahanavami Dibba"),
        ("B", "Lotus Mahal"),
        ("C", "Hazara Rama"),
        ("D", "Vitthala Temple")
    ],
    [
        ("i", "Council chamber with cusped arches and domes"),
        ("ii", "Ceremonial 40-foot platform for the Dussehra festival"),
        ("iii", "Courtyard featuring a monolithic stone chariot"),
        ("iv", "Temple inside the Royal Centre reserved for the king's family")
    ],
    "A-ii, B-i, C-iv, D-iii",
    "A",
    "1. Mahanavami Dibba = Ceremonial platform (A-ii), Lotus Mahal = Council chamber (B-i), Hazara Rama = Royal temple (C-iv), Vitthala Temple = Stone chariot (D-iii).",
    "Matches Vijayanagara monuments with architectural functions."
))

add_q(make_match_question(
    CHAPTER, "Key Historical Figures",
    "Match the historical figure in List I with their identity in List II:",
    [
        ("A", "Harihara I"),
        ("B", "Krishnadeva Raya"),
        ("C", "Rama Raya"),
        ("D", "Colin Mackenzie")
    ],
    [
        ("i", "Chief Minister during the Battle of Talikota in 1565"),
        ("ii", "Co-founder of Vijayanagara Empire in 1336"),
        ("iii", "Antiquarian who discovered the ruins of Hampi in 1800"),
        ("iv", "Greatest Tuluva ruler who composed Amuktamalyada")
    ],
    "A-ii, B-iv, C-i, D-iii",
    "B",
    "1. Harihara I = Co-founder 1336 (A-ii), Krishnadeva Raya = Tuluva ruler (B-iv), Rama Raya = Talikota 1565 (C-i), Colin Mackenzie = Hampi 1800 (D-iii).",
    "Matches historical figures of Vijayanagara with achievements."
))

add_q(make_sequence_question(
    CHAPTER, "Chronology of Vijayanagara Dynasties",
    "Arrange the ruling dynasties of Vijayanagara in correct chronological sequence:",
    [
        ("A", "Saluva dynasty"),
        ("B", "Sangama dynasty"),
        ("C", "Aravidu dynasty"),
        ("D", "Tuluva dynasty")
    ],
    "B, A, D, C",
    "D",
    "1. Chronological sequence: Sangama (1336-1485) -> Saluva (1485-1505) -> Tuluva (1505-1570) -> Aravidu (1570-1646).",
    "Orders the four dynasties of Vijayanagara."
))

add_q(make_sequence_question(
    CHAPTER, "Key Events in Vijayanagara History",
    "Arrange the following landmark events in Vijayanagara history in chronological order:\nI. Founding of the empire by Harihara and Bukka\nII. Visit of Persian ambassador Abdur Razzaq Samarqandi\nIII. Accession of Krishnadeva Raya to the throne\nIV. Disastrous Battle of Talikota (Rakshasi-Tangadi)",
    [
        ("A", "I"),
        ("B", "II"),
        ("C", "III"),
        ("D", "IV")
    ],
    "A, B, C, D",
    "A",
    "1. Chronology: Founding of empire (1336) -> Abdur Razzaq visit (1443) -> Accession of Krishnadeva Raya (1509) -> Battle of Talikota (1565).",
    "Orders landmark events in Vijayanagara history."
))

# --- 11. Additional Diverse Questions to Reach 60 ---

opts, corr, sol = rotate_options(
    "Gajapati rulers of Orissa",
    ["Mughal emperors of Delhi", "Zamorin of Calicut", "Nayakas of Madurai"],
    "A",
    "1. In 1514, Krishnadeva Raya subdued the Gajapati rulers of Orissa and recovered coastal fortresses such as Udayagiri.\nHence, Option {{CORR}} is correct.",
    "Identifies Gajapati rulers subdued by Krishnadeva Raya."
)
add_q(make_question(CHAPTER, "Military Campaigns", "Which eastern ruling dynasty, renowned for its formidable war-elephant contingents, was subdued by Krishnadeva Raya in 1514?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Lord of Elephants",
    ["Lord of Horses", "Lord of Chariots", "Lord of the Earth"],
    "B",
    "1. The title 'Gajapati' literally signifies 'Lord of Elephants', reflecting the military importance of elephants in Orissa's statecraft.\nHence, Option {{CORR}} is correct.",
    "Explains the meaning of Gajapati."
)
add_q(make_question(CHAPTER, "Royal Epithets", "What was the literal meaning of the royal title 'Gajapati', held by the ruling monarchs of 15th-century Orissa?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ashvapati (Lord of Horses)",
    ["Narapati (Lord of Men)", "Gajapati (Lord of Elephants)", "Bhupati (Lord of the Earth)"],
    "C",
    "1. In contemporary popular traditions, the Deccan Sultans were known as Ashvapatis (lords of horses), while the Rayas of Vijayanagara were called Narapatis (lords of men).\nHence, Option {{CORR}} is correct.",
    "Identifies title Ashvapati for Deccan Sultans."
)
add_q(make_question(CHAPTER, "Popular Regional Titles", "In the political parlance of the Deccan, what title was traditionally applied to the Deccan Sultans because of their access to elite cavalry?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Narapati (Lord of Men)",
    ["Ashvapati", "Gajapati", "Chhatrapati"],
    "D",
    "1. The Rayas of Vijayanagara were traditionally described as 'Narapatis' (lords of men) due to their vast populations and infantry armies.\nHence, Option {{CORR}} is correct.",
    "Identifies Narapati as title of Vijayanagara Rayas."
)
add_q(make_question(CHAPTER, "Popular Regional Titles", "What traditional epithet was applied to the Rayas of Vijayanagara in local historical lore, reflecting their immense manpower?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Alexander Greenlaw in 1856",
    ["Colin Mackenzie in 1800", "J.F. Fleet in 1876", "John Marshall in 1902"],
    "A",
    "1. Alexander Greenlaw produced the earliest extensive photographic documentation of the monuments at Hampi in 1856.\nHence, Option {{CORR}} is correct.",
    "Identifies Alexander Greenlaw's 1856 photographs."
)
add_q(make_question(CHAPTER, "Photographic Documentation", "Which pioneer photographer took the first comprehensive set of photographs of the ruins of Hampi in 1856?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "J.F. Fleet in 1876",
    ["Colin Mackenzie in 1800", "Alexander Greenlaw in 1856", "John Marshall in 1920"],
    "B",
    "1. Epigraphist J.F. Fleet began the systematic recording and transcription of temple inscriptions at Hampi in 1876.\nHence, Option {{CORR}} is correct.",
    "Identifies J.F. Fleet recording inscriptions in 1876."
)
add_q(make_question(CHAPTER, "Epigraphic Studies", "Which epigraphist began systematically documenting and publishing the stone inscriptions found across the temple walls of Hampi in 1876?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A hall built in front of the main shrine to mark his accession",
    ["The outermost fortification wall with seven gates", "The grand monolithic stone chariot", "The subterranean royal aqueduct from Tungabhadra"],
    "C",
    "1. Krishnadeva Raya marked his accession in 1509 by constructing a grand hall in front of the sanctum of the Virupaksha temple and building the eastern gopuram.\nHence, Option {{CORR}} is correct.",
    "Identifies Krishnadeva Raya building the Virupaksha hall."
)
add_q(make_question(CHAPTER, "Virupaksha Temple Additions", "What major architectural addition was made to the Virupaksha temple by Krishnadeva Raya to commemorate his accession in 1509?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "To display images of deities for special ceremonies and music performances",
    ["To store weapons and cannon gunpowder", "To serve as quarters for foreign envoys", "To stable royal war elephants during sieges"],
    "D",
    "1. The pillared halls in the Virupaksha temple were used for various purposes: swings for deities, marriage ceremonies, and musical performances.\nHence, Option {{CORR}} is correct.",
    "Explains functional use of temple halls."
)
add_q(make_question(CHAPTER, "Temple Functions", "For what primary ceremonial purpose were the elaborate pillared mandapas in the Virupaksha temple complex utilised?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "They retained a portion of revenue to maintain personal households and required military contingents",
    ["They deposited 100 percent of all collected taxes into the imperial treasury", "They were unpaid volunteers serving purely out of religious piety", "They were paid cash salaries monthly by the imperial royal treasury"],
    "A",
    "1. Amara-nayakas collected revenue from peasants and artisans, retaining a defined share for personal expenses and maintaining horses and troops.\nHence, Option {{CORR}} is correct.",
    "Explains revenue retention by Amara-nayakas."
)
add_q(make_question(CHAPTER, "Amara-Nayaka Economy", "How were the Amara-nayakas remunerated for their administrative governance and military upkeep under the Vijayanagara system?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Declared independence and established autonomous regional states",
    ["Surrendered all provincial forts peacefully to the Deccan Sultans", "Dissolved their armies and became temple ascetics", "Formed an alliance with the Portuguese to reconquer Hampi"],
    "B",
    "1. Following the destruction of the central authority in 1565, several powerful nayakas (e.g. in Madurai, Thanjavur, Senji) established independent kingdoms.\nHence, Option {{CORR}} is correct.",
    "Describes nayakas establishing independent kingdoms."
)
add_q(make_question(CHAPTER, "Post-1565 Nayakas", "What was the political reaction of many provincial nayakas in the southern territories after the collapse of the imperial capital in 1565?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Declared a World Heritage Site by UNESCO in 1986",
    ["Declared a National Defense Sanctuary in 1947", "Designated the capital of Karnataka state in 1956", "Reconstructed as a functional military naval base in 1971"],
    "C",
    "1. In 1986, the monumental ruins at Hampi were officially declared a World Heritage Site by UNESCO, recognising their universal cultural significance.\nHence, Option {{CORR}} is correct.",
    "Identifies Hampi declared UNESCO World Heritage Site in 1986."
)
add_q(make_question(CHAPTER, "Conservation of Hampi", "In which year was the archaeological and architectural site of Hampi formally declared a World Heritage Site by UNESCO?", opts, corr, sol))

# Verification of Unit 7
print(f"Total questions generated for Unit 7: {len(questions)}")
assert len(questions) == 60, f"Expected 60 questions, got {len(questions)}"

out_path = "mock/history_units/unit7.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved 60 questions to {out_path}!")
