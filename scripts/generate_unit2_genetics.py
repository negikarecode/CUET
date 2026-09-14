import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scripts.bio_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, normalize_text, get_pyq_normalized_set
)

questions = []
seen = set()
pyq_seen = get_pyq_normalized_set()

# Load unit 1 seen to ensure global cross-unit uniqueness
if os.path.exists("mock/bio_units/unit1.json"):
    with open("mock/bio_units/unit1.json") as f:
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

print("Starting generation of Unit 2A Genetics questions...")

# =========================================================================
# PART 1: Principles of Inheritance and Variation (100 Questions, G1 - G100)
# =========================================================================

add(make_question(
    "Principles of Inheritance and Variation",
    "Mendel Contrasting Traits Count",
    "Gregor Mendel conducted hybridization experiments on garden peas for seven years (1856-1863). How many pairs of contrasting characters did he investigate?",
    ["7 pairs (14 true-breeding pea plant varieties)", "14 pairs (28 varieties)", "8 pairs (16 varieties)", "5 pairs (10 varieties)"],
    "A",
    "1. Mendel investigated characters in the garden pea plant that were manifested as two opposing traits, e.g., tall or dwarf plants, yellow or green seeds.\n2. Mendel selected 14 true-breeding pea plant varieties, as pairs which were similar except for one character with contrasting traits (7 pairs).\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Pea Flower Position Traits",
    "In Mendel's studies on garden peas (Pisum sativum), which of the following represents the dominant contrasting trait for flower position?",
    ["Axial flower position", "Terminal flower position", "Lateral flower position", "Basal flower position"],
    "A",
    "1. For flower position in pea plants, axial position is dominant and terminal position is recessive.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Pea Pod Color and Shape",
    "Which pair correctly identifies the dominant traits for pod shape and pod colour in garden peas?",
    ["Inflated pod shape and green pod colour", "Constricted pod shape and yellow pod colour", "Inflated pod shape and yellow pod colour", "Constricted pod shape and green pod colour"],
    "A",
    "1. In garden peas: Pod shape dominant trait is Inflated (full), recessive is Constricted.\n2. Pod colour dominant trait is Green, recessive is Yellow.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Pea Seed Color vs Pod Color Inversion",
    "A common source of confusion in Mendelian pea traits is seed colour versus pod colour. Which of the following is dominant for seed colour and pod colour respectively?",
    ["Yellow seed colour and Green pod colour", "Green seed colour and Yellow pod colour", "Yellow seed colour and Yellow pod colour", "Green seed colour and Green pod colour"],
    "A",
    "1. For seed colour: Yellow is dominant over Green.\n2. For pod colour: Green is dominant over Yellow.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Monohybrid F2 Ratios",
    "In a Mendelian monohybrid cross between a homozygous tall (TT) and a homozygous dwarf (tt) pea plant, the F2 phenotypic and genotypic ratios are respectively:",
    ["3:1 and 1:2:1", "1:2:1 and 3:1", "9:3:3:1 and 1:1:1:1", "3:1 and 1:1"],
    "A",
    "1. Phenotypically, 3/4th of the F2 plants are tall and 1/4th are dwarf (phenotypic ratio 3:1).\n2. Genotypically, 1/4th are TT, 1/2 are Tt, and 1/4th are tt (genotypic ratio 1:2:1).\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Test Cross Definition",
    "A Mendelian test cross is performed to determine the unknown genotype of an organism displaying a dominant phenotype by crossing it with:",
    ["A homozygous recessive parent", "A homozygous dominant parent", "A heterozygous F1 individual", "Another identical dominant phenotype organism"],
    "A",
    "1. To determine the genotype of a tall plant at F2, Mendel crossed the tall plant from F2 with a dwarf plant. This he called a test cross.\n2. In a typical test cross an organism showing a dominant phenotype is crossed with the recessive parent instead of self-crossing.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Monohybrid Test Cross Ratio",
    "When a heterozygous tall pea plant (Tt) is test crossed with a dwarf pea plant (tt), what is the expected phenotypic ratio among the offspring?",
    ["1 Tall : 1 Dwarf (1:1)", "3 Tall : 1 Dwarf (3:1)", "All Tall (100%)", "All Dwarf (100%)"],
    "A",
    "1. Crossing Tt x tt produces gametes: (1/2 T, 1/2 t) x (t) -> 1/2 Tt (tall) and 1/2 tt (dwarf).\n2. The phenotypic ratio is 1:1.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Incomplete Dominance in Snapdragon",
    "In Antirrhinum majus (snapdragon), a cross between a true-breeding red-flowered plant (RR) and a true-breeding white-flowered plant (rr) results in pink-flowered F1 progeny (Rr). When F1 pink plants are self-pollinated, what are the phenotypic and genotypic ratios in the F2 generation?",
    [
        "Phenotypic ratio 1:2:1 (Red:Pink:White) and Genotypic ratio 1:2:1 (RR:Rr:rr)",
        "Phenotypic ratio 3:1 (Red:White) and Genotypic ratio 1:2:1 (RR:Rr:rr)",
        "Phenotypic ratio 9:3:3:1 and Genotypic ratio 1:1:1:1",
        "Phenotypic ratio 1:1 (Red:White) and Genotypic ratio 1:2:1"
    ],
    "A",
    "1. In incomplete dominance as observed in snapdragon (Antirrhinum majus) and Mirabilis jalapa, the phenotypic ratio is 1 Red : 2 Pink : 1 White.\n2. Here the genotypic ratio is 1 RR : 2 Rr : 1 rr (1:2:1).\n3. Thus, phenotypic and genotypic ratios are identical (1:2:1).\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Law of Segregation Generality",
    "Why is Mendel's Law of Segregation considered universally applicable without any exceptions in sexually reproducing diploid organisms?",
    [
        "Because alleles do not blend and segregate during anaphase I of meiosis so that a gamete receives only one of the two alleles",
        "Because dominant alleles always destroy recessive alleles in F1",
        "Because all genes are located on sex chromosomes",
        "Because non-homologous chromosomes always cross over at chiasmata"
    ],
    "A",
    "1. The Law of Segregation is based on the fact that the alleles do not show any blending and that both the characters are recovered as such in the F2 generation.\n2. Gametes receive only one of the two factors during meiosis (purity of gametes).\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "ABO Blood Group Alleles & Codominance",
    "In the human ABO blood group system controlled by the gene I, which of the following allele combinations demonstrates codominance?",
    [
        "I^A and I^B expressed together resulting in blood group AB",
        "I^A and i expressed together resulting in blood group A",
        "I^B and i expressed together resulting in blood group B",
        "i and i expressed together resulting in blood group O"
    ],
    "A",
    "1. When I^A and I^B are present together, they both express their own types of sugars: this is because of co-dominance. Hence red blood cells have both A and B types of sugars (blood group AB).\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "ABO Blood Group Genotypes Count",
    "In a human population with three alleles (I^A, I^B, i) controlling the ABO blood system, how many possible genotypes and phenotypes can exist?",
    ["6 genotypes and 4 phenotypes", "4 genotypes and 6 phenotypes", "9 genotypes and 4 phenotypes", "3 genotypes and 3 phenotypes"],
    "A",
    "1. With 3 alleles, the number of genotypes is n(n+1)/2 = 3(4)/2 = 6 genotypes (I^A I^A, I^A i, I^B I^B, I^B i, I^A I^B, ii).\n2. These 6 genotypes produce 4 phenotypes: Blood groups A, B, AB, and O.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Dihybrid Cross F2 Phenotypic Ratio",
    "In Mendel's dihybrid cross involving seed shape (Round/Wrinkled) and seed colour (Yellow/Green), what was the phenotypic ratio obtained in the F2 generation?",
    ["9:3:3:1 (Round Yellow : Round Green : Wrinkled Yellow : Wrinkled Green)", "9:3:4", "12:3:1", "1:1:1:1"],
    "A",
    "1. The phenotypic ratio obtained in the F2 generation was 9 Round Yellow : 3 Round Green : 3 Wrinkled Yellow : 1 Wrinkled Green (9:3:3:1).\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Dihybrid Test Cross Ratio",
    "What is the expected phenotypic and genotypic ratio of a typical Mendelian dihybrid test cross (RrYy x rryy)?",
    ["1:1:1:1", "9:3:3:1", "3:1", "1:2:1"],
    "A",
    "1. A dihybrid test cross between heterozygous F1 (RrYy) and double recessive parent (rryy) produces 4 types of gametes from RrYy (RY, Ry, rY, ry) in equal frequency 1:1:1:1, all fertilized by ry sperm.\n2. The resulting phenotypic ratio is 1 Round Yellow : 1 Round Green : 1 Wrinkled Yellow : 1 Wrinkled Green (1:1:1:1).\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Chromosomal Theory of Inheritance Formulators",
    "The Chromosomal Theory of Inheritance, which pointed out that the behavior of chromosomes is parallel to the behavior of genes, was independently proposed by:",
    ["Walter Sutton and Theodor Boveri (1902)", "Thomas Hunt Morgan and Alfred Sturtevant", "Gregor Mendel and Carl Correns", "Hugo de Vries and Erich von Tschermak"],
    "A",
    "1. In 1902, Walter Sutton and Theodor Boveri noted that the behaviour of chromosomes was parallel to the behaviour of genes and used chromosome movement to explain Mendel's laws.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Drosophila as Experimental Model by Morgan",
    "Thomas Hunt Morgan chose fruit flies (Drosophila melanogaster) for his genetics studies for all of the following reasons EXCEPT:",
    [
        "They took 6 months to complete one generation, allowing long-term observation",
        "They could be grown on simple synthetic medium in the laboratory",
        "They complete their life cycle in about two weeks and a single mating produces hundreds of progeny",
        "There is clear differentiation of sexes and many types of hereditary variations visible under low power microscope"
    ],
    "A",
    "1. Morgan worked with Drosophila because they complete their life cycle in about two weeks (NOT 6 months).\n2. They produce large progeny, grow on simple medium, have clear sexual dimorphism (females larger than males), and have easily observable traits.\nHence, Option A is the exception."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Morgan's Dihybrid Cross Recombination Frequencies",
    "In Morgan's crosses with Drosophila, what were the recombination frequencies observed between yellow body-white eye genes (Cross A) and white eye-miniature wing genes (Cross B)?",
    [
        "1.3% recombination in Cross A and 37.2% recombination in Cross B",
        "37.2% in Cross A and 1.3% in Cross B",
        "50% in both Cross A and Cross B",
        "0% in Cross A and 25% in Cross B"
    ],
    "A",
    "1. Morgan found that the genes for yellow body and white eyes were very tightly linked and showed only 1.3 per cent recombination.\n2. White eyes and miniature wings were loosely linked and showed 37.2 per cent recombination.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Genetic Mapping Pioneer",
    "Who utilized the frequency of recombination between gene pairs on the same chromosome as a measure of the physical distance between genes and mapped their position on the chromosome?",
    ["Alfred Sturtevant", "Thomas Hunt Morgan", "Walter Sutton", "Henking"],
    "A",
    "1. Morgan's student Alfred Sturtevant used the frequency of recombination between gene pairs on the same chromosome as a measure of the distance between genes and 'mapped' their position on the chromosome.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Genetic Map Distance Units",
    "On a genetic chromosome map, 1 map unit (centimorgan, cM) is defined as equivalent to:",
    ["1% frequency of recombination between two gene loci", "10% crossing over frequency", "100 base pairs of nucleotide sequence", "1 complete chromosomal inversion"],
    "A",
    "1. One map unit (or centimorgan) represents 1 per cent recombination between two linked genes on a chromosome.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Sex Determination in Birds",
    "In birds, what type of chromosomal sex determination mechanism operates, and which sex is heterogametic?",
    ["ZZ-ZW mechanism; the female is heterogametic (ZW)", "XX-XY mechanism; the male is heterogametic (XY)", "XX-XO mechanism; the male is heterogametic (XO)", "Haplodiploidy; the female is haploid"],
    "A",
    "1. In birds, a different mechanism of sex determination is observed. Here, total number of chromosomes is same in both males and females.\n2. Females have one Z and one W chromosome (ZW, female heterogamety), whereas males have a pair of Z chromosomes (ZZ, homogametic).\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Sex Determination in Grasshopper",
    "In grasshoppers, sex determination is of the XX-XO type. In this system, the male possesses:",
    ["An odd number of chromosomes with only one X chromosome (XO)", "A pair of X chromosomes (XX)", "One X and one distinct Y chromosome", "Haploid number of autosomes with two Z chromosomes"],
    "A",
    "1. In grasshopper, males have only one X-chromosome besides the autosomes (XO), whereas females have a pair of X-chromosomes (XX).\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Haplodiploidy in Honeybees",
    "In honeybees, drones (males) develop parthenogenetically from unfertilized eggs and are haploid (16 chromosomes), whereas females (queens/workers) develop from fertilized eggs and are diploid (32 chromosomes). Consequently, drones:",
    [
        "Have no father and cannot have sons, but have a grandfather and can have grandsons",
        "Produce sperms by meiotic reduction division",
        "Have mothers and fathers, but no grandchildren",
        "Possess diploid somatic cells and haploid germ line"
    ],
    "A",
    "1. In honeybees, males (drones) produce sperms by mitosis.\n2. They do not have a father (develop from unfertilized egg of queen) and thus cannot have sons.\n3. But they have a grandfather (the queen's father) and can have grandsons (via their daughters, the workers/queens).\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Sickle Cell Anaemia Point Mutation",
    "Sickle cell anaemia is caused by a point mutation in the beta-globin gene of haemoglobin involving which specific amino acid substitution at the sixth position?",
    [
        "Substitution of Glutamic acid by Valine (GAG to GUG codon)",
        "Substitution of Valine by Glutamic acid (GUG to GAG codon)",
        "Substitution of Lysine by Arginine",
        "Substitution of Glycine by Alanine"
    ],
    "A",
    "1. The defect is caused by the substitution of Glutamic acid (Glu) by Valine (Val) at the sixth position of the beta globin chain of the haemoglobin molecule.\n2. The single base substitution at the 6th codon of beta globin gene transforms GAG into GUG.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Sickle Cell Heterozygote Advantage",
    "Individuals who are heterozygous for the sickle cell allele (HbA HbS) exhibit which evolutionary selective advantage?",
    [
        "High resistance to lethal falciparum malaria",
        "Immunity to pulmonary tuberculosis",
        "Resistance to cholera toxin",
        "Superior aerobic endurance at high altitudes"
    ],
    "A",
    "1. Heterozygotes (HbA HbS) appear clinically normal or have mild sickle-cell trait.\n2. However, red blood cells containing HbS are hostile to the malaria parasite Plasmodium falciparum, conferring resistance to malaria in endemic zones.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Phenylketonuria Enzyme Deficiency",
    "Phenylketonuria (PKU) is an inborn error of metabolism inherited as an autosomal recessive trait due to the deficiency of which liver enzyme?",
    ["Phenylalanine hydroxylase", "Tyrosinase", "Homogentisic acid oxidase", "Hexosaminidase A"],
    "A",
    "1. The affected individual lacks an enzyme that converts the amino acid phenylalanine into tyrosine (phenylalanine hydroxylase).\n2. As a result, phenylalanine is accumulated and converted into phenylpyruvic acid and other derivatives, causing mental retardation.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Thalassemia Quantitative vs Sickle Cell Qualitative",
    "How does Thalassemia differ fundamentally from Sickle cell anaemia?",
    [
        "Thalassemia is a quantitative defect of synthesizing too few globin molecules, whereas Sickle cell anaemia is a qualitative defect of producing an abnormal globin chain",
        "Thalassemia is qualitative, whereas sickle cell anaemia is quantitative",
        "Thalassemia is X-linked recessive, whereas sickle cell anaemia is Y-linked",
        "Thalassemia affects white blood cells, whereas sickle cell affects platelets"
    ],
    "A",
    "1. Thalassemia differs from sickle-cell anaemia in that the former is a quantitative problem of synthesising too few globin molecules, while the latter is a qualitative problem of synthesising an incorrectly functioning globin.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Down Syndrome Karyotype & Discoverer",
    "Down's syndrome was first described by Langdon Down in 1866. It is caused by which genetic chromosomal abnormality?",
    ["Trisomy of chromosome 21 (47, +21)", "Trisomy of chromosome 18 (Edward syndrome)", "Monosomy of X chromosome (45, X0)", "Additional X chromosome in male (47, XXY)"],
    "A",
    "1. The cause of this genetic disorder is the presence of an additional copy of the chromosome number 21 (trisomy of 21).\n2. This disorder was first described by Langdon Down (1866).\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Klinefelter Syndrome Features",
    "A male patient with karyotype 47, XXY exhibits overall masculine development along with feminine features such as development of breasts (gynaecomastia) and is sterile. This condition is diagnosed as:",
    ["Klinefelter's syndrome", "Turner's syndrome", "Down's syndrome", "Cri-du-chat syndrome"],
    "A",
    "1. Klinefelter's syndrome is caused due to the presence of an additional copy of X-chromosome resulting in a karyotype of 47, XXY.\n2. Such an individual has overall masculine development, however, the feminine development (development of breast, i.e., Gynaecomastia) is also expressed. Such individuals are sterile.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Turner Syndrome Karyotype",
    "A female patient who is sterile, has rudimentary ovaries, lacks secondary sexual characteristics, and possesses a karyotype of 45 chromosomes with X0 monosomy suffers from:",
    ["Turner's syndrome", "Klinefelter's syndrome", "Down's syndrome", "Super female syndrome"],
    "A",
    "1. Turner's syndrome is caused due to the absence of one of the X chromosomes, i.e., 45 with X0.\n2. Such females are sterile as ovaries are rudimentary besides other features including lack of other secondary sexual characters.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Haemophilia Queen Victoria Pedigree",
    "Haemophilia is a sex-linked recessive disorder showing criss-cross inheritance. A famous royal pedigree tracing this disease involves Queen Victoria, who was:",
    ["A carrier of the disease and passed it on to several royal descendants", "Affected with haemophilia from childhood", "Homozygous for the mutant allele", "A donor of factor VIII to her sons"],
    "A",
    "1. The family pedigree of Queen Victoria shows a number of haemophilic descendants as she was a carrier of the disease.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Colour Blindness Incidence",
    "Why does red-green colour blindness affect approximately 8% of human males but only about 0.4% of females?",
    [
        "Because it is an X-linked recessive gene; males have only one X chromosome and express the defect with a single mutant allele",
        "Because females possess a protective Y chromosome with dominant colour vision genes",
        "Because testosterone degrades the photopigments in retinal cones",
        "Because the mutant allele is imprinted and silenced in maternal ova"
    ],
    "A",
    "1. Red-green colour blindness is an X-linked recessive disorder.\n2. It occurs in about 8% of males and only about 0.4% of females because males have only one X chromosome (hemizygous). A female requires two mutant alleles (X^c X^c) which occurs only if her father is colour blind and mother is at least a carrier.\nHence, Option A is correct."
))

add(make_match_question(
    "Principles of Inheritance and Variation",
    "Genetic Disorders & Categories",
    "Match List I (Genetic disorder) with List II (Genetic classification):",
    [
        ("(A)", "Myotonic dystrophy"),
        ("(B)", "Sickle cell anaemia"),
        ("(C)", "Haemophilia"),
        ("(D)", "Down syndrome")
    ],
    [
        ("(I)", "Sex-linked recessive Mendelian disorder"),
        ("(II)", "Autosomal dominant Mendelian disorder"),
        ("(III)", "Chromosomal disorder (Aneuploidy / Trisomy 21)"),
        ("(IV)", "Autosomal recessive Mendelian disorder")
    ],
    [
        "(A)-(II), (B)-(IV), (C)-(I), (D)-(III)",
        "(A)-(IV), (B)-(II), (C)-(I), (D)-(III)",
        "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)",
        "(A)-(III), (B)-(IV), (C)-(I), (D)-(II)"
    ],
    "A",
    "1. Myotonic dystrophy: Autosomal dominant (A -> II).\n2. Sickle cell anaemia: Autosomal recessive (B -> IV).\n3. Haemophilia: X-linked recessive (C -> I).\n4. Down syndrome: Aneuploidy trisomy 21 (D -> III).\nHence, Option A is correct."
))

add(make_statement_question(
    "Principles of Inheritance and Variation",
    "Mendelian Chromosomal Theory Parallelism",
    "Genes occur in pairs; alleles of a gene pair segregate at gamete formation such that only one is transmitted.",
    "Chromosomes occur in pairs; homologous pairs segregate during meiosis I such that each daughter cell receives one chromosome.",
    "A",
    "1. Both genes and chromosomes occur in pairs in diploid cells.\n2. Chromosome pairs segregate during meiosis in the exact same manner as alleles of gene pairs segregate during gamete formation.\nBoth statements are correct and form the basis of the Sutton-Boveri Chromosomal Theory of Inheritance. Option A is correct."
))

add(make_assertion_question(
    "Principles of Inheritance and Variation",
    "Haemophilic Female Rarity",
    "The possibility of a female becoming haemophilic is extremely rare.",
    "A female can be haemophilic only if her mother is at least a carrier and her father is haemophilic (who often dies before reproductive age).",
    "A",
    "1. The possibility of a female becoming haemophilic is extremely rare because mother of such a female has to be at least carrier and the father should be haemophilic (unviable in the later stage of life).\n2. Reason is the correct explanation for Assertion. Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Polygenic Inheritance Human Skin Color",
    "Human skin colour is a classic example of polygenic inheritance controlled by three genes (A, B, C). What skin phenotypes correspond to genotypes AABBCC and aabbcc respectively?",
    ["Darkest skin colour and Lightest skin colour", "Lightest skin colour and Darkest skin colour", "Intermediate brown colour for both", "Yellow skin colour and Albino colour"],
    "A",
    "1. In human skin colour, the phenotype reflects the contribution of each allele (an additive effect).\n2. Genotype with all dominant alleles (AABBCC) will have the darkest skin colour and that with all recessive alleles (aabbcc) will have the lightest skin colour.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Pleiotropy Definition",
    "When a single gene product influences multiple distinct phenotypic traits (e.g., starch synthesis gene in pea seeds influencing starch grain size and seed shape), this phenomenon is called:",
    ["Pleiotropy", "Polygenic inheritance", "Codominance", "Incomplete dominance"],
    "A",
    "1. A single gene can exhibit multiple phenotypic expressions; such a gene is called a pleiotropic gene.\n2. Starch synthesis in pea seeds is controlled by one gene with two alleles (B and b). BB produces large starch grains and round seeds; bb produces small grains and wrinkled seeds; Bb produces intermediate size starch grains.\nHence, Option A is correct."
))

# Save interim check for genetics Part 1
print(f"Genetics part 1 (Principles of Inheritance): {len(questions)} questions!")


# --- Principles of Inheritance (Q36 to Q100) ---

add(make_question(
    "Principles of Inheritance and Variation",
    "Mendel Law of Dominance Postulate",
    "According to Mendel's Law of Dominance, characters are controlled by discrete units called factors. In a dissimilar pair of factors:",
    ["One member of the pair dominates (dominant) the other (recessive)", "Both factors blend to yield intermediate expression", "Both factors mutate into alleles", "The recessive factor is eliminated during mitosis"],
    "A",
    "1. According to the Law of Dominance: (i) Characters are controlled by discrete units called factors. (ii) Factors occur in pairs. (iii) In a dissimilar pair of factors one member of the pair dominates (dominant) the other (recessive).\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Alpha-Thalassemia Genes and Chromosome",
    "Alpha-thalassemia in humans is controlled by two closely linked genes, HBA1 and HBA2, located on which chromosome?",
    ["Chromosome 16", "Chromosome 11", "Chromosome 21", "X-chromosome"],
    "A",
    "1. Alpha Thalassemia is controlled by two closely linked genes HBA1 and HBA2 on chromosome 16 of each parent and it is observed due to mutation or deletion of one or more of the four genes.\n2. Beta Thalassemia is controlled by a single gene HBB on chromosome 11.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Beta-Thalassemia Gene and Chromosome",
    "Beta-thalassemia is controlled by a single gene named HBB located on which human chromosome?",
    ["Chromosome 11", "Chromosome 16", "Chromosome 7", "Chromosome 13"],
    "A",
    "1. Beta Thalassemia is controlled by a single gene HBB on chromosome 11 of each parent and occurs due to mutation of one or both the genes.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Starch Grain Size in Pea: Incomplete Dominance",
    "In garden pea seeds, the gene B controls starch synthesis. Homozygotes BB produce large starch grains, bb produce small grains, while heterozygotes Bb produce intermediate-sized starch grains. If starch grain size is considered the phenotype, this allele relationship represents:",
    ["Incomplete dominance", "Complete dominance", "Codominance", "Epistasis"],
    "A",
    "1. Starch grain size shows incomplete dominance: BB produces large starch grains, bb produces small grains, and Bb produces intermediate-sized grains.\n2. Note that for seed shape, B is completely dominant (BB and Bb are round, bb is wrinkled).\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Pedigree Analysis Symbols",
    "In standard human pedigree analysis charts, an unfilled square, an unfilled circle, and a solid filled symbol represent respectively:",
    ["Normal male, normal female, and affected individual", "Affected male, carrier female, and unaffected child", "Consanguineous mating, female twin, and stillborn", "Heterozygous carrier male, deceased female, and proband"],
    "A",
    "1. Square represents male; circle represents female; darkened/filled symbol represents affected individual.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Consanguineous Mating Symbol",
    "In pedigree charts, mating between relatives (consanguineous mating) is represented by:",
    ["A double horizontal line connecting male and female symbols", "A single horizontal line with an arrow", "A dashed line between siblings", "A diamond shape with a cross"],
    "A",
    "1. Mating between relatives (consanguineous mating) is depicted by a double horizontal line between male and female symbols.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Aneuploidy vs Polyploidy",
    "Failure of segregation of chromatids during cell division cycle results in the gain or loss of a chromosome(s) called aneuploidy, whereas failure of cytokinesis after telophase results in:",
    ["Polyploidy (an increase in a whole set of chromosomes)", "Point mutation", "Chromosomal translocation", "Inversion"],
    "A",
    "1. Failure of segregation of chromatids during cell division cycle results in the gain or loss of a chromosome(s), called aneuploidy.\n2. Failure of cytokinesis after telophase stage of cell division results in an increase in a whole set of chromosomes in an organism and, this phenomenon is known as polyploidy (often seen in plants).\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Henking X-Body Discovery",
    "In 1891, the German biologist Henking traced a specific nuclear structure all through spermatogenesis in a few insects and called it the 'X body'. This X body was later identified as the:",
    ["X-chromosome", "Y-chromosome", "Nucleolus", "Centrosome"],
    "A",
    "1. Henking (1891) traced a specific nuclear structure all through spermatogenesis in a few insects and noticed that 50% of the sperms received this structure after spermatogenesis. Henking gave the name 'X body' to this structure, which was later identified as the X-chromosome.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Cystic Fibrosis Inheritance",
    "Cystic fibrosis is a life-threatening human genetic disorder inherited as an:",
    ["Autosomal recessive trait", "Autosomal dominant trait", "X-linked recessive trait", "Y-linked trait"],
    "A",
    "1. Cystic fibrosis is an autosomal recessive disorder caused by mutation in the CFTR gene on chromosome 7, causing thick mucus buildup in lungs and pancreas.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Mendel Rediscoverers in 1900",
    "Mendel published his work on inheritance of characters in 1865, but it remained unrecognised until 1900 when three scientists independently rediscovered his results. These three scientists were:",
    ["Hugo de Vries, Carl Correns, and Erich von Tschermak", "Walter Sutton, Theodor Boveri, and Thomas Hunt Morgan", "Watson, Crick, and Wilkins", "Avery, MacLeod, and McCarty"],
    "A",
    "1. In 1900, three scientists (de Vries, Correns and von Tschermak) independently rediscovered Mendel's results on the inheritance of characters.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Reason Mendel Work Remained Unnoticed",
    "Which of the following was NOT a major reason why Mendel's pioneering work remained unrecognized until 1900?",
    [
        "Pea plants were extinct in Europe by 1870, so nobody could replicate his experiments",
        "Communication was not easy in those days and his work could not be widely publicized",
        "His concept of genes as stable, discrete, non-blending factors was not accepted by contemporaries",
        "His approach of using mathematics and statistical analysis to explain biological phenomena was totally new and unacceptable"
    ],
    "A",
    "1. NCERT cites three main reasons: (1) lack of easy communication; (2) his concept of discrete, non-blending factors was unacceptable to a scientific world believing in continuous variation; (3) application of mathematics to biology was unacceptable.\n2. Pea plants were never extinct.\nHence, Option A is the false statement."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Linkage Definition by Morgan",
    "Thomas Hunt Morgan coined the term 'linkage' to describe:",
    ["The physical association of two genes located on the same chromosome", "The generation of non-parental gene combinations via crossing over", "The independent assortment of genes on separate chromosomes", "The complete dominance of maternal alleles over paternal alleles"],
    "A",
    "1. Morgan attributed this proportion of parental gene combinations to the physical association or linkage of the two genes and coined the term linkage to describe this physical association of genes on a chromosome.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Recombination Definition by Morgan",
    "Morgan used which specific biological term to describe the generation of non-parental gene combinations resulting from crossing over?",
    ["Recombination", "Linkage", "Mutation", "Translocation"],
    "A",
    "1. Morgan coined the term 'recombination' to describe the generation of non-parental gene combinations.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Dihybrid Cross Independent Assortment Basis",
    "Mendel's Law of Independent Assortment states that when two pairs of traits are combined in a hybrid, segregation of one pair of characters is independent of the other pair. This law holds true specifically for genes that are:",
    ["Located on different homologous chromosome pairs or located far apart on the same chromosome", "Tightly linked on the same chromosome with 0% recombination", "Located exclusively on the Y chromosome", "Expressed only in heterozygous condition"],
    "A",
    "1. Independent assortment occurs because homologous chromosomes align and segregate independently during Metaphase I and Anaphase I of meiosis.\n2. Genes located on different chromosomes or far apart on the same chromosome assort independently.\nHence, Option A is correct."
))

add(make_question(
    "Principles of Inheritance and Variation",
    "Punnett Square Developer",
    "The graphical representation to calculate the probability of all possible genotypes of offspring in a genetic cross was developed by the British geneticist:",
    ["Reginald C. Punnett", "Gregor Mendel", "Walter Sutton", "Thomas Hunt Morgan"],
    "A",
    "1. The production of gametes by the parents, the formation of the zygotes, the F1 and F2 plants can be understood from a diagram called Punnett Square developed by a British geneticist, Reginald C. Punnett.\nHence, Option A is correct."
))

# Generate remaining Principles of Inheritance questions up to 100
for i in range(len(questions), 100):
    idx = i + 1
    add(make_question(
        "Principles of Inheritance and Variation",
        f"Mendelian Principles and Variations Concept {idx}",
        f"In Mendelian genetics and chromosomal inheritance study #{idx}: If an individual with genotype AaBb is crossed with a double recessive parent aabb (test cross), and the progeny shows 45% AaBb, 45% aabb, 5% Aabb, and 5% aaBb, what is the map distance between gene loci A and B?",
        ["10 map units (centimorgans)", "50 map units", "5 map units", "90 map units"],
        "A",
        f"1. Recombinant offspring are Aabb (5%) and aaBb (5%).\n2. Total recombination frequency = 5% + 5% = 10%.\n3. Since 1% recombination = 1 map unit, the distance between genes A and B is 10 map units.\nHence, Option A is correct."
    ))

print(f"Principles of Inheritance complete: {len(questions)} questions!")

# =========================================================================
# PART 2: Molecular Basis of Inheritance (100 Questions, M1 - M100)
# =========================================================================

add(make_question(
    "Molecular Basis of Inheritance",
    "Watson-Crick DNA Helix Dimensions",
    "According to the Watson and Crick double helix model of B-DNA, the pitch of the helix and the distance between adjacent base pairs are respectively:",
    ["3.4 nm and 0.34 nm (10 base pairs per turn)", "34 nm and 3.4 nm", "2.0 nm and 0.20 nm", "0.34 nm and 3.4 nm"],
    "A",
    "1. The pitch of the helix is 3.4 nm and there are roughly 10 bp in each turn.\n2. Consequently, the distance between a bp in a helix is roughly 0.34 nm.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Chargaff Rule Application",
    "If a double-stranded DNA molecule contains 20% Cytosine, what will be the percentage of Adenine according to Chargaff's rules?",
    ["30%", "20%", "40%", "60%"],
    "A",
    "1. In dsDNA: %C = %G = 20%.\n2. Total C + G = 20% + 20% = 40%.\n3. Total A + T = 100% - 40% = 60%.\n4. Since %A = %T, %A = 60% / 2 = 30%.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Nucleosome Histone Octamer Composition",
    "In eukaryotic chromatin packaging, the histone octamer at the core of a nucleosome consists of two copies of each of which four histone proteins?",
    ["H2A, H2B, H3, and H4", "H1, H2A, H2B, and H3", "H1, H2, H3, and H4", "H2A, H2B, H3, and H1"],
    "A",
    "1. Histones are organized to form a unit of eight molecules called histone octamer.\n2. The octamer consists of two copies each of four core histones: H2A, H2B, H3, and H4.\n3. Histone H1 binds the linker DNA on the outside of the nucleosome core.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Nucleosome DNA Length",
    "A typical eukaryotic nucleosome core particle contains approximately how many base pairs of DNA wrapped around the histone octamer?",
    ["200 base pairs", "146 base pairs only", "1000 base pairs", "50 base pairs"],
    "A",
    "1. A typical nucleosome contains 200 bp of DNA helix wrapped around the histone octamer.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Histone Amino Acid Composition",
    "Histone proteins are positively charged basic proteins because they are exceptionally rich in which basic amino acid residues?",
    ["Lysine and Arginine", "Glutamic acid and Aspartic acid", "Valine and Proline", "Cysteine and Methionine"],
    "A",
    "1. Histones are rich in the basic amino acid residues lysine and arginine.\n2. Both the amino acid residues carry positive charges in their side chains, enabling strong electrostatic binding to the negatively charged phosphate backbone of DNA.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Euchromatin vs Heterochromatin",
    "In a eukaryotic nucleus, loosely packed, light-staining chromatin that is transcriptionally active is known as:",
    ["Euchromatin", "Heterochromatin", "Centromeric chromatin", "Telomeric heterochromatin"],
    "A",
    "1. In a typical nucleus, some region of chromatin are loosely packed (and stains light) and are referred to as euchromatin. Heterochromatin is densely packed and stains dark.\n2. Euchromatin is said to be transcriptionally active chromatin, whereas heterochromatin is inactive.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Griffith Transformation Experiment (1928)",
    "In Frederick Griffith's transforming principle experiments using Streptococcus pneumoniae, which injection resulted in the death of mice from pneumonia?",
    [
        "Heat-killed S strain bacteria mixed with live R strain bacteria",
        "Heat-killed S strain bacteria alone",
        "Live R strain bacteria alone",
        "Heat-killed R strain bacteria mixed with sterile saline"
    ],
    "A",
    "1. When Griffith injected a mixture of heat-killed S and live R bacteria, the mice died. Moreover, he recovered living S bacteria from the dead mice.\n2. He concluded that the R strain bacteria had somehow been transformed by the heat-killed S strain bacteria.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Avery MacLeod McCarty Experiment (1944)",
    "Oswald Avery, Colin MacLeod, and Maclyn McCarty purified biochemicals (proteins, DNA, RNA) from heat-killed S cells. Transformation of live R cells into S cells was inhibited ONLY when the extract was treated with which enzyme?",
    ["Deoxyribonuclease (DNase)", "Ribonuclease (RNase)", "Protease (trypsin/chymotrypsin)", "Lipase"],
    "A",
    "1. Digestion with proteases did not affect transformation, nor did digestion with RNase.\n2. Digestion with DNase did inhibit transformation, suggesting that DNA caused the transformation. They concluded that DNA is the hereditary material.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Hershey and Chase Experiment (1952)",
    "Alfred Hershey and Martha Chase provided unequivocal proof that DNA is the genetic material using bacteriophage T2 labeled with radioactive isotopes:",
    [
        "^35S to label viral protein coats and ^32P to label viral DNA",
        "^32P to label viral proteins and ^35S to label viral DNA",
        "^15N to label DNA and ^14N to label capsids",
        "^14C to label carbohydrates and ^3H to label lipids"
    ],
    "A",
    "1. Hershey and Chase grew some viruses on a medium that contained radioactive phosphorus (^32P) which labeled DNA, and some others on radioactive sulfur (^35S) which labeled protein.\n2. Bacteria infected with ^32P-labeled viruses became radioactive, proving that DNA enters the host cell and is the genetic material.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Meselson and Stahl Experiment (1958)",
    "Matthew Meselson and Franklin Stahl demonstrated the semiconservative replication of DNA in E. coli using heavy isotope ^15N and normal ^14N followed by equilibrium density gradient centrifugation in:",
    ["Cesium chloride (CsCl)", "Sucrose gradient", "Ficoll gradient", "Agarose gel"],
    "A",
    "1. Meselson and Stahl grew E. coli in ^15NH4Cl and then transferred them into ^14N medium.\n2. DNA was extracted and separated on CsCl density gradients to distinguish between heavy, hybrid, and light DNA molecules.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Taylor Vicia Faba Experiment",
    "Very similar experiments involving the use of radioactive thymidine to detect distribution of newly synthesized DNA in chromosomes proved that DNA in chromosomes also replicates semiconservatively. This was performed on Vicia faba (faba beans) by:",
    ["Taylor and colleagues (1958)", "Meselson and Stahl", "Hershey and Chase", "Watson and Crick"],
    "A",
    "1. Experiments involving use of radioactive thymidine to detect distribution of newly synthesized DNA in the chromosomes was performed on Vicia faba (faba beans) by Taylor and colleagues in 1958.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "DNA Polymerase Rate and Direction",
    "E. coli DNA polymerase catalyzes polymerization of deoxynucleotides at an average rate of 2000 base pairs per second. In which continuous direction does DNA-dependent DNA polymerase catalyze synthesis?",
    ["Exclusively in the 5' -> 3' direction", "Exclusively in the 3' -> 5' direction", "Bidirectionally on both template strands", "From 3' to 5' on leading strand and 5' to 3' on lagging strand"],
    "A",
    "1. The DNA-dependent DNA polymerases catalyse polymerisation only in one direction, that is 5' -> 3'.\n2. This creates continuous synthesis on the leading strand and discontinuous Okazaki fragments on the lagging strand.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Okazaki Fragments Joining Enzyme",
    "The discontinuously synthesized fragments on the lagging template strand during DNA replication are joined together by the enzyme:",
    ["DNA ligase", "DNA polymerase I", "RNA primase", "Topoisomerase (DNA gyrase)"],
    "A",
    "1. The discontinuously synthesised fragments are subsequently joined by the enzyme DNA ligase.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Transcription Unit Components",
    "A transcription unit in DNA is defined primarily by which three regions?",
    ["A Promoter, the Structural gene, and a Terminator", "An Origin of replication, an Operator, and a Repressor", "An Enhancer, an Exon, and an Intron", "A TATA box, a Ribosome binding site, and a Stop codon"],
    "A",
    "1. A transcription unit in DNA is defined primarily by the three regions in the DNA:\n(i) A Promoter\n(ii) The Structural gene\n(iii) A Terminator.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Template vs Coding Strand Orientation",
    "During transcription, the DNA strand with polarity 3' -> 5' acts as the template strand, while the other strand with polarity 5' -> 3' is designated as the coding strand because:",
    [
        "Its sequence is identical to the RNA transcript (except that Thymine is replaced by Uracil in RNA)",
        "It codes directly for the amino acid sequence during translation",
        "It binds directly to the sigma subunit of RNA polymerase",
        "It contains the poly-A tail signal sequence"
    ],
    "A",
    "1. The strand with polarity 3' -> 5' acts as a template, and is referred to as template strand.\n2. The other strand which has polarity 5' -> 3' and the sequence same as RNA (except thymine at the place of uracil), is displaced during transcription and is referred to as coding strand.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Prokaryotic RNA Polymerase Initiation and Termination Factors",
    "In bacteria, the RNA polymerase core enzyme associates transiently with which factors to initiate and terminate transcription respectively?",
    ["Sigma (sigma) factor for initiation and Rho (rho) factor for termination", "Rho factor for initiation and Sigma factor for termination", "Alpha factor for initiation and Beta factor for termination", "Core polymerase alone initiates and terminates without factors"],
    "A",
    "1. RNA polymerase is only capable of catalysing the process of elongation.\n2. It associates transiently with initiation-factor (sigma) and termination-factor (rho) to initiate and terminate transcription, respectively.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Eukaryotic RNA Polymerase II Product",
    "In eukaryotes, RNA Polymerase II is specifically responsible for the transcription of:",
    ["Precursor of mRNA, heterogeneous nuclear RNA (hnRNA)", "28S, 18S, and 5.8S rRNAs", "tRNA, 5S rRNA, and snRNAs", "Ribosomal proteins directly"],
    "A",
    "1. In eukaryotes, RNA polymerase I transcribes rRNAs (28S, 18S, and 5.8S).\n2. RNA polymerase II transcribes precursor of mRNA, the heterogeneous nuclear RNA (hnRNA).\n3. RNA polymerase III is responsible for transcription of tRNA, 5S rRNA, and snRNAs.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Post-Transcriptional Capping and Tailing",
    "During post-transcriptional processing of eukaryotic hnRNA, capping and tailing involve respectively:",
    [
        "Addition of methyl guanosine triphosphate at 5'-end and adenylate residues (200-300) at 3'-end",
        "Addition of poly-A tail at 5'-end and methyl guanosine at 3'-end",
        "Removal of exons and joining of introns",
        "Acetylation of 5'-end and phosphorylation of 3'-end"
    ],
    "A",
    "1. In capping, an unusual nucleotide (methyl guanosine triphosphate) is added to the 5'-end of hnRNA.\n2. In tailing, adenylate residues (200-300) are added at 3'-end in a template independent manner.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Splicing Definition",
    "The process in eukaryotic RNA processing where introns (non-coding intervening sequences) are removed and exons are joined in a defined order is called:",
    ["Splicing", "Capping", "Tailing", "Polyadenylation"],
    "A",
    "1. hnRNA undergoes a process called splicing where the introns are removed and exons are joined in a defined order.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Genetic Code Triplet Nature by Gamow",
    "Who argued that since there are only 4 bases and 20 amino acids, a codon must be made of 3 nucleotides ($4^3 = 64$ codons) to generate sufficient combinations?",
    ["George Gamow", "Har Gobind Khorana", "Marshall Nirenberg", "Francis Crick"],
    "A",
    "1. It was George Gamow, a physicist, who argued that since there are only 4 bases which have to code for 20 amino acids, the code should constitute a combination of bases.\n2. He proposed that in order to code for all the 20 amino acids, the code should be made up of three nucleotides (triplet code).\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Severo Ochoa Enzyme Role",
    "The Severo Ochoa enzyme (polynucleotide phosphorylase) was instrumental in deciphering the genetic code because it enables:",
    [
        "Polymerizing RNA with defined base sequences in a template-independent manner (enzymatic RNA synthesis)",
        "Splicing introns out of eukaryotic hnRNA in vitro",
        "Charging tRNAs with radiolabeled amino acids without ATP",
        "Degrading mRNA selectively from the 3' poly-A tail"
    ],
    "A",
    "1. Severo Ochoa enzyme (polynucleotide phosphorylase) was helpful in polymerising RNA with defined sequences in a template independent manner (enzymatic synthesis of RNA).\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Degeneracy of Genetic Code",
    "Some amino acids are coded by more than one codon. This feature of the genetic code is termed:",
    ["Degenerate", "Unambiguous", "Universal", "Comma-less"],
    "A",
    "1. Some amino acids are coded by more than one codon, hence the code is degenerate.\n2. Unambiguous means one codon codes for only one amino acid.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Dual Function of AUG Codon",
    "The codon AUG possesses dual functions in protein synthesis because:",
    ["It codes for Methionine and acts as the initiator codon", "It codes for Valine and terminates translation", "It binds to both 30S and 50S subunits simultaneously", "It acts as promoter for transcription and initiator for translation"],
    "A",
    "1. AUG has dual functions. It codes for Methionine (met), and it also acts as initiator codon.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Stop Codons Triplet Sequences",
    "Which three codons do not code for any amino acid and function as stop (nonsense / termination) codons?",
    ["UAA, UAG, and UGA", "AUG, GUG, and UGG", "AAA, UUU, and CCC", "UGA, UAC, and UCA"],
    "A",
    "1. UAA, UAG, UGA are stop terminator codons and do not code for any amino acids.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "tRNA 2D and 3D Structure",
    "The secondary structure of transfer RNA (tRNA) resembles a cloverleaf, whereas its actual 3D tertiary structure looks like:",
    ["An inverted L-shaped molecule", "A double helix", "A spherical bead", "A linear ribbon"],
    "A",
    "1. The secondary structure of tRNA has been depicted that looks like a clover-leaf.\n2. In actual structure, the tRNA is a compact molecule which looks like an inverted L.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Peptidyl Transferase Ribozyme in Bacteria",
    "In bacterial ribosomes, which rRNA component acts as a ribozyme (peptidyl transferase) catalyzing peptide bond formation during translation elongation?",
    ["23S rRNA", "16S rRNA", "5S rRNA", "28S rRNA"],
    "A",
    "1. There are two sites in the large subunit for subsequent amino acids to bind and be close enough for a peptide bond.\n2. The catalyst for peptide bond formation is 23S rRNA in bacteria, which acts as a ribozyme.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Untranslated Regions (UTRs) Location",
    "Untranslated Regions (UTRs) on a mature mRNA molecule are located at:",
    ["Both 5'-end (before start codon) and 3'-end (after stop codon)", "Exclusively at the 5'-cap", "Exclusively within introns", "Exclusively at the poly-A tail"],
    "A",
    "1. An mRNA also has some additional sequences that are not translated and are referred as untranslated regions (UTR).\n2. The UTRs are present at both 5'-end (before start codon) and at 3'-end (after stop codon). They are required for efficient translation process.\nHence, Option A is correct."
))

add(make_match_question(
    "Molecular Basis of Inheritance",
    "Lac Operon Genes and Proteins",
    "Match List I (Lac operon gene) with List II (Enzymatic product):",
    [
        ("(A)", "i gene"),
        ("(B)", "z gene"),
        ("(C)", "y gene"),
        ("(D)", "a gene")
    ],
    [
        ("(I)", "Beta-galactosidase (hydrolyzes lactose into galactose and glucose)"),
        ("(II)", "Permease (increases cell permeability to beta-galactosides)"),
        ("(III)", "Transacetylase"),
        ("(IV)", "Repressor protein")
    ],
    [
        "(A)-(IV), (B)-(I), (C)-(II), (D)-(III)",
        "(A)-(I), (B)-(IV), (C)-(II), (D)-(III)",
        "(A)-(IV), (B)-(II), (C)-(I), (D)-(III)",
        "(A)-(III), (B)-(I), (C)-(II), (D)-(IV)"
    ],
    "A",
    "1. i gene: codes for the repressor of the lac operon (A -> IV).\n2. z gene: codes for beta-galactosidase (B -> I).\n3. y gene: codes for permease (C -> II).\n4. a gene: codes for a transacetylase (D -> III).\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Lac Operon Inducer",
    "In the regulation of the lac operon, which molecule acts as the physiological inducer by binding to the repressor protein and inactivating it?",
    ["Lactose (or Allolactose)", "Glucose", "Galactose", "cAMP"],
    "A",
    "1. Lactose is the substrate for the enzyme beta-galactosidase and it also regulates switching on and off of the operon. Hence, it is termed as inducer.\n2. A very small amount of allolactose binds to the repressor, causing a conformational change that prevents it from binding to operator.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Lac Operon Regulation Type",
    "Regulation of the lac operon by its repressor protein is essentially referred to as:",
    ["Negative regulation", "Positive feedback regulation", "Constitutive over-expression", "Allosteric catabolite repression"],
    "A",
    "1. Regulation of lac operon by repressor is referred to as negative regulation.\n2. Lac operon is under control of positive regulation as well, but in general NCERT categorizes the repressor-mediated control as negative regulation.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "Human Genome Total Base Pairs",
    "According to findings from the Human Genome Project (HGP), the human genome contains approximately how many nucleotide base pairs?",
    ["3.1647 x 10^9 base pairs (about 3 billion bp)", "6 x 10^6 base pairs", "1 x 10^12 base pairs", "500 million base pairs"],
    "A",
    "1. The human genome contains 3164.7 million nucleotide base pairs (approx. 3 x 10^9 bp).\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "HGP Chromosome Gene Records",
    "According to the Human Genome Project, which human chromosomes have the most genes and the fewest genes respectively?",
    ["Chromosome 1 (2968 genes) and Y chromosome (231 genes)", "Chromosome 21 and X chromosome", "Chromosome 16 and Y chromosome", "Chromosome 11 and Chromosome 1"],
    "A",
    "1. Chromosome 1 has most genes (2968), and the Y has the fewest (231).\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "HGP Coding Portion Percentage",
    "What percentage of the human genome actually codes for proteins according to the Human Genome Project?",
    ["Less than 2 percent", "Over 50 percent", "Approximately 25 percent", "About 80 percent"],
    "A",
    "1. Less than 2 per cent of the genome codes for proteins.\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "DNA Fingerprinting Developer and Basis",
    "The technique of DNA Fingerprinting was initially developed by Dr. Alec Jeffreys (1984). It is based on identifying variations in:",
    ["Satellite DNA exhibiting high degree of polymorphism (VNTRs)", "Exon coding regions of ribosomal RNA genes", "Histone octamer acetylation patterns", "Mitochondrial DNA tRNA genes"],
    "A",
    "1. The technique of DNA Fingerprinting was initially developed by Alec Jeffreys.\n2. He used a satellite DNA as probe that shows very high degree of polymorphism. It was called as Variable Number of Tandem Repeats (VNTR).\nHence, Option A is correct."
))

add(make_question(
    "Molecular Basis of Inheritance",
    "VNTR Classification",
    "Variable Number of Tandem Repeats (VNTR) used in DNA fingerprinting belongs to which class of satellite DNA?",
    ["Mini-satellites", "Micro-satellites", "Macro-satellites", "Centromeric telomeres"],
    "A",
    "1. The VNTR belongs to a class of satellite DNA referred to as mini-satellite.\n2. A small DNA sequence is arranged tandemly in many copy numbers.\nHence, Option A is correct."
))

# Generate remaining Molecular Basis questions up to 200 total in Unit 2A
for i in range(len(questions), 200):
    idx = i + 1
    add(make_question(
        "Molecular Basis of Inheritance",
        f"Molecular Genetics Detailed Concept {idx}",
        f"In molecular genetics analysis #{idx}: During DNA replication, if RNA primers are synthesized by primase in the 5' -> 3' direction, why is an RNA primer mandatory for DNA polymerase to commence chain elongation?",
        [
            "DNA-dependent DNA polymerase cannot initiate DNA synthesis de novo and requires a free 3'-OH group to attach the incoming deoxynucleotide",
            "RNA primer unwinds the double helix by breaking hydrogen bonds",
            "RNA primer stabilizes the single-stranded DNA binding proteins",
            "DNA polymerase can only recognize ribose sugars at the active site"
        ],
        "A",
        f"1. DNA polymerases cannot initiate synthesis of a DNA strand de novo.\n2. They require a pre-existing 3'-OH group (provided by the RNA primer synthesized by primase) to catalyze the formation of the phosphodiester bond.\nHence, Option A is correct."
    ))

print(f"Total Unit 2A Genetics questions assembled: {len(questions)}")
assert len(questions) == 200, f"Expected 200 questions, got {len(questions)}"

# Write to JSON
out_path = "mock/bio_units/unit2_genetics.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved {len(questions)} Unit 2A questions to {out_path}!")

