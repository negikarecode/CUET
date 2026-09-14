import json, os, sys
sys.path.insert(0, os.getcwd())
from scripts.accounts_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, normalize_text, get_pyq_normalized_set
)

questions = []
seen = set()
pyq_seen = get_pyq_normalized_set()

def add(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:70]}")
    if norm in pyq_seen:
        raise ValueError(f"Matches Accountancy PYQ: {q['questionText'][:70]}")
    seen.add(norm)
    questions.append(q)

CHAPTER = "Accounting for Partnership: Basic Concepts"

# We will create 200 genuinely distinct questions for Section 1 (Partnership Fundamentals & Goodwill Valuation)
# Each of the 20 mocks will get 10 distinct questions covering 10 distinct topics!

# --- Mock 1 Section 1 Questions (Q1-Q10) ---
add(make_question(
    CHAPTER, "Nature of Partnership: Mutual Agency",
    "Which of the following is considered the 'cardinal principle' and true test of the existence of a partnership according to Section 4 of the Indian Partnership Act, 1932?",
    ["Mutual agency among all partners (business carried on by all or any of them acting for all)",
     "Sharing of profits and losses equally",
     "Equal capital contribution by all partners",
     "Execution of a registered written partnership deed"],
    "A",
    "1. According to Section 4 of the Indian Partnership Act, 1932, partnership is the relation between persons who have agreed to share the profits of a business carried on by all or any of them acting for all.\n2. Mutual agency—where every partner is both an agent and a principal—is the definitive test of partnership.\nHence, Option A is correct."
))

add(make_question(
    CHAPTER, "Provisions in Absence of Deed: Loan vs Capital",
    "Kavita and Sunita are partners. Kavita provided a loan of Rs. 2,00,000 to the firm in addition to her capital. In the absence of a partnership deed, what interest is Kavita entitled to on her capital and on her loan respectively?",
    ["Nil on capital, and 6% per annum on loan",
     "6% per annum on capital, and 6% per annum on loan",
     "Nil on capital, and Nil on loan",
     "6% per annum on capital, and 12% per annum on loan"],
    "A",
    "1. Under Section 13 of the Indian Partnership Act, 1932:\n   - In the absence of an agreement, no interest on capital is allowed.\n   - A partner is entitled to interest @ 6% p.a. on any loan or advance made beyond capital.\nHence, Option A is correct."
))

add(make_question(
    CHAPTER, "Charges vs Appropriations: Rent to Partner",
    "Prem, a partner in a firm, has let out his personal commercial property to the firm at an agreed monthly rent of Rs. 15,000. How should this rent be treated in the firm's financial statements?",
    ["Debited to Profit and Loss Account as a charge against profits",
     "Debited to Profit and Loss Appropriation Account as an appropriation of profit",
     "Credited directly to Prem's Capital Account through Profit and Loss Appropriation Account",
     "Deducted from the firm's General Reserve at year end"],
    "A",
    "1. Rent payable to a partner for using his personal premises is an expense incurred for conducting the business.\n2. It is a charge against profits and must be paid irrespective of profit or loss, so it is debited to the Profit and Loss Account.\nHence, Option A is correct."
))

add(make_question(
    CHAPTER, "Interest on Drawings: Product Method",
    "A partner withdrew the following sums during the financial year: 1st May: Rs. 12,000; 31st July: Rs. 6,000; 30th September: Rs. 9,000; 30th November: Rs. 12,000; 1st January: Rs. 8,000; 31st March: Rs. 4,000. If interest on drawings is charged @ 9% p.a., what is the total interest using the Product Method?",
    ["Rs. 2,295", "Rs. 2,040", "Rs. 2,550", "Rs. 1,800"],
    "A",
    "1. Calculation using Product Method (months up to 31st March):\n   - May 1: 12,000 x 11 = 1,32,000\n   - July 31: 6,000 x 8 = 48,000\n   - Sept 30: 9,000 x 6 = 54,000\n   - Nov 30: 12,000 x 4 = 48,000\n   - Jan 1: 8,000 x 3 = 24,000\n   - Mar 31: 4,000 x 0 = 0\n2. Sum of Products = 1,32,000 + 48,000 + 54,000 + 48,000 + 24,000 = Rs. 3,06,000.\n3. Interest = Sum of Products x (Rate / 100) x (1 / 12) = 3,06,000 x (9 / 100) x (1 / 12) = Rs. 2,295.\nHence, Option A is correct."
))

add(make_question(
    CHAPTER, "Capital Accounts: Calculation of Opening Capital",
    "On 31st March 2024, the capital of partner Raman after adjustments for drawings (Rs. 40,000) and share of net profit (Rs. 60,000) stood at Rs. 3,80,000. During the year, Raman had introduced additional capital of Rs. 50,000 on 1st October 2023. What was Raman's opening capital on 1st April 2023?",
    ["Rs. 3,10,000", "Rs. 3,50,000", "Rs. 4,10,000", "Rs. 2,70,000"],
    "A",
    "1. Calculation of Opening Capital (Fluctuating method):\n   $$\\text{Opening Capital} = \\text{Closing Capital} + \\text{Drawings} - \\text{Additional Capital} - \\text{Share of Profit}$$\n2. Opening Capital = 3,80,000 + 40,000 - 50,000 - 60,000 = Rs. 3,10,000.\nHence, Option A is correct."
))

add(make_question(
    CHAPTER, "Partner's Commission: After Charging Such Commission",
    "The net profit of a partnership firm before charging any commission is Rs. 3,30,000. Partner Anuj is entitled to a commission of 10% on the net profit after charging his commission. What is the amount of commission payable to Anuj?",
    ["Rs. 30,000", "Rs. 33,000", "Rs. 29,700", "Rs. 36,300"],
    "A",
    "1. When commission is payable on profit after charging such commission:\n   $$\\text{Commission} = \\text{Net Profit} \\times \\frac{\\text{Rate}}{100 + \\text{Rate}} = 3,30,000 \\times \\frac{10}{110} = \\text{Rs. } 30,000$$\nHence, Option A is correct."
))

add(make_question(
    CHAPTER, "Goodwill Valuation: Weighted Average Profit Method",
    "The profits of a business for the last 3 years were: Year 1: Rs. 40,000; Year 2: Rs. 50,000; Year 3: Rs. 60,000. Calculate the value of goodwill based on 2 years' purchase of weighted average profits, using weights 1, 2, and 3 respectively for Year 1, Year 2, and Year 3.",
    ["Rs. 1,06,667", "Rs. 1,00,000", "Rs. 95,000", "Rs. 1,12,000"],
    "A",
    "1. Weighted profit calculation:\n   - Year 1: 40,000 x 1 = 40,000\n   - Year 2: 50,000 x 2 = 1,00,000\n   - Year 3: 60,000 x 3 = 1,80,000\n2. Total weighted profits = 40,000 + 1,00,000 + 1,80,000 = Rs. 3,20,000.\n3. Total weights = 1 + 2 + 3 = 6.\n4. Weighted Average Profit = 3,20,000 / 6 = Rs. 53,333.33.\n5. Goodwill = 53,333.33 x 2 = Rs. 1,06,667.\nHence, Option A is correct."
))

add(make_question(
    CHAPTER, "Goodwill Valuation: Capitalisation of Average Profit",
    "A firm earned an average profit of Rs. 1,50,000 during the past few years. The normal rate of return in similar businesses is 12%. The total assets of the firm are Rs. 14,00,000 (excluding fictitious assets) and outside liabilities are Rs. 4,00,000. What is the value of goodwill by the Capitalisation of Average Profit method?",
    ["Rs. 2,50,000", "Rs. 1,50,000", "Rs. 3,00,000", "Rs. 2,00,000"],
    "A",
    "1. Capitalised Value of Business = (Average Profit / NRR) x 100 = (1,50,000 / 12) x 100 = Rs. 12,50,000.\n2. Net Assets (Capital Employed) = Total Assets - Outside Liabilities = 14,00,000 - 4,00,000 = Rs. 10,00,000.\n3. Goodwill = Capitalised Value - Net Assets = 12,50,000 - 10,00,000 = Rs. 2,50,000.\nHence, Option A is correct."
))

add(make_statement_question(
    CHAPTER, "Legal Provisions: Maximum Partners & Banking",
    "According to Section 464 of the Companies Act, 2013, the Central Government can prescribe the maximum number of partners in a partnership firm up to 100.",
    "Rule 10 of the Companies (Miscellaneous) Rules, 2014 has prescribed the current maximum limit of partners as 50.",
    "A",
    "1. Statement I is correct: Section 464 of the Companies Act, 2013 empowers the Central Government to prescribe a limit up to 100 partners.\n2. Statement II is correct: Under Rule 10 of the Companies (Miscellaneous) Rules, 2014, the prescribed limit is currently 50 partners.\nHence, Option A is correct."
))

add(make_match_question(
    CHAPTER, "Partnership Accounts: Ledger Accounts & Transaction Nature",
    "Match List I (Accounting Item) with List II (Appropriate Account for Recording):",
    [
        ("(A)", "Salary allowed to a partner under Fixed Capital method"),
        ("(B)", "Interest on partner's loan to the firm"),
        ("(C)", "Additional capital introduced in cash under Fixed Capital method"),
        ("(D)", "Drawings against capital by a partner")
    ],
    [
        ("(I)", "Profit and Loss Account (Debit)"),
        ("(II)", "Partner's Current Account (Credit)"),
        ("(III)", "Partner's Capital Account (Debit)"),
        ("(IV)", "Partner's Capital Account (Credit)")
    ],
    [
        "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)",
        "(A)-(I), (B)-(II), (C)-(IV), (D)-(III)",
        "(A)-(II), (B)-(IV), (C)-(I), (D)-(III)",
        "(A)-(IV), (B)-(I), (C)-(II), (D)-(III)"
    ],
    "A",
    "1. Salary under fixed method: Partner's Current A/c Cr. (A -> II).\n2. Loan interest: P&L Account Dr. (B -> I).\n3. Additional capital: Partner's Capital A/c Cr. (C -> IV).\n4. Drawings against capital: Partner's Capital A/c Dr. (D -> III).\nHence, Option A is correct."
))

# We will generate remaining questions for Section 1 (Q11 to Q200) ensuring:
# - Rich, realistic wording
# - Zero duplicate normalized text
# - Zero PYQ collisions
# - Broad curriculum coverage (Past adjustments, Guarantee, AS-26, IOC inadequate, Loss IOC, IOD various months/quarters)

print("Generated first 10 questions of Section 1...")
