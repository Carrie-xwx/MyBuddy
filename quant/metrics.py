"""
quant/metrics.py — 绩效评估
输入 nav DataFrame[date, nav]
输出 指标 dict + 净值曲线（matplotlib 存为 base64 svg）
"""
import base64
import io
from datetime import datetime

import numpy as np
import pandas as pd

TRADING_DAYS = 252


def compute_metrics(nav: pd.DataFrame, benchmark_nav: pd.DataFrame = None) -> dict:
    nav = nav.sort_values("date").reset_index(drop=True)
    nav["ret"] = nav["nav"].pct_change().fillna(0)
    total_return = nav["nav"].iloc[-1] / nav["nav"].iloc[0] - 1

    years = (nav["date"].iloc[-1] - nav["date"].iloc[0]).days / 365.25
    cagr = (nav["nav"].iloc[-1] / nav["nav"].iloc[0]) ** (1 / max(years, 1e-9)) - 1

    # 年化波动率
    vol = nav["ret"].std() * np.sqrt(TRADING_DAYS)
    # 夏普（无风险 2.5%）
    rf = 0.025
    sharpe = (nav["ret"].mean() * TRADING_DAYS - rf) / (vol + 1e-9) if vol > 0 else 0

    # 最大回撤
    cum = nav["nav"]
    running_max = cum.cummax()
    drawdown = cum / running_max - 1
    max_dd = drawdown.min()

    # 胜率：按交易日，上涨日占比
    win_rate = (nav["ret"] > 0).mean()

    # 卡玛比率
    calmar = cagr / abs(max_dd) if max_dd != 0 else 0

    metrics = {
        "start_date": nav["date"].iloc[0].strftime("%Y-%m-%d"),
        "end_date": nav["date"].iloc[-1].strftime("%Y-%m-%d"),
        "total_return": round(total_return * 100, 2),
        "cagr": round(cagr * 100, 2),
        "annual_vol": round(vol * 100, 2),
        "sharpe": round(sharpe, 2),
        "max_drawdown": round(max_dd * 100, 2),
        "win_rate": round(win_rate * 100, 2),
        "calmar": round(calmar, 2),
        "final_nav": round(nav["nav"].iloc[-1], 2),
    }

    if benchmark_nav is not None:
        bm = benchmark_nav.sort_values("date").reset_index(drop=True)
        excess = (nav["nav"].iloc[-1] / nav["nav"].iloc[0]) / (bm["nav"].iloc[-1] / bm["nav"].iloc[0]) - 1
        metrics["excess_return_vs_bench"] = round(excess * 100, 2)

    return metrics


def plot_nav_curves(nav: pd.DataFrame, benchmark_nav: pd.DataFrame = None,
                    title: str = "Net Value Curve") -> str:
    """返回 SVG 的 base64 字符串，供前端 <img> 使用（标签用英文，避免跨平台中文字体缺失）"""
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    import matplotlib.dates as mdates

    fig, ax = plt.subplots(figsize=(8, 3.2), dpi=120)
    ax.plot(nav["date"], nav["nav"] / nav["nav"].iloc[0], label="Strategy", color="#62A4C8", lw=1.6)
    if benchmark_nav is not None:
        bm = benchmark_nav.sort_values("date").reset_index(drop=True)
        ax.plot(bm["date"], bm["nav"] / bm["nav"].iloc[0], label="Benchmark", color="#D15757",
                lw=1.2, alpha=0.8)
    ax.set_title(title, color="#d8d8e8", fontsize=11)
    ax.set_ylabel("Net Value (norm.)", color="#d8d8e8", fontsize=9)
    ax.tick_params(colors="#9a9ab0", labelsize=8)
    ax.legend(loc="upper left", fontsize=8, frameon=False)
    ax.grid(True, alpha=0.15)
    fig.patch.set_alpha(0.0)
    ax.set_facecolor((0.0, 0.0, 0.0, 0.0))

    buf = io.BytesIO()
    fig.savefig(buf, format="svg", bbox_inches="tight")
    plt.close(fig)
    svg = buf.getvalue().decode("utf-8")
    return "data:image/svg+xml;base64," + base64.b64encode(svg.encode("utf-8")).decode("utf-8")


if __name__ == "__main__":
    from data import get_a_daily
    from backtest import run_backtest
    m = get_a_daily("600519", "20220101", "20231231")
    p = get_a_daily("000001", "20220101", "20231231")
    res = run_backtest({"600519": m, "000001": p},
                       {d: {"600519": 0.5, "000001": 0.5} for d in
                        ["2022-02-01", "2022-05-01", "2022-08-01", "2022-11-01"]}, market="A")
    bm = get_a_daily("600519", "20220101", "20231231")
    bm_nav = bm.copy()
    bm_nav["nav"] = bm_nav["close"] / bm_nav["close"].iloc[0] * 1_000_000
    mt = compute_metrics(res["nav"], bm_nav[["date", "nav"]])
    print(mt)
    svg = plot_nav_curves(res["nav"], bm_nav[["date", "nav"]])
    print("svg len:", len(svg))
