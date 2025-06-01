from __future__ import annotations
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

import struct
import base64
import logging
from typing import List

from openai import OpenAIError
from agent import Agent
from classic_swap import prepare_swap_tx
from get_balance import get_wallet_balance, get_tokens_balance

from service import (
    get_liquidity,
    calc_risk_score,
    get_marketcap_score,
    get_token_holders,
    get_token_creation_date,
    get_available_tokens
)

from bc_models import (
    RecordInput,
    RecordOutput,
    SwapModel
)

from config import (
    PROGRAM_ID,
    SYS_PROGRAM_ID,
    KEYPAIR_ENCODED,
    CLUSTER_URL,
    RISK_HEADER_DISCRIMINATOR,
    RISK_RECORD_DISCRIMINATOR
)

from contract_utils import (
    header_pda,
    record_pda
)

from solders.hash import Hash
from solders.instruction import AccountMeta, Instruction
from solders.message import Message
from solders.transaction import Transaction
from solana.rpc.async_api import AsyncClient
from solders.pubkey import Pubkey

from spot_price_checker import get_whitelisted_token_prices, get_requested_token_prices

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
            if liquidity == None:
                liquidity = 0
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


@app.get("/records/{user_pubkey}", response_model=list[RecordOutput])
async def get_records_for_user(user_pubkey: str):
    try:
        if user_pubkey.startswith("0x") and len(user_pubkey) == 42:
            user_pk_bytes = b'\x00' * 12 + bytes.fromhex(user_pubkey[2:])
        else:
            user_pk_bytes = bytes(Pubkey.from_string(user_pubkey))
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid public key")
    async with AsyncClient(CLUSTER_URL) as client:
        header_info = await client.get_account_info(header_pda())
        if header_info.value is None:
            return []
        data_hdr = header_info.value.data
        raw_hdr  = data_hdr if isinstance(data_hdr, bytes) else base64.b64decode(data_hdr[0])
        total    = struct.unpack_from("<Q", raw_hdr, 8)[0]
        results: list[RecordOutput] = []
        for i in range(total):
            try:
                acc = await client.get_account_info(record_pda(i))
                if acc.value is None:
                    continue
                data = acc.value.data
                raw  = data if isinstance(data, bytes) else base64.b64decode(data[0])
                if len(raw) < 81:
                    continue
                off = 8
                if raw[off:off+32] != user_pk_bytes:
                    continue
                off += 32
                symbol_from = raw[off:off+16].rstrip(b"\0").decode(); off += 16
                symbol_to   = raw[off:off+16].rstrip(b"\0").decode(); off += 16
                amount      = struct.unpack_from("<d", raw, off)[0]; off += 8
                price       = struct.unpack_from("<d", raw, off)[0]; off += 8
                risk        = struct.unpack_from("<B", raw, off)[0]; off += 1
                ts          = struct.unpack_from("<q", raw, off)[0]
                results.append(RecordOutput(
                                   symbol_from=symbol_from,
                                   symbol_to=symbol_to,
                                   amount=amount,
                                   actual_price=price,
                                   risk_score=risk,
                                   timestamp=ts
                               ))
            except Exception as e:
                print(f"[!] Błąd przy parsowaniu rekordu {i}: {e}")
                continue
        return results

@app.post("/swap")
def swap_request(req: SwapModel):
    tx_hash = prepare_swap_tx(
            req.src_token,  # 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE ETH
            req.dst_token, #"0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",  # SHIBA INU
            req.amount,
            req.wallet_address
    )
    payload = {"tx_hash": tx_hash}
    return payload

@app.get("/price")
def get_all_prices():
    r = get_whitelisted_token_prices()
    return r

@app.get("/price/")
def get_token_price(token_address: List[str] = Query(...)):
    r = get_requested_token_prices(token_address)
    return r

@app.get("/wallet-balance/{wallet_address}")
def wallet_balance(wallet_address: str):
    balance = get_wallet_balance(wallet_address)
    return balance

@app.get("/token-balance/{wallet_address}")
def token_balance(wallet_address: str):
    balance = get_tokens_balance(wallet_address)
    return balance

@app.get("/get-available-tokens")
def get_tokens():
    r = get_available_tokens()
    return r

@app.get("/get-tokens-stats/{token_name}")
def get_token_stats(token_name: str):
    a = Agent()
    r = a.gen_token_stats(token_name)
    return r



