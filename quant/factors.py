"""
quant/factors.py — 因子与特征工程
输入：单只股票的日线 DataFrame（data.py 输出格式）
输出：带因子列的 DataFrame，索引为日期

因子列表（兼顾 A股/美股通用性）：
  动量类：ret_20, ret_60, ret_120（N日收益率）
  技术类：ma_dev_20（收盘价/20均线-1）, rsi_14, vol_ratio_20（量比）
  波动类：volatility_20（20日收益率 std 年化）
  质量/价值类（需财务输入，先留接口）
"""
import numpy as np
import pandas as pd


def _rsi(close: pd.Series, n: int = 14) -> pd.Series:
    delta = close.diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)
    avg_gain = gain.rolling(n, min_periods=1).mean()
    avg_loss = loss.rolling(n, min_periods=1).mean()
    rs = avg_gain / (avg_loss + 1e-9)
    return 100 - 100 / (1 + rs)


def compute_factors(df: pd.DataFrame) -> pd.DataFrame:
    """给单只股票日线计算因子列"""
    df = df.copy()
    df = df.sort_values("date").reset_index(drop=True)
    c = df["close"]

    # 动量
    df["ret_20"] = c.pct_change(20)
    df["ret_60"] = c.pct_change(60)
    df["ret_120"] = c.pct_change(120)

    # 均线偏离
    ma20 = c.rolling(20, min_periods=5).mean()
    df["ma_dev_20"] = c / (ma20 + 1e-9) - 1
    ma60 = c.rolling(60, min_periods=10).mean()
    df["ma_dev_60"] = c / (ma60 + 1e-9) - 1
    ma250 = c.rolling(250, min_periods=60).mean()
    df["ma_dev_250"] = c / (ma250 + 1e-9) - 1   # 长期估值偏离：越低越便宜

    # RSI
    df["rsi_14"] = _rsi(c, 14)

    # 量比
    vol_ma20 = df["volume"].rolling(20, min_periods=5).mean()
    df["vol_ratio_20"] = df["volume"] / (vol_ma20 + 1e-9)

    # 波动率（年化，20日）
    df["volatility_20"] = c.pct_change().rolling(20, min_periods=5).std() * np.sqrt(252)

    # 均线金叉信号（ma20 上穿 ma60 的当日记为 1）
    df["golden_cross"] = ((ma20 > ma60) & (ma20.shift(1) <= ma60.shift(1))).astype(int)

    return df


# 因子权重（用于合成综合得分，范围 -1..1，越正越看好）
FACTOR_WEIGHTS = {
    "ret_20": 0.22,
    "ret_60": 0.18,
    "ret_120": 0.08,
    "ma_dev_20": 0.08,
    "ma_dev_60": 0.04,
    "ma_dev_250": -0.15,    # 低估值(长期低位)加分 —— 价值因子
    "rsi_14": -0.05,        # RSI 过高略减分（防追高）
    "vol_ratio_20": 0.08,   # 温和放量加分
    "volatility_20": -0.12, # 高波动减分（防御）
    "golden_cross": 0.04,
}


def normalize_cross_section(scores: pd.Series) -> pd.Series:
    """横截面标准化（z-score），使不同股票可比"""
    mu, sigma = scores.mean(), scores.std()
    if sigma == 0 or np.isnan(sigma):
        return scores * 0
    return (scores - mu) / (sigma + 1e-9)


if __name__ == "__main__":
    from data import get_a_daily
    df = get_a_daily("600519", "20230101", "20240601")
    f = compute_factors(df)
    print(f[["date", "close", "ret_20", "rsi_14", "volatility_20"]].tail(3))
