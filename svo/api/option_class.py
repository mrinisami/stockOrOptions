from pydantic import BaseModel
from typing import Optional, List, Tuple
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import pandas as pd

class Option(BaseModel):

    def __init__(self, strike: float, symbol: str, s_0: Optional[float] = None, maturity: Optional[int] = 10):
        self.strike = strike
        if s_0 is None:
            self.s_0 = strike
        else:
            self.s_0 = s_0
        self.maturity = maturity
        self.symbol = str


class Stock(BaseModel):

    symbol: str
    market_cap: float

    def get_good_comparables(self)  -> Tuple[str]:
        db = "postgresql+psycopg2://dev:admin123@localhost/stockVOption"
        engine = create_engine(db)
        Session = sessionmaker(bind=engine)
        session = Session()
        sql = f"SELECT symbol FROM companies WHERE marketCap > {self.market_cap / 2} AND marketCap < {self.market_cap * 2}"
        return tuple(pd.DataFrame(session.execute(sql)).values.flatten())

    def get_user_choice_comparables(self, nb_comparables: int) -> Tuple[str]:
        db = "postgresql+psycopg2://dev:admin123@localhost/stockVOption"
        engine = create_engine(db)
        Session = sessionmaker(bind=engine)
        session = Session()

