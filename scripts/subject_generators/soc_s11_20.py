import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import mcq, stmt, ar, match, seq

CH_INST = "Social Institutions: Continuity and Change"
CH_MARKET = "The Market as a Social Institution"
CH_INEQ = "Patterns of Social Inequality and Exclusion"

# Import slots 11 and 12 from make_soc_s11_20
import scripts.subject_generators.make_soc_s11_20 as s11_12
SLOTS_11_20 = s11_12.slots

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

# Slot 13: Matrilineal Systems (Khasi, Garo, Nayar) (20 Qs)
s13_raw = [
    ("mcq", "Khasi Matrilineal Descent", "In the matrilineal system of the Khasi in Meghalaya, lineage and clan membership are traced strictly through:",
     "The mother's line (uterine descent)", ["The father's line exclusively", "Both parents equally with zero clan rules", "The village chief's adopted lineage"],
     "Khasi matriliny traces clan membership and descent strictly through the mother's line."),
    ("mcq", "Khadduh Inheritance Role", "In traditional Khasi customary inheritance, the ancestral family property and house are inherited by:",
     "The youngest daughter (Khadduh)", ["The eldest son", "The maternal uncle exclusively", "The village priest"],
     "The youngest daughter (Khadduh) inherits the ancestral home and acts as custodian of family property."),
    ("stmt", "Khasi Matrilineal Tensions",
     "Tiplut Nongbri observed that the Khasi matrilineal system generates structural role conflict for Khasi men.",
     "Khasi men are torn between responsibilities toward their sister's children (as Kni/uncle) and their own biological wife and children.", 1,
     "Both statements are correct: Khasi men experience structural strain between uncle obligations to natal clan and husband/father duties."),
    ("ar", "Matriliny vs Matriarchy Distinction",
     "Matriliny is not the mirror opposite of patriarchy; a matrilineal society is not necessarily a matriarchy.",
     "In matrilineal systems like the Khasi, political power and decision-making authority are still exercised primarily by men (the maternal uncle).", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A). Authority resides with male maternal uncles rather than women holding political rule."),
    ("match", "Matrilineal Communities and Features",
     "Match the matrilineal communities in List I with their sociological features in List II:",
     [("A", "Khasi of Meghalaya"), ("B", "Nayar of Kerala"), ("C", "Garo of Meghalaya"), ("D", "Khadduh")],
     [("I", "Youngest daughter who inherits ancestral family property and custodian responsibilities"),
      ("II", "Matrilineal joint family household historically termed the Taravad"),
      ("III", "Matrilineal society where inheritance goes to the chosen daughter (Nokna)"),
      ("IV", "Matrilineal society where descent is traced through the mother and uncle is Kni")],
     "A-IV, B-II, C-III, D-I",
     "Khasi has Kni uncle; Nayar had Taravad; Garo has Nokna; Khadduh is Khasi youngest daughter."),
    ("seq", "Matrilineal Succession Rules",
     "Arrange the stages of Khasi property management and inheritance in logical sequence:",
     [("A", "Maternal lineage accumulates ancestral property and sacred clan heirlooms"),
      ("B", "Senior maternal uncle (Kni) exercises practical managerial authority over family land"),
      ("C", "Ancestral residence and property pass formally to the youngest daughter (Khadduh)"),
      ("D", "Khadduh's daughters continue the matrilineal succession to the next generation")],
     "A, B, C, D",
     "Matrilineal succession passes through the mother to the Khadduh, while male uncles exercise managerial control."),
    ("mcq", "Nayar Taravad Structure", "The traditional matrilineal joint family residential compound of the Nayars of Kerala was known as:",
     "The Taravad", ["The Chulha", "The Gotra", "The Kudi"], "The Taravad was the sprawling matrilineal joint family estate of the Nayars."),
    ("mcq", "Karanavan Role in Nayar Society", "In the traditional Nayar Taravad, the senior male manager who exercised absolute administrative control was:",
     "The Karanavan (eldest maternal uncle or brother)", ["The husband of the youngest daughter", "The village Brahmin temple priest", "A British civil magistrate"],
     "The Karanavan was the senior maternal male authority who managed the Taravad's agricultural estates."),
    ("mcq", "Sambandham Marriage Alliance", "In pre-modern Kerala, the traditional visiting marriage arrangement between Nayar women and Namboodiri or Nayar men was called:",
     "Sambandham", ["Swayamvara", "Anuloma", "Gotra Vivaha"], "Sambandham was the customary visiting marriage union in matrilineal Nayar society."),
    ("mcq", "Marumakkattayam System", "The Malayalam term 'Marumakkattayam' literally denotes the matrilineal inheritance system where property is inherited by:",
     "One's sister's children (nephews and nieces) rather than one's own biological sons",
     ["One's eldest biological son", "Foreign colonial trading corporations", "The village blacksmith"],
     "Marumakkattayam means inheritance through sister's children (nephews/nieces) in the maternal line."),
    ("mcq", "Decline of Nayar Matriliny", "What major legal and economic change led to the disintegration of the Nayar Taravad system in the early 20th century?",
     "Statutory partition acts (such as the Madras Marumakkattayam Act 1932) permitting individual partition and sale of Taravad land",
     ["A complete volcanic destruction of all agricultural land across Kerala", "A military decree banning women from living in homes", "The forced conversion of all Nayars to European monasticism"],
     "Legal reforms allowed individual partition of Taravad property, causing the collapse of the matrilineal joint estate."),
    ("mcq", "Garo Matriliny: The Nokna", "In the matrilineal system of the Garo community of Meghalaya, the daughter selected to inherit ancestral property is called:",
     "The Nokna", ["The Khadduh", "The Karanavan", "The Rani"], "Among the Garo, the inheriting daughter is designated as the Nokna."),
    ("mcq", "Garo Avunculocal Residence", "In traditional Garo customary marriage, the husband of the inheriting daughter (Nokkrom):",
     "Moves into his wife's household and is typically the nephew (sister's son) of his father-in-law",
     ["Takes his wife to reside permanently in an overseas country", "Lives in an isolated treehouse alone", "Must abandon all contact with human society"],
     "The Garo Nokkrom (son-in-law) marries the Nokna and is often the sister's son of the household head."),
    ("mcq", "Matriliny vs Patriarchy in Politics", "Even in matrilineal societies like Meghalaya, political leadership in modern state assemblies has been:",
     "Overwhelmingly dominated by male politicians, demonstrating that matriliny does not equate to political matriarchy",
     ["Composed 100 percent of female legislators with zero men permitted to contest", "Managed entirely by foreign non-governmental organizations", "Abolished and replaced by military tribunals"],
     "Despite matrilineal kinship, political power in modern Meghalaya remains overwhelmingly in the hands of male politicians."),
    ("mcq", "Modern Pressures on Khasi Matriliny", "In contemporary Meghalaya, organizations like 'Syngkhong Rympei Thymmai' (SRT) formed by Khasi men have demanded:",
     "The introduction of patrilineal inheritance, where children take the father's surname and sons inherit property",
     ["The immediate expulsion of all women from the state of Meghalaya", "A statutory ban on all marriages across India", "The conversion of Meghalaya into a foreign overseas colony"],
     "Male reform groups in Meghalaya advocate shifting to patriliny, citing male alienation in matrilineal inheritance."),
    ("mcq", "Matrilocal Residence Definition", "In anthropology, 'Matrilocal' (or uxorilocal) residence refers to the rule where upon marriage:",
     "The married couple establishes their residence with or near the wife's mother's kin",
     ["The couple resides permanently with the husband's father's relatives", "The couple is required to live in an uninhabited forest", "The husband and wife must live in separate towns"],
     "Matrilocal residence dictates that the husband moves to reside with or near his wife's maternal family."),
    ("stmt", "Matrilineal Property Alienation Restrictions",
     "Under Khasi customary law, the youngest daughter (Khadduh) cannot sell or alienate ancestral property without the consent of her maternal uncles.",
     "The Khadduh is considered the custodian and caretaker of ancestral property, rather than an absolute commercial owner.", 1,
     "Both statements are correct: The Khadduh holds ancestral land in trust for the family and clan, requiring uncle consent for major decisions."),
    ("ar", "Resilience of Matrilineal Identity",
     "Despite modern economic changes, Khasi women continue to take deep pride in matrilineal lineage identity.",
     "Matrilineal descent provides Khasi women with substantial domestic security, ancestral belonging, and protection against dowry-related violence.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A). Matriliny eliminates dowry evils and protects female family dignity."),
    ("mcq", "Absence of Female Foeticide in Matrilineal Societies", "In sharp contrast to northwestern patriarchal states, matrilineal tribal societies in Northeast India exhibit:",
     "Favorable child sex ratios and an absence of female foeticide or son preference",
     ["The highest female foeticide rates in the world", "Mandatory abandonment of all girl children at birth", "Zero female literacy across all generations"],
     "Matrilineal values cherish girl children, leading to balanced sex ratios and the absence of female foeticide."),
    ("mcq", "Minakshi Sen on Taravad Decline", "Historians and sociologists document that British colonial courts undermined Kerala matriliny by:",
     "Interpreting customary matrilineal relations through Victorian patriarchal legal assumptions, empowering male Karanavans as absolute owners",
     ["Banning all men from entering courts of law", "Declaring that only women could speak in judicial trials", "Cancelling all paper currency in Travancore"],
     "Colonial judges misunderstood matriliny, granting male Karanavans autocratic control that eroded collective Taravad rights.")
]
SLOTS_11_20[13] = build_slot(CH_INST, s13_raw)

# Slot 14: Kinship Terminology, Exogamy, Endogamy (20 Qs)
s14_raw = [
    ("mcq", "Village Exogamy in North India", "In traditional North Indian kinship organization, 'Village Exogamy' dictates that:",
     "A person cannot marry anyone from within their own natal village, treating all village co-residents as fictive siblings",
     ["All marriages must occur exclusively between next-door neighbors in the same village", "Men must marry women from foreign overseas continents exclusively", "Marriage between residents of adjacent villages is punishable by death"],
     "Village exogamy prohibits marriage within one's home village, treating co-villagers as fictive kin."),
    ("mcq", "Sapinda Exogamy Rule", "In Hindu classical kinship jurisprudence, the 'Sapinda' rule prohibits marriage between individuals who:",
     "Share common ancestral pinda (body/lineage offering) within five generations on the mother's side and seven generations on the father's side",
     ["Belong to identical modern political parties", "Graduated from the same government secondary high school", "Own identical brands of agricultural tractors"],
     "Sapinda rules forbid marriage within prohibited degrees of consanguinity (typically 5 maternal and 7 paternal generations)."),
    ("stmt", "North vs South Kinship Differences (Karve)",
     "According to Iravati Karve, North Indian kinship prohibits marriage between close biological kin and enforces village exogamy.",
     "South Indian kinship positively encourages cross-cousin marriages (marriage with maternal uncle's daughter or paternal aunt's daughter).", 1,
     "Both statements are correct: Karve contrasted North Indian exogamy with South Indian cross-cousin preference."),
    ("ar", "South Indian Cross-Cousin Marriage Logic",
     "Cross-cousin marriages in South Indian kinship systems consolidate family landholdings and maintain close female ties.",
     "A woman marrying her cross-cousin remains within a known circle of kin rather than moving as a stranger to an unfamiliar village.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A). South Indian alliance preserves property and reduces bride isolation."),
    ("match", "Kinship Systems: North vs South India",
     "Match the kinship features in List I with their regional practice in List II:",
     [("A", "Village Exogamy and Gotra Exogamy"), ("B", "Cross-Cousin Marriage (MBD/FZD)"), ("C", "Uncle-Niece Marriage Preference"), ("D", "Prohibition of any cousin marriage")],
     [("I", "North India"), ("II", "South India (specific castes in Tamil Nadu/Andhra)"), ("III", "South India (widespread preference)"), ("IV", "North India (strict classical rule)")],
     "A-I, B-III, C-II, D-IV",
     "North India enforces village/gotra exogamy and bans cousin marriage; South India practices cross-cousin and uncle-niece marriage."),
    ("seq", "Affinal Alliance Formation in North India",
     "Arrange the stages of traditional arranged marriage negotiation in North India in chronological sequence:",
     [("A", "Verification of Gotra, caste endogamy, and genealogical non-relatedness (Sapinda check)"),
      ("B", "Horoscope matching and informal family background verification"),
      ("C", "Formal betrothal (Rokna/Sagai) cementing mutual alliance between patrilineages"),
      ("D", "Performance of Vivaha ceremony and Patrilocal departure (Kanyadaan and Vidaai)")],
     "A, B, C, D",
     "Arranged marriages move sequentially through caste/gotra checks, horoscope matching, betrothal, and wedding rituals."),
    ("mcq", "Parallel Cousins vs Cross Cousins", "In anthropological kinship terminology, who is a 'Cross-Cousin'?",
     "Children of siblings of the opposite sex (father's sister's child or mother's brother's child)",
     ["Children of siblings of the same sex (father's brother's child or mother's sister's child)", "Unrelated children attending the same boarding school", "Step-children adopted from a foreign country"],
     "Cross-cousins are offspring of opposite-sex siblings (FZD, MBD, FZS, MBS); parallel cousins are offspring of same-sex siblings."),
    ("mcq", "Parallel Cousin Marriage Taboo", "In both North and South Indian Hindu kinship systems, marriage with a 'Parallel Cousin' (e.g. father's brother's daughter):",
     "Is strictly taboo and considered incestuous, as parallel cousins are treated as biological siblings",
     ["Is compulsory and mandated by religious law", "Is rewarded with financial subsidies by the state government", "Is practiced exclusively during leap years"],
     "Parallel cousins are classified as brother and sister, making marriage strictly taboo in Hindu kinship."),
    ("mcq", "Gotra Definition", "In Hindu kinship organization, a 'Gotra' is essentially:",
     "An exogamous patrilineal clan tracing mythical descent from a common ancient Vedic sage (Rishi)",
     ["A localized trade union of agricultural wage labourers", "An all-India political party contesting parliamentary elections", "A commercial banking guild formed during the colonial era"],
     "A Gotra is an exogamous patriclan tracing unilineal descent from an ancestral Vedic seer."),
    ("mcq", "Fictive Kinship in Indian Villages", "In village ethnography, 'Fictive Kinship' refers to the social practice where:",
     "Unrelated co-villagers from different castes address each other using kinship terms (e.g. 'Chacha', 'Bhabhi', 'Behan') to create community solidarity",
     ["Villagers invent fake family names to evade government income taxes", "Villagers sign commercial contracts to adopt foreign tourists as legal heirs", "Villagers refuse to acknowledge any biological relatives"],
     "Fictive kinship uses familial terms across caste lines to establish social harmony and mutual obligations within a village."),
    ("mcq", "Descriptive vs Classificatory Kinship (Morgan)", "Lewis Henry Morgan differentiated 'Descriptive' kinship from 'Classificatory' kinship based on whether:",
     "Kin terms distinguish lineal relatives from collateral relatives (descriptive) or group them under a single broad term (classificatory)",
     ["Kin terms are written in Sanskrit or modern European languages", "Kin terms are spoken only by women or only by men", "Kin terms refer exclusively to deceased ancestors"],
     "Descriptive systems use separate terms for specific kin; classificatory systems group various collateral kin under one term."),
    ("mcq", "Levirate Marriage Custom", "In sociological anthropology, the practice of 'Junior Levirate' (Karewa/Chadar Andazi in Haryana) refers to:",
     "A custom where a widow marries the younger brother of her deceased husband",
     ["A custom where a widower marries his deceased wife's younger sister", "A marriage between two individuals who have never met", "A marriage conducted on international waters"],
     "Levirate is the marriage of a widow to her deceased husband's brother (often to keep land within the family)."),
    ("mcq", "Sororate Marriage Custom", "In kinship studies, 'Sororate' marriage refers to the practice where:",
     "A widower marries the younger sister of his deceased wife",
     ["A widow marries her maternal uncle", "A woman marries four brothers simultaneously", "A man marries his mother's sister"],
     "Sororate is the marriage of a widower to his deceased wife's sister."),
    ("mcq", "Polyandry in the Himalayas", "Fraternal Polyandry (where brothers share a common wife) was historically practiced by certain Himalayan groups (e.g. Khasas of Jaunsar Bawar) primarily to:",
     "Prevent the fragmentation of scarce agricultural landholdings and adapt to harsh mountain subsistence ecology",
     ["Comply with British colonial military taxation laws", "Promote commercial tourism from urban metropolitan centers", "Conform to classical Vedic scriptural commandments"],
     "Fraternal polyandry kept scarce mountain terrace land intact within a single joint patrilineal household."),
    ("mcq", "Polygyny in Pre-Modern India", "Historically, 'Polygyny' (one man having multiple wives simultaneously) in traditional Indian society was primarily associated with:",
     "Rulers, wealthy landed aristocrats, and high-status elites as a marker of political power and dynastic alliance",
     ["The poorest landless agricultural labourers who could not afford food", "Urban industrial factory workers living in single-room tenements", "Nomadic hunter-gatherers in the Andaman Islands"],
     "Polygyny was historically restricted to wealthy elites, royalty, and aristocrats as a symbol of power and lineage alliance."),
    ("stmt", "North Indian Patrilocality and Bride Isolation",
     "In North India, the combination of village exogamy and patrilocality forces a young bride to move to an unfamiliar village where she has no natal kin.",
     "This spatial and social isolation historically contributed to the vulnerability of young brides to domestic oppression.", 1,
     "Both statements are correct: Village exogamy uproots North Indian brides, moving them away from supportive natal kin networks."),
    ("ar", "Khap Panchayats and Gotra Violations",
     "Khap Panchayats in northwestern India have violently opposed same-Gotra (intra-Gotra) marriages.",
     "They consider individuals belonging to the same Gotra to be biological siblings and view intra-Gotra marriage as incestuous.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A). Khap councils enforce strict Gotra exogamy through customary sanctions."),
    ("mcq", "Supreme Court on Inter-Caste Marriage", "In landmark rulings (such as *Lata Singh v. State of UP* and *Shakti Vahini*), the Supreme Court of India held that:",
     "Two consenting adults have a fundamental constitutional right to marry across caste or religion without illegal interference from Khap Panchayats",
     ["Village caste councils have full legal authority to execute individuals who marry across caste", "Inter-caste marriage is strictly unconstitutional under Indian law", "All citizens must obtain permission from district magistrates before falling in love"],
     "The Supreme Court declared the right to marry a person of one's choice a fundamental liberty under Article 21."),
    ("mcq", "Special Marriage Act 1954 Significance", "The historic legislative significance of the Special Marriage Act, 1954 is that it provides for:",
     "A civil marriage available to all Indian citizens irrespective of their religious faith, without requiring religious conversion",
     ["Compulsory religious conversion for all brides marrying into another faith", "A mandatory dowry payment verified by state income tax authorities", "The total abolition of all religious festivals across India"],
     "The Special Marriage Act enables inter-faith and inter-caste civil marriages registered before state marriage registrars."),
    ("mcq", "Hypergamy and Female Foeticide Link", "Anthropologists argue that the cultural desire for 'Hypergamy' (marrying daughters into higher status families) historically fueled:",
     "Escalating dowry demands, parental debt, and son preference, directly contributing to female foeticide and female infanticide",
     ["The universal abolition of all marriage ceremonies in northern India", "The complete equality of male and female wages in agriculture", "A ban on all wedding gifts across all Indian states"],
     "Hypergamy intensifies dowry inflation to attract higher-status grooms, reinforcing son preference and female elimination.")
]
SLOTS_11_20[14] = build_slot(CH_INST, s14_raw)
