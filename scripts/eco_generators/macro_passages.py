# Macroeconomics Case Study Passages (Passages 21 to 40)
# Each entry: (chapter, topic, passage_text, [5 questions: (stem, correct_text, wrong_texts, target_id, solution, mistake_analysis)])

macro_passages_data = [
    # Passage 21: Circular Flow of Income in Modern Economy
    (
        "National Income and Related Aggregates",
        "Circular Flow of Income",
        (
            "The Circular Flow of Income is a macroeconomic model depicting the perpetual movement of money, goods, and services "
            "between different sectors of an economy. In a simplified closed economy with household and business sectors, households own the "
            "factors of production (land, labor, capital, entrepreneurship) and supply factor services to business firms. "
            "In return, firms pay factor payments (rent, wages, interest, profit)—constituting the generation phase of national income. "
            "Households subsequently spend this factor income on consumption goods and services produced by firms—the disposition phase. "
            "The flow of physical goods and factor services across sectors constitutes the 'Real Flow', while the opposing flow of factor payments "
            "and consumption expenditures constitutes the 'Money Flow'. "
            "In an expanded economy, the financial sector acts as an intermediary where savings (leakages) are channeled into investment (injections). "
            "Macroeconomic equilibrium requires total leakages (Saving + Taxes + Imports) to equal total injections (Investment + Government Purchases + Exports)."
        ),
        [
            (
                "In the Circular Flow of Income, what does the 'Real Flow' consist of?",
                "The flow of factor services from households to firms and the flow of goods and services from firms to households",
                ["The flow of paper currency notes from the central bank to commercial banks", "The flow of tax receipts from businesses to municipal governments", "The flow of interest payments between private financial intermediaries"],
                "A",
                "1. Real Flow consists of the exchange of physical goods and services and factor inputs without monetary settlement.\nHence, Option {{CORR}} is correct.",
                "Defines Real Flow in circular flow model."
            ),
            (
                "What constitutes the 'Money Flow' (Nominal Flow) in the two-sector circular flow model?",
                "The flow of factor income payments from firms to households and consumption expenditures from households to firms",
                ["The physical transport of manufactured commodities across interstate highways", "The storage of gold bullion in the central bank's vaults", "The movement of migrant workers from rural farms to urban factories"],
                "B",
                "1. Money Flow represents the monetary counterpart to real flows: factor payments (wages, rent, interest, profit) and consumption expenditure.\nHence, Option {{CORR}} is correct.",
                "Defines Money Flow in circular flow model."
            ),
            (
                "Which set of economic variables constitutes 'Leakages' (withdrawals) from the circular flow of income?",
                "Savings (S), Taxes (T), and Imports (M)",
                ["Investment (I), Government Purchases (G), and Exports (X)", "Wages, Rent, Interest, and Dividends", "Subsidies, Welfare transfers, and Capital grants"],
                "C",
                "1. Leakages are channels that withdraw purchasing power from the domestic expenditure stream: Household Savings, Government Taxes, and Spending on Foreign Imports.\nHence, Option {{CORR}} is correct.",
                "Identifies Savings, Taxes, and Imports as leakages."
            ),
            (
                "Which set of variables represents 'Injections' into the circular flow of expenditure?",
                "Investment (I), Government Purchases (G), and Exports (X)",
                ["Savings (S), Taxes (T), and Imports (M)", "Depreciation allowances and inventory losses", "Personal income tax collections and customs tariffs"],
                "D",
                "1. Injections introduce additional spending into the circular flow: Business Investment, Government Expenditure, and Foreign Export Demand.\nHence, Option {{CORR}} is correct.",
                "Identifies Investment, Government spending, and Exports as injections."
            ),
            (
                "What macroeconomic condition ensures equilibrium in a four-sector open economy's circular flow?",
                "Total Leakages must equal Total Injections (S + T + M = I + G + X)",
                ["Total savings must equal total money supply in circulation", "Government taxes must equal zero", "Total exports must equal domestic consumption expenditure"],
                "A",
                "1. Circular flow equilibrium is maintained when total withdrawals (leakages) match total additions (injections): S + T + M = I + G + X.\nHence, Option {{CORR}} is correct.",
                "States circular flow equilibrium condition: Leakages = Injections."
            )
        ]
    ),

    # Passage 22: Real vs Nominal GDP & GDP Deflator
    (
        "National Income and Related Aggregates",
        "Real vs Nominal GDP & GDP Deflator",
        (
            "Gross Domestic Product (GDP) is the primary indicator of an economy's aggregate output. "
            "However, measuring GDP in monetary terms presents an analytical challenge because GDP can increase either due to an actual increase "
            "in physical production or merely due to an increase in market prices. "
            "Nominal GDP evaluates current year production at prevailing current market prices (Nominal GDP = Σ P_t × Q_t). "
            "Real GDP evaluates current year production at constant base year prices (Real GDP = Σ P_0 × Q_t), successfully isolating changes "
            "in physical volume from inflationary price distortions. "
            "The ratio between Nominal GDP and Real GDP provides the most comprehensive measure of economy-wide inflation, known as the GDP Deflator: "
            "GDP Deflator = (Nominal GDP / Real GDP) × 100. "
            "Unlike the Consumer Price Index (CPI), which tracks a fixed basket of consumer commodities, the GDP Deflator encompasses all domestically "
            "produced final goods and services, allowing the composition of output to change dynamically over time."
        ),
        [
            (
                "Why is 'Real GDP' considered a superior measure of economic growth compared to 'Nominal GDP'?",
                "Because Real GDP eliminates the distorting effect of price inflation by valuing output at constant base year prices",
                ["Because Real GDP includes the market value of second-hand goods", "Because Real GDP is calculated exclusively in terms of foreign US Dollars", "Because Real GDP includes domestic household non-market caregiving services"],
                "A",
                "1. Real GDP values output at constant base-year prices, ensuring that any observed increase reflects genuine physical expansion in goods and services rather than price inflation.\nHence, Option {{CORR}} is correct.",
                "Explains why Real GDP is superior for measuring real economic growth."
            ),
            (
                "What is the mathematical formula for calculating the 'GDP Deflator'?",
                "GDP Deflator = (Nominal GDP / Real GDP) × 100",
                ["GDP Deflator = (Real GDP / Nominal GDP) × 100", "GDP Deflator = Nominal GDP - Real GDP", "GDP Deflator = (Consumer Price Index / Wholesale Price Index) × 100"],
                "B",
                "1. The GDP Deflator is defined as the ratio of Nominal GDP to Real GDP expressed as a percentage: (Nominal GDP / Real GDP) × 100.\nHence, Option {{CORR}} is correct.",
                "States the GDP Deflator formula."
            ),
            (
                "If an economy's Nominal GDP is ₹15,000 crore and its Real GDP is ₹12,000 crore, what is the value of the GDP Deflator?",
                "125",
                ["80", "150", "120"],
                "C",
                "1. GDP Deflator = (Nominal GDP / Real GDP) × 100 = (15,000 / 12,000) × 100 = 1.25 × 100 = 125.\n2. This indicates that the general price level has risen by 25% since the base year.\nHence, Option {{CORR}} is correct.",
                "Calculates GDP Deflator = (15000 / 12000) * 100 = 125."
            ),
            (
                "What is the primary conceptual difference between the GDP Deflator and the Consumer Price Index (CPI)?",
                "The GDP Deflator includes all domestically produced final goods and services, while CPI tracks a fixed basket of consumer goods (including imports)",
                ["The GDP Deflator is measured weekly while CPI is measured once every ten years", "The GDP Deflator is restricted to agricultural crops while CPI covers industrial machinery", "The GDP Deflator measures only corporate profits while CPI measures wages"],
                "D",
                "1. The GDP Deflator covers all domestically produced goods and services without imported goods. CPI tracks a fixed basket of consumer goods and includes imported consumer goods.\nHence, Option {{CORR}} is correct.",
                "Distinguishes GDP Deflator from Consumer Price Index."
            ),
            (
                "If the GDP Deflator is exactly 100 in a given financial year, what does this indicate?",
                "The current year's price level is identical to the base year's price level (Nominal GDP = Real GDP)",
                ["The economy has achieved zero percent unemployment", "Physical production of goods has doubled", "The nation has eliminated all external debt"],
                "A",
                "1. When GDP Deflator = 100, Nominal GDP / Real GDP = 1 => Nominal GDP = Real GDP, meaning general price level is unchanged compared to the base year.\nHence, Option {{CORR}} is correct.",
                "Interprets GDP Deflator of 100 as zero price change from base year."
            )
        ]
    ),

    # Passage 23: GDP and Welfare Limitations
    (
        "National Income and Related Aggregates",
        "GDP as an Indicator of Welfare",
        (
            "Although Gross Domestic Product (GDP) is universally utilized as an indicator of economic performance, economists caution that "
            "GDP cannot be treated as an adequate or complete index of human and social welfare. "
            "This disconnect stems from several fundamental structural limitations: "
            "First, the Distribution of GDP: if GDP rises primarily due to surging wealth among the richest 1% while the poorest majority "
            "experiences stagnating or declining incomes, average social welfare does not increase. "
            "Second, Non-Monetary Exchanges: in developing economies like India, substantial productive labor (such as agricultural barter, "
            "unpaid household care work performed by women, and kitchen gardening) is not monetized and remains excluded from GDP calculations. "
            "Third, Externalities: GDP accounts for the value of industrial output but ignores negative environmental externalities "
            "(river pollution, urban smog, deforestation, respiratory illnesses) caused by factories. "
            "Fourth, Composition of GDP: an increase in GDP driven by manufacturing military weapons or hazardous tobacco does not enhance citizen well-being "
            "in the same manner as investments in schools, sanitation, and hospitals."
        ),
        [
            (
                "Why does an increase in GDP fail to reflect an improvement in social welfare if income inequality widens significantly?",
                "Because the gains of economic growth are concentrated in the hands of a wealthy minority, leaving the standard of living of the masses unimproved",
                ["Because high income inequality causes paper currency to physically deteriorate", "Because progressive taxes are legally prohibited when GDP expands", "Because commercial banks refuse to sanction loans to affluent citizens"],
                "A",
                "1. If GDP growth is concentrated among the rich, the welfare of the vast majority of citizens may stagnate or fall; aggregate GDP obscures unequal distribution.\nHence, Option {{CORR}} is correct.",
                "Explains distribution of GDP limitation."
            ),
            (
                "Why is unpaid domestic care work performed by homemakers excluded from National Income calculations?",
                "Because it is a non-monetary economic activity lacking market price valuation and exchange transactions",
                ["Because homemaking services have zero utility for family members", "Because international labor standards classify housework as leisure", "Because domestic caregiving is legally classified as an export service"],
                "B",
                "1. National income accounts for transactions occurring in markets with price tags. Non-monetary domestic care work does not enter the market and is excluded due to lack of reliable monetary data.\nHence, Option {{CORR}} is correct.",
                "Explains exclusion of non-monetary domestic work from GDP."
            ),
            (
                "How does the presence of Negative Environmental Externalities distort GDP as a welfare index?",
                "GDP includes the market value of industrial goods produced but deducts zero cost for the environmental degradation, pollution, and disease caused",
                ["GDP automatically subtracts the medical costs of respiratory patients from corporate profits", "Pollution increases the real purchasing power of rural agricultural workers", "Environmental damages are paid directly by foreign tourist travelers"],
                "C",
                "1. Producing goods adds to GDP, but the accompanying pollution, toxic dumping, and resource depletion are unpriced and ignored, overstating true economic welfare.\nHence, Option {{CORR}} is correct.",
                "Explains externality limitation of GDP."
            ),
            (
                "Why does the 'Composition of GDP' matter when evaluating whether economic growth enhances social welfare?",
                "Because an expansion driven by defense armaments and demerit goods does not improve human well-being as effectively as public health and education",
                ["Because military armaments are excluded from government expenditure", "Because hospital equipment is classified as financial speculation", "Because public schools do not generate tangible employment"],
                "D",
                "1. If GDP grows through weapons or harmful commodities, physical output numbers rise, but civilian human development and quality of life do not improve.\nHence, Option {{CORR}} is correct.",
                "Explains composition of GDP limitation."
            ),
            (
                "What modern composite index was developed by the United Nations to provide a broader measure of human welfare beyond mere GDP per capita?",
                "The Human Development Index (HDI), combining life expectancy, education, and per capita income",
                ["The Gross National Happiness Quota", "The Consumer Price Inflation Deflator", "The Cash Reserve Ratio Benchmark"],
                "A",
                "1. The Human Development Index (HDI), developed by Mahbub ul Haq and Amartya Sen for the UNDP, incorporates life expectancy, educational attainment, and GNI per capita to evaluate welfare.\nHence, Option {{CORR}} is correct.",
                "Identifies HDI as composite welfare index beyond GDP."
            )
        ]
    ),

    # Passage 24: Value Added Method & Double Counting
    (
        "National Income and Related Aggregates",
        "Value Added Method & Double Counting",
        (
            "In national income accounting, the Value Added Method measures the net contribution of each producing enterprise in the domestic territory. "
            "Gross Value Added (GVA) at market prices is defined as the value of output minus the value of intermediate consumption (GVA_MP = Value of Output - Intermediate Consumption). "
            "Value of Output equals Sales plus Change in Stock (Closing Stock - Opening Stock). "
            "Intermediate consumption represents the expenditure on raw materials and non-factor inputs purchased from other enterprises that are entirely consumed "
            "or transformed in the production process. "
            "The most critical hazard in national accounting is the Problem of Double Counting—counting the value of the same commodity more than once at various stages "
            "of production. For example, if a farmer sells wheat to a flour mill for ₹500, the mill converts it into flour and sells it to a baker for ₹800, "
            "and the baker makes bread and sells it to retail consumers for ₹1,200, summing their outputs yields ₹2,500 (500 + 800 + 1,200), which grossly overstates output! "
            "The correct GDP contribution is either the Final Value of the bread (₹1,200) or the sum of Value Added across all three stages: "
            "Farmer (₹500) + Mill (₹300) + Baker (₹400) = ₹1,200."
        ),
        [
            (
                "What is the mathematical definition of 'Gross Value Added at Market Price' (GVA_MP)?",
                "Value of Output minus Intermediate Consumption (Value of Output - Intermediate Consumption)",
                ["Total Sales plus Capital Depreciation", "Value of Output plus Net Indirect Taxes", "Factor Payments minus Import Outlays"],
                "A",
                "1. GVA_MP is obtained by deducting the value of intermediate inputs consumed from the total value of gross output: GVA_MP = Value of Output - Intermediate Consumption.\nHence, Option {{CORR}} is correct.",
                "States formula for GVA_MP."
            ),
            (
                "How is the 'Problem of Double Counting' defined in national income estimation?",
                "Counting the value of intermediate goods multiple times at successive stages of production alongside final goods",
                ["Filing two identical income tax returns with the revenue authorities", "Recording bank transactions in both debit and credit ledgers", "Printing duplicate currency notes with the same serial numbers"],
                "B",
                "1. Double counting occurs when the value of intermediate inputs is counted once as raw material and again embedded in the value of the finished final product, artificially inflating national income.\nHence, Option {{CORR}} is correct.",
                "Defines Problem of Double Counting."
            ),
            (
                "In the wheat-flour-bread example from the passage, what is the Value Added by the Flour Mill?",
                "₹300 (Output value ₹800 - Intermediate wheat cost ₹500)",
                ["₹800", "₹500", "₹1,300"],
                "C",
                "1. Value Added = Value of Output - Intermediate Consumption = ₹800 (flour sales) - ₹500 (wheat purchase) = ₹300.\nHence, Option {{CORR}} is correct.",
                "Calculates Value Added by mill = 800 - 500 = 300."
            ),
            (
                "What are the two valid alternative methods used by national income accountants to avoid the problem of double counting?",
                "The Final Product Method (counting only final goods) and the Value Added Method (summing value added at each stage)",
                ["The Cash Flow Method and the Foreign Exchange Reserve Method", "The Balance of Payments Method and the Fiscal Deficit Method", "The Wholesale Inventory Method and the Retail Stock Method"],
                "D",
                "1. Double counting is eliminated either by taking the final sale value of finished consumer goods or by summing the net value added (Output - Intermediate Consumption) at every successive production stage.\nHence, Option {{CORR}} is correct.",
                "Identifies Final Product Method and Value Added Method as solutions to double counting."
            ),
            (
                "If an enterprise has Sales of ₹2,000 crore, Closing Stock of ₹400 crore, Opening Stock of ₹100 crore, and Intermediate Consumption of ₹1,100 crore, what is its GVA_MP?",
                "₹1,200 crore",
                ["₹900 crore", "₹1,500 crore", "₹2,300 crore"],
                "A",
                "1. Change in Stock = Closing Stock - Opening Stock = 400 - 100 = ₹300 crore.\n2. Value of Output = Sales + Change in Stock = 2,000 + 300 = ₹2,300 crore.\n3. GVA_MP = Value of Output - Intermediate Consumption = 2,300 - 1,100 = ₹1,200 crore.\nHence, Option {{CORR}} is correct.",
                "Calculates GVA_MP = 2300 - 1100 = 1200 crore."
            )
        ]
    ),

    # Passage 25: Money Multiplier & Credit Creation
    (
        "Money and Banking",
        "Credit Creation by Commercial Banks",
        (
            "Commercial banks are unique financial institutions that possess the legal power of Credit Creation—creating deposit money out of thin air "
            "through their lending operations. This process operates under a Fractional Reserve Banking system. "
            "Banks are aware from historical experience that not all depositors withdraw their cash deposits simultaneously on any given day. "
            "Therefore, commercial banks are legally mandated to retain only a fraction of their total deposits as liquid cash reserves, known as the "
            "Legal Reserve Ratio (LRR), which comprises the Cash Reserve Ratio (CRR) kept with the RBI and the Statutory Liquidity Ratio (SLR) kept by the bank. "
            "The remaining portion of deposits is advanced as loans to borrowers. "
            "Crucially, banks do not disburse loans in cash currency; instead, they open a new deposit account in the borrower's name and credit the loan amount. "
            "This newly created derivative deposit flows back into the banking system as a primary deposit, initiating another round of lending. "
            "The total credit created is determined by the Money Multiplier: Total Credit Creation = Initial Primary Deposit × (1 / LRR)."
        ),
        [
            (
                "What enables commercial banks to create credit significantly in excess of their actual cash reserves?",
                "The Fractional Reserve Banking system, based on the fact that depositors do not withdraw all their cash simultaneously",
                ["Their legal authorization to print sovereign currency notes", "Direct financial subsidies received from the International Monetary Fund", "Exemption from paying interest to their depositors"],
                "A",
                "1. Banks maintain only a fraction of deposits as cash (fractional reserves) because cash withdrawals are small and predictable on any given day, allowing the rest to be lent out.\nHence, Option {{CORR}} is correct.",
                "Explains fractional reserve principle behind credit creation."
            ),
            (
                "What constitutes the 'Legal Reserve Ratio' (LRR) that Indian commercial banks must maintain?",
                "Cash Reserve Ratio (CRR) deposited with the RBI plus Statutory Liquidity Ratio (SLR) maintained by banks themselves",
                ["Total gold reserves in the central bank plus foreign currency notes", "Commercial bank equity capital plus dividend payout reserves", "Statutory employee pension funds plus insurance premiums"],
                "B",
                "1. LRR is the total reserve requirement mandated by the central bank, comprising CRR (cash held at the RBI) and SLR (liquid assets/government securities held by the bank).\nHence, Option {{CORR}} is correct.",
                "Defines LRR = CRR + SLR."
            ),
            (
                "If the Legal Reserve Ratio (LRR) is 20% and an initial primary cash deposit of ₹10,000 crore enters the banking system, what is the Total Credit Creation?",
                "₹50,000 crore",
                ["₹20,000 crore", "₹10,000 crore", "₹1,00,000 crore"],
                "C",
                "1. Money Multiplier = 1 / LRR = 1 / 0.20 = 5.\n2. Total Credit / Deposit Creation = Initial Deposit × Multiplier = ₹10,000 × 5 = ₹50,000 crore.\nHence, Option {{CORR}} is correct.",
                "Calculates total credit creation = 10000 * 5 = 50000 crore."
            ),
            (
                "What is the relationship between the Legal Reserve Ratio (LRR) and the Credit Multiplier?",
                "An inverse relationship; a higher LRR reduces the credit multiplier and contracts credit creation capacity",
                ["A direct relationship; higher LRR increases credit creation", "An exponential relationship where credit creation is unaffected", "Zero relationship because reserves are voluntary"],
                "D",
                "1. Money Multiplier = 1 / LRR. Since LRR is in the denominator, an increase in LRR reduces the multiplier, restricting bank lending capacity.\nHence, Option {{CORR}} is correct.",
                "Identifies inverse relationship between LRR and credit multiplier."
            ),
            (
                "How do commercial banks disburse loans to borrowers in modern banking practice?",
                "By opening a demand deposit account in the borrower's name and crediting the sanctioned loan amount electronically",
                ["By handing over physical sacks of newly minted coins", "By issuing sovereign gold certificates signed by the Finance Minister", "By transferring ownership of central bank office buildings"],
                "A",
                "1. Banks create 'derivative deposits' by opening an account in the borrower's name and crediting the loan amount, which expands the total volume of checkable bank deposits in the economy.\nHence, Option {{CORR}} is correct.",
                "Explains disbursement of loans as derivative deposits."
            )
        ]
    ),

    # Passage 26: Central Bank Repo Rate & Inflation Targeting
    (
        "Money and Banking",
        "Monetary Policy & Repo Rate",
        (
            "The Reserve Bank of India (RBI) operates as the nation's central monetary authority, entrusted with the primary statutory mandate "
            "of maintaining price stability while supporting economic growth under the Flexible Inflation Targeting (FIT) framework (targeting 4% CPI inflation with a ±2% tolerance band). "
            "The chief policy instrument deployed by the Monetary Policy Committee (MPC) is the Repo Rate—the benchmark interest rate at which the RBI lends "
            "short-term funds to commercial banks against the collateral of approved government securities. "
            "When the economy faces demand-pull inflation and CPI breaches the upper tolerance band (6%), the MPC hikes the Repo Rate. "
            "This elevates the cost of funds for commercial banks, compelling them to raise their marginal cost of funds-based lending rates (MCLR) "
            "and retail interest rates on personal, auto, and home loans. "
            "Higher borrowing costs discourage consumer borrowing and capital investment by firms, cooling down aggregate demand and reining in inflation. "
            "Conversely, during an economic slowdown, the RBI slashes the Repo Rate to encourage cheap borrowing and stimulate aggregate investment."
        ),
        [
            (
                "What is the definition of the 'Repo Rate' in central banking?",
                "The rate at which the Central Bank lends short-term funds to commercial banks against government securities collateral",
                ["The interest rate commercial banks pay on retail household fixed deposits", "The dividend rate paid by the central bank to the Ministry of Finance", "The penalty rate charged on foreign sovereign debt defaults"],
                "A",
                "1. Repo Rate (Repurchase Option Rate) is the benchmark policy rate at which the central bank lends money to commercial banks against approved securities for short durations.\nHence, Option {{CORR}} is correct.",
                "Defines Repo Rate."
            ),
            (
                "What is the official inflation target mandated for the Reserve Bank of India under the Flexible Inflation Targeting framework?",
                "4% Consumer Price Index (CPI) inflation with a tolerance band of ±2% (2% to 6%)",
                ["0% inflation with zero tolerance", "10% Wholesale Price Index inflation", "5% GDP deflator growth"],
                "B",
                "1. Under the RBI Act, the monetary policy target is 4% CPI inflation, with an allowable tolerance range of 2% (lower bound) to 6% (upper bound).\nHence, Option {{CORR}} is correct.",
                "Identifies RBI inflation target: 4% +/- 2%."
            ),
            (
                "How does an increase in the Repo Rate by the RBI help in curbing high inflation?",
                "It raises commercial bank borrowing costs, leading to higher retail loan interest rates, which dampens consumer credit and aggregate demand",
                ["It directly doubles the wages of all factory workers", "It subsidizes consumer shopping in department stores", "It forces commercial banks to liquidate all their physical gold"],
                "C",
                "1. A repo rate hike raises fund costs across the banking system. Banks raise lending rates, making EMIs costlier, which curtails borrowing for consumption and investment, deflating aggregate demand.\nHence, Option {{CORR}} is correct.",
                "Explains monetary transmission mechanism of repo rate hike."
            ),
            (
                "What is the 'Reverse Repo Rate'?",
                "The interest rate at which the Central Bank borrows short-term funds from commercial banks to absorb surplus liquidity",
                ["The rate charged by commercial banks when lending to the general public", "The penalty rate charged on forged currency notes", "The fee charged by municipal corporations for business licenses"],
                "D",
                "1. Reverse Repo Rate is the interest rate at which commercial banks park their surplus funds with the RBI, used by the central bank to drain excess liquid cash from the banking system.\nHence, Option {{CORR}} is correct.",
                "Defines Reverse Repo Rate."
            ),
            (
                "What monetary policy action would the Monetary Policy Committee (MPC) typically adopt during a severe economic recession with high unemployment?",
                "Lower the Repo Rate to make credit cheaper and stimulate consumer expenditure and business investment",
                ["Hike the Repo Rate to maximum possible limits", "Sell massive amounts of government bonds to drain cash from banks", "Increase the Cash Reserve Ratio to freeze commercial bank lending"],
                "A",
                "1. During a recession, the central bank adopts an accommodative/expansionary monetary stance by lowering policy rates to make loans affordable and revitalize economic activity.\nHence, Option {{CORR}} is correct.",
                "Explains lowering repo rate during recession."
            )
        ]
    ),

    # Passage 27: Open Market Operations & Banking Liquidity
    (
        "Money and Banking",
        "Open Market Operations (OMO)",
        (
            "Open Market Operations (OMO) refer to the outright purchase and sale of government securities in the open market by the Central Bank "
            "to regulate the volume of high-powered money and liquidity in the banking system. "
            "OMO is one of the most versatile quantitative instruments of monetary control because it can be executed swiftly without legislative approvals. "
            "When the central bank seeks to sterilize a massive influx of foreign exchange or curb inflationary credit growth, it undertakes Open Market Sales. "
            "The central bank sells government bonds to commercial banks and institutional investors. In paying for these securities, commercial banks "
            "transfer cash reserves from their vault balances to the central bank. This siphons off loanable reserves, diminishing commercial bank lending "
            "capacity and contracting the money supply. "
            "Conversely, when the financial system experiences a liquidity crunch, the central bank undertakes Open Market Purchases, buying back government bonds "
            "and injecting high-powered reserves directly into commercial bank accounts, expanding credit availability."
        ),
        [
            (
                "What constitutes 'Open Market Operations' (OMO) conducted by the Central Bank?",
                "The purchase and sale of government securities in the open market to regulate banking liquidity",
                ["The daily retail auction of gold and silver coins to urban shoppers", "The physical printing of fresh currency notes at sovereign printing presses", "The direct management of agricultural mandis and grain storage"],
                "A",
                "1. OMO refers to the buying and selling of government treasury bills and bonds by the central bank in the open financial market to adjust bank liquidity.\nHence, Option {{CORR}} is correct.",
                "Defines Open Market Operations."
            ),
            (
                "What is the impact of an Open Market SALE of government securities by the Central Bank on the commercial banking system?",
                "It absorbs cash reserves from commercial banks, shrinking their lending capacity and contracting the money supply",
                ["It floods commercial banks with excess cash reserves, triggering rapid credit expansion", "It legally mandates commercial banks to eliminate deposit interest rates", "It doubles the number of commercial bank branches nationwide"],
                "B",
                "1. When banks buy securities from the central bank, they pay with their cash reserves. This drains bank reserves, curtailing their ability to advance loans and contracting credit.\nHence, Option {{CORR}} is correct.",
                "Explains impact of OMO sale: absorbs liquidity and contracts credit."
            ),
            (
                "When will the Central Bank undertake Open Market PURCHASES of government securities?",
                "When the banking system experiences an acute liquidity shortage or during an economic slowdown to inject credit",
                ["When the economy experiences runaway demand-pull hyperinflation", "When foreign exchange reserves breach record surplus levels", "When the government budget has a massive revenue surplus"],
                "C",
                "1. Purchasing securities injects central bank money into commercial banks, expanding bank reserves and boosting credit availability during times of tight liquidity or sluggish growth.\nHence, Option {{CORR}} is correct.",
                "Explains when central bank conducts OMO purchases (liquidity shortage/slowdown)."
            ),
            (
                "What type of monetary policy tool is Open Market Operations classified as?",
                "A Quantitative (General) Monetary Instrument",
                ["A Qualitative (Selective) Credit Control", "A Fiscal Budgetary Policy Instrument", "An Administrative User Fee Scheme"],
                "D",
                "1. Quantitative tools (Bank Rate, Repo Rate, OMO, CRR, SLR) influence the overall quantity and volume of credit available in the economy without targeting specific sectors.\nHence, Option {{CORR}} is correct.",
                "Classifies OMO as a quantitative monetary instrument."
            ),
            (
                "Why is Open Market Operations considered a highly flexible and preferred tool by modern central banks?",
                "Because transactions can be executed incrementally and reversed quickly in response to daily liquidity fluctuations without changing legal reserve ratios",
                ["Because OMO requires unanimous approval from every commercial bank depositor", "Because OMO operates exclusively without involving legal currency", "Because OMO guarantees that commercial banks will never incur bad loans"],
                "A",
                "1. OMO allows central banks to fine-tune liquidity on a daily basis with high precision and flexibility, unlike changes in reserve ratios which are disruptive to bank balance sheets.\nHence, Option {{CORR}} is correct.",
                "Explains precision and flexibility of OMO."
            )
        ]
    ),

    # Passage 28: Digital Payments (UPI) & Velocity of Money
    (
        "Money and Banking",
        "Money Supply & Velocity of Circulation",
        (
            "The rapid emergence of digital financial infrastructure in India, spearheaded by the Unified Payments Interface (UPI), "
            "has fundamentally transformed the transmission of money in the economy. "
            "In monetary economics, the Quantity Theory of Money expresses the relationship M · V = P · Y, where M represents the nominal money supply, "
            "V represents the Velocity of Circulation of money (the average frequency with which a unit of currency changes hands in a given year), "
            "P represents the general price level, and Y represents real national output. "
            "Prior to digital retail payments, physical cash transactions suffered from substantial friction: physical transit times, ATM withdrawal limits, "
            "and settlement delays, resulting in a relatively low velocity of money. "
            "With instant, real-time smartphone-based UPI settlements, a single rupee deposited in a commercial bank demand account can be spent, received, "
            "and respent dozens of times in a single day across grocery vendors, wholesalers, transport providers, and retail stores. "
            "Consequently, the velocity of money has accelerated significantly, enabling the economy to support a higher transaction volume with less physical currency."
        ),
        [
            (
                "What does the 'Velocity of Circulation of Money' (V) measure in macroeconomic theory?",
                "The average number of times a single unit of money changes hands to finance transactions over a specified period",
                ["The speed at which new currency notes travel from sovereign printing presses to bank vaults", "The interest rate charged by commercial banks on digital loans", "The percentage of damaged currency notes destroyed annually by the central bank"],
                "A",
                "1. Velocity of circulation (V) is the rate at which currency moves from one transaction to another (V = Nominal GDP / Money Supply).\nHence, Option {{CORR}} is correct.",
                "Defines Velocity of Circulation of money."
            ),
            (
                "In the Fisherian Equation of Exchange M · V = P · Y, what does the term 'P · Y' represent?",
                "Nominal Gross Domestic Product (Total nominal value of transactions / output)",
                ["Total gold reserves backing the domestic currency", "The fiscal deficit of the central government", "The velocity of high-powered currency in commercial banks"],
                "B",
                "1. In M · V = P · Y, P is price level and Y is real output; their product P · Y equals total nominal spending or Nominal GDP.\nHence, Option {{CORR}} is correct.",
                "Identifies P * Y as Nominal GDP."
            ),
            (
                "How has the nationwide adoption of real-time digital payment systems (such as UPI) affected the Velocity of Circulation of money?",
                "It has significantly increased the velocity of circulation by eliminating transaction frictions and settlement delays",
                ["It has reduced the velocity of circulation to absolute zero", "It has forced the velocity of circulation to remain strictly equal to 1", "It has caused the velocity of money to become negative"],
                "C",
                "1. Instant digital clearing allows funds to be received and respent instantly, dramatically accelerating the turnover (velocity) of demand deposits.\nHence, Option {{CORR}} is correct.",
                "Explains UPI increases velocity of money."
            ),
            (
                "Under the M · V = P · Y framework, if the velocity of money (V) increases while real output (Y) and price level (P) remain constant, what happens to the required money supply (M)?",
                "The economy can support the exact same volume of transactions with a smaller nominal money supply (M)",
                ["The money supply must quadruple immediately", "The central bank must double its physical currency printing", "Commercial banks must declare collective insolvency"],
                "D",
                "1. If V rises, each rupee does more work; therefore, a smaller stock of money M is required to finance the same nominal output (P · Y).\nHence, Option {{CORR}} is correct.",
                "Explains higher V allows same transactions with less M."
            ),
            (
                "Which measure of Money Supply in India is considered 'Narrow Money'?",
                "M1 (Currency with public + Demand deposits with banks + Other deposits with RBI)",
                ["M3 (Broad Money)", "M4 (M3 + Total post office deposits)", "M0 (Reserve Money) exclusively"],
                "A",
                "1. M1 is known as Narrow Money because it represents the most liquid forms of money directly usable as a medium of exchange.\nHence, Option {{CORR}} is correct.",
                "Identifies M1 as Narrow Money."
            )
        ]
    ),

    # Passage 29: Keynesian Consumption Function & Psychological Law
    (
        "Determination of Income and Employment",
        "Keynesian Consumption Function",
        (
            "In his landmark 1936 treatise, John Maynard Keynes formulated the 'Fundamental Psychological Law of Consumption', "
            "which posits that men are disposed, as a rule and on the average, to increase their consumption as their income increases, "
            "but not by as much as the increase in their income. "
            "This behavioral relationship is formalized in the linear consumption function C = C_bar + bY, where C represents total aggregate consumption, "
            "C_bar is autonomous consumption (consumption expenditure undertaken when national income is strictly zero, funded via dissaving), "
            "b is the Marginal Propensity to Consume (MPC = ΔC / ΔY, where 0 < b < 1), and Y represents national income. "
            "Because MPC is strictly less than 1, as an economy's national income rises, consumption expenditure expands by a smaller proportion, "
            "widening the gap between income and consumption. This emerging gap represents aggregate saving (S = Y - C). "
            "Unless this saving is fully absorbed by equivalent investment expenditure, aggregate demand falls short of full employment output, "
            "plunging the macroeconomy into involuntary unemployment."
        ),
        [
            (
                "What is the core proposition of Keynes' 'Fundamental Psychological Law of Consumption'?",
                "As income increases, consumption also increases, but by a smaller proportion than the increment in income (ΔC < ΔY)",
                ["Consumers always spend 100% of any additional income on luxury goods", "Consumption remains strictly constant regardless of changes in income", "When income increases, consumption collapses to zero as individuals hoard cash"],
                "A",
                "1. Keynes' law states that humans increase consumption when income rises, but not by the entire increment, saving a fraction (0 < MPC < 1).\nHence, Option {{CORR}} is correct.",
                "States Keynes' Psychological Law of Consumption."
            ),
            (
                "In the linear consumption equation C = C_bar + bY, what does the parameter 'C_bar' represent?",
                "Autonomous Consumption—the minimum survival consumption expenditure independent of the current level of income",
                ["The marginal propensity to save of high-income households", "The total value of government capital infrastructure projects", "The percentage of income deducted as corporate tax"],
                "B",
                "1. C_bar represents autonomous consumption expenditure that occurs even at zero income (Y = 0), financed by past savings or borrowing.\nHence, Option {{CORR}} is correct.",
                "Defines autonomous consumption C_bar."
            ),
            (
                "What is the allowable range for the Marginal Propensity to Consume (b = MPC) under normal economic circumstances?",
                "Between 0 and 1 (0 < MPC < 1)",
                ["Strictly greater than 1", "Strictly negative (MPC < 0)", "Exactly equal to infinity"],
                "C",
                "1. Since people consume a positive fraction of extra income but not more than the whole increment, MPC lies between 0 and 1 (0 < MPC < 1).\nHence, Option {{CORR}} is correct.",
                "States range 0 < MPC < 1."
            ),
            (
                "According to Keynes, what dangerous macroeconomic problem arises as national income grows if investment fails to expand commensurately?",
                "Aggregate saving creates an expenditure gap, causing Aggregate Demand to fall short of Aggregate Supply and creating involuntary unemployment",
                ["The economy experiences uncontrollable hyperinflation", "The central bank's gold reserves evaporate completely", "The demand curve for consumer staples becomes upward-sloping"],
                "D",
                "1. Because MPC < 1, rising income generates expanding savings. If planned investment does not match this saving gap, AD falls short of AS, causing recession.\nHence, Option {{CORR}} is correct.",
                "Explains the Keynesian expenditure gap and demand deficiency."
            ),
            (
                "What happens to the Average Propensity to Consume (APC = C / Y) as national income expands in a linear consumption function with positive autonomous consumption?",
                "Average Propensity to Consume (APC) continually declines as income rises",
                ["APC continually rises and approaches infinity", "APC remains strictly constant at all income levels", "APC falls to negative values"],
                "A",
                "1. APC = C_bar / Y + b. As Y increases, C_bar / Y approaches zero, causing APC to fall progressively as income rises.\nHence, Option {{CORR}} is correct.",
                "Explains APC falls as income rises."
            )
        ]
    ),

    # Passage 30: Investment Multiplier in National Infrastructure
    (
        "Determination of Income and Employment",
        "Investment Multiplier Mechanism",
        (
            "The Investment Multiplier, formulated by Keynes, explains how an initial injection of autonomous investment spending triggers "
            "a cumulative, multiple expansion in national income. "
            "Suppose the government launches a National Highway Development Project, injecting ₹1,000 crore of autonomous capital spending (ΔI = ₹1,000 cr). "
            "In Round 1, this ₹1,000 crore is paid out as wages to construction workers, engineers, and cement suppliers, generating ₹1,000 crore of new national income. "
            "Assuming an economy-wide Marginal Propensity to Consume of 0.80 (MPC = 0.8), these income recipients spend 80% of their new income on consumer goods "
            "(food, clothing, fuel), generating ₹800 crore of secondary expenditure in Round 2. "
            "The shopkeepers and textile producers who receive this ₹800 crore spend 80% of it (₹640 crore) in Round 3, and so forth. "
            "The cumulative expansion continues until total savings generated equal the original ₹1,000 crore injection. "
            "Using the multiplier formula k = 1 / (1 - MPC) = 1 / 0.20 = 5, the initial ₹1,000 crore investment ultimately generates ₹5,000 crore of total national income (ΔY = k · ΔI)."
        ),
        [
            (
                "What is the mathematical value of the Investment Multiplier (k) when the Marginal Propensity to Consume is 0.80?",
                "5",
                ["4", "1.25", "10"],
                "A",
                "1. k = 1 / (1 - MPC) = 1 / (1 - 0.80) = 1 / 0.20 = 5.\nHence, Option {{CORR}} is correct.",
                "Calculates k = 1 / 0.20 = 5."
            ),
            (
                "In the passage's example, how much total national income (ΔY) is generated from the initial ₹1,000 crore highway investment?",
                "₹5,000 crore (ΔY = 5 × ₹1,000 crore)",
                ["₹1,000 crore", "₹800 crore", "₹10,000 crore"],
                "B",
                "1. ΔY = k × ΔI = 5 × ₹1,000 crore = ₹5,000 crore.\nHence, Option {{CORR}} is correct.",
                "Calculates total income expansion = 5 * 1000 = 5000 crore."
            ),
            (
                "Why does the chain reaction of income creation in the multiplier process eventually come to a stop?",
                "Because in each successive spending round, a fraction of income leaks out into savings (MPS), until cumulative savings equal the initial investment injection (ΔS = ΔI)",
                ["Because commercial banks legally freeze all electronic checking accounts after three rounds", "Because consumers run completely out of desires and stop purchasing food", "Because the central government recalls all printed paper currency"],
                "C",
                "1. Each round leaks a fraction (MPS = 0.20) into savings. The process terminates when the sum of savings across all rounds matches the initial autonomous investment (ΔS = ΔI = ₹1,000 cr).\nHence, Option {{CORR}} is correct.",
                "Explains multiplier terminates when cumulative leakages equal initial injection."
            ),
            (
                "What is the relationship between the Marginal Propensity to Save (MPS) and the Investment Multiplier (k)?",
                "An inverse relationship; a higher MPS results in a smaller multiplier value",
                ["A direct relationship; higher MPS increases the multiplier", "An exponential relationship where multiplier equals MPS squared", "Zero relationship because multiplier depends only on bank interest rates"],
                "D",
                "1. k = 1 / MPS. Higher savings represent higher leakage from the spending stream, dampening subsequent rounds of income generation and shrinking the multiplier.\nHence, Option {{CORR}} is correct.",
                "Identifies inverse relationship between MPS and multiplier."
            ),
            (
                "If the government injects ₹2,000 crore into an economy where MPC is 0.75, what will be the total expansion in national income?",
                "₹8,000 crore",
                ["₹4,000 crore", "₹6,000 crore", "₹2,666 crore"],
                "A",
                "1. k = 1 / (1 - 0.75) = 1 / 0.25 = 4.\n2. ΔY = 4 × ₹2,000 crore = ₹8,000 crore.\nHence, Option {{CORR}} is correct.",
                "Calculates ΔY = 4 * 2000 = 8000 crore."
            )
        ]
    ),

    # Passage 31: The Paradox of Thrift
    (
        "Determination of Income and Employment",
        "Paradox of Thrift",
        (
            "The Paradox of Thrift, famously popularized by Keynes, illustrates a profound fallacy of composition in macroeconomics: "
            "what is prudent and virtuous for an individual household may prove disastrous for the macroeconomy as a whole. "
            "If an individual family decides to be thrifty and increase its savings rate, that family improves its personal financial security. "
            "However, if all households in an economy simultaneously attempt to save a higher proportion of their income (Marginal Propensity to Save rises), "
            "their collective consumption expenditure (C) contracts sharply. "
            "Because one person's expenditure is another person's income, this reduction in consumer spending shrinks aggregate demand. "
            "Producers face unsold inventory piles, slash production, and lay off workers, causing national income (Y) to plummet through the reverse multiplier. "
            "At this significantly lower level of equilibrium national income, total actual savings (S = Y - C) may remain unchanged or even end up "
            "strictly lower than before the thrift campaign began."
        ),
        [
            (
                "What is the core economic premise of the 'Paradox of Thrift'?",
                "If all individuals in an economy attempt to save more simultaneously, aggregate demand and national income fall, leaving total savings unchanged or reduced",
                ["Saving money in commercial banks causes physical gold coins to evaporate", "High household savings guarantee permanent zero inflation and double-digit growth", "Spending on luxury goods is legally mandated to protect national welfare"],
                "A",
                "1. The paradox shows that collective thrift reduces aggregate spending, contracting equilibrium GDP via the multiplier, preventing total savings from rising.\nHence, Option {{CORR}} is correct.",
                "Defines Paradox of Thrift."
            ),
            (
                "What logical error does the Paradox of Thrift exemplify?",
                "The Fallacy of Composition (erroneously assuming that what is true for an individual part must be true for the whole)",
                ["The Law of Diminishing Marginal Returns", "The Giffen Paradox", "The Quantity Theory of Money"],
                "B",
                "1. The fallacy of composition assumes that because individual thrift is good for a single household, universal thrift must be good for the aggregate economy, which fails because spending is circular.\nHence, Option {{CORR}} is correct.",
                "Identifies Fallacy of Composition."
            ),
            (
                "How is an increase in the Marginal Propensity to Save (MPS) represented graphically in the S-I equilibrium framework?",
                "The saving curve shifts upward / rotates upwards, intersecting the horizontal investment line at a lower equilibrium income",
                ["The investment line shifts downward into negative territory", "The saving curve rotates downward, increasing equilibrium income", "The 45-degree line rotates vertically by 90 degrees"],
                "C",
                "1. An increased propensity to save tilts the saving function upward, intersecting the unchanged autonomous investment line at a reduced level of equilibrium income Y_1 < Y_0.\nHence, Option {{CORR}} is correct.",
                "Explains upward shift of saving curve leading to lower income."
            ),
            (
                "In a two-sector economy with autonomous investment (I = I_bar), what happens to total actual savings at the new equilibrium after households attempt to save more?",
                "Total actual saving remains strictly equal to the unchanged autonomous investment (S = I_bar)",
                ["Total saving triples automatically", "Total saving falls to absolute zero", "Total saving equals total money supply in circulation"],
                "D",
                "1. At equilibrium, S = I. With autonomous investment fixed at I_bar, total realized savings must equal I_bar at the new lower income level, proving that collective thrift failed to raise total saving.\nHence, Option {{CORR}} is correct.",
                "Shows total actual saving remains equal to autonomous investment."
            ),
            (
                "During which historical event did the Paradox of Thrift manifest with catastrophic real-world consequences?",
                "The Great Depression of the 1930s, where widespread panic-driven hoarding of savings deepened the economic collapse",
                ["The California Gold Rush of 1849", "The German hyperinflation of 1923", "The dot-com technology stock boom of 1999"],
                "A",
                "1. During the 1930s Great Depression, widespread panic hoarding and spending cutbacks devastated consumer demand, validating Keynes' warning about the paradox of thrift.\nHence, Option {{CORR}} is correct.",
                "Links Paradox of Thrift to 1930s Great Depression."
            )
        ]
    ),

    # Passage 32: Inflationary Gap & Wage-Price Spiral
    (
        "Determination of Income and Employment",
        "Inflationary Gap & Economic Overheating",
        (
            "An Inflationary Gap arises when planned Aggregate Demand (AD) exceeds the Aggregate Supply (AS) corresponding to the full employment level of output. "
            "In an overheating economy where all factories operate at full capacity and all willing workers are employed, physical production cannot increase in the short run. "
            "The vertical excess of planned aggregate expenditure over full employment output represents the Inflationary Gap. "
            "Because real physical output is constrained by the resource ceiling, this excess demand triggers intense bidding wars for limited goods and factors of production. "
            "Firms compete for scarce labor by offering higher wages. However, higher wages increase production costs, prompting firms to raise prices of finished consumer goods. "
            "As consumer prices rise, workers demand further wage hikes to restore their purchasing power, igniting a dangerous 'Wage-Price Spiral'. "
            "To dismantle the inflationary gap, governments and central banks must implement contractionary fiscal policy (curbing public spending and raising taxes) "
            "and dear monetary policy (hiking repo rates and absorbing bank liquidity)."
        ),
        [
            (
                "What is the definition of an 'Inflationary Gap' in Keynesian macroeconomics?",
                "The vertical excess of planned Aggregate Demand over full employment Aggregate Supply",
                ["The annual fiscal deficit of the central government", "The difference between market interest rate and bank rate", "The total quantity of imported crude oil over domestic production"],
                "A",
                "1. The Inflationary Gap measures the extent by which actual aggregate demand exceeds the output achievable under full employment.\nHence, Option {{CORR}} is correct.",
                "Defines Inflationary Gap."
            ),
            (
                "Why does real national output fail to expand when an economy experiences an Inflationary Gap?",
                "Because all available productive resources (labor and capital) are already fully utilized at the full employment ceiling",
                ["Because consumers refuse to purchase extra goods at prevailing prices", "Because government mandates all factories to operate only four hours a day", "Because commercial banks cancel all digital electronic payments"],
                "B",
                "1. At full employment, physical capacity is fully engaged. Aggregate supply is completely inelastic in real terms in the short run; excess demand can only inflate prices.\nHence, Option {{CORR}} is correct.",
                "Explains why real output cannot expand beyond full employment."
            ),
            (
                "What is meant by the 'Wage-Price Spiral' described in the passage?",
                "A self-reinforcing inflationary cycle where higher wages increase production costs, leading to higher prices, which in turn provoke demands for even higher wages",
                ["A legal statutory minimum wage adjustment enacted by Parliament", "A drop in consumer prices accompanied by rising interest rates", "An exchange rate depreciation caused by gold exports"],
                "C",
                "1. In an overheating market, labor shortages bid up wages, raising costs and prices, which prompts further wage demands, spiraling into persistent inflation.\nHence, Option {{CORR}} is correct.",
                "Defines Wage-Price Spiral."
            ),
            (
                "Which combination of fiscal policy measures is appropriate for eliminating an Inflationary Gap?",
                "Curtail government expenditure (G) and increase tax rates (T) to siphon off excess disposable income",
                ["Increase government infrastructure spending and eliminate personal income taxes", "Subsidize private consumer loans through state grants", "Abolish all import tariffs to encourage domestic consumption"],
                "D",
                "1. Contractionary fiscal policy (cutting G and raising T) directly deflates aggregate demand, shifting the AD curve downward to eliminate the gap.\nHence, Option {{CORR}} is correct.",
                "Identifies contractionary fiscal policy for inflationary gap."
            ),
            (
                "How can the Central Bank utilize its quantitative monetary instruments to extinguish an Inflationary Gap?",
                "Hike the Repo Rate, raise the Cash Reserve Ratio (CRR), and sell government securities in Open Market Operations",
                ["Slash the Repo Rate to zero percent and buy back treasury bonds", "Eliminate margin requirements on all commercial loans", "Authorize private commercial banks to print currency notes"],
                "A",
                "1. A dear money policy (hiking repo rate, raising CRR, selling securities) siphons off banking liquidity and raises borrowing costs, cooling excess demand.\nHence, Option {{CORR}} is correct.",
                "Identifies dear monetary policy tools for inflationary gap."
            )
        ]
    ),

    # Passage 33: Deflationary Gap & Involuntary Unemployment
    (
        "Determination of Income and Employment",
        "Deflationary Gap & Recession",
        (
            "A Deflationary Gap (or Recessionary Gap) occurs when planned Aggregate Demand falls short of the Aggregate Supply corresponding to the full employment level of output. "
            "The vertical distance by which actual aggregate demand falls short of the aggregate demand required to maintain full employment output is the Deflationary Gap. "
            "When aggregate demand is deficient, firms are unable to sell their current production at prevailing market prices. "
            "Unsold inventory piles accumulate in warehouses. Facing depressed sales and falling profits, firms respond by cutting production schedules, "
            "freezing new hiring, and laying off workers, generating widespread Involuntary Unemployment. "
            "Unlike classical economic assumptions that wage-price flexibility automatically restores full employment, Keynes proved that wages and prices are sticky downwards "
            "(due to minimum wage laws, labor union contracts, and implicit contracts), causing the economy to remain trapped in a prolonged Underemployment Equilibrium. "
            "To break out of this deflationary trap, vigorous government intervention via expansionary fiscal stimulus is indispensable."
        ),
        [
            (
                "What does the 'Deflationary Gap' measure on a Keynesian macroeconomic diagram?",
                "The vertical shortfall by which actual Aggregate Demand falls short of full employment Aggregate Supply",
                ["The total amount of government tax revenue uncollected during a recession", "The difference between corporate savings and commercial bank lending", "The quantity of foreign exchange reserves lost in currency defense"],
                "A",
                "1. The Deflationary Gap measures the deficiency in aggregate demand relative to the output required to maintain full employment.\nHence, Option {{CORR}} is correct.",
                "Defines Deflationary Gap."
            ),
            (
                "What is the primary real-world consequence of a Deflationary Gap in an economy?",
                "Involuntary unemployment, fall in industrial output, and persistent deflationary economic stagnation",
                ["Demand-pull inflation and an acute shortage of factory workers", "Rapid appreciation of the domestic currency in foreign exchange markets", "A massive surge in corporate dividend distributions"],
                "B",
                "1. When demand is deficient, unsold stocks force firms to lay off workers and cut production, producing involuntary unemployment and output contraction.\nHence, Option {{CORR}} is correct.",
                "Identifies involuntary unemployment as consequence of deflationary gap."
            ),
            (
                "Why do modern capitalist economies fail to automatically self-correct out of a deflationary depression, according to Keynes?",
                "Because wages and prices are 'sticky downwards', preventing automatic market clearing through wage deflation",
                ["Because the law of diminishing returns ceases to function in depressions", "Because commercial banks are prohibited by law from accepting customer deposits", "Because international trade agreements ban export sales"],
                "C",
                "1. Classical theory relied on wage cuts to restore full employment. Keynes demonstrated that wages are sticky downwards (institutional contracts, unions), keeping real wages from falling to clear labor markets.\nHence, Option {{CORR}} is correct.",
                "Explains sticky wages prevent automatic self-correction."
            ),
            (
                "Which fiscal policy initiative is designed to pull an economy out of a Deflationary Gap?",
                "Expansionary Fiscal Policy: boosting public infrastructure spending and reducing taxes to inject purchasing power",
                ["Austerity fiscal policy: cutting government spending and raising income tax brackets", "Banning all public works projects to eliminate budget deficits", "Doubling the corporate tax rate on all manufacturing enterprises"],
                "D",
                "1. To eliminate a deflationary gap, the government boosts public investment (raising G) and cuts taxes (raising disposable income and C), shifting AD upward.\nHence, Option {{CORR}} is correct.",
                "Identifies expansionary fiscal policy for deflationary gap."
            ),
            (
                "If the full employment income is ₹4,000 crore and current equilibrium income is ₹3,000 crore in an economy with an MPC of 0.80, what is the size of the Deflationary Gap?",
                "₹200 crore",
                ["₹1,000 crore", "₹800 crore", "₹250 crore"],
                "A",
                "1. Output shortfall ΔY = 4,000 - 3,000 = ₹1,000 crore.\n2. Multiplier k = 1 / (1 - 0.80) = 5.\n3. Deflationary Gap = Required increase in autonomous spending = ΔY / k = 1,000 / 5 = ₹200 crore.\nHence, Option {{CORR}} is correct.",
                "Calculates Deflationary Gap = 1000 / 5 = 200 crore."
            )
        ]
    ),

    # Passage 34: Government Budget Deficits & Debt Sustainability
    (
        "Government Budget and the Economy",
        "Budget Deficits & Debt Sustainability",
        (
            "The Government Budget reflects the state's fiscal health through three distinct deficit measures: "
            "Revenue Deficit (Revenue Expenditure - Revenue Receipts), Fiscal Deficit (Total Expenditure - Total Receipts excluding borrowings), "
            "and Primary Deficit (Fiscal Deficit - Interest Payments). "
            "A persistent Revenue Deficit is particularly alarming because it indicates that the government is dissaving—borrowing capital funds "
            "simply to finance day-to-day administrative consumption (salaries, pensions, subsidies) rather than creating productive physical capital. "
            "Fiscal Deficit represents the total net borrowing requirement of the government from all sources. "
            "While borrowing to build high-yielding infrastructure (railways, expressways, power grids) expands future GDP and tax revenue, borrowing "
            "for revenue consumption can plunge an economy into a vicious 'Debt Trap': the government borrows increasingly larger sums merely to pay "
            "accumulating interest on past loans. "
            "When the Primary Deficit reaches zero (Primary Deficit = 0), the entire fiscal deficit of that year is driven exclusively by past interest obligations."
        ),
        [
            (
                "What is the critical macroeconomic danger of running a chronic 'Revenue Deficit'?",
                "It signifies government dissaving, meaning the government borrows capital funds to finance routine consumption rather than building productive assets",
                ["It guarantees an immediate collapse of commercial bank software systems", "It forces the central bank to replace all paper currency with digital tokens", "It legally compels foreign governments to recall their ambassadors"],
                "A",
                "1. A revenue deficit implies that current revenues cannot cover operating expenses, forcing the state to consume its capital assets or incur debt for non-asset consumption.\nHence, Option {{CORR}} is correct.",
                "Explains danger of revenue deficit as dissaving."
            ),
            (
                "In government budgetary accounting, the 'Fiscal Deficit' is identically equal to which economic aggregate?",
                "Total Borrowings and debt liabilities incurred by the government during that financial year",
                ["Total tax revenue collected by the Ministry of Finance", "Total cash deposits held in the Reserve Bank of India", "Gross domestic capital formation in the private sector"],
                "B",
                "1. By definition, Fiscal Deficit measures the exact financing gap that must be covered by borrowing; hence, Fiscal Deficit ≡ Total Borrowings.\nHence, Option {{CORR}} is correct.",
                "Identifies Fiscal Deficit as identically equal to Total Borrowings."
            ),
            (
                "What does a 'Zero Primary Deficit' (Primary Deficit = 0) signify about government budgetary operations?",
                "The government's current year non-interest expenditures match its current year revenues, and all borrowings are consumed purely by past debt interest",
                ["The government has zero outstanding public debt", "The nation has eliminated all personal income taxes", "Commercial bank lending interest rates are zero"],
                "C",
                "1. Primary Deficit = Fiscal Deficit - Interest Payments = 0 => Fiscal Deficit = Interest Payments. All current borrowings are devoted entirely to servicing legacy debt interest.\nHence, Option {{CORR}} is correct.",
                "Explains Zero Primary Deficit means borrowing purely for interest obligations."
            ),
            (
                "What is meant by a sovereign 'Debt Trap' resulting from reckless fiscal deficits?",
                "A vicious spiral where the government is compelled to borrow new funds merely to pay interest on old accumulated loans, accelerating total debt",
                ["A legal penalty imposed by the World Bank confiscating a nation's territory", "A collapse in domestic consumer demand caused by negative income tax rates", "An economic situation where private citizens are barred from holding bank accounts"],
                "D",
                "1. A debt trap occurs when accumulated debt interest payments become so colossal that the government must borrow just to pay interest, spiraling debt out of control.\nHence, Option {{CORR}} is correct.",
                "Defines Debt Trap."
            ),
            (
                "If an economy's Fiscal Deficit is ₹85,000 crore and interest payments on past debt equal ₹60,000 crore, what is the Primary Deficit?",
                "₹25,000 crore",
                ["₹1,45,000 crore", "₹85,000 crore", "₹60,000 crore"],
                "A",
                "1. Primary Deficit = Fiscal Deficit - Interest Payments = ₹85,000 - ₹60,000 = ₹25,000 crore.\nHence, Option {{CORR}} is correct.",
                "Calculates Primary Deficit = 85000 - 60000 = 25000 crore."
            )
        ]
    ),

    # Passage 35: Capital vs Revenue Expenditure & Infrastructure Multiplier
    (
        "Government Budget and the Economy",
        "Quality of Public Expenditure",
        (
            "Economic policymakers evaluate not merely the size of government spending, but critically its qualitative composition: "
            "Revenue Expenditure versus Capital Expenditure. "
            "Revenue Expenditure refers to recurring, operational outlays that neither create physical or financial assets nor cause any reduction in liabilities "
            "(e.g., salaries of civil servants, pensions, interest payments on public debt, and food/fertilizer subsidies). "
            "In contrast, Capital Expenditure refers to investments that either create tangible physical/financial assets or reduce liabilities "
            "(e.g., constructing high-speed railway corridors, building modern ports, purchasing industrial machinery, and repaying past public borrowings). "
            "Capital expenditures generate an 'Infrastructure Multiplier' that is substantially higher than that of revenue spending. "
            "Building a multimodal logistics park not only generates immediate employment for construction labor, but permanently reduces logistics costs "
            "for manufacturing firms, crowding in private investment and boosting the long-term potential GDP growth rate of the nation."
        ),
        [
            (
                "What two defining criteria distinguish 'Revenue Expenditure' in the government budget?",
                "It neither creates any physical/financial asset NOR reduces any government liability",
                ["It creates tangible highways while increasing public debt", "It reduces public debt while creating public hospitals", "It consists exclusively of foreign currency grants received from abroad"],
                "A",
                "1. Revenue Expenditure satisfies two negative tests: (i) does not create assets, and (ii) does not reduce liabilities.\nHence, Option {{CORR}} is correct.",
                "Identifies dual criteria of Revenue Expenditure."
            ),
            (
                "Why is the 'Infrastructure Multiplier' of Capital Expenditure considered economically superior to Revenue Expenditure?",
                "Because capital spending creates long-term productive assets, lowers business operating costs, and crowds in private investment",
                ["Because capital spending is completely exempt from government auditing", "Because revenue spending causes immediate legal prosecution of civil servants", "Because capital spending creates zero temporary construction employment"],
                "B",
                "1. Capital expenditure builds permanent infrastructure (ports, rail, highways) that boosts total factor productivity and crowds in private enterprise investment, elevating potential GDP.\nHence, Option {{CORR}} is correct.",
                "Explains why capital expenditure has a higher multiplier effect."
            ),
            (
                "Which of the following budget outlays is classified as 'Capital Expenditure'?",
                "Repayment of principal on a 10-year development loan borrowed from the World Bank",
                ["Payment of monthly salaries to central government school teachers", "Payment of interest on outstanding domestic market borrowings", "Distribution of agricultural fertilizer subsidies to smallholder farmers"],
                "C",
                "1. Repaying the principal on past borrowings extinguishes an existing financial liability; reducing liabilities is a defining condition of Capital Expenditure.\nHence, Option {{CORR}} is correct.",
                "Classifies debt repayment as capital expenditure because it reduces liabilities."
            ),
            (
                "Why are 'Interest Payments' on public debt categorized as Revenue Expenditure rather than Capital Expenditure?",
                "Because servicing interest is a recurring operational obligation that neither reduces the principal debt liability nor creates any asset",
                ["Because interest is paid exclusively to foreign central banks", "Because interest payments are classified as direct capital investments", "Because interest payments are refunded by commercial banks at year-end"],
                "D",
                "1. Paying interest services past loans but does not reduce the principal outstanding debt liability or create assets, categorizing it strictly as Revenue Expenditure.\nHence, Option {{CORR}} is correct.",
                "Explains why interest payment is revenue expenditure."
            ),
            (
                "How does the construction of a dedicated freight rail corridor impact the national economy?",
                "It serves as a Capital Expenditure that expands national infrastructure assets and lowers transport costs across industries",
                ["It represents a Revenue Expenditure that causes immediate fiscal insolvency", "It is classified as a Non-debt Capital Receipt", "It permanently freezes commercial bank credit creation"],
                "A",
                "1. Constructing a rail corridor creates tangible physical infrastructure assets (Capital Expenditure), reducing freight logistics costs across all manufacturing sectors.\nHence, Option {{CORR}} is correct.",
                "Describes economic impact of infrastructure capital expenditure."
            )
        ]
    ),

    # Passage 36: Taxation Architecture: Direct vs Indirect Taxes & GST
    (
        "Government Budget and the Economy",
        "Taxation Architecture & GST",
        (
            "Taxation represents the primary sovereign mechanism through which governments mobilize resources to fund public goods and welfare services. "
            "Taxes are categorized into Direct Taxes and Indirect Taxes based on their incidence and shiftability. "
            "A Direct Tax is levied directly on the income, corporate profits, or wealth of an individual or entity; its legal impact and final economic "
            "incidence fall on the same entity and cannot be shifted onto others (e.g., Personal Income Tax, Corporation Tax). "
            "Direct taxes are typically designed to be progressive, embodying the principle of vertical equity. "
            "An Indirect Tax is levied on the manufacture, sale, or consumption of goods and services; its economic burden can be shifted onto the final consumer "
            "through the retail price mechanism (e.g., Goods and Services Tax - GST, Customs Duty). "
            "The implementation of GST in India in 2017 represented a historic fiscal reform, dismantling a labyrinth of cascading state and central levies "
            "(excise duty, service tax, VAT, octroi) into a single, unified destination-based tax with a seamless Input Tax Credit (ITC) mechanism, "
            "establishing 'One Nation, One Tax, One Market'."
        ),
        [
            (
                "What is the fundamental distinguishing attribute of a 'Direct Tax'?",
                "The legal impact and economic incidence fall on the same person; the tax burden cannot be shifted onto someone else",
                ["It is levied exclusively on manufactured electronic luxury items", "Its tax rate decreases as taxable corporate profit increases", "It is collected exclusively by municipal town panchyats"],
                "A",
                "1. For direct taxes, the entity legally liable to pay the tax must bear the financial incidence; it cannot be shifted onto customers.\nHence, Option {{CORR}} is correct.",
                "Defines Direct Tax by non-shiftable incidence."
            ),
            (
                "Why are indirect taxes like GST often criticized as regressive in nature?",
                "Because they are levied uniformly on goods, taking a larger percentage of total income from poor households than from affluent consumers",
                ["Because indirect taxes are collected only during periods of economic depression", "Because indirect taxes exempt corporate manufacturers from paying taxes", "Because indirect taxes can only be paid using physical gold bullion"],
                "B",
                "1. A uniform indirect tax (e.g., on soap or toothpaste) takes an identical rupee amount from rich and poor alike, representing a far higher fraction of a poor person's income (regressive).\nHence, Option {{CORR}} is correct.",
                "Explains regressive incidence of indirect taxes."
            ),
            (
                "What was the primary economic rationale for introducing the Goods and Services Tax (GST) in India?",
                "To eliminate the cascading effect of multiple taxes ('tax on tax') and unify the fragmented national market into a single common market",
                ["To eliminate all direct personal income taxes nationwide", "To mandate that all commercial businesses be owned by the central government", "To replace paper currency notes with municipal promissory bills"],
                "C",
                "1. GST replaced numerous cascading central and state indirect levies with a unified destination-based tax, eliminating double taxation through Input Tax Credits.\nHence, Option {{CORR}} is correct.",
                "Identifies elimination of cascading taxes as GST objective."
            ),
            (
                "Which of the following tax pairs consists EXCLUSIVELY of Direct Taxes in India?",
                "Personal Income Tax and Corporation Tax",
                ["Goods and Services Tax (GST) and Basic Customs Duty", "Central Excise Duty and Value Added Tax (VAT)", "Stamp Duty and Entertainment Tax"],
                "D",
                "1. Personal Income Tax and Corporation Tax are levied on individual earnings and corporate profits respectively; both are non-shiftable direct taxes.\nHence, Option {{CORR}} is correct.",
                "Identifies Personal Income Tax and Corporation Tax as direct taxes."
            ),
            (
                "How does the 'Input Tax Credit' (ITC) mechanism under GST prevent the cascading effect of taxation?",
                "By allowing businesses to deduct the tax already paid on input purchases from the tax liability payable on their final output sales",
                ["By providing cash rebates to consumers who avoid shopping at supermarkets", "By exempting all imported goods from customs duties", "By freezing wholesale commodity prices at base year levels"],
                "A",
                "1. Input Tax Credit allows a producer to offset taxes paid on raw material inputs against output tax liability, ensuring tax is levied only on the net value added at each stage.\nHence, Option {{CORR}} is correct.",
                "Explains Input Tax Credit eliminating tax cascading."
            )
        ]
    ),

    # Passage 37: Foreign Exchange Rate Determination & Rupee Volatility
    (
        "Balance of Payments and Foreign Exchange",
        "Foreign Exchange Determination",
        (
            "In a market-driven Flexible Exchange Rate regime, the equilibrium exchange rate of a currency is determined at the intersection of "
            "market demand and market supply of foreign exchange. "
            "The demand for foreign currency (such as US Dollars in India) arises from the need to make external payments: importing crude oil, "
            "purchasing foreign capital goods, funding overseas university tuition, and investing in foreign stocks. "
            "The supply of foreign currency flows into India from merchandise exports, IT service billing, foreign tourist spending, inward remittances "
            "from NRIs, and foreign capital inflows (FDI and FPI). "
            "When geopolitical tensions trigger an abrupt spike in global crude oil prices, India's import bill expands dramatically, "
            "shifting the demand curve for US Dollars sharply to the right. "
            "Simultaneously, if the US Federal Reserve hikes dollar interest rates, foreign institutional investors (FPI) sell domestic equities and repatriate "
            "funds to the US, reducing the supply of dollars. "
            "This double shock (surging dollar demand and contracting dollar supply) causes a rapid Depreciation of the Indian Rupee ($1 = ₹75 rising to $1 = ₹83). "
            "To prevent disruptive currency panic, the RBI intervenes under its 'Managed Floating' framework by selling dollars from its official reserves."
        ),
        [
            (
                "In a flexible exchange rate regime, what economic forces determine the equilibrium value of the Indian Rupee against the US Dollar?",
                "The market forces of Aggregate Demand for and Aggregate Supply of Foreign Exchange",
                ["A statutory decree passed annually by the International Monetary Fund", "A fixed mathematical ratio tied permanently to the price of gold", "The physical weight of minted silver coins held by commercial banks"],
                "A",
                "1. In a floating/flexible regime, the exchange rate clears the market where demand for foreign exchange equals supply of foreign exchange.\nHence, Option {{CORR}} is correct.",
                "Identifies market demand and supply as exchange rate determinants."
            ),
            (
                "Why does a sharp increase in international crude oil prices cause the Indian Rupee to depreciate?",
                "Because India imports the vast majority of its crude oil, requiring Indian importers to purchase massive amounts of US Dollars, shifting dollar demand to the right",
                ["Because higher oil prices cause domestic oil refineries to halt operations", "Because crude oil is classified as an invisible factor service", "Because the Reserve Bank of India bans domestic fuel sales"],
                "B",
                "1. As crude oil prices soar, importers must buy more US dollars to pay for oil, driving up the price of dollars in terms of rupees (rupee depreciation).\nHence, Option {{CORR}} is correct.",
                "Explains oil import surge causing rupee depreciation."
            ),
            (
                "What happens to the domestic currency when foreign portfolio investors (FPI) withdraw capital from domestic stock markets to invest in the US?",
                "The domestic currency depreciates because the supply of foreign exchange contracts and the demand for foreign currency to repatriate funds rises",
                ["The domestic currency appreciates sharply against all global currencies", "The domestic interest rate falls immediately to zero", "Domestic commercial banks receive massive gold injections"],
                "C",
                "1. Capital outflows reduce dollar supply and increase dollar demand for repatriation, pushing up the exchange rate (domestic currency depreciation).\nHence, Option {{CORR}} is correct.",
                "Explains capital flight causing currency depreciation."
            ),
            (
                "How does the Reserve Bank of India intervene under Managed Floating to defend the Rupee against excessive depreciation?",
                "By selling US Dollars from its foreign exchange reserves into the market to meet excess dollar demand and stabilize the exchange rate",
                ["By buying billions of US Dollars from retail currency traders", "By freezing all domestic commercial bank saving accounts", "By outlawing all international merchandise trade contracts"],
                "D",
                "1. To arrest rapid depreciation, the RBI injects dollars into the market from its foreign exchange reserves, increasing supply to cool exchange rate volatility.\nHence, Option {{CORR}} is correct.",
                "Explains central bank selling reserves to defend depreciating currency."
            ),
            (
                "How does a Depreciation of the Indian Rupee impact Indian IT software exporters whose contracts are billed in US Dollars?",
                "It boosts their rupee earnings because each US Dollar billed translates into more Indian Rupees upon conversion",
                ["It destroys their profits because software contracts become illegal", "It forces IT companies to relocate all servers to international waters", "It has zero financial impact because software is an intangible asset"],
                "A",
                "1. Rupee depreciation means exporters receive more rupees per dollar earned abroad, enhancing their domestic profit margins and competitive pricing power.\nHence, Option {{CORR}} is correct.",
                "Explains benefits of currency depreciation for exporters."
            )
        ]
    ),

    # Passage 38: Current Account Deficit (CAD) & BoP Financing
    (
        "Balance of Payments and Foreign Exchange",
        "Current Account Deficit & Financing",
        (
            "The Current Account of the Balance of Payments records transactions in visible merchandise goods, invisible services, factor incomes, "
            "and unilateral current transfers. "
            "A Current Account Deficit (CAD) occurs when an economy's total current account debits (payments for imports, factor outflows, outward transfers) "
            "exceed total current account credits (receipts from exports, service earnings, inward remittances). "
            "India routinely runs a substantial Merchandise Trade Deficit because it imports vast quantities of crude oil, electronics, and gold. "
            "Fortunately, this trade deficit is partially cushioned by a robust surplus on the 'Invisibles' account, driven by software service exports and "
            "massive remittances sent home by overseas Indians. "
            "The remaining net CAD must be financed through surplus inflows on the Capital Account: either through stable Foreign Direct Investment (FDI), "
            "Foreign Portfolio Investment (FPI), or External Commercial Borrowings (ECB). "
            "If capital inflows fall short of the CAD, the country faces an overall BoP Deficit, compelling the central bank to draw down official foreign exchange reserves."
        ),
        [
            (
                "What economic condition defines a 'Current Account Deficit' (CAD)?",
                "Total payments on the Current Account (imports of goods, services, and outward transfers) exceed total receipts from exports and inward transfers",
                ["Total tax revenue collected by the government falls short of total public expenditure", "Total commercial bank loans exceed total household savings", "Total physical currency printed exceeds the stock of central bank gold"],
                "A",
                "1. CAD occurs when current account outflows (debits) exceed current account inflows (credits) during the financial year.\nHence, Option {{CORR}} is correct.",
                "Defines Current Account Deficit."
            ),
            (
                "How does India cushion and partially offset its chronic Merchandise Trade Deficit?",
                "Through a massive surplus in 'Invisibles', driven by software service exports and high remittance inflows from non-resident Indians",
                ["Through unilateral food grants provided by the United Nations", "By legally barring all domestic factories from consuming crude petroleum", "By imposing 100% tariffs on all agricultural raw material imports"],
                "B",
                "1. India's large merchandise trade deficit is significantly counterbalanced by surplus earnings in software services (IT/ITeS) and remittances from Indian workers abroad.\nHence, Option {{CORR}} is correct.",
                "Explains role of invisibles and remittances in cushioning CAD."
            ),
            (
                "Why is financing a Current Account Deficit through Foreign Direct Investment (FDI) considered safer and more stable than Foreign Portfolio Investment (FPI)?",
                "Because FDI represents long-term investments in physical factories and productive assets that cannot flee the country overnight, whereas FPI is volatile 'hot money'",
                ["Because FDI does not require foreign currency settlement", "Because FPI is legally restricted to non-profit charitable trusts", "Because FDI provides zero profits to overseas investors"],
                "C",
                "1. FDI involves long-term commitment to physical capital and operations. FPI consists of liquid financial securities that can be abruptly dumped and repatriated during market panics (hot money).\nHence, Option {{CORR}} is correct.",
                "Distinguishes stable FDI from volatile FPI financing."
            ),
            (
                "What happens if an economy's Capital Account surplus is insufficient to finance its Current Account Deficit?",
                "The economy suffers an overall BoP Deficit, forcing the central bank to draw down its official foreign exchange reserves to settle the shortfall",
                ["The country is expelled from the World Trade Organization", "The domestic government declares all private corporate debts null and void", "The economy's national income doubles automatically"],
                "D",
                "1. When autonomous capital inflows cannot cover the current account gap, the overall BoP is in deficit, requiring accommodating official reserve sales by the central bank.\nHence, Option {{CORR}} is correct.",
                "Explains financing BoP deficit via drawing down official reserves."
            ),
            (
                "How are personal remittances received from Indian software professionals working in Singapore recorded in India's BoP?",
                "Credit side of Current Account, under unilateral current transfers",
                ["Debit side of Capital Account, under Foreign Portfolio Investment", "Credit side of Capital Account, under external commercial debt", "Debit side of Current Account, under import of financial services"],
                "A",
                "1. Inward remittances from overseas workers bring foreign exchange into India without creating debt or liability; they are credited under Current Transfers on the Current Account.\nHence, Option {{CORR}} is correct.",
                "Classifies inward remittances as Credit on Current Account."
            )
        ]
    ),

    # Passage 39: Autonomous vs Accommodating Transactions & BoP Crisis
    (
        "Balance of Payments and Foreign Exchange",
        "Autonomous vs Accommodating Transactions",
        (
            "In Balance of Payments analysis, international economic transactions are classified into Autonomous and Accommodating items. "
            "Autonomous Transactions (commonly termed 'Above the Line' items) are international economic transactions undertaken by individuals, "
            "firms, or governments for independent economic motives—such as private profit maximization, consumer utility, or commercial enterprise. "
            "Crucially, autonomous transactions are executed completely independent of the country's BoP status. "
            "Whether an Indian firm exports textiles or imports aircraft is decided by commercial profit, not by whether the national BoP is in deficit or surplus. "
            "When total autonomous receipts fall short of total autonomous payments, a BoP Deficit emerges. "
            "To resolve this disequilibrium, the central monetary authority must step in with Accommodating Transactions ('Below the Line' items). "
            "Accommodating transactions are compensatory transactions undertaken by the central bank explicitly to bridge or finance the deficit "
            "created by autonomous transactions—such as drawing down official foreign exchange reserves or negotiating emergency balance-of-payments loans from the IMF."
        ),
        [
            (
                "What is the defining characteristic of 'Autonomous Transactions' in the Balance of Payments?",
                "They are undertaken for independent economic/profit motives without regard to the country's BoP position ('Above the Line')",
                ["They are undertaken by the central bank solely to bridge BoP deficits", "They consist exclusively of transactions conducted in physical gold coins", "They are illegal smuggling transactions unrecorded by customs authorities"],
                "A",
                "1. Autonomous transactions are commercial or private actions driven by profit or utility, independent of the overall balance of payments state.\nHence, Option {{CORR}} is correct.",
                "Defines Autonomous Transactions."
            ),
            (
                "What are 'Accommodating Transactions' in the Balance of Payments?",
                "Compensatory transactions undertaken by monetary authorities explicitly to finance or bridge the deficit/surplus resulting from autonomous transactions",
                ["Routine commercial exports of manufactured electronic products", "Private corporate purchases of shares in foreign stock markets", "Personal tourist expenditures by citizens vacationing abroad"],
                "B",
                "1. Accommodating transactions are undertaken by the central bank (e.g., reserve drawdowns, IMF borrowing) specifically to settle the gap caused by autonomous flows.\nHence, Option {{CORR}} is correct.",
                "Defines Accommodating Transactions."
            ),
            (
                "Why are Autonomous and Accommodating items referred to as 'Above the Line' and 'Below the Line'?",
                "Autonomous items are 'Above the Line' because they determine the BoP deficit/surplus, while Accommodating items are 'Below the Line' because they settle and finance that gap",
                ["Autonomous items are recorded in positive numbers, while Accommodating items are recorded in negative numbers", "Autonomous items apply to sea transport, while Accommodating items apply to air transport", "Autonomous items are voted on by Parliament, while Accommodating items are signed by the President"],
                "C",
                "1. The 'Line' separates transactions that cause the disequilibrium (autonomous above the line) from transactions that accommodate and finance it (accommodating below the line).\nHence, Option {{CORR}} is correct.",
                "Explains 'Above the Line' and 'Below the Line' terminology."
            ),
            (
                "When is an economy said to be in an economic 'Balance of Payments Deficit'?",
                "When total autonomous receipts are less than total autonomous payments (Autonomous Receipts < Autonomous Payments)",
                ["When total commercial bank lending exceeds central bank reserves", "When total exports of software services equal visible imports", "When the government experiences a balanced fiscal budget"],
                "D",
                "1. A BoP deficit occurs when autonomous inflows fall short of autonomous outflows, necessitating compensatory accommodating financing from reserves or borrowing.\nHence, Option {{CORR}} is correct.",
                "Defines BoP Deficit in terms of autonomous receipts vs payments."
            ),
            (
                "If an economy suffers a chronic BoP deficit, why does the Balance of Payments still balance in an accounting sense?",
                "Because accommodating official reserve transactions and compensatory financing balance the double-entry accounting ledger",
                ["Because customs departments cancel all unpaid import invoices", "Because international courts mandate that foreign creditors forgive all debt", "Because all trade statistics are rounded off to zero by statute"],
                "A",
                "1. In accounting, Credits identically equal Debits because the deficit caused by autonomous flows is exactly offset by an equal accommodating entry (drawing down reserves = credit).\nHence, Option {{CORR}} is correct.",
                "Explains why BoP always balances in accounting via accommodating entries."
            )
        ]
    ),

    # Passage 40: Economic Reforms & Managed Floating in India
    (
        "Balance of Payments and Foreign Exchange",
        "Exchange Rate Regimes: Evolution in India",
        (
            "The evolution of India's foreign exchange regime encapsulates the transition from rigid administrative control to market-driven liberalization. "
            "Prior to 1991, India operated an inward-oriented trade strategy characterized by severe import quotas, prohibitive tariffs, and a strictly fixed exchange rate pegged to a basket of currencies. "
            "In 1991, an unprecedented Balance of Payments crisis—triggered by the Gulf War oil price shock, falling remittances, and unsustainable fiscal deficits—drained India's "
            "foreign exchange reserves to a precariously low level, barely sufficient to finance three weeks of essential imports. "
            "In response to this existential crisis, the Indian government initiated landmark structural economic reforms. "
            "As an emergency stabilization measure, the RBI executed a two-step Devaluation of the Indian Rupee in July 1991 by roughly 18-19% to stimulate exports and stem capital flight. "
            "This was followed by the introduction of the Liberalized Exchange Rate Management System (LERMS) in 1992 (a dual exchange rate system) and ultimately full Current Account Convertibility "
            "in 1994. Under this contemporary Managed Floating regime, the exchange rate of the rupee is determined by market demand and supply forces, with the RBI intervening only to "
            "curb disorderly and excessive volatility."
        ),
        [
            (
                "What was the immediate trigger for the historic 1991 Balance of Payments crisis in India?",
                "Depletion of foreign exchange reserves to barely three weeks of imports due to the Gulf War oil price shock, falling remittances, and high fiscal deficits",
                ["A massive speculative buying of gold coins by domestic agricultural farmers", "The complete collapse of the domestic software technology sector", "A statutory ban on manufacturing consumer goods in India"],
                "A",
                "1. The 1991 BoP crisis was precipitated by surging oil import bills from the Gulf War, plummeting worker remittances, and twin deficits, depleting forex reserves.\nHence, Option {{CORR}} is correct.",
                "Identifies causes of 1991 BoP crisis."
            ),
            (
                "What emergency exchange rate measure did the Reserve Bank of India execute in July 1991 to stabilize external accounts?",
                "A two-step Devaluation of the Indian Rupee by approximately 18-19%",
                ["A mandatory Revaluation of the Rupee by 50%", "The complete replacement of the Rupee with the British Pound", "An outright ban on all foreign tourism into India"],
                "B",
                "1. In July 1991, the RBI devalued the rupee in two rapid steps to restore export competitiveness and halt the speculative drain of foreign exchange.\nHence, Option {{CORR}} is correct.",
                "Identifies July 1991 two-step devaluation."
            ),
            (
                "What does 'Current Account Convertibility' (established in India in 1994) signify?",
                "The freedom to convert domestic currency into foreign currency and vice-versa at market rates for all international transactions in goods, services, and transfers",
                ["The right of all citizens to convert paper currency into physical gold coins at government mints", "The freedom to purchase unlimited foreign real estate and corporate equity without regulatory limits", "The total exemption of commercial banks from paying corporate income taxes"],
                "C",
                "1. Current account convertibility means that currency can be freely exchanged for payments and receipts on the Current Account (trade in goods, services, transfers) without bureaucratic restrictions.\nHence, Option {{CORR}} is correct.",
                "Defines Current Account Convertibility."
            ),
            (
                "How is India's contemporary exchange rate system officially classified?",
                "A Managed Floating Exchange Rate System (where market forces determine the rate, with central bank intervention to curb extreme volatility)",
                ["A rigid Fixed Exchange Rate system pegged strictly to physical gold", "A completely Free Floating system with zero central bank foreign exchange reserves", "A Currency Board system where the Rupee is legally backed 100% by US Dollars"],
                "D",
                "1. India follows a Managed Floating regime: the market determines the rupee's exchange rate, but the RBI intervenes to smooth out extreme fluctuations.\nHence, Option {{CORR}} is correct.",
                "Identifies India's current regime as Managed Floating."
            ),
            (
                "Why has India maintained only partial (calibrated) Capital Account Convertibility rather than full capital account convertibility?",
                "To shield the domestic economy from destabilizing cross-border speculative capital flights and volatile global financial shocks",
                ["Because international treaties strictly prohibit developing nations from allowing foreign investment", "Because commercial banks refuse to handle foreign currency deposits", "Because full capital account convertibility requires abolishing all domestic currency notes"],
                "A",
                "1. Partial capital account convertibility allows the country to regulate speculative 'hot money' debt inflows and outflows, safeguarding financial stability against sudden global panics.\nHence, Option {{CORR}} is correct.",
                "Explains rationale for calibrated Capital Account Convertibility in India."
            )
        ]
    )
]

print(f"Loaded {len(macro_passages_data)} Macroeconomics passages successfully.")
