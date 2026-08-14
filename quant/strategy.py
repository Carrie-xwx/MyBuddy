"""
quant/strategy.py — 多因子组合策略 v2
改进（对比 v1）：
  1. 市场状态过滤（market regime）：基于基准指数均线+动量判断牛熊，
     熊市空仓、震荡市半仓、牛市满仓 —— 这是熊市保护最有效的单一机制。
  2. 个股趋势过滤：只选处在上升通道(ret_60>0 且 close>ma60)的个股。
  3. 动态总仓位（gross）：随市场状态在 0/0.5/1.0 之间切换。

因子合成仍沿用 Qlib 风格的横截面 z-score 标准化 + 加权打分。
"""
from datetime import datetime
import numpy as np
import pandas as pd

from factors import FACTOR_WEIGHTS, compute_factors, normalize_cross_section

# 市场状态 -> 目标总仓位系数
REGIME_GROSS = {"BULL": 1.0, "NEUTRAL": 0.5, "BEAR": 0.0}


def compute_market_regime(benchmark_df: pd.DataFrame,
                          ma_long: int = 200, mom: int = 60,
                          mom_long: int = 120, strict: bool = False,
                          dd_guard: float = 0.15) -> dict:
    """
    benchmark_df: DataFrame[date, close]
    返回 dict[date_str] -> ('BULL'|'NEUTRAL'|'BEAR', gross)
      BULL:    收盘价>长期均线 且 中期动量>0
      BEAR:    收盘价<长期均线 且 中期动量<0
      NEUTRAL: 其他
    牛顶保护(dd_guard): 基准从 ma_long 高点回撤超过 dd_guard 时强制空仓，
      能在牛顶崩塌初期及时撤退，显著降低完整牛熊周期的回撤。
    """
    df = benchmark_df.copy().sort_values("date").reset_index(drop=True)
    c = df["close"]
    ma_l = c.rolling(ma_long, min_periods=min(ma_long, 20)).mean()
    mom_n = c.pct_change(mom)
    mom_l = c.pct_change(mom_long)
    high_l = c.rolling(ma_long, min_periods=60).max()
    dd = c / (high_l + 1e-9) - 1
    regime = {}
    for _, r in df.iterrows():
        d = r["date"].strftime("%Y-%m-%d")
        i = r.name
        if pd.isna(ma_l.iloc[i]) or pd.isna(mom_n.iloc[i]):
            regime[d] = ("NEUTRAL", REGIME_GROSS["NEUTRAL"])
            continue
        # 牛顶回撤保护：强制空仓
        if dd.iloc[i] < -dd_guard:
            regime[d] = ("BEAR", 0.0)
            continue
        above = c.iloc[i] > ma_l.iloc[i]
        up = mom_n.iloc[i] > 0
        if above and up:
            regime[d] = ("BULL", REGIME_GROSS["BULL"])
        elif (not above) and (not up):
            regime[d] = ("BEAR", REGIME_GROSS["BEAR"])
        else:
            regime[d] = ("NEUTRAL", REGIME_GROSS["NEUTRAL"])
    return regime


def build_factor_panel(prices: dict) -> dict:
    """prices: dict[symbol] -> 日线DataFrame -> 返回 dict[symbol] -> 因子DataFrame"""
    panel = {}
    for sym, df in prices.items():
        try:
            panel[sym] = compute_factors(df)
        except Exception as e:  # noqa
            print(f"  [warn] 因子计算失败 {sym}: {e}")
    return panel


def _month_end_dates(dates: pd.DatetimeIndex) -> list:
    """返回每月最后一个交易日"""
    s = pd.Series(index=dates, data=dates)
    month_groups = s.groupby(s.index.to_period("M"))
    return [d for d in month_groups.max().dt.strftime("%Y-%m-%d")]


def generate_weights(panel: dict, top_n: int = 10, rebalance: str = "M",
                     benchmark_df: pd.DataFrame = None,
                     regime: dict = None, regime_mode: str = "binary") -> tuple:
    """
    返回 (weights, gross)
      weights: dict[rebalance_date] -> dict[symbol] -> 归一化权重(和为1)
      gross:   dict[rebalance_date] -> 目标总仓位系数 0..1
    regime_mode:
      'binary' : 牛市满仓，非牛市空仓（回撤最小，默认）
      'tri'    : 牛市满仓/震荡半仓/熊市空仓
    防未来函数：用调仓日当天的因子值 + 调仓日当天的市场状态。
    """
    all_dates = set()
    for df in panel.values():
        all_dates.update(df["date"].dt.strftime("%Y-%m-%d").tolist())
    all_dates = sorted(all_dates)

    # 计算市场状态（若未提供 benchmark 则退化为全仓多头 v1 行为）
    if regime is None and benchmark_df is not None:
        regime = compute_market_regime(benchmark_df)
    use_regime = regime is not None

    rebal_days = _month_end_dates(pd.to_datetime(all_dates))

    weights, gross = {}, {}
    for rd in rebal_days:
        # 市场状态 -> 目标总仓位
        if use_regime:
            reg, _ = regime.get(rd, ("NEUTRAL", 0.5))
        else:
            reg, _ = "BULL", 1.0
        if regime_mode == "binary":
            g = 1.0 if reg == "BULL" else 0.0
        else:
            g = REGIME_GROSS.get(reg, 0.5)

        # 非满仓市场：清仓（空仓或待命）
        if g == 0.0:
            weights[rd] = {}
            gross[rd] = 0.0
            continue

        # 个股打分
        scores = {}
        for sym, df in panel.items():
            row = df[df["date"].dt.strftime("%Y-%m-%d") == rd]
            if row.empty:
                continue
            r = row.iloc[0]
            # 个股趋势过滤：上升通道（ret_60>0 且 close>ma60）
            if not (r.get("ret_60", 0) is not None and r.get("ret_60", -9) > 0
                    and r.get("ma_dev_60", -9) > 0):
                continue
            score = 0.0
            for fac, w in FACTOR_WEIGHTS.items():
                v = r.get(fac)
                if pd.notna(v) and np.isfinite(v):
                    score += w * v
            if pd.notna(score) and np.isfinite(score):
                scores[sym] = score
        if not scores:
            weights[rd] = {}
            gross[rd] = g * 0.0  # 无可选标的时也保守
            continue

        raw = pd.Series(scores)
        z = normalize_cross_section(raw)
        ranked = z.sort_values(ascending=False)
        picks = ranked.head(top_n)
        if picks.sum() == 0:
            picks = picks + 1e-9
        w = picks / picks.sum()
        weights[rd] = w.to_dict()
        gross[rd] = g  # 牛市1.0 / 震荡0.5

    return weights, gross


def generate_weights_with_model(panel: dict, model, feature_cols: list,
                                 top_n: int = 10) -> dict:
    """ML 版本：用 model 预测下期收益，取预测最高的 TopN（保留 v1 接口）"""
    all_dates = set()
    for df in panel.values():
        all_dates.update(df["date"].dt.strftime("%Y-%m-%d").tolist())
    rebal_days = _month_end_dates(pd.to_datetime(sorted(all_dates)))

    weights = {}
    for rd in rebal_days:
        preds = {}
        for sym, df in panel.items():
            row = df[df["date"].dt.strftime("%Y-%m-%d") == rd]
            if row.empty:
                continue
            r = row.iloc[0]
            x = np.array([[r.get(c, np.nan) for c in feature_cols]])
            if np.any(pd.isna(x)):
                continue
            try:
                p = float(model.predict(x)[0])
                preds[sym] = p
            except Exception:  # noqa
                continue
        if not preds:
            continue
        s = pd.Series(preds).sort_values(ascending=False)
        picks = s.head(top_n)
        w = picks / picks.sum()
        weights[rd] = w.to_dict()
    return weights


if __name__ == "__main__":
    from data import get_a_daily, get_index_daily
    sample = ["600519", "000001", "601318", "600036", "000858", "601166",
              "600276", "000333"]
    prices = {s: get_a_daily(s, "20210101", "20231231") for s in sample}
    bm = get_index_daily("A", "000300", "20210101", "20231231")
    regime = compute_market_regime(bm)
    panel = build_factor_panel(prices)
    w, g = generate_weights(panel, top_n=5, benchmark_df=bm, regime=regime)
    print("调仓次数:", len(w))
    first_rd = sorted(w.keys())[2]
    print("调仓日", first_rd, "仓位系数", g[first_rd], "持仓:", w[first_rd])
