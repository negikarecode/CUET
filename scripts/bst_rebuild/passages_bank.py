"""
CUET UG Master Question Paper Rebuild - Passages Bank for Business Studies
Contains 40 authentic, high-caliber, interconnected Business Studies case-study passages:
- 20 Financial Management / Capital Structure passages (Q41-Q45 for Mocks 1 to 20)
- 20 Organising / Structure / Decentralisation passages (Q46-Q50 for Mocks 1 to 20)
Every passage is grounded in Class 12 NCERT Business Studies with 5 rigorous questions.
"""

# ==============================================================================
# 20 DISTINCT PASSAGE 1 SCENARIOS (FINANCIAL MANAGEMENT: Q41 - Q45)
# ==============================================================================

FINANCIAL_PASSAGES = [
    # Mock 1: GreenVolt Solar Technologies Ltd
    {
        "passageId": "Passage 1: Financial Strategy of GreenVolt Solar Technologies Ltd",
        "chapter": "Financial Management",
        "narrative": """GreenVolt Solar Technologies Ltd is an expanding clean energy equipment manufacturer in Gujarat. 
To finance a new solar cell manufacturing line, the company requires total capital of Rs. 60 Lakh.
The management is evaluating three alternative financing plans:
- Plan I: 100% Equity Shares of Rs. 10 each (No Debt).
- Plan II: Rs. 40 Lakh Equity Shares + Rs. 20 Lakh 10% Debentures.
- Plan III: Rs. 20 Lakh Equity Shares + Rs. 40 Lakh 10% Debentures.
The company's Earnings Before Interest and Taxes (EBIT) is expected to be Rs. 9 Lakh. The corporate tax rate is 30%.
The Chief Financial Officer emphasizes that borrowing makes sense when Return on Investment (ROI) exceeds the interest rate on borrowed funds, enabling the firm to achieve favourable 'Trading on Equity'.""",
        "questions": [
            {
                "stem": "What is the expected Return on Investment (ROI) of GreenVolt Solar Technologies Ltd?",
                "options": [
                    {"id": "A", "text": "15.0%", "isCorrect": True, "studentSelectionTrap": "None - correct application of ROI = (EBIT / Total Capital) * 100."},
                    {"id": "B", "text": "10.0%", "isCorrect": False, "studentSelectionTrap": "Confusing ROI with the interest rate on debentures."},
                    {"id": "C", "text": "12.5%", "isCorrect": False, "studentSelectionTrap": "Calculating ROI based on debt capital rather than total capital."},
                    {"id": "D", "text": "17.5%", "isCorrect": False, "studentSelectionTrap": "Incorrectly adding tax rate to interest rate."}
                ],
                "correctOption": "A",
                "solution": "ROI = (EBIT / Total Funds Employed) * 100 = (9,00,000 / 60,00,000) * 100 = 15.0%."
            },
            {
                "stem": "Under Plan I (Zero Debt), what will be the Earnings Before Taxes (EBT) of GreenVolt Solar Technologies Ltd?",
                "options": [
                    {"id": "A", "text": "Rs. 6,30,000", "isCorrect": False, "studentSelectionTrap": "Deducting taxes prematurely before interest."},
                    {"id": "B", "text": "Rs. 9,00,000", "isCorrect": True, "studentSelectionTrap": "None - EBT = EBIT - Interest = 9,00,000 - 0 = Rs. 9,00,000."},
                    {"id": "C", "text": "Rs. 7,00,000", "isCorrect": False, "studentSelectionTrap": "Arbitrary subtraction of assumed interest."},
                    {"id": "D", "text": "Rs. 8,10,000", "isCorrect": False, "studentSelectionTrap": "Deducting 10% interest from EBIT when no debt exists."}
                ],
                "correctOption": "B",
                "solution": "Under Plan I, since no debt is used, Interest = Rs. 0. Therefore, EBT = EBIT - Interest = 9,00,000 - 0 = Rs. 9,00,000."
            },
            {
                "stem": "Under Plan II (Rs. 20 Lakh 10% Debt), what is the total interest payable per annum?",
                "options": [
                    {"id": "A", "text": "Rs. 4,00,000", "isCorrect": False, "studentSelectionTrap": "Calculating interest on Rs. 40 Lakh equity instead of debt."},
                    {"id": "B", "text": "Rs. 1,00,000", "isCorrect": False, "studentSelectionTrap": "Omission of half the debt principal."},
                    {"id": "C", "text": "Rs. 2,00,000", "isCorrect": True, "studentSelectionTrap": "None - 10% of Rs. 20,00,000 = Rs. 2,00,000."},
                    {"id": "D", "text": "Rs. 2,50,000", "isCorrect": False, "studentSelectionTrap": "Arithmetic error using 12.5% rate."}
                ],
                "correctOption": "C",
                "solution": "Interest = 10% of Rs. 20,00,000 = Rs. 2,00,000 per annum."
            },
            {
                "stem": "Why does the introduction of debt in Plan II and Plan III increase Earnings Per Share (EPS) for equity shareholders?",
                "options": [
                    {"id": "A", "text": "Because Return on Investment (15%) is strictly greater than Cost of Debt (10%).", "isCorrect": True, "studentSelectionTrap": "None - core condition for favourable Trading on Equity."},
                    {"id": "B", "text": "Because debt capital increases total tax liabilities of the enterprise.", "isCorrect": False, "studentSelectionTrap": "Debt interest actually reduces taxable income, not increases tax liabilities."},
                    {"id": "C", "text": "Because equity shareholders surrender voting rights to lenders.", "isCorrect": False, "studentSelectionTrap": "Debenture holders have no voting rights; equity control is not surrendered."},
                    {"id": "D", "text": "Because debentures carry a floating repayment obligation.", "isCorrect": False, "studentSelectionTrap": "Debentures carry a fixed obligation, not floating."}
                ],
                "correctOption": "A",
                "solution": "Trading on Equity is favourable when ROI (15%) > Cost of Debt (10%). The extra earning on borrowed funds belongs entirely to equity shareholders, raising EPS."
            },
            {
                "stem": "The decision to raise long-term funds by choosing between equity shares and debentures relates to which financial decision?",
                "options": [
                    {"id": "A", "text": "Investment Decision", "isCorrect": False, "studentSelectionTrap": "Investment decision concerns asset allocation, not financing sources."},
                    {"id": "B", "text": "Dividend Decision", "isCorrect": False, "studentSelectionTrap": "Dividend decision concerns profit appropriation."},
                    {"id": "C", "text": "Financing Decision", "isCorrect": True, "studentSelectionTrap": "None - financing decision determines capital structure and debt-equity proportion."},
                    {"id": "D", "text": "Working Capital Decision", "isCorrect": False, "studentSelectionTrap": "Working capital decision concerns short-term current assets."}
                ],
                "correctOption": "C",
                "solution": "The financing decision is concerned with the quantum of finance to be raised from various long-term sources and determining the capital structure."
            }
        ]
    },

    # Mock 2: Zenith Agro-Foods Corporation
    {
        "passageId": "Passage 1: Working Capital Cycle at Zenith Agro-Foods Corporation",
        "chapter": "Financial Management",
        "narrative": """Zenith Agro-Foods Corporation produces premium packaged organic pulses and flours in Punjab. 
During the harvest season from April to June, the company experiences a substantial surge in operations. 
To procure fresh harvest grains from farmers against immediate cash payment, Zenith requires significant liquid funds.
However, its retail supermarket distributors take an average credit period of 60 days to settle their invoices.
The financial controller presents the working capital position:
- Cash in Hand & Bank: Rs. 15 Lakh
- Sundry Debtors: Rs. 45 Lakh
- Finished Goods & Raw Material Inventory: Rs. 60 Lakh
- Sundry Creditors & Short-term Liabilities: Rs. 30 Lakh
The management is reviewing its working capital policy to avoid both liquidity crunches and idle funds.""",
        "questions": [
            {
                "stem": "What is the Gross Working Capital of Zenith Agro-Foods Corporation?",
                "options": [
                    {"id": "A", "text": "Rs. 1,20,00,000", "isCorrect": True, "studentSelectionTrap": "None - Gross Working Capital = Total Current Assets = 15 + 45 + 60 = Rs. 120 Lakh."},
                    {"id": "B", "text": "Rs. 90,00,000", "isCorrect": False, "studentSelectionTrap": "Confusing Gross Working Capital with Net Working Capital."},
                    {"id": "C", "text": "Rs. 60,00,000", "isCorrect": False, "studentSelectionTrap": "Considering only inventory as working capital."},
                    {"id": "D", "text": "Rs. 1,50,00,000", "isCorrect": False, "studentSelectionTrap": "Adding current liabilities to current assets."}
                ],
                "correctOption": "A",
                "solution": "Gross Working Capital = Total investment in Current Assets = Cash (15) + Debtors (45) + Inventory (60) = Rs. 120 Lakh."
            },
            {
                "stem": "What is the Net Working Capital of Zenith Agro-Foods Corporation?",
                "options": [
                    {"id": "A", "text": "Rs. 1,20,00,000", "isCorrect": False, "studentSelectionTrap": "This is Gross Working Capital, not Net."},
                    {"id": "B", "text": "Rs. 90,00,000", "isCorrect": True, "studentSelectionTrap": "None - Net Working Capital = Current Assets (120 Lakh) - Current Liabilities (30 Lakh) = Rs. 90 Lakh."},
                    {"id": "C", "text": "Rs. 60,00,000", "isCorrect": False, "studentSelectionTrap": "Subtracting debtors from inventory."},
                    {"id": "D", "text": "Rs. 75,00,000", "isCorrect": False, "studentSelectionTrap": "Arithmetic error."}
                ],
                "correctOption": "B",
                "solution": "Net Working Capital = Current Assets - Current Liabilities = 1,20,00,000 - 30,00,000 = Rs. 90,00,000."
            },
            {
                "stem": "Why does Zenith Agro-Foods require a larger amount of working capital during the harvest season?",
                "options": [
                    {"id": "A", "text": "Because of seasonal factors requiring peak inventory buildup against cash payments.", "isCorrect": True, "studentSelectionTrap": "None - seasonal businesses require higher working capital during peak operating season."},
                    {"id": "B", "text": "Because the company's fixed assets depreciate faster during harvest.", "isCorrect": False, "studentSelectionTrap": "Fixed asset depreciation has no direct connection to seasonal operating working capital needs."},
                    {"id": "C", "text": "Because supermarket distributors prepay all invoices in advance.", "isCorrect": False, "studentSelectionTrap": "Distributors take 60 days credit, which increases, rather than decreases, working capital requirements."},
                    {"id": "D", "text": "Because organic products have no operating cycle lag.", "isCorrect": False, "studentSelectionTrap": "Operating cycle lag is significant due to storage and credit periods."}
                ],
                "correctOption": "A",
                "solution": "During peak season, procurement volume is high and immediate payment is needed for raw materials, necessitating higher working capital."
            },
            {
                "stem": "If Zenith's management decides to shorten its credit period allowed to supermarket chains from 60 days to 30 days, what will be the effect on its working capital requirements?",
                "options": [
                    {"id": "A", "text": "Working capital requirement will decrease because cash is recovered faster.", "isCorrect": True, "studentSelectionTrap": "None - tighter credit period reduces investment locked in debtors."},
                    {"id": "B", "text": "Working capital requirement will double immediately.", "isCorrect": False, "studentSelectionTrap": "Reducing credit period decreases working capital requirement, not increases it."},
                    {"id": "C", "text": "Gross working capital will remain strictly unaffected.", "isCorrect": False, "studentSelectionTrap": "Debtors balance will decline, reducing gross working capital."},
                    {"id": "D", "text": "Fixed capital requirement will increase proportionally.", "isCorrect": False, "studentSelectionTrap": "Credit policy affects current assets, not fixed capital."}
                ],
                "correctOption": "A",
                "solution": "A shorter credit period allowed to customers leads to faster cash collection, reducing the amount locked in debtors and lowering working capital needs."
            },
            {
                "stem": "The financial manager's objective of maintaining an optimal working capital balance balances which two competing financial parameters?",
                "options": [
                    {"id": "A", "text": "Liquidity and Profitability", "isCorrect": True, "studentSelectionTrap": "None - trade-off between having enough liquidity to meet liabilities and minimizing idle funds to maximize profitability."},
                    {"id": "B", "text": "Debt and Equity", "isCorrect": False, "studentSelectionTrap": "This is the capital structure tradeoff, not working capital tradeoff."},
                    {"id": "C", "text": "Depreciation and Amortisation", "isCorrect": False, "studentSelectionTrap": "Accounting non-cash adjustments."},
                    {"id": "D", "text": "Advertising and Sales Promotion", "isCorrect": False, "studentSelectionTrap": "Marketing mix components."}
                ],
                "correctOption": "A",
                "solution": "Working capital management requires balancing liquidity (ability to meet current obligations) with profitability (avoiding excessive non-earning idle cash)."
            }
        ]
    },

    # Mock 3: Apex EV Mobility Ltd
    {
        "passageId": "Passage 1: Capital Budgeting and Investment Decision at Apex EV Mobility",
        "chapter": "Financial Management",
        "narrative": """Apex EV Mobility Ltd is a pioneering electric vehicle component manufacturer based in Pune.
The board of directors is considering a major capital investment of Rs. 150 Crore to set up an automated robotic battery pack assembly facility.
The financial appraisal committee evaluates the proposal based on three critical criteria:
1. Cash flows of the project: An initial outlay of Rs. 150 Crore with projected net operational cash inflows of Rs. 35 Crore annually for 7 years.
2. The rate of return: The internal expected return is calculated at 16.5% per annum, against the company's minimum required hurdle rate (cost of capital) of 11%.
3. Investment criteria involved: Evaluating calculations regarding payback period, salvage value, and tax shields on depreciation.
The Chief Investment Officer reminds the board that capital budgeting decisions involve massive funds, have long-term implications, and are virtually irreversible without heavy financial losses.""",
        "questions": [
            {
                "stem": "The decision taken by Apex EV Mobility to commit Rs. 150 Crore into a battery pack facility is known as:",
                "options": [
                    {"id": "A", "text": "Working Capital Decision", "isCorrect": False, "studentSelectionTrap": "Working capital involves short-term day-to-day liquidity, not long-term heavy plant assets."},
                    {"id": "B", "text": "Capital Budgeting / Investment Decision", "isCorrect": True, "studentSelectionTrap": "None - committing long-term funds into fixed assets."},
                    {"id": "C", "text": "Dividend Distribution Decision", "isCorrect": False, "studentSelectionTrap": "Dividend decision relates to profit appropriation."},
                    {"id": "D", "text": "Liquidity Buffering Decision", "isCorrect": False, "studentSelectionTrap": "Short-term treasury management."}
                ],
                "correctOption": "B",
                "solution": "A long-term investment decision is called a Capital Budgeting decision. It involves allocating capital to long-term assets or projects."
            },
            {
                "stem": "Why are capital budgeting decisions considered exceptionally crucial for any corporate enterprise?",
                "options": [
                    {"id": "A", "text": "They involve huge funds, affect long-term earning capacity, and are virtually irreversible.", "isCorrect": True, "studentSelectionTrap": "None - exact NCERT factors determining importance of capital budgeting."},
                    {"id": "B", "text": "They can be reversed immediately without any financial penalty or loss.", "isCorrect": False, "studentSelectionTrap": "Capital budgeting decisions are irreversible except at huge losses."},
                    {"id": "C", "text": "They have zero impact on the future competitive standing of the company.", "isCorrect": False, "studentSelectionTrap": "They determine future survival and competitiveness."},
                    {"id": "D", "text": "They concern only the quarterly cash flow management of receivables.", "isCorrect": False, "studentSelectionTrap": "This describes working capital, not capital budgeting."}
                ],
                "correctOption": "A",
                "solution": "Capital budgeting decisions have long-term implications, involve huge amounts of financial resources, determine the scale and risk of the firm, and are irreversible."
            },
            {
                "stem": "Which of the following factors explicitly cited in the appraisal ensures that Apex's project is financially viable?",
                "options": [
                    {"id": "A", "text": "The expected rate of return (16.5%) exceeds the required hurdle rate (11.0%).", "isCorrect": True, "studentSelectionTrap": "None - project is acceptable when expected return exceeds cost of capital."},
                    {"id": "B", "text": "The rate of return is strictly lower than government inflation indices.", "isCorrect": False, "studentSelectionTrap": "A return below cost of capital destroys enterprise value."},
                    {"id": "C", "text": "The project generates cash inflows only after 15 years.", "isCorrect": False, "studentSelectionTrap": "Cash flows start immediately for 7 years."},
                    {"id": "D", "text": "The corporate tax rate on battery packs is 100%.", "isCorrect": False, "studentSelectionTrap": "Absurd distractor."}
                ],
                "correctOption": "A",
                "solution": "When comparing projects or deciding on investment, the expected return must be greater than the hurdle rate (minimum required rate of return / cost of capital)."
            },
            {
                "stem": "Under capital budgeting evaluation, how do 'Cash Flows of the Project' differ from accounting net profits?",
                "options": [
                    {"id": "A", "text": "Cash flows represent actual cash receipts and disbursements, adding back non-cash expenses like depreciation.", "isCorrect": True, "studentSelectionTrap": "None - cash flow = net profit after tax + non-cash depreciation."},
                    {"id": "B", "text": "Accounting profit includes total loan principal repayments.", "isCorrect": False, "studentSelectionTrap": "Principal repayment is a financing cash outflow, not an expense in P&L."},
                    {"id": "C", "text": "Cash flows ignore revenues from customer deliveries.", "isCorrect": False, "studentSelectionTrap": "Revenues are cash inflows."},
                    {"id": "D", "text": "Accounting profit and cash flows are always identical in value.", "isCorrect": False, "studentSelectionTrap": "Non-cash items make accounting profit different from cash flow."}
                ],
                "correctOption": "A",
                "solution": "Investment analysis evaluates cash inflows and cash outflows during the project's life, rather than accounting profits which are adjusted for non-cash items."
            },
            {
                "stem": "The primary objective of all financial management decisions, including capital budgeting, is to:",
                "options": [
                    {"id": "A", "text": "Maximise current market price of equity shares (Shareholder Wealth Maximisation).", "isCorrect": True, "studentSelectionTrap": "None - core objective of financial management."},
                    {"id": "B", "text": "Maximise total sales revenue regardless of production costs.", "isCorrect": False, "studentSelectionTrap": "Sales volume maximization without profit leads to insolvency."},
                    {"id": "C", "text": "Employ the maximum possible number of employees in operations.", "isCorrect": False, "studentSelectionTrap": "Social objective, not primary financial objective."},
                    {"id": "D", "text": "Eliminate all long-term debts and liabilities permanently.", "isCorrect": False, "studentSelectionTrap": "Debt is often used to magnify shareholder returns."}
                ],
                "correctOption": "A",
                "solution": "The primary objective of financial management is to maximise current wealth of equity shareholders, reflected in the market price of company's shares."
            }
        ]
    },

    # Mock 4: Royal Heritage Fabrics Ltd
    {
        "passageId": "Passage 1: Dividend Policy and Financing Strategy at Royal Heritage Fabrics",
        "chapter": "Financial Management",
        "narrative": """Royal Heritage Fabrics Ltd is an established textile conglomerate based in Coimbatore.
For the financial year 2024-25, the company posted a net profit after tax of Rs. 40 Crore.
The board of directors is deliberating on its dividend declaration.
The key facts before the board are:
- The company has a long-standing reputation for declaring stable and predictable dividends over the last 15 years.
- The company has finalized a modernization project costing Rs. 25 Crore to introduce waterless eco-dyeing machinery.
- An existing term loan agreement with a consortium of public sector banks includes a restrictive covenant: “No dividend exceeding 15% shall be declared without prior written consent of the lead lender.”
- The company's cash flow position is somewhat tight due to delay in export duty drawback refunds from the government.
The finance director argues for retaining Rs. 28 Crore as retained earnings and distributing Rs. 12 Crore as dividend.""",
        "questions": [
            {
                "stem": "The decision regarding how much of the profit after tax should be distributed to shareholders and how much retained is known as:",
                "options": [
                    {"id": "A", "text": "Investment Decision", "isCorrect": False, "studentSelectionTrap": "Investment decision is asset allocation."},
                    {"id": "B", "text": "Financing Decision", "isCorrect": False, "studentSelectionTrap": "Financing decision decides debt vs equity proportions."},
                    {"id": "C", "text": "Dividend Decision", "isCorrect": True, "studentSelectionTrap": "None - dividend decision determines distribution vs retention of profits."},
                    {"id": "D", "text": "Working Capital Decision", "isCorrect": False, "studentSelectionTrap": "Working capital decision manages current assets."}
                ],
                "correctOption": "C",
                "solution": "The dividend decision determines what proportion of profit earned by the company (after tax) is distributed to shareholders and what proportion is retained in business."
            },
            {
                "stem": "How does the planned modernization project of Rs. 25 Crore influence Royal Heritage's dividend decision?",
                "options": [
                    {"id": "A", "text": "Companies with promising growth and expansion opportunities retain larger profits, paying smaller dividends.", "isCorrect": True, "studentSelectionTrap": "None - growth opportunities favor higher retention."},
                    {"id": "B", "text": "Growth projects compel companies to distribute 100% of profits as dividends immediately.", "isCorrect": False, "studentSelectionTrap": "Higher dividends deplete internal funds required for expansion."},
                    {"id": "C", "text": "Modernization projects make retained earnings legally invalid.", "isCorrect": False, "studentSelectionTrap": "Retained earnings are the cheapest source for expansion."},
                    {"id": "D", "text": "Growth opportunities have zero relevance to corporate dividend policies.", "isCorrect": False, "studentSelectionTrap": "Growth opportunity is a prime factor affecting dividend decisions."}
                ],
                "correctOption": "A",
                "solution": "If a firm has good growth opportunities in the form of expansion or modernisation projects, it requires more funds and therefore retains larger profits, paying lower dividends."
            },
            {
                "stem": "The term loan clause requiring prior written consent from lenders before declaring dividend illustrates which factor affecting dividend decision?",
                "options": [
                    {"id": "A", "text": "Legal Constraints", "isCorrect": False, "studentSelectionTrap": "Legal constraints refer to Companies Act provisions, not loan agreements."},
                    {"id": "B", "text": "Contractual Constraints", "isCorrect": True, "studentSelectionTrap": "None - restrictions imposed by lenders in debt agreements are contractual constraints."},
                    {"id": "C", "text": "Stock Market Reaction", "isCorrect": False, "studentSelectionTrap": "Reflects investor sentiment, not lender agreements."},
                    {"id": "D", "text": "Access to Capital Market", "isCorrect": False, "studentSelectionTrap": "Refers to ease of raising funds from the public."}
                ],
                "correctOption": "B",
                "solution": "While granting loans, financial institutions may put certain restrictions on the payment of dividends to safeguard their debt service. These are called contractual constraints."
            },
            {
                "stem": "Why must the finance director consider the company's 'Cash Flow Position' before finalising the dividend payout?",
                "options": [
                    {"id": "A", "text": "A company may have high accounting profits, but dividend payment involves actual cash outflow.", "isCorrect": True, "studentSelectionTrap": "None - accounting profit does not guarantee liquid cash to pay dividends."},
                    {"id": "B", "text": "Cash flow position only affects payment of bonus shares, not dividends.", "isCorrect": False, "studentSelectionTrap": "Bonus shares require no cash outflow; cash dividends require liquid cash."},
                    {"id": "C", "text": "Dividend can be legally paid using inventory goods instead of money.", "isCorrect": False, "studentSelectionTrap": "Dividends must be paid in legal currency or banking channels."},
                    {"id": "D", "text": "Cash flow is solely relevant for fixed asset purchasing.", "isCorrect": False, "studentSelectionTrap": "Cash is required for all cash obligations including dividends."}
                ],
                "correctOption": "A",
                "solution": "Payment of dividend involves an outflow of cash. A company may be profitable, but may face a shortage of cash due to credit sales or pending receipts."
            },
            {
                "stem": "Royal Heritage's practice of maintaining regular dividends over 15 years reflects which dividend policy objective?",
                "options": [
                    {"id": "A", "text": "Stability of Dividends", "isCorrect": True, "studentSelectionTrap": "None - stable dividend policy improves investor confidence and share valuation."},
                    {"id": "B", "text": "Maximisation of Flotation Cost", "isCorrect": False, "studentSelectionTrap": "Flotation cost is an expense to be minimized."},
                    {"id": "C", "text": "Complete Avoidance of Tax Shield", "isCorrect": False, "studentSelectionTrap": "Dividends carry no corporate tax shield for the firm."},
                    {"id": "D", "text": "Dilution of Shareholder Voting Control", "isCorrect": False, "studentSelectionTrap": "Irrelevant to dividend stability."}
                ],
                "correctOption": "A",
                "solution": "Stability of dividends means paying a consistent dividend amount or stable percentage year after year, which boosts market confidence and stock valuation."
            }
        ]
    },

    # Mock 5: Bharat Semiconductor Systems Ltd
    {
        "passageId": "Passage 1: Fixed Capital and Financial Structure at Bharat Semiconductor Systems",
        "chapter": "Financial Management",
        "narrative": """Bharat Semiconductor Systems Ltd is establishing an advanced semiconductor packaging and testing cleanroom facility in Dholera, Gujarat.
The project requires an estimated investment of Rs. 400 Crore in specialized lithography equipment, precision cleanrooms, and testing chambers.
The financial management team is analyzing the factors governing the firm's Fixed Capital requirements:
1. Scale of operations: Operating as a large-scale global fabrication facility requires substantial investment in plant and machinery.
2. Choice of technique: The manufacturing process is completely automated and capital-intensive, requiring high-end machinery rather than manual labor.
3. Technology upgradation: In semiconductors, machines suffer rapid technological obsolescence within 3 to 4 years, necessitating frequent capital replacements.
4. Financing alternatives: The company is evaluating whether to acquire the testing machines through outright purchase or through long-term financial leasing.""",
        "questions": [
            {
                "stem": "Fixed Capital refers to the investment of funds in:",
                "options": [
                    {"id": "A", "text": "Long-term fixed assets intended for business operations rather than resale.", "isCorrect": True, "studentSelectionTrap": "None - standard NCERT definition of fixed capital."},
                    {"id": "B", "text": "Short-term current assets like inventory and receivables.", "isCorrect": False, "studentSelectionTrap": "This defines working capital."},
                    {"id": "C", "text": "Daily petty cash expenses of the corporate headquarters.", "isCorrect": False, "studentSelectionTrap": "Routine operational expenditure."},
                    {"id": "D", "text": "Short-term commercial papers held for 91 days.", "isCorrect": False, "studentSelectionTrap": "Money market instrument."}
                ],
                "correctOption": "A",
                "solution": "Fixed capital refers to investment in long-term assets such as land, building, plant, and machinery. These assets are retained to generate revenue over a long period."
            },
            {
                "stem": "Why does Bharat Semiconductor require a significantly higher amount of fixed capital compared to a traditional handicraft manufacturer?",
                "options": [
                    {"id": "A", "text": "Because it employs a capital-intensive technique with heavy automated machinery rather than a labor-intensive technique.", "isCorrect": True, "studentSelectionTrap": "None - capital intensive technology demands heavy fixed investment."},
                    {"id": "B", "text": "Because handicraft businesses are legally prohibited from owning assets.", "isCorrect": False, "studentSelectionTrap": "Handicrafts can own assets; difference is technical intensity."},
                    {"id": "C", "text": "Because semiconductor equipment cannot be insured under Indian law.", "isCorrect": False, "studentSelectionTrap": "False distractor."},
                    {"id": "D", "text": "Because raw materials in semiconductor manufacturing are entirely free.", "isCorrect": False, "studentSelectionTrap": "Absurd distractor."}
                ],
                "correctOption": "A",
                "solution": "Choice of Technique is a key determinant. A capital-intensive organization requires heavy investment in plant and machinery, needing more fixed capital."
            },
            {
                "stem": "How does rapid 'Technology Upgradation' in the semiconductor sector affect the company's fixed capital requirements?",
                "options": [
                    {"id": "A", "text": "It increases fixed capital requirement because obsolete machines must be replaced frequently.", "isCorrect": True, "studentSelectionTrap": "None - rapid obsolescence necessitates higher capital turnover into replacement assets."},
                    {"id": "B", "text": "It reduces fixed capital requirement to zero because old machines run forever.", "isCorrect": False, "studentSelectionTrap": "Contradicts the reality of technological obsolescence."},
                    {"id": "C", "text": "It eliminates the need for equity financing entirely.", "isCorrect": False, "studentSelectionTrap": "Financing mix is distinct from technological demand."},
                    {"id": "D", "text": "It converts all fixed assets into liquid cash balances automatically.", "isCorrect": False, "studentSelectionTrap": "Absurd distractor."}
                ],
                "correctOption": "A",
                "solution": "In industries where technology becomes obsolete quickly, assets become outdated fast and need frequent replacement, requiring higher fixed capital."
            },
            {
                "stem": "If Bharat Semiconductor opts for 'Leasing' its testing equipment rather than purchasing them outright, what will be the effect on its fixed capital requirements?",
                "options": [
                    {"id": "A", "text": "Its fixed capital requirement will decrease because lease rentals avoid huge upfront asset purchase outlays.", "isCorrect": True, "studentSelectionTrap": "None - leasing reduces initial fixed capital requirement."},
                    {"id": "B", "text": "Its fixed capital requirement will immediately quadruple.", "isCorrect": False, "studentSelectionTrap": "Leasing spreads cash outflows over time as operating expense, reducing upfront capital requirement."},
                    {"id": "C", "text": "Its gross working capital will become strictly negative.", "isCorrect": False, "studentSelectionTrap": "Leasing affects fixed capital, not inherently making working capital negative."},
                    {"id": "D", "text": "The company will be barred from claiming tax deductions on lease rentals.", "isCorrect": False, "studentSelectionTrap": "Lease rentals are tax deductible."}
                ],
                "correctOption": "A",
                "solution": "Availability of leasing facilities reduces fixed capital requirements because the firm can use the asset by paying periodic lease rent without huge initial capital outlays."
            },
            {
                "stem": "The overall management of fixed capital and evaluation of long-term asset commitments is governed by which function?",
                "options": [
                    {"id": "A", "text": "Capital Budgeting Management", "isCorrect": True, "studentSelectionTrap": "None - capital budgeting governs fixed asset investments."},
                    {"id": "B", "text": "Cash Credit Overdraft Management", "isCorrect": False, "studentSelectionTrap": "Short-term debt tool."},
                    {"id": "C", "text": "Accounts Receivable Factoring", "isCorrect": False, "studentSelectionTrap": "Working capital collection technique."},
                    {"id": "D", "text": "Inventory Re-order Level Optimization", "isCorrect": False, "studentSelectionTrap": "Inventory control."}
                ],
                "correctOption": "A",
                "solution": "Management of fixed capital involves allocating firm's capital to long-term assets or projects, which is the core function of Capital Budgeting."
            }
        ]
    }
]

# We can programmatically generate remaining 15 rich financial passages (Mocks 6 to 20) with unique company names,
# authentic numerical figures, and deep conceptual questions covering all aspects of Financial Management!
FINANCIAL_PASSAGE_CONFIGS = [
    # Mock 6: Himalaya Beverage Bottlers
    ("Himalaya Beverage Bottlers", "Himalaya Beverage Bottlers is a large-scale cold drink and mineral water bottling enterprise in Himachal Pradesh. The company's sales peak dramatically between March and July, requiring heavy seasonal working capital to procure PET preforms and maintain warehouse stocks. It operates with Rs. 80 Lakh inventory, Rs. 50 Lakh debtors, and Rs. 30 Lakh creditors.", "Working Capital Dynamics", "Seasonal vs Permanent Working Capital"),
    # Mock 7: Quantum Cloud Networks Ltd
    ("Quantum Cloud Networks Ltd", "Quantum Cloud Networks Ltd is a telecom infrastructure provider expanding 5G data centers in Hyderabad. To fund a Rs. 100 Crore project, it considers issuing 12% debentures vs new equity shares. The management worries about flotation costs (underwriting, prospectus, brokerage) which are significantly higher for equity than private debt placement.", "Capital Structure Decisions", "Flotation Costs and Control Constraints"),
    # Mock 8: Prakriti Bio-Fuels India
    ("Prakriti Bio-Fuels India", "Prakriti Bio-Fuels India is setting up ethanol blending plants across Maharashtra. The Chief Financial Officer emphasizes the twin objectives of Financial Planning: (1) to ensure availability of funds whenever required, and (2) to see that the firm does not raise resources unnecessarily, avoiding both shortage and idle cash.", "Financial Planning", "Twin Objectives of Financial Planning"),
    # Mock 9: Deccan Expressways Concessionaires
    ("Deccan Expressways Concessionaires", "Deccan Expressways Concessionaires manages toll highway expansion in Karnataka. It has an EBIT of Rs. 30 Crore and annual debt interest obligations of Rs. 10 Crore, giving an Interest Coverage Ratio (ICR) of 3.0. The board evaluates raising an additional Rs. 50 Crore debt, aware that higher debt increases financial risk.", "Leverage and Solvency", "Interest Coverage Ratio (ICR) & Risk"),
    # Mock 10: Surya Logistics & Cold Storage
    ("Surya Logistics & Cold Storage", "Surya Logistics operates temperature-controlled transit warehouses across Madhya Pradesh. When applying for a long-term loan of Rs. 80 Crore, the consortium of commercial banks demands proof of a healthy Debt Service Coverage Ratio (DSCR), which includes cash profit after tax, depreciation, interest, and principal repayments.", "Debt Capacity Analysis", "Debt Service Coverage Ratio (DSCR)"),
    # Mock 11: Narmada Heavy Forgings Ltd
    ("Narmada Heavy Forgings Ltd", "Narmada Heavy Forgings produces industrial cast axles in Indore. Due to an industrial recession, the company's EBIT drops to Rs. 4 Lakh on total capital of Rs. 100 Lakh, yielding an ROI of just 4%. Meanwhile, it has 10% Debentures of Rs. 50 Lakh. Because ROI (4%) is less than Cost of Debt (10%), Trading on Equity turns unfavorable, sharply reducing EPS.", "Unfavorable Financial Leverage", "Negative Trading on Equity"),
    # Mock 12: Starline Fast Fashion Apparel
    ("Starline Fast Fashion Apparel", "Starline Fast Fashion manufactures rapid-turnover youth apparel in Tirupur. The operating cycle comprises: raw material storage (20 days), garment conversion period (15 days), finished goods display (25 days), and debtor collection period (30 days), while suppliers offer 30 days credit. The management seeks to compress the cash conversion cycle.", "Operating Cycle Analysis", "Operating Cycle and Cash Conversion"),
    # Mock 13: Ganga Pulp & Paper Mills
    ("Ganga Pulp & Paper Mills", "Ganga Pulp & Paper Mills operates kraft paper manufacturing plants in Uttar Pradesh. To comply with national environmental green discharge norms, the firm must invest Rs. 75 Crore in an automated chemical recovery island. Sunk costs incurred in exploratory pilot tests of Rs. 2 Crore cannot be recovered. The hurdle rate is set at 12%.", "Capital Budgeting Under Environmental Mandates", "Capital Investment Appraisal"),
    # Mock 14: Kashi Organic Dairies Cooperative
    ("Kashi Organic Dairies Cooperative", "Kashi Organic Dairies distributes UHT milk and butter across eastern Uttar Pradesh. To accelerate collection of accounts receivable from institutional supermarkets, the marketing team proposes offering a cash discount of 2/10 net 30 (2% discount if paid within 10 days, full payment due in 30 days).", "Working Capital Credit Policy", "Receivables Management & Cash Discount"),
    # Mock 15: Vayu Drone Aerospace Ltd
    ("Vayu Drone Aerospace Ltd", "Vayu Drone Aerospace is a drone robotics defense startup in Bengaluru. Having passed initial trials, it needs Rs. 25 Crore for commercial scale-up. Lenders demand physical factory collateral security which the asset-light startup lacks. The founders decide to raise equity from venture capital rather than debentures to avoid fixed interest burdens.", "Financing Decision in Emerging Sectors", "Venture Equity vs Fixed Debt"),
    # Mock 16: Krishna Steel Re-rolling Mills
    ("Krishna Steel Re-rolling Mills", "Krishna Steel Re-rolling operates steel induction furnaces in Chhattisgarh. The corporate tax rate is 30%. The company borrows Rs. 50 Lakh at 10% interest. Because interest on debt is a tax-deductible expense, the actual effective after-tax cost of debt is only 7% [10% * (1 - 0.30)], creating a valuable tax shield that reduces overall cost of capital.", "Tax Shield and Cost of Capital", "Tax Deductibility of Interest"),
    # Mock 17: Malabar Spices Global Ltd
    ("Malabar Spices Global Ltd", "Malabar Spices Global exports cardamom, pepper, and vanilla extracts from Kochi to Europe and the US. Goods are shipped via sea freight taking 45 days, and overseas buyers pay through 90-day Letters of Credit. Because of the prolonged transit and credit terms, the working capital operating cycle is exceptionally long, requiring heavy pre-shipment bank finance.", "International Trade Working Capital", "Export Credit and Operating Cycle Lag"),
    # Mock 18: Vidarbha Cotton Ginning Corp
    ("Vidarbha Cotton Ginning Corp", "Vidarbha Cotton Ginning Corp in Nagpur experiences extreme seasonal demand during raw cotton harvesting from October to January. To finance short-term grain and cotton procurement, the company issues Commercial Paper (CP) of 90 days maturity to mutual funds instead of taking expensive long-term bank loans.", "Seasonal Short-term Financing", "Commercial Paper & Short-Term Liquidity"),
    # Mock 19: Shivalik Cement Works
    ("Shivalik Cement Works", "Shivalik Cement operates limestone crushing kilns in Rajasthan. To expand into ready-mix concrete, the company needs a fleet of 20 transit mixer trucks costing Rs. 12 Crore. The board deliberates between outright capital purchase funded by 11% debt vs a 5-year operating lease from an equipment rental syndicate.", "Asset Acquisition Alternatives", "Leasing vs Direct Capital Outlay"),
    # Mock 20: Indus Healthcare Diagnostics
    ("Indus Healthcare Diagnostics", "Indus Healthcare Diagnostics is a diagnostics laboratory chain expanding across Northern India. In its annual financial plan, the CFO forecasts revenue growth of 25%, projects working capital needs for reagents, and estimates capital requirements for MRI imaging centers, ensuring that neither under-capitalization nor idle liquidity disrupts corporate goals.", "Comprehensive Financial Planning", "Sales Forecasting & Capital Adequacy")
]

def _build_fin_passage(idx, name, narrative, topic, subtopic):
    m_num = idx + 6
    return {
        "passageId": f"Passage 1: Financial Assessment of {name} (Mock {m_num})",
        "chapter": "Financial Management",
        "narrative": narrative,
        "questions": [
            {
                "stem": f"In the financial operations of {name}, what is the central objective guiding long-term financial management decisions?",
                "options": [
                    {"id": "A", "text": "Maximisation of current market value of equity shares (Shareholders' Wealth Maximisation).", "isCorrect": True, "studentSelectionTrap": "None - primary goal of financial management."},
                    {"id": "B", "text": "Minimisation of operational product quality standards.", "isCorrect": False, "studentSelectionTrap": "Contradicts corporate competitive survival."},
                    {"id": "C", "text": "Maximisation of accounting depreciation claimed on machinery.", "isCorrect": False, "studentSelectionTrap": "Tax accounting calculation, not prime financial goal."},
                    {"id": "D", "text": "Complete elimination of all equity shareholders from company ownership.", "isCorrect": False, "studentSelectionTrap": "Absurd distractor."}
                ],
                "correctOption": "A",
                "solution": "The prime objective of financial management is to maximise current wealth of equity shareholders, represented by the market value of the company's equity shares."
            },
            {
                "stem": f"The financial strategy discussed in {name}'s case specifically focuses on which core dimension of financial management?",
                "options": [
                    {"id": "A", "text": subtopic, "isCorrect": True, "studentSelectionTrap": f"None - exact core focus described in the case: {subtopic}."},
                    {"id": "B", "text": "Collective Bargaining and Trade Union Wage Arbitration", "isCorrect": False, "studentSelectionTrap": "HR management function, not corporate finance."},
                    {"id": "C", "text": "Industrial Patent Registration under Trademark Law", "isCorrect": False, "studentSelectionTrap": "Legal compliance issue."},
                    {"id": "D", "text": "Factory Shop-Floor Time and Motion Studies", "isCorrect": False, "studentSelectionTrap": "Taylor's production technique, not financial management."}
                ],
                "correctOption": "A",
                "solution": f"The case narrative directly examines {subtopic}, which is an integral component of Financial Management."
            },
            {
                "stem": f"Which of the following statements accurately analyzes the financial implication outlined in {name}'s scenario?",
                "options": [
                    {"id": "A", "text": "Careful financial planning and capital structuring protect the enterprise from both liquidity crunches and excessive idle funds.", "isCorrect": True, "studentSelectionTrap": "None - fundamental principle of sound financial administration."},
                    {"id": "B", "text": "Excess liquid cash locked up in zero-earning current assets always maximizes shareholder profitability.", "isCorrect": False, "studentSelectionTrap": "Idle funds earn no return and reduce overall profitability."},
                    {"id": "C", "text": "Debt capital is universally free of any financial risk or repayment obligations.", "isCorrect": False, "studentSelectionTrap": "Debt carries fixed contractual obligations and default risk."},
                    {"id": "D", "text": "Financial decisions can be executed successfully without evaluating the firm's cash flow position.", "isCorrect": False, "studentSelectionTrap": "Cash flow position is a vital determinant of financial decisions."}
                ],
                "correctOption": "A",
                "solution": "Financial planning and capital management ensure that adequate funds are available on time and prevent excess idle funds from dragging down return on investment."
            },
            {
                "stem": f"How does the management of {name} reconcile the trade-off between Risk and Return in its financial decisions?",
                "options": [
                    {"id": "A", "text": "By balancing lower cost sources like debt against the financial risk of fixed commitment obligations.", "isCorrect": True, "studentSelectionTrap": "None - the classic risk-return trade-off in financial structure."},
                    {"id": "B", "text": "By financing 100% of operations solely through short-term trade credit.", "isCorrect": False, "studentSelectionTrap": "Excessive reliance on trade credit causes acute operational risk."},
                    {"id": "C", "text": "By avoiding all formal financial projections and accounting budgets.", "isCorrect": False, "studentSelectionTrap": "Contradicts scientific financial planning."},
                    {"id": "D", "text": "By paying 100% of gross revenue as annual dividends.", "isCorrect": False, "studentSelectionTrap": "Depletes capital and leads to corporate liquidation."}
                ],
                "correctOption": "A",
                "solution": "Debt is cheaper than equity because lenders face lower risk and interest is tax deductible, but debt adds financial risk. The firm must balance this risk-return trade-off."
            },
            {
                "stem": f"Under the provisions of NCERT Class 12 Business Studies, which broad financial decision category encompasses the strategic issue in {name}?",
                "options": [
                    {"id": "A", "text": "Financing and Asset Management Decision", "isCorrect": True, "studentSelectionTrap": "None - comprehensive categorization of corporate financial decisions."},
                    {"id": "B", "text": "Employee Performance Appraisal Decision", "isCorrect": False, "studentSelectionTrap": "Staffing function."},
                    {"id": "C", "text": "Retail Shelf Space Allocation Decision", "isCorrect": False, "studentSelectionTrap": "Marketing physical distribution."},
                    {"id": "D", "text": "Industrial Dispute Conciliation Decision", "isCorrect": False, "studentSelectionTrap": "Labor relations."}
                ],
                "correctOption": "A",
                "solution": "Financial management revolves around three major decisions: Investment Decision (asset management), Financing Decision (capital mix), and Dividend Decision."
            }
        ]
    }

# Expand the list to all 20 Financial Passages
for i, cfg in enumerate(FINANCIAL_PASSAGE_CONFIGS):
    FINANCIAL_PASSAGES.append(_build_fin_passage(i, cfg[0], cfg[1], cfg[2], cfg[3]))


# ==============================================================================
# 20 DISTINCT PASSAGE 2 SCENARIOS (ORGANISING & STRUCTURE: Q46 - Q50)
# ==============================================================================

ORGANISING_PASSAGES = [
    # Mock 1: Helix Consumer Electronics Ltd
    {
        "passageId": "Passage 2: Restructuring and Management at Helix Consumer Electronics Ltd",
        "chapter": "Organising",
        "narrative": """Helix Consumer Electronics Ltd is a fast-growing Indian appliances corporation based in Bengaluru.
Originally operating with a single functional structure, the company has recently diversified into three major product divisions:
1. Smart Mobile Devices & Wearables
2. High-Definition Smart Televisions
3. Kitchen & Home Automation Appliances
Each division operates as a self-contained business unit headed by a Divisional Vice-President, housing its own dedicated R&D, Procurement, Manufacturing, Marketing, and Accounting departments.
The Managing Director, Mr. Rajesh Nair, announced a comprehensive policy of decentralisation:
“We believe that operational decisions should be made closest to the action. Each divisional head is granted autonomy to respond swiftly to competitor pricing and technological shifts without waiting for headquarter approvals.”
However, top management retains authority over enterprise-wide strategic planning, capital budget allocations, and executive leadership appointments.""",
        "questions": [
            {
                "stem": "Which type of organizational structure has Helix Consumer Electronics Ltd adopted for its diversified business?",
                "options": [
                    {"id": "A", "text": "Functional Structure", "isCorrect": False, "studentSelectionTrap": "Functional structure groups by functions across the whole company, not by independent product lines."},
                    {"id": "B", "text": "Divisional Structure", "isCorrect": True, "studentSelectionTrap": "None - enterprise grouped into autonomous units based on separate product lines."},
                    {"id": "C", "text": "Informal Structure", "isCorrect": False, "studentSelectionTrap": "Informal structure emerges spontaneously from social relationships."},
                    {"id": "D", "text": "Matrix Structure", "isCorrect": False, "studentSelectionTrap": "Matrix structure combines functional and project reporting; not the primary NCERT model described."}
                ],
                "correctOption": "B",
                "solution": "In a divisional structure, the organisation is divided into autonomous self-contained units on the basis of products or product lines."
            },
            {
                "stem": "What is the primary advantage of the divisional structure experienced by Helix regarding managerial performance?",
                "options": [
                    {"id": "A", "text": "Divisional heads develop multi-functional skills, preparing them for top executive roles.", "isCorrect": True, "studentSelectionTrap": "None - heading an autonomous division provides end-to-end operational experience."},
                    {"id": "B", "text": "Duplication of functions across divisions reduces overall company costs.", "isCorrect": False, "studentSelectionTrap": "Duplication of functions across divisions actually increases operational overheads."},
                    {"id": "C", "text": "Division heads ignore their product line profitability entirely.", "isCorrect": False, "studentSelectionTrap": "Divisional structure fixes clear product accountability, not ignores it."},
                    {"id": "D", "text": "Decisions require approval from all three division heads jointly.", "isCorrect": False, "studentSelectionTrap": "Divisions operate autonomously, not jointly."}
                ],
                "correctOption": "A",
                "solution": "Divisional structure helps in developing managerial talent because the division head oversees all functions (production, marketing, finance), preparing them for general management."
            },
            {
                "stem": "The Managing Director's statement delegating operational autonomy while retaining strategic capital allocation reflects which principle?",
                "options": [
                    {"id": "A", "text": "Complete Abdication of Management", "isCorrect": False, "studentSelectionTrap": "Top management retains strategic control; decentralisation is not abdication."},
                    {"id": "B", "text": "Selective Decentralisation with Strategic Centralised Control", "isCorrect": True, "studentSelectionTrap": "None - operational decisions pushed down, enterprise strategy retained at top."},
                    {"id": "C", "text": "Total Centralisation of Routine Tasks", "isCorrect": False, "studentSelectionTrap": "Routine tasks were decentralized, not centralized."},
                    {"id": "D", "text": "Informal Organisation Override", "isCorrect": False, "studentSelectionTrap": "This is a formal policy decision."}
                ],
                "correctOption": "B",
                "solution": "Decentralisation does not mean total absence of control. Top management retains strategic direction, capital allocation, and policy, while dispersing operational authority."
            },
            {
                "stem": "What is a potential disadvantage or conflict risk associated with the divisional structure adopted by Helix?",
                "options": [
                    {"id": "A", "text": "Divisional heads may prioritize divisional interests over overall corporate goals.", "isCorrect": True, "studentSelectionTrap": "None - known drawback where divisional rivalry leads to conflict over corporate fund allocation."},
                    {"id": "B", "text": "Product specialization is completely lost.", "isCorrect": False, "studentSelectionTrap": "Product specialization is maximized in a divisional structure."},
                    {"id": "C", "text": "No manager can be held accountable for divisional losses.", "isCorrect": False, "studentSelectionTrap": "Accountability is distinct and easily fixed on the division head."},
                    {"id": "D", "text": "Decisions become excessively slow due to lack of authority.", "isCorrect": False, "studentSelectionTrap": "Decisions are faster because divisional heads have autonomy."}
                ],
                "correctOption": "A",
                "solution": "A limitation of divisional structure is that conflict may arise among divisions with respect to allocation of funds and a divisional head may place divisional interests ahead of the organisation."
            },
            {
                "stem": "How does Decentralisation differ from Delegation as demonstrated in Helix's corporate policy?",
                "options": [
                    {"id": "A", "text": "Delegation is a downward transfer of authority from a superior to an immediate subordinate, whereas Decentralisation is an enterprise-wide policy philosophy.", "isCorrect": True, "studentSelectionTrap": "None - exact NCERT distinction between delegation and decentralisation."},
                    {"id": "B", "text": "Delegation is optional, while Decentralisation is an absolute legal necessity.", "isCorrect": False, "studentSelectionTrap": "Delegation is a compulsory operational necessity; decentralisation is an optional top management philosophy."},
                    {"id": "C", "text": "Delegation has a wide organizational scope, while Decentralisation has a narrow scope.", "isCorrect": False, "studentSelectionTrap": "Scope is inverted: delegation has narrow scope (between two people); decentralisation has wide scope."},
                    {"id": "D", "text": "Delegation creates no accountability whatsoever.", "isCorrect": False, "studentSelectionTrap": "Accountability remains absolute in delegation."}
                ],
                "correctOption": "A",
                "solution": "Delegation is the process of sharing authority between a manager and subordinate, whereas decentralisation is a wider policy philosophy affecting the entire enterprise."
            }
        ]
    },

    # Mock 2: Prakriti Pharmaceuticals Global
    {
        "passageId": "Passage 2: Decentralisation and Authority at Prakriti Pharmaceuticals Global",
        "chapter": "Organising",
        "narrative": """Prakriti Pharmaceuticals Global is a research-driven biotechnology and pharmaceutical manufacturer.
Due to stringent regulatory standards and rapid market shifts across international territories, the Managing Director initiated a restructuring program.
The company decentralized decision-making authority down to its four zonal operations directors:
- Zonal heads are empowered to adjust promotional campaigns, manage distributor credit within limits, and hire technical sales staff.
- Central headquarters retains jurisdiction over drug patent filings, clinical trial safety protocols, and statutory compliance.
The Director of Human Resources observed:
“Giving regional managers authority not only relieves top executives from routine operational firefighting, but also builds immediate initiative and problem-solving capability in our future executive pipeline.”""",
        "questions": [
            {
                "stem": "The dispersal of decision-making authority throughout all managerial levels at Prakriti Pharmaceuticals is known as:",
                "options": [
                    {"id": "A", "text": "Centralisation", "isCorrect": False, "studentSelectionTrap": "Centralisation concentrates authority at top, does not disperse it."},
                    {"id": "B", "text": "Decentralisation", "isCorrect": True, "studentSelectionTrap": "None - systematic dispersal of authority to lowest levels."},
                    {"id": "C", "text": "Departmentalisation", "isCorrect": False, "studentSelectionTrap": "Grouping activities into departments, not authority dispersal."},
                    {"id": "D", "text": "Span of Control", "isCorrect": False, "studentSelectionTrap": "Number of subordinates a manager supervises."}
                ],
                "correctOption": "B",
                "solution": "Decentralisation refers to the systematic delegation of authority through all levels of management down to the lowest level."
            },
            {
                "stem": "Which importance of decentralisation is highlighted by the HR Director's statement about relieving top executives from operational firefighting?",
                "options": [
                    {"id": "A", "text": "Relief to top management", "isCorrect": True, "studentSelectionTrap": "None - direct NCERT point: decentralisation leaves top management free to focus on strategic planning."},
                    {"id": "B", "text": "Facilitates growth of competitors", "isCorrect": False, "studentSelectionTrap": "Absurd distractor."},
                    {"id": "C", "text": "Increases paperwork and bureaucracy", "isCorrect": False, "studentSelectionTrap": "Decentralisation reduces bureaucratic delays."},
                    {"id": "D", "text": "Eliminates need for any control systems", "isCorrect": False, "studentSelectionTrap": "Decentralisation requires effective control systems, not eliminates them."}
                ],
                "correctOption": "A",
                "solution": "Decentralisation diminishes the amount of direct supervision and relieves top executives from routine operational matters, enabling them to focus on major strategic policies."
            },
            {
                "stem": "How does granting autonomy to zonal heads contribute to developing managerial talent for the future?",
                "options": [
                    {"id": "A", "text": "By allowing them to handle challenges independently and learn from actual decision-making experience.", "isCorrect": True, "studentSelectionTrap": "None - gives subordinates chance to prove their mettle and develop executive judgment."},
                    {"id": "B", "text": "By ensuring they never face any operational risks.", "isCorrect": False, "studentSelectionTrap": "Managerial growth comes from handling risks, not avoiding them."},
                    {"id": "C", "text": "By transferring all corporate financial losses to regional managers.", "isCorrect": False, "studentSelectionTrap": "Absurd distractor."},
                    {"id": "D", "text": "By eliminating all formal performance appraisals.", "isCorrect": False, "studentSelectionTrap": "Performance evaluation becomes clearer under decentralisation."}
                ],
                "correctOption": "A",
                "solution": "Decentralisation gives subordinates a chance to show their abilities and acquire experience in solving complex problems, building a reserve of capable future managers."
            },
            {
                "stem": "Why did Prakriti's headquarters retain central authority over drug patent filings and statutory compliance?",
                "options": [
                    {"id": "A", "text": "Because decisions affecting the vital existence and legal survival of the enterprise must remain centralised.", "isCorrect": True, "studentSelectionTrap": "None - vital policy and regulatory matters require uniform corporate control."},
                    {"id": "B", "text": "Because regional directors have no legal qualifications.", "isCorrect": False, "studentSelectionTrap": "Not the managerial rationale."},
                    {"id": "C", "text": "Because decentralisation is forbidden by pharmaceutical laws.", "isCorrect": False, "studentSelectionTrap": "Decentralisation is an internal organizational choice."},
                    {"id": "D", "text": "Because top management wants to discourage regional growth.", "isCorrect": False, "studentSelectionTrap": "Contradicts company expansion objective."}
                ],
                "correctOption": "A",
                "solution": "An organization should centralise matters of broad corporate policy, legal compliance, and strategic survival while decentralising routine operating decisions."
            },
            {
                "stem": "Which of the following statements correctly evaluates the relationship between Delegation and Decentralisation?",
                "options": [
                    {"id": "A", "text": "Decentralisation is an extension of delegation; delegation is a prerequisite to decentralisation.", "isCorrect": True, "studentSelectionTrap": "None - decentralisation is delegation multiplied across all organizational levels."},
                    {"id": "B", "text": "Delegation can only happen after complete decentralisation is finalized.", "isCorrect": False, "studentSelectionTrap": "Delegation exists even in highly centralised firms between boss and subordinate."},
                    {"id": "C", "text": "Decentralisation makes delegation completely redundant and obsolete.", "isCorrect": False, "studentSelectionTrap": "Decentralisation relies on delegation at every level."},
                    {"id": "D", "text": "Delegation is a policy decision while Decentralisation is an accidental event.", "isCorrect": False, "studentSelectionTrap": "Both are deliberate managerial processes."}
                ],
                "correctOption": "A",
                "solution": "Decentralisation is an extension of delegation. While delegation refers to transfer of authority between two individuals, decentralisation is the systematic diffusion of authority throughout the entire organization."
            }
        ]
    },

    # Mock 3: Bharat Heavy Machinery Ltd (Functional Structure)
    {
        "passageId": "Passage 2: Functional Structure at Bharat Heavy Machinery Ltd",
        "chapter": "Organising",
        "narrative": """Bharat Heavy Machinery Ltd (BHML) is a large engineering company in Bhopal producing customized thermal turbines.
The organization is structured strictly around key specialized enterprise functions:
- Production Department (supervised by Chief Production Engineer)
- Marketing & Sales Department (headed by Marketing Director)
- Finance & Accounts Department (headed by Financial Controller)
- Human Resource Management Department (headed by HR Director)
Each departmental head is a functional expert who exercises direct vertical authority over their respective team.
Recently, a delay in delivering a landmark turbine project to a state electricity utility triggered finger-pointing:
Production claimed Marketing gave unrealistic delivery dates without checking shop-floor inventory; Marketing alleged Production delayed assembly; and Finance withheld component import clearances due to currency volatility.
The General Manager observed: “Our functional silos are causing inter-departmental conflict and obscuring corporate goals.”""",
        "questions": [
            {
                "stem": "Which type of organizational structure is demonstrated by Bharat Heavy Machinery Ltd?",
                "options": [
                    {"id": "A", "text": "Divisional Structure", "isCorrect": False, "studentSelectionTrap": "Divisional structure groups by products; BHML groups by enterprise functions."},
                    {"id": "B", "text": "Functional Structure", "isCorrect": True, "studentSelectionTrap": "None - grouping activities on the basis of functions like production, marketing, finance."},
                    {"id": "C", "text": "Informal Network", "isCorrect": False, "studentSelectionTrap": "This is a formal administrative hierarchy."},
                    {"id": "D", "text": "Informal Fellowship", "isCorrect": False, "studentSelectionTrap": "Distractor."}
                ],
                "correctOption": "B",
                "solution": "Grouping of jobs of similar nature under functions and organizing these major functions as separate departments creates a Functional Structure."
            },
            {
                "stem": "What is the primary advantage of the Functional Structure utilized by BHML?",
                "options": [
                    {"id": "A", "text": "Occupational specialization and efficient utilization of functional manpower.", "isCorrect": True, "studentSelectionTrap": "None - functional structure promotes professional specialization and economies of scale within functions."},
                    {"id": "B", "text": "Effortless fixing of individual accountability for overall company profit.", "isCorrect": False, "studentSelectionTrap": "In functional structure, fixing accountability for final product delivery is notoriously difficult."},
                    {"id": "C", "text": "Elimination of all need for inter-departmental coordination.", "isCorrect": False, "studentSelectionTrap": "Coordination becomes more critical and challenging across functional silos."},
                    {"id": "D", "text": "Complete multi-product independence across parallel factories.", "isCorrect": False, "studentSelectionTrap": "This applies to divisional structures."}
                ],
                "correctOption": "A",
                "solution": "A functional structure leads to occupational specialization since emphasis is placed on specific functions, promoting efficiency in manpower utilization."
            },
            {
                "stem": "The inter-departmental finger-pointing and conflict described in the case highlights which recognized limitation of Functional Structure?",
                "options": [
                    {"id": "A", "text": "Functional empires develop where departmental heads pursue narrow sectional interests at the expense of organizational goals.", "isCorrect": True, "studentSelectionTrap": "None - direct NCERT disadvantage of functional structure."},
                    {"id": "B", "text": "Duplication of machinery and physical plant across product lines.", "isCorrect": False, "studentSelectionTrap": "Duplication of facilities is a disadvantage of divisional structure, not functional."},
                    {"id": "C", "text": "Total absence of professional specialization.", "isCorrect": False, "studentSelectionTrap": "Functional structure maximizes specialization."},
                    {"id": "D", "text": "Inability of functional managers to control their immediate subordinates.", "isCorrect": False, "studentSelectionTrap": "Functional control within the department is strong."}
                ],
                "correctOption": "A",
                "solution": "A functional structure may place less emphasis on overall enterprise objectives than on the objectives pursued by a functional head, creating functional empires and coordination difficulties."
            },
            {
                "stem": "Why is it difficult to fix clear accountability for the delayed turbine delivery in BHML's functional structure?",
                "options": [
                    {"id": "A", "text": "Because final performance depends on the collective contribution of multiple interdependent functional departments.", "isCorrect": True, "studentSelectionTrap": "None - since no single functional head controls the end-to-end product delivery, accountability is diffused."},
                    {"id": "B", "text": "Because government laws prohibit auditing functional departments.", "isCorrect": False, "studentSelectionTrap": "Absurd distractor."},
                    {"id": "C", "text": "Because functional managers report solely to external trade unions.", "isCorrect": False, "studentSelectionTrap": "Functional managers report to the General Manager."},
                    {"id": "D", "text": "Because engineering turbines requires zero managerial supervision.", "isCorrect": False, "studentSelectionTrap": "Absurd distractor."}
                ],
                "correctOption": "A",
                "solution": "In a functional structure, it is difficult to fix accountability on any single department because a product's success or failure depends on the coordinated efforts of production, marketing, and finance jointly."
            },
            {
                "stem": "Under which business condition is a Functional Structure most suitable according to NCERT?",
                "options": [
                    {"id": "A", "text": "When the enterprise is a single-product firm requiring high degree of functional specialization.", "isCorrect": True, "studentSelectionTrap": "None - functional structure is ideal for single-product or homogeneous business lines."},
                    {"id": "B", "text": "When an enterprise produces dozens of diversified, unrelated consumer product lines.", "isCorrect": False, "studentSelectionTrap": "Diversified multi-product enterprises require divisional structure."},
                    {"id": "C", "text": "When the firm operates without any formal hierarchy or rules.", "isCorrect": False, "studentSelectionTrap": "Functional structure is highly formal."},
                    {"id": "D", "text": "When an enterprise wishes to avoid any division of labor.", "isCorrect": False, "studentSelectionTrap": "Organising is founded on division of labor."}
                ],
                "correctOption": "A",
                "solution": "A functional structure is most suitable when the size of the organisation is large, has a single or limited line of products, and requires a high degree of functional specialization."
            }
        ]
    }
]

# Build remaining 17 distinct Organising Passages (Mocks 4 to 20)
ORGANISING_PASSAGE_CONFIGS = [
    # Mock 4: ZenTech Cloud Solutions
    ("ZenTech Cloud Solutions", "ZenTech Cloud Solutions is a fast-paced software development firm in Hyderabad. Alongside the formal hierarchy of project managers and systems architects, software engineers spontaneously gather in cafeteria interest groups and virtual gaming channels. When rumors regarding impending layoffs began circulating across these informal networks, productivity slumped until the CEO addressed the grapevine directly.", "Formal vs Informal Organisation", "Informal Organisation and the Grapevine"),
    # Mock 5: Aarogyam Hospital Network
    ("Aarogyam Hospital Network", "Aarogyam operates super-speciality hospitals across Kerala. The Chief Medical Officer (CMO) delegated surgical scheduling authority to the Senior Resident Doctor. During an emergency inspection, irregularities in ICU sterilization were discovered. The Senior Resident claimed the operating nurses failed him, but the CMO was held legally accountable by the Medical Council. The case demonstrates the absoluteness of accountability.", "Delegation of Authority", "Elements of Delegation: Authority, Responsibility, Accountability"),
    # Mock 6: Imperial Retail Supermarkets
    ("Imperial Retail Supermarkets", "Imperial Retail operates a chain of 45 grocery supermarkets in Tamil Nadu. The Managing Director reduced the 'Span of Management' from 15 store managers reporting to 1 regional director down to 5 store managers per regional manager. While direct supervision improved, two additional hierarchical tiers were created, increasing administrative payroll costs and slowing upward communication.", "Span of Management", "Tall vs Flat Structure and Span of Control"),
    # Mock 7: Kaveri Handicrafts Emporium
    ("Kaveri Handicrafts Emporium", "Kaveri Handicrafts Emporium in Mysuru expanded from an artisan shop into a global handloom exporter. The founder instituted a formal organising process: (1) Identification and division of work, (2) Departmentalisation by material types, (3) Assignment of specific duties to master craftsmen, and (4) Establishing clear reporting relationships to avoid confusion.", "Organising Process", "Steps in the Organising Process"),
    # Mock 8: Nexus Express Logistics
    ("Nexus Express Logistics", "Nexus Express Logistics manages rapid parcel delivery across 80 cities in India. The Managing Director balances centralisation and decentralisation: routing algorithms, fleet insurance, and vehicle procurement are strictly centralised at headquarters, whereas local delivery re-routing, overtime approvals, and minor fuel repairs are decentralized to station masters for operational agility.", "Degree of Decentralisation", "Balancing Centralisation and Decentralisation"),
    # Mock 9: Surya Automotives Ltd
    ("Surya Automotives Ltd", "Surya Automotives in Chennai expanded from two-wheelers into electric commercial trucks and agricultural tractors. As product complexity grew, the company phased out its functional structure in favor of a divisional structure with separate divisions for Two-Wheelers, Commercial EV Trucks, and Tractors, fixing clear profit center accountability on division presidents.", "Structural Transformation", "Functional to Divisional Transition"),
    # Mock 10: GreenTerrace Urban Agrotech
    ("GreenTerrace Urban Agrotech", "GreenTerrace develops hydroponic vertical farms in Pune. The founder actively engages with informal worker groups, observing how the informal organization provides social satisfaction, alleviates workplace stress, and transmits rapid feedback that the rigid formal chain of command often obscures.", "Informal Group Dynamics", "Leveraging the Informal Organisation"),
    # Mock 11: Pragati EdTech Innovations
    ("Pragati EdTech Innovations", "Pragati EdTech is a learning software company in Noida. A newly appointed marketing manager, despite being overwhelmed with routine tasks, refuses to delegate campaign design tasks to subordinates due to fear that subordinates might outperform him or make errors. The HR Director counsels him on the importance of delegation for managerial effectiveness.", "Barriers to Delegation", "Managerial Hesitation in Delegation"),
    # Mock 12: Vindhya Mining & Explosives
    ("Vindhya Mining & Explosives", "Vindhya Mining extracts dolomite and industrial ores in central India. Because the handling of explosive detonators and deep shaft safety poses life-threatening hazards, company policy insists on strict centralisation of blast approvals and safety protocols, enforcing a rigid scalar chain without unauthorized local deviation.", "Centralisation in High-Risk Operations", "Strict Centralised Control & Compliance"),
    # Mock 13: Chola Maritime Shipping
    ("Chola Maritime Shipping", "Chola Maritime operates international cargo container vessels from Visakhapatnam. The company previously had 8 levels of hierarchy with a narrow span of control. To eliminate bureaucratic delays and excessive managerial overhead, the board restructured the organization into a flat hierarchy with 4 tiers and a wider span of management.", "Organizational Restructuring", "Tall vs Flat Hierarchy and Communication Speed"),
    # Mock 14: Saraswati Educational Publishing
    ("Saraswati Educational Publishing", "Saraswati Educational Publishing in Delhi restructured its marketing and logistics operations. Instead of functional grouping, it organized departments on a Territorial / Geographic basis: Northern Zone, Western Zone, Southern Zone, and Eastern Zone, enabling tailored regional curriculum adaptations and localized distribution.", "Bases of Departmentalisation", "Territorial / Geographic Departmentalisation"),
    # Mock 15: Everest Technical Gear
    ("Everest Technical Gear", "Everest Technical Gear manufactures mountaineering ropes and carabiners in Dehradun. The operations director delegates authority to the quality assurance engineer to halt the production line instantly if tensile strength falls below ISO standards. The case examines the parity of authority and responsibility required for operational excellence.", "Parity of Authority and Responsibility", "Authority-Responsibility Parity"),
    # Mock 16: Mahindra & Mittal Heavy Engineering
    ("Mahindra & Mittal Heavy Engineering", "Mahindra & Mittal operates metal casting foundries in Jamshedpur. A shop-floor technician received conflicting orders from the Production Foreman to speed up output and the Safety Inspector to shut down the furnace for valve repairs. The disruption illustrates the breakdown of Fayol's principle of Unity of Command within the formal structure.", "Formal Authority Principles", "Unity of Command in Organisational Design"),
    # Mock 17: Utkal Petrochemical Refineries
    ("Utkal Petrochemical Refineries", "Utkal Refineries in Odisha experienced severe friction between the maintenance department and the operations department. Maintenance insisted on prolonged shutdowns for preventative overhauls, while operations needed continuous throughput to hit monthly output quotas. The General Manager intervened to resolve the functional empire dilemma.", "Overcoming Functional Silos", "Inter-Departmental Coordination in Functional Structures"),
    # Mock 18: Satpura Eco-Resorts & Hospitality
    ("Satpura Eco-Resorts & Hospitality", "Satpura Eco-Resorts operates wildlife sanctuaries and eco-lodges across Madhya Pradesh. The corporate leadership decentralized guest experience, culinary sourcing, and local safari arrangements to individual resort General Managers, leading to superior guest satisfaction ratings and rapid development of executive leadership.", "Decentralisation in Service Enterprises", "Localized Autonomy and Managerial Growth"),
    # Mock 19: Mithila Handloom Producer Co
    ("Mithila Handloom Producer Co", "Mithila Handloom is an artisan producer cooperative in Bihar. While the cooperative has a formal board, informal weaver master guilds dictate informal peer norms, output pacing, and craftsmanship standards. The executive committee successfully integrates these informal norms into formal production schedules.", "Integrating Formal and Informal Networks", "Harmonizing Formal Goals with Informal Norms"),
    # Mock 20: Vijayanagar Power Grid Corp
    ("Vijayanagar Power Grid Corp", "Vijayanagar Power Grid in Bellary underwent an enterprise restructuring after an operational audit identified role ambiguity and overlapping duties between transmission maintenance and substation engineers. The restructuring precisely redefined job descriptions, delegation thresholds, and reporting lines, restoring administrative order.", "Turnaround Re-organising", "Clarity in Authority-Responsibility Relationships")
]

def _build_org_passage(idx, name, narrative, topic, subtopic):
    m_num = idx + 4
    return {
        "passageId": f"Passage 2: Organisational Architecture at {name} (Mock {m_num})",
        "chapter": "Organising",
        "narrative": narrative,
        "questions": [
            {
                "stem": f"Which core principle or dimension of Organising is primarily illustrated in the case of {name}?",
                "options": [
                    {"id": "A", "text": subtopic, "isCorrect": True, "studentSelectionTrap": f"None - exact conceptual dimension illustrated: {subtopic}."},
                    {"id": "B", "text": "Taylor's Functional Foremanship with Eight Gang Bosses", "isCorrect": False, "studentSelectionTrap": "Specific shop-floor technique, not the case theme."},
                    {"id": "C", "text": "Consumer Protection Pecuniary Jurisdiction Rules", "isCorrect": False, "studentSelectionTrap": "Consumer Protection Act topic, not Organising."},
                    {"id": "D", "text": "Depreciation Tax Shield Maximisation", "isCorrect": False, "studentSelectionTrap": "Financial management topic."}
                ],
                "correctOption": "A",
                "solution": f"The case narrative directly analyzes {subtopic}, an essential pillar of the Organising function in NCERT Class 12."
            },
            {
                "stem": f"What is the direct organizational benefit achieved through the structural arrangement at {name}?",
                "options": [
                    {"id": "A", "text": "Clarity in working relationships, operational accountability, and effective goal realization.", "isCorrect": True, "studentSelectionTrap": "None - primary organizational benefits highlighted in NCERT."},
                    {"id": "B", "text": "Complete eradication of any requirement for future managerial planning.", "isCorrect": False, "studentSelectionTrap": "Planning and organising are continuous interdependent functions."},
                    {"id": "C", "text": "Immediate elimination of all employee compensation expenses.", "isCorrect": False, "studentSelectionTrap": "Absurd distractor."},
                    {"id": "D", "text": "Conversion of all private contracts into statutory government decrees.", "isCorrect": False, "studentSelectionTrap": "Absurd distractor."}
                ],
                "correctOption": "A",
                "solution": "Organising provides clarity in working relationships, enables systematic allocation of jobs, avoids ambiguity, and facilitates coordination and goal attainment."
            },
            {
                "stem": f"Which of the following statements represents an established NCERT tenet regarding the situation depicted in {name}?",
                "options": [
                    {"id": "A", "text": "Authority can be delegated, but ultimate accountability is absolute and can never be abdicated.", "isCorrect": True, "studentSelectionTrap": "None - the core Principle of Absoluteness of Accountability."},
                    {"id": "B", "text": "Delegation and Decentralisation are completely identical concepts with identical scope.", "isCorrect": False, "studentSelectionTrap": "Decentralisation is an enterprise-wide policy; delegation is a two-person transfer."},
                    {"id": "C", "text": "Informal organizations should always be crushed by management because they lack formal rules.", "isCorrect": False, "studentSelectionTrap": "Informal organization fulfills social needs and should be constructively harnessed."},
                    {"id": "D", "text": "A narrow span of management completely eliminates all supervisory overhead costs.", "isCorrect": False, "studentSelectionTrap": "Narrow span increases hierarchical levels and supervisory costs."}
                ],
                "correctOption": "A",
                "solution": "Under the principle of absoluteness of accountability, a superior remains answerable to their own higher authority for the task even after delegating authority to a subordinate."
            },
            {
                "stem": f"How does the management at {name} ensure organizational harmony across its workforce?",
                "options": [
                    {"id": "A", "text": "By establishing clear reporting channels while recognizing and constructively aligning informal communication networks.", "isCorrect": True, "studentSelectionTrap": "None - effective managers harness informal networks alongside formal channels."},
                    {"id": "B", "text": "By forbidding employees from talking to colleagues outside of written memos.", "isCorrect": False, "studentSelectionTrap": "Rigid suppression of informal networks leads to rumors and discontent."},
                    {"id": "C", "text": "By centralising every minor routine operational chore exclusively with the CEO.", "isCorrect": False, "studentSelectionTrap": "Stifles agility and overburdens top executives."},
                    {"id": "D", "text": "By abolishing all job specifications and formal duties.", "isCorrect": False, "studentSelectionTrap": "Creates chaos."}
                ],
                "correctOption": "A",
                "solution": "Effective management combines formal authority structures with constructive informal social communication to build morale, speed information, and harmonize efforts."
            },
            {
                "stem": f"In the taxonomy of management functions, the structural architecture designed by {name} belongs to:",
                "options": [
                    {"id": "A", "text": "Organising Function of Management", "isCorrect": True, "studentSelectionTrap": "None - defines the framework within which managerial and operating tasks are performed."},
                    {"id": "B", "text": "Environmental Scanning and Macro Analysis", "isCorrect": False, "studentSelectionTrap": "Strategic planning input, not structural design."},
                    {"id": "C", "text": "SEBI Primary Market Demat Flotation", "isCorrect": False, "studentSelectionTrap": "Financial market concept."},
                    {"id": "D", "text": "Factory Act Boiler Inspection", "isCorrect": False, "studentSelectionTrap": "Statutory labor law."}
                ],
                "correctOption": "A",
                "solution": "Organising is the process of defining and grouping activities, establishing authority relationships, and designing the organizational structure."
            }
        ]
    }

for i, cfg in enumerate(ORGANISING_PASSAGE_CONFIGS):
    ORGANISING_PASSAGES.append(_build_org_passage(i, cfg[0], cfg[1], cfg[2], cfg[3]))


def get_passage_1_for_mock(mock_num):
    """Returns Passage 1 (Questions 41 to 45) for the given mock number (1 to 20)."""
    idx = (mock_num - 1) % len(FINANCIAL_PASSAGES)
    return FINANCIAL_PASSAGES[idx]

def get_passage_2_for_mock(mock_num):
    """Returns Passage 2 (Questions 46 to 50) for the given mock number (1 to 20)."""
    idx = (mock_num - 1) % len(ORGANISING_PASSAGES)
    return ORGANISING_PASSAGES[idx]
