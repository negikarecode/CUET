import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.bst_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text,
    get_pyq_normalized_set
)

CHAPTER = "Financial Management"
questions = []
seen = set()
pyq_seen = get_pyq_normalized_set()

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:80]}")
    if norm in pyq_seen:
        raise ValueError(f"Matches PYQ: {q['questionText'][:80]}")
    seen.add(norm)
    questions.append(q)

print("Generating 60 unique questions for Unit 9: Financial Management...")

# =================================================================================================
# 1. Concept, Role & Objective of Financial Management (Q1 - Q10)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Maximization of shareholders' wealth (maximizing the market price of equity shares)",
    [
        "Maximizing total physical output volume regardless of profitability",
        "Abolishing all debt obligations and paying zero corporate income taxes",
        "Hoarding massive liquid cash reserves in bank vaults without investing"
    ],
    "A",
    "1. The primary objective of financial management is to maximize shareholders' wealth, which is reflected in the market value or price of the company's equity shares.\nHence, Option {{CORR}} is correct.",
    "Defines primary objective of Financial Management as wealth maximization."
)
add_q(make_question(CHAPTER, "Objective of Financial Management", "What is the primary overarching objective of Financial Management?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Procurement of funds at optimum cost and their effective utilization in productive assets",
    [
        "Borrowing unlimited funds at the highest available interest rates",
        "Distributing 100% of corporate revenues to employees as daily bonuses",
        "Keeping all company capital invested exclusively in physical gold bars"
    ],
    "B",
    "1. Financial management is concerned with optimal procurement as well as the most effective and profitable utilization of finance in business.\nHence, Option {{CORR}} is correct.",
    "Highlights optimal procurement and utilization of funds."
)
add_q(make_question(CHAPTER, "Concept of Financial Management", "Financial management is fundamentally concerned with which operational process?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Size and composition of fixed assets and quantum of current assets",
    [
        "The artistic aesthetic design of company product logos",
        "The chemical molecular formula of manufactured consumer cosmetics",
        "The linguistic dialect spoken by regional sales representatives"
    ],
    "C",
    "1. Financial management directly impacts the size and composition of fixed assets, the quantum of working capital, debt-equity ratio, and profitability of the enterprise.\nHence, Option {{CORR}} is correct.",
    "Lists key balance sheet areas impacted by financial management."
)
add_q(make_question(CHAPTER, "Role of Financial Management", "Which of the following corporate financial dimensions is directly determined by financial management decisions?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Market price of equity shares",
    [
        "Total book value of physical factory land",
        "Face value of preference debentures",
        "Gross physical volume of inventory stock"
    ],
    "D",
    "1. Shareholders' wealth maximization is achieved when the market price of the company's equity shares increases over the long term.\nHence, Option {{CORR}} is correct.",
    "Identifies market price of equity shares as the metric for wealth."
)
add_q(make_question(CHAPTER, "Objective of Financial Management", "Shareholders' wealth is directly measured by which financial market indicator?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "To ensure availability of funds whenever required and to ensure the firm does not raise resources unnecessarily",
    [
        "To eliminate the requirement for drawing annual financial statements",
        "To borrow maximum loans regardless of corporate paying capacity",
        "To replace equity capital entirely with government subsidies"
    ],
    "A",
    "1. The twin objectives of financial planning are: (1) to ensure availability of adequate funds whenever required, and (2) to see that the firm does not raise resources unnecessarily (avoiding idle finance).\nHence, Option {{CORR}} is correct.",
    "Lists twin objectives of financial planning."
)
add_q(make_question(CHAPTER, "Financial Planning", "What are the twin primary objectives of 'Financial Planning'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Idle funds generate zero returns but add to the cost of capital, hurting profitability",
    [
        "Banks legally confiscate surplus liquid cash balances overnight",
        "Idle funds cause physical mechanical wear to factory assembly equipment",
        "Having excess cash attracts criminal prosecution by company registrars"
    ],
    "B",
    "1. Excess or idle funds carry an opportunity cost and interest burden without generating revenue, reducing Return on Investment and eroding shareholder wealth.\nHence, Option {{CORR}} is correct.",
    "Explains why raising unnecessary resources must be avoided."
)
add_q(make_question(CHAPTER, "Financial Planning", "Why does financial planning explicitly seek to prevent a firm from raising resources unnecessarily?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Financial Planning",
    [
        "Marketing Planning",
        "Production Budgeting",
        "Preliminary Screening"
    ],
    "C",
    "1. Financial planning is the preparation of a financial blueprint of an organization's future operations to estimate fund requirements and their sources.\nHence, Option {{CORR}} is correct.",
    "Defines Financial Planning as a financial blueprint."
)
add_q(make_question(CHAPTER, "Financial Planning", "The process of estimating the fund requirements of a business and determining the sources of financing is termed:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Capital Budgeting Decision",
    [
        "Working Capital Decision",
        "Financing Decision",
        "Dividend Decision"
    ],
    "D",
    "1. A long-term investment decision involving substantial capital expenditure in fixed assets (machinery, new plant) is called a Capital Budgeting Decision.\nHence, Option {{CORR}} is correct.",
    "Defines Capital Budgeting Decision."
)
add_q(make_question(CHAPTER, "Investment Decision", "A major long-term investment decision involving substantial financial outlays in fixed assets is known as a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "They are irreversible except at huge financial losses and have long-term profitability consequences",
    [
        "They can be completely undone daily without any financial cost",
        "They deal exclusively with purchasing office stationery supplies",
        "They are governed by unwritten folklore rather than financial analysis"
    ],
    "A",
    "1. Capital budgeting decisions are irreversible except at huge financial sacrifice, commit large funds for the long term, and determine the future earning capacity of the firm.\nHence, Option {{CORR}} is correct.",
    "Highlights irreversibility and significance of capital budgeting."
)
add_q(make_question(CHAPTER, "Investment Decision", "Why must Capital Budgeting decisions be evaluated with extreme diligence and rigor by financial managers?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Working Capital Decision",
    [
        "Capital Budgeting Decision",
        "Financing Decision",
        "Dividend Decision"
    ],
    "B",
    "1. Short-term investment decisions are concerned with the levels of cash, inventories, and receivables, known as Working Capital decisions.\nHence, Option {{CORR}} is correct.",
    "Defines Working Capital Decision."
)
add_q(make_question(CHAPTER, "Investment Decision", "A short-term investment decision concerning the optimum management of cash, inventories, and debtors is a:", opts, corr, sol))

# =================================================================================================
# 2. Three Financial Decisions (Investment, Financing, Dividend) (Q11 - Q24)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Cash flows of the project, Rate of return, and Investment criteria involved",
    [
        "Personal astrological horoscopes of senior company board directors",
        "The number of manual trade unions affiliated with political parties",
        "The physical weight of the corporate annual report publications"
    ],
    "C",
    "1. The three key factors affecting capital budgeting decisions are: Cash flows of the project, Rate of return (ROI/IRR), and Investment criteria (calculations involving interest, payback period, NPV).\nHence, Option {{CORR}} is correct.",
    "Lists factors affecting capital budgeting decision."
)
add_q(make_question(CHAPTER, "Investment Decision", "Which set of factors crucially governs a 'Capital Budgeting Decision'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Project B should be chosen because it offers a higher expected rate of return for identical risk",
    [
        "Project A should be chosen because lower return guarantees corporate safety",
        "Both projects must be rejected immediately to conserve liquid bank cash",
        "Management should flip a coin because rates of return are irrelevant"
    ],
    "D",
    "1. Between two projects with the same level of risk, the project offering the higher rate of return (Project B with 18% vs Project A with 12%) must be selected.\nHence, Option {{CORR}} is correct.",
    "Applies rate of return criterion to project selection."
)
add_q(make_question(CHAPTER, "Investment Decision", "If Project A offers an expected return of 12% and Project B offers 18% with identical risk profiles, which project should be selected?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Deciding the proportion of debt and equity capital to raise from long-term financial sources",
    [
        "Deciding which foreign software engineers to recruit on campus",
        "Deciding the retail selling price of consumer packaged snacks",
        "Deciding the physical architectural layout of branch offices"
    ],
    "A",
    "1. A Financing Decision is concerned with deciding how much funds to raise from which sources, establishing the optimum mix of debt and equity.\nHence, Option {{CORR}} is correct.",
    "Defines Financing Decision."
)
add_q(make_question(CHAPTER, "Financing Decision", "What is the primary focus of a managerial 'Financing Decision'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Cost, Financial Risk, Floatation Costs, Cash Flow Position, and Fixed Operating Costs",
    [
        "Employee trade union strikes, Newspaper print quality, Legal bylaws",
        "Warehouse square footage, Factory roof ventilation, Paint color",
        "Customer dietary preferences, Local festival holidays, Postal rates"
    ],
    "B",
    "1. Factors affecting financing decisions include Cost of funds, Financial risk of debt, Floatation costs, Cash flow position, Fixed operating costs, Control, and State of capital market.\nHence, Option {{CORR}} is correct.",
    "Lists factors affecting financing decision."
)
add_q(make_question(CHAPTER, "Financing Decision", "Which group of factors crucially determines the 'Financing Decision'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Expenses incurred on issuing securities such as underwriting commissions, brokerage, and prospectus printing",
    [
        "The cost of transporting physical manufacturing machinery on cargo ships",
        "The daily travel allowance reimbursed to traveling sales personnel",
        "The statutory income tax paid to the Central Board of Direct Taxes"
    ],
    "C",
    "1. Floatation costs refer to the direct costs incurred in raising funds through issue of securities (brokerage, underwriting commission, prospectus advertisement).\nHence, Option {{CORR}} is correct.",
    "Defines Floatation Costs."
)
add_q(make_question(CHAPTER, "Financing Decision", "What are 'Floatation Costs' in the context of corporate fund-raising?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Debt is cheaper because interest is a tax-deductible expense, but debt increases financial risk",
    [
        "Debt is costlier than equity because lenders demand 100% of profits",
        "Debt carries zero financial risk because lenders can never sue the firm",
        "Debt and equity have exactly identical cost and zero tax impact"
    ],
    "D",
    "1. Debt is a cheaper source of finance because interest is tax-deductible. However, debt increases financial risk due to mandatory legal obligations to pay interest and repay principal.\nHence, Option {{CORR}} is correct.",
    "Contrasts debt and equity in terms of cost and risk."
)
add_q(make_question(CHAPTER, "Financing Decision", "How do Debt and Equity compare regarding 'Cost' and 'Financial Risk'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The firm should rely more on equity to avoid compounding financial risk with high fixed operating risk",
    [
        "The firm must borrow 100% debt to force itself into legal receivership",
        "The firm should stop manufacturing goods and liquidate all factories",
        "The firm should convert into an unlisted partnership firm"
    ],
    "A",
    "1. If a business has high fixed operating costs (building rent, insurance, salaries), it should use less debt to keep financial risk low; otherwise, total business risk becomes dangerous.\nHence, Option {{CORR}} is correct.",
    "Explains financing choice under high fixed operating costs."
)
add_q(make_question(CHAPTER, "Financing Decision", "If a company already has exceptionally high fixed operating costs (building rent, permanent salaries), what financing mix is prudent?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Deciding how much of the net profit after tax should be distributed to shareholders and how much retained in business",
    [
        "Deciding which factory machines should be scrapped and sold to junkyards",
        "Deciding how many commercial advertisements to broadcast on national television",
        "Deciding whether to promote junior factory supervisors to plant heads"
    ],
    "B",
    "1. Dividend Decision determines what portion of earnings after tax should be distributed to equity shareholders as dividend and what portion retained for reinvestment.\nHence, Option {{CORR}} is correct.",
    "Defines Dividend Decision."
)
add_q(make_question(CHAPTER, "Dividend Decision", "What is the core issue resolved under the 'Dividend Decision'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Amount of earnings, Stability of earnings, Growth opportunities, and Cash flow position",
    [
        "Factory chimney smoke levels, Warehouse location, Truck maintenance",
        "Customer dispute hearings, Brand name logo design, Office furniture",
        "Trade union voting procedures, Factory water supply connections"
    ],
    "C",
    "1. Major factors affecting dividend decisions include: Amount of earnings, Stability of earnings/dividends, Growth opportunities, Cash flow position, Shareholders' preferences, and Taxation.\nHence, Option {{CORR}} is correct.",
    "Lists key determinants of dividend decision."
)
add_q(make_question(CHAPTER, "Dividend Decision", "Which set of factors crucially affects the 'Dividend Decision' of a corporation?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Retain a larger portion of earnings and declare lower dividends to finance capital expansion",
    [
        "Distribute 100% of profits as dividends and abandon all expansion plans",
        "Borrow predatory short-term loans to pay astronomical cash dividends",
        "Liquidate corporate assets to pay quarterly liquidating dividends"
    ],
    "D",
    "1. If a company has lucrative growth opportunities, it requires substantial capital for reinvestment; hence, it retains more earnings and declares lower dividends.\nHence, Option {{CORR}} is correct.",
    "Relates growth opportunities to dividend payout."
)
add_q(make_question(CHAPTER, "Dividend Decision", "If a corporation has lucrative growth and expansion opportunities requiring substantial capital investment, it should generally:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A company must possess sufficient liquid cash to actually pay out dividends, even if accounting profits are high",
    [
        "Dividends can only be paid by borrowing foreign currency notes",
        "Cash flow position only affects marketing advertising campaigns",
        "A company with zero cash can legally pay dividends using IOUs"
    ],
    "A",
    "1. Payment of dividends involves an outflow of cash. Even if a firm reports high net accounting profits, it cannot pay dividends without an adequate cash flow position.\nHence, Option {{CORR}} is correct.",
    "Explains role of cash flow position in paying dividends."
)
add_q(make_question(CHAPTER, "Dividend Decision", "Why is a company's 'Cash Flow Position' a critical prerequisite when declaring dividends?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Firms with stable, predictable earnings can declare higher dividends than firms with erratic earnings",
    [
        "Firms with volatile erratic profits always declare the highest dividends",
        "Earnings stability has zero correlation with dividend policy",
        "Firms with stable earnings are legally prohibited from paying dividends"
    ],
    "B",
    "1. A company with stable, predictable earnings is in a confident position to declare higher and consistent dividends compared to a firm with cyclical, erratic earnings.\nHence, Option {{CORR}} is correct.",
    "Relates stability of earnings to dividend payouts."
)
add_q(make_question(CHAPTER, "Dividend Decision", "How does 'Stability of Earnings' influence the dividend policy of a corporation?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A rise in dividend payout is typically interpreted by markets as good news, boosting share price",
    [
        "Declaring higher dividends causes stock markets to crash permanently",
        "Stock markets react only to foreign currency exchange rates",
        "Investors always dump shares of companies that announce dividends"
    ],
    "C",
    "1. An increase in dividends sends a positive signal to capital markets that the company has strong cash earnings, positively impacting its equity share price.\nHence, Option {{CORR}} is correct.",
    "Explains stock market reaction to dividend announcements."
)
add_q(make_question(CHAPTER, "Dividend Decision", "How does 'Stock Market Reaction' relate to a company's dividend decision?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The loan agreement may contain restrictive covenants limiting the maximum dividend a firm can declare",
    [
        "Banks force borrowing firms to distribute 100% of profits to shareholders",
        "Contractual terms prohibit firms from holding any retained earnings",
        "Debt covenants require firms to issue bonus shares every Monday"
    ],
    "D",
    "1. When a company takes long-term loans from financial institutions, the lender often includes contractual clauses restricting the payment of dividends to protect debt service.\nHence, Option {{CORR}} is correct.",
    "Explains contractual constraints on dividend declaration."
)
add_q(make_question(CHAPTER, "Dividend Decision", "How do 'Contractual Constraints' imposed by commercial lenders affect dividend decisions?", opts, corr, sol))

# =================================================================================================
# 3. Capital Structure, Trading on Equity, Financial Leverage (Q25 - Q36)
# =================================================================================================

opts, corr, sol = rotate_options(
    "The proportion of debt and equity used for financing the operations of a business",
    [
        "The physical architecture of corporate headquarters and branch offices",
        "The ratio of male to female employees on the assembly line",
        "The numerical tally of total raw materials stored in factory warehouses"
    ],
    "A",
    "1. Capital structure refers to the mix between owners' funds (equity) and borrowed funds (debt) in the long-term capital of a business enterprise.\nHence, Option {{CORR}} is correct.",
    "Defines Capital Structure."
)
add_q(make_question(CHAPTER, "Capital Structure", "Which of the following defines 'Capital Structure' in financial management?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Trading on Equity / Financial Leverage",
    [
        "Capital Budgeting",
        "Vestibule Training",
        "Job Enrichment"
    ],
    "B",
    "1. Trading on Equity refers to the practice of using cheaper fixed-cost debt securities to increase the Return on Equity (ROE) and Earnings Per Share (EPS) for shareholders.\nHence, Option {{CORR}} is correct.",
    "Defines Trading on Equity."
)
add_q(make_question(CHAPTER, "Trading on Equity", "Using fixed-cost debt in capital structure to increase Earnings Per Share (EPS) for equity shareholders is called:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Return on Investment (ROI) is greater than the Cost of Debt (Interest Rate)",
    [
        "Return on Investment (ROI) is less than the Cost of Debt",
        "Cost of Debt is higher than corporate income tax rates",
        "The company has zero equity and 100% short-term bank overdrafts"
    ],
    "C",
    "1. Trading on Equity is favorable and enhances EPS ONLY when Return on Investment (ROI) is higher than the Cost of Debt (Interest rate).\nHence, Option {{CORR}} is correct.",
    "States condition for favorable Trading on Equity."
)
add_q(make_question(CHAPTER, "Trading on Equity", "Under which specific financial condition does 'Trading on Equity' successfully increase Earnings Per Share (EPS)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Earnings Per Share (EPS) drops and financial risk escalates sharply (Unfavorable Leverage)",
    [
        "Earnings Per Share increases exponentially to record highs",
        "Corporate income tax liability drops to zero permanently",
        "The market price of equity shares doubles instantaneously"
    ],
    "D",
    "1. When ROI is less than the Cost of Debt, the fixed interest burden eats into shareholder profits, depressing EPS and increasing default risk (Unfavorable financial leverage).\nHence, Option {{CORR}} is correct.",
    "Explains outcome of unfavorable financial leverage."
)
add_q(make_question(CHAPTER, "Trading on Equity", "What happens to Earnings Per Share (EPS) if a company employs high debt when its Return on Investment (ROI) is lower than the interest rate on debt?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "EBIT / Interest",
    [
        "Net Profit / Total Assets",
        "Sales Revenue / Working Capital",
        "Current Assets / Current Liabilities"
    ],
    "A",
    "1. Interest Coverage Ratio (ICR) measures the number of times earnings before interest and taxes (EBIT) covers the interest obligation: ICR = EBIT / Interest.\nHence, Option {{CORR}} is correct.",
    "States formula for Interest Coverage Ratio."
)
add_q(make_question(CHAPTER, "Capital Structure Factors", "What is the mathematical formula for calculating the 'Interest Coverage Ratio' (ICR)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A higher ICR indicates lower risk of default on interest, allowing the firm to employ more debt",
    [
        "A higher ICR means the company is on the verge of bankruptcy",
        "A higher ICR forces the company to eliminate all borrowed capital",
        "ICR has zero relevance to debt-raising capacity"
    ],
    "B",
    "1. A higher ICR signifies that the firm has abundant operational earnings to service its interest payments comfortably, lowering default risk and permitting higher debt usage.\nHence, Option {{CORR}} is correct.",
    "Explains significance of high ICR."
)
add_q(make_question(CHAPTER, "Capital Structure Factors", "What does a high 'Interest Coverage Ratio' indicate regarding a firm's debt capacity?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Debt Service Coverage Ratio (DSCR)",
    [
        "Interest Coverage Ratio (ICR)",
        "Current Ratio",
        "Inventory Turnover Ratio"
    ],
    "C",
    "1. Debt Service Coverage Ratio (DSCR) is a comprehensive metric that evaluates cash flow availability against both interest obligations and mandatory principal repayments.\nHence, Option {{CORR}} is correct.",
    "Identifies DSCR as comprehensive debt service measure."
)
add_q(make_question(CHAPTER, "Capital Structure Factors", "Which financial ratio provides a more comprehensive assessment of debt servicing ability by factoring in both interest and principal repayment obligations?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A higher corporate tax rate makes debt more attractive because interest is a tax-deductible expense",
    [
        "A higher tax rate makes equity cheaper than debt",
        "A higher tax rate forces firms to eliminate all borrowed capital",
        "Taxes have zero impact on the effective cost of debt capital"
    ],
    "D",
    "1. Since interest paid on debt is a tax-deductible expense, higher corporate tax rates reduce the effective after-tax cost of debt, making debt financing more attractive.\nHence, Option {{CORR}} is correct.",
    "Relates high tax rate to attractiveness of debt."
)
add_q(make_question(CHAPTER, "Capital Structure Factors", "How does a high 'Corporate Tax Rate' impact the choice between Debt and Equity in capital structure?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Issue debt securities or preference shares to prevent dilution of voting control",
    [
        "Issue massive new equity shares to foreign corporate raiders",
        "Liquidate the enterprise and distribute cash reserves",
        "Surrender all management authority to commercial bank lenders"
    ],
    "A",
    "1. When existing management wishes to retain control without diluting voting power among new shareholders, it prefers raising capital through debt rather than new equity.\nHence, Option {{CORR}} is correct.",
    "Relates control consideration to issuing debt."
)
add_q(make_question(CHAPTER, "Capital Structure Factors", "If existing management is determined to retain absolute voting control over the enterprise, which source of finance will it prefer?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A firm with high, stable operating cash flows can service fixed debt commitments comfortably",
    [
        "Cash flows are irrelevant as long as accounting depreciation is charged",
        "Firms with unstable cash flows should borrow 100% debt",
        "Operating cash flows can never be used to pay interest expenses"
    ],
    "B",
    "1. A strong and stable cash flow position allows a firm to service interest and principal payments reliably, enabling it to employ a higher proportion of debt in its capital structure.\nHence, Option {{CORR}} is correct.",
    "Relates cash flow position to debt capacity."
)
add_q(make_question(CHAPTER, "Capital Structure Factors", "Why is a robust 'Cash Flow Position' essential before a company increases its debt proportion?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Total risk consists of Financial Risk (from debt interest obligations) and Business Risk (from fixed operating costs)",
    [
        "Total risk consists solely of statutory penalties levied by environmental inspectors",
        "Total risk is entirely eliminated whenever corporate equity shares are issued",
        "Financial risk has zero correlation with borrowed capital obligations"
    ],
    "C",
    "1. Total corporate risk comprises Business Risk (fixed operating expenses) and Financial Risk (mandatory interest and principal debt payments).\nHence, Option {{CORR}} is correct.",
    "Defines components of total corporate risk."
)
add_q(make_question(CHAPTER, "Capital Structure Factors", "In corporate financial management, what constitutes 'Total Risk'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "During a bull market, equity shares can be easily floated at premium prices; in a bear market, debt is preferred",
    [
        "During a bull market, no company is permitted to issue equity shares",
        "During a bear market, investors eagerly oversubscribe to speculative equity IPOs",
        "Stock market conditions have zero bearing on corporate capital floatation"
    ],
    "D",
    "1. In a bullish stock market, investors are optimistic and equity shares sell easily even at high prices. In a depressed bearish market, firms find debt or debentures easier to float.\nHence, Option {{CORR}} is correct.",
    "Explains impact of stock market conditions on capital structure."
)
add_q(make_question(CHAPTER, "Capital Structure Factors", "How do prevailing 'Stock Market Conditions' influence a company's choice of financing instruments?", opts, corr, sol))

# =================================================================================================
# 4. Fixed and Working Capital (Q37 - Q44)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Capital invested in long-term fixed assets such as land, buildings, plant, and machinery",
    [
        "Cash used for paying weekly wages and telephone bills",
        "Short-term commercial bank loans repayable in three days",
        "The petty cash balance kept inside the front desk drawer"
    ],
    "A",
    "1. Fixed capital refers to the funds invested in long-term fixed assets (land, buildings, plant, machinery) that remain in business for more than one year.\nHence, Option {{CORR}} is correct.",
    "Defines Fixed Capital."
)
add_q(make_question(CHAPTER, "Fixed Capital", "What does 'Fixed Capital' specifically refer to in financial management?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A heavy manufacturing engineering plant requires vastly more fixed capital than a trading retail store",
    [
        "A trading store requires more fixed capital than an automobile assembly factory",
        "Both manufacturing and trading enterprises require identical zero fixed capital",
        "Service businesses require 100 times more fixed capital than steel rolling mills"
    ],
    "B",
    "1. A manufacturing enterprise requires heavy investment in industrial machinery and physical plant, demanding vastly larger fixed capital than a trading business.\nHence, Option {{CORR}} is correct.",
    "Contrasts fixed capital for manufacturing vs trading."
)
add_q(make_question(CHAPTER, "Fixed Capital Factors", "How does the 'Nature of Business' influence Fixed Capital requirements?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Acquiring assets on lease reduces initial fixed capital requirement since outright purchase is avoided",
    [
        "Leasing assets multiplies initial capital expenditure by ten times",
        "Leasing forces the firm into instant corporate liquidation",
        "Leasing is legally prohibited for industrial equipment in India"
    ],
    "C",
    "1. Leasing provides an alternative to outright purchase, allowing an enterprise to use modern equipment without huge upfront capital expenditure, lowering fixed capital requirements.\nHence, Option {{CORR}} is correct.",
    "Explains impact of leasing on fixed capital."
)
add_q(make_question(CHAPTER, "Fixed Capital Factors", "How does the availability of 'Leasing Facilities' affect a firm's fixed capital requirement?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Gross Working Capital is total current assets; Net Working Capital is Current Assets minus Current Liabilities",
    [
        "Gross Working Capital is fixed assets; Net Working Capital is shareholder equity",
        "Gross Working Capital is bank debt; Net Working Capital is corporate tax",
        "Both terms are synonymous and represent identical financial balances"
    ],
    "D",
    "1. Gross Working Capital refers to the total investment in all current assets. Net Working Capital is the excess of current assets over current liabilities (CA - CL).\nHence, Option {{CORR}} is correct.",
    "Contrasts Gross and Net Working Capital."
)
add_q(make_question(CHAPTER, "Working Capital", "What is the distinction between 'Gross Working Capital' and 'Net Working Capital'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Longer production cycles tie up funds in work-in-progress for a longer duration, requiring more working capital",
    [
        "Longer production cycles reduce working capital requirements to zero",
        "Production cycle length has zero influence on working capital funds",
        "Short production cycles require massive bank borrowings to sustain inventory"
    ],
    "A",
    "1. Production cycle is the time span between raw material procurement and finished product output. A longer cycle locks capital in work-in-progress, demanding higher working capital.\nHence, Option {{CORR}} is correct.",
    "Relates production cycle length to working capital."
)
add_q(make_question(CHAPTER, "Working Capital Factors", "How does the length of the 'Production Cycle' influence a firm's Working Capital requirement?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A liberal credit policy increases book debts (receivables), necessitating larger working capital",
    [
        "Liberal credit policy eliminates all working capital requirements",
        "Liberal credit policy forces customers to pay cash upfront immediately",
        "Credit terms granted to customers have zero impact on corporate liquidity"
    ],
    "B",
    "1. Granting liberal credit terms to customers ties up large financial funds in sundry debtors/receivables, significantly increasing working capital requirements.\nHence, Option {{CORR}} is correct.",
    "Relates credit allowed to working capital."
)
add_q(make_question(CHAPTER, "Working Capital Factors", "If a firm adopts a highly 'Liberal Credit Policy' for its customers, what is the impact on its Working Capital?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The firm requires less working capital because purchases are financed by suppliers",
    [
        "The firm requires vastly more working capital to repay suppliers in 5 minutes",
        "The firm is legally banned from maintaining any current assets",
        "Credit availed has zero correlation with working capital management"
    ],
    "C",
    "1. When a firm enjoys liberal credit terms from its raw material suppliers (credit availed), it can finance inventories easily without needing large working capital.\nHence, Option {{CORR}} is correct.",
    "Relates credit availed to working capital."
)
add_q(make_question(CHAPTER, "Working Capital Factors", "When a manufacturing firm is granted generous, long-term credit by its suppliers (Credit Availed):", opts, corr, sol))

opts, corr, sol = rotate_options(
    "During economic boom, sales and production expand, requiring larger working capital to finance higher inventory and receivables",
    [
        "During a boom, working capital requirements fall to zero",
        "During a recession, firms require the highest working capital in corporate history",
        "Macroeconomic business cycles have zero impact on corporate working capital"
    ],
    "D",
    "1. During a boom, flourishing business conditions trigger higher sales and production, necessitating larger inventories and debtors, which elevates working capital needs.\nHence, Option {{CORR}} is correct.",
    "Relates economic boom to higher working capital."
)
add_q(make_question(CHAPTER, "Working Capital Factors", "How does an 'Economic Boom' in the business cycle affect corporate Working Capital requirements?", opts, corr, sol))

# =================================================================================================
# 5. Statement I & Statement II Questions (Q45 - Q52)
# =================================================================================================

add_q(make_statement_question(
    CHAPTER, "Objective of Financial Management",
    "The primary objective of financial management is wealth maximization for equity shareholders.",
    "Shareholders' wealth is maximized when the market price of the company's equity shares increases.",
    "A",
    "1. Statement I is true: Maximizing shareholder wealth is the supreme objective.\n2. Statement II is true: Shareholder wealth is directly reflected in the market valuation of shares.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Trading on Equity",
    "Trading on Equity is favorable when Return on Investment (ROI) is lower than the Cost of Debt.",
    "Trading on Equity increases Earnings Per Share (EPS) by utilizing cheaper fixed-cost debt capital.",
    "D",
    "1. Statement I is false: Trading on Equity is favorable when ROI is higher than Cost of Debt, not lower.\n2. Statement II is true: It leverages cheaper debt to expand EPS.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Financial Decisions",
    "Capital budgeting decisions involve long-term investment commitments that are largely irreversible except at huge costs.",
    "Financing decisions are concerned exclusively with setting retail prices for consumer goods in supermarkets.",
    "C",
    "1. Statement I is true: Capital budgeting commits large funds irreversibly.\n2. Statement II is false: Financing decision is about raising funds (debt vs equity mix), not product pricing.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Cost of Debt and Tax",
    "Interest paid on debt is a tax-deductible corporate expense in calculating taxable income.",
    "A higher corporate tax rate increases the effective cost of debt financing relative to equity.",
    "C",
    "1. Statement I is true: Interest is tax-deductible, creating a valuable tax shield.\n2. Statement II is false: High tax rates reduce the effective cost of debt (making debt cheaper, not costlier).\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Working Capital",
    "Gross Working Capital refers to the excess of current assets over current liabilities.",
    "Net Working Capital refers to total investment in current assets.",
    "B",
    "1. Statement I is false: Gross Working Capital is total current assets, not CA - CL.\n2. Statement II is false: Net Working Capital is CA - CL, not total current assets.\nBoth statements are false.\nHence, Option B is correct."
))

add_q(make_statement_question(
    CHAPTER, "Dividend Decision",
    "Companies with abundant growth and expansion opportunities generally pay higher cash dividends.",
    "A company can comfortably pay high cash dividends even if its cash flow position is severely strained.",
    "B",
    "1. Statement I is false: High growth firms retain profits to finance projects, paying lower dividends.\n2. Statement II is false: Dividends require liquid cash; poor cash flow prevents dividend distribution regardless of accounting profits.\nBoth statements are false.\nHence, Option B is correct."
))

add_q(make_statement_question(
    CHAPTER, "Financial Planning",
    "Financial planning seeks to ensure that adequate funds are available whenever needed by the business.",
    "Financial planning encourages firms to raise excessive idle funds to keep bank accounts full.",
    "C",
    "1. Statement I is true: Ensuring timely fund availability is a primary objective.\n2. Statement II is false: Financial planning explicitly prevents raising unnecessary funds because idle cash incurs cost.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Fixed Capital",
    "Manufacturing enterprises generally require substantially larger fixed capital than trading enterprises.",
    "Availability of leasing facilities increases a firm's initial fixed capital requirement.",
    "C",
    "1. Statement I is true: Manufacturing needs heavy plants and machinery.\n2. Statement II is false: Leasing avoids outright asset purchase, thereby lowering fixed capital needs.\nHence, Option C is correct."
))

# =================================================================================================
# 6. Assertion & Reason Questions (Q53 - Q60)
# =================================================================================================

add_q(make_assertion_question(
    CHAPTER, "Objective of Financial Management",
    "The primary objective of financial management is the maximization of shareholders' wealth.",
    "All financial decisions—investment, financing, and dividend—are evaluated based on their contribution to maximizing market value per equity share.",
    "A",
    "1. Assertion (A) is true: Wealth maximization is the ultimate goal.\n2. Reason (R) is true and explains (A): Managerial choices that enhance share value fulfill this primary objective.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Trading on Equity",
    "Trading on equity increases Earnings Per Share (EPS) under favorable financial conditions.",
    "When Return on Investment exceeds the Cost of Debt, the surplus return generated by borrowed funds accrues entirely to equity shareholders.",
    "A",
    "1. Assertion (A) is true: Trading on equity boosts EPS when ROI > Cost of debt.\n2. Reason (R) is true and explains (A): Paying fixed interest leaves the residual surplus for equity holders.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Cost of Debt",
    "Debt is considered a cheaper source of long-term finance compared to equity.",
    "Interest paid on debt is a tax-deductible expenditure, whereas dividends on equity are paid out of profit after tax.",
    "A",
    "1. Assertion (A) is true: Debt is cheaper than equity.\n2. Reason (R) is true and provides the financial rationale (tax-deductibility of interest) explaining (A).\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Capital Budgeting",
    "Capital budgeting decisions require thorough and cautious financial analysis.",
    "Capital budgeting decisions commit huge financial resources over the long term and are irreversible except at catastrophic losses.",
    "A",
    "1. Assertion (A) is true: Capital budgeting demands extreme caution.\n2. Reason (R) is true and explains (A): Substantial fund commitment and irreversibility make errors devastating.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Dividend Decision",
    "A firm reporting high accounting net profits may still be unable to declare cash dividends.",
    "Payment of dividends involves an actual cash outflow and depends directly on the company's liquid cash flow position.",
    "A",
    "1. Assertion (A) is true: High profit does not guarantee dividend payment ability.\n2. Reason (R) is true and explains (A): If profits are tied up in inventory or receivables, lack of liquid cash prevents paying dividends.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Working Capital",
    "A firm with a long production cycle requires higher working capital.",
    "Longer production cycles lock up capital in work-in-progress and raw material processing for extended durations.",
    "A",
    "1. Assertion (A) is true: Long production cycle elevates working capital.\n2. Reason (R) is true and provides the causal explanation for (A): Extended manufacturing time ties up operational funds.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Trading on Equity",
    "Trading on equity always guarantees an increase in Earnings Per Share under all economic circumstances.",
    "If Return on Investment falls below the Cost of Debt, high debt commitments severely depress Earnings Per Share.",
    "D",
    "1. Assertion (A) is false: Trading on equity does not guarantee EPS gains under all circumstances; it backfires if ROI < Cost of debt.\n2. Reason (R) is true: Unfavorable leverage depresses EPS.\nHence, Option D is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Financial Planning",
    "Financial planning aims at raising as much surplus idle cash as possible from financial institutions.",
    "Financial planning ensures adequate funds when needed while avoiding unnecessary fund-raising that incurs idle costs.",
    "D",
    "1. Assertion (A) is false: Financial planning actively discourages hoarding unnecessary idle funds.\n2. Reason (R) is true: The objective is balancing fund availability with avoiding idle costs.\nHence, Option D is correct."
))

# Verify length and output
print(f"Successfully generated {len(questions)} unique questions for Unit 9!")
assert len(questions) == 60, f"Expected 60 questions, got {len(questions)}"

os.makedirs("mock/bst_units", exist_ok=True)
out_path = "mock/bst_units/unit9.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
