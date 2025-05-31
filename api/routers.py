from fastapi import HTTPException
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import logging

from openai import OpenAIError
from agent import Agent

from service import (
    get_liquidity,
    calc_risk_score,
    get_marketcap_score,
    get_token_holders,
    get_token_creation_date
)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# main token data retrieval endpoint
@app.get("/token-data/{token_address}")
async def get_token_data(token_address: str):
    try:
        try:
            liquidity = get_liquidity(token_address)
        except ValueError as e:
            logging.warning(f"Invalid token_address input: {e}")
            raise HTTPException(status_code=400, detail=f"Invalid token_address: {token_address}")

        try:
            holders_count = get_token_holders(token_address)
        except ValueError as e:
            logging.warning(f"Invalid token adress: {e}")
            raise HTTPException(status_code=400, detail=f"Invalid token address: {token_address}")

        try:
            marketcap = get_marketcap_score(token_address)
            if marketcap is None:
                raise ValueError("Market cap not found for token :( )")
        except ValueError as e:
            logging.warning(f"Invalid token address: {e}")
            raise HTTPException(status_code=400, detail=f"Invalid token address: {token_address}")

        try:
            creation_date = get_token_creation_date(token_address)
        except ValueError as e:
            logging.warning(f"Invalid token address: {e}")
            raise HTTPException(status_code=400, detail=f"Invalid token address: {token_address}")

        scores = {
            "liquidity_score": liquidity,
            "marketcap_score": marketcap,
            "holders_score": holders_count,
            "age_score": creation_date
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
                "score": True,
                "score_description": get_agent_description(str(1), "verified_score")
            },
            "scam_report": {
                "score": False,
                "score_description": get_agent_description(str(0), "blacklist_score")
            },
            "top_holders_analysis": None,
            "summary": a.gen_summary(scores)
        }
        return payload

    except HTTPException:
        raise
    except Exception as e:
        logging.exception(f"Unexpected server error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error.")

