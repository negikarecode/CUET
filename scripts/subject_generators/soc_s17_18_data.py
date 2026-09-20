import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import mcq, stmt, ar, match, seq

CH_MARKET = "The Market as a Social Institution"

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

# Slot 17: Traditional Weekly Markets - Dhorai Haat (Alfred Gell Bastar study) (20 Qs)
s17_raw = [
    ("mcq", "Alfred Gell's Dhorai Haat Study", "In his celebrated ethnographic study of Dhorai village in Bastar (Chhattisgarh), anthropologist Alfred Gell analyzed:",
     "The weekly tribal market (Haat) as a social and ritual space that reflects and reproduces the local hierarchy of social groups",
     ["The construction of an international nuclear research laboratory in an isolated forest",
      "The complete abolition of all agricultural farming by tribal council decree",
      "The operation of a foreign commercial airline reservation terminal in a tribal village"],
     "Alfred Gell demonstrated that the weekly tribal market is a structured social space reflecting local caste and ethnic hierarchies."),
    ("stmt", "Weekly Market Social Functions",
     "Weekly tribal markets (Haats) in central India function not merely as economic arenas of commodity exchange, but as vital social institutions for meeting kin, arranging marriages, and exchanging news.",
     "Tribal weekly markets are organized strictly by automated electronic computer terminals with zero human social interaction.", 3,
     "Statement I is correct as Haats are vibrant multi-dimensional social arenas; Statement II is incorrect."),
    ("ar", "Spatial Layout in Tribal Markets",
     "In Alfred Gell's study of Dhorai Haat, the physical layout and seating arrangement of the market reflected the local social hierarchy.",
     "High-status, non-tribal merchants (traders, jewelers, manufactured goods sellers) occupied the central sheltered core, while tribal sellers of forest produce were relegated to the periphery.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A). The spatial topography of the market mapped directly onto the social hierarchy of Bastar."),
    ("match", "Zones of the Weekly Tribal Market",
     "Match the market zones in Alfred Gell's Dhorai study in List I with the goods and sellers in List II:",
     [("A", "Central sheltered stalls"), ("B", "Intermediate market ring"), ("C", "Market periphery"), ("D", "Liquor and socializing zone")],
     [("I", "Local artisan pottery, iron tools, and tailored village clothing"),
      ("II", "Affluent non-tribal merchants selling manufactured goods, jewelry, and cloth"),
      ("III", "Tribal women selling forest produce, wild vegetables, and firewood"),
      ("IV", "Tasting traditional mahua liquor and socializing with distant clan relatives")],
     "A-II, B-I, C-III, D-IV",
     "Center has non-tribal manufactured goods; middle has local crafts; periphery has tribal forest produce; social edge has liquor/kin meetings."),
    ("seq", "A Typical Day at the Weekly Tribal Haat",
     "Arrange the stages of a weekly tribal market day in typical chronological sequence:",
     [("A", "Early morning arrival of tribal villagers walking miles with headloads of forest produce"),
      ("B", "Setting up of market stalls with manufactured goods by visiting itinerant urban merchants"),
      ("C", "Intense afternoon commodity buying, selling, and barter exchanges between groups"),
      ("D", "Late afternoon socializing, sharing mahua drink, arranging matrimonial visits, and returning home")],
     "A, B, C, D",
     "The weekly market unfolds from early morning arrival to setup, afternoon trading, and evening social gatherings.")
]

s17_extras = [
    ("Unequal Terms of Exchange in Haat", "Anthropological studies show that in weekly tribal markets, terms of trade between tribal gatherers and non-tribal merchants are characterized by:",
     "Unequal exchange, where valuable forest produce is purchased cheaply by traders using manipulated measures, while manufactured goods are sold at high prices",
     ["Complete equality where tribal villagers dictate all international exchange rates", "Traders giving away all manufactured goods for free without payment", "Tribal gatherers being paid in pure gold bullion by colonial banks"],
     "Non-tribal traders exploit illiteracy, non-standard measures, and debt to extract valuable forest produce at exploitative rates."),
    ("The Non-Monetary Dimension of Haats", "In addition to buying and selling goods with cash, weekly tribal markets preserve elements of:",
     "Barter and direct reciprocity, where villagers exchange paddy or minor forest produce directly for salt, spices, or earthenware pots",
     ["High-frequency algorithmic electronic derivative trading", "International corporate merger and acquisition negotiations", "Trading exclusively in foreign sovereign bond contracts"],
     "Traditional barter persists alongside cash, especially for small subsistence exchanges of salt, clay pots, and vegetables."),
    ("Haat as a Matrimonial Matchmaking Arena", "How do weekly markets in tribal regions function in the context of marriage and youth socialization?",
     "Young men and women from different villages, dressed in festive attire and ornaments, visit the market to meet, converse, and initiate courtship alliances",
     ["Caste councils conduct mandatory military physical fitness tests for all teenagers", "Marriage is strictly prohibited from ever being discussed within market boundaries", "Young people are forbidden from attending weekly markets under criminal law"],
     "The market is a festive space where youth from scattered settlements display traditional finery and negotiate courtship."),
    ("Itinerant Traders Cycle", "The professional non-tribal merchants who sell cloth, plastic goods, and aluminum utensils at tribal markets typically operate by:",
     "Following a weekly circuit, moving on a regular schedule from one village market to another across the district on designated days of the week",
     ["Residing permanently inside underground salt mines and never travelling", "Owning private commercial jumbo jets that land directly in the village forest", "Conducting all transactions by telepathy without physical goods"],
     "Itinerant traders follow weekly market circuits, linking remote rural hinterlands to metropolitan manufacturing supply chains."),
    ("Alcohol and Market Sociality", "In the sociology of central Indian tribal markets, the consumption of traditional fermented drinks (mahua, landa) in market stalls:",
     "Functions as an institutionalized medium of hospitality, kinship bonding, relaxation, and sacred ancestral offerings",
     ["Is classified as a capital crime punishable by military courts", "Is forced upon villagers by foreign space exploration agencies", "Is consumed exclusively by corporate business executives visiting from abroad"],
     "Mahua and traditional beer are social and sacred drinks shared with kin, cementing social bonds after marketing transactions."),
    ("Haats and State Authority", "Historically, colonial and post-colonial state authorities utilized the weekly tribal market as a convenient site for:",
     "Tax collection, government announcements, police surveillance, public health vaccination drives, and administrative summons",
     ["Conducting private golf tournaments for foreign tourists", "Demolishing all rural villages and planting monoculture rubber trees", "Banning all human beings from visiting the marketplace"],
     "Because scattered populations congregate at the Haat, it became the primary node for state surveillance, taxation, and announcements."),
    ("Measurement Injustices in Traditional Haats", "Tribal ethnographies document that non-tribal grain merchants historically exploited illiterate tribal sellers by using:",
     "Asymmetrical volume measures (larger wooden containers when buying grain from tribals, smaller containers when selling grain to them)",
     ["Laser-calibrated electronic digital scales verified by international physicists", "Standardized metric weights distributed free by the United Nations", "Paper balances that could not weigh anything accurately"],
     "Manipulated volume measures (Paili/Katha) and unstandardized stone weights institutionalized systematic exploitation of tribal producers."),
    ("Traditional Markets vs Supermarkets", "Unlike modern impersonal supermarkets, transactions in a traditional weekly market are characterized by:",
     "Face-to-face social interaction, bargaining, personal banter, gossip, and relationship building between buyer and seller",
     ["Automated barcode scanning by electronic robotics exclusively", "Complete silence where talking is punishable by severe financial fines", "Customers being locked in solitary rooms to order goods by computer"],
     "Haat transactions are relational and personalized: bargaining and social storytelling are integral to price determination."),
    ("Market Days as Temporal Markers", "In many tribal communities lacking printed calendars, the days of the week are traditionally identified by:",
     "The names of the neighboring villages where the weekly market takes place on that particular day (e.g. 'Dhorai market day')",
     ["The exact flight schedules of commercial transatlantic airlines", "The closing prices of shares on the New York Stock Exchange", "The dates of foreign historical revolutions in Europe"],
     "The weekly market cycle structures local time: days are recognized by the market village scheduled for that day."),
    ("Market Fees and Local Contractors", "The right to collect toll fees and stall rents from vendors at traditional rural weekly markets is typically:",
     "Auctioned by local Gram Panchayats or district boards to revenue contractors, who frequently overcharge vulnerable marginal hawkers",
     ["Managed completely free of charge by international volunteers", "Banned by the Supreme Court of India under fundamental equality rights", "Distributed exclusively to children under five years of age"],
     "Panchayats auction market rights to local contractors, whose rent extractions often burden vulnerable rural hawkers."),
    ("Traditional Crafts in Rural Haats", "Why are local artisanal pottery, iron tools, and bamboo baskets sold at rural Haats vital to the agricultural economy?",
     "They provide cheap, customized subsistence tools and storage vessels that industrial corporate consumer goods cannot easily replace in remote farming",
     ["They are made of pure radioactive titanium used for building space stations", "They can only be purchased by foreign billionaires for art museum displays", "They are declared illegal weapons by the Indian Penal Code"],
     "Local craftspersons provide essential repair services, custom ploughshares, and storage vessels adapted to local farm ecologies."),
    ("Forest Protection and Produce Outflow", "Ecologists and sociologists observe that the weekly market often functions as the funnel through which:",
     "Vast quantities of ecological wealth (timber, medicinal plants, non-timber forest produce) flow outwards from vulnerable forests into national and global commodity markets",
     ["Huge mountains of electronic computer mainframes are imported into isolated forests", "All industrial pollutants from urban factories are transported and buried in villages", "Foreign governments ship all their printed books to rural tribal children"],
     "The market acts as an extractive conduit: local biodiversity and raw materials flow outwards to urban corporate processing centers."),
    ("Women's Role in Weekly Markets", "In weekly tribal markets across Northeast and Central India, women play a central role as:",
     "Independent economic actors who manage market stalls, sell fresh produce, negotiate prices, and control household marketing budgets",
     ["Passive observers who are legally forbidden from touching money or entering market stalls", "Foreign corporate marketing executives managing multi-million dollar advertising campaigns", "Military guards patrolling market borders with weapons"],
     "Tribal women are visible, autonomous entrepreneurs in weekly markets, contrasting with upper-caste patriarchal female seclusion."),
    ("Impact of Rural Roads on Traditional Haats", "How has the construction of all-weather rural roads (Pradhan Mantri Gram Sadak Yojana) transformed traditional weekly markets?",
     "It has increased the influx of cheap factory-made plastics and processed consumer goods, squeezing out traditional village artisans while expanding trader access",
     ["It has completely halted all trade and forced all markets to shut down permanently", "It has resulted in the total elimination of all motor vehicles from rural India", "It has banned all villagers from leaving their homes on market days"],
     "All-weather roads integrated Haats into urban wholesale circuits, expanding manufactured goods at the expense of traditional handicrafts."),
    ("Haats as Cultural Heritage", "In modern cultural sociology and tourism studies, weekly tribal and rural markets are increasingly viewed as:",
     "Living cultural heritage arenas that preserve indigenous traditions, biodiversity exchanges, and distinct community aesthetics",
     ["Obsolete sanitary hazards that should be immediately paved over and converted into commercial shopping malls", "Military battlegrounds where neighboring villages fight wars with swords", "Zero-value tourist traps fabricated purely for foreign movie cameras"],
     "Sociology values the Haat as a rich socio-cultural institution embodying community solidarity, ecological knowledge, and living heritage.")
]
for itm in s17_extras:
    top, stem, corr, wrongs, sol = itm
    s17_raw.append(("mcq", top, stem, corr, wrongs, sol))
SLOT17 = build_slot(CH_MARKET, s17_raw)

# Slot 18: Commodification & Consumption (Pushkar Fair, Pilgrimages, Surrogacy) (20 Qs)
s18_raw = [
    ("mcq", "Commodification Definition", "In sociological theory, what does the process of 'Commodification' fundamentally refer to?",
     "The transformation of goods, services, cultural traditions, or human relationships—previously outside the market sphere—into commercial commodities with cash prices",
     ["The complete elimination of all paper currency and return exclusively to stone-age barter",
      "A statutory government mandate requiring all private companies to shut down operations",
      "The process of painting all public buildings and vehicles with identical commercial logos"],
     "Commodification occurs when non-market activities, cultural rituals, or human organs become goods bought and sold for monetary profit."),
    ("stmt", "Commodification of Sacred Rituals",
     "The commercialization of traditional religious pilgrimages (such as the Pushkar Camel Fair or Kumbh Mela) has transformed sacred rituals into global tourist spectacles.",
     "Commodification always leads to the immediate destruction and total abandonment of all religious faith among believers.", 3,
     "Statement I is correct as pilgrimage sites are packaged for international tourism; Statement II is incorrect as religious faith often adapts and coexists with commerce."),
    ("ar", "Commercialisation of the Pushkar Fair",
     "The Pushkar Camel Fair in Rajasthan has evolved from a traditional pastoral livestock barter gathering into an internationally marketed tourism spectacle.",
     "State tourism corporations and luxury travel operators packaged Rajasthani camel pageantry, folklore, and sacred lake rituals as exotic cultural commodities for global tourists.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A). Cultural packaging commodified a traditional pastoral gathering into global tourism."),
    ("match", "Commodification Domains and Examples",
     "Match the sociological domains of commodification in List I with their real-world examples in List II:",
     [("A", "Commodification of Nature"), ("B", "Commodification of Sacred Rituals"), ("C", "Commodification of Human Body"), ("D", "Commodification of Traditional Knowledge")],
     [("I", "Commercial surrogacy, organ trade, and private blood plasma sales"),
      ("II", "Corporate patenting of traditional medicinal neem, turmeric, and herbal formulas"),
      ("III", "Privatization and bottling of natural spring drinking water into plastic containers"),
      ("IV", "VIP express darshan tickets and commercialized luxury pilgrimage packages")],
     "A-III, B-IV, C-I, D-II",
     "Nature: bottled water; Sacred: VIP darshan; Body: commercial surrogacy; Knowledge: patenting traditional herbs."),
    ("seq", "Stages in the Commodification of Cultural Heritage",
     "Arrange the stages in the commodification of traditional folk culture in logical sequence:",
     [("A", "Traditional community practice of music, dance, or handicraft for local ritual celebrations"),
      ("B", "Discovery and promotion of the cultural tradition by state tourism boards and private media"),
      ("C", "Standardization and packaging of the folk art for sale as souvenirs and hotel stage performances"),
      ("D", "Cultural performers becoming dependent on commercial tourism market revenues for livelihood")],
     "A, B, C, D",
     "Culture moves from local ritual practice to external promotion, commercial packaging, and market dependence.")
]

s18_extras = [
    ("Commercial Surrogacy as Commodification", "In contemporary Indian sociology, the boom in commercial surrogacy in cities like Anand (Gujarat) was analyzed as:",
     "The commodification of women's reproductive labour and bodies to serve wealthy domestic and international intended parents",
     ["A compulsory government program to increase the national population", "A traditional religious ritual practiced in ancient Vedic monasteries", "A form of punishment imposed by municipal criminal courts"],
     "Commercial surrogacy turns reproductive labour and the female body into a commercial service governed by market contracts."),
    ("Commodification of Clean Water", "The global expansion of the bottled water and water tanker industry demonstrates how:",
     "A free common property resource and basic human right is converted into a profitable market commodity, excluding those unable to pay",
     ["Clean drinking water can be manufactured out of pure nitrogen gas in factories", "Water has ceased to be necessary for human biological survival", "Private corporations distribute unlimited clean water to all citizens for free"],
     "Privatizing water illustrates commodification of the commons, transforming a basic survival necessity into a priced commodity."),
    ("Yoga Commercialisation and Commodification", "How has the global spread of Yoga transformed its traditional philosophical essence?",
     "Traditional spiritual asceticism has been commodified into a multi-billion dollar wellness industry selling branded apparel, mats, and studio memberships",
     ["Yoga has been declared illegal by the United Nations under international health laws", "Yoga has completely disappeared from all Asian societies", "Yoga is practiced exclusively by professional automobile mechanics"],
     "Yoga was transformed from spiritual discipline into a consumer lifestyle commodity, complete with branded gear and studio franchises."),
    ("VIP Darshan and Spiritual Commodification", "Sociologists analyze the introduction of tiered 'VIP Special Darshan' tickets at major Hindu temples (e.g. Tirupati, Shirdi) as:",
     "The marketization of sacred space, where economic wealth grants privileged, faster access to the deity over ordinary queueing devotees",
     ["A policy designed to eliminate all income differences among citizens", "A government plan to convert all temples into public bus stations", "An initiative to abolish the Hindu religion entirely"],
     "Paid VIP queues commodify sacred access: financial capital supersedes traditional notions of egalitarian spiritual devotion."),
    ("Traditional Folk Art as Commercial Souvenir", "When traditional ritual arts (such as Madhubani paintings or Warli tribal murals) are commodified for urban markets:",
     "They shift from temporary ritual paintings on mud walls to permanent commercial canvases, greeting cards, and designer clothing produced for profit",
     ["They become strictly classified as national defense secrets and hidden in underground vaults", "They can only be viewed by foreign prime ministers in embassies", "All artists are legally forbidden from selling their works"],
     "Sacred ritual paintings on home walls become commercial decor items, altering artistic motifs to appeal to urban consumer tastes."),
    ("Disneyfication of Cultural Festivals", "Sociologists use the term 'Disneyfication' (or cultural commodification) to describe how cultural festivals are:",
     "Sanitized, standardized, and theatricalized into superficial spectacles designed to entertain paying tourists without cultural depth",
     ["Converted into secret religious cults that meet only at midnight in caves", "Banned by state governments under environmental pollution statutes", "Handed over to international military peacekeeping forces"],
     "Disneyfication strips complex rituals of sacred or protest meanings, packaging them as colorful consumer entertainment."),
    ("Commodification of Traditional Medicine (AYUSH)", "The global marketing of Ayurvedic herbal products and cosmetics by corporate conglomerates represents:",
     "The commercialization of traditional holistic medicine into branded consumer packaged goods (FMCG) for profit maximization",
     ["A statutory ban on the cultivation of all medicinal herbs in India", "The complete nationalization of all private pharmaceutical companies", "A mandate that all citizens must become full-time Ayurvedic doctors"],
     "Indigenous medical knowledge is packaged into corporate FMCG brands (soaps, teas, cosmetics), driven by market branding."),
    ("Wedding Industry Commercialisation", "The modern multi-billion dollar 'Big Fat Indian Wedding' industry illustrates commodification through:",
     "The commercialization of kinship celebrations into extravagant consumer spectacles of designer fashion, luxury destination resorts, and event management firms",
     ["A government law banning all weddings across the country", "A requirement that all weddings be conducted in total silence in under five minutes", "The complete elimination of all music and food at family gatherings"],
     "Marriage rituals have commercialized into lavish consumer display, professionalized by event planners, caterers, and luxury resorts."),
    ("Patenting Indigenous Knowledge as Biopiracy", "When multinational corporations patent formulations derived from neem, basmati rice, or turmeric without local consent, it constitutes:",
     "Biopiracy and illegitimate commodification of collective indigenous knowledge developed over generations by farming communities",
     ["A generous philanthropic gift from foreign corporations to Indian farmers", "An automated scientific discovery made by artificial intelligence without human history", "A policy approved unanimously by all Indian village panchayats"],
     "Biopiracy privatizes collective traditional knowledge, asserting exclusive intellectual property monopolies over shared heritage."),
    ("Commercialisation of Hospitality (Atithi Devo Bhava)", "The transformation of traditional hospitality ('Atithi Devo Bhava') into the commercial hotel and homestay industry demonstrates how:",
     "Customary cultural duties of welcoming guests are converted into priced service contracts governed by hospitality management metrics",
     ["Human beings have completely stopped travelling to new places", "All hotels across India are required by law to provide free rooms to all citizens", "Foreign tourists are legally prohibited from sleeping in beds"],
     "Traditional host-guest sacred duty is translated into commercial hospitality, priced by room rates and customer service ratings."),
    ("Body Commodification and Organ Trade", "The illicit market for human kidney transplants in developing nations is an extreme manifestation of commodification where:",
     "Desperately poor individuals are driven by debt and poverty to sell their vital biological organs to affluent buyers through exploitative broker cartels",
     ["Healthy citizens are awarded multi-million dollar cash bonuses by state governments for running marathons", "All surgical operations are conducted exclusively by computer robots without human doctors", "Human organs are declared worthless and discarded as garbage"],
     "Organ trafficking represents the desperate commodification of the body, where bodily integrity is sacrificed for debt survival."),
    ("Authenticity Dilemma in Tourist Arts", "Sociologist Dean MacCannell pointed out that when cultural rituals are commodified for tourism, communities face the dilemma of:",
     "Staging 'contrived authenticity' for visitors while feeling that their sacred rituals are losing their genuine communal meaning",
     ["Having all their traditional musical instruments confiscated by the police", "Being required to speak only foreign European languages in their homes", "Being completely ignored by all tourists and media forever"],
     "Tourist markets produce 'staged authenticity': performers dramatize rituals for tourists while privately grieving lost authenticity."),
    ("Commercialisation of Care Work", "The rapid growth of commercial placement agencies for domestic maid servants, nannies, and elderly caretakers reflects:",
     "The commodification of domestic care labour previously performed unpaid by women within the kinship household",
     ["A constitutional amendment banning women from entering domestic homes", "The total replacement of all human domestic workers by android robotics", "A law requiring all grandparents to live alone on desert islands"],
     "Care work has moved into the market, performed predominantly by underprivileged migrant women for cash wages without security."),
    ("Advertising and Manufactured Desire", "How does corporate advertising accelerate the commodification of everyday life?",
     "By creating artificial anxieties and convincing consumers that emotional satisfaction, self-worth, and social status can only be purchased through commodities",
     ["By encouraging citizens to destroy all their money and live in wilderness caves", "By legally requiring all citizens to wear identical gray clothing", "By banning all private businesses from selling products"],
     "Advertising manufactures consumer desires, linking emotional well-being and social identity directly to brand consumption."),
    ("Resistance to Commodification", "Social movements against privatization (e.g. anti-water privatization struggles, free software movements) seek to:",
     "Defend public goods, common property resources, and open knowledge from being absorbed into private market commodification",
     ["Demand that all food and water be commercialized at double the current price", "Forbid human beings from using computer technology or clean water", "Surrender all public parks to private real estate corporations"],
     "Anti-commodification movements assert that certain essentials (water, healthcare, knowledge, nature) are common human rights.")
]
for itm in s18_extras:
    top, stem, corr, wrongs, sol = itm
    s18_raw.append(("mcq", top, stem, corr, wrongs, sol))
SLOT18 = build_slot(CH_MARKET, s18_raw)

print("Slots 17 and 18 compiled successfully.")
