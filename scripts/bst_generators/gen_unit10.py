import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.bst_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text,
    get_pyq_normalized_set
)

CHAPTER = "Financial Markets"
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

print("Generating 60 unique questions for Unit 10: Financial Markets...")

# =================================================================================================
# 1. Concept, Functions of Financial Market & Money Market Instruments (Q1 - Q12)
# =================================================================================================

opts, corr, sol = rotate_options(
    "A market for the creation and exchange of financial assets such as shares, debentures, and treasury bills",
    [
        "A physical wholesale market for trading agricultural vegetables and fruits",
        "A statutory administrative tribunal handling municipal property disputes",
        "A labor union federation negotiating factory minimum wage settlements"
    ],
    "A",
    "1. A financial market is a market for the creation and exchange of financial assets, linking savers (households) with investors (business enterprises).\nHence, Option {{CORR}} is correct.",
    "Defines Financial Market."
)
add_q(make_question(CHAPTER, "Concept of Financial Market", "Which statement best defines a 'Financial Market' in modern economic theory?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Mobilization of savings and channeling them into the most productive uses (Allocative Function)",
    [
        "Printing physical legal tender currency notes for commercial banks",
        "Eliminating corporate taxation on international trade transactions",
        "Enforcing criminal penalties on uncompetitive retail businesses"
    ],
    "B",
    "1. The allocative function of financial markets transfers savings from households to enterprises where they can be deployed in the most productive investment opportunities.\nHence, Option {{CORR}} is correct.",
    "Highlights allocative function of financial markets."
)
add_q(make_question(CHAPTER, "Functions of Financial Market", "Channeling household savings into the most productive corporate business investments is known as the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Facilitating price discovery through interaction of demand and supply forces",
    [
        "Imposing mandatory state price controls on all commercial securities",
        "Fixing interest rates arbitrarily by private business federations",
        "Guaranteeing risk-free 100% financial profits to every investor"
    ],
    "C",
    "1. Financial markets facilitate price discovery by allowing the continuous interaction of demand from households and supply from firms to determine prices of securities.\nHence, Option {{CORR}} is correct.",
    "Highlights price discovery through demand and supply."
)
add_q(make_question(CHAPTER, "Functions of Financial Market", "How do financial markets establish the market valuation and prices of financial securities?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Providing liquidity to financial assets",
    [
        "Abolishing stock market brokerage fees",
        "Nationalizing all private corporations",
        "Restricting trades exclusively to government officials"
    ],
    "D",
    "1. Financial markets facilitate easy purchase and sale of financial assets, providing liquidity so investors can convert securities into cash readily.\nHence, Option {{CORR}} is correct.",
    "Highlights providing liquidity to financial assets."
)
add_q(make_question(CHAPTER, "Functions of Financial Market", "Allowing investors to readily buy and sell securities and convert them into liquid cash whenever required represents:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Reducing the cost of transactions by providing valuable information on securities",
    [
        "Exempting investors from filing annual personal income tax returns",
        "Compelling banks to provide interest-free commercial loans",
        "Eliminating all credit risk in corporate debenture investments"
    ],
    "A",
    "1. Financial markets provide complete, transparent information regarding price, availability, and cost of securities, saving time and transaction costs for both buyers and sellers.\nHence, Option {{CORR}} is correct.",
    "Highlights reducing cost of transactions."
)
add_q(make_question(CHAPTER, "Functions of Financial Market", "Providing a common transparent platform with complete market data that saves participants time and search costs reflects:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A market for short-term financial assets with maturity periods up to one year",
    [
        "A market for 50-year irredeemable corporate debentures",
        "A specialized commodity exchange for physical gold bullion",
        "A banking tribunal resolving bad debt non-performing assets"
    ],
    "B",
    "1. Money Market is a market for short-term funds dealing in monetary assets whose period of maturity is up to one year (e.g., T-Bills, Commercial Paper).\nHence, Option {{CORR}} is correct.",
    "Defines Money Market."
)
add_q(make_question(CHAPTER, "Money Market", "What characterizes the 'Money Market' in terms of maturity duration?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Treasury Bill (T-Bill) / Zero Coupon Bond",
    [
        "Commercial Paper",
        "Call Money",
        "Certificate of Deposit"
    ],
    "C",
    "1. Treasury Bills are promissory notes issued by the Reserve Bank of India on behalf of the Government of India to meet short-term borrowing needs, issued at a discount and redeemed at par.\nHence, Option {{CORR}} is correct.",
    "Defines Treasury Bill."
)
add_q(make_question(CHAPTER, "Money Market Instruments", "A short-term sovereign debt instrument issued by the RBI on behalf of the Government of India at a discount is a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "₹25,000 and in multiples thereof",
    [
        "₹100 and in multiples thereof",
        "₹1,000 and in multiples thereof",
        "₹10,00,000 and in multiples thereof"
    ],
    "D",
    "1. Treasury bills are available for a minimum amount of ₹25,000 and in multiples thereof, with maturity ranging from 14 to 364 days.\nHence, Option {{CORR}} is correct.",
    "States minimum denomination of Treasury Bills."
)
add_q(make_question(CHAPTER, "Money Market Instruments", "What is the minimum statutory denomination for purchasing a Treasury Bill in India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Commercial Paper (CP)",
    [
        "Treasury Bill",
        "Call Money",
        "Commercial Bill"
    ],
    "A",
    "1. Commercial Paper is an unsecured promissory note issued by large creditworthy business corporations to raise short-term funds, with maturity between 15 days to 1 year.\nHence, Option {{CORR}} is correct.",
    "Defines Commercial Paper."
)
add_q(make_question(CHAPTER, "Money Market Instruments", "An unsecured negotiable promissory note issued by highly rated, creditworthy corporations with a maturity of 15 days to one year is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Bridge Financing (raising short-term funds to defray the floatation costs of issuing new equity shares)",
    [
        "Permanent liquidation of existing corporate debenture liabilities",
        "Purchasing large agricultural plantations in foreign territories",
        "Paying long-term pension benefits to retired factory supervisors"
    ],
    "B",
    "1. Companies frequently issue Commercial Paper for 'Bridge Financing'—raising immediate short-term cash to pay floatation costs (underwriting, prospectus fees) of long-term equity issues.\nHence, Option {{CORR}} is correct.",
    "Identifies bridge financing use of Commercial Paper."
)
add_q(make_question(CHAPTER, "Money Market Instruments", "What is the primary practical purpose of 'Bridge Financing' using Commercial Paper?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Call Money",
    [
        "Treasury Bill",
        "Commercial Paper",
        "Certificate of Deposit"
    ],
    "C",
    "1. Call Money is short-term inter-bank finance with a maturity period of 1 day to 15 days, used by commercial banks to maintain mandatory Cash Reserve Ratio (CRR).\nHence, Option {{CORR}} is correct.",
    "Defines Call Money."
)
add_q(make_question(CHAPTER, "Money Market Instruments", "Short-term inter-bank lending with a maturity of 1 to 15 days used by commercial banks to maintain their statutory Cash Reserve Ratio (CRR) is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Certificate of Deposit (CD)",
    [
        "Call Money",
        "Commercial Bill",
        "Treasury Bill"
    ],
    "D",
    "1. Certificates of Deposit are unsecured, negotiable instruments in bearer form issued by commercial banks and development financial institutions to mobilize large funds during tight liquidity.\nHence, Option {{CORR}} is correct.",
    "Defines Certificate of Deposit."
)
add_q(make_question(CHAPTER, "Money Market Instruments", "An unsecured, negotiable short-term bearer instrument issued by commercial banks during periods of tight market liquidity is a:", opts, corr, sol))

# =================================================================================================
# 2. Capital Market: Primary Market Floatation Methods & Secondary Market (Q13 - Q24)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Commercial Bill (Trade Bill / Bill of Exchange)",
    [
        "Treasury Bill",
        "Commercial Paper",
        "Call Money"
    ],
    "A",
    "1. A Commercial Bill is a bill of exchange drawn by a business firm on another buyer to finance the working capital credit sales of goods, easily discounted with commercial banks.\nHence, Option {{CORR}} is correct.",
    "Defines Commercial Bill."
)
add_q(make_question(CHAPTER, "Money Market Instruments", "A bill of exchange drawn by a seller on a buyer to finance credit sales of goods and discounted with commercial banks is a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Money Market deals in short-term funds up to 1 year; Capital Market deals in medium and long-term funds",
    [
        "Money Market deals in equity shares; Capital Market deals in physical cash",
        "Money Market is strictly for foreign tourists; Capital Market is for domestic citizens",
        "Money Market has zero regulatory oversight; Capital Market is run by police"
    ],
    "B",
    "1. The primary distinction is maturity duration: Money market provides short-term funds (up to 1 year), whereas Capital market provides medium and long-term funds.\nHence, Option {{CORR}} is correct.",
    "Contrasts Money Market and Capital Market by maturity."
)
add_q(make_question(CHAPTER, "Money vs Capital Market", "What is the primary difference in maturity duration between the 'Money Market' and the 'Capital Market'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Primary Market deals in new securities; Secondary Market deals in existing securities",
    [
        "Primary Market is in Mumbai; Secondary Market is in New Delhi",
        "Primary Market is exclusively for debentures; Secondary Market is for government bonds",
        "Primary Market is run by brokers; Secondary Market is run by the RBI"
    ],
    "C",
    "1. The Primary Market (New Issues Market) is for issuing new securities directly by companies to investors. The Secondary Market (Stock Exchange) is for trading previously issued securities.\nHence, Option {{CORR}} is correct.",
    "Contrasts Primary and Secondary Markets."
)
add_q(make_question(CHAPTER, "Primary vs Secondary Market", "What is the fundamental distinction between the 'Primary Market' and the 'Secondary Market'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Offer through Prospectus (Public Issue)",
    [
        "Offer for Sale",
        "Private Placement",
        "Rights Issue"
    ],
    "D",
    "1. Offer through Prospectus is the most popular method of raising funds by public companies in primary markets by directly inviting the public to subscribe via a formal prospectus.\nHence, Option {{CORR}} is correct.",
    "Defines Offer through Prospectus."
)
add_q(make_question(CHAPTER, "Methods of Floatation", "Inviting the public to subscribe directly to new securities by issuing a comprehensive formal document is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Offer for Sale",
    [
        "Rights Issue",
        "e-IPO",
        "Private Placement"
    ],
    "A",
    "1. Under Offer for Sale, securities are not issued directly to the public; instead, they are sold to intermediaries (issuing houses or stockbrokers) who resell them to investing public.\nHence, Option {{CORR}} is correct.",
    "Defines Offer for Sale."
)
add_q(make_question(CHAPTER, "Methods of Floatation", "A floatation method where a company sells an entire block of new securities to merchant bankers or stockbrokers who resell them to the public is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Private Placement",
    [
        "Offer through Prospectus",
        "Rights Issue",
        "e-IPO"
    ],
    "B",
    "1. Private Placement is the allotment of securities by a company to institutional investors and some selected individuals rather than offering them to the general public.\nHence, Option {{CORR}} is correct.",
    "Defines Private Placement."
)
add_q(make_question(CHAPTER, "Methods of Floatation", "Allotting corporate securities directly to institutional investors (LIC, UTI, banks) and selected clients without a public issue is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Rights Issue",
    [
        "Offer for Sale",
        "Private Placement",
        "Direct Recruitment"
    ],
    "C",
    "1. Rights Issue is a privilege offered to existing equity shareholders to subscribe to new shares in proportion to the number of shares they already hold.\nHence, Option {{CORR}} is correct.",
    "Defines Rights Issue."
)
add_q(make_question(CHAPTER, "Methods of Floatation", "Offering existing equity shareholders the preferential right to purchase new shares in proportion to their current shareholding is a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "e-IPOs (Electronic Initial Public Offers)",
    [
        "Offer for Sale",
        "Commercial Paper",
        "Call Money"
    ],
    "D",
    "1. Issuing shares to the public online through the registered on-line trading system of stock exchanges under SEBI guidelines is termed an e-IPO.\nHence, Option {{CORR}} is correct.",
    "Defines e-IPOs."
)
add_q(make_question(CHAPTER, "Methods of Floatation", "A company floating new shares to the public electronically through the automated online network of registered stock exchanges executes an:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Stock Exchange / Secondary Market",
    [
        "Primary Market",
        "Money Market",
        "Commercial Paper Agency"
    ],
    "A",
    "1. A Stock Exchange is an institution which provides a platform for buying and selling of existing securities, ensuring continuous liquidity and marketability.\nHence, Option {{CORR}} is correct.",
    "Defines Stock Exchange."
)
add_q(make_question(CHAPTER, "Stock Exchange", "An organized marketplace that provides a continuous mechanism for buying and selling already issued corporate securities is a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Providing continuous liquidity and marketability to existing securities",
    [
        "Fixing the national statutory bank interest rates on savings accounts",
        "Printing paper physical currency notes for the Ministry of Finance",
        "Granting direct diplomatic immunity to foreign sovereign investors"
    ],
    "B",
    "1. The primary function of a stock exchange is providing a ready and continuous market where existing securities can be converted into cash and vice-versa, ensuring liquidity.\nHence, Option {{CORR}} is correct.",
    "Highlights providing continuous liquidity as primary stock exchange function."
)
add_q(make_question(CHAPTER, "Stock Exchange Functions", "Which of the following is a primary economic function performed by a Stock Exchange?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Pricing of securities through the market forces of demand and supply",
    [
        "Arbitrary price determination by the Chairman of the exchange",
        "Government statutory price decrees published in gazettes",
        "Trade union negotiations held outside the exchange building"
    ],
    "C",
    "1. Stock exchanges provide valuation of securities through continuous competitive bidding by buyers and sellers, reflecting true economic worth.\nHence, Option {{CORR}} is correct.",
    "Highlights pricing of securities through demand and supply."
)
add_q(make_question(CHAPTER, "Stock Exchange Functions", "How does a stock exchange facilitate the fair valuation of listed company shares?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Safety of transactions ensured by strict listing agreements and regulatory codes",
    [
        "Unrestricted insider trading without judicial penalty",
        "Secret price manipulation by major corporate promoters",
        "Complete exemption from all national company laws"
    ],
    "D",
    "1. Only listed securities of verified companies adhering to strict regulatory frameworks and disclosures are traded, ensuring safety of transactions for public investors.\nHence, Option {{CORR}} is correct.",
    "Highlights safety of transactions."
)
add_q(make_question(CHAPTER, "Stock Exchange Functions", "Ensuring that only companies complying with transparent statutory disclosure rules are traded provides investors with:", opts, corr, sol))

# =================================================================================================
# 3. Stock Exchange Trading, Settlement, Demat, Depository (Q25 - Q36)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Selection of a registered broker and opening a Demat Account and Bank Account",
    [
        "Executing physical delivery of paper certificates at company gates",
        "Purchasing shares directly from the Reserve Bank of India",
        "Signing employment contracts with corporate factory managers"
    ],
    "A",
    "1. The first operational step in trading on a stock exchange is selecting a SEBI-registered broker and opening a Demat Account and trading bank account.\nHence, Option {{CORR}} is correct.",
    "Identifies broker selection and Demat account opening as step 1."
)
add_q(make_question(CHAPTER, "Trading Procedure", "What is the initial prerequisite step an individual investor must complete before trading on a stock exchange?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Permanent Account Number (PAN)",
    [
        "Passport Number",
        "Voter Identification Card",
        "Driving License Number"
    ],
    "B",
    "1. PAN (Permanent Account Number) is a mandatory statutory identification requirement for opening a Demat account and conducting stock exchange transactions.\nHence, Option {{CORR}} is correct.",
    "Identifies PAN as mandatory for trading."
)
add_q(make_question(CHAPTER, "Trading Procedure", "Which statutory identity credential is universally mandatory for opening a Demat account in India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Contract Note",
    [
        "Promissory Note",
        "Treasury Bill",
        "Delivery Challan"
    ],
    "C",
    "1. After an order is executed, the broker issues a 'Contract Note' within 24 hours containing details of the trade (number of shares, price, brokerage, order time).\nHence, Option {{CORR}} is correct.",
    "Defines Contract Note."
)
add_q(make_question(CHAPTER, "Trading Procedure", "The official confirmation document issued by a stockbroker within 24 hours of trade execution detailing transaction price and brokerage is the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "T+1 Rolling Settlement (settlement occurs on the next business day after trade day T)",
    [
        "T+15 Monthly Settlement",
        "T+30 Quarterly Settlement",
        "T+365 Annual Settlement"
    ],
    "D",
    "1. In modern Indian stock exchanges, equity trades are settled on a 'T+1 rolling settlement' basis, where 'T' is the trade day and settlement occurs on trade day plus one working day.\nHence, Option {{CORR}} is correct.",
    "Defines T+1 Rolling Settlement."
)
add_q(make_question(CHAPTER, "Trading Procedure", "In the Indian stock market, transactions are settled under which standardized rolling settlement timeframe?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Pay-in day is when brokers deliver securities/cash to exchange; Pay-out day is when exchange delivers securities/cash to brokers",
    [
        "Pay-in is for buying gold; Pay-out is for buying food",
        "Pay-in is done by government; Pay-out is done by courts",
        "Pay-in day happens every 50 years; Pay-out day happens daily"
    ],
    "A",
    "1. On Pay-in day, the broker makes payment or delivers securities to the exchange. On Pay-out day, the exchange releases payment or transfers shares to the buyer's broker.\nHence, Option {{CORR}} is correct.",
    "Distinguishes Pay-in day from Pay-out day."
)
add_q(make_question(CHAPTER, "Trading Procedure", "What is the distinction between 'Pay-in Day' and 'Pay-out Day' in stock exchange settlement?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Dematerialization (Demat)",
    [
        "Rematerialization",
        "Depreciation",
        "Disinvestment"
    ],
    "B",
    "1. Dematerialization is the process by which an investor converts physical paper share certificates into an electronic electronic balance in a Demat account.\nHence, Option {{CORR}} is correct.",
    "Defines Dematerialization."
)
add_q(make_question(CHAPTER, "Depository Services", "The process of converting physical paper share certificates into electronic digital balances is termed:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Elimination of theft, fake certificates, transfer delays, and paper handling risks",
    [
        "Guaranteed doubling of stock prices within one week",
        "Immunity from corporate market volatility",
        "Abolition of statutory capital gains taxes"
    ],
    "C",
    "1. Electronic holding of securities eliminates bad deliveries, fake share certificates, theft, signature mismatch delays, and paper handling paperwork.\nHence, Option {{CORR}} is correct.",
    "Highlights benefits of dematerialization."
)
add_q(make_question(CHAPTER, "Depository Services", "Which of the following is a major advantage of holding securities in 'Dematerialized' form?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Depository",
    [
        "Stockbroker",
        "Merchant Banker",
        "Underwriter"
    ],
    "D",
    "1. A Depository is an organization (like NSDL or CDSL) where securities of an investor are held in electronic form, functioning like a bank for securities.\nHence, Option {{CORR}} is correct.",
    "Defines Depository."
)
add_q(make_question(CHAPTER, "Depository Services", "An apex financial institution that holds securities in electronic book-entry form on behalf of investors functions as a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "NSDL (National Securities Depository Limited) and CDSL (Central Depository Services Limited)",
    [
        "RBI and State Bank of India",
        "SEBI and Ministry of Finance",
        "BSE and National Stock Exchange"
    ],
    "A",
    "1. In India, there are two primary depositories: National Securities Depository Limited (NSDL) and Central Depository Services Limited (CDSL).\nHence, Option {{CORR}} is correct.",
    "Identifies NSDL and CDSL."
)
add_q(make_question(CHAPTER, "Depository Services", "Which two institutions operate as national depositories for electronic securities in India?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Depository Participant (DP)",
    [
        "Stock Exchange Chairman",
        "Sub-broker Apprentice",
        "Public Notary"
    ],
    "B",
    "1. A Depository Participant (DP) is the agent of the depository (such as commercial banks, brokerage firms) through whom investors open Demat accounts and trade securities.\nHence, Option {{CORR}} is correct.",
    "Defines Depository Participant."
)
add_q(make_question(CHAPTER, "Depository Services", "The registered intermediary (such as a commercial bank or broker) through whom an investor accesses depository services is a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "National Stock Exchange (NSE)",
    [
        "Bombay Stock Exchange",
        "Calcutta Stock Exchange",
        "Madras Stock Exchange"
    ],
    "C",
    "1. The National Stock Exchange of India (NSE) was incorporated in 1992 and recognized in 1993, pioneering automated nationwide screen-based trading in India.\nHence, Option {{CORR}} is correct.",
    "Identifies NSE as pioneer of nationwide screen-based trading."
)
add_q(make_question(CHAPTER, "Stock Exchanges in India", "Which stock exchange pioneered nationwide screen-based electronic trading in India upon its establishment in 1992?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "NIFTY 50",
    [
        "SENSEX",
        "DOW JONES",
        "NASDAQ"
    ],
    "D",
    "1. NIFTY 50 is the benchmark stock market index of the National Stock Exchange of India (NSE), tracking 50 premier corporate stocks.\nHence, Option {{CORR}} is correct.",
    "Identifies NIFTY 50 as NSE index."
)
add_q(make_question(CHAPTER, "Stock Exchanges in India", "What is the benchmark market index of the National Stock Exchange (NSE)?", opts, corr, sol))

# =================================================================================================
# 4. SEBI: Objectives & Functions (Q37 - Q44)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Securities and Exchange Board of India Act, 1992",
    [
        "Companies Act, 1956",
        "Reserve Bank of India Act, 1934",
        "Banking Regulation Act, 1949"
    ],
    "A",
    "1. SEBI was established in 1988 as an administrative body and granted statutory legal powers under the Securities and Exchange Board of India Act, 1992.\nHence, Option {{CORR}} is correct.",
    "Identifies SEBI Act 1992."
)
add_q(make_question(CHAPTER, "SEBI", "Under which statutory legislation was the Securities and Exchange Board of India (SEBI) granted legal autonomous authority?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Protecting investor interests, promoting market development, and regulating securities markets",
    [
        "Nationalizing commercial banks and setting corporate employee wage ceilings",
        "Printing paper rupee banknotes and controlling statutory tax collection",
        "Granting sovereign bailouts to loss-making private partnership firms"
    ],
    "B",
    "1. The core objectives of SEBI are: to protect the interests of investors in securities, to promote the development of the securities market, and to regulate the securities market.\nHence, Option {{CORR}} is correct.",
    "Lists primary objectives of SEBI."
)
add_q(make_question(CHAPTER, "SEBI", "What are the core foundational objectives of SEBI?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Regulatory Functions, Development Functions, and Protective Functions",
    [
        "Legislative, Judicial, and Military Functions",
        "Primary, Secondary, and Tertiary Functions",
        "Central, State, and District Functions"
    ],
    "C",
    "1. SEBI performs three categories of functions: Regulatory Functions, Development Functions, and Protective Functions.\nHence, Option {{CORR}} is correct.",
    "Lists the three functional categories of SEBI."
)
add_q(make_question(CHAPTER, "SEBI Functions", "SEBI classifies its operational responsibilities into which three functional categories?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Registration of brokers, sub-brokers, and collective investment schemes",
    [
        "Conducting educational training seminars for rural retail investors",
        "Publishing exploratory research monographs on foreign equity indices",
        "Prohibiting fraudulent insider trading by company corporate executives"
    ],
    "D",
    "1. Registering and regulating stockbrokers, sub-brokers, registrars, underwriters, and mutual funds are core Regulatory Functions of SEBI.\nHence, Option {{CORR}} is correct.",
    "Identifies regulatory function of SEBI."
)
add_q(make_question(CHAPTER, "SEBI Functions", "Which of the following is strictly classified as a 'Regulatory Function' of SEBI?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Training of intermediaries of the securities market and conducting research",
    [
        "Registration of collective investment schemes and mutual funds",
        "Levying statutory fees and inspection charges on stock exchanges",
        "Prohibiting fraudulent price rigging schemes by cartels"
    ],
    "A",
    "1. Training of market intermediaries, conducting research, and promoting flexible trading practices are Development Functions of SEBI.\nHence, Option {{CORR}} is correct.",
    "Identifies development function of SEBI."
)
add_q(make_question(CHAPTER, "SEBI Functions", "Which of the following activities falls under the 'Development Functions' of SEBI?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Prohibition of fraudulent and unfair trade practices like price rigging and insider trading",
    [
        "Registering credit rating agencies and venture capital funds",
        "Calling for information and conducting inquiries on exchanges",
        "Performing annual corporate balance sheet income audits"
    ],
    "B",
    "1. Prohibiting fraudulent trade practices, checking price rigging, preventing insider trading, and investor education are Protective Functions of SEBI.\nHence, Option {{CORR}} is correct.",
    "Identifies protective function of SEBI."
)
add_q(make_question(CHAPTER, "SEBI Functions", "Which of the following represents a 'Protective Function' of SEBI?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Using non-public price-sensitive inside information to trade company shares for personal profit",
    [
        "Subscribing to mutual fund SIPs through commercial bank auto-debits",
        "Checking stock quotes in morning financial news publications",
        "Attending corporate annual general meetings as an equity shareholder"
    ],
    "C",
    "1. Insider trading involves directors or executives using unpublished price-sensitive corporate information to buy or sell securities for personal gain, prohibited by SEBI.\nHence, Option {{CORR}} is correct.",
    "Defines Insider Trading."
)
add_q(make_question(CHAPTER, "SEBI", "What constitutes illegal 'Insider Trading' prohibited by SEBI?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Manipulating the market price of securities artificially to inflate or depress quotes",
    [
        "Submitting corporate annual tax returns on the official government portal",
        "Borrowing working capital funds through a 90-day commercial bill",
        "Discounting export invoices with commercial foreign exchange banks"
    ],
    "D",
    "1. Price rigging refers to making artificial bids to manipulate prices of securities up or down to deceive the investing public, strictly prohibited by SEBI.\nHence, Option {{CORR}} is correct.",
    "Defines Price Rigging."
)
add_q(make_question(CHAPTER, "SEBI", "What does the prohibited market malpractice of 'Price Rigging' signify?", opts, corr, sol))

# =================================================================================================
# 5. Statement I & Statement II Questions (Q45 - Q52)
# =================================================================================================

add_q(make_statement_question(
    CHAPTER, "Money Market Instruments",
    "Treasury Bills are issued by the Reserve Bank of India on behalf of the Government of India.",
    "Treasury Bills carry high default credit risk and are available in minimum denominations of ₹100.",
    "C",
    "1. Statement I is true: RBI issues T-bills on behalf of the central government.\n2. Statement II is false: T-bills are sovereign instruments with zero default risk, available in minimum amounts of ₹25,000.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Commercial Paper",
    "Commercial paper is an unsecured negotiable promissory note issued by highly rated creditworthy corporations.",
    "Commercial paper can be issued with a maturity period spanning up to 25 years.",
    "C",
    "1. Statement I is true: Commercial paper is an unsecured promissory note from creditworthy firms.\n2. Statement II is false: Commercial paper maturity is short-term, ranging from 15 days to 1 year.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Primary and Secondary Market",
    "Securities are sold directly by the issuing company to investors in the Primary Market.",
    "In the Secondary Market, securities are traded exclusively between investors without direct company involvement.",
    "A",
    "1. Statement I is true: Primary market involves direct company-to-investor issuance.\n2. Statement II is true: Secondary market trades occur between investors, providing liquidity.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Methods of Floatation",
    "A Rights Issue offers new shares to the general public through open auction advertisements.",
    "Private Placement involves allocating securities to selected institutional investors rather than the public.",
    "D",
    "1. Statement I is false: Rights issue offers shares preferentially to existing shareholders, not the general public.\n2. Statement II is true: Private placement targets selected institutions and high-net-worth clients.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Trading and Settlement",
    "Under T+1 rolling settlement, transactions are settled on the next business day following the trade day.",
    "A contract note is issued by the broker within 24 hours of trade execution containing transaction details.",
    "A",
    "1. Statement I is true: T+1 settles trades on trade day + 1.\n2. Statement II is true: Brokers must issue contract notes within 24 hours of execution.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Depository Services",
    "Dematerialization is the process of converting digital shares into paper certificates.",
    "NSDL and CDSL are the two main depositories holding securities in electronic form in India.",
    "D",
    "1. Statement I is false: Dematerialization converts paper certificates into digital electronic form (rematerialization does the opposite).\n2. Statement II is true: NSDL and CDSL are India's two national depositories.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "SEBI Functions",
    "Registration of stockbrokers and sub-brokers is a Regulatory Function of SEBI.",
    "Prohibiting insider trading and fraudulent price rigging are Protective Functions of SEBI.",
    "A",
    "1. Statement I is true: Registering market participants is regulatory.\n2. Statement II is true: Combating fraud and insider trading is protective.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Call Money",
    "Call money is short-term finance with a maturity period of 1 to 15 days used between commercial banks.",
    "Call money interest rates are completely fixed and static throughout the year.",
    "C",
    "1. Statement I is true: Call money is inter-bank short-term finance (1-15 days).\n2. Statement II is false: Call money rates (call rate) are highly volatile and fluctuate on an hourly basis.\nHence, Option C is correct."
))

# =================================================================================================
# 6. Assertion & Reason Questions (Q53 - Q60)
# =================================================================================================

add_q(make_assertion_question(
    CHAPTER, "Money Market",
    "Treasury bills are also called Zero Coupon Bonds.",
    "Treasury bills do not pay periodic interest; they are issued at a discount to face value and redeemed at par.",
    "A",
    "1. Assertion (A) is true: T-bills are called zero coupon bonds.\n2. Reason (R) is true and explains (A): The return to investors is the difference between the discounted issue price and the par value received at maturity.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Commercial Paper",
    "Large companies often issue Commercial Paper to undertake 'Bridge Financing'.",
    "The funds raised through Commercial Paper are used to meet the immediate floatation costs of issuing long-term securities.",
    "A",
    "1. Assertion (A) is true: Commercial paper is used for bridge financing.\n2. Reason (R) is true and explains (A): It covers upfront costs (brokerage, underwriting) until long-term capital is realized.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Secondary Market",
    "Secondary markets contribute directly to economic growth by channelizing capital into productive investments.",
    "The stock exchange provides liquidity and marketability, encouraging citizens to disinvest from stagnant assets and invest in productive corporate securities.",
    "A",
    "1. Assertion (A) is true: Secondary markets stimulate economic growth.\n2. Reason (R) is true and provides the causal mechanism (continuous liquidity encourages channelizing savings).\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Depository Services",
    "Dematerialization has significantly increased safety in stock market transactions.",
    "It eliminates risks associated with physical certificates such as theft, forgery, mutilation, and bad deliveries.",
    "A",
    "1. Assertion (A) is true: Demat enhances transaction safety.\n2. Reason (R) is true and directly explains (A): Electronic book-entries eliminate physical paper risks entirely.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "SEBI",
    "Insider trading is strictly prohibited by SEBI.",
    "Trading on non-public price-sensitive information grants unfair advantage to company insiders and destroys public investor trust.",
    "A",
    "1. Assertion (A) is true: SEBI outlaws insider trading.\n2. Reason (R) is true and explains (A): Preserving market integrity and level playing field is essential for investor confidence.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Call Money",
    "Commercial banks resort to Call Money borrowing to maintain their statutory Cash Reserve Ratio (CRR).",
    "The Reserve Bank of India mandates that commercial banks must maintain a prescribed percentage of their deposits as cash reserves with the RBI.",
    "A",
    "1. Assertion (A) is true: Banks borrow call money for CRR compliance.\n2. Reason (R) is true and explains (A): Temporary cash reserve deficits are bridged quickly through the 1-15 day call money market.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Primary Market",
    "A company can issue securities in the Primary Market only once during its entire lifetime upon incorporation.",
    "The Primary Market is the market for new securities where existing established companies can also float additional shares for expansion.",
    "D",
    "1. Assertion (A) is false: Companies can raise fresh capital multiple times throughout their operational existence via primary markets.\n2. Reason (R) is true: Both new startups and established corporations access the primary market.\nHence, Option D is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Trading Procedure",
    "A Permanent Account Number (PAN) is completely optional when opening a Demat Account in India.",
    "The regulatory framework enforced by SEBI mandates PAN as the mandatory uniform identification document for all capital market participants.",
    "D",
    "1. Assertion (A) is false: PAN is strictly mandatory, not optional.\n2. Reason (R) is true: SEBI regulations require PAN for all Demat and trading accounts.\nHence, Option D is correct."
))

# Verify length and output
print(f"Successfully generated {len(questions)} unique questions for Unit 10!")
assert len(questions) == 60, f"Expected 60 questions, got {len(questions)}"

os.makedirs("mock/bst_units", exist_ok=True)
out_path = "mock/bst_units/unit10.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
