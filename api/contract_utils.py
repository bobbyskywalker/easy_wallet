from base64 import b64decode

from solana.rpc.types import TxOpts
import asyncio
from bc_models import RecordInput

from solders.hash import Hash
from solders.instruction import AccountMeta, Instruction
from solders.message import Message
from solders.transaction import Transaction
from solana.rpc.async_api import AsyncClient
from solders.pubkey import Pubkey
import struct

from config import (
    PROGRAM_ID,
    SYS_PROGRAM_ID,
    KEYPAIR_ENCODED,
    CLUSTER_URL,
    RISK_HEADER_DISCRIMINATOR,
    RISK_RECORD_DISCRIMINATOR
)

lock = asyncio.Lock()

def header_pda() -> Pubkey:
    return Pubkey.find_program_address([b"risk-header"], PROGRAM_ID)[0]

def record_pda(record_id: int) -> Pubkey:
    seed = b"risk-record" + record_id.to_bytes(8, "little")
    return Pubkey.find_program_address([seed], PROGRAM_ID)[0]

async def add_record_to_chain(data: RecordInput) -> dict:
    async with lock:
        payer = KEYPAIR_ENCODED
        async with AsyncClient(CLUSTER_URL) as client:
            hdr = header_pda()
            hdr_info = await client.get_account_info(hdr)
            instructions: list[Instruction] = []
            total_records = 0

            if hdr_info.value is None:
                keys = [
                    AccountMeta(hdr, is_signer=False, is_writable=True),
                    AccountMeta(payer.pubkey(), is_signer=True, is_writable=True),
                    AccountMeta(SYS_PROGRAM_ID, is_signer=False, is_writable=False),
                ]
                instructions.append(Instruction(PROGRAM_ID, RISK_HEADER_DISCRIMINATOR, keys))
            else:
                raw = b64decode(hdr_info.value.data[0]) if isinstance(hdr_info.value.data, (list, tuple)) else bytes(hdr_info.value.data)
                total_records = struct.unpack_from("<Q", raw, 8)[0]

            record_id = total_records
            rec = record_pda(record_id)

            def fixed16(s: str) -> bytes:
                b = s.encode()[:16]
                return b + b'\x00' * (16-len(b))
            if data.user_address.startswith("0x") and len(data.user_address) == 42:
                    user_pk_bytes = b'\x00' * 12 + bytes.fromhex(data.user_address[2:])
            else:
                    user_pk = Pubkey.from_string(data.user_address)
                    user_pk_bytes = bytes(user_pk)
            symbol_from_bytes = fixed16(data.symbol_from)
            symbol_to_bytes = fixed16(data.symbol_to)

            assert len(bytes(user_pk)) == 32, f"user_pubkey ma {len(bytes(user_pk))} bajtów, powinno być 32"
            assert len(symbol_from_bytes) == 16, f"symbol_from ma {len(symbol_from_bytes)} bajtów, powinno być 16"
            assert len(symbol_to_bytes) == 16, f"symbol_to ma {len(symbol_to_bytes)} bajtów, powinno być 16"

            payload = bytearray(RISK_RECORD_DISCRIMINATOR)
            payload += bytes(user_pk)
            payload += struct.pack("<I", len(data.symbol_from)) + data.symbol_from.encode()
            payload += struct.pack("<I", len(data.symbol_to)) + data.symbol_to.encode()
            payload += struct.pack("<d", data.amount)
            payload += struct.pack("<d", data.actual_price)
            payload += struct.pack("<B", data.risk_score)
            payload += struct.pack("<q", data.timestamp)

            keys = [
                AccountMeta(hdr, is_signer=False, is_writable=True),
                AccountMeta(rec, is_signer=False, is_writable=True),
                AccountMeta(payer.pubkey(), is_signer=True, is_writable=True),
                AccountMeta(SYS_PROGRAM_ID, is_signer=False, is_writable=False),
            ]
            instructions.append(Instruction(PROGRAM_ID, bytes(payload), keys))

            bh_resp = await client.get_latest_blockhash()
            recent_bh = bh_resp.value.blockhash if isinstance(bh_resp.value.blockhash, Hash) else Hash.from_string(bh_resp.value.blockhash)

            msg = Message.new_with_blockhash(instructions, payer.pubkey(), recent_bh)
            tx = Transaction.new_unsigned(msg)
            tx.sign([payer], recent_bh)

            send_resp = await client.send_raw_transaction(bytes(tx), opts=TxOpts(skip_confirmation=False))
            sig = send_resp.value if hasattr(send_resp, "value") else send_resp
            return {"success": True, "signature": str(sig)}