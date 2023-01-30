from typing import Optional
import pandas as pd
import datetime
from svo.core.models import Companies

class CompanyRepo:
    def __init__(self, session_maker) -> None:
        self.Session = session_maker

    def retrieve_companies_data(self) -> Companies:
        #sql = f"SELECT * FROM companies"
        with self.Session() as session:
            return session.query(Companies).all()

    def find_with_market_cap(self, market_cap) -> Companies:
        current_date = datetime.datetime.now()
        ref_date = datetime.datetime(current_date.year - 10, 9, 1)
        sql = (f"SELECT symbol FROM companies WHERE market_cap > {market_cap / 2} AND market_cap < {market_cap * 2}"
               f" AND start_date < '{ref_date}' LIMIT 50")
        with self.Session() as session:
            return session.execute(sql)


    def find_around_symbol(self, market_cap: int, nb_cies: Optional[int] = 40) -> Companies:
        sql = f"SELECT * FROM companies ORDER BY ABS(market_cap - {market_cap}) LIMIT {nb_cies}"

        with self.Session() as session:
            return session.execute(sql)

