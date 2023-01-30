from svo.repos.prices import PricesRepo
from typing import Optional
import pandas as pd
import math
from scipy.stats import norm
import datetime
import numpy as np
from svo.services.models import *
from fastapi import HTTPException


class Comparator:
    def __init__(self, repo: PricesRepo) -> None:
        self.repo = repo

    def naive_comparator_stats(self, market_cap: int, *, maturity: int = 10, nom_value: int = 10000,
                               n_cies: int = 20, back_date: int = 10, tax_rate: float = 0) -> ComparatorData:
        stock_prices = pd.DataFrame(self.repo.retrieve_prices_offets(market_cap, n_cies, back_date))
        if len(stock_prices) == 0:
            raise HTTPException(status_code=404, detail='No company was found using the proposed market cap')
        cies = list(set(stock_prices['symbol']))
        strike = stock_prices['strike']
        r = stock_prices['ten_yr_bond'] / 100
        vol = stock_prices['implied_vol'] / 100
        div = stock_prices['div_yield'] / 100
        d1 = ((r - div + (vol ** 2 / 2)) * maturity) / (vol * (maturity ** 0.5))
        d2 = d1 - (vol * (maturity ** 0.5))
        call = strike * math.e ** (-div * maturity) * norm.cdf(d1) - strike * math.e ** (-r * maturity) * norm.cdf(d2)
        nb_options = nom_value / call
        nb_actions = nom_value * (1 - (tax_rate / 100)) / strike
        comp_data = {'nb_options': nb_options, 'nb_stocks': nb_actions,
                     'option_grant_date': stock_prices['option_grant_date'],
                     'comp_price': stock_prices['next_year_price'], 'symbol': stock_prices['symbol'],
                     'strike': stock_prices['strike']}
        comp_data = pd.DataFrame(comp_data)
        beg = stock_prices.iloc[0, -4].year
        end = stock_prices.iloc[-1, -3].year
        span = end - beg
        data = []
        for name in cies:
            cie_data = CompanyData(symbol=name, years=[])
            for i in range(span):
                sub_df = comp_data[
                    (comp_data.symbol == name) & (comp_data.option_grant_date < datetime.date(beg + i, 10, 1))
                    & (comp_data.option_grant_date > datetime.date(beg + i, 9, 1))]
                comp_df = stock_prices[
                    (stock_prices.symbol == name) & (stock_prices.price_comp_date < datetime.date(end + 1, 1, 1))
                    & (stock_prices.price_comp_date > datetime.date(end, 11, 30))]['next_year_price']
                comp_len = min(len(sub_df), len(comp_df))
                profit_option = ((comp_df.iloc[:comp_len].values - sub_df['strike'].iloc[:comp_len].values)
                                 * sub_df['nb_options'].iloc[:comp_len].values)
                profit_option = np.where(profit_option > 0, profit_option, 1)
                profit_action = (comp_df.iloc[:comp_len].values * sub_df['nb_stocks'].iloc[:comp_len]).values
                mean_profit_op = np.mean(profit_option)
                mean_profit_stock = np.mean(profit_action)
                ret_rate_option = ((mean_profit_op / nom_value) ** (1 / (span - i))) - 1
                ret_rate_stock = ((mean_profit_stock / nom_value) ** (1 / (span - i))) - 1
                option_profit_ratio = mean_profit_op / mean_profit_stock
                option_stats = Stats(profit=mean_profit_op, return_rate=ret_rate_option)
                stock_stats = Stats(profit=mean_profit_stock, return_rate=ret_rate_stock)
                year_data = YearData(year=beg + i + 1, option=option_stats, stock=stock_stats)
                cie_data.years.append(year_data)
            data.append(cie_data)
        return ComparatorData(companies=data)

    def comparator_w_max_ret(self, market_cap, n_cies: int, max_ret: float, back_date: int, maturity: int = 10,
                             nom_value: int = 10000, tax_rate=0) -> ComparatorMaxRet:
        stock_prices = pd.DataFrame(self.repo.retrieve_prices_offets(market_cap, n_cies, back_date))
        cies = list(set(stock_prices['symbol']))
        strike = stock_prices['strike']
        r = stock_prices['ten_yr_bond'] / 100
        vol = stock_prices['implied_vol'] / 100
        div = stock_prices['div_yield'] / 100
        d1 = ((r - div + (vol ** 2 / 2)) * maturity) / (vol * (maturity ** 0.5))
        d2 = d1 - (vol * (maturity ** 0.5))
        call = strike * math.e ** (-div * maturity) * norm.cdf(d1) - strike * math.e ** (-r * maturity) * norm.cdf(d2)
        nb_options = nom_value / call
        nb_actions = nom_value * (1 - tax_rate) / strike
        comp_data = {'nb_options': nb_options, 'nb_stock': nb_actions,
                     'option_grant_date': stock_prices['option_grant_date'],
                     'comp_price': stock_prices['next_year_price'], 'symbol': stock_prices['symbol'],
                     'strike': stock_prices['strike']}
        comp_data = pd.DataFrame(comp_data)
        beg = stock_prices.iloc[0, -4].year
        end = stock_prices.iloc[-1, -3].year
        span = end - beg
        data = []
        for name in cies:
            cie_data = CompanyDataMaxRet(symbol=name, years=[])
            for i in range(span - 1):
                year_ptf = nom_value
                sub_df = comp_data[
                    (comp_data.symbol == name) & (comp_data.option_grant_date < datetime.date(beg + i, 10, 1))
                    & (comp_data.option_grant_date > datetime.date(beg + i, 9, 1))]
                comp_df = stock_prices[
                    (stock_prices.symbol == name) & (stock_prices.price_comp_date < datetime.date(end + 1, 1, 1))
                    & (stock_prices.price_comp_date > datetime.date(end, 11, 30))]['next_year_price']
                strike_df = \
                comp_data[(comp_data.symbol == name) & (comp_data.option_grant_date < datetime.date(beg + i + 1, 10, 1))
                          & (comp_data.option_grant_date > datetime.date(beg + i + 1, 9, 1))]['strike']
                comp_len = min(len(sub_df), len(comp_df), len(strike_df))
                nb_stock = sub_df['nb_stock'].iloc[:comp_len].values
                nb_options = sub_df['nb_options'].iloc[:comp_len].values
                ref_prices = sub_df['strike'].iloc[:comp_len].values
                strike_prices = strike_df.iloc[:comp_len].values
                comp_prices = comp_df.iloc[:comp_len].values
                if np.mean(strike_prices) > np.mean(ref_prices) * 1.15:
                    financial_asset = "stock"
                    profit = nb_stock * (comp_prices)
                    mean_profit = np.mean(profit)
                else:
                    financial_asset = "option"
                    profit = np.where(comp_prices > strike_prices, nb_options * (comp_prices - strike_prices), 0)
                    mean_profit = np.mean(profit) if np.sum(profit != 0) else 0
                return_rate = ((mean_profit / nom_value) ** (1 / (span - 1 - i))) - 1
                year_data = YearDataMaxRet(year=beg + i + 2, return_rate=return_rate, mean_profit=mean_profit,
                                           financial_asset=financial_asset)
                cie_data.years.append(year_data)
            data.append(cie_data)

        return ComparatorMaxRet(companies=data)