import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.bst_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text,
    get_pyq_normalized_set
)

CHAPTER = "Organizing"
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

print("Generating 80 unique questions for Unit 5: Organizing...")

# =================================================================================================
# 1. Concept, Process & Importance of Organizing (Q1 - Q14)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Identifying and grouping activities, assigning duties, and establishing authority relationships",
    [
        "Calculating monthly corporate tax obligations for revenue departments",
        "Writing daily computer software code for automated databases",
        "Conducting personal disciplinary hearings for factory union leaders"
    ],
    "A",
    "1. Organizing is the managerial function of identifying and grouping the work to be performed, defining and delegating responsibility and authority, and establishing relationships for enabling people to work together.\nHence, Option {{CORR}} is correct.",
    "Defines the organizing function."
)
add_q(make_question(CHAPTER, "Concept of Organizing", "Which of the following encapsulates the core definition of the 'Organizing' function?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Identification and division of work",
    [
        "Departmentalisation",
        "Assignment of duties",
        "Establishing reporting relationships"
    ],
    "B",
    "1. The first step in the process of organizing is identifying and dividing the work that has been determined in accordance with previously formulated plans to avoid duplication.\nHence, Option {{CORR}} is correct.",
    "Identifies Identification and division of work as step 1."
)
add_q(make_question(CHAPTER, "Organizing Process", "What is the very first step in the standardized managerial organizing process?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Departmentalisation",
    [
        "Assignment of duties",
        "Identification of work",
        "Establishing reporting relationships"
    ],
    "C",
    "1. Once work is divided into compact activities, similar and related jobs are grouped together into departments or divisions. This process is called Departmentalisation.\nHence, Option {{CORR}} is correct.",
    "Defines Departmentalisation as grouping related activities."
)
add_q(make_question(CHAPTER, "Organizing Process", "Grouping similar, related activities together into distinct administrative units or divisions is termed as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Assignment of duties",
    [
        "Identification of work",
        "Departmentalisation",
        "Decentralization"
    ],
    "D",
    "1. After departments are formed, work must be allocated to individuals according to their skills, qualifications, and competencies, which is the 'Assignment of Duties'.\nHence, Option {{CORR}} is correct.",
    "Defines Assignment of Duties."
)
add_q(make_question(CHAPTER, "Organizing Process", "Allocating specific tasks to individual employees matching their skills and job descriptions represents which step?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Establishing reporting relationships",
    [
        "Identification of work",
        "Developing premises",
        "Evaluating alternatives"
    ],
    "A",
    "1. Establishing reporting relationships creates a clear hierarchical structure by clarifying who reports to whom and who has the authority to issue orders.\nHence, Option {{CORR}} is correct.",
    "Defines Establishing Reporting Relationships."
)
add_q(make_question(CHAPTER, "Organizing Process", "Clarifying who reports to whom and establishing the hierarchical line of authority in an enterprise corresponds to:", opts, corr, sol))

add_q(make_sequence_question(
    CHAPTER, "Organizing Process",
    "Arrange the four steps of the Organizing process in their correct chronological sequence:",
    [
        "Departmentalisation",
        "Identification and division of work",
        "Establishing reporting relationships",
        "Assignment of duties"
    ],
    "(B), (A), (D), (C)",
    [
        "(A), (B), (C), (D)",
        "(B), (C), (A), (D)",
        "(C), (B), (D), (A)"
    ],
    "A",
    "1. The four steps in organizing are:\n(B) Identification and division of work -> (A) Departmentalisation -> (D) Assignment of duties -> (C) Establishing reporting relationships.\nHence, Option A is correct."
))

opts, corr, sol = rotate_options(
    "Benefits of specialization",
    [
        "Elimination of executive compensation",
        "Abolition of corporate legal charter",
        "Permanent elimination of competition"
    ],
    "B",
    "1. Organizing leads to a systematic allocation of jobs amongst the workforce, leading to repetitive performance and the benefits of specialization.\nHence, Option {{CORR}} is correct.",
    "Highlights benefits of specialization in organizing."
)
add_q(make_question(CHAPTER, "Importance of Organizing", "By dividing work into compact repetitive jobs performed continuously by trained personnel, organizing achieves:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Clarity in working relationships",
    [
        "Uncontrolled organizational ambiguity",
        "Random distribution of accountability",
        "Dissolution of managerial authority"
    ],
    "C",
    "1. The establishment of working relationships clarifies lines of communication and specifies who is accountable to whom, removing confusion and friction.\nHence, Option {{CORR}} is correct.",
    "Emphasizes clarity in working relationships."
)
add_q(make_question(CHAPTER, "Importance of Organizing", "Specifying who is to report to whom eliminates ambiguity in communication and fixes accountability. This highlights:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Optimum utilization of resources",
    [
        "Arbitrary hoarding of raw inventory",
        "Maximizing redundant clerical positions",
        "Duplicating operational production lines"
    ],
    "D",
    "1. Proper assignment of jobs avoids overlapping of work and prevents duplicate efforts, ensuring optimum utilization of physical, financial, and human resources.\nHence, Option {{CORR}} is correct.",
    "Highlights optimum resource utilization."
)
add_q(make_question(CHAPTER, "Importance of Organizing", "Preventing overlapping of activities and eliminating operational duplication leads directly to:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Adaptation to change",
    [
        "Resistance to market dynamics",
        "Permanent institutional stagnation",
        "Abolition of customer service"
    ],
    "A",
    "1. A properly designed organizational structure is flexible, allowing the enterprise to accommodate changes in business environment by modifying managerial relationships.\nHence, Option {{CORR}} is correct.",
    "Highlights adaptation to environmental change."
)
add_q(make_question(CHAPTER, "Importance of Organizing", "Enabling an enterprise to smoothly modify its managerial hierarchy and absorb technological and market disruptions reflects:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Effective administration",
    [
        "Confusing job allocations",
        "Overlapping jurisdiction disputes",
        "Disproportionate executive perks"
    ],
    "B",
    "1. By providing a clear description of jobs and related duties, organizing brings clarity and precision, facilitating effective administration.\nHence, Option {{CORR}} is correct.",
    "Defines effective administration via organized jobs."
)
add_q(make_question(CHAPTER, "Importance of Organizing", "Providing a precise description of jobs and responsibilities helps avoid operational chaos, facilitating:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Development of personnel",
    [
        "Punitive disciplinary actions",
        "Restricting subordinates from learning",
        "Abolishing technical employee training"
    ],
    "C",
    "1. Delegation of routine authority allows managers to concentrate on strategic areas while allowing subordinates to handle operational tasks, developing personnel skills.\nHence, Option {{CORR}} is correct.",
    "Shows development of personnel through delegation."
)
add_q(make_question(CHAPTER, "Importance of Organizing", "Delegating operational duties frees managers to pursue strategic expansion while empowering subordinates to handle challenges. This fosters:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Expansion and growth",
    [
        "Corporate retrenchment",
        "Dissolution of subsidiary units",
        "Curtailment of production lines"
    ],
    "D",
    "1. Organizing allows a business enterprise to add more job positions, departments, and even new product lines smoothly without disrupting existing operations.\nHence, Option {{CORR}} is correct.",
    "Highlights facilitating expansion and growth."
)
add_q(make_question(CHAPTER, "Importance of Organizing", "Facilitating an enterprise to launch new product lines and open regional sales territories without destabilizing existing operations demonstrates:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Span of Management",
    [
        "Scalar Chain",
        "Gang Plank",
        "Unity of Direction"
    ],
    "A",
    "1. Span of management refers to the number of subordinates that can be effectively managed and supervised by a single superior.\nHence, Option {{CORR}} is correct.",
    "Defines Span of Management."
)
add_q(make_question(CHAPTER, "Span of Management", "The number of subordinates that can be effectively supervised by a single executive is termed as:", opts, corr, sol))

# =================================================================================================
# 2. Organizational Structure: Span of Management, Functional vs Divisional (Q15 - Q32)
# =================================================================================================

opts, corr, sol = rotate_options(
    "The number of levels of management in the organizational hierarchy",
    [
        "The exact statutory capital reserves required by commercial banks",
        "The physical square footage of the corporate factory shop-floor",
        "The total monetary profits distributed as dividends to shareholders"
    ],
    "B",
    "1. The span of management determines the levels of management in an organization. A narrow span creates a tall structure with many levels, while a wide span creates a flat structure.\nHence, Option {{CORR}} is correct.",
    "Identifies span of management determining management levels."
)
add_q(make_question(CHAPTER, "Span of Management", "What structural feature of an organization is directly determined by the 'Span of Management'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A tall organizational structure with many hierarchical levels",
    [
        "A flat organizational structure with very few levels",
        "An informal grapevine network without any supervisors",
        "A complete elimination of managerial middle management"
    ],
    "C",
    "1. A narrow span of management means a superior supervises fewer subordinates, which creates multiple supervisory tiers and results in a tall organizational structure.\nHence, Option {{CORR}} is correct.",
    "Relates narrow span to tall structure."
)
add_q(make_question(CHAPTER, "Span of Management", "A narrow span of management typically results in:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Functional Structure",
    [
        "Divisional Structure",
        "Informal Network",
        "Ad-hoc Committee"
    ],
    "D",
    "1. Grouping jobs of similar nature based on functions (such as Production, Marketing, Finance, and HR) creates a Functional Structure.\nHence, Option {{CORR}} is correct.",
    "Defines Functional Structure."
)
add_q(make_question(CHAPTER, "Functional Structure", "Grouping jobs of similar nature together under major departments like Production, Finance, and Marketing creates a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Occupational specialization and economies of scale",
    [
        "Autonomous multi-product profit centers",
        "Rapid cross-departmental coordination",
        "Zero departmental conflict"
    ],
    "A",
    "1. A functional structure promotes occupational specialization since each department focuses solely on its specific function, leading to higher efficiency and scale economies.\nHence, Option {{CORR}} is correct.",
    "Identifies occupational specialization in functional structure."
)
add_q(make_question(CHAPTER, "Functional Structure", "Which of the following is a prominent advantage of a 'Functional Structure'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Departmental interests may supersede overall organizational objectives",
    [
        "Complete duplication of physical plant facilities across all cities",
        "Inability to achieve economies of scale within specialized functions",
        "Elimination of supervisory control over technical personnel"
    ],
    "B",
    "1. A major disadvantage of a functional structure is that functional heads may prioritize their narrow departmental empires over the broad goals of the enterprise.\nHence, Option {{CORR}} is correct.",
    "Highlights departmental empire building as a limitation."
)
add_q(make_question(CHAPTER, "Functional Structure", "A common drawback of a functional structure where departmental heads focus solely on their own goals rather than corporate objectives is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Enterprises having a single line of products or services requiring high operational specialization",
    [
        "Conglomerates manufacturing cosmetics, garments, footwear, and pharmaceuticals",
        "Decentralized global holding companies with diverse unconnected businesses",
        "Temporary construction joint ventures operating for three weeks"
    ],
    "C",
    "1. Functional structure is most suitable for enterprises that produce a single dominant product line where occupational specialization is paramount.\nHence, Option {{CORR}} is correct.",
    "Identifies suitability for single product enterprises."
)
add_q(make_question(CHAPTER, "Functional Structure", "For which type of business enterprise is a 'Functional Structure' most appropriate?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Divisional Structure",
    [
        "Functional Structure",
        "Matrix Hierarchy",
        "Grapevine Channel"
    ],
    "D",
    "1. In a Divisional Structure, the organization is divided into autonomous business units or divisions based on products, each having its own functional heads.\nHence, Option {{CORR}} is correct.",
    "Defines Divisional Structure."
)
add_q(make_question(CHAPTER, "Divisional Structure", "An organization structured into autonomous units based on product lines (e.g., Footwear, Cosmetics, Garments) is known as a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Product specialization and fixing clear accountability for departmental profits",
    [
        "Lowest possible administrative overhead cost",
        "Elimination of duplicate machinery across product units",
        "Centralizing all operational marketing into one city"
    ],
    "A",
    "1. A divisional structure facilitates product specialization, helps develop versatile managers, and allows easy measurement of performance and profit accountability for each division.\nHence, Option {{CORR}} is correct.",
    "Highlights product specialization and profit accountability."
)
add_q(make_question(CHAPTER, "Divisional Structure", "What is a major advantage of adopting a 'Divisional Structure'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Duplication of physical facilities and functions leading to higher operating costs",
    [
        "Complete inability to measure individual product profits",
        "Failure to achieve product specialization",
        "Total absence of operational autonomy for division heads"
    ],
    "B",
    "1. In a divisional structure, functions (such as production, HR, and marketing) are duplicated across each product division, causing higher operating costs.\nHence, Option {{CORR}} is correct.",
    "Highlights duplication of functions as a limitation."
)
add_q(make_question(CHAPTER, "Divisional Structure", "Which of the following represents a primary limitation of a divisional structure?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A large multi-product enterprise manufacturing cosmetics, textiles, pharmaceuticals, and consumer electronics",
    [
        "A small bakery producing only brown bread in a single retail shop",
        "A single-product steel rolling mill requiring high technical specialization",
        "An individual legal practitioner running a private tax chamber"
    ],
    "C",
    "1. Divisional structure is highly suitable for large corporations with diversified product lines requiring distinct operational strategies.\nHence, Option {{CORR}} is correct.",
    "Identifies suitability for multi-product enterprises."
)
add_q(make_question(CHAPTER, "Divisional Structure", "A divisional structure is considered most suitable for which organizational scenario?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Functional is based on functions; Divisional is based on product lines",
    [
        "Functional is multi-product; Divisional is single-product",
        "Functional is expensive; Divisional is zero-cost",
        "Functional was created by Taylor; Divisional was created by Fayol"
    ],
    "D",
    "1. The foundational difference is the basis of formation: Functional structure is formed on the basis of functions, whereas Divisional structure is based on product lines.\nHence, Option {{CORR}} is correct.",
    "Contrasts Functional and Divisional structures on basis of formation."
)
add_q(make_question(CHAPTER, "Functional vs Divisional Structure", "What is the primary basis of formation that differentiates a Functional Structure from a Divisional Structure?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Functional structure has lower costs due to non-duplication of functions",
    [
        "Divisional structure has lower costs because it has zero managers",
        "Both structures incur exactly identical operational expenditures",
        "Functional structure requires duplicate factories for each product"
    ],
    "A",
    "1. Functional structure is economical because functions are not duplicated, whereas divisional structure involves duplication of resources across divisions, making it costlier.\nHence, Option {{CORR}} is correct.",
    "Compares cost between functional and divisional structures."
)
add_q(make_question(CHAPTER, "Functional vs Divisional Structure", "Regarding operational costs, how do Functional and Divisional structures compare?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Fixing responsibility is easy in Divisional structure, but difficult in Functional structure",
    [
        "Fixing responsibility is easy in Functional, but impossible in Divisional",
        "Neither structure allows measurement of financial performance",
        "Responsibility can only be fixed if all divisions report to trade unions"
    ],
    "B",
    "1. In a divisional structure, performance and profitability of each product division are measured easily. In functional structures, pinpointing accountability for overall company profit is difficult.\nHence, Option {{CORR}} is correct.",
    "Compares responsibility fixing across both structures."
)
add_q(make_question(CHAPTER, "Functional vs Divisional Structure", "How does fixing accountability for product profitability compare between Functional and Divisional structures?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Divisional heads gain multi-functional experience, grooming them for top management roles",
    [
        "Functional heads handle all products, preparing them for CEO positions",
        "Functional structure gives managers total control over capital allocation",
        "Divisional structure restricts managers strictly to one narrow specialty"
    ],
    "C",
    "1. Divisional managers gain experience across all business functions (production, sales, finance) for their product, which facilitates broad managerial development for top executive positions.\nHence, Option {{CORR}} is correct.",
    "Highlights managerial development in divisional structure."
)
add_q(make_question(CHAPTER, "Functional vs Divisional Structure", "Why does a Divisional Structure facilitate greater managerial development compared to a Functional Structure?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Functional Structure",
    [
        "Divisional Structure",
        "Informal Network",
        "Autonomous Subsidiary"
    ],
    "D",
    "1. Functional structure is characterized by high operational specialization, economical centralized resources, but inter-departmental coordination hurdles.\nHence, Option {{CORR}} is correct.",
    "Identifies Functional Structure based on features."
)
add_q(make_question(CHAPTER, "Functional vs Divisional Structure", "A structure that minimizes overhead costs through centralized functions but faces coordination bottlenecks across specialized departments is a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Facilitates expansion and growth without interrupting existing product divisions",
    [
        "Eliminates the requirement for middle management executives",
        "Decreases total salaries paid to functional specialists",
        "Abolishes corporate reporting hierarchies"
    ],
    "A",
    "1. When an enterprise wants to launch a new product line, it can simply add a new division with its own functional heads without interrupting existing operations.\nHence, Option {{CORR}} is correct.",
    "Highlights seamless expansion in divisional structure."
)
add_q(make_question(CHAPTER, "Divisional Structure", "How does a Divisional Structure facilitate seamless organizational expansion and growth?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Inter-divisional conflicts regarding allocation of corporate capital and corporate overheads",
    [
        "Lack of occupational focus within individual functional teams",
        "Inability of division heads to control their assigned product line",
        "Complete elimination of operational independence"
    ],
    "B",
    "1. In a divisional structure, conflicts frequently arise among different division heads regarding the allocation of corporate capital and common overhead resources.\nHence, Option {{CORR}} is correct.",
    "Identifies inter-divisional resource conflict."
)
add_q(make_question(CHAPTER, "Divisional Structure", "Which type of conflict is uniquely prevalent within a Divisional Structure?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Divisional Structure",
    [
        "Functional Structure",
        "Grapevine Channel",
        "Single-tier Flat Model"
    ],
    "C",
    "1. Zenith Ltd. manufactures four distinct product categories (Cosmetics, Garments, Footwear, Electronics). Creating autonomous units for each product creates a Divisional Structure.\nHence, Option {{CORR}} is correct.",
    "Applies divisional concept to multi-product scenario."
)
add_q(make_question(CHAPTER, "Divisional Structure", "Zenith Ltd. operates across four distinct industries: Cosmetics, Garments, Footwear, and Electronics. Which organizational structure is most suitable for Zenith Ltd.?", opts, corr, sol))

# =================================================================================================
# 3. Formal and Informal Organization (Q33 - Q46)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Formal Organization",
    [
        "Informal Organization",
        "Grapevine Network",
        "Social Syndicate"
    ],
    "D",
    "1. Formal Organization is intentionally designed by top management to clarify official duties, authority lines, and coordination mechanisms to achieve organizational goals.\nHence, Option {{CORR}} is correct.",
    "Defines Formal Organization."
)
add_q(make_question(CHAPTER, "Formal Organization", "An organization structure consciously designed by top management to accomplish organizational goals through defined authority and responsibility is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Deliberately created by top management through official rules, policies, and procedures",
    [
        "Emerges spontaneously from social interactions and friendships",
        "Lacks any defined scalar chain or official job descriptions",
        "Operates without any written organizational chart or manual"
    ],
    "A",
    "1. A prominent feature of a formal organization is that it is deliberately designed by management and governed by written rules, job descriptions, and formal procedures.\nHence, Option {{CORR}} is correct.",
    "Identifies deliberate creation of formal organization."
)
add_q(make_question(CHAPTER, "Formal Organization", "Which of the following is a distinguishing feature of a 'Formal Organization'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Systematic working and achievement of organizational objectives",
    [
        "Rapid transmission of unverified workplace rumors",
        "Spontaneous fulfillment of personal social affiliation needs",
        "Complete eradication of formal supervisory hierarchy"
    ],
    "B",
    "1. The primary advantage of formal organization is that it ensures systematic and smooth functioning, fixes responsibility, and leads to achievement of corporate goals.\nHence, Option {{CORR}} is correct.",
    "Highlights systematic functioning of formal organization."
)
add_q(make_question(CHAPTER, "Formal Organization", "What is a major advantage of establishing a Formal Organization?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Procedural delays due to strict adherence to the formal scalar chain",
    [
        "Uncontrolled spread of rumors across factory floors",
        "Inability to fix accountability for non-performance",
        "Complete lack of written job descriptions"
    ],
    "C",
    "1. Strict adherence to the formal scalar chain and established bureaucratic channels can lead to procedural red tape and delayed decision-making.\nHence, Option {{CORR}} is correct.",
    "Identifies procedural delays as a limitation of formal organization."
)
add_q(make_question(CHAPTER, "Formal Organization", "Which of the following represents a significant limitation of a Formal Organization?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Informal Organization",
    [
        "Formal Organization",
        "Divisional Structure",
        "Functional Structure"
    ],
    "D",
    "1. Informal organization arises spontaneously within the formal structure when people interact socially, forming personal bonds and friendship groups.\nHence, Option {{CORR}} is correct.",
    "Defines Informal Organization."
)
add_q(make_question(CHAPTER, "Informal Organization", "The network of personal and social relationships that arises spontaneously when employees interact with one another at work is called:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "It originates spontaneously from personal interactions within the formal organization",
    [
        "It is officially charted in the company's legal incorporation documents",
        "It is enforced through statutory disciplinary court orders",
        "It strictly follows the vertical scalar chain of authority"
    ],
    "A",
    "1. Informal organization is not created deliberately by management; it originates spontaneously from psychological and social interactions of employees.\nHence, Option {{CORR}} is correct.",
    "Identifies spontaneous emergence of informal organization."
)
add_q(make_question(CHAPTER, "Informal Organization", "What is the origin of an 'Informal Organization' according to managerial theory?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Faster spread of communication and fulfilling psychological/social needs of employees",
    [
        "Fixing official financial liability on specific workers",
        "Providing certified legal audits for shareholder meetings",
        "Eliminating the need for employee compensation"
    ],
    "B",
    "1. Informal organization provides faster communication (grapevine) and fulfills employees' social and belongingness needs, improving job satisfaction.\nHence, Option {{CORR}} is correct.",
    "Highlights fast communication and psychological satisfaction."
)
add_q(make_question(CHAPTER, "Informal Organization", "Which of the following is a major benefit of an Informal Organization?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "It may spread unverified rumors and resist organizational changes",
    [
        "It leads to rigid bureaucratic delays along the scalar chain",
        "It guarantees that every employee receives written legal instructions",
        "It prevents workers from forming lunchroom friendships"
    ],
    "C",
    "1. Limitations of informal organization include the spread of rumors through grapevine channels and collective group resistance to changes introduced by management.\nHence, Option {{CORR}} is correct.",
    "Highlights rumors and resistance to change."
)
add_q(make_question(CHAPTER, "Informal Organization", "Which of the following is a major limitation associated with an Informal Organization?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Grapevine",
    [
        "Scalar Chain",
        "Gang Plank",
        "Official Gazette"
    ],
    "D",
    "1. The informal channel of communication is called the 'Grapevine' because it branches out in all directions without following formal lines of authority.\nHence, Option {{CORR}} is correct.",
    "Identifies Grapevine as the informal communication network."
)
add_q(make_question(CHAPTER, "Informal Organization", "The informal communication network that cuts across formal lines of authority and spreads information in all directions is known as the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Managers should recognize and utilize informal groups to transmit information and gather genuine feedback",
    [
        "Managers should file criminal lawsuits against workers who speak during lunch breaks",
        "Managers must completely ban all informal social interactions among staff",
        "Managers should abolish formal organization and operate solely on rumors"
    ],
    "A",
    "1. A skillful manager does not attempt to suppress informal organization; instead, they harness its social strength to receive authentic feedback and transmit information smoothly.\nHence, Option {{CORR}} is correct.",
    "Describes constructive managerial approach towards informal organization."
)
add_q(make_question(CHAPTER, "Informal Organization", "What is the recommended managerial approach toward an Informal Organization?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Formal has official scalar lines; Informal has no structured direction of flow",
    [
        "Formal is created by trade unions; Informal is created by the board of directors",
        "Formal is unwritten folklore; Informal is legally registered with courts",
        "Formal is completely flexible; Informal is rigidly unalterable"
    ],
    "B",
    "1. Communication flows vertically through the scalar chain in formal organizations, whereas it follows no fixed pattern and moves freely in informal organizations.\nHence, Option {{CORR}} is correct.",
    "Contrasts communication flows in formal and informal organizations."
)
add_q(make_question(CHAPTER, "Formal vs Informal Organization", "How does communication flow differ between a Formal Organization and an Informal Organization?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Authority arises from formal position in Formal, and from personal qualities in Informal",
    [
        "Authority arises from cash investments in Formal, and government decree in Informal",
        "Authority in Formal is temporary, while in Informal it is statutory",
        "Authority exists only in Informal, whereas Formal relies purely on goodwill"
    ],
    "C",
    "1. In a formal organization, authority arises by virtue of position in the managerial hierarchy. In an informal organization, authority stems from personal traits and social influence.\nHence, Option {{CORR}} is correct.",
    "Contrasts origin of authority in formal and informal organizations."
)
add_q(make_question(CHAPTER, "Formal vs Informal Organization", "What is the fundamental difference regarding the source of 'Authority' between Formal and Informal organizations?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Formal is stable and predictable; Informal is flexible and fluid",
    [
        "Formal is completely unstable; Informal is legally fixed forever",
        "Formal changes every minute; Informal remains static for centuries",
        "Neither possesses any stability in corporate life"
    ],
    "D",
    "1. Formal organization is stable and predictable because changes are planned deliberately. Informal organization is dynamic, flexible, and changes based on interpersonal relationships.\nHence, Option {{CORR}} is correct.",
    "Contrasts stability between formal and informal organizations."
)
add_q(make_question(CHAPTER, "Formal vs Informal Organization", "Regarding organizational 'Stability', which statement is correct?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Informal organization supplements the formal organization and fulfills psychological needs",
    [
        "Informal organization permanently invalidates formal authority",
        "Informal organization should be completely eradicated by top management",
        "Informal organization eliminates the necessity for company financial audits"
    ],
    "A",
    "1. Informal organization co-exists with and supplements formal organization by providing psychological satisfaction and rapid communication channels.\nHence, Option {{CORR}} is correct.",
    "Highlights informal organization supplementing the formal organization."
)
add_q(make_question(CHAPTER, "Formal vs Informal Organization", "How does an Informal Organization interact with the Formal Organization in practice?", opts, corr, sol))

# =================================================================================================
# 4. Delegation & Decentralization (Q47 - Q62)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Authority, Responsibility, and Accountability",
    [
        "Planning, Organizing, and Controlling",
        "Centralization, Scalar Chain, and Order",
        "Recruitment, Selection, and Training"
    ],
    "B",
    "1. According to Louis Allen and standard NCERT management principles, the three foundational elements of delegation are: Authority, Responsibility, and Accountability.\nHence, Option {{CORR}} is correct.",
    "Lists the three elements of delegation."
)
add_q(make_question(CHAPTER, "Elements of Delegation", "What are the three essential elements comprising the process of 'Delegation'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Authority",
    [
        "Responsibility",
        "Accountability",
        "Span of Management"
    ],
    "C",
    "1. Authority refers to the formal right of an individual to command subordinates, utilize organizational resources, and take necessary actions to accomplish assigned duties.\nHence, Option {{CORR}} is correct.",
    "Defines Authority."
)
add_q(make_question(CHAPTER, "Elements of Delegation", "The formal managerial right to command subordinates, allocate resources, and make decisions is termed as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Authority flows downwards from superior to subordinate",
    [
        "Authority flows upwards from worker to board of directors",
        "Authority flows exclusively in horizontal circles",
        "Authority has zero directional flow in management"
    ],
    "D",
    "1. Authority originates from the top executive positions and flows downwards from a superior to a subordinate along the scalar chain.\nHence, Option {{CORR}} is correct.",
    "Affirms downward flow of authority."
)
add_q(make_question(CHAPTER, "Elements of Delegation", "In which direction does 'Authority' flow within the organizational hierarchy?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Responsibility",
    [
        "Authority",
        "Decentralization",
        "Grapevine"
    ],
    "A",
    "1. Responsibility is the obligation of a subordinate to properly perform the assigned duty or task, and it flows upwards to the superior.\nHence, Option {{CORR}} is correct.",
    "Defines Responsibility as obligation to perform."
)
add_q(make_question(CHAPTER, "Elements of Delegation", "The professional obligation of a subordinate to perform the task assigned by their superior is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Responsibility flows upwards from subordinate to superior",
    [
        "Responsibility flows downwards from superior to subordinate",
        "Responsibility flows horizontally between suppliers",
        "Responsibility flows randomly without hierarchy"
    ],
    "B",
    "1. Since a subordinate is obliged to perform duties assigned by their superior, responsibility flows upwards from subordinate to superior.\nHence, Option {{CORR}} is correct.",
    "Identifies upward flow of responsibility."
)
add_q(make_question(CHAPTER, "Elements of Delegation", "What is the directional flow of 'Responsibility' in an organization?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Accountability",
    [
        "Authority",
        "Autonomy",
        "Departmentalisation"
    ],
    "C",
    "1. Accountability implies answerability for the final outcome of the assigned work. Once authority is delegated and responsibility accepted, accountability cannot be passed on.\nHence, Option {{CORR}} is correct.",
    "Defines Accountability as answerability for final outcome."
)
add_q(make_question(CHAPTER, "Elements of Delegation", "Answerability for the final outcome of an assigned task that cannot be delegated to anyone else is called:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Accountability is absolute and cannot be delegated to anyone",
    [
        "Accountability can be fully transferred to junior interns",
        "Accountability flows downwards from CEO to factory helpers",
        "Accountability is automatically dissolved if a task fails"
    ],
    "D",
    "1. Accountability is absolute. While a manager can delegate authority and entrust responsibility, they remain entirely answerable to their own superior for the final outcome.\nHence, Option {{CORR}} is correct.",
    "Emphasizes accountability is absolute and cannot be delegated."
)
add_q(make_question(CHAPTER, "Elements of Delegation", "Which of the following principles governs 'Accountability' in management?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The plant head remains fully accountable to the board of directors",
    [
        "The plant head is absolved of all blame and responsibility",
        "Accountability is legally erased because authority was delegated",
        "The supervisor alone goes to jail while the plant head receives a bonus"
    ],
    "A",
    "1. Even if the plant head delegates tasks to a supervisor, the plant head remains completely accountable to senior management for final production delivery.\nHence, Option {{CORR}} is correct.",
    "Applies absolute accountability to plant head scenario."
)
add_q(make_question(CHAPTER, "Elements of Delegation", "A plant head delegates production scheduling to a supervisor. The supervisor fails to meet the quota. Who remains accountable to top management?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Effective management by relieving executives from routine operational chores",
    [
        "Permanent dismissal of entry-level workers to cut payroll",
        "Elimination of formal reporting relationships across branches",
        "Exempting top executives from financial audit requirements"
    ],
    "B",
    "1. Delegation relieves managers of routine work, enabling them to concentrate on strategic priorities, leading to effective management.\nHence, Option {{CORR}} is correct.",
    "Highlights effective management as importance of delegation."
)
add_q(make_question(CHAPTER, "Importance of Delegation", "By empowering subordinates to handle routine operational tasks, delegation facilitates:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Employee development and motivation",
    [
        "Inter-departmental hostility",
        "Decreased worker self-esteem",
        "Clerical stagnation"
    ],
    "C",
    "1. Delegation provides opportunities for subordinates to utilize their skills, exercise initiative, and gain confidence, fostering employee development and motivation.\nHence, Option {{CORR}} is correct.",
    "Highlights employee development and motivation."
)
add_q(make_question(CHAPTER, "Importance of Delegation", "Delegating authority allows subordinates to exercise initiative, take decisions, and build confidence. This achieves:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Decentralization",
    [
        "Centralization",
        "Single-tier Management",
        "Functional Foremanship"
    ],
    "D",
    "1. Systematic dispersal of decision-making authority down to the lowest operational levels across the entire enterprise is known as Decentralization.\nHence, Option {{CORR}} is correct.",
    "Defines Decentralization."
)
add_q(make_question(CHAPTER, "Decentralization", "The systematic dispersal of decision-making authority to the lowest operational levels across an enterprise is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Relief to top management and quick decision-making",
    [
        "Concentration of all minor approvals at the CEO desk",
        "Complete elimination of operational performance reviews",
        "Abolition of corporate legal charters"
    ],
    "A",
    "1. Decentralization diminishes the operational burden on top executives and allows decisions to be taken promptly at the spot where action takes place.\nHence, Option {{CORR}} is correct.",
    "Highlights relief to top management and fast decision-making."
)
add_q(make_question(CHAPTER, "Importance of Decentralization", "By pushing decision-making authority closer to operational points of action, decentralization enables:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Develops initiative among subordinates and managerial talent for the future",
    [
        "Fosters excessive dependence on top executives for routine approvals",
        "Removes all accountability from division managers",
        "Encourages arbitrary defiance of corporate strategy"
    ],
    "B",
    "1. Decentralization gives subordinates freedom to make operational choices, cultivating independent thinking, self-reliance, and managerial talent for future leadership.\nHence, Option {{CORR}} is correct.",
    "Highlights developing subordinate initiative and future talent."
)
add_q(make_question(CHAPTER, "Importance of Decentralization", "Allowing subordinate managers the freedom to solve operational problems autonomously helps to:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Delegation is between two individuals; Decentralization is an organization-wide policy",
    [
        "Delegation is optional; Decentralization is mandatory for all firms",
        "Delegation gives complete freedom; Decentralization gives zero freedom",
        "Delegation is permanent; Decentralization expires every evening"
    ],
    "C",
    "1. Delegation is a two-person transfer of authority from a superior to an immediate subordinate, whereas decentralization is a comprehensive policy affecting all levels.\nHence, Option {{CORR}} is correct.",
    "Contrasts Delegation and Decentralization by scope."
)
add_q(make_question(CHAPTER, "Delegation vs Decentralization", "What is the primary difference in scope between 'Delegation' and 'Decentralization'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Delegation is a vital necessity; Decentralization is an optional corporate policy",
    [
        "Delegation is an optional luxury; Decentralization is legally compulsory",
        "Both are rigidly enforced statutory mandates under the Companies Act",
        "Neither has any relevance in modern corporate enterprise"
    ],
    "D",
    "1. Delegation is an unavoidable necessity because no single manager can perform all tasks alone. Decentralization is an optional strategic policy decision.\nHence, Option {{CORR}} is correct.",
    "Identifies Delegation as necessary and Decentralization as optional policy."
)
add_q(make_question(CHAPTER, "Delegation vs Decentralization", "Regarding organizational necessity, which statement correctly compares Delegation and Decentralization?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Subordinates enjoy greater freedom of action in Decentralization than in Delegation",
    [
        "Subordinates have zero freedom in Decentralization but full freedom in Delegation",
        "Both grant completely identical, unmonitored executive autonomy",
        "Neither allows subordinates to take any operational decisions"
    ],
    "A",
    "1. In delegation, the superior retains close ongoing supervision and control over the subordinate. In decentralization, semi-autonomous operating units enjoy greater freedom of action.\nHence, Option {{CORR}} is correct.",
    "Compares freedom of action between delegation and decentralization."
)
add_q(make_question(CHAPTER, "Delegation vs Decentralization", "How does 'Freedom of Action' compare between Delegation and Decentralization?", opts, corr, sol))

# =================================================================================================
# 5. Statement I & Statement II Questions (Q63 - Q71)
# =================================================================================================

add_q(make_statement_question(
    CHAPTER, "Span of Management",
    "Span of management refers to the total number of shareholders holding voting equity in a company.",
    "Span of management determines the number of levels in an organizational structure.",
    "D",
    "1. Statement I is false: Span of management refers to the number of subordinates effectively managed by a superior, not shareholders.\n2. Statement II is true: It directly dictates whether the structure is tall or flat.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Functional and Divisional Structure",
    "A functional structure is organized around major specialized activities like Production, Marketing, and Finance.",
    "A divisional structure is formed on the basis of distinct product lines or geographic territories.",
    "A",
    "1. Statement I is true: Functional structure groups jobs by specialized business functions.\n2. Statement II is true: Divisional structure groups activities into product-based or territory-based divisions.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Formal and Informal Organization",
    "A formal organization originates spontaneously from personal friendships and social interactions.",
    "An informal organization has no fixed lines of communication and information spreads in all directions.",
    "D",
    "1. Statement I is false: Formal organization is intentionally designed by management; informal organization arises spontaneously.\n2. Statement II is true: Informal communication (grapevine) lacks rigid structure and flows freely.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Delegation Elements",
    "Authority flows downwards from superior to subordinate along the scalar chain.",
    "Responsibility flows downwards from superior to subordinate because superiors are obligated to work for subordinates.",
    "C",
    "1. Statement I is true: Authority flows downward from superior to subordinate.\n2. Statement II is false: Responsibility flows upward because a subordinate is obligated to perform the duties assigned by the superior.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Accountability",
    "Accountability is absolute and cannot be delegated under any circumstances.",
    "A manager remains answerable to their superior for the performance of tasks delegated to subordinates.",
    "A",
    "1. Statement I is true: Accountability cannot be delegated; it is absolute.\n2. Statement II is true: A manager cannot wash their hands of responsibility by delegating to a subordinate.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Delegation and Decentralization",
    "Delegation is an optional policy choice that management may choose to completely avoid.",
    "Decentralization is an optional management philosophy that expands the scope of delegation across all levels.",
    "D",
    "1. Statement I is false: Delegation is an unavoidable necessity because no manager can do all work single-handedly.\n2. Statement II is true: Decentralization is an optional policy philosophy.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Organizing Importance",
    "Organizing provides benefits of specialization by dividing work into compact repetitive jobs.",
    "Organizing creates operational confusion by intentionally keeping working relationships undefined.",
    "C",
    "1. Statement I is true: Organizing leads to specialization through systematic job division.\n2. Statement II is false: Organizing eliminates confusion by explicitly clarifying reporting relationships.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Informal Organization",
    "Informal organization can be completely abolished by issuing a formal board circular.",
    "Informal organization fulfills the psychological and social affiliation needs of employees.",
    "D",
    "1. Statement I is false: Informal organization cannot be eradicated because human beings naturally interact socially.\n2. Statement II is true: It fulfills crucial social, belongingness, and emotional needs.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Divisional Structure",
    "In a divisional structure, each product division functions as an autonomous, multi-functional unit.",
    "A divisional structure completely eliminates the duplication of physical plant facilities and personnel.",
    "C",
    "1. Statement I is true: Product divisions operate autonomously with dedicated functional heads.\n2. Statement II is false: Divisional structure leads to duplication of functions across product units, raising costs.\nHence, Option C is correct."
))

# =================================================================================================
# 6. Assertion & Reason Questions (Q72 - Q80)
# =================================================================================================

add_q(make_assertion_question(
    CHAPTER, "Accountability",
    "Accountability cannot be delegated by a manager.",
    "A manager is answerable for the overall outcome of the work assigned to them by their own superior.",
    "A",
    "1. Assertion (A) is true: Accountability is non-delegable.\n2. Reason (R) is true and explains (A): Since a manager is entrusted with the total responsibility by the superior, they cannot shed ultimate answerability by passing work down.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Divisional Structure",
    "A divisional structure is particularly well suited for multi-product enterprises.",
    "It allows easy fixation of responsibility and accountability for the profitability of each product line.",
    "A",
    "1. Assertion (A) is true: Multi-product firms benefit most from divisional structure.\n2. Reason (R) is true and explains (A): Segregating operations into distinct profit centers allows precise financial tracking and specialized product focus.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Span of Management",
    "A wide span of management results in a flat organizational structure.",
    "When a superior directly supervises a large number of subordinates, fewer hierarchical tiers are needed.",
    "A",
    "1. Assertion (A) is true: Wide span creates flat organizations.\n2. Reason (R) is true and directly explains (A): Managing many subordinates under one boss reduces vertical managerial layers.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Delegation",
    "Delegation is considered an essential practical necessity for every business manager.",
    "No individual manager can perform all organizational activities single-handedly without sharing tasks.",
    "A",
    "1. Assertion (A) is true: Delegation is an indispensable necessity.\n2. Reason (R) is true and provides the causal explanation for (A): Physical and mental capacity constraints force managers to entrust duties to subordinates.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Informal Organization",
    "Management should seek to suppress and eliminate all informal groups within an enterprise.",
    "Informal organization can serve as a valuable conduit for fast communication and employee emotional support.",
    "D",
    "1. Assertion (A) is false: Managers should not attempt to suppress informal groups; doing so is futile and counterproductive.\n2. Reason (R) is true: Informal groups provide fast feedback (grapevine) and satisfy social needs.\nHence, Option D is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Decentralization",
    "Decentralization helps develop managerial talent for the future.",
    "Subordinates gain hands-on experience in decision-making and handling operational challenges autonomously.",
    "A",
    "1. Assertion (A) is true: Decentralization develops future managerial bench strength.\n2. Reason (R) is true and explains (A): Exercising authority builds subordinate judgment, problem-solving skills, and leadership readiness.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Organizing Process",
    "Establishing reporting relationships is the final step in the organizing process.",
    "It specifies the hierarchical authority structure and clarifies who is to report to whom.",
    "A",
    "1. Assertion (A) is true: Establishing reporting relationships completes the 4-step organizing process.\n2. Reason (R) is true and explains (A): It establishes the chain of command and communication channels.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Functional Structure",
    "A functional structure makes it very easy to pinpoint responsibility for overall company profitability.",
    "Different functional departments like production, marketing, and finance are deeply interdependent, making individual accountability for company profit difficult to isolate.",
    "D",
    "1. Assertion (A) is false: Pinpointing profit responsibility in a functional structure is difficult.\n2. Reason (R) is true: High interdependence among specialized departments obscures individual accountability for final net profit.\nHence, Option D is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Authority and Responsibility",
    "There should be parity between authority and responsibility delegated to a subordinate.",
    "An imbalance where authority exceeds responsibility leads to misuse of power, while responsibility exceeding authority creates frustration.",
    "A",
    "1. Assertion (A) is true: Parity between authority and responsibility is essential.\n2. Reason (R) is true and explains (A): Imbalances cause misuse of command or operational paralysis.\nHence, Option A is correct."
))

# Verify length and output
print(f"Successfully generated {len(questions)} unique questions for Unit 5!")
assert len(questions) == 80, f"Expected 80 questions, got {len(questions)}"

os.makedirs("mock/bst_units", exist_ok=True)
out_path = "mock/bst_units/unit5.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
