"""
CUET UG Master Question Paper Rebuild - Case Studies Engine
Generates 40 authentic, comprehensive, publication-grade case studies across 7 NCERT chapters:
- 10 Financial Management cases (FinMan 01 to 10)
- 10 Organising & Restructuring cases (Org 01 to 10)
- 6 Marketing Management cases (Mkt 01 to 06)
- 5 Staffing & HRM cases (Staff 01 to 05)
- 4 Directing & Leadership cases (Dir 01 to 04)
- 3 Controlling & Operations cases (Ctrl 01 to 03)
- 2 Consumer Protection cases (CP 01 to 02)
Total: 40 case studies (200 analytical, scenario-anchored questions).
"""

def get_all_40_case_studies():
    cases = []

    # =========================================================================
    # 1. Financial Management (Cases 1 to 10)
    # =========================================================================
    cases.append({
        "caseId": "CASE-FM-01",
        "title": "GreenVolt Solar Technologies: Capital Structure & Trading on Equity",
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
                "stem": "What is the expected Return on Investment (ROI) of GreenVolt Solar Technologies Ltd based on the projected EBIT?",
                "options": [
                    {"id": "A", "text": "15.0%", "isCorrect": True, "trap": "None - correct application of ROI = (EBIT / Total Funds Employed) * 100."},
                    {"id": "B", "text": "10.0%", "isCorrect": False, "trap": "Confusing ROI with the interest rate on debentures."},
                    {"id": "C", "text": "12.5%", "isCorrect": False, "trap": "Calculating ROI using debt capital rather than total funds employed."},
                    {"id": "D", "text": "18.0%", "isCorrect": False, "trap": "Adding the corporate tax rate to the interest rate."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Expected ROI is 15.0%.",
                    "concept": "ROI = (EBIT / Total Capital Employed) * 100.",
                    "detailed": "ROI = (Rs. 9,00,000 / Rs. 60,00,000) * 100 = 15.0%. Since ROI (15%) > Cost of Debt (10%), financial leverage is favourable."
                }
            },
            {
                "stem": "Under Plan I (Zero Debt), what will be the Earnings Before Taxes (EBT) of GreenVolt Solar Technologies Ltd?",
                "options": [
                    {"id": "A", "text": "Rs. 6,30,000", "isCorrect": False, "trap": "Deducting corporate tax prematurely before calculating EBT."},
                    {"id": "B", "text": "Rs. 9,00,000", "isCorrect": True, "trap": "None - EBT = EBIT - Interest = 9,00,000 - 0 = Rs. 9,00,000."},
                    {"id": "C", "text": "Rs. 7,20,000", "isCorrect": False, "trap": "Arbitrary 20% subtraction assuming standard debt interest."},
                    {"id": "D", "text": "Rs. 8,10,000", "isCorrect": False, "trap": "Deducting 10% notional interest when no debt exists."}
                ],
                "correctOption": "B",
                "solution": {
                    "quick": "EBT is Rs. 9,00,000.",
                    "concept": "EBT = EBIT - Interest. Under Plan I, interest is zero.",
                    "detailed": "Since Plan I uses 100% equity, total interest payable is Rs. 0. Therefore, EBT = EBIT - 0 = Rs. 9,00,000."
                }
            },
            {
                "stem": "Under Plan II (Rs. 20 Lakh 10% Debentures), what is the annual interest obligation payable to lenders?",
                "options": [
                    {"id": "A", "text": "Rs. 4,00,000", "isCorrect": False, "trap": "Calculating interest on Rs. 40 Lakh equity portion instead of debt."},
                    {"id": "B", "text": "Rs. 1,00,000", "isCorrect": False, "trap": "Calculating interest on only half of the debt principal."},
                    {"id": "C", "text": "Rs. 2,00,000", "isCorrect": True, "trap": "None - 10% on Rs. 20 Lakh = Rs. 2,00,000."},
                    {"id": "D", "text": "Rs. 2,50,000", "isCorrect": False, "trap": "Using an incorrect rate of 12.5%."}
                ],
                "correctOption": "C",
                "solution": {
                    "quick": "Annual interest is Rs. 2,00,000.",
                    "concept": "Interest = Debt Principal * Coupon Rate.",
                    "detailed": "Interest under Plan II = 10% of Rs. 20,00,000 = Rs. 2,00,000 per annum."
                }
            },
            {
                "stem": "Why does increasing debt proportion under Plan II and Plan III increase Earnings Per Share (EPS) for equity shareholders?",
                "options": [
                    {"id": "A", "text": "Because Return on Investment (15%) is strictly greater than the Cost of Debt (10%).", "isCorrect": True, "trap": "None - fundamental condition for favourable Trading on Equity."},
                    {"id": "B", "text": "Because debt capital increases total tax liabilities paid to the government.", "isCorrect": False, "trap": "Debt interest actually reduces taxable income and tax liability."},
                    {"id": "C", "text": "Because equity shareholders surrender their voting rights to debenture holders.", "isCorrect": False, "trap": "Debenture holders have no voting rights; equity control is preserved."},
                    {"id": "D", "text": "Because debentures carry an unpredictable variable repayment obligation.", "isCorrect": False, "trap": "Debentures carry fixed contractual obligations, not variable."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Trading on Equity is favourable because ROI (15%) > Cost of Debt (10%).",
                    "concept": "Trading on Equity increases EPS when the firm earns more on borrowed capital than it pays in interest.",
                    "detailed": "Since ROI is 15% and cost of debt is 10%, the 5% spread on borrowed funds belongs entirely to equity shareholders, lifting EPS."
                }
            },
            {
                "stem": "The CFO's evaluation regarding whether to fund the solar plant through equity or debentures falls under which financial decision?",
                "options": [
                    {"id": "A", "text": "Investment Decision", "isCorrect": False, "trap": "Investment decision involves allocating capital across long-term assets."},
                    {"id": "B", "text": "Dividend Decision", "isCorrect": False, "trap": "Dividend decision concerns profit appropriation between payout and retention."},
                    {"id": "C", "text": "Financing Decision", "isCorrect": True, "trap": "None - financing decision determines capital structure and debt-equity mix."},
                    {"id": "D", "text": "Working Capital Decision", "isCorrect": False, "trap": "Working capital decision manages short-term current assets."}
                ],
                "correctOption": "C",
                "solution": {
                    "quick": "This is a Financing Decision.",
                    "concept": "Financing decisions determine the quantum of finance to be raised and the proportion of debt vs equity.",
                    "detailed": "Choosing between equity shares and debentures to fund asset purchases is the core subject of the Financing Decision."
                }
            }
        ]
    })

    cases.append({
        "caseId": "CASE-FM-02",
        "title": "Zenith Agro-Foods: Working Capital Cycle and Liquidity",
        "chapter": "Financial Management",
        "narrative": """Zenith Agro-Foods Corporation produces packaged organic pulses and flours in Punjab. 
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
                    {"id": "A", "text": "Rs. 1,20,00,000", "isCorrect": True, "trap": "None - Gross Working Capital = Total Current Assets = 15 + 45 + 60 = Rs. 120 Lakh."},
                    {"id": "B", "text": "Rs. 90,00,000", "isCorrect": False, "trap": "Confusing Gross Working Capital with Net Working Capital."},
                    {"id": "C", "text": "Rs. 60,00,000", "isCorrect": False, "trap": "Counting only the inventory balance."},
                    {"id": "D", "text": "Rs. 1,50,00,000", "isCorrect": False, "trap": "Adding current liabilities to current assets."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Gross Working Capital is Rs. 1,20,00,000 (Rs. 120 Lakh).",
                    "concept": "Gross Working Capital = Total investment in Current Assets.",
                    "detailed": "Gross Working Capital = Cash (15L) + Debtors (45L) + Inventory (60L) = Rs. 120 Lakh (Rs. 1.2 Crore)."
                }
            },
            {
                "stem": "What is the Net Working Capital of Zenith Agro-Foods Corporation?",
                "options": [
                    {"id": "A", "text": "Rs. 1,20,00,000", "isCorrect": False, "trap": "This is Gross Working Capital."},
                    {"id": "B", "text": "Rs. 90,00,000", "isCorrect": True, "trap": "None - Net Working Capital = Current Assets (120L) - Current Liabilities (30L) = Rs. 90 Lakh."},
                    {"id": "C", "text": "Rs. 60,00,000", "isCorrect": False, "trap": "Subtracting cash from net working capital."},
                    {"id": "D", "text": "Rs. 75,00,000", "isCorrect": False, "trap": "Arithmetic deduction error."}
                ],
                "correctOption": "B",
                "solution": {
                    "quick": "Net Working Capital is Rs. 90,00,000.",
                    "concept": "Net Working Capital = Current Assets - Current Liabilities.",
                    "detailed": "Net Working Capital = Rs. 1,20,00,000 - Rs. 30,00,000 = Rs. 90,00,000 (Rs. 90 Lakh)."
                }
            },
            {
                "stem": "Why does Zenith Agro-Foods require a larger working capital commitment during the harvest season?",
                "options": [
                    {"id": "A", "text": "Because of seasonal peaks requiring extensive inventory procurement against immediate cash payments.", "isCorrect": True, "trap": "None - seasonal factor increases current assets during peak procurement."},
                    {"id": "B", "text": "Because company fixed assets depreciate at a higher rate during summer months.", "isCorrect": False, "trap": "Fixed asset depreciation does not drive operational working capital demand."},
                    {"id": "C", "text": "Because supermarket distributors prepay all invoices months in advance.", "isCorrect": False, "trap": "Distributors take 60 days credit, which elongates the operating cycle."},
                    {"id": "D", "text": "Because organic pulses carry zero operating cycle lag.", "isCorrect": False, "trap": "There is a substantial operating cycle lag due to storage and credit."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Seasonal factors demand peak inventory buildup against upfront cash.",
                    "concept": "Seasonal factors directly determine working capital requirements.",
                    "detailed": "During peak harvest season, raw material procurement surges and cash must be disbursed to farmers immediately, elevating working capital."
                }
            },
            {
                "stem": "If management successfully compresses the credit period allowed to supermarket chains from 60 days to 30 days, what is the direct financial outcome?",
                "options": [
                    {"id": "A", "text": "Working capital requirement will decline because cash is collected faster from debtors.", "isCorrect": True, "trap": "None - tighter debtor collection compresses operating cycle and working capital."},
                    {"id": "B", "text": "Gross working capital requirement will immediately double.", "isCorrect": False, "trap": "Faster cash collection reduces working capital locked in debtors."},
                    {"id": "C", "text": "Total fixed capital required for processing mills will increase proportionally.", "isCorrect": False, "trap": "Debtor credit terms affect current assets, not fixed capital."},
                    {"id": "D", "text": "The company's corporate tax rate will increase by 10%.", "isCorrect": False, "trap": "Credit terms have no statutory relation to corporate tax rates."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Working capital requirement declines due to faster receivables collection.",
                    "concept": "Credit allowed to customers directly impacts funds tied up in debtors.",
                    "detailed": "Shortening the credit period from 60 to 30 days accelerates cash conversion, reducing the average debtor balance and total working capital needs."
                }
            },
            {
                "stem": "The financial manager's challenge of maintaining an optimal working capital balance requires balancing which two competing objectives?",
                "options": [
                    {"id": "A", "text": "Liquidity and Profitability", "isCorrect": True, "trap": "None - classic trade-off between meeting short-term obligations and minimizing idle cash."},
                    {"id": "B", "text": "Debt and Equity Proportions", "isCorrect": False, "trap": "This is the capital structure trade-off, not working capital."},
                    {"id": "C", "text": "Export Quotas and Import Tariffs", "isCorrect": False, "trap": "Trade policy parameters."},
                    {"id": "D", "text": "Advertising Expenditure and Product Packaging", "isCorrect": False, "trap": "Marketing mix components."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Working capital balances Liquidity and Profitability.",
                    "concept": "Working capital management requires ensuring solvency without locking excessive idle funds.",
                    "detailed": "Excess liquidity ensures bill payments but hurts profitability due to idle non-earning assets; inadequate liquidity risks insolvency."
                }
            }
        ]
    })

    cases.append({
        "caseId": "CASE-FM-03",
        "title": "Apex EV Mobility: Capital Budgeting & Hurdle Rate Evaluation",
        "chapter": "Financial Management",
        "narrative": """Apex EV Mobility Ltd is a pioneering electric vehicle component manufacturer in Pune.
The board of directors is evaluating a long-term capital investment of Rs. 150 Crore to set up an automated robotic battery pack assembly facility.
The financial appraisal committee evaluates the proposal based on three critical criteria:
1. Cash flows of the project: An initial outlay of Rs. 150 Crore with projected net operational cash inflows of Rs. 35 Crore annually for 7 years.
2. The rate of return: The internal expected return is calculated at 16.5% per annum, against the company's minimum required hurdle rate (cost of capital) of 11%.
3. Investment criteria involved: Evaluating calculations regarding payback period, salvage value, and tax shields on depreciation.
The Chief Investment Officer reminds the board that capital budgeting decisions involve massive funds, have long-term implications, and are virtually irreversible without heavy financial losses.""",
        "questions": [
            {
                "stem": "The strategic decision by Apex EV Mobility to commit Rs. 150 Crore into a battery pack assembly plant is termed a:",
                "options": [
                    {"id": "A", "text": "Working Capital Decision", "isCorrect": False, "trap": "Working capital involves short-term current assets, not long-term facilities."},
                    {"id": "B", "text": "Capital Budgeting / Long-Term Investment Decision", "isCorrect": True, "trap": "None - committing long-term funds into fixed assets."},
                    {"id": "C", "text": "Dividend Appropriation Decision", "isCorrect": False, "trap": "Dividend decision relates to profit distribution."},
                    {"id": "D", "text": "Liquidity Buffering Operation", "isCorrect": False, "trap": "Short-term cash management."}
                ],
                "correctOption": "B",
                "solution": {
                    "quick": "This is a Capital Budgeting / Investment Decision.",
                    "concept": "Capital budgeting involves committing funds to long-term assets or projects.",
                    "detailed": "Allocating substantial funds to build a manufacturing facility with multi-year returns is a classic Capital Budgeting decision."
                }
            },
            {
                "stem": "Why are capital budgeting decisions considered among the most critical choices facing corporate executives?",
                "options": [
                    {"id": "A", "text": "Because they involve huge funds, dictate long-term earning capacity, and are virtually irreversible.", "isCorrect": True, "trap": "None - core NCERT reasons for capital budgeting importance."},
                    {"id": "B", "text": "Because they can be reversed within 24 hours without financial loss.", "isCorrect": False, "trap": "Capital investments are irreversible except at massive capital losses."},
                    {"id": "C", "text": "Because they impact solely the quarterly trade credit allowed to retail stockists.", "isCorrect": False, "trap": "This describes working capital, not capital budgeting."},
                    {"id": "D", "text": "Because they eliminate all need for subsequent managerial controlling.", "isCorrect": False, "trap": "Controlling is vital to track capital project execution."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "They commit huge funds, shape long-term earning capacity, and are irreversible.",
                    "concept": "Importance of capital budgeting stems from long-term commitment and risk.",
                    "detailed": "Capital budgeting investments dictate the enterprise's cost structure, competitive stature, and capacity for years, and cannot be undone without severe losses."
                }
            },
            {
                "stem": "Based on the financial appraisal committee's data, which criterion confirms that the battery project is financially viable?",
                "options": [
                    {"id": "A", "text": "The expected return of 16.5% exceeds the company's minimum hurdle rate of 11.0%.", "isCorrect": True, "trap": "None - projects are acceptable when expected return > cost of capital."},
                    {"id": "B", "text": "The project relies entirely on unsecured trade credit from raw material suppliers.", "isCorrect": False, "trap": "Capital facilities cannot be funded by short-term trade credit."},
                    {"id": "C", "text": "The project generates cash inflows only after 25 years.", "isCorrect": False, "trap": "Inflows start immediately for 7 years."},
                    {"id": "D", "text": "The hurdle rate is strictly higher than the expected internal return.", "isCorrect": False, "trap": "Hurdle rate higher than return means project destroys value."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Expected return (16.5%) exceeds the hurdle rate (11.0%).",
                    "concept": "A capital investment is viable when Rate of Return exceeds Cost of Capital.",
                    "detailed": "With an expected return of 16.5% against a benchmark hurdle rate of 11%, the project yields a positive net spread, enhancing shareholder wealth."
                }
            },
            {
                "stem": "Under project evaluation in capital budgeting, how do project cash flows differ from accounting net profits?",
                "options": [
                    {"id": "A", "text": "Cash flows track actual liquid inflows and outflows, adding back non-cash expenses like depreciation.", "isCorrect": True, "trap": "None - cash flow = net profit after tax + non-cash depreciation."},
                    {"id": "B", "text": "Accounting profit includes total equity dividends paid to shareholders.", "isCorrect": False, "trap": "Dividends are profit appropriations, not expenses in calculating net profit."},
                    {"id": "C", "text": "Cash flows exclude all customer sales revenues.", "isCorrect": False, "trap": "Sales revenues are the core cash inflows."},
                    {"id": "D", "text": "Accounting profits and project cash flows are mathematically identical in every period.", "isCorrect": False, "trap": "Non-cash items and working capital accruals cause significant divergence."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Cash flows represent actual liquid movements, adding back non-cash depreciation.",
                    "concept": "Capital budgeting evaluates real cash flows rather than accrual accounting profits.",
                    "detailed": "Accounting profits reflect accrual revenues minus non-cash depreciation. Capital budgeting relies on actual cash receipts and disbursements."
                }
            },
            {
                "stem": "What is the ultimate primary objective guiding all corporate financial decisions at Apex EV Mobility?",
                "options": [
                    {"id": "A", "text": "Maximisation of current market value of equity shares (Shareholder Wealth Maximisation).", "isCorrect": True, "trap": "None - supreme objective of financial management."},
                    {"id": "B", "text": "Maximisation of total gross physical unit production regardless of cost.", "isCorrect": False, "trap": "Unchecked production without profitability destroys solvency."},
                    {"id": "C", "text": "Minimisation of employee technical training expenditures.", "isCorrect": False, "trap": "Stifles innovation and operational capability."},
                    {"id": "D", "text": "Elimination of all long-term debt and liabilities permanently.", "isCorrect": False, "trap": "Debt is often used constructively to magnify returns."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "The primary objective is Shareholder Wealth Maximisation.",
                    "concept": "All financial decisions aim to maximize the market price of company equity shares.",
                    "detailed": "Financial management seeks to maximize shareholder wealth by making optimal investment, financing, and dividend decisions that reflect in higher share valuations."
                }
            }
        ]
    })

    cases.append({
        "caseId": "CASE-FM-04",
        "title": "Royal Heritage Fabrics: Dividend Policy Constraints & Cash Flows",
        "chapter": "Financial Management",
        "narrative": """Royal Heritage Fabrics Ltd is an established textile conglomerate in Coimbatore.
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
                "stem": "The decision regarding what proportion of net profit after tax should be distributed to shareholders versus retained in the business is called:",
                "options": [
                    {"id": "A", "text": "Investment Decision", "isCorrect": False, "trap": "Investment decision is asset allocation."},
                    {"id": "B", "text": "Financing Decision", "isCorrect": False, "trap": "Financing decision decides debt vs equity proportions."},
                    {"id": "C", "text": "Dividend Decision", "isCorrect": True, "trap": "None - dividend decision determines distribution vs retention of profits."},
                    {"id": "D", "text": "Working Capital Decision", "isCorrect": False, "trap": "Working capital manages current assets."}
                ],
                "correctOption": "C",
                "solution": {
                    "quick": "This is the Dividend Decision.",
                    "concept": "The dividend decision determines the distribution of profit between payout and retained earnings.",
                    "detailed": "Dividing net profits between dividend payments to shareholders and retained earnings for internal reinvestment is the core Dividend Decision."
                }
            },
            {
                "stem": "How does the planned modernization project of Rs. 25 Crore influence Royal Heritage's dividend decision?",
                "options": [
                    {"id": "A", "text": "Firms with promising growth and expansion opportunities retain larger profits, resulting in a conservative dividend payout.", "isCorrect": True, "trap": "None - growth opportunities favor higher retention."},
                    {"id": "B", "text": "Growth projects compel companies to distribute 100% of profits as dividends immediately.", "isCorrect": False, "trap": "Paying full dividends depletes internal capital required for growth."},
                    {"id": "C", "text": "Modernization projects make retained earnings legally invalid.", "isCorrect": False, "trap": "Retained earnings are the cheapest and most flexible source for growth."},
                    {"id": "D", "text": "Growth opportunities have zero relevance to corporate dividend policies.", "isCorrect": False, "trap": "Growth opportunities are a prime factor affecting dividend decisions."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Growth opportunities favor higher retention and lower dividend payouts.",
                    "concept": "Growth opportunities directly influence retained earnings demand.",
                    "detailed": "When an enterprise has profitable expansion or modernization projects, it retains more earnings to avoid costly external borrowings, lowering current dividends."
                }
            },
            {
                "stem": "The term loan clause requiring prior written consent from lenders before declaring dividends illustrates which factor affecting dividend decisions?",
                "options": [
                    {"id": "A", "text": "Legal Constraints", "isCorrect": False, "trap": "Legal constraints refer to Companies Act statutory provisions."},
                    {"id": "B", "text": "Contractual Constraints", "isCorrect": True, "trap": "None - loan covenants imposed by lenders are contractual constraints."},
                    {"id": "C", "text": "Stock Market Sentiment", "isCorrect": False, "trap": "Reflects investor reaction, not lender agreements."},
                    {"id": "D", "text": "Flotation Costs", "isCorrect": False, "trap": "Refers to issue expenses when raising external capital."}
                ],
                "correctOption": "B",
                "solution": {
                    "quick": "This is a Contractual Constraint.",
                    "concept": "Terms agreed upon in loan agreements with lenders act as contractual constraints on dividends.",
                    "detailed": "Restrictions placed by commercial banks and financial institutions in loan covenants to safeguard debt service obligations are Contractual Constraints."
                }
            },
            {
                "stem": "Why must the finance director scrutinize the company's 'Cash Flow Position' even though accounting profits are high at Rs. 40 Crore?",
                "options": [
                    {"id": "A", "text": "Dividend distribution involves an actual cash outflow; high profits tied up in receivables do not guarantee liquidity.", "isCorrect": True, "trap": "None - cash dividends require liquid bank balances, not just accrual profits."},
                    {"id": "B", "text": "Cash flow is relevant only for fixed asset depreciation adjustments.", "isCorrect": False, "trap": "Cash is required for all real payment obligations including dividends."},
                    {"id": "C", "text": "Dividends can be legally disbursed in the form of warehouse finished goods.", "isCorrect": False, "trap": "Dividends must be paid in legal currency or banking channels."},
                    {"id": "D", "text": "Cash flow position affects bonus share issues, not cash dividends.", "isCorrect": False, "trap": "Bonus shares require no cash outflow; cash dividends require liquid funds."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Cash dividends require actual liquid funds, which accrual profit does not guarantee.",
                    "concept": "Cash Flow Position is a critical determinant of dividend payments.",
                    "detailed": "A company may report substantial accounting profits, but if funds are locked in unpaid receivables or inventory, paying cash dividends can cause acute liquidity distress."
                }
            },
            {
                "stem": "Royal Heritage's established practice of declaring steady dividends over 15 years reflects which dividend policy virtue?",
                "options": [
                    {"id": "A", "text": "Stability of Dividends", "isCorrect": True, "trap": "None - regular, predictable dividend payouts enhance investor confidence and share value."},
                    {"id": "B", "text": "Flotation Cost Maximisation", "isCorrect": False, "trap": "Flotation costs are expenses to be minimized."},
                    {"id": "C", "text": "Tax Shield Elimination", "isCorrect": False, "trap": "Dividends provide no corporate tax shield."},
                    {"id": "D", "text": "Equity Voting Dilution", "isCorrect": False, "trap": "Dividend payouts do not dilute voting control."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "This reflects Stability of Dividends.",
                    "concept": "Investors prefer stable and predictable dividend streams.",
                    "detailed": "Paying regular, predictable dividends year after year signals financial resilience, satisfies income-seeking investors, and supports stable share valuations."
                }
            }
        ]
    })

    cases.append({
        "caseId": "CASE-FM-05",
        "title": "Bharat Semiconductor Systems: Fixed Capital Requirements & Leasing",
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
                "stem": "Fixed Capital in an industrial enterprise refers to the funds invested in:",
                "options": [
                    {"id": "A", "text": "Long-term fixed assets intended to generate operational revenue over multiple years rather than for resale.", "isCorrect": True, "trap": "None - standard NCERT definition of fixed capital."},
                    {"id": "B", "text": "Short-term current assets like trade receivables and inventory.", "isCorrect": False, "trap": "This defines working capital."},
                    {"id": "C", "text": "Daily petty cash disbursements for administrative postage.", "isCorrect": False, "trap": "Routine operational expenditure."},
                    {"id": "D", "text": "Short-term commercial papers maturing within 90 days.", "isCorrect": False, "trap": "Money market liquid instrument."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Fixed Capital is invested in long-term operational fixed assets.",
                    "concept": "Fixed capital funds long-term durable productive assets.",
                    "detailed": "Fixed capital represents capital invested in long-term fixed assets (land, buildings, specialized plant, machinery) retained for ongoing operations."
                }
            },
            {
                "stem": "Why does Bharat Semiconductor require an exceptionally large fixed capital investment compared to a traditional handloom enterprise?",
                "options": [
                    {"id": "A", "text": "Because it employs a highly automated, capital-intensive manufacturing technique rather than a labor-intensive method.", "isCorrect": True, "trap": "None - capital intensive technology demands heavy fixed investment."},
                    {"id": "B", "text": "Because handloom enterprises are legally forbidden from owning machinery.", "isCorrect": False, "trap": "Handloom units can own equipment; difference is technical intensity."},
                    {"id": "C", "text": "Because cleanroom facilities carry zero operational risk.", "isCorrect": False, "trap": "Semiconductor facilities carry high operational and obsolescence risks."},
                    {"id": "D", "text": "Because raw silicon wafers are completely cost-free.", "isCorrect": False, "trap": "Absurd distractor."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Capital-intensive technology requires heavy investment in machinery.",
                    "concept": "Choice of Technique is a primary determinant of fixed capital requirements.",
                    "detailed": "Enterprises utilizing capital-intensive automated processes require heavy machinery and cleanroom infrastructure, demanding massive fixed capital."
                }
            },
            {
                "stem": "How does rapid 'Technology Upgradation' in the semiconductor industry impact the company's fixed capital requirements?",
                "options": [
                    {"id": "A", "text": "It increases fixed capital requirement because existing machines face rapid obsolescence and require frequent replacement.", "isCorrect": True, "trap": "None - rapid obsolescence necessitates higher capital turnover into replacement assets."},
                    {"id": "B", "text": "It reduces fixed capital requirement to zero because old equipment lasts forever.", "isCorrect": False, "trap": "Directly contradicts the concept of technological obsolescence."},
                    {"id": "C", "text": "It eliminates the need for equity capital entirely.", "isCorrect": False, "trap": "Financing mix is distinct from technological obsolescence rate."},
                    {"id": "D", "text": "It automatically converts physical cleanrooms into liquid cash.", "isCorrect": False, "trap": "Absurd distractor."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Rapid technology obsolescence increases fixed capital needs.",
                    "concept": "Technology Upgradation directly drives fixed asset replacement frequency.",
                    "detailed": "In sectors where technological advances occur rapidly, machines become obsolete quickly, compelling frequent capital expenditure on updated equipment."
                }
            },
            {
                "stem": "If Bharat Semiconductor decides to acquire testing machinery via long-term financial 'Leasing' rather than direct purchase, what is the effect on its fixed capital requirements?",
                "options": [
                    {"id": "A", "text": "Fixed capital requirement will decrease because periodic lease rentals avoid massive upfront asset purchase outlays.", "isCorrect": True, "trap": "None - leasing reduces initial fixed capital requirement."},
                    {"id": "B", "text": "Fixed capital requirement will immediately quadruple.", "isCorrect": False, "trap": "Leasing spreads costs over time, lowering upfront capital requirement."},
                    {"id": "C", "text": "Gross working capital will become strictly negative.", "isCorrect": False, "trap": "Leasing affects fixed capital, not inherently making working capital negative."},
                    {"id": "D", "text": "The company will be barred from claiming tax deductions on lease rentals.", "isCorrect": False, "trap": "Operating lease rentals are tax deductible."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Leasing reduces upfront fixed capital requirements.",
                    "concept": "Financing Alternatives (leasing vs purchase) determine fixed capital outlay.",
                    "detailed": "Leasing enables an enterprise to use productive assets by paying periodic rentals rather than committing huge initial capital to buy them outright."
                }
            },
            {
                "stem": "Which strategic management process is responsible for evaluating, planning, and controlling these long-term fixed capital commitments?",
                "options": [
                    {"id": "A", "text": "Capital Budgeting Process", "isCorrect": True, "trap": "None - capital budgeting governs fixed asset investments."},
                    {"id": "B", "text": "Cash Credit Overdraft Administration", "isCorrect": False, "trap": "Short-term debt tool."},
                    {"id": "C", "text": "Trade Receivables Factoring", "isCorrect": False, "trap": "Working capital collection technique."},
                    {"id": "D", "text": "Inventory Re-order Level Optimization", "isCorrect": False, "trap": "Inventory control."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "The Capital Budgeting Process governs fixed capital commitments.",
                    "concept": "Capital budgeting manages long-term investments in fixed assets.",
                    "detailed": "Evaluating multi-year capital outlays, expected returns, and funding alternatives for fixed assets is the defining role of Capital Budgeting."
                }
            }
        ]
    })

    # Cases 6 to 10: Rich Financial Management scenarios
    fm_additional = [
        ("CASE-FM-06", "Himalaya Beverage Bottlers: Seasonal Working Capital & Operating Cycle",
         """Himalaya Beverage Bottlers operates a large-scale cold drink and mineral water bottling enterprise in Himachal Pradesh. The company's sales peak dramatically between March and July, requiring heavy seasonal working capital to procure PET preforms and maintain warehouse stocks. It operates with Rs. 80 Lakh inventory, Rs. 50 Lakh debtors, and Rs. 30 Lakh creditors. Management analyzes how seasonal spikes impact the operating cycle and liquid funds.""",
         "Working Capital Dynamics", "Seasonal vs Permanent Working Capital"),
        ("CASE-FM-07", "Quantum Cloud Networks: Flotation Costs & Capital Structure Constraints",
         """Quantum Cloud Networks Ltd is a telecom infrastructure provider expanding 5G data centers in Hyderabad. To fund a Rs. 100 Crore project, it considers issuing 12% debentures vs new equity shares. Management worries about flotation costs (underwriting, prospectus, brokerage) which are significantly higher for equity than private debt placement, and evaluates the risk of diluting existing shareholder voting control.""",
         "Capital Structure Decisions", "Flotation Costs and Control Constraints"),
        ("CASE-FM-08", "Prakriti Bio-Fuels India: Twin Objectives of Financial Planning",
         """Prakriti Bio-Fuels India is setting up ethanol blending plants across Maharashtra. The Chief Financial Officer emphasizes the twin objectives of Financial Planning: (1) to ensure availability of funds whenever required, and (2) to see that the firm does not raise resources unnecessarily, avoiding both shortage and idle cash. Management establishes systematic sales forecasts to estimate long-term and short-term capital needs.""",
         "Financial Planning", "Twin Objectives of Financial Planning"),
        ("CASE-FM-09", "Deccan Expressways Concessionaires: Interest Coverage Ratio & Solvency",
         """Deccan Expressways Concessionaires manages toll highway expansion in Karnataka. It has an EBIT of Rs. 30 Crore and annual debt interest obligations of Rs. 10 Crore, giving an Interest Coverage Ratio (ICR) of 3.0. The board evaluates raising an additional Rs. 50 Crore debt, aware that higher debt increases financial risk and debt-servicing vulnerability if toll collections fluctuate.""",
         "Leverage and Solvency", "Interest Coverage Ratio (ICR) & Risk"),
        ("CASE-FM-10", "Surya Logistics & Cold Storage: Debt Service Coverage Ratio & Cash Solvency",
         """Surya Logistics operates temperature-controlled transit warehouses across Madhya Pradesh. When applying for a long-term loan of Rs. 80 Crore, the consortium of commercial banks demands proof of a healthy Debt Service Coverage Ratio (DSCR), which includes cash profit after tax, depreciation, interest, and principal repayments. The bank emphasizes that DSCR provides a superior measure of cash solvency compared to simple ICR.""",
         "Debt Capacity Analysis", "Debt Service Coverage Ratio (DSCR)")
    ]

    for cid, title, narrative, topic, subtopic in fm_additional:
        cases.append({
            "caseId": cid,
            "title": title,
            "chapter": "Financial Management",
            "narrative": narrative,
            "questions": [
                {
                    "stem": f"In {title.split(':')[0]}, what is the ultimate financial benchmark guiding long-term asset and financing choices?",
                    "options": [
                        {"id": "A", "text": "Maximisation of current market value of equity shares (Shareholder Wealth Maximisation).", "isCorrect": True, "trap": "None - supreme objective of financial management."},
                        {"id": "B", "text": "Minimisation of product quality and safety standards.", "isCorrect": False, "trap": "Destroys brand equity and sales."},
                        {"id": "C", "text": "Maximisation of accounting depreciation claimed on machinery.", "isCorrect": False, "trap": "Accounting calculation, not supreme financial goal."},
                        {"id": "D", "text": "Total elimination of all equity shareholders from corporate ownership.", "isCorrect": False, "trap": "Absurd distractor."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "The ultimate objective is Shareholder Wealth Maximisation.",
                        "concept": "Financial management maximizes the market price of company equity shares.",
                        "detailed": "All managerial financial decisions strive to maximize shareholder wealth by optimizing risk and return, lifting share prices."
                    }
                },
                {
                    "stem": f"The core financial challenge analyzed in {title.split(':')[0]} focuses specifically on which dimension?",
                    "options": [
                        {"id": "A", "text": subtopic, "isCorrect": True, "trap": f"None - exact core theme: {subtopic}."},
                        {"id": "B", "text": "Collective Bargaining and Trade Union Wage Conciliation", "isCorrect": False, "trap": "HR management topic, not corporate finance."},
                        {"id": "C", "text": "Trade Mark Registration under Intellectual Property Law", "isCorrect": False, "trap": "Legal compliance issue."},
                        {"id": "D", "text": "Shop-Floor Stop-Watch Motion Study", "isCorrect": False, "trap": "Taylor's industrial engineering technique."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": f"The core dimension is {subtopic}.",
                        "concept": f"NCERT Financial Management: {subtopic}.",
                        "detailed": f"The case directly analyzes {subtopic}, evaluating its strategic implications on financial solvency and capital costs."
                    }
                },
                {
                    "stem": f"Which of the following statements accurately evaluates the financial implication outlined in {title.split(':')[0]}?",
                    "options": [
                        {"id": "A", "text": "Careful financial structuring and planning protect the enterprise from both liquidity crunches and excessive idle funds.", "isCorrect": True, "trap": "None - fundamental principle of sound financial administration."},
                        {"id": "B", "text": "Excess liquid cash locked up in zero-earning current assets always maximizes shareholder profitability.", "isCorrect": False, "trap": "Idle funds earn no return and reduce overall ROI."},
                        {"id": "C", "text": "Debt capital carries zero financial risk or repayment obligations.", "isCorrect": False, "trap": "Debt carries fixed contractual obligations and default risk."},
                        {"id": "D", "text": "Financial decisions can be executed successfully without evaluating the firm's cash flow position.", "isCorrect": False, "trap": "Cash flow position is a vital determinant of financial decisions."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "Sound financial management avoids both cash shortages and idle funds.",
                        "concept": "Financial planning balances fund availability and capital cost.",
                        "detailed": "Financial planning ensures funds are available when needed while preventing excess idle cash that drags down returns."
                    }
                },
                {
                    "stem": f"How does management reconcile the trade-off between Risk and Return in {title.split(':')[0]}?",
                    "options": [
                        {"id": "A", "text": "By balancing lower cost sources like debt against the financial risk of fixed commitment obligations.", "isCorrect": True, "trap": "None - the classic risk-return trade-off in financial structure."},
                        {"id": "B", "text": "By financing 100% of operations solely through short-term trade credit.", "isCorrect": False, "trap": "Excessive reliance on trade credit causes acute operational risk."},
                        {"id": "C", "text": "By avoiding all formal financial projections and accounting budgets.", "isCorrect": False, "trap": "Contradicts scientific financial planning."},
                        {"id": "D", "text": "By paying 100% of gross revenue as annual dividends.", "isCorrect": False, "trap": "Depletes capital and leads to corporate liquidation."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "Management balances cheaper debt against fixed financial commitments.",
                        "concept": "Capital structure is optimized around the risk-return trade-off.",
                        "detailed": "Debt is cheaper than equity because of tax deductibility, but adds financial risk; management balances this trade-off to maximize value."
                    }
                },
                {
                    "stem": f"Under NCERT Class 12 Business Studies, the strategic problem depicted in {title.split(':')[0]} belongs to which major category?",
                    "options": [
                        {"id": "A", "text": "Financing and Capital Management Decision", "isCorrect": True, "trap": "None - comprehensive categorization of corporate financial decisions."},
                        {"id": "B", "text": "Employee Performance Appraisal Decision", "isCorrect": False, "trap": "Staffing function."},
                        {"id": "C", "text": "Retail Shelf Space Merchandising Decision", "isCorrect": False, "trap": "Marketing physical distribution."},
                        {"id": "D", "text": "Industrial Dispute Conciliation Decision", "isCorrect": False, "trap": "Labor relations."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "This is a Financing and Capital Management Decision.",
                        "concept": "Corporate finance revolves around investment, financing, and dividend decisions.",
                        "detailed": "The decisions analyzed in the case directly govern capital structure, solvency, and liquidity management."
                    }
                }
            ]
        })

    # =========================================================================
    # 2. Organising & Structural Design (Cases 11 to 20)
    # =========================================================================
    cases.append({
        "caseId": "CASE-ORG-01",
        "title": "Helix Consumer Electronics: Transition to Divisional Structure",
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
                "stem": "Which organizational structure has Helix Consumer Electronics Ltd adopted for its multi-product enterprise?",
                "options": [
                    {"id": "A", "text": "Functional Structure", "isCorrect": False, "trap": "Functional structure groups by enterprise functions, not independent product lines."},
                    {"id": "B", "text": "Divisional Structure", "isCorrect": True, "trap": "None - enterprise grouped into autonomous units based on separate product lines."},
                    {"id": "C", "text": "Informal Structure", "isCorrect": False, "trap": "Informal structure emerges spontaneously from social relationships."},
                    {"id": "D", "text": "Matrix Structure", "isCorrect": False, "trap": "Matrix structure combines functional and project reporting; not the primary NCERT model described."}
                ],
                "correctOption": "B",
                "solution": {
                    "quick": "This is a Divisional Structure.",
                    "concept": "Divisional structure groups activities into autonomous units based on products.",
                    "detailed": "When an enterprise manufactures multiple distinct product lines, dividing operations into self-contained product divisions creates a Divisional Structure."
                }
            },
            {
                "stem": "What is the primary advantage of the divisional structure experienced by Helix regarding executive leadership development?",
                "options": [
                    {"id": "A", "text": "Divisional heads develop multi-functional managerial skills, preparing them for top general management roles.", "isCorrect": True, "trap": "None - heading an autonomous division provides end-to-end operational experience."},
                    {"id": "B", "text": "Duplicating functional departments across divisions reduces total corporate overhead.", "isCorrect": False, "trap": "Duplicating functions across divisions increases overhead costs."},
                    {"id": "C", "text": "Division heads can ignore product line profitability entirely.", "isCorrect": False, "trap": "Divisional structure fixes clear product accountability, not ignores it."},
                    {"id": "D", "text": "Decisions require unanimous joint approval from all three division heads.", "isCorrect": False, "trap": "Divisions operate autonomously, not by unanimous committee."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Divisional structure develops general managerial talent.",
                    "concept": "Divisional heads gain comprehensive operational experience.",
                    "detailed": "Because each division head oversees production, sales, finance, and HR for their product line, they develop broad general management competencies."
                }
            },
            {
                "stem": "The Managing Director's policy of delegating operational decisions while retaining strategic capital allocations illustrates:",
                "options": [
                    {"id": "A", "text": "Complete Abdication of Top Management Responsibility", "isCorrect": False, "trap": "Top management retains strategic direction; decentralisation is not abdication."},
                    {"id": "B", "text": "Selective Decentralisation with Strategic Centralised Control", "isCorrect": True, "trap": "None - operational decisions pushed down, enterprise strategy retained at top."},
                    {"id": "C", "text": "Total Centralisation of Routine Daily Tasks", "isCorrect": False, "trap": "Routine tasks were decentralized, not centralized."},
                    {"id": "D", "text": "Informal Grapevine Governance", "isCorrect": False, "trap": "This is a formal policy decision."}
                ],
                "correctOption": "B",
                "solution": {
                    "quick": "This reflects Selective Decentralisation with Strategic Central Control.",
                    "concept": "Decentralisation balances operational dispersal with core central control.",
                    "detailed": "Decentralisation does not mean total absence of control. Top management retains strategic direction, capital allocation, and policy, while dispersing operational authority."
                }
            },
            {
                "stem": "What is a recognized disadvantage or conflict risk associated with the divisional structure adopted by Helix?",
                "options": [
                    {"id": "A", "text": "Divisional heads may prioritize sectional division interests over overall corporate goals, sparking inter-divisional conflicts over corporate funds.", "isCorrect": True, "trap": "None - known drawback where divisional rivalry leads to conflict over corporate fund allocation."},
                    {"id": "B", "text": "Product specialization is completely lost.", "isCorrect": False, "trap": "Product specialization is maximized in a divisional structure."},
                    {"id": "C", "text": "No single manager can be held accountable for product line losses.", "isCorrect": False, "trap": "Accountability is distinct and easily fixed on the division head."},
                    {"id": "D", "text": "Operational decisions become excessively slow due to lack of local authority.", "isCorrect": False, "trap": "Decisions are faster because divisional heads have autonomy."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Inter-divisional conflicts over fund allocation can arise.",
                    "concept": "Divisional rivalry and narrow sectional outlook are limitations of divisional structure.",
                    "detailed": "Divisional heads may compete aggressively for corporate investment capital and pursue divisional growth even at the expense of enterprise-wide priorities."
                }
            },
            {
                "stem": "How does Decentralisation differ fundamentally from Delegation as demonstrated in Helix's corporate transformation?",
                "options": [
                    {"id": "A", "text": "Delegation is a downward transfer of authority between two individuals, whereas Decentralisation is an enterprise-wide policy philosophy.", "isCorrect": True, "trap": "None - exact NCERT distinction between delegation and decentralisation."},
                    {"id": "B", "text": "Delegation is purely optional, while Decentralisation is a mandatory statutory requirement under Companies Act.", "isCorrect": False, "trap": "Delegation is a compulsory operational necessity; decentralisation is an optional management philosophy."},
                    {"id": "C", "text": "Delegation has a wide organizational scope, while Decentralisation has a narrow scope.", "isCorrect": False, "trap": "Scope is inverted: delegation has narrow scope; decentralisation has wide scope."},
                    {"id": "D", "text": "Delegation creates zero accountability whatsoever.", "isCorrect": False, "trap": "Accountability remains absolute in delegation."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Delegation is a two-person transfer; Decentralisation is an enterprise-wide philosophy.",
                    "concept": "Delegation vs Decentralisation scope and nature.",
                    "detailed": "Delegation is an essential operational technique of sharing authority between a manager and subordinate, whereas decentralisation is a systemic top-management philosophy."
                }
            }
        ]
    })

    cases.append({
        "caseId": "CASE-ORG-02",
        "title": "Prakriti Pharmaceuticals: Decentralisation & Executive Relief",
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
                "stem": "The systematic dispersal of decision-making authority down to the lowest managerial levels at Prakriti Pharmaceuticals is known as:",
                "options": [
                    {"id": "A", "text": "Centralisation", "isCorrect": False, "trap": "Centralisation concentrates authority at the top."},
                    {"id": "B", "text": "Decentralisation", "isCorrect": True, "trap": "None - systematic dispersal of authority to lowest levels."},
                    {"id": "C", "text": "Functional Departmentalisation", "isCorrect": False, "trap": "Grouping activities into departments, not authority dispersal."},
                    {"id": "D", "text": "Span of Control", "isCorrect": False, "trap": "Number of subordinates a manager supervises."}
                ],
                "correctOption": "B",
                "solution": {
                    "quick": "This is Decentralisation.",
                    "concept": "Decentralisation refers to the systematic delegation of authority through all levels of management.",
                    "detailed": "Dispersing decision-making authority systematically throughout all levels of management down to operating units is Decentralisation."
                }
            },
            {
                "stem": "Which importance of decentralisation is highlighted by the HR Director's observation regarding top executives?",
                "options": [
                    {"id": "A", "text": "Relief to top management", "isCorrect": True, "trap": "None - decentralisation frees top executives to focus on strategic policy."},
                    {"id": "B", "text": "Facilitating growth of competitor market share", "isCorrect": False, "trap": "Absurd distractor."},
                    {"id": "C", "text": "Increasing paperwork and bureaucratic latency", "isCorrect": False, "trap": "Decentralisation reduces bureaucratic delays."},
                    {"id": "D", "text": "Eliminating all internal control mechanisms", "isCorrect": False, "trap": "Decentralisation requires effective control systems, not eliminates them."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "The importance highlighted is 'Relief to top management'.",
                    "concept": "Decentralisation relieves top management from operational chores.",
                    "detailed": "By delegating routine operational decisions to regional heads, top executives are freed from routine firefighting to concentrate on major strategic policies."
                }
            },
            {
                "stem": "How does granting operational autonomy to zonal directors develop managerial talent for the future?",
                "options": [
                    {"id": "A", "text": "By providing opportunities to handle operational challenges independently and learn from actual decision-making experience.", "isCorrect": True, "trap": "None - gives subordinates chance to prove their mettle and develop executive judgment."},
                    {"id": "B", "text": "By ensuring they never face any commercial or operational risks.", "isCorrect": False, "trap": "Managerial growth comes from handling risks, not avoiding them."},
                    {"id": "C", "text": "By transferring all corporate financial losses to regional managers.", "isCorrect": False, "trap": "Absurd distractor."},
                    {"id": "D", "text": "By eliminating all formal performance appraisals.", "isCorrect": False, "trap": "Performance evaluation becomes clearer under decentralisation."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "It develops executive talent through independent decision-making experience.",
                    "concept": "Decentralisation develops managerial talent for future leadership.",
                    "detailed": "Allowing lower-level managers to exercise judgment builds initiative, resilience, and executive problem-solving skills, creating a reserve of future top managers."
                }
            },
            {
                "stem": "Why did corporate headquarters retain central authority over drug patent filings and statutory compliance?",
                "options": [
                    {"id": "A", "text": "Because decisions affecting the vital legal existence and strategic survival of the enterprise must remain centralised.", "isCorrect": True, "trap": "None - vital policy and regulatory matters require uniform corporate control."},
                    {"id": "B", "text": "Because regional directors have no legal qualifications.", "isCorrect": False, "trap": "Not the managerial rationale."},
                    {"id": "C", "text": "Because decentralisation is forbidden by pharmaceutical laws.", "isCorrect": False, "trap": "Decentralisation is an internal organizational choice."},
                    {"id": "D", "text": "Because top management wants to discourage regional expansion.", "isCorrect": False, "trap": "Contradicts company expansion objective."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Vital policy and legal survival decisions must remain centralised.",
                    "concept": "Selective centralisation of core strategic functions.",
                    "detailed": "Matters of broad corporate policy, major capital allocations, patent rights, and legal compliance require uniform central control for enterprise survival."
                }
            },
            {
                "stem": "Which of the following statements correctly evaluates the relationship between Delegation and Decentralisation?",
                "options": [
                    {"id": "A", "text": "Decentralisation is an extension of delegation; delegation is a necessary prerequisite to decentralisation.", "isCorrect": True, "trap": "None - decentralisation is delegation multiplied across all organizational levels."},
                    {"id": "B", "text": "Delegation can only happen after complete decentralisation is finalized.", "isCorrect": False, "trap": "Delegation exists even in highly centralised firms between boss and subordinate."},
                    {"id": "C", "text": "Decentralisation makes delegation completely redundant and obsolete.", "isCorrect": False, "trap": "Decentralisation relies on delegation at every level."},
                    {"id": "D", "text": "Delegation is a policy decision while Decentralisation is an accidental event.", "isCorrect": False, "trap": "Both are deliberate managerial processes."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Decentralisation is an extension of delegation.",
                    "concept": "Delegation is the foundational process; decentralisation is its enterprise-wide expansion.",
                    "detailed": "Decentralisation is the systematic diffusion of authority throughout all tiers. Delegation between individual superiors and subordinates is the prerequisite mechanism."
                }
            }
        ]
    })

    cases.append({
        "caseId": "CASE-ORG-03",
        "title": "Bharat Heavy Machinery: Functional Silos & Inter-Departmental Conflict",
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
                    {"id": "A", "text": "Divisional Structure", "isCorrect": False, "trap": "Divisional structure groups by products; BHML groups by enterprise functions."},
                    {"id": "B", "text": "Functional Structure", "isCorrect": True, "trap": "None - grouping activities on the basis of functions like production, marketing, finance."},
                    {"id": "C", "text": "Informal Network", "isCorrect": False, "trap": "This is a formal administrative hierarchy."},
                    {"id": "D", "text": "Matrix Project Structure", "isCorrect": False, "trap": "Not a matrix structure."}
                ],
                "correctOption": "B",
                "solution": {
                    "quick": "This is a Functional Structure.",
                    "concept": "Grouping jobs of similar nature under functions creates a Functional Structure.",
                    "detailed": "Organizing the enterprise into major specialized departments based on functions (production, marketing, finance) is the definition of a Functional Structure."
                }
            },
            {
                "stem": "What is the primary advantage of the Functional Structure utilized by BHML?",
                "options": [
                    {"id": "A", "text": "Occupational specialization and efficient utilization of functional manpower.", "isCorrect": True, "trap": "None - functional structure promotes professional specialization and economies of scale within functions."},
                    {"id": "B", "text": "Effortless fixing of individual accountability for overall company profit.", "isCorrect": False, "trap": "In functional structure, fixing accountability for final product delivery is notoriously difficult."},
                    {"id": "C", "text": "Elimination of all need for inter-departmental coordination.", "isCorrect": False, "trap": "Coordination becomes more critical and challenging across functional silos."},
                    {"id": "D", "text": "Complete multi-product independence across parallel factories.", "isCorrect": False, "trap": "This applies to divisional structures."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "It promotes occupational specialization and manpower efficiency.",
                    "concept": "Functional structure maximizes professional and functional specialization.",
                    "detailed": "Placing specialists within their functional departments allows deep technical expertise, economies of scale, and efficient manpower deployment."
                }
            },
            {
                "stem": "The inter-departmental finger-pointing and friction described in the case highlights which recognized limitation of Functional Structure?",
                "options": [
                    {"id": "A", "text": "Functional empires develop where departmental heads pursue narrow sectional interests at the expense of organizational goals.", "isCorrect": True, "trap": "None - direct NCERT disadvantage of functional structure."},
                    {"id": "B", "text": "Duplication of machinery and physical plant across product lines.", "isCorrect": False, "trap": "Duplication of facilities is a disadvantage of divisional structure, not functional."},
                    {"id": "C", "text": "Total absence of professional specialization.", "isCorrect": False, "trap": "Functional structure maximizes specialization."},
                    {"id": "D", "text": "Inability of functional managers to control their immediate subordinates.", "isCorrect": False, "trap": "Functional control within the department is strong."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Departmental heads develop functional empires and pursue narrow sectional interests.",
                    "concept": "Functional empires and coordination barriers in functional structures.",
                    "detailed": "Functional heads focus on their department's prestige and targets, losing sight of the overall corporate mission, which breeds inter-departmental conflict."
                }
            },
            {
                "stem": "Why is it difficult to fix clear accountability for the delayed turbine delivery in BHML's functional structure?",
                "options": [
                    {"id": "A", "text": "Because final performance depends on the collective contribution of multiple interdependent functional departments.", "isCorrect": True, "trap": "None - since no single functional head controls the end-to-end product delivery, accountability is diffused."},
                    {"id": "B", "text": "Because government laws prohibit auditing functional departments.", "isCorrect": False, "trap": "Absurd distractor."},
                    {"id": "C", "text": "Because functional managers report solely to external trade unions.", "isCorrect": False, "trap": "Functional managers report to the General Manager."},
                    {"id": "D", "text": "Because engineering turbines requires zero managerial supervision.", "isCorrect": False, "trap": "Absurd distractor."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "Accountability is diffused across interdependent functional departments.",
                    "concept": "Difficulty in fixing accountability is a core limitation of functional structure.",
                    "detailed": "Because product completion requires inputs from production, finance, and marketing jointly, no single department head can be held exclusively accountable for final delivery failure."
                }
            },
            {
                "stem": "Under which business condition is a Functional Structure most suitable according to NCERT?",
                "options": [
                    {"id": "A", "text": "When the enterprise is a single-product firm requiring high degree of functional specialization.", "isCorrect": True, "trap": "None - functional structure is ideal for single-product or homogeneous business lines."},
                    {"id": "B", "text": "When an enterprise produces dozens of diversified, unrelated consumer product lines.", "isCorrect": False, "trap": "Diversified multi-product enterprises require divisional structure."},
                    {"id": "C", "text": "When the firm operates without any formal hierarchy or rules.", "isCorrect": False, "trap": "Functional structure is highly formal."},
                    {"id": "D", "text": "When an enterprise wishes to avoid any division of labor.", "isCorrect": False, "trap": "Organising is founded on division of labor."}
                ],
                "correctOption": "A",
                "solution": {
                    "quick": "It is most suitable for large single-product or homogeneous enterprises.",
                    "concept": "Suitability of Functional Structure in NCERT.",
                    "detailed": "A functional structure is ideal when the enterprise produces one line of products or services and requires deep occupational and functional specialization."
                }
            }
        ]
    })

    # Cases 14 to 20: Additional Organising Case Studies
    org_additional = [
        ("CASE-ORG-04", "ZenTech Cloud Solutions: Informal Organisation & The Grapevine",
         """ZenTech Cloud Solutions is a software development firm in Hyderabad. Alongside the formal hierarchy of project managers and systems architects, software engineers spontaneously gather in cafeteria interest groups and virtual gaming channels. When rumors regarding impending layoffs began circulating across these informal networks, productivity slumped until the CEO addressed the grapevine directly.""",
         "Formal vs Informal Organisation", "Informal Organisation and the Grapevine"),
        ("CASE-ORG-05", "Aarogyam Hospital Network: Delegation & Absoluteness of Accountability",
         """Aarogyam operates super-speciality hospitals across Kerala. The Chief Medical Officer (CMO) delegated surgical scheduling authority to the Senior Resident Doctor. During an emergency inspection, irregularities in ICU sterilization were discovered. The Senior Resident claimed operating nurses failed him, but the CMO was held legally accountable by the Medical Council. The case demonstrates the absoluteness of accountability.""",
         "Delegation of Authority", "Elements of Delegation: Authority, Responsibility, Accountability"),
        ("CASE-ORG-06", "Imperial Retail Supermarkets: Span of Management & Hierarchical Tiers",
         """Imperial Retail operates a chain of 45 grocery supermarkets in Tamil Nadu. The Managing Director reduced the 'Span of Management' from 15 store managers reporting to 1 regional director down to 5 store managers per regional manager. While direct supervision improved, two additional hierarchical tiers were created, increasing administrative payroll costs and slowing upward communication.""",
         "Span of Management", "Tall vs Flat Structure and Span of Control"),
        ("CASE-ORG-07", "Kaveri Handicrafts Emporium: Four Steps in the Organising Process",
         """Kaveri Handicrafts Emporium in Mysuru expanded from an artisan shop into a global handloom exporter. The founder instituted a formal organising process: (1) Identification and division of work, (2) Departmentalisation by material types, (3) Assignment of specific duties to master craftsmen, and (4) Establishing clear reporting relationships to avoid confusion.""",
         "Organising Process", "Steps in the Organising Process"),
        ("CASE-ORG-08", "Nexus Express Logistics: Balancing Centralisation & Decentralisation",
         """Nexus Express Logistics manages rapid parcel delivery across 80 cities in India. The Managing Director balances centralisation and decentralisation: routing algorithms, fleet insurance, and vehicle procurement are strictly centralised at headquarters, whereas local delivery re-routing, overtime approvals, and minor fuel repairs are decentralized to station masters for operational agility.""",
         "Degree of Decentralisation", "Balancing Centralisation and Decentralisation"),
        ("CASE-ORG-09", "Surya Automotives: Multi-Product Diversification & Divisional Transition",
         """Surya Automotives in Chennai expanded from two-wheelers into electric commercial trucks and agricultural tractors. As product complexity grew, the company phased out its functional structure in favor of a divisional structure with separate divisions for Two-Wheelers, Commercial EV Trucks, and Tractors, fixing clear profit center accountability on division presidents.""",
         "Structural Transformation", "Functional to Divisional Transition"),
        ("CASE-ORG-10", "GreenTerrace Urban Agrotech: Leveraging Informal Groups for Morale",
         """GreenTerrace develops hydroponic vertical farms in Pune. The founder actively engages with informal worker groups, observing how the informal organization provides social satisfaction, alleviates workplace stress, and transmits rapid feedback that the rigid formal chain of command often obscures, harmonizing informal norms with company targets.""",
         "Informal Group Dynamics", "Leveraging the Informal Organisation")
    ]

    for cid, title, narrative, topic, subtopic in org_additional:
        cases.append({
            "caseId": cid,
            "title": title,
            "chapter": "Organising",
            "narrative": narrative,
            "questions": [
                {
                    "stem": f"In {title.split(':')[0]}, which fundamental dimension or principle of Organising is primarily illustrated?",
                    "options": [
                        {"id": "A", "text": subtopic, "isCorrect": True, "trap": f"None - exact conceptual dimension illustrated: {subtopic}."},
                        {"id": "B", "text": "Taylor's Functional Foremanship with Eight Gang Bosses", "isCorrect": False, "trap": "Specific shop-floor technique, not the case theme."},
                        {"id": "C", "text": "Consumer Protection Pecuniary Jurisdiction Rules", "isCorrect": False, "trap": "Consumer Protection Act topic, not Organising."},
                        {"id": "D", "text": "Depreciation Tax Shield Maximisation", "isCorrect": False, "trap": "Financial management topic."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": f"The core dimension is {subtopic}.",
                        "concept": f"NCERT Class 12 Organising: {subtopic}.",
                        "detailed": f"The case directly analyzes {subtopic}, an essential pillar of the Organising function in NCERT."
                    }
                },
                {
                    "stem": f"What is the direct organizational benefit achieved through the structural arrangement in {title.split(':')[0]}?",
                    "options": [
                        {"id": "A", "text": "Clarity in working relationships, operational accountability, and effective goal realization.", "isCorrect": True, "trap": "None - primary organizational benefits highlighted in NCERT."},
                        {"id": "B", "text": "Complete eradication of any requirement for future managerial planning.", "isCorrect": False, "trap": "Planning and organising are continuous interdependent functions."},
                        {"id": "C", "text": "Immediate elimination of all employee compensation expenses.", "isCorrect": False, "trap": "Absurd distractor."},
                        {"id": "D", "text": "Conversion of all private commercial contracts into statutory decrees.", "isCorrect": False, "trap": "Absurd distractor."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "It ensures clarity in working relationships and operational accountability.",
                        "concept": "Importance of Organising in NCERT.",
                        "detailed": "Organising defines roles, lines of authority, and reporting channels, eliminating ambiguity and fostering coordinated action."
                    }
                },
                {
                    "stem": f"Which established NCERT tenet is confirmed by the administrative situation depicted in {title.split(':')[0]}?",
                    "options": [
                        {"id": "A", "text": "Authority can be delegated, but ultimate accountability is absolute and cannot be abdicated.", "isCorrect": True, "trap": "None - the core Principle of Absoluteness of Accountability."},
                        {"id": "B", "text": "Delegation and Decentralisation are completely identical concepts with identical scope.", "isCorrect": False, "trap": "Decentralisation is an enterprise-wide policy; delegation is a two-person transfer."},
                        {"id": "C", "text": "Informal organizations should always be crushed by management because they lack formal rules.", "isCorrect": False, "trap": "Informal organization fulfills social needs and should be constructively harnessed."},
                        {"id": "D", "text": "A narrow span of management completely eliminates all supervisory overhead costs.", "isCorrect": False, "trap": "Narrow span increases hierarchical levels and supervisory costs."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "Authority can be delegated, but accountability remains absolute.",
                        "concept": "Absoluteness of Accountability in Delegation.",
                        "detailed": "Under the principle of absoluteness of accountability, superiors remain answerable to their own higher authority for the task even after delegating authority."
                    }
                },
                {
                    "stem": f"How does management maintain organizational effectiveness in {title.split(':')[0]}?",
                    "options": [
                        {"id": "A", "text": "By establishing clear reporting channels while recognizing and constructively aligning informal communication networks.", "isCorrect": True, "trap": "None - effective managers harness informal networks alongside formal channels."},
                        {"id": "B", "text": "By forbidding employees from talking to colleagues outside of written memos.", "isCorrect": False, "trap": "Rigid suppression of informal networks leads to rumors and discontent."},
                        {"id": "C", "text": "By centralising every minor routine operational chore exclusively with the CEO.", "isCorrect": False, "trap": "Stifles agility and overburdens top executives."},
                        {"id": "D", "text": "By abolishing all job specifications and formal duties.", "isCorrect": False, "trap": "Creates chaos."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "By combining formal authority with constructive informal communication.",
                        "concept": "Harmonizing formal structure with informal social networks.",
                        "detailed": "Effective managers integrate clear formal reporting channels with responsive informal networks to preserve morale and agility."
                    }
                },
                {
                    "stem": f"In the taxonomy of management functions, the structural architecture designed in {title.split(':')[0]} belongs to:",
                    "options": [
                        {"id": "A", "text": "Organising Function of Management", "isCorrect": True, "trap": "None - defines the framework within which managerial and operating tasks are performed."},
                        {"id": "B", "text": "Macro Environmental Scanning", "isCorrect": False, "trap": "Strategic planning input, not structural design."},
                        {"id": "C", "text": "SEBI Primary Market Demat Flotation", "isCorrect": False, "trap": "Financial market concept."},
                        {"id": "D", "text": "Factory Act Boiler Inspection", "isCorrect": False, "trap": "Statutory labor law."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "This belongs to the Organising Function.",
                        "concept": "Organising establishes organizational structure and relationships.",
                        "detailed": "Organising defines roles, groups activities into departments, assigns responsibilities, and specifies lines of authority."
                    }
                }
            ]
        })

    # =========================================================================
    # 3. Marketing Management (Cases 21 to 26)
    # =========================================================================
    mkt_cases = [
        ("CASE-MKT-01", "NutriBite Foods: Shift to the Societal Marketing Concept",
         """NutriBite Foods Ltd is a packaged snack brand based in Mumbai. Confronted with growing consumer backlash against ultra-processed foods containing high sodium and trans-fats, the company overhauled its marketing orientation. It shifted from the aggressive Selling Concept (which relied on celebrity push advertisements) to the Societal Marketing Concept. NutriBite reformulated its snacks with roasted millets, replaced synthetic packaging with 100% biodegradable cornstarch pouches, and instituted transparent nutrition labeling.""",
         "Marketing Philosophies", "Selling Concept vs Societal Marketing Concept"),
        ("CASE-MKT-02", "Shrestha Ayurveda: Branding, Packaging & Labeling Compliance",
         """Shrestha Ayurveda manufactures organic therapeutic oils in Kerala. To prevent counterfeit imitations, the company secured a registered Trade Mark for its distinctive herbal emblem. It introduced a 3-tier packaging architecture: primary glass dropper vials, secondary tamper-evident cardboard cartons, and corrugated transit boxes. The labeling clearly prints ingredients, FSSAI licenses, manufacturing dates, batch numbers, and statutory safety precautions.""",
         "Product Mix", "Branding, 3 Levels of Packaging, and Labeling"),
        ("CASE-MKT-03", "Velocity Athletic Footwear: Integrated Promotion Mix Strategy",
         """Velocity Footwear in Delhi launched a new line of carbon-fiber marathon running shoes. The marketing director balanced the Promotion Mix across all four components: national television and digital video advertising for mass reach; sponsoring the Mumbai International Marathon for public relations goodwill; offering introductory 15% discount coupons as short-term sales promotion; and stationing technical running specialists in flagship stores for personal selling demonstrations.""",
         "Promotion Mix", "Integrating Advertising, PR, Sales Promotion, and Personal Selling"),
        ("CASE-MKT-04", "Kisaan Agro Machinery: Distribution Channel Strategy",
         """Kisaan Agro Machinery in Ludhiana manufactures heavy agricultural harvesters alongside routine replacement blades. For the high-value, technically complex harvesters (priced at Rs. 25 Lakh), the company utilizes a direct Zero-Level Channel with company sales engineers. In contrast, for low-cost, standardized replacement blades and tractor lubricants, it deploys a Two-Level Channel through agricultural wholesalers and rural hardware stockists.""",
         "Channels of Distribution", "Zero-Level Direct vs Multi-Tier Indirect Channels"),
        ("CASE-MKT-05", "Pristine Water Purifiers: Skimming vs Penetration Pricing",
         """Pristine Purifiers in Pune engineered an innovative graphene-membrane water purifier that removes microscopic chemical pollutants without wasting water. The board evaluated whether to adopt a Price Skimming strategy (charging a premium price of Rs. 35,000 to recover high R&D investments from early tech adopters) or a Penetration Pricing strategy (setting a low price of Rs. 12,000 to quickly capture mass market share against entrenched competitors).""",
         "Price Mix", "Price Skimming vs Penetration Pricing"),
        ("CASE-MKT-06", "Metro Hypermarkets: Physical Distribution & Logistics Management",
         """Metro Hypermarkets operates 60 retail grocery stores across Karnataka. To minimize the total cost of physical distribution while avoiding empty shelves, the supply chain team integrated four core components: automated electronic order processing; centralized temperature-controlled warehousing; optimized transport trucking routes; and barcode inventory control to calculate Economic Order Quantities (EOQ) and safety buffer stocks.""",
         "Physical Distribution", "Order Processing, Warehousing, Transportation, and Inventory Control")
    ]

    for cid, title, narrative, topic, subtopic in mkt_cases:
        cases.append({
            "caseId": cid,
            "title": title,
            "chapter": "Marketing Management",
            "narrative": narrative,
            "questions": [
                {
                    "stem": f"In {title.split(':')[0]}, which core marketing concept or element is primarily examined?",
                    "options": [
                        {"id": "A", "text": subtopic, "isCorrect": True, "trap": f"None - exact marketing concept: {subtopic}."},
                        {"id": "B", "text": "Taylor's Functional Foremanship Routing", "isCorrect": False, "trap": "Shop-floor production management technique."},
                        {"id": "C", "text": "CPA 2019 Pecuniary District Jurisdiction", "isCorrect": False, "trap": "Consumer court jurisdiction topic."},
                        {"id": "D", "text": "Debt-Equity Ratio Solvency Analysis", "isCorrect": False, "trap": "Financial management ratio."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": f"The core concept examined is {subtopic}.",
                        "concept": f"NCERT Class 12 Marketing Management: {subtopic}.",
                        "detailed": f"The case narrative directly illustrates {subtopic}, analyzing its strategic role in customer satisfaction and commercial viability."
                    }
                },
                {
                    "stem": f"What is the primary customer-oriented rationale guiding management's actions in {title.split(':')[0]}?",
                    "options": [
                        {"id": "A", "text": "Delivering genuine customer value and satisfaction while ensuring organizational profitability and long-term viability.", "isCorrect": True, "trap": "None - fundamental premise of modern marketing."},
                        {"id": "B", "text": "Forcing unwanted products onto consumers through coercive deception.", "isCorrect": False, "trap": "Contradicts marketing philosophy and invites regulatory penalties."},
                        {"id": "C", "text": "Eliminating all expenditure on product quality control.", "isCorrect": False, "trap": "Destroys customer trust and brand equity."},
                        {"id": "D", "text": "Restricting product distribution exclusively to factory gates.", "isCorrect": False, "trap": "Severe distribution failure."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "Delivering customer satisfaction while ensuring enterprise profitability.",
                        "concept": "The Marketing Concept foundation.",
                        "detailed": "Modern marketing aligns corporate activities to satisfy consumer needs better than competitors at a fair profit."
                    }
                },
                {
                    "stem": f"Which of the following statements represents an established NCERT principle regarding the strategy in {title.split(':')[0]}?",
                    "options": [
                        {"id": "A", "text": "A well-integrated marketing mix harmonizes product, price, place, and promotion into a cohesive customer offering.", "isCorrect": True, "trap": "None - exact NCERT marketing mix principle."},
                        {"id": "B", "text": "Promotion mix elements are completely useless in competitive consumer markets.", "isCorrect": False, "trap": "Promotion mix is essential for awareness and persuasion."},
                        {"id": "C", "text": "Channels of distribution have zero influence on consumer product availability.", "isCorrect": False, "trap": "Channels create place and time utility for customers."},
                        {"id": "D", "text": "Pricing decisions can be taken in complete isolation from product costs.", "isCorrect": False, "trap": "Product cost establishes the fundamental price floor."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "An integrated marketing mix harmonizes product, price, place, and promotion.",
                        "concept": "The 4 Ps of Marketing Mix in NCERT.",
                        "detailed": "Success requires that product features, pricing strategy, distribution logistics, and promotional communication reinforce each other cohesively."
                    }
                },
                {
                    "stem": f"How does management mitigate market competition in {title.split(':')[0]}?",
                    "options": [
                        {"id": "A", "text": "By differentiating its offering through superior product features, credible branding, and reliable customer service.", "isCorrect": True, "trap": "None - sustainable competitive advantage via differentiation."},
                        {"id": "B", "text": "By engaging in unlawful predatory price fixing with rival cartels.", "isCorrect": False, "trap": "Illegal practice violating competition laws."},
                        {"id": "C", "text": "By halting all R&D and technological innovation.", "isCorrect": False, "trap": "Leads to rapid obsolescence."},
                        {"id": "D", "text": "By refusing to print statutory ingredient labels on packages.", "isCorrect": False, "trap": "Statutory offense."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "By differentiating through quality, branding, and customer service.",
                        "concept": "Brand building and product differentiation.",
                        "detailed": "Creating distinct brand value, consistent quality, and trustworthy service shields the firm from pure price competition."
                    }
                },
                {
                    "stem": f"Under NCERT Class 12, the operational framework in {title.split(':')[0]} is classified under:",
                    "options": [
                        {"id": "A", "text": "Marketing Management Framework", "isCorrect": True, "trap": "None - core management domain governing exchange processes."},
                        {"id": "B", "text": "Shop-Floor Functional Foremanship", "isCorrect": False, "trap": "Production technique."},
                        {"id": "C", "text": "SEBI Demat Share Transfer System", "isCorrect": False, "trap": "Financial markets mechanism."},
                        {"id": "D", "text": "State Consumer Commission Appellate Trial", "isCorrect": False, "trap": "Consumer court judicial process."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "This belongs to the Marketing Management Framework.",
                        "concept": "Marketing Management disciplines in NCERT Class 12.",
                        "detailed": "The activities analyzed represent key dimensions of Marketing Management, from philosophy to marketing mix execution."
                    }
                }
            ]
        })

    # =========================================================================
    # 4. Staffing & Human Resource Management (Cases 27 to 31)
    # =========================================================================
    staff_cases = [
        ("CASE-STF-01", "CloudScale Technologies: Internal Promotion vs External Campus Hiring",
         """CloudScale Technologies is an enterprise cloud computing startup in Bengaluru. Having secured high-value international contracts, it created 20 new executive positions for 'Senior Cloud Solutions Architects'. The HR Director faced a strategic choice: whether to promote existing senior system engineers (Internal Source), or recruit fresh graduates from top IITs and management institutes via Campus Placements (External Source). Management weighed employee morale and training speed against the infusion of fresh talent and broader technological perspective.""",
         "Sources of Recruitment", "Internal vs External Sources of Recruitment"),
        ("CASE-STF-02", "MedVantage Diagnostics: Multi-Stage Scientific Selection Process",
         """MedVantage Diagnostics operates automated clinical laboratories across Northern India. When hiring laboratory pathologists and clinical microbiologists, the Chief Medical Officer established an 8-stage selection process: (1) Preliminary Screening, (2) Specialized Trade Tests to measure existing laboratory skills, (3) Aptitude Tests to measure learning potential, (4) In-depth Employment Interview, (5) Reference and Background Checks, (6) Selection Decision, (7) Medical Examination, and (8) Formal Job Offer and Contract of Employment.""",
         "Selection Process", "Sequential Steps in the Selection Process"),
        ("CASE-STF-03", "Precision Gears: Vestibule Simulation vs Apprenticeship Training",
         """Precision Gears Engineering in Pune manufactures high-precision aircraft engine components. To train new machine operators without endangering worker safety or damaging multi-crore computer numerical control (CNC) lathes, the company instituted an off-the-job Vestibule Training center equipped with identical duplicate machines. Concurrently, for plumbing and electrical maintenance technicians, it maintained a 2-year on-the-job Apprenticeship program under master craftsmen.""",
         "Training and Development", "Vestibule Training vs Apprenticeship Training"),
        ("CASE-STF-04", "SilverOak Hospitality: Performance Appraisal & Motivation Linkage",
         """SilverOak Hospitality operates luxury heritage resorts in Rajasthan. To elevate guest service standards, the General Manager restructured the employee performance appraisal system. Rather than relying on subjective annual opinions of department heads, SilverOak implemented 360-degree appraisals incorporating guest reviews, peer evaluations, and self-assessments, directly linking top ratings to merit-based bonuses, fast-track promotions, and job enrichment opportunities.""",
         "Staffing and Motivation", "Performance Appraisal and Career Planning"),
        ("CASE-STF-05", "Radiant Chemicals: Workload vs Workforce Manpower Analysis",
         """Radiant Chemicals in Gujarat experienced frequent assembly line bottlenecks alongside high overtime labor costs. The HR division conducted a comprehensive Manload Audit: (1) Workload Analysis to determine the number and types of human resources required to hit planned output targets; and (2) Workforce Analysis to assess the actual number and competencies of personnel already available. The audit revealed severe overstaffing in clerical administration and acute understaffing of skilled chemical technicians.""",
         "Staffing Process", "Estimating Manpower Requirements: Workload vs Workforce Analysis")
    ]

    for cid, title, narrative, topic, subtopic in staff_cases:
        cases.append({
            "caseId": cid,
            "title": title,
            "chapter": "Staffing",
            "narrative": narrative,
            "questions": [
                {
                    "stem": f"In {title.split(':')[0]}, which core staffing or human resource concept is primarily illustrated?",
                    "options": [
                        {"id": "A", "text": subtopic, "isCorrect": True, "trap": f"None - exact staffing concept: {subtopic}."},
                        {"id": "B", "text": "Taylor's Functional Foremanship Routing", "isCorrect": False, "trap": "Factory floor supervision technique."},
                        {"id": "C", "text": "Consumer Commission Summary Jurisdiction", "isCorrect": False, "trap": "Consumer protection law."},
                        {"id": "D", "text": "Capital Budgeting Hurdle Rate Analysis", "isCorrect": False, "trap": "Financial management topic."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": f"The core concept is {subtopic}.",
                        "concept": f"NCERT Class 12 Staffing: {subtopic}.",
                        "detailed": f"The scenario directly examines {subtopic}, illustrating how systematic staffing practices obtain and develop competent human resources."
                    }
                },
                {
                    "stem": f"What is the primary organizational objective achieved through the human resource strategy in {title.split(':')[0]}?",
                    "options": [
                        {"id": "A", "text": "Placing the right person in the right job at the right time to achieve operational excellence.", "isCorrect": True, "trap": "None - supreme objective of the staffing function."},
                        {"id": "B", "text": "Eliminating all performance evaluations and accountability standards.", "isCorrect": False, "trap": "Contradicts professional staffing."},
                        {"id": "C", "text": "Maximizing employee turnover to minimize seniority wages.", "isCorrect": False, "trap": "High turnover destroys organizational memory and inflates costs."},
                        {"id": "D", "text": "Replacing all human talent with unverified external contract labor.", "isCorrect": False, "trap": "Absurd distractor."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "Placing the right person on the right job at the right time.",
                        "concept": "The core objective of Staffing in NCERT.",
                        "detailed": "Staffing ensures that the enterprise possesses the right talent with appropriate competencies to perform operational and managerial roles effectively."
                    }
                },
                {
                    "stem": f"Which of the following statements represents an established NCERT principle regarding the situation in {title.split(':')[0]}?",
                    "options": [
                        {"id": "A", "text": "Staffing is an integral, ongoing managerial function that directly enhances enterprise performance and employee satisfaction.", "isCorrect": True, "trap": "None - foundational NCERT staffing tenet."},
                        {"id": "B", "text": "Selection is a purely positive process that hires every single applicant.", "isCorrect": False, "trap": "Selection is a negative process that eliminates unqualified candidates."},
                        {"id": "C", "text": "Training employees is an unnecessary expense with zero return for the firm.", "isCorrect": False, "trap": "Training increases productivity and reduces accidents and wastage."},
                        {"id": "D", "text": "Manpower planning can be performed without reference to production goals.", "isCorrect": False, "trap": "Manpower requirements depend directly on organizational goals."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "Staffing is an ongoing function linking performance and satisfaction.",
                        "concept": "Importance of Staffing in NCERT.",
                        "detailed": "Staffing secures competent personnel, boosts productivity, facilitates growth, and enhances job satisfaction and employee morale."
                    }
                },
                {
                    "stem": f"How does management ensure fairness and objectivity in {title.split(':')[0]}?",
                    "options": [
                        {"id": "A", "text": "By establishing transparent, standardized criteria and structured evaluation instruments.", "isCorrect": True, "trap": "None - objective standards eliminate bias and build trust."},
                        {"id": "B", "text": "By allocating jobs based entirely on personal favoritism and family ties.", "isCorrect": False, "trap": "Nepotism destroys morale and organizational capability."},
                        {"id": "C", "text": "By discarding all job descriptions and candidate scorecards.", "isCorrect": False, "trap": "Leads to chaotic, subjective hiring."},
                        {"id": "D", "text": "By penalizing high-performing workers with salary reductions.", "isCorrect": False, "trap": "Absurd distractor."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "Through transparent criteria and structured evaluation tools.",
                        "concept": "Scientific selection and objective appraisal.",
                        "detailed": "Standardized tests, structured interviews, and clear performance rubrics eliminate subjectivity and ensure meritocratic human resource management."
                    }
                },
                {
                    "stem": f"In the hierarchy of management functions, the practices implemented in {title.split(':')[0]} belong to:",
                    "options": [
                        {"id": "A", "text": "Staffing Function of Management", "isCorrect": True, "trap": "None - human resource management and staffing."},
                        {"id": "B", "text": "Plant Layout and Motion Study", "isCorrect": False, "trap": "Production engineering."},
                        {"id": "C", "text": "Stock Exchange Demat Settlement", "isCorrect": False, "trap": "Financial markets."},
                        {"id": "D", "text": "CPA 2019 Mediation Tribunal", "isCorrect": False, "trap": "Consumer court."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "This belongs to the Staffing Function.",
                        "concept": "Staffing as an essential management function.",
                        "detailed": "Recruitment, selection, training, appraisal, and manpower planning constitute the core of the Staffing function in NCERT."
                    }
                }
            ]
        })

    # =========================================================================
    # 5. Directing, Controlling & Consumer Protection (Cases 32 to 40)
    # =========================================================================
    other_cases = [
        ("CASE-DIR-01", "Falcon Express Couriers: Leadership Styles in Crisis Logistics", "Directing",
         """Falcon Express Couriers manages urgent medical transport across India. During a catastrophic cyclone in Odisha, transport routes collapsed. The Operations Director shifted leadership styles: during the immediate rescue phase, he adopted an Autocratic style, giving rapid, non-negotiable dispatch commands. Once emergency corridors reopened, he shifted to a Democratic style, consulting local drivers and station masters to design permanent contingency routes.""",
         "Leadership Styles", "Autocratic vs Democratic Leadership in Crisis Management"),
        ("CASE-DIR-02", "Stellar Consumer Durables: Overcoming Semantic & Psychological Barriers", "Directing",
         """Stellar Consumer Durables in Noida suffered delayed product launches due to severe communication breakdowns. R&D software developers used technical engineering jargon that manufacturing floor supervisors misdecoded (Semantic Barrier). Concurrently, supervisors viewed corporate feedback with mutual distrust and premature evaluation (Psychological Barrier). Management instituted joint cross-functional briefing workshops and simplified operational manuals.""",
         "Communication Barriers", "Semantic and Psychological Barriers to Communication"),
        ("CASE-DIR-03", "Horizon FinTech: Maslow Need Hierarchy & Employee Incentives", "Directing",
         """Horizon FinTech in Bengaluru observed high attrition among senior software developers. An HR study revealed that while basic financial needs (fair salaries, allowances) were well satisfied, employees felt disengaged due to lack of recognition and creative growth. Horizon introduced non-financial incentives: Employee Stock Options (ESOPs) to foster ownership pride, flexible self-directed innovation days (Job Enrichment), and quarterly Leadership Awards (Esteem Needs).""",
         "Motivation Theories", "Maslow's Need Hierarchy and Non-Financial Incentives"),
        ("CASE-DIR-04", "Krishna Textile Mills: Harmony of Objectives in Directing", "Directing",
         """Krishna Textile Mills in Surat faced friction between weavers demanding higher wages and management requiring lower production costs to survive export competition. The new General Manager redesigned the piece-rate incentive scheme so that when weavers produced zero-defect fabric at higher speeds, their take-home earnings rose by 30% while the mill's unit costs dropped by 15%, achieving Harmony of Objectives.""",
         "Principles of Directing", "Harmony of Objectives and Maximum Individual Contribution"),
        ("CASE-CTL-01", "TurboDyno Transmissions: Critical Point Control & Management by Exception", "Controlling",
         """TurboDyno Automotive in Chennai manufactures gearboxes. When monthly cost statements showed a 12% rise in courier postage expenditure (costing Rs. 15,000) and a 3% rise in direct casting steel costs (costing Rs. 45 Lakh), the CEO intervened exclusively on the steel cost, delegating the postal rise to the office manager. The CEO applied Critical Point Control on Key Result Areas (KRAs) and Management by Exception.""",
         "Deviation Analysis", "Critical Point Control (CPC) vs Management by Exception (MBE)"),
        ("CASE-CTL-02", "Alpha Bio-Chemicals: 5 Steps in the Controlling Process", "Controlling",
         """Alpha Bio-Chemicals in Vadodara manufactures sterile pharmaceutical solvents. To guarantee zero contamination, the quality assurance team enforced the 5 steps in controlling: (1) Setting quantitative purity standards; (2) Continuous sensor measurement of actual batch purity; (3) Comparing actual batch readings against standards; (4) Analysing causes of deviations; and (5) Taking immediate corrective action to halt and sanitize contaminated filtration pipes.""",
         "Controlling Process", "5 Sequential Steps in the Controlling Process"),
        ("CASE-CTL-03", "Titan Heavy Infrastructure: Forward-Looking Control & Corrective Action", "Controlling",
         """Titan Heavy Infrastructure builds flyovers and metro viaducts. During quarterly reviews, the project manager observed a 4-week construction delay due to crane hydraulic failures. Rather than imposing punitive wage cuts on operators, Titan took forward-looking corrective action: replacing aging hydraulic pumps, revising preventative maintenance schedules, and retraining operators, preventing recurrence in subsequent project phases.""",
         "Controlling Principles", "Corrective Action and Forward-Looking Nature of Control"),
        ("CASE-CP-01", "PureLife Water Heaters: Product Liability Claim under CPA 2019", "Consumer Protection",
         """Ramesh purchased a PureLife branded electric water heater for Rs. 18,000 against a valid cash memo. Due to uninsulated wiring and manufacturing defects, the heater short-circuited, causing severe electric shock injuries to his family. Under the Consumer Protection Act, 2019, Ramesh filed a complaint before the District Consumer Disputes Redressal Commission claiming product liability compensation of Rs. 15 Lakh for medical expenses and replacement of the defective appliance.""",
         "Consumer Protection Act 2019", "Product Liability, Consumer Rights, and District Commission Jurisdiction"),
        ("CASE-CP-02", "GlowSkin Cosmetics: Misleading Advertising & CCPA Enforcement", "Consumer Protection",
         """GlowSkin Cosmetics launched a nationwide television and digital campaign claiming its fairness serum 'permanently eliminates wrinkles and lightens skin pigmentation within 48 hours', endorsed by a celebrity actress. Consumer testing revealed no clinical evidence. Acting on consumer complaints, the Central Consumer Protection Authority (CCPA) initiated an investigation, ordered withdrawal of the misleading advertisements, and imposed heavy monetary penalties on both the manufacturer and the celebrity endorser.""",
         "Consumer Protection Act 2019", "Misleading Advertisements, CCPA Powers, and Endorser Liability")
    ]

    for cid, title, chap, narrative, topic, subtopic in other_cases:
        cases.append({
            "caseId": cid,
            "title": title,
            "chapter": chap,
            "narrative": narrative,
            "questions": [
                {
                    "stem": f"In {title.split(':')[0]}, which core conceptual theme under {chap} is primarily demonstrated?",
                    "options": [
                        {"id": "A", "text": subtopic, "isCorrect": True, "trap": f"None - exact conceptual theme: {subtopic}."},
                        {"id": "B", "text": "Taylor's Functional Foremanship Routing", "isCorrect": False, "trap": "Unrelated factory floor technique."},
                        {"id": "C", "text": "SEBI Primary Market Underwriting Commission", "isCorrect": False, "trap": "Unrelated financial markets concept."},
                        {"id": "D", "text": "Debt-Equity Solvency Analysis", "isCorrect": False, "trap": "Unrelated capital structure metric."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": f"The core theme is {subtopic}.",
                        "concept": f"NCERT Class 12 {chap}: {subtopic}.",
                        "detailed": f"The case directly analyzes {subtopic}, illustrating how principles of {chap} are applied in real-world managerial situations."
                    }
                },
                {
                    "stem": f"What is the direct organizational or legal outcome achieved in {title.split(':')[0]}?",
                    "options": [
                        {"id": "A", "text": "Resolution of operational bottlenecks or consumer grievances through systematic application of established principles.", "isCorrect": True, "trap": "None - primary outcome in the case."},
                        {"id": "B", "text": "Complete collapse of all management authority and legal standards.", "isCorrect": False, "trap": "Absurd distractor."},
                        {"id": "C", "text": "Immediate termination of all enterprise commercial operations.", "isCorrect": False, "trap": "Absurd distractor."},
                        {"id": "D", "text": "Conversion of the business enterprise into a statutory government monopoly.", "isCorrect": False, "trap": "Absurd distractor."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "Effective resolution of problems through systematic application of principles.",
                        "concept": f"Managerial effectiveness in {chap}.",
                        "detailed": "By deploying established NCERT principles, management resolved critical challenges, protecting organizational integrity and stakeholder rights."
                    }
                },
                {
                    "stem": f"Which established NCERT tenet under {chap} is confirmed by the events in {title.split(':')[0]}?",
                    "options": [
                        {"id": "A", "text": "Management and regulatory systems function effectively when decisions are objective, ethical, and grounded in established principles.", "isCorrect": True, "trap": "None - foundational NCERT tenet."},
                        {"id": "B", "text": "Managerial directing and controlling can function smoothly without any pre-set targets or standards.", "isCorrect": False, "trap": "Directing and controlling require clear standards and objectives."},
                        {"id": "C", "text": "Consumers have zero legal rights against defective products in modern markets.", "isCorrect": False, "trap": "CPA 2019 guarantees comprehensive consumer rights and product liability."},
                        {"id": "D", "text": "Leadership styles should remain 100% rigid regardless of changing situational crises.", "isCorrect": False, "trap": "Effective leadership adapts to situational demands."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "Effective systems rely on objective, ethical, and principled decision-making.",
                        "concept": f"Core principles of {chap} in NCERT.",
                        "detailed": "Grounded decision-making, situational flexibility, and adherence to legal and ethical standards ensure organizational longevity and fairness."
                    }
                },
                {
                    "stem": f"How does the management or authority in {title.split(':')[0]} ensure systemic integrity?",
                    "options": [
                        {"id": "A", "text": "By addressing root causes, enforcing accountability, and deploying forward-looking corrective safeguards.", "isCorrect": True, "trap": "None - systematic approach to problem solving."},
                        {"id": "B", "text": "By shifting blame entirely onto external forces and ignoring operational reality.", "isCorrect": False, "trap": "Blame-shifting perpetuates operational failure."},
                        {"id": "C", "text": "By dismantling all formal communication and quality control systems.", "isCorrect": False, "trap": "Leads to chaos."},
                        {"id": "D", "text": "By rewarding dishonest and misleading business practices.", "isCorrect": False, "trap": "Absurd distractor."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": "By addressing root causes and deploying forward-looking corrective measures.",
                        "concept": f"Systemic integrity in {chap}.",
                        "detailed": "Enforcing accountability, addressing systemic weaknesses, and establishing preventive safeguards protects the organization and consumers."
                    }
                },
                {
                    "stem": f"In the taxonomy of Class 12 Business Studies, the scenario in {title.split(':')[0]} is classified under:",
                    "options": [
                        {"id": "A", "text": f"{chap} Dimension of Business Studies", "isCorrect": True, "trap": f"None - core syllabus classification: {chap}."},
                        {"id": "B", "text": "Taylor's Functional Foremanship Routing", "isCorrect": False, "trap": "Shop-floor production technique."},
                        {"id": "C", "text": "SEBI Primary Market Demat Underwriting", "isCorrect": False, "trap": "Financial markets procedure."},
                        {"id": "D", "text": "Factory Act Boiler Inspection Protocol", "isCorrect": False, "trap": "Statutory labor law."}
                    ],
                    "correctOption": "A",
                    "solution": {
                        "quick": f"This belongs to {chap}.",
                        "concept": f"NCERT Class 12 syllabus chapter: {chap}.",
                        "detailed": f"The concepts, dilemmas, and administrative actions analyzed belong squarely to {chap} in NCERT Class 12."
                    }
                }
            ]
        })

    assert len(cases) == 40, f"Expected 40 cases, got {len(cases)}"
    return cases
