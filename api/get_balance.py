import requests
from config import ONE_INCH_KEY, CHAIN_ID

import requests

def get_wallet_balance(wallet_address):
	apiUrl = "https://api.1inch.dev/portfolio/portfolio/v4/overview/erc20/current_value"
	headers = {
		"Authorization": f"Bearer {ONE_INCH_KEY}"
	}
	params = {
		"addresses": [wallet_address],
		"chain_id": CHAIN_ID,
		"use_cache": "false"
	}
	response = requests.get(apiUrl, headers=headers, params=params)
	result = response.json()["result"]
	total = 0
	assets = []
	for item in result:
		value_usd = 0
		if item["result"]:
			# Find the first result with a non-null value_usd
			for r in item["result"]:
				if r.get("value_usd") is not None:
					value_usd = r["value_usd"]
					break
			total += value_usd
		assets.append({
			"protocol_name": item.get("protocol_name"),
			"value_usd": value_usd
		})
	return {
		"total_value_usd": round(total, 2),
		"assets": assets
	}

def get_tokens_balance(wallet_address):
    apiUrl = "https://api.1inch.dev/balance/v1.2/1/aggregatedBalancesAndAllowances/" + wallet_address
    headers = {
        "Authorization": f"Bearer {ONE_INCH_KEY}"
    }
    params = {
        "wallets": wallet_address,
        "filterEmpty": "true"
    }
    response = requests.get(apiUrl, headers=headers, params=params)
    return response.json()

# if __name__ == "__main__":
# 	usd_balance = get_wallet_balance(WALLET_ADDRESS)
# 	print(usd_balance)
# 	print("\n")
# 	tokens_balance = get_tokens_balance(WALLET_ADDRESS)
# 	print(tokens_balance)
	