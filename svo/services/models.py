import datetime

from pydantic import BaseModel


class Stats(BaseModel):
    return_rate: float
    profit: float


class YearData(BaseModel):
    year: int
    stock: Stats
    option: Stats


class CompanyData(BaseModel):
    symbol: str
    years: list[YearData]


class ComparatorData(BaseModel):
    companies: list[CompanyData]


class YearDataMaxRet(BaseModel):
    year: int
    return_rate: float
    mean_profit: float
    financial_asset: str


class CompanyDataMaxRet(BaseModel):
    symbol: str
    years: list[YearDataMaxRet]


class ComparatorMaxRet(BaseModel):
    companies: list[CompanyDataMaxRet]


class CompanyInfo(BaseModel):
    name: str
    market_cap: int
    start_date: datetime.date
    symbol: str


class GenericParams(BaseModel):
    market_cap: int
    maturity: int
    nb_comparables: int
    back_test_length: int
    tax_rate: float
    nom_value: int


class MaxRetParams(GenericParams):
    ret_threshold: float


class SellWRet(GenericParams):
    ret_threshold: float
    vesting_period: int
    percentage_vested: float