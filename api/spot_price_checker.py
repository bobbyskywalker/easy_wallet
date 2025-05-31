import requests
import time
from dotenv import load_dotenv
import os

load_dotenv()
API_KEY = os.getenv("API_KEY")

def get_whitelisted_token_prices():
    url = "https://api.1inch.dev/price/v1.1/1"

    response = requests.get(url,  headers={'Authorization': f'Bearer {API_KEY}'})
    if response.status_code == 200:
        prices = response.json()
        print("Prices for whitelisted tokens:")
        for token_address, price in prices.items():
            print(f"{token_address}: {price}")
    else:
        print("Failed to fetch token prices.")

def get_requested_token_prices(tokens):
    url = "https://api.1inch.dev/price/v1.1/1"

    payload = {
        "tokens": tokens
    }

    response = requests.post(url, headers={'Authorization': f'Bearer {API_KEY}'}, json=payload)
    if response.status_code == 200:
        prices = response.json()
        print("Prices for requested tokens:")
        for token_address, price in prices.items():
            print(f"{token_address}: {price}")
    else:
        print("Failed to fetch token prices.")

def get_prices_for_addresses(addresses):
    url = f"https://api.1inch.dev/price/v1.1/1/{','.join(addresses)}"

    response = requests.get(url, headers={'Authorization': f'Bearer {API_KEY}'})
    if response.status_code == 200:
        prices = response.json()
        print("Prices for requested tokens:")
        for token_address, price in prices.items():
            print(f"{token_address}: {price}")
    else:
        print("Failed to fetch token prices.")

if __name__ == "__main__":
    # Test get_whitelisted_token_prices
    get_whitelisted_token_prices()
    # sleep one second because of RPS limit
    time.sleep(1)

    # Test get_requested_token_prices
    tokens_to_request = ["0x111111111117dc0aa78b770fa6a738034120c302"]
    get_requested_token_prices(tokens_to_request)
    # sleep one second because of RPS limit
    time.sleep(1)

    # Test get_prices_for_addresses
    addresses_to_fetch = ["0x111111111117dc0aa78b770fa6a738034120c302", "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"]
    get_prices_for_addresses(addresses_to_fetch)