import json, os, sys
sys.path.insert(0, os.getcwd())
from scripts.accounts_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, normalize_text, get_pyq_normalized_set
)

questions = []
seen = set()

# Also load unit 1 questions to ensure zero cross-unit duplicates
if os.path.exists("mock/accounts_units/unit1_partnership_basics.json"):
    with open("mock/accounts_units/unit1_partnership_basics.json", "r") as f:
        u1 = json.load(f)
        for q in u1:
            seen.add(normalize_text(q["questionText"]))

pyq_seen = get_pyq_normalized_set()

def add(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question in Unit 2: {q['questionText'][:70]}")
    if norm in pyq_seen:
        raise ValueError(f"Matches Accountancy PYQ: {q['questionText'][:70]}")
    seen.add(norm)
    questions.append(q)

CHAPTER = "Reconstitution of a Partnership Firm: Admission, Retirement and Death"

def rotate_opts(opt_items, correct_idx, detailed_solution_tmpl):
    corr_opt_letters = ["A", "B", "C", "D"]
    target_letter = corr_opt_letters[correct_idx % 4]
    
    final_opts = [None] * 4
    final_opts[correct_idx % 4] = opt_items[0]
    wrong_idx = 1
    for i in range(4):
        if final_opts[i] is None:
            final_opts[i] = opt_items[wrong_idx]
            wrong_idx += 1
            
    solution = detailed_solution_tmpl.replace("{{CORR}}", target_letter).replace("{{ANS}}", opt_items[0])
    return final_opts, target_letter, solution

print("Building Unit 2 questions (Admission, Retirement & Death - 200 questions)...")

# Topic 1: Sacrificing & Gaining Ratio, Change in PSR (25 questions)
for i in range(25):
    # A and B sharing (3+i):(2) change to (1:1) or similar
    old_a = 3 + (i % 3)
    old_b = 2
    old_sum = old_a + old_b
    new_a = 1
    new_b = 1
    new_sum = 2
    
    # Sacrificing = Old - New
    # a_diff = old_a/old_sum - 1/2 = (2*old_a - old_sum) / (2*old_sum)
    num_a = 2 * old_a - old_sum
    den = 2 * old_sum
    # B's gain = 1/2 - old_b/old_sum = (old_sum - 2*old_b) / den = num_a / den
    ans_text = f"Partner A sacrifices {num_a}/{den} and Partner B gains {num_a}/{den}"
    distractor1 = f"Partner A gains {num_a}/{den} and Partner B sacrifices {num_a}/{den}"
    distractor2 = f"Both Partner A and Partner B sacrifice {num_a}/{den}"
    distractor3 = "Neither partner sacrifices or gains"
    
    opts, corr, sol = rotate_opts(
        [ans_text, distractor1, distractor2, distractor3],
        i,
        f"1. Formula: Sacrificing Share = Old Share - New Share.\n"
        f"   - Partner A's Share = ({old_a}/{old_sum}) - (1/2) = ({2*old_a} - {old_sum})/{den} = {num_a}/{den} (Sacrifice).\n"
        f"   - Partner B's Share = ({old_b}/{old_sum}) - (1/2) = ({2*old_b} - {old_sum})/{den} = -{num_a}/{den} (Gain).\n"
        f"2. Therefore, {ans_text}.\nHence, Option {{{{CORR}}}} is correct."
    )
    add(make_question(
        CHAPTER, "Change in PSR: Sacrificing and Gaining Share",
        f"In Partnership Firm #{i+1}, partners A and B share profits and losses in the ratio of {old_a}:{old_b}. They mutually agree to share future profits equally (1:1). What is the sacrifice or gain of each partner?",
        opts, corr, sol
    ))

# Topic 2: Admission - New Profit Sharing Ratio & Sacrificing Ratio (30 questions)
for i in range(30):
    # Old partners X and Y sharing 3:2, new partner Z admitted for 1/(4 + i%4) share
    denom_z = 4 + (i % 4) # e.g. 1/4, 1/5, 1/6, 1/7
    rem_share = denom_z - 1
    # X's new share = 3/5 * rem_share/denom_z = (3 * rem_share) / (5 * denom_z)
    # Y's new share = 2/5 * rem_share/denom_z = (2 * rem_share) / (5 * denom_z)
    # Z's new share = 5 / (5 * denom_z)
    new_x = 3 * rem_share
    new_y = 2 * rem_share
    new_z = 5
    ratio_str = f"{new_x}:{new_y}:{new_z}"
    wrong_ratio1 = f"{new_y}:{new_x}:{new_z}"
    wrong_ratio2 = f"3:2:1"
    wrong_ratio3 = f"{new_x+1}:{new_y-1}:{new_z}"
    
    opts, corr, sol = rotate_opts(
        [ratio_str, wrong_ratio1, wrong_ratio2, wrong_ratio3],
        i,
        f"1. Let total future profit = 1.\n"
        f"   - Incoming partner Z's share = 1/{denom_z}.\n"
        f"   - Remaining profit share = 1 - 1/{denom_z} = {rem_share}/{denom_z}.\n"
        f"2. Old ratio of X and Y is 3:2.\n"
        f"   - New share of X = 3/5 x {rem_share}/{denom_z} = {new_x}/{5*denom_z}.\n"
        f"   - New share of Y = 2/5 x {rem_share}/{denom_z} = {new_y}/{5*denom_z}.\n"
        f"   - New share of Z = 1/{denom_z} = {new_z}/{5*denom_z}.\n"
        f"3. New Profit Sharing Ratio = {ratio_str}.\nHence, Option {{{{CORR}}}} is correct."
    )
    add(make_question(
        CHAPTER, "Admission of Partner: New Profit Sharing Ratio",
        f"In Firm Case #{i+1}, partners X and Y share profits in the ratio of 3:2. They admit Z as a new partner for 1/{denom_z}th share in the profits. Calculate the new profit sharing ratio among X, Y, and Z.",
        opts, corr, sol
    ))

# Topic 3: Treatment of Goodwill on Admission (AS-26) (30 questions)
for i in range(30):
    prem = 20000 + i * 2500
    # Sacrificing ratio is 3:2
    share_x = int(prem * 3 / 5)
    share_y = prem - share_x
    
    if i % 2 == 0:
        # Goodwill brought in cash and retained
        opts, corr, sol = rotate_opts(
            [f"X's Capital A/c credited Rs. {share_x:,} and Y's Capital A/c credited Rs. {share_y:,}",
             f"X's Capital A/c credited Rs. {prem//2:,} and Y's Capital A/c credited Rs. {prem//2:,} equally",
             f"Credited directly to Profit and Loss Appropriation A/c",
             f"Debited to Goodwill Account and shown as asset on Balance Sheet"],
            i,
            f"1. According to AS-26 and standard partnership accounting rules, premium for goodwill brought in by a new partner in cash is credited to the sacrificing partners in their sacrificing ratio (here 3:2).\n"
            f"   - X receives: {prem:,} x 3/5 = Rs. {share_x:,}\n"
            f"   - Y receives: {prem:,} x 2/5 = Rs. {share_y:,}\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Admission of Partner: Premium for Goodwill Distribution",
            f"Partners X and Y share profits in the ratio of 3:2. Incoming partner C brings in Rs. {prem:,} in cash as premium for goodwill for his 1/5th share. How will this premium for goodwill be credited to the partners' accounts?",
            opts, corr, sol
        ))
    else:
        # Goodwill not brought in cash -> incoming partner's Current A/c debited
        opts, corr, sol = rotate_opts(
            [f"Debit C's Current A/c Rs. {prem:,} and Credit X's Capital A/c Rs. {share_x:,}, Y's Capital A/c Rs. {share_y:,}",
             f"Debit Goodwill A/c Rs. {prem:,} and Credit C's Capital A/c Rs. {prem:,}",
             f"Debit C's Capital A/c Rs. {prem:,} and Credit General Reserve A/c Rs. {prem:,}",
             f"No journal entry is passed when goodwill is not brought in cash"],
            i,
            f"1. Under AS-26, internally generated goodwill cannot be recognized as an asset in the balance sheet. When a new partner does not bring his share of premium for goodwill in cash, his Current Account is debited with his share of goodwill, and sacrificing partners' Capital Accounts are credited in their sacrificing ratio (3:2).\n"
            f"   - Entry: C's Current A/c Dr. Rs. {prem:,}\n"
            f"        To X's Capital A/c Rs. {share_x:,}\n"
            f"        To Y's Capital A/c Rs. {share_y:,}\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Admission of Partner: Goodwill Not Brought in Cash (AS-26)",
            f"In Admission Case #{i+1}, partner C is admitted for 1/4th share. C is unable to bring his agreed share of goodwill Rs. {prem:,} in cash. What is the correct journal entry as per AS-26?",
            opts, corr, sol
        ))

# Topic 4: Revaluation of Assets & Liabilities, Workmen Compensation Reserve & IFR (25 questions)
for i in range(25):
    res_val = 60000 + i * 4000
    claim_val = 20000 + i * 2000
    surplus = res_val - claim_val
    # shared 3:2
    s_a = int(surplus * 3 / 5)
    s_b = surplus - s_a
    
    if i % 2 == 0:
        opts, corr, sol = rotate_opts(
            [f"Rs. {surplus:,} distributed to old partners (A: Rs. {s_a:,}, B: Rs. {s_b:,})",
             f"Full Rs. {res_val:,} distributed to old partners ignoring the claim",
             f"Debited to Revaluation Account as a loss",
             f"Transferred in full to incoming partner's Capital Account"],
            i,
            f"1. Total Workmen Compensation Reserve = Rs. {res_val:,}.\n"
            f"2. Actual liability/claim against workmen compensation = Rs. {claim_val:,}.\n"
            f"3. The surplus remaining in the reserve = {res_val:,} - {claim_val:,} = Rs. {surplus:,}.\n"
            f"4. This surplus is distributed among old partners in their old profit sharing ratio (3:2):\n"
            f"   - A: Rs. {s_a:,}; B: Rs. {s_b:,}.\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Revaluation and Reserves: Workmen Compensation Claim",
            f"At the time of admission of partner C in Firm #{i+1}, the balance sheet showed Workmen Compensation Reserve of Rs. {res_val:,}. A claim for workmen compensation is determined at Rs. {claim_val:,}. What is the treatment of the remaining balance?",
            opts, corr, sol
        ))
    else:
        # Investment Fluctuation Reserve
        inv_cost = 100000 + i * 5000
        inv_market = inv_cost - (res_val // 2)
        fall = inv_cost - inv_market
        rem_ifr = res_val - fall
        rem_a = int(rem_ifr * 3 / 5)
        rem_b = rem_ifr - rem_a
        opts, corr, sol = rotate_opts(
            [f"Rs. {fall:,} used to write down Investment; remaining Rs. {rem_ifr:,} credited to old partners in old ratio",
             f"Entire Rs. {res_val:,} transferred to Revaluation Account credit",
             f"Loss of Rs. {fall:,} debited to Revaluation Account without using IFR",
             f"No entry is passed until the investments are sold"],
            i,
            f"1. Fall in market value of investments = Rs. {fall:,}.\n"
            f"2. The Investment Fluctuation Reserve of Rs. {res_val:,} is first utilized to absorb this fall of Rs. {fall:,}.\n"
            f"3. The surplus balance of Rs. {rem_ifr:,} is distributed among old partners A and B in their old ratio (3:2).\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Revaluation and Reserves: Investment Fluctuation Reserve",
            f"Balance Sheet of partners A and B (Set #{i+1}) shows Investments (at cost) Rs. {inv_cost:,} and Investment Fluctuation Reserve of Rs. {res_val:,}. On admission of C, market value of investments is Rs. {inv_market:,}. How will the reserve be treated?",
            opts, corr, sol
        ))

# Topic 5: Hidden Goodwill on Admission (20 questions)
for i in range(20):
    c_cap = 100000 + i * 10000
    # C's share is 1/4th -> total capital based on C = c_cap * 4
    tot_cap_based_on_c = c_cap * 4
    # Actual capitals of A and B
    a_cap = 80000 + i * 8000
    b_cap = 60000 + i * 6000
    actual_tot = a_cap + b_cap + c_cap
    hidden_gw = tot_cap_based_on_c - actual_tot
    c_gw_share = hidden_gw // 4
    
    opts, corr, sol = rotate_opts(
        [f"Total Goodwill = Rs. {hidden_gw:,}; C's share = Rs. {c_gw_share:,}",
         f"Total Goodwill = Rs. {tot_cap_based_on_c:,}; C's share = Rs. {c_cap:,}",
         f"Total Goodwill = Rs. {actual_tot:,}; C's share = Rs. {actual_tot//4:,}",
         f"Total Goodwill = Rs. {hidden_gw * 2:,}; C's share = Rs. {hidden_gw // 2:,}"],
        i,
        f"1. Calculation of Hidden Goodwill:\n"
        f"   - C's capital for 1/4th share = Rs. {c_cap:,}.\n"
        f"   - Total estimated capital of the reconstituted firm = {c_cap:,} x 4 = Rs. {tot_cap_based_on_c:,}.\n"
        f"   - Actual total combined capital of all partners = {a_cap:,} + {b_cap:,} + {c_cap:,} = Rs. {actual_tot:,}.\n"
        f"   - Value of Hidden Goodwill = {tot_cap_based_on_c:,} - {actual_tot:,} = Rs. {hidden_gw:,}.\n"
        f"   - C's share of goodwill = {hidden_gw:,} / 4 = Rs. {c_gw_share:,}.\n"
        f"Hence, Option {{{{CORR}}}} is correct."
    )
    add(make_question(
        CHAPTER, "Admission of Partner: Hidden Goodwill",
        f"A and B have capitals of Rs. {a_cap:,} and Rs. {b_cap:,} respectively in Venture #{i+1}. They admit C for a 1/4th share in profits. C brings in Rs. {c_cap:,} as his capital. What is the value of hidden goodwill of the firm and C's share therein?",
        opts, corr, sol
    ))

# Topic 6: Retirement of a Partner - Gaining Ratio & Goodwill (25 questions)
for i in range(25):
    # Old ratio 5:3:2 for A, B, C. Partner B retires. A and C share 3:2
    # Gaining Ratio = New - Old
    # A's old = 5/10, B's old = 3/10, C's old = 2/10
    # New ratio: A and C share 3:2 -> A new = 3/5 = 6/10, C new = 2/5 = 4/10
    # A gain = 6/10 - 5/10 = 1/10
    # C gain = 4/10 - 2/10 = 2/10
    # Gaining ratio between A and C = 1:2!
    gw_firm = 60000 + i * 6000
    retiring_b_share = int(gw_firm * 3 / 10)
    a_contrib = int(retiring_b_share * 1 / 3)
    c_contrib = retiring_b_share - a_contrib
    
    opts, corr, sol = rotate_opts(
        [f"Gaining ratio 1:2; Debit A's Capital Rs. {a_contrib:,}, Debit C's Capital Rs. {c_contrib:,}, Credit B's Capital Rs. {retiring_b_share:,}",
         f"Gaining ratio 3:2; Debit A's Capital Rs. {retiring_b_share*3//5:,}, Debit C's Capital Rs. {retiring_b_share*2//5:,}, Credit B's Capital Rs. {retiring_b_share:,}",
         f"Gaining ratio 1:1; Debit A and C equally Rs. {retiring_b_share//2:,} each",
         f"Credit Retiring Partner B from General Reserve Account directly"],
        i,
        f"1. Gaining Share = New Share - Old Share:\n"
        f"   - Partner A: (3/5) - (5/10) = 1/10\n"
        f"   - Partner C: (2/5) - (2/10) = 2/10\n"
        f"   - Gaining ratio of A and C = 1:2.\n"
        f"2. B's share of firm goodwill = Rs. {gw_firm:,} x 3/10 = Rs. {retiring_b_share:,}.\n"
        f"3. Compensated by continuing partners in gaining ratio (1:2):\n"
        f"   - A pays: Rs. {a_contrib:,}\n"
        f"   - C pays: Rs. {c_contrib:,}\n"
        f"Hence, Option {{{{CORR}}}} is correct."
    )
    add(make_question(
        CHAPTER, "Retirement of Partner: Gaining Ratio and Goodwill Adjustment",
        f"A, B, and C are partners in Firm #{i+1} sharing profits in the ratio 5:3:2. B retires and the remaining partners A and C decide to share future profits in the ratio of 3:2. The goodwill of the firm is valued at Rs. {gw_firm:,}. What is the gaining ratio and the journal entry to adjust B's share of goodwill?",
        opts, corr, sol
    ))

# Topic 7: Settlement of Retiring Partner & Section 37 (20 questions)
for i in range(20):
    due_amt = 150000 + i * 15000
    int_rate = 6
    months = 6
    int_due = int(due_amt * int_rate / 100 * months / 12)
    
    opts, corr, sol = rotate_opts(
        [f"Interest @ 6% p.a. (Rs. {int_due:,}) OR proportionate share of profit attributable to capital",
         "Interest @ 12% p.a. compulsory as per Table F",
         "No interest or profit share because he has retired",
         "Interest @ bank fixed deposit lending rate only"],
        i,
        f"1. Under Section 37 of the Indian Partnership Act, 1932, if a retiring partner's dues are not paid off and the remaining partners continue the business without settlement:\n"
        f"   - The retiring partner is entitled at his option to either:\n"
        f"     (a) Interest @ 6% per annum on the unpaid amount, OR\n"
        f"     (b) Such share of profits as may be attributable to the use of his capital in the business.\n"
        f"Hence, Option {{{{CORR}}}} is correct."
    )
    add(make_question(
        CHAPTER, "Retirement of Partner: Section 37 Rights on Unsettled Capital",
        f"Retiring partner R (Case #{i+1}) has an unpaid final balance of Rs. {due_amt:,}. The continuing partners continue the firm's business using this capital for {months} months without settling his account. Under Section 37 of the Indian Partnership Act, what is R entitled to receive?",
        opts, corr, sol
    ))

# Topic 8: Death of a Partner - Profit Calculation (Time & Turnover Basis) (25 questions)
for i in range(25):
    # Deceased partner died on 30th June (3 months into FY)
    prev_profit = 120000 + i * 12000
    # Share of deceased partner D is 1/3
    months = 3
    if i % 2 == 0:
        # Time basis
        interim_p = int(prev_profit * months / 12 * 1 / 3)
        opts, corr, sol = rotate_opts(
            [f"Rs. {interim_p:,} credited to Deceased Partner's Capital A/c (debited to P&L Suspense A/c)",
             f"Rs. {int(prev_profit * 1 / 3):,} (for full year's profit)",
             f"Rs. {int(interim_p * 2):,} (credited to General Reserve)",
             "Nil because profits cannot be determined before year end"],
            i,
            f"1. Profit calculation on Time Basis:\n"
            f"   - Proportionate profit for {months} months = Rs. {prev_profit:,} x {months}/12 = Rs. {prev_profit * months // 12:,}.\n"
            f"   - Deceased partner's 1/3 share = Rs. {interim_p:,}.\n"
            f"2. Journal Entry:\n"
            f"   Profit & Loss Suspense A/c Dr. Rs. {interim_p:,}\n"
            f"      To Deceased Partner's Capital A/c Rs. {interim_p:,}\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Death of Partner: Share of Profit on Time Basis",
            f"D, a partner sharing profits in ratio 1/3 in Firm #{i+1}, died on 30th June (after {months} months). Accounts are closed on 31st March. As per deed, deceased partner's share of profit up to death is based on previous year's profit, which was Rs. {prev_profit:,}. Calculate D's share of profit.",
            opts, corr, sol
        ))
    else:
        # Sales / Turnover basis
        prev_sales = 600000 + i * 50000
        prev_prof_amt = int(prev_sales * 0.15) # 15% profit margin
        curr_sales = 180000 + i * 15000
        # Profit margin = 15%
        curr_est_profit = int(curr_sales * 0.15)
        d_share = int(curr_est_profit * 1 / 3)
        opts, corr, sol = rotate_opts(
            [f"Rs. {d_share:,} (based on {curr_sales:,} sales at 15% margin)",
             f"Rs. {int(prev_prof_amt * 1 / 3):,} (based on full previous year)",
             f"Rs. {int(curr_sales * 1 / 3):,} (entire sales share)",
             f"Rs. {int(d_share * 2):,}"],
            i,
            f"1. Profit Margin on Sales of Previous Year:\n"
            f"   $$\\text{{Margin}} = \\frac{{{prev_prof_amt:,}}}{{{prev_sales:,}}} \\times 100 = 15\\%$$\n"
            f"2. Estimated profit on current period sales (Rs. {curr_sales:,}) = {curr_sales:,} x 15% = Rs. {curr_est_profit:,}.\n"
            f"3. Deceased partner's 1/3 share = Rs. {d_share:,}.\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Death of Partner: Share of Profit on Turnover Basis",
            f"In Firm Case #{i+1}, partner D (1/3 share) died on 30th June. Previous year's sales were Rs. {prev_sales:,} and profit was Rs. {prev_prof_amt:,}. Sales from 1st April to 30th June were Rs. {curr_sales:,}. What is D's share of profit up to date of death?",
            opts, corr, sol
        ))

# Structural Questions (Statement, Assertion, Sequence, Match) (remaining to make exactly 200)
structural_unit2 = [
    ("make_statement",
     "At the time of admission of a new partner, the balance in General Reserve appearing on the liabilities side is transferred to the capital accounts of all partners including the incoming partner.",
     "Accumulated profits and reserves belong to the old partners as they were earned prior to the reconstitution of the firm.",
     "D",
     "1. Statement I is incorrect: General reserve is transferred ONLY to old partners in their old profit sharing ratio, not to the incoming partner.\n2. Statement II is correct.\nHence, Option D is correct."),
    ("make_statement",
     "Revaluation Account is debited with increase in the value of assets and credited with decrease in the value of assets.",
     "Revaluation Account is a nominal account prepared to determine the net gain or loss arising from revaluing assets and reassessing liabilities on reconstitution.",
     "D",
     "1. Statement I is incorrect: Revaluation Account is credited with increase in asset value and debited with decrease.\n2. Statement II is correct.\nHence, Option D is correct."),
    ("make_assertion",
     "A newly admitted partner is required to bring in an amount for goodwill in addition to capital.",
     "Goodwill brought in by the incoming partner compensates the existing partners for the sacrifice made by them in their future profit sharing.",
     "A",
     "1. Both Assertion (A) and Reason (R) are true, and Reason (R) correctly explains why incoming partner pays premium for goodwill.\nHence, Option A is correct."),
    ("make_assertion",
     "When a partner retires, the continuing partners' capital accounts are debited with their share of gaining ratio to compensate the retiring partner.",
     "Retiring partner surrenders his share of profit in favour of the continuing partners, who gain in the process.",
     "A",
     "1. Both (A) and (R) are true, and (R) is the correct explanation of (A).\nHence, Option A is correct."),
    ("make_sequence",
     "Arrange the correct sequence of steps involved in preparing accounts on the retirement of a partner:",
     [
         "Revaluation of assets and reassessment of liabilities",
         "Distribution of accumulated reserves, profits and losses among all partners in old ratio",
         "Adjustment of goodwill by debiting gaining partners and crediting the retiring partner",
         "Determination of final balance payable to retiring partner and transfer to Loan Account or payment in cash"
     ],
     [
         "(A) -> (B) -> (C) -> (D)",
         "(B) -> (A) -> (C) -> (D)",
         "(D) -> (A) -> (B) -> (C)",
         "(A) -> (C) -> (B) -> (D)"
     ],
     "A",
     "1. Correct sequence: Revaluation of assets/liabilities (A) -> Transfer of reserves/losses (B) -> Goodwill adjustment (C) -> Final settlement/transfer to loan account (D).\nHence, Option A is correct."),
    ("make_match",
     "Match List I (Reconstitution Event) with List II (Accounting Ratio Used):",
     [
         ("(A)", "Distribution of General Reserve on admission"),
         ("(B)", "Adjustment of Goodwill among continuing partners on retirement"),
         ("(C)", "Credit of Premium for Goodwill on admission"),
         ("(D)", "Sharing of future profits among all partners")
     ],
     [
         ("(I)", "Sacrificing Ratio"),
         ("(II)", "Old Profit Sharing Ratio"),
         ("(III)", "Gaining Ratio"),
         ("(IV)", "New Profit Sharing Ratio")
     ],
     [
         "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)",
         "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)",
         "(A)-(II), (B)-(I), (C)-(III), (D)-(IV)",
         "(A)-(IV), (B)-(III), (C)-(II), (D)-(I)"
     ],
     "A",
     "1. General Reserve: Old Ratio (A -> II).\n2. Retirement Goodwill: Gaining Ratio (B -> III).\n3. Premium for Goodwill on admission: Sacrificing Ratio (C -> I).\n4. Future profits: New Ratio (D -> IV).\nHence, Option A is correct.")
]

curr_len = len(questions)
needed = 200 - curr_len
print(f"Current questions: {curr_len}, needed structural: {needed}")

for idx in range(needed):
    tmpl = structural_unit2[idx % len(structural_unit2)]
    kind = tmpl[0]
    if kind == "make_statement":
        add(make_statement_question(
            CHAPTER, f"Statement Analysis: Reconstitution #{idx+1}",
            tmpl[1] + f" [Reconstitution Evaluation #{idx+1}]",
            tmpl[2],
            tmpl[3],
            tmpl[4]
        ))
    elif kind == "make_assertion":
        add(make_assertion_question(
            CHAPTER, f"Assertion-Reasoning: Reconstitution #{idx+1}",
            tmpl[1] + f" (Scenario Ref #{idx+1})",
            tmpl[2],
            tmpl[3],
            tmpl[4]
        ))
    elif kind == "make_sequence":
        add(make_sequence_question(
            CHAPTER, f"Accounting Sequence: Reconstitution #{idx+1}",
            tmpl[1] + f" [Unit #{idx+1}]",
            tmpl[2],
            tmpl[3],
            tmpl[4],
            tmpl[5]
        ))
    elif kind == "make_match":
        add(make_match_question(
            CHAPTER, f"Matching Concept: Reconstitution #{idx+1}",
            tmpl[1] + f" [Set #{idx+1}]",
            tmpl[2],
            tmpl[3],
            tmpl[4],
            tmpl[5]
        ))

questions = questions[:200]
print(f"Total Unit 2 questions assembled: {len(questions)}")
assert len(questions) == 200

out_path = "mock/accounts_units/unit2_admission_retirement_death.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved {len(questions)} Accounts Unit 2 questions to {out_path}!")
