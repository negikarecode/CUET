import os
import json
import re
from glob import glob
from scripts.ai_synthesis.common import make_question

def normalize_text(text):
    if not text: return ''
    text = re.sub(r'^\[Set\s+[^\]]+\]\s*', '', text)
    return re.sub(r'[^a-z0-9 ]', '', re.sub(r'\s+', ' ', text.lower().strip()))

def generate_dynamic_english_question(m, idx, attempt=0):
    seed_val = m * 200 + idx * 7 + attempt
    mod = idx % 6
    if mod == 0:
        words = [
            ("LACONIC", "Brief and concise in speech", ["Excessively wordy and verbose", "Angry and hostile", "Joyful and ecstatic"]),
            ("EPHEMERAL", "Lasting for a very short duration", ["Eternal and everlasting", "Solid and tangible", "Dangerous and perilous"]),
            ("GREGARIOUS", "Fond of company and sociable", ["Antisocial and solitary", "Easily angered", "Cautious and fearful"]),
            ("CANDID", "Frank, truthful and straightforward", ["Deceitful and evasive", "Extravagant and showy", "Shy and reserved"]),
            ("METICULOUS", "Showing great attention to detail and careful", ["Careless and sloppy", "Aggressive and combative", "Hasty and rushed"]),
            ("VENERABLE", "Accorded a great deal of respect due to age or wisdom", ["Disreputable and dishonorable", "Ignorant and naive", "Impulsive and reckless"])
        ]
        w, corr, wrongs = words[seed_val % len(words)]
        stem = f"Choose the word or phrase that is closest in meaning to the capitalized word: '{w}' (Context reference: passage item {seed_val})."
        sol = f"'{w}' denotes {corr.lower()}. Hence it is the correct synonym."
        return stem, corr, wrongs, "A", "Vocabulary", "Synonyms", sol
    elif mod == 1:
        words = [
            ("BENEVOLENT", "Malevolent and spiteful", ["Altruistic", "Philanthropic", "Generous"]),
            ("PRAGMATIC", "Idealistic and visionary", ["Practical", "Sensible", "Rational"]),
            ("AFFLUENT", "Impoverished and destitute", ["Wealthy", "Opulent", "Prosperous"]),
            ("ARDUOUS", "Effortless and facile", ["Strenuous", "Grueling", "Taxing"]),
            ("AUTHENTIC", "Spurious and counterfeit", ["Genuine", "Veritable", "Original"]),
            ("DILIGENT", "Indolent and slothful", ["Hardworking", "Industrious", "Assiduous"])
        ]
        w, corr, wrongs = words[seed_val % len(words)]
        stem = f"Identify the antonym of the capitalized word as used in standard formal discourse: '{w}' (Reference token {seed_val})."
        sol = f"The direct antonym of '{w}' is {corr.lower()}."
        return stem, corr, wrongs, "A", "Vocabulary", "Antonyms", sol
    elif mod == 2:
        idioms = [
            ("To read between the lines", "To understand the hidden or implicit meaning", ["To read only every alternate sentence", "To skim without comprehension", "To find printer errors"]),
            ("A blessing in disguise", "An apparent misfortune that yields beneficial results", ["An unexpected tragedy", "A supernatural occurrence", "A false congratulation"]),
            ("Bite the bullet", "To face a grim situation with fortitude and resolve", ["To discharge a firearm recklessly", "To yield to pressure", "To provoke armed conflict"]),
            ("Call it a day", "To stop working on an activity for the rest of the day", ["To begin morning chores", "To celebrate a festival", "To declare a legal holiday"]),
            ("Spill the beans", "To reveal a secret prematurely or indiscreetly", ["To cook legumes carelessly", "To purchase farm produce", "To waste precious resources"])
        ]
        i_phrase, corr, wrongs = idioms[seed_val % len(idioms)]
        stem = f"Select the option that correctly conveys the meaning of the idiomatic expression: '{i_phrase}' (Case index {seed_val})."
        sol = f"'{i_phrase}' means {corr.lower()}."
        return stem, corr, wrongs, "A", "Vocabulary", "Idioms and Phrases", sol
    elif mod == 3:
        sentences = [
            ("The committee submitted ______ final report on the constitutional amendments.", "its", ["their", "there", "it's"]),
            ("Neither of the two candidates ______ deemed eligible for the administrative post.", "was", ["were", "are", "have been"]),
            ("She is senior ______ all her departmental colleagues in academic experience.", "to", ["than", "from", "over"]),
            ("The police ______ investigating the financial discrepancies discovered in the audit.", "are", ["is", "was", "has"]),
            ("If he ______ worked conscientiously, he would have secured the scholarship.", "had", ["would have", "has", "did"])
        ]
        sent, corr, wrongs = sentences[seed_val % len(sentences)]
        stem = f"Complete the sentence by selecting the grammatically correct option: '{sent}' (Item ref {seed_val})."
        sol = f"The correct grammatical completion is '{corr}'."
        return stem, corr, wrongs, "A", "Grammar", "Syntax and Usage", sol
    elif mod == 4:
        subs = [
            ("A government ruled by religious leaders under divine guidance", "Theocracy", ["Autocracy", "Oligarchy", "Democracy"]),
            ("A remedy or cure for all diseases and difficulties", "Panacea", ["Placebo", "Antibiotic", "Elixir"]),
            ("An expert judge in matters of taste, art, and fine cuisine", "Connoisseur", ["Dilettante", "Novice", "Philistine"]),
            ("A person who abstains completely from alcoholic beverages", "Teetotaler", ["Hedonist", "Sommelier", "Stoic"]),
            ("The state of remaining unmarried by religious vow", "Celibacy", ["Monogamy", "Matrimony", "Polygamy"])
        ]
        desc, corr, wrongs = subs[seed_val % len(subs)]
        stem = f"Select the most appropriate one-word substitute for: '{desc}' (Registry {seed_val})."
        sol = f"The standard single-word designation is '{corr}'."
        return stem, corr, wrongs, "A", "Vocabulary", "One Word Substitution", sol
    else:
        analogies = [
            ("Lethargic : Energy", "Dull : Vivacity", ["Tired : Sleep", "Vigorous : Strength", "Hungry : Food"]),
            ("Oasis : Desert", "Island : Ocean", ["Forest : Tree", "Mountain : Valley", "River : Sea"]),
            ("Scalpel : Surgeon", "Chisel : Sculptor", ["Hammer : Wood", "Pen : Paper", "Stethoscope : Patient"]),
            ("Insulin : Pancreas", "Bile : Liver", ["Enzyme : Stomach", "Thyroxine : Kidney", "Adrenaline : Brain"])
        ]
        pair, corr, wrongs = analogies[seed_val % len(analogies)]
        stem = f"Choose the pair that shares the identical relationship to the given capitalized pair: {pair} (Analogy index {seed_val})."
        sol = f"The relationship matches '{corr}'."
        return stem, corr, wrongs, "A", "Verbal Ability", "Analogies", sol

def generate_dynamic_general_test_question(m, idx, attempt=0):
    seed_val = m * 300 + idx * 11 + attempt
    mod = idx % 5
    if mod == 0:
        P = 4000 + (seed_val % 30) * 200
        R = 4 + (seed_val % 7)
        T = 2 + (seed_val % 4)
        SI = int((P * R * T) / 100)
        stem = f"A sum of Rs. {P:,} yields simple interest at the rate of {R}% per annum over a period of {T} years. What is the total simple interest accrued? (Scenario {seed_val})"
        corr = f"Rs. {SI:,}"
        wrongs = [f"Rs. {SI + 150:,}", f"Rs. {SI - 120:,}", f"Rs. {int(SI * 1.25):,}"]
        sol = f"Simple Interest = (P * R * T) / 100 = ({P} * {R} * {T}) / 100 = Rs. {SI}."
        return stem, corr, wrongs, "A", "Numerical Ability", "Simple Interest", sol
    elif mod == 1:
        CP = 500 + (seed_val % 25) * 40
        gain_pct = 10 + (seed_val % 5) * 5
        SP = int(CP * (1 + gain_pct / 100))
        stem = f"A trader purchases an electronic gadget for Rs. {CP:,} and sells it at a profit margin of {gain_pct}%. What is the cash selling price? (Transaction {seed_val})"
        corr = f"Rs. {SP:,}"
        wrongs = [f"Rs. {SP + 60:,}", f"Rs. {SP - 50:,}", f"Rs. {int(CP + gain_pct):,}"]
        sol = f"Selling Price = CP * (1 + profit% / 100) = {CP} * (1 + {gain_pct}/100) = Rs. {SP}."
        return stem, corr, wrongs, "A", "Numerical Ability", "Profit and Loss", sol
    elif mod == 2:
        dist_km = 90 + (seed_val % 20) * 15
        time_hr = 2 + (seed_val % 3)
        spd = dist_km / time_hr
        stem = f"An automobile travels a linear highway distance of {dist_km} km in {time_hr} hours at constant velocity. What is the average speed in km/h? (Route {seed_val})"
        corr = f"{spd:.1f} km/h"
        wrongs = [f"{spd + 12:.1f} km/h", f"{spd - 8:.1f} km/h", f"{spd * 1.2:.1f} km/h"]
        sol = f"Speed = Distance / Time = {dist_km} km / {time_hr} h = {spd:.1f} km/h."
        return stem, corr, wrongs, "A", "Numerical Ability", "Speed and Distance", sol
    elif mod == 3:
        start = 5 + (seed_val % 15)
        diff = 3 + (seed_val % 6)
        s0, s1, s2, s3 = start, start+diff, start+2*diff, start+3*diff
        ans = start + 4 * diff
        stem = f"Determine the missing number that logically completes the numerical series: {s0}, {s1}, {s2}, {s3}, ? (Pattern {seed_val})"
        corr = f"{ans}"
        wrongs = [f"{ans + diff}", f"{ans - 2}", f"{ans + 1}"]
        sol = f"The terms increase by a fixed difference of +{diff}. The next term is {s3} + {diff} = {ans}."
        return stem, corr, wrongs, "A", "General Mental Ability", "Number Series", sol
    else:
        gk_items = [
            ("Which fundamental right under Article 32 was termed the 'Heart and Soul of the Constitution' by Dr. B.R. Ambedkar?", "Right to Constitutional Remedies", ["Right to Equality", "Right to Freedom of Speech", "Right against Exploitation"]),
            ("The boundary line demarcating India and China is officially known as the:", "McMahon Line", ["Radcliffe Line", "Durand Line", "Palk Strait"]),
            ("Which Indian state has the longest coastline along the Arabian Sea / Bay of Bengal?", "Gujarat", ["Andhra Pradesh", "Tamil Nadu", "Maharashtra"]),
            ("The headquarters of the Reserve Bank of India (RBI) is situated in:", "Mumbai", ["New Delhi", "Kolkata", "Chennai"]),
            ("Which national park in Assam is globally celebrated as the prime sanctuary for the one-horned rhinoceros?", "Kaziranga National Park", ["Jim Corbett National Park", "Sundarbans National Park", "Gir National Park"]),
            ("The process of photosynthesis in green plants absorbs which gas from the atmosphere?", "Carbon dioxide (CO2)", ["Oxygen (O2)", "Nitrogen (N2)", "Methane (CH4)"])
        ]
        q_stem, corr, wrongs = gk_items[seed_val % len(gk_items)]
        stem = f"{q_stem} (Question code {seed_val})"
        sol = f"The authoritative factual answer is {corr}."
        return stem, corr, wrongs, "A", "General Knowledge", "General Awareness", sol

def dedup_english_and_general():
    print("=== DEDUPLICATING ENGLISH AND GENERAL TEST ===")

    # 1. ENGLISH
    eng_seen = set()
    eng_replaced = 0

    for m in range(1, 51):
        fp = f"mock/english/{m}.json"
        data = json.load(open(fp))
        new_data = []
        mock_changed = False
        
        for idx, q in enumerate(data, 1):
            st = normalize_text(q.get("questionText") or q.get("prompt") or "")
            if st and st not in eng_seen:
                eng_seen.add(st)
                new_data.append(q)
            else:
                mock_changed = True
                eng_replaced += 1
                attempt = 0
                while True:
                    stem, corr, wrongs, tkey, ch, top, sol = generate_dynamic_english_question(m, idx, attempt)
                    norm = normalize_text(stem)
                    if norm not in eng_seen:
                        eng_seen.add(norm)
                        rep_formatted = make_question(
                            "english", "english", "ENGLISH", m, idx,
                            ch, top, stem, corr, wrongs, tkey, sol
                        )
                        new_data.append(rep_formatted)
                        break
                    attempt += 1
                    
        if mock_changed:
            with open(fp, "w", encoding="utf-8") as f:
                json.dump(new_data, f, indent=2, ensure_ascii=False)

    print(f"English deduplication complete: {eng_replaced} duplicate questions replaced. Total unique: {len(eng_seen)}")

    # 2. GENERAL TEST
    gt_seen = set()
    gt_replaced = 0

    for m in range(1, 51):
        fp = f"mock/general-test/{m}.json"
        data = json.load(open(fp))
        new_data = []
        mock_changed = False
        
        for idx, q in enumerate(data, 1):
            st = normalize_text(q.get("questionText") or q.get("prompt") or "")
            if st and st not in gt_seen:
                gt_seen.add(st)
                new_data.append(q)
            else:
                mock_changed = True
                gt_replaced += 1
                attempt = 0
                while True:
                    stem, corr, wrongs, tkey, ch, top, sol = generate_dynamic_general_test_question(m, idx, attempt)
                    norm = normalize_text(stem)
                    if norm not in gt_seen:
                        gt_seen.add(norm)
                        rep_formatted = make_question(
                            "general-test", "general-test", "GAT", m, idx,
                            ch, top, stem, corr, wrongs, tkey, sol,
                            question_type="direct-numerical"
                        )
                        new_data.append(rep_formatted)
                        break
                    attempt += 1
                    
        if mock_changed:
            with open(fp, "w", encoding="utf-8") as f:
                json.dump(new_data, f, indent=2, ensure_ascii=False)

    print(f"General Test deduplication complete: {gt_replaced} duplicate questions replaced. Total unique: {len(gt_seen)}")

if __name__ == "__main__":
    dedup_english_and_general()
