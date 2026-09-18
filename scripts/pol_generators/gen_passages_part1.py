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

print(f"Loaded {len(global_seen)} questions from Units 1-15 into global_seen.")

passages_part1 = []
seen_part1 = set()

def add_p(q):
    norm = normalize_text(q["questionText"])
    if norm in seen_part1:
        raise ValueError(f"Duplicate within passages part 1: {q['questionText'][:80]}")
    if norm in global_seen:
        raise ValueError(f"Cross-mock duplicate: {q['questionText'][:80]}")
    if norm in pyq_seen:
        raise ValueError(f"PYQ duplicate: {q['questionText'][:80]}")
    seen_part1.add(norm)
    global_seen.add(norm)
    assert len(q["options"]) == 4
    assert q["correctOption"] in ["A", "B", "C", "D"]
    assert any(opt["id"] == q["correctOption"] and opt["isCorrect"] for opt in q["options"])
    assert q["detailedSolution"]
    passages_part1.append(q)

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
# PASSAGE 1: The Fall of the Berlin Wall and the Collapse of Bipolarity
# =================================================================================================
P1_TEXT = (
    "The Berlin Wall, which had been built in 1961 to separate East Berlin from West Berlin, was more than just a physical barrier; "
    "it was the ultimate symbol of the Cold War and the division between the capitalist West and the communist Eastern bloc. "
    "For nearly three decades, it stood as an immovable monument to ideological confrontation. However, on 9 November 1989, "
    "ordinary citizens of East Germany, empowered by the winds of reform and growing popular resistance across Eastern Europe, "
    "began to dismantle the wall with sledgehammers and bare hands. The border guards did not open fire. "
    "This dramatic historic event marked the beginning of the end of the communist bloc, culminating in the formal reunification "
    "of Germany in October 1990 and the eventual dissolution of the Soviet Union in December 1991."
)
P1_CHAP = "The End of Bipolarity"

add_p(make_pq(P1_CHAP, "Berlin Wall Symbolism", P1_TEXT,
    "The Berlin Wall, erected in 1961, was internationally recognized as the foremost physical symbol of which historical divide?",
    "The ideological and geopolitical confrontation between the capitalist Western bloc and the communist Eastern bloc",
    ["The trade competition between Great Britain and France", "The religious conflicts of the Renaissance era", "The military partition of North and South America"],
    "A", "The Berlin Wall symbolized the Cold War division between the US-led Western bloc and the Soviet-led Eastern bloc.", "Identifies Berlin Wall as Cold War symbol."))

add_p(make_pq(P1_CHAP, "Berlin Wall Demolition Date", P1_TEXT,
    "On which exact date did ordinary citizens begin dismantling the Berlin Wall, triggering the collapse of the communist regimes in Eastern Europe?",
    "9 November 1989", ["15 August 1988", "3 October 1990", "25 December 1991"],
    "B", "On 9 November 1989, East German citizens stormed the border checkpoints and demolished the Berlin Wall.", "Identifies 9 November 1989 as demolition date."))

add_p(make_pq(P1_CHAP, "German Reunification Timeline", P1_TEXT,
    "The demolition of the Berlin Wall led directly to the formal political reunification of East and West Germany in:",
    "October 1990", ["December 1989", "January 1995", "May 1993"],
    "C", "Germany was officially reunited as a single sovereign democratic state on 3 October 1990.", "Recalls October 1990 for German reunification."))

add_p(make_pq(P1_CHAP, "Berlin Wall Construction Year", P1_TEXT,
    "In which year was the Berlin Wall originally constructed to stem the flight of citizens from East Berlin to West Berlin?",
    "1961", ["1945", "1955", "1973"],
    "D", "The Berlin Wall was erected by the German Democratic Republic (East Germany) in August 1961.", "Identifies 1961 as construction year."))

add_p(make_pq(P1_CHAP, "Collapse Sequence Culmination", P1_TEXT,
    "According to the passage, the chain of political transformations initiated by the fall of the Berlin Wall culminated in:",
    "The formal dissolution of the Soviet Union in December 1991",
    ["The immediate outbreak of World War III", "The total abolition of the United Nations", "The restoration of the Russian Tsarist monarchy"],
    "A", "The collapse of the Eastern European communist regimes led directly to the disintegration of the USSR in December 1991.", "Explains culmination in Soviet dissolution."))


# =================================================================================================
# PASSAGE 2: Shock Therapy in Post-Communist States
# =================================================================================================
P2_TEXT = (
    "The collapse of communism in the Soviet Union and Eastern Europe was followed by a painful transition from an authoritarian socialist "
    "system to a democratic capitalist system. The model of transition in Russia, Central Asia, and Eastern Europe, heavily influenced by "
    "the International Monetary Fund (IMF) and the World Bank, came to be known as 'Shock Therapy'. Shock therapy involved a total, "
    "immediate break from the socialist economic structures. It mandated the sudden privatisation of state assets, deregulation of prices, "
    "and complete trade liberalisation. However, instead of delivering prosperity, shock therapy ruined the Russian economy. "
    "About 90 percent of its state-controlled industrial enterprises were auctioned off at throwaway prices in what was described as "
    "'the largest garage sale in history'. The value of the Russian currency, the ruble, plummeted drastically, inflation soared, "
    "and the old social welfare system was systematically destroyed, pushing millions into poverty while a mafia oligarch class arose."
)
P2_CHAP = "The End of Bipolarity"

add_p(make_pq(P2_CHAP, "Shock Therapy Sponsoring Agencies", P2_TEXT,
    "The economic transition model known as 'Shock Therapy' was primarily guided and influenced by which international financial institutions?",
    "The International Monetary Fund (IMF) and the World Bank",
    ["The World Health Organization (WHO) and UNESCO", "The Warsaw Pact Council", "The International Labour Organization (ILO)"],
    "A", "Shock Therapy was designed and promoted by the IMF and the World Bank as a rapid recipe for market conversion.", "Identifies IMF and World Bank as sponsors of Shock Therapy."))

add_p(make_pq(P2_CHAP, "Largest Garage Sale Metaphor", P2_TEXT,
    "Why was the massive privatisation of Russian state enterprises during shock therapy termed 'the largest garage sale in history'?",
    "Valuable state industrial assets were undervalued and sold off at throwaway prices to private oligarchs and mafia",
    ["All household furniture in Moscow was auctioned to foreign tourists", "The Russian navy sold all its submarines on internet markets", "The government gave away gold bullion free of cost to foreign banks"],
    "B", "Over 90% of state enterprises were liquidated at rock-bottom prices, concentrating immense wealth in few hands.", "Explains the 'largest garage sale' metaphor."))

add_p(make_pq(P2_CHAP, "Russian Currency Collapse", P2_TEXT,
    "What immediate macroeconomic consequence did shock therapy inflict upon Russia's domestic currency, the ruble?",
    "The value of the ruble plummeted drastically, triggering hyperinflation and wiping out citizen savings",
    ["The ruble became the strongest currency in the global market", "The ruble was completely replaced by the British pound", "Inflation was reduced to zero percent overnight"],
    "C", "Hyperinflation and ruble depreciation eroded the life savings of millions of ordinary Russian citizens.", "Identifies ruble depreciation and hyperinflation."))

add_p(make_pq(P2_CHAP, "Core Mandate of Shock Therapy", P2_TEXT,
    "Which of the following was a core policy component mandated under the Shock Therapy transition package?",
    "Sudden privatisation of state assets, price deregulation, and complete free trade liberalisation",
    ["Gradual five-year state planning with strict price controls", "Banning all foreign investments and international trade", "Preserving state agricultural collectives in perpetuity"],
    "D", "Shock Therapy demanded an abrupt transition to private property, market-determined prices, and open currency convertibility.", "Details core pillars of Shock Therapy."))

add_p(make_pq(P2_CHAP, "Social Impact of Shock Therapy", P2_TEXT,
    "What was the social impact of shock therapy on the Russian public welfare architecture?",
    "The comprehensive state welfare safety net was systematically dismantled, creating rampant inequality and an oligarchic mafia",
    ["Free healthcare and education were doubled across all Siberian towns", "All citizens received free university degrees in the West", "Poverty was completely eliminated within six months"],
    "A", "The destruction of subsidies and public safety nets plunged vulnerable populations into extreme poverty while oligarchs flourished.", "Details social welfare collapse under Shock Therapy."))


# =================================================================================================
# PASSAGE 3: The European Union and the Maastricht Treaty
# =================================================================================================
P3_TEXT = (
    "The European Union (EU) evolved over decades from an economic cooperation agreement among war-weary Western European nations "
    "into a powerful political and economic supranational entity. The collapse of the Soviet bloc accelerated this integration, "
    "culminating in the signing of the historic Maastricht Treaty in February 1992, which formally established the European Union. "
    "The treaty laid the groundwork for a common foreign and security policy, cooperation on justice and home affairs, and the creation "
    "of a single European currency, the Euro, which was launched in January 2002. Today, the EU functions in many ways like a nation-state: "
    "it has its own flag, anthem, founding date (Europe Day on 9 May), and currency, although it has failed to adopt a common constitution. "
    "With a combined GDP second only to the United States and permanent representation on the UN Security Council through France, "
    "the EU exerts enormous diplomatic, economic, and normative influence globally."
)
P3_CHAP = "Contemporary Centres of Power"

add_p(make_pq(P3_CHAP, "Maastricht Treaty 1992", P3_TEXT,
    "The European Union was formally established following the signing of which landmark international treaty in February 1992?",
    "The Maastricht Treaty", ["The Treaty of Rome", "The Treaty of Versailles", "The Lisbon Treaty"],
    "A", "The Maastricht Treaty was signed on 7 February 1992 in the Netherlands, establishing the European Union.", "Identifies the Maastricht Treaty."))

add_p(make_pq(P3_CHAP, "Euro Currency Launch", P3_TEXT,
    "In which year was the single European currency, the Euro, formally introduced into physical circulation among participating EU member states?",
    "January 2002", ["January 1992", "May 1995", "October 2010"],
    "B", "Euro banknotes and coins were officially launched into circulation on 1 January 2002.", "Identifies January 2002 for Euro physical rollout."))

add_p(make_pq(P3_CHAP, "Europe Day Date", P3_TEXT,
    "Which date is celebrated across member countries every year as 'Europe Day' to commemorate the historic Schuman Declaration?",
    "9 May", ["1 January", "14 July", "24 October"],
    "C", "Europe Day is celebrated on 9 May in remembrance of French Foreign Minister Robert Schuman's 1950 declaration.", "Identifies 9 May as Europe Day."))

add_p(make_pq(P3_CHAP, "EU Common Constitution Fate", P3_TEXT,
    "Despite having a shared flag, anthem, and currency, which major initiative of European integration failed to secure unanimous adoption?",
    "A common written Constitution for the European Union",
    ["The creation of the European Parliament", "The establishment of the European Court of Justice", "The abolition of cross-border customs duties"],
    "D", "The proposed Treaty establishing a Constitution for Europe was rejected in referendums by French and Dutch voters in 2005.", "Highlights failure of EU common constitution."))

add_p(make_pq(P3_CHAP, "EU Permanent UNSC Member", P3_TEXT,
    "Following the exit of Great Britain (Brexit), which EU member nation holds a permanent veto-wielding seat on the UN Security Council?",
    "France", ["Germany", "Italy", "Spain"],
    "A", "France is the sole remaining EU member holding a permanent seat and veto power on the UN Security Council.", "Identifies France as permanent UNSC member."))


# =================================================================================================
# PASSAGE 4: China's Economic Resurgence and Open Door Policy
# =================================================================================================
P4_TEXT = (
    "China's remarkable transformation from a backward, agrarian, state-controlled socialist economy into a global industrial giant "
    "is one of the defining developments of contemporary world politics. Unlike the Soviet Union, which underwent sudden and disruptive "
    "'shock therapy', the Chinese leadership adopted a cautious, phased, and step-by-step approach to market liberalization. "
    "In 1973, Premier Zhou Enlai proposed the 'Four Modernisations' in agriculture, industry, science and technology, and military defence. "
    "By December 1978, paramount leader Deng Xiaoping announced the historic 'Open Door Policy' and economic reforms. "
    "China privatised agriculture in 1982, followed by the privatisation of industry in 1998. It established Special Economic Zones (SEZs) "
    "where foreign trade and investment were encouraged with tax incentives and advanced infrastructure. "
    "This pragmatic strategy led to phenomenal economic growth, culminating in China's formal accession to the World Trade Organization in 2001."
)
P4_CHAP = "Contemporary Centres of Power"

add_p(make_pq(P4_CHAP, "Four Modernisations Proposer", P4_TEXT,
    "Who originally proposed the 'Four Modernisations' (agriculture, industry, science and technology, and defence) in China in 1973?",
    "Premier Zhou Enlai", ["Mao Zedong", "Deng Xiaoping", "Xi Jinping"],
    "A", "Zhou Enlai formulated the Four Modernisations in 1973 to upgrade China's productive capabilities.", "Identifies Zhou Enlai proposing Four Modernisations."))

add_p(make_pq(P4_CHAP, "Deng Xiaoping Open Door Policy", P4_TEXT,
    "Paramount leader Deng Xiaoping unveiled China's historic 'Open Door Policy' and economic modernisation drive in which year?",
    "December 1978", ["October 1949", "June 1989", "January 2001"],
    "B", "Deng Xiaoping announced economic reforms and the Open Door policy at the Third Plenum in December 1978.", "Identifies December 1978 for Open Door policy."))

add_p(make_pq(P4_CHAP, "Privatisation Phasing China", P4_TEXT,
    "How did China's sequencing of economic privatisation differ fundamentally from Soviet shock therapy?",
    "China adopted a phased approach, privatising agriculture first in 1982 and industry much later in 1998",
    ["China privatised heavy industry overnight while banning all private farming", "China refused all foreign trade and investment", "China abolished its central bank and adopted the US Dollar"],
    "C", "China sequentially liberalized agriculture in 1982, generating rural savings that later supported industrial growth.", "Contrasts China's phased reforms with shock therapy."))

add_p(make_pq(P4_CHAP, "Special Economic Zones Purpose", P4_TEXT,
    "What was the primary developmental objective behind creating Special Economic Zones (SEZs) in coastal China?",
    "To attract foreign direct investment and cutting-edge technology by providing tax concessions and state-of-the-art infrastructure",
    ["To confine political dissidents inside guarded penal camps", "To build military installations for testing intercontinental missiles", "To establish religious monasteries free from government oversight"],
    "D", "SEZs were created to attract multinational corporations, boost exports, and test free-market dynamics in designated enclaves.", "Explains purpose of Chinese SEZs."))

add_p(make_pq(P4_CHAP, "China WTO Entry Year", P4_TEXT,
    "In which milestone year was the People's Republic of China formally admitted into the World Trade Organization (WTO)?",
    "2001", ["1991", "1982", "2015"],
    "A", "China joined the WTO in December 2001, cementing its position as the 'workshop of the world'.", "Identifies 2001 for China's WTO entry."))


# =================================================================================================
# PASSAGE 5: ASEAN and The ASEAN Way
# =================================================================================================
P5_TEXT = (
    "The Association of Southeast Asian Nations (ASEAN) was established on 8 August 1967 in Bangkok by five visionary countries: "
    "Indonesia, Malaysia, the Philippines, Singapore, and Thailand. Born in a region torn by colonial exploitation and Cold War proxy conflicts, "
    "ASEAN was conceived primarily to accelerate economic growth and promote regional peace and stability. "
    "Unlike the highly institutionalised and supranational European Union, ASEAN developed a unique form of informal, non-confrontational, "
    "and consensus-driven diplomacy known globally as the 'ASEAN Way'. Respect for national sovereignty and strict non-interference in "
    "the internal affairs of member states are sacred tenets of this approach. In 2003, ASEAN took a major leap forward by establishing "
    "the ASEAN Community comprising three pillars: the ASEAN Security Community, the ASEAN Economic Community, and the ASEAN Socio-Cultural Community."
)
P5_CHAP = "Contemporary Centres of Power"

add_p(make_pq(P5_CHAP, "ASEAN Founding Document", P5_TEXT,
    "The Association of Southeast Asian Nations (ASEAN) was established in August 1967 following the signing of which declaration?",
    "The Bangkok Declaration", ["The Bandung Declaration", "The Manila Accord", "The Singapore Treaty"],
    "A", "The Bangkok Declaration was signed on 8 August 1967 by five founding foreign ministers.", "Identifies Bangkok Declaration 1967."))

add_p(make_pq(P5_CHAP, "Five Founding Members ASEAN", P5_TEXT,
    "Which group of five countries originally co-founded ASEAN in 1967?",
    "Indonesia, Malaysia, the Philippines, Singapore, and Thailand",
    ["Vietnam, Laos, Cambodia, Myanmar, and Brunei", "India, Pakistan, Bangladesh, Sri Lanka, and Nepal", "China, Japan, South Korea, Taiwan, and North Korea"],
    "B", "Indonesia, Malaysia, Philippines, Singapore, and Thailand were the original five signatories.", "Lists the five founding members of ASEAN."))

add_p(make_pq(P5_CHAP, "The ASEAN Way Definition", P5_TEXT,
    "The diplomatic doctrine known as the 'ASEAN Way' is fundamentally characterized by:",
    "An informal, non-confrontational, and consensus-oriented interaction respecting sovereign equality",
    ["Supranational military enforcement through a unified standing regional army", "Binding majority voting that overrides national sovereignty", "The imposition of uniform religious and linguistic laws"],
    "C", "The ASEAN Way emphasizes quiet diplomacy, consensus, and non-interference over rigid legalism.", "Defines 'The ASEAN Way'."))

add_p(make_pq(P5_CHAP, "ASEAN Community Three Pillars", P5_TEXT,
    "In 2003, ASEAN leaders agreed to establish an integrated ASEAN Community anchored on which three pillars?",
    "ASEAN Security Community, ASEAN Economic Community, and ASEAN Socio-Cultural Community",
    ["ASEAN Nuclear Command, ASEAN Space Agency, and ASEAN Monetary Fund", "ASEAN Border Wall, ASEAN Police, and ASEAN Naval Command", "ASEAN Agricultural Union, ASEAN Coal Federation, and ASEAN Oil Cartel"],
    "D", "The 2003 Bali Concord II created the Security, Economic, and Socio-Cultural Communities.", "Lists the three pillars of ASEAN Community."))

add_p(make_pq(P5_CHAP, "ASEAN Regional Forum ARF", P5_TEXT,
    "In 1994, ASEAN established which premier security dialogue platform to coordinate security and foreign policy across the wider Asia-Pacific?",
    "The ASEAN Regional Forum (ARF)",
    ["The Asia-Pacific Economic Cooperation (APEC)", "The Shanghai Cooperation Organisation (SCO)", "The South Asian Association for Regional Cooperation (SAARC)"],
    "A", "The ARF was established in 1994 to facilitate multilateral security dialogues and confidence-building measures.", "Identifies ASEAN Regional Forum established in 1994."))


# =================================================================================================
# PASSAGE 6: Democratisation in Pakistan
# =================================================================================================
P6_TEXT = (
    "Pakistan's political trajectory since independence has been characterized by a persistent and fragile oscillation between "
    "democratic governance and military authoritarianism. Soon after the implementation of the country's first constitution, "
    "General Ayub Khan took over the administration and got himself elected, only to step down amidst public disaffection, "
    "giving way to General Yahya Khan. Following the catastrophic 1971 war and the liberation of Bangladesh, an elected government "
    "led by Zulfikar Ali Bhutto held power from 1971 to 1977. However, Bhutto's government was toppled in a military coup by General Zia-ul-Haq, "
    "who subsequently executed Bhutto. Democracy was restored in 1988 under Benazir Bhutto and Nawaz Sharif, initiating a decade of "
    "fierce party competition until General Pervez Musharraf staged a bloodless military coup in October 1999, ousting Sharif. "
    "Scholars attribute Pakistan's democratic fragility to the social dominance of the military, clergy, and landed aristocracy, "
    "combined with international geopolitical support for military regimes."
)
P6_CHAP = "Contemporary South Asia"

add_p(make_pq(P6_CHAP, "Zulfikar Ali Bhutto Overthrow", P6_TEXT,
    "The elected civilian government of Prime Minister Zulfikar Ali Bhutto was overthrown in a military coup in July 1977 led by:",
    "General Zia-ul-Haq", ["General Ayub Khan", "General Yahya Khan", "General Pervez Musharraf"],
    "A", "General Zia-ul-Haq launched Operation Fair Play in July 1977, overthrowing Bhutto and imposing martial law.", "Identifies General Zia-ul-Haq toppling Bhutto in 1977."))

add_p(make_pq(P6_CHAP, "Musharraf Coup 1999", P6_TEXT,
    "In October 1999, which military commander staged a bloodless coup, deposing democratically elected Prime Minister Nawaz Sharif?",
    "General Pervez Musharraf", ["General Aslam Beg", "General Ashfaq Kayani", "General Raheel Sharif"],
    "B", "General Pervez Musharraf seized state power on 12 October 1999, subsequently declaring himself President in 2001.", "Identifies General Musharraf's 1999 coup."))

add_p(make_pq(P6_CHAP, "Elected Era 1988-1999 Leaders", P6_TEXT,
    "Between 1988 and 1999, competitive parliamentary democracy in Pakistan was dominated by alternate governments headed by:",
    "Benazir Bhutto (PPP) and Nawaz Sharif (PML-N)",
    ["Imran Khan and Asif Ali Zardari", "Liaquat Ali Khan and Fatima Jinnah", "Ayub Khan and Yahya Khan"],
    "C", "The post-Zia democratic decade saw alternating civilian ministries led by Benazir Bhutto and Nawaz Sharif.", "Identifies Benazir Bhutto and Nawaz Sharif in 1988-1999."))

add_p(make_pq(P6_CHAP, "Structural Factors Weak Democracy Pakistan", P6_TEXT,
    "According to political analysts and the passage, which domestic coalition has historically undermined democratic consolidation in Pakistan?",
    "The powerful alliance of the military establishment, the landed aristocracy, and orthodox religious clergy",
    ["A militant trade union movement of factory workers", "The undisputed supremacy of independent judicial courts", "An overwhelmingly dominant indigenous peasant cooperative"],
    "D", "The military-bureaucratic-feudal nexus combined with religious hardliners has repeatedly subverted civilian institutions.", "Identifies domestic structural impediments to Pakistani democracy."))

add_p(make_pq(P6_CHAP, "External Factor Sustaining Military", P6_TEXT,
    "How have external geopolitical interests historically contributed to military dominance in Pakistan?",
    "Western powers and major allies supported military rulers as bulwarks against communism and global terror to protect their strategic interests",
    ["The United Nations mandated military governance by charter", "Foreign states refused all commercial trade with civilian leaders", "International courts banned political parties in Pakistan"],
    "A", "The US and Western allies backed Pakistan's military regimes during the Cold War and the War on Terror, providing economic and military aid.", "Explains geopolitical support for military regimes."))


# =================================================================================================
# PASSAGE 7: Ethnic Conflict in Sri Lanka
# =================================================================================================
P7_TEXT = (
    "Sri Lanka (formerly Ceylon) maintained a functioning democratic system and impressive social indicators since its independence in 1948, "
    "yet it was severely crippled by a brutal ethnic conflict that raged for nearly three decades. The conflict pitted the majority Sinhala "
    "community against the minority Sri Lankan Tamils, who had migrated from southern India over centuries. Sinhala nationalist leaders "
    "believed that Sri Lanka belonged exclusively to the Sinhala people, enacting discriminatory legislation such as the Sinhala Only Act of 1956 "
    "and giving preferential treatment to Sinhala in government employment and university admissions. Feeling marginalized, Tamil grievances "
    "crystallized into an armed secessionist struggle led by the Liberation Tigers of Tamil Eelam (LTTE) headed by Velupillai Prabhakaran, "
    "demanding an independent Tamil state ('Tamil Eelam'). India sent the Indian Peace Keeping Force (IPKF) in 1987, which ended disastrously. "
    "The civil war finally concluded in May 2009 with the complete military defeat of the LTTE and the death of its top commanders."
)
P7_CHAP = "Contemporary South Asia"

add_p(make_pq(P7_CHAP, "Sinhala Only Act 1956", P7_TEXT,
    "Which discriminatory legislation passed in 1956 replaced English with Sinhala as the sole official language of Sri Lanka, outraging Tamils?",
    "The Official Language Act (Sinhala Only Act) of 1956",
    ["The Citizenship Act of 1948", "The Prevention of Terrorism Act of 1979", "The Universities Act of 1978"],
    "A", "The 1956 Sinhala Only Act disenfranchised Tamil speakers from government administration, fueling ethnic alienation.", "Identifies 1956 Sinhala Only Act."))

add_p(make_pq(P7_CHAP, "LTTE Secessionist Goal", P7_TEXT,
    "The armed secessionist movement led by the LTTE under Velupillai Prabhakaran fought to establish an independent sovereign state called:",
    "Tamil Eelam", ["Tamil Nadu", "Dravida Nadu", "Eelam Desam"],
    "B", "The LTTE waged an armed campaign to carve out an independent sovereign state of 'Tamil Eelam' in northern and eastern Sri Lanka.", "Identifies Tamil Eelam."))

add_p(make_pq(P7_CHAP, "IPKF Deployment and Withdrawal", P7_TEXT,
    "In which year was the Indian Peace Keeping Force (IPKF) dispatched to Sri Lanka, and when was it finally withdrawn by the Indian government?",
    "Dispatched in 1987 under Rajiv Gandhi and withdrawn in 1990 under V.P. Singh",
    ["Dispatched in 1971 and withdrawn in 1975", "Dispatched in 1999 and withdrawn in 2004", "Dispatched in 1965 and withdrawn in 1966"],
    "C", "The IPKF was deployed following the 1987 Indo-Sri Lanka Accord and pulled out in 1990 after facing armed resistance from both sides.", "Recalls IPKF deployment 1987 and withdrawal 1990."))

add_p(make_pq(P7_CHAP, "End of Sri Lankan Civil War", P7_TEXT,
    "The nearly three-decade-long civil war in Sri Lanka finally came to an end in May 2009 following:",
    "A massive military offensive by the Sri Lankan armed forces that crushed the LTTE and killed Prabhakaran",
    ["A peaceful United Nations monitored national referendum", "The voluntary surrender of all state authority to Tamil militants", "The partition of the island into two independent member states of the UN"],
    "D", "The Sri Lankan military launched an all-out offensive in Mullaitivu, eliminating the LTTE leadership in May 2009.", "Identifies military conclusion of Sri Lankan civil war in May 2009."))

add_p(make_pq(P7_CHAP, "Sri Lankan Economic Resilience", P7_TEXT,
    "Despite decades of intense civil war, Sri Lanka achieved remarkable economic milestones, including being one of the first developing nations to:",
    "Successfully liberalize its economy in 1977 and achieve high human development and literacy rates",
    ["Abolish all private industry and adopt Soviet state socialism", "Become a nuclear weapons superpower", "Join the European Union as a full member"],
    "A", "Sri Lanka was the first South Asian state to open its economy (1977) while maintaining high life expectancy and human development.", "Details Sri Lanka's socio-economic resilience."))


# =================================================================================================
# PASSAGE 8: The Democratic Transformation of Nepal
# =================================================================================================
P8_TEXT = (
    "Nepal was a Hindu kingdom for centuries, ruled by an absolute monarchy. Throughout modern history, popular struggles sought "
    "to establish constitutional democracy against monarchical resistance. In 1990, King Birendra accepted constitutional reforms "
    "following the first Jan Andolan (People's Movement), creating a multi-party parliamentary system under a constitutional monarch. "
    "However, this democracy was deeply troubled. In the late 1990s, the Communist Party of Nepal (Maoist) launched an armed peasant insurgency, "
    "demanding the abolition of feudalism and the monarchy, leading to a triangular conflict between royal forces, Maoists, and parliamentary parties. "
    "In 2002, King Gyanendra dismissed the elected government and assumed absolute royal executive power. This sparked Jan Andolan II in April 2006, "
    "where the Seven Party Alliance (SPA) and the Maoists joined hands in massive street demonstrations. "
    "The King was forced to reinstate the dissolved Parliament. In 2008, Nepal formally abolished the 240-year-old monarchy, "
    "transforming into a secular, federal democratic republic."
)
P8_CHAP = "Contemporary South Asia"

add_p(make_pq(P8_CHAP, "Jan Andolan II Alliance", P8_TEXT,
    "The historic Jan Andolan II (People's Movement) of April 2006 that forced King Gyanendra to surrender power was spearheaded by:",
    "The Seven Party Alliance (SPA) together with the Communist Party of Nepal (Maoist)",
    ["The Royal Nepal Army and British Gurkhas", "The United Nations Security Council Peacekeeping Force", "The World Bank and IMF economic advisors"],
    "A", "The SPA and Maoists signed a 12-point agreement in New Delhi, leading massive joint pro-democracy protests in Kathmandu.", "Identifies Seven Party Alliance and Maoists."))

add_p(make_pq(P8_CHAP, "Abolition of Nepalese Monarchy", P8_TEXT,
    "In which historic year did Nepal's newly elected Constituent Assembly vote to formally abolish the monarchy and declare a federal democratic republic?",
    "2008", ["1990", "2002", "2015"],
    "B", "On 28 May 2008, the Constituent Assembly voted 560 to 4 to abolish the 240-year-old Shah monarchy.", "Identifies 2008 as year monarchy was abolished in Nepal."))

add_p(make_pq(P8_CHAP, "Triangular Contest Actors Nepal", P8_TEXT,
    "During the late 1990s and early 2000s, Nepal's political crisis was defined as a 'triangular contest' among which three forces?",
    "The monarchical royal forces, the Maoist armed insurgents, and the pro-democracy parliamentary political parties",
    ["The Indian Army, the Chinese Army, and the Nepalese police", "The Buddhist monks, the Hindu priests, and Christian missionaries", "The British Commonwealth, the European Union, and the United States"],
    "C", "Nepal's protracted instability involved the King's royalists, mainstream parliamentary parties, and Maoist guerrilla rebels.", "Identifies three forces in Nepal's triangular contest."))

add_p(make_pq(P8_CHAP, "King Gyanendra Royal Coup", P8_TEXT,
    "In October 2002 and February 2005, King Gyanendra derailed Nepal's constitutional governance by:",
    "Dismissing the elected Prime Minister and seizing complete direct executive authority under the pretext of curbing Maoist insurgency",
    ["Surrendering Nepalese sovereignty to the United Nations", "Merging Nepal with the state of Sikkim", "Abolishing the Nepalese currency"],
    "D", "King Gyanendra dismissed Prime Minister Deuba and took direct control, precipitating widespread democratic resistance.", "Details King Gyanendra's seizure of power."))

add_p(make_pq(P8_CHAP, "First Jan Andolan Year", P8_TEXT,
    "In which year did the First Jan Andolan (People's Movement) force King Birendra to introduce a multi-party constitutional monarchy?",
    "1990", ["1950", "1975", "2000"],
    "A", "The 1990 People's Movement ended the absolute royal Panchayat system and instituted constitutional democracy.", "Identifies 1990 as year of First Jan Andolan."))


# =================================================================================================
# PASSAGE 9: Reforming the United Nations Security Council
# =================================================================================================
P9_TEXT = (
    "The United Nations was founded in 1945 in the immediate aftermath of World War II to save succeeding generations from the scourge of war. "
    "At its core sits the UN Security Council (UNSC), which carries primary responsibility for international peace and security. "
    "The UNSC consists of fifteen members: five permanent members (United States, Russia, Great Britain, France, and China) "
    "and ten non-permanent members elected for two-year terms. The five permanent members (P5) enjoy the exceptional privilege of 'veto power', "
    "allowing any single one of them to block any substantive resolution, regardless of overwhelming global majority support. "
    "As the geopolitical reality of the 21st century diverges sharply from that of 1945, demands for comprehensive reform have intensified. "
    "In 1997, Secretary-General Kofi Annan proposed specific criteria for new permanent members: a major economic power, a major military power, "
    "a substantial contributor to the UN budget, a populous nation, and one that respects democracy and human rights. "
    "India has forcefully argued that without permanent representation for developing powers like itself, the Council lacks democratic legitimacy."
)
P9_CHAP = "International Organisations"

add_p(make_pq(P9_CHAP, "P5 Veto Power Function", P9_TEXT,
    "Under the United Nations Charter, what is the operational effect of a negative vote ('veto') cast by any single permanent member of the Security Council?",
    "It immediately blocks and defeats any substantive resolution, regardless of majority support in the Council",
    ["It automatically expels the proposing country from the United Nations", "It refers the matter to the International Court of Justice for final trial", "It suspends the voting rights of all non-permanent members for six months"],
    "A", "A single negative vote from any of the P5 permanent members vetoes the resolution entirely.", "Explains the mechanism of UNSC veto power."))

add_p(make_pq(P9_CHAP, "Non-Permanent Members Tenure", P9_TEXT,
    "Non-permanent members of the UN Security Council are elected by the General Assembly for a term of how many years?",
    "Two years (without immediate re-election)", ["One year", "Five years", "Ten years"],
    "B", "Non-permanent members serve two-year non-renewable terms, distributed by geographic regions.", "Identifies two-year tenure of non-permanent UNSC members."))

add_p(make_pq(P9_CHAP, "Kofi Annan Reform Criteria", P9_TEXT,
    "In 1997, which UN Secretary-General initiated the inquiry that proposed concrete criteria for inducting new permanent members into the Security Council?",
    "Kofi Annan", ["Boutros Boutros-Ghali", "Ban Ki-moon", "Javier Perez de Cuellar"],
    "C", "Kofi Annan proposed clear criteria including economic size, population, troop contributions, and democratic values in 1997.", "Identifies Kofi Annan formulating 1997 reform criteria."))

add_p(make_pq(P9_CHAP, "Total UNSC Membership", P9_TEXT,
    "What is the total number of member nations serving concurrently on the UN Security Council?",
    "15 members (5 permanent and 10 non-permanent)",
    ["10 members", "25 members", "50 members"],
    "D", "The Security Council consists of exactly 15 members: 5 permanent and 10 elected non-permanent members.", "Recalls 15 total members of the UNSC."))

add_p(make_pq(P9_CHAP, "India's Claim Justification", P9_TEXT,
    "On which fundamental grounds does India stake its legitimate claim for a permanent seat on an expanded UN Security Council?",
    "Being the world's most populous nation, the world's largest democracy, a top troop contributor to UN peacekeeping, and a major growing economy",
    ["Possessing the world's largest stockpile of thermonuclear warheads", "Being a founding colonial colony of the British Empire", "Refusing to sign any international environmental conventions"],
    "A", "India's claim rests on its population, economic weight, democratic pedigree, and sterling record in UN peacekeeping operations.", "Summarizes India's justification for permanent UNSC seat."))


# =================================================================================================
# PASSAGE 10: Global Civil Society and Human Rights
# =================================================================================================
P10_TEXT = (
    "While intergovernmental organisations like the United Nations play a formal role in world politics, non-governmental organisations (NGOs) "
    "have emerged as powerful actors within global civil society. Two premier international NGOs working for the defence and promotion of "
    "human rights worldwide are Amnesty International and Human Rights Watch. Amnesty International, founded in 1961 by British lawyer Peter Benenson, "
    "campaigns across the globe for the release of prisoners of conscience, fair trials for political detainees, and the unconditional "
    "abolition of the death penalty and torture. It conducts independent investigations and publishes authoritative annual reports that often "
    "embarrass repressive governments. Human Rights Watch, established originally as Helsinki Watch in 1978, is the largest US-based international "
    "human rights NGO. It specializes in meticulous fact-finding missions, documenting abuses during armed conflicts, and lobbying governments and "
    "international bodies like the International Criminal Court to hold perpetrators of war crimes accountable."
)
P10_CHAP = "International Organisations"

add_p(make_pq(P10_CHAP, "Amnesty International Founder", P10_TEXT,
    "Amnesty International was established in 1961 in London following an impassioned newspaper appeal written by British lawyer:",
    "Peter Benenson", ["Kofi Annan", "Eleanor Roosevelt", "Henri Dunant"],
    "A", "Peter Benenson founded Amnesty International in 1961 after learning of two Portuguese students imprisoned for raising a toast to freedom.", "Identifies Peter Benenson as founder of Amnesty."))

add_p(make_pq(P10_CHAP, "Prisoners of Conscience Campaign", P10_TEXT,
    "A core ongoing campaign of Amnesty International is securing the unconditional freedom of 'prisoners of conscience', meaning:",
    "Persons imprisoned solely for their peaceful political, religious, or philosophical beliefs without having used or advocated violence",
    ["Individuals convicted of high treason and armed bank robberies", "Prisoners who refuse to work inside penitentiary factories", "Military officers guilty of desertion during active warfare"],
    "B", "Amnesty defines prisoners of conscience as individuals detained solely for peaceful expression of conscience or identity.", "Defines 'prisoners of conscience'."))

add_p(make_pq(P10_CHAP, "Human Rights Watch Origin", P10_TEXT,
    "Human Rights Watch was initially established in 1978 under which original organizational name to monitor the Helsinki Accords?",
    "Helsinki Watch", ["Geneva Monitor", "Global Watchdog", "Liberty International"],
    "C", "Human Rights Watch began as Helsinki Watch in 1978 to monitor compliance with the 1975 Helsinki Accords in Soviet bloc states.", "Identifies Helsinki Watch."))

add_p(make_pq(P10_CHAP, "Amnesty International Core Principles", P10_TEXT,
    "Which of the following represents a non-negotiable global campaign objective of Amnesty International across all continents?",
    "The universal and unconditional abolition of the death penalty and an absolute ban on torture",
    ["The mandatory military conscription of all eighteen-year-old citizens", "The establishment of a single global world government", "The nationalisation of all private television networks"],
    "D", "Amnesty opposes capital punishment and torture unconditionally in all circumstances under international law.", "Highlights Amnesty's campaign against death penalty and torture."))

add_p(make_pq(P10_CHAP, "Role of Human Rights NGOs", P10_TEXT,
    "How do international NGOs like Human Rights Watch and Amnesty International exert influence on global politics without state power?",
    "By conducting rigorous independent fact-finding, generating public awareness, and naming and shaming abusive governments in the media",
    ["By imposing economic trade sanctions through armed naval blockades", "By passing legally binding statutes in national parliaments", "By commanding multinational mercenary armies"],
    "A", "Human rights NGOs use moral authority, investigative reports, media exposure, and global citizen advocacy to compel state accountability.", "Explains mechanisms of NGO influence in world politics."))

# =================================================================================================
# PASSAGE 11: Traditional vs. Non-Traditional Notions of Security
# =================================================================================================
P11_TEXT = (
    "In international relations, security is broadly conceptualized into traditional and non-traditional notions. "
    "Traditional security is fundamentally state-centric, focusing on military threats from other sovereign nations "
    "that endanger the state's territorial integrity, political independence, and the lives of its citizens. "
    "The core mechanisms of traditional external security include military deterrence, defense, balance of power, "
    "and strategic alliance building. In contrast, non-traditional notions of security go beyond the state to protect "
    "the individual human being and the planet itself. Often termed 'Human Security' and 'Global Security', this paradigm "
    "addresses threats that transcend international borders, such as global warming, pandemics (like HIV/AIDS, Ebola, and COVID-19), "
    "transnational terrorism, large-scale refugee migration, and extreme poverty. In the non-traditional framework, "
    "human security is encapsulated in the twin ideals of 'freedom from fear' and 'freedom from want'."
)
P11_CHAP = "Security in the Contemporary World"

add_p(make_pq(P11_CHAP, "Traditional Security Referent", P11_TEXT,
    "In the traditional conception of national security, what is the primary referent object that must be protected?",
    "The sovereign state, its territory, and its political independence",
    ["Global multinational commercial corporations", "Individual private citizens exclusively", "Non-governmental environmental charities"],
    "A", "Traditional security is state-centric, viewing the sovereign nation-state as the primary entity requiring military defense.", "Identifies the state as referent object in traditional security."))

add_p(make_pq(P11_CHAP, "Traditional External Security Measures", P11_TEXT,
    "Which of the following represents the four classic strategies of traditional external security policy?",
    "Deterrence, defense, balance of power, and alliance building",
    ["Universal disarmament, border abolition, global citizenship, and free trade", "Total isolationism, economic autarky, currency ban, and censorship", "Space exploration, agricultural collectivisation, public healthcare, and literacy"],
    "B", "States maintain external security by deterring aggression, defending borders, balancing power, and forming alliances.", "Lists core traditional security mechanisms."))

add_p(make_pq(P11_CHAP, "Human Security Twin Ideals", P11_TEXT,
    "Under the modern paradigm of Human Security, citizen well-being is anchored in which two foundational freedoms?",
    "'Freedom from fear' and 'freedom from want'",
    ["'Freedom from taxation' and 'freedom from work'", "'Freedom from law' and 'freedom from borders'", "'Freedom from elections' and 'freedom from trade'"],
    "C", "Human security guarantees protection from violent threats ('freedom from fear') and economic deprivation ('freedom from want').", "Identifies freedom from fear and freedom from want."))

add_p(make_pq(P11_CHAP, "Non-Traditional Security Threats", P11_TEXT,
    "Which of the following exemplifies a classic non-traditional threat to global security?",
    "Global climate change, international pandemics, and transnational terrorism",
    ["An armored cross-border tank invasion by a neighbouring army", "A naval artillery bombardment of a coastal military base", "A conventional air strike against military radar stations"],
    "D", "Non-traditional threats cross national boundaries and cannot be resolved by unilateral military force.", "Identifies non-traditional security threats."))

add_p(make_pq(P11_CHAP, "Global Security Governance", P11_TEXT,
    "Why do non-traditional threats like climate change and global pandemics necessitate international multilateral cooperation?",
    "Because they transcend sovereign borders and cannot be defeated unilaterally by any single nation's military power",
    ["Because international law forbids sovereign states from curing their own citizens", "Because all national police forces were abolished by the UN", "Because viruses and greenhouse gases only affect military personnel"],
    "A", "Global challenges demand coordinated international scientific, medical, and financial collaboration rather than military force.", "Explains necessity of multilateral cooperation for global threats."))


# =================================================================================================
# PASSAGE 12: Nuclear Non-Proliferation Regime and India's Nuclear Stand
# =================================================================================================
P12_TEXT = (
    "The international nuclear non-proliferation regime was formalized with the opening for signature of the Nuclear "
    "Non-Proliferation Treaty (NPT) in 1968. The treaty established a sharp dichotomy: it defined 'nuclear-weapon states' "
    "as those that had manufactured and exploded a nuclear weapon or device prior to 1 January 1967 (namely the United States, "
    "the Soviet Union, the United Kingdom, France, and China), while prohibiting all other signatory nations from acquiring "
    "nuclear arms. India consistently and vigorously refused to sign the NPT, denouncing it as an inherently discriminatory "
    "treaty that legitimized the nuclear monopoly of five privileged powers while denying developing nations the right to "
    "self-defense. In May 1974, India carried out its first peaceful nuclear explosion at Pokhran under Prime Minister Indira Gandhi. "
    "Twenty-four years later, in May 1998, India conducted a series of five underground nuclear tests (Operation Shakti) "
    "under Prime Minister Atal Bihari Vajpayee, formally declaring itself a nuclear weapons state while adopting a doctrine "
    "anchored in 'Credible Minimum Deterrence' and a strict 'No First Use' (NFU) pledge."
)
P12_CHAP = "Security in the Contemporary World"

add_p(make_pq(P12_CHAP, "NPT 1968 Cutoff Date", P12_TEXT,
    "Under the terms of the Nuclear Non-Proliferation Treaty (NPT) of 1968, what was the arbitrary cutoff date for defining a 'nuclear-weapon state'?",
    "1 January 1967", ["15 August 1947", "24 October 1945", "18 May 1974"],
    "A", "The NPT recognized only states that had tested nuclear weapons before 1 January 1967 as legitimate nuclear powers.", "Identifies 1 January 1967 as NPT cutoff date."))

add_p(make_pq(P12_CHAP, "India's Principle of NPT Rejection", P12_TEXT,
    "What was the fundamental principled rationale behind India's refusal to sign the Nuclear Non-Proliferation Treaty (NPT)?",
    "India rejected the NPT as inherently discriminatory because it institutionalized a nuclear monopoly for five select states",
    ["India wanted to sell nuclear warheads on commercial open markets", "India believed that nuclear energy could never generate electricity", "India was barred from the United Nations General Assembly"],
    "B", "India refused to sign the NPT because it created a permanent regime of nuclear haves and nuclear have-nots.", "Explains India's principled opposition to the NPT."))

add_p(make_pq(P12_CHAP, "Pokhran-I Explosion 1974", P12_TEXT,
    "India conducted its first underground nuclear test ('Peaceful Nuclear Explosion') at Pokhran in May 1974 under which Prime Minister?",
    "Indira Gandhi", ["Jawaharlal Nehru", "Lal Bahadur Shastri", "Morarji Desai"],
    "C", "Indira Gandhi authorized India's first nuclear detonation at Pokhran in Rajasthan on 18 May 1974.", "Identifies Indira Gandhi and May 1974 for Pokhran-I."))

add_p(make_pq(P12_CHAP, "Operation Shakti 1998", P12_TEXT,
    "The series of five underground nuclear tests conducted by India in May 1998 at Pokhran was code-named:",
    "Operation Shakti (Pokhran-II)", ["Operation Vijay", "Operation Smiling Buddha", "Operation Meghdoot"],
    "D", "The May 1998 nuclear detonations conducted under Prime Minister Vajpayee were designated Operation Shakti.", "Identifies Operation Shakti in May 1998."))

add_p(make_pq(P12_CHAP, "India Nuclear Doctrine Core Pledge", P12_TEXT,
    "What is the foundational commitment articulated in India's official nuclear doctrine adopted following the 1998 tests?",
    "'No First Use' (NFU) policy combined with a 'Credible Minimum Deterrent'",
    ["Pre-emptive first strike with tactical thermonuclear weapons against any rival", "Immediate transfer of nuclear technology to all non-aligned states", "Complete dismantling of all conventional armed forces"],
    "A", "India's nuclear doctrine pledges No First Use, committing to nuclear retaliation only if attacked by weapons of mass destruction.", "Details India's No First Use nuclear doctrine."))


# =================================================================================================
# PASSAGE 13: The 1992 Rio Earth Summit and Agenda 21
# =================================================================================================
P13_TEXT = (
    "The United Nations Conference on Environment and Development (UNCED), universally known as the 'Rio Earth Summit', "
    "was held in Rio de Janeiro, Brazil, in June 1992. Attended by 170 sovereign states, thousands of NGOs, and multinational "
    "corporations, the summit marked a watershed in international environmental politics. For the first time, global ecological "
    "challenges were placed squarely on the mainstream geopolitical agenda. The Earth Summit revealed a profound divide between "
    "the rich industrialized countries of the Global North and the developing nations of the Global South. While the North was "
    "preoccupied with ozone depletion and global warming, the South insisted that economic development and poverty eradication "
    "were urgent prerequisites. The summit produced the landmark Rio Declaration, conventions on Climate Change, Biodiversity, "
    "and Forestry, and adopted 'Agenda 21'—a comprehensive global action blueprint for sustainable development. Crucially, "
    "it codified the principle of 'Common But Differentiated Responsibilities' (CBDR)."
)
P13_CHAP = "Environment and Natural Resources"

add_p(make_pq(P13_CHAP, "Rio Summit Official Title", P13_TEXT,
    "What was the formal official title of the landmark international conference held in Rio de Janeiro in June 1992?",
    "United Nations Conference on Environment and Development (UNCED)",
    ["United Nations Conference on the Human Environment (UNCHE)", "World Summit on Sustainable Development (WSSD)", "United Nations Framework Climate Conference"],
    "A", "The Rio Earth Summit's official title was the United Nations Conference on Environment and Development (UNCED).", "Identifies official title of Rio Earth Summit."))

add_p(make_pq(P13_CHAP, "North-South Environmental Divergence", P13_TEXT,
    "How did the environmental priorities of the Global North and Global South diverge sharply at the 1992 Earth Summit?",
    "The North prioritized global atmospheric issues like ozone and warming, whereas the South stressed development and poverty eradication",
    ["The North wanted to ban all industrial machinery, while the South wanted to abolish farming", "The North refused to attend the summit, while the South signed all binding treaties", "The North demanded free immigration for all citizens from the South"],
    "B", "Developed Northern countries focused on global ecological preservation, while Southern states demanded developmental equity.", "Contrasts North-South priorities at Rio."))

add_p(make_pq(P13_CHAP, "Agenda 21 Character", P13_TEXT,
    "What was 'Agenda 21' adopted by consensus at the 1992 Rio Earth Summit?",
    "A comprehensive, non-binding global blueprint of action to promote sustainable development in the 21st century",
    ["A legally binding military pact between NATO and developing states", "A list of twenty-one international treaties that were cancelled", "A commercial trade contract between 21 oil multinational corporations"],
    "C", "Agenda 21 provided a non-binding operational program for integrating environmental protection into socio-economic planning.", "Defines Agenda 21."))

add_p(make_pq(P13_CHAP, "CBDR Principle Core Logic", P13_TEXT,
    "The principle of 'Common But Differentiated Responsibilities' (CBDR) accepted at the Rio Summit establishes that:",
    "All states share responsibility for environmental protection, but developed nations bear greater burden due to historical emissions and wealth",
    ["Developing nations must bear 90% of global green taxes because of their larger populations", "Every nation on earth must reduce greenhouse gases by the exact same tonnage", "Poor nations are totally barred from constructing any factories or power plants"],
    "D", "CBDR acknowledges that industrialized states caused most historical pollution and possess superior technological resources.", "Explains CBDR principle."))

add_p(make_pq(P13_CHAP, "Conventions Emerging Rio", P13_TEXT,
    "Which landmark legally binding framework treaty on atmospheric emissions originated directly from the 1992 Rio Earth Summit?",
    "United Nations Framework Convention on Climate Change (UNFCCC)",
    ["The Antarctic Treaty", "The Montreal Protocol", "The Geneva Conventions"],
    "A", "The UNFCCC was opened for signature at the Rio Earth Summit in 1992 to stabilize greenhouse gas concentrations.", "Identifies UNFCCC originating from Rio."))


# =================================================================================================
# PASSAGE 14: The Kyoto Protocol and Climate Justice
# =================================================================================================
P14_TEXT = (
    "Adopted in December 1997 in Kyoto, Japan, the Kyoto Protocol was an international agreement linked to the UNFCCC that "
    "operationalized the principle of Common But Differentiated Responsibilities. Setting legally binding emission reduction "
    "targets for 37 industrialized countries and the European Community (known as Annex-I parties), the Protocol aimed to "
    "reduce their collective greenhouse gas emissions by an average of 5.2 percent below 1990 levels during the first commitment "
    "period (2008–2012). Importantly, developing countries, including rapidly industrializing giants like India and China, "
    "were exempt from mandatory emission reduction targets. This exemption was grounded in the historic reality that developing "
    "countries had contributed negligibly to cumulative historic greenhouse gas concentrations and that their per-capita emissions "
    "remained extremely low compared to the developed world. India ratified the Kyoto Protocol in August 2002, vigorously "
    "advocating for climate justice and equity in all subsequent international climate negotiations."
)
P14_CHAP = "Environment and Natural Resources"

add_p(make_pq(P14_CHAP, "Kyoto Protocol Binding Targets", P14_TEXT,
    "Under the 1997 Kyoto Protocol, which group of countries was legally bound to mandatory greenhouse gas emission reduction targets?",
    "Annex-I parties (industrialized developed nations and the European Community)",
    ["Non-Annex-I developing countries exclusively", "All sovereign member states of the United Nations without exception", "Only small island developing nations in the Pacific Ocean"],
    "A", "The Kyoto Protocol placed legally binding emission cuts exclusively on Annex-I industrialized developed nations.", "Identifies Annex-I parties under Kyoto Protocol."))

add_p(make_pq(P14_CHAP, "Developing Country Exemption Justification", P14_TEXT,
    "Why were developing nations such as India and China exempted from binding emission reduction targets during the first Kyoto commitment period?",
    "Because of their low historical contribution to cumulative emissions and extremely low per-capita carbon footprints",
    ["Because developing countries do not emit any greenhouse gases whatsoever", "Because developing countries agreed to pay all financial costs of Western green technologies", "Because the United Nations Charter exempts Asian states from international treaties"],
    "B", "Developing countries had negligible historical emissions and required policy space for poverty alleviation.", "Explains exemption of developing countries under Kyoto."))

add_p(make_pq(P14_CHAP, "India Kyoto Ratification Year", P14_TEXT,
    "In which year did the Government of India formally ratify the Kyoto Protocol to demonstrate its commitment to global climate action?",
    "August 2002", ["December 1997", "January 2005", "October 2015"],
    "C", "India ratified the Kyoto Protocol in August 2002 during Prime Minister Atal Bihari Vajpayee's tenure.", "Identifies August 2002 for India's ratification of Kyoto."))

add_p(make_pq(P14_CHAP, "Kyoto Overall Target Benchmark", P14_TEXT,
    "What was the collective greenhouse gas reduction target set by the Kyoto Protocol for industrialized Annex-I countries?",
    "An average reduction of 5.2 percent below 1990 emission levels",
    ["A reduction of 50 percent below 2000 levels", "Total elimination of all fossil fuels by 2010", "Zero percent reduction, only reporting guidelines"],
    "D", "Annex-I states committed to an average 5.2% reduction against the 1990 benchmark between 2008 and 2012.", "Recalls 5.2% below 1990 level target."))

add_p(make_pq(P14_CHAP, "Climate Justice Concept", P14_TEXT,
    "In global climate negotiations, the concept of 'Climate Justice' championed by India and developing nations demands that:",
    "Historical polluters pay for climate mitigation and adaptation while ensuring equitable per-capita emission rights for developing nations",
    ["All coal mines in developing countries be shut down immediately without compensation", "Developed nations be allowed to emit unlimited carbon without regulation", "Developing nations surrender their forests to multinational corporate ownership"],
    "A", "Climate justice requires that burdens be shared equitably based on historical responsibility and per-capita fairness.", "Defines climate justice."))


# =================================================================================================
# PASSAGE 15: Governance of the Global Commons
# =================================================================================================
P15_TEXT = (
    "In international law and environmental politics, the 'Global Commons' are defined as resource domains or areas that do not "
    "fall under the sovereign jurisdiction of any single nation-state, and therefore require multilateral collective governance. "
    "Four primary global commons are recognized: the Earth's atmosphere, Antarctica, the deep ocean floor (high seas), and outer space. "
    "Cooperation over these domains is exceptionally difficult due to divergent national interests, technological disparities, "
    "and lack of centralized enforcement. Nonetheless, landmark treaties have established conservation regimes. "
    "The 1959 Antarctic Treaty declared the continent a demilitarized zone dedicated exclusively to peaceful scientific research, "
    "banning all military activities, nuclear tests, and radioactive waste disposal. In 1991, the Madrid Protocol to the Antarctic "
    "Treaty went further, designating Antarctica as a 'natural reserve, devoted to peace and science' and placing a strict 50-year "
    "moratorium on commercial mineral mining activities. Similarly, the 1967 Outer Space Treaty declared celestial bodies the province of all humankind."
)
P15_CHAP = "Environment and Natural Resources"

add_p(make_pq(P15_CHAP, "Global Commons Definition", P15_TEXT,
    "What defines a resource domain as part of the 'Global Commons' in international relations?",
    "It lies outside the exclusive political jurisdiction and territorial sovereignty of any single state",
    ["It is owned privately by a consortium of multinational commercial banks", "It is located exclusively within the territorial boundaries of permanent UNSC members", "It is an inland agricultural lake managed by provincial municipal bodies"],
    "A", "Global commons are shared areas beyond the jurisdiction of any sovereign nation, requiring multilateral stewardship.", "Defines Global Commons."))

add_p(make_pq(P15_CHAP, "Four Global Commons Domains", P15_TEXT,
    "Which of the following correctly enumerates the four universally recognized Global Commons?",
    "The Earth's atmosphere, Antarctica, the deep ocean floor, and outer space",
    ["The Amazon rainforest, the Sahara Desert, the Himalayas, and the Mississippi River", "The Mediterranean Sea, the English Channel, Lake Baikal, and the Panama Canal", "The Panama Canal, the Suez Canal, the Strait of Malacca, and the Persian Gulf"],
    "B", "The four recognized global commons are outer space, the atmosphere, the high seas/ocean floor, and Antarctica.", "Lists the four Global Commons."))

add_p(make_pq(P15_CHAP, "1959 Antarctic Treaty Mandate", P15_TEXT,
    "Under the historic 1959 Antarctic Treaty, what core restrictions were imposed on international activities in Antarctica?",
    "Military maneuvers, establishment of military bases, nuclear detonations, and radioactive waste disposal were completely banned",
    ["All scientific research stations were prohibited permanently", "Only European states were permitted to build settlements", "The entire continent was partitioned into 12 sovereign colonies"],
    "C", "The 1959 treaty demilitarized Antarctica, banning military testing and nuclear disposal while protecting scientific research.", "Details provisions of 1959 Antarctic Treaty."))

add_p(make_pq(P15_CHAP, "1991 Madrid Protocol Moratorium", P15_TEXT,
    "What critical protection was established by the 1991 Madrid Protocol regarding Antarctica's mineral resources?",
    "A comprehensive 50-year moratorium banning all commercial mining and mineral exploitation activities",
    ["The auction of diamond mining concessions to the highest corporate bidder", "The establishment of an international oil refinery on the Ross Ice Shelf", "The complete eviction of all biological scientists from the continent"],
    "D", "The Madrid Protocol designated Antarctica a natural reserve, forbidding commercial mining operations.", "Identifies 1991 Madrid Protocol mineral mining ban."))

add_p(make_pq(P15_CHAP, "Outer Space Treaty 1967 Principle", P15_TEXT,
    "The 1967 Outer Space Treaty governing celestial bodies established which fundamental principle of international law?",
    "Outer space and celestial bodies are the 'province of all mankind' and cannot be claimed for national sovereign appropriation",
    ["Any nation landing an astronaut on Mars can claim the entire planet as sovereign property", "Private companies can station nuclear missile batteries on the Moon", "Only the two Cold War superpowers can launch satellites into Earth orbit"],
    "A", "The Outer Space Treaty bars sovereign appropriation of outer space and bans stationing weapons of mass destruction in orbit.", "Outlines 1967 Outer Space Treaty principles."))


# =================================================================================================
# PASSAGE 16: Indigenous Peoples and Natural Resources
# =================================================================================================
P16_TEXT = (
    "Across the globe, approximately 370 million indigenous people live in more than 90 countries, representing an immense tapestry "
    "of cultural diversity. The United Nations defines indigenous populations as the descendants of the original inhabitants of a "
    "geographical territory who were subsequently conquered, colonized, or marginalized by incoming settler populations. "
    "Crucially, indigenous peoples preserve distinct social, economic, cultural, and political institutions that differ sharply "
    "from dominant national societies. For centuries, indigenous communities have maintained a harmonious, symbiotic relationship "
    "with their natural ecosystems, treating land, forests, rivers, and wildlife as sacred community trusts rather than commodified assets. "
    "However, modern developmental projects—including mega-hydroelectric dams, commercial logging, open-cast mining, and corporate "
    "plantations—have systematically encroached upon their ancestral territories, displacing millions and stripping them of their "
    "means of livelihood. In September 2007, the UN General Assembly adopted the landmark Declaration on the Rights of Indigenous Peoples (UNDRIP)."
)
P16_CHAP = "Environment and Natural Resources"

add_p(make_pq(P16_CHAP, "UN Indigenous Population Estimate", P16_TEXT,
    "According to the United Nations, approximately how many indigenous people live across more than 90 countries worldwide?",
    "Around 370 million people", ["Over 2 billion people", "Less than 5 million people", "Exactly 50 million people"],
    "A", "The UN estimates the global indigenous population at over 370 million, comprising roughly 5,000 distinct groups.", "Recalls UN estimate of 370 million indigenous people."))

add_p(make_pq(P16_CHAP, "Indigenous Land Relationship", P16_TEXT,
    "How does the traditional indigenous worldview regarding natural resources contrast fundamentally with modern commercial paradigms?",
    "Indigenous peoples view land, forests, and rivers as sacred communal trusts rather than commodified exploitable assets",
    ["Indigenous peoples seek to clear-cut all forests for suburban shopping malls", "Indigenous peoples believe that all mineral deposits should be sold to foreign corporations", "Indigenous peoples reject agriculture in favour of factory automation"],
    "B", "Indigenous philosophy emphasizes ecological harmony, community stewardship, and sacred bonds with ancestral territory.", "Contrasts indigenous and commercial land relations."))

add_p(make_pq(P16_CHAP, "Primary Threat to Indigenous Survival", P16_TEXT,
    "What has been the primary contemporary threat endangering the survival and livelihoods of indigenous communities worldwide?",
    "Encroachment on ancestral habitats by state-sponsored mega-dams, commercial mining, and corporate deforestation",
    ["The expansion of free public libraries and municipal parks", "The worldwide distribution of solar-powered water purifiers", "The introduction of international sports leagues"],
    "C", "Extractive resource projects and infrastructure developments have driven mass displacement of indigenous populations.", "Identifies commercial encroachment and displacement threats."))

add_p(make_pq(P16_CHAP, "UNDRIP Adoption Year", P16_TEXT,
    "In which year did the United Nations General Assembly adopt the landmark Declaration on the Rights of Indigenous Peoples (UNDRIP)?",
    "September 2007", ["June 1992", "October 1945", "December 1980"],
    "D", "UNDRIP was adopted on 13 September 2007, enshrining indigenous rights to self-determination, culture, and ancestral lands.", "Identifies September 2007 for UNDRIP adoption."))

add_p(make_pq(P16_CHAP, "Indigenous Rights in India", P16_TEXT,
    "In the Indian constitutional framework, the social categories that correspond most closely to global indigenous populations are:",
    "Scheduled Tribes (Adivasis)", ["Scheduled Castes (Dalits)", "Other Backward Classes (OBCs)", "Linguistic Minorities"],
    "A", "India's Scheduled Tribes (Adivasis), comprising over 8% of the national population, correspond to indigenous peoples.", "Identifies Scheduled Tribes/Adivasis in India."))


# =================================================================================================
# PASSAGE 17: Economic Globalisation and Its Critics
# =================================================================================================
P17_TEXT = (
    "Economic globalisation involves the intensification of cross-border flows of capital, commodities, services, and technology, "
    "facilitated by revolutionary advances in transportation and communication networks. Championed by powerful international institutions "
    "like the International Monetary Fund, the World Bank, and the World Trade Organization, economic globalisation has dismantled tariff "
    "barriers, deregulated financial markets, and promoted privatization of public enterprises. Advocates claim that this integration "
    "fosters greater economic efficiency, increases consumer choice, and boosts overall global wealth. However, economic globalisation "
    "has faced ferocious criticism from diverse ideological quarters. Critics from the Left argue that it creates a predatory form of "
    "corporate capitalism that enriches a tiny corporate elite while disempowering labor, worsening wealth inequality, and eroding "
    "the state's social welfare safety nets. Conversely, critics from the Right express deep anxiety that economic globalisation "
    "compromises national sovereignty, destroys domestic local manufacturing, and makes countries dangerously vulnerable to foreign shocks."
)
P17_CHAP = "Globalisation"

add_p(make_pq(P17_CHAP, "Economic Globalisation Core Definition", P17_TEXT,
    "Economic globalisation is fundamentally defined by the acceleration and deepening of cross-border flows of:",
    "Capital, commodities, services, technologies, and financial investments",
    ["Sovereign armies, military ordnance, and nuclear warships exclusively", "Government spies and intelligence wiretaps", "Passports, visas, and national identity cards exclusively"],
    "A", "Economic globalisation centers on international flows of capital, goods, services, and intellectual property.", "Defines core flows of economic globalisation."))

add_p(make_pq(P17_CHAP, "Left-Wing Critique of Neoliberalism", P17_TEXT,
    "What is the central grievance articulated by Left-wing critics against neoliberal economic globalisation?",
    "It concentrates wealth among multinational corporate elites while dismantling state social welfare protections for the poor",
    ["It forces all corporations to give away 90% of their profits to charitable foundations", "It bans all private international travel for working-class citizens", "It makes national defense spending completely unconstitutional"],
    "B", "Left critics argue that neoliberal policies weaken labor rights, deepen inequality, and gut public healthcare and food subsidies.", "Outlines Left-wing critique of economic globalisation."))

add_p(make_pq(P17_CHAP, "Right-Wing Critique of Globalisation", P17_TEXT,
    "What is the primary concern raised by political and economic critics from the Right against rapid globalisation?",
    "The erosion of national sovereignty, destruction of local domestic industries, and vulnerability to external economic shocks",
    ["The excessive empowerment of national labor unions and peasant collectives", "The total abolition of private property across urban centers", "The enforcement of universal Sanskrit education across foreign nations"],
    "C", "Right-wing critics worry about diminished sovereign control, loss of cultural integrity, and de-industrialization of local manufacturing.", "Outlines Right-wing critique of economic globalisation."))

add_p(make_pq(P17_CHAP, "State Capacity Globalisation Impact", P17_TEXT,
    "How has economic globalisation fundamentally transformed the role of the modern nation-state?",
    "The state has retreated from direct welfare provisioning and production, assuming a minimalist regulatory role to facilitate market operations",
    ["The state has nationalised all retail grocery shops and farmland", "The state has completely abolished the police force and legal courts", "The state now provides 100% of employment in the national economy"],
    "D", "Globalisation prompts states to adopt minimalist regulatory postures, stepping back from social welfare functions.", "Details changing role of state under globalisation."))

add_p(make_pq(P17_CHAP, "Institutions Propelling Globalisation", P17_TEXT,
    "Which trio of international economic institutions has played the dominant institutional role in driving global trade liberalization?",
    "The International Monetary Fund (IMF), the World Bank, and the World Trade Organization (WTO)",
    ["The International Court of Justice, INTERPOL, and Amnesty International", "The Warsaw Pact, COMECON, and the Comintern", "The International Red Cross, Greenpeace, and Doctors Without Borders"],
    "A", "The IMF, World Bank, and WTO constitute the institutional triumvirate governing global trade and financial liberalisation.", "Identifies IMF, World Bank, and WTO as drivers of globalisation."))


# =================================================================================================
# PASSAGE 18: Cultural Consequences: Homogenisation vs Heterogenisation
# =================================================================================================
P18_TEXT = (
    "The cultural dimension of globalisation is one of its most visible and intensely contested aspects, operating through two "
    "seemingly contradictory processes: cultural homogenisation and cultural heterogenisation. Cultural homogenisation refers to "
    "the rise of a uniform, standardized global culture heavily shaped by the dominance of Western, particularly American, commercial "
    "values, consumption patterns, and entertainment media. Often described pejoratively as 'McDonaldisation' or American cultural "
    "imperialism, this process threatens to erode indigenous traditions, local languages, and regional art forms. However, globalisation "
    "does not merely lead to cultural erasure. Cultural heterogenisation occurs when external cultural elements interact with local "
    "traditions, producing innovative hybrid forms that celebrate cultural diversity. When American blue jeans are paired with an "
    "Indian embroidered Kurta, neither culture is obliterated; rather, a distinctive synthesis emerges. Globalisation expands the "
    "range of cultural choices available to individuals, even as it generates anxieties regarding cultural identity."
)
P18_CHAP = "Globalisation"

add_p(make_pq(P18_CHAP, "Cultural Homogenisation Definition", P18_TEXT,
    "In the study of globalisation, the concept of 'Cultural Homogenisation' describes:",
    "The emergence of a uniform, standardized global culture heavily dominated by Western consumer lifestyles",
    ["The preservation of isolated tribal languages in mountain sanctuaries", "The complete legal prohibition of foreign cinema and literature", "The compulsory conversion of all citizens to a single world religion"],
    "A", "Cultural homogenisation refers to the spread of uniform Western consumer habits that flatten indigenous diversity.", "Defines cultural homogenisation."))

add_p(make_pq(P18_CHAP, "McDonaldisation Concept Meaning", P18_TEXT,
    "The popular term 'McDonaldisation' is employed by social theorists to illustrate:",
    "The worldwide spread of standardized, fast-food consumer habits and corporate values reflecting American cultural hegemony",
    ["The mandatory provision of free burgers to primary school students", "The agricultural conversion of all wheat fields into hamburger pastures", "The global unionization of restaurant service employees"],
    "B", "McDonaldisation symbolizes the global standardization of lifestyle, food consumption, and corporate commercial values.", "Explains the term McDonaldisation."))

add_p(make_pq(P18_CHAP, "Cultural Heterogenisation Mechanism", P18_TEXT,
    "How does 'Cultural Heterogenisation' challenge the pessimistic assumption that globalisation solely imposes Western uniformity?",
    "By demonstrating that external cultural influences are modified and hybridized by local cultures, producing rich cultural synthesis",
    ["By legally banning all foreign cultural imports and internet access", "By demonstrating that Western nations adopt 100% of Asian religious practices", "By showing that all television channels broadcast identical programming worldwide"],
    "C", "Cultural heterogenisation shows that local cultures actively borrow, adapt, and recombine global influences into unique hybrids.", "Explains cultural heterogenisation and hybridity."))

add_p(make_pq(P18_CHAP, "Kurta over Jeans Cultural Synthesis", P18_TEXT,
    "The contemporary practice of wearing an Indian khadi kurta over American denim jeans is cited by sociologists as a prime example of:",
    "Cultural hybridity and creative heterogenisation emerging from global intercultural interaction",
    ["A complete surrender to foreign cultural imperialism", "An unconstitutional violation of domestic clothing guidelines", "A return to pre-colonial medieval dress codes"],
    "D", "Kurta over jeans represents creative cultural hybridity, blending global apparel with indigenous traditional wear.", "Identifies cultural hybridity in fashion."))

add_p(make_pq(P18_CHAP, "Net Impact Cultural Globalisation", P18_TEXT,
    "According to the passage, the net effect of cultural globalisation on everyday human life is that:",
    "It broadens human choices and generates vibrant cultural fusions while simultaneously prompting protective cultural identity assertions",
    ["It has eliminated all cultural differences across all seven continents", "It has forced all human beings to speak only the English language", "It has caused the complete extinction of all traditional cooking techniques"],
    "A", "Cultural globalisation expands cultural exposure and hybridity while triggering defensive identity assertions against homogenization.", "Summarizes the net impact of cultural globalisation."))


# =================================================================================================
# PASSAGE 19: The World Social Forum and Resistance to Neoliberalism
# =================================================================================================
P19_TEXT = (
    "Resistance to corporate-led globalisation has mobilized a vast, transnational coalition of social movements, trade unions, "
    "environmental activists, indigenous organisations, and human rights defenders. The most prominent international institutional "
    "platform for this counter-hegemonic mobilization is the World Social Forum (WSF). Conceived as a democratic counterweight to the "
    "elite, corporate-dominated World Economic Forum (WEF) that gathers annual business titans in Davos, Switzerland, the WSF convened "
    "its inaugural meeting in January 2001 in Porto Alegre, Brazil. Bringing together over 12,000 delegates from across the world under "
    "the resonant, defiant banner: 'Another World is Possible', the WSF established an open, participatory arena to articulate "
    "alternatives to neoliberal deregulation, privatization, and austerity. The forum champions environmental justice, labor rights, "
    "gender equality, and democratic sovereignty over global finance. Demonstrating its truly global reach, the fourth WSF was held "
    "in Mumbai, India, in January 2004, drawing over 100,000 participants and cementing South Asian solidarity against corporate exploitation."
)
P19_CHAP = "Globalisation"

add_p(make_pq(P19_CHAP, "WSF Famous Slogan", P19_TEXT,
    "What is the famous, inspiring rallying slogan of the World Social Forum (WSF) proclaiming the feasibility of alternative models of development?",
    "'Another World is Possible'", ["'Greed is Good'", "'Workers of the World Disarm'", "'Free Markets for All'"],
    "A", "'Another World is Possible' is the official motto and defining battle cry of the World Social Forum.", "Identifies WSF slogan 'Another World is Possible'."))

add_p(make_pq(P19_CHAP, "First WSF Venue and Year", P19_TEXT,
    "Where and in which year did the World Social Forum (WSF) convene its inaugural global gathering?",
    "Porto Alegre, Brazil in January 2001",
    ["Davos, Switzerland in January 1990", "Seattle, United States in November 1999", "New Delhi, India in August 1995"],
    "B", "The first World Social Forum was hosted in the participatory democratic city of Porto Alegre, Brazil, in January 2001.", "Identifies Porto Alegre, Brazil in 2001 as first WSF venue."))

add_p(make_pq(P19_CHAP, "WEF vs WSF Divergence", P19_TEXT,
    "How does the World Social Forum (WSF) fundamentally distinguish itself from the World Economic Forum (WEF) held annually in Davos?",
    "The WSF is a grassroots civil society platform resisting neoliberalism, whereas the WEF gathers global corporate, banking, and political elites",
    ["The WSF is exclusively for military generals, while the WEF is for environmental scientists", "The WSF is funded by multinational oil cartels, while the WEF is funded by trade unions", "The WSF is a secret armed underground organization, while the WEF is an open student club"],
    "C", "The WSF represents people's movements and civil society resisting corporate globalisation, unlike the elite Davos WEF.", "Contrasts WSF and WEF."))

add_p(make_pq(P19_CHAP, "WSF Mumbai 2004", P19_TEXT,
    "In January 2004, the Fourth World Social Forum was held with tremendous international participation in which Indian metropolis?",
    "Mumbai", ["New Delhi", "Kolkata", "Bengaluru"],
    "D", "The 4th WSF was hosted in Mumbai in January 2004, bringing together over 100,000 activists, Dalits, workers, and peasants.", "Identifies Mumbai as venue of 4th WSF in 2004."))

add_p(make_pq(P19_CHAP, "Coalition Composing WSF", P19_TEXT,
    "The World Social Forum brings together which broad spectrum of civil society movements under a unified platform?",
    "Trade unionists, environmentalists, feminists, indigenous leaders, and anti-neoliberal activists",
    ["Billionaire investment bankers and private equity fund managers exclusively", "Military generals from NATO member nations exclusively", "Ministers of commerce from G7 industrialized states"],
    "A", "The WSF unites grassroots movements spanning labor, environmentalism, feminism, indigenous rights, and human rights.", "Lists movements composing the WSF."))


# =================================================================================================
# PASSAGE 20: India's Economic Integration and Globalisation
# =================================================================================================
P20_TEXT = (
    "In the summer of 1991, India stood at the precipice of an unprecedented economic catastrophe: foreign exchange reserves had "
    "plummeted to barely two weeks of essential imports, inflation was raging in double digits, and the fiscal deficit was unsustainable. "
    "In response, the newly sworn-in government of Prime Minister P.V. Narasimha Rao, with Dr. Manmohan Singh as Finance Minister, "
    "unveiled the pathbreaking New Economic Policy (NEP). Marking a decisive departure from four decades of Fabian socialism and "
    "the restrictive 'License-Permit-Quota Raj', India embraced the triad of Liberalisation, Privatisation, and Globalisation (LPG). "
    "The government dismantled industrial licensing, slashed custom duties, devalued the rupee to boost exports, and welcomed foreign direct "
    "investment. This strategic integration transformed India into one of the world's most dynamic emerging economies, spawning a globally "
    "dominant Information Technology (IT) services industry. However, the benefits of globalisation have remained deeply uneven: while "
    "urban services flourished, the agrarian sector experienced acute distress, regional disparities widened, and the informalisation of labor intensified."
)
P20_CHAP = "Globalisation"

add_p(make_pq(P20_CHAP, "1991 Crisis Trigger", P20_TEXT,
    "What was the acute macroeconomic emergency in 1991 that compelled India to initiate sweeping economic reforms?",
    "A catastrophic balance-of-payments crisis with foreign exchange reserves depleted to barely two weeks of essential imports",
    ["A total collapse of all agricultural production due to a nationwide snowfall", "An economic blockade imposed by the United Nations Security Council", "The complete nationalisation of all foreign embassies in New Delhi"],
    "A", "Depleted forex reserves, high inflation, and oil price spikes forced India to reform its macroeconomic architecture.", "Identifies 1991 balance-of-payments crisis trigger."))

add_p(make_pq(P20_CHAP, "LPG Model Leadership 1991", P20_TEXT,
    "The historic New Economic Policy of 1991 embodying the LPG model was architected under the leadership of which Prime Minister and Finance Minister?",
    "Prime Minister P.V. Narasimha Rao and Finance Minister Dr. Manmohan Singh",
    ["Prime Minister Rajiv Gandhi and Finance Minister V.P. Singh", "Prime Minister Atal Bihari Vajpayee and Finance Minister Yashwant Sinha", "Prime Minister Indira Gandhi and Finance Minister Pranab Mukherjee"],
    "B", "Prime Minister P.V. Narasimha Rao and Finance Minister Dr. Manmohan Singh steered India through the 1991 economic reforms.", "Identifies Rao and Manmohan Singh as architects of 1991 reforms."))

add_p(make_pq(P20_CHAP, "Dismantling License Raj", P20_TEXT,
    "What was a principal structural measure enacted under the 1991 reforms to unleash domestic industrial growth?",
    "The abolition of industrial licensing across most sectors, ending the restrictive 'License-Permit-Quota Raj'",
    ["The mandatory takeover of all private corporations by state bureaucracies", "A complete legal ban on any foreign commercial trade", "The replacement of paper currency with gold barter"],
    "C", "Abolishing licensing allowed private enterprise to expand without arbitrary bureaucratic hurdles and state rationing.", "Explains dismantling of License-Permit Raj."))

add_p(make_pq(P20_CHAP, "Indian IT Sector Global Dominance", P20_TEXT,
    "Which sector of the Indian economy experienced explosive growth and achieved international acclaim following the post-1991 integration into globalisation?",
    "The Information Technology (IT), software development, and business process outsourcing (BPO) sector",
    ["The manufacturing of commercial passenger supersonic aircraft", "The extraction of Antarctic petroleum resources", "The export of nuclear submarines to North America"],
    "D", "India's English-speaking engineering talent made the IT/software export sector a global powerhouse post-1991.", "Identifies Indian IT sector success under globalisation."))

add_p(make_pq(P20_CHAP, "Uneven Fallout of Indian Globalisation", P20_TEXT,
    "According to the passage, what has been a significant socio-economic criticism regarding the uneven distribution of post-1991 growth in India?",
    "Persistent distress in the agricultural sector, widening regional inequalities, and the precarious informalisation of the labor force",
    ["A total freeze on all university education across southern states", "The complete elimination of private property rights for urban citizens", "A decline in national literacy rates from 80% to zero"],
    "A", "While services and urban tech boomed, agriculture stagnated, creating farmer distress, informal work, and regional disparities.", "Outlines negative socio-economic fallout of Indian reforms."))


# Save Passages Part 1 to disk
with open("mock/pol_units/passages_part1.json", "w", encoding="utf-8") as f:
    json.dump(passages_part1, f, indent=2, ensure_ascii=False)

print(f"SUCCESS: Generated and validated all 20 passages (100 questions) in mock/pol_units/passages_part1.json")
