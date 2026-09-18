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

CHAPTER = "Rebels and the Raj: The 1857 Revolt"

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen_texts:
        raise ValueError(f"Duplicate question inside Unit 10: {q['questionText'][:60]}")
    if norm in pyq_set:
        raise ValueError(f"Question matches PYQ: {q['questionText'][:60]}")
    seen_texts.add(norm)
    q["questionNumber"] = len(questions) + 1
    questions.append(q)

print("Generating 60 unique questions for Unit 10: Rebels and the Raj...")

# --- 1. Outbreak and Pattern of the 1857 Revolt ---

opts, corr, sol = rotate_options(
    "Meerut on 10 May 1857",
    ["Barrackpore on 29 March 1857", "Delhi on 11 May 1857", "Kanpur on 4 June 1857"],
    "A",
    "1. The 1857 Revolt began in the cantonment of Meerut on the afternoon of Sunday, 10 May 1857, when the 3rd Native Cavalry mutinied and broke open the jail.\nHence, Option {{CORR}} is correct.",
    "Identifies Meerut on 10 May 1857 as outbreak of Revolt."
)
add_q(make_question(CHAPTER, "Outbreak of Revolt", "In which military cantonment did the sepoys of the Bengal Army formally break into armed rebellion on the afternoon of 10 May 1857?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Marched directly to the Red Fort in Delhi and proclaimed the aged Mughal Emperor Bahadur Shah Zafar as their supreme leader",
    ["Boarded ships at Calcutta to return to Britain", "Surrendered all their weapons to the Commissioner of Agra", "Fled into the forests of Central India"],
    "B",
    "1. On the morning of 11 May 1857, the Meerut sepoys crossed the Yamuna, entered Delhi's Red Fort, and persuaded Bahadur Shah Zafar to assume leadership of the uprising.\nHence, Option {{CORR}} is correct.",
    "Describes sepoys reaching Delhi and proclaiming Bahadur Shah."
)
add_q(make_question(CHAPTER, "March to Delhi", "What decisive action did the mutinous Meerut sepoys take immediately upon reaching Delhi on the morning of 11 May 1857?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Firing of a signal gun or the sounding of the evening bugle (clearing gun)",
    ["Distribution of red flags across all cantonments", "Simultaneous ringing of church bells by British pastors", "Delivery of a secret royal letter from London"],
    "C",
    "1. Across cantonments, the uprising typically began with a pre-arranged signal: either the firing of an evening gun or the sounding of the bugle, followed by an immediate rush to the armory.\nHence, Option {{CORR}} is correct.",
    "Identifies signal gun or bugle as signal for revolt."
)
add_q(make_question(CHAPTER, "Pattern of Mutiny", "What conventional acoustic signal routinely triggered the synchronized uprising of sepoys across cantonment stations in north India in May–June 1857?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Bell of arms (shastragar)",
    ["Mess hall", "Parade ground", "Officers' club"],
    "D",
    "1. In every cantonment, the first physical target of the sepoys was the 'bell of arms' (shastragar), where weapons and ammunition were stored, to seize muskets and gunpowder.\nHence, Option {{CORR}} is correct.",
    "Identifies bell of arms as first target of sepoys."
)
add_q(make_question(CHAPTER, "Pattern of Mutiny", "What was the first physical building targeted and broken open by mutinying sepoys in every cantonment to arm themselves?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Seizing treasuries, burning administrative records and revenue registers, cutting telegraph lines, and destroying British bungalows",
    ["Protecting British banks and conducting formal audits", "Repainting colonial municipal offices", "Submitting petitions to the British Parliament"],
    "A",
    "1. The pattern of rebellion everywhere involved seizing the government treasury, burning debt and revenue registers, severing telegraph communications, and setting fire to European bungalows.\nHence, Option {{CORR}} is correct.",
    "Lists consistent targets of 1857 rebels."
)
add_q(make_question(CHAPTER, "Targets of Rebels", "What consistent destruction of colonial administrative apparatus was systematically carried out by rebels in every captured town?", opts, corr, sol))

# --- 2. Key Leaders and Regional Centers ---

opts, corr, sol = rotate_options(
    "Nana Sahib",
    ["Tantia Tope", "Kunwar Singh", "Birjis Qadr"],
    "B",
    "1. At Kanpur, Nana Sahib, the adopted son of the last Maratha Peshwa Baji Rao II, was proclaimed Peshwa and assumed leadership of the rebellion.\nHence, Option {{CORR}} is correct.",
    "Identifies Nana Sahib leading rebellion at Kanpur."
)
add_q(make_question(CHAPTER, "Leaders of 1857", "Which prominent adopted son of Peshwa Baji Rao II was proclaimed leader by the sepoys and citizens of Kanpur during the 1857 revolt?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Begum Hazrat Mahal",
    ["Rani Lakshmi Bai", "Rani Jindan", "Kasturba Gandhi"],
    "C",
    "1. In Lucknow, Begum Hazrat Mahal, wife of deposed Nawab Wajid Ali Shah, placed her young son Birjis Qadr on the throne and led determined armed resistance against the British.\nHence, Option {{CORR}} is correct.",
    "Identifies Begum Hazrat Mahal in Lucknow."
)
add_q(make_question(CHAPTER, "Leaders of 1857", "Which charismatic royal woman led the popular uprising in Awadh after crowning her minor son Birjis Qadr as the Nawab of Lucknow?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kunwar Singh",
    ["Maulvi Ahmadullah Shah", "Shah Mal", "Gonoo"],
    "D",
    "1. Kunwar Singh was an elderly zamindar of Jagdishpur in Arrah (Bihar) who joined the rebellion and fought valiantly against British forces across eastern India.\nHence, Option {{CORR}} is correct.",
    "Identifies Kunwar Singh in Arrah / Bihar."
)
add_q(make_question(CHAPTER, "Leaders of 1857", "Which veteran octogenarian Rajput zamindar of Jagdishpur in Bihar emerged as one of the most formidable military commanders of the 1857 rebellion?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Rani Lakshmi Bai",
    ["Begum Hazrat Mahal", "Rani Rashmoni", "Rani Chennamma"],
    "A",
    "1. In Jhansi, Rani Lakshmi Bai was pressured by sepoys and her subjects to assume leadership of the uprising, dying heroically on the battlefield of Gwalior in June 1858.\nHence, Option {{CORR}} is correct.",
    "Identifies Rani Lakshmi Bai in Jhansi."
)
add_q(make_question(CHAPTER, "Leaders of 1857", "Which iconic queen assumed the leadership of the rebellion in Central India, fighting fiercely in battle until her martyrdom near Gwalior in June 1858?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "General Bakht Khan",
    ["Azimullah Khan", "Khan Bahadur Khan", "Muhammad Zafar"],
    "B",
    "1. Subedar Bakht Khan arrived in Delhi with a large contingent of rebel sepoys from Bareilly, and Emperor Bahadur Shah appointed him commander-in-chief of the imperial forces.\nHence, Option {{CORR}} is correct.",
    "Identifies Bakht Khan as military commander in Delhi."
)
add_q(make_question(CHAPTER, "Delhi Military Command", "Which experienced subedar arrived from Bareilly with a massive force of mutinous troops to assume effective military command in rebel-held Delhi?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Maulvi Ahmadullah Shah (Maulvi of Faizabad)",
    ["Shah Waliullah", "Sayyid Ahmad Barelvi", "Sir Syed Ahmad Khan"],
    "C",
    "1. Maulvi Ahmadullah Shah, known as the Maulvi of Faizabad, moved around in a palanquin with drumbeaters, preaching jihad against British rule and predicting their imminent demise.\nHence, Option {{CORR}} is correct.",
    "Identifies Maulvi Ahmadullah Shah of Faizabad."
)
add_q(make_question(CHAPTER, "Popular Leaders", "Which charismatic Islamic preacher and rebel leader, travelling in a palanquin with drumbeaters, played a prominent role in the siege of Lucknow and battle of Chinhat?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Shah Mal",
    ["Gonoo", "Kadam Singh", "Devi Singh"],
    "D",
    "1. Shah Mal mobilized the villagers and headmen of eighty-four villages (chaurasi) in pargana Baraut (Baghpat, UP), cutting telegraph lines and supplying food to Delhi rebels.\nHence, Option {{CORR}} is correct.",
    "Identifies Shah Mal mobilizing Baraut."
)
add_q(make_question(CHAPTER, "Local Rebellion", "Which local rebel leader mobilized the peasants and clan headmen across eighty-four villages in pargana Baraut (western UP) before falling in battle?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Gonoo",
    ["Shah Mal", "Birsa Munda", "Sidhu"],
    "A",
    "1. Gonoo was a Kol tribal cultivator from Singbhum in Chota Nagpur who mobilized the Kol tribal community to join the 1857 rebellion alongside Raja Arjun Singh.\nHence, Option {{CORR}} is correct.",
    "Identifies Gonoo leading Kol rebels in Singbhum."
)
add_q(make_question(CHAPTER, "Tribal Participation", "Which Kol tribal cultivator emerged as a grassroots rebel commander, mobilizing his community in the Singbhum region of Chota Nagpur in 1857?", opts, corr, sol))

# --- 3. Annexation of Awadh and Discontent ---

opts, corr, sol = rotate_options(
    "Lord Dalhousie in 1851",
    ["Lord Wellesley in 1798", "Lord Hastings in 1818", "Lord Canning in 1856"],
    "B",
    "1. In 1851, Governor General Lord Dalhousie described the prosperous kingdom of Awadh as 'a cherry that will drop into our mouth one day'.\nHence, Option {{CORR}} is correct.",
    "Identifies Dalhousie describing Awadh as a cherry in 1851."
)
add_q(make_question(CHAPTER, "Annexation of Awadh", "Which Governor General famously described the kingdom of Awadh in 1851 as 'a cherry that will drop into our mouth one day'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Lord Wellesley in 1801",
    ["Lord Cornwallis in 1793", "Lord Dalhousie in 1856", "Lord William Bentinck in 1833"],
    "C",
    "1. Awadh was brought under the Subsidiary Alliance system in 1801 by Lord Wellesley, forcing the Nawab to disband his troops and station a British subsidiary force.\nHence, Option {{CORR}} is correct.",
    "Identifies Subsidiary Alliance imposed on Awadh in 1801."
)
add_q(make_question(CHAPTER, "Subsidiary Alliance", "In which year and under which Governor General was the humiliating Subsidiary Alliance first imposed upon the Nawab of Awadh?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Annexed Awadh formally on the pretext of alleged misgovernance by the Nawab in 1856",
    ["Restored full sovereign independence to the Nawab", "Converted Lucknow into the new federal capital of British India", "Gifted Awadh to the Maratha ruler of Gwalior"],
    "D",
    "1. In 1856, Lord Dalhousie deposed Nawab Wajid Ali Shah and formally annexed Awadh to the British Empire on the pretext that the region was misgoverned.\nHence, Option {{CORR}} is correct.",
    "Identifies annexation of Awadh in 1856 on misgovernance pretext."
)
add_q(make_question(CHAPTER, "Annexation of Awadh", "What final imperial action did Lord Dalhousie execute in 1856 regarding the Kingdom of Awadh?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The life was gone out of the body, and the city was left of desolate form",
    ["The people celebrated with fireworks and illuminated mosques", "The commercial guilds immediately reduced grain prices by half", "The countryside declared complete loyalty to Queen Victoria"],
    "A",
    "1. Contemporary chroniclers in Lucknow recorded that when Nawab Wajid Ali Shah was exiled to Calcutta, the entire city wept, saying 'the life was gone out of the body'.\nHence, Option {{CORR}} is correct.",
    "Describes popular grief at Wajid Ali Shah's exile."
)
add_q(make_question(CHAPTER, "Annexation of Awadh", "How did contemporary Indian observers and poets describe the collective grief of the people of Lucknow when Nawab Wajid Ali Shah was deposed and exiled to Calcutta?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Summary Settlement of 1856",
    ["Permanent Settlement of 1793", "Ryotwari Code of 1820", "Mahalwari Act of 1833"],
    "B",
    "1. In 1856, the British introduced the Summary Settlement of land revenue in Awadh, which systematically dismantled the authority of the powerful taluqdars.\nHence, Option {{CORR}} is correct.",
    "Identifies Summary Settlement of 1856 in Awadh."
)
add_q(make_question(CHAPTER, "Agrarian Discontent in Awadh", "Which punitive land revenue settlement introduced by the British in Awadh in 1856 dispossessed hereditary taluqdars of their forts, armed retainers, and villages?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Nursery of the Bengal Army",
    ["Shield of the Deccan", "Arsenal of the Empire", "Cradle of British Cavalry"],
    "C",
    "1. For over seven decades, the British recruited heavily from Awadh's high-caste Hindu and Muslim peasant households, causing Awadh to be dubbed the 'nursery of the Bengal Army'.\nHence, Option {{CORR}} is correct.",
    "Identifies Awadh as nursery of the Bengal Army."
)
add_q(make_question(CHAPTER, "Sepoy Recruitment", "By what epithet was the province of Awadh widely known because a huge proportion of the Bengal Army's sepoys were recruited from its villages?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Peasants in uniform",
    ["Mercenary adventurers", "Indentured serfs", "Professional aristocrats"],
    "D",
    "1. Historians emphasize that the sepoys of the Bengal Army were essentially 'peasants in uniform', whose grievances reflected the agrarian burdens of their families back home in Awadh.\nHence, Option {{CORR}} is correct.",
    "Identifies sepoys as peasants in uniform."
)
add_q(make_question(CHAPTER, "Nature of Sepoys", "How have modern historians famously characterized the sepoys of the Bengal Army to explain their deep emotional connection to agrarian grievances in Awadh?", opts, corr, sol))

# --- 4. Causes, Greased Cartridges & Rumours ---

opts, corr, sol = rotate_options(
    "Cartridges for the new Enfield rifle greased with cow and pig fat, offending both Hindus and Muslims",
    ["A sudden 50 percent cut in monthly rations", "Forced conscription of all sepoy children into military schools", "Prohibition of wearing leather footwear on parade"],
    "A",
    "1. The immediate spark was the introduction of the Enfield rifle, whose paper cartridges were rumoured to be coated with cow and pig fat, requiring soldiers to bite them open.\nHence, Option {{CORR}} is correct.",
    "Identifies greased cartridges of Enfield rifle as immediate cause."
)
add_q(make_question(CHAPTER, "Immediate Cause", "What military technological innovation became the immediate catalyst for the 1857 mutiny due to rumors regarding the greasing of its cartridges?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Bone dust of cows and pigs had been mixed into flour sold in the bazaars to defile their religion",
    ["British doctors were injecting poison disguised as cholera vaccines", "The Ganges river was being deliberately diverted to England", "The British had banned the recitation of the Quran and Gita"],
    "B",
    "1. Panic spread through northern India in early 1857 on rumors that the British had contaminated wheat flour in bazaars with powdered bone dust of cows and pigs to forcibly convert Indians.\nHence, Option {{CORR}} is correct.",
    "Describes rumor of bone dust in flour."
)
add_q(make_question(CHAPTER, "Rumours and Panics", "What alarming rumor regarding market food supplies circulated widely across north India in early 1857, intensifying popular panic about religious conversion?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Circulation of chapatis from village to village",
    ["Distribution of red ribbons by post", "Beating of bronze cymbals at crossroads", "Tying yellow threads to village trees"],
    "C",
    "1. In early 1857, people carried chapatis (unleavened flatbread) from village to village, instructing watchmen to bake more and pass them on, creating an ominous atmosphere of upheaval.\nHence, Option {{CORR}} is correct.",
    "Identifies circulation of chapatis."
)
add_q(make_question(CHAPTER, "Rumours and Messages", "What mysterious rural practice of transmitting items from village to village occurred across northern India on the eve of the 1857 revolt, spreading anticipation of upheaval?", opts, corr, sol))

# --- 5. Ideology, Proclamations, and Communal Unity ---

opts, corr, sol = rotate_options(
    "Azamgarh Proclamation of August 1857",
    ["Delhi Manifesto of May 1857", "Kanpur Declaration of June 1857", "Bareilly Firman of July 1857"],
    "D",
    "1. The celebrated Azamgarh Proclamation, published in August 1857 in the name of the Mughal prince Firoz Shah, appealed to zamindars, merchants, civil servants, and artisans to unite against British rule.\nHence, Option {{CORR}} is correct.",
    "Identifies Azamgarh Proclamation of August 1857."
)
add_q(make_question(CHAPTER, "Rebel Proclamations", "Which famous rebel manifesto, published in August 1857 in the name of the emperor's grandson, systematically outlined the grievances of zamindars, merchants, and artisans?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Remarkable unity between Hindus and Muslims, with proclamations consistently appealing to both communities under the banner of Mahavir and Muhammad",
    ["Violent sectarian riots between Hindu and Muslim rebels in Delhi", "Demands by Hindu leaders to expel all Muslims from north India", "Total refusal of Muslim sepoys to fight under Hindu zamindars"],
    "A",
    "1. The 1857 uprising was distinguished by complete communal harmony: rebel proclamations invoked both Hindu and Muslim deities, and cow slaughter was immediately banned by rebel leaders in Delhi.\nHence, Option {{CORR}} is correct.",
    "Highlights Hindu-Muslim unity in 1857."
)
add_q(make_question(CHAPTER, "Communal Harmony", "What remarkable communal characteristic distinguished the 1857 rebellion, confounding colonial authorities who sought to divide rebels on religious lines?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Firangi",
    ["Sahukar", "Diku", "Daroga"],
    "B",
    "1. Rebel proclamations and sepoys routinely referred to the British with the contemptuous Persian-derived term 'Firangi' (foreigner/European).\nHence, Option {{CORR}} is correct.",
    "Identifies the term Firangi used by rebels."
)
add_q(make_question(CHAPTER, "Anti-Colonial Language", "What derogatory term of Persian origin was consistently employed in rebel proclamations and songs to designate the white British colonizers?", opts, corr, sol))

# --- 6. British Repression and Martial Law ---

opts, corr, sol = rotate_options(
    "Enacted sweeping Martial Law acts across north India empowering ordinary British officers and civilians to try and summarily execute suspected rebels",
    ["Surrendered all crown territories to the French Government", "Immediately granted dominion status and universal franchise to Indians", "Withdrew all British garrisons across the subcontinent"],
    "C",
    "1. In May and June 1857, the colonial administration passed draconian emergency laws: ordinary military officers and British citizens were given the power of courts-martial with the sole sentence of death.\nHence, Option {{CORR}} is correct.",
    "Describes martial law and summary executions."
)
add_q(make_question(CHAPTER, "British Counter-Offensive", "What extraordinary legal measures did the British government enact in May and June 1857 to unleash unrestrained counter-insurgency across north India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sir John Lawrence from Punjab and troops advancing up the Gangetic plain from Calcutta",
    ["Naval forces sailing from Madras alone", "Mercenary regiments sent from Kathmandu", "British regiments arriving from Ceylon"],
    "D",
    "1. The British recaptured Delhi through a two-pronged offensive: one column mobilized from Punjab by John Lawrence and another pushing westward from Calcutta.\nHence, Option {{CORR}} is correct.",
    "Identifies two-pronged offensive on Delhi."
)
add_q(make_question(CHAPTER, "Recapture of Delhi", "From which two strategic directions did the British launch their massive counter-offensive to encircle and recapture the rebel capital of Delhi?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Humayun's Tomb by Lt. William Hodson",
    ["Qutb Minar by Colin Campbell", "Safdarjung Tomb by Henry Havelock", "Jama Masjid by James Outram"],
    "A",
    "1. In September 1857, Emperor Bahadur Shah Zafar surrendered to Lt. William Hodson at Humayun's Tomb; his sons Mirza Mughal and Mirza Khizr Sultan were shot dead on the spot.\nHence, Option {{CORR}} is correct.",
    "Identifies Hodson capturing Bahadur Shah at Humayun's Tomb."
)
add_q(make_question(CHAPTER, "Fall of Delhi", "At which historic Delhi monument was Emperor Bahadur Shah Zafar captured in September 1857, and his sons brutally executed by British officer William Hodson?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Exiled to Rangoon (Burma), where he died in 1862",
    ["Executed at the Red Fort in public", "Imprisoned at the Cellular Jail in the Andamans", "Given a lavish pension and house in London"],
    "B",
    "1. After his trial in the Red Fort, Bahadur Shah Zafar was stripped of all titles and exiled to Rangoon in Burma, where he passed away in 1862.\nHence, Option {{CORR}} is correct.",
    "Identifies Bahadur Shah exiled to Rangoon."
)
add_q(make_question(CHAPTER, "Fate of Bahadur Shah", "What ultimate punishment was meted out to the octogenarian Mughal Emperor Bahadur Shah Zafar after the British recaptured Delhi?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Colin Campbell",
    ["Henry Lawrence", "Hugh Rose", "John Nicholson"],
    "C",
    "1. Sir Colin Campbell, the newly appointed Commander-in-Chief of British forces, led the forces that relieved the Residency and recaptured Lucknow in March 1858.\nHence, Option {{CORR}} is correct.",
    "Identifies Colin Campbell recapturing Lucknow."
)
add_q(make_question(CHAPTER, "Recapture of Lucknow", "Which British Commander-in-Chief led the successful final assault that recaptured the city of Lucknow from rebel forces in March 1858?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sir Hugh Rose",
    ["Sir Colin Campbell", "Sir James Outram", "Sir Henry Havelock"],
    "D",
    "1. Sir Hugh Rose commanded the Central India Field Force that captured Jhansi and defeated Rani Lakshmi Bai at Kalpi and Gwalior, paying tribute to her as the 'bravest and best military leader of the rebels'.\nHence, Option {{CORR}} is correct.",
    "Identifies Hugh Rose praising Rani Lakshmi Bai."
)
add_q(make_question(CHAPTER, "Campaign in Central India", "Which British general, who captured Jhansi, famously paid tribute to Rani Lakshmi Bai by describing her as 'the bravest and best military leader of the rebels'?", opts, corr, sol))

# --- 7. Pictorial Representations of 1857 ---

opts, corr, sol = rotate_options(
    "Relief of Lucknow painted by Thomas Jones Barker in 1859",
    ["In Memoriam by Joseph Noel Paton", "The Death of General Wolfe by Benjamin West", "The Capture of Delhi by Charles Ball"],
    "A",
    "1. Thomas Jones Barker painted 'Relief of Lucknow' in 1859, celebrating the triumphant meeting of Campbell, Outram, and Havelock to foster British national pride.\nHence, Option {{CORR}} is correct.",
    "Identifies Relief of Lucknow by Thomas Jones Barker."
)
add_q(make_question(CHAPTER, "British Paintings", "Which grand commemorative British painting executed in 1859 depicted the dramatic handshake between Colin Campbell, James Outram, and Henry Havelock at Lucknow?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "In Memoriam painted by Joseph Noel Paton in 1858",
    ["Relief of Lucknow", "The Clemency of Canning", "Justice by Tenniel"],
    "B",
    "1. Joseph Noel Paton painted 'In Memoriam' in 1858, depicting helpless British women and children huddled in fear, designed to provoke anger and thirst for retribution.\nHence, Option {{CORR}} is correct.",
    "Identifies In Memoriam by Joseph Noel Paton."
)
add_q(make_question(CHAPTER, "British Visual Propaganda", "Which emotive British painting by Joseph Noel Paton showed terrified English women and children huddled together awaiting impending slaughter by rebels?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Blowing rebel sepoys from the mouths of cannons in mass public executions",
    ["Pardoning all rebels who surrendered their uniforms", "Granting agricultural land to mutinous soldiers", "Appointing sepoys to the British civil service"],
    "C",
    "1. British retribution was visually documented through horrific photographs and sketches of mass hangings and blowing mutineers from the mouths of cannons.\nHence, Option {{CORR}} is correct.",
    "Identifies blowing rebels from cannon mouths."
)
add_q(make_question(CHAPTER, "Colonial Retribution", "What brutal spectacle of mass execution was frequently staged and visually depicted by the British to terrorize the Indian population into submission?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Subhadra Kumari Chauhan",
    ["Sarojini Naidu", "Mahadevi Varma", "Toru Dutt"],
    "D",
    "1. Hindi poetess Subhadra Kumari Chauhan composed the legendary poem containing the immortal line: 'Khoob ladi mardani woh to Jhansi wali rani thi'.\nHence, Option {{CORR}} is correct.",
    "Identifies Subhadra Kumari Chauhan's poem on Jhansi ki Rani."
)
add_q(make_question(CHAPTER, "Nationalist Literature", "Which celebrated Indian poetess composed the stirring poem that etched Rani Lakshmi Bai's valor into the national memory with the line: 'Khoob ladi mardani woh to Jhansi wali rani thi'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "V.D. Savarkar in 1909",
    ["Dadabhai Naoroji in 1901", "Bal Gangadhar Tilak in 1897", "Gopal Krishna Gokhale in 1905"],
    "A",
    "1. V.D. Savarkar wrote 'The Indian War of Independence of 1857' in 1909, reinterpreting the event as a planned national war of liberation rather than a mere sepoy mutiny.\nHence, Option {{CORR}} is correct.",
    "Identifies V.D. Savarkar terming 1857 First War of Independence."
)
add_q(make_question(CHAPTER, "Historiography of 1857", "Which nationalist intellectual authored the influential 1909 book that framed the 1857 uprising as 'The First War of Indian Independence'?", opts, corr, sol))

# --- 8. Statement & Assertion Questions ---

add_q(make_statement_question(
    CHAPTER, "Awadh Annexation Effects",
    "The annexation of Awadh in 1856 triggered outrage not only among court aristocrats but also deep in the rural villages.",
    "Displacing Nawab Wajid Ali Shah led to the dissolution of royal courts and workshops, ruining hundreds of poets, musicians, artisans, and merchants.",
    1,
    "A",
    "1. Statement I is correct: Annexation alienated sepoys and villagers whose relatives had served the Nawab.\n2. Statement II is correct: The removal of the court destroyed royal patronage for thousands of artisans and musicians.\nHence, Both Statement I and Statement II are correct.",
    "Analyzes the wide socio-economic shock of Awadh's annexation."
))

add_q(make_statement_question(
    CHAPTER, "Religious Motives",
    "Rebels in 1857 believed that the British government was engaged in a deliberate conspiracy to destroy their religion and caste.",
    "Rebel leaders sought to completely abolish all customary laws and adopt the British legal code voluntarily.",
    3,
    "B",
    "1. Statement I is correct: Rumours about greased cartridges and bone-dust in flour fed genuine fears of forced Christian conversion.\n2. Statement II is incorrect: Rebels fought specifically to protect their dharma and deen against foreign subversion.",
    "Examines religious convictions driving the 1857 insurgency."
))

add_q(make_assertion_question(
    CHAPTER, "Taluqdar Participation in Awadh",
    "Many taluqdars in Awadh joined the 1857 uprising and fought alongside their loyal peasant tenants against the British.",
    "The British Summary Settlement of 1856 had stripped taluqdars of their estates and forts, destroying their traditional ties of feudal patronage with peasants.",
    1,
    "A",
    "1. Assertion (A) is true: Taluqdars led armed resistance and were supported by their peasantry.\n2. Reason (R) is true: The 1856 settlement dispossessed taluqdars of nearly half their villages, generating intense anti-British solidarity.\n3. Reason (R) directly explains Assertion (A).",
    "Explains taluqdar-peasant solidarity in the Awadh revolt."
))

add_q(make_assertion_question(
    CHAPTER, "Failure of 1857 Revolt",
    "Despite widespread popular support across north India, the 1857 revolt was ultimately suppressed by the British within eighteen months.",
    "The rebels lacked unified military command, modern communications like the electric telegraph, and reliable external sources of ammunition.",
    1,
    "A",
    "1. Assertion (A) is true: The British systematically crushed the revolt by late 1858.\n2. Reason (R) is true: Rebel forces were regionally fragmented, lacked centralized coordination, and ran out of ammunition against British industrial logistics.\n3. Reason (R) directly explains Assertion (A).",
    "Explains the structural reasons for the defeat of the 1857 revolt."
))

# --- 9. Match and Sequence Questions ---

add_q(make_match_question(
    CHAPTER, "Centers and Leaders of 1857",
    "Match the leader of the 1857 rebellion in List I with their primary center of activity in List II:",
    [
        ("A", "Nana Sahib"),
        ("B", "Begum Hazrat Mahal"),
        ("C", "Kunwar Singh"),
        ("D", "Rani Lakshmi Bai")
    ],
    [
        ("i", "Arrah (Bihar)"),
        ("ii", "Kanpur"),
        ("iii", "Jhansi"),
        ("iv", "Lucknow")
    ],
    "A-ii, B-iv, C-i, D-iii",
    "C",
    "1. Nana Sahib = Kanpur (A-ii), Begum Hazrat Mahal = Lucknow (B-iv), Kunwar Singh = Arrah (C-i), Rani Lakshmi Bai = Jhansi (D-iii).",
    "Matches 1857 leaders with regional centers."
))

add_q(make_match_question(
    CHAPTER, "British Military Commanders",
    "Match the British military commander in List I with their action in List II:",
    [
        ("A", "Colin Campbell"),
        ("B", "Hugh Rose"),
        ("C", "William Hodson"),
        ("D", "Henry Lawrence")
    ],
    [
        ("i", "Killed defending the Lucknow Residency in July 1857"),
        ("ii", "Commander who recaptured Lucknow in March 1858"),
        ("iii", "Defeated Rani of Jhansi in Central India"),
        ("iv", "Captured Bahadur Shah Zafar at Humayun's tomb")
    ],
    "A-ii, B-iii, C-iv, D-i",
    "D",
    "1. Colin Campbell = Recaptured Lucknow (A-ii), Hugh Rose = Defeated Rani of Jhansi (B-iii), Hodson = Captured Bahadur Shah (C-iv), Henry Lawrence = Killed at Lucknow (D-i).",
    "Matches British commanders with historical events."
))

add_q(make_sequence_question(
    CHAPTER, "Outbreak Sequence of 1857",
    "Arrange the following events of May 1857 in chronological order:\nI. Mutinous Meerut sepoys break open the cantonment jail\nII. Meerut sepoys cross the Yamuna and arrive at Delhi's Red Fort\nIII. Execution of Mangal Pandey at Barrackpore\nIV. Proclamation of Bahadur Shah Zafar as Emperor of Hindustan",
    [
        ("A", "III"),
        ("B", "I"),
        ("C", "II"),
        ("D", "IV")
    ],
    "A, B, C, D",
    "A",
    "1. Chronology: Mangal Pandey incident at Barrackpore (late March/April) -> Meerut mutiny (10 May) -> Arrival at Red Fort (morning of 11 May) -> Proclamation of Bahadur Shah (11–12 May).",
    "Orders opening events of the 1857 revolt."
))

add_q(make_sequence_question(
    CHAPTER, "Major Stages of the 1857 Conflict",
    "Arrange the following landmark military milestones of 1857–58 in chronological order:\nI. Outbreak of revolt at Meerut\nII. Recapture of Delhi by British forces\nIII. Final relief and recapture of Lucknow by Colin Campbell\nIV. Martyrdom of Rani Lakshmi Bai at Gwalior",
    [
        ("A", "I"),
        ("B", "II"),
        ("C", "III"),
        ("D", "IV")
    ],
    "A, B, C, D",
    "A",
    "1. Chronology: Meerut outbreak (May 1857) -> Delhi recaptured (September 1857) -> Lucknow recaptured (March 1858) -> Rani Lakshmi Bai martyrdom (June 1858).",
    "Orders the progression of the 1857 conflict."
))

# --- 10. Additional In-Depth Questions to Reach 60 ---

opts, corr, sol = rotate_options(
    "Mangal Pandey",
    ["Ishwar Pandey", "Bakht Khan", "Bindeshwari Prasad"],
    "B",
    "1. On 29 March 1857, young sepoy Mangal Pandey of the 34th Native Infantry fired at his British officers at Barrackpore, becoming an iconic martyr.\nHence, Option {{CORR}} is correct.",
    "Identifies Mangal Pandey at Barrackpore."
)
add_q(make_question(CHAPTER, "Barrackpore Incident", "Which young sepoy of the 34th Native Infantry attacked his British sergeant-major at Barrackpore on 29 March 1857, triggering his court-martial and execution?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Lord Canning",
    ["Lord Dalhousie", "Lord Ripon", "Lord Lytton"],
    "C",
    "1. Lord Canning was the Governor General of India when the 1857 Revolt erupted, and later became the first Viceroy of India under the Crown.\nHence, Option {{CORR}} is correct.",
    "Identifies Lord Canning as Governor General in 1857."
)
add_q(make_question(CHAPTER, "Colonial Leadership", "Who was the Governor General of India during the tumultuous outbreak and suppression of the 1857 Revolt?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The Government of India Act of 1858 transferred the governance of India from the East India Company to the British Crown",
    ["The British Parliament granted complete dominion status to India", "The capital of India was shifted from Calcutta to Bombay", "All British troops were replaced by Russian mercenaries"],
    "D",
    "1. By the Government of India Act 1858, British Parliament abolished the East India Company's rule and transferred direct sovereign authority over India to Queen Victoria and the Crown.\nHence, Option {{CORR}} is correct.",
    "Identifies Crown takeover under Government of India Act 1858."
)
add_q(make_question(CHAPTER, "Constitutional Consequence", "What monumental constitutional transformation took place in November 1858 in the immediate aftermath of the suppression of the revolt?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Queen Victoria's Proclamation of 1 November 1858",
    ["Cornwallis Proclamation of 1793", "Macaulay Resolution of 1835", "Curzon Declaration of 1905"],
    "A",
    "1. Queen Victoria's Proclamation, read out by Lord Canning at Allahabad on 1 November 1858, assured princely rulers that their territories would not be annexed and promised religious non-interference.\nHence, Option {{CORR}} is correct.",
    "Identifies Queen Victoria's Proclamation of 1858."
)
add_q(make_question(CHAPTER, "Royal Proclamation", "Which historic royal document read out at Allahabad on 1 November 1858 promised that the British Crown would annex no further Indian states and respect religious beliefs?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The proportion of European soldiers was drastically increased, and artillery was kept exclusively under European control",
    ["The entire native army was converted into cavalry", "Indian officers were promoted to supreme command of the army", "All British officers were replaced by Gurkha officers"],
    "B",
    "1. Following the Peel Commission recommendations, the British reorganized the military: the ratio of Europeans was raised, artillery was monopolized by Europeans, and recruitment shifted to 'martial races'.\nHence, Option {{CORR}} is correct.",
    "Describes army reorganization post-1858."
)
add_q(make_question(CHAPTER, "Military Reorganization", "How was the Indian army restructured following the 1857 revolt to prevent any future native uprising?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sati Chowra Ghat and Bibighar",
    ["Jallianwala Bagh", "Chauri Chaura", "Red Fort grounds"],
    "C",
    "1. At Kanpur, the killing of British men at Sati Chowra Ghat and the subsequent massacre of women and children at Bibighar became a potent rallying cry for British revenge.\nHence, Option {{CORR}} is correct.",
    "Identifies Sati Chowra Ghat and Bibighar."
)
add_q(make_question(CHAPTER, "Kanpur Tragedies", "Which two tragic massacre sites at Kanpur were used in British visual propaganda to whip up violent racist revenge across the British Empire?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Tantia Tope",
    ["Azimullah Khan", "Bakht Khan", "Kunwar Singh"],
    "D",
    "1. Tantia Tope was Nana Sahib's brilliant military general who sustained guerrilla warfare across Central India until he was betrayed, captured, and executed in April 1859.\nHence, Option {{CORR}} is correct.",
    "Identifies Tantia Tope's guerrilla resistance."
)
add_q(make_question(CHAPTER, "Guerrilla Warfare", "Which master tactician and lieutenant of Nana Sahib conducted a relentless guerrilla campaign against British forces across the forests of Central India until 1859?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Azimullah Khan",
    ["Tantia Tope", "Bakht Khan", "Maulvi Ahmadullah Shah"],
    "A",
    "1. Azimullah Khan was the trusted political adviser and diplomat of Nana Sahib, who travelled to London to plead for his pension and later played an instrumental role in planning the Kanpur uprising.\nHence, Option {{CORR}} is correct.",
    "Identifies Azimullah Khan."
)
add_q(make_question(CHAPTER, "Diplomatic Emissaries", "Which eloquent political advisor of Nana Sahib travelled to London to plead his pension case before the Court of Directors and later helped coordinate the Kanpur uprising?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Doctrine of Lapse",
    ["Subsidiary Alliance", "Sunset Law", "Permanent Settlement"],
    "B",
    "1. Lord Dalhousie's Doctrine of Lapse denied adopted heirs the right to succeed to princely thrones, leading to the annexation of Jhansi, Satara, and Nagpur, alienating Indian rulers.\nHence, Option {{CORR}} is correct.",
    "Identifies Doctrine of Lapse."
)
add_q(make_question(CHAPTER, "Annexation Policies", "Which contentious annexation doctrine devised by Lord Dalhousie barred adopted sons from inheriting sovereign princely thrones, directly causing Rani Lakshmi Bai's rebellion?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The General Service Enlistment Act of 1856",
    ["The Vernacular Press Act of 1878", "The Arms Act of 1878", "The Regulating Act of 1773"],
    "C",
    "1. The General Service Enlistment Act of 1856 required all new recruits in the Bengal Army to serve overseas if ordered, violating caste taboos regarding crossing the 'kala pani'.\nHence, Option {{CORR}} is correct.",
    "Identifies General Service Enlistment Act of 1856."
)
add_q(make_question(CHAPTER, "Military Grievances", "Which colonial legislation passed in 1856 caused deep alarm among high-caste Bengal sepoys by requiring them to serve overseas, thereby risking loss of caste (kala pani)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "British missionaries were actively promoted by senior military officers who encouraged the conversion of sepoys to Christianity",
    ["The sepoys were forced to attend church every morning", "The British army banned all Indian languages from military manuals", "The government ordered all temple land endowments to be auctioned"],
    "D",
    "1. Many British officers in the 1850s engaged in evangelical Christian preaching inside military lines, creating deep anxiety among sepoys that their religion was targeted for destruction.\nHence, Option {{CORR}} is correct.",
    "Explains evangelical fears among sepoys."
)
add_q(make_question(CHAPTER, "Religious Anxieties", "What controversial activity by certain evangelical British military commanders in the 1850s heightened sepoy fears of state-sponsored religious conversion?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sir Henry Lawrence",
    ["Sir John Lawrence", "Sir James Outram", "Sir Colin Campbell"],
    "A",
    "1. Sir Henry Lawrence was the Chief Commissioner of Awadh who fortified the British Residency at Lucknow and died there of wounds from an exploding shell in July 1857.\nHence, Option {{CORR}} is correct.",
    "Identifies Sir Henry Lawrence dying in Lucknow Residency."
)
add_q(make_question(CHAPTER, "Siege of Lucknow", "Which prominent British Chief Commissioner of Awadh fortified the Residency at Lucknow and was mortally wounded during the early days of the siege?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Chinhat",
    ["Bithur", "Badli-ki-Serai", "Alambagh"],
    "B",
    "1. On 30 June 1857, British forces under Henry Lawrence were decisively routed by rebel sepoys and citizens at the Battle of Chinhat, forcing them into the Lucknow Residency.\nHence, Option {{CORR}} is correct.",
    "Identifies Battle of Chinhat near Lucknow."
)
add_q(make_question(CHAPTER, "Battle of Chinhat", "In which battle near Lucknow on 30 June 1857 did rebel forces under Maulvi Ahmadullah Shah soundly defeat British troops, driving them into the Residency?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The Clemency of Canning (Punch cartoon)",
    ["Relief of Lucknow", "In Memoriam", "Justice by Tenniel"],
    "C",
    "1. A famous satirical cartoon published in Punch titled 'The Clemency of Canning' depicted Governor General Canning protectively restraining a vengeful British soldier, mocking his moderate stance.\nHence, Option {{CORR}} is correct.",
    "Identifies Punch cartoon The Clemency of Canning."
)
add_q(make_question(CHAPTER, "Satirical Cartoons", "Which famous British Punch cartoon mocked Governor General Canning as weak and over-sympathetic toward Indian mutineers, christening him 'Clemency Canning'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sir Syed Ahmad Khan in 1858",
    ["Mirza Ghalib in 1860", "Maulana Azad in 1912", "Allama Iqbal in 1908"],
    "D",
    "1. Sir Syed Ahmad Khan authored the groundbreaking tract 'Asbab-e-Baghawat-e-Hind' (The Causes of the Indian Revolt) in 1858, analyzing the lack of Indian representation in government as the main cause.\nHence, Option {{CORR}} is correct.",
    "Identifies Sir Syed Ahmad Khan writing Asbab-e-Baghawat-e-Hind."
)
add_q(make_question(CHAPTER, "Indigenous Contemporary Analysis", "Which prominent Muslim intellectual authored the critical contemporary analytical treatise 'Asbab-e-Baghawat-e-Hind' (The Causes of the Indian Revolt) in 1858?", opts, corr, sol))

# Verification of Unit 10
print(f"Total questions generated for Unit 10: {len(questions)}")
assert len(questions) == 60, f"Expected 60 questions, got {len(questions)}"

out_path = "mock/history_units/unit10.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved 60 questions to {out_path}!")
