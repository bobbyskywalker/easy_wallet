from solders.keypair import Keypair
from config import KEYPAIR_PATH, PROGRAM_ID
import json
from solders.pubkey import Pubkey

def load_keypair(path: str = KEYPAIR_PATH) -> Keypair:
    with open(path, "r", encoding="utf-8") as fp:
        secret = json.load(fp)
    return Keypair.from_bytes(bytes(secret))

def header_pda() -> Pubkey:
    return Pubkey.find_program_address([b"risk-header"], PROGRAM_ID)[0]

def record_pda(record_id: int) -> Pubkey:
    seed = b"risk-record" + record_id.to_bytes(8, "little")
    return Pubkey.find_program_address([seed], PROGRAM_ID)[0]