import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.eco_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text
)

CHAPTER = "Government Budget and the Economy"
questions = []
seen = set()

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:80]}")
    seen.add(norm)
    questions.append(q)

print("Generating 60 unique questions for Unit 9: Government Budget and the Economy...")

# =================================================================================================
# 1. Budget Meaning, Objectives & Classification (Q1 - Q20)
# =================================================================================================

# 1. Government Budget definition
opts, corr, sol = rotate_options(
    "An annual financial statement detailing the estimated receipts and estimated expenditures of the government for the upcoming fiscal year",
    [
        "A record of the actual financial transactions conducted during the preceding calendar year",
        "A quarterly balance sheet published by the Reserve Bank of India on currency printing",
        "An official audit of commercial bank loans sanctioned to the private corporate sector"
    ],
    "A",
    "1. Under Article 112 of the Indian Constitution, the Government Budget (Annual Financial Statement) presents the estimated receipts and estimated expenditures of the government for the upcoming financial year (1st April to 31st March).\nHence, Option {{CORR}} is correct.",
    "Defines government budget as annual statement of estimated receipts and expenditures."
)
add_q(make_question(CHAPTER, "Budget Overview", "What is the primary definition and nature of the 'Government Budget' in India?", opts, corr, sol))

# 2. Objective: Reallocation of resources
opts, corr, sol = rotate_options(
    "Imposing heavy excise duties on demerit goods like tobacco while giving tax concessions and subsidies to solar energy",
    [
        "Borrowing from international agencies to pay pensions of government staff",
        "Privatizing profitable railway routes to reduce staff strength",
        "Distributing free cash to large multinational corporations"
    ],
    "B",
    "1. Through the objective of 'Reallocation of Resources', the government influences resource distribution to balance social welfare and profit. It discourages production of harmful/demerit goods (tobacco, alcohol) via heavy taxation and encourages socially desirable goods (khadi, renewable energy) via tax breaks and subsidies.\nHence, Option {{CORR}} is correct.",
    "Illustrates reallocation of resources through taxation and subsidies on demerit vs merit goods."
)
add_q(make_question(CHAPTER, "Budget Objectives", "Which government policy best exemplifies the budgetary objective of 'Reallocation of Resources'?", opts, corr, sol))

# 3. Objective: Reducing income inequalities
opts, corr, sol = rotate_options(
    "Levying progressive income tax on affluent citizens and funding targeted food subsidies and welfare schemes for the underprivileged",
    [
        "Abolishing personal income tax for billionaires and increasing sales tax on coarse grains",
        "Charging uniform flat user fees for public government hospital checkups",
        "Increasing interest rates on agricultural farm loans"
    ],
    "C",
    "1. To achieve the objective of 'Reducing Inequalities in Income and Wealth', the government adopts progressive taxation (higher tax rates on higher income brackets) and redirects this revenue toward social security, free healthcare, public education, and subsidies for low-income households.\nHence, Option {{CORR}} is correct.",
    "Links reduction of income inequalities to progressive taxation and welfare transfers."
)
add_q(make_question(CHAPTER, "Budget Objectives", "How does the Government Budget seek to achieve the objective of 'Reducing Inequalities of Income and Wealth'?", opts, corr, sol))

# 4. Objective: Economic stability
opts, corr, sol = rotate_options(
    "Adopting a surplus budget during inflationary boom and a deficit budget during economic recession",
    [
        "Maintaining a strictly fixed expenditure budget regardless of inflation or depression",
        "Shutting down state-owned enterprises during periods of monsoon failure",
        "Fixing private sector wage ceilings in all manufacturing sectors"
    ],
    "D",
    "1. The budgetary objective of 'Economic Stability' involves combating trade cycles. During inflation/excess demand, the government curbs spending and raises taxes (surplus budget). During deflation/recession, it boosts spending and cuts taxes (deficit budget) to stimulate aggregate demand.\nHence, Option {{CORR}} is correct.",
    "Explains economic stability via counter-cyclical budgetary policy."
)
add_q(make_question(CHAPTER, "Budget Objectives", "How does the government utilize budgetary policy to achieve 'Economic Stability' across business cycles?", opts, corr, sol))

# 5. Objective: Regional disparity reduction
opts, corr, sol = rotate_options(
    "Granting tax holidays, investment subsidies, and developing basic infrastructure in economically backward regions",
    [
        "Concentrating all public sector infrastructure projects in metropolitan cities",
        "Banning interstate transportation of manufactured consumer goods",
        "Increasing import tariffs on agricultural machinery in rural zones"
    ],
    "A",
    "1. To reduce regional disparities, the government provides fiscal incentives such as tax holidays (tax exemptions for a specified period), cheap electricity, subsidized industrial land, and transport infrastructure in designated backward or rural regions (Special Economic Zones).\nHence, Option {{CORR}} is correct.",
    "Identifies tax holidays and infrastructure in backward regions as tools to reduce regional disparities."
)
add_q(make_question(CHAPTER, "Budget Objectives", "Which fiscal initiative is explicitly designed to achieve the budgetary goal of reducing 'Regional Disparities'?", opts, corr, sol))

# 6. Revenue Receipts dual criteria
opts, corr, sol = rotate_options(
    "They neither create any liability NOR cause any reduction in government assets",
    [
        "They either create a liability OR cause a reduction in government assets",
        "They create a permanent liability but expand foreign exchange assets",
        "They must be repaid with interest within the same fiscal year"
    ],
    "B",
    "1. A government receipt is categorized as a 'Revenue Receipt' if and only if it satisfies two negative criteria:\n   (i) It does not create any liability for the government (e.g., taxes are non-repayable unilateral transfers).\n   (ii) It does not cause any reduction in the government's assets.\nHence, Option {{CORR}} is correct.",
    "Identifies the dual defining conditions of Revenue Receipts."
)
add_q(make_question(CHAPTER, "Budget Receipts", "What two essential criteria must a government cash inflow satisfy to be classified as a 'Revenue Receipt'?", opts, corr, sol))

# 7. Capital Receipts dual criteria
opts, corr, sol = rotate_options(
    "They either create a financial liability OR cause a reduction in government assets",
    [
        "They neither create a liability nor cause any asset reduction",
        "They are unilateral voluntary grants from domestic citizens",
        "They consist exclusively of direct taxes collected by revenue departments"
    ],
    "C",
    "1. A receipt is classified as a 'Capital Receipt' if it satisfies either of two conditions:\n   (i) It creates a financial liability (e.g., market borrowings, loans from foreign governments).\n   (ii) It causes a reduction in government assets (e.g., disinvestment of PSU shares, recovery of loans).\nHence, Option {{CORR}} is correct.",
    "Identifies defining conditions of Capital Receipts."
)
add_q(make_question(CHAPTER, "Budget Receipts", "Which defining condition characterizes 'Capital Receipts' in the government budget?", opts, corr, sol))

# 8. Classification of Disinvestment
opts, corr, sol = rotate_options(
    "Capital Receipt, because selling shares of Public Sector Undertakings (PSUs) reduces the financial assets of the government",
    [
        "Revenue Receipt, because it yields cash revenue for regular administrative expenses",
        "Revenue Expenditure, because it represents an administrative transfer",
        "Capital Expenditure, because the government receives fresh equity in private companies"
    ],
    "D",
    "1. Disinvestment involves the government selling equity shares of public sector enterprises to private investors.\n2. Since this transaction liquidates state-owned equity holdings, it leads to a reduction in the assets of the government, classifying it strictly as a Capital Receipt (non-debt capital receipt).\nHence, Option {{CORR}} is correct.",
    "Classifies disinvestment as capital receipt due to reduction in assets."
)
add_q(make_question(CHAPTER, "Budget Receipts", "Why is the proceeds from 'Disinvestment of Public Sector Enterprises' classified as a Capital Receipt?", opts, corr, sol))

# 9. Classification of Recovery of Loans
opts, corr, sol = rotate_options(
    "Capital Receipt, because recovering principal loan amounts reduces the financial loan assets of the central government",
    [
        "Revenue Receipt, because it provides annual cash inflow without legal obligations",
        "Capital Expenditure, because the state government receives funds",
        "Revenue Expenditure, because loans are serviced out of tax pools"
    ],
    "A",
    "1. When the central government recovers past loans granted to state governments or foreign nations, the financial claim (asset) against those borrowers is extinguished.\n2. Since it reduces the financial assets of the government, recovery of loans is a Capital Receipt (non-debt creating).\nHence, Option {{CORR}} is correct.",
    "Classifies recovery of loans as capital receipt because it reduces financial assets."
)
add_q(make_question(CHAPTER, "Budget Receipts", "How is 'Recovery of Loans' categorized in the Union Budget, and why?", opts, corr, sol))

# 10. Direct Tax vs Indirect Tax
opts, corr, sol = rotate_options(
    "The final burden (incidence) of a direct tax cannot be shifted to another person, whereas the burden of an indirect tax can be shifted onto buyers",
    [
        "Direct taxes are levied on goods and services, while indirect taxes are levied on personal incomes",
        "Direct taxes are always regressive in nature, while indirect taxes are progressive",
        "Indirect taxes can only be collected by municipal corporations"
    ],
    "B",
    "1. Direct Tax: The impact and incidence fall on the same person (liability cannot be shifted, e.g., Income Tax, Corporate Tax).\n2. Indirect Tax: The impact is on the seller, but the incidence is shifted to the final consumer via price mechanism (e.g., GST, Customs Duty).\nHence, Option {{CORR}} is correct.",
    "Contrasts direct tax (non-shiftable incidence) with indirect tax (shiftable incidence)."
)
add_q(make_question(CHAPTER, "Tax Revenue", "What is the fundamental economic difference between a 'Direct Tax' and an 'Indirect Tax'?", opts, corr, sol))

# 11. Examples of Direct Taxes
opts, corr, sol = rotate_options(
    "Personal Income Tax and Corporation Tax",
    [
        "Goods and Services Tax (GST) and Customs Duty",
        "Excise Duty and Value Added Tax (VAT)",
        "Stamp duty on liquor and entertainment tax"
    ],
    "C",
    "1. Direct taxes are taxes levied directly on the income, wealth, or corporate profits of individuals and corporate entities.\n2. Primary examples in India are Personal Income Tax, Corporation Tax, and Securities Transaction Tax.\nHence, Option {{CORR}} is correct.",
    "Identifies Personal Income Tax and Corporation Tax as direct taxes."
)
add_q(make_question(CHAPTER, "Tax Revenue", "Which of the following pairs contains ONLY Direct Taxes?", opts, corr, sol))

# 12. Examples of Indirect Taxes
opts, corr, sol = rotate_options(
    "Goods and Services Tax (GST) and Basic Customs Duty",
    [
        "Corporate Income Tax and Capital Gains Tax",
        "Personal Income Tax and Wealth Tax",
        "Agricultural Income Tax and Professional Tax"
    ],
    "D",
    "1. Indirect taxes are levied on the manufacture, import, or sale of goods and services.\n2. The comprehensive indirect tax in India is Goods and Services Tax (GST), along with Basic Customs Duty on imports.\nHence, Option {{CORR}} is correct.",
    "Identifies GST and Customs Duty as indirect taxes."
)
add_q(make_question(CHAPTER, "Tax Revenue", "Which pair consists strictly of 'Indirect Taxes' collected in India?", opts, corr, sol))

# 13. Non-Tax Revenue components
opts, corr, sol = rotate_options(
    "Interest receipts, dividends from PSUs, license fees, fines, and external grants-in-aid",
    [
        "Disinvestment receipts, market borrowings, and recovery of loans",
        "GST, corporation tax, and customs duty",
        "Provident fund deposits and post office small savings"
    ],
    "A",
    "1. Non-tax revenue comprises income earned by the government from sources other than taxes:\n   (i) Commercial revenue: Dividends and profits from PSUs (e.g., RBI dividend, ONGC profits), interest on loans given to states.\n   (ii) Administrative revenue: Fees (passport fees, court fees), fines, penalties, license fees, escheat.\n   (iii) External cash grants and gifts.\nHence, Option {{CORR}} is correct.",
    "Identifies key items of non-tax revenue."
)
add_q(make_question(CHAPTER, "Non-Tax Revenue", "Which list comprises valid components of government 'Non-Tax Revenue'?", opts, corr, sol))

# 14. Meaning of Escheat
opts, corr, sol = rotate_options(
    "Revenue acquired by the government from properties of deceased individuals who die without leaving any legal heir or will",
    [
        "Penalties charged on commercial banks for violating central bank CRR limits",
        "Export subsidies surrendered by domestic manufacturing units",
        "Excess profits confiscated from private monopoly corporations"
    ],
    "B",
    "1. 'Escheat' refers to the legal doctrine and government claim by which the state acquires the property of a deceased person who leaves behind neither a valid will nor any legal heirs.\nHence, Option {{CORR}} is correct.",
    "Defines escheat as property revenue of person dying without heir or will."
)
add_q(make_question(CHAPTER, "Non-Tax Revenue", "What does the administrative non-tax revenue term 'Escheat' signify?", opts, corr, sol))

# 15. Revenue Expenditure characteristics
opts, corr, sol = rotate_options(
    "Expenditure that neither creates physical/financial assets NOR causes reduction in government liabilities",
    [
        "Expenditure that creates physical highways and bridges",
        "Expenditure incurred to repay past market borrowings from international banks",
        "Loans advanced to public sector corporations for machinery purchase"
    ],
    "C",
    "1. Revenue Expenditure refers to the regular, day-to-day operational expenses of government departments and administrative services that satisfy two negative criteria:\n   (i) It does not create any asset for the government.\n   (ii) It does not reduce any liability of the government.\nHence, Option {{CORR}} is correct.",
    "Identifies dual conditions of Revenue Expenditure."
)
add_q(make_question(CHAPTER, "Budget Expenditure", "What defining characteristics distinguish 'Revenue Expenditure' in the government budget?", opts, corr, sol))

# 16. Capital Expenditure characteristics
opts, corr, sol = rotate_options(
    "Expenditure that either creates physical/financial assets OR causes a reduction in government liabilities",
    [
        "Expenditure on routine payment of salaries to civil servants",
        "Subsidies distributed to poor farmers for fertilizer purchases",
        "Grants released to state universities for faculty wages"
    ],
    "D",
    "1. Capital Expenditure refers to expenditures incurred by the government that result in the creation of physical or financial assets (e.g., constructing expressways, acquiring machinery) or lead to a reduction in financial liabilities (e.g., repayment of public debt).\nHence, Option {{CORR}} is correct.",
    "Identifies defining characteristics of Capital Expenditure."
)
add_q(make_question(CHAPTER, "Budget Expenditure", "Which condition defines 'Capital Expenditure' in government accounting?", opts, corr, sol))

# 17. Classification: Construction of a new AIIMS hospital
opts, corr, sol = rotate_options(
    "Capital Expenditure, because it creates a tangible physical capital asset for the public sector",
    [
        "Revenue Expenditure, because it provides health services to the public",
        "Capital Receipt, because the government receives physical hospital buildings",
        "Non-tax Revenue, because patients pay hospital fees"
    ],
    "A",
    "1. Constructing a hospital building (like AIIMS) involves heavy capital outlay that creates a permanent physical asset for the government.\n2. Therefore, it is classified strictly as Capital Expenditure.\nHence, Option {{CORR}} is correct.",
    "Classifies hospital construction as capital expenditure because it creates an asset."
)
add_q(make_question(CHAPTER, "Budget Expenditure", "How is the expenditure incurred on the construction of a new AIIMS hospital building classified in the Union Budget?", opts, corr, sol))

# 18. Classification: Repayment of loan borrowed from World Bank
opts, corr, sol = rotate_options(
    "Capital Expenditure, because repayment of principal debt reduces the financial liabilities of the government",
    [
        "Revenue Expenditure, because money leaves the country annually",
        "Capital Receipt, because foreign exchange reserves decrease",
        "Revenue Receipt, because debt obligations are extinguished"
    ],
    "B",
    "1. When the government repays the principal amount of an outstanding loan borrowed from the World Bank or commercial lenders, its total debt liability decreases.\n2. Since it causes a reduction in government liabilities, it is classified as Capital Expenditure.\nHence, Option {{CORR}} is correct.",
    "Classifies debt repayment as capital expenditure because it reduces liabilities."
)
add_q(make_question(CHAPTER, "Budget Expenditure", "Why is the 'Repayment of past external borrowings' classified as Capital Expenditure?", opts, corr, sol))

# 19. Classification: Interest payments on national debt
opts, corr, sol = rotate_options(
    "Revenue Expenditure, because paying interest services past debt without creating any new assets or reducing the principal liability",
    [
        "Capital Expenditure, because it is paid to commercial banks and bondholders",
        "Capital Receipt, because the bondholders receive cash",
        "Non-debt Capital Receipt, because it is recorded in the financial ledger"
    ],
    "C",
    "1. Paying interest on debt is a recurring obligation. It does not reduce the principal outstanding loan liability, nor does it create any capital asset.\n2. Therefore, interest payments are classified as Revenue Expenditure (in fact, the single largest item of revenue expenditure in the Union Budget).\nHence, Option {{CORR}} is correct.",
    "Classifies interest payments as revenue expenditure because no liability is reduced and no asset created."
)
add_q(make_question(CHAPTER, "Budget Expenditure", "Why are 'Interest Payments' on public debt classified as Revenue Expenditure rather than Capital Expenditure?", opts, corr, sol))

# 20. Classification: Old age pensions vs Retirement pensions
opts, corr, sol = rotate_options(
    "Old age pensions are unilateral transfer payments (Revenue Expenditure), while retirement pensions are deferred factor payments for past services (also Revenue Expenditure)",
    [
        "Old age pensions are Capital Expenditures while retirement pensions are Capital Receipts",
        "Retirement pensions are Capital Expenditures because they extinguish employee pension funds",
        "Neither is included in government budgetary accounting"
    ],
    "D",
    "1. Both old age welfare pensions and employee retirement pensions are Revenue Expenditures because neither creates an asset nor reduces liability.\n2. Old age pension is a transfer payment (unilateral gift), whereas employee retirement pension is deferred compensation for past factor services rendered.\nHence, Option {{CORR}} is correct.",
    "Classifies both pensions as revenue expenditure while distinguishing transfer vs deferred factor payment."
)
add_q(make_question(CHAPTER, "Budget Expenditure", "How are 'Old Age Pensions' and 'Retirement Pensions' classified and differentiated in the government budget?", opts, corr, sol))

# =================================================================================================
# 2. Deficits: Revenue Deficit, Fiscal Deficit, Primary Deficit & Calculations (Q21 - Q45)
# =================================================================================================

# 21. Formula: Revenue Deficit
opts, corr, sol = rotate_options(
    "Revenue Expenditure - Revenue Receipts",
    [
        "Total Expenditure - Total Receipts",
        "Revenue Receipts - Capital Expenditure",
        "Fiscal Deficit - Interest Payments"
    ],
    "A",
    "1. Revenue Deficit (RD) occurs when the government's recurring revenue expenditure exceeds its recurring revenue receipts:\n   RD = Revenue Expenditure - Revenue Receipts.\nHence, Option {{CORR}} is correct.",
    "States formula for Revenue Deficit."
)
add_q(make_question(CHAPTER, "Budget Deficits", "What is the algebraic formula for calculating the 'Revenue Deficit'?", opts, corr, sol))

# 22. Implications of Revenue Deficit
opts, corr, sol = rotate_options(
    "It signifies government dissaving, meaning the government is borrowing to finance day-to-day administrative consumption rather than capital asset formation",
    [
        "It proves that the government has excessive foreign currency reserves",
        "It guarantees that commercial banks will reduce deposit interest rates",
        "It implies that the economy has attained zero percent unemployment"
    ],
    "B",
    "1. A high revenue deficit indicates that the government cannot meet its day-to-day operational needs from its regular tax and non-tax revenues.\n2. The government must resort to borrowing (capital receipts) or disinvestment to fund routine consumption, depleting future productive capacity and causing government dissaving.\nHence, Option {{CORR}} is correct.",
    "Explains implications of revenue deficit as dissaving and borrowing for consumption."
)
add_q(make_question(CHAPTER, "Budget Deficits", "What is the critical macroeconomic implication of a persistent 'Revenue Deficit'?", opts, corr, sol))

# 23. Formula: Fiscal Deficit
opts, corr, sol = rotate_options(
    "Total Expenditure - (Revenue Receipts + Non-debt Capital Receipts)",
    [
        "Revenue Expenditure - Revenue Receipts",
        "Total Expenditure - Total Borrowings",
        "Fiscal Deficit + Interest Payments"
    ],
    "C",
    "1. Fiscal Deficit (FD) measures the total excess of all expenditures over receipts excluding borrowings:\n   FD = Total Expenditure - Total Receipts excluding Borrowings\n   = Total Expenditure - (Revenue Receipts + Non-debt Capital Receipts).\nHence, Option {{CORR}} is correct.",
    "States formula for Fiscal Deficit."
)
add_q(make_question(CHAPTER, "Budget Deficits", "Which formula accurately calculates the 'Fiscal Deficit' of the government?", opts, corr, sol))

# 24. Crucial Identity: Fiscal Deficit equals Borrowings
opts, corr, sol = rotate_options(
    "Total Borrowings and other debt liabilities incurred by the government during the year",
    [
        "Total cash balance held in the Reserve Bank of India vault",
        "Total market value of all public sector enterprise equity",
        "Gross domestic product at factor cost"
    ],
    "D",
    "1. By definition, Fiscal Deficit represents the exact budgetary gap that must be financed through debt creation.\n2. Therefore, Fiscal Deficit is IDENTICALLY EQUAL to the Total Borrowings of the government from all sources (market borrowings, RBI, external loans).\nHence, Option {{CORR}} is correct.",
    "Identifies Fiscal Deficit as identically equal to Total Borrowings."
)
add_q(make_question(CHAPTER, "Budget Deficits", "In macroeconomic budgeting, the 'Fiscal Deficit' is identically equivalent to which economic measure?", opts, corr, sol))

# 25. Formula: Primary Deficit
opts, corr, sol = rotate_options(
    "Fiscal Deficit - Interest Payments",
    [
        "Revenue Deficit - Interest Payments",
        "Total Expenditure - Total Revenue",
        "Fiscal Deficit + Non-debt Capital Receipts"
    ],
    "A",
    "1. Primary Deficit (PD) is defined as Fiscal Deficit minus Interest Payments on past accumulated borrowings:\n   PD = Fiscal Deficit - Interest Payments.\nHence, Option {{CORR}} is correct.",
    "States formula for Primary Deficit."
)
add_q(make_question(CHAPTER, "Budget Deficits", "What is the formula for calculating the 'Primary Deficit'?", opts, corr, sol))

# 26. Significance of Zero Primary Deficit
opts, corr, sol = rotate_options(
    "The government is borrowing money solely to fulfill interest payment obligations on past accumulated debt",
    [
        "The government has zero outstanding public debt",
        "The economy has zero inflation and balanced trade",
        "Total tax collection is exactly equal to defense expenditure"
    ],
    "B",
    "1. When Primary Deficit = 0, we have Fiscal Deficit - Interest Payments = 0 => Fiscal Deficit = Interest Payments.\n2. This implies that the government's current year receipts match current year non-interest expenditures, and all borrowings in the current year are consumed entirely by servicing legacy debt interest.\nHence, Option {{CORR}} is correct.",
    "Explains Zero Primary Deficit means borrowing purely to pay past interest."
)
add_q(make_question(CHAPTER, "Budget Deficits", "What does a 'Zero Primary Deficit' (Primary Deficit = 0) signify about government finances?", opts, corr, sol))

# 27. Numerical 1: Revenue Deficit calculation
opts, corr, sol = rotate_options(
    "₹25,000 crore",
    [
        "₹35,000 crore",
        "₹15,000 crore",
        "₹50,000 crore"
    ],
    "C",
    "1. Revenue Deficit = Revenue Expenditure - Revenue Receipts.\n2. Revenue Receipts = Tax Revenue (₹70,000) + Non-tax Revenue (₹30,000) = ₹1,00,000 crore.\n3. Revenue Expenditure = ₹1,25,000 crore.\n4. Revenue Deficit = 1,25,000 - 1,00,000 = ₹25,000 crore.\nHence, Option {{CORR}} is correct.",
    "Calculates Revenue Deficit = 125000 - 100000 = 25000 crore."
)
add_q(make_question(CHAPTER, "Deficit Calculations", "If Revenue Expenditure is ₹1,25,000 crore, Tax Revenue is ₹70,000 crore, and Non-Tax Revenue is ₹30,000 crore, what is the Revenue Deficit?", opts, corr, sol))

# 28. Numerical 2: Fiscal Deficit calculation
opts, corr, sol = rotate_options(
    "₹45,000 crore",
    [
        "₹55,000 crore",
        "₹35,000 crore",
        "₹25,000 crore"
    ],
    "D",
    "1. Total Expenditure = Revenue Expenditure (₹1,25,000) + Capital Expenditure (₹40,000) = ₹1,65,000 crore.\n2. Total Receipts excluding Borrowings = Revenue Receipts (₹1,00,000) + Non-debt Capital Receipts (Recoveries + Disinvestment = ₹10,000 + ₹10,000 = ₹20,000) = ₹1,20,000 crore.\n3. Fiscal Deficit = Total Expenditure - Receipts excluding borrowings = 1,65,000 - 1,20,000 = ₹45,000 crore.\nHence, Option {{CORR}} is correct.",
    "Calculates Fiscal Deficit = 165000 - 120000 = 45000 crore."
)
add_q(make_question(CHAPTER, "Deficit Calculations", "A government budget presents the following data (in ₹ crore): Revenue Expenditure = 1,25,000; Capital Expenditure = 40,000; Revenue Receipts = 1,00,000; Non-debt Capital Receipts = 20,000; Borrowings = 45,000. What is the Fiscal Deficit?", opts, corr, sol))

# 29. Numerical 3: Primary Deficit calculation
opts, corr, sol = rotate_options(
    "₹15,000 crore",
    [
        "₹45,000 crore",
        "₹30,000 crore",
        "₹75,000 crore"
    ],
    "A",
    "1. Primary Deficit = Fiscal Deficit - Interest Payments.\n2. From previous data, Fiscal Deficit = ₹45,000 crore.\n3. Interest Payments = ₹30,000 crore.\n4. Primary Deficit = 45,000 - 30,000 = ₹15,000 crore.\nHence, Option {{CORR}} is correct.",
    "Calculates Primary Deficit = 45000 - 30000 = 15000 crore."
)
add_q(make_question(CHAPTER, "Deficit Calculations", "If the Fiscal Deficit is ₹45,000 crore and interest payments on past public debt equal ₹30,000 crore, what is the Primary Deficit?", opts, corr, sol))

# 30. Numerical 4: Finding Borrowings from Fiscal Deficit
opts, corr, sol = rotate_options(
    "₹80,000 crore",
    [
        "₹60,000 crore",
        "₹1,00,000 crore",
        "₹40,000 crore"
    ],
    "B",
    "1. Fiscal Deficit represents the total net borrowing requirement of the government.\n2. If Fiscal Deficit is ₹80,000 crore, total borrowings by the government will be exactly ₹80,000 crore.\nHence, Option {{CORR}} is correct.",
    "Identifies borrowings equal fiscal deficit = 80000 crore."
)
add_q(make_question(CHAPTER, "Deficit Calculations", "In a budget, if the Fiscal Deficit is calculated as ₹80,000 crore, what will be the total amount of government borrowings for that fiscal year?", opts, corr, sol))

# 31. Numerical 5: Finding Interest Payments
opts, corr, sol = rotate_options(
    "₹30,000 crore",
    [
        "₹1,10,000 crore",
        "₹40,000 crore",
        "₹50,000 crore"
    ],
    "C",
    "1. Primary Deficit = Fiscal Deficit - Interest Payments.\n2. Interest Payments = Fiscal Deficit - Primary Deficit.\n3. Interest Payments = 70,000 - 40,000 = ₹30,000 crore.\nHence, Option {{CORR}} is correct.",
    "Calculates Interest Payments = 70000 - 40000 = 30000 crore."
)
add_q(make_question(CHAPTER, "Deficit Calculations", "If an economy's Fiscal Deficit is ₹70,000 crore and its Primary Deficit is ₹40,000 crore, what is the value of Interest Payments?", opts, corr, sol))

# 32. Debt Trap implication of Fiscal Deficit
opts, corr, sol = rotate_options(
    "Borrowing increasingly larger sums simply to pay interest on past loans, leading to an unsustainable spiral of escalating public debt",
    [
        "Commercial banks refusing to accept deposits from individual citizens",
        "A sudden collapse in the international price of crude oil",
        "Mandatory liquidation of all private agricultural lands"
    ],
    "D",
    "1. A vicious 'Debt Trap' occurs when high fiscal deficits lead to high interest payments, which widen the revenue deficit, forcing the government to borrow even more just to pay interest on existing debt, leading to national insolvency.\nHence, Option {{CORR}} is correct.",
    "Defines Debt Trap arising from persistent fiscal deficits."
)
add_q(make_question(CHAPTER, "Deficit Implications", "What does the term 'Debt Trap' signify in the context of persistent government fiscal deficits?", opts, corr, sol))

# 33. Crowding Out Effect
opts, corr, sol = rotate_options(
    "High government borrowing from capital markets drives up interest rates and absorbs loanable funds, reducing private business investment",
    [
        "Crowding in public buses caused by subsidized transit fares",
        "Excessive hiring of government employees displacing private schools",
        "Public protests demanding cuts in fuel excise taxes"
    ],
    "A",
    "1. The 'Crowding-Out Effect' occurs when large fiscal deficits compel the government to borrow heavily from domestic money and capital markets. This surge in public demand for loanable funds pushes up interest rates, making borrowing prohibitively costly for private firms and crowding out private capital investment.\nHence, Option {{CORR}} is correct.",
    "Defines crowding-out effect where government borrowing reduces private investment."
)
add_q(make_question(CHAPTER, "Deficit Implications", "What is the 'Crowding-Out Effect' caused by high government fiscal deficits?", opts, corr, sol))

# 34. Inflationary spiral from deficit financing
opts, corr, sol = rotate_options(
    "Funding deficits by borrowing from the central bank (deficit financing/currency printing) increases money supply, fueling demand-pull inflation",
    [
        "Deficit financing increases industrial productivity, causing widespread price crashes",
        "Deficit financing eliminates all indirect taxes across the country",
        "Borrowing from abroad immediately causes domestic price deflation"
    ],
    "B",
    "1. When the government finances its fiscal deficit by borrowing from the central bank (RBI), new currency is injected into circulation. If output cannot expand commensurately, this expansion in money supply directly causes demand-pull inflation.\nHence, Option {{CORR}} is correct.",
    "Links deficit financing to expanded money supply and demand-pull inflation."
)
add_q(make_question(CHAPTER, "Deficit Implications", "Why does financing a fiscal deficit through 'Deficit Financing' (borrowing from the Central Bank) tend to cause inflation?", opts, corr, sol))

# 35. Non-debt Capital Receipts components
opts, corr, sol = rotate_options(
    "Recovery of loans and proceeds from disinvestment of PSUs",
    [
        "Market loans and external assistance from foreign governments",
        "Income tax and corporation tax collections",
        "Dividends from nationalized banks and railway profits"
    ],
    "C",
    "1. Non-debt capital receipts are capital receipts that do NOT create any future debt or interest liability for the government. The two primary examples are:\n   (i) Recovery of past loans granted by central government.\n   (ii) Proceeds from Disinvestment of PSU equity shares.\nHence, Option {{CORR}} is correct.",
    "Identifies recovery of loans and disinvestment as non-debt capital receipts."
)
add_q(make_question(CHAPTER, "Capital Receipts", "Which set comprises 'Non-Debt Capital Receipts' in the government budget?", opts, corr, sol))

# 36. Match Question: Budget Components
add_q(make_match_question(
    CHAPTER,
    "Budget Components",
    "Match the budget items in List I with their corresponding classifications in List II:",
    [
        ("A", "Dividends paid by State Bank of India to Government"),
        ("B", "Proceeds from 10-year sovereign bond auction"),
        ("C", "Construction of Delhi-Mumbai Expressway"),
        ("D", "Food subsidies distributed via Public Distribution System")
    ],
    [
        ("(I)", "Capital Expenditure"),
        ("(II)", "Non-Tax Revenue Receipt"),
        ("(III)", "Revenue Expenditure"),
        ("(IV)", "Debt Capital Receipt")
    ],
    "A-(II), B-(IV), C-(I), D-(III)",
    [
        "A-(IV), B-(II), C-(I), D-(III)",
        "A-(II), B-(I), C-(IV), D-(III)",
        "A-(III), B-(IV), C-(I), D-(II)"
    ],
    "A",
    "1. PSU Dividend -> Non-Tax Revenue Receipt -> A-(II)\n2. Bond auction (borrowing) -> Debt Capital Receipt -> B-(IV)\n3. Expressway construction -> Capital Expenditure -> C-(I)\n4. Food subsidies -> Revenue Expenditure -> D-(III)\nHence, Option A is correct."
))

# 37. Statement Question: Revenue Deficit and Fiscal Deficit
add_q(make_statement_question(
    CHAPTER,
    "Deficits Analysis",
    "A high Revenue Deficit does not necessarily lead to a high Fiscal Deficit if capital expenditures are curtailed.",
    "Fiscal Deficit can never be smaller than Revenue Deficit in an economy where capital expenditures exceed non-debt capital receipts.",
    "A",
    "1. Statement I is TRUE: Fiscal Deficit = Revenue Deficit + (Capital Expenditure - Non-debt Capital Receipts). If capital spending is drastically slashed, fiscal deficit can be contained despite revenue deficits.\n2. Statement II is TRUE: In practice, Capital Expenditure is significantly higher than Non-debt Capital Receipts (Net Capital Outlay > 0), making Fiscal Deficit strictly greater than Revenue Deficit.\nHence, Both Statement I and Statement II are true (Option A)."
))

# 38. Assertion Reason: Disinvestment classification
add_q(make_assertion_question(
    CHAPTER,
    "Capital Receipts",
    "Receipts from disinvestment of shares of public enterprises are treated as Capital Receipts.",
    "Disinvestment leads to an increase in the financial liabilities of the central government.",
    "C",
    "1. Assertion (A) is TRUE: Disinvestment is a capital receipt because it leads to a reduction in state-owned enterprise assets.\n2. Reason (R) is FALSE: Disinvestment reduces assets; it does NOT increase liabilities.\nHence, (A) is true but (R) is false (Option C)."
))

# 39. Match Question: Deficit Formulas
add_q(make_match_question(
    CHAPTER,
    "Budget Deficits",
    "Match the deficit concepts in List I with their defining mathematical relationships in List II:",
    [
        ("A", "Revenue Deficit"),
        ("B", "Fiscal Deficit"),
        ("C", "Primary Deficit"),
        ("D", "Budgetary Deficit (traditional)")
    ],
    [
        ("(I)", "Fiscal Deficit - Interest Payments"),
        ("(II)", "Total Expenditure - Total Receipts (including borrowings)"),
        ("(III)", "Revenue Expenditure - Revenue Receipts"),
        ("(IV)", "Total Expenditure - Total Receipts excluding borrowings")
    ],
    "A-(III), B-(IV), C-(I), D-(II)",
    [
        "A-(IV), B-(III), C-(I), D-(II)",
        "A-(III), B-(I), C-(IV), D-(II)",
        "A-(I), B-(IV), C-(III), D-(II)"
    ],
    "A",
    "1. Revenue Deficit = Rev Exp - Rev Rec -> A-(III)\n2. Fiscal Deficit = Tot Exp - Receipts excl. borrowings -> B-(IV)\n3. Primary Deficit = Fiscal Deficit - Interest Payments -> C-(I)\n4. Traditional Budgetary Deficit = Total Exp - Total Receipts -> D-(II)\nHence, Option A is correct."
))

# 40. Sequence Question: Budget lifecycle in Parliament
add_q(make_sequence_question(
    CHAPTER,
    "Budget Process",
    "Arrange the sequential stages of passing the Government Budget in the Parliament in the correct order:",
    [
        "Presentation of the Annual Financial Statement by the Finance Minister in the Lok Sabha.",
        "General Discussion on budget principles and fiscal proposals across both Houses.",
        "Scrutiny and detailed review of Demands for Grants by Departmental Standing Committees.",
        "Voting on Demands for Grants in the Lok Sabha.",
        "Passing of the Appropriation Bill followed by the Finance Bill."
    ],
    "(A) -> (B) -> (C) -> (D) -> (E)",
    [
        "(B) -> (A) -> (C) -> (E) -> (D)",
        "(A) -> (C) -> (B) -> (D) -> (E)",
        "(C) -> (A) -> (B) -> (E) -> (D)"
    ],
    "A",
    "1. The parliamentary procedure for the budget follows: (A) Presentation -> (B) General Discussion -> (C) Scrutiny by Departmental Committees -> (D) Voting on Demands for Grants -> (E) Enactment of Appropriation and Finance Bills.\nHence, Option A is correct."
))

# =================================================================================================
# 3. Budget Types, Fiscal Responsibility & Policy Measures (Q41 - Q60)
# =================================================================================================

# 41. Balanced Budget definition
opts, corr, sol = rotate_options(
    "A budget where estimated total government expenditures are exactly equal to estimated total government receipts",
    [
        "A budget where direct tax collections equal indirect tax collections",
        "A budget where primary deficit equals fiscal deficit",
        "A budget where all public sector enterprises earn equal profits"
    ],
    "B",
    "1. A Balanced Budget is defined as one in which estimated total receipts equal estimated total expenditure during the financial year.\nHence, Option {{CORR}} is correct.",
    "Defines balanced budget as receipts equal expenditure."
)
add_q(make_question(CHAPTER, "Budget Types", "What is meant by a 'Balanced Budget'?", opts, corr, sol))

# 42. Surplus Budget suitability
opts, corr, sol = rotate_options(
    "During severe demand-pull inflation, to drain excess purchasing power from the economy",
    [
        "During severe economic depression with massive involuntary unemployment",
        "During wartime mobilization to maximize arms purchases",
        "When private investment is collapsing across all industrial sectors"
    ],
    "C",
    "1. A Surplus Budget (Receipts > Expenditures) is suitable during periods of inflation and excess demand, because sucking more money out of the public through taxes than what is reinjected through expenditure dampens aggregate demand.\nHence, Option {{CORR}} is correct.",
    "Explains surplus budget is suitable during demand-pull inflation."
)
add_q(make_question(CHAPTER, "Budget Types", "Under which macroeconomic condition is a 'Surplus Budget' recommended?", opts, corr, sol))

# 43. Deficit Budget suitability
opts, corr, sol = rotate_options(
    "During periods of economic recession and deficient demand, to pump purchasing power into the economic stream",
    [
        "During hyperinflation when consumer prices are escalating uncontrollably",
        "When national debt has breached 100% of GDP",
        "When foreign exchange reserves are completely depleted"
    ],
    "D",
    "1. A Deficit Budget (Expenditure > Receipts) is recommended during economic downturns and depression. By injecting more purchasing power through public infrastructure works and tax relief, it expands aggregate demand and revives output.\nHence, Option {{CORR}} is correct.",
    "Explains deficit budget is recommended during economic recession/slump."
)
add_q(make_question(CHAPTER, "Budget Types", "Under what economic circumstances is a 'Deficit Budget' deliberately deployed by governments?", opts, corr, sol))

# 44. FRBM Act objective
opts, corr, sol = rotate_options(
    "Fiscal Responsibility and Budget Management Act, aimed at institutionalizing fiscal discipline and phasing out revenue deficits",
    [
        "Foreign Remittance and Banking Mechanism Act, regulating NRI investments",
        "Financial Reserve and Bullion Minting Act, mandating gold storage limits",
        "Federal Revenue Balancing Movement Act, abolishing state-level sales taxes"
    ],
    "A",
    "1. The FRBM Act (Fiscal Responsibility and Budget Management Act, 2003) was enacted to enforce fiscal discipline on the central government, reduce fiscal deficits to sustainable targets (e.g., 3% of GDP), and eliminate revenue deficits.\nHence, Option {{CORR}} is correct.",
    "Identifies FRBM Act and its objective of enforcing fiscal discipline."
)
add_q(make_question(CHAPTER, "Fiscal Policy", "What is the primary objective of the 'FRBM Act' enacted by the Indian Parliament?", opts, corr, sol))

# 45. Proportional Tax vs Progressive Tax
opts, corr, sol = rotate_options(
    "Under proportional tax, tax rate remains constant across all income levels; under progressive tax, the tax rate increases as income rises",
    [
        "Under proportional tax, rates increase with income; under progressive tax, rates decrease",
        "Proportional tax is levied on exports while progressive tax is levied on imports",
        "Proportional tax is direct while progressive tax is always indirect"
    ],
    "B",
    "1. Progressive Tax: The marginal tax rate increases as taxable income increases, placing a higher burden on high earners (e.g., Indian Income Tax slabs).\n2. Proportional Tax: A uniform fixed percentage is levied regardless of income level.\nHence, Option {{CORR}} is correct.",
    "Distinguishes proportional tax (constant rate) from progressive tax (increasing rate)."
)
add_q(make_question(CHAPTER, "Taxation Systems", "How does a 'Proportional Tax' differ from a 'Progressive Tax'?", opts, corr, sol))

# 46. Regressive Tax concept
opts, corr, sol = rotate_options(
    "A tax where the effective tax burden falls more heavily on low-income earners as a percentage of their total income (e.g., indirect taxes on basic necessities)",
    [
        "A tax that is refunded in full to corporate business owners",
        "A tax levied exclusively on inherited ancestral jewelry",
        "A tax that automatically increases during periods of deflation"
    ],
    "C",
    "1. A Regressive Tax takes a larger percentage of income from low-income earners than from high-income earners. Indirect taxes like GST on essential consumer items are regressive because both a poor person and a billionaire pay the same absolute tax on a bar of soap, representing a much higher fraction of the poor person's income.\nHence, Option {{CORR}} is correct.",
    "Defines regressive tax and its heavier relative burden on low-income earners."
)
add_q(make_question(CHAPTER, "Taxation Systems", "What is the defining attribute of a 'Regressive Tax'?", opts, corr, sol))

# 47. Classification: Grants given to foreign countries (e.g., Nepal or Bhutan)
opts, corr, sol = rotate_options(
    "Revenue Expenditure, because foreign aid grants are unilateral transfers that create no financial assets nor reduce Indian liabilities",
    [
        "Capital Expenditure, because India acquires diplomatic assets",
        "Capital Receipt, because foreign nations become indebted to India",
        "Revenue Receipt, because it enhances international standing"
    ],
    "D",
    "1. External grants-in-aid given to foreign governments are outright donations/gifts (unilateral transfers). They do not create any financial or physical asset for India, nor do they reduce any government liabilities.\n2. Therefore, foreign aid grants are classified as Revenue Expenditure.\nHence, Option {{CORR}} is correct.",
    "Classifies foreign aid grants as revenue expenditure."
)
add_q(make_question(CHAPTER, "Budget Expenditure", "How are financial grants given by the Government of India to friendly foreign nations (like Nepal or Bhutan) classified?", opts, corr, sol))

# 48. Classification: Purchase of Rafale fighter aircraft
opts, corr, sol = rotate_options(
    "Capital Expenditure, because fighter aircraft are tangible defense capital equipment that create long-term defense assets",
    [
        "Revenue Expenditure, because national defense is a recurring public good",
        "Non-tax Revenue, because aircraft can be deployed for commercial leasing",
        "Debt Capital Receipt, because it requires foreign currency settlement"
    ],
    "A",
    "1. Defense capital equipment (fighter jets, warships, tanks) represent long-term military capital assets.\n2. In government accounting, the procurement of defense machinery and aircraft is classified as Defense Capital Outlay (Capital Expenditure).\nHence, Option {{CORR}} is correct.",
    "Classifies fighter aircraft purchase as capital expenditure (defense capital outlay)."
)
add_q(make_question(CHAPTER, "Budget Expenditure", "Why is the procurement of modern fighter aircraft for the Indian Air Force classified as Capital Expenditure?", opts, corr, sol))

# 49. Classification: Defense salaries and pensions
opts, corr, sol = rotate_options(
    "Revenue Expenditure, because payment of salaries and maintenance to armed forces personnel does not create capital assets or extinguish liabilities",
    [
        "Capital Expenditure, because soldiers protect national physical territory",
        "Capital Receipt, because defense services maintain internal security",
        "Non-debt Capital Receipt, because pension contributions are invested"
    ],
    "B",
    "1. Day-to-day administrative salaries, ration, fuel, and pensions paid to defense personnel maintain regular operations without creating capital assets or reducing liabilities.\n2. Therefore, defense salaries and pensions are Revenue Expenditure.\nHence, Option {{CORR}} is correct.",
    "Classifies defense salaries and maintenance as revenue expenditure."
)
add_q(make_question(CHAPTER, "Budget Expenditure", "How are defense salaries, rations, and personnel pensions treated in the Union Budget?", opts, corr, sol))

# 50. Classification: Fees collected for passport and driving license
opts, corr, sol = rotate_options(
    "Non-Tax Revenue, because it is an administrative charge levied by the government to cover the cost of providing a regulatory public service",
    [
        "Direct Tax, because it is paid directly by individuals to government offices",
        "Capital Receipt, because passports are valid for ten years",
        "Indirect Tax, because it can be passed on to travel agencies"
    ],
    "C",
    "1. Fees are compulsory payments made to the government in return for a specific public service or regulatory clearance (e.g., passport issuing fee, court fee, driving license fee).\n2. They are categorized as administrative Non-Tax Revenue Receipts.\nHence, Option {{CORR}} is correct.",
    "Classifies passport and license fees as non-tax revenue."
)
add_q(make_question(CHAPTER, "Non-Tax Revenue", "How is the fee collected by the government for issuing passports or driving licenses classified?", opts, corr, sol))

# 51. Classification: Special Assessment
opts, corr, sol = rotate_options(
    "A non-tax revenue levy imposed on owners of properties whose value has appreciated due to government developmental activities (e.g., metro rail construction)",
    [
        "An emergency penalty charged on tax evaders during search operations",
        "A special tariff on imports of luxury electronics",
        "A surcharge levied exclusively on multinational corporate profits"
    ],
    "D",
    "1. 'Special Assessment' is an administrative non-tax levy imposed on property owners who enjoy unearned capital gains when government developmental projects (e.g., paving roads, building metro stations, laying drainage) enhance the market value of their private real estate.\nHence, Option {{CORR}} is correct.",
    "Defines Special Assessment as a levy on property appreciation from public development."
)
add_q(make_question(CHAPTER, "Non-Tax Revenue", "What is the concept of 'Special Assessment' in public finance?", opts, corr, sol))

# 52. Statement Question: Direct Tax progressivity
add_q(make_statement_question(
    CHAPTER,
    "Taxation",
    "Progressive income taxation serves as an automatic fiscal stabilizer in modern economies.",
    "As national income rises during a boom, progressive income tax automatically pushes taxpayers into higher tax brackets, siphoning off purchasing power without legislative delays.",
    "A",
    "1. Statement I is TRUE: Progressive taxes act as built-in/automatic stabilizers that dampen fluctuations in GDP.\n2. Statement II is TRUE: In an economic expansion, rising incomes move individuals into higher tax brackets (bracket creep), increasing tax collections and cooling overheating demand automatically.\nHence, Both Statement I and Statement II are true (Option A)."
))

# 53. Assertion Reason: Fiscal Deficit and Future Generations
add_q(make_assertion_question(
    CHAPTER,
    "Fiscal Deficit",
    "Persistent high fiscal deficits place a heavy financial burden on future generations.",
    "Future generations must pay higher taxes to service and repay the accumulated debt and interest liabilities left behind by previous generations.",
    "A",
    "1. Assertion (A) is TRUE: Financing current consumption via public debt passes the bill to future citizens.\n2. Reason (R) is TRUE and correctly explains (A): To repay past sovereign bonds and interest, future governments are compelled to raise tax rates or cut spending on social infrastructure.\nHence, Both (A) and (R) are true and (R) is the correct explanation of (A) (Option A)."
))

# 54. Primary Deficit equals Fiscal Deficit when:
opts, corr, sol = rotate_options(
    "Interest payments on past borrowings are strictly zero",
    [
        "Revenue deficit is strictly zero",
        "Disinvestment proceeds equal capital expenditures",
        "Foreign borrowings equal domestic borrowings"
    ],
    "B",
    "1. Primary Deficit = Fiscal Deficit - Interest Payments.\n2. If Interest Payments = 0, then Primary Deficit = Fiscal Deficit.\nHence, Option {{CORR}} is correct.",
    "Identifies condition where Primary Deficit equals Fiscal Deficit (Interest Payments = 0)."
)
add_q(make_question(CHAPTER, "Budget Deficits", "Under what specific mathematical condition will the Primary Deficit be exactly equal to the Fiscal Deficit?", opts, corr, sol))

# 55. Numerical: Finding Revenue Receipts from components
opts, corr, sol = rotate_options(
    "₹1,80,000 crore",
    [
        "₹2,10,000 crore",
        "₹1,50,000 crore",
        "₹1,20,000 crore"
    ],
    "C",
    "1. Revenue Receipts = Tax Revenue + Non-Tax Revenue.\n2. Tax Revenue = Corporation Tax (₹80,000) + Income Tax (₹50,000) + GST (₹30,000) = ₹1,60,000 crore.\n3. Non-Tax Revenue = Dividends (₹15,000) + Fees/Fines (₹5,000) = ₹20,000 crore.\n4. Total Revenue Receipts = 1,60,000 + 20,000 = ₹1,80,000 crore.\nHence, Option {{CORR}} is correct.",
    "Calculates total revenue receipts = 160000 + 20000 = 180000 crore."
)
add_q(make_question(CHAPTER, "Receipt Calculations", "An economy collects: Corporation Tax = ₹80,000 cr, Income Tax = ₹50,000 cr, GST = ₹30,000 cr, Dividends from PSUs = ₹15,000 cr, and Regulatory Fees = ₹5,000 cr. What are the total Revenue Receipts?", opts, corr, sol))

# 56. Can Fiscal Deficit be less than Revenue Deficit?
opts, corr, sol = rotate_options(
    "Yes, when non-debt capital receipts exceed capital expenditures (surplus on capital account)",
    [
        "No, it is mathematically impossible under any circumstances",
        "Yes, whenever the government abolishes all direct taxes",
        "No, because revenue deficit is always negative"
    ],
    "D",
    "1. Fiscal Deficit = Revenue Deficit + (Capital Expenditure - Non-debt Capital Receipts).\n2. If Non-debt Capital Receipts exceed Capital Expenditure, then (Capital Expenditure - Non-debt Capital Receipts) becomes negative, making Fiscal Deficit smaller than Revenue Deficit.\nHence, Option {{CORR}} is correct.",
    "Explains condition when Fiscal Deficit can be less than Revenue Deficit."
)
add_q(make_question(CHAPTER, "Budget Deficits", "Can the Fiscal Deficit theoretically be smaller than the Revenue Deficit?", opts, corr, sol))

# 57. Match Question: Taxation Categories
add_q(make_match_question(
    CHAPTER,
    "Taxation Classification",
    "Match the taxes in List I with their defining classification in List II:",
    [
        ("A", "Corporation Tax"),
        ("B", "Goods and Services Tax (GST)"),
        ("C", "Customs Duty on luxury car imports"),
        ("D", "Securities Transaction Tax (STT)")
    ],
    [
        ("(I)", "Indirect tax levied on international trade"),
        ("(II)", "Direct tax levied on corporate enterprise profits"),
        ("(III)", "Comprehensive multi-stage indirect tax on goods/services"),
        ("(IV)", "Direct tax levied on stock market transactions")
    ],
    "A-(II), B-(III), C-(I), D-(IV)",
    [
        "A-(III), B-(II), C-(I), D-(IV)",
        "A-(II), B-(I), C-(IV), D-(III)",
        "A-(IV), B-(III), C-(II), D-(I)"
    ],
    "A",
    "1. Corporation tax -> Direct tax on profits -> A-(II)\n2. GST -> Comprehensive multi-stage indirect tax -> B-(III)\n3. Customs duty -> Indirect tax on international trade -> C-(I)\n4. STT -> Direct tax on stock transactions -> D-(IV)\nHence, Option A is correct."
))

# 58. Statement Question: Capital receipts and debt
add_q(make_statement_question(
    CHAPTER,
    "Capital Receipts",
    "All capital receipts create debt liabilities for the government.",
    "Disinvestment proceeds and recovery of past loans are non-debt capital receipts that liquidate existing assets without adding to national debt.",
    "D",
    "1. Statement I is FALSE: Not all capital receipts create debt. Non-debt capital receipts (disinvestment, loan recoveries) reduce assets rather than creating debt liabilities.\n2. Statement II is TRUE: Recovery of loans and disinvestment generate capital funds without creating any repayment or interest liabilities.\nHence, Statement I is false but Statement II is true (Option D)."
))

# 59. Appropriation Bill vs Finance Bill
opts, corr, sol = rotate_options(
    "Appropriation Bill authorizes the government to withdraw money from the Consolidated Fund of India for expenditures, while the Finance Bill enacts legal taxation proposals",
    [
        "Appropriation Bill deals with borrowing from IMF, while Finance Bill deals with domestic subsidies",
        "Appropriation Bill is introduced only in Rajya Sabha, while Finance Bill is introduced in Supreme Court",
        "Both bills serve identical functions and are voted on simultaneously"
    ],
    "A",
    "1. Under Article 114, the Appropriation Bill provides statutory authorization to withdraw funds from the Consolidated Fund of India to meet approved expenditures.\n2. Under Article 110, the Finance Bill embodies all taxation and revenue-raising proposals for the upcoming year.\nHence, Option {{CORR}} is correct.",
    "Distinguishes Appropriation Bill (expenditure withdrawal) from Finance Bill (taxation proposals)."
)
add_q(make_question(CHAPTER, "Budget Legislation", "What is the constitutional distinction between the 'Appropriation Bill' and the 'Finance Bill' in India?", opts, corr, sol))

# 60. Consolidated Fund of India
opts, corr, sol = rotate_options(
    "The chief sovereign fund into which all revenues received by the government, loans raised, and loan recoveries are deposited (Article 266(1))",
    [
        "An emergency reserve of ₹500 crore managed at the discretion of the President of India",
        "A private banking fund operated exclusively by nationalized commercial banks",
        "A welfare account funded entirely by voluntary corporate donations"
    ],
    "B",
    "1. The Consolidated Fund of India (Article 266(1)) is the most vital government account. All revenues (tax and non-tax), loans raised, and loan recoveries flow into this fund, and no money can be withdrawn from it without Parliamentary appropriation.\nHence, Option {{CORR}} is correct.",
    "Defines Consolidated Fund of India under Article 266(1)."
)
add_q(make_question(CHAPTER, "Constitutional Funds", "What is the constitutional status and function of the 'Consolidated Fund of India'?", opts, corr, sol))

# Verify count and uniqueness
assert len(questions) == 60, f"Expected 60 questions, got {len(questions)}"
print(f"Successfully generated {len(questions)} unique questions for Unit 9!")

out_path = "mock/eco_units/unit9.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
