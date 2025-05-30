import requests

# liquidity fetch utility function
# @param: network- a network to fetch the index value from
async def get_liquidity(network: str):
    url = f"https://api.geckoterminal.com/api/v2/networks/{network}/pools"
    response = requests.get(url=url)
    data = response.json()

    highest = 0.0
    top_pool = None

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

def calc_risk_score(scores: dict):
    risk_score = (
        scores["liquidity_score"] * 0.35 +
        scores["marketcap_score"] * 0.25 +
        scores["holders_score"] * 0.15 +
        scores["age_score"] * 0.10 +
        scores["verified_score"] * 0.05 +
        scores["blacklist_score"] * 0.05 +
        scores["lp_locked_score"] * 0.05
    )
    return risk_score
