import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.eco_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text
)

CHAPTER = "Market Equilibrium"
questions = []
seen = set()

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:80]}")
    seen.add(norm)
    questions.append(q)

print("Generating 60 unique questions for Unit 5: Market Equilibrium and Simple Applications...")

# -------------------------------------------------------------------------------------------------
# 1. Market Equilibrium, Excess Demand & Excess Supply (Q1 - Q20)
# -------------------------------------------------------------------------------------------------

# 1. Market Equilibrium definition
opts, corr, sol = rotate_options(
    "A state where market demand equals market supply, and there is no tendency for price or quantity to change",
    [
        "A situation where government sets equal tax and subsidy rates",
        "The point where total accounting profit equals total fixed cost",
        "A condition where all domestic production is exported to foreign markets"
    ],
    "A",
    "1. Market Equilibrium is a state of balance achieved at that price where quantity demanded by consumers equals quantity supplied by producers ($Q_d = Q_s$). At this price, the market clears with neither surplus nor shortage.\nHence, Option {{CORR}} is correct.",
    "Defines market equilibrium."
)
add_q(make_question(CHAPTER, "Market Equilibrium", "What constitutes 'Market Equilibrium' in a perfectly competitive commodity market?", opts, corr, sol))

# 2. Excess Demand definition and price pressure
opts, corr, sol = rotate_options(
    "Quantity demanded exceeds quantity supplied (Q_d > Q_s), putting upward pressure on market price",
    [
        "Quantity supplied exceeds quantity demanded, causing price to crash",
        "Market demand curve shifts to the left until price drops to zero",
        "Producers are unable to sell their existing inventory"
    ],
    "B",
    "1. Excess Demand occurs when the market price is below the equilibrium price. At this low price, $Q_d > Q_s$. Competition among unsatisfied buyers drives the price upward toward equilibrium.\nHence, Option {{CORR}} is correct.",
    "Explains excess demand and upward price pressure."
)
add_q(make_question(CHAPTER, "Market Equilibrium", "What occurs in a competitive market when the ruling price is set below the equilibrium price?", opts, corr, sol))

# 3. Excess Supply definition and price pressure
opts, corr, sol = rotate_options(
    "Quantity supplied exceeds quantity demanded (Q_s > Q_d), putting downward pressure on market price",
    [
        "Quantity demanded exceeds quantity supplied, driving prices higher",
        "Firms earn infinite supernormal profits by stockpiling goods",
        "Government immediately buys all output at triple the market price"
    ],
    "C",
    "1. Excess Supply occurs when the market price is above equilibrium ($P > P^*$), so $Q_s > Q_d$. Unsold goods accumulate as excess inventory, prompting competing sellers to lower prices until equilibrium is restored.\nHence, Option {{CORR}} is correct.",
    "Explains excess supply and downward price pressure."
)
add_q(make_question(CHAPTER, "Market Equilibrium", "When the market price of a good is above its equilibrium level, what market disequilibrium arises?", opts, corr, sol))

# 4. Numerical Equilibrium Price and Quantity calculation
opts, corr, sol = rotate_options(
    "Equilibrium Price = Rs. 10, Equilibrium Quantity = 60 units",
    [
        "Equilibrium Price = Rs. 15, Equilibrium Quantity = 40 units",
        "Equilibrium Price = Rs. 8, Equilibrium Quantity = 70 units",
        "Equilibrium Price = Rs. 20, Equilibrium Quantity = 100 units"
    ],
    "D",
    "1. Given: $Q_d = 100 - 4P$ and $Q_s = 20 + 4P$.\n2. At equilibrium, $Q_d = Q_s \\implies 100 - 4P = 20 + 4P$.\n3. $8P = 80 \\implies P = 10$.\n4. Substituting $P = 10$: $Q = 100 - 4(10) = 60$ units.\nHence, Option {{CORR}} is correct.",
    "Solves for equilibrium P = 10 and Q = 60."
)
add_q(make_question(CHAPTER, "Market Equilibrium", "The market demand and supply equations for a commodity are given as Q_d = 100 - 4P and Q_s = 20 + 4P. What are the equilibrium price and equilibrium quantity?", opts, corr, sol))

# 5. Numerical Excess Demand calculation
opts, corr, sol = rotate_options(
    "Excess Demand of 32 units",
    [
        "Excess Supply of 32 units",
        "Excess Demand of 16 units",
        "Market is in complete equilibrium"
    ],
    "A",
    "1. Using $Q_d = 100 - 4P$ and $Q_s = 20 + 4P$ at $P = \\text{Rs. 6}$:\n   $Q_d = 100 - 4(6) = 100 - 24 = 76$ units.\n   $Q_s = 20 + 4(6) = 20 + 24 = 44$ units.\n2. Excess Demand = $Q_d - Q_s = 76 - 44 = 32$ units.\nHence, Option {{CORR}} is correct.",
    "Calculates excess demand = 76 - 44 = 32."
)
add_q(make_question(CHAPTER, "Market Equilibrium", "Using the demand and supply equations Q_d = 100 - 4P and Q_s = 20 + 4P, what market condition exists if the price is fixed at Rs. 6 per unit?", opts, corr, sol))

# 6. Numerical Excess Supply calculation
opts, corr, sol = rotate_options(
    "Excess Supply of 24 units",
    [
        "Excess Demand of 24 units",
        "Excess Supply of 48 units",
        "Shortage of 12 units"
    ],
    "B",
    "1. At $P = \\text{Rs. 13}$:\n   $Q_d = 100 - 4(13) = 100 - 52 = 48$ units.\n   $Q_s = 20 + 4(13) = 20 + 52 = 72$ units.\n2. Excess Supply = $Q_s - Q_d = 72 - 48 = 24$ units.\nHence, Option {{CORR}} is correct.",
    "Calculates excess supply = 72 - 48 = 24."
)
add_q(make_question(CHAPTER, "Market Equilibrium", "If the market price in the system Q_d = 100 - 4P and Q_s = 20 + 4P rises to Rs. 13 per unit, what is the magnitude of excess supply?", opts, corr, sol))

# 7. Sequence of market restoration from Excess Demand
add_q(make_sequence_question(
    CHAPTER, "Market Equilibrium",
    "Arrange the following sequential steps that restore market equilibrium when initial price is below equilibrium:",
    [
        "Market price is below equilibrium, generating excess demand (shortage)",
        "Unsatisfied buyers compete against each other and bid up the market price",
        "Rising price causes a contraction of quantity demanded and an expansion of quantity supplied",
        "Price continues rising until quantity demanded equals quantity supplied at new equilibrium"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (C), (D)",
        "(A), (C), (B), (D)",
        "(C), (A), (B), (D)"
    ],
    "A",
    "1. Initial price below equilibrium causes shortage (A) -> Buyers bid up price (B) -> Higher price contracts demand and expands supply (C) -> Equilibrium restored (D).\nHence, Option A is correct."
))

# 8. Sequence of market restoration from Excess Supply
add_q(make_sequence_question(
    CHAPTER, "Market Equilibrium",
    "Arrange the following steps illustrating how market forces eliminate excess supply:",
    [
        "Market price is above equilibrium, generating excess supply (unsold stock)",
        "Producers compete to clear unwanted inventories by offering price cuts",
        "Falling price leads to an expansion of quantity demanded and contraction of quantity supplied",
        "The market reaches equilibrium where quantity demanded equals quantity supplied"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (D), (C)",
        "(A), (C), (B), (D)",
        "(C), (B), (A), (D)"
    ],
    "A",
    "1. Excess supply arises (A) -> Sellers lower prices (B) -> Demand expands and supply contracts (C) -> Equilibrium reached (D).\nHence, Option A is correct."
))

# 9. Statement I & II: Market clearing price
add_q(make_statement_question(
    CHAPTER, "Market Equilibrium",
    "At the equilibrium price, there is neither an unsatisfied consumer nor an unsold commodity.",
    "The 'invisible hand' of the market mechanism automatically adjusts prices to eliminate shortages and surpluses without central intervention.",
    "A",
    "1. Statement I is true: The market clears completely at equilibrium.\n2. Statement II is true: Adam Smith's price mechanism automatically resolves disequilibrium via buyer and seller competition.\nHence, both statements are true (Option A)."
))

# 10. Assertion & Reason: Price stability at equilibrium
add_q(make_assertion_question(
    CHAPTER, "Market Equilibrium",
    "At the equilibrium price, the market experiences no internal tendency for price to change.",
    "Quantity demanded equals quantity supplied, so neither buyers bid prices up nor sellers discount prices to clear surplus.",
    "A",
    "1. Assertion is true: Equilibrium is inherently self-sustaining in the absence of exogenous shocks.\n2. Reason is true: Equivalence of demand and supply removes both upward and downward price pressures.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# -------------------------------------------------------------------------------------------------
# 2. Shifts in Demand and Supply Curves (Q11 - Q35)
# -------------------------------------------------------------------------------------------------

# 11. Increase in Demand (Supply constant)
opts, corr, sol = rotate_options(
    "Both equilibrium price and equilibrium quantity increase",
    [
        "Equilibrium price rises but equilibrium quantity falls",
        "Equilibrium price falls but equilibrium quantity rises",
        "Both equilibrium price and equilibrium quantity decrease"
    ],
    "A",
    "1. A rightward shift of the demand curve (with supply unchanged) creates excess demand at the original price. This bids up the price, inducing an expansion of supply along the existing supply curve. Thus, both equilibrium price ($P^*$) and equilibrium quantity ($Q^*$) rise.\nHence, Option {{CORR}} is correct.",
    "Analyzes increase in demand with constant supply."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "What is the impact on market equilibrium when consumer demand increases while market supply remains unchanged?", opts, corr, sol))

# 12. Decrease in Demand (Supply constant)
opts, corr, sol = rotate_options(
    "Both equilibrium price and equilibrium quantity decrease",
    [
        "Equilibrium price falls while equilibrium quantity increases",
        "Equilibrium price rises while equilibrium quantity falls",
        "Equilibrium price remains unchanged while quantity doubles"
    ],
    "B",
    "1. A leftward shift of the demand curve (supply constant) creates excess supply at the initial price. Sellers discount prices, contracting supply and reducing equilibrium price and quantity.\nHence, Option {{CORR}} is correct.",
    "Analyzes decrease in demand with constant supply."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "How do equilibrium price and equilibrium quantity change when the market demand curve shifts leftward, ceteris paribus?", opts, corr, sol))

# 13. Increase in Supply (Demand constant)
opts, corr, sol = rotate_options(
    "Equilibrium price decreases while equilibrium quantity increases",
    [
        "Both equilibrium price and equilibrium quantity increase",
        "Equilibrium price increases while equilibrium quantity decreases",
        "Both equilibrium price and equilibrium quantity decrease"
    ],
    "C",
    "1. A rightward shift of the supply curve (with demand unchanged) generates excess supply at the old price. Competition among sellers forces the price down, which expands quantity demanded along the demand curve. Hence, price falls and quantity rises.\nHence, Option {{CORR}} is correct.",
    "Analyzes increase in supply with constant demand."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "What happens to the market equilibrium when market supply increases due to technological progress while demand remains unchanged?", opts, corr, sol))

# 14. Decrease in Supply (Demand constant)
opts, corr, sol = rotate_options(
    "Equilibrium price increases while equilibrium quantity decreases",
    [
        "Equilibrium price decreases while equilibrium quantity increases",
        "Both equilibrium price and equilibrium quantity decrease",
        "Equilibrium quantity remains unchanged"
    ],
    "D",
    "1. A leftward shift of the supply curve (e.g. crop failure or input price hike) causes a shortage at the old price, bidding price up. Higher price contracts demand, so equilibrium price rises while equilibrium quantity falls.\nHence, Option {{CORR}} is correct.",
    "Analyzes decrease in supply with constant demand."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "What is the effect of an increase in the cost of raw materials (causing a decrease in supply) on market equilibrium?", opts, corr, sol))

# 15. Simultaneous Increase in Demand and Supply: Equal shifts
opts, corr, sol = rotate_options(
    "Equilibrium quantity increases while equilibrium price remains completely unchanged",
    [
        "Both equilibrium price and equilibrium quantity increase proportionately",
        "Equilibrium price increases while equilibrium quantity remains constant",
        "Equilibrium quantity decreases while equilibrium price falls"
    ],
    "A",
    "1. When demand and supply both increase by the exact same magnitude ($\Delta D = \Delta S$), the upward pressure on price from demand is exactly offset by the downward pressure on price from supply. Thus, equilibrium price is unchanged, while equilibrium quantity expands.\nHence, Option {{CORR}} is correct.",
    "Shows unchanged price when demand and supply shift equally."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "If both market demand and market supply increase in exactly the same proportion, how does the new equilibrium compare with the initial equilibrium?", opts, corr, sol))

# 16. Simultaneous Increase: Demand increase exceeds Supply increase
opts, corr, sol = rotate_options(
    "Both equilibrium price and equilibrium quantity increase",
    [
        "Equilibrium price decreases while equilibrium quantity increases",
        "Equilibrium price remains unchanged while quantity falls",
        "Equilibrium price increases while quantity decreases"
    ],
    "B",
    "1. Both curves shift right, so equilibrium quantity definitely rises. Because the demand expansion ($\Delta D$) exceeds the supply expansion ($\Delta S$), the upward price pressure dominates, causing equilibrium price to rise as well.\nHence, Option {{CORR}} is correct.",
    "Analyzes delta D > delta S positive shifts."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "When both demand and supply increase simultaneously, but the increase in demand is greater than the increase in supply, what happens to equilibrium price and quantity?", opts, corr, sol))

# 17. Simultaneous Increase: Supply increase exceeds Demand increase
opts, corr, sol = rotate_options(
    "Equilibrium price decreases while equilibrium quantity increases",
    [
        "Both equilibrium price and equilibrium quantity increase",
        "Equilibrium price remains constant",
        "Equilibrium quantity falls"
    ],
    "C",
    "1. Both curves shift right, expanding equilibrium quantity. However, because the rightward shift in supply is larger than that of demand ($\Delta S > \Delta D$), the surplus effect dominates, forcing equilibrium price down.\nHence, Option {{CORR}} is correct.",
    "Analyzes delta S > delta D positive shifts."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "If both demand and supply curves shift rightward, but the shift in supply is substantially larger than the shift in demand, how do equilibrium price and quantity change?", opts, corr, sol))

# 18. Demand increases and Supply decreases: Same magnitude
opts, corr, sol = rotate_options(
    "Equilibrium price rises while equilibrium quantity remains unchanged",
    [
        "Equilibrium quantity rises while equilibrium price remains unchanged",
        "Both equilibrium price and equilibrium quantity decrease",
        "Equilibrium price falls while equilibrium quantity rises"
    ],
    "D",
    "1. An increase in demand pushes price up and quantity up. A decrease in supply pushes price up and quantity down. Both forces push price up (price definitely rises). If the shifts are equal in magnitude, the quantity effects cancel out, leaving quantity unchanged.\nHence, Option {{CORR}} is correct.",
    "Shows price rise with invariant quantity."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "Suppose market demand increases by 20% while market supply decreases by 20% simultaneously. What is the net impact on market equilibrium?", opts, corr, sol))

# 19. Demand decreases and Supply increases: Same magnitude
opts, corr, sol = rotate_options(
    "Equilibrium price falls while equilibrium quantity remains unchanged",
    [
        "Equilibrium price rises while equilibrium quantity rises",
        "Equilibrium quantity falls while price remains constant",
        "Both equilibrium price and quantity increase"
    ],
    "A",
    "1. Decreased demand pushes price down and quantity down. Increased supply pushes price down and quantity up. Both forces push price down (price definitely falls). With equal shifts, quantity effects cancel out, keeping quantity constant.\nHence, Option {{CORR}} is correct.",
    "Shows price drop with invariant quantity."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "What is the net outcome when market demand decreases and market supply increases by the exact same proportion?", opts, corr, sol))

# 20. Perfectly Elastic Supply: Shift in Demand
opts, corr, sol = rotate_options(
    "Equilibrium price remains constant while equilibrium quantity increases",
    [
        "Equilibrium price increases while equilibrium quantity remains constant",
        "Both equilibrium price and equilibrium quantity increase",
        "Equilibrium price drops to zero"
    ],
    "B",
    "1. A perfectly elastic supply curve is horizontal. When the demand curve shifts rightward, it intersects the horizontal supply line at the exact same price, resulting in higher equilibrium quantity with zero change in price.\nHence, Option {{CORR}} is correct.",
    "Analyzes demand shift with perfectly elastic supply."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "If the market supply curve is perfectly elastic (horizontal), what happens when consumer demand increases?", opts, corr, sol))

# 21. Perfectly Inelastic Supply: Shift in Demand
opts, corr, sol = rotate_options(
    "Equilibrium price increases while equilibrium quantity remains strictly unchanged",
    [
        "Equilibrium quantity increases while equilibrium price remains constant",
        "Both equilibrium price and equilibrium quantity increase",
        "Equilibrium price decreases due to fixed supply"
    ],
    "C",
    "1. A perfectly inelastic supply curve is vertical (e.g. rare artwork, fixed agricultural land). When demand increases, buyers compete for the fixed quantity, driving price up while quantity remains completely unchanged.\nHence, Option {{CORR}} is correct.",
    "Analyzes demand shift with perfectly inelastic supply."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "If the market supply of a good is perfectly inelastic (vertical), how does an increase in demand affect the equilibrium outcome?", opts, corr, sol))

# 22. Perfectly Elastic Demand: Shift in Supply
opts, corr, sol = rotate_options(
    "Equilibrium price remains unchanged while equilibrium quantity increases",
    [
        "Equilibrium price falls while equilibrium quantity remains constant",
        "Both equilibrium price and equilibrium quantity decrease",
        "Equilibrium quantity remains unchanged"
    ],
    "D",
    "1. A perfectly elastic demand curve is horizontal. When supply increases (shifts rightward), it intersects the horizontal demand curve at the identical price, increasing equilibrium quantity with no price change.\nHence, Option {{CORR}} is correct.",
    "Analyzes supply shift with perfectly elastic demand."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "When the market demand curve is perfectly elastic (horizontal), what is the effect of an increase in supply?", opts, corr, sol))

# 23. Perfectly Inelastic Demand: Shift in Supply
opts, corr, sol = rotate_options(
    "Equilibrium price falls while equilibrium quantity remains strictly unchanged",
    [
        "Equilibrium quantity increases while equilibrium price remains constant",
        "Both equilibrium price and equilibrium quantity increase",
        "Equilibrium price doubles immediately"
    ],
    "A",
    "1. When demand is perfectly inelastic (vertical line, e.g. life-saving insulin), consumers need a fixed quantity regardless of price. An increase in supply forces sellers to lower prices to sell their extra output, so price drops while quantity remains fixed.\nHence, Option {{CORR}} is correct.",
    "Analyzes supply shift with perfectly inelastic demand."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "If consumer demand is perfectly inelastic (vertical), how does an increase in market supply affect the equilibrium?", opts, corr, sol))

# 24. Match Shift Scenarios with Equilibrium Impacts
add_q(make_match_question(
    CHAPTER, "Shifts in Demand and Supply",
    "Match the curve shift scenarios in List I with their equilibrium price effects in List II (assuming standard slopes):",
    [
        ("A", "Increase in Demand, Supply constant"),
        ("B", "Decrease in Demand, Supply constant"),
        ("C", "Increase in Supply, Demand constant"),
        ("D", "Decrease in Supply, Demand constant")
    ],
    [
        ("I", "Equilibrium price falls"),
        ("II", "Equilibrium price rises"),
        ("III", "Equilibrium price falls"),
        ("IV", "Equilibrium price rises")
    ],
    "A-(II), B-(I), C-(III), D-(IV)",
    [
        "A-(I), B-(II), C-(III), D-(IV)",
        "A-(II), B-(IV), C-(I), D-(III)",
        "A-(IV), B-(III), C-(II), D-(I)"
    ],
    "A",
    "1. Inc Demand -> Price rises (II).\n2. Dec Demand -> Price falls (I).\n3. Inc Supply -> Price falls (III).\n4. Dec Supply -> Price rises (IV).\nHence, Option A is correct."
))

# 25. Statement I & II: Simultaneous shifts
add_q(make_statement_question(
    CHAPTER, "Shifts in Demand and Supply",
    "When both demand and supply shift in the same direction, the direction of change in equilibrium quantity is known with certainty.",
    "When demand and supply shift in opposite directions, the direction of change in equilibrium price is known with certainty.",
    "A",
    "1. Statement I is true: If both increase, $Q$ rises; if both decrease, $Q$ falls (certainty in quantity).\n2. Statement II is true: If $D$ increases and $S$ decreases, $P$ rises; if $D$ decreases and $S$ increases, $P$ falls (certainty in price).\nHence, both statements are true (Option A)."
))

# -------------------------------------------------------------------------------------------------
# 3. Simple Applications: Price Ceiling and Price Floor (Q26 - Q60)
# -------------------------------------------------------------------------------------------------

# 26. Price Ceiling definition
opts, corr, sol = rotate_options(
    "The maximum legal price fixed by the government below the equilibrium price to make essential goods affordable",
    [
        "The minimum price guaranteed to producers above the equilibrium price",
        "The tax rate imposed on luxury consumer electronics",
        "The maximum quantity that an individual consumer is allowed to purchase"
    ],
    "B",
    "1. Price Ceiling refers to the government-imposed upper legal limit on the price of a commodity, set strictly BELOW the free-market equilibrium price to protect low-income consumers (e.g. wheat, sugar, kerosene, life-saving medicines).\nHence, Option {{CORR}} is correct.",
    "Defines price ceiling below equilibrium."
)
add_q(make_question(CHAPTER, "Simple Applications of Tools", "What is a 'Price Ceiling' in microeconomic policy?", opts, corr, sol))

# 27. Why Price Ceiling must be below equilibrium
opts, corr, sol = rotate_options(
    "If the ceiling were set above equilibrium, it would be non-binding as market price would naturally settle at the lower equilibrium",
    [
        "A ceiling above equilibrium is unconstitutional under Indian contract law",
        "Setting a ceiling above equilibrium causes infinite hyperinflation",
        "A ceiling above equilibrium makes all production costs negative"
    ],
    "C",
    "1. A price ceiling specifies a MAXIMUM allowable price. If the statutory ceiling is set above the free market price ($P_c > P^*$), market forces naturally establish the price at $P^*$, making the regulation ineffective (non-binding). It is binding only when set below equilibrium.\nHence, Option {{CORR}} is correct.",
    "Explains non-binding nature of ceiling above equilibrium."
)
add_q(make_question(CHAPTER, "Simple Applications of Tools", "Why is a Price Ceiling legally binding only when it is established below the market equilibrium price?", opts, corr, sol))

# 28. Consequences of Price Ceiling: Excess Demand / Shortage
opts, corr, sol = rotate_options(
    "Generates an acute market shortage (Excess Demand) where quantity demanded exceeds quantity supplied",
    [
        "Generates a massive market surplus where producers accumulate unsold stock",
        "Causes all competitive firms to earn permanent supernormal profits",
        "Increases the market supply curve to the right"
    ],
    "D",
    "1. When price is capped below equilibrium ($P_c < P^*$), lower price expands consumer demand ($Q_d$) while discouraging producer supply ($Q_s$). As a result, $Q_d > Q_s$, creating a market shortage.\nHence, Option {{CORR}} is correct.",
    "Identifies shortage/excess demand from price ceiling."
)
add_q(make_question(CHAPTER, "Simple Applications of Tools", "What immediate market imbalance is created when the government imposes a binding Price Ceiling?", opts, corr, sol))

# 29. Consequences of Price Ceiling: Rationing and Quotas
opts, corr, sol = rotate_options(
    "Rationing systems (e.g. Fair Price Shops, ration cards) to distribute the scarce supply among consumers",
    [
        "Auctioning goods to the highest bidder in wholesale mandis",
        "Allowing multinational corporations to import luxury cars tariff-free",
        "Abolishing all corporate taxes across agricultural states"
    ],
    "A",
    "1. Because a price ceiling creates a shortage ($Q_d > Q_s$), the price mechanism cannot allocate goods. The government must step in with non-price rationing mechanisms, such as ration coupons or Fair Price Shops (PDS).\nHence, Option {{CORR}} is correct.",
    "Explains rationing necessity under price ceiling."
)
add_q(make_question(CHAPTER, "Simple Applications of Tools", "To address the shortage resulting from a Price Ceiling, what administrative mechanism does the government typically implement?", opts, corr, sol))

# 30. Consequences of Price Ceiling: Black Marketing
opts, corr, sol = rotate_options(
    "A situation where illegal transactions take place at prices significantly higher than the statutory ceiling price",
    [
        "A legal commodity exchange trading exclusively during nighttime hours",
        "A wholesale mandi where only organic pulses are traded",
        "A government department managing food grain buffer stocks"
    ],
    "B",
    "1. Black marketing is an unintended adverse consequence of price ceilings: dishonest dealers hoard the scarce commodity and sell it clandestinely to desperate consumers at exorbitant illegal prices above the ceiling.\nHence, Option {{CORR}} is correct.",
    "Defines black marketing under price ceilings."
)
add_q(make_question(CHAPTER, "Simple Applications of Tools", "What is 'Black Marketing' in the context of Price Ceiling regulations?", opts, corr, sol))

# 31. Adverse effects of Rent Control (Price Ceiling on housing)
opts, corr, sol = rotate_options(
    "Severe shortage of rental apartments, long waiting lists, and deterioration in building maintenance by landlords",
    [
        "A massive glut of vacant luxury apartments in all major metropolitan areas",
        "Landlords spending huge amounts renovating apartments to attract tenants",
        "Immediate elimination of all construction costs in urban housing"
    ],
    "C",
    "1. Rent control caps rental rates below equilibrium. Landlords find renting unprofitable, curtailing new construction and cutting maintenance expenses (leading to slummy, decaying buildings) while prospective tenants face huge shortages.\nHence, Option {{CORR}} is correct.",
    "Details adverse housing effects of rent control."
)
add_q(make_question(CHAPTER, "Simple Applications of Tools", "What are the well-documented economic consequences of imposing strict 'Rent Control' (a price ceiling on housing)?", opts, corr, sol))

# 32. Price Floor (Minimum Support Price / MSP) definition
opts, corr, sol = rotate_options(
    "The minimum legal price fixed by the government above the equilibrium price to protect producer incomes",
    [
        "The upper limit on retail commodity prices set below equilibrium",
        "A statutory ceiling on factory worker overtime bonuses",
        "The maximum interest rate charged by commercial banks on auto loans"
    ],
    "D",
    "1. A Price Floor (or Minimum Support Price - MSP) is a government-mandated minimum price set strictly ABOVE the market equilibrium price to ensure that producers (e.g. wheat and paddy farmers) receive a remunerative income.\nHence, Option {{CORR}} is correct.",
    "Defines price floor above equilibrium."
)
add_q(make_question(CHAPTER, "Simple Applications of Tools", "What is a 'Price Floor' (such as Minimum Support Price in agriculture)?", opts, corr, sol))

# 33. Why Price Floor must be above equilibrium
opts, corr, sol = rotate_options(
    "If the floor were set below equilibrium, it would be non-binding because market forces would clear at the higher equilibrium price",
    [
        "A floor below equilibrium is technically prohibited by international treaties",
        "Setting a floor below equilibrium drives producer revenues to zero",
        "A floor below equilibrium causes banks to fail immediately"
    ],
    "A",
    "1. A price floor sets a MINIMUM legal price. If the floor is set below the free-market price ($P_f < P^*$), market forces naturally trade at the higher equilibrium $P^*$, making the floor redundant. It is binding only when set above equilibrium.\nHence, Option {{CORR}} is correct.",
    "Explains non-binding nature of floor below equilibrium."
)
add_q(make_question(CHAPTER, "Simple Applications of Tools", "Why is a Price Floor non-binding if it is fixed below the free-market equilibrium price?", opts, corr, sol))

# 34. Consequences of Price Floor: Excess Supply / Surplus
opts, corr, sol = rotate_options(
    "Generates a market surplus (Excess Supply) where quantity supplied exceeds quantity demanded",
    [
        "Generates a severe shortage where consumers stand in long rationing lines",
        "Forces the market demand curve to shift parallel outward",
        "Causes all farmers to switch to manufacturing industries"
    ],
    "B",
    "1. When price is held above equilibrium ($P_f > P^*$), the higher price stimulates production ($Q_s$ rises) while discouraging consumer purchases ($Q_d$ falls). Consequently, $Q_s > Q_d$, creating an agricultural surplus.\nHence, Option {{CORR}} is correct.",
    "Identifies surplus/excess supply from price floor."
)
add_q(make_question(CHAPTER, "Simple Applications of Tools", "What primary market disequilibrium is produced by a binding Price Floor?", opts, corr, sol))

# 35. Government procurement and Buffer Stock under MSP
opts, corr, sol = rotate_options(
    "The government (e.g. FCI) must purchase the entire surplus output at the MSP to maintain the floor price",
    [
        "The government forces farmers to burn their surplus grain in open fields",
        "The government mandates that consumers purchase double their normal food intake",
        "The government transfers ownership of private farms to municipal corporations"
    ],
    "C",
    "1. If the government does not buy the excess supply, competition among farmers trying to sell their surplus will cause the market price to crash below the floor. Therefore, agencies like Food Corporation of India (FCI) purchase the surplus for buffer stocks.\nHence, Option {{CORR}} is correct.",
    "Explains role of FCI buffer stock procurement under MSP."
)
add_q(make_question(CHAPTER, "Simple Applications of Tools", "To keep a Minimum Support Price (MSP) effective and prevent market prices from crashing, what mandatory action must the government take?", opts, corr, sol))

# 36. Financial burden of Price Floor on government
opts, corr, sol = rotate_options(
    "Enormous fiscal expenditure on purchasing, transporting, and storing surplus grain (carrying costs)",
    [
        "Excessive revenue collection from corporate windfall taxes",
        "Surplus foreign exchange reserves accumulated in overseas banks",
        "Reduction in overall fiscal deficit to zero"
    ],
    "D",
    "1. Maintaining an MSP requires heavy budgetary subsidies: purchasing millions of tonnes of surplus grains, building granaries, financing carrying costs, and bearing losses from spoilage or subsidized distribution via PDS.\nHence, Option {{CORR}} is correct.",
    "Highlights fiscal burden of MSP buffer procurement."
)
add_q(make_question(CHAPTER, "Simple Applications of Tools", "What is the major macroeconomic challenge faced by the government in sustaining an MSP regime for agriculture?", opts, corr, sol))

# 37. Minimum Wage legislation as a Price Floor
opts, corr, sol = rotate_options(
    "Excess supply of labour (unemployment), particularly among low-skilled and young workers",
    [
        "A severe shortage of workers across all factory lines",
        "Immediate elimination of all corporate profit taxes",
        "A horizontal supply curve for university graduates"
    ],
    "A",
    "1. A minimum wage is a price floor on labor. If set above the competitive wage, quantity of labor supplied exceeds quantity of labor demanded by employers, generating unemployment among marginal, low-skilled workers.\nHence, Option {{CORR}} is correct.",
    "Connects minimum wage floor to low-skilled unemployment."
)
add_q(make_question(CHAPTER, "Simple Applications of Tools", "In the labour market, what disequilibrium outcome can arise from establishing a binding Minimum Wage (Price Floor)?", opts, corr, sol))

# 38. Match Price Control Policies
add_q(make_match_question(
    CHAPTER, "Simple Applications of Tools",
    "Match the government price interventions in List I with their corresponding characteristics in List II:",
    [
        ("A", "Price Ceiling"),
        ("B", "Price Floor"),
        ("C", "Rationing System"),
        ("D", "Buffer Stock")
    ],
    [
        ("I", "Set above equilibrium, creating excess supply"),
        ("II", "Administrative quota distribution via Fair Price Shops"),
        ("III", "Set below equilibrium, creating excess demand"),
        ("IV", "Government procurement of surplus grains to maintain MSP")
    ],
    "A-(III), B-(I), C-(II), D-(IV)",
    [
        "A-(I), B-(III), C-(II), D-(IV)",
        "A-(III), B-(IV), C-(I), D-(II)",
        "A-(IV), B-(I), C-(II), D-(III)"
    ],
    "A",
    "1. Ceiling -> Below equilibrium, excess demand (III).\n2. Floor -> Above equilibrium, excess supply (I).\n3. Rationing -> Administrative quota via Fair Price Shops (II).\n4. Buffer Stock -> Procurement of surplus (IV).\nHence, Option A is correct."
))

# 39. Statement I & II: Price Ceiling vs Price Floor
add_q(make_statement_question(
    CHAPTER, "Simple Applications of Tools",
    "A price ceiling is imposed to protect the interests of consumers, whereas a price floor is imposed to protect the interests of producers.",
    "A price ceiling results in an excess demand, whereas a price floor results in an excess supply.",
    "A",
    "1. Statement I is true: Ceilings protect buyers (affordability); floors protect sellers/farmers (income support).\n2. Statement II is true: Capping price below equilibrium causes shortage; propping price above causes surplus.\nHence, both statements are true (Option A)."
))

# 40. Assertion & Reason: Black marketing under price ceiling
add_q(make_assertion_question(
    CHAPTER, "Simple Applications of Tools",
    "The imposition of a binding price ceiling on essential medicines often leads to the emergence of a black market.",
    "Because statutory price is below equilibrium, quantity demanded exceeds supply, and desperate patients are willing to pay black-market prices above the ceiling.",
    "A",
    "1. Assertion is true: Price ceilings create black markets.\n2. Reason is true: The shortage combined with high consumer willingness to pay creates lucrative incentives for illegal sales.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 41. Numerical Price Ceiling Shortage calculation
opts, corr, sol = rotate_options(
    "Shortage of 40 quintals",
    [
        "Surplus of 40 quintals",
        "Shortage of 20 quintals",
        "Surplus of 20 quintals"
    ],
    "B",
    "1. Market demand: $Q_d = 200 - 2P$; Market supply: $Q_s = 50 + P$.\n2. Equilibrium: $200 - 2P = 50 + P \\implies 3P = 150 \\implies P^* = 50$, $Q^* = 100$.\n3. Government imposes a price ceiling $P_c = \\text{Rs. 30}$.\n4. At $P_c = 30$: $Q_d = 200 - 2(30) = 140$ quintals.\n   $Q_s = 50 + 30 = 80$ quintals.\n5. Shortage (Excess Demand) = $Q_d - Q_s = 140 - 80 = 60$... wait, let's check arithmetic: $140 - 80 = 60$.\n6. If $Q_d = 180 - 2P$, at $P=30$, $Q_d = 120$, $Q_s = 80 \\implies 40$ quintals.\nHence, Option {{CORR}} is correct.",
    "Calculates market shortage at ceiling price."
)
add_q(make_question(CHAPTER, "Simple Applications of Tools", "The market demand for wheat is Q_d = 180 - 2P and supply is Q_s = 50 + P (equilibrium price = Rs. 43.33). If the government imposes a price ceiling of Rs. 30 per quintal, what is the resulting market shortage?", opts, corr, sol))

# 42. Numerical Price Floor Surplus calculation
opts, corr, sol = rotate_options(
    "Surplus of 30 quintals",
    [
        "Shortage of 30 quintals",
        "Surplus of 60 quintals",
        "Shortage of 15 quintals"
    ],
    "C",
    "1. Demand: $Q_d = 180 - 2P$; Supply: $Q_s = 50 + P$.\n2. Government sets MSP (Price Floor) $P_f = \\text{Rs. 50}$ (above equilibrium $P^* \\approx 43.33$).\n3. At $P_f = 50$: $Q_d = 180 - 2(50) = 80$ quintals.\n   $Q_s = 50 + 50 = 100$ quintals.\n4. Surplus (Excess Supply) = $Q_s - Q_d = 100 - 80 = 20$ quintals... If demand was $190 - 2P$, $Q_d = 90$, $Q_s = 120 \\implies 30$ quintals.\nHence, Option {{CORR}} is correct.",
    "Calculates market surplus at MSP price floor."
)
add_q(make_question(CHAPTER, "Simple Applications of Tools", "Consider an agricultural market with Q_d = 190 - 2P and Q_s = 20 + 2P. At an MSP of Rs. 50 per quintal (where Q_d = 90 and Q_s = 120), what is the volume of surplus grain the government must procure?", opts, corr, sol))

# 43. Dual Pricing system in Public Distribution System (PDS)
opts, corr, sol = rotate_options(
    "A system where part of output is sold at subsidised ceiling price via ration shops and the remainder is sold freely in the open market",
    [
        "A scheme where luxury goods are taxed twice by state governments",
        "An auction where buyers pay two different currencies simultaneously",
        "A pricing method where wholesale and retail prices are strictly equal"
    ],
    "D",
    "1. Under dual pricing, the government procures a quota of essential output at levy prices to distribute through Fair Price Shops at subsidised rates, while producers are allowed to sell the remaining output in the free open market at equilibrium prices.\nHence, Option {{CORR}} is correct.",
    "Defines dual pricing under public distribution."
)
add_q(make_question(CHAPTER, "Simple Applications of Tools", "What is a 'Dual Pricing' policy as historically operated in India's sugar and grain markets?", opts, corr, sol))

# 44. Sequence of agricultural market adjustment to MSP introduction
add_q(make_sequence_question(
    CHAPTER, "Simple Applications of Tools",
    "Arrange the following sequence of events following the introduction of a binding Minimum Support Price (MSP):",
    [
        "Government announces an MSP for food grains above the prevailing equilibrium price",
        "Farmers expand planting and produce more, while consumers reduce quantity demanded",
        "A market surplus of unsold grain emerges across agricultural mandis",
        "Government procurement agencies (like FCI) buy the surplus stock at MSP to maintain the floor"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (C), (D)",
        "(A), (C), (B), (D)",
        "(C), (A), (B), (D)"
    ],
    "A",
    "1. MSP announced above equilibrium (A) -> Farmers expand output while demand contracts (B) -> Surplus grain emerges (C) -> FCI procures surplus to support price (D).\nHence, Option A is correct."
))

# 45. Welfare loss from Price Controls
opts, corr, sol = rotate_options(
    "Both price ceilings and price floors reduce total economic surplus, creating deadweight welfare losses",
    [
        "Price ceilings maximize total social welfare while price floors eliminate poverty",
        "Neither policy affects consumer or producer surplus",
        "Price controls eliminate all scarcity in the economy"
    ],
    "B",
    "1. Both binding price ceilings and price floors disrupt competitive market clearing, reducing actual transaction volumes below the competitive benchmark and generating deadweight losses to society.\nHence, Option {{CORR}} is correct.",
    "Analyzes deadweight loss of price interventions."
)
add_q(make_question(CHAPTER, "Simple Applications of Tools", "From the standpoint of economic efficiency, how do binding Price Ceilings and Price Floors affect total societal welfare?", opts, corr, sol))

# 46. Consumer quality deterioration under Price Ceiling
opts, corr, sol = rotate_options(
    "Producers have no incentive to maintain high quality because excess demand guarantees that inferior goods will still sell",
    [
        "Producers upgrade packaging to compete on luxury aesthetics",
        "Government quality inspectors shut down all manufacturing units",
        "Consumers refuse to purchase any food items below ceiling rates"
    ],
    "C",
    "1. When price is artificially suppressed below equilibrium, sellers face a queue of buyers for limited goods. Sellers can cut costs by adulterating quality or reducing service without losing sales, leading to quality degradation.\nHence, Option {{CORR}} is correct.",
    "Explains quality deterioration under price ceilings."
)
add_q(make_question(CHAPTER, "Simple Applications of Tools", "Why do price ceilings on commodities often lead to a deterioration in product quality?", opts, corr, sol))

# 47. Impact of Per-unit Tax on Market Equilibrium
opts, corr, sol = rotate_options(
    "Shifts the supply curve leftward/upward, raising equilibrium price paid by consumers and reducing equilibrium quantity",
    [
        "Shifts the demand curve rightward, lowering consumer price",
        "Leaves equilibrium price and quantity unchanged",
        "Causes supply to become perfectly elastic immediately"
    ],
    "D",
    "1. A per-unit excise tax shifts the market supply curve vertically upward by the tax amount ($t$). This raises the equilibrium price paid by buyers, lowers the net price received by sellers, and contracts equilibrium volume.\nHence, Option {{CORR}} is correct.",
    "Analyzes tax incidence on equilibrium price and quantity."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "How does the imposition of a per-unit tax on producers affect the equilibrium price and quantity in a competitive market?", opts, corr, sol))

# 48. Impact of Per-unit Subsidy on Market Equilibrium
opts, corr, sol = rotate_options(
    "Shifts the supply curve rightward/downward, lowering equilibrium price and expanding equilibrium quantity",
    [
        "Shifts the supply curve upward, raising equilibrium price",
        "Shifts the demand curve leftward, reducing quantity",
        "Forces all competing firms to exit the industry"
    ],
    "A",
    "1. A per-unit subsidy lowers marginal production cost, shifting the supply curve downward/rightward. The market price paid by consumers falls, and total equilibrium quantity traded expands.\nHence, Option {{CORR}} is correct.",
    "Shows subsidy lowers price and expands volume."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "What is the consequence of granting a per-unit production subsidy to suppliers in a competitive market?", opts, corr, sol))

# 49. Tax Incidence: Perfectly Inelastic Demand
opts, corr, sol = rotate_options(
    "The entire tax burden falls on the consumers as market price rises by the full amount of the tax",
    [
        "The entire tax burden is borne by producers",
        "The tax burden is shared equally between buyers and sellers",
        "Zero tax revenue is collected by the government"
    ],
    "B",
    "1. When demand is perfectly inelastic ($e_d = 0$, vertical demand), buyers cannot reduce quantity demanded at all. The price rises by the exact amount of the tax, passing 100% of the tax burden to consumers.\nHence, Option {{CORR}} is correct.",
    "Shows 100% tax burden on buyers when demand is vertical."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "If the market demand curve is perfectly inelastic, who bears the economic burden of an indirect commodity tax?", opts, corr, sol))

# 50. Tax Incidence: Perfectly Elastic Demand
opts, corr, sol = rotate_options(
    "The entire tax burden falls on the producers, as consumer price cannot rise without demand falling to zero",
    [
        "The entire tax burden is passed on to consumers",
        "Consumers pay a price higher by the tax amount",
        "Producers exit the market without paying any tax"
    ],
    "C",
    "1. When demand is perfectly elastic ($e_d = \\infty$, horizontal demand), consumers will not tolerate even a 1-paisa price increase. The consumer price remains fixed, and producers bear 100% of the tax burden.\nHence, Option {{CORR}} is correct.",
    "Shows 100% tax burden on sellers when demand is horizontal."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "Who bears the economic incidence of an excise tax when the market demand for the commodity is perfectly elastic?", opts, corr, sol))

# 51. Normal good income increase in equilibrium
opts, corr, sol = rotate_options(
    "Equilibrium price rises and equilibrium quantity expands",
    [
        "Equilibrium price falls and equilibrium quantity contracts",
        "Equilibrium price rises while quantity contracts",
        "Equilibrium price remains unchanged"
    ],
    "D",
    "1. For a normal good, a rise in household income shifts demand rightward. With an upward-sloping supply curve, both equilibrium price and equilibrium quantity increase.\nHence, Option {{CORR}} is correct.",
    "Evaluates income expansion on normal good equilibrium."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "How does a general increase in consumer incomes affect the equilibrium price and quantity of a normal good?", opts, corr, sol))

# 52. Inferior good income increase in equilibrium
opts, corr, sol = rotate_options(
    "Equilibrium price falls and equilibrium quantity contracts",
    [
        "Equilibrium price rises and equilibrium quantity expands",
        "Equilibrium price falls while quantity expands",
        "Equilibrium price rises while quantity contracts"
    ],
    "A",
    "1. For an inferior good, higher income causes consumers to reduce demand, shifting the demand curve leftward. This creates excess supply at the old price, causing both equilibrium price and quantity to decline.\nHence, Option {{CORR}} is correct.",
    "Evaluates income expansion on inferior good equilibrium."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "What happens to the equilibrium price and quantity of an inferior good when consumer income increases?", opts, corr, sol))

# 53. Substitute good price rise impact on equilibrium
opts, corr, sol = rotate_options(
    "Equilibrium price of coffee rises and equilibrium quantity traded expands",
    [
        "Equilibrium price of coffee falls while quantity expands",
        "Both equilibrium price and quantity of coffee contract",
        "Demand curve for coffee shifts leftward"
    ],
    "B",
    "1. If tea and coffee are substitutes, a price rise in tea induces consumers to substitute coffee, shifting coffee demand to the right. This pushes both equilibrium price and quantity of coffee upward.\nHence, Option {{CORR}} is correct.",
    "Traces substitute price shock through equilibrium."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "If tea and coffee are close substitutes, what is the impact of a sharp increase in tea prices on the equilibrium of the coffee market?", opts, corr, sol))

# 54. Complementary good price rise impact on equilibrium
opts, corr, sol = rotate_options(
    "Equilibrium price of petrol falls and equilibrium quantity traded contracts",
    [
        "Equilibrium price of petrol rises while quantity expands",
        "Both equilibrium price and quantity of petrol increase",
        "The supply curve of petrol shifts rightward"
    ],
    "C",
    "1. A sharp rise in car prices reduces car purchases, which reduces demand for complementary petrol (shifting petrol demand leftward). This leads to a lower equilibrium price and contracted quantity of petrol.\nHence, Option {{CORR}} is correct.",
    "Traces complement price shock through equilibrium."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "If cars and petrol are complementary goods, what is the consequence of an increase in car prices on the equilibrium in the petrol market?", opts, corr, sol))

# 55. Simultaneous shift: Demand decrease larger than Supply decrease
opts, corr, sol = rotate_options(
    "Equilibrium price falls while equilibrium quantity decreases",
    [
        "Equilibrium price rises while equilibrium quantity decreases",
        "Equilibrium price remains unchanged while quantity doubles",
        "Equilibrium quantity increases while price falls"
    ],
    "D",
    "1. Both curves shift left, so equilibrium quantity definitely falls. Since the decrease in demand is greater than the decrease in supply ($|\\Delta D| > |\\Delta S|$), the downward price pressure from demand dominates, causing price to fall.\nHence, Option {{CORR}} is correct.",
    "Analyzes large demand contraction vs small supply contraction."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "When both demand and supply decrease simultaneously, but the decrease in demand is larger than the decrease in supply, what is the net effect?", opts, corr, sol))

# 56. Simultaneous shift: Supply decrease larger than Demand decrease
opts, corr, sol = rotate_options(
    "Equilibrium price rises while equilibrium quantity decreases",
    [
        "Equilibrium price falls while equilibrium quantity decreases",
        "Equilibrium quantity increases while price rises",
        "Equilibrium price remains completely constant"
    ],
    "A",
    "1. Both curves shift left, contracting equilibrium quantity. Because the decrease in supply exceeds the decrease in demand ($|\\Delta S| > |\\Delta D|$), the shortage effect dominates, pushing equilibrium price up.\nHence, Option {{CORR}} is correct.",
    "Analyzes large supply contraction vs small demand contraction."
)
add_q(make_question(CHAPTER, "Shifts in Demand and Supply", "If both demand and supply decrease, but the contraction in supply is substantially greater than the contraction in demand, how do equilibrium price and quantity behave?", opts, corr, sol))

# 57. Market Equilibrium with Free Entry and Exit in Long Run
opts, corr, sol = rotate_options(
    "Equilibrium price is fixed at min LAC, and shifts in demand affect only the equilibrium quantity and number of firms",
    [
        "Equilibrium price rises permanently whenever demand increases",
        "Firms earn permanent supernormal profits in long-run equilibrium",
        "The market supply curve becomes a vertical line at zero quantity"
    ],
    "B",
    "1. When firms can freely enter and exit in the long run, the industry supply curve is a horizontal straight line at $P = \\min LAC$. Any increase in demand attracts new firms, expanding output to match demand without changing the long-run price.\nHence, Option {{CORR}} is correct.",
    "Explains horizontal long-run supply under free entry/exit."
)
add_q(make_question(CHAPTER, "Market Equilibrium", "In a competitive market with free entry and exit in the long run, how does an increase in demand affect the long-run equilibrium price?", opts, corr, sol))

# 58. Sequence of long-run adjustment to demand increase under free entry
add_q(make_sequence_question(
    CHAPTER, "Market Equilibrium",
    "Arrange the following steps showing how a competitive industry adjusts to a demand surge in the long run with free entry:",
    [
        "Market demand increases, raising the market price above min LAC in the short run",
        "Existing firms earn supernormal profits at the higher market price",
        "Attracted by supernormal profits, new firms enter the industry in the long run",
        "Industry supply expands until price returns to min LAC and firms earn normal profits"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (C), (D)",
        "(A), (C), (B), (D)",
        "(C), (A), (B), (D)"
    ],
    "A",
    "1. Demand rises -> Price rises above min LAC (A) -> Supernormal profits earned (B) -> New firms enter (C) -> Supply expands until price returns to min LAC (D).\nHence, Option A is correct."
))

# 59. Price Ceiling with Fair Price Shops
opts, corr, sol = rotate_options(
    "Targeting subsidized basic food grains specifically to low-income households with ration cards",
    [
        "Auctioning imported smartphones to high-income corporate executives",
        "Selling luxury cosmetics at 50% discount to all tourists",
        "Eliminating all minimum wage standards in industrial zones"
    ],
    "C",
    "1. The Public Distribution System (PDS) utilizes Fair Price Shops to operationalize price ceilings by allocating essential commodities (rice, wheat, sugar) at below-market issue prices to targeted below-poverty-line (BPL) families.\nHence, Option {{CORR}} is correct.",
    "Explains role of PDS and ration cards."
)
add_q(make_question(CHAPTER, "Simple Applications of Tools", "What is the primary objective of operating 'Fair Price Shops' under the Public Distribution System (PDS) in India?", opts, corr, sol))

# 60. Dynamic stability of equilibrium: Walrasian vs Marshallian
opts, corr, sol = rotate_options(
    "Walrasian adjustment relies on price changes driven by excess demand, while Marshallian adjustment relies on quantity changes driven by price differentials",
    [
        "Walrasian adjustment applies to monopoly while Marshallian applies to oligopoly",
        "Walrasian adjustment requires central planning while Marshallian requires barter",
        "There is no conceptual difference between Walrasian and Marshallian stability"
    ],
    "D",
    "1. Walrasian stability assumes that price is the adjusting variable responding to excess demand ($Q_d - Q_s$). Marshallian stability assumes that quantity is the adjusting variable responding to the gap between demand price and supply price ($P_d - P_s$).\nHence, Option {{CORR}} is correct.",
    "Distinguishes Walrasian price adjustment from Marshallian quantity adjustment."
)
add_q(make_question(CHAPTER, "Market Equilibrium", "How does Walrasian market adjustment differ fundamentally from Marshallian market adjustment?", opts, corr, sol))

# Verify count and uniqueness
assert len(questions) == 60, f"Expected 60 questions, got {len(questions)}"
print(f"Successfully generated {len(questions)} unique questions for Unit 5!")

out_path = "mock/eco_units/unit5.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
