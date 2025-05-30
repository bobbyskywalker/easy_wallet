import requests
from typing import Dict

# liquidity fetch utility function
# @param: network- a network to fetch the index value from
def get_liquidity(network: str):
    url = f"https://api.geckoterminal.com/api/v2/networks/{network}/pools"
    response = requests.get(url=url)
    data = response.json()

    highest = 0.0

    for item in data.get("data", []):
        attributes = item.get("attributes", {})
        reserve = attributes.get("reserve_in_usd")
        if reserve:
            try:
                reserve_value = float(reserve)
                if reserve_value > highest:
                    highest = reserve_value
            except ValueError:
                continue

    return highest

def calc_risk_score(scores: Dict[str, float]) -> float:
    weights = {
        "liquidity_score": 0.35,
        "marketcap_score": 0.25,
        "holders_score": 0.15,
        "age_score": 0.10,
        "verified_score": 0.05,
        "blacklist_score": 0.05,
        "lp_locked_score": 0.05
    }

    normalized_scores = {
        "liquidity_score": min(scores["liquidity_score"] / 10_000_000, 1.0),
        "marketcap_score": min(scores["marketcap_score"] / 100_000_000, 1.0),
        "holders_score": min(scores["holders_score"] / 10_000, 1.0),
        "age_score": min(scores["age_score"] / 365, 1.0),
        "verified_score": scores["verified_score"],
        "blacklist_score": scores["blacklist_score"],
        "lp_locked_score": min(scores["lp_locked_score"] / 100, 1.0)
    }

    score = sum(normalized_scores[k] * weights[k] for k in weights)
    return round(score * 100, 2)
