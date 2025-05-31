from pydantic import BaseModel

class RecordInput(BaseModel):
    user_address: str
    symbol_from: str
    symbol_to: str
    actual_price: float
    risk_score: int
    timestamp: int

class RecordOutput(BaseModel):
    symbol_from: str
    symbol_to: str
    actual_price: float
    risk_score: int
    timestamp: int