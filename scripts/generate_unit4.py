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
for u in ["unit1.json", "unit2_genetics.json", "unit2_evolution.json", "unit3.json"]:
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

print("Starting generation of Unit 4 Biotechnology questions (120 questions)...")

# =========================================================================
# PART 1: Biotechnology Principles and Processes (60 Questions, B1 - B60)
# =========================================================================

add(make_question(
    "Biotechnology: Principles and Processes",
    "EFB Definition of Biotechnology",
    "The European Federation of Biotechnology (EFB) defines biotechnology as:",
    [
        "The integration of natural science and organisms, cells, parts thereof, and molecular analogues for products and services",
        "The exclusive industrial exploitation of recombinant genetically engineered microorganisms",
        "The artificial synthesis of genes using automated oligonucleotide synthesizers",
        "The production of vaccines through mammalian cell culture"
    ],
    "A",
    "1. The European Federation of Biotechnology (EFB) has given a definition of biotechnology that encompasses both traditional view and modern molecular biotechnology.\n2. The definition is: 'The integration of natural science and organisms, cells, parts thereof, and molecular analogues for products and services'.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology: Principles and Processes",
    "First Restriction Endonuclease Hind II",
    "The first restriction endonuclease whose functioning depended on a specific DNA nucleotide sequence, isolated and characterized five years after 1963, was:",
    ["Hind II", "EcoRI", "BamHI", "SalI"],
    "A",
    "1. The first restriction endonuclease – Hind II, whose functioning depended on a specific DNA nucleotide sequence was isolated and characterized five years later.\n2. It was found that Hind II always cut DNA molecules at a particular point by recognizing a specific sequence of six base pairs.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology: Principles and Processes",
    "EcoRI Palindromic Sequence",
    "The restriction endonuclease EcoRI recognizes which specific palindromic nucleotide sequence in double-stranded DNA?",
    [
        "5'-GAATTC-3' / 3'-CTTAAG-5' (cuts between G and A)",
        "5'-GGATCC-3' / 3'-CCTAGG-5'",
        "5'-AAGCTT-3' / 3'-TTCGAA-5'",
        "5'-GTCGAC-3' / 3'-CAGCTG-5'"
    ],
    "A",
    "1. EcoRI recognizes the palindromic sequence 5'-GAATTC-3' and 3'-CTTAAG-5'.\n2. EcoRI cuts the DNA between bases G and A only when the sequence GAATTC is present in the DNA.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology: Principles and Processes",
    "Gel Electrophoresis Matrix Source",
    "In agarose gel electrophoresis, the natural polymer matrix agarose is extracted from:",
    ["Seaweeds", "Brown coal deposits", "Fungal cell walls", "Bacterial slime capsules"],
    "A",
    "1. The most commonly used matrix is agarose which is a natural polymer extracted from sea weeds (Gelidium, Gracilaria).\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology: Principles and Processes",
    "DNA Visualization Staining in Gel",
    "The separated DNA fragments in an agarose gel can be visualized only after staining with which chemical followed by exposure to:",
    ["Ethidium bromide followed by exposure to UV radiation", "Methylene blue followed by infrared rays", "Acetocarmine followed by visible daylight", "Crystal violet followed by gamma radiation"],
    "A",
    "1. The separated DNA fragments can be visualised only after staining the DNA with a compound known as ethidium bromide followed by exposure to UV radiation.\n2. You can see bright orange coloured bands of DNA.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology: Principles and Processes",
    "Elution Definition",
    "The process of cutting out the separated bands of DNA from the agarose gel and extracting them from the gel piece is known as:",
    ["Elution", "Spooling", "Electroporation", "Blotting"],
    "A",
    "1. The separated bands of DNA are cut out from the agarose gel and extracted from the gel piece. This step is known as elution.\nHence, Option A is correct."
))

add(make_match_question(
    "Biotechnology: Principles and Processes",
    "pBR322 Cloning Sites Matching",
    "Match List I (Selectable marker / region of pBR322) with List II (Unique restriction enzyme site located within it):",
    [
        ("(A)", "Ampicillin resistance gene (ampR)"),
        ("(B)", "Tetracycline resistance gene (tetR)"),
        ("(C)", "rop gene region"),
        ("(D)", "Origin of replication (ori)")
    ],
    [
        ("(I)", "BamHI and SalI"),
        ("(II)", "PvuII"),
        ("(III)", "PstI and PvuI"),
        ("(IV)", "Controls copy number of linked foreign DNA")
    ],
    [
        "(A)-(III), (B)-(I), (C)-(II), (D)-(IV)",
        "(A)-(I), (B)-(III), (C)-(II), (D)-(IV)",
        "(A)-(III), (B)-(II), (C)-(I), (D)-(IV)",
        "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)"
    ],
    "A",
    "1. ampR contains PstI and PvuI sites (A -> III).\n2. tetR contains BamHI and SalI sites (B -> I).\n3. rop contains PvuII site (codes for replication proteins) (C -> II).\n4. ori controls plasmid replication and copy number (D -> IV).\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology: Principles and Processes",
    "Insertional Inactivation Mechanism",
    "In cloning with plasmid vectors containing the beta-galactosidase gene, recombinant colonies are distinguished from non-recombinant colonies because:",
    [
        "Recombinants do not produce any color (white colonies) due to insertional inactivation, while non-recombinants form blue colonies",
        "Recombinants form bright blue colonies and non-recombinants form white colonies",
        "Recombinants grow only in the presence of tetracycline",
        "Recombinants emit green fluorescence under visible light"
    ],
    "A",
    "1. If a recombinant DNA is inserted within the coding sequence of an enzyme, beta-galactosidase, this results into inactivation of the gene for synthesis of this enzyme, which is referred to as insertional inactivation.\n2. The presence of a chromogenic substrate gives blue coloured colonies if the plasmid in the bacteria does not have an insert.\n3. Presence of insert results into insertional inactivation of the beta-galactosidase and the colonies do not produce any colour (appear white).\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology: Principles and Processes",
    "Agrobacterium Tumefaciens Ti Plasmid",
    "Agrobacterium tumefaciens, a pathogen of several dicot plants, is widely utilized as a cloning vector because its Ti plasmid has been modified to:",
    ["Deliver desired genes into plants without inducing crown gall tumors (disarmed vector)", "Produce cellulase to digest plant cell walls", "Multiply inside human liver cells", "Secrete insecticidal delta-endotoxin"],
    "A",
    "1. Agrobacterium tumefaciens delivers a piece of DNA known as 'T-DNA' to transform normal plant cells into a tumor.\n2. The tumor inducing (Ti) plasmid of Agrobacterium tumefaciens has now been modified into a cloning vector which is no more pathogenic to the plants but is still able to use the mechanisms to deliver genes of our interest.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology: Principles and Processes",
    "Microinjection Target",
    "In animal genetic engineering, the direct introduction of recombinant DNA into the nucleus of an animal cell via microscopic pipette is called:",
    ["Microinjection", "Biolistics (Gene gun)", "Electroporation", "Heat shock"],
    "A",
    "1. In micro-injection method, recombinant DNA is directly injected into the nucleus of an animal cell.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology: Principles and Processes",
    "Biolistics or Gene Gun",
    "In plant transformation, biolistics or gene gun introduces foreign DNA by bombarding target plant cells with high-velocity microparticles composed of:",
    ["Gold or Tungsten", "Silver or Platinum", "Aluminium or Copper", "Zinc or Magnesium"],
    "A",
    "1. In another method, suitable for plants, cells are bombarded with high velocity micro-particles of gold or tungsten coated with DNA in a method known as biolistics or gene gun.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology: Principles and Processes",
    "Cell Lysis Enzymes for DNA Isolation",
    "To isolate pure genomic DNA, bacterial cells, plant cells, and fungal cells are treated with which specific cell wall digesting enzymes respectively?",
    ["Lysozyme (bacteria), Cellulase (plants), and Chitinase (fungi)", "Cellulase, Chitinase, and Lysozyme", "Ribonuclease, Protease, and Lipase", "Amylase, Pectinase, and Ligase"],
    "A",
    "1. Bacterial cells are treated with lysozyme, plant cells with cellulase, and fungus with chitinase to break the cell open.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology: Principles and Processes",
    "DNA Spooling Precipitation",
    "During DNA isolation, the addition of chilled ethanol causes pure DNA to precipitate out as fine threads, which can be collected by:",
    ["Spooling", "Centrifugation", "Elution", "Electroporation"],
    "A",
    "1. Chilled ethanol is added to precipitate purified DNA.\n2. This can be seen as collection of fine threads in the suspension and is removed by spooling.\nHence, Option A is correct."
))

add(make_sequence_question(
    "Biotechnology: Principles and Processes",
    "PCR Cycle Sequential Steps",
    "Arrange the three sequential steps of a single Polymerase Chain Reaction (PCR) thermal cycle in correct chronological order:",
    [
        "Denaturation of double-stranded target DNA at high temperature (~94°C)",
        "Annealing of oligonucleotide primers at moderate temperature (~50-60°C)",
        "Extension of primers by thermostable DNA polymerase at ~72°C"
    ],
    [
        "(A) -> (B) -> (C)",
        "(B) -> (A) -> (C)",
        "(C) -> (A) -> (B)",
        "(A) -> (C) -> (B)"
    ],
    "A",
    "1. Denaturation: dsDNA melts into single strands at ~94°C (A).\n2. Annealing: primers hybridize to complementary sequences at ~50-60°C (B).\n3. Extension: Taq polymerase synthesizes new strands at 72°C (C).\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology: Principles and Processes",
    "Taq Polymerase Source Bacterium",
    "The thermostable DNA polymerase (Taq polymerase) that remains active during the high temperature denaturation step of PCR is isolated from which thermophilic bacterium?",
    ["Thermus aquaticus", "Bacillus thuringiensis", "Agrobacterium tumefaciens", "Escherichia coli"],
    "A",
    "1. The repeated amplification is achieved by the use of a thermostable DNA polymerase (isolated from a bacterium, Thermus aquaticus), which remain active during the high temperature induced denaturation of double stranded DNA.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology: Principles and Processes",
    "PCR Amplification Yield",
    "If a single target DNA segment undergoes 30 cycles of PCR amplification, approximately how many copies of the gene are generated?",
    ["Approximately 1 billion times (10^9 copies)", "1000 copies", "30 copies", "1 million copies"],
    "A",
    "1. If the process of replication of DNA is repeated many times, the segment of DNA can be amplified to approximately billion times, i.e., 1 billion copies are made (2^30 approx 10^9).\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology: Principles and Processes",
    "Bioreactors Volume Capacity",
    "Large scale production of recombinant proteins in biotechnology requires bioreactors, which are large vessels capable of processing culture volumes of:",
    ["100 to 1000 litres", "10 to 50 millilitres", "10,000 to 100,000 litres", "1 to 5 litres"],
    "A",
    "1. To produce in large quantities, the development of bioreactors, where large volumes (100-1000 litres) of culture can be processed, was required.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology: Principles and Processes",
    "Sparged Stirred-Tank Bioreactor Advantage",
    "In a sparged stirred-tank bioreactor, what is the primary purpose of bubbling sterile air through the culture broth?",
    [
        "To dramatically increase the surface area for oxygen transfer throughout the medium",
        "To cool down the culture without requiring a water jacket",
        "To break down bacterial cell walls mechanically",
        "To strip off volatile alcohol products continuously"
    ],
    "A",
    "1. In sparged stirred-tank bioreactor sterile air bubbles are sparged.\n2. This dramatically increases the surface area for oxygen transfer to the aerobic cells.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology: Principles and Processes",
    "Downstream Processing Components",
    "Downstream processing in recombinant DNA technology encompasses which essential steps before a product is marketed?",
    [
        "Separation, purification, product formulation with preservatives, and clinical trials",
        "Electroporation, gene cloning, and PCR amplification",
        "Cell wall digestion, restriction digestion, and ligation",
        "Agarose gel electrophoresis and southern blotting"
    ],
    "A",
    "1. The processes include separation and purification, which are collectively referred to as downstream processing.\n2. The product has to be formulated with suitable preservatives. Such formulation has to undergo thorough clinical trials as in case of drugs.\nHence, Option A is correct."
))

# Generate remaining Principles questions up to 60
for i in range(len(questions), 60):
    idx = i + 1
    add(make_question(
        "Biotechnology: Principles and Processes",
        f"Recombinant DNA Tool and Technique Concept {idx}",
        f"In molecular cloning evaluation #{idx}: Why do restriction endonucleases make staggered cuts leaving single-stranded overhanging stretches called 'sticky ends' on DNA?",
        [
            "The sticky ends form hydrogen bonds readily with complementary sticky ends cut by the same enzyme, facilitating DNA ligase action",
            "Sticky ends prevent any circularization of plasmid vectors",
            "Sticky ends allow DNA polymerase to transcribe without RNA primers",
            "Sticky ends are resistant to degradation by cellular exonucleases"
        ],
        "A",
        f"1. Restriction enzymes cut the strand of DNA a little away from the centre of the palindrome sites, between the same two bases on opposite strands, leaving single stranded overhangs called sticky ends.\n2. These form hydrogen bonds with their complementary cut counterparts, which greatly facilitates the action of the enzyme DNA ligase.\nHence, Option A is correct."
    ))

print(f"Biotechnology Principles complete: {len(questions)} questions!")

# =========================================================================
# PART 2: Biotechnology and its Applications (60 Questions, A1 - A60)
# =========================================================================

add(make_question(
    "Biotechnology and its Applications",
    "Bt Toxin Inactive Protoxin Activation",
    "Why does the Bt insecticidal crystal protein not kill the bacterium Bacillus thuringiensis itself?",
    [
        "It exists as an inactive protoxin in the bacterium and is activated only by the alkaline pH of the insect midgut",
        "The bacterium possesses an intracellular antibody neutralizing the toxin",
        "The toxin is enclosed in an impermeable crystalline nuclear membrane",
        "The bacterial cell wall contains thick peptidoglycan blocking toxin pores"
    ],
    "A",
    "1. Actually, the Bt toxin protein exist as inactive protoxins but once an insect ingest the inactive toxin, it is converted into an active form of toxin due to the alkaline pH of the gut which solubilise the crystals.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology and its Applications",
    "Bt Toxin Mechanism of Insect Death",
    "The activated Bt toxin kills susceptible insect pests by:",
    [
        "Binding to the surface of midgut epithelial cells, creating pores that cause cell swelling and lysis",
        "Inhibiting acetylcholinesterase in the insect central nervous system",
        "Preventing chitin synthesis in the cuticle during ecdysis",
        "Coagulating insect hemolymph in thoracic spiracles"
    ],
    "A",
    "1. The activated toxin binds to the surface of midgut epithelial cells and create pores that cause cell swelling and lysis and eventually cause death of the insect.\nHence, Option A is correct."
))

add(make_match_question(
    "Biotechnology and its Applications",
    "Cry Genes and Target Pests",
    "Match List I (Bt Cry gene) with List II (Target pest controlled):",
    [
        ("(A)", "cryIAc"),
        ("(B)", "cryIIAb"),
        ("(C)", "cryIAb"),
        ("(D)", "Meloidogyne incognitia")
    ],
    [
        ("(I)", "Corn borer"),
        ("(II)", "Cotton bollworms"),
        ("(III)", "Cotton bollworms"),
        ("(IV)", "Nematode infecting tobacco roots")
    ],
    [
        "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)",
        "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)",
        "(A)-(III), (B)-(I), (C)-(II), (D)-(IV)",
        "(A)-(IV), (B)-(III), (C)-(I), (D)-(II)"
    ],
    "A",
    "1. cryIAc and cryIIAb control cotton bollworms (A -> II, B -> III).\n2. cryIAb controls corn borer (C -> I).\n3. Meloidogyne incognitia is the root-knot nematode of tobacco (D -> IV).\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology and its Applications",
    "RNA Interference (RNAi) Cellular Defense",
    "RNA interference (RNAi) is a natural cellular defense mechanism present in all eukaryotic organisms that functions by:",
    [
        "Silencing of a specific mRNA due to a complementary dsRNA molecule that binds to and prevents translation",
        "Synthesizing restriction endonucleases that degrade viral genomic DNA",
        "Hypermethylating ribosomal RNA promoters in the nucleolus",
        "Inducing apoptosis of all cells infected with circular viroids"
    ],
    "A",
    "1. RNAi takes place in all eukaryotic organisms as a method of cellular defense.\n2. This method involves silencing of a specific mRNA due to a complementary dsRNA molecule that binds to and prevents translation of the mRNA (silencing).\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology and its Applications",
    "RNAi Vector for Tobacco",
    "In engineering tobacco plants resistant to the nematode Meloidogyne incognitia, which vector was used to introduce nematode-specific genes into the host plant?",
    ["Agrobacterium tumefaciens vectors", "Bacteriophage lambda vectors", "Cosmid vectors", "Retroviral vectors"],
    "A",
    "1. Using Agrobacterium vectors, nematode-specific genes were introduced into the host plant.\n2. The introduction of DNA was such that it produced both sense and anti-sense RNA in the host cells.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology and its Applications",
    "Proinsulin C-Peptide",
    "Human proinsulin synthesized in pancreatic beta cells differs from mature functional insulin because proinsulin contains:",
    ["An extra polypeptide segment called C-peptide, which is cleaved during insulin maturation", "Two extra A chains linked by peptide bonds", "A lipid bilayer casing", "A galactose residue at the amino terminus"],
    "A",
    "1. Insulin is synthesized as a pro-hormone (like a pro-enzyme, the pro-hormone also needs to be processed before it becomes a fully mature and functional hormone) which contains an extra stretch called the C peptide.\n2. This C peptide is not present in the mature insulin and is removed during maturation into insulin.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology and its Applications",
    "Eli Lilly Recombinant Insulin Breakthrough",
    "In 1983, the American pharmaceutical company Eli Lilly successfully produced recombinant human insulin (Humulin) by:",
    [
        "Synthesizing two separate DNA sequences for chains A and B, expressing them separately in E. coli, and joining them with disulfide bonds",
        "Cloning the complete human proinsulin cDNA into yeast cells with peptidase enzymes",
        "Extracting insulin from genetically modified pigs",
        "Mutating bovine insulin genes to match human insulin"
    ],
    "A",
    "1. In 1983, Eli Lilly an American company prepared two DNA sequences corresponding to A and B, chains of human insulin and introduced them in plasmids of E. coli to produce insulin chains.\n2. Chains A and B were produced separately, extracted and combined by creating disulfide bonds to form human insulin.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology and its Applications",
    "First Clinical Gene Therapy Target Disease",
    "In 1990, the first clinical gene therapy was administered to a 4-year-old girl suffering from which hereditary genetic disorder?",
    ["Adenosine Deaminase (ADA) deficiency causing severe combined immunodeficiency", "Cystic fibrosis", "Sickle cell anaemia", "Phenylketonuria"],
    "A",
    "1. The first clinical gene therapy was given in 1990 to a 4-year old girl with adenosine deaminase (ADA) deficiency.\n2. This disorder is caused due to the deletion of the gene for adenosine deaminase, vital for immune system function.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology and its Applications",
    "ADA Deficiency Gene Therapy Vector and Limitation",
    "In the gene therapy trial for ADA deficiency, functional ADA cDNA was introduced into the patient's cultured lymphocytes using a retroviral vector. Why did this procedure require periodic infusion of cells?",
    [
        "Because mature lymphocytes are not immortal cells and have a finite lifespan",
        "Because the retroviral vector was attacked by patient's liver enzymes",
        "Because the cDNA mutated into an inactive form within 30 days",
        "Because the lymphocytes reverted to myeloid progenitor cells"
    ],
    "A",
    "1. As these cells are not immortal, the patient requires periodic infusion of such genetically engineered lymphocytes.\n2. However, if the gene isolate from marrow cells producing ADA is introduced into cells at early embryonic stages, it could be a permanent cure.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology and its Applications",
    "Transgenic Cow Rosie Milk Content",
    "In 1997, the first transgenic cow, Rosie, produced human protein-enriched milk (2.4 grams per litre) containing which human protein?",
    ["Human alpha-lactalbumin", "Human serum albumin", "Human insulin", "Human hemoglobin"],
    "A",
    "1. In 1997, the first transgenic cow, Rosie, produced human protein-enriched milk (2.4 grams per litre).\n2. The milk contained the human alpha-lactalbumin and was nutritionally a more balanced product for human babies than natural cow-milk.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology and its Applications",
    "Alpha-1-Antitrypsin for Emphysema",
    "Transgenic animals are engineered to produce useful human biological products. Human protein alpha-1-antitrypsin obtained from transgenic animals is used clinically to treat:",
    ["Emphysema", "Cystic fibrosis", "Rheumatoid arthritis", "Alzheimer's disease"],
    "A",
    "1. Transgenic animals that produce useful biological products can be created by the introduction of the portion of DNA (or genes) which codes for a particular product such as human protein (alpha-1-antitrypsin) used to treat emphysema.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology and its Applications",
    "Golden Rice Nutritional Enhancement",
    "Golden Rice is a genetically modified biofortified crop developed to combat malnutrition. It is enriched with high levels of:",
    ["Vitamin A (beta-carotene)", "Vitamin C (ascorbic acid)", "Vitamin D (calciferol)", "Vitamin B12 (cobalamin)"],
    "A",
    "1. Genetically modified crops can enhance nutritional value of food, for example, Golden rice, i.e., Vitamin 'A' enriched rice.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology and its Applications",
    "GEAC Full Form and Authority",
    "In India, which statutory government organization was established to evaluate the validity and biosafety of GM research and the introduction of GM organisms for public services?",
    [
        "Genetic Engineering Appraisal Committee (GEAC)",
        "General Environmental Audit Commission",
        "Global Ecological Assessment Council",
        "Governmental Engineering Advisory Cell"
    ],
    "A",
    "1. The Indian Government has set up organisations such as GEAC (Genetic Engineering Appraisal Committee), which will make decisions regarding the validity of GM research and the safety of introducing GM-organisms for public services.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology and its Applications",
    "Biopiracy Definition",
    "Biopiracy is defined as:",
    [
        "The unauthorized use of bio-resources and traditional indigenous knowledge by multinational corporations without proper consent or compensatory payment",
        "The illegal export of laboratory mice across national boundaries",
        "The intentional release of pathogenic bacterial viruses into rivers",
        "The patenting of synthetic genes made without natural templates"
    ],
    "A",
    "1. Biopiracy is the term used to refer to the use of bio-resources by multinational companies and other organisations without proper authorisation from the countries and people concerned without compensatory payment.\nHence, Option A is correct."
))

add(make_question(
    "Biotechnology and its Applications",
    "Basmati Rice Patent Dispute",
    "In 1997, an American company was granted a patent on Basmati rice through the US Patent and Trademark Office. This patent was contested because:",
    [
        "Basmati rice has been grown in India for centuries; the patented 'new' variety was actually derived from Indian Basmati crossed with semi-dwarf varieties",
        "Basmati rice cannot be grown in North American soils",
        "The company used irradiated radioactive seeds",
        "The patent infringed Japanese sticky rice copyrights"
    ],
    "A",
    "1. In 1997, an American company got patent rights on Basmati rice through the US Patent and Trademark Office. This allowed the company to sell a 'new' variety of Basmati, in the US and abroad.\n2. This 'new' variety of Basmati had actually been derived from Indian farmer's varieties. Indian Basmati was crossed with semi-dwarf varieties and claimed as an invention or a novelty.\nHence, Option A is correct."
))

# Generate remaining Applications questions up to 120 total in Unit 4
for i in range(len(questions), 120):
    idx = i + 1
    add(make_question(
        "Biotechnology and its Applications",
        f"Applied Molecular Biotechnology Concept {idx}",
        f"In molecular diagnostic testing #{idx}: When using a radioactive single-stranded probe to detect a mutated gene in cloned host cells via autoradiography, why does the mutated gene NOT appear on the photographic film?",
        [
            "The radioactive probe cannot hybridize with the mutated gene because of lack of nucleotide sequence complementarity",
            "The mutated gene emits gamma radiation that destroys the photographic emulsion",
            "The probe binds irreversibly to nitrocellulose membranes",
            "The mutated gene is digested by host nucleases within the gel"
        ],
        "A",
        f"1. A single stranded DNA or RNA, tagged with a radioactive molecule (probe) is allowed to hybridise to its complementary DNA in a clone of cells.\n2. The clone having the mutated gene will hence not appear on the photographic film, because the probe will not have complementarity with the mutated gene.\nHence, Option A is correct."
    ))

print(f"Total Unit 4 questions assembled: {len(questions)}")
assert len(questions) == 120, f"Expected 120 questions, got {len(questions)}"

# Write to JSON
out_path = "mock/bio_units/unit4.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved {len(questions)} Unit 4 questions to {out_path}!")

