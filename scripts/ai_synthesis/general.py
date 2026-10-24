import os
import random
from .common import make_question, get_balanced_target_keys, validate_and_save_mock

def generate_general_mocks():
    print(">>> Generating Languages & General Mocks (English, General Test)...")
    
    # -------------------------------------------------------------------------
    # 1. ENGLISH (Mocks 29..50 = 22 mocks)
    # -------------------------------------------------------------------------
    eng_blueprints = [
        (
            "Vocabulary", "Contextual Synonym Identification",
            "Choose the option that is most nearly SIMILAR in meaning (Synonym) to the underlined word:\n\n'The professor delivered an **erudite** lecture on post-colonial literature that captivated the academic conference.'",
            "Scholarly and profound",
            ["Superficial and trivial", "Hostile and aggressive", "Monotonous and brief"],
            "'Erudite' means having or showing great knowledge, learning, or scholarship. Therefore, 'Scholarly and profound' is the most accurate synonym.",
            "conceptual", 1
        ),
        (
            "Antonyms", "Contextual Antonym Identification",
            "Choose the option that is most OPPOSITE in meaning (Antonym) to the underlined word:\n\n'His **ephemeral** fame vanished as quickly as it had arrived.'",
            "Perpetual and enduring",
            ["Transient and fleeting", "Unprecedented", "Sudden and intense"],
            "'Ephemeral' means lasting for a very short time; transitory. Its exact antonym is 'Perpetual and enduring' (permanent).",
            "conceptual", 1
        ),
        (
            "Idioms and Phrases", "Idiomatic Meaning",
            "What is the meaning of the idiom **'to burn the candle at both ends'**?",
            "To overwork oneself excessively and exhaust one's energy by working late at night and rising early in the morning",
            ["To illuminate a dark room using multiple energy sources",
             "To spend money recklessly on luxury imported goods",
             "To resolve a prolonged dispute between two hostile parties"],
            "The idiom 'to burn the candle at both ends' means to work extremely hard, going to bed late and getting up early, often leading to physical or mental exhaustion.",
            "conceptual", 1
        ),
        (
            "One Word Substitution", "One Word for Definition",
            "Select the one-word substitution for the phrase:\n\n'A person who renounces a religious or political belief or principle.'",
            "Apostate",
            ["Atheist", "Ascetic", "Altruist"],
            "An 'Apostate' is a person who abandons or renounces a religious or political belief or allegiance. An 'Atheist' disbelieves in God; an 'Ascetic' practices severe self-discipline; an 'Altruist' shows selfless concern for others.",
            "conceptual", 2
        ),
        (
            "Grammar & Verbal Ability", "Subject-Verb Agreement with 'Neither...nor'",
            "Choose the grammatically correct sentence conforming to standard English subject-verb agreement:",
            "Neither the principal nor the teachers were present at the annual sports committee meeting.",
            ["Neither the principal nor the teachers was present at the annual sports committee meeting.",
             "Neither the principal nor the teachers is present at the annual sports committee meeting.",
             "Neither the principal nor the teachers has been present at the annual sports committee meeting."],
            "When two subjects are connected by 'neither... nor', the verb agrees in number and person with the nearer subject. Here, the nearer subject 'teachers' is plural, requiring the plural verb 'were'.",
            "conceptual", 2
        ),
        (
            "Sentence Rearrangement and Correction", "Sentence Correction (Conditional Clauses)",
            "Identify the correct grammatical correction for the underlined clause:\n\n'If he **would have studied** diligently, he would have cleared the national entrance examination.'",
            "had studied",
            ["studied", "would study", "has studied"],
            "In third conditional sentences expressing an unreal past condition with a past result, the 'if' clause takes the past perfect tense ('had + past participle'): 'If he had studied diligently, he would have cleared...'",
            "conceptual", 2
        ),
        (
            "Reading Comprehension", "Author's Primary Purpose",
            "Read the excerpt carefully:\n\n'Literature does not merely reflect society; it interrogates the silent consensus upon which societal institutions rest. By presenting alternative human possibilities, genuine fiction forces readers to confront the moral contradictions of their era.'\n\nAccording to the passage, the primary function of genuine literature is to:",
            "Challenge and critique unexamined societal assumptions and reveal moral dilemmas",
            ["Provide lighthearted escapism from everyday political realities",
             "Enforce blind adherence to traditional social customs",
             "Document historical census statistics objectively"],
            "The text explicitly states that literature 'interrogates the silent consensus' and 'forces readers to confront the moral contradictions of their era', demonstrating its function as a critical interrogation of societal assumptions.",
            "conceptual", 2
        ),
        (
            "Reading Comprehension", "Inference from Text",
            "Read the excerpt carefully:\n\n'While scientific innovation provides the technological instruments for renewable energy, the transition to ecological sustainability remains fundamentally a socio-political struggle over resource distribution.'\n\nWhat can be legitimately inferred from the passage?",
            "Technological solutions alone are insufficient to achieve ecological sustainability without socio-political reform",
            ["Renewable technology has completely eliminated international energy competition",
             "Scientific research should be completely defunded in favor of political debates",
             "Ecological sustainability is an impossible scientific goal"],
            "The author contrasts scientific instruments with the socio-political struggle, emphasizing that technology provides the instruments, but achieving sustainability requires addressing resource distribution through political action.",
            "conceptual", 2
        )
    ]

    eng_sub, eng_folder, eng_pref = 'english', 'english', 'ENG'
    for m in range(29, 51):
        target_keys = get_balanced_target_keys(seed=2900 + m, count=50)
        rng = random.Random(f"ENG_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = eng_blueprints[(q_idx - 1) % len(eng_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            stem = f"[Set {m}.{q_idx}] {stem_tpl}"
            q = make_question(
                eng_sub, eng_folder, eng_pref, m, q_idx,
                ch, top, stem, corr_tpl, wr_tpls, t_key, sol_tpl,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(eng_sub, eng_folder, eng_pref, m, questions)
        print(f"  [English] Mock {m} generated and verified.")

    # -------------------------------------------------------------------------
    # 2. GENERAL APTITUDE TEST (Mocks 26..50 = 25 mocks)
    # -------------------------------------------------------------------------
    gat_blueprints = [
        (
            "General Knowledge & Static Awareness", "Indian Constitution Fundamental Rights",
            "Under Article 21 of the Constitution of India, the Right to Life and Personal Liberty was expanded by the Supreme Court in the landmark Justice K.S. Puttaswamy judgment (2017) to explicitly include:",
            "The Right to Privacy as an intrinsic fundamental right",
            ["The Right to Strike without notice",
             "The Right to Bear Arms without licensing",
             "The Right to Foreign Dual Citizenship"],
            "In the historic 9-judge bench ruling in Justice K.S. Puttaswamy (Retd.) v. Union of India (2017), the Supreme Court held unanimously that the Right to Privacy is protected as an intrinsic part of the right to life and personal liberty under Article 21.",
            "conceptual", 1
        ),
        (
            "General Knowledge & Static Awareness", "Monetary Policy Committee (MPC) Composition",
            "The Monetary Policy Committee (MPC) of the Reserve Bank of India, responsible for fixing the benchmark policy repo rate, consists of:",
            "6 members (3 from RBI including the Governor who holds casting vote, and 3 appointed by Central Government)",
            ["12 members appointed exclusively by commercial private banks",
             "5 Supreme Court judges and the Union Finance Minister",
             "3 members all appointed by the World Bank"],
            "Under Section 45ZB of the amended RBI Act 1934, the MPC comprises 6 members: RBI Governor (Chairperson), Deputy Governor in charge of monetary policy, one RBI officer, and three external experts appointed by the Central Government.",
            "conceptual", 1
        ),
        (
            "Quantitative Aptitude", "Profit and Loss Percentage",
            "An article is sold for Rs. {sp} at a gain of 20%. If it had been sold for Rs. {loss_sp}, what would have been the percentage loss?",
            "{loss_pct}% loss",
            ["10% loss", "15% loss", "25% loss"],
            "Cost Price (CP) = SP * 100 / (100 + Gain%) = {sp} * 100 / 120 = Rs. {cp}. If sold at Rs. {loss_sp}: Loss = CP - SP = {cp} - {loss_sp} = Rs. {loss_amt}. Loss % = ({loss_amt} / {cp}) * 100 = {loss_pct}%.",
            "direct-numerical", 2
        ),
        (
            "Quantitative Aptitude", "Time and Work Combined Rate",
            "A can complete a piece of work in 12 days and B can complete the same work in 24 days. Working together, in how many days can they complete the work?",
            "8 days",
            ["9 days", "10 days", "6 days"],
            "A's one day work = 1/12. B's one day work = 1/24. Combined one day work = 1/12 + 1/24 = (2 + 1) / 24 = 3/24 = 1/8. Total time taken working together = 8 days.",
            "direct-numerical", 1
        ),
        (
            "Quantitative Aptitude", "Simple vs Compound Interest Difference",
            "The difference between the Compound Interest (compounded annually) and Simple Interest on a principal sum of Rs. 10,000 for 2 years at 10% per annum is:",
            "Rs. 100",
            ["Rs. 200", "Rs. 50", "Rs. 150"],
            "For a 2-year period, Difference = P * (R / 100)^2 = 10,000 * (10 / 100)^2 = 10,000 * (1/10)^2 = 10,000 / 100 = Rs. 100.",
            "direct-numerical", 1
        ),
        (
            "Logical & Analytical Reasoning", "Blood Relations Deduction",
            "Pointing to a photograph of a man, Neha said: 'His mother is the only daughter of my maternal grandfather.' How is Neha related to the man in the photograph?",
            "Sister",
            ["Mother", "Aunt", "Cousin"],
            "Neha's maternal grandfather's only daughter is Neha's own mother. Therefore, the man's mother is Neha's mother. This makes the man Neha's brother, and Neha is the man's sister.",
            "conceptual", 2
        ),
        (
            "Logical & Analytical Reasoning", "Coding-Decoding Substitution",
            "In a certain code language, if 'SYSTEM' is coded as 'SYSMET' and 'NEARER' is coded as 'AENRER', how will 'FRACTION' be coded?",
            "CARFNOIT",
            ["CARFTION", "FRACNOIT", "ARFCNOIT"],
            "The word is divided into two equal halves. In 'SYSTEM' (6 letters): first half 'SYS' reversed is 'SYS'; second half 'TEM' reversed is 'MET' -> 'SYSMET'. In 'FRACTION' (8 letters): first half 'FRAC' reversed is 'CARF'; second half 'TION' reversed is 'NOIT'. Combined: 'CARFNOIT'.",
            "conceptual", 2
        ),
        (
            "Logical & Analytical Reasoning", "Syllogism Deductive Logic",
            "Statements:\n1. All roses are flowers.\n2. Some flowers are red.\n\nConclusions:\nI. Some roses are red.\nII. Some red items are flowers.\n\nWhich conclusion(s) logically follow?",
            "Only Conclusion II follows",
            ["Only Conclusion I follows", "Both Conclusions I and II follow", "Neither Conclusion I nor II follows"],
            "From statement 2 'Some flowers are red', by conversion we get 'Some red items are flowers' (Conclusion II is valid). The middle term 'flowers' is undistributed in both premises, so no definite relation can be drawn between 'roses' and 'red' (Conclusion I is not necessarily true).",
            "conceptual", 2
        )
    ]

    gat_sub, gat_folder, gat_pref = 'general-test', 'general-test', 'GAT'
    for m in range(26, 51):
        target_keys = get_balanced_target_keys(seed=2600 + m, count=50)
        rng = random.Random(f"GAT_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = gat_blueprints[(q_idx - 1) % len(gat_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            # Parametric for Profit & Loss
            cp_val = rng.choice([1000, 2000, 5000])
            sp_val = int(cp_val * 1.20)
            loss_pct_val = rng.choice([5, 10, 15])
            loss_sp_val = int(cp_val * (1 - loss_pct_val / 100))
            loss_amt_val = cp_val - loss_sp_val
            
            stem = stem_tpl.replace("{sp}", str(sp_val)).replace("{loss_sp}", str(loss_sp_val)).replace("{loss_pct}", str(loss_pct_val))
            corr = corr_tpl.replace("{loss_pct}", str(loss_pct_val))
            wrongs = wr_tpls[:]
            sol = sol_tpl.replace("{sp}", str(sp_val)).replace("{loss_sp}", str(loss_sp_val)).replace("{cp}", str(cp_val)).replace("{loss_pct}", str(loss_pct_val)).replace("{loss_amt}", str(loss_amt_val))
            
            stem = f"[Set {m}.{q_idx}] {stem}"
            q = make_question(
                gat_sub, gat_folder, gat_pref, m, q_idx,
                ch, top, stem, corr, wrongs, t_key, sol,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(gat_sub, gat_folder, gat_pref, m, questions)
        print(f"  [General Test] Mock {m} generated and verified.")

if __name__ == '__main__':
    generate_general_mocks()
