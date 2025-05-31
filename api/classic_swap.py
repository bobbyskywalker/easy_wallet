import requests
from web3 import Web3
import os
from config import ONE_INCH_KEY, WALLET_PRIVATE_KEY, WALLET_ADDRESS

chainId = 1  # Ethereum Mainnet
apiBaseUrl = f"https://api.1inch.dev/swap/v6.0/{chainId}"
web3RpcUrl = os.getenv("RPC_URL")
headers = {
    "Authorization": f"Bearer {ONE_INCH_KEY}",
    "accept": "application/json"
}
web3 = Web3(Web3.HTTPProvider(web3RpcUrl))
walletAddress = Web3.to_checksum_address(WALLET_ADDRESS)

def api_request_url(method_name, query_params):
    return f"{apiBaseUrl}{method_name}?{'&'.join([f'{key}={value}' for key, value in query_params.items()])}"

def build_swap_params(src_token, dst_token, amount_wei):
    return {
        "src": src_token,
        "dst": dst_token,
        "amount": str(amount_wei),
        "from": walletAddress,
        "slippage": 1,
        "disableEstimate": False,
        "allowPartialFill": False,
    }

def build_tx_for_swap(swap_params):
    url = api_request_url("/swap", swap_params)
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    data = response.json()
    return data["tx"]

def sign_and_send_transaction(tx, wallet_private_key):
    tx["to"] = Web3.to_checksum_address(tx["to"])
    tx["gas"] = int(tx["gas"])
    tx["gasPrice"] = int(tx["gasPrice"])
    print(int(tx["gasPrice"]))
    tx["nonce"] = web3.eth.get_transaction_count(walletAddress)
    tx["value"] = int(tx["value"])
    tx["chainId"] = chainId
    tx.pop("from", None)
    signed_tx = web3.eth.account.sign_transaction(tx, wallet_private_key)
    tx_hash = web3.eth.send_raw_transaction(signed_tx.raw_transaction)
    return web3.to_hex(tx_hash)

def swap_tokens(src_token, dst_token, amount_wei):
    swap_params = build_swap_params(src_token, dst_token, amount_wei)
    swap_tx = build_tx_for_swap(swap_params)
    ok = input("Do you want to send a transaction to exchange with 1inch router? (y/n): ")
    if ok.lower() == "y":
        tx_hash = sign_and_send_transaction(swap_tx, WALLET_PRIVATE_KEY)
    else:
        print("Transaction cancelled.")
        return None
    return tx_hash

if __name__ == "__main__":
    # Example usage
    tx_hash = swap_tokens(
        "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",  # ETH
        "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",  # SHIBA INU
        10000000000000  # 0.00001 ETH in wei
    )
    print("Tx hash:", tx_hash)