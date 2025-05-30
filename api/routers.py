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
    scores = {
        "liquidity_score": get_liquidity(network),
        "marketcap_score": 30000000, # get_marketcap_score()
        "holders_score": 3290,         # get_holders_score()
        "age_score": 90,               # get_age_score() in days
        "verified_score": 1,           # get_verified_score()
        "blacklist_score": 1,          # get_blacklist_score()
        "lp_locked_score": 32          # get_lp_locked_score() as percent
    }

    risk_score = calc_risk_score(scores)

    payload = {
        "risk": risk_score,
        "liquidity": {
            "value": scores["liquidity_score"],
            "description": "chujowe"
        }
        "holders_count": scores["holders_score"],
        "token_age": scores["age_score"],
        "source_code_verification": bool(scores["verified_score"]),
        "scam_report": not bool(scores["blacklist_score"] == 0),
        "top_holders_analysis": None
    }

    return payload




