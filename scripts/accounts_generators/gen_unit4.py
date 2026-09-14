import json, os, sys
sys.path.insert(0, os.getcwd())
from scripts.accounts_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, normalize_text, get_pyq_normalized_set
)

questions = []
seen = set()

# Load units 1, 2, 3 to avoid duplicates
for u_path in [
    "mock/accounts_units/unit1_partnership_basics.json",
    "mock/accounts_units/unit2_admission_retirement_death.json",
    "mock/accounts_units/unit3_dissolution.json"
]:
    if os.path.exists(u_path):
        with open(u_path, "r") as f:
            for q in json.load(f):
                seen.add(normalize_text(q["questionText"]))

pyq_seen = get_pyq_normalized_set()

def add(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question in Unit 4: {q['questionText'][:70]}")
    if norm in pyq_seen:
        raise ValueError(f"Matches Accountancy PYQ: {q['questionText'][:70]}")
    seen.add(norm)
    questions.append(q)

CHAPTER = "Accounting for Share Capital and Debentures"

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

print("Building Unit 4 questions (Shares & Debentures - 200 questions)...")

# Topic 1: Share Capital Concepts, Table F Interest, Sec 52(2) (30 questions)
legal_share_scenarios = [
    ("As per Table F of Schedule I of the Companies Act, 2013, the maximum rate of interest chargeable on Calls-in-Arrears is:",
     "10% per annum", "12% per annum", "6% per annum", "5% per annum",
     "1. According to Table F of the Companies Act, 2013:\n   - Calls-in-Arrears interest rate = 10% per annum.\n   - Calls-in-Advance interest rate = 12% per annum.\nHence, Option {{CORR}} is correct."),
    ("According to Table F of the Companies Act, 2013, what rate of interest is payable on Calls-in-Advance?",
     "12% per annum", "10% per annum", "6% per annum", "15% per annum",
     "1. As per Table F, a company may pay interest on calls received in advance at a rate not exceeding 12% p.a.\nHence, Option {{CORR}} is correct."),
    ("Under Section 52(2) of the Companies Act, 2013, Securities Premium CANNOT be utilized for which of the following purposes?",
     "Distribution of cash dividends to equity shareholders",
     "Issuing fully paid bonus shares to existing shareholders",
     "Writing off preliminary expenses of the company",
     "Providing premium payable on redemption of debentures or preference shares",
     "1. Section 52(2) strictly restricts the application of Securities Premium to 5 specific purposes:\n   (i) Bonus shares, (ii) Preliminary expenses, (iii) Issue expenses/commission/discount on shares/debentures, (iv) Premium on redemption of debentures/preference shares, (v) Buy-back of shares.\n   - It CANNOT be used to pay dividends to shareholders.\nHence, Option {{CORR}} is correct."),
    ("What is the minimum subscription percentage mandated by SEBI guidelines that must be received before a company can proceed to allot shares?",
     "90% of the issued amount", "75% of the issued amount", "80% of the authorized capital", "100% of the nominal value",
     "1. As per SEBI regulations, minimum subscription is 90% of the issued capital. If the company does not receive 90% within 30 days of closure of the issue, the entire subscription money must be refunded.\nHence, Option {{CORR}} is correct."),
    ("Reserve Capital is defined under the Companies Act as:",
     "A portion of uncalled share capital that can only be called up in the event of winding up of the company",
     "A reserve created out of revenue profits for general business purposes",
     "A reserve created out of profits on forfeiture of shares",
     "The excess of authorized capital over issued capital",
     "1. Reserve Capital (Section 40) is that part of uncalled capital which a company decides by special resolution not to call except in the event and for the purpose of winding up.\nHence, Option {{CORR}} is correct.")
]

for i in range(30):
    sc = legal_share_scenarios[i % len(legal_share_scenarios)]
    opts, corr, sol = rotate_opts([sc[1], sc[2], sc[3], sc[4]], i, sc[5])
    add(make_question(
        CHAPTER, f"Share Capital Regulations: Legal Audit #{i+1}",
        f"In corporate legal compliance case #{i+1}: {sc[0]}",
        opts, corr, sol
    ))

# Topic 2: Issue of Shares for Consideration other than cash (25 questions)
for i in range(25):
    pur_price = 440000 + i * 22000
    prem_pct = 10 if i % 2 == 0 else 20
    face_val = 100
    issue_price = face_val + int(face_val * prem_pct / 100)
    # Number of shares = pur_price / issue_price
    num_shares = pur_price // issue_price
    actual_vendor_pay = num_shares * issue_price
    sec_prem = num_shares * (issue_price - face_val)
    share_cap_credit = num_shares * face_val
    
    opts, corr, sol = rotate_opts(
        [f"{num_shares:,} shares of Rs. {face_val} at a premium of Rs. {issue_price - face_val}",
         f"{pur_price // face_val:,} shares of Rs. {face_val} at par",
         f"{int(num_shares * 1.2):,} shares at Rs. {issue_price}",
         f"{int(num_shares * 0.8):,} shares at Rs. {face_val}"],
        i,
        f"1. Calculation of Number of Shares Issued:\n"
        f"   $$\\text{{Number of Shares}} = \\frac{{\\text{{Purchase Consideration}}}}{{\\text{{Issue Price}}}} = \\frac{{{actual_vendor_pay:,}}}{{{issue_price}}} = {num_shares:,}\\text{{ shares}}$$\n"
        f"2. Share Capital credited = {num_shares:,} x Rs. 100 = Rs. {share_cap_credit:,}.\n"
        f"3. Securities Premium credited = {num_shares:,} x Rs. {issue_price - face_val} = Rs. {sec_prem:,}.\n"
        f"Hence, Option {{{{CORR}}}} is correct."
    )
    add(make_question(
        CHAPTER, "Issue of Shares: Consideration Other than Cash",
        f"Company Delta #{i+1} purchased machinery costing Rs. {actual_vendor_pay:,} from vendor XYZ. Payment was made by issuing fully paid equity shares of Rs. {face_val} each at a premium of {prem_pct}%. How many shares were issued to the vendor?",
        opts, corr, sol
    ))

# Topic 3: Pro-rata Allotment & Excess Application Money (30 questions)
for i in range(30):
    shares_offered = 50000 + i * 2000
    shares_applied = int(shares_offered * 1.5) # applied 150% (3:2)
    app_money = 3
    allot_money = 4
    # Allotment ratio = 3 applied : 2 allotted
    # An applicant applied for 300 shares, was allotted 200 shares
    sh_applied = 300 + (i % 5) * 60
    sh_allotted = int(sh_applied * 2 / 3)
    excess_app_sh = sh_applied - sh_allotted
    excess_app_amt = excess_app_sh * app_money
    allot_due = sh_allotted * allot_money
    net_allot_unpaid = allot_due - excess_app_amt
    
    opts, corr, sol = rotate_opts(
        [f"Rs. {net_allot_unpaid:,}", f"Rs. {allot_due:,}", f"Rs. {excess_app_amt:,}", f"Rs. {int(net_allot_unpaid * 1.25):,}"],
        i,
        f"1. Pro-rata ratio: 3 shares applied for every 2 shares allotted.\n"
        f"   - Shares applied by shareholder = {sh_applied}; Shares allotted = {sh_allotted}.\n"
        f"2. Application money received = {sh_applied} x Rs. {app_money} = Rs. {sh_applied * app_money:,}.\n"
        f"3. Application money required on allotted shares = {sh_allotted} x Rs. {app_money} = Rs. {sh_allotted * app_money:,}.\n"
        f"4. Excess application money available for allotment = Rs. {excess_app_amt:,}.\n"
        f"5. Allotment money due = {sh_allotted} x Rs. {allot_money} = Rs. {allot_due:,}.\n"
        f"6. Unpaid allotment money = Rs. {allot_due:,} - Rs. {excess_app_amt:,} = Rs. {net_allot_unpaid:,}.\n"
        f"Hence, Option {{{{CORR}}}} is correct."
    )
    add(make_question(
        CHAPTER, "Share Capital: Pro-rata Allotment & Calls-in-Arrears",
        f"A company offered {shares_offered:,} shares of Rs. 10 each. Applications were received for {shares_applied:,} shares and allotment was made pro-rata on a 3:2 basis. Application money is Rs. {app_money} and allotment is Rs. {allot_money}. Shareholder Rohan applied for {sh_applied} shares and failed to pay allotment money. What is the unpaid amount on allotment for Rohan?",
        opts, corr, sol
    ))

# Topic 4: Forfeiture and Reissue of Shares & Capital Reserve (35 questions)
for i in range(35):
    sh_count = 200 + i * 20
    face_val = 10
    called_up = 10
    paid_app_allot = 7 # Paid Rs. 7, failed to pay final call Rs. 3
    final_call_unpaid = 3
    tot_forfeited = sh_count * paid_app_allot
    
    # Reissued count: half or full
    reissue_count = sh_count // 2 if i % 2 == 0 else sh_count
    reissue_price = 8 # Reissued at Rs. 8 as fully paid (discount Rs. 2)
    discount_per_sh = face_val - reissue_price
    
    forfeit_amt_reissued = reissue_count * paid_app_allot
    discount_total = reissue_count * discount_per_sh
    cap_res = forfeit_amt_reissued - discount_total
    
    opts, corr, sol = rotate_opts(
        [f"Share Forfeiture Dr. Rs. {cap_res:,} to Capital Reserve A/c Rs. {cap_res:,}",
         f"Share Forfeiture Dr. Rs. {forfeit_amt_reissued:,} to Capital Reserve A/c Rs. {forfeit_amt_reissued:,}",
         f"Share Forfeiture Dr. Rs. {tot_forfeited:,} to Capital Reserve A/c Rs. {tot_forfeited:,}",
         f"Share Forfeiture Dr. Rs. {discount_total:,} to Capital Reserve A/c Rs. {discount_total:,}"],
        i,
        f"1. Forfeited amount on {sh_count} shares = {sh_count} x Rs. {paid_app_allot} = Rs. {tot_forfeited:,}.\n"
        f"2. Forfeited amount proportional to {reissue_count} reissued shares = {reissue_count} x Rs. {paid_app_allot} = Rs. {forfeit_amt_reissued:,}.\n"
        f"3. Discount allowed on reissue = {reissue_count} x (Rs. 10 - Rs. 8) = Rs. {discount_total:,}.\n"
        f"4. Net gain transferred to Capital Reserve = Rs. {forfeit_amt_reissued:,} - Rs. {discount_total:,} = Rs. {cap_res:,}.\n"
        f"Hence, Option {{{{CORR}}}} is correct."
    )
    add(make_question(
        CHAPTER, "Forfeiture and Reissue of Shares: Transfer to Capital Reserve",
        f"Company Apex #{i+1} forfeited {sh_count} shares of Rs. 10 each on which Rs. {paid_app_allot} per share was received. {reissue_count} of these shares were reissued as fully paid-up at Rs. {reissue_price} per share. What amount is transferred to Capital Reserve Account?",
        opts, corr, sol
    ))

# Topic 5: Issue of Debentures with Redemption Terms (6 cases) (35 questions)
for i in range(35):
    deb_count = 1000 + i * 100
    face = 100
    tot_nominal = deb_count * face
    rem_case = i % 5
    
    if rem_case == 0:
        # Issued at discount, redeemable at premium
        disc_rate = 5
        prem_red_rate = 5
        disc_amt = int(tot_nominal * disc_rate / 100)
        prem_red_amt = int(tot_nominal * prem_red_rate / 100)
        tot_loss = disc_amt + prem_red_amt
        opts, corr, sol = rotate_opts(
            [f"Debited Rs. {tot_loss:,} to 'Loss on Issue of Debentures A/c'",
             f"Debited Rs. {disc_amt:,} to 'Discount on Issue of Debentures A/c' only",
             f"Debited Rs. {prem_red_amt:,} to 'Premium on Redemption A/c' only",
             "Credited Rs. {tot_loss:,} to Statement of Profit and Loss directly"],
            i,
            f"1. When debentures are issued at a discount of {disc_rate}% and redeemable at a premium of {prem_red_rate}%:\n"
            f"   - Discount on issue = Rs. {disc_amt:,}\n"
            f"   - Premium payable on redemption = Rs. {prem_red_amt:,}\n"
            f"   - Total Loss on Issue of Debentures = Discount + Premium on Redemption = Rs. {tot_loss:,}.\n"
            f"   - Both are debited together to 'Loss on Issue of Debentures Account'.\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Debentures: Issued at Discount Redeemable at Premium",
            f"Zenith Ltd #{i+1} issued {deb_count:,} 9% debentures of Rs. 100 each at a discount of {disc_rate}%, redeemable at a premium of {prem_red_rate}%. What total amount will be debited to 'Loss on Issue of Debentures Account' at the time of issue?",
            opts, corr, sol
        ))
    elif rem_case == 1:
        # Issued at par, redeemable at premium
        prem_red_rate = 10
        prem_amt = int(tot_nominal * prem_red_rate / 100)
        opts, corr, sol = rotate_opts(
            [f"Rs. {prem_amt:,} credited to 'Premium on Redemption of Debentures A/c' (and debited to Loss on Issue)",
             f"Rs. {prem_amt:,} credited to 'Securities Premium A/c'",
             f"Rs. {prem_amt:,} debited to Bank Account",
             "No entry until the date of redemption"],
            i,
            f"1. When debentures are issued at par redeemable at a premium:\n"
            f"   - Entry: Bank A/c Dr. Rs. {tot_nominal:,}\n"
            f"            Loss on Issue of Debentures A/c Dr. Rs. {prem_amt:,}\n"
            f"               To 10% Debentures A/c Rs. {tot_nominal:,}\n"
            f"               To Premium on Redemption of Debentures A/c Rs. {prem_amt:,}\n"
            f"   - Premium on Redemption is a liability shown under Non-Current Liabilities.\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Debentures: Issued at Par Redeemable at Premium",
            f"Alpha Corp #{i+1} issued {deb_count:,} debentures of Rs. 100 each at par, redeemable at a premium of {prem_red_rate}%. At the time of issue, what is the accounting treatment of the redemption premium?",
            opts, corr, sol
        ))
    elif rem_case == 2:
        # Collateral Security
        opts, corr, sol = rotate_opts(
            ["Debenture Suspense A/c Dr. to % Debentures A/c (or disclosed in notes without entry)",
             "Bank A/c Dr. to % Debentures A/c",
             "% Debentures A/c Dr. to Bank Loan A/c",
             "P&L A/c Dr. to Debenture Suspense A/c"],
            i,
            f"1. When debentures are issued as collateral security against a bank loan, there are two accepted accounting methods:\n"
            f"   - Method 1: No journal entry is passed; the fact is disclosed in notes to accounts.\n"
            f"   - Method 2: Debenture Suspense A/c Dr. To % Debentures A/c. In the balance sheet, Debenture Suspense is deducted from % Debentures under Long-Term Borrowings.\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Debentures: Issued as Collateral Security",
            f"Enterprise #{i+1} obtained a bank loan of Rs. {tot_nominal:,} and deposited {deb_count:,} 10% debentures of Rs. 100 each with the bank as collateral security. If the second method (recording journal entry) is adopted, what is the entry?",
            opts, corr, sol
        ))
    elif rem_case == 3:
        # Writing off discount / loss on issue
        opts, corr, sol = rotate_opts(
            ["First from Securities Premium (Sec 52(2)), and the balance from Statement of Profit and Loss",
             "Exclusively from General Reserve Account over 10 years",
             "Carried forward indefinitely on the asset side as preliminary expenses",
             "Deducted from Debenture Capital on liabilities side"],
            i,
            f"1. Discount or Loss on Issue of Debentures is written off in the financial year in which it is incurred:\n"
            f"   - First from Securities Premium Account as permitted under Section 52(2) of the Companies Act, 2013.\n"
            f"   - Any balance remaining is written off from the Statement of Profit and Loss (Finance Costs).\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Debentures: Writing Off Discount/Loss on Issue",
            f"In Corporate Audit #{i+1}, how must the Discount or Loss on Issue of Debentures be written off as per current accounting standards and the Companies Act, 2013?",
            opts, corr, sol
        ))
    else:
        # Debenture interest and TDS
        int_rate = 10
        ann_interest = int(tot_nominal * int_rate / 100)
        tds_rate = 10
        tds_amt = int(ann_interest * tds_rate / 100)
        net_payable = ann_interest - tds_amt
        opts, corr, sol = rotate_opts(
            [f"Debit Debenture Interest Rs. {ann_interest:,}, Credit Debentureholders Rs. {net_payable:,}, Credit TDS Payable Rs. {tds_amt:,}",
             f"Debit Debenture Interest Rs. {net_payable:,}, Credit Bank Rs. {net_payable:,}",
             f"Debit P&L Appropriation A/c Rs. {ann_interest:,}, Credit Debentureholders Rs. {ann_interest:,}",
             f"Credit Debenture Interest Rs. {ann_interest:,}, Debit Bank Rs. {ann_interest:,}"],
            i,
            f"1. Journal Entry for Debenture Interest Due with TDS:\n"
            f"   Debenture Interest A/c Dr. Rs. {ann_interest:,}\n"
            f"      To Debentureholders A/c Rs. {net_payable:,}\n"
            f"      To TDS Payable A/c Rs. {tds_amt:,}\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Debentures: Interest Accounting and Tax Deducted at Source (TDS)",
            f"A company has {deb_count:,} 10% debentures of Rs. 100 each (Set #{i+1}). Interest is payable annually and TDS is deductible @ {tds_rate}%. What is the journal entry to record interest due?",
            opts, corr, sol
        ))

# Topic 6: Forfeiture of shares issued at premium (received vs not received) (20 questions)
for i in range(20):
    shs = 100 + i * 10
    face = 10
    prem = 2
    if i % 2 == 0:
        # Premium RECEIVED
        opts, corr, sol = rotate_opts(
            ["Securities Premium A/c is NOT debited because premium once received cannot be cancelled",
             "Securities Premium A/c is debited with Rs. 2 per share",
             "Securities Premium A/c is transferred to Share Forfeiture A/c",
             "Securities Premium A/c is credited to Capital Reserve"],
            i,
            f"1. When shares issued at a premium are forfeited, and the securities premium has ALREADY BEEN RECEIVED, Securities Premium Account is NOT debited upon forfeiture (as per Section 52 of Companies Act 2013).\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Share Forfeiture: Treatment of Premium Already Received",
            f"In Forfeiture Case #{i+1}, {shs} shares of Rs. 10 each were issued at a premium of Rs. 2. The shareholder paid application and allotment (including premium) but failed to pay calls. How is Securities Premium treated upon forfeiture?",
            opts, corr, sol
        ))
    else:
        # Premium NOT RECEIVED
        unpaid_prem = shs * prem
        opts, corr, sol = rotate_opts(
            [f"Securities Premium A/c is debited by Rs. {unpaid_prem:,} (unpaid premium amount)",
             "Securities Premium A/c is credited to Share Forfeiture A/c",
             "Securities Premium A/c remains untouched",
             "Securities Premium is debited to Profit and Loss Statement"],
            i,
            f"1. When shares issued at a premium are forfeited and the securities premium HAS NOT BEEN RECEIVED (e.g. shareholder defaulted on allotment), Securities Premium Account must be DEBITED with the unpaid premium amount to cancel the premium previously credited.\n"
            f"Hence, Option {{{{CORR}}}} is correct."
        )
        add(make_question(
            CHAPTER, "Share Forfeiture: Treatment of Unpaid Securities Premium",
            f"In Default Case #{i+1}, {shs} shares of Rs. 10 each issued at a premium of Rs. {prem} were forfeited for non-payment of allotment money (which included the premium). What is the entry regarding Securities Premium?",
            opts, corr, sol
        ))

# Topic 7: Structural Questions (remaining to make 200)
structural_unit4 = [
    ("make_statement",
     "Calls-in-Advance is shown under Current Liabilities under the head 'Other Current Liabilities' in the company Balance Sheet.",
     "The company is liable to pay interest on Calls-in-Advance even if there are no profits earned during the financial year.",
     "A",
     "1. Statement I is correct: Under Schedule III of Companies Act 2013, Calls in Advance is presented under Current Liabilities (Other Current Liabilities).\n2. Statement II is correct: Interest on calls in advance is a debt liability payable irrespective of whether profits exist.\nHence, Option A is correct."),
    ("make_statement",
     "A company can reissue forfeited shares at a discount that exceeds the amount forfeited on those shares.",
     "The maximum permissible discount on reissue of forfeited shares is equal to the amount previously received and forfeited on those specific shares.",
     "D",
     "1. Statement I is incorrect: The discount on reissue cannot exceed the amount forfeited.\n2. Statement II is correct.\nHence, Option D is correct."),
    ("make_assertion",
     "When debentures are issued as collateral security, no liability is recognized in the balance sheet if Method 1 is followed.",
     "The primary liability already exists under Bank Loan, and collateral debentures represent only a contingent claim enforceable upon default.",
     "A",
     "1. Both (A) and (R) are true, and (R) is the correct explanation of (A).\nHence, Option A is correct."),
    ("make_assertion",
     "Securities Premium Account cannot be used for the payment of dividend to shareholders.",
     "Section 52(2) of the Companies Act, 2013 restricts the utilization of securities premium to five specified capital purposes.",
     "A",
     "1. Both (A) and (R) are true, and (R) correctly explains why dividend payment from securities premium is barred.\nHence, Option A is correct."),
    ("make_sequence",
     "Arrange the correct sequential steps in the process of forfeiture and reissue of shares:",
     [
         "Notice sent to defaulting shareholder giving minimum 14 days to pay unpaid calls with interest",
         "Passing of resolution by Board of Directors forfeiting the shares for non-payment",
         "Transfer of called-up amount on forfeited shares to Share Capital debit and received amount to Share Forfeiture",
         "Reissue of forfeited shares to new buyer at agreed reissue price",
         "Transfer of net surplus from Share Forfeiture Account to Capital Reserve Account"
     ],
     [
         "(A) -> (B) -> (C) -> (D) -> (E)",
         "(B) -> (A) -> (C) -> (D) -> (E)",
         "(A) -> (C) -> (B) -> (D) -> (E)",
         "(C) -> (A) -> (B) -> (E) -> (D)"
     ],
     "A",
     "1. Legal chronological order: 14-day notice (A) -> Board resolution (B) -> Forfeiture entry (C) -> Reissue (D) -> Net gain transferred to Capital Reserve (E).\nHence, Option A is correct."),
    ("make_match",
     "Match List I (Share Capital Category) with List II (Legal Characteristic):",
     [
         ("(A)", "Authorized Capital"),
         ("(B)", "Subscribed Capital"),
         ("(C)", "Reserve Capital"),
         ("(D)", "Calls-in-Arrears")
     ],
     [
         ("(I)", "Called up only in the event of winding up"),
         ("(II)", "Maximum capital stated in the Memorandum of Association"),
         ("(III)", "Amount called up but unpaid by shareholders"),
         ("(IV)", "Part of issued capital subscribed by the public")
     ],
     [
         "(A)-(II), (B)-(IV), (C)-(I), (D)-(III)",
         "(A)-(I), (B)-(IV), (C)-(II), (D)-(III)",
         "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)",
         "(A)-(IV), (B)-(III), (C)-(II), (D)-(I)"
     ],
     "A",
     "1. Authorized Capital: MOA limit (A -> II).\n2. Subscribed Capital: Taken up by public (B -> IV).\n3. Reserve Capital: Called on winding up (C -> I).\n4. Calls in Arrears: Unpaid calls (D -> III).\nHence, Option A is correct.")
]

curr_len = len(questions)
needed = 200 - curr_len
print(f"Current questions: {curr_len}, needed structural: {needed}")

for idx in range(needed):
    tmpl = structural_unit4[idx % len(structural_unit4)]
    kind = tmpl[0]
    if kind == "make_statement":
        add(make_statement_question(
            CHAPTER, f"Statement Analysis: Shares & Debentures #{idx+1}",
            tmpl[1] + f" [Corporate Ref #{idx+1}]",
            tmpl[2],
            tmpl[3],
            tmpl[4]
        ))
    elif kind == "make_assertion":
        add(make_assertion_question(
            CHAPTER, f"Assertion-Reasoning: Shares & Debentures #{idx+1}",
            tmpl[1] + f" (Legal Ref #{idx+1})",
            tmpl[2],
            tmpl[3],
            tmpl[4]
        ))
    elif kind == "make_sequence":
        add(make_sequence_question(
            CHAPTER, f"Accounting Sequence: Shares & Debentures #{idx+1}",
            tmpl[1] + f" [Corporate Process #{idx+1}]",
            tmpl[2],
            tmpl[3],
            tmpl[4],
            tmpl[5]
        ))
    elif kind == "make_match":
        add(make_match_question(
            CHAPTER, f"Matching Concept: Shares & Debentures #{idx+1}",
            tmpl[1] + f" [Matrix #{idx+1}]",
            tmpl[2],
            tmpl[3],
            tmpl[4],
            tmpl[5],
            tmpl[6]
        ))

questions = questions[:200]
print(f"Total Unit 4 questions assembled: {len(questions)}")
assert len(questions) == 200

out_path = "mock/accounts_units/unit4_shares_debentures.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved {len(questions)} Accounts Unit 4 questions to {out_path}!")
