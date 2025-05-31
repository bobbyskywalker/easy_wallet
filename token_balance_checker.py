import requests
from dotenv import load_dotenv
import os

load_dotenv()
API_KEY = os.getenv("API_KEY")

def get_token_balances(wallet_address):
    endpoint = f'https://api.1inch.dev/balance/v1.2/1/balances/{wallet_address}'
    response = requests.get(endpoint, headers={'Authorization': f'Bearer {API_KEY}'})

    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch token balances. Error code: {response.status_code}")
        return None

def main():
    # Replace '0xYourWalletAddress' with the Ethereum wallet address you want to check
    wallet_address = '0x1E6FB537687709c389800eb6d059Ec1934a7162D'
    token_balances = get_token_balances(wallet_address)

    if token_balances:
        print(f"Token balances for wallet address {wallet_address}:")
        for token, balance in token_balances.items():
            print(f"{token}: {balance}")
    else:
        print("Token balance fetch failed. Please check your wallet address.")

if __name__ == '__main__':
    main()