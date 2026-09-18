import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.pol_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, make_multi_statement_question,
    rotate_options, normalize_text, get_pyq_normalized_set
)

pyq_seen = get_pyq_normalized_set()
global_seen = set()

def validate_and_collect(q_list, target_seen):
    for q in q_list:
        norm = normalize_text(q["questionText"])
        if norm in target_seen:
            raise ValueError(f"Duplicate within unit: {q['questionText'][:80]}")
        if norm in global_seen:
            raise ValueError(f"Cross-unit duplicate: {q['questionText'][:80]}")
        if norm in pyq_seen:
            raise ValueError(f"PYQ duplicate: {q['questionText'][:80]}")
        target_seen.add(norm)
        global_seen.add(norm)
        assert len(q["options"]) == 4
        assert q["correctOption"] in ["A", "B", "C", "D"]
        assert any(opt["id"] == q["correctOption"] and opt["isCorrect"] for opt in q["options"])
        assert q["detailedSolution"]

# =================================================================================================
# UNIT 1: The End of Bipolarity (60 Questions)
# =================================================================================================
CHAPTER_U1 = "The End of Bipolarity"
u1_qs = []
u1_seen = set()

def add_u1(q):
    u1_qs.append(q)

# 1. Soviet System Characteristics
opts, c, s = rotate_options(
    "State ownership and control over all means of production with no private property",
    ["Dominance of multi-party competitive parliamentary democracy", "Free market laissez-faire economy guided by consumer demand", "Equal membership in the North Atlantic Treaty Organization"],
    "A",
    "The Soviet socialist system was founded on the ideology of socialism, opposing capitalism and advocating the abolition of private property. All land and productive assets were owned and controlled by the Soviet state.\nHence, Option {{CORR}} is correct.",
    "Correctly identifies state ownership and absence of private property in the Soviet model."
)
add_u1(make_question(CHAPTER_U1, "Soviet System", "Which of the following was a defining feature of the political and economic system of the Soviet Union?", opts, c, s))

opts, c, s = rotate_options(
    "1985",
    ["1979", "1982", "1991"],
    "B",
    "Mikhail Gorbachev became the General Secretary of the Communist Party of the Soviet Union in 1985 and initiated the reform policies of Perestroika (restructuring) and Glasnost (openness).\nHence, Option {{CORR}} is correct.",
    "Identifies 1985 as the year Gorbachev took charge."
)
add_u1(make_question(CHAPTER_U1, "Gorbachev Reforms", "In which year did Mikhail Gorbachev become the General Secretary of the Communist Party of the Soviet Union?", opts, c, s))

opts, c, s = rotate_options(
    "9 November 1989",
    ["15 August 1989", "25 December 1991", "3 October 1990"],
    "C",
    "The Berlin Wall, which had stood for 28 years symbolizing the Cold War division, was toppled by the people of East Germany on 9 November 1989. Germany was formally reunified in October 1990.\nHence, Option {{CORR}} is correct.",
    "Identifies 9 November 1989 as the date the Berlin Wall fell."
)
add_u1(make_question(CHAPTER_U1, "Fall of Berlin Wall", "On which exact date was the historic Berlin Wall toppled by the people of Germany, marking the beginning of the collapse of the communist bloc?", opts, c, s))

opts, c, s = rotate_options(
    "Russia, Ukraine, and Belarus",
    ["Kazakhstan, Uzbekistan, and Turkmenistan", "Georgia, Armenia, and Azerbaijan", "Estonia, Latvia, and Lithuania"],
    "D",
    "In December 1991, under the leadership of Boris Yeltsin, Russia, Ukraine, and Belarus declared that the Soviet Union was disbanded.\nHence, Option {{CORR}} is correct.",
    "Identifies Russia, Ukraine, and Belarus as the three founding Slavic republics that disbanded the USSR."
)
add_u1(make_question(CHAPTER_U1, "Disintegration of USSR", "In December 1991, under the leadership of Boris Yeltsin, which three major republics announced the formal disbanding of the Soviet Union?", opts, c, s))

# Match question 1
add_u1(make_match_question(
    CHAPTER_U1, "Soviet Leaders and Treaties",
    "Match List I (Leaders/Concepts) with List II (Associated Historical Events):",
    [("A", "Mikhail Gorbachev"), ("B", "Boris Yeltsin"), ("C", "Nikita Khrushchev"), ("D", "Leonid Brezhnev")],
    [("I", "Deployed Soviet nuclear missiles in Cuba during 1962 crisis"), ("II", "First popularly elected President of the Russian Federation"), ("III", "Introduced Glasnost and Perestroika reforms"), ("IV", "Invasion of Afghanistan and Brezhnev Doctrine of limited sovereignty")],
    "A-III, B-II, C-I, D-IV", "A",
    "Gorbachev introduced Glasnost and Perestroika; Yeltsin emerged as a popular hero opposing the 1991 coup and became Russian President; Khrushchev deployed missiles to Cuba in 1962; Brezhnev presided over stagnation and the 1979 Afghan intervention.",
    "Correctly links Soviet leaders to their hallmark historical events."
))

# Chronology question 1
add_u1(make_sequence_question(
    CHAPTER_U1, "Cold War and Soviet Collapse",
    "Arrange the following events of the Cold War and Soviet disintegration in chronological order:",
    [("A", "Fall of the Berlin Wall"), ("B", "Soviet intervention in Afghanistan"), ("C", "Alma-Ata Declaration establishing the CIS"), ("D", "Mikhail Gorbachev becomes General Secretary of CPSU")],
    "B, D, A, C", "B",
    "1. Soviet invasion of Afghanistan occurred in 1979 (B).\n2. Gorbachev became CPSU General Secretary in 1985 (D).\n3. Berlin Wall fell on 9 November 1989 (A).\n4. Alma-Ata Declaration was signed on 21 December 1991 (C).",
    "Arranges Cold War and Soviet dissolution events in chronological order."
))

# Statement question 1
add_u1(make_statement_question(
    CHAPTER_U1, "Shock Therapy",
    "Shock therapy involved an immediate shift to free trade and foreign direct investment in post-communist republics.",
    "Under Shock therapy, the state-directed collective farming system was immediately replaced by a thriving indigenous network of private cooperative banks.",
    3, "C",
    "Statement I is correct: Shock therapy entailed sudden trade liberalisation and opening up to FDI. Statement II is incorrect: The dismantling of state farming led to an acute food crisis and reliance on food imports rather than thriving cooperative banks.",
    "Evaluates the socio-economic reality of Shock Therapy transition."
))

# Assertion Reason 1
add_u1(make_assertion_question(
    CHAPTER_U1, "Disintegration Causes",
    "The rise of nationalism and the desire for sovereignty within various republics of the USSR was the final and most immediate cause for the disintegration of the USSR.",
    "Nationalist sentiments and desire for independence were strongest not in the Central Asian republics, but in Russia and the Baltic republics (Estonia, Latvia, Lithuania) as well as Ukraine and Georgia.",
    2, "B",
    "Both Assertion and Reason are true facts from NCERT. Assertion identifies nationalism as the immediate catalyst of collapse. Reason correctly notes that Baltic republics and Slavic nations spearheaded the breakaway while Central Asian republics wanted to stay within the federation, but Reason does not explain the psychological origin of why nationalism arose.",
    "Distinguishes causal explanation from concurrent historical facts regarding Soviet nationalism."
))

# Multi statement 1
add_u1(make_multi_statement_question(
    CHAPTER_U1, "Post-Soviet Conflicts",
    "Which of the following statements are correct regarding conflicts in the post-Soviet republics?",
    [
        ("A", "In Russia, two republics, Chechnya and Dagestan, experienced violent secessionist movements."),
        ("B", "Tajikistan witnessed a brutal civil war that lasted for almost ten years until 2001."),
        ("C", "In Azerbaijan, the province of Nagorno-Karabakh witnessed conflict as local Armenians wanted to join Armenia."),
        ("D", "Central Asian republics completely avoided any ethnic clashes or competition over water resources.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B), (C) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements A, B, and C are correct per NCERT. Statement D is false because Central Asia had severe conflicts over water and ethnic clashes in the Fergana Valley.",
    "Identifies ethnic and territorial conflicts across post-Soviet Eurasia."
))

opts, c, s = rotate_options(
    "Alma-Ata Declaration of 21 December 1991",
    ["Warsaw Pact Treaty of 1955", "Helsinki Accords of 1975", "Brest-Litovsk Accord of 1918"],
    "C",
    "The Alma-Ata Declaration was signed on 21 December 1991 by 11 post-Soviet republics, creating the Commonwealth of Independent States (CIS) and formally superseding the Soviet Union.\nHence, Option {{CORR}} is correct.",
    "Identifies the Alma-Ata Declaration of 1991."
)
add_u1(make_question(CHAPTER_U1, "Commonwealth of Independent States", "Which declaration signed by 11 post-Soviet republics in December 1991 confirmed the creation of the Commonwealth of Independent States (CIS)?", opts, c, s))

# Let's generate remaining questions for Unit 1 across all subtopics systematically
u1_subtopics = [
    ("Shock Therapy Consequences", "The auctioning of valuable state-controlled industrial enterprises at throwaway prices under Shock Therapy is historically referred to as:",
     "The largest garage sale in history", ["The Great Leap Forward", "The Marshall Plan", "The New Deal auction"], "D",
     "The voucher privatisation in Russia under Shock Therapy led to about 90% of state-owned enterprises being sold off cheaply to private individuals, famously dubbed 'the largest garage sale in history'.", "Identifies 'largest garage sale in history'."),
    ("Soviet Economy", "Which among the following was NOT a feature of the Soviet economic model after the Second World War?",
     "Extensive dependence on Western foreign capital and multinational corporations", ["Vast energy resources including iron, steel, and oil", "A complex communications and transport network connecting remote areas", "Domestic consumer industry producing everything from pins to cars"], "A",
     "The Soviet economy was autarkic and state-run; it did not depend on Western MNCs or foreign capital investments.", "Eliminates Western MNC dependence as non-Soviet."),
    ("Indo-Russian Relations", "In which year did India and Russia sign the landmark 'Declaration on India-Russia Strategic Partnership', institutionalising annual summit meetings?",
     "2001", ["1991", "1998", "2010"], "B",
     "The Declaration on Strategic Partnership between India and the Russian Federation was signed in October 2000/2001 during President Vladimir Putin's state visit to New Delhi.", "Identifies 2001 Strategic Partnership agreement."),
    ("Disintegration Timeline", "Which was the first Soviet republic to declare its independence from the Soviet Union in March 1990?",
     "Lithuania", ["Ukraine", "Belarus", "Uzbekistan"], "A",
     "Lithuania declared its independence from the Soviet Union in March 1990, becoming the pioneer of the Baltic independence movement.", "Identifies Lithuania as first to declare independence."),
    ("Soviet System Structure", "The military alliance created by the Soviet Union in 1955 to counter NATO was known as:",
     "Warsaw Pact", ["COMECON", "Comintern", "SEATO"], "C",
     "The Warsaw Pact was established in 1955 by the Soviet Union and its Eastern European satellite states as a collective defense treaty countering NATO.", "Identifies Warsaw Pact."),
    ("Gorbachev Reforms", "The Russian terms 'Glasnost' and 'Perestroika' introduced by Mikhail Gorbachev literally translate to:",
     "Openness and Restructuring", ["Revolution and Discipline", "Privatisation and Industrialisation", "Socialism and Collectivism"], "B",
     "Glasnost means 'openness' (freedom of speech, press transparency) and Perestroika means 'restructuring' of the economic and political system.", "Translates Glasnost and Perestroika accurately."),
    ("Central Asian Geopolitics", "Which region in Russia saw massive bombings and human rights violations following military actions to suppress secessionist rebels?",
     "Chechnya", ["Siberia", "Kamchatka", "Vladivostok"], "D",
     "Chechnya and Dagestan witnessed intense secessionist fighting with Russian armed forces engaging in heavy air bombardment and ground campaigns.", "Identifies Chechnya in Russian counter-insurgency."),
    ("Indo-Russian Defense", "Which Russian nuclear submarine was leased to the Indian Navy, illustrating deep bilateral defense cooperation?",
     "INS Chakra", ["INS Vikrant", "INS Arihant", "INS Viraat"], "A",
     "Russia leased nuclear-powered attack submarines (INS Chakra) to the Indian Navy, demonstrating a defense relationship unmatched by other powers.", "Identifies INS Chakra as leased from Russia."),
    ("Shock Therapy Currency", "What happened to the Russian currency, the Rouble, as an immediate consequence of Shock Therapy in 1992?",
     "It suffered a dramatic devaluation, leading to hyperinflation and wiping out citizen savings", ["It replaced the US Dollar as the international reserve currency", "It remained completely stable due to high gold reserves", "It was pegged at a fixed 1:1 ratio with the Deutsche Mark"], "B",
     "The value of the rouble collapsed precipitously, resulting in rampant hyperinflation that wiped out the lifetime savings of ordinary Russian citizens.", "Identifies rouble collapse and hyperinflation.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u1_subtopics:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u1(make_question(CHAPTER_U1, topic, stem, opts, c, s))

# Match questions for Unit 1
add_u1(make_match_question(
    CHAPTER_U1, "Post-Soviet Republics and Issues",
    "Match List I (Post-Soviet Region) with List II (Associated Conflict/Feature):",
    [("A", "Tajikistan"), ("B", "Nagorno-Karabakh"), ("C", "Chechnya"), ("D", "Georgia")],
    [("I", "Civil war lasting for nearly a decade until 2001"), ("II", "Armenian ethnic enclave within Azerbaijan desiring merger"), ("III", "Violent secessionist movement against Moscow"), ("IV", "Civil conflict leading to breakaway regions of Abkhazia and South Ossetia")],
    "A-I, B-II, C-III, D-IV", "A",
    "Tajikistan suffered a 10-year civil war; Nagorno-Karabakh is an Armenian enclave in Azerbaijan; Chechnya fought for independence from Russia; Georgia saw secession in Abkhazia and South Ossetia.",
    "Matches post-Soviet conflict hotspots with accurate political developments."
))

add_u1(make_match_question(
    CHAPTER_U1, "Treaties and Summits",
    "Match List I (Treaty/Accord) with List II (Significance/Year):",
    [("A", "Warsaw Pact Dissolution"), ("B", "Reunification of Germany"), ("C", "Baltic Republics UN Admission"), ("D", "Disintegration of USSR")],
    [("I", "July 1991"), ("II", "October 1990"), ("III", "September 1991"), ("IV", "December 1991")],
    "A-I, B-II, C-III, D-IV", "B",
    "Warsaw Pact was formally dissolved in July 1991; German reunification occurred in October 1990; Estonia, Latvia, and Lithuania joined the UN in September 1991; USSR was dissolved in December 1991.",
    "Chronologically matches key transition dates of the 1990-1991 period."
))

# Chronology questions
add_u1(make_sequence_question(
    CHAPTER_U1, "Disintegration Sequence",
    "Arrange the following historical milestones of Soviet disintegration in chronological order:",
    [("A", "Boris Yeltsin resigns from the Communist Party"), ("B", "Mikhail Gorbachev elected CPSU General Secretary"), ("C", "Lithuania becomes first Soviet republic to declare independence"), ("D", "Gorbachev resigns as President of the USSR")],
    "B, A, C, D", "C",
    "1. Gorbachev elected General Secretary (March 1985).\n2. Yeltsin resigns from the Communist Party (July 1990).\n3. Lithuania declares independence (March 1990 / recognized later in 1991).\n4. Gorbachev resigns as USSR President (25 December 1991).",
    "Correctly sequences the major milestones of Gorbachev's tenure and Soviet dissolution."
))

add_u1(make_sequence_question(
    CHAPTER_U1, "Cold War Climax",
    "Arrange the following events in correct chronological sequence:",
    [("A", "Soviet invasion of Czechoslovakia"), ("B", "Construction of the Berlin Wall"), ("C", "Soviet military intervention in Afghanistan"), ("D", "Signing of the Strategic Arms Reduction Treaty (START I)")],
    "B, A, C, D", "D",
    "1. Construction of Berlin Wall (August 1961).\n2. Warsaw Pact invasion of Czechoslovakia / Prague Spring (August 1968).\n3. Soviet intervention in Afghanistan (December 1979).\n4. START I treaty signed by Gorbachev and Bush (July 1991).",
    "Sequences Cold War milestones chronologically."
))

# Statements questions
add_u1(make_statement_question(
    CHAPTER_U1, "Democratic Transition",
    "The constitutions of post-Soviet Central Asian republics concentrated overwhelming executive power in the hands of the President.",
    "In countries like Turkmenistan and Uzbekistan, the presidents appointed themselves for extended terms and allowed zero political opposition.",
    1, "A",
    "Both Statement I and Statement II are correct. In Central Asia, the presidents arrogated wide authoritarian powers, often extending their mandates for 10 to 20 years without permitting viable opposition parties.",
    "Correctly evaluates post-Soviet governance models in Central Asia."
))

add_u1(make_statement_question(
    CHAPTER_U1, "Indian Foreign Policy Post-Cold War",
    "India maintained close strategic, defense, and economic ties with Russia even after the collapse of the Soviet Union.",
    "Russia refused to assist India's cryogenic rocket program due to unconditional obedience to American sanctions.",
    3, "C",
    "Statement I is correct. Statement II is incorrect because although the cryogenic engine technology transfer faced American pressure, Russia remained India's steadfast space and nuclear energy partner, delivering engines and assisting the Kudankulam project.",
    "Distinguishes core Indo-Russian strategic cooperation facts."
))

# Assertion Reason questions
add_u1(make_assertion_question(
    CHAPTER_U1, "Shock Therapy Appraisal",
    "Shock therapy brought immense prosperity, industrial modernization, and strong social safety nets to Russia within three years.",
    "Shock therapy completely dismantled the state welfare system, leading to widespread poverty, inflation, and the emergence of a criminal mafia.",
    4, "D",
    "Assertion (A) is false: Shock therapy was an economic disaster for the Russian populace. Reason (R) is true: The safety net was destroyed, leaving millions in poverty and concentrating wealth in the hands of oligarchs.",
    "Recognizes the socio-economic devastation caused by Shock Therapy."
))

add_u1(make_assertion_question(
    CHAPTER_U1, "Soviet Autocracy",
    "The Soviet political system became intensely bureaucratic and authoritarian over the decades.",
    "The Communist Party of the Soviet Union exercised tight monopoly over political power and refused to recognize the people's aspirations for autonomy.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains why the system grew authoritarian—the single-party monopoly eliminated all institutional accountability and citizen voice.",
    "Links Soviet institutional authoritarianism with party monopoly."
))

# Multi statement questions
add_u1(make_multi_statement_question(
    CHAPTER_U1, "Soviet Welfare Features",
    "Which of the following were guaranteed to citizens under the Soviet state welfare model?",
    [
        ("A", "Subsidised basic necessities including healthcare, education, and childcare"),
        ("B", "Total absence of unemployment with state guaranteeing employment to all"),
        ("C", "Extensive freedom of political speech and uncensored private media"),
        ("D", "Universal minimum standard of living ensured by the government")
    ],
    "(A), (B) and (D) only",
    ["(A) and (C) only", "(B) and (C) only", "(A), (B), (C) and (D)"],
    "B",
    "A, B, and D are true welfare guarantees of the Soviet state. C is false because political speech was heavily censored and private media was strictly prohibited.",
    "Distinguishes Soviet economic welfare guarantees from political censorship."
))

add_u1(make_multi_statement_question(
    CHAPTER_U1, "Disintegration Consequences",
    "Which of the following were major consequences of the disintegration of the Soviet Union?",
    [
        ("A", "End of Cold War ideological confrontations between capitalism and socialism"),
        ("B", "Change in the global power balance, leading to a unipolar world dominated by the US"),
        ("C", "Emergence of numerous new sovereign nation-states in Eastern Europe and Central Asia"),
        ("D", "Immediate revitalisation of the Warsaw Pact under Russian command")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B), (C) and (D) only", "(A), (B), (C) and (D)"],
    "C",
    "Statements A, B, and C are major direct consequences of Soviet collapse. Statement D is completely false because the Warsaw Pact was dissolved in July 1991 and never revived.",
    "Identifies global structural changes caused by the end of bipolarity."
))

# Additional direct MCQs for Unit 1 to reach 60 questions
u1_direct_data = [
    ("Soviet Resources", "Which natural resource formed the backbone of the Soviet Union's energy exports to both Eastern Europe and world markets?",
     "Oil and Natural Gas", ["Coal and Uranium", "Iron Ore and Bauxite", "Hydroelectric Power"], "A",
     "Vast reserves of crude oil and natural gas across Siberia and the Volga-Urals enabled the USSR to become a premier energy exporter.", "Identifies oil and gas as Soviet energy pillars."),
    ("CPSU Control", "For approximately how many years did the Communist Party rule the Soviet Union without allowing any opposition?",
     "Over 70 years", ["Around 25 years", "Exactly 40 years", "Over 120 years"], "B",
     "The Communist Party established power following the Bolshevik Revolution of 1917 and maintained a continuous monopoly until 1991 (over 70 years).", "Calculates duration of Soviet Communist rule."),
    ("Baltic Republics", "Which group of three Soviet republics joined NATO and the European Union in 2004, completely severing strategic ties with Moscow?",
     "Estonia, Latvia, and Lithuania", ["Belarus, Ukraine, and Moldova", "Kazakhstan, Uzbekistan, and Kyrgyzstan", "Armenia, Azerbaijan, and Georgia"], "C",
     "The three Baltic states—Estonia, Latvia, and Lithuania—integrated into Western institutions, joining both NATO and the EU in 2004.", "Identifies Baltic states joining EU/NATO in 2004."),
    ("Russian Federation Seat", "Which international body's permanent seat was inherited by the Russian Federation as the successor state of the USSR?",
     "United Nations Security Council", ["International Court of Justice", "NATO Council of Ministers", "G7 Executive Committee"], "D",
     "Russia inherited the permanent seat with veto power in the United Nations Security Council, as well as the Soviet Union's international treaty obligations.", "Identifies UNSC permanent seat inheritance."),
    ("Soviet Nuclear Arsenal", "Following the dissolution of the USSR, which country was recognized as the sole nuclear successor state, taking over all Soviet nuclear warheads?",
     "Russian Federation", ["Ukraine", "Belarus", "Kazakhstan"], "A",
     "Under international agreements, Russia was designated the sole nuclear weapons successor state; all Soviet warheads in Ukraine, Belarus, and Kazakhstan were decommissioned or transferred to Russia.", "Identifies Russia as sole nuclear successor state."),
    ("Gorbachev Coup", "In August 1991, an abortive military coup against Mikhail Gorbachev was staged by:",
     "Communist Party hardliners who opposed his reformist policies", ["Western intelligence agents seeking NATO occupation", "Pro-democracy activists demanding immediate capitalism", "Ethnic minorities demanding instant secession"], "B",
     "The August 1991 coup was organized by hardline members of the Communist Party apparatus and military who wanted to halt Gorbachev's Union Treaty and reforms.", "Identifies hardliners behind August 1991 coup."),
    ("Tajikistan Conflict", "The brutal civil war in Tajikistan was rooted primarily in clashes between:",
     "Sectarian and regional clans alongside Islamist and democratic opposition against the ruling regime", ["Ethnic Russians and native Uzbeks over fertile farming tracts", "Buddhist minorities and Christian missionaries", "Direct territorial invasion by Chinese border forces"], "C",
     "The Tajik civil war (1992-1997) erupted among regional clans, democratic reformists, and the United Tajik Opposition against the established political elite.", "Identifies factions in Tajik civil war."),
    ("Chechen Secession", "The Russian leadership justified its fierce military intervention in Chechnya primarily on the grounds of:",
     "Safeguarding territorial integrity and combating armed terrorism and separatism", ["Exporting socialist ideology to the Caucasus", "Acquiring diamond mines located in Grozny", "Fulfilling obligations under the Warsaw Pact"], "D",
     "Russia intervened militarily in Chechnya to preserve its territorial integrity and defeat armed separatist militancy that threatened the federation's unity.", "Explains Russian rationale in Chechnya."),
    ("Indo-Russian Multilateralism", "India and Russia share a common vision of a global order described in bilateral communiques as:",
     "A multipolar world order based on international law and collective security", ["A unipolar system led exclusively by the United States", "A bipolar Cold War rivalry dividing Asian states", "An anarchic order without the United Nations"], "A",
     "Both New Delhi and Moscow actively advocate a multipolar world order where multiple global powers cooperate through international law and multilateral bodies.", "Defines multipolar world vision."),
    ("Cold War Weaponry", "Which missile crisis in October 1962 brought the USA and the USSR to the brink of a direct full-scale nuclear war?",
     "Cuban Missile Crisis", ["Berlin Airlift Crisis", "Korean Missile Standoff", "Suez Canal Crisis"], "B",
     "The Cuban Missile Crisis of October 1962, triggered by Soviet nuclear deployment in Cuba, was the closest the superpowers came to direct nuclear conflict.", "Identifies Cuban Missile Crisis."),
    ("Second World Concept", "During the Cold War, the group of socialist countries in Eastern Europe led by the USSR was collectively referred to as:",
     "The Second World", ["The First World", "The Third World", "The Non-Aligned Realm"], "C",
     "The capitalist bloc led by the US was the First World; the socialist bloc led by the USSR was the Second World; the developing and non-aligned states were the Third World.", "Defines 'Second World' designation."),
    ("Soviet Living Standards", "How did consumer goods manufactured in the post-WWII Soviet Union compare with those manufactured in the West?",
     "They were produced domestically in abundance but generally lagged behind Western products in technology and quality", ["They were vastly superior in digital technology and aesthetic design", "They were non-existent as citizens relied entirely on American imports", "They were distributed only to foreign tourists and diplomats"], "D",
     "Although the USSR established a massive consumer goods industry producing items from pins to cars, their technological sophistication and finish were noticeably inferior to Western goods.", "Evaluates Soviet consumer technology."),
    ("Russian Privatisation Vouchers", "What happened to the citizen privatisation vouchers distributed by the Russian government during Shock Therapy?",
     "Most citizens sold them to black-market dealers or mafia syndicates because they needed immediate money for food", ["Citizens used them to purchase lucrative controlling shares in oil monopolies", "The government redeemed them in pure gold bullion at municipal banks", "They were transferred to foreign banks as part of retirement pensions"], "A",
     "Faced with hyperinflation and daily subsistence shortages, ordinary citizens sold their vouchers for cash to speculators and criminal syndicates.", "Traces fate of Russian privatisation vouchers."),
    ("Post-Soviet GDP", "Between 1989 and 1999, the real Gross Domestic Product (GDP) of the Russian Federation:",
     "Declined significantly below its 1989 level before beginning to recover", ["Doubled due to the instant efficiency of free market capitalism", "Remained identical to the GDP of the United States", "Eliminated foreign debt and generated unprecedented budget surpluses"], "B",
     "Russia's GDP contracted by nearly 40% during the 1990s as industrial production collapsed under Shock Therapy; recovery only commenced around 2000.", "Captures economic contraction of 1990s Russia."),
    ("Post-Soviet Health & Demography", "What striking demographic trend was recorded across Russia during the immediate post-Soviet Shock Therapy decade?",
     "A sharp decline in male life expectancy and a contraction in total population", ["An unprecedented population boom driven by mass immigration from Western Europe", "A complete eradication of infant mortality and poverty-related ailments", "A quadrupling of state funding for rural primary healthcare clinics"], "C",
     "Life expectancy plunged (especially for males, dropping to under 60 years) due to social stress, alcoholism, poverty, and the collapse of state healthcare.", "Details post-Soviet demographic crisis."),
    ("Russian Constitution 1993", "How was the new Russian Constitution of December 1993 drafted and ratified following the standoff between Boris Yeltsin and the parliament?",
     "It was enacted by popular referendum after Yeltsin ordered tanks to shell the recalcitrant Russian Parliament building", ["It was drafted by an independent panel of United Nations legal experts", "It restored the Tsar as the constitutional head of state", "It was approved unanimously by the Supreme Soviet without any executive conflict"], "D",
     "Following the dramatic constitutional crisis of October 1993 where Yeltsin dissolved and shelled the Supreme Soviet, a presidential constitution was passed via referendum.", "Recalls October 1993 Russian constitutional showdown."),
    ("Central Asia Energy", "Why did external powers like the US, China, and Western oil companies compete intensively in Central Asia after 1991?",
     "Because of the vast petroleum and natural gas hydrocarbon reserves in the Caspian Sea basin", ["Because Central Asian states possessed the largest stockpiles of nuclear submarines", "Because Central Asia was the exclusive global producer of microchips", "Because of a desire to establish communist collective farms across the steppes"], "A",
     "The Caspian Basin and Central Asian republics (Kazakhstan, Turkmenistan, Uzbekistan) boast colossal oil and gas reserves, sparking global geopolitical competition.", "Highlights hydrocarbon geopolitics of Central Asia."),
    ("Bilingual Treaties", "Under which historic treaty signed in 1971 did India and the Soviet Union commit to mutual consultations in the event of an external attack?",
     "Indo-Soviet Treaty of Peace, Friendship and Cooperation", ["Warsaw Mutual Defense Treaty", "Tashkent Declaration of Bilateral Amity", "Simla Non-Aggression Pact"], "B",
     "Signed in August 1971 by Indira Gandhi and Andrei Gromyko, this 20-year treaty gave India crucial geopolitical cover during the Bangladesh Liberation War.", "Identifies 1971 Indo-Soviet Treaty."),
    ("Arms Sales to India", "Historically, what proportion of India's imported military hardware and weapons systems originated from Russia / USSR?",
     "The overwhelming majority, historically exceeding 60 to 70 percent", ["Less than 5 percent, as India purchased nearly all arms from China", "Exactly 100 percent of all Indian rifles, jeeps, and uniforms", "Zero percent, because non-aligned nations could not import foreign weaponry"], "C",
     "Russia has historically supplied over 65-70% of India's front-line military inventory, including fighter jets (Su-30MKI), tanks (T-90), and warships.", "Quantifies Indo-Russian defense dependence."),
    ("Kashmir Veto", "How did the Soviet Union repeatedly assist India on the Kashmir dispute at the United Nations Security Council during the Cold War?",
     "By exercising its veto power to block anti-India resolutions sponsored by Western powers", ["By invading Pakistan to force a unilateral border settlement", "By demanding that Kashmir be ceded to Afghanistan", "By establishing a permanent Soviet naval base on Dal Lake"], "A",
     "The USSR exercised its UNSC veto on multiple occasions to protect India from adverse international resolutions regarding Jammu and Kashmir.", "Explains Soviet UNSC veto support on Kashmir."),
    ("Space Cooperation", "India's first satellite, Aryabhata (launched in 1975), was placed into orbit with the assistance of which foreign partner?",
     "The Soviet Union using a Soviet launch vehicle", ["NASA from Cape Canaveral", "The European Space Agency from French Guiana", "The Japanese Space Agency from Tanegashima"], "B",
     "India's first satellite Aryabhata was launched on 19 April 1975 using a Soviet Kosmos-3M launch vehicle from Kapustin Yar.", "Recalls Aryabhata launch partnership."),
    ("Gorbachev's Resignation", "On which date did Mikhail Gorbachev formally resign as the President of the Soviet Union, leading to the lowering of the Soviet red flag from the Kremlin?",
     "25 December 1991", ["9 November 1989", "1 January 1990", "15 August 1991"], "C",
     "Gorbachev resigned on Christmas Day, 25 December 1991. The Soviet flag was replaced by the Russian tricolor, marking the definitive legal end of the USSR.", "Identifies 25 December 1991 resignation date."),
    ("Soviet State Planning", "The centralized economic planning agency of the Soviet Union that formulated five-year economic targets was known as:",
     "Gosplan", ["Duma", "KGB", "Komsomol"], "D",
     "Gosplan (State Planning Committee) was the agency responsible for central economic planning across the entire Soviet Union.", "Identifies Gosplan."),
    ("Post-Soviet Transition Model", "The abrupt transition from an authoritarian socialist system to a democratic capitalist system prescribed by the IMF and World Bank was termed:",
     "Shock Therapy", ["Structural Modernisation", "Democratic Socialism", "Gradual Transition Path"], "A",
     "This rapid, painful economic transformation imposed on Russia, Eastern Europe, and Central Asia was called 'Shock Therapy'.", "Defines Shock Therapy."),
    ("Russian Oligarchs", "The small, powerful group of private business tycoons who acquired national assets during Russian voucher privatisation were called:",
     "Oligarchs", ["Bolsheviks", "Kulaks", "Mensheviks"], "B",
     "The wealthy magnates who bought up natural resource companies and banks at bargain prices came to be known as the Russian oligarchs.", "Identifies Russian oligarchs."),
    ("Soviet Bureaucracy Privilege", "The elite class of Soviet Communist Party officials who enjoyed special privileges, private stores, and luxury villas were known as:",
     "Nomenklatura", ["Proletariat", "Zemstvos", "Intelligentsia"], "C",
     "The nomenklatura constituted the bureaucratic and political elite within the Soviet hierarchy, insulated from ordinary citizen shortages.", "Identifies the nomenklatura elite.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u1_direct_data:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u1(make_question(CHAPTER_U1, topic, stem, opts, c, s))

# Fill remainder of Unit 1 to exactly 60
u1_extras = [
    ("Post-Soviet Pipeline Politics", "Why do international oil pipelines originating in Central Asia generate intense geopolitical friction?",
     "Because route selection determines which country gains transit revenues and geopolitical leverage", ["Because pipelines can only transport water across deserts", "Because landlocked Central Asian nations refuse to sell gas to anyone", "Because pipelines were banned by the United Nations in 1995"], "D",
     "Pipeline routes through Russia, China, or toward the Indian Ocean involve major geopolitical competition for control over Eurasian energy corridors.", "Explains Eurasian pipeline geopolitics."),
    ("Soviet Afghan War", "In which year did the Soviet Union send troops into Afghanistan, an intervention that drained Soviet resources for a decade?",
     "1979", ["1965", "1973", "1985"], "A",
     "Soviet forces entered Afghanistan in December 1979 to prop up a communist regime, leading to a protracted conflict until withdrawal in 1989.", "Identifies 1979 Afghan intervention."),
    ("Gorbachev's Democratic Reforms", "What was the name of the newly formed Soviet legislative body established by Gorbachev in 1989 where multi-candidate elections were permitted?",
     "Congress of People's Deputies", ["Federal Duma", "Council of Nationalities", "Supreme Soviet of Tsars"], "B",
     "The Congress of People's Deputies convened in 1989 with competitive elections, opening political debate within the Soviet state.", "Identifies Congress of People's Deputies."),
    ("Russian Federation Head of State", "Who served as the Prime Minister and subsequently succeeded Boris Yeltsin as President of the Russian Federation on 31 December 1999?",
     "Vladimir Putin", ["Dmitry Medvedev", "Yevgeny Primakov", "Gennady Zyuganov"], "C",
     "Vladimir Putin became acting President on 31 December 1999 following Yeltsin's resignation and was subsequently elected President in 2000.", "Identifies Vladimir Putin's succession in 1999."),
    ("Soviet Nuclear Disarmament", "Which bilateral treaty signed in 1987 eliminated an entire class of US and Soviet ground-launched intermediate-range nuclear missiles?",
     "Intermediate-Range Nuclear Forces (INF) Treaty", ["Strategic Arms Limitation Treaty (SALT I)", "Nuclear Non-Proliferation Treaty (NPT)", "Comprehensive Nuclear-Test-Ban Treaty (CTBT)"], "A",
     "The INF Treaty signed by Reagan and Gorbachev in December 1987 banned all US and Soviet land-based missiles with ranges of 500 to 5,500 km.", "Identifies INF Treaty 1987."),
    ("Post-Soviet Poverty", "What happened to the value of state pensions and citizen bank deposits in Russia during the hyperinflation of 1992?",
     "They were almost completely wiped out in real purchasing power terms", ["They increased five-fold due to automatic gold conversion", "They were protected by direct subsidies from the European Union", "They were converted into shares in American tech companies"], "B",
     "Hyperinflation destroyed the purchasing value of fixed salaries, pensions, and savings, pushing millions of elderly Russians into extreme destitution.", "Recognizes loss of real value of pensions in 1992 Russia."),
    ("Soviet Consumer Shortages", "What was the primary cause of widespread consumer shortages in the Soviet Union during the late 1970s and 1980s?",
     "Heavy over-allocation of resources to the military-industrial complex at the expense of light consumer industries", ["Complete lack of literate factory workers", "Constant devastation from natural disasters across Siberia", "Refusal of the state to permit any factory construction"], "C",
     "The Soviet economy diverted a disproportionate share of national income (up to 20-25% of GDP) to defense and military parity with the US, neglecting consumer manufacturing.", "Explains cause of Soviet consumer shortages."),
    ("Soviet Nationalities Problem", "Why did the Slavic republics of Russia, Ukraine, and Belarus feel resentful within the Soviet Union towards the late 1980s?",
     "They felt they were paying an unfair economic cost to subsidise less developed Central Asian republics", ["They wanted to adopt Arabic as their national language", "They were barred from serving in the Soviet armed forces", "They were forced to surrender their agricultural land to China"], "A",
     "Slavic populations felt economically burdened by subsidising developing regions while experiencing stagnant living standards themselves.", "Explains Slavic economic resentment."),
    ("UN Membership for Soviet Republics", "Besides the USSR as a whole, which two Soviet republics held independent seats in the United Nations from 1945?",
     "Ukraine and Belarus (Byelorussia)", ["Kazakhstan and Uzbekistan", "Georgia and Armenia", "Estonia and Latvia"], "B",
     "To balance representation at the 1945 founding of the UN, the Soviet Union negotiated separate general assembly seats for Ukraine and Byelorussia (Belarus).", "Identifies Ukraine and Byelorussia as original UN members."),
    ("Yeltsin's Political Rise", "How did Boris Yeltsin establish himself as a prominent political figure in opposition to Gorbachev?",
     "By championing Russian sovereignty and leading popular resistance against the August 1991 coup", ["By demanding the immediate restoration of the Tsarist monarchy", "By advocating a military invasion of Western Europe", "By calling for the re-imposition of Stalinist terror purges"], "C",
     "Yeltsin stood on a tank outside the Russian White House in August 1991 to rally citizens against the coup, catapulting himself to political supremacy.", "Describes Yeltsin's heroic posture during 1991 coup."),
    ("Commonwealth of Independent States Headquarters", "The administrative coordinating headquarters of the Commonwealth of Independent States (CIS) was established in:",
     "Minsk, Belarus", ["Moscow, Russia", "Kyiv, Ukraine", "Almaty, Kazakhstan"], "D",
     "The headquarters of the CIS executive bodies was located in Minsk, the capital of Belarus.", "Identifies Minsk as CIS headquarters."),
    ("Soviet Agriculture Collectivisation", "Under which historic Soviet leader was the brutal policy of agricultural collectivisation (Kolchoz) originally enforced?",
     "Joseph Stalin", ["Vladimir Lenin", "Nikita Khrushchev", "Leonid Brezhnev"], "A",
     "Stalin enforced forced collectivisation in the late 1920s and 1930s, eliminating the kulaks (wealthy peasants) and placing all farming under collective control.", "Identifies Stalin's agricultural collectivisation."),
    ("Fall of Communism in Poland", "Which famous independent trade union led by Lech Walesa spearheaded the anti-communist movement in Poland during the 1980s?",
     "Solidarity (Solidarnosc)", ["New Dawn", "Workers' Front", "Civic Forum"], "B",
     "Solidarity was the first independent trade union in a Warsaw Pact country, playing a pivotal role in ending communist rule in Poland.", "Identifies Solidarity in Poland."),
    ("Velvet Revolution", "The peaceful transition from communist rule to parliamentary democracy in Czechoslovakia in 1989 is famously known as:",
     "The Velvet Revolution", ["The Orange Revolution", "The Rose Revolution", "The Carnation Revolution"], "C",
     "The Velvet Revolution of November-December 1989 peacefully ended single-party communist rule in Czechoslovakia.", "Identifies the Velvet Revolution."),
    ("Post-Soviet Central Asian Resources", "Besides hydrocarbons, which mineral resource is Kazakhstan globally renowned for holding vast reserves of?",
     "Uranium", ["Bauxite", "Platinum", "Lithium"], "D",
     "Kazakhstan holds roughly 12% of the world's uranium reserves and is the world's leading producer of mined uranium.", "Identifies Kazakh uranium reserves.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u1_extras:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u1(make_question(CHAPTER_U1, topic, stem, opts, c, s))

u1_qs = u1_qs[:60]
assert len(u1_qs) == 60, f"Expected 60 questions for Unit 1, got {len(u1_qs)}"
validate_and_collect(u1_qs, u1_seen)
print("Unit 1 validated: 60 unique questions.")


# =================================================================================================
# UNIT 2: Contemporary Centres of Power (60 Questions)
# =================================================================================================
CHAPTER_U2 = "Contemporary Centres of Power"
u2_qs = []
u2_seen = set()

def add_u2(q):
    u2_qs.append(q)

opts, c, s = rotate_options(
    "Treaty of Maastricht (1992)",
    ["Treaty of Versailles (1919)", "Treaty of Rome (1957)", "Treaty of Paris (1951)"],
    "A",
    "The European Union was formally established by the signing of the Treaty of Maastricht on 7 February 1992 (entering into force in November 1993).\nHence, Option {{CORR}} is correct.",
    "Identifies Maastricht Treaty as founding the European Union."
)
add_u2(make_question(CHAPTER_U2, "European Union", "The European Union was formally established in 1992 following the signing of which landmark treaty?", opts, c, s))

opts, c, s = rotate_options(
    "Bangkok Declaration (1967)",
    ["Bandung Declaration (1955)", "Manila Charter (1976)", "Singapore Accord (1992)"],
    "B",
    "ASEAN was established on 8 August 1967 in Bangkok by the five founding member countries signing the Bangkok Declaration.\nHence, Option {{CORR}} is correct.",
    "Identifies Bangkok Declaration 1967 as founding ASEAN."
)
add_u2(make_question(CHAPTER_U2, "ASEAN", "Which founding declaration was signed in August 1967 by five Southeast Asian countries to establish ASEAN?", opts, c, s))

opts, c, s = rotate_options(
    "Deng Xiaoping in December 1978",
    ["Mao Zedong in October 1949", "Zhou Enlai in January 1973", "Jiang Zemin in November 1993"],
    "C",
    "Deng Xiaoping announced the historic 'Open Door Policy' and economic reforms in December 1978, shifting China toward a market socialist economy.\nHence, Option {{CORR}} is correct.",
    "Identifies Deng Xiaoping and 1978 for China's Open Door Policy."
)
add_u2(make_question(CHAPTER_U2, "Rise of China", "Who among the following Chinese leaders announced the historic 'Open Door Policy' and economic modernisation drive in December 1978?", opts, c, s))

opts, c, s = rotate_options(
    "Article 9",
    ["Article 21", "Article 48", "Article 356"],
    "D",
    "Article 9 of the post-WWII Japanese Constitution renounces war as a sovereign right of the nation and the threat or use of force as a means of settling international disputes.\nHence, Option {{CORR}} is correct.",
    "Identifies Article 9 of the Japanese Constitution renouncing war."
)
add_u2(make_question(CHAPTER_U2, "Japan", "Which famous article of the post-World War II Japanese Constitution formally renounces war as a sovereign right of the nation?", opts, c, s))

# Match question 1 for Unit 2
add_u2(make_match_question(
    CHAPTER_U2, "European Integration Treaties",
    "Match List I (Treaty/Plan) with List II (Year of Enactment):",
    [("A", "Marshall Plan established"), ("B", "Treaty of Rome signed"), ("C", "Maastricht Treaty signed"), ("D", "Euro currency formally introduced in cash")],
    [("I", "1948"), ("II", "1957"), ("III", "1992"), ("IV", "2002")],
    "A-I, B-II, C-III, D-IV", "A",
    "Marshall Plan OEEC was established in 1948; Treaty of Rome founding the EEC was signed in 1957; Maastricht Treaty was signed in 1992; Euro coins and notes entered physical circulation in January 2002.",
    "Matches European integration agreements with accurate years."
))

# Chronology question 1 for Unit 2
add_u2(make_sequence_question(
    CHAPTER_U2, "Chinese Economic Modernisation",
    "Arrange the following milestones of modern Chinese economic transformation in chronological sequence:",
    [("A", "Privatisation of agriculture"), ("B", "Four Modernisations proposed by Premier Zhou Enlai"), ("C", "Privatisation of state industry and creation of SEZs"), ("D", "Accession of China to the World Trade Organisation (WTO)")],
    "B, A, C, D", "B",
    "1. Premier Zhou Enlai proposed Four Modernisations in 1973 (B).\n2. Privatisation of agriculture began in 1982 (A).\n3. Privatisation of industry and SEZ creation occurred in 1998 (C).\n4. China joined the WTO in December 2001 (D).",
    "Sequences Chinese economic reforms from 1973 to 2001."
))

# Statement question 1 for Unit 2
add_u2(make_statement_question(
    CHAPTER_U2, "ASEAN Way",
    "The 'ASEAN Way' is a formal, highly litigious system of binding judicial enforcement that penalises member nations through economic sanctions.",
    "The 'ASEAN Way' refers to an informal, non-confrontational, and cooperative style of interaction based on national sovereignty and consensus.",
    4, "D",
    "Statement I is incorrect: ASEAN deliberately avoids formal supranational adjudication or punitive sanctions. Statement II is correct: The ASEAN Way is celebrated as an informal, consensus-based, and non-confrontational diplomatic process.",
    "Distinguishes the true diplomatic ethos of the ASEAN Way."
))

# Assertion Reason 1 for Unit 2
add_u2(make_assertion_question(
    CHAPTER_U2, "European Union Influence",
    "The European Union functions more like a nation-state than a traditional intergovernmental organisation in several policy spheres.",
    "The European Union has its own common flag, anthem, founding day, currency, and shared foreign and security policy elements.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains why the EU resembles a state—it possesses state-like symbols (flag, anthem, Europe Day) and a shared currency (Euro) alongside joint diplomatic mechanisms.",
    "Validates state-like supranational characteristics of the European Union."
))

# Multi statement 1 for Unit 2
add_u2(make_multi_statement_question(
    CHAPTER_U2, "ASEAN Pillars",
    "Which of the following constitute the three fundamental pillars of the ASEAN Community established in 2003?",
    [
        ("A", "The ASEAN Security Community"),
        ("B", "The ASEAN Economic Community"),
        ("C", "The ASEAN Socio-Cultural Community"),
        ("D", "The ASEAN Military Alliance and Nuclear Command")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "C",
    "Statements A, B, and C form the three official pillars of the ASEAN Community. Statement D is false because ASEAN rejects forming a collective military pact or nuclear command.",
    "Identifies the three pillars of the ASEAN Community."
))

# Subtopics for Unit 2
u2_subtopics = [
    ("EU Member Resistance", "Which European Union member country famously rejected the Maastricht Treaty and the adoption of the Euro via national referendums?",
     "Denmark", ["Germany", "France", "Italy"], "A",
     "Denmark rejected the Maastricht Treaty in an initial 1992 referendum and negotiated opt-outs, keeping the Danish Krone rather than adopting the Euro.", "Identifies Danish resistance to Maastricht/Euro."),
    ("ASEAN Founding Members", "Which of the following was NOT one of the five original founding members of ASEAN in 1967?",
     "Vietnam", ["Indonesia", "Malaysia", "Philippines"], "B",
     "The five founding members were Indonesia, Malaysia, Philippines, Singapore, and Thailand. Vietnam joined much later in 1995.", "Identifies Vietnam as non-founding member."),
    ("Four Modernisations", "Premier Zhou Enlai proposed 'Four Modernisations' in 1973 in which four vital sectors?",
     "Agriculture, Industry, Science and Technology, and Military", ["Education, Healthcare, Tourism, and Banking", "Railways, Shipping, Aviation, and Postal Services", "Textiles, Coal Mining, Forestry, and Fisheries"], "C",
     "The Four Modernisations proposed in 1973 covered agriculture, industry, defense (military), and science & technology.", "Lists the Four Modernisations sectors."),
    ("BRICS Expansion", "South Africa formally joined the BRIC grouping, transforming it into BRICS, in which year?",
     "2010", ["2006", "2009", "2014"], "D",
     "South Africa was invited to join the BRIC grouping in December 2010 and attended its first BRICS leaders' summit in Sanya in 2011.", "Identifies 2010 for South Africa joining BRICS."),
    ("New Development Bank", "The New Development Bank (NDB), established by BRICS member states in 2014, has its headquarters in:",
     "Shanghai, China", ["New Delhi, India", "Moscow, Russia", "Johannesburg, South Africa"], "A",
     "The NDB was created at the 6th BRICS Summit in Fortaleza (2014) with its permanent headquarters located in Shanghai.", "Identifies Shanghai as NDB headquarters."),
    ("South Korea Economic Miracle", "The rapid, export-oriented industrialisation of South Korea from the 1960s to 1980s is widely celebrated as the:",
     "Miracle on the Han River", ["The Tiger Leap", "The Asian Renaissance", "The Seoul Sunrise"], "B",
     "South Korea's dramatic transformation from war ruin to an industrial powerhouse is referred to as the 'Miracle on the Han River'.", "Identifies 'Miracle on the Han River'."),
    ("Chaebols in South Korea", "In South Korea, large, family-controlled industrial conglomerates such as Samsung, Hyundai, and LG are known as:",
     "Chaebols", ["Zaibatsu", "Keiretsu", "Township Enterprises"], "C",
     "Chaebols are major family-owned business conglomerates in South Korea that drove national export growth.", "Defines South Korean Chaebols."),
    ("Sino-Indian Relations", "Which Indian Prime Minister made a historic visit to China in December 1988, marking a breakthrough in bilateral relations after the 1962 war?",
     "Rajiv Gandhi", ["Jawaharlal Nehru", "Indira Gandhi", "Atal Bihari Vajpayee"], "D",
     "Rajiv Gandhi's visit to Beijing in December 1988 broke the diplomatic ice, agreeing that boundary talks would continue while other trade and cultural ties expanded.", "Identifies Rajiv Gandhi's 1988 Beijing visit."),
    ("China SEZs", "What special policy mechanism was established along China's coastal regions to attract foreign direct investment and high technology?",
     "Special Economic Zones (SEZs)", ["Collective Farming Communes", "State Monopoly Cartels", "Free Tariff Proletarian Zones"], "A",
     "Deng Xiaoping introduced Special Economic Zones (such as Shenzhen) offering tax holidays and modern infrastructure to attract foreign capital.", "Identifies China's SEZs."),
    ("EU Nobel Prize", "In which year was the European Union awarded the Nobel Peace Prize for promoting peace, reconciliation, and democracy in Europe?",
     "2012", ["1992", "2000", "2018"], "B",
     "The European Union received the Nobel Peace Prize in 2012 for transforming Europe from a continent of war to a continent of peace.", "Recalls EU 2012 Nobel Peace Prize."),
    ("ASEAN Regional Forum", "In which year was the ASEAN Regional Forum (ARF) established to coordinate security and foreign policy dialogues across the Asia-Pacific?",
     "1994", ["1976", "1985", "2005"], "C",
     "The ASEAN Regional Forum (ARF) was established in 1994 to foster constructive dialogue on political and security cooperation.", "Identifies ARF founding in 1994."),
    ("Schengen Agreement", "The Schengen Agreement within the European framework is primarily designed to:",
     "Abolish internal border controls and allow passport-free travel among participating European countries", ["Establish a single European military air force", "Fix uniform income tax rates across all member parliaments", "Enforce German as the mandatory language of European diplomacy"], "A",
     "The Schengen Agreement created an open border zone permitting people and goods to move freely without internal border checks.", "Defines the Schengen Agreement.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u2_subtopics:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u2(make_question(CHAPTER_U2, topic, stem, opts, c, s))

# More match questions for Unit 2
add_u2(make_match_question(
    CHAPTER_U2, "Regional Blocs and Headquarters",
    "Match List I (Organisation/Bloc) with List II (Secretariat / Headquarters):",
    [("A", "European Union"), ("B", "ASEAN"), ("C", "BRICS New Development Bank"), ("D", "OECD")],
    [("I", "Brussels, Belgium"), ("II", "Jakarta, Indonesia"), ("III", "Shanghai, China"), ("IV", "Paris, France")],
    "A-I, B-II, C-III, D-IV", "A",
    "EU is headquartered in Brussels; ASEAN Secretariat is in Jakarta; NDB is in Shanghai; OECD is in Paris.",
    "Matches regional organisations with official headquarters."
))

add_u2(make_match_question(
    CHAPTER_U2, "China Border and Trade Accords",
    "Match List I (India-China Event) with List II (Associated Year):",
    [("A", "Panchsheel Agreement signed"), ("B", "Sino-Indian Border War"), ("C", "Rajiv Gandhi visit to China"), ("D", "Reopening of Nathu La Pass for trade")],
    [("I", "1954"), ("II", "1962"), ("III", "1988"), ("IV", "2006")],
    "A-I, B-II, C-III, D-IV", "B",
    "Panchsheel was signed in 1954; border conflict occurred in 1962; Rajiv Gandhi visited in 1988; Nathu La trade pass reopened in 2006.",
    "Chronologically matches milestones in India-China relations."
))

# Chronology questions for Unit 2
add_u2(make_sequence_question(
    CHAPTER_U2, "European Union Evolution",
    "Arrange the following European integration milestones in chronological order:",
    [("A", "Establishment of the Council of Europe"), ("B", "Signing of the Treaty of Rome (EEC)"), ("C", "Signing of the Single European Act"), ("D", "Entry into force of the Lisbon Treaty")],
    "A, B, C, D", "C",
    "1. Council of Europe established (1949).\n2. Treaty of Rome (1957).\n3. Single European Act (1986).\n4. Lisbon Treaty entered into force (December 2009).",
    "Chronologically sequences European integration steps."
))

add_u2(make_sequence_question(
    CHAPTER_U2, "ASEAN Expansion",
    "Arrange the following nations according to the chronological order in which they joined ASEAN:",
    [("A", "Brunei Darussalam"), ("B", "Vietnam"), ("C", "Laos and Myanmar"), ("D", "Cambodia")],
    "A, B, C, D", "D",
    "1. Brunei joined in 1984.\n2. Vietnam joined in 1995.\n3. Laos and Myanmar joined in 1997.\n4. Cambodia joined in 1999 (completing ASEAN 10).",
    "Sequences expansion of ASEAN membership from 1984 to 1999."
))

# Statement questions for Unit 2
add_u2(make_statement_question(
    CHAPTER_U2, "China WTO Entry",
    "China became a member of the World Trade Organisation (WTO) in December 2001.",
    "Joining the WTO forced China to completely abandon all state-owned enterprises and ban foreign direct investment.",
    3, "C",
    "Statement I is correct: China joined the WTO in 2001. Statement II is incorrect: Accession deepened China's integration with global markets and invited massive FDI, but China maintained powerful state-owned enterprises.",
    "Evaluates China's accession to the WTO."
))

add_u2(make_statement_question(
    CHAPTER_U2, "European Currency",
    "All member states of the European Union are legally obligated to adopt the Euro and abandon their national currencies immediately upon joining.",
    "Britain chose to retain the Pound Sterling and opted out of the Euro currency zone prior to its complete exit through Brexit.",
    4, "D",
    "Statement I is incorrect: Several members (e.g. Denmark, Sweden) negotiated opt-outs or do not use the Euro. Statement II is correct: Britain retained the Pound Sterling and never entered the Eurozone.",
    "Identifies Eurozone exceptions and British opt-out."
))

# Assertion Reason questions for Unit 2
add_u2(make_assertion_question(
    CHAPTER_U2, "Chinese Economic Growth",
    "China has emerged as the second-largest economy in the world and a major driver of global economic growth.",
    "The Chinese leadership implemented a sudden, shock-therapy style privatisation overnight in 1978, wiping out all rural commune welfare systems.",
    3, "C",
    "Assertion (A) is true: China is the world's second-largest economy. Reason (R) is false: China did NOT use shock therapy; it adopted a gradual, phased opening-up policy (agriculture first in 1982, industry later in 1998).",
    "Contrasts China's gradualist market path with Shock Therapy."
))

add_u2(make_assertion_question(
    CHAPTER_U2, "ASEAN Economic Dynamism",
    "ASEAN has grown much faster than most developing regional blocs in trade and investment.",
    "ASEAN created a Free Trade Area (FTA) for investment, labour, and services, and signed FTAs with major dialogue partners including India, China, and Japan.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains ASEAN's economic vitality—open trade agreements and liberalised investment flows drove robust economic expansion.",
    "Explains drivers of ASEAN's rapid economic growth."
))

# Multi statement questions for Unit 2
add_u2(make_multi_statement_question(
    CHAPTER_U2, "India's Look East / Act East",
    "Which of the following statements are correct regarding India's engagement with Southeast Asia?",
    [
        ("A", "India launched the 'Look East Policy' in 1991 to revitalise economic ties with ASEAN nations."),
        ("B", "The policy was upgraded to the 'Act East Policy' under Prime Minister Narendra Modi in 2014."),
        ("C", "India has signed Free Trade Agreements with individual ASEAN members like Singapore and Malaysia."),
        ("D", "India is a founding member of ASEAN and attends all internal cabinet meetings in Jakarta.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A, B, and C are correct. Statement D is false because India is NOT a member of ASEAN; it is a dialogue partner and member of the ASEAN Regional Forum and East Asia Summit.",
    "Clarifies India's Look East / Act East institutional standing."
))

add_u2(make_multi_statement_question(
    CHAPTER_U2, "Japan Global Stature",
    "Which of the following statements reflect the global economic and technological profile of Japan?",
    [
        ("A", "Japan is a member of the G7 group of leading industrialised economies."),
        ("B", "Famous Japanese brand names include Sony, Panasonic, Canon, Honda, and Toyota."),
        ("C", "Japan spends approximately 10 percent of its GDP on developing intercontinental ballistic missiles."),
        ("D", "Japan is one of the largest contributors to the United Nations regular budget.")
    ],
    "(A), (B) and (D) only",
    ["(A) and (C) only", "(B) and (C) only", "(A), (B), (C) and (D)"],
    "C",
    "Statements A, B, and D are factual. C is completely false: under Article 9 and security policy, Japan's defense budget has traditionally hovered near or below 1% of GDP, and it does not build ICBMs.",
    "Accurately profiles Japan's economic strength and constitutional defense constraints."
))

# Remaining direct questions for Unit 2 to reach 60 questions
u2_direct_data = [
    ("Brexit", "The historic referendum in which the citizens of the United Kingdom voted to leave the European Union took place in:",
     "June 2016", ["January 2000", "May 2010", "December 2021"], "A",
     "The UK Brexit referendum was held on 23 June 2016, where 51.9% voted to leave the European Union.", "Identifies June 2016 Brexit referendum."),
    ("ASEAN Security Community", "The primary objective of the ASEAN Security Community is to ensure that:",
     "Territorial disputes do not escalate into armed confrontations and peace is maintained through dialogue", ["All Southeast Asian armies merge into a unified military under Singaporean command", "Nuclear weapons are deployed across the South China Sea to counter China", "Foreign navies are permanently banned from traversing the Strait of Malacca"], "B",
     "The ASEAN Security Community aims to maintain regional peace, ensuring territorial disputes are resolved peacefully through dialogue without resorting to war.", "Defines ASEAN Security Community purpose."),
    ("China Tibet Annexation", "In which year did the People's Republic of China annex Tibet, creating long-term friction along the Himalayan frontier with India?",
     "1950", ["1947", "1959", "1965"], "C",
     "China annexed Tibet in 1950, extinguishing Tibet's traditional buffer status between India and China.", "Identifies 1950 Chinese annexation of Tibet."),
    ("Dalai Lama Asylum", "In which year did the spiritual leader Dalai Lama seek political asylum in India along with thousands of Tibetan followers?",
     "1959", ["1950", "1954", "1962"], "D",
     "Following the suppression of the Tibetan uprising by Chinese forces, the Dalai Lama fled to India in March 1959, receiving asylum from Prime Minister Nehru.", "Identifies 1959 Dalai Lama asylum in India."),
    ("First BRIC Summit", "The very first official summit meeting of the BRIC leaders was hosted in 2009 in which Russian city?",
     "Yekaterinburg", ["St. Petersburg", "Moscow", "Sochi"], "A",
     "The inaugural BRIC summit was convened on 16 June 2009 in Yekaterinburg, Russia.", "Identifies Yekaterinburg as first BRIC summit site."),
    ("Jim O'Neill BRIC Acronym", "The acronym 'BRIC' was originally coined in 2001 in an economic research report by Goldman Sachs economist:",
     "Jim O'Neill", ["Joseph Stiglitz", "Paul Krugman", "Amartya Sen"], "B",
     "British economist Jim O'Neill coined the term BRIC in 2001 to highlight the high-growth potential of Brazil, Russia, India, and China.", "Identifies Jim O'Neill as coiner of BRIC acronym."),
    ("South Korea OECD Entry", "In which year did South Korea formally join the Organisation for Economic Co-operation and Development (OECD), signaling its status as a developed nation?",
     "1996", ["1971", "1980", "2015"], "C",
     "South Korea joined the OECD in 1996, symbolizing its transition into the club of advanced industrial democracies.", "Identifies South Korea's 1996 OECD membership."),
    ("European Commission", "The executive bureaucratic body of the European Union responsible for proposing new legislation and managing the EU budget is the:",
     "European Commission", ["European Parliament", "Council of Ministers", "European Court of Auditors"], "D",
     "The European Commission, based in Brussels, functions as the executive arm of the EU.", "Identifies European Commission."),
    ("European Parliament Elections", "Members of the European Parliament (MEPs) are chosen through:",
     "Direct democratic elections held every five years by citizens of all member states", ["Unilateral nomination by the President of the United States", "Selection by a committee of central bank governors", "A military lottery conducted by NATO headquarters"], "A",
     "Citizens of EU member countries directly elect MEPs every five years in transnational democratic elections.", "Identifies direct elections to European Parliament."),
    ("ASEAN Vision 2020", "The landmark document adopted by ASEAN leaders in 1997 outlining an outward-looking role in the international community was called:",
     "ASEAN Vision 2020", ["The Jakarta Protocol", "The Manila Roadmap", "The Bangkok Accord"], "B",
     "ASEAN Vision 2020 adopted in 1997 envisioned ASEAN playing an active, outward-looking role in global peace and prosperity.", "Identifies ASEAN Vision 2020."),
    ("European Union Flag", "How many gold stars are featured in a circle on the official flag of the European Union, symbolising perfection and completeness?",
     "12 stars", ["15 stars", "27 stars", "50 stars"], "C",
     "The EU flag features 12 gold stars in a circle against a blue background, traditionally signifying unity, solidarity, and harmony.", "Identifies 12 stars on EU flag."),
    ("Hallyu Wave", "The global surge of South Korean popular culture, music (K-pop), dramas (K-drama), and cuisine is known worldwide as:",
     "Hallyu (The Korean Wave)", ["Bushido", "K-League", "Hangul Surge"], "D",
     "Hallyu ('Korean Wave') describes the worldwide phenomenon of South Korean music, cinema, and entertainment.", "Identifies Hallyu / Korean Wave."),
    ("China-India Border Disputed Sectors", "The 1962 border war between India and China took place primarily in which two distinct frontier regions?",
     "Aksai Chin in Ladakh and the North-East Frontier Agency (NEFA, now Arunachal Pradesh)", ["Sikkim and the Rann of Kutch", "Sir Creek and Kargil", "The Sundarbans and the Siliguri Corridor"], "A",
     "Chinese forces launched coordinated assaults across the western sector (Aksai Chin in Ladakh) and the eastern sector (NEFA in Arunachal Pradesh).", "Identifies 1962 war sectors."),
    ("China's Soviet Model Initial Stage", "Immediately following the 1949 communist revolution under Mao, China adopted which development model?",
     "A Soviet-inspired state-controlled socialist model focusing on heavy industry funded by agriculture", ["A laissez-faire capitalist model guided by Wall Street investment", "A monarchy centered around Confucian imperial landlords", "An export-oriented electronics manufacturing model like Singapore"], "B",
     "China initially broke ties with the capitalist world and relied on the Soviet model, nationalising industry and collective farming.", "Describes China's initial Soviet-inspired model."),
    ("SEZ Full Form", "In the context of Chinese and Indian economic development, the acronym 'SEZ' stands for:",
     "Special Economic Zone", ["State Enterprise Zone", "Social Equality Zone", "Secured Export Zone"], "C",
     "SEZs (Special Economic Zones) are designated geographical areas that have economic laws more free-market oriented than a country's typical national laws.", "Defines SEZ acronym."),
    ("East Asia Summit", "The East Asia Summit (EAS), established in 2005 with ASEAN at its core, includes which grouping of major dialogue partners?",
     "India, China, Japan, South Korea, Australia, New Zealand, the US, and Russia", ["Exclusively the six original members of the European Union", "Only the Latin American republics of Mercosur", "African Union member states bordering the Red Sea"], "D",
     "The East Asia Summit includes the 10 ASEAN members plus 8 dialogue partners (Australia, China, India, Japan, New Zealand, South Korea, Russia, and the US).", "Lists East Asia Summit participants."),
    ("Treaty of Rome 1957", "Which two major communities were established by the signing of the Treaty of Rome on 25 March 1957?",
     "The European Economic Community (EEC) and the European Atomic Energy Community (Euratom)", ["The Warsaw Pact and the Comintern", "The League of Nations and the International Labour Organisation", "The North Atlantic Treaty Organisation and SEATO"], "A",
     "The Treaty of Rome created the European Economic Community (Common Market) and Euratom.", "Identifies EEC and Euratom created by Treaty of Rome."),
    ("Marshall Plan Architect", "The Marshall Plan of 1948 that provided massive US financial aid to reconstruct war-torn Western Europe was named after:",
     "US Secretary of State George C. Marshall", ["US President Harry S. Truman", "British Prime Minister Winston Churchill", "French Foreign Minister Robert Schuman"], "B",
     "George C. Marshall proposed the European Recovery Program (Marshall Plan) in 1947 to prevent European collapse and contain Soviet influence.", "Identifies George C. Marshall."),
    ("Schuman Declaration", "The Schuman Declaration of 9 May 1950, commemorated as 'Europe Day', proposed placing French and German production of which goods under a single authority?",
     "Coal and Steel", ["Automobiles and Aircraft", "Wheat and Wine", "Cotton and Silk"], "C",
     "Robert Schuman proposed the pooling of French and West German coal and steel, giving birth to the European Coal and Steel Community (ECSC) in 1951.", "Identifies coal and steel in Schuman Declaration."),
    ("India-ASEAN FTA", "In which year did the Free Trade Agreement in Goods between India and ASEAN enter into force?",
     "2010", ["1991", "2000", "2022"], "A",
     "The India-ASEAN Free Trade Agreement in Goods was signed in 2009 and came into operational effect on 1 January 2010.", "Identifies 2010 for India-ASEAN FTA in Goods."),
    ("China Population Policy", "Which famous demographic policy introduced by the Chinese government in 1979 significantly altered its population growth trajectory?",
     "One-Child Policy", ["Two-Child Guarantee", "Open Family Initiative", "Proletarian Birth Act"], "B",
     "China introduced the strict 'One-Child Policy' in 1979 to curtail rapid population growth, which lasted until reforms in 2015-2016.", "Identifies China's One-Child Policy 1979."),
    ("China's Modern Military", "The military forces of the People's Republic of China are officially organized under the command of the:",
     "People's Liberation Army (PLA)", ["Red Guard Militias", "Imperial Chinese Army", "Guomindang Defense Force"], "C",
     "The People's Liberation Army (PLA) is the unified armed forces of China under the direction of the Central Military Commission.", "Identifies PLA."),
    ("Japan's Global Economic Rank", "For multiple decades from 1968 until being overtaken by China in 2010, Japan held which rank among the world's largest economies?",
     "Second largest economy in the world", ["Tenth largest economy", "Twentieth largest economy", "Largest economy ahead of the United States"], "A",
     "Japan surpassed West Germany in 1968 to become the world's second-largest economy after the United States, a title it held until China surpassed it in 2010.", "Identifies Japan's rank as second largest economy."),
    ("India-China Border Talks", "Which mechanism was established following Prime Minister Atal Bihari Vajpayee's 2003 visit to China to negotiate a boundary settlement?",
     "Special Representatives (SR) dialogue on the boundary question", ["United Nations Border Tribunal", "International Court of Justice Special Bench", "Panchsheel Military Commission"], "B",
     "In 2003, India and China appointed Special Representatives to explore a political framework for resolving the long-standing boundary issue.", "Identifies Special Representatives mechanism."),
    ("Lisbon Treaty Entry into Force", "The Treaty of Lisbon, which overhauled the institutional structure of the European Union, formally entered into force in:",
     "December 2009", ["January 2000", "May 2004", "March 2015"], "C",
     "The Treaty of Lisbon was signed in December 2007 and entered into force on 1 December 2009.", "Identifies December 2009 entry into force of Lisbon Treaty."),
    ("BRICS Goa Summit", "Which Indian state hosted the 8th BRICS Summit in October 2016?",
     "Goa", ["Maharashtra", "New Delhi", "Karnataka"], "D",
     "The 8th BRICS Summit was held on 15-16 October 2016 in Benaulim, Goa, India.", "Identifies Goa as host of 2016 BRICS Summit."),
    ("Japan Currency", "What is the official currency of Japan, recognized as one of the world's major reserve currencies?",
     "Japanese Yen", ["Korean Won", "Renminbi Yuan", "Baht"], "A",
     "The Yen is the official currency of Japan and a prominent global reserve currency.", "Identifies Japanese Yen."),
    ("Bali Concord II", "The Declaration of ASEAN Concord II (Bali Concord II), establishing the ASEAN Community with its three pillars, was signed in:",
     "2003", ["1992", "2010", "2018"], "B",
     "At the 9th ASEAN Summit in Bali in October 2003, ASEAN leaders signed the Bali Concord II establishing the ASEAN Community.", "Identifies 2003 Bali Concord II."),
    ("Brexit Formal Exit", "In which year did the United Kingdom formally and legally withdraw from the European Union?",
     "2020", ["2016", "2018", "2022"], "C",
     "Following the 2016 referendum and ratification of the withdrawal agreement, the UK formally left the European Union on 31 January 2020.", "Identifies 2020 as formal Brexit departure year.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u2_direct_data:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u2(make_question(CHAPTER_U2, topic, stem, opts, c, s))

u2_qs = u2_qs[:60]
assert len(u2_qs) == 60, f"Expected 60 questions for Unit 2, got {len(u2_qs)}"
validate_and_collect(u2_qs, u2_seen)
print("Unit 2 validated: 60 unique questions.")

# Save unit files
with open("mock/pol_units/unit1.json", "w", encoding="utf-8") as f:
    json.dump(u1_qs, f, indent=2, ensure_ascii=False)
print("Wrote mock/pol_units/unit1.json (60 questions)")

with open("mock/pol_units/unit2.json", "w", encoding="utf-8") as f:
    json.dump(u2_qs, f, indent=2, ensure_ascii=False)
print("Wrote mock/pol_units/unit2.json (60 questions)")
