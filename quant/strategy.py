"""
quant/strategy.py — 多因子组合策略
思路（借鉴 Qlib 因子工作流 + 简化版）：
  1. 对股票池每只股票计算因子（factors.py）
  2. 每个调仓日，对因子做横截面 z-score 标准化
  3. 按权重合成综合得分
  4. 取得分最高的 TopN 作为下期持仓，等权配置
  5. 月度调仓（可配置）

预留 ML 接口：若提供 model，则用模型预测收益率替代线性加权打分。
"""
from datetime import datetime
import numpy as np
import pandas as pd

from factors import FACTOR_WEIGHTS, compute_factors, normalize_cross_section


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


def generate_weights(panel: dict, top_n: int = 10,
                      rebalance: str = "M") -> dict:
    """
    返回 weights: dict[rebalance_date] -> dict[symbol] -> weight
    调仓日使用的因子值为该调仓日当天可得的最新因子（防未来函数：用上月末因子决定下月初调仓）
    """
    # 收集所有交易日
    all_dates = set()
    for df in panel.values():
        all_dates.update(df["date"].dt.strftime("%Y-%m-%d").tolist())
    all_dates = sorted(all_dates)
    date_set = set(all_dates)

    # 调仓日：月末
    rebal_days = _month_end_dates(pd.to_datetime(all_dates))

    weights = {}
    for i, rd in enumerate(rebal_days):
        # 用该调仓日当天的因子值
        scores = {}
        valid = {}
        for sym, df in panel.items():
            row = df[df["date"].dt.strftime("%Y-%m-%d") == rd]
            if row.empty:
                continue
            r = row.iloc[0]
            score = 0.0
            for fac, w in FACTOR_WEIGHTS.items():
                v = r.get(fac)
                if pd.notna(v) and np.isfinite(v):
                    score += w * v
            if pd.notna(score) and np.isfinite(score):
                scores[sym] = (score, r)
                valid[sym] = r
        if not scores:
            continue
        # 横截面标准化综合得分
        raw = pd.Series({s: v[0] for s, v in scores.items()})
        z = normalize_cross_section(raw)
        # 选 TopN（得分最高）
        ranked = z.sort_values(ascending=False)
        picks = ranked.head(top_n)
        if picks.sum() == 0:
            picks = picks + 1e-9
        w = picks / picks.sum()
        weights[rd] = w.to_dict()
    return weights


def generate_weights_with_model(panel: dict, model, feature_cols: list,
                                 top_n: int = 10) -> dict:
    """ML 版本：用 model 预测下期收益，取预测最高的 TopN"""
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
    from data import get_a_daily
    # 采样 8 只龙头股验证
    sample = ["600519", "000001", "601318", "600036", "000858", "601166", "600276", "000333"]
    prices = {s: get_a_daily(s, "20210101", "20231231") for s in sample}
    panel = build_factor_panel(prices)
    w = generate_weights(panel, top_n=5)
    print("调仓次数:", len(w))
    first_rd = sorted(w.keys())[1]
    print("首个调仓日", first_rd, "持仓:", w[first_rd])
