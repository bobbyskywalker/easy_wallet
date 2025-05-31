import requests
from web3 import Web3
from dotenv import load_dotenv
from config import ONE_INCH_KEY, walletPrivateKey, walletAddressRaw
import os


chainId = 1  # Ethereum Mainnet
web3RpcUrl = os.getenv("RPC_URL")
print("Using RPC URL:", web3RpcUrl)
headers = {
    "Authorization": f"Bearer {ONE_INCH_KEY}",
    "accept": "application/json"
}

walletAddress = Web3.to_checksum_address(walletAddressRaw)

swapParams = {
    "src": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",  # ETH
    "dst": "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",  # SHIBA INU
    "amount": "10000000000000",  # 0.00001 ETH in wei
    "from": walletAddress,
    "slippage": 1,
    "disableEstimate": False,
    "allowPartialFill": False,
}

web3 = Web3(Web3.HTTPProvider(web3RpcUrl))

def apiRequestUrl(methodName, queryParams):
    return f"{apiBaseUrl}{methodName}?{'&'.join([f'{key}={value}' for key, value in queryParams.items()])}"

apiBaseUrl = f"https://api.1inch.dev/swap/v6.0/{chainId}"

def buildTxForSwap(swapParams):
    url = apiRequestUrl("/swap", swapParams)
    response = requests.get(url, headers=headers)
    data = response.json()
    return data["tx"]

def signAndSendTransaction(tx, wallet_private_key):
    tx["to"] = Web3.to_checksum_address(tx["to"])  # ✅ ważne!
    tx["gas"] = int(tx["gas"])
    tx["gasPrice"] = int(tx["gasPrice"])
    tx["nonce"] = web3.eth.get_transaction_count(walletAddress)
    tx["value"] = int(tx["value"])
    tx["chainId"] = chainId
    tx.pop("from", None)  # ✅ usuń, jeśli istnieje

    signed_tx = web3.eth.account.sign_transaction(tx, walletPrivateKey)
    tx_hash = web3.eth.send_raw_transaction(signed_tx.raw_transaction)
    return web3.to_hex(tx_hash)

# główna część
swapTx = buildTxForSwap(swapParams)
print("Zbudowana transakcja swap:\n", swapTx)

ok = input("Do you want to send this swap transaction? (y/n): ")
if ok.lower() == "y":
    tx_hash = signAndSendTransaction(swapTx, walletPrivateKey)
    print("✅ Wysłano! Tx hash:", tx_hash)
