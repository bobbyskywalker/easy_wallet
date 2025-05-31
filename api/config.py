from dotenv import load_dotenv
from openai import OpenAI
from solders.pubkey import Pubkey
import json
import os
import base64
from solders.keypair import Keypair

load_dotenv()

def load_keypair() -> Keypair:
    encoded = os.getenv("KEYPAIR_B64")
    if not encoded:
        raise RuntimeError("Missing KEYPAIR_BASE64 environment variable")

    try:
        decoded_json = base64.b64decode(encoded).decode("utf-8")
        secret_key_list = json.loads(decoded_json)
        if len(secret_key_list) != 64:
            raise ValueError("Invalid key length: expected 64 bytes")
        return Keypair.from_bytes(bytes(secret_key_list))
    except Exception as e:
        raise RuntimeError(f"Failed to load keypair: {e}")


# coinmarketcap api config (unused rn)
CM_KEY = os.getenv("CM_KEY")
CM_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"

# moralis api config (crucial)
MORALIS_KEY=os.getenv("MORALIS_KEY")

# 1 inch api
ONE_INCH_KEY=os.getenv("ONE_INCH_API_KEY")

# wallet config
CHAIN_ID = 1
RPC_URL = os.getenv("RPC_URL")

# blockchain config
PROGRAM_ID = Pubkey.from_string("GfzivBz7tq7oAMNhVwUKt1GLEuT2LbXudWvGSyJ3vqYk")
SYS_PROGRAM_ID = Pubkey.from_string("11111111111111111111111111111111")
CLUSTER_URL = "https://api.devnet.solana.com"
KEYPAIR_ENCODED = load_keypair()

RISK_HEADER_DISCRIMINATOR = bytes([104, 59, 147, 10, 116, 241, 85, 35])
RISK_RECORD_DISCRIMINATOR = bytes([65, 186, 219, 131, 44, 66, 61, 216])

# openai client
# used in agent.py
ai_client = OpenAI(api_key=os.getenv("OPENAI_KEY"))
