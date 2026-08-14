"""
fetch_hs300.py — 多趟下载沪深300全部成分股日线到本地缓存。
沙箱网络对数据源是间歇性抖动（偶发连接被 reset），所以采用：
  - 成功即写缓存；
  - 多趟重试，只补下尚未缓存的标的；
  - 每趟之间靠时间错开，蹭"网络好时段"。
跑完后再执行 run_quant.py 即可（命中缓存，秒级）。
"""
import time, os
from data import get_a_daily, get_hs300_constituents, CACHE_DIR

START, END = "20210101", "20260814"
MAX_PASS = 10
KEY = lambda s: f"a_{s}_qfq_{START}_{END}.csv"

def is_cached(s):
    return os.path.exists(os.path.join(CACHE_DIR, KEY(s)))

def main():
    cons = get_hs300_constituents()
    symbols = [c[0] for c in cons]
    print(f"沪深300 成分股 {len(symbols)} 只，开始多趟下载 (START={START})")
    for p in range(MAX_PASS):
        missing = [s for s in symbols if not is_cached(s)]
        done = len(symbols) - len(missing)
        print(f"\n=== Pass {p+1}: 已缓存 {done}/{len(symbols)}，本趟待下 {len(missing)} 只 ===")
        if not missing:
            print("全部就绪！"); break
        got = 0
        for s in missing:
            ok = False
            for attempt in range(3):
                try:
                    df = get_a_daily(s, START, END)
                    if df is not None and len(df) > 60:
                        ok = True
                        break
                except Exception:  # noqa
                    time.sleep(2)
            if ok:
                got += 1
            else:
                time.sleep(0.8)
        print(f"  本趟成功 {got} 只")
        if got == 0:
            print("  本趟无进展，休眠 15s 后重试...")
            time.sleep(15)
    final = sum(1 for s in symbols if is_cached(s))
    print(f"\n下载阶段结束：缓存 {final}/{len(symbols)} 只")

if __name__ == "__main__":
    main()
