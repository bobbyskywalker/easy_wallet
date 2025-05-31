import requests
from moralis import evm_api
from typing import Dict
from datetime import datetime, timezone
from dateutil.relativedelta import relativedelta
import re

from config import MORALIS_KEY


# liquidity fetch utility function
# @param: network- a network to fetch the index value from
def get_liquidity(token_address: str):
    url = f"https://api.dexscreener.com/latest/dex/tokens/{token_address}"

    response = requests.get(url)
    data = response.json()

    total_liquidity = sum(float(pair.get("liquidity", {}).get("usd", 0)) for pair in data.get("pairs", []))
    return total_liquidity

def get_token_holders(token_address: str):
    url = f"https://deep-index.moralis.io/api/v2.2/erc20/{token_address}/holders?chain=eth"

    headers = {
        "Accept": "application/json",
        "X-API-Key": MORALIS_KEY
    }

    r = requests.get(url=url, headers=headers)
    json = r.json()
    return json["totalHolders"]

def get_marketcap_score(token_address: str):
    url = f"https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses={token_address}&vs_currencies=usd"
    r = requests.get(url)
    data = r.json()
    if token_address.lower() in data:
        return data[token_address.lower()]["usd"]
    else:
        return None

def get_token_creation_date(token_address: str):
    params = {
        "chain": "eth",
        "addresses": [token_address]
    }

    result = evm_api.token.get_token_metadata(
        api_key=MORALIS_KEY,
        params=params,
    )

    if not result or not isinstance(result, list):
        raise ValueError("Unexpected response from Moralis")

    token_info = result[0]

    if "created_at" not in token_info:
        raise ValueError("created_at not found in token metadata")

    created_at = token_info["created_at"]

    def format_token_age(created_at: str) -> str:
        created_date = datetime.fromisoformat(created_at.replace("Z", "+00:00"))
        now = datetime.now(timezone.utc)
        delta = relativedelta(now, created_date)
        return f"created {delta.years} years {delta.months} months {delta.days} days ago"

    return format_token_age(created_at)

def calc_risk_score(scores):
    weights = {
        "liquidity_score": 0.35,
        "marketcap_score": 0.30,
        "holders_score": 0.20,
        "age_score": 0.15,
    }


    def extract_years_from_age_string(age_string: str) -> int:
        match = re.search(r"created (\d+) years", age_string)
        if match:
            return int(match.group(1))
        return 0

    age = extract_years_from_age_string(scores["age_score"])

    normalized_scores = {
        "liquidity_score": min(scores["liquidity_score"] / 10_000_000, 1.0),
        "marketcap_score": min(scores["marketcap_score"] / 100_000_000, 1.0),
        "holders_score": min(scores["holders_score"] / 10_000, 1.0),
        "age_score": min(age / 365, 1.0),
    }

    score = sum(normalized_scores[k] * weights[k] for k in weights)
    return round(score * 100, 2)
