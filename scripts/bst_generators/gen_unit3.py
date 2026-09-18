import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.bst_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text,
    get_pyq_normalized_set
)

CHAPTER = "Business Environment"
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

print("Generating 60 unique questions for Unit 3: Business Environment...")

# =================================================================================================
# 1. Meaning & Features of Business Environment (Q1 - Q10)
# =================================================================================================

opts, corr, sol = rotate_options(
    "The sum total of all individuals, institutions, and other forces that are outside the control of a business enterprise but affect its performance",
    [
        "Only the internal machinery and manufacturing tools operated by assembly workers",
        "The personal diary records maintained by top executive directors",
        "The static furniture and architectural floor plan of the corporate headquarters"
    ],
    "A",
    "1. Business environment is defined as the totality of all external individuals, institutions, and forces outside the direct control of an enterprise that influence its operational performance.\nHence, Option {{CORR}} is correct.",
    "Accurately defines Business Environment."
)
add_q(make_question(CHAPTER, "Concept of Business Environment", "Which statement accurately defines the term 'Business Environment' in management studies?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Totality of external forces",
    [
        "Isolated internal control",
        "Deterministic mathematical certainty",
        "Exclusive domestic permanence"
    ],
    "B",
    "1. Business environment is aggregative in nature as it encompasses the sum total of all forces external to business firms.\nHence, Option {{CORR}} is correct.",
    "Identifies totality of external forces as a key feature."
)
add_q(make_question(CHAPTER, "Features of Business Environment", "The aggregative nature of business environment, representing the overall sum of external factors, reflects which feature?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Specific forces affect individual firms directly, whereas general forces affect all business enterprises",
    [
        "Specific forces apply to all industries globally, whereas general forces affect only one supplier",
        "Specific forces are legal rules, whereas general forces are factory shop-floor guidelines",
        "Specific forces are completely static, whereas general forces change every minute"
    ],
    "C",
    "1. Specific forces (investors, customers, competitors, suppliers) affect an individual firm directly, while general forces (economic, social, political, legal, technological) affect all firms in an industry.\nHence, Option {{CORR}} is correct.",
    "Distinguishes specific forces from general forces."
)
add_q(make_question(CHAPTER, "Features of Business Environment", "What is the primary difference between 'Specific Forces' and 'General Forces' in the business environment?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Investors, customers, competitors, and suppliers",
    [
        "Inflation rates, GDP growth, interest rates, and currency valuation",
        "Parliamentary statutes, judicial verdicts, and government gazettes",
        "Cultural traditions, literacy rates, and family demographic structures"
    ],
    "D",
    "1. Specific forces directly influence an individual business on a day-to-day basis and include investors, customers, competitors, and suppliers.\nHence, Option {{CORR}} is correct.",
    "Identifies specific environmental forces."
)
add_q(make_question(CHAPTER, "Features of Business Environment", "Which of the following groups consists exclusively of 'Specific Forces' of the business environment?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Inter-relatedness",
    [
        "Complexity",
        "Relativity",
        "Static isolation"
    ],
    "A",
    "1. Different elements or parts of the business environment are closely interrelated (e.g., increased life expectancy and health awareness has created high demand for organic foods and gym memberships).\nHence, Option {{CORR}} is correct.",
    "Identifies inter-relatedness of environmental factors."
)
add_q(make_question(CHAPTER, "Features of Business Environment", "Increased health consciousness leading to surging demand for organic food and wellness tracking devices demonstrates which environmental feature?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Dynamic nature",
    [
        "Static permanence",
        "Invariable rigidity",
        "Linear predictability"
    ],
    "B",
    "1. Business environment is dynamic because it keeps on changing continuously in terms of technological improvements, consumer preferences, or entry of new competitors.\nHence, Option {{CORR}} is correct.",
    "Identifies the dynamic nature of business environment."
)
add_q(make_question(CHAPTER, "Features of Business Environment", "Rapid technological obsolescence and shifting consumer brand preferences indicate that the business environment possesses a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Uncertainty",
    [
        "Absolute predictability",
        "Controlled certainty",
        "Homogeneity"
    ],
    "C",
    "1. Business environment is largely uncertain because it is very difficult to predict future happenings, especially in volatile sectors like fashion, IT, and consumer electronics.\nHence, Option {{CORR}} is correct.",
    "Highlights uncertainty due to unpredictable market changes."
)
add_q(make_question(CHAPTER, "Features of Business Environment", "The extreme difficulty in forecasting future environmental changes and technological breakthroughs highlights which feature?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Complexity",
    [
        "Simplicity",
        "Singular clarity",
        "Triviality"
    ],
    "D",
    "1. Business environment is complex because it is easy to grasp in parts but very difficult to comprehend in its totality due to numerous interacting forces.\nHence, Option {{CORR}} is correct.",
    "Defines complexity as being easy to grasp in parts but hard in totality."
)
add_q(make_question(CHAPTER, "Features of Business Environment", "A phenomenon that is relatively easy to understand in isolated segments but challenging to comprehend in its aggregate totality exhibits:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Relativity",
    [
        "Universality",
        "Uniformity",
        "Absoluteness"
    ],
    "A",
    "1. Business environment is a relative concept since it differs from country to country and even region to region (e.g., demand for sarees is high in India but negligible in France).\nHence, Option {{CORR}} is correct.",
    "Identifies Relativity as differences across countries and cultures."
)
add_q(make_question(CHAPTER, "Features of Business Environment", "Demand for traditional sarees is substantially high in India but virtually non-existent in the United Kingdom. This demonstrates the concept of:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Competitors",
    [
        "Technological environment",
        "Legal environment",
        "Political environment"
    ],
    "B",
    "1. Competitors are a specific force that directly impact day-to-day operations of an individual company, whereas technological, legal, and political environments are general forces.\nHence, Option {{CORR}} is correct.",
    "Identifies competitors as a specific force."
)
add_q(make_question(CHAPTER, "Features of Business Environment", "Which of the following is classified as a 'Specific Force' affecting a business enterprise directly?", opts, corr, sol))

# =================================================================================================
# 2. Importance of Business Environment (Q11 - Q20)
# =================================================================================================

opts, corr, sol = rotate_options(
    "First mover advantage",
    [
        "Early warning signal",
        "Tapping useful resources",
        "Coping with rapid changes"
    ],
    "C",
    "1. Early identification of positive opportunities helps an enterprise to exploit them before competitors, providing a 'first mover advantage' (e.g., Maruti Udyog launching small cars first in India).\nHence, Option {{CORR}} is correct.",
    "Defines first mover advantage through early opportunity scanning."
)
add_q(make_question(CHAPTER, "Importance of Business Environment", "Enabling an enterprise to identify positive business opportunities early and capture market share ahead of rivals is known as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Early warning signal",
    [
        "First mover advantage",
        "Capital expenditure trap",
        "Administrative bottleneck"
    ],
    "D",
    "1. Environmental scanning helps identify external threats and obstacles in advance, serving as an 'early warning signal' to take preventive defensive measures.\nHence, Option {{CORR}} is correct.",
    "Defines early warning signal in threat identification."
)
add_q(make_question(CHAPTER, "Importance of Business Environment", "When an Indian automobile manufacturer studies foreign competitors' planned market entry and upgrades its models proactively, the environment serves as an:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Tapping useful resources",
    [
        "Unilateral price setting",
        "Abolition of regulatory taxes",
        "Eliminating labor wages"
    ],
    "A",
    "1. A business draws various inputs (finance, raw materials, labor, power) from its external environment and supplies goods/services back to it, known as tapping useful resources.\nHence, Option {{CORR}} is correct.",
    "Defines tapping useful resources from the external environment."
)
add_q(make_question(CHAPTER, "Importance of Business Environment", "A business firm assembles inputs such as raw materials, machinery, capital, and skilled manpower from society to produce outputs. This highlights:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Coping with rapid changes",
    [
        "Maintaining administrative inertia",
        "Enforcing permanent monopoly pricing",
        "Insulating factory operations from global trade"
    ],
    "B",
    "1. Continuous monitoring of environmental changes enables managers to develop suitable courses of action to cope effectively with turbulence and fast-paced market shifts.\nHence, Option {{CORR}} is correct.",
    "Highlights coping with rapid market and technological changes."
)
add_q(make_question(CHAPTER, "Importance of Business Environment", "Developing agile business strategies to survive against turbulent market conditions, brand fragmentation, and fierce global rivalry reflects:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Assisting in planning and policy formulation",
    [
        "Discontinuing all accounting records",
        "Overriding judicial company law",
        "Exempting management from corporate audits"
    ],
    "C",
    "1. Insights derived from environmental scanning provide the factual foundation and understanding for formulating future business plans and long-term organizational policies.\nHence, Option {{CORR}} is correct.",
    "Shows role in planning and policy formulation."
)
add_q(make_question(CHAPTER, "Importance of Business Environment", "Environmental analysis provides the core intelligence and baseline data on which future strategic plans and corporate guidelines are designed. This illustrates:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Improving performance",
    [
        "Decreasing product reliability",
        "Eradicating competitive market forces",
        "Promoting executive stagnation"
    ],
    "D",
    "1. Enterprises that continuously monitor their environment and adopt suitable managerial practices succeed in improving their qualitative performance and sustaining market leadership.\nHence, Option {{CORR}} is correct.",
    "Highlights continuous performance improvement."
)
add_q(make_question(CHAPTER, "Importance of Business Environment", "Enterprises that continuously monitor external shifts and proactively adapt internal structures experience qualitative growth and long-term profitability. This shows:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Maruti Udyog becoming the pioneer in small cars in the Indian automotive market",
    [
        "A legacy textile mill shutting down operations due to obsolete machinery",
        "A firm paying statutory corporate advance tax on time",
        "A manufacturing plant facing a workers' wildcat strike"
    ],
    "A",
    "1. Maruti Udyog became the leader in the small car segment by recognizing the emerging need for affordable personal transportation in India, gaining the first mover advantage.\nHence, Option {{CORR}} is correct.",
    "Uses Maruti Udyog as classic first mover advantage example."
)
add_q(make_question(CHAPTER, "Importance of Business Environment", "Which classic corporate case exemplifies gaining the 'first mover advantage' through proactive environmental scanning in India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Environmental scanning",
    [
        "Budgetary variance audit",
        "Financial ratio reconciliation",
        "Inventory stocktaking"
    ],
    "B",
    "1. Environmental scanning refers to complete awareness and understanding of the external forces, constraints, and opportunities surrounding a business enterprise.\nHence, Option {{CORR}} is correct.",
    "Defines environmental scanning."
)
add_q(make_question(CHAPTER, "Importance of Business Environment", "The ongoing managerial process of closely monitoring, analyzing, and interpreting factors in the external arena to detect threats and opportunities is called:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Threats",
    [
        "Strengths",
        "Weaknesses",
        "Opportunities"
    ],
    "C",
    "1. External environmental trends and changes that hinder or negatively affect an enterprise's operational performance are categorized as 'Threats'.\nHence, Option {{CORR}} is correct.",
    "Defines Threats in environmental scanning."
)
add_q(make_question(CHAPTER, "Importance of Business Environment", "External trends or changes in government trade policy that may hamper a firm's operational stability and market standing are termed as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Opportunities",
    [
        "Threats",
        "Internal liabilities",
        "Administrative constraints"
    ],
    "D",
    "1. Positive external environmental trends or changes that help a firm improve its operational performance and market presence are categorized as 'Opportunities'.\nHence, Option {{CORR}} is correct.",
    "Defines Opportunities in environmental scanning."
)
add_q(make_question(CHAPTER, "Importance of Business Environment", "Favorable external developments that allow an enterprise to expand production and capture new customer segments are termed as:", opts, corr, sol))

# =================================================================================================
# 3. Dimensions of Business Environment (Q21 - Q35)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Economic Environment",
    [
        "Social Environment",
        "Political Environment",
        "Legal Environment"
    ],
    "A",
    "1. Economic Environment consists of interest rates, inflation rates, changes in disposable income of people, GDP growth rates, and the value of the rupee.\nHence, Option {{CORR}} is correct.",
    "Identifies Economic Environment from macroeconomic variables."
)
add_q(make_question(CHAPTER, "Dimensions of Business Environment", "A drop in bank home loan interest rates leading to a nationwide surge in consumer demand for residential apartments represents which dimension?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Social Environment",
    [
        "Technological Environment",
        "Legal Environment",
        "Political Environment"
    ],
    "B",
    "1. Social Environment includes customs, traditions, societal values, lifestyle trends, literacy rates, and educational levels prevailing in a society.\nHence, Option {{CORR}} is correct.",
    "Identifies Social Environment from cultural festivals and values."
)
add_q(make_question(CHAPTER, "Dimensions of Business Environment", "An increase in consumer expenditure on sweets, apparel, and electronics during festive seasons like Diwali and Eid reflects the influence of the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Technological Environment",
    [
        "Legal Environment",
        "Political Environment",
        "Economic Environment"
    ],
    "C",
    "1. Technological Environment includes scientific innovations and breakthroughs that provide new ways of producing goods, rendering services, and operating machines.\nHence, Option {{CORR}} is correct.",
    "Identifies Technological Environment from digital innovations."
)
add_q(make_question(CHAPTER, "Dimensions of Business Environment", "The widespread adoption of contactless QR-code digital payments and AI-driven automated checkouts in retail outlets reflects which environmental dimension?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Political Environment",
    [
        "Technological Environment",
        "Social Environment",
        "Economic Environment"
    ],
    "D",
    "1. Political Environment includes political conditions such as general stability and peace in the country and specific attitudes that elected government representatives hold toward business.\nHence, Option {{CORR}} is correct.",
    "Identifies Political Environment from ruling government ideology and stability."
)
add_q(make_question(CHAPTER, "Dimensions of Business Environment", "The change of the elected central government resulting in new official policy stances toward foreign direct investment in retail reflects which dimension?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Legal Environment",
    [
        "Political Environment",
        "Social Environment",
        "Economic Environment"
    ],
    "A",
    "1. Legal Environment includes various legislations passed by Parliament, administrative orders issued by government authorities, court judgments, and statutory mandates (e.g., warning on cigarette packets).\nHence, Option {{CORR}} is correct.",
    "Identifies Legal Environment from statutory warnings."
)
add_q(make_question(CHAPTER, "Dimensions of Business Environment", "The statutory requirement mandating a prominent pictorial health warning on all tobacco packaging is an element of which environment?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Economic Environment",
    [
        "Social Environment",
        "Political Environment",
        "Legal Environment"
    ],
    "B",
    "1. Rates of inflation directly determine the purchasing power of consumers and manufacturing input costs, making it a vital economic environmental component.\nHence, Option {{CORR}} is correct.",
    "Classifies inflation rate as Economic Environment."
)
add_q(make_question(CHAPTER, "Dimensions of Business Environment", "A sharp rise in the rate of inflation resulting in eroded consumer purchasing power and escalating industrial input costs is part of:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Social Environment",
    [
        "Legal Environment",
        "Economic Environment",
        "Political Environment"
    ],
    "C",
    "1. The shift toward female empowerment, equal workplace rights, and increasing participation of women in corporate professions is a core facet of the Social Environment.\nHence, Option {{CORR}} is correct.",
    "Classifies rising female workforce participation as Social Environment."
)
add_q(make_question(CHAPTER, "Dimensions of Business Environment", "Growing female literacy and the rising proportion of working women entering professional careers is an attribute of the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Technological Environment",
    [
        "Political Environment",
        "Social Environment",
        "Legal Environment"
    ],
    "D",
    "1. The shift from physical film photography to digital imaging and online streaming platforms replacing video rental shops stems from technological developments.\nHence, Option {{CORR}} is correct.",
    "Identifies Technological Environment as the driver of digital disruption."
)
add_q(make_question(CHAPTER, "Dimensions of Business Environment", "The replacement of traditional analog film cameras by high-resolution digital smartphone camera sensors exemplifies:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Political stability and peace in the country",
    [
        "Prevailing banking deposit rates",
        "The Consumer Protection Act enacted by Parliament",
        "Technological advancements in biometric scanning"
    ],
    "A",
    "1. Political stability, maintenance of domestic peace, and the rule of law foster confidence among business investors and are primary elements of the Political Environment.\nHence, Option {{CORR}} is correct.",
    "Identifies political peace and stability as Political Environment."
)
add_q(make_question(CHAPTER, "Dimensions of Business Environment", "Which of the following is an integral component of the 'Political Environment' of business?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Decisions rendered by various commissions and courts at central, state, or local levels",
    [
        "The prevailing cultural celebrations during harvest seasons",
        "Technological innovation in semiconductor microprocessor design",
        "Monetary policy announcements regarding Repo and Reverse Repo rates"
    ],
    "B",
    "1. Judicial rulings, tribunal decisions, and regulatory decrees enforced by law courts constitute the core of the Legal Environment.\nHence, Option {{CORR}} is correct.",
    "Identifies court judgments as Legal Environment."
)
add_q(make_question(CHAPTER, "Dimensions of Business Environment", "Which of the following components directly represents an element of the 'Legal Environment' of business?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Economic Environment",
    [
        "Social Environment",
        "Political Environment",
        "Legal Environment"
    ],
    "C",
    "1. The foreign exchange rate and depreciation/appreciation of the Indian Rupee against the US Dollar represent macroeconomic financial indicators.\nHence, Option {{CORR}} is correct.",
    "Classifies currency exchange rate fluctuation under Economic Environment."
)
add_q(make_question(CHAPTER, "Dimensions of Business Environment", "The depreciation of the Indian Rupee against the US Dollar making imported crude oil more expensive is an example of:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Legal Environment",
    [
        "Technological Environment",
        "Social Environment",
        "Political Environment"
    ],
    "D",
    "1. Passing of statutory legislation like the Food Safety and Standards Act (FSSAI) regulating product ingredients is a direct expression of the Legal Environment.\nHence, Option {{CORR}} is correct.",
    "Classifies Food Safety Act compliance under Legal Environment."
)
add_q(make_question(CHAPTER, "Dimensions of Business Environment", "Compliance with the Food Safety and Standards Act (FSSAI) governing nutritional disclosures on packaged food falls under:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Social Environment",
    [
        "Political Environment",
        "Legal Environment",
        "Technological Environment"
    ],
    "A",
    "1. Surging public interest in physical fitness, yoga, organic nutrition, and dietary supplements stems from evolving health attitudes in the Social Environment.\nHence, Option {{CORR}} is correct.",
    "Classifies health and wellness awareness as Social Environment."
)
add_q(make_question(CHAPTER, "Dimensions of Business Environment", "The surge in consumer demand for zero-sugar beverages and plant-based protein diets reflects changes in the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Technological Environment",
    [
        "Social Environment",
        "Political Environment",
        "Legal Environment"
    ],
    "B",
    "1. Online flight ticket booking and automated dynamic seat allocation on mobile apps are technological environment innovations.\nHence, Option {{CORR}} is correct.",
    "Identifies internet web booking systems under Technological Environment."
)
add_q(make_question(CHAPTER, "Dimensions of Business Environment", "Airlines introducing automated web check-in and digital boarding passes via smartphones relates to which environment?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Political Environment",
    [
        "Legal Environment",
        "Economic Environment",
        "Technological Environment"
    ],
    "C",
    "1. The ruling party's ideology, administrative commitment to business facilitation, and global diplomacy belong to the Political Environment.\nHence, Option {{CORR}} is correct.",
    "Identifies ruling party philosophy as Political Environment."
)
add_q(make_question(CHAPTER, "Dimensions of Business Environment", "The ideological stance of the elected governing coalition toward industrial deregulation and international trade partnerships reflects the:", opts, corr, sol))

# =================================================================================================
# 4. LPG Reforms & Demonetization (Q36 - Q44)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Liberalization, Privatization, Globalization",
    [
        "Legalization, Protectionism, Governance",
        "Localization, Pricing, Growth",
        "Liquidation, Partnership, Gearing"
    ],
    "D",
    "1. The New Economic Policy announced in July 1991 had three broad pillars: Liberalization (L), Privatization (P), and Globalization (G).\nHence, Option {{CORR}} is correct.",
    "Identifies LPG as Liberalization, Privatization, Globalization."
)
add_q(make_question(CHAPTER, "Economic Environment in India", "What are the three core pillars of the New Economic Policy initiated by the Government of India in July 1991?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Abolition of industrial licensing for most industries and removing restrictions on business expansion",
    [
        "Nationalization of all private commercial banks",
        "Banning the import of all capital machinery from abroad",
        "Imposing mandatory 100% price controls on manufactured goods"
    ],
    "A",
    "1. Liberalization involved liberating Indian business and industry from unnecessary administrative controls, abolition of industrial licensing, and free movement of goods.\nHence, Option {{CORR}} is correct.",
    "Defines Liberalization under NEP 1991."
)
add_q(make_question(CHAPTER, "Economic Environment in India", "Which of the following was a key measure introduced under 'Liberalization' in the 1991 Economic Reforms?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Disinvestment of government equity in public sector enterprises to the private sector",
    [
        "Restricting private entrepreneurship exclusively to handicraft manufacture",
        "Mandatory government acquisition of all multinational retail chains",
        "Establishing permanent state monopolies over telecommunications"
    ],
    "B",
    "1. Privatization aimed at reducing the role of the public sector by selling government shareholding (disinvestment) to private entities and public investors.\nHence, Option {{CORR}} is correct.",
    "Defines Privatization and disinvestment."
)
add_q(make_question(CHAPTER, "Economic Environment in India", "The process of reducing the role of the public sector by transferring government ownership and management to private capital is called:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Integrating the domestic economy with the world economy through trade and capital flows",
    [
        "Imposing prohibitive import tariffs to isolate domestic infant industries",
        "Confining all trade strictly within regional district borders",
        "Abolishing all foreign exchange transactions across the country"
    ],
    "C",
    "1. Globalization means integrating the domestic economy with the global economy by removing export/import barriers, facilitating free flow of goods, services, and capital.\nHence, Option {{CORR}} is correct.",
    "Defines Globalization as international economic integration."
)
add_q(make_question(CHAPTER, "Economic Environment in India", "What does 'Globalization' signify in the context of the 1991 Indian economic reforms?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Demonetization",
    [
        "Disinvestment",
        "Depreciation",
        "Deflation"
    ],
    "D",
    "1. On November 8, 2016, the Government of India announced the demonetization of existing ₹500 and ₹1,000 currency notes with immediate effect.\nHence, Option {{CORR}} is correct.",
    "Identifies Demonetization of Nov 8, 2016."
)
add_q(make_question(CHAPTER, "Demonetization", "The sudden statutory withdrawal of ₹500 and ₹1,000 currency notes as legal tender on November 8, 2016, is termed:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "To curb corruption, counterfeit currency, black money, and channelize savings into the formal banking system",
    [
        "To permanently abolish all commercial banking institutions in India",
        "To replace the Indian Rupee with foreign gold sovereign coins",
        "To prevent citizens from making digital transactions via debit cards"
    ],
    "A",
    "1. The primary objectives of demonetization were to curb corruption, confiscate black money, check counterfeit notes used for terrorism, and accelerate digital banking adoption.\nHence, Option {{CORR}} is correct.",
    "States the core objectives of demonetization."
)
add_q(make_question(CHAPTER, "Demonetization", "What was a primary objective behind the implementation of Demonetization in November 2016?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A tax administration measure to bring undisclosed wealth into the formal tax net",
    [
        "A scheme to forgive all corporate non-performing asset debts",
        "A measure to eliminate the collection of direct income taxes",
        "An administrative mandate prohibiting private property ownership"
    ],
    "B",
    "1. In economic terms, demonetization served as a tax administration measure by forcing individuals with undeclared cash to deposit it in banks, paying taxes and penalties.\nHence, Option {{CORR}} is correct.",
    "Recognizes demonetization as a tax administration measure."
)
add_q(make_question(CHAPTER, "Demonetization", "According to NCERT, Demonetization can be viewed fundamentally as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Increasing competition and more demanding customers",
    [
        "Complete protection of domestic firms from foreign imports",
        "Permanent price freeze on all consumer electronic goods",
        "Guaranteed budgetary subsidies for inefficient public corporations"
    ],
    "C",
    "1. Post-1991 policy changes resulted in intense market competition from MNCs, leading to sophisticated and demanding customers with diverse choices.\nHence, Option {{CORR}} is correct.",
    "Highlights increased competition and demanding customers post-1991."
)
add_q(make_question(CHAPTER, "Impact of Policy Changes", "Which of the following was a major impact of the 1991 policy changes on Indian business and industry?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Market orientation replacing production orientation",
    [
        "Total reliance on government budgetary grants",
        "Elimination of marketing and advertising expenditure",
        "Production of unstandardized goods without consumer feedback"
    ],
    "D",
    "1. In the post-reform era, businesses shifted from a 'production orientation' (producing first, selling later) to a 'market orientation' (studying consumer needs first, then manufacturing).\nHence, Option {{CORR}} is correct.",
    "Highlights the shift from production orientation to market orientation."
)
add_q(make_question(CHAPTER, "Impact of Policy Changes", "The structural shift where firms study consumer demand and preferences before designing and producing goods is known as:", opts, corr, sol))

# =================================================================================================
# 5. Statement I & Statement II Questions (Q45 - Q52)
# =================================================================================================

add_q(make_statement_question(
    CHAPTER, "Business Environment",
    "Specific forces of the business environment affect all business enterprises in an industry equally.",
    "General forces like technological and economic trends exert an impact on all business firms indirectly.",
    "D",
    "1. Statement I is false: Specific forces (investors, customers, competitors) affect an individual enterprise directly, not all firms equally.\n2. Statement II is true: General forces affect all enterprises across the whole economy.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Business Environment",
    "Business environment is dynamic because it remains static and unchanging over long periods.",
    "Business environment is complex because it is relatively easy to understand in parts, but difficult to grasp in its totality.",
    "D",
    "1. Statement I is false: Dynamic means it keeps on changing continuously, not remaining static.\n2. Statement II is true: Complexity arises because while individual components can be understood, their combined interactive effect is difficult to grasp.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Liberalization and Privatization",
    "Liberalization involved the removal of unnecessary administrative controls and licensing restrictions on businesses.",
    "Privatization refers to transferring ownership and management of public sector enterprises to the private sector.",
    "A",
    "1. Statement I is true: Liberalization freed industry from bureaucratic red tape and licensing.\n2. Statement II is true: Privatization involved disinvestment and transfer of PSU management to private hands.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Demonetization",
    "Demonetization was announced by the Government of India on November 8, 2016, invalidating ₹500 and ₹1,000 currency notes.",
    "Demonetization led to a decline in digital transactions and an increase in cash transactions across the Indian economy.",
    "C",
    "1. Statement I is true: Demonetization took effect on November 8, 2016, targeting ₹500 and ₹1,000 notes.\n2. Statement II is false: Demonetization accelerated digital transactions and reduced reliance on cash.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Dimensions of Business Environment",
    "Statutory warnings printed on cigarette packets are an outcome of the Legal Environment.",
    "An increase in the disposable income of families leading to higher demand for luxury goods is an element of the Social Environment.",
    "C",
    "1. Statement I is true: Mandatory statutory warnings are legal requirements enacted by legislation.\n2. Statement II is false: Changes in disposable income, inflation, and GDP are components of the Economic Environment, not the Social Environment.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Importance of Business Environment",
    "A firm that scans the environment early can gain a first mover advantage by exploiting opportunities before competitors.",
    "Environmental scanning helps managers identify threats early, serving as an early warning signal to prepare contingency plans.",
    "A",
    "1. Statement I is true: Early opportunity identification yields first mover advantage.\n2. Statement II is true: Early threat detection provides warning signals to take preventive action.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Market Orientation",
    "Under a production orientation, firms first assess market demand and consumer preferences before deciding what goods to produce.",
    "Under a market orientation, goods are produced based on rigorous market research on consumer satisfaction.",
    "D",
    "1. Statement I is false: Production orientation focuses on manufacturing goods first and pushing them into the market.\n2. Statement II is true: Market orientation prioritizes consumer needs and research before production commences.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Dimensions of Business Environment",
    "Political environment encompasses the general stability and peace in a country and the attitude of the elected government towards business.",
    "Technological environment relates only to the mechanical tools used in heavy steel mills and excludes software or digital networks.",
    "C",
    "1. Statement I is true: Political environment includes domestic stability and governing ideology.\n2. Statement II is false: Technological environment encompasses all scientific innovations, software, internet systems, and digital networks.\nHence, Option C is correct."
))

# =================================================================================================
# 6. Assertion & Reason Questions (Q53 - Q60)
# =================================================================================================

add_q(make_assertion_question(
    CHAPTER, "Business Environment",
    "Business environment is a relative concept.",
    "Environmental conditions and consumer preferences differ significantly from country to country and region to region.",
    "A",
    "1. Assertion (A) is true: Relativity is a fundamental feature of business environment.\n2. Reason (R) is true and correctly explains (A): Since cultural norms, legal frameworks, and local preferences vary across geographies, the environment is relative.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Importance of Business Environment",
    "Environmental scanning helps an organization in tapping useful resources from society.",
    "A business firm operates as an isolated island without depending on outside investors, suppliers, or consumers.",
    "C",
    "1. Assertion (A) is true: Scanning enables firms to procure inputs (finance, labor, raw materials) in exchange for products.\n2. Reason (R) is false: An enterprise cannot function as an isolated island; it is completely open and dependent on the external environment.\nHence, Option C is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Economic Environment",
    "A reduction in interest rates on consumer vehicle loans by commercial banks generally stimulates automobile sales.",
    "Lower interest rates reduce the cost of borrowing for consumers, increasing their purchasing power and demand for financed vehicles.",
    "A",
    "1. Assertion (A) is true: Low EMI rates boost car sales.\n2. Reason (R) is true and directly explains (A): Reduced borrowing costs expand effective consumer demand for credit-financed goods.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Dimensions of Business Environment",
    "Advertising of alcoholic beverages is strictly prohibited on television channels in India.",
    "The prohibition is rooted in the Legal Environment created through court rulings and statutory advertising codes.",
    "A",
    "1. Assertion (A) is true: Alcoholic beverage advertisements are banned on Indian TV channels.\n2. Reason (R) is true and explains (A): Cable Television Networks Rules and regulatory statutes legally forbid direct advertising of alcohol.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Demonetization",
    "Demonetization aimed at creating a less-cash or cash-lite economy.",
    "It encouraged the public to adopt digital payment mechanisms such as UPI, internet banking, and point-of-sale debit cards.",
    "A",
    "1. Assertion (A) is true: Creating a digital, cash-lite economy was a central goal of demonetization.\n2. Reason (R) is true and provides the operational explanation for (A): Channels like UPI and mobile banking expanded exponentially.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Impact of 1991 Reforms",
    "Post-1991, Indian enterprises had to significantly increase their investment in developing human resources.",
    "Increased global competition and rapid technological changes necessitated highly competent, trained, and adaptable personnel.",
    "A",
    "1. Assertion (A) is true: Indian firms prioritized HR training post-1991.\n2. Reason (R) is true and correctly explains (A): The advent of modern technology and MNC competition required upgraded workforce competencies.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Social Environment",
    "The rising demand for packaged ready-to-eat foods is linked to the social environment.",
    "Rapid urbanization and increasing numbers of nuclear families with working couples have altered culinary consumption habits.",
    "A",
    "1. Assertion (A) is true: Ready-to-eat foods surge due to social lifestyle shifts.\n2. Reason (R) is true and correctly explains (A): Nuclear households with busy careers drive demand for time-saving food options.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Liberalization",
    "Under the 1991 Liberalization policy, all private enterprises were nationalized by the central government.",
    "Liberalization aimed at removing unnecessary bureaucratic licensing, quotas, and controls over industry.",
    "D",
    "1. Assertion (A) is false: Liberalization did not nationalize firms; it deregulated private industry and encouraged private enterprise.\n2. Reason (R) is true: Liberalization's primary objective was dismantling bureaucratic licensing, quotas, and price controls.\nHence, Option D is correct."
))

# Verify length and output
print(f"Successfully generated {len(questions)} unique questions for Unit 3!")
assert len(questions) == 60, f"Expected 60 questions, got {len(questions)}"

os.makedirs("mock/bst_units", exist_ok=True)
out_path = "mock/bst_units/unit3.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
