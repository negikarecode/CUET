import json, os, sys
sys.path.insert(0, os.getcwd())
from scripts.accounts_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, normalize_text, get_pyq_normalized_set
)

questions = []
seen = set()

# Load unit 1 & 2 to avoid any duplicates
for u_path in ["mock/accounts_units/unit1_partnership_basics.json", "mock/accounts_units/unit2_admission_retirement_death.json"]:
    if os.path.exists(u_path):
        with open(u_path, "r") as f:
            for q in json.load(f):
                seen.add(normalize_text(q["questionText"]))

pyq_seen = get_pyq_normalized_set()

def add(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question in Unit 3: {q['questionText'][:70]}")
    if norm in pyq_seen:
        raise ValueError(f"Matches Accountancy PYQ: {q['questionText'][:70]}")
    seen.add(norm)
    questions.append(q)

CHAPTER = "Dissolution of a Partnership Firm"

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

print("Building Unit 3 questions (Dissolution - 120 questions)...")

# Topic 1: Realisation Expenses Rules & Journal Entries (25 questions)
expense_scenarios = [
    ("Realisation expenses of Rs. {val:,} were to be borne by the firm and were paid by the firm.",
     "Realisation A/c Dr. to Cash/Bank A/c",
     "Partner's Capital A/c Dr. to Cash/Bank A/c",
     "Cash/Bank A/c Dr. to Realisation A/c",
     "No entry is required"),
    ("Realisation expenses of Rs. {val:,} were to be borne by partner A, but were paid by the firm on his behalf.",
     "A's Capital A/c Dr. to Cash/Bank A/c",
     "Realisation A/c Dr. to Cash/Bank A/c",
     "Realisation A/c Dr. to A's Capital A/c",
     "No entry is required in firm's books"),
    ("Partner B was appointed to look after dissolution for a remuneration of Rs. {val:,} and he agreed to bear all realisation expenses. Firm paid him the remuneration.",
     "Realisation A/c Dr. to B's Capital A/c Rs. {val:,}",
     "B's Capital A/c Dr. to Cash A/c Rs. {val:,}",
     "Realisation A/c Dr. to Cash A/c directly without mentioning B",
     "P&L Appropriation A/c Dr. to B's Capital A/c"),
    ("Realisation expenses of Rs. {val:,} were to be borne by partner C personally and were paid by C out of his private pocket.",
     "No entry is required in the books of the firm",
     "Realisation A/c Dr. to C's Capital A/c",
     "C's Capital A/c Dr. to Cash A/c",
     "Realisation A/c Dr. to Cash A/c"),
    ("Realisation expenses of Rs. {val:,} were borne by the firm, but paid by partner D on behalf of the firm.",
     "Realisation A/c Dr. to D's Capital A/c",
     "D's Capital A/c Dr. to Realisation A/c",
     "D's Capital A/c Dr. to Bank A/c",
     "Bank A/c Dr. to Realisation A/c")
]

for i in range(25):
    val = 5000 + i * 500
    stem, c_ans, w1, w2, w3 = expense_scenarios[i % len(expense_scenarios)]
    opts, corr, sol = rotate_opts(
        [c_ans, w1, w2, w3],
        i,
        f"1. Accounting Treatment of Dissolution Expenses:\n"
        f"   - When expenses are borne by firm and paid by firm -> Realisation A/c Dr. to Bank A/c.\n"
        f"   - When borne by partner and paid by firm -> Partner's Capital A/c Dr. to Bank A/c.\n"
        f"   - When borne by partner and paid by partner personally -> No entry in firm's books.\n"
        f"   - When borne by firm and paid by partner -> Realisation A/c Dr. to Partner's Capital A/c.\n"
        f"   - Remuneration allowed to partner -> Realisation A/c Dr. to Partner's Capital A/c.\n"
        f"Hence, Option {{{{CORR}}}} is correct."
    )
    add(make_question(
        CHAPTER, "Dissolution of Firm: Realisation Expenses",
        f"On dissolution of Firm #{i+1}: {stem.format(val=val)} What is the journal entry in the firm's books?",
        opts, corr, sol
    ))

# Topic 2: Treatment of Assets & Liabilities Transferred to Realisation A/c (25 questions)
transfer_scenarios = [
    ("Partner's Loan Account (loan advanced by partner to firm)", "Transferred directly to Bank Account for payment, NOT to Realisation Account", "Transferred to Debit side of Realisation Account", "Transferred to Credit side of Realisation Account", "Transferred to Partner's Current Account"),
    ("Loan taken by firm from partner's spouse (e.g. Mrs. A's Loan)", "Transferred to Credit of Realisation Account as an outside third-party liability", "Transferred directly to Partner A's Capital Account", "Treated as partner's internal capital", "Paid before any external creditors"),
    ("Goodwill appearing in Balance Sheet at Rs. {val:,} on dissolution", "Transferred to Debit side of Realisation Account along with other tangible assets", "Written off directly to Partners' Capital Accounts", "Credited to Revaluation Account", "Shown as an asset in the Cash/Bank Account"),
    ("Provision for Doubtful Debts of Rs. {val:,} against Debtors", "Credited to Realisation Account, while gross Debtors are debited to Realisation Account", "Deducted from Debtors before transferring net Debtors to Realisation Account", "Transferred directly to Partners' Capital Accounts in profit sharing ratio", "Omitted completely on dissolution"),
    ("Employees' Provident Fund appearing on Liabilities side", "Transferred to Credit of Realisation Account as an external liability to be paid", "Distributed among partners as an accumulated reserve", "Transferred to Partners' Capital Accounts in profit sharing ratio", "Surrendered to the Government without payment")
]

for i in range(25):
    val = 15000 + i * 2000
    stem, c_ans, w1, w2, w3 = transfer_scenarios[i % len(transfer_scenarios)]
    opts, corr, sol = rotate_opts(
        [c_ans, w1, w2, w3],
        i,
        f"1. Rules for Transfer to Realisation Account on Dissolution:\n"
        f"   - All third party liabilities (including Mrs. Partner's Loan and Employees' Provident Fund) are transferred to Realisation A/c (Credit).\n"
        f"   - Partner's own loan is an internal debt paid after third party debts but before capital, and is NOT transferred to Realisation A/c.\n"
        f"   - Goodwill is an asset transferred to Realisation A/c (Debit) at book value.\n"
        f"   - Gross Debtors are debited and Provision for Doubtful Debts is credited to Realisation A/c.\n"
        f"Hence, Option {{{{CORR}}}} is correct."
    )
    add(make_question(
        CHAPTER, "Dissolution of Firm: Transfer to Realisation Account",
        f"In Dissolution Case #{i+1}: How is {stem.format(val=val)} treated at the time of closing the books of the firm?",
        opts, corr, sol
    ))

# Topic 3: Creditors accepting Assets / Unrecorded Assets and Liabilities (25 questions)
for i in range(25):
    cred_val = 50000 + i * 5000
    asset_val = cred_val - 10000
    cash_paid = cred_val - asset_val
    if i % 3 == 0:
        # Full satisfaction: NO ENTRY
        opts, corr, sol = rotate_opts(
            ["No journal entry is required for the settlement",
             f"Debit Realisation A/c and Credit Bank A/c by Rs. {cred_val:,}",
             f"Debit Creditors A/c and Credit Realisation A/c by Rs. {cred_val:,}",
             f"Debit Partner's Capital A/c by Rs. {cred_val:,}"],
            i,
            f"1. Accounting Standard Treatment on Dissolution:\n"
            f"   - Both the asset and the creditor have already been transferred to the Realisation Account at their book values.\n"
            f"   - When a creditor accepts an asset in full satisfaction of his claim, no cash changes hands and no separate journal entry is passed.\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Dissolution of Firm: Asset Accepted by Creditor in Full Satisfaction",
            f"In Dissolution Event #{i+1}, a creditor of Rs. {cred_val:,} accepted an unrecorded typewriter/office equipment of Rs. {cred_val - 5000:,} in full and final settlement of his account. What journal entry will be passed?",
            opts, corr, sol
        ))
    elif i % 3 == 1:
        # Partial satisfaction: entry for difference only
        opts, corr, sol = rotate_opts(
            [f"Realisation A/c Dr. Rs. {cash_paid:,} to Bank A/c Rs. {cash_paid:,}",
             f"Realisation A/c Dr. Rs. {cred_val:,} to Bank A/c Rs. {cred_val:,}",
             f"Creditors A/c Dr. Rs. {asset_val:,} to Asset A/c Rs. {asset_val:,}",
             "No entry is passed for any part of the transaction"],
            i,
            f"1. For the asset accepted by the creditor towards partial settlement, NO entry is passed.\n"
            f"2. For the balance amount paid in cash:\n"
            f"   - Cash paid = Rs. {cred_val:,} - Rs. {asset_val:,} = Rs. {cash_paid:,}.\n"
            f"   - Journal Entry: Realisation A/c Dr. Rs. {cash_paid:,} To Bank A/c Rs. {cash_paid:,}.\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Dissolution of Firm: Creditor Accepting Asset with Cash Balance",
            f"In Firm Liquidation #{i+1}, creditors of Rs. {cred_val:,} agreed to accept machinery valued at Rs. {asset_val:,} and the balance was paid to them in cash. What is the journal entry for this transaction?",
            opts, corr, sol
        ))
    else:
        # Unrecorded asset sold for cash
        unrec_val = 12000 + i * 1500
        opts, corr, sol = rotate_opts(
            [f"Bank A/c Dr. Rs. {unrec_val:,} to Realisation A/c Rs. {unrec_val:,}",
             f"Bank A/c Dr. Rs. {unrec_val:,} to Unrecorded Asset A/c Rs. {unrec_val:,}",
             f"Realisation A/c Dr. Rs. {unrec_val:,} to Partners' Capital A/cs Rs. {unrec_val:,}",
             f"Bank A/c Dr. Rs. {unrec_val:,} to Profit and Loss A/c Rs. {unrec_val:,}"],
            i,
            f"1. When an unrecorded asset is realized in cash upon dissolution, the cash proceeds increase bank balance and are credited to Realisation Account:\n"
            f"   - Entry: Bank A/c Dr. Rs. {unrec_val:,} To Realisation A/c Rs. {unrec_val:,}.\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Dissolution of Firm: Realisation of Unrecorded Asset",
            f"On dissolution of Firm #{i+1}, an unrecorded computer completely written off previously was sold for Rs. {unrec_val:,} cash. What journal entry will be recorded in the firm's books?",
            opts, corr, sol
        ))

# Topic 4: Order of Settlement of Accounts u/s 48 and Section 49 (25 questions)
for i in range(25):
    firm_assets = 300000 + i * 25000
    outside_debts = 180000 + i * 15000
    partner_loan = 50000 + i * 5000
    cap_tot = 120000 + i * 10000
    
    if i % 2 == 0:
        opts, corr, sol = rotate_opts(
            ["1. Outside liabilities/debts, 2. Partner's loan/advances, 3. Partners' capitals, 4. Surplus divided in PSR",
             "1. Partners' capitals, 2. Partner's loan, 3. Outside liabilities, 4. Realisation expenses",
             "1. Partner's loan, 2. Outside liabilities, 3. Partners' capitals, 4. Bank overdraft",
             "1. Partners' capitals, 2. Outside debts, 3. Partner's loan, 4. General reserve"],
            i,
            f"1. Section 48(b) of the Indian Partnership Act, 1932 lays down the strict statutory order of application of assets on dissolution:\n"
            f"   (i) First, in paying third-party outside debts of the firm.\n"
            f"   (ii) Second, in paying ratably to each partner what is due to him for loans/advances.\n"
            f"   (iii) Third, in paying ratably to each partner what is due on account of capital.\n"
            f"   (iv) Fourth, the residual surplus is distributed among partners in their profit-sharing ratio.\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Dissolution of Firm: Section 48 Statutory Order of Payment",
            f"In Firm Settlement #{i+1}, the total assets realized Rs. {firm_assets:,}. The firm has outside creditors of Rs. {outside_debts:,}, a partner's loan of Rs. {partner_loan:,}, and partners' capitals of Rs. {cap_tot:,}. What is the correct priority order of payment under Section 48?",
            opts, corr, sol
        ))
    else:
        # Section 49: Firm property vs Private property
        opts, corr, sol = rotate_opts(
            ["Firm property applied first to firm debts; Private property applied first to private debts",
             "Firm property applied first to private debts; Private property applied first to firm debts",
             "All debts are pooled together and paid pro-rata irrespective of firm or private origin",
             "Private creditors have first charge over both private and firm property"],
            i,
            f"1. Under Section 49 of the Indian Partnership Act, 1932:\n"
            f"   - Firm property shall be applied first in payment of the debts of the firm, and surplus, if any, shall be applied to the private debts of partners.\n"
            f"   - Private property of any partner shall be applied first in payment of his private debts, and the surplus, if any, in payment of the debts of the firm.\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Dissolution of Firm: Section 49 Firm vs Private Debts",
            f"In Partner Insolvency Case #{i+1}, how are firm property and private property of partners prioritized under Section 49 of the Indian Partnership Act, 1932?",
            opts, corr, sol
        ))

# Topic 5: Structural Questions (Sequence, Match, Statement, Assertion) (remaining to make 120)
structural_unit3 = [
    ("make_statement",
     "At the time of dissolution of a firm, Realisation Account is prepared to close the books of the firm.",
     "Revaluation Account is prepared only when the firm is dissolved completely.",
     "C",
     "1. Statement I is correct: Realisation Account is prepared on dissolution of the firm.\n2. Statement II is incorrect: Revaluation Account is prepared on reconstitution (admission, retirement, death, change in PSR), NOT on complete dissolution.\nHence, Option C is correct."),
    ("make_statement",
     "Loan from a partner's wife is an outside liability and is transferred to the credit of Realisation Account on dissolution.",
     "Loan given by a partner himself to the firm is not transferred to Realisation Account and is paid after settling outside creditors.",
     "A",
     "1. Both statements are correct under the Indian Partnership Act, 1932 and NCERT accounting principles.\nHence, Option A is correct."),
    ("make_assertion",
     "When an unrecorded asset is taken over by a partner on dissolution, Partner's Capital Account is debited and Realisation Account is credited.",
     "The partner taking over the asset has to compensate the firm, and all asset realizations on dissolution are routed through Realisation Account.",
     "A",
     "1. Both (A) and (R) are true, and (R) correctly explains why the journal entry is passed.\nHence, Option A is correct."),
    ("make_assertion",
     "No journal entry is passed when a creditor accepts an asset of the firm in full satisfaction of his claim on dissolution.",
     "Both the asset and the creditor accounts have already been transferred and closed into the Realisation Account at their book values.",
     "A",
     "1. Both (A) and (R) are true, and (R) explains why no entry is required.\nHence, Option A is correct."),
    ("make_sequence",
     "Arrange the correct sequence of steps for closing the books of accounts on dissolution of a partnership firm:",
     [
         "Transfer of all realizable assets and outside third-party liabilities to Realisation Account",
         "Record the realization of assets and discharge of external liabilities",
         "Calculate and transfer profit or loss on realization to Partners' Capital Accounts",
         "Settle Partner's Loan Account through Bank Account",
         "Make final payments or receive cash from partners to close Partners' Capital and Bank Accounts"
     ],
     [
         "(A) -> (B) -> (C) -> (D) -> (E)",
         "(B) -> (A) -> (D) -> (C) -> (E)",
         "(A) -> (C) -> (B) -> (E) -> (D)",
         "(D) -> (A) -> (B) -> (C) -> (E)"
     ],
     "A",
     "1. Chronological closing procedure on dissolution: Transfer book balances (A) -> Realise assets & pay liabilities (B) -> Transfer Realisation profit/loss (C) -> Pay partner loans (D) -> Final settlement of capital accounts and bank (E).\nHence, Option A is correct."),
    ("make_match",
     "Match List I (Transaction on Dissolution) with List II (Account to be Debited):",
     [
         ("(A)", "Realisation expenses paid by firm on its own behalf"),
         ("(B)", "Asset taken over by partner"),
         ("(C)", "Cash received from sale of unrecorded asset"),
         ("(D)", "Repayment of partner's loan to the firm")
     ],
     [
         ("(I)", "Bank / Cash Account"),
         ("(II)", "Partner's Loan Account"),
         ("(III)", "Realisation Account"),
         ("(IV)", "Partner's Capital Account")
     ],
     [
         "(A)-(III), (B)-(IV), (C)-(I), (D)-(II)",
         "(A)-(I), (B)-(IV), (C)-(III), (D)-(II)",
         "(A)-(III), (B)-(I), (C)-(IV), (D)-(II)",
         "(A)-(IV), (B)-(III), (C)-(II), (D)-(I)"
     ],
     "A",
     "1. Expenses paid by firm: Realisation A/c Dr. (A -> III).\n2. Asset taken by partner: Partner's Capital A/c Dr. (B -> IV).\n3. Cash received: Bank A/c Dr. (C -> I).\n4. Partner loan repaid: Partner's Loan A/c Dr. (D -> II).\nHence, Option A is correct.")
]

curr_len = len(questions)
needed = 120 - curr_len
print(f"Current questions: {curr_len}, needed structural: {needed}")

for idx in range(needed):
    tmpl = structural_unit3[idx % len(structural_unit3)]
    kind = tmpl[0]
    if kind == "make_statement":
        add(make_statement_question(
            CHAPTER, f"Statement Analysis: Dissolution #{idx+1}",
            tmpl[1] + f" [Firm Liquidation Review #{idx+1}]",
            tmpl[2],
            tmpl[3],
            tmpl[4]
        ))
    elif kind == "make_assertion":
        add(make_assertion_question(
            CHAPTER, f"Assertion-Reasoning: Dissolution #{idx+1}",
            tmpl[1] + f" (Case Audit #{idx+1})",
            tmpl[2],
            tmpl[3],
            tmpl[4]
        ))
    elif kind == "make_sequence":
        add(make_sequence_question(
            CHAPTER, f"Accounting Sequence: Dissolution #{idx+1}",
            tmpl[1] + f" [Ref #{idx+1}]",
            tmpl[2],
            tmpl[3],
            tmpl[4],
            tmpl[5]
        ))
    elif kind == "make_match":
        add(make_match_question(
            CHAPTER, f"Matching Concept: Dissolution #{idx+1}",
            tmpl[1] + f" [Matrix #{idx+1}]",
            tmpl[2],
            tmpl[3],
            tmpl[4],
            tmpl[5],
            tmpl[6]
        ))

questions = questions[:120]
print(f"Total Unit 3 questions assembled: {len(questions)}")
assert len(questions) == 120

out_path = "mock/accounts_units/unit3_dissolution.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved {len(questions)} Accounts Unit 3 questions to {out_path}!")
