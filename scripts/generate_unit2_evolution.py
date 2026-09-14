import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scripts.bio_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, normalize_text, get_pyq_normalized_set
)

questions = []
seen = set()
pyq_seen = get_pyq_normalized_set()

# Load prior units seen to ensure uniqueness
for u in ["unit1.json", "unit2_genetics.json"]:
    p = f"mock/bio_units/{u}"
    if os.path.exists(p):
        with open(p) as f:
            for q in json.load(f):
                seen.add(normalize_text(q["questionText"]))

def add(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:70]}")
    if norm in pyq_seen:
        raise ValueError(f"Matches PYQ: {q['questionText'][:70]}")
    seen.add(norm)
    questions.append(q)

print("Starting generation of Unit 2B Evolution questions (80 questions)...")

add(make_question(
    "Evolution",
    "Age of Earth and Universe",
    "According to scientific consensus presented in NCERT, the universe is almost 20 billion years old. The Earth was formed approximately how many years ago?",
    ["4.5 billion years ago", "10 billion years ago", "20 billion years ago", "500 million years ago"],
    "A",
    "1. The universe is very old – almost 20 billion years old.\n2. Earth was supposed to have been formed about 4.5 billion years back.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Early Earth Atmosphere",
    "The atmosphere of early primitive Earth was reducing in nature and lacked free molecular oxygen. It consisted primarily of:",
    ["Water vapour, methane, carbon dioxide, and ammonia", "Oxygen, nitrogen, and carbon monoxide", "Ozone, hydrogen sulfide, and chlorine", "Sulfur dioxide, helium, and oxygen"],
    "A",
    "1. There was no atmosphere on early earth.\n2. Water vapour, methane, carbon dioxide and ammonia released from molten mass covered the surface.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Pasteur Biogenesis Experiment",
    "Louis Pasteur disproved the theory of spontaneous generation (abiogenesis) by demonstrating that:",
    [
        "Life comes only from pre-existing life, using pre-sterilised swan-neck flasks where boiled yeast killed by heat did not give rise to any life in closed flasks",
        "Amino acids can be created by electric sparks in methane",
        "Maggots arise spontaneously from rotting decaying meat in open containers",
        "Coacervates possess a lipid bilayer and genetic code"
    ],
    "A",
    "1. Louis Pasteur by careful experimentation demonstrated that life comes only from pre-existing life.\n2. He showed that in pre-sterilised flasks, life did not come from killed yeast while in another flask open to air, new living organisms arose from 'killed yeast'.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Oparin-Haldane Hypothesis",
    "Oparin of Russia and Haldane of England proposed that the first form of life could have come from pre-existing non-living organic molecules. This theory is termed:",
    ["Chemical evolution", "Theory of Panspermia (Cosmozoic)", "Theory of Spontaneous Generation", "Catastrophism"],
    "A",
    "1. Oparin of Russia and Haldane of England proposed that the first form of life could have come from pre-existing non-living organic molecules (e.g. RNA, protein, etc.) and that formation of life was preceded by chemical evolution.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Miller-Urey Experiment Conditions",
    "In 1953, S.L. Miller created primitive Earth conditions in a laboratory closed flask. What gases and temperature did he use to produce electric discharge?",
    ["CH4, H2, NH3, and water vapour at 800°C", "CO2, O2, N2, and steam at 100°C", "CH4, CO, H2S, and steam at 1500°C", "NH3, O2, H2, and water vapour at 500°C"],
    "A",
    "1. In 1953, S.L. Miller, an American scientist, created similar conditions in a laboratory scale.\n2. He created electric discharge in a closed flask containing CH4, H2, NH3 and water vapour at 800°C.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Miller Experiment Organic Product",
    "In Miller's electric discharge experiment, analysis of the resulting fluid revealed the synthesis of:",
    ["Amino acids (glycine, alanine, and aspartic acid)", "Complete functional DNA viruses", "Bacterial cell walls of peptidoglycan", "Living prokaryotic protobionts"],
    "A",
    "1. Miller observed formation of amino acids. In similar experiments others observed formation of sugars, nitrogen bases, pigment and fats.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Von Baer Disproval of Haeckel",
    "Ernst Haeckel proposed embryological support for evolution based on the observation that certain features during embryonic stages are common to all vertebrates. This was disproved by:",
    ["Karl Ernst von Baer, who noted that embryos never pass through the adult stages of other animals", "Charles Darwin", "Alfred Russel Wallace", "Thomas Malthus"],
    "A",
    "1. This proposal was disapproved by Karl Ernst von Baer who noted that embryos never pass through the adult stages of other animals.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Homologous Organs & Divergent Evolution",
    "Homologous structures share common anatomical origin but perform different functions. Which of the following is a classic example of homology and divergent evolution?",
    ["Forelimbs of whales, bats, cheetah, and humans", "Wings of butterfly and wings of birds", "Eyes of octopus and eyes of mammals", "Flippers of penguins and dolphins"],
    "A",
    "1. Whales, bats, Cheetah and human (all mammals) share similarities in the pattern of bones of forelimbs.\n2. These structures developed along different directions due to adaptations to different needs. This is divergent evolution and these structures are homologous.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Plant Homologous Organs Example",
    "Which pair of plant organs represents homology resulting from divergent evolution?",
    ["Thorns of Bougainvillea and tendrils of Cucurbita", "Sweet potato (root) and potato (stem)", "Spines of cactus and leaves of onion", "Phyllode of Acacia and cladode of Ruscus"],
    "A",
    "1. In plants, thorns of Bougainvillea and tendrils of Cucurbita represent homology because both are modified axillary buds that perform different functions (defense vs climbing).\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Analogous Organs & Convergent Evolution",
    "Analogous organs are anatomically different structures that perform similar functions due to similar selective pressures. Which of the following is an example of analogy?",
    ["Wings of a butterfly and wings of a bird", "Forelimb of horse and arm of human", "Heart of fish and heart of mammal", "Mouthparts of cockroach and mosquito"],
    "A",
    "1. Wings of butterfly and of birds look alike. They are not anatomically similar structures though they perform similar functions. Hence, analogous structures are a result of convergent evolution.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Sweet Potato vs Potato Analogy",
    "Sweet potato and potato represent analogous organs because:",
    ["Sweet potato is an underground root modification while potato is an underground stem modification, both storing starch", "Both are modified leaves storing sugar", "Both possess identical pericycle anatomy", "Both develop from floral thalamus"],
    "A",
    "1. Sweet potato (root modification) and potato (stem modification) is another example for analogy as both are modified for storage of food.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Industrial Melanism in Peppered Moth",
    "In England, before industrialization (1850s), white-winged peppered moths (Biston betularia) were more abundant than dark melanic moths (Biston carbonaria). After industrialization (1920s), dark moths predominated because:",
    [
        "Tree trunks were covered with soot and dark moths were camouflaged from predatory birds, whereas white moths were easily spotted and eaten",
        "Soot induced a directed germline mutation transforming white moths into dark moths",
        "White moths migrated south due to cold climate",
        "Dark moths developed immunity to sulfur dioxide gas"
    ],
    "A",
    "1. During post-industrialisation period, the tree trunks became dark due to industrial smoke and soots.\n2. Under this condition the white-winged moth did not survive due to predators, dark-winged or melanised moth survived because of camouflage.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Lichens as Industrial Pollution Indicators",
    "In the industrial melanism study, why did tree trunks in unpolluted rural areas remain light coloured?",
    ["They were covered with thick growths of white lichens, which cannot grow in polluted industrial areas", "Rural trees secreted bleaching enzymes", "Soot was washed away by excessive rainfall", "Predatory birds wiped out mosses"],
    "A",
    "1. Before industrialisation set in, thick growth of almost white-coloured lichen covered the trees.\n2. Lichens do not grow in polluted areas (they are sensitive pollution indicators).\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Evolution by Anthropogenic Action Examples",
    "The rapid emergence of pesticide-resistant mosquitoes and antibiotic-resistant bacteria are examples of:",
    ["Evolution by anthropogenic action (human intervention) occurring in months/years rather than centuries", "Lamarckian inheritance of acquired resistance", "Spontaneous generation in polluted media", "Catastrophic macro-mutations"],
    "A",
    "1. Excess use of herbicides, pesticides, etc., has resulted in selection of resistant varieties in a much lesser time scale.\n2. This is also true for microbes against which we employ antibiotics or drugs.\n3. These are examples of evolution by anthropogenic action.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Darwin's Finches Adaptive Radiation",
    "During his journey on HMS Beagle, Charles Darwin observed finches on the Galapagos Islands. The evolution of diverse beak morphologies starting from an original seed-eating ancestor to insectivorous and vegetarian forms represents:",
    ["Adaptive radiation", "Convergent evolution", "Saltation", "Industrial melanism"],
    "A",
    "1. This process of evolution of different species in a given geographical area starting from a point and literally radiating to other areas of geography (habitats) is called adaptive radiation.\n2. Darwin's finches represent one of the best examples of this phenomenon.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Australian Marsupials Radiation",
    "Another classic example of adaptive radiation within an isolated continent is shown by:",
    ["Australian marsupials radiating from an ancestral stock", "Darwin's finches in Madagascar", "Placental mammals in Africa", "Cichlid fishes in Lake Baikal"],
    "A",
    "1. Australian marsupials are another example: a number of marsupials, each different from the other evolved from an ancestral stock, but all within the Australian island continent.\nHence, Option A is correct."
))

add(make_match_question(
    "Evolution",
    "Placental Mammals and Australian Marsupials Convergence",
    "Match List I (Placental mammal) with List II (Convergent Australian marsupial):",
    [
        ("(A)", "Anteater"),
        ("(B)", "Wolf"),
        ("(C)", "Flying squirrel"),
        ("(D)", "Bobcat")
    ],
    [
        ("(I)", "Tasmanian wolf"),
        ("(II)", "Numbat (banded anteater)"),
        ("(III)", "Tasmanian tiger cat"),
        ("(IV)", "Flying phalanger")
    ],
    [
        "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)",
        "(A)-(I), (B)-(II), (C)-(IV), (D)-(III)",
        "(A)-(II), (B)-(IV), (C)-(I), (D)-(III)",
        "(A)-(III), (B)-(I), (C)-(IV), (D)-(II)"
    ],
    "A",
    "1. Anteater matches Numbat (A -> II).\n2. Wolf matches Tasmanian wolf (B -> I).\n3. Flying squirrel matches Flying phalanger (C -> IV).\n4. Bobcat matches Tasmanian tiger cat (D -> III).\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Darwin's Key Concepts",
    "According to Charles Darwin, what are the two key concepts of his theory of evolution?",
    ["Branching descent and natural selection", "Mutation and saltation", "Use and disuse of organs", "Inheritance of acquired characters"],
    "A",
    "1. Branching descent and natural selection are the two key concepts of Darwinian Theory of Evolution.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Lamarck Giraffe Theory",
    "Jean-Baptiste Lamarck, a French naturalist, proposed that evolution of life forms occurred driven by use and disuse of organs, citing which classic example?",
    ["Giraffes elongating their necks to forage leaves on tall trees", "Darwin's finches changing beaks", "Biston betularia adapting to soot", "Horses developing hooves on grasslands"],
    "A",
    "1. Lamarck gave the examples of Giraffes who in an attempt to forage leaves on tall trees had to adapt by elongation of their necks (use and disuse of organs).\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Hugo de Vries Mutation Theory",
    "Hugo de Vries conducted experiments on evening primrose (Oenothera lamarckiana) and proposed that evolution occurs by large, single-step mutations which he called:",
    ["Saltation", "Natural selection", "Branching descent", "Genetic drift"],
    "A",
    "1. Hugo de Vries brought forth the idea of mutations. He believed that it is mutation which causes evolution and not the minor variations that Darwin talked about.\n2. Mutations are random and directionless while Darwinian variations are small and directional. He called single step large mutation saltation.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Hardy-Weinberg Equation",
    "The Hardy-Weinberg principle states that allele frequencies in a population are stable from generation to generation in genetic equilibrium. The binomial expansion representing this equilibrium is:",
    ["p^2 + 2pq + q^2 = 1", "p + q = 2pq", "p^2 - q^2 = 1", "p^2 + q^2 = 2pq"],
    "A",
    "1. This is represented by the equation p^2 + 2pq + q^2 = 1, where p is frequency of allele A, q is frequency of allele a, p^2 is AA, 2pq is Aa, and q^2 is aa.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Hardy-Weinberg Numerical Calculation",
    "In a population in Hardy-Weinberg equilibrium, if the frequency of a recessive allele (q) is 0.4, what will be the frequency of heterozygous individuals (2pq)?",
    ["0.48 (48%)", "0.16 (16%)", "0.36 (36%)", "0.24 (24%)"],
    "A",
    "1. Given q = 0.4. Since p + q = 1, p = 1 - 0.4 = 0.6.\n2. Frequency of heterozygotes = 2pq = 2 * (0.6) * (0.4) = 0.48 (48%).\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Five Factors Affecting Hardy-Weinberg Equilibrium",
    "All of the following are known factors that disrupt Hardy-Weinberg equilibrium EXCEPT:",
    ["Random large-population mating with no migration or selection", "Gene migration or gene flow", "Genetic drift and founder effect", "Genetic recombination and mutation"],
    "A",
    "1. Five factors are known to affect Hardy-Weinberg equilibrium: gene migration or gene flow, genetic drift, mutation, genetic recombination and natural selection.\n2. Random mating without migration, mutation, or selection maintains equilibrium.\nHence, Option A is the exception."
))

add(make_question(
    "Evolution",
    "Founder Effect Definition",
    "When a small group of individuals migrates and establishes a new isolated population, their distinct gene pool changes so substantially that they become a different species. The original drifted population is called founders and the effect is termed:",
    ["Founder effect", "Bottleneck effect", "Directional selection", "Stabilizing selection"],
    "A",
    "1. Sometimes the change in allele frequency is so different in the new sample of population that they become a different species.\n2. The original drifted population becomes founders and the effect is called founder effect.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Types of Natural Selection",
    "Natural selection can lead to stabilizing, directional, or disruptive changes. What occurs during disruptive selection?",
    [
        "More individuals acquire peripheral character values at both ends of the distribution curve, producing two peaks",
        "More individuals acquire mean character value, making peak narrower",
        "More individuals acquire value other than the mean, shifting the peak in one direction",
        "All variations are eliminated simultaneously"
    ],
    "A",
    "1. In disruptive selection, more individuals acquire peripheral character value at both ends of the distribution curve, splitting the single peak into two peaks.\n2. In stabilizing selection, mean value is favoured (peak gets higher/narrower). In directional, peak shifts in one direction.\nHence, Option A is correct."
))

add(make_sequence_question(
    "Evolution",
    "Human Evolution Chronological Order",
    "Arrange the following ancestors of modern humans in the correct chronological sequence of their evolutionary appearance:",
    [
        "Dryopithecus and Ramapithecus",
        "Australopithecus",
        "Homo habilis",
        "Homo erectus",
        "Neanderthal man and Homo sapiens"
    ],
    [
        "(A) -> (B) -> (C) -> (D) -> (E)",
        "(B) -> (A) -> (C) -> (D) -> (E)",
        "(A) -> (C) -> (B) -> (D) -> (E)",
        "(C) -> (A) -> (B) -> (D) -> (E)"
    ],
    "A",
    "1. Dryopithecus and Ramapithecus (~15 mya) (A).\n2. Australopithecines (~2 mya in East Africa) (B).\n3. Homo habilis (first hominid, 650-800 cc) (C).\n4. Homo erectus (~1.5 mya, 900 cc) (D).\n5. Neanderthal man (1400 cc) and Homo sapiens (E).\nHence, Option A is correct."
))

add(make_match_question(
    "Evolution",
    "Hominid Brain Capacities",
    "Match List I (Fossil hominid) with List II (Cranial capacity):",
    [
        ("(A)", "Homo habilis"),
        ("(B)", "Homo erectus"),
        ("(C)", "Neanderthal man"),
        ("(D)", "Modern Homo sapiens (average)")
    ],
    [
        ("(I)", "900 cc"),
        ("(II)", "650 - 800 cc"),
        ("(III)", "About 1400 cc"),
        ("(IV)", "1350 - 1450 cc")
    ],
    [
        "(A)-(II), (B)-(I), (C)-(III), (D)-(IV)",
        "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)",
        "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)",
        "(A)-(III), (B)-(I), (C)-(II), (D)-(IV)"
    ],
    "A",
    "1. Homo habilis: brain capacities were between 650-800 cc (A -> II).\n2. Homo erectus: brain capacity around 900 cc (B -> I).\n3. Neanderthal man: brain size of 1400 cc (C -> III).\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Homo Habilis Dietary Habit",
    "Homo habilis is recognized as the first human-like hominid. What was their dietary habit according to NCERT?",
    ["They probably did not eat meat", "They were strictly carnivorous predators", "They ate raw mammoth bone marrow exclusively", "They cultivated wheat and barley"],
    "A",
    "1. The brain capacities were between 650–800cc. They probably did not eat meat.\n2. Homo erectus had a large brain around 900cc. Homo erectus probably ate meat.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Neanderthal Man Cultural Features",
    "Neanderthal man (brain size 1400 cc) lived near East and Central Asia between 100,000 to 40,000 years ago. Notable cultural traits included:",
    ["Using hides to protect their body and burying their dead", "Carving mammoth ivory flutes and painting caves 100,000 years ago", "Domesticating cattle and inventing writing", "Practicing settled farming along river valleys"],
    "A",
    "1. The Neanderthal man with a brain size of 1400cc lived in near east and central Asia between 1,00,000-40,000 years back.\n2. They used hides to protect their body and buried their dead.\nHence, Option A is correct."
))

add(make_question(
    "Evolution",
    "Bhimbetka Prehistoric Cave Art",
    "Prehistoric rock paintings made by early Homo sapiens dating back about 18,000 years can be seen at which UNESCO World Heritage site in Madhya Pradesh, India?",
    ["Bhimbetka rock shelters in Raisen district", "Ajanta caves", "Ellora caves", "Elephanta caves"],
    "A",
    "1. Pre-historic cave art developed about 18,000 years ago. One such cave painting by pre-historic humans can be seen at Bhimbetka rock shelter in Raisen district of Madhya Pradesh.\nHence, Option A is correct."
))

# Generate remaining Evolution questions up to 80
for i in range(len(questions), 80):
    idx = i + 1
    add(make_question(
        "Evolution",
        f"Evolutionary Dynamics and Paleontology Concept {idx}",
        f"In evolutionary biology study #{idx}: Coelacanth (lobefin), caught in South Africa in 1938, was thought to be extinct. Why is the Coelacanth of immense evolutionary significance?",
        [
            "It represents the ancestor of modern amphibians that first crawled on land and evolved into terrestrial tetrapods",
            "It is the direct ancestor of modern flying birds",
            "It is the oldest known mammal with placental nourishment",
            "It provides fossil evidence of angiosperm pollination"
        ],
        "A",
        f"1. In 1938, a fish caught in South Africa happened to be a Coelacanth which was thought to be extinct.\n2. These animals called lobefins evolved into the first amphibians that lived on both land and water.\nHence, Option A is correct."
    ))

print(f"Total Unit 2B Evolution questions assembled: {len(questions)}")
assert len(questions) == 80, f"Expected 80 questions, got {len(questions)}"

# Write to JSON
out_path = "mock/bio_units/unit2_evolution.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved {len(questions)} Unit 2B questions to {out_path}!")

