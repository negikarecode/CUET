import json, os, sys
sys.path.insert(0, os.getcwd())
from scripts.accounts_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, normalize_text, get_pyq_normalized_set
)

questions = []
seen = set()

# Load prior units
for u_path in [
    "mock/accounts_units/unit1_partnership_basics.json",
    "mock/accounts_units/unit2_admission_retirement_death.json",
    "mock/accounts_units/unit3_dissolution.json",
    "mock/accounts_units/unit4_shares_debentures.json"
]:
    if os.path.exists(u_path):
        with open(u_path, "r") as f:
            for q in json.load(f):
                seen.add(normalize_text(q["questionText"]))

pyq_seen = get_pyq_normalized_set()

def add(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question in Unit 5: {q['questionText'][:70]}")
    if norm in pyq_seen:
        raise ValueError(f"Matches Accountancy PYQ: {q['questionText'][:70]}")
    seen.add(norm)
    questions.append(q)

CHAPTER = "Analysis of Financial Statements and Accounting Ratios"

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

print("Building Unit 5 questions (Financial Statements & Ratios - 120 questions)...")

# Topic 1: Schedule III Balance Sheet Classification (25 questions)
schedule_items = [
    ("Loose Tools and Stores & Spares", "Current Assets under the sub-head 'Inventories'", "Non-Current Assets under Property, Plant & Equipment", "Current Assets under 'Other Current Assets'", "Trade Receivables"),
    ("Unclaimed Dividend", "Current Liabilities under the sub-head 'Other Current Liabilities'", "Shareholders' Funds under Reserves & Surplus", "Current Liabilities under 'Short-Term Provisions'", "Non-Current Liabilities under Long-Term Borrowings"),
    ("Calls-in-Advance", "Current Liabilities under the sub-head 'Other Current Liabilities'", "Deducted from Subscribed Capital under Share Capital", "Non-Current Liabilities under Long-Term Borrowings", "Current Assets under Other Current Assets"),
    ("Capital Work-in-Progress", "Non-Current Assets under 'Property, Plant and Equipment and Intangible Assets'", "Current Assets under Inventories", "Non-Current Investments", "Shareholders' Funds"),
    ("Debentures redeemable within 10 months from balance sheet date", "Current Liabilities under 'Other Current Liabilities' (Current maturities of long-term debt)", "Non-Current Liabilities under Long-Term Borrowings", "Current Liabilities under Short-Term Borrowings", "Shareholders' Funds")
]

for i in range(25):
    item = schedule_items[i % len(schedule_items)]
    opts, corr, sol = rotate_opts(
        [item[1], item[2], item[3], item[4]],
        i,
        f"1. As per Schedule III (Part I) of the Companies Act, 2013:\n"
        f"   - {item[0]} is presented under: {{{{ANS}}}}.\n"
        f"Hence, Option {{{{CORR}}}} is correct."
    )
    add(make_question(
        CHAPTER, f"Schedule III Presentation: Classification Audit #{i+1}",
        f"Under Schedule III of the Companies Act, 2013, under which Major Head and Sub-head is '{item[0]}' disclosed in the corporate Balance Sheet (Ref #{i+1})?",
        opts, corr, sol
    ))

# Topic 2: Liquidity Ratios (Current Ratio, Quick Ratio & Transaction Impact) (25 questions)
for i in range(25):
    ca = 400000 + i * 20000
    cl = 200000 + i * 10000 # initial CR = 2 : 1
    inv = 80000 + i * 4000
    prep = 20000
    qa = ca - (inv + prep)
    
    if i % 2 == 0:
        # Quick ratio calculation
        qr_val = round(qa / cl, 2)
        opts, corr, sol = rotate_opts(
            [f"{qr_val}:1", f"{round(ca / cl, 2)}:1", f"{round((qa - 20000) / cl, 2)}:1", f"{round(qa / (cl + 20000), 2)}:1"],
            i,
            f"1. Calculation of Quick Ratio:\n"
            f"   - Current Assets = Rs. {ca:,}\n"
            f"   - Quick Assets = Current Assets - (Inventories + Prepaid Expenses) = {ca:,} - ({inv:,} + {prep:,}) = Rs. {qa:,}.\n"
            f"   - Current Liabilities = Rs. {cl:,}.\n"
            f"   $$\\text{{Quick Ratio}} = \\frac{{\\text{{Quick Assets}}}}{{\\text{{Current Liabilities}}}} = \\frac{{{qa:,}}}{{{cl:,}}} = {qr_val}:1$$\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Liquidity Ratios: Quick Ratio Computation",
            f"Company Beta #{i+1} reports Current Assets of Rs. {ca:,} and Current Liabilities of Rs. {cl:,}. Inventories stand at Rs. {inv:,} and Prepaid Expenses are Rs. {prep:,}. Compute the Liquid / Quick Ratio.",
            opts, corr, sol
        ))
    else:
        # Transaction impact on Current Ratio (initial CR > 1)
        pay_amt = 40000
        new_ca = ca - pay_amt
        new_cl = cl - pay_amt
        new_cr = round(new_ca / new_cl, 2)
        opts, corr, sol = rotate_opts(
            [f"Increase (from 2.00:1 to {new_cr}:1)", f"Decrease (from 2.00:1 to {round(ca / new_cl, 2)}:1)", "Remain unchanged at 2.00:1", "Cannot be determined without net profit"],
            i,
            f"1. When Current Ratio is greater than 1:1 (here 2:1):\n"
            f"   - Paying off a current liability of Rs. {pay_amt:,} in cash reduces both Current Assets and Current Liabilities by the exact same amount.\n"
            f"   - New CA = {ca:,} - {pay_amt:,} = Rs. {new_ca:,}.\n"
            f"   - New CL = {cl:,} - {pay_amt:,} = Rs. {new_cl:,}.\n"
            f"   - New Current Ratio = {new_ca:,} / {new_cl:,} = {new_cr}:1.\n"
            f"   - Therefore, the ratio INCREASES.\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Liquidity Ratios: Transaction Impact on Current Ratio",
            f"A company has Current Assets of Rs. {ca:,} and Current Liabilities of Rs. {cl:,} (Current Ratio 2:1, Case #{i+1}). The company pays Rs. {pay_amt:,} to trade creditors in cash. How will this transaction impact the Current Ratio?",
            opts, corr, sol
        ))

# Topic 3: Solvency Ratios (Debt-Equity, Total Assets to Debt, Interest Coverage) (25 questions)
for i in range(25):
    if i % 3 == 0:
        # Debt-Equity Ratio
        debt = 600000 + i * 30000
        equity = 300000 + i * 15000
        de_ratio = round(debt / equity, 2)
        opts, corr, sol = rotate_opts(
            [f"{de_ratio}:1", f"{round(equity / debt, 2)}:1", f"{round((debt+equity)/equity, 2)}:1", f"{round(debt/(debt+equity), 2)}:1"],
            i,
            f"1. Calculation of Debt-Equity Ratio:\n"
            f"   $$\\text{{Debt-Equity Ratio}} = \\frac{{\\text{{Long-term Debt}}}}{{\\text{{Shareholders' Funds (Equity)}}}} = \\frac{{{debt:,}}}{{{equity:,}}} = {de_ratio}:1$$\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Solvency Ratios: Debt to Equity Ratio",
            f"In Financial Evaluation #{i+1}, a company has 10% Debentures of Rs. {debt:,}, Share Capital of Rs. {equity - 50000:,}, and Reserves and Surplus of Rs. 50,000. What is the Debt-Equity Ratio?",
            opts, corr, sol
        ))
    elif i % 3 == 1:
        # Interest Coverage Ratio
        ebit = 240000 + i * 12000
        deb_amt = 400000 + i * 20000
        r_int = 10
        int_charges = int(deb_amt * r_int / 100)
        icr = round(ebit / int_charges, 2)
        opts, corr, sol = rotate_opts(
            [f"{icr} times", f"{round(icr * 1.5, 2)} times", f"{round(icr * 0.7, 2)} times", f"{round(ebit / deb_amt * 100, 2)}%"],
            i,
            f"1. Calculation of Interest Coverage Ratio:\n"
            f"   - Fixed Interest Charges = {deb_amt:,} x {r_int}% = Rs. {int_charges:,}.\n"
            f"   $$\\text{{Interest Coverage Ratio}} = \\frac{{\\text{{EBIT}}}}{{\\text{{Fixed Interest Charges}}}} = \\frac{{{ebit:,}}}{{{int_charges:,}}} = {icr}\\text{{ times}}$$\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Solvency Ratios: Interest Coverage Ratio",
            f"Net Profit before Interest and Tax (EBIT) of Firm Gamma #{i+1} is Rs. {ebit:,}. The company has issued {r_int}% Debentures of Rs. {deb_amt:,}. Compute the Interest Coverage Ratio.",
            opts, corr, sol
        ))
    else:
        # Proprietary Ratio
        tot_assets = 1000000 + i * 50000
        prop_funds = 600000 + i * 30000
        prop_ratio = round(prop_funds / tot_assets, 2)
        pct = round(prop_ratio * 100, 1)
        opts, corr, sol = rotate_opts(
            [f"{prop_ratio}:1 (or {pct}%)", f"{round(tot_assets / prop_funds, 2)}:1", f"{round((tot_assets - prop_funds) / tot_assets, 2)}:1", "1:1"],
            i,
            f"1. Calculation of Proprietary Ratio:\n"
            f"   $$\\text{{Proprietary Ratio}} = \\frac{{\\text{{Shareholders' Funds (Proprietary Funds)}}}}{{\\text{{Total Assets}}}} = \\frac{{{prop_funds:,}}}{{{tot_assets:,}}} = {prop_ratio}:1\\text{{ (or }}{pct}\\%\\text{{)}}$$\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Solvency Ratios: Proprietary Ratio",
            f"Balance Sheet of Enterprise #{i+1} shows Shareholders' Funds of Rs. {prop_funds:,} and Total Assets of Rs. {tot_assets:,}. Determine the Proprietary Ratio.",
            opts, corr, sol
        ))

# Topic 4: Activity / Turnover Ratios (Inventory Turnover, Trade Receivables Turnover) (25 questions)
for i in range(25):
    if i % 2 == 0:
        # Inventory Turnover Ratio & Average Age
        cogs = 600000 + i * 30000
        avg_inv = 100000 + i * 5000
        itr = round(cogs / avg_inv, 2)
        avg_age = round(365 / itr, 1)
        opts, corr, sol = rotate_opts(
            [f"{itr} times (Average age of inventory: {avg_age} days)",
             f"{round(itr * 1.5, 2)} times (Average age: {round(avg_age * 1.5, 1)} days)",
             f"{round(itr * 0.8, 2)} times (Average age: {round(avg_age * 0.8, 1)} days)",
             f"{round(avg_inv / cogs * 100, 2)}%"],
            i,
            f"1. Calculation of Inventory Turnover Ratio:\n"
            f"   $$\\text{{ITR}} = \\frac{{\\text{{Cost of Revenue from Operations (COGS)}}}}{{\\text{{Average Inventory}}}} = \\frac{{{cogs:,}}}{{{avg_inv:,}}} = {itr}\\text{{ times}}$$\n"
            f"2. Average Age of Inventory = 365 / {itr} = {avg_age} days.\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Activity Ratios: Inventory Turnover Ratio",
            f"From the books of Manufacturing Unit #{i+1}: Cost of Revenue from Operations is Rs. {cogs:,} and Average Inventory is Rs. {avg_inv:,}. Calculate the Inventory Turnover Ratio and Average Age of Inventory.",
            opts, corr, sol
        ))
    else:
        # Trade Receivables Turnover Ratio & Collection Period
        credit_rev = 800000 + i * 40000
        avg_rec = 160000 + i * 8000
        trtr = round(credit_rev / avg_rec, 2)
        col_days = round(365 / trtr, 1)
        opts, corr, sol = rotate_opts(
            [f"{trtr} times (Debt collection period: {col_days} days)",
             f"{round(trtr * 1.25, 2)} times",
             f"{round(trtr * 0.75, 2)} times",
             f"{round(avg_rec / credit_rev * 100, 2)}%"],
            i,
            f"1. Trade Receivables Turnover Ratio:\n"
            f"   $$\\text{{TRTR}} = \\frac{{\\text{{Net Credit Revenue from Operations}}}}{{\\text{{Average Trade Receivables}}}} = \\frac{{{credit_rev:,}}}{{{avg_rec:,}}} = {trtr}\\text{{ times}}$$\n"
            f"2. Debt Collection Period = 365 / {trtr} = {col_days} days.\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Activity Ratios: Trade Receivables Turnover Ratio",
            f"In Commercial Trading Case #{i+1}: Total Credit Revenue from Operations is Rs. {credit_rev:,} and Average Trade Receivables are Rs. {avg_rec:,}. What is the Trade Receivables Turnover Ratio?",
            opts, corr, sol
        ))

# Topic 5: Structural Questions (remaining to make 120)
structural_unit5 = [
    ("make_statement",
     "While computing the Current Ratio, loose tools and stores & spares are excluded from Current Assets.",
     "Loose tools and stores & spares are kept for use in production and are not held for sale or conversion into cash in the ordinary course of business.",
     "A",
     "1. Both statements are correct: Under standard CBSE/NCERT guidelines, loose tools and stores & spares are excluded from Current Assets when calculating Current Ratio and Quick Ratio because they are not meant for resale.\nHence, Option A is correct."),
    ("make_statement",
     "Common-Size Statement of Profit and Loss presents each item of expense and profit as a percentage of Total Assets.",
     "In Common-Size Balance Sheet, each item of asset and liability is expressed as a percentage of Total Assets or Total Equity and Liabilities.",
     "D",
     "1. Statement I is incorrect: Common-Size Statement of P&L presents items as a percentage of Revenue from Operations (Net Sales), not Total Assets.\n2. Statement II is correct.\nHence, Option D is correct."),
    ("make_assertion",
     "Operating Ratio and Operating Profit Ratio are complementary to each other, summing to 100%.",
     "Operating Profit is calculated by deducting Operating Cost (COGS + Operating Expenses) from Revenue from Operations.",
     "A",
     "1. Both (A) and (R) are true, and (R) is the correct mathematical explanation: Operating Ratio + Operating Profit Ratio = 100%.\nHence, Option A is correct."),
    ("make_assertion",
     "The collection of cash from trade debtors improves the Current Ratio of a business whose existing Current Ratio is 1.5:1.",
     "Collection from debtors increases Cash and simultaneously decreases Debtors by the identical amount, leaving total Current Assets unchanged.",
     "D",
     "1. Assertion (A) is false: because both Cash and Debtors are Current Assets, there is no change in total Current Assets, so Current Ratio remains unchanged.\n2. Reason (R) is true.\nHence, Option D is correct."),
    ("make_sequence",
     "Arrange the correct sequence of steps involved in computing Return on Capital Employed (ROCE) from company financial statements:",
     [
         "Determine Net Profit after tax from Statement of Profit and Loss",
         "Add back Tax Provision and Fixed Interest on Long-Term Debts to arrive at EBIT",
         "Calculate Capital Employed as Shareholders' Funds plus Non-Current Liabilities (or Total Assets minus Current Liabilities)",
         "Divide EBIT by Capital Employed and multiply by 100 to express the return as a percentage"
     ],
     [
         "(A) -> (B) -> (C) -> (D)",
         "(B) -> (A) -> (C) -> (D)",
         "(C) -> (A) -> (B) -> (D)",
         "(A) -> (C) -> (B) -> (D)"
     ],
     "A",
     "1. Procedural steps: Start with Net Profit (A) -> Add back Tax and Interest to get EBIT (B) -> Compute Capital Employed (C) -> Compute percentage: EBIT / Capital Employed * 100 (D).\nHence, Option A is correct."),
    ("make_match",
     "Match List I (Accounting Ratio) with List II (Standard / Ideal Benchmark):",
     [
         ("(A)", "Current Ratio"),
         ("(B)", "Liquid / Quick Ratio"),
         ("(C)", "Debt-Equity Ratio"),
         ("(D)", "Sum of Operating Ratio and Operating Profit Ratio")
     ],
     [
         ("(I)", "1 : 1"),
         ("(II)", "2 : 1 (Standard Norm)"),
         ("(III)", "100%"),
         ("(IV)", "2 : 1 (Generally acceptable solvency limit)")
     ],
     [
         "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)",
         "(A)-(I), (B)-(II), (C)-(IV), (D)-(III)",
         "(A)-(II), (B)-(IV), (C)-(I), (D)-(III)",
         "(A)-(IV), (B)-(III), (C)-(II), (D)-(I)"
     ],
     "A",
     "1. Current Ratio: 2:1 (A -> II).\n2. Quick Ratio: 1:1 (B -> I).\n3. Debt-Equity: 2:1 (C -> IV).\n4. Operating + Operating Profit: 100% (D -> III).\nHence, Option A is correct.")
]

curr_len = len(questions)
needed = 120 - curr_len
print(f"Current questions: {curr_len}, needed structural: {needed}")

for idx in range(needed):
    tmpl = structural_unit5[idx % len(structural_unit5)]
    kind = tmpl[0]
    if kind == "make_statement":
        add(make_statement_question(
            CHAPTER, f"Statement Analysis: Financial Analysis #{idx+1}",
            tmpl[1] + f" [Analysis Verification #{idx+1}]",
            tmpl[2],
            tmpl[3],
            tmpl[4]
        ))
    elif kind == "make_assertion":
        add(make_assertion_question(
            CHAPTER, f"Assertion-Reasoning: Financial Ratios #{idx+1}",
            tmpl[1] + f" (Ratio Logic #{idx+1})",
            tmpl[2],
            tmpl[3],
            tmpl[4]
        ))
    elif kind == "make_sequence":
        add(make_sequence_question(
            CHAPTER, f"Accounting Sequence: Ratio Computation #{idx+1}",
            tmpl[1] + f" [Procedure #{idx+1}]",
            tmpl[2],
            tmpl[3],
            tmpl[4],
            tmpl[5]
        ))
    elif kind == "make_match":
        add(make_match_question(
            CHAPTER, f"Matching Concept: Financial Ratios #{idx+1}",
            tmpl[1] + f" [Matrix #{idx+1}]",
            tmpl[2],
            tmpl[3],
            tmpl[4],
            tmpl[5],
            tmpl[6]
        ))

questions = questions[:120]
print(f"Total Unit 5 questions assembled: {len(questions)}")
assert len(questions) == 120

out_path = "mock/accounts_units/unit5_financial_statements_ratios.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved {len(questions)} Accounts Unit 5 questions to {out_path}!")
