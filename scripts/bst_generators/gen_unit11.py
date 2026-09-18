import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.bst_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text,
    get_pyq_normalized_set
)

CHAPTER = "Marketing Management"
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

print("Generating 80 unique questions for Unit 11: Marketing Management...")

# =================================================================================================
# 1. Marketing Concept, Philosophies & Marketing vs Selling (Q1 - Q14)
# =================================================================================================

opts, corr, sol = rotate_options(
    "A social process by which individual groups obtain what they need and want through creating, offering, and freely exchanging products and services of value with others",
    [
        "A mechanical factory assembly technique to mass-produce standardized hardware",
        "A statutory administrative filing with corporate registrar tribunals",
        "A speculative stock market transaction executed on international exchanges"
    ],
    "A",
    "1. Philip Kotler defines marketing as a social process by which individuals and groups obtain what they need and want through creating, offering, and freely exchanging products and services of value with others.\nHence, Option {{CORR}} is correct.",
    "Defines Marketing according to Kotler."
)
add_q(make_question(CHAPTER, "Concept of Marketing", "Which classic definition describes 'Marketing' according to Philip Kotler?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Production Concept",
    [
        "Product Concept",
        "Selling Concept",
        "Societal Marketing Concept"
    ],
    "B",
    "1. The Production Concept assumes that consumers favor products that are widely available and affordable; hence, management focuses on mass production and lowering unit costs.\nHence, Option {{CORR}} is correct.",
    "Defines Production Concept."
)
add_q(make_question(CHAPTER, "Marketing Philosophies", "Which marketing philosophy operates on the premise that consumers will favor products that are widely available and inexpensive?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Product Concept",
    [
        "Production Concept",
        "Selling Concept",
        "Societal Marketing Concept"
    ],
    "C",
    "1. The Product Concept assumes that consumers favor products offering superior quality, performance, and innovative features; hence, management focuses on continuous product improvements.\nHence, Option {{CORR}} is correct.",
    "Defines Product Concept."
)
add_q(make_question(CHAPTER, "Marketing Philosophies", "A philosophy where management believes that superior quality and continuous product improvement alone will automatically attract buyers is the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Selling Concept",
    [
        "Marketing Concept",
        "Production Concept",
        "Societal Marketing Concept"
    ],
    "D",
    "1. The Selling Concept assumes that consumers will not buy enough products unless the enterprise undertakes aggressive selling and intensive promotional efforts to push goods.\nHence, Option {{CORR}} is correct.",
    "Defines Selling Concept."
)
add_q(make_question(CHAPTER, "Marketing Philosophies", "The philosophy that assumes consumers must be persuaded and aggressively pushed through advertising and high-pressure salesmanship is the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Marketing Concept",
    [
        "Production Concept",
        "Selling Concept",
        "Product Concept"
    ],
    "A",
    "1. The Marketing Concept holds that the key to achieving organizational goals consists in identifying the needs and wants of target markets and satisfying them more effectively than competitors.\nHence, Option {{CORR}} is correct.",
    "Defines Marketing Concept."
)
add_q(make_question(CHAPTER, "Marketing Philosophies", "A philosophy that prioritizes understanding consumer needs and delivering customer satisfaction as the key to long-term profitability is the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Societal Marketing Concept",
    [
        "Production Concept",
        "Selling Concept",
        "Product Concept"
    ],
    "B",
    "1. The Societal Marketing Concept holds that the task of the organization is to deliver customer satisfaction while preserving or enhancing consumer and societal well-being (ecological balance, ethics).\nHence, Option {{CORR}} is correct.",
    "Defines Societal Marketing Concept."
)
add_q(make_question(CHAPTER, "Marketing Philosophies", "Which marketing philosophy balances customer satisfaction, enterprise profitability, and long-term public welfare (ecological conservation, ethics)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Manufacturing eco-friendly biodegradable packaging and avoiding hazardous chemical dyes",
    [
        "Promoting tobacco products aggressively to underage teenagers",
        "Dumping toxic industrial effluents into local municipal water rivers",
        "Hoarding essential medicines during epidemics to inflate black-market prices"
    ],
    "C",
    "1. Adopting biodegradable packaging and eliminating toxic dyes exemplifies the Societal Marketing Concept by safeguarding long-term environmental and social welfare.\nHence, Option {{CORR}} is correct.",
    "Applies Societal Marketing Concept to eco-friendly practice."
)
add_q(make_question(CHAPTER, "Marketing Philosophies", "Which corporate practice directly reflects the application of the 'Societal Marketing Concept'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Selling focuses on seller's needs to convert goods into cash; Marketing focuses on customer needs and satisfaction",
    [
        "Selling is done by doctors; Marketing is done by factory workers",
        "Selling starts before production; Marketing starts after sale",
        "Selling is long-term; Marketing is a one-minute interaction"
    ],
    "D",
    "1. Selling focuses on the seller's need to convert goods into cash through promotion. Marketing focuses on satisfying customer needs through integrated marketing.\nHence, Option {{CORR}} is correct.",
    "Contrasts Selling and Marketing."
)
add_q(make_question(CHAPTER, "Marketing vs Selling", "What is the primary conceptual distinction between 'Selling' and 'Marketing'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Marketing starts much before production commences and continues even after sale has taken place",
    [
        "Marketing begins only when goods reach the retail cash counter",
        "Marketing ends permanently the moment the invoice is printed",
        "Marketing occurs exclusively during annual shareholder meetings"
    ],
    "A",
    "1. Marketing begins before production (with market research and product design) and continues after sale (with after-sales service and customer support).\nHence, Option {{CORR}} is correct.",
    "Highlights marketing beginning before production and continuing after sale."
)
add_q(make_question(CHAPTER, "Marketing vs Selling", "Regarding the starting and ending points of activities, how does Marketing operate?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Standardization ensures uniformity; Grading classifies products into categories based on quality/size",
    [
        "Standardization is for food; Grading is exclusively for computers",
        "Standardization is done by buyers; Grading is done by advertising agencies",
        "Both terms are identical and mean issuing discount coupons"
    ],
    "B",
    "1. Standardization refers to producing goods to predetermined specifications ensuring uniformity. Grading classifies goods into lots according to quality, size, or weight (e.g., Basmati rice grades).\nHence, Option {{CORR}} is correct.",
    "Contrasts Standardization and Grading."
)
add_q(make_question(CHAPTER, "Functions of Marketing", "What is the distinction between 'Standardization' and 'Grading' in marketing?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Grading",
    [
        "Standardization",
        "Warehousing",
        "Promotional Pricing"
    ],
    "C",
    "1. Grading is particularly necessary for agricultural goods (apples, wheat, cotton) that cannot be produced to predetermined industrial standards, sorting them by quality.\nHence, Option {{CORR}} is correct.",
    "Identifies Grading for agricultural produce."
)
add_q(make_question(CHAPTER, "Functions of Marketing", "Classifying agricultural produce like apples or wheat into distinct lots based on size, color, and quality is known as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Product, Price, Place, and Promotion",
    [
        "Planning, Organizing, Directing, and Controlling",
        "Production, Purchasing, Payroll, and Profit",
        "Personnel, Policy, Procedure, and Program"
    ],
    "D",
    "1. The Marketing Mix consists of the 4 Ps formulated by E. Jerome McCarthy: Product, Price, Place (Physical Distribution), and Promotion.\nHence, Option {{CORR}} is correct.",
    "Lists the 4 Ps of Marketing Mix."
)
add_q(make_question(CHAPTER, "Marketing Mix", "What are the four foundational elements constituting the 'Marketing Mix' (4 Ps)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Gathering and analyzing market information (Market Research)",
    [
        "Discontinuing all consumer warranty support",
        "Eliminating product transportation channels",
        "Refusing to accept payment in domestic currency"
    ],
    "A",
    "1. Gathering and analyzing market information is an important marketing function necessary to identify customer needs and guide new product development.\nHence, Option {{CORR}} is correct.",
    "Highlights gathering market information."
)
add_q(make_question(CHAPTER, "Functions of Marketing", "Conducting systematic consumer surveys to identify unmet market needs and evaluate competitive strengths exemplifies:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Customer Support Services",
    [
        "Storage and Warehousing",
        "Standardization",
        "Product Packaging"
    ],
    "B",
    "1. Customer support services include after-sales service, handling customer complaints, maintenance, and technical assistance to maximize customer satisfaction.\nHence, Option {{CORR}} is correct.",
    "Defines Customer Support Services."
)
add_q(make_question(CHAPTER, "Functions of Marketing", "Providing free routine servicing, prompt spare part replacements, and dedicated helpline support to car buyers illustrates:", opts, corr, sol))

# =================================================================================================
# 2. Product Mix: Branding, Packaging & Labelling (Q15 - Q30)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Generic name refers to whole class of product; Brand name identifies a specific manufacturer's product",
    [
        "Generic name is patented; Brand name is free public property",
        "Generic name is in English; Brand name is exclusively in Latin",
        "Generic name is illegal; Brand name is legally compulsory"
    ],
    "C",
    "1. A generic name refers to the broad product category (e.g., 'soap', 'car'), whereas a brand name identifies and distinguishes a specific firm's offering (e.g., 'Lux', 'Creta').\nHence, Option {{CORR}} is correct.",
    "Contrasts generic name and brand name."
)
add_q(make_question(CHAPTER, "Branding", "What is the difference between a 'Generic Name' and a 'Brand Name'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Brand Mark",
    [
        "Brand Name",
        "Trade Mark",
        "Generic Label"
    ],
    "D",
    "1. A Brand Mark is that part of a brand which can be recognized but is not utterable in words (e.g., the Nike 'swoosh' or the Mercedes star symbol).\nHence, Option {{CORR}} is correct.",
    "Defines Brand Mark."
)
add_q(make_question(CHAPTER, "Branding", "That visual portion of a brand which can be recognized but cannot be vocalized or spoken in words (such as a symbol or logo) is a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Trade Mark",
    [
        "Brand Mark",
        "Brand Name",
        "Generic Title"
    ],
    "A",
    "1. A Trade Mark is a brand or part of a brand that is given legal protection, giving the owner exclusive statutory rights to its use.\nHence, Option {{CORR}} is correct.",
    "Defines Trade Mark."
)
add_q(make_question(CHAPTER, "Branding", "A brand or visual mark that has been granted legal registration and protection against unauthorized imitation is a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Short, easy to pronounce and remember, suggestive of product benefits, and distinctive",
    [
        "Extremely long and complex with difficult foreign botanical terms",
        "Identical to existing competitor brands to deceive customers",
        "Vague, unmemorable, and impossible to legally register"
    ],
    "B",
    "1. Characteristics of a good brand name include: short, easy to pronounce/spell, suggestive of benefits (e.g., 'Hajmola', 'Ujala'), and distinctive.\nHence, Option {{CORR}} is correct.",
    "Lists characteristics of a good brand name."
)
add_q(make_question(CHAPTER, "Branding", "Which set of characteristics defines an effective, memorable 'Brand Name'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "It suggests the product's functional benefits and utility",
    [
        "It is legally prohibited under the Trade Marks Act",
        "It confuses the consumer about what the product does",
        "It is a foreign unpronounceable scientific term"
    ],
    "C",
    "1. Brand names like 'Ujala' (suggesting brightness) or 'Hajmola' (suggesting digestion) are ideal because they directly suggest the product's benefits.\nHence, Option {{CORR}} is correct.",
    "Highlights benefit suggestion in brand names."
)
add_q(make_question(CHAPTER, "Branding", "The brand name 'Ujala' for fabric whitener exemplifies which desirable brand attribute?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Primary Package, Secondary Package, and Transportation Package",
    [
        "Internal, External, and Global Package",
        "First, Second, and Final Package",
        "Direct, Indirect, and Neutral Package"
    ],
    "D",
    "1. The three standard levels of packaging are: (1) Primary package, (2) Secondary package, and (3) Transportation package.\nHence, Option {{CORR}} is correct.",
    "Lists three levels of packaging."
)
add_q(make_question(CHAPTER, "Packaging", "What are the three recognized levels of packaging in marketing?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Primary Package",
    [
        "Secondary Package",
        "Transportation Package",
        "Promotional Package"
    ],
    "A",
    "1. The Primary Package refers to the product's immediate container (e.g., the tube holding toothpaste or the glass bottle holding cough syrup).\nHence, Option {{CORR}} is correct.",
    "Defines Primary Package."
)
add_q(make_question(CHAPTER, "Packaging", "The immediate container in which the product is directly enclosed (such as a tube of toothpaste) is the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Secondary Package",
    [
        "Primary Package",
        "Transportation Package",
        "Export Container"
    ],
    "B",
    "1. The Secondary Package refers to additional layers of protection that are kept till the product is ready for use (e.g., the cardboard box covering a toothpaste tube).\nHence, Option {{CORR}} is correct.",
    "Defines Secondary Package."
)
add_q(make_question(CHAPTER, "Packaging", "The cardboard box housing a tube of toothpaste that is discarded once the consumer begins using the product is a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Transportation Package",
    [
        "Primary Package",
        "Secondary Package",
        "Retail Wrapper"
    ],
    "C",
    "1. Transportation packaging refers to further packaging components necessary for storage, identification, and transportation (e.g., corrugated boxes holding 50 toothpaste units).\nHence, Option {{CORR}} is correct.",
    "Defines Transportation Package."
)
add_q(make_question(CHAPTER, "Packaging", "Corrugated fiberboard cartons used to pack and protect dozens of retail units during freight shipment represent:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Silent Salesman",
    [
        "Active Wholesaler",
        "Statutory Arbitrator",
        "Credit Underwriter"
    ],
    "D",
    "1. Packaging is often referred to as a 'silent salesman' in self-service retail stores because attractive, innovative packaging catches buyer eye and stimulates purchases.\nHence, Option {{CORR}} is correct.",
    "Identifies packaging as silent salesman."
)
add_q(make_question(CHAPTER, "Packaging", "In modern self-service supermarkets, attractive and innovative packaging serves as a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Product identification, protection, facilitating use, and product promotion",
    [
        "Corporate dividend distribution, debt audit, tax calculation",
        "Employee recruitment, selection testing, job appraisal",
        "Factory machinery repair, assembly line pacing, trade bargaining"
    ],
    "A",
    "1. Core functions of packaging are: Product identification, Product protection, Facilitating use of product, and Product promotion.\nHence, Option {{CORR}} is correct.",
    "Lists functions of packaging."
)
add_q(make_question(CHAPTER, "Packaging", "Which group comprises the primary operational functions of 'Packaging'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A simple tag or complex graphic label attached to a product giving information about it",
    [
        "A formal legal court injunction prohibiting factory labor strikes",
        "A physical electronic computer chip inside warehouse robotics",
        "A statutory financial bank draft for paying supplier invoices"
    ],
    "B",
    "1. A label is a carrier of information attached to a package or product that provides details regarding manufacturer, ingredients, weight, price, and usage instructions.\nHence, Option {{CORR}} is correct.",
    "Defines Labelling."
)
add_q(make_question(CHAPTER, "Labelling", "What is 'Labelling' in marketing management?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Providing information required by statutory law",
    [
        "Product designing and styling",
        "Physical transportation scheduling",
        "Credit underwriting"
    ],
    "C",
    "1. Printing mandatory disclosures like MRP, expiry date, batch number, FSSAI license, or statutory warnings fulfills the labelling function of legal compliance.\nHence, Option {{CORR}} is correct.",
    "Identifies legal compliance function of labelling."
)
add_q(make_question(CHAPTER, "Labelling", "Printing the Maximum Retail Price (MRP), manufacturing date, batch number, and ingredients on packaged food satisfies which labelling function?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Grading of products",
    [
        "Silent advertising",
        "Direct distribution",
        "Promotional pricing"
    ],
    "D",
    "1. Labels help in grading products into distinct categories (e.g., Brooke Bond Red Label, Yellow Label, Green Label) based on quality or blend.\nHence, Option {{CORR}} is correct.",
    "Identifies Grading function of labelling."
)
add_q(make_question(CHAPTER, "Labelling", "A tea manufacturer marketing varieties under different colored labels (Red Label, Green Label) utilizes labelling for:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Describing the product and specifying its contents, batch, and usage instructions",
    [
        "Abolishing consumer complaints permanently",
        "Insulating goods from wholesale freight charges",
        "Exempting buyers from state goods and services tax"
    ],
    "A",
    "1. The foundational function of a label is to describe the product and specify its contents, nutritional facts, batch number, and instructions for safe use.\nHence, Option {{CORR}} is correct.",
    "Highlights describing product and contents."
)
add_q(make_question(CHAPTER, "Labelling", "Which of the following is a primary function performed by a product 'Label'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Facilitating the use of the product (convenience in opening and consuming)",
    [
        "Statutory tax evasion",
        "Eliminating product shelf-life",
        "Preventing product exports"
    ],
    "B",
    "1. Packages like toothpaste tubes, squeeze bottles of tomato sauce, or pet bottles with flip caps facilitate convenient handling and use by consumers.\nHence, Option {{CORR}} is correct.",
    "Highlights facilitating use through packaging."
)
add_q(make_question(CHAPTER, "Packaging", "Designing a plastic bottle with a specialized flip-top nozzle for shampoo primarily serves which packaging function?", opts, corr, sol))

# =================================================================================================
# 3. Price Mix & Place Mix (Channels & Physical Distribution) (Q31 - Q42)
# =================================================================================================

opts, corr, sol = rotate_options(
    "The amount of money paid by a buyer to a seller in exchange for a product or service",
    [
        "The physical weight of the packaged cargo shipment",
        "The total advertising budget approved by marketing directors",
        "The statutory stamp duty charged by the registrar of companies"
    ],
    "C",
    "1. Price is the amount of money paid by a buyer (or received by a seller) in consideration of the purchase of a product or service.\nHence, Option {{CORR}} is correct.",
    "Defines Price."
)
add_q(make_question(CHAPTER, "Price Mix", "Which statement accurately defines 'Price' in marketing?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Product cost, Utility and demand, Extent of competition, and Government regulations",
    [
        "Office furniture, Factory paint, Warehouse ventilation, Machine age",
        "Trade union bylaws, Worker hobbies, Employee age, Postal rates",
        "Company logo design, Typography font, Billboard dimensions"
    ],
    "D",
    "1. Crucial factors determining price include: Product cost (floor price), Utility and demand (ceiling price), Extent of market competition, Government regulations, and Pricing objectives.\nHence, Option {{CORR}} is correct.",
    "Lists factors determining price."
)
add_q(make_question(CHAPTER, "Price Mix", "Which group of factors crucially determines the 'Pricing' of a product?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Product cost sets the lower limit (floor price); Utility and demand set the upper limit (ceiling price)",
    [
        "Product cost sets the upper limit; Utility sets the lower limit",
        "Both floor and ceiling prices are fixed by the Supreme Court",
        "Neither cost nor utility has any correlation with product pricing"
    ],
    "A",
    "1. Product cost sets the minimum price below which a firm cannot sell in the long run (floor price), while the utility and consumer demand determine the maximum price buyers are willing to pay (ceiling price).\nHence, Option {{CORR}} is correct.",
    "Explains floor price and ceiling price."
)
add_q(make_question(CHAPTER, "Price Mix", "In product pricing, what roles do 'Product Cost' and 'Utility/Demand' play respectively?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Setting a low introductory price to capture a large market share and establish market leadership",
    [
        "Setting astronomical luxury prices to alienate middle-class buyers",
        "Charging zero price and giving products away free forever",
        "Allowing competitors to dictate all retail invoices"
    ],
    "B",
    "1. If a company aims to obtain market share leadership, it sets lower prices to attract maximum volume of customers and establish market dominance.\nHence, Option {{CORR}} is correct.",
    "Explains pricing for market share leadership."
)
add_q(make_question(CHAPTER, "Price Mix", "When a firm's pricing objective is 'Obtaining Market Share Leadership', how does it typically price its product?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Government declaring the drug an essential commodity and capping its Maximum Retail Price",
    [
        "Stock market traders buying company shares on margin",
        "Competitors closing down their manufacturing plants",
        "Workers demanding overtime wages during night shifts"
    ],
    "C",
    "1. To protect public interest, the government can regulate prices of essential goods (such as life-saving drugs under the Drug Price Control Order).\nHence, Option {{CORR}} is correct.",
    "Illustrates government regulation of prices."
)
add_q(make_question(CHAPTER, "Price Mix", "Which scenario exemplifies the influence of 'Government and Legal Regulations' on product pricing?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Direct Channel (Zero Level Channel)",
    [
        "One Level Channel",
        "Two Level Channel",
        "Three Level Channel"
    ],
    "D",
    "1. In a Zero Level (Direct) channel, the manufacturer sells directly to consumers without any intermediaries (e.g., Bata retail stores, company website, door-to-door sales).\nHence, Option {{CORR}} is correct.",
    "Defines Direct / Zero Level Channel."
)
add_q(make_question(CHAPTER, "Channels of Distribution", "A distribution structure where goods move directly from the manufacturer to consumers without any intermediaries is a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "One Level Channel (Manufacturer -> Retailer -> Customer)",
    [
        "Zero Level Channel",
        "Two Level Channel",
        "Three Level Channel"
    ],
    "A",
    "1. In a One Level channel, there is one intermediary—a retailer (Manufacturer -> Retailer -> Consumer), typical for cars, expensive garments, and branded appliances.\nHence, Option {{CORR}} is correct.",
    "Defines One Level Channel."
)
add_q(make_question(CHAPTER, "Channels of Distribution", "An automobile manufacturer selling cars to final consumers exclusively through authorized franchise dealerships utilizes a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Two Level Channel (Manufacturer -> Wholesaler -> Retailer -> Customer)",
    [
        "Zero Level Channel",
        "One Level Channel",
        "Three Level Channel"
    ],
    "B",
    "1. The most traditional channel for fast-moving consumer goods (soaps, biscuits, detergents) is the Two Level channel involving Wholesalers and Retailers.\nHence, Option {{CORR}} is correct.",
    "Defines Two Level Channel."
)
add_q(make_question(CHAPTER, "Channels of Distribution", "The most common channel for mass consumer goods (packaged tea, soaps) involving wholesalers and retailers is the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Three Level Channel",
    [
        "Zero Level Channel",
        "One Level Channel",
        "Two Level Channel"
    ],
    "C",
    "1. In a Three Level channel, mercantile agents (or C&F agents) are used between manufacturer and wholesalers to distribute goods across distant geographic regions.\nHence, Option {{CORR}} is correct.",
    "Defines Three Level Channel."
)
add_q(make_question(CHAPTER, "Channels of Distribution", "When a manufacturer engages regional carrying and forwarding (C&F) agents who sell to wholesalers, who in turn sell to retailers, the channel is a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Order Processing, Transportation, Warehousing, and Inventory Control",
    [
        "Preliminary Screening, Interviewing, Testing, and Selection",
        "Recruitment, Training, Performance Appraisal, and Promotion",
        "Branding, Packaging, Labelling, and Trade Mark Registration"
    ],
    "D",
    "1. The four essential physical distribution components are: (1) Order processing, (2) Transportation, (3) Warehousing, and (4) Inventory control.\nHence, Option {{CORR}} is correct.",
    "Lists components of Physical Distribution."
)
add_q(make_question(CHAPTER, "Physical Distribution", "What are the four core components comprising 'Physical Distribution'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Transportation creates place utility; Warehousing creates time utility",
    [
        "Transportation creates time utility; Warehousing creates form utility",
        "Transportation is done by courts; Warehousing is done by trade unions",
        "Both functions are identical and eliminate production costs"
    ],
    "A",
    "1. Transportation moves goods from points of production to points of consumption, creating 'place utility'. Warehousing stores goods until needed, creating 'time utility'.\nHence, Option {{CORR}} is correct.",
    "Contrasts utilities created by transportation and warehousing."
)
add_q(make_question(CHAPTER, "Physical Distribution", "In physical distribution, what specific economic utilities are created by 'Transportation' and 'Warehousing' respectively?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Higher inventory provides prompt customer service but inflates holding and carrying costs",
    [
        "Higher inventory completely eliminates the need for working capital",
        "Lower inventory guarantees that production lines never experience shortages",
        "Inventory levels have zero impact on corporate financial liquidity"
    ],
    "B",
    "1. Maintaining higher inventory levels ensures fast order fulfillment and avoids stock-outs, but incurs substantial financial holding, warehousing, and obsolescence costs.\nHence, Option {{CORR}} is correct.",
    "Explains the trade-off in inventory control."
)
add_q(make_question(CHAPTER, "Physical Distribution", "What fundamental operational trade-off must a manager balance in 'Inventory Control'?", opts, corr, sol))

# =================================================================================================
# 4. Promotion Mix: Advertising, Personal Selling, Sales Promotion & PR (Q43 - Q62)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Advertising, Personal Selling, Sales Promotion, and Public Relations",
    [
        "Product, Price, Place, and Physical Distribution",
        "Planning, Organizing, Staffing, and Directing",
        "Primary, Secondary, Transportation, and Packaging"
    ],
    "C",
    "1. The Promotion Mix consists of four major promotional tools: Advertising, Personal Selling, Sales Promotion, and Public Relations.\nHence, Option {{CORR}} is correct.",
    "Lists the four elements of Promotion Mix."
)
add_q(make_question(CHAPTER, "Promotion Mix", "What are the four major promotional tools that constitute the 'Promotion Mix'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Paid form, impersonality, and identified sponsor",
    [
        "Face-to-face interaction, personal rapport, and flexible negotiation",
        "Short-term discounts, scratch cards, and lucky draws",
        "Free press coverage without any sponsor identification"
    ],
    "D",
    "1. The three distinguishing features of advertising are: (1) Paid form, (2) Impersonality, and (3) Identified sponsor.\nHence, Option {{CORR}} is correct.",
    "Lists defining features of Advertising."
)
add_q(make_question(CHAPTER, "Advertising", "Which trio of characteristics distinctly defines 'Advertising'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Mass reach, enhancing customer satisfaction, expressiveness, and economy per contact",
    [
        "Personal physical touch and interactive real-time price negotiation",
        "Immediate cash refunds paid directly to consumers in bank accounts",
        "Zero financial cost to the promoting business enterprise"
    ],
    "A",
    "1. Advantages of advertising include reaching vast geographic audiences, enhancing consumer confidence in brand quality, dramatic visual expressiveness, and low cost per person reached.\nHence, Option {{CORR}} is correct.",
    "Lists major advantages of Advertising."
)
add_q(make_question(CHAPTER, "Advertising", "Which of the following is a prominent merit of 'Advertising' as a promotional medium?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Less forceful, lack of direct feedback, inflexibility of message, and low effectiveness for complex products",
    [
        "Extremely high cost per individual prospective buyer reached",
        "Prohibition under the Indian Contract Act",
        "Inability to broadcast across nationwide television networks"
    ],
    "B",
    "1. Major limitations of advertising are: it is impersonal and less forceful (no compulsion to listen), lacks immediate feedback, and cannot tailor messages to individual listeners.\nHence, Option {{CORR}} is correct.",
    "Lists limitations of Advertising."
)
add_q(make_question(CHAPTER, "Advertising", "What is a recognized limitation of Advertising?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Personal Selling",
    [
        "Advertising",
        "Public Relations",
        "Sales Promotion"
    ],
    "C",
    "1. Personal Selling involves oral presentation of message in the form of conversation with one or more prospective customers for the purpose of making sales.\nHence, Option {{CORR}} is correct.",
    "Defines Personal Selling."
)
add_q(make_question(CHAPTER, "Personal Selling", "Personal, face-to-face oral communication between a salesperson and a prospective buyer to consummate a sale is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Flexibility to adapt sales presentation to individual customer needs and instant direct feedback",
    [
        "Reaching 50 million consumers simultaneously in a single 30-second broadcast",
        "Lowest possible financial expenditure per prospective customer contact",
        "Impersonal transmission through print newspapers and digital billboards"
    ],
    "D",
    "1. Key merits of personal selling are its high flexibility (salesperson can tailor pitch to customer reactions) and direct, instant feedback from the buyer.\nHence, Option {{CORR}} is correct.",
    "Highlights merits of Personal Selling."
)
add_q(make_question(CHAPTER, "Personal Selling", "What is a decisive advantage of Personal Selling over Advertising?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Complex, high-value industrial machinery requiring technical demonstration",
    [
        "A ₹5 packaged packet of salt sold in neighborhood grocery shops",
        "A 50-paise matchbox sold at street corners",
        "A mass-market ₹10 branded sachet of shampoo"
    ],
    "A",
    "1. Personal selling is indispensable for complex, expensive industrial products (e.g., CNC machines, enterprise software) that require detailed technical demonstration and custom negotiation.\nHence, Option {{CORR}} is correct.",
    "Identifies suitability of Personal Selling for industrial products."
)
add_q(make_question(CHAPTER, "Personal Selling", "For which category of products is 'Personal Selling' substantially more effective than Advertising?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sound product knowledge, communication skills, pleasing personality, empathy, and integrity",
    [
        "Aggressive bullying demeanor and deceptive exaggeration",
        "Refusal to answer prospective customer inquiries",
        "Inability to explain technical operation of the product"
    ],
    "B",
    "1. Essential qualities of an effective salesperson include thorough product knowledge, high communication skills, personal empathy, pleasing appearance, and honesty.\nHence, Option {{CORR}} is correct.",
    "Lists qualities of a good salesperson."
)
add_q(make_question(CHAPTER, "Personal Selling", "Which set of traits exemplifies the qualities of a competent professional salesperson?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sales Promotion",
    [
        "Advertising",
        "Personal Selling",
        "Public Relations"
    ],
    "C",
    "1. Sales Promotion refers to short-term incentives which are designed to encourage the buyers to make immediate purchase of a product or service.\nHence, Option {{CORR}} is correct.",
    "Defines Sales Promotion."
)
add_q(make_question(CHAPTER, "Sales Promotion", "Short-term financial incentives and promotional schemes designed to stimulate immediate consumer purchases are:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Rebate",
    [
        "Discount",
        "Quantity Gift",
        "Sampling"
    ],
    "D",
    "1. Under a Rebate, products are offered at special reduced prices to clear off excess inventory (e.g., car maker offering ₹20,000 off on old model stock to clear inventory).\nHence, Option {{CORR}} is correct.",
    "Defines Rebate."
)
add_q(make_question(CHAPTER, "Sales Promotion Techniques", "Offering products at special reduced prices to liquidate accumulated excess inventory is known as a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Discount",
    [
        "Rebate",
        "Contest",
        "Sampling"
    ],
    "A",
    "1. Offering a percentage deduction from the list price (e.g., 'Flat 20% off on all garments') is a standard Discount.\nHence, Option {{CORR}} is correct.",
    "Defines Discount."
)
add_q(make_question(CHAPTER, "Sales Promotion Techniques", "Deducting a specified percentage from the list price (e.g., 'Flat 30% Off on all footwear') represents a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Product Combination",
    [
        "Quantity Gift",
        "Rebate",
        "Sampling"
    ],
    "B",
    "1. Offering another different product as an extra gift along with the main product (e.g., a free toothbrush with toothpaste, or free bowl with cereal) is a Product Combination.\nHence, Option {{CORR}} is correct.",
    "Defines Product Combination."
)
add_q(make_question(CHAPTER, "Sales Promotion Techniques", "Offering a complimentary toothbrush inside a pack of toothpaste exemplifies which sales promotion technique?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Quantity Gift",
    [
        "Product Combination",
        "Discount",
        "Rebate"
    ],
    "C",
    "1. Offering extra quantity of the same product without additional charge (e.g., 'Buy 2 Get 1 Free' or '25% Extra Volume Free') is a Quantity Gift.\nHence, Option {{CORR}} is correct.",
    "Defines Quantity Gift."
)
add_q(make_question(CHAPTER, "Sales Promotion Techniques", "A consumer pack offering 'Buy 2 Soaps, Get 1 Free' or 'Buy 1 kg Detergent + 200g Extra Free' exemplifies a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Sampling",
    [
        "Full Finance @ 0%",
        "Instant Draw",
        "Rebate"
    ],
    "D",
    "1. Sampling involves distributing free samples of a product to potential consumers, commonly used when launching new consumable FMCG products (e.g., detergent sachets, coffees).\nHence, Option {{CORR}} is correct.",
    "Defines Sampling."
)
add_q(make_question(CHAPTER, "Sales Promotion Techniques", "Distributing complimentary miniature sachets of a newly launched hair conditioner to prospective consumers is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Full Finance @ 0%",
    [
        "Rebate",
        "Sampling",
        "Quantity Gift"
    ],
    "A",
    "1. Allowing consumers to purchase expensive consumer durables (laptops, ACs, mobile phones) in easy interest-free monthly installments represents Full Finance @ 0%.\nHence, Option {{CORR}} is correct.",
    "Defines Full Finance @ 0%."
)
add_q(make_question(CHAPTER, "Sales Promotion Techniques", "Allowing customers to purchase expensive television sets by paying 24 equal monthly installments with zero interest is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Instant Draws and Assigned Gift",
    [
        "Sampling",
        "Quantity Gift",
        "Rebate"
    ],
    "B",
    "1. Scratching a card or opening a bottle cap to reveal an instant prize (e.g., 'Scratch and win an instant gold coin') represents Instant Draws and Assigned Gifts.\nHence, Option {{CORR}} is correct.",
    "Defines Instant Draws and Assigned Gift."
)
add_q(make_question(CHAPTER, "Sales Promotion Techniques", "Scratching a card enclosed within a biscuit wrapper to instantly win a silver coin or discount voucher exemplifies:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Public Relations (PR)",
    [
        "Direct Recruitment",
        "Underwriting",
        "Stock Arbitrage"
    ],
    "C",
    "1. Public Relations involves a variety of programmes designed to promote or protect a company's image and its individual products in the eyes of the general public.\nHence, Option {{CORR}} is correct.",
    "Defines Public Relations."
)
add_q(make_question(CHAPTER, "Public Relations", "Managing communications and relations with various stakeholders to build and maintain a positive corporate image is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Press releases, press conferences, public speeches, corporate sponsorships, and societal events",
    [
        "Issuing formal disciplinary termination notices to shop-floor workers",
        "Executing physical warehouse goods inspections during night shifts",
        "Conducting statutory balance sheet reconciliations with auditors"
    ],
    "D",
    "1. Core tools utilized by Public Relations departments include: News/Press releases, Speeches by corporate heads, Sponsoring cultural/sports events, and Public service activities.\nHence, Option {{CORR}} is correct.",
    "Lists primary tools of Public Relations."
)
add_q(make_question(CHAPTER, "Public Relations", "Which of the following serves as a primary operational tool used by Public Relations (PR) professionals?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Managing crises and handling negative publicity smoothly to protect corporate reputation",
    [
        "Abolishing all corporate income taxes payable to the government",
        "Eliminating product manufacturing and distribution costs",
        "Guaranteeing perpetual 100% price elasticity for luxury goods"
    ],
    "A",
    "1. An invaluable role of Public Relations is managing corporate crises and handling adverse publicity effectively to safeguard the company's public standing and brand trust.\nHence, Option {{CORR}} is correct.",
    "Highlights PR crisis management role."
)
add_q(make_question(CHAPTER, "Public Relations", "When a food brand faces media allegations regarding product contamination, which department manages crisis communication?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "PR builds overall corporate reputation; Advertising promotes specific products through paid media",
    [
        "PR is illegal; Advertising is legally mandated",
        "PR is done by clerks; Advertising is done by the President of India",
        "PR deals only with raw cotton; Advertising deals only with steel"
    ],
    "B",
    "1. Public relations focuses broadly on fostering goodwill and a positive image for the total enterprise, whereas advertising focuses specifically on promoting particular products via paid commercial messages.\nHence, Option {{CORR}} is correct.",
    "Contrasts Public Relations and Advertising."
)
add_q(make_question(CHAPTER, "Promotion Mix", "What is the primary difference in strategic focus between 'Public Relations' and 'Advertising'?", opts, corr, sol))

# =================================================================================================
# 5. Statement I & Statement II Questions (Q63 - Q71)
# =================================================================================================

add_q(make_statement_question(
    CHAPTER, "Marketing Philosophies",
    "The Selling Concept holds that consumer satisfaction is the key to achieving organizational profitability.",
    "The Marketing Concept focuses on understanding customer needs and delivering satisfaction more effectively than competitors.",
    "D",
    "1. Statement I is false: The Selling concept focuses on aggressive pushing of products, not customer satisfaction.\n2. Statement II is true: The Marketing concept anchors organizational success on customer need satisfaction.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Packaging Levels",
    "The Primary Package refers to the immediate container in which a product is directly enclosed.",
    "The Secondary Package refers to corrugated cartons used solely for long-distance transport and warehousing.",
    "C",
    "1. Statement I is true: Primary package is the immediate container (e.g., toothpaste tube).\n2. Statement II is false: Corrugated transport cartons represent Transportation packaging; Secondary packaging is the retail cardboard box.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Branding and Trademark",
    "A brand mark is that part of a brand that can be recognized visually but cannot be spoken in words.",
    "A trade mark is a brand that has been granted legal protection, giving the owner exclusive rights to its use.",
    "A",
    "1. Statement I is true: Brand marks are visual symbols (like logos).\n2. Statement II is true: Trademarks enjoy legal registration and protection.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Pricing Factors",
    "Product cost establishes the minimum floor price below which a product cannot be sold in the long run.",
    "Utility and consumer demand determine the upper ceiling price that buyers are willing to pay.",
    "A",
    "1. Statement I is true: Cost sets the floor price.\n2. Statement II is true: Utility and demand determine the ceiling price.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Channels of Distribution",
    "In a Zero Level distribution channel, goods move directly from manufacturer to consumer without intermediaries.",
    "A Two Level channel consists of Manufacturer -> Retailer -> Consumer without any wholesaler.",
    "C",
    "1. Statement I is true: Zero level has no intermediaries (direct sale).\n2. Statement II is false: A Two Level channel consists of Manufacturer -> Wholesaler -> Retailer -> Consumer (two intermediaries).\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Advertising and Personal Selling",
    "Advertising is an impersonal paid form of communication with an identified sponsor.",
    "Personal selling provides direct, immediate two-way feedback between salesperson and prospective buyer.",
    "A",
    "1. Statement I is true: Impersonality and paid sponsor are defining traits of advertising.\n2. Statement II is true: Personal selling allows direct, instant two-way dialogue.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Sales Promotion",
    "Rebate refers to offering special reduced prices to clear off excess inventory.",
    "Sampling involves offering extra quantity of the same product without extra charge, such as 'Buy 1 Get 1 Free'.",
    "C",
    "1. Statement I is true: Rebate offers price cuts to clear stock.\n2. Statement II is false: Distributing free miniature units to test is Sampling; 'Buy 1 Get 1 Free' is a Quantity Gift.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Public Relations",
    "Public Relations is concerned exclusively with advertising product discounts in morning newspapers.",
    "Public Relations manages relationships with various stakeholders to build and protect the organization's public image.",
    "D",
    "1. Statement I is false: Product discount advertisements represent sales promotion/advertising, not PR.\n2. Statement II is true: PR manages broader corporate reputation across stakeholders.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Marketing and Selling",
    "Selling begins before production starts and continues after the sale is concluded.",
    "Marketing begins with assessing consumer needs and continues with after-sales support.",
    "D",
    "1. Statement I is false: Selling begins after goods are manufactured and ends with the receipt of money.\n2. Statement II is true: Marketing begins before production and extends through post-sale services.\nHence, Option D is correct."
))

# =================================================================================================
# 6. Assertion & Reason Questions (Q72 - Q80)
# =================================================================================================

add_q(make_assertion_question(
    CHAPTER, "Marketing Concept",
    "Customer satisfaction is the central focal point of the Marketing Concept.",
    "An enterprise can achieve long-term sustainable profitability by identifying and satisfying the needs of target consumers better than rivals.",
    "A",
    "1. Assertion (A) is true: Customer satisfaction is the cornerstone of the Marketing Concept.\n2. Reason (R) is true and explains (A): Fulfilling consumer needs generates repeat purchases and brand loyalty, driving profitability.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Packaging",
    "Packaging plays the role of a 'silent salesman' in modern supermarkets.",
    "Attractive, innovative, and informative packaging catches the consumer's eye and stimulates impulse buying without a human salesperson.",
    "A",
    "1. Assertion (A) is true: Packaging acts as a silent salesman.\n2. Reason (R) is true and explains (A): In self-service retail, visual aesthetics and shelf appeal persuade shoppers directly.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Personal Selling",
    "Personal selling is indispensable for complex industrial machinery and enterprise software.",
    "Complex technical products require physical demonstration, customized explanation, and direct negotiation with institutional buyers.",
    "A",
    "1. Assertion (A) is true: Industrial goods rely heavily on personal selling.\n2. Reason (R) is true and provides the operational explanation for (A): High complexity and custom requirements cannot be addressed via mass advertising.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Sales Promotion",
    "Sales promotion tools are suitable for building long-term permanent brand loyalty.",
    "Sales promotion techniques are short-term non-recurring incentives designed to stimulate immediate sales.",
    "D",
    "1. Assertion (A) is false: Sales promotions provide temporary short-term boosts, not enduring long-term brand loyalty.\n2. Reason (R) is true: Sales promotion tools are designed specifically for short-term demand stimulation.\nHence, Option D is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Labelling",
    "Statutory warnings on tobacco packages are mandatory under the labelling function of marketing.",
    "The law requires manufacturers of hazardous products to disclose statutory health warnings conspicuously on packages.",
    "A",
    "1. Assertion (A) is true: Tobacco health warnings are legally required on labels.\n2. Reason (R) is true and explains (A): Fulfilling statutory legal requirements is an indispensable function of product labelling.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Public Relations",
    "Maintaining an active Public Relations department is essential for large business corporations.",
    "Public Relations helps the firm build corporate goodwill, handle negative crises, and maintain positive relations with all stakeholders.",
    "A",
    "1. Assertion (A) is true: PR is essential for large enterprises.\n2. Reason (R) is true and explains (A): Proactive reputation management and crisis response protect long-term business viability.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Advertising",
    "Advertising provides immediate, direct, and customized personal feedback from each individual viewer.",
    "Advertising is an impersonal, one-way mass communication medium with an identified commercial sponsor.",
    "D",
    "1. Assertion (A) is false: Advertising lacks direct individual feedback.\n2. Reason (R) is true: Advertising is an impersonal, one-way paid medium.\nHence, Option D is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Pricing Factors",
    "A company aiming for market share leadership generally sets lower prices for its products.",
    "Lower prices attract a large volume of consumers, driving sales volume and securing dominant market share.",
    "A",
    "1. Assertion (A) is true: Market share leadership relies on aggressive penetrative pricing.\n2. Reason (R) is true and explains (A): Affordable pricing attracts mass customers, building dominant volume.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Societal Marketing Concept",
    "The Societal Marketing Concept considers both customer satisfaction and broader environmental/societal well-being.",
    "Business enterprises operate in an interconnected society and their operations should not jeopardize long-term public welfare.",
    "A",
    "1. Assertion (A) is true: Societal marketing balances satisfaction with public welfare.\n2. Reason (R) is true and explains (A): Preserving societal and ecological health is vital for sustainable corporate co-existence.\nHence, Option A is correct."
))

# Verify length and output
print(f"Successfully generated {len(questions)} unique questions for Unit 11!")
assert len(questions) == 80, f"Expected 80 questions, got {len(questions)}"

os.makedirs("mock/bst_units", exist_ok=True)
out_path = "mock/bst_units/unit11.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
