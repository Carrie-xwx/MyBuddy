"""
quant/data.py — 免费数据源封装层（AKShare）
覆盖 A股 / 美股 日线（前复权）、指数、基础财务。
设计原则：
  - 所有接口统一返回 DataFrame，列名规范为：date, open, high, low, close, volume
  - 处理复权、列名中文化、缺失值
  - 限频退避（sleep），失败时尝试多源兜底
  - 本地缓存（$CACHE_DIR），避免重复请求打爆源站
"""
import os
import time
import json
import hashlib
from datetime import datetime, timedelta

import pandas as pd

CACHE_DIR = os.path.join(os.path.dirname(__file__), ".cache")
os.makedirs(CACHE_DIR, exist_ok=True)

# AKShare 美股代码格式：交易所前缀.代码，如 105.AAPL / 106.TSLA / 107.NVDA
US_EXCHANGE_PREFIX = {"AAPL": "105", "TSLA": "106", "NVDA": "107", "MSFT": "107", "GOOG": "105", "AMZN": "105", "META": "105"}


def _cache_get(key, max_age_days=1):
    path = os.path.join(CACHE_DIR, key + ".csv")
    if os.path.exists(path):
        age = (time.time() - os.path.getmtime(path)) / 86400.0
        if age < max_age_days:
            return pd.read_csv(path, parse_dates=["date"])
    return None


def _cache_put(key, df):
    path = os.path.join(CACHE_DIR, key + ".csv")
    df.to_csv(path, index=False)


def _retry(func, *args, tries=3, delay=1.5, **kwargs):
    last = None
    for i in range(tries):
        try:
            return func(*args, **kwargs)
        except Exception as e:  # noqa
            last = e
            time.sleep(delay * (i + 1))
    raise last


# ----------------------------------------------------------------------------
# A股日线（前复权）
# ----------------------------------------------------------------------------
def get_a_daily(symbol, start=None, end=None, adjust="qfq", use_cache=True):
    """
    symbol: 6位代码，如 '600519'（贵州茅台）/'000001'（平安银行）
    返回 DataFrame[date, open, high, low, close, volume]
    """
    if start is None:
        start = (datetime.now() - timedelta(days=365 * 3)).strftime("%Y%m%d")
    if end is None:
        end = datetime.now().strftime("%Y%m%d")
    key = f"a_{symbol}_{adjust}_{start}_{end}"
    if use_cache:
        c = _cache_get(key)
        if c is not None:
            return c
    import akshare as ak
    df = _retry(ak.stock_zh_a_hist, symbol=symbol, period="daily",
                start_date=start, end_date=end, adjust=adjust)
    df = df.rename(columns={
        "日期": "date", "开盘": "open", "最高": "high", "最低": "low",
        "收盘": "close", "成交量": "volume",
    })
    df["date"] = pd.to_datetime(df["date"])
    df = df[["date", "open", "high", "low", "close", "volume"]].reset_index(drop=True)
    _cache_put(key, df)
    return df


# ----------------------------------------------------------------------------
# 美股日线（前复权）
# ----------------------------------------------------------------------------
def get_us_daily(symbol, start=None, end=None, adjust="qfq", use_cache=True):
    """
    symbol: 如 'AAPL' / 'TSLA' / 'NVDA'
    返回 DataFrame[date, open, high, low, close, volume]
    """
    if start is None:
        start = (datetime.now() - timedelta(days=365 * 3)).strftime("%Y%m%d")
    if end is None:
        end = datetime.now().strftime("%Y%m%d")
    code = f"{US_EXCHANGE_PREFIX.get(symbol.upper(), '105')}.{symbol.upper()}"
    key = f"us_{symbol}_{adjust}_{start}_{end}"
    if use_cache:
        c = _cache_get(key)
        if c is not None:
            return c
    import akshare as ak
    df = _retry(ak.stock_us_hist, symbol=code, period="daily",
                start_date=start, end_date=end, adjust=adjust)
    df = df.rename(columns={
        "日期": "date", "开盘": "open", "最高": "high", "最低": "low",
        "收盘": "close", "成交量": "volume",
    })
    df["date"] = pd.to_datetime(df["date"])
    df = df[["date", "open", "high", "low", "close", "volume"]].reset_index(drop=True)
    _cache_put(key, df)
    return df


# ----------------------------------------------------------------------------
# 指数日线
# ----------------------------------------------------------------------------
def get_index_daily(market="A", symbol="000300", start=None, end=None, use_cache=True):
    """
    market='A' 用沪深重要指数；market='US' 用美股指数(如 'SP500' / 'IXIC')
    """
    if start is None:
        start = (datetime.now() - timedelta(days=365 * 3)).strftime("%Y%m%d")
    if end is None:
        end = datetime.now().strftime("%Y%m%d")
    key = f"idx_{market}_{symbol}_{start}_{end}"
    if use_cache:
        c = _cache_get(key)
        if c is not None:
            return c
    import akshare as ak
    if market == "A":
        df = _retry(ak.index_zh_a_hist, symbol=symbol, period="daily",
                    start_date=start, end_date=end)
        df = df.rename(columns={"日期": "date", "开盘": "open", "最高": "high",
                                 "最低": "low", "收盘": "close", "成交量": "volume"})
    else:
        df = _retry(ak.index_us_stock_sina, symbol=symbol)
        df = df.rename(columns={"date": "date", "open": "open", "high": "high",
                                 "low": "low", "close": "close", "volume": "volume"})
    df["date"] = pd.to_datetime(df["date"])
    df = df[["date", "open", "high", "low", "close", "volume"]].reset_index(drop=True)
    _cache_put(key, df)
    return df


# ----------------------------------------------------------------------------
# 股票基础信息（用于选股 universe）
# ----------------------------------------------------------------------------
def get_a_universe(use_cache=True):
    """返回 A股全部股票代码列表 [(code, name), ...]"""
    key = "a_universe"
    if use_cache:
        path = os.path.join(CACHE_DIR, key + ".json")
        if os.path.exists(path):
            with open(path) as f:
                return json.load(f)
    import akshare as ak
    df = _retry(ak.stock_info_a_code_name)
    uni = list(zip(df["code"].tolist(), df["name"].tolist()))
    with open(os.path.join(CACHE_DIR, key + ".json"), "w") as f:
        json.dump(uni, f)
    return uni


def get_us_universe(use_cache=True):
    """返回常见美股标的（采样，避免一次性拉全市场）"""
    return ["AAPL", "MSFT", "NVDA", "TSLA", "AMZN", "GOOG", "META",
            "JPM", "V", "UNH", "XOM", "JNJ", "WMT", "MA", "PG"]


if __name__ == "__main__":
    # 自测：各取一只
    maotai = get_a_daily("600519", "20240101", "20240601")
    print("A股 600519 行数:", len(maotai))
    print(maotai.tail(2))
    aapl = get_us_daily("AAPL", "20240101", "20240601")
    print("美股 AAPL 行数:", len(aapl))
    print(aapl.tail(2))
    hs300 = get_index_daily("A", "000300", "20240101", "20240601")
    print("沪深300 行数:", len(hs300))
