import requests
from web3 import Web3
import time

from price import get_token_price
from bc_models import RecordInput
from config import ONE_INCH_KEY, RPC_URL, CHAIN_ID
from contract_utils import add_record_to_chain

def get_api_base_url():
    return f"https://api.1inch.dev/swap/v6.0/{CHAIN_ID}"

def get_headers():
    return {
        "Authorization": f"Bearer {ONE_INCH_KEY}",
        "accept": "application/json"
    }

def get_web3():
    return Web3(Web3.HTTPProvider(RPC_URL))

def prepare_wallet_address(wallet_address):
    return Web3.to_checksum_address(wallet_address)

def api_request_url(method_name, query_params):
    return f"{get_api_base_url()}{method_name}?{'&'.join([f'{key}={value}' for key, value in query_params.items()])}"

def build_swap_params(src_token, dst_token, amount_wei, wallet_address):
    return {
        "src": src_token,
        "dst": dst_token,
        "amount": str(amount_wei),
        "from": prepare_wallet_address(wallet_address),
        "slippage": 1,
        "disableEstimate": False,
        "allowPartialFill": False,
    }

def build_tx_for_swap(swap_params):
    url = api_request_url("/swap", swap_params)
    response = requests.get(url, headers=get_headers())
    response.raise_for_status()
    data = response.json()
    return data["tx"]

def sign_and_send_transaction(tx, wallet_address, wallet_private_key):
    web3 = get_web3()
    wallet_address = prepare_wallet_address(wallet_address)
    tx["to"] = Web3.to_checksum_address(tx["to"])
    tx["gas"] = int(tx["gas"])
    tx["gasPrice"] = int(tx["gasPrice"])
    tx["nonce"] = web3.eth.get_transaction_count(wallet_address)
    tx["value"] = int(tx["value"])
    tx["chainId"] = CHAIN_ID
    tx.pop("from", None)
    signed_tx = web3.eth.account.sign_transaction(tx, wallet_private_key)
    tx_hash = web3.eth.send_raw_transaction(signed_tx.raw_transaction)
    return web3.to_hex(tx_hash)

def swap_tokens(src_token, dst_token, amount_wei, wallet_address, wallet_private_key):
    swap_params = build_swap_params(src_token, dst_token, amount_wei, wallet_address)
    swap_tx = build_tx_for_swap(swap_params)
    tx_hash = sign_and_send_transaction(swap_tx, wallet_address,wallet_private_key)
    return tx_hash

def prepare_swap_tx(src_token, dst_token, amount_wei, wallet_address):
    swap_params = build_swap_params(src_token, dst_token, amount_wei, wallet_address)
    price = get_token_price(src_token)
    symbol1 = "" # get_symbol(src_token)
    symbol2 = "" # get_symbol(dst_token)
    data = RecordInput (
        wallet_address,
        "BTC",
        "ETH",
        amount_wei,
        price,
        50,
        int(time.time() * 1000)
    )
    add_record_to_chain(data)
    return build_tx_for_swap(swap_params)

# if __name__ == "__main__":
#     # Example usage
#     tx_hash = prepare_swap_tx(
#         "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",  # ETH
#         "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",  # SHIBA INU
#         10000000000000,  # 0.00001 ETH in wei
#     )
#     print("Tx hash:", tx_hash)