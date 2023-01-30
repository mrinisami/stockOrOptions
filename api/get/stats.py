import numpy as np
from arch import arch_model
import yfinance as yf
import yahooquery as yq
import json
import datetime

with open("./resources/cies_info.json") as f:
    cie_data = json.load(f)



for y, cie in enumerate(cie_data):
    liste = []
    prices = yf.download(cie['symbol'], start=cie['start_date'])
    adj = prices['Adj Close']
    close = prices['Close']
    open_p = prices['Open']
    high = prices['High']
    ret = np.diff(np.log(close)) * 100
    mod = arch_model(ret).fit()
    vol = mod.conditional_volatility * (252 ** 0.5)
    for i in range(1, len(prices.index)):
        free = {}
        conv_date = prices.index[i].to_pydatetime().isoformat()
        free['date'] = conv_date
        free['adjusted_close'] = adj[i]
        free['close'] = close[i]
        free['open'] = open_p[i]
        free['high'] = high[i]
        free['symbol'] = cie['symbol']
        free['implied_vol'] = vol[i - 1]
        liste.append(free)

    with open(f"./resources/{cie['symbol']}_price_data.json", "w") as f:
        json.dump(liste, f, indent=2)
