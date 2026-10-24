import os
import random
from .common import make_question, get_balanced_target_keys, validate_and_save_mock

def generate_commerce_mocks():
    print(">>> Generating Commerce Mocks (Accountancy, Business Studies, Economics)...")
    
    # -------------------------------------------------------------------------
    # 1. ACCOUNTANCY (Mocks 29..50 = 22 mocks)
    # -------------------------------------------------------------------------
    acc_blueprints = [
        (
            "Accounting for Partnership: Basic Concepts", "Interest on Drawings Average Period",
            "A partner draws Rs. 10,000 at the beginning of each month throughout the year. If interest on drawings is charged at 12% per annum, the total interest on drawings is calculated for an average period of:",
            "6.5 months (Rs. 7,800)",
            ["6.0 months (Rs. 7,200)", "5.5 months (Rs. 6,600)", "12 months (Rs. 14,400)"],
            "When equal amounts are drawn at the beginning of each month, Average Period = (Time left after 1st drawing + Time left after last drawing) / 2 = (12 + 1) / 2 = 6.5 months. Total drawings = 10,000 * 12 = 1,20,000. Interest = 1,20,000 * 12% * (6.5 / 12) = Rs. 7,800.",
            "direct-numerical", 2
        ),
        (
            "Accounting for Partnership: Basic Concepts", "Absence of Partnership Deed Provisions",
            "In the absence of a written partnership deed or agreement, the provisions of the Indian Partnership Act, 1932 mandate that:",
            "Profits and losses are shared equally, and interest on partner's advance/loan is allowed at 6% p.a.",
            ["Partners are entitled to 10% interest on capital and salary",
             "Profits are shared in the ratio of contributed capitals",
             "No interest is allowed on loans advanced by partners"],
            "Under the Indian Partnership Act, 1932 (Section 13): In the absence of an agreement: (1) Profits and losses are shared equally, (2) No interest on capital is allowed, (3) No interest on drawings is charged, (4) No salary/remuneration is payable, (5) Interest on partner's loan/advance is allowed at 6% per annum.",
            "conceptual", 1
        ),
        (
            "Reconstitution of a Partnership Firm: Admission", "Sacrificing Ratio Calculation",
            "A and B are partners sharing profits in the ratio of 3 : 2. They admit C as a new partner for 1/5th share, which he acquires entirely from A. The new profit-sharing ratio between A, B, and C is:",
            "2 : 2 : 1",
            ["3 : 2 : 1", "12 : 8 : 5", "4 : 4 : 2"],
            "A's old share = 3/5, B's old share = 2/5. C's share = 1/5 acquired wholly from A. A's new share = 3/5 - 1/5 = 2/5. B's new share = 2/5. C's share = 1/5. Ratio A : B : C = 2/5 : 2/5 : 1/5 = 2 : 2 : 1.",
            "direct-numerical", 2
        ),
        (
            "Reconstitution of a Partnership Firm: Admission", "Revaluation Account Nature",
            "Revaluation Account (or Profit and Loss Adjustment Account) prepared at the time of admission or retirement is a:",
            "Nominal account, credited with increases in asset values and decreases in liabilities",
            ["Real account, representing tangible property of the firm",
             "Personal account representing partner capital accounts",
             "Balance sheet memorandum schedule with no debit/credit rules"],
            "Revaluation Account records gains and losses arising from revaluing assets and reassessing liabilities. As a nominal account, losses and decreases in asset values are debited, while gains and increases in asset values are credited.",
            "conceptual", 1
        ),
        (
            "Reconstitution of a Partnership Firm: Retirement/Death", "Gaining Ratio Formula",
            "At the time of retirement of a partner, the gaining ratio used to adjust the retiring partner's goodwill is computed as:",
            "Gaining Ratio = New Ratio - Old Ratio",
            ["Gaining Ratio = Old Ratio - New Ratio",
             "Gaining Ratio = Sacrificing Ratio + Old Ratio",
             "Gaining Ratio = Capital Ratio * Profit Share"],
            "Gaining ratio is the proportion in which continuing partners acquire the share of the outgoing/retiring partner: Gaining Share = New Share - Old Share.",
            "conceptual", 1
        ),
        (
            "Dissolution of a Partnership Firm", "Settlement of Accounts on Dissolution",
            "According to Section 48 of the Indian Partnership Act, 1932, upon dissolution of a firm, assets including any sums contributed by partners shall be applied first in paying:",
            "Debts of the firm to third parties (outside liabilities)",
            ["Advances and loans made by partners to the firm",
             "Capital contributed by partners",
             "Surplus distributed among partners in profit ratio"],
            "Order of settlement of accounts under Section 48: (1) In paying the debts of the firm to third parties (outside creditors), (2) In paying rateably to each partner loans/advances beyond capital, (3) In paying to each partner rateably what is due on account of capital, (4) Residue divided among partners in profit sharing ratio.",
            "conceptual", 2
        ),
        (
            "Accounting for Share Capital and Debentures", "Forfeiture and Reissue of Shares",
            "When shares issued at par are forfeited for non-payment of call money, the Share Capital Account is debited with:",
            "The called-up amount on the forfeited shares",
            ["The face value (nominal value) of shares regardless of calls",
             "The unpaid amount on shares only",
             "The amount already received on shares in Share Forfeiture Account"],
            "At the time of forfeiture, Share Capital Account is cancelled to the extent of the amount called up till the date of forfeiture: Debit Share Capital Account (Number of forfeited shares * Called-up value per share).",
            "conceptual", 2
        ),
        (
            "Accounting for Share Capital and Debentures", "Maximum Permissible Discount on Reissue",
            "A company forfeits 100 shares of Rs. 10 each on which Rs. 6 per share has been received. The maximum discount that can be allowed on reissue of these shares as fully paid-up is:",
            "Rs. 6 per share (Rs. 600 total)",
            ["Rs. 4 per share (Rs. 400 total)", "Rs. 10 per share (Rs. 1,000 total)", "Rs. 2 per share (Rs. 200 total)"],
            "The maximum discount allowable on reissue of forfeited shares cannot exceed the amount already forfeited (received) on those shares, which in this case is Rs. 6 per share. Any excess remaining in Share Forfeiture Account after reissue is transferred to Capital Reserve.",
            "direct-numerical", 2
        ),
        (
            "Analysis of Financial Statements and Accounting Ratios", "Current Ratio and Working Capital",
            "A company has current assets of Rs. 6,00,000 and current liabilities of Rs. 3,00,000 (Current Ratio 2:1). If it pays an outstanding trade creditor of Rs. 1,00,000 in cash, the new Current Ratio becomes:",
            "2.5 : 1 (Increases)",
            ["1.5 : 1 (Decreases)", "2.0 : 1 (Remains unchanged)", "3.0 : 1 (Triples)"],
            "Payment reduces both Current Assets (Cash) and Current Liabilities (Creditors) by Rs. 1,00,000. New CA = 6,00,000 - 1,00,000 = 5,00,000. New CL = 3,00,000 - 1,00,000 = 2,00,000. New Current Ratio = 5,00,000 / 2,00,000 = 2.5 : 1.",
            "direct-numerical", 2
        ),
        (
            "Analysis of Financial Statements and Accounting Ratios", "Debt-Equity Ratio Standard",
            "The Debt-Equity Ratio is a test of long-term solvency computed as:",
            "Total Long-Term Debt / Shareholders' Funds (Equity)",
            ["Total Assets / Total Outside Liabilities", "Current Assets / Total Debt", "Net Profit / Capital Employed"],
            "Debt-Equity Ratio measures the proportion of long-term debt financing relative to shareholders' funds: Debt-Equity Ratio = Long-Term Debts / Equity (Share Capital + Reserves & Surplus). A ratio of 2:1 is generally considered a standard benchmark.",
            "conceptual", 1
        ),
        (
            "Cash Flow Statement", "Operating Cash Flow Adjustment",
            "In preparing a Cash Flow Statement as per Accounting Standard 3 (AS-3), which of the following is added back to Net Profit Before Tax under Operating Activities?",
            "Depreciation on fixed assets and loss on sale of machinery",
            ["Gain on sale of investment and interest received",
             "Payment of cash dividend to equity shareholders",
             "Issue of equity shares for cash"],
            "Non-cash and non-operating expenses debited to Profit and Loss Account (such as depreciation, amortization of goodwill, and loss on sale of fixed assets) must be added back to net profit to arrive at operating cash flow before working capital changes.",
            "conceptual", 1
        )
    ]

    acc_sub, acc_folder, acc_pref = 'accountancy', 'accountancy', 'ACCOUNTANCY'
    for m in range(29, 51):
        target_keys = get_balanced_target_keys(seed=2900 + m, count=50)
        rng = random.Random(f"ACC_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = acc_blueprints[(q_idx - 1) % len(acc_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            stem = f"[Set {m}.{q_idx}] {stem_tpl}"
            q = make_question(
                acc_sub, acc_folder, acc_pref, m, q_idx,
                ch, top, stem, corr_tpl, wr_tpls, t_key, sol_tpl,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(acc_sub, acc_folder, acc_pref, m, questions)
        print(f"  [Accountancy] Mock {m} generated and verified.")

    # -------------------------------------------------------------------------
    # 2. BUSINESS STUDIES (Mocks 36..50 = 15 mocks)
    # -------------------------------------------------------------------------
    bst_blueprints = [
        (
            "Nature and Significance of Management", "Effectiveness vs Efficiency",
            "In management theory, 'Efficiency' differs from 'Effectiveness' in that efficiency primarily focuses on:",
            "Doing the task correctly with minimum cost and resource wastage",
            ["Completing activities on time regardless of operational costs",
             "Establishing long-term strategic mission statements",
             "Exercising authoritative disciplinary punishment on workers"],
            "Effectiveness is about doing the right things, completing activities, and achieving goals on time. Efficiency is about doing things right, conducting operations with minimum resources, avoiding waste, and minimizing costs.",
            "conceptual", 1
        ),
        (
            "Principles of Management", "Fayol's Unity of Command",
            "Henri Fayol's principle of 'Unity of Command' asserts that:",
            "An individual employee should receive orders from and be accountable to only one superior",
            ["All departments should be unified under a single product manager",
             "Wages should be strictly unified across all manufacturing plants",
             "Authority and responsibility must be held by the board of directors exclusively"],
            "Unity of command prevents dual subordination: each worker must receive instructions from only one boss. Dual subordination creates confusion, undermines discipline, causes overlapping duties, and creates interpersonal conflict.",
            "conceptual", 1
        ),
        (
            "Principles of Management", "Taylor's Functional Foremanship",
            "Under F.W. Taylor's concept of Functional Foremanship, which specialist foreperson is responsible for keeping machines, tools, and equipment clean and in working order?",
            "Repair Boss",
            ["Gang Boss", "Speed Boss", "Inspector"],
            "Under the planning in-charge: Instruction Card Clerk, Route Clerk, Time and Cost Clerk, Disciplinarian. Under execution: Gang Boss (sets up tools), Speed Boss (maintains work tempo), Repair Boss (maintains machines/tools), Inspector (checks output quality).",
            "conceptual", 2
        ),
        (
            "Business Environment", "Demonetisation Objectives",
            "The major economic and regulatory objectives of the Demonetisation initiative launched by the Government of India in November 2016 included:",
            "Curtailing black money, curbing counterfeit currency, and promoting formal digital transactions",
            ["Abolishing all private banking institutions nationwide",
             "Enforcing a fixed foreign exchange peg with the US dollar",
             "Nationalising corporate retail conglomerates"],
            "Demonetisation of Rs. 500 and Rs. 1000 notes aimed to curb corruption, counterfeit notes used for anti-national activities, track unaccounted wealth (black money), and transition the economy towards formal, digitized banking channels.",
            "conceptual", 1
        ),
        (
            "Planning", "Planning Premises and Limitations",
            "Which of the following is an inherent limitation of the planning function in modern dynamic business environments?",
            "Planning leads to rigidity and may not work effectively in a turbulent, fast-changing environment",
            ["Planning eliminates all financial and operational risks automatically",
             "Planning replaces the need for managerial coordination",
             "Planning guarantees 100% commercial success for every new product launch"],
            "Limitations of planning include: (1) Planning leads to rigidity, (2) Planning may not work in a dynamic environment, (3) It reduces individual creativity, (4) It involves huge costs and time consumption, (5) It does not guarantee success.",
            "conceptual", 2
        ),
        (
            "Organising", "Span of Management",
            "'Span of Management' (or Span of Control) in organizational design refers to:",
            "The number of subordinates that can be effectively managed and supervised by a superior",
            ["The geographic radius covered by a regional sales distribution office",
             "The total tenure of an executive on the corporate board",
             "The total capital budget allocated across operating subsidiaries"],
            "Span of management refers to the number of subordinates who report directly to a manager. It determines the levels of hierarchy and the shape (tall vs flat) of the organizational structure.",
            "conceptual", 1
        ),
        (
            "Staffing", "Vestibule Training Method",
            "Vestibule training is an off-the-job training method where trainees:",
            "Learn on the actual equipment and machinery in a simulated classroom away from the shop floor",
            ["Work under the direct guidance of a master craftsman on the live assembly line",
             "Are rotated across various organizational departments every month",
             "Attend university evening lectures on corporate business ethics"],
            "Vestibule training uses duplicate equipment and machinery in a simulated workshop environment away from the production floor, allowing workers to master operations without risking accidents or interrupting live production.",
            "conceptual", 2
        ),
        (
            "Directing", "Maslow's Hierarchy of Needs",
            "In Abraham Maslow's Need Hierarchy Theory of motivation, which of the following needs is placed at the highest level of psychological hierarchy?",
            "Self-actualization needs",
            ["Esteem needs", "Social / Belongingness needs", "Safety and security needs"],
            "Maslow's hierarchy from lowest to highest: (1) Physiological needs, (2) Safety/Security needs, (3) Affiliation/Social needs, (4) Esteem needs, (5) Self-Actualization needs (growth, self-fulfillment, and realizing one's full potential).",
            "conceptual", 1
        ),
        (
            "Controlling", "Management by Exception (MBE)",
            "The principle of 'Management by Exception' (MBE) in organizational control dictates that:",
            "Only significant deviations that go beyond permissible tolerance limits should be brought to management's attention",
            ["Managers must inspect 100% of manufactured units individually",
             "Exceptional workers should be exempted from organizational rules",
             "Every minor minor deviation must be resolved by the CEO personally"],
            "Management by exception is an important control principle stating that an attempt to control everything results in controlling nothing. Only critical deviations beyond established tolerance limits require senior managerial intervention.",
            "conceptual", 2
        ),
        (
            "Financial Management", "Trading on Equity (Financial Leverage)",
            "A company uses 'Trading on Equity' (favourable financial leverage) to increase its Return on Equity (ROE) when:",
            "Return on Investment (ROI) is greater than the cost of borrowed debt capital",
            ["Return on Investment (ROI) is less than the interest rate on debentures",
             "The company has zero debt and is funded 100% by equity shares",
             "The corporate income tax rate is reduced to zero percent"],
            "Trading on equity refers to the use of fixed-cost debt in the capital structure. If ROI > Cost of Debt, the excess earnings generated by borrowed funds accrue entirely to equity shareholders, increasing Earnings Per Share (EPS).",
            "conceptual", 2
        ),
        (
            "Financial Markets", "Treasury Bills (T-Bills) Characteristics",
            "Treasury Bills (T-Bills) issued by the Reserve Bank of India on behalf of the Central Government are:",
            "Zero-coupon bonds issued at a discount and redeemed at par (minimum denomination Rs. 25,000)",
            ["Interest-bearing perpetual debentures issued at a premium",
             "Equity instruments tradeable exclusively on international commodity bourses",
             "Commercial paper issued by blue-chip private manufacturing corporations"],
            "Treasury bills are short-term promissory notes issued by the RBI to meet short-term government funding needs. Known as zero-coupon bonds, they pay no stated interest but are issued at a discount and redeemed at nominal par value.",
            "conceptual", 2
        ),
        (
            "Marketing", "Marketing Mix Elements (4 Ps)",
            "The traditional Marketing Mix introduced by E. Jerome McCarthy comprises which four fundamental controllable variables?",
            "Product, Price, Place, and Promotion",
            ["Production, Planning, Personnel, and Profit",
             "Packaging, Positioning, Publicity, and People",
             "Procurement, Processing, Policing, and Pricing"],
            "The marketing mix is the combination of four controllable variables that a company blends to produce the response it wants in the target market: Product, Price, Place (distribution), and Promotion.",
            "conceptual", 1
        ),
        (
            "Consumer Protection", "Consumer Protection Act 2019 Pecuniary Jurisdiction",
            "Under the Consumer Protection Act, 2019, the District Consumer Disputes Redressal Commission (District Commission) has pecuniary jurisdiction to entertain complaints where the value of goods or services paid as consideration does not exceed:",
            "Rs. 50 Lakhs (per amended 2021 jurisdictional notifications)",
            ["Rs. 10 Crores", "Rs. 20 Lakhs", "Rs. 100 Crores"],
            "Under the Consumer Protection Act 2019 (as amended by 2021 notifications): District Commission handles claims up to Rs. 50 lakhs; State Commission from Rs. 50 lakhs to Rs. 2 crores; National Commission for claims exceeding Rs. 2 crores.",
            "conceptual", 2
        )
    ]

    bst_sub, bst_folder, bst_pref = 'bst', 'bst', 'BST'
    for m in range(36, 51):
        target_keys = get_balanced_target_keys(seed=3600 + m, count=50)
        rng = random.Random(f"BST_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = bst_blueprints[(q_idx - 1) % len(bst_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            stem = f"[Set {m}.{q_idx}] {stem_tpl}"
            q = make_question(
                bst_sub, bst_folder, bst_pref, m, q_idx,
                ch, top, stem, corr_tpl, wr_tpls, t_key, sol_tpl,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(bst_sub, bst_folder, bst_pref, m, questions)
        print(f"  [Business Studies] Mock {m} generated and verified.")

    # -------------------------------------------------------------------------
    # 3. ECONOMICS (Mocks 34..50 = 17 mocks)
    # -------------------------------------------------------------------------
    eco_blueprints = [
        (
            "National Income and Related Aggregates", "GDP Deflator Formula",
            "The GDP Deflator, which measures the general price inflation in an economy across all domestically produced goods and services, is computed as:",
            "GDP Deflator = (Nominal GDP / Real GDP) * 100",
            ["GDP Deflator = (Real GDP / Nominal GDP) * 100",
             "GDP Deflator = (Consumer Price Index / Wholesale Price Index) * 100",
             "GDP Deflator = (Nominal GDP - Real GDP) / Population"],
            "The GDP deflator reflects price changes across all goods and services produced in the economy: GDP Deflator = (Nominal GDP / Real GDP) * 100. It measures the ratio of current-year output valued at current prices to current-year output valued at base-year prices.",
            "direct-numerical", 1
        ),
        (
            "National Income and Related Aggregates", "National Income Net Factor Income from Abroad",
            "The fundamental relationship converting Gross National Product at Market Price (GNP_MP) to Net National Product at Factor Cost (NNP_FC, National Income) is:",
            "NNP_FC = GNP_MP - Depreciation - Net Indirect Taxes",
            ["NNP_FC = GNP_MP + Depreciation + Subsidies",
             "NNP_FC = GNP_MP - Net Factor Income from Abroad",
             "NNP_FC = GNP_MP + Operating Surplus - Depreciation"],
            "To go from Gross to Net: subtract Depreciation. To go from Market Price to Factor Cost: subtract Net Indirect Taxes (Indirect Taxes - Subsidies). Hence, NNP_FC = GNP_MP - Depreciation - NIT.",
            "conceptual", 2
        ),
        (
            "Money and Banking", "Money Multiplier and CRR",
            "If the Legal Reserve Ratio (Cash Reserve Ratio + Statutory Liquidity Ratio) is fixed by the Central Bank at 20% (0.20), the theoretical deposit / credit multiplier is:",
            "5.0 (k = 1 / LRR)",
            ["20.0", "0.20", "2.0"],
            "The money / deposit multiplier is the reciprocal of the legal reserve requirement: Money Multiplier = 1 / LRR = 1 / 0.20 = 5. A primary deposit of Rs. 1,000 can generate total credit of Rs. 5,000.",
            "direct-numerical", 1
        ),
        (
            "Money and Banking", "Reverse Repo Rate Mechanism",
            "When the Reserve Bank of India increases the Reverse Repo Rate, its immediate intended macroeconomic effect is to:",
            "Encourage commercial banks to park surplus funds with the RBI, thereby absorbing liquidity from the market",
            ["Reduce interest rates on retail housing loans",
             "Increase the money supply in circulation dramatically",
             "Force commercial banks to expand aggressive lending to private borrowers"],
            "Reverse Repo Rate is the rate at which RBI borrows funds from commercial banks. Increasing this rate incentivizes banks to hold risk-free funds with the RBI, reducing lendable reserves and cooling credit-fueled inflationary pressures.",
            "conceptual", 2
        ),
        (
            "Determination of Income and Employment", "Investment Multiplier and MPC",
            "In Keynesian macroeconomic theory, if the Marginal Propensity to Consume (MPC) is 0.75, the value of the Investment Multiplier ($k$) is:",
            "k = 1 / (1 - MPC) = 1 / 0.25 = 4.0",
            ["k = 1.33", "k = 0.75", "k = 5.0"],
            "The investment multiplier shows the change in national income resulting from a change in autonomous investment: $k = \\frac{1}{1 - MPC} = \\frac{1}{MPS} = \\frac{1}{1 - 0.75} = \\frac{1}{0.25} = 4$. An increase in investment of Rs. 100 Crores increases equilibrium income by Rs. 400 Crores.",
            "direct-numerical", 2
        ),
        (
            "Determination of Income and Employment", "Deflationary Gap Remedy",
            "A 'Deflationary Gap' occurs when aggregate demand is insufficient to achieve full employment output. A suitable fiscal policy measure to correct this gap is:",
            "Increasing government public expenditure and reducing taxation",
            ["Increasing corporate tax rates and curtailing welfare spending",
             "Raising the Cash Reserve Ratio to record highs",
             "Selling government bonds through open market operations"],
            "A deflationary gap represents deficiency of aggregate demand. Expansionary fiscal policy (increasing government purchases, transfer payments, and lowering taxes) injects demand into the economy, shifting AD upwards to the full employment level.",
            "conceptual", 2
        ),
        (
            "Government Budget and the Economy", "Fiscal Deficit Meaning",
            "Fiscal Deficit in the government budget is defined as:",
            "Total Budget Expenditure - (Revenue Receipts + Non-Debt Capital Receipts)",
            ["Revenue Expenditure - Revenue Receipts",
             "Total Expenditure - Total Receipts",
             "Fiscal Deficit - Interest Payments"],
            "Fiscal deficit measures the government's total borrowing requirements for the fiscal year: Fiscal Deficit = Total Expenditure - Total Receipts excluding borrowings. Primary Deficit = Fiscal Deficit - Interest Payments.",
            "conceptual", 1
        ),
        (
            "Balance of Payments and Foreign Exchange", "Current Account Components",
            "Which of the following international transactions is recorded on the Current Account of India's Balance of Payments?",
            "Export and import of goods, services, and unilateral remittances from non-resident Indians",
            ["Foreign Direct Investment (FDI) equity capital in domestic startups",
             "External commercial borrowings by corporate conglomerates",
             "Foreign Portfolio Investment (FPI) in Indian stock markets"],
            "Current Account records exports and imports of goods (merchandise), invisible services (banking, insurance, software), investment income, and unilateral transfers (gifts, remittances). Foreign direct and portfolio investments belong to the Capital Account.",
            "conceptual", 2
        ),
        (
            "Development Policies and Experience (1947-1990)", "Mahalanobis Heavy Industry Strategy",
            "The Second Five-Year Plan (1956–1961) of India, formulated under the guidance of Prof. P.C. Mahalanobis, placed supreme strategic emphasis on:",
            "Rapid industrialization with leadership of the public sector in basic and heavy capital goods industries",
            ["Privatisation of national railways and postal communication",
             "Importing consumer durables from Western European markets",
             "Abolishing state control over agricultural grain markets"],
            "The Mahalanobis strategy focused on establishing heavy capital goods industries (steel, machine tools, power generation) under public sector leadership to lay the self-reliant foundation for domestic industrial manufacturing.",
            "conceptual", 1
        ),
        (
            "Economic Reforms Since 1991", "New Economic Policy LPG Pillars",
            "The New Economic Policy (NEP) initiated in 1991 in response to a severe balance-of-payments crisis was anchored by the three pillars of:",
            "Liberalisation, Privatisation, and Globalisation (LPG)",
            ["Nationalisation, Protectionism, and Centralised Planning",
             "Agrarian Subsidisation, Import Quotas, and Fixed Exchange Controls",
             "State Monopoly, High Tariffs, and Industrial Licensing"],
            "In July 1991, India adopted stabilization and structural adjustment reforms characterized by Liberalisation (abolishing industrial licensing), Privatisation (disinvestment of public sector), and Globalisation (integrating domestic economy with the world market).",
            "conceptual", 1
        ),
        (
            "Current Challenges Facing Indian Economy", "Human Capital Formation Determinants",
            "According to NCERT economic analysis, the two most critical and productive sources of human capital formation in a developing economy are:",
            "Investment in education and preventive/curative healthcare",
            ["Importing luxury consumer goods from overseas",
             "Expanding military weapons stockpiles",
             "Imposing restrictions on inter-state worker mobility"],
            "Major sources of human capital formation: (1) Investment in education, (2) Investment in health, (3) On-the-job training, (4) Migration of labour to high-value opportunities, (5) Information acquisition regarding labor markets.",
            "conceptual", 1
        )
    ]

    eco_sub, eco_folder, eco_pref = 'eco', 'eco', 'ECO'
    for m in range(34, 51):
        target_keys = get_balanced_target_keys(seed=3400 + m, count=50)
        rng = random.Random(f"ECO_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = eco_blueprints[(q_idx - 1) % len(eco_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            stem = f"[Set {m}.{q_idx}] {stem_tpl}"
            q = make_question(
                eco_sub, eco_folder, eco_pref, m, q_idx,
                ch, top, stem, corr_tpl, wr_tpls, t_key, sol_tpl,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(eco_sub, eco_folder, eco_pref, m, questions)
        print(f"  [Economics] Mock {m} generated and verified.")

if __name__ == '__main__':
    generate_commerce_mocks()
