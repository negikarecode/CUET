import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.eco_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text
)

CHAPTER = "Money and Banking"
questions = []
seen = set()

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:80]}")
    seen.add(norm)
    questions.append(q)

print("Generating 80 unique questions for Unit 7: Money and Banking...")

# -------------------------------------------------------------------------------------------------
# 1. Barter System, Evolution & Functions of Money, High-Powered Money (Q1 - Q25)
# -------------------------------------------------------------------------------------------------

# 1. Barter system primary limitation
opts, corr, sol = rotate_options(
    "Lack of double coincidence of wants",
    [
        "Absence of computerized digital payment gateways",
        "Excessive government taxation on agricultural crops",
        "High interest rates charged by village money lenders"
    ],
    "A",
    "1. The barter system (C-C economy: Commodity for Commodity) fundamentally broke down due to the 'Lack of Double Coincidence of Wants'—the rare coincidence where what one person wants to sell is precisely what another person wants to buy in exact quantities.\nHence, Option {{CORR}} is correct.",
    "Identifies double coincidence of wants."
)
add_q(make_question(CHAPTER, "Functions of Money", "What was the most fundamental limitation of the Barter System of exchange?", opts, corr, sol))

# 2. Primary functions of money
opts, corr, sol = rotate_options(
    "Medium of Exchange and Measure of Value (Unit of Account)",
    [
        "Standard of Deferred Payments and Store of Value",
        "Distribution of national income and basis of credit",
        "Facilitator of international tourism and foreign exchange"
    ],
    "B",
    "1. Money performs two Primary Functions:\n   (i) Medium of Exchange: eliminates the double coincidence of wants.\n   (ii) Measure of Value (Unit of Account): serves as a common denominator to express prices of all goods.\nHence, Option {{CORR}} is correct.",
    "Identifies Medium of Exchange and Measure of Value as primary functions."
)
add_q(make_question(CHAPTER, "Functions of Money", "Which pair represents the 'Primary Functions' of money?", opts, corr, sol))

# 3. Secondary functions of money
opts, corr, sol = rotate_options(
    "Standard of Deferred Payments and Store of Value",
    [
        "Medium of Exchange and Measure of Value",
        "Currency note issuance and credit creation",
        "Tax collection and government budgeting"
    ],
    "C",
    "1. The Secondary (Derivative) functions of money include:\n   (i) Standard of Deferred Payments: facilitates borrowing, lending, and future contracts.\n   (ii) Store of Value: allows individuals to transfer purchasing power from the present to the future without physical spoilage.\nHence, Option {{CORR}} is correct.",
    "Identifies Secondary functions of money."
)
add_q(make_question(CHAPTER, "Functions of Money", "Which of the following functions of money are classified as 'Secondary Functions'?", opts, corr, sol))

# 4. Fiat Money definition
opts, corr, sol = rotate_options(
    "Money that is issued by government decree/order and backed by law, having no intrinsic commodity value",
    [
        "Gold and silver coins whose face value equals intrinsic metal value",
        "Bank cheques accepted solely on the basis of personal trust",
        "Subsidies disbursed to small and marginal farmers"
    ],
    "D",
    "1. Fiat Money is currency that circulates by government order/decree (fiat), such as paper notes and coins. It has legal backing but negligible intrinsic commodity value (unlike gold coins).\nHence, Option {{CORR}} is correct.",
    "Defines Fiat Money."
)
add_q(make_question(CHAPTER, "Functions of Money", "What is 'Fiat Money' in modern monetary economics?", opts, corr, sol))

# 5. Legal Tender Money
opts, corr, sol = rotate_options(
    "Money that can legally be used to settle debts and obligations, and which cannot be refused by any citizen",
    [
        "Promissory notes signed between private business corporations",
        "Cryptocurrencies traded on decentralized international exchanges",
        "Special drawing rights issued by the International Monetary Fund"
    ],
    "A",
    "1. Legal Tender is currency that by law must be accepted in payment of a financial obligation or debt within the national territory. Refusing legal tender is a penal offense.\nHence, Option {{CORR}} is correct.",
    "Defines Legal Tender."
)
add_q(make_question(CHAPTER, "Functions of Money", "What is meant by 'Legal Tender Money'?", opts, corr, sol))

# 6. Limited vs Unlimited Legal Tender
opts, corr, sol = rotate_options(
    "Limited legal tender (coins) can be legally tendered up to a maximum statutory sum, while unlimited legal tender (currency notes) can be offered for any amount",
    [
        "Limited legal tender applies only in rural areas while unlimited applies in cities",
        "Limited legal tender has zero purchasing power while unlimited legal tender is gold",
        "There is no legal distinction between coins and currency notes"
    ],
    "B",
    "1. Under the Indian Coinage Act, coins are Limited Legal Tender (can be paid up to statutory limits, e.g. 1000 rupees for 1-rupee coins). Currency notes are Unlimited Legal Tender (can be offered to settle debts of any amount).\nHence, Option {{CORR}} is correct.",
    "Contrasts limited vs unlimited legal tender."
)
add_q(make_question(CHAPTER, "Functions of Money", "How is 'Limited Legal Tender' distinguished from 'Unlimited Legal Tender' in India?", opts, corr, sol))

# 7. Fiduciary Money definition
opts, corr, sol = rotate_options(
    "Money accepted as a medium of exchange based on mutual trust between the payer and the payee (e.g. cheques, bank drafts)",
    [
        "Currency notes issued exclusively by the central bank",
        "Metallic gold coins minted during imperial reigns",
        "Special liquidity bonds purchased by state governments"
    ],
    "C",
    "1. Fiduciary Money (e.g. cheques, demand drafts, promissory notes) is not declared legal tender by government fiat, but circulates because people have mutual trust and confidence in the issuer's promise to pay.\nHence, Option {{CORR}} is correct.",
    "Defines Fiduciary Money."
)
add_q(make_question(CHAPTER, "Functions of Money", "What is 'Fiduciary Money'?", opts, corr, sol))

# 8. High-Powered Money (Monetary Base / M0)
opts, corr, sol = rotate_options(
    "Currency held by the public + Cash reserves of commercial banks (vault cash + deposits with RBI)",
    [
        "Total time deposits of commercial banks + Post office savings",
        "Gold reserves of the government minus public debt",
        "Gross value of corporate equities traded on stock exchanges"
    ],
    "D",
    "1. High-Powered Money ($H$ or $M_0$, the Monetary Base) is the total liability of the monetary authority (RBI). It consists of Currency held by the public ($C$) plus Bank Reserves ($R$, vault cash and reserves held with RBI): $H = C + R$.\nHence, Option {{CORR}} is correct.",
    "Defines High-Powered Money."
)
add_q(make_question(CHAPTER, "Functions of Money", "What comprises 'High-Powered Money' (H or M0) in an economy?", opts, corr, sol))

# 9. Who issues one-rupee notes and coins in India?
opts, corr, sol = rotate_options(
    "Ministry of Finance, Government of India (signed by the Finance Secretary)",
    [
        "Reserve Bank of India (signed by the RBI Governor)",
        "State Bank of India (signed by the Chairman)",
        "Security Printing and Minting Corporation of India Ltd independently"
    ],
    "A",
    "1. In India, one-rupee currency notes and all fractional metallic coins are issued by the Ministry of Finance, Government of India (one-rupee notes bear the signature of the Finance Secretary). All other currency notes (Rs. 2, 5, 10, 20, 50, 100, 200, 500) are issued by the Reserve Bank of India.\nHence, Option {{CORR}} is correct.",
    "Identifies Ministry of Finance as issuer of 1-rupee note and coins."
)
add_q(make_question(CHAPTER, "Functions of Money", "In India, which authority issues the one-rupee currency note and all metallic coins?", opts, corr, sol))

# 10. M1 Money Supply definition
opts, corr, sol = rotate_options(
    "M1 = Currency held by public (C) + Net Demand Deposits with commercial banks (DD) + Other Deposits with RBI (OD)",
    [
        "M1 = Currency + Fixed Term Deposits + Post Office Savings",
        "M1 = Total Cash Reserves of RBI + Treasury Bills",
        "M1 = Net National Product at Market Price / Velocity of Money"
    ],
    "B",
    "1. $M_1$ is the narrowest and most liquid measure of money supply in India: $M_1 = C + DD + OD$.\nHence, Option {{CORR}} is correct.",
    "States M1 components."
)
add_q(make_question(CHAPTER, "Money Supply Measures", "What are the components of the M1 measure of money supply?", opts, corr, sol))

# 11. Net Demand Deposits vs Gross Demand Deposits
opts, corr, sol = rotate_options(
    "Net demand deposits exclude inter-bank claims and include only deposits of the public",
    [
        "Net demand deposits include inter-bank lending between commercial banks",
        "Net demand deposits subtract fixed term deposits from savings deposits",
        "Net demand deposits represent vault cash kept in RBI headquarters"
    ],
    "C",
    "1. Only deposits of the general public held in commercial banks are part of money supply. Inter-bank claims (deposits that commercial banks hold with each other) are excluded, which is why we use Net Demand Deposits.\nHence, Option {{CORR}} is correct.",
    "Explains exclusion of inter-bank deposits from M1."
)
add_q(make_question(CHAPTER, "Money Supply Measures", "Why are 'Net Demand Deposits' rather than 'Gross Demand Deposits' included in the money supply?", opts, corr, sol))

# 12. M3 Money Supply (Broad Money)
opts, corr, sol = rotate_options(
    "M3 = M1 + Net Time Deposits of Commercial Banks",
    [
        "M3 = M1 + Post Office Savings Bank Deposits",
        "M3 = M2 + Total Government Borrowings",
        "M3 = Currency in circulation * Money Multiplier"
    ],
    "D",
    "1. $M_3$ is the broad money measure widely monitored by the RBI for monetary targeting: $M_3 = M_1 + \\text{Net Time Deposits of commercial banks}$.\nHence, Option {{CORR}} is correct.",
    "Defines M3 as M1 + Time Deposits."
)
add_q(make_question(CHAPTER, "Money Supply Measures", "How is 'Broad Money' (M3) defined by the Reserve Bank of India?", opts, corr, sol))

# 13. M2 Money Supply
opts, corr, sol = rotate_options(
    "M2 = M1 + Savings Deposits with Post Office Savings Banks",
    [
        "M2 = M1 + Time Deposits of Commercial Banks",
        "M2 = Currency held by public + National Savings Certificates",
        "M2 = M3 - Gold Reserves of RBI"
    ],
    "A",
    "1. $M_2$ extends narrow money to include postal savings: $M_2 = M_1 + \\text{Savings deposits with Post Office savings banks}$.\nHence, Option {{CORR}} is correct.",
    "Defines M2."
)
add_q(make_question(CHAPTER, "Money Supply Measures", "What constitutes the M2 measure of money supply?", opts, corr, sol))

# 14. M4 Money Supply
opts, corr, sol = rotate_options(
    "M4 = M3 + Total Deposits with Post Office Savings Organisations (excluding National Savings Certificates)",
    [
        "M4 = M1 + Treasury Bills issued by Central Government",
        "M4 = M2 + Foreign Institutional Portfolio Investments",
        "M4 = Currency held by Public + Vault Cash of Private Banks"
    ],
    "B",
    "1. $M_4$ is the broadest money measure: $M_4 = M_3 + \\text{Total Post Office deposits (excluding NSC)}$.\nHence, Option {{CORR}} is correct.",
    "Defines M4."
)
add_q(make_question(CHAPTER, "Money Supply Measures", "What is included in the M4 measure of money supply?", opts, corr, sol))

# 15. Liquidity hierarchy among M1, M2, M3, M4
opts, corr, sol = rotate_options(
    "M1 > M2 > M3 > M4, with M1 being the most liquid and M4 being the least liquid",
    [
        "M4 > M3 > M2 > M1, with M4 being the most liquid",
        "M3 is the most liquid while M1 has zero liquidity",
        "All four measures have identical liquidity since all represent money"
    ],
    "C",
    "1. In terms of liquidity (ease of immediate spending): $M_1$ is the most liquid (cash + demand deposits). As we move to $M_2, M_3,$ and $M_4$, time deposits and post office term accounts are added, reducing liquidity. $M_4$ is the least liquid.\nHence, Option {{CORR}} is correct.",
    "Orders liquidity: M1 > M2 > M3 > M4."
)
add_q(make_question(CHAPTER, "Money Supply Measures", "What is the descending order of liquidity among the four monetary aggregates (M1, M2, M3, M4)?", opts, corr, sol))

# 16. Match Money Supply Measures
add_q(make_match_question(
    CHAPTER, "Money Supply Measures",
    "Match the monetary aggregates in List I with their composition in List II:",
    [
        ("A", "M1"),
        ("B", "M2"),
        ("C", "M3"),
        ("D", "M4")
    ],
    [
        ("I", "M1 + Post office savings bank deposits"),
        ("II", "M3 + Total post office deposits excluding NSC"),
        ("III", "Currency with public + Demand deposits + Other deposits with RBI"),
        ("IV", "M1 + Net time deposits of commercial banks")
    ],
    "A-(III), B-(I), C-(IV), D-(II)",
    [
        "A-(I), B-(III), C-(IV), D-(II)",
        "A-(III), B-(IV), C-(I), D-(II)",
        "A-(IV), B-(I), C-(II), D-(III)"
    ],
    "A",
    "1. M1 -> Currency + DD + OD (III).\n2. M2 -> M1 + Post office savings (I).\n3. M3 -> M1 + Time deposits (IV).\n4. M4 -> M3 + Total post office deposits (II).\nHence, Option A is correct."
))

# 17. Statement I & II: Money supply is a stock concept
add_q(make_statement_question(
    CHAPTER, "Money Supply Measures",
    "The money supply in an economy is a stock variable measured at a specific point in time.",
    "Money supply includes the cash reserves held by the central bank and the government.",
    "C",
    "1. Statement I is true: Money supply is total stock of money held by public at a point in time.\n2. Statement II is false: Cash held by the creators of money (Government and Banking System/RBI) is EXCLUDED from money supply because it is not in public circulation.\nHence, Statement I is true but Statement II is false (Option C)."
))

# 18. Assertion & Reason: Why creators' cash is excluded from Money Supply
add_q(make_assertion_question(
    CHAPTER, "Money Supply Measures",
    "Cash balances held by the central government and commercial banks are excluded from the official money supply.",
    "The government and the banking system are suppliers and creators of money, and counting their vault reserves would lead to circular double counting.",
    "A",
    "1. Assertion is true: Vault cash and government treasury balances are omitted from money supply.\n2. Reason is true: Money supply only measures money held by the public (money users), not money creators.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 19. Demand deposits definition
opts, corr, sol = rotate_options(
    "Deposits payable on demand by the bank through cheque, ATM, or transfer without any prior notice",
    [
        "Fixed deposits locked for five years with penalty for premature withdrawal",
        "Inter-bank loans borrowed by foreign financial institutions",
        "Deposits kept in government provident fund accounts"
    ],
    "B",
    "1. Demand deposits (current account and savings account deposits) are liabilities of commercial banks that can be withdrawn or transferred by the depositor at any time on demand without prior notification.\nHence, Option {{CORR}} is correct.",
    "Defines demand deposits."
)
add_q(make_question(CHAPTER, "Commercial Banking", "What are 'Demand Deposits'?", opts, corr, sol))

# 20. Time deposits (Fixed deposits) definition
opts, corr, sol = rotate_options(
    "Deposits lodged with the bank for a specified fixed maturity period, which cannot be withdrawn via cheques",
    [
        "Deposits payable on demand through ATM debit cards",
        "Currency notes held in household domestic lockers",
        "Subsidies disbursed to fertilizer manufacturers"
    ],
    "C",
    "1. Time deposits (Fixed / Recurring deposits) are deposited for a predetermined maturity term, earn higher interest, and cannot be drawn upon by cheque directly.\nHence, Option {{CORR}} is correct.",
    "Defines time deposits."
)
add_q(make_question(CHAPTER, "Commercial Banking", "How do 'Time Deposits' differ fundamentally from Demand Deposits?", opts, corr, sol))

# -------------------------------------------------------------------------------------------------
# 2. Credit Creation by Commercial Banks & Money Multiplier (Q21 - Q45)
# -------------------------------------------------------------------------------------------------

# 21. Money Multiplier (Credit Multiplier) formula
opts, corr, sol = rotate_options(
    "Money Multiplier (k) = 1 / Legal Reserve Ratio (1 / LRR)",
    [
        "Money Multiplier = 1 / Marginal Propensity to Consume",
        "Money Multiplier = Total Deposits * Cash Reserve Ratio",
        "Money Multiplier = 1 / (1 - LRR)"
    ],
    "D",
    "1. The Money Multiplier ($k$) is the reciprocal of the Legal Reserve Ratio ($LRR$): $k = \\frac{1}{LRR}$. It indicates how many times the total deposits will expand given an initial primary deposit.\nHence, Option {{CORR}} is correct.",
    "States Money Multiplier formula 1/LRR."
)
add_q(make_question(CHAPTER, "Credit Creation", "What is the mathematical formula for the Credit (Money) Multiplier?", opts, corr, sol))

# 22. Total Credit Creation formula
opts, corr, sol = rotate_options(
    "Total Deposit Creation = Initial Primary Deposit * (1 / LRR)",
    [
        "Total Deposit Creation = Initial Primary Deposit / Cash Reserve Ratio^2",
        "Total Deposit Creation = Initial Primary Deposit * High-Powered Money",
        "Total Deposit Creation = Initial Primary Deposit - LRR"
    ],
    "A",
    "1. Commercial banks create secondary credit through the banking multiplier: $\\text{Total Deposits} = \\text{Initial Cash Deposit} \\times \\frac{1}{LRR}$.\nHence, Option {{CORR}} is correct.",
    "States total credit creation formula."
)
add_q(make_question(CHAPTER, "Credit Creation", "How is the Total Credit created by the commercial banking system calculated?", opts, corr, sol))

# 23. Numerical Credit Creation: LRR = 20%
opts, corr, sol = rotate_options(
    "Rs. 5,000 crore (Credit multiplier = 5)",
    [
        "Rs. 2,000 crore (Credit multiplier = 2)",
        "Rs. 10,000 crore (Credit multiplier = 10)",
        "Rs. 1,200 crore (Credit multiplier = 1.2)"
    ],
    "B",
    "1. Given: Initial Primary Deposit = Rs. 1,000 crore, $LRR = 20\\% = 0.20$.\n2. $\\text{Money Multiplier } k = \\frac{1}{0.20} = 5$.\n3. $\\text{Total Deposit Creation} = 1,000 \\times 5 = \\text{Rs. 5,000 crore}$.\nHence, Option {{CORR}} is correct.",
    "Calculates total credit creation = 1000 * 5 = 5000 crore."
)
add_q(make_question(CHAPTER, "Credit Creation", "If an initial cash deposit of Rs. 1,000 crore is made into the banking system and the Legal Reserve Ratio (LRR) is 20%, what is the total amount of deposits created by the banks?", opts, corr, sol))

# 24. Numerical Secondary Credit (Derivative Deposits) generated
opts, corr, sol = rotate_options(
    "Rs. 4,000 crore",
    [
        "Rs. 5,000 crore",
        "Rs. 1,000 crore",
        "Rs. 200 crore"
    ],
    "C",
    "1. From previous calculation: Total Deposits = Rs. 5,000 crore.\n2. Initial Primary Deposit = Rs. 1,000 crore.\n3. Derivative / Secondary Credit Created = $\\text{Total Deposits} - \\text{Primary Deposit} = 5,000 - 1,000 = \\text{Rs. 4,000 crore}$.\nHence, Option {{CORR}} is correct.",
    "Calculates derivative deposits = 5000 - 1000 = 4000 crore."
)
add_q(make_question(CHAPTER, "Credit Creation", "In the previous problem (Initial deposit Rs. 1,000 cr, LRR 20%, Total deposits Rs. 5,000 cr), what is the net volume of secondary (derivative) credit created by commercial banks?", opts, corr, sol))

# 25. Numerical finding LRR from Money Multiplier
opts, corr, sol = rotate_options(
    "10%",
    [
        "5%",
        "20%",
        "1%"
    ],
    "D",
    "1. Given: Money Multiplier $k = 10$.\n2. $k = \\frac{1}{LRR} \\implies LRR = \\frac{1}{k} = \\frac{1}{10} = 0.10 = 10\\%$.\nHence, Option {{CORR}} is correct.",
    "Computes LRR = 1 / 10 = 10%."
)
add_q(make_question(CHAPTER, "Credit Creation", "If the money multiplier in an economy is 10, what is the value of the Legal Reserve Ratio (LRR)?", opts, corr, sol))

# 26. Sequence of credit creation process across rounds
add_q(make_sequence_question(
    CHAPTER, "Credit Creation",
    "Arrange the following rounds in the fractional reserve credit creation process following an initial deposit of Rs. 1,000 with LRR = 10%:",
    [
        "Bank A receives primary cash deposit of Rs. 1,000, keeps Rs. 100 as reserves, and loans out Rs. 900",
        "The loan of Rs. 900 is deposited in Bank B; Bank B keeps Rs. 90 (10%) and lends out Rs. 810",
        "The loan of Rs. 810 is deposited in Bank C; Bank C keeps Rs. 81 (10%) and lends out Rs. 729",
        "Successive rounds continue until total reserves accumulate to Rs. 1,000 and total deposits reach Rs. 10,000"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (C), (D)",
        "(A), (C), (B), (D)",
        "(C), (B), (A), (D)"
    ],
    "A",
    "1. Round 1: Deposit 1000, lend 900 (A) -> Round 2: Deposit 900, lend 810 (B) -> Round 3: Deposit 810, lend 729 (C) -> Terminal round: Deposits = 10,000 (D).\nHence, Option A is correct."
))

# 27. Assumptions of credit creation model
opts, corr, sol = rotate_options(
    "(i) The entire commercial banking system is treated as a single unit, and (ii) all transactions are routed through banks via cheques",
    [
        "(i) Banks hold 100% of deposits in cash vaults, and (ii) central bank charges zero repo rate",
        "(i) No customer ever withdraws money, and (ii) banks pay zero interest on savings",
        "(i) Money supply is backed 100% by physical gold reserves"
    ],
    "A",
    "1. The textbook credit creation model relies on two core assumptions:\n   (i) The banking system is consolidated into a single operating unit.\n   (ii) All monetary receipts and payments in the economy are routed through banks (no currency drain/cash leakage).\nHence, Option {{CORR}} is correct.",
    "States the two basic assumptions of credit creation."
)
add_q(make_question(CHAPTER, "Credit Creation", "Which two assumptions underlie the textbook mechanism of credit creation by commercial banks?", opts, corr, sol))

# 28. Cash drain / Currency leakage effect on multiplier
opts, corr, sol = rotate_options(
    "Reduces the credit multiplier and contracts the total credit creation capacity of banks",
    [
        "Increases the credit multiplier to infinity",
        "Has no impact on credit creation because banks print their own notes",
        "Causes commercial bank interest rates to drop to zero"
    ],
    "B",
    "1. If borrowers withdraw a portion of loans as cash currency rather than redepositing it in banks (cash drain/currency leakage), the base available for subsequent lending rounds shrinks, reducing the credit multiplier.\nHence, Option {{CORR}} is correct.",
    "Explains currency leakage reduces credit creation."
)
add_q(make_question(CHAPTER, "Credit Creation", "What is the impact of 'Cash Drain' (the public holding part of bank loans as physical cash) on the credit creation process?", opts, corr, sol))

# 29. Legal Reserve Ratio components
opts, corr, sol = rotate_options(
    "Cash Reserve Ratio (CRR) + Statutory Liquidity Ratio (SLR)",
    [
        "Repo Rate + Reverse Repo Rate",
        "Bank Rate + Marginal Standing Facility Rate",
        "Prime Lending Rate + Base Rate"
    ],
    "C",
    "1. In India, the Legal Reserve Ratio ($LRR$) mandated by the RBI is composed of two statutory ratios: Cash Reserve Ratio ($CRR$, held with RBI) and Statutory Liquidity Ratio ($SLR$, held by banks in specified liquid assets).\nHence, Option {{CORR}} is correct.",
    "States LRR = CRR + SLR."
)
add_q(make_question(CHAPTER, "Credit Creation", "In the Indian banking framework, what two regulatory reserve ratios constitute the Legal Reserve Ratio (LRR)?", opts, corr, sol))

# 30. Inverse relationship between LRR and Credit Creation
opts, corr, sol = rotate_options(
    "Higher LRR reduces the credit multiplier, contracting the credit creation capacity of banks",
    [
        "Higher LRR increases the credit multiplier, expanding bank loans",
        "LRR has zero effect on the volume of loans disbursed by banks",
        "Higher LRR forces commercial banks to merge with the central bank"
    ],
    "D",
    "1. Since Money Multiplier $k = 1/LRR$, an inverse relationship exists: when RBI raises LRR, banks must lock away a larger fraction of deposits in reserves, leaving less excess reserves for lending, contracting credit creation.\nHence, Option {{CORR}} is correct.",
    "Explains inverse relationship between LRR and credit creation."
)
add_q(make_question(CHAPTER, "Credit Creation", "How is the Legal Reserve Ratio (LRR) related to the credit creation capacity of commercial banks?", opts, corr, sol))

# -------------------------------------------------------------------------------------------------
# 3. Central Bank (RBI) Functions & Monetary Policy Instruments (Q31 - Q80)
# -------------------------------------------------------------------------------------------------

# 31. RBI establishment year and act
opts, corr, sol = rotate_options(
    "Established on 1st April 1935 under the Reserve Bank of India Act, 1934 (nationalized in 1949)",
    [
        "Established on 15th August 1947 under the Banking Regulation Act",
        "Established on 26th January 1950 by the Constitution of India",
        "Established on 1st January 1991 under the New Economic Policy"
    ],
    "A",
    "1. The Reserve Bank of India was set up on April 1, 1935, based on the recommendations of the Hilton Young Commission under the RBI Act, 1934. It was nationalized on January 1, 1949.\nHence, Option {{CORR}} is correct.",
    "Identifies RBI establishment in 1935 under RBI Act 1934."
)
add_q(make_question(CHAPTER, "Central Banking", "When was the Reserve Bank of India (RBI) established and under which legislative act?", opts, corr, sol))

# 32. Bank of Issue function
opts, corr, sol = rotate_options(
    "Sole monopoly right to issue currency notes in India, ensuring uniformity, public trust, and centralized control over money supply",
    [
        "Sole right to distribute consumer credit cards across commercial branches",
        "Power to issue equity shares on the Bombay Stock Exchange",
        "Authority to print foreign dollar bills for international trade"
    ],
    "B",
    "1. The Central Bank has the exclusive monopoly of issuing currency notes (except one-rupee notes/coins). This ensures uniformity of note circulation, maintains public confidence, and gives the central bank direct control over high-powered money.\nHence, Option {{CORR}} is correct.",
    "Explains Bank of Issue function."
)
add_q(make_question(CHAPTER, "Central Banking", "What is the rationale behind granting the Central Bank the exclusive monopoly as the 'Bank of Issue'?", opts, corr, sol))

# 33. Banker to the Government function
opts, corr, sol = rotate_options(
    "Acts as banker, agent, and financial adviser to the central and state governments, managing public accounts and public debt",
    [
        "Grants personal mortgages and auto loans to cabinet ministers",
        "Audits the corporate profit tax filings of private IT enterprises",
        "Finances municipal council election campaigns"
    ],
    "C",
    "1. As Banker to the Government, RBI manages government treasury receipts and payments, floats government loans/bonds (public debt management), and acts as economic and monetary adviser to the government.\nHence, Option {{CORR}} is correct.",
    "Describes Banker to the Government function."
)
add_q(make_question(CHAPTER, "Central Banking", "What responsibilities are fulfilled by the Central Bank under its role as 'Banker to the Government'?", opts, corr, sol))

# 34. Banker's Bank and Supervisor function
opts, corr, sol = rotate_options(
    "Maintains cash reserves of commercial banks, provides clearinghouse facilities, and regulates banking licenses and branch expansion",
    [
        "Fixes retail prices of consumer groceries across local markets",
        "Guarantees 100% annual dividends to private commercial bank shareholders",
        "Determines the daily wage rates of factory industrial workers"
    ],
    "D",
    "1. As Banker's Bank, RBI holds statutory cash reserves of commercial banks, provides inter-bank cheque clearance (clearinghouse), supervises liquidity and capital adequacy, and inspects commercial banks under the Banking Regulation Act, 1949.\nHence, Option {{CORR}} is correct.",
    "Describes Banker's Bank and Supervisor function."
)
add_q(make_question(CHAPTER, "Central Banking", "How does the Central Bank function as the 'Banker's Bank and Supervisor'?", opts, corr, sol))

# 35. Lender of Last Resort function
opts, corr, sol = rotate_options(
    "Providing emergency financial accommodation/liquidity to solvent commercial banks facing sudden cash shortages or bank runs",
    [
        "Granting emergency subsidies to agricultural exporters during droughts",
        "Providing student loans to university applicants rejected by private banks",
        "Bailing out bankrupt foreign sovereign governments"
    ],
    "A",
    "1. When a commercial bank experiences a liquidity crisis (bank run) and cannot raise funds from the inter-bank market, the Central Bank acts as the 'Lender of Last Resort', lending against eligible securities to prevent bank failure and systemic collapse.\nHence, Option {{CORR}} is correct.",
    "Defines Lender of Last Resort."
)
add_q(make_question(CHAPTER, "Central Banking", "What is the role of the Central Bank as the 'Lender of Last Resort'?", opts, corr, sol))

# 36. Custodian of Foreign Exchange Reserves
opts, corr, sol = rotate_options(
    "Holding and managing the country's official reserves of gold, foreign currencies, and SDRs, intervening to stabilize exchange rates",
    [
        "Mandating that all foreign tourists convert 100% of their savings into rupees",
        "Prohibiting Indian citizens from traveling overseas for higher education",
        "Fixing the global price of crude oil in international spot markets"
    ],
    "B",
    "1. The RBI is the custodian of the country's external reserves (gold, foreign currency assets, Special Drawing Rights). It uses these reserves to maintain stability in the external value of the Indian rupee via managed floating.\nHence, Option {{CORR}} is correct.",
    "Explains Custodian of Foreign Exchange Reserves."
)
add_q(make_question(CHAPTER, "Central Banking", "What does the Central Bank do in its role as 'Custodian of Foreign Exchange Reserves'?", opts, corr, sol))

# 37. Bank Rate definition
opts, corr, sol = rotate_options(
    "The standard rate at which the Central Bank extends long-term loans and discounts commercial bills of exchange without requiring collateral",
    [
        "The interest rate charged by commercial banks on consumer credit cards",
        "The rate paid by the government on National Savings Certificates",
        "The penalty rate charged by municipal authorities on property tax defaults"
    ],
    "C",
    "1. Bank Rate (also known as the discount rate) is the official interest rate at which the Central Bank is prepared to buy or rediscount bills of exchange and extend long-term credit to commercial banks without collateral securities.\nHence, Option {{CORR}} is correct.",
    "Defines Bank Rate."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "What is the 'Bank Rate'?", opts, corr, sol))

# 38. Repo Rate (Repurchase Rate) definition
opts, corr, sol = rotate_options(
    "The short-term interest rate at which the Central Bank lends money to commercial banks against the pledge of government securities",
    [
        "The rate at which commercial banks lend to their most creditworthy corporate borrowers",
        "The annual dividend declared by public sector insurance companies",
        "The penalty rate charged on premature fixed deposit withdrawal"
    ],
    "D",
    "1. Repo Rate (Repurchase Option rate) is the key policy benchmark rate at which commercial banks borrow short-term funds (overnight or term repo) from the RBI against the collateral of approved government securities, with an agreement to repurchase them.\nHence, Option {{CORR}} is correct.",
    "Defines Repo Rate."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "What is the 'Repo Rate' in modern Indian monetary policy?", opts, corr, sol))

# 39. Reverse Repo Rate definition
opts, corr, sol = rotate_options(
    "The interest rate at which the Central Bank absorbs liquidity by borrowing funds from commercial banks against government securities",
    [
        "The interest rate charged by commercial banks on personal vehicle loans",
        "The discount rate applied to corporate export promissory notes",
        "The exchange rate between the Indian rupee and the US dollar"
    ],
    "A",
    "1. Reverse Repo Rate is the rate at which the RBI absorbs surplus liquidity from commercial banks: commercial banks park their excess cash balances with the RBI and earn interest.\nHence, Option {{CORR}} is correct.",
    "Defines Reverse Repo Rate."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "What is the 'Reverse Repo Rate'?", opts, corr, sol))

# 40. Standing Deposit Facility (SDF) nuance
opts, corr, sol = rotate_options(
    "A collateral-free liquidity absorption tool allowing the RBI to absorb surplus funds from banks without pledging government securities",
    [
        "A statutory reserve ratio requiring 50% gold backing for currency notes",
        "A government subsidy scheme for rural cooperative warehousing",
        "A mandatory insurance scheme covering corporate export defaults"
    ],
    "B",
    "1. Introduced in 2022, the Standing Deposit Facility (SDF) allows the RBI to absorb uncollateralized overnight liquidity from banks, overcoming the constraint of limited government securities needed under traditional Reverse Repo.\nHence, Option {{CORR}} is correct.",
    "Explains collateral-free feature of SDF."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "How does the 'Standing Deposit Facility' (SDF) differ from the traditional Reverse Repo window?", opts, corr, sol))

# 41. Cash Reserve Ratio (CRR) definition
opts, corr, sol = rotate_options(
    "The minimum percentage of Net Demand and Time Liabilities (NDTL) that commercial banks must keep in cash with the RBI",
    [
        "The proportion of bank deposits invested in corporate equity shares",
        "The cash buffer kept in the commercial bank's own branch ATM machines",
        "The percentage of total loans reserved exclusively for priority agriculture"
    ],
    "C",
    "1. CRR is the statutory minimum fraction of a commercial bank's total deposits (NDTL) that must be maintained as cash balances with the Reserve Bank of India. RBI pays zero interest on CRR balances.\nHence, Option {{CORR}} is correct.",
    "Defines Cash Reserve Ratio (CRR)."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "What is the 'Cash Reserve Ratio' (CRR)?", opts, corr, sol))

# 42. Statutory Liquidity Ratio (SLR) definition
opts, corr, sol = rotate_options(
    "The minimum percentage of NDTL that commercial banks must maintain within themselves in specified liquid assets (cash, gold, unencumbered govt securities)",
    [
        "The percentage of bank profits transferred to the Prime Minister's Relief Fund",
        "The ratio of corporate loans to personal household loans",
        "The statutory minimum wage paid to bank clerical staff"
    ],
    "D",
    "1. SLR requires commercial banks to maintain a designated percentage of their Net Demand and Time Liabilities (NDTL) in liquid assets—namely, vault cash, gold reserves, and unencumbered government and other approved securities.\nHence, Option {{CORR}} is correct.",
    "Defines Statutory Liquidity Ratio (SLR)."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "What is the 'Statutory Liquidity Ratio' (SLR)?", opts, corr, sol))

# 43. CRR vs SLR key difference
opts, corr, sol = rotate_options(
    "CRR is kept in cash with the RBI, whereas SLR is maintained by banks with themselves in liquid assets and securities",
    [
        "CRR is maintained in gold while SLR is maintained in foreign currency notes",
        "CRR is voluntary while SLR is legally mandatory",
        "CRR applies to foreign banks while SLR applies only to regional rural banks"
    ],
    "A",
    "1. Key difference: CRR funds are physically deposited in cash with the RBI. SLR assets are held by the commercial banks themselves in liquid form (cash, gold, government bonds) and earn interest/coupon yields.\nHence, Option {{CORR}} is correct.",
    "Contrasts CRR (with RBI) with SLR (with banks themselves)."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "What is the primary operational distinction between CRR and SLR?", opts, corr, sol))

# 44. Open Market Operations (OMO) definition
opts, corr, sol = rotate_options(
    "The outright purchase and sale of government securities by the Central Bank in the open market to regulate liquidity",
    [
        "The auctioning of import licenses to private corporate conglomerates",
        "The opening of new commercial bank branches in unbanked rural districts",
        "The trading of agricultural commodities in open village mandis"
    ],
    "B",
    "1. Open Market Operations (OMO) refers to the buying and selling of government bonds and treasury bills by the RBI in the open secondary financial market to expand or contract commercial bank reserves and public liquidity.\nHence, Option {{CORR}} is correct.",
    "Defines Open Market Operations."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "What are 'Open Market Operations' (OMO) conducted by the Central Bank?", opts, corr, sol))

# 45. OMO to control Inflation (Excess Demand)
opts, corr, sol = rotate_options(
    "RBI sells government securities in the open market, absorbing liquidity and reducing bank reserves",
    [
        "RBI purchases government securities, injecting cash into the commercial banking system",
        "RBI reduces the Cash Reserve Ratio to zero",
        "RBI encourages commercial banks to expand consumer credit cards"
    ],
    "C",
    "1. During inflation (excess demand), the RBI sells government securities. Commercial banks and the public purchase these securities, paying the RBI with bank deposits. This drains cash reserves, reducing the credit creation capacity of banks and cooling inflation.\nHence, Option {{CORR}} is correct.",
    "Explains selling securities to curb inflation."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "How does the Central Bank utilize Open Market Operations to curb inflationary pressures in the economy?", opts, corr, sol))

# 46. OMO to combat Deflation / Recession (Deficient Demand)
opts, corr, sol = rotate_options(
    "RBI purchases government securities from the open market, injecting liquidity and expanding bank lending capacity",
    [
        "RBI sells massive quantities of government bonds to the public",
        "RBI sharply raises the Repo Rate and Bank Rate",
        "RBI increases the Statutory Liquidity Ratio to 40%"
    ],
    "D",
    "1. During a recession or deflation (deficient demand), the RBI buys government securities from banks and the public, crediting their accounts with fresh cash reserves. This expands credit availability and stimulates aggregate demand.\nHence, Option {{CORR}} is correct.",
    "Explains purchasing securities to combat deflation."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "To stimulate economic activity and combat a recession, what action does the Central Bank take under Open Market Operations?", opts, corr, sol))

# 47. Margin Requirement definition (Qualitative Instrument)
opts, corr, sol = rotate_options(
    "The difference between the current market value of the collateral security and the loan amount sanctioned against it",
    [
        "The profit margin earned by commercial banks on corporate foreign exchange transactions",
        "The commission charged by bank branches for issuing demand drafts",
        "The spread between savings account interest rate and fixed deposit interest rate"
    ],
    "A",
    "1. Margin Requirement is a qualitative credit control tool: $\\text{Margin} = \\text{Market value of collateral} - \\text{Loan amount sanctioned}$. If margin is 30%, a borrower pledging collateral worth Rs. 100 receives a loan of Rs. 70.\nHence, Option {{CORR}} is correct.",
    "Defines margin requirement."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "What is the 'Margin Requirement' on bank loans?", opts, corr, sol))

# 48. Margin Requirement adjustment to control Inflation
opts, corr, sol = rotate_options(
    "RBI raises the margin requirement, reducing the borrowing capacity against collateral and contracting credit",
    [
        "RBI lowers the margin requirement to zero, making loans fully unsecured",
        "RBI abolishes collateral requirements for all speculative real estate transactions",
        "RBI allows commercial banks to accept promissory notes without valuation"
    ],
    "B",
    "1. To curb inflation and speculative borrowing, the RBI raises margin requirements (e.g. from 20% to 40%). Borrowers receive less loan for the same collateral, discouraging borrowing and curtailing credit.\nHence, Option {{CORR}} is correct.",
    "Explains raising margin requirement to curb credit."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "How does the Central Bank adjust Margin Requirements to control inflation in speculative asset markets?", opts, corr, sol))

# 49. Moral Suasion definition (Qualitative Instrument)
opts, corr, sol = rotate_options(
    "Persuasion, informal counseling, and directives issued by the Central Bank to commercial banks to align with monetary policy goals",
    [
        "A formal criminal prosecution initiated against bank board members",
        "A nationwide television advertising campaign urging consumers to avoid credit cards",
        "A statutory fine levied on banks failing to maintain the CRR"
    ],
    "C",
    "1. Moral Suasion is a qualitative tool involving psychological persuasion, periodic governor meetings, circulars, and informal advice by the Central Bank urging commercial banks to restrain credit for speculative sectors or expand priority lending.\nHence, Option {{CORR}} is correct.",
    "Defines Moral Suasion."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "What is 'Moral Suasion' in central banking practice?", opts, corr, sol))

# 50. Selective Credit Control (Direct Action)
opts, corr, sol = rotate_options(
    "Rationing of credit and setting sector-specific loan ceilings for speculative, sensitive agricultural commodities",
    [
        "Mandating identical loan interest rates across all manufacturing corporations",
        "Prohibiting commercial banks from accepting foreign exchange deposits",
        "Instructing commercial banks to lend exclusively to public sector enterprises"
    ],
    "D",
    "1. Under Selective Credit Controls, the RBI issues directives fixing credit quotas, minimum margins, or maximum lending limits for specific sensitive commodities (foodgrains, oilseeds, cotton) to prevent hoarding and price manipulation.\nHence, Option {{CORR}} is correct.",
    "Explains Selective Credit Controls."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "How do 'Selective Credit Controls' operate in managing commodity price volatility?", opts, corr, sol))

# 51. Quantitative vs Qualitative instruments
opts, corr, sol = rotate_options(
    "Quantitative tools regulate the total overall volume of credit, while qualitative tools regulate the direction and allocation of credit to specific sectors",
    [
        "Quantitative tools are voluntary while qualitative tools are legally mandatory",
        "Quantitative tools apply to agriculture while qualitative apply to industry",
        "Quantitative tools are used by commercial banks while qualitative are used by the finance ministry"
    ],
    "A",
    "1. Quantitative (general) tools (Bank Rate, Repo, CRR, SLR, OMO) regulate the overall quantum and cost of credit across the entire economy. Qualitative (selective) tools (margins, moral suasion, credit rationing) channel credit to desired sectors and restrict it in speculative uses.\nHence, Option {{CORR}} is correct.",
    "Distinguishes quantitative (overall volume) from qualitative (direction/allocation)."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "What is the essential distinction between Quantitative and Qualitative instruments of monetary policy?", opts, corr, sol))

# 52. Monetary Policy action during Inflation (Excess Demand / Inflationary Gap)
opts, corr, sol = rotate_options(
    "Increase Repo Rate, increase Bank Rate, increase CRR and SLR, sell government securities via OMO (Dear Money Policy)",
    [
        "Decrease Repo Rate, decrease CRR, buy government securities via OMO",
        "Decrease margin requirements and reduce statutory reserve ratios",
        "Encourage commercial banks to lower lending rates to households"
    ],
    "B",
    "1. To combat inflation (excess demand), the Central Bank adopts a 'Dear/Tight Money Policy': raises policy rates (Repo, Bank Rate), raises reserve ratios (CRR, SLR), raises margins, and sells government securities via OMO to drain liquidity.\nHence, Option {{CORR}} is correct.",
    "Outlines contractionary monetary policy tools during inflation."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "Which comprehensive set of monetary policy measures will the Reserve Bank of India deploy to control inflation?", opts, corr, sol))

# 53. Monetary Policy action during Deflation / Recession (Deficient Demand)
opts, corr, sol = rotate_options(
    "Reduce Repo Rate, reduce Bank Rate, reduce CRR and SLR, buy government securities via OMO (Cheap Money Policy)",
    [
        "Increase Repo Rate, increase CRR, sell government securities via OMO",
        "Increase margin requirements and ration commercial bank loans",
        "Prohibit commercial banks from lending to small businesses"
    ],
    "C",
    "1. To combat deflation or recession (deficient demand), the Central Bank adopts an 'Easy/Cheap Money Policy': cuts policy rates (Repo, Bank Rate), cuts reserve ratios (CRR, SLR), lowers margins, and buys government securities via OMO to inject reserves.\nHence, Option {{CORR}} is correct.",
    "Outlines expansionary monetary policy tools during deflation."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "What monetary policy package will the Central Bank adopt to correct deficient demand (deflationary gap)?", opts, corr, sol))

# 54. Repo Rate hike mechanism on commercial banks
opts, corr, sol = rotate_options(
    "Increases the cost of borrowing for commercial banks, compelling them to raise their retail lending rates, which reduces borrowing demand",
    [
        "Decreases borrowing costs for commercial banks, encouraging them to disburse more loans",
        "Forces commercial banks to transfer all customer deposits to the treasury",
        "Causes all commercial bank branches to shut down operations"
    ],
    "D",
    "1. When RBI hikes the Repo Rate, borrowing from the central bank becomes costlier for commercial banks. Commercial banks pass this cost on by raising their marginal cost of funds lending rate (MCLR), increasing loan EMIs and curtailing public credit demand.\nHence, Option {{CORR}} is correct.",
    "Traces repo hike transmission through commercial bank lending rates."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "How does an increase in the Repo Rate by the RBI transmit to the broader economy to curb credit growth?", opts, corr, sol))

# 55. Demonetisation of 2016 in India
opts, corr, sol = rotate_options(
    "Withdrawal of the legal tender status of existing Rs. 500 and Rs. 1,000 currency notes on 8th November 2016",
    [
        "The nationalization of 14 private commercial banks in 1969",
        "The introduction of the Goods and Services Tax in July 2017",
        "The devaluation of the Indian rupee under IMF guidelines in 1991"
    ],
    "A",
    "1. On November 8, 2016, the Government of India demonetized high-denomination currency notes of Rs. 500 and Rs. 1,000 (representing 86% of cash in circulation) to tackle black money, counterfeit currency, corruption, and promote digitization.\nHence, Option {{CORR}} is correct.",
    "Identifies demonetisation on 8 Nov 2016."
)
add_q(make_question(CHAPTER, "Money Supply Measures", "What was the core action of the 'Demonetisation' initiative announced by the Government of India in November 2016?", opts, corr, sol))

# 56. Economic objectives of Demonetisation 2016
opts, corr, sol = rotate_options(
    "Eliminating counterfeit notes, tackling black money and terror financing, and promoting a formal digital payment ecosystem",
    [
        "Doubling the fiscal deficit of the central government",
        "Encouraging citizens to store their wealth exclusively in physical cash notes",
        "Abolishing commercial banks in favour of traditional barter exchanges"
    ],
    "B",
    "1. The stated economic objectives of the 2016 demonetisation were to curb black money generated through unaccounted cash, choke counterfeit currency networks and terrorism funding, broaden the tax base, and accelerate digital payments.\nHence, Option {{CORR}} is correct.",
    "Lists objectives of Demonetisation."
)
add_q(make_question(CHAPTER, "Money Supply Measures", "Which set of economic objectives drove the demonetisation policy of November 2016 in India?", opts, corr, sol))

# 57. Match Central Bank Instruments with Classification
add_q(make_match_question(
    CHAPTER, "Monetary Policy Instruments",
    "Match the monetary policy instruments in List I with their category in List II:",
    [
        ("A", "Open Market Operations (OMO)"),
        ("B", "Margin Requirements"),
        ("C", "Cash Reserve Ratio (CRR)"),
        ("D", "Moral Suasion")
    ],
    [
        ("I", "Qualitative Instrument"),
        ("II", "Quantitative Instrument"),
        ("III", "Quantitative Instrument"),
        ("IV", "Qualitative Instrument")
    ],
    "A-(II), B-(I), C-(III), D-(IV)",
    [
        "A-(I), B-(II), C-(III), D-(IV)",
        "A-(II), B-(IV), C-(I), D-(III)",
        "A-(III), B-(I), C-(II), D-(IV)"
    ],
    "A",
    "1. OMO -> Quantitative (II).\n2. Margin Requirements -> Qualitative (I).\n3. CRR -> Quantitative (III).\n4. Moral Suasion -> Qualitative (IV).\nHence, Option A is correct."
))

# 58. Statement I & II: High-Powered money vs Money supply
add_q(make_statement_question(
    CHAPTER, "Money Supply Measures",
    "High-Powered Money serves as the monetary base upon which the commercial banking system expands the total money supply.",
    "The total money supply (M1) is strictly equal to the total stock of High-Powered Money.",
    "C",
    "1. Statement I is true: High-powered money ($H$) is the reserve base; credit multiplier generates multiple deposits on top of $H$.\n2. Statement II is false: Money supply ($M_1 = C + DD$) is substantially GREATER than High-Powered Money ($H = C + R$) because credit multiplier $k > 1$.\nHence, Statement I is true but Statement II is false (Option C)."
))

# 59. Assertion & Reason: Why RBI is lender of last resort
add_q(make_assertion_question(
    CHAPTER, "Central Banking",
    "The Central Bank acts as the Lender of Last Resort to preserve public confidence in the banking system.",
    "By providing emergency liquidity to solvent banks experiencing liquidity runs, the Central Bank prevents bank panics from escalating into systemic financial collapse.",
    "A",
    "1. Assertion is true: Lender of last resort maintains banking confidence.\n2. Reason is true: Temporary emergency liquidity shields sound banks from run-induced insolvencies.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 60. Net Demand and Time Liabilities (NDTL) definition
opts, corr, sol = rotate_options(
    "Total demand and time deposits of the public held by a bank minus its deposits with other banks",
    [
        "The gross capital assets of a bank plus corporate equity shares",
        "Total loans disbursed minus customer repayment defaults",
        "Vault cash plus central bank gold bullion reserves"
    ],
    "D",
    "1. Net Demand and Time Liabilities (NDTL) is the base against which CRR and SLR are calculated: $\\text{NDTL} = (\\text{Demand Deposits} + \\text{Time Deposits} + \\text{Other Liabilities}) - \\text{Inter-bank Assets/Deposits}$.\nHence, Option {{CORR}} is correct.",
    "Defines NDTL."
)
add_q(make_question(CHAPTER, "Commercial Banking", "What is 'Net Demand and Time Liabilities' (NDTL) in the context of reserve ratio calculations?", opts, corr, sol))

# 61. Numerical CRR Calculation: Finding required cash reserves
opts, corr, sol = rotate_options(
    "Rs. 450 crore",
    [
        "Rs. 900 crore",
        "Rs. 45 crore",
        "Rs. 4,500 crore"
    ],
    "A",
    "1. Given: Bank's NDTL = Rs. 10,000 crore, Cash Reserve Ratio (CRR) = 4.5%.\n2. Required Cash Reserves with RBI = $10,000 \\times 0.045 = \\text{Rs. 450 crore}$.\nHence, Option {{CORR}} is correct.",
    "Calculates required CRR reserves = 10000 * 0.045 = 450 crore."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "A commercial bank has total Net Demand and Time Liabilities (NDTL) of Rs. 10,000 crore. If the RBI mandates a CRR of 4.5%, what minimum cash balance must the bank maintain with the RBI?", opts, corr, sol))

# 62. Numerical SLR Calculation: Finding liquid assets
opts, corr, sol = rotate_options(
    "Rs. 1,800 crore",
    [
        "Rs. 180 crore",
        "Rs. 3,600 crore",
        "Rs. 800 crore"
    ],
    "B",
    "1. Given: Bank's NDTL = Rs. 10,000 crore, Statutory Liquidity Ratio (SLR) = 18.0%.\n2. Required SLR Assets = $10,000 \\times 0.18 = \\text{Rs. 1,800 crore}$.\nHence, Option {{CORR}} is correct.",
    "Computes required SLR assets = 10000 * 0.18 = 1800 crore."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "If a bank's NDTL is Rs. 10,000 crore and the Statutory Liquidity Ratio (SLR) is fixed at 18%, what total value of specified liquid assets must the bank hold?", opts, corr, sol))

# 63. Monetary Policy Committee (MPC) in India
opts, corr, sol = rotate_options(
    "A 6-member statutory committee chaired by the RBI Governor that sets the benchmark policy Repo Rate to maintain inflation targets",
    [
        "A parliamentary committee that reviews central government tax revenues",
        "A committee of commercial bank chairpersons setting mortgage interest rates",
        "A tribunal resolving consumer credit card fraud cases"
    ],
    "C",
    "1. The Monetary Policy Committee (MPC), established under the amended RBI Act in 2016, consists of 6 members (3 from RBI including the Governor who holds casting vote, and 3 external government-appointed experts). It determines the policy Repo Rate to achieve the inflation target ($4\\% \\pm 2\\%$).\nHence, Option {{CORR}} is correct.",
    "Defines the Monetary Policy Committee (MPC)."
)
add_q(make_question(CHAPTER, "Central Banking", "What is the role and composition of the 'Monetary Policy Committee' (MPC) in India?", opts, corr, sol))

# 64. Flexible Inflation Targeting framework in India
opts, corr, sol = rotate_options(
    "Targeting Consumer Price Index (CPI) inflation at 4% with a tolerance band of +/- 2% (2% to 6%)",
    [
        "Targeting Wholesale Price Index (WPI) inflation at zero percent strictly",
        "Targeting GDP growth at 10% regardless of price movements",
        "Targeting foreign exchange reserves at 1 trillion dollars"
    ],
    "D",
    "1. Under the monetary policy agreement between Government of India and RBI, the statutory inflation target is 4% CPI inflation with an allowable tolerance band of 2% to 6%.\nHence, Option {{CORR}} is correct.",
    "States 4% +/- 2% CPI inflation targeting band."
)
add_q(make_question(CHAPTER, "Central Banking", "What is India's official 'Flexible Inflation Targeting' mandate given to the Reserve Bank of India?", opts, corr, sol))

# 65. Central Bank currency issue backing: Minimum Reserve System
opts, corr, sol = rotate_options(
    "Maintains a minimum statutory reserve of Rs. 200 crore (at least Rs. 115 crore in gold and Rs. 85 crore in foreign currencies) regardless of note volume",
    [
        "Backs 100% of every currency note with equivalent gold coins in central vaults",
        "Prints currency notes strictly equal to annual agricultural wheat production",
        "Maintains zero reserves and prints notes based on commercial bank requests"
    ],
    "A",
    "1. In India, note issue is governed by the 'Minimum Reserve System' (adopted in 1956). The RBI is required to maintain a minimum backing of Rs. 200 crore in assets, of which at least Rs. 115 crore must be in gold bullion/coins and the remainder in foreign securities, enabling flexible note issuance.\nHence, Option {{CORR}} is correct.",
    "Explains Minimum Reserve System of note issue."
)
add_q(make_question(CHAPTER, "Central Banking", "Under which system does the Reserve Bank of India issue currency notes in India?", opts, corr, sol))

# 66. Clearinghouse function of Central Bank
opts, corr, sol = rotate_options(
    "Settling mutual claims and inter-bank cheque debits/credits through book entries among commercial bank accounts kept with the central bank",
    [
        "Destroying soiled and counterfeit currency notes through automated incinerators",
        "Liquidating insolvent non-banking financial companies",
        "Auditing commercial bank corporate income tax returns"
    ],
    "B",
    "1. As all commercial banks maintain accounts with the RBI, inter-bank claims resulting from daily cheque collections across banks are easily cleared by simple transfer book entries between their respective RBI accounts, minimizing physical cash movement.\nHence, Option {{CORR}} is correct.",
    "Explains Clearinghouse function."
)
add_q(make_question(CHAPTER, "Central Banking", "How does the Central Bank execute its 'Clearinghouse' function for commercial banks?", opts, corr, sol))

# 67. Liquidity Adjustment Facility (LAF)
opts, corr, sol = rotate_options(
    "A monetary policy framework through which the RBI manages day-to-day liquidity mismatches via Repo and Reverse Repo auctions",
    [
        "A scheme providing interest-free emergency loans to rural panchayats",
        "A facility for households to exchange damaged banknotes at railway stations",
        "A government department responsible for nationalizing distressed private banks"
    ],
    "C",
    "1. The Liquidity Adjustment Facility (LAF) allows commercial banks to adjust day-to-day liquidity fluctuations by borrowing from RBI under Repo or parking surplus funds with RBI under Reverse Repo / SDF.\nHence, Option {{CORR}} is correct.",
    "Defines Liquidity Adjustment Facility (LAF)."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "What is the 'Liquidity Adjustment Facility' (LAF) operated by the RBI?", opts, corr, sol))

# 68. Marginal Standing Facility (MSF)
opts, corr, sol = rotate_options(
    "A penal window allowing commercial banks to borrow overnight funds from RBI by dipping into their SLR securities portfolio up to a specified limit",
    [
        "A window for individual citizens to deposit gold directly with the central bank",
        "A concession granted to micro-enterprises to evade corporate income taxes",
        "A permanent facility to bail out defaulting foreign sovereign nations"
    ],
    "D",
    "1. Marginal Standing Facility (MSF) allows scheduled commercial banks to borrow emergency overnight funds from RBI against their SLR securities (which they cannot pledge under regular repo) at a penal rate higher than the Repo Rate.\nHence, Option {{CORR}} is correct.",
    "Defines Marginal Standing Facility (MSF)."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "What is the 'Marginal Standing Facility' (MSF) in RBI's monetary operations?", opts, corr, sol))

# 69. Policy Corridor in monetary policy
opts, corr, sol = rotate_options(
    "The interest rate band between the Standing Deposit Facility (SDF) rate at the floor and the MSF rate at the ceiling, with the Repo Rate in between",
    [
        "The physical corridor connecting the Finance Ministry with the RBI headquarters",
        "The difference between corporate export revenues and import tariffs",
        "The statutory limit on central government fiscal deficit under FRBM Act"
    ],
    "A",
    "1. The operating policy corridor of the RBI is bounded by the Standing Deposit Facility (SDF) rate at the lower end (floor) and the Marginal Standing Facility (MSF) rate at the upper end (ceiling), with the policy Repo Rate positioned in the middle.\nHence, Option {{CORR}} is correct.",
    "Defines the policy corridor (SDF to MSF)."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "What constitutes the 'Operating Policy Corridor' of interest rates maintained by the RBI?", opts, corr, sol))

# 70. Bank Run definition
opts, corr, sol = rotate_options(
    "A panic situation where a large number of depositors withdraw their cash deposits simultaneously due to fears of bank insolvency",
    [
        "A promotional marathon sponsored by commercial banks to encourage digital savings",
        "A scenario where commercial banks lend 100% of their assets to a single corporate borrower",
        "An automated computer virus disabling electronic inter-bank transfers"
    ],
    "B",
    "1. A Bank Run occurs when depositors lose faith in a bank's financial stability and rush to withdraw their deposits simultaneously. Because banks practice fractional reserve banking, no bank can pay all depositors at once, leading to collapse without central bank intervention.\nHence, Option {{CORR}} is correct.",
    "Defines a bank run."
)
add_q(make_question(CHAPTER, "Commercial Banking", "What is a 'Bank Run'?", opts, corr, sol))

# 71. Deposit Insurance in India (DICGC)
opts, corr, sol = rotate_options(
    "Deposit Insurance and Credit Guarantee Corporation (DICGC), insuring bank deposits up to Rs. 5 lakh per depositor per bank",
    [
        "Life Insurance Corporation of India (LIC), insuring up to Rs. 50 lakh",
        "Securities and Exchange Board of India (SEBI), guaranteeing equity investments",
        "State Bank of India directly guaranteeing all private sector bank deposits"
    ],
    "C",
    "1. The Deposit Insurance and Credit Guarantee Corporation (DICGC), a wholly-owned subsidiary of RBI, provides insurance cover of up to Rs. 5 lakh (principal + interest) per depositor across all accounts in a bank in the event of bank failure.\nHence, Option {{CORR}} is correct.",
    "Identifies DICGC and Rs. 5 lakh insurance limit."
)
add_q(make_question(CHAPTER, "Commercial Banking", "Which institution provides insurance protection to bank depositors in India and up to what statutory limit per depositor?", opts, corr, sol))

# 72. Primary Deposits vs Secondary Deposits
opts, corr, sol = rotate_options(
    "Primary deposits arise from actual cash deposited by the public, while secondary (derivative) deposits are created when banks sanction loans",
    [
        "Primary deposits belong to corporations while secondary belong to individuals",
        "Primary deposits are non-refundable while secondary deposits can be withdrawn",
        "Primary deposits are held in post offices while secondary are held in the central bank"
    ],
    "D",
    "1. Primary deposits are cash funds deposited by customers into banks. Secondary (derivative) deposits are created by the banks themselves: when a bank grants a loan, it does not give cash; it creates a deposit account in the borrower's name.\nHence, Option {{CORR}} is correct.",
    "Distinguishes primary cash deposits from derivative loan deposits."
)
add_q(make_question(CHAPTER, "Credit Creation", "What is the distinction between 'Primary Deposits' and 'Secondary (Derivative) Deposits'?", opts, corr, sol))

# 73. Why loans create deposits: Sayings in banking
opts, corr, sol = rotate_options(
    "'Loans create deposits and deposits create loans', reflecting the reciprocal mechanism of fractional reserve credit expansion",
    [
        "Loans automatically reduce total money supply in the economy",
        "Deposits can only be created by printing physical legal tender notes",
        "Bank loans require 100% gold bullion backing under commercial law"
    ],
    "A",
    "1. As noted by English economist Hartley Withers, 'Loans create deposits': every time a commercial bank advances a loan, it opens a credit deposit account for the borrower, expanding bank deposits and money supply.\nHence, Option {{CORR}} is correct.",
    "Explains Hartley Withers's dictum that loans create deposits."
)
add_q(make_question(CHAPTER, "Credit Creation", "Which fundamental principle captures the essence of commercial bank credit expansion?", opts, corr, sol))

# 74. Effect of raising CRR on Money Multiplier
opts, corr, sol = rotate_options(
    "Reduces the value of the money multiplier and contracts the credit creation potential of banks",
    [
        "Increases the money multiplier and expands bank loans",
        "Leaves the money multiplier unchanged while doubling bank profits",
        "Eliminates the distinction between M1 and M3"
    ],
    "B",
    "1. When the RBI increases the CRR (e.g. from 4% to 6%), the Legal Reserve Ratio rises, reducing the money multiplier ($k = 1/LRR$) and diminishing the volume of secondary credit banks can create.\nHence, Option {{CORR}} is correct.",
    "Shows higher CRR lowers money multiplier."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "What is the consequence of an increase in the Cash Reserve Ratio (CRR) on the money multiplier?", opts, corr, sol))

# 75. Sequence of Repo Rate cut transmission
add_q(make_sequence_question(
    CHAPTER, "Monetary Policy Instruments",
    "Arrange the following steps showing how a Repo Rate cut by the RBI stimulates macroeconomic output:",
    [
        "RBI announces a reduction in the benchmark Repo Rate in its monetary policy statement",
        "Commercial banks access cheaper short-term funds and lower their retail lending rates (MCLR)",
        "Cheaper loan rates stimulate household consumption (auto/housing) and corporate business investment",
        "Aggregate demand increases, expanding economic output and employment"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (C), (D)",
        "(A), (C), (B), (D)",
        "(C), (A), (B), (D)"
    ],
    "A",
    "1. Repo cut announced (A) -> Commercial banks lower lending rates (B) -> Investment and consumption borrowing expands (C) -> Aggregate demand and output rise (D).\nHence, Option A is correct."
))

# 76. Difference between Bank Rate and Repo Rate
opts, corr, sol = rotate_options(
    "Repo rate is for short-term lending against collateral of government securities, while Bank rate is for long-term lending without collateral",
    [
        "Repo rate applies to commercial banks while Bank rate applies to the public",
        "Repo rate is qualitative while Bank rate is quantitative",
        "Bank rate is set by Parliament while Repo rate is set by commercial banks"
    ],
    "C",
    "1. Repo Rate is a short-term (overnight/term) secured lending rate where securities are pledged under a repurchase agreement. Bank Rate is a long-term discount rate without collateral securities.\nHence, Option {{CORR}} is correct.",
    "Distinguishes Repo Rate (short-term, collateralized) from Bank Rate (long-term, uncollateralized)."
)
add_q(make_question(CHAPTER, "Monetary Policy Instruments", "What is the fundamental difference between the 'Repo Rate' and the 'Bank Rate'?", opts, corr, sol))

# 77. Statement I & II: Barter vs Money economy
add_q(make_statement_question(
    CHAPTER, "Functions of Money",
    "In a barter economy, a transaction requires simultaneous buying and selling of commodities.",
    "Money separates the single barter transaction into two independent transactions: an act of sale and an act of purchase.",
    "A",
    "1. Statement I is true: In barter, one must sell and buy at the same time to the same person.\n2. Statement II is true: Money splits the single transaction into sale (Commodity $\\to$ Money) and purchase (Money $\\to$ Commodity) across time and space.\nHence, both statements are true (Option A)."
))

# 78. Assertion & Reason: Store of value in money
add_q(make_assertion_question(
    CHAPTER, "Functions of Money",
    "Money serves as a far superior store of value compared to perishable agricultural commodities.",
    "Money possesses general acceptability, negligible storage costs, and perfect liquidity, whereas physical commodities incur spoilage and high carrying costs.",
    "A",
    "1. Assertion is true: Money is a superior store of value.\n2. Reason is true: Liquidity and lack of physical deterioration make money ideal for storing purchasing power.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 79. Digital payments and money circulation
opts, corr, sol = rotate_options(
    "Increases the velocity of circulation of money, enabling fewer physical cash notes to support a larger volume of transactions",
    [
        "Forces the money multiplier to drop to zero permanently",
        "Causes all commercial banks to convert to barter exchanges",
        "Reduces national income by eliminating physical bank branches"
    ],
    "D",
    "1. Modern digital payment systems (UPI, NEFT, RTGS) increase the velocity of circulation of money (the number of times a unit of currency changes hands), allowing an economy to execute more transactions with less physical cash.\nHence, Option {{CORR}} is correct.",
    "Links digital payments to increased velocity of money."
)
add_q(make_question(CHAPTER, "Money Supply Measures", "How does the widespread adoption of digital payment systems (like UPI) affect the velocity of circulation of money?", opts, corr, sol))

# 80. Core mandate of Central Bank versus Commercial Bank
opts, corr, sol = rotate_options(
    "Central bank operates for macroeconomic stability and public welfare without profit motive, whereas commercial banks operate to maximize financial profits for shareholders",
    [
        "Central bank maximizes commercial profits while commercial banks provide free public utilities",
        "Both institutions share identical commercial profit maximization objectives",
        "Commercial banks control the currency note printing presses under central bank directives"
    ],
    "A",
    "1. Commercial banks are private or public corporate businesses driven by profit maximization (earning net interest margins between deposits and loans). The Central Bank is a public regulatory institution operating to ensure price stability, financial integrity, and economic growth without profit motives.\nHence, Option {{CORR}} is correct.",
    "Contrasts public welfare role of Central Bank with profit motive of Commercial Banks."
)
add_q(make_question(CHAPTER, "Central Banking", "How does the fundamental objective of the Central Bank differ from that of Commercial Banks?", opts, corr, sol))

# Verify count and uniqueness
assert len(questions) == 80, f"Expected 80 questions, got {len(questions)}"
print(f"Successfully generated {len(questions)} unique questions for Unit 7!")

out_path = "mock/eco_units/unit7.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
