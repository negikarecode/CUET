import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import mcq, stmt, ar, match, seq

CH_MARKET = "The Market as a Social Institution"
CH_INEQ = "Patterns of Social Inequality and Exclusion"

def build_slot(ch, items):
    res = []
    for itm in items:
        qtype = itm[0]
        if qtype == "mcq":
            _, top, stem, corr, wrongs, expl = itm
            res.append(mcq(ch, top, stem, corr, wrongs, expl))
        elif qtype == "stmt":
            _, top, s1, s2, rel, expl = itm
            res.append(stmt(ch, top, s1, s2, rel, expl))
        elif qtype == "ar":
            _, top, a, r, rel, expl = itm
            res.append(ar(ch, top, a, r, rel, expl))
        elif qtype == "match":
            _, top, stem, l1, l2, pair, expl = itm
            res.append(match(ch, top, stem, l1, l2, pair, expl))
        elif qtype == "seq":
            _, top, stem, items_list, order_str, expl = itm
            res.append(seq(ch, top, stem, items_list, order_str, expl))
    assert len(res) == 20, f"Slot has {len(res)} items instead of 20"
    return res

# Slot 19: Status Consumption (Veblen & Bourdieu) (20 Qs)
s19_raw = [
    ("mcq", "Veblen's Conspicuous Consumption", "In his 1899 classic *The Theory of the Leisure Class*, sociologist Thorstein Veblen coined the term 'Conspicuous Consumption' to describe:",
     "The lavish spending on luxury goods and services primarily to publicly display wealth, assert social prestige, and provoke envy",
     ["The purchasing of cheap subsistence food grains strictly for biological survival in secret",
      "A government tax system designed to eliminate all luxury spending among citizens",
      "An economic strategy used by factory labourers to reduce their monthly rent expenses"],
     "Thorstein Veblen formulated conspicuous consumption to explain wasteful luxury display used to signal superior social status."),
    ("stmt", "Bourdieu on Cultural Capital and Distinction",
     "In *Distinction: A Social Critique of the Judgement of Taste*, French sociologist Pierre Bourdieu demonstrated that aesthetic taste is a marker of class position.",
     "Elite classes use their cultural capital (appreciation of classical music, fine art, gourmet cuisine) to distinguish themselves from lower social classes.", 1,
     "Both statements are correct: Bourdieu showed that aesthetic tastes are not natural, but socially conditioned cultural capital signaling class distinction."),
    ("ar", "Habitus in Social Reproduction",
     "Pierre Bourdieu argued that an individual's 'Habitus' (deeply ingrained dispositions, habits, and body language) reinforces social inequality across generations.",
     "Habitus is acquired unconsciously during childhood socialization within a specific class environment, predisposing individuals to adopt class-appropriate tastes.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A). Habitus naturalizes class privilege, functioning as social reproduction."),
    ("match", "Forms of Capital (Pierre Bourdieu)",
     "Match Pierre Bourdieu's forms of capital in List I with their descriptions in List II:",
     [("A", "Economic Capital"), ("B", "Cultural Capital"), ("C", "Social Capital"), ("D", "Symbolic Capital")],
     [("I", "Networks of social connections, kinship trust, and group membership that can be mobilized"),
      ("II", "Direct financial assets, monetary income, property ownership, and bank deposits"),
      ("III", "Social recognition, honor, prestige, and institutional legitimacy conferred by society"),
      ("IV", "Acquired knowledge, educational credentials, linguistic style, and aesthetic competence")],
     "A-II, B-IV, C-I, D-III",
     "Economic is money; Cultural is knowledge/degrees; Social is networks; Symbolic is prestige/honor."),
    ("seq", "Conversion of Capital in Social Mobility",
     "Arrange the stages through which economic capital is converted into intergenerational cultural capital in logical sequence:",
     [("A", "Accumulation of substantial economic financial capital through business or commerce"),
      ("B", "Investment of economic wealth in elite private schooling, foreign university degrees, and fine arts"),
      ("C", "Internalization of cultural capital (habitus, accent, bourgeois etiquette) by the next generation"),
      ("D", "Conversion of cultural credentials into elite corporate, bureaucratic, or academic appointments")],
     "A, B, C, D",
     "Economic wealth is invested in elite education, internalizing cultural capital that secures high-status professional appointments.")
]

s19_extras = [
    ("Conspicuous Leisure Definition", "In Thorstein Veblen's sociology, 'Conspicuous Leisure' refers to:",
     "The non-productive consumption of time (playing golf, learning dead languages, extensive overseas holidays) to display that one does not need to perform manual labour",
     ["Working twelve hours a day in a heavy industrial steel blast furnace", "Sleeping in an office cubicle to meet company production deadlines", "Voluntarily repairing public village drainage pipes on weekends"],
     "Conspicuous leisure demonstrates exemption from productive toil, serving as an aristocratic symbol of pecuniary reputability."),
    ("Middle-Class Consumerism in Post-1991 India", "Sociological studies of the 'New Middle Class' in post-liberalisation India highlight how identity is constructed through:",
     "Consumption of global lifestyle brands, shopping in air-conditioned malls, gated community housing, and overseas vacations",
     ["A complete rejection of all manufactured goods and return to hand-spun khadi", "Living strictly in communal agrarian farming communes without electricity", "Refusing to own any private vehicles or modern consumer electronics"],
     "The post-1991 Indian middle class defines its identity through conspicuous consumerism, brand literacy, and lifestyle cosmopolitanism."),
    ("Brand Literacy as Cultural Capital", "In modern urban youth sociology, 'Brand Literacy' (knowledge of designer clothing brands, specialty cafes, and luxury smartphones) functions as:",
     "A modern form of cultural capital that grants peer status, inclusion in elite social circles, and distinction from provincial outsiders",
     ["A compulsory academic subject tested by national civil service commissions", "A criminal violation punishable by municipal police authorities", "A traditional religious sacrament required for entering temple shrines"],
     "Knowledge of global luxury brands operates as subcultural capital, signaling cosmopolitan sophistication and peer status."),
    ("Positional Goods Concept (Fred Hirsch)", "Economist Fred Hirsch defined 'Positional Goods' as goods whose value derives primarily from:",
     "Their scarcity and exclusivity, signifying that only a few elite individuals can own them (e.g. penthouses in luxury enclaves, degrees from elite universities)",
     ["Their infinite availability to every single citizen in the country for free", "Their ability to generate electricity from renewable solar energy", "Their total absence of any aesthetic or material utility"],
     "Positional goods confer status precisely because they are scarce and unavailable to the general public."),
    ("Gated Communities and Segregation", "In metropolitan cities, the rise of luxury 'Gated Communities' reflects status consumption combined with:",
     "Spatial segregation and social withdrawal of the affluent from public civic spaces into private enclaves with private security, private parks, and private amenities",
     ["A desire to share all household property with rural agricultural labourers", "A state mandate forcing all wealthy citizens to live in prison barracks", "The complete elimination of private property ownership across metropolitan areas"],
     "Gated enclaves physically separate the wealthy from urban poverty, purchasing private infrastructure and social insulation."),
    ("Izzat and Social Status in North India", "In rural North Indian sociology, the concept of 'Izzat' (family honor and prestige) is closely tied to:",
     "Landownership, control over female mobility, lavish spending on daughter's weddings, and hospitality to dominant caste peers",
     ["The number of foreign languages spoken by domestic animals on the farm", "Having zero relatives or social connections in neighboring villages", "Refusing to allow any guests to enter the village home"],
     "Izzat is symbolic capital: lavish wedding feasts, land holdings, and female seclusion are fiercely guarded to protect family honor."),
    ("Symbolic Violence Concept (Bourdieu)", "In Pierre Bourdieu's critical sociology, 'Symbolic Violence' refers to:",
     "The subtle, invisible imposition of dominant cultural norms upon subordinate classes, who unconsciously accept their own inferiority as natural",
     ["Physical assault committed with military swords in village streets", "A armed rebellion launched by factory workers against company owners", "A legal arrest executed by municipal police officers in uniform"],
     "Symbolic violence occurs when marginalized groups accept dominant elite standards (linguistic accent, taste) as naturally superior."),
    ("Veblen Goods in Economics", "In microeconomics and sociology, a 'Veblen Good' is an anomaly because:",
     "Demand for the good increases as its price increases, because higher prices make it more exclusive and effective as a status symbol",
     ["Demand falls to zero whenever any consumer sees the good in a shop window", "The good can only be manufactured out of recycled plastic bottles", "The good is distributed completely free to all citizens by the state"],
     "Veblen goods defy the standard law of demand: conspicuous price increases enhance exclusivity and prestige appeal."),
    ("Cultural Omnivore Concept (Richard Peterson)", "Modern cultural sociologists use the term 'Cultural Omnivore' to describe how contemporary elites:",
     "Demonstrate their cultural sophistication by appreciating both highbrow culture (classical music/opera) and popular lowbrow culture (street food/folk music)",
     ["Eat only biological plants grown in deep underground caves", "Refuse to consume any food that was cooked by human beings", "Consume fifty meals a day in luxury corporate dining halls"],
     "Cultural omnivores display cultural agility: they consume elite culture alongside authentic street culture to demonstrate broad cosmopolitanism."),
    ("Conspicuous Consumption at Indian Weddings", "How does conspicuous consumption manifest in modern Indian lavish weddings?",
     "By hiring celebrity performers, booking exotic international venues, constructing gigantic temporary palaces, and displaying hundreds of gourmet food stalls",
     ["By requiring all guests to fast and drink only plain water", "By conducting the marriage in complete darkness without any clothing", "By giving all wedding gifts directly to the national space agency"],
     "Weddings are prime arenas of conspicuous consumption: families spend life savings to signal wealth, prestige, and creditworthiness."),
    ("The Groom Price and Status Display", "Sociologists analyze dowry inflation among educated professional grooms (engineers, IAS officers, doctors) as:",
     "A commercialized 'groom price' where the bride's family buys social status, high-earning security, and elite family alliance through cash and luxury goods",
     ["An ancient spiritual penalty imposed on all families with female children", "A voluntary tax paid to municipal governments to build public roads", "An equal financial exchange where the groom's parents pay all expenses"],
     "Groom prices are marketized status investments: families pay premiums for elite professional son-in-laws to elevate family standing."),
    ("Bodily Habitus and Class Distinction", "Pierre Bourdieu showed that social class is inscribed upon the human body ('Bodily Habitus') through:",
     "Postures, gait, table manners, speech cadence, and physical self-presentation formed unconsciously through class upbringing",
     ["The biological DNA sequence of human chromosomes", "The color of an individual's eye retinas exclusively", "The physical height of a person measured at birth"],
     "Bodily habitus reflects class: elite accents, relaxed confident posture, and dining etiquette signal class origin without speaking."),
    ("Luxury Branding and False Exclusivity", "Modern luxury fashion conglomerates (e.g. LVMH, Gucci) manufacture status by:",
     "Artificially restricting supply, orchestrating celebrity endorsements, and charging astronomical markups on industrially produced goods to sell the illusion of aristocratic exclusivity",
     ["Selling all their products at cost price in rural agricultural village markets", "Allowing consumers to take whatever products they want without paying money", "Employing only retired military generals to stitch all their clothing"],
     "Luxury brands commodify status: mass-produced items are imbued with aura through staged scarcity and high price tags."),
    ("Subcultural Resistance to Status Consumption", "Youth counter-cultures (e.g. punk, grunge, anti-fashion, minimalist thrifting) resist mainstream status consumption by:",
     "Deliberately adopting distressed clothing, second-hand goods, and DIY aesthetics to subvert bourgeois consumerist status games",
     ["Purchasing only the most expensive diamond jewelry available in commercial stores", "Demanding that all clothing be made of solid twenty-four karat gold", "Refusing to speak to anyone who does not own a luxury automobile"],
     "Counter-cultures subvert luxury status by celebrating thrift, grunge, and anti-fashion, though capitalism often re-commodifies these styles."),
    ("Democratization vs Stratification of Luxury", "While mass retail chains make affordable copies of luxury styles widely available, elite classes respond by:",
     "Constantly shifting to more subtle, understated forms of 'quiet luxury' and exclusive experiences that cannot be easily copied by the masses",
     ["Abandoning all material possessions to live as wandering hermits in forests", "Surrendering all their financial bank accounts to public state universities", "Wearing identical corporate uniforms stamped with barcode numbers"],
     "As luxury democratizes, elites adopt 'stealth wealth' and quiet luxury, using subtle cultural codes recognized only by insiders.")
]
for itm in s19_extras:
    top, stem, corr, wrongs, sol = itm
    s19_raw.append(("mcq", top, stem, corr, wrongs, sol))
SLOT19 = build_slot(CH_MARKET, s19_raw)

# Slot 20: Social Stratification Principles (Inequality, Ascription, Reproduction) (20 Qs)
s20_raw = [
    ("mcq", "Foundational Principles of Social Stratification", "Which of the following is recognized in sociological theory as a foundational principle of 'Social Stratification'?",
     "Social stratification is a characteristic of society (not simply a reflection of individual differences), persists across generations, and is supported by cultural ideologies",
     ["Social stratification is determined solely by an individual's physical athletic running speed",
      "Social stratification disappears completely whenever a new calendar year begins",
      "Social stratification affects only non-human animals and has zero relevance to human societies"],
     "Sociology defines stratification by three principles: social characteristic, intergenerational reproduction, and ideological legitimation."),
    ("stmt", "Stratification and Ideological Legitimation",
     "Social stratification systems are always supported by cultural ideologies or belief systems that explain and justify inequality as natural or deserved.",
     "The traditional caste system was legitimized by religious ideologies of Karma, Dharma, and rebirth, portraying one's birth status as cosmic justice.", 1,
     "Both statements are correct: Stratification persists because cultural ideologies (e.g. Karma in caste, meritocracy in capitalism) legitimize inequality."),
    ("ar", "Social Reproduction of Inequality",
     "Social inequality tends to reproduce itself across generations regardless of individual talent or effort.",
     "Parents pass on economic capital, cultural resources, and social connections directly to their children, giving them structural advantages in education and careers.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A). Intergenerational transmission of economic and social capital reproduces class privilege."),
    ("match", "Stratification Systems and Defining Bases",
     "Match the historical systems of social stratification in List I with their defining bases in List II:",
     [("A", "Slavery"), ("B", "Estates"), ("C", "Caste"), ("D", "Class")],
     [("I", "Feudal legal ranks with specific rights and duties (nobility, clergy, commoners)"),
      ("II", "Extreme inequality where some individuals are legal property owned by others"),
      ("III", "Economic stratification based on ownership of wealth, capital, and market occupation"),
      ("IV", "Hereditary, ascriptive, endogamous hierarchy governed by purity and pollution taboos")],
     "A-II, B-I, C-IV, D-III",
     "Slavery is ownership of humans; Estates is feudal legal rank; Caste is ascriptive/purity hierarchy; Class is economic/market standing."),
    ("seq", "Sociological Analysis of Social Inequality",
     "Arrange the stages of sociological inquiry into a system of social stratification in logical sequence:",
     [("A", "Identification of unequal distribution of scarce material and social resources (wealth, power, prestige)"),
      ("B", "Analysis of institutional mechanisms that reproduce these inequalities across successive generations"),
      ("C", "Examination of cultural ideologies that justify and legitimize the hierarchy in the minds of citizens"),
      ("D", "Investigation of resistance, social movements, and collective struggles challenging the stratified order")],
     "A, B, C, D",
     "Sociological analysis begins with mapping distribution, then examines reproduction, ideological legitimation, and resistance struggles.")
]

s20_extras = [
    ("Ascriptive vs Achieved Status Distinction", "In sociological theory, Ralph Linton's distinction between 'Ascriptive Status' and 'Achieved Status' establishes that:",
     "Ascriptive status is assigned at birth based on lineage, caste, or sex, whereas achieved status is acquired through individual effort, education, and talent",
     ["Ascriptive status is awarded exclusively by international sports federations", "Achieved status is inherited biologically through maternal blood", "There is zero sociological difference between the two terms"],
     "Ascriptive status is inherited at birth (caste, sex); achieved status is earned through individual agency and credentials."),
    ("Social Mobility Definition", "In studies of social stratification, 'Social Mobility' refers to:",
     "The movement of individuals or social groups upward or downward between different socio-economic positions in the hierarchy",
     ["The physical transportation of cargo across international shipping canals", "The migration of wild migratory birds across continental mountain ranges", "The daily physical exercise performed by athletes in gyms"],
     "Social mobility measures movement between status positions, either inter-generational (between generations) or intra-generational (within a lifetime)."),
    ("Horizontal vs Vertical Mobility", "How does 'Horizontal Mobility' differ fundamentally from 'Vertical Mobility'?",
     "Horizontal mobility involves a change in occupational role or geographic location without altering social rank, whereas vertical mobility changes one's hierarchical rank",
     ["Horizontal mobility applies only to marine biology, while vertical mobility applies to mountain climbing", "Horizontal mobility always doubles an individual's monetary wealth", "Vertical mobility is strictly illegal under the Indian Constitution"],
     "Horizontal mobility changes role without changing class status (e.g. teacher becoming bank clerk); vertical mobility shifts hierarchical rank (upward or downward)."),
    ("Open vs Closed Stratification Systems", "A 'Closed Stratification System' (such as the traditional caste system) is characterized by:",
     "Rigid ascriptive boundaries, strict endogamy, and virtually zero opportunity for individual upward mobility during a lifetime",
     ["Universal free equality where every citizen can switch social groups every week", "Zero laws or customs regarding marriage or inheritance", "A system where all decisions are made by random computer lottery"],
     "Closed systems (caste, estates) determine status by birth and forbid mobility; open systems (class) permit social mobility based on achievement."),
    ("Life Chances and Max Weber", "Max Weber defined 'Life Chances' as:",
     "The practical opportunities an individual has to obtain desirable physical goods, mental health, education, and longevity based on their market position",
     ["A commercial gambling game played in private casino clubs", "The genetic biological lifespan determined purely by human cellular biology", "The number of lottery tickets purchased by an individual per year"],
     "Weber's 'life chances' emphasizes that one's class position fundamentally shapes access to health, schooling, longevity, and material well-being."),
    ("Max Weber's Three-Dimensional Stratification", "Max Weber expanded Karl Marx's economic class analysis by proposing that social stratification is multidimensional, based on:",
     "Class (economic order), Status (social prestige and honour), and Party (political power and influence)",
     ["Food, water, and shelter exclusively", "Physical running speed, jumping ability, and swimming stamina", "Age, height, and eye color alone"],
     "Weber formulated the three dimensions of stratification: Class (market/wealth), Status (prestige/honor), and Party (political power)."),
    ("Social Closure Concept (Weber)", "In Weberian sociology, 'Social Closure' refers to the process whereby:",
     "A privileged group monopolizes access to scarce resources, wealth, and opportunities by closing off access to outsiders through exclusionary criteria",
     ["A municipal government closes down all commercial shops on public holidays", "A university shuts its doors during summer vacation months", "A bank locks its physical vault doors at night"],
     "Social closure creates monopolies: dominant groups restrict credentials, membership, and marriage to exclude subordinate competitors."),
    ("Meritocracy as Ideology", "Sociologists critique the ideology of 'Meritocracy' in modern stratified societies because:",
     "It falsely assumes that all individuals compete on a level playing field, disguising how inherited wealth and cultural capital produce unequal academic outcomes",
     ["It proves that genetic intelligence is distributed identically across all human beings", "It is an ancient system invented by feudal monarchs in medieval Europe", "It requires all students to study only mathematical calculus"],
     "Sociologists argue meritocracy disguises structural privilege: inherited class resources heavily influence who succeeds in competitive exams."),
    ("Glass Ceiling Concept", "In gender and stratification studies, the 'Glass Ceiling' metaphor describes:",
     "An invisible, unacknowledged barrier that prevents qualified women and minorities from advancing to top executive and leadership positions",
     ["A physical architectural glass dome constructed on top of corporate skyscrapers", "A statutory government law that limits the height of residential buildings", "A transparent glass vehicle used by royal monarchs during public parades"],
     "The glass ceiling represents subtle institutional sexism and patriarchal informal networks that block women from executive leadership."),
    ("Cumulative Advantage (Matthew Effect)", "Sociologist Robert K. Merton formulated the 'Matthew Effect' (cumulative advantage) to explain how:",
     "Those who start with initial social, economic, or academic advantages receive disproportionate recognition and opportunities, widening the gap over time",
     ["Everyone in society ends up with exactly equal monetary income regardless of effort", "Poorer individuals automatically become wealthy without any external assistance", "All scientific discoveries are made by anonymous children"],
     "Cumulative advantage ('the rich get richer') compounds initial privileges into massive structural disparities over time."),
    ("Status Inconsistency Concept", "In stratification sociology, 'Status Inconsistency' occurs when an individual holds:",
     "Conflicting ranks across different dimensions of stratification (e.g. high educational credentials but low income, or high economic wealth but low social status)",
     ["Identical monetary balances in three different commercial bank accounts", "Two different passports from neighboring foreign countries", "Zero physical clothing or personal belongings"],
     "Status inconsistency occurs when an individual's rank on one dimension (e.g. education/caste) mismatches their rank on another (income/power)."),
    ("Social Stratification vs Social Differentiation", "How does 'Social Stratification' differ from simple 'Social Differentiation'?",
     "Differentiation merely recognizes biological or social differences (e.g. age, gender, occupation), whereas stratification ranks those differences into a hierarchy of superiority and inferiority",
     ["Differentiation applies only to wild animals, while stratification applies to plants", "Differentiation is strictly illegal under the United Nations Charter", "There is zero sociological distinction between the two terms"],
     "Differentiation identifies diversity (different roles); stratification arranges differences into a hierarchy of unequal rewards and power."),
    ("Underclass Concept in Urban Sociology", "In contemporary sociology of stratification, the 'Underclass' refers to:",
     "A structurally marginalized group experiencing persistent long-term unemployment, extreme poverty, social isolation, and exclusion from mainstream institutions",
     ["A group of international airline passengers travelling in economy class", "Students enrolled in the first year of an undergraduate university program", "A group of retired military officers living in luxury coastal resorts"],
     "The underclass describes structural marginality: individuals cut off from formal employment, quality schooling, and political voice in urban slums."),
    ("Social Reproduction in Elite Schools", "Sociological studies of elite residential public schools (e.g. Doon School) demonstrate that they:",
     "Transmit elite habitus, peer networks, and cultural capital that reproduce intergenerational ruling-class leadership in business, politics, and bureaucracy",
     ["Train students exclusively to become landless agricultural subsistence farmers", "Refuse to teach English and communicate only in ancient sign languages", "Operate as non-profit monasteries where students take vows of poverty"],
     "Elite schools cultivate social networks, confident poise, and linguistic ease that secure dominant positions in the national hierarchy."),
    ("Functionalist Theory of Stratification (Davis & Moore)", "In functionalist sociology, Kingsley Davis and Wilbert Moore argued that social stratification is universal and necessary because:",
     "Society must offer unequal economic and prestige rewards to motivate the most talented individuals to undergo rigorous training for the most functionally important positions",
     ["Societies exist solely to punish human beings for ancient religious sins", "Inequality was invented by British colonial administrators in the twentieth century", "Unequal rewards cause the complete collapse of all production and technology"],
     "Davis-Moore functionalism claims unequal rewards incentivize talent; critics rebut that stratification protects inherited privilege.")
]
for itm in s20_extras:
    top, stem, corr, wrongs, sol = itm
    s20_raw.append(("mcq", top, stem, corr, wrongs, sol))
SLOT20 = build_slot(CH_INEQ, s20_raw)

print("Slots 19 and 20 compiled successfully.")
