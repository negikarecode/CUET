import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.eco_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text
)

CHAPTER = "Balance of Payments and Foreign Exchange"
questions = []
seen = set()

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:80]}")
    seen.add(norm)
    questions.append(q)

print("Generating 60 unique questions for Unit 10: Balance of Payments and Foreign Exchange...")

# =================================================================================================
# 1. Foreign Exchange Rate: Concepts, Demand & Supply, Determination (Q1 - Q25)
# =================================================================================================

# 1. Foreign Exchange Rate definition
opts, corr, sol = rotate_options(
    "The price of one unit of foreign currency expressed in terms of the domestic currency",
    [
        "The interest rate charged by the International Monetary Fund on sovereign debt",
        "The ratio of total exports to total imports in a given calendar year",
        "The statutory minimum gold backing mandated for currency printing"
    ],
    "A",
    "1. Foreign Exchange Rate is the rate at which one currency can be exchanged for another; it is the domestic price of a unit of foreign currency (e.g., $1 = ₹83).\nHence, Option {{CORR}} is correct.",
    "Defines foreign exchange rate as domestic price of foreign currency."
)
add_q(make_question(CHAPTER, "Foreign Exchange Rate", "What is the economic definition of the 'Foreign Exchange Rate'?", opts, corr, sol))

# 2. Currency Depreciation definition
opts, corr, sol = rotate_options(
    "A fall in the value of the domestic currency in terms of foreign currency driven by free market forces of demand and supply",
    [
        "An official reduction in the value of currency decreed by the government under a fixed rate system",
        "A physical decline in the number of paper currency notes printed by the mint",
        "A reduction in commercial bank deposit interest rates"
    ],
    "B",
    "1. Currency Depreciation refers to a decrease in the purchasing power or value of the domestic currency relative to foreign currency under a flexible exchange rate regime, caused by market forces (e.g., when the exchange rate rises from $1 = ₹75 to $1 = ₹83).\nHence, Option {{CORR}} is correct.",
    "Defines currency depreciation under flexible exchange rate."
)
add_q(make_question(CHAPTER, "Exchange Rate Systems", "What is meant by 'Depreciation of Domestic Currency'?", opts, corr, sol))

# 3. Depreciation vs Devaluation
opts, corr, sol = rotate_options(
    "Depreciation occurs under a flexible exchange rate system due to market forces, whereas Devaluation is a deliberate government/central bank policy decision under a fixed exchange rate system",
    [
        "Depreciation is an official government decree, while Devaluation is driven by market forces",
        "Depreciation increases currency value, while Devaluation lowers it",
        "Both terms are interchangeable and operate only under a gold standard"
    ],
    "C",
    "1. Both terms represent a fall in the value of domestic currency in terms of foreign currency.\n2. Depreciation is market-driven (under floating/flexible exchange rate).\n3. Devaluation is an official policy act by the government or monetary authority (under fixed exchange rate).\nHence, Option {{CORR}} is correct.",
    "Distinguishes market-driven depreciation from officially decreed devaluation."
)
add_q(make_question(CHAPTER, "Exchange Rate Systems", "What is the critical distinction between 'Depreciation' and 'Devaluation' of a currency?", opts, corr, sol))

# 4. Currency Appreciation definition
opts, corr, sol = rotate_options(
    "An increase in the value of domestic currency in terms of foreign currency driven by market forces of demand and supply",
    [
        "An official increase in currency value decreed by the central bank under fixed exchange rates",
        "A general rise in the domestic consumer price index across all sectors",
        "An expansion of the total volume of paper currency in circulation"
    ],
    "D",
    "1. Currency Appreciation refers to an increase in the value of the domestic currency relative to foreign currency under a flexible exchange rate regime (e.g., when the exchange rate moves from $1 = ₹83 to $1 = ₹75, fewer rupees are required to buy one dollar).\nHence, Option {{CORR}} is correct.",
    "Defines currency appreciation under flexible exchange rate."
)
add_q(make_question(CHAPTER, "Exchange Rate Systems", "How is 'Appreciation of Domestic Currency' defined?", opts, corr, sol))

# 5. Appreciation vs Revaluation
opts, corr, sol = rotate_options(
    "Appreciation is market-driven under flexible exchange rates, whereas Revaluation is an administrative decree by the government under fixed exchange rates",
    [
        "Appreciation reduces currency value while Revaluation raises it",
        "Revaluation is caused by stock market crashes while Appreciation is caused by gold sales",
        "Both terms refer exclusively to internal inflation within the domestic economy"
    ],
    "A",
    "1. Both represent an increase in the external value of domestic currency.\n2. Appreciation is determined automatically by market forces in a floating regime.\n3. Revaluation is an intentional upward peg adjustment undertaken by the government or central bank under a fixed regime.\nHence, Option {{CORR}} is correct.",
    "Contrasts market-driven appreciation with government revaluation."
)
add_q(make_question(CHAPTER, "Exchange Rate Systems", "What differentiates 'Appreciation' from 'Revaluation' of a currency?", opts, corr, sol))

# 6. Demand for foreign exchange sources
opts, corr, sol = rotate_options(
    "Payment for imported goods, foreign travel/tourism, sending remittances abroad, and purchasing foreign assets",
    [
        "Receipts from merchandise exports, foreign tourist arrivals, and NRI inward remittances",
        "Foreign Direct Investment inflows into domestic equity markets",
        "Central bank buying domestic treasury bills in the open market"
    ],
    "B",
    "1. Residents demand (buy) foreign exchange when they need to make payments abroad: importing goods and services, traveling overseas for tourism or education, sending gifts/remittances to relatives abroad, and purchasing real estate or shares overseas.\nHence, Option {{CORR}} is correct.",
    "Identifies sources of demand for foreign exchange."
)
add_q(make_question(CHAPTER, "Foreign Exchange Market", "Which set of economic activities generates a 'Demand for Foreign Exchange' in India?", opts, corr, sol))

# 7. Supply of foreign exchange sources
opts, corr, sol = rotate_options(
    "Merchandise exports, inward foreign tourism, foreign direct investments (FDI), and remittances received from non-residents",
    [
        "Imports of crude oil, gold, and defense equipment",
        "Indian students paying tuition fees to American universities",
        "Indian tourists vacationing in European countries"
    ],
    "C",
    "1. Foreign exchange flows into an economy (creating supply) from: exports of domestic goods and services, foreign tourists spending money within the country, foreign investments (FDI/FPI), and remittances sent home by citizens working abroad.\nHence, Option {{CORR}} is correct.",
    "Identifies sources of supply of foreign exchange."
)
add_q(make_question(CHAPTER, "Foreign Exchange Market", "Which factors constitute the primary sources of 'Supply of Foreign Exchange' into an economy?", opts, corr, sol))

# 8. Slope of Demand Curve for Foreign Exchange
opts, corr, sol = rotate_options(
    "Downwards, because an increase in the exchange rate makes foreign goods more expensive, reducing imports and hence the quantity of foreign exchange demanded",
    [
        "Upwards, because higher exchange rates encourage domestic citizens to import luxury cars",
        "Horizontal, because demand for foreign exchange is infinitely elastic at all times",
        "Vertical, because foreign exchange requirements are fixed by statutory law"
    ],
    "D",
    "1. There is an inverse relationship between the foreign exchange rate and the quantity demanded of foreign exchange.\n2. When exchange rate rises (e.g., from ₹70/$ to ₹85/$), foreign products become more expensive for domestic residents, which contracts imports and decreases the demand for foreign currency. Hence, the demand curve slopes downwards from left to right.\nHence, Option {{CORR}} is correct.",
    "Explains downward slope of foreign exchange demand curve."
)
add_q(make_question(CHAPTER, "Foreign Exchange Market", "Why does the Demand Curve for Foreign Exchange slope downwards from left to right?", opts, corr, sol))

# 9. Slope of Supply Curve of Foreign Exchange
opts, corr, sol = rotate_options(
    "Upwards, because a higher exchange rate makes domestic goods cheaper to foreign buyers, boosting exports and increasing the inflow of foreign currency",
    [
        "Downwards, because higher exchange rates discourage foreign investors from entering the country",
        "Vertical, because supply is rigidly determined by foreign central banks",
        "Horizontal, because domestic producers sell at fixed dollar prices"
    ],
    "A",
    "1. There is a direct (positive) relationship between the exchange rate and the supply of foreign exchange.\n2. When the exchange rate rises (domestic currency depreciates), domestic goods become cheaper in terms of foreign currency, causing foreign demand for exports to rise, which generates a larger inflow (supply) of foreign currency. Thus, the supply curve slopes upwards.\nHence, Option {{CORR}} is correct.",
    "Explains upward slope of foreign exchange supply curve."
)
add_q(make_question(CHAPTER, "Foreign Exchange Market", "Why does the Supply Curve of Foreign Exchange slope upwards from left to right?", opts, corr, sol))

# 10. Impact of rise in demand for foreign exchange
opts, corr, sol = rotate_options(
    "Depreciation of the domestic currency (exchange rate rises)",
    [
        "Appreciation of the domestic currency (exchange rate falls)",
        "An immediate decline in domestic export volumes",
        "Complete exhaustion of commercial bank domestic deposits"
    ],
    "B",
    "1. An increase in demand for foreign currency shifts the demand curve to the right.\n2. With an upward-sloping supply curve, the equilibrium exchange rate rises (e.g., from ₹75/$ to ₹82/$), meaning the domestic currency has depreciated.\nHence, Option {{CORR}} is correct.",
    "Shows that rightward shift in foreign exchange demand causes domestic currency depreciation."
)
add_q(make_question(CHAPTER, "Exchange Rate Determination", "In a flexible exchange rate regime, what is the impact of an autonomous increase in the domestic demand for foreign exchange?", opts, corr, sol))

# 11. Impact of increase in supply of foreign exchange
opts, corr, sol = rotate_options(
    "Appreciation of the domestic currency (exchange rate falls)",
    [
        "Depreciation of the domestic currency (exchange rate rises)",
        "A surge in the domestic interest rate",
        "A decrease in national foreign exchange reserves"
    ],
    "C",
    "1. An increase in foreign exchange supply (e.g., surge in foreign portfolio investment or exports) shifts the supply curve to the right.\n2. This lowers the equilibrium exchange rate (e.g., from ₹83/$ to ₹78/$), which represents an appreciation of the domestic currency.\nHence, Option {{CORR}} is correct.",
    "Shows that rightward shift in foreign exchange supply causes domestic currency appreciation."
)
add_q(make_question(CHAPTER, "Exchange Rate Determination", "If foreign tourists flock into India in record numbers, increasing foreign exchange inflows, what will be the effect on the value of the Indian Rupee in a floating regime?", opts, corr, sol))

# 12. Impact of currency depreciation on foreign trade
opts, corr, sol = rotate_options(
    "It stimulates exports by making domestic goods relatively cheaper abroad, while discouraging imports by making foreign goods costlier",
    [
        "It reduces exports and encourages imports simultaneously",
        "It makes both exports and imports prohibitively expensive",
        "It has zero effect on international trade volumes"
    ],
    "D",
    "1. When the rupee depreciates (e.g., from ₹70/$ to ₹80/$), foreigners receive more rupees per dollar, making Indian goods cheaper in international markets, boosting exports.\n2. Conversely, Indian importers must pay more rupees per dollar, making imported goods expensive and discouraging imports.\nHence, Option {{CORR}} is correct.",
    "Explains depreciation promotes exports and curtails imports."
)
add_q(make_question(CHAPTER, "Exchange Rate Impacts", "How does a 'Depreciation of Domestic Currency' impact an economy's exports and imports?", opts, corr, sol))

# 13. Managed Floating Exchange Rate System
opts, corr, sol = rotate_options(
    "An exchange rate system where market forces determine the rate, but the central bank intervenes by buying or selling foreign exchange to curb excessive volatility ('Dirty Floating')",
    [
        "A system where exchange rates are rigidly fixed to a specific quantity of physical gold",
        "A system where exchange rates are voted on weekly by member states of the United Nations",
        "A completely free floating regime where central bank reserves are legally capped at zero"
    ],
    "A",
    "1. Under a Managed Floating Exchange Rate System (often termed 'Dirty Floating'), the exchange rate is primarily determined by market demand and supply forces, but the central bank actively buys or sells foreign currency to stabilize the rate within a desired band and prevent speculative volatility.\nHence, Option {{CORR}} is correct.",
    "Defines managed floating / dirty floating."
)
add_q(make_question(CHAPTER, "Exchange Rate Systems", "What is meant by a 'Managed Floating Exchange Rate System' (Dirty Floating)?", opts, corr, sol))

# 14. Spot Market vs Forward Market
opts, corr, sol = rotate_options(
    "Spot market handles daily current transactions executed immediately, while the forward market handles transactions contracted today for settlement on a specified future date",
    [
        "Spot market trades only gold, while forward market trades paper currency",
        "Spot market is restricted to central banks, while forward market is open to retail shoppers",
        "Spot market transactions carry zero foreign exchange risk"
    ],
    "B",
    "1. Spot Market: The market for immediate delivery and settlement of foreign exchange (usually within two business days).\n2. Forward Market: The market where purchase and sale of foreign exchange are contracted today at an agreed forward rate for delivery on a future date, primarily used for hedging against currency risk.\nHence, Option {{CORR}} is correct.",
    "Contrasts spot market (immediate settlement) with forward market (future delivery)."
)
add_q(make_question(CHAPTER, "Foreign Exchange Market", "What is the distinction between the 'Spot Market' and the 'Forward Market' for foreign exchange?", opts, corr, sol))

# 15. Hedging Function of foreign exchange market
opts, corr, sol = rotate_options(
    "Locking in a forward exchange rate today to protect businesses against adverse exchange rate fluctuations in future international trade commitments",
    [
        "Printing extra currency notes to plant hedges along national boundaries",
        "Lending funds to foreign commercial banks at below-market interest rates",
        "Transferring gold bullion between commercial bank vaults"
    ],
    "C",
    "1. The Hedging Function provides protection against exchange rate risk. Importers and exporters enter into forward contracts to lock in an exchange rate, avoiding potential losses from unpredictable future currency fluctuations.\nHence, Option {{CORR}} is correct.",
    "Defines hedging function of foreign exchange market."
)
add_q(make_question(CHAPTER, "Foreign Exchange Market", "What is the 'Hedging Function' performed by the foreign exchange market?", opts, corr, sol))

# 16. Three functions of foreign exchange market
opts, corr, sol = rotate_options(
    "Transfer function, Credit function, and Hedging function",
    [
        "Monopoly function, Taxation function, and Reserve function",
        "Auditing function, Clearing function, and Statutory function",
        "Production function, Consumption function, and Capital function"
    ],
    "D",
    "1. The foreign exchange market performs three core functions:\n   (i) Transfer Function: transferring purchasing power between countries.\n   (ii) Credit Function: providing trade credit for international commerce.\n   (iii) Hedging Function: protecting traders against foreign exchange risks via forward contracts.\nHence, Option {{CORR}} is correct.",
    "Lists the three primary functions of foreign exchange market."
)
add_q(make_question(CHAPTER, "Foreign Exchange Market", "Which three functions constitute the primary economic roles of the Foreign Exchange Market?", opts, corr, sol))

# 17. Fixed Exchange Rate System: Pegging and Parity Value
opts, corr, sol = rotate_options(
    "The government fixes its exchange rate to an external standard (gold or a major currency like US Dollar) and central bank maintains it via reserve interventions",
    [
        "Exchange rate fluctuates freely each second based purely on computer trading algorithms",
        "Exchange rates are set equal to the domestic commercial bank lending rate",
        "All foreign trade must be conducted in physical barter"
    ],
    "A",
    "1. Under a Fixed Exchange Rate System (such as the Bretton Woods System or Gold Standard), the monetary authority pegs the domestic currency to an external anchor (a commodity like gold or another currency). The central bank buys or sells foreign currency to maintain this official par value.\nHence, Option {{CORR}} is correct.",
    "Defines fixed exchange rate system and pegging."
)
add_q(make_question(CHAPTER, "Exchange Rate Systems", "What is the operating principle of a 'Fixed Exchange Rate System'?", opts, corr, sol))

# 18. Match Question: Exchange Rate Terminologies
add_q(make_match_question(
    CHAPTER,
    "Exchange Rate Concepts",
    "Match the currency movements in List I with their defining economic conditions in List II:",
    [
        ("A", "Depreciation"),
        ("B", "Devaluation"),
        ("C", "Appreciation"),
        ("D", "Revaluation")
    ],
    [
        ("(I)", "Market-driven fall in currency value under flexible system"),
        ("(II)", "Official decrease in currency value decreed under fixed system"),
        ("(III)", "Market-driven rise in currency value under flexible system"),
        ("(IV)", "Official increase in currency value decreed under fixed system")
    ],
    "A-(I), B-(II), C-(III), D-(IV)",
    [
        "A-(II), B-(I), C-(IV), D-(III)",
        "A-(I), B-(III), C-(II), D-(IV)",
        "A-(III), B-(IV), C-(I), D-(II)"
    ],
    "A",
    "1. Depreciation: Market fall (flexible) -> A-(I)\n2. Devaluation: Official fall (fixed) -> B-(II)\n3. Appreciation: Market rise (flexible) -> C-(III)\n4. Revaluation: Official rise (fixed) -> D-(IV)\nHence, Option A is correct."
))

# 19. Statement Question: Depreciation impact
add_q(make_statement_question(
    CHAPTER,
    "Exchange Rate Impacts",
    "Depreciation of the Indian Rupee against the US Dollar benefits Indian software exporters whose service contracts are billed in US Dollars.",
    "Depreciation of the Indian Rupee increases the cost of overseas education and foreign travel for Indian citizens.",
    "A",
    "1. Statement I is TRUE: When the rupee depreciates, exporters receive more rupees for every dollar billed, boosting exporter earnings.\n2. Statement II is TRUE: Indian families must spend more rupees to purchase the same amount of US dollars required for university tuition fees and travel abroad.\nHence, Both Statement I and Statement II are true (Option A)."
))

# 20. Assertion Reason: Speculation in foreign exchange
add_q(make_assertion_question(
    CHAPTER,
    "Foreign Exchange Market",
    "Speculators purchase a foreign currency when they anticipate that it will appreciate in the near future.",
    "Speculators earn capital profits by buying an asset at a lower price and subsequently selling it at a higher exchange rate.",
    "A",
    "1. Assertion (A) is TRUE: Currency speculation involves buying undervalued currencies in anticipation of appreciation.\n2. Reason (R) is TRUE and correctly explains (A): The motive of currency speculation is to earn a capital gain from expected future exchange rate movements.\nHence, Both (A) and (R) are true and (R) is the correct explanation of (A) (Option A)."
))

# 21. Real Exchange Rate vs Nominal Exchange Rate
opts, corr, sol = rotate_options(
    "Real exchange rate adjusts the nominal exchange rate for the relative price levels (inflation rates) between the domestic and foreign countries",
    [
        "Real exchange rate is the price of gold, while nominal exchange rate is the price of silver",
        "Real exchange rate applies to physical currency notes, while nominal exchange rate applies to checks",
        "Real exchange rate is fixed by Parliament, while nominal exchange rate is fixed by RBI"
    ],
    "B",
    "1. Nominal Exchange Rate is the relative price of currencies (e.g., ₹/$) without adjusting for purchasing power.\n2. Real Exchange Rate (RER) = e × (P_f / P), where 'e' is nominal exchange rate, P_f is foreign price level, and P is domestic price level. It measures the relative price of foreign goods in terms of domestic goods.\nHence, Option {{CORR}} is correct.",
    "Distinguishes Real Exchange Rate from Nominal Exchange Rate."
)
add_q(make_question(CHAPTER, "Foreign Exchange Rate", "What is the relationship between the 'Nominal Exchange Rate' and the 'Real Exchange Rate'?", opts, corr, sol))

# 22. Numerical: Exchange rate calculation from trade
opts, corr, sol = rotate_options(
    "₹80 per US Dollar",
    [
        "₹75 per US Dollar",
        "₹85 per US Dollar",
        "₹0.0125 per US Dollar"
    ],
    "C",
    "1. An Indian importer purchases goods worth $5,000 and pays ₹4,00,000 to acquire the dollars.\n2. Exchange rate = Total Rupees / Total Dollars = 4,00,000 / 5,000 = ₹80 per US Dollar.\nHence, Option {{CORR}} is correct.",
    "Calculates exchange rate = 400000 / 5000 = 80 Rs/USD."
)
add_q(make_question(CHAPTER, "Foreign Exchange Calculations", "An Indian importer must pay ₹4,00,000 to purchase $5,000 worth of medical equipment from the United States. What is the prevailing exchange rate?", opts, corr, sol))

# 23. Numerical: Currency change identification
opts, corr, sol = rotate_options(
    "The Indian Rupee has depreciated by ₹10 per dollar (the US Dollar has appreciated)",
    [
        "The Indian Rupee has appreciated by ₹10 per dollar",
        "The Indian Rupee has devalued by legal statute",
        "There is zero change in the purchasing power of the rupee"
    ],
    "D",
    "1. When the exchange rate shifts from $1 = ₹70 to $1 = ₹80, an Indian buyer must surrender more rupees (₹80 vs ₹70) to obtain one dollar.\n2. This signifies a decline in the value of the rupee, which is a Depreciation of the Indian Rupee.\nHence, Option {{CORR}} is correct.",
    "Identifies movement from 70 to 80 as depreciation of rupee."
)
add_q(make_question(CHAPTER, "Exchange Rate Impacts", "If the exchange rate moves from $1 = ₹70 to $1 = ₹80 in a market-determined system, what has occurred?", opts, corr, sol))

# 24. Foreign Exchange Reserves role in Managed Floating
opts, corr, sol = rotate_options(
    "The central bank sells foreign exchange from its reserves to arrest rapid depreciation, or buys foreign currency to prevent excessive appreciation",
    [
        "The central bank burns foreign currency to create domestic price deflation",
        "The central bank loans all its reserves to private real estate developers",
        "The central bank uses reserves exclusively to pay salaries of foreign ambassadors"
    ],
    "A",
    "1. Under managed floating, when the domestic currency depreciates excessively, the central bank intervenes by selling dollars from its reserves into the market (increasing dollar supply to curb depreciation). When the domestic currency appreciates sharply, it buys dollars (adding to reserves) to preserve export competitiveness.\nHence, Option {{CORR}} is correct.",
    "Explains how central bank uses foreign exchange reserves to manage exchange rate."
)
add_q(make_question(CHAPTER, "Central Bank Operations", "How does the Central Bank use its 'Foreign Exchange Reserves' under a Managed Floating regime?", opts, corr, sol))

# 25. Sequence Question: Impact of rising domestic inflation on exchange rate
add_q(make_sequence_question(
    CHAPTER,
    "Exchange Rate Mechanism",
    "Arrange the sequential steps in the correct order describing how higher domestic inflation leads to currency depreciation under flexible exchange rates:",
    [
        "Domestic price levels rise rapidly relative to prices in foreign trading partners.",
        "Domestic exports become uncompetitive abroad, reducing foreign demand and decreasing foreign exchange supply.",
        "Foreign imported goods become relatively cheaper, increasing domestic demand for imports and foreign exchange.",
        "A shortfall of foreign exchange supply relative to demand develops in the foreign exchange market.",
        "The market-clearing exchange rate rises, causing the domestic currency to depreciate."
    ],
    "(A) -> (B) -> (C) -> (D) -> (E)",
    [
        "(B) -> (A) -> (C) -> (E) -> (D)",
        "(A) -> (C) -> (B) -> (E) -> (D)",
        "(C) -> (B) -> (A) -> (D) -> (E)"
    ],
    "A",
    "1. Relative price increase -> (A) High domestic prices -> (B) Fall in exports/supply of FX -> (C) Rise in imports/demand for FX -> (D) Disequilibrium in FX market -> (E) Currency depreciation restores equilibrium.\nHence, Option A is correct."
))

# =================================================================================================
# 2. Balance of Payments (BoP): Current Account, Capital Account, Balance of Trade (Q26 - Q50)
# =================================================================================================

# 26. Balance of Payments definition
opts, corr, sol = rotate_options(
    "A systematic accounting record of all economic transactions between the residents of a country and the rest of the world during a given financial year",
    [
        "A ledger recording domestic inter-state tax settlements within a federation",
        "The total value of physical currency printed by the monetary authority",
        "The difference between total central tax revenue and fiscal borrowings"
    ],
    "B",
    "1. Balance of Payments (BoP) is a comprehensive statistical statement that systematically records all economic transactions between residents of the reporting country and the rest of the world over a specified period (typically a fiscal year).\nHence, Option {{CORR}} is correct.",
    "Defines Balance of Payments."
)
add_q(make_question(CHAPTER, "Balance of Payments", "What is the definition of the 'Balance of Payments' (BoP) of an economy?", opts, corr, sol))

# 27. Accounting rule: Credit vs Debit in BoP
opts, corr, sol = rotate_options(
    "All transactions leading to an inflow of foreign exchange are recorded as Credits (+), while transactions leading to an outflow are recorded as Debits (-)",
    [
        "Inflows are recorded as Debits (-), while outflows are recorded as Credits (+)",
        "Only merchandise trade is credited, while all services are debited",
        "Government loans are credited, while private sector investments are excluded"
    ],
    "C",
    "1. BoP follows double-entry bookkeeping:\n   - Credit items (+): Any transaction that brings foreign exchange into the country (e.g., exports, foreign investment inflows, borrowings from abroad).\n   - Debit items (-): Any transaction that results in an outflow of foreign exchange (e.g., imports, lending abroad, buying foreign shares).\nHence, Option {{CORR}} is correct.",
    "Explains Credit (inflows) and Debit (outflows) in BoP accounting."
)
add_q(make_question(CHAPTER, "BoP Accounting", "What is the standard accounting rule for recording transactions on the Credit and Debit sides of the Balance of Payments?", opts, corr, sol))

# 28. Current Account definition and components
opts, corr, sol = rotate_options(
    "Transactions involving trade in visible merchandise, trade in invisible services, and unilateral transfer payments that do not alter the external asset/liability status",
    [
        "Borrowings, external commercial loans, and foreign direct investment",
        "Official gold sales and changes in SDR allocations by the IMF",
        "Domestic mortgage loans advanced by commercial banks"
    ],
    "D",
    "1. Current Account records transactions relating to the export and import of goods (visibles), services (invisibles: banking, shipping, software), factor income (interest, dividends), and unilateral transfers (gifts, remittances).\n2. Critically, current account transactions DO NOT affect the asset or liability position of the country.\nHence, Option {{CORR}} is correct.",
    "Defines Current Account and its constituent items."
)
add_q(make_question(CHAPTER, "Current Account", "Which categories of international transactions are recorded in the 'Current Account' of the Balance of Payments?", opts, corr, sol))

# 29. Capital Account definition
opts, corr, sol = rotate_options(
    "Transactions that cause a change in the assets or liabilities of the residents of a country or its government relative to the rest of the world",
    [
        "Transactions recording the routine export and import of agricultural commodities",
        "Unilateral humanitarian food gifts received during natural disasters",
        "Salaries paid to domestic consulate staff working overseas"
    ],
    "A",
    "1. The Capital Account of BoP records all transactions between residents of a country and the rest of the world that cause a change in the asset or liability status of the nation (e.g., Foreign Direct Investment, external commercial borrowing, NRI deposits).\nHence, Option {{CORR}} is correct.",
    "Defines Capital Account as transactions changing assets or liabilities."
)
add_q(make_question(CHAPTER, "Capital Account", "What is the defining criterion of transactions included in the 'Capital Account' of the Balance of Payments?", opts, corr, sol))

# 30. Balance of Trade (BoT) formula
opts, corr, sol = rotate_options(
    "Value of Merchandise Exports - Value of Merchandise Imports (Visible Exports - Visible Imports)",
    [
        "Total Current Account Receipts - Total Current Account Payments",
        "Total Visible Exports + Total Invisible Exports",
        "Capital Account Inflows - Capital Account Outflows"
    ],
    "B",
    "1. Balance of Trade (BoT), also known as the Trade Balance or Merchandise Balance, is the difference between the money value of visible merchandise exports and visible merchandise imports:\n   BoT = Value of Visible Exports - Value of Visible Imports.\nHence, Option {{CORR}} is correct.",
    "States formula for Balance of Trade (visible exports minus visible imports)."
)
add_q(make_question(CHAPTER, "Balance of Trade", "How is the 'Balance of Trade' (BoT) calculated?", opts, corr, sol))

# 31. BoT vs Current Account Balance
opts, corr, sol = rotate_options(
    "Balance of Trade includes only visible merchandise goods, whereas Current Account includes both visible goods, invisible services, factor incomes, and unilateral transfers",
    [
        "Balance of Trade includes capital flows, while Current Account excludes trade in goods",
        "Balance of Trade is broader in scope than the Current Account",
        "Both are identical terms referring strictly to international tourism"
    ],
    "C",
    "1. BoT is a narrow sub-component of the Current Account.\n2. BoT accounts strictly for tangible physical goods (visibles).\n3. Current Account = Balance of Trade + Balance of Invisibles (Services + Income + Transfers).\nHence, Option {{CORR}} is correct.",
    "Contrasts narrow Balance of Trade with comprehensive Current Account."
)
add_q(make_question(CHAPTER, "Balance of Trade", "What is the primary difference between the 'Balance of Trade' and the 'Current Account Balance'?", opts, corr, sol))

# 32. FDI vs FPI (FII)
opts, corr, sol = rotate_options(
    "FDI involves purchasing physical assets or a controlling equity stake with active managerial control, whereas FPI involves purchasing stocks/bonds purely for financial return without controlling interest",
    [
        "FDI is recorded on Current Account while FPI is recorded on Capital Account",
        "FDI is undertaken exclusively by the World Bank while FPI is private",
        "FDI creates debt liabilities while FPI reduces sovereign debt"
    ],
    "D",
    "1. Foreign Direct Investment (FDI): Investment in physical production facilities, joint ventures, or acquiring a substantial voting equity stake (>10%) that gives the foreign investor direct managerial control (e.g., Walmart investing in Flipkart).\n2. Foreign Portfolio Investment (FPI/FII): Investment in financial assets (equities, bonds) purely for financial dividends and capital gains without managerial participation.\nHence, Option {{CORR}} is correct.",
    "Distinguishes FDI (managerial control) from FPI (passive portfolio financial return)."
)
add_q(make_question(CHAPTER, "Capital Account", "How does 'Foreign Direct Investment' (FDI) differ fundamentally from 'Foreign Portfolio Investment' (FPI)?", opts, corr, sol))

# 33. Components of Invisibles in Current Account
opts, corr, sol = rotate_options(
    "Non-factor services (software, tourism), factor income (interest, profit, dividends), and current transfers (remittances, gifts)",
    [
        "Merchandise oil imports, gold bars, and industrial machinery",
        "External Commercial Borrowings and loans from the Asian Development Bank",
        "Sales of public enterprise shares to multinational corporations"
    ],
    "A",
    "1. 'Invisibles' on the Current Account comprise three primary streams:\n   (i) Non-factor services: commercial services like IT/software, transportation, tourism, insurance.\n   (ii) Factor income (Income from investment and compensation of employees): interest, profits, and dividends.\n   (iii) Current transfers: unilateral gifts, donations, and personal remittances from migrant workers.\nHence, Option {{CORR}} is correct.",
    "Lists components of invisibles: services, factor income, transfers."
)
add_q(make_question(CHAPTER, "Current Account", "Which three components comprise 'Invisibles' on the Current Account of the Balance of Payments?", opts, corr, sol))

# 34. Classification: Software export by Infosys to a US client
opts, corr, sol = rotate_options(
    "Credit side of Current Account, under export of invisible services",
    [
        "Debit side of Current Account, under visible merchandise imports",
        "Credit side of Capital Account, under Foreign Direct Investment",
        "Debit side of Capital Account, under external commercial lending"
    ],
    "B",
    "1. Exporting software involves providing an invisible commercial service to foreign clients that brings foreign exchange into India.\n2. Inflows of foreign exchange are recorded as Credits (+), and service trade is recorded on the Current Account.\nHence, Option {{CORR}} is correct.",
    "Classifies software export as Credit on Current Account (invisible services)."
)
add_q(make_question(CHAPTER, "BoP Transactions", "How is the export of software services by an Indian IT company to an American corporation recorded in India's BoP?", opts, corr, sol))

# 35. Classification: Purchase of shares of a UK firm by Tata Sons
opts, corr, sol = rotate_options(
    "Debit side of Capital Account, because it represents an outflow of foreign exchange to acquire foreign assets",
    [
        "Credit side of Current Account, under export of financial services",
        "Debit side of Current Account, under visible import of luxury goods",
        "Credit side of Capital Account, because Indian equity holdings expand"
    ],
    "C",
    "1. An Indian company purchasing equity in a foreign company acquires a foreign asset, which involves an outflow of foreign exchange.\n2. Outflows are debited (-), and transactions affecting asset/liability claims are recorded on the Capital Account.\nHence, Option {{CORR}} is correct.",
    "Classifies foreign asset purchase as Debit on Capital Account."
)
add_q(make_question(CHAPTER, "BoP Transactions", "How is the purchase of shares of an overseas company by an Indian resident firm recorded in India's Balance of Payments?", opts, corr, sol))

# 36. Classification: Remittances sent home by NRIs in UAE
opts, corr, sol = rotate_options(
    "Credit side of Current Account, as a unilateral current transfer payment",
    [
        "Credit side of Capital Account, as an external commercial borrowing",
        "Debit side of Current Account, as import of labor services",
        "Debit side of Capital Account, as repatriation of foreign portfolio capital"
    ],
    "D",
    "1. Remittances sent by non-resident Indians (NRIs) to their families are unilateral transfers (unrequited receipts with no obligation to repay).\n2. They bring foreign exchange into India, recorded as a Credit (+) on the Current Account.\nHence, Option {{CORR}} is correct.",
    "Classifies inward remittances as Credit on Current Account (transfers)."
)
add_q(make_question(CHAPTER, "BoP Transactions", "How are personal remittances sent home by Indian workers residing abroad recorded in India's BoP?", opts, corr, sol))

# 37. Autonomous vs Accommodating Transactions
opts, corr, sol = rotate_options(
    "Autonomous transactions are undertaken for private economic/profit motives independent of BoP status, while Accommodating transactions are undertaken by monetary authorities to bridge the resulting BoP deficit or surplus",
    [
        "Autonomous transactions are illegal transactions, while Accommodating transactions are authorized",
        "Autonomous transactions operate only in gold, while Accommodating transactions use paper money",
        "Autonomous transactions are recorded on Capital Account, while Accommodating transactions are on Current Account"
    ],
    "A",
    "1. Autonomous Transactions ('Above the Line'): Economic transactions undertaken by individuals, firms, or government for independent economic motives (profit, utility) without regard to the BoP position.\n2. Accommodating Transactions ('Below the Line'): Compensatory financing transactions carried out by central monetary authorities (drawing down reserves, IMF loans) explicitly to finance the gap arising from autonomous transactions.\nHence, Option {{CORR}} is correct.",
    "Contrasts autonomous ('above the line') with accommodating ('below the line') transactions."
)
add_q(make_question(CHAPTER, "BoP Equilibrium", "What is the crucial economic difference between 'Autonomous' and 'Accommodating' transactions in the Balance of Payments?", opts, corr, sol))

# 38. 'Above the line' vs 'Below the line'
opts, corr, sol = rotate_options(
    "Autonomous transactions are 'Above the Line', while Accommodating transactions are 'Below the Line'",
    [
        "Accommodating transactions are 'Above the Line', while Autonomous transactions are 'Below the Line'",
        "Merchandise exports are 'Above the Line', while services are 'Below the Line'",
        "Direct taxes are 'Above the Line', while indirect taxes are 'Below the Line'"
    ],
    "B",
    "1. In BoP accounting terminology, Autonomous transactions (which determine whether there is a surplus or deficit) are designated as 'Above the Line'.\n2. Accommodating transactions (which settle and finance the surplus/deficit) are designated as 'Below the Line'.\nHence, Option {{CORR}} is correct.",
    "Identifies autonomous as 'above the line' and accommodating as 'below the line'."
)
add_q(make_question(CHAPTER, "BoP Equilibrium", "Which transactions in the Balance of Payments are commonly known as 'Above the Line' and 'Below the Line'?", opts, corr, sol))

# 39. Cause of BoP Deficit
opts, corr, sol = rotate_options(
    "Autonomous receipts fall short of autonomous payments (Autonomous Receipts < Autonomous Payments)",
    [
        "Accommodating receipts exceed accommodating payments",
        "Visible exports are exactly equal to visible imports",
        "Capital account transactions equal zero"
    ],
    "C",
    "1. An economy experiences a Balance of Payments Deficit when total autonomous receipts (inflows) are less than total autonomous payments (outflows). The shortfall must be financed by accommodating measures, such as depleting official foreign exchange reserves.\nHence, Option {{CORR}} is correct.",
    "Defines BoP Deficit as autonomous receipts less than autonomous payments."
)
add_q(make_question(CHAPTER, "BoP Equilibrium", "When is an economy said to be in a 'Balance of Payments Deficit'?", opts, corr, sol))

# 40. Official Reserve Transactions (ORT)
opts, corr, sol = rotate_options(
    "Transactions conducted by the Central Bank involving its foreign exchange reserves to finance a BoP deficit or absorb a BoP surplus",
    [
        "The mandatory cash reserves maintained by commercial banks with the central bank",
        "The statutory liquidity ratio maintained in government securities",
        "Private commercial bank loans advanced to foreign export corporations"
    ],
    "D",
    "1. Official Reserve Transactions (ORT) are accommodating transactions executed by the central bank. When autonomous payments exceed autonomous receipts (BoP deficit), the central bank sells foreign exchange from its reserves (decrease in reserves = credit item) to balance the overall account.\nHence, Option {{CORR}} is correct.",
    "Defines Official Reserve Transactions conducted by central bank."
)
add_q(make_question(CHAPTER, "BoP Accounting", "What are 'Official Reserve Transactions' (ORT) in the Balance of Payments?", opts, corr, sol))

# 41. Accounting Balance of BoP
opts, corr, sol = rotate_options(
    "BoP always balances in an accounting sense because every international transaction is recorded using double-entry bookkeeping where Credits identically equal Debits",
    [
        "BoP always balances because all foreign countries maintain identical trade tariffs",
        "BoP never balances in practice and always carries an unresolvable error",
        "BoP balances only when national income reaches full employment"
    ],
    "A",
    "1. In an accounting sense, the Balance of Payments must always balance (Current Account Balance + Capital Account Balance + ORT + Errors & Omissions = 0) because of the double-entry bookkeeping convention where every credit entry has an offsetting debit entry.\nHence, Option {{CORR}} is correct.",
    "Explains why BoP always balances in an accounting sense via double-entry system."
)
add_q(make_question(CHAPTER, "BoP Accounting", "Why does the Balance of Payments ALWAYS balance in an accounting sense?", opts, corr, sol))

# 42. Numerical: Balance of Trade calculation
opts, corr, sol = rotate_options(
    "-₹30,000 crore (Trade Deficit of ₹30,000 crore)",
    [
        "+₹30,000 crore (Trade Surplus)",
        "-₹50,000 crore",
        "+₹1,70,000 crore"
    ],
    "B",
    "1. Balance of Trade (BoT) = Visible Merchandise Exports - Visible Merchandise Imports.\n2. BoT = ₹70,000 crore - ₹1,00,000 crore = -₹30,000 crore.\n3. The negative sign denotes a Merchandise Trade Deficit of ₹30,000 crore.\nHence, Option {{CORR}} is correct.",
    "Calculates BoT = 70000 - 100000 = -30000 crore."
)
add_q(make_question(CHAPTER, "BoP Calculations", "An economy exports merchandise goods valued at ₹70,000 crore and imports merchandise goods valued at ₹1,00,000 crore during a year. What is the Balance of Trade?", opts, corr, sol))

# 43. Numerical: Current Account Balance calculation
opts, corr, sol = rotate_options(
    "-₹10,000 crore (Current Account Deficit)",
    [
        "-₹30,000 crore",
        "+₹10,000 crore",
        "-₹5,000 crore"
    ],
    "C",
    "1. Current Account Balance = Balance of Trade + Net Invisibles.\n2. Balance of Trade = -₹30,000 crore (from previous question).\n3. Net Invisibles = Net Services (+₹15,000) + Net Transfers (+₹5,000) = +₹20,000 crore.\n4. Current Account Balance = -30,000 + 20,000 = -₹10,000 crore (Current Account Deficit of ₹10,000 crore).\nHence, Option {{CORR}} is correct.",
    "Calculates Current Account Balance = -30000 + 20000 = -10000 crore."
)
add_q(make_question(CHAPTER, "BoP Calculations", "Using the previous trade deficit of ₹30,000 crore, if net export of services is +₹15,000 crore and net unilateral remittances received are +₹5,000 crore, what is the Current Account Balance?", opts, corr, sol))

# 44. Numerical: Capital Account Balance to achieve overall BoP equilibrium
opts, corr, sol = rotate_options(
    "+₹10,000 crore (Capital Account Surplus of ₹10,000 crore)",
    [
        "-₹10,000 crore",
        "+₹20,000 crore",
        "₹0 crore"
    ],
    "D",
    "1. In the absence of official reserve transactions, overall BoP equilibrium requires:\n   Current Account Balance + Capital Account Balance = 0.\n2. -₹10,000 crore + Capital Account Balance = 0 => Capital Account Balance = +₹10,000 crore.\n3. The current account deficit is completely financed by a capital account surplus (net capital inflow).\nHence, Option {{CORR}} is correct.",
    "Calculates Capital Account Surplus needed: +10000 crore."
)
add_q(make_question(CHAPTER, "BoP Calculations", "If an economy runs a Current Account Deficit of ₹10,000 crore, what Capital Account Balance is required to maintain overall BoP equilibrium without drawing down official reserves?", opts, corr, sol))

# 45. Match Question: BoP Items Classification
add_q(make_match_question(
    CHAPTER,
    "BoP Classification",
    "Match the international transactions in List I with their corresponding BoP account heads in List II:",
    [
        ("A", "Import of crude petroleum from Saudi Arabia"),
        ("B", "Dividend received from foreign portfolio investments"),
        ("C", "Foreign Direct Investment by a Japanese automaker"),
        ("D", "Concessional loan received from the World Bank")
    ],
    [
        ("(I)", "Capital Account: External Assistance"),
        ("(II)", "Current Account: Visible Merchandise Imports"),
        ("(III)", "Current Account: Factor Investment Income"),
        ("(IV)", "Capital Account: Foreign Direct Investment")
    ],
    "A-(II), B-(III), C-(IV), D-(I)",
    [
        "A-(II), B-(I), C-(IV), D-(III)",
        "A-(IV), B-(III), C-(II), D-(I)",
        "A-(III), B-(II), C-(I), D-(IV)"
    ],
    "A",
    "1. Crude petroleum import -> Current Account: Visible Imports -> A-(II)\n2. Dividend received -> Current Account: Factor Income -> B-(III)\n3. Japanese automaker FDI -> Capital Account: FDI -> C-(IV)\n4. World Bank loan -> Capital Account: External Assistance -> D-(I)\nHence, Option A is correct."
))

# 46. Statement Question: Current account and external wealth
add_q(make_statement_question(
    CHAPTER,
    "Current Account",
    "A persistent Current Account Deficit (CAD) means that a country is living beyond its current international income and accumulating net foreign liabilities.",
    "A Current Account Deficit can be financed either by net capital inflows from abroad or by drawing down the central bank's foreign exchange reserves.",
    "A",
    "1. Statement I is TRUE: When payments for imports and transfers exceed export earnings, the nation must borrow from abroad or sell domestic assets, accumulating external debt.\n2. Statement II is TRUE: A CAD is settled either by attracting foreign investment/borrowing (capital account surplus) or by liquidating official forex reserves.\nHence, Both Statement I and Statement II are true (Option A)."
))

# 47. Assertion Reason: BoP Accounting Balance vs Economic Disequilibrium
add_q(make_assertion_question(
    CHAPTER,
    "BoP Equilibrium",
    "Even though the Balance of Payments always balances in an accounting sense, an economy can experience severe BoP crisis.",
    "An accounting balance includes accommodating official reserve transactions that deplete national foreign exchange reserves to cover deficits caused by autonomous transactions.",
    "A",
    "1. Assertion (A) is TRUE: An economy can suffer a severe BoP crisis (like India in 1991) despite accounting equality.\n2. Reason (R) is TRUE and correctly explains (A): The accounting balance is forced by exhausting foreign exchange reserves or emergency borrowing from the IMF (accommodating flows) to cover massive autonomous deficits.\nHence, Both (A) and (R) are true and (R) is the correct explanation of (A) (Option A)."
))

# 48. Match Question: BoP Components
add_q(make_match_question(
    CHAPTER,
    "BoP Structure",
    "Match the BoP sub-accounts in List I with their descriptions in List II:",
    [
        ("A", "Merchandise Trade Balance"),
        ("B", "Invisibles Balance"),
        ("C", "Capital Account Balance"),
        ("D", "Official Reserve Account")
    ],
    [
        ("(I)", "Net flows of foreign investments and external borrowings"),
        ("(II)", "Net balance of non-factor services, factor incomes, and transfers"),
        ("(III)", "Central bank sales or purchases of foreign currencies"),
        ("(IV)", "Exports of physical goods minus imports of physical goods")
    ],
    "A-(IV), B-(II), C-(I), D-(III)",
    [
        "A-(II), B-(IV), C-(I), D-(III)",
        "A-(IV), B-(I), C-(II), D-(III)",
        "A-(I), B-(II), C-(IV), D-(III)"
    ],
    "A",
    "1. Merchandise Trade Balance: Physical goods -> A-(IV)\n2. Invisibles: Services, income, transfers -> B-(II)\n3. Capital Account: Investments and borrowings -> C-(I)\n4. Official Reserve Account: Central bank transactions -> D-(III)\nHence, Option A is correct."
))

# 49. External Commercial Borrowing (ECB) vs External Assistance
opts, corr, sol = rotate_options(
    "ECB is borrowed at commercial market interest rates from international capital markets, whereas External Assistance consists of concessional loans at low interest rates from multilateral bodies",
    [
        "ECB is recorded on Current Account while External Assistance is recorded on Capital Account",
        "ECB is an outright grant while External Assistance must be repaid with penalties",
        "ECB is restricted to state governments while External Assistance is for private firms"
    ],
    "B",
    "1. External Commercial Borrowings (ECBs) are commercial loans raised by domestic companies and institutions from international commercial banks at prevailing market interest rates.\n2. External Assistance comprises concessional, soft loans and grants provided by multilateral institutions (World Bank, ADB) or foreign governments at subsidized rates with long repayment periods.\nHence, Option {{CORR}} is correct.",
    "Distinguishes market-rate ECB from concessional External Assistance."
)
add_q(make_question(CHAPTER, "Capital Account", "How does 'External Commercial Borrowing' (ECB) differ from 'External Assistance' in the Capital Account?", opts, corr, sol))

# 50. NRI Deposits in BoP
opts, corr, sol = rotate_options(
    "Capital Account, under banking capital, because they represent foreign liabilities of domestic commercial banks",
    [
        "Current Account, as personal unilateral remittances",
        "Official Reserve Account, as central bank gold reserves",
        "Current Account, as trade in banking services"
    ],
    "C",
    "1. Non-Resident Indian (NRI) deposits are bank deposits held by overseas Indians in commercial banks in India (e.g., FCNR, NRE accounts).\n2. Since the bank owes this money back to the foreign depositor upon maturity, it represents a foreign financial liability, recorded under Capital Account (Banking Capital).\nHence, Option {{CORR}} is correct.",
    "Classifies NRI bank deposits as Capital Account (Banking Capital)."
)
add_q(make_question(CHAPTER, "Capital Account", "How are 'NRI Bank Deposits' (such as FCNR/NRE deposits) classified in India's Balance of Payments?", opts, corr, sol))

# =================================================================================================
# 3. BoP Adjustment, Current Account Deficit, and Policy Measures (Q51 - Q60)
# =================================================================================================

# 51. Devaluation as a measure to correct BoP Deficit
opts, corr, sol = rotate_options(
    "By making domestic exports cheaper and foreign imports more expensive, thereby improving the trade balance (subject to Marshall-Lerner condition)",
    [
        "By directly doubling the domestic physical gold reserves in the central bank",
        "By legally cancelling all outstanding foreign loans owed to international creditors",
        "By mandating that all imports be paid exclusively in domestic paper currency"
    ],
    "D",
    "1. Devaluing the domestic currency under a fixed exchange rate regime makes exports cheaper in terms of foreign currency (boosting foreign demand for exports) and makes foreign imports costlier in terms of domestic currency (contracting domestic demand for imports), narrowing the trade deficit.\nHence, Option {{CORR}} is correct.",
    "Explains how devaluation remedies BoP deficit by boosting exports and cutting imports."
)
add_q(make_question(CHAPTER, "BoP Adjustment", "How does 'Devaluation of Domestic Currency' help in correcting a chronic Balance of Payments Deficit?", opts, corr, sol))

# 52. Import Substitution policy
opts, corr, sol = rotate_options(
    "Encouraging domestic industries to manufacture goods that were previously imported, conserving valuable foreign exchange",
    [
        "Replacing domestic food consumption with imported processed grains",
        "Banning all exports of manufactured capital machinery",
        "Nationalizing all multinational retail shopping chains"
    ],
    "A",
    "1. Import Substitution is an inward-oriented trade strategy where an economy imposes tariffs and quotas to protect domestic industries, producing previously imported goods domestically to save scarce foreign exchange reserves.\nHence, Option {{CORR}} is correct.",
    "Defines import substitution as domestic production of previously imported items."
)
add_q(make_question(CHAPTER, "BoP Adjustment", "What is meant by an 'Import Substitution' policy in foreign trade?", opts, corr, sol))

# 53. Tariffs and Quotas as commercial policy measures
opts, corr, sol = rotate_options(
    "Tariffs impose taxes on imported goods to raise their domestic price, whereas Quotas set physical quantity limits on permitted imports",
    [
        "Tariffs set physical quantity limits, while Quotas are export subsidies",
        "Tariffs apply to exported services, while Quotas apply to central bank loans",
        "Tariffs are voluntary contributions while Quotas are statutory penalties"
    ],
    "B",
    "1. Tariffs are customs duties/taxes levied on imported goods to make them more expensive in the domestic market, curbing demand.\n2. Quotas are non-tariff barriers that specify the maximum physical volume of a good that may be imported into the country during a given period.\nHence, Option {{CORR}} is correct.",
    "Distinguishes price-based tariffs from physical quantity-based quotas."
)
add_q(make_question(CHAPTER, "Commercial Policy", "What is the operational difference between 'Tariffs' and 'Quotas' used to restrict imports?", opts, corr, sol))

# 54. Export Promotion measures
opts, corr, sol = rotate_options(
    "Granting export subsidies, duty drawback schemes, and establishing Special Economic Zones (SEZs) with tax holidays",
    [
        "Imposing punitive export duties on domestic manufactured goods",
        "Mandating that exporters surrender 100% of their revenues to the state",
        "Banning all commercial shipping from domestic coastal ports"
    ],
    "C",
    "1. To stimulate export earnings and improve the BoP, governments provide fiscal and administrative incentives: duty drawback (refunding import duties on raw materials used for exports), export subsidies, low-interest export credit, and SEZs with world-class logistics.\nHence, Option {{CORR}} is correct.",
    "Identifies export promotion measures: subsidies, duty drawback, SEZs."
)
add_q(make_question(CHAPTER, "BoP Adjustment", "Which policy interventions are specifically designed for 'Export Promotion' to correct a trade deficit?", opts, corr, sol))

# 55. Foreign Exchange Control (Exchange Rationing)
opts, corr, sol = rotate_options(
    "The central bank legally monopolizes all foreign exchange transactions, compelling exporters to surrender foreign earnings and rationing foreign currency to licensed importers",
    [
        "Commercial banks handing out free foreign currency coupons to domestic tourists",
        "Prohibiting foreign investors from purchasing sovereign government bonds",
        "Mandating that international airline tickets be paid in agricultural grains"
    ],
    "D",
    "1. Under Foreign Exchange Control (exchange rationing), all foreign exchange earnings must be surrendered to the central bank, and anyone needing foreign exchange for imports or travel must obtain a government license/ration, preventing foreign exchange flight.\nHence, Option {{CORR}} is correct.",
    "Defines foreign exchange control / exchange rationing."
)
add_q(make_question(CHAPTER, "Exchange Control", "What does 'Foreign Exchange Control' (or Exchange Rationing) entail?", opts, corr, sol))

# 56. Statement Question: CAD and Economic Growth
add_q(make_statement_question(
    CHAPTER,
    "Current Account Deficit",
    "A Current Account Deficit is not necessarily harmful if it is driven by imports of capital machinery that expand the nation's future productive capacity.",
    "A Current Account Deficit becomes precarious and unsustainable when it is financed through volatile short-term portfolio debt rather than stable long-term Foreign Direct Investment.",
    "A",
    "1. Statement I is TRUE: Developing economies often import capital equipment and technology (running a CAD) to build infrastructure and boost industrial output.\n2. Statement II is TRUE: Financing CAD with 'hot money' (short-term FPI) exposes the economy to sudden flight of capital and currency crashes.\nHence, Both Statement I and Statement II are true (Option A)."
))

# 57. Assertion Reason: Official Reserves decrease is a credit
add_q(make_assertion_question(
    CHAPTER,
    "BoP Accounting",
    "A decrease in the official foreign exchange reserves of the Central Bank is recorded as a Credit (+) item in the Balance of Payments.",
    "A decrease in foreign exchange reserves indicates an outflow of foreign currency from the central bank into the market, bringing foreign exchange to finance the deficit.",
    "A",
    "1. Assertion (A) is TRUE: Selling foreign currency from reserves releases foreign exchange to finance the BoP deficit; hence, drawing down reserves is credited (+).\n2. Reason (R) is TRUE and correctly explains (A): By releasing reserves into the foreign exchange pool, foreign currency is supplied to settle external claims, functioning identically to an export/inflow.\nHence, Both (A) and (R) are true and (R) is the correct explanation of (A) (Option A)."
))

# 58. Match Question: BoP Balances
add_q(make_match_question(
    CHAPTER,
    "BoP Accounts",
    "Match the BoP balances in List I with their defining mathematical compositions in List II:",
    [
        ("A", "Trade Balance (BoT)"),
        ("B", "Current Account Balance"),
        ("C", "Capital Account Balance"),
        ("D", "Overall BoP Balance")
    ],
    [
        ("(I)", "Net Foreign Investment + Net External Borrowings + Net Banking Capital"),
        ("(II)", "Visible Merchandise Exports - Visible Merchandise Imports"),
        ("(III)", "Current Account Balance + Capital Account Balance (including errors & omissions)"),
        ("(IV)", "Trade Balance + Net Invisible Services + Net Factor Income + Net Transfers")
    ],
    "A-(II), B-(IV), C-(I), D-(III)",
    [
        "A-(IV), B-(II), C-(I), D-(III)",
        "A-(II), B-(I), C-(IV), D-(III)",
        "A-(III), B-(IV), C-(I), D-(II)"
    ],
    "A",
    "1. Trade Balance: Visible Exports - Visible Imports -> A-(II)\n2. Current Account Balance: Trade Balance + Net Invisibles -> B-(IV)\n3. Capital Account Balance: Net Investment + Borrowings + Banking Capital -> C-(I)\n4. Overall BoP Balance: Current Account + Capital Account -> D-(III)\nHence, Option A is correct."
))

# 59. Sequence Question: Adjustment of BoP deficit under flexible exchange rates
add_q(make_sequence_question(
    CHAPTER,
    "BoP Automatic Adjustment",
    "Arrange the sequential steps in the correct order describing the automatic market adjustment of a BoP deficit under a flexible exchange rate regime:",
    [
        "An economy experiences an autonomous BoP deficit where payments to foreigners exceed receipts.",
        "Excess demand for foreign exchange develops in the foreign exchange market.",
        "The market-clearing foreign exchange rate rises, causing the domestic currency to depreciate.",
        "Depreciation makes domestic goods cheaper to foreign buyers and imported goods more expensive to domestic buyers.",
        "Exports expand, imports contract, and the trade balance improves until the BoP deficit is eliminated."
    ],
    "(A) -> (B) -> (C) -> (D) -> (E)",
    [
        "(B) -> (A) -> (D) -> (C) -> (E)",
        "(A) -> (C) -> (B) -> (E) -> (D)",
        "(C) -> (B) -> (A) -> (D) -> (E)"
    ],
    "A",
    "1. The automatic market equilibrating mechanism follows: (A) BoP deficit -> (B) Excess demand for FX -> (C) Currency depreciation -> (D) Price competitiveness change -> (E) Export expansion and BoP balance restoration.\nHence, Option A is correct."
))

# 60. Clean Floating vs Dirty Floating
opts, corr, sol = rotate_options(
    "Clean floating has zero central bank intervention (pure market forces), whereas dirty floating involves active central bank intervention in the forex market to stabilize exchange rate fluctuations",
    [
        "Clean floating uses new paper currency while dirty floating uses soiled notes",
        "Clean floating is illegal under WTO rules while dirty floating is mandated",
        "Clean floating fixes the price of gold while dirty floating fixes silver"
    ],
    "B",
    "1. Clean Floating (Pure Floating): Exchange rate is determined entirely by market demand and supply with zero intervention by the central monetary authority.\n2. Dirty Floating (Managed Floating): Central bank intervenes by buying/selling foreign currency to prevent speculative swings while allowing underlying market trends to dictate the rate.\nHence, Option {{CORR}} is correct.",
    "Contrasts Clean Floating (no intervention) with Dirty Floating (central bank intervention)."
)
add_q(make_question(CHAPTER, "Exchange Rate Systems", "What is the essential difference between 'Clean Floating' and 'Dirty Floating'?", opts, corr, sol))

# Verify count and uniqueness
assert len(questions) == 60, f"Expected 60 questions, got {len(questions)}"
print(f"Successfully generated {len(questions)} unique questions for Unit 10!")

out_path = "mock/eco_units/unit10.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
