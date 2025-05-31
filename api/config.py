from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()

CM_KEY = os.getenv("CM_KEY")
CM_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"

MORALIS_KEY=os.getenv("MORALIS_KEY")
ai_client = OpenAI(api_key=os.getenv("OPENAI_KEY"))
