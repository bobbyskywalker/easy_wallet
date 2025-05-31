import requests
import time
from config import ONE_INCH_KEY

def get_whitelisted_token_prices():
    url = "https://api.1inch.dev/price/v1.1/1"
    response = requests.get(url, headers={'Authorization': f'Bearer {ONE_INCH_KEY}'})
    if response.status_code == 200:
        return response.json()
    else:
        return {}

def get_requested_token_prices(tokens):
    url = "https://api.1inch.dev/price/v1.1/1"
    payload = {
        "tokens": tokens
    }
    response = requests.post(url, headers={'Authorization': f'Bearer {ONE_INCH_KEY}'}, json=payload)
    if response.status_code == 200:
        return response.json()
    else:
        return {}

def get_prices_for_addresses(addresses):
    url = f"https://api.1inch.dev/price/v1.1/1/{','.join(addresses)}"
    response = requests.get(url, headers={'Authorization': f'Bearer {ONE_INCH_KEY}'})
    if response.status_code == 200:
        return response.json()
    else:
        return {}

if __name__ == "__main__":
    # Test get_whitelisted_token_prices
    prices = get_whitelisted_token_prices()
    print("Prices for whitelisted tokens:")
    print(prices)
    time.sleep(1)

    # Test get_requested_token_prices
    tokens_to_request = ["0x111111111117dc0aa78b770fa6a738034120c302"]
    prices = get_requested_token_prices(tokens_to_request)
    print("Prices for requested tokens:")
    print(prices)
    time.sleep(1)

    # Test get_prices_for_addresses
    addresses_to_fetch = ["0x111111111117dc0aa78b770fa6a738034120c302", "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"]
    prices = get_prices_for_addresses(addresses_to_fetch)
    print("Prices for requested tokens:")
    print(prices)
