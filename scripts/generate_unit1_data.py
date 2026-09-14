import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scripts.bio_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, normalize_text, get_pyq_normalized_set
)

questions = []
seen = set()
pyq_seen = get_pyq_normalized_set()

def add(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:70]}")
    if norm in pyq_seen:
        raise ValueError(f"Matches PYQ: {q['questionText'][:70]}")
    seen.add(norm)
    questions.append(q)

print("Starting generation of Unit 1 Reproduction questions...")

# =========================================================================
# SECTION 1: Sexual Reproduction in Flowering Plants (65 Questions)
# =========================================================================

# Q1
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Microsporangium Wall Layers",
    "Which wall layer of the microsporangium possesses dense cytoplasm, is generally multinucleated, and nourishes the developing microspores?",
    ["Tapetum", "Endothecium", "Middle layers", "Epidermis"],
    "A",
    "1. The microsporangium is surrounded by four wall layers: epidermis, endothecium, middle layers, and tapetum.\n2. The outer three layers are protective and assist in anther dehiscence.\n3. The innermost layer is the tapetum, which has dense cytoplasm, is multinucleate, and nourishes developing pollen grains.\nHence, Option A is correct."
))

# Q2
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Sporopollenin Properties",
    "Sporopollenin, forming the exine of pollen grains, is notable because:",
    [
        "It can withstand high temperatures, strong acids, and alkali, and no degrading enzyme is known",
        "It is readily digested by digestive enzymes secreted by the stigma",
        "It forms an unbroken layer without any apertures or pores",
        "It is synthesized exclusively by the vegetative cell cytoplasm"
    ],
    "A",
    "1. Sporopollenin is one of the most resistant organic materials known.\n2. It can withstand high temperatures and strong acids and alkali.\n3. No enzyme that degrades sporopollenin is known.\n4. It is absent at germ pores.\nHence, Option A is correct."
))

# Q3
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Pollen Shedding Stage",
    "In approximately 60% of angiosperms, pollen grains are shed at which of the following stages?",
    [
        "2-celled stage (vegetative cell and generative cell)",
        "3-celled stage (vegetative cell and two male gametes)",
        "Single-celled microspore stage before mitosis",
        "4-celled stage containing three generative cells"
    ],
    "A",
    "1. In over 60% of angiosperms, pollen grains are shed at the 2-celled stage (one vegetative and one generative cell).\n2. In the remaining species, the generative cell divides mitotically to form two male gametes before shedding (3-celled stage).\nHence, Option A is correct."
))

# Q4
add(make_match_question(
    "Sexual Reproduction in Flowering Plants",
    "Anther Wall Layers & Functions",
    "Match List I (Anther wall layer) with List II (Characteristic/Function):",
    [
        ("(A)", "Epidermis"),
        ("(B)", "Endothecium"),
        ("(C)", "Tapetum"),
        ("(D)", "Middle layers")
    ],
    [
        ("(I)", "Cells nourish developing pollen and possess dense cytoplasm"),
        ("(II)", "Single outermost protective layer of anther"),
        ("(III)", "Fibrous alpha-cellulosic bands aiding anther dehiscence"),
        ("(IV)", "Short-lived parenchymatous layers that crush during maturity")
    ],
    [
        "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)",
        "(A)-(II), (B)-(I), (C)-(III), (D)-(IV)",
        "(A)-(III), (B)-(II), (C)-(I), (D)-(IV)",
        "(A)-(IV), (B)-(III), (C)-(I), (D)-(II)"
    ],
    "A",
    "1. Epidermis: outermost protective layer (A -> II).\n2. Endothecium: subepidermal with hygroscopic fibrous bands aiding dehiscence (B -> III).\n3. Tapetum: nourishes developing microspores (C -> I).\n4. Middle layers: short-lived 1-3 layers that degenerate (D -> IV).\nHence, Option A is correct."
))

# Q5
add(make_sequence_question(
    "Sexual Reproduction in Flowering Plants",
    "Microsporogenesis Order",
    "Arrange the following stages of microsporogenesis and male gametophyte formation in correct sequential order:",
    [
        "Sporogenous tissue cells function as Pollen Mother Cells (PMCs)",
        "Meiotic division of PMC yielding microspore tetrad",
        "Dissociation of microspores and pollen grain formation",
        "Mitotic division of generative cell into two male gametes"
    ],
    [
        "(A) -> (B) -> (C) -> (D)",
        "(B) -> (A) -> (C) -> (D)",
        "(A) -> (C) -> (B) -> (D)",
        "(C) -> (A) -> (B) -> (D)"
    ],
    "A",
    "1. Sporogenous tissue cells differentiate into PMCs (A).\n2. Each PMC undergoes meiosis producing a microspore tetrad (B).\n3. Microspores dissociate as anthers dehydrate, forming pollen grains (C).\n4. Generative cell divides mitotically to yield two male gametes (D).\nHence, Option A is correct."
))

# Q6
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Pollen Allergy",
    "Which invasive weed introduced into India as a contaminant with imported wheat causes widespread pollen allergy and chronic respiratory disorders like asthma?",
    ["Parthenium hysterophorus (Carrot grass)", "Eichhornia crassipes", "Lantana camara", "Pistia stratiotes"],
    "A",
    "1. Parthenium or carrot grass came into India as a contaminant with imported wheat and has become ubiquitous in occurrence.\n2. Its pollen grains cause widespread allergic reactions, including chronic respiratory disorders such as asthma and bronchitis.\nHence, Option A is correct."
))

# Q7
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Pollen Viability",
    "In members of which of the following families do pollen grains retain viability for several months?",
    [
        "Rosaceae, Leguminosae, and Solanaceae",
        "Poaceae and Gramineae only",
        "Orchidaceae and Asteraceae only",
        "Brassicaceae and Malvaceae only"
    ],
    "A",
    "1. In some cereals such as rice and wheat, pollen grains lose viability within 30 minutes of their release.\n2. In some members of Rosaceae, Leguminosae, and Solanaceae, they maintain viability for months.\nHence, Option A is correct."
))

# Q8
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Pollen Cryopreservation",
    "Pollen grains of numerous species can be stored for years in pollen banks for crop breeding programmes using liquid nitrogen at what temperature?",
    ["-196°C", "-80°C", "-40°C", "-100°C"],
    "A",
    "1. It is possible to store pollen grains of a large number of species for years in liquid nitrogen (-196°C).\n2. Such stored pollen can be used as pollen banks, similar to seed banks in crop breeding programmes.\nHence, Option A is correct."
))

# Q9
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Megasporogenesis & Functional Megaspore",
    "In a typical monosporic embryo sac development in angiosperms, which of the four megaspores generally remains functional while the other three degenerate?",
    [
        "The megaspore located at the chalazal end",
        "The megaspore located closest to the micropyle",
        "Any random megaspore determined by competition",
        "The two middle megaspores"
    ],
    "A",
    "1. In a majority of flowering plants, one of the megaspores is functional while the other three degenerate.\n2. Generally, the functional megaspore is the one situated at the chalazal end, while the three towards the micropylar end degenerate.\nHence, Option A is correct."
))

# Q10
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Embryo Sac Organization",
    "A typical mature female gametophyte (embryo sac) of angiosperms at maturity is:",
    [
        "7-celled and 8-nucleate",
        "8-celled and 8-nucleate",
        "7-celled and 7-nucleate",
        "8-celled and 7-nucleate"
    ],
    "A",
    "1. Three cells are grouped together at the micropylar end and constitute the egg apparatus (two synergids and one egg cell).\n2. Three cells are at the chalazal end and are called antipodals.\n3. The large central cell has two polar nuclei.\n4. Thus, a typical angiosperm embryo sac at maturity, though 8-nucleate, is 7-celled.\nHence, Option A is correct."
))

# Q11
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Filiform Apparatus",
    "The filiform apparatus is a specialized cellular thickening characteristic of which cells in the mature embryo sac?",
    ["Synergids", "Egg cell", "Antipodal cells", "Central cell"],
    "A",
    "1. The synergids have special cellular thickenings at the micropylar tip called the filiform apparatus.\n2. The filiform apparatus plays an important role in guiding the pollen tube into the synergid.\nHence, Option A is correct."
))

# Q12
add(make_statement_question(
    "Sexual Reproduction in Flowering Plants",
    "Geitonogamy Nature",
    "Geitonogamy is functionally cross-pollination involving a pollinating agent.",
    "Genetically, geitonogamy is similar to autogamy because the pollen grains come from the same plant.",
    "A",
    "1. Geitonogamy is the transfer of pollen grains from the anther to the stigma of another flower of the same plant.\n2. Although geitonogamy is functionally cross-pollination involving a pollinating agent, genetically it is similar to autogamy since the pollen grains come from the same plant.\nBoth Statement I and Statement II are correct. Option A is correct."
))

# Q13
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Cleistogamous Flowers",
    "Which of the following plants produce both chasmogamous and cleistogamous flowers, ensuring seed set even in the complete absence of pollinators?",
    ["Viola (common pansy), Oxalis, and Commelina", "Vallisneria, Hydrilla, and Zostera", "Yucca, Amorphophallus, and Ficus", "Zea mays, Ricinus, and Carica papaya"],
    "A",
    "1. Some plants such as Viola (common pansy), Oxalis, and Commelina produce two types of flowers: chasmogamous and cleistogamous.\n2. Cleistogamous flowers do not open at all, ensuring autogamous seed set even without pollinators.\nHence, Option A is correct."
))

# Q14
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Wind-Pollinated Flowers Features",
    "Which of the following suites of floral characteristics is typically adapted for wind pollination (anemophily)?",
    [
        "Light and non-sticky pollen, well-exposed stamens, and large feathery stigma",
        "Sticky pollen, colourful petals, strong fragrance, and nectar glands",
        "Heavy mucilage-coated pollen with reduced perianth and deep nectar spurs",
        "Brightly coloured bracts, cleistogamous buds, and branched style"
    ],
    "A",
    "1. Wind pollination requires that the pollen grains are light and non-sticky so that they can be transported in wind currents.\n2. They often possess well-exposed stamens and large, often feathery stigmas to easily trap air-borne pollen grains.\nHence, Option A is correct."
))

# Q15
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Water Pollination Examples",
    "Which of the following aquatic plants is pollinated by insects or wind rather than water currents?",
    ["Water hyacinth (Eichhornia) and Water lily (Nymphaea)", "Vallisneria", "Hydrilla", "Zostera (sea grass)"],
    "A",
    "1. In a majority of aquatic plants such as water hyacinth and water lily, the flowers emerge above the level of water and are pollinated by insects or wind as in most land plants.\n2. Vallisneria, Hydrilla, and Zostera are true hydrophilous plants.\nHence, Option A is correct."
))

# Q16
add(make_match_question(
    "Sexual Reproduction in Flowering Plants",
    "Outbreeding Mechanisms",
    "Match List I (Device to prevent inbreeding) with List II (Biological mechanism):",
    [
        ("(A)", "Dichogamy"),
        ("(B)", "Self-incompatibility"),
        ("(C)", "Dioecy"),
        ("(D)", "Heterostyly")
    ],
    [
        ("(I)", "Genetic mechanism inhibiting pollen germination from the same plant on stigma"),
        ("(II)", "Anther and stigma are placed at different positions so pollen cannot reach stigma"),
        ("(III)", "Pollen release and stigma receptivity are not synchronized"),
        ("(IV)", "Male and female flowers are borne on different plants (e.g., Papaya)")
    ],
    [
        "(A)-(III), (B)-(I), (C)-(IV), (D)-(II)",
        "(A)-(I), (B)-(III), (C)-(IV), (D)-(II)",
        "(A)-(III), (B)-(II), (C)-(IV), (D)-(I)",
        "(A)-(II), (B)-(IV), (C)-(I), (D)-(III)"
    ],
    "A",
    "1. Dichogamy: nonsynchronized pollen release and stigma receptivity (A -> III).\n2. Self-incompatibility: genetic mechanism preventing self pollen from fertilizing ovules (B -> I).\n3. Dioecy: male and female flowers on different individual plants (C -> IV).\n4. Heterostyly: anther and stigma placed at different positions (D -> II).\nHence, Option A is correct."
))

# Q17
add(make_assertion_question(
    "Sexual Reproduction in Flowering Plants",
    "Dioecy in Papaya",
    "In papaya plants, both autogamy and geitonogamy are prevented.",
    "Papaya is dioecious, meaning male and female flowers are borne on entirely separate individuals.",
    "A",
    "1. If male and female flowers are present on different plants (dioecious condition), as in papaya (Carica papaya), each individual is either staminate or pistillate.\n2. This condition prevents both autogamy and geitonogamy.\n3. The reason correctly explains the assertion.\nHence, Option A is correct."
))

# Q18
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Emasculation in Artificial Hybridization",
    "Why is emasculation unnecessary when female parent plants produce unisexual flowers in plant breeding programmes?",
    [
        "Because unisexual female flowers completely lack anthers, so there is no risk of self-pollination",
        "Because female flowers reject self pollen via chemical incompatibility",
        "Because pollen grains in unisexual flowers are always sterile",
        "Because unisexual flowers do not produce any nectar to attract insects"
    ],
    "A",
    "1. If the female parent produces unisexual flowers, there is no need for emasculation.\n2. The female flower buds are bagged before the flowers open, and when the stigma becomes receptive, pollination is carried out using desired pollen.\nHence, Option A is correct."
))

# Q19
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Double Fertilization Events",
    "Double fertilization in angiosperms involves two distinct fusion events known as:",
    [
        "Syngamy (forming 2n zygote) and Triple fusion (forming 3n PEN)",
        "Double syngamy (forming two diploid zygotes)",
        "Triple fusion of three male gametes with one egg cell",
        "Syngamy of two vegetative cells and one generative cell"
    ],
    "A",
    "1. One male gamete moves towards the egg cell and fuses with its nucleus, completing syngamy to form a diploid zygote (2n).\n2. The other male gamete moves towards the two polar nuclei in the central cell and fuses with them to produce a triploid Primary Endosperm Nucleus (PEN, 3n).\n3. Since two types of fusions occur in an embryo sac, the phenomenon is called double fertilization.\nHence, Option A is correct."
))

# Q20
add(make_sequence_question(
    "Sexual Reproduction in Flowering Plants",
    "Embryo Development Stages",
    "Arrange the following stages of dicotyledonous embryo development in correct developmental sequence:",
    [
        "Zygote",
        "Proembryo",
        "Globular stage",
        "Heart-shaped stage",
        "Mature embryo"
    ],
    [
        "(A) -> (B) -> (C) -> (D) -> (E)",
        "(A) -> (C) -> (B) -> (D) -> (E)",
        "(B) -> (A) -> (C) -> (D) -> (E)",
        "(A) -> (B) -> (D) -> (C) -> (E)"
    ],
    "A",
    "1. The zygote gives rise to the proembryo (B).\n2. Subsequently, it transitions into the globular stage (C).\n3. Then the heart-shaped stage (D).\n4. Finally, the mature embryo with cotyledons and embryonal axis forms (E).\nHence, Option A is correct."
))

# Q21
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Endosperm Types: Coconut",
    "In coconut, the tender coconut water and the surrounding white kernel represent respectively:",
    [
        "Free-nuclear endosperm and cellular endosperm",
        "Cellular endosperm and free-nuclear endosperm",
        "Liquid cotyledon and solid endosperm",
        "Perisperm and pericarp"
    ],
    "A",
    "1. The water from tender coconut is free-nuclear endosperm (made up of thousands of nuclei).\n2. The surrounding white kernel is the cellular endosperm.\nHence, Option A is correct."
))

# Q22
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Non-Endospermic vs Endospermic Seeds",
    "Which of the following pairs represents non-endospermic (exalbuminous) seeds in which the endosperm is completely consumed prior to seed maturation?",
    ["Pea and Groundnut", "Castor and Maize", "Wheat and Barley", "Coconut and Castor"],
    "A",
    "1. Endosperm may either be completely consumed by the developing embryo before seed maturation (e.g., pea, groundnut, beans) — called non-albuminous seeds.\n2. Or it may persist in the mature seed (e.g., castor, coconut, cereals) — called albuminous seeds.\nHence, Option A is correct."
))

# Q23
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Perisperm Definition & Examples",
    "In seeds of black pepper and beet, remnants of nucellus are persistent. This persistent residual nucellus is termed:",
    ["Perisperm", "Pericarp", "Scutellum", "Endothecium"],
    "A",
    "1. In some seeds such as black pepper and beet, remnants of nucellus are also persistent.\n2. This residual, persistent nucellus is called perisperm.\nHence, Option A is correct."
))

# Q24
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "False Fruits Origin",
    "Fruits such as apple, strawberry, and cashew are described as false fruits because:",
    [
        "The thalamus also contributes to fruit formation along with the ovary",
        "They develop without any fertilization taking place",
        "They do not contain any viable seeds inside",
        "The fruit wall develops from the calyx alone"
    ],
    "A",
    "1. In a few species such as apple, strawberry, and cashew, the thalamus also contributes to fruit formation.\n2. Such fruits are called false fruits. Fruits developing exclusively from the ovary are true fruits.\nHence, Option A is correct."
))

# Q25
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Seed Dormancy & Viability Records",
    "The oldest viable seed recorded, excavated from Arctic Tundra, belongs to which plant that germinated and flowered after an estimated 10,000 years of dormancy?",
    ["Lupinus arcticus (Lupine)", "Phoenix dactylifera (Date palm)", "Nelumbo nucifera (Lotus)", "Striga asiatica"],
    "A",
    "1. The oldest is that of a lupine, Lupinus arcticus, excavated from Arctic Tundra.\n2. The seed germinated and flowered after an estimated record of 10,000 years of dormancy.\n3. A recent record of 2000 years old viable seed is of the date palm, Phoenix dactylifera, discovered at King Herod's palace near Dead Sea.\nHence, Option A is correct."
))

# Q26
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Apomixis Mechanism",
    "Apomixis is a special mode of reproduction found in some species of Asteraceae and grasses in which:",
    [
        "Seeds are produced without fertilization, mimicking sexual reproduction",
        "Ovary develops into fruit without pollination and without seed",
        "Pollen tubes directly fuse without discharging male gametes",
        "Vegetative buds directly detach and root in soil"
    ],
    "A",
    "1. Although seeds, in general, are the products of fertilization, a few flowering plants such as some species of Asteraceae and grasses have evolved a special mechanism, to produce seeds without fertilization, called apomixis.\n2. It is a form of asexual reproduction that mimics sexual reproduction.\nHence, Option A is correct."
))

# Q27
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Polyembryony in Citrus",
    "In many Citrus and mango varieties, occurrence of more than one embryo in a seed (polyembryony) arises because:",
    [
        "Nucellar cells surrounding the embryo sac begin dividing and protrude into the embryo sac to develop into embryos",
        "Multiple pollen tubes fertilize multiple egg cells in the same ovule",
        "Synergids and antipodals are fertilized by secondary pollen tubes",
        "The zygote undergoes multiple transverse cleavages forming identical twins"
    ],
    "A",
    "1. In many Citrus and mango varieties, some of the nucellar cells surrounding the embryo sac start dividing, protrude into the embryo sac and develop into the embryos.\n2. In such species each ovule contains many embryos. Occurrence of more than one embryo in a seed is referred to as polyembryony.\nHence, Option A is correct."
))

# Q28
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Pollen Grain Wall Chemicals",
    "The exine of the pollen grain has prominent apertures where sporopollenin is absent. These apertures are known as:",
    ["Germ pores", "Micropyle", "Stomatal crypts", "Chalaza"],
    "A",
    "1. Pollen grain exine has prominent apertures called germ pores where sporopollenin is absent.\n2. The pollen tube emerges through one of the germ pores during germination.\nHence, Option A is correct."
))

# Q29
add(make_match_question(
    "Sexual Reproduction in Flowering Plants",
    "Floral Parts & Post-Fertilization Fate",
    "Match List I (Pre-fertilization structure) with List II (Post-fertilization fate):",
    [
        ("(A)", "Ovary wall"),
        ("(B)", "Integuments"),
        ("(C)", "PEN (Primary Endosperm Nucleus)"),
        ("(D)", "Zygote")
    ],
    [
        ("(I)", "Endosperm tissue"),
        ("(II)", "Seed coat (Testa and Tegmen)"),
        ("(III)", "Pericarp (Fruit wall)"),
        ("(IV)", "Embryo")
    ],
    [
        "(A)-(III), (B)-(II), (C)-(I), (D)-(IV)",
        "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)",
        "(A)-(III), (B)-(I), (C)-(II), (D)-(IV)",
        "(A)-(IV), (B)-(II), (C)-(I), (D)-(III)"
    ],
    "A",
    "1. Ovary wall -> Pericarp (fruit wall) (A -> III).\n2. Ovule integuments -> Seed coat (B -> II).\n3. PEN -> Endosperm (C -> I).\n4. Zygote -> Embryo (D -> IV).\nHence, Option A is correct."
))

# Q30
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Monocot Embryo Parts",
    "In the grass family (Gramineae), the single cotyledon of the embryo is situated towards one side of the embryonal axis and is called:",
    ["Scutellum", "Coleoptile", "Coleorhiza", "Epiblast"],
    "A",
    "1. Embryos of monocotyledons possess only one cotyledon.\n2. In the grass family, the cotyledon is called scutellum that is situated towards one side (lateral) of the embryonal axis.\nHence, Option A is correct."
))

# Q31
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Coleoptile and Coleorhiza",
    "In grass embryos, the plumule and radicle are enclosed respectively in protective sheaths known as:",
    [
        "Coleoptile and Coleorhiza",
        "Coleorhiza and Coleoptile",
        "Scutellum and Epiblast",
        "Pericarp and Perisperm"
    ],
    "A",
    "1. At its lower end, the embryonal axis has the radical and root cap enclosed in an undifferentiated sheath called coleorhiza.\n2. The portion of the embryonal axis above the level of attachment of scutellum is the epicotyl. Epicotyl has a shoot apex and a few leaf primordia enclosed in a hollow foliar structure, the coleoptile.\nHence, Option A is correct."
))

# Q32
add(make_assertion_question(
    "Sexual Reproduction in Flowering Plants",
    "Cleistogamy Advantage & Disadvantage",
    "Cleistogamous flowers produce assured seed set even in the absence of pollinators.",
    "Cleistogamous flowers never open, completely preventing cross-pollination and leading to inbreeding depression over generations.",
    "B",
    "1. Both Assertion and Reason are true scientific statements from NCERT.\n2. Assertion is true: cleistogamous flowers ensure seed-set even without pollinators because anthers and stigma lie close together within unopened buds.\n3. Reason is also true: they lack cross-pollination and promote continuous self-pollination.\n4. However, the reason why seed set is assured is the close proximity of dehiscing anthers to stigma within the closed flower, not the occurrence of inbreeding depression.\nHence, Option B is correct."
))

# Q33
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Pollen Tube Entry into Ovule",
    "The pollen tube enters the ovule through which structure and enters the embryo sac through which cell?",
    [
        "Enters ovule through micropyle; enters embryo sac through one of the synergids",
        "Enters ovule through chalaza; enters embryo sac through antipodal cell",
        "Enters ovule through hilum; enters embryo sac through central cell",
        "Enters ovule through funicle; enters embryo sac through egg cell directly"
    ],
    "A",
    "1. After reaching the ovary, the pollen tube enters the ovule through the micropyle.\n2. It then enters one of the synergids through the filiform apparatus.\nHence, Option A is correct."
))

# Q34
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Yucca and Pronuba Moth Relationship",
    "The obligate mutualistic relationship between the plant Yucca and the moth Pronuba illustrates:",
    [
        "The moth deposits its eggs in the locule of the ovary and pollinates the flower in return",
        "The moth acts as a nectar robber without depositing pollen",
        "The plant produces pseudocopulatory pheromones to deceive the moth",
        "The moth larva feeds exclusively on the vegetative cell of the pollen"
    ],
    "A",
    "1. A species of moth and the plant Yucca cannot complete their life cycles without each other.\n2. The moth deposits its eggs in the locule of the ovary and the flower, in turn, gets pollinated by the moth. The larvae come out of the eggs as seeds start developing.\nHence, Option A is correct."
))

# Q35
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Amorphophallus Pollination Reward",
    "In Amorphophallus (which bears a towering 6-foot tall flower), what is the primary floral reward provided to its insect pollinators?",
    [
        "Providing a safe place to lay eggs",
        "Supplying copious lipid droplets and wax",
        "Providing hallucinogenic chemical fragrances",
        "Offering specialized starch-rich staminodes"
    ],
    "A",
    "1. In some species, floral rewards are in providing safe places to lay eggs.\n2. An example is that of the tallest flower of Amorphophallus (the flower itself is but 6 feet in height).\nHence, Option A is correct."
))

# Q36
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Parthenocarpy Induction",
    "Parthenocarpic fruits develop without fertilization and are seedless. Which phytohormone can be applied to induce commercial parthenocarpy in tomatoes?",
    ["Auxins", "Abscisic acid", "Ethylene", "Cytokinins"],
    "A",
    "1. Parthenocarpy can be induced through the application of growth hormones such as auxins.\n2. Such fruits are seedless (e.g., banana, induced parthenocarpic tomatoes).\nHence, Option A is correct."
))

# Q37
add(make_statement_question(
    "Sexual Reproduction in Flowering Plants",
    "Endosperm Precedence",
    "Endosperm development precedes embryo development in angiosperms.",
    "The primary endosperm cell divides repeatedly to form a triploid endosperm tissue that stores nutrition essential for the developing embryo.",
    "A",
    "1. Endosperm development precedes embryo development.\n2. The primary endosperm cell divides repeatedly and forms a triploid endosperm tissue. The cells of this tissue are filled with reserve food materials and are used for the nutrition of the developing embryo.\nBoth statements are correct and Statement II gives the biological necessity. Option A is correct."
))

# Q38
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Number of Meiotic Divisions for Seeds",
    "How many meiotic divisions are required to produce 100 viable seeds in a typical angiosperm plant?",
    ["125", "100", "50", "25"],
    "A",
    "1. To produce 100 seeds, 100 functional pollen grains and 100 functional megaspores/embryo sacs are required.\n2. 1 meiotic division in PMC yields 4 pollen grains. For 100 pollen grains: 100 / 4 = 25 meiotic divisions.\n3. 1 meiotic division in MMC yields 1 functional megaspore (other 3 degenerate). For 100 megaspores: 100 meiotic divisions.\n4. Total meiotic divisions = 25 + 100 = 125.\nHence, Option A is correct."
))

# Q39
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Ploidy Levels in Dicot Ovule",
    "If the diploid chromosome number of an angiosperm is 2n = 24, what will be the chromosome numbers in the endosperm, synergid, and nucellus respectively?",
    ["36, 12, 24", "24, 12, 36", "36, 24, 12", "12, 24, 36"],
    "A",
    "1. 2n = 24 implies haploid number n = 12.\n2. Endosperm is triploid (3n) = 3 * 12 = 36.\n3. Synergid is haploid (n) = 12.\n4. Nucellus is diploid maternal vegetative tissue (2n) = 24.\nHence, Option A (36, 12, 24) is correct."
))

# Q40
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Vallisneria Pollination Mechanism",
    "In Vallisneria (tape grass), pollination occurs when:",
    [
        "Female flowers reach the water surface by long stalks and passively floating pollen are carried by water currents to the stigma",
        "Pollen grains are released underwater and swim actively via flagella",
        "Insects dive underwater to reach sticky stigmas inside the submerged spathe",
        "Male flowers emerge into the air and wind blows dust onto submerged female flowers"
    ],
    "A",
    "1. In Vallisneria, the female flower reaches the surface of water by the long stalk.\n2. Pollen grains are released onto the surface of water. They are carried passively by water currents; some of them eventually reach the female flowers and the stigma.\nHence, Option A is correct."
))

# Q41-Q65: More flowering plants questions (variations on floral morphology, outbreeding, seed dispersal, etc.)
add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Ovule Attachment and Hilum",
    "The body of the ovule fuses with the funicle in the region called:",
    ["Hilum", "Micropyle", "Chalaza", "Integument"],
    "A",
    "1. The ovule is attached to the placenta by a stalk called funicle.\n2. The body of the ovule fuses with funicle in the region called hilum. Thus, hilum represents the junction between ovule and funicle.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Chalaza Definition",
    "Representing the basal part of the ovule opposite to the micropylar end is the:",
    ["Chalaza", "Funicle", "Hilum", "Raphe"],
    "A",
    "1. Opposite the micropylar end is the chalaza, representing the basal part of the ovule.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Zostera Marine Pollination",
    "In sea grasses such as Zostera, how are pollen grains adapted for sub-surface water pollination?",
    [
        "Pollen grains are long, ribbon-like, and lack exine sporopollenin, carried passively inside water",
        "Pollen grains have air bladders that make them float exclusively on surface film",
        "Pollen grains are coated with sticky nectar that attracts diving beetles",
        "Pollen grains possess active flagella for chemotactic swimming"
    ],
    "A",
    "1. In seagrasses like Zostera, female flowers remain submerged in water and pollen grains are released inside the water.\n2. Pollen grains in many such species are long, ribbon-like and they are carried passively inside the water; many have a mucilaginous covering protecting them from wetting.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Castor and Maize Monoecy",
    "Castor and maize plants are monoecious. What type of pollination does this condition prevent?",
    [
        "Prevents autogamy, but does not prevent geitonogamy",
        "Prevents geitonogamy, but does not prevent autogamy",
        "Prevents both autogamy and geitonogamy",
        "Prevents xenogamy completely"
    ],
    "A",
    "1. In castor and maize, unisexual male and female flowers are borne on the same plant (monoecious).\n2. This prevents autogamy (pollen from same flower cannot fall on stigma since flower is unisexual), but not geitonogamy (pollen from male flower can land on female flower of the same plant).\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Self-Incompatibility Mechanism",
    "Self-incompatibility in flowering plants is a:",
    [
        "Genetic mechanism that prevents self-pollen from fertilizing ovules by inhibiting pollen germination or pollen tube growth in the pistil",
        "Morphological barrier where style is too long for pollen tubes",
        "Physical closure of anther lobes preventing pollen release",
        "Enzymatic digestion of anthers by petal secretions"
    ],
    "A",
    "1. Self-incompatibility is a genetic mechanism and prevents self-pollen (from the same flower or other flowers of the same plant) from fertilizing the ovules by inhibiting pollen germination or pollen tube growth in the pistil.\nHence, Option A is correct."
))

# Save interim check
print(f"Added {len(questions)} flowering plant questions so far...")


# --- Continuing Flowering Plants (Q46 - Q65) ---

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Pollen Kit Function",
    "In insect-pollinated flowers, the pollen grains are commonly surrounded by a yellowish, sticky, lipid-rich layer called pollenkitt. Its primary role is:",
    ["Aiding adherence to the insect body and protecting pollen from UV damage", "Providing nutrition to the emerging pollen tube", "Dissolving the stigmatoid tissue during penetration", "Preventing self-pollination enzymatically"],
    "A",
    "1. Pollenkitt is a sticky, oily layer present on the exine of entomophilous (insect-pollinated) pollen grains.\n2. It helps the pollen grains stick to the body of insect visitors and protects against harmful ultraviolet radiation.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Inflorescence in Wind Pollination",
    "Corn cob tassels observed blowing in the wind represent:",
    ["Stigma and styles which wave in wind to trap pollen grains", "Clusters of feathery anthers shedding microspores", "Persistent bracts shielding developing ovules", "Petaloid filaments attracting foraging beetles"],
    "A",
    "1. The tassels seen on a corn cob are the stigma and style which wave in the wind to trap air-borne pollen grains.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Pollen Grain Cytoplasm Membrane",
    "The cytoplasm of the pollen grain is bounded by which structure inside the intine?",
    ["A plasma membrane", "A secondary lignified wall", "A suberin casing", "A calcium pectate sheath"],
    "A",
    "1. The cytoplasm of pollen grain is surrounded by a plasma membrane.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Generative Cell Features",
    "Which of the following describes the morphological characteristics of the generative cell within a pollen grain?",
    ["Small, spindle-shaped with dense cytoplasm and a distinct nucleus", "Large, spherical with abundant starch reserves and irregular nucleus", "Aflagellate amoeboid cell adhering to the exine", "Vacuolated discoid cell dividing meiotically"],
    "A",
    "1. The generative cell is small and floats in the cytoplasm of the vegetative cell. It is spindle-shaped with dense cytoplasm and a nucleus.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Central Cell Nuclei",
    "The large central cell of a mature embryo sac prior to triple fusion contains:",
    ["Two polar nuclei situated below the egg apparatus", "Three antipodal nuclei grouped together", "A single diploid secondary nucleus and two synergid nuclei", "One haploid egg nucleus and one male gamete"],
    "A",
    "1. The large central cell has two polar nuclei situated below the egg apparatus in the central cell.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Polygonum Type Embryo Sac",
    "The most common type of embryo sac development in angiosperms is monosporic Polygonum type. This development involves:",
    ["Single functional megaspore undergoing three successive mitotic divisions", "All four megaspores fusing to form an octanucleate coenocyte", "Two functional megaspores dividing twice mitotically", "A single megaspore dividing meiotically twice"],
    "A",
    "1. Monosporic Polygonum type development starts from a single functional megaspore which undergoes three successive free-nuclear mitotic divisions to form an 8-nucleate, 7-celled embryo sac.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Chasmogamous Flowers",
    "Unlike cleistogamous flowers, chasmogamous flowers are characterized by:",
    ["Exposed anthers and stigma that open at maturity", "Permanently closed petals throughout life", "Absence of any floral rewards or nectar", "Compulsory autogamy without genetic diversity"],
    "A",
    "1. Chasmogamous flowers are flowers which are similar to flowers of other species with exposed anthers and stigma that open at anthesis.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Bagging Technique in Plant Breeding",
    "During artificial hybridization, the emasculated flower bud is covered with a bag of suitable size (usually made of butter paper) to:",
    ["Prevent contamination of its stigma with unwanted pollen", "Increase the humidity for rapid ovule development", "Prevent herbivores from eating the flower petals", "Accelerate the dehiscence of neighboring anthers"],
    "A",
    "1. Emasculated flowers have to be covered with a bag of suitable size, generally made up of butter paper, to prevent contamination of its stigma with unwanted pollen. This process is called bagging.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Triple Fusion Ploidy",
    "Triple fusion involves the fusion of three haploid nuclei resulting in the formation of:",
    ["Triploid Primary Endosperm Nucleus (3n)", "Diploid zygotic nucleus (2n)", "Tetraploid perisperm mass (4n)", "Haploid vegetative nucleus (n)"],
    "A",
    "1. Triple fusion involves the fusion of one haploid male gamete (n) with two haploid polar nuclei (n + n) in the central cell, giving rise to the triploid Primary Endosperm Nucleus (PEN, 3n).\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Dicot Embryo Cotyledon Number",
    "A typical dicotyledonous embryo consists of an embryonal axis and:",
    ["Two cotyledons", "One lateral scutellum", "A single terminal coleoptile", "Three leafy cotyledons"],
    "A",
    "1. A typical dicotyledonous embryo consists of an embryonal axis and two cotyledons.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Epicotyl Termination",
    "The portion of embryonal axis above the level of cotyledons is the epicotyl, which terminates at the:",
    ["Plumule or stem tip", "Radicle or root tip", "Root cap (calyptra)", "Coleorhiza sheath"],
    "A",
    "1. The portion of embryonal axis above the level of cotyledons is the epicotyl, which terminates with the plumule or stem tip.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Hypocotyl Termination",
    "The cylindrical portion below the level of cotyledons is hypocotyl that terminates at its lower end in the:",
    ["Radicle or root tip", "Plumule or shoot tip", "Scutellum attachment point", "Epiblast flap"],
    "A",
    "1. The cylindrical portion below the level of cotyledons is hypocotyl that terminates at its lower end in the radicle or root tip, which is covered with a root cap.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Pericarp Layers",
    "The wall of the ovary develops into the wall of fruit called pericarp. In fleshy fruits like mango, pericarp is differentiated into:",
    ["Outer epicarp, middle mesocarp, and inner endocarp", "Outer exine and inner intine", "Outer testa and inner tegmen", "Outer perisperm and inner endosperm"],
    "A",
    "1. In fleshy fruits like mango and peach, pericarp is differentiated into outer epicarp, middle fleshy edible mesocarp, and inner stony hard endocarp.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Non-Albuminous Seeds Example",
    "Which of the following sets of seeds completely lacks residual endosperm at seed maturity?",
    ["Bean, Gram, and Pea", "Wheat, Maize, and Barley", "Castor, Sunflower, and Cotton", "Coconut, Onion, and Rice"],
    "A",
    "1. Non-albuminous seeds have no residual endosperm as it is completely consumed during embryo development (e.g., pea, groundnut, bean, gram).\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Micropyle in Seed Germination",
    "In a mature dry seed, the micropyle remains as a small pore in the seed coat to facilitate:",
    ["Entry of water and oxygen during germination", "Exit of stored cotyledon lipids", "Direct photosynthesis by the dormant hypocotyl", "Entry of symbiotic mycorrhizal fungi"],
    "A",
    "1. The micropyle remains as a small pore in the seed coat. This facilitates entry of oxygen and water into the seed during germination.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Seed Dormancy State",
    "As the seed matures, its water content is reduced and seeds become relatively dry (10-15% moisture by mass). The embryo enters a state of metabolic inactivity called:",
    ["Dormancy", "Senescence", "Abscission", "Vernalization"],
    "A",
    "1. The general metabolic activity of the embryo slows down. The embryo may enter a state of inactivity called dormancy.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "King Herod Palace Date Palm Seed",
    "A viable date palm seed excavated from King Herod's palace near the Dead Sea germinated after a dormancy period of approximately:",
    ["2000 years (Phoenix dactylifera)", "10000 years (Lupinus arcticus)", "500 years (Nelumbo nucifera)", "100 years (Triticum aestivum)"],
    "A",
    "1. A recent record of 2000 years old viable seed is of the date palm, Phoenix dactylifera, discovered during the archeological excavation at King Herod's palace near the Dead Sea.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Hybrid Seed Disadvantage and Apomixis Solution",
    "Why must farmers purchase hybrid seeds every year, and how can apomixis resolve this problem?",
    [
        "Hybrid progeny segregate characters if selfed; introducing apomictic genes prevents segregation in progeny",
        "Hybrid seeds become sterile due to polyploidy; apomixis restores diploid meiotic vigor",
        "Hybrid embryos lack endosperm; apomixis triggers parthenocarpic fruit swelling",
        "Hybrid seeds rot rapidly in storage; apomixis thickens the seed coat"
    ],
    "A",
    "1. If seeds collected from hybrids are sown, the plants in the progeny will segregate and lose hybrid vigor. Thus, hybrid seeds must be produced every year.\n2. If these hybrids are made into apomicts, there is no segregation of characters in the hybrid progeny, enabling farmers to keep using seeds year after year.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Hydrophilous Marine Pollen Feature",
    "Why are pollen grains of sea-grasses like Zostera not damaged by wetting while submerged in ocean water?",
    ["They possess a protective mucilaginous covering", "Their walls are reinforced with chitin and cellulose", "They secrete hydrophobic waxes from vegetative nuclei", "They lack cell membranes and consist of dry proteins"],
    "A",
    "1. In most of the water-pollinated species, pollen grains are protected from wetting by a mucilaginous covering.\nHence, Option A is correct."
))

add(make_question(
    "Sexual Reproduction in Flowering Plants",
    "Cleistogamous Inbreeding Consequence",
    "What is the significant genetic disadvantage associated with continuous cleistogamy in plant populations?",
    ["Complete absence of genetic recombination leading to severe inbreeding depression", "Inability to produce seeds under pollinator scarcity", "Production of polyploid offspring with reduced fertility", "Frequent mutation in pollen wall sporopollenin genes"],
    "A",
    "1. Cleistogamous flowers never open and are strictly autogamous. Continued self-pollination leads to lack of genetic variations and results in inbreeding depression.\nHence, Option A is correct."
))

print(f"Flowering plants completed: {len(questions)} questions!")


# =========================================================================
# SECTION 2: Human Reproduction (55 Questions, Q66 - Q120)
# =========================================================================

add(make_question(
    "Human Reproduction",
    "Scrotum Thermoregulation",
    "In human males, the testes are situated outside the abdominal cavity within a pouch called the scrotum because:",
    ["It maintains a temperature 2-2.5°C lower than internal body temperature, essential for spermatogenesis", "It shields testes from abdominal peristaltic pressure", "It allows direct cooling by atmospheric air during micturition", "It prevents immune cells from recognizing Leydig cells"],
    "A",
    "1. The testes are situated outside the abdominal cavity within a pouch called scrotum.\n2. The scrotum helps in maintaining the low temperature of the testes (2–2.5°C lower than the normal internal body temperature) necessary for spermatogenesis.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Testicular Compartments",
    "Each human testis contains approximately how many testicular lobules, and how many seminiferous tubules are found in each lobule?",
    ["About 250 testicular lobules; each containing 1 to 3 highly coiled seminiferous tubules", "About 500 lobules; each containing 10 straight tubules", "About 100 lobules; each containing 5 to 7 tubules", "About 50 lobules; each containing 1 coiled tubule"],
    "A",
    "1. Each testis has about 250 compartments called testicular lobules.\n2. Each lobule contains one to three highly coiled seminiferous tubules in which sperms are produced.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Seminiferous Tubule Cell Types",
    "Each seminiferous tubule is lined on its inside by two types of cells named:",
    ["Male germ cells (spermatogonia) and Sertoli cells", "Leydig cells and interstitial macrophages", "Granulosa cells and theca cells", "Follicular cells and corpus luteum cells"],
    "A",
    "1. Each seminiferous tubule is lined on its inside by two types of cells called male germ cells (spermatogonia) and Sertoli cells.\n2. The male germ cells undergo meiotic divisions leading to sperm formation, while Sertoli cells provide nutrition to the germ cells.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Leydig Cells Function",
    "The regions outside the seminiferous tubules called interstitial spaces contain small blood vessels and Leydig cells. These cells synthesize and secrete:",
    ["Testicular hormones called androgens (testosterone)", "Gonadotropin releasing hormone (GnRH)", "Follicle stimulating hormone (FSH)", "Inhibin and Mullerian inhibiting factor"],
    "A",
    "1. Interstitial cells or Leydig cells are present in the interstitial spaces.\n2. Leydig cells synthesize and secrete testicular hormones called androgens (primarily testosterone).\nHence, Option A is correct."
))

add(make_sequence_question(
    "Human Reproduction",
    "Male Accessory Duct Pathway",
    "Arrange the male sex accessory ducts in the correct sequential order of sperm transport from seminiferous tubules to outside:",
    [
        "Rete testis",
        "Vasa efferentia",
        "Epididymis",
        "Vas deferens",
        "Ejaculatory duct and Urethra"
    ],
    [
        "(A) -> (B) -> (C) -> (D) -> (E)",
        "(B) -> (A) -> (C) -> (D) -> (E)",
        "(A) -> (C) -> (B) -> (D) -> (E)",
        "(C) -> (A) -> (B) -> (D) -> (E)"
    ],
    "A",
    "1. The seminiferous tubules of the testis open into the vasa efferentia through rete testis (A).\n2. The vasa efferentia leave the testis and open into epididymis (B).\n3. The epididymis leads to vas deferens (C, D).\n4. Vas deferens joins the duct from seminal vesicle to form ejaculatory duct opening into urethra (E).\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Male Accessory Glands Secretion",
    "The seminal plasma in human males is alkaline and rich in which of the following substances?",
    ["Fructose, calcium, and certain enzymes", "Glucose, sodium, and hydrochloric acid", "Glycogen, potassium, and pepsinogen", "Lactose, iron, and bile salts"],
    "A",
    "1. The male accessory glands comprise paired seminal vesicles, a prostate, and paired bulbourethral glands.\n2. Secretions of these glands constitute the seminal plasma which is rich in fructose, calcium, and certain enzymes.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Bulbourethral Gland Function",
    "What specific contribution is made by the secretions of the bulbourethral (Cowper's) glands during male sexual excitement?",
    ["Secreting alkaline mucus that aids in the lubrication of the penis", "Synthesizing fructose to supply ATP for sperm tail beating", "Secreting testosterone to stimulate spermatogenesis", "Enclosing sperms within gelatinous spermatophores"],
    "A",
    "1. Secretions of bulbourethral glands also help in the lubrication of the penis prior to copulation.\nHence, Option A is correct."
))

add(make_sequence_question(
    "Human Reproduction",
    "Spermatogenesis Ploidy Order",
    "Arrange the following germ cell stages of spermatogenesis in the correct developmental sequence from basement membrane to lumen:",
    [
        "Spermatogonia (2n)",
        "Primary spermatocytes (2n)",
        "Secondary spermatocytes (n)",
        "Spermatids (n)",
        "Spermatozoa (n)"
    ],
    [
        "(A) -> (B) -> (C) -> (D) -> (E)",
        "(A) -> (C) -> (B) -> (D) -> (E)",
        "(B) -> (A) -> (C) -> (D) -> (E)",
        "(A) -> (B) -> (D) -> (C) -> (E)"
    ],
    "A",
    "1. Spermatogonia (2n) multiply by mitosis (A).\n2. Some spermatogonia periodically undergo meiosis as primary spermatocytes (2n) (B).\n3. Meiosis I yields two equal haploid secondary spermatocytes (n) (C).\n4. Meiosis II yields four haploid spermatids (n) (D).\n5. Spermatids transform into spermatozoa (n) via spermiogenesis (E).\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Spermiogenesis vs Spermiation",
    "The transformation of non-motile spermatids into motile spermatozoa is termed spermiogenesis, whereas the release of mature sperms from Sertoli cells into the lumen is called:",
    ["Spermiation", "Insemination", "Capacitation", "Ejaculation"],
    "A",
    "1. The spermatids are transformed into spermatozoa by the process called spermiogenesis.\n2. After spermiogenesis, sperm heads become embedded in the Sertoli cells, and are finally released from the seminiferous tubules by the process called spermiation.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Hormonal Regulation of Spermatogenesis",
    "Luteinizing Hormone (LH) and Follicle Stimulating Hormone (FSH) in males act respectively on which target cells?",
    ["Leydig cells and Sertoli cells", "Sertoli cells and Leydig cells", "Spermatogonia and epididymis", "Prostate and seminal vesicles"],
    "A",
    "1. LH acts at the Leydig cells and stimulates synthesis and secretion of androgens.\n2. FSH acts on the Sertoli cells and stimulates secretion of some factors which help in the process of spermiogenesis.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Sperm Middle Piece Organelle",
    "The middle piece of a human sperm contains numerous spiral arrangements of which organelle, providing energy for sperm tail motility?",
    ["Mitochondria", "Golgi bodies", "Lysosomes", "Centrosomes"],
    "A",
    "1. The middle piece possesses numerous mitochondria, which produce energy for the movement of tail that facilitate sperm motility essential for fertilization.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Sperm Acrosome Origin",
    "The anterior cap-like structure of the sperm head, known as the acrosome, is derived from which cellular organelle and contains what key components?",
    ["Derived from Golgi apparatus; contains hydrolytic sperm lysins (hyaluronidase)", "Derived from mitochondria; contains ATP synthases", "Derived from rough ER; contains ribosomal subunits", "Derived from nucleus; contains condensed histones"],
    "A",
    "1. The acrosome is filled with enzymes that help in fertilizing the ovum (sperm lysins, hyaluronidase).\n2. It represents a modified lysosome/secretory vesicle derived from the Golgi complex of the spermatid.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Sperm Ejaculation Motility Norms",
    "For normal human male fertility, out of the 200 to 300 million sperms ejaculated during coitus, what proportion must exhibit normal shape and vigorous motility respectively according to NCERT?",
    [
        "At least 60% must have normal shape and size, and at least 40% of them must show vigorous motility",
        "At least 80% normal shape, and 20% vigorous motility",
        "At least 50% normal shape, and 50% vigorous motility",
        "At least 40% normal shape, and 60% vigorous motility"
    ],
    "A",
    "1. The human male ejaculates about 200 to 300 million sperms during a coitus.\n2. For normal fertility, at least 60 per cent sperms must have normal shape and size and at least 40 per cent of them must show vigorous motility.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Fallopian Tube Parts",
    "The fallopian tube (oviduct) consists of three parts. What is the funnel-shaped part closest to the ovary that possesses finger-like fimbriae?",
    ["Infundibulum", "Ampulla", "Isthmus", "Cervix"],
    "A",
    "1. The part closer to the ovary is the funnel-shaped infundibulum.\n2. The edges of the infundibulum possess finger-like projections called fimbriae, which help in collection of the ovum after ovulation.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Site of Fertilization",
    "In the human female reproductive tract, fertilization of the ovum by sperm typically occurs at which anatomical site?",
    ["Ampullary region of the fallopian tube", "Infundibulum", "Uterine cavity (fundus)", "Internal os of the cervix"],
    "A",
    "1. The infundibulum leads to a wider part of the oviduct called ampulla.\n2. Fertilization takes place at the ampullary region of the fallopian tube.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Uterine Wall Layers",
    "The middle thick layer of smooth muscle in the uterine wall that exhibits strong contractions during delivery of the baby is called the:",
    ["Myometrium", "Endometrium", "Perimetrium", "Epimetrium"],
    "A",
    "1. The wall of the uterus has three layers of tissue: outer perimetrium, middle thick smooth muscular myometrium, and inner glandular endometrium.\n2. The myometrium exhibits strong contractions during delivery of the baby.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Oogenesis Initiation Timing",
    "Unlike spermatogenesis which begins at puberty, oogenesis in human females is initiated:",
    ["During embryonic development stages in the female fetus", "At menarche (first menstrual cycle)", "Immediately after birth in neonatal life", "During the fourth month after menarche"],
    "A",
    "1. The process of oogenesis is initiated during the embryonic development stage when a couple of million gamete mother cells (oogonia) are formed within each fetal ovary; no more oogonia are formed and added after birth.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Primary Follicle Atresia",
    "At puberty, how many primary follicles remain in each human ovary due to follicular atresia during childhood?",
    ["60,000 to 80,000 primary follicles", "200,000 to 300,000 primary follicles", "1 million primary follicles", "Only 400 primary follicles"],
    "A",
    "1. A large number of follicles degenerate during the phase from birth to puberty.\n2. Therefore, at puberty, only 60,000–80,000 primary follicles are left in each ovary.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Tertiary Follicle Diagnostic Cavity",
    "The tertiary follicle in the ovary is characterized by the presence of a fluid-filled cavity called the:",
    ["Antrum", "Blastocoel", "Archenteron", "Zona pellucida"],
    "A",
    "1. The tertiary follicle is characterized by a fluid-filled cavity called antrum.\n2. The theca layer is organized into an inner theca interna and an outer theca externa.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Ovulated Cell Stage",
    "At the time of ovulation triggered by the mid-cycle LH surge, the cell released from the Graafian follicle is actually a:",
    [
        "Secondary oocyte arrested at Metaphase II of Meiosis II",
        "Fully mature haploid ovum with second polar body extruded",
        "Diploid primary oocyte arrested at Prophase I",
        "Fertilized diploid zygote"
    ],
    "A",
    "1. The primary oocyte within the tertiary follicle completes its first meiotic division, producing a large haploid secondary oocyte and a tiny first polar body.\n2. The secondary oocyte begins Meiosis II but is arrested at Metaphase II. It is released at ovulation in this secondary oocyte stage.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "LH Surge and Ovulation Timing",
    "During a standard 28-day human menstrual cycle, the rapid secretion of LH leading to its maximum level (LH surge) occurs around:",
    ["Day 14 (mid-cycle)", "Day 1 (onset of menses)", "Day 5 (end of menses)", "Day 25 (late luteal phase)"],
    "A",
    "1. Both LH and FSH attain a peak level in the middle of the cycle (about the 14th day).\n2. Rapid secretion of LH leading to its maximum level mid-cycle called LH surge induces rupture of Graafian follicle and thereby the release of ovum (ovulation).\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Corpus Luteum Hormone",
    "After ovulation, the ruptured Graafian follicle transforms into a yellow endocrine structure called the corpus luteum, which secretes large amounts of:",
    ["Progesterone", "Estrogen exclusively", "Luteinizing hormone", "Human chorionic gonadotropin"],
    "A",
    "1. The corpus luteum secretes large amounts of progesterone which is essential for maintenance of the endometrium.\n2. Such an endometrium is necessary for implantation of the fertilized ovum and other events of pregnancy.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Corpus Luteum Degeneration and Menstruation",
    "In the absence of fertilization, the corpus luteum degenerates into corpus albicans. This causes:",
    ["A sharp drop in progesterone levels causing disintegration of the endometrium and menstruation", "A surge in hCG stimulating milk ejection", "Immediate thickening of the myometrium", "Prolongation of the secretory phase indefinitely"],
    "A",
    "1. In the absence of fertilization, the corpus luteum degenerates.\n2. This causes disintegration of the endometrium leading to menstruation, marking a new cycle.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Polyspermy Prevention Mechanism",
    "During fertilization, when a sperm comes in contact with the zona pellucida of the ovum, it induces changes in the membrane that:",
    ["Block the entry of additional sperms, ensuring that only one sperm can fertilize the ovum", "Attract multiple sperms to enter simultaneously for polyploidy", "Dissolve the plasma membrane of the secondary oocyte", "Release chorionic gonadotropin into the fallopian tube"],
    "A",
    "1. The sperm comes in contact with the zona pellucida layer of the ovum and induces changes in the membrane that block the entry of additional sperms.\n2. Thus, it ensures that only one sperm can fertilize an ovum (prevention of polyspermy).\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Meiosis II Completion Trigger in Oocyte",
    "What physiological event triggers the secondary oocyte to complete Meiosis II, yielding the second polar body and the haploid ootid (ovum)?",
    ["The entry of the sperm into the cytoplasm of the secondary oocyte", "The mid-cycle LH surge in the ovary", "Binding of progesterone to uterine receptors", "Implantation of the blastocyst in endometrium"],
    "A",
    "1. The entry of sperm induces the completion of the meiotic division of the secondary oocyte.\n2. The second meiotic division is also unequal and results in the formation of a second polar body and a haploid ovum (ootid).\nHence, Option A is correct."
))

add(make_match_question(
    "Human Reproduction",
    "Menstrual Cycle Phases & Hormonal Events",
    "Match List I (Menstrual Cycle Phase) with List II (Primary Hormonal/Structural Event):",
    [
        ("(A)", "Menstrual phase (Days 1-5)"),
        ("(B)", "Follicular phase (Days 6-13)"),
        ("(C)", "Ovulatory phase (Day 14)"),
        ("(D)", "Luteal phase (Days 15-28)")
    ],
    [
        ("(I)", "LH surge triggers rupture of Graafian follicle"),
        ("(II)", "Progesterone secreted in large amounts by corpus luteum"),
        ("(III)", "Regeneration and proliferation of endometrium under estrogen"),
        ("(IV)", "Breakdown of endometrial lining due to drop in progesterone")
    ],
    [
        "(A)-(IV), (B)-(III), (C)-(I), (D)-(II)",
        "(A)-(III), (B)-(IV), (C)-(I), (D)-(II)",
        "(A)-(IV), (B)-(I), (C)-(III), (D)-(II)",
        "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)"
    ],
    "A",
    "1. Menstrual phase: endometrial breakdown due to low progesterone (A -> IV).\n2. Follicular phase: estrogen from growing follicles stimulates endometrial proliferation (B -> III).\n3. Ovulatory phase: LH surge triggers ovulation (C -> I).\n4. Luteal phase: corpus luteum produces abundant progesterone (D -> II).\nHence, Option A is correct."
))

add(make_sequence_question(
    "Human Reproduction",
    "Early Embryonic Development Order",
    "Arrange the following developmental stages of the human embryo in correct chronological sequence:",
    [
        "Zygote",
        "Morula (8 to 16 blastomeres)",
        "Blastocyst",
        "Implantation in uterine endometrium",
        "Gastrula with three germ layers"
    ],
    [
        "(A) -> (B) -> (C) -> (D) -> (E)",
        "(A) -> (C) -> (B) -> (D) -> (E)",
        "(B) -> (A) -> (C) -> (D) -> (E)",
        "(A) -> (B) -> (D) -> (C) -> (E)"
    ],
    "A",
    "1. Zygote undergoes cleavage to form morula (A -> B).\n2. Morula continues to divide and transforms into blastocyst (B -> C).\n3. Blastocyst attaches to endometrium (implantation) (C -> D).\n4. Differentiates into three germ layers during gastrulation (D -> E).\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Blastocyst Structure",
    "In the blastocyst, the blastomeres are arranged into an outer layer called trophoblast and an inner group of cells called the:",
    ["Inner cell mass", "Corona radiata", "Zona pellucida", "Theca interna"],
    "A",
    "1. The blastomeres in the blastocyst are arranged into an outer layer called trophoblast and an inner group of cells attached to trophoblast called the inner cell mass.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Implantation Mechanism",
    "During implantation, which embryonic layer attaches directly to the uterine endometrium?",
    ["Trophoblast", "Inner cell mass", "Zona pellucida", "Corona radiata"],
    "A",
    "1. The trophoblast layer gets attached to the endometrium and the inner cell mass gets differentiated as the embryo.\n2. After attachment, the uterine cells divide rapidly and cover the blastocyst. This is called implantation.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Pregnancy Specific Hormones",
    "Which of the following hormones are produced in women only during pregnancy?",
    [
        "Human chorionic gonadotropin (hCG), human placental lactogen (hPL), and relaxin",
        "Estrogen, progesterone, and prolactin",
        "Oxytocin, vasopressin, and LH",
        "Thyroxine, cortisol, and aldosterone"
    ],
    "A",
    "1. hCG, hPL, and relaxin are produced in women only during pregnancy.\n2. Note: relaxin is secreted by the ovary in the later phases of pregnancy, while hCG and hPL are placental hormones.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Stem Cells in Embryo",
    "The inner cell mass of the blastocyst contains certain cells called stem cells which possess which remarkable property?",
    [
        "The potency to give rise to all tissues and organs of the adult body",
        "The ability to produce antibodies against maternal blood cells",
        "The capacity to degrade the uterine myometrium enzymatically",
        "The ability to divide indefinitely without requiring glucose"
    ],
    "A",
    "1. The inner cell mass contains certain cells called stem cells which have the potency to give rise to all the tissues and organs.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "First Trimester Fetal Milestone",
    "By the end of the first trimester (12 weeks) of human embryonic development, what major milestones are accomplished?",
    [
        "Most of the major organ systems are formed, including limbs and external genital organs",
        "The heart begins to beat and eye-lashes form",
        "First movements of the fetus and appearance of head hair",
        "Body is covered with fine hair and eye-lids separate"
    ],
    "A",
    "1. By the end of 12 weeks (first trimester), most of the major organ systems are formed; for example, the limbs and external genital organs are well-developed.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Fifth Month Fetal Milestone",
    "The first movements of the fetus and appearance of hair on the head are usually observed during which month of pregnancy?",
    ["Fifth month", "Second month", "Third month", "Eighth month"],
    "A",
    "1. The first movements of the fetus and appearance of hair on the head are usually observed during the fifth month.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Parturition Neuroendocrine Mechanism",
    "Parturition is induced by a complex neuroendocrine mechanism initiated by signals originating from:",
    ["The fully developed fetus and the placenta (fetal ejection reflex)", "Maternal ovary producing massive progesterone pulses", "The amniotic fluid pressure receptors exclusively", "Maternal thyroid gland secreting calcitonin"],
    "A",
    "1. The signals for parturition originate from the fully developed fetus and the placenta which induce mild uterine contractions called fetal ejection reflex.\n2. This triggers release of oxytocin from the maternal pituitary.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Oxytocin Target in Parturition",
    "Oxytocin released from the maternal pituitary during parturition acts directly on which tissue to stimulate vigorous contractions?",
    ["Uterine myometrium", "Uterine endometrium", "Cervical mucous plug", "Umbilical cord arteries"],
    "A",
    "1. Oxytocin acts on the uterine muscle (myometrium) and causes stronger uterine contractions, which in turn stimulates further secretion of oxytocin via positive feedback.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Colostrum Antibody Content",
    "The yellowish milk produced during the initial few days of lactation is called colostrum. It is abundant in which antibody that confers passive immunity to the newborn?",
    ["IgA", "IgG", "IgE", "IgM"],
    "A",
    "1. The milk produced during the initial few days of lactation is called colostrum which contains several antibodies (especially IgA) absolutely essential to develop resistance for the new-born babies.\nHence, Option A is correct."
))

add(make_statement_question(
    "Human Reproduction",
    "Fetal Ejection Reflex Statements",
    "Fetal ejection reflex induces the release of oxytocin from the maternal posterior pituitary gland.",
    "Oxytocin causes stronger uterine contractions which further stimulates oxytocin release via positive feedback.",
    "A",
    "1. Fetal ejection reflex triggers release of oxytocin from the maternal pituitary.\n2. Oxytocin causes stronger contractions, stimulating further oxytocin secretion via positive feedback until parturition is completed.\nBoth statements are correct according to NCERT. Option A is correct."
))

add(make_assertion_question(
    "Human Reproduction",
    "Sex of Baby Determination",
    "Scientifically, the sex of the human baby is determined by the father and not by the mother.",
    "Human males produce two types of sperms (50% with X chromosome and 50% with Y chromosome), whereas females produce only X-bearing ova.",
    "A",
    "1. Females are homogametic (XX) producing only X-type ova.\n2. Males are heterogametic (XY) producing 50% X and 50% Y sperms.\n3. The sperm fertilizing the ovum dictates whether the zygote is XX (female) or XY (male).\n4. Reason is the correct explanation for Assertion. Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Sperm Tail Motility Fuel",
    "Which sugar present abundantly in seminal vesicle secretions serves as the respiratory fuel for ATP production in sperm mitochondria?",
    ["Fructose", "Glucose", "Sucrose", "Ribose"],
    "A",
    "1. Seminal vesicle secretions contain fructose which acts as the specific respiratory nutrient metabolized by sperm mitochondria to generate ATP for tail motility.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Rete Testis Anatomical Location",
    "The seminiferous tubules of the human testis open into the vasa efferentia through a network of tubules known as:",
    ["Rete testis", "Epididymis", "Vasa deferentia", "Ductus ejaculatorius"],
    "A",
    "1. The seminiferous tubules of the testis open into the vasa efferentia through rete testis.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Epididymis Sperm Maturation",
    "The male accessory duct that is a tightly coiled tubule located along the posterior surface of each testis where sperms acquire physiological maturity and motility is the:",
    ["Epididymis", "Vas deferens", "Rete testis", "Ejaculatory duct"],
    "A",
    "1. The vasa efferentia leave the testis and open into epididymis located along the posterior surface of each testis where sperms undergo storage and maturation.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Vasectomy and Ejaculation",
    "A man who undergoes a successful vasectomy continues to ejaculate during climax. The ejaculate of a vasectomized man consists of:",
    ["Normal seminal plasma secreted by accessory glands, but completely devoid of spermatozoa", "Clear water without any proteins or enzymes", "Urine mixed with prostatic fluid", "Sperms with damaged flagella unable to swim"],
    "A",
    "1. In vasectomy, a small part of the vas deferens is removed or tied up. It blocks sperm transport from testes.\n2. However, the accessory glands (seminal vesicles, prostate, bulbourethral) still secrete seminal plasma.\n3. Hence, the ejaculate contains normal volume of seminal fluid but lacks sperms.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Corona Radiata Location",
    "The layer of cells derived from granulosa that radially surrounds the unfertilized secondary oocyte outside the zona pellucida is the:",
    ["Corona radiata", "Theca externa", "Theca interna", "Perivitelline space"],
    "A",
    "1. The secondary oocyte is surrounded by an acellular zona pellucida and an outer radially arranged layer of follicular cells called corona radiata.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Perivitelline Space",
    "The narrow fluid-filled space located between the plasma membrane of the ovum and the zona pellucida is called the:",
    ["Perivitelline space", "Antrum", "Blastocoel", "Archenteron"],
    "A",
    "1. The space between the vitelline membrane (plasma membrane of the ovum) and the zona pellucida is the perivitelline space, into which the first polar body is extruded.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Morula Cell Number",
    "The embryo with 8 to 16 blastomeres resulting from consecutive cleavage divisions of the zygote is called a:",
    ["Morula", "Blastocyst", "Gastrula", "Trophoblast"],
    "A",
    "1. The embryo with 8 to 16 blastomeres is called a morula.\n2. The morula continues to divide and transforms into blastocyst as it moves further into the uterus.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Placenta Definition",
    "The structural and functional unit established between the developing embryo (fetus) and maternal body is the:",
    ["Placenta", "Amnion", "Allantois", "Yolk sac"],
    "A",
    "1. The chorionic villi and uterine tissue become interdigitated with each other and jointly form a structural and functional unit between developing embryo and maternal body called placenta.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Relaxin Hormone Secretion Source",
    "In pregnant women, the hormone relaxin is secreted in the later stages of pregnancy primarily by the:",
    ["Ovary", "Placenta", "Pituitary gland", "Adrenal cortex"],
    "A",
    "1. In the later phase of pregnancy, a hormone called relaxin is also secreted by the ovary.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Second Month Embryo Milestone",
    "In human pregnancy, by the end of the second month of pregnancy (8 weeks), the fetus develops:",
    ["Limbs and digits", "Heart", "Separated eyelids", "Vocal cords"],
    "A",
    "1. In human beings, after one month of pregnancy, the embryo's heart is formed.\n2. By the end of the second month of pregnancy, the fetus develops limbs and digits.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Sixth Month Embryo Milestone",
    "By the end of 24 weeks (end of second trimester), what distinctive features are observed in the human fetus?",
    [
        "Body is covered with fine hair, eye-lids separate, and eye lashes are formed",
        "Heart beats for the first time",
        "External genitalia first appear",
        "The kidneys begin filtering bile pigments"
    ],
    "A",
    "1. By the end of 24 weeks (end of second trimester), the body is covered with fine hair, eye-lids separate, and eye lashes are formed.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Mammary Glands Alveoli Secretion",
    "The cells of the mammary glands that secrete milk into the lumen (cavities) are organized in clusters called:",
    ["Alveoli", "Lactiferous sinuses", "Ampullary ducts", "Areolar follicles"],
    "A",
    "1. The glandular tissue of each breast is divided into 15-20 mammary lobes containing clusters of cells called alveoli.\n2. The cells of alveoli secrete milk, which is stored in the cavities (lumens) of alveoli.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Milk Ejection Hormone",
    "While milk synthesis in mammary alveoli is stimulated by prolactin, the ejection (let-down) of milk during suckling is stimulated by:",
    ["Oxytocin", "Estrogen", "Progesterone", "Human placental lactogen"],
    "A",
    "1. Prolactin stimulates milk secretion and synthesis.\n2. Oxytocin stimulates the contraction of myoepithelial cells around alveoli, causing milk ejection.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "First Menstruation Term",
    "The first menstruation that begins at puberty in human females is termed:",
    ["Menarche", "Menopause", "Amenorrhea", "Dysmenorrhea"],
    "A",
    "1. The first menstruation begins at puberty and is called menarche.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Menopause Age Range",
    "In human females, menstrual cycles cease around 50 years of age. This permanent cessation of menstruation is termed:",
    ["Menopause", "Menarche", "Atresia", "Andropause"],
    "A",
    "1. In human beings, menstrual cycles cease around 50 years of age; that is termed as menopause.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Infundibulum Fimbriae Function",
    "The finger-like projections present at the edges of the infundibulum perform which vital reproductive function?",
    ["Collecting the ovum released from the ovary after ovulation", "Secreting progesterone to nourish the sperm", "Propelling sperms towards the ovarian cortex", "Preventing blastocyst implantation in the tube"],
    "A",
    "1. The edges of the infundibulum possess finger-like projections called fimbriae, which help in collection of the ovum after ovulation.\nHence, Option A is correct."
))

add(make_question(
    "Human Reproduction",
    "Placental Endocrine Role",
    "Besides facilitating the supply of oxygen and nutrients to the embryo, the placenta acts as an endocrine tissue producing which group of hormones?",
    [
        "hCG, hPL, estrogens, and progestogens",
        "GnRH, LH, FSH, and prolactin",
        "Oxytocin, vasopressin, and insulin",
        "Calcitonin, parathormone, and aldosterone"
    ],
    "A",
    "1. Placenta also acts as an endocrine tissue and produces several hormones like human chorionic gonadotropin (hCG), human placental lactogen (hPL), estrogens, progestogens, etc.\nHence, Option A is correct."
))

print(f"Human reproduction completed: total questions now {len(questions)}!")

# =========================================================================
# SECTION 3: Reproductive Health (30 Questions, Q121 - Q150)
# =========================================================================

add(make_question(
    "Reproductive Health",
    "Amniocentesis Statutory Ban",
    "Why has a statutory ban been imposed on amniocentesis in India?",
    [
        "To legally curb and prevent female foeticide resulting from prenatal sex determination",
        "Because the amniotic fluid causes fatal allergic shock in mothers",
        "Because it is completely incapable of detecting any chromosomal abnormalities",
        "Because it triggers premature labour in 100% of pregnancies"
    ],
    "A",
    "1. A statutory ban on amniocentesis for sex-determination legally checks increasing menace of female foeticide.\n2. Amniocentesis is a fetal sex determination and disorder test based on the chromosomal pattern in the amniotic fluid surrounding the developing embryo.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "Saheli Oral Contraceptive",
    "Which of the following statements correctly describes 'Saheli', the oral contraceptive pill developed in India?",
    [
        "It is a non-steroidal preparation taken once-a-week with high contraceptive value and very few side effects, developed by CDRI Lucknow",
        "It is a high-dose daily progesterone-estrogen steroid pill",
        "It is an injectable implant placed under the skin every 5 years",
        "It is a spermicidal vaginal foam used immediately before coitus"
    ],
    "A",
    "1. 'Saheli' – a new oral contraceptive for females – contains a non-steroidal preparation (centchroman).\n2. It is a 'once a week' pill with very few side effects and high contraceptive value. It was developed by scientists at Central Drug Research Institute (CDRI) in Lucknow.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "Periodic Abstinence Fertile Period",
    "Periodic abstinence is a natural contraceptive method wherein couples avoid or abstain from coitus from which days of the menstrual cycle when ovulation could be expected?",
    ["Day 10 to 17 of menstrual cycle", "Day 1 to 5 of menstrual cycle", "Day 21 to 28 of menstrual cycle", "Day 24 to 28 of menstrual cycle"],
    "A",
    "1. Periodic abstinence is one such method in which the couples avoid or abstain from coitus from day 10 to 17 of the menstrual cycle when ovulation could be expected.\n2. As chances of fertilization are very high during this period, it is called the fertile period.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "Lactational Amenorrhea Duration",
    "Lactational amenorrhea (absence of menstruation during intense lactation) is effective as a natural contraceptive method up to a maximum period of:",
    ["Nearly 6 months following parturition", "24 months following parturition", "1 month following parturition", "Indefinitely until weaning"],
    "A",
    "1. This method is based on the fact that ovulation does not occur during the period of intense lactation following parturition.\n2. Therefore, as long as the mother breast-feeds the child fully, chances of conception are almost nil. However, this method has been reported to be effective only up to a maximum period of six months following parturition.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "Barrier Methods Dual Benefit",
    "Condoms provide a dual advantage in reproductive health because:",
    [
        "They prevent pregnancy by blocking sperm deposition in the cervix and protect against sexually transmitted infections (STIs/AIDS)",
        "They inhibit ovulation permanently through hormone diffusion",
        "They induce permanent immunological sterility in the male",
        "They cause lysis of the secondary oocyte upon contact"
    ],
    "A",
    "1. Condoms are barriers made of thin rubber/latex sheath used to cover the penis in the male or vagina and cervix in the female.\n2. Its use has increased in recent years due to its additional benefit of protecting the user from contracting STIs and AIDS.\nHence, Option A is correct."
))

add(make_match_question(
    "Reproductive Health",
    "IUD Types & Examples",
    "Match List I (Type of IUD) with List II (Example):",
    [
        ("(A)", "Non-medicated IUD"),
        ("(B)", "Copper releasing IUD"),
        ("(C)", "Hormone releasing IUD"),
        ("(D)", "Barrier device for female")
    ],
    [
        ("(I)", "Progestasert and LNG-20"),
        ("(II)", "Lippes loop"),
        ("(III)", "Diaphragm, cervical cap, and vaults"),
        ("(IV)", "CuT, Cu7, and Multiload 375")
    ],
    [
        "(A)-(II), (B)-(IV), (C)-(I), (D)-(III)",
        "(A)-(IV), (B)-(II), (C)-(I), (D)-(III)",
        "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)",
        "(A)-(I), (B)-(IV), (C)-(II), (D)-(III)"
    ],
    "A",
    "1. Non-medicated IUD: Lippes loop (A -> II).\n2. Copper releasing IUD: CuT, Cu7, Multiload 375 (B -> IV).\n3. Hormone releasing IUD: Progestasert, LNG-20 (C -> I).\n4. Barrier device for female: Diaphragms/vaults (D -> III).\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "Copper Releasing IUD Mechanism",
    "How do copper-releasing Intrauterine Devices (e.g., CuT, Multiload 375) primarily prevent conception?",
    [
        "Cu ions released suppress sperm motility and the fertilizing capacity of sperms",
        "They block the fallopian tubes physically to prevent ovum release",
        "They destroy the corpus luteum within 24 hours of ovulation",
        "They prevent the surge of LH and FSH from anterior pituitary"
    ],
    "A",
    "1. Cu ions released suppress sperm motility and the fertilizing capacity of sperms.\n2. In addition, IUDs increase phagocytosis of sperms within the uterus.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "Hormone Releasing IUD Mechanism",
    "Hormone-releasing IUDs (Progestasert, LNG-20) act by:",
    [
        "Making the uterus unsuitable for implantation and the cervix hostile to the sperms",
        "Inducing immediate expulsion of ovaries into the pelvic cavity",
        "Blocking the release of testosterone from male testes",
        "Degrading the zona pellucida of all follicles in the ovary"
    ],
    "A",
    "1. The hormone releasing IUDs, in addition, make the uterus unsuitable for implantation and the cervix hostile to the sperms.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "Emergency Contraceptive Timeframe",
    "Administration of progestogens or progestogen-estrogen combinations or insertion of an IUD within what timeframe of unprotected coitus is extremely effective as an emergency contraceptive?",
    ["Within 72 hours", "Within 24 hours only", "Within 7 days", "Within 14 days"],
    "A",
    "1. Administration of progestogens or progestogen-estrogen combinations or IUDs within 72 hours of coitus have been found to be very effective as emergency contraceptives.\n2. They could be used to avoid possible pregnancy due to rape or casual unprotected intercourse.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "Sterilization Surgical Methods",
    "Surgical intervention in males and females to achieve terminal, irreversible contraception are termed respectively:",
    ["Vasectomy and Tubectomy", "Tubectomy and Vasectomy", "Castration and Hysterectomy", "Laparoscopy and MTP"],
    "A",
    "1. Sterilization procedure in the male is called vasectomy and that in the female is called tubectomy.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "Vasectomy Target Duct",
    "In vasectomy, which duct is cut and tied up through a small incision on the scrotum?",
    ["Vas deferens", "Vasa efferentia", "Rete testis", "Urethra"],
    "A",
    "1. In vasectomy, a small part of the vas deferens is removed or tied up through a small incision on the scrotum.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "Tubectomy Mechanism",
    "In tubectomy, conception is prevented because:",
    [
        "A small part of the fallopian tube is removed or tied up, blocking gamete transport",
        "Ovaries are surgically excised, stopping estrogen secretion",
        "The uterus is completely removed from the abdominal cavity",
        "The cervix is permanently fused with the vaginal canal"
    ],
    "A",
    "1. In tubectomy, a small part of the fallopian tube is removed or tied up through a small incision in the abdomen or through vagina.\n2. This prevents transport of gametes (ovum cannot meet sperm).\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "MTP Legalization Year in India",
    "Medical Termination of Pregnancy (MTP) was legalized by the Government of India with strict conditions to prevent its misuse (especially female foeticide) in the year:",
    ["1971", "1951", "1981", "1991"],
    "A",
    "1. Government of India legalized MTP in 1971 with some strict conditions to avoid its misuse.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "MTP Safe Period",
    "Medical termination of pregnancy (MTP) is considered relatively safe during which period of pregnancy?",
    ["First trimester (up to 12 weeks of pregnancy)", "Second trimester (up to 24 weeks)", "Third trimester (up to 36 weeks)", "Any time before active labour begins"],
    "A",
    "1. MTPs are considered relatively safe during the first trimester, i.e., up to 12 weeks of pregnancy.\n2. Second trimester abortions are much more riskier.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "Incurable Sexually Transmitted Infections",
    "Which of the following sexually transmitted infections are completely incurable even if detected early?",
    [
        "Hepatitis-B, Genital herpes, and HIV infection",
        "Gonorrhoea, Syphilis, and Chlamydiasis",
        "Trichomoniasis and Genital warts",
        "Candidiasis and Syphilis"
    ],
    "A",
    "1. Except for hepatitis-B, genital herpes and HIV infections, other STIs are completely curable if detected early and treated properly.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "ZIFT Blastocoel Stage",
    "In Assisted Reproductive Technology, Zygote Intra-Fallopian Transfer (ZIFT) involves the transfer of:",
    [
        "Zygote or early embryo with up to 8 blastomeres into the fallopian tube",
        "Embryos with more than 8 blastomeres into the uterine cavity",
        "Unfertilized ovum directly into the ampullary region",
        "Spermatozoa directly into the cervical canal"
    ],
    "A",
    "1. In ZIFT, the zygote or early embryo (with up to 8 blastomeres) is transferred into the fallopian tube.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "IUT Definition",
    "In an in-vitro fertilization (IVF) programme, if the embryo has developed past the 8-cell stage (more than 8 blastomeres), it is transferred into the uterus in a procedure called:",
    ["Intra-Uterine Transfer (IUT)", "Zygote Intra-Fallopian Transfer (ZIFT)", "Gamete Intra-Fallopian Transfer (GIFT)", "Intra-Cytoplasmic Sperm Injection (ICSI)"],
    "A",
    "1. Embryos with more than 8 blastomeres are transferred into the uterus (IUT - intra uterine transfer), to complete their further development.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "GIFT Candidate Criteria",
    "Gamete Intra-Fallopian Transfer (GIFT) is recommended for a female who:",
    [
        "Cannot produce an ovum, but can provide a suitable environment for fertilization and further development",
        "Has completely blocked fallopian tubes bilaterally",
        "Produces defective cervical mucus that coagulates sperms",
        "Cannot implant a blastocyst due to uterine fibroids"
    ],
    "A",
    "1. Transfer of an ovum collected from a donor into the fallopian tube (GIFT – gamete intra fallopian transfer) of another female who cannot produce one, but can provide suitable environment for fertilization and further development is another method attempted.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "ICSI Technique",
    "Intra-Cytoplasmic Sperm Injection (ICSI) is a specialized ART procedure in which:",
    [
        "A single sperm is directly injected into the cytoplasm of an ovum in the laboratory",
        "Semen is artificially introduced into the fallopian tube via catheter",
        "Multiple sperms are incubated with an unfertilized morula",
        "Sperm nuclei are fused with an enucleated somatic cell"
    ],
    "A",
    "1. Intra cytoplasmic sperm injection (ICSI) is another specialized procedure to form an embryo in the laboratory in which a sperm is directly injected into the ovum.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "Artificial Insemination (IUI) Indication",
    "Intra-Uterine Insemination (IUI) is particularly useful in treating cases of infertility where:",
    [
        "The male partner is unable to inseminate or has very low sperm counts (oligozoospermia)",
        "The female partner has blocked fallopian tubes",
        "The female has absence of ovaries",
        "The fetus suffers from down syndrome"
    ],
    "A",
    "1. Infertility cases either due to inability of the male partner to inseminate the female or due to very low sperm counts in the ejaculates, could be corrected by artificial insemination (AI) technique.\n2. In this technique, the semen collected either from the husband or a healthy donor is artificially introduced into the vagina or into the uterus (IUI – intra-uterine insemination) of the female.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "RCH Full Form",
    "In India, family planning programmes initiated in 1951 have been expanded under the popular acronym RCH, which stands for:",
    [
        "Reproductive and Child Health Care Programmes",
        "Regional Contraceptive and Hygiene Council",
        "Reproductive Cellular Heredity Division",
        "Registered Clinical Health Centres"
    ],
    "A",
    "1. Creating awareness among people about various reproduction related aspects and providing facilities and support for building up a reproductively healthy society are the major tasks under these programmes covered under the name 'Reproductive and Child Health Care (RCH) programmes'.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "Centchroman Active Ingredient",
    "The active ingredient in the indigenous non-steroidal oral contraceptive pill 'Saheli' is:",
    ["Centchroman", "Ethinylestradiol", "Levonorgestrel", "Mifepristone"],
    "A",
    "1. Saheli contains centchroman, a selective estrogen receptor modulator (non-steroidal preparation).\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "World Population Milestones",
    "According to NCERT, the world population which was around 2 billion in 1900 rocketed to about 6 billion by 2000 and reached what level by 2011?",
    ["7.2 billion", "10 billion", "4.5 billion", "12 billion"],
    "A",
    "1. The world population which was around 2 billion in 1900 rocketed to about 6 billion by 2000 and 7.2 billion in 2011.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "Syphilis Causal Bacterium",
    "Syphilis is a sexually transmitted disease caused by which pathogenic spirochaete bacterium?",
    ["Treponema pallidum", "Neisseria gonorrhoeae", "Chlamydia trachomatis", "Haemophilus ducreyi"],
    "A",
    "1. Syphilis is caused by the bacterium Treponema pallidum.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "Gonorrhoea Causal Bacterium",
    "Which bacterium is the causative agent of the sexually transmitted infection gonorrhoea?",
    ["Neisseria gonorrhoeae", "Treponema pallidum", "Trichomonas vaginalis", "Herpes simplex virus"],
    "A",
    "1. Gonorrhoea is caused by the bacterium Neisseria gonorrhoeae.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "Trichomoniasis Causal Organism",
    "Trichomoniasis is an STI transmitted by which type of pathogen?",
    ["Protozoan (Trichomonas vaginalis)", "Bacterium (Trichophyton rubrum)", "Virus (Human Papillomavirus)", "Fungus (Candida albicans)"],
    "A",
    "1. Trichomoniasis is caused by a flagellated protozoan named Trichomonas vaginalis.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "Untreated STI Complications",
    "Infection with sexually transmitted pathogens, if left untreated, can lead to serious reproductive complications such as:",
    [
        "Pelvic Inflammatory Diseases (PID), abortions, still births, and ectopic pregnancies",
        "Polycystic kidney failure and cirrhosis",
        "Coronary artery thrombosis and diabetes insipidus",
        "Osteoarthritis and muscular dystrophy"
    ],
    "A",
    "1. Though all persons are vulnerable to these infections, their incidences are reported to be very high among persons in the age group of 15-24 years.\n2. Untreated STIs lead to complications like pelvic inflammatory diseases (PID), abortions, still births, ectopic pregnancies, infertility or even cancer of the reproductive tract.\nHence, Option A is correct."
))

add(make_question(
    "Reproductive Health",
    "Oral Contraceptive Pill Regime",
    "A typical course of daily combined oral contraceptive pills (mala-D / oral pills) consists of pills taken for:",
    [
        "21 consecutive days starting within the first 5 days of the menstrual cycle, followed by a 7-day gap",
        "7 days during active menstruation only",
        "Once a month immediately before expected ovulation",
        "Every alternate day throughout the entire year"
    ],
    "A",
    "1. Pills have to be taken daily for a period of 21 days starting preferably within the first five days of menstrual cycle.\n2. After a gap of 7 days (during which menstruation occurs) it has to be repeated in the same pattern till the female desires to prevent conception.\nHence, Option A is correct."
))

add(make_statement_question(
    "Reproductive Health",
    "MTP Act Amendment Statements",
    "The Medical Termination of Pregnancy (Amendment) Act 2017 allows termination of pregnancy up to 20 weeks on the opinion of one registered medical practitioner.",
    "For pregnancies between 20 and 24 weeks, opinion of two registered medical practitioners is mandated for specified categories of vulnerable women.",
    "A",
    "1. According to the MTP Amendment Act 2017, a pregnancy may be terminated up to 20 weeks on the opinion of one registered medical practitioner.\n2. If the pregnancy has lasted between 20 and 24 weeks, the opinion of two registered medical practitioners is required for defined categories (e.g. survivors of rape, minors).\nBoth statements are accurate according to NCERT. Option A is correct."
))

add(make_assertion_question(
    "Reproductive Health",
    "Sterilization Irreversibility",
    "Surgical contraceptive methods (vasectomy and tubectomy) are generally advised only as terminal methods of contraception.",
    "The reversibility of surgical sterilization techniques is extremely poor.",
    "A",
    "1. Surgical methods block gamete transport and thereby prevent conception.\n2. Sterilization methods in male (vasectomy) and female (tubectomy) are highly effective but their reversibility is very poor.\n3. Therefore, they are advised as terminal methods only.\n4. Reason correctly explains Assertion. Option A is correct."
))

print(f"Reproductive health completed: total questions now {len(questions)}!")

# =========================================================================
# SECTION 4: Reproduction in Organisms (10 Questions, Q151 - Q160)
# =========================================================================

add(make_match_question(
    "Reproduction in Organisms",
    "Vegetative Propagules in Plants",
    "Match List I (Plant) with List II (Vegetative Propagule):",
    [
        ("(A)", "Potato"),
        ("(B)", "Ginger"),
        ("(C)", "Agave"),
        ("(D)", "Bryophyllum")
    ],
    [
        ("(I)", "Rhizome"),
        ("(II)", "Bulbil"),
        ("(III)", "Leaf buds"),
        ("(IV)", "Eyes (Tubers)")
    ],
    [
        "(A)-(IV), (B)-(I), (C)-(II), (D)-(III)",
        "(A)-(I), (B)-(IV), (C)-(II), (D)-(III)",
        "(A)-(IV), (B)-(II), (C)-(I), (D)-(III)",
        "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)"
    ],
    "A",
    "1. Potato: Eyes / Tuber (A -> IV).\n2. Ginger: Rhizome (B -> I).\n3. Agave: Bulbil (C -> II).\n4. Bryophyllum: Adventitious leaf buds (D -> III).\nHence, Option A is correct."
))

add(make_question(
    "Reproduction in Organisms",
    "Water Hyacinth Vegetative Propagule",
    "Eichhornia crassipes (Water hyacinth), known as the 'Terror of Bengal', propagates vegetatively at a phenomenal rate through which specialized horizontal sub-aerial stem?",
    ["Offset", "Runner", "Sucker", "Stolon"],
    "A",
    "1. Water hyacinth propagates vegetatively by means of an offset.\n2. It drains oxygen from the water, which leads to death of fishes, earning it the name 'Terror of Bengal'.\nHence, Option A is correct."
))

add(make_match_question(
    "Reproduction in Organisms",
    "Asexual Reproductive Structures",
    "Match List I (Organism) with List II (Asexual reproductive structure):",
    [
        ("(A)", "Chlamydomonas"),
        ("(B)", "Penicillium"),
        ("(C)", "Hydra"),
        ("(D)", "Sponges (Spongilla)")
    ],
    [
        ("(I)", "Conidia"),
        ("(II)", "Zoospores"),
        ("(III)", "Gemmules"),
        ("(IV)", "Buds")
    ],
    [
        "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)",
        "(A)-(I), (B)-(II), (C)-(IV), (D)-(III)",
        "(A)-(II), (B)-(IV), (C)-(I), (D)-(III)",
        "(A)-(III), (B)-(I), (C)-(IV), (D)-(II)"
    ],
    "A",
    "1. Chlamydomonas produces motile zoospores (A -> II).\n2. Penicillium produces non-motile conidia (B -> I).\n3. Hydra produces external buds (C -> IV).\n4. Spongilla produces internal buds called gemmules (D -> III).\nHence, Option A is correct."
))

add(make_question(
    "Reproduction in Organisms",
    "Bamboo Flowering Life Span",
    "Bamboo species are monocarpic plants that exhibit an unusual flowering phenomenon characterized by:",
    ["Flowering only once in their lifetime, generally after 50 to 100 years, producing large number of fruits and dying", "Flowering every spring continuously for 100 years", "Producing flowers without any seeds via apomixis", "Flowering once every 12 years synchronously in autumn"],
    "A",
    "1. Bamboo species flower only once in their life time, generally after 50-100 years, produce large number of fruits and die.\nHence, Option A is correct."
))

add(make_question(
    "Reproduction in Organisms",
    "Neelakuranji Flowering Cycle",
    "Strobilanthes kunthiana (Neelakuranji), which flowers once every 12 years and covers the hill tracks of Kerala, Karnataka, and Tamil Nadu in blue stretches, belongs to which category?",
    ["Perennial monocarpic plant flowering once every 12 years", "Annual polycarpic shrub flowering monthly", "Biennial herb flowering every two years", "Epiphytic orchid blooming continuously"],
    "A",
    "1. Strobilanthes kunthiana (neelakuranji) flowers once in 12 years. It flowered during September-October 2006, transforming hilly tracks of Kerala, Karnataka and Tamil Nadu into blue stretches.\nHence, Option A is correct."
))

add(make_question(
    "Reproduction in Organisms",
    "Oestrus Cycle vs Menstrual Cycle",
    "Cyclical changes in activities of ovaries and accessory ducts during the breeding season in non-primate placental mammals (e.g., cows, sheep, rats, deers) are termed:",
    ["Oestrus cycle", "Menstrual cycle", "Lactational cycle", "Circadian cycle"],
    "A",
    "1. The cyclical changes during reproduction in non-primate mammals like cows, sheep, rats, deers, dogs, tiger, etc., are called oestrus cycle.\n2. In primates (monkeys, apes, and humans) it is called menstrual cycle.\nHence, Option A is correct."
))

add(make_question(
    "Reproduction in Organisms",
    "Monoecious vs Dioecious Plants",
    "Which of the following pairs correctly represents a monoecious plant and a dioecious plant respectively?",
    ["Cucurbits (monoecious) and Papaya (dioecious)", "Papaya (monoecious) and Date palm (dioecious)", "Marchantia (monoecious) and Chara (dioecious)", "Coconuts (dioecious) and Cucurbits (monoecious)"],
    "A",
    "1. In several plants, both male and female flowers may be present on the same individual (monoecious, e.g., cucurbits, coconuts, Chara) or on separate individuals (dioecious, e.g., papaya, date palm, Marchantia).\nHence, Option A is correct."
))

add(make_question(
    "Reproduction in Organisms",
    "Chara Sex Organs",
    "In the green alga Chara, the female sex organ (nucule/oogonium) and male sex organ (globule/antheridium) are situated as:",
    ["Nucule (oogonium) located above the globule (antheridium)", "Globule located above the nucule", "Both enclosed inside a single sterile sheath on different branches", "Nucule located exclusively underground on rhizoids"],
    "A",
    "1. In Chara, the female sex organ is the upper oogonium (nucule) and the male sex organ is the lower antheridium (globule).\nHence, Option A is correct."
))

add(make_question(
    "Reproduction in Organisms",
    "Marchantia Dioecious Structures",
    "In the bryophyte Marchantia, the male and female thalli bear gametophores known respectively as:",
    ["Antheridiophore and Archegoniophore", "Archegoniophore and Antheridiophore", "Sporophyte and Gametophyte", "Strobilus and Capsule"],
    "A",
    "1. In Marchantia, female sex organs are borne on archegoniophores (female thallus) and male sex organs on antheridiophores (male thallus).\nHence, Option A is correct."
))

add(make_question(
    "Reproduction in Organisms",
    "Juvenile Phase Definition",
    "The period of growth in an organism's life cycle before it can attain sexual maturity and reproduce sexually is termed:",
    ["Juvenile phase (or vegetative phase in plants)", "Senescent phase", "Dormant phase", "Climacteric phase"],
    "A",
    "1. All organisms have to reach a certain stage of growth and maturity in their life, before they can reproduce sexually. That period of growth is called the juvenile phase. It is known as vegetative phase in plants.\nHence, Option A is correct."
))

print(f"Total Unit 1 questions assembled: {len(questions)}")
assert len(questions) == 160, f"Expected 160 questions, got {len(questions)}"

# Write to JSON
out_path = "mock/bio_units/unit1.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved {len(questions)} Unit 1 questions to {out_path}!")

