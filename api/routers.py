from fastapi import HTTPException
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from openai import OpenAIError

from service import get_liquidity, calc_risk_score
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
    try:
        try:
            liquidity = get_liquidity(network)
        except ValueError as e:
            logging.warning(f"Invalid network input: {e}")
            raise HTTPException(status_code=400, detail=f"Invalid network: {network}")

        scores = {
            "liquidity_score": liquidity,
            "marketcap_score": 30000000, # get_marketcap_score()
            "holders_score": 3290, # get_holders_score()
            "age_score": 90, # get_age_score()
            "verified_score": 1, # get_verified_score
            "blacklist_score": 1, # get_blacklist_score()
            "lp_locked_score": 32 # get_lp_locked_score()
        }

        risk_score = calc_risk_score(scores)
        a = Agent()

        def get_agent_description(value: str, name: str):
            try:
                return a.gen_description(value, name)
            except OpenAIError as e:
                logging.error(f"OpenAI error for {name}: {e}")
                return "Index Status: AI service unavailable."
            except Exception as e:
                logging.exception(f"Unexpected error in description gen for {name}: {e}")
                return "Index Status: Unable to generate description."

        payload = {
            "risk": {
                "score": risk_score,
                "score_description": get_agent_description(str(risk_score), "risk_score")
            },
            "liquidity": {
                "score": scores["liquidity_score"],
                "score_description": get_agent_description(str(scores["liquidity_score"]), "liquidity_score")
            },
            "holders_count": {
                "score": scores["holders_score"],
                "score_description": get_agent_description(str(scores["holders_score"]), "holders_score")
            },
            "token_age": {
                "score": scores["age_score"],
                "score_description": get_agent_description(str(scores["age_score"]), "age_score")
            },
            "source_code_verification": {
                "score": bool(scores["verified_score"]),
                "score_description": get_agent_description(str(scores["verified_score"]), "verified_score")
            },
            "scam_report": {
                "score": bool(scores["blacklist_score"]),
                "score_description": get_agent_description(str(scores["blacklist_score"]), "blacklist_score")
            },
            "top_holders_analysis": None
        }

        return payload

    except HTTPException:
        raise
    except Exception as e:
        logging.exception(f"Unexpected server error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error.")


