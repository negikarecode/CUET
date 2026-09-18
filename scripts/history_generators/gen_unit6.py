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

CHAPTER = "Bhakti-Sufi Traditions"

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen_texts:
        raise ValueError(f"Duplicate question inside Unit 6: {q['questionText'][:60]}")
    if norm in pyq_set:
        raise ValueError(f"Question matches PYQ: {q['questionText'][:60]}")
    seen_texts.add(norm)
    q["questionNumber"] = len(questions) + 1
    questions.append(q)

print("Generating 80 unique questions for Unit 6: Bhakti-Sufi Traditions...")

# --- 1. Alvars and Nayanars (Tamil Bhakti) ---

opts, corr, sol = rotate_options(
    "Nalayira Divyaprabandham",
    ["Tevaram", "Tiruvacakam", "Periyapuranam"],
    "A",
    "1. The Nalayira Divyaprabandham is an anthology of 4,000 poems composed by the twelve Alvars, frequently described as the Tamil Veda.\nHence, Option {{CORR}} is correct.",
    "Identifies Nalayira Divyaprabandham as the Tamil Veda."
)
add_q(make_question(CHAPTER, "Alvars and Nayanars", "Which canonical text composed by the twelve Alvars is revered in southern Vaishnavism as the Tamil Veda?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Devotion to Lord Vishnu",
    ["Exclusive worship of Lord Shiva", "Adoration of the Sun god Surya", "Worship of the Mother Goddess Shakti"],
    "B",
    "1. The Alvars were Tamil poet-saints who were immersed in devotion to Vishnu, while the Nayanars were devotees of Shiva.\nHence, Option {{CORR}} is correct.",
    "Distinguishes Alvars from Nayanars based on deity."
)
add_q(make_question(CHAPTER, "Alvars and Nayanars", "What was the defining theological feature of the early medieval southern poet-saints known as the Alvars?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Andal",
    ["Karaikkal Ammeiyar", "Akka Mahadevi", "Muktabai"],
    "C",
    "1. Andal was the only female Alvar whose devotional poetry expressed profound love for Vishnu (Ranganatha), and her compositions are widely sung in Tamil Nadu temples.\nHence, Option {{CORR}} is correct.",
    "Identifies Andal as the celebrated female Alvar."
)
add_q(make_question(CHAPTER, "Women Bhaktas", "Which female Alvar poet-saint saw herself as the beloved of Lord Vishnu and expressed her intense devotional longing in celebrated Tamil verses?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Karaikkal Ammeiyar",
    ["Andal", "Mirabai", "Gangadevi"],
    "D",
    "1. Karaikkal Ammeiyar, a devotee of Shiva, adopted the path of extreme asceticism in order to attain her goal, renouncing conventional beauty.\nHence, Option {{CORR}} is correct.",
    "Identifies Karaikkal Ammeiyar as the Shaivite ascetic poet."
)
add_q(make_question(CHAPTER, "Women Bhaktas", "Which prominent woman Nayanar devotee adopted rigorous asceticism and discarded traditional feminine domesticity to attain spiritual union with Shiva?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Tevaram",
    ["Nalayira Divyaprabandham", "Periyapuranam", "Silappadikaram"],
    "A",
    "1. The Tevaram is the collection of Shiva devotional hymns composed by Appar, Sambandar, and Sundarar, classified and compiled in the tenth century.\nHence, Option {{CORR}} is correct.",
    "Identifies Tevaram as the Nayanar compilation."
)
add_q(make_question(CHAPTER, "Shaiva Literature", "What is the name of the celebrated compilation of Shaivite devotional poems composed by the prominent Nayanars Appar, Sambandar, and Sundarar?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Tondaradippodi",
    ["Nammalvar", "Periyalvar", "Kulasekhara"],
    "B",
    "1. Tondaradippodi Alvar was a Brahmana who wrote verses expressing opposition to caste arrogance and declaring that devotees of Vishnu from lower castes were superior to learned Brahmanas.\nHence, Option {{CORR}} is correct.",
    "Identifies Tondaradippodi Alvar."
)
add_q(make_question(CHAPTER, "Critique of Caste by Alvars", "Which Brahmana Alvar poet-saint vehemently expressed in his poetry that genuine outcaste devotees of Vishnu were far superior to Brahmanas who lacked true devotion?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Parantaka I",
    ["Rajaraja Chola I", "Rajendra Chola I", "Kulottunga I"],
    "C",
    "1. Chola monarch Parantaka I consecrated metal images of Sambandar, Appar, and Sundarar in a Shiva temple, carrying them in temple processions.\nHence, Option {{CORR}} is correct.",
    "Identifies Parantaka I consecrating metal statues of Nayanars."
)
add_q(make_question(CHAPTER, "Chola Patronage of Bhakti", "Which Chola ruler is recorded to have consecrated metal images of Appar, Sambandar, and Sundarar in a temple to be carried in ceremonial processions?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Nambi Andar Nambi",
    ["Sekkizhar", "Manikkavacakar", "Vedanta Desika"],
    "D",
    "1. Nambi Andar Nambi compiled and organized the hymns of the Nayanars into the Tevaram under the patronage of the Chola king Rajaraja I.\nHence, Option {{CORR}} is correct.",
    "Identifies Nambi Andar Nambi as the compiler of Tevaram."
)
add_q(make_question(CHAPTER, "Shaiva Literature", "Which 10th-century scholar compiled the hymns of the three major Nayanars into the canonical text known as Tevaram?", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Alvars and Nayanars",
    "Both the Alvars and Nayanars initiated movements of protest against the caste system and the dominance of Brahmanas.",
    "Bhakti saints in Tamil Nadu completely excluded women from composing hymns or participating in religious traditions.",
    3,
    "A",
    "1. Statement I is correct: Alvars and Nayanars drew followers from all castes including peasants and untouchables, protesting caste stratification.\n2. Statement II is incorrect: Women like Andal and Karaikkal Ammeiyar composed influential hymns and were central figures in the tradition.",
    "Assesses inclusivity and social critique of Tamil Bhakti."
))

add_q(make_assertion_question(
    CHAPTER, "Chola Temple Architecture",
    "Chola kings extensively supported the Alvar and Nayanar traditions by constructing monumental stone temples at Thanjavur, Gangaikondacholapuram, and Chidambaram.",
    "Chola rulers sought to proclaim their divine status and claim moral legitimacy by associating themselves with popular Bhakti saints.",
    1,
    "A",
    "1. Assertion (A) is true: The Cholas built massive temples that housed both deities and representations of Bhakti saints.\n2. Reason (R) is true: By patronizing popular local cults, monarchs consolidated authority and legitimized their rule.\n3. Reason (R) correctly explains Assertion (A).",
    "Analyzes royal patronage and legitimation in Chola Bhakti."
))

# --- 2. Virashaiva Tradition in Karnataka ---

opts, corr, sol = rotate_options(
    "Basavanna",
    ["Allama Prabhu", "Madhavacharya", "Ramanuja"],
    "A",
    "1. Basavanna was a Brahmana minister at the court of the Kalachuri ruler who led the Virashaiva (Lingayat) movement in 12th-century Karnataka.\nHence, Option {{CORR}} is correct.",
    "Identifies Basavanna as the founder of the Virashaiva movement."
)
add_q(make_question(CHAPTER, "Virashaiva Tradition", "Who was the 12th-century founder of the Virashaiva movement in Karnataka, who served as a minister in the court of a Kalachuri ruler?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A small linga in a silver loop worn over the left shoulder",
    ["A sacred thread made of deer skin", "A bronze trishul in the right hand", "A sectarian marking of red vermillion on the chest"],
    "B",
    "1. Lingayats wear a small linga encased in a silver reliquary looped over the left shoulder as a symbol of personal devotion to Shiva.\nHence, Option {{CORR}} is correct.",
    "Identifies the distinctive religious emblem of Lingayats."
)
add_q(make_question(CHAPTER, "Virashaiva Tradition", "What distinctive emblem do initiated male devotees of the Lingayat tradition wear constantly on their bodies?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "They bury their dead instead of cremating them",
    ["They cremate their dead with Vedic fire sacrifices", "They immerse ashes in the holy river Ganga", "They expose dead bodies on towers of silence"],
    "C",
    "1. Lingayats believe that on death the devotee will be united with Shiva and will not return to the world; therefore, they do not cremate but bury their dead.\nHence, Option {{CORR}} is correct.",
    "Identifies Lingayat funerary practices."
)
add_q(make_question(CHAPTER, "Virashaiva Beliefs", "Which distinctive funerary practice is observed by Lingayats, setting them apart from orthodox Brahmanical traditions?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Vachanas",
    ["Dohas", "Abhangas", "Sakhis"],
    "D",
    "1. The Virashaiva poet-saints composed short devotional and philosophical sayings in Kannada known as Vachanas.\nHence, Option {{CORR}} is correct.",
    "Identifies Vachanas as Virashaiva compositions."
)
add_q(make_question(CHAPTER, "Virashaiva Literature", "In what literary genre did Basavanna, Allama Prabhu, and Akka Mahadevi compose their vernacular devotional expressions in Kannada?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Advocated post-puberty marriages and permitted widow remarriage",
    ["Enforced strict child marriage for all women", "Prohibited widows from ever remarrying", "Mandated the practice of Sati for deceased saints' wives"],
    "A",
    "1. Lingayats challenged caste rules and orthodox Dharmashastric restrictions on women, permitting widow remarriage and post-puberty marriage.\nHence, Option {{CORR}} is correct.",
    "Identifies Lingayat stance on widow remarriage."
)
add_q(make_question(CHAPTER, "Lingayat Social Reform", "Which progressive social stance regarding marriage practices was actively championed by the Lingayat community in medieval Karnataka?", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Lingayat Beliefs",
    "Lingayats firmly rejected the caste system and the Brahmanical concept of rebirth and ritual pollution.",
    "Lingayats worshipped Lord Shiva exclusively in the form of massive anthropomorphic stone icons placed inside sanctums.",
    3,
    "B",
    "1. Statement I is correct: Lingayats rejected caste pollution, varna hierarchy, and the theory of rebirth.\n2. Statement II is incorrect: Lingayats worship Shiva in his manifestation as a linga worn on the body, rejecting ritual idol worship in temple sanctums.",
    "Examines Lingayat theology and rejection of temple rituals."
))

add_q(make_assertion_question(
    CHAPTER, "Virashaiva Social Protest",
    "The Lingayat movement attracted large numbers of followers from marginalized social groups such as artisans and peasants.",
    "The Virashaivas provided a radical critique of Brahmanical social hierarchies and rejected caste-based discrimination.",
    1,
    "A",
    "1. Assertion (A) is true: The Lingayat movement gained mass popularity among peasants, weavers, and oppressed castes.\n2. Reason (R) is true: Basavanna's rejection of caste inequalities directly appealed to marginalized communities.\n3. Reason (R) directly explains Assertion (A).",
    "Explains social appeal of the Virashaiva movement."
))

# --- 3. Northern Traditions & Yogic Ferment ---

opts, corr, sol = rotate_options(
    "Nathpanthis, Siddhacharyas, and Yogis",
    ["Smartas and Mimamsakas", "Vedantins and Charvakas", "Ajivikas and Digambaras"],
    "A",
    "1. In north India, groups like Naths, Jogis, and Siddhas came from artisan backgrounds and challenged the authority of the Vedas through vernacular poetry.\nHence, Option {{CORR}} is correct.",
    "Identifies Naths, Jogis, and Siddhas as anti-orthodox groups."
)
add_q(make_question(CHAPTER, "Northern Heterodoxy", "Which medieval socio-religious groups in northern India, often emerging from artisan backgrounds like weavers, openly challenged Vedic ritualism and Brahmanical hegemony?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Gorakhnath",
    ["Matsyendranath", "Charpatinath", "Jalandharnath"],
    "B",
    "1. Gorakhnath was the most influential figure associated with the Nathpanthi movement, advocating mental discipline through Hatha yoga.\nHence, Option {{CORR}} is correct.",
    "Identifies Gorakhnath as leader of Nathpanthis."
)
add_q(make_question(CHAPTER, "Northern Heterodoxy", "Who was the prominent legendary leader of the Nathpanthis whose followers emphasized psycho-physical yogic practices and popular asceticism?", opts, corr, sol))

# --- 4. Islamic Context and Sufi Traditions ---

opts, corr, sol = rotate_options(
    "Muhammad bin Qasim",
    ["Mahmud of Ghazni", "Muhammad Ghori", "Qutbuddin Aibak"],
    "C",
    "1. Arab general Muhammad bin Qasim conquered Sindh in 711 CE, bringing it under the Caliphate.\nHence, Option {{CORR}} is correct.",
    "Identifies Muhammad bin Qasim's conquest of Sindh."
)
add_q(make_question(CHAPTER, "Advent of Islam", "Which Arab military commander led the conquest of Sindh in 711 CE, marking the formal arrival of Islamic political authority in the subcontinent?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Zimmis",
    ["Ulama", "Murids", "Muftis"],
    "D",
    "1. Non-Muslim subjects who followed revealed scriptures (and later extended to Hindus) were categorized as 'Zimmis' (protected people) and paid jizya.\nHence, Option {{CORR}} is correct.",
    "Identifies Zimmis as protected tax-paying subjects."
)
add_q(make_question(CHAPTER, "Islamic Governance", "What legal term was applied under medieval Islamic rule to protected non-Muslim subjects who paid the jizya tax in exchange for religious freedom and protection?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Shari'a",
    ["Fatwa", "Hadith", "Ijma"],
    "A",
    "1. Shari'a is the law governing the Muslim community, derived from the Quran, Sunna (tradition of the Prophet), qiyas (analogical reasoning), and ijma (consensus).\nHence, Option {{CORR}} is correct.",
    "Defines Shari'a and its sources."
)
add_q(make_question(CHAPTER, "Islamic Legal Concepts", "What is the comprehensive Islamic religious law derived from the Quran, Hadith, Qiyas, and Ijma called?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Spiritual genealogy and chain of transmission connecting Sufi masters back to Prophet Muhammad",
    ["The military succession of the Caliphate", "The collection of revenue from rural endowments", "The royal decrees issued by the Delhi Sultans"],
    "B",
    "1. A silsila literally means a chain, signifying a continuous spiritual link between the master (shaikh) and disciple tracing back to Prophet Muhammad.\nHence, Option {{CORR}} is correct.",
    "Explains the meaning of Sufi silsila."
)
add_q(make_question(CHAPTER, "Sufi Silsilas", "What does the term 'silsila' denote in the context of medieval Sufi monastic organization?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ba-shari'a conformed strictly to Islamic law, whereas be-shari'a operated outside formal legal boundaries",
    ["Ba-shari'a rejected all music, whereas be-shari'a composed qawwalis", "Ba-shari'a accepted royal grants, whereas be-shari'a refused them", "Ba-shari'a stayed in khanqahs, whereas be-shari'a lived in royal courts"],
    "C",
    "1. Sufi orders that observed the Shari'a were called ba-shari'a, while wandering dervishes and mendicants who ignored formal shari'a norms were termed be-shari'a.\nHence, Option {{CORR}} is correct.",
    "Distinguishes ba-shari'a and be-shari'a."
)
add_q(make_question(CHAPTER, "Sufi Categories", "How did medieval Sufi traditions distinguish between the 'ba-shari'a' and 'be-shari'a' movements?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Madaris and Qalandars",
    ["Chishtis and Suhrawardis", "Qadiris and Naqshbandis", "Firdawsis and Kubrawis"],
    "D",
    "1. Wandering ascetics who defied conventional social norms and shari'a were known as Qalandars, Madaris, Malangs, and Haidaris (be-shari'a).\nHence, Option {{CORR}} is correct.",
    "Identifies Qalandars and Madaris as be-shari'a mendicants."
)
add_q(make_question(CHAPTER, "Be-shari'a Groups", "Which among the following groups represented the wandering, mendicant, antinomian (be-shari'a) Sufi tradition in medieval India?", opts, corr, sol))

# --- 5. The Chishti Silsila in India ---

opts, corr, sol = rotate_options(
    "Khwaja Muinuddin Chishti",
    ["Shaikh Nizamuddin Auliya", "Khwaja Qutbuddin Bakhtiyar Kaki", "Baba Farid"],
    "A",
    "1. Khwaja Muinuddin Chishti established the Chishti silsila in India, establishing his centre at Ajmer in the late 12th century.\nHence, Option {{CORR}} is correct.",
    "Identifies Khwaja Muinuddin Chishti introducing Chishti order to India."
)
add_q(make_question(CHAPTER, "Chishti Silsila", "Which venerable Sufi saint introduced the Chishti silsila into the Indian subcontinent, establishing his khanqah at Ajmer?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Shaikh Nizamuddin Auliya",
    ["Khwaja Muinuddin Chishti", "Shaikh Nasiruddin Mahmud", "Shaikh Salim Chishti"],
    "B",
    "1. Shaikh Nizamuddin Auliya had his famous hospice at Ghiyaspur near Delhi, attracting disciples from all strata of society.\nHence, Option {{CORR}} is correct.",
    "Identifies Shaikh Nizamuddin Auliya's hospice at Ghiyaspur."
)
add_q(make_question(CHAPTER, "Chishti Silsila", "Which celebrated Chishti master established his open hospice (khanqah) on the banks of the Yamuna at Ghiyaspur, outside medieval Delhi?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ajodhan (in modern-day Pakistan)",
    ["Ajmer (Rajasthan)", "Delhi", "Nagaur (Rajasthan)"],
    "C",
    "1. Shaikh Fariduddin Ganj-i Shakar (Baba Farid) established his khanqah at Ajodhan (Pakpattan) in Punjab.\nHence, Option {{CORR}} is correct.",
    "Identifies Baba Farid's centre at Ajodhan."
)
add_q(make_question(CHAPTER, "Chishti Silsila", "Where did the revered Chishti saint Shaikh Fariduddin Ganj-i Shakar (Baba Farid) establish his influential spiritual centre?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Shaikh Nasiruddin Mahmud",
    ["Shaikh Nizamuddin Auliya", "Amir Khusrau", "Shaikh Bahauddin Zakariya"],
    "D",
    "1. Shaikh Nasiruddin Mahmud was given the title 'Chiragh-i Dehli' (Lamp of Delhi) as successor to Nizamuddin Auliya.\nHence, Option {{CORR}} is correct.",
    "Identifies Chiragh-i Dehli as Shaikh Nasiruddin Mahmud."
)
add_q(make_question(CHAPTER, "Chishti Silsila", "Which Chishti saint of Delhi was popularly honored with the reverent title 'Chiragh-i Dehli' (The Lamp of Delhi)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sultan Muhammad bin Tughlaq",
    ["Sultan Iltutmish", "Sultan Alauddin Khalji", "Emperor Akbar"],
    "A",
    "1. Muhammad bin Tughlaq was the first Delhi Sultan to visit the dargah of Khwaja Muinuddin Chishti at Ajmer.\nHence, Option {{CORR}} is correct.",
    "Identifies Muhammad bin Tughlaq as first Sultan to visit Ajmer."
)
add_q(make_question(CHAPTER, "Pilgrimage to Ajmer", "Who was the first Sultan of Delhi recorded to have made a personal pilgrimage to the dargah of Khwaja Muinuddin Chishti at Ajmer?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Fourteen times",
    ["Five times", "Twenty-one times", "Seven times"],
    "B",
    "1. Mughal Emperor Akbar visited the dargah of Khwaja Muinuddin Chishti at Ajmer fourteen times between 1562 and 1579, both for prayers for conquests and for the birth of a son.\nHence, Option {{CORR}} is correct.",
    "Identifies Akbar's 14 visits to Ajmer."
)
add_q(make_question(CHAPTER, "Pilgrimage to Ajmer", "How many times did the Mughal Emperor Akbar undertake pilgrimages to the dargah of Khwaja Muinuddin Chishti at Ajmer during his reign?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A massive copper cauldron (degh) to facilitate cooking for pilgrims",
    ["A silver throne for the chief sajjadanashin", "A collection of illuminated Persian manuscripts", "A gold canopy for the central mihrab"],
    "C",
    "1. In 1568, Emperor Akbar donated a massive brass/copper cauldron (degh) to the dargah to provide cooked meals for thousands of visiting pilgrims.\nHence, Option {{CORR}} is correct.",
    "Identifies Akbar's donation of a cauldron (degh)."
)
add_q(make_question(CHAPTER, "Dargah Rituals", "What grand functional gift did Emperor Akbar present to the Ajmer dargah in 1568 to assist in feeding the gathered pilgrims?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Jahanara",
    ["Gulbadan Begum", "Nur Jahan", "Roshanara"],
    "D",
    "1. Princess Jahanara, daughter of Shah Jahan, wrote a biography of Shaikh Muinuddin Chishti titled 'Munis al-Arwah' and narrated her pilgrimage to Ajmer.\nHence, Option {{CORR}} is correct.",
    "Identifies Jahanara writing Munis al-Arwah."
)
add_q(make_question(CHAPTER, "Sufi Literature by Women", "Which Mughal royal princess authored the celebrated Sufi biography 'Munis al-Arwah' dedicated to Khwaja Muinuddin Chishti?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sama",
    ["Ziyarat", "Futuh", "Tariqa"],
    "A",
    "1. Sama refers to the mystical audition or listening to spiritual music and singing, practiced notably by Chishtis to evoke ecstasy and proximity to the divine.\nHence, Option {{CORR}} is correct.",
    "Defines Sama as musical audition."
)
add_q(make_question(CHAPTER, "Sufi Practices", "What is the Sufi practice of mystical musical audition or congregational recitation of devotional verses called?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Amir Khusrau",
    ["Ziauddin Barani", "Mirza Ghalib", "Faizi"],
    "B",
    "1. Amir Khusrau, the chief disciple of Nizamuddin Auliya, enriched Sufi music by introducing the 'qawl' (hymn), originating the tradition of Qawwali.\nHence, Option {{CORR}} is correct.",
    "Identifies Amir Khusrau developing Qawwali."
)
add_q(make_question(CHAPTER, "Sufi Music", "Which poet and musician, a devoted disciple of Shaikh Nizamuddin Auliya, shaped Qawwali by composing verses in Hindavi and Persian?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Unsolicited cash gifts and charity offered voluntarily by visitors",
    ["Compulsory religious tax levied on peasants", "Royal land grants reserved for imperial officials", "Trade revenue from silk bazaars"],
    "C",
    "1. Chishti hospices ran on 'futuh' (unasked-for charity or voluntary offerings), which was immediately spent on food, clothing, and upkeep.\nHence, Option {{CORR}} is correct.",
    "Defines futuh as unasked-for offerings."
)
add_q(make_question(CHAPTER, "Khanqah Economy", "What did the term 'futuh' signify in the daily economic functioning of a Chishti khanqah?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ziyarat",
    ["Hajj", "Sama", "Khirqa"],
    "D",
    "1. Ziyarat refers to the pilgrimage to the tombs of Sufi saints (dargahs) to seek spiritual grace (barakat) and intercession.\nHence, Option {{CORR}} is correct.",
    "Defines Ziyarat as dargah pilgrimage."
)
add_q(make_question(CHAPTER, "Sufi Terminology", "What technical Arabic term describes the act of devotional pilgrimage to the tombs of Sufi masters across the Islamic world?", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Chishti Relations with the State",
    "The Chishti Sufis generally maintained an attitude of aloofness and avoided accepting formal court appointments or state offices.",
    "Chishti saints completely refused to accept any unsolicited donations of grain, cash, or land from monarchs and nobles.",
    3,
    "A",
    "1. Statement I is correct: Chishtis cultivated detachment from worldly power and avoided political posts.\n2. Statement II is incorrect: They did accept unsolicited donations (futuh) and moral grants, spending them immediately on the langar.",
    "Examines Chishti political detachment and charity."
))

add_q(make_assertion_question(
    CHAPTER, "Language of Sufi Poetry",
    "In the Deccan, Sufis composed short vernacular devotional poems known as lurinama and charkhanama in Dakhani Urdu.",
    "These poems were structured to be sung by rural women while performing household chores like spinning thread or rocking children.",
    1,
    "A",
    "1. Assertion (A) is true: Deccan Sufis wrote songs using local idioms like charkhanama (spinning song) and lurinama (lullaby).\n2. Reason (R) is true: These simple rhyming couplets helped integrate Sufi ideas into the daily domestic routines of ordinary village women.\n3. Reason (R) correctly explains Assertion (A).",
    "Explains domestic adaptation of Sufi poetry in the Deccan."
))

# --- 6. Kabir and the Nirguna Tradition ---

opts, corr, sol = rotate_options(
    "Kabir Bijak",
    ["Kabir Granthavali", "Adi Granth", "Sursagar"],
    "A",
    "1. The Kabir Bijak is preserved by the Kabirpanth in Varanasi and throughout parts of Uttar Pradesh.\nHence, Option {{CORR}} is correct.",
    "Identifies Kabir Bijak preserved in Varanasi."
)
add_q(make_question(CHAPTER, "Kabir's Compositions", "Which canonical compilation of Kabir's poetry is preserved specifically by the Kabirpanthis in Varanasi and eastern Uttar Pradesh?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The Dadupanth in Rajasthan",
    ["The Varkari tradition in Maharashtra", "The Pushtimarg in Gujarat", "The Mahanubhava sect in Paithan"],
    "B",
    "1. The Kabir Granthavali is closely associated with and preserved by the Dadupanth community in Rajasthan.\nHence, Option {{CORR}} is correct.",
    "Identifies Dadupanth preserving Kabir Granthavali."
)
add_q(make_question(CHAPTER, "Kabir's Compositions", "Which regional religious community in Rajasthan preserved Kabir's verses within their sacred compilation known as the Kabir Granthavali?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ulatbansi",
    ["Barahmasa", "Rakhadi", "Sawaiya"],
    "C",
    "1. Ulatbansi (upside-down sayings) are verses composed in an enigmatic style where everyday meanings are inverted to convey esoteric mystical truths.\nHence, Option {{CORR}} is correct.",
    "Identifies Ulatbansi as upside-down sayings."
)
add_q(make_question(CHAPTER, "Kabir's Poetic Style", "What unique literary and mystical form of expression did Kabir employ, characterized by 'upside-down' paradoxical sayings such as 'the ocean caught fire'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Nirguna Bhakti (devotion to a formless, abstract Divine)",
    ["Saguna Bhakti (worship of anthropomorphic deities)", "Shaiva Siddhanta", "Brahmanical Smartism"],
    "D",
    "1. Kabir was an exponent of Nirguna Bhakti, rejecting image worship and conceptualizing God beyond all human and physical attributes.\nHence, Option {{CORR}} is correct.",
    "Identifies Kabir's adherence to Nirguna Bhakti."
)
add_q(make_question(CHAPTER, "Kabir's Philosophy", "What philosophical and devotional orientation defined Kabir's rejection of idol worship and outward ritualism?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Used Islamic terms like Allah, Khuda, Hazrat, and Pir alongside Vedantic terms like Brahman, Atman, and Shabda",
    ["Strictly prohibited any non-Sanskrit vocabulary in his pad", "Composed poetry exclusively in Classical Persian", "Adopted only the devotional terminology of Shaivism"],
    "A",
    "1. Kabir drew freely on diverse traditions, invoking Allah, Khuda, Pir, as well as Rama, Rahim, Brahman, and Sunya.\nHence, Option {{CORR}} is correct.",
    "Demonstrates syncretic religious vocabulary of Kabir."
)
add_q(make_question(CHAPTER, "Kabir's Religious Synthesis", "How did Kabir reflect his inclusive, syncretic vision of Ultimate Reality through his devotional vocabulary?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ramananda",
    ["Vallabhacharya", "Chaitanya Mahaprabhu", "Gorakhnath"],
    "B",
    "1. Later hagiographies traditionally describe the Vaishnava teacher Ramananda as Kabir's spiritual preceptor (guru).\nHence, Option {{CORR}} is correct.",
    "Identifies Ramananda as Kabir's traditional guru."
)
add_q(make_question(CHAPTER, "Kabir's Hagiography", "According to popular traditional hagiographies, which prominent Vaishnava teacher of Varanasi initiated Kabir into spiritual life?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Weavers (Julahas)",
    ["Potters (Kumhars)", "Leather-workers (Chamars)", "Carpenters (Barhais)"],
    "C",
    "1. Kabir belonged to a family of Julahas (Muslim weavers) who had relatively recently converted to Islam in the city of Varanasi.\nHence, Option {{CORR}} is correct.",
    "Identifies Kabir belonging to Julaha community."
)
add_q(make_question(CHAPTER, "Social Background of Kabir", "To which urban artisan community did Kabir belong, whose occupational metaphors frequently appeared throughout his poetic verses?", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Kabir's Legacy",
    "Kabir's compositions were incorporated directly into the Guru Granth Sahib by the fifth Sikh Guru, Guru Arjan Dev.",
    "Kabir's teachings encouraged followers to build magnificent stone temples and conduct elaborate sacrificial rituals.",
    3,
    "A",
    "1. Statement I is correct: Kabir's verses were incorporated extensively into the Adi Granth compiled in 1604.\n2. Statement II is incorrect: Kabir vehemently rejected temple construction, idol worship, and ritual sacrifices.",
    "Assesses Kabir's presence in Sikh scripture and anti-ritualism."
))

add_q(make_assertion_question(
    CHAPTER, "Kabir's Critique of Religion",
    "Kabir scathingly attacked both the Brahmanical priesthood and the Muslim clergy for their ritualistic pretensions and social exclusions.",
    "Kabir believed that truth was single and omnipresent, accessible directly to all seekers through inward spiritual realization rather than external dogmas.",
    1,
    "A",
    "1. Assertion (A) is true: Kabir ridiculed the empty dogmas of both Pandits and Qazis.\n2. Reason (R) is true: His Nirguna monotheism insisted on direct personal realization of God beyond institutional mediation.\n3. Reason (R) correctly explains Assertion (A).",
    "Explains Kabir's uncompromising critique of institutionalized orthodoxy."
))

# --- 7. Guru Nanak and the Sikh Tradition ---

opts, corr, sol = rotate_options(
    "Nankana Sahib (near the river Ravi)",
    ["Amritsar", "Kartarpur", "Anandpur Sahib"],
    "A",
    "1. Guru Nanak was born in 1469 in a village called Nankana Sahib (originally Talwandi) near the river Ravi.\nHence, Option {{CORR}} is correct.",
    "Identifies Nankana Sahib as Guru Nanak's birthplace."
)
add_q(make_question(CHAPTER, "Guru Nanak", "In which village near the river Ravi was Guru Nanak, the founder of Sikhism, born in 1469?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Nirguna Bhakti advocating devotion through 'Nam Simran' (remembering the Divine Name)",
    ["Saguna Bhakti worshipping incarnations of Vishnu", "Ascetic mortification through rigorous Hatha yoga", "Vedic fire sacrifices administered by hereditary priests"],
    "B",
    "1. Guru Nanak advocated Nirguna Bhakti, rejecting sacrifices, image worship, and idol temples, emphasizing the remembrance of the Divine Word (shabad) through Nam-jap.\nHence, Option {{CORR}} is correct.",
    "Defines Guru Nanak's core spiritual teaching."
)
add_q(make_question(CHAPTER, "Teachings of Guru Nanak", "What foundational religious path did Guru Nanak preach to attain salvation?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Dharamsal",
    ["Khanqah", "Satra", "Matha"],
    "C",
    "1. Guru Nanak organized his followers into a community where they gathered for congregational singing (sangat); this space was called 'dharamsal' (later known as Gurdwara).\nHence, Option {{CORR}} is correct.",
    "Identifies dharamsal as early Sikh prayer hall."
)
add_q(make_question(CHAPTER, "Early Sikh Institutions", "What was the original term used for the sacred community space established by Guru Nanak for congregational prayer and collective singing?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Guru Angad (Lehna)",
    ["Guru Amar Das", "Guru Ram Das", "Guru Arjan Dev"],
    "D",
    "1. Guru Nanak appointed his disciple Bhai Lehna as his successor, giving him the name Guru Angad ('limb of my own body').\nHence, Option {{CORR}} is correct.",
    "Identifies Guru Angad as Guru Nanak's successor."
)
add_q(make_question(CHAPTER, "Sikh Gurus", "Whom did Guru Nanak nominate as his spiritual successor, bestowing upon him the name signifying 'part of my own body'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Guru Arjan Dev in 1604",
    ["Guru Nanak in 1539", "Guru Amar Das in 1574", "Guru Gobind Singh in 1708"],
    "A",
    "1. The fifth Guru, Guru Arjan Dev, compiled the Adi Granth in 1604, containing hymns of the first five Gurus and other Bhakti/Sufi saints.\nHence, Option {{CORR}} is correct.",
    "Identifies Guru Arjan compiling Adi Granth in 1604."
)
add_q(make_question(CHAPTER, "Compilation of Adi Granth", "Which Sikh Guru compiled the foundational holy scripture, the Adi Granth, at Amritsar in 1604?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kabir, Baba Farid, Ravidas, and Namdev",
    ["Tulsidas, Surdas, and Mirabai", "Shankaracharya, Ramanuja, and Madhvacharya", "Basavanna, Allama Prabhu, and Akka Mahadevi"],
    "B",
    "1. The Adi Granth includes hymns of non-Sikh saints such as Baba Farid, Kabir, Bhagat Namdev, and Sant Ravidas.\nHence, Option {{CORR}} is correct.",
    "Identifies non-Sikh saints in Adi Granth."
)
add_q(make_question(CHAPTER, "Adi Granth Composers", "Along with the compositions of the Sikh Gurus, whose devotional hymns were prominently incorporated into the Adi Granth?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Gurmukhi",
    ["Devanagari", "Shahmukhi", "Takri"],
    "C",
    "1. Guru Angad standardized and popularized the Gurmukhi script for recording the teachings and hymns of the Gurus.\nHence, Option {{CORR}} is correct.",
    "Identifies Gurmukhi script developed by Guru Angad."
)
add_q(make_question(CHAPTER, "Gurmukhi Script", "Which script was standardized and promoted by Guru Angad to transcribe the sacred compositions of Guru Nanak and the early Gurus?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Guru Gobind Singh in 1699",
    ["Guru Arjan Dev in 1604", "Guru Hargobind in 1606", "Guru Tegh Bahadur in 1675"],
    "D",
    "1. The tenth Guru, Guru Gobind Singh, established the Khalsa Panth ('army of the pure') at Anandpur Sahib on Baisakhi in 1699.\nHence, Option {{CORR}} is correct.",
    "Identifies Guru Gobind Singh creating Khalsa Panth in 1699."
)
add_q(make_question(CHAPTER, "The Khalsa Panth", "Which Sikh Guru formally established the Khalsa Panth (the community of the pure) on the festival of Baisakhi in 1699?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kesh (uncut hair), Kangha (comb), Kara (steel bangle), Kachhera (shorts), and Kirpan (dagger)",
    ["Tilak, Mala, Trishul, Janeu, and Dhoti", "Topi, Chadar, Tasbih, Miswak, and Lungi", "Ring, Robe, Staff, Bell, and Bowl"],
    "A",
    "1. The Five Ks defining the Khalsa identity are: Kesh, Kangha, Kara, Kachhera, and Kirpan.\nHence, Option {{CORR}} is correct.",
    "Identifies the Five Ks of the Khalsa."
)
add_q(make_question(CHAPTER, "Khalsa Identity", "What are the five distinct physical symbols (the Five Ks) mandated by Guru Gobind Singh for every initiated member of the Khalsa?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The Guru Granth Sahib (the eternal living Guru)",
    ["A hereditary council of elders (Masands)", "The royal dynasty of Patiala", "The Akal Takht high priest alone"],
    "B",
    "1. Guru Gobind Singh ended the line of human Gurus, declaring that spiritual authority resided forever in the sacred scripture, the Guru Granth Sahib.\nHence, Option {{CORR}} is correct.",
    "Identifies Guru Granth Sahib as eternal living Guru."
)
add_q(make_question(CHAPTER, "Sikh Guruship", "Following the demise of Guru Gobind Singh in 1708, in what or whom was ultimate spiritual authority permanently invested?", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Guru Nanak's Social Philosophy",
    "Guru Nanak envisioned a community based on equality where people from all backgrounds cooked and ate together in the community kitchen (langar).",
    "Guru Nanak advocated that serious spiritual seekers must renounce family life, abandon householdership, and become wandering forest ascetics.",
    3,
    "A",
    "1. Statement I is correct: Guru Nanak established institutions of sangat (congregation) and pangat (communal dining/langar) to foster equality.\n2. Statement II is incorrect: He strongly rejected renunciation and asceticism, emphasizing righteous conduct within everyday householder life.",
    "Analyzes Guru Nanak's householder ethics and community dining."
))

add_q(make_assertion_question(
    CHAPTER, "Militarization of the Sikh Community",
    "The 17th century witnessed a gradual militarization of the Sikh community under Guru Hargobind and Guru Gobind Singh.",
    "The Mughal state under Jahangir and Aurangzeb viewed the growing autonomy and popularity of the Sikh community as a potential political threat.",
    1,
    "A",
    "1. Assertion (A) is true: The Sikh community transformed into a disciplined martial brotherhood (Miri-Piri, Khalsa).\n2. Reason (R) is true: Imperial Mughal suspicion and executions of Guru Arjan (1606) and Guru Tegh Bahadur (1675) triggered armed resistance.\n3. Reason (R) correctly explains Assertion (A).",
    "Explains political context behind the creation of the Khalsa."
))

# --- 8. Mirabai and Saguna Bhakti ---

opts, corr, sol = rotate_options(
    "Merta in Marwar",
    ["Amber in Jaipur", "Bundi in Hadoti", "Chittor in Mewar"],
    "A",
    "1. Mirabai was a Rajput princess from Merta who was married against her will to a prince of the Sisodia clan of Mewar.\nHence, Option {{CORR}} is correct.",
    "Identifies Mirabai's birthplace at Merta."
)
add_q(make_question(CHAPTER, "Mirabai", "From which Rajput kingdom did the celebrated poet-saint Mirabai hail before her marriage into the Sisodia royal family of Mewar?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Lord Krishna",
    ["Lord Rama", "Lord Shiva", "Lord Vishnu in his Matsya avatar"],
    "B",
    "1. Mirabai recognized Krishna (Girdhar Gopal) as her supreme lover and sole husband, defying societal and marital expectations.\nHence, Option {{CORR}} is correct.",
    "Identifies Lord Krishna as Mirabai's beloved deity."
)
add_q(make_question(CHAPTER, "Mirabai's Devotion", "Which deity did Mirabai recognize as her supreme husband and divine lover throughout her poetic life?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Raidas (a leather-worker)",
    ["Ramananda (a temple priest)", "Vallabhacharya (a philosopher)", "Surdas (a court musician)"],
    "C",
    "1. According to popular tradition, Mirabai accepted Raidas, a leather-worker (chamar) considered untouchable, as her preceptor (guru), demonstrating her rejection of caste hierarchy.\nHence, Option {{CORR}} is correct.",
    "Identifies Raidas as Mirabai's preceptor."
)
add_q(make_question(CHAPTER, "Mirabai's Social Defiance", "Whom did Mirabai choose as her spiritual teacher (guru), an act that drastically defied contemporary caste taboos of royal Rajput society?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "She did not establish a formal sect or leave behind a structured monastic order",
    ["She established the Pushtimarg sect in Mewar", "She governed a large royal monastery in Mathura", "She was declared head of the Ramanandi Sampradaya"],
    "D",
    "1. Mirabai did not attract a formal institutional sect of disciples; rather, her songs survived in the oral traditions of ordinary people, especially poor and low-caste women.\nHence, Option {{CORR}} is correct.",
    "Explains non-institutional legacy of Mirabai."
)
add_q(make_question(CHAPTER, "Mirabai's Legacy", "Which characteristic accurately describes the religious legacy and transmission of Mirabai's devotional poetry?", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Mirabai's Defiance",
    "Mirabai defied her royal in-laws by refusing to submit to the traditional role of a submissive Rajput wife and widow.",
    "Mirabai composed all her devotional songs in classical Vedic Sanskrit to gain the endorsement of Mewar court priests.",
    3,
    "A",
    "1. Statement I is correct: Mirabai resisted palace restrictions, survived poisoning attempts, and renounced royal opulence.\n2. Statement II is incorrect: She composed her songs in vernacular Rajasthani and Braj bhasha, not Vedic Sanskrit.",
    "Assesses Mirabai's linguistic idiom and social resistance."
))

# --- 9. Regional Traditions: Shankaradeva in Assam & Maharashtra Bhakti ---

opts, corr, sol = rotate_options(
    "Shankaradeva",
    ["Chaitanya Mahaprabhu", "Vallabhacharya", "Madhvacharya"],
    "A",
    "1. Sankaradeva was the leading late 15th-century Vaishnava teacher in Assam who founded the Ekasarana Dharma based on devotion to Vishnu/Krishna.\nHence, Option {{CORR}} is correct.",
    "Identifies Shankaradeva leading Vaishnavism in Assam."
)
add_q(make_question(CHAPTER, "Bhakti in Assam", "Which prominent 15th-century saint-scholar spearheaded the Vaishnava Bhakti movement in Assam, preaching the doctrine of 'Ekasarana Dharma'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Satras (monasteries) and Namghars (prayer halls)",
    ["Khanqahs and Dargahs", "Gopurams and Vimanas", "Viharas and Chaityas"],
    "B",
    "1. Sankaradeva established satras (monasteries) for spiritual practice and namghars (prayer halls) where community discussions, recitations, and plays were held.\nHence, Option {{CORR}} is correct.",
    "Identifies Satras and Namghars founded by Shankaradeva."
)
add_q(make_question(CHAPTER, "Institutions of Shankaradeva", "Which two socio-religious institutions did Shankaradeva establish across Assam that continue to serve as vibrant community hubs?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kirtana-ghosha",
    ["Gitagovinda", "Ramcharitmanas", "Chaitanya Charitamrita"],
    "C",
    "1. Sankaradeva's major literary composition was the Kirtana-ghosha, a poetic text composed in Assamese for congregational singing.\nHence, Option {{CORR}} is correct.",
    "Identifies Kirtana-ghosha as Shankaradeva's major text."
)
add_q(make_question(CHAPTER, "Assamese Bhakti Literature", "What was the title of Shankaradeva's principal devotional poetic work composed in Assamese for congregational singing and spiritual recitation?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Lord Vitthala (a manifestation of Vishnu) at Pandharpur",
    ["Lord Shiva at Trimbakeshwar", "Lord Ganesha at Morgaon", "Goddess Bhavani at Tuljapur"],
    "D",
    "1. The Varkari movement of Maharashtra was centered on devotion to Lord Vitthala (Vithoba) enshrined at Pandharpur on the banks of the Bhima river.\nHence, Option {{CORR}} is correct.",
    "Identifies Vitthala at Pandharpur as center of Varkari movement."
)
add_q(make_question(CHAPTER, "Maharashtra Bhakti", "Around which deity and pilgrimage town was the popular Varkari Bhakti tradition of Maharashtra centered?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Jnaneshwar, Namdev, Eknath, and Tukaram",
    ["Ramanuja, Madhva, and Nimbarka", "Surdas, Tulsidas, and Raskhan", "Guru Nanak, Guru Angad, and Guru Arjan"],
    "A",
    "1. The great poet-saints of the Varkari tradition in Maharashtra include Jnaneshwar (Dnyaneshwar), Namdev, Eknath, and Tukaram.\nHence, Option {{CORR}} is correct.",
    "Identifies the four major Varkari saint-poets."
)
add_q(make_question(CHAPTER, "Maharashtra Bhakti", "Which group of poet-saints was instrumental in creating the rich vernacular Bhakti literature (Abhangas) in Marathi?", opts, corr, sol))

# --- 10. Saguna vs Nirguna & Key Concepts ---

opts, corr, sol = rotate_options(
    "Saguna focused on worship of specific deities with anthropomorphic forms, while Nirguna focused on an abstract, formless Divine",
    ["Saguna was practiced only by kings, while Nirguna was for peasants", "Saguna was written in Persian, while Nirguna was written in Sanskrit", "Saguna rejected temples, while Nirguna built elaborate stone temples"],
    "B",
    "1. Historians categorize Bhakti traditions into Saguna (with attributes/forms, e.g. Rama, Krishna) and Nirguna (without attributes, formless, e.g. Kabir, Nanak).\nHence, Option {{CORR}} is correct.",
    "Distinguishes Saguna and Nirguna bhakti."
)
add_q(make_question(CHAPTER, "Bhakti Typology", "How do historians of religion distinguish between 'Saguna' and 'Nirguna' modes of Bhakti?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Devotee who renounced worldly ties to enter discipleship under a Sufi Shaikh",
    ["A tax collector appointed by the Sultan", "A musician who sang qawwalis in the bazaar", "A court chronicler writing royal genealogies"],
    "C",
    "1. In Sufism, the 'murid' is the disciple who submits to the guidance of the spiritual guide ('murshid' or 'pir').\nHence, Option {{CORR}} is correct.",
    "Defines Murid in Sufi terminology."
)
add_q(make_question(CHAPTER, "Sufi Terminology", "What was the status and role of a 'murid' in the medieval institutional structure of Sufism?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Shaikh Nizamuddin Auliya",
    ["Shaikh Salim Chishti", "Shaikh Bahauddin Zakariya", "Shaikh Ahmad Sirhindi"],
    "D",
    "1. Shaikh Nizamuddin Auliya was reverently addressed by disciples as 'Sultan-ul-Mashaikh' (literally Sultan of Shaikhs).\nHence, Option {{CORR}} is correct.",
    "Identifies Nizamuddin Auliya as Sultan-ul-Mashaikh."
)
add_q(make_question(CHAPTER, "Chishti Titles", "Which great Chishti master was venerated by his followers and contemporaries with the regal title 'Sultan-ul-Mashaikh' (Sultan among Spiritual Guides)?", opts, corr, sol))

# --- 11. Match Questions (Multiple) ---

add_q(make_match_question(
    CHAPTER, "Bhakti Saints and Regions",
    "Match the Bhakti saint in List I with their primary region of activity in List II:",
    [
        ("A", "Basavanna"),
        ("B", "Shankaradeva"),
        ("C", "Tukaram"),
        ("D", "Andal")
    ],
    [
        ("i", "Assam"),
        ("ii", "Karnataka"),
        ("iii", "Tamil Nadu"),
        ("iv", "Maharashtra")
    ],
    "A-ii, B-i, C-iv, D-iii",
    "A",
    "1. Basavanna = Karnataka (A-ii), Shankaradeva = Assam (B-i), Tukaram = Maharashtra (C-iv), Andal = Tamil Nadu (D-iii).",
    "Matches Bhakti saints with their geographic regions."
))

add_q(make_match_question(
    CHAPTER, "Chishti Shaikhs and Resting Places",
    "Match the Chishti Sufi master in List I with the location of their dargah in List II:",
    [
        ("A", "Khwaja Muinuddin Chishti"),
        ("B", "Shaikh Nizamuddin Auliya"),
        ("C", "Baba Fariduddin Ganj-i Shakar"),
        ("D", "Shaikh Qutbuddin Bakhtiyar Kaki")
    ],
    [
        ("i", "Ajmer"),
        ("ii", "Delhi (Mehrauli)"),
        ("iii", "Delhi (Ghiyaspur)"),
        ("iv", "Ajodhan (Pakpattan)")
    ],
    "A-i, B-iii, C-iv, D-ii",
    "C",
    "1. Muinuddin Chishti = Ajmer (A-i), Nizamuddin Auliya = Delhi/Ghiyaspur (B-iii), Baba Farid = Ajodhan (C-iv), Bakhtiyar Kaki = Mehrauli/Delhi (D-ii).",
    "Matches Chishti masters with their dargahs."
))

add_q(make_match_question(
    CHAPTER, "Sufi Key Terminology",
    "Match the Sufi concept in List I with its definition in List II:",
    [
        ("A", "Khanqah"),
        ("B", "Ziyarat"),
        ("C", "Silsila"),
        ("D", "Barakat")
    ],
    [
        ("i", "Spiritual genealogy tracing back to Prophet Muhammad"),
        ("ii", "Hospice where Sufi masters lived and taught"),
        ("iii", "Spiritual grace believed to emanate from a saint's tomb"),
        ("iv", "Pilgrimage to the shrine of a Sufi saint")
    ],
    "A-ii, B-iv, C-i, D-iii",
    "B",
    "1. Khanqah = Hospice (A-ii), Ziyarat = Pilgrimage to tomb (B-iv), Silsila = Spiritual genealogy (C-i), Barakat = Spiritual grace (D-iii).",
    "Matches Sufi institutional terminology with definitions."
))

add_q(make_match_question(
    CHAPTER, "Sikh Gurus and Historical Milestones",
    "Match the Sikh Guru in List I with their historic contribution in List II:",
    [
        ("A", "Guru Nanak"),
        ("B", "Guru Angad"),
        ("C", "Guru Arjan Dev"),
        ("D", "Guru Gobind Singh")
    ],
    [
        ("i", "Standardized and propagated the Gurmukhi script"),
        ("ii", "Founded the faith and established the community at Kartarpur"),
        ("iii", "Instituted the Khalsa Panth and the Five Ks"),
        ("iv", "Compiled the Adi Granth in 1604")
    ],
    "A-ii, B-i, C-iv, D-iii",
    "D",
    "1. Guru Nanak = Founded faith (A-ii), Guru Angad = Gurmukhi script (B-i), Guru Arjan = Compiled Adi Granth (C-iv), Guru Gobind Singh = Khalsa Panth (D-iii).",
    "Matches Sikh Gurus with foundational milestones."
))

add_q(make_match_question(
    CHAPTER, "Sacred Texts and Traditions",
    "Match the devotional text in List I with the religious tradition in List II:",
    [
        ("A", "Nalayira Divyaprabandham"),
        ("B", "Tevaram"),
        ("C", "Vachanas"),
        ("D", "Kirtana-ghosha")
    ],
    [
        ("i", "Nayanar (Shaiva Bhakti in Tamil Nadu)"),
        ("ii", "Alvar (Vaishnava Bhakti in Tamil Nadu)"),
        ("iii", "Assamese Vaishnavism of Shankaradeva"),
        ("iv", "Virashaiva / Lingayat tradition in Karnataka")
    ],
    "A-ii, B-i, C-iv, D-iii",
    "A",
    "1. Nalayira Divyaprabandham = Alvar (A-ii), Tevaram = Nayanar (B-i), Vachanas = Virashaiva (C-iv), Kirtana-ghosha = Shankaradeva (D-iii).",
    "Matches regional devotional texts with their traditions."
))

# --- 12. Chronological Sequence Questions ---

add_q(make_sequence_question(
    CHAPTER, "Chronology of Chishti Shaikhs",
    "Arrange the following revered Chishti masters in their correct chronological order of succession:",
    [
        ("A", "Shaikh Nasiruddin Chiragh-i Dehli"),
        ("B", "Khwaja Muinuddin Chishti"),
        ("C", "Shaikh Nizamuddin Auliya"),
        ("D", "Shaikh Fariduddin Ganj-i Shakar")
    ],
    "B, D, C, A",
    "C",
    "1. Chronological order: Khwaja Muinuddin Chishti (d. 1236) -> Baba Farid (d. 1265) -> Nizamuddin Auliya (d. 1325) -> Nasiruddin Chiragh-i Dehli (d. 1356).",
    "Orders Chishti masters chronologically."
))

add_q(make_sequence_question(
    CHAPTER, "Milestones in Sikh History",
    "Arrange the following landmark events in Sikh history in chronological order:\nI. Compilation of the Adi Granth by Guru Arjan Dev\nII. Demise of Guru Nanak and appointment of Guru Angad\nIII. Creation of the Khalsa Panth by Guru Gobind Singh\nIV. Bestowal of eternal Guruship upon the Guru Granth Sahib",
    [
        ("A", "II"),
        ("B", "I"),
        ("C", "III"),
        ("D", "IV")
    ],
    "A, B, C, D",
    "A",
    "1. Chronology: Demise of Guru Nanak (1539) -> Compilation of Adi Granth (1604) -> Creation of Khalsa (1699) -> Eternal Guruship of Granth Sahib (1708).",
    "Orders landmark events in Sikh history."
))

add_q(make_sequence_question(
    CHAPTER, "Regional Bhakti Timeline",
    "Arrange the emergence or floruit of the following Bhakti developments in chronological order:\nI. Composition of Nalayira Divyaprabandham by Tamil Alvars\nII. Emergence of the Virashaiva movement led by Basavanna in Karnataka\nIII. Religious reform and establishment of Satras by Shankaradeva in Assam\nIV. Formation of the Khalsa Panth by Guru Gobind Singh in Punjab",
    [
        ("A", "I"),
        ("B", "II"),
        ("C", "III"),
        ("D", "IV")
    ],
    "A, B, C, D",
    "A",
    "1. Chronological order: Alvars (c. 6th-9th century) -> Virashaivas (12th century) -> Shankaradeva (late 15th-16th century) -> Khalsa Panth (1699, late 17th century).",
    "Chronologically orders regional Bhakti traditions."
))

# --- 13. Additional MCQs, Statements & Assertions for Breadth ---

opts, corr, sol = rotate_options(
    "Padmavat",
    ["Mrigavati", "Madhukant", "Chandayan"],
    "B",
    "1. Malik Muhammad Jayasi composed the famous Sufi allegorical premakhyan 'Padmavat', using the romance of Padmini and Ratansen to express mystical longing for the Divine.\nHence, Option {{CORR}} is correct.",
    "Identifies Malik Muhammad Jayasi's Padmavat."
)
add_q(make_question(CHAPTER, "Sufi Allegorical Poetry", "Which celebrated Awadhi Sufi romantic allegory (premakhyan) was composed by Malik Muhammad Jayasi, using human romance as a metaphor for the soul's quest for God?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Miyan Mir",
    ["Shaikh Salim Chishti", "Shah Waliullah", "Shaikh Ahmad Sirhindi"],
    "C",
    "1. Shaikh Miyan Mir was a Qadiri Sufi saint of Lahore who was deeply venerated by Prince Dara Shukoh and Princess Jahanara.\nHence, Option {{CORR}} is correct.",
    "Identifies Miyan Mir as Dara Shukoh's spiritual guide."
)
add_q(make_question(CHAPTER, "Qadiri Order", "Which renowned 17th-century Qadiri Sufi master of Lahore was revered as a spiritual mentor by Mughal Prince Dara Shukoh?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sufi saints were regarded as intermediaries who could channel God's mercy and intercede for common people",
    ["Sufis possessed large private mercenary armies", "Sufis were appointed as hereditary tax collectors by Sultans", "Sufis controlled the maritime merchant guilds"],
    "D",
    "1. People turned to Sufi dargahs because saints were believed to possess spiritual proximity to Allah and the power to intercede (wasila) on behalf of devotees.\nHence, Option {{CORR}} is correct.",
    "Explains widespread popular reverence for Sufi dargahs."
)
add_q(make_question(CHAPTER, "Popular Appeal of Sufism", "What fundamental spiritual belief motivated millions of ordinary people across religious lines to seek the intercession of Sufi saints at their tombs?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Shaikh Salim Chishti at Sikri",
    ["Khwaja Muinuddin Chishti at Ajmer", "Shaikh Nizamuddin Auliya at Delhi", "Shaikh Fariduddin at Pakpattan"],
    "A",
    "1. Akbar built his new ceremonial capital at Fatehpur Sikri near the hospice of Shaikh Salim Chishti, whose blessings he believed had led to the birth of Prince Salim (Jahangir).\nHence, Option {{CORR}} is correct.",
    "Identifies Shaikh Salim Chishti at Fatehpur Sikri."
)
add_q(make_question(CHAPTER, "Imperial Patronage", "Near the dargah of which revered Chishti saint did Emperor Akbar establish his new imperial capital city of Fatehpur Sikri?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Hospice kitchen where free vegetarian food was cooked and served to all visitors regardless of creed",
    ["The personal library containing esoteric commentaries", "The assembly room where musical auditions were held", "The private prayer cell of the senior pir"],
    "B",
    "1. In Chishti khanqahs, the 'langar' was the open communal kitchen sustained on voluntary gifts, serving simple food to all without distinction.\nHence, Option {{CORR}} is correct.",
    "Defines langar in Sufi khanqahs."
)
add_q(make_question(CHAPTER, "Khanqah Life", "What was the nature and significance of the 'langar' operated within medieval Chishti hospices?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Shaikh Ruknuddin Abul Fath",
    ["Shaikh Bahauddin Zakariya", "Shaikh Sadruddin", "Khwaja Mir Dard"],
    "C",
    "1. The Suhrawardi order in Multan maintained close relations with the state; its prominent leaders included Shaikh Bahauddin Zakariya and his grandson Ruknuddin Abul Fath.\nHence, Option {{CORR}} is correct.",
    "Identifies Suhrawardi leader in Multan."
)
add_q(make_question(CHAPTER, "Suhrawardi Silsila", "Which grand Sufi hospice in Multan was associated with the Suhrawardi silsila, an order known for maintaining active political contacts with the Delhi Sultanate?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Naqshbandi",
    ["Chishti", "Suhrawardi", "Qadiri"],
    "D",
    "1. The Naqshbandi silsila, led in the late 16th/early 17th century by Shaikh Ahmad Sirhindi (Mujaddid Alf-i Sani), was known for its orthodox critique of syncretic practices and Akbar's religious policies.\nHence, Option {{CORR}} is correct.",
    "Identifies Naqshbandi order and Ahmad Sirhindi."
)
add_q(make_question(CHAPTER, "Sufi Silsilas", "Which prominent Sufi silsila in Mughal India, represented by Shaikh Ahmad Sirhindi, strongly advocated strict adherence to the Shari'a against liberal imperial policies?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Tansen",
    ["Amir Khusrau", "Baiju Bawra", "Swami Haridas"],
    "A",
    "1. Swami Haridas, a devotee of Radha-Krishna in Vrindavan, was the revered spiritual and musical preceptor of Akbar's court musician Tansen.\nHence, Option {{CORR}} is correct.",
    "Identifies Swami Haridas as mentor of Tansen."
)
add_q(make_question(CHAPTER, "Vaishnava Music", "Which renowned saint-musician of Vrindavan, dedicated to the devotional worship of Radha and Krishna, was the revered musical guru of Tansen?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Namdev",
    ["Jnaneshwar", "Eknath", "Ramdas"],
    "B",
    "1. Bhagat Namdev, a tailor by profession from Maharashtra, travelled widely through north India, and several of his devotional hymns were included in the Adi Granth.\nHence, Option {{CORR}} is correct.",
    "Identifies Namdev included in Adi Granth."
)
add_q(make_question(CHAPTER, "Inter-regional Devotional Links", "Which Marathi Bhakti saint-poet, a tailor by caste, had over sixty of his devotional hymns incorporated into the Sikh holy book, the Adi Granth?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ravidas",
    ["Kabir", "Dadu Dayal", "Sundardas"],
    "C",
    "1. Sant Ravidas was a leather-worker (chamar) of Varanasi who challenged caste pollution and preached devotion to the formless Divine; his verses are part of the Adi Granth.\nHence, Option {{CORR}} is correct.",
    "Identifies Ravidas's social background and philosophy."
)
add_q(make_question(CHAPTER, "Nirguna Bhakti Saints", "Which revered saint of Varanasi, a leather-worker by caste, preached radical egalitarianism and composed hymns preserved in the Guru Granth Sahib?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Abhangas",
    ["Sakhis", "Vachanas", "Padas"],
    "D",
    "1. The Marathi devotional hymns composed by saints of the Varkari movement like Tukaram and Namdev are specifically termed Abhangas.\nHence, Option {{CORR}} is correct.",
    "Identifies Abhangas as Marathi devotional hymns."
)
add_q(make_question(CHAPTER, "Marathi Devotional Poetry", "What technical literary term is given to the lyrical Marathi devotional stanzas composed by saints of the Varkari tradition in honor of Lord Vitthala?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Chaitanya Mahaprabhu",
    ["Vallabhacharya", "Ramananda", "Nimbarka"],
    "A",
    "1. Chaitanya Mahaprabhu popularized Gaudiya Vaishnavism in 16th-century Bengal and Odisha, inspiring collective street chanting (nagar kirtan) of Krishna's name.\nHence, Option {{CORR}} is correct.",
    "Identifies Chaitanya Mahaprabhu popularizing Sankirtan."
)
add_q(make_question(CHAPTER, "Eastern Vaishnavism", "Which 16th-century charismatic spiritual leader popularized ecstatic congregational chanting (Sankirtan) and Gaudiya Vaishnavism across Bengal and Odisha?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Shuddhadvaita (Pure Non-Dualism) and Pushtimarg",
    ["Advaita Vedanta", "Vishishtadvaita", "Dvaitadvaita"],
    "B",
    "1. Vallabhacharya founded the philosophical school of Shuddhadvaita and the devotional path known as Pushtimarg (the path of divine grace) centered on Srinathji at Nathdwara.\nHence, Option {{CORR}} is correct.",
    "Identifies Vallabhacharya's philosophy and school."
)
add_q(make_question(CHAPTER, "Vaishnava Theology", "Which theological school and devotional path of divine grace (Pushtimarg) was propounded by the 15th-century philosopher-saint Vallabhacharya?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Surdas",
    ["Tulsidas", "Keshavdas", "Bihari"],
    "C",
    "1. Surdas, a disciple of Vallabhacharya, authored the Sursagar, celebrating the childhood and youth of Krishna in Brajbhasha.\nHence, Option {{CORR}} is correct.",
    "Identifies Surdas as author of Sursagar."
)
add_q(make_question(CHAPTER, "Braj Literature", "Which blind poet-saint of Braj composed the monumental literary work 'Sursagar', celebrating the pastoral childhood and divine lila of Krishna?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ramcharitmanas",
    ["Gitavali", "Kavitavali", "Vinaya Patrika"],
    "D",
    "1. Tulsidas composed the Ramcharitmanas in Awadhi, making the epic story of Rama accessible to common people across north India.\nHence, Option {{CORR}} is correct.",
    "Identifies Ramcharitmanas composed by Tulsidas."
)
add_q(make_question(CHAPTER, "Awadhi Bhakti Literature", "What was the title of Tulsidas's monumental 16th-century devotional retelling of the Valmiki Ramayana, composed in the popular Awadhi dialect?", opts, corr, sol))

add_q(make_statement_question(
    CHAPTER, "Alvars and Veda Status",
    "The Vaishnava Nalayira Divyaprabandham was granted a status equivalent to the four Vedic Samhitas in south Indian temple liturgy.",
    "The poems of the Divyaprabandham were strictly forbidden from being recited within temple enclosures or during temple processions.",
    3,
    "B",
    "1. Statement I is correct: Compositions of the Alvars were revered as the Tamil Veda and chanted alongside Vedic mantras.\n2. Statement II is incorrect: Alvar hymns were actively sung inside temples and during temple chariot processions.",
    "Evaluates the sacred status of Alvar hymns in temple worship."
))

add_q(make_statement_question(
    CHAPTER, "Shaikh Nizamuddin and Sultans",
    "Shaikh Nizamuddin Auliya was renowned for accepting high royal titles, imperial estates, and gold pensions from Delhi Sultans.",
    "Shaikh Nizamuddin famously declared about Sultan Ghiyasuddin Tughlaq: 'Hunuz Dilli dur ast' (Delhi is still far away).",
    4,
    "C",
    "1. Statement I is incorrect: Nizamuddin Auliya steadfastly rejected royal gifts, court offices, and political alliances.\n2. Statement II is correct: When Sultan Ghiyasuddin Tughlaq ordered the Shaikh to vacate Delhi before his arrival, the Shaikh uttered the famous phrase 'Hunuz Dilli dur ast'.",
    "Assesses Nizamuddin Auliya's independence from the Sultanate."
))

add_q(make_assertion_question(
    CHAPTER, "Vernacular Languages in Bhakti",
    "Bhakti and Sufi saint-poets deliberately composed their devotional verses and hymns in regional vernacular languages rather than classical Sanskrit or Arabic.",
    "Composing in local spoken idioms allowed teachers to communicate directly with ordinary masses, artisans, and women who were excluded from elite scholarly languages.",
    1,
    "A",
    "1. Assertion (A) is true: Bhakti and Sufi poets used Tamil, Kannada, Marathi, Awadhi, Braj, and Dakhani.\n2. Reason (R) is true: Vernacular poetry broke the monopoly of priestly languages and facilitated broad social access.\n3. Reason (R) correctly explains Assertion (A).",
    "Explains the revolutionary shift toward regional vernaculars."
))

opts, corr, sol = rotate_options(
    "Shaikh Muinuddin Chishti",
    ["Shaikh Nizamuddin Auliya", "Baba Farid", "Khwaja Qutbuddin Bakhtiyar Kaki"],
    "A",
    "1. Khwaja Muinuddin Chishti was known by the affectionate title 'Gharib Nawaz' (Comforter of the Poor) due to his generosity to the needy.\nHence, Option {{CORR}} is correct.",
    "Identifies Muinuddin Chishti as Gharib Nawaz."
)
add_q(make_question(CHAPTER, "Chishti Epithets", "Which venerated Sufi master was affectionately remembered across the subcontinent as 'Gharib Nawaz' (Benefactor of the Poor)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A small community of initiated disciples who committed their lives to spiritual training under the Guru",
    ["A royal court of feudal chieftains paying tribute", "A caste guild of trading merchants", "A military garrison guarding river crossings"],
    "B",
    "1. In early Sikh tradition, the 'sangat' was the egalitarian congregation of disciples gathered for prayer, hymn singing, and collective discussion.\nHence, Option {{CORR}} is correct.",
    "Defines the term Sangat in Sikhism."
)
add_q(make_question(CHAPTER, "Sikh Social Terminology", "What did the institutional term 'Sangat' signify in the organizational structure established by Guru Nanak and his early successors?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Dadu Dayal",
    ["Sundardas", "Charandas", "Malukdas"],
    "C",
    "1. Dadu Dayal was a 16th-century Nirguna saint from Gujarat/Rajasthan who preached non-sectarian devotion (Nipakh) and whose followers formed the Dadupanth.\nHence, Option {{CORR}} is correct.",
    "Identifies Dadu Dayal advocating Nipakh."
)
add_q(make_question(CHAPTER, "Northern Nirguna Saints", "Which 16th-century saint of Rajasthan, born in Ahmedabad, preached the ideal of non-sectarian spiritual devotion known as 'Nipakh'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The divine lover or bride yearning for eternal union with God, the divine beloved",
    ["A courageous warrior conquering battlefield enemies", "A feudal monarch ruling over humble peasants", "A scholarly philosopher debating grammatical treatises"],
    "D",
    "1. In Bhakti poetry (such as Andal and Mirabai) and Sufi allegories, the human soul was conceived as a passionate bride or lover yearning for reunion with God.\nHence, Option {{CORR}} is correct.",
    "Explains bridal mysticism in Bhakti-Sufi literature."
)
add_q(make_question(CHAPTER, "Mystical Imagery", "In both Bhakti and Sufi devotional traditions, what central metaphorical persona was most commonly adopted by the human seeker toward God?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The soul of the deceased saint had united in mystical marriage with God",
    ["The saint had reincarnated into a new physical body", "The Sultan had issued a royal decree granting revenue exemptions", "The annual trade fair was officially inaugurated by the Qazi"],
    "A",
    "1. The death anniversary of a Sufi saint is termed 'Urs' (literally wedding), signifying the final union of the saint's soul with the Divine.\nHence, Option {{CORR}} is correct.",
    "Explains the meaning of Urs."
)
add_q(make_question(CHAPTER, "Sufi Pilgrimage Rituals", "Why is the annual death anniversary of a Sufi saint celebrated at their dargah under the name 'Urs' (mystical wedding)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Shaikh Muinuddin Chishti's dargah at Ajmer",
    ["Hazratbal in Srinagar", "Nizamuddin Dargah in Delhi", "Banda Nawaz Dargah in Gulbarga"],
    "B",
    "1. Muhammad bin Tughlaq was the first Sultan to build a tomb over the grave of Shaikh Muinuddin Chishti at Ajmer, although an earlier mosque may have existed.\nHence, Option {{CORR}} is correct.",
    "Identifies construction over Muinuddin Chishti's grave."
)
add_q(make_question(CHAPTER, "Ajmer Shrine Architecture", "Over whose grave at Ajmer did Sultan Muhammad bin Tughlaq construct the earliest recorded royal commemorative structure?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kirtana-ghosha and Ankiya Nat (one-act plays)",
    ["Kathak and Tarana", "Bharatanatyam and Varnam", "Yakshagana and Harikatha"],
    "C",
    "1. Sankaradeva developed the Ankiya Nat (one-act plays) and devotional songs (Borgeet) to communicate Vaishnava teachings through drama.\nHence, Option {{CORR}} is correct.",
    "Identifies Ankiya Nat developed by Shankaradeva."
)
add_q(make_question(CHAPTER, "Performance Traditions", "Which traditional form of one-act devotional theatrical performance did Shankaradeva pioneer to popularize Vaishnava stories in medieval Assam?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Guru Tegh Bahadur",
    ["Guru Arjan Dev", "Guru Hargobind", "Guru Har Rai"],
    "D",
    "1. The ninth Guru, Guru Tegh Bahadur, was executed at Chandni Chowk in Delhi in 1675 under the orders of Emperor Aurangzeb.\nHence, Option {{CORR}} is correct.",
    "Identifies martyrdom of Guru Tegh Bahadur in 1675."
)
add_q(make_question(CHAPTER, "Martyrdom of Sikh Gurus", "Which Sikh Guru was executed at Delhi in 1675 during the reign of Aurangzeb for resisting religious persecution?", opts, corr, sol))

# Verification of Unit 6
print(f"Total questions generated for Unit 6: {len(questions)}")
questions = questions[:80]
for idx, q in enumerate(questions):
    q["questionNumber"] = idx + 1
assert len(questions) == 80, f"Expected 80 questions, got {len(questions)}"

out_path = "mock/history_units/unit6.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved 80 questions to {out_path}!")
