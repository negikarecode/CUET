import sys, os

out_path = "scripts/subject_generators/cs_passages_1_10.py"

content = '''import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import case_q

# ==============================================================================
# MOCK 1 PASSAGES
# ==============================================================================
P1_M1_TXT = (
    "Read the following case excerpt on school file handling and answer the questions that follow:\\n\\n"
    "Sunita, a Class 12 Computer Science student, is developing an automated Student Record Management system for her school. "
    "She stores student attendance logs and academic marks in two distinct files: 'attendance.txt' (a plain text file) and "
    "'marks.csv' (a comma-separated values file). In 'attendance.txt', each line contains a student's roll number, name, and status "
    "separated by spaces. Sunita writes a Python function that uses the with open('attendance.txt', 'r') statement to safely read the file "
    "line-by-line using readline() inside a loop, stripping the trailing newline character with strip(). "
    "For 'marks.csv', Sunita utilizes Python's built-in csv module. She opens the file in read mode ('r', newline='') and creates a "
    "csv.reader object to iterate through records, where each record is returned as a Python list of strings. She discovers that numeric marks "
    "must be explicitly converted to integers using int() before computing aggregate sums and class averages."
)
P1_M1_QS = [
    case_q("File Handling in Python", "Safe File Opening with 'with'",
           "Why is opening 'attendance.txt' using the 'with open(...)' construct considered best practice in Python?",
           "It guarantees that the file stream is automatically and cleanly closed when execution leaves the block, even if an exception occurs",
           ["It executes the code twice as fast as open()", "It encrypts the text file automatically", "It prevents other programs from reading the file permanently"],
           "The 'with' statement creates a context manager that guarantees the file descriptor is closed automatically upon exit."),
    case_q("File Handling in Python", "Stripping Trailing Newlines",
           "Why did Sunita apply the string method strip() on lines read from 'attendance.txt'?",
           "To remove trailing whitespace and newline characters ('\\\\n') from the end of each read line",
           ["To convert all lowercase letters to uppercase", "To verify that the roll number is positive", "To delete the student's name"],
           "strip() removes leading and trailing whitespace, including '\\\\n' and '\\\\r'."),
    case_q("File Handling in Python", "CSV Reader Output Data Type",
           "What data structure does csv.reader(file_object) return for each record during iteration?",
           "A Python list containing field values as strings",
           ["A single concatenated string", "A dictionary with automated integer keys", "A binary bytearray"],
           "Each row read by csv.reader is parsed and returned as a list of strings."),
    case_q("File Handling in Python", "Numeric Type Conversion in CSV",
           "Why must Sunita explicitly cast marks read from 'marks.csv' using int() or float() before computing totals?",
           "Because csv.reader reads all table cells as string data types by default",
           ["Because Python does not support arithmetic on numbers", "Because CSV files cannot store numbers greater than 100", "Because CSV modules only work with boolean values"],
           "All data read from CSV files via csv.reader is parsed as string objects; arithmetic requires explicit type casting."),
    case_q("File Handling in Python", "File Open newline Argument Role",
           "Why is newline='' specified when opening CSV files for reading/writing in Python 3?",
           "To prevent Python from converting universal newlines and avoid inserting redundant blank lines across operating systems",
           ["To make the file read-only", "To compress the CSV file size", "To ignore comma delimiters"],
           "Specifying newline='' allows the csv module to handle end-of-line terminators correctly without producing extra blank lines.")
]

P2_M1_TXT = (
    "Read the following database design case study and answer the questions that follow:\\n\\n"
    "The Apex Public School database administrator created two relational tables in MySQL to track student enrollments and fee payments:\\n"
    "1. Table STUDENT (AdmNo INT PRIMARY KEY, SName VARCHAR(30), Stream VARCHAR(15), Class INT);\\n"
    "2. Table FEES (RcptNo INT PRIMARY KEY, AdmNo INT, FeeAmount DECIMAL(8,2), FeeDate DATE, "
    "FOREIGN KEY (AdmNo) REFERENCES STUDENT(AdmNo));\\n\\n"
    "The administrator enforces Referential Integrity through the Foreign Key on AdmNo. A query is written to display the student name, "
    "stream, and fee amount paid by joining STUDENT and FEES on STUDENT.AdmNo = FEES.AdmNo. "
    "Furthermore, the school principal requests an executive summary displaying the total fee collected per stream, filtering for "
    "streams where total collections exceed 100,000, sorted in descending order of total collection."
)
P2_M1_QS = [
    case_q("Database Concepts and SQL", "Referential Integrity Enforcement",
           "What constraint in table FEES enforces that fee records can only be created for existing students?",
           "FOREIGN KEY (AdmNo) REFERENCES STUDENT(AdmNo)",
           ["PRIMARY KEY (RcptNo)", "CHECK (FeeAmount > 0)", "NOT NULL on Stream"],
           "The FOREIGN KEY constraint links AdmNo in FEES to the primary key AdmNo in STUDENT, preserving referential integrity."),
    case_q("Database Concepts and SQL", "Equi-Join Query Condition",
           "Which WHERE clause condition correctly joins the STUDENT and FEES tables in an SQL SELECT query?",
           "WHERE STUDENT.AdmNo = FEES.AdmNo",
           ["WHERE STUDENT.AdmNo = FEES.RcptNo", "WHERE STUDENT.SName = FEES.FeeAmount", "WHERE STUDENT.AdmNo IS NULL"],
           "An equi-join matches the common attribute: STUDENT.AdmNo = FEES.AdmNo."),
    case_q("Database Concepts and SQL", "Grouping and Aggregate Filtering",
           "Which SQL clause is required to filter groups having total fee collection exceeding 100,000?",
           "HAVING SUM(FEES.FeeAmount) > 100000",
           ["WHERE SUM(FEES.FeeAmount) > 100000", "ORDER BY SUM(FEES.FeeAmount) > 100000", "GROUP BY FeeAmount > 100000"],
           "Aggregate conditions on grouped data must be placed in the HAVING clause, not the WHERE clause."),
    case_q("Database Concepts and SQL", "Sorting Aggregate Results",
           "How should the query be ordered to display the highest collecting stream first?",
           "ORDER BY SUM(FEES.FeeAmount) DESC",
           ["ORDER BY SUM(FEES.FeeAmount) ASC", "SORT BY Stream DESC", "GROUP BY Stream DESC"],
           "ORDER BY ... DESC sorts output records in descending numerical order."),
    case_q("Database Concepts and SQL", "Foreign Key Deletion Restriction",
           "What happens by default if the administrator attempts to DELETE a row from STUDENT whose AdmNo is present in FEES?",
           "MySQL rejects the deletion and raises a foreign key constraint violation error",
           ["All corresponding fee records in FEES are silently deleted", "The FEES table is permanently dropped", "The student record is deleted and FEES remains unaffected"],
           "By default (RESTRICT / NO ACTION), a parent table row referenced by a foreign key in a child table cannot be deleted.")
]

# ==============================================================================
# MOCK 2 PASSAGES
# ==============================================================================
P1_M2_TXT = (
    "Read the following networking infrastructure case study and answer the questions that follow:\\n\\n"
    "Global Knowledge University is establishing a new campus comprising four main building blocks:\\n"
    "- Admin Block (50 computers)\\n"
    "- Science Block (140 computers)\\n"
    "- Humanities Block (40 computers)\\n"
    "- Central Library (30 computers)\\n\\n"
    "Distances between blocks are as follows:\\n"
    "- Admin to Science: 120 metres\\n"
    "- Admin to Humanities: 60 metres\\n"
    "- Admin to Library: 80 metres\\n"
    "- Science to Humanities: 170 metres\\n"
    "- Science to Library: 150 metres\\n"
    "- Humanities to Library: 90 metres\\n\\n"
    "The network engineering committee must select the optimal location for the central server, the most suitable network topology, "
    "necessary transmission media, and hardware devices to ensure reliable high-speed connectivity."
)
P1_M2_QS = [
    case_q("Computer Networks", "Optimal Server Placement",
           "According to the 80-20 networking rule, in which block should the Central Server be installed?",
           "Science Block, because it houses the maximum number of computers (140 computers)",
           ["Central Library, because it is quiet", "Admin Block, because it handles management", "Humanities Block, because it is smaller"],
           "Placing the server in the block with the largest number of hosts minimizes inter-block network traffic."),
    case_q("Computer Networks", "Optimal Topology Selection",
           "Which network topology is most cost-effective and structurally robust for interconnecting the blocks?",
           "Star or Tree topology centered at the Science Block",
           ["Bus topology along a single 500-metre cable", "Ring topology connecting all blocks in a loop", "Full Mesh topology connecting every block to all others"],
           "Star / Tree topology centered at the main server block provides efficient routing, fault isolation, and minimal cabling."),
    case_q("Computer Networks", "Repeater Placement Requirement",
           "Why is a Repeater required along the cable between the Admin Block and the Science Block (120 metres)?",
           "Because Ethernet signals over twisted pair copper cables attenuate significantly beyond 100 metres",
           ["Because the Admin Block has more computers", "To prevent unauthorized computer access", "To convert digital signals into radio waves"],
           "Unshielded Twisted Pair (UTP) copper Ethernet has a maximum reliable transmission distance of 100m; beyond that, repeaters are needed to amplify signals."),
    case_q("Computer Networks", "Inter-Device Connectivity Hardware",
           "Which networking device should be installed inside each block to connect all individual workstations into a local network?",
           "A Switch (or Hub)",
           ["A Modem", "A Repeater", "A Web Browser"],
           "A Switch connects multiple host devices within a Local Area Network (LAN) block."),
    case_q("Computer Networks", "High-Speed Backbone Transmission Media",
           "Which transmission medium is best suited for interconnecting the campus blocks to provide highest bandwidth and immunity to electromagnetic noise?",
           "Optical Fiber Cable",
           ["Unshielded Twisted Pair (UTP) Category 5", "Coaxial Cable", "Infrared transmission"],
           "Fiber optic cable offers maximum bandwidth, minimal attenuation over long distances, and complete immunity to EMI.")
]

P2_M2_TXT = (
    "Read the following case study on data structures in Python and answer the questions that follow:\\n\\n"
    "Rohan is designing a document editing application in Python. To implement the 'Undo' and 'Redo' operations, "
    "he utilizes a Stack data structure based on the Last-In-First-Out (LIFO) principle. "
    "He implements the stack using a standard Python list named undo_stack = []. "
    "Whenever the user performs an edit action (such as typing text or deleting a character), a descriptor of that action is pushed "
    "onto undo_stack using the append() method. When the user clicks 'Undo', the application checks if the stack is empty. "
    "If undo_stack is empty (i.e., len(undo_stack) == 0), the function outputs 'Underflow: Nothing to Undo'. "
    "Otherwise, it removes and retrieves the topmost operation using undo_stack.pop(), reversing the action and pushing it onto redo_stack."
)
P2_M2_QS = [
    case_q("Data Structures - Stacks", "Stack LIFO Operational Principle",
     "Why is a Stack data structure appropriate for implementing an Undo operation?",
     "Because the most recently executed user action must be the first one to be reversed (LIFO)",
     ["Because actions must be reversed in the exact order they were originally typed (FIFO)", "Because Stacks sort user actions alphabetically", "Because Stacks execute actions in parallel"],
     "Undo requires reversing the most recent operation first, which matches the Last-In-First-Out (LIFO) semantics of a stack."),
    case_q("Data Structures - Stacks", "Python Push Implementation",
     "Which Python list method corresponds directly to the Stack 'push' operation in Rohan's implementation?",
     "undo_stack.append(item)",
     ["undo_stack.insert(0, item)", "undo_stack.extend(item)", "undo_stack.add(item)"],
     "append() appends an element to the end (top) of the list in O(1) amortized time, modeling stack push."),
    case_q("Data Structures - Stacks", "Stack Underflow Condition",
     "What condition triggers a 'Stack Underflow' state in Rohan's Undo mechanism?",
     "Attempting to pop an element when the stack is completely empty (len(undo_stack) == 0)",
     ["Pushing more than 1000 operations", "Closing the document editor", "Typing numbers instead of letters"],
     "Underflow occurs when a pop or peek operation is attempted on an empty stack."),
    case_q("Data Structures - Stacks", "Python Pop Implementation",
     "What does undo_stack.pop() return and do when invoked on a non-empty stack?",
     "Removes and returns the topmost (most recently appended) element of the list",
     ["Deletes the entire stack from memory", "Returns the bottom-most element at index 0 without removing it", "Creates a duplicate copy of the stack"],
     "list.pop() without arguments removes and returns the last element of the list (top of stack)."),
    case_q("Data Structures - Stacks", "Stack Peek / Top Inspection",
     "How can Rohan inspect the topmost action without removing it from undo_stack?",
     "undo_stack[-1]",
     ["undo_stack[0]", "undo_stack.top()", "undo_stack.peek_all()"],
     "In Python lists, index -1 accesses the last appended element without popping it.")
]

# ==============================================================================
# MOCK 3 PASSAGES
# ==============================================================================
P1_M3_TXT = (
    "Read the following case study on healthcare data analytics using Pandas and answer the questions that follow:\\n\\n"
    "Dr. Mehra, a public health researcher, is analyzing healthcare trends across various administrative districts during an epidemic. "
    "She imports a dataset 'district_health.csv' into a Pandas DataFrame named df using df = pd.read_csv('district_health.csv'). "
    "The DataFrame contains columns: ['District', 'ActiveCases', 'Recovered', 'VaccineDoses', 'Hospitals']. "
    "Upon initial inspection via df.info(), she notices missing values (NaN) in the 'VaccineDoses' column. "
    "Dr. Mehra filters for critical districts where ActiveCases exceed 10,000 using boolean indexing: critical_df = df[df['ActiveCases'] > 10000]. "
    "To handle missing data in the general dataset, she imputes the missing 'VaccineDoses' with the district-wide median using "
    "df['VaccineDoses'].fillna(df['VaccineDoses'].median(), inplace=True). "
    "Finally, she computes the recovery rate as a new column: df['RecoveryRate'] = (df['Recovered'] / (df['ActiveCases'] + df['Recovered'])) * 100."
)
P1_M3_QS = [
    case_q("Data Handling using Pandas - II", "Boolean Indexing Syntax",
           "Which statement correctly creates critical_df containing districts with ActiveCases > 10000?",
           "critical_df = df[df['ActiveCases'] > 10000]",
           ["critical_df = df.where('ActiveCases' > 10000)", "critical_df = df['ActiveCases' > 10000]", "critical_df = df.filter(ActiveCases > 10000)"],
           "Boolean indexing in Pandas passes the relational condition inside square brackets: df[df['Col'] > value]."),
    case_q("Data Handling using Pandas - II", "Missing Value Detection",
           "Which command allows Dr. Mehra to count the exact number of missing NaN entries in each column?",
           "df.isna().sum()",
           ["df.count_null()", "df.empty()", "df.isna().all()"],
           "df.isna().sum() computes the sum of True boolean values (null count) for each column."),
    case_q("Data Handling using Pandas - II", "Imputation Strategy via fillna",
           "Why did Dr. Mehra use the median rather than mean to impute missing 'VaccineDoses'?",
           "Because median is robust against extreme outliers and skewed distributions",
           ["Because median is always an integer", "Because Pandas does not support mean()", "Because median doubles the values"],
           "The median is resistant to extreme high or low outlier distortion in skewed demographic data."),
    case_q("Data Handling using Pandas - II", "Vectorized Derived Column Creation",
           "How does Pandas evaluate df['RecoveryRate'] = (df['Recovered'] / (df['ActiveCases'] + df['Recovered'])) * 100?",
           "Element-wise across all corresponding rows simultaneously in a vectorized manner",
           ["By iterating through a slow Python for-loop under the hood", "By executing an external SQL query", "By computing only the first row and copying it"],
           "Pandas evaluates arithmetic expressions between Series in an element-wise, vectorized manner."),
    case_q("Data Handling using Pandas - II", "Inplace Mutation Semantics",
           "What does the argument inplace=True ensure in df['VaccineDoses'].fillna(..., inplace=True)?",
           "It directly mutates the original DataFrame without requiring reassignment",
           ["It creates a temporary copy on disk", "It permanently deletes the column", "It sorts the DataFrame"],
           "inplace=True instructs Pandas to alter the existing object in place rather than returning a new object.")
]

P2_M3_TXT = (
    "Read the following case study on cyber law and security and answer the questions that follow:\\n\\n"
    "An employee at an engineering firm received an urgent email purportedly from the company's Human Resources department, "
    "directing employees to verify their corporate credentials on a linked portal 'www.hrms-portal-verify.com'. "
    "The employee entered their username and domain password. The website was a fraudulent clone engineered by cybercriminals. "
    "Using the exfiltrated credentials, the attackers breached the internal corporate database, extracting proprietary patent drafts. "
    "The corporate forensic team traced the breach by examining the web server's IP access logs (passive digital footprints). "
    "The corporate legal team filed a formal complaint under the Indian Information Technology Act, 2000, citing Section 66 "
    "(Hacking and Computer Related Offences) and Section 66C (Identity Theft and Impersonation)."
)
P2_M3_QS = [
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Cyber Attack Classification",
           "What specific category of cyber attack was used to harvest the employee's login credentials?",
           "Phishing (spear phishing via deceptive email and cloned portal)",
           ["DDoS (Distributed Denial of Service)", "Buffer Overflow", "Ransomware infection"],
           "Phishing uses deceptive spoofed communications to trick victims into divulging sensitive credentials."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Passive Digital Footprint Utility",
           "How did the forensic investigation team discover evidence of the unauthorized entry?",
           "By analyzing web server IP access logs and connection timestamps (passive digital footprints)",
           ["By reading printed newspapers", "By calling the employee on the telephone", "By inspecting social media photos"],
           "Passive digital footprints like server connection logs and IP records track network access history."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Legal Framework in India",
           "Which primary Indian legislation governs legal prosecution and penalization for unauthorized computer access?",
           "Information Technology Act, 2000 (IT Act 2000)",
           ["Copyright Act 1957 only", "Companies Act 2013", "Telecom Regulatory Authority Act"],
           "The Information Technology Act, 2000 is India's principal statute for electronic commerce and cyber offenses."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Identity Theft Provisions",
           "Which section of the IT Act 2000 specifically penalizes identity theft and fraudulent use of another person's password?",
           "Section 66C",
           ["Section 1", "Section 50", "Section 80"],
           "Section 66C of the IT Act 2000 provides punishment for identity theft, including fraudulent use of passwords."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Preventative Security Measure",
           "Which authentication mechanism could have prevented unauthorized access even after the password was compromised?",
           "Multi-Factor Authentication (MFA / 2FA requiring an OTP or hardware token)",
           ["Using an older web browser", "Turning off the computer monitor", "Writing passwords on sticky notes"],
           "MFA requires a second authentication factor (like an OTP or security token), blocking access even if passwords leak.")
]

# ==============================================================================
# MOCK 4 PASSAGES
# ==============================================================================
P1_M4_TXT = (
    "Read the following case study on binary file handling in Python and answer the questions that follow:\\n\\n"
    "Aniket is tasked with creating a customer banking module in Python that writes and reads customer account records "
    "using binary files. Each record is represented as a dictionary: {'AccNo': 101, 'Name': 'Kavita', 'Balance': 45000.0}. "
    "Because dictionaries cannot be written directly to plain text files without converting to strings, Aniket imports "
    "the pickle module. To add records to 'bank.dat', he opens the file in 'ab' (append binary) mode and uses pickle.dump(record, file). "
    "To search for an account, he opens 'bank.dat' in 'rb' (read binary) mode and loads records sequentially inside a while True loop "
    "using pickle.load(file). He catches the EOFError exception to cleanly detect when the end of the binary file has been reached."
)
P1_M4_QS = [
    case_q("File Handling in Python", "Pickling Definition and Role",
     "What is the definition of 'Pickling' (Serialization) in Python?",
     "The process of converting a Python object hierarchy into a byte stream for storage or transmission",
     ["Compressing text files into ZIP format", "Encrypting database passwords", "Compiling Python script into C code"],
     "Pickling (serialization) converts in-memory Python objects (like dicts, lists) into a serialized byte stream."),
    case_q("File Handling in Python", "Binary File Open Mode for Appending",
     "Which file access mode must Aniket use to append new binary records without overwriting existing data?",
     "'ab' (append binary)",
     ["'w' (write text)", "'rb' (read binary)", "'wb' (write binary)"],
     "'ab' opens binary files in append mode, placing the file pointer at the end of the file."),
    case_q("File Handling in Python", "Deserialization Function",
     "Which function from the pickle module deserializes a byte stream back into a live Python object?",
     "pickle.load(file_object)",
     ["pickle.dump(file_object)", "pickle.read(file_object)", "pickle.unpack(file_object)"],
     "pickle.load() reconstructs a Python object from an open binary file stream."),
    case_q("File Handling in Python", "End of Binary File Detection",
     "Which built-in exception signals that pickle.load() has reached the end of a binary file?",
     "EOFError",
     ["IOError", "ValueError", "StopIteration"],
     "pickle.load() raises an EOFError (End Of File Error) when attempting to read past the end of the file."),
    case_q("File Handling in Python", "Updating Records in Binary Files",
     "When updating an existing record in place within a binary file, which method changes the file pointer position?",
     "file.seek(offset, from_what)",
     ["file.tell()", "file.move()", "file.jump()"],
     "seek() repositions the file read/write pointer to a specified byte offset.")
]

P2_M4_TXT = (
    "Read the following database administration case study and answer the questions that follow:\\n\\n"
    "An online retail store manages transactions via an enterprise MySQL database with tables CUSTOMER and ORDERS:\\n"
    "1. Table CUSTOMER (CustId INT PRIMARY KEY, CustName VARCHAR(40), City VARCHAR(25), Rating INT);\\n"
    "2. Table ORDERS (OrderId INT PRIMARY KEY, OrderDate DATE, CustId INT, Amount DECIMAL(10,2), "
    "FOREIGN KEY (CustId) REFERENCES CUSTOMER(CustId));\\n\\n"
    "The marketing team wants to analyze purchasing patterns. They require a query that lists each customer's name, their city, "
    "and the total value of orders placed. The output must include only customers whose cumulative purchase amount exceeds 50,000, "
    "sorted in descending order of total expenditure. The database administrator writes a query utilizing an equi-join, "
    "GROUP BY, and HAVING clauses."
)
P2_M4_QS = [
    case_q("Database Concepts and SQL", "Multi-table Join Mechanism",
           "How are CUSTOMER and ORDERS joined to match orders with their respective customer details?",
           "SELECT C.CustName, C.City, SUM(O.Amount) FROM CUSTOMER C, ORDERS O WHERE C.CustId = O.CustId ...",
           ["SELECT * FROM CUSTOMER C UNION SELECT * FROM ORDERS O", "SELECT C.CustName FROM CUSTOMER C WHERE C.CustId IN (SELECT City FROM ORDERS)", "SELECT C.CustName FROM CUSTOMER C NATURAL JOIN ORDERS O ON C.Rating = O.Amount"],
           "Joining on matching primary-foreign key pairs (C.CustId = O.CustId) correctly associates customers with their orders."),
    case_q("Database Concepts and SQL", "Grouping Columns Selection",
           "Which columns must appear in the GROUP BY clause to aggregate order amounts per customer?",
           "GROUP BY C.CustId, C.CustName, C.City",
           ["GROUP BY O.Amount", "GROUP BY O.OrderDate", "GROUP BY C.Rating"],
           "All non-aggregated columns appearing in the SELECT list must be included in the GROUP BY clause."),
    case_q("Database Concepts and SQL", "Aggregate Threshold Filtering",
           "Which clause filters for customers whose total spend exceeds 50,000?",
           "HAVING SUM(O.Amount) > 50000",
           ["WHERE SUM(O.Amount) > 50000", "WHERE O.Amount > 50000", "HAVING O.Amount > 50000"],
           "Conditions on aggregated group values (SUM, AVG, COUNT) must be specified using HAVING, not WHERE."),
    case_q("Database Concepts and SQL", "Ordering by Aggregate Calculation",
           "Which clause orders the resulting customer report by highest spending first?",
           "ORDER BY SUM(O.Amount) DESC",
           ["ORDER BY C.CustName ASC", "ORDER BY SUM(O.Amount) ASC", "SORT BY Amount DESC"],
           "ORDER BY SUM(O.Amount) DESC sorts the output records in descending order of total purchase value."),
    case_q("Database Concepts and SQL", "Degree and Cardinality Concept",
           "If CUSTOMER has 5 columns and 100 rows, and ORDERS has 4 columns and 500 rows, what is the Degree of their Cartesian Product?",
           "9 (5 + 4 columns)",
           ["20 (5 * 4 columns)", "50,000 columns", "1 column"],
           "The Degree of a Cartesian product (relation multiplication) is the sum of degrees: 5 + 4 = 9.")
]

# ==============================================================================
# MOCK 5 PASSAGES
# ==============================================================================
P1_M5_TXT = (
    "Read the following data visualization case study and answer the questions that follow:\\n\\n"
    "Priya, a business intelligence analyst, is preparing an executive performance dashboard using matplotlib.pyplot. "
    "She has quarterly revenue and profit data for four quarters: ['Q1', 'Q2', 'Q3', 'Q4']. "
    "Revenue figures (in lakhs) are [45, 58, 62, 75], and profit figures are [12, 18, 22, 28]. "
    "To compare revenue and profit side-by-side without overlap, she constructs a grouped bar chart. "
    "She generates numerical positions using x = np.arange(len(quarters)), sets bar width w = 0.35, "
    "and plots revenue bars at x - w/2 and profit bars at x + w/2. "
    "She sets custom x-axis tick labels using plt.xticks(x, quarters), adds labels for both axes, "
    "attaches a descriptive title, activates the legend via plt.legend(), and exports the chart using plt.savefig('sales_dashboard.png')."
)
P1_M5_QS = [
    case_q("Data Visualization using Pyplot", "Offsetting Grouped Bars",
           "Why did Priya plot the two series at x - w/2 and x + w/2 instead of simply x?",
           "To position the revenue and profit bars side-by-side without overlapping each other",
           ["To make the bars twice as tall", "To convert vertical bars into horizontal bars", "To delete zero values"],
           "Shifting x coordinates by half the bar width offsets bars symmetrically around each category tick, preventing overlap."),
    case_q("Data Visualization using Pyplot", "Tick Label Assignment",
           "Which Pyplot function replaces numerical x-coordinates with the quarterly category names ['Q1', 'Q2', 'Q3', 'Q4']?",
           "plt.xticks(x, quarters)",
           ["plt.xlabel(quarters)", "plt.set_x_labels(quarters)", "plt.yticks(quarters)"],
           "plt.xticks(ticks, labels) specifies the tick positions and corresponding string labels on the X-axis."),
    case_q("Data Visualization using Pyplot", "Legend Activation Prerequisite",
           "What parameter must be included in each plt.bar() call for plt.legend() to display series names correctly?",
           "label='Revenue' and label='Profit'",
           ["title='Revenue'", "name='Revenue'", "legend='Revenue'"],
           "plt.legend() reads the label keyword argument supplied during individual plot calls."),
    case_q("Data Visualization using Pyplot", "Execution Order of savefig and show",
           "Why did Priya call plt.savefig('sales_dashboard.png') before plt.show()?",
           "Because plt.show() flushes the figure canvas, which could cause a subsequent savefig() to save a blank image",
           ["Because savefig() only works after the program terminates", "Because Python deletes the image if show() is called first", "Because savefig() opens a new window"],
           "Calling plt.show() resets the current figure canvas in interactive backends; savefig() should precede show()."),
    case_q("Data Visualization using Pyplot", "Horizontal Bar Alternative",
           "If Priya wanted to render the bars horizontally instead of vertically, which Pyplot function should she use?",
           "plt.barh()",
           ["plt.hbar()", "plt.horizontal_bar()", "plt.bar(orientation='h')"],
           "plt.barh() renders horizontal bar charts in Pyplot.")
]

P2_M5_TXT = (
    "Read the following algorithmic sorting case study and answer the questions that follow:\\n\\n"
    "A triage nurse in a hospital emergency department records patient priority triage codes (values from 1 to 5, where 1 is critical). "
    "To organize incoming patient files in memory, a software engineer implements two classic sorting algorithms: Bubble Sort and Insertion Sort. "
    "In Bubble Sort, adjacent elements are compared and swapped if they are in the wrong order. With each complete pass, the largest remaining "
    "element bubbles up to its final position at the end of the array. For an array of n elements, Bubble Sort requires at most n - 1 passes. "
    "In Insertion Sort, the array is conceptually partitioned into a sorted sublist and an unsorted sublist. Elements from the unsorted sublist "
    "are picked one by one and inserted into their correct relative position within the sorted sublist by shifting greater elements to the right."
)
P2_M5_QS = [
    case_q("Algorithmic Sorting and Efficiency", "Bubble Sort Core Mechanism",
           "What is the foundational comparison mechanism of Bubble Sort during each pass?",
           "Comparing adjacent elements (L[j] and L[j+1]) and swapping them if out of order",
           ["Finding the minimum element and swapping it with index 0", "Dividing the array into two halves recursively", "Hashing keys into a hash table"],
           "Bubble Sort repeatedly compares adjacent elements and swaps them if L[j] > L[j+1]."),
    case_q("Algorithmic Sorting and Efficiency", "Bubble Sort Number of Passes",
           "For an unsorted list of 8 patient triage codes, what is the maximum number of passes required by Bubble Sort?",
           "7 passes (n - 1)",
           ["8 passes", "16 passes", "64 passes"],
           "Bubble Sort requires at most n - 1 passes to sort an array of size n (8 - 1 = 7)."),
    case_q("Algorithmic Sorting and Efficiency", "Insertion Sort Operation",
           "How does Insertion Sort integrate an element from the unsorted sublist into the sorted sublist?",
           "By shifting elements greater than the key to the right and inserting the key into its correct vacant spot",
           ["By swapping with the last element of the list", "By deleting all duplicates", "By reversing the sorted sublist"],
           "Insertion Sort shifts greater elements in the sorted portion one position to the right to make room for the current key."),
    case_q("Algorithmic Sorting and Efficiency", "Best-case Time Complexity",
           "What is the best-case time complexity of Insertion Sort when the input list is already completely sorted?",
           "O(n) linear time",
           ["O(n^2) quadratic time", "O(log n) logarithmic time", "O(n log n)"],
           "When already sorted, Insertion Sort makes only 1 comparison per element and 0 shifts, achieving O(n) time."),
    case_q("Algorithmic Sorting and Efficiency", "Worst-case Time Complexity",
           "What is the worst-case time complexity of both Bubble Sort and Insertion Sort on a reverse-sorted array?",
           "O(n^2) quadratic time",
           ["O(n)", "O(log n)", "O(1)"],
           "Both algorithms require O(n^2) comparisons and swaps/shifts when the array is sorted in reverse order.")
]

# ==============================================================================
# MOCK 6 PASSAGES
# ==============================================================================
P1_M6_TXT = (
    "Read the following networking protocols case study and answer the questions that follow:\\n\\n"
    "An e-commerce enterprise maintains a web application deployed across cloud servers. "
    "When a consumer accesses the store, several network protocols cooperate across the TCP/IP protocol suite:\\n"
    "1. The consumer types 'www.shopfast.co.in' into their browser, prompting the Domain Name System (DNS) to resolve the human-readable "
    "domain name into an IP address (e.g., 203.0.113.45).\\n"
    "2. The client establishes a secure, encrypted communication channel using HTTPS, which runs HTTP over Transport Layer Security (TLS/SSL), "
    "securing payment card transactions on port 443.\\n"
    "3. Below the application layer, Transmission Control Protocol (TCP) breaks messages into packets, manages sequence numbers, "
    "and guarantees reliable, connection-oriented data delivery via a three-way handshake.\\n"
    "4. Transactional confirmation emails are dispatched using Simple Mail Transfer Protocol (SMTP), while consumers retrieve order emails "
    "using POP3 or IMAP."
)
P1_M6_QS = [
    case_q("Computer Networks", "DNS Resolution Function",
           "What is the primary function of the Domain Name System (DNS) protocol in this architecture?",
           "Translating human-readable domain names (e.g., www.shopfast.co.in) into machine-readable IP addresses",
           ["Encrypting user passwords", "Compressing image files", "Assigning MAC addresses to network cards"],
           "DNS acts as the internet's phonebook, mapping domain names to IP addresses."),
    case_q("Computer Networks", "HTTP vs HTTPS Security",
           "Why does the e-commerce store utilize HTTPS instead of unencrypted HTTP for customer transactions?",
           "HTTPS encrypts communication over TLS/SSL on port 443, preventing eavesdropping and tampering of sensitive payment data",
           ["HTTPS is free whereas HTTP requires monthly subscription", "HTTPS bypasses all router firewalls", "HTTPS loads images in lower resolution"],
           "HTTPS secures web communications with cryptographic encryption, ensuring confidentiality and integrity."),
    case_q("Computer Networks", "TCP Connection Semantics",
           "Which characteristic distinguishes TCP from UDP at the Transport Layer?",
           "TCP is connection-oriented and guarantees reliable, ordered packet delivery with acknowledgments and retransmissions",
           ["TCP is connectionless and does not check for packet loss", "TCP is used only for real-time video streaming", "TCP operates at the physical cable layer"],
           "TCP establishes a connection via a three-way handshake and guarantees reliable, in-order packet delivery."),
    case_q("Computer Networks", "Email Transmission Protocol",
           "Which protocol is used by the application server to push outgoing confirmation emails across the internet?",
           "SMTP (Simple Mail Transfer Protocol)",
           ["POP3", "IMAP", "FTP"],
           "SMTP is the standard protocol for sending/pushing mail messages between servers across the internet."),
    case_q("Computer Networks", "Email Retrieval Protocol Distinction",
           "What is the operational difference between IMAP and POP3 for email retrieval?",
           "IMAP synchronizes emails across multiple devices directly on the mail server, while POP3 typically downloads and deletes emails locally",
           ["IMAP cannot receive attachments", "POP3 requires an optical fiber connection", "IMAP works only on Linux servers"],
           "IMAP keeps mail on the server and synchronizes state across multiple clients; POP3 downloads messages locally to a single device.")
]

P2_M6_TXT = (
    "Read the following Python-MySQL connectivity case study and answer the questions that follow:\\n\\n"
    "A software developer is writing a Python script to automate employee bonus updates in a MySQL database. "
    "She imports mysql.connector and establishes a database connection using con = mysql.connector.connect(host='localhost', "
    "user='root', password='mypassword', database='company_db'). "
    "She instantiates a database cursor: cur = con.cursor(). "
    "To prevent SQL Injection vulnerabilities, she utilizes parameterized queries with %s placeholders: "
    "query = 'UPDATE EMP SET Bonus = %s WHERE DeptNo = %s'\\n"
    "cur.execute(query, (5000, 10))\\n"
    "Because UPDATE is a Data Manipulation Language (DML) statement, she must invoke con.commit() to make the changes permanent. "
    "To verify the update, she executes a SELECT statement and uses cur.fetchall() to retrieve all matching rows as a list of tuples."
)
P2_M6_QS = [
    case_q("Database Connectivity using Python", "Database Connection Function",
           "Which method from mysql.connector establishes the network socket connection to the MySQL database engine?",
           "mysql.connector.connect(...)",
           ["mysql.connector.open(...)", "mysql.connector.link(...)", "mysql.connector.start(...)"],
           "mysql.connector.connect() initiates the connection to MySQL server using host, user, password, and database parameters."),
    case_q("Database Connectivity using Python", "Cursor Object Role",
           "What is the role of the cursor object created via con.cursor() in Python database programming?",
           "It provides an execution workspace to send SQL queries to the server and fetch resulting rows",
           ["It closes the network connection permanently", "It backups the database to a text file", "It restarts the MySQL server service"],
           "A cursor executes SQL statements and acts as an iterator for fetching query result sets."),
    case_q("Database Connectivity using Python", "SQL Injection Protection via Parameterization",
           "Why did the developer use %s placeholders with a tuple parameter rather than string formatting (e.g. f-strings)?",
           "To prevent SQL Injection attacks and safely escape malicious user input",
           ["Because MySQL does not support numbers in SQL queries", "Because %s doubles execution speed", "Because string formatting causes syntax errors in Python 3"],
           "Parameterized queries separate SQL code from user data, preventing SQL injection vulnerabilities."),
    case_q("Database Connectivity using Python", "Transaction Permanence via commit()",
           "Why is con.commit() mandatory after executing INSERT, UPDATE, or DELETE statements?",
           "To commit the current transaction, saving the data modifications permanently to the database disk",
           ["To roll back the database to its previous state", "To clear the memory cache", "To close the cursor"],
           "In MySQL connector, transactions are active by default; DML changes must be explicitly committed via con.commit()."),
    case_q("Database Connectivity using Python", "Fetching All Rows via fetchall()",
           "What data structure is returned by cur.fetchall() after executing a SELECT query?",
           "A list of tuples, where each tuple represents a single row of data",
           ["A single concatenated string", "A dictionary of column names", "A Pandas DataFrame directly"],
           "cur.fetchall() returns all remaining rows of a query result set as a list of tuples.")
]

# ==============================================================================
# MOCK 7 PASSAGES
# ==============================================================================
P1_M7_TXT = (
    "Read the following case study on recursion in Python and answer the questions that follow:\\n\\n"
    "Deepak is implementing algorithmic simulations for mathematical models in Python. "
    "He develops a recursive function to compute the power of a number: def power(x, n):\\n"
    "    if n == 0:\\n"
    "        return 1\\n"
    "    else:\\n"
    "        return x * power(x, n - 1)\\n\\n"
    "When computing power(2, 3), Python allocates an activation record (stack frame) on the system call stack for each call: "
    "power(2, 3) calls power(2, 2), which calls power(2, 1), which calls power(2, 0). "
    "Upon reaching n == 0, the base case executes without making another recursive call, returning 1. "
    "The call stack then unwinds in Last-In-First-Out (LIFO) order: power(2, 1) computes 2 * 1 = 2; power(2, 2) computes 2 * 2 = 4; "
    "and power(2, 3) computes 2 * 4 = 8, returning the final result to the caller."
)
P1_M7_QS = [
    case_q("Python Recursion and Algorithmic Tracing", "Base Case Functional Role",
           "What vital role does the condition if n == 0: return 1 perform in Deepak's power function?",
           "It serves as the base case that stops recursion and prevents infinite recursive calls",
           ["It multiplies the number by zero", "It clears the memory call stack", "It prints the result to console"],
           "The base case provides the termination condition that halts recursion without making further recursive calls."),
    case_q("Python Recursion and Algorithmic Tracing", "Call Stack Frame Allocation",
           "What happens internally in memory each time power(x, n - 1) is invoked?",
           "A new stack frame containing local variables and return address is pushed onto the system call stack",
           ["All previous function variables are erased", "A new file is created on the hard drive", "Python restarts the operating system"],
           "Each recursive function invocation pushes a new activation frame onto the call stack."),
    case_q("Python Recursion and Algorithmic Tracing", "Stack Unwinding Order",
           "In what operational order are recursive activation records resolved and popped from the call stack during unwinding?",
           "Last-In, First-Out (LIFO) order",
           ["First-In, First-Out (FIFO) order", "Random alphabetical order", "Priority Queue order"],
           "The call stack operates strictly on Last-In, First-Out (LIFO) principles during invocation and unwinding."),
    case_q("Python Recursion and Algorithmic Tracing", "Missing Base Case Error",
           "What runtime exception is thrown if Deepak accidentally removes the base case from his recursive function?",
           "RecursionError: maximum recursion depth exceeded",
           ["ZeroDivisionError", "TypeError", "SyntaxError"],
           "Unbounded recursion continues pushing frames until Python hits its recursion limit, raising RecursionError."),
    case_q("Python Recursion and Algorithmic Tracing", "Divide and Conquer Optimization",
           "How can Deepak optimize power(x, n) from O(n) to O(log n) time using divide-and-conquer recursion?",
           "By computing half = power(x, n // 2) and returning half * half for even n, and x * half * half for odd n",
           ["By replacing multiplication with addition", "By using a while loop inside the function", "By setting recursion limit to 100"],
           "Binary exponentiation computes power(x, n // 2) once and squares it, reducing complexity to O(log n).")
]

P2_M7_TXT = (
    "Read the following case study on e-waste and green computing and answer the questions that follow:\\n\\n"
    "GreenTech Municipal Corporation conducted an environmental audit across city schools and corporate tech parks. "
    "The audit revealed that over 15 tonnes of obsolete personal computers, CRT monitors, lithium batteries, and circuit boards "
    "were being discarded directly into unlined municipal landfills or sold to informal scrapyards. "
    "Informal scrap workers extracted copper and gold by burning printed circuit boards in open fires and soaking components in acid baths, "
    "releasing toxic fumes into dense neighborhoods. "
    "The municipal committee instituted the E-Waste (Management) Rules, mandating Extended Producer Responsibility (EPR) on electronics "
    "manufacturers and establishing authorized e-waste collection centers with certified, eco-friendly dismantling and recycling protocols."
)
P2_M7_QS = [
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Informal E-waste Recycling Hazards",
           "Why is open-air burning and acid leaching of circuit boards in informal scrapyards extremely hazardous?",
           "It releases neurotoxic heavy metals (lead, mercury, cadmium) and carcinogenic dioxins into the atmosphere and soil",
           ["It destroys valuable iron scrap", "It uses too much tap water", "It causes minor noise pollution only"],
           "Informal burning and acid extraction of e-waste releases toxic heavy metals and deadly halogenated dioxins."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Extended Producer Responsibility (EPR)",
           "What does the concept of Extended Producer Responsibility (EPR) require under e-waste regulations?",
           "Electronics manufacturers are legally responsible for financing and managing the channelization and recycling of end-of-life products",
           ["Consumers must return laptops within 30 days of purchase", "Schools are prohibited from buying computers", "All electronic components must be made of glass"],
           "EPR places statutory responsibility on producers to collect, channel, and recycle their post-consumer electronic waste."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Hazardous E-waste Substances",
           "Which hazardous heavy metal, commonly found in cathode ray tube (CRT) monitor glass and solder, causes neurological damage?",
           "Lead (Pb)",
           ["Gold (Au)", "Silicon (Si)", "Carbon (C)"],
           "Lead in CRT funnel glass and older solder alloys is a potent neurotoxin that bioaccumulates in human tissues."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Green Computing Best Practices",
           "Which practice embodies the philosophy of 'Green Computing' in institutional technology management?",
           "Purchasing energy-efficient (ENERGY STAR) equipment, refurbishing aging hardware, and powering down idle servers",
           ["Replacing all laptops every 6 months", "Leaving servers running at maximum power 24/7", "Dumping old monitors in rivers"],
           "Green computing minimizes environmental impact through energy-efficient hardware, longevity, and proper recycling."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Data Sanitization Prior to E-waste Disposal",
           "What crucial security procedure must be performed on hard disk drives prior to handing them over for e-waste recycling?",
           "Cryptographic data wiping or physical degaussing/shredding to prevent data breach and identity theft",
           ["Deleting files and emptying the desktop Recycle Bin only", "Painting the drive case black", "Formatting with quick format once"],
           "Simple deletion or quick format leaves data recoverable; military-grade wiping or physical degaussing/shredding is mandatory.")
]

# ==============================================================================
# MOCK 8 PASSAGES
# ==============================================================================
P1_M8_TXT = (
    "Read the following case study on meteorological data processing using Pandas Series and answer the questions that follow:\\n\\n"
    "The State Meteorological Department analyzes daily maximum temperatures recorded in New Delhi over a week in June. "
    "A data scientist creates a Pandas Series named temps using:\\n"
    "days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']\\n"
    "readings = [41.2, 43.5, 45.0, 44.2, 46.8, 42.1, 40.5]\\n"
    "temps = pd.Series(data=readings, index=days)\\n\\n"
    "The scientist performs exploratory operations on temps:\\n"
    "1. Vectorized temperature conversion to Fahrenheit: fahrenheit = (temps * 9/5) + 32\\n"
    "2. Filtering extreme heatwave days: heatwave = temps[temps >= 44.0]\\n"
    "3. Slicing weekday readings using label slicing: weekdays = temps['Mon':'Fri']\\n"
    "4. Descriptive aggregation: mean_temp = temps.mean() and peak_day = temps.idxmax()"
)
P1_M8_QS = [
    case_q("Data Handling using Pandas - I", "Series Index-Data Alignment",
           "What is the label index associated with the temperature reading 46.8 in the temps Series?",
           "'Fri'",
           ["'Mon'", "'Thu'", "4"],
           "readings[4] = 46.8 aligns with days[4] = 'Fri'."),
    case_q("Data Handling using Pandas - I", "Vectorized Scalar Math",
           "How does Python evaluate fahrenheit = (temps * 9/5) + 32?",
           "Multiplies every element in the Series by 9/5 and adds 32 simultaneously without explicit loops",
           ["Applies the formula only to the first element", "Raises an error because arithmetic on Series requires a loop", "Concatenates 32 to the end of the Series"],
           "Pandas Series operations are vectorized, applying scalar arithmetic element-wise across all values."),
    case_q("Data Handling using Pandas - I", "Label-based Series Slicing",
           "Which days are included in the slice weekdays = temps['Mon':'Fri']?",
           "Mon, Tue, Wed, Thu, and Fri (both endpoints included)",
           ["Mon, Tue, Wed, and Thu (Fri is excluded)", "Only Mon and Fri", "All 7 days"],
           "Label-based slicing in Pandas (unlike integer positional slicing) includes both start and stop label endpoints."),
    case_q("Data Handling using Pandas - I", "Index of Maximum Observation",
           "What value is returned by the expression temps.idxmax()?",
           "'Fri' (the index label corresponding to the maximum temperature 46.8)",
           ["46.8", "4", "'Sun'"],
           "idxmax() returns the index label corresponding to the maximum value in the Series."),
    case_q("Data Handling using Pandas - I", "Boolean Mask Count",
           "How many days are captured in heatwave = temps[temps >= 44.0]?",
           "3 days (Wed: 45.0, Thu: 44.2, Fri: 46.8)",
           ["1 day", "5 days", "7 days"],
           "Readings >= 44.0 are 45.0 (Wed), 44.2 (Thu), and 46.8 (Fri)—exactly 3 elements.")
]

P2_M8_TXT = (
    "Read the following case study on intellectual property, open source software, and cyber ethics and answer the questions that follow:\\n\\n"
    "Karan, a computer science undergraduate, develops a machine learning library for Indian language translation. "
    "He incorporates open source code components from an existing repository distributed under the GNU General Public License (GPL v3). "
    "Karan considers whether to release his software under a proprietary closed-source commercial license or an open source license. "
    "His mentor advises him about Intellectual Property Rights (IPR):\\n"
    "1. Under GPL v3's copyleft clause, any derivative work that incorporates GPL code must also be licensed under GPL v3 if distributed.\\n"
    "2. Software source code is protected under Copyright Law as a literary work.\\n"
    "3. Unique novel algorithmic hardware designs may be eligible for Patents, while brand names and logos are protected by Trademarks.\\n"
    "4. Plagiarizing source code without attribution violates academic integrity and copyright law."
)
P2_M8_QS = [
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "GPL Copyleft Requirement",
           "Why cannot Karan distribute his software as a closed-source proprietary commercial product?",
           "Because the GNU General Public License (GPL v3) has a copyleft clause requiring derivative works to remain open source under GPL",
           ["Because Indian law bans selling any software", "Because open source software cannot run on commercial laptops", "Because GitHub forbids proprietary software"],
           "The GPL 'copyleft' clause mandates that any derivative software distributed to others must also provide open source code under GPL."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Copyright Protection Scope",
           "Under Indian Intellectual Property law, under which category is computer software source code protected?",
           "Copyright as a Literary Work",
           ["Patent as a Mechanical Machine", "Trademark as a Commercial Logo", "Trade Secret only"],
           "Under the Indian Copyright Act, 1957, computer software programs and source code are protected as literary works."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Patent vs Trademark Distinction",
           "What is the functional difference between a Trademark and a Patent?",
           "A Trademark protects brand names, logos, and symbols; a Patent protects novel, useful technical inventions and processes",
           ["A Trademark expires after 1 year while a Patent lasts forever", "A Trademark is for hardware and a Patent is for movies", "There is no difference"],
           "Trademarks protect commercial identity (brand names, logos); Patents grant temporary monopolies for novel technical inventions."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Open Source Software Attributes",
           "Which of the following is a defining characteristic of Free and Open Source Software (FOSS)?",
           "Users have the freedom to access, inspect, modify, and redistribute the underlying source code",
           ["The software can only run for 30 trial days", "The source code is encrypted with a secret password", "The software cannot be downloaded over the internet"],
           "FOSS grants users the four essential freedoms: to run, study, modify, and redistribute the source code."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Plagiarism in Software Development",
           "What constitutes software plagiarism in academic and corporate development?",
           "Copying someone else's source code or architecture and presenting it as one's own original creation without proper citation or license adherence",
           ["Reading official programming language documentation", "Writing comments inside Python scripts", "Importing the standard Python math library"],
           "Plagiarism involves claiming someone else's intellectual creation as one's own without appropriate attribution.")
]

# ==============================================================================
# MOCK 9 PASSAGES
# ==============================================================================
P1_M9_TXT = (
    "Read the following case study on text log analysis in Python and answer the questions that follow:\\n\\n"
    "A cloud system reliability engineer writes a Python diagnostic utility to analyze server events from 'server_log.txt'. "
    "The log file contains thousands of lines formatted as: '2026-03-31 14:22:01 [ERROR] Database connection failed on port 3306'. "
    "The engineer defines a function parse_logs() that:\\n"
    "1. Opens the file using with open('server_log.txt', 'r') as file:\\n"
    "2. Reads all lines using lines = file.readlines()\\n"
    "3. Counts total lines, lines starting with timestamps, and error entries containing '[ERROR]'\\n"
    "4. Splits each error line into individual words using line.split() to compute frequency statistics of error codes.\\n"
    "The script summarizes critical system failures without loading the entire unneeded raw payload into memory all at once."
)
P1_M9_QS = [
    case_q("File Handling in Python", "readlines() Return Value",
           "What data structure does file.readlines() return in Python?",
           "A list of strings, where each string represents a single line from the file including the newline '\\\\n'",
           ["A single concatenated string containing all text", "A dictionary indexed by line numbers", "A binary byte buffer"],
           "readlines() reads all remaining lines from the file and returns them as a list of strings."),
    case_q("File Handling in Python", "Line Filtering via Substring Check",
           "Which Python expression checks whether a log string line represents an error event?",
           "if '[ERROR]' in line:",
           ["if line.has('[ERROR]'):", "if line == '[ERROR]':", "if '[ERROR]' in line.split():"],
           "The 'in' operator tests whether the substring '[ERROR]' is present within the string line."),
    case_q("File Handling in Python", "String Tokenization via split()",
           "What does line.split() produce when invoked on a log line without arguments?",
           "A list of words/tokens separated by arbitrary whitespace (spaces, tabs, newlines)",
           ["A list of individual characters", "A single integer representing word count", "A tuple containing only the first word"],
           "str.split() splits a string by whitespace delimiters, returning a list of words."),
    case_q("File Handling in Python", "Memory-Efficient Line Iteration",
           "For massive multi-gigabyte log files, why is 'for line in file:' superior to 'file.readlines()'?",
           "It iterates lazily line-by-line via a file generator, consuming minimal RAM instead of loading all lines into memory at once",
           ["It automatically corrects spelling mistakes", "It translates text into Python code", "It prevents file modification"],
           "Iterating over the file object directly streams one line at a time, avoiding memory exhaustion on large files."),
    case_q("File Handling in Python", "File Pointer Position Check",
           "Which method returns the current byte offset position of the read/write pointer in an open file?",
           "file.tell()",
           ["file.seek()", "file.pos()", "file.pointer()"],
           "file.tell() returns an integer representing the current byte offset position of the file pointer.")
]

P2_M9_TXT = (
    "Read the following database payroll case study and answer the questions that follow:\\n\\n"
    "An enterprise human resources department manages employee salaries and tenure in a MySQL database table EMP:\\n"
    "EMP (EmpId INT PRIMARY KEY, EmpName VARCHAR(35), HireDate DATE, BasicSalary DECIMAL(10,2), Comm DECIMAL(8,2), DeptNo INT);\\n\\n"
    "To prepare annual financial statements, the payroll manager executes several queries utilizing SQL scalar and date functions:\\n"
    "1. Query 1 computes employee tenure in years: SELECT EmpName, YEAR(CURDATE()) - YEAR(HireDate) AS Tenure FROM EMP;\\n"
    "2. Query 2 rounds annual bonuses to two decimal places: SELECT EmpName, ROUND(BasicSalary * 0.175, 2) AS Bonus FROM EMP;\\n"
    "3. Query 3 extracts the month name of employment: SELECT EmpName, MONTHNAME(HireDate) FROM EMP;\\n"
    "4. Query 4 handles null commissions using IFNULL: SELECT EmpName, BasicSalary + IFNULL(Comm, 0) AS GrossPay FROM EMP;"
)
P2_M9_QS = [
    case_q("Database Concepts and SQL", "Date Component Extraction via YEAR()",
           "How does Query 1 calculate employee tenure in years?",
           "By subtracting the 4-digit year of HireDate from the 4-digit year of the current date obtained via CURDATE()",
           ["By dividing total days by 365.25 using a complex while loop", "By counting rows in the EMP table", "By executing an external Python script"],
           "YEAR(CURDATE()) extracts the current year, and YEAR(HireDate) extracts the hire year; their difference yields tenure."),
    case_q("Database Concepts and SQL", "SQL ROUND() Function Operation",
           "What is the evaluated output of SELECT ROUND(4567.846, 2);?",
           "4567.85",
           ["4567.84", "4568.00", "4570.00"],
           "ROUND(val, 2) rounds to two decimal places: since the 3rd decimal is 6 (>= 5), the second decimal rounds up to 5."),
    case_q("Database Concepts and SQL", "SQL MONTHNAME() Return Value",
           "If an employee's HireDate is '2021-08-15', what does MONTHNAME(HireDate) return?",
           "'August'",
           ["8", "'08'", "'Aug'"],
           "MONTHNAME() returns the full English name of the month ('August')."),
    case_q("Database Concepts and SQL", "Handling NULL in Arithmetic via IFNULL()",
           "Why is IFNULL(Comm, 0) necessary when computing BasicSalary + Comm in MySQL?",
           "Because adding NULL to any number in standard SQL yields NULL, erasing the salary if Comm is not recorded",
           ["Because MySQL throws a fatal error if NULL is added", "Because IFNULL doubles the commission", "Because Comm is stored as text"],
           "In SQL arithmetic, any_number + NULL evaluates to NULL; IFNULL(Comm, 0) substitutes 0 for NULL to preserve the total."),
    case_q("Database Concepts and SQL", "Current Timestamp Function",
           "Which SQL function returns both the current system date and current time together in 'YYYY-MM-DD HH:MM:SS' format?",
           "NOW() (or CURRENT_TIMESTAMP())",
           ["CURDATE()", "CURTIME()", "TIME()"],
           "NOW() returns the complete timestamp including current date and time.")
]

# ==============================================================================
# MOCK 10 PASSAGES
# ==============================================================================
P1_M10_TXT = (
    "Read the following case study on survey data cleaning using Pandas and answer the questions that follow:\\n\\n"
    "An educational research group conducts an online learning survey across 500 high school students. "
    "The survey responses are imported into a DataFrame survey_df containing columns: "
    "['StudentID', 'StudyHours', 'DeviceType', 'InternetSpeed', 'ExamScore'].\\n\\n"
    "The lead analyst identifies several data quality issues:\\n"
    "1. Incomplete records: Some students abandoned the survey halfway, leaving multiple columns null.\\n"
    "2. Duplicate submissions: Some students accidentally clicked 'Submit' twice, generating identical duplicate rows.\\n"
    "3. Missing numerical values: ExamScore has 15 missing values (NaN).\\n\\n"
    "The analyst executes a structured data cleaning pipeline:\\n"
    "- Drops duplicate rows: survey_df.drop_duplicates(inplace=True)\\n"
    "- Drops rows that have fewer than 3 valid non-null answers: survey_df.dropna(thresh=3, inplace=True)\\n"
    "- Imputes missing ExamScore with the mean exam score: survey_df['ExamScore'].fillna(survey_df['ExamScore'].mean(), inplace=True)\\n"
    "- Resets the index: survey_df.reset_index(drop=True, inplace=True)"
)
P1_M10_QS = [
    case_q("Data Handling using Pandas - II", "Duplicate Row Removal",
           "What does survey_df.drop_duplicates(inplace=True) accomplish?",
           "Identifies and eliminates identical duplicate rows across all columns, retaining the first occurrence in place",
           ["Deletes all rows containing duplicate student names", "Deletes all columns that have duplicate headers", "Replaces duplicate values with 0"],
           "drop_duplicates() eliminates redundant identical rows across the DataFrame."),
    case_q("Data Handling using Pandas - II", "dropna thresh Parameter Mechanics",
           "What is the operational effect of survey_df.dropna(thresh=3, inplace=True)?",
           "Retains only rows that contain at least 3 valid non-null values, dropping rows with more than 2 nulls",
           ["Drops the first 3 rows of the survey", "Drops rows that have exactly 3 null values", "Keeps only the top 3 columns"],
           "thresh=3 specifies a minimum threshold of 3 non-null values required for a row to be kept."),
    case_q("Data Handling using Pandas - II", "Targeted Column Imputation",
           "How does survey_df['ExamScore'].fillna(survey_df['ExamScore'].mean(), inplace=True) affect other columns with missing values?",
           "It leaves all other columns completely untouched, imputing mean values only into 'ExamScore'",
           ["It replaces missing values across the entire DataFrame with the ExamScore mean", "It converts other columns to float", "It deletes all other columns"],
           "Applying fillna directly to a specific Series (survey_df['ExamScore']) restricts imputation exclusively to that column."),
    case_q("Data Handling using Pandas - II", "Index Resetting Significance",
           "Why is survey_df.reset_index(drop=True, inplace=True) invoked after dropping rows?",
           "To rebuild a clean, contiguous 0-based integer index after intermediate row deletions create gaps in the index",
           ["To sort the DataFrame alphabetically", "To convert row labels into column headers", "To encrypt the student IDs"],
           "Dropping rows leaves gaps in the index sequence; reset_index(drop=True) establishes a seamless RangeIndex(0, n)."),
    case_q("Data Handling using Pandas - II", "Verifying Zero Remaining Nulls",
           "Which expression evaluates to True if all missing values across the cleaned survey_df have been resolved?",
           "survey_df.isna().sum().sum() == 0",
           ["survey_df.empty == True", "len(survey_df) == 0", "survey_df.count() == 0"],
           "survey_df.isna().sum().sum() counts total remaining nulls across all cells; 0 indicates complete data.")
]

P2_M10_TXT = (
    "Read the following enterprise network architecture case study and answer the questions that follow:\\n\\n"
    "National Trust Bank is upgrading its network architecture connecting its Regional Headquarters with five local branches. "
    "The network design specifications are established as follows:\\n"
    "1. Headquarters houses the core transactional database cluster, protected behind a stateful Packet Filtering Firewall and "
    "Intrusion Detection System (IDS).\\n"
    "2. Inside each local branch, all teller workstations are wired to a high-speed Central Switch configured in a Star Topology.\\n"
    "3. The connection between Headquarters and Branch 1 (distance 35 km) utilizes a dedicated High-Speed Leased Line over Optical Fiber.\\n"
    "4. Wireless connectivity within the customer lounge is segregated on a guest VLAN protected with WPA3 Wi-Fi encryption.\\n"
    "5. Inter-branch communication over public telecommunication networks is encrypted inside a Virtual Private Network (VPN) tunnel."
)
P2_M10_QS = [
    case_q("Computer Networks", "Firewall Functional Role",
           "What is the primary operational role of the Packet Filtering Firewall installed at the Bank Headquarters?",
           "Inspecting incoming and outgoing network packets and blocking unauthorized traffic based on predefined security rules",
           ["Speeding up internet browsing bandwidth", "Formatting hard drives of infected computers", "Converting AC electricity to DC"],
           "A firewall monitors and filters network traffic based on configured security policies and packet headers."),
    case_q("Computer Networks", "Star Topology Fault Isolation",
           "Why is a Star Topology using a central switch preferred for wiring workstations within each bank branch?",
           "Failure of a single workstation or cable does not disrupt network communication among other workstations",
           ["It requires less cable than a linear bus topology", "It eliminates the need for network interface cards", "It works without any electrical power"],
           "In a star topology, each node connects independently to the switch; a single node failure does not affect the rest of the LAN."),
    case_q("Computer Networks", "WAN Connection Medium",
           "Why is Optical Fiber Cable preferred over microwave wireless for connecting Headquarters with Branch 1 across 35 km?",
           "Optical fiber provides high data throughput, low latency, and immunity to atmospheric weather interference and eavesdropping",
           ["Optical fiber cable is cheaper than copper telephone wire", "Optical fiber requires no installation", "Optical fiber does not use light signals"],
           "Fiber optic cables offer massive bandwidth, minimal attenuation, and immunity to weather and electromagnetic interference."),
    case_q("Computer Networks", "VPN Privacy Mechanism",
           "How does a Virtual Private Network (VPN) protect sensitive financial transactions transmitted across public networks?",
           "By creating an encrypted virtual tunnel that encapsulates and encrypts financial data packets across untrusted networks",
           ["By physically disconnecting the bank from the internet", "By deleting all logs of financial transfers", "By replacing IP addresses with telephone numbers"],
           "A VPN encrypts data packets and encapsulates them in a secure tunnel across public networks, ensuring confidentiality."),
    case_q("Computer Networks", "Wi-Fi Security Standard",
           "Which modern wireless security protocol provides robust protection for the bank's wireless network against dictionary attacks?",
           "WPA3 (Wi-Fi Protected Access 3)",
           ["WEP (Wired Equivalent Privacy)", "HTTP", "FTP"],
           "WPA3 provides robust cryptographic protection and replaces older vulnerable standards like WEP and WPA.")
]

# ==============================================================================
# PASSAGES COMPILATION
# ==============================================================================
PASSAGES_1_10 = [
    ((P1_M1_TXT, P1_M1_QS), (P2_M1_TXT, P2_M1_QS)),
    ((P1_M2_TXT, P1_M2_QS), (P2_M2_TXT, P2_M2_QS)),
    ((P1_M3_TXT, P1_M3_QS), (P2_M3_TXT, P2_M3_QS)),
    ((P1_M4_TXT, P1_M4_QS), (P2_M4_TXT, P2_M4_QS)),
    ((P1_M5_TXT, P1_M5_QS), (P2_M5_TXT, P2_M5_QS)),
    ((P1_M6_TXT, P1_M6_QS), (P2_M6_TXT, P2_M6_QS)),
    ((P1_M7_TXT, P1_M7_QS), (P2_M7_TXT, P2_M7_QS)),
    ((P1_M8_TXT, P1_M8_QS), (P2_M8_TXT, P2_M8_QS)),
    ((P1_M9_TXT, P1_M9_QS), (P2_M9_TXT, P2_M9_QS)),
    ((P1_M10_TXT, P1_M10_QS), (P2_M10_TXT, P2_M10_QS))
]

assert len(PASSAGES_1_10) == 10, f"Expected 10 passage pairs, got {len(PASSAGES_1_10)}"
for idx, (p1, p2) in enumerate(PASSAGES_1_10, 1):
    assert len(p1[1]) == 5, f"Mock {idx} P1 has {len(p1[1])} questions instead of 5"
    assert len(p2[1]) == 5, f"Mock {idx} P2 has {len(p2[1])} questions instead of 5"

print(f"CS Passages 1 to 10 compiled successfully: {len(PASSAGES_1_10)} pairs (20 passages, 100 questions).")
'''

with open(out_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Generated {out_path} ({len(content)} bytes)")
