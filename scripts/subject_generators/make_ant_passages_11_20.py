import sys, os

out_path = "scripts/subject_generators/ant_passages_11_20.py"

content = '''import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import case_q

# ==============================================================================
# MOCK 11 PASSAGES
# ==============================================================================
P1_M11_TXT = (
    "Read the following case study on the Discovery of Homo naledi in the Rising Star Cave System, "
    "and answer the questions that follow:\\n\\n"
    "In 2013, recreational cavers discovered an unprecedented treasure trove of hominin fossils deep within the Rising Star cave system "
    "in the Cradle of Humankind World Heritage site near Johannesburg, South Africa. Led by paleoanthropologist Lee Berger of the "
    "University of the Witwatersrand, a team of underground speleological excavators (the 'underground astronauts') navigated the treacherous "
    "Superman's Crawl and a sheer 12-meter vertical chute known as the Chute to access the pitch-black Dinaledi Chamber. Over 1,550 fossil "
    "specimens representing at least 15 individuals were recovered from the cave floor. In 2015, Berger and his colleagues announced a new "
    "species: Homo naledi ('naledi' meaning 'star' in the local Sotho language). Homo naledi presents an astonishing mosaic anatomy: an ape-sized "
    "cranial capacity (465 to 560 cc), small body stature (approx. 145 cm), and curved australopith-like phalanges, coupled with modern human-like "
    "delicate cranial vault shape, small dentition, human-like wrists and palms suited for precision tool handling, and fully bipedal feet. "
    "Direct luminescence (OSL), electron spin resonance (ESR), and uranium-series dating unexpectedly established that Homo naledi lived "
    "between 335,000 and 236,000 years ago (Late Middle Pleistocene)—contemporaneously with the emergence of early Homo sapiens in Africa. "
    "Because the remote Dinaledi Chamber contained virtually no non-hominin animal bones or carnivore tooth marks, Berger proposed that "
    "Homo naledi intentionally navigated dark subterranean cave passages with torches to practice deliberate body disposal / mortuary caching."
)
P1_M11_QS = [
    case_q("Evolution of Genus Homo: Homo habilis and Homo erectus", "Rising Star Cave Locality and Team Leader",
     "Who led the archaeological expedition that discovered the extraordinary Homo naledi fossil assemblage in the Rising Star cave system in South Africa?",
     "Lee Berger",
     ["Donald Johanson", "Raymond Dart", "Mary Leakey"],
     "Lee Berger led the team from the University of the Witwatersrand that excavated the Rising Star cave system in 2013–2014."),
    case_q("Evolution of Genus Homo: Homo habilis and Homo erectus", "Meaning of 'naledi' Species Name",
     "In the Sotho language of South Africa, what does the species epithet 'naledi' translate to?",
     "'Star' (referring to the Rising Star cave system)",
     ["'Cave dweller'", "'Handy man'", "'Ancient grandfather'"],
     "Homo naledi was named after 'naledi', the Sotho word for star, honoring the Rising Star cave where it was uncovered."),
    case_q("Evolution of Genus Homo: Homo habilis and Homo erectus", "Surprising Geological Age of Homo naledi",
     "What was the shocking chronological revelation established by absolute dating (OSL, ESR, U-series) for Homo naledi?",
     "It lived unexpectedly late in the Middle Pleistocene, between 335,000 and 236,000 years ago, coexisting with early Homo sapiens",
     ["It lived over 4 million years ago in the Pliocene",
      "It lived in medieval Europe 500 years ago",
      "It went extinct 50 million years before genus Homo evolved"],
     "Despite its primitive 500 cc brain, Homo naledi lived only ~300 ka ago, proving primitive hominin lineages coexisted with modern human ancestors."),
    case_q("Evolution of Genus Homo: Homo habilis and Homo erectus", "Mosaic Anatomical Features",
     "Which anatomical combination characterizes the unique 'mosaic evolution' of Homo naledi?",
     "A small ape-sized brain (~500 cc) and curved fingers paired with modern human-like wrist anatomy, small teeth, and obligate bipedal feet",
     ["A giant 2,000 cc brain paired with four walking ape legs",
      "A complete lack of hands and feet",
      "Large canine tusks and a quadrupedal pelvis"],
     "Homo naledi is a mosaic: primitive small brain and curved fingers combined with derived human-like feet, wrists, and dental reduction."),
    case_q("Evolution of Genus Homo: Homo habilis and Homo erectus", "Hypothesis for Dinaledi Chamber Fossils",
     "Why did Lee Berger propose the radical hypothesis of 'Deliberate Mortuary Disposal' for the hominin bones in the remote Dinaledi Chamber?",
     "Because the chamber is located deep in pitch darkness with no natural open surface entrance, carnivore scavenging marks, or other animal fauna",
     ["Because the skeletons were buried in modern steel coffins",
      "Because written epitaphs were found carved on the cave walls",
      "Because the bones were wrapped in gold leaf sheets"],
     "The absence of carnivore gnawing, stream washing, or non-hominin fauna suggested hominins navigated deep caves to deposit dead bodies intentionally.")
]

P2_M11_TXT = (
    "Read the following excerpt on Marshall Sahlins and 'The Original Affluent Society', "
    "and answer the questions that follow:\\n\\n"
    "In his 1972 classic 'Stone Age Economics', American economic anthropologist Marshall Sahlins overturned centuries of Western economic "
    "dogma by characterizing hunter-gatherers as 'The Original Affluent Society'. Classical Western economics (grounded in Adam Smith and formalist "
    "theory) assumes that human wants are infinite while resources are scarce, portraying primitive foragers as impoverished wretches engaged in a "
    "desperate, round-the-clock struggle against starvation. Drawing upon Richard B. Lee's empirical quantitative fieldwork among the Dobe !Kung San "
    "(Bushmen) of the Kalahari Desert and James Woodburn's studies of the Hadza of Tanzania, Sahlins demonstrated that foragers had remarkably "
    "plentiful lives. Adult !Kung foragers worked an average of only 3 to 5 hours per day (roughly 15 to 20 hours per week) to secure a nutritionally "
    "adequate diet of mongongo nuts, wild plants, and game, leaving abundant leisure time for storytelling, dance, visiting kin, and sleep. Sahlins "
    "argued that affluence can be attained in two ways: the 'Galbraithean capitalist road' of producing much to satisfy infinite wants, or the "
    "'Zen road to affluence' of desiring little, where material wants are easily satisfied with simple technology, freeing man from the tyranny of scarcity."
)
P2_M11_QS = [
    case_q("Economic Anthropology: Primitive Economy and Exchange", "Originator of 'Original Affluent Society'",
     "Which economic anthropologist coined the famous concept of 'The Original Affluent Society' in 'Stone Age Economics' (1972)?",
     "Marshall Sahlins",
     ["Karl Polanyi", "Bronislaw Malinowski", "George Dalton"],
     "Marshall Sahlins formulated 'The Original Affluent Society' in 1972, refuting the myth of impoverished hunter-gatherers."),
    case_q("Economic Anthropology: Primitive Economy and Exchange", "Empirical Work Hours Among Foragers",
     "Quantitative empirical fieldwork by Richard B. Lee among the !Kung San revealed that adult foragers spent approximately how much time per day securing food?",
     "Only 3 to 5 hours per day (roughly 15 to 20 hours per week)",
     ["Over 16 hours of grueling labor every day", "Zero minutes because food fell from trees automatically", "80 hours per week"],
     "Lee's time-allocation studies proved !Kung adults worked only 15–20 hours a week on subsistence, spending the rest in rest and socializing."),
    case_q("Economic Anthropology: Primitive Economy and Exchange", "The 'Zen Road to Affluence'",
     "In Sahlins' theoretical formulation, what is the 'Zen Road to Affluence' practiced by hunter-gatherer societies?",
     "Achieving abundance by desiring little: material wants are finite and modest, easily satisfied with simple technology and minimal labor",
     ["Building giant factories to mass-produce consumer plastic goods",
      "Investing heavily in international stock market hedge funds",
      "Working 100 hours a week to purchase luxury automobiles"],
     "The Zen road achieves affluence by limiting desires rather than expanding production: wanting little makes a modest surplus feel like abundance."),
    case_q("Economic Anthropology: Primitive Economy and Exchange", "Primary Wild Food Staple of the !Kung San",
     "In Richard B. Lee's nutritional study of the Kalahari !Kung San, which drought-resistant wild plant food served as their reliable nutritional mainstay?",
     "The Mongongo Nut (Ricinodendron rautanenii)",
     ["Wild wheat grains", "Cultivated potatoes", "Wild commercial cocoa beans"],
     "The protein- and calorie-dense Mongongo nut provided the reliable dietary backbone of the Kalahari foragers year-round."),
    case_q("Economic Anthropology: Primitive Economy and Exchange", "Critique of Formalist Economic Scarcity",
     "How did Sahlins' work challenge the fundamental assumption of formalist Western economic theory?",
     "It proved that 'scarcity' is not an inherent natural biological condition of humanity, but a modern cultural creation of capitalism and infinite manufactured wants",
     ["It proved that all hunter-gatherers were multi-millionaire bankers",
      "It showed that money was invented before fire",
      "It proved that modern capitalism is identical to hunting and gathering"],
     "Sahlins showed scarcity is an institutional invention of market economies; primitive foragers experienced abundance because their desires were finite.")
]

# ==============================================================================
# MOCK 12 PASSAGES
# ==============================================================================
P1_M12_TXT = (
    "Read the following case study on Mary Leakey and the Laetoli Fossil Footprints in Tanzania, "
    "and answer the questions that follow:\\n\\n"
    "In 1978, renowned paleoanthropologist Mary Leakey and her international field team uncovered an astonishing paleontological site at "
    "Laetoli, located approximately 45 kilometers south of Olduvai Gorge in northern Tanzania. Preserved within the Footprint Tuff (Site G) "
    "was an unbroken, 27-meter-long trackway of approximately 70 hominin fossil footprints made by early hominins walking across wet volcanic ash. "
    "Potassium-Argon (K-Ar) and Argon-Argon (Ar-Ar) dating of the overlying volcanic tuff established that the footprints were made exactly "
    "3.66 million years ago (Late Pliocene), coinciding chronologically with the fossil remains of Australopithecus afarensis found at the site. "
    "The eruption of the nearby volcano Sadiman blanketed the savanna with fine carbonatite ash; light rain turned the ash into soft mud like wet "
    "cement. Two or three hominins walked across this muddy surface; subsequent sunshine rapidly baked the ash into hard rock before another ash "
    "fall sealed the footprints intact for over 3.6 million years. Anatomical analysis of the footprints revealed: a well-developed longitudinal arch, "
    "a non-divergent, fully adducted big toe (hallux) aligned in parallel with the other digits, and a deep heel-strike impression followed by "
    "a powerful toe-off impulse—providing undeniable physical proof of fully modern, human-like bipedal striding long before stone tools emerged."
)
P1_M12_QS = [
    case_q("Early Hominid Evolution and Australopithecines", "Discoverer of the Laetoli Footprints",
     "Who led the archaeological expedition that discovered the 3.66-million-year-old fossil hominin trackways at Laetoli, Tanzania, in 1978?",
     "Mary Leakey",
     ["Donald Johanson", "Raymond Dart", "Eugene Dubois"],
     "Mary Leakey discovered the famous Laetoli fossil hominin footprints in Tanzania in 1978."),
    case_q("Early Hominid Evolution and Australopithecines", "Preservation Medium of the Trackway",
     "How were the Laetoli hominin footprints preserved so perfectly across 3.6 million years of geological time?",
     "Hominins walked across wet carbonatite volcanic ash from volcano Sadiman, which baked in the sun and was sealed by subsequent ash layers",
     ["The footprints were carved into granite by stone tools",
      "The footprints were preserved in frozen Arctic glacier ice",
      "The footprints were stamped into modern wet concrete"],
     "Volcano Sadiman deposited carbonatite ash that turned to cement in rain, recording hominin footsteps before being sealed by ash."),
    case_q("Early Hominid Evolution and Australopithecines", "Dating Technique for Laetoli Tuff",
     "Which absolute chronometric dating technique established the 3.66-million-year antiquity of the Laetoli Footprint Tuff?",
     "Potassium-Argon (K-Ar) and Argon-Argon (Ar-Ar) dating of volcanic crystals",
     ["Radiocarbon (C-14) dating", "Dendrochronology of tree rings", "Thermoluminescence of pottery"],
     "K-Ar and Ar-Ar dating of volcanic feldspars and biotite in the tuff bracketed the footprints precisely to 3.66 Ma."),
    case_q("Early Hominid Evolution and Australopithecines", "Anatomical Features of the Laetoli Footprints",
     "What critical anatomical characteristics did the Laetoli footprints reveal regarding Pliocene hominin foot morphology?",
     "A non-divergent, adducted big toe aligned with the other toes, a pronounced longitudinal arch, and a human-like heel-strike to toe-off stride",
     ["A divergent, opposable thumb-like big toe suited for grasping tree limbs like an ape",
      "Webbed toes suited exclusively for swimming underwater",
      "Hoof-like structures without any distinct toes"],
     "The footprints showed an adducted big toe, longitudinal arch, and modern heel-to-toe weight transfer, proving habitual bipedal striding."),
    case_q("Early Hominid Evolution and Australopithecines", "Hominin Species Attributed to the Trackways",
     "Which hominin species discovered at Laetoli and Hadar is universally recognized as the maker of the Laetoli footprints?",
     "Australopithecus afarensis",
     ["Homo habilis", "Homo erectus", "Homo sapiens"],
     "Fossil jaws and teeth at Laetoli belong to Australopithecus afarensis, identifying it as the maker of the 3.66 Ma footprint trackway.")
]

P2_M12_TXT = (
    "Read the following excerpt on the Nayar Matrilineal Taravad and the Sambandham Visiting Marriage in Kerala, "
    "and answer the questions that follow:\\n\\n"
    "In the ethnography of kinship, the traditional social organization of the Nayar caste of pre-colonial Kerala represents one of the world's "
    "most famous examples of a matrilineal, matrilocal society. Investigated by anthropologists such as Kathleen Gough and Joan Mencher, the central "
    "institution of Nayar life was the 'Taravad'—a large matrilineal joint household property-owning corporation consisting of all descendants in "
    "the female line from a common ancestress. Property, titles, and lineage membership passed strictly from mother to daughter. The executive "
    "manager and administrative head of the Taravad was the 'Karanavan'—the senior-most male member of the maternal lineage (usually the mother's "
    "eldest brother). Nayar women participated in two distinct marital rituals: first, the 'Talikettu Kalyanam' (pre-puberty ritual marriage where a "
    "ritual groom tied a gold thali amulet around the girl's neck, dissolving the bond after three days); and second, the 'Sambandham' (socially "
    "sanctioned visiting union). Under Sambandham, a woman could receive visiting husbands (often Nambudiri Brahmins or Nayar men) who visited her "
    "at night in her maternal room and departed in the morning. The visiting husband had no legal custody, economic obligations, or maintenance "
    "duties toward the children; all parental custody and inheritance were guaranteed by the mother's Taravad."
)
P2_M12_QS = [
    case_q("Family: Types, Functions and Matrilineal Systems", "Nayar Matrilineal Joint Household Name",
     "In the traditional matrilineal society of the Nayars of Kerala, what was the large corporate household property-owning unit called?",
     "The Taravad",
     ["The Kur", "The Iing", "The Ghotul"],
     "The Taravad was the corporate matrilineal joint family of the Nayars, sharing common ancestral estates, kitchen, and lineage identity."),
    case_q("Family: Types, Functions and Matrilineal Systems", "Executive Head of the Taravad: Karanavan",
     "Who exercised administrative authority and managed the extensive agricultural estates of a Nayar Taravad?",
     "The Karanavan (the eldest living male of the maternal lineage, typically the maternal uncle)",
     ["The visiting Nambudiri husband", "The village Christian priest", "The youngest female child"],
     "The Karanavan (senior maternal uncle) exercised executive management over Taravad lands, representing the lineage in public affairs."),
    case_q("Family: Types, Functions and Matrilineal Systems", "Talikettu Kalyanam Ritual Function",
     "What was the social and ritual purpose of the 'Talikettu Kalyanam' ceremony performed for young Nayar girls before puberty?",
     "A pre-puberty ritual marriage that conferred ritual adult status and the freedom to enter subsequent Sambandham unions",
     ["A permanent lifelong marriage contract forbidding all future relationships",
      "A military knighting ceremony where girls became soldiers",
      "A coronation ceremony where girls were crowned queens of Kerala"],
     "Talikettu Kalyanam was an indispensable pre-puberty rite: tying the thali gave the girl adult ritual purity, after which she could enter Sambandham."),
    case_q("Family: Types, Functions and Matrilineal Systems", "Sambandham Visiting Marriage Characteristics",
     "What characterized the post-marital residence and daily interaction in a traditional Nayar 'Sambandham' union?",
     "Natolocal (Duolocal) visiting union: spouses continued living in their respective maternal Taravads, the husband visiting at night without daily cohabitation",
     ["Patrilocal residence where the bride moved to her husband's family home permanently",
      "Neolocal residence where the couple bought a modern city apartment",
      "Avunculocal residence where both moved to live with the husband's uncle"],
     "Sambandham was a duolocal/natolocal visiting relationship: neither partner left their natal home, the visiting male departing each morning."),
    case_q("Family: Types, Functions and Matrilineal Systems", "Paternity and Child Custody in the Taravad",
     "Why did the visiting husband under Sambandham have no legal maintenance or inheritance obligations toward his biological children?",
     "Because children belonged exclusively to their mother's matrilineal Taravad, which provided lifelong economic maintenance and property inheritance",
     ["Because biological paternity was completely unknown to the Nayars",
      "Because children were raised exclusively in government state orphanages",
      "Because all children were adopted by the local king"],
     "Children were members of the mother's descent group; the mother's Taravad, supervised by the Karanavan, provided total economic and social support.")
]

# ==============================================================================
# MOCK 13 PASSAGES
# ==============================================================================
P1_M13_TXT = (
    "Read the following case study on the Discovery of Homo floresiensis ('The Hobbit') on the Island of Flores, "
    "and answer the questions that follow:\\n\\n"
    "In September 2003, a joint Australian-Indonesian archaeological team led by Michael Morwood and Raden Soejono made a stunning discovery "
    "in the limestone cave of Liang Bua on the isolated Indonesian island of Flores. Excavating deep deposits, they unearthed a remarkably "
    "preserved, nearly complete adult hominin skeleton (cataloged as LB1), nicknamed 'The Hobbit'. Described in 'Nature' in 2004 by Peter Brown, "
    "the specimen represented an adult female standing just 1.06 meters (3 feet 6 inches) tall and weighing approximately 25–30 kilograms, "
    "with a cranial brain volume of merely 417 to 426 cc—smaller than an average chimpanzee. Yet associated archaeological layers contained "
    "sophisticated stone tools, evidence of controlled fire, and butchered bones of dwarf Stegodon (an extinct elephant relative). Radiocarbon "
    "and luminescence dating subsequently established that Homo floresiensis occupied Liang Bua from approximately 100,000 to 60,000 years ago. "
    "Evolutionary biologists explain this miniature human through 'Insular Dwarfism' (Foster's Island Rule): when large mammals become isolated "
    "on small oceanic islands with limited caloric food resources and an absence of apex mammalian predators, natural selection favors rapid body "
    "size reduction. Brain shape analyses demonstrated that despite its microcephalic brain size, floresiensis possessed derived cortical "
    "reorganization in the frontal lobe (Brodmann area 10) associated with complex planning and tool manufacture."
)
P1_M13_QS = [
    case_q("Evolution of Genus Homo: Homo habilis and Homo erectus", "Liang Bua Cave Location and Nickname",
     "The fossil hominin known as 'The Hobbit' (Homo floresiensis) was excavated from Liang Bua Cave on which isolated Indonesian island?",
     "Flores Island",
     ["Java Island", "Sumatra Island", "Borneo Island"],
     "Homo floresiensis was discovered in Liang Bua Cave on the remote island of Flores in eastern Indonesia."),
    case_q("Evolution of Genus Homo: Homo habilis and Homo erectus", "Stature and Cranial Volume of LB1",
     "What was the remarkable physical stature and cranial capacity of the adult female holotype (LB1) of Homo floresiensis?",
     "Stature of approximately 1.06 meters (3.5 feet) and cranial volume of approximately 417 cc",
     ["Stature of 1.8 meters and cranial volume of 1,500 cc",
      "Stature of 2.5 meters and cranial volume of 2,000 cc",
      "Stature of 0.5 meters and cranial volume of 50 cc"],
     "LB1 stood only 1.06 m tall with a minute 417 cc brain, smaller than modern chimps yet exhibiting human-like bipedal anatomy."),
    case_q("Evolution of Genus Homo: Homo habilis and Homo erectus", "Evolutionary Mechanism: Insular Dwarfism",
     "Which evolutionary biological principle explains the dramatic body and brain size reduction of Homo floresiensis on Flores?",
     "Insular Dwarfism (Foster's Island Rule), where limited island resources and absence of predators select for dwarf body size",
     ["A genetic disease caused by severe radiation fallout",
      "Deliberate biological engineering by extraterrestrial aliens",
      "Severe starvation from living in total darkness"],
     "Insular dwarfism occurs when large terrestrial mammals become isolated on islands with restricted caloric resources, favoring small bodies."),
    case_q("Evolution of Genus Homo: Homo habilis and Homo erectus", "Associated Tool Technology and Fauna",
     "What technological and faunal evidence was found alongside Homo floresiensis at Liang Bua Cave?",
     "Flaked stone tools and charred, butchered bones of dwarf Stegodon elephants",
     ["Steel swords and copper coins", "Ceramic pottery with wheel marks", "Iron guns and gunpowder"],
     "Excavations yielded sophisticated Mode 1/flake tools, evidence of fire use, and butchered bones of miniature Stegodon elephants."),
    case_q("Evolution of Genus Homo: Homo habilis and Homo erectus", "Geological Age of Homo floresiensis",
     "Revised stratigraphy and luminescence dating published in 2016 established that Homo floresiensis lived at Liang Bua between:",
     "Approximately 100,000 and 60,000 years ago (Late Pleistocene)",
     ["Over 10 million years ago", "Exactly 500 years ago", "Between 1900 and 1950 CE"],
     "Revised dating showed floresiensis occupied Liang Bua from 100 ka to 60 ka BP, vanishing around the time modern humans reached the region.")
]

P2_M13_TXT = (
    "Read the following excerpt on E.E. Evans-Pritchard's Study of the Nuer Segmentary Lineage System and Blood Feud, "
    "and answer the questions that follow:\\n\\n"
    "In his classic 1940 monograph 'The Nuer', British social anthropologist E.E. Evans-Pritchard analyzed how political order is maintained "
    "in an 'acephalous' (headless) tribal society lacking centralized government, kings, courts, or police. The pastoral Nuer of the South Sudan "
    "were organized on the principle of the 'Segmentary Lineage System'. Political units were defined not by fixed geographic boundaries, but by "
    "genealogical distance along agnatic lineages. The system operated on 'Complementary Opposition': opposing segments at a lower level of "
    "segmentation fight one another, but instantly fuse into a larger unified bloc when confronted by an outside rival. Evans-Pritchard summarized "
    "this structural dynamic through the famous proverb: 'I against my brother; I and my brother against my cousin; I, my brother, and my cousin "
    "against the stranger'. When a murder occurred, the victim's lineage was bound by honor to launch a 'Blood Feud' (vendetta) against the killer's "
    "lineage. To prevent endless reciprocal bloodshed, the sacred 'Leopard-Skin Chief' (Kuar Twac) intervened. Possessing no secular political or "
    "military power, the Leopard-Skin Chief offered holy sanctuary to the killer and negotiated blood-wealth compensation (typically 40 to 50 head of cattle), "
    "performing sacrificial rites to purify blood pollution and restore social equilibrium."
)
P2_M13_QS = [
    case_q("Political Anthropology: Law, Order and Social Control", "Acephalous Society Political Organization",
     "In political anthropology, the Nuer society analyzed by Evans-Pritchard is classified as which type of political system?",
     "An Acephalous (uncentralized) Segmentary Lineage society lacking a central government, courts, or police",
     ["A centralized autocratic monarchy ruled by a divine king",
      "A modern constitutional representative democracy",
      "A military junta commanded by professional army generals"],
     "The Nuer are the classic ethnographic archetype of an acephalous (headless) tribal society organized through segmentary lineages."),
    case_q("Political Anthropology: Law, Order and Social Control", "Principle of Complementary Opposition",
     "What is the structural operational principle of 'Complementary Opposition' in the Nuer segmentary lineage system?",
     "Lineages feud with one another at minor levels, but instantly unite and fuse into a larger coalition when threatened by a more distant rival",
     ["Lineages remain permanently at war with everyone until all humans are dead",
      "Lineages are forced to surrender all weapons to the chief",
      "Lineages divide into two political parties that vote in parliament"],
     "Complementary opposition balances fission and fusion: segments oppose each other internally, but fuse against external challenges."),
    case_q("Political Anthropology: Law, Order and Social Control", "Role of the Leopard-Skin Chief",
     "What was the specific ritual role of the 'Leopard-Skin Chief' (Kuar Twac) among the Nuer?",
     "A sacred, non-coercive ritual mediator who provides sanctuary to a murderer and negotiates cattle blood-wealth compensation to resolve blood feuds",
     ["A secular military general who commands a private army",
      "A tax collector who confiscates grain for the imperial government",
      "A high court judge who sentences criminals to prison"],
     "The Leopard-Skin Chief holds sacred spiritual authority: mediating peace between feuding lineages and arranging cattle compensation."),
    case_q("Political Anthropology: Law, Order and Social Control", "Blood-Wealth Compensation Currency",
     "What traditional valuable was universally used as blood-wealth compensation to settle a Nuer homicide and avert a blood feud?",
     "Cattle (typically 40 to 50 cows and bulls)",
     ["Gold and silver coins", "Polished iron handaxes", "Bales of imported European wool"],
     "In the bovine-centered Nuer economy, blood wealth was paid exclusively in cattle, compensating the victim's lineage for the lost member."),
    case_q("Political Anthropology: Law, Order and Social Control", "Dynamics of the Blood Feud",
     "In tribal customary law, how does an institutionalized 'Blood Feud' differ from lawless chaotic violence?",
     "It is a regulated, socially sanctioned retaliation between corporate lineages governed by strict rules of vengeance and established mechanisms for peaceful settlement",
     ["It is completely random killing with zero social rules",
      "It is an organized sport played for entertainment",
      "It is conducted only by foreign mercenaries"],
     "A blood feud is structural legal warfare between corporate lineages: bounded by customary codes, limited in scope, and terminable by compensation.")
]

# ==============================================================================
# MOCK 14 PASSAGES
# ==============================================================================
P1_M14_TXT = (
    "Read the following case study on Dermatoglyphic Patterns in Biological and Forensic Anthropology, "
    "and answer the questions that follow:\\n\\n"
    "Dermatoglyphics (derived from Greek derma = skin, glyph = carving) is the scientific study of the ridged epidermal patterns on the "
    "palms, fingers, soles, and toes of primates. First systematically investigated by Sir Francis Galton in his 1892 treatise 'Finger Prints', "
    "epidermal ridge patterns form during the 10th to 16th weeks of human embryonic intrauterine development, governed by complex polygenic "
    "inheritance. Once fully formed by the 24th fetal week, dermatoglyphic configurations remain permanently unalterable throughout life, "
    "growing in scale with somatic growth but preserving identical microscopic detail until post-mortem decomposition. Galton classified "
    "fingerprint patterns into three primary morphological categories: Arches (plain and tented; lacking triradii), Loops (ulnar and radial; "
    "possessing one triradius), and Whorls (concentric, spiral, and double-loop; possessing two or more triradii). In quantitative analysis, "
    "anthropologists calculate the Total Finger Ridge Count (TFRC) by counting ridges intersecting a straight line drawn from the triradial "
    "core to the center of the pattern. Dermatoglyphics serves as an indispensable tool in forensic identification, population genetic studies "
    "of ethnic variation, and clinical medical diagnosis: individuals with chromosomal anomalies such as Down Syndrome (Trisomy 21) frequently "
    "exhibit distinctive dermatoglyphic markers, including a high frequency of ulnar loops, a distal axial triradius (t''), and a single transverse "
    "palmar crease (simian crease)."
)
P1_M14_QS = [
    case_q("Dermatoglyphics and Anthropometric Indices", "Pioneer of Fingerprint Classification",
     "Which eminent 19th-century polymath established the scientific foundation of dermatoglyphics and fingerprint classification in 1892?",
     "Sir Francis Galton",
     ["Charles Darwin", "Gregor Mendel", "Karl Landsteiner"],
     "Sir Francis Galton published 'Finger Prints' in 1892, demonstrating the uniqueness, permanence, and classification of ridge patterns."),
    case_q("Dermatoglyphics and Anthropometric Indices", "Developmental Permanence of Dermatoglyphics",
     "When are human dermatoglyphic epidermal ridge configurations established during life, and how do they change over time?",
     "They are permanently formed in the womb by the 16th to 24th week of fetal gestation and remain immutable throughout life until decomposition",
     ["They change completely every seven years like human red blood cells",
      "They are formed at puberty under the influence of testosterone and estrogen",
      "They can be permanently altered by eating citrus fruits"],
     "Dermatoglyphic patterns are fixed in early fetal gestation, preserving identical ridge characteristics throughout an individual's lifespan."),
    case_q("Dermatoglyphics and Anthropometric Indices", "Three Primary Galtonian Pattern Categories",
     "What are the three fundamental morphological pattern categories of fingerprints identified by Galton?",
     "Arches (0 triradii), Loops (1 triradius), and Whorls (2 or more triradii)",
     ["Squares, Circles, and Triangles", "Stripes, Dots, and Waves", "Spirals, Zigzags, and Diamonds"],
     "Galton categorized fingerprints by triradius count: Arches have 0 triradii, Loops have 1 triradius, and Whorls have 2 or more triradii."),
    case_q("Dermatoglyphics and Anthropometric Indices", "Total Finger Ridge Count (TFRC) Methodology",
     "In quantitative dermatoglyphic analysis, how is the 'Total Finger Ridge Count' (TFRC) determined?",
     "By counting the number of dermal ridges crossing a line between the triradius and the core on all ten fingers",
     ["By measuring the length of the fingernails in millimeters",
      "By counting the number of hairs on the back of the hand",
      "By measuring the surface area of the palm with a ruler"],
     "TFRC counts the epidermal ridges intersecting a line from the triradius to the pattern core across all ten digits."),
    case_q("Dermatoglyphics and Anthropometric Indices", "Dermatoglyphic Markers in Down Syndrome",
     "Which characteristic palmar dermatoglyphic anomaly is strongly associated with Down Syndrome (Trisomy 21)?",
     "A single continuous transverse palmar crease (Simian Crease) and a distal axial triradius (t'')",
     ["The complete absence of all skin on the palms",
      "Formation of glowing phosphorescent fingerprints",
      "Square-shaped fingerprints with zero loops"],
     "Down syndrome is characterized clinically by a high distal palmar axial triradius (t'') and a single transverse simian flexion crease.")
]

P2_M14_TXT = (
    "Read the following excerpt on the Kula Ring Ceremonial Exchange of the Trobriand Islands (Malinowski), "
    "and answer the questions that follow:\\n\\n"
    "In his monumental 1922 classic 'Argonauts of the Western Pacific', Bronislaw Malinowski detailed the intricate, inter-tribal "
    "ceremonial exchange network of the Trobriand Islanders known as the 'Kula Ring'. The Kula spans a massive geographic ring of coral "
    "islands in eastern Papua New Guinea, requiring hazardous ocean voyages in outrigger canoes across open sea. Two specific sacred shell "
    "valuables (Vaygu'a) circulate continuously in opposite directions through the archipelago: 'Soulava' (long necklaces of red spondylus shell "
    "discs) travel clockwise, while 'Mwali' (heavy armbands carved from white conus shells) travel counter-clockwise. Kula items are not used "
    "as everyday commercial currency; they are never kept permanently and have no utilitarian economic function. Instead, they are held "
    "temporarily (for months or years) to enhance the possessor's personal renown, historical prestige, and moral fame, accumulating individual "
    "biographies and names as they pass through famous chiefs. The Kula operates on strict balanced reciprocity: an exchange partner must return "
    "an equivalent valuable in due course. Alongside the sacred, dignified Kula partnership, islanders simultaneously conduct 'Gimwali'—an "
    "unceremonious, utilitarian market trade involving hard bargaining and haggling for essential subsistence goods like yams, pots, and mats."
)
P2_M14_QS = [
    case_q("Economic Anthropology: Primitive Economy and Exchange", "Circulating Valuables and Directions in the Kula Ring",
     "In the Trobriand Kula Ring, what two sacred shell valuables circulate, and in which specific directions do they travel?",
     "Soulava (red shell necklaces) travel clockwise, and Mwali (white shell armbands) travel counter-clockwise",
     ["Gold coins travel clockwise, and silver coins travel counter-clockwise",
      "Soulava travel north, and Mwali travel south",
      "Fresh yams travel clockwise, and clay pots travel counter-clockwise"],
     "Soulava (red spondylus necklaces) circulate clockwise; Mwali (white conus armbands) circulate counter-clockwise across the archipelago."),
    case_q("Economic Anthropology: Primitive Economy and Exchange", "Non-Utilitarian Nature of Kula Valuables",
     "What is the economic nature and function of Kula shell valuables (Vaygu'a)?",
     "They have no everyday utilitarian utility and cannot be kept permanently; they are temporary prestige tokens conferring social renown and renown",
     ["They are spent like paper money to purchase daily groceries in markets",
      "They are melted down in furnaces to manufacture bronze weapons",
      "They are eaten as emergency medicine during famines"],
     "Kula valuables are non-commercial status objects: held temporarily to accrue fame and history, cementing lifelong inter-island partnerships."),
    case_q("Economic Anthropology: Primitive Economy and Exchange", "Kula Exchange versus Gimwali Trade",
     "How did Malinowski sharply distinguish the sacred 'Kula' exchange from everyday 'Gimwali' trade?",
     "Kula is an honorable ceremonial gift partnership without haggling; Gimwali is straightforward commercial barter characterized by sharp bargaining and haggling",
     ["Kula is conducted only by women, while Gimwali is conducted by men",
      "Gimwali uses paper money, while Kula uses gold coins",
      "There is no difference; Malinowski considered them identical"],
     "Malinowski contrasted Kula (noble ceremonial gift partnership) with Gimwali (ordinary utilitarian barter involving haggling and profit)."),
    case_q("Economic Anthropology: Primitive Economy and Exchange", "Reciprocity Principle Governing Kula",
     "What principle of reciprocity governs the return of Kula valuables between inter-island exchange partners?",
     "Balanced Reciprocity: a partner who receives a Mwali armband is obligated to return an equivalent Soulava necklace after an appropriate interval",
     ["Negative Reciprocity: trying to steal the valuable and sail away forever",
      "Generalized Reciprocity: expecting zero return ever",
      "Commercial price auctions driven by cash supply and demand"],
     "Kula operates on balanced reciprocity: gifts cannot be bought or bartered; they must be matched by an equivalent return gift in the opposite circuit."),
    case_q("Economic Anthropology: Primitive Economy and Exchange", "Ocean Voyages in the Kula Expedition",
     "What hazardous technological enterprise was central to participating in Kula expeditions across the Massim archipelago?",
     "Constructing seaworthy outrigger sailing canoes (Masawa) and undertaking dangerous long-distance open-ocean navigation",
     ["Riding on commercial steamships operated by the British navy",
      "Building concrete highway bridges between coral islands",
      "Traveling in underground railway tunnels under the ocean"],
     "Kula required extensive communal labor to build outrigger canoes, accompanied by intricate canoe-building magic for overseas safety.")
]

# ==============================================================================
# MOCK 15 PASSAGES
# ==============================================================================
P1_M15_TXT = (
    "Read the following case study on Mesolithic Adaptations at Bagor and the Ganga Valley Sites, "
    "and answer the questions that follow:\\n\\n"
    "The onset of the warm, humid Holocene epoch (~10,000 BCE) stimulated widespread human technological and economic transformations "
    "across the Indian subcontinent. In Rajasthan, the large open-air settlement of 'Bagor' on the Kothari River (Bhilwara district), excavated "
    "by V.N. Misra, revealed the largest and most complete Mesolithic cultural sequence in India. Phase I at Bagor (radiocarbon-dated from ~5000 "
    "to 2800 BCE) yielded hundreds of thousands of tiny, exquisitely fashioned geometric microliths (triangles, trapezes, and crescents) made on "
    "quartz and chert, stone-paved living floors, circular stone alignments of windbreaks, and human burials oriented west-to-east. Crucially, "
    "faunal analysis revealed that alongside wild game (blackbuck, chital, wild boar), over 60% of the animal bones belonged to domesticated sheep "
    "and goats, proving an early pastoral-hunting economy. Simultaneously in the central Ganga Valley of Uttar Pradesh, excavations at Sarai Nahar "
    "Rai, Mahadaha, and Damdama by G.R. Sharma and Allahabad University uncovered extensive Mesolithic occupations beside oxbow lakes. Damdama "
    "yielded 41 human burials, including double burials of males and females, adorned with polished deer antler earrings and bone bead necklaces, "
    "hearths with charred wild plant grains, and heavy sandstone querns and mullers for grinding wild seeds."
)
P1_M15_QS = [
    case_q("Mesolithic Cultures: Microlithic Technology and Hunting-Foraging", "Bagor Excavator and River Location",
     "The premier Mesolithic site of Bagor is located on the Kothari River in Rajasthan and was excavated by which renowned archaeologist?",
     "V.N. Misra",
     ["H.D. Sankalia", "Robert Bruce Foote", "V.S. Wakankar"],
     "Virendra Nath Misra excavated Bagor on the Kothari River, uncovering India's most extensive Mesolithic habitation sequence."),
    case_q("Mesolithic Cultures: Microlithic Technology and Hunting-Foraging", "Faunal Composition of Bagor Phase I",
     "What profound economic transition was revealed by the animal bone assemblages from Phase I at Bagor?",
     "Over 60% of the faunal remains belonged to domesticated sheep and goats, proving early pastoral animal husbandry alongside hunting",
     ["The complete absence of any animal hunting",
      "The exclusive presence of domesticated woolly mammoths",
      "Zero evidence of domesticated animals"],
     "Bagor Phase I proved that early pastoralism (domestic sheep/goats) was integrated with microlithic hunting in western India by 5000 BCE."),
    case_q("Mesolithic Cultures: Microlithic Technology and Hunting-Foraging", "Ganga Valley Mesolithic Sites Complex",
     "Which cluster of sites excavated in the Pratapgarh district of Uttar Pradesh provided rich evidence of Ganga Valley Mesolithic foragers?",
     "Sarai Nahar Rai, Mahadaha, and Damdama",
     ["Harappa, Mohenjo-daro, and Kalibangan", "Burzahom and Gufkral", "Attirampakkam and Pallavaram"],
     "Sarai Nahar Rai, Mahadaha, and Damdama revealed lakeside Mesolithic foraging settlements in the Ganga valley."),
    case_q("Mesolithic Cultures: Microlithic Technology and Hunting-Foraging", "Body Ornamentation in Ganga Valley Burials",
     "What unique personal body ornaments were discovered adorning human skeletons in Mesolithic graves at Mahadaha and Damdama?",
     "Carved deer antler earrings and perforated disc beads made of bone",
     ["Solid gold royal crowns and diamond rings", "Glass bead necklaces imported from Venice", "Iron armor breastplates"],
     "Skeletons at Mahadaha were adorned with necklaces and earrings carved from split deer antler, proving early aesthetic body ornamentation."),
    case_q("Mesolithic Cultures: Microlithic Technology and Hunting-Foraging", "Querns and Mullers Significance",
     "The discovery of heavy sandstone grinding slabs (querns) and mullers in Mesolithic levels at Damdama proves that foragers were:",
     "Intensively collecting, processing, and grinding wild plant grass seeds and tubers for food prior to agriculture",
     ["Manufacturing synthetic gunpowder for hunting", "Grinding iron ores for industrial steel factories", "Crushing gold to make coins"],
     "Grinding slabs at Damdama prove intensive harvesting of wild botanical resources, foreshadowing the Neolithic farming transition.")
]

P2_M15_TXT = (
    "Read the following excerpt on M.N. Srinivas and the Concept of the 'Dominant Caste', "
    "and answer the questions that follow:\\n\\n"
    "In his sociological study of Rampura village in Mysore (Karnataka), sociologist M.N. Srinivas formulated the influential concept "
    "of the 'Dominant Caste', published in his 1959 paper 'The Dominant Caste in Rampura'. Colonial and textual scholars had long assumed "
    "that ritual purity strictly determined power in rural India, placing Brahmins at the undisputed apex of all village authority. Srinivas "
    "demonstrated that in real village politics, secular power and dominance were held by intermediate non-Brahmin cultivating castes. Srinivas "
    "defined a caste as 'Dominant' when it possesses four decisive characteristics: first, decisive numerical strength (constituting a large "
    "proportion of the village population); second, economic power through substantial ownership of cultivable agricultural land; third, political "
    "power and representation in local institutions; and fourth, a relatively high or respectable ritual status in the local hierarchy. In Rampura, "
    "the peasant caste of Okkaligas owned over 70% of the cultivable land, commanded decisive numbers, and settled village disputes, exercising "
    "patronage over both lower service castes and ritually higher Brahmins. Srinivas noted that when a caste achieves dominance, it frequently "
    "undergoes 'Sanskritization', emulating twice-born Sanskritic rituals to align its ritual prestige with its secular economic dominance."
)
P2_M15_QS = [
    case_q("Social Stratification, Caste and Jajmani System", "Formulator of Dominant Caste Concept",
     "Which eminent Indian sociologist formulated the foundational concept of the 'Dominant Caste' based on his study of Rampura village?",
     "M.N. Srinivas",
     ["G.S. Ghurye", "Louis Dumont", "Andre Beteille"],
     "M.N. Srinivas formulated the concept of the Dominant Caste based on his fieldwork in Rampura village (Karnataka)."),
    case_q("Social Stratification, Caste and Jajmani System", "Four Criteria of a Dominant Caste",
     "What four interrelated criteria did M.N. Srinivas specify as defining a 'Dominant Caste' in a local rural area?",
     "Decisive numerical strength, ownership of agricultural land, political power, and a relatively respectable ritual status",
     ["High Vedic education, royal European ancestry, urban business wealth, and white skin",
      "Only high Brahmin ritual purity, regardless of land ownership or population size",
      "Ownership of modern industrial factories and nuclear weapons"],
     "A dominant caste combines numerical preponderance, agricultural land ownership, political clout, and respectable ritual rank."),
    case_q("Social Stratification, Caste and Jajmani System", "Dominant Caste in Rampura Village",
     "In Srinivas's field study of Rampura village in Karnataka, which intermediate cultivating caste exercised decisive dominance?",
     "The Okkaligas (Peasants)",
     ["The Smartha Brahmins", "The Lingayats", "The Holeyas"],
     "The Okkaligas were the dominant caste in Rampura: owning most agricultural land and dominating the traditional panchayat."),
    case_q("Social Stratification, Caste and Jajmani System", "Secular Power versus Ritual Status",
     "How did Srinivas's concept of the Dominant Caste challenge the classical book-view of the Indian caste hierarchy?",
     "It proved that real power in Indian villages does not belong automatically to high-ritual Brahmins, but to intermediate landowning cultivating castes",
     ["It proved that caste was completely abolished in ancient India",
      "It showed that untouchables owned all the land in rural India",
      "It proved that caste had no relationship to religion"],
     "Srinivas separated secular power from ritual rank: intermediate landowning castes wield actual village power over both priests and laborers."),
    case_q("Social Stratification, Caste and Jajmani System", "Relationship Between Dominance and Sanskritization",
     "What sociological dynamic frequently occurs when an intermediate caste achieves economic land dominance in a region?",
     "It undergoes 'Sanskritization', adopting twice-born vegetarianism, rituals, and sacred myths to elevate its ritual standing",
     ["It completely abandons all religion and converts to modern atheism",
      "It voluntarily gives away all its agricultural land to the government",
      "It changes its biological racial classification"],
     "Caste mobility: newly dominant castes Sanskritize their lifestyle (vegetarianism, rituals) to translate secular economic power into ritual rank.")
]

# ==============================================================================
# MOCK 16 PASSAGES
# ==============================================================================
P1_M16_TXT = (
    "Read the following case study on Shanidar Cave and Neanderthal Social Compassion and Burials, "
    "and answer the questions that follow:\\n\\n"
    "Between 1953 and 1960, American archaeologist Ralph Solecki of Columbia University excavated the vast limestone cave of Shanidar "
    "in the Zagros Mountains of Iraqi Kurdistan. Sealed beneath rockfalls were the fossil skeletons of ten Neanderthals (Homo neanderthalensis) "
    "dating to between 65,000 and 35,000 years ago (Middle Paleolithic / Mousterian). The Shanidar discoveries provided some of the most "
    "poignant empirical evidence for social compassion, disability care, and intentional funerary rituals among archaic humans. The skeleton of "
    "'Shanidar 1' represented an elderly adult male (approx. 40–50 years old) who suffered catastrophic physical trauma early in life: a crushing "
    "blow to the left side of his face blinding him in the left eye, an amputated or withered right arm, and severe degenerative arthritis in his "
    "legs and feet. Solecki noted that in a harsh Pleistocene environment, this severely disabled, one-armed, half-blind man could not hunt and "
    "could only have survived for decades through group altruism, food sharing, and compassionate provisioning by his Neanderthal band. Nearby, "
    "'Shanidar 4' (the 'Flower Burial') was excavated in a shallow pit surrounded by concentrated clusters of fossil pollen from wild spring "
    "medicinal flowers (yarrow, cornflower, groundsel), which Solecki interpreted as deliberate floral offerings placed over the deceased."
)
P1_M16_QS = [
    case_q("Neanderthals and Anatomically Modern Homo sapiens", "Shanidar Cave Location and Excavator",
     "Shanidar Cave is located in the Zagros Mountains of Iraqi Kurdistan and was excavated by which prominent archaeologist?",
     "Ralph Solecki",
     ["Louis Leakey", "Donald Johanson", "Raymond Dart"],
     "Ralph Solecki excavated Shanidar Cave in northern Iraq, uncovering 10 Neanderthal skeletons dating to the Middle Paleolithic."),
    case_q("Neanderthals and Anatomically Modern Homo sapiens", "Evidence of Social Altruism in Shanidar 1",
     "Why does the skeleton of 'Shanidar 1' provide compelling proof of social compassion and care among Neanderthals?",
     "The individual survived for decades despite severe crippling injuries (blindness in one eye, amputated right arm, severe arthritis), requiring group care and provisioning",
     ["He had two iron artificial robotic legs",
      "He was buried with a printed medical manual written in Latin",
      "He was found living in a modern medical hospital"],
     "Shanidar 1 survived extensive, debilitating trauma for decades, which was impossible in ice-age foraging without collective social support."),
    case_q("Neanderthals and Anatomically Modern Homo sapiens", "The 'Flower Burial' (Shanidar 4)",
     "What archaeological evidence led Ralph Solecki to formulate the famous 'Flower Burial' hypothesis for Shanidar 4?",
     "The discovery of concentrated clusters of fossil pollen grains from wild spring medicinal flowers surrounding the flexed skeleton",
     ["A bouquet of modern plastic flowers placed on the skull",
      "A painted fresco of flowers on the cave wall",
      "A collection of perfume bottles buried in the grave"],
     "Palynological analysis by Leroi-Gourhan revealed clumps of flower pollen (yarrow, cornflower), interpreted as intentional floral offerings."),
    case_q("Neanderthals and Anatomically Modern Homo sapiens", "Cultural Epoch of Shanidar Neanderthals",
     "Which prehistoric lithic industry and cultural period is associated with the Neanderthal occupation at Shanidar Cave?",
     "The Mousterian Industry of the Middle Paleolithic (Mode 3)",
     ["The Oldowan Pebble Industry of the Lower Paleolithic",
      "The Solutrean Industry of the Upper Paleolithic",
      "The Harappan Bronze Age Culture"],
     "Shanidar Neanderthals manufactured Middle Paleolithic Mousterian tools, including Levallois points, scrapers, and denticulates."),
    case_q("Neanderthals and Anatomically Modern Homo sapiens", "Neanderthal Intentional Mortuary Practices",
     "What overarching conclusion regarding Neanderthal cognition was established by the Shanidar burials alongside European sites?",
     "Neanderthals possessed symbolic consciousness and intentionally buried their dead in excavated graves accompanied by mortuary rituals",
     ["Neanderthals were unthinking animals who abandoned dead bodies to wild hyenas",
      "Neanderthals burned all dead bodies in high-temperature cremation ovens",
      "Neanderthals had no knowledge that death existed"],
     "Deliberately excavated pits, grave goods, and arranged bodies prove Neanderthals practiced intentional burial and emergent symbolic thought.")
]

P2_M16_TXT = (
    "Read the following excerpt on the Santhal Hul (1855–1856) Tribal Rebellion in Eastern India, "
    "and answer the questions that follow:\\n\\n"
    "On June 30, 1855, over 10,000 Santhals gathered at the village of Bhagnadih in the Rajmahal hills of modern Jharkhand, answering the "
    "revolutionary call of the four Murmu brothers: Sidhu, Kanhu, Chand, and Bhairav. The Santhals had originally been settled by the British East "
    "India Company in the tract known as 'Damin-i-Koh' (Skirt of the Hills) to clear dense hardwood forests and bring land under revenue cultivation. "
    "However, within decades, the Santhals were ensnared in a web of merciless exploitation by non-tribal moneylenders (Mahajans) and corrupt "
    "Darogas (police officials). Mahajans charged usurious compound interest of 50% to 500%, manipulated measuring weights (using heavier 'Ken' "
    "to collect grain and lighter 'Bich' to sell grain), and seized ancestral lands and cattle, reducing families to unfree bonded labor (Kamioti). "
    "Sidhu and Kanhu declared divine inspiration, proclaiming that the supreme deity 'Thakur Bonga' had ordered them to eliminate the Dikus and "
    "establish an independent Santhal Raj. Armed with bows, arrows, and battle-axes, the Santhal rebels launched the 'Santhal Hul' (Rebellion), "
    "paralyzing British administration across Birbhum, Bankura, and Bhagalpur. The British mobilized troops and declared martial law, brutally "
    "suppressing the revolt and martyring over 15,000 Santhals. In the aftermath, the British enacted the Santhal Parganas Tenancy Act (SPTA) of 1876 "
    "and created the non-regulation district of Santhal Parganas to protect tribal lands from future alienation."
)
P2_M16_QS = [
    case_q("Tribal Movements and Uprisings in India", "Leaders of the Santhal Hul (1855)",
     "Who were the four heroic brothers who led the historic Santhal Hul (Rebellion) against British rule in 1855?",
     "Sidhu, Kanhu, Chand, and Bhairav Murmu",
     ["Birsa, Sugana, and Komta Munda", "Buddho Bhagat and Jatra Bhagat", "Gunda Dhur and Alluri Sitarama Raju"],
     "The Santhal Hul was led by the four Murmu brothers from Bhagnadih: Sidhu, Kanhu, Chand, and Bhairav in June 1855."),
    case_q("Tribal Movements and Uprisings in India", "Colonial Territory: Damin-i-Koh",
     "What was 'Damin-i-Koh', the geographical territory in the Rajmahal hills where the Santhal rebellion originated?",
     "A special forested tract demarcated by the British East India Company in 1832 to settle Santhals as agricultural revenue cultivators",
     ["A deep coal mine in the Chotanagpur plateau", "A military naval fortress in the Bay of Bengal", "A private royal palace for the Viceroy"],
     "Damin-i-Koh was demarcated in 1832 to settle forest-clearing Santhals, who were subsequently exploited by usurious moneylenders."),
    case_q("Tribal Movements and Uprisings in India", "Exploitation by Mahajans and Darogas",
     "What primary economic grievance drove the Santhals to launch their armed insurrection in 1855?",
     "Exorbitant usurious interest rates, fraudulent measuring weights (Ken and Bich), land forfeiture, and bonded servitude by Mahajans and corrupt police",
     ["Demands for the immediate introduction of computerized education",
      "Disputes over the price of tickets on British passenger steamships",
      "A total ban on hunting birds by the United Nations"],
     "Usurious debt traps, false weights, land expropriation, and police extortion drove the Santhals to armed rebellion against Dikus and the British."),
    case_q("Tribal Movements and Uprisings in India", "Religious Justification: Thakur Bonga",
     "How did leaders Sidhu and Kanhu Murmu mobilize tribal warriors across hundreds of villages?",
     "By declaring that the supreme deity 'Thakur Bonga' had appeared to them in visions, commanding them to overthrow British rule and establish Santhal Raj",
     ["By paying every warrior a high cash salary in gold coins",
      "By sending official telegrams to London asking for independence",
      "By broadcasting radio messages across northern India"],
     "Sidhu and Kanhu claimed divine sanction from Thakur Bonga, mobilizing thousands of warriors through spiritual prophecy and circulating sal branches."),
    case_q("Tribal Movements and Uprisings in India", "Administrative Outcome of the Santhal Hul",
     "What major administrative and legislative concession was granted by the British following the suppression of the Santhal Hul?",
     "The creation of the separate non-regulation district of 'Santhal Parganas' and enactment of special tenancy laws protecting tribal land tenure",
     ["The complete deportation of all Santhal people to the Andaman Islands",
      "The annexation of all Santhal lands by the city of Calcutta",
      "The complete abolition of the Santhali language"],
     "The British created the protected district of Santhal Parganas under Act 37 of 1855, passing tenancy laws to prevent non-tribal land seizure.")
]

# ==============================================================================
# MOCK 17 PASSAGES
# ==============================================================================
P1_M17_TXT = (
    "Read the following case study on Burzahom and the Northern Neolithic Culture of Kashmir, "
    "and answer the questions that follow:\\n\\n"
    "Perched on an ancient pleistocene Karewa terrace overlooking Dal Lake near Srinagar in the Kashmir Valley, the prehistoric site of "
    "'Burzahom' (literally 'Place of Birch Trees' in Kashmiri) was first noticed by H. de Terra and T.T. Paterson in 1935 and systematically "
    "excavated by T.N. Khazanchi of the Archaeological Survey of India between 1960 and 1971. Burzahom represents the type-site of the unique "
    "'Northern Neolithic' cultural tradition, radiocarbon-dated from ~3000 BCE to 1500 BCE. Phase I (Aceramic Neolithic) is world-famous for its "
    "distinctive 'Subterranean Pit Dwellings': circular or oval pits dug deep into the yellow Karewa loess soil, measuring up to 3 meters in depth and "
    "4 meters in diameter at the base, tapering toward a narrower mouth. Cut landing steps and ladders provided access, while post-holes around the "
    "mouth supported conical timber roofs plastered with birch bark and mud. These sunken pit houses provided vital thermal insulation against "
    "the freezing, snow-laden Himalayan winters. In Phase II (Ceramic Neolithic), dwellers moved to ground-level mud houses, manufacturing fine "
    "burnished grey pottery and an extraordinary toolkit of polished bone and antler implements (harpoons, needles, awls, chisels) and polished stone celts. "
    "Burzahom is also unique in world archaeology for its pet burials: domestic dogs, wolves, and ibex were buried alongside their human masters in formal graves."
)
P1_M17_QS = [
    case_q("Neolithic Revolution: Plant and Animal Domestication in India", "Burzahom Excavator and Geographic Region",
     "The iconic Neolithic site of Burzahom is situated in the Kashmir Valley and was systematically excavated by which ASI archaeologist?",
     "T.N. Khazanchi",
     ["V.S. Wakankar", "Robert Bruce Foote", "Jean-Francois Jarrige"],
     "T.N. Khazanchi of the ASI directed excavations at Burzahom between 1960 and 1971, uncovering Kashmir's prehistoric sequence."),
    case_q("Neolithic Revolution: Plant and Animal Domestication in India", "Architecture of Phase I Pit Dwellings",
     "What unique architectural adaptation characterized the earliest inhabitants (Phase I) at Burzahom?",
     "Subterranean circular or oval 'Pit Dwellings' dug into the loess soil with roof post-holes and landing steps, insulating against winter frost",
     ["Multi-story brick palaces with running indoor plumbing",
      "Floating bamboo rafts permanently anchored in Dal Lake",
      "Stone towers built on high granite peaks"],
     "Subterranean pit houses dug into Karewa loess provided crucial thermal shelter against harsh Himalayan winter blizzards."),
    case_q("Neolithic Revolution: Plant and Animal Domestication in India", "Burzahom Artifact Inventory",
     "What diagnostic tool types characterized the Neolithic cultural material recovered from Burzahom?",
     "Abundant polished bone tools (harpoons, needles, awls), polished stone celts, and perforated stone harvesting knives",
     ["Iron swords, bronze shields, and copper spears",
      "Cast-iron cannons and lead musket balls",
      "Machine-woven silk and cotton textiles"],
     "Burzahom yielded polished stone axes, unique perforated stone knives (harvesters showing Chinese ties), and prolific bone harpoons/needles."),
    case_q("Neolithic Revolution: Plant and Animal Domestication in India", "Unique Mortuary Custom: Animal Burials",
     "What distinctive burial custom uncovered at Burzahom is virtually unparalleled in the Indian Neolithic?",
     "Domestic dogs and wolves interred in formal burial pits alongside their human masters or in separate animal graves",
     ["Cremating human bodies and scattering ashes from airplanes",
      "Enclosing skeletons in solid gold sarcophagi",
      "Mummifying bodies in Egyptian linen"],
     "Burzahom graves frequently contain domestic dogs interred with their owners, reflecting close emotional companionship and ritual ties."),
    case_q("Neolithic Revolution: Plant and Animal Domestication in India", "Absence of Microliths in Northern Neolithic",
     "Unlike the Mesolithic and Neolithic cultures of Peninsular and Central India, the Northern Neolithic of Kashmir is characterized by:",
     "The near-total absence of microliths (tiny geometric blade tools)",
     ["The complete absence of bone tools", "The complete absence of agriculture", "The complete absence of human skeletons"],
     "The Kashmir Northern Neolithic completely bypassed the microlithic stage, transitioning from Late Pleistocene horizons directly to celt-bone technology.")
]

P2_M17_TXT = (
    "Read the following excerpt on the Panchayats (Extension to Scheduled Areas) Act (PESA), 1996, "
    "and answer the questions that follow:\\n\\n"
    "In 1992, the 73rd Constitutional Amendment Act established the three-tier Panchayati Raj system of democratic local self-government across "
    "rural India. However, recognizing the unique cultural traditions, community autonomy, and customary laws of indigenous tribal societies, "
    "Parliament excluded Fifth Schedule Scheduled Areas from its direct purview. To bridge this constitutional gap, the Government of India "
    "appointed the High-Level Committee headed by veteran tribal parliamentarian Dilip Singh Bhuria in 1994. The Bhuria Committee recommended that "
    "modern democratic decentralization must be harmonized with traditional tribal self-governance, recommending that the village 'Gram Sabha' "
    "(village assembly of all adult residents) be established as the sovereign cornerstone of tribal democracy. In December 1996, Parliament enacted "
    "the landmark 'Panchayats (Extension to the Scheduled Areas) Act' (PESA Act). PESA legally empowered the Gram Sabha in Fifth Schedule areas "
    "with revolutionary statutory prerogatives: the absolute ownership of Minor Forest Produce (MFP), mandatory prior consultation before any "
    "land acquisition for development projects, mandatory recommendation for granting mining leases for minor minerals, the power to enforce "
    "prohibition or regulate the sale of intoxicants, the power to prevent alienation of tribal lands and restore illegally alienated lands, and the "
    "safeguarding of traditional customs and customary dispute resolution."
)
P2_M17_QS = [
    case_q("Constitutional Safeguards, PESA, Forest Rights and PVTGs", "Committee Behind the PESA Act",
     "The PESA Act of 1996 was formulated and enacted based on the recommendations of which historic committee?",
     "The Dilip Singh Bhuria Committee (1994–1995)",
     ["The Balwant Rai Mehta Committee", "The Ashok Mehta Committee", "The Sarkaria Commission"],
     "The Dilip Singh Bhuria Committee drafted the framework extending democratic local governance to Fifth Schedule tribal areas."),
    case_q("Constitutional Safeguards, PESA, Forest Rights and PVTGs", "Core Democratic Institution Empowered by PESA",
     "What grassroots institution does the PESA Act establish as the sovereign, supreme authority in Fifth Schedule tribal areas?",
     "The village 'Gram Sabha' (assembly of all adult village residents)",
     ["The District Collector / Magistrate", "The State Police Department", "The Central Ministry of Mines"],
     "PESA makes the village Gram Sabha the supreme body: empowering community assemblies rather than top-down bureaucratic district panchayats."),
    case_q("Constitutional Safeguards, PESA, Forest Rights and PVTGs", "Ownership of Minor Forest Produce Under PESA",
     "Under Section 4(m)(ii) of the PESA Act, which economic right was formally transferred from the Forest Department to the Gram Sabha?",
     "The statutory ownership of Minor Forest Produce (MFP / NTFP) found within the village boundary",
     ["The ownership of all gold and uranium mines", "The ownership of all national commercial banks", "The right to collect international customs tariffs"],
     "PESA vested full statutory ownership of Minor Forest Produce (tendu, mahua, bamboo) in the Gram Sabha, transforming tribal rural economics."),
    case_q("Constitutional Safeguards, PESA, Forest Rights and PVTGs", "Mandatory Consultation for Land Acquisition",
     "What critical statutory safeguard does PESA provide to tribal communities prior to land acquisition for development or rehabilitation?",
     "Mandatory prior consultation with or consent of the Gram Sabha before land acquisition in Scheduled Areas",
     ["The Gram Sabha must be dissolved before any land can be acquired",
      "Villagers must be arrested before land surveys can begin",
      "No consultation is required with anyone"],
     "PESA mandates prior consultation with the Gram Sabha before land can be acquired in Fifth Schedule areas for developmental projects."),
    case_q("Constitutional Safeguards, PESA, Forest Rights and PVTGs", "Power Over Tribal Land Alienation",
     "What authority does PESA confer upon the Gram Sabha regarding the chronic problem of tribal land alienation?",
     "The power to prevent alienation of tribal land and to order the restoration of unlawfully alienated land to its original tribal owner",
     ["The power to sell all tribal land to multinational corporations",
      "The order to abolish all private and communal land ownership",
      "Zero powers; land matters are reserved strictly for the High Court"],
     "PESA equips Gram Sabhas with statutory authority to detect, prohibit, and restore illegally alienated tribal land back to Adivasis.")
]

# ==============================================================================
# MOCK 18 PASSAGES
# ==============================================================================
P1_M18_TXT = (
    "Read the following case study on the 'Turkana Boy' (KNM-WT 15000) and the Thermoregulatory Adaptation of Homo ergaster, "
    "and answer the questions that follow:\\n\\n"
    "In August 1984, fossil prospector Kamoya Kimeu, working with a team led by Richard Leakey and Alan Walker, discovered a small skull fragment "
    "on the banks of the Nariokotome River on the western shore of Lake Turkana in northern Kenya. Subsequent excavations uncovered 'Turkana Boy' "
    "(cataloged as KNM-WT 15000)—the most complete early hominin skeleton ever found, preserving approximately 90% of the entire skeleton. "
    "Radiometrically dated to 1.53 million years ago (Early Pleistocene), the specimen represents an adolescent male Homo ergaster (African Homo erectus) "
    "aged approximately 8 to 9 years at death (determined by dental micro-structure). If Turkana Boy had reached adulthood, he would have stood "
    "approximately 1.85 meters (6 feet) tall and weighed 68 kilograms. His cranial capacity was 880 cc (expanding to ~909 cc in adulthood). "
    "Most importantly, Turkana Boy revealed that by 1.6 million years ago, the genus Homo had abandoned the short, wide, ape-like torso of "
    "australopiths and evolved fully modern human body proportions: long, linear lower limbs, narrow hips, and an elongated barrel-shaped thorax. "
    "Physical anthropologists recognize this anatomy as an exquisite thermoregulatory adaptation obeying Allen's and Bergmann's ecogeographical rules: "
    "a tall, slender, linear body build maximizes surface area relative to body volume, facilitating radiant and convective heat dissipation in hot, "
    "open tropical savannas, coupled with abundant eccrine sweat glands to enable sustained endurance running in midday heat."
)
P1_M18_QS = [
    case_q("Evolution of Genus Homo: Homo habilis and Homo erectus", "Turkana Boy Discovery Locality and Team",
     "The 'Turkana Boy' (KNM-WT 15000) skeleton was discovered in 1984 at Nariokotome on Lake Turkana (Kenya) by a team led by:",
     "Richard Leakey, Alan Walker, and Kamoya Kimeu",
     ["Donald Johanson and Tom Gray", "Raymond Dart and Robert Broom", "Eugène Dubois"],
     "The remarkably complete Turkana Boy skeleton was discovered at Nariokotome, Kenya, by Kamoya Kimeu and Richard Leakey's team in 1984."),
    case_q("Evolution of Genus Homo: Homo habilis and Homo erectus", "Completeness of KNM-WT 15000",
     "What makes Turkana Boy an unparalleled fossil specimen in the history of paleoanthropology?",
     "It is the most complete early hominin skeleton ever uncovered, preserving approximately 90% of the total skeletal anatomy",
     ["It is made of pure solid gold", "It is the only fossil skull discovered with human hair attached", "It was found frozen inside a modern refrigerator"],
     "Preserving ~90% of the skeleton (including ribs, vertebrae, pelvis, and limbs), Turkana Boy revolutionized understanding of early Homo anatomy."),
    case_q("Evolution of Genus Homo: Homo habilis and Homo erectus", "Geological Antiquity and Cranial Volume",
     "What was the geological age and cranial brain capacity of the adolescent Turkana Boy?",
     "Dated to ~1.53 Million Years ago with a cranial capacity of approximately 880 cc",
     ["Dated to 10,000 years ago with a cranial capacity of 1,500 cc",
      "Dated to 50 million years ago with a cranial capacity of 100 cc",
      "Dated to 100,000 years ago with a cranial capacity of 2,000 cc"],
     "KNM-WT 15000 dates to 1.53 Ma with a cranial capacity of 880 cc, showing substantial encephalization over Australopithecus."),
    case_q("Evolution of Genus Homo: Homo habilis and Homo erectus", "Postcranial Body Proportions",
     "What revolutionary revelation regarding Homo ergaster postcranial anatomy was established by Turkana Boy?",
     "Early Homo had already evolved modern human postcranial body proportions: tall stature, long lower limbs, narrow hips, and barrel-shaped chest",
     ["Homo ergaster was a tiny dwarf creature with short legs that lived in trees",
      "Homo ergaster walked on four knuckles like a modern chimpanzee",
      "Homo ergaster possessed a massive tail for swinging on vines"],
     "Turkana Boy proved modern human postcranial architecture (long legs, narrow pelvis, barrel thorax) evolved by 1.6 Ma, suited for striding bipedalism."),
    case_q("Evolution of Genus Homo: Homo habilis and Homo erectus", "Thermoregulatory Adaptation to Savanna Heat",
     "According to Allen's and Bergmann's ecogeographical rules, why was the tall, slender, linear body build of Homo ergaster advantageous?",
     "It maximized surface area relative to body volume, facilitating convective heat loss and evaporative sweating under intense tropical savanna heat",
     ["It allowed hominins to curl into a tiny ball to survive freezing Arctic blizzards",
      "It allowed hominins to swim underwater for hours without breathing",
      "It made hominins invisible to wild carnivores"],
     "Linear body proportions maximize body surface area relative to mass, enabling heat dissipation and endurance running in hot tropical savannas.")
]

P2_M18_TXT = (
    "Read the following excerpt on Victor Turner's Theory of Liminality and Communitas, "
    "and answer the questions that follow:\\n\\n"
    "In 'The Forest of Symbols' (1967) and 'The Ritual Process: Structure and Anti-Structure' (1969), British symbolic anthropologist "
    "Victor Turner developed his famous theory of 'Liminality' and 'Communitas', drawing upon field research among the Ndembu of Zambia. "
    "Expanding on Arnold van Gennep's tripartite framework of Rites of Passage (Separation, Margin/Liminality, and Incorporation), Turner "
    "focused intensively on the middle, transitional phase—the 'Liminal' stage (from Latin limen, threshold). In the liminal state, ritual initiates "
    "are 'betwixt and between': they have been stripped of their previous secular status, but have not yet acquired their new status. They are "
    "structurally invisible, socially ambiguous, and possess no rank, property, or kinship markers. Turner revealed that this suspension of normal "
    "social structure generates a profound social condition he termed 'Communitas'—an intense, sacred, unstructured modality of social relationship "
    "characterized by radical equality, comradeship, and mutual human bonding. Communitas provides an essential antidote to the rigid hierarchy, "
    "differentiation, and alienation of everyday secular social structure, renewing the moral foundation of society before initiates are reincorporated."
)
P2_M18_QS = [
    case_q("Anthropology of Religion, Magic and Witchcraft", "Formulator of Liminality and Communitas",
     "Which prominent symbolic anthropologist formulated the influential concepts of 'Liminality' and 'Communitas' in 'The Ritual Process' (1969)?",
     "Victor Turner",
     ["Clifford Geertz", "Claude Levi-Strauss", "Bronislaw Malinowski"],
     "Victor Turner formulated the theories of Liminality and Communitas based on his symbolic analysis of Ndembu rituals in Zambia."),
    case_q("Anthropology of Religion, Magic and Witchcraft", "Definition of the Liminal Stage",
     "How did Victor Turner define the state of an individual occupying the 'Liminal Stage' of a rite of passage?",
     "As being 'betwixt and between' established social categories: stripped of secular status, rank, and property, existing in a state of structural ambiguity",
     ["As being crowned supreme political monarch of the state",
      "As being permanently expelled from human society forever",
      "As an ordinary citizen walking in a commercial marketplace"],
     "The liminal person is 'betwixt and between': no longer who they were, not yet who they will become, stripped of social markers."),
    case_q("Anthropology of Religion, Magic and Witchcraft", "Concept of Communitas",
     "What is 'Communitas' in Victor Turner's anthropological theory?",
     "An intense, sacred, and unstructured social bond of absolute equality, universal comradeship, and dissolution of hierarchical status",
     ["A formal commercial banking corporation that trades stocks",
      "A military alliance of nations fighting in international war",
      "A system of rigid caste discrimination enforced by police"],
     "Communitas is an egalitarian, unstructured modality of social togetherness: initiates share sacred equality and profound human solidarity."),
    case_q("Anthropology of Religion, Magic and Witchcraft", "Van Gennep's Tripartite Ritual Framework",
     "Victor Turner's analysis of liminality expanded upon the classical three-stage ritual model formulated in 1909 by which French anthropologist?",
     "Arnold van Gennep (Separation, Transition/Margin, and Incorporation)",
     ["Emile Durkheim", "Marcel Mauss", "Lucien Levy-Bruhl"],
     "Turner built upon Arnold van Gennep's 'The Rites of Passage' (1909), focusing on the transformative potential of the liminal middle phase."),
    case_q("Anthropology of Religion, Magic and Witchcraft", "Dialectic Between Structure and Anti-Structure",
     "What profound philosophical insight did Turner reach regarding the relationship between everyday social structure and Communitas (Anti-Structure)?",
     "Society requires a continuous dialectic: periodic immersion in unstructured Communitas purifies and renews the moral vitality of social structure",
     ["Communitas permanently destroys all human societies within 24 hours",
      "Social structure can exist forever without any need for ritual renewal",
      "Communitas is an illegal mental disease that must be eradicated"],
     "Turner posited that society needs both structure (order/roles) and anti-structure (Communitas) in alternating tension to remain morally healthy.")
]

# ==============================================================================
# MOCK 19 PASSAGES
# ==============================================================================
P1_M19_TXT = (
    "Read the following case study on the Bhimbetka Rock Art Heritage in Madhya Pradesh (V.S. Wakankar), "
    "and answer the questions that follow:\\n\\n"
    "Nestled in the rugged sandstone escarpments of the Vindhyan Range in Raisen district of Madhya Pradesh, approximately 45 kilometers "
    "south of Bhopal, lies 'Bhimbetka'—one of the world's most magnificent concentrations of prehistoric rock art. Discovered in 1957 by "
    "archaeologist Dr. Vishnu Shridhar Wakankar of Vikram University, Ujjain, the site encompasses over 750 rock shelters scattered across five "
    "densely forested hills, of which over 400 contain painted murals. In 2003, UNESCO inscribed Bhimbetka as a World Heritage Site. "
    "Stratigraphic excavations inside rock shelter III F-23 revealed an unbroken cultural sequence extending from the Late Acheulean (Lower Paleolithic) "
    "through the Middle Paleolithic, Upper Paleolithic, and Mesolithic, up to the historic period. Wakankar and subsequent rock art specialists "
    "established an artistic chronology spanning several successive periods. Period I (Upper Paleolithic) features massive, dynamic linear "
    "outline drawings of wild animals (bison, tigers, rhinoceroses, and wild boars) executed in dark red hematite and green pigments, often "
    "with geometric body infilling. Period II (Mesolithic) bursts into lively, smaller compositions depicting daily human life: communal group "
    "hunts with barbed bows and arrows, honey collection from tall cliffs, dancing in linked rows to drumbeats, and domestic family scenes. "
    "The mineral pigments (ochre and manganese oxide) reacted chemically with the porous sandstone and mineral crusts, fixing the art permanently for millennia."
)
P1_M19_QS = [
    case_q("Paleolithic Art: Parietal Cave Paintings and Mobiliary Art", "Discoverer of Bhimbetka Rock Art",
     "Who discovered the prehistoric rock shelters and cave paintings at Bhimbetka in Madhya Pradesh in 1957?",
     "Dr. Vishnu Shridhar Wakankar",
     ["H.D. Sankalia", "Robert Bruce Foote", "Sir John Marshall"],
     "Dr. V.S. Wakankar discovered the Bhimbetka rock art complex in 1957, bringing India's prehistoric art to global prominence."),
    case_q("Paleolithic Art: Parietal Cave Paintings and Mobiliary Art", "UNESCO World Heritage Recognition",
     "In which year was the Bhimbetka rock shelter complex officially inscribed as a UNESCO World Heritage Site?",
     "2003",
     ["1950", "1980", "2020"],
     "UNESCO declared Bhimbetka a World Heritage Site in 2003, recognizing its exceptional, continuous record of prehistoric art and habitation."),
    case_q("Paleolithic Art: Parietal Cave Paintings and Mobiliary Art", "Deep Stratigraphic Succession in III F-23",
     "What archaeological sequence was revealed by excavations in rock shelter III F-23 at Bhimbetka?",
     "An unbroken cultural succession extending from the Late Acheulean through Middle and Upper Paleolithic to the Mesolithic and Historic periods",
     ["Only modern 19th-century British military rifle cartridges",
      "A single Bronze Age Harappan seal-manufacturing workshop",
      "Zero prehistoric stone tools or habitation deposits"],
     "Excavations at Bhimbetka shelter III F-23 revealed an extraordinary four-meter stratigraphy from Acheulean bifaces to Mesolithic microliths."),
    case_q("Paleolithic Art: Parietal Cave Paintings and Mobiliary Art", "Subject Matter of Mesolithic Rock Art (Period II)",
     "What primary artistic themes distinguish the Mesolithic paintings (Period II) at Bhimbetka from the earlier Upper Paleolithic paintings?",
     "Dynamic narrative scenes of human social life: communal hunting with bows and arrows, honey-gathering, group dancing, and family domesticity",
     ["Portraits of Roman emperors and Greek mythological gods",
      "Detailed architectural diagrams of modern railway locomotives",
      "Paintings of steamships and naval battles"],
     "Mesolithic rock art at Bhimbetka shifts to dynamic human social scenes: communal hunts, ritual group dances, and domestic life."),
    case_q("Paleolithic Art: Parietal Cave Paintings and Mobiliary Art", "Permanent Fixation of Mineral Pigments",
     "Why have the vibrant red and green paintings on the open rock shelters of Bhimbetka survived for thousands of years exposed to weather?",
     "Natural iron oxide (hematite) and manganese pigments reacted chemically with silica in the porous sandstone, bonding permanently into the rock surface",
     ["The paintings were sealed under modern plastic sheets by museum conservators",
      "The rock shelters were heated in giant ovens to melt the paint",
      "The paintings were repainted every week by local villagers"],
     "Oxidation and chemical bonding of mineral pigments with sandstone quartz grains fixed the prehistoric paint permanently into the rock matrix.")
]

P2_M19_TXT = (
    "Read the following excerpt on Verrier Elwin's Tribal Philosophy and Jawaharlal Nehru's Tribal Panchsheel, "
    "and answer the questions that follow:\\n\\n"
    "At Independence, India faced a critical dilemma regarding its 104 million indigenous tribal citizens. Colonial administrators had "
    "favored a policy of 'Isolation', leaving tribes segregated in excluded areas as relict populations. Conversely, nationalist assimilationists "
    "(like sociologist G.S. Ghurye) advocated rapid 'Assimilation', viewing tribals as 'Backward Hindus' who should abandon their primitive ways "
    "and merge into the mainstream. Prime Minister Jawaharlal Nehru and British-born anthropologist Verrier Elwin rejected both extremes, formulating "
    "the enlightened 'Policy of Integration'. In 1958, in his celebrated Foreword to Verrier Elwin's 'A Philosophy for NEFA' (North-East Frontier "
    "Agency), Nehru articulated the 'Tribal Panchsheel'—five fundamental guiding principles for tribal administration: (1) People should develop along "
    "the lines of their own genius, and we should avoid imposing anything on them; (2) Tribal rights in land and forests should be respected; (3) We "
    "should try to train and build up a team of their own people to do the work of administration and development; (4) We should not over-administer "
    "these areas with too many outside schemes, but work through their own traditional and cultural institutions; and (5) We should judge results "
    "not by statistics or the amount of money spent, but by the quality of human character that is evolved."
)
P2_M19_QS = [
    case_q("Tribal Policies: Isolation, Assimilation and Panchsheel", "Panchsheel Author and Milestone Work",
     "Jawaharlal Nehru articulated his historic 'Tribal Panchsheel' in 1958 as the Foreword to which seminal anthropological book by Verrier Elwin?",
     "'A Philosophy for NEFA'",
     ["'The Muria and Their Ghotul'", "'The Baiga'", "'The Agaria'"],
     "Nehru's Tribal Panchsheel was published as the Foreword to Verrier Elwin's masterwork 'A Philosophy for NEFA' in 1958."),
    case_q("Tribal Policies: Isolation, Assimilation and Panchsheel", "Rejection of Isolation and Assimilation",
     "What 'middle path' did Nehru and Elwin champion, rejecting both colonial isolation and forced assimilation?",
     "The Policy of Integration: harmonizing modern developmental benefits with the preservation of tribal cultural autonomy and genius",
     ["The Policy of Apartheid and racial segregation", "The Policy of Total Deportation to foreign continents", "The Policy of Feudal Exploitation"],
     "Integration seeks to bring health and education while preserving tribal culture, avoiding both museum isolation and cultural destruction."),
    case_q("Tribal Policies: Isolation, Assimilation and Panchsheel", "First Principle of Tribal Panchsheel",
     "What is the foundational first principle of Nehru's Tribal Panchsheel?",
     "People should develop along the lines of their own genius, and we should avoid imposing anything on them",
     ["All tribal people must immediately abandon their traditional dress and language",
      "All tribal forests must be clear-cut to build commercial factories",
      "Tribal areas must be ruled exclusively by the military"],
     "Nehru's golden rule was non-imposition: encouraging tribal self-development along the lines of their own indigenous genius."),
    case_q("Tribal Policies: Isolation, Assimilation and Panchsheel", "Respect for Land and Forest Rights",
     "Which core economic principle of the Tribal Panchsheel remains the benchmark for modern tribal rights advocacy in India?",
     "Tribal rights in land and forests should be strictly respected",
     ["All tribal land should be sold to private mining corporations",
      "Tribals should be banned from touching any forest trees",
      "Tribal villagers should pay 90% of their crops in taxes"],
     "Principle 2 mandates that tribal rights over ancestral land and forest resources must be respected, prefiguring modern rights acts."),
    case_q("Tribal Policies: Isolation, Assimilation and Panchsheel", "Indigenous Administrative Capacity",
     "According to the third principle of Panchsheel, who should be primarily trained to administer development in tribal areas?",
     "A team of indigenous tribal people themselves, rather than flooding areas with outside administrators",
     ["Exclusively foreign civil servants from London", "Only retired corporate banking executives", "Military officers from foreign countries"],
     "Principle 3 emphasizes building indigenous leadership: training tribal youth to manage their own schools, clinics, and administrative offices.")
]

# ==============================================================================
# MOCK 20 PASSAGES
# ==============================================================================
P1_M20_TXT = (
    "Read the following case study on Inamgaon and the Jorwe Chalcolithic Culture of Maharashtra, "
    "and answer the questions that follow:\\n\\n"
    "Between 1968 and 1982, the Deccan College Post-Graduate and Research Institute (Pune), under the leadership of H.D. Sankalia, "
    "M.K. Dhavalikar, and Z.D. Ansari, carried out large-scale horizontal excavations at 'Inamgaon' on the Ghod River (a tributary of the "
    "Bhima) in Pune district of Maharashtra. Inamgaon is celebrated as the most comprehensively excavated Chalcolithic settlement in India, "
    "spanning three major cultural phases: Period I (Malwa Culture, ~1600–1400 BCE), Period II (Early Jorwe, ~1400–1000 BCE), and Period III "
    "(Late Jorwe, ~1000–700 BCE). In Period II (Early Jorwe), Inamgaon flourished as a regional center of over 130 mud-plastered rectangular "
    "houses, fortified with a massive mud rampart and diversionary irrigation canal. The diagnostic pottery is wheel-made 'Jorwe Ware': fine "
    "red-slipped pottery painted with geometric patterns in black, famous for its spouted tubular jars with flared rims and carinated bowls. "
    "Mortuary practices were striking: deceased infants were interred under house floors sealed inside two coarse red clay urns placed mouth-to-mouth "
    "in a north-to-south orientation. Adults were buried extended, often with their feet deliberately severed at the ankles (perhaps to prevent "
    "their ghosts from walking). In the center of the settlement, archaeologists uncovered a massive five-roomed house with an adjacent granary "
    "and a clay four-legged jar burial of an adult male in a seated posture—unmistakable evidence of an emerging ranked chiefdom society with hereditary leadership."
)
P1_M20_QS = [
    case_q("Chalcolithic Cultures and Megalithic Traditions in India", "Inamgaon Site and Excavators",
     "The landmark Chalcolithic site of Inamgaon is located on the Ghod River in Maharashtra and was excavated by which Deccan College team?",
     "H.D. Sankalia, M.K. Dhavalikar, and Z.D. Ansari",
     ["Robert Bruce Foote and Alexander Rea", "Sir John Marshall and Mortimer Wheeler", "V.S. Wakankar and S.C. Dube"],
     "Inamgaon was excavated horizontally over 14 seasons by Sankalia, Dhavalikar, and Ansari, revealing India's premier Chalcolithic sequence."),
    case_q("Chalcolithic Cultures and Megalithic Traditions in India", "Diagnostic Ceramic Ware of Jorwe Culture",
     "What diagnostic ceramic vessel form characterizes the painted 'Jorwe Ware' recovered at Inamgaon?",
     "Fine red-slipped ware painted in black with tubular spouted jars and carinated bowls",
     ["Black-and-Red Ware painted with white dots only",
      "Plain unbaked grey mud plates with zero paint",
      "Glazed blue porcelain vases imported from ancient China"],
     "Jorwe Ware is defined by wheel-turned fine red fabric, matt surface, painted black geometric motifs, and spouted funnel-necked jars."),
    case_q("Chalcolithic Cultures and Megalithic Traditions in India", "Infant Urn Burials Under House Floors",
     "What unique mortuary ritual was practiced for deceased infants in the Jorwe culture at Inamgaon?",
     "They were placed inside two coarse red clay urns joined mouth-to-mouth and buried beneath the house floor oriented north-to-south",
     ["They were launched into rivers in wooden floating canoes",
      "They were buried in deep iron cages on mountain tops",
      "They were cremated in commercial electric cremation furnaces"],
     "Jorwe mortuary custom buried dead babies inside two face-to-face clay urns beneath family house floors, accompanied by tiny funerary pots."),
    case_q("Chalcolithic Cultures and Megalithic Traditions in India", "Adult Skeletal Burials: Severed Feet",
     "What unusual skeletal modification was observed on many adult skeletons buried in pits at Inamgaon?",
     "The feet were deliberately chopped off at the ankles prior to burial, likely to prevent the ghost of the deceased from wandering",
     ["The skull was completely crushed with sledgehammers",
      "All ten fingers were replaced with copper needles",
      "The arms were tied behind the back with steel chains"],
     "Adults were buried extended north-south, often with feet severed at the ankles—interpreted by Dhavalikar as a ritual to prevent spirits from walking."),
    case_q("Chalcolithic Cultures and Megalithic Traditions in India", "Evidence of Social Stratification / Chiefdom",
     "What exceptional architectural and mortuary discovery at Inamgaon proved the emergence of a ranked Chiefdom society?",
     "A large five-room house in the village center with an adjacent granary and the burial of an adult male in a four-legged clay jar",
     ["An imperial marble palace built with Roman pillars",
      "An underground vault filled with millions of gold coins",
      "A monument with written inscriptions naming ancient kings"],
     "A 5-room central house with multi-bin granary and a 4-legged jar burial of an elite adult male proves institutionalized chiefdom ranking.")
]

P2_M20_TXT = (
    "Read the following excerpt on Particularly Vulnerable Tribal Groups (PVTGs) and the PM-JANMAN Scheme, "
    "and answer the questions that follow:\\n\\n"
    "In 1973, following the recommendations of the landmark Dhebar Commission (1960–1961), the Government of India created a special sub-category "
    "within Scheduled Tribes known as 'Primitive Tribal Groups' (PTGs), renamed in 2006 as 'Particularly Vulnerable Tribal Groups' (PVTGs). "
    "While general tribal communities experienced socio-economic progress, PVTGs represent the most marginalized, fragile, and relict "
    "populations requiring urgent affirmative protection. The Ministry of Tribal Affairs has identified 75 PVTGs across 18 States and the Union "
    "Territory of Andaman and Nicobar Islands, with the state of Odisha containing the highest number (13 PVTGs, including Bondo, Birhor, Juang, "
    "and Dongria Kondh). Four official criteria govern PVTG identification: (1) Pre-agricultural level of technology (hunting-gathering or shifting "
    "cultivation); (2) Stagnant or declining population; (3) Extremely low levels of literacy; and (4) Subsistence-level economic status. PVTGs "
    "confront grave challenges, including geographical isolation, acute food insecurity, high maternal/infant mortality, genetic blood disorders "
    "(sickle cell and G6PD deficiency), and loss of traditional habitats. In November 2023, on Janjatiya Gaurav Diwas, Prime Minister Narendra Modi "
    "launched the 'PM-JANMAN' (Pradhan Mantri Janjati Adivasi Nyaya Maha Abhiyan) with an outlay of Rs 24,104 crore to deliver saturated basic "
    "infrastructure—pucca housing, clean piped drinking water, electricity, all-weather roads, mobile health clinics, and nutrition—across all 75 PVTGs."
)
P2_M20_QS = [
    case_q("Constitutional Safeguards, PESA, Forest Rights and PVTGs", "Dhebar Commission and PVTG Origin",
     "Which commission's recommendations in 1960–1961 led the Government of India to create the special category of Primitive Tribal Groups (now PVTGs)?",
     "The U.N. Dhebar Commission",
     ["The Kaka Kalelkar Commission", "The Mandal Commission", "The Sarkaria Commission"],
     "The Dhebar Commission (1960–61) identified the extreme vulnerability of primitive groups, leading to the creation of the PTG/PVTG category."),
    case_q("Constitutional Safeguards, PESA, Forest Rights and PVTGs", "Number of Notified PVTGs and Leading State",
     "How many Particularly Vulnerable Tribal Groups (PVTGs) have been notified across India, and which state contains the highest number (13 PVTGs)?",
     "75 PVTGs across 18 States and 1 UT; Odisha has the highest number (13 PVTGs)",
     ["150 PVTGs; Madhya Pradesh has the highest number",
      "25 PVTGs; Rajasthan has the highest number",
      "500 PVTGs; Kerala has the highest number"],
     "75 PVTGs are notified across India; Odisha leads with 13 groups (including Bondo, Juang, Paudi Bhuyan, and Dongria Kondh)."),
    case_q("Constitutional Safeguards, PESA, Forest Rights and PVTGs", "Official Criteria for PVTG Scheduling",
     "What are the four official criteria established to classify a tribal community as a Particularly Vulnerable Tribal Group (PVTG)?",
     "Pre-agricultural technology, stagnant or declining population, extremely low literacy, and subsistence level of economy",
     ["High urban wealth, English literacy, ownership of factories, and large population",
      "Strict practice of polyandry, ownership of gold mines, and military service",
      "Living exclusively in coastal seaside resort cities"],
     "The 4 criteria are: (1) pre-agricultural technology, (2) stagnant/declining population, (3) extremely low literacy, and (4) subsistence economy."),
    case_q("Constitutional Safeguards, PESA, Forest Rights and PVTGs", "PM-JANMAN Scheme Launch (2023)",
     "In November 2023, the Government of India launched which comprehensive scheme with an outlay exceeding Rs 24,000 crore for PVTG saturation?",
     "PM-JANMAN (Pradhan Mantri Janjati Adivasi Nyaya Maha Abhiyan)",
     ["Pradhan Mantri Gram Sadak Yojana", "National Rural Health Mission", "Stand Up India Scheme"],
     "PM-JANMAN was launched in 2023 to provide saturated basic amenities (housing, water, power, roads, clinics) to all 75 PVTGs in India."),
    case_q("Constitutional Safeguards, PESA, Forest Rights and PVTGs", "Target Interventions of PM-JANMAN",
     "What essential basic infrastructure interventions does the PM-JANMAN mission deliver directly to remote PVTG habitations?",
     "Pucca houses, piped drinking water, solar electricity, all-weather road connectivity, mobile medical units, and multipurpose community centers",
     ["Commercial airports for international tourism flights", "High-speed bullet train railway stations", "Multi-story luxury shopping malls"],
     "PM-JANMAN saturates 11 critical interventions: pucca housing, road connectivity, piped water, electricity, mobile health vans, and hostel schools.")
]

# ==============================================================================
# PASSAGES 11 TO 20 ASSEMBLY
# ==============================================================================
PASSAGES_11_20 = [
    ( (P1_M11_TXT, P1_M11_QS), (P2_M11_TXT, P2_M11_QS) ),
    ( (P1_M12_TXT, P1_M12_QS), (P2_M12_TXT, P2_M12_QS) ),
    ( (P1_M13_TXT, P1_M13_QS), (P2_M13_TXT, P2_M13_QS) ),
    ( (P1_M14_TXT, P1_M14_QS), (P2_M14_TXT, P2_M14_QS) ),
    ( (P1_M15_TXT, P1_M15_QS), (P2_M15_TXT, P2_M15_QS) ),
    ( (P1_M16_TXT, P1_M16_QS), (P2_M16_TXT, P2_M16_QS) ),
    ( (P1_M17_TXT, P1_M17_QS), (P2_M17_TXT, P2_M17_QS) ),
    ( (P1_M18_TXT, P1_M18_QS), (P2_M18_TXT, P2_M18_QS) ),
    ( (P1_M19_TXT, P1_M19_QS), (P2_M19_TXT, P2_M19_QS) ),
    ( (P1_M20_TXT, P1_M20_QS), (P2_M20_TXT, P2_M20_QS) )
]

assert len(PASSAGES_11_20) == 10, f"Expected 10 pairs, got {len(PASSAGES_11_20)}"
for m_idx, (p1, p2) in enumerate(PASSAGES_11_20, start=11):
    assert len(p1[1]) == 5, f"Mock {m_idx} P1 has {len(p1[1])} Qs"
    assert len(p2[1]) == 5, f"Mock {m_idx} P2 has {len(p2[1])} Qs"

print(f"Anthropology Passages 11 to 20 compiled successfully: 10 pairs (20 passages, 100 questions).")
'''

with open(out_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Generated {out_path} ({len(content)} bytes)")
