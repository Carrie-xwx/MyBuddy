"""
quant/backtest.py — 向量化日频回测引擎 v2
支持 A股（T+1、涨跌停限制）与 美股（T+0）规则。
新增：
  - stop_loss: 个股浮亏止损（基于买入成本价）
  - gross:     目标总仓位系数 dict[date] -> 0..1（市场状态驱动的动态仓位）
"""
from datetime import datetime
import numpy as np
import pandas as pd

COMMISSION = 0.0003      # 单边万三
SLIPPAGE = 0.0005        # 单边千五滑点
A_LIMIT = 0.10           # A股涨跌停 ±10%


def run_backtest(prices: dict, weights: dict, market: str = "A",
                 init_cash: float = 1_000_000.0,
                 stop_loss: float = None, gross: dict = None) -> dict:
    """
    prices: dict[symbol] -> DataFrame[date, close, high, low, open, volume]
    weights: dict[rebalance_date] -> dict[symbol] -> 目标权重(归一化, 和为1)
    gross:   dict[rebalance_date] -> 目标总仓位系数 0..1 (None 视为全仓1.0)
    stop_loss: 个股浮亏止损阈值(如 -0.10)，None 表示不止损
    """
    all_dates = set()
    for df in prices.values():
        all_dates.update(df["date"].dt.strftime("%Y-%m-%d").tolist())
    dates = sorted(all_dates)
    date_idx = {d: i for i, d in enumerate(dates)}

    lut = {}
    for sym, df in prices.items():
        lut[sym] = {r["date"].strftime("%Y-%m-%d"): r for _, r in df.iterrows()}

    cash = init_cash
    holding = {}          # symbol -> shares
    cost_basis = {}       # symbol -> 平均买入成本（用于止损判定）
    nav_series = []
    trades = []
    gross_series = []     # 记录每日实际仓位系数（用于前端展示）

    wdates = sorted(weights.keys())

    for d in dates:
        # 当日调仓目标（取 <= 当日 最近的一个调仓日）
        target = {}
        cur_rd = None
        for wd in wdates:
            if wd <= d:
                target = weights[wd]
                cur_rd = wd
            else:
                break
        g = (gross.get(cur_rd, 1.0) if gross and cur_rd else 1.0)

        # ---- 1) 个股止损检查（每日，独立于调仓）----
        if stop_loss is not None and holding:
            for sym, sh in list(holding.items()):
                if sym not in cost_basis:
                    continue
                row = lut[sym].get(d)
                if row is None:
                    continue
                ret = row["close"] / (cost_basis[sym] + 1e-9) - 1
                if ret <= stop_loss:
                    proceeds = sh * row["close"] * (1 - COMMISSION - SLIPPAGE)
                    cash += proceeds
                    trades.append({"date": d, "symbol": sym, "side": "SELL_STOP",
                                   "price": row["close"], "shares": sh, "value": proceeds,
                                   "reason": "stop_loss"})
                    del holding[sym]
                    del cost_basis[sym]

        # 计算当前持仓市值
        pos_value = 0.0
        for sym, sh in holding.items():
            row = lut[sym].get(d)
            if row is not None:
                pos_value += sh * row["close"]

        total_target_value = (cash + pos_value) * g

        # ---- 2) 调仓：先卖 ----
        for sym, sh in list(holding.items()):
            row = lut[sym].get(d)
            if row is None:
                continue
            close = row["close"]
            can_sell = True
            if market == "A":
                prev_row = lut[sym].get(_prev_date(dates, date_idx, d))
                if prev_row is not None:
                    chg = (close - prev_row["close"]) / (prev_row["close"] + 1e-9)
                    if chg <= -A_LIMIT:
                        can_sell = False   # 跌停卖不出
            if sym not in target or target[sym] <= 0:
                if can_sell:
                    proceeds = sh * close * (1 - COMMISSION - SLIPPAGE)
                    cash += proceeds
                    trades.append({"date": d, "symbol": sym, "side": "SELL",
                                   "price": close, "shares": sh, "value": proceeds})
                    del holding[sym]
                    cost_basis.pop(sym, None)

        # ---- 3) 调仓：再买 ----
        for sym, w in target.items():
            row = lut[sym].get(d)
            if row is None:
                continue
            close = row["close"]
            can_buy = True
            if market == "A":
                prev_row = lut[sym].get(_prev_date(dates, date_idx, d))
                if prev_row is not None:
                    chg = (close - prev_row["close"]) / (prev_row["close"] + 1e-9)
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
                        # 更新平均成本
                        old_sh = holding.get(sym, 0) - shares
                        old_cost = cost_basis.get(sym, close)
                        new_total = old_sh * old_cost + shares * close
                        cost_basis[sym] = new_total / (holding[sym] + 1e-9)
                        trades.append({"date": d, "symbol": sym, "side": "BUY",
                                       "price": close, "shares": shares, "value": cost})

        # ---- 4) 当日净值 ----
        pos_value = sum(sh * lut[sym][d]["close"] for sym, sh in holding.items()
                        if d in lut[sym])
        nav = cash + pos_value
        nav_series.append({"date": d, "nav": nav})
        gross_series.append(g if target or holding else 0.0)

    nav_df = pd.DataFrame(nav_series)
    nav_df["date"] = pd.to_datetime(nav_df["date"])
    gross_df = pd.DataFrame({"date": nav_df["date"], "gross": gross_series})
    return {"nav": nav_df, "trades": trades, "init_cash": init_cash, "gross": gross_df}


def _prev_date(dates, date_idx, d):
    i = date_idx.get(d)
    if i is None or i == 0:
        return None
    return dates[i - 1]


if __name__ == "__main__":
    from data import get_a_daily
    m = get_a_daily("600519", "20220101", "20231231")
    p = get_a_daily("000001", "20220101", "20231231")
    prices = {"600519": m, "000001": p}
    wdates = ["2022-02-01", "2022-05-01", "2022-08-01", "2022-11-01",
              "2023-02-01", "2023-05-01", "2023-08-01", "2023-11-01"]
    weights = {d: {"600519": 0.5, "000001": 0.5} for d in wdates}
    res = run_backtest(prices, weights, market="A", stop_loss=-0.10)
    print("交易日:", len(res["nav"]), "交易笔数:", len(res["trades"]))
    print(res["nav"].tail(2))
