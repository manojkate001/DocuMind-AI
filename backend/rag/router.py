def classify_query(question):

    question = question.lower()

    stock_keywords = [
        "stock",
        "price",
        "market cap",
        "share",
        "ticker",
        "aapl",
        "tsla",
        "nvda",
        "msft",
        "apple",
        "tesla",
        "nvidia"
    ]

    for keyword in stock_keywords:

        if keyword in question:
            return "stock"

    return "rag"

def extract_symbol(question):

    symbols = {
        "apple": "AAPL",
        "tesla": "TSLA",
        "nvidia": "NVDA",
        "microsoft": "MSFT",
        "aapl": "AAPL",
        "tsla": "TSLA",
        "nvda": "NVDA",
        "msft": "MSFT"
    }

    question = question.lower()

    for key, value in symbols.items():

        if key in question:
            return value

    return None

    
def is_analysis_query(question):

    question = question.lower()

    for keyword in analysis_keywords:

        if keyword in question:
            return True

    return False    



    question = question.lower()

    for key, value in symbols.items():

        if key in question:
            return value

    return None 
analysis_keywords = [
    "analyze",
    "analysis",
    "evaluate"
]