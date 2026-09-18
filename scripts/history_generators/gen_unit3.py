import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.history_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text,
    get_pyq_normalized_set
)

CHAPTER = "Kinship, Caste and Class: Early Societies (c. 600 BCE - 600 CE)"
questions = []
seen = set()
pyq_seen = get_pyq_normalized_set()

# Load prior units
for u in ["unit1.json", "unit2.json"]:
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

print("Generating 60 unique questions for Unit 3: Kinship, Caste and Class...")

# =================================================================================================
# 1. The Critical Edition of the Mahabharata & Kinship Rules (Q1 - Q15)
# =================================================================================================

opts, corr, sol = rotate_options(
    "V.S. Sukthankar in 1919",
    ["Alexander Cunningham in 1861", "Mortimer Wheeler in 1944", "John Marshall in 1924"],
    "A",
    "1. In 1919, under the leadership of noted Sanskrit scholar V.S. Sukthankar, a team initiated the monumental project of preparing a Critical Edition of the Mahabharata.\nHence, Option {{CORR}} is correct.",
    "Identifies V.S. Sukthankar leading the Critical Edition of the Mahabharata in 1919."
)
add_q(make_question(CHAPTER, "Critical Edition of Mahabharata", "Under whose leadership was the ambitious project of preparing the Critical Edition of the Mahabharata launched in 1919?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "It took 47 years to complete, running into 13,000 pages across multiple volumes",
    ["It was completed within six months by two British translators", "It rejected all Sanskrit manuscripts written in south Indian scripts", "It concluded that the epic had zero regional variations across India"],
    "B",
    "1. The project took 47 years to complete, collecting manuscripts in various scripts from Kashmir to Kerala, running into 13,000 pages.\nHence, Option {{CORR}} is correct.",
    "States scale of the Mahabharata Critical Edition project."
)
add_q(make_question(CHAPTER, "Critical Edition of Mahabharata", "Which of the following statements accurately characterizes the scope and duration of the Critical Edition of the Mahabharata project?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "While there were striking common elements across the subcontinent, there were also enormous regional variations reflecting local dialogues",
    ["The text was identical word-for-word in every single discovered manuscript", "The epic was originally composed in Greek and translated into Prakrit", "The entire story was forged by modern colonial historians in Bengal"],
    "C",
    "1. The Critical Edition revealed both profound commonalities in the central story and enormous regional variations, documented in footnotes and appendices.\nHence, Option {{CORR}} is correct.",
    "Explains conclusions of the Mahabharata Critical Edition."
)
add_q(make_question(CHAPTER, "Critical Edition of Mahabharata", "What fundamental historical reality did the Critical Edition of the Mahabharata reveal regarding early Indian social traditions?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Tracing descent from father to son, grandson and so on, where sons claimed paternal resources upon the father's death",
    ["Tracing family lineage and property descent exclusively through mothers to daughters", "Electing village tribal elders by annual collective referendum", "Transferring family assets exclusively to religious Buddhist monastic orders"],
    "D",
    "1. Patriliny means tracing descent from father to son, grandson, etc., whereas matriliny traces descent through the mother.\nHence, Option {{CORR}} is correct.",
    "Defines Patriliny."
)
add_q(make_question(CHAPTER, "Kinship and Patriliny", "The ideal of 'patriliny' prevalent in early Vedic and epic society refers to:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Rigveda",
    ["Samaveda", "Yajurveda", "Atharvaveda"],
    "A",
    "1. In the Rigveda, mantras invoke Indra to bless the bride with fine sons, reflecting the deep-seated concern for patriliny in Vedic society.\nHence, Option {{CORR}} is correct.",
    "Identifies Rigvedic mantra for producing fine sons."
)
add_q(make_question(CHAPTER, "Kinship and Patriliny", "Mantras praying for the birth of fine sons and fortunate marriage, such as 'I free her from here, but not from there', are found in which ancient Vedic text?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Endogamy",
    ["Exogamy", "Polygyny", "Polyandry"],
    "B",
    "1. Endogamy refers to marriage within a unit—this could be a kin group, caste, or a group living in the same locality.\nHence, Option {{CORR}} is correct.",
    "Defines Endogamy."
)
add_q(make_question(CHAPTER, "Rules of Marriage", "The matrimonial practice of marrying within a specific social group, caste, or locality is technically termed:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Exogamy (marrying outside the kin group / gotra)",
    ["Endogamy", "Polyandry", "Levirate"],
    "C",
    "1. According to Brahmanical norms, women had to be married outside the gotra, a practice known as exogamy, making kanyadana an important religious duty.\nHence, Option {{CORR}} is correct.",
    "Defines Exogamy."
)
add_q(make_question(CHAPTER, "Rules of Marriage", "The Brahmanical marriage norm requiring daughters to be married outside their father's gotra is known as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Polygyny refers to a man having multiple wives; Polyandry refers to a woman having multiple husbands",
    ["Polygyny refers to female celibacy; Polyandry refers to male monasticism", "Polygyny applies only to Brahmanas; Polyandry applies only to Shudras", "Polygyny means child marriage; Polyandry means widow remarriage"],
    "D",
    "1. Polygyny is the practice of a man having several wives (common among rulers); Polyandry is the practice of a woman having several husbands (e.g. Draupadi).\nHence, Option {{CORR}} is correct.",
    "Contrasts Polygyny and Polyandry."
)
add_q(make_question(CHAPTER, "Rules of Marriage", "What is the structural distinction between 'polygyny' and 'polyandry' in sociological analysis?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Each gotra was named after a Vedic seer, women adopted their husband's gotra on marriage, and members of the same gotra could not marry",
    ["Gotras were named after trade guilds, and inter-marriage was compulsory within the same gotra", "Gotras applied exclusively to foreign Greek merchants resident in port cities", "Gotras were re-assigned every five years by the village headman"],
    "A",
    "1. Two rules of gotra: (1) women were expected to give up father's gotra and adopt husband's upon marriage, and (2) members of the same gotra could not marry.\nHence, Option {{CORR}} is correct.",
    "Summarizes Brahmanical rules of Gotra."
)
add_q(make_question(CHAPTER, "Gotra System", "Which rules governed the Brahmanical system of Gotra formulated from c. 1000 BCE onwards?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Several Satavahana queens retained their paternal gotras (e.g. Gautama, Vasishtha) after marriage and practiced endogamy within kin groups",
    ["Satavahana queens were legally prohibited from owning any gold ornaments", "Satavahana monarchs practiced strict monogamy and lived as ascetics", "Satavahanas married exclusively into foreign Roman patrician families"],
    "B",
    "1. Inscriptions reveal that many Satavahana queens retained their father's gotra names instead of adopting the husband's, and married within the kin group (endogamy), violating Brahmanical rules.\nHence, Option {{CORR}} is correct.",
    "Identifies Satavahana exceptions to Brahmanical gotra rules."
)
add_q(make_question(CHAPTER, "Gotra System", "How did marriage practices among Satavahana rulers of the Deccan deviate from orthodox Brahmanical gotra norms?", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Rules of Marriage",
    "The Dharmasutras and Dharmashastras recognized eight forms of marriage.",
    "Of the eight forms, the first four were considered good while the remaining four were condemned.",
    1, "A",
    "1. Both statements are accurate NCERT facts: early Sanskrit legal codes recognized eight forms of marriage, praising the first four and condemning the rest.",
    "Confirms both statements are correct regarding eight forms of marriage."
))

add_q(make_assertion_question(
    CHAPTER, "Satavahana Matronymics",
    "Satavahana rulers were identified through metronymics (names derived from their mothers).",
    "Succession to the Satavahana royal throne was strictly matrilineal, passing from mother to daughter.",
    3, "C",
    "1. Assertion (A) is true (kings were called Gautamiputra, etc.), but Reason (R) is false because royal dynastic succession was generally patrilineal (father to son).",
    "Identifies Assertion as true and Reason as false."
))

# =================================================================================================
# 2. Varna, Non-Kshatriya Kings & Jatis (Q16 - Q35)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Purusha Sukta of the Rigveda (10th Mandala)",
    ["Mundaka Upanishad", "Nasadiya Sukta", "Gayatri Mantra"],
    "A",
    "1. The divine origin of the four varnas (Brahmana from mouth, Kshatriya from arms, Vaishya from thighs, Shudra from feet) is first articulated in the Purusha Sukta of the Rigveda.\nHence, Option {{CORR}} is correct.",
    "Identifies Purusha Sukta in Rigveda for divine origin of four varnas."
)
add_q(make_question(CHAPTER, "The Varna System", "The divine creation of the four varnas from the cosmic being (Purusha) is first proclaimed in which ancient Vedic text?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Study and teach the Vedas, perform sacrifices, and give and receive gifts",
    ["Engage in warfare, protect people, and administer justice", "Practice agriculture, pastoralism, and trade", "Serve the three higher varnas without religious initiation"],
    "A",
    "1. According to the Dharmashastras, the duties of Brahmanas were studying and teaching the Vedas, performing sacrifices, and giving and receiving gifts.\nHence, Option {{CORR}} is correct.",
    "Identifies prescribed duties of Brahmanas."
)
add_q(make_question(CHAPTER, "The Varna System", "According to the Dharmashastras, what were the prescribed occupations and duties of the Brahmana varna?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kshatriyas",
    ["Brahmanas", "Vaishyas", "Shudras"],
    "B",
    "1. Kshatriyas were assigned the duties of engaging in warfare, protecting people, administering justice, studying the Vedas, and getting sacrifices performed.\nHence, Option {{CORR}} is correct.",
    "Identifies duties of Kshatriyas."
)
add_q(make_question(CHAPTER, "The Varna System", "Which varna was exclusively assigned by the Shastras to engage in warfare, protect subjects, and govern states as rulers?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Agriculture, pastoralism, and trade",
    ["Study and teaching of the Vedas exclusively", "Disposing of dead bodies and working as executioners", "Guarding the royal palace gates at night"],
    "C",
    "1. The occupations prescribed for Vaishyas were agriculture, cattle-rearing (pastoralism), and trade, alongside studying the Vedas and giving gifts.\nHence, Option {{CORR}} is correct.",
    "Identifies prescribed occupations of Vaishyas."
)
add_q(make_question(CHAPTER, "The Varna System", "What economic occupations were officially ordained for the Vaishya varna in Brahmanical legal texts?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Serving the three higher varnas",
    ["Conducting horse sacrifices for emperors", "Commanding naval war fleets", "Directing urban merchant guilds"],
    "D",
    "1. Only one occupation was prescribed for Shudras: that of serving the three 'higher' varnas.\nHence, Option {{CORR}} is correct.",
    "Identifies prescribed role of Shudras."
)
add_q(make_question(CHAPTER, "The Varna System", "According to the rigid prescriptions of the Manusmriti, what single primary duty was assigned to Shudras?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Buddhist texts describe them as Kshatriyas, whereas Brahmanical texts describe them as of low or base origin ('shudra-praya')",
    ["Both traditions unanimously describe them as foreign Greek invaders", "Brahmanical texts claim they were celestial gods who descended from heaven", "Buddhist texts claim they were Persian Zoroastrian merchants"],
    "A",
    "1. Buddhist texts suggest the Mauryas were Kshatriyas, while Brahmanical texts describe them as being of 'low' origin (shudra-praya).\nHence, Option {{CORR}} is correct.",
    "Contrasts Buddhist and Brahmanical views on Mauryan social origin."
)
add_q(make_question(CHAPTER, "Non-Kshatriya Kings", "How do Buddhist texts and Brahmanical texts differ regarding the caste origin of the imperial Mauryas?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Brahmanas",
    ["Kshatriyas", "Vaishyas", "Mlechchhas"],
    "B",
    "1. The immediate successors of the Mauryas, the Shungas and Kanvas, were Brahmanas, proving that anyone who could muster political support could become king.\nHence, Option {{CORR}} is correct.",
    "Identifies Shungas and Kanvas as Brahmana rulers."
)
add_q(make_question(CHAPTER, "Non-Kshatriya Kings", "The Shungas and Kanvas, who succeeded the Mauryan dynasty in Magadha, belonged to which varna?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Regarded as 'mlechchhas' (barbarians / outsiders from Central Asia) by Brahmanas, yet they patronized Sanskrit inscriptions and rebuilt Sudarshana lake",
    ["Regarded as pure orthodox Aryan Kshatriyas from Ayodhya", "Condemned as untouchable chandalas and banned from entering urban cities", "Exempted from all social interactions by royal decree"],
    "C",
    "1. Shakas were regarded as mlechchhas (foreigners/barbarians), yet the Junagadh inscription shows their ruler Rudradaman was thoroughly versed in Sanskrit.\nHence, Option {{CORR}} is correct.",
    "Describes status of Shakas as mlechchhas who adopted Sanskrit culture."
)
add_q(make_question(CHAPTER, "Non-Kshatriya Kings", "The Shaka rulers who established kingdoms in western India were culturally categorized as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Gautamiputra Satakarni",
    ["Simuka", "Hala", "Vashishtiputra Pulumayi"],
    "D",
    "1. The most famous Satavahana ruler, Gautamiputra Satakarni, claimed to be both a unique Brahmana (eka bamhana) and a destroyer of the pride of Kshatriyas.\nHence, Option {{CORR}} is correct.",
    "Identifies Gautamiputra Satakarni claiming to be unique Brahmana."
)
add_q(make_question(CHAPTER, "Non-Kshatriya Kings", "Which celebrated Satavahana ruler claimed the dual titles of 'unique Brahmana' (eka bamhana) and 'destroyer of the pride of Kshatriyas'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "While Varna was fixed strictly at four, Jati had no fixed limit, and new occupational or tribal groups were integrated as jatis",
    ["Varna was decided by wealth, while Jati was decided by astrological horoscope", "Varna was created by the British, while Jati existed in ancient times", "Varna applied only to women, while Jati applied only to men"],
    "A",
    "1. In Brahmanical theory, jati, like varna, was based on birth, but while varnas were fixed at four, there was no restriction on the number of jatis.\nHence, Option {{CORR}} is correct.",
    "Contrasts Varna and Jati."
)
add_q(make_question(CHAPTER, "Jatis and Occupational Mobility", "What is the key structural difference between 'Varna' and 'Jati' in Brahmanical social theory?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Silk weavers who migrated from Lata (Gujarat) to Dasapura (Madhya Pradesh)",
    ["Iron armaments smiths who forged Gupta heavy battle armor", "Bronze sculptors who cast images of the Buddha at Mathura", "Ivory carvers who carved gateways at Sanchi Stupa"],
    "B",
    "1. The Mandasor inscription provides a fascinating record of a guild of silk weavers who migrated from Lata to Dasapura, drawn by the virtues of the local king.\nHence, Option {{CORR}} is correct.",
    "Identifies silk weavers' guild in Mandasor inscription."
)
add_q(make_question(CHAPTER, "Jatis and Occupational Mobility", "The stone inscription from Mandasor provides an exceptional historical account of the migration and social mobility of a guild of:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ivory carvers of Vidisha",
    ["Potters of Varanasi", "Silk weavers of Lata", "Goldsmiths of Ujjayini"],
    "C",
    "1. An inscription on one of the gateways at Sanchi records that it was donated by the ivory carvers of Vidisha.\nHence, Option {{CORR}} is correct.",
    "Identifies ivory carvers of Vidisha donating gateway at Sanchi."
)
add_q(make_question(CHAPTER, "Jatis and Occupational Mobility", "An inscription carved on one of the stone gateways of the Great Stupa at Sanchi records a major financial donation made by the guild of:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Nishadas (forest-dwelling hunter-gatherers)",
    ["Chandalas (untouchable cremation attendants)", "Yavanas (Greek maritime traders)", "Mlechchhas (Central Asian nomadic horsemen)"],
    "D",
    "1. Ekalavya, the skilled archer whom Drona refused to teach, is described in the Mahabharata as belonging to the Nishada community (forest dwellers).\nHence, Option {{CORR}} is correct.",
    "Identifies Ekalavya as belonging to Nishada community."
)
add_q(make_question(CHAPTER, "Beyond the Four Varnas", "In the Mahabharata, the celebrated archer Ekalavya, who sacrificed his thumb to Dronacharya, belonged to which forest-dwelling community?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Mlechchha, meaning outsider or barbarian who did not speak Sanskrit",
    ["Brahmana, meaning sacred Vedic chanter", "Arya, meaning noble civilized dweller", "Dvija, meaning twice-born initiated citizen"],
    "A",
    "1. Shakas and other Central Asian groups were designated as 'mlechchha' (barbarians/foreigners) because they spoke non-Sanskritic languages and had alien customs.\nHence, Option {{CORR}} is correct.",
    "Defines Mlechchha."
)
add_q(make_question(CHAPTER, "Beyond the Four Varnas", "In early Sanskrit literature, non-Sanskritic-speaking foreign peoples from Central Asia were pejoratively designated as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Live outside the village, use discarded utensils, wear clothes of the dead, ornaments of iron, and act as executioners and undertakers",
    ["Reside in royal palaces, collect imperial customs taxes, and lead cavalry charges", "Serve as temple priests performing sacred fire rituals for high-caste patrons", "Farm fertile irrigated lands along the banks of the Kaveri delta"],
    "B",
    "1. The Manusmriti laid down duties for chandalas: living outside the village, using discarded bowls, wearing clothes of the dead, ornaments of iron, and disposing of corpses.\nHence, Option {{CORR}} is correct.",
    "Lists duties of Chandalas in Manusmriti."
)
add_q(make_question(CHAPTER, "Untouchability and Chandalas", "What harsh social duties and restrictions were prescribed for 'chandalas' in the legal codes of the Manusmriti?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Fa Xian (Faxian) in the 5th century CE",
    ["Xuan Zang (Hiuen Tsang) in the 7th century CE", "I-Tsing in the late 7th century CE", "Megasthenes in the 4th century BCE"],
    "C",
    "1. Chinese Buddhist pilgrim Fa Xian noted that 'untouchables' had to sound a clapper in the streets so that people could avoid seeing them.\nHence, Option {{CORR}} is correct.",
    "Identifies Fa Xian noting chandalas striking clappers in streets."
)
add_q(make_question(CHAPTER, "Untouchability and Chandalas", "Which Chinese Buddhist pilgrim who visited India in the 5th century CE recorded that 'untouchables' had to strike a wooden clapper when entering a town so passers-by could avoid pollution?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Executioners and scavengers were forced to live outside the city walls",
    ["All untouchables were employed as personal bodyguards of the emperor", "Untouchables were granted hereditary tax-free agrahara villages", "Caste distinctions were completely eradicated throughout northern India"],
    "D",
    "1. Xuan Zang (7th century CE) observed that executioners and scavengers were forced to live outside the city.\nHence, Option {{CORR}} is correct.",
    "Identifies Xuan Zang's observation on executioners living outside city."
)
add_q(make_question(CHAPTER, "Untouchability and Chandalas", "What notable social segregation did the 7th-century Chinese pilgrim Xuan Zang observe regarding executioners and scavengers in Indian cities?", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Untouchability",
    "Brahmanas developed a sharp social divide by classifying certain social groups as 'untouchable' based on notions of pollution.",
    "Activities such as handling corpses and dead animals were regarded as polluting, and those who performed them were designated as chandalas.",
    1, "A",
    "1. Both statements are accurate NCERT facts: notions of purity and pollution underpinned the Brahmanical classification of untouchability.",
    "Confirms both statements are correct regarding untouchability."
))

add_q(make_assertion_question(
    CHAPTER, "Jatis and Guilds",
    "Whenever Brahmanical authorities encountered communities whose occupations did not fit into the fourfold varna system, they classified them as jatis.",
    "Jatis that shared a common occupation or craft were occasionally organized into guilds (shrenis).",
    2, "B",
    "1. Both statements are true NCERT facts, but (R) describes guild organization, which is not the causal reason why authorities classified new groups into jatis.",
    "Confirms both statements are true but (R) is not the correct explanation of (A)."
))

# =================================================================================================
# 3. Gendered Property, Buddhist Critique & Mahabharata Transmission (Q36 - Q60)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Paternal estate was to be divided equally amongst sons after the death of parents, with a special share for the eldest, while daughters could not claim any share",
    ["Paternal property was inherited exclusively by the youngest daughter", "Women inherited 100% of all agricultural land and cattle herds", "All private property was compulsorily surrendered to the state treasury"],
    "A",
    "1. According to the Manusmriti, the paternal estate was divided equally amongst sons after parents' death, with a special share for the eldest, while women had no claim.\nHence, Option {{CORR}} is correct.",
    "Explains rules of inheritance in Manusmriti."
)
add_q(make_question(CHAPTER, "Gendered Access to Property", "According to the Manusmriti, how was paternal property to be distributed after the death of parents?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Stridhana (literally, a woman's wealth)",
    ["Agrahara", "Bhaga", "Sulka"],
    "B",
    "1. Women were allowed to retain the gifts they received on the occasion of their marriage as 'stridhana' (woman's wealth), which could be inherited by children without husband's claim.\nHence, Option {{CORR}} is correct.",
    "Defines Stridhana."
)
add_q(make_question(CHAPTER, "Gendered Access to Property", "Gifts given to a bride on the occasion of her wedding, which she was legally permitted to retain as personal property, were termed:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A wealthy Shudra could command respect and service from members of all four varnas, showing that status was determined by wealth rather than birth",
    ["Shudras were universally executed if they acquired gold coins", "Brahmanas were legally prohibited from owning any money", "All kings in the Ganga valley were Shudras"],
    "C",
    "1. In the dialogue in Majjhima Nikaya between King Avantiputta and Kachchana, it is shown that a wealthy Shudra would be served by Brahmanas, Kshatriyas, and Vaishyas, proving economic power trumps varna.\nHence, Option {{CORR}} is correct.",
    "Analyzes Buddhist dialogue proving wealth determines social status."
)
add_q(make_question(CHAPTER, "Buddhist Critique of Varna", "In the Buddhist dialogue between King Avantiputta and the disciple Kachchana in the Majjhima Nikaya, what revolutionary social reality was demonstrated?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "It rejected the idea that social distinctions were natural or permanent, and recognized that claims to status based on birth were unjustified",
    ["It mandated that all citizens must become Buddhist monks within seven days", "It declared that only Kshatriya kings could attain nirvana", "It ordered the military conquest of all foreign kingdoms"],
    "D",
    "1. Early Buddhism recognized that there were differences in society, but did not regard these as natural or inflexible, rejecting claims to superiority based on birth.\nHence, Option {{CORR}} is correct.",
    "Summarizes Buddhist view on social inequality."
)
add_q(make_question(CHAPTER, "Buddhist Critique of Varna", "How did early Buddhist philosophy fundamentally view the Brahmanical institution of hereditary caste hierarchy?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A legendary primeval contract where people elected an exceptional individual (Mahasammata, 'the great elect') to maintain order in return for a proportion of rice",
    ["A divine mandate where God created four distinct classes from his cosmic limbs", "A military decree imposed by Alexander of Macedon upon conquered tribes", "An eternal unalterable law revealed directly to Vedic rishis"],
    "A",
    "1. The Buddhist text Sutta Pitaka suggested a social contract myth: humans originally lived in peace, but as corruption crept in, they elected Mahasammata ('the great elect') to enforce law in return for taxes.\nHence, Option {{CORR}} is correct.",
    "Describes Buddhist social contract theory in Sutta Pitaka."
)
add_q(make_question(CHAPTER, "Buddhist Theory of Kingship", "In the Sutta Pitaka, how is the origin of human government and kingship explained?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sutas (charioteer-bards) who accompanied Kshatriya warriors to the battlefield and composed poems celebrating their victories",
    ["Foreign Greek scribes resident in the court of Pataliputra", "Buddhist monks residing in rock-cut caves of Ajanta", "Court accountants managing the imperial mint"],
    "B",
    "1. The original story of the Mahabharata was probably composed by charioteer-bards known as sutas who accompanied warriors and sang of their exploits.\nHence, Option {{CORR}} is correct.",
    "Identifies Sutas as original composers of the Mahabharata."
)
add_q(make_question(CHAPTER, "Authors and Dates of Mahabharata", "Who were the original composers of the oral heroic tales that formed the core of the Mahabharata?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "From the fifth century BCE onwards",
    ["In the tenth century CE", "During the Indus Valley Civilisation (c. 2000 BCE)", "In the second century CE exclusively"],
    "C",
    "1. From the fifth century BCE, Brahmanas took over the story and began committing it to writing, adding didactic sections.\nHence, Option {{CORR}} is correct.",
    "Identifies 5th century BCE as period when Brahmanas began writing Mahabharata."
)
add_q(make_question(CHAPTER, "Authors and Dates of Mahabharata", "From which century BCE did Brahmanas begin collecting, compiling, and committing the oral epic of the Mahabharata to writing?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Over 100,000 verses (shlokas)",
    ["Exactly 10,000 verses", "About 24,000 verses", "Over 500,000 verses"],
    "D",
    "1. In its final form, spanning additions over a thousand years (c. 500 BCE to 400 CE), the Mahabharata contains over 100,000 verses.\nHence, Option {{CORR}} is correct.",
    "Identifies over 100,000 verses in the Mahabharata."
)
add_q(make_question(CHAPTER, "Authors and Dates of Mahabharata", "In its final compiled classical Sanskrit form, the Mahabharata contains approximately how many verses (shlokas)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Narrative (sections that contain stories) and Didactic (sections that contain prescriptions about social norms and morality)",
    ["Sanskrit verse and Persian prose translations", "Military battle rosters and commercial tax records", "Astronomical calculations and medical prescriptions"],
    "A",
    "1. Historians classify the contents of the Mahabharata under two broad heads: sections that contain stories (narrative) and sections that contain social prescriptions (didactic).\nHence, Option {{CORR}} is correct.",
    "Identifies Narrative and Didactic sections of the Mahabharata."
)
add_q(make_question(CHAPTER, "Handling Texts: Mahabharata", "Historians broadly classify the diverse textual contents of the Mahabharata into which two distinct categories?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Bhagavad Gita",
    ["Savitri episode", "Nala-Damayanti episode", "Shakuntala episode"],
    "B",
    "1. The most important didactic section of the Mahabharata is the Bhagavad Gita, containing Krishna's discourse on dharma, karma, and devotion to Arjuna on the battlefield of Kurukshetra.\nHence, Option {{CORR}} is correct.",
    "Identifies Bhagavad Gita as most celebrated didactic section."
)
add_q(make_question(CHAPTER, "Handling Texts: Mahabharata", "Which celebrated philosophical text incorporated into the Bhishma Parva of the Mahabharata represents its most famous didactic component?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sage Vyasa (Veda Vyasa)",
    ["Sage Valmiki", "Sage Agastya", "Sage Vishvamitra"],
    "C",
    "1. Traditionally, the authorship of the entire monumental epic of the Mahabharata is attributed to the legendary sage Vyasa.\nHence, Option {{CORR}} is correct.",
    "Identifies Sage Vyasa as traditional author of Mahabharata."
)
add_q(make_question(CHAPTER, "Authors and Dates of Mahabharata", "According to classical Indian tradition, the authorship of the monumental Mahabharata is attributed to which revered sage?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "B.B. Lal in 1951-52",
    ["Alexander Cunningham in 1861", "V.S. Sukthankar in 1919", "John Marshall in 1924"],
    "D",
    "1. In 1951-52, the archaeologist B.B. Lal excavated at a village named Hastinapura in Meerut district, Uttar Pradesh.\nHence, Option {{CORR}} is correct.",
    "Identifies B.B. Lal excavating Hastinapura in 1951-52."
)
add_q(make_question(CHAPTER, "Search for Convergence: Hastinapura", "In 1951-52, which distinguished Indian archaeologist conducted extensive excavations at Hastinapura in Meerut district (Uttar Pradesh)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Five occupational levels",
    ["Two occupational levels", "Ten occupational levels", "Twenty-five occupational levels"],
    "A",
    "1. Lal found evidence of five occupational levels at Hastinapura, of which the second and third are of particular historical interest.\nHence, Option {{CORR}} is correct.",
    "Identifies five occupational levels at Hastinapura."
)
add_q(make_question(CHAPTER, "Search for Convergence: Hastinapura", "How many successive occupational levels were identified by B.B. Lal during his stratigraphic excavations at Hastinapura?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Period II (c. 12th - 7th century BCE) associated with Painted Grey Ware (PGW), mud plaster houses with reed impressions, and terracotta animal figurines",
    ["Period I associated with polished stone tools and microliths", "Period V associated with modern machine-manufactured bricks", "Period IV associated with Roman glass vials and silver denarii"],
    "B",
    "1. Period II (c. 12th-7th century BCE) yielded Painted Grey Ware (PGW), houses of mud and mud-bricks with reed marks, and domestic animal bones.\nHence, Option {{CORR}} is correct.",
    "Describes Period II at Hastinapura with PGW."
)
add_q(make_question(CHAPTER, "Search for Convergence: Hastinapura", "At Hastinapura, which archaeological period was marked by the presence of Painted Grey Ware (PGW) and mud houses with reed impressions?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Terracotta ring-wells used both as drainage wells and soak pits, mud bricks and burnt bricks",
    ["Colossal granite pyramids containing mummified rulers", "Acoustic amphitheaters built of carved white Italian marble", "Deep subterranean bunkers storing bronze gunpowder munitions"],
    "C",
    "1. In Period III (c. 6th-3rd century BCE) at Hastinapura, houses were made of mud-brick and burnt brick, and terracotta ring-wells were used as soak pits and drains.\nHence, Option {{CORR}} is correct.",
    "Describes Period III at Hastinapura with ring wells."
)
add_q(make_question(CHAPTER, "Search for Convergence: Hastinapura", "What notable civic and sanitary feature was discovered in Period III (c. 6th to 3rd century BCE) at Hastinapura?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Draupadi's polyandrous marriage to the five Pandava brothers",
    ["Arjuna's exile to the forest", "Bhishma's vow of lifelong celibacy", "Karna's donation of his divine armour"],
    "D",
    "1. One of the most challenging episodes in the Mahabharata is Draupadi's marriage to the five Pandavas, an instance of polyandry that authors attempted to explain through diverse mythic justifications.\nHence, Option {{CORR}} is correct.",
    "Identifies Draupadi's polyandrous marriage in the Mahabharata."
)
add_q(make_question(CHAPTER, "Marriage Practices in Mahabharata", "Which controversial matrimonial relationship in the Mahabharata is a classic literary example of polyandry?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Mahasweta Devi",
    ["Amrita Pritam", "Arundhati Roy", "Ismat Chughtai"],
    "A",
    "1. Noted contemporary writer Mahasweta Devi wrote a brilliant short story titled 'Kunti O Nishadi', reinterpreting the epic narrative from the perspective of an exploited tribal woman.\nHence, Option {{CORR}} is correct.",
    "Identifies Mahasweta Devi reinterpreting Mahabharata in 'Kunti O Nishadi'."
)
add_q(make_question(CHAPTER, "Dynamic Text", "Which prominent Indian literary figure wrote the celebrated short story 'Kunti O Nishadi', reinterpreting the Mahabharata through the eyes of an impoverished tribal woman?", opts, corr, sol))

add_q(make_sequence_question(
    CHAPTER, "Transmission of Mahabharata",
    "Arrange the following stages in the transmission and study of the Mahabharata in chronological order:",
    [
        ("A", "B.B. Lal excavates the site of Hastinapura in Meerut"),
        ("B", "V.S. Sukthankar begins the Critical Edition of the Mahabharata"),
        ("C", "Brahmanas begin compiling and committing the epic to writing (adding didactic portions)"),
        ("D", "Charioteer-bards (sutas) compose oral heroic poems celebrating warrior deeds")
    ],
    "D, C, B, A",
    "B",
    "1. Sutas composed oral tales (D); Brahmanas committed to writing c. 500 BCE (C); Sukthankar's Critical Edition 1919 (B); B.B. Lal's excavations 1951-52 (A).",
    "Orders stages of Mahabharata compilation and excavation chronologically."
))

add_q(make_match_question(
    CHAPTER, "Key Historical Figures and Roles",
    "Match the ancient persona in List I with their defining social role/action in List II:",
    [("A", "V.S. Sukthankar"), ("B", "B.B. Lal"), ("C", "Gautamiputra Satakarni"), ("D", "Prabhavati Gupta")],
    [("i", "Claimed to be unique Brahmana and destroyer of Kshatriya pride"), ("ii", "General editor of the Critical Edition of the Mahabharata"), ("iii", "Excavated the archaeological site of Hastinapura"), ("iv", "Vakataka queen who issued copperplate land grants")],
    "A-ii, B-iii, C-i, D-iv",
    "C",
    "1. Sukthankar = Critical Edition (A-ii), B.B. Lal = Hastinapura (B-iii), Gautamiputra = unique Brahmana (C-i), Prabhavati Gupta = land grants (D-iv).",
    "Matches ancient figures with their roles."
))

add_q(make_assertion_question(
    CHAPTER, "Nature of Mahabharata",
    "The Mahabharata is described by historians as a dynamic text rather than a static composition.",
    "Over the centuries, the epic was rewritten in diverse languages, and episodes were depicted in sculpture, painting, and regional performing arts.",
    1, "A",
    "1. Both (A) and (R) are true, and the centuries of continuous retellings, translations, and artistic adaptations prove why the Mahabharata is a dynamic living text.",
    "Confirms (R) is the correct explanation of (A)."
))

opts, corr, sol = rotate_options(
    "The Sanskrit used in the Mahabharata is generally far simpler than that of the Vedas or classical prashastis, making it accessible to a wider audience",
    ["It was composed in classical Latin and translated into French", "It was written in an impenetrable secret code known only to court astrologers", "It contains zero grammatical rules and was purely phonetic slang"],
    "A",
    "1. The language of the Mahabharata is Sanskrit, but it is generally far simpler than that of the Vedas or classical prashastis, which is why it was widely understood.\nHence, Option {{CORR}} is correct.",
    "Describes simplicity of Sanskrit language of the Mahabharata."
)
add_q(make_question(CHAPTER, "Language of Mahabharata", "How does the Sanskrit language employed in the Mahabharata compare with that of the early Vedic hymns and classical court prashastis?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kula denotes family, Jnati denotes larger network of kinfolk, and Vamsha denotes lineage/descent",
    ["Kula denotes army, Jnati denotes king, and Vamsha denotes weapons", "Kula denotes tax, Jnati denotes grain, and Vamsha denotes land", "Kula denotes foreign merchants, Jnati denotes slaves, and Vamsha denotes monks"],
    "B",
    "1. Sanskrit texts use the term 'kula' to designate families, 'jnati' for the larger network of kinfolk, and 'vamsha' for lineage or descent.\nHence, Option {{CORR}} is correct.",
    "Defines Kula, Jnati, and Vamsha."
)
add_q(make_question(CHAPTER, "Kinship Terminology", "In Sanskrit sociological texts, what specific social units do the terms 'kula', 'jnati', and 'vamsha' denote respectively?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Matanga Jataka",
    ["Sibi Jataka", "Ruru Jataka", "Kurudhamma Jataka"],
    "C",
    "1. In the Matanga Jataka, the Bodhisatta is born as a chandala named Matanga who challenges caste arrogance and marries the merchant's daughter Dittha Mangalika.\nHence, Option {{CORR}} is correct.",
    "Identifies Matanga Jataka portraying a Chandala Bodhisatta."
)
add_q(make_question(CHAPTER, "Buddhist Critiques of Caste", "Which Jataka story tells the compelling tale of a Bodhisatta born as a chandala named Matanga who marries a wealthy merchant's daughter named Dittha Mangalika?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Apad-dharma (duties during times of emergency/distress)",
    ["Rajadharma (duties of a king)", "Ashramadharma (duties of life stages)", "Mokshadharma (path to salvation)"],
    "D",
    "1. In times of distress (apad), the Dharmashastras formulated rules known as apad-dharma, permitting higher varnas to take up occupations of lower varnas to survive.\nHence, Option {{CORR}} is correct.",
    "Defines Apad-dharma."
)
add_q(make_question(CHAPTER, "Caste Mobility in Distress", "The special legal provisions in the Dharmashastras that permitted Brahmanas or Kshatriyas to adopt alternative occupations during times of acute distress or famine were termed:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Chiefs and kings were expected to share their wealth generously with bards, dancers, and kinfolk, while miserly accumulators were openly condemned",
    ["All agricultural land was owned collectively by the Roman emperor", "Peasants were legally prohibited from owning domestic cattle", "Merchants were required to throw all gold coins into the sea"],
    "A",
    "1. In early Tamilakam, Sangam poems praise patrons who shared wealth with poets, musicians, and kin, portraying stingy resource hoarders as contemptible.\nHence, Option {{CORR}} is correct.",
    "Describes social ideal of sharing wealth in early Tamilakam."
)
add_q(make_question(CHAPTER, "Alternative Social Scenarios: Tamilakam", "In the early historic societies of southern India reflected in Sangam poetry, what was the prevailing cultural norm regarding private wealth accumulation?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "She challenged whether Yudhishthira had lost himself first in the game of dice, arguing that if he had already lost himself, he had no legal right to stake her",
    ["She demanded that all gambling dice be subjected to chemical testing by Roman jurists", "She immediately declared herself the sovereign empress of Hastinapura", "She ordered the assembly of Kauravas to convert to Buddhism"],
    "B",
    "1. Draupadi asked the profound legal question in the assembly: Did Yudhishthira lose himself first before staking her? If he had lost himself, he was no longer his own master to stake his wife.\nHence, Option {{CORR}} is correct.",
    "Explains Draupadi's legal challenge in the dice game."
)
add_q(make_question(CHAPTER, "Gender and Property: Draupadi's Question", "When brought before the Kuru assembly during the gambling match, what fundamental legal question did Draupadi raise regarding Yudhishthira's wager?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Polyandry may have been prevalent among ruling elites and communities in the Himalayan region, and may have served to prevent fragmentation of landholdings",
    ["Polyandry was legally required for all Buddhist monks", "Polyandry was introduced by Alexander of Macedon's soldiers", "Polyandry was invented by British colonial governors"],
    "C",
    "1. Anthropologists note that polyandry was prevalent in the Himalayan region and often helped prevent the division of scarce agricultural landholdings among brothers.\nHence, Option {{CORR}} is correct.",
    "Explains prevalence and rationale of polyandry in Himalayan regions."
)
add_q(make_question(CHAPTER, "Marriage Practices: Polyandry", "What socioeconomic reason do social historians and anthropologists suggest for the historical practice of fraternal polyandry in Himalayan border regions?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ganesha was enlisted as the scribe who agreed to write the epic only on condition that Vyasa recited without pausing",
    ["Hanuman served as the battlefield commander who recorded casualties", "Arjuna wrote the epic on palm leaves while driving his chariot", "Indra dispatched celestial scribes from Mount Meru"],
    "D",
    "1. According to popular tradition, Sage Vyasa dictated the entire epic to the elephant-headed deity Ganesha, who served as his divine scribe.\nHence, Option {{CORR}} is correct.",
    "Identifies Ganesha as divine scribe of Vyasa."
)
add_q(make_question(CHAPTER, "Authorship and Tradition", "According to widespread Indian literary tradition and manuscript miniature paintings, which deity served as the scribe to whom Sage Vyasa dictated the Mahabharata?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "First four were considered approved and righteous, while the remaining four (including Asura, Gandharva, Rakshasa, Paishacha) were condemned",
    ["All eight were declared equally sinful by Vedic sages", "The first seven were reserved exclusively for Greek foreigners", "Only Paishacha marriage was permitted for Brahmanas"],
    "A",
    "1. Of the eight forms of marriage, the first four (Brahma, Daiva, Arsha, Prajapatya) were approved; the last four (Asura, Gandharva, Rakshasa, Paishacha) were condemned.\nHence, Option {{CORR}} is correct.",
    "Classifies approved vs disapproved forms of marriage."
)
add_q(make_question(CHAPTER, "Rules of Marriage", "Among the eight traditional forms of marriage categorized in the Manusmriti, which distinction was drawn between the first four and the remaining four?", opts, corr, sol))

# Verification of Unit 3
print(f"Total questions generated for Unit 3: {len(questions)}")
assert len(questions) == 60, f"Expected 60 questions, got {len(questions)}"

out_path = "mock/history_units/unit3.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved 60 questions to {out_path}!")
