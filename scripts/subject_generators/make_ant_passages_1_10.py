import sys, os

out_path = "scripts/subject_generators/ant_passages_1_10.py"

content = '''import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import case_q

# ==============================================================================
# MOCK 1 PASSAGES
# ==============================================================================
P1_M1_TXT = (
    "Read the following case study on the Discovery and Anatomical Significance of 'Lucy' (Australopithecus afarensis), "
    "and answer the questions that follow:\\n\\n"
    "In November 1974, paleoanthropologist Donald Johanson and graduate student Tom Gray discovered a remarkably complete "
    "fossil hominid skeleton at Hadar in the Afar Depression of Ethiopia, cataloged as AL 288-1 and popularly nicknamed 'Lucy'. "
    "Radiometrically dated to approximately 3.2 million years ago (Late Pliocene), the specimen preserves approximately 40% of "
    "the total skeleton, representing an adult female Australopithecus afarensis standing approximately 3.5 feet (1.1 meters) tall. "
    "Lucy's postcranial anatomy provided conclusive, indisputable evidence that upright habitual bipedal locomotion evolved long "
    "before the expansion of the human brain. Her pelvis exhibits a short, broad, laterally flaring ilium with an anteriorly rotated "
    "sciatic notch, and her distal femur demonstrates a pronounced carrying angle (valgus knee of 9–11 degrees), centering the knees "
    "beneath the body's center of gravity during single-limb support. However, her cranial capacity was modest—approximately 400 cc, "
    "comparable to a modern chimpanzee—with strong subnasal prognathism and curved, elongated phalanges, indicating that while "
    "afarensis was an obligate biped on the ground, it retained climbing arboreal proficiencies in the African woodland savanna."
)
P1_M1_QS = [
    case_q("Early Hominid Evolution and Australopithecines", "Geographic Location of Lucy's Discovery",
           "The fossil skeleton of 'Lucy' (AL 288-1) was discovered by Donald Johanson in 1974 at which iconic paleoanthropological locality?",
           "Hadar in the Afar Depression of Ethiopia",
           ["Olduvai Gorge in northern Tanzania", "Sterkfontein Cave in South Africa", "Trinil along the Solo River in Java"],
           "Lucy was discovered in the Hadar formation within the Afar Triangle of northern Ethiopia."),
    case_q("Early Hominid Evolution and Australopithecines", "Evolutionary Timing of Bipedalism vs Encephalization",
     "What profound biological insight regarding human evolutionary history was definitively demonstrated by the anatomy of Lucy?",
     "Habitual upright bipedalism evolved millions of years before significant cranial brain enlargement (encephalization)",
     ["Human brain enlargement evolved long before hominids learned to walk upright",
      "Australopithecines possessed cranial capacities exceeding modern humans",
      "Lucy was an aquatic mammal that swam in deep ocean waters"],
     "Lucy's 400 cc brain combined with advanced bipedal hip/femur anatomy proved bipedalism preceded encephalization."),
    case_q("Early Hominid Evolution and Australopithecines", "Diagnostic Femoral Trait in Bipedal Gait",
     "Which diagnostic anatomical feature of Lucy's knee joint proved that she walked with a habitual upright bipedal stride?",
     "A pronounced bicondylar angle (valgus knee) angling the femur inward toward the midline",
     ["A completely straight vertical femur identical to quadrupedal baboons",
      "A backward-facing knee joint that bent outward like a bird",
      "The complete absence of a patella and femoral condyles"],
     "The bicondylar/valgus angle directs the knees inward under the center of gravity, a diagnostic hallmark of bipedal walking."),
    case_q("Early Hominid Evolution and Australopithecines", "Arboreal Retentions in Australopithecus afarensis",
     "Which skeletal features of Australopithecus afarensis indicate that Lucy still retained significant adaptations for climbing in trees?",
     "Curved, elongated finger and toe phalanges and cranially oriented shoulder glenoid fossa",
     ["Broad, flattened human fingernails and short straight toes",
      "A rigid, inflexible ankle joint suited only for paved roads",
      "Wings attached to the shoulder blades"],
     "Curved phalanges and upward-oriented shoulder sockets prove afarensis retained climbing proficiencies for foraging and nesting in trees."),
    case_q("Early Hominid Evolution and Australopithecines", "Cranial Capacity of Australopithecus afarensis",
     "What was the approximate adult cranial brain capacity of Australopithecus afarensis as evidenced by Lucy and contemporaneous crania?",
     "Approximately 380 to 450 cubic centimeters (cc)",
     ["Approximately 1,350 to 1,500 cc", "Over 2,000 cc", "Less than 100 cc"],
     "Australopithecus afarensis possessed a chimpanzee-sized cranial volume of ~400 cc (range 380–450 cc).")
]

P2_M1_TXT = (
    "Read the following excerpt on Bronislaw Malinowski and the Revolution in Anthropological Fieldwork, "
    "and answer the questions that follow:\\n\\n"
    "Between 1915 and 1918, Polish-born British anthropologist Bronislaw Malinowski carried out extensive, intensive ethnographic "
    "fieldwork in the Trobriand Islands (Kiriwina) off the eastern coast of New Guinea. Prior to Malinowski, 19th-century 'armchair anthropologists' "
    "like Tylor and Frazer relied on secondhand questionnaires, colonial accounts, and missionary travelogues. Malinowski revolutionized "
    "ethnographic methodology by pitching his tent right in the middle of native Trobriand villages, learning the indigenous language, and "
    "pioneering the technique of 'Participant Observation'. In his 1922 classic 'Argonauts of the Western Pacific', he articulated three "
    "indispensable methodological goals for the fieldworker: first, recording the tribal constitution and anatomy of the culture through concrete "
    "statistical documentation; second, recording the 'imponderabilia of actual life' and everyday behavior through close, direct observation; "
    "and third, collecting a corpus inscriptionum of native statements, magical spells, and folklore in the vernacular. Malinowski argued "
    "that the ultimate goal of the ethnographer is 'to grasp the native's point of view, his relation to life, to realize his vision of his world'."
)
P2_M1_QS = [
    case_q("Anthropological Theories and Fieldwork Methods", "Participant Observation Pioneer",
     "Which anthropologist revolutionized socio-cultural anthropological fieldwork by establishing the method of intensive 'Participant Observation'?",
     "Bronislaw Malinowski through his fieldwork in the Trobriand Islands",
     ["Lewis Henry Morgan through postal surveys", "Sir James Frazer through reading classical texts", "Charles Darwin on the HMS Beagle"],
     "Malinowski transformed anthropology by living in native villages and pioneering long-term participant observation."),
    case_q("Anthropological Theories and Fieldwork Methods", "Concept of 'Imponderabilia of Actual Life'",
     "What did Malinowski mean by the methodological directive to record the 'Imponderabilia of Actual Life'?",
     "Documenting the subtle, mundane, intimate daily activities, emotional gestures, and bodily habits that people take for granted",
     ["Measuring the exact weight of stone tools on chemical balances",
      "Calculating astronomical distances to distant planetary stars",
      "Writing down only the official proclamations of imperial British governors"],
     "The imponderabilia of actual life comprises the daily routine, conversations, gestures, and tone of everyday life observed firsthand."),
    case_q("Anthropological Theories and Fieldwork Methods", "Ultimate Goal of Ethnography According to Malinowski",
     "In 'Argonauts of the Western Pacific', how did Malinowski formulate the final, supreme objective of the ethnographer?",
     "'To grasp the native's point of view, his relation to life, to realize his vision of his world'",
     ["To convert all native people to European religious sects",
      "To purchase native tribal lands on behalf of colonial plantation companies",
      "To prove that primitive people possess zero intellectual intelligence"],
     "Malinowski famously declared the ethnographer's goal is to grasp the native's perspective and realize their vision of the world."),
    case_q("Anthropological Theories and Fieldwork Methods", "Critique of 19th-Century Armchair Anthropology",
     "Malinowski's intensive, immersive field methodology delivered a devastating critique against early 'Armchair Anthropologists' because they:",
     "Relied uncritically on secondhand, biased, and sensationalist reports from travelers, colonial administrators, and missionaries",
     ["Spent too much time living in mud huts with native villagers",
      "Refused to read books or write academic manuscripts",
      "Used modern digital cameras and tape recorders in the 1850s"],
     "Armchair anthropologists never conducted field research, relying on fragmentary, biased accounts of travelers and missionaries."),
    case_q("Anthropological Theories and Fieldwork Methods", "Collection of Vernacular Linguistic Texts",
     "Why did Malinowski insist on collecting a 'Corpus Inscriptionum' (verbatim transcriptions of native myths, conversations, and magical spells)?",
     "To capture authentic native thought and cultural concepts directly in their own indigenous grammatical and symbolic categories",
     ["To teach the native islanders how to speak proper Victorian English",
      "To translate European Latin poetry into South Pacific dialects",
      "To censor and eliminate all traditional folklore from tribal memory"],
     "A corpus inscriptionum preserves native concepts in the original language, revealing the internal psychological categories of the culture.")
]

# ==============================================================================
# MOCK 2 PASSAGES
# ==============================================================================
P1_M2_TXT = (
    "Read the following case study on Molecular Anthropology and the 'Mitochondrial Eve' Hypothesis, "
    "and answer the questions that follow:\\n\\n"
    "In 1987, a landmark study published in 'Nature' by Rebecca Cann, Mark Stoneking, and Allan Wilson transformed evolutionary "
    "anthropology by analyzing Mitochondrial DNA (mtDNA) variation across 147 individuals representing diverse human geographical populations. "
    "Mitochondrial DNA possesses unique genetic characteristics: it is maternally inherited (passed exclusively from mother to offspring "
    "without paternal recombination) and accumulates neutral mutations at a rapid, steady molecular-clock rate. Cann and her colleagues "
    "discovered that all contemporary human mtDNA lineages coalesce to a single common ancestral female—popularly dubbed 'Mitochondrial Eve'—who "
    "lived in sub-Saharan Africa approximately 150,000 to 200,000 years ago. Furthermore, the highest genetic diversity and the deepest, "
    "oldest genealogical branching were observed exclusively within African populations, providing powerful genetic support for the 'Recent "
    "African Origin' (Out-of-Africa) replacement model of Anatomically Modern Homo sapiens. Subsequent analyses of non-recombining Y-chromosome "
    "sequences (NRY) in males corroborated this maternal finding, establishing a contemporaneous 'Y-chromosomal Adam' in Africa."
)
P1_M2_QS = [
    case_q("Human Genetics and Mendelian Inheritance in Man", "Mode of Inheritance of Mitochondrial DNA",
     "In human genetics, why was Mitochondrial DNA (mtDNA) chosen by Cann, Stoneking, and Wilson for tracing deep human maternal ancestry?",
     "Because mtDNA is inherited strictly through the maternal line without sexual recombination, tracing an unbroken matrilineal genealogy",
     ["Because mtDNA is inherited exclusively from the biological father to sons only",
      "Because mtDNA contains 46 pairs of autosomes that recombine during meiosis",
      "Because mtDNA does not mutate over millions of years"],
     "mtDNA is strictly maternally inherited and does not undergo meiotic crossing-over, providing an unambiguous maternal pedigree."),
    case_q("Human Genetics and Mendelian Inheritance in Man", "Geographic Homeland of 'Mitochondrial Eve'",
     "Based on the molecular clock and global phylogenetic tree, where did the common matrilineal ancestor of all living humans live?",
     "In Sub-Saharan Africa approximately 150,000 to 200,000 years ago",
     ["In Western Europe approximately 10,000 years ago",
      "In Central Asia approximately 50,000 years ago",
      "In South America approximately 2 million years ago"],
     "Cann et al. proved Mitochondrial Eve lived in Africa ~150-200 ka, confirming Africa as the cradle of modern Homo sapiens."),
    case_q("Human Genetics and Mendelian Inheritance in Man", "African Genetic Diversity Significance",
     "Why does the observation that indigenous African populations exhibit the highest genetic diversity on Earth support the Out-of-Africa model?",
     "Because populations that have resided in their homeland the longest accumulate the greatest number of neutral genetic mutations over time",
     ["Because Africa was populated by people from other continents last week",
      "Because African people receive higher amounts of cosmic space radiation",
      "Because non-African populations never experienced any genetic drift"],
     "The population with the greatest internal genetic diversity is the oldest; non-African populations represent founder subsets that migrated outward."),
    case_q("Human Genetics and Mendelian Inheritance in Man", "Evolutionary Model Supported by mtDNA",
     "The 'Mitochondrial Eve' research provided foundational empirical evidence in favor of which model of modern human origins?",
     "The Recent African Origin (Out-of-Africa / Replacement) Model",
     ["The Multiregional Continuity Model", "The 19th-century Polygenism Model", "The Lamarckian Inheritance Model"],
     "mtDNA coalescence supported the Recent African Origin model: modern humans arose in Africa ~200 ka and expanded outward, replacing archaic humans."),
    case_q("Human Genetics and Mendelian Inheritance in Man", "Paternal Counterpart to Mitochondrial Eve",
     "In molecular anthropology, the paternal genetic counterpart to Mitochondrial Eve, traced through the non-recombining portion of the Y-chromosome, is termed:",
     "Y-Chromosomal Adam",
     ["Autosomal Adam", "Hemoglobin Adam", "X-Linked Adam"],
     "Y-chromosomal Adam is the patrilineal most recent common ancestor of all living men, traced via non-recombining Y-DNA sequences.")
]

P2_M2_TXT = (
    "Read the following excerpt on Verrier Elwin's Ethnography of the Muria Ghotul of Bastar, "
    "and answer the questions that follow:\\n\\n"
    "In central India, the Muria Gonds of the Bastar plateau developed one of the most remarkable social institutions in tribal ethnography—the "
    "'Ghotul'. Investigated and celebrated by anthropologist Verrier Elwin in his 1947 monograph 'The Muria and Their Ghotul', the Ghotul was "
    "a communal village youth dormitory where all unmarried boys (Cheliks) and girls (Motiyaris) assembled every evening. Far from being an "
    "unregulated or licentious institution, the Ghotul was governed by strict internal hierarchy, customary etiquette, and severe civic duties. "
    "The Cheliks were led by a supreme senior youth termed the 'Sirdar', while the Motiyaris were commanded by the 'Belosa'. The dormitory "
    "instilled profound communal solidarity: youths were responsible for organizing village festival dances, cleaning public paths, attending "
    "to wedding guests, and assisting bereaved families during funerals. In the older, traditional 'Jhoria' Ghotul, sexual partnerships were "
    "strictly rotational; partners were reassigned every two to three nights. Elwin noted that this mandatory rotation prevented exclusive "
    "individual possessiveness and romantic jealousy, prioritizing village harmony and preparing adolescents for enduring, arranged marital unions."
)
P2_M2_QS = [
    case_q("Tribal Social Organization and Youth Dormitories", "Muria Youth Dormitory Nomenclature",
     "What is the traditional co-educational youth dormitory of the Muria Gonds of Bastar investigated by Verrier Elwin?",
     "The Ghotul",
     ["The Dhumkuria", "The Morung", "The Rangbang"],
     "The Ghotul is the traditional youth dormitory of the Muria Gonds of Bastar, studied extensively by Verrier Elwin."),
    case_q("Tribal Social Organization and Youth Dormitories", "Terminology for Boy and Girl Members",
     "In the Muria Ghotul, what specific titles are given to the adolescent boy and girl members?",
     "Boy members are called 'Cheliks' and girl members are called 'Motiyaris'",
     ["Boys are called Dhangars and girls are called Pelos",
      "Boys are called Morans and girls are called Kaus",
      "Boys are called Kartas and girls are called Kamins"],
     "In Muria Ghotul culture, unmarried adolescent boys are termed Cheliks and girls are termed Motiyaris."),
    case_q("Tribal Social Organization and Youth Dormitories", "Elected Leadership of the Ghotul",
     "Who are the supreme elected student leaders of the Muria Ghotul responsible for maintaining discipline?",
     "The Sirdar (leader of the Cheliks) and the Belosa (leader of the Motiyaris)",
     ["The Pahan and the Pujari", "The Manjhi and the Parha Raja", "The British Magistrate and Police Inspector"],
     "The Sirdar commands the boys (Cheliks) and the Belosa commands the girls (Motiyaris), maintaining strict code of conduct."),
    case_q("Tribal Social Organization and Youth Dormitories", "Rationale for Rotational Partnerships in Jhoria Ghotul",
     "Why did the traditional Jhoria Ghotul forbid a Chelik and Motiyari from sleeping together for more than two or three nights?",
     "To suppress possessive jealousy and individual emotional attachment, reinforcing collective communal solidarity",
     ["To punish young people for falling in love",
      "Because the tribal council lacked enough sleeping mats",
      "To enforce complete lifelong celibacy upon all members"],
     "Mandatory partnership rotation prevented individual possessiveness, teaching youths that loyalty belongs to the collective group."),
    case_q("Tribal Social Organization and Youth Dormitories", "Civic and Community Duties of Ghotul Youths",
     "Beyond recreation and courtship, what essential civic roles were performed by the Ghotul members for the wider village community?",
     "Serving as a communal labor brigade for village sanitation, wedding hospitality, funeral assistance, and festival dancing",
     ["Collecting royal income taxes for the provincial government",
      "Fighting in overseas naval wars for the British empire",
      "Operating mechanized coal-mining machinery"],
     "Ghotul youths were the village social service brigade: catering at weddings, assisting grieving families, and maintaining public spaces.")
]

# ==============================================================================
# MOCK 3 PASSAGES
# ==============================================================================
P1_M3_TXT = (
    "Read the following case study on Paleogenomics and the Svante Pääbo Neanderthal Genome Revolution, "
    "and answer the questions that follow:\\n\\n"
    "In 2010, an international research team led by evolutionary geneticist Svante Pääbo at the Max Planck Institute for Evolutionary "
    "Anthropology published the first draft sequence of the Neanderthal nuclear genome, extracted from 40,000-year-old fossil bones from "
    "Vindija Cave in Croatia. This triumph of ancient DNA (aDNA) technology earned Pääbo the 2022 Nobel Prize in Physiology or Medicine. "
    "Pääbo developed sterile clean-room protocols and advanced high-throughput sequencing to overcome the formidable challenges of post-mortem "
    "cytosine-to-uracil chemical deamination and rampant modern bacterial contamination. Comparative genomic analysis yielded a stunning revelation: "
    "contemporary non-African populations (Europeans, Asians, Indigenous Americans, and Australasians) carry approximately 1% to 2% introgressed "
    "Neanderthal DNA in their genomes. This confirmed that Anatomically Modern Homo sapiens interbred with Neanderthals in the Levant or "
    "Near East approximately 50,000 to 60,000 years ago as modern humans first migrated out of Africa. In 2010, Pääbo's team sequenced a "
    "finger bone from Denisova Cave in Siberia, discovering an entirely new hominin lineage—the Denisovans—who contributed up to 4% to 6% of the "
    "genome of modern indigenous Melanesian and Australian Aboriginal populations, including the EPAS1 altitude adaptation gene in Tibetans."
)
P1_M3_QS = [
    case_q("Neanderthals and Anatomically Modern Homo sapiens", "Nobel Prize in Ancient Genomics",
     "Which revolutionary scientist was awarded the 2022 Nobel Prize in Physiology or Medicine for sequencing the Neanderthal genome and founding paleogenomics?",
     "Svante Pääbo",
     ["Donald Johanson", "Louis Leakey", "Francis Crick"],
     "Svante Pääbo pioneered ancient DNA extraction protocols, sequencing the Neanderthal and Denisovan genomes to win the 2022 Nobel Prize."),
    case_q("Neanderthals and Anatomically Modern Homo sapiens", "Percentage of Neanderthal DNA in Modern Non-Africans",
     "Comparative genomic sequencing established that present-day non-African humans carry what approximate percentage of introgressed Neanderthal DNA?",
     "Approximately 1% to 2%",
     ["Over 50%", "Zero percent", "Approximately 25% to 30%"],
     "All modern non-African populations carry ~1-2% Neanderthal-derived genetic sequences from ancient admixture ~55 ka BP."),
    case_q("Neanderthals and Anatomically Modern Homo sapiens", "Geographic Locus of Admixture",
     "Where and when did the primary hybridization/interbreeding event between expanding modern Homo sapiens and Neanderthals occur?",
     "In the Near East / Levant approximately 50,000 to 60,000 years ago",
     ["In the Americas approximately 2,000 years ago",
      "In sub-Saharan southern Africa 500,000 years ago",
      "In modern Australia 500 years ago"],
     "Admixture occurred in the Middle East/Levant as modern humans first exited Africa, distributing Neanderthal DNA to all subsequent non-African branches."),
    case_q("Neanderthals and Anatomically Modern Homo sapiens", "Discovery of the Denisovan Hominin",
     "In 2010, Svante Pääbo's sequencing of ancient DNA from a tiny juvenile finger bone found in Denisova Cave (Altai Mountains, Siberia) revealed:",
     "An entirely unknown, distinct archaic hominin lineage (the Denisovans) that interbred with ancestors of modern Melanesians and Indigenous Australians",
     ["A complete modern chimpanzee skeleton",
      "A dinosaur fossil that survived into the ice age",
      "An alien creature from outer space"],
     "Denisova Cave yielded ancient DNA of an entirely distinct archaic hominin sister group to Neanderthals: the Denisovans."),
    case_q("Neanderthals and Anatomically Modern Homo sapiens", "EPAS1 Gene Adaptation in Tibetans",
     "Which vital physiological adaptation possessed by modern high-altitude Tibetans was inherited via ancient adaptive introgression from Denisovans?",
     "The EPAS1 gene variant that prevents dangerous hemoglobin overproduction in thin mountain air",
     ["The sickle cell HbS hemoglobin variant", "The ABO blood group gene", "The lactose persistence LCT gene"],
     "Tibetans inherited their unique high-altitude EPAS1 allele through ancient admixture with Denisovans, allowing efficient hypoxia adaptation.")
]

P2_M3_TXT = (
    "Read the following excerpt on the Potlatch Ceremony of the Pacific Northwest Coast Indigenous Peoples, "
    "and answer the questions that follow:\\n\\n"
    "Along the rugged, salmon-rich Pacific Northwest Coast of North America, indigenous societies such as the Kwakiutl (Kwakwaka'wakw), "
    "Haida, and Tlingit developed an elaborate ceremonial institution known as the 'Potlatch' (from the Chinook jargon word meaning 'to give away'). "
    "Studied in detail by Franz Boas in the late 19th century, the Potlatch was a competitive feast hosted by a noble chief to validate hereditary titles, "
    "mark life-cycle crises (such as births, marriages, or deaths), and assert aristocratic status. Host chiefs accumulated massive quantities "
    "of wealth—including cedar-bark blankets, copper shields (coppers), fish oil (candlefish eulachon grease), and dried salmon—over years of kin labor. "
    "During the days-long ceremony, the host chief generously distributed these riches to invited rival chiefs and guests, or spectacularly "
    "destroyed them: burning valuable blankets in roaring hearths, throwing coppers into the ocean, and drowning canoes in grease. The guests "
    "were socially humiliated unless they could host a return potlatch in the future, reciprocating with interest (often 100% more gifts). Anthropologist "
    "Ruth Benedict interpreted the Potlatch as reflecting a 'Dionysian' cultural ethos characterized by competitive rivalry, grandiosity, and manic status-striving."
)
P2_M3_QS = [
    case_q("Economic Anthropology: Primitive Economy and Exchange", "Potlatch Definition and Meaning",
     "What was the primary sociological purpose of the 'Potlatch' ceremony among the indigenous peoples of the Pacific Northwest Coast?",
     "A competitive redistribution feast where a host chief gave away or destroyed wealth to validate hereditary status and outdo rival chiefs",
     ["A commercial silent trade where mute hunter-gatherers exchanged arrows for grain",
      "A judicial courtroom where criminals were sentenced to death",
      "A secret military planning council to invade neighboring continents"],
     "The Potlatch was a prestige ceremony: redistributing or destroying accumulated wealth to validate lineage rank and outshine rival aristocrats."),
    case_q("Economic Anthropology: Primitive Economy and Exchange", "Franz Boas and Potlatch Fieldwork",
     "Which foundational American anthropologist conducted extensive pioneering ethnographic field research on the Kwakiutl Potlatch?",
     "Franz Boas",
     ["Bronislaw Malinowski", "A.R. Radcliffe-Brown", "Edward Tylor"],
     "Franz Boas spent decades documenting Kwakiutl material culture, mythology, and the Potlatch system in British Columbia."),
    case_q("Economic Anthropology: Primitive Economy and Exchange", "Status Valuables Distributed in Potlatch",
     "What diagnostic status valuables were accumulated, gifted, and conspicuously destroyed during competitive Potlatches?",
     "Woolen blankets, carved copper shields (coppers), eulachon candlefish oil, and cedar canoes",
     ["Gold coins minted in Europe", "Steel swords and gunpowder barrels", "Synthetic plastic dinner plates"],
     "Kwakiutl wealth items were blankets, decorated shield-shaped beaten copper plates (coppers), eulachon fish grease, and carved canoes."),
    case_q("Economic Anthropology: Primitive Economy and Exchange", "Obligation of Reciprocity with Interest",
     "What compelling social obligation fell upon a rival chief who accepted gifts from a host chief at a Potlatch?",
     "The guest was obligated to host a return potlatch in the future, reciprocating with even greater quantities of wealth (often with 100% interest)",
     ["The guest was immediately executed by the host's warriors",
      "The guest was forced to live as a slave in the host chief's kitchen",
      "The guest was forbidden from ever speaking in public again"],
     "Accepting potlatch gifts placed the guest in a position of social subordination until they hosted a counter-potlatch reciprocating with interest."),
    case_q("Economic Anthropology: Primitive Economy and Exchange", "Ruth Benedict's Dionysian Classification",
     "In 'Patterns of Culture' (1934), how did Ruth Benedict classify the psychological ethos of the Kwakiutl Potlatch culture?",
     "Dionysian (characterized by emotional intensity, competitive megalomania, and dramatic striving for prestige)",
     ["Apollonian (characterized by calm moderation, harmony, and modesty)",
      "Schizophrenic", "Depressive"],
     "Benedict contrasted Zuni Apollonian restraint with Kwakiutl Dionysian passion: aggressive status rivalry and theatrical destruction of wealth.")
]

# ==============================================================================
# MOCK 4 PASSAGES
# ==============================================================================
P1_M4_TXT = (
    "Read the following case study on Acheulean Handaxe Symmetry and the Cognitive Leap in Homo erectus, "
    "and answer the questions that follow:\\n\\n"
    "The Acheulean stone tool industry (Mode 2), which spanned over 1.5 million years across Africa, Europe, and Asia, is heralded in "
    "evolutionary anthropology as evidence of a profound cognitive leap in genus Homo (Homo erectus / ergaster). The signature artifact of "
    "this tradition is the Acheulean Biface, encompassing the teardrop-shaped Handaxe and the transverse-edged Cleaver. Unlike the earlier "
    "Oldowan pebble choppers (Mode 1), which were opportunistic core reductions, the manufacture of an Acheulean handaxe required imposing a "
    "pre-conceived, three-dimensional mental template onto a raw stone nodule. Experimental knapping demonstrates that an Acheulean craftsman "
    "employed a sophisticated hierarchical reduction sequence: first, roughing out the blank using hard-hammer stone percussion to establish "
    "a continuous bifacial cutting perimeter; second, switching to a soft hammer (antler, bone, or hardwood billet) to detach thin, invasive "
    "flakes that thinned the biface without narrowing it; and third, applying delicate marginal retouches to achieve perfect bilateral "
    "symmetry. At sites like Boxgrove in England and Isampur in Karnataka, bifaces exhibit exquisite aesthetic symmetry that far exceeds "
    "mere utilitarian butchery requirements, prompting archaeologists to suggest that handaxes also functioned as social signals of knapping skill, "
    "strength, and cognitive fitness."
)
P1_M4_QS = [
    case_q("Paleolithic Technology: Flaking Techniques and Tool Typology", "Acheulean Stone Industry Classification",
     "In Grahame Clark's five-stage evolutionary taxonomy of prehistoric stone technology, the Acheulean industry is classified as:",
     "Mode 2 Technology",
     ["Mode 1 Technology", "Mode 3 Technology", "Mode 4 Technology"],
     "Clark classified Oldowan as Mode 1, Acheulean as Mode 2, Levallois as Mode 3, and Upper Paleolithic blades as Mode 4."),
    case_q("Paleolithic Technology: Flaking Techniques and Tool Typology", "Cognitive Concept of the Mental Template",
     "Why does the bilateral symmetry of an Acheulean handaxe demonstrate a major cognitive leap over Oldowan pebble choppers?",
     "Because shaping symmetrical bifaces requires holding a pre-conceived three-dimensional mental design in mind and executing hierarchical planning",
     ["Because Acheulean hominids used computerized stone-cutting lasers",
      "Because handaxes were manufactured by natural wind erosion",
      "Because Oldowan choppers were made of metal while handaxes were stone"],
     "Bilateral symmetry requires visual-spatial working memory: knappers held an abstract mental template and imposed it through planned flaking."),
    case_q("Paleolithic Technology: Flaking Techniques and Tool Typology", "Soft Hammer (Cylinder Hammer) Advantage",
     "In Acheulean biface reduction, what technical advantage did the knapper gain by switching to a soft hammer (antler or bone billet)?",
     "Detaching thin, flat, invasive flakes with shallow scars, enabling uniform thinning of the core without shattering the edge",
     ["Shattering the entire stone into useless dust",
      "Drilling circular holes through the middle of the handaxe",
      "Melting the rock into molten lava"],
     "Soft hammers absorb shock and yield thin, expanding flakes, allowing precise bifacial thinning while maintaining razor-sharp edges."),
    case_q("Paleolithic Technology: Flaking Techniques and Tool Typology", "Handaxe Morphology vs Cleaver Morphology",
     "How does an Acheulean Cleaver differ in morphology and working edge from an Acheulean Handaxe?",
     "A cleaver has a broad, straight transverse guillotine-like cutting edge at its distal end, whereas a handaxe tapers to a pointed tip",
     ["A cleaver is made of wood, while a handaxe is made of iron",
      "A cleaver is completely spherical, while a handaxe is square",
      "There is no difference; cleaver and handaxe are identical"],
     "Cleavers terminate in a wide, straight transverse guillotine cutting edge, whereas handaxes possess a pointed, cordiform, or ovate tip."),
    case_q("Paleolithic Technology: Flaking Techniques and Tool Typology", "Non-Utilitarian Interpretation of Handaxe Symmetry",
     "Why do paleoanthropologists suggest that the extreme, aesthetically pleasing symmetry of late Acheulean handaxes held social significance?",
     "Because the exquisite symmetry exceeded utilitarian butchery needs, likely serving as a visual display of motor skill, planning, and individual fitness",
     ["Because handaxes were used as paper currency to buy bread",
      "Because handaxes were thrown at the moon during eclipses",
      "Because symmetrical stones were required to balance on one's nose"],
     "Superfluous geometric perfection in late Acheulean bifaces indicates aesthetic appreciation and display of motor/cognitive fitness to conspecifics.")
]

P2_M4_TXT = (
    "Read the following excerpt on E.E. Evans-Pritchard's Classic Study of Witchcraft, Oracles and Magic Among the Azande, "
    "and answer the questions that follow:\\n\\n"
    "In 1937, British social anthropologist E.E. Evans-Pritchard published his masterwork 'Witchcraft, Oracles and Magic Among the Azande', "
    "based on intensive fieldwork in the southern Sudan. European colonialists had long dismissed African witchcraft beliefs as bizarre, "
    "primitive delusions. Evans-Pritchard proved that Azande witchcraft (Mangu) constitutes a coherent, highly rational intellectual system "
    "that provides a complete philosophy for explaining misfortune and coincidence. The Azande fully understand empirical natural causation: "
    "they know that termites eat the wooden pillars of a granary, causing it to rot and collapse; they know that people sit beneath granaries "
    "for shade during the heat of the day. But natural science cannot explain why a specific granary collapsed at the exact second a particular "
    "man was sitting under it. Witchcraft supplies this missing 'Second Spear'—the socially meaningful link of coincidence answering the question, "
    "'Why me? Why now?'. In Azande belief, Mangu is an inherited physical substance inside the small intestine, acting psychically through malevolence. "
    "To identify witches, the Azande consult a hierarchy of oracles, the ultimate authority being the 'Benge' (Poison Oracle), where poison is "
    "administered to fowls to deliver life-or-death verdicts."
)
P2_M4_QS = [
    case_q("Anthropology of Religion, Magic and Witchcraft", "Azande Witchcraft Substance: Mangu",
     "According to Azande indigenous belief, what is 'Witchcraft' (Mangu)?",
     "An inherited physical, organic substance located inside the belly that operates psychically to inflict harm on others",
     ["A magic wand carved from ivory imported from London",
      "A written textbook of secret chemical formulas",
      "A potion brewed by boiling poisonous snakes in milk"],
     "Azande Mangu is an anatomical substance in the small intestines, transmitted unilineally, operating psychically without spells."),
    case_q("Anthropology of Religion, Magic and Witchcraft", "Concept of the 'Second Spear'",
     "In Evans-Pritchard's famous granary collapse example, what does the concept of the 'Second Spear' explain in Azande philosophy?",
     "Why a natural catastrophe happened to a specific person at that exact time and place (the human problem of coincidence)",
     ["How termites eat wood", "The scientific trajectory of a thrown hunting spear", "The biological evolution of elephants"],
     "Termites eating wood is the first spear; witchcraft joining the falling granary to a specific resting victim is the second spear (coincidence)."),
    case_q("Anthropology of Religion, Magic and Witchcraft", "Highest Judicial Oracle: Benge",
     "What is the ultimate, most prestigious oracle used by the Azande to confirm witchcraft accusations and settle legal disputes?",
     "The Benge (Poison Oracle), where specialized red forest poison is administered to young fowls",
     ["The Rubbing-board oracle operated in market squares",
      "The Termite oracle where sticks are placed in ant mounds",
      "A written referendum voted on by all village citizens"],
     "Benge is the highest Azande oracle: an expensive, carefully prepared poison given to chicks; its life-or-death outcome is legally binding."),
    case_q("Anthropology of Religion, Magic and Witchcraft", "Rationality of Azande Thought",
     "What groundbreaking conclusion did Evans-Pritchard reach regarding the nature of Azande witchcraft beliefs?",
     "Witchcraft is not irrational superstition, but a logically consistent and rational intellectual framework for explaining misfortune and maintaining social order",
     ["Azande people were clinically insane and suffered from brain damage",
      "Azande witchcraft was an invention of European Christian missionaries",
      "Azande people did not believe in cause and effect"],
     "Evans-Pritchard demonstrated that witchcraft is an internally coherent, logical system explaining personal misfortune within an empirical world."),
    case_q("Anthropology of Religion, Magic and Witchcraft", "Social Regulation Role of Witchcraft",
     "How does the belief in witchcraft function as an effective mechanism of social control in Azande daily life?",
     "It discourages antisocial behavior, spite, and greed, because people fear that harboring malice will activate their witchcraft or attract retaliation",
     ["It forces all villagers to abandon farming and live in trees",
      "It allows chiefs to execute anyone without evidence",
      "It causes all human relationships to dissolve into violent anarchy"],
     "Fear of being accused of witchcraft—or being attacked by a witch—promotes politeness, neighborly generosity, and decorum in Azande society.")
]

# ==============================================================================
# MOCK 5 PASSAGES
# ==============================================================================
P1_M5_TXT = (
    "Read the following case study on Human Physiological and Genetic Adaptations to High-Altitude Hypoxia, "
    "and answer the questions that follow:\\n\\n"
    "Populations permanently residing at high altitudes (>3,500 to 4,500 meters) in the Tibetan Plateau, the Ethiopian Highlands, "
    "and the Andean Altiplano confront severe environmental hypoxia: the barometric pressure drops, reducing the partial pressure of oxygen (pO2) "
    "by 35% to 45% compared to sea level. Ecological anthropologists and human evolutionary geneticists have revealed that these indigenous "
    "populations have evolved distinct, divergent biological pathways to conquer chronic hypoxic stress. Indigenous Quechua and Aymara highlanders "
    "in the Andes adapt primarily through Erythrocytosis: elevating hemoglobin concentrations (often >18–20 g/dL), expanding red blood cell mass, "
    "and developing barrel-shaped chests with enlarged lung volumes. However, excessive hemoglobin thickens blood viscosity, increasing the risk of "
    "Chronic Mountain Sickness (Monge's Disease). In contrast, indigenous Tibetans (who have occupied the Qinghai-Tibetan Plateau for over 25,000 years) "
    "maintain normal sea-level hemoglobin levels. Instead, Tibetans exhibit hyper-ventilation, double the synthesis of endothelial Nitric Oxide (NO) "
    "which dilates micro-capillaries to double blood flow velocity, and possess a unique natural-selection variant of the EPAS1 transcription factor gene."
)
P1_M5_QS = [
    case_q("Ecological Anthropology and Environmental Adaptations", "Primary High-Altitude Environmental Stress",
     "What is the fundamental physiological stress that human populations encounter when living permanently at altitudes above 3,500 meters?",
     "Hypobaric Hypoxia (reduced partial pressure of oxygen in ambient air due to low barometric pressure)",
     ["Extreme tropical humidity and dehydration", "Lack of planetary gravitational force", "Excessive oxygen poisoning"],
     "High altitude is characterized by low barometric pressure, reducing the partial pressure of oxygen (pO2) and causing hypobaric hypoxia."),
    case_q("Ecological Anthropology and Environmental Adaptations", "Andean Adaptive Strategy: Erythrocytosis",
     "How do indigenous Quechua and Aymara populations of the Andean Altiplano biologically compensate for high-altitude hypoxia?",
     "By producing elevated hemoglobin concentrations, expanding red blood cell volume (erythrocytosis), and developing large barrel chests",
     ["By reducing blood volume and breathing only once per minute",
      "By hibernating through the winter in underground shelters",
      "By drinking ocean salt water to elevate body temperature"],
     "Andeans elevate hemoglobin concentrations (>18 g/dL) and red cell mass, combined with enlarged residual lung volume (barrel chest)."),
    case_q("Ecological Anthropology and Environmental Adaptations", "Health Risk of Excessive Hemoglobin: Monge's Disease",
     "What pathological complication frequently develops in Andean highlanders when erythrocytosis elevates hematocrit beyond physiological limits?",
     "Chronic Mountain Sickness (Monge's Disease), characterized by dangerous blood viscosity, pulmonary hypertension, and heart failure",
     ["Sickle Cell Crisis", "Yaws infection", "Down syndrome"],
     "Excessive red cell production elevates blood viscosity, causing micro-capillary sludging, cyanosis, and Monge's disease in the Andes."),
    case_q("Ecological Anthropology and Environmental Adaptations", "Tibetan Vasodilator Mechanism",
     "Unlike Andeans, how do indigenous Tibetans achieve high oxygen delivery to tissues without overproducing hemoglobin?",
     "By synthesizing high levels of Nitric Oxide (NO), a potent vasodilator that widens pulmonary and capillary blood vessels to double blood flow velocity",
     ["By turning their blood into clear water", "By absorbing oxygen through their skin like frogs", "By sleeping 20 hours a day"],
     "Tibetans maintain double the circulating nitric oxide, dilating blood vessels to maintain high tissue perfusion without viscous blood."),
    case_q("Ecological Anthropology and Environmental Adaptations", "EPAS1 Gene Natural Selection",
     "Which critical gene in Tibetans was targeted by intense natural selection, functioning to down-regulate runaway hemoglobin overproduction?",
     "The EPAS1 (Endothelial PAS Domain Protein 1) transcription factor gene",
     ["The ABO blood group gene", "The G6PD enzyme gene", "The lactose persistence LCT gene"],
     "EPAS1 (the 'super-athlete gene') regulates the body's response to hypoxia; the Tibetan allele inhibits excessive erythrocytosis at high altitude.")
]

P2_M5_TXT = (
    "Read the following excerpt on Margaret Mead's Fieldwork in Samoa and the Refutation of Biological Determinism, "
    "and answer the questions that follow:\\n\\n"
    "In 1925, 23-year-old anthropologist Margaret Mead traveled to the remote South Pacific island of Ta'u in American Samoa to investigate "
    "a burning question posed by her mentor, Franz Boas: Is the storm and stress of adolescence an inevitable biological crisis driven by puberty, "
    "or is it a cultural phenomenon conditioned by social environment? In her bestselling 1928 book 'Coming of Age in Samoa', Mead presented "
    "findings that revolutionized Western psychology and anthropology. Observing 68 adolescent Samoan girls, Mead discovered that for Samoan youth, "
    "adolescence was a smooth, relaxed, and untroubled period of transition. Samoan society lacked the fierce anxieties, neuroses, and emotional "
    "rebellion typical of American adolescents. Mead attributed this to several cultural factors: early casual familiarity with biological facts "
    "(birth, death, and sex), relaxed sexual attitudes without puritanical guilt, and diffuse family structures where children grew up in large, "
    "flexible kindreds rather than isolated, emotionally pressurized nuclear households. Her work established that human personality and development "
    "are shaped predominantly by cultural conditioning rather than rigid biological determinism."
)
P2_M5_QS = [
    case_q("Anthropological Theories and Fieldwork Methods", "Core Research Question in Samoa",
     "What foundational question did Margaret Mead seek to answer during her 1925 ethnographic fieldwork in American Samoa?",
     "Whether the emotional storm and stress of adolescence is an inevitable universal biological crisis or a culturally conditioned experience",
     ["Whether Samoans could be trained to manufacture industrial steam engines",
      "Whether the Samoan language was genealogically related to ancient Latin",
      "Whether Polynesian islands were created by volcanic earthquakes"],
     "Mead tested biological determinism: determining whether adolescent turmoil was biologically inevitable (puberty) or culturally conditioned."),
    case_q("Anthropological Theories and Fieldwork Methods", "Adolescent Experience Among Samoan Girls",
     "What did Margaret Mead discover regarding the adolescent life transition among young girls in Samoa?",
     "Adolescence was a smooth, untroubled, and relaxed transition free from the emotional turmoil and neuroses seen in Western youth",
     ["Adolescent girls were confined to dark underground caves for five years",
      "Samoan adolescence was twice as violent and suicidal as in America",
      "Adolescent girls refused to eat any food until age twenty"],
     "Mead discovered Samoan girls experienced smooth, stress-free transitions into adulthood, proving adolescent angst is not biologically innate."),
    case_q("Anthropological Theories and Fieldwork Methods", "Cultural Factors Alleviating Adolescent Stress",
     "Which cultural features of Samoan village life did Mead identify as shielding youths from acute psychological anxiety?",
     "Casual early familiarity with birth, death, and sexuality, relaxed moral codes, and diffuse, supportive extended family networks",
     ["Strict isolation in single-sex Christian boarding schools",
      "Severe corporal punishment inflicted for any minor rule infraction",
      "Total ignorance of all biological bodily processes"],
     "Open attitudes toward natural bodily processes, permissive sexual mores, and broad kinship buffers prevented the emotional neuroses of the West."),
    case_q("Anthropological Theories and Fieldwork Methods", "Theoretical Paradigm Championed by Mead",
     "Margaret Mead's findings in Samoa provided a powerful empirical victory for which anthropological school of thought?",
     "Cultural Determinism and the Culture and Personality School (Franz Boas)",
     ["Biological Determinism and Sociobiology", "19th-Century Unilineal Evolutionism", "British Heliocentric Diffusionism"],
     "Mead's Samoan ethnography became the classic manifesto of Cultural Determinism, proving culture exerts supreme influence over biology."),
    case_q("Anthropological Theories and Fieldwork Methods", "Mentorship Behind the Samoan Project",
     "Which legendary 'Father of American Anthropology' designed the research project and dispatched young Margaret Mead to Samoa?",
     "Franz Boas",
     ["Bronislaw Malinowski", "Claude Lévi-Strauss", "Edward Burnett Tylor"],
     "Franz Boas conceived the Samoan expedition, directing Mead to conduct a natural experiment comparing adolescent development across cultures.")
]

# ==============================================================================
# MOCK 6 PASSAGES
# ==============================================================================
P1_M6_TXT = (
    "Read the following case study on Raymond Dart and the Discovery of the Taung Child (Australopithecus africanus), "
    "and answer the questions that follow:\\n\\n"
    "In the autumn of 1924, Australian-born anatomist Raymond Dart at the University of the Witwatersrand in Johannesburg received two crates "
    "of fossil-bearing limestone breccia from the Buxton Limeworks quarry at Taung, South Africa. Chiseled from the stone, Dart uncovered the "
    "fossilized skull and natural endocranial brain cast of an immature juvenile hominid, approximately 3 to 4 years old, cataloged as the "
    "'Taung Child'. In February 1925, Dart published a sensational paper in 'Nature', creating a new genus and species: Australopithecus "
    "africanus ('Southern Ape of Africa'). Dart recognized that while the Taung Child had a modest ape-like brain volume (approximately 405 cc as an "
    "adult), its dental anatomy was distinctly hominid—exhibiting small, spatulate canines lacking a diastema (gap) and parabolically arranged dental "
    "arcades. Crucially, the Foramen Magnum (the aperture through which the brainstem joins the spinal cord) was positioned anteriorly beneath the base "
    "of the cranium, proving that the head was balanced atop a vertical vertebral column and that the creature walked upright on two legs. Despite "
    "Dart's brilliant diagnosis, the British scientific establishment—obsessed with the fraudulent large-brained Piltdown Man—dismissed Australopithecus "
    "as a mere fossil ape for over two decades until Robert Broom's adult discoveries at Sterkfontein vindicated Dart."
)
P1_M6_QS = [
    case_q("Early Hominid Evolution and Australopithecines", "Discoverer of the Taung Child",
     "Who discovered and described the fossilized skull of the 'Taung Child' in South Africa in 1924–1925?",
     "Raymond Dart",
     ["Louis Leakey", "Donald Johanson", "Eugène Dubois"],
     "Raymond Dart discovered the Taung Child skull in limestone breccia in South Africa, naming Australopithecus africanus in 1925."),
    case_q("Early Hominid Evolution and Australopithecines", "Taxonomic Name of the Fossil",
     "What genus and species name was coined by Raymond Dart to designate the Taung specimen?",
     "Australopithecus africanus ('Southern Ape of Africa')",
     ["Homo habilis", "Sinanthropus pekinensis", "Pithecanthropus erectus"],
     "Dart named the specimen Australopithecus africanus, recognizing it as an intermediate link bridging apes and humans."),
    case_q("Early Hominid Evolution and Australopithecines", "Anatomical Proof of Bipedalism in Taung",
     "Which critical cranial feature proved to Raymond Dart that the Taung Child walked with an upright bipedal posture?",
     "The anterior, forward position of the Foramen Magnum beneath the skull base",
     ["The presence of sharp, elongated dagger-like canine tusks",
      "A massive sagittal crest running along the top of the skull",
      "The location of the foramen magnum on the upper forehead"],
     "Anterior placement of the foramen magnum beneath the cranium balances the skull upright on a vertical spine, proving bipedalism."),
    case_q("Early Hominid Evolution and Australopithecines", "Dental Traits of Australopithecus africanus",
     "What dental traits distinguished the Taung Child from modern anthropoid apes like chimpanzees and gorillas?",
     "Small spatulate canines, absence of a canine diastema (gap), and parabolic dental arcade",
     ["Massive projecting tusk-like canines with deep diastemas",
      "Continuous growth of incisors like rodents",
      "Complete absence of molars and premolars"],
     "Taung had small human-like canines without a diastema, bicuspid premolars, and a parabolic dental arch, distinct from apes."),
    case_q("Early Hominid Evolution and Australopithecines", "British Resistance Due to Piltdown Hoax",
     "Why was Raymond Dart's announcement of Australopithecus rejected by the European scientific establishment for over twenty years?",
     "Because European anthropologists were misled by the fraudulent Piltdown Man hoax, wrongly believing that human evolution began with a giant brain",
     ["Because Dart refused to allow anyone to see the fossil",
      "Because the fossil was proved to be made of modern plaster",
      "Because South Africa was legally barred from publishing scientific research"],
     "Piltdown Man had created the false expectation that encephalization preceded bipedalism; Taung showed the opposite, so establishment elites rejected it.")
]

P2_M6_TXT = (
    "Read the following excerpt on Claude Lévi-Strauss and the Structural Alliance Theory of Kinship, "
    "and answer the questions that follow:\\n\\n"
    "In 1949, French anthropologist Claude Lévi-Strauss published his groundbreaking masterwork 'The Elementary Structures of Kinship' "
    "(Les Structures élémentaires de la parenté), launching French Structuralism and revolutionizing kinship theory. Prior to Lévi-Strauss, "
    "British structural-functionalists (like Radcliffe-Brown and Meyer Fortes) viewed kinship through 'Descent Theory', emphasizing unilineal "
    "descent groups (lineages and clans) and the transmission of corporate property. Lévi-Strauss overturned this orthodoxy by proposing 'Alliance Theory'. "
    "He argued that the universal Incest Taboo is fundamentally a rule of gift-exchange: by prohibiting men from marrying their own sisters and daughters, "
    "society forces families to renounce their women and exchange them with outside kin groups. Spouses are thus the supreme gift establishing enduring "
    "social alliances and reciprocal solidarity across groups. Lévi-Strauss classified societies into 'Elementary Structures' (which prescribe or "
    "prefer specific categories of spouses, notably Cross-Cousins) and 'Complex Structures' (which define who one cannot marry, leaving spouse choice "
    "to individual preference and market dynamics). He showed that Cross-Cousin marriage operates as two primary exchange systems: Restricted Exchange "
    "(direct bilateral exchange between two groups) and Generalized Exchange (indirect, cyclic exchange through three or more groups)."
)
P2_M6_QS = [
    case_q("Kinship Systems, Descent and Social Groups", "Formulator of Alliance Theory",
     "Which world-renowned French structural anthropologist formulated the 'Alliance Theory' of kinship in 'The Elementary Structures of Kinship'?",
     "Claude Lévi-Strauss",
     ["A.R. Radcliffe-Brown", "Bronislaw Malinowski", "Lewis Henry Morgan"],
     "Claude Lévi-Strauss formulated Alliance Theory, shifting the focus of kinship analysis from unilineal descent to marital exchange."),
    case_q("Kinship Systems, Descent and Social Groups", "Descent Theory versus Alliance Theory",
     "How did Lévi-Strauss's 'Alliance Theory' fundamentally differ from British 'Descent Theory' (Radcliffe-Brown and Fortes)?",
     "Descent Theory prioritized unilineal lineage succession and property inheritance; Alliance Theory prioritized marriage ties and gift-exchange of women between groups",
     ["Descent Theory applied only to apes, while Alliance Theory applied to modern armies",
      "Alliance Theory argued that human marriage does not exist",
      "Descent Theory was invented by ancient Greek philosophers"],
     "Descent theory prioritized agnatic/uterine lineage continuity; Alliance theory posited that marital exchange between groups is the core of kinship."),
    case_q("Kinship Systems, Descent and Social Groups", "Incest Taboo as Reciprocal Exchange",
     "In Lévi-Strauss's structuralism, what is the ultimate positive social function of the universal Incest Taboo?",
     "It obliges families to renounce their own sisters and daughters, forcing them to engage in reciprocal marital exchange and peaceful alliances with outside groups",
     ["It causes families to remain permanently isolated inside their own caves",
      "It prevents people from having any biological children",
      "It ensures that all property is inherited exclusively by the government"],
     "Lévi-Strauss proved incest taboo is a positive rule of exchange: forbidding incest forces families to establish exogamous alliances with neighbors."),
    case_q("Kinship Systems, Descent and Social Groups", "Elementary versus Complex Kinship Structures",
     "In Lévi-Strauss's taxonomy, how is an 'Elementary Structure' of kinship defined?",
     "A system that specifies a positive prescriptive or preferential rule designating which exact category of kin an individual must marry (e.g., cross-cousin marriage)",
     ["A system that has no marriage rules whatsoever",
      "A modern industrial system where marriage is decided on internet websites",
      "A system where only emperors are permitted to marry"],
     "Elementary structures designate the positive category of spouse (e.g., must marry MBD); complex structures define only negative incest prohibitions."),
    case_q("Kinship Systems, Descent and Social Groups", "Restricted Exchange versus Generalized Exchange",
     "In Alliance Theory, what characterizes a system of 'Restricted (Direct) Exchange'?",
     "Direct, symmetrical bilateral spouse exchange between two groups (Group A gives a woman to Group B and simultaneously receives a woman from Group B)",
     ["One group gives women to ten groups and never receives any women in return",
      "Spouses are purchased for cash in open commercial marketplaces",
      "Marriage is banned between all neighboring villages"],
     "Restricted exchange is direct bilateral reciprocity between two groups (A <-> B); Generalized exchange is indirect, cyclic circulation (A -> B -> C -> A).")
]

# ==============================================================================
# MOCK 7 PASSAGES
# ==============================================================================
P1_M7_TXT = (
    "Read the following case study on Upper Paleolithic Cave Art at Lascaux and Chauvet, "
    "and answer the questions that follow:\\n\\n"
    "Deep in the limestone karst caverns of Franco-Cantabria (southwestern France and northern Spain), Upper Paleolithic humans created "
    "breathtaking sanctuaries of 'Parietal Art' (Cave Art). In 1940, four teenage boys discovered Lascaux Cave in Montignac (Dordogne), "
    "revealing magnificent Magdalenian and Solutrean polychrome paintings dated to approximately 17,000 BP. Lascaux's soaring 'Hall of the Bulls' "
    "features monumental 17-foot-long aurochs, horses, and swimming stags executed with dynamic perspective and movement. In 1994, Jean-Marie Chauvet "
    "discovered Chauvet-Pont d'Arc Cave in the Ardèche valley, stunning prehistorians with Aurignacian paintings radiocarbon-dated to approximately "
    "36,000 BP—nearly double the age of Lascaux. Unlike Lascaux, which predominantly depicts hunted herbivores (horses, bison, deer), over 60% of "
    "the Chauvet fauna consists of dangerous, non-hunted apex carnivores: cave lions, woolly rhinoceroses, cave bears, and mammoths. Artists employed "
    "sophisticated techniques: surface scraping to create light backgrounds, shading (estompe) for volume, and hollow bird bones as airbrush blowpipes "
    "to spray red hematite ochre and black charcoal/manganese pigments over their hands, leaving haunting negative hand stencils in absolute darkness."
)
P1_M7_QS = [
    case_q("Paleolithic Art: Parietal Cave Paintings and Mobiliary Art", "Hall of the Bulls Cave Location",
     "The monumental 'Hall of the Bulls', featuring 17-foot-long painted wild aurochs and horses, is located in which famous prehistoric cave?",
     "Lascaux Cave in southwestern France",
     ["Altamira Cave in Spain", "Bhimbetka Cave in India", "Shanidar Cave in Iraq"],
     "The Hall of the Bulls is the iconic chamber of Lascaux Cave in the Dordogne region of France."),
    case_q("Paleolithic Art: Parietal Cave Paintings and Mobiliary Art", "Chauvet Cave Antiquity Discovery",
     "What was revolutionary about the 1994 discovery of Chauvet-Pont d'Arc Cave in France?",
     "Its sophisticated animal paintings were radiocarbon-dated to ~36,000 BP (Aurignacian), nearly double the age of Lascaux, proving artistic mastery emerged very early",
     ["It contained the first modern diesel engines ever manufactured",
      "It proved that dinosaurs lived alongside modern humans in 1900",
      "It contained written books printed in modern French"],
     "Chauvet proved advanced artistic shading and perspective existed 36 ka BP in the Aurignacian, shattering the idea of crude early art."),
    case_q("Paleolithic Art: Parietal Cave Paintings and Mobiliary Art", "Chauvet Fauna Subject Matter",
     "Unlike Lascaux, which is dominated by hunted herbivores, Chauvet Cave predominantly depicts which unusual category of animals?",
     "Dangerous apex carnivores and megafauna: cave lions, woolly rhinoceroses, cave bears, and mammoths",
     ["Domesticated dairy cattle, sheep, and dogs", "Deep-sea sharks and coral fish", "Small domestic pet cats and songbirds"],
     "Over 60% of Chauvet's identifiable animals are ferocious carnivores (lions, rhinos, bears), challenging pure hunting magic theories."),
    case_q("Paleolithic Art: Parietal Cave Paintings and Mobiliary Art", "Prehistoric Airbrush / Spray Technique",
     "Microscopic paint spatter analyses in Paleolithic caves revealed that prehistoric artists created negative hand stencils and shaded animal bodies by:",
     "Blowing powdered pigments through hollow bird bones or spitting pigment slurries from their mouths like an airbrush",
     ["Painting with nylon paint rollers bought in stores", "Stamping hands with industrial rubber stamps", "Throwing buckets of hot paint at the ceiling"],
     "Paleolithic artists used hollow bird bones as aerograph blowpipes, spraying atomized ochre over hands to leave crisp negative silhouettes."),
    case_q("Paleolithic Art: Parietal Cave Paintings and Mobiliary Art", "Parietal Art versus Mobiliary Art Distinction",
     "In prehistoric archaeology, cave paintings and engravings executed on immovable limestone rock walls are formally categorized as:",
     "Parietal Art (Rock / Cave Art)",
     ["Mobiliary Art (Portable Art)", "Ceramic Kiln Ware", "Megalithic Architecture"],
     "Immovable paintings on cave walls and ceilings are termed Parietal Art, distinct from portable Mobiliary Art (figurines, decorated tools).")
]

P2_M7_TXT = (
    "Read the following excerpt on William H. Wiser and the Hindu Jajmani System, "
    "and answer the questions that follow:\\n\\n"
    "In 1936, American missionary-sociologist William H. Wiser published his seminal ethnography 'The Hindu Jajmani System', based on field "
    "observations in the village of Karimpur in western Uttar Pradesh. Wiser was the first to systematically document and conceptualize the "
    "'Jajmani System' as an enduring, hereditary socio-economic and ritual institution governing inter-caste relations in rural India. Under this "
    "traditional network, the landowning patron castes (predominantly agriculturalists like Brahmins, Rajputs, or Jats) were designated as "
    "'Jajmans'. In turn, the various servicing and artisan castes—such as the carpenter (Barhai), blacksmith (Lohar), barber (Nai), potter (Kumhar), "
    "washerman (Dhobi), and agricultural laborer (Chamar)—were designated as 'Kamins' (or Praja). The relationship was strictly non-market based, "
    "hereditary, and multiplex: Kamins were tied to specific Jajman lineages for generations. Instead of receiving daily commercial cash wages, "
    "Kamins received customary shares of the harvest (locally termed faslana), daily meals, bundles of fodder, clothing on festival days, and "
    "exclusive house-site tenures. Wiser emphasized that the system fostered harmony, mutual security, and ritual complementarity, though later "
    "critical sociologists emphasized its exploitative, coercive inequalities."
)
P2_M7_QS = [
    case_q("Social Stratification, Caste and Jajmani System", "Pioneering Ethnographer of the Jajmani System",
     "Which sociologist/anthropologist first systematically documented and analyzed the 'Hindu Jajmani System' in Karimpur village in 1936?",
     "William H. Wiser",
     ["M.N. Srinivas", "Louis Dumont", "G.S. Ghurye"],
     "William H. Wiser published the classic foundational monograph 'The Hindu Jajmani System' in 1936."),
    case_q("Social Stratification, Caste and Jajmani System", "Role of the Jajman",
     "In the traditional rural Jajmani network, what was the structural role of the 'Jajman'?",
     "The patron, typically a member of a landowning agricultural caste who received hereditary services from servicing castes",
     ["A landless laborer who served village barbers", "A wandering monk who begged for food", "A British tax collector stationed in town"],
     "The Jajman is the landowning patron (e.g., Rajput, Jat, Brahmin) who commands agricultural land and patronizes client castes."),
    case_q("Social Stratification, Caste and Jajmani System", "Role of the Kamin (Praja)",
     "In the Jajmani system, who were the 'Kamins' (or Praja)?",
     "The client servicing and artisan castes (such as barbers, potters, blacksmiths, and sweepers) who rendered traditional services to the patron",
     ["The paramount kings who ruled the provincial capital", "Foreign merchants who traded silk overseas", "The military generals of the royal army"],
     "Kamins (Praja) are the occupational artisan and servicing specialists tied hereditarily to patron Jajman families."),
    case_q("Social Stratification, Caste and Jajmani System", "Mode of Remuneration: Faslana",
     "How were Kamins traditionally compensated for their year-round services in the non-monetized Jajmani economy?",
     "Through customary seasonal grain shares (faslana) at harvest time, daily food, clothes on festival days, and free house-site land",
     ["Through monthly electronic direct bank wire transfers",
      "By receiving 100 kilograms of solid gold bars every week",
      "By receiving zero compensation of any kind"],
     "Jajmani exchange was non-monetary: Kamins received customary grain shares (faslana) from harvest threshing floors, clothing, and house-sites."),
    case_q("Social Stratification, Caste and Jajmani System", "Hereditary Nature of Jajmani Ties",
     "What key feature ensured the continuity of Jajmani ties across generations in rural Indian villages?",
     "The relationship was hereditary: a Jajman family could not dismiss its hereditary Kamin, and a Kamin could not transfer his patron without council approval",
     ["Contracts were signed every Monday morning with lawyers",
      "Relationships expired automatically every 24 hours",
      "The British crown selected all village servants by national examination"],
     "Jajmani relationships were hereditary monopolies: passed from father to son in both patron and client lineages, providing stability and security.")
]

# ==============================================================================
# MOCK 8 PASSAGES
# ==============================================================================
P1_M8_TXT = (
    "Read the following case study on Radiocarbon (C-14) Dating and Dendrochronological Calibration, "
    "and answer the questions that follow:\\n\\n"
    "In 1949, American physical chemist Willard F. Libby and his team at the University of Chicago developed Radiocarbon (C-14) dating, "
    "a chronometric method that transformed world archaeology. Libby received the 1960 Nobel Prize in Chemistry for this breakthrough. "
    "Cosmic ray neutrons collide with atmospheric Nitrogen-14 (N-14) atoms in the upper atmosphere, transmuting them into radioactive Carbon-14 (C-14). "
    "This C-14 oxidizes into Carbon Dioxide (CO2), entering the global biosphere through plant photosynthesis and subsequent animal ingestion. "
    "Throughout life, all organisms maintain an equilibrium ratio of radioactive C-14 to stable Carbon-12 (C-12) identical to the atmosphere. "
    "Upon death, metabolic carbon intake ceases abruptly; the trapped C-14 decays exponentially back into Nitrogen-14 via beta decay, with a "
    "half-life of 5,730 ± 40 years. By measuring the residual C-14 activity, archaeologists determine the time elapsed since the organism died, "
    "dating wood, bone, charcoal, and leather up to approximately 50,000 years. However, Libby assumed atmospheric C-14 production was constant over time. "
    "Tree-ring dating (Dendrochronology) of ancient California bristlecone pines revealed that past atmospheric C-14 fluctuated significantly due "
    "to solar sunspot cycles and Earth's changing geomagnetic field, necessitating the construction of international dendrochronological calibration "
    "curves (IntCal) to convert raw radiocarbon years (BP) into true calendar years (cal BC/AD)."
)
P1_M8_QS = [
    case_q("Dating Methods in Archaeological Anthropology", "Radiocarbon Dating Inventor and Nobel Prize",
     "Who invented the revolutionary Radiocarbon (C-14) dating technique in 1949, receiving the Nobel Prize in Chemistry in 1960?",
     "Willard F. Libby",
     ["Ernest Rutherford", "Marie Curie", "Svante Pääbo"],
     "Willard Libby developed radiocarbon dating at the University of Chicago, revolutionizing archaeological chronology."),
    case_q("Dating Methods in Archaeological Anthropology", "Atmospheric Origin of Carbon-14",
     "In the upper atmosphere, how is radioactive Carbon-14 continuously generated in nature?",
     "Cosmic ray neutrons bombard atmospheric Nitrogen-14 (N-14) nuclei, transforming them into Carbon-14",
     ["Nuclear power plants leak carbon into rain clouds",
      "Volcanic lava melts coal deposits under the sea",
      "Photosynthesis in deep ocean algae produces carbon atoms"],
     "Cosmic ray neutrons collide with atmospheric N-14, displacing a proton to form radioactive C-14."),
    case_q("Dating Methods in Archaeological Anthropology", "Half-Life of Carbon-14",
     "In chronometric archaeology, what is the accepted half-life of Carbon-14 (the Cambridge half-life)?",
     "5,730 ± 40 years",
     ["1,250 million years", "24 hours", "100,000 years"],
     "The standard Cambridge half-life of C-14 is 5,730 years (Libby's initial estimate was 5,568 years)."),
    case_q("Dating Methods in Archaeological Anthropology", "Maximum Dating Limit of Conventional C-14",
     "What is the practical upper chronological age limit for dating organic samples using conventional radiocarbon dating?",
     "Approximately 50,000 to 60,000 years Before Present (BP)",
     ["Over 10 million years", "Exactly 500 years", "Up to 4.5 billion years"],
     "After ~50,000 years (~9 to 10 half-lives), residual C-14 activity is too minute to distinguish from background radiation."),
    case_q("Dating Methods in Archaeological Anthropology", "Necessity of Dendrochronological Calibration",
     "Why must raw radiocarbon dates (BP) be calibrated against master tree-ring sequences (Dendrochronology)?",
     "Because historical atmospheric C-14 production fluctuated over time due to solar activity and geomagnetic field changes",
     ["Because tree rings destroy all radioactive carbon atoms",
      "Because radiocarbon dates are always exactly 10,000 years too old",
      "Because wood cannot be dated by radiocarbon without adding sap"],
     "Tree rings of known calendar age revealed past atmospheric C-14 fluctuations, creating calibration curves (IntCal) to convert BP into true calendar years.")
]

P2_M8_TXT = (
    "Read the following excerpt on L.P. Vidyarthi's Sacred Complex of Hindu Gaya, "
    "and answer the questions that follow:\\n\\n"
    "In 1961, Indian anthropologist L.P. Vidyarthi published his landmark theoretical work 'The Sacred Complex in Hindu Gaya', based on "
    "intensive field research in the ancient pilgrimage city of Gaya in Bihar. Vidyarthi developed a sophisticated conceptual framework for "
    "analyzing civilization and Great Traditions, proposing that a sacred city functions as a 'Sacred Complex' comprising three interrelated "
    "analytical categories: Sacred Geography, Sacred Performances, and Sacred Specialists. Gaya's 'Sacred Geography' encompasses the physical "
    "and spatial layout of sacred centers, shrines, and tanks—most notably the sacred Falgu River, the holy Vishnupad Temple (preserving the "
    "footprint of Lord Vishnu carved in basalt), and the immortal Akshayavat banyan tree. The 'Sacred Performances' comprise the elaborate "
    "ritual cycles conducted by pilgrims (Yatris), predominantly the ancestral 'Pinda-Dana' (offering balls of barley, rice, and sesame seeds "
    "to redeem deceased ancestors and liberate them from suffering). The 'Sacred Specialists' are the traditional ritual functionaries who organize "
    "and mediate these ceremonies—led by the orthodox 'Gayawal' Brahmins, who maintain hereditary genealogical records (Bahi-khatas) of pilgrim "
    "lineages from all corners of India, demonstrating the pan-Indian civilizational integration forged by pilgrimage."
)
P2_M8_QS = [
    case_q("Civilizational Perspectives: Traditions and Sacred Complex", "Tripartite Model of the Sacred Complex",
     "What three analytical components constitute L.P. Vidyarthi's foundational conceptual model of the 'Sacred Complex'?",
     "Sacred Geography, Sacred Performances, and Sacred Specialists",
     ["Sacred Kings, Sacred Castles, and Sacred Armies",
      "Sacred Scriptures, Sacred Schools, and Sacred Banks",
      "Sacred Forests, Sacred Animals, and Sacred Birds"],
     "Vidyarthi conceptualized the sacred complex through: (1) Sacred Geography, (2) Sacred Performances, and (3) Sacred Specialists."),
    case_q("Civilizational Perspectives: Traditions and Sacred Complex", "Core Ritual in Gaya's Sacred Performance",
     "What primary ancestral ritual performance draws millions of Hindu pilgrims (Yatris) from across India to the sacred city of Gaya?",
     "Pinda-Dana (ancestral shraddha offerings of barley and rice balls to liberate deceased ancestors)",
     ["Animal sacrifice of thousands of wild buffaloes",
      "Immersion of golden chariots into the ocean",
      "Commercial auction of holy scriptures"],
     "Pinda-dana (offering pinda balls for ancestral peace) is the central sacred performance of the Gaya pilgrimage complex."),
    case_q("Civilizational Perspectives: Traditions and Sacred Complex", "Core Shrines in Gaya's Sacred Geography",
     "Which sacred centers form the core spatial landmarks of Gaya's Sacred Geography analyzed by Vidyarthi?",
     "The holy Falgu River, the Vishnupad Temple, and the immortal Akshayavat banyan tree",
     ["The Golden Temple and the Red Fort", "The Konark Sun Temple and Puri Beach", "The Taj Mahal and Qutub Minar"],
     "Falgu river, Vishnupad temple (Vishnu's footprint), and Akshayavat tree constitute the paramount sacred geography of Gaya."),
    case_q("Civilizational Perspectives: Traditions and Sacred Complex", "Sacred Specialists: The Gayawal Pandas",
     "Who are the primary 'Sacred Specialists' of Hindu Gaya who possess a hereditary monopoly over conducting ancestral shraddha rituals?",
     "The Gayawal Brahmins (Pandas)",
     ["The Buddhist monks of Nalanda", "The Jain temple ascetics", "The British colonial municipal commissioners"],
     "The Gayawals are the hereditary Brahmin specialists of Gaya, guiding pilgrims and certifying the final Suphal of Pinda-Dana."),
    case_q("Civilizational Perspectives: Traditions and Sacred Complex", "Civilizational Integration Through Pilgrimage",
     "According to Vidyarthi, how do sacred complexes like Gaya foster pan-Indian civilizational integration?",
     "By maintaining centuries-old genealogical ties with pilgrim families across diverse linguistic states, uniting regional Little Traditions into a shared Great Tradition",
     ["By forcing all pilgrims to speak only one regional dialect",
      "By collecting wealth to fund foreign colonial wars",
      "By abolishing all differences between castes in daily village life"],
     "Pilgrimage integrates the civilization: pilgrims from Kashmir to Tamil Nadu meet at Gaya, united by shared ancestral rituals and sacred specialists.")
]

# ==============================================================================
# MOCK 9 PASSAGES
# ==============================================================================
P1_M9_TXT = (
    "Read the following case study on Lower Paleolithic Antiquity at Attirampakkam and the Indian Acheulean, "
    "and answer the questions that follow:\\n\\n"
    "In 2011, a landmark paper published in 'Science' by geoarchaeologists Shanti Pappu and Kumar Akhilesh of the Sharma Centre for "
    "Heritage Education revolutionized Indian prehistory. Excavating at the iconic open-air Paleolithic site of Attirampakkam in the Kortallayar "
    "River basin near Chennai (Tamil Nadu)—first discovered by Robert Bruce Foote in 1863—the researchers applied high-resolution Cosmogenic "
    "Nuclide Burial Dating (measuring the radioactive decay of Aluminium-26 and Beryllium-10 in buried quartz grains) to date the Acheulean layer. "
    "The results established that hominins manufacturing Acheulean bifacial handaxes and cleavers were established in Peninsular India by approximately "
    "1.51 million years ago (spanning 1.7 to 1.0 Ma). Prior to this breakthrough, Eurocentric scholars assumed that Acheulean hominids migrated to "
    "India only in the Middle Pleistocene (<500 ka). Attirampakkam proved that the Indian Lower Paleolithic is virtually contemporaneous with the "
    "earliest Acheulean dispersals out of Africa and the Levant (such as 'Ubeidiya in Israel). The excavations revealed pristine Acheulean bifaces "
    "manufactured on local quartzite cobbles, documenting the systematic use of soft-hammer thinning and intentional mental symmetry over a million years ago."
)
P1_M9_QS = [
    case_q("Lower Paleolithic Cultures: Oldowan, Acheulean and Soan Traditions", "Attirampakkam Dating Breakthrough",
     "The revolutionary dating of the Acheulean layer at Attirampakkam (Tamil Nadu) by Shanti Pappu established an antiquity of approximately:",
     "1.51 Million Years ago (Early Pleistocene)",
     ["50,000 years ago", "10,000 years ago", "100,000 years ago"],
     "Pappu et al. dated the Attirampakkam Acheulean to ~1.51 Ma, pushing Indian Lower Paleolithic antiquity deep into the Early Pleistocene."),
    case_q("Lower Paleolithic Cultures: Oldowan, Acheulean and Soan Traditions", "Dating Technique Applied at Attirampakkam",
     "Which cutting-edge absolute dating method was utilized at Attirampakkam to date the deeply buried Acheulean stone tools?",
     "Cosmogenic Nuclide Burial Dating (Aluminium-26 / Beryllium-10 ratio in quartz grains)",
     ["Radiocarbon (C-14) dating", "Potassium-Argon dating of volcanic ash", "Dendrochronology of tree rings"],
     "Cosmogenic nuclide burial dating measures the differential decay of Al-26 and Be-10 in quartz sand, dating Early Pleistocene sediment burial."),
    case_q("Lower Paleolithic Cultures: Oldowan, Acheulean and Soan Traditions", "Global Prehistoric Implications",
     "Why was the 1.51-million-year-old date at Attirampakkam globally momentous for world prehistory?",
     "It proved that Acheulean hominins expanded into South Asia virtually contemporaneously with their earliest dispersals out of Africa and the Levant",
     ["It showed that stone tools were first invented in South America",
      "It proved that Neanderthals built modern cities in Tamil Nadu",
      "It demonstrated that no hominins ever lived in India during the Pleistocene"],
     "The 1.5 Ma date proved early Homo erectus reached South Asia immediately after leaving Africa, refuting the delayed colonization model."),
    case_q("Lower Paleolithic Cultures: Oldowan, Acheulean and Soan Traditions", "Attirampakkam Historical Discoverer",
     "Attirampakkam is located within the prehistoric Kortallayar basin, which was first discovered as a rich Paleolithic locality in 1863 by:",
     "Robert Bruce Foote (the Father of Indian Prehistory)",
     ["Sir John Marshall", "Alexander Cunningham", "Sir Mortimer Wheeler"],
     "Robert Bruce Foote discovered Attirampakkam in 1863, establishing the Kortallayar basin as the cradle of Indian prehistoric research."),
    case_q("Lower Paleolithic Cultures: Oldowan, Acheulean and Soan Traditions", "Tool Types Recovered at Attirampakkam",
     "What diagnostic stone tool forms characterize the Lower Paleolithic artifact assemblage at Attirampakkam?",
     "Bifacial handaxes, cleavers, discoidal cores, and scrapers manufactured on quartzite",
     ["Polished ceramic pottery with painted geometric designs",
      "Fine geometric microliths mounted into wooden sickles",
      "Iron swords and bronze arrowheads"],
     "The Attirampakkam assemblage comprises classical Mode 2 Acheulean bifaces: teardrop handaxes, cleavers, and flakes made on quartzite.")
]

P2_M9_TXT = (
    "Read the following excerpt on S.C. Dube's Landmark Monograph 'Indian Village' (Shamirpet), "
    "and answer the questions that follow:\\n\\n"
    "In 1955, renowned Indian sociologist and anthropologist S.C. Dube published 'Indian Village', a landmark multi-disciplinary study of "
    "Shamirpet, a village located in the Medak-Telangana region near Hyderabad. Prior to Dube's monograph, empirical descriptions of Indian "
    "rural social structure were scarce, often overshadowed by colonial stereotypes of isolated 'little republics'. Dube carried out holistic "
    "fieldwork with a multi-disciplinary team, analyzing Shamirpet as a complex, functioning social system. The village was multi-ethnic and "
    "multi-caste, comprising Hindus, Muslims, and untouchable communities. Dube demonstrated that village life was structured by six intersecting "
    "organizing principles: religion and caste (ritual hierarchy), land ownership and wealth, kinship and lineage alliances, territorial affinity, "
    "formal legal administration, and gender/age divisions. He documented the vital web of occupational specialization and mutual dependence "
    "linking agriculturists with servicing castes (blacksmith, potter, washerman, barber), demonstrating that while caste established hierarchical "
    "social distance, daily survival and lifecycle rituals necessitated perpetual inter-caste economic cooperation and structural equilibrium."
)
P2_M9_QS = [
    case_q("Indian Village Studies and Rural Social Structure", "Author and Village of 'Indian Village'",
     "Who authored the classic 1955 monograph 'Indian Village', and which village in the Telangana region was the subject of this study?",
     "S.C. Dube; Shamirpet village",
     ["M.N. Srinivas; Rampura village", "André Béteille; Sripuram village", "McKim Marriott; Kishan Garhi village"],
     "S.C. Dube authored 'Indian Village' (1955), investigating Shamirpet village in the Telangana region near Hyderabad."),
    case_q("Indian Village Studies and Rural Social Structure", "Multi-Disciplinary Team Approach",
     "What unique methodological feature distinguished S.C. Dube's Shamirpet research project from traditional single-ethnographer studies?",
     "It utilized an interdisciplinary team approach, incorporating anthropologists, sociologists, economists, agricultural scientists, and medical doctors",
     ["It was conducted exclusively by interviewing politicians in Delhi",
      "It relied entirely on analyzing ancient Sanskrit manuscripts in a library",
      "It was conducted using satellite photography from space"],
     "Dube led a multi-disciplinary research team (Social Sciences, Agriculture, Medicine, Veterinary) from Osmania University in Shamirpet."),
    case_q("Indian Village Studies and Rural Social Structure", "Refutation of Village Isolation",
     "How did Dube's findings in Shamirpet decisively challenge colonial stereotypes of the Indian village as an isolated, self-sufficient entity?",
     "By proving that Shamirpet was deeply tied to wider regional markets, urban Hyderabad for wage labor, caste councils, and extensive marriage networks",
     ["By showing that villagers never spoke to anyone outside their household",
      "By proving that no trade ever existed in rural India",
      "By showing that the village was surrounded by an impassable high stone wall"],
     "Dube proved Shamirpet was socially and economically outward-looking: connected to Hyderabad, external markets, and regional kinship nets."),
    case_q("Indian Village Studies and Rural Social Structure", "Organizing Principles of Village Life",
     "According to S.C. Dube, which structural factors organize social relations, status ranking, and power in the Indian village?",
     "Caste, land ownership, kinship ties, territoriality, administrative hierarchy, and age/gender divisions",
     ["Only individual physical strength measured by wrestling matches",
      "Alphabetical order of family surnames",
      "The astrological signs of the zodiac exclusively"],
     "Dube identified six organizing determinants of village life: caste, land/wealth, kinship, territoriality, formal administration, and age/sex."),
    case_q("Indian Village Studies and Rural Social Structure", "Inter-Caste Complementarity and Hierarchy",
     "What paradoxical reality of rural caste relations did Dube illuminate in Shamirpet?",
     "Caste maintained rigid social distance and ritual hierarchy, yet village survival demanded constant economic interdependence and ritual cooperation",
     ["All castes lived in identical houses and ate together without any rules",
      "Lower castes owned all the cultivable land in the village",
      "Brahmins performed all manual agricultural farm labor"],
     "Caste enforces ritual hierarchy and distance, yet necessitates daily cooperation: agriculturalists depend on artisan/service castes for survival.")
]

# ==============================================================================
# MOCK 10 PASSAGES
# ==============================================================================
P1_M10_TXT = (
    "Read the following case study on V. Gordon Childe's Neolithic Revolution and the Excavations at Mehrgarh, "
    "and answer the questions that follow:\\n\\n"
    "In 1936, Australian-born Marxist prehistorian V. Gordon Childe coined the phrase 'Neolithic Revolution' to designate the profound "
    "socio-economic transformation that occurred when mobile hunter-gatherers transitioned to settled food production based on plant agriculture "
    "and animal domestication. Childe argued that agriculture generated an economic food surplus, permitting population explosion, permanent "
    "village architecture, craft specialization (pottery and polished stone tools), and eventual urban civilization. In South Asia, the truth of "
    "Childe's model was dramatically confirmed by the French Archaeological Mission led by Jean-François Jarrige at Mehrgarh, situated on the "
    "Bolan River in Balochistan (Pakistan). Spanning seven major occupational periods from ~7000 BCE to 2600 BCE, Mehrgarh revealed an unbroken "
    "sequence from the early Aceramic (pre-pottery) Neolithic into the Bronze Age. In Period I (~7000–5500 BCE), settlers constructed rectangular "
    "compartmentalized mud-brick houses, cultivated domesticated naked six-row barley and einkorn/emmer wheat, and selectively bred indigenous "
    "humped Zebu cattle (Bos indicus). Remarkably, teeth from Period I graves revealed microscopic circular drill-holes in adult molars, "
    "documenting the world's earliest evidence of in-vivo proto-dentistry using flint micro-drills over 8,500 years ago."
)
P1_M10_QS = [
    case_q("Neolithic Revolution: Plant and Animal Domestication in India", "Coined the Term 'Neolithic Revolution'",
     "Which influential prehistorian coined the phrase 'Neolithic Revolution' in 'Man Makes Himself' (1936)?",
     "V. Gordon Childe",
     ["Robert Bruce Foote", "Sir John Marshall", "Louis Leakey"],
     "V. Gordon Childe formulated the 'Neolithic Revolution' to describe the transformative shift from foraging to food production."),
    case_q("Neolithic Revolution: Plant and Animal Domestication in India", "Mehrgarh Geographic Setting and Excavator",
     "The foundational Neolithic site of Mehrgarh is located on the Bolan River in Balochistan and was systematically excavated by:",
     "Jean-François Jarrige and the French Archaeological Mission",
     ["Sir Mortimer Wheeler", "Robert Bruce Foote", "V.S. Wakankar"],
     "Jean-François Jarrige excavated Mehrgarh from 1974 onward, discovering the 7000 BCE Neolithic foundation of South Asian civilization."),
    case_q("Neolithic Revolution: Plant and Animal Domestication in India", "Aceramic Neolithic Phase (Period I)",
     "What diagnostic features characterized Period I (~7000–5500 BCE) at Mehrgarh?",
     "Aceramic (pre-pottery) Neolithic with mud-brick houses, cultivation of barley and wheat, and domestic Zebu cattle",
     ["Extensive iron smelting furnaces and steel weapons",
      "Wheel-made glazed porcelain imported from China",
      "A massive naval shipyard made of fired bricks"],
     "Mehrgarh Period I was aceramic (no pottery): people built rectangular mud-brick houses, farmed barley/wheat, and herded sheep/zebu cattle."),
    case_q("Neolithic Revolution: Plant and Animal Domestication in India", "Earliest Evidence of Proto-Dentistry",
     "What sensational anthropological discovery regarding Neolithic health and technology was made on human teeth from Mehrgarh Period I?",
     "Microscopic drill-holes in living human molars made with tiny flint micro-drills, representing the world's earliest in-vivo dentistry",
     ["Gold and silver dental fillings carved by jewelers",
      "Complete replacement of teeth with wooden dentures",
      "The complete absence of tooth wear or cavities in all individuals"],
     "In-vivo flint micro-drilling of molars at Mehrgarh (~7000 BCE) proved skilled proto-dentistry existed 9,000 years ago in South Asia."),
    case_q("Neolithic Revolution: Plant and Animal Domestication in India", "Indigenous Domestication of Zebu Cattle",
     "Zooarchaeological research at Mehrgarh by Richard Meadow provided definitive proof for the independent, indigenous South Asian domestication of:",
     "Humped Zebu Cattle (Bos indicus) from wild Indian aurochs",
     ["The African two-humped camel", "The South American llama", "The Australian red kangaroo"],
     "Faunal analysis at Mehrgarh proved local domestication of humped Zebu cattle (Bos indicus) from local wild aurochs by 6000 BCE.")
]

P2_M10_TXT = (
    "Read the following excerpt on the Forest Rights Act (FRA) 2006 and the Landmark Niyamgiri Gram Sabha Victory, "
    "and answer the questions that follow:\\n\\n"
    "In 2006, the Parliament of India enacted the 'Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act', "
    "popularly known as the Forest Rights Act (FRA). The Act was remedial in character, aiming to correct the 'historical injustice' committed "
    "against forest-dwelling communities who had resided in and conserved forests for generations without formal legal recognition of their rights. "
    "The FRA recognizes Individual Forest Rights (IFR) for self-cultivation up to 4 hectares, rights to collect and own Minor Forest Produce (MFP), "
    "and revolutionary Community Forest Resource (CFR) rights under Section 3(1)(i), which empowers the village 'Gram Sabha' to protect, regenerate, "
    "and manage traditional community forests. The historic power of the FRA was demonstrated in 2013 in the sacred Niyamgiri hills of Rayagada "
    "and Kalahandi districts in Odisha. Mining multinational Vedanta proposed an open-cast bauxite mine on the summit of Niyamgiri, revered by the "
    "Particularly Vulnerable Tribal Group (PVTG) Dongria Kondh as the sacred abode of their supreme deity, 'Niyam Raja'. In a landmark ruling, the "
    "Supreme Court of India directed that the religious and cultural rights of the Dongria Kondh must be decided by the local Gram Sabhas. In an "
    "unprecedented democratic exercise, all 12 village Gram Sabhas unanimously voted against the bauxite mine, legally halting the project."
)
P2_M10_QS = [
    case_q("Constitutional Safeguards, PESA, Forest Rights and PVTGs", "Objective of the Forest Rights Act 2006",
     "What was the explicit legislative objective articulated in the Preamble of the Forest Rights Act (FRA) 2006?",
     "To undo the 'historical injustice' committed against forest-dwelling Scheduled Tribes and traditional forest dwellers by formally vesting their land and forest rights",
     ["To expel all tribal people from national parks and tiger reserves",
      "To transfer all Indian forests to foreign commercial logging companies",
      "To abolish all village Gram Sabhas across India"],
     "FRA 2006 was enacted explicitly to undo historic injustice, vesting tenurial and community rights to forest dwellers."),
    case_q("Constitutional Safeguards, PESA, Forest Rights and PVTGs", "Community Forest Resource (CFR) Rights",
     "Under Section 3(1)(i) of the FRA 2006, what statutory authority is conferred by Community Forest Resource (CFR) rights?",
     "The right of the village Gram Sabha to protect, regenerate, conserve, and sustainably manage its traditional community forest resources",
     ["The right of commercial paper mills to clear-cut all bamboo",
      "The right of the state police to arrest villagers without a warrant",
      "The right to burn down the forest for real estate development"],
     "Section 3(1)(i) CFR rights empower the Gram Sabha to govern, protect, and sustainably manage their customary community forests."),
    case_q("Constitutional Safeguards, PESA, Forest Rights and PVTGs", "Dongria Kondh and Sacred Niyamgiri",
     "The Particularly Vulnerable Tribal Group (PVTG) that fought a historic struggle against bauxite mining in the Niyamgiri hills of Odisha is:",
     "The Dongria Kondh tribe",
     ["The Toda tribe of the Nilgiris", "The Sentinelese of the Andaman Islands", "The Gujjars of Jammu and Kashmir"],
     "The Dongria Kondh of Niyamgiri revere the forested mountain as their deity Niyam Raja, successfully resisting bauxite mining under the FRA."),
    case_q("Constitutional Safeguards, PESA, Forest Rights and PVTGs", "Supreme Court Mandate to the Gram Sabha (2013)",
     "In the landmark 2013 Niyamgiri judgment, what decisive constitutional authority did the Supreme Court of India vest in the local Gram Sabhas?",
     "The authority to adjudicate whether proposed bauxite mining would violate their sacred religious, cultural, and community rights",
     ["The order to immediately arrest all tribal elders",
      "The order to accept financial compensation and evacuate the mountain",
      "The directive to transfer all mineral rights to foreign investors"],
     "The Supreme Court ruled that the Gram Sabha possesses sovereign authority to decide if bauxite mining infringed upon their religious rights."),
    case_q("Constitutional Safeguards, PESA, Forest Rights and PVTGs", "Unanimous Gram Sabha Verdict",
     "What was the historic outcome of the 12 village Gram Sabha referendums conducted across the Niyamgiri hills in 2013?",
     "All 12 Gram Sabhas voted unanimously against the bauxite mine, leading the Ministry of Environment to formally reject environmental clearance",
     ["All Gram Sabhas voted in favor of the mining project",
      "The Gram Sabhas refused to participate in the voting",
      "The voting resulted in a 50-50 tie"],
     "In a historic triumph of grassroots environmental democracy, all 12 Dongria Kondh Gram Sabhas unanimously rejected the bauxite mining project.")
]

# ==============================================================================
# PASSAGES 1 TO 10 ASSEMBLY
# ==============================================================================
PASSAGES_1_10 = [
    ( (P1_M1_TXT, P1_M1_QS), (P2_M1_TXT, P2_M1_QS) ),
    ( (P1_M2_TXT, P1_M2_QS), (P2_M2_TXT, P2_M2_QS) ),
    ( (P1_M3_TXT, P1_M3_QS), (P2_M3_TXT, P2_M3_QS) ),
    ( (P1_M4_TXT, P1_M4_QS), (P2_M4_TXT, P2_M4_QS) ),
    ( (P1_M5_TXT, P1_M5_QS), (P2_M5_TXT, P2_M5_QS) ),
    ( (P1_M6_TXT, P1_M6_QS), (P2_M6_TXT, P2_M6_QS) ),
    ( (P1_M7_TXT, P1_M7_QS), (P2_M7_TXT, P2_M7_QS) ),
    ( (P1_M8_TXT, P1_M8_QS), (P2_M8_TXT, P2_M8_QS) ),
    ( (P1_M9_TXT, P1_M9_QS), (P2_M9_TXT, P2_M9_QS) ),
    ( (P1_M10_TXT, P1_M10_QS), (P2_M10_TXT, P2_M10_QS) )
]

assert len(PASSAGES_1_10) == 10, f"Expected 10 pairs, got {len(PASSAGES_1_10)}"
for m_idx, (p1, p2) in enumerate(PASSAGES_1_10, start=1):
    assert len(p1[1]) == 5, f"Mock {m_idx} P1 has {len(p1[1])} Qs"
    assert len(p2[1]) == 5, f"Mock {m_idx} P2 has {len(p2[1])} Qs"

print(f"Anthropology Passages 1 to 10 compiled successfully: 10 pairs (20 passages, 100 questions).")
'''

with open(out_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Generated {out_path} ({len(content)} bytes)")
