import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.eco_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text
)

CHAPTER = "Determination of Income and Employment"
questions = []
seen = set()

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:80]}")
    seen.add(norm)
    questions.append(q)

print("Generating 100 unique questions for Unit 8: Determination of Income and Employment...")

# =================================================================================================
# PART 1: Aggregate Demand, Propensities (APC, APS, MPC, MPS), Consumption & Saving Curves (Q1-Q25)
# =================================================================================================

# 1. Two-sector Aggregate Demand components
opts, corr, sol = rotate_options(
    "Consumption expenditure (C) + Private investment expenditure (I)",
    [
        "Government purchases (G) + Net exports (X - M)",
        "Consumption expenditure (C) + Net imports (M - X)",
        "Gross domestic capital formation + Transfer payments"
    ],
    "A",
    "1. In a simplified Keynesian two-sector closed economy without a government sector, Aggregate Demand (AD) comprises two primary components: Household Consumption Expenditure (C) and Planned Private Investment Expenditure (I), so AD = C + I.\nHence, Option {{CORR}} is correct.",
    "Identifies C + I as components of two-sector AD."
)
add_q(make_question(CHAPTER, "Aggregate Demand", "In a two-sector closed economy without government intervention, what are the constituent components of Aggregate Demand?", opts, corr, sol))

# 2. Aggregate Supply identity
opts, corr, sol = rotate_options(
    "Total National Income (Y)",
    [
        "Total stock of physical money in circulation",
        "Total government tax revenue",
        "Total value of exports minus imports"
    ],
    "B",
    "1. Aggregate Supply (AS) is the total money value of final goods and services planned to be produced in an economy over a given period, which equals the total factor payments distributed (wages, rent, interest, profit). Therefore, Aggregate Supply is identically equal to National Income (AS ≡ Y).\nHence, Option {{CORR}} is correct.",
    "Identifies AS with National Income (Y)."
)
add_q(make_question(CHAPTER, "Aggregate Supply", "In Keynesian macroeconomic theory, Aggregate Supply (AS) is identically equivalent to which economic aggregate?", opts, corr, sol))

# 3. Slope of Consumption Function
opts, corr, sol = rotate_options(
    "Marginal Propensity to Consume (MPC)",
    [
        "Average Propensity to Consume (APC)",
        "Autonomous consumption expenditure (C_bar)",
        "Investment multiplier (k)"
    ],
    "C",
    "1. In the linear consumption equation C = C_bar + bY, the coefficient 'b' represents the change in consumption per unit change in income (ΔC / ΔY), which is the Marginal Propensity to Consume (MPC). Graphically, this is the slope of the consumption function line.\nHence, Option {{CORR}} is correct.",
    "Identifies slope of consumption curve as MPC."
)
add_q(make_question(CHAPTER, "Consumption Function", "In a linear consumption function C = \\bar{C} + bY, what does the parameter 'b' geometrically represent?", opts, corr, sol))

# 4. Autonomous Consumption
opts, corr, sol = rotate_options(
    "Consumption expenditure that occurs even when national income is strictly zero",
    [
        "Consumption induced solely by incremental changes in disposable income",
        "Expenditure on luxury goods by high-income brackets",
        "Capital expenditure undertaken by the central government"
    ],
    "D",
    "1. Autonomous consumption (\\bar{C}) represents the minimum consumption expenditure required to sustain life even when income (Y) is zero. It is financed through past savings (dissaving) or borrowing and is independent of the current level of income.\nHence, Option {{CORR}} is correct.",
    "Defines autonomous consumption as expenditure at zero income."
)
add_q(make_question(CHAPTER, "Consumption Function", "What is the defining characteristic of 'Autonomous Consumption' (\\bar{C}) in macroeconomic analysis?", opts, corr, sol))

# 5. Numerical APC calculation
opts, corr, sol = rotate_options(
    "0.80",
    [
        "1.25",
        "0.20",
        "0.75"
    ],
    "A",
    "1. Average Propensity to Consume (APC) is defined as Total Consumption divided by Total Income: APC = C / Y.\n2. Here, C = ₹800 crore and Y = ₹1,000 crore.\n3. APC = 800 / 1000 = 0.80.\nHence, Option {{CORR}} is correct.",
    "Calculates APC = C / Y = 800 / 1000 = 0.80."
)
add_q(make_question(CHAPTER, "Propensity to Consume", "If national income is ₹1,000 crore and aggregate consumption expenditure is ₹800 crore, what is the Average Propensity to Consume (APC)?", opts, corr, sol))

# 6. Relationship APC + APS
opts, corr, sol = rotate_options(
    "APC + APS = 1",
    [
        "APC + APS = 0",
        "APC × APS = 1",
        "APC - APS = 1"
    ],
    "B",
    "1. Total income (Y) is either consumed (C) or saved (S): Y = C + S.\n2. Dividing both sides by Y: Y/Y = C/Y + S/Y => 1 = APC + APS.\nHence, Option {{CORR}} is correct.",
    "Identifies APC + APS = 1."
)
add_q(make_question(CHAPTER, "Propensity to Consume", "Which algebraic identity correctly expresses the relationship between Average Propensity to Consume (APC) and Average Propensity to Save (APS)?", opts, corr, sol))

# 7. Relationship MPC + MPS
opts, corr, sol = rotate_options(
    "MPC + MPS = 1",
    [
        "MPC + MPS = k",
        "MPC / MPS = 1",
        "MPC × MPS = 0"
    ],
    "C",
    "1. Any incremental change in income (ΔY) is allocated between change in consumption (ΔC) and change in saving (ΔS): ΔY = ΔC + ΔS.\n2. Dividing by ΔY: ΔY/ΔY = ΔC/ΔY + ΔS/ΔY => 1 = MPC + MPS.\nHence, Option {{CORR}} is correct.",
    "Identifies MPC + MPS = 1."
)
add_q(make_question(CHAPTER, "Propensity to Consume", "What is the fundamental relationship between Marginal Propensity to Consume (MPC) and Marginal Propensity to Save (MPS)?", opts, corr, sol))

# 8. Numerical MPC calculation
opts, corr, sol = rotate_options(
    "0.75",
    [
        "0.25",
        "0.80",
        "1.33"
    ],
    "D",
    "1. Marginal Propensity to Consume (MPC) = ΔC / ΔY.\n2. Change in income (ΔY) = ₹5,000 - ₹4,000 = ₹1,000 crore.\n3. Change in consumption (ΔC) = ₹3,750 - ₹3,000 = ₹750 crore.\n4. MPC = 750 / 1000 = 0.75.\nHence, Option {{CORR}} is correct.",
    "Calculates MPC = ΔC / ΔY = 750 / 1000 = 0.75."
)
add_q(make_question(CHAPTER, "Propensity to Consume", "When national income increases from ₹4,000 crore to ₹5,000 crore, consumption expenditure rises from ₹3,000 crore to ₹3,750 crore. What is the Marginal Propensity to Consume (MPC)?", opts, corr, sol))

# 9. Can APC be greater than 1?
opts, corr, sol = rotate_options(
    "Yes, at income levels below the break-even point where consumption exceeds income (dissaving occurs)",
    [
        "No, APC can never exceed 1 under any economic circumstances",
        "Yes, but only when marginal propensity to consume is strictly zero",
        "No, because savings can never be negative in an accounting framework"
    ],
    "A",
    "1. APC = C / Y. When income is very low, households dissave (consume past savings or borrow), meaning C > Y.\n2. When C > Y, the ratio C / Y is strictly greater than 1.\n3. This occurs at all income levels below the break-even point.\nHence, Option {{CORR}} is correct.",
    "Explains APC > 1 occurs when C > Y below break-even point."
)
add_q(make_question(CHAPTER, "Propensity to Consume", "Can the Average Propensity to Consume (APC) be greater than 1, and under what condition?", opts, corr, sol))

# 10. Can MPC be greater than 1?
opts, corr, sol = rotate_options(
    "No, under normal psychological law of consumption, consumers do not increase consumption by more than the entire increment in income (0 ≤ MPC ≤ 1)",
    [
        "Yes, MPC is routinely greater than 1 during periods of deflation",
        "Yes, whenever autonomous consumption is positive",
        "No, MPC is always strictly equal to zero"
    ],
    "B",
    "1. Keynes' Psychological Law of Consumption states that as income increases, consumption also increases, but by less than the increase in income (ΔC < ΔY).\n2. Therefore, MPC = ΔC / ΔY is positive but strictly less than or equal to 1 under normal economic behaviour (0 ≤ MPC ≤ 1).\nHence, Option {{CORR}} is correct.",
    "Explains 0 <= MPC <= 1 based on Keynesian consumption law."
)
add_q(make_question(CHAPTER, "Propensity to Consume", "Can the Marginal Propensity to Consume (MPC) be greater than 1 under Keynes' Psychological Law of Consumption?", opts, corr, sol))

# 11. Value of APS at break-even point
opts, corr, sol = rotate_options(
    "0",
    [
        "1",
        "-1",
        "Infinity"
    ],
    "C",
    "1. At the break-even point, consumption expenditure exactly equals total income (C = Y).\n2. Therefore, saving S = Y - C = 0.\n3. Average Propensity to Save (APS) = S / Y = 0 / Y = 0.\nHence, Option {{CORR}} is correct.",
    "Identifies APS = 0 at break-even point."
)
add_q(make_question(CHAPTER, "Saving Function", "What is the numerical value of the Average Propensity to Save (APS) at the macroeconomic break-even point of an economy?", opts, corr, sol))

# 12. Linear Saving Function equation
opts, corr, sol = rotate_options(
    "S = -\\bar{C} + (1 - b)Y",
    [
        "S = \\bar{C} + bY",
        "S = -\\bar{C} - (1 - b)Y",
        "S = \\bar{C} / (1 - b)"
    ],
    "D",
    "1. Starting from Y = C + S, we have S = Y - C.\n2. Substituting the consumption function C = \\bar{C} + bY:\n   S = Y - (\\bar{C} + bY) = -\\bar{C} + Y(1 - b).\n3. Here, -\\bar{C} represents dissaving at zero income and (1 - b) represents MPS.\nHence, Option {{CORR}} is correct.",
    "Derives S = -C_bar + (1 - b)Y."
)
add_q(make_question(CHAPTER, "Saving Function", "If the consumption function is given by C = \\bar{C} + bY, which equation correctly represents the corresponding Saving Function?", opts, corr, sol))

# 13. Slope of Saving Curve
opts, corr, sol = rotate_options(
    "Marginal Propensity to Save (MPS)",
    [
        "Average Propensity to Save (APS)",
        "Negative autonomous consumption (-C_bar)",
        "Investment multiplier (k)"
    ],
    "A",
    "1. In the saving function S = -\\bar{C} + (1 - b)Y, the slope is the derivative dS / dY = ΔS / ΔY = (1 - b), which is the Marginal Propensity to Save (MPS).\nHence, Option {{CORR}} is correct.",
    "Identifies slope of saving curve as MPS."
)
add_q(make_question(CHAPTER, "Saving Function", "What does the slope of the Saving Curve measure in macroeconomic graphs?", opts, corr, sol))

# 14. Numerical: Finding break-even income
opts, corr, sol = rotate_options(
    "₹1,000 crore",
    [
        "₹800 crore",
        "₹1,250 crore",
        "₹2,000 crore"
    ],
    "B",
    "1. At break-even point, C = Y.\n2. 200 + 0.8Y = Y\n3. Y - 0.8Y = 200 => 0.2Y = 200 => Y = 200 / 0.2 = ₹1,000 crore.\nHence, Option {{CORR}} is correct.",
    "Calculates break-even income: Y = 200 / 0.2 = 1,000 crore."
)
add_q(make_question(CHAPTER, "Consumption Function", "Given the consumption function C = 200 + 0.8Y (where C and Y are in ₹ crore), what is the level of national income at the break-even point?", opts, corr, sol))

# 15. Numerical: Value of saving at given income
opts, corr, sol = rotate_options(
    "₹200 crore",
    [
        "₹150 crore",
        "₹0 crore",
        "-₹100 crore"
    ],
    "C",
    "1. S = -\\bar{C} + (1 - b)Y.\n2. Here \\bar{C} = 100, b = 0.75, so MPS = 1 - 0.75 = 0.25.\n3. S = -100 + 0.25(1200) = -100 + 300 = ₹200 crore.\nHence, Option {{CORR}} is correct.",
    "Calculates S = -100 + 0.25(1200) = 200 crore."
)
add_q(make_question(CHAPTER, "Saving Function", "Given C = 100 + 0.75Y, what will be the amount of saving when national income (Y) is ₹1,200 crore?", opts, corr, sol))

# 16. Match Question: Propensities Definitions
add_q(make_match_question(
    CHAPTER,
    "Propensities to Consume and Save",
    "Match the macroeconomic concepts in List I with their corresponding formulas or definitions in List II:",
    [
        ("A", "Average Propensity to Consume (APC)"),
        ("B", "Marginal Propensity to Consume (MPC)"),
        ("C", "Average Propensity to Save (APS)"),
        ("D", "Marginal Propensity to Save (MPS)")
    ],
    [
        ("(I)", "ΔS / ΔY"),
        ("(II)", "C / Y"),
        ("(III)", "ΔC / ΔY"),
        ("(IV)", "S / Y")
    ],
    "A-(II), B-(III), C-(IV), D-(I)",
    [
        "A-(III), B-(II), C-(I), D-(IV)",
        "A-(II), B-(I), C-(IV), D-(III)",
        "A-(IV), B-(III), C-(II), D-(I)"
    ],
    "A",
    "1. APC = C / Y -> A-(II)\n2. MPC = ΔC / ΔY -> B-(III)\n3. APS = S / Y -> C-(IV)\n4. MPS = ΔS / ΔY -> D-(I)\nHence, Option A is correct."
))

# 17. Statement Question: APC decline with income
add_q(make_statement_question(
    CHAPTER,
    "Propensity to Consume",
    "As national income increases, the Average Propensity to Consume (APC) continually declines.",
    "The Marginal Propensity to Consume (MPC) is always higher than the Average Propensity to Consume (APC) at all income levels in a standard linear Keynesian consumption function with positive autonomous consumption.",
    "C",
    "1. Statement I is TRUE: As income rises, consumption rises by a smaller proportion because of autonomous consumption, causing APC (C / Y) to fall progressively.\n2. Statement II is FALSE: In C = C_bar + bY with C_bar > 0, APC = C_bar / Y + b, while MPC = b. Since C_bar / Y > 0, APC is strictly GREATER than MPC at all income levels, not lower.\nHence, Statement I is true but Statement II is false (Option C)."
))

# 18. Assertion Reason: APC can be negative?
add_q(make_assertion_question(
    CHAPTER,
    "Propensity to Consume",
    "Average Propensity to Consume (APC) can never be negative.",
    "Consumption expenditure can never be zero or negative, because human survival necessitates a minimum level of consumption even at zero income.",
    "A",
    "1. Assertion (A) is TRUE: APC = C / Y. Since consumption (C) can never be zero or negative (due to autonomous consumption), APC is always positive and can never be negative.\n2. Reason (R) is TRUE and correctly explains (A): Because human physiological survival requires basic autonomous food/shelter expenditure, C > 0 always, making APC strictly positive.\nHence, Both (A) and (R) are true and (R) is the correct explanation of (A) (Option A)."
))

# 19. Can APS be negative?
opts, corr, sol = rotate_options(
    "Yes, when consumption expenditure exceeds national income, resulting in dissaving (S < 0)",
    [
        "No, APS must always be positive by definition of income",
        "Yes, but only when marginal propensity to save is greater than 1",
        "No, because savings are always legally required to be non-negative"
    ],
    "D",
    "1. APS = S / Y. At low levels of national income (below the break-even point), consumption exceeds income (C > Y), causing dissaving (negative saving, S < 0).\n2. When S is negative, APS is negative.\nHence, Option {{CORR}} is correct.",
    "Explains APS can be negative when C > Y (dissaving)."
)
add_q(make_question(CHAPTER, "Saving Function", "Can the Average Propensity to Save (APS) be negative, and under what circumstances?", opts, corr, sol))

# 20. 45-degree line significance
opts, corr, sol = rotate_options(
    "Every point on the 45-degree line represents equality between Aggregate Expenditure and Aggregate Income (AS = Y)",
    [
        "It represents the curve of maximum government fiscal deficits",
        "It shows the relationship between money supply and inflation rate",
        "It defines the locus of commercial bank credit creation multipliers"
    ],
    "A",
    "1. In Keynesian cross analysis, the 45-degree line from the origin has a slope of 1. At every point on this line, the value on the vertical axis (Aggregate Expenditure / AS) equals the value on the horizontal axis (National Income / Y).\nHence, Option {{CORR}} is correct.",
    "Explains 45-degree line as locus where expenditure equals income."
)
add_q(make_question(CHAPTER, "Keynesian Framework", "In the Keynesian Cross diagram, what is the geometric significance of the 45-degree line drawn from the origin?", opts, corr, sol))

# 21. Induced Investment vs Autonomous Investment
opts, corr, sol = rotate_options(
    "Autonomous investment is independent of the level of national income, whereas induced investment is directly determined by income and profit levels",
    [
        "Induced investment is undertaken exclusively by the central government, while autonomous investment is made by private firms",
        "Autonomous investment varies directly with the market rate of interest, while induced investment is fixed",
        "Induced investment has a negative slope while autonomous investment is a 45-degree line"
    ],
    "B",
    "1. Autonomous Investment is unaffected by changes in national income or expected profits; it is usually undertaken by the government or represents long-term baseline capital projects (represented as a horizontal line).\n2. Induced Investment changes directly with changes in income, output, and profit expectations.\nHence, Option {{CORR}} is correct.",
    "Contrasts autonomous investment (income-inelastic) with induced investment."
)
add_q(make_question(CHAPTER, "Investment Expenditure", "How does 'Autonomous Investment' differ fundamentally from 'Induced Investment'?", opts, corr, sol))

# 22. Numerical: Given MPS, find MPC
opts, corr, sol = rotate_options(
    "0.65",
    [
        "0.35",
        "1.35",
        "0.50"
    ],
    "C",
    "1. We know that MPC + MPS = 1.\n2. Therefore, MPC = 1 - MPS = 1 - 0.35 = 0.65.\nHence, Option {{CORR}} is correct.",
    "Calculates MPC = 1 - MPS = 1 - 0.35 = 0.65."
)
add_q(make_question(CHAPTER, "Propensity to Consume", "If the Marginal Propensity to Save (MPS) of an economy is 0.35, what is the Marginal Propensity to Consume (MPC)?", opts, corr, sol))

# 23. Numerical: Consumption expenditure at given Y
opts, corr, sol = rotate_options(
    "₹1,700 crore",
    [
        "₹1,500 crore",
        "₹1,800 crore",
        "₹1,600 crore"
    ],
    "D",
    "1. Consumption function: C = \\bar{C} + bY.\n2. Here \\bar{C} = 100, b = MPC = 0.80, and Y = 2,000.\n3. C = 100 + 0.80(2000) = 100 + 1600 = ₹1,700 crore.\nHence, Option {{CORR}} is correct.",
    "Calculates C = 100 + 0.8(2000) = 1700 crore."
)
add_q(make_question(CHAPTER, "Consumption Function", "In an economy, autonomous consumption is ₹100 crore and MPC is 0.80. What is the total consumption expenditure when national income is ₹2,000 crore?", opts, corr, sol))

# 24. Statement Question: MPC in developing vs developed nations
add_q(make_statement_question(
    CHAPTER,
    "Propensity to Consume",
    "Poor and developing countries generally possess a higher Marginal Propensity to Consume (MPC) compared to rich, developed nations.",
    "In poor countries, a larger fraction of any additional income must be devoted to fulfilling basic unmet consumer necessities like food, clothing, and housing.",
    "A",
    "1. Statement I is TRUE: In low-income economies, people have high unsatisfied basic needs, so a greater percentage of incremental income is spent on consumption.\n2. Statement II is TRUE: In affluent economies, basic needs are already met, so higher proportions of incremental income are saved.\nHence, Both Statement I and Statement II are true (Option A)."
))

# 25. Assertion Reason: Shift of consumption curve
add_q(make_assertion_question(
    CHAPTER,
    "Consumption Function",
    "An increase in autonomous consumption (\\bar{C}) shifts the entire consumption curve parallelly upwards.",
    "The slope of the consumption curve depends on autonomous consumption expenditure.",
    "C",
    "1. Assertion (A) is TRUE: When \\bar{C} increases while MPC remains unchanged, the vertical intercept increases, shifting the consumption line parallelly upward.\n2. Reason (R) is FALSE: The slope of the consumption curve is determined solely by the Marginal Propensity to Consume (b = MPC), NOT by autonomous consumption (\\bar{C}).\nHence, (A) is true but (R) is false (Option C)."
))

# =================================================================================================
# PART 2: Short-Run Fixed Price Equilibrium, AD = AS, S = I, Ex-Ante vs Ex-Post (Q26 - Q50)
# =================================================================================================

# 26. Dual Equilibrium Conditions
opts, corr, sol = rotate_options(
    "AD = AS and Ex-ante Saving = Ex-ante Investment",
    [
        "Ex-post Saving = Ex-ante Consumption",
        "Total Exports = Total Imports",
        "Government Revenue = Fiscal Deficit"
    ],
    "A",
    "1. In Keynesian short-run macroeconomics, equilibrium output and income are established where Aggregate Demand equals Aggregate Supply (AD = AS).\n2. Since AS = C + S and AD = C + I, equating them yields C + S = C + I => S = I (Ex-ante Saving equals Ex-ante Investment).\nHence, Option {{CORR}} is correct.",
    "Identifies AD = AS and S = I as equilibrium conditions."
)
add_q(make_question(CHAPTER, "Equilibrium Output", "Which two complementary approaches determine the equilibrium level of national income in Keynesian short-run theory?", opts, corr, sol))

# 27. Ex-ante vs Ex-post distinction
opts, corr, sol = rotate_options(
    "Ex-ante denotes planned or intended values, whereas ex-post denotes actual or realized values at the end of the accounting period",
    [
        "Ex-ante refers to values recorded in foreign currencies, while ex-post refers to domestic currency",
        "Ex-ante denotes values after government taxes, while ex-post denotes pre-tax values",
        "Ex-ante refers to financial sector assets, while ex-post refers to physical manufacturing goods"
    ],
    "B",
    "1. 'Ex-ante' is Latin for 'before the event'—in economics, it represents planned, desired, or intended saving and investment by economic agents.\n2. 'Ex-post' means 'after the event'—it represents actual, realized, or recorded figures at the end of the fiscal year.\nHence, Option {{CORR}} is correct.",
    "Distinguishes ex-ante (planned) from ex-post (actual/realized)."
)
add_q(make_question(CHAPTER, "Equilibrium Concepts", "In macroeconomic theory, what is the fundamental conceptual difference between 'ex-ante' and 'ex-post' variables?", opts, corr, sol))

# 28. Always equal identity: Ex-post S and Ex-post I
opts, corr, sol = rotate_options(
    "Ex-post (actual) saving is always equal to ex-post (actual) investment by national income accounting identity",
    [
        "Ex-ante saving is always equal to ex-ante investment under all economic conditions",
        "Planned consumption is always equal to actual consumption",
        "Autonomous investment is always equal to induced investment"
    ],
    "C",
    "1. By national income accounting identity, actual aggregate output (Y) is split into actual C + S, and actual expenditure is actual C + I. Equating both: C + S = C + I => Ex-post S ≡ Ex-post I.\n2. In contrast, Ex-ante S equals Ex-ante I ONLY at the equilibrium level of income.\nHence, Option {{CORR}} is correct.",
    "Identifies ex-post S always equals ex-post I."
)
add_q(make_question(CHAPTER, "Equilibrium Concepts", "Which of the following statements regarding saving and investment equality is ALWAYS true in national income accounting?", opts, corr, sol))

# 29. Mechanism when AD > AS (or S < I)
opts, corr, sol = rotate_options(
    "Inventories fall below the desired level (unplanned decumulation), prompting producers to expand output and employment until AD = AS",
    [
        "Inventories accumulate above desired levels, prompting producers to cut down output",
        "The central bank immediately prints paper currency to eliminate the deficit",
        "Consumers automatically increase their propensity to save to match high demand"
    ],
    "D",
    "1. When AD > AS, buyers demand more goods than currently produced.\n2. Firms satisfy this excess demand by selling out of their existing inventory stocks, causing an unplanned depletion (decumulation) of inventories.\n3. To restore inventories to desired levels, producers hire more factors of production and expand output until AS rises to equal AD.\nHence, Option {{CORR}} is correct.",
    "Explains inventory decumulation and output expansion when AD > AS."
)
add_q(make_question(CHAPTER, "Adjustment Mechanism", "If planned Aggregate Demand exceeds planned Aggregate Supply (AD > AS) in an economy, what immediate adjustment mechanism restores macroeconomic equilibrium?", opts, corr, sol))

# 30. Mechanism when AD < AS (or S > I)
opts, corr, sol = rotate_options(
    "Unplanned accumulation of unsold inventories occurs, leading producers to cut production and employment until AS declines to equal AD",
    [
        "Producers immediately lower wages and raise prices to clear the market",
        "Government automatically absorbs all surplus goods through state procurement",
        "Households increase consumption to absorb unsold inventories"
    ],
    "A",
    "1. When AD < AS, total planned spending is less than total output produced.\n2. Goods remain unsold on store shelves, causing unplanned accumulation of inventories.\n3. To eliminate excess inventory piles, producers reduce production and lay off workers, lowering national income until AS falls to equal AD.\nHence, Option {{CORR}} is correct.",
    "Explains inventory accumulation and output contraction when AD < AS."
)
add_q(make_question(CHAPTER, "Adjustment Mechanism", "What happens to inventories and production levels when planned Aggregate Supply exceeds planned Aggregate Demand (AS > AD)?", opts, corr, sol))

# 31. Sequence Question: Adjustment process when AD > AS
add_q(make_sequence_question(
    CHAPTER,
    "Adjustment Mechanism",
    "Arrange the sequential steps in the correct order describing the adjustment process when planned Aggregate Demand exceeds planned Aggregate Supply (AD > AS):",
    [
        "Buyers purchase more goods than current production, causing unplanned rundown of inventory stocks.",
        "Producers observe that actual inventory levels have fallen below planned target levels.",
        "Producers hire more labour and increase output in the subsequent production period.",
        "Total employment and national income (Y) rise.",
        "Aggregate Supply increases until it exactly matches Aggregate Demand (AD = AS)."
    ],
    "(A) -> (B) -> (C) -> (D) -> (E)",
    [
        "(B) -> (A) -> (D) -> (C) -> (E)",
        "(C) -> (A) -> (B) -> (E) -> (D)",
        "(A) -> (C) -> (B) -> (E) -> (D)"
    ],
    "A",
    "1. The Keynesian adjustment follows: (A) Unplanned inventory depletion -> (B) Observation of shortfall -> (C) Increase in planned production -> (D) Expansion in employment/income -> (E) Restoration of AD = AS equilibrium.\nHence, Option A is correct."
))

# 32. Numerical: Equilibrium income in two-sector model
opts, corr, sol = rotate_options(
    "₹1,250 crore",
    [
        "₹1,000 crore",
        "₹1,500 crore",
        "₹800 crore"
    ],
    "B",
    "1. Equilibrium condition: Y = C + I.\n2. Y = (150 + 0.6Y) + 350\n3. Y = 500 + 0.6Y => Y - 0.6Y = 500 => 0.4Y = 500 => Y = 500 / 0.4 = ₹1,250 crore.\nHence, Option {{CORR}} is correct.",
    "Calculates equilibrium income: Y = (150 + 350) / 0.4 = 1,250 crore."
)
add_q(make_question(CHAPTER, "Equilibrium Output", "In a two-sector economy, consumption function is C = 150 + 0.6Y and autonomous investment is I = ₹350 crore. What is the equilibrium level of national income?", opts, corr, sol))

# 33. Numerical: Equilibrium consumption expenditure
opts, corr, sol = rotate_options(
    "₹900 crore",
    [
        "₹750 crore",
        "₹1,250 crore",
        "₹350 crore"
    ],
    "C",
    "1. From previous equilibrium Y = ₹1,250 crore:\n2. C = 150 + 0.6(1250) = 150 + 750 = ₹900 crore.\n3. (Alternatively: C = Y - I = 1,250 - 350 = ₹900 crore).\nHence, Option {{CORR}} is correct.",
    "Calculates equilibrium consumption: C = 150 + 0.6(1250) = 900 crore."
)
add_q(make_question(CHAPTER, "Equilibrium Output", "Using the consumption function C = 150 + 0.6Y and autonomous investment I = ₹350 crore (where equilibrium income is ₹1,250 crore), what is the equilibrium consumption expenditure?", opts, corr, sol))

# 34. Numerical: Equilibrium saving verification
opts, corr, sol = rotate_options(
    "₹350 crore, which exactly equals autonomous investment (S = I)",
    [
        "₹150 crore, which equals autonomous consumption",
        "₹500 crore, which equals autonomous expenditure",
        "₹0 crore, because economy is at break-even"
    ],
    "D",
    "1. At equilibrium, S = Y - C = 1,250 - 900 = ₹350 crore.\n2. This confirms the equilibrium condition: Planned Saving (S = ₹350 crore) = Planned Investment (I = ₹350 crore).\nHence, Option {{CORR}} is correct.",
    "Confirms S = I = 350 crore at equilibrium."
)
add_q(make_question(CHAPTER, "Equilibrium Output", "In an economy where equilibrium income is ₹1,250 crore, C = 150 + 0.6Y, and I = ₹350 crore, what is the equilibrium level of planned saving (S)?", opts, corr, sol))

# 35. Effective Demand Principle
opts, corr, sol = rotate_options(
    "The level of Aggregate Demand that is backed by purchasing power and corresponds to the point where AD equals AS",
    [
        "The total theoretical desire of all citizens to purchase luxury goods",
        "The demand created exclusively by central government deficit financing",
        "The maximum physical capacity of industrial factories in an economy"
    ],
    "A",
    "1. Keynes defined 'Effective Demand' as the specific point on the Aggregate Demand curve where it is intersected by the Aggregate Supply curve. It denotes the demand which is actually materialized and met by equivalent production in the economy.\nHence, Option {{CORR}} is correct.",
    "Defines effective demand as point where AD = AS."
)
add_q(make_question(CHAPTER, "Effective Demand", "What is the precise meaning of the 'Principle of Effective Demand' in Keynesian economics?", opts, corr, sol))

# 36. Underemployment Equilibrium concept
opts, corr, sol = rotate_options(
    "A state where AD equals AS at a level of output less than full employment, leaving involuntary unemployment",
    [
        "A situation where everyone willing to work finds employment at prevailing wage rates",
        "A condition where aggregate demand exceeds the economy's full capacity output",
        "A scenario where zero workers are employed in the manufacturing sector"
    ],
    "B",
    "1. Underemployment equilibrium occurs when Aggregate Demand is equal to Aggregate Supply (AD = AS), but this equilibrium output is less than the potential output achievable under full employment. Resources and willing workers remain involuntarily idle.\nHence, Option {{CORR}} is correct.",
    "Defines underemployment equilibrium where AD = AS with involuntary unemployment."
)
add_q(make_question(CHAPTER, "Equilibrium Types", "What is meant by an 'Underemployment Equilibrium'?", opts, corr, sol))

# 37. Full Employment Equilibrium
opts, corr, sol = rotate_options(
    "Equilibrium established at a level of income where Aggregate Demand equals Aggregate Supply with full utilization of all available resources",
    [
        "Equilibrium where aggregate saving is strictly zero",
        "Equilibrium where marginal propensity to consume equals 1",
        "Equilibrium where total government debt is completely retired"
    ],
    "C",
    "1. Full employment equilibrium occurs when AD = AS and all individuals who are willing and able to work at the prevailing wage rate are employed (zero involuntary unemployment).\nHence, Option {{CORR}} is correct.",
    "Defines full employment equilibrium."
)
add_q(make_question(CHAPTER, "Equilibrium Types", "Which condition characterizes a 'Full Employment Equilibrium'?", opts, corr, sol))

# 38. Over-full employment equilibrium
opts, corr, sol = rotate_options(
    "AD equals AS at a level of income beyond the full employment level, creating purely inflationary pressure on prices without expanding real output",
    [
        "Output doubles while prices fall to absolute zero",
        "All workers voluntarily withdraw from the labour force",
        "Every firm operates with negative total variable costs"
    ],
    "D",
    "1. In the short run, physical production cannot exceed full employment capacity. When planned AD intersects AS beyond full employment capacity, it creates an over-full employment equilibrium where output cannot rise in real terms, resulting only in inflation (rise in general price level).\nHence, Option {{CORR}} is correct.",
    "Explains over-full employment equilibrium causes pure inflation without real output gain."
)
add_q(make_question(CHAPTER, "Equilibrium Types", "What characterizes an 'Over-full Employment Equilibrium' in the short run?", opts, corr, sol))

# 39. Involuntary Unemployment definition
opts, corr, sol = rotate_options(
    "A situation where able-bodied individuals willing to work at prevailing market wage rates cannot find employment",
    [
        "A situation where workers choose not to work because wages are deemed too low",
        "A temporary friction where workers transition between jobs voluntarily",
        "Retirement of elderly citizens after statutory superannuation age"
    ],
    "A",
    "1. Involuntary unemployment refers to the situation in which persons who are able and willing to work at the going wage rate fail to find jobs due to lack of aggregate demand in the economy.\nHence, Option {{CORR}} is correct.",
    "Defines involuntary unemployment."
)
add_q(make_question(CHAPTER, "Employment Concepts", "How is 'Involuntary Unemployment' defined in macroeconomics?", opts, corr, sol))

# 40. Voluntary Unemployment definition
opts, corr, sol = rotate_options(
    "A situation where individuals are capable of working but choose not to work at the prevailing wage rate",
    [
        "Workers laid off permanently due to factory shutdowns",
        "Unemployment resulting from deficient aggregate demand",
        "Workers unable to work due to medical disability"
    ],
    "B",
    "1. Voluntary unemployment occurs when a person refuses to accept employment at the existing market wage rate, preferring leisure or holding out for higher pay.\nHence, Option {{CORR}} is correct.",
    "Defines voluntary unemployment."
)
add_q(make_question(CHAPTER, "Employment Concepts", "What is 'Voluntary Unemployment'?", opts, corr, sol))

# 41. Full employment does NOT mean zero unemployment
opts, corr, sol = rotate_options(
    "Natural rate of unemployment (frictional and structural unemployment) always exists even in a full employment economy",
    [
        "Zero percent unemployment is legally prohibited under international labour standards",
        "Workers are mandated to rotate out of jobs every two months",
        "Every citizen is classified as fully employed regardless of job status"
    ],
    "C",
    "1. Full employment does not mean 100% employment or zero unemployment. There always exists a small 'natural rate of unemployment' consisting of frictional unemployment (workers switching jobs) and structural unemployment (skills mismatch).\nHence, Option {{CORR}} is correct.",
    "Explains full employment includes frictional and structural unemployment."
)
add_q(make_question(CHAPTER, "Employment Concepts", "Why does 'Full Employment' in macroeconomics NOT imply an unemployment rate of absolute zero percent?", opts, corr, sol))

# 42. Frictional Unemployment
opts, corr, sol = rotate_options(
    "Temporary unemployment occurring while workers are transitioning from one job to another or searching for new employment",
    [
        "Long-term joblessness caused by nationwide economic depressions",
        "Permanent displacement of agricultural labour by tractors",
        "Unemployment arising from physical seasonal weather changes"
    ],
    "D",
    "1. Frictional unemployment is temporary unemployment arising from time lags in matching job seekers with available vacancies as workers search for better positions.\nHence, Option {{CORR}} is correct.",
    "Defines frictional unemployment."
)
add_q(make_question(CHAPTER, "Employment Concepts", "What does 'Frictional Unemployment' refer to?", opts, corr, sol))

# 43. Structural Unemployment
opts, corr, sol = rotate_options(
    "Unemployment resulting from a mismatch between the skills workers possess and the skills demanded by employers due to technological/structural changes",
    [
        "Job losses caused exclusively by daily stock market fluctuations",
        "Workers refusing to take jobs due to high personal savings",
        "Seasonal pauses in agricultural harvesting during monsoons"
    ],
    "A",
    "1. Structural unemployment arises from long-term changes in the structure of an economy (e.g., automation, obsolescence of old industrial skills) where existing workers lack the technical skills required for new jobs.\nHence, Option {{CORR}} is correct.",
    "Defines structural unemployment as skills mismatch."
)
add_q(make_question(CHAPTER, "Employment Concepts", "What is the primary cause of 'Structural Unemployment'?", opts, corr, sol))

# 44. Statement Question: Ex-ante vs Ex-post equality
add_q(make_statement_question(
    CHAPTER,
    "Equilibrium Concepts",
    "Ex-ante saving and ex-ante investment are equal only at the equilibrium level of income.",
    "Ex-post saving and ex-post investment are identically equal at all levels of income in national accounting.",
    "A",
    "1. Statement I is TRUE: Planned saving equals planned investment (ex-ante S = ex-ante I) exclusively when the economy reaches macroeconomic equilibrium.\n2. Statement II is TRUE: In national income accounting, ex-post saving is always equal to ex-post investment by definition (Y - C = I).\nHence, Both Statement I and Statement II are true (Option A)."
))

# 45. Assertion Reason: Fixed Price Model
add_q(make_assertion_question(
    CHAPTER,
    "Keynesian Framework",
    "In basic short-run Keynesian macroeconomics, the aggregate price level is assumed to remain constant.",
    "In the short run with substantial unutilized industrial capacity and unemployed labour, firms respond to changes in demand by adjusting output rather than prices.",
    "A",
    "1. Assertion (A) is TRUE: The basic Keynesian model is a fixed-price model.\n2. Reason (R) is TRUE: In the presence of excess capacity, firms can expand output at constant marginal costs by hiring idle resources without raising output prices.\nHence, Both (A) and (R) are true and (R) is the correct explanation of (A) (Option A)."
))

# 46. Numerical: Saving function equilibrium with S = I
opts, corr, sol = rotate_options(
    "₹1,500 crore",
    [
        "₹1,200 crore",
        "₹2,000 crore",
        "₹1,800 crore"
    ],
    "B",
    "1. Equilibrium condition: S = I.\n2. -50 + 0.2Y = 250\n3. 0.2Y = 250 + 50 = 300\n4. Y = 300 / 0.2 = ₹1,500 crore.\nHence, Option {{CORR}} is correct.",
    "Calculates Y = 300 / 0.2 = 1,500 crore from S = I."
)
add_q(make_question(CHAPTER, "Saving Function", "Given the saving function S = -50 + 0.2Y and autonomous investment I = ₹250 crore, what is the equilibrium level of national income?", opts, corr, sol))

# 47. Match Question: Adjustment Conditions
add_q(make_match_question(
    CHAPTER,
    "Adjustment Mechanism",
    "Match the macroeconomic disequilibrium conditions in List I with the resulting economic outcomes in List II:",
    [
        ("A", "AD > AS (Planned spending exceeds output)"),
        ("B", "AD < AS (Planned spending falls short of output)"),
        ("C", "Ex-ante S > Ex-ante I"),
        ("D", "Ex-ante S = Ex-ante I")
    ],
    [
        ("(I)", "Equilibrium national income achieved"),
        ("(II)", "Unplanned inventory decumulation occurs"),
        ("(III)", "Unplanned inventory accumulation occurs"),
        ("(IV)", "National income contracts due to deficient expenditure")
    ],
    "A-(II), B-(III), C-(IV), D-(I)",
    [
        "A-(III), B-(II), C-(I), D-(IV)",
        "A-(II), B-(I), C-(IV), D-(III)",
        "A-(IV), B-(III), C-(II), D-(I)"
    ],
    "A",
    "1. AD > AS causes unplanned inventory rundown -> A-(II)\n2. AD < AS causes unsold inventory pileup -> B-(III)\n3. Ex-ante S > I means leakage exceeds injection, causing income to contract -> C-(IV)\n4. Ex-ante S = I represents equilibrium -> D-(I)\nHence, Option A is correct."
))

# 48. Statement Question: Equilibrium at full employment?
add_q(make_statement_question(
    CHAPTER,
    "Equilibrium Types",
    "According to classical economists, the macroeconomy automatically attains full employment equilibrium in the long run through price-wage flexibility.",
    "Keynes proved that an economy can achieve a stable equilibrium even with widespread involuntary unemployment.",
    "A",
    "1. Statement I is TRUE: Classical theory asserts that market forces (flexible wages, interest rates, and prices) naturally clear all markets, guaranteeing full employment.\n2. Statement II is TRUE: Keynes demonstrated that deficient aggregate demand can trap an economy in a persistent underemployment equilibrium.\nHence, Both Statement I and Statement II are true (Option A)."
))

# 49. Numerical: Finding investment required to achieve target income
opts, corr, sol = rotate_options(
    "₹400 crore",
    [
        "₹300 crore",
        "₹500 crore",
        "₹200 crore"
    ],
    "C",
    "1. Target Y = ₹2,000 crore. C = 100 + 0.75Y.\n2. At equilibrium: Y = C + I => Y = 100 + 0.75Y + I.\n3. 2,000 = 100 + 0.75(2,000) + I\n4. 2,000 = 100 + 1,500 + I => 2,000 = 1,600 + I => I = 2,000 - 1,600 = ₹400 crore.\nHence, Option {{CORR}} is correct.",
    "Calculates required I = Y - C = 2000 - (100 + 1500) = 400 crore."
)
add_q(make_question(CHAPTER, "Equilibrium Output", "If consumption function is C = 100 + 0.75Y and the target full employment income is ₹2,000 crore, what level of autonomous investment (I) must be maintained?", opts, corr, sol))

# 50. Assertion Reason: S and I equality
add_q(make_assertion_question(
    CHAPTER,
    "Equilibrium Concepts",
    "Ex-ante saving does not necessarily equal ex-ante investment at every level of income.",
    "Savers and investors are two distinct groups of economic agents motivated by different economic objectives.",
    "A",
    "1. Assertion (A) is TRUE: Households decide savings based on disposable income and thriftiness, whereas business firms decide investment based on interest rates and profit expectations.\n2. Reason (R) is TRUE and correctly explains why planned saving and investment can diverge: Because savers and investors act independently, ex-ante S equals ex-ante I only at equilibrium.\nHence, Both (A) and (R) are true and (R) is the correct explanation of (A) (Option A)."
))

# =================================================================================================
# PART 3: Investment Multiplier (k), Multiplier Mechanism, and Numerical Problems (Q51 - Q70)
# =================================================================================================

# 51. Formula for Investment Multiplier
opts, corr, sol = rotate_options(
    "k = \\Delta Y / \\Delta I = 1 / (1 - MPC) = 1 / MPS",
    [
        "k = \\Delta I / \\Delta Y = 1 / MPC",
        "k = \\Delta C / \\Delta S = 1 / (1 - MPS)",
        "k = Y / I = MPC / MPS"
    ],
    "D",
    "1. The Investment Multiplier (k) measures the ratio of change in national income (ΔY) to an initial change in investment expenditure (ΔI).\n2. Mathematically, k = ΔY / ΔI = 1 / (1 - MPC) = 1 / MPS.\nHence, Option {{CORR}} is correct.",
    "States complete formula for investment multiplier: k = 1 / MPS."
)
add_q(make_question(CHAPTER, "Investment Multiplier", "What is the correct mathematical formula for the Investment Multiplier (k)?", opts, corr, sol))

# 52. Direct relationship between MPC and Multiplier
opts, corr, sol = rotate_options(
    "There is a direct (positive) relationship between MPC and the multiplier; a higher MPC results in a larger multiplier value",
    [
        "There is an inverse relationship; higher MPC reduces the multiplier",
        "The multiplier is completely independent of MPC",
        "MPC and multiplier are unrelated because investment is autonomous"
    ],
    "A",
    "1. Formula: k = 1 / (1 - MPC).\n2. As MPC increases, (1 - MPC) becomes smaller, which increases the quotient 1 / (1 - MPC).\n3. Thus, a higher MPC yields a greater expansion of income in subsequent rounds of spending.\nHence, Option {{CORR}} is correct.",
    "Identifies direct relationship between MPC and Multiplier."
)
add_q(make_question(CHAPTER, "Investment Multiplier", "What is the nature of the relationship between Marginal Propensity to Consume (MPC) and the Investment Multiplier (k)?", opts, corr, sol))

# 53. Inverse relationship between MPS and Multiplier
opts, corr, sol = rotate_options(
    "Inverse (negative) relationship; as MPS increases, the multiplier value decreases",
    [
        "Direct relationship; higher MPS increases the multiplier",
        "Exponential relationship where MPS equals the square of the multiplier",
        "No relationship because savings represent injections"
    ],
    "B",
    "1. Formula: k = 1 / MPS.\n2. Since MPS appears in the denominator, an increase in MPS increases the leakage from the expenditure stream, thereby reducing the size of the multiplier.\nHence, Option {{CORR}} is correct.",
    "Identifies inverse relationship between MPS and Multiplier."
)
add_q(make_question(CHAPTER, "Investment Multiplier", "What is the relationship between the Marginal Propensity to Save (MPS) and the Investment Multiplier (k)?", opts, corr, sol))

# 54. Maximum and Minimum values of Multiplier
opts, corr, sol = rotate_options(
    "Minimum value is 1 (when MPC = 0), and maximum value is infinity (when MPC = 1)",
    [
        "Minimum value is 0 (when MPC = 0), and maximum value is 100",
        "Minimum value is -1, and maximum value is 1",
        "Minimum value is 0.5, and maximum value is 10"
    ],
    "C",
    "1. When MPC = 0: k = 1 / (1 - 0) = 1 (minimum value, meaning income rises only by the initial amount of investment).\n2. When MPC = 1: k = 1 / (1 - 1) = 1 / 0 = ∞ (maximum value, meaning continuous unending rounds of income creation).\nHence, Option {{CORR}} is correct.",
    "Identifies minimum k = 1 (MPC=0) and maximum k = infinity (MPC=1)."
)
add_q(make_question(CHAPTER, "Investment Multiplier", "What are the theoretical minimum and maximum limits of the Investment Multiplier (k)?", opts, corr, sol))

# 55. Numerical: k when MPC = 0.8
opts, corr, sol = rotate_options(
    "5",
    [
        "4",
        "2.5",
        "1.25"
    ],
    "D",
    "1. k = 1 / (1 - MPC).\n2. k = 1 / (1 - 0.8) = 1 / 0.2 = 5.\nHence, Option {{CORR}} is correct.",
    "Calculates k = 1 / 0.2 = 5 when MPC = 0.8."
)
add_q(make_question(CHAPTER, "Investment Multiplier", "If the Marginal Propensity to Consume (MPC) in an economy is 0.8, what is the value of the Investment Multiplier (k)?", opts, corr, sol))

# 56. Numerical: k when MPS = 0.25
opts, corr, sol = rotate_options(
    "4",
    [
        "2.5",
        "5",
        "0.25"
    ],
    "A",
    "1. k = 1 / MPS.\n2. k = 1 / 0.25 = 4.\nHence, Option {{CORR}} is correct.",
    "Calculates k = 1 / 0.25 = 4."
)
add_q(make_question(CHAPTER, "Investment Multiplier", "If the Marginal Propensity to Save (MPS) is 0.25, what is the value of the multiplier?", opts, corr, sol))

# 57. Numerical: Change in income from ΔI = 500 when MPC = 0.75
opts, corr, sol = rotate_options(
    "₹2,000 crore",
    [
        "₹1,500 crore",
        "₹1,000 crore",
        "₹2,500 crore"
    ],
    "B",
    "1. k = 1 / (1 - MPC) = 1 / (1 - 0.75) = 1 / 0.25 = 4.\n2. ΔY = k × ΔI = 4 × ₹500 crore = ₹2,000 crore.\nHence, Option {{CORR}} is correct.",
    "Calculates ΔY = 4 * 500 = 2000 crore."
)
add_q(make_question(CHAPTER, "Investment Multiplier", "If an additional investment of ₹500 crore is injected into an economy where MPC is 0.75, what will be the total increase in national income (\\Delta Y)?", opts, corr, sol))

# 58. Numerical: Change in consumption resulting from ΔI
opts, corr, sol = rotate_options(
    "₹1,500 crore",
    [
        "₹2,000 crore",
        "₹500 crore",
        "₹1,200 crore"
    ],
    "C",
    "1. Total increase in income (ΔY) = ₹2,000 crore.\n2. ΔC = MPC × ΔY = 0.75 × 2,000 = ₹1,500 crore.\n3. (Notice that ΔS = MPS × ΔY = 0.25 × 2,000 = ₹500 crore, which equals the initial ΔI).\nHence, Option {{CORR}} is correct.",
    "Calculates ΔC = 0.75 * 2000 = 1500 crore."
)
add_q(make_question(CHAPTER, "Investment Multiplier", "In the previous problem (where \\Delta I = ₹500 crore, MPC = 0.75, and \\Delta Y = ₹2,000 crore), what is the total resulting increase in consumption expenditure (\\Delta C)?", opts, corr, sol))

# 59. Backward operation of Multiplier
opts, corr, sol = rotate_options(
    "A decrease in autonomous investment causes a multiple contraction in national income",
    [
        "A decrease in investment leads to an expansion of national saving",
        "An increase in investment causes a decrease in output",
        "The multiplier value turns into a negative fraction"
    ],
    "D",
    "1. The multiplier is a two-edged sword. It operates forward (expansion) when investment increases, and backward (contraction) when investment decreases.\n2. In reverse/backward operation: -ΔI causes a multiple contraction in national income (-ΔY = k × -ΔI).\nHence, Option {{CORR}} is correct.",
    "Explains backward multiplier operation as multiple contraction in income from reduction in investment."
)
add_q(make_question(CHAPTER, "Investment Multiplier", "What is meant by the 'Backward Working' or reverse operation of the Investment Multiplier?", opts, corr, sol))

# 60. Sequence Question: Multiplier process rounds
add_q(make_sequence_question(
    CHAPTER,
    "Multiplier Mechanism",
    "Arrange the stages of the Investment Multiplier process in the correct chronological sequence following an initial injection of investment (\\Delta I):",
    [
        "Producers in the capital goods industry experience an increase in sales and receive new income equal to \\Delta I.",
        "Factor owners spend a proportion (MPC) of their newly received income on consumer goods.",
        "Consumer goods producers receive this spending as new revenue and distribute it as income to their factor owners.",
        "The recipients of secondary income spend a proportion (MPC) on further consumption.",
        "The successive rounds of income generation continue until total cumulative savings equal the initial \\Delta I."
    ],
    "(A) -> (B) -> (C) -> (D) -> (E)",
    [
        "(B) -> (A) -> (C) -> (E) -> (D)",
        "(A) -> (C) -> (B) -> (E) -> (D)",
        "(C) -> (B) -> (A) -> (D) -> (E)"
    ],
    "A",
    "1. The multiplier mechanism proceeds through successive chain reactions: (A) Initial investment income -> (B) Spending by factor owners -> (C) Revenue to consumer goods firms -> (D) Secondary consumption rounds -> (E) Eventual convergence where cumulative leakages equal initial injection.\nHence, Option A is correct."
))

# 61. Multiplier stops when cumulative saving equals ΔI
opts, corr, sol = rotate_options(
    "Total cumulative savings (leakages) generated across all rounds become exactly equal to the initial increase in investment (\\Delta S = \\Delta I)",
    [
        "Commercial banks run completely out of cash reserves",
        "National income reaches absolute mathematical zero",
        "Marginal propensity to consume falls to -1"
    ],
    "B",
    "1. In each round of the multiplier, a fraction of income is saved (leaked). The process of income generation ceases when the sum total of savings generated across all rounds exactly equals the initial autonomous investment injection (ΔS = ΔI).\nHence, Option {{CORR}} is correct.",
    "Explains multiplier concludes when cumulative ΔS = ΔI."
)
add_q(make_question(CHAPTER, "Multiplier Mechanism", "At what point does the successive chain of income generation in the multiplier process come to an end?", opts, corr, sol))

# 62. Numerical: Given ΔY = 1000 and ΔI = 250, find MPC
opts, corr, sol = rotate_options(
    "0.75",
    [
        "0.25",
        "0.80",
        "4.00"
    ],
    "C",
    "1. k = ΔY / ΔI = 1,000 / 250 = 4.\n2. k = 1 / (1 - MPC) => 4 = 1 / (1 - MPC) => 1 - MPC = 1 / 4 = 0.25.\n3. MPC = 1 - 0.25 = 0.75.\nHence, Option {{CORR}} is correct.",
    "Calculates k = 4, MPC = 1 - 0.25 = 0.75."
)
add_q(make_question(CHAPTER, "Investment Multiplier", "If an increase in investment of ₹250 crore leads to an increase in national income of ₹1,000 crore, what is the Marginal Propensity to Consume (MPC)?", opts, corr, sol))

# 63. Numerical: Required ΔI for target ΔY
opts, corr, sol = rotate_options(
    "₹500 crore",
    [
        "₹400 crore",
        "₹2,500 crore",
        "₹100 crore"
    ],
    "D",
    "1. k = 1 / MPS = 1 / 0.20 = 5.\n2. ΔY = k × ΔI => 2,500 = 5 × ΔI.\n3. ΔI = 2,500 / 5 = ₹500 crore.\nHence, Option {{CORR}} is correct.",
    "Calculates ΔI = 2500 / 5 = 500 crore."
)
add_q(make_question(CHAPTER, "Investment Multiplier", "An economy wants to raise its national income by ₹2,500 crore. If the Marginal Propensity to Save (MPS) is 0.20, how much additional investment (\\Delta I) is required?", opts, corr, sol))

# 64. Numerical: Multiplier when MPC = MPS
opts, corr, sol = rotate_options(
    "2",
    [
        "1",
        "4",
        "0.5"
    ],
    "A",
    "1. We know MPC + MPS = 1.\n2. If MPC = MPS, then 2 × MPS = 1 => MPS = 0.5 (and MPC = 0.5).\n3. Multiplier k = 1 / MPS = 1 / 0.5 = 2.\nHence, Option {{CORR}} is correct.",
    "Calculates k = 2 when MPC = MPS = 0.5."
)
add_q(make_question(CHAPTER, "Investment Multiplier", "If an economy's Marginal Propensity to Consume is exactly equal to its Marginal Propensity to Save (MPC = MPS), what is the value of the Investment Multiplier?", opts, corr, sol))

# 65. Statement Question: Multiplier in open vs closed economy
add_q(make_statement_question(
    CHAPTER,
    "Investment Multiplier",
    "In an open economy with imports, the value of the expenditure multiplier is smaller than in a closed economy.",
    "Imports represent a leakage from the domestic circular flow of expenditure because spending on imported goods generates income abroad rather than domestically.",
    "A",
    "1. Statement I is TRUE: The open economy multiplier includes Marginal Propensity to Import (MPM) in the denominator: k = 1 / (MPS + MPM), making it strictly smaller.\n2. Statement II is TRUE: Spending on foreign products drains purchasing power away from domestic producers.\nHence, Both Statement I and Statement II are true (Option A)."
))

# 66. Assertion Reason: MPC and Multiplier
add_q(make_assertion_question(
    CHAPTER,
    "Investment Multiplier",
    "The higher the propensity to consume, the greater is the value of the investment multiplier.",
    "A higher MPC means that in each round of spending, a smaller proportion of income leaks out into savings.",
    "A",
    "1. Assertion (A) is TRUE: When MPC is high, successive rounds of induced consumption are larger.\n2. Reason (R) is TRUE: Savings represent leakages from the income stream. A higher MPC directly implies a lower MPS (leakage), allowing a larger cumulative expansion of income.\nHence, Both (A) and (R) are true and (R) is the correct explanation of (A) (Option A)."
))

# 67. Numerical: Multiplier when MPS = 0
opts, corr, sol = rotate_options(
    "Infinity (∞)",
    [
        "0",
        "1",
        "Cannot be defined mathematically because income collapses"
    ],
    "B",
    "1. If MPS = 0, MPC = 1 - 0 = 1.\n2. k = 1 / MPS = 1 / 0 = ∞.\n3. When people consume 100% of any additional income with zero leakages, the spending chain never diminishes, theoretically expanding income infinitely.\nHence, Option {{CORR}} is correct.",
    "Identifies k = infinity when MPS = 0."
)
add_q(make_question(CHAPTER, "Investment Multiplier", "What is the theoretical value of the Investment Multiplier if the Marginal Propensity to Save is 0?", opts, corr, sol))

# 68. Numerical: Multiplier when MPC = 0
opts, corr, sol = rotate_options(
    "1",
    [
        "0",
        "Infinity",
        "-1"
    ],
    "C",
    "1. If MPC = 0, then MPS = 1.\n2. k = 1 / (1 - 0) = 1 / 1 = 1.\n3. This means that no secondary consumption rounds take place; the total increase in national income is strictly equal to the initial investment injection (ΔY = ΔI).\nHence, Option {{CORR}} is correct.",
    "Calculates k = 1 when MPC = 0."
)
add_q(make_question(CHAPTER, "Investment Multiplier", "What is the value of the Investment Multiplier when the Marginal Propensity to Consume is zero (MPC = 0)?", opts, corr, sol))

# 69. Match Question: Multiplier Values for given MPC
add_q(make_match_question(
    CHAPTER,
    "Investment Multiplier",
    "Match the Marginal Propensity to Consume (MPC) values in List I with their corresponding Multiplier (k) values in List II:",
    [
        ("A", "MPC = 0.50"),
        ("B", "MPC = 0.75"),
        ("C", "MPC = 0.80"),
        ("D", "MPC = 0.90")
    ],
    [
        ("(I)", "k = 10"),
        ("(II)", "k = 2"),
        ("(III)", "k = 4"),
        ("(IV)", "k = 5")
    ],
    "A-(II), B-(III), C-(IV), D-(I)",
    [
        "A-(III), B-(II), C-(I), D-(IV)",
        "A-(II), B-(I), C-(IV), D-(III)",
        "A-(IV), B-(III), C-(II), D-(I)"
    ],
    "A",
    "1. MPC = 0.50 => k = 1 / 0.5 = 2 -> A-(II)\n2. MPC = 0.75 => k = 1 / 0.25 = 4 -> B-(III)\n3. MPC = 0.80 => k = 1 / 0.20 = 5 -> C-(IV)\n4. MPC = 0.90 => k = 1 / 0.10 = 10 -> D-(I)\nHence, Option A is correct."
))

# 70. Leakages from multiplier stream
opts, corr, sol = rotate_options(
    "Savings, taxation, and expenditure on imports",
    [
        "Autonomous investment, exports, and government spending",
        "Commercial bank loans, credit creation, and subsidies",
        "Corporate dividend distributions and stock market gains"
    ],
    "D",
    "1. Leakages (withdrawals) are factors that reduce the flow of expenditure in successive rounds of the multiplier. The three major macroeconomic leakages are Saving (S), Taxes (T), and Imports (M).\nHence, Option {{CORR}} is correct.",
    "Identifies savings, taxes, and imports as leakages."
)
add_q(make_question(CHAPTER, "Multiplier Mechanism", "Which set of economic variables constitutes the major 'leakages' (withdrawals) that dampen the magnifying power of the multiplier?", opts, corr, sol))

# =================================================================================================
# PART 4: Excess Demand, Deficient Demand, Inflationary & Deflationary Gaps (Q71 - Q85)
# =================================================================================================

# 71. Deficient Demand definition
opts, corr, sol = rotate_options(
    "Aggregate Demand is less than Aggregate Supply corresponding to full employment level of output",
    [
        "Aggregate Demand exceeds full employment Aggregate Supply",
        "Government expenditure exceeds total tax receipts",
        "The supply of currency exceeds total demand for money"
    ],
    "A",
    "1. Deficient Demand refers to a situation where Aggregate Demand (AD) falls short of Aggregate Supply (AS) at the full employment level of output (AD < AS at full employment).\nHence, Option {{CORR}} is correct.",
    "Defines deficient demand."
)
add_q(make_question(CHAPTER, "Deficient Demand", "What is meant by 'Deficient Demand' in macroeconomics?", opts, corr, sol))

# 72. Deflationary Gap definition
opts, corr, sol = rotate_options(
    "The vertical shortfall by which actual Aggregate Demand falls short of the Aggregate Demand required for full employment",
    [
        "The difference between total government debt and GDP",
        "The excess of total imports over total exports",
        "The drop in stock market price index during a recession"
    ],
    "B",
    "1. The Deflationary Gap is the vertical distance by which aggregate demand falls short of aggregate supply at the full employment level. It measures the extent of deficiency in aggregate demand.\nHence, Option {{CORR}} is correct.",
    "Defines deflationary gap as vertical shortfall in AD at full employment."
)
add_q(make_question(CHAPTER, "Deflationary Gap", "How is the 'Deflationary Gap' measured on a Keynesian macroeconomic diagram?", opts, corr, sol))

# 73. Consequences of Deficient Demand
opts, corr, sol = rotate_options(
    "Involuntary unemployment, fall in output, and general deflationary pressure on price levels",
    [
        "Demand-pull inflation, full employment, and excessive real output growth",
        "Immediate appreciation of foreign currency reserves",
        "Excessive corporate profits and rapid wage increases"
    ],
    "C",
    "1. When demand is deficient, firms cannot sell all their full-employment output. Consequently, they cut back production, lay off workers (creating involuntary unemployment), and slash prices, inducing deflationary economic stagnation.\nHence, Option {{CORR}} is correct.",
    "Identifies involuntary unemployment and fall in output as consequences of deficient demand."
)
add_q(make_question(CHAPTER, "Deficient Demand", "What are the typical macroeconomic consequences of Deficient Demand in an economy?", opts, corr, sol))

# 74. Excess Demand definition
opts, corr, sol = rotate_options(
    "Aggregate Demand exceeds Aggregate Supply corresponding to the full employment level of output",
    [
        "Aggregate Supply exceeds Aggregate Demand at full employment",
        "Total commercial bank lending exceeds total deposits",
        "Public savings exceed private investments"
    ],
    "D",
    "1. Excess Demand occurs when Aggregate Demand is greater than Aggregate Supply at the full employment level of income (AD > AS at full employment).\nHence, Option {{CORR}} is correct.",
    "Defines excess demand."
)
add_q(make_question(CHAPTER, "Excess Demand", "How is 'Excess Demand' defined in short-run macroeconomics?", opts, corr, sol))

# 75. Inflationary Gap definition
opts, corr, sol = rotate_options(
    "The vertical excess of actual Aggregate Demand over the Aggregate Demand required to maintain full employment",
    [
        "The annual percentage rise in consumer price index",
        "The gap between fiscal deficit and revenue deficit",
        "The difference between market rate and repo rate"
    ],
    "A",
    "1. The Inflationary Gap represents the vertical distance by which actual aggregate demand exceeds aggregate supply at the full employment output level. It puts upward pressure on price levels without raising real output.\nHence, Option {{CORR}} is correct.",
    "Defines inflationary gap as vertical excess of AD at full employment."
)
add_q(make_question(CHAPTER, "Inflationary Gap", "What does the 'Inflationary Gap' measure?", opts, corr, sol))

# 76. Why real output does NOT rise during Excess Demand
opts, corr, sol = rotate_options(
    "Because all available productive resources (labour and capital) are already fully employed, so physical output cannot increase in the short run",
    [
        "Because consumers refuse to purchase extra goods at higher prices",
        "Because government enacts laws freezing all industrial manufacturing",
        "Because commercial banks stop processing electronic payments"
    ],
    "B",
    "1. In the short run, once an economy operates at full employment, all machines, factories, and workers are fully engaged. Output cannot be expanded beyond this physical limit; therefore, any additional demand bids up prices (inflation) without increasing real output.\nHence, Option {{CORR}} is correct.",
    "Explains why real output cannot rise past full employment."
)
add_q(make_question(CHAPTER, "Excess Demand", "Why does an economy experiencing 'Excess Demand' fail to expand its real output and employment beyond full employment levels?", opts, corr, sol))

# 77. Causes of Excess Demand
opts, corr, sol = rotate_options(
    "Increase in autonomous consumption, rise in investment, surge in government spending, or cut in tax rates",
    [
        "Increase in tax rates, cut in government expenditure, and decline in exports",
        "Steep hike in commercial bank interest rates and CRR",
        "Rise in propensity to save and decline in money supply"
    ],
    "C",
    "1. Excess demand is caused by expansionary forces: higher consumption (C), increased private investment (I), higher government purchases (G), higher export demand (X), or cuts in taxation (which boost disposable income).\nHence, Option {{CORR}} is correct.",
    "Identifies causes of excess demand."
)
add_q(make_question(CHAPTER, "Excess Demand", "Which of the following combinations of economic events directly causes 'Excess Demand' in an economy?", opts, corr, sol))

# 78. Causes of Deficient Demand
opts, corr, sol = rotate_options(
    "Decrease in consumption expenditure, fall in private investment, reduction in government spending, or rise in taxes",
    [
        "Increase in autonomous investment, rise in exports, and reduction in taxes",
        "Reduction in Cash Reserve Ratio and Bank Rate by the central bank",
        "Expansion of government welfare transfer spending"
    ],
    "D",
    "1. Deficient demand results from contractionary factors: fall in household consumption, decline in private business confidence (lower I), fiscal austerity (cut in G), rise in taxes (lowering disposable income), or a slump in foreign exports.\nHence, Option {{CORR}} is correct.",
    "Identifies causes of deficient demand."
)
add_q(make_question(CHAPTER, "Deficient Demand", "Which factors are primarily responsible for causing 'Deficient Demand'?", opts, corr, sol))

# 79. Statement Question: Impact on employment
add_q(make_statement_question(
    CHAPTER,
    "Excess and Deficient Demand",
    "Deficient demand leads to an increase in involuntary unemployment in the economy.",
    "Excess demand leads to an increase in real employment beyond the full employment level.",
    "C",
    "1. Statement I is TRUE: Because demand is deficient, firms cut production and retrench workers, generating involuntary unemployment.\n2. Statement II is FALSE: Since full employment already implies that all willing workers are employed, employment cannot physically increase further; excess demand only generates wage-price inflation.\nHence, Statement I is true but Statement II is false (Option C)."
))

# 80. Assertion Reason: Inflationary Gap and Prices
add_q(make_assertion_question(
    CHAPTER,
    "Inflationary Gap",
    "An inflationary gap generates demand-pull inflation in an economy without increasing real national output.",
    "At full employment, Aggregate Supply is completely inelastic in the short run because physical resources are fully utilized.",
    "A",
    "1. Assertion (A) is TRUE: The inflationary gap bids up prices (demand-pull inflation) because real output is fixed at potential output.\n2. Reason (R) is TRUE and correctly explains (A): Since all factors of production are fully employed, the aggregate supply curve becomes vertical (completely inelastic), converting all excess demand into price rises.\nHence, Both (A) and (R) are true and (R) is the correct explanation of (A) (Option A)."
))

# 81. Match Question: Gaps and Characteristics
add_q(make_match_question(
    CHAPTER,
    "Gaps Analysis",
    "Match the economic situations in List I with their defining characteristics in List II:",
    [
        ("A", "Deflationary Gap"),
        ("B", "Inflationary Gap"),
        ("C", "Full Employment Equilibrium"),
        ("D", "Underemployment Equilibrium")
    ],
    [
        ("(I)", "AD = AS with zero involuntary unemployment"),
        ("(II)", "AD < AS at full employment; causes involuntary unemployment"),
        ("(III)", "AD > AS at full employment; causes demand-pull inflation"),
        ("(IV)", "AD = AS at an output level below potential capacity")
    ],
    "A-(II), B-(III), C-(I), D-(IV)",
    [
        "A-(III), B-(II), C-(I), D-(IV)",
        "A-(II), B-(I), C-(IV), D-(III)",
        "A-(IV), B-(III), C-(II), D-(I)"
    ],
    "A",
    "1. Deflationary Gap: Shortfall at full employment -> A-(II)\n2. Inflationary Gap: Excess at full employment -> B-(III)\n3. Full Employment Equilibrium: AD = AS at potential output -> C-(I)\n4. Underemployment Equilibrium: AD = AS below full employment -> D-(IV)\nHence, Option A is correct."
))

# 82. Numerical: Calculating Deflationary Gap
opts, corr, sol = rotate_options(
    "₹100 crore",
    [
        "₹500 crore",
        "₹400 crore",
        "₹80 crore"
    ],
    "B",
    "1. Full employment income (Y_F) = ₹2,000 crore. Actual equilibrium income (Y) = ₹1,600 crore.\n2. Income gap (ΔY) = 2,000 - 1,600 = ₹400 crore.\n3. MPC = 0.75 => Multiplier k = 1 / (1 - 0.75) = 4.\n4. Deflationary Gap = Required increase in autonomous spending = ΔY / k = 400 / 4 = ₹100 crore.\nHence, Option {{CORR}} is correct.",
    "Calculates Deflationary Gap = ΔY / k = 400 / 4 = 100 crore."
)
add_q(make_question(CHAPTER, "Deflationary Gap", "An economy has full employment income of ₹2,000 crore, but its current equilibrium income is ₹1,600 crore. If MPC is 0.75, what is the size of the Deflationary Gap?", opts, corr, sol))

# 83. Numerical: Calculating Inflationary Gap
opts, corr, sol = rotate_options(
    "₹100 crore",
    [
        "₹250 crore",
        "₹50 crore",
        "₹200 crore"
    ],
    "C",
    "1. Full employment income (Y_F) = ₹5,000 crore.\n2. Current aggregate demand equilibrium without resource constraint would be Y = ₹5,500 crore.\n3. Income excess (ΔY) = 5,500 - 5,000 = ₹500 crore.\n4. If MPS = 0.20, multiplier k = 1 / 0.20 = 5.\n5. Inflationary gap = Excess autonomous expenditure = ΔY / k = 500 / 5 = ₹100 crore.\nHence, Option {{CORR}} is correct.",
    "Calculates Inflationary Gap = ΔY / k = 500 / 5 = 100 crore."
)
add_q(make_question(CHAPTER, "Inflationary Gap", "If the full employment level of national income is ₹5,000 crore and planned AD corresponds to ₹5,500 crore in an economy with an MPS of 0.20, what is the value of the Inflationary Gap?", opts, corr, sol))

# 84. Paradox of Thrift concept
opts, corr, sol = rotate_options(
    "If all individuals attempt to increase their savings rate (MPS), aggregate demand and national income fall, leaving total actual savings unchanged or reduced",
    [
        "The more an individual spends on luxury goods, the wealthier they become",
        "Saving money in commercial banks guarantees zero percent interest earnings",
        "Government budget deficits automatically turn into household savings"
    ],
    "D",
    "1. The 'Paradox of Thrift' (popularized by Keynes) states that while individual thriftiness is a virtue, if everyone tries to save more simultaneously (MPS rises), aggregate consumption falls.\n2. This contracts aggregate demand, reducing equilibrium income (Y) via the multiplier.\n3. At the lower income, total savings S = Y - C may end up equal to the original investment or even smaller.\nHence, Option {{CORR}} is correct.",
    "Defines Paradox of Thrift."
)
add_q(make_question(CHAPTER, "Paradox of Thrift", "What is the core economic principle behind the 'Paradox of Thrift'?", opts, corr, sol))

# 85. Graphical depiction of Paradox of Thrift
opts, corr, sol = rotate_options(
    "The saving curve shifts upward/leftward, intersecting the unchanged autonomous investment line at a lower equilibrium level of national income",
    [
        "The investment curve shifts upward, causing national income to double",
        "The 45-degree line rotates downward by 90 degrees",
        "The consumption curve shifts parallelly upward"
    ],
    "A",
    "1. An increase in the propensity to save shifts the saving curve upward (-C_bar increases or slope MPS rises).\n2. With planned investment fixed as a horizontal line, the new intersection occurs at a lower level of national income (Y_1 < Y_0).\n3. At the new equilibrium, total saving remains equal to the unchanged autonomous investment.\nHence, Option {{CORR}} is correct.",
    "Explains upward shift of saving curve leading to lower equilibrium income."
)
add_q(make_question(CHAPTER, "Paradox of Thrift", "How is the 'Paradox of Thrift' represented on an S-I equilibrium diagram?", opts, corr, sol))

# =================================================================================================
# PART 5: Fiscal & Monetary Measures, Advanced Match, Sequence & Integrated Problems (Q86 - Q100)
# =================================================================================================

# 86. Fiscal Policy measures to remedy Deficient Demand
opts, corr, sol = rotate_options(
    "Increase government expenditure and reduce taxes to stimulate aggregate demand",
    [
        "Cut government expenditure and increase tax rates",
        "Increase repo rate and sell government securities in open market",
        "Increase cash reserve ratio and statutory liquidity ratio"
    ],
    "B",
    "1. To combat deficient demand (deflationary gap), the government adopts an Expansionary Fiscal Policy:\n   (i) Increase government expenditure (G) to directly boost aggregate demand.\n   (ii) Cut taxes (T) to increase disposable income and boost household consumption.\nHence, Option {{CORR}} is correct.",
    "Identifies expansionary fiscal policy (raise G, cut T) for deficient demand."
)
add_q(make_question(CHAPTER, "Remedial Measures", "What fiscal policy measures should the government undertake to correct 'Deficient Demand' in an economy?", opts, corr, sol))

# 87. Fiscal Policy measures to remedy Excess Demand
opts, corr, sol = rotate_options(
    "Curtail government expenditure and increase tax rates to curb disposable purchasing power",
    [
        "Increase government welfare spending and eliminate all income taxes",
        "Lower the repo rate and buy back government bonds",
        "Decrease the Cash Reserve Ratio to inject liquidity"
    ],
    "C",
    "1. To eliminate excess demand (inflationary gap), the government pursues a Contractionary Fiscal Policy: reduce public expenditure (G) to deflate aggregate demand directly, and increase taxes (T) to siphon off excess disposable income.\nHence, Option {{CORR}} is correct.",
    "Identifies contractionary fiscal policy (cut G, raise T) for excess demand."
)
add_q(make_question(CHAPTER, "Remedial Measures", "How can the government utilize fiscal policy instruments to control 'Excess Demand'?", opts, corr, sol))

# 88. Monetary Policy to remedy Deficient Demand (Quantitative)
opts, corr, sol = rotate_options(
    "Lower Repo Rate, reduce CRR/SLR, and purchase government securities in Open Market Operations",
    [
        "Raise Repo Rate, increase CRR/SLR, and sell government bonds",
        "Hike margin requirements and issue moral warnings to ration bank credit",
        "Impose higher income tax brackets on commercial banks"
    ],
    "D",
    "1. To eliminate deficient demand, the central bank adopts an Expansionary Monetary Policy (Cheap Money Policy): lower Repo Rate and Bank Rate (cheaper borrowing), lower CRR and SLR (freeing loanable reserves), and purchase government securities (injecting cash into the banking system).\nHence, Option {{CORR}} is correct.",
    "Identifies expansionary monetary tools (lower rates, buy bonds) for deficient demand."
)
add_q(make_question(CHAPTER, "Remedial Measures", "Which set of quantitative monetary policy instruments would the Central Bank employ to correct 'Deficient Demand'?", opts, corr, sol))

# 89. Monetary Policy to remedy Excess Demand (Quantitative)
opts, corr, sol = rotate_options(
    "Raise the Repo Rate, increase CRR/SLR, and sell government securities in the Open Market",
    [
        "Lower Bank Rate, reduce reserve ratios, and buy back treasury bills",
        "Eliminate margin requirements on real estate loans",
        "Expand deficit financing through fresh currency printing"
    ],
    "A",
    "1. To combat excess demand, the central bank adopts a Contractionary Monetary Policy (Dear Money Policy): hike repo rate/bank rate (making loans costlier), raise CRR and SLR (locking up bank funds), and sell government securities in open market (sucking out excess liquidity).\nHence, Option {{CORR}} is correct.",
    "Identifies dear money policy (raise rates, sell bonds) for excess demand."
)
add_q(make_question(CHAPTER, "Remedial Measures", "What quantitative monetary policy actions are appropriate for eliminating an 'Inflationary Gap'?", opts, corr, sol))

# 90. Qualitative Monetary Instrument: Margin Requirement
opts, corr, sol = rotate_options(
    "Margin requirement should be increased to reduce credit availability and discourage borrowing",
    [
        "Margin requirement should be reduced to zero to expand loan volumes",
        "Margin requirement should be replaced by corporate dividend taxes",
        "Margin requirements have no relevance to bank credit demand"
    ],
    "B",
    "1. Margin requirement is the difference between the market value of collateral security and the loan amount sanctioned.\n2. Raising the margin requirement (e.g., from 20% to 40%) means a borrower gets less loan for the same collateral, which restricts credit creation and cools excess demand.\nHence, Option {{CORR}} is correct.",
    "Explains raising margin requirement curbs borrowing during excess demand."
)
add_q(make_question(CHAPTER, "Qualitative Monetary Instruments", "How should the Central Bank adjust 'Margin Requirements' on loans during a period of Excess Demand?", opts, corr, sol))

# 91. Match Question: Policy Tools and Objectives
add_q(make_match_question(
    CHAPTER,
    "Remedial Measures",
    "Match the policy actions in List I with their intended macroeconomic objectives in List II:",
    [
        ("A", "Central Bank buys government bonds in OMO"),
        ("B", "Central Bank hikes Repo Rate"),
        ("C", "Government increases public infrastructure spending"),
        ("D", "Government increases income tax rates")
    ],
    [
        ("(I)", "Curb consumer spending during Inflationary Gap"),
        ("(II)", "Inject liquidity to combat Deficient Demand"),
        ("(III)", "Directly stimulate output during economic slump"),
        ("(IV)", "Increase borrowing costs to cool Excess Demand")
    ],
    "A-(II), B-(IV), C-(III), D-(I)",
    [
        "A-(II), B-(I), C-(IV), D-(III)",
        "A-(IV), B-(III), C-(II), D-(I)",
        "A-(III), B-(IV), C-(II), D-(I)"
    ],
    "A",
    "1. OMO purchase -> Injects liquidity for deficient demand -> A-(II)\n2. Hike repo rate -> Increases borrowing costs for excess demand -> B-(IV)\n3. Increase public spending -> Directly stimulates output in slump -> C-(III)\n4. Increase income taxes -> Curbs consumer spending in inflationary gap -> D-(I)\nHence, Option A is correct."
))

# 92. Sequence Question: Monetary transmission of Repo Rate hike
add_q(make_sequence_question(
    CHAPTER,
    "Monetary Transmission",
    "Arrange the sequential steps in the correct transmission mechanism through which a hike in the Repo Rate by the Central Bank curbs Excess Demand:",
    [
        "Central Bank increases the Repo Rate charged on commercial bank borrowings.",
        "Commercial banks face higher cost of funds and increase their lending interest rates for retail and business borrowers.",
        "Households and firms reduce their borrowings for housing, vehicles, and capital expansion.",
        "Aggregate consumption expenditure (C) and investment expenditure (I) decline.",
        "Aggregate Demand contracts, eliminating the Inflationary Gap."
    ],
    "(A) -> (B) -> (C) -> (D) -> (E)",
    [
        "(B) -> (A) -> (C) -> (E) -> (D)",
        "(A) -> (C) -> (B) -> (E) -> (D)",
        "(C) -> (B) -> (A) -> (D) -> (E)"
    ],
    "A",
    "1. The monetary policy transmission flows: (A) Repo rate increase -> (B) Higher retail lending rates -> (C) Reduced credit demand -> (D) Contraction in C and I -> (E) Deflation of aggregate demand.\nHence, Option A is correct."
))

# 93. Deficit Financing definition
opts, corr, sol = rotate_options(
    "Financing the government budgetary gap by borrowing from the central bank or issuing new currency",
    [
        "Securing foreign loans exclusively to buy military weapons",
        "Raising tax rates to 100% on high-net-worth individuals",
        "Mandating commercial banks to surrender their gold vaults"
    ],
    "C",
    "1. Deficit financing refers to the practice where the government funds its fiscal deficit by borrowing from the central bank (which creates new currency notes against government treasury bills).\n2. In a situation of deficient demand, deficit financing expands money supply and boosts aggregate demand.\nHence, Option {{CORR}} is correct.",
    "Defines deficit financing as borrowing from central bank / currency creation."
)
add_q(make_question(CHAPTER, "Fiscal Policy", "What is 'Deficit Financing' in the context of Keynesian macroeconomic management?", opts, corr, sol))

# 94. Statement Question: Multiplier in depression vs boom
add_q(make_statement_question(
    CHAPTER,
    "Investment Multiplier",
    "During severe economic depression with vast unutilized idle factories, the real multiplier functions with maximum efficacy.",
    "During full employment boom conditions, an increase in autonomous investment triggers pure price inflation rather than an expansion of real output.",
    "A",
    "1. Statement I is TRUE: In depression, substantial unused capacity exists, allowing firms to expand real physical production in response to demand without bottlenecks.\n2. Statement II is TRUE: At full employment, physical output is fixed at potential capacity, so higher spending merely inflates prices.\nHence, Both Statement I and Statement II are true (Option A)."
))

# 95. Assertion Reason: Moral Suasion
add_q(make_assertion_question(
    CHAPTER,
    "Qualitative Monetary Instruments",
    "Moral Suasion is a qualitative monetary instrument used by the Central Bank to regulate credit flow.",
    "Moral Suasion involves formal statutory directives carrying severe criminal penalties for non-compliant commercial bank directors.",
    "C",
    "1. Assertion (A) is TRUE: Moral suasion is a qualitative tool where the central bank uses persuasion, advice, and informal requests to guide commercial bank credit.\n2. Reason (R) is FALSE: Moral suasion does not carry statutory criminal penalties; it relies on moral influence, mutual understanding, and central bank prestige.\nHence, (A) is true but (R) is false (Option C)."
))

# 96. Balanced Budget Multiplier
opts, corr, sol = rotate_options(
    "1",
    [
        "0",
        "Infinity",
        "-1"
    ],
    "D",
    "1. The Balanced Budget Multiplier states that if government expenditure and tax revenue increase by the exact same amount (ΔG = ΔT), national income increases by an amount exactly equal to the change in government spending (ΔY = ΔG).\n2. Therefore, the Balanced Budget Multiplier is equal to 1.\nHence, Option {{CORR}} is correct.",
    "States Balanced Budget Multiplier equals 1."
)
add_q(make_question(CHAPTER, "Fiscal Policy", "What is the theoretical value of the 'Balanced Budget Multiplier' when government expenditure and taxes increase by the exact same amount (\\Delta G = \\Delta T)?", opts, corr, sol))

# 97. Numerical: Autonomous spending multiplier with tax rate
opts, corr, sol = rotate_options(
    "₹1,000 crore",
    [
        "₹800 crore",
        "₹1,500 crore",
        "₹2,000 crore"
    ],
    "A",
    "1. At equilibrium: S = I. S = -200 + 0.25Y, and I = ₹50 crore.\n2. -200 + 0.25Y = 50\n3. 0.25Y = 250 => Y = 250 / 0.25 = ₹1,000 crore.\nHence, Option {{CORR}} is correct.",
    "Calculates equilibrium income: Y = 250 / 0.25 = 1,000 crore."
)
add_q(make_question(CHAPTER, "Equilibrium Output", "Given saving function S = -200 + 0.25Y and planned investment I = ₹50 crore, what is the equilibrium level of national income?", opts, corr, sol))

# 98. Open Market Operations in Inflationary Gap
opts, corr, sol = rotate_options(
    "Sell government securities to absorb excess liquidity from commercial banks and the public",
    [
        "Purchase government securities to inject liquid cash into circulation",
        "Suspend all treasury bond auctions indefinitely",
        "Cancel all existing sovereign debt obligations"
    ],
    "B",
    "1. When the central bank sells government securities in the open market, commercial banks and institutional investors pay with bank reserves.\n2. This drains cash from bank vaults, reducing bank lending capacity and curbing excess aggregate demand.\nHence, Option {{CORR}} is correct.",
    "Explains selling securities absorbs liquidity during inflationary gap."
)
add_q(make_question(CHAPTER, "Monetary Policy", "How does the Central Bank execute 'Open Market Operations' (OMO) to rectify an Inflationary Gap?", opts, corr, sol))

# 99. Match Question: Propensity Relationships
add_q(make_match_question(
    CHAPTER,
    "Propensity Identities",
    "Match the mathematical conditions in List I with their corresponding economic truths in List II:",
    [
        ("A", "APC = 1"),
        ("B", "APC > 1"),
        ("C", "APS < 0"),
        ("D", "MPC + MPS = 1")
    ],
    [
        ("(I)", "Consumption exceeds national income (dissaving occurs)"),
        ("(II)", "Break-even point where saving is zero (C = Y)"),
        ("(III)", "Total change in income is completely accounted for by changes in C and S"),
        ("(IV)", "Negative average saving corresponding to C > Y")
    ],
    "A-(II), B-(I), C-(IV), D-(III)",
    [
        "A-(I), B-(II), C-(IV), D-(III)",
        "A-(II), B-(IV), C-(I), D-(III)",
        "A-(IV), B-(III), C-(II), D-(I)"
    ],
    "A",
    "1. APC = 1 at break-even point -> A-(II)\n2. APC > 1 when consumption exceeds income -> B-(I)\n3. APS < 0 when savings are negative -> C-(IV)\n4. MPC + MPS = 1 by identity -> D-(III)\nHence, Option A is correct."
))

# 100. Comprehensive Question: Core essence of Keynesian Revolution
opts, corr, sol = rotate_options(
    "Aggregate Demand is the primary driver of economic activity and employment in the short run, and capitalist economies do not automatically self-correct to full employment without state intervention",
    [
        "Supply creates its own demand under all economic conditions, rendering monetary policy useless",
        "Government budgets must always remain strictly balanced every calendar month",
        "Commercial banks create wealth exclusively through physical currency minting"
    ],
    "C",
    "1. The fundamental breakthrough of Keynesian macroeconomics over classical economics is that Aggregate Demand determines the level of employment and output in the short run. Deficiencies in aggregate demand can plunge economies into prolonged involuntary unemployment, necessitating active government fiscal and monetary intervention.\nHence, Option {{CORR}} is correct.",
    "Summarizes the fundamental Keynesian thesis: AD drives employment, markets do not automatically guarantee full employment."
)
add_q(make_question(CHAPTER, "Keynesian Framework", "What is the core foundational insight of Keynes' General Theory regarding the determination of income and employment?", opts, corr, sol))

# Verify count and uniqueness
assert len(questions) == 100, f"Expected 100 questions, got {len(questions)}"
print(f"Successfully generated {len(questions)} unique questions for Unit 8!")

out_path = "mock/eco_units/unit8.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
