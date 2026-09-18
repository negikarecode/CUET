import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.eco_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text
)

CHAPTER = "National Income and Related Aggregates"
questions = []
seen = set()

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:80]}")
    seen.add(norm)
    questions.append(q)

print("Generating 100 unique questions for Unit 6: National Income and Related Aggregates...")

# -------------------------------------------------------------------------------------------------
# 1. Basic Concepts: Final vs Intermediate, Stocks vs Flows, Investment & Depreciation (Q1 - Q25)
# -------------------------------------------------------------------------------------------------

# 1. Final Goods definition
opts, corr, sol = rotate_options(
    "Goods purchased either for final consumption by households or for capital investment by producers",
    [
        "Goods meant for immediate resale within the same financial year",
        "Raw materials completely transformed during intermediate manufacturing",
        "Goods produced exclusively for export to international markets"
    ],
    "A",
    "1. Final goods are those goods that have crossed the production boundary and are ready for use by their final users—either households for consumption or firms for investment.\nHence, Option {{CORR}} is correct.",
    "Defines final goods."
)
add_q(make_question(CHAPTER, "Basic Macroeconomic Concepts", "What defines 'Final Goods' in national income accounting?", opts, corr, sol))

# 2. Intermediate Goods definition
opts, corr, sol = rotate_options(
    "Goods used either for resale or as raw materials in further production during the same accounting year",
    [
        "Durable consumer appliances with a lifespan exceeding ten years",
        "Machinery installed in a new automobile assembly plant",
        "Residential properties purchased by retired citizens"
    ],
    "B",
    "1. Intermediate goods are goods that remain within the production boundary, purchased by firms for resale or for completely transforming into other goods during the current accounting year.\nHence, Option {{CORR}} is correct.",
    "Defines intermediate goods."
)
add_q(make_question(CHAPTER, "Basic Macroeconomic Concepts", "Which characteristic accurately describes an 'Intermediate Good'?", opts, corr, sol))

# 3. Same good as final or intermediate: Milk example
opts, corr, sol = rotate_options(
    "Intermediate good for the sweet shop, but a final good for the household",
    [
        "Final good in both cases because milk is perishable",
        "Intermediate good in both cases because milk requires boiling",
        "Capital good for the household and consumer good for the shop"
    ],
    "C",
    "1. The classification of a good as final or intermediate depends on its end-use: milk bought by a sweet shop is an intermediate raw material used to make sweets, while milk purchased by a household is a final consumption good.\nHence, Option {{CORR}} is correct.",
    "Classifies good by end-use."
)
add_q(make_question(CHAPTER, "Basic Macroeconomic Concepts", "Milk purchased by a sweet shop to make rasgullas versus milk purchased by a family for daily tea are classified respectively as:", opts, corr, sol))

# 4. Stock variable definition
opts, corr, sol = rotate_options(
    "A quantity measured at a specific, precise point in time (e.g. capital stock on 31st March)",
    [
        "A variable measured per unit of time (e.g. monthly salary)",
        "The annual flow of water through a hydroelectric dam",
        "The total value of goods produced across an entire calendar year"
    ],
    "D",
    "1. A stock variable is a magnitude measured at a specific point in time (e.g. national wealth, total capital equipment on March 31, inventory stock, money supply), having no time dimension.\nHence, Option {{CORR}} is correct.",
    "Defines stock variable."
)
add_q(make_question(CHAPTER, "Basic Macroeconomic Concepts", "What is a 'Stock Variable' in macroeconomic analysis?", opts, corr, sol))

# 5. Flow variable definition
opts, corr, sol = rotate_options(
    "A quantity measured over a specified period of time (e.g. GDP per year, monthly income)",
    [
        "The balance in a savings account on January 1st",
        "The total quantity of currency notes in circulation today",
        "The fixed machinery installed in an engineering workshop"
    ],
    "A",
    "1. A flow variable has a time dimension and is measured over an interval or duration of time (e.g. income per month, investment per year, depreciation, national income).\nHence, Option {{CORR}} is correct.",
    "Defines flow variable."
)
add_q(make_question(CHAPTER, "Basic Macroeconomic Concepts", "Which of the following is the defining characteristic of a 'Flow Variable'?", opts, corr, sol))

# 6. Identification: Stock vs Flow examples
opts, corr, sol = rotate_options(
    "Stock: Foreign exchange reserves on 31 March; Flow: Annual export earnings",
    [
        "Stock: Monthly salary; Flow: National wealth",
        "Stock: Annual capital expenditure; Flow: Quantity of gold in a vault",
        "Stock: Gross domestic product; Flow: Total bank deposits on 1st April"
    ],
    "B",
    "1. Foreign exchange reserves held at a point in time is a Stock. Annual export earnings generated over the accounting year is a Flow.\nHence, Option {{CORR}} is correct.",
    "Pairs stock and flow correctly."
)
add_q(make_question(CHAPTER, "Basic Macroeconomic Concepts", "Which pair correctly matches a Stock variable with a Flow variable?", opts, corr, sol))

# 7. Depreciation (Consumption of Fixed Capital) definition
opts, corr, sol = rotate_options(
    "The expected loss of value of fixed capital assets due to normal wear and tear and foreseen obsolescence",
    [
        "The sudden destruction of a factory building by an earthquake",
        "The reduction in retail commodity prices during a seasonal discount sale",
        "The monetary penalty paid for delayed tax filing"
    ],
    "C",
    "1. Depreciation (or Consumption of Fixed Capital - CFC) is the annual allowance for the expected fall in value of fixed assets arising from normal wear and tear, passage of time, and foreseen technological obsolescence.\nHence, Option {{CORR}} is correct.",
    "Defines depreciation / CFC."
)
add_q(make_question(CHAPTER, "Basic Macroeconomic Concepts", "What is 'Depreciation' (Consumption of Fixed Capital) in national accounting?", opts, corr, sol))

# 8. Capital Loss vs Depreciation
opts, corr, sol = rotate_options(
    "Capital loss is an unforeseen loss (e.g. floods, fires) while depreciation is an expected wear and tear covered by reserves",
    [
        "Capital loss is recorded by the central bank while depreciation is recorded by households",
        "Capital loss increases gross domestic product while depreciation decreases it",
        "There is no difference; both are identical to intermediate consumption"
    ],
    "D",
    "1. Depreciation is an expected, predictable reduction in capital value for which firms create depreciation reserve funds. Capital loss is an unexpected, unforeseen destruction of assets (natural disasters, war) and is NOT part of depreciation.\nHence, Option {{CORR}} is correct.",
    "Distinguishes capital loss from depreciation."
)
add_q(make_question(CHAPTER, "Basic Macroeconomic Concepts", "How does a 'Capital Loss' differ from 'Depreciation'?", opts, corr, sol))

# 9. Gross Investment vs Net Investment formula
opts, corr, sol = rotate_options(
    "Net Investment = Gross Investment - Depreciation (Consumption of Fixed Capital)",
    [
        "Net Investment = Gross Investment + Net Indirect Taxes",
        "Net Investment = Gross Investment * NFIA",
        "Net Investment = Depreciation - Gross Investment"
    ],
    "A",
    "1. Gross Investment includes total additions to capital stock including replacement of worn-out capital. Net Investment represents the actual net addition to productive capital assets: $Net = Gross - Depreciation$.\nHence, Option {{CORR}} is correct.",
    "States Net Investment formula."
)
add_q(make_question(CHAPTER, "Basic Macroeconomic Concepts", "What is the relationship between Gross Investment and Net Investment?", opts, corr, sol))

# 10. Circular Flow of Income in 2-sector model
opts, corr, sol = rotate_options(
    "Households provide factor services to firms, and firms provide goods and factor payments to households",
    [
        "Firms pay direct income taxes to the central planning commission",
        "Households export intermediate goods to foreign multinational corporations",
        "Commercial banks create infinite credit without consumer deposits"
    ],
    "B",
    "1. In a simple two-sector circular flow model (Households and Firms without government or foreign trade): Real flow consists of factor services from households to firms and finished goods from firms to households; Money flow consists of factor payments (rent, wages, interest, profit) from firms to households and consumption expenditure from households to firms.\nHence, Option {{CORR}} is correct.",
    "Describes two-sector circular flow."
)
add_q(make_question(CHAPTER, "Circular Flow of Income", "Which statement accurately describes the circular flow of income in a simple two-sector economy?", opts, corr, sol))

# 11. Real Flow vs Money Flow
opts, corr, sol = rotate_options(
    "Real flow involves the flow of physical goods and factor services, while money flow involves monetary transactions and payments",
    [
        "Real flow refers exclusively to government infrastructure while money flow refers to cash coins",
        "Real flow is measured in gold bullion while money flow is measured in rupees",
        "Real flow occurs only in capitalist economies while money flow occurs in barter systems"
    ],
    "C",
    "1. Real flow represents the flow of physical factor inputs (land, labour, capital) and output of goods and services between sectors. Money flow represents the reciprocal flow of factor payments and consumption expenditure in currency.\nHence, Option {{CORR}} is correct.",
    "Distinguishes real flow from money flow."
)
add_q(make_question(CHAPTER, "Circular Flow of Income", "How is 'Real Flow' distinguished from 'Money Flow' in circular flow analysis?", opts, corr, sol))

# 12. Leakages and Injections
opts, corr, sol = rotate_options(
    "Leakages: Savings, Taxes, Imports; Injections: Investment, Government Expenditure, Exports",
    [
        "Leakages: Investment, Exports; Injections: Savings, Imports",
        "Leakages: Government Spending; Injections: Direct Taxes",
        "Leakages: Consumption Expenditure; Injections: Depreciation"
    ],
    "D",
    "1. Leakages (withdrawals) are funds withdrawn from the circular flow of income, reducing aggregate demand ($S, T, M$). Injections (additions) are exogenous spending injected into the circular flow ($I, G, X$).\nHence, Option {{CORR}} is correct.",
    "Categorizes leakages and injections."
)
add_q(make_question(CHAPTER, "Circular Flow of Income", "Which of the following correctly classifies Leakages and Injections in the macroeconomic circular flow?", opts, corr, sol))

# 13. Match Basic Macro Concepts
add_q(make_match_question(
    CHAPTER, "Basic Macroeconomic Concepts",
    "Match the macroeconomic terms in List I with their descriptions in List II:",
    [
        ("A", "Capital Goods"),
        ("B", "Consumer Durables"),
        ("C", "Intermediate Goods"),
        ("D", "Depreciation Reserve Fund")
    ],
    [
        ("I", "Goods used repeatedly in production over many years (machinery)"),
        ("II", "Fund created by producers to replace worn-out fixed assets"),
        ("III", "Goods meant for resale or raw material transformation"),
        ("IV", "Goods like television sets used by households over several years")
    ],
    "A-(I), B-(IV), C-(III), D-(II)",
    [
        "A-(IV), B-(I), C-(III), D-(II)",
        "A-(I), B-(III), C-(IV), D-(II)",
        "A-(II), B-(IV), C-(I), D-(III)"
    ],
    "A",
    "1. Capital Goods -> Repeatedly used in production (I).\n2. Consumer Durables -> Household durables like TV (IV).\n3. Intermediate Goods -> Resale or raw material (III).\n4. Depreciation Reserve -> Replacement fund (II).\nHence, Option A is correct."
))

# 14. Statement I & II: Intermediate consumption
add_q(make_statement_question(
    CHAPTER, "Basic Macroeconomic Concepts",
    "All capital goods are producer goods, but all producer goods are not capital goods.",
    "Single-use producer goods like coal, seeds, and raw cotton are intermediate goods rather than capital goods.",
    "A",
    "1. Statement I is true: Producer goods include both intermediate raw materials (single-use) and fixed capital equipment (capital goods).\n2. Statement II is true: Raw materials are consumed in a single production cycle and are intermediate goods.\nHence, both statements are true (Option A)."
))

# 15. Assertion & Reason: Why intermediate goods are excluded from National Income
add_q(make_assertion_question(
    CHAPTER, "National Income Aggregates",
    "The value of intermediate goods is excluded when calculating National Income.",
    "Including intermediate goods alongside final goods would result in the error of double counting.",
    "A",
    "1. Assertion is true: Intermediate goods are omitted.\n2. Reason is true: The value of final goods already incorporates the value of intermediate inputs; counting both causes double counting.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# -------------------------------------------------------------------------------------------------
# 2. Aggregates: GDP, GNP, NDP, NNP at Market Price and Factor Cost (Q16 - Q45)
# -------------------------------------------------------------------------------------------------

# 16. Factor Cost to Market Price conversion: Net Indirect Taxes (NIT)
opts, corr, sol = rotate_options(
    "Market Price = Factor Cost + Net Indirect Taxes (where NIT = Indirect Taxes - Subsidies)",
    [
        "Market Price = Factor Cost - Indirect Taxes + Subsidies",
        "Market Price = Factor Cost + Depreciation",
        "Market Price = Factor Cost * NFIA"
    ],
    "B",
    "1. Factor Cost (FC) represents the payments made to factors of production. Market Price (MP) includes the net indirect taxes imposed by government: $MP = FC + NIT$, where $NIT = \\text{Indirect Taxes} - \\text{Subsidies}$.\nHence, Option {{CORR}} is correct.",
    "States MP = FC + NIT."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "How is an aggregate at Factor Cost (FC) converted into an aggregate at Market Price (MP)?", opts, corr, sol))

# 17. Domestic to National conversion: Net Factor Income from Abroad (NFIA)
opts, corr, sol = rotate_options(
    "National Product = Domestic Product + NFIA",
    [
        "National Product = Domestic Product - NFIA",
        "National Product = Domestic Product / NFIA",
        "National Product = Domestic Product + Depreciation"
    ],
    "C",
    "1. Domestic product measures output within the domestic economic territory. National product measures output by normal residents anywhere in the world: $National = Domestic + NFIA$, where $NFIA = \\text{Factor income from abroad} - \\text{Factor income paid abroad}$.\nHence, Option {{CORR}} is correct.",
    "States National = Domestic + NFIA."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "What aggregate is added to Domestic Product to arrive at National Product?", opts, corr, sol))

# 18. Components of NFIA
opts, corr, sol = rotate_options(
    "Net compensation of employees, net income from property and entrepreneurship, and net retained earnings of resident companies abroad",
    [
        "Unilateral transfer payments sent by foreign charitable trusts",
        "Foreign direct investment equity inflows and portfolio borrowings",
        "Export subsidies minus customs tariffs collected at seaports"
    ],
    "D",
    "1. Net Factor Income from Abroad (NFIA) has three components: (i) Net compensation of employees, (ii) Net property and entrepreneurial income (rent, interest, dividend), and (iii) Net retained earnings of resident companies abroad.\nHence, Option {{CORR}} is correct.",
    "Identifies the three components of NFIA."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "What are the three core components of Net Factor Income from Abroad (NFIA)?", opts, corr, sol))

# 19. What constitutes 'National Income' strictly
opts, corr, sol = rotate_options(
    "Net National Product at Factor Cost (NNP_FC)",
    [
        "Gross Domestic Product at Market Price (GDP_MP)",
        "Gross National Product at Factor Cost (GNP_FC)",
        "Net Domestic Product at Market Price (NDP_MP)"
    ],
    "A",
    "1. In official national income accounting, 'National Income' strictly refers to Net National Product at Factor Cost ($NNP_{FC}$).\nHence, Option {{CORR}} is correct.",
    "Identifies National Income as NNP_FC."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "Which specific aggregate is formally designated as 'National Income' in macroeconomics?", opts, corr, sol))

# 20. What constitutes 'Domestic Income' strictly
opts, corr, sol = rotate_options(
    "Net Domestic Product at Factor Cost (NDP_FC)",
    [
        "Gross Domestic Product at Market Price (GDP_MP)",
        "Net National Product at Market Price (NNP_MP)",
        "Net Domestic Product at Market Price (NDP_MP)"
    ],
    "B",
    "1. In macroeconomic theory, 'Domestic Income' (or Domestic Factor Income) refers specifically to Net Domestic Product at Factor Cost ($NDP_{FC}$).\nHence, Option {{CORR}} is correct.",
    "Identifies Domestic Income as NDP_FC."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "Which aggregate is officially termed 'Domestic Income'?", opts, corr, sol))

# 21. Numerical conversion: GDP_MP to NNP_FC
opts, corr, sol = rotate_options(
    "Rs. 4,500 crore",
    [
        "Rs. 4,900 crore",
        "Rs. 4,100 crore",
        "Rs. 5,000 crore"
    ],
    "C",
    "1. Formula: $NNP_{FC} = GDP_{MP} - \\text{Depreciation} + NFIA - NIT$.\n2. Given: $GDP_{MP} = 5,000$, $\\text{Depreciation} = 400$, $NFIA = +100$, $NIT = 200$.\n3. $NNP_{FC} = 5,000 - 400 + 100 - 200 = 4,500$ crore.\nHence, Option {{CORR}} is correct.",
    "Calculates NNP_FC = 5000 - 400 + 100 - 200 = 4500."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "Given: GDP_MP = Rs. 5,000 crore, Consumption of Fixed Capital = Rs. 400 crore, NFIA = Rs. 100 crore, and Net Indirect Taxes = Rs. 200 crore. What is the National Income (NNP_FC)?", opts, corr, sol))

# 22. Numerical conversion: NDP_FC to GNP_MP
opts, corr, sol = rotate_options(
    "Rs. 3,550 crore",
    [
        "Rs. 3,000 crore",
        "Rs. 3,250 crore",
        "Rs. 3,800 crore"
    ],
    "D",
    "1. Formula: $GNP_{MP} = NDP_{FC} + \\text{Depreciation} + NFIA + NIT$.\n2. Given: $NDP_{FC} = 3,000$, $\\text{Depreciation} = 250$, $NFIA = -50$, $NIT = 350$.\n3. $GNP_{MP} = 3,000 + 250 + (-50) + 350 = 3,550$ crore.\nHence, Option {{CORR}} is correct.",
    "Calculates GNP_MP = 3000 + 250 - 50 + 350 = 3550."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "Given: NDP_FC = Rs. 3,000 crore, Depreciation = Rs. 250 crore, NFIA = - Rs. 50 crore, and Net Indirect Taxes = Rs. 350 crore. Calculate GNP_MP.", opts, corr, sol))

# 23. Subsidies exceed Indirect Taxes: Market Price vs Factor Cost
opts, corr, sol = rotate_options(
    "Market Price is strictly less than Factor Cost (MP < FC)",
    [
        "Market Price is strictly greater than Factor Cost (MP > FC)",
        "Market Price equals Factor Cost",
        "Factor Cost becomes negative"
    ],
    "A",
    "1. $MP = FC + NIT = FC + (\\text{Indirect Taxes} - \\text{Subsidies})$.\n2. If subsidies exceed indirect taxes, $NIT$ is negative, which means $MP < FC$.\nHence, Option {{CORR}} is correct.",
    "Analyzes case where subsidies exceed taxes (MP < FC)."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "What is the relationship between Market Price and Factor Cost if government subsidies exceed indirect taxes?", opts, corr, sol))

# 24. NFIA is negative: Domestic vs National
opts, corr, sol = rotate_options(
    "Domestic Product is greater than National Product (Domestic > National)",
    [
        "National Product is greater than Domestic Product",
        "National Product equals Domestic Product",
        "Domestic Product is zero"
    ],
    "B",
    "1. $National = Domestic + NFIA$. If $NFIA < 0$ (factor income paid to abroad exceeds factor income earned from abroad), then $National < Domestic$, meaning Domestic Product is greater than National Product.\nHence, Option {{CORR}} is correct.",
    "Evaluates negative NFIA (Domestic > National)."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "When Net Factor Income from Abroad (NFIA) is negative, what is the relative size of Domestic Product versus National Product?", opts, corr, sol))

# 25. Normal Residents definition
opts, corr, sol = rotate_options(
    "An individual or institution that ordinarily resides in the country and whose center of economic interest lies in that country",
    [
        "Anyone who holds Indian citizenship regardless of where they live or earn",
        "Foreign tourists visiting historical monuments in India for two weeks",
        "Foreign embassy ambassadors living within their embassy compounds"
    ],
    "C",
    "1. A 'normal resident' is defined in national accounting as an individual or institution ordinarily residing in a country for one year or more, whose economic interest (earning, spending, accumulation) lies within that economic territory. Citizenship is irrelevant.\nHence, Option {{CORR}} is correct.",
    "Defines normal resident via economic interest."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "Who is considered a 'Normal Resident' of a country in national income estimation?", opts, corr, sol))

# -------------------------------------------------------------------------------------------------
# 3. Measurement Methods: Value Added, Income, and Expenditure Methods (Q26 - Q65)
# -------------------------------------------------------------------------------------------------

# 26. Value Added Method formula
opts, corr, sol = rotate_options(
    "Gross Value Added at Market Price (GVA_MP) = Value of Output - Intermediate Consumption",
    [
        "GVA_MP = Value of Output + Intermediate Consumption",
        "GVA_MP = Total Sales - Depreciation",
        "GVA_MP = Net Profit + Subsidies"
    ],
    "D",
    "1. Value Added Method measures each producing enterprise's net contribution: $GVA_{MP} = \\text{Value of Output} - \\text{Intermediate Consumption}$. Summing $GVA_{MP}$ across all resident enterprises yields $GDP_{MP}$.\nHence, Option {{CORR}} is correct.",
    "States Value Added formula."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "What is the formula for calculating Gross Value Added at Market Price (GVA_MP)?", opts, corr, sol))

# 27. Value of Output components
opts, corr, sol = rotate_options(
    "Value of Output = Sales + Change in Stock (where Change in Stock = Closing Stock - Opening Stock)",
    [
        "Value of Output = Sales - Total Taxes",
        "Value of Output = Domestic Sales - Exports",
        "Value of Output = Opening Stock - Closing Stock"
    ],
    "A",
    "1. If all output is not sold during the accounting year, the unsold portion enters inventory: $\\text{Value of Output} = \\text{Sales} + \\Delta \\text{Stock}$, where $\\Delta \\text{Stock} = \\text{Closing Stock} - \\text{Opening Stock}$.\nHence, Option {{CORR}} is correct.",
    "Formulates Value of Output."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "How is the 'Value of Output' determined when a firm does not sell its entire production during the year?", opts, corr, sol))

# 28. Numerical Value Added calculation
opts, corr, sol = rotate_options(
    "Rs. 450 lakh",
    [
        "Rs. 550 lakh",
        "Rs. 350 lakh",
        "Rs. 500 lakh"
    ],
    "B",
    "1. Domestic Sales = Rs. 400 lakh, Exports = Rs. 100 lakh $\\implies \\text{Total Sales} = 400 + 100 = 500$ lakh.\n2. Change in Stock = Closing (50) - Opening (20) = Rs. 30 lakh.\n3. $\\text{Value of Output} = 500 + 30 = \\text{Rs. 530 lakh}$.\n4. Intermediate Consumption = Rs. 80 lakh.\n5. $GVA_{MP} = 530 - 80 = \\text{Rs. 450 lakh}$.\nHence, Option {{CORR}} is correct.",
    "Calculates GVA_MP = (400 + 100 + 30) - 80 = 450 lakh."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "A manufacturing firm reports: Domestic Sales = Rs. 400 lakh, Exports = Rs. 100 lakh, Closing Stock = Rs. 50 lakh, Opening Stock = Rs. 20 lakh, and Intermediate Purchases = Rs. 80 lakh. What is its GVA_MP?", opts, corr, sol))

# 29. Problem of Double Counting
opts, corr, sol = rotate_options(
    "Counting the value of a commodity more than once by including intermediate goods alongside final goods",
    [
        "Counting both currency notes and coins in money supply",
        "Adding export receipts to import payments",
        "Recording accounting profits twice in tax registers"
    ],
    "C",
    "1. Double counting is the error of counting the value of the same output multiple times as it passes through successive stages of production (e.g. counting wheat, flour, and bread together).\nHence, Option {{CORR}} is correct.",
    "Defines double counting."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "What is the 'Problem of Double Counting' in national income accounting?", opts, corr, sol))

# 30. How to avoid Double Counting
opts, corr, sol = rotate_options(
    "Either take only the value of Final Goods or take the Value Added at each stage of production",
    [
        "Include only intermediate goods and exclude retail consumer goods",
        "Rely exclusively on import tariffs collected by customs",
        "Count only agricultural output and ignore industrial manufacturing"
    ],
    "D",
    "1. Double counting can be avoided by two alternative methods:\n   (i) Final Product Method: include only the value of final goods ready for end-use.\n   (ii) Value Added Method: sum the net value added ($Output - Intermediate$) at each stage of production.\nHence, Option {{CORR}} is correct.",
    "States the two methods to avoid double counting."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "What are the two standard approaches used to avoid the error of double counting?", opts, corr, sol))

# 31. Income Method: Components of Domestic Income (NDP_FC)
opts, corr, sol = rotate_options(
    "Compensation of Employees + Operating Surplus + Mixed Income of Self-Employed",
    [
        "Wages + Rent + Subsidies - Indirect Taxes",
        "Total Sales + Net Exports + Corporate Profits",
        "Personal Disposable Income + Government Tax Receipts"
    ],
    "A",
    "1. The Income Method classifies factor earnings into three broad categories: (i) Compensation of Employees (COE), (ii) Operating Surplus (rent, royalty, interest, profit), and (iii) Mixed Income of self-employed. Their sum equals $NDP_{FC}$.\nHence, Option {{CORR}} is correct.",
    "States components of Income Method for NDP_FC."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "According to the Income Method, how is Net Domestic Product at Factor Cost (NDP_FC) calculated?", opts, corr, sol))

# 32. Components of Compensation of Employees (COE)
opts, corr, sol = rotate_options(
    "Wages and salaries in cash, wages and salaries in kind, and employer's contribution to social security schemes",
    [
        "Wages, dividends, and interest payments received from banks",
        "Old-age pensions, unemployment relief, and lottery winnings",
        "Employee's own contribution to provident fund and life insurance"
    ],
    "B",
    "1. Compensation of Employees includes: (i) Cash wages and salaries (bonuses, dearness allowance), (ii) Payments in kind (free housing, subsidized meals), and (iii) Employer's contribution to social security schemes (provident fund, gratuity). Note: Employee's own contribution is already part of gross wage and not added again.\nHence, Option {{CORR}} is correct.",
    "Lists components of Compensation of Employees."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "What are the three components of 'Compensation of Employees' (COE)?", opts, corr, sol))

# 33. Components of Operating Surplus
opts, corr, sol = rotate_options(
    "Rent + Royalty + Interest + Profit (Dividends + Undistributed Profits + Corporate Tax)",
    [
        "Wages + Salaries + Social Security Benefits",
        "Subsidies + Depreciation + NFIA",
        "Gross Capital Formation + Change in Stock"
    ],
    "C",
    "1. Operating Surplus is the income generated from property and entrepreneurship: Rent + Royalty + Interest + Profit. Profit is further subdivided into Corporate Tax, Dividend, and Retained Earnings (Undistributed Profit).\nHence, Option {{CORR}} is correct.",
    "Lists components of Operating Surplus."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "Which factor incomes constitute 'Operating Surplus'?", opts, corr, sol))

# 34. Mixed Income of Self-Employed definition
opts, corr, sol = rotate_options(
    "Incomes of self-employed individuals (e.g. farmers, doctors, barbers) where wages, rent, interest, and profit cannot be separately distinguished",
    [
        "The blended income earned by central government enterprises",
        "Foreign remittances combined with domestic bank loans",
        "Export revenues earned by multinational retail conglomerates"
    ],
    "D",
    "1. Mixed income refers to the factor earnings of unincorporated enterprises (own-account workers, shopkeepers, farmers) who provide their own labour, land, and capital simultaneously, making it practically impossible to separate wages from profit or rent.\nHence, Option {{CORR}} is correct.",
    "Defines Mixed Income of Self-Employed."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "What is 'Mixed Income of the Self-Employed' in the Income Method?", opts, corr, sol))

# 35. Transfer Payments exclusion
opts, corr, sol = rotate_options(
    "Transfer payments (e.g. old-age pensions, scholarships, unemployment dole) involve no corresponding current production of goods or services",
    [
        "Transfer payments are received exclusively in foreign currencies",
        "Transfer payments exceed the annual government budget",
        "Transfer payments are already included in corporate tax revenues"
    ],
    "A",
    "1. Transfer payments are unearned unilateral payments (gifts, subsidies, scholarships, non-contributory old-age pensions) where no factor service is rendered in exchange. Including them would inflate national income without any real production.\nHence, Option {{CORR}} is correct.",
    "Explains exclusion of transfer payments from national income."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "Why are 'Transfer Payments' strictly excluded from National Income calculations?", opts, corr, sol))

# 36. Retirement Pension vs Old Age Pension
opts, corr, sol = rotate_options(
    "Retirement pension is deferred factor payment (included), while old-age pension is a unilateral transfer payment (excluded)",
    [
        "Old-age pension is included while retirement pension is excluded",
        "Both pensions are excluded as unproductive transfers",
        "Both pensions are included under operating surplus"
    ],
    "B",
    "1. A retirement pension paid to a former employee is part of Compensation of Employees (deferred wage for past factor services), hence INCLUDED. An old-age welfare pension paid by the government to senior citizens is an unearned transfer payment, hence EXCLUDED.\nHence, Option {{CORR}} is correct.",
    "Contrasts retirement pension (included) with old age pension (excluded)."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "How are 'Retirement Pensions' and 'Old Age Welfare Pensions' treated in National Income estimation?", opts, corr, sol))

# 37. Expenditure Method: Components of GDP_MP
opts, corr, sol = rotate_options(
    "Private Final Consumption Expenditure (C) + Government Final Consumption Expenditure (G) + Gross Domestic Capital Formation (I) + Net Exports (X - M)",
    [
        "Consumption + Savings + Taxes + Foreign Aid",
        "Wages + Rent + Interest + Profit",
        "Gross Value Added of Primary + Secondary + Tertiary Sectors"
    ],
    "C",
    "1. Under the Expenditure Method, $GDP_{MP}$ is the aggregate of all final expenditures: $GDP_{MP} = C + G + I + (X - M)$, where $I$ is Gross Domestic Capital Formation and $(X - M)$ is Net Exports.\nHence, Option {{CORR}} is correct.",
    "Lists components of Expenditure Method."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "What are the four components of final expenditure that sum to GDP_MP under the Expenditure Method?", opts, corr, sol))

# 38. Components of Gross Domestic Capital Formation (GDCF)
opts, corr, sol = rotate_options(
    "Gross Domestic Fixed Capital Formation + Change in Stock (Inventory Investment)",
    [
        "Net Fixed Investment - Depreciation",
        "Personal Savings + Corporate Bank Loans",
        "Government Deficit Financing + Gold Purchases"
    ],
    "D",
    "1. Gross Domestic Capital Formation (Gross Investment) consists of two main parts: (i) Gross Domestic Fixed Capital Formation (machinery, factory buildings, infrastructure), and (ii) Change in Stock (inventory investment = closing stock - opening stock).\nHence, Option {{CORR}} is correct.",
    "Formulates GDCF = GDFCF + Change in Stock."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "How is Gross Domestic Capital Formation (GDCF) calculated?", opts, corr, sol))

# 39. Numerical Expenditure Method calculation
opts, corr, sol = rotate_options(
    "Rs. 2,150 crore",
    [
        "Rs. 2,050 crore",
        "Rs. 2,250 crore",
        "Rs. 1,950 crore"
    ],
    "A",
    "1. Given:\n   $C = 1,200$\n   $G = 400$\n   Gross Fixed Investment = 500, Change in Stock = 30 $\\implies GDCF = 500 + 30 = 530$\n   Net Exports = Exports (100) - Imports (80) = $+20$\n2. $GDP_{MP} = C + G + I + (X - M) = 1,200 + 400 + 530 + 20 = 2,150$ crore.\nHence, Option {{CORR}} is correct.",
    "Calculates GDP_MP = 1200 + 400 + 530 + 20 = 2150 crore."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "Calculate GDP_MP from the following: Private Final Consumption = Rs. 1,200 cr, Government Final Consumption = Rs. 400 cr, Gross Fixed Investment = Rs. 500 cr, Change in Stock = Rs. 30 cr, Exports = Rs. 100 cr, Imports = Rs. 80 cr.", opts, corr, sol))

# 40. Treatment of Imputed Rent of Owner-Occupied Houses
opts, corr, sol = rotate_options(
    "Included in National Income because housing services provide real economic utility equivalent to rented houses",
    [
        "Excluded from National Income because no physical money exchange occurred",
        "Included under intermediate consumption of municipal corporations",
        "Treated as an unearned transfer payment from the municipal corporation"
    ],
    "B",
    "1. Imputed rent of owner-occupied dwellings is INCLUDED in national income because the house provides continuous shelter services. Omitting it would arbitrarily reduce GDP simply because people live in their own homes rather than renting.\nHence, Option {{CORR}} is correct.",
    "Explains inclusion of imputed rent of owner-occupied houses."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "Why is the 'Imputed Rent of Owner-Occupied Houses' included in National Income estimation?", opts, corr, sol))

# 41. Treatment of Second-Hand Goods
opts, corr, sol = rotate_options(
    "Sale value is excluded (to avoid double counting), but broker commission/brokerage is included (reward for current productive service)",
    [
        "Both sale value and broker commission are included",
        "Both sale value and broker commission are strictly excluded",
        "Sale value is included but commission is treated as a transfer payment"
    ],
    "C",
    "1. The sale value of secondhand goods was already counted in the GDP of the year it was originally produced; counting it again would be double counting. However, broker's commission represents a fresh service rendered in the current year, hence INCLUDED.\nHence, Option {{CORR}} is correct.",
    "Distinguishes secondhand asset value (excluded) from brokerage (included)."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "How is the sale of a second-hand car and the commission paid to the car broker treated in National Income?", opts, corr, sol))

# 42. Treatment of Production for Self-Consumption
opts, corr, sol = rotate_options(
    "Included in National Income, estimated at prevailing market prices",
    [
        "Excluded completely because goods are not transacted in markets",
        "Treated as depreciation of agricultural assets",
        "Subtracted from gross domestic capital formation"
    ],
    "D",
    "1. Production of goods for self-consumption (e.g. wheat grown by a farmer and consumed by his family) is INCLUDED in national income because these goods contribute to current physical output and have readily available market valuations.\nHence, Option {{CORR}} is correct.",
    "Confirms inclusion of self-consumed output at imputed market price."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "How is the production of goods for self-consumption (e.g. foodgrains retained by farmers) treated in National Income?", opts, corr, sol))

# 43. Treatment of Capital Gains (Share market windfall)
opts, corr, sol = rotate_options(
    "Excluded from National Income because capital gains represent paper asset appreciation without any new physical production",
    [
        "Included under operating surplus as corporate dividend income",
        "Included under gross domestic capital formation",
        "Treated as compensation of employees for financial analysts"
    ],
    "A",
    "1. Capital gains (e.g. capital appreciation on shares, land, antique paintings) do not reflect any current addition to the flow of goods and services; they are mere asset-price revaluations, hence EXCLUDED from national income.\nHence, Option {{CORR}} is correct.",
    "Explains exclusion of financial capital gains."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "Why are 'Capital Gains' arising from the sale of financial shares or real estate excluded from National Income?", opts, corr, sol))

# 44. Treatment of Non-Market Activities (Housewives' services)
opts, corr, sol = rotate_options(
    "Excluded due to non-availability of reliable market data and non-commercial nature of domestic care",
    [
        "Included under mixed income of self-employed",
        "Included under government final consumption expenditure",
        "Treated as an indirect tax subsidy"
    ],
    "B",
    "1. Non-market domestic services performed by family members (cooking, childcare, household upkeep) are excluded from national income due to the severe practical difficulty of valuing them objectively and their non-market motivation.\nHence, Option {{CORR}} is correct.",
    "Explains exclusion of unpaid household labor."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "Why are the services rendered by homemakers (housewives) traditionally excluded from GDP estimation?", opts, corr, sol))

# 45. Match Items with National Income Treatment
add_q(make_match_question(
    CHAPTER, "National Income Treatment",
    "Match the transactions in List I with their correct National Income treatment in List II:",
    [
        ("A", "Purchase of a new machinery by a factory"),
        ("B", "Old age welfare pension paid by government"),
        ("C", "Broker's commission on sale of an old house"),
        ("D", "Purchase of raw material by a restaurant")
    ],
    [
        ("I", "Excluded (Intermediate Consumption)"),
        ("II", "Included (Gross Domestic Capital Formation)"),
        ("III", "Excluded (Transfer Payment)"),
        ("IV", "Included (Factor payment for current service)")
    ],
    "A-(II), B-(III), C-(IV), D-(I)",
    [
        "A-(I), B-(III), C-(IV), D-(II)",
        "A-(II), B-(I), C-(IV), D-(III)",
        "A-(IV), B-(III), C-(II), D-(I)"
    ],
    "A",
    "1. New machinery -> Included (Capital formation, II).\n2. Old age pension -> Excluded (Transfer, III).\n3. Broker commission -> Included (Service, IV).\n4. Raw material -> Excluded (Intermediate, I).\nHence, Option A is correct."
))

# -------------------------------------------------------------------------------------------------
# 4. Real GDP, Nominal GDP, GDP Deflator, and GDP & Welfare (Q46 - Q75)
# -------------------------------------------------------------------------------------------------

# 46. Nominal GDP definition
opts, corr, sol = rotate_options(
    "Gross Domestic Product evaluated at current prevailing market prices of the year of measurement",
    [
        "Gross Domestic Product measured at constant base-year prices",
        "GDP adjusted strictly for environmental degradation",
        "The purchasing power parity valuation of domestic currency"
    ],
    "C",
    "1. Nominal GDP (GDP at current prices) is the monetary value of all final goods and services produced in an economy evaluated at the prices prevailing in the current year: $Nominal\\ GDP = \\sum P_t \\times Q_t$.\nHence, Option {{CORR}} is correct.",
    "Defines Nominal GDP at current prices."
)
add_q(make_question(CHAPTER, "Real vs Nominal GDP", "What is 'Nominal GDP'?", opts, corr, sol))

# 47. Real GDP definition
opts, corr, sol = rotate_options(
    "Gross Domestic Product evaluated at fixed base-year constant prices, reflecting changes purely in physical output",
    [
        "Gross Domestic Product measured at international foreign exchange rates",
        "The total value of output plus total government subsidies",
        "Nominal GDP multiplied by the annual inflation rate"
    ],
    "D",
    "1. Real GDP (GDP at constant prices) values current physical production using prices from a chosen base year: $Real\\ GDP = \\sum P_0 \\times Q_t$. It eliminates the distorting effect of inflation, reflecting true physical growth.\nHence, Option {{CORR}} is correct.",
    "Defines Real GDP at constant prices."
)
add_q(make_question(CHAPTER, "Real vs Nominal GDP", "Why is 'Real GDP' considered a superior indicator of true economic growth compared to Nominal GDP?", opts, corr, sol))

# 48. GDP Deflator formula
opts, corr, sol = rotate_options(
    "GDP Deflator = (Nominal GDP / Real GDP) * 100",
    [
        "GDP Deflator = (Real GDP / Nominal GDP) * 100",
        "GDP Deflator = Nominal GDP - Real GDP",
        "GDP Deflator = (Nominal GDP + Real GDP) / 2"
    ],
    "A",
    "1. The GDP Deflator measures the overall price level of all domestically produced final goods and services: $\\text{GDP Deflator} = \\left(\\frac{\\text{Nominal GDP}}{\\text{Real GDP}}\\right) \\times 100$.\nHence, Option {{CORR}} is correct.",
    "States GDP Deflator formula."
)
add_q(make_question(CHAPTER, "Real vs Nominal GDP", "What is the formula for calculating the GDP Deflator?", opts, corr, sol))

# 49. Numerical GDP Deflator calculation
opts, corr, sol = rotate_options(
    "125, indicating a 25% increase in the general price level",
    [
        "80, indicating a 20% decline in the general price level",
        "150, indicating a 50% price spike",
        "100, indicating perfect price stability"
    ],
    "B",
    "1. Given: Nominal GDP = Rs. 15,000 crore, Real GDP = Rs. 12,000 crore.\n2. $\\text{GDP Deflator} = \\left(\\frac{15,000}{12,000}\\right) \\times 100 = 1.25 \\times 100 = 125$.\n3. Since base year index is 100, price level has increased by $125 - 100 = 25\\%$.\nHence, Option {{CORR}} is correct.",
    "Calculates GDP deflator = (15000 / 12000) * 100 = 125."
)
add_q(make_question(CHAPTER, "Real vs Nominal GDP", "If Nominal GDP is Rs. 15,000 crore and Real GDP is Rs. 12,000 crore, what is the value of the GDP Deflator and what does it indicate?", opts, corr, sol))

# 50. Numerical Real GDP from Deflator
opts, corr, sol = rotate_options(
    "Rs. 8,000 crore",
    [
        "Rs. 11,200 crore",
        "Rs. 10,000 crore",
        "Rs. 6,400 crore"
    ],
    "C",
    "1. Given: Nominal GDP = Rs. 9,600 crore, GDP Deflator = 120.\n2. $\\text{Real GDP} = \\left(\\frac{\\text{Nominal GDP}}{\\text{GDP Deflator}}\\right) \\times 100 = \\left(\\frac{9,600}{120}\\right) \\times 100 = 80 \\times 100 = \\text{Rs. 8,000 crore}$.\nHence, Option {{CORR}} is correct.",
    "Computes Real GDP = (9600 / 120) * 100 = 8000 crore."
)
add_q(make_question(CHAPTER, "Real vs Nominal GDP", "A country's Nominal GDP is Rs. 9,600 crore and its GDP Deflator is 120. What is its Real GDP?", opts, corr, sol))

# 51. GDP Deflator vs Consumer Price Index (CPI)
opts, corr, sol = rotate_options(
    "GDP deflator covers all domestically produced goods, whereas CPI covers a representative basket of consumer goods including imports",
    [
        "GDP deflator includes imports while CPI excludes imported goods",
        "CPI is calculated annually while GDP deflator is published daily",
        "There is no difference between CPI and the GDP deflator"
    ],
    "D",
    "1. Differences: (i) GDP Deflator reflects prices of ALL goods and services produced domestically, while CPI reflects prices of a fixed basket bought by typical consumers. (ii) Imported goods are included in CPI, but excluded from GDP Deflator. (iii) CPI uses fixed weights, GDP Deflator uses changing weights.\nHence, Option {{CORR}} is correct.",
    "Contrasts GDP Deflator with CPI."
)
add_q(make_question(CHAPTER, "Real vs Nominal GDP", "How does the GDP Deflator differ from the Consumer Price Index (CPI)?", opts, corr, sol))

# 52. Limitations of GDP as an index of welfare: Externalities
opts, corr, sol = rotate_options(
    "Externalities are side-effects of economic activities (e.g. industrial pollution) that benefit or harm third parties without market payments",
    [
        "Externalities refer to foreign tourists visiting domestic heritage sites",
        "Externalities are customs duties paid on intermediate electronics",
        "Externalities represent the legal costs of registering corporate patents"
    ],
    "A",
    "1. Externalities refer to benefits or costs an economic unit causes to others for which they are neither compensated nor penalized (e.g. factory smoke causing respiratory illness = negative externality; public park planted by a refinery = positive externality). GDP ignores both.\nHence, Option {{CORR}} is correct.",
    "Defines externalities and why GDP fails to capture welfare."
)
add_q(make_question(CHAPTER, "GDP and Welfare", "What are 'Externalities' and why do they limit GDP's reliability as a measure of economic welfare?", opts, corr, sol))

# 53. Positive vs Negative Externalities examples
opts, corr, sol = rotate_options(
    "Positive: Planting trees in a public park; Negative: Dumping toxic chemical effluents into a river",
    [
        "Positive: Factory exhaust fumes; Negative: Vaccination programs",
        "Positive: High inflation rates; Negative: Corporate income tax collection",
        "Positive: Purchasing luxury imported cars; Negative: Eating home-cooked meals"
    ],
    "B",
    "1. Positive externalities create uncompensated social benefits (e.g. landscaping a park, mass immunization). Negative externalities inflict uncompensated social harm (e.g. industrial water contamination, vehicle smog).\nHence, Option {{CORR}} is correct.",
    "Categorizes positive and negative externalities."
)
add_q(make_question(CHAPTER, "GDP and Welfare", "Which of the following correctly pairs a Positive Externality with a Negative Externality?", opts, corr, sol))

# 54. Limitations of GDP as welfare: Non-monetary exchanges
opts, corr, sol = rotate_options(
    "Large non-monetary transactions (barter, kitchen gardening, unpaid domestic care) are unrecorded, underestimating true output",
    [
        "Non-monetary transactions cause the currency exchange rate to appreciate",
        "Non-monetary transactions make corporate balance sheets illegal",
        "Non-monetary transactions double the fiscal deficit"
    ],
    "C",
    "1. In developing countries like India, many economic activities occur outside formal money markets (barter trade in remote villages, subsistence farming, unpaid household services). Since they lack monetary price tags, GDP fails to capture them.\nHence, Option {{CORR}} is correct.",
    "Explains non-monetary transactions limitation."
)
add_q(make_question(CHAPTER, "GDP and Welfare", "Why does the presence of a large non-monetary informal sector distort GDP as a welfare indicator in developing nations?", opts, corr, sol))

# 55. Limitations of GDP as welfare: Composition of GDP
opts, corr, sol = rotate_options(
    "An increase in GDP driven by production of war armaments and military weapons does not enhance the standard of living of citizens",
    [
        "Producing consumer goods reduces total employment across all sectors",
        "GDP cannot distinguish between Indian currency and foreign dollars",
        "Capital goods production lowers long-term productive capacity"
    ],
    "D",
    "1. The composition of output matters: an expansion in GDP resulting from military tanks and ammunition increases the statistical aggregate but does not improve civilian nutritional, educational, or healthcare welfare.\nHence, Option {{CORR}} is correct.",
    "Analyzes output composition limitation of GDP."
)
add_q(make_question(CHAPTER, "GDP and Welfare", "How does the 'Composition of GDP' constrain its effectiveness as an index of social welfare?", opts, corr, sol))

# 56. Limitations of GDP as welfare: Distribution of GDP
opts, corr, sol = rotate_options(
    "A rise in GDP accompanied by widening income inequality may leave the majority of the population poorer despite a higher national aggregate",
    [
        "Equal income distribution automatically halves real GDP",
        "A rising GDP always guarantees that every citizen receives identical wealth",
        "Inequality increases the GDP deflator to infinity"
    ],
    "A",
    "1. If GDP growth is concentrated in the hands of the top 1% while the poorest 50% experience falling real incomes, national welfare has deteriorated even though statistical GDP has expanded.\nHence, Option {{CORR}} is correct.",
    "Explains income distribution limitation."
)
add_q(make_question(CHAPTER, "GDP and Welfare", "Why does the 'Distribution of GDP' limit the conclusion that a higher GDP implies higher social welfare?", opts, corr, sol))

# 57. Green GDP concept
opts, corr, sol = rotate_options(
    "GDP adjusted for the depletion of natural resources and environmental degradation",
    [
        "GDP calculated exclusively in terms of organic agricultural crops",
        "The total monetary value of renewable solar energy installations",
        "A tax levied on greenhouse gas emissions across factory chimneys"
    ],
    "B",
    "1. Green GDP is an alternative environmental accounting index: $\\text{Green GDP} = GDP - \\text{Environmental Degradation} - \\text{Depletion of Natural Resources}$.\nHence, Option {{CORR}} is correct.",
    "Defines Green GDP."
)
add_q(make_question(CHAPTER, "GDP and Welfare", "What does 'Green GDP' represent?", opts, corr, sol))

# 58. Statement I & II: Real GDP and Welfare
add_q(make_statement_question(
    CHAPTER, "GDP and Welfare",
    "An increase in Real GDP always guarantees a proportionate increase in the economic welfare of all citizens.",
    "Real GDP does not account for income inequality, environmental pollution, or unpaid non-monetary exchanges.",
    "D",
    "1. Statement I is false: Real GDP growth does NOT guarantee welfare improvement for everyone (due to inequality, bad composition, pollution).\n2. Statement II is true: Real GDP omits distribution, pollution, and non-market output.\nHence, Statement I is false and Statement II is true (Option D)."
))

# 59. Assertion & Reason: Negative externalities and GDP
add_q(make_assertion_question(
    CHAPTER, "GDP and Welfare",
    "GDP overestimates social welfare when economic growth generates substantial environmental pollution.",
    "The market value of goods produced by polluting factories is added to GDP, while the health and environmental costs borne by society are ignored.",
    "A",
    "1. Assertion is true: GDP overstates welfare when negative externalities occur.\n2. Reason is true: The output is counted but environmental damage is omitted from national accounts.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 60. Net Domestic Product at Factor Cost vs National Income
opts, corr, sol = rotate_options(
    "National Income (NNP_FC) = Domestic Income (NDP_FC) + Net Factor Income from Abroad (NFIA)",
    [
        "National Income = Domestic Income - Depreciation",
        "National Income = Domestic Income + Net Indirect Taxes",
        "National Income is always strictly equal to Domestic Income"
    ],
    "C",
    "1. The exact algebraic relationship between Domestic Income ($NDP_{FC}$) and National Income ($NNP_{FC}$) is: $NNP_{FC} = NDP_{FC} + NFIA$.\nHence, Option {{CORR}} is correct.",
    "Relates NDP_FC to NNP_FC via NFIA."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "What is the exact algebraic relationship connecting Domestic Income (NDP_FC) and National Income (NNP_FC)?", opts, corr, sol))

# -------------------------------------------------------------------------------------------------
# 5. Advanced Aggregate Syntheses, Numerical Conversions & Conceptual Nuances (Q61 - Q100)
# -------------------------------------------------------------------------------------------------

# 61. Numerical finding Operating Surplus
opts, corr, sol = rotate_options(
    "Rs. 800 crore",
    [
        "Rs. 500 crore",
        "Rs. 1,000 crore",
        "Rs. 600 crore"
    ],
    "A",
    "1. Given: Rent = 200, Royalty = 50, Interest = 250, Corporate Tax = 100, Dividend = 150, Undistributed Profits = 50.\n2. Profit = $100 + 150 + 50 = \\text{Rs. 300 crore}$.\n3. Operating Surplus = $\\text{Rent} + \\text{Royalty} + \\text{Interest} + \\text{Profit} = 200 + 50 + 250 + 300 = \\text{Rs. 800 crore}$.\nHence, Option {{CORR}} is correct.",
    "Calculates Operating Surplus = 200 + 50 + 250 + 300 = 800 crore."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "Calculate Operating Surplus from: Rent = Rs. 200 cr, Royalty = Rs. 50 cr, Interest = Rs. 250 cr, Corporate Profit Tax = Rs. 100 cr, Dividends = Rs. 150 cr, and Undistributed Profits = Rs. 50 cr.", opts, corr, sol))

# 62. Numerical finding Compensation of Employees
opts, corr, sol = rotate_options(
    "Rs. 950 crore",
    [
        "Rs. 800 crore",
        "Rs. 1,050 crore",
        "Rs. 700 crore"
    ],
    "B",
    "1. Given: Wages and salaries in cash = 700, Value of free housing (in kind) = 100, Employer's contribution to provident fund = 150, Employee's contribution to PF = 100.\n2. Note: Employee's contribution is paid out of cash wages, so it is NOT added again.\n3. COE = $700 + 100 + 150 = \\text{Rs. 950 crore}$.\nHence, Option {{CORR}} is correct.",
    "Computes COE = 700 + 100 + 150 = 950 crore."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "From the data: Wages in cash = Rs. 700 cr, Free housing = Rs. 100 cr, Employer's PF contribution = Rs. 150 cr, Employee's PF contribution = Rs. 100 cr. What is the Compensation of Employees?", opts, corr, sol))

# 63. Numerical finding Net Indirect Taxes
opts, corr, sol = rotate_options(
    "Rs. 180 crore",
    [
        "Rs. 320 crore",
        "Rs. 250 crore",
        "Rs. 70 crore"
    ],
    "C",
    "1. Given: Goods and Services Tax (GST) = 220, Customs Duties = 30 $\\implies \\text{Total Indirect Taxes} = 250$.\n2. Subsidies on LPG and fertilizer = 70.\n3. $NIT = \\text{Indirect Taxes} - \\text{Subsidies} = 250 - 70 = \\text{Rs. 180 crore}$.\nHence, Option {{CORR}} is correct.",
    "Calculates NIT = (220 + 30) - 70 = 180 crore."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "If GST collected is Rs. 220 crore, Customs duties are Rs. 30 crore, and government subsidies on fertilizer are Rs. 70 crore, what is the value of Net Indirect Taxes?", opts, corr, sol))

# 64. Numerical finding NFIA from components
opts, corr, sol = rotate_options(
    "+ Rs. 60 crore",
    [
        "- Rs. 60 crore",
        "+ Rs. 160 crore",
        "- Rs. 40 crore"
    ],
    "D",
    "1. Factor income earned from abroad: Compensation of employees = 50, Property income = 80 $\\implies \\text{Total from abroad} = 130$.\n2. Factor income paid to abroad = 70.\n3. $NFIA = 130 - 70 = +60$ crore.\nHence, Option {{CORR}} is correct.",
    "Calculates NFIA = 130 - 70 = +60 crore."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "Factor income received by residents from abroad is Rs. 130 crore and factor income paid to non-residents within the domestic territory is Rs. 70 crore. What is the Net Factor Income from Abroad?", opts, corr, sol))

# 65. Private Income vs Personal Income basics
opts, corr, sol = rotate_options(
    "Personal income excludes corporate profit taxes and undistributed corporate profits from private income",
    [
        "Personal income includes depreciation of government assets",
        "Private income excludes factor payments from abroad",
        "There is no difference between private income and personal income"
    ],
    "A",
    "1. Personal Income is the income actually received by households: $\\text{Personal Income} = \\text{Private Income} - \\text{Undistributed Corporate Profits} - \\text{Corporate Taxes}$.\nHence, Option {{CORR}} is correct.",
    "Distinguishes Personal Income from Private Income."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "How is 'Personal Income' derived from 'Private Income' in macroeconomic accounting?", opts, corr, sol))

# 66. Personal Disposable Income (PDI) definition
opts, corr, sol = rotate_options(
    "PDI = Personal Income - Personal Direct Taxes - Miscellaneous Administrative Fees and Fines",
    [
        "PDI = Personal Income + Indirect Taxes",
        "PDI = Personal Income - Subsidies",
        "PDI = Total Sales - Depreciation"
    ],
    "B",
    "1. Personal Disposable Income is the actual disposable purchasing power left with households to consume or save: $PDI = \\text{Personal Income} - \\text{Direct Taxes (Income Tax)} - \\text{Fees/Fines}$.\nHence, Option {{CORR}} is correct.",
    "Defines Personal Disposable Income."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "What is the formula for Personal Disposable Income (PDI)?", opts, corr, sol))

# 67. Value of domestic territory (Economic territory)
opts, corr, sol = rotate_options(
    "Includes national land, territorial waters, embassies and consulates abroad, and ships/aircraft operated by residents",
    [
        "Includes strictly the geographical land border shown on school maps",
        "Includes foreign embassies located in New Delhi",
        "Includes offices of multinational corporations headquartered overseas"
    ],
    "C",
    "1. The Economic Territory (Domestic Territory) includes: geographical territory, territorial waters, embassies/consulates located abroad, and aircraft/vessels operated by residents between countries. It excludes foreign embassies located within India.\nHence, Option {{CORR}} is correct.",
    "Defines economic territory."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "What is included within the 'Economic Territory' (Domestic Territory) of India for national accounting?", opts, corr, sol))

# 68. Embassies located in India
opts, corr, sol = rotate_options(
    "Treated as part of the economic territory of their respective parent nations, not India",
    [
        "Treated as part of India's domestic economic territory",
        "Counted as independent non-profit households",
        "Treated as commercial banks creating fiat money"
    ],
    "D",
    "1. Foreign embassies, consulates, and military bases located in India (e.g. US Embassy in New Delhi) are extra-territorial enclaves belonging to the domestic territory of their parent countries, NOT India.\nHence, Option {{CORR}} is correct.",
    "Notes foreign embassies are excluded from domestic territory."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "How are foreign embassies (e.g. American Embassy in New Delhi) classified in defining India's economic territory?", opts, corr, sol))

# 69. Indian embassy in Washington: factor earnings
opts, corr, sol = rotate_options(
    "Part of India's Domestic Product as well as National Product",
    [
        "Part of USA's Domestic Product only",
        "Excluded from both Indian and American national income",
        "Treated as an illegal transfer payment"
    ],
    "A",
    "1. An Indian embassy located in Washington is part of India's economic territory. The factor services rendered by Indian residents working there are part of India's Domestic Product ($NDP_{FC}$) and India's National Product ($NNP_{FC}$).\nHence, Option {{CORR}} is correct.",
    "Attributes Indian embassy earnings to Indian territory."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "Salaries earned by Indian diplomats working in the Indian Embassy in Washington are part of:", opts, corr, sol))

# 70. Foreign bank branch in India (e.g. Citibank)
opts, corr, sol = rotate_options(
    "Part of India's Domestic Product, but part of USA's National Product (outflow via NFIA)",
    [
        "Part of India's National Product and USA's Domestic Product",
        "Excluded from both countries' domestic production",
        "Counted under Indian government final consumption"
    ],
    "B",
    "1. Citibank branches in Mumbai operate inside India's domestic territory, so profits generated are part of India's Domestic Product ($GDP$). However, Citibank is owned by non-residents (USA), so the profit remitted abroad is subtracted via $NFIA$, entering USA's National Product.\nHence, Option {{CORR}} is correct.",
    "Analyzes foreign corporate branches in domestic territory."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "How is the profit earned by a branch of an American bank (Citibank) operating in Mumbai treated in national income?", opts, corr, sol))

# 71. Sequence of calculating National Income via Value Added Method
add_q(make_sequence_question(
    CHAPTER, "Methods of Calculating National Income",
    "Arrange the following steps in estimating National Income using the Product (Value Added) Method:",
    [
        "Identify and classify all producing units into Primary, Secondary, and Tertiary sectors",
        "Estimate Gross Value Added at Market Price (GVA_MP = Output - Intermediate Consumption) for each sector",
        "Sum GVA_MP across all three sectors to obtain GDP_MP",
        "Deduct Depreciation, deduct Net Indirect Taxes, and add NFIA to calculate NNP_FC"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (C), (D)",
        "(A), (C), (B), (D)",
        "(C), (A), (B), (D)"
    ],
    "A",
    "1. Sector classification (A) -> Sectoral GVA_MP estimation (B) -> Sum to GDP_MP (C) -> Convert to NNP_FC via Depreciation, NIT, and NFIA (D).\nHence, Option A is correct."
))

# 72. Sequence of calculating National Income via Income Method
add_q(make_sequence_question(
    CHAPTER, "Methods of Calculating National Income",
    "Arrange the sequential steps in calculating National Income using the Factor Income Method:",
    [
        "Identify producing enterprises that employ factors of production",
        "Classify factor payments into COE, Operating Surplus, and Mixed Income",
        "Sum factor payments across all enterprises to calculate Domestic Income (NDP_FC)",
        "Add Net Factor Income from Abroad (NFIA) to arrive at National Income (NNP_FC)"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (D), (C)",
        "(A), (C), (B), (D)",
        "(C), (A), (B), (D)"
    ],
    "A",
    "1. Identify enterprises (A) -> Classify factor payments (B) -> Sum to NDP_FC (C) -> Add NFIA to obtain NNP_FC (D).\nHence, Option A is correct."
))

# 73. Sequence of calculating National Income via Expenditure Method
add_q(make_sequence_question(
    CHAPTER, "Methods of Calculating National Income",
    "Arrange the steps in estimating National Income using the Final Expenditure Method:",
    [
        "Identify economic sectors incurring final expenditures (Households, Govt, Producers, Rest of World)",
        "Aggregate C, G, Gross Domestic Capital Formation (I), and Net Exports (X - M) to find GDP_MP",
        "Deduct Depreciation to get NDP_MP, and deduct Net Indirect Taxes to get NDP_FC",
        "Add Net Factor Income from Abroad (NFIA) to obtain NNP_FC (National Income)"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (C), (D)",
        "(A), (C), (B), (D)",
        "(C), (B), (A), (D)"
    ],
    "A",
    "1. Identify spending units (A) -> Sum C + G + I + (X-M) to GDP_MP (B) -> Deduct Dep and NIT to NDP_FC (C) -> Add NFIA to NNP_FC (D).\nHence, Option A is correct."
))

# 74. Statement I & II: Operating surplus in government administration
add_q(make_statement_question(
    CHAPTER, "Methods of Calculating National Income",
    "General government administrative departments (like defense, police, justice) generate zero operating surplus.",
    "General government administrative services are non-commercial and provided free of charge without commercial rent, interest, or profit motive.",
    "A",
    "1. Statement I is true: Government administration produces zero operating surplus; its contribution to GDP consists solely of Compensation of Employees.\n2. Statement II is true: These services are non-market and not sold for profit.\nHence, both statements are true (Option A)."
))

# 75. Assertion & Reason: Why transfer payments are not part of COE
add_q(make_assertion_question(
    CHAPTER, "Methods of Calculating National Income",
    "Festival bonuses paid by a private firm to its employees are included in Compensation of Employees.",
    "Festival bonuses are part of the contractual remuneration for labor services rendered by employees to the employer.",
    "A",
    "1. Assertion is true: Festival bonuses are part of COE.\n2. Reason is true: Bonuses are part of labor earnings, not unilateral charity.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 76. Unsold stock of finished goods treatment
opts, corr, sol = rotate_options(
    "Treated as inventory investment (capital formation) and included in GDP of the current year",
    [
        "Treated as capital loss and deducted from gross value added",
        "Excluded completely until sold in a future calendar year",
        "Counted under government final consumption expenditure"
    ],
    "B",
    "1. Goods produced in the current year but unsold by year-end are added to inventory as Change in Stock. They represent inventory investment and are included in current GDP.\nHence, Option {{CORR}} is correct.",
    "Classifies unsold stock as inventory investment."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "How are finished goods produced during the accounting year that remain unsold on 31st March treated in GDP?", opts, corr, sol))

# 77. Financial investments (shares, debentures, bonds) treatment
opts, corr, sol = rotate_options(
    "Excluded from Gross Capital Formation because they are paper claims representing transfer of financial titles, not creation of physical capital assets",
    [
        "Included under Gross Fixed Capital Formation",
        "Included under Private Final Consumption Expenditure",
        "Treated as Net Factor Income from Abroad"
    ],
    "C",
    "1. Buying shares, bonds, or mutual funds is a financial investment (transfer of ownership of existing claims), not real investment. Real economic investment occurs only when physical assets (machines, factories) are newly built.\nHence, Option {{CORR}} is correct.",
    "Distinguishes financial investment from real capital formation."
)
add_q(make_question(CHAPTER, "Basic Macroeconomic Concepts", "Why is the purchase of financial shares or corporate bonds excluded from Gross Capital Formation in national accounting?", opts, corr, sol))

# 78. Illegal activities (smuggling, black money) treatment
opts, corr, sol = rotate_options(
    "Excluded from National Income due to lack of reliable records and their unlawful nature under criminal statutes",
    [
        "Included under mixed income of unincorporated enterprises",
        "Included under operating surplus of foreign trade",
        "Treated as net capital transfers from abroad"
    ],
    "D",
    "1. Incomes from illegal activities (smuggling, gambling, unauthorized black-market trade) are excluded from national income because they are unrecorded, untaxed, and socially/legally prohibited.\nHence, Option {{CORR}} is correct.",
    "Explains exclusion of illegal incomes."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "How are incomes generated from illicit or criminal activities (such as smuggling) treated in National Income estimation?", opts, corr, sol))

# 79. Windfall gains (lottery, betting) treatment
opts, corr, sol = rotate_options(
    "Excluded from National Income because they do not arise from any productive economic activity",
    [
        "Included under Compensation of Employees",
        "Included under Net Factor Income from Abroad",
        "Included under Government Capital Expenditure"
    ],
    "A",
    "1. Windfall gains (lottery prizes, horse racing bets) are unearned transfers of purchasing power without any corresponding contribution to production, hence EXCLUDED from national income.\nHence, Option {{CORR}} is correct.",
    "Explains exclusion of windfall gains."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "Why are winnings from lotteries or casino gambling excluded from National Income?", opts, corr, sol))

# 80. Real Flow in factor market: Factors provided
opts, corr, sol = rotate_options(
    "Land, Labour, Capital, and Entrepreneurship",
    [
        "Rent, Wages, Interest, and Profit",
        "Currency notes, Bank checks, Credit cards, and Gold",
        "Consumer durables, Non-durables, Capital goods, and Services"
    ],
    "B",
    "1. The four fundamental physical factor services provided by households to firms in the real flow are Land, Labour, Capital, and Entrepreneurial ability.\nHence, Option {{CORR}} is correct.",
    "Lists the four factors of production in real flow."
)
add_q(make_question(CHAPTER, "Circular Flow of Income", "What factor services are provided by households to firms in the real flow of a two-sector economy?", opts, corr, sol))

# 81. Money flow in factor market: Factor payments
opts, corr, sol = rotate_options(
    "Rent for land, Wages for labour, Interest for capital, and Profit for entrepreneurship",
    [
        "Indirect taxes, Subsidies, Tariffs, and Surcharges",
        "Dividends, Retained earnings, Bank deposits, and Mutual funds",
        "Machinery, Raw materials, Coal, and Electricity"
    ],
    "C",
    "1. The factor payments made by firms to households in the money flow correspond to the four factors: Rent (land), Wages/Salaries (labour), Interest (capital), and Profit (entrepreneurship).\nHence, Option {{CORR}} is correct.",
    "Matches factor payments with factor services."
)
add_q(make_question(CHAPTER, "Circular Flow of Income", "Which monetary rewards flow from firms to households in return for factor services?", opts, corr, sol))

# 82. Three phases in Circular Flow of Income
opts, corr, sol = rotate_options(
    "Generation phase (Production), Distribution phase (Factor Income), and Disposition phase (Expenditure)",
    [
        "Taxation phase, Borrowing phase, and Printing phase",
        "Import phase, Export phase, and Remittance phase",
        "Monopoly phase, Duopoly phase, and Oligopoly phase"
    ],
    "D",
    "1. The circular flow of income passes through three continuous phases:\n   (i) Generation Phase: firms produce goods/services using factor inputs.\n   (ii) Distribution Phase: factor incomes flow to factor owners.\n   (iii) Disposition Phase: factor owners spend incomes on goods/services.\nHence, Option {{CORR}} is correct.",
    "Lists the three phases of circular flow."
)
add_q(make_question(CHAPTER, "Circular Flow of Income", "What are the three sequential phases in the circular flow of income?", opts, corr, sol))

# 83. Why National Income can be measured by three methods
opts, corr, sol = rotate_options(
    "Because Total Value of Output produced = Total Factor Income generated = Total Final Expenditure incurred (Triple Identity)",
    [
        "Because the central bank audits three different ledgers every quarter",
        "Because there are three geographic regions in India (North, South, East)",
        "Because tax laws mandate triple verification of bank statements"
    ],
    "A",
    "1. The triple identity of national income states: Total Production $\\equiv$ Total Income $\\equiv$ Total Expenditure. Every rupee of value added generates an equal rupee of factor income, which is disposed of as final expenditure.\nHence, Option {{CORR}} is correct.",
    "Explains the triple identity of national income."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "Why do the Product Method, Income Method, and Expenditure Method yield the exact same estimate of National Income in theory?", opts, corr, sol))

# 84. Government Final Consumption Expenditure (GFCE) components
opts, corr, sol = rotate_options(
    "Compensation of government employees + net purchases of goods and services in domestic market + net imports by general government",
    [
        "Subsidies paid to farmers + old-age pensions paid to senior citizens",
        "Direct income tax revenues collected by the central board of direct taxes",
        "Interest payments made by the government on internal public debt"
    ],
    "B",
    "1. GFCE represents current expenditure incurred by general government in providing free collective administrative, defense, educational, and healthcare services to society.\nHence, Option {{CORR}} is correct.",
    "Defines Government Final Consumption Expenditure."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "What does 'Government Final Consumption Expenditure' (GFCE) measure?", opts, corr, sol))

# 85. Net Exports (X - M) definition
opts, corr, sol = rotate_options(
    "The difference between total exports of goods and services and total imports of goods and services during the year",
    [
        "Total tariff revenue collected at seaports minus export subsidies",
        "The inflow of foreign direct investment minus portfolio outflows",
        "The bilateral trade surplus with neighbouring countries only"
    ],
    "C",
    "1. Net Exports ($X - M$) is the difference between aggregate exports (goods/services produced domestically and purchased by foreigners) and aggregate imports (goods/services produced abroad and purchased by domestic residents).\nHence, Option {{CORR}} is correct.",
    "Defines Net Exports."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "How is 'Net Exports' defined in the Expenditure Method of measuring GDP?", opts, corr, sol))

# 86. Why Imports are deducted in Expenditure Method
opts, corr, sol = rotate_options(
    "Because imports are already included inside private and government consumption and investment, but do not represent domestic production",
    [
        "Because importing goods is considered economically illegal under GATT",
        "Because import payments reduce domestic currency note circulation",
        "Because foreign firms do not pay income taxes to the central government"
    ],
    "D",
    "1. Expenditures $C, I, G$ contain spending on both domestically produced and imported goods. To isolate spending exclusively on DOMESTIC production ($GDP$), imports ($M$) must be subtracted: $C + I + G + X - M$.\nHence, Option {{CORR}} is correct.",
    "Explains why imports are deducted in GDP calculation."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "Why is the value of imports subtracted in the Expenditure Method formula for GDP?", opts, corr, sol))

# 87. Per Capita Income formula
opts, corr, sol = rotate_options(
    "Per Capita Income = National Income (NNP_FC) / Total Population",
    [
        "Per Capita Income = GDP_MP * Total Population",
        "Per Capita Income = Personal Disposable Income / Working Age Labour Force",
        "Per Capita Income = Total Money Supply / Adult Citizens"
    ],
    "A",
    "1. Per Capita Income measures the average income earned per person in a nation: $\\text{Per Capita Income} = \\frac{\\text{National Income } (NNP_{FC})}{\\text{Total Population}}$.\nHence, Option {{CORR}} is correct.",
    "States Per Capita Income formula."
)
add_q(make_question(CHAPTER, "National Income Aggregates", "What is the formula for calculating a country's 'Per Capita Income'?", opts, corr, sol))

# 88. Real GDP per capita growth condition
opts, corr, sol = rotate_options(
    "The rate of growth of Real GDP must exceed the rate of growth of population",
    [
        "The rate of inflation must exceed the nominal interest rate",
        "The fiscal deficit must exceed 5% of GDP",
        "Exports must strictly equal imports across all quarters"
    ],
    "B",
    "1. Per capita real income rises if and only if the percentage increase in physical output (Real GDP) is higher than the percentage increase in the population.\nHence, Option {{CORR}} is correct.",
    "States condition for rising per capita income."
)
add_q(make_question(CHAPTER, "GDP and Welfare", "Under what condition will a nation experience an increase in its Real GDP per capita?", opts, corr, sol))

# 89. Base year in Real GDP
opts, corr, sol = rotate_options(
    "A normal, stable benchmark year free from extraordinary economic crises, droughts, wars, or pandemics",
    [
        "The year in which the highest historical inflation was recorded",
        "A year chosen at random by digital computer simulations",
        "The first year after national independence"
    ],
    "C",
    "1. The base year used for constant-price GDP calculation should be a 'normal' economic year—one without extreme economic shocks, crop failures, war, or hyperinflation—so prices serve as a reliable yardstick.\nHence, Option {{CORR}} is correct.",
    "Explains criteria for selecting GDP base year."
)
add_q(make_question(CHAPTER, "Real vs Nominal GDP", "What criteria must be satisfied when selecting a 'Base Year' for constant-price GDP estimation?", opts, corr, sol))

# 90. John Maynard Keynes book publication year
opts, corr, sol = rotate_options(
    "1936, titled 'The General Theory of Employment, Interest and Money'",
    [
        "1929, titled 'Principles of Political Economy'",
        "1776, titled 'Wealth of Nations'",
        "1947, titled 'Economic Development in Asia'"
    ],
    "D",
    "1. Modern macroeconomics emerged following the publication of John Maynard Keynes's seminal work, 'The General Theory of Employment, Interest and Money', published in 1936 in response to the Great Depression of 1929.\nHence, Option {{CORR}} is correct.",
    "Identifies Keynes's 1936 book."
)
add_q(make_question(CHAPTER, "Introduction to Macroeconomics", "In which year was John Maynard Keynes's groundbreaking treatise that laid the foundation for modern macroeconomics published?", opts, corr, sol))

# 91. Great Depression period
opts, corr, sol = rotate_options(
    "1929 to 1933, originating with the collapse of the US stock market",
    [
        "1914 to 1918, during the First World War",
        "1944 to 1948, during the Bretton Woods conference",
        "1971 to 1975, during the global oil embargo"
    ],
    "A",
    "1. The Great Depression began in 1929 and lasted through the 1930s, causing widespread factory shutdowns, catastrophic unemployment (exceeding 25% in the USA), and plummeting output, disproving classical full-employment assumptions.\nHence, Option {{CORR}} is correct.",
    "Identifies 1929 Great Depression."
)
add_q(make_question(CHAPTER, "Introduction to Macroeconomics", "The 'Great Depression' that revolutionized economic thinking occurred during which historical period?", opts, corr, sol))

# 92. Classical vs Keynesian macroeconomic view
opts, corr, sol = rotate_options(
    "Classical economics assumed automatic full employment via flexible prices, whereas Keynes argued that persistent involuntary unemployment can exist due to deficient aggregate demand",
    [
        "Classical economics advocated central planning while Keynes advocated pure barter",
        "Classical economics focused on money supply while Keynes focused only on agriculture",
        "Keynes assumed that supply always creates its own demand"
    ],
    "B",
    "1. Classical economists believed in Say's Law ('Supply creates its own demand') and wage-price flexibility ensuring full employment. Keynes demonstrated that prices and wages are sticky, and output is determined by effective demand, allowing underemployment equilibrium.\nHence, Option {{CORR}} is correct.",
    "Contrasts Classical with Keynesian macroeconomics."
)
add_q(make_question(CHAPTER, "Introduction to Macroeconomics", "How did Keynesian macroeconomics differ fundamentally from Classical economic theory regarding full employment?", opts, corr, sol))

# 93. Say's Law of Markets statement
opts, corr, sol = rotate_options(
    "'Supply creates its own demand', asserting that general overproduction and involuntary unemployment are impossible",
    [
        "'Demand creates its own supply' in the short run",
        "'Money supply controls the rate of interest exclusively'",
        "'Taxes should be levied proportionately to personal wealth'"
    ],
    "C",
    "1. Formulated by J.B. Say, Say's Law posits that the act of production generates factor incomes exactly equal to the value of output, which in turn purchases that output, precluding general gluts or involuntary unemployment.\nHence, Option {{CORR}} is correct.",
    "States Say's Law."
)
add_q(make_question(CHAPTER, "Introduction to Macroeconomics", "What was the core assertion of 'Say's Law of Markets' upheld by Classical economists?", opts, corr, sol))

# 94. Adam Smith's invisible hand in macroeconomics
opts, corr, sol = rotate_options(
    "Keynes showed that individual self-interest in recessions (e.g. saving more) can harm aggregate social welfare (Paradox of Thrift), failing the invisible hand",
    [
        "Keynes proved that Adam Smith's invisible hand works perfectly in all depressions",
        "The invisible hand is legally enforced by the international monetary fund",
        "The invisible hand applies only to government public works projects"
    ],
    "D",
    "1. Adam Smith argued that individuals pursuing self-interest inadvertently promote societal wealth. Keynes demonstrated that in a macroeconomy, actions rational for an individual (like hoarding cash during a slump) reduce aggregate spending, worsening the slump for everyone.\nHence, Option {{CORR}} is correct.",
    "Explains Keynesian critique of invisible hand at macro level."
)
add_q(make_question(CHAPTER, "Introduction to Macroeconomics", "Why did Keynes argue that Adam Smith's 'Invisible Hand' fails to guarantee macroeconomic stability during an economic downturn?", opts, corr, sol))

# 95. Four sectors of an open macroeconomy
opts, corr, sol = rotate_options(
    "Households, Firms, Government, and External (Rest of the World) sector",
    [
        "Agriculture, Mining, Manufacturing, and Information Technology",
        "Commercial Banks, Central Bank, Stock Exchange, and Insurance Companies",
        "Wholesalers, Retailers, Transporters, and Consumers"
    ],
    "A",
    "1. The four standard macroeconomic sectors in an open economy are: (i) Households (consumers/factor owners), (ii) Firms (producing units), (iii) Government (regulatory/taxing authority), and (iv) External Sector (foreign trade and capital flows).\nHence, Option {{CORR}} is correct.",
    "Lists the four macroeconomic sectors."
)
add_q(make_question(CHAPTER, "Introduction to Macroeconomics", "What are the four recognized sectors of an open macroeconomy?", opts, corr, sol))

# 96. Match National Income Identities
add_q(make_match_question(
    CHAPTER, "National Income Aggregates",
    "Match the national accounting aggregates in List I with their corresponding algebraic definitions in List II:",
    [
        ("A", "GDP_FC"),
        ("B", "NDP_MP"),
        ("C", "GNP_FC"),
        ("D", "NNP_MP")
    ],
    [
        ("I", "GDP_MP - Depreciation"),
        ("II", "GDP_MP - Net Indirect Taxes"),
        ("III", "NNP_FC + Net Indirect Taxes"),
        ("IV", "GDP_FC + NFIA")
    ],
    "A-(II), B-(I), C-(IV), D-(III)",
    [
        "A-(I), B-(II), C-(IV), D-(III)",
        "A-(II), B-(IV), C-(I), D-(III)",
        "A-(III), B-(I), C-(IV), D-(II)"
    ],
    "A",
    "1. GDP_FC -> GDP_MP - NIT (II).\n2. NDP_MP -> GDP_MP - Dep (I).\n3. GNP_FC -> GDP_FC + NFIA (IV).\n4. NNP_MP -> NNP_FC + NIT (III).\nHence, Option A is correct."
))

# 97. Statement I & II: Intermediate goods resale
add_q(make_statement_question(
    CHAPTER, "Basic Macroeconomic Concepts",
    "An automobile purchased by a taxi operator is classified as a capital good.",
    "An automobile purchased by a car dealer for showroom resale is classified as an intermediate good.",
    "A",
    "1. Statement I is true: A taxi car is used repeatedly by a firm to generate income, making it a fixed capital asset.\n2. Statement II is true: A car purchased by a dealer to resell is inventory meant for resale within the year, making it an intermediate good.\nHence, both statements are true (Option A)."
))

# 98. Assertion & Reason: Why GDP_MP exceeds GDP_FC in India
add_q(make_assertion_question(
    CHAPTER, "National Income Aggregates",
    "In India, GDP at Market Price is generally higher than GDP at Factor Cost.",
    "Total indirect taxes (such as GST and customs duties) collected by the government exceed total subsidies disbursed.",
    "A",
    "1. Assertion is true: $GDP_{MP} > GDP_{FC}$ normally.\n2. Reason is true: $GDP_{MP} = GDP_{FC} + NIT$. When indirect taxes exceed subsidies ($NIT > 0$), Market Price is greater than Factor Cost.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 99. Numerical: Value of Output with Domestic Sales and Exports
opts, corr, sol = rotate_options(
    "Rs. 900 crore",
    [
        "Rs. 800 crore",
        "Rs. 1,000 crore",
        "Rs. 700 crore"
    ],
    "B",
    "1. Given: Sales = Rs. 800 crore, Exports = Rs. 100 crore... Note: If total 'Sales' is stated, exports are ALREADY included unless it specifies 'Domestic Sales'. If it says 'Domestic Sales = 700, Exports = 100', then total sales = 800.\n2. Here: Domestic Sales = Rs. 700 cr, Exports = Rs. 100 cr $\\implies$ Total Sales = Rs. 800 cr.\n3. Change in Stock = $+100$ cr.\n4. $\\text{Value of Output} = \\text{Total Sales} + \\text{Change in Stock} = 800 + 100 = \\text{Rs. 900 crore}$.\nHence, Option {{CORR}} is correct.",
    "Computes Value of Output = (700 + 100) + 100 = 900 crore."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "A firm reports: Domestic Sales = Rs. 700 crore, Exports = Rs. 100 crore, and Increase in Stock = Rs. 100 crore. What is its Value of Output?", opts, corr, sol))

# 100. Numerical: Intermediate consumption with domestic purchases and imports
opts, corr, sol = rotate_options(
    "Rs. 250 crore",
    [
        "Rs. 200 crore",
        "Rs. 300 crore",
        "Rs. 150 crore"
    ],
    "C",
    "1. Given: Purchase of raw materials from domestic market = Rs. 200 crore, Import of raw materials = Rs. 50 crore.\n2. Total Intermediate Consumption = $\\text{Domestic Purchases} + \\text{Imports} = 200 + 50 = \\text{Rs. 250 crore}$.\nHence, Option {{CORR}} is correct.",
    "Sums domestic purchases and imports to find intermediate consumption."
)
add_q(make_question(CHAPTER, "Methods of Calculating National Income", "If a manufacturing factory purchases raw materials worth Rs. 200 crore from local suppliers and imports raw materials worth Rs. 50 crore from abroad, what is its total Intermediate Consumption?", opts, corr, sol))

# Verify count and uniqueness
assert len(questions) == 100, f"Expected 100 questions, got {len(questions)}"
print(f"Successfully generated {len(questions)} unique questions for Unit 6!")

out_path = "mock/eco_units/unit6.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
