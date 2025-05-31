from solders.keypair import Keypair
from config import KEYPAIR_ENCODED, PROGRAM_ID
import json
from solders.pubkey import Pubkey

def header_pda() -> Pubkey:
    return Pubkey.find_program_address([b"risk-header"], PROGRAM_ID)[0]

def record_pda(record_id: int) -> Pubkey:
    seed = b"risk-record" + record_id.to_bytes(8, "little")
    return Pubkey.find_program_address([seed], PROGRAM_ID)[0]