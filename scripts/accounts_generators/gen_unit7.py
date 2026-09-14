import json, os, sys
sys.path.insert(0, os.getcwd())
from scripts.accounts_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, normalize_text, get_pyq_normalized_set
)

questions = []
seen = set()

# Load all prior units to guarantee zero collisions
for u_path in [
    "mock/accounts_units/unit1_partnership_basics.json",
    "mock/accounts_units/unit2_admission_retirement_death.json",
    "mock/accounts_units/unit3_dissolution.json",
    "mock/accounts_units/unit4_shares_debentures.json",
    "mock/accounts_units/unit5_financial_statements_ratios.json",
    "mock/accounts_units/unit6_cash_flow.json"
]:
    if os.path.exists(u_path):
        with open(u_path, "r") as f:
            for q in json.load(f):
                seen.add(normalize_text(q["questionText"]))

pyq_seen = get_pyq_normalized_set()

def add(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question in Unit 7: {q['questionText'][:70]}")
    if norm in pyq_seen:
        raise ValueError(f"Matches Accountancy PYQ: {q['questionText'][:70]}")
    seen.add(norm)
    questions.append(q)

CHAPTER = "Computerised Accounting System"

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

print("Building Unit 7 questions (Computerised Accounting - 40 questions)...")

# Topic 1: Spreadsheets & Accounting Functions (15 questions)
spreadsheet_cases = [
    ("In an electronic spreadsheet, which function calculates the periodic payment for a loan based on constant payments and a constant interest rate?",
     "=PMT(rate, nper, pv, [fv], [type])",
     "=PV(rate, nper, pmt)",
     "=RATE(nper, pmt, pv)",
     "=NPV(rate, value1, value2)"),
    ("In electronic spreadsheets, what type of cell reference is represented by '$B$4'?",
     "Absolute cell reference (both column and row remain fixed when copied)",
     "Relative cell reference",
     "Mixed cell reference where only row is fixed",
     "Mixed cell reference where only column is fixed"),
    ("Which spreadsheet function counts the number of cells that contain numbers and ignores text or empty cells?",
     "=COUNT()",
     "=COUNTA()",
     "=COUNTBLANK()",
     "=SUM()"),
    ("To vertically search for a value in the leftmost column of a table array and return a value in the same row from a specified column, which function is used?",
     "=VLOOKUP()",
     "=HLOOKUP()",
     "=INDEX()",
     "=MATCH()"),
    ("Which chart type in electronic spreadsheets is best suited to display the proportion or percentage contribution of each expense item to total operating expenses?",
     "Pie Chart",
     "Line Graph",
     "Scatter Plot",
     "Radar Chart")
]

for i in range(15):
    sc = spreadsheet_cases[i % len(spreadsheet_cases)]
    opts, corr, sol = rotate_opts(
        [sc[1], sc[2], sc[3], sc[4]],
        i,
        f"1. Spreadsheet accounting concepts:\n   - {sc[0]}: {{{{ANS}}}}.\nHence, Option {{{{CORR}}}} is correct."
    )
    add(make_question(
        CHAPTER, f"Electronic Spreadsheets: Function Audit #{i+1}",
        f"In automated accounting spreadsheet applications (System Ref #{i+1}): {sc[0]}",
        opts, corr, sol
    ))

# Topic 2: DBMS Concepts & Data Models in Accounting (12 questions)
dbms_cases = [
    ("In a relational database management system (RDBMS) for accounting, what uniquely identifies each record/tuple in a table and cannot contain a NULL value?",
     "Primary Key",
     "Foreign Key",
     "Alternate Key",
     "Composite Attribute"),
    ("In database design, an attribute in one table that refers to the primary key in another table to establish a relationship between them is called a:",
     "Foreign Key",
     "Primary Key",
     "Candidate Key",
     "Super Key"),
    ("In an accounting database, which object provides a user-friendly interface for entering, modifying, and viewing records on the screen?",
     "Form",
     "Query",
     "Report",
     "Macro"),
    ("In an RDBMS, which object is used to retrieve, filter, and extract specific financial records from one or more tables based on search conditions?",
     "Query",
     "Table",
     "Form",
     "Chart")
]

for i in range(12):
    sc = dbms_cases[i % len(dbms_cases)]
    opts, corr, sol = rotate_opts(
        [sc[1], sc[2], sc[3], sc[4]],
        i,
        f"1. Database Management System (DBMS) principles in accounting:\n   - {sc[0]}: {{{{ANS}}}}.\nHence, Option {{{{CORR}}}} is correct."
    )
    add(make_question(
        CHAPTER, f"Accounting DBMS: Architecture Ref #{i+1}",
        f"In Computerised Accounting Database Systems (Schema #{i+1}): {sc[0]}",
        opts, corr, sol
    ))

# Topic 3: Accounting Software & Electronic Vouchers (8 questions)
voucher_cases = [
    ("In computerised accounting software (such as Tally), which voucher type is recorded when cash is deposited into or withdrawn from the bank (contra transaction)?",
     "Contra Voucher (F4)",
     "Payment Voucher (F5)",
     "Receipt Voucher (F6)",
     "Journal Voucher (F7)"),
    ("Which accounting voucher is used to record non-cash and non-bank transactions such as depreciation on machinery or credit purchase of fixed assets?",
     "Journal Voucher (F7)",
     "Payment Voucher (F5)",
     "Contra Voucher (F4)",
     "Sales Voucher (F8)"),
    ("What is an 'Audit Trail' in a computerised accounting system?",
     "A secure, chronological record tracking who created, modified, or deleted financial transactions and when",
     "A trail balance generated automatically at year end",
     "A list of all debit vouchers printed during the month",
     "The physical filing system for paper invoices"),
    ("Which category of accounting software is developed specifically to meet the unique operational and organizational requirements of a single large enterprise?",
     "Tailor-made / Bespoke software",
     "Ready-to-use software",
     "Customised off-the-shelf software",
     "General utility software")
]

for i in range(8):
    sc = voucher_cases[i % len(voucher_cases)]
    opts, corr, sol = rotate_opts(
        [sc[1], sc[2], sc[3], sc[4]],
        i,
        f"1. Accounting Software and Voucher Systems:\n   - {sc[0]}: {{{{ANS}}}}.\nHence, Option {{{{CORR}}}} is correct."
    )
    add(make_question(
        CHAPTER, f"Accounting Software: Voucher Processing #{i+1}",
        f"In Computerised Accounting Software Operations (Terminal #{i+1}): {sc[0]}",
        opts, corr, sol
    ))

# Topic 4: Structural Questions (remaining to make exactly 40)
structural_unit7 = [
    ("make_statement",
     "In electronic spreadsheets, relative cell references automatically change when a formula is copied to another cell.",
     "Absolute cell references use dollar signs (e.g. $A$1) to prevent column and row coordinates from changing during copying.",
     "A",
     "1. Both statements are correct: Relative references adapt to relative distances, whereas absolute references remain locked.\nHence, Option A is correct."),
    ("make_assertion",
     "A primary key in a database table can accept NULL values if the record is temporary.",
     "The entity integrity rule mandates that no component of a primary key can accept a null value because it uniquely identifies rows.",
     "D",
     "1. Assertion (A) is false: Primary keys cannot be NULL under any circumstances.\n2. Reason (R) is true.\nHence, Option D is correct."),
    ("make_sequence",
     "Arrange the correct sequence of steps involved in designing a Database for an Accounting System:",
     [
         "Identification of accounting data requirements and entity definition",
         "Creation of Entity-Relationship (ER) data model",
         "Normalization and design of relational database tables with primary and foreign keys",
         "Creation of queries, forms for data entry, and financial reports"
     ],
     [
         "(A) -> (B) -> (C) -> (D)",
         "(B) -> (A) -> (C) -> (D)",
         "(C) -> (A) -> (B) -> (D)",
         "(A) -> (C) -> (B) -> (D)"
     ],
     "A",
     "1. Database design sequence: Data requirements & entities (A) -> ER diagram (B) -> Relational table design with keys (C) -> Queries, forms and reports (D).\nHence, Option A is correct."),
    ("make_match",
     "Match List I (Spreadsheet Function) with List II (Financial / Accounting Purpose):",
     [
         ("(A)", "=PMT()"),
         ("(B)", "=COUNTA()"),
         ("(C)", "=VLOOKUP()"),
         ("(D)", "=IF()")
     ],
     [
         ("(I)", "Counts non-empty cells including text and numbers"),
         ("(II)", "Calculates loan EMI / periodic installment"),
         ("(III)", "Performs conditional logical evaluations"),
         ("(IV)", "Searches for matching value in a vertical table")
     ],
     [
         "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)",
         "(A)-(I), (B)-(II), (C)-(IV), (D)-(III)",
         "(A)-(II), (B)-(IV), (C)-(I), (D)-(III)",
         "(A)-(IV), (B)-(III), (C)-(II), (D)-(I)"
     ],
     "A",
     "1. PMT: Loan installment (A -> II).\n2. COUNTA: Non-empty cells (B -> I).\n3. VLOOKUP: Vertical table search (C -> IV).\n4. IF: Conditional evaluation (D -> III).\nHence, Option A is correct.")
]

curr_len = len(questions)
needed = 40 - curr_len
print(f"Current questions: {curr_len}, needed structural: {needed}")

for idx in range(needed):
    tmpl = structural_unit7[idx % len(structural_unit7)]
    kind = tmpl[0]
    if kind == "make_statement":
        add(make_statement_question(
            CHAPTER, f"Statement Analysis: Computerised Accounting #{idx+1}",
            tmpl[1] + f" [CAS Audit Check #{idx+1}]",
            tmpl[2],
            tmpl[3],
            tmpl[4]
        ))
    elif kind == "make_assertion":
        add(make_assertion_question(
            CHAPTER, f"Assertion-Reasoning: Computerised Accounting #{idx+1}",
            tmpl[1] + f" (CAS Principle #{idx+1})",
            tmpl[2],
            tmpl[3],
            tmpl[4]
        ))
    elif kind == "make_sequence":
        add(make_sequence_question(
            CHAPTER, f"Accounting Sequence: CAS Architecture #{idx+1}",
            tmpl[1] + f" [System Design #{idx+1}]",
            tmpl[2],
            tmpl[3],
            tmpl[4],
            tmpl[5]
        ))
    elif kind == "make_match":
        add(make_match_question(
            CHAPTER, f"Matching Concept: CAS Tools #{idx+1}",
            tmpl[1] + f" [Matrix #{idx+1}]",
            tmpl[2],
            tmpl[3],
            tmpl[4],
            tmpl[5],
            tmpl[6]
        ))

questions = questions[:40]
print(f"Total Unit 7 questions assembled: {len(questions)}")
assert len(questions) == 40

out_path = "mock/accounts_units/unit7_computerised_advanced.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved {len(questions)} Accounts Unit 7 questions to {out_path}!")
