import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.eco_generators.common import (
    make_question, rotate_options, normalize_text
)

questions = []
seen = set()

# Load all prior units to ensure global uniqueness across all eco questions
for u in [f"unit{i}.json" for i in range(1, 11)]:
    p = f"mock/eco_units/{u}"
    if os.path.exists(p):
        with open(p) as f:
            for q in json.load(f):
                seen.add(normalize_text(q["questionText"]))

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:80]}")
    seen.add(norm)
    questions.append(q)

print("Generating 40 Case-Study Passages (200 unique questions) for Economics...")

passages_data = []

# =================================================================================================
# 1. Microeconomics Passages (Passages 1 to 20)
# =================================================================================================

# Passage 1: Consumer Utility & Water-Diamond Paradox
passages_data.append((
    "Theory of Consumer Behaviour",
    "Consumer Equilibrium & Marginal Utility",
    (
        "Adam Smith famously observed that although water is essential for human life, it commands virtually zero market price, "
        "whereas diamonds are merely decorative luxury items yet command an extraordinarily high market price. "
        "The marginal utility revolution in economics resolved this classical paradox by distinguishing between total utility and marginal utility. "
        "The total utility derived from water is immense because life cannot exist without it; however, because water is abundantly available, "
        "its marginal utility (the utility derived from one additional glass of water) is exceedingly low. "
        "In contrast, diamonds are exceedingly scarce in supply, so their marginal utility remains very high. "
        "Since consumers in a competitive market determine their willingness to pay based on marginal utility rather than total utility, "
        "the market price of diamonds far exceeds the market price of water. At consumer equilibrium, the ratio of marginal utility to price "
        "must be equal across all consumed goods: MU_x / P_x = MU_y / P_y = MU_m."
    ),
    [
        (
            "According to the passage, which economic concept successfully resolved the classical Water-Diamond Paradox?",
            "The distinction between Total Utility and Marginal Utility",
            ["The classical labor theory of value", "The principle of absolute monarchical taxation", "The concept of statutory price ceilings"],
            "A",
            "1. As stated in the text, the marginal utility revolution resolved the paradox by differentiating between total utility and marginal utility.\nHence, Option {{CORR}} is correct.",
            "Identifies distinction between Total Utility and Marginal Utility."
        ),
        (
            "Why does water command a relatively low market price despite being essential for survival?",
            "Because water is abundantly available, making its marginal utility exceedingly low",
            ["Because water has zero total utility for human beings", "Because governments legally mandate water to be free of cost", "Because consumers experience zero satisfaction from drinking water"],
            "B",
            "1. The passage explains that because water is abundant, its marginal utility (utility of the last unit) is extremely low, and price reflects marginal utility.\nHence, Option {{CORR}} is correct.",
            "Explains water's low price is due to low marginal utility from abundance."
        ),
        (
            "What determines a consumer's willingness to pay a high market price for any commodity?",
            "The Marginal Utility derived from consuming an additional unit of the good",
            ["The total cumulative utility derived from all units consumed", "The historical cost incurred in mining or manufacturing the good", "The physical weight and volume of the commodity"],
            "C",
            "1. The passage states explicitly that consumers determine their willingness to pay based on marginal utility rather than total utility.\nHence, Option {{CORR}} is correct.",
            "Identifies Marginal Utility as the determinant of willingness to pay."
        ),
        (
            "Which mathematical condition represents consumer equilibrium in cardinal utility analysis for two goods X and Y?",
            "MU_x / P_x = MU_y / P_y = MU_m",
            ["MU_x × P_x = MU_y × P_y", "MU_x + MU_y = P_x + P_y", "P_x / MU_x = P_y / MU_y = 0"],
            "D",
            "1. Consumer equilibrium under cardinal utility requires per-rupee marginal utility to be equalized: MU_x / P_x = MU_y / P_y = MU_m.\nHence, Option {{CORR}} is correct.",
            "States the cardinal equilibrium condition MU_x / P_x = MU_y / P_y."
        ),
        (
            "What happens to the Marginal Utility of a commodity as its consumption increases progressively, according to the Law of Diminishing Marginal Utility?",
            "Marginal Utility continually decreases with every successive unit consumed",
            ["Marginal Utility continually increases at an accelerating rate", "Marginal Utility remains strictly constant at all consumption levels", "Marginal Utility immediately collapses to negative infinity"],
            "A",
            "1. The Law of Diminishing Marginal Utility dictates that as more and more units of a commodity are consumed, the marginal utility derived from each successive unit decreases.\nHence, Option {{CORR}} is correct.",
            "States Law of Diminishing Marginal Utility."
        )
    ]
))

# Passage 2: Indifference Curve Analysis & Consumer Optimum
passages_data.append((
    "Theory of Consumer Behaviour",
    "Indifference Curve Analysis",
    (
        "In modern microeconomics, ordinal utility analysis utilizes Indifference Curves (IC) to depict consumer preferences without "
        "requiring artificial numerical measurement of satisfaction. An indifference curve represents all combinations of two goods that "
        "yield the exact same level of total satisfaction to the consumer. Indifference curves slope downwards from left to right and are "
        "convex to the origin due to the Law of Diminishing Marginal Rate of Substitution (MRS_xy). "
        "The consumer's budget constraint is represented by the budget line P_x · X + P_y · Y = M, whose slope is given by the price ratio -(P_x / P_y). "
        "Consumer optimum is achieved at the point of tangency between the budget line and the highest attainable indifference curve, "
        "where the subjective rate of commodity substitution equals the market price ratio: MRS_xy = P_x / P_y, and the IC is strictly convex to the origin."
    ),
    [
        (
            "What does an Indifference Curve represent in consumer choice theory?",
            "All combinations of two goods that yield the exact same level of total satisfaction to the consumer",
            ["Combinations of goods that cost the exact same amount of money", "The maximum physical production capacity of two competing firms", "The total tax liability of a household across two income brackets"],
            "A",
            "1. An indifference curve is the locus of various combinations of two goods that provide equal total satisfaction or utility to the consumer.\nHence, Option {{CORR}} is correct.",
            "Defines Indifference Curve."
        ),
        (
            "Why are standard Indifference Curves convex to the origin?",
            "Due to the diminishing Marginal Rate of Substitution (MRS_xy)",
            ["Due to increasing marginal returns to scale", "Due to government price controls on staple commodities", "Due to constant opportunity costs across all consumption bundles"],
            "B",
            "1. As the consumer substitutes Good X for Good Y, the amount of Good Y they are willing to give up for an additional unit of X diminishes (Diminishing MRS_xy), giving the IC its convex shape.\nHence, Option {{CORR}} is correct.",
            "Explains convexity of IC due to diminishing MRS."
        ),
        (
            "What determines the slope of the consumer's Budget Line?",
            "The market price ratio of the two commodities (-P_x / P_y)",
            ["The consumer's marginal rate of technical substitution", "The level of national foreign exchange reserves", "The total utility derived from the consumption bundle"],
            "C",
            "1. The slope of the budget line is determined by the negative of the ratio of prices of the two goods: -(P_x / P_y).\nHence, Option {{CORR}} is correct.",
            "Identifies slope of budget line as price ratio."
        ),
        (
            "What are the two simultaneous conditions required for consumer equilibrium in Indifference Curve analysis?",
            "MRS_xy = P_x / P_y and the indifference curve must be convex to the origin at the tangency point",
            ["MRS_xy > P_x / P_y and the budget line must be concave", "Total expenditure must equal zero and MRS_xy must equal 1", "P_x / P_y = 0 and the indifference curve must intersect the axes"],
            "D",
            "1. Consumer equilibrium requires: (i) Tangency condition: MRS_xy = P_x / P_y, and (ii) Convexity condition: the IC must be convex to the origin at the point of tangency.\nHence, Option {{CORR}} is correct.",
            "States dual equilibrium conditions for ordinal utility."
        ),
        (
            "If a consumer receives an increase in money income while commodity prices remain unchanged, how does the Budget Line respond?",
            "It shifts parallelly outwards to the right",
            ["It rotates inward along the vertical axis", "It shifts parallelly inwards to the left", "Its slope becomes vertical"],
            "A",
            "1. An increase in money income with constant prices allows the consumer to purchase more of both goods, shifting the budget line parallelly outwards without altering its slope.\nHence, Option {{CORR}} is correct.",
            "Explains parallel rightward shift of budget line with income increase."
        )
    ]
))

# Passage 3: Price Elasticity of Demand & Airline Revenue
passages_data.append((
    "Theory of Consumer Behaviour",
    "Price Elasticity of Demand",
    (
        "Commercial airline companies practice sophisticated price discrimination based on Price Elasticity of Demand (PED). "
        "Business travelers typically exhibit price-inelastic demand (|e_d| < 1) because corporate meetings have urgent, fixed deadlines "
        "and flight expenses are funded by corporate employers rather than personal budgets. If an airline raises last-minute ticket prices "
        "by 20%, business bookings fall by only 5%, leading to an increase in total passenger revenue. "
        "In sharp contrast, vacation and leisure travelers exhibit highly price-elastic demand (|e_d| > 1) because holiday trips are planned months "
        "in advance and travelers have viable alternatives like trains, buses, or alternate destinations. A 20% price hike on vacation routes causes "
        "a 35% drop in bookings, causing total revenue to collapse. Therefore, airlines maximize profits by offering steep advance discounts to leisure travelers "
        "while charging premium fares for last-minute business bookings."
    ),
    [
        (
            "Why do business travelers exhibit relatively price-inelastic demand for airline tickets?",
            "Because business travel is urgent with strict deadlines and tickets are paid by corporate expense accounts",
            ["Because business travelers have infinite leisure time to postpone trips", "Because airline tickets are free of cost for all corporate managers", "Because trains travel faster than commercial jet airliners"],
            "A",
            "1. The passage explains that business travelers face fixed meeting deadlines and corporate funding, making them insensitive to price increases (|e_d| < 1).\nHence, Option {{CORR}} is correct.",
            "Identifies reasons for inelastic demand among business travelers."
        ),
        (
            "If an airline raises ticket fares by 20% and passenger demand falls by 5%, what is the Price Elasticity of Demand (PED)?",
            "0.25",
            ["4.00", "1.00", "0.05"],
            "B",
            "1. PED = % change in quantity demanded / % change in price = 5% / 20% = 0.25.\n2. Since 0.25 < 1, demand is price inelastic.\nHence, Option {{CORR}} is correct.",
            "Calculates PED = 5 / 20 = 0.25."
        ),
        (
            "When demand for a product is price-inelastic (|e_d| < 1), what happens to total revenue when the seller raises the price?",
            "Total revenue increases",
            ["Total revenue decreases", "Total revenue remains strictly unchanged", "Total revenue collapses to zero"],
            "C",
            "1. Under the Total Outlay / Revenue method, when demand is inelastic, price and total revenue move in the same direction. A price increase increases total revenue because the % gain in price exceeds the % loss in quantity.\nHence, Option {{CORR}} is correct.",
            "Explains total revenue increases when price rises under inelastic demand."
        ),
        (
            "What happens to total revenue when an airline raises fares on leisure vacation routes where demand is price-elastic (|e_d| > 1)?",
            "Total revenue collapses because the percentage reduction in ticket sales exceeds the percentage increase in price",
            ["Total revenue doubles automatically", "Total revenue is unaffected because tourists are wealthy", "Total revenue becomes equal to marginal cost"],
            "D",
            "1. When demand is elastic (|e_d| > 1), a price hike causes a proportionately larger reduction in quantity demanded (%ΔQ > %ΔP), causing total revenue (P × Q) to fall.\nHence, Option {{CORR}} is correct.",
            "Explains total revenue falls when price rises under elastic demand."
        ),
        (
            "Which pricing strategy enables airlines to maximize revenue across distinct consumer segments?",
            "Price discrimination by charging higher fares to inelastic business travelers and lower fares to elastic leisure travelers",
            ["Charging identical flat fares to all passengers regardless of booking time", "Selling tickets exclusively via government ration shops", "Banning business travelers from booking morning flights"],
            "A",
            "1. As stated in the passage, airlines practice price discrimination based on differences in price elasticity to maximize total revenue.\nHence, Option {{CORR}} is correct.",
            "Identifies price discrimination based on differing elasticities."
        )
    ]
))

# Passage 4: Cross Price Elasticity & Automobile Industry
passages_data.append((
    "Theory of Consumer Behaviour",
    "Cross Elasticity of Demand",
    (
        "Cross Price Elasticity of Demand (E_xy) measures the percentage change in the quantity demanded of Good X in response to a percentage change "
        "in the price of Good Y. In the automotive market, petrol-driven cars and petrol fuel are complementary goods: they must be consumed jointly. "
        "When global crude oil prices surge and petrol becomes expensive, the operating cost of petrol cars escalates, shifting the demand curve for petrol cars "
        "to the left. The cross elasticity between complementary goods is strictly negative (E_xy < 0). "
        "Simultaneously, electric vehicles (EVs) serve as substitute goods for petrol vehicles. As petrol prices skyrocket, consumers seek cost-effective "
        "substitutes, triggering a surge in the demand for electric vehicles. The cross elasticity of demand between substitute goods is strictly positive (E_xy > 0). "
        "Understanding these cross-price dynamics is essential for automakers planning production capacity."
    ),
    [
        (
            "What is the mathematical sign of the Cross Price Elasticity of Demand between complementary goods?",
            "Negative (E_xy < 0)",
            ["Positive (E_xy > 0)", "Zero (E_xy = 0)", "Infinite"],
            "A",
            "1. For complementary goods (like cars and petrol), an increase in the price of one good leads to a decline in the demand for the other, yielding a negative cross elasticity.\nHence, Option {{CORR}} is correct.",
            "Identifies negative cross elasticity for complements."
        ),
        (
            "Why is the Cross Price Elasticity of Demand between Electric Vehicles (EVs) and petrol cars positive?",
            "Because EVs and petrol cars are substitute goods; an increase in the price of petrol cars or fuel increases the demand for EVs",
            ["Because EVs cannot be driven on public highways", "Because consumers must buy an EV and a petrol car together", "Because battery manufacturing costs are zero"],
            "B",
            "1. For substitute goods, consumers switch away from the costlier good to the alternative, establishing a direct relationship between the price of one and the demand for the other (positive cross elasticity).\nHence, Option {{CORR}} is correct.",
            "Explains positive cross elasticity for substitutes."
        ),
        (
            "What will happen to the demand curve for petrol cars if petrol prices experience a sharp, sustained increase?",
            "The demand curve for petrol cars will shift to the left",
            ["The demand curve for petrol cars will shift to the right", "There will be an upward movement along the unchanged demand curve", "The demand curve will become completely horizontal"],
            "C",
            "1. A rise in the price of a complementary good (petrol) reduces the attractiveness of owning petrol cars, causing the entire demand curve for petrol cars to shift leftward.\nHence, Option {{CORR}} is correct.",
            "Shows leftward shift in demand for complement."
        ),
        (
            "If tea and coffee have a cross elasticity of demand of +1.5, what does this numerical value indicate?",
            "Tea and coffee are close substitutes; a 10% increase in the price of coffee leads to a 15% increase in the demand for tea",
            ["Tea and coffee are complementary goods that must be mixed together", "A 10% increase in coffee price causes a 15% fall in tea sales", "Tea and coffee have zero economic relationship"],
            "D",
            "1. E_xy = +1.5 > 0 indicates substitute goods. %ΔQ_tea = E_xy × %ΔP_coffee = 1.5 × 10% = +15%.\nHence, Option {{CORR}} is correct.",
            "Interprets cross elasticity of +1.5 as close substitutes."
        ),
        (
            "If two goods X and Y have a Cross Price Elasticity of Demand equal to zero (E_xy = 0), what does it signify?",
            "The two goods are completely unrelated in consumption",
            ["The two goods are perfect substitutes", "The two goods are essential joint complements", "Both goods violate the law of demand"],
            "A",
            "1. A cross elasticity of zero indicates that a change in the price of one good has no effect whatsoever on the demand for the other (e.g., shoes and apples); the goods are completely unrelated.\nHence, Option {{CORR}} is correct.",
            "Defines zero cross elasticity as unrelated goods."
        )
    ]
))

# Passage 5: Normal, Inferior, and Giffen Goods
passages_data.append((
    "Theory of Consumer Behaviour",
    "Income Elasticity & Types of Goods",
    (
        "Economists categorize commodities into normal goods, inferior goods, and Giffen goods based on consumer responsiveness to income and price changes. "
        "A normal good is one whose demand increases as consumer income rises (positive income elasticity, E_y > 0), such as branded apparel and organic foods. "
        "An inferior good is one whose demand declines as consumer income rises (negative income elasticity, E_y < 0), because consumers substitute away from "
        "low-quality staples (like coarse cereals or public bus transit) toward superior alternatives as their purchasing power grows. "
        "A special, extreme subset of inferior goods is the Giffen Good (named after Sir Robert Giffen). In 19th-century Ireland, when the price of potatoes "
        "(the primary staple food of poor peasants) rose steeply, impoverished households could no longer afford meat or milk. To avoid starvation, they "
        "cut meat consumption completely and bought even more potatoes despite the higher price! Thus, Giffen goods violate the Law of Demand: their demand "
        "curve slopes upwards because the negative income effect of a price rise overwhelms the substitution effect."
    ),
    [
        (
            "What is the defining characteristic of a 'Normal Good' in terms of Income Elasticity of Demand?",
            "It has a positive Income Elasticity of Demand (E_y > 0); demand rises as income rises",
            ["It has a negative Income Elasticity of Demand (E_y < 0)", "Its demand is completely unaffected by consumer income", "It has an income elasticity of negative infinity"],
            "A",
            "1. For normal goods, consumer income and quantity demanded move in the same direction, yielding a positive income elasticity (E_y > 0).\nHence, Option {{CORR}} is correct.",
            "Defines normal goods by positive income elasticity."
        ),
        (
            "Why does the demand for an 'Inferior Good' fall when a consumer's income increases?",
            "Because consumers afford higher quality substitutes and abandon the low-quality staple",
            ["Because inferior goods become physically defective when consumer wealth expands", "Because the government imposes luxury taxes on all inferior goods", "Because sellers refuse to supply inferior goods to high-income shoppers"],
            "B",
            "1. When consumer purchasing power increases, individuals substitute away from low-quality necessities (coarse grains) toward superior products, reducing inferior good demand.\nHence, Option {{CORR}} is correct.",
            "Explains inverse relationship between income and inferior good demand."
        ),
        (
            "What distinguishes a 'Giffen Good' from a standard inferior good?",
            "In a Giffen good, the negative income effect outweighs the substitution effect, causing demand to rise when its price rises",
            ["A Giffen good is a luxury status symbol consumed only by billionaires", "A Giffen good has a perfectly horizontal demand curve", "A Giffen good can only be manufactured by public sector enterprises"],
            "C",
            "1. While all Giffen goods are inferior, what makes them unique is that the negative income effect of a price hike is so massive that it overpowers the substitution effect, causing quantity demanded to rise when price rises (upward-sloping demand curve).\nHence, Option {{CORR}} is correct.",
            "Explains Giffen good exception where negative income effect outweighs substitution effect."
        ),
        (
            "Which of the following describes the shape of the Demand Curve for a Giffen Good?",
            "It slopes upwards from left to right, representing a direct relationship between price and quantity demanded",
            ["It slopes downwards from left to right conforming to the Law of Demand", "It is a rectangular hyperbola asymptotic to both axes", "It is a vertical line with zero elasticity"],
            "D",
            "1. Because a Giffen good violates the Law of Demand (higher price leads to higher quantity demanded), its demand curve possesses an anomalous positive slope (upward sloping).\nHence, Option {{CORR}} is correct.",
            "Identifies upward-sloping demand curve for Giffen goods."
        ),
        (
            "Which historical event famously exemplified the Giffen Good phenomenon?",
            "The Irish Potato Famine where impoverished peasants bought more potatoes as potato prices rose",
            ["The 1929 Wall Street stock market collapse", "The 1970s OPEC crude oil supply embargo", "The tulip mania speculation in 17th-century Holland"],
            "A",
            "1. The Irish Potato Famine observed by Sir Robert Giffen is the textbook historical example where poor families consumed more potatoes despite price increases because they could not afford meat.\nHence, Option {{CORR}} is correct.",
            "References the Irish Potato Famine example of Giffen good."
        )
    ]
))

# Passage 6: Law of Variable Proportions in Manufacturing
passages_data.append((
    "Production and Costs",
    "Law of Variable Proportions",
    (
        "A garment manufacturing factory operates in the short run with a fixed stock of 20 sewing machines and a fixed factory shed, "
        "while hiring additional variable tailor labor. The factory's production behavior is governed by the Law of Variable Proportions: "
        "as successive units of a variable factor (tailors) are combined with fixed capital, total product (TP) initially increases at an increasing rate, "
        "then increases at a diminishing rate, reaches a maximum, and eventually declines. "
        "In Stage I (Increasing Returns to Factor), Marginal Product (MP) rises and reaches its peak, ending where MP = AP (Average Product is at its maximum). "
        "In Stage II (Diminishing Returns to Factor), both MP and AP fall, but MP remains positive; this stage concludes when MP falls to zero and TP reaches its maximum. "
        "In Stage III (Negative Returns to Factor), excessive overcrowding causes tailors to obstruct each other, driving MP negative and causing TP to contract. "
        "A rational producer will always operate within Stage II, because Stage I leaves fixed capital underutilized while Stage III wastes variable labor."
    ),
    [
        (
            "What is the defining premise of the 'Law of Variable Proportions'?",
            "It operates in the short run where one or more factors of production remain fixed while other factors are varied",
            ["It operates exclusively in the long run where all factors are variable", "It applies only to financial assets traded on the stock exchange", "It assumes that technology improves continuously every hour"],
            "A",
            "1. The Law of Variable Proportions is a short-run production law where fixed factors (e.g., machinery) are combined with variable factors (e.g., labor).\nHence, Option {{CORR}} is correct.",
            "Identifies short-run fixed vs variable factor premise."
        ),
        (
            "At what point does Stage I (Increasing Returns) of production terminate?",
            "Where Average Product (AP) reaches its maximum and equals Marginal Product (MP = AP)",
            ["Where Marginal Product equals zero and Total Product peaks", "Where Total Product becomes negative", "Where Marginal Product reaches its absolute maximum"],
            "B",
            "1. Stage I ends at the point where Average Product reaches its peak, which coincides with the intersection point where MP = AP.\nHence, Option {{CORR}} is correct.",
            "Identifies end of Stage I at max AP where MP = AP."
        ),
        (
            "What happens to Total Product (TP) and Marginal Product (MP) in Stage II (Diminishing Returns)?",
            "Total Product increases at a diminishing rate while Marginal Product declines but remains positive",
            ["Total Product declines while Marginal Product turns negative", "Total Product increases at an increasing rate while MP rises", "Total Product remains constant while MP is infinite"],
            "C",
            "1. In Stage II, MP is falling but still greater than zero, meaning each additional worker still adds to output; therefore, TP increases at a decreasing rate.\nHence, Option {{CORR}} is correct.",
            "Characterizes Stage II: TP rises at diminishing rate, MP falls but is positive."
        ),
        (
            "Why does a rational producer choose to operate strictly within Stage II of production?",
            "Because Stage I leaves fixed machines underutilized while Stage III incurs negative returns on extra labor",
            ["Because Stage II guarantees zero production costs", "Because statutory labor laws prohibit operating in Stage I", "Because Total Product is lowest in Stage II"],
            "D",
            "1. In Stage I, fixed capacity is under-exploited (MP > AP). In Stage III, extra workers reduce total output (MP < 0). Only in Stage II are both fixed and variable factors utilized rationally to maximize profits.\nHence, Option {{CORR}} is correct.",
            "Explains why Stage II is the rational economic stage of production."
        ),
        (
            "What is the mathematical value of Marginal Product (MP) when Total Product (TP) reaches its absolute maximum?",
            "MP = 0",
            ["MP = 1", "MP is at its peak", "MP = AP"],
            "A",
            "1. Marginal Product is the slope of the Total Product curve (dTP / dL). When TP reaches its maximum, the slope is zero, meaning MP = 0.\nHence, Option {{CORR}} is correct.",
            "States MP = 0 when TP is at maximum."
        )
    ]
))

# Passage 7: Cost Curves & The Law of Costs
passages_data.append((
    "Production and Costs",
    "Short-Run Cost Curves",
    (
        "In the short run, a firm's total costs are divided into Total Fixed Costs (TFC) and Total Variable Costs (TVC), such that TC = TFC + TVC. "
        "Total Fixed Cost remains constant regardless of output level (depicted as a horizontal line parallel to the output axis). "
        "Consequently, Average Fixed Cost (AFC = TFC / Q) continually declines as output expands, forming a rectangular hyperbola that approaches "
        "both axes asymptotically without ever touching them. "
        "Average Total Cost (ATC) and Average Variable Cost (AVC) curves are U-shaped due to the Law of Variable Proportions. "
        "Because ATC = AFC + AVC, the vertical distance between ATC and AVC equals AFC. As output expands, AFC diminishes towards zero, causing "
        "the ATC and AVC curves to draw closer together, although they never intersect because AFC is always strictly positive. "
        "The Marginal Cost (MC) curve cuts both the AVC and ATC curves from below at their respective minimum points."
    ),
    [
        (
            "What geometric shape does the Average Fixed Cost (AFC) curve exhibit in short-run cost diagrams?",
            "A Rectangular Hyperbola that continually declines toward both axes without touching them",
            ["An inverted U-shaped curve that peaks at moderate output", "A horizontal straight line parallel to the output axis", "A vertical straight line perpendicular to the cost axis"],
            "A",
            "1. AFC = TFC / Q. Since TFC is a positive constant, the product AFC × Q = TFC is constant at all points, geometrically defining a rectangular hyperbola.\nHence, Option {{CORR}} is correct.",
            "Identifies AFC curve as a rectangular hyperbola."
        ),
        (
            "Why do the Average Total Cost (ATC) and Average Variable Cost (AVC) curves never intersect each other?",
            "Because the vertical distance between them is Average Fixed Cost (AFC), which is always strictly positive",
            ["Because variable costs exceed fixed costs at every output level", "Because marginal costs prevent them from touching", "Because firms are legally required to separate accounting ledgers"],
            "B",
            "1. ATC - AVC = AFC. Since TFC > 0 at all positive output levels, AFC can never be zero; therefore, ATC and AVC get closer and closer but never intersect.\nHence, Option {{CORR}} is correct.",
            "Explains why ATC and AVC never touch (AFC > 0 always)."
        ),
        (
            "At which points does the Marginal Cost (MC) curve intersect the Average Variable Cost (AVC) and Average Total Cost (ATC) curves?",
            "It cuts both AVC and ATC from below at their respective minimum points",
            ["It cuts AVC at its maximum and ATC at its minimum", "It cuts both curves at their vertical axis intercepts", "It runs parallel above both curves without intersecting"],
            "C",
            "1. By mathematical property of averages and margins, whenever marginal cost is below average cost, it pulls the average down; when above, it pulls it up. Therefore, MC must intersect both AVC and ATC at their minimum points from below.\nHence, Option {{CORR}} is correct.",
            "States MC cuts AVC and ATC at their minimum points."
        ),
        (
            "Why are short-run Average Variable Cost (AVC) and Average Total Cost (ATC) curves U-shaped?",
            "Due to the operation of the Law of Variable Proportions (initial increasing returns followed by diminishing returns)",
            ["Due to constant changes in government corporate tax rates", "Due to inflationary fluctuations in international commodity prices", "Due to shifts in consumer demand curves"],
            "D",
            "1. The U-shape of short-run average cost curves is the direct mirror image of productivity: as productivity rises in Stage I, average costs fall; as diminishing returns set in during Stage II, average costs rise.\nHence, Option {{CORR}} is correct.",
            "Attributes U-shaped cost curves to Law of Variable Proportions."
        ),
        (
            "If a firm temporarily produces zero output in the short run, what happens to its Total Cost (TC)?",
            "Total Cost equals Total Fixed Cost (TC = TFC > 0) because fixed contractual obligations must still be paid",
            ["Total Cost falls to absolute zero", "Total Cost becomes negative", "Total Cost equals Total Variable Cost"],
            "A",
            "1. When Q = 0, TVC = 0. Therefore, TC = TFC + 0 = TFC. Even if a factory produces zero output, rent, property taxes, and permanent staff salaries must still be paid.\nHence, Option {{CORR}} is correct.",
            "Explains TC = TFC when output is zero in short run."
        )
    ]
))

# Passage 8: Perfect Competition & Competitive Price Taker
passages_data.append((
    "Theory of Firm under Perfect Competition",
    "Perfect Competition Characteristics",
    (
        "A perfectly competitive market represents the benchmark of economic efficiency in microeconomics. It is characterized by an exceptionally "
        "large number of buyers and sellers, such that no individual market participant possesses the market power to influence the market price. "
        "All firms produce completely homogeneous (identical) goods, ensuring that consumers have zero brand preference. "
        "There is complete freedom of entry and exit of firms in the long run, and buyers and sellers enjoy perfect knowledge of market conditions. "
        "Because an individual firm is a pure 'price taker', it takes the market equilibrium price P* determined by industry-wide demand and supply as given. "
        "Consequently, the demand curve facing a single firm is perfectly elastic (a horizontal straight line), where Price = Average Revenue = Marginal Revenue (P = AR = MR). "
        "In the short run, a firm maximizes profit by producing where MR = MC and MC is rising. In the long run, free entry and exit drives economic profits to zero, "
        "guaranteeing P = AR = MR = MC = minimum ATC."
    ),
    [
        (
            "Why is an individual firm under Perfect Competition described as a 'Price Taker'?",
            "Because its individual output is so infinitesimal compared to total market supply that it cannot influence the market price",
            ["Because the firm is owned and operated directly by the central government", "Because the firm colludes with industry rivals to set prices", "Because the firm advertises heavily to manipulate consumer preferences"],
            "A",
            "1. In perfect competition, each firm produces a negligible fraction of total industry output, so altering its own supply has no perceptible effect on market price.\nHence, Option {{CORR}} is correct.",
            "Explains why competitive firm is a price taker."
        ),
        (
            "What is the shape and elasticity of the Demand Curve facing an individual firm under Perfect Competition?",
            "A horizontal straight line parallel to the quantity axis with infinite price elasticity (E_d = ∞)",
            ["A downward sloping curve with unit price elasticity", "A vertical straight line with zero price elasticity", "A rectangular hyperbola with constant outlay"],
            "B",
            "1. Because the firm can sell any quantity at the given market price P*, its individual demand curve is perfectly elastic (horizontal), meaning E_d = ∞.\nHence, Option {{CORR}} is correct.",
            "Identifies horizontal perfectly elastic demand curve for competitive firm."
        ),
        (
            "What is the relationship between Price (P), Average Revenue (AR), and Marginal Revenue (MR) for a price-taking firm?",
            "P = AR = MR at all levels of output",
            ["P > AR > MR", "MR < AR at all positive output levels", "P = AR, but MR is zero"],
            "C",
            "1. Since price is constant for every unit sold, additional revenue from selling one more unit (MR) equals the price of that unit, which also equals average revenue: P = AR = MR.\nHence, Option {{CORR}} is correct.",
            "States P = AR = MR identity under perfect competition."
        ),
        (
            "What ensures that perfectly competitive firms earn only Normal Profit (Zero Economic Profit) in the long run?",
            "Freedom of entry and exit of firms in the industry",
            ["Statutory government price ceilings", "High advertising expenditure", "Exclusive patent protections held by incumbents"],
            "D",
            "1. If firms earn abnormal supernormal profits, new firms freely enter, increasing market supply and lowering price. If firms suffer losses, existing firms exit, reducing supply and raising price until economic profit is zero (normal profit).\nHence, Option {{CORR}} is correct.",
            "Explains free entry/exit eliminates abnormal profits in long run."
        ),
        (
            "At what point should a competitive firm shut down its operations immediately in the short run?",
            "When market price falls below the minimum Average Variable Cost (P < AVC)",
            ["When market price falls below Average Total Cost (P < ATC)", "When total revenue equals total fixed costs", "When marginal cost equals zero"],
            "A",
            "1. The short-run shutdown condition is P < AVC. If price cannot even cover variable operating costs (fuel, wages, raw materials), the firm minimizes losses by producing zero output rather than incurring operating losses on top of fixed costs.\nHence, Option {{CORR}} is correct.",
            "States short-run shutdown condition P < AVC."
        )
    ]
))

# Passage 9: Monopoly & Price Discrimination
passages_data.append((
    "Non-Competitive Markets",
    "Monopoly Market Structure",
    (
        "A Monopoly represents the opposite extreme of perfect competition. In a monopoly, a single firm is the sole producer of a product "
        "for which there are no close substitutes, shielded by formidable barriers to entry such as legal patents, government franchises, or control of natural resources. "
        "Because the monopolist is the entire industry, the firm faces the downward-sloping market demand curve (Average Revenue curve). "
        "To sell an additional unit of output, the monopolist must reduce the price on all units sold; consequently, Marginal Revenue lies strictly below "
        "Average Revenue (MR < AR). Profit maximization occurs where MR = MC and MC cuts MR from below. "
        "Monopolists often engage in Price Discrimination—charging different prices to different consumer groups for the exact same commodity. "
        "For third-degree price discrimination to be profitable, the monopolist must maintain separated markets with no possibility of resale (arbitrage) "
        "and different price elasticities of demand across markets, charging higher prices in the market with less elastic demand."
    ),
    [
        (
            "What is the relationship between Average Revenue (AR) and Marginal Revenue (MR) under a Monopoly?",
            "Marginal Revenue lies strictly below Average Revenue (MR < AR) at all positive output levels",
            ["Marginal Revenue is identical to Average Revenue (MR = AR)", "Marginal Revenue lies strictly above Average Revenue (MR > AR)", "Marginal Revenue is a horizontal straight line"],
            "A",
            "1. To sell more units, a monopolist must lower the price on all units. Therefore, the addition to total revenue from the last unit (MR) is less than the price charged for that unit (AR), so MR < AR.\nHence, Option {{CORR}} is correct.",
            "Explains MR < AR in monopoly."
        ),
        (
            "What essential condition must exist between two distinct consumer markets for Price Discrimination to be feasible and profitable?",
            "The price elasticity of demand must differ between the two separated markets, with zero possibility of resale",
            ["Both markets must possess identical linear demand curves", "The government must subsidize production in both markets", "Both markets must trade using physical gold currency"],
            "B",
            "1. For successful price discrimination, markets must be separated to prevent arbitrage (buying cheap in market 1 and reselling in market 2), and the elasticity of demand must be different so the monopolist can charge higher prices where demand is less elastic.\nHence, Option {{CORR}} is correct.",
            "Identifies conditions for price discrimination: differing elasticities and prevention of arbitrage."
        ),
        (
            "In which sub-market will a price-discriminating monopolist charge a higher price?",
            "In the sub-market where consumer demand is relatively price-inelastic (|e_d| < 1)",
            ["In the sub-market where consumer demand is perfectly elastic (|e_d| = ∞)", "In the sub-market where consumers have the lowest incomes", "In the sub-market with the largest number of competing substitute goods"],
            "C",
            "1. By the pricing formula P = MC / [1 - (1/|e_d|)], higher prices are charged in markets where consumers are less sensitive to price changes (inelastic demand), while lower prices are charged in elastic markets.\nHence, Option {{CORR}} is correct.",
            "Explains higher price charged in inelastic market segment."
        ),
        (
            "Why do monopolists earn sustained supernormal (abnormal) economic profits even in the long run?",
            "Because formidable barriers to entry prevent new rival firms from entering the market",
            ["Because monopolists face zero marginal costs of production", "Because monopolists are exempt from paying corporate income taxes", "Because consumer demand for monopoly goods is infinitely elastic"],
            "D",
            "1. Unlike perfect competition where free entry drives profits to zero, monopolies are protected by insurmountable barriers to entry (patents, legal licenses, high capital costs), enabling permanent supernormal profits in the long run.\nHence, Option {{CORR}} is correct.",
            "Explains long-run monopoly profit sustained by barriers to entry."
        ),
        (
            "At what output level does a profit-maximizing monopolist achieve equilibrium?",
            "Where Marginal Revenue equals Marginal Cost (MR = MC) and MC is rising",
            ["Where Average Revenue equals Average Total Cost", "Where Total Revenue is zero", "Where Price equals Marginal Cost"],
            "A",
            "1. The universal profit maximization condition for any firm (including a monopolist) is MR = MC, provided MC cuts MR from below.\nHence, Option {{CORR}} is correct.",
            "States MR = MC equilibrium condition for monopoly."
        )
    ]
))

# Passage 10: Monopolistic Competition & Selling Costs
passages_data.append((
    "Non-Competitive Markets",
    "Monopolistic Competition",
    (
        "Monopolistic Competition, pioneered by Edward Chamberlin, describes market structures where many competing firms sell products that are "
        "differentiated rather than identical (e.g., soaps, shampoos, toothpaste, apparel). "
        "Product differentiation may be real (differences in chemical composition, fragrance, durability) or imaginary (cultivated via brand imagery and packaging). "
        "Because each brand is somewhat unique, each firm possesses a degree of monopoly power over its loyal customers, giving its demand curve a negative slope. "
        "However, because close substitutes abound, the demand curve is highly price-elastic. "
        "A hallmark feature of monopolistic competition is the existence of heavy Selling Costs—expenditures incurred on advertising, celebrity endorsements, "
        "and promotional campaigns to persuade buyers to shift their allegiance to a particular brand. "
        "In the long run, free entry and exit of firms erodes supernormal profits, leaving firms earning only normal profits at the point of tangency between "
        "the AR curve and the downward-sloping segment of the LAC curve, resulting in persistent 'Excess Capacity' (underutilization of plant scale)."
    ),
    [
        (
            "What is the most defining characteristic of 'Monopolistic Competition' that distinguishes it from Perfect Competition?",
            "Product Differentiation among competing brands",
            ["Homogeneity of all physical products across sellers", "A single monopoly seller controlling the national market", "Complete absence of advertising and promotional spending"],
            "A",
            "1. The core feature distinguishing monopolistic competition from perfect competition is Product Differentiation—goods are close substitutes but differentiated by branding, packaging, design, or quality.\nHence, Option {{CORR}} is correct.",
            "Identifies product differentiation as defining feature."
        ),
        (
            "Why do firms in Monopolistic Competition incur massive 'Selling Costs' (advertising expenditures)?",
            "To promote brand awareness, persuade consumers, and shift consumer preference in favor of their differentiated product",
            ["To pay statutory customs duties on raw material imports", "To eliminate all fixed capital equipment in the factory", "To comply with central bank reserve ratio mandates"],
            "B",
            "1. Selling costs are incurred not to produce goods, but to stimulate demand and persuade buyers to purchase a specific differentiated brand over rivals.\nHence, Option {{CORR}} is correct.",
            "Explains role of selling costs in monopolistic competition."
        ),
        (
            "What is meant by 'Excess Capacity' in Monopolistic Competition in the long run?",
            "Firms produce at an output level below the minimum point of their Long-Run Average Cost (LAC) curve, leaving plant capacity underutilized",
            ["Firms produce more output than what the physical factory can hold", "Warehouses overflow with unsold perishable agricultural crops", "Firms employ double the number of workers required by law"],
            "C",
            "1. In the long run, the downward-sloping AR curve is tangent to the falling portion of the LAC curve. Output is therefore less than the optimum scale (minimum LAC), representing unutilized excess productive capacity.\nHence, Option {{CORR}} is correct.",
            "Defines excess capacity as production below minimum LAC."
        ),
        (
            "How does the price elasticity of demand facing a monopolistically competitive firm compare to that of a pure monopolist?",
            "It is significantly more price-elastic because numerous close substitutes are available in the market",
            ["It is completely inelastic (|e_d| = 0)", "It is identical to the pure monopoly demand curve", "It is perfectly inelastic and vertical"],
            "D",
            "1. Because a monopolistically competitive firm faces intense rivalry from many close substitutes (e.g., Colgate vs Pepsodent), its demand curve is much flatter and more elastic than a pure monopolist's demand curve.\nHence, Option {{CORR}} is correct.",
            "Explains high price elasticity due to close substitutes."
        ),
        (
            "What type of economic profit do firms in Monopolistic Competition earn in the long run?",
            "Normal Profit (Zero Economic Profit) due to free entry and exit of firms",
            ["Permanent supernormal profits protected by high entry barriers", "Perpetual economic losses covered by government bailouts", "Zero revenue and zero output"],
            "A",
            "1. Just like perfect competition, freedom of entry and exit in the long run eliminates abnormal profits, leaving firms earning only normal profits (P = LAC).\nHence, Option {{CORR}} is correct.",
            "Identifies normal profit in long run under monopolistic competition."
        )
    ]
))

# Passage 11: Oligopoly & Kinked Demand Curve
passages_data.append((
    "Non-Competitive Markets",
    "Oligopoly & Price Rigidity",
    (
        "Oligopoly is a market structure dominated by a small number of large firms that produce either homogeneous goods (e.g., crude oil, cement) "
        "or differentiated goods (e.g., automobiles, telecommunications). The hallmark of oligopoly is mutual strategic interdependence: "
        "any pricing or advertising decision made by one firm directly impacts rivals, provoking retaliatory reactions. "
        "To explain the observed phenomenon of 'Price Rigidity' (sticky prices) in non-collusive oligopolies, Paul Sweezy formulated the Kinked Demand Curve model. "
        "Under this hypothesis, an oligopolist expects an asymmetric response from competitors: "
        "if the firm raises its price, rivals will NOT follow, causing the price-raising firm to lose a massive share of sales (highly elastic upper segment). "
        "Conversely, if the firm cuts its price, all rivals will immediately match the price cut to prevent losing customers, triggering a price war with negligible sales gain (highly inelastic lower segment). "
        "Because of this kink at the prevailing price P*, the corresponding Marginal Revenue (MR) curve exhibits a vertical discontinuity (gap). "
        "Any shift in Marginal Cost within this vertical gap does not change the profit-maximizing price or output, cementing price rigidity."
    ),
    [
        (
            "What is the most fundamental defining characteristic of an 'Oligopoly' market structure?",
            "Mutual Strategic Interdependence among a small number of large competing firms",
            ["Presence of millions of infinitesimal price-taking sellers", "Complete absence of barriers to new firm entry", "Production of goods with zero cross elasticity of demand"],
            "A",
            "1. In an oligopoly, because each firm controls a significant share of the market, every strategic move (price, output, advertising) elicits counter-moves from rivals (strategic interdependence).\nHence, Option {{CORR}} is correct.",
            "Identifies strategic interdependence as hallmark of oligopoly."
        ),
        (
            "According to Paul Sweezy's Kinked Demand Curve hypothesis, what reaction does a firm expect from rivals if it increases its price?",
            "Rivals will NOT follow the price increase, causing the firm to lose substantial market share",
            ["Rivals will immediately double their prices", "Rivals will exit the industry permanently", "Rivals will merge into a state-owned enterprise"],
            "B",
            "1. The upper portion of the kinked demand curve is highly elastic because rivals will ignore a price increase, capturing the defecting customers of the firm that raised prices.\nHence, Option {{CORR}} is correct.",
            "Explains asymmetric reaction to price increase (rivals do not follow)."
        ),
        (
            "What reaction does an oligopoly firm expect from rivals if it reduces its price below the prevailing price?",
            "All rivals will immediately match the price cut to protect their market share, preventing any major sales expansion",
            ["Rivals will raise their prices to absorb profits", "Rivals will shut down their production facilities", "Rivals will file patent infringement lawsuits"],
            "C",
            "1. The lower portion of the demand curve is inelastic because rivals immediately match any price cut to protect their sales, blunting the price-cutter's gains.\nHence, Option {{CORR}} is correct.",
            "Explains rivals match price cuts, making lower segment inelastic."
        ),
        (
            "Why does the Marginal Revenue (MR) curve have a vertical discontinuity (gap) in the Kinked Demand model?",
            "Due to the sharp difference in elasticity between the upper elastic segment and lower inelastic segment at the kink",
            ["Because the firm operates with zero total fixed costs", "Because statutory price controls create an artificial price ceiling", "Because consumers refuse to purchase goods on weekends"],
            "D",
            "1. A sharp change in slope (kink) on the Average Revenue curve causes a mathematical jump or discontinuity in the corresponding Marginal Revenue curve at that output level.\nHence, Option {{CORR}} is correct.",
            "Explains vertical gap in MR curve at the kink."
        ),
        (
            "Why does 'Price Rigidity' persist in an oligopolistic market according to this model?",
            "As long as the Marginal Cost (MC) curve fluctuates within the vertical discontinuity of the MR curve, the equilibrium price P* remains unchanged",
            ["Because commercial banks freeze corporate lending rates", "Because firms are legally barred from changing price tags", "Because raw material prices are fixed internationally by treaty"],
            "A",
            "1. Since MC can shift up or down within the vertical gap of MR without altering the intersection point Q*, both the profit-maximizing output and the price P* remain sticky (rigid).\nHence, Option {{CORR}} is correct.",
            "Explains price rigidity via MC shifting within MR discontinuity."
        )
    ]
))

# Passage 12: Collusive Oligopoly & OPEC Cartel
passages_data.append((
    "Non-Competitive Markets",
    "Collusive Oligopoly & Cartels",
    (
        "To avoid mutually destructive price wars, oligopoly firms frequently engage in collusion. When firms formally agree to coordinate "
        "their pricing and output decisions, they form a Cartel—a formal collusive organization designed to act as a joint monopoly. "
        "The Organization of the Petroleum Exporting Countries (OPEC) is the world's most prominent real-world cartel. "
        "Member nations meet periodically to assess global crude oil demand and allocate strict production quotas to each member country. "
        "By restricting total petroleum supply, the cartel drives international crude oil prices higher, maximizing collective industry profits. "
        "However, cartels are notoriously unstable due to the inherent incentive to cheat. Each individual member faces a temptation to secretly "
        "produce beyond its assigned quota: selling extra oil at the cartel's artificially high price yields immense private revenue. "
        "When multiple members cheat simultaneously, aggregate supply surges, triggering a collapse in the cartel's agreed price."
    ),
    [
        (
            "What is a 'Cartel' in the context of oligopolistic market structures?",
            "A formal collusive agreement among competing producers to coordinate prices, output quotas, and market territories",
            ["A government antitrust agency that dismantles private business monopolies", "An international trade agreement eliminating all export tariffs", "A labor union bargaining for minimum statutory wages"],
            "A",
            "1. A cartel is a formal association of oligopolistic firms that openly coordinate pricing, output quotas, and sales allocations to maximize joint monopoly profits.\nHence, Option {{CORR}} is correct.",
            "Defines cartel as formal collusive agreement."
        ),
        (
            "How does a cartel like OPEC succeed in driving international crude oil prices higher?",
            "By restricting collective petroleum production and assigning strict supply quotas to member nations",
            ["By mandating that all oil be converted into solar energy", "By offering massive price discounts to all importing nations", "By printing sovereign currency to subsidize petroleum consumers"],
            "B",
            "1. OPEC restricts total market supply by enforcing production quotas. Reduced supply relative to inelastic global oil demand pushes equilibrium prices higher.\nHence, Option {{CORR}} is correct.",
            "Explains price escalation via output restriction and quotas."
        ),
        (
            "Why are international cartels notoriously prone to internal instability and breakdown?",
            "Because individual members have a strong economic incentive to secretly cheat and produce beyond their assigned quota",
            ["Because consumer demand for crude oil is completely zero", "Because all member nations are required to use the same central bank", "Because international courts impose criminal fines on cartel leaders"],
            "C",
            "1. Cartel agreements suffer from the prisoner's dilemma: while collective restriction maximizes joint profits, each individual member can earn higher individual revenue by secretly exceeding its quota at the high price.\nHence, Option {{CORR}} is correct.",
            "Identifies cheating on quotas as cause of cartel instability."
        ),
        (
            "What happens to the market price of a cartel's product if multiple member nations cheat simultaneously by overproducing?",
            "Total market supply surges, causing the cartel price to collapse",
            ["The market price automatically doubles", "Demand for the product falls to absolute zero", "The cartel achieves permanent monopoly dominance"],
            "D",
            "1. When multiple members cheat by overproducing, aggregate supply exceeds target levels, flooding the market and causing the price to crash.\nHence, Option {{CORR}} is correct.",
            "Explains price collapse when cartel members cheat on output."
        ),
        (
            "What type of collusion occurs when firms tacitly coordinate prices without any formal written agreement, often following a dominant price leader?",
            "Tacit (Informal) Collusion or Price Leadership",
            ["Perfect competition", "Legal statutory monopoly", "Pure monopsony"],
            "A",
            "1. Tacit collusion occurs when firms coordinate pricing without explicit formal agreements, typically through informal understandings or following the price changes announced by a dominant market leader.\nHence, Option {{CORR}} is correct.",
            "Defines tacit collusion and price leadership."
        )
    ]
))

# Passage 13: Price Ceiling & Rent Control
passages_data.append((
    "Market Equilibrium",
    "Price Controls: Price Ceiling",
    (
        "A Price Ceiling is a government-mandated legal maximum price at which a good or service can be sold. "
        "To protect low-income consumers from exploitative pricing during shortages, governments often impose price ceilings on essential commodities "
        "(such as life-saving medicines, food grains under the Public Distribution System, and residential apartment rent control). "
        "For a price ceiling to be legally binding and effective, it must be set strictly BELOW the free-market equilibrium price (P_c < P*). "
        "At this subsidized lower price, the quantity demanded by consumers (Q_d) expands, while the quantity supplied by producers (Q_s) contracts, "
        "generating persistent Excess Demand (shortage: Q_d > Q_s). "
        "Because free price rationing is prohibited, the shortage leads to undesirable consequences: long consumer queues, arbitrary administrative "
        "rationing, deterioration in product quality, and the emergence of illegal 'Black Markets' where desperate buyers pay exorbitant illicit prices."
    ),
    [
        (
            "For a Price Ceiling to be effective and binding on the market, where must it be established relative to equilibrium price?",
            "Strictly BELOW the free-market equilibrium price (P_c < P*)",
            ["Strictly ABOVE the free-market equilibrium price (P_c > P*)", "Exactly equal to the firm's marginal cost at zero output", "At double the prevailing market equilibrium price"],
            "A",
            "1. A price ceiling set above equilibrium has no effect because market forces naturally trade at the lower equilibrium. To be binding, the ceiling must be imposed below equilibrium price.\nHence, Option {{CORR}} is correct.",
            "Identifies binding price ceiling must be below equilibrium price."
        ),
        (
            "What direct market disequilibrium is created when a Price Ceiling is imposed below the equilibrium price?",
            "Excess Demand (Shortage), because quantity demanded exceeds quantity supplied (Q_d > Q_s)",
            ["Excess Supply (Surplus), because producers flood the market with goods", "Instantaneous market clearing with zero consumer queues", "A complete collapse in consumer demand for the commodity"],
            "B",
            "1. Lowering the price below equilibrium stimulates quantity demanded (law of demand) while discouraging quantity supplied (law of supply), resulting in excess demand (shortage).\nHence, Option {{CORR}} is correct.",
            "Explains price ceiling creates excess demand / shortage."
        ),
        (
            "Which of the following is a direct negative byproduct of an artificially imposed Price Ceiling?",
            "The emergence of illegal Black Marketing where goods are sold covertly above the legal ceiling price",
            ["A massive accumulation of unsold buffer stocks in producer warehouses", "Rapid improvements in product packaging and premium customer service", "Unemployment of agricultural workers due to surplus production"],
            "C",
            "1. When demand exceeds legal supply at the ceiling price, an illegal underground market ('Black Market') emerges where consumers willing to pay more purchase goods illicitly at exorbitant rates.\nHence, Option {{CORR}} is correct.",
            "Identifies black marketing as consequence of price ceiling."
        ),
        (
            "How does the government typically manage the shortage created by a Price Ceiling on essential food grains?",
            "By implementing administrative rationing schemes (such as fair-price shops and ration cards) and releasing buffer stocks",
            ["By tripling the legal ceiling price every twenty-four hours", "By banning citizens from consuming carbohydrates", "By forcing private grocers to import goods at their own personal expense"],
            "D",
            "1. Because price rationing is disabled, governments must introduce non-price allocation systems, such as Ration Cards under the Public Distribution System (PDS) to allocate limited supplies fairly.\nHence, Option {{CORR}} is correct.",
            "Explains rationing system under price ceiling."
        ),
        (
            "What happens in the rental housing market when strict Rent Control (price ceiling on residential rent) is enacted?",
            "Landlords reduce maintenance, housing quality deteriorates, and severe shortages of rental apartments emerge",
            ["Landlords construct massive new apartment complexes at zero cost", "The supply of rental apartments doubles within a week", "Tenant demand for rental apartments drops to zero"],
            "A",
            "1. Rent control caps rental income below market returns. Landlords cut back on repairs and maintenance (causing slums) and stop investing in new rental housing, worsening the housing shortage.\nHence, Option {{CORR}} is correct.",
            "Describes real-world effects of rent control."
        )
    ]
))

# Passage 14: Price Floor & Minimum Support Price (MSP)
passages_data.append((
    "Market Equilibrium",
    "Price Controls: Price Floor",
    (
        "A Price Floor (or Minimum Support Price - MSP) is a government-legislated minimum price below which a commodity cannot legally be sold. "
        "Governments establish price floors primarily to protect producer interests—such as ensuring remunerative incomes for agricultural farmers "
        "or establishing statutory minimum wages for industrial workers. "
        "For a price floor to be legally binding, it must be established strictly ABOVE the free-market equilibrium price (P_f > P*). "
        "At this elevated support price, farmers are incentivized to expand agricultural supply (Q_s rises), while consumer and mill demand contracts "
        "(Q_d falls), resulting in persistent Excess Supply (market surplus: Q_s > Q_d). "
        "If left unaddressed, this surplus would trigger competition among farmers to undercut prices, causing the market to collapse back to equilibrium. "
        "To sustain the price floor, the government must actively intervene by purchasing the entire surplus output at the MSP, storing it in state-owned "
        "warehouses as Buffer Stock for national food security and public distribution."
    ),
    [
        (
            "Where must a Price Floor (such as Minimum Support Price) be established relative to the equilibrium price to be legally binding?",
            "Strictly ABOVE the free-market equilibrium price (P_f > P*)",
            ["Strictly BELOW the free-market equilibrium price (P_f < P*)", "At the horizontal intercept of the demand curve", "At zero price to ensure universal affordability"],
            "A",
            "1. A price floor set below equilibrium has no effect because market transactions naturally occur at the higher equilibrium. To be binding, the price floor must be fixed above equilibrium.\nHence, Option {{CORR}} is correct.",
            "Identifies binding price floor must be above equilibrium price."
        ),
        (
            "What immediate market condition is generated when a Price Floor is established above the equilibrium price?",
            "Excess Supply (Market Surplus), where quantity supplied exceeds quantity demanded (Q_s > Q_d)",
            ["Excess Demand (Shortage), where buyers cannot find goods", "A complete collapse in agricultural production across all states", "An instantaneous drop in consumer grocery prices"],
            "B",
            "1. At a support price higher than equilibrium, producers increase output (law of supply) while consumers buy less (law of demand), creating a market surplus (excess supply).\nHence, Option {{CORR}} is correct.",
            "Explains price floor creates excess supply / surplus."
        ),
        (
            "How does the government maintain the Minimum Support Price (MSP) and prevent surplus grain from crashing market prices?",
            "By procuring the entire surplus agricultural output from farmers at the announced MSP and maintaining buffer stocks",
            ["By ordering farmers to burn all surplus harvested crops in fields", "By levying punitive income taxes on all small agricultural cultivators", "By exporting 100% of national food grain production at below-market rates"],
            "C",
            "1. To prevent the surplus from depressing market prices, government procurement agencies (like the Food Corporation of India - FCI) buy the surplus at MSP and store it as buffer stocks.\nHence, Option {{CORR}} is correct.",
            "Explains government procurement and buffer stock management under MSP."
        ),
        (
            "What is the labor market equivalent of a statutory Price Floor?",
            "The Minimum Wage legislation, which sets a legal floor below which workers cannot be compensated",
            ["A corporate income tax ceiling on executive salaries", "A statutory cap on maximum overtime hours worked per week", "An unemployment insurance allowance funded by foreign aid"],
            "D",
            "1. Minimum wage laws set a wage floor above the competitive equilibrium wage for unskilled labor to protect worker welfare, functioning as a price floor in the labor market.\nHence, Option {{CORR}} is correct.",
            "Identifies Minimum Wage as a price floor in labor market."
        ),
        (
            "What potential consequence can arise in the labor market if the Minimum Wage (price floor) is set significantly higher than equilibrium wages?",
            "Involuntary unemployment among low-skilled workers, as quantity of labor supplied exceeds quantity demanded",
            ["A severe labor shortage across all manufacturing plants", "Immediate elimination of all forms of corporate taxation", "A permanent doubling of consumer expenditure on luxury yachts"],
            "A",
            "1. A wage floor above equilibrium makes hiring workers costlier, prompting firms to cut jobs (lower labor demand) while more workers seek jobs (higher labor supply), resulting in unemployment.\nHence, Option {{CORR}} is correct.",
            "Explains unemployment consequence of excessive minimum wage floor."
        )
    ]
))

# Passage 15: Externalities & Market Failure
passages_data.append((
    "Introduction to Microeconomics",
    "Externalities & Market Failure",
    (
        "A market failure occurs when the free price mechanism fails to allocate resources efficiently, leading to a net loss of economic welfare. "
        "Externalities—the uncompensated spillover costs or benefits imposed on third parties not directly involved in an economic transaction—are "
        "a primary source of market failure. "
        "A chemical manufacturing factory that dumps untreated toxic effluents into a river generates a Negative Externality. "
        "The factory incurs private production costs but ignores the social costs (pollution, water contamination, disease) borne by riverside residents. "
        "Because Marginal Social Cost exceeds Marginal Private Cost (MSC > MPC), the unregulated free market overproduces the polluting chemical. "
        "Conversely, when individuals get vaccinated against contagious viruses, they generate a Positive Externality by creating herd immunity "
        "that protects non-vaccinated citizens. Because Marginal Social Benefit exceeds Marginal Private Benefit (MSB > MPB), the free market "
        "underproduces vaccinations. Governments correct these distortions via Pigouvian taxes on polluters and subsidies on positive externalities."
    ),
    [
        (
            "What is an 'Externality' in microeconomic welfare theory?",
            "An uncompensated spillover cost or benefit imposed on third parties who are not directly involved in the transaction",
            ["A foreign exchange transfer fee charged on international banking remittances", "A corporate marketing expenditure on television advertising", "A statutory fine imposed on commercial banks for violating CRR rules"],
            "A",
            "1. An externality arises when the consumption or production activities of one economic party impose unpriced costs or benefits on innocent third parties.\nHence, Option {{CORR}} is correct.",
            "Defines externality as uncompensated spillover cost or benefit."
        ),
        (
            "Why does an unregulated free market lead to overproduction in the presence of a Negative Externality (e.g., pollution)?",
            "Because private producers consider only their private costs and ignore the additional external social costs imposed on society",
            ["Because consumers are willing to pay infinite prices for polluted goods", "Because negative externalities cause fixed production costs to become zero", "Because governments legally mandate factories to operate 24 hours a day"],
            "B",
            "1. Since polluters do not pay for environmental damage, Marginal Private Cost is less than Marginal Social Cost (MPC < MSC). Consequently, output is pushed beyond the socially optimal level.\nHence, Option {{CORR}} is correct.",
            "Explains overproduction under negative externality because social costs are ignored."
        ),
        (
            "Why does a free market result in underproduction of goods generating Positive Externalities (such as public education and vaccinations)?",
            "Because individuals consider only their private benefits and ignore the spillover social benefits conferred on society (MSB > MPB)",
            ["Because producing goods with positive externalities is technically impossible", "Because positive externalities cause marginal revenue to turn negative", "Because consumers actively boycott all socially beneficial goods"],
            "C",
            "1. Since individuals do not capture the external social benefits generated (e.g., herd immunity), private demand falls short of social demand, resulting in under-provision by private markets.\nHence, Option {{CORR}} is correct.",
            "Explains underproduction of positive externalities."
        ),
        (
            "How can a government intervene to align private incentives with social optimum in the presence of Negative Externalities?",
            "By levying a Pigouvian tax on polluters equal to the marginal external damage, internalizing the externality",
            ["By subsidizing polluting factories with free raw materials", "By banning consumers from filing pollution complaints in civil courts", "By printing paper currency to compensate commercial bank shareholders"],
            "D",
            "1. A Pigouvian tax equal to the external cost forces the polluter to internalize the externality (raising private costs to match social costs), reducing production to the socially optimal level.\nHence, Option {{CORR}} is correct.",
            "Explains Pigouvian tax internalizing negative externalities."
        ),
        (
            "What policy tool should the government deploy to rectify the underproduction of goods with Positive Externalities?",
            "Provide production or consumption subsidies to lower costs and encourage higher consumption",
            ["Impose heavy sales taxes on consumers purchasing vaccinations", "Confiscate research equipment from medical laboratories", "Mandate that educational schools operate with zero teachers"],
            "A",
            "1. By subsidizing goods with positive externalities (e.g., free vaccinations, subsidized public schooling), the government lowers the private cost, boosting consumption to the socially desirable level.\nHence, Option {{CORR}} is correct.",
            "Explains subsidies for positive externalities."
        )
    ]
))

# Remaining Microeconomics passages (Passages 16 to 20)
# Passage 16: Producer Equilibrium (MR-MC Approach)
passages_data.append((
    "Production and Costs",
    "Producer's Equilibrium",
    (
        "A rational producer seeks to maximize total economic profit, defined as the difference between Total Revenue and Total Cost (Profit = TR - TC). "
        "In modern microeconomics, producer's equilibrium is determined through the Marginal Revenue - Marginal Cost (MR-MC) approach. "
        "Under this approach, two simultaneous conditions must be satisfied for a firm to achieve maximum profit: "
        "First, Marginal Cost must equal Marginal Revenue (MC = MR). This is a necessary condition because if MR > MC, the firm can expand profit by producing "
        "more; if MR < MC, the firm reduces profit on the marginal unit and should contract output. "
        "Second, Marginal Cost must be rising at the point of equilibrium (MC curve must cut MR from below). This is the sufficient condition, ensuring "
        "that producing further units beyond equilibrium would add more to costs than to revenue (MC > MR), strictly guaranteeing maximum profit."
    ),
    [
        (
            "What is the first necessary condition for producer's equilibrium under the MR-MC approach?",
            "Marginal Cost must be equal to Marginal Revenue (MC = MR)",
            ["Total Cost must equal zero", "Average Revenue must equal Average Fixed Cost", "Price must equal Marginal Propensity to Consume"],
            "A",
            "1. A producer maximizes profit where the addition to revenue from the last unit sold equals the addition to cost incurred in producing it: MR = MC.\nHence, Option {{CORR}} is correct.",
            "Identifies MC = MR as necessary condition."
        ),
        (
            "What is the second sufficient condition for producer's equilibrium under the MR-MC approach?",
            "Marginal Cost must be rising at the equilibrium point (MC curve must cut the MR curve from below)",
            ["Marginal Cost must be falling at an accelerating rate", "Average Variable Cost must be at its maximum", "Total Revenue must equal Total Fixed Cost"],
            "B",
            "1. The second condition requires that beyond the point of intersection, MC must exceed MR so that producing additional units yields a loss, ensuring profit maximization.\nHence, Option {{CORR}} is correct.",
            "Identifies MC must cut MR from below as sufficient condition."
        ),
        (
            "If a firm observes that Marginal Revenue exceeds Marginal Cost (MR > MC) at its current output level, what should it do to maximize profit?",
            "It should expand production output because each additional unit adds more to revenue than to cost",
            ["It should immediately shut down its factory shed", "It should reduce output to zero to eliminate variable expenses", "It should lower its product price to absolute zero"],
            "C",
            "1. When MR > MC, producing an extra unit adds to total profit. The firm should continue expanding output until MR = MC.\nHence, Option {{CORR}} is correct.",
            "Explains expansion of output when MR > MC."
        ),
        (
            "What should a firm do if Marginal Cost exceeds Marginal Revenue (MC > MR)?",
            "It should contract production output because the last units produced caused total profit to decline",
            ["It should double its factory size immediately", "It should increase advertising expenditures tenfold", "It should borrow money from foreign central banks"],
            "D",
            "1. When MC > MR, producing those marginal units costs more than the revenue they generate, reducing total profit. The firm must reduce output until MR = MC.\nHence, Option {{CORR}} is correct.",
            "Explains contraction of output when MC > MR."
        ),
        (
            "Why is the point where MC = MR while MC is falling rejected as an equilibrium point?",
            "Because profit is minimized rather than maximized; producing beyond this point adds more to revenue than to costs, increasing profit",
            ["Because accounting standards prohibit reporting falling costs", "Because consumer demand becomes zero when costs fall", "Because commercial banks refuse to process payments at falling costs"],
            "A",
            "1. When MC cuts MR from above (MC is falling), moving beyond this point results in MR > MC, which increases profit. Thus, this point represents minimum profit or maximum loss, not maximum profit.\nHence, Option {{CORR}} is correct.",
            "Explains why falling MC point is rejected."
        )
    ]
))

# Passage 17: Price Elasticity of Supply & Time Element
passages_data.append((
    "Theory of Firm under Perfect Competition",
    "Price Elasticity of Supply",
    (
        "Price Elasticity of Supply (E_s) measures the degree of responsiveness of quantity supplied of a commodity to a change in its price. "
        "The magnitude of supply elasticity is heavily governed by the time period available to producers to adjust their production inputs, "
        "a concept famously categorized by Alfred Marshall into three time horizons: "
        "In the Market Period (very short run), supply is fixed and completely inelastic (E_s = 0) because perishable commodities (fresh milk, fish, vegetables) "
        "cannot be increased or decreased instantaneously; price is determined solely by shifts in demand. "
        "In the Short Period, firms can vary output moderately by changing variable inputs (labor, raw materials) while fixed capital remains constant, "
        "yielding moderately elastic supply. "
        "In the Long Period, all factors of production are fully variable, and new firms can enter or exit freely, making supply highly price-elastic (E_s > 1). "
        "Other determinants of E_s include the nature of the good, availability of production inputs, and storage costs."
    ),
    [
        (
            "What is the Price Elasticity of Supply in the 'Market Period' (very short run) for perishable agricultural commodities?",
            "Perfectly Inelastic (E_s = 0), represented by a vertical supply curve",
            ["Perfectly Elastic (E_s = ∞), represented by a horizontal line", "Unitary Elastic (E_s = 1) passing through the origin", "Negative Elasticity (E_s < 0)"],
            "A",
            "1. In the very short period (market period), supply is fixed by existing harvested stock and cannot be changed, resulting in a vertical, perfectly inelastic supply curve (E_s = 0).\nHence, Option {{CORR}} is correct.",
            "Identifies E_s = 0 in market period."
        ),
        (
            "Why does the Price Elasticity of Supply become significantly greater in the Long Period compared to the Short Period?",
            "Because producers have sufficient time to adjust all factors of production (expand factories, install machinery) and new firms can enter",
            ["Because long-run production costs automatically fall to zero", "Because government mandates all long-run supply curves to be horizontal", "Because consumers lose interest in purchasing the good in the long run"],
            "B",
            "1. Over long periods, all inputs are variable and capital scale can be expanded, giving firms complete flexibility to respond to price changes with large output changes.\nHence, Option {{CORR}} is correct.",
            "Explains high supply elasticity in long period."
        ),
        (
            "If a 15% increase in market price results in a 30% increase in quantity supplied, what is the Price Elasticity of Supply?",
            "2.0 (Elastic Supply)",
            ["0.5 (Inelastic Supply)", "1.0 (Unitary Elasticity)", "15.0"],
            "C",
            "1. E_s = % change in Q_s / % change in Price = 30% / 15% = 2.0. Since E_s > 1, supply is price-elastic.\nHence, Option {{CORR}} is correct.",
            "Calculates E_s = 30 / 15 = 2.0."
        ),
        (
            "How does high storage cost or rapid physical perishability affect the price elasticity of supply of a good?",
            "It makes supply relatively price-inelastic because sellers cannot hold back inventory when prices fall",
            ["It makes supply infinitely price-elastic", "It causes the supply curve to bend backward into a circle", "It has zero impact on producer supply decisions"],
            "D",
            "1. Perishable goods with high storage costs must be disposed of quickly regardless of price, making producers insensitive to price cuts and rendering supply price-inelastic.\nHence, Option {{CORR}} is correct.",
            "Explains perishability reduces supply elasticity."
        ),
        (
            "A linear supply curve originating from the origin (zero intercept) has what price elasticity of supply at all points along the line?",
            "Unitary Elasticity (E_s = 1)",
            ["Zero Elasticity (E_s = 0)", "Infinite Elasticity (E_s = ∞)", "Elasticity varies from zero to infinity"],
            "A",
            "1. By geometric method of supply elasticity, any straight-line supply curve that passes through the origin has a price elasticity of supply equal to 1 (E_s = 1) at all points along the curve, regardless of its angle.\nHence, Option {{CORR}} is correct.",
            "Identifies E_s = 1 for linear supply curve passing through origin."
        )
    ]
))

# Passage 18: Consumer Surplus & Deadweight Loss
passages_data.append((
    "Theory of Consumer Behaviour",
    "Consumer Surplus & Market Efficiency",
    (
        "Consumer Surplus, conceptualized by Alfred Marshall, measures the net economic benefit that consumers derive from participating in a market. "
        "It is defined as the difference between the maximum total amount consumers are willing and able to pay for a good and the actual market price "
        "they actually pay (Consumer Surplus = Willingness to Pay - Actual Expenditure). "
        "Graphically, on a standard supply-demand diagram, Consumer Surplus is represented by the triangular area situated below the downward-sloping "
        "demand curve and above the horizontal market equilibrium price line. "
        "Producer Surplus represents the corresponding area above the supply curve and below the market price line. "
        "When a competitive market is in equilibrium, the sum of Consumer Surplus and Producer Surplus (Total Social Surplus) is maximized. "
        "However, when governments distort equilibrium by imposing import tariffs, excise taxes, or restrictive quotas, market transactions contract "
        "below the competitive output level, creating a 'Deadweight Loss'—a permanent destruction of economic surplus that accrues to neither consumers, "
        "producers, nor the state treasury."
    ),
    [
        (
            "What is the precise definition of 'Consumer Surplus'?",
            "The difference between the maximum amount consumers are willing to pay and the actual price they pay",
            ["The total cash balance remaining in consumer bank accounts at month end", "The amount of unsold surplus goods returned to retail stores", "The statutory discount mandated by fair-trade commissions"],
            "A",
            "1. Consumer Surplus represents the economic welfare gain to consumers: the excess of what they were prepared to pay over what they actually paid.\nHence, Option {{CORR}} is correct.",
            "Defines Consumer Surplus."
        ),
        (
            "How is Consumer Surplus represented geometrically on a standard demand and supply graph?",
            "The triangular area below the demand curve and above the market price line",
            ["The triangular area below the supply curve and above the horizontal axis", "The entire rectangular area of total consumer expenditure (P × Q)", "The area between the vertical axis and the marginal revenue curve"],
            "B",
            "1. On a graph, the demand curve reflects marginal willingness to pay. The area under demand down to the market price represents the net consumer surplus.\nHence, Option {{CORR}} is correct.",
            "Identifies geometric representation of Consumer Surplus."
        ),
        (
            "What does 'Deadweight Loss' represent in welfare economics?",
            "A permanent loss of total economic surplus caused by market distortions (taxes, monopolies) that is captured by nobody",
            ["The monetary value of spoiled agricultural produce", "The total amount of corporate income taxes collected by the government", "The wages paid to workers during factory shutdowns"],
            "C",
            "1. Deadweight loss is the net loss of social welfare that occurs when market output is restricted below the competitive equilibrium, benefiting neither consumers, producers, nor the government.\nHence, Option {{CORR}} is correct.",
            "Defines Deadweight Loss as uncaptured loss of social surplus."
        ),
        (
            "What happens to Consumer Surplus when the government imposes an indirect excise tax on a commodity, raising its market price?",
            "Consumer Surplus shrinks significantly as consumers pay higher prices and purchase fewer units",
            ["Consumer Surplus doubles automatically", "Consumer Surplus becomes equal to total government debt", "Consumer Surplus remains completely unaffected"],
            "D",
            "1. An indirect tax shifts the supply curve upward, raising the consumer price and shrinking the area between the demand curve and the price line, reducing consumer surplus.\nHence, Option {{CORR}} is correct.",
            "Explains excise tax reduces consumer surplus."
        ),
        (
            "At what market output level is Total Economic Welfare (Consumer Surplus + Producer Surplus) maximized?",
            "At the competitive market equilibrium output where demand intersects supply (P = MC)",
            ["At zero output where costs are minimized", "At the monopoly output where producer profit is highest", "At the point where consumer price ceiling equals zero"],
            "A",
            "1. In a competitive market with no externalities, the intersection of demand and supply equates marginal social benefit to marginal social cost, maximizing total economic surplus.\nHence, Option {{CORR}} is correct.",
            "States total surplus maximized at competitive equilibrium."
        )
    ]
))

# Passage 19: Market Equilibrium Simultaneous Shifts
passages_data.append((
    "Market Equilibrium",
    "Simultaneous Shifts in Demand and Supply",
    (
        "Market equilibrium is established at the price and quantity where quantity demanded equals quantity supplied (D = S). "
        "When economic parameters change, the demand and supply curves shift, establishing a new equilibrium. "
        "When BOTH demand and supply shift simultaneously, the direction of change in equilibrium price and quantity depends on the relative magnitudes of the shifts: "
        "Case 1: Both Demand and Supply increase simultaneously. Because both curves shift to the right, equilibrium quantity will ALWAYS increase unambiguously. "
        "However, the effect on equilibrium price is determined by the relative strength of the shifts: if the increase in demand exceeds the increase in supply (ΔD > ΔS), "
        "equilibrium price rises; if the increase in supply exceeds the increase in demand (ΔS > ΔD), equilibrium price falls; and if both shifts are equal (ΔD = ΔS), "
        "equilibrium price remains strictly constant while equilibrium quantity expands. "
        "Similar analytical principles govern simultaneous decreases or opposing shifts in demand and supply."
    ),
    [
        (
            "If both Market Demand and Market Supply increase simultaneously, what happens to equilibrium quantity?",
            "Equilibrium quantity will unambiguously increase",
            ["Equilibrium quantity will unambiguously decrease", "Equilibrium quantity will always remain strictly constant", "Equilibrium quantity falls to zero"],
            "A",
            "1. Since both an increase in demand and an increase in supply push output to the right, the combined effect is an unambiguous expansion in equilibrium quantity.\nHence, Option {{CORR}} is correct.",
            "Identifies unambiguous increase in quantity when both curves shift right."
        ),
        (
            "If the increase in Demand is exactly equal in magnitude to the increase in Supply (ΔD = ΔS), what happens to the equilibrium price?",
            "Equilibrium price remains strictly unchanged (constant)",
            ["Equilibrium price doubles", "Equilibrium price falls by 50%", "Equilibrium price becomes zero"],
            "B",
            "1. An increase in demand exerts upward pressure on price, while an equal increase in supply exerts equal downward pressure. The two price effects neutralize each other, keeping price unchanged.\nHence, Option {{CORR}} is correct.",
            "Explains price remains unchanged when ΔD = ΔS."
        ),
        (
            "If Market Demand increases by a larger magnitude than the increase in Market Supply (ΔD > ΔS), what is the net effect on equilibrium price?",
            "Equilibrium price will rise",
            ["Equilibrium price will fall", "Equilibrium price will remain strictly constant", "Equilibrium price will turn negative"],
            "C",
            "1. When the upward pressure from the demand surge outweighs the downward pressure from the supply expansion (ΔD > ΔS), the net result is a rise in the equilibrium price.\nHence, Option {{CORR}} is correct.",
            "Explains price rises when ΔD > ΔS."
        ),
        (
            "If Market Supply increases by a larger magnitude than the increase in Market Demand (ΔS > ΔD), what will happen to the equilibrium price?",
            "Equilibrium price will fall",
            ["Equilibrium price will rise", "Equilibrium price will stay constant", "Equilibrium price will fluctuate unpredictably"],
            "D",
            "1. When the supply expansion exceeds the demand increase (ΔS > ΔD), the downward pressure from abundant supply dominates, causing the equilibrium price to fall.\nHence, Option {{CORR}} is correct.",
            "Explains price falls when ΔS > ΔD."
        ),
        (
            "If Market Demand decreases while Market Supply increases simultaneously, what happens to the equilibrium price?",
            "Equilibrium price will unambiguously fall",
            ["Equilibrium price will unambiguously rise", "Equilibrium price will remain constant", "Equilibrium quantity will collapse to zero"],
            "A",
            "1. A decrease in demand pulls price down, and an increase in supply also pushes price down. Since both forces push price in the downward direction, equilibrium price unambiguously falls.\nHence, Option {{CORR}} is correct.",
            "Identifies unambiguous price drop when demand falls and supply rises."
        )
    ]
))

# Passage 20: Microeconomic Production Possibility Frontier (PPF)
passages_data.append((
    "Introduction to Microeconomics",
    "Production Possibility Frontier",
    (
        "The Production Possibility Frontier (PPF) is a curve that depicts all maximum feasible combinations of two goods that an economy can produce "
        "given its fixed resources and state of technology, assuming all resources are fully and efficiently employed. "
        "The PPF illustrates three core economic concepts: Scarcity, Choice, and Opportunity Cost. "
        "Points lying on the PPF represent full employment and productive efficiency. Points inside the PPF indicate underutilization or unemployment of resources. "
        "Points outside the PPF are unattainable with existing resources. "
        "The slope of the PPF is the Marginal Opportunity Cost (MOC) or Marginal Rate of Transformation (MRT = ΔY / ΔX). "
        "Under standard economic assumptions, the PPF is concave to the origin because resources are not equally specialized across all production sectors. "
        "Transferring resources from Good Y (wheat) to Good X (guns) requires withdrawing progressively less efficient factors, causing Marginal Opportunity Cost to rise. "
        "Economic growth, technological advancement, or discovery of new mineral resources shifts the entire PPF outward to the right."
    ),
    [
        (
            "What does a point situated INSIDE the Production Possibility Frontier (PPF) signify?",
            "Underutilization, inefficiency, or unemployment of the economy's available productive resources",
            ["An unattainable level of output beyond current technology", "Full employment and maximum productive efficiency", "A point of zero opportunity cost across both sectors"],
            "A",
            "1. Any point inside the PPF indicates that the economy is producing less than its potential capacity due to idle resources or inefficient allocation.\nHence, Option {{CORR}} is correct.",
            "Identifies inside point as underutilization of resources."
        ),
        (
            "Why is the standard Production Possibility Frontier (PPF) concave to the origin?",
            "Due to increasing Marginal Opportunity Cost (Marginal Rate of Transformation)",
            ["Due to diminishing marginal utility of consumer goods", "Due to constant opportunity cost across all factors of production", "Due to government rationing of industrial capital"],
            "B",
            "1. Because resources are specialized and not equally suited to producing all goods, transferring resources from one sector to another incurs increasing opportunity costs (increasing MRT), giving the PPF its concave shape.\nHence, Option {{CORR}} is correct.",
            "Explains concavity of PPF due to increasing MOC/MRT."
        ),
        (
            "What does the slope of the Production Possibility Frontier measure?",
            "Marginal Rate of Transformation (MRT = ΔY / ΔX)",
            ["Marginal Propensity to Consume", "Average Fixed Cost", "Price Elasticity of Demand"],
            "C",
            "1. The slope of the PPF at any point is the Marginal Rate of Transformation (MRT) or Marginal Opportunity Cost, which measures the units of Good Y that must be sacrificed to produce one additional unit of Good X.\nHence, Option {{CORR}} is correct.",
            "Identifies slope of PPF as MRT."
        ),
        (
            "Which of the following economic developments will cause the entire PPF to shift parallelly outwards to the right?",
            "An influx of advanced technology, capital accumulation, and discovery of new natural resources",
            ["A severe earthquake destroying factories and transportation networks", "Widespread emigration of skilled labor overseas", "An increase in the central bank's Cash Reserve Ratio"],
            "D",
            "1. An outward shift in the PPF represents an expansion of the economy's productive capacity, driven by technological breakthroughs, capital deepening, or discovery of new natural resources.\nHence, Option {{CORR}} is correct.",
            "Identifies factors causing outward shift of PPF."
        ),
        (
            "If resources were completely interchangeable and equally efficient in producing both goods, what shape would the PPF assume?",
            "A downward-sloping straight line with constant Marginal Opportunity Cost",
            ["A convex curve identical to an indifference curve", "A vertical line with infinite opportunity cost", "A circular boundary passing through the origin"],
            "A",
            "1. If resources were equally adaptable to both goods, the opportunity cost of producing one good in terms of the other would remain constant at all points, resulting in a straight-line PPF.\nHence, Option {{CORR}} is correct.",
            "Explains straight-line PPF under constant opportunity cost."
        )
    ]
))

# Verify count of Micro passages
assert len(passages_data) == 20, f"Expected 20 micro passages, got {len(passages_data)}"
print("Microeconomics passages constructed: 20 passages (100 questions).")

# Import Macroeconomics Passages (Passages 21 to 40)
from scripts.eco_generators.macro_passages import macro_passages_data
assert len(macro_passages_data) == 20, f"Expected 20 macro passages, got {len(macro_passages_data)}"
passages_data.extend(macro_passages_data)

print(f"Total passages aggregated: {len(passages_data)}")
assert len(passages_data) == 40, f"Expected 40 passages, got {len(passages_data)}"

# Now expand all 40 passages into 5 questions each = 200 questions
for p_idx, (p_ch, p_top, p_text, q_list) in enumerate(passages_data):
    pass_header = f"Read the following passage carefully and answer the questions that follow:\n\n{p_text}\n\n"
    assert len(q_list) == 5, f"Passage {p_idx+1} does not have 5 questions"
    for q_stem, corr_text, wrong_texts, target_id, sol_template, mist_correct in q_list:
        full_stem = pass_header + q_stem
        opts, corr, sol = rotate_options(corr_text, wrong_texts, target_id, sol_template, mist_correct)
        add_q(make_question(p_ch, p_top, full_stem, opts, corr, sol))

print(f"Total Passage questions generated: {len(questions)}")
assert len(questions) == 200, f"Expected 200 questions, got {len(questions)}"

out_path = "mock/eco_units/passages.json"
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved {len(questions)} passage questions to {out_path}!")

