import requests
from config import ONE_INCH_KEY, CHAIN_ID

def get_token_price(from_token):
    if ONE_INCH_KEY is None:
        raise ValueError("ONE_INCH_KEY is not set. Set ONE_INCH_KEY in macros.py.")
    url = f'https://api.1inch.dev/swap/v5.0/{CHAIN_ID}/quote'
    headers = {
        'accept': 'application/json',
        'Authorization': f'Bearer {ONE_INCH_KEY}'
    }
    params = {
        'fromTokenAddress': from_token,
        'toTokenAddress': "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        'amount': str(10**18)
    }
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        data = response.json()
        price = int(data['toTokenAmount']) / 10**6
        return price
    else:
        print("Error:", response.status_code, response.text)
        return None

if __name__ == "__main__":
    from_token = "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE"
    price = get_token_price(from_token)
    if price is not None:
        print(f"Price for swapping 1 {from_token} to USDT: {price} USDT")
    else:
        print("Failed to fetch price.")