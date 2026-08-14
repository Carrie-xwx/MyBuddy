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
    数据源：新浪 stock_zh_a_daily 为主（沙箱对东财连接会被中断），
           东财 stock_zh_a_hist 为兜底。两源列名一致，缓存可通用。
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
    sina_symbol = ("sh" if symbol[0] == "6" else "sz") + symbol
    df = None
    try:
        df = _retry(ak.stock_zh_a_daily, symbol=sina_symbol,
                    start_date=start, end_date=end, adjust=adjust)
    except Exception as e:  # noqa
        print(f"  [warn] 新浪失败 {symbol}: {e}，降级东财")
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
    df = None
    try:
        df = _retry(ak.stock_us_daily, symbol=symbol.upper(),
                    start_date=start, end_date=end, adjust=adjust)
    except Exception as e:  # noqa
        print(f"  [warn] 美股新浪失败 {symbol}: {e}，降级东财")
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
    A股优先东方财富，失败自动降级新浪(沙箱更稳)；美股用新浪。
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
    df = None
    if market == "A":
        try:
            df = _retry(ak.index_zh_a_hist, symbol=symbol, period="daily",
                        start_date=start, end_date=end)
            df = df.rename(columns={"日期": "date", "开盘": "open", "最高": "high",
                                     "最低": "low", "收盘": "close", "成交量": "volume"})
        except Exception as e:  # noqa
            # 降级新浪指数日线（代码转换：000300->sh000300, 399001->sz399001）
            sina_code = ("sh" if symbol[0] == "0" and symbol != "399001" else
                         ("sz" if symbol.startswith("399") else "sh")) + symbol
            sina = _retry(ak.stock_zh_index_daily, symbol=sina_code)
            sina = sina.rename(columns={"date": "date", "open": "open", "high": "high",
                                        "low": "low", "close": "close", "volume": "volume"})
            sina["date"] = pd.to_datetime(sina["date"])
            sd, ed = pd.to_datetime(start), pd.to_datetime(end)
            df = sina[(sina["date"] >= sd) & (sina["date"] <= ed)].reset_index(drop=True)
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


def get_hs300_constituents(use_cache=True):
    """
    返回 沪深300 成分股 [(code, name), ...]
    用于扩大回测股票池、检验多因子模型能否跑赢沪深300基准。
    兼容 AKShare 不同版本的列名（'代码'/'symbol_code'/'code' 等）。
    """
    key = "hs300_constituents"
    if use_cache:
        path = os.path.join(CACHE_DIR, key + ".json")
        if os.path.exists(path):
            with open(path) as f:
                return json.load(f)
    import akshare as ak
    df = None
    # 首选中证指数官方接口（最权威、列规范）
    try:
        df = _retry(ak.index_stock_cons_csindex, symbol="000300")
    except Exception as e:  # noqa
        print(f"  [warn] csindex 接口失败，降级东财: {e}")
        df = None
    # 兜底：东财成分股接口（裸代码格式 '000300'）
    if df is None or len(df) == 0:
        df = _retry(ak.index_stock_cons, symbol="000300")
    cols = list(df.columns)
    # 优先取「成分券」列（中证接口同时含 指数代码/指数名称 与 成分券代码/成分券名称，
    # 必须避开 指数代码，否则会全部取到指数本身的代码 000300）
    code_col = (
        next((c for c in cols if "成分券代码" in c or c.lower() == "symbol_code"), None)
        or next((c for c in cols if "代码" in c and "指数" not in c), None)
        or next((c for c in cols if "code" in c.lower()), None)
    )
    name_col = (
        next((c for c in cols if "成分券名称" in c or c.lower() == "symbol_name"), None)
        or next((c for c in cols if "名称" in c and "指数" not in c), None)
        or next((c for c in cols if "name" in c.lower()), None)
    )
    if code_col is None:
        code_col = cols[1] if len(cols) > 1 else cols[0]
    if name_col is None:
        name_col = cols[2] if len(cols) > 2 else code_col
    uni = []
    for _, r in df.iterrows():
        code = str(r[code_col]).strip().zfill(6)
        if not code.isdigit() or len(code) != 6:
            continue
        uni.append((code, str(r[name_col])))
    with open(os.path.join(CACHE_DIR, key + ".json"), "w") as f:
        json.dump(uni, f, ensure_ascii=False)
    return uni


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
