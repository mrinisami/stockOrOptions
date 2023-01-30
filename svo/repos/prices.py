import datetime
from typing import Optional
from svo.core.models import OptionPrices
from sqlalchemy.engine.cursor import CursorResult

class PricesRepo():
    def __init__(self, session_maker) -> None:
        self.session = session_maker

    def retrieve_prices(self, market_cap, back_date:int, maturity: Optional[int] = 10) -> CursorResult:
        current_date = datetime.datetime.now()
        ref_date = datetime.datetime(current_date.year - back_date, 9, 1)
        sql = (f"SELECT prc.symbol, prc.strike, prc.ten_yr_bond, prc.implied_vol, prc.div_yield, prc.option_grant_date, "
    f"prc.price_comp_date, prc.next_year_price, prc.row_id FROM option_prices prc JOIN companies co ON "
    f"prc.symbol = co.symbol WHERE co.market_cap < {market_cap * 2} AND co.market_cap > {market_cap / 2}"
               f" AND co.start_date < '{ref_date}' AND prc.option_grant_date > '{ref_date}' ORDER BY "
    f"prc.symbol, prc.price_comp_date")

        with self.session() as session:
            return session.execute(sql)

    def retrieve_prices_offets(self, market_cap, n_cies: int, back_date: int) -> CursorResult:
        current_date = datetime.datetime.now()
        ref_date = datetime.datetime(current_date.year - back_date, 8, 31)
        top_cies = f"SELECT symbol FROM companies WHERE start_date < '{ref_date}'" \
                   f" ORDER BY ABS(market_cap - {market_cap}) LIMIT {n_cies}"
        sql = (f"SELECT * from option_prices WHERE symbol IN ({top_cies}) AND option_grant_date > "
               f"'{ref_date}'")
        with self.session() as session:
            return session.execute(sql)