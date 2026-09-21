import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import case_q

# ==============================================================================
# MOCK 11 PASSAGES
# ==============================================================================
P1_M11_TXT = (
    "Read the following case study on expression parsing and stack operations and answer the questions that follow:\n\n"
    "An algorithm compiler engineer is designing an arithmetic expression parser for a Python IDE. "
    "The parser converts arithmetic expressions from human-readable Infix notation (e.g., A + B * C) into machine-evaluable "
    "Postfix (Reverse Polish) notation using a Stack data structure. "
    "The algorithm scans the infix expression from left to right:\n"
    "1. Operands (numbers and variables) are appended directly to the postfix output expression.\n"
    "2. Left parentheses '(' are pushed onto the operator stack.\n"
    "3. Operators (+, -, *, /, ^) are processed based on precedence and associativity: higher or equal precedence operators "
    "at the top of the stack are popped to output before pushing the incoming operator.\n"
    "4. When a right parenthesis ')' is encountered, operators are repeatedly popped from the stack to the output until matching '(' is found.\n"
    "Once converted, evaluating the postfix expression requires an operand stack where operators pop their respective operands and push the result."
)
P1_M11_QS = [
    case_q("Data Structures - Stacks", "Infix to Postfix Conversion Rule",
           "In the infix expression A + B * C, what is the correct postfix equivalent?",
           "A B C * +",
           ["A B + C *", "* + A B C", "A B C + *"],
           "Multiplication (*) has higher precedence than addition (+); B and C are multiplied first (*), then added to A: A B C * +."),
    case_q("Data Structures - Stacks", "Stack Role in Infix Parsing",
           "What specific elements are temporarily stored on the stack during infix-to-postfix conversion?",
           "Operators and left parentheses awaiting precedence resolution",
           ["Operands (numbers and variables)", "Final evaluated numeric results", "Function names only"],
           "During conversion, the stack stores operators and open parentheses until their operands are encountered."),
    case_q("Data Structures - Stacks", "Postfix Evaluation Stack Mechanism",
           "During the evaluation of a Postfix expression, what happens when an operator is encountered in the token stream?",
           "The top two operands are popped from the stack, the operation is applied, and the calculated result is pushed back onto the stack",
           ["The operator is pushed onto the stack without evaluation", "The entire stack is cleared", "An error is raised"],
           "When an operator is encountered during postfix evaluation, it pops its required operands, computes the result, and pushes it back."),
    case_q("Data Structures - Stacks", "Evaluating Postfix Expression 6 3 2 * +",
           "What is the final evaluated value of the postfix expression: 6 3 2 * +?",
           "12",
           ["18", "24", "9"],
           "Scan left-to-right: push 6, push 3, push 2; operator '*' pops 2 and 3, pushes 3 * 2 = 6; operator '+' pops 6 and 6, pushes 6 + 6 = 12."),
    case_q("Data Structures - Stacks", "Operator Associativity on Stack",
           "How does the stack handle two operators of equal precedence (e.g. + and -) with left-to-right associativity?",
           "The operator currently at the top of the stack is popped to output before the incoming operator is pushed",
           ["Both operators are deleted", "The incoming operator is discarded", "An exception is raised"],
           "Left-to-right associativity dictates that an operator of equal precedence already on the stack has priority and must be popped first.")
]

P2_M11_TXT = (
    "Read the following database integrity constraints case study and answer the questions that follow:\n\n"
    "A retail inventory database manager designs a relational table PRODUCT in MySQL to enforce data integrity:\n"
    "CREATE TABLE PRODUCT (\n"
    "    PCode INT PRIMARY KEY,\n"
    "    PName VARCHAR(40) NOT NULL UNIQUE,\n"
    "    Category VARCHAR(20) DEFAULT 'General',\n"
    "    Price DECIMAL(8,2) CHECK (Price > 0),\n"
    "    StockQty INT CHECK (StockQty >= 0)\n"
    ");\n\n"
    "During daily operations, several transactions are tested:\n"
    "- Insertion 1: Inserting a duplicate PCode raises an integrity violation error.\n"
    "- Insertion 2: Inserting a record without specifying Category automatically assigns 'General'.\n"
    "- Insertion 3: Inserting a negative Price (-15.00) is rejected by the CHECK constraint.\n"
    "- Insertion 4: Inserting NULL for PName is rejected by the NOT NULL constraint."
)
P2_M11_QS = [
    case_q("Database Concepts and SQL", "Primary Key Integrity Rule",
           "Why is an attempt to insert a duplicate PCode rejected by MySQL?",
           "Because the PRIMARY KEY constraint enforces entity integrity, requiring every key value to be unique and non-null",
           ["Because PCode must be negative", "Because tables can only store 10 rows", "Because numbers are not allowed"],
           "A PRIMARY KEY uniquely identifies each tuple in a relation, forbidding duplicate and NULL values."),
    case_q("Database Concepts and SQL", "DEFAULT Constraint Functionality",
           "What value is automatically assigned to Category if omitted in an INSERT statement?",
           "'General'",
           ["NULL", "0", "An empty string ''"],
           "The DEFAULT 'General' clause supplies 'General' whenever a value is not explicitly provided for Category."),
    case_q("Database Concepts and SQL", "CHECK Constraint Validation",
           "What is the operational function of the CHECK (Price > 0) constraint?",
           "It guarantees domain integrity by rejecting any inserted or updated record where Price is less than or equal to zero",
           ["It converts negative prices to positive numbers", "It applies a 10% discount to all items", "It formats prices with dollar signs"],
           "A CHECK constraint validates that attribute values satisfy a specified boolean condition before allowing insertion or update."),
    case_q("Database Concepts and SQL", "UNIQUE vs PRIMARY KEY Distinction",
           "How does the UNIQUE constraint on PName differ from the PRIMARY KEY constraint on PCode?",
           "A table can have multiple UNIQUE constraints and UNIQUE permits NULL values (unless combined with NOT NULL), but only one PRIMARY KEY is allowed",
           ["UNIQUE constraints can only be applied to integer columns", "UNIQUE does not check for duplicates", "PRIMARY KEY allows duplicate values"],
           "A table can define multiple UNIQUE keys (which permit NULLs unless NOT NULL is set), whereas only one PRIMARY KEY is permitted per table."),
    case_q("Database Concepts and SQL", "Altering Table to Add Foreign Key",
           "Which SQL DDL command adds a foreign key referencing table SUPPLIER(SuppId) to PRODUCT?",
           "ALTER TABLE PRODUCT ADD FOREIGN KEY (SuppId) REFERENCES SUPPLIER(SuppId);",
           ["UPDATE TABLE PRODUCT ADD FOREIGN KEY SuppId;", "MODIFY TABLE PRODUCT FOREIGN KEY (SuppId);", "INSERT INTO PRODUCT FOREIGN KEY (SuppId);"],
           "ALTER TABLE ... ADD FOREIGN KEY (col) REFERENCES parent_table(parent_col) adds referential constraints to existing tables.")
]

# ==============================================================================
# MOCK 12 PASSAGES
# ==============================================================================
P1_M12_TXT = (
    "Read the following case study on histogram data visualization and answer the questions that follow:\n\n"
    "A demographic analyst at a market research firm is visualizing the age distribution of 1,000 retail consumers. "
    "The dataset contains consumer ages ranging from 18 to 78 years. "
    "The analyst uses matplotlib.pyplot to construct a frequency histogram using plt.hist().\n\n"
    "To create meaningful age brackets, she defines custom bin boundaries:\n"
    "age_bins = [18, 25, 35, 50, 65, 80]\n"
    "She executes the command:\n"
    "n, bins, patches = plt.hist(ages, bins=age_bins, edgecolor='black', color='skyblue', rwidth=0.9)\n"
    "She adds axis labels plt.xlabel('Age Brackets (Years)'), plt.ylabel('Number of Consumers'), "
    "and configures the chart title plt.title('Consumer Age Demographics'). "
    "She exports the visual figure using plt.savefig('age_distribution.png', dpi=300) before displaying it."
)
P1_M12_QS = [
    case_q("Data Visualization using Pyplot", "Custom Bin Boundaries Definition",
           "How many class interval bins are generated by the bin list age_bins = [18, 25, 35, 50, 65, 80]?",
           "5 bins (18-25, 25-35, 35-50, 50-65, 65-80)",
           ["6 bins", "4 bins", "10 bins"],
           "A list of k boundary values partitions the data into k - 1 contiguous intervals: 6 values yield 5 bins."),
    case_q("Data Visualization using Pyplot", "rwidth Parameter Aesthetics",
           "What visual outcome is achieved by specifying rwidth=0.9 in plt.hist()?",
           "Bars occupy 90% of the bin interval width, leaving a 10% blank gap between adjacent bars for clear separation",
           ["The chart is rotated by 90 degrees", "Bars are made 90 times taller", "The data is scaled between 0 and 90"],
           "rwidth sets the relative width of the bars as a fraction of the bin width, adding spacing between bars."),
    case_q("Data Visualization using Pyplot", "edgecolor Role in Histograms",
           "Why is edgecolor='black' particularly important when plotting histograms?",
           "It draws a distinct border line around each bar, preventing adjacent bars with identical fill colors from blending together",
           ["It makes the plot background black", "It prints text labels in black font", "It converts the chart to black and white"],
           "edgecolor defines the stroke boundary of each bar, making bin divisions clearly distinguishable."),
    case_q("Data Visualization using Pyplot", "Density Normalization Parameter",
           "If the analyst sets density=True in plt.hist(), what does the vertical Y-axis represent?",
           "Probability density, such that the total area under the histogram integrates to 1.0",
           ["Raw frequency counts of consumers", "Cumulative percentage from 0 to 100", "Average consumer spending in rupees"],
           "density=True normalizes bin counts so that the total area under the histogram equals 1, representing probability density."),
    case_q("Data Visualization using Pyplot", "Cumulative Frequency Histogram",
           "Which parameter in plt.hist() generates an ogive / cumulative frequency distribution where each bin adds up prior counts?",
           "cumulative=True",
           ["accumulate=True", "sum=True", "running_total=True"],
           "cumulative=True computes the cumulative frequency distribution across successive bins.")
]

P2_M12_TXT = (
    "Read the following case study on CSV inventory management in Python and answer the questions that follow:\n\n"
    "Rajesh operates a warehouse distribution center and manages inventory items using Python's csv module. "
    "He creates a script 'inventory_manager.py' to record incoming inventory shipments into 'warehouse.csv'.\n\n"
    "To record data, he opens the file using with open('warehouse.csv', 'w', newline='') as f: "
    "and instantiates a writer object using writer = csv.writer(f, delimiter=','). "
    "He writes the column headers using writer.writerow(['ItemId', 'ItemName', 'Quantity', 'UnitPrice']). "
    "To insert multiple inventory shipment rows at once from a nested list of records, he uses writer.writerows(shipment_data).\n"
    "Later, to search for low-stock items, he reads the file using csv.reader, checks if int(row[2]) < 20, "
    "and prints alerts for restock."
)
P2_M12_QS = [
    case_q("File Handling in Python", "writerow vs writerows Distinction",
           "What is the difference between writer.writerow() and writer.writerows() in Python's csv module?",
           "writerow() writes a single row from a 1D sequence, whereas writerows() writes multiple rows from a 2D iterable of sequences",
           ["writerow() writes text and writerows() writes numbers", "writerows() deletes previous records", "writerow() is deprecated"],
           "writerow(seq) writes one row; writerows(nested_seq) writes multiple rows in a single call."),
    case_q("File Handling in Python", "Preventing Blank Lines via newline=''",
           "Why must newline='' be specified when opening files with open('warehouse.csv', 'w', newline='')?",
           "To prevent the CSV writer on Windows/Linux from inserting extra blank lines between consecutive rows",
           ["To delete all spaces inside text fields", "To format numbers with commas", "To make the file append-only"],
           "The csv module handles line endings internally; opening with newline='' prevents unwanted blank lines."),
    case_q("File Handling in Python", "Custom Delimiter Specification",
           "If Rajesh wants to use a tab or pipe character instead of a comma, which argument should he provide to csv.writer()?",
           "delimiter='\\t' or delimiter='|'",
           ["separator='|'", "split='|'", "char='|'"],
           "The delimiter parameter specifies the character used to separate fields in CSV files."),
    case_q("File Handling in Python", "Reading Specific Columns by Index",
           "In row = ['IT101', 'Wireless Mouse', '15', '450.00'], which indexing expression accesses the Quantity value?",
           "row[2]",
           ["row[1]", "row['Quantity']", "row[3]"],
           "In a standard list returned by csv.reader, indices are 0-based: row[0] is ItemId, row[1] is ItemName, row[2] is Quantity."),
    case_q("File Handling in Python", "csv.DictReader Convenience",
           "What advantage does using csv.DictReader offer over standard csv.reader?",
           "It maps field values to column headers as key-value pairs in a Python dictionary, allowing access by column name (e.g. row['Quantity'])",
           ["It reads files twice as fast", "It automatically encrypts the CSV file", "It converts all numbers to floats"],
           "csv.DictReader creates an iterator of dictionary objects where keys are derived from the header row.")
]

# ==============================================================================
# MOCK 13 PASSAGES
# ==============================================================================
P1_M13_TXT = (
    "Read the following case study on network addressing and architecture and answer the questions that follow:\n\n"
    "An IT infrastructure architect is designing the network addressing schema for an institute with 400 networked computers. "
    "The architect configures an IPv4 addressing plan using private IP addresses within Class B (e.g., 172.16.0.0/16). "
    "Key architectural principles are established:\n"
    "1. Every Network Interface Card (NIC) installed in a workstation possesses a globally unique, factory-burned physical address "
    "known as a MAC (Media Access Control) address, consisting of 48 bits expressed in 12 hexadecimal digits (e.g., 00:1A:2B:3C:4D:5E).\n"
    "2. At the Network Layer, workstations are assigned 32-bit logical IPv4 addresses partitioned into Network ID and Host ID portions.\n"
    "3. Workstations obtain their IP addresses automatically from a Dynamic Host Configuration Protocol (DHCP) server, avoiding IP conflicts.\n"
    "4. Due to global IPv4 address exhaustion, the institute prepares for IPv6 adoption, which utilizes 128-bit addresses."
)
P1_M13_QS = [
    case_q("Computer Networks", "MAC vs IP Address Fundamentals",
           "What is the foundational difference between a MAC address and an IP address?",
           "A MAC address is a permanent 48-bit physical hardware address, whereas an IP address is a 32-bit logical network address",
           ["A MAC address changes every time a PC boots", "An IP address is burned into the NIC silicon chip", "MAC addresses are used only on the Internet"],
           "MAC is a hardware link-layer identifier (48 bits); IP is a configurable network-layer logical identifier (32 bits in IPv4)."),
    case_q("Computer Networks", "MAC Address Bit Length and Format",
           "How many bits make up a standard MAC address, and how is it standardly represented?",
           "48 bits, represented as 6 groups of 2 hexadecimal digits separated by colons or hyphens",
           ["32 bits, represented as 4 decimal octets", "128 bits, represented as 8 hexadecimal blocks", "64 bits in binary"],
           "A MAC address consists of 48 bits (6 bytes), displayed as 12 hexadecimal digits (e.g., AA:BB:CC:DD:EE:FF)."),
    case_q("Computer Networks", "DHCP Protocol Function",
           "What essential service does the Dynamic Host Configuration Protocol (DHCP) provide on the network?",
           "Automatically assigns IP addresses, subnet masks, and default gateways to client devices on boot",
           ["Translates domain names to IP addresses", "Protects against computer viruses", "Encrypts email messages"],
           "DHCP dynamically allocates IP configuration parameters to host devices automatically."),
    case_q("Computer Networks", "IPv4 vs IPv6 Address Space",
           "How many bits comprise an IPv6 address compared to an IPv4 address?",
           "IPv6 uses 128 bits; IPv4 uses 32 bits",
           ["IPv6 uses 64 bits; IPv4 uses 16 bits", "IPv6 uses 256 bits; IPv4 uses 64 bits", "Both use 32 bits"],
           "IPv4 addresses are 32 bits long (2^32 addresses); IPv6 addresses are 128 bits long (2^128 addresses)."),
    case_q("Computer Networks", "Private IP Address Characteristic",
           "Why are private IP addresses (such as 172.16.x.x or 192.168.x.x) used inside local institute networks?",
           "They are non-routable on the public internet, conserving global public IPv4 addresses and enhancing internal network security",
           ["They provide unlimited free internet bandwidth", "They bypass the institute firewall", "They require no router"],
           "Private IP addresses cannot be routed across the public internet, allowing organizations to reuse address space internally.")
]

P2_M13_TXT = (
    "Read the following case study on financial data manipulation using Pandas DataFrames and answer the questions that follow:\n\n"
    "A quantitative financial analyst tracks portfolio holdings using a Pandas DataFrame named portfolio:\n"
    "portfolio = pd.DataFrame({\n"
    "    'Ticker': ['INFY', 'TCS', 'RELIANCE', 'HDFCBANK'],\n"
    "    'Shares': [150, 80, 100, 200],\n"
    "    'BuyPrice': [1450.0, 3200.0, 2400.0, 1600.0],\n"
    "    'CurrentPrice': [1620.0, 3450.0, 2350.0, 1720.0]\n"
    "}, index=['Stock1', 'Stock2', 'Stock3', 'Stock4'])\n\n"
    "The analyst performs several operations:\n"
    "1. Vectorized calculation of current market value: portfolio['MarketVal'] = portfolio['Shares'] * portfolio['CurrentPrice']\n"
    "2. Vectorized calculation of profit/loss: portfolio['GainLoss'] = portfolio['MarketVal'] - (portfolio['Shares'] * portfolio['BuyPrice'])\n"
    "3. Slicing profitable stocks using boolean masking: profitable = portfolio[portfolio['GainLoss'] > 0]\n"
    "4. Extracting specific cells using df.loc['Stock2', 'BuyPrice'] and df.iloc[1, 2]."
)
P2_M13_QS = [
    case_q("Data Handling using Pandas - II", "loc vs iloc Equivalence",
           "Why do portfolio.loc['Stock2', 'BuyPrice'] and portfolio.iloc[1, 2] access the exact same cell value (3200.0)?",
           "Because 'Stock2' is the label of row index position 1, and 'BuyPrice' is the label of column index position 2",
           ["Because loc and iloc always return 0", "Because Python randomly picks a number", "Because financial data is sorted"],
           "loc uses row and column labels ('Stock2', 'BuyPrice'); iloc uses 0-based integer positions (row 1, column 2)."),
    case_q("Data Handling using Pandas - II", "Boolean Masking Evaluation",
           "Which stock has a negative GainLoss and is excluded from profitable = portfolio[portfolio['GainLoss'] > 0]?",
           "Stock3 ('RELIANCE'), because CurrentPrice (2350) is less than BuyPrice (2400)",
           ["Stock1 ('INFY')", "Stock2 ('TCS')", "Stock4 ('HDFCBANK')"],
           "For RELIANCE: 100 * 2350 - 100 * 2400 = -5000 (loss); all other stocks have positive gain."),
    case_q("Data Handling using Pandas - II", "Transposition Operation",
           "What is the shape of portfolio.T if portfolio has 4 rows and 6 columns?",
           "(6, 4)",
           ["(4, 6)", "(24, 1)", "(6, 6)"],
           "Transposing swaps axes: a DataFrame with shape (4, 6) becomes (6, 4)."),
    case_q("Data Handling using Pandas - II", "Column Renaming Syntax",
           "How can the analyst rename the 'Shares' column to 'Quantity' permanently in portfolio?",
           "portfolio.rename(columns={'Shares': 'Quantity'}, inplace=True)",
           ["portfolio.columns['Shares'] = 'Quantity'", "portfolio.change_col('Shares', 'Quantity')", "portfolio.rename('Shares', 'Quantity')"],
           "rename(columns={'old': 'new'}, inplace=True) modifies column names in place."),
    case_q("Data Handling using Pandas - II", "Total Market Value Aggregation",
           "Which expression calculates the grand total market value of the entire portfolio as a scalar float?",
           "portfolio['MarketVal'].sum()",
           ["portfolio['MarketVal'].count()", "portfolio.sum()", "portfolio['MarketVal'].mean()"],
           "Series.sum() computes the arithmetic sum of values in the 'MarketVal' column.")
]

# ==============================================================================
# MOCK 14 PASSAGES
# ==============================================================================
P1_M14_TXT = (
    "Read the following case study on binary file operations in a library system and answer the questions that follow:\n\n"
    "An automated library management system maintains catalog records in a binary file 'books.dat'. "
    "Each book entry is stored as a list: [BookId, Title, Author, Price, Status], where Status is 'Available' or 'Issued'. "
    "The software developer writes two primary routines:\n"
    "1. issue_book(target_id): Opens 'books.dat' in 'rb+' mode. Inside a while True loop, it reads records using pickle.load(f). "
    "Upon finding a record where record[0] == target_id and record[4] == 'Available', it updates record[4] = 'Issued'. "
    "To overwrite the updated record in place, the developer calculates the byte offset using f.tell(), rewinds the pointer "
    "using f.seek(), and overwrites the record using pickle.dump(record, f).\n"
    "2. Exception Handling: The routine wraps the read loop inside a try block and intercepts EOFError when all records have been inspected."
)
P1_M14_QS = [
    case_q("File Handling in Python", "Read/Write Binary Mode 'rb+'",
           "Why did the developer open 'books.dat' in 'rb+' mode instead of 'rb' or 'wb'?",
           "'rb+' opens the binary file for both reading and writing simultaneously without truncating existing content",
           ["'rb+' encrypts the file automatically", "'rb+' makes the file read-only", "'rb+' deletes previous books"],
           "'rb+' opens a file for both reading and writing; 'wb' truncates the file, and 'rb' does not permit writing."),
    case_q("File Handling in Python", "Byte Pointer Offset Tracking",
           "What is the purpose of invoking f.tell() before calling pickle.load() during in-place record updates?",
           "To save the starting byte position of the current record so the pointer can be rewound before writing the updated record",
           ["To count how many books are in the library", "To check the file size on disk", "To close the file"],
           "f.tell() records the byte offset where the record begins so f.seek() can return to that spot to overwrite it."),
    case_q("File Handling in Python", "Rewinding File Pointer via seek()",
           "Which command repositions the file pointer back to byte offset pos to prepare for overwriting?",
           "f.seek(pos)",
           ["f.rewind(pos)", "f.move(pos)", "f.reset(pos)"],
           "f.seek(offset) moves the file read/write pointer to the designated byte position."),
    case_q("File Handling in Python", "EOFError Exception Handling",
           "Why is EOFError expected and caught during binary file traversal in Python?",
           "Because pickle.load() raises EOFError as the standard mechanism when no more bytes remain to be read",
           ["Because the file is corrupted", "Because the operating system ran out of disk space", "Because pickle cannot read numbers"],
           "In Python, reaching the end of file during pickle.load() naturally raises EOFError, signaling traversal completion."),
    case_q("File Handling in Python", "Serialization Integrity",
           "Why should record objects modified in memory be written back using pickle.dump()?",
           "Because modifying the Python list in RAM does not alter the persisted binary bytes on disk without re-serializing",
           ["Because Python deletes variables after 5 seconds", "Because pickle requires constant saving", "To change the text encoding"],
           "In-memory mutations exist only in RAM; pickle.dump() converts modified objects back into persisted byte sequences.")
]

P2_M14_TXT = (
    "Read the following case study on web cookies, tracking, and privacy and answer the questions that follow:\n\n"
    "While researching laptops on an online retail website, Anita notices advertisements for the exact laptop model appearing "
    "on news blogs and social media apps she visits hours later. "
    "A cybersecurity expert explains how modern web tracking operates:\n"
    "1. When Anita visited the shopping site, a small text file called an HTTP Cookie was stored in her browser.\n"
    "2. First-party cookies are set by the website directly visited to maintain login sessions and cart items.\n"
    "3. Third-party cookies and tracking pixels are embedded by advertising networks across thousands of independent partner websites, "
    "enabling behavioral profiling and targeted cross-site advertising.\n"
    "4. Even when users browse in 'Private / Incognito' mode, their Internet Service Provider (ISP), network administrator, "
    "and web servers can still log their IP address, DNS queries, and active browsing requests."
)
P2_M14_QS = [
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "First-party vs Third-party Cookies",
           "What is the primary operational difference between first-party cookies and third-party cookies?",
           "First-party cookies are placed by the visited domain for core site functionality; third-party cookies are placed by external ad networks to track behavior across sites",
           ["First-party cookies are malicious viruses while third-party cookies are safe", "Third-party cookies are stored on the keyboard", "First-party cookies expire instantly"],
           "First-party cookies belong to the domain in the address bar; third-party cookies belong to external tracking/advertising domains."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Mechanism of Targeted Cross-Site Advertising",
           "How did the advertising network show Anita ads for the laptop on completely unrelated news blogs?",
           "The ad network read its persistent tracking cookie stored in Anita's browser when she visited partner news websites",
           ["The news website hacked into Anita's webcam", "Anita's computer caught a destructive hardware virus", "The shopping site called the news editor on the phone"],
           "Ad networks identify users via third-party cookies across partner networks to serve behavioral targeted ads."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Incognito / Private Browsing Scope",
           "What privacy protection does 'Incognito / Private Browsing' actually provide to the user?",
           "It prevents the local browser from saving browsing history, search cookies, and temporary site data on that local machine",
           ["It makes the user 100% anonymous to their ISP and government", "It hides the computer's IP address from web servers", "It blocks all network firewalls"],
           "Private browsing only ensures local hygiene (no local history/cookies saved); ISPs and external servers still see traffic."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Digital Footprint Classification",
           "Under which category of digital footprint do web server connection logs and IP address records fall?",
           "Passive Digital Footprint",
           ["Active Digital Footprint", "Voluntary Digital Footprint", "Creative Digital Footprint"],
           "Passive digital footprints are recorded automatically and invisibly by servers without the user's active submission."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Browser Cookie Management",
           "How can users protect themselves from aggressive cross-site tracking in their browser settings?",
           "By blocking third-party tracking cookies, enabling 'Do Not Track' / Global Privacy Control, and clearing site cookies regularly",
           ["By unplugging the monitor cable", "By deleting the operating system", "By turning off the electricity at night"],
           "Disabling third-party cookies and utilizing privacy-focused browser configurations prevents ad tracking.")
]

# ==============================================================================
# MOCK 15 PASSAGES
# ==============================================================================
P1_M15_TXT = (
    "Read the following database case study on joins and group aggregations and answer the questions that follow:\n\n"
    "A grand resort hotel manages guest reservations using two relational tables in MySQL:\n"
    "1. Table ROOMS (RoomNo INT PRIMARY KEY, RoomType VARCHAR(20), PricePerNight DECIMAL(8,2), Floor INT);\n"
    "2. Table BOOKINGS (BookingId INT PRIMARY KEY, RoomNo INT, GuestName VARCHAR(40), CheckIn DATE, CheckOut DATE, "
    "FOREIGN KEY (RoomNo) REFERENCES ROOMS(RoomNo));\n\n"
    "The resort manager requests a report showing the RoomType, total number of bookings per RoomType, and average revenue generated. "
    "The report must only include RoomTypes that have received at least 5 bookings, arranged in descending order of total bookings. "
    "The senior database developer constructs an SQL query utilizing an inner equi-join, GROUP BY ROOMS.RoomType, "
    "HAVING COUNT(BOOKINGS.BookingId) >= 5, and ORDER BY COUNT(BOOKINGS.BookingId) DESC."
)
P1_M15_QS = [
    case_q("Database Concepts and SQL", "Relational Join Condition",
           "Which SQL FROM and WHERE clause correctly joins ROOMS and BOOKINGS?",
           "FROM ROOMS R, BOOKINGS B WHERE R.RoomNo = B.RoomNo",
           ["FROM ROOMS R JOIN BOOKINGS B ON R.PricePerNight = B.BookingId", "FROM ROOMS R, BOOKINGS B WHERE R.Floor = B.RoomNo", "FROM ROOMS R UNION BOOKINGS B"],
           "Equi-join matches the common key attribute: R.RoomNo = B.RoomNo."),
    case_q("Database Concepts and SQL", "Aggregate Count Function",
           "Which SQL expression counts the total number of bookings per room type?",
           "COUNT(B.BookingId) (or COUNT(*))",
           ["SUM(B.BookingId)", "AVG(B.RoomNo)", "MAX(B.GuestName)"],
           "COUNT(BookingId) tallies the number of booking records associated with each grouped room type."),
    case_q("Database Concepts and SQL", "HAVING Threshold Evaluation",
           "Why must HAVING COUNT(B.BookingId) >= 5 be placed in the HAVING clause rather than WHERE?",
           "Because WHERE cannot evaluate aggregate functions (like COUNT); group-level conditions require HAVING",
           ["Because HAVING executes before WHERE", "Because MySQL forbids WHERE in joins", "Because COUNT is a string function"],
           "The WHERE clause filters individual rows before grouping; aggregate conditions must be evaluated in HAVING."),
    case_q("Database Concepts and SQL", "Sorting Output by Booking Volume",
           "Which clause arranges the final output starting with the most frequently booked room type?",
           "ORDER BY COUNT(B.BookingId) DESC",
           ["ORDER BY COUNT(B.BookingId) ASC", "SORT BY RoomType DESC", "GROUP BY RoomType DESC"],
           "ORDER BY ... DESC sorts the grouped output in descending order of booking count."),
    case_q("Database Concepts and SQL", "Foreign Key Referential Rule",
           "What error occurs if a receptionist attempts to insert a booking record with RoomNo = 999 when RoomNo 999 does not exist in ROOMS?",
           "Cannot add or update a child row: a foreign key constraint fails",
           ["The database creates Room 999 automatically", "The booking is recorded with RoomNo = NULL silently", "The table ROOMS is deleted"],
           "Referential integrity prohibits inserting foreign key values into child tables that do not exist in the parent table.")
]

P2_M15_TXT = (
    "Read the following algorithmic search case study and answer the questions that follow:\n\n"
    "An administrative software engineer is optimizing citizen identification lookups across a database of 1,000,000 enrolled citizens. "
    "Each record has a unique 12-digit CitizenID. "
    "The engineer tests two search algorithms:\n"
    "1. Linear Search: Examines records sequentially from index 0 to n-1 until a match is found or end of array is reached. "
    "If the ID is located at the end or absent, it requires 1,000,000 comparisons (O(n) worst-case time complexity).\n"
    "2. Binary Search: Operates on an array that is strictly sorted by CitizenID. It compares the target ID with the middle element. "
    "If target is smaller, it searches the left half; if larger, it searches the right half. "
    "With each comparison, the search space is cut in half, locating any citizen in at most 20 comparisons (O(log2 n) worst case)."
)
P2_M15_QS = [
    case_q("Algorithmic Efficiency and Search", "Prerequisite for Binary Search",
           "What strict precondition must be satisfied before Binary Search can be executed on an array?",
           "The elements in the array must be strictly arranged in sorted order (ascending or descending)",
           ["The array must have an even number of elements", "The array must contain only positive integers", "The array must have fewer than 100 elements"],
           "Binary Search relies on sorted order to eliminate half of the remaining elements in each step."),
    case_q("Algorithmic Efficiency and Search", "Worst-case Comparison Count for 1,000,000 Elements",
           "Approximately how many comparisons does Binary Search require in the worst case for n = 1,000,000 elements?",
           "About 20 comparisons (since 2^20 = 1,048,576)",
           ["1,000,000 comparisons", "500,000 comparisons", "10,000 comparisons"],
           "log2(1,000,000) is approximately 19.93, requiring at most 20 comparisons to locate any item or confirm absence."),
    case_q("Algorithmic Efficiency and Search", "Midpoint Calculation Formula",
           "What is the formula to compute the middle index in Binary Search with bounds low and high?",
           "mid = (low + high) // 2",
           ["mid = (low * high) // 2", "mid = high - low", "mid = (low + high) / 2.0"],
           "Integer floor division (low + high) // 2 computes the valid integer middle index."),
    case_q("Algorithmic Efficiency and Search", "Best-case Time Complexity Comparison",
           "What is the best-case time complexity for both Linear Search and Binary Search when the target is at the first inspected position?",
           "O(1) constant time",
           ["O(n)", "O(log n)", "O(n^2)"],
           "If the target item is at index 0 (Linear Search) or at the initial midpoint (Binary Search), both locate it in O(1) time."),
    case_q("Algorithmic Efficiency and Search", "Search Space Reduction Rate",
           "By what factor is the search space reduced after each unsuccessful comparison in Binary Search?",
           "By a factor of 2 (halved: 50% of remaining elements eliminated)",
           ["By a factor of 10", "By 1 element only", "By 75%"],
           "Binary Search eliminates half the remaining search space after every step, resulting in logarithmic O(log n) efficiency.")
]

# ==============================================================================
# MOCK 16 PASSAGES
# ==============================================================================
P1_M16_TXT = (
    "Read the following climate data visualization case study and answer the questions that follow:\n\n"
    "A climatologist is analyzing annual rainfall across five meteorological zones: ['Coastal', 'Plains', 'Desert', 'Hills', 'Plateau']. "
    "Rainfall measurements (in cm) are [240, 110, 25, 180, 85]. "
    "Because the zone names are long and readable horizontally, the climatologist chooses a Horizontal Bar Chart using plt.barh().\n\n"
    "She writes the visualization script:\n"
    "zones = ['Coastal', 'Plains', 'Desert', 'Hills', 'Plateau']\n"
    "rainfall = [240, 110, 25, 180, 85]\n"
    "colors = ['navy', 'blue', 'gold', 'darkgreen', 'teal']\n"
    "plt.barh(zones, rainfall, height=0.6, color=colors)\n"
    "plt.xlabel('Annual Rainfall (cm)')\n"
    "plt.ylabel('Geographic Zones')\n"
    "plt.title('Regional Annual Rainfall Distribution')\n"
    "plt.grid(axis='x', linestyle='--', alpha=0.7)\n"
    "plt.show()"
)
P1_M16_QS = [
    case_q("Data Visualization using Pyplot", "Horizontal Bar Function",
           "Which Pyplot function creates horizontal bar charts with categories on the vertical Y-axis?",
           "plt.barh()",
           ["plt.bar()", "plt.hbar()", "plt.plot(kind='horizontal')"],
           "plt.barh() is the designated function for horizontal bar charts in Pyplot."),
    case_q("Data Visualization using Pyplot", "Bar Thickness Parameter in barh",
           "Which parameter specifies the bar thickness along the vertical axis in plt.barh()?",
           "height=0.6",
           ["width=0.6", "thickness=0.6", "depth=0.6"],
           "In plt.barh(), bar thickness is controlled by the height parameter (whereas plt.bar() uses width)."),
    case_q("Data Visualization using Pyplot", "Axis-Specific Grid Activation",
           "What does plt.grid(axis='x', linestyle='--', alpha=0.7) accomplish?",
           "Displays vertical dashed grid lines along the X-axis with 70% opacity, omitting horizontal grid lines",
           ["Displays horizontal grid lines only", "Draws an X over the entire chart", "Removes all axes"],
           "axis='x' restricts grid lines to the X-axis coordinate intervals."),
    case_q("Data Visualization using Pyplot", "Color Mapping to Categories",
           "How does Pyplot apply the list colors = ['navy', 'blue', 'gold', 'darkgreen', 'teal'] to the bars?",
           "Applies each color sequentially to the corresponding bar category in order",
           ["Blends all colors into a single mixed shade", "Randomly picks one color for all bars", "Ignores the color list"],
           "Passing a list of colors applies them one-to-one to consecutive bars in the chart."),
    case_q("Data Visualization using Pyplot", "Adjusting Figure Dimensions",
           "How can the climatologist enlarge the figure size to 10 inches wide by 5 inches tall before plotting?",
           "plt.figure(figsize=(10, 5))",
           ["plt.resize(10, 5)", "plt.set_window(10, 5)", "plt.size(10, 5)"],
           "plt.figure(figsize=(width, height)) initializes figure canvas dimensions in inches.")
]

P2_M16_TXT = (
    "Read the following case study on exception handling and file robustness in Python and answer the questions that follow:\n\n"
    "An enterprise billing engineer writes a robust data processing utility to import transaction files in Python. "
    "File operations can encounter runtime errors such as missing files, locked permissions, or corrupted data. "
    "The engineer structures the code using structured exception handling:\n\n"
    "def process_billing(filename):\n"
    "    file = None\n"
    "    try:\n"
    "        file = open(filename, 'r')\n"
    "        data = file.readlines()\n"
    "        total = sum(float(line.strip()) for line in data)\n"
    "    except FileNotFoundError:\n"
    "        print('Error: The specified file does not exist on disk.')\n"
    "    except ValueError:\n"
    "        print('Error: Non-numeric data encountered in billing record.')\n"
    "    else:\n"
    "        print(f'Successfully processed billing total: {total}')\n"
    "    finally:\n"
    "        if file and not file.closed:\n"
    "            file.close()\n"
    "            print('Cleanup: File handle safely closed.')"
)
P2_M16_QS = [
    case_q("Exception Handling and File Streams", "Role of try-except Blocks",
           "What is the primary purpose of wrapping file operations inside a try-except construct?",
           "To intercept anticipated runtime errors gracefully without terminating the program abnormally",
           ["To speed up file reading speed", "To make Python files read-only", "To compile Python scripts into machine code"],
           "Exception handling intercepts runtime exceptions, allowing the application to recover or report errors gracefully."),
    case_q("Exception Handling and File Streams", "FileNotFoundError Interception",
           "Under what condition does the control flow jump directly to except FileNotFoundError:?",
           "When the specified filename cannot be located in the designated filesystem path",
           ["When the file contains letters instead of numbers", "When the hard drive is full", "When the file is completely empty"],
           "FileNotFoundError is raised when attempting to open a non-existent file path."),
    case_q("Exception Handling and File Streams", "The else Block Role",
           "When does the code inside the else: block execute in a Python try-except-else-finally structure?",
           "Only when the try block executes to completion without raising any exception",
           ["Whenever an exception occurs", "Before the try block runs", "Only if finally fails"],
           "The else block runs only if the code in the try block executed successfully with zero exceptions raised."),
    case_q("Exception Handling and File Streams", "Guaranteed Cleanup via finally",
           "Why is file.close() placed inside the finally: block?",
           "Because the finally block is guaranteed to execute under all circumstances, whether exceptions occurred or not",
           ["Because finally runs twice as fast", "Because files cannot close outside finally", "To delete the file"],
           "The finally block always executes regardless of whether exceptions were raised or handled, ensuring resource cleanup."),
    case_q("Exception Handling and File Streams", "ValueError Root Cause",
           "What causes a ValueError in the expression float(line.strip())?",
           "Attempting to convert a non-numeric string (e.g., 'Discount' or 'N/A') into a floating-point number",
           ["The file is too large", "The number is equal to zero", "The string contains only digits"],
           "float() raises ValueError when passed a string that does not represent a valid numerical format.")
]

# ==============================================================================
# MOCK 17 PASSAGES
# ==============================================================================
P1_M17_TXT = (
    "Read the following transmission media case study and answer the questions that follow:\n\n"
    "HighSpeed Rail Corporation is deploying a communication network along a new 300-kilometer railway corridor. "
    "The engineering team evaluates different transmission media for signaling, automated train control, and passenger Wi-Fi:\n"
    "1. Unshielded Twisted Pair (UTP): Cost-effective for short connections inside stations (up to 100 meters), but susceptible "
    "to electromagnetic interference (EMI) generated by high-voltage electric train locomotives.\n"
    "2. Coaxial Cable: Better shielding than UTP, but bulky and high attenuation over long distances.\n"
    "3. Optical Fiber Cable: Transmits data as pulses of light through glass/plastic core via Total Internal Reflection. "
    "It provides massive bandwidth (gigabits to terabits per second), minimal signal attenuation over tens of kilometers, "
    "and total immunity to electromagnetic interference from electric traction lines.\n"
    "4. Wireless Radio (GSM-R / LTE-R): Provides continuous wireless train-to-ground telemetry while in transit."
)
P1_M17_QS = [
    case_q("Computer Networks", "Optical Fiber Physics Mechanism",
           "What optical physics phenomenon enables light signals to propagate through the glass core of an optical fiber?",
           "Total Internal Reflection",
           ["Optical Dispersion", "Electromagnetic Induction", "Radioactive Decay"],
           "Optical fiber cables transmit signals as pulses of light guided by total internal reflection within the optical core."),
    case_q("Computer Networks", "EMI Immunity in Railway Environments",
           "Why is Optical Fiber ideal for deploying alongside high-voltage electric railway tracks?",
           "Because optical fiber uses light pulses through dielectric glass, making it completely immune to electromagnetic interference (EMI)",
           ["Because optical fiber conducts 25,000 volts of electricity", "Because optical fiber is made of solid copper", "Because it is completely wireless"],
           "Being non-metallic, optical fiber does not conduct electricity and is impervious to EMI from traction currents."),
    case_q("Computer Networks", "Twisted Pair Maximum Distance",
           "What is the maximum reliable transmission distance of standard Category 6 UTP copper Ethernet cable before signal degradation requires a repeater?",
           "100 metres",
           ["500 metres", "10 kilometres", "1 metre"],
           "Standard twisted pair copper Ethernet cables are limited to 100 metres without intermediate amplification."),
    case_q("Computer Networks", "Twisting Mechanism in UTP",
           "Why are insulated copper wire pairs tightly twisted around each other inside UTP cables?",
           "To cancel out electromagnetic crosstalk and reduce external signal noise interference",
           ["To make the cable look thicker", "To increase the physical weight of the wire", "To trap heat inside"],
           "Twisting wire pairs balances electromagnetic interference, canceling out crosstalk between adjacent pairs."),
    case_q("Computer Networks", "Wireless Train Telemetry Media Classification",
           "Under which transmission media category does the train-to-ground GSM-R / LTE wireless link fall?",
           "Unguided (Wireless / Boundless) Transmission Media",
           ["Guided Transmission Media", "Optical Transmission Media", "Wired Bounded Media"],
           "Wireless radio frequency transmissions propagate through open space and are classified as Unguided Media.")
]

P2_M17_TXT = (
    "Read the following case study on weather station data analytics and answer the questions that follow:\n\n"
    "The Central Weather Monitoring Station collects hourly environmental readings from automated sensors across five monitoring posts. "
    "The dataset is stored in a Pandas DataFrame weather_df:\n"
    "Columns: ['PostID', 'Temperature', 'Humidity', 'WindSpeed', 'Rainfall']\n"
    "The station analyst conducts exploratory data analysis:\n"
    "1. Descriptive summary: weather_df.describe() computes count, mean, std, min, 25%, 50%, 75%, and max for all numeric columns.\n"
    "2. Identifying extreme temperature station: hottest_post = weather_df.loc[weather_df['Temperature'].idxmax(), 'PostID']\n"
    "3. Correlation analysis: weather_df[['Temperature', 'Humidity', 'Rainfall']].corr() computes pairwise Pearson correlation coefficients.\n"
    "4. Handling missing sensor values: Sensors occasionally drop out, recording NaN; the analyst drops records where Rainfall is null "
    "using weather_df.dropna(subset=['Rainfall'], inplace=True)."
)
P2_M17_QS = [
    case_q("Data Handling using Pandas - II", "Summary Statistics via describe()",
           "Which set of summary statistics is generated by weather_df.describe() for numerical columns?",
           "count, mean, std, min, 25%, 50% (median), 75%, and max",
           ["sum, variance, range, mode, and skewness only", "Only count and sum", "The first 5 and last 5 rows of data"],
           "describe() outputs standard 8-number statistical summaries for numerical columns."),
    case_q("Data Handling using Pandas - II", "Locating Max Index via idxmax()",
           "What does weather_df['Temperature'].idxmax() return?",
           "The row index label where the highest temperature reading occurs",
           ["The maximum temperature value itself as a float", "The count of maximum temperatures", "The column name 'Temperature'"],
           "idxmax() returns the index label associated with the maximum value in the Series."),
    case_q("Data Handling using Pandas - II", "Targeted Row Dropping with subset",
           "What does weather_df.dropna(subset=['Rainfall'], inplace=True) do?",
           "Drops only those rows where the 'Rainfall' column has a NaN value, preserving rows with NaNs in other columns",
           ["Drops the entire 'Rainfall' column", "Replaces NaNs in Rainfall with 0", "Drops all rows in the DataFrame"],
           "The subset parameter restricts missing value row-dropping specifically to the designated columns."),
    case_q("Data Handling using Pandas - II", "Correlation Matrix Range",
           "What is the mathematical range of Pearson correlation coefficients generated by weather_df.corr()?",
           "Between -1.0 (perfect negative correlation) and +1.0 (perfect positive correlation)",
           ["Between 0.0 and 100.0", "Between 0 and infinity", "Between -100 and +100"],
           "Pearson correlation coefficients range strictly from -1.0 to +1.0 (0 indicating no linear relationship)."),
    case_q("Data Handling using Pandas - II", "Median vs 50% Percentile",
           "Which statistic in the describe() output is mathematically identical to weather_df['Temperature'].median()?",
           "The '50%' quartile value",
           ["The 'mean' value", "The '25%' value", "The '75%' value"],
           "The 50th percentile (second quartile Q2) is by definition the median of the distribution.")
]

# ==============================================================================
# MOCK 18 PASSAGES
# ==============================================================================
P1_M18_TXT = (
    "Read the following case study on software licensing and cyber law in a tech startup and answer the questions that follow:\n\n"
    "A technology startup, AI-Vidyarthi, develops an educational chatbot. "
    "During development, the team incorporates software components governed by different licenses:\n"
    "1. Module A uses an open source Python web library under the permissive MIT License, which allows commercial use, modification, "
    "and closed-source distribution as long as the original copyright notice is retained.\n"
    "2. Module B incorporates a speech-recognition library distributed under the GNU General Public License (GPL v3), "
    "which contains a 'copyleft' clause requiring any distributed derivative software to be open-sourced under GPL v3.\n"
    "3. An unauthorized former contractor steals the startup's customer database and sells customer identities on the dark web. "
    "The startup files a criminal complaint under the Indian Information Technology Act, 2000, charging the offender under "
    "Section 66C (Identity Theft) and Section 43 (Damage to Computer Systems and Data Theft)."
)
P1_M18_QS = [
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Permissive vs Copyleft Licensing",
           "What is the primary operational distinction between the MIT License and the GNU GPL v3 License?",
           "MIT is a permissive license allowing proprietary commercial reuse; GPL is a copyleft license requiring derivative works to remain open source under GPL",
           ["MIT requires paying royalties while GPL is completely free", "GPL forbids all commercial use", "MIT software cannot run on Linux"],
           "MIT permits embedding into proprietary closed-source applications; GPL mandates that derivative works remain open source."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "GPL Incompatibility with Closed Source",
           "What legal consequence arises if AI-Vidyarthi embeds GPL v3 code into a proprietary closed-source product and distributes it?",
           "It violates the GPL copyleft terms and commits copyright infringement unless the derivative source code is made public",
           ["Nothing, because all open source code is in the public domain", "The software runs 50% slower", "The government seizes the computers"],
           "Distributing a derivative work containing GPL code obligates the distributor to release the complete source code under GPL."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "IT Act Section 43 Provisions",
           "What offenses are penalized under Section 43 of the Indian Information Technology Act, 2000?",
           "Unauthorized downloading, copying, extracting, or damaging data from a computer system without owner permission",
           ["Writing Python code without a license", "Failing to pay broadband internet bills", "Selling second-hand monitors"],
           "Section 43 covers civil liabilities for unauthorized data extraction, system disruption, and damage to computer networks."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Section 66C Identity Theft Sanctions",
           "Which cyber crime is explicitly prosecuted under Section 66C of the IT Act 2000?",
           "Fraudulent or dishonest use of another person's digital signature, password, or unique identification feature",
           ["Sending an unsolicited marketing email", "Browsing Wikipedia anonymously", "Creating a personal blog"],
           "Section 66C penalizes identity theft involving unauthorized passwords, biometric data, or digital signatures."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Public Domain Software Status",
           "What characterizes software placed in the 'Public Domain'?",
           "The creator has relinquished all copyright claims, allowing anyone to use, modify, or sell the software without restrictions or attribution",
           ["The software is owned by the United Nations", "The software is encrypted with public keys", "The software can only be run in public parks"],
           "Public domain software has no copyright restrictions, granting unrestricted freedom of use.")
]

P2_M18_TXT = (
    "Read the following case study on recursive algorithms in Python and answer the questions that follow:\n\n"
    "An operating systems developer writes a Python script to calculate the total storage footprint of nested directory trees. "
    "Because folders can contain files as well as nested subfolders to arbitrary depths, the developer uses recursion:\n\n"
    "def get_dir_size(path):\n"
    "    total_size = 0\n"
    "    for entry in os.scandir(path):\n"
    "        if entry.is_file():\n"
    "            total_size += entry.stat().st_size\n"
    "        elif entry.is_dir():\n"
    "            total_size += get_dir_size(entry.path)  # Recursive Call\n"
    "    return total_size\n\n"
    "The function computes leaf file sizes directly (base condition) and recursively invokes get_dir_size() for nested directories. "
    "Each recursive invocation pushes a new stack frame onto the Python call stack, maintaining independent local variables for total_size."
)
P2_M18_QS = [
    case_q("Python Recursion and Algorithmic Tracing", "Recursive Tree Traversal Logic",
           "Why is recursion naturally suited for traversing nested directory structures?",
           "Because directory structures have a hierarchical, self-similar tree architecture where each subfolder is itself a directory tree",
           ["Because loops cannot open files in Python", "Because recursion uses zero RAM", "Because operating systems do not support lists"],
           "Tree data structures (like directory systems) are inherently recursive: a node contains subtrees of the same type."),
    case_q("Python Recursion and Algorithmic Tracing", "Base Case Identification",
           "What condition acts as the base step in get_dir_size() where execution accumulates size without initiating another recursive call?",
           "When entry.is_file() is True, accumulating file bytes directly",
           ["When entry.is_dir() is True", "When the computer is shut down", "When total_size reaches 1 GB"],
           "Inspecting a leaf file accumulates its byte size directly without invoking further recursion, terminating that branch."),
    case_q("Python Recursion and Algorithmic Tracing", "Independent Local Scope in Recursion",
           "Why does the variable total_size in a parent folder call not get overwritten by total_size in a nested subfolder call?",
           "Because each recursive function call creates a separate stack frame with its own independent local variable scope",
           ["Because total_size is a global variable", "Because Python renames variables automatically", "Because numbers are immutable"],
           "Each invocation allocates a new activation frame on the call stack containing its own distinct local variables."),
    case_q("Python Recursion and Algorithmic Tracing", "Deep Nesting Call Stack Limit",
           "What potential issue could arise if a directory structure contains circular symlinks or folder depths exceeding 1,000 levels?",
           "RecursionError: maximum recursion depth exceeded in comparison",
           ["The hard drive formats automatically", "SyntaxError", "ZeroDivisionError"],
           "Traversing beyond Python's default stack limit (1000 frames) or entering an infinite recursive loop raises RecursionError."),
    case_q("Python Recursion and Algorithmic Tracing", "Iterative Alternative using Queues/Stacks",
           "How can the developer rewrite the directory traversal without recursion to avoid stack overflow completely?",
           "By maintaining an explicit queue or stack data structure in heap memory inside an iterative while loop",
           ["By setting file sizes to negative", "By using a lambda function", "By deleting all files"],
           "An iterative loop using an explicit stack or queue in heap memory can traverse trees of arbitrary depth without call stack limits.")
]

# ==============================================================================
# MOCK 19 PASSAGES
# ==============================================================================
P1_M19_TXT = (
    "Read the following relational database and transaction processing case study and answer the questions that follow:\n\n"
    "A core banking engine processes fund transfers between checking accounts in a MySQL database. "
    "A balance transfer of 10,000 from Account 101 to Account 102 involves two distinct database operations:\n"
    "1. UPDATE ACCOUNT SET Balance = Balance - 10000 WHERE AccNo = 101;\n"
    "2. UPDATE ACCOUNT SET Balance = Balance + 10000 WHERE AccNo = 102;\n\n"
    "To guarantee data consistency, the transaction is managed according to ACID properties:\n"
    "- Atomicity: Either both updates succeed completely or neither update takes effect (all-or-nothing).\n"
    "- Consistency: Account balances must satisfy domain rules (e.g. Balance >= MinBalance) before and after execution.\n"
    "- Isolation: Concurrent transactions operating simultaneously do not read intermediate uncommitted balances.\n"
    "- Durability: Once con.commit() executes, balance changes persist permanently on non-volatile disk storage even if a power failure occurs."
)
P1_M19_QS = [
    case_q("Database Concepts and SQL", "ACID Atomicity Principle",
           "What happens under the 'Atomicity' principle if a system crash occurs after deducting 10,000 from Acc 101 but before crediting Acc 102?",
           "The database performs a ROLLBACK, undoing the deduction on Acc 101 so that no funds are lost",
           ["The 10,000 is permanently deleted from the banking system", "Acc 102 receives double the money", "The database ignores the crash"],
           "Atomicity ensures all-or-nothing execution; incomplete transactions are automatically rolled back upon recovery."),
    case_q("Database Concepts and SQL", "ACID Durability Principle",
           "Which SQL command makes transactions permanent on disk, guaranteeing 'Durability'?",
           "COMMIT",
           ["ROLLBACK", "SAVEPOINT", "CHECKPOINT"],
           "COMMIT finalizes changes permanently on storage, fulfilling the durability requirement of ACID."),
    case_q("Database Concepts and SQL", "ACID Isolation Guarantee",
           "What does the 'Isolation' property prevent during simultaneous banking transactions?",
           "Dirty reads and concurrent transactions interfering with each other's uncommitted intermediate data",
           ["Power outages in data centers", "Hardware hard drive crashes", "Employees forgetting passwords"],
           "Isolation ensures concurrently executing transactions operate independently without seeing incomplete intermediate states."),
    case_q("Database Concepts and SQL", "Rolling Back to an Intermediate Point",
           "Which SQL command establishes an intermediate marker inside a transaction to which a partial rollback can be performed?",
           "SAVEPOINT marker_name;",
           ["CHECKPOINT marker_name;", "MARK marker_name;", "RESTORE marker_name;"],
           "SAVEPOINT identifies a point in a transaction to which you can later roll back without discarding earlier work."),
    case_q("Database Concepts and SQL", "DCL vs TCL Classification",
           "Under which SQL language subcategory do COMMIT, ROLLBACK, and SAVEPOINT belong?",
           "Transaction Control Language (TCL)",
           ["Data Definition Language (DDL)", "Data Manipulation Language (DML)", "Data Control Language (DCL)"],
           "COMMIT, ROLLBACK, and SAVEPOINT manage database transactions and belong to TCL.")
]

P2_M19_TXT = (
    "Read the following case study on e-waste policies and circular electronics economy and answer the questions that follow:\n\n"
    "The Ministry of Environment, Forest and Climate Change (MoEFCC) notified revised E-Waste Management Rules in India. "
    "The regulatory framework seeks to transition from a linear 'take-make-dispose' model to a Circular Electronics Economy:\n"
    "1. Restriction of Hazardous Substances (RoHS): Manufacturers must phase out hazardous materials including lead (Pb), "
    "mercury (Hg), cadmium (Cd), and hexavalent chromium in manufacturing consumer electronics.\n"
    "2. Extended Producer Responsibility (EPR) Portals: Producers must register on an online national portal, meet annual e-waste recycling targets, "
    "and purchase EPR Certificates from authorized recyclers.\n"
    "3. Scientific Material Recovery: Formal recycling plants utilize state-of-the-art smelting and automated separation "
    "to recover precious metals (gold, silver, palladium) and base metals (copper, aluminum), reintroducing them into industrial supply chains."
)
P2_M19_QS = [
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "RoHS Compliance Scope",
           "What is the primary objective of RoHS (Restriction of Hazardous Substances) compliance in electronics manufacturing?",
           "Limiting the concentration of toxic substances (lead, mercury, cadmium, hexavalent chromium) in newly manufactured electrical equipment",
           ["Ensuring all laptops have touchscreens", "Making all computer screens 4K resolution", "Regulating software download prices"],
           "RoHS restricts specific hazardous substances commonly used in electronic hardware and solder."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Circular Economy Concept in IT",
           "How does a 'Circular Economy' differ from a linear electronics consumption model?",
           "Products and materials are designed for reuse, repair, refurbishment, and closed-loop material recycling, minimizing virgin resource extraction",
           ["Discarded laptops are thrown into landfills faster", "Hardware is engineered to break after one year", "Only paper computers are manufactured"],
           "A circular economy keeps materials in continuous productive use through refurbishment, reuse, and closed-loop recycling."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "EPR Certificate Mechanism",
           "How do electronics manufacturers demonstrate compliance with annual recycling quotas under Indian e-waste regulations?",
           "By generating or purchasing verified Extended Producer Responsibility (EPR) certificates from registered formal recycling facilities",
           ["By burning discarded monitors in corporate parking lots", "By publishing newspaper advertisements", "By paying import tariffs"],
           "EPR certificates earned through registered recycling substantiate producer compliance with statutory recycling quotas."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Formal vs Informal Recycling Differences",
           "Why is formal recycling technologically superior to informal scrapyard recycling?",
           "Formal plants achieve high precious metal recovery efficiency using closed pollution-controlled systems without venting toxic effluents",
           ["Formal plants use open bonfire burning", "Formal plants do not use electricity", "Informal scrapyards have better safety equipment"],
           "Formal recycling applies controlled industrial metallurgical recovery with air filtration and zero liquid discharge."),
    case_q("Societal Impacts, Cyber Ethics and Data Protection", "Citizen Role in E-waste Management",
           "What is the responsible protocol for individual consumers when disposing of obsolete mobile phones and laptops?",
           "Handing them over to authorized e-waste collection bins or brand buyback centers rather than mixed municipal trash or ragpickers",
           ["Throwing them into municipal wet waste bins", "Burying them in home gardens", "Flushing broken components down toilets"],
           "Consumers must channel end-of-life electronics to designated authorized e-waste collection points.")
]

# ==============================================================================
# MOCK 20 PASSAGES
# ==============================================================================
P1_M20_TXT = (
    "Read the following comprehensive campus networking project case study and answer the questions that follow:\n\n"
    "Greenwood International School is constructing a state-of-the-art campus network across three buildings:\n"
    "- Academic Wing (120 computers, distance to Admin: 90 m, distance to Sports Complex: 140 m)\n"
    "- Administrative Wing (40 computers, distance to Sports Complex: 110 m)\n"
    "- Sports Complex (15 computers)\n\n"
    "The IT advisory committee lays down implementation guidelines:\n"
    "1. Server Location: The main Server Room will be established in the Academic Wing due to its highest computer concentration (80-20 rule).\n"
    "2. Inter-Building Backbone: Optical fiber cable connects the Academic Wing to the Administrative Wing and Sports Complex, "
    "providing high speed and immunity to lightning/EMI.\n"
    "3. Local Cabling: Inside each wing, workstations connect to central switches in a Star Topology using Category 6 UTP cables.\n"
    "4. Security: The entire campus network connects to the ISP router through a Hardware Gateway Firewall providing NAT, "
    "content filtering, and blocking unauthorized inbound traffic.\n"
    "5. Wireless: Classrooms are equipped with Wi-Fi 6 Access Points broadcasting an encrypted SSID for faculty laptops."
)
P1_M20_QS = [
    case_q("Computer Networks", "Server Placement Decision",
           "Why is the Academic Wing selected as the optimal location for the campus server room?",
           "It houses the maximum number of workstations (120 computers), minimizing cross-campus network traffic",
           ["It has the largest sports field", "It is painted green", "It has the fewest computers"],
           "Placing the central server in the wing with the highest computer density optimizes bandwidth and reduces inter-building latency."),
    case_q("Computer Networks", "Inter-Building Media Selection",
           "Why is Optical Fiber Cable chosen over copper twisted pair for interconnecting the wings across 140 metres?",
           "Because copper UTP Ethernet is limited to 100 metres, whereas fiber optic easily spans 140 metres with high bandwidth and zero attenuation",
           ["Because optical fiber is made of plastic string", "Because copper cables do not work outdoors", "Because fiber optic requires no electricity"],
           "UTP cables have a 100m distance limitation; optical fiber easily traverses 140m+ with high bandwidth and low attenuation."),
    case_q("Computer Networks", "Hardware Gateway Firewall Role",
           "What critical security role does the Gateway Firewall perform at the campus perimeter?",
           "Inspects data packets entering and exiting the school network, enforcing security rules and blocking cyber threats",
           ["Increases internet speeds by 500%", "Prints student report cards automatically", "Cools the server room"],
           "A gateway firewall acts as a defensive barrier inspecting, filtering, and blocking unauthorized external traffic."),
    case_q("Computer Networks", "Internal Star Topology Benefit",
           "What is the primary operational advantage of connecting computers via a central switch in each building?",
           "A malfunction in a single computer or cable does not disrupt network communication among other hosts",
           ["It uses less cable than a bus topology", "It eliminates the need for network adapters", "It works without electrical power"],
           "In a star topology, each node has a dedicated link to the central switch, isolating individual cable faults."),
    case_q("Computer Networks", "Access Point Role in Wireless Networks",
           "What is the function of a Wireless Access Point (WAP) in the school network architecture?",
           "Bridges wireless Wi-Fi devices into the wired local area network infrastructure",
           ["Generates electricity for laptops", "Acts as an optical fiber cable", "Translates Python into English"],
           "A WAP connects wireless client devices to the wired Ethernet network backbone.")
]

P2_M20_TXT = (
    "Read the following case study on an end-to-end data pipeline in Pandas and Pyplot and answer the questions that follow:\n\n"
    "A retail business analyst builds an automated reporting pipeline in Python to analyze monthly store revenue from 'sales_data.csv'.\n"
    "The script executes the following stages:\n"
    "1. Ingestion: df = pd.read_csv('sales_data.csv') loads 12 monthly records into a DataFrame with columns ['Month', 'Sales', 'Expenses'].\n"
    "2. Data Cleaning: Incomplete records with NaN values are filled using df.fillna(df.mean(numeric_only=True), inplace=True).\n"
    "3. Derived Metrics: A new column 'Profit' is calculated: df['Profit'] = df['Sales'] - df['Expenses'].\n"
    "4. Statistical Aggregation: Total annual revenue is computed via total_sales = df['Sales'].sum(), "
    "and the best performing month is identified using best_month = df.loc[df['Profit'].idxmax(), 'Month'].\n"
    "5. Visualization: A line plot compares monthly Sales and Expenses over time with grid lines and custom styling: "
    "plt.plot(df['Month'], df['Sales'], label='Sales', color='blue', marker='o')\n"
    "plt.plot(df['Month'], df['Expenses'], label='Expenses', color='red', linestyle='--')\n"
    "plt.legend(); plt.savefig('annual_report.png'); plt.show()"
)
P2_M20_QS = [
    case_q("Data Handling and Visualization", "Numeric-only Mean Imputation",
           "Why did the analyst specify numeric_only=True in df.mean(numeric_only=True)?",
           "To compute mean values only for numeric columns ('Sales', 'Expenses') while ignoring non-numeric string columns like 'Month'",
           ["To convert numbers into Roman numerals", "To delete the 'Month' column permanently", "To prevent the script from running on Sundays"],
           "numeric_only=True instructs mean() to operate exclusively on numeric data types, avoiding TypeErrors on string columns."),
    case_q("Data Handling and Visualization", "Vectorized Profit Calculation",
           "How does df['Profit'] = df['Sales'] - df['Expenses'] evaluate in Pandas?",
           "Subtracts Expenses from Sales element-by-element across corresponding rows in a vectorized operation",
           ["Executes a slow Python for loop under the hood", "Subtracts the sum of expenses from the first sale only", "Converts numbers to text"],
           "Pandas evaluates arithmetic expressions between Series element-wise in a fast, vectorized manner."),
    case_q("Data Handling and Visualization", "Identifying Best Month with idxmax()",
           "How does df.loc[df['Profit'].idxmax(), 'Month'] successfully identify the top month?",
           "df['Profit'].idxmax() finds the index label of the highest profit, and df.loc retrieves the matching 'Month' value",
           ["It sorts the DataFrame alphabetically and picks the last row", "It counts the number of months", "It calculates the average month"],
           "idxmax() extracts the index of the maximum value, which loc uses to fetch the corresponding column attribute."),
    case_q("Data Handling and Visualization", "Multiple Lines on Same Figure",
           "How did the script plot both Sales and Expenses lines onto the same chart axes?",
           "By invoking plt.plot() twice with different data and labels before calling plt.show()",
           ["By merging the two columns into a single string", "By opening two separate browser tabs", "By running the Python script twice"],
           "Calling plt.plot() multiple times before calling plt.show() layers multiple data series onto the current active axes."),
    case_q("Data Handling and Visualization", "Saving Before Displaying",
           "Why is plt.savefig('annual_report.png') called before plt.show() in the visualization pipeline?",
           "Because plt.show() may clear the figure canvas after display, which could result in saving a blank image if called afterwards",
           ["Because savefig() cannot write PNG files after 5 PM", "Because show() deletes the script file", "Because savefig() requires an open window"],
           "In Matplotlib scripts, plt.show() flushes the figure canvas; savefig() should precede show() to ensure content is saved.")
]

# ==============================================================================
# PASSAGES COMPILATION
# ==============================================================================
PASSAGES_11_20 = [
    ((P1_M11_TXT, P1_M11_QS), (P2_M11_TXT, P2_M11_QS)),
    ((P1_M12_TXT, P1_M12_QS), (P2_M12_TXT, P2_M12_QS)),
    ((P1_M13_TXT, P1_M13_QS), (P2_M13_TXT, P2_M13_QS)),
    ((P1_M14_TXT, P1_M14_QS), (P2_M14_TXT, P2_M14_QS)),
    ((P1_M15_TXT, P1_M15_QS), (P2_M15_TXT, P2_M15_QS)),
    ((P1_M16_TXT, P1_M16_QS), (P2_M16_TXT, P2_M16_QS)),
    ((P1_M17_TXT, P1_M17_QS), (P2_M17_TXT, P2_M17_QS)),
    ((P1_M18_TXT, P1_M18_QS), (P2_M18_TXT, P2_M18_QS)),
    ((P1_M19_TXT, P1_M19_QS), (P2_M19_TXT, P2_M19_QS)),
    ((P20_M1_TXT if False else P1_M20_TXT, P1_M20_QS), (P2_M20_TXT, P2_M20_QS))
]

assert len(PASSAGES_11_20) == 10, f"Expected 10 passage pairs, got {len(PASSAGES_11_20)}"
for idx, (p1, p2) in enumerate(PASSAGES_11_20, 11):
    assert len(p1[1]) == 5, f"Mock {idx} P1 has {len(p1[1])} questions instead of 5"
    assert len(p2[1]) == 5, f"Mock {idx} P2 has {len(p2[1])} questions instead of 5"

print(f"CS Passages 11 to 20 compiled successfully: {len(PASSAGES_11_20)} pairs (20 passages, 100 questions).")
