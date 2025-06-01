import requests
from config import ONE_INCH_KEY

def get_symbol(token_address: str) -> str:
    api_url = f"https://api.1inch.dev/token/v1.2/1/custom/{token_address}"
    headers = {
        "Authorization": f"Bearer {ONE_INCH_KEY}"
    }
    response = requests.get(api_url, headers=headers)
    response.raise_for_status()
    data = response.json()
    return data.get("symbol", "")

if __name__ == "__main__":
    # Example usage
    token_address = "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE"  # Example token address
    symbol = get_symbol(token_address)
    print(f"Symbol for token {token_address}: {symbol}")