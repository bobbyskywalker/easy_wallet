import requests
from web3 import Web3
from dotenv import load_dotenv
import os

load_dotenv()
API_KEY = os.getenv("API_KEY")
chainId = 1  # Chain ID for Binance Smart Chain (BSC)
web3RpcUrl = os.getenv("RPC_URL")  # URL for BSC node
headers = { "Authorization": f"Bearer {API_KEY}", "accept": "application/json" }
walletAddress = os.getenv("WALLET_ADDRESS")  # Your wallet address
privateKey = os.getenv("WALLET_KEY")  # Your private key


swapParams = {
    "src": "0x111111111117dc0aa78b770fa6a738034120c302",  # Token address of 1INCH
    "dst": "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",  # Token address of DAI
    "amount": "100000000000000000",  # Amount of 1INCH to swap (in wei)
    "from": walletAddress,
    "slippage": 1,  # Maximum acceptable slippage percentage for the swap (e.g., 1 for 1%)
    "disableEstimate": False,  # Set to True to disable estimation of swap details
    "allowPartialFill": False,  # Set to True to allow partial filling of the swap order
}

apiBaseUrl = f"https://api.1inch.dev/swap/v6.0/{chainId}"
web3 = Web3(web3RpcUrl)


# Construct full API request URL
def apiRequestUrl(methodName, queryParams):
    return f"{apiBaseUrl}{methodName}?{'&'.join([f'{key}={value}' for key, value in queryParams.items()])}"

# Function to check token allowance
def checkAllowance(tokenAddress, walletAddress):
    url = apiRequestUrl("/approve/allowance", {"tokenAddress": tokenAddress, "walletAddress": walletAddress})
    response = requests.get(url, headers=headers)
    data = response.json()
    return data.get("allowance")

allowance = checkAllowance(swapParams["src"], walletAddress)
print("Allowance: ", allowance)