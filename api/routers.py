from fastapi import HTTPException
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from urllib3.http2.probe import acquire_and_get

from config import CM_KEY, CM_URL
from controllers import get_liquidity, calc_risk_score
from agent import Agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    a = Agent()

    payload = {
    "risk": risk_score,
    "liquidity": {
        "score": scores["liquidity_score"],
        "score_description": a.gen_description(str(scores["liquidity_score"]), "liquidity_score")
    },
    "holders_count": {
        "score": scores["holders_score"],
        "score_description": a.gen_description(str(scores["holders_score"]), "holders_score")
    },
    "token_age": {
        "score": scores["age_score"],
        "score_description": a.gen_description(str(scores["age_score"]), "age_score")
    },
    "source_code_verification": {
        "score": bool(scores["verified_score"]),
        "score_description": a.gen_description(str(scores["verified_score"]), "verified_score")
    },
    "scam_report": {
        "score": not bool(scores["blacklist_score"] == 0),
        "score_description": a.gen_description(str(scores["blacklist_score"]), "blacklist_score")
    },
    "top_holders_analysis": None
    }

    return payload




