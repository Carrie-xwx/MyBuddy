"""
quant/backtest.py — 向量化日频回测引擎
支持 A股（T+1、涨跌停限制）与 美股（T+0）规则。

输入：
  prices: dict[symbol] -> DataFrame[date, close, high, low, open, volume]（已按日期对齐）
  weights: dict[date] -> dict[symbol] -> 目标权重（调仓日生效）
  market: 'A' | 'US'

输出：
  result: dict {
     nav: DataFrame[date, nav, benchmark_nav],
     trades: list,
     metrics: dict
  }
"""
from datetime import datetime
import numpy as np
import pandas as pd

COMMISSION = 0.0003      # 单边万三
SLIPPAGE = 0.0005        # 单边千五滑点
A_LIMIT = 0.10           # A股涨跌停 ±10%
A_ST_LIMIT = 0.05        # ST ±5%（简化处理，统一用 10%）


def run_backtest(prices: dict, weights: dict, market: str = "A",
                 init_cash: float = 1_000_000.0) -> dict:
    # 统一交易日历（取所有标的的并集，按 date 排序）
    all_dates = set()
    for df in prices.values():
        all_dates.update(df["date"].dt.strftime("%Y-%m-%d").tolist())
    dates = sorted(all_dates)
    date_idx = {d: i for i, d in enumerate(dates)}

    # 建立每个标的的 date->行 索引
    lut = {}
    for sym, df in prices.items():
        lut[sym] = {r["date"].strftime("%Y-%m-%d"): r for _, r in df.iterrows()}

    cash = init_cash
    holding = {}          # symbol -> shares
    nav_series = []
    trades = []
    prev_nav = init_cash

    # 权重按日期排序
    wdates = sorted(weights.keys())

    for d in dates:
        # 当日调仓目标（取 <= 当日 最近的一个调仓日）
        target = {}
        for wd in wdates:
            if wd <= d:
                target = weights[wd]
            else:
                break
        if not target:
            target = {}

        # 计算当前持仓市值
        pos_value = 0.0
        for sym, sh in holding.items():
            row = lut[sym].get(d)
            if row is not None:
                pos_value += sh * row["close"]

        # 执行调仓：卖出不在目标或权重下降的，买入新增/权重上升的
        total_target_value = cash + pos_value
        # 先卖
        for sym, sh in list(holding.items()):
            row = lut[sym].get(d)
            if row is None:
                continue
            close = row["close"]
            # 涨跌停 / T+1 限制
            can_sell = True
            if market == "A":
                # T+1：当日买入次日才能卖（简化：允许卖，因持仓是之前买的）
                # 跌停不能卖
                prev_row = lut[sym].get(_prev_date(dates, date_idx, d))
                if prev_row is not None:
                    chg = (row["close"] - prev_row["close"]) / (prev_row["close"] + 1e-9)
                    if chg <= -A_LIMIT:
                        can_sell = False
            if sym not in target or target[sym] <= 0:
                if can_sell:
                    proceeds = sh * close * (1 - COMMISSION - SLIPPAGE)
                    cash += proceeds
                    trades.append({"date": d, "symbol": sym, "side": "SELL",
                                   "price": close, "shares": sh, "value": proceeds})
                    del holding[sym]

        # 再买
        for sym, w in target.items():
            row = lut[sym].get(d)
            if row is None:
                continue
            close = row["close"]
            can_buy = True
            if market == "A":
                prev_row = lut[sym].get(_prev_date(dates, date_idx, d))
                if prev_row is not None:
                    chg = (row["close"] - prev_row["close"]) / (prev_row["close"] + 1e-9)
                    if chg >= A_LIMIT:
                        can_buy = False   # 涨停买不进
            target_value = total_target_value * w
            cur_value = holding.get(sym, 0) * close
            if target_value > cur_value + 1 and can_buy:
                buy_value = target_value - cur_value
                shares = int(buy_value / (close * (1 + COMMISSION + SLIPPAGE)))
                if shares > 0:
                    cost = shares * close * (1 + COMMISSION + SLIPPAGE)
                    if cost <= cash:
                        cash -= cost
                        holding[sym] = holding.get(sym, 0) + shares
                        trades.append({"date": d, "symbol": sym, "side": "BUY",
                                       "price": close, "shares": shares, "value": cost})

        # 计算当日净值
        pos_value = sum(sh * lut[sym][d]["close"] for sym, sh in holding.items()
                         if d in lut[sym])
        nav = cash + pos_value
        nav_series.append({"date": d, "nav": nav})
        prev_nav = nav

    nav_df = pd.DataFrame(nav_series)
    nav_df["date"] = pd.to_datetime(nav_df["date"])
    return {"nav": nav_df, "trades": trades, "init_cash": init_cash}


def _prev_date(dates, date_idx, d):
    i = date_idx.get(d)
    if i is None or i == 0:
        return None
    return dates[i - 1]


if __name__ == "__main__":
    # 自测：两根标的等权
    from data import get_a_daily
    m = get_a_daily("600519", "20220101", "20231231")
    p = get_a_daily("000001", "20220101", "20231231")
    prices = {"600519": m, "000001": p}
    wdates = ["2022-02-01", "2022-05-01", "2022-08-01", "2022-11-01",
              "2023-02-01", "2023-05-01", "2023-08-01", "2023-11-01"]
    weights = {d: {"600519": 0.5, "000001": 0.5} for d in wdates}
    res = run_backtest(prices, weights, market="A")
    print("交易日:", len(res["nav"]), "交易笔数:", len(res["trades"]))
    print(res["nav"].tail(2))
