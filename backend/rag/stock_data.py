import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("ALPHA_VANTAGE_API_KEY")


def get_stock_price(symbol):

    url = (
        f"https://www.alphavantage.co/query?"
        f"function=GLOBAL_QUOTE"
        f"&symbol={symbol}"
        f"&apikey={API_KEY}"
    )

    response = requests.get(url)

    data = response.json()

    quote = data.get("Global Quote", {})
    print("ALPHA VANTAGE RESPONSE:")
    print(data)
    return {
        "symbol": symbol,
        "price": quote.get("05. price"),
        "change": quote.get("09. change"),
        "change_percent": quote.get("10. change percent")
    }


def get_company_overview(symbol):

    url = (
        f"https://www.alphavantage.co/query?"
        f"function=OVERVIEW"
        f"&symbol={symbol}"
        f"&apikey={API_KEY}"
    )

    response = requests.get(url)

    return response.json()

def get_stock_history(symbol):

    url = (
        f"https://www.alphavantage.co/query?"
        f"function=TIME_SERIES_DAILY"
        f"&symbol={symbol}"
        f"&apikey={API_KEY}"
    )

    response = requests.get(url)

    return response.json()