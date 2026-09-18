# Part B Case Study Passages (Passages 21 to 40)
# Covering Business Finance and Marketing (Units 9 to 12)

part2_passages_data = []

# =================================================================================================
# UNIT 9: FINANCIAL MANAGEMENT (Passages 21 to 25)
# =================================================================================================

# Passage 21: Capital Structure & Trading on Equity at Vega Auto Components
part2_passages_data.append((
    "Financial Management",
    "Capital Structure and Trading on Equity",
    (
        "Vega Auto Components Ltd. is a profitable automotive parts manufacturing company with an existing total capital "
        "base of Rs. 60,00,000 comprising entirely of 6,00,000 equity shares of Rs. 10 each. The board of directors is "
        "planning a major modernization program requiring an additional capital outlay of Rs. 40,00,000. The Chief Financial "
        "Officer (CFO), Mr. Raman, projects that the company will earn an Earnings Before Interest and Taxes (EBIT) of "
        "Rs. 18,00,000 annually on the total invested capital of Rs. 1,00,00,000. The corporate income tax rate is 30%. "
        "Mr. Raman suggests raising the additional Rs. 40,00,000 entirely by issuing 10% Debentures. He argues that since the "
        "Return on Investment (ROI) is 18%, which significantly exceeds the nominal 10% cost of debt, the company can practice "
        "'trading on equity' to magnify the Earnings Per Share (EPS) for the existing equity shareholders. However, the conservative "
        "director, Mr. Alok, expresses concern about increased financial risk, interest coverage obligations, and the inflexible "
        "statutory commitment to service debt even during economic downturns."
    ),
    [
        (
            "What is the company's Return on Investment (ROI) before taxes on the total capital employed of Rs. 1,00,00,000?",
            "18%",
            ["10%", "14%", "24%"],
            "A",
            "1. ROI is calculated as (EBIT / Total Capital Employed) × 100 = (Rs. 18,00,000 / Rs. 1,00,00,000) × 100 = 18%.\nHence, Option {{CORR}} is correct.",
            "Calculates ROI as 18% using EBIT / Capital Employed."
        ),
        (
            "Why does the CFO advocate raising funds through 10% Debentures rather than issuing additional equity?",
            "Because ROI (18%) exceeds the cost of debt (10%), enabling favorable trading on equity to increase EPS",
            ["Because debenture holders obtain permanent management voting control in annual general meetings", "Because debt financing completely exempts the company from state corporate income tax", "Because debentures never require repayment of principal upon terminal maturity"],
            "B",
            "1. Favorable financial leverage or trading on equity occurs whenever ROI exceeds the cost of debt, allowing excess operating returns to increase Earnings Per Share (EPS).\nHence, Option {{CORR}} is correct.",
            "Explains favorable trading on equity when ROI exceeds cost of debt."
        ),
        (
            "What is the total annual interest payment obligation incurred if the company issues Rs. 40,00,000 in 10% Debentures?",
            "Rs. 4,00,000",
            ["Rs. 40,000", "Rs. 10,00,000", "Rs. 1,80,000"],
            "C",
            "1. Annual interest on debt = 10% of Rs. 40,00,000 = Rs. 4,00,000.\nHence, Option {{CORR}} is correct.",
            "Computes annual interest commitment as Rs. 4,00,000."
        ),
        (
            "What type of risk is Mr. Alok highlighting when expressing concern over mandatory interest servicing and principal repayment?",
            "Financial Risk",
            ["Operating Risk", "Systematic Currency Risk", "Environmental Hazard Risk"],
            "D",
            "1. Financial risk refers to the company's inability to cover fixed financial charges such as interest and debt repayment, potentially leading to insolvency.\nHence, Option {{CORR}} is correct.",
            "Identifies financial risk as danger of default on fixed commitments."
        ),
        (
            "Under which condition would trading on equity turn 'unfavorable', resulting in a steep decline in EPS?",
            "When the company's Return on Investment falls below the contractual cost of debt",
            ["When corporate income tax rates are reduced to zero by statutory enactment", "When the market price of company equity shares increases rapidly on secondary exchanges", "When total operating revenues exceed total fixed manufacturing costs"],
            "A",
            "1. Unfavorable financial leverage occurs when ROI is lower than the interest rate paid on borrowed funds, eroding returns to equity holders.\nHence, Option {{CORR}} is correct.",
            "Identifies condition for unfavorable trading on equity."
        )
    ]
))

# Passage 22: Working Capital & Operating Cycle at Apex Pharma
part2_passages_data.append((
    "Financial Management",
    "Working Capital Determinants",
    (
        "Apex Pharma Ltd. is a research-oriented pharmaceutical company manufacturing generic formulations and active "
        "pharmaceutical ingredients (APIs). The production process requires highly specialized raw materials imported from "
        "overseas, demanding an average raw material storage lead time of 90 days. Furthermore, stringent laboratory quality "
        "testing extends the work-in-progress conversion cycle to 45 days. To win institutional supply contracts with state "
        "hospitals, Apex Pharma is forced to grant a liberal credit term of 120 days to its institutional buyers. On the other "
        "hand, raw material suppliers demand payment within 30 days. The finance team points out that such operational realities "
        "lead to an unusually lengthy operating cycle, locking up substantial liquidity in current assets. Consequently, the "
        "company must arrange substantial short-term bank borrowings and working capital credit lines to prevent technical defaults."
    ),
    [
        (
            "Which primary determinant of working capital requirement is directly highlighted by Apex Pharma's production and testing delays?",
            "Length of the Operating Cycle",
            ["Statutory Corporate Tax Rate", "Level of Direct Export Subsidies", "Divisional Delegation of Authority"],
            "A",
            "1. The operating cycle is the time elapsed between procurement of raw materials and realization of cash from sales; a longer cycle increases working capital needs.\nHence, Option {{CORR}} is correct.",
            "Identifies operating cycle length as the primary working capital determinant."
        ),
        (
            "How does granting a liberal credit period of 120 days to institutional buyers affect Apex Pharma's working capital needs?",
            "It substantially increases the working capital requirements due to prolonged lock-in of funds in accounts receivable",
            ["It drastically reduces working capital needs by converting inventory into zero-cost assets", "It eliminates the requirement for short-term liquidity entirely", "It guarantees immediate cash realization on the shipment date"],
            "B",
            "1. A liberal credit policy results in higher levels of sundry debtors and receivables, locking up liquid capital and requiring higher working capital.\nHence, Option {{CORR}} is correct.",
            "Explains that liberal credit policy inflates working capital needs."
        ),
        (
            "What would be the effect on Apex Pharma's working capital if its overseas suppliers agreed to extend credit terms from 30 days to 90 days?",
            "The net working capital requirement would decrease because supplier credit finances inventory for a longer duration",
            ["Working capital requirement would increase fivefold immediately", "The company would be forced into mandatory liquidation", "The operating cycle would lengthen automatically by 60 days"],
            "C",
            "1. More generous credit terms allowed by trade creditors finance current assets internally, thereby reducing the net working capital required from lenders.\nHence, Option {{CORR}} is correct.",
            "Identifies supplier credit as an offset decreasing working capital requirements."
        ),
        (
            "Which of the following business models typically requires the lowest amount of working capital compared to a manufacturing firm like Apex Pharma?",
            "A cash-and-carry retail trading business dealing in fast-moving perishables",
            ["A heavy commercial aircraft manufacturing enterprise", "A long-gestation thermal power infrastructure project", "An international ocean liner shipbuilding yard"],
            "D",
            "1. Trading concerns and cash-and-carry retailers have rapid turnover, no work-in-progress conversion cycle, and negligible credit sales, requiring minimal working capital.\nHence, Option {{CORR}} is correct.",
            "Contrasts manufacturing working capital with cash-and-carry trading businesses."
        ),
        (
            "Gross Working Capital is defined as the monetary value of:",
            "The total investment in all current assets of the enterprise",
            ["Current assets minus current liabilities", "Total long-term equity share capital plus debentures", "Depreciated historical cost of land, factory buildings, and heavy machinery"],
            "A",
            "1. Gross working capital represents the total sum of all current assets, whereas net working capital is current assets minus current liabilities.\nHence, Option {{CORR}} is correct.",
            "Defines Gross Working Capital as total current assets."
        )
    ]
))

# Passage 23: Dividend Decision at Zenith Software Solutions
part2_passages_data.append((
    "Financial Management",
    "Dividend Decision Determinants",
    (
        "Zenith Software Solutions Ltd. is a high-growth cloud computing firm that achieved record net earnings of Rs. 85 Crore "
        "during the current fiscal year. The company has identified highly lucrative investment opportunities in Artificial "
        "Intelligence and quantum computing infrastructure requiring capital expenditure of Rs. 70 Crore over the next twelve months. "
        "The Chief Executive Officer (CEO) recommends retaining 90% of current earnings to finance these breakthrough growth projects "
        "internally, arguing that internal financing avoids flotation costs and prevents dilution of voting control. However, the Chief "
        "Investor Relations Officer cautions that a significant proportion of retail shareholders rely on regular dividend payouts "
        "for continuous disposable cash flow. Additionally, the company has consistently maintained a stable dividend policy with a "
        "gradually increasing payout per share over the past eight consecutive years. The board must reconcile the trade-off between "
        "growth opportunities, cash flow position, shareholder preferences, and stability of dividends."
    ),
    [
        (
            "Which factor strongly favors the CEO's proposal to retain 90% of earnings rather than paying high dividends?",
            "Availability of profitable investment and growth opportunities",
            ["Strict statutory mandate capping maximum corporate reserves", "Desire to artificially depress share prices on stock exchanges", "Total absence of any long-term capital expenditure plans"],
            "A",
            "1. When companies have access to profitable growth projects offering higher returns, they retain greater earnings to fund capital expenditure.\nHence, Option {{CORR}} is correct.",
            "Identifies growth opportunities as factor favoring retained earnings."
        ),
        (
            "How does the financing of expansion through retained earnings protect existing shareholders against dilution of control?",
            "It avoids issuing new equity shares to external parties, preserving existing voting proportions intact",
            ["It automatically revokes the voting franchise of all debenture holders", "It transfers all decision-making authority to public financial institutions", "It mandates the conversion of all debt instruments into irredeemable preference shares"],
            "B",
            "1. Retaining internal profits circumvents the need for fresh equity issues, preventing any dilution of management ownership and voting control.\nHence, Option {{CORR}} is correct.",
            "Explains preservation of control through internal equity financing."
        ),
        (
            "What does a 'Stability of Dividends' policy mean in corporate financial management?",
            "Maintaining a predictable, steady dividend payout per share without erratic fluctuations",
            ["Paying out 100% of profits every quarter regardless of cash reserves", "Fixing dividend payouts exclusively to changes in the foreign exchange rate", "Compulsorily distributing bonus shares instead of monetary dividends"],
            "C",
            "1. Stability of dividends involves paying a fixed or predictably growing dividend per share, boosting investor confidence in the company's financial soundness.\nHence, Option {{CORR}} is correct.",
            "Defines stability of dividends."
        ),
        (
            "If Zenith Software decides to distribute large cash dividends despite funding massive AI projects, which critical constraint will it face immediately?",
            "Severe cash flow strain and liquidity deficit",
            ["Automatic cancellation of corporate legal registration", "Compulsory seizure of manufacturing patents by lenders", "Immediate downgrade of equity shares into unsecured debentures"],
            "D",
            "1. Dividend payout requires actual cash outflow. A company with high paper profits but tight liquidity can trigger a cash crunch if it pays high cash dividends.\nHence, Option {{CORR}} is correct.",
            "Identifies cash flow constraint on dividend payments."
        ),
        (
            "Which financial decision category does the choice between retaining profits and distributing dividends directly belong to?",
            "Dividend Decision",
            ["Investment Decision", "Financing Decision", "Working Capital Structuring Decision"],
            "A",
            "1. The dividend decision determines what proportion of post-tax net profits should be distributed as dividends to shareholders and how much should be retained in business.\nHence, Option {{CORR}} is correct.",
            "Classifies the decision as Dividend Decision."
        )
    ]
))

# Passage 24: Fixed Capital & Capital Budgeting at Metro Logistics
part2_passages_data.append((
    "Financial Management",
    "Fixed Capital and Investment Decisions",
    (
        "Metro Logistics Ltd. is a national freight forwarding company operating a fleet of 500 diesel trucks across major "
        "interstate corridors. Due to escalating diesel fuel costs and stringent government emissions standards, the company is "
        "evaluating a strategic capital budgeting proposal to replace 200 aging diesel trucks with heavy-duty electric haulage "
        "vehicles (EV trucks) and build dedicated ultra-fast charging depots at major logistics hubs. This project requires an "
        "upfront capital expenditure of Rs. 150 Crore. The investment committee highlights that capital budgeting decisions involve "
        "irreversible long-term resource commitments, substantial financial outlays, and will directly shape the firm's competitive "
        "standing for the next 15 years. Reversing this decision mid-way would entail catastrophic financial losses. Therefore, "
        "the management conducts a rigorous analysis evaluating cash flow forecasts, internal rate of return, payback periods, and "
        "the risk profile of emerging EV battery technology."
    ),
    [
        (
            "Decisions involving long-term fixed capital commitments like purchasing EV trucks are technically termed as:",
            "Capital Budgeting Decisions (Investment Decisions)",
            ["Working Capital Allocation Decisions", "Operational Maintenance Scheduling", "Short-term Cash Flow Management"],
            "A",
            "1. Long-term investment decisions regarding fixed asset acquisition and infrastructure deployment are known as Capital Budgeting Decisions.\nHence, Option {{CORR}} is correct.",
            "Identifies long-term investment decisions as Capital Budgeting."
        ),
        (
            "Why do capital budgeting decisions require extreme care and comprehensive analysis by top management?",
            "Because they involve huge funds, are irreversible without substantial loss, and influence long-term earning capacity",
            ["Because they can be freely modified or cancelled every week without financial consequences", "Because the Companies Act mandates unanimous referendum approval from all citizens", "Because fixed assets can always be liquidated instantly at triple their purchase price"],
            "B",
            "1. Capital budgeting decisions commit substantial funds, dictate long-term profitability and risk, and are difficult or impossible to reverse without heavy financial penalties.\nHence, Option {{CORR}} is correct.",
            "States key characteristics making capital budgeting decisions critical."
        ),
        (
            "Which of the following is a primary factor influencing Metro Logistics' requirement for high fixed capital?",
            "Nature of Business (capital-intensive transport logistics requiring heavy fleet and depot infrastructure)",
            ["Zero trade credit granted to small corporate shippers", "High turnover of low-value disposable office stationery", "Purely software-based digital intermediation with zero physical assets"],
            "C",
            "1. Transport and logistics enterprises require heavy investment in transport fleets and hub infrastructure, necessitating large fixed capital.\nHence, Option {{CORR}} is correct.",
            "Identifies Nature of Business as determinant of fixed capital."
        ),
        (
            "If Metro Logistics opts to acquire the electric trucks through a long-term operating lease instead of outright purchase, what will be the effect on its fixed capital requirement?",
            "Its fixed capital requirement will substantially decrease because leasing avoids upfront capital expenditure",
            ["Its fixed capital requirement will immediately quadruple", "The company will be legally prohibited from operating on public highways", "Its working capital requirement will drop to zero permanently"],
            "D",
            "1. Availability of leasing facilities enables firms to use heavy assets without massive upfront capital outlays, thereby reducing fixed capital requirements.\nHence, Option {{CORR}} is correct.",
            "Explains that leasing reduces fixed capital requirement."
        ),
        (
            "Which financial criterion compares the expected net cash inflows generated over an asset's useful life with the initial capital outlay?",
            "Rate of Return and Cash Flow of the Project",
            ["Nominal Par Value of Authorized Equity Shares", "Statutory Liquidity Ratio fixed by the Reserve Bank of India", "Consumer Price Index published by the Central Statistical Office"],
            "A",
            "1. Evaluating capital projects involves analyzing projected cash flows, rate of return (ROI/IRR), and investment criteria involved.\nHence, Option {{CORR}} is correct.",
            "Identifies cash flow and rate of return as investment criteria."
        )
    ]
))

# Passage 25: Financial Planning at Blue Horizon Hospitality
part2_passages_data.append((
    "Financial Management",
    "Financial Planning Objectives and Process",
    (
        "Blue Horizon Hospitality Ltd. operates a premier chain of boutique heritage resorts across Western India. Over the past "
        "five years, the company faced periodic cash crises during low-tourism monsoon months, followed by uninvested idle cash "
        "balances during peak winter wedding seasons. To eliminate these financial imbalances, the managing director appointed a "
        "seasoned finance professional, Ms. Radhika, to institute comprehensive Financial Planning. Ms. Radhika began by formulating "
        "sales forecasts for the next three years, taking into account seasonal occupancy variations. She then estimated the precise "
        "operational and capital funds required at different times of the year and identified optimal funding sources. She emphasized "
        "that sound financial planning serves a dual objective: ensuring availability of funds whenever required and ensuring that "
        "the firm does not raise resources unnecessarily, as idle capital incurs unnecessary capital costs."
    ),
    [
        (
            "What are the two core twin objectives of financial planning highlighted by Ms. Radhika?",
            "To ensure availability of funds whenever required and to ensure that the firm does not raise resources unnecessarily",
            ["To maximize current tax liabilities and eliminate all equity share capital", "To replace all bank borrowings with irredeemable foreign sovereign loans", "To guarantee zero fluctuation in stock exchange market prices"],
            "A",
            "1. The twin objectives of financial planning are: (1) ensuring availability of funds whenever required, and (2) ensuring that the firm does not raise resources unnecessarily (avoiding idle funds).\nHence, Option {{CORR}} is correct.",
            "Identifies twin objectives of financial planning."
        ),
        (
            "Why is having excessive idle funds considered detrimental in financial management?",
            "Because idle capital carries an implicit cost of capital without generating any productive operating return",
            ["Because commercial banks automatically seize idle cash balances as statutory penalties", "Because idle cash causes instant devaluation of registered intellectual patents", "Because SEBI mandates mandatory delisting for companies holding bank balances"],
            "B",
            "1. Capital is not free; holding surplus idle funds adds to financing costs without yielding corresponding returns, eroding overall enterprise profitability.\nHence, Option {{CORR}} is correct.",
            "Explains why idle funds undermine profitability."
        ),
        (
            "What is typically the foundational starting point for formulating an enterprise financial plan?",
            "Preparation of a detailed Sales Forecast",
            ["Distribution of executive annual bonus dividends", "Immediate dissolution of internal audit committees", "Procurement of raw materials from international suppliers"],
            "C",
            "1. Financial planning fundamentally commences with sales forecasting, from which production budgets, operational cash requirements, and capital expenditure needs are derived.\nHence, Option {{CORR}} is correct.",
            "Identifies sales forecast as the starting point of financial planning."
        ),
        (
            "How does comprehensive financial planning assist Blue Horizon in tackling unexpected business contingencies?",
            "By preparing alternative operational budgets and financial buffers based on varying future scenarios",
            ["By guaranteeing that economic recessions will never occur in the hospitality sector", "By legally requiring hotel guests to pay 100% non-refundable advance deposits five years ahead", "By transferring all operational risks to the municipal tourism authority"],
            "D",
            "1. Financial planning helps in forecasting future uncertainties and testing 'what-if' scenarios, equipping the firm to handle contingencies smoothly.\nHence, Option {{CORR}} is correct.",
            "Explains role of financial planning in managing contingencies."
        ),
        (
            "Financial Planning is best described as:",
            "The preparation of a financial blueprint of an organisation's future operations",
            ["A daily routine logbook of petty cash disbursements", "The annual external audit report presented to income tax authorities", "The mechanical calculation of historical depreciation charges"],
            "A",
            "1. Financial planning is the process of estimating the fund requirements of a business and specifying the sources of funds, creating a financial blueprint for operations.\nHence, Option {{CORR}} is correct.",
            "Defines Financial Planning as a financial blueprint."
        )
    ]
))

# =================================================================================================
# UNIT 10: FINANCIAL MARKETS (Passages 26 to 30)
# =================================================================================================

# Passage 26: Money Market Instruments & Floatation at Surya Infrastructure
part2_passages_data.append((
    "Financial Markets",
    "Money Market Instruments",
    (
        "Surya Infrastructure Ltd. is a major engineering and construction conglomerate with an unblemished credit rating. "
        "The company is preparing to launch a massive Rs. 500 Crore public issue of equity shares on the National Stock Exchange. "
        "However, conducting a public issue entails significant upfront floatation costs amounting to Rs. 15 Crore, including "
        "underwriting commissions, prospectus printing, advertising campaigns, registrar fees, and merchant banking charges. "
        "To bridge this temporary liquidity gap until public subscription monies are received, the Chief Financial Officer "
        "issues Commercial Paper (CP) worth Rs. 15 Crore in the money market with a maturity period of 90 days. The CFO notes that "
        "using Commercial Paper to meet floatation costs is a classic market mechanism termed 'bridge financing'. Meanwhile, "
        "the Reserve Bank of India (RBI) conducts monetary operations by issuing 91-day Treasury Bills at a discount to absorb excess "
        "banking liquidity, while scheduled commercial banks actively participate in the Call Money market to maintain their daily "
        "Cash Reserve Ratio (CRR) requirements."
    ),
    [
        (
            "The practice of issuing Commercial Paper to finance upfront floatation costs of a long-term issue is known as:",
            "Bridge Financing",
            ["Factoring Mechanism", "Underwriting Syndication", "Debt Securitization"],
            "A",
            "1. Bridge financing refers to short-term funds raised via Commercial Paper by creditworthy companies to cover floatation costs of a primary market public issue.\nHence, Option {{CORR}} is correct.",
            "Defines Bridge Financing via Commercial Paper."
        ),
        (
            "What is a defining legal characteristic of Commercial Paper as a money market instrument?",
            "It is an unsecured promissory note negotiable and transferable by endorsement and delivery, issued by creditworthy corporates",
            ["It is a secured mortgage debenture backed by immovable real estate assets", "It is a sovereign currency note issued directly by the Ministry of Finance", "It is an equity derivative traded exclusively on international commodity bourses"],
            "B",
            "1. Commercial Paper is an unsecured promissory note with a fixed maturity period (15 days to 1 year) issued by highly rated corporate borrowers.\nHence, Option {{CORR}} is correct.",
            "States legal characteristics of Commercial Paper."
        ),
        (
            "Why do commercial banks engage in transactions in the 'Call Money' market?",
            "To manage short-term temporary deficits and comply with statutory Cash Reserve Ratio (CRR) mandates",
            ["To permanently acquire equity stakes in central government enterprises", "To fund long-term thirty-year residential housing mortgages", "To establish overseas branch networks without regulatory license"],
            "C",
            "1. Call money is short-term finance repayable on demand (maturity 1 to 15 days) used by commercial banks to maintain required Cash Reserve Ratio balances with RBI.\nHence, Option {{CORR}} is correct.",
            "Identifies maintenance of CRR as purpose of Call Money."
        ),
        (
            "Treasury Bills (T-Bills) issued by the Reserve Bank of India on behalf of the Central Government are also termed as:",
            "Zero Coupon Bonds",
            ["Floating Rate Consols", "Perpetual Subordinated Debentures", "Equity Index Warrants"],
            "D",
            "1. Treasury bills are issued at a discount to face value and redeemed at par without explicit interest coupons, hence termed Zero Coupon Bonds.\nHence, Option {{CORR}} is correct.",
            "Identifies Treasury Bills as Zero Coupon Bonds."
        ),
        (
            "What is the maximum maturity period of instruments traded in the Indian Money Market?",
            "Up to one year",
            ["Up to ten years", "Up to twenty-five years", "Strictly thirty calendar days"],
            "A",
            "1. The money market is a market for short-term funds with maturity up to one year, providing liquidity to borrowers and lenders.\nHence, Option {{CORR}} is correct.",
            "Identifies one year as upper limit of money market maturity."
        )
    ]
))

# Passage 27: Primary Market Methods of Floatation at Nexa Biotech
part2_passages_data.append((
    "Financial Markets",
    "Methods of Floatation in Primary Market",
    (
        "Nexa Biotech Ltd. is an innovative biomedical research startup seeking to raise Rs. 80 Crore in fresh equity capital. "
        "The board discusses five distinct methods of floatation available in the primary capital market. The managing director "
        "recommends an 'Offer for Sale', where existing venture capital investors sell a portion of their holdings through issuing "
        "houses and brokerages to institutional buyers. The finance manager suggests a 'Private Placement', allocating the entire "
        "issue to selected insurance funds, pension trusts, and high-net-worth investors, pointing out that this method is fast, "
        "cost-effective, and avoids mandatory public prospectus publication. An independent director advocates a 'Rights Issue', "
        "offering preemptive purchase rights to existing equity shareholders in proportion to their current shareholding as per "
        "Section 62 of the Companies Act. Finally, the marketing director proposes an 'e-IPO' (Electronic Initial Public Offer) "
        "by appointing SEBI-registered brokers to collect retail bids online through the automated stock exchange book-building mechanism."
    ),
    [
        (
            "Which method of floatation involves offering securities directly to a select group of institutional investors and HNIs without public advertisement?",
            "Private Placement",
            ["Offer through Prospectus", "Open Outcry Auction", "Statutory Preemption"],
            "A",
            "1. Private placement is the allotment of securities by a company to institutional investors and selected individuals rather than the public at large.\nHence, Option {{CORR}} is correct.",
            "Identifies Private Placement."
        ),
        (
            "Under a 'Rights Issue', to whom are the fresh equity shares compulsorily offered first?",
            "To existing equity shareholders in proportion to their existing shareholding",
            ["Exclusively to commercial bank employees on probationary contracts", "To overseas foreign portfolio managers with sovereign immunity", "To non-executive board directors free of consideration"],
            "B",
            "1. A rights issue gives existing shareholders the statutory preemptive right to subscribe to new shares in proportion to their existing holdings.\nHence, Option {{CORR}} is correct.",
            "Defines Rights Issue mechanism."
        ),
        (
            "How does an 'Offer for Sale' differ from a direct 'Public Issue through Prospectus'?",
            "In an Offer for Sale, securities are not issued directly to the public by the company, but are sold via intermediary issuing houses/brokers",
            ["An Offer for Sale can only be conducted by the Reserve Bank of India", "An Offer for Sale does not permit any monetary consideration to be exchanged", "An Offer for Sale is strictly limited to debt debentures"],
            "C",
            "1. Under Offer for Sale, securities are sold to intermediaries (issuing houses/stock brokers) at an agreed price, who then resell them to the investing public.\nHence, Option {{CORR}} is correct.",
            "Contrasts Offer for Sale with direct public prospectus issue."
        ),
        (
            "What must a company do if it wishes to raise capital through an e-IPO on secondary stock exchanges?",
            "Enter into an agreement with the stock exchange and appoint SEBI-registered brokers for accepting online applications",
            ["Obtain unanimous written consent from every registered voter in the nation", "Surrender all physical corporate assets to the central government", "Convert into an unlimited liability sole proprietorship firm"],
            "D",
            "1. A company proposing to issue capital to the public through the on-line system of the stock exchange has to enter into an agreement with the exchange and appoint registered brokers.\nHence, Option {{CORR}} is correct.",
            "States statutory procedure for e-IPO."
        ),
        (
            "The Primary Market is also widely designated in financial terminology as the:",
            "New Issue Market (NIM)",
            ["Secondary Liquidity Exchange", "Discount House of India", "Over-the-Counter Settlement Chamber"],
            "A",
            "1. The primary market deals with new securities being issued for the first time, hence it is known as the New Issue Market.\nHence, Option {{CORR}} is correct.",
            "Identifies Primary Market as New Issue Market."
        )
    ]
))

# Passage 28: Stock Exchange Trading & Settlement Procedure
part2_passages_data.append((
    "Financial Markets",
    "Trading and Settlement Procedure on a Stock Exchange",
    (
        "Kunal, a young software engineer, decided to invest Rs. 50,000 of his personal savings in blue-chip equities listed "
        "on the Bombay Stock Exchange (BSE). He approached a SEBI-registered stockbroker, who required Kunal to submit his Permanent "
        "Account Number (PAN), identity proof, residential address, and bank account details to complete the mandatory Know Your "
        "Customer (KYC) registration. Kunal also opened a Depository Participant (DP) account to hold his securities in electronic, "
        "dematerialized format (Demat account). After opening the account, Kunal placed a buy limit order for 100 shares of an FMCG "
        "company at Rs. 480 per share. The broker entered the order into the computer terminal. When a matching sell order was found "
        "on the electronic trading system, the order was executed, and the broker generated an electronic Contract Note bearing a "
        "unique Order Confirmation Number within 24 hours. Kunal learned that the rolling settlement on Indian stock exchanges "
        "operates strictly on a T+1 settlement cycle, ensuring rapid electronic transfer of funds and shares."
    ),
    [
        (
            "Which document is legally mandatory for any investor before opening a trading account on an Indian stock exchange?",
            "Permanent Account Number (PAN) Card",
            ["International Passport with valid Schengen Visa", "Commercial Driving License for Heavy Motor Vehicles", "Membership Certificate of the Bar Council of India"],
            "A",
            "1. Under SEBI regulations, providing a PAN card is legally mandatory for all investors opening a demat and trading account.\nHence, Option {{CORR}} is correct.",
            "Identifies PAN as legally mandatory document."
        ),
        (
            "What is the official document issued by the stockbroker within 24 hours of trade execution detailing transaction price, brokerage, and order confirmation number?",
            "Contract Note",
            ["Share Certificate", "Debit Note", "Delivery Challan"],
            "B",
            "1. A Contract Note is a legal document confirming trades executed by a broker on behalf of a client, issued within 24 hours of trade execution.\nHence, Option {{CORR}} is correct.",
            "Defines Contract Note."
        ),
        (
            "What does the term 'Dematerialization' (Demat) signify in modern securities trading?",
            "Converting physical paper share certificates into an electronic book-entry balance held with a depository",
            ["Repaying all corporate debentures ahead of scheduled contractual maturity", "Mandatory forfeiture of shares due to non-payment of allotment calls", "Transferring company management control to central government custodians"],
            "C",
            "1. Dematerialization is the process by which physical share certificates of an investor are converted into electronic balances held securely in a depository.\nHence, Option {{CORR}} is correct.",
            "Defines Dematerialization."
        ),
        (
            "What settlement cycle is currently followed on Indian stock exchanges for rolling equity transactions?",
            "T+1 Settlement Cycle (Trade day plus one working day)",
            ["T+5 Settlement Cycle", "T+14 Settlement Cycle", "T+30 Settlement Cycle"],
            "D",
            "1. India transitioned to the T+1 settlement cycle, where trades are cleared and settled within one business day following the trade execution day.\nHence, Option {{CORR}} is correct.",
            "Identifies T+1 settlement cycle."
        ),
        (
            "Which two national depositories operate in India to maintain dematerialized securities electronically?",
            "NSDL (National Securities Depository Ltd.) and CDSL (Central Depository Services Ltd.)",
            ["RBI and NABARD", "SEBI and IRDAI", "SBI and LIC"],
            "A",
            "1. In India, there are two apex depositories: National Securities Depository Limited (NSDL) and Central Depository Services Limited (CDSL).\nHence, Option {{CORR}} is correct.",
            "Identifies NSDL and CDSL as Indian depositories."
        )
    ]
))

# Passage 29: SEBI Regulatory, Protective & Developmental Functions
part2_passages_data.append((
    "Financial Markets",
    "Functions of Securities and Exchange Board of India (SEBI)",
    (
        "The Securities and Exchange Board of India (SEBI) was established as an autonomous statutory regulator under the "
        "SEBI Act of 1992 to protect the interests of investors in securities, promote the development of the securities market, "
        "and regulate its operations. In a recent high-profile investigation, SEBI uncovered an illicit insider trading network "
        "where key corporate executives used unpublished price-sensitive information (UPSI) regarding an impending corporate merger "
        "to execute lucrative front-running trades. SEBI promptly froze the illicit profits, levied heavy financial penalties, "
        "and barred the errant executives from accessing the capital markets for five years. Simultaneously, SEBI conducted nationwide "
        "investor awareness workshops, published guidelines for retail participation in mutual funds, and mandated online accreditation "
        "testing for securities market intermediaries. Financial analysts noted that SEBI effectively deployed its protective, "
        "regulatory, and developmental functions in cohesive harmony."
    ),
    [
        (
            "Prohibiting insider trading and penalizing fraudulent or unfair trade practices falls under which category of SEBI functions?",
            "Protective Functions",
            ["Developmental Functions", "Operational Budgeting Functions", "Monetary Discretionary Functions"],
            "A",
            "1. Prohibiting fraudulent practices, insider trading, and protecting investor rights are core Protective Functions of SEBI.\nHence, Option {{CORR}} is correct.",
            "Classifies anti-insider trading actions under Protective Functions."
        ),
        (
            "Conducting investor education campaigns and training market intermediaries falls under which category of SEBI functions?",
            "Developmental Functions",
            ["Protective Functions", "Judicial Penal Functions", "Corporate Tax Assessment Functions"],
            "B",
            "1. Promoting investor education, training intermediaries, and encouraging fair trade research are Developmental Functions of SEBI.\nHence, Option {{CORR}} is correct.",
            "Classifies investor education under Developmental Functions."
        ),
        (
            "Registering and regulating the working of stockbrokers, sub-brokers, merchant bankers, and mutual funds represents SEBI's:",
            "Regulatory Functions",
            ["Protective Functions", "Developmental Functions", "Charitable Public Service Functions"],
            "C",
            "1. Registration of brokers, mutual funds, collective investment schemes, and conducting audits of stock exchanges are Regulatory Functions of SEBI.\nHence, Option {{CORR}} is correct.",
            "Identifies Regulatory Functions of SEBI."
        ),
        (
            "What is 'Insider Trading' in the context of capital market operations?",
            "Trading in company securities by individuals having access to unpublished price-sensitive information (UPSI)",
            ["Purchasing equity shares during open trading hours on secondary exchanges", "Subscribing to government Treasury Bills through competitive bidding", "Investing in diversified mutual fund schemes via systematic investment plans"],
            "D",
            "1. Insider trading involves buying or selling securities of a listed company using unpublished price-sensitive material information that is unavailable to the general public.\nHence, Option {{CORR}} is correct.",
            "Defines Insider Trading."
        ),
        (
            "In which year was SEBI established as a statutory regulatory body with autonomous legal enforcement powers?",
            "1992",
            ["1982", "2000", "1956"],
            "A",
            "1. SEBI was established in 1988 as an administrative body and granted statutory status by an Act of Parliament in 1992 (SEBI Act, 1992).\nHence, Option {{CORR}} is correct.",
            "Identifies 1992 as year of statutory establishment of SEBI."
        )
    ]
))

# Passage 30: Capital Market vs Money Market at Indus Capital
part2_passages_data.append((
    "Financial Markets",
    "Comparison of Capital Market and Money Market",
    (
        "Indus Capital Advisory is preparing an educational guide for corporate treasury managers contrasting the operational "
        "mechanics of the Money Market and the Capital Market. The report highlights that the Money Market deals exclusively in "
        "short-term debt instruments with maturities up to one year, serving liquidity adjustments for commercial banks, the central "
        "government, and major corporations. Because money market instruments like Treasury Bills, Call Money, and Certificates of "
        "Deposit involve high unit denominations (often Rs. 25,00,000 or multiples of Rs. 25,000 for T-Bills), the participants are "
        "predominantly institutional bodies. Credit risk is relatively low, and liquidity is extremely high. In stark contrast, the "
        "Capital Market channels long-term savings into equity and debt securities with maturities extending beyond one year, catering "
        "to both retail households and corporate institutions. While offering higher potential long-term returns, capital market "
        "instruments carry comparatively higher market risk and lower immediate price certainty."
    ),
    [
        (
            "What is the primary distinguishing criterion between the Money Market and the Capital Market?",
            "Maturity period of financial instruments (short-term up to 1 year vs long-term exceeding 1 year)",
            ["The physical geographical location of the stock exchange building", "The gender composition of corporate boards of directors", "The statutory requirement to use cash payments exclusively"],
            "A",
            "1. The primary distinction is maturity period: Money market caters to short-term funds up to one year, while capital market deals in medium and long-term funds.\nHence, Option {{CORR}} is correct.",
            "Identifies maturity period as primary distinguishing criterion."
        ),
        (
            "Why is retail individual investor participation relatively limited in the money market compared to the capital market?",
            "Because money market instruments require very large minimum financial outlays (high face value denominations)",
            ["Because individual citizens are legally prohibited from owning any money market paper", "Because money market instruments yield zero return under all economic circumstances", "Because commercial banks refuse to accept paper applications from individuals"],
            "B",
            "1. Instruments in the money market involve substantial financial investment (e.g. Treasury bills minimum Rs. 25,000, Commercial Paper in denominations of Rs. 5 Lakhs), deterring small retail savers.\nHence, Option {{CORR}} is correct.",
            "Explains high ticket size restricts retail participation in money market."
        ),
        (
            "Which market instrument offers the highest degree of safety and zero credit default risk?",
            "Central Government Treasury Bills",
            ["Subordinated corporate high-yield junk debentures", "Small-cap equity shares of speculative start-up entities", "Unregistered promissory notes of foreign partnerships"],
            "C",
            "1. Treasury bills carry sovereign guarantee of the Central Government of India, making them risk-free instruments with zero default risk.\nHence, Option {{CORR}} is correct.",
            "Identifies Treasury Bills as zero default risk instruments."
        ),
        (
            "How does the expected rate of return in the Capital Market compare to the Money Market over an extended economic horizon?",
            "Capital market investments typically offer higher expected long-term returns to compensate for higher market risk",
            ["Capital market investments guarantee exactly zero monetary return", "Money market instruments always yield 100% annual compound interest", "Both markets are legally bound to deliver identical daily interest rates"],
            "D",
            "1. Capital market instruments carry higher business and market risks, so investors demand and historically receive higher expected returns over long horizons.\nHence, Option {{CORR}} is correct.",
            "Explains risk-return trade-off between capital and money markets."
        ),
        (
            "Which apex institution acts as the chief participant and regulator of the Indian Money Market?",
            "Reserve Bank of India (RBI)",
            ["Securities and Exchange Board of India (SEBI)", "Competition Commission of India (CCI)", "Insurance Regulatory and Development Authority (IRDAI)"],
            "A",
            "1. The Reserve Bank of India regulates and conducts monetary operations in the Indian money market.\nHence, Option {{CORR}} is correct.",
            "Identifies RBI as regulator of the money market."
        )
    ]
))

# =================================================================================================
# UNIT 11: MARKETING MANAGEMENT (Passages 31 to 36)
# =================================================================================================

# Passage 31: Marketing Management Philosophies at Prakriti Herbal
part2_passages_data.append((
    "Marketing Management",
    "Marketing Philosophies / Concepts",
    (
        "Prakriti Herbal Products Ltd. was founded in 2010. Initially, the management believed that if they produced high-quality "
        "organic soaps and shampoos with superior herbal extracts, consumers would automatically flock to purchase them without "
        "any promotional effort ('Product Concept'). Later, as competition intensified, a new sales director hired aggressive field "
        "agents and offered heavy discounts, operating on the premise that customers will not buy enough products unless subjected to "
        "intensive sales promotion and aggressive selling pressure ('Selling Concept'). However, inventories continued to pile up. "
        "In 2022, a professional marketing head took over. She conducted comprehensive consumer surveys, identified unmet consumer "
        "needs for chemical-free, dermatologist-certified baby skincare, and designed customized formulations that satisfied customers "
        "better than competitors ('Marketing Concept'). Furthermore, the company adopted biodegradable sugarcane-based packaging, "
        "banned animal testing, and committed 2% of profits to rural girl-child education, firmly aligning itself with the 'Societal "
        "Marketing Concept'."
    ),
    [
        (
            "Which marketing philosophy assumes that customers will favor products that offer the best quality, performance, and innovative features, requiring continuous product improvement?",
            "Product Concept",
            ["Production Concept", "Selling Concept", "Societal Marketing Concept"],
            "A",
            "1. The Product Concept focuses on achieving product excellence, believing that high quality automatically attracts customers.\nHence, Option {{CORR}} is correct.",
            "Identifies Product Concept."
        ),
        (
            "The aggressive push to sell whatever was manufactured through heavy discounting and hard-selling techniques illustrates the:",
            "Selling Concept",
            ["Production Concept", "Societal Marketing Concept", "Holistic Value Concept"],
            "B",
            "1. The Selling Concept focuses on aggressive selling and promotional efforts to convince customers to buy what the firm produces.\nHence, Option {{CORR}} is correct.",
            "Identifies Selling Concept."
        ),
        (
            "What is the starting point and primary pillar of the 'Marketing Concept' adopted in 2022?",
            "Identifying consumer needs and target market requirements before initiating production",
            ["Maximizing factory assembly line output at the lowest possible unit cost", "Executing high-pressure television advertising campaigns", "Liquidating unsold accumulated warehouse inventory at throwaway prices"],
            "C",
            "1. The Marketing Concept begins with the target market, identifies customer needs, and creates integrated marketing strategies to satisfy those needs profitably.\nHence, Option {{CORR}} is correct.",
            "States starting point of Marketing Concept."
        ),
        (
            "How does the 'Societal Marketing Concept' extend beyond the traditional Marketing Concept?",
            "By balancing consumer need satisfaction, company profitability, and long-term societal well-being / environmental sustainability",
            ["By transferring all corporate profits to charitable trusts without paying salaries", "By mandating free distribution of goods to all citizens", "By eliminating all quality standards to reduce retail prices"],
            "D",
            "1. The Societal Marketing Concept holds that the firm should satisfy customer needs in a way that preserves or enhances the long-term well-being of society and the environment.\nHence, Option {{CORR}} is correct.",
            "Defines Societal Marketing Concept."
        ),
        (
            "Which marketing philosophy assumes that consumers will favor products that are widely available and inexpensive, focusing on mass production and low costs?",
            "Production Concept",
            ["Product Concept", "Selling Concept", "Societal Marketing Concept"],
            "A",
            "1. The Production Concept focuses on large-scale production, wide distribution, and low unit costs, believing availability and affordability drive sales.\nHence, Option {{CORR}} is correct.",
            "Defines Production Concept."
        )
    ]
))

# Passage 32: Product, Branding & Packaging at NutriBite Foods
part2_passages_data.append((
    "Marketing Management",
    "Product, Branding, and Packaging",
    (
        "NutriBite Foods Ltd. is launching a new line of roasted multigrain breakfast cereals aimed at fitness-conscious urban "
        "consumers. The brand management team designed a distinctive registered visual logo, catchy tagline ('Crunch Your Way to "
        "Health'), and secured legal trademark protection under the Trade Marks Act to prevent unauthorized imitation by rival food "
        "producers. The packaging engineers selected a three-layer packaging structure: the cereal is enclosed inside an airtight "
        "sealed foil pouch (Primary Package) to prevent moisture contamination; this pouch is placed inside an attractive cardboard "
        "box with vibrant graphics and nutritional charts (Secondary Package); and twenty-four such boxes are packed in heavy "
        "corrugated cardboard cartons (Transportation Package) for long-distance transit. The label on the cardboard box clearly "
        "displays the FSSAI license number, green vegetarian logo, net weight, manufacturing date, expiry date, maximum retail price "
        "(MRP), and statutory allergy warnings, fully complying with legal requirements."
    ),
    [
        (
            "A brand name or visual symbol that is given statutory legal protection against imitation is known as a:",
            "Trademark",
            ["Patent", "Copyright", "Trade Secret"],
            "A",
            "1. A brand that is given legal protection through registration is called a Trademark, granting exclusive legal rights of usage to the owner.\nHence, Option {{CORR}} is correct.",
            "Defines Trademark."
        ),
        (
            "In NutriBite's three-tier packaging architecture, what role does the sealed airtight foil pouch represent?",
            "Primary Packaging",
            ["Secondary Packaging", "Transportation Packaging", "Tertiary Protective Buffer"],
            "B",
            "1. Primary packaging refers to the immediate container of the product that remains with the product until it is ready to be used.\nHence, Option {{CORR}} is correct.",
            "Identifies Primary Package."
        ),
        (
            "What is the primary function of the heavy corrugated cardboard carton holding 24 cereal boxes?",
            "Transportation Packaging (facilitating protection, storage, and handling during transit)",
            ["Silent salesman promotional display on retail shelves", "Consumer kitchen tabletop decoration", "Primary edible container for direct human consumption"],
            "C",
            "1. Transportation packaging provides necessary protection to goods during transportation, storage, and handling across supply chain networks.\nHence, Option {{CORR}} is correct.",
            "Defines function of Transportation Packaging."
        ),
        (
            "Which function of packaging is illustrated when vibrant graphics and health charts on the secondary box attract shoppers on supermarket shelves?",
            "Silent Salesman / Product Promotion",
            ["Strict Production Cost Minimization", "Statutory Tariff Elimination", "Direct Inventory Liquidation"],
            "D",
            "1. Packaging serves as a 'silent salesman' in self-service retail stores, attracting customer attention and communicating product benefits.\nHence, Option {{CORR}} is correct.",
            "Explains packaging as silent salesman."
        ),
        (
            "Displaying mandatory allergen warnings, FSSAI license number, and nutritional composition on the box fulfills which function of labelling?",
            "Fulfilling Legal / Statutory Requirements and Providing Information",
            ["Physical transit shock absorption", "Creating exclusive monopolistic barriers", "Reducing wholesale excise duty rates"],
            "A",
            "1. Labelling provides essential information about contents, usage, safety warnings, and fulfills mandatory statutory requirements under law.\nHence, Option {{CORR}} is correct.",
            "Identifies statutory compliance function of labelling."
        )
    ]
))

# Passage 33: Pricing Factors & Pricing Strategies at Electra Mobility
part2_passages_data.append((
    "Marketing Management",
    "Pricing Factors and Strategies",
    (
        "Electra Mobility Ltd. has engineered a cutting-edge electric two-wheeler equipped with AI navigation and rapid-swapping "
        "battery technology. The executive committee is deliberating on the pricing strategy for its commercial launch. The production "
        "director emphasizes that the price must cover total manufacturing costs (fixed tooling costs plus variable battery component "
        "costs) along with a reasonable profit margin ('Cost-plus pricing'). The marketing head, however, argues that pricing must "
        "reflect the utility and intensity of customer demand: urban delivery riders place immense value on battery swapping speed "
        "and are willing to pay a premium. The corporate strategy director reminds the board that two aggressive competitors have "
        "announced comparable electric scooters priced at Rs. 95,00, setting a strict competitive ceiling. Finally, the legal counsel "
        "points out that the Central Government provides a direct FAME-II subsidy of Rs. 15,000 per vehicle, which can be passed on "
        "to reduce the effective price paid by end-consumers."
    ),
    [
        (
            "What factor sets the absolute minimum floor price below which an enterprise cannot sell its product in the long run?",
            "Total Product Cost (Fixed, Variable, and Semi-variable Costs)",
            ["Maximum Consumer Demand Elasticity", "Competitor's Highest Retail Price", "Statutory Municipal Stamp Duty"],
            "A",
            "1. Cost of the product determines the minimum price (floor price) at which the product may be sold without incurring operating losses.\nHence, Option {{CORR}} is correct.",
            "Identifies product cost as price floor."
        ),
        (
            "What factor sets the upper limit or ceiling price that consumers are willing to pay for a product?",
            "The utility of the product and the intensity of buyer demand",
            ["The historical cost of machinery depreciation", "The contractual salary of the company's marketing directors", "The nominal interest rate charged on bank overdrafts"],
            "B",
            "1. The utility provided by the product and the buyer's intensity of demand determine the upper limit (ceiling) of price that a customer is willing to pay.\nHence, Option {{CORR}} is correct.",
            "Identifies utility and demand intensity as price ceiling."
        ),
        (
            "When Electra Mobility considers rival electric scooters priced at Rs. 95,000, which determinant of pricing is it evaluating?",
            "Extent of Competition in the Market",
            ["Government Price Regulation Act 1955", "Statutory Cash Reserve Ratio", "Internal Delegation of Line Authority"],
            "C",
            "1. The prices of competitor products and their likely reactions establish a crucial reference range within which the firm must fix its price.\nHence, Option {{CORR}} is correct.",
            "Identifies competition as key pricing factor."
        ),
        (
            "If Electra Mobility decides to set an initial high price to recover research and development expenses from early tech-adopters, what pricing strategy is it following?",
            "Price Skimming Strategy",
            ["Market Penetration Pricing", "Distress Liquidation Pricing", "Predatory Zero-Price Strategy"],
            "D",
            "1. Price skimming involves setting a high introductory price for an innovative product to 'skim' surplus revenue from less price-sensitive early buyers.\nHence, Option {{CORR}} is correct.",
            "Identifies Price Skimming strategy."
        ),
        (
            "Conversely, setting a very low introductory price to capture a massive market share and discourage potential competitors is termed:",
            "Penetration Pricing",
            ["Skimming Pricing", "Cost-plus Markup Pricing", "Prestige Status Pricing"],
            "A",
            "1. Market penetration pricing involves setting a low initial price to rapidly attract a large volume of customers and capture extensive market share.\nHence, Option {{CORR}} is correct.",
            "Identifies Penetration Pricing."
        )
    ]
))

# Passage 34: Channels of Distribution at CraftVillas Furniture
part2_passages_data.append((
    "Marketing Management",
    "Physical Distribution and Channels of Distribution",
    (
        "CraftVillas Ltd. designs bespoke solid-wood modular furniture crafted by master artisans in Rajasthan. Initially, the "
        "company operated through a traditional three-level distribution channel: Manufacturer -> C&F Agents -> Wholesalers -> "
        "Independent Furniture Retailers -> End Consumers. However, the management observed serious drawbacks: markups charged by "
        "each intermediary inflated the final retail price by over 60%, delicate handcrafted dining tables suffered extensive transit "
        "breakage during repeated unloading across warehouses, and valuable consumer feedback regarding modular designs never reached "
        "the factory artisans. To regain control over customer experience, CraftVillas dismantled this multi-tier channel. It adopted "
        "a direct zero-level channel (Direct Marketing), launching an experiential digital showroom website and opening company-owned "
        "flagship experience studios in top metro cities, delivering assembled furniture directly to homeowners using dedicated "
        "cushioned logistics vans."
    ),
    [
        (
            "What is a 'Zero-level' channel of distribution?",
            "Direct distribution from Manufacturer to Consumer with zero market intermediaries",
            ["A channel involving one wholesaler and two sub-brokers", "A distribution network operated exclusively by government cooperatives", "A channel where goods are sold through foreign multinational bourses"],
            "A",
            "1. A zero-level channel (direct marketing) is one where the goods move directly from the manufacturer to the customer without any middleman.\nHence, Option {{CORR}} is correct.",
            "Defines Zero-level distribution channel."
        ),
        (
            "In CraftVillas' original three-level channel, what was the primary role of the wholesaler?",
            "Buying in large quantities from manufacturers/agents, breaking bulk, and selling in smaller lots to retailers",
            ["Providing home assembly and warranty services directly to end homeowners", "Manufacturing the primary wooden components inside company workshops", "Passing special parliamentary statutes on consumer credit"],
            "B",
            "1. Wholesalers purchase in large bulk quantities from producers, hold warehouse inventory, and distribute goods in smaller lots to retail shops.\nHence, Option {{CORR}} is correct.",
            "Identifies role of wholesaler."
        ),
        (
            "Which factor strongly supported CraftVillas' decision to switch to direct distribution for its bespoke modular furniture?",
            "Bulky, fragile, customized nature of goods and the need for personalized customer service",
            ["Cheap perishable nature of fast-moving consumer packaged goods", "Mass consumption of standardized low-cost commodities across rural markets", "Total absence of digital internet connectivity in urban metro areas"],
            "C",
            "1. Heavy, expensive, fragile, or customized products require shorter or direct channels to prevent transit damage and ensure proper installation service.\nHence, Option {{CORR}} is correct.",
            "Identifies product characteristics favoring direct channels."
        ),
        (
            "Physical distribution involves four major operational components: Order Processing, Transportation, Warehousing, and:",
            "Inventory Control",
            ["Executive Dividend Payout", "Securities Dematerialization", "Job Enrichment Scheduling"],
            "D",
            "1. The four major elements of physical distribution are: Order processing, Transportation, Warehousing, and Inventory control.\nHence, Option {{CORR}} is correct.",
            "Identifies Inventory Control as fourth element of physical distribution."
        ),
        (
            "A distribution channel consisting of: Manufacturer -> Retailer -> Consumer is classified as a:",
            "One-level Channel",
            ["Two-level Channel", "Three-level Channel", "Zero-level Channel"],
            "A",
            "1. A channel with only one intermediary (the retailer) between producer and consumer is known as a one-level channel.\nHence, Option {{CORR}} is correct.",
            "Identifies One-level channel."
        )
    ]
))

# Passage 35: Promotion Mix & Integrated Marketing at BrightSpark Appliances
part2_passages_data.append((
    "Marketing Management",
    "Promotion Mix Elements",
    (
        "BrightSpark Appliances Ltd. is introducing an intelligent water purifier that utilizes IoT sensors to monitor water "
        "purity and filter lifespan. To ensure a triumphant nationwide launch, the marketing director orchestrated a comprehensive "
        "Promotion Mix combining all four promotional tools. First, the company launched high-impact television commercials and digital "
        "billboards featuring a celebrity Olympian champion emphasizing public health and family wellness ('Advertising'). Second, "
        "to overcome customer hesitation regarding complex IoT setup, BrightSpark recruited trained technical sales representatives "
        "who visited housing societies to conduct live water testing and demonstrate filter installation face-to-face ('Personal "
        "Selling'). Third, to generate immediate purchase momentum during the festival week, the company offered a limited-period "
        "incentive: 'Buy 1 Purifier and get a free Rs. 2,500 Stainless Steel Cookware Set plus a Scratch Card with 100% cashback chance' "
        "('Sales Promotion'). Finally, the company held a national press conference in New Delhi partnering with clean water NGOs to "
        "fund drinking water plants in 100 rural schools, earning positive editorial coverage across leading news dailies ('Public "
        "Relations')."
    ),
    [
        (
            "What is a defining characteristic of 'Advertising' as an element of the promotion mix?",
            "It is an impersonal, paid form of non-personal presentation and promotion of ideas, goods, or services by an identified sponsor",
            ["It involves face-to-face direct oral presentation between a salesperson and a prospective buyer", "It consists exclusively of short-term monetary rebates and discount coupons", "It provides unpaid, unsolicited third-party editorial commentary"],
            "A",
            "1. Advertising is defined as any paid form of non-personal presentation and promotion of ideas, goods, or services by an identified sponsor.\nHence, Option {{CORR}} is correct.",
            "Defines Advertising."
        ),
        (
            "Which promotional tool is best suited for complex, technical industrial products requiring live operational demonstrations and personal relationship building?",
            "Personal Selling",
            ["Mass Radio Jingles", "Broadcast Television Commercials", "Transit Railway Posters"],
            "B",
            "1. Personal selling involves personal interaction, allowing the salesperson to adapt the pitch, answer specific technical questions, and build buyer conviction.\nHence, Option {{CORR}} is correct.",
            "Identifies Personal Selling for technical products."
        ),
        (
            "The festival incentive offering a 'Free Stainless Steel Cookware Set' and 'Scratch Card Cashback' is an example of which promotional tool?",
            "Sales Promotion",
            ["Public Relations", "Corporate Lobbying", "Institutional Advertising"],
            "C",
            "1. Sales promotion consists of short-term incentives like premiums, gifts, contests, and price-offs designed to stimulate immediate consumer purchases.\nHence, Option {{CORR}} is correct.",
            "Identifies Sales Promotion."
        ),
        (
            "Organizing a press conference and funding rural school water filtration plants to cultivate favorable public goodwill exemplifies:",
            "Public Relations (PR)",
            ["Direct Mail Solicitation", "Aggressive Door-to-Door Canvassing", "Predatory Pricing War"],
            "D",
            "1. Public Relations involves managing relationships with various stakeholders and the public to create and sustain a positive image of the company.\nHence, Option {{CORR}} is correct.",
            "Identifies Public Relations."
        ),
        (
            "Which sales promotion technique involves offering an extra quantity of the same product at the normal price (e.g. 'Buy 2 Get 1 Free')?",
            "Quantity Gift (Extra product offer)",
            ["Rebate on damaged goods", "Full refund upon complaint", "Usable benefit coupon"],
            "A",
            "1. Offering extra product quantity without additional price (such as 'Buy 2 get 1 free' or '20% extra') is categorized as a Quantity Gift technique.\nHence, Option {{CORR}} is correct.",
            "Identifies Quantity Gift technique."
        )
    ]
))

# Passage 36: Sales Promotion Techniques & Advertising Objections at FreshDairy
part2_passages_data.append((
    "Marketing Management",
    "Sales Promotion Techniques and Advertising Debates",
    (
        "FreshDairy Ltd. manufactures probiotic yogurts and flavored milk beverages. To boost sales during the summer season, "
        "the brand manager implemented diverse sales promotion techniques: (1) offering a flat Rs. 10 instant price deduction off "
        "the marked retail price printed on the pack ('Discount'); (2) distributing free 50g tasting sample tubs outside primary "
        "schools and fitness gym centers ('Sampling'); and (3) a contest where buyers send unique pack codes via SMS to win a holiday "
        "package to Switzerland ('Lucky Draw / Contest'). During a board review, a critical director objected to the heavy promotional "
        "budget, arguing that advertising adds to product cost, creates artificial consumer desires, encourages consumerism, and "
        "sometimes misleads the public through exaggerated claims. The marketing director vigorously defended advertising, asserting "
        "that mass advertising expands market demand, generates economies of large-scale production which lowers per-unit manufacturing "
        "costs, informs consumers about product availability, and supports economic growth and employment."
    ),
    [
        (
            "Distributing free small packages of a new product to potential customers to induce trial is known as:",
            "Sampling",
            ["Contest", "Rebate", "Usable Coupon"],
            "A",
            "1. Sampling involves distributing free samples of a product to potential buyers to induce them to try a new product and generate brand preference.\nHence, Option {{CORR}} is correct.",
            "Defines Sampling."
        ),
        (
            "How does the marketing director counter the criticism that 'Advertising adds to the cost of the product'?",
            "By showing that advertising expands demand, enabling mass production which lowers per-unit fixed manufacturing costs",
            ["By demonstrating that advertising eliminates corporate income taxes completely", "By forcing retail distributors to work without trade commissions", "By replacing physical delivery with digital download links"],
            "B",
            "1. While advertising involves expenses, it increases aggregate demand, facilitating large-scale production and distribution, which lowers average cost per unit.\nHence, Option {{CORR}} is correct.",
            "Explains economic justification of advertising cost."
        ),
        (
            "Which criticism of advertising relates to presenting exaggerated or false claims about product efficacy?",
            "Confuses the buyers / Misleading advertising",
            ["Fosters healthy price competition", "Encourages research and development", "Stimulates artistic and literary creativity"],
            "C",
            "1. Misleading advertising misrepresents facts, makes false quality claims, and exploits consumer vulnerability, which constitutes an ethical and regulatory offense.\nHence, Option {{CORR}} is correct.",
            "Identifies misleading advertising objection."
        ),
        (
            "Offering a product at a special reduced price to clear surplus or seasonal inventory (e.g. selling at Rs. 50 off MRP) is called:",
            "Discount / Rebate",
            ["Product Sampling", "Trademark Licensing", "Secondary Packaging"],
            "D",
            "1. Discount or rebate involves offering products at special reduced prices below the list price to stimulate immediate sales or clear inventory.\nHence, Option {{CORR}} is correct.",
            "Defines Discount / Rebate."
        ),
        (
            "Which of the following is NOT an element of the traditional Marketing Mix (4 Ps)?",
            "Partnership",
            ["Product", "Price", "Place (Physical Distribution)"],
            "A",
            "1. The 4Ps of the marketing mix are Product, Price, Place, and Promotion. 'Partnership' is not one of the classical 4Ps.\nHence, Option {{CORR}} is correct.",
            "Identifies Partnership as outside the 4Ps."
        )
    ]
))

# =================================================================================================
# UNIT 12: CONSUMER PROTECTION (Passages 37 to 40)
# =================================================================================================

# Passage 37: Consumer Protection Act 2019 & Redressal Jurisdictions
part2_passages_data.append((
    "Consumer Protection",
    "Consumer Protection Act 2019 and Redressal Machinery",
    (
        "Under the Consumer Protection Act, 2019 (CPA 2019), a robust three-tier quasi-judicial machinery is established to "
        "provide simple, speedy, and inexpensive redressal of consumer disputes in India: District Consumer Disputes Redressal "
        "Commission (District Commission), State Consumer Disputes Redressal Commission (State Commission), and the National "
        "Consumer Disputes Redressal Commission (National Commission). An aggrieved consumer, Mr. Raghav, purchased an electric "
        "SUV costing Rs. 42 Lakhs from an authorized dealer in Bhopal. Within two months, the vehicle suffered severe battery "
        "malfunctions causing spontaneous power shutdowns on national highways. The authorized service center failed to rectify "
        "the manufacturing defect despite six attempts. Mr. Raghav decided to file a formal consumer complaint seeking full refund "
        "of Rs. 42 Lakhs along with Rs. 8 Lakhs as compensation for mental harassment, making a total claim value of Rs. 50 Lakhs. "
        "He inquired about the proper forum and statutory appeal timelines under CPA 2019."
    ),
    [
        (
            "Under the Consumer Protection Act 2019, which redressal commission has pecuniary jurisdiction to entertain complaints where the value of goods or services paid does not exceed Rs. 50 Lakhs (as revised)?",
            "District Consumer Disputes Redressal Commission (District Commission)",
            ["State Consumer Disputes Redressal Commission", "National Consumer Disputes Redressal Commission", "Supreme Court of India directly"],
            "A",
            "1. Under the CPA 2019 framework (and subsequent pecuniary rules), claims where the consideration paid is up to Rs. 50 Lakhs fall under the District Commission's jurisdiction.\nHence, Option {{CORR}} is correct.",
            "Identifies District Commission pecuniary jurisdiction."
        ),
        (
            "If an aggrieved consumer is dissatisfied with the final order passed by the District Commission, where and within how many days can an appeal be filed?",
            "To the State Commission within 45 days from the date of the order",
            ["To the local police station within 24 hours", "To the National Commission within 90 days", "To the International Court of Justice within 1 year"],
            "B",
            "1. Under CPA 2019, any person aggrieved by an order made by the District Commission may prefer an appeal against such order to the State Commission within 45 days.\nHence, Option {{CORR}} is correct.",
            "Identifies appeal timeline from District to State Commission as 45 days."
        ),
        (
            "Which redressal commission has original pecuniary jurisdiction to entertain claims where the consideration paid exceeds Rs. 2 Crore?",
            "National Consumer Disputes Redressal Commission",
            ["District Consumer Commission", "Gram Panchayat Redressal Tribunal", "Municipal Corporation Ward Committee"],
            "C",
            "1. Claims where the value of consideration paid exceeds Rs. 2 Crore fall under the original jurisdiction of the National Commission.\nHence, Option {{CORR}} is correct.",
            "Identifies National Commission jurisdiction for claims over Rs. 2 Crore."
        ),
        (
            "An order passed by the National Commission in exercise of its original jurisdiction can be appealed directly before the:",
            "Supreme Court of India (within 30 days)",
            ["High Court of the respective state", "President of the District Commission", "Ministry of Corporate Affairs"],
            "D",
            "1. Any person aggrieved by an order of the National Commission passed in its original jurisdiction may prefer an appeal to the Supreme Court of India within 30 days.\nHence, Option {{CORR}} is correct.",
            "Identifies Supreme Court as appellate forum for National Commission orders."
        ),
        (
            "Which apex regulatory authority was newly established under CPA 2019 to regulate matters relating to violation of consumer rights, unfair trade practices, and false/misleading advertisements?",
            "Central Consumer Protection Authority (CCPA)",
            ["Monopolies and Restrictive Trade Practices Commission (MRTPC)", "Reserve Bank Ombudsman", "Law Commission of India"],
            "A",
            "1. The CPA 2019 established the Central Consumer Protection Authority (CCPA) to protect, promote, and enforce the rights of consumers as a class.\nHence, Option {{CORR}} is correct.",
            "Identifies CCPA established under CPA 2019."
        )
    ]
))

# Passage 38: Six Consumer Rights at GreenLife Electronics
part2_passages_data.append((
    "Consumer Protection",
    "Consumer Rights under CPA 2019",
    (
        "Sunita bought a branded microwave oven from GreenLife Electronics. When unpacking the appliance at home, she noticed "
        "that the package did not contain any operating manual, electrical safety rating, or ISI certification mark. When she "
        "plugged it in, the appliance emitted sparks due to faulty internal wiring, causing minor burns on her hand ('Right to Safety'). "
        "When Sunita contacted the store manager demanding technical specifications and the manufacturer's address, the manager "
        "rudely refused to share any details, declaring that sale items are sold strictly 'as is' without warranty ('Right to be Informed'). "
        "Furthermore, when she insisted on returning the dangerous oven, the manager forced her to accept a costlier imported toaster "
        "instead, refusing to allow her to choose another product or get a refund ('Right to Assured / Right to Choose'). Sunita decided "
        "to approach the consumer forum to lodge a formal grievance ('Right to be Heard' and 'Right to Seek Redressal'). She also enrolled "
        "in a local consumer awareness seminar to educate herself on statutory protections ('Right to Consumer Education')."
    ),
    [
        (
            "Which consumer right was violated when the appliance emitted electrical sparks due to absence of safety standards, causing physical injury?",
            "Right to Safety",
            ["Right to Representation", "Right to Consumer Education", "Right to Clean Environment"],
            "A",
            "1. The Right to Safety ensures protection against marketing of goods and services that are hazardous to life and property.\nHence, Option {{CORR}} is correct.",
            "Identifies violation of Right to Safety."
        ),
        (
            "Which consumer right guarantees the customer access to complete information regarding quality, quantity, potency, purity, standard, and price of goods?",
            "Right to be Informed",
            ["Right to Form Monopolies", "Right to Unlimited Credit", "Right to Evade Sales Tax"],
            "B",
            "1. The Right to be Informed gives consumers the right to know details of products/services to protect against unfair trade practices.\nHence, Option {{CORR}} is correct.",
            "Defines Right to be Informed."
        ),
        (
            "Forcing Sunita to accept an unwanted toaster rather than offering free selection across various products violated her:",
            "Right to Choose / Right to be Assured",
            ["Right to Safety", "Right to Consumer Education", "Right to Privacy"],
            "C",
            "1. The Right to be Assured (Right to Choose) means the right to be assured access to a variety of goods and services at competitive prices without coercion.\nHence, Option {{CORR}} is correct.",
            "Identifies violation of Right to Choose."
        ),
        (
            "The right of an aggrieved consumer to seek relief against unfair trade practices, defect in goods, or deficiency of services is known as:",
            "Right to Seek Redressal",
            ["Right to Arbitrary Seizure", "Right to Commercial Immunity", "Right to Restrict Competition"],
            "D",
            "1. The Right to Seek Redressal ensures that consumers can seek remedies against unfair trade practices, including replacement, removal of defects, or compensation.\nHence, Option {{CORR}} is correct.",
            "Defines Right to Seek Redressal."
        ),
        (
            "The right to acquire the knowledge and skill to be an informed consumer throughout life is termed:",
            "Right to Consumer Education",
            ["Right to be Heard", "Right to Basic Needs", "Right to Unregulated Trade"],
            "A",
            "1. The Right to Consumer Education ensures consumers have access to knowledge regarding their statutory rights and available legal remedies.\nHence, Option {{CORR}} is correct.",
            "Defines Right to Consumer Education."
        )
    ]
))

# Passage 39: Consumer Responsibilities & Reliefs Available
part2_passages_data.append((
    "Consumer Protection",
    "Consumer Responsibilities and Reliefs Available",
    (
        "Vivek purchased a 1.5-ton split air conditioner from a retail appliances store during a summer clearance sale. "
        "The shopkeeper offered a 10% cash discount if Vivek agreed to waive the official cash memo and tax invoice. Vivek eagerly "
        "accepted the cash transaction without obtaining a cash memo. Three weeks later, the compressor burned out. When Vivek "
        "approached the store demanding a replacement compressor or refund, the store proprietor flatly denied ever selling the "
        "unit to Vivek. Vivek realized that by failing to demand a Cash Memo, he violated a fundamental consumer responsibility, "
        "severely jeopardizing his legal standing in a consumer court. Had Vivek possessed the cash memo and filed a successful "
        "complaint under the Consumer Protection Act, the Commission could have granted various statutory reliefs: removal of defects, "
        "replacement with a brand new defect-free unit, refund of price paid, or award of punitive damages for gross negligence."
    ),
    [
        (
            "What fundamental consumer responsibility did Vivek neglect when purchasing the air conditioner?",
            "Insisting on a Cash Memo as proof of purchase",
            ["Refusing to pay using credit card tokens", "Failing to inspect the shopkeeper's municipal trading license", "Refusing to sign an unconditional corporate disclaimer"],
            "A",
            "1. Demanding a cash memo is an indispensable consumer responsibility because it serves as documentary proof of purchase in consumer court proceedings.\nHence, Option {{CORR}} is correct.",
            "Identifies failure to obtain cash memo as neglected responsibility."
        ),
        (
            "Why is a Cash Memo considered essential evidence when instituting proceedings before a Consumer Commission?",
            "Because it provides conclusive documentary evidence of the transaction, purchase date, and consideration paid",
            ["Because consumer courts only accept cash transactions and ban bank payments", "Because cash memos automatically transfer ownership of the store to the consumer", "Because it guarantees that the manufacturer will never face civil litigation"],
            "B",
            "1. A cash memo acts as legal proof of purchase without which a consumer cannot substantiate the transaction before a redressal agency.\nHence, Option {{CORR}} is correct.",
            "Explains evidentiary value of Cash Memo."
        ),
        (
            "Which of the following is an authorized relief/remedy that a Consumer Commission can order against a defective product manufacturer under CPA 2019?",
            "Directing replacement of the defective product with a new defect-free product",
            ["Sentencing the shopkeeper's family members to military service", "Permanently nationalizing all assets of the retail company", "Ordering the Reserve Bank to alter interest rates"],
            "C",
            "1. Consumer commissions can order removal of defects, replacement of goods, refund of price, compensation for injury, or discontinuance of unfair practices.\nHence, Option {{CORR}} is correct.",
            "Identifies replacement of defective goods as valid relief."
        ),
        (
            "Which quality certification mark must an alert consumer look for when purchasing industrial electrical appliances like air conditioners, irons, and switches in India?",
            "ISI Mark (Bureau of Indian Standards)",
            ["AGMARK", "FPO Mark", "Hallmark"],
            "D",
            "1. The ISI mark issued by the Bureau of Indian Standards (BIS) certifies safety and quality standards for industrial and electrical consumer appliances.\nHence, Option {{CORR}} is correct.",
            "Identifies ISI mark for electrical appliances."
        ),
        (
            "Which quality mark is mandatory for certifying the purity of gold and silver jewelry in India?",
            "Hallmark",
            ["AGMARK", "ISI Mark", "Eco-mark"],
            "A",
            "1. Hallmark is the official certification mark issued by the Bureau of Indian Standards to certify the purity and fineness of precious gold and silver jewelry.\nHence, Option {{CORR}} is correct.",
            "Identifies Hallmark for gold/silver purity."
        )
    ]
))

# Passage 40: Role of Consumer Organizations & NGOs
part2_passages_data.append((
    "Consumer Protection",
    "Role of Consumer Organizations and NGOs",
    (
        "In India, non-governmental organizations (NGOs) and consumer organizations play an indispensable role in safeguarding "
        "consumer welfare and promoting grassroots awareness. Organizations such as VOICE (Voluntary Organisation in Interest "
        "of Consumer Education, New Delhi), Consumer Education and Research Centre (CERC, Ahmedabad), and Consumers Association "
        "(Kolkata) carry out varied functions: conducting independent laboratory tests on consumer products like packaged cooking "
        "oils and bottled drinking water to test for adulteration; publishing comparative findings in consumer periodicals like "
        "'Consumer Voice'; providing free legal counseling to illiterate and unorganized consumers; and filing public interest "
        "litigations (PIL) or representative complaints before consumer commissions on behalf of consumers as a class. Under the "
        "Consumer Protection Act 2019, any registered consumer association has statutory standing to file a consumer complaint "
        "even if the association itself was not the purchaser of the defective good, giving voice to millions of unorganized citizens."
    ),
    [
        (
            "Which legal right enables registered consumer organizations to file complaints on behalf of consumers as a class under CPA 2019?",
            "Statutory standing to file representative complaints on behalf of consumer groups",
            ["Absolute sovereign immunity from civil prosecution", "Unilateral police powers to arrest corporate executives", "Authority to issue currency notes on behalf of the Reserve Bank"],
            "A",
            "1. Under CPA 2019, any recognized consumer association registered under law has the statutory right to file a complaint on behalf of one or more consumers.\nHence, Option {{CORR}} is correct.",
            "Identifies statutory standing of consumer organizations."
        ),
        (
            "What critical activity is undertaken by NGOs like CERC and VOICE to test commercial claims made by manufacturers?",
            "Conducting independent laboratory testing of consumer products and publishing comparative results",
            ["Fixing statutory maximum retail prices for private manufacturers", "Approving export licenses for agricultural commodities", "Regulating trading hours on the National Stock Exchange"],
            "B",
            "1. Consumer NGOs conduct independent lab tests of consumer products (e.g. food items, medicines) and publish findings to educate consumers on true quality.\nHence, Option {{CORR}} is correct.",
            "Identifies lab testing and publishing results as key NGO activity."
        ),
        (
            "Which quality mark certifies the quality and purity of agricultural products like honey, pulses, and edible oils in India?",
            "AGMARK",
            ["ISI Mark", "Hallmark", "FSSAI Registration"],
            "C",
            "1. AGMARK is an agricultural certification mark employed on agricultural products in India, assuring that they conform to standards set by the Directorate of Marketing and Inspection.\nHence, Option {{CORR}} is correct.",
            "Identifies AGMARK for agricultural products."
        ),
        (
            "Which of the following is a prominent non-governmental consumer organization based in Ahmedabad, Gujarat?",
            "Consumer Education and Research Centre (CERC)",
            ["Securities and Exchange Board of India (SEBI)", "Federation of Indian Chambers of Commerce & Industry (FICCI)", "Confederation of Indian Industry (CII)"],
            "D",
            "1. CERC (Consumer Education and Research Centre) based in Ahmedabad is one of India's most prominent consumer protection NGOs.\nHence, Option {{CORR}} is correct.",
            "Identifies CERC Ahmedabad."
        ),
        (
            "Under CPA 2019, a 'Consumer' is defined as any person who:",
            "Buys goods or hires services for consideration, but excludes a person who obtains goods for resale or commercial purposes",
            ["Purchases goods for commercial resale at wholesale margins", "Receives goods completely free of cost as state charity", "Steals merchandise from a retail supermarket warehouse"],
            "A",
            "1. Under CPA 2019, a consumer is a person who buys goods or avails services for consideration, explicitly excluding those who acquire goods for commercial purpose or resale.\nHence, Option {{CORR}} is correct.",
            "States statutory definition of Consumer under CPA 2019."
        )
    ]
))
