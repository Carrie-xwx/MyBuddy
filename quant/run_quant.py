"""
quant/run_quant.py — 量化回测主流程 v2
串联：数据 -> 因子 -> 策略(含市场状态过滤) -> 回测(含止损+动态仓位) -> 绩效 -> 输出

用法：
  python run_quant.py --market A --top-n 10 --start 20210101
  python run_quant.py --market US --top-n 10

输出：
  quant_output.json   (供前端读取)
  report.html         (独立回测报告)
"""
import argparse
import json
import os
from datetime import datetime

import pandas as pd

from data import (get_a_daily, get_us_daily, get_index_daily,
               get_a_universe, get_us_universe, get_hs300_constituents)
from strategy import build_factor_panel, generate_weights, compute_market_regime
from backtest import run_backtest
from metrics import compute_metrics, plot_nav_curves

OUT_DIR = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(OUT_DIR, exist_ok=True)

# 龙头股采样池（行业分散，覆盖银行/保险/券商/消费/医药/新能源/科技/能源/公用/通信/地产/机械/汽车/煤炭/化工/有色，
# 避免单一风格偏差；生产可换全市场或指数成分）
A_SAMPLE = [
    # 银行
    "600036", "601398", "601166", "600000", "601328",
    # 保险/券商
    "601318", "601628", "600030", "600837",
    # 消费
    "600519", "000858", "600887", "000651", "603288",
    # 医药
    "600276", "300760", "000538",
    # 新能源
    "002594", "300750", "601012",
    # 科技
    "000725", "603259", "002415", "688981",
    # 能源/公用
    "601857", "600028", "600900", "601985",
    # 通信
    "600941", "601728",
    # 地产/机械/汽车/煤炭/化工/有色
    "000002", "600048", "600031", "600104", "601088", "600309", "600362",
]
US_SAMPLE = ["AAPL", "MSFT", "NVDA", "TSLA", "AMZN", "GOOG", "META",
             "JPM", "V", "UNH", "XOM", "JNJ", "WMT", "MA", "PG"]

STOP_LOSS = -0.10   # 个股浮亏 10% 止损


def run(market="A", top_n=10, start="20210101", end=None, stop_loss=STOP_LOSS,
        universe="sample", out_name="quant_output.json"):
    if end is None:
        end = datetime.now().strftime("%Y%m%d")
    if market == "A":
        if universe == "hs300":
            print("[0/5] 获取沪深300成分股 ...")
            constituents = get_hs300_constituents()
            symbols = [c[0] for c in constituents]
            universe_label = f"沪深300({len(symbols)}只)"
            print(f"  沪深300 成分股 {len(symbols)} 只")
        else:
            symbols = A_SAMPLE
            universe_label = f"龙头样本({len(symbols)}只)"
    else:
        symbols = US_SAMPLE
        universe_label = f"美股样本({len(symbols)}只)"
    idx_code = "000300" if market == "A" else "SP500"

    print(f"[1/5] 拉取 {market} 市场 {len(symbols)} 只标的历史数据 ...")
    import time as _t
    prices = {}
    for i, s in enumerate(symbols):
        df = None
        for attempt in range(2):
            try:
                df = get_a_daily(s, start, end) if market == "A" else get_us_daily(s, start, end)
                break
            except Exception as e:  # noqa
                if attempt == 0:
                    print(f"  retry {s}: {e}")
                    _t.sleep(4)
                else:
                    print(f"  skip {s}: {e}")
        if df is not None and len(df) > 60:
            prices[s] = df
        _t.sleep(0.4)  # 节流，避免触发源站限流
        if (i + 1) % 20 == 0:
            print(f"  已处理 {i + 1}/{len(symbols)}，成功 {len(prices)} 只")
    print(f"  成功载入 {len(prices)} 只")

    print("[2/5] 计算因子 ...")
    panel = build_factor_panel(prices)

    # 基准指数（用于市场状态判断 + 绩效对比）
    print("[2.5/5] 获取基准指数（向前多取 400 天以计算长期均线）...")
    bm_df = None
    try:
        bm_start = (pd.to_datetime(start) - pd.Timedelta(days=400)).strftime("%Y%m%d")
        bm_df = get_index_daily(market, idx_code, bm_start, end)
        regime = compute_market_regime(bm_df)
        bull = sum(1 for v in regime.values() if v[0] == "BULL")
        bear = sum(1 for v in regime.values() if v[0] == "BEAR")
        print(f"  市场状态分布: 牛市{bull}天 / 震荡{len(regime)-bull-bear}天 / 熊市{bear}天")
    except Exception as e:  # noqa
        regime = None
        print(f"  [warn] 基准获取失败，退化为满仓多头: {e}")

    print("[3/5] 生成多因子权重 + 市场状态动态仓位（二元择时：牛满仓/非牛空仓）...")
    weights, gross = generate_weights(panel, top_n=top_n, benchmark_df=bm_df,
                                      regime=regime, regime_mode="binary")

    print("[4/5] 运行回测（含个股止损 + 动态仓位）...")
    res = run_backtest(prices, weights, market=market, stop_loss=stop_loss, gross=gross)
    nav = res["nav"]

    print("[5/5] 绩效评估 ...")
    bm_nav = None
    if bm_df is not None:
        try:
            bm_nav = bm_df.copy()
            # 基准历史可能比回测区间更长(用于算均线)，绩效对比需对齐到回测起点
            bm_nav = bm_nav[bm_nav["date"] >= pd.to_datetime(start)].reset_index(drop=True)
            bm_nav["nav"] = bm_nav["close"] / bm_nav["close"].iloc[0] * res["init_cash"]
        except Exception:  # noqa
            bm_nav = None
    if bm_nav is not None:
        metrics = compute_metrics(nav, bm_nav[["date", "nav"]])
        curve = plot_nav_curves(nav, bm_nav[["date", "nav"]],
                                title=f"{market}-share Multi-factor v2 vs Benchmark")
    else:
        metrics = compute_metrics(nav)
        curve = plot_nav_curves(nav, title=f"{market}-share Multi-factor v2")

    # 最新一期持仓与仓位状态
    last_rd = sorted(weights.keys())[-1] if weights else None
    latest_hold = weights.get(last_rd, {}) if last_rd else {}
    last_gross = gross.get(last_rd, 1.0) if last_rd else 1.0
    last_regime = regime.get(last_rd, ("NEUTRAL", 0.5))[0] if regime and last_rd else "N/A"

    strat_desc = (f"多因子打分(动量+价值+低估值+质量+技术) Top{top_n} 等权，"
                  f"月度调仓；市场状态二元择时(牛满仓/非牛空仓)；"
                  f"个股趋势过滤；个股止损{int(stop_loss*100)}%")

    output = {
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "market": market,
        "strategy": strat_desc,
        "version": "v2",
        "universe": universe_label,
        "universe_size": len(prices),
        "stop_loss": stop_loss,
        "metrics": metrics,
        "nav_curve_svg": curve,
        "latest_holding": latest_hold,
        "last_rebalance_date": last_rd,
        "last_market_regime": last_regime,
        "last_gross": last_gross,
        "rebalance_count": len(weights),
        "trades_count": len(res["trades"]),
        "disclaimer": "历史回测不代表未来收益，仅供参考学习，不构成投资建议。",
    }

    out_json = os.path.join(OUT_DIR, out_name)
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"  已写出 {out_json}")

    report_base = out_name.replace(".json", "") if out_name.endswith(".json") else out_name
    _write_report(output, os.path.join(OUT_DIR, f"report_{report_base}.html"))
    print(f"  已写出 report_{report_base}.html")

    print("\n===== 回测结果摘要 (v2) =====")
    for k, v in metrics.items():
        print(f"  {k}: {v}")
    print(f"  最新市场状态: {last_regime}  仓位系数: {last_gross}")
    return output


def _write_report(output, path):
    m = output["metrics"]
    rows = "".join(f"<tr><td>{k}</td><td>{v}</td></tr>" for k, v in m.items())
    hold = output.get("latest_holding", {})
    hold_rows = "".join(
        f"<tr><td>{s}</td><td>{w * 100:.1f}%</td></tr>" for s, w in
        sorted(hold.items(), key=lambda x: -x[1])) or "<tr><td colspan='2'>当前空仓（市场空头/无可选标的）</td></tr>"
    pos_state = f"{output.get('last_market_regime','-')} / 仓位 {int(output.get('last_gross',1)*100)}%"
    html = f"""<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>量化回测报告 v2</title>
<style>
body{{background:#131520;color:#d8d8e8;font-family:-apple-system,'Segoe UI',sans-serif;padding:24px;max-width:900px;margin:auto}}
h1{{color:#62A4C8}} h2{{color:#a78bfa;font-size:16px;margin-top:28px}}
table{{width:100%;border-collapse:collapse;margin-top:8px}} td{{padding:8px 12px;border-bottom:1px solid #2a2a40;font-size:14px}}
.card{{background:#1e1e30;border-radius:12px;padding:16px;margin-top:12px}}
img{{max-width:100%;background:#1e1e30;border-radius:12px;padding:8px}}
.warn{{color:#D15757;font-size:12px}}
.tag{{display:inline-block;padding:2px 10px;border-radius:10px;background:#2a2a40;font-size:12px;margin-right:6px}}
</style></head><body>
<h1>量化策略回测报告 v2</h1>
<p class="warn">{output.get('disclaimer','')}</p>
<div class="card"><h2>策略信息</h2>
<p><span class="tag">市场 {output['market']}</span><span class="tag">版本 {output.get('version','v2')}</span><span class="tag">止损 {int(output.get('stop_loss',-0.1)*100)}%</span></p>
<p>策略：{output['strategy']}</p>
<p>股票池：{output['universe_size']} 只 ｜ 调仓次数：{output['rebalance_count']} ｜ 交易笔数：{output['trades_count']}</p>
<p>股票池范围：{output.get('universe','-')}</p>
<p>最新市场状态：{pos_state} ｜ 最近调仓日：{output.get('last_rebalance_date','-')}</p>
<p>生成时间：{output['generated_at']}</p></div>
<div class="card"><h2>绩效指标</h2><table>{rows}</table></div>
<div class="card"><h2>净值曲线</h2><img src="{output['nav_curve_svg']}"></div>
<div class="card"><h2>最新一期持仓</h2><table>{hold_rows}</table></div>
</body></html>"""
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--market", choices=["A", "US"], default="A")
    ap.add_argument("--top-n", type=int, default=10)
    ap.add_argument("--start", default="20210101")
    ap.add_argument("--end", default=None)
    ap.add_argument("--universe", choices=["sample", "hs300"], default="sample",
                    help="sample=龙头样本(默认) / hs300=沪深300全成分")
    ap.add_argument("--out", default="quant_output.json",
                    help="输出 JSON 文件名（默认 quant_output.json，生产版）")
    args = ap.parse_args()
    run(market=args.market, top_n=args.top_n, start=args.start, end=args.end,
        universe=args.universe, out_name=args.out)
