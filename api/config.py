from dotenv import load_dotenv
import os
from openai import OpenAI

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

# openai client
# used in agent.py
ai_client = OpenAI(api_key=os.getenv("OPENAI_KEY"))
