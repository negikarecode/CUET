import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.bst_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text,
    get_pyq_normalized_set
)

CHAPTER = "Consumer Protection"
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

print("Generating 40 unique questions for Unit 12: Consumer Protection...")

# =================================================================================================
# 1. Concept & Importance of Consumer Protection (Q1 - Q8)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Protecting consumers from unfair trade practices, adulteration, misleading advertising, and unsafe goods",
    [
        "Granting legal monopolies to private manufacturing cartels",
        "Abolishing the requirement of cash memos on retail transactions",
        "Exempting multinational corporations from statutory liability"
    ],
    "A",
    "1. Consumer Protection refers to protecting consumers from unfair trade practices, defective goods, deficient services, adulteration, and misleading advertising.\nHence, Option {{CORR}} is correct.",
    "Defines Consumer Protection."
)
add_q(make_question(CHAPTER, "Concept of Consumer Protection", "What is the primary scope of 'Consumer Protection' in modern commerce?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Consumer ignorance, unorganized consumers, and widespread exploitation",
    [
        "Excessive consumer legal literacy and excessive court lawsuits",
        "Overabundance of government financial subsidies for buyers",
        "Abolition of all retail sales taxes across districts"
    ],
    "B",
    "1. From the consumer's point of view, protection is vital due to: (1) Consumer ignorance, (2) Unorganized consumers, and (3) Widespread exploitation by unscrupulous traders.\nHence, Option {{CORR}} is correct.",
    "Lists importance from consumer perspective."
)
add_q(make_question(CHAPTER, "Importance of Consumer Protection", "From the consumer's standpoint, why is consumer protection essential?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Long-term interest of business, utilizing society's resources, and social responsibility",
    [
        "Eliminating corporate accounting audits and tax filings",
        "Maximizing short-term deceptive sales before consumers notice",
        "Preventing the police from inspecting factory premises"
    ],
    "C",
    "1. From a business perspective, consumer protection is justified by: long-term business self-interest, using society's resources, moral justification, and avoiding government intervention.\nHence, Option {{CORR}} is correct.",
    "Lists importance from business perspective."
)
add_q(make_question(CHAPTER, "Importance of Consumer Protection", "Why is consumer protection crucial from the 'Business Point of View'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Satisfied consumers provide repeat business and positive word-of-mouth recommendations",
    [
        "Cheating consumers once yields permanent lifetime monopoly profits",
        "Customers have zero memory of product defectiveness",
        "Firms that exploit buyers are rewarded by government trade awards"
    ],
    "D",
    "1. Enlightened businesses realize that customer satisfaction is essential for long-term survival, as happy customers become loyal brand advocates and repeat buyers.\nHence, Option {{CORR}} is correct.",
    "Explains long-term business interest in consumer satisfaction."
)
add_q(make_question(CHAPTER, "Importance of Consumer Protection", "How does consumer satisfaction serve the 'Long-Term Interest of Business'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A business uses public and societal resources and therefore has a duty to provide safe products",
    [
        "A business operates completely isolated from public society",
        "A business owns all natural resources without societal obligation",
        "Societal resources are free gifts that businesses can exploit destructively"
    ],
    "A",
    "1. A business enterprise draws financial, human, and material resources from society; therefore, it owes a moral responsibility to supply safe, quality products in return.\nHence, Option {{CORR}} is correct.",
    "Highlights business using society's resources."
)
add_q(make_question(CHAPTER, "Importance of Consumer Protection", "The rationale that 'Business Uses Society's Resources' implies that:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Avoiding government intervention and statutory penal action",
    [
        "Increasing administrative legal litigation costs",
        "Abolishing the jurisdiction of the Supreme Court",
        "Encouraging trade unions to strike indefinitely"
    ],
    "B",
    "1. A business that indulges in unfair trade practices invites government intervention, statutory bans, and severe penalties, damaging corporate reputation.\nHence, Option {{CORR}} is correct.",
    "Highlights avoiding government intervention."
)
add_q(make_question(CHAPTER, "Importance of Consumer Protection", "Proactively practicing ethical trade practices helps businesses avoid:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Unorganized Consumers",
    [
        "Consumer Ignorance",
        "Product Standardization",
        "Legal Sovereignty"
    ],
    "C",
    "1. In India, consumers are largely unorganized and scattered, lacking powerful united consumer bodies, making consumer protection laws essential.\nHence, Option {{CORR}} is correct.",
    "Identifies unorganized consumers as a reason for protection."
)
add_q(make_question(CHAPTER, "Importance of Consumer Protection", "Consumers in developing economies are often scattered and lack strong collective associations. This highlights:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Consumer Ignorance",
    [
        "Unorganized Consumers",
        "Cash Memo Requirement",
        "Statutory Precaution"
    ],
    "D",
    "1. Due to widespread ignorance about statutory rights and available legal reliefs, consumers often tolerate exploitation without taking legal action.\nHence, Option {{CORR}} is correct.",
    "Defines Consumer Ignorance."
)
add_q(make_question(CHAPTER, "Importance of Consumer Protection", "The widespread lack of awareness among the general public regarding statutory consumer rights and remedies is termed:", opts, corr, sol))

# =================================================================================================
# 2. Consumer Protection Act 2019, Definition, Rights & Responsibilities (Q9 - Q20)
# =================================================================================================

opts, corr, sol = rotate_options(
    "A person who buys goods or avails services for consideration, excluding commercial or resale purposes",
    [
        "Any wholesaler who purchases 10,000 laptops to resell in local markets",
        "A person who receives goods free of charge as a charitable donation",
        "A contractor who purchases industrial excavators for commercial highway construction"
    ],
    "A",
    "1. Under the Consumer Protection Act 2019, a consumer is a person who buys goods or avails services for consideration, but explicitly excludes anyone obtaining goods for resale or commercial purposes.\nHence, Option {{CORR}} is correct.",
    "Defines Consumer under CPA 2019."
)
add_q(make_question(CHAPTER, "Consumer Protection Act 2019", "Who qualifies strictly as a 'Consumer' under the Consumer Protection Act, 2019?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A retailer who purchases 500 mobile phones for resale in his electronics shop",
    [
        "A student who purchases a laptop for personal online study courses",
        "A housewife who buys an induction stove for domestic cooking",
        "A patient who avails private hospital healthcare services for a fee"
    ],
    "B",
    "1. Goods purchased for resale or commercial purpose are excluded from the definition of a 'Consumer' under the Consumer Protection Act, 2019.\nHence, Option {{CORR}} is correct.",
    "Identifies exclusion of commercial resale from consumer definition."
)
add_q(make_question(CHAPTER, "Consumer Protection Act 2019", "Which of the following individuals does NOT qualify as a 'Consumer' under the Consumer Protection Act, 2019?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Right to Safety",
    [
        "Right to be Informed",
        "Right to Choose",
        "Right to Consumer Education"
    ],
    "C",
    "1. The Right to Safety guarantees protection against the marketing of goods and services that are hazardous to life, health, or property (e.g., defective pressure cookers, adulterated medicines).\nHence, Option {{CORR}} is correct.",
    "Defines Right to Safety."
)
add_q(make_question(CHAPTER, "Consumer Rights", "The statutory right protecting consumers against goods and services hazardous to life, health, and property is the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Right to be Informed",
    [
        "Right to Safety",
        "Right to Seek Redressal",
        "Right to be Heard"
    ],
    "D",
    "1. The Right to be Informed gives consumers the right to have complete information about the quality, quantity, potency, purity, standard, and price of goods to make informed choices.\nHence, Option {{CORR}} is correct.",
    "Defines Right to be Informed."
)
add_q(make_question(CHAPTER, "Consumer Rights", "The right of a buyer to know details regarding product ingredients, manufacturing date, expiry date, and retail price is the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Right to Choose / Assured",
    [
        "Right to Safety",
        "Right to Consumer Education",
        "Right to Redressal"
    ],
    "A",
    "1. The Right to Choose means the right to be assured, wherever possible, of access to a variety of goods and services at competitive and fair prices without coercion.\nHence, Option {{CORR}} is correct.",
    "Defines Right to Choose."
)
add_q(make_question(CHAPTER, "Consumer Rights", "When a retail vendor refuses to sell gas cylinder connections unless the consumer forcibly purchases an expensive gas stove, which right is violated?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Right to be Heard",
    [
        "Right to Safety",
        "Right to Choose",
        "Right to Profit"
    ],
    "B",
    "1. The Right to be Heard means that a consumer's interests will receive due consideration in appropriate forums and consumer redressal commissions.\nHence, Option {{CORR}} is correct.",
    "Defines Right to be Heard."
)
add_q(make_question(CHAPTER, "Consumer Rights", "The right ensuring that a consumer's grievances will receive due consideration and representation in dispute resolution bodies is the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Right to Seek Redressal",
    [
        "Right to Safety",
        "Right to be Informed",
        "Right to Advertising"
    ],
    "C",
    "1. The Right to Seek Redressal guarantees relief against unfair trade practices or exploitation, including replacement of defective goods, refund, or monetary compensation.\nHence, Option {{CORR}} is correct.",
    "Defines Right to Seek Redressal."
)
add_q(make_question(CHAPTER, "Consumer Rights", "The legal right providing fair settlement of genuine consumer claims, including repair, product replacement, or cash compensation is the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Right to Consumer Education",
    [
        "Right to Safety",
        "Right to Choose",
        "Right to be Heard"
    ],
    "D",
    "1. The Right to Consumer Education implies the right to acquire knowledge and skill to be an informed consumer throughout life (promoted via initiatives like 'Jago Grahak Jago').\nHence, Option {{CORR}} is correct.",
    "Defines Right to Consumer Education."
)
add_q(make_question(CHAPTER, "Consumer Rights", "Government public awareness media campaigns like 'Jago Grahak Jago' directly empower which statutory consumer right?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Asking for and preserving a Cash Memo as legal proof of purchase",
    [
        "Refusing to inspect product expiry dates in stores",
        "Accepting unbranded loose groceries without quality certification",
        "Purchasing goods on black-market cash discounts without invoices"
    ],
    "A",
    "1. Asking for a Cash Memo is a vital consumer responsibility because a cash memo serves as conclusive legal proof of purchase when filing complaints in consumer commissions.\nHence, Option {{CORR}} is correct.",
    "Highlights Cash Memo as a key consumer responsibility."
)
add_q(make_question(CHAPTER, "Consumer Responsibilities", "Which of the following is an indispensable statutory responsibility of a prudent consumer?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "ISI Mark on electrical/industrial goods, AGMARK on agricultural products, and Hallmark on gold jewelry",
    [
        "ISI on fresh apples, AGMARK on laptop microchips, Hallmark on diesel fuel",
        "Hallmark on ceiling fans, ISI on wheat bags, AGMARK on gold necklaces",
        "FSSAI on gold coins, Hallmark on cement bags, ISI on fresh milk"
    ],
    "B",
    "1. The standard quality certification marks in India are: ISI Mark for industrial/electrical products, AGMARK for agricultural products, and Hallmark for gold jewelry.\nHence, Option {{CORR}} is correct.",
    "Pairs quality certification marks with respective goods."
)
add_q(make_question(CHAPTER, "Quality Certification Marks", "Which set accurately pairs quality certification marks with their respective product categories in India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "AGMARK",
    [
        "ISI Mark",
        "Hallmark",
        "FPO Mark"
    ],
    "C",
    "1. AGMARK is the statutory quality certification mark issued by the Directorate of Marketing and Inspection for agricultural commodities (pulses, spices, honey, ghee).\nHence, Option {{CORR}} is correct.",
    "Identifies AGMARK for agricultural products."
)
add_q(make_question(CHAPTER, "Quality Certification Marks", "Which quality certification mark must a vigilant consumer verify when purchasing agricultural goods such as honey, spices, or edible ghee?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Hallmark",
    [
        "AGMARK",
        "ISI Mark",
        "Ecomark"
    ],
    "D",
    "1. BIS Hallmarking certifies the purity and fineness of precious metal gold and silver jewelry in India.\nHence, Option {{CORR}} is correct.",
    "Identifies Hallmark for gold jewelry."
)
add_q(make_question(CHAPTER, "Quality Certification Marks", "The mandatory purity certification mark verified when purchasing authentic gold jewelry is:", opts, corr, sol))

# =================================================================================================
# 3. Three-tier Redressal Machinery & Reliefs Available (Q21 - Q28)
# =================================================================================================

opts, corr, sol = rotate_options(
    "District Commission, State Commission, and National Commission",
    [
        "Gram Panchayat, High Court, and International Court of Justice",
        "SEBI Tribunal, Reserve Bank Ombudsman, and Ministry of Finance",
        "Police Station, Sessions Court, and Parliamentary Standing Committee"
    ],
    "A",
    "1. The Consumer Protection Act 2019 establishes a three-tier quasi-judicial machinery: (1) District Consumer Disputes Redressal Commission, (2) State Commission, and (3) National Commission.\nHence, Option {{CORR}} is correct.",
    "Lists three-tier consumer commissions."
)
add_q(make_question(CHAPTER, "Redressal Agencies", "What are the three tiers of the quasi-judicial redressal machinery established under CPA 2019?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Where the value of goods or services paid as consideration does NOT exceed ₹1 Crore",
    [
        "Exceeding ₹1 Crore but not exceeding ₹10 Crores",
        "Exceeding ₹10 Crores without any upper limit",
        "Strictly capped at ₹20 Lakhs only"
    ],
    "B",
    "1. Under the Consumer Protection Act 2019, the District Commission entertains complaints where the value of goods or services paid does not exceed ₹1 Crore.\nHence, Option {{CORR}} is correct.",
    "States District Commission pecuniary jurisdiction under CPA 2019."
)
add_q(make_question(CHAPTER, "Redressal Agencies", "What is the pecuniary jurisdiction of the 'District Commission' under the Consumer Protection Act, 2019?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Where the value of goods or services paid exceeds ₹1 Crore but does not exceed ₹10 Crores",
    [
        "Up to ₹1 Crore only",
        "Exceeding ₹10 Crores",
        "Between ₹50 Lakhs and ₹1 Crore"
    ],
    "C",
    "1. Under CPA 2019, the State Commission possesses pecuniary jurisdiction to entertain claims where the consideration paid exceeds ₹1 Crore but does not exceed ₹10 Crores.\nHence, Option {{CORR}} is correct.",
    "States State Commission pecuniary jurisdiction."
)
add_q(make_question(CHAPTER, "Redressal Agencies", "What is the pecuniary limit for filing a consumer dispute directly before the 'State Commission' under CPA 2019?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Where the value of goods or services paid as consideration exceeds ₹10 Crores",
    [
        "Up to ₹1 Crore only",
        "Between ₹1 Crore and ₹5 Crores",
        "Strictly between ₹5 Crores and ₹10 Crores"
    ],
    "D",
    "1. Under CPA 2019, the National Commission (located in New Delhi) entertains original consumer complaints where the consideration paid exceeds ₹10 Crores.\nHence, Option {{CORR}} is correct.",
    "States National Commission pecuniary jurisdiction."
)
add_q(make_question(CHAPTER, "Redressal Agencies", "What is the pecuniary jurisdiction of the 'National Consumer Disputes Redressal Commission' under CPA 2019?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "To the State Commission within 45 days from the date of the order",
    [
        "To the Supreme Court of India within 10 days",
        "To the local municipal corporation within 24 hours",
        "No appeal is legally permitted against a District Commission order"
    ],
    "A",
    "1. Any person aggrieved by an order of the District Commission may prefer an appeal to the State Commission within a period of 45 days from the date of the order.\nHence, Option {{CORR}} is correct.",
    "States appeal period from District to State Commission."
)
add_q(make_question(CHAPTER, "Redressal Agencies", "Where and within what timeframe can an aggrieved party appeal against an order of the District Commission?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "To the National Commission within 30 days from the date of the order",
    [
        "To the District Commission within 60 days",
        "To the Reserve Bank Governor within 15 days",
        "Directly to the International Trade Tribunal within 5 days"
    ],
    "B",
    "1. An appeal against the order of the State Commission can be filed before the National Commission within 30 days from the date of the order.\nHence, Option {{CORR}} is correct.",
    "States appeal period from State to National Commission."
)
add_q(make_question(CHAPTER, "Redressal Agencies", "An appeal against an order passed by the State Commission must be preferred before which body and within what duration?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Supreme Court of India within 30 days of the order",
    [
        "High Court of the respective State within 90 days",
        "Central Vigilance Commission within 15 days",
        "Ministry of Consumer Affairs within 45 days"
    ],
    "C",
    "1. An appeal against an order passed by the National Commission in exercise of its original jurisdiction lies before the Supreme Court of India within 30 days.\nHence, Option {{CORR}} is correct.",
    "States appeal from National Commission to Supreme Court."
)
add_q(make_question(CHAPTER, "Redressal Agencies", "An appeal against an original order of the National Commission can be filed before the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Removal of defects, replacement with new goods, refund of price, and payment of compensation",
    [
        "Imposing personal life imprisonment on all company shareholders",
        "Dissolving the registered commercial banking system",
        "Granting free ownership of corporate factory land to the complainant"
    ],
    "D",
    "1. Statutory reliefs include: removing defects, replacing goods, refunding price paid, awarding compensation for injury/loss, discontinuing unfair trade practices, and punitive damages.\nHence, Option {{CORR}} is correct.",
    "Lists reliefs available to consumers."
)
add_q(make_question(CHAPTER, "Reliefs Available", "Which group of remedies represents statutory reliefs that Consumer Commissions can award to an aggrieved consumer?", opts, corr, sol))

# =================================================================================================
# 4. Statement I & Statement II Questions (Q29 - Q34)
# =================================================================================================

add_q(make_statement_question(
    CHAPTER, "Definition of Consumer",
    "Under CPA 2019, a person who purchases goods for resale in the open market is classified as a consumer.",
    "Under CPA 2019, a person who buys goods or avails services for personal consumption is classified as a consumer.",
    "D",
    "1. Statement I is false: Persons purchasing goods for commercial resale are explicitly excluded from the definition of consumer.\n2. Statement II is true: Individuals buying for personal use qualify as consumers.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Consumer Rights",
    "The Right to Safety protects consumers against the marketing of goods hazardous to life and property.",
    "The Right to be Informed gives consumers the right to complete information regarding ingredients, price, and expiry.",
    "A",
    "1. Statement I is true: Right to safety shields buyers from hazardous items.\n2. Statement II is true: Right to information mandates complete product disclosure.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Pecuniary Jurisdiction under CPA 2019",
    "The District Commission entertains consumer complaints where consideration paid does not exceed ₹1 Crore.",
    "The State Commission entertains complaints where consideration paid exceeds ₹10 Crores.",
    "C",
    "1. Statement I is true: District Commission limit is up to ₹1 Crore under CPA 2019.\n2. Statement II is false: State Commission limit is ₹1 Crore to ₹10 Crores; above ₹10 Crores falls under the National Commission.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Quality Certification Marks",
    "The ISI mark is the mandatory certification mark verified on pure gold jewelry in India.",
    "AGMARK is the quality certification mark verified on agricultural commodities like spices, ghee, and honey.",
    "D",
    "1. Statement I is false: Gold jewelry is verified with Hallmarking, not the ISI mark.\n2. Statement II is true: AGMARK certifies agricultural commodities.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Consumer Responsibilities",
    "A prudent consumer should always insist on receiving a cash memo on purchase of goods or services.",
    "A cash memo serves as conclusive legal evidence of purchase when filing a dispute before consumer commissions.",
    "A",
    "1. Statement I is true: Asking for a cash memo is an essential consumer responsibility.\n2. Statement II is true: Cash memo provides indispensable legal proof of purchase in consumer court.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Appeals under CPA 2019",
    "An appeal against an order of the District Commission lies before the State Commission within 45 days.",
    "An appeal against an original order of the National Commission lies directly before the Supreme Court within 30 days.",
    "A",
    "1. Statement I is true: Appeals from District Commission go to State Commission within 45 days.\n2. Statement II is true: Appeals against original National Commission orders go to Supreme Court within 30 days.\nHence, Option A is correct."
))

# =================================================================================================
# 5. Assertion & Reason Questions (Q35 - Q40)
# =================================================================================================

add_q(make_assertion_question(
    CHAPTER, "Consumer Responsibilities",
    "A consumer must always obtain a cash memo when purchasing goods.",
    "A cash memo acts as conclusive legal proof of purchase when instituting a claim before consumer commissions.",
    "A",
    "1. Assertion (A) is true: Consumers must secure a cash memo.\n2. Reason (R) is true and explains (A): Without a cash memo or invoice, proving purchase in consumer commissions is virtually impossible.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Consumer Protection Importance",
    "Consumer protection is in the long-term enlightened self-interest of business enterprises.",
    "Satisfied customers provide repeat business, brand loyalty, and positive word-of-mouth reputation.",
    "A",
    "1. Assertion (A) is true: Consumer protection benefits business long-term.\n2. Reason (R) is true and directly explains (A): Retaining satisfied buyers builds enduring commercial profitability.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Definition of Consumer",
    "A wholesale trader who purchases 1,000 ceiling fans for resale in his shop cannot file a complaint under CPA 2019.",
    "The Consumer Protection Act 2019 explicitly excludes persons who obtain goods for resale or commercial purposes from the definition of a consumer.",
    "A",
    "1. Assertion (A) is true: Commercial resellers cannot sue under CPA 2019.\n2. Reason (R) is true and provides the legal explanation for (A): Commercial buyers are statutorily excluded.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Quality Marks",
    "A consumer purchasing electrical appliances should look for the Hallmark logo.",
    "The Hallmark logo certifies the purity of precious gold and silver jewelry.",
    "D",
    "1. Assertion (A) is false: Electrical appliances require the ISI mark, not Hallmark.\n2. Reason (R) is true: Hallmark certifies gold and silver jewelry purity.\nHence, Option D is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Consumer Rights",
    "Under the Right to be Informed, manufacturers must disclose ingredients, net weight, MRP, and expiry dates.",
    "Full disclosure enables consumers to make rational, informed choices and protects them against deceptive practices.",
    "A",
    "1. Assertion (A) is true: Right to information mandates detailed label disclosures.\n2. Reason (R) is true and explains (A): Transparent knowledge empowers rational buyer decisions.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Redressal Machinery",
    "Under CPA 2019, a claim for ₹5 Crores must be instituted directly before the National Commission.",
    "The National Commission entertains original complaints only where the value of consideration paid exceeds ₹10 Crores.",
    "D",
    "1. Assertion (A) is false: A claim for ₹5 Crores falls under the State Commission (₹1 Cr to ₹10 Cr), not the National Commission.\n2. Reason (R) is true: National Commission hears original disputes exceeding ₹10 Crores.\nHence, Option D is correct."
))

# Verify length and output
print(f"Successfully generated {len(questions)} unique questions for Unit 12!")
assert len(questions) == 40, f"Expected 40 questions, got {len(questions)}"

os.makedirs("mock/bst_units", exist_ok=True)
out_path = "mock/bst_units/unit12.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
