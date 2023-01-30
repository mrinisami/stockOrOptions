from sqlalchemy import Column, Integer, VARCHAR, Identity, Date, ForeignKey, Float, BigInteger
from sqlalchemy.orm import declarative_base
import datetime

Base = declarative_base()

class Companies(Base):

    __tablename__ = "companies"
    cie_name = Column("cie_name", VARCHAR(length=50))
    market_cap = Column("market_cap", BigInteger)
    ticker = Column("symbol", VARCHAR(8), primary_key=True)
    start_date = Column("start_date", Date)

    def __init__(self, name, symbol, start_date, market_cap):
        self.cie_name = name
        self.start_date = start_date
        self.ticker = symbol
        self.market_cap = market_cap

class StockPrices(Base):

    __tablename__ = "daily_stock_prices"
    ticker = Column("symbol", VARCHAR(8), ForeignKey('companies.symbol'), onupdate='CASCADE')
    date = Column("date", Date)
    adjusted_close = Column("adjusted_close", Float)
    high = Column("high", Float)
    open = Column("open", Float)
    close = Column("close", Float)
    implied_vol = Column("implied_vol", Float)
    row_id = Column("row_id", Integer, Identity(start=1, cycle=True), primary_key=True)

    def __init__(self, symbol, date, adj_close, high, open, close, implied_vol):
        self.symbol = symbol
        self.date = date
        self.adjusted_close = adj_close
        self.high = high
        self.open = open
        self.close = close
        self.implied_vol = implied_vol

class OptionPrices(Base):

    __tablename__ = "option_prices"
    symbol = Column("symbol", VARCHAR(8), ForeignKey('companies.symbol'), onupdate='CASCADE')
    strike = Column('strike', Float)
    bond = Column('ten_yr_bond', Float)
    implied_vol = Column('implied_vol', Float)
    div_yield = Column('div_yield', Float)
    grant_date = Column('option_grant_date', Date)
    price_comp_date = Column('price_comp_date', Date)
    next_year_price = Column('next_year_price', Float)
    row_id = Column("row_id", Integer, Identity(start=1, cycle=True), primary_key=True)

    def __init__(self, symbol, strike, bond, implied_vol, div_yield, gr_date, price_comp_date, next_yr_price):
        self.implied_vol = implied_vol
        self.symbol = symbol
        self.strike = strike
        self.bond = bond
        self.div_yield = div_yield
        self.option_grant_date = gr_date
        self.price_comp_date = price_comp_date
        self.next_year_price = next_yr_price