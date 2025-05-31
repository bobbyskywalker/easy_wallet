from dotenv import load_dotenv
import os
from openai import OpenAI
from solders.pubkey import Pubkey

load_dotenv()

# coinmarketcap api config (unused rn)
CM_KEY = os.getenv("CM_KEY")
CM_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"

# moralis api config (crucial)
MORALIS_KEY=os.getenv("MORALIS_KEY")

# 1 inch api
ONE_INCH_KEY=os.getenv("ONE_INCH_API_KEY")

# wallet config
walletAddressRaw = os.getenv("WALLET_ADDRESS")
walletPrivateKey = os.getenv("WALLET_KEY")

# blockchain config
PROGRAM_ID = Pubkey.from_string("GfzivBz7tq7oAMNhVwUKt1GLEuT2LbXudWvGSyJ3vqYk")
SYS_PROGRAM_ID = Pubkey.from_string("11111111111111111111111111111111")
CLUSTER_URL = "https://api.devnet.solana.com"
KEYPAIR_PATH = os.path.expanduser("keys/id.json")

RISK_HEADER_DISCRIMINATOR = bytes([104, 59, 147, 10, 116, 241, 85, 35])
RISK_RECORD_DISCRIMINATOR = bytes([65, 186, 219, 131, 44, 66, 61, 216])

# openai client
# used in agent.py
ai_client = OpenAI(api_key=os.getenv("OPENAI_KEY"))
