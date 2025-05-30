from dotenv import load_dotenv
import os

load_dotenv()

CM_KEY = os.getenv("CM_KEY")
CM_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
