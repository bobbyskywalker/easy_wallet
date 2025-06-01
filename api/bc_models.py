from pydantic import BaseModel

class RecordInput(BaseModel):
    user_address: str
    symbol_from: str
    symbol_to: str
    amount: float
    actual_price: float
    risk_score: int
    timestamp: int

class RecordOutput(BaseModel):
    symbol_from: str
    symbol_to: str
    amount: float
    actual_price: float
    risk_score: int
    timestamp: int

class SwapModel(BaseModel):
    src_token: str
    dst_token: str
    amount: int
    wallet_address: str
