from fastapi import HTTPException
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from urllib3.http2.probe import acquire_and_get

from config import CM_KEY, CM_URL
from controllers import get_liquidity, calc_risk_score

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/crypto")
async def get_offers():
    headers = {
        "Accept": "application/json",
        "X-CMC_PRO_API_KEY": CM_KEY
    }
    params = {
        "start": "1",
        "limit": "5000",
        "convert": "USD"
    }
    try:
        response = requests.get(CM_URL, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=502, detail = (str(e)))


@app.get("/token-data/{network}")
async def get_token_data(network: str):
    scores = {}

    scores["liquidity_score"] = get_liquidity(network)
    scores["marketcap_score"] = 30 # get_marketcap_score()
    scores["holders_score"]  = 3290 # get_holders_score() (no unique holders)
    scores["age_score"] = 5 # get_age_score()
    scores["verified_score"] = 1 # get_verified_score() (1 if verified on etherscan)
    scores["blacklist_score"] = 1 # get_blacklist_score() (1 or 0)
    scores["lp_locked_score"] = 32 # get_lp_locked_store()

    code_verify = True
    is_scam = False

    risk_score = calc_risk_score(scores)

    payload = {
        "risk": risk_score,
        "liquidity": scores["liquidity_score"],
        "holders_count": scores["holders_score"],
        "token_age": scores["age_score"],
        "source_code_verification": scores["verified_score"],
        "scam_report": scores["blacklist_score"],
        "top_holders_analysis": "null"
    }




