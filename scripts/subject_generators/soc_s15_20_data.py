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

# Slot 15: Markets as Social Institutions (Polanyi & Embeddedness) (20 Qs)
s15_raw = [
    ("mcq", "Sociological View of Markets", "How does a sociological perspective on markets differ fundamentally from classical neoclassical economics?",
     "Sociology views markets as socially constructed institutions embedded in cultural norms, caste networks, and power relations, rather than abstract self-regulating machines",
     ["Sociology claims that goods are bought and sold purely by random mathematical coin flips", "Sociology denies that any physical goods or currency exist in the world", "Sociology views all buyers and sellers as identical computer robots without social identities"],
     "Sociology analyzes markets as social institutions embedded in kinship networks, status, and state power."),
    ("stmt", "Karl Polanyi on Market Embeddedness",
     "In *The Great Transformation*, economic historian Karl Polanyi argued that prior to modern capitalism, markets were deeply 'embedded' in social institutions.",
     "Polanyi warned that attempting to create a completely 'disembedded' self-regulating market treats human beings and land as fictitious commodities.", 1,
     "Both statements are correct: Polanyi showed that modern free-market doctrine disembeds economic transactions, reducing labour and nature to commodities."),
    ("ar", "Granovetter on Social Networks in Economics",
     "Mark Granovetter argued that all economic actions in modern advanced economies remain embedded in concrete, ongoing systems of social relations.",
     "Business transactions rely on interpersonal trust, social networks, and reputational mechanisms rather than pure impersonal contractual law alone.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A). Granovetter formulated modern embeddedness, highlighting trust in economic exchange."),
    ("match", "Economic Sociology Theorists and Concepts",
     "Match the theorists in List I with their foundational market concepts in List II:",
     [("A", "Adam Smith"), ("B", "Karl Polanyi"), ("C", "Mark Granovetter"), ("D", "Alfred Gell")],
     [("I", "Ethnographic study of weekly tribal market (Dhorai Haat in Bastar)"),
      ("II", "Concept of the 'Invisible Hand' guiding market self-interest to social wealth"),
      ("III", "Distinction between socially embedded economies and disembedded market capitalism"),
      ("IV", "Network theory of 'embeddedness' of economic action in social relations")],
     "A-II, B-III, C-IV, D-I",
     "Smith framed Invisible Hand; Polanyi framed embeddedness/Great Transformation; Granovetter framed social networks; Gell studied Dhorai market."),
    ("seq", "Evolution of Markets in Economic Anthropology",
     "Arrange the historical modes of economic exchange formulated by Karl Polanyi in evolutionary sequence:",
     [("A", "Reciprocity: Mutual gift giving and exchange among kin and lineage groups"),
      ("B", "Redistribution: Centralized pooling of agricultural tribute by a chief/temple and reallocation"),
      ("C", "Market Exchange: Impersonal trade governed by price mechanisms and currency in modern capitalism")],
     "A, B, C",
     "Polanyi classified forms of integration into Reciprocity, Redistribution, and Market Exchange.")
]
s15_extras = [
    ("Adam Smith's Invisible Hand", "In *The Wealth of Nations* (1776), Adam Smith's metaphor of the 'Invisible Hand' argued that:",
     "Individuals pursuing their own private economic self-interest unwittingly promote the broader economic welfare of society through market competition",
     ["A giant supernatural deity physically redistributes grain to village families at midnight", "The king of England personally sets the price of every agricultural product in the empire", "Markets can function only under strict military martial law"],
     "Adam Smith argued that voluntary competitive market transactions naturally allocate resources efficiently via self-interest."),
    ("Sociological Critique of Pure Markets", "Sociologists critique the neoclassical model of the 'free market' because:",
     "In reality, markets are skewed by unequal access to capital, caste monopolies, corporate cartels, and state-backed privileges",
     ["In reality, all commodities across the world are given away completely free without prices", "In reality, money was abolished in all nations centuries ago", "In reality, human beings never consume any food or manufactured goods"],
     "Real markets are never perfectly free or equal; they reflect class power, caste networks, and asymmetrical information."),
    ("Labour as a Fictitious Commodity", "Why did Karl Polanyi describe human 'Labour' as a 'Fictitious Commodity'?",
     "Because human labour is human life itself and cannot be produced for sale in a factory like ordinary commercial merchandise",
     ["Because labour is a mathematical illusion that does not exist in reality", "Because workers are manufactured by electronic assembly lines in factories", "Because human beings do not require any food or shelter to survive"],
     "Polanyi argued that labour, land, and money are fictitious commodities: treating human lives purely as commodities causes social devastation."),
    ("Land as a Fictitious Commodity", "Treating 'Land' as a pure market commodity is problematic in sociological terms because:",
     "Land is subdivided nature, ancestral habitat, and ecological heritage that cannot be reproduced or treated solely as a financial asset without environmental destruction",
     ["Land is completely weightless and floats in outer space", "All agricultural land is manufactured in urban chemical laboratories", "Land has zero economic value in any human civilization"],
     "Land represents nature and social space; commodifying it dispossesses indigenous dwellers and causes ecological ruin."),
    ("State Role in Creating Markets", "Contrary to laissez-faire myths, historical sociology shows that modern capitalist national markets:",
     "Were actively created and enforced by strong centralized states through legal property rights, standardized currency, and police enforcement",
     ["Emerged completely spontaneously in wilderness forests without any government laws or courts", "Were invented by nomadic pastoralists living on international ships", "Abolished all forms of taxation and national borders"],
     "States built national markets through statutory contract enforcement, property deeds, transportation grids, and monetary regulation."),
    ("Social Capital in Markets", "Sociologists define 'Social Capital' in economic entrepreneurship as:",
     "The networks of social connections, kinship trust, and group solidarity that individuals leverage to obtain credit, information, and business opportunities",
     ["The physical cash stored in a bank vault exclusively", "The heavy diesel machinery installed in a manufacturing plant", "The total metric tonnage of raw iron ore mined per day"],
     "Social capital refers to social networks and institutional trust that facilitate financial and commercial transactions."),
    ("Cultural Capital in the Market", "According to Pierre Bourdieu, 'Cultural Capital' assists individuals in elite job markets through:",
     "Acquired knowledge of high-status etiquette, elite linguistic accent, refined aesthetic tastes, and prestigious educational credentials",
     ["Owning a collection of ancient bronze coins from South America", "Having the physical ability to lift heavy industrial steel beams", "Speaking thirty distinct tribal dialects fluently"],
     "Cultural capital (degrees, accent, bourgeois etiquette) converts into economic advantage in competitive professional labour markets."),
    ("Informal Economy Preponderance", "In the sociology of the Indian economy, what percentage of the total national workforce operates within the 'Informal Sector'?",
     "Over 85 to 90 percent of the total workforce", ["Under 5 percent of the total workforce", "Exactly 50 percent of the total workforce", "Zero percent, as all Indian workers have permanent government contracts"],
     "Over 85-90% of Indian employment is informal, lacking formal contracts, social security, and employment protections."),
    ("Agrarian Commercialisation in Colonial India", "How did British colonial policies force the commercialisation of Indian agriculture in the 19th century?",
     "By demanding land revenue strictly in cash rather than grain, compelling peasants to cultivate export cash crops (indigo, cotton, opium) and borrow from moneylenders",
     ["By paying every peasant farmer a generous monthly pension in pure gold", "By legally requiring all farmers to eat only imported European canned biscuits", "By banning the cultivation of all crops across northern India"],
     "Cash revenue demands forced subsistence peasants into volatile international cash-crop markets and predatory debt traps."),
    ("De-Industrialisation Thesis", "The historical 'De-Industrialisation' of India under British colonial rule refers to:",
     "The collapse of traditional Indian artisanal handloom textiles caused by duty-free imports of cheap machine-made yarn from Manchester factories",
     ["The complete dismantling of all railway lines across British India", "A constitutional decree banning all international trade in the Indian Ocean", "The voluntary closure of all private family businesses in Mumbai"],
     "British tariff policies flooded India with Manchester textiles, destroying indigenous weavers and driving millions into agricultural labour."),
    ("Virtual Markets and Algorithmic Trading", "In contemporary financial sociology, 'Virtual Markets' are characterized by:",
     "Electronic digital trading platforms where financial derivatives, currencies, and stocks are traded globally in nanoseconds by computer algorithms",
     ["Traditional village merchants weighing grain using stone balances in weekly fairs", "Informal street hawkers selling vegetables on urban railway platforms", "Barter exchange of livestock between nomadic pastoralists"],
     "Modern virtual markets operate in dematerialized digital networks, driven by global algorithmic finance and instantaneous capital flows."),
    ("Moral Economy Concept (E.P. Thompson)", "Historian E.P. Thompson's concept of the 'Moral Economy' describes how traditional peasant communities:",
     "Operate under shared ethical consensus about fair prices, mutual survival, and community obligations, rebelling when market profiteering violates these norms",
     ["Prioritize corporate quarterly profit margins over human life in times of famine", "Refuse to share food with anyone who does not speak classical Latin", "Trade exclusively in foreign luxury electronics"],
     "Moral economy contrasts customary community norms of subsistence and fair price with ruthless free-market speculation."),
    ("Street Vendors and Urban Public Space", "Sociological studies of urban street vendors (hawkers) demonstrate that they:",
     "Provide affordable essential goods to poor urban consumers while constantly negotiating harassment, extortion, and eviction by police and municipal authorities",
     ["Control 90 percent of all international foreign currency exchange reserves", "Receive free private security guards and luxury storefronts from municipal corporations", "Operate exclusively inside private air-conditioned shopping malls"],
     "Street hawkers form the vital lifeline of the urban informal economy, facing systemic precarity and struggle for public vending space."),
    ("Contract Farming Dynamics", "In modern Indian agriculture, 'Contract Farming' between multinational food corporations and farmers involves:",
     "Companies providing seeds and fertilizer on credit while specifying quality standards, transferring production and market risks onto the peasant farmer",
     ["Corporations purchasing all arable land and paying farmers multi-million dollar annual salaries", "The government banning all private corporate food processing factories", "Farmers receiving guaranteed profits regardless of crop yield or quality"],
     "Contract farming integrates peasants into corporate supply chains, but often traps them when crops fail quality standards."),
    ("Consumer Sovereignity Myth", "Sociologists critique the neoclassical dogma of 'Consumer Sovereignty' by pointing out that:",
     "Consumer desires are not autonomous, but actively created, manipulated, and manufactured by corporate advertising and social media algorithms",
     ["Consumers always produce all their own food, clothing, and machinery at home", "Advertising has zero psychological impact on human purchasing decisions", "All consumers possess infinite monetary wealth to buy whatever they wish"],
     "Consumer preferences are culturally constructed through pervasive advertising, branding, and corporate marketing strategies.")
]
for itm in s15_extras:
    top, stem, corr, wrongs, sol = itm
    s15_raw.append(("mcq", top, stem, corr, wrongs, sol))
SLOT15 = build_slot(CH_MARKET, s15_raw)

# Slot 16: Indigenous Business Networks - Chettiars, Hundis & Caste Trust (20 Qs)
s16_raw = [
    ("mcq", "Chettiar Banking Network", "The Nattukottai Chettiars (Nakarattars) of Tamil Nadu were able to operate extensive financial networks across Southeast Asia primarily because:",
     "Their transactions were grounded in dense caste, kinship, and joint-family networks that guaranteed creditworthiness, mutual trust, and contract compliance",
     ["They were granted an exclusive royal monopoly by the Emperor of China to mint gold coins",
      "They conducted all business transactions in classical Latin exclusively",
      "They used modern satellite electronic communications developed by European space agencies"],
     "Chettiar banking relied on caste and kinship trust: business was organized through family firms that enforced mutual accountability."),
    ("stmt", "Hundi as Indigenous Financial Instrument",
     "The 'Hundi' was an indigenous bill of exchange and credit note used by traditional Indian merchant castes to transfer funds across long distances.",
     "Hundis operated successfully because caste-based merchant networks enforced strict social boycotts against anyone who defaulted on a payment.", 1,
     "Both statements are correct: Hundis allowed long-distance capital transfers underwritten by community sanctions and caste reputation."),
    ("ar", "Social Capital in Indigenous Banking",
     "Traditional merchant castes like Marwaris and Chettiars enjoyed lower borrowing costs and transaction risks than non-caste competitors.",
     "Dense kinship networks, communal gossip, and the threat of social ostracism effectively eliminated the risk of loan default within the community.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A). Social capital substituted for formal legal mechanisms, securing cheap credit."),
    ("match", "Traditional Trading Communities and Regions",
     "Match the prominent traditional business communities in List I with their home regions in List II:",
     [("A", "Nattukottai Chettiars"), ("B", "Marwaris"), ("C", "Parsis"), ("D", "Banias / Vaisyas")],
     [("I", "Gujarat and North India"), ("II", "Chettinad region of Tamil Nadu"), ("III", "Marwar region of Rajasthan"), ("IV", "Western India (Bombay and Gujarat)")],
     "A-II, B-III, C-IV, D-I",
     "Chettiars hail from Tamil Nadu; Marwaris from Rajasthan; Parsis from Western India; Banias across Gujarat/North India."),
    ("seq", "Geographical Expansion of Marwari Business Networks",
     "Arrange the historical phases of Marwari merchant expansion in chronological order:",
     [("A", "Operation as local grain merchants, bankers, and moneylenders in Rajasthan princely states"),
      ("B", "Migration along riverine and railway corridors to British commercial hubs like Calcutta and Bombay"),
      ("C", "Dominance of speculative trading, jute brokerage, and cotton wholesale during World War I"),
      ("D", "Transition from commercial and financial brokerage into large-scale modern industrial manufacturing")],
     "A, B, C, D",
     "Marwaris evolved historically from desert bankers to colonial brokers in Calcutta, and finally to modern industrial conglomerates.")
]
s16_extras = [
    ("Chettinad Mansions Architecture", "The monumental, palatial mansions of Chettinad built by wealthy Chettiar bankers in Tamil Nadu incorporated:",
     "Burmese teakwood, Italian marble, and European chandeliers, symbolizing the transnational wealth generated from Southeast Asian banking",
     ["Only mud and straw bricks without any imported materials", "Underground nuclear bunkers constructed by foreign armies", "Zero doors or windows to hide from sunlight"],
     "Chettinad palatial architecture reflected global mercantile wealth: teak from Burma, tile from Europe, and local Dravidian craft."),
    ("Jati as Business Guild", "In Indian economic history, traditional merchant Jatis functioned essentially as:",
     "Closed mercantile guilds that trained apprentices, regulated trade practices, settled business disputes, and protected collective market monopolies",
     ["Open trade unions where anyone could join by taking a written examination", "Charitable monasteries where monks took vows of absolute poverty", "Military regiments designed for territorial naval conquests"],
     "Merchant Jatis functioned as institutional guilds regulating prices, training apprentices, and maintaining monopolies."),
    ("Mahajan / Shroff Institutions", "In pre-colonial and colonial North Indian towns, the traditional indigenous banker and financier was known as:",
     "A Shroff or Mahajan", ["A Subedar", "A Kotwal", "A Patwari"],
     "Shroffs and Mahajans managed local currency exchange, discounting hundis, and financing trade caravan credit."),
    ("Parsi Industrial Entrepreneurship", "The Parsi community in western India emerged as pioneers of modern Indian industry (e.g. Tata, Godrej) largely because:",
     "They early on adapted to British commercial law, mastered English education, and acted as cultural and economic intermediaries in maritime trade",
     ["They were the largest agrarian caste in the Gangetic plains", "They were granted royal land titles by the Mughal Emperor Babur", "They refused to engage in any industrial manufacturing or banking"],
     "Parsis leveraged intermediate commercial roles, English education, and civic philanthropy to build pioneering industrial enterprises."),
    ("Bania Caste Stereotypes and Sociology", "In Indian cultural sociology, the commercial 'Bania' community was often stereotyped as:",
     "Frugal, astute, and profit-calculating, reflecting the community's intense cultural emphasis on accounting precision, capital accumulation, and trade diligence",
     ["Reckless warriors interested only in military conquest", "Nomadic forest hunters who despised money and trade", "Ascetic monks who refused to wear clothing or eat cooked food"],
     "Bania cultural socialization prioritized commercial accounting (Bahi-Khata), capital preservation, and mercantile acumen."),
    ("Credit Rotation and Chit Funds", "Traditional informal credit associations (such as 'Chit Funds' or 'Bishis') in Indian business communities operate by:",
     "Pooling regular monthly savings from members and auctioning the pooled capital to the member in greatest immediate business need",
     ["Confiscating all member savings and transferring them to foreign private bank accounts", "Investing exclusively in deep space exploration rockets", "Burning all cash contributions at an annual community bonfire"],
     "Chit funds mobilize community savings and circulate liquidity to entrepreneurs without bureaucratic bank collateral."),
    ("Social Boycott as Ultimate Financial Sanction", "Why was the threat of caste ostracism ('Hukka-Pani Band') an effective enforcement mechanism in traditional merchant communities?",
     "A defaulting merchant was cut off from communal credit, commercial partnerships, social dining, and marriage alliances for his children",
     ["It resulted in the merchant being declared a sovereign foreign monarch", "It awarded the merchant free housing in metropolitan city centers", "It forced all banks to forgive all the merchant's debts permanently"],
     "Caste ostracism meant complete economic and social ruin: no merchant would trade with, lend to, or marry into the defaulter's family."),
    ("Transnational Chettiar Presence in Burma", "Prior to the nationalization of land in Burma (Myanmar) in the 1930s and 1940s, Chettiar bankers:",
     "Financed the expansion of the Burmese rice frontier, emerging as major financiers and agricultural landholders in the Irrawaddy delta",
     ["Worked exclusively as coal miners in underground shafts", "Founded the first television manufacturing factory in Southeast Asia", "Were prohibited by Burmese kings from handling any money"],
     "Chettiars provided the vital agricultural credit that transformed the Irrawaddy delta into the world's leading rice export region."),
    ("Marwari Transition to Modern Industry", "Prominent industrial conglomerates such as Birla, Dalmia, and Bajaj originated from:",
     "Marwari merchant-banking families who reinvested trading and speculative brokerage profits into domestic cement, textile, and manufacturing plants",
     ["European corporate executives posted in Indian diplomatic embassies", "Traditional forest hunter-gatherers of the Andaman Islands", "Colonial military generals who retired in Mumbai"],
     "Marwaris channeled trade surpluses into domestic import-substituting industries (textiles, cement, sugar) in the early 20th century."),
    ("Khandan and Family Firm Centrality", "Sociological studies of Indian family businesses show that the core organizational unit is:",
     "The patriarchal family firm (Khandan), where business decisions, capital ownership, and executive control remain concentrated in family hands",
     ["A random board of anonymous international civil servants chosen by lottery", "A municipal council committee that changes members every week", "A collective workers' cooperative where all decisions are made by factory labourers"],
     "Indian capitalism remains heavily anchored in family-owned conglomerates (family capitalism), combining modern management with kin control."),
    ("Ethnic Enclaves and Market Specialization", "In Indian metropolitan bazaars (e.g. Chandni Chowk, Burrabazar), market specialization by caste resulted in:",
     "Distinct ethnic and caste enclaves dominating specific commodity trades (e.g. cloth, spices, bullion, chemicals, transport)",
     ["Every single shop selling an identical mixture of milk and coal", "The complete absence of any shops or physical marketplaces", "All businesses being owned exclusively by foreign sovereign states"],
     "Ethnic and caste ties structured trade niches: specific sub-castes monopolized wholesale trade in cloth, gold, or grains."),
    ("Religious Ethos and Business: Jainism", "Sociologists have linked the prominent entrepreneurial success of the Jain community in Indian commerce to:",
     "Strict adherence to Ahimsa (non-violence) which precluded farming and military pursuits, channeling occupational talent into trade, banking, and gems",
     ["A religious requirement that all members become heavy industrial weapons manufacturers", "A commandment forbidding all Jains from using money or writing accounts", "A theological mandate to emigrate permanently to Europe"],
     "Ahimsa diverted Jains away from agriculture (injuring soil organisms) and warfare into literacy, finance, and mercantile pursuits."),
    ("Trust Deficit and Outsiders in Traditional Trade", "Traditional merchant networks were historically reluctant to extend credit or business partnerships to non-caste outsiders because:",
     "Outsiders fell outside the social control and disciplinary sanctions of the community, creating a high risk of default that formal courts could not easily resolve",
     ["Outsiders were legally required to carry identity cards issued by foreign space agencies", "Outsiders spoke only modern electronic computer programming languages", "Outsiders were prohibited from carrying cash under criminal law"],
     "Kinship networks functioned as information clearinghouses: outsiders lacked the reputational collateral to ensure creditworthiness."),
    ("Modern Formalisation of Indigenous Credit", "The growth of modern formal commercial banking, digital UPI payments, and GST compliance has:",
     "Gradually eroded traditional informal hundi credit systems while forcing family firms to formalize their accounting and legal compliance",
     ["Completely eliminated all use of electronic smartphones in Indian cities", "Made it illegal for any private banks to operate in India", "Forced all Indian businesses to return exclusively to ancient cowry shell currency"],
     "Digital banking, regulatory oversight, and GST have steadily integrated traditional informal credit networks into the formal financial sector."),
    ("Community Philanthropy and Social Legitimacy", "Traditional Indian merchant dynasties legitimized their wealth and built community prestige by:",
     "Extensive communal philanthropy (Dharmashalas, Gaushalas, temples, educational trusts, and drought relief water tanks)",
     ["Spending all their wealth exclusively on private fireworks displays in foreign capitals", "Purchasing private naval warships to attack neighboring states", "Refusing to allow any charitable institutions to be built in their cities"],
     "Philanthropic endowments (Dharma) translated commercial wealth into social honor (Izzat) and reinforced community solidarity.")
]
for itm in s16_extras:
    top, stem, corr, wrongs, sol = itm
    s16_raw.append(("mcq", top, stem, corr, wrongs, sol))
SLOT16 = build_slot(CH_MARKET, s16_raw)

print("Slots 15 and 16 compiled.")
