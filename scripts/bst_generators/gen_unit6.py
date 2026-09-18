import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.bst_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text,
    get_pyq_normalized_set
)

CHAPTER = "Staffing"
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

print("Generating 80 unique questions for Unit 6: Staffing...")

# =================================================================================================
# 1. Concept, Importance of Staffing & Staffing Process (Q1 - Q14)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Obtaining, utilizing, and maintaining a satisfactory and satisfied workforce",
    [
        "Purchasing industrial heavy machinery at discounted vendor rates",
        "Auditing internal accounting records for financial compliance",
        "Drafting corporate legal contracts for international mergers"
    ],
    "A",
    "1. Staffing has been described as the managerial function of filling and keeping filled positions in the organization structure by obtaining, utilizing, and maintaining a satisfactory and satisfied workforce.\nHence, Option {{CORR}} is correct.",
    "Defines the staffing function."
)
add_q(make_question(CHAPTER, "Concept of Staffing", "Which statement best defines the managerial function of 'Staffing'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Putting the right person on the right job with appropriate qualifications at the right time",
    [
        "Filling corporate positions purely through nepotism and personal relationships",
        "Hiring only family members of current board executives",
        "Outsourcing all corporate executive decisions to foreign artificial intelligence"
    ],
    "B",
    "1. The fundamental essence of staffing is putting people to jobs—finding the right person for the right job, having the right qualification, doing the right job at the right time.\nHence, Option {{CORR}} is correct.",
    "Highlights putting right person on right job."
)
add_q(make_question(CHAPTER, "Concept of Staffing", "The core managerial maxim underlying the staffing function is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Discovering and obtaining competent personnel for various jobs",
    [
        "Dissolving corporate trade unions permanently",
        "Abolishing employee provident fund accounts",
        "Maximizing inventory holding costs in warehouses"
    ],
    "C",
    "1. Proper staffing helps in discovering and obtaining competent personnel for various positions within the organization.\nHence, Option {{CORR}} is correct.",
    "Identifies discovering competent personnel as an importance."
)
add_q(make_question(CHAPTER, "Importance of Staffing", "Which of the following is a primary benefit of the staffing function?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Optimum utilization of human resources avoiding both overstaffing and understaffing",
    [
        "Maintaining massive overstaffing to increase payroll expenses",
        "Allowing positions to remain vacant indefinitely to save cash",
        "Assigning accounting tasks to untrained assembly laborers"
    ],
    "D",
    "1. Through manpower planning, staffing avoids overstaffing (which inflates wage bills) and understaffing (which disrupts output), ensuring optimum resource utilization.\nHence, Option {{CORR}} is correct.",
    "Highlights avoiding overstaffing and understaffing."
)
add_q(make_question(CHAPTER, "Importance of Staffing", "How does staffing ensure the 'Optimum Utilization of Human Resources'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Human Resource Management is a broader discipline, of which staffing is an integral operational part",
    [
        "Staffing has completely replaced and abolished Human Resource Management",
        "Human Resource Management is an entry-level clerical task within staffing",
        "Both terms are mutually exclusive and completely unconnected"
    ],
    "A",
    "1. Human Resource Management (HRM) is a comprehensive organizational discipline, and staffing is that part of HRM concerned with filling and maintaining job positions.\nHence, Option {{CORR}} is correct.",
    "Clarifies relationship between Staffing and HRM."
)
add_q(make_question(CHAPTER, "Staffing and HRM", "What is the relationship between 'Staffing' and 'Human Resource Management' (HRM)?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Estimating Manpower Requirements",
    [
        "Selection",
        "Recruitment",
        "Training and Development"
    ],
    "B",
    "1. The initial step in the staffing process is Estimating Manpower Requirements, which determines how many persons and of what type are needed.\nHence, Option {{CORR}} is correct.",
    "Identifies Estimating Manpower Requirements as the first step."
)
add_q(make_question(CHAPTER, "Staffing Process", "What is the initial step in the standardized managerial staffing process?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Workload analysis determines the number and types of personnel required, while workforce analysis reveals the number actually available",
    [
        "Workload analysis checks factory machinery; workforce analysis audits customer complaints",
        "Workload analysis calculates daily wages; workforce analysis measures biological pulse",
        "Workload analysis is done by trade unions; workforce analysis is done by tax authorities"
    ],
    "C",
    "1. Workload analysis enables assessment of the number and types of human resources necessary for performing various jobs. Workforce analysis reveals the number and types available in-house.\nHence, Option {{CORR}} is correct.",
    "Distinguishes workload analysis from workforce analysis."
)
add_q(make_question(CHAPTER, "Staffing Process", "What is the key difference between 'Workload Analysis' and 'Workforce Analysis' in manpower planning?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Recruitment",
    [
        "Selection",
        "Placement",
        "Performance Appraisal"
    ],
    "D",
    "1. Recruitment is the process of searching for prospective employees and stimulating them to apply for jobs in the organization.\nHence, Option {{CORR}} is correct.",
    "Defines Recruitment."
)
add_q(make_question(CHAPTER, "Staffing Process", "The process of searching for prospective employees and stimulating them to apply for job vacancies is called:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Selection",
    [
        "Recruitment",
        "Orientation",
        "Manpower Planning"
    ],
    "A",
    "1. Selection is the process of choosing from among the pool of prospective job candidates developed at the stage of recruitment.\nHence, Option {{CORR}} is correct.",
    "Defines Selection."
)
add_q(make_question(CHAPTER, "Staffing Process", "The process of choosing the most suitable candidate from the pool of applicants who applied during recruitment is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Placement and Orientation",
    [
        "Recruitment and Selection",
        "Compensation and Career Planning",
        "Transfers and Promotions"
    ],
    "B",
    "1. Orientation introduces the selected employee to other employees and familiarizes them with rules and policies, while placement puts the person on the assigned job position.\nHence, Option {{CORR}} is correct.",
    "Defines Placement and Orientation."
)
add_q(make_question(CHAPTER, "Staffing Process", "Familiarizing a newly hired employee with coworkers, corporate values, and assigning them to their designated post is termed:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Performance Appraisal",
    [
        "Selection",
        "Recruitment",
        "Manpower Planning"
    ],
    "C",
    "1. Performance Appraisal means evaluating an employee's current and/or past performance against predetermined organizational standards.\nHence, Option {{CORR}} is correct.",
    "Defines Performance Appraisal."
)
add_q(make_question(CHAPTER, "Staffing Process", "Systematically evaluating an employee's current and past job performance against predetermined benchmarks is known as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Promotion",
    [
        "Transfer",
        "Demotion",
        "Apprenticeship"
    ],
    "D",
    "1. Promotion involves the upward movement of an employee to a position carrying higher responsibility, prestige, status, and financial pay.\nHence, Option {{CORR}} is correct.",
    "Defines Promotion."
)
add_q(make_question(CHAPTER, "Staffing Process", "Moving an employee vertically upward to a position with increased responsibilities, greater authority, and higher compensation is a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Compensation",
    [
        "Preliminary Screening",
        "Placement",
        "Workload Analysis"
    ],
    "A",
    "1. Compensation refers to all forms of pay or rewards given to employees, including direct financial payments (wages, salaries, bonuses) and indirect payments (insurance, perks).\nHence, Option {{CORR}} is correct.",
    "Defines Compensation."
)
add_q(make_question(CHAPTER, "Staffing Process", "All forms of direct financial remuneration (salaries, commissions) and indirect benefits (health insurance, housing) given to workers are termed:", opts, corr, sol))

add_q(make_sequence_question(
    CHAPTER, "Staffing Process",
    "Arrange the initial four steps of the Staffing process in their correct chronological sequence:",
    [
        "Selection",
        "Estimating Manpower Requirements",
        "Placement and Orientation",
        "Recruitment"
    ],
    "(B), (D), (A), (C)",
    [
        "(A), (B), (C), (D)",
        "(B), (A), (D), (C)",
        "(C), (B), (A), (D)"
    ],
    "B",
    "1. The correct chronological sequence is:\n(B) Estimating Manpower Requirements -> (D) Recruitment -> (A) Selection -> (C) Placement and Orientation.\nHence, Option B is correct."
))

# =================================================================================================
# 2. Recruitment: Internal vs External Sources & Methods (Q15 - Q32)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Transfers and Promotions",
    [
        "Campus Placement and Employment Exchange",
        "Direct Recruitment and Casual Callers",
        "Web Publishing and Advertising on Television"
    ],
    "A",
    "1. The two major internal sources of recruitment within an organization are Transfers and Promotions.\nHence, Option {{CORR}} is correct.",
    "Identifies internal sources of recruitment."
)
add_q(make_question(CHAPTER, "Internal Recruitment", "Which pair consists strictly of 'Internal Sources' of recruitment?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Transfer involves horizontal movement without significant change in pay; Promotion involves vertical upward movement with higher pay and status",
    [
        "Transfer is permanent termination; Promotion is a temporary pay cut",
        "Transfer is done for new graduates; Promotion is for external job applicants",
        "Transfer requires campus interviews; Promotion is decided by trade unions"
    ],
    "B",
    "1. Transfer is a horizontal shifting of an employee from one job/branch to another without substantial change in responsibilities or pay. Promotion is vertical upward mobility with higher pay and status.\nHence, Option {{CORR}} is correct.",
    "Distinguishes Transfer from Promotion."
)
add_q(make_question(CHAPTER, "Internal Recruitment", "What is the key difference between a 'Transfer' and a 'Promotion'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Motivates employees, cheaper, and simplifies selection without lengthy induction",
    [
        "Infuses fresh talent and novel technological ideas from outside universities",
        "Provides an unlimited pool of external technical applicants",
        "Encourages fierce cut-throat rivalry between corporate competitors"
    ],
    "C",
    "1. Internal recruitment is economical, motivates existing workers to perform better, and reduces the time and cost of induction training.\nHence, Option {{CORR}} is correct.",
    "Highlights merits of internal recruitment."
)
add_q(make_question(CHAPTER, "Internal Recruitment", "Which of the following is a major advantage of utilizing internal sources of recruitment?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Limits infusion of fresh talent, creates lethargy, and may hamper healthy competition",
    [
        "Costs substantial advertising expenditures in international newspapers",
        "Requires lengthy background checks by private detective agencies",
        "Forces organizations to hire unqualified entry-level university graduates"
    ],
    "D",
    "1. Limitations of internal recruitment include 'inbreeding' (lack of fresh ideas/talent), worker lethargy due to guaranteed promotions, and limited choice.\nHence, Option {{CORR}} is correct.",
    "Highlights limitations of internal recruitment."
)
add_q(make_question(CHAPTER, "Internal Recruitment", "A prominent limitation of relying exclusively on internal recruitment is that it:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Transfer of surplus staff from an overstaffed branch to an understaffed branch",
    [
        "Hiring thousands of external workers through television commercials",
        "Sending executive directors to international business school summits",
        "Liquidating an unprofitable regional retail branch"
    ],
    "A",
    "1. Transfer helps in shifting surplus staff from departments or branches with overstaffing to those suffering from manpower shortages.\nHence, Option {{CORR}} is correct.",
    "Highlights transfer as a tool to balance staffing across branches."
)
add_q(make_question(CHAPTER, "Internal Recruitment", "How can an enterprise effectively utilize 'Transfers' to optimize corporate manpower allocation across branches?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Direct Recruitment (Notice Board)",
    [
        "Campus Recruitment",
        "Management Consultants",
        "Web Publishing"
    ],
    "B",
    "1. In Direct Recruitment, a notice specifying job vacancies is placed on the factory gate/notice board, primarily used for hiring casual, unskilled, or daily-wage workers (Badli workers).\nHence, Option {{CORR}} is correct.",
    "Defines Direct Recruitment at the factory gate."
)
add_q(make_question(CHAPTER, "External Recruitment", "Placing a vacancy notice on the factory notice board to hire casual or daily-wage laborers is termed:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Casual Callers",
    [
        "Direct Recruitment",
        "Campus Recruitment",
        "Employment Exchange"
    ],
    "C",
    "1. Many reputable business firms maintain a database of unsolicited applicant resumes (casual callers) and screen them when vacancies arise, reducing recruitment costs.\nHence, Option {{CORR}} is correct.",
    "Defines Casual Callers."
)
add_q(make_question(CHAPTER, "External Recruitment", "Utilizing a stored database of unsolicited applications received previously to fill sudden vacancies is called:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Advertisements in newspapers and professional journals",
    [
        "Direct recruitment on the factory gate",
        "Labor contractors",
        "Casual callers"
    ],
    "D",
    "1. Advertising in print media (newspapers, trade journals) offers a wide reach across the country, attracting qualified professionals for technical and senior positions.\nHence, Option {{CORR}} is correct.",
    "Identifies Advertisements for wide reach."
)
add_q(make_question(CHAPTER, "External Recruitment", "Which external source of recruitment provides the widest geographic reach when seeking specialized senior managerial talent?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Employment Exchanges operated by the Government",
    [
        "Private Executive Search Firms",
        "Campus Placement Cells",
        "Factory Gate Notice Boards"
    ],
    "A",
    "1. Employment Exchanges run by the government match personnel demand and supply for unskilled, semi-skilled, and lower-level clerical jobs.\nHence, Option {{CORR}} is correct.",
    "Defines Employment Exchanges."
)
add_q(make_question(CHAPTER, "External Recruitment", "Government-run administrative agencies that register job seekers and match them with operational vacancies are:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Placement Agencies and Management Consultants",
    [
        "Employment Exchanges",
        "Factory Notice Boards",
        "Casual Walk-ins"
    ],
    "B",
    "1. Placement agencies and management consultants (executive search firms) specialize in headhunting top-level executives and middle managers for a professional fee.\nHence, Option {{CORR}} is correct.",
    "Defines Placement Agencies and Management Consultants."
)
add_q(make_question(CHAPTER, "External Recruitment", "Private professional firms that specialize in recruiting middle and top-level executive personnel on a commission basis are:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Campus Recruitment",
    [
        "Labor Contractors",
        "Direct Recruitment",
        "Transfers"
    ],
    "C",
    "1. Recruitment of technical, professional, and managerial personnel directly from universities and management institutes is known as Campus Recruitment.\nHence, Option {{CORR}} is correct.",
    "Defines Campus Recruitment."
)
add_q(make_question(CHAPTER, "External Recruitment", "Recruiting fresh engineering and management graduates directly from educational institutes and universities is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Recommendations of present employees",
    [
        "Labor contractors",
        "Factory gate notice",
        "Web publishing"
    ],
    "D",
    "1. Applicants introduced by existing staff members are known as recommendations of employees; this provides a reliable preliminary background check.\nHence, Option {{CORR}} is correct.",
    "Defines Recommendations of Employees."
)
add_q(make_question(CHAPTER, "External Recruitment", "Encouraging existing employees to introduce their qualified friends and relatives for vacant positions refers to:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Labor Contractors",
    [
        "Campus Recruitment",
        "Placement Agencies",
        "Web Portals"
    ],
    "A",
    "1. Labor contractors maintain close contact with village laborers and supply unorganized construction or manufacturing workers on short notice for a commission.\nHence, Option {{CORR}} is correct.",
    "Defines Labor Contractors."
)
add_q(make_question(CHAPTER, "External Recruitment", "Intermediaries who maintain direct links with rural workers and supply unskilled manual laborers on short notice are:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Web Publishing / Internet Job Portals",
    [
        "Factory Notice Board",
        "Labor Contractors",
        "Internal Transfers"
    ],
    "B",
    "1. Websites like Naukri.com, Monster, and LinkedIn allow organizations to post vacancies and search vast databases of job seekers online.\nHence, Option {{CORR}} is correct.",
    "Identifies Web Publishing on internet portals."
)
add_q(make_question(CHAPTER, "External Recruitment", "Using specialized internet websites to solicit applications and screen resumes of candidates electronically is known as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Qualified personnel, wider choice, and fresh talent",
    [
        "Complete elimination of training expenditures",
        "Zero risk of hiring incompatible employees",
        "Instant settlement of labor union disputes"
    ],
    "C",
    "1. External recruitment attracts qualified personnel, provides a wider pool of applicants, and brings fresh ideas and competitive spirit into the enterprise.\nHence, Option {{CORR}} is correct.",
    "Highlights benefits of external recruitment."
)
add_q(make_question(CHAPTER, "External Recruitment", "Which of the following is a major advantage of utilizing external sources of recruitment?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Dissatisfaction among existing staff and high financial expenditure",
    [
        "Inability to find candidates with specialized technical degrees",
        "Prohibition under the Indian Contract Act",
        "Failure to attract applicants from outside the local city"
    ],
    "D",
    "1. External recruitment may demoralize existing employees who lose promotion opportunities, and the process involves lengthy procedures and high advertising costs.\nHence, Option {{CORR}} is correct.",
    "Highlights limitations of external recruitment."
)
add_q(make_question(CHAPTER, "External Recruitment", "A significant drawback of relying on external recruitment for filling higher-level vacancies is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Recruitment is positive (attracting applicants); Selection is negative (rejecting unsuitable applicants)",
    [
        "Recruitment is negative; Selection is positive",
        "Recruitment is done by courts; Selection is done by trade unions",
        "Recruitment is for blue-collar workers; Selection is for white-collar staff"
    ],
    "A",
    "1. Recruitment is positive as it aims to increase the pool of applicants. Selection is considered negative because more candidates are rejected than chosen.\nHence, Option {{CORR}} is correct.",
    "Contrasts positive recruitment with negative selection."
)
add_q(make_question(CHAPTER, "Recruitment vs Selection", "Why is Recruitment regarded as a 'positive process' while Selection is considered a 'negative process'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "External recruitment infuses fresh talent; Internal recruitment protects morale but risks inbreeding",
    [
        "External recruitment is always free; Internal recruitment incurs massive agency commissions",
        "External recruitment is done solely by notice boards; Internal recruitment uses internet job boards",
        "External recruitment is forbidden in the private sector"
    ],
    "B",
    "1. External recruitment introduces fresh talent and ideas, whereas internal recruitment motivates existing employees but can lead to organizational inbreeding.\nHence, Option {{CORR}} is correct.",
    "Contrasts external and internal recruitment strategic impact."
)
add_q(make_question(CHAPTER, "Recruitment Sources", "When balancing internal versus external recruitment, what trade-off must human resource executives weigh?", opts, corr, sol))

# =================================================================================================
# 3. Selection Process & Selection Tests (Q33 - Q48)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Preliminary Screening",
    [
        "Medical Examination",
        "Reference Check",
        "Contract of Employment"
    ],
    "C",
    "1. Preliminary screening helps the HR manager eliminate unqualified or unfit job seekers based on the information supplied in application forms.\nHence, Option {{CORR}} is correct.",
    "Identifies Preliminary Screening as the first step in selection."
)
add_q(make_question(CHAPTER, "Selection Process", "What is the initial stage in the selection process that filters out visibly unqualified applicants?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Intelligence Test",
    [
        "Trade Test",
        "Aptitude Test",
        "Interest Test"
    ],
    "D",
    "1. An Intelligence Test is an indicator of an individual's learning ability or the ability to make decisions and judgments (measuring Intelligence Quotient or IQ).\nHence, Option {{CORR}} is correct.",
    "Defines Intelligence Test."
)
add_q(make_question(CHAPTER, "Selection Tests", "Which psychological test measures an applicant's overall learning capacity, reasoning, and IQ?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Aptitude Test",
    [
        "Trade Test",
        "Personality Test",
        "Medical Test"
    ],
    "A",
    "1. An Aptitude Test measures an individual's potential for learning new skills. It indicates the person's capacity to develop in the future.\nHence, Option {{CORR}} is correct.",
    "Defines Aptitude Test."
)
add_q(make_question(CHAPTER, "Selection Tests", "A selection test designed to measure an applicant's potential and capacity to learn new technical skills in the future is an:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Personality Test",
    [
        "Intelligence Test",
        "Trade Test",
        "Aptitude Test"
    ],
    "B",
    "1. Personality tests provide clues to an individual's emotions, reactions, maturity, and value systems, probing overall personality dimensions.\nHence, Option {{CORR}} is correct.",
    "Defines Personality Test."
)
add_q(make_question(CHAPTER, "Selection Tests", "Which test evaluates an applicant's emotional stability, social maturity, temperament, and value systems?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Trade Test (Proficiency Test)",
    [
        "Aptitude Test",
        "Interest Test",
        "Intelligence Test"
    ],
    "C",
    "1. A Trade Test measures the existing skills of the individual. It measures the level of knowledge and proficiency in the actual profession or technical field.\nHence, Option {{CORR}} is correct.",
    "Defines Trade Test."
)
add_q(make_question(CHAPTER, "Selection Tests", "A practical test conducted to evaluate an applicant's existing knowledge and current technical proficiency in their specific trade is a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Interest Test",
    [
        "Aptitude Test",
        "Trade Test",
        "Intelligence Test"
    ],
    "D",
    "1. Interest Tests are used to discover an applicant's patterns of interests or involvement in specific areas of work and hobbies.\nHence, Option {{CORR}} is correct.",
    "Defines Interest Test."
)
add_q(make_question(CHAPTER, "Selection Tests", "Which test is utilized to uncover an applicant's specific vocational inclinations, hobbies, and personal fascinations?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Aptitude test measures potential to acquire skills; Trade test measures existing proficiency in already learned skills",
    [
        "Aptitude test measures physical stamina; Trade test measures psychological IQ",
        "Aptitude test is taken by directors; Trade test is taken by clerical staff",
        "Aptitude test is negative; Trade test is positive"
    ],
    "A",
    "1. Aptitude test measures potential/capacity to learn future skills, whereas Trade test measures existing actual skills and proficiency already mastered.\nHence, Option {{CORR}} is correct.",
    "Contrasts Aptitude Test and Trade Test."
)
add_q(make_question(CHAPTER, "Selection Tests", "What is the crucial difference between an 'Aptitude Test' and a 'Trade Test'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Employment Interview",
    [
        "Preliminary Screening",
        "Job Offer",
        "Contract of Employment"
    ],
    "B",
    "1. An Employment Interview is a formal, in-depth conversation conducted to evaluate the applicant's suitability for the job through direct visual interaction.\nHence, Option {{CORR}} is correct.",
    "Defines Employment Interview."
)
add_q(make_question(CHAPTER, "Selection Process", "A formal, in-depth face-to-face conversation conducted to assess an applicant's suitability, communication, and disposition is the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Reference and Background Checks",
    [
        "Preliminary Screening",
        "Job Offer",
        "Training Workshop"
    ],
    "C",
    "1. Prospective employers contact references (past employers, teachers, referees) to verify information and obtain additional insights into an applicant's character and track record.\nHence, Option {{CORR}} is correct.",
    "Defines Reference and Background Checks."
)
add_q(make_question(CHAPTER, "Selection Process", "Contacting previous employers, university professors, or respectable citizens listed on a resume to verify applicant credentials is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Selection Decision",
    [
        "Preliminary Screening",
        "Aptitude Testing",
        "Recruitment Advertising"
    ],
    "D",
    "1. The final selection decision is made from among the candidates who pass the tests, interviews, and reference checks, incorporating views of the concerned line manager.\nHence, Option {{CORR}} is correct.",
    "Defines Selection Decision."
)
add_q(make_question(CHAPTER, "Selection Process", "Making the conclusive managerial choice from among applicants who cleared tests, interviews, and background verifications is the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Medical Examination",
    [
        "Preliminary Screening",
        "Trade Test",
        "Interest Inventory"
    ],
    "A",
    "1. After the selection decision and before the job offer is made, the candidate is required to undergo a medical examination to certify physical fitness for job duties.\nHence, Option {{CORR}} is correct.",
    "Defines Medical Examination."
)
add_q(make_question(CHAPTER, "Selection Process", "Verifying that the selected candidate is physically and mentally fit to execute the assigned operational duties involves a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Job Offer",
    [
        "Reference Check",
        "Preliminary Screening",
        "Workforce Analysis"
    ],
    "B",
    "1. The Job Offer is issued through an appointment letter confirming selection, stating terms, and specifying a reasonable date by which the candidate must report for duty.\nHence, Option {{CORR}} is correct.",
    "Defines Job Offer."
)
add_q(make_question(CHAPTER, "Selection Process", "Issuing a formal letter of appointment specifying the designation, reporting date, and initial compensation terms represents the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Contract of Employment",
    [
        "Resume Summary",
        "Aptitude Scorecard",
        "Reference Verification Slip"
    ],
    "C",
    "1. After accepting the job offer, both employer and employee sign the Contract of Employment containing vital details: job title, duties, pay scale, leave rules, and disciplinary procedures.\nHence, Option {{CORR}} is correct.",
    "Defines Contract of Employment."
)
add_q(make_question(CHAPTER, "Selection Process", "The comprehensive legal document signed upon job acceptance detailing job title, duties, leave rules, working hours, and termination clauses is:", opts, corr, sol))

add_q(make_sequence_question(
    CHAPTER, "Selection Process",
    "Arrange the following middle stages of the Selection process in their correct chronological order:",
    [
        "Employment Interview",
        "Selection Tests",
        "Selection Decision",
        "Reference and Background Checks"
    ],
    "(B), (A), (D), (C)",
    [
        "(A), (B), (C), (D)",
        "(B), (A), (C), (D)",
        "(C), (A), (B), (D)"
    ],
    "A",
    "1. The correct sequence is:\n(B) Selection Tests -> (A) Employment Interview -> (D) Reference and Background Checks -> (C) Selection Decision.\nHence, Option A is correct."
))

add_q(make_sequence_question(
    CHAPTER, "Selection Process",
    "Arrange the concluding four steps of the Selection process in chronological sequence:",
    [
        "Contract of Employment",
        "Medical Examination",
        "Job Offer",
        "Selection Decision"
    ],
    "(D), (B), (C), (A)",
    [
        "(A), (B), (C), (D)",
        "(D), (C), (B), (A)",
        "(B), (D), (C), (A)"
    ],
    "B",
    "1. The concluding sequence is:\n(D) Selection Decision -> (B) Medical Examination -> (C) Job Offer -> (A) Contract of Employment.\nHence, Option B is correct."
))

opts, corr, sol = rotate_options(
    "The line manager who will be directly supervising the candidate",
    [
        "The external campus placement officer",
        "The corporate tax accountant",
        "The junior receptionist at headquarters"
    ],
    "C",
    "1. The final selection decision should strongly consider the views of the concerned line manager whose department the selected candidate will be working in.\nHence, Option {{CORR}} is correct.",
    "Highlights role of concerned line manager in selection."
)
add_q(make_question(CHAPTER, "Selection Process", "Whose managerial opinion must be crucially consulted before finalizing the 'Selection Decision'?", opts, corr, sol))

# =================================================================================================
# 4. Training & Development, On-the-job vs Off-the-job Methods (Q49 - Q62)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Training is job-oriented to improve current skills; Development is career-oriented to foster overall individual growth",
    [
        "Training is for top CEOs; Development is strictly for temporary daily laborers",
        "Training takes 30 years; Development is completed in 10 minutes",
        "Training is voluntary folklore; Development is a statutory court sentence"
    ],
    "D",
    "1. Training is a process of learning specific skills for a particular job. Development is a broader continuous process aimed at overall growth and career progression of the executive.\nHence, Option {{CORR}} is correct.",
    "Contrasts Training and Development."
)
add_q(make_question(CHAPTER, "Training and Development", "What is the primary difference between 'Training' and 'Development' in human resource management?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Higher productivity, reduced accidents, reduced turnover, and preparing future managers",
    [
        "Eliminating the need to pay employee salaries",
        "Abolishing all corporate machine maintenance",
        "Insulating the company from statutory government taxes"
    ],
    "A",
    "1. Benefits of training to the organization include higher employee productivity, economical use of machinery with fewer accidents, lower absenteeism/turnover, and building managerial talent.\nHence, Option {{CORR}} is correct.",
    "Lists organizational benefits of training."
)
add_q(make_question(CHAPTER, "Benefits of Training", "Which of the following is a major benefit of employee training to the 'Organization'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Improved skills, higher earning capacity, increased safety, and elevated employee morale",
    [
        "Immunity from corporate performance appraisals",
        "Guaranteed automatic ownership of corporate shares",
        "Right to bypass the formal scalar chain at will"
    ],
    "B",
    "1. Benefits to the employee include enhanced competencies, better career prospects, higher earning capacity, safety on machinery, and high morale.\nHence, Option {{CORR}} is correct.",
    "Lists employee benefits of training."
)
add_q(make_question(CHAPTER, "Benefits of Training", "How does systematic training directly benefit the individual 'Employee'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "On-the-job training involves learning while doing at the workplace; Off-the-job training involves learning away from the work floor",
    [
        "On-the-job is done in foreign countries; Off-the-job is done in local offices",
        "On-the-job is for university professors; Off-the-job is for plumbers",
        "On-the-job uses only books; Off-the-job uses only physical tools"
    ],
    "C",
    "1. On-the-job methods mean 'learning while doing' at the actual workplace. Off-the-job methods mean 'learning before doing' away from the actual work floor.\nHence, Option {{CORR}} is correct.",
    "Contrasts On-the-job and Off-the-job training."
)
add_q(make_question(CHAPTER, "Training Methods", "What is the fundamental distinction between 'On-the-job' and 'Off-the-job' training methods?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Apprenticeship Programme",
    [
        "Vestibule Training",
        "Classroom Lecture",
        "Computer Modelling"
    ],
    "D",
    "1. Apprenticeship programmes put the trainee under the guidance of a master worker for a prescribed period to acquire higher level skills (e.g., electricians, plumbers, machinists).\nHence, Option {{CORR}} is correct.",
    "Defines Apprenticeship Programme."
)
add_q(make_question(CHAPTER, "On-the-job Training", "A training method where a trainee works under the direct guidance of a master craftsman for a specified period to learn skilled trades is an:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Internship Training",
    [
        "Apprenticeship Programme",
        "Vestibule Training",
        "Job Rotation"
    ],
    "A",
    "1. Internship is a joint programme between educational institutions and business enterprises where students gain practical experience to balance theoretical learning.\nHence, Option {{CORR}} is correct.",
    "Defines Internship Training."
)
add_q(make_question(CHAPTER, "On-the-job Training", "A collaborative training arrangement between professional universities and business firms where students gain practical operational experience is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Job Rotation",
    [
        "Vestibule Training",
        "Apprenticeship Programme",
        "Preliminary Screening"
    ],
    "B",
    "1. Job rotation involves shifting an employee periodically from one department or job to another, giving them a well-rounded understanding of all phases of the business.\nHence, Option {{CORR}} is correct.",
    "Defines Job Rotation."
)
add_q(make_question(CHAPTER, "On-the-job Training", "Systematically shifting a trainee from one department to another to provide broad multi-functional business exposure is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Coaching",
    [
        "Classroom Lecture",
        "Film Show",
        "Vestibule Training"
    ],
    "C",
    "1. In coaching, the superior guides and instructs the trainee as a coach, suggesting how to solve problems and evaluating performance on a daily basis.\nHence, Option {{CORR}} is correct.",
    "Defines Coaching."
)
add_q(make_question(CHAPTER, "On-the-job Training", "A training approach where a senior executive acts as a personal mentor, advising and guiding the trainee on daily operational challenges is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Vestibule Training",
    [
        "Apprenticeship Training",
        "Job Rotation",
        "Internship Training"
    ],
    "D",
    "1. Vestibule training takes place in a separate workshop or classroom equipped with dummy equipment identical to the real factory machines, protecting expensive machinery from damage.\nHence, Option {{CORR}} is correct.",
    "Defines Vestibule Training."
)
add_q(make_question(CHAPTER, "Off-the-job Training", "Training provided away from the factory floor in a dedicated workshop using dummy machinery replicating the actual work environment is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "To train workers on sophisticated, expensive equipment without risking machine breakdown or factory disruptions",
    [
        "To eliminate all training costs and bypass instructor salaries",
        "To force workers into permanent unpaid classroom lectures",
        "To test employee emotional stability through polygraph lie detectors"
    ],
    "A",
    "1. Vestibule training is adopted when employees must handle delicate and sophisticated machinery, allowing them to gain confidence on identical dummy models first.\nHence, Option {{CORR}} is correct.",
    "Explains rationale for Vestibule Training."
)
add_q(make_question(CHAPTER, "Off-the-job Training", "Why do manufacturing corporations utilize 'Vestibule Training' for sophisticated production lines?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Vestibule Training",
    [
        "Apprenticeship Programme",
        "Job Rotation",
        "Internship Training"
    ],
    "B",
    "1. Vestibule training is an off-the-job method conducted away from the actual work floor, whereas apprenticeship, job rotation, and internship are on-the-job methods.\nHence, Option {{CORR}} is correct.",
    "Classifies Vestibule Training as off-the-job."
)
add_q(make_question(CHAPTER, "Training Methods", "Which of the following is strictly categorized as an 'Off-the-job' training method?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Education broadens general understanding and logical thinking; Training imparts specific practical job skills",
    [
        "Education is for factory mechanics; Training is for university chancellors",
        "Education lasts for two days; Training spans 20 years",
        "Education is illegal in corporate offices"
    ],
    "C",
    "1. Education is the process of increasing general knowledge, critical thinking, and understanding of the total environment. Training teaches specific job-related skills.\nHence, Option {{CORR}} is correct.",
    "Contrasts Education and Training."
)
add_q(make_question(CHAPTER, "Training and Education", "How does 'Education' differ fundamentally from 'Training'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Computer Modelling",
    [
        "Apprenticeship Training",
        "Job Rotation",
        "Direct Recruitment"
    ],
    "D",
    "1. Computer modelling simulates actual work environments on computer programs, allowing trainees to make simulated decisions in high-risk professions like pilot training.\nHence, Option {{CORR}} is correct.",
    "Defines Computer Modelling in training."
)
add_q(make_question(CHAPTER, "Off-the-job Training", "Simulating complex real-world operational environments on computer screens to train pilots and reactor operators without physical danger uses:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Apprenticeship Programme",
    [
        "Vestibule Training",
        "Casual Caller Registry",
        "Campus Headhunting"
    ],
    "A",
    "1. Electricians, plumbers, and ironworkers typically undergo extensive Apprenticeship training under an experienced master tradesperson.\nHence, Option {{CORR}} is correct.",
    "Applies Apprenticeship training to skilled trades."
)
add_q(make_question(CHAPTER, "On-the-job Training", "For training skilled trade workers such as plumbers, electricians, and welders, which training method is most commonly utilized?", opts, corr, sol))

# =================================================================================================
# 5. Statement I & Statement II Questions (Q63 - Q71)
# =================================================================================================

add_q(make_statement_question(
    CHAPTER, "Workload and Workforce Analysis",
    "Workload analysis enables the assessment of the number and types of human resources necessary for performing various jobs.",
    "Workforce analysis reveals the number and type of human resources actually available within the organization.",
    "A",
    "1. Statement I is true: Workload analysis determines manpower requirements.\n2. Statement II is true: Workforce analysis reveals existing internal manpower supply.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Recruitment and Selection",
    "Recruitment is considered a negative process because it seeks to reject as many applicants as possible.",
    "Selection is considered a positive process because it stimulates an unlimited number of candidates to apply.",
    "B",
    "1. Statement I is false: Recruitment is positive because it aims to attract and maximize applicants.\n2. Statement II is false: Selection is negative because it systematically screens out and rejects unsuitable candidates.\nBoth are false, which maps to option B under standard statement format.\nHence, Option B is correct."
))

add_q(make_statement_question(
    CHAPTER, "Internal Sources of Recruitment",
    "Internal recruitment motivates existing employees to improve their performance to earn promotions.",
    "Internal recruitment completely eliminates the danger of organizational inbreeding and brings fresh external talent.",
    "C",
    "1. Statement I is true: Internal promotion strongly motivates current staff.\n2. Statement II is false: Internal recruitment actually promotes inbreeding and limits the entry of fresh outside talent.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Selection Tests",
    "An aptitude test measures the existing technical knowledge and proficiency a candidate has already mastered.",
    "A trade test measures the candidate's future capacity and potential to learn new skills.",
    "B",
    "1. Statement I is false: Aptitude measures future learning potential, not existing skills.\n2. Statement II is false: Trade test measures existing proficiency, not future potential.\nBoth statements are false.\nHence, Option B is correct."
))

add_q(make_statement_question(
    CHAPTER, "Training and Development",
    "Training is a job-oriented process aimed at improving performance in an employee's current role.",
    "Development is a career-oriented process aimed at overall growth and realization of the employee's full potential.",
    "A",
    "1. Statement I is true: Training focuses on current job skills.\n2. Statement II is true: Development is holistic, focusing on long-term career growth.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Vestibule Training",
    "Vestibule training is an on-the-job training method conducted directly on the live factory assembly line.",
    "Vestibule training uses dummy machines identical to real factory equipment in a separate workshop.",
    "D",
    "1. Statement I is false: Vestibule training is an off-the-job method conducted away from the actual work floor.\n2. Statement II is true: It utilizes duplicate dummy machines in a classroom or simulated workshop.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Selection Process",
    "Preliminary screening is the final step of the selection process conducted after issuing the contract of employment.",
    "Medical examination is conducted before issuing the formal job offer to certify physical fitness for the role.",
    "D",
    "1. Statement I is false: Preliminary screening is the very first step of selection.\n2. Statement II is true: Medical fitness is checked prior to issuing the final appointment offer.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Direct Recruitment",
    "Direct recruitment on the factory gate is primarily used for recruiting senior executive board members.",
    "Casual callers refers to utilizing an existing internal database of unsolicited applications to fill vacancies.",
    "D",
    "1. Statement I is false: Direct recruitment at the factory gate is used for casual, unskilled daily-wage labor, not senior executives.\n2. Statement II is true: Casual callers relies on unsolicited resumes kept on file.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Compensation",
    "Direct financial payments include wages, salaries, commissions, and performance bonuses.",
    "Indirect payments include medical insurance, employer provident fund contributions, and subsidized housing.",
    "A",
    "1. Statement I is true: Direct financial compensation includes basic pay, overtime, and bonuses.\n2. Statement II is true: Indirect compensation comprises benefits, perks, and welfare schemes.\nHence, Option A is correct."
))

# =================================================================================================
# 6. Assertion & Reason Questions (Q72 - Q80)
# =================================================================================================

add_q(make_assertion_question(
    CHAPTER, "Selection Process",
    "Selection is frequently characterized as a negative process.",
    "At every step of the selection process, the number of rejected candidates is substantially larger than the number selected.",
    "A",
    "1. Assertion (A) is true: Selection is considered a negative process.\n2. Reason (R) is true and directly explains (A): The objective of selection is weeding out unsuitable applicants, resulting in more rejections than acceptances.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Internal Recruitment",
    "Internal recruitment is more economical than external recruitment.",
    "It eliminates the need for expensive public advertisements, recruitment agencies, and elaborate orientation programmes.",
    "A",
    "1. Assertion (A) is true: Internal recruitment costs substantially less.\n2. Reason (R) is true and explains (A): Advertising costs and external agency commissions are bypassed, and candidates are already familiar with the firm.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Staffing Importance",
    "Staffing is essential for the continuous survival and growth of an enterprise.",
    "An organization can survive and succeed over time even if its critical executive and technical positions remain vacant.",
    "C",
    "1. Assertion (A) is true: Staffing ensures survival and growth by staffing positions with capable personnel.\n2. Reason (R) is false: An organization cannot survive without competent individuals executing critical operational roles.\nHence, Option C is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Vestibule Training",
    "Vestibule training is preferred when workers have to handle delicate, highly sophisticated equipment.",
    "It allows trainees to master machine operations on identical dummy equipment without damaging actual production machinery.",
    "A",
    "1. Assertion (A) is true: Sophisticated machinery necessitates vestibule training.\n2. Reason (R) is true and explains (A): Practicing on dummy models prevents costly factory downtime and equipment damage.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Workload Analysis",
    "Workforce analysis reveals whether the organization is overstaffed or understaffed.",
    "Comparing workload requirements with workforce availability enables management to take remedial hiring or transfer actions.",
    "A",
    "1. Assertion (A) is true: Workforce analysis reveals current staffing levels.\n2. Reason (R) is true and explains (A): Juxtaposing workload demand with available workforce indicates excess or shortage.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Placement and Orientation",
    "Orientation helps a newly hired employee feel comfortable and confident in the organization.",
    "Orientation introduces the new employee to organizational rules, policies, culture, and immediate team colleagues.",
    "A",
    "1. Assertion (A) is true: Orientation builds new employee confidence.\n2. Reason (R) is true and directly explains (A): Introducing company culture and coworkers reduces initial workplace anxiety.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "External Recruitment",
    "External recruitment brings 'new blood' and fresh perspective into the organization.",
    "Relying exclusively on internal promotions often leads to organizational inbreeding and stagnation of ideas.",
    "A",
    "1. Assertion (A) is true: External recruitment introduces fresh talent and modern perspectives.\n2. Reason (R) is true and explains (A): External hiring prevents inbreeding by sourcing candidates exposed to outside innovations.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Selection Tests",
    "A Trade Test is designed to evaluate an applicant's future learning potential and capacity to acquire new skills.",
    "A Trade Test measures the actual technical knowledge and proficiency currently possessed by the candidate in their trade.",
    "D",
    "1. Assertion (A) is false: Evaluating future learning potential is the role of an Aptitude Test, not a Trade Test.\n2. Reason (R) is true: Trade tests measure current existing proficiency in the specific trade.\nHence, Option D is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Training and Productivity",
    "Systematic training of employees leads to higher productivity and lower operational waste.",
    "Trained workers handle machinery proficiently, reducing material wastage, preventing industrial accidents, and working efficiently.",
    "A",
    "1. Assertion (A) is true: Training boosts productivity and reduces waste.\n2. Reason (R) is true and provides the causal explanation for (A): Correct machine handling minimizes errors, scrap, and accidents.\nHence, Option A is correct."
))

# Verify length and output
print(f"Successfully generated {len(questions)} unique questions for Unit 6!")
assert len(questions) == 80, f"Expected 80 questions, got {len(questions)}"

os.makedirs("mock/bst_units", exist_ok=True)
out_path = "mock/bst_units/unit6.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
