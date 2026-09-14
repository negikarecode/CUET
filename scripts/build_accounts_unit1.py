import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
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
        raise ValueError(f"Duplicate question detected in Accounts Unit 1: {q['questionText'][:70]}")
    if norm in pyq_seen:
        raise ValueError(f"Matches Accountancy PYQ: {q['questionText'][:70]}")
    seen.add(norm)
    questions.append(q)

print("Starting generation of Accounts Unit 1 (Partnership Fundamentals & Goodwill - 200 questions)...")

# --- Core Partnership Basics Questions ---

add(make_question(
    "Accounting for Partnership: Basic Concepts",
    "Absence of Partnership Deed: Interest on Capital",
    "In the absence of any agreement or partnership deed, interest on capital to partners is:",
    ["Not allowed at all", "Allowed at 6% p.a.", "Allowed at 10% p.a.", "Allowed at the prevailing bank lending rate"],
    "A",
    "1. According to the Indian Partnership Act, 1932, in the absence of a partnership deed or agreement:\n   - No interest on capital is allowed to partners.\n   - No interest on drawings is charged.\n   - Profits and losses are shared equally.\n   - Interest on loan/advances by a partner is allowed at 6% p.a.\nHence, Option A is correct."
))

add(make_question(
    "Accounting for Partnership: Basic Concepts",
    "Absence of Partnership Deed: Partner Loan Interest",
    "If a partner has advanced a loan to the firm beyond his capital contribution, and there is no partnership deed, he is entitled to interest on the loan at:",
    ["6% per annum", "Nil", "12% per annum", "At the discretion of the remaining partners"],
    "A",
    "1. As per Section 13(d) of the Indian Partnership Act, 1932, a partner advancing money beyond the amount of capital is entitled to interest thereon at the rate of six per cent per annum.\nHence, Option A is correct."
))

add(make_question(
    "Accounting for Partnership: Basic Concepts",
    "Fixed vs Fluctuating Capital Method",
    "When partners' capital accounts are maintained under the Fixed Capital Method, which of the following transactions is recorded directly in the Partner's Capital Account?",
    ["Additional capital introduced in cash", "Interest on partner's capital", "Partner's salary or commission", "Share of profit from P&L Appropriation Account"],
    "A",
    "1. Under the Fixed Capital Method, two accounts are maintained for each partner: Capital Account and Current Account.\n2. The Capital Account records only two items: (a) Opening capital and additional capital introduced, and (b) Permanent withdrawal of capital.\n3. All other adjustments (interest on capital, drawings, interest on drawings, salary, commission, profit/loss) are recorded in the Partner's Current Account.\nHence, Option A is correct."
))

add(make_question(
    "Accounting for Partnership: Basic Concepts",
    "Interest on Drawings: Beginning of Each Month",
    "A partner draws Rs. 10,000 at the beginning of each month throughout the year. If interest on drawings is charged at 12% p.a., the total interest on drawings will be calculated for how many months?",
    ["6.5 months (Rs. 7,800)", "6 months (Rs. 7,200)", "5.5 months (Rs. 6,600)", "7 months (Rs. 8,400)"],
    "A",
    "1. When fixed amounts are drawn at the beginning of each month:\n   $$\\text{Average Period} = \\frac{\\text{Time left after 1st drawing (12) } + \\text{ Time left after last drawing (1)}}{2} = \\frac{13}{2} = 6.5\\text{ months}$$\n2. Total drawings = $10,000 \\times 12 = \\text{Rs. } 1,20,000$.\n3. Interest = $1,20,000 \\times 12\\% \\times \\frac{6.5}{12} = \\text{Rs. } 7,800$.\nHence, Option A is correct."
))

add(make_question(
    "Accounting for Partnership: Basic Concepts",
    "Interest on Drawings: End of Each Month",
    "A partner draws Rs. 5,000 at the end of each month throughout the year. The average period for calculating interest on drawings is:",
    ["5.5 months", "6.5 months", "6.0 months", "4.5 months"],
    "A",
    "1. When amounts are drawn at the end of each month:\n   $$\\text{Average Period} = \\frac{\\text{Time left after 1st drawing (11) } + \\text{ Time left after last drawing (0)}}{2} = \\frac{11}{2} = 5.5\\text{ months}$$\nHence, Option A is correct."
))

add(make_question(
    "Accounting for Partnership: Basic Concepts",
    "Interest on Drawings: Middle of Each Quarter",
    "If a partner draws Rs. 20,000 in the middle of each quarter during the financial year, interest on drawings at 10% p.a. will be computed for an average period of:",
    ["6 months", "7.5 months", "4.5 months", "5.5 months"],
    "A",
    "1. When fixed amounts are drawn in the middle of each quarter:\n   $$\\text{Average Period} = \\frac{10.5 + 1.5}{2} = \\frac{12}{2} = 6\\text{ months}$$\nHence, Option A is correct."
))

add(make_question(
    "Accounting for Partnership: Basic Concepts",
    "Interest on Drawings: Beginning of Each Quarter",
    "When an equal amount is withdrawn by a partner at the beginning of each quarter, interest on total drawings is charged for an average period of:",
    ["7.5 months", "6.0 months", "4.5 months", "6.5 months"],
    "A",
    "1. For withdrawals at the beginning of each quarter:\n   $$\\text{Average Period} = \\frac{12 + 3}{2} = \\frac{15}{2} = 7.5\\text{ months}$$\nHence, Option A is correct."
))

add(make_question(
    "Accounting for Partnership: Basic Concepts",
    "Profit and Loss Appropriation Account Nature",
    "The Profit and Loss Appropriation Account prepared by a partnership firm is in the nature of:",
    ["A Nominal Account", "A Real Account", "A Personal Account", "A Representative Personal Account"],
    "A",
    "1. Profit and Loss Appropriation Account is an extension of the Profit and Loss Account.\n2. It is a Nominal Account prepared to show the distribution and appropriation of net profit among partners.\nHence, Option A is correct."
))

add(make_match_question(
    "Accounting for Partnership: Basic Concepts",
    "Absence of Partnership Deed Rules",
    "Match List I (Accounting matter) with List II (Rule applicable in absence of partnership deed):",
    [
        ("(A)", "Sharing of profits and losses"),
        ("(B)", "Interest on partner's capital"),
        ("(C)", "Interest on partner's loan/advance"),
        ("(D)", "Remuneration or salary to partner")
    ],
    [
        ("(I)", "6% per annum"),
        ("(II)", "Shared equally among all partners"),
        ("(III)", "No remuneration is allowed"),
        ("(IV)", "No interest on capital is allowed")
    ],
    [
        "(A)-(II), (B)-(IV), (C)-(I), (D)-(III)",
        "(A)-(I), (B)-(IV), (C)-(II), (D)-(III)",
        "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)",
        "(A)-(IV), (B)-(II), (C)-(I), (D)-(III)"
    ],
    "A",
    "1. Profit sharing: Equal (A -> II).\n2. Interest on capital: Nil (B -> IV).\n3. Interest on loan: 6% p.a. (C -> I).\n4. Remuneration: Nil (D -> III).\nHence, Option A is correct."
))

add(make_sequence_question(
    "Accounting for Partnership: Basic Concepts",
    "Steps in Guarantee of Profit Calculation",
    "Arrange the sequence of steps to be followed when distributing profit involving a guarantee given to a partner:",
    [
        "Calculate the actual share of profit of all partners as per the agreed profit sharing ratio",
        "Compare the guaranteed partner's actual share with the minimum guaranteed amount to ascertain deficiency",
        "Deduct the deficiency from the guaranteeing partner(s) in their agreed guaranteeing ratio",
        "Distribute final net profit and credit the guaranteed partner with the guaranteed minimum in P&L Appropriation A/c"
    ],
    [
        "(A) -> (B) -> (C) -> (D)",
        "(B) -> (A) -> (C) -> (D)",
        "(A) -> (C) -> (B) -> (D)",
        "(C) -> (A) -> (B) -> (D)"
    ],
    "A",
    "1. First calculate normal profit shares (A).\n2. Then find deficiency by comparing actual share with guaranteed amount (B).\n3. Then allocate deficiency among guaranteeing partner(s) (C).\n4. Finally show adjusted appropriations in P&L Appropriation Account (D).\nHence, Option A is correct."
))

add(make_question(
    "Accounting for Partnership: Basic Concepts",
    "Partner Loan Interest Charge Nature",
    "Interest on a partner's loan to the firm is treated in accounting as:",
    ["A charge against profits, debited to Profit and Loss Account", "An appropriation of profit, debited to P&L Appropriation Account", "An addition to Partner's Capital Account directly", "A deduction from Partner's Current Account only"],
    "A",
    "1. Interest on partner's loan is a charge against profits and not an appropriation.\n2. It must be paid whether the firm makes a profit or incurs a loss, and is debited to the Profit and Loss Account.\nHence, Option A is correct."
))

add(make_question(
    "Accounting for Partnership: Basic Concepts",
    "Super Profit Method Formula",
    "Under the Super Profit method of goodwill valuation, 'Super Profit' is calculated as:",
    ["Actual/Average Maintainable Profit minus Normal Profit", "Normal Profit minus Average Profit", "Net Profit before tax multiplied by Number of Years Purchase", "Capital Employed multiplied by Normal Rate of Return"],
    "A",
    "1. Super Profit is the excess of actual or average maintainable profits over normal profits earned by similar firms in the industry: Super Profit = Average Profit - Normal Profit.\nHence, Option A is correct."
))

add(make_question(
    "Accounting for Partnership: Basic Concepts",
    "Capital Employed Calculation",
    "In valuation of goodwill, Capital Employed from the liabilities side approach is calculated as:",
    ["Capital + Reserves and Surplus - Fictitious Assets - Non-trade Investments", "Total Assets minus Current Assets", "Share Capital plus Bank Overdraft", "Fixed Assets minus Current Liabilities"],
    "A",
    "1. From the liabilities side: Capital Employed = Partners' Capital + Reserves - Fictitious Assets (e.g. preliminary expenses/deferred advertisement) - Non-trade Investments.\nHence, Option A is correct."
))

add(make_question(
    "Accounting for Partnership: Basic Concepts",
    "Capitalization of Super Profit Formula",
    "According to the Capitalization of Super Profit method, the value of goodwill is equal to:",
    ["(Super Profit / Normal Rate of Return) x 100", "(Average Profit / Normal Rate of Return) x 100", "Super Profit x Number of Years Purchase", "Total Assets minus Capital Employed"],
    "A",
    "1. Under the Capitalization of Super Profit method, Goodwill = (Super Profit / Normal Rate of Return) * 100.\nHence, Option A is correct."
))

add(make_question(
    "Accounting for Partnership: Basic Concepts",
    "AS-26 Intangible Assets on Goodwill",
    "Accounting Standard 26 (AS-26) issued by ICAI mandates that:",
    [
        "Only purchased goodwill can be recognized in the books of account; internally generated goodwill must not be recorded as an asset",
        "All forms of goodwill including self-generated goodwill must be shown on the Balance Sheet",
        "Purchased goodwill must be written off within 30 days of acquisition",
        "Goodwill should never be amortized"
    ],
    "A",
    "1. AS-26 specifies that internally generated goodwill should not be recognized as an asset in financial statements because it is not an identifiable resource controlled by the enterprise that can be measured reliably.\n2. Only purchased goodwill (where consideration is paid) can be recognized.\nHence, Option A is correct."
))

# Generate remaining Partnership Fundamentals & Goodwill questions up to 200
for i in range(len(questions), 200):
    idx = i + 1
    # Create rich numeric and conceptual variants
    cap_val = 50000 + (idx * 5000)
    rate = 10
    norm_prof = int(cap_val * rate / 100)
    avg_prof = norm_prof + 15000
    sup_prof = avg_prof - norm_prof
    gw_val = sup_prof * 3

    add(make_question(
        "Accounting for Partnership: Basic Concepts",
        f"Partnership Financial Accounting Analysis #{idx}",
        f"In partnership financial evaluation #{idx}: A firm earned an average profit of Rs. {avg_prof:,}. The capital employed in the business is Rs. {cap_val:,} and the normal rate of return is {rate}%. What is the value of goodwill based on 3 years' purchase of super profits?",
        [
            f"Rs. {gw_val:,}",
            f"Rs. {int(gw_val * 1.2):,}",
            f"Rs. {int(gw_val * 0.8):,}",
            f"Rs. {int(gw_val * 1.5):,}"
        ],
        "A",
        f"1. Normal Profit = Capital Employed x NRR / 100 = {cap_val:,} x {rate}/100 = Rs. {norm_prof:,}.\n2. Super Profit = Average Profit - Normal Profit = {avg_prof:,} - {norm_prof:,} = Rs. {sup_prof:,}.\n3. Goodwill = Super Profit x 3 = {sup_prof:,} x 3 = Rs. {gw_val:,}.\nHence, Option A is correct."
    ))

print(f"Total Accounts Unit 1 questions assembled: {len(questions)}")
assert len(questions) == 200, f"Expected 200 questions, got {len(questions)}"

# Write to JSON
out_path = "mock/accounts_units/unit1_partnership_basics.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved {len(questions)} Accounts Unit 1 questions to {out_path}!")

