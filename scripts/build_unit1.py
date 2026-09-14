import os, sys, json
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scripts.bio_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, normalize_text, get_pyq_normalized_set
)

def build_unit1_questions():
    questions = []
    pyq_seen = get_pyq_normalized_set()
    local_seen = set()

    def add(q):
        norm = normalize_text(q["questionText"])
        if norm in local_seen:
            raise ValueError(f"Duplicate question detected in Unit 1: {q['questionText'][:60]}")
        if norm in pyq_seen:
            raise ValueError(f"Question matches PYQ: {q['questionText'][:60]}")
        local_seen.add(norm)
        questions.append(q)

    # 160 Questions for Unit 1: Reproduction
    # Chapters: Sexual Reproduction in Flowering Plants, Human Reproduction, Reproductive Health, Reproduction in Organisms
    # We will generate diverse types: Direct MCQs, Match, Sequence, Statement I/II, Assertion-Reason, Combinations.

    # --- BLOCK 1: Sexual Reproduction in Flowering Plants ---
    # Microsporogenesis, Pollen structure & viability (1-20)
    add(make_question(
        "Sexual Reproduction in Flowering Plants",
        "Microsporogenesis & Anther Wall",
        "Which of the following wall layers of a typical microsporangium is multinucleated and performs the function of nourishing the developing pollen grains?",
        [
            ("Tapetum", None, "Correct answer. Tapetum is the innermost layer whose cells possess dense cytoplasm and generally have more than one nucleus; it nourishes developing microspores."),
            ("Endothecium", "Layer Function Confusion", "Endothecium has alpha-cellulosic fibrous bands that aid in anther dehiscence, not direct nourishment."),
            ("Middle layers", "Anatomy Layer Trap", "Middle layers are short-lived parenchymatous cells that degenerate during microspore maturation."),
            ("Epidermis", "Outer Layer Trap", "Epidermis is the single outermost protective layer of the anther.")
        ],
        "A",
        "1. A typical anther consists of four wall layers from outside to inside: Epidermis, Endothecium, Middle layers, and Tapetum.\n2. The outer three layers perform the function of protection and help in dehiscence of anther to release pollen.\n3. The innermost layer is the tapetum. It nourishes the developing pollen grains. Cells of the tapetum possess dense cytoplasm and generally have more than one nucleus.\nHence, Option A is correct."
    ))

    add(make_question(
        "Sexual Reproduction in Flowering Plants",
        "Pollen Grain Structure & Sporopollenin",
        "The exine of a pollen grain is composed of sporopollenin. Which of the following statements regarding sporopollenin is correct?",
        [
            ("It is one of the most resistant organic materials known and can withstand high temperatures, strong acids, and alkali.", None, "Correct answer. Sporopollenin is exceptionally resistant to chemical and biological degradation."),
            ("It can be readily degraded by a specific class of fungal pectinases.", "Degradation Fallacy", "NCERT explicitly notes that no enzyme that degrades sporopollenin is so far known."),
            ("It forms a uniform, continuous layer covering the entire pollen grain without any gaps.", "Germ Pore Blindspot", "Sporopollenin is absent at prominent apertures called germ pores."),
            ("It is synthesized and deposited exclusively by the vegetative cell of the male gametophyte.", "Origin Misattribution", "Sporopollenin precursors (Ubisch bodies) are secreted by the tapetum of the anther wall.")
        ],
        "A",
        "1. According to NCERT, sporopollenin is one of the most resistant organic materials known. It can withstand high temperatures and strong acids and alkali.\n2. No enzyme that degrades sporopollenin is so far known.\n3. It exhibits apertures called germ pores where sporopollenin is absent to facilitate pollen tube emergence.\nHence, Option A is correct."
    ))

    add(make_question(
        "Sexual Reproduction in Flowering Plants",
        "Pollen Shedding Stage",
        "In over 60 percent of angiosperms, pollen grains are shed at which developmental stage?",
        [
            ("2-celled stage (one vegetative cell and one generative cell)", None, "Correct answer. In >60% of angiosperms, shedding occurs at the 2-celled stage."),
            ("3-celled stage (one vegetative cell and two male gametes)", "Stage Inversion Trap", "This occurs in the remaining ~40% of species where the generative cell divides prior to shedding."),
            ("Single-celled microspore stage before mitosis", "Pre-Mitotic Trap", "Pollen shedding occurs only after microspores mature into pollen grains via unequal mitosis."),
            ("4-celled stage with three generative cells", "Cell Number Fiction", "Angiosperm pollen is shed either at 2-celled or 3-celled stages; 4-celled pollen shedding does not occur.")
        ],
        "A",
        "1. In over 60% of angiosperms, pollen grains are shed at the 2-celled stage consisting of a larger vegetative cell and a smaller generative cell.\n2. In the remaining species, the generative cell divides mitotically to give rise to the two male gametes before pollen grains are shed (3-celled stage).\nHence, Option A is correct."
    ))

    add(make_sequence_question(
        "Sexual Reproduction in Flowering Plants",
        "Microsporogenesis Sequence",
        "Arrange the following developmental events in anther development and microsporogenesis in the correct chronological sequence:",
        [
            "Primary sporogenous tissue occupies the centre of each microsporangium.",
            "Sporogenous cells differentiate into microspore mother cells (Pollen mother cells).",
            "Meiotic division of microspore mother cell yields microspore tetrad.",
            "Dissociation of microspores from tetrad and development into pollen grains."
        ],
        [
            "(A) -> (B) -> (C) -> (D)",
            "(B) -> (A) -> (C) -> (D)",
            "(A) -> (C) -> (B) -> (D)",
            "(C) -> (A) -> (B) -> (D)"
        ],
        "A",
        "1. In a young anther, compactly arranged homogeneous cells called sporogenous tissue occupy the centre of each microsporangium (A).\n2. As the anther develops, each cell of the sporogenous tissue is capable of giving rise to a microspore tetrad; each is a potential pollen mother cell (B).\n3. Each PMC undergoes meiosis to form a cluster of four cells — the microspore tetrad (C).\n4. As anthers mature and dehydrate, microspores dissociate from each other and develop into pollen grains (D).\nHence, Option A is correct."
    ))

    add(make_match_question(
        "Sexual Reproduction in Flowering Plants",
        "Pollen Wall & Cells Matching",
        "Match List I with List II regarding pollen grain components:",
        [
            ("(A)", "Vegetative cell"),
            ("(B)", "Generative cell"),
            ("(C)", "Exine"),
            ("(D)", "Intine")
        ],
        [
            ("(I)", "Small, spindle-shaped with dense cytoplasm and nucleus"),
            ("(II)", "Inner pectin-cellulose wall layer"),
            ("(III)", "Bigger cell with abundant food reserves and irregular nucleus"),
            ("(IV)", "Hard outer layer composed of sporopollenin")
        ],
        [
            "(A)-(III), (B)-(I), (C)-(IV), (D)-(II)",
            "(A)-(I), (B)-(III), (C)-(IV), (D)-(II)",
            "(A)-(III), (B)-(I), (C)-(II), (D)-(IV)",
            "(A)-(II), (B)-(IV), (C)-(I), (D)-(III)"
        ],
        "A",
        "1. Vegetative cell is bigger, has abundant food reserve and a large irregularly shaped nucleus (A -> III).\n2. Generative cell is small and floats in the cytoplasm of the vegetative cell; it is spindle-shaped with dense cytoplasm and a nucleus (B -> I).\n3. Exine is the hard outer layer made of sporopollenin (C -> IV).\n4. Intine is a thin and continuous layer made of cellulose and pectin (D -> II).\nHence, Option A is correct."
    ))

    print(f"Total Unit 1 base prototype questions added: {len(questions)}")

if __name__ == '__main__':
    build_unit1_questions()
