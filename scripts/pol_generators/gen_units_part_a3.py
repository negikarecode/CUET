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

for u in [1, 2, 3, 4]:
    p = f"mock/pol_units/unit{u}.json"
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            for item in json.load(f):
                global_seen.add(normalize_text(item.get("questionText", "")))

print(f"Loaded {len(global_seen)} questions from previous units into global_seen.")

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
# UNIT 5: Security in the Contemporary World (40 Questions)
# =================================================================================================
CHAPTER_U5 = "Security in the Contemporary World"
u5_qs = []
u5_seen = set()

def add_u5(q):
    u5_qs.append(q)

opts, c, s = rotate_options(
    "Deterrence",
    ["Defence", "Alliance building", "Confidence building"],
    "A",
    "In traditional external security, deterrence refers to the policy of preventing war by convincing the adversary that the costs of aggression will far outweigh any potential gains.\nHence, Option {{CORR}} is correct.",
    "Identifies deterrence as the strategy of preventing war."
)
add_u5(make_question(CHAPTER_U5, "Traditional Security Concepts", "Which core concept of traditional security policy is defined as preventing war by demonstrating credible retaliatory punishment to an opponent?", opts, c, s))

opts, c, s = rotate_options(
    "1972",
    ["1968", "1992", "2001"],
    "B",
    "The Biological Weapons Convention (BWC) prohibiting the development, production, and stockpiling of biological weapons was opened for signature in 1972 and entered into force in 1975.\nHence, Option {{CORR}} is correct.",
    "Identifies 1972 as the signing year of the Biological Weapons Convention."
)
add_u5(make_question(CHAPTER_U5, "Arms Control Treaties", "In which year was the landmark Biological Weapons Convention (BWC) banning the development and stockpiling of biological agents opened for signature?", opts, c, s))

opts, c, s = rotate_options(
    "Freedom from fear and freedom from want for individuals and communities",
    ["Exclusively protecting national territorial borders with heavy artillery", "Equipping every citizen with a firearm for neighborhood patrol", "Banning all foreign tourists from crossing sovereign borders"],
    "C",
    "Human security shifts the referent object of security from the state to the individual, encompassing protection from violent conflict (freedom from fear) and deprivation of basic human needs (freedom from want).\nHence, Option {{CORR}} is correct.",
    "Defines human security as freedom from fear and want."
)
add_u5(make_question(CHAPTER_U5, "Human Security", "The non-traditional concept of 'Human Security' broadens the definition of security to focus primarily on:", opts, c, s))

opts, c, s = rotate_options(
    "11 September 2001 (9/11 attacks in the USA)",
    ["26 November 2008 (Mumbai attacks)", "13 December 2001 (Indian Parliament attack)", "7 July 2005 (London bombings)"],
    "D",
    "The 9/11 terrorist attacks in 2001, in which hijacked airliners destroyed the World Trade Center in New York and struck the Pentagon, brought global recognition to catastrophic non-state terrorism.\nHence, Option {{CORR}} is correct.",
    "Identifies 9/11 attacks in the USA."
)
add_u5(make_question(CHAPTER_U5, "Global Terrorism", "Which catastrophic event on 11 September 2001 brought international terrorism to the forefront of the global security agenda?", opts, c, s))

# Match question for Unit 5
add_u5(make_match_question(
    CHAPTER_U5, "Disarmament and Arms Control",
    "Match List I (Treaty/Concept) with List II (Key Feature):",
    [("A", "Chemical Weapons Convention (CWC)"), ("B", "Anti-Ballistic Missile (ABM) Treaty"), ("C", "Nuclear Non-Proliferation Treaty (NPT)"), ("D", "Confidence Building Measures (CBMs)")],
    [("I", "Signed in 1993 to ban chemical weapons and eliminate their stockpiles"), ("II", "Signed in 1972 by US and USSR to limit ballistic missile defence shields"), ("III", "Signed in 1968 recognizing only five pre-1967 nuclear weapon states"), ("IV", "Process of exchanging military information to avoid accidental war")],
    "A-I, B-II, C-III, D-IV", "A",
    "CWC signed 1993; ABM Treaty signed 1972; NPT signed 1968; CBMs involve military transparency.",
    "Matches arms control treaties with their defining features."
))

# Chronology question for Unit 5
add_u5(make_sequence_question(
    CHAPTER_U5, "Arms Control Timeline",
    "Arrange the following nuclear and conventional arms control agreements in chronological order:",
    [("A", "Nuclear Non-Proliferation Treaty (NPT)"), ("B", "Biological Weapons Convention (BWC)"), ("C", "Strategic Arms Reduction Treaty (START I)"), ("D", "Chemical Weapons Convention (CWC)")],
    "A, B, C, D", "B",
    "1. NPT signed (1968).\n2. BWC signed (1972).\n3. START I signed (1991).\n4. CWC signed (1993).",
    "Sequences arms control treaties chronologically."
))

# Statement question for Unit 5
add_u5(make_statement_question(
    CHAPTER_U5, "India's Security Strategy",
    "Strengthening internal unity and resolving regional insurgencies in the North-East and Punjab is a core component of India's comprehensive security strategy.",
    "India's security strategy focuses entirely on external military buildup and completely ignores domestic economic growth and poverty eradication.",
    3, "C",
    "Statement I is correct: Preserving national unity against internal separatism is vital. Statement II is false: Economic development to lift millions out of poverty is explicitly recognized as the fourth fundamental pillar of India's national security strategy.",
    "Evaluates the multi-dimensional components of India's security strategy."
))

# Assertion Reason for Unit 5
add_u5(make_assertion_question(
    CHAPTER_U5, "Non-Traditional Threats",
    "Global epidemics like HIV/AIDS, Ebola, and bird flu represent serious threats to international security.",
    "Contagious viral diseases easily cross sovereign national borders through global travel and trade, causing widespread economic devastation and human loss that individual states cannot contain in isolation.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains why pandemics are classified as security threats—their transnational spread and lethal societal impact disrupt states beyond military capabilities.",
    "Explains why health epidemics are categorized as non-traditional security threats."
))

# Multi statement for Unit 5
add_u5(make_multi_statement_question(
    CHAPTER_U5, "Balance of Power",
    "Which of the following methods are traditionally employed by nations to maintain a 'Balance of Power'?",
    [
        ("A", "Building up national economic and industrial muscle"),
        ("B", "Upgrading and modernising defense and military technology"),
        ("C", "Entering into strategic defense partnerships and alliances with other powers"),
        ("D", "Unilaterally surrendering all national territory to the nearest superpower")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A, B, and C describe standard mechanisms for building and maintaining balance of power. D is absurd and contrary to state sovereignty.",
    "Identifies traditional balance-of-power strategies."
))

# Direct questions for Unit 5
u5_direct = [
    ("Refugees vs Migrants", "What is the key distinction between 'refugees' and 'migrants' under international humanitarian law?",
     "Refugees flee across international borders due to war, persecution, or natural disaster, whereas migrants move voluntarily seeking better economic opportunities", ["Migrants carry weapons while refugees are unarmed", "Refugees travel exclusively by air while migrants travel by sea", "There is zero distinction; both words mean illegal foreign spies"], "A",
     "Refugees are forced to flee persecution or armed conflict and enjoy legal non-refoulement protection under the 1951 Refugee Convention, whereas migrants move voluntarily for work or education.", "Distinguishes refugees from economic migrants."),
    ("Internally Displaced Persons", "People who are forced to flee their homes due to violence or disaster but remain within the borders of their own country are known as:",
     "Internally Displaced Persons (IDPs)", ["Asylum seekers", "Extradited convicts", "Stateless citizens"], "B",
     "IDPs are forced from their communities but have not crossed an internationally recognized state border.", "Defines Internally Displaced Persons (IDPs)."),
    ("NPT Discrimination Clause", "Why did India refuse to sign the Nuclear Non-Proliferation Treaty (NPT) of 1968?",
     "India considered the NPT discriminatory because it legitimised nuclear weapons for five states while prohibiting all others from acquiring them", ["India wanted the treaty to ban all conventional rifles instead of nuclear bombs", "The treaty was written in Latin which Indian diplomats could not translate", "The treaty banned the production of civil nuclear electricity"], "C",
     "India rejected the NPT as fundamentally discriminatory, creating an unjust divide between nuclear 'haves' (pre-1967 P5 states) and nuclear 'have-nots'.", "Explains India's principled objection to the NPT."),
    ("START I and II Signatories", "The Strategic Arms Reduction Treaties (START I and START II) were negotiated and signed between which two powers?",
     "The United States and the Soviet Union (later the Russian Federation)", ["India and Pakistan", "China and Japan", "The United Kingdom and France"], "A",
     "START I (1991) and START II (1993) were bilateral treaties between the US and USSR/Russia establishing deep reductions in strategic offensive nuclear arms.", "Identifies US and USSR as START signatories."),
    ("Confidence Building Measures", "In traditional security, 'Confidence Building Measures' (CBMs) are primarily designed to:",
     "Prevent accidental war by sharing military information, force deployments, and doctrine between rival nations", ["Abolish all national intelligence services", "Mandate that rival generals live in each other's homes", "Merge rival armies into a single unified battalion"], "B",
     "CBMs ensure that neither side undertakes surprise mobilisations, building predictability and trust through transparency and communication.", "Defines purpose of Confidence Building Measures."),
    ("Global Poverty and Security", "High population growth coupled with low economic development in developing countries contributes to global insecurity primarily because:",
     "It fuels poverty, political instability, refugee crises, and resource conflicts that spill across borders", ["It forces poor countries to build aircraft carriers to invade North America", "It causes all oceans to evaporate due to industrial demand", "It eliminates the need for any international trade"], "C",
     "Poverty, state failure, and demographic pressure generate civil wars, insurgencies, and mass migration, impacting regional and global security.", "Links global poverty to international security."),
    ("Chemical Weapons Ban", "The Chemical Weapons Convention (CWC), which outlawed the production and use of all toxic chemical agents, was signed in:",
     "Paris in January 1993", ["London in 1945", "Geneva in 1919", "Washington in 2005"], "A",
     "The CWC was opened for signature in Paris in January 1993 and entered into force in April 1997 with its watchdog Organisation for the Prohibition of Chemical Weapons (OPCW).", "Identifies 1993 Paris signing of CWC."),
    ("Alliance Formation Motive", "In traditional external security, why do states form military alliances with one another?",
     "To combine their military capabilities and deter or defend against mutual adversaries", ["To adopt a single common religious faith across all allied parliaments", "To eliminate all trade tariffs on foreign luxury automobiles", "To allow foreign troops to abolish the national constitution"], "B",
     "Alliances are formal contractual partnerships where states pool capabilities to deter common threats (e.g. NATO Article 5).", "Explains rationale of military alliances."),
    ("New Threats Nature", "Unlike traditional military threats that originate from sovereign nation-states, non-traditional threats to security often arise from:",
     "Non-state actors, natural environments, and systemic socio-economic crises", ["Imperial monarchies of the eighteenth century", "Foreign space aliens invading the atmosphere", "Secret underwater naval civilizations"], "C",
     "Non-traditional threats include non-state terrorist syndicates, transnational criminal cartels, climate disruption, and pandemics.", "Defines non-traditional security actors."),
    ("SALT I and II", "The Strategic Arms Limitation Talks (SALT I and SALT II) of the 1970s aimed at:",
     "Placing caps and limits on the number of strategic ballistic missile launchers deployed by the US and USSR", ["Banning all nuclear weapons completely within 24 hours", "Eliminating all infantry foot soldiers in Europe", "Prohibiting submarines from navigating international waters"], "A",
     "SALT I (1972) and SALT II (1979) placed upper ceilings on strategic delivery vehicles (ICBMs and SLBMs) of the two superpowers.", "Defines objectives of SALT accords."),
    ("Terrorism Target Strategy", "Modern political terrorism typically targets civilians and non-combatants intentionally in order to:",
     "Create pervasive psychological panic and coerce governments into conceding political or ideological demands", ["Capture fertile agricultural land for collective farming", "Recruit civilians into the regular national border army", "Reduce national corporate income tax rates"], "B",
     "Terrorism relies on the deliberate terrorisation of civilian populations to shock the public and pressure political authorities.", "Explains strategic rationale of political terrorism."),
    ("Health and Global Security", "Why was the spread of HIV/AIDS in Sub-Saharan Africa recognized by the UN Security Council as a threat to international security?",
     "Because it decimated productive young workforces, police, and military personnel, threatening social and political collapse", ["Because it was caused by biological bombs dropped from military drones", "Because the virus made it impossible for ships to navigate the Cape of Good Hope", "Because it was manufactured in Soviet atomic laboratories"], "C",
     "In July 2000, the UNSC passed Resolution 1308 recognizing that the AIDS pandemic eroded state institutions and military forces, destabilising governance.", "Explains why HIV/AIDS was declared a security threat."),
    ("Traditional Internal Security", "Why was internal security not given as much attention in traditional Western security studies during the Cold War?",
     "Because most powerful Western industrialised nations had already consolidated internal state borders and order after WWII", ["Because internal police forces were completely banned across Europe", "Because domestic crime had been permanently eliminated in America", "Because citizens did not have the legal right to reside inside cities"], "A",
     "Western powers had settled domestic borders and achieved internal stability, allowing them to focus external security on the Soviet military threat.", "Explains Western Cold War focus on external security."),
    ("Third World Internal Insecurity", "Why were newly independent post-colonial Asian and African nations far more vulnerable to internal security threats?",
     "Because colonial borders arbitrarily divided ethnic groups, fueling violent separatist movements and civil wars", ["Because they had no rivers or arable land for food production", "Because they were legally prevented from recruiting police officers", "Because their citizens demanded immediate recolonisation by European empires"], "B",
     "Arbitrary colonial boundary drawing and diverse tribal/ethnic aspirations triggered widespread internal separatist strife across post-colonial states.", "Analyzes causes of Third World internal instability."),
    ("Weapon of Mass Destruction Category", "Which triad of weapons is collectively classified under international law as Weapons of Mass Destruction (WMDs)?",
     "Nuclear, Chemical, and Biological weapons", ["Rifles, Tanks, and Armoured Personnel Carriers", "Submarines, Torpedoes, and Depth Charges", "Radar, Satellites, and Telephones"], "C",
     "WMDs encompass nuclear, biological, and chemical weapons capable of causing indiscriminate large-scale mortality and devastation.", "Identifies the three categories of WMDs."),
    ("Cooperative Security", "The concept of 'Cooperative Security' emphasizes that non-traditional security threats can be resolved primarily through:",
     "International cooperation, diplomacy, multilateral institutions, and civil society partnerships rather than military force", ["Unilateral pre-emptive nuclear strikes against all neighboring states", "Closing all national borders and banning international internet traffic", "Abolishing the United Nations General Assembly"], "A",
     "Cooperative security stresses non-military instruments (negotiation, economic aid, international conventions, NGOs) to tackle poverty, disease, and migration.", "Defines Cooperative Security."),
    ("Anti-Ballistic Missile Treaty 1972", "The 1972 ABM Treaty between the US and USSR was crucial to nuclear stability because it:",
     "Prevented both superpowers from deploying nationwide missile shields that could encourage a first-strike advantage", ["Ordered the destruction of all nuclear warheads in existence", "Mandated that all US missiles be stored in Moscow for safekeeping", "Banned conventional artillery from being stationed along borders"], "B",
     "By preventing comprehensive missile defense shields, the ABM Treaty maintained Mutual Assured Destruction (MAD), deterring either side from launching a first strike.", "Explains strategic rationale of 1972 ABM Treaty."),
    ("US Withdrawal ABM Treaty", "In which year did the United States formally withdraw from the landmark 1972 Anti-Ballistic Missile (ABM) Treaty under President George W. Bush?",
     "2002", ["1991", "1998", "2015"], "C",
     "The US withdrew from the ABM Treaty in June 2002 to pursue development of a national ballistic missile defense shield.", "Identifies 2002 US withdrawal from ABM Treaty."),
    ("Kyoto Protocol Security Angle", "Global warming is increasingly treated as an ecological security threat because rising sea levels threaten to:",
     "Submerge low-lying island nations like the Maldives and displace hundreds of millions in coastal deltas", ["Freeze all equatorial oceans into solid icebergs", "Turn the atmosphere into pure methane gas overnight", "Eliminate all sunlight across the southern hemisphere"], "A",
     "Rising sea levels and extreme weather threaten existential inundation for island nations and coastal deltas, creating massive climate refugee crises.", "Links climate disruption to ecological security."),
    ("Biological Weapons Impact", "Why are biological weapons considered exceptionally insidious under international humanitarian norms?",
     "Because living pathogens (like anthrax or smallpox) cause horrific epidemics that can mutate unpredictably and cannot be controlled once unleashed", ["Because they only destroy brick walls without harming humans", "Because they can be intercepted easily with tennis racquets", "Because they only target military tanks while sparing soldiers"], "B",
     "Biological weapons disseminate virulent biological pathogens that produce uncontrollable, indiscriminate death and suffering.", "Highlights lethality of biological weaponry."),
    ("Comprehensive Test Ban Treaty", "The Comprehensive Nuclear-Test-Ban Treaty (CTBT) opened for signature in 1996 aimed at banning:",
     "All nuclear explosions, for both civilian and military purposes, in all environments", ["Only atmospheric nuclear tests while permitting underground testing", "Only testing of conventional naval torpedoes", "Civilian nuclear medicine treatments in municipal hospitals"], "A",
     "The CTBT bans all nuclear test explosions anywhere on earth—underground, underwater, or in the atmosphere.", "Defines the scope of the CTBT 1996."),
    ("Ottawa Treaty Landmines", "The 1997 Ottawa Convention (Mine Ban Treaty) completely prohibits the use, stockpiling, production, and transfer of:",
     "Anti-personnel landmines", ["Naval torpedoes", "Supersonic fighter jets", "Military satellites"], "A",
     "The Ottawa Convention signed in 1997 bans anti-personnel landmines to prevent horrific civilian injuries and deaths.", "Identifies Ottawa Treaty banning anti-personnel landmines."),
    ("Arms Trade Treaty", "The global Arms Trade Treaty (ATT) adopted by the UN General Assembly in 2013 aims to regulate:",
     "The international trade in conventional weapons and prevent their diversion to illicit markets", ["The mining of uranium in South America", "The sale of commercial passenger buses", "The domestic hunting of deer"], "A",
     "The ATT sets international standards for regulating cross-border trade in conventional arms from small weapons to tanks.", "Defines scope of Arms Trade Treaty 2013."),
    ("CTBTO Headquarters", "The Preparatory Commission for the Comprehensive Nuclear-Test-Ban Treaty Organization (CTBTO) is based in:",
     "Vienna, Austria", ["Geneva, Switzerland", "New York, USA", "Brussels, Belgium"], "A",
     "CTBTO has its headquarters in Vienna, running an international monitoring system to detect any nuclear test worldwide.", "Identifies Vienna as CTBTO headquarters."),
    ("Civil vs Socio-Economic Rights", "First-generation human rights traditionally focus on civil and political liberties, whereas second-generation human rights focus primarily on:",
     "Economic, social, and cultural rights such as healthcare, education, and adequate living standards", ["The right to colonise foreign nations", "The exclusive rights of royal monarchs", "The right to build private nuclear missiles"], "A",
     "First-generation rights encompass freedom of speech and political participation, while second-generation rights guarantee economic and social welfare.", "Distinguishes first and second generation human rights."),
    ("Disarmament vs Arms Control", "What is the key difference between 'Disarmament' and 'Arms Control' in international security studies?",
     "Disarmament requires giving up or destroying certain types of weapons, while arms control regulates and limits the development and deployment of weapons", ["Disarmament only applies to small firearms while arms control applies to cannons", "There is no difference; they are exact synonyms", "Arms control bans all military forces permanently"], "A",
     "Disarmament eliminates entire classes of weapons (e.g. CWC, BWC), whereas arms control regulates quantities, missile ranges, and deployment rules (e.g. SALT, START).", "Explains distinction between disarmament and arms control."),
    ("Left-Wing Extremism India", "In India, Left-Wing Extremism (Naxalism), which security agencies consider a major internal security challenge, originated in 1967 in:",
     "Naxalbari in Darjeeling district, West Bengal", ["Nagaland", "Bastar in Chhattisgarh", "Amritsar in Punjab"], "A",
     "The Naxalite movement erupted in 1967 in Naxalbari village under the leadership of Charu Majumdar and Kanu Sanyal.", "Identifies Naxalbari as origin of Left-Wing Extremism in India."),
    ("Fifth Domain of Warfare", "Along with the traditional domains of land, sea, air, and outer space, modern military theorists recognize which fifth critical domain of warfare?",
     "Cyberspace", ["Subterranean tunnels", "Polar icecaps", "Desert sand dunes"], "A",
     "Cyberspace is recognized as the fifth operational domain of warfare, where cyber attacks can cripple power grids, financial systems, and defense command networks.", "Identifies Cyberspace as fifth domain of warfare."),
    ("1925 Geneva Protocol", "The Geneva Protocol of 1925 banned the use of which weapons in international warfare following the horrors of World War I?",
     "Chemical and biological (asphyxiating and poisonous) weapons", ["All rifles and bayonets", "Steam-powered warships", "Military radar stations"], "A",
     "The 1925 Geneva Protocol prohibited the wartime use of chemical and bacteriological methods of warfare.", "Recalls 1925 Geneva Protocol banning chemical warfare."),
    ("Small Arms Proliferation", "The illicit proliferation of Small Arms and Light Weapons (SALW) causes devastating casualties worldwide primarily because:",
     "They are cheap, easily portable, simple to operate, and widely available to insurgent and criminal networks", ["They cause atomic radiation explosions", "They require nuclear power plants to charge their batteries", "They can only be purchased by national defense ministers"], "A",
     "SALW are responsible for the vast majority of direct conflict casualties and civil war deaths across the globe.", "Explains deadly impact of illicit small arms proliferation."),
    ("Climate as Threat Multiplier", "Why do international security analysts describe global climate disruption as a 'threat multiplier'?",
     "Because climate shocks aggravate existing vulnerabilities, creating food shortages, water scarcity, and political unrest that trigger violent conflict", ["Because cold weather doubles the number of tanks manufactured each year", "Because carbon dioxide acts as rocket fuel for intercontinental missiles", "Because warm temperatures prevent soldiers from using electronic radios"], "A",
     "Climate disruption multiplies existing instability, driving resource competition, mass displacement, and governance failure in fragile regions.", "Explains concept of climate as a threat multiplier.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u5_direct:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u5(make_question(CHAPTER_U5, topic, stem, opts, c, s))

u5_qs = u5_qs[:40]
assert len(u5_qs) == 40, f"Expected 40 questions for Unit 5, got {len(u5_qs)}"
validate_and_collect(u5_qs, u5_seen)
print("Unit 5 validated: 40 unique questions.")


# =================================================================================================
# UNIT 6: Environment and Natural Resources (60 Questions)
# =================================================================================================
CHAPTER_U6 = "Environment and Natural Resources"
u6_qs = []
u6_seen = set()

def add_u6(q):
    u6_qs.append(q)

opts, c, s = rotate_options(
    "Club of Rome in 1972",
    ["Brundtland Commission in 1987", "Stockholm Conference in 1992", "Kyoto Forum in 1997"],
    "A",
    "The Club of Rome, an international think tank, published the influential report 'Limits to Growth' in 1972, dramatising the potential depletion of the Earth's finite resources by growing population and industrialisation.\nHence, Option {{CORR}} is correct.",
    "Identifies Club of Rome and 1972 for 'Limits to Growth'."
)
add_u6(make_question(CHAPTER_U6, "Environmental Awakening", "Which international group of intellectuals and scientists published the landmark report titled 'Limits to Growth' in 1972?", opts, c, s))

opts, c, s = rotate_options(
    "Rio de Janeiro, Brazil in June 1992",
    ["Stockholm, Sweden in June 1972", "Kyoto, Japan in December 1997", "Johannesburg, South Africa in September 2002"],
    "B",
    "The United Nations Conference on Environment and Development (UNCED), widely celebrated as the 'Earth Summit', was held in Rio de Janeiro, Brazil in June 1992.\nHence, Option {{CORR}} is correct.",
    "Identifies Rio de Janeiro and 1992 for Earth Summit."
)
add_u6(make_question(CHAPTER_U6, "Rio Earth Summit", "In which city and year was the historic United Nations Conference on Environment and Development (Earth Summit) convened?", opts, c, s))

opts, c, s = rotate_options(
    "Common but Differentiated Responsibilities (CBDR)",
    ["Equal and Identical Responsibilities (EIR)", "Unilateral Historical Accountability (UHA)", "Voluntary Non-Binding Preservation (VNBP)"],
    "C",
    "Principle 7 of the Rio Declaration enshrined 'Common but Differentiated Responsibilities', acknowledging that developed nations bear greater responsibility for global environmental degradation due to historical emissions.\nHence, Option {{CORR}} is correct.",
    "Identifies Common but Differentiated Responsibilities (CBDR)."
)
add_u6(make_question(CHAPTER_U6, "Rio Principles", "Which fundamental principle adopted at the 1992 Rio Earth Summit asserts that developed nations must bear greater responsibility for mitigating climate change due to historical emissions?", opts, c, s))

opts, c, s = rotate_options(
    "Kyoto Protocol (1997)",
    ["Montreal Protocol (1987)", "Antarctic Treaty (1959)", "Geneva Protocol (1925)"],
    "D",
    "The Kyoto Protocol to the UNFCCC was adopted in December 1997 in Kyoto, Japan, setting legally binding greenhouse gas reduction targets for industrialised (Annex I) countries.\nHence, Option {{CORR}} is correct.",
    "Identifies Kyoto Protocol 1997."
)
add_u6(make_question(CHAPTER_U6, "Kyoto Protocol", "Which international agreement adopted in 1997 set legally binding greenhouse gas emissions reduction targets for developed industrialised nations?", opts, c, s))

# Match questions for Unit 6
add_u6(make_match_question(
    CHAPTER_U6, "Global Environmental Treaties",
    "Match List I (Treaty/Accord) with List II (Key Objective / Year):",
    [("A", "Antarctic Treaty"), ("B", "Montreal Protocol"), ("C", "Kyoto Protocol"), ("D", "Paris Climate Agreement")],
    [("I", "1959: Demilitarised Antarctica and dedicated it to peaceful scientific research"), ("II", "1987: Mandated phasing out of ozone-depleting chlorofluorocarbons (CFCs)"), ("III", "1997: Legally binding emissions reduction targets for developed countries"), ("IV", "2015: Committing global nations to limit warming well below 2°C")],
    "A-I, B-II, C-III, D-IV", "A",
    "Antarctic Treaty signed 1959; Montreal Protocol 1987; Kyoto Protocol 1997; Paris Agreement 2015.",
    "Matches international environmental treaties with their objectives and enactment dates."
))

add_u6(make_match_question(
    CHAPTER_U6, "Global Commons and Regimes",
    "Match List I (Global Common) with List II (Governing International Framework):",
    [("A", "Earth's Atmosphere"), ("B", "Antarctica"), ("C", "Outer Space"), ("D", "Deep Sea Floor")],
    [("I", "UNFCCC and Montreal Protocol"), ("II", "Antarctic Treaty System and 1991 Environmental Protocol"), ("III", "1967 Outer Space Treaty"), ("IV", "1982 UN Convention on the Law of the Sea (UNCLOS)")],
    "A-I, B-II, C-III, D-IV", "B",
    "Atmosphere is protected by UNFCCC/Montreal Protocol; Antarctica by Antarctic Treaty; Outer Space by 1967 Treaty; Sea Floor by UNCLOS.",
    "Matches global commons with their governing international legal regimes."
))

# Chronology questions for Unit 6
add_u6(make_sequence_question(
    CHAPTER_U6, "Environmental Summits Chronology",
    "Arrange the following landmark international environmental conferences and reports in chronological sequence:",
    [("A", "Stockholm Conference on the Human Environment"), ("B", "Brundtland Report 'Our Common Future' published"), ("C", "Rio Earth Summit (UNCED)"), ("D", "Kyoto Climate Conference")],
    "A, B, C, D", "C",
    "1. Stockholm Conference (1972).\n2. Brundtland Report (1987).\n3. Rio Earth Summit (1992).\n4. Kyoto Conference (1997).",
    "Chronologically sequences global environmental milestones."
))

add_u6(make_sequence_question(
    CHAPTER_U6, "Indian Climate Policy Evolution",
    "Arrange the following Indian legislative and policy enactments related to energy and climate in chronological order:",
    [("A", "Energy Conservation Act enacted"), ("B", "India formally ratifies the Kyoto Protocol"), ("C", "Electricity Act encouraging renewable energy enacted"), ("D", "National Action Plan on Climate Change (NAPCC) launched")],
    "A, B, C, D", "D",
    "1. Energy Conservation Act (2001).\n2. India ratified Kyoto Protocol (August 2002).\n3. Electricity Act (2003).\n4. NAPCC launched with 8 missions (June 2008).",
    "Sequences Indian domestic climate and energy legislative actions."
))

# Statement questions for Unit 6
add_u6(make_statement_question(
    CHAPTER_U6, "India Kyoto Obligations",
    "India and China were exempted from mandatory emissions reduction targets under the 1997 Kyoto Protocol because their historical emissions and per-capita emissions were very low compared to developed countries.",
    "The United States Congress unconditionally ratified the Kyoto Protocol and met all its carbon reduction targets ahead of schedule.",
    3, "C",
    "Statement I is correct: Non-Annex I developing countries were not assigned binding cuts under CBDR. Statement II is false: The US never ratified the Kyoto Protocol and George W. Bush formally withdrew from it in 2001.",
    "Evaluates the Kyoto Protocol's differentiation between developed and developing nations."
))

add_u6(make_statement_question(
    CHAPTER_U6, "Resource Geopolitics",
    "Petroleum continues to be the single most vital resource that fuels global transport and industrial economies.",
    "The vast majority of remaining proven global petroleum reserves are located in Western Europe and Japan.",
    3, "C",
    "Statement I is correct: Oil is indispensable for modern logistics and petrochemicals. Statement II is incorrect: About 64% of proven global oil reserves are concentrated in the Persian Gulf and Middle East, not Western Europe or Japan.",
    "Identifies geopolitical distribution of petroleum reserves."
))

# Assertion Reason for Unit 6
add_u6(make_assertion_question(
    CHAPTER_U6, "Global South Perspective",
    "Developing countries at the Rio Summit argued that environmental issues must be addressed concurrently with economic development and poverty eradication.",
    "Developed countries of the Global North had achieved industrial prosperity through centuries of unchecked fossil fuel consumption, creating the bulk of cumulative atmospheric greenhouse gases.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains why the Global South demanded development alongside environment—they insisted that historical polluters pay for mitigation while developing states focus on uplifting their poor.",
    "Explains Global South's development-first environmental diplomacy."
))

add_u6(make_assertion_question(
    CHAPTER_U6, "Water Wars Concept",
    "Freshwater resources have emerged as a potential source of violent international conflict in the twenty-first century.",
    "Downstream countries fear that upstream nations can manipulate river flows by constructing massive dams or diverting water during dry seasons.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains the mechanism of potential 'water wars'—upstream damming creates strategic vulnerability and severe water deprivation for downstream riparians.",
    "Validates causes of international river disputes and potential water conflicts."
))

# Multi statement for Unit 6
add_u6(make_multi_statement_question(
    CHAPTER_U6, "NAPCC Missions",
    "Which of the following are among the eight official missions under India's National Action Plan on Climate Change (NAPCC)?",
    [
        ("A", "National Solar Mission"),
        ("B", "National Mission for Enhanced Energy Efficiency"),
        ("C", "National Water Mission"),
        ("D", "National Mission for Arctic Oil Drilling")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements A, B, and C are among the 8 official missions launched in 2008. Statement D is completely fictitious and contradictory to climate action.",
    "Identifies official missions under India's National Action Plan on Climate Change."
))

add_u6(make_multi_statement_question(
    CHAPTER_U6, "Indigenous Peoples Definition",
    "Which of the following characteristics describe indigenous communities as recognized by the United Nations?",
    [
        ("A", "They are descendants of the original inhabitants of a territory who were subjugated by incoming colonisers."),
        ("B", "They maintain distinct social, economic, cultural, and spiritual traditions tied to their ancestral lands."),
        ("C", "They often struggle to protect their natural habitats against large-scale mining and commercial logging."),
        ("D", "They constitute the ruling corporate billionaires who control international petroleum cartels.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A, B, and C accurately characterize indigenous populations per UN definitions and NCERT. Statement D is false because indigenous peoples are often economically marginalized and vulnerable to displacement.",
    "Defines indigenous populations and their struggle for land rights."
))

# Direct MCQs for Unit 6
u6_direct = [
    ("Global Commons Meaning", "Under international law, the term 'Global Commons' refers to:",
     "Areas and resources that are not under the sovereign jurisdiction of any single state and require common governance", ["All private agricultural farmlands across Asia", "Gold bullion stored in national treasury vaults", "Exclusive economic zones within 12 miles of every coastline"], "A",
     "The global commons encompass shared planetary resources like the atmosphere, outer space, oceans, and Antarctica that belong to humanity as a whole.", "Defines Global Commons."),
    ("Antarctic Environmental Protocol", "The Madrid Protocol on Environmental Protection to the Antarctic Treaty, signed in 1991, strictly prohibits:",
     "All commercial mineral prospecting, mining, and oil extraction activities in Antarctica for at least 50 years", ["All scientific climate research experiments", "Penguins from inhabiting coastal ice shelves", "Meteorological balloons from flying over the South Pole"], "B",
     "The 1991 Madrid Protocol designated Antarctica as a natural reserve devoted to peace and science, banning all commercial mining.", "Identifies 1991 Madrid Protocol banning Antarctic mining."),
    ("Ozone Depletion Substance", "The primary synthetic chemicals responsible for stratospheric ozone layer depletion, targeted by the 1987 Montreal Protocol, are:",
     "Chlorofluorocarbons (CFCs)", ["Methane and Nitrous Oxide", "Carbon Monoxide and Ash", "Water Vapour and Oxygen"], "C",
     "CFCs widely used in refrigeration and aerosols break down ozone molecules in the stratosphere; the Montreal Protocol successfully phased them out.", "Identifies CFCs as ozone-depleting substances."),
    ("Agenda 21 Nature", "What was 'Agenda 21' adopted at the 1992 Rio Earth Summit?",
     "A non-binding, voluntary action plan for achieving sustainable development in the 21st century", ["A binding military treaty requiring all nations to disarm by 2021", "A trade pact creating a single global currency for grain", "A declaration declaring war on industrialized nations"], "A",
     "Agenda 21 is a comprehensive global blueprint for sustainable development adopted by 178 governments at the Rio Summit.", "Defines Agenda 21."),
    ("Brundtland Sustainable Development", "The 1987 Brundtland Commission Report 'Our Common Future' famously defined 'Sustainable Development' as development that:",
     "Meets the needs of the present generation without compromising the ability of future generations to meet their own needs", ["Maximizes current consumption of coal and oil before prices rise", "Requires developing countries to halt all hospital and road construction", "Subordinates environmental conservation completely to stock market profits"], "B",
     "The classic Brundtland definition emphasizes inter-generational equity and meeting present human needs while conserving planetary resources for the future.", "Recalls Brundtland definition of Sustainable Development."),
    ("India Kyoto Ratification", "In which month and year did India formally ratify the Kyoto Protocol?",
     "August 2002", ["December 1997", "January 2000", "October 2015"], "A",
     "India acceded to the Kyoto Protocol in August 2002, championing the principle of Common but Differentiated Responsibilities.", "Identifies August 2002 for India's Kyoto ratification."),
    ("Middle East Oil Reserves", "Approximately what percentage of the world's known commercially recoverable petroleum reserves are concentrated in the Gulf and Middle East?",
     "Approximately 64 percent", ["Less than 10 percent", "Exactly 99 percent", "Around 25 percent"], "A",
     "The Middle East accounts for roughly 64% of proven global oil reserves, with Saudi Arabia holding the largest conventional reserves in the region.", "Quantifies Middle East share of global oil reserves."),
    ("Saudi Arabia Oil Rank", "Which country has historically possessed the single largest known conventional oil reserves in the Middle East and acted as the swing producer of OPEC?",
     "Saudi Arabia", ["Iraq", "Kuwait", "United Arab Emirates"], "A",
     "Saudi Arabia possesses immense conventional reserves (over a quarter of world total in earlier decades) and leads OPEC production decisions.", "Identifies Saudi Arabia as leading oil producer."),
    ("Jordan River Dispute", "Tensions and military skirmishes over water diversions from the Jordan and Yarmouk rivers have historically involved which countries?",
     "Israel, Jordan, Syria, and Lebanon", ["India, Pakistan, and China", "Egypt, Sudan, and Ethiopia", "Brazil, Argentina, and Paraguay"], "A",
     "Water scarcity in the arid Jordan River basin has been a persistent driver of conflict among Israel, Jordan, Syria, and the Palestinians.", "Identifies riparians of the Jordan River basin."),
    ("Euphrates-Tigris Dispute", "The construction of the massive Southeastern Anatolia Project (GAP) dams by Turkey sparked severe water disputes with which two downstream nations?",
     "Syria and Iraq", ["Iran and Kuwait", "Jordan and Israel", "Egypt and Sudan"], "A",
     "Turkey's damming of the Euphrates and Tigris rivers significantly curtailed downstream flows into Syria and Iraq, creating ongoing geopolitical friction.", "Identifies Syria and Iraq as downstream riparians of Euphrates-Tigris."),
    ("Adivasi Rights in India", "In India, the indigenous tribal communities are officially recognized in the Constitution as:",
     "Scheduled Tribes (STs)", ["Other Backward Classes (OBCs)", "Special Agricultural Communities", "Frontier Guilds"], "A",
     "Indigenous peoples in India are constitutionally designated as Scheduled Tribes (Adivasis), comprising roughly 8% of the national population.", "Identifies Scheduled Tribes as Indian constitutional term for indigenous peoples."),
    ("World Council Indigenous Peoples", "The World Council of Indigenous Peoples (WCIP), formed to unite indigenous groups globally, was established in:",
     "1975", ["1950", "1992", "2007"], "A",
     "The WCIP was founded in 1975 in Port Alberni, Canada, becoming the first international indigenous NGO to achieve UN consultative status.", "Identifies 1975 founding of World Council of Indigenous Peoples."),
    ("UN Declaration Indigenous Rights", "The United Nations Declaration on the Rights of Indigenous Peoples (UNDRIP) was adopted by the General Assembly in:",
     "September 2007", ["June 1992", "January 2000", "December 2015"], "A",
     "UNDRIP was adopted on 13 September 2007, affirming the collective rights of indigenous peoples to self-determination, culture, and ancestral land.", "Identifies September 2007 for UNDRIP adoption."),
    ("Energy Conservation Act 2001", "The Bureau of Energy Efficiency (BEE) in India was established under which landmark legislative statute?",
     "Energy Conservation Act of 2001", ["Air Pollution Act of 1981", "Environment Protection Act of 1986", "Forest Conservation Act of 1980"], "A",
     "The Bureau of Energy Efficiency (BEE) was created in March 2002 under the provisions of the Energy Conservation Act, 2001.", "Identifies Energy Conservation Act 2001 creating BEE."),
    ("Per Capita Emissions India", "In international climate negotiations, India consistently points out that its per capita greenhouse gas emissions are:",
     "Dramatically lower than the global average and a fraction of developed nations' emissions", ["The highest in the world, exceeding the United States and Canada", "Exactly equal to Germany and the United Kingdom", "Zero, because India does not use any electricity"], "A",
     "India's per capita emissions remain under 2 tonnes of CO2 per year, far below the world average (approx 4.5 tonnes) and the US average (over 14 tonnes).", "Emphasizes India's low per capita emissions record."),
    ("Paris Agreement 2015 Goal", "The 2015 Paris Climate Agreement legally committed signatory nations to hold the increase in the global average temperature to:",
     "Well below 2°C above pre-industrial levels and pursue efforts to limit it to 1.5°C", ["Exactly 5°C above pre-industrial levels", "Zero degrees Celsius worldwide", "Below 10°C to encourage desert agriculture"], "A",
     "Article 2 of the Paris Agreement sets the goal of limiting global warming to well below 2°C, and striving for 1.5°C.", "Specifies Paris Agreement temperature targets."),
    ("Chipko Movement", "The famous Chipko Movement that originated in the 1970s in the Uttarakhand Himalayas was primarily a grassroots protest against:",
     "Commercial logging of forest trees by villagers hugging the trees", ["Construction of nuclear missile silos on farm fields", "Import of American wheat under PL 480", "Establishment of chemical fertilizer factories in villages"], "A",
     "The Chipko movement began in 1973 in Chamoli district where villagers, led by women and leaders like Sunderlal Bahuguna, hugged trees to prevent logging.", "Describes Chipko movement."),
    ("Narmada Bachao Andolan", "The Narmada Bachao Andolan (NBA) led by Medha Patkar mobilized mass resistance primarily against:",
     "The construction of mega-dams like Sardar Sarovar and the displacement of indigenous tribal and rural populations", ["The export of basmati rice to European markets", "The introduction of solar energy panels across Gujarat", "The nationalisation of commercial banks in 1969"], "A",
     "NBA campaigned against the displacement of hundreds of thousands of people, demanding fair rehabilitation and ecological justice in the Narmada valley.", "Identifies Narmada Bachao Andolan focus."),
    ("Nile River Riparian Tensions", "The Grand Ethiopian Renaissance Dam (GERD) on the Blue Nile has caused deep diplomatic friction between Ethiopia and which downstream country?",
     "Egypt", ["Kenya", "South Africa", "Nigeria"], "A",
     "Egypt depends on the Nile for over 90% of its freshwater and views upstream damming of the Blue Nile by Ethiopia as an existential security concern.", "Identifies Egypt's concern over the Nile."),
    ("Antarctica Sovereignty Claims", "How are conflicting national territorial sovereignty claims over Antarctica treated under the 1959 Antarctic Treaty?",
     "All existing territorial claims are legally frozen, and no new claims may be made while the treaty is in force", ["The entire continent was permanently awarded to the United Kingdom", "Antarctica was divided equally among the five permanent members of the UN Security Council", "Antarctica was auctioned to private oil conglomerates"], "A",
     "Article IV of the Antarctic Treaty freezes all existing sovereignty claims, preventing territorial disputes and preserving Antarctica for science.", "Explains Antarctic Treaty Article IV on frozen sovereignty claims."),
    ("Bio-piracy Concept", "The unauthorized exploitation of indigenous biological resources and traditional community knowledge by foreign corporations without fair compensation is known as:",
     "Bio-piracy", ["Bio-degradation", "Bio-magnification", "Bio-remediation"], "A",
     "Bio-piracy involves patenting indigenous plants (e.g. neem, turmeric, basmati) and traditional knowledge by foreign entities without consent.", "Defines bio-piracy."),
    ("Stockholm Conference 1972", "The 1972 United Nations Conference on the Human Environment, which led to the creation of UNEP, was held in:",
     "Stockholm, Sweden", ["Oslo, Norway", "Helsinki, Finland", "Copenhagen, Denmark"], "A",
     "The historic Stockholm Conference of June 1972 was the UN's first major conference on international environmental issues.", "Identifies Stockholm Conference 1972."),
    ("Global Commons Outer Space", "Under the 1967 Outer Space Treaty, outer space, including the Moon and other celestial bodies, is legally defined as:",
     "The province of all mankind, not subject to national appropriation by claim of sovereignty", ["The sovereign exclusive domain of the United States military", "Private commercial territory owned by satellite manufacturing corporations", "Territory reserved exclusively for Warsaw Pact cosmonauts"], "A",
     "Article II of the 1967 Outer Space Treaty forbids national appropriation of outer space by claims of sovereignty or occupation.", "Explains Outer Space Treaty common heritage principle."),
    ("UNCLOS Exclusive Economic Zone", "Under the 1982 UNCLOS treaty, a coastal state's Exclusive Economic Zone (EEZ) extends seaward from its baseline up to:",
     "200 nautical miles", ["12 nautical miles", "50 nautical miles", "500 nautical miles"], "A",
     "UNCLOS grants coastal nations sovereign rights over living and non-living resources up to 200 nautical miles from their territorial sea baseline.", "Specifies 200 nautical miles for EEZ."),
    ("OPEC Cartel Founding", "The Organization of the Petroleum Exporting Countries (OPEC) was founded in September 1960 at a conference in:",
     "Baghdad, Iraq", ["Tehran, Iran", "Riyadh, Saudi Arabia", "Kuwait City, Kuwait"], "A",
     "OPEC was established in Baghdad by five founding members: Iran, Iraq, Kuwait, Saudi Arabia, and Venezuela.", "Identifies Baghdad founding of OPEC."),
    ("First Earth Summit Date", "The exact year in which Indian Prime Minister Indira Gandhi delivered her famous speech 'Poverty is the worst polluter' at Stockholm was:",
     "1972", ["1965", "1980", "1984"], "A",
     "Indira Gandhi attended the 1972 Stockholm Conference as the only foreign head of government present besides the host Swedish Prime Minister.", "Recalls Indira Gandhi's 1972 Stockholm speech."),
    ("Biodiversity Convention 1992", "The Convention on Biological Diversity (CBD) opened for signature at the 1992 Rio Summit aims to:",
     "Conserve biological diversity, promote sustainable use of its components, and ensure fair sharing of benefits", ["Eliminate all insects and marine bacteria", "Mandate that all forests be owned by multinational timber cartels", "Ban indigenous peoples from residing in forests"], "A",
     "The CBD is an international legal treaty committed to conservation of biodiversity and fair benefit-sharing from genetic resources.", "Defines Convention on Biological Diversity."),
    ("Desertification Convention", "The UN Convention to Combat Desertification (UNCCD), created directly as a recommendation of the Rio Summit, was adopted in:",
     "1994", ["1980", "2005", "2015"], "A",
     "The UNCCD was adopted in Paris in June 1994 to address land degradation in arid and dryland regions.", "Identifies 1994 for UNCCD adoption."),
    ("Silent Valley Movement", "The Silent Valley environmental movement in Kerala during the late 1970s successfully prevented the construction of a hydroelectric dam across the:",
     "Kunthipuzha River", ["Periyar River", "Pamba River", "Bharathapuzha River"], "A",
     "The Silent Valley protest saved pristine tropical evergreen rainforest from submersion by a dam on the Kunthipuzha river.", "Identifies Silent Valley movement in Kerala."),
    ("Global Environmental Facility", "The Global Environment Facility (GEF), established in 1991 to fund environmental projects in developing nations, is administered in partnership with:",
     "The World Bank, UNEP, and UNDP", ["NATO and the Warsaw Pact", "OPEC and the International Energy Agency", "Amnesty International and Greenpeace"], "A",
     "The GEF operates as an independent financial organization uniting 184 countries with international institutions to address global environmental issues.", "Identifies Global Environment Facility partners."),
    ("Basel Convention", "The Basel Convention adopted in 1989 regulates the international movement and disposal of:",
     "Hazardous wastes and their transboundary movement, preventing toxic dumping in developing nations", ["Genetically modified wheat seeds", "Electric passenger automobiles", "Commercial passenger aircraft"], "A",
     "The Basel Convention protects developing nations from becoming dumping grounds for toxic and hazardous industrial waste from developed states.", "Identifies Basel Convention on hazardous wastes 1989."),
    ("Stockholm Convention POPs", "The Stockholm Convention adopted in 2001 aims to protect human health and the environment from:",
     "Persistent Organic Pollutants (POPs) such as DDT and dioxins", ["Solar ultraviolet radiation", "Excessive rainfall in tropical zones", "Natural sea salt accumulation"], "A",
     "The Stockholm Convention targets toxic, bioaccumulative chemical substances that persist in the environment for decades.", "Identifies Stockholm Convention on POPs 2001."),
    ("Minamata Convention", "The Minamata Convention on Mercury adopted in 2013 was named after the Japanese city that suffered severe contamination from:",
     "Industrial discharges of highly toxic mercury poisoning the local fish and population", ["Nuclear fallout from an atomic test", "An oil spill from a supertanker", "Acid rain caused by coal furnaces"], "A",
     "The convention is named after Minamata Bay, where chemical factory dumping of methylmercury caused horrific neurological disease among thousands of residents.", "Explains Minamata Convention on Mercury."),
    ("Clean Development Mechanism", "Under the Kyoto Protocol, the Clean Development Mechanism (CDM) allowed developed Annex I countries to:",
     "Earn carbon emission credits by investing in emission-reduction projects in developing nations", ["Export high-sulfur coal to developing nations without tariffs", "Build nuclear missile silos in the polar circles", "Abolish all national environmental ministries"], "A",
     "The CDM enabled developed countries to meet emission caps cost-effectively while promoting sustainable development technology in developing countries.", "Explains Clean Development Mechanism under Kyoto Protocol."),
    ("Green Climate Fund", "The Green Climate Fund (GCF) established under the UNFCCC at the 2010 Cancun Summit is designed to:",
     "Channel financial resources from developed countries to assist developing nations in climate adaptation and mitigation", ["Subsidise oil exploration in deep marine trenches", "Provide venture capital to luxury private jet manufacturers", "Pay cash bonuses to coal mining conglomerates"], "A",
     "The GCF is the premier international climate fund supporting developing countries to achieve low-emission and climate-resilient development.", "Identifies Green Climate Fund 2010."),
    ("International Solar Alliance", "The International Solar Alliance (ISA), launched jointly by India and France in 2015, has its global headquarters located in:",
     "Gurugram (Haryana), India", ["Paris, France", "Nairobi, Kenya", "Geneva, Switzerland"], "A",
     "Prime Minister Narendra Modi and French President François Hollande launched the ISA at COP21, establishing its headquarters in Gurugram, India.", "Identifies Gurugram as headquarters of International Solar Alliance."),
    ("Mission LiFE", "In 2022, India introduced 'Mission LiFE' to global climate discourse, which advocates for:",
     "Lifestyle for Environment—individual and collective pro-planet behavioral choices and mindful consumption", ["Compulsory vegetarianism enforced by international police", "A total ban on all electronic computers and phones", "The relocation of urban populations into remote deserts"], "A",
     "Mission LiFE emphasizes demand-side climate action through sustainable individual lifestyles and conscious resource utilization.", "Defines India's Mission LiFE initiative."),
    ("Rotterdam Convention", "The 1998 Rotterdam Convention establishes a legally binding system of 'Prior Informed Consent' (PIC) for:",
     "Certain hazardous chemicals and pesticides in international trade", ["The export of fresh organic fruits and vegetables", "The cross-border transmission of television news broadcasts", "The migration of wild birds across national borders"], "A",
     "The Rotterdam Convention ensures that countries receiving hazardous chemicals have consented to their import with full safety knowledge.", "Defines Rotterdam Convention on Prior Informed Consent."),
    ("World Environment Day", "World Environment Day, established by the UN General Assembly to commemorate the 1972 Stockholm Conference, is celebrated globally on:",
     "5 June", ["22 April", "22 March", "16 September"], "A",
     "World Environment Day has been celebrated on 5 June annually since 1973 as the UN's principal day for environmental awareness.", "Identifies 5 June as World Environment Day."),
    ("Earth Day", "International Mother Earth Day, first celebrated in the United States in 1970 to promote environmental conservation, is observed every year on:",
     "22 April", ["5 June", "21 March", "10 December"], "A",
     "Earth Day is observed on 22 April worldwide to demonstrate support for environmental protection.", "Identifies 22 April as Earth Day."),
    ("World Water Day", "World Water Day, focusing on the importance of freshwater and advocating for sustainable freshwater management, is observed annually on:",
     "22 March", ["22 April", "5 June", "1 December"], "A",
     "Designated by the UN General Assembly in 1993, World Water Day is commemorated every year on 22 March.", "Identifies 22 March as World Water Day."),
    ("Montreal Protocol Ozone Day", "The International Day for the Preservation of the Ozone Layer is commemorated annually on which date to mark the 1987 Montreal Protocol?",
     "16 September", ["5 June", "22 March", "15 August"], "A",
     "In 1994, the UN General Assembly proclaimed 16 September the International Day for the Preservation of the Ozone Layer.", "Identifies 16 September as World Ozone Day."),
    ("Virtual Water Concept", "In resource geopolitics, the term 'Virtual Water' refers to:",
     "The hidden volume of freshwater consumed throughout the production process of agricultural crops and manufactured goods", ["Water produced artificially inside computer video games", "Desalinated ocean water used only in laboratory beakers", "Water that exists exclusively in outer space comets"], "A",
     "Virtual water is the embedded water required to produce goods (e.g. it takes thousands of litres of water to produce 1 kg of beef or cotton).", "Defines Virtual Water concept."),
    ("Water Footprint Concept", "An individual's or country's 'Water Footprint' measures:",
     "The total volume of freshwater used directly and indirectly to produce the goods and services consumed", ["The physical depth of footprints left on wet sandy beaches", "The number of water bottles stored in a home refrigerator", "The percentage of rainfall absorbed by rooftop solar panels"], "A",
     "Water footprint quantifies the total volume of freshwater appropriated across the entire supply chain of goods and services consumed.", "Defines Water Footprint concept."),
    ("Panchamrit Targets COP26", "At the COP26 summit in Glasgow (2021), India announced its 'Panchamrit' climate pledges, including achieving Net Zero carbon emissions by:",
     "2070", ["2030", "2040", "2050"], "A",
     "India pledged to meet 50% of its energy requirements from renewable energy by 2030 and achieve Net Zero carbon emissions by 2070.", "Identifies India's Net Zero target year of 2070."),
    ("Carbon Credit Concept", "Under market-based climate mechanisms, one 'Carbon Credit' corresponds to the certified reduction or avoidance of:",
     "One metric tonne of carbon dioxide (or equivalent greenhouse gas)", ["One kilogram of unrefined coal", "One litre of crude petroleum", "One cubic metre of atmospheric oxygen"], "A",
     "A carbon credit is a tradable permit representing the right to emit one tonne of carbon dioxide or its GHG equivalent.", "Defines the standard unit of a Carbon Credit."),
    ("Emissions Trading Scheme", "In 'Cap-and-Trade' emissions trading systems, companies that emit less than their allocated carbon permits can:",
     "Sell their surplus emission allowances to other companies that exceed their emissions caps", ["Exchange permits for physical gold bars at central banks", "Demand that the government double their corporate income taxes", "Confiscate factories owned by their competitors"], "A",
     "Cap-and-trade creates a financial incentive for decarbonisation by allowing clean firms to monetize unused carbon allowances.", "Explains Cap-and-Trade carbon trading mechanics."),
    ("Joint Implementation Kyoto", "Under the Kyoto Protocol, 'Joint Implementation' (JI) allowed Annex I industrialised countries to:",
     "Earn emission reduction units by investing in clean technology projects in other Annex I industrialised countries", ["Invade developing nations to confiscate their natural gas reserves", "Construct offshore coal-fired power plants in international waters", "Transfer toxic waste to Antarctica"], "A",
     "Joint Implementation enabled industrialised nations to cooperate on emissions reduction projects within other Annex I countries, primarily in Eastern Europe.", "Explains Joint Implementation under Kyoto Protocol.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u6_direct:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u6(make_question(CHAPTER_U6, topic, stem, opts, c, s))

u6_qs = u6_qs[:60]
assert len(u6_qs) == 60, f"Expected 60 questions for Unit 6, got {len(u6_qs)}"
validate_and_collect(u6_qs, u6_seen)
print("Unit 6 validated: 60 unique questions.")


# =================================================================================================
# UNIT 7: Globalisation (40 Questions)
# =================================================================================================
CHAPTER_U7 = "Globalisation"
u7_qs = []
u7_seen = set()

def add_u7(q):
    u7_qs.append(q)

opts, c, s = rotate_options(
    "Flows of ideas, capital, commodities, and people across national borders",
    ["The physical movement of continents due to tectonic plate shifts", "The compulsory unification of all world currencies into gold bars", "The total military annexation of all small states by superpowers"],
    "A",
    "Globalisation as a multi-dimensional concept deals fundamentally with 'flows'—the interconnected transnational movement of ideas, capital, goods, services, and human beings.\nHence, Option {{CORR}} is correct.",
    "Defines globalisation fundamentally as interconnected flows."
)
add_u7(make_question(CHAPTER_U7, "Concept of Globalisation", "As a multidimensional concept in contemporary political science, globalisation deals fundamentally with:", opts, c, s))

opts, c, s = rotate_options(
    "1991",
    ["1980", "1999", "2008"],
    "B",
    "In 1991, faced with an acute balance of payments crisis, India launched structural economic reforms encompassing Liberalisation, Privatisation, and Globalisation (LPG).\nHence, Option {{CORR}} is correct.",
    "Identifies 1991 as the year India initiated LPG economic reforms."
)
add_u7(make_question(CHAPTER_U7, "India and Globalisation", "In which year did India initiate its far-reaching economic reforms of Liberalisation, Privatisation, and Globalisation (LPG)?", opts, c, s))

opts, c, s = rotate_options(
    "World Social Forum (WSF)",
    ["World Economic Forum (WEF)", "International Chamber of Commerce", "Global Trade Directorate"],
    "C",
    "The World Social Forum (WSF) is a global coalition of human rights activists, environmentalists, labour unions, and anti-globalisation groups established in opposition to neo-liberal globalisation.\nHence, Option {{CORR}} is correct.",
    "Identifies World Social Forum (WSF) as the platform opposing neo-liberal globalisation."
)
add_u7(make_question(CHAPTER_U7, "Resistance to Globalisation", "Which major international platform bringing together trade unionists, environmentalists, and social activists was founded to resist neo-liberal corporate globalisation?", opts, c, s))

opts, c, s = rotate_options(
    "Porto Alegre, Brazil in 2001",
    ["Seattle, USA in 1999", "Mumbai, India in 2004", "Geneva, Switzerland in 1995"],
    "D",
    "The first World Social Forum (WSF) meeting was convened in Porto Alegre, Brazil in January 2001 under the banner 'Another World is Possible'.\nHence, Option {{CORR}} is correct.",
    "Identifies Porto Alegre, Brazil 2001 as first WSF meeting site."
)
add_u7(make_question(CHAPTER_U7, "World Social Forum Meetings", "In which city and year was the very first meeting of the World Social Forum (WSF) convened?", opts, c, s))

# Match questions for Unit 7
add_u7(make_match_question(
    CHAPTER_U7, "Dimensions of Globalisation",
    "Match List I (Dimension) with List II (Key manifestation):",
    [("A", "Political Dimension"), ("B", "Economic Dimension"), ("C", "Cultural Homogenisation"), ("D", "Cultural Heterogenisation")],
    [("I", "Shift towards a minimalist state focusing on maintenance of law and order"), ("II", "Enhanced flow of capital, foreign direct investment, and commodities"), ("III", "Rise of a uniform global culture often influenced by Western consumerism"), ("IV", "Blending and fusion of external influences with local cultural practices")],
    "A-I, B-II, C-III, D-IV", "A",
    "Political dimension involves minimalist state; economic dimension involves capital flows; cultural homogenisation means uniform culture; cultural heterogenisation means cultural fusion.",
    "Matches dimensions of globalisation with their key manifestations."
))

# Chronology questions for Unit 7
add_u7(make_sequence_question(
    CHAPTER_U7, "Globalisation Protests Chronology",
    "Arrange the following milestones of anti-globalisation movements and forums in chronological sequence:",
    [("A", "Massive anti-WTO protests in Seattle (Battle of Seattle)"), ("B", "First meeting of the World Social Forum in Porto Alegre"), ("C", "Fourth meeting of the World Social Forum held in Mumbai, India"), ("D", "Seventh World Social Forum meeting held in Nairobi, Kenya")],
    "A, B, C, D", "B",
    "1. Seattle protests (November-December 1999).\n2. First WSF in Porto Alegre (January 2001).\n3. Mumbai WSF (January 2004).\n4. Nairobi WSF (January 2007).",
    "Chronologically sequences anti-globalisation civil society mobilisations."
))

# Statement questions for Unit 7
add_u7(make_statement_question(
    CHAPTER_U7, "State Capacity Globalisation",
    "Globalisation has entirely eliminated the sovereign authority and administrative capacity of modern nation-states across the world.",
    "State capacity in some spheres has actually been enhanced by modern digital technology, surveillance tools, and data analytics.",
    4, "D",
    "Statement I is incorrect: The state remains the paramount institution of political rule and has not disappeared. Statement II is correct: Information technology has enhanced governments' ability to govern and monitor their populations.",
    "Evaluates the impact of globalisation on state capacity."
))

# Assertion Reason for Unit 7
add_u7(make_assertion_question(
    CHAPTER_U7, "Cultural Heterogenisation",
    "Cultural globalisation does not always lead to cultural homogenisation or uniform Americanisation.",
    "External cultural influences are frequently filtered, modified, and combined with indigenous traditions, producing unique hybrid cultural practices (e.g. eating masala dosa alongside burgers).",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains cultural heterogenisation—cultures do not merely become clones of the West; they adapt and hybridise foreign elements into local contexts.",
    "Explains cultural heterogenisation and hybridisation."
))

# Multi statement for Unit 7
add_u7(make_multi_statement_question(
    CHAPTER_U7, "Critiques of Globalisation",
    "Which of the following criticisms have been raised against neo-liberal globalisation by political critics?",
    [
        ("A", "Leftist critics argue that it enriches corporate elites while dismantling welfare safety nets for the vulnerable."),
        ("B", "Rightist critics express concern that traditional cultural values and national sovereignty are being eroded."),
        ("C", "Developing countries argue that it often forces them to remove agricultural tariffs while rich nations protect their farmers."),
        ("D", "All political scientists agree that globalisation has made wars impossible and universally eliminated all poverty.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements A, B, and C capture standard left, right, and Global South critiques of globalisation documented in NCERT. D is false because conflicts and poverty persist.",
    "Categorises multi-faceted political critiques of globalisation."
))

# Direct MCQs for Unit 7
u7_direct = [
    ("Causes of Globalisation", "What is widely recognized as the single most critical historical driver accelerating contemporary globalisation?",
     "Breakthrough advancements in communications, digital microchips, the internet, and transport technology", ["A global ban on all private merchant vessels", "The complete collapse of the English language worldwide", "A mandatory United Nations treaty ordering all citizens to emigrate"], "A",
     "Technological revolutions (the telegraph, microchip, internet, high-speed aviation) enabled instantaneous worldwide communication and logistics.", "Identifies technology as the primary driver of globalisation."),
    ("Minimalist State Concept", "In political terms, neo-liberal globalisation often advocates for a 'minimalist state' which means the state should:",
     "Withdraw from commercial business operations and confine itself to core functions like law and order and national defense", ["Abolish all national courts and police stations", "Directly manage all barber shops and grocery stores", "Operate without an elected parliament"], "A",
     "The minimalist state concept argues that markets should allocate goods and services while government maintains basic security and rule of law.", "Defines the minimalist state model under neo-liberalism."),
    ("Social Safety Net Role", "Why do political economists advocate creating institutional 'social safety nets' in an era of economic globalisation?",
     "To cushion vulnerable, low-income citizens from the disruptive shocks and job displacements caused by unfettered market competition", ["To provide free luxury sports cars to multinational bank directors", "To legally ban poor citizens from purchasing food", "To eliminate all public schools and hospitals permanently"], "A",
     "Social safety nets (subsidies, unemployment benefits, public healthcare) protect underprivileged groups who cannot compete in free market environments.", "Explains necessity of social safety nets."),
    ("Cultural Imperialism Meaning", "In the debate on cultural globalisation, 'cultural imperialism' refers to:",
     "The imposition of dominant Western cultural values, consumer habits, and lifestyle norms onto other societies", ["The voluntary adoption of Sanskrit by European universities", "The mandatory wearing of traditional Indian khadi across the Americas", "The destruction of all Hollywood films by the United Nations"], "A",
     "Cultural imperialism denotes the asymmetrical spread of American/Western soft power, displacing indigenous cultural forms.", "Defines cultural imperialism."),
    ("Mumbai WSF Meeting", "In which year did India host the Fourth World Social Forum (WSF) in Mumbai, bringing together over 100,000 global activists?",
     "2004", ["1991", "2000", "2014"], "A",
     "The 4th WSF was convened in Mumbai in January 2004, showcasing massive participation from Indian social movements, trade unions, and Dalit groups.", "Identifies 2004 Mumbai WSF meeting."),
    ("Anti-WTO Seattle Protests", "The famous mass protests in Seattle in November 1999 disrupted which major international summit?",
     "The 3rd WTO Ministerial Conference", ["The United Nations General Assembly", "The G7 Leaders' Summit", "The International Red Cross Convention"], "A",
     "The 'Battle of Seattle' erupted outside the 1999 WTO Ministerial, where a broad coalition of labour, environmental, and anti-sweatshop activists shut down proceedings.", "Identifies 1999 Seattle anti-WTO protests."),
    ("India's Post-Independence Economic Policy", "Between 1947 and 1991, India's economic strategy was characterised by 'import substitution' and protectionism, meaning:",
     "Goods that could be manufactured domestically were protected from foreign competition through heavy import tariffs and licensing", ["All foreign books and newspapers were burned at customs ports", "Private citizens were forbidden from using domestic bank currency", "India exported 100% of all food grains to Britain"], "A",
     "Import substitution industrialisation sought self-reliance by protecting nascent domestic industries through high tariffs and quotas.", "Explains India's pre-1991 import substitution policy."),
    ("LPG Reforms Context", "India was compelled to adopt the LPG economic reforms in 1991 primarily due to:",
     "A severe balance of payments crisis and dwindling foreign exchange reserves that could barely pay for two weeks of essential imports", ["A formal military ultimatum issued by the Australian government", "A popular referendum demanding the abolition of all agriculture", "An executive order issued by the International Court of Justice"], "A",
     "With foreign reserves nearly exhausted and fiscal deficits soaring in 1991, India sought IMF/World Bank assistance, conditional on economic liberalisation.", "Explains balance of payments crisis triggering 1991 LPG reforms."),
    ("Cultural McDonaldisation", "The sociological term 'McDonaldisation' coined by George Ritzer refers to:",
     "The principles of the fast-food restaurant (efficiency, calculability, predictability, and control) dominating sectors of global society", ["The compulsory eating of burgers in primary school classrooms", "The takeover of all global farming by Scottish agriculturalists", "The replacement of international law by restaurant menus"], "A",
     "McDonaldisation describes how rationalised, standardized corporate fast-food methods pervade global culture and daily life.", "Defines McDonaldisation concept."),
    ("Economic Globalisation Winners and Losers", "Why is economic globalisation described as having created 'winners and losers' within societies?",
     "Because skilled professionals and capital owners benefited enormously while unorganized workers and small traditional artisans faced displacement", ["Because all citizens in every nation gained identical billions of dollars", "Because all corporations went bankrupt while only subsistence farmers survived", "Because international sports lotteries replaced national stock markets"], "A",
     "Globalisation widens income inequality by rewarding high-tech capital and skills while exposing unskilled domestic labour to foreign competition.", "Explains unequal distribution of benefits under globalisation."),
    ("Resistance from Indian Right", "In India, cultural resistance to globalisation from right-wing and conservative groups has often targeted:",
     "Western lifestyle commercialisation such as Valentine's Day celebrations, cable TV consumerism, and Western clothing styles in educational institutions", ["The construction of domestic rural irrigation canals", "The promotion of traditional Ayurvedic medicine", "The teaching of Indian classical music in schools"], "A",
     "Conservative cultural critiques protest Western commercialism and erosion of traditional family norms.", "Analyzes cultural resistance to Westernisation from conservative groups."),
    ("Resistance from Indian Left", "In India, economic resistance to globalisation from leftist parties and trade unions has focused on:",
     "Opposing the privatisation of public sector enterprises, foreign entry into retail trade, and the dilution of labour protection laws", ["Demanding the immediate closure of all state government offices", "Advocating for the elimination of all public food distribution subsidies", "Demanding that Indian farmers pay higher taxes to Wall Street banks"], "A",
     "Left movements oppose neo-liberal disinvestment, casualisation of labour, and withdrawal of state agricultural subsidies.", "Details leftist critiques of economic liberalisation in India."),
    ("WSF Slogan", "What is the famous inspiring official slogan of the World Social Forum (WSF)?",
     "'Another World is Possible'", ["'Trade Without Borders'", "'Capitalism Forever'", "'One Global Currency'"], "A",
     "'Another World is Possible' ('Um outro mundo é possível') has been the rallying cry of the WSF since its inception in Porto Alegre.", "Identifies WSF slogan 'Another World is Possible'."),
    ("BOP Crisis 1991 Gold Pledge", "To secure an emergency loan during the 1991 balance of payments crisis, the Indian government took the extraordinary measure of:",
     "Pledging national gold reserves to the Bank of England and Union Bank of Switzerland", ["Selling the Taj Mahal to foreign investors", "Surrendering the Andaman and Nicobar Islands to NATO", "Abolishing the Reserve Bank of India permanently"], "A",
     "In May-July 1991, the Reserve Bank of India airlifted gold reserves to London and Zurich to secure urgent foreign exchange loans.", "Recalls 1991 pledging of gold reserves."),
    ("Global Governance Meaning", "The phrase 'Global Governance' in international relations refers to:",
     "The collection of formal institutions, treaties, informal regimes, and global norms that manage collective international issues without a single world government", ["A single tyrannical world emperor ruling from the United Nations building", "The complete abolition of all national laws across the planet", "A military council composed of five private commercial airlines"], "A",
     "Global governance denotes cooperative problem-solving through multilateral treaties, international agencies, and transnational networks in the absence of a global sovereign.", "Defines Global Governance."),
    ("Brain Drain to Brain Gain", "The cross-border movement of skilled Indian software engineers and doctors to the West, and their subsequent return or investment in India, exemplifies the shift from:",
     "'Brain drain' to 'brain circulation' and network capital", ["Feudalism to mercantilism", "Socialism to autarky", "Urbanisation to primitive hunter-gathering"], "A",
     "The diaspora's remittances, knowledge transfer, and entrepreneurial ventures transformed the one-way 'brain drain' into beneficial global networks.", "Interprets diaspora dynamics in globalisation."),
    ("Sovereignty under Globalisation", "How has state sovereignty evolved under contemporary globalisation according to standard political analysis?",
     "Sovereignty has not been destroyed; rather, it has adapted to new global realities, with states remaining the ultimate legitimate law-making bodies", ["All sovereign state borders have been completely eradicated by international law", "Only private multinational corporations possess passports and police powers", "Sovereign states now take direct orders from Hollywood film studios"], "A",
     "Scholars emphasize that while economic interdependence constrains state autonomy in some economic policies, the legal sovereignty of the state remains intact.", "Explains the enduring vitality of state sovereignty."),
    ("Disinvestment Meaning", "In the context of economic globalisation and reform in India, 'disinvestment' refers to:",
     "The sale of equity shares of government-owned public sector enterprises to private investors", ["The confiscation of private bank accounts by state police", "The legal banning of all foreign multinational corporations", "The destruction of all factory machinery in cities"], "A",
     "Disinvestment entails selling the government's stake in public sector undertakings (PSUs) to mobilize fiscal resources and improve corporate efficiency.", "Defines disinvestment of PSUs."),
    ("Cultural Hybridisation Meaning", "When global cultural products merge with local indigenous customs (such as Bollywood musicals blending Western pop with classical ragas), the process is known as:",
     "Cultural Hybridisation", ["Cultural Decapitation", "Cultural Annihilation", "Cultural Segregation"], "A",
     "Cultural hybridisation occurs when diverse cultural forms combine to produce novel, syncretic cultural expressions.", "Defines cultural hybridisation."),
    ("Tariff and Quota Liberalisation", "Under the 1991 economic reforms, India dismantled the 'License-Permit-Quota Raj', which resulted in:",
     "Removing quantitative restrictions on imports and simplifying industrial licensing procedures for domestic and foreign investors", ["Banning all domestic private enterprises from producing consumer goods", "Prohibiting Indian citizens from traveling overseas", "Nationalising all private agricultural farms in Punjab"], "A",
     "The 1991 reforms eliminated industrial licensing in most sectors, abolished import quotas, and allowed automatic approval for foreign investment.", "Explains dismantling of License Raj in 1991."),
    ("Pooled Sovereignty", "When sovereign member states transfer certain decision-making powers to a supranational institution (like the European Union), the concept is known as:",
     "Pooled Sovereignty", ["Absolute Isolationism", "Colonial Subjugation", "Autarkic Imperialism"], "A",
     "Pooled sovereignty occurs when states voluntarily combine decision-making authority in shared institutions to enhance collective bargaining and efficiency.", "Defines Pooled Sovereignty."),
    ("TNCs vs MNCs", "A corporation that maintains substantial investments and operational facilities in multiple foreign countries but does not coordinate from a single rigid national headquarters is often termed a:",
     "Transnational Corporation (TNC)", ["Feudal Guild", "Public Sector Undertaking", "Sovereign Wealth Trust"], "A",
     "Transnational Corporations operate across borders with integrated global strategies, differing from classic MNCs with strict home-country centralized command.", "Distinguishes TNCs from traditional domestic enterprises."),
    ("GATS Scope", "The General Agreement on Trade in Services (GATS) administered by the WTO covers international trade in services across four distinct:",
     "Modes of supply (Cross-border supply, Consumption abroad, Commercial presence, and Movement of natural persons)", ["Monetary currencies (Dollars, Pounds, Francs, and Yen)", "Ocean navigation routes (Pacific, Atlantic, Indian, and Arctic)", "Continental trade blocs (Europe, Asia, Africa, and Americas)"], "A",
     "GATS defines four modes of service delivery: Mode 1 (cross-border), Mode 2 (consumption abroad), Mode 3 (commercial presence), Mode 4 (movement of natural persons).", "Outlines the four modes of service trade under GATS."),
    ("TRIPS Agreement", "The WTO's TRIPS agreement sets minimum global standards for the protection of:",
     "Intellectual Property Rights, including patents, copyrights, trademarks, and trade secrets", ["Refugee camps along international borders", "Wages paid to agricultural plantation workers", "Tariffs on international parcel mail"], "A",
     "The Agreement on Trade-Related Aspects of Intellectual Property Rights (TRIPS) harmonized global patent and copyright enforcement.", "Defines the scope of the TRIPS agreement."),
    ("TRIMS Agreement", "The Trade-Related Investment Measures (TRIMS) agreement under the WTO prohibits member governments from:",
     "Applying trade restrictions that discriminate against foreign investors or require local content sourcing", ["Levying income taxes on private foreign citizens", "Operating public police departments in domestic cities", "Building paved highways near coastal seaports"], "A",
     "TRIMS bans performance requirements (like mandatory local procurement quotas) that distort international trade and foreign investment.", "Explains rules under the TRIMS agreement."),
    ("Teamsters and Turtles", "The famous coalition between labour unions (Teamsters) and environmentalists (Turtles) was a hallmark of which historic anti-globalisation protest?",
     "The 1999 Seattle anti-WTO protests", ["The 1968 Paris student protests", "The 1917 Petrograd bread riots", "The 1989 Tiananmen Square protests"], "A",
     "The slogan 'Teamsters and Turtles together at last' celebrated the unprecedented alliance between blue-collar union workers and green activists against corporate trade rules in Seattle 1999.", "Recalls Teamsters and Turtles coalition in Seattle 1999."),
    ("Anti-Sweatshop Movement", "Global campaigns against transnational sportswear and apparel brands (such as Nike) in the late 1990s protested primarily against:",
     "Sweatshop labour conditions, child labour, sub-minimum wages, and unsafe factory environments in developing nations", ["The color dye used on running sneakers", "The sponsorship of international marathon competitions", "The sale of athletic shorts to university students"], "A",
     "The anti-sweatshop movement highlighted the human costs of outsourcing, demanding corporate accountability and living wages for factory workers in the Global South.", "Explains the global anti-sweatshop movement."),
    ("Feminisation of Labour", "Sociologists observing the impact of economic globalisation on manufacturing in developing countries often highlight the 'feminisation of labour', which refers to:",
     "The disproportionate employment of low-wage women in export processing zones and garment factories due to perceived docility and lower labor costs", ["The complete exclusion of women from all urban workplaces", "The mandatory appointment of women as bank presidents", "The legal prohibition of men from working in agriculture"], "A",
     "Global production chains frequently recruit young female workers in developing nations for assembly work, often with low wages and precarious job security.", "Explains feminisation of labour in globalisation."),
    ("Global Village Concept", "The influential phrase 'Global Village', describing how electronic communications contract the world into a single interconnected community, was coined by:",
     "Marshall McLuhan", ["Karl Marx", "Max Weber", "Francis Fukuyama"], "A",
     "Canadian media theorist Marshall McLuhan coined the term 'Global Village' in the 1960s to describe the interconnectivity forged by electronic media.", "Identifies Marshall McLuhan for 'Global Village'."),
    ("Current vs Capital Account", "India achieved full convertibility of the Rupee on which account in August 1994, while retaining restrictions on the other?",
     "Full convertibility on the Current Account, while maintaining calibrated controls on the Capital Account", ["Full convertibility on the Capital Account while banning the Current Account", "Neither account is convertible; the Rupee cannot be exchanged for foreign currency", "Full convertibility on both accounts with zero Reserve Bank oversight"], "A",
     "India adopted full current account convertibility in August 1994 (accepting IMF Article VIII obligations), while maintaining capital controls to prevent volatile speculative capital flights.", "Explains India's current vs capital account convertibility status."),
    ("FDI vs FII", "What is the key difference between Foreign Direct Investment (FDI) and Foreign Institutional Investment (FII) in economic globalisation?",
     "FDI involves physical investment in business operations, factories, and management control, whereas FII involves short-term financial investments in stock and bond markets", ["FDI is made exclusively by foreign governments while FII is made only by charities", "FII can never be withdrawn while FDI can be liquidated in seconds on a smartphone", "There is zero difference; they refer to the same bank transactions"], "A",
     "FDI represents long-term physical investment with management participation; FII (portfolio investment) represents liquid holdings in capital markets that can move quickly.", "Distinguishes FDI from FII.")
]

for topic, stem, corr_t, wr_t, opt_id, sol_t, mist in u7_direct:
    opts, c, s = rotate_options(corr_t, wr_t, opt_id, sol_t + "\nHence, Option {{CORR}} is correct.", mist)
    add_u7(make_question(CHAPTER_U7, topic, stem, opts, c, s))

u7_qs = u7_qs[:40]
assert len(u7_qs) == 40, f"Expected 40 questions for Unit 7, got {len(u7_qs)}"
validate_and_collect(u7_qs, u7_seen)
print("Unit 7 validated: 40 unique questions.")

# Save unit files
with open("mock/pol_units/unit5.json", "w", encoding="utf-8") as f:
    json.dump(u5_qs, f, indent=2, ensure_ascii=False)
print("Wrote mock/pol_units/unit5.json (40 questions)")

with open("mock/pol_units/unit6.json", "w", encoding="utf-8") as f:
    json.dump(u6_qs, f, indent=2, ensure_ascii=False)
print("Wrote mock/pol_units/unit6.json (60 questions)")

with open("mock/pol_units/unit7.json", "w", encoding="utf-8") as f:
    json.dump(u7_qs, f, indent=2, ensure_ascii=False)
print("Wrote mock/pol_units/unit7.json (40 questions)")
