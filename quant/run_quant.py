"""
quant/run_quant.py — 量化回测主流程
串联：数据 -> 因子 -> 策略 -> 回测 -> 绩效 -> 输出(JSON + 报告)

用法：
  python run_quant.py --market A --top-n 10 --sample
  python run_quant.py --market US --top-n 10

输出：
  quant_output.json   (供前端读取：指标 + 净值曲线 base64 + 持仓/信号)
  report.html         (独立回测报告)
"""
import argparse
import json
import os
from datetime import datetime

import pandas as pd

from data import get_a_daily, get_us_daily, get_index_daily, get_a_universe, get_us_universe
from strategy import build_factor_panel, generate_weights
from backtest import run_backtest
from metrics import compute_metrics, plot_nav_curves

OUT_DIR = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(OUT_DIR, exist_ok=True)

# 龙头股采样池（避免一次性拉全市场封 IP；生产可换全市场或指数成分）
A_SAMPLE = ["600519", "000001", "601318", "600036", "000858", "601166",
            "600276", "000333", "600900", "601398", "600030", "000651",
            "002594", "600887", "601888", "600009", "601012", "600585",
            "000725", "603259"]
US_SAMPLE = ["AAPL", "MSFT", "NVDA", "TSLA", "AMZN", "GOOG", "META",
             "JPM", "V", "UNH", "XOM", "JNJ", "WMT", "MA", "PG"]


def run(market="A", top_n=10, use_sample=True, start="20210101", end=None):
    if end is None:
        end = datetime.now().strftime("%Y%m%d")
    symbols = A_SAMPLE if market == "A" else US_SAMPLE

    print(f"[1/5] 拉取 {market} 市场 {len(symbols)} 只标的历史数据 ...")
    prices = {}
    for i, s in enumerate(symbols):
        try:
            if market == "A":
                df = get_a_daily(s, start, end)
            else:
                df = get_us_daily(s, start, end)
            if len(df) > 60:
                prices[s] = df
        except Exception as e:  # noqa
            print(f"  skip {s}: {e}")
        if (i + 1) % 5 == 0:
            print(f"  已处理 {i + 1}/{len(symbols)}")
    print(f"  成功载入 {len(prices)} 只")

    print("[2/5] 计算因子 ...")
    panel = build_factor_panel(prices)

    print("[3/5] 生成多因子权重 ...")
    weights = generate_weights(panel, top_n=top_n)

    print("[4/5] 运行回测 ...")
    res = run_backtest(prices, weights, market=market)
    nav = res["nav"]

    # 基准（指数）
    print("[5/5] 绩效评估 ...")
    bm_nav = None
    try:
        if market == "A":
            bm = get_index_daily("A", "000300", start, end)
        else:
            bm = get_index_daily("US", "SP500", start, end)
        bm_nav = bm.copy()
        bm_nav["nav"] = bm_nav["close"] / bm_nav["close"].iloc[0] * res["init_cash"]
    except Exception as e:  # noqa
        print(f"  [warn] 基准获取失败（沙箱限流），仅算策略指标: {e}")
    if bm_nav is not None:
        metrics = compute_metrics(nav, bm_nav[["date", "nav"]])
        curve = plot_nav_curves(nav, bm_nav[["date", "nav"]],
                                title=f"{market}-share Multi-factor vs Benchmark")
    else:
        metrics = compute_metrics(nav)
        curve = plot_nav_curves(nav, title=f"{market}-share Multi-factor Strategy")

    # 最新一期持仓
    last_rd = sorted(weights.keys())[-1]
    latest_hold = weights[last_rd]

    output = {
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "market": market,
        "strategy": "多因子打分(动量+价值+质量+技术) Top%d 等权月度调仓" % top_n,
        "universe_size": len(prices),
        "metrics": metrics,
        "nav_curve_svg": curve,
        "latest_holding": latest_hold,
        "rebalance_count": len(weights),
        "trades_count": len(res["trades"]),
        "disclaimer": "历史回测不代表未来收益，仅供参考学习，不构成投资建议。",
    }

    out_json = os.path.join(OUT_DIR, "quant_output.json")
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"  已写出 {out_json}")

    # 独立 HTML 报告
    _write_report(output, os.path.join(OUT_DIR, "report.html"))
    print("  已写出 report.html")

    # 终端摘要
    print("\n===== 回测结果摘要 =====")
    for k, v in metrics.items():
        print(f"  {k}: {v}")
    return output


def _write_report(output, path):
    m = output["metrics"]
    rows = "".join(f"<tr><td>{k}</td><td>{v}</td></tr>" for k, v in m.items())
    hold = output.get("latest_holding", {})
    hold_rows = "".join(
        f"<tr><td>{s}</td><td>{w * 100:.1f}%</td></tr>" for s, w in
        sorted(hold.items(), key=lambda x: -x[1]))
    html = f"""<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>量化回测报告</title>
<style>
body{{background:#131520;color:#d8d8e8;font-family:-apple-system,'Segoe UI',sans-serif;padding:24px;max-width:900px;margin:auto}}
h1{{color:#62A4C8}} h2{{color:#a78bfa;font-size:16px;margin-top:28px}}
table{{width:100%;border-collapse:collapse;margin-top:8px}} td{{padding:8px 12px;border-bottom:1px solid #2a2a40;font-size:14px}}
.card{{background:#1e1e30;border-radius:12px;padding:16px;margin-top:12px}}
img{{max-width:100%;background:#1e1e30;border-radius:12px;padding:8px}}
.warn{{color:#D15757;font-size:12px}}
</style></head><body>
<h1>量化策略回测报告</h1>
<p class="warn">{output.get('disclaimer','')}</p>
<div class="card"><h2>策略信息</h2>
<p>市场：{output['market']} ｜ 策略：{output['strategy']}</p>
<p>股票池：{output['universe_size']} 只 ｜ 调仓次数：{output['rebalance_count']} ｜ 交易笔数：{output['trades_count']}</p>
<p>生成时间：{output['generated_at']}</p></div>
<div class="card"><h2>绩效指标</h2><table>{rows}</table></div>
<div class="card"><h2>净值曲线</h2><img src="{output['nav_curve_svg']}"></div>
<div class="card"><h2>最新一期持仓（{output.get('rebalance_count')} 期）</h2><table>{hold_rows}</table></div>
</body></html>"""
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--market", choices=["A", "US"], default="A")
    ap.add_argument("--top-n", type=int, default=10)
    ap.add_argument("--start", default="20210101")
    ap.add_argument("--end", default=None)
    args = ap.parse_args()
    run(market=args.market, top_n=args.top_n, start=args.start, end=args.end)
