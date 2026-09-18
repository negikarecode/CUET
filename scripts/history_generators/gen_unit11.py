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

CHAPTER = "Mahatma Gandhi and the Nationalist Movement"

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen_texts:
        raise ValueError(f"Duplicate question inside Unit 11: {q['questionText'][:60]}")
    if norm in pyq_set:
        raise ValueError(f"Question matches PYQ: {q['questionText'][:60]}")
    seen_texts.add(norm)
    q["questionNumber"] = len(questions) + 1
    questions.append(q)

print("Generating 80 unique questions for Unit 11: Mahatma Gandhi & Nationalist Movement...")

# --- 1. Return to India and Early Satyagrahas ---

opts, corr, sol = rotate_options(
    "January 1915 after spending two decades in South Africa",
    ["August 1914 after the outbreak of World War I", "December 1916 for the Lucknow Congress", "March 1919 during the Rowlatt Act agitation"],
    "A",
    "1. Mahatma Gandhi returned to India in January 1915 after living and practicing law in South Africa for over twenty years, where he had forged the technique of Satyagraha.\nHence, Option {{CORR}} is correct.",
    "Identifies Gandhi's return in January 1915."
)
add_q(make_question(CHAPTER, "Return to India", "In which month and year did Mahatma Gandhi return to India from South Africa, bringing with him the tested technique of non-violent Satyagraha?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Gopal Krishna Gokhale",
    ["Bal Gangadhar Tilak", "Dadabhai Naoroji", "Bipin Chandra Pal"],
    "B",
    "1. Gopal Krishna Gokhale was Gandhi's acknowledged political mentor, who advised him to travel across India for a year to observe the conditions of ordinary people.\nHence, Option {{CORR}} is correct.",
    "Identifies Gokhale as Gandhi's political mentor."
)
add_q(make_question(CHAPTER, "Political Mentor", "Whom did Mahatma Gandhi revere as his political mentor, upon whose counsel he spent his first year back in India travelling across the country by third-class train?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Opening of the Banaras Hindu University (BHU) in February 1916",
    ["Calcutta Congress session in December 1917", "All-India Muslim League session in 1915", "Bombay Provincial Conference in 1916"],
    "C",
    "1. Gandhi's first major public appearance in India was at the opening of Banaras Hindu University in February 1916, where he boldly criticized elite leaders for ignoring the peasant masses.\nHence, Option {{CORR}} is correct.",
    "Identifies BHU opening in February 1916."
)
add_q(make_question(CHAPTER, "First Public Appearance", "At which prestigious public event in February 1916 did Mahatma Gandhi deliver his first major address in India, asserting that India's salvation lay through the peasant?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Raj Kumar Shukla",
    ["Brajkishore Prasad", "Gorakh Prasad", "Anugrah Narayan Sinha"],
    "D",
    "1. Raj Kumar Shukla, an exploited peasant from Champaran, persistently approached Gandhi at the Lucknow Congress (1916) and persuaded him to visit Champaran.\nHence, Option {{CORR}} is correct.",
    "Identifies Raj Kumar Shukla inviting Gandhi to Champaran."
)
add_q(make_question(CHAPTER, "Champaran Satyagraha", "Which determined indigo peasant from Champaran persistently petitioned Mahatma Gandhi to visit Bihar and investigate the oppression of European indigo planters?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Tinkathia system, requiring peasants to cultivate indigo on 3/20th of their land for British planters",
    ["Permanent Settlement revenue enhancement", "Forced cultivation of opium for Chinese trade", "Monopoly salt tax levied on coastal salt marshes"],
    "A",
    "1. The Champaran Satyagraha (1917) targeted the oppressive Tinkathia system, under which tenant farmers were legally compelled to grow indigo on 3/20th of their holdings.\nHence, Option {{CORR}} is correct.",
    "Explains Tinkathia system in Champaran."
)
add_q(make_question(CHAPTER, "Champaran Satyagraha", "What was the oppressive agricultural arrangement known as the 'Tinkathia system' that Gandhi successfully challenged in Champaran in 1917?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ahmedabad textile mill strike of 1918 demanding a 35 percent wage hike after the withdrawal of the plague bonus",
    ["Champaran indigo satyagraha", "Kheda peasant revenue satyagraha", "Rowlatt Satyagraha"],
    "B",
    "1. Gandhi undertook his first hunger strike in India during the Ahmedabad cotton mill strike in 1918, successfully securing a 35% wage increase for textile workers.\nHence, Option {{CORR}} is correct.",
    "Identifies Ahmedabad Mill Strike as first hunger strike."
)
add_q(make_question(CHAPTER, "Ahmedabad Mill Strike", "During which 1918 labour dispute did Mahatma Gandhi undertake his first hunger strike in India to secure a 35 percent wage hike for factory workers?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Remission of land revenue due to widespread crop failure under famine conditions",
    ["Abolition of child marriage in Saurashtra", "Prohibition of foreign liquor sales", "Immediate withdrawal of British troops from Gujarat"],
    "C",
    "1. In the Kheda Satyagraha of 1918, peasants demanded remission of state land revenue after drought and crop failure wiped out their harvests.\nHence, Option {{CORR}} is correct.",
    "Identifies Kheda demand for revenue remission."
)
add_q(make_question(CHAPTER, "Kheda Satyagraha", "What core agrarian demand did Mahatma Gandhi and Sardar Vallabhbhai Patel champion during the Kheda Satyagraha of 1918 in Gujarat?", opts, corr, sol))

# --- 2. The Rowlatt Act and Jallianwala Bagh ---

opts, corr, sol = rotate_options(
    "Authorized the colonial government to arrest and detain political suspects without trial for up to two years",
    ["Imposed mandatory military service on all college students", "Banned the publication of all newspapers in vernacular languages", "Nationalized all private Indian banks and trading companies"],
    "D",
    "1. The Anarchical and Revolutionary Crimes Act (Rowlatt Act) of March 1919 permitted the detention of political suspects without trial for two years based on secret evidence.\nHence, Option {{CORR}} is correct.",
    "Explains detention without trial under Rowlatt Act."
)
add_q(make_question(CHAPTER, "Rowlatt Act", "What draconian provision of the Rowlatt Act of March 1919 provoked nationwide outrage and led Gandhi to launch the Rowlatt Satyagraha?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Nationwide hartal (general strike) on 6 April 1919 accompanied by fasting and prayer",
    ["Immediate boycott of all postal and railway services", "Armed assault on British cantonments", "Mass resignation from princely state administrations"],
    "A",
    "1. Gandhi called for an all-India hartal (strike) on 6 April 1919, turning the Rowlatt Satyagraha into the first truly pan-Indian mass political protest.\nHence, Option {{CORR}} is correct.",
    "Identifies 6 April 1919 hartal for Rowlatt Satyagraha."
)
add_q(make_question(CHAPTER, "Rowlatt Satyagraha", "What peaceful form of nationwide mass mobilization was organized by Mahatma Gandhi on 6 April 1919 to protest against the Rowlatt Act?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "General Reginald Dyer",
    ["Sir Michael O'Dwyer", "Lord Chelmsford", "General William Elphinstone"],
    "B",
    "1. Brigadier-General Reginald Dyer marched British-commanded troops into Jallianwala Bagh in Amritsar on 13 April 1919 and ordered unprovoked firing on a peaceful crowd.\nHence, Option {{CORR}} is correct.",
    "Identifies General Dyer as perpetrator of Jallianwala Bagh."
)
add_q(make_question(CHAPTER, "Jallianwala Bagh Massacre", "Which British military officer ordered his troops to open fire without warning on the trapped, unarmed gathering at Jallianwala Bagh on 13 April 1919?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Renounced his British Knighthood in deep anguish and protest",
    ["Resigned from the Nobel Prize committee", "Left India permanently to settle in England", "Organized an armed revolutionary squad in Bengal"],
    "C",
    "1. Rabindranath Tagore surrendered his Knighthood in a moving letter to the Viceroy, stating that badges of honour made our shame glaring in the incongruous context of humiliation.\nHence, Option {{CORR}} is correct.",
    "Identifies Tagore renouncing his Knighthood."
)
add_q(make_question(CHAPTER, "Reaction to Massacre", "What dramatic symbolic protest did Rabindranath Tagore lodge in response to the Jallianwala Bagh massacre in Amritsar?", opts, corr, sol))

# --- 3. Non-Cooperation Movement and Khilafat ---

opts, corr, sol = rotate_options(
    "Muhammad Ali and Shaukat Ali (the Ali brothers)",
    ["Syed Ahmad Khan and Chiragh Ali", "Liaquat Ali Khan and Sikandar Hayat Khan", "Muhammad Iqbal and Abul Kalam Azad"],
    "D",
    "1. The Khilafat movement in India was spearheaded by the young Muslim leaders Muhammad Ali and Shaukat Ali (the Ali brothers) along with Maulana Azad.\nHence, Option {{CORR}} is correct.",
    "Identifies Ali brothers leading Khilafat movement."
)
add_q(make_question(CHAPTER, "Khilafat Movement", "Which two brothers spearheaded the all-India Khilafat movement to protest against the dismemberment of the Ottoman Empire and preserve the Turkish Caliph?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Forged an unprecedented unified mass front between Hindus and Muslims against colonial rule",
    ["Secured immediate financial loans from the Ottoman government", "Created a combined international army with Turkey", "Promoted the adoption of Arabic as the national language"],
    "A",
    "1. Gandhi astutely linked the Khilafat cause with the demand for Swaraj, forging an unprecedented alliance between Hindus and Muslims in a combined Non-Cooperation movement.\nHence, Option {{CORR}} is correct.",
    "Explains strategic significance of linking Khilafat with Non-Cooperation."
)
add_q(make_question(CHAPTER, "Hindu-Muslim Unity", "Why did Mahatma Gandhi strategically link the Indian nationalist movement with the international Khilafat cause in 1920?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Nagpur Congress session in December 1920",
    ["Calcutta Special session in September 1920", "Belgaum Congress session in 1924", "Lahore Congress session in 1929"],
    "B",
    "1. At the Nagpur session of the Congress in December 1920, the Non-Cooperation resolution was unanimously ratified and the Congress constitution amended to establish linguistic provincial committees.\nHence, Option {{CORR}} is correct.",
    "Identifies Nagpur session in December 1920 ratifying Non-Cooperation."
)
add_q(make_question(CHAPTER, "Congress Reorganization", "At which landmark annual session in December 1920 was the Non-Cooperation programme formally ratified and the Congress organizational structure democratized?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Boycott of government schools, law courts, foreign cloth, and surrender of British-conferred titles",
    ["Armed mutinies inside imperial naval dockyards", "Assassination of European district magistrates", "Establishment of an underground socialist republic"],
    "C",
    "1. The Non-Cooperation programme revolved around surrendering colonial titles (e.g. Kaisar-i-Hind), boycotting government educational institutions and law courts, and shunning foreign cloth.\nHence, Option {{CORR}} is correct.",
    "Lists primary features of Non-Cooperation."
)
add_q(make_question(CHAPTER, "Non-Cooperation Programme", "What were the core boycott activities advocated by Mahatma Gandhi during the Non-Cooperation Movement of 1920–1922?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Chauri Chaura in Gorakhpur district (UP) on 4 February 1922",
    ["Jallianwala Bagh on 13 April 1919", "Kakori in August 1925", "Kheda in March 1918"],
    "D",
    "1. On 4 February 1922, a peasant procession at Chauri Chaura clashed with police, surrounded the police station, and set it ablaze, killing 22 policemen, prompting Gandhi to call off the movement.\nHence, Option {{CORR}} is correct.",
    "Identifies Chauri Chaura incident on 4 February 1922."
)
add_q(make_question(CHAPTER, "Withdrawal of Movement", "At which village in Gorakhpur district did a violent clash resulting in the burning of a police station occur on 4 February 1922, prompting Gandhi to suspend Non-Cooperation?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sentenced him to six years' imprisonment for sedition, while expressing deep personal respect for him as a great patriot",
    ["Sentenced him to transportation for life to the Andaman Islands", "Acquitted him of all charges due to popular pressure", "Ordered his immediate deportation back to South Africa"],
    "A",
    "1. In March 1922, Judge C.N. Broomfield sentenced Gandhi to six years' simple imprisonment, paying him the tribute that he was a person of noble character whom millions revered.\nHence, Option {{CORR}} is correct.",
    "Describes trial of Gandhi by Judge Broomfield in 1922."
)
add_q(make_question(CHAPTER, "Trial of Gandhi", "What historic verdict was pronounced by British judge C.N. Broomfield during Mahatma Gandhi's trial in Ahmedabad in March 1922?", opts, corr, sol))

# --- 4. The Salt Satyagraha and Civil Disobedience ---

opts, corr, sol = rotate_options(
    "All-white composition with not a single Indian member appointed to it",
    ["Proposal to partition Bengal once again", "Recommendation to double the salt tax", "Refusal to allow Indian students to study in Oxford"],
    "B",
    "1. The Indian Statutory Commission (Simon Commission), appointed in November 1927, was boycotted by all Indian political parties because it did not include a single Indian member.\nHence, Option {{CORR}} is correct.",
    "Identifies all-white composition of Simon Commission."
)
add_q(make_question(CHAPTER, "Simon Commission", "Why was the Simon Commission appointed in 1927 unanimously boycotted by the Indian National Congress and the Muslim League under the banner 'Simon Go Back'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Lala Lajpat Rai",
    ["Bal Gangadhar Tilak", "Bipin Chandra Pal", "Gopal Krishna Gokhale"],
    "C",
    "1. Lala Lajpat Rai (the 'Lion of Punjab') was brutally lathi-charged while leading a peaceful anti-Simon Commission demonstration in Lahore in October 1928, succumbing to his injuries weeks later.\nHence, Option {{CORR}} is correct.",
    "Identifies Lala Lajpat Rai martyred after Simon protest."
)
add_q(make_question(CHAPTER, "Anti-Simon Protests", "Which venerated nationalist leader succumbed to fatal injuries sustained during a brutal police lathi-charge while leading an anti-Simon Commission protest at Lahore in 1928?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Declaration of 'Poorna Swaraj' (Complete Independence) as the goal of the Congress under Jawaharlal Nehru's presidency",
    ["Acceptance of the Simon Commission recommendations", "Decision to merge the Congress with the Swaraj Party", "Adoption of Hindi in Roman script as official language"],
    "D",
    "1. The Lahore session of December 1929, presided over by Jawaharlal Nehru, passed the historic resolution declaring 'Poorna Swaraj' (Complete Independence) as the supreme goal.\nHence, Option {{CORR}} is correct.",
    "Identifies Poorna Swaraj resolution at Lahore Congress 1929."
)
add_q(make_question(CHAPTER, "Lahore Congress 1929", "What historic milestone was achieved at the Lahore Congress session in December 1929 under the presidency of young Jawaharlal Nehru?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "26 January 1930",
    ["15 August 1930", "2 October 1929", "13 April 1930"],
    "A",
    "1. At the Lahore Congress, it was resolved that 26 January 1930 would be observed nationwide as 'Poorna Swaraj Day' (Independence Day), with the unfurling of the national flag.\nHence, Option {{CORR}} is correct.",
    "Identifies 26 January 1930 as first Independence Day."
)
add_q(make_question(CHAPTER, "Poorna Swaraj Day", "On which historic date was 'Independence Day' celebrated across India for the first time in 1930 with public pledges of defiance against British rule?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "From Sabarmati Ashram to the coastal village of Dandi (12 March to 6 April 1930)",
    ["From Sevagram to Wardha", "From Champaran to Patna", "From Bardoli to Surat"],
    "B",
    "1. Gandhi began his 240-mile Salt March on 12 March 1930 from his ashram at Sabarmati with 78 chosen followers, reaching the coastal village of Dandi on 5 April and breaking the law on 6 April.\nHence, Option {{CORR}} is correct.",
    "Identifies route and dates of Dandi March."
)
add_q(make_question(CHAPTER, "Dandi March", "From where to where, and during which exact dates, did Mahatma Gandhi undertake his legendary 240-mile Salt March?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Salt was an indispensable everyday necessity used equally by all humans, and the government monopoly tax directly robbed the poorest families",
    ["Salt was the most expensive commodity traded on European stock exchanges", "Salt could be transformed directly into military gunpowder", "Salt manufacturing was monopolized exclusively by French merchants"],
    "C",
    "1. Gandhi chose salt because it touched every single household across caste, class, and religion, and the state monopoly tax symbolized the cruelest form of colonial exploitation.\nHence, Option {{CORR}} is correct.",
    "Explains why Gandhi chose salt as political symbol."
)
add_q(make_question(CHAPTER, "Salt as a Symbol", "Why did Mahatma Gandhi select the mundane mineral 'salt' as the brilliant focal point of the Civil Disobedience Movement?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Khan Abdul Ghaffar Khan (Badshah Khan)",
    ["Maulana Abul Kalam Azad", "Dr. M.A. Ansari", "Hakim Ajmal Khan"],
    "D",
    "1. Khan Abdul Ghaffar Khan (the 'Frontier Gandhi') organized the non-violent volunteer movement known as the Khudai Khidmatgars ('Servants of God' or Red Shirts) in the North-West Frontier Province.\nHence, Option {{CORR}} is correct.",
    "Identifies Khan Abdul Ghaffar Khan and Khudai Khidmatgars."
)
add_q(make_question(CHAPTER, "Frontier Gandhi", "Which towering Pashtun leader organized the non-violent volunteer corps called the 'Khudai Khidmatgars' (Red Shirts) in the North-West Frontier Province?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Garhwali soldiers of the Royal Garhwal Rifles commanded by Chandra Singh Garhwali",
    ["Sikh soldiers of the Punjab Regiment", "Gurkha riflemen from Kathmandu", "Madras sappers and miners"],
    "A",
    "1. In April 1930 at Peshawar, soldiers of the 2/18th Royal Garhwal Rifles led by Havildar Chandra Singh Garhwali refused orders to fire on unarmed Khudai Khidmatgar demonstrators.\nHence, Option {{CORR}} is correct.",
    "Identifies Garhwali soldiers refusing to fire in Peshawar."
)
add_q(make_question(CHAPTER, "Peshawar Heroism", "Which regiment of Indian soldiers made history in April 1930 by defying British orders to open fire on peaceful non-violent demonstrators in the bazaars of Peshawar?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Gandhi-Irwin Pact on 5 March 1931",
    ["Poona Pact in September 1932", "Lucknow Pact in December 1916", "Shimla Agreement in 1945"],
    "B",
    "1. On 5 March 1931, Mahatma Gandhi and Viceroy Lord Irwin signed the Gandhi-Irwin Pact, ending Civil Disobedience and securing the release of political prisoners.\nHence, Option {{CORR}} is correct.",
    "Identifies Gandhi-Irwin Pact on 5 March 1931."
)
add_q(make_question(CHAPTER, "Gandhi-Irwin Pact", "Which historic agreement signed on 5 March 1931 led to the temporary suspension of the Civil Disobedience Movement and cleared the way for Congress participation in the Second Round Table Conference?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Second Round Table Conference in London in late 1931",
    ["First Round Table Conference in 1930", "Third Round Table Conference in 1932", "Cripps Round Table in 1942"],
    "C",
    "1. Mahatma Gandhi attended only the Second Round Table Conference in London (September–December 1931) as the sole representative of the Indian National Congress.\nHence, Option {{CORR}} is correct.",
    "Identifies Gandhi attending only Second RTC in 1931."
)
add_q(make_question(CHAPTER, "Round Table Conferences", "At which Round Table Conference held in London did Mahatma Gandhi participate as the sole official delegate of the Indian National Congress?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Dr. B.R. Ambedkar and Lord Irwin",
    ["Jawaharlal Nehru and Subhas Chandra Bose", "Muhammad Ali Jinnah and Vallabhbhai Patel", "Mahatma Gandhi and Dr. B.R. Ambedkar"],
    "D",
    "1. Following Gandhi's fast unto death against the Communal Award in Yerwada Jail, the Poona Pact was signed in September 1932 between Mahatma Gandhi (represented by Madan Mohan Malaviya) and Dr. B.R. Ambedkar.\nHence, Option {{CORR}} is correct.",
    "Identifies Poona Pact signed between Gandhi and Ambedkar in 1932."
)
add_q(make_question(CHAPTER, "The Poona Pact", "Between which two prominent leaders was the historic Poona Pact concluded in September 1932, abandoning separate electorates for the Depressed Classes in exchange for reserved seats?", opts, corr, sol))

# --- 5. The 1937 Elections and World War II ---

opts, corr, sol = rotate_options(
    "Congress formed ministries in eight out of eleven provinces",
    ["Muslim League swept all Muslim seats across India", "The British Parliament suspended all provincial autonomy", "No party was able to win a majority in any province"],
    "A",
    "1. In the 1937 provincial elections held under the Government of India Act 1935, the Congress achieved a resounding victory, forming governments in 8 out of 11 provinces.\nHence, Option {{CORR}} is correct.",
    "Identifies Congress forming ministries in 8 provinces in 1937."
)
add_q(make_question(CHAPTER, "Provincial Elections 1937", "What was the political outcome of the 1937 provincial elections held under the Government of India Act of 1935 across British India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Resigned en masse in October–November 1939 because Britain dragged India into World War II without consulting the Indian people",
    ["Merged voluntarily with the Muslim League ministries", "Declared total military mobilization in support of the British war effort", "Dissolved the Indian National Congress permanently"],
    "B",
    "1. In October and November 1939, all Congress provincial ministries resigned in protest against Viceroy Linlithgow declaring India at war with Germany without consulting Indian representatives.\nHence, Option {{CORR}} is correct.",
    "Explains Congress ministries resigning in 1939 over WWII."
)
add_q(make_question(CHAPTER, "Outbreak of World War II", "Why did the elected Congress provincial ministries resign en masse in October and November 1939?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Lahore Resolution of March 1940 (the Pakistan Resolution)",
    ["Delhi Manifesto of 1938", "Karachi Charter of 1941", "Lucknow Declaration of 1937"],
    "C",
    "1. On 23 March 1940 at Lahore, the All-India Muslim League adopted the historic resolution demanding autonomous and sovereign states for Muslims in the north-western and eastern zones of India.\nHence, Option {{CORR}} is correct.",
    "Identifies Lahore Resolution of March 1940."
)
add_q(make_question(CHAPTER, "The Pakistan Resolution", "Which momentous resolution demanding 'Independent States' comprising autonomous and sovereign Muslim-majority zones was passed by the Muslim League in March 1940?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A post-dated cheque on a crashing bank",
    ["A charter of genuine liberty", "A monumental step toward federal democracy", "A comprehensive treaty of economic liberation"],
    "D",
    "1. Mahatma Gandhi famously dismissed Sir Stafford Cripps's conditional offer of post-war Dominion status in March 1942 as 'a post-dated cheque on a crashing bank'.\nHence, Option {{CORR}} is correct.",
    "Identifies Gandhi's quote on Cripps offer."
)
add_q(make_question(CHAPTER, "The Cripps Mission", "How did Mahatma Gandhi famously describe the proposals offered by Sir Stafford Cripps in March 1942, which promised conditional post-war Dominion status?", opts, corr, sol))

# --- 6. The Quit India Movement (1942) ---

opts, corr, sol = rotate_options(
    "Gowalia Tank Maidan in Bombay on 8 August 1942",
    ["Sabarmati Ashram in Ahmedabad", "Ramgarh Congress grounds in Bihar", "Red Fort in Delhi"],
    "A",
    "1. The All-India Congress Committee met at Gowalia Tank Maidan (August Kranti Maidan) in Bombay on 8 August 1942, ratifying the historic Quit India Resolution.\nHence, Option {{CORR}} is correct.",
    "Identifies Gowalia Tank Maidan on 8 August 1942."
)
add_q(make_question(CHAPTER, "Quit India Movement", "At which venue in Bombay was the momentous 'Quit India Resolution' adopted by the All-India Congress Committee on 8 August 1942?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "'Do or Die' (Karo ya Maro)",
    ["'Inquilab Zindabad'", "'Jai Hind'", "'Swaraj is my birthright'"],
    "B",
    "1. In his stirring speech on 8 August 1942, Gandhi gave the nation the immortal mantra: 'Do or Die. We shall either free India or die in the attempt.'\nHence, Option {{CORR}} is correct.",
    "Identifies Gandhi's mantra Do or Die."
)
add_q(make_question(CHAPTER, "Quit India Slogan", "What historic clarion call and mantra did Mahatma Gandhi deliver to the nation on the eve of launching the Quit India Movement?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Arrested all top Congress leaders including Gandhi, Nehru, and Patel in pre-dawn raids on 9 August 1942 and declared the Congress illegal",
    ["Invited Gandhi to London for unconditional surrender negotiations", "Dissolved the British Indian Army and evacuated Calcutta", "Immediately conceded immediate full independence to India"],
    "C",
    "1. In the early morning of 9 August 1942, the colonial government arrested Mahatma Gandhi and the entire Congress Working Committee, banning the organization.\nHence, Option {{CORR}} is correct.",
    "Describes British pre-dawn arrest of leadership on 9 August 1942."
)
add_q(make_question(CHAPTER, "Colonial Crackdown", "What swift counter-measure did the British colonial government execute in the early hours of 9 August 1942 to crush the Quit India Movement in its cradle?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Jayaprakash Narayan, Ram Manohar Lohia, and Aruna Asaf Ali",
    ["Gopal Krishna Gokhale and Pherozeshah Mehta", "Dadabhai Naoroji and Surendranath Banerjee", "Motilal Nehru and C.R. Das"],
    "D",
    "1. Following the arrest of senior leaders, young Socialist leaders like Jayaprakash Narayan, Ram Manohar Lohia, and Aruna Asaf Ali organized an extensive underground resistance.\nHence, Option {{CORR}} is correct.",
    "Identifies underground leaders of Quit India."
)
add_q(make_question(CHAPTER, "Underground Resistance", "Which group of young socialist leaders went underground in 1942 to coordinate guerrilla networks and sabotage communication lines across India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Usha Mehta",
    ["Sucheta Kripalani", "Sarojini Naidu", "Kamaladevi Chattopadhyay"],
    "A",
    "1. Usha Mehta and her associates set up a clandestine underground 'Congress Radio' station in Bombay, broadcasting uncensored news until she was betrayed and arrested.\nHence, Option {{CORR}} is correct.",
    "Identifies Usha Mehta operating underground Congress Radio."
)
add_q(make_question(CHAPTER, "Underground Congress Radio", "Which courageous young freedom fighter operated a clandestine, mobile underground radio transmitter from secret locations in Bombay during the Quit India Movement?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Prati Sarkar in Satara (Maharashtra) and Jatiya Sarkar in Midnapore (Bengal)",
    ["Swaraj Council in Madras and Commune in Delhi", "Kisan Sabha in Punjab and Parishad in Assam", "Janata Raj in Kashmir and Sangha in Mysore"],
    "B",
    "1. During 1942, parallel governments ('prati sarkars') were established by rebels in Satara (led by Nana Patil), Midnapore (Tamluk Jatiya Sarkar), and Ballia (under Chittu Pandey).\nHence, Option {{CORR}} is correct.",
    "Identifies parallel governments in Satara and Midnapore."
)
add_q(make_question(CHAPTER, "Parallel Governments of 1942", "In which regions did patriotic rebels overthrow British administration and establish celebrated parallel governments (such as the Prati Sarkar and Jatiya Sarkar)?", opts, corr, sol))

# --- 7. Subhas Chandra Bose and the INA ---

opts, corr, sol = rotate_options(
    "Formed the Azad Hind Fauj (Indian National Army) in Southeast Asia to liberate India with Japanese assistance",
    ["Sailed to South Africa to reorganize the Natal Indian Congress", "Became the President of the British Fabian Society", "Established a diplomatic embassy in Washington D.C."],
    "C",
    "1. Subhas Chandra Bose made a dramatic escape from house arrest in 1941, travelled to Germany and Japan, and took command of the Indian National Army (Azad Hind Fauj) in Singapore in 1943.\nHence, Option {{CORR}} is correct.",
    "Identifies Subhas Chandra Bose leading Azad Hind Fauj."
)
add_q(make_question(CHAPTER, "Subhas Chandra Bose", "What historic revolutionary endeavor did Netaji Subhas Chandra Bose undertake after escaping from colonial house arrest in Calcutta in 1941?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Captain Lakshmi Sahgal",
    ["Captain Aruna Asaf Ali", "Captain Sarojini Naidu", "Captain Pritilata Waddedar"],
    "D",
    "1. Netaji Subhas Chandra Bose created an all-woman combat regiment named the Rani of Jhansi Regiment within the INA, placed under the command of Captain Lakshmi Sahgal (Swaminathan).\nHence, Option {{CORR}} is correct.",
    "Identifies Captain Lakshmi Sahgal commanding Rani of Jhansi Regiment."
)
add_q(make_question(CHAPTER, "Rani of Jhansi Regiment", "Who was appointed as the commanding officer of the renowned all-female combat unit, the Rani of Jhansi Regiment, formed by Netaji in the Indian National Army?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "'Dilli Chalo' (On to Delhi) and 'Jai Hind'",
    ["'Satyameva Jayate'", "'Do or Die'", "'Vande Mataram' alone"],
    "A",
    "1. Netaji Subhas Chandra Bose inspired his soldiers with the stirring battle cry 'Dilli Chalo' (March to Delhi) and gave India the national salutation 'Jai Hind'.\nHence, Option {{CORR}} is correct.",
    "Identifies Netaji's slogans Dilli Chalo and Jai Hind."
)
add_q(make_question(CHAPTER, "INA Slogans", "Which iconic battle cry and patriotic national greeting were coined and popularized by Netaji Subhas Chandra Bose to inspire the INA troops?", opts, corr, sol))

# --- 8. The Cabinet Mission, Partition, and Independence ---

opts, corr, sol = rotate_options(
    "Lord Pethick-Lawrence, Sir Stafford Cripps, and A.V. Alexander",
    ["Lord Mountbatten, Sir Cyril Radcliffe, and General Auchinleck", "Lord Wavell, Winston Churchill, and Clement Attlee", "Lord Linlithgow, Sir John Simon, and Lord Irwin"],
    "B",
    "1. The British Cabinet Mission sent to India in March 1946 consisted of three British Cabinet ministers: Lord Pethick-Lawrence, Sir Stafford Cripps, and A.V. Alexander.\nHence, Option {{CORR}} is correct.",
    "Identifies members of Cabinet Mission 1946."
)
add_q(make_question(CHAPTER, "The Cabinet Mission 1946", "Which three British Cabinet ministers composed the high-powered Cabinet Mission sent to India in March 1946 to negotiate the transfer of power?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A loose three-tier federation with a weak Centre and provinces grouped into three distinct sections (A, B, and C)",
    ["Immediate partition into three independent republics", "Unitary state with all powers concentrated in New Delhi", "Continuation of British military rule for twenty more years"],
    "C",
    "1. The Cabinet Mission proposed a 3-tier federal system with a weak central government handling only defense, foreign affairs, and communications, and provincial groups divided into Sections A, B, and C.\nHence, Option {{CORR}} is correct.",
    "Describes Cabinet Mission 3-tier federation proposal."
)
add_q(make_question(CHAPTER, "Cabinet Mission Plan", "What constitutional architecture did the Cabinet Mission Plan propose in May 1946 to preserve the unity of India while accommodating minority concerns?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Direct Action Day on 16 August 1946",
    ["Deliverance Day on 22 December 1939", "Quit India Day on 9 August 1942", "Poorna Swaraj Day on 26 January 1930"],
    "D",
    "1. Frustrated by political stalemates, the Muslim League proclaimed 16 August 1946 as 'Direct Action Day' to achieve Pakistan, which ignited catastrophic communal riots in Calcutta.\nHence, Option {{CORR}} is correct.",
    "Identifies Direct Action Day on 16 August 1946."
)
add_q(make_question(CHAPTER, "Direct Action Day", "What action did the Muslim League call for on 16 August 1946 to press its demand for Pakistan, triggering the horrific 'Great Calcutta Killings'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Lord Louis Mountbatten on 3 June 1947",
    ["Lord Wavell on 20 February 1947", "Clement Attlee on 15 August 1946", "Sir Cyril Radcliffe on 14 July 1947"],
    "A",
    "1. On 3 June 1947, Viceroy Lord Mountbatten announced the formal partition plan setting the terms for the division of British India into India and Pakistan.\nHence, Option {{CORR}} is correct.",
    "Identifies Mountbatten Plan on 3 June 1947."
)
add_q(make_question(CHAPTER, "The Mountbatten Plan", "Which Viceroy presented the historic 3 June 1947 Plan that laid down the formal blueprint for the partition and independence of India and Pakistan?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "In Calcutta and rural Noakhali, fasting and walking barefoot through riot-torn villages to restore communal peace",
    ["Attending the independence ceremony at the Red Fort in New Delhi", "Addressing the United Nations General Assembly in New York", "Drafting the text of the Indian Constitution in Parliament"],
    "B",
    "1. On 15 August 1947, Gandhi did not participate in festivities in Delhi; he was in Calcutta and Noakhali, fasting and praying to douse communal violence.\nHence, Option {{CORR}} is correct.",
    "Explains Gandhi's presence in Calcutta/Noakhali on Independence Day."
)
add_q(make_question(CHAPTER, "Gandhi on 15 August 1947", "Where was Mahatma Gandhi on 15 August 1947, the historic day of Indian independence, and what mission was he engaged in?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "One-man Boundary Army",
    ["Father of the Nation", "The Great Soul of India", "Commander of Peace"],
    "C",
    "1. Lord Mountbatten famously paid tribute to Gandhi's moral authority in quelling communal riots in Bengal by describing him as a 'one-man boundary army' who kept peace where 50,000 soldiers failed in Punjab.\nHence, Option {{CORR}} is correct.",
    "Identifies Mountbatten's phrase One-man Boundary Army."
)
add_q(make_question(CHAPTER, "Tribute to Gandhi", "What remarkable military metaphor did Viceroy Lord Mountbatten use to describe Gandhi's heroic success in dousing communal riots in Bengal?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Nathuram Godse on 30 January 1948 at Birla House, New Delhi",
    ["A colonial police officer in Calcutta", "An underground assassin in Bombay", "A radical mercenary in Pune"],
    "D",
    "1. On 30 January 1948, Mahatma Gandhi was assassinated during his evening prayer meeting at Birla House in New Delhi by Nathuram Godse.\nHence, Option {{CORR}} is correct.",
    "Identifies assassination of Gandhi on 30 January 1948."
)
add_q(make_question(CHAPTER, "Martyrdom of Mahatma Gandhi", "By whom, and on which tragic date at Birla House in New Delhi, was Mahatma Gandhi assassinated during his evening prayer assembly?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "'The light has gone out of our lives, and there is darkness everywhere'",
    ["'A new era of socialist revolution has begun'", "'We must now take immediate revenge upon our enemies'", "'The struggle for freedom has finally concluded'"],
    "A",
    "1. In his emotional radio broadcast to the stunned nation on 30 January 1948, Prime Minister Jawaharlal Nehru uttered the immortal words: 'The light has gone out of our lives...'\nHence, Option {{CORR}} is correct.",
    "Identifies Nehru's broadcast after Gandhi's assassination."
)
add_q(make_question(CHAPTER, "Nehru's Eulogy", "With which unforgettable words did Prime Minister Jawaharlal Nehru announce Mahatma Gandhi's assassination to the grief-stricken nation on All India Radio?", opts, corr, sol))

# --- 9. Statement & Assertion Questions ---

add_q(make_statement_question(
    CHAPTER, "Gandhi's Mass Appeal",
    "Mahatma Gandhi transformed the Indian National Congress from an elite, English-speaking debating club into a mass political organization.",
    "Gandhi adopted the dress of ordinary poor peasants (the loincloth and charkha) to demonstrate his deep identification with the poorest Indian masses.",
    1,
    "A",
    "1. Statement I is correct: Under Gandhi's leadership, peasants, workers, and women joined Congress by millions.\n2. Statement II is correct: He discarded western suits for homespun khadi and loincloth in 1921 to identify with the poor.\nHence, Both Statement I and Statement II are correct.",
    "Analyzes Gandhi's transformation of Congress into a mass movement."
))

add_q(make_statement_question(
    CHAPTER, "Constructive Programme",
    "Alongside political agitations, Mahatma Gandhi consistently emphasized his 'Constructive Programme' including Hindu-Muslim unity, abolition of untouchability, and promotion of Khadi.",
    "Gandhi considered political Swaraj completely meaningless unless social inequalities and caste untouchability were simultaneously eradicated from Indian society.",
    1,
    "A",
    "1. Statement I is correct: Gandhi devoted years between agitations to constructive work.\n2. Statement II is correct: For Gandhi, true Swaraj required moral transformation and eradication of social oppression.\nHence, Both Statement I and Statement II are correct.",
    "Assesses Gandhi's Constructive Programme."
))

add_q(make_assertion_question(
    CHAPTER, "Salt March Success",
    "The Salt March of 1930 drew global media attention to the Indian independence struggle, particularly through American journalists like Webb Miller.",
    "The Salt March demonstrated that British imperial law could be broken openly and non-violently without fear by thousands of ordinary Indian citizens.",
    1,
    "A",
    "1. Assertion (A) is true: International press covered the march and subsequent brutal police beatings at Dharasana.\n2. Reason (R) is true: The psychological barrier of fear against British colonial authority was permanently broken.\n3. Reason (R) directly explains Assertion (A).",
    "Explains the global impact and psychological victory of the Salt Satyagraha."
))

add_q(make_assertion_question(
    CHAPTER, "Popular Character of 1942 Movement",
    "The Quit India Movement of 1942 was the most widespread and militant popular rebellion witnessed in India since 1857.",
    "Despite the absence of recognized senior leaders, ordinary students, peasants, and workers took charge and organized mass strikes, sabotaged rail lines, and set up parallel governments.",
    1,
    "A",
    "1. Assertion (A) is true: Over 90,000 people were arrested and hundreds of government buildings attacked.\n2. Reason (R) is true: Grassroots spontaneity replaced formal centralized leadership following the immediate arrest of the Working Committee.\n3. Reason (R) directly explains Assertion (A).",
    "Explains the decentralized, militant nature of the Quit India uprising."
))

# --- 10. Match and Sequence Questions ---

add_q(make_match_question(
    CHAPTER, "Landmark Satyagrahas",
    "Match the early Gandhian campaign in List I with its primary objective in List II:",
    [
        ("A", "Champaran (1917)"),
        ("B", "Ahmedabad (1918)"),
        ("C", "Kheda (1918)"),
        ("D", "Rowlatt Satyagraha (1919)")
    ],
    [
        ("i", "Cotton mill workers' wage hike and plague bonus dispute"),
        ("ii", "Protest against indigo planters and the Tinkathia system"),
        ("iii", "Opposition to detention without trial under draconian laws"),
        ("iv", "Remission of peasant land revenue due to crop failure")
    ],
    "A-ii, B-i, C-iv, D-iii",
    "C",
    "1. Champaran = Indigo planters (A-ii), Ahmedabad = Mill workers (B-i), Kheda = Revenue remission (C-iv), Rowlatt = Detention without trial (D-iii).",
    "Matches early Gandhian movements with core issues."
))

add_q(make_match_question(
    CHAPTER, "Prominent Freedom Fighters",
    "Match the prominent nationalist leader in List I with their role or identity in List II:",
    [
        ("A", "Khan Abdul Ghaffar Khan"),
        ("B", "Usha Mehta"),
        ("C", "Subhas Chandra Bose"),
        ("D", "C. Rajagopalachari")
    ],
    [
        ("i", "Operated clandestine underground Congress Radio in 1942"),
        ("ii", "Led the Khudai Khidmatgars in the Frontier Province"),
        ("iii", "Led the Salt March to Vedaranyam on the Coromandel coast"),
        ("iv", "Supreme Commander of the Indian National Army (Azad Hind Fauj)")
    ],
    "A-ii, B-i, C-iv, D-iii",
    "D",
    "1. Khan Abdul Ghaffar Khan = Frontier leader (A-ii), Usha Mehta = Secret radio (B-i), Subhas Chandra Bose = INA (C-iv), C. Rajagopalachari = Vedaranyam salt march (D-iii).",
    "Matches nationalist leaders with historic roles."
))

add_q(make_sequence_question(
    CHAPTER, "Major Mass Movements Chronology",
    "Arrange the following mass movements led by Mahatma Gandhi in chronological order:\nI. Non-Cooperation and Khilafat Movement\nII. Civil Disobedience Movement (Salt Satyagraha)\nIII. Champaran Satyagraha\nIV. Quit India Movement",
    [
        ("A", "III"),
        ("B", "I"),
        ("C", "II"),
        ("D", "IV")
    ],
    "A, B, C, D",
    "A",
    "1. Chronology: Champaran (1917) -> Non-Cooperation (1920–22) -> Civil Disobedience (1930) -> Quit India (1942).",
    "Orders the major Gandhian movements chronologically."
))

add_q(make_sequence_question(
    CHAPTER, "Key Events in 1930–1932",
    "Arrange the following events of the Civil Disobedience era in correct chronological sequence:\nI. Mahatma Gandhi launches the Salt March from Sabarmati to Dandi\nII. Signing of the Gandhi-Irwin Pact\nIII. Mahatma Gandhi attends the Second Round Table Conference in London\nIV. Signing of the Poona Pact between Gandhi and Ambedkar",
    [
        ("A", "I"),
        ("B", "II"),
        ("C", "III"),
        ("D", "IV")
    ],
    "A, B, C, D",
    "A",
    "1. Chronology: Salt March (March-April 1930) -> Gandhi-Irwin Pact (March 1931) -> Second RTC (Autumn 1931) -> Poona Pact (September 1932).",
    "Orders landmark events of 1930–1932 chronologically."
))

add_q(make_sequence_question(
    CHAPTER, "Towards Independence (1940–1947)",
    "Arrange the following political milestones on the road to Indian independence in chronological order:\nI. Lahore Resolution of the Muslim League\nII. Cripps Mission arrives in India\nIII. Launch of the Quit India Movement\nIV. Mountbatten Plan announced",
    [
        ("A", "I"),
        ("B", "II"),
        ("C", "III"),
        ("D", "IV")
    ],
    "A, B, C, D",
    "A",
    "1. Chronology: Lahore Resolution (March 1940) -> Cripps Mission (March 1942) -> Quit India Movement (August 1942) -> Mountbatten Plan (June 1947).",
    "Orders events leading to independence."
))

opts, corr, sol = rotate_options(
    "Baba Ramchandra",
    ["Sahajanand Saraswati", "Swami Pranavananda", "Madari Pasi"],
    "A",
    "1. In Awadh, peasant grievances against oppressive taluqdars were mobilized by Baba Ramchandra, a sanyasi who had earlier been an indentured labourer in Fiji.\nHence, Option {{CORR}} is correct.",
    "Identifies Baba Ramchandra leading Awadh Kisan movement."
)
add_q(make_question(CHAPTER, "Awadh Peasant Movement", "Which sanyasi, who had returned to India after serving as an indentured labourer in Fiji, organized the peasants of Awadh against taluqdars in 1920?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Alluri Sitarama Raju",
    ["Komaram Bheem", "Birsa Munda", "Tanu Nayak"],
    "B",
    "1. In the Gudem hills of Andhra Pradesh, Alluri Sitarama Raju led a militant guerrilla rebellion against colonial forest laws, claiming supernatural bullet-proof powers while praising Gandhi.\nHence, Option {{CORR}} is correct.",
    "Identifies Alluri Sitarama Raju in Gudem hills."
)
add_q(make_question(CHAPTER, "Tribal Guerrilla Warfare", "Which legendary tribal leader led an armed guerrilla revolt against British forest reservations in the Gudem hills of Andhra Pradesh during the Non-Cooperation era?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "C.R. Das and Motilal Nehru in January 1923",
    ["Jawaharlal Nehru and Subhas Chandra Bose", "Sardar Patel and Rajendra Prasad", "C. Rajagopalachari and M.A. Ansari"],
    "C",
    "1. Following the suspension of Non-Cooperation, Chittaranjan Das and Motilal Nehru founded the Swaraj Party in January 1923 to contest legislative council elections and wreck colonial reforms from within.\nHence, Option {{CORR}} is correct.",
    "Identifies C.R. Das and Motilal Nehru founding Swaraj Party."
)
add_q(make_question(CHAPTER, "The Swaraj Party", "Which two prominent Congress leaders formed the Swaraj Party in January 1923 to enter legislative councils and obstruct colonial governance from within?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Vallabhbhai Patel, earning him the affectionate title 'Sardar' from the peasant women",
    ["Mahatma Gandhi", "Morarji Desai", "K.M. Munshi"],
    "D",
    "1. Vallabhbhai Patel led the successful no-tax campaign in Bardoli (Gujarat) in 1928 against a 22% land revenue hike, earning the title 'Sardar' (Leader).\nHence, Option {{CORR}} is correct.",
    "Identifies Vallabhbhai Patel leading Bardoli Satyagraha."
)
add_q(make_question(CHAPTER, "Bardoli Satyagraha 1928", "Which leader successfully organized the legendary Bardoli peasant satyagraha in 1928 against a 22 percent land revenue enhancement, earning the enduring title 'Sardar'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "C. Rajagopalachari",
    ["K. Kamaraj", "S. Satyamurti", "Periyar E.V. Ramasamy"],
    "A",
    "1. In Tamil Nadu, C. Rajagopalachari led the historic Salt March from Tiruchirappalli to the coastal village of Vedaranyam on the Tanjore coast in April 1930.\nHence, Option {{CORR}} is correct.",
    "Identifies C. Rajagopalachari leading Vedaranyam March."
)
add_q(make_question(CHAPTER, "Vedaranyam Salt March", "Which prominent nationalist leader led the Salt Satyagraha march from Tiruchirappalli to Vedaranyam on the Coromandel coast in April 1930?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "K. Kelappan (the 'Kerala Gandhi')",
    ["A.K. Gopalan", "E.M.S. Namboodiripad", "P. Krishna Pillai"],
    "B",
    "1. In Malabar, K. Kelappan, popularly honored as the 'Kerala Gandhi', led the Salt March from Calicut to Payyanur in April 1930.\nHence, Option {{CORR}} is correct.",
    "Identifies K. Kelappan leading Payyanur Salt March."
)
add_q(make_question(CHAPTER, "Payyanur Salt March", "Which revered leader, popularly known as the 'Kerala Gandhi', organized and led the Salt Satyagraha march from Calicut to Payyanur in 1930?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sarojini Naidu, Imam Saheb, and Manilal Gandhi",
    ["Jawaharlal Nehru and Khan Abdul Ghaffar Khan", "Vallabhbhai Patel and Rajendra Prasad", "Subhas Chandra Bose and J.M. Sengupta"],
    "C",
    "1. On 21 May 1930, Sarojini Naidu, Imam Saheb, and Gandhi's son Manilal led over 2,000 peaceful volunteers in a non-violent raid on the salt depots at Dharasana, facing brutal steel-tipped lathis.\nHence, Option {{CORR}} is correct.",
    "Identifies leaders of Dharasana Salt Raid."
)
add_q(make_question(CHAPTER, "Dharasana Salt Raid", "Who among the following led the dramatic, non-violent raid on the government Dharasana Salt Works on 21 May 1930 after Mahatma Gandhi's arrest?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Webb Miller",
    ["Louis Fischer", "Edgar Snow", "William Shirer"],
    "D",
    "1. American United Press foreign correspondent Webb Miller witnessed and reported the horrific, unresisting beating of non-violent satyagrahis at Dharasana, causing global indignation.\nHence, Option {{CORR}} is correct.",
    "Identifies Webb Miller reporting Dharasana beatings."
)
add_q(make_question(CHAPTER, "International Journalism", "Which American journalist provided gripping eyewitness dispatches describing the heroic discipline and police brutality at the Dharasana Salt Works in May 1930?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Kamaladevi Chattopadhyay",
    ["Sarojini Naidu", "Ansuya Sarabhai", "Annie Besant"],
    "A",
    "1. Socialist feminist leader Kamaladevi Chattopadhyay met Gandhi and successfully persuaded him not to restrict the Salt Satyagraha to men, paving the way for mass female participation.\nHence, Option {{CORR}} is correct.",
    "Identifies Kamaladevi Chattopadhyay persuading Gandhi to include women."
)
add_q(make_question(CHAPTER, "Women in Salt Satyagraha", "Which prominent woman nationalist and socialist leader persuaded Mahatma Gandhi not to restrict the Salt Satyagraha exclusively to male volunteers?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "British Prime Minister Ramsay MacDonald in August 1932",
    ["Winston Churchill in 1940", "Lord Irwin in 1931", "Clement Attlee in 1946"],
    "B",
    "1. The controversial 'Communal Award' was announced by British Prime Minister Ramsay MacDonald on 16 August 1932, providing separate electorates for Depressed Classes.\nHence, Option {{CORR}} is correct.",
    "Identifies Ramsay MacDonald announcing Communal Award."
)
add_q(make_question(CHAPTER, "The Communal Award", "Which British Prime Minister announced the Communal Award in August 1932, granting separate electorates to the Depressed Classes (Dalits)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Harijan Sevak Sangh in 1932",
    ["All-India Depressed Classes League", "Bahishkrit Hitakarini Sabha", "Servants of India Society"],
    "C",
    "1. Following the Poona Pact in late 1932, Mahatma Gandhi founded the All-India Anti-Untouchability League, later renamed the 'Harijan Sevak Sangh', and launched the weekly paper *Harijan*.\nHence, Option {{CORR}} is correct.",
    "Identifies Harijan Sevak Sangh founded by Gandhi in 1932."
)
add_q(make_question(CHAPTER, "Anti-Untouchability Campaign", "What nation-wide organization was founded by Mahatma Gandhi in 1932 to combat caste discrimination and promote the upliftment of Dalits?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Acharya Vinoba Bhave as the first satyagrahi, followed by Jawaharlal Nehru as the second",
    ["Sardar Patel as first and Rajendra Prasad as second", "Subhas Chandra Bose as first and C.R. Das as second", "Maulana Azad as first and Sarojini Naidu as second"],
    "D",
    "1. In October 1940, Gandhi launched Individual Satyagraha to affirm the democratic right to preach against war, selecting Acharya Vinoba Bhave as the first satyagrahi and Jawaharlal Nehru as second.\nHence, Option {{CORR}} is correct.",
    "Identifies Vinoba Bhave and Nehru in Individual Satyagraha."
)
add_q(make_question(CHAPTER, "Individual Satyagraha 1940", "Who were selected by Mahatma Gandhi as the first and second individual satyagrahis respectively to protest against British war policies in October 1940?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Muhammad Ali Jinnah insisted that the Muslim League possessed the sole and exclusive monopoly to nominate all Muslim members",
    ["Congress refused to recognize the authority of the British Viceroy", "The Princely States demanded 75 percent representation in the Council", "The British Parliament vetoed the conference proposals"],
    "A",
    "1. The Simla Conference of June–July 1945 broke down because Jinnah claimed the exclusive right for the Muslim League to nominate all Muslim members, which Congress rejected.\nHence, Option {{CORR}} is correct.",
    "Explains deadlock at Simla Conference 1945."
)
add_q(make_question(CHAPTER, "The Simla Conference 1945", "Why did the Simla Conference convened by Viceroy Lord Wavell in June 1945 ultimately collapse without reaching an agreement?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ratings of HMIS Talwar in Bombay in February 1946",
    ["Infantrymen of the Madras Regiment in 1945", "Pilots of the Royal Indian Air Force in Lahore", "Artillerymen at Fort William in Calcutta"],
    "B",
    "1. On 18 February 1946, Indian ratings aboard the signal training ship HMIS Talwar mutinied in Bombay against racial discrimination, substandard food, and the trial of INA officers.\nHence, Option {{CORR}} is correct.",
    "Identifies RIN Mutiny on HMIS Talwar in February 1946."
)
add_q(make_question(CHAPTER, "The RIN Mutiny 1946", "Which dramatic military revolt by naval ratings broke out in Bombay in February 1946, shaking the foundational confidence of the British in their armed forces?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sir Cyril Radcliffe",
    ["Sir Stafford Cripps", "Lord Pethick-Lawrence", "Sir John Simon"],
    "C",
    "1. British lawyer Sir Cyril Radcliffe was appointed Chairman of the two Boundary Commissions tasked with drawing the international borders dividing Punjab and Bengal in 1947.\nHence, Option {{CORR}} is correct.",
    "Identifies Sir Cyril Radcliffe drawing boundary line."
)
add_q(make_question(CHAPTER, "The Radcliffe Line", "Which British lawyer, who had never visited India before, was appointed Chairman of the Boundary Commissions to draw the partition border between India and Pakistan?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Day of Deliverance (22 December 1939)",
    ["Direct Action Day", "Martyrs' Day", "Pakistan Day"],
    "D",
    "1. On 22 December 1939, the Muslim League observed a nationwide 'Day of Deliverance' to celebrate the mass resignation of Congress provincial ministries.\nHence, Option {{CORR}} is correct.",
    "Identifies Day of Deliverance on 22 December 1939."
)
add_q(make_question(CHAPTER, "Muslim League Politics", "What special commemorative occasion was observed by the Muslim League on 22 December 1939 to celebrate the resignation of Congress provincial ministries?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Hind Swaraj (composed in 1909 on board the ship SS Kildonan Castle)",
    ["My Experiments with Truth", "Constructive Programme", "Satyagraha in South Africa"],
    "A",
    "1. In 1909, while travelling from London to South Africa, Gandhi wrote his foundational philosophical treatise 'Hind Swaraj' (Indian Home Rule) in Gujarati, critiquing modern industrial civilization.\nHence, Option {{CORR}} is correct.",
    "Identifies Hind Swaraj written in 1909."
)
add_q(make_question(CHAPTER, "Gandhian Philosophy", "In which seminal 1909 philosophical text, written in the form of a dialogue between Reader and Editor, did Gandhi formulate his comprehensive critique of modern western civilization?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Satyagraha is soul-force and weapon of the morally strong that renounces all violence and ill-will, whereas passive resistance can be used as an expedient by the weak",
    ["Satyagraha involves guerrilla warfare, while passive resistance uses elections", "Satyagraha accepts foreign funding, while passive resistance rejects it", "Satyagraha is practiced only by monks, while passive resistance is for workers"],
    "B",
    "1. Gandhi distinguished Satyagraha from passive resistance: Satyagraha is soul-force rooted in absolute truth and non-violence without rancour, while passive resistance may harbor hatred and permit violence if convenient.\nHence, Option {{CORR}} is correct.",
    "Distinguishes Satyagraha from passive resistance."
)
add_q(make_question(CHAPTER, "The Concept of Satyagraha", "How did Mahatma Gandhi fundamentally distinguish his philosophy of 'Satyagraha' from conventional western concepts of 'Passive Resistance'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Indian Opinion (South Africa), Young India and Navajivan (India), and Harijan",
    ["The Hindu, Amrita Bazar Patrika, and Kesari", "Al-Hilal, Comrade, and Zamindar", "The Tribune, National Herald, and Dawn"],
    "C",
    "1. Gandhi edited and utilized influential weekly newspapers throughout his public life: Indian Opinion in South Africa, Young India and Navajivan from 1919, and Harijan from 1933.\nHence, Option {{CORR}} is correct.",
    "Identifies Gandhi's newspapers."
)
add_q(make_question(CHAPTER, "Gandhian Journalism", "Which group of influential weekly periodicals was edited and published directly by Mahatma Gandhi to articulate his political and social philosophy?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Abolition of the salt tax and state monopoly, 50 percent cut in land revenue, and 50 percent reduction in military spending",
    ["Immediate dissolution of the Indian army and total refusal of all trade", "Compulsory vegetarianism enforced by imperial legislation", "Relocation of the Viceroy's lodge to Sabarmati Ashram"],
    "D",
    "1. In January 1930, Gandhi presented an 11-point ultimatum to Lord Irwin, demanding abolition of the salt tax, 50% cut in land revenue, reduction of military expenditure, and protective tariffs.\nHence, Option {{CORR}} is correct.",
    "Lists key points of Gandhi's 11 Demands."
)
add_q(make_question(CHAPTER, "The Eleven Demands 1930", "What major administrative and fiscal reforms were included in Mahatma Gandhi's famous 'Eleven Demands' presented to Viceroy Lord Irwin prior to the Salt March?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Satyagraha Ashram at Sabarmati (1915) and Sevagram Ashram near Wardha (1936)",
    ["Tolstoy Farm and Phoenix Settlement in South Africa", "Shantiniketan and Sriniketan in Bengal", "Auroville and Sri Aurobindo Ashram in Pondicherry"],
    "A",
    "1. After returning to India, Gandhi founded the Satyagraha Ashram on the banks of the Sabarmati in Ahmedabad (1915) and later established Sevagram Ashram near Wardha (1936).\nHence, Option {{CORR}} is correct.",
    "Identifies Sabarmati and Sevagram ashrams in India."
)
add_q(make_question(CHAPTER, "Gandhian Ashrams", "Which two celebrated spiritual and communal ashrams were founded by Mahatma Gandhi in India as living laboratories for his Constructive Programme?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Spiritual purity, economic self-reliance, and universal solidarity with impoverished rural spinners",
    ["The imperial industrial supremacy of British cotton mills", "A temporary commercial marketing trademark", "An exclusive costume reserved for Hindu priests"],
    "B",
    "1. For Gandhi, Khadi (homespun cloth) symbolized economic liberation from foreign mill cloth, self-reliance (swadeshi), and spiritual solidarity with India's impoverished rural millions.\nHence, Option {{CORR}} is correct.",
    "Explains symbolic significance of Khadi."
)
add_q(make_question(CHAPTER, "Symbolism of Khadi", "What profound socio-economic and spiritual meaning did Mahatma Gandhi invest in 'Khadi' and the manual spinning wheel (charkha)?", opts, corr, sol))

# Verification of Unit 11
print(f"Total questions generated for Unit 11: {len(questions)}")
questions = questions[:80]
for idx, q in enumerate(questions):
    q["questionNumber"] = idx + 1
assert len(questions) == 80, f"Expected 80 questions, got {len(questions)}"

out_path = "mock/history_units/unit11.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved 80 questions to {out_path}!")
