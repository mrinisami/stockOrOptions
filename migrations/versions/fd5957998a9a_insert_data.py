"""Insert data

Revision ID: fd5957998a9a
Revises: f22df392c2e4
Create Date: 2022-12-30 10:21:11.008783

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import table, column, Date, Float, VARCHAR, ForeignKey, BigInteger
import json


# revision identifiers, used by Alembic.
revision = 'fd5957998a9a'
down_revision = 'f22df392c2e4'
branch_labels = None
depends_on = None


def upgrade() -> None:
    stock_table = table('daily_stock_prices', column("symbol", VARCHAR, ForeignKey('companies.symbol')),
                        column("date", Date), column("adjusted_close", Float), column("high", Float),
                        column("open", Float),
                        column("close", Float), column("implied_vol", Float))
    with open("./resources/cies_info.json") as file:
        cie_data = json.load(file)
    full_prices = []
    for cie in cie_data:
        with open(f"./resources/{cie['symbol']}_price_data.json") as price_json:
            data = json.load(price_json)
            full_prices += data

    cie_table = table('companies', column("symbol", VARCHAR(8)), column('cie_name', VARCHAR(50)),
                      column("market_cap", BigInteger), column("start_date", Date))
    with open("./resources/cies_info.json") as info_json:
        cie_info = json.load(info_json)

    with open("./resources/profit.json") as option_json:
        option_data = json.load(option_json)
    option_table = table('option_prices', column("symbol", VARCHAR(8), ForeignKey('companies.symbol')),
                         column('strike', Float), column('ten_yr_bond', Float), column('implied_vol', Float),
                         column('div_yield', Float), column('option_grant_date', Date),
                         column('price_comp_date', Date),
                         column('next_year_price', Float))

    op.bulk_insert(cie_table, cie_info)
    op.bulk_insert(option_table, option_data)
    op.bulk_insert(stock_table, full_prices)


    pass


def downgrade() -> None:
    pass
