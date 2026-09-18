import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.history_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text,
    get_pyq_normalized_set
)

CHAPTER = "Thinkers, Beliefs and Buildings: Cultural Developments (c. 600 BCE - 600 CE)"
questions = []
seen = set()
pyq_seen = get_pyq_normalized_set()

# Load prior units
for u in ["unit1.json", "unit2.json", "unit3.json"]:
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

print("Generating 80 unique questions for Unit 4: Thinkers, Beliefs and Buildings...")

# =================================================================================================
# 1. Sanchi Stupa & 6th Century BCE Philosophical Landscape (Q1 - Q20)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Shahjehan Begum and her successor Sultan Jehan Begum",
    ["Razia Sultan and Chand Bibi", "Nur Jahan and Mumtaz Mahal", "Jahanara and Roshanara"],
    "A",
    "1. The rulers of Bhopal, Shahjehan Begum and Sultan Jehan Begum, provided funds for the preservation of the ancient stupa complex at Sanchi.\nHence, Option {{CORR}} is correct.",
    "Identifies Shahjehan Begum and Sultan Jehan Begum preserving Sanchi Stupa."
)
add_q(make_question(CHAPTER, "Sanchi Stupa Preservation", "Which 19th-century female rulers of Bhopal state provided generous financial grants for the preservation of the Sanchi Stupa?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Carefully prepared plaster-cast replicas satisfied them, leaving the original stone gateways intact at the site",
    ["British soldiers were militarily defeated by the Bhopal state army", "The stone gateways were accidentally dropped and destroyed in the Narmada river", "The French government went bankrupt and cancelled all antiquities shipments"],
    "B",
    "1. Both the French and the British sought to take the eastern gateway to Europe, but were satisfied with carefully prepared plaster-cast copies, preserving the original at Sanchi.\nHence, Option {{CORR}} is correct.",
    "Explains how plaster casts saved original Sanchi gateways."
)
add_q(make_question(CHAPTER, "Sanchi Stupa Preservation", "Why were the ornate stone gateways of Sanchi Stupa not removed to museums in London and Paris during the nineteenth century?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Zarathustra in Iran, Kong Zi (Confucius) in China, Socrates, Plato and Aristotle in Greece, and Mahavira and Gautama Buddha in India",
    ["Alexander the Great, Julius Caesar, Augustus, and Cleopatra", "Martin Luther, John Calvin, Copernicus, and Galileo Galilei", "Karl Marx, Friedrich Engels, Vladimir Lenin, and Adam Smith"],
    "C",
    "1. The mid-first millennium BCE is seen as a turning point in world history: thinkers like Zarathustra, Confucius, Socrates, Plato, Aristotle, Mahavira, and Buddha emerged.\nHence, Option {{CORR}} is correct.",
    "Identifies global thinkers of the mid-first millennium BCE."
)
add_q(make_question(CHAPTER, "Global Philosophical Milieu", "Which group of transformative religious and philosophical thinkers emerged globally in the mid-first millennium BCE?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kutagarashala (literally, a hut with a pointed roof) or in groves where travelling mendicants halted",
    ["Inside fortified stone citadels guarded by cavalry", "On board merchant cargo ships sailing to Rome", "Deep inside subterranean copper mines in Rajasthan"],
    "D",
    "1. Debates between teachers of rival philosophical sects took place in kutagarashalas—literally, huts with a pointed roof—or in groves where mendicants stayed.\nHence, Option {{CORR}} is correct.",
    "Defines Kutagarashala as philosophical debate venue."
)
add_q(make_question(CHAPTER, "Philosophical Debates", "In the 6th century BCE, philosophical debates between rival wandering teachers frequently took place in specialized meeting halls termed:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Makkhali Gosala",
    ["Ajita Kesakambalin", "Purana Kassapa", "Pakudha Kacchayana"],
    "A",
    "1. Makkhali Gosala was the prominent teacher of the Ajivika sect, known for fatalism (niyati), believing everything is predetermined.\nHence, Option {{CORR}} is correct.",
    "Identifies Makkhali Gosala leading the Ajivikas."
)
add_q(make_question(CHAPTER, "Heterodox Sects", "Which ancient philosopher founded the fatalist sect known as the Ajivikas, who believed that human destiny was entirely governed by niyati (fate)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ajita Kesakambalin",
    ["Makkhali Gosala", "Sanjaya Belatthiputta", "Vardhamana Mahavira"],
    "B",
    "1. Ajita Kesakambalin belonged to the Lokayata or materialist tradition, arguing that a human being is made of the four elements and denying life after death.\nHence, Option {{CORR}} is correct.",
    "Identifies Ajita Kesakambalin as materialist Lokayata teacher."
)
add_q(make_question(CHAPTER, "Heterodox Sects", "Which heterodox teacher belonged to the materialist Charvaka/Lokayata school, famously asserting that generous gifts and sacrifices were merely doctrines of fools?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Rajasuya and Ashvamedha",
    ["Agnihotra and Sandhyavandana", "Upanayana and Vivaha", "Antyeshti and Shraddha"],
    "C",
    "1. Elaborate sacrifices like the Rajasuya (consecration) and Ashvamedha (horse sacrifice) were performed by powerful chiefs and kings who depended on Brahmana priests.\nHence, Option {{CORR}} is correct.",
    "Identifies Rajasuya and Ashvamedha royal sacrifices."
)
add_q(make_question(CHAPTER, "Vedic Sacrificial Tradition", "Which two elaborate, prestigious Vedic sacrifices were performed by early kings and chiefs to assert sovereign political supremacy?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Questions regarding the meaning of life, the nature of the ultimate reality (atman and brahman), and whether life existed after death",
    ["Techniques for smelting deep iron ore into steel weapons", "Methods for navigating sailing ships across the Mediterranean", "Astronomical codes for calculating solar system planetary orbits"],
    "D",
    "1. Thinkers in the Upanishads were curious about the meaning of life, the possibility of life after death, rebirth, and whether atman and brahman were one.\nHence, Option {{CORR}} is correct.",
    "Summarizes spiritual enquiries in the Upanishads."
)
add_q(make_question(CHAPTER, "Upanishadic Enquiries", "Which profound philosophical questions were explored by sages and thinkers in the early classical Upanishads?", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Vedic Traditions",
    "The early Vedic tradition was represented by the composition of the Rigveda between c. 1500 and 1000 BCE.",
    "The Rigveda consists of hymns in praise of deities, especially Agni, Indra, and Soma.",
    1, "A",
    "1. Both statements are true NCERT facts: Rigvedic hymns praise Agni, Indra, and Soma, composed between c. 1500 and 1000 BCE.",
    "Confirms both statements are correct regarding the Rigveda."
))

add_q(make_assertion_question(
    CHAPTER, "Sanchi Stupa Preservation",
    "The monuments at Sanchi survived nineteenth-century colonial antiquities extraction largely intact.",
    "The Begums of Bhopal provided substantial funds for a museum, guest house, and publication of archaeological volumes by John Marshall.",
    1, "A",
    "1. Both (A) and (R) are true, and Bhopal state's active financial support and patronage directly preserved Sanchi from being dismantled like Amaravati.",
    "Confirms (R) is the correct explanation of (A)."
))

# =================================================================================================
# 2. Jainism & The Teachings of Mahavira (Q21 - Q40)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Twenty-four Tirthankaras",
    ["Ten Gurus", "Twelve Bodhisattvas", "Eighteen Rishis"],
    "A",
    "1. According to Jaina tradition, Vardhamana Mahavira was preceded by 23 other teachers, known as Tirthankaras—those who guide men and women across the river of existence.\nHence, Option {{CORR}} is correct.",
    "Identifies 24 Tirthankaras in Jaina tradition."
)
add_q(make_question(CHAPTER, "Jaina Tradition", "In Jaina tradition, Vardhamana Mahavira is venerated as the last in a lineage of how many Tirthankaras?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Those who guide men and women across the river of existence (samsara)",
    ["Conquering generals who expand sovereign territorial boundaries", "Monastic treasurers who collect grain dues from lay farmers", "Court astrologers who predict cosmic eclipses"],
    "B",
    "1. Tirthankara literally means 'maker of the ford'—those who guide men and women across the river of mundane existence to liberation.\nHence, Option {{CORR}} is correct.",
    "Defines Tirthankara."
)
add_q(make_question(CHAPTER, "Jaina Tradition", "What does the sacred term 'Tirthankara' literally signify in Jaina philosophical doctrine?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The entire world is animated; even stones, rocks, and water have life",
    ["Only human beings possess conscious souls; nature is lifeless matter", "All creatures must be sacrificed annually at sacred temple altars", "Warfare is the highest spiritual duty for all householders"],
    "C",
    "1. The most important idea in Jainism is that the entire world is animated: even stones, rocks, and water possess life.\nHence, Option {{CORR}} is correct.",
    "States core Jaina concept of universal animation."
)
add_q(make_question(CHAPTER, "Philosophy of Jainism", "Which foundational metaphysical principle forms the cornerstone of Jaina philosophy?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ahimsa (non-injury to all living beings, especially humans, animals, plants, and insects)",
    ["Rajasuya (performance of imperial royal horse consecrations)", "Kanyadana (mandatory gift of daughters in marriage)", "Varna-ashrama (strict compliance with hereditary caste duties)"],
    "D",
    "1. Non-injury to living beings—especially humans, animals, plants, and insects—is central to Jaina philosophy and deeply influenced Indian thought.\nHence, Option {{CORR}} is correct.",
    "Identifies Ahimsa as central pillar of Jaina practice."
)
add_q(make_question(CHAPTER, "Philosophy of Jainism", "Which core ethical practice is stressed above all else in Jaina spiritual discipline?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Through asceticism and penance, which can only be achieved by renouncing worldly life and joining the monastic order",
    ["By performing elaborate fire sacrifices accompanied by Soma rituals", "By acquiring immense wealth through maritime trading networks", "By memorizing the Sanskrit grammatical rules of Panini"],
    "A",
    "1. According to Jaina teachings, the cycle of birth and rebirth is shaped through karma; asceticism and penance are required to free oneself, achieved through renunciation.\nHence, Option {{CORR}} is correct.",
    "Explains how Jaina monks free themselves from karma."
)
add_q(make_question(CHAPTER, "Philosophy of Jainism", "According to Jaina doctrine, how can an individual free their soul from the accumulated burden of past karma?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Abstain from killing, stealing, lying, possess no property, and observe celibacy",
    ["Undertake military conquests, execute criminals, drink wine, eat meat, and collect taxes", "Sponsor five Buddhist stupas, write poetry, marry three wives, live in caves, and travel overseas", "Memorize the four Vedas, worship five deities, perform animal sacrifices, build temples, and wear crowns"],
    "B",
    "1. Jaina monks and nuns took five vows: to abstain from killing, stealing, and lying; to observe celibacy; and to abstain from possessing property.\nHence, Option {{CORR}} is correct.",
    "Lists the five vows of Jaina monastics."
)
add_q(make_question(CHAPTER, "Five Vows of Jainism", "Which five ethical vows were mandatory for Jaina monks and nuns?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Prakrit, Sanskrit, and Tamil",
    ["Greek, Latin, and Hebrew", "Aramaic, Persian, and Arabic", "Chinese, Tibetan, and Japanese"],
    "C",
    "1. Jaina scholars produced a wealth of literature in Prakrit, Sanskrit, and Tamil, preserved in temple libraries across southern and western India.\nHence, Option {{CORR}} is correct.",
    "Identifies languages of Jaina literature: Prakrit, Sanskrit, and Tamil."
)
add_q(make_question(CHAPTER, "Jaina Literature", "Ancient Jaina philosophical, canonical, and narrative literature was composed in which prominent languages?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Shvetambara ('white-clad') and Digambara ('sky-clad')",
    ["Mahayana and Hinayana", "Sunni and Shia", "Theravada and Vajrayana"],
    "D",
    "1. The Jaina monastic community divided into two primary sects: Shvetambara (monks wearing white robes) and Digambara (monks observing complete nudity/sky-clad).\nHence, Option {{CORR}} is correct.",
    "Identifies Shvetambara and Digambara traditions."
)
add_q(make_question(CHAPTER, "Jaina Sects", "The two major canonical traditions within the Jaina monastic order are known as:", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Spread of Jainism",
    "Jaina teachings were transmitted orally before being committed to writing.",
    "The Jaina canonical texts were formally written down at Vallabhi in Gujarat around the 5th century CE.",
    1, "A",
    "1. Both statements are accurate NCERT facts: Jaina teachings were preserved orally until the council at Vallabhi in Gujarat.",
    "Confirms both statements are correct regarding Jaina canon."
))

add_q(make_assertion_question(
    CHAPTER, "Jaina Ethics",
    "Jainism emphasized non-violence towards all living beings, including plants and insects.",
    "Jaina monks swept the path before walking and wore cloth mouth-covers to avoid inhaling tiny organisms.",
    1, "A",
    "1. Both (A) and (R) are true, and the practice of sweeping paths and covering mouths is a direct practical manifestation of the supreme principle of ahimsa.",
    "Confirms (R) is the correct explanation of (A)."
))

# =================================================================================================
# 3. Gautama Buddha, The Sangha & Canonical Literature (Q41 - Q60)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Shakya clan of Kapilavastu",
    ["Koliya clan of Ramagrama", "Malla clan of Kusinagara", "Lichchhavi clan of Vaishali"],
    "A",
    "1. Siddhartha, as the Buddha was named at birth, was the son of a chief of the Shakya clan of Kapilavastu.\nHence, Option {{CORR}} is correct.",
    "Identifies Shakya clan of Buddha."
)
add_q(make_question(CHAPTER, "Life of the Buddha", "Siddhartha Gautama, the historical founder of Buddhism, was born into which ruling kshatriya clan?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "An old man, a sick man, a corpse, and an ascetic mendicant who had found peace",
    ["A wounded deer, a soaring eagle, an angry lion, and a sleeping elephant", "A wealthy merchant, a Buddhist monk, a Roman soldier, and a Greek sailor", "A burning forest, a flooded river, a crumbling palace, and a barren desert"],
    "B",
    "1. Siddhartha's decision to renounce palace life was triggered by four traumatic sights: an old man, a sick man, a dead body, and a calm, homeless mendicant.\nHence, Option {{CORR}} is correct.",
    "Identifies four sights that inspired Buddha's renunciation."
)
add_q(make_question(CHAPTER, "Life of the Buddha", "Which four iconic sights encountered on his chariot journeys outside the royal palace inspired Siddhartha to renounce worldly comforts?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Bodh Gaya (Bihar) under a pipal (Bodhi) tree",
    ["Sarnath near Varanasi", "Lumbini in Nepal", "Kusinagara in Uttar Pradesh"],
    "C",
    "1. After years of meditation, Siddhartha attained supreme enlightenment at Bodh Gaya, becoming known as the Buddha or the Enlightened One.\nHence, Option {{CORR}} is correct.",
    "Identifies Bodh Gaya as site of Buddha's enlightenment."
)
add_q(make_question(CHAPTER, "Life of the Buddha", "Siddhartha Gautama attained supreme spiritual enlightenment (Bodhi) at which sacred site?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sarnath (Deer Park near Varanasi)",
    ["Bodh Gaya", "Shravasti", "Rajgir"],
    "D",
    "1. The Buddha delivered his first sermon (known as Dharmachakrapravartana, 'Turning of the Wheel of Law') at Sarnath near Varanasi.\nHence, Option {{CORR}} is correct.",
    "Identifies Sarnath as site of Buddha's first sermon."
)
add_q(make_question(CHAPTER, "Life of the Buddha", "Where did the Buddha preach his famous first sermon, initiating the 'Turning of the Wheel of the Law' (Dharmachakrapravartana)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The world is transient (anicca) and soulless (anatta); sorrow (dukkha) is intrinsic to human existence",
    ["The physical world is an eternal illusion ruled by vengeful mountain spirits", "Human beings can escape rebirth by sacrificing thousands of domestic cattle", "Only kings and royal princesses possess immortal indestructible souls"],
    "A",
    "1. The Buddha taught that the world is anicca (transient/constantly changing) and anatta (soulless/having nothing permanent), and sorrow (dukkha) is inherent.\nHence, Option {{CORR}} is correct.",
    "Identifies Anicca, Anatta, and Dukkha as core Buddhist doctrines."
)
add_q(make_question(CHAPTER, "Teachings of the Buddha", "Which of the following foundational philosophical tenets characterizes the Buddha's core worldview?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Extinction of the ego and desire, thereby ending the cycle of suffering and rebirth",
    ["Ascending to a celestial paradise filled with worldly riches", "Becoming an emperor ruling over thirty-two janapadas", "Achieving physical immortality through alchemical mercury potions"],
    "B",
    "1. Nirvana literally means 'blowing out' or extinction—the extinction of the ego and selfish craving, ending the cycle of suffering and rebirth.\nHence, Option {{CORR}} is correct.",
    "Defines Nirvana."
)
add_q(make_question(CHAPTER, "Teachings of the Buddha", "What does 'Nirvana' signify in early Buddhist philosophy?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Mahapajapati Gotami, the Buddha's foster mother",
    ["Yashodhara, his former wife", "Amrapali, the courtesan of Vaishali", "Suprabha, a wealthy merchant's daughter"],
    "C",
    "1. At the request of Ananda, the Buddha admitted women into the sangha, and his foster mother Mahapajapati Gotami became the first woman ordained as a bhikkhuni.\nHence, Option {{CORR}} is correct.",
    "Identifies Mahapajapati Gotami as first Bhikkhuni."
)
add_q(make_question(CHAPTER, "The Buddhist Sangha", "Who was the first woman to be formally ordained as a nun (bhikkhuni) into the Buddhist monastic sangha?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ananda, his beloved cousin and personal attendant",
    ["Sariputta", "Moggallana", "Upali"],
    "D",
    "1. It was Ananda, one of the Buddha's closest disciples, who persuaded him to allow women into the sangha.\nHence, Option {{CORR}} is correct.",
    "Identifies Ananda persuading Buddha to admit women."
)
add_q(make_question(CHAPTER, "The Buddhist Sangha", "Which devoted disciple of the Buddha successfully persuaded him to permit the entry of women into the monastic Sangha?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Therigatha (part of the Sutta Pitaka)",
    ["Vinaya Pitaka", "Mahavamsa", "Abhidhamma Pitaka"],
    "A",
    "1. The Therigatha ('Verses of Elder Nuns') is an extraordinary Pali text in the Sutta Pitaka preserving poems composed by bhikkhunis who attained enlightenment.\nHence, Option {{CORR}} is correct.",
    "Identifies Therigatha preserving verses composed by senior nuns."
)
add_q(make_question(CHAPTER, "Buddhist Literature", "Which unique canonical text in the Pali canon contains a collection of verses composed by elder nuns (theris) celebrating their spiritual liberation?", opts, corr, sol))

add_q(make_match_question(
    CHAPTER, "The Three Pitakas (Tipitaka)",
    "Match the Buddhist Pitaka in List I with its specific canonical contents in List II:",
    [("A", "Vinaya Pitaka"), ("B", "Sutta Pitaka"), ("C", "Abhidhamma Pitaka"), ("D", "Dipavamsa")],
    [("i", "Rules and regulations for monks and nuns in the sangha"), ("ii", "Teachings, sermons, and discourses of the Buddha"), ("iii", "Philosophical matters and psychological analysis"), ("iv", "Chronicle of the island of Sri Lanka")],
    "A-i, B-ii, C-iii, D-iv",
    "A",
    "1. Vinaya = monastic rules (A-i), Sutta = Buddha's teachings (B-ii), Abhidhamma = philosophical matters (C-iii), Dipavamsa = Sri Lankan chronicle (D-iv).",
    "Matches Buddhist Tipitaka with their contents."
))

opts, corr, sol = rotate_options(
    "Once inside the sangha, all members were regarded as equal, having shed their earlier social and caste identities",
    ["Brahmanas were seated on golden thrones, while Shudras remained standing outside", "Monks were required to retain their gotra names and wear family coats of arms", "Only Kshatriyas were eligible for ordination as senior abbots"],
    "B",
    "1. Within the sangha, all were regarded as equal because they shed their earlier social identities upon becoming bhikkhus, functioning on democratic consensus.\nHence, Option {{CORR}} is correct.",
    "Explains egalitarian character of the Buddhist Sangha."
)
add_q(make_question(CHAPTER, "The Buddhist Sangha", "How did internal social hierarchy operate among monks within the Buddhist monastic Sangha?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kusinagara (Kushinagar in eastern Uttar Pradesh)",
    ["Lumbini", "Bodh Gaya", "Sarnath"],
    "C",
    "1. The Buddha passed away and achieved his final Mahaparinibbana at Kusinagara, in the territory of the Mallas.\nHence, Option {{CORR}} is correct.",
    "Identifies Kusinagara as site of Buddha's Mahaparinibbana."
)
add_q(make_question(CHAPTER, "Life of the Buddha", "At which ancient town of the Mallas did the Buddha attain his final demise and entry into Mahaparinibbana?", opts, corr, sol))

# =================================================================================================
# 4. Stupas, Architecture, Sculpture & Mahayana (Q61 - Q80)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Mounds built over bodily relics of the Buddha or objects associated with him, regarded as sacred symbols",
    ["Military fortifications guarding river trade routes against Persian armies", "Administrative municipal storehouses containing surplus wheat", "Royal residential palaces for Buddhist monarchs"],
    "A",
    "1. Stupas were semi-spherical mounds containing sacred relics (e.g. ashes, teeth, begging bowl) of the Buddha or venerated disciples.\nHence, Option {{CORR}} is correct.",
    "Defines Stupa."
)
add_q(make_question(CHAPTER, "Stupas", "What is the primary spiritual and architectural definition of a Buddhist 'Stupa'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ashokavadana",
    ["Divyavadana", "Lalitavistara", "Buddhacharita"],
    "B",
    "1. According to the Buddhist text Ashokavadana, Asoka distributed portions of the Buddha's relics to every important town and ordered the construction of stupas over them.\nHence, Option {{CORR}} is correct.",
    "Identifies Ashokavadana recording Asoka's stupa distribution."
)
add_q(make_question(CHAPTER, "Stupas", "Which Buddhist text records that Emperor Asoka distributed relics of the Buddha across the empire and ordered stupas built over them?", opts, corr, sol))

add_q(make_match_question(
    CHAPTER, "Stupa Architecture",
    "Match the architectural element of a stupa in List I with its structural description in List II:",
    [("A", "Anda"), ("B", "Harmika"), ("C", "Yashti"), ("D", "Chhatri")],
    [("i", "Semi-circular earthen mound"), ("ii", "Balcony-like structure representing abode of the gods"), ("iii", "Central mast/pillar rising above the harmika"), ("iv", "Umbrella or parasol surmounting the central mast")],
    "A-i, B-ii, C-iii, D-iv",
    "A",
    "1. Anda = semi-circular mound (A-i), Harmika = balcony abode of gods (B-ii), Yashti = central mast (C-iii), Chhatri = umbrella (D-iv).",
    "Matches stupa architectural components with descriptions."
))

opts, corr, sol = rotate_options(
    "Amaravati stupa was stripped of its stone sculptures and panels by colonial collectors and local zamindars, whereas Sanchi remained protected by Bhopal's rulers",
    ["Amaravati was destroyed by an earthquake, while Sanchi was buried under volcanic ash", "Amaravati was built of unbaked clay that dissolved in rain, while Sanchi was carved from granite", "Amaravati was built 1,000 years after Sanchi"],
    "C",
    "1. Walter Elliot and others shipped away sculptures from Amaravati to Madras, Calcutta, and London, ruining the stupa, whereas Sanchi escaped looting.\nHence, Option {{CORR}} is correct.",
    "Explains why Amaravati was ruined while Sanchi survived."
)
add_q(make_question(CHAPTER, "Amaravati vs Sanchi", "Why did the great stupa at Amaravati fall into ruins while the stupa at Sanchi survived almost completely intact?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Colin Mackenzie in 1797",
    ["Alexander Cunningham in 1861", "Walter Elliot in 1854", "James Fergusson in 1870"],
    "D",
    "1. Colin Mackenzie visited the site of Amaravati in 1797, making drawings of sculptures, but his detailed report was never published in his lifetime.\nHence, Option {{CORR}} is correct.",
    "Identifies Colin Mackenzie visiting Amaravati in 1797."
)
add_q(make_question(CHAPTER, "Amaravati Discovery", "Which British surveyor and antiquarian first visited the great stupa at Amaravati in 1797 and prepared detailed drawings of its sculptures?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "An auspicious symbol representing a woman whose touch caused trees to flower and bear fruit",
    ["A fearsome demoness guarding the gates of hell", "A Greek goddess of victory borrowed from Roman coins", "A royal queen performing a sacrifice"],
    "A",
    "1. The shalabhanjika motif at Sanchi depicts a woman holding a tree branch, an auspicious folk symbol believed to bring fertility and prosperity.\nHence, Option {{CORR}} is correct.",
    "Explains Shalabhanjika motif at Sanchi."
)
add_q(make_question(CHAPTER, "Sculpture at Sanchi", "The celebrated stone sculpture of a woman swinging from the edge of the Sanchi gateway, known as the 'shalabhanjika', represents:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Empty seat symbolized the Buddha's meditation; the wheel symbolized his first sermon; the stupa symbolized mahaparinibbana",
    ["Empty seat symbolized royal banquets; wheel symbolized chariot warfare; stupa symbolized grain storage", "Empty seat symbolized agricultural drought; wheel symbolized torture; stupa symbolized royal execution", "Empty seat symbolized Greek democracy; wheel symbolized Persian astronomy; stupa symbolized Egyptian architecture"],
    "B",
    "1. In early Buddhist aniconic art, the Buddha was not shown in human form: the empty seat represented meditation, the wheel his first sermon, and the stupa his death (mahaparinibbana).\nHence, Option {{CORR}} is correct.",
    "Decodes early Buddhist aniconic symbols."
)
add_q(make_question(CHAPTER, "Aniconic Buddhist Symbols", "In early Buddhist sculpture, how was the Buddha represented prior to the emergence of anthropomorphic imagery?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Compassionate beings who accumulated spiritual merit through their efforts to help all sentient beings achieve liberation, rather than seeking immediate personal nirvana",
    ["Demonic warriors who guarded royal palaces against foreign invaders", "Brahmana priests who conducted animal sacrifices for emperors", "Monastic accountants who managed the financial treasury of the sangha"],
    "C",
    "1. In Mahayana Buddhism, Bodhisattvas were perceived as deeply compassionate beings who postponed their own nirvana to help others achieve salvation.\nHence, Option {{CORR}} is correct.",
    "Defines Bodhisattva in Mahayana Buddhism."
)
add_q(make_question(CHAPTER, "Emergence of Mahayana", "What does the concept of a 'Bodhisattva' signify in the emergent Mahayana tradition?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Belief in Bodhisattvas and worship of images of the Buddha, alongside the older tradition being labelled Hinayana (Lesser Vehicle)",
    ["Complete rejection of all moral ethics and monastic discipline", "Forcible military conversion of non-Buddhists across China", "Exclusion of all women from religious worship"],
    "D",
    "1. Mahayana (Great Vehicle) was marked by devotion to the Buddha as a saviour, image worship, and belief in Bodhisattvas, contrasting with Theravada/Hinayana.\nHence, Option {{CORR}} is correct.",
    "Summarizes defining characteristics of Mahayana Buddhism."
)
add_q(make_question(CHAPTER, "Emergence of Mahayana", "Which theological developments distinguished Mahayana Buddhism from earlier Buddhist traditions by the early centuries CE?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Garbhagriha (a small square room where the principal deity was installed)",
    ["Mandapa (assembly hall)", "Shikhara (towering superstructure)", "Gopuram (monumental gateway)"],
    "A",
    "1. Early Hindu temples consisted of a small square room called the garbhagriha ('womb-chamber') with a single doorway for worshippers to enter and offer homage.\nHence, Option {{CORR}} is correct.",
    "Identifies Garbhagriha as the inner sanctum of early temples."
)
add_q(make_question(CHAPTER, "Early Temple Architecture", "In early Indian rock-cut and structural temple architecture, the sacred inner sanctum where the main deity was enshrined is termed the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Shikhara",
    ["Mandapa", "Antarala", "Torana"],
    "B",
    "1. A tall superstructure or tower built over the central shrine (garbhagriha) of a temple was known as the shikhara.\nHence, Option {{CORR}} is correct.",
    "Defines Shikhara."
)
add_q(make_question(CHAPTER, "Early Temple Architecture", "The tall, imposing pyramidal or curvilinear superstructure constructed directly above the garbhagriha of a temple is called the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kailashnatha temple at Ellora (Cave 16)",
    ["Brihadishvara temple at Thanjavur", "Sun temple at Konark", "Shore temple at Mamallapuram"],
    "C",
    "1. The pinnacle of rock-cut temple architecture was achieved in the 8th century CE with the Kailashnatha temple at Ellora, carved out of a single piece of living rock.\nHence, Option {{CORR}} is correct.",
    "Identifies rock-cut Kailashnatha temple at Ellora."
)
add_q(make_question(CHAPTER, "Temple Architecture: Ellora", "Which extraordinary monolithic Hindu temple was carved entirely out of a single living cliff-side rock from top to bottom at Ellora?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ten avatars (incarnations) of Vishnu who descended to save the earth from destruction by evil forces",
    ["Twelve disciples who accompanied the Buddha on his final pilgrimage", "Twenty-four Tirthankaras who crossed the river of existence", "Four Greek kings who patronized Buddhist cave monasteries"],
    "D",
    "1. Vaishnavism developed around the ten avatars (incarnations) of Vishnu, recognized as forms assumed by the deity to restore cosmic order.\nHence, Option {{CORR}} is correct.",
    "Identifies ten avatars in Vaishnavism."
)
add_q(make_question(CHAPTER, "Puranic Hinduism", "The theological system of Vaishnavism in the early historic period developed around the veneration of:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Shiva, represented primarily as a linga and occasionally in anthropomorphic human form",
    ["Indra, worshipped through Vedic animal fire oblations", "Varuna, depicted seated on a sea monster", "Surya, accompanied by twelve planetary horsemen"],
    "A",
    "1. In Shaivism, the deity Shiva was symbolized primarily by the linga, although he was also depicted in human (anthropomorphic) forms.\nHence, Option {{CORR}} is correct.",
    "Describes iconography of Shiva as linga and human form."
)
add_q(make_question(CHAPTER, "Puranic Hinduism", "In the early Puranic tradition of Shaivism, what primary iconographic symbol was used to represent the supreme deity Shiva?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Vessantara Jataka",
    ["Chaddanta Jataka", "Ruru Jataka", "Mahakapi Jataka"],
    "B",
    "1. The northern gateway at Sanchi illustrates the Vessantara Jataka, the story of a generous prince who gave away everything to a Brahmana and went to live in the forest.\nHence, Option {{CORR}} is correct.",
    "Identifies Vessantara Jataka carved on Sanchi gateway."
)
add_q(make_question(CHAPTER, "Sculpture at Sanchi", "Which Jataka story carved on the northern gateway of Sanchi depicts a compassionate prince who gave away his white elephant, wealth, and family to live in a forest?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ajivikas, by the Mauryan emperor Asoka and his grandson Dasharatha",
    ["Jaina monks, by the Gupta emperor Samudragupta", "Greek merchants, by the Indo-Greek king Menander", "Roman ambassadors, by the Kushana king Kanishka"],
    "C",
    "1. The oldest rock-cut artificial caves in the Barabar hills (Bihar) were excavated by Emperor Asoka and his grandson Dasharatha for the ascetics of the Ajivika sect.\nHence, Option {{CORR}} is correct.",
    "Identifies Barabar caves dedicated to Ajivikas."
)
add_q(make_question(CHAPTER, "Rock-Cut Caves", "The monumental rock-cut caves carved into the granite hills of Barabar in Bihar were originally dedicated to which ascetic religious sect?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Chaityas were halls of worship enclosing a stupa; Viharas were residential monasteries where monks lived",
    ["Chaityas were royal grain storehouses; Viharas were military forts", "Chaityas were Roman coin mints; Viharas were horse stables", "Chaityas were Hindu sacrificial altars; Viharas were burial grounds"],
    "D",
    "1. In Buddhist rock-cut architecture, a Chaitya was a sacred hall of worship containing a stupa, while a Vihara was a monastery where monks and nuns resided.\nHence, Option {{CORR}} is correct.",
    "Contrasts Chaitya and Vihara."
)
add_q(make_question(CHAPTER, "Rock-Cut Architecture", "What is the structural and functional distinction between a 'Chaitya' and a 'Vihara' in Buddhist cave architecture?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Karle (Maharashtra)",
    ["Ajanta", "Ellora", "Nasik"],
    "A",
    "1. The most magnificent rock-cut chaitya hall in India, famous for its vaulted roof with wooden ribs and sculpted mithuna couples, is at Karle in Maharashtra.\nHence, Option {{CORR}} is correct.",
    "Identifies Karle chaitya hall."
)
add_q(make_question(CHAPTER, "Rock-Cut Architecture", "Which site in western Maharashtra possesses the largest and most magnificent rock-cut Buddhist Chaitya hall featuring ornate pillars and wooden roof rafters?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sallekhana (Santhara)",
    ["Nirvana", "Mahaparinibbana", "Dharmachakra"],
    "B",
    "1. Sallekhana (or Santhara) is the holy Jaina vow of voluntary, peaceful death by fasting when a person approaches the end of life or acute infirmity.\nHence, Option {{CORR}} is correct.",
    "Defines Sallekhana in Jainism."
)
add_q(make_question(CHAPTER, "Jaina Practices", "The ritual vow of voluntary death through progressive, peaceful fasting practiced by devout Jaina ascetics and householders is known as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ardhamagadhi Prakrit",
    ["Classical Sanskrit", "Old Persian", "Vedic Sanskrit"],
    "C",
    "1. The original sacred canonical scriptures of the Jainas, known as the Agamas, were preserved and compiled in the Ardhamagadhi Prakrit language.\nHence, Option {{CORR}} is correct.",
    "Identifies Ardhamagadhi Prakrit as language of Jaina Agamas."
)
add_q(make_question(CHAPTER, "Jaina Literature", "The earliest canonical scriptures of the Jainas, known as the Agamas, were composed in which dialect of ancient Prakrit?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Upali, the barber who had joined the Sangha",
    ["Ananda", "Sariputta", "Kassapa"],
    "D",
    "1. At the First Buddhist Council held at Rajagriha immediately after the Buddha's death, Upali recited the Vinaya Pitaka (rules of monastic discipline).\nHence, Option {{CORR}} is correct.",
    "Identifies Upali reciting Vinaya Pitaka."
)
add_q(make_question(CHAPTER, "Buddhist Councils", "At the First Buddhist Council convened at Rajagriha, which disciple was called upon to recite the rules of monastic discipline (Vinaya Pitaka)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ananda recited the Sutta Pitaka (teachings and discourses of the Buddha)",
    ["Upali recited the Abhidhamma Pitaka", "Mahakassapa translated the texts into Greek", "Asoka declared himself the supreme patriarch of the Sangha"],
    "A",
    "1. At the First Council, Ananda was questioned on the Dhamma and recited the Sutta Pitaka containing the discourses and sermons of the Buddha.\nHence, Option {{CORR}} is correct.",
    "Identifies Ananda reciting the Sutta Pitaka."
)
add_q(make_question(CHAPTER, "Buddhist Councils", "During the First Buddhist Council, what critical canonical responsibility was undertaken by the Buddha's beloved disciple Ananda?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Buddhacharita (Life of the Buddha) and Saundarananda",
    ["Mudrarakshasa and Devichandraguptam", "Mrichchhakatika and Ratnavali", "Abhijnanashakuntalam and Meghadutam"],
    "B",
    "1. Ashvaghosha, the court poet of Kanishka, composed the celebrated Sanskrit epic poems Buddhacharita (biography of the Buddha) and Saundarananda.\nHence, Option {{CORR}} is correct.",
    "Identifies Buddhacharita composed by Ashvaghosha."
)
add_q(make_question(CHAPTER, "Buddhist Sanskrit Literature", "Which famous Sanskrit poetic biography of the Buddha was composed by the 1st-century CE poet Ashvaghosha in the court of Kanishka?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Madhyamaka (Middle Way) school and the doctrine of Shunyata (Emptiness)",
    ["Advaita Vedanta of Shankara", "Vaisheshika atomism of Kanada", "Nyaya logic of Gautama"],
    "C",
    "1. The great Buddhist philosopher Nagarjuna (c. 2nd century CE) founded the Madhyamaka school of Mahayana Buddhism, formulating the doctrine of Shunyata (emptiness/interdependence).\nHence, Option {{CORR}} is correct.",
    "Identifies Nagarjuna and Madhyamaka Shunyata doctrine."
)
add_q(make_question(CHAPTER, "Mahayana Philosophy", "The celebrated philosopher Nagarjuna formulated which profound doctrine that became foundational to Mahayana Buddhist metaphysics?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kumaragupta I of the Gupta dynasty in the 5th century CE",
    ["Asoka of the Mauryan dynasty", "Harshavardhana of Kannauj", "Chandragupta Maurya"],
    "D",
    "1. The great monastic university (Mahavihara) at Nalanda in Bihar was founded in the 5th century CE by the Gupta emperor Kumaragupta I (Shakraditya).\nHence, Option {{CORR}} is correct.",
    "Identifies Kumaragupta I founding Nalanda University."
)
add_q(make_question(CHAPTER, "Buddhist Universities", "The world-renowned international Buddhist university and monastic centre at Nalanda was originally founded by which ruler in the 5th century CE?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Gandhara art was heavily influenced by Greco-Roman artistic conventions, using grey/blue schist stone to sculpt realistic human drapery and wavy hair",
    ["Gandhara art used white marble and depicted only Hindu deities", "Gandhara art was strictly two-dimensional with zero relief depth", "Gandhara art was made exclusively of unbaked river mud"],
    "A",
    "1. The Gandhara school of Buddhist sculpture flourished in the northwest, combining Indian Buddhist themes with Greco-Roman realistic anatomy, curly hair, and heavy drapery in blue-grey schist.\nHence, Option {{CORR}} is correct.",
    "Describes Greco-Roman character of Gandhara art."
)
add_q(make_question(CHAPTER, "Buddhist Art Schools", "What was the distinguishing stylistic characteristic of the Gandhara school of sculpture?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Spotted red sandstone quarried from Sikri / Rupbas, depicting fleshy, robust, smiling Buddhas in indigenous Indian aesthetic tradition",
    ["Black basalt stone imported from Persian Gulf islands", "Cast bronze alloyed with zinc and pure silver", "Pure white Makrana marble carved with Persian foliage"],
    "B",
    "1. The Mathura school of art sculpted Buddhas using local spotted red sandstone, characterized by robust Indian aesthetics, energetic forms, and transparent drapery.\nHence, Option {{CORR}} is correct.",
    "Describes Mathura school using spotted red sandstone."
)
add_q(make_question(CHAPTER, "Buddhist Art Schools", "Which material and indigenous stylistic feature characterized the Buddhist sculptures produced by the Mathura school of art?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Cream-coloured sandstone from Chunar, depicting serene, deeply spiritual Buddhas with smooth surfaces and halo decorated with floral motifs",
    ["Coarse granite blocks mortised with iron dowels", "Glazed polychrome porcelain tiles", "Rough unpolished slate from the Himalayas"],
    "C",
    "1. The Sarnath school (flourishing under the Guptas) used pale buff/cream Chunar sandstone, famous for supreme spiritual serenity, downcast eyes, and ornate halos.\nHence, Option {{CORR}} is correct.",
    "Describes Sarnath school using Chunar sandstone."
)
add_q(make_question(CHAPTER, "Buddhist Art Schools", "The classical Gupta-period Buddhist sculptures produced by the Sarnath school were fashioned from:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Bhumisparsha Mudra (earth-touching gesture calling the Earth to witness his victory over Mara)",
    ["Abhaya Mudra (gesture of fearlessness)", "Dharmachakra Mudra (gesture of turning the wheel of law)", "Dhyana Mudra (gesture of meditation)"],
    "D",
    "1. The Bhumisparsha Mudra (seated with right hand touching the ground) depicts the pivotal moment when the Buddha called the Earth goddess to witness his enlightenment and defeat of Mara.\nHence, Option {{CORR}} is correct.",
    "Identifies Bhumisparsha Mudra."
)
add_q(make_question(CHAPTER, "Iconography of Mudras", "In Buddhist sculpture, the seated image of the Buddha with his right hand reaching down to touch the ground represents the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Abhaya Mudra (gesture of fearlessness and protection)",
    ["Varada Mudra (gesture of granting boons)", "Bhumisparsha Mudra (earth-witness gesture)", "Uttarabodhi Mudra (supreme enlightenment)"],
    "A",
    "1. The Abhaya Mudra (right hand raised to shoulder height with palm facing outward) signifies protection, peace, benevolence, and dispelling of fear.\nHence, Option {{CORR}} is correct.",
    "Defines Abhaya Mudra."
)
add_q(make_question(CHAPTER, "Iconography of Mudras", "The sacred hand gesture where the Buddha raises his right hand with the palm facing outwards to bestow peace and fearlessness is called:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Dharmachakra Mudra (teaching / turning the wheel of the law)",
    ["Dhyana Mudra (meditation gesture)", "Bhumisparsha Mudra (earth-touching gesture)", "Abhaya Mudra (protection gesture)"],
    "B",
    "1. The Dharmachakra Mudra depicts both hands held close to the chest, turning the wheel, symbolizing the Buddha's first sermon at Sarnath.\nHence, Option {{CORR}} is correct.",
    "Defines Dharmachakra Mudra."
)
add_q(make_question(CHAPTER, "Iconography of Mudras", "Which hand gesture depicted in the famous 5th-century Sarnath stone Buddha symbolizes the preaching of his First Sermon?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Padmapani (holding a lotus) and Vajrapani (holding a thunderbolt)",
    ["Indra and Agni", "Ganesha and Karttikeya", "Brahma and Shiva"],
    "C",
    "1. The celebrated wall paintings at Ajanta (Cave 1) depict the Bodhisattvas Padmapani (the lotus bearer, personifying compassion) and Vajrapani.\nHence, Option {{CORR}} is correct.",
    "Identifies Padmapani and Vajrapani at Ajanta."
)
add_q(make_question(CHAPTER, "Ajanta Paintings", "In the famous murals of Cave 1 at Ajanta, which two iconic Bodhisattvas flank the shrine of the Buddha?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "They were composed in simple Sanskrit verse and were meant to be heard by everyone, including women and Shudras who did not have access to Vedic learning",
    ["They were secret texts written in code that only Roman emperors were permitted to read", "They were legally banned from being read outside Buddhist monasteries", "They were composed exclusively in the Greek language for foreign merchants"],
    "D",
    "1. Puranas were composed in simple Sanskrit verse, meant to be read aloud and heard by everyone, including women and Shudras who were denied access to Vedic study.\nHence, Option {{CORR}} is correct.",
    "Explains accessibility of Puranas to women and Shudras."
)
add_q(make_question(CHAPTER, "Puranic Traditions", "Why were the Puranas uniquely accessible and socially transformative in early medieval India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Varaha (the boar avatar) rescuing the Earth goddess (Bhudevi) from the cosmic waters",
    ["Kurma (the tortoise avatar) supporting Mount Mandara", "Matsya (the fish avatar) navigating the Manu's ark", "Narasimha (the man-lion avatar) destroying Hiranyakashipu"],
    "A",
    "1. The colossal rock relief at Udayagiri (Cave 5, c. early 5th century CE) depicts Varaha, the boar incarnation of Vishnu, triumphantly rescuing Bhudevi from the ocean.\nHence, Option {{CORR}} is correct.",
    "Identifies Varaha avatar sculpture at Udayagiri caves."
)
add_q(make_question(CHAPTER, "Puranic Iconography", "The colossal 5th-century CE rock-cut relief sculpture at Udayagiri in Madhya Pradesh depicts which avatar of Vishnu?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Vishnu reclining on the multi-headed serpent Sheshanaga (Sheshashayana Vishnu)",
    ["Shiva performing the cosmic Tandava dance", "The Buddha attaining mahaparinibbana", "Mahavira meditating in kayotsarga posture"],
    "B",
    "1. The Dashavatara temple at Deogarh (c. 6th century CE) contains a celebrated stone panel depicting Vishnu reclining on the coils of Sheshanaga while other deities look on.\nHence, Option {{CORR}} is correct.",
    "Identifies Sheshashayana Vishnu at Deogarh temple."
)
add_q(make_question(CHAPTER, "Early Temple Architecture", "The famous exterior stone relief carving at the 6th-century Dashavatara temple in Deogarh (Uttar Pradesh) depicts:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "European art historians judged Indian art through classical Greek sculptural standards and initially dismissed multi-armed and animal-headed deities as grotesque",
    ["European scholars could not read Latin translations of the Puranas", "Indian stone sculptures emitted magnetic interference that damaged photographic cameras", "British collectors were prohibited by Parliament from viewing stone monuments"],
    "C",
    "1. Early European art historians were horrified by multiple arms and animal heads in Indian sculpture, judging it through Greek norms, and only appreciated it after understanding its symbolic context.\nHence, Option {{CORR}} is correct.",
    "Explains early European prejudice against Indian sculpture."
)
add_q(make_question(CHAPTER, "Historiography of Indian Art", "Why did early European nineteenth-century art historians initially fail to appreciate ancient Indian sculpture and classify it as 'monstrous'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Alexander Cunningham in 'The Bhilsa Topes' (1854)",
    ["James Fergusson in 'History of Indian Architecture'", "Walter Elliot in 'Madras Antiquities'", "Colin Mackenzie in 'Amaravati Survey'"],
    "D",
    "1. Alexander Cunningham, the first Director-General of the ASI, wrote one of the earliest comprehensive books on Sanchi, titled 'The Bhilsa Topes' (1854).\nHence, Option {{CORR}} is correct.",
    "Identifies Cunningham's book The Bhilsa Topes."
)
add_q(make_question(CHAPTER, "Archaeological Historiography", "Which early British archaeologist authored the pioneering 1854 monograph on the Sanchi stupa complex titled 'The Bhilsa Topes'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A stupa in which the Buddha's relics are enshrined",
    ["A Jaina meditation cave", "A Vedic sacrificial fire altar", "A royal coronation platform"],
    "A",
    "1. In early Buddhist literature, a Dhatu-garbha (from which the Sinhala word 'Dagaba' or 'Pagoda' derives) refers to the relic-chamber inside a stupa.\nHence, Option {{CORR}} is correct.",
    "Defines Dhatu-garbha."
)
add_q(make_question(CHAPTER, "Stupa Architecture", "In Buddhist architectural terminology, the sacred relic chamber embedded within the core of a stupa is termed the:", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Buddhist Teachings",
    "The Buddha advised his followers to rely on their own reason rather than blind authority, declaring 'Be lamps unto yourselves'.",
    "Early Buddhism emphasized that individuals could attain liberation through their own moral actions and self-discipline.",
    1, "A",
    "1. Both statements are accurate NCERT facts: Buddha's famous last words were 'Appo dipo bhava' (Be lamps unto yourselves).",
    "Confirms both statements are correct regarding Buddha's ethical teachings."
))

add_q(make_assertion_question(
    CHAPTER, "Temple Architecture",
    "By the sixth century CE, temples had developed elaborate architectural features including tall shikharas, decorated doorways, and pillared assembly halls (mandapas).",
    "The earliest surviving Hindu temples from the Gupta period were modest, consisting merely of a small square sanctum (garbhagriha) with a single doorway.",
    2, "B",
    "1. Both statements are true NCERT facts depicting the historical evolution of Hindu temple architecture from simple Gupta shrines to elaborate complexes.",
    "Confirms both statements are true."
))

add_q(make_sequence_question(
    CHAPTER, "Buddhist Architecture Chronology",
    "Arrange the following monumental Buddhist structural developments in chronological order:",
    [
        ("A", "Construction of the Great Stupa at Sanchi under Emperor Asoka"),
        ("B", "Carving of the magnificent rock-cut Chaitya hall at Karle"),
        ("C", "Decipherment of Brahmi inscriptions by James Prinsep"),
        ("D", "Founding of Nalanda University under the imperial Guptas")
    ],
    "A, B, D, C",
    "A",
    "1. Asoka builds Sanchi (3rd c. BCE); Karle chaitya (c. 1st c. BCE - 1st c. CE); Nalanda university (5th c. CE); Prinsep deciphers Brahmi (1838 CE).",
    "Orders Buddhist monuments and discoveries chronologically."
))

opts, corr, sol = rotate_options(
    "Pradakshina Patha (circumambulatory pathway enclosed by stone railings)",
    ["Harmika", "Yashti", "Anda"],
    "A",
    "1. Worshipers walked around the anda of a stupa in a clockwise direction along the pradakshina patha (circumambulatory path), keeping the mound on their right.\nHence, Option {{CORR}} is correct.",
    "Defines Pradakshina Patha."
)
add_q(make_question(CHAPTER, "Stupa Architecture", "The stone-paved circular pathway surrounding the base of a stupa along which devotees walked in a clockwise direction is known as the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Toranas (ornate carved stone gateways positioned at the four cardinal directions)",
    ["Gopurams", "Shikharas", "Mandapas"],
    "B",
    "1. Devotees entered the stupa precinct through elaborate carved stone gateways called Toranas situated at the east, west, north, and south.\nHence, Option {{CORR}} is correct.",
    "Defines Toranas."
)
add_q(make_question(CHAPTER, "Stupa Architecture", "What architectural term designates the four monumental carved stone gateways through which pilgrims entered the sacred stupa compound at Sanchi?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Jatila (Kassapa brothers), the fire-sacrificing ascetics who converted to Buddhism",
    ["Roman legionaries stationed in Gandhara", "Greek philosophers from Athens", "Persian royal couriers from Persepolis"],
    "C",
    "1. Several narrative panels at Sanchi depict the conversion of the Kassapa brothers, known as the Jatilas, who were fire-worshipping ascetics before joining the Buddha.\nHence, Option {{CORR}} is correct.",
    "Identifies conversion of the Jatilas depicted on Sanchi panels."
)
add_q(make_question(CHAPTER, "Sculpture at Sanchi", "In several sculpted panels on the Sanchi gateways, bearded ascetics with matted hair performing rituals by a river represent the story of the conversion of:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Gajalakshmi (goddess of good fortune being bathed by two elephants), or Maya (the Buddha's mother)",
    ["Saraswati holding a veena", "Durga slaying Mahishasura", "Parvati performing penance"],
    "D",
    "1. A female figure seated on a lotus flanked by two elephants pouring water over her has been identified both as Maya (mother of Buddha) and Gajalakshmi (goddess of fortune).\nHence, Option {{CORR}} is correct.",
    "Identifies Gajalakshmi / Maya motif at Sanchi."
)
add_q(make_question(CHAPTER, "Sculpture at Sanchi", "A popular motif at Sanchi depicts a woman seated on a lotus being bathed with water poured from pitchers by two elephants. Art historians identify this figure as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The serpent (Naga) motif, derived from popular local religious traditions",
    ["The double-headed Roman imperial eagle", "The Winged Sphinx of Giza", "The Trojan horse of Homeric epic"],
    "A",
    "1. Sanchi sculptures include serpents (Nagas), an ancient animistic and folk motif integrated into Buddhist artistic vocabulary.\nHence, Option {{CORR}} is correct.",
    "Identifies Naga serpent motif in Sanchi art."
)
add_q(make_question(CHAPTER, "Sculpture at Sanchi", "Which serpent motif found carved on pillars and gateways at Sanchi reflects the absorption of popular local nature-worship traditions into Buddhist art?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Hinayana (Lesser Vehicle), preferred by followers who called themselves Theravadins (followers of the path of elder monks)",
    ["Vajrayana (Thunderbolt Vehicle)", "Tantrayana (Vehicle of Magic)", "Navayana (New Vehicle)"],
    "B",
    "1. Proponents of Mahayana described older Buddhist schools as Hinayana ('lesser vehicle'), while traditionalists described themselves as Theravadins ('path of the elders').\nHence, Option {{CORR}} is correct.",
    "Contrasts Mahayana with Hinayana / Theravada."
)
add_q(make_question(CHAPTER, "Buddhist Traditions", "Followers of the older, traditional Buddhist path who rejected the new Mahayana doctrines referred to their tradition as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Second Buddhist Council held at Vaishali around 383 BCE",
    ["First Council at Rajagriha", "Third Council at Pataliputra", "Fourth Council in Kashmir"],
    "C",
    "1. The Second Buddhist Council was held at Vaishali around 100 years after the Buddha's death, where disputes over ten monastic rules led to the first schism (Sthaviravadins and Mahasanghikas).\nHence, Option {{CORR}} is correct.",
    "Identifies Second Buddhist Council at Vaishali."
)
add_q(make_question(CHAPTER, "Buddhist Councils", "At which Buddhist Council held around 383 BCE did disputes regarding monastic discipline lead to the early schism between Sthaviravadins and Mahasanghikas?", opts, corr, sol))

# Verification of Unit 4
print(f"Total questions generated for Unit 4: {len(questions)}")
assert len(questions) == 80, f"Expected 80 questions, got {len(questions)}"

out_path = "mock/history_units/unit4.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved 80 questions to {out_path}!")
