import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.eco_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text
)

CHAPTER = "Forms of Market and Non-Competitive Markets"
questions = []
seen = set()

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:80]}")
    seen.add(norm)
    questions.append(q)

print("Generating 60 unique questions for Unit 4: Market Forms and Price Determination...")

# -------------------------------------------------------------------------------------------------
# 1. Perfect Competition (Q1 - Q25)
# -------------------------------------------------------------------------------------------------

# 1. Perfect competition: Price taker feature
opts, corr, sol = rotate_options(
    "The individual firm has an insignificant share of the market and cannot influence the ruling market price",
    [
        "The firm colludes with other producers to set maximum retail prices",
        "The firm sells differentiated products with heavy television advertising",
        "Government sets statutory prices for every individual factory output"
    ],
    "A",
    "1. Under perfect competition, each firm produces an imperceptible fraction of total industry output. Therefore, no individual firm can alter the market price by changing its output; it must accept the price determined by industry demand and supply (Price Taker).\nHence, Option {{CORR}} is correct.",
    "Explains why a competitive firm is a price taker."
)
add_q(make_question(CHAPTER, "Perfect Competition", "Why is an individual firm in a perfectly competitive market referred to as a 'Price Taker'?", opts, corr, sol))

# 2. Shape of demand curve faced by a competitive firm
opts, corr, sol = rotate_options(
    "A horizontal straight line parallel to the output axis with infinite price elasticity (e_d = infinity)",
    [
        "A downward-sloping linear curve with unitary price elasticity",
        "A vertical straight line parallel to the price axis with zero elasticity",
        "A kinked curve with an indeterminate slope"
    ],
    "B",
    "1. Because a competitive firm can sell any quantity at the prevailing industry market price, its demand curve is perfectly elastic ($e_d = \\infty$), represented by a horizontal straight line where $P = AR = MR$.\nHence, Option {{CORR}} is correct.",
    "Identifies horizontal demand curve with infinite elasticity."
)
add_q(make_question(CHAPTER, "Perfect Competition", "What is the graphical shape and price elasticity of the demand curve facing an individual competitive firm?", opts, corr, sol))

# 3. Homogeneous product implication
opts, corr, sol = rotate_options(
    "Buyers treat outputs of all firms as perfect substitutes, ensuring a uniform market price across the industry",
    [
        "Firms spend massive budgets on celebrity endorsements and branding",
        "Firms can practice second-degree price discrimination",
        "The market supply curve becomes vertical at all price levels"
    ],
    "C",
    "1. Homogeneous products are identical in size, shape, quality, and packaging. Because buyers perceive no difference between sellers' goods, no firm can charge even slightly more than the prevailing price, guaranteeing a single uniform price.\nHence, Option {{CORR}} is correct.",
    "Connects product homogeneity to uniform price."
)
add_q(make_question(CHAPTER, "Perfect Competition", "What is the economic consequence of the 'Homogeneous Product' assumption under Perfect Competition?", opts, corr, sol))

# 4. Free entry and exit implication
opts, corr, sol = rotate_options(
    "Firms earn only Normal Profit in the long run (P = min LAC)",
    [
        "Firms earn permanent supernormal economic profits in the long run",
        "Monopolistic cartels are formed to restrict output",
        "The number of firms in the industry is permanently fixed at ten"
    ],
    "D",
    "1. If existing firms earn supernormal profits, new firms enter, expanding industry supply and lowering price. If firms incur losses, inefficient firms exit, contracting supply and raising price. In the long run, free entry and exit forces all firms to earn strictly normal profit ($P = \\min LAC$).\nHence, Option {{CORR}} is correct.",
    "Links free entry and exit to normal long-run profit."
)
add_q(make_question(CHAPTER, "Perfect Competition", "What is the crucial economic outcome of 'Free Entry and Free Exit' of firms in the long run under Perfect Competition?", opts, corr, sol))

# 5. Long-run equilibrium condition of competitive firm
opts, corr, sol = rotate_options(
    "P = AR = MR = LMC = min LAC",
    [
        "P > MR = MC = min AVC",
        "P = AR < LMC = LAC",
        "MR = MC > P = min LAC"
    ],
    "A",
    "1. In long-run competitive equilibrium, the firm produces at the minimum point of its Long-run Average Cost curve where $P = AR = MR = LMC = \\min LAC$. This represents both productive and allocative efficiency.\nHence, Option {{CORR}} is correct.",
    "States complete long run competitive equilibrium identity."
)
add_q(make_question(CHAPTER, "Perfect Competition", "Which comprehensive equation represents the long-run equilibrium of a firm in a perfectly competitive industry?", opts, corr, sol))

# 6. Absence of selling costs
opts, corr, sol = rotate_options(
    "Because goods are completely homogeneous and consumers have perfect knowledge of the market",
    [
        "Because advertising is prohibited by constitutional law",
        "Because competitive firms operate under zero production costs",
        "Because individual firms are large enough to dominate television channels"
    ],
    "B",
    "1. Selling costs (advertisement, sales promotion) are unnecessary under perfect competition because products are perfectly homogeneous and all buyers possess perfect market information. Any advertisement would simply help rivals equally.\nHence, Option {{CORR}} is correct.",
    "Explains absence of selling costs in perfect competition."
)
add_q(make_question(CHAPTER, "Perfect Competition", "Why do firms in a perfectly competitive market incur zero selling or promotional costs?", opts, corr, sol))

# 7. Perfect mobility of factors
opts, corr, sol = rotate_options(
    "Factors can move freely between occupations and geographic regions, ensuring uniform factor prices",
    [
        "Factors of production are owned exclusively by central government ministries",
        "Labour wages vary widely between firms producing the identical good",
        "Capital is completely locked in specialized equipment that cannot be resold"
    ],
    "C",
    "1. Perfect factor mobility means factors of production can freely enter or leave any industry without legal or geographical friction, ensuring that factor prices (wages, rent) equalize across competing firms.\nHence, Option {{CORR}} is correct.",
    "Connects factor mobility to factor price equalization."
)
add_q(make_question(CHAPTER, "Perfect Competition", "What is the primary implication of 'Perfect Mobility of Factors of Production'?", opts, corr, sol))

# 8. Price Maker vs Price Taker
opts, corr, sol = rotate_options(
    "The industry is the Price Maker through aggregate demand and supply, while the individual firm is the Price Taker",
    [
        "The largest individual firm is the Price Maker while the industry is the Price Taker",
        "The government is the Price Maker while both industry and firms are Price Takers",
        "Consumers are the Price Makers while retailers set supply independently"
    ],
    "D",
    "1. Under perfect competition, the equilibrium price is established at the industry level at the intersection of market demand and market supply (Industry = Price Maker). The individual firm takes this market price as given (Firm = Price Taker).\nHence, Option {{CORR}} is correct.",
    "Contrasts industry price maker with firm price taker."
)
add_q(make_question(CHAPTER, "Perfect Competition", "In a competitive market structure, who acts as the 'Price Maker' and who acts as the 'Price Taker'?", opts, corr, sol))

# 9. Supernormal profit in short run
opts, corr, sol = rotate_options(
    "Occurs when ruling market price exceeds Average Cost (P > AC) at equilibrium output",
    [
        "Occurs when Price is strictly less than Average Variable Cost",
        "Occurs only when Total Fixed Cost is equal to zero",
        "Occurs whenever the firm produces at the shutdown point"
    ],
    "A",
    "1. In the short run, if industry demand is high, market price can rise above average cost ($P > AC$), allowing competitive firms to earn supernormal (economic) profits.\nHence, Option {{CORR}} is correct.",
    "Identifies supernormal profit when P > AC."
)
add_q(make_question(CHAPTER, "Perfect Competition", "Under what condition does a perfectly competitive firm earn supernormal profit in the short run?", opts, corr, sol))

# 10. Subnormal profit / Operating at loss in short run
opts, corr, sol = rotate_options(
    "Price covers Average Variable Cost but not Average Total Cost (AVC <= P < AC)",
    [
        "Price falls below minimum Average Variable Cost (P < AVC)",
        "Price is strictly greater than Marginal Cost",
        "Total Revenue equals Total Fixed Cost"
    ],
    "B",
    "1. A competitive firm will operate at a loss in the short run if price covers its variable costs ($P \\ge AVC$) even if it cannot cover fixed costs ($P < AC$), because continuing production minimizes losses to a fraction of fixed cost.\nHence, Option {{CORR}} is correct.",
    "Defines short-run loss minimizing condition."
)
add_q(make_question(CHAPTER, "Perfect Competition", "When will a competitive firm choose to produce in the short run despite incurring an economic loss?", opts, corr, sol))

# -------------------------------------------------------------------------------------------------
# 2. Monopoly (Q11 - Q25)
# -------------------------------------------------------------------------------------------------

# 11. Monopoly core characteristics
opts, corr, sol = rotate_options(
    "Single seller, no close substitutes, strong barriers to entry, and price maker status",
    [
        "Large number of sellers, differentiated goods, and free entry",
        "A few large dominant firms with mutual price interdependence",
        "Homogeneous goods with horizontal individual demand curves"
    ],
    "C",
    "1. A pure monopoly is characterized by a single producer dominating the entire industry, total absence of close substitutes, formidable entry barriers (patents, natural monopolies), and price-setting power.\nHence, Option {{CORR}} is correct.",
    "Defines core monopoly characteristics."
)
add_q(make_question(CHAPTER, "Monopoly", "Which bundle of characteristics uniquely defines a Pure Monopoly?", opts, corr, sol))

# 12. Shape of Monopoly Demand Curve
opts, corr, sol = rotate_options(
    "Downward sloping to the right and relatively inelastic compared to monopolistic competition",
    [
        "Horizontal straight line parallel to the quantity axis",
        "Vertical straight line with zero price elasticity",
        "Upward sloping due to conspicuous prestige consumption"
    ],
    "D",
    "1. Because the monopolist is the sole supplier, the firm's demand curve IS the industry demand curve. It slopes downward to the right and is relatively steep (inelastic) because there are no close substitutes.\nHence, Option {{CORR}} is correct.",
    "Characterizes downward-sloping inelastic monopoly demand."
)
add_q(make_question(CHAPTER, "Monopoly", "What is the graphical shape of the demand curve facing a monopolist?", opts, corr, sol))

# 13. Absence of unique supply curve in monopoly
opts, corr, sol = rotate_options(
    "The monopolist does not take price as given, so there is no unique one-to-one relationship between price and quantity supplied",
    [
        "Monopolists produce with zero marginal cost at all times",
        "Monopoly outputs cannot be quantified in physical units",
        "Supply curves exist only when firms operate under decreasing returns to scale"
    ],
    "A",
    "1. In monopoly, output depends not only on marginal cost but also on the shape and elasticity of the demand curve. Depending on demand elasticity, a monopolist may supply different quantities at the same price or the same quantity at different prices. Hence, no unique supply curve exists.\nHence, Option {{CORR}} is correct.",
    "Explains absence of supply curve in monopoly."
)
add_q(make_question(CHAPTER, "Monopoly", "Why is there no well-defined supply curve for a monopolist?", opts, corr, sol))

# 14. Price Discrimination definition
opts, corr, sol = rotate_options(
    "Charging different prices to different buyers for the same commodity for reasons not associated with cost differences",
    [
        "Charging higher prices during daytime and giving away goods for free at night",
        "Offering bulk discounts based strictly on freight transport costs",
        "Selling goods below marginal cost across all international borders"
    ],
    "B",
    "1. Price Discrimination occurs when a monopolist sells identical units of a good to different consumers (or in different markets) at different prices, where price differences do not reflect cost differences.\nHence, Option {{CORR}} is correct.",
    "Defines price discrimination."
)
add_q(make_question(CHAPTER, "Monopoly", "What is 'Price Discrimination' in the context of monopoly markets?", opts, corr, sol))

# 15. Conditions for profitable price discrimination
opts, corr, sol = rotate_options(
    "Separation of markets (no resale/arbitrage) and differing price elasticities of demand between the sub-markets",
    [
        "Perfect knowledge among all consumers and identical demand elasticities",
        "Free entry of competing discount firms in all regions",
        "Horizontal demand curves across all customer segments"
    ],
    "C",
    "1. Profitable price discrimination requires two essential conditions:\n   (i) The seller can keep markets separate so buyers in the cheaper market cannot resell to the higher market (no arbitrage).\n   (ii) Price elasticities of demand differ between the sub-markets (charging a higher price in the inelastic market).\nHence, Option {{CORR}} is correct.",
    "Identifies market separation and elasticity differential for price discrimination."
)
add_q(make_question(CHAPTER, "Monopoly", "Which two conditions are necessary for a monopolist to practice price discrimination successfully?", opts, corr, sol))

# 16. Natural Monopoly definition
opts, corr, sol = rotate_options(
    "An industry where a single large firm can supply the entire market at a lower average cost than two or more smaller firms due to enormous economies of scale",
    [
        "A business created through statutory patents on cosmetic products",
        "An enterprise operating under strictly diminishing returns to scale",
        "A cartel formed by competing oil-exporting governments"
    ],
    "D",
    "1. A natural monopoly (e.g. municipal water supply, electricity transmission grid) arises when huge fixed infrastructure costs generate extensive economies of scale over the entire relevant market demand, making one producer most cost-efficient.\nHence, Option {{CORR}} is correct.",
    "Defines natural monopoly via economies of scale."
)
add_q(make_question(CHAPTER, "Monopoly", "What is a 'Natural Monopoly'?", opts, corr, sol))

# 17. Deadweight Loss of monopoly
opts, corr, sol = rotate_options(
    "The net loss of total economic surplus (consumer plus producer surplus) caused by monopoly restriction of output below competitive level",
    [
        "The accounting depreciation recorded on idle machinery",
        "The tax revenue transferred from businesses to the central bank",
        "The monetary penalty imposed on illegal monopolies"
    ],
    "A",
    "1. Under monopoly, price is set above marginal cost ($P > MC$), leading to underproduction relative to the socially optimal competitive level. This allocative inefficiency creates a deadweight welfare loss to society.\nHence, Option {{CORR}} is correct.",
    "Defines deadweight loss from monopoly underproduction."
)
add_q(make_question(CHAPTER, "Monopoly", "What does 'Deadweight Loss' signify in the economic evaluation of a monopoly?", opts, corr, sol))

# -------------------------------------------------------------------------------------------------
# 3. Monopolistic Competition (Q18 - Q35)
# -------------------------------------------------------------------------------------------------

# 18. Monopolistic Competition core features
opts, corr, sol = rotate_options(
    "Large number of buyers and sellers, product differentiation, selling costs, and free entry and exit",
    [
        "Single seller, homogeneous goods, and legal barriers to entry",
        "Few interdependent producers selling identical raw materials",
        "Infinite buyers, zero selling costs, and perfectly elastic demand"
    ],
    "B",
    "1. Formulated by Edward Chamberlin, Monopolistic Competition blends elements of monopoly (each firm has a monopoly over its unique brand) and competition (many close substitute brands, free entry/exit, heavy advertising).\nHence, Option {{CORR}} is correct.",
    "Lists defining traits of monopolistic competition."
)
add_q(make_question(CHAPTER, "Monopolistic Competition", "Which set of market conditions defines 'Monopolistic Competition'?", opts, corr, sol))

# 19. Product Differentiation concept
opts, corr, sol = rotate_options(
    "Products that are close substitutes but differentiated by brand name, packaging, design, or after-sales service",
    [
        "Products that are chemically identical and sold without wrappers",
        "Goods that have zero cross-price elasticity of demand",
        "Standardized agricultural crops sold in wholesale mandis"
    ],
    "C",
    "1. Product differentiation means that goods of competing firms satisfy the same want but differ in terms of trademarks, aroma, packaging, perceived quality, or customer support (e.g. soaps, shampoos, toothpaste).\nHence, Option {{CORR}} is correct.",
    "Defines product differentiation."
)
add_q(make_question(CHAPTER, "Monopolistic Competition", "What is the essence of 'Product Differentiation' in monopolistically competitive markets?", opts, corr, sol))

# 20. Selling Costs definition
opts, corr, sol = rotate_options(
    "Costs incurred to persuade consumers to buy the firm's brand rather than rival brands (advertising, marketing, display)",
    [
        "Transportation expenses incurred to ship goods between wholesale warehouses",
        "Wages paid to production factory workers for physical assembly",
        "Excise duties paid to the customs department upon factory clearance"
    ],
    "D",
    "1. Selling costs are expenses incurred to alter the position or shape of the demand curve for a product (persuasive advertising, sales promotion, window display, showroom decor), distinguished from production costs.\nHence, Option {{CORR}} is correct.",
    "Defines selling costs."
)
add_q(make_question(CHAPTER, "Monopolistic Competition", "What are 'Selling Costs' according to Edward Chamberlin?", opts, corr, sol))

# 21. Demand curve elasticity: Monopolistic Competition vs Monopoly
opts, corr, sol = rotate_options(
    "More elastic in monopolistic competition because numerous close substitute brands are readily available",
    [
        "More inelastic in monopolistic competition because consumers are brand-loyal",
        "Perfectly inelastic in monopolistic competition and infinite in monopoly",
        "Identical in shape and slope across both market structures"
    ],
    "A",
    "1. While both demand curves slope downward, the demand curve under monopolistic competition is substantially more elastic (flatter) than under monopoly because many close substitute brands exist in the market.\nHence, Option {{CORR}} is correct.",
    "Contrasts elasticity of monopolistic competition vs monopoly."
)
add_q(make_question(CHAPTER, "Monopolistic Competition", "Why is the demand curve facing a firm under Monopolistic Competition more elastic than that facing a Monopolist?", opts, corr, sol))

# 22. Long-run equilibrium in Monopolistic Competition
opts, corr, sol = rotate_options(
    "Firms earn only Normal Profit because free entry of rival brands eliminates supernormal profits",
    [
        "Firms earn permanent supernormal profits due to patent monopolies",
        "Firms produce at the absolute minimum point of their LAC curve",
        "Firms exit until only one giant monopoly remains"
    ],
    "B",
    "1. In the long run, free entry and exit of firms ensures that supernormal profits are competed away by new entrant brands, leaving existing firms earning only normal profits where $P = AC$.\nHence, Option {{CORR}} is correct.",
    "Explains normal profit in long run under monopolistic competition."
)
add_q(make_question(CHAPTER, "Monopolistic Competition", "What is the long-run profit status of a firm under Monopolistic Competition?", opts, corr, sol))

# 23. Excess Capacity Theorem
opts, corr, sol = rotate_options(
    "Firms produce at an output level below the minimum of Long-run Average Cost, leaving unutilized plant capacity",
    [
        "Firms produce beyond full capacity causing machines to overheat",
        "Firms produce at the exact minimum point of LAC just like perfect competition",
        "Firms maintain zero inventory of finished goods"
    ],
    "C",
    "1. In long-run equilibrium, because the demand curve is downward-sloping, the tangency of $AR$ and $LAC$ occurs on the downward-sloping segment of LAC (to the left of minimum LAC). Thus, production falls short of optimum capacity, generating 'Excess Capacity'.\nHence, Option {{CORR}} is correct.",
    "Defines the excess capacity theorem."
)
add_q(make_question(CHAPTER, "Monopolistic Competition", "What is meant by the 'Excess Capacity' phenomenon in Monopolistic Competition?", opts, corr, sol))

# -------------------------------------------------------------------------------------------------
# 4. Oligopoly (Q24 - Q40)
# -------------------------------------------------------------------------------------------------

# 24. Oligopoly core characteristic: Mutual Interdependence
opts, corr, sol = rotate_options(
    "Mutual Interdependence, where each firm must consider the anticipated reactions of rival firms before deciding prices or output",
    [
        "Absence of competitors and complete monopoly power",
        "Perfect price flexibility with hundreds of small sellers",
        "Guaranteed price equality with marginal cost"
    ],
    "D",
    "1. The defining hallmark of Oligopoly is Mutual Interdependence: because the market is shared among few large firms (e.g. telecom, airlines, automobiles), any price or output action by one firm directly triggers defensive reactions by rivals.\nHence, Option {{CORR}} is correct.",
    "Highlights mutual interdependence as core oligopoly trait."
)
add_q(make_question(CHAPTER, "Oligopoly", "Which unique feature fundamentally distinguishes Oligopoly from all other market structures?", opts, corr, sol))

# 25. Indeterminate Demand Curve in Oligopoly
opts, corr, sol = rotate_options(
    "Because a firm cannot predict the exact retaliatory actions of its competitors to a change in price or output",
    [
        "Because consumers in oligopoly markets behave irrationally",
        "Because oligopoly products cannot be sold in physical stores",
        "Because the government sets daily maximum production quotas"
    ],
    "A",
    "1. In an oligopoly, when a firm changes its price, it cannot know for sure whether rivals will match the cut, ignore it, or lower prices even further. This strategic uncertainty makes it impossible to draw a definite demand curve.\nHence, Option {{CORR}} is correct.",
    "Explains indeterminate demand curve via rival reaction uncertainty."
)
add_q(make_question(CHAPTER, "Oligopoly", "Why is the demand curve facing an oligopolist considered 'Indeterminate'?", opts, corr, sol))

# 26. Kinked Demand Curve Model (Paul Sweezy)
opts, corr, sol = rotate_options(
    "Price Rigidity (Sticky Prices), because rivals match price cuts but ignore price increases",
    [
        "Hyper-inflationary price spirals occurring every quarter",
        "Complete government nationalization of the oligopoly industry",
        "Price discrimination between high-income and low-income buyers"
    ],
    "B",
    "1. Sweezy's Kinked Demand Curve hypothesis explains price rigidity: if a firm raises price, rivals do NOT follow (demand is highly elastic above the kink); if it cuts price, rivals DO follow (demand is inelastic below the kink). Thus, the firm sticks to the kink price.\nHence, Option {{CORR}} is correct.",
    "Explains price rigidity in Sweezy's kinked demand curve."
)
add_q(make_question(CHAPTER, "Oligopoly", "What economic phenomenon does Paul Sweezy's Kinked Demand Curve model explain?", opts, corr, sol))

# 27. Discontinuity in Marginal Revenue curve
opts, corr, sol = rotate_options(
    "A vertical gap (discontinuity) in the MR curve directly below the kink in the demand curve",
    [
        "A horizontal MR curve passing through the origin",
        "An inverted U-shaped MR curve tangent to the price axis",
        "A completely continuous linear MR schedule"
    ],
    "C",
    "1. Because the demand curve has a kink (sharp change in slope from elastic to inelastic), the corresponding Marginal Revenue curve has a vertical break or discontinuity directly below the kink.\nHence, Option {{CORR}} is correct.",
    "Identifies vertical discontinuity in MR below the kink."
)
add_q(make_question(CHAPTER, "Oligopoly", "What happens to the Marginal Revenue (MR) curve at the point of the kink in Sweezy's model?", opts, corr, sol))

# 28. Collusive vs Non-collusive Oligopoly
opts, corr, sol = rotate_options(
    "In collusive oligopoly firms cooperate to set price and output (e.g. cartels), whereas in non-collusive oligopoly firms compete aggressively",
    [
        "In collusive oligopoly firms sell agricultural goods while in non-collusive they sell software",
        "Collusive oligopoly is legally mandated in all democracies",
        "Non-collusive oligopoly always has only two sellers"
    ],
    "D",
    "1. Collusive oligopoly occurs when firms openly or tacitly agree to coordinate pricing and output quotas to maximize joint profits (e.g. OPEC). In non-collusive oligopoly, firms compete strategically.\nHence, Option {{CORR}} is correct.",
    "Contrasts collusive and non-collusive oligopoly."
)
add_q(make_question(CHAPTER, "Oligopoly", "How does a Collusive Oligopoly differ from a Non-Collusive Oligopoly?", opts, corr, sol))

# 29. Cartel definition
opts, corr, sol = rotate_options(
    "A formal collusive agreement among competing oligopoly firms to act collectively as a monopoly by restricting output and fixing prices",
    [
        "A competitive wholesale market operating under free entry",
        "A public sector enterprise established by presidential order",
        "A consumer protection tribunal settling warranty disputes"
    ],
    "A",
    "1. A cartel (such as the Organization of the Petroleum Exporting Countries - OPEC) is an explicit association of producers formed to coordinate production quotas and maintain high market prices.\nHence, Option {{CORR}} is correct.",
    "Defines a cartel."
)
add_q(make_question(CHAPTER, "Oligopoly", "What is a 'Cartel' in industrial economics?", opts, corr, sol))

# 30. Duopoly definition
opts, corr, sol = rotate_options(
    "A special case of oligopoly where exactly two independent sellers dominate the entire industry",
    [
        "A market with two buyers and two hundred sellers",
        "An industry where two products are sold at zero price",
        "A monopoly that operates in two different calendar months"
    ],
    "B",
    "1. A Duopoly is a limiting case of oligopoly consisting of exactly two producers dominating the market (e.g. commercial aircraft manufacturing dominated by Airbus and Boeing).\nHence, Option {{CORR}} is correct.",
    "Defines duopoly."
)
add_q(make_question(CHAPTER, "Oligopoly", "What is a 'Duopoly'?", opts, corr, sol))

# -------------------------------------------------------------------------------------------------
# 5. Comparative Market Analysis, Matrices, Statements, Assertions (Q31 - Q60)
# -------------------------------------------------------------------------------------------------

# 31. Match Market Forms with Number of Sellers and Product Type
add_q(make_match_question(
    CHAPTER, "Market Structures Comparison",
    "Match the market forms in List I with their defining structural features in List II:",
    [
        ("A", "Perfect Competition"),
        ("B", "Monopoly"),
        ("C", "Monopolistic Competition"),
        ("D", "Oligopoly")
    ],
    [
        ("I", "Single seller with no close substitutes"),
        ("II", "Large number of sellers with differentiated products"),
        ("III", "Few large dominant sellers with mutual interdependence"),
        ("IV", "Large number of sellers with homogeneous products")
    ],
    "A-(IV), B-(I), C-(II), D-(III)",
    [
        "A-(I), B-(IV), C-(II), D-(III)",
        "A-(IV), B-(III), C-(II), D-(I)",
        "A-(II), B-(I), C-(IV), D-(III)"
    ],
    "A",
    "1. Perfect Competition -> Large number, homogeneous (IV).\n2. Monopoly -> Single seller (I).\n3. Monopolistic Competition -> Differentiated products (II).\n4. Oligopoly -> Few sellers, mutual interdependence (III).\nHence, Option A is correct."
))

# 32. Match Market Structures with Demand Elasticity
add_q(make_match_question(
    CHAPTER, "Market Structures Comparison",
    "Match the market structures in List I with the price elasticity of demand facing the individual firm in List II:",
    [
        ("A", "Perfect Competition"),
        ("B", "Monopoly"),
        ("C", "Monopolistic Competition"),
        ("D", "Oligopoly")
    ],
    [
        ("I", "Indeterminate demand curve (Kinked curve)"),
        ("II", "Perfect契 (Infinitely elastic, e_d = infinity)"),
        ("III", "Relatively inelastic downward-sloping curve"),
        ("IV", "Relatively elastic downward-sloping curve")
    ],
    "A-(II), B-(III), C-(IV), D-(I)",
    [
        "A-(II), B-(I), C-(IV), D-(III)",
        "A-(III), B-(II), C-(I), D-(IV)",
        "A-(IV), B-(III), C-(II), D-(I)"
    ],
    "A",
    "1. Perfect Competition -> Infinite elasticity (II).\n2. Monopoly -> Relatively inelastic (III).\n3. Monopolistic Competition -> Relatively elastic (IV).\n4. Oligopoly -> Indeterminate / kinked (I).\nHence, Option A is correct."
))

# 33. Statement I & II: Perfect Competition vs Monopolistic Competition
add_q(make_statement_question(
    CHAPTER, "Market Structures Comparison",
    "Under both Perfect Competition and Monopolistic Competition, firms earn only Normal Profit in the long run.",
    "Under both Perfect Competition and Monopolistic Competition, firms produce at the minimum point of their Long-run Average Cost curve.",
    "C",
    "1. Statement I is true: Due to free entry and exit, firms in both markets earn only normal profit in the long run.\n2. Statement II is false: Only perfectly competitive firms produce at minimum LAC; monopolistically competitive firms produce with excess capacity to the left of minimum LAC.\nHence, Statement I is true but Statement II is false (Option C)."
))

# 34. Assertion & Reason: Price rigidity in oligopoly
add_q(make_assertion_question(
    CHAPTER, "Oligopoly",
    "In an oligopoly characterized by a kinked demand curve, the market price tends to remain rigid (sticky).",
    "If a firm raises its price above the prevailing level, competitors will not follow, whereas if it cuts price, competitors will match the reduction immediately.",
    "A",
    "1. Assertion is true: Oligopolistic prices are sticky.\n2. Reason is true: The asymmetric response of rivals creates a kink at the current price, discouraging price deviations.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 35. Sequence of competitive industry adjustment to supernormal profits
add_q(make_sequence_question(
    CHAPTER, "Perfect Competition",
    "Arrange the following steps showing how free entry eliminates supernormal profits in a competitive industry:",
    [
        "Existing competitive firms earn supernormal profits due to a surge in market demand",
        "Attracted by supernormal returns, new firms enter the industry",
        "Total industry supply expands, shifting the market supply curve to the right",
        "Market price falls until all firms earn strictly normal profit (P = min LAC)"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (C), (D)",
        "(A), (C), (B), (D)",
        "(C), (B), (A), (D)"
    ],
    "A",
    "1. Supernormal profit emerges (A) -> New firms enter (B) -> Industry supply curve shifts right (C) -> Price declines to minimum LAC restoring normal profit (D).\nHence, Option A is correct."
))

# 36. Allocative efficiency definition
opts, corr, sol = rotate_options(
    "P = MC, where the price consumers are willing to pay exactly equals the marginal cost of production",
    [
        "P > MC, where producers extract maximum consumer surplus",
        "P = min AVC, where firms are on the verge of shutting down",
        "MC = 0, where goods are supplied as free public utilities"
    ],
    "B",
    "1. Allocative efficiency is achieved when resources are distributed in a way that maximizes societal welfare, which occurs where Price equals Marginal Cost ($P = MC$). This occurs under Perfect Competition, but is violated under Monopoly ($P > MC$).\nHence, Option {{CORR}} is correct.",
    "Defines allocative efficiency as P = MC."
)
add_q(make_question(CHAPTER, "Market Structures Comparison", "Which condition defines 'Allocative Efficiency' in microeconomics?", opts, corr, sol))

# 37. Productive efficiency definition
opts, corr, sol = rotate_options(
    "Producing output at the lowest possible per-unit cost (minimum of Long-run Average Cost)",
    [
        "Producing output where marginal revenue is equal to zero",
        "Selling the maximum possible physical volume regardless of total cost",
        "Employing exclusively capital-intensive computerized machinery"
    ],
    "C",
    "1. Productive efficiency is attained when output is produced at the minimum point on the Long-run Average Cost curve ($P = \\min LAC$), so no resources are wasted.\nHence, Option {{CORR}} is correct.",
    "Defines productive efficiency as minimum LAC."
)
add_q(make_question(CHAPTER, "Market Structures Comparison", "What is meant by 'Productive Efficiency' in long-run industrial production?", opts, corr, sol))

# 38. First-degree price discrimination (Perfect price discrimination)
opts, corr, sol = rotate_options(
    "The monopolist charges each individual consumer the maximum price he is willing to pay, extracting 100% of consumer surplus",
    [
        "The monopolist charges different prices based on quantity blocks purchased",
        "The monopolist charges different prices in domestic vs international export markets",
        "The monopolist provides goods for free to senior citizens"
    ],
    "D",
    "1. In First-Degree (or Perfect) Price Discrimination, the seller knows the exact reservation price of each buyer and charges that exact amount, transferring the entire consumer surplus into producer surplus.\nHence, Option {{CORR}} is correct.",
    "Defines first-degree price discrimination."
)
add_q(make_question(CHAPTER, "Monopoly", "What occurs under 'First-Degree Price Discrimination' (Perfect Price Discrimination)?", opts, corr, sol))

# 39. Second-degree price discrimination
opts, corr, sol = rotate_options(
    "Charging different prices for different blocks of output or quantities consumed (e.g. electricity billing slabs)",
    [
        "Charging each individual customer their unique reservation price",
        "Charging different prices based on geographical distance alone",
        "Fixing prices in consultation with a consumer advocacy council"
    ],
    "A",
    "1. In Second-Degree Price Discrimination (block pricing), the monopolist charges different rates for different blocks of consumption (e.g. utility billing where first 100 units cost less, subsequent units cost more).\nHence, Option {{CORR}} is correct.",
    "Defines second-degree block pricing."
)
add_q(make_question(CHAPTER, "Monopoly", "What is an example and definition of 'Second-Degree Price Discrimination'?", opts, corr, sol))

# 40. Third-degree price discrimination
opts, corr, sol = rotate_options(
    "Dividing consumers into distinct sub-markets based on demographic or geographic elasticity differences (e.g. student discounts, airline ticketing)",
    [
        "Charging every consumer the exact same price across all continents",
        "Auctioning goods to the highest bidder in open commodity exchanges",
        "Charging zero price for variable inputs"
    ],
    "B",
    "1. Third-Degree Price Discrimination involves segmenting consumers into separate groups with different price elasticities (e.g. student discounts, senior citizen fares, international dumping) and charging a higher price to the more inelastic segment.\nHence, Option {{CORR}} is correct.",
    "Defines third-degree price discrimination."
)
add_q(make_question(CHAPTER, "Monopoly", "How is 'Third-Degree Price Discrimination' structured by a monopolist?", opts, corr, sol))

# 41. Non-price competition in Oligopoly
opts, corr, sol = rotate_options(
    "Competing through advertising, product styling, after-sales service, and promotional warranties rather than price cuts",
    [
        "Selling identical products below average variable cost continuously",
        "Forming illegal price-fixing syndicates in residential neighborhoods",
        "Allowing customer bidding to determine factory gate prices"
    ],
    "C",
    "1. Because price wars are mutually destructive in an oligopoly, firms prefer 'Non-Price Competition'—competing via advertising campaigns, extended warranties, financing schemes, and loyalty clubs.\nHence, Option {{CORR}} is correct.",
    "Defines non-price competition in oligopoly."
)
add_q(make_question(CHAPTER, "Oligopoly", "What does 'Non-Price Competition' mean in an oligopolistic market?", opts, corr, sol))

# 42. Pure vs Differentiated Oligopoly
opts, corr, sol = rotate_options(
    "Pure oligopoly produces homogeneous products (e.g. steel, cement), while differentiated oligopoly produces differentiated goods (e.g. cars, smartphones)",
    [
        "Pure oligopoly has only one seller while differentiated has two sellers",
        "Pure oligopoly is legal while differentiated oligopoly is illegal",
        "Pure oligopoly operates with zero fixed capital"
    ],
    "D",
    "1. When the few firms in an oligopoly produce standardized/identical products (like aluminum, crude oil, cement), it is a Pure (Homogeneous) Oligopoly. When their products are branded and differentiated (like passenger cars, soft drinks), it is a Differentiated (Imperfect) Oligopoly.\nHence, Option {{CORR}} is correct.",
    "Contrasts pure and differentiated oligopoly."
)
add_q(make_question(CHAPTER, "Oligopoly", "How is a 'Pure Oligopoly' distinguished from a 'Differentiated Oligopoly'?", opts, corr, sol))

# 43. Monopsony definition
opts, corr, sol = rotate_options(
    "A market structure characterized by a single buyer facing many competing sellers",
    [
        "A market with a single seller facing one single buyer",
        "A market with hundreds of small independent retailers",
        "A competitive market with government price floors"
    ],
    "A",
    "1. A Monopsony exists when there is only one buyer for a good or factor of production (e.g. the military buying specialized fighter aircraft, or a single tea factory buying green leaves from hundreds of small growers).\nHence, Option {{CORR}} is correct.",
    "Defines monopsony as single buyer market."
)
add_q(make_question(CHAPTER, "Forms of Market", "What is a 'Monopsony'?", opts, corr, sol))

# 44. Bilateral Monopoly definition
opts, corr, sol = rotate_options(
    "A market situation where a single seller (monopolist) faces a single buyer (monopsonist)",
    [
        "A market with two monopolists producing complementary goods",
        "A cartel operating across two distinct geographic provinces",
        "A competitive industry subject to dual regulatory authorities"
    ],
    "B",
    "1. A Bilateral Monopoly is a market structure in which a single seller (monopolist) negotiates with a single buyer (monopsonist) (e.g. an organized trade union negotiating with a sole corporate employer in a company town).\nHence, Option {{CORR}} is correct.",
    "Defines bilateral monopoly."
)
add_q(make_question(CHAPTER, "Forms of Market", "What does the term 'Bilateral Monopoly' refer to in microeconomics?", opts, corr, sol))

# 45. Statement I & II: Monopoly vs Perfect Competition output and price
add_q(make_statement_question(
    CHAPTER, "Market Structures Comparison",
    "Compared to a perfectly competitive industry, a profit-maximizing monopolist restricts output and charges a higher price.",
    "Under perfect competition, price equals marginal cost, whereas under monopoly, price exceeds marginal cost.",
    "A",
    "1. Statement I is true: Monopoly output is smaller and price is higher than under perfect competition.\n2. Statement II is true: Competitive pricing achieves $P = MC$, whereas monopoly power allows $P > MC$.\nHence, both statements are true (Option A)."
))

# 46. Assertion & Reason: Selling costs in Monopolistic Competition
add_q(make_assertion_question(
    CHAPTER, "Monopolistic Competition",
    "Firms under monopolistic competition incur substantial selling costs on advertisement and promotional campaigns.",
    "Because products are differentiated, firms must persuade consumers of the superior qualities of their unique brand over rival substitutes.",
    "A",
    "1. Assertion is true: Monopolistic competition involves significant advertising expenditure.\n2. Reason is true: Product differentiation creates brand rivalry, necessitating persuasive promotional efforts.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 47. Entry barriers in Monopoly: Types
opts, corr, sol = rotate_options(
    "Legal restrictions (patents, copyrights), control over strategic raw materials, and large initial capital requirements",
    [
        "Consumer preference for perfectly homogeneous standardized goods",
        "High corporate income tax rates applicable uniformly to all businesses",
        "The constitutional guarantee of free interstate commerce"
    ],
    "C",
    "1. Barriers to entry protecting a monopoly include legal barriers (patents, government franchises), resource ownership (exclusive control over critical mineral reserves), and economic barriers (massive economies of scale, high setup costs).\nHence, Option {{CORR}} is correct.",
    "Lists fundamental entry barriers creating monopoly."
)
add_q(make_question(CHAPTER, "Monopoly", "Which factors serve as effective barriers to the entry of new firms into a monopoly market?", opts, corr, sol))

# 48. Price leadership in Oligopoly
opts, corr, sol = rotate_options(
    "A dominant or low-cost firm tacitly sets the market price which is subsequently adopted by all other firms in the industry",
    [
        "The central bank legally dictates retail selling prices for all corporations",
        "Firms auction their output to international buyers on digital exchanges",
        "Firms secretly bribe retail store managers to hide competitors' products"
    ],
    "D",
    "1. Price Leadership is a form of tacit collusion in oligopoly where the leading firm (dominant firm or barometric firm) announces price changes, and other firms follow voluntarily to avoid price wars.\nHence, Option {{CORR}} is correct.",
    "Defines price leadership in oligopoly."
)
add_q(make_question(CHAPTER, "Oligopoly", "What does 'Price Leadership' signify in oligopolistic market behavior?", opts, corr, sol))

# 49. Price determination in Perfect Competition: Equilibrium
opts, corr, sol = rotate_options(
    "At the intersection of the market demand curve and the market supply curve",
    [
        "At the point where the largest firm's total revenue is maximized",
        "At the level where the government's tax revenue is highest",
        "At the lowest price that consumers request during survey interviews"
    ],
    "A",
    "1. In a perfectly competitive industry, the equilibrium market price is determined solely by the interaction of aggregate market demand and aggregate market supply.\nHence, Option {{CORR}} is correct.",
    "States equilibrium price determination in perfect competition."
)
add_q(make_question(CHAPTER, "Perfect Competition", "How is the equilibrium price determined in a perfectly competitive industry?", opts, corr, sol))

# 50. Supply curve of a competitive industry
opts, corr, sol = rotate_options(
    "The horizontal summation of the short-run marginal cost curves of all individual firms in the industry",
    [
        "The vertical summation of individual firm average fixed cost curves",
        "The average of the highest and lowest prices charged across retail shops",
        "A downward-sloping linear curve determined by consumer income"
    ],
    "B",
    "1. The short-run supply curve of a perfectly competitive industry is derived by the horizontal summation of the supply curves (rising portions of SMC on and above min AVC) of all individual firms in the industry.\nHence, Option {{CORR}} is correct.",
    "Identifies industry supply as horizontal sum of firm MC curves."
)
add_q(make_question(CHAPTER, "Perfect Competition", "How is the Market Supply Curve of a perfectly competitive industry derived?", opts, corr, sol))

# 51. Match Market Forms with Price Control
add_q(make_match_question(
    CHAPTER, "Market Structures Comparison",
    "Match the market forms in List I with their degree of control over product price in List II:",
    [
        ("A", "Perfect Competition"),
        ("B", "Monopoly"),
        ("C", "Monopolistic Competition"),
        ("D", "Oligopoly")
    ],
    [
        ("I", "Considerable price discretion influenced by rival reactions"),
        ("II", "Full control over price subject to consumer demand curve"),
        ("III", "Zero control (Price Taker)"),
        ("IV", "Partial / limited control due to product differentiation")
    ],
    "A-(III), B-(II), C-(IV), D-(I)",
    [
        "A-(III), B-(IV), C-(II), D-(I)",
        "A-(II), B-(III), C-(IV), D-(I)",
        "A-(IV), B-(II), C-(III), D-(I)"
    ],
    "A",
    "1. Perfect Competition -> Zero control (III).\n2. Monopoly -> Full control (II).\n3. Monopolistic Competition -> Limited control (IV).\n4. Oligopoly -> Considerable control influenced by rivals (I).\nHence, Option A is correct."
))

# 52. Statement I & II: Monopoly profit in long run
add_q(make_statement_question(
    CHAPTER, "Monopoly",
    "A monopolist can earn supernormal economic profits even in the long run.",
    "Formidable barriers to entry prevent new rival firms from entering the industry and competing away excess profits.",
    "A",
    "1. Statement I is true: Unlike competitive firms, a monopolist can sustain supernormal profit indefinitely.\n2. Statement II is true: Entry barriers prevent new firms from eroding profits.\nHence, both statements are true (Option A)."
))

# 53. Assertion & Reason: Excess capacity under monopolistic competition
add_q(make_assertion_question(
    CHAPTER, "Monopolistic Competition",
    "Firms under monopolistic competition operate with excess capacity in long-run equilibrium.",
    "Because each firm faces a downward-sloping demand curve, tangency with the U-shaped LAC curve must occur to the left of the minimum LAC point.",
    "A",
    "1. Assertion is true: Monopolistic competition leads to excess capacity.\n2. Reason is true: Tangency between a downward-sloping line ($AR$) and a U-shaped curve ($LAC$) can only occur where LAC is also downward-sloping.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 54. Shut down vs Exit in the long run
opts, corr, sol = rotate_options(
    "Shutdown is a short-run decision when P < min AVC, whereas exit is a long-run decision when P < min LAC",
    [
        "Shutdown occurs in monopoly while exit occurs only in oligopoly",
        "Shutdown means liquidating physical machinery while exit means temporary pause",
        "Both terms are interchangeable and apply only to agricultural farms"
    ],
    "C",
    "1. Shutdown is a short-run operating decision: the firm temporarily produces zero output if revenue cannot cover variable costs ($P < \\min AVC$), while retaining its fixed plant. Exit is a long-run decision: the firm permanently liquidates and leaves the industry if $P < \\min LAC$.\nHence, Option {{CORR}} is correct.",
    "Differentiates short-run shutdown from long-run exit."
)
add_q(make_question(CHAPTER, "Theory of the Firm", "What is the economic distinction between a 'Shutdown' and an 'Exit' of a firm?", opts, corr, sol))

# 55. Patent as legal monopoly
opts, corr, sol = rotate_options(
    "A government-granted exclusive legal right to an inventor to manufacture and sell an innovation for a specified number of years",
    [
        "A tariff levied on imported luxury automobiles",
        "A quality certificate issued by municipal food inspectors",
        "A subsidy paid to farmers cultivating organic pulses"
    ],
    "D",
    "1. A patent provides a temporary legal monopoly to an inventor (e.g. 20 years for a new pharmaceutical compound) to encourage investment in research and development by shielding the inventor from imitation.\nHence, Option {{CORR}} is correct.",
    "Defines patent rights as institutional barrier to entry."
)
add_q(make_question(CHAPTER, "Monopoly", "How does a 'Patent' create a monopoly market structure?", opts, corr, sol))

# 56. Collusion breakdown in Cartels
opts, corr, sol = rotate_options(
    "Individual cartel members face strong financial incentives to secretly cheat by producing beyond their assigned quotas",
    [
        "Cartel members face declining marginal costs that make production impossible",
        "Consumer demand curves become vertical whenever cartels are formed",
        "International shipping companies refuse to carry cartel commodities"
    ],
    "A",
    "1. Cartels are inherently unstable because once the cartel restricts output and raises price, any individual member can significantly increase its own profit by secretly producing beyond its quota at the high market price, leading to quota-busting and price collapse.\nHence, Option {{CORR}} is correct.",
    "Explains inherent instability of cartels via cheating incentive."
)
add_q(make_question(CHAPTER, "Oligopoly", "Why do international cartels like OPEC frequently experience organizational instability and price cheating?", opts, corr, sol))

# 57. Welfare comparison: Consumer surplus
opts, corr, sol = rotate_options(
    "Consumer surplus is highest under Perfect Competition and lowest under Monopoly",
    [
        "Consumer surplus is highest under Monopoly and lowest under Perfect Competition",
        "Consumer surplus is identical across all market structures",
        "Consumer surplus is zero under both Perfect Competition and Oligopoly"
    ],
    "B",
    "1. Perfect Competition produces the largest output at the lowest price ($P = MC$), maximizing consumer surplus. Monopoly restricts output and raises price, capturing part of consumer surplus and destroying the rest as deadweight loss.\nHence, Option {{CORR}} is correct.",
    "Ranks consumer surplus across market forms."
)
add_q(make_question(CHAPTER, "Market Structures Comparison", "How does total Consumer Surplus compare between Perfect Competition and Monopoly?", opts, corr, sol))

# 58. Sequence of price rigidity response in Sweezy model
add_q(make_sequence_question(
    CHAPTER, "Oligopoly",
    "Arrange the following behavioral reactions illustrating Sweezy's Kinked Demand Curve hypothesis:",
    [
        "A single oligopolist considers altering its price from the current prevailing equilibrium level",
        "If the firm raises price, competitors ignore the hike, causing the firm to lose massive sales (elastic demand)",
        "If the firm cuts price, competitors match the reduction to protect market shares, limiting sales gains (inelastic demand)",
        "Concluding that price changes reduce profits in both directions, the firm keeps its price rigid at the kink"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (C), (D)",
        "(A), (C), (B), (D)",
        "(C), (A), (B), (D)"
    ],
    "A",
    "1. The firm evaluates price change (A) -> Recognizes rivals ignore hikes (B) -> Recognizes rivals match cuts (C) -> Concludes price rigidity is optimal (D).\nHence, Option A is correct."
))

# 59. Lerner Index of Monopoly Power
opts, corr, sol = rotate_options(
    "L = (P - MC) / P = 1 / e_d",
    [
        "L = (P + MC) / P",
        "L = MC / P",
        "L = Total Revenue / Total Cost"
    ],
    "C",
    "1. The Lerner Index measures a firm's degree of monopoly power: $L = \\frac{P - MC}{P} = \\frac{1}{e_d}$. Under perfect competition, $P = MC \\implies L = 0$. As monopoly power grows, price exceeds MC and $L$ approaches 1.\nHence, Option {{CORR}} is correct.",
    "States Lerner Index formula."
)
add_q(make_question(CHAPTER, "Monopoly", "What is the formula for the 'Lerner Index' measuring monopoly power?", opts, corr, sol))

# 60. Cross-elasticity of demand in Pure Monopoly
opts, corr, sol = rotate_options(
    "Zero or very close to zero, because there are no close substitutes available in the market",
    [
        "Infinite, because consumers can easily switch to other goods",
        "Negative and exceptionally large",
        "Strictly equal to +1.0"
    ],
    "D",
    "1. In a pure monopoly, the good has no close substitutes. Therefore, changes in the prices of other goods have virtually no effect on the quantity demanded of the monopoly product, making cross-elasticity of demand zero or negligible.\nHence, Option {{CORR}} is correct.",
    "Identifies zero cross-elasticity in pure monopoly."
)
add_q(make_question(CHAPTER, "Monopoly", "What is the value of the Cross-Price Elasticity of Demand for the product of a pure monopolist?", opts, corr, sol))

# Verify count and uniqueness
assert len(questions) == 60, f"Expected 60 questions, got {len(questions)}"
print(f"Successfully generated {len(questions)} unique questions for Unit 4!")

out_path = "mock/eco_units/unit4.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
