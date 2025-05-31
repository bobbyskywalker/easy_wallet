import requests
from config import ONE_INCH_KEY, WALLET_ADDRESS

print(ONE_INCH_KEY, WALLET_ADDRESS)

def get_wallet_balance():
	method = "get"
	apiUrl = "https://api.1inch.dev/portfolio/portfolio/v4/overview/erc20/current_value"
	requestOptions = {
		"headers": {
			"Authorization": f"Bearer {ONE_INCH_KEY}"
		},
		"body": "",
		"params": {
			"addresses": [
				f"{WALLET_ADDRESS}"
			],
			"chain_id": "1",
			"use_cache": "true"
		}
	}

	headers = requestOptions.get("headers", {})
	params = requestOptions.get("params", {})

	response = requests.get(apiUrl, headers=headers, params=params)
	return response.json()

if __name__ == "__main__":
	balance = get_wallet_balance()
	print(balance)