#
#
#
# @app.post("/add_record")
# async def add_record(data: RecordInput):
#     async with lock:
#         payer = load_keypair()
#         async with AsyncClient(CLUSTER_URL) as client:
#             hdr = header_pda()
#             hdr_info = await client.get_account_info(hdr)
#             instructions: list[Instruction] = []
#             total_records = 0
#
#             if hdr_info.value is None:
#                 keys = [
#                     AccountMeta(hdr, is_signer=False, is_writable=True),
#                     AccountMeta(payer.pubkey(), is_signer=True, is_writable=True),
#                     AccountMeta(SYS_PROGRAM_ID, is_signer=False, is_writable=False),
#                 ]
#                 instructions.append(Instruction(PROGRAM_ID, RISK_HEADER_DISCRIMINATOR, keys))
#             else:
#                 raw = base64.b64decode(hdr_info.value.data[0]) if isinstance(hdr_info.value.data, (list, tuple)) else bytes(hdr_info.value.data)
#                 total_records = struct.unpack_from("<Q", raw, 8)[0]
#
#             record_id = total_records
#             rec = record_pda(record_id)
#
#             def fixed16(s: str) -> bytes:
#                 b = s.encode()[:16]
#                 return b + b'\x00' * (16-len(b))
#
#             print("DEBUG – user_address z frontendu:", data.user_address)
#             print("DEBUG – symbol_from:", data.symbol_from)
#             print("DEBUG – symbol_to:", data.symbol_to)
#             user_pk = Pubkey.from_string(data.user_address)
#             user_pk_bytes = bytes(user_pk)
#             symbol_from_bytes = fixed16(data.symbol_from)
#             symbol_to_bytes = fixed16(data.symbol_to)
#
#             assert len(user_pk_bytes) == 32, f"user_pubkey ma {len(user_pk_bytes)} bajtów, powinno być 32"
#             assert len(symbol_from_bytes) == 16, f"symbol_from ma {len(symbol_from_bytes)} bajtów, powinno być 16"
#             assert len(symbol_to_bytes) == 16, f"symbol_to ma {len(symbol_to_bytes)} bajtów, powinno być 16"
#
#             payload  = bytearray(RISK_RECORD_DISCRIMINATOR)
#             payload += bytes(user_pk)
#
#             payload += struct.pack("<I", len(data.symbol_from))
#             payload += data.symbol_from.encode()
#
#             payload += struct.pack("<I", len(data.symbol_to))
#             payload += data.symbol_to.encode()
#
#             payload += struct.pack("<d", data.actual_price)
#             payload += struct.pack("<B", data.risk_score)
#             payload += struct.pack("<q", data.timestamp)
#
#             keys = [
#                 AccountMeta(hdr, is_signer=False, is_writable=True),
#                 AccountMeta(rec, is_signer=False, is_writable=True),
#                 AccountMeta(payer.pubkey(), is_signer=True, is_writable=True),
#                 AccountMeta(SYS_PROGRAM_ID, is_signer=False, is_writable=False),
#             ]
#             instructions.append(Instruction(PROGRAM_ID, bytes(payload), keys))
#
#             bh_resp = await client.get_latest_blockhash()
#             recent_bh = bh_resp.value.blockhash if isinstance(bh_resp.value.blockhash, Hash) else Hash.from_string(bh_resp.value.blockhash)
#
#             msg = Message.new_with_blockhash(instructions, payer.pubkey(), recent_bh)
#             tx = Transaction.new_unsigned(msg)
#             tx.sign([payer], recent_bh)
#
#             try:
#                 send_resp = await client.send_raw_transaction(bytes(tx))
#                 sig = send_resp.value if hasattr(send_resp, "value") else send_resp
#                 await client.confirm_transaction(sig)
#                 return {"success": True, "signature": str(sig)}
#             except Exception as exc:
#                 raise HTTPException(status_code=500, detail=str(exc))
#
# @app.get("/records/{user_pubkey}", response_model=list[RecordOutput])
# async def get_records_for_user(user_pubkey: str):
#     try:
#         user_pk = Pubkey.from_string(user_pubkey)
#     except Exception:
#         raise HTTPException(status_code=400, detail="Invalid public key")
#
#     async with AsyncClient(CLUSTER_URL) as client:
#         header_info = await client.get_account_info(header_pda())
#         if header_info.value is None:
#             return []
#
#         data_hdr = header_info.value.data
#         raw_hdr  = data_hdr if isinstance(data_hdr, bytes) else base64.b64decode(data_hdr[0])
#         total    = struct.unpack_from("<Q", raw_hdr, 8)[0]
#
#         results: list[RecordOutput] = []
#
#         for i in range(total):
#             try:
#                 acc = await client.get_account_info(record_pda(i))
#                 if acc.value is None:
#                     continue
#
#                 data = acc.value.data
#                 raw  = data if isinstance(data, bytes) else base64.b64decode(data[0])
#                 if len(raw) < 81:
#                     continue
#
#                 off = 8
#                 if raw[off:off+32] != bytes(user_pk):
#                     continue
#                 off += 32
#
#                 symbol_from = raw[off:off+16].rstrip(b"\0").decode(); off += 16
#                 symbol_to   = raw[off:off+16].rstrip(b"\0").decode(); off += 16
#                 price       = struct.unpack_from("<d", raw, off)[0]; off += 8
#                 risk        = struct.unpack_from("<B", raw, off)[0]; off += 1
#                 ts          = struct.unpack_from("<q", raw, off)[0]
#
#                 results.append(RecordOutput(
#                     symbol_from=symbol_from,
#                     symbol_to=symbol_to,
#                     actual_price=price,
#                     risk_score=risk,
#                     timestamp=ts
#                 ))
#
#             except Exception as e:
#                 print(f"[!] Błąd przy parsowaniu rekordu {i}: {e}")
#                 continue
#
#         return results