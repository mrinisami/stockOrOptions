"""Create tables

Revision ID: f22df392c2e4
Revises: 
Create Date: 2022-12-30 10:20:31.008249

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f22df392c2e4'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('companies',
    sa.Column('cie_name', sa.VARCHAR(length=50), nullable=True),
    sa.Column('market_cap', sa.BigInteger(), nullable=True),
    sa.Column('symbol', sa.VARCHAR(length=8), nullable=False),
    sa.Column('start_date', sa.Date(), nullable=True),
    sa.PrimaryKeyConstraint('symbol')
    )
    op.create_table('daily_stock_prices',
    sa.Column('symbol', sa.VARCHAR(length=8), nullable=True),
    sa.Column('date', sa.Date(), nullable=True),
    sa.Column('adjusted_close', sa.Float(), nullable=True),
    sa.Column('high', sa.Float(), nullable=True),
    sa.Column('open', sa.Float(), nullable=True),
    sa.Column('close', sa.Float(), nullable=True),
    sa.Column('implied_vol', sa.Float(), nullable=True),
    sa.Column('row_id', sa.Integer(), sa.Identity(always=False, start=1, cycle=True), nullable=False),
    sa.ForeignKeyConstraint(['symbol'], ['companies.symbol'], ),
    sa.PrimaryKeyConstraint('row_id')
    )
    op.create_table('option_prices',
    sa.Column('symbol', sa.VARCHAR(length=8), nullable=True),
    sa.Column('strike', sa.Float(), nullable=True),
    sa.Column('ten_yr_bond', sa.Float(), nullable=True),
    sa.Column('implied_vol', sa.Float(), nullable=True),
    sa.Column('div_yield', sa.Float(), nullable=True),
    sa.Column('option_grant_date', sa.Date(), nullable=True),
    sa.Column('price_comp_date', sa.Date(), nullable=True),
    sa.Column('next_year_price', sa.Float(), nullable=True),
    sa.Column('row_id', sa.Integer(), sa.Identity(always=False, start=1, cycle=True), nullable=False),
    sa.ForeignKeyConstraint(['symbol'], ['companies.symbol'], ),
    sa.PrimaryKeyConstraint('row_id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('option_prices')
    op.drop_table('daily_stock_prices')
    op.drop_table('companies')
    # ### end Alembic commands ###
