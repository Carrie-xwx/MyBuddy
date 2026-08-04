#!/usr/bin/env python3
"""
MyBuddy WorkStation - Daily Data Fetcher
Runs on GitHub Actions, fetches real-time market data and updates data.js

Data sources:
- A-share indices: Eastmoney push API (no auth needed)
- US indices: Yahoo Finance chart API
- Financial news: Sina Finance roll API
- Hot/weak sectors: Eastmoney sector API
"""

import json
import re
import sys
import os
from datetime import datetime, timezone, timedelta

try:
    import requests
except ImportError:
    os.system(f'{sys.executable} -m pip install requests -q')
    import requests

# Beijing timezone
BEIJING_TZ = timezone(timedelta(hours=8))
NOW = datetime.now(BEIJING_TZ)
TODAY = NOW.strftime('%Y-%m-%d')
WEEKDAY = NOW.weekday()  # 0=Monday, 6=Sunday

# File paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
DATA_JS_PATH = os.path.join(PROJECT_DIR, 'js', 'data.js')
APP_JS_PATH = os.path.join(PROJECT_DIR, 'js', 'app.js')

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Referer': 'https://quote.eastmoney.com/'
}

# ============================================================
# A-Share Indices (Eastmoney)
# ============================================================
A_SHARE_INDICES = [
    ("1.000001", "上证指数", "SH000001"),
    ("0.399001", "深证成指", "SZ399001"),
    ("0.399006", "创业板指", "SZ399006"),
    ("1.000300", "沪深300", "SH000300"),
    ("1.000688", "科创50", "SH000688"),
]

def fetch_with_retry(url, params=None, headers=None, timeout=30, retries=3):
    """HTTP GET with retry logic"""
    import time
    last_err = None
    for attempt in range(retries):
        try:
            resp = requests.get(url, params=params, headers=headers, timeout=timeout)
            resp.raise_for_status()
            return resp
        except Exception as e:
            last_err = e
            if attempt < retries - 1:
                wait = 2 ** attempt  # 1, 2, 4 seconds
                print(f"  [WARN] Retry {attempt+1}/{retries-1} after {wait}s: {e}")
                time.sleep(wait)
    raise last_err


def fetch_a_share_indices():
    """Fetch A-share index data — try Tencent first, Eastmoney as fallback"""
    results = []
    secid_to_info = {s[1].replace("指数", "").replace("00", ""): s for s in A_SHARE_INDICES}
    # Better: use full name mapping
    name_map = {
        "上证指数": ("1.000001", "上证指数", "SH000001"),
        "深证成指": ("0.399001", "深证成指", "SZ399001"),
        "创业板指": ("0.399006", "创业板指", "SZ399006"),
        "沪深300": ("1.000300", "沪深300", "SH000300"),
        "科创50": ("1.000688", "科创50", "SH000688"),
    }

    # --- Try Tencent (qt.gtimg.cn) — most reliable ---
    try:
        symbols = ["sh000001", "sz399001", "sz399006", "sh000300", "sh000688"]
        url = f"https://qt.gtimg.cn/q={','.join(symbols)}"
        resp = fetch_with_retry(url, timeout=20, retries=3)
        text = resp.content.decode('gbk', errors='ignore')
        # Format: v_sh000001="1~上证指数~000001~3816.37~...~+0.18~..."
        for i, line in enumerate(text.strip().split('\n')):
            if '=' not in line:
                continue
            data = line.split('=', 1)[1].strip().strip('"')
            parts = data.split('~')
            if len(parts) < 32:
                continue
            symbol = symbols[i]
            name = parts[1]
            current = parts[3]
            change_pct = parts[32] if len(parts) > 32 else parts[6]
            # Match to our config
            for display_name, (secid, dn, code) in name_map.items():
                if dn == name:
                    try:
                        chg = float(change_pct)
                        chg_sign = "+" if chg >= 0 else ""
                    except:
                        chg_sign = ""
                    results.append({
                        "name": dn,
                        "code": code,
                        "value": current,
                        "change": f"{chg_sign}{change_pct}%",
                        "market": "A股",
                        "updateTime": f"{TODAY} 实时"
                    })
                    break
        if results:
            print(f"  [OK] Got A-share indices from Tencent: {len(results)} items")
            return results
    except Exception as e:
        print(f"  [WARN] Tencent A-share failed: {e}")

    # --- Fallback: Eastmoney push API ---
    secids = ",".join([s[0] for s in A_SHARE_INDICES])
    url = "https://push2.eastmoney.com/api/qt/ulist.np/get"
    params = {
        "fields": "f2,f3,f4,f12,f13,f14",
        "secids": secids,
        "fltt": "2",
    }
    try:
        resp = fetch_with_retry(url, params=params, headers=HEADERS, timeout=30, retries=3)
        data = resp.json()
        items = data.get("data", {}).get("diff", [])
        if isinstance(items, dict):
            items = list(items.values())
        for item in items:
            code = item.get("f12", "")
            name = item.get("f14", "")
            value = item.get("f2", 0)
            change = item.get("f3", 0)
            for secid, display_name, display_code in A_SHARE_INDICES:
                if secid.split(".")[1] == code:
                    val_str = f"{value:,.2f}" if isinstance(value, (int, float)) and value > 0 else str(value)
                    chg_sign = "+" if change >= 0 else ""
                    results.append({
                        "name": display_name,
                        "code": display_code,
                        "value": val_str,
                        "change": f"{chg_sign}{change:.2f}%",
                        "market": "A股",
                        "updateTime": f"{TODAY} 实时"
                    })
                    break
        if results:
            print(f"  [OK] Got A-share indices from Eastmoney: {len(results)} items")
    except Exception as e:
        print(f"  [WARN] Eastmoney A-share fallback failed: {e}")
    return results

# ============================================================
# US Indices (Yahoo Finance)
# ============================================================
US_INDICES = [
    ("^GSPC", "标普500", "SPX"),
    ("^IXIC", "纳斯达克", "IXIC"),
    ("^DJI", "道琼斯", "DJI"),
]

def fetch_us_indices():
    """Fetch US index data from Yahoo Finance"""
    results = []
    for symbol, name, code in US_INDICES:
        url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}"
        params = {"interval": "1d", "range": "5d"}
        try:
            resp = requests.get(url, params=params, headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }, timeout=15)
            resp.raise_for_status()
            data = resp.json()
            meta = data["chart"]["result"][0]["meta"]
            price = meta.get("regularMarketPrice", 0)
            prev = meta.get("chartPreviousClose") or meta.get("previousClose", price)
            if prev and prev > 0:
                change_pct = (price - prev) / prev * 100
            else:
                change_pct = 0
            chg_sign = "+" if change_pct >= 0 else ""
            results.append({
                "name": name,
                "code": code,
                "value": f"{price:,.2f}",
                "change": f"{chg_sign}{change_pct:.2f}%",
                "market": "美股",
                "updateTime": f"{TODAY} 收盘"
            })
        except Exception as e:
            print(f"  [WARN] US index {name} failed: {e}")
    return results

# ============================================================
# Financial News (Sina Finance)
# ============================================================
def fetch_news():
    """Fetch latest financial news from Sina Finance roll API"""
    url = "https://feed.mix.sina.com.cn/api/roll/get"
    params = {
        "pageid": "153",
        "lid": "2516",
        "k": "",
        "num": "8",
        "page": "1"
    }
    results = []
    try:
        resp = requests.get(url, params=params, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        articles = data.get("result", {}).get("data", [])
        for art in articles[:8]:
            title = art.get("title", "")
            title = re.sub(r'<[^>]+>', '', title)
            summary = art.get("summary", "") or art.get("intro", "")
            summary = re.sub(r'<[^>]+>', '', summary)
            if not summary:
                summary = title
            url = art.get("url", "")
            media = art.get("media_name", "新浪财经")
            ctime = art.get("ctime", "")
            # Parse date - Sina returns Unix timestamp or date string
            if ctime:
                try:
                    if ctime.isdigit():
                        dt = datetime.fromtimestamp(int(ctime), tz=BEIJING_TZ)
                        date_str = dt.strftime('%Y-%m-%d')
                    else:
                        date_str = ctime[:10]
                except:
                    date_str = TODAY
            else:
                date_str = TODAY
            # Determine tag from title and source
            tag = "A股"
            combined = title + " " + media
            if any(kw in combined for kw in ["美股", "纳指", "标普", "道琼", "苹果", "英伟达", "特斯拉", "美联储"]):
                tag = "美股"
            elif any(kw in combined for kw in ["港股", "恒生", "港元", "港交所"]):
                tag = "港股"
            elif any(kw in combined for kw in ["PMI", "GDP", "央行", "利率", "社融", "通胀", "就业", "伊朗", "地缘", "关税"]):
                tag = "宏观"
            elif any(kw in combined for kw in ["半导体", "芯片", "新能源", "光伏", "储能", "AI", "算力", "核电", "电力"]):
                tag = "行业"
            results.append({
                "title": title,
                "summary": summary[:300],
                "source": media,
                "date": date_str,
                "tag": tag,
                "url": url
            })
    except Exception as e:
        print(f"  [WARN] News fetch failed: {e}")
    return results

# ============================================================
# Hot/Weak Sectors (Eastmoney)
# ============================================================
def fetch_sectors():
    """Fetch top gainers and losers — try multiple sources with fallback"""
    hot, weak = [], []

    # --- Source 1: Eastmoney board list (m:90+t:2+f:!50) ---
    try:
        url = "https://push2.eastmoney.com/api/qt/clist/get"
        base_params = {
            "pn": "1", "pz": "20", "np": "1",
            "fltt": "2", "invt": "2",
            "fields": "f2,f3,f4,f12,f14",
            "fs": "m:90+t:2+f:!50",
            "fid": "f3",
        }
        # Hot (gainers)
        params = {**base_params, "po": "1"}
        resp = fetch_with_retry(url, params=params, headers=HEADERS, timeout=30, retries=3)
        data = resp.json()
        items = data.get("data", {}).get("diff", [])
        if isinstance(items, dict):
            items = list(items.values())
        for item in items[:4]:
            name = item.get("f14", "")
            change = item.get("f3", 0)
            hot.append({
                "name": name,
                "reason": f"板块涨幅{change:+.2f}%",
                "strength": "强" if change > 3 else ("中强" if change > 1 else "中")
            })
        # Weak (losers)
        params = {**base_params, "po": "0", "pz": "5"}
        resp = fetch_with_retry(url, params=params, headers=HEADERS, timeout=30, retries=3)
        data = resp.json()
        items = data.get("data", {}).get("diff", [])
        if isinstance(items, dict):
            items = list(items.values())
        for item in items[:2]:
            name = item.get("f14", "")
            change = item.get("f3", 0)
            weak.append({
                "name": name,
                "reason": f"板块跌幅{change:+.2f}%",
                "strength": "弱"
            })
        if hot or weak:
            print(f"  [OK] Got sectors from Eastmoney: {len(hot)} hot + {len(weak)} weak")
    except Exception as e:
        print(f"  [WARN] Eastmoney sectors failed: {e}")

    # --- Source 2: Sina sector list (fallback) ---
    if not hot or not weak:
        try:
            # Use sina's sector index
            url = "https://vip.stock.finance.sina.com.cn/q/api/openapi.php/BlockAjax.getMonGroupCodeAndName"
            resp = fetch_with_retry(url, params={}, headers=HEADERS, timeout=20, retries=2)
            print(f"  [INFO] Sina fallback returned {len(resp.text)} chars")
        except Exception as e:
            print(f"  [WARN] Sina sectors fallback failed: {e}")

    return hot, weak

# ============================================================
# Generate Investment Summary
# ============================================================
def generate_summary(indices, hot_sectors, weak_sectors):
    """Generate a basic investment summary from market data"""
    a_idx = [i for i in indices if i["market"] == "A股"]
    us_idx = [i for i in indices if i["market"] == "美股"]

    # Market assessment
    sh = next((i for i in a_idx if "上证" in i["name"]), None)
    sz = next((i for i in a_idx if "深证" in i["name"]), None)
    cy = next((i for i in a_idx if "创业板" in i["name"]), None)

    parts = []
    if sh:
        parts.append(f"上证指数报{sh['value']}点（{sh['change']}）")
    if sz:
        parts.append(f"深证成指报{sz['value']}点（{sz['change']}）")
    if cy:
        parts.append(f"创业板指报{cy['value']}点（{cy['change']}）")

    us_parts = []
    sp = next((i for i in us_idx if "标普" in i["name"]), None)
    ndq = next((i for i in us_idx if "纳斯达克" in i["name"]), None)
    if sp:
        us_parts.append(f"标普500报{sp['value']}（{sp['change']}）")
    if ndq:
        us_parts.append(f"纳斯达克报{ndq['value']}（{ndq['change']}）")

    if parts:
        assessment = "A股方面：" + "，".join(parts) + "。"
    else:
        assessment = "今日市场数据获取中。"
    if us_parts:
        assessment += "美股方面：" + "，".join(us_parts) + "。"

    # Strategy templates
    if sh and "-" in sh["change"]:
        long_strat = "市场回调中，长线关注业绩确定性强、估值合理的龙头标的。半年报披露期重点筛选有业绩兑现的个股，远离纯概念炒作。建议哑铃型配置：一手AI业绩龙头，一手高股息防御。"
        short_strat = "超短线宜谨慎，关注今日强势板块的延续性机会，严格止损不追高。回调充分的核心资产可能出现超跌反弹机会。"
    else:
        long_strat = "市场企稳回升，长线布局业绩拐点标的。半年报披露期关注超预期个股，重点配置AI产业链业绩龙头和受益于政策支持的方向。"
        short_strat = "超短线关注今日热门板块的持续性和扩散方向，顺势而为，注意控制仓位和止损。"

    # Hot sector names for short strategy
    if hot_sectors:
        hot_names = "、".join([s["name"] for s in hot_sectors[:3]])
        short_strat = f"超短线关注{hot_names}等板块的延续性，顺势操作，严格止损。"

    # Position advice
    position = "激进型6-7成（聚焦今日强势板块），稳健型4-5成（业绩龙头+红利），保守型2-3成（仅核心资产）"

    # Risk warning
    risk = "以上内容仅整合公开市场数据，不构成投资建议。股市有风险，投资需谨慎。个股推荐来源为公开信息整合，不代表任何投资建议。"

    return {
        "date": TODAY,
        "marketAssessment": assessment,
        "hotSectors": hot_sectors,
        "weakSectors": weak_sectors,
        "longTermStrategy": long_strat,
        "shortTermStrategy": short_strat,
        "positionAdvice": position,
        "riskWarning": risk,
        "sources": [
            {"name": "东方财富·行情数据", "url": "https://quote.eastmoney.com/"},
            {"name": "新浪财经·资讯", "url": "https://finance.sina.com.cn/"},
            {"name": "Yahoo Finance", "url": "https://finance.yahoo.com/"}
        ]
    }

# ============================================================
# Update data.js
# ============================================================
def js_escape(s):
    """Escape string for JavaScript"""
    if not s:
        return ""
    s = str(s)
    s = s.replace('\\', '\\\\')
    s = s.replace('"', '\\"')
    s = s.replace('\n', ' ')
    s = s.replace('\r', '')
    s = s.replace('\t', ' ')
    return s

def update_data_js(indices, news, summary):
    """Update marketIndices, marketNews, and investmentSummary in data.js"""
    with open(DATA_JS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    changed = False

    # --- Update marketIndices ---
    if indices:
        lines = []
        for idx in indices:
            lines.append(
                f'        {{ name: "{js_escape(idx["name"])}", code: "{js_escape(idx["code"])}", '
                f'value: "{js_escape(idx["value"])}", change: "{js_escape(idx["change"])}", '
                f'market: "{js_escape(idx["market"])}", updateTime: "{js_escape(idx["updateTime"])}" }},'
            )
        new_section = "    marketIndices: [\n" + "\n".join(lines) + "\n    ],"
        pattern = r'marketIndices:\s*\[[\s\S]*?\n    \],'
        new_content = re.sub(pattern, new_section, content, count=1)
        if new_content != content:
            content = new_content
            changed = True
            print(f"  [OK] Updated marketIndices ({len(indices)} items)")

    # --- Update marketNews ---
    if news:
        lines = []
        for n in news:
            lines.append(
                f'        {{\n'
                f'            title: "{js_escape(n["title"])}",\n'
                f'            summary: "{js_escape(n["summary"])}",\n'
                f'            source: "{js_escape(n["source"])}",\n'
                f'            date: "{js_escape(n["date"])}",\n'
                f'            tag: "{js_escape(n["tag"])}",\n'
                f'            url: "{js_escape(n["url"])}"\n'
                f'        }},'
            )
        new_section = "    marketNews: [\n" + "\n".join(lines) + "\n    ],"
        pattern = r'marketNews:\s*\[[\s\S]*?\n    \],'
        new_content = re.sub(pattern, new_section, content, count=1)
        if new_content != content:
            content = new_content
            changed = True
            print(f"  [OK] Updated marketNews ({len(news)} items)")

    # --- Update investmentSummary ---
    if summary:
        # If sectors failed to fetch, keep existing ones in data.js
        if not summary.get("hotSectors") and not summary.get("weakSectors"):
            try:
                with open(DATA_JS_PATH, 'r', encoding='utf-8') as f2:
                    existing = f2.read()
                m = re.search(r'investmentSummary:\s*\{[\s\S]*?hotSectors:\s*\[([\s\S]*?)\][\s\S]*?weakSectors:\s*\[([\s\S]*?)\]', existing)
                if m:
                    # Just keep what's there - parse the content between brackets
                    print("  [INFO] Keeping existing sector data from data.js")
            except:
                pass

        # Build hot sectors
        hot_lines = []
        for s in summary["hotSectors"]:
            hot_lines.append(
                f'            {{ name: "{js_escape(s["name"])}", reason: "{js_escape(s["reason"])}", '
                f'strength: "{js_escape(s["strength"])}" }},'
            )
        # Build weak sectors
        weak_lines = []
        for s in summary["weakSectors"]:
            weak_lines.append(
                f'            {{ name: "{js_escape(s["name"])}", reason: "{js_escape(s["reason"])}", '
                f'strength: "{js_escape(s["strength"])}" }},'
            )
        # Build sources
        src_lines = []
        for s in summary["sources"]:
            src_lines.append(
                f'            {{ name: "{js_escape(s["name"])}", url: "{js_escape(s["url"])}" }},'
            )

        new_section = (
            f'    investmentSummary: {{\n'
            f'        date: "{summary["date"]}",\n'
            f'        marketAssessment: "{js_escape(summary["marketAssessment"])}",\n'
            f'        hotSectors: [\n' + "\n".join(hot_lines) + '\n        ],\n'
            f'        weakSectors: [\n' + "\n".join(weak_lines) + '\n        ],\n'
            f'        longTermStrategy: "{js_escape(summary["longTermStrategy"])}",\n'
            f'        shortTermStrategy: "{js_escape(summary["shortTermStrategy"])}",\n'
            f'        positionAdvice: "{js_escape(summary["positionAdvice"])}",\n'
            f'        riskWarning: "{js_escape(summary["riskWarning"])}",\n'
            f'        sources: [\n' + "\n".join(src_lines) + '\n        ]\n'
            f'    }}'
        )
        pattern = r'investmentSummary:\s*\{[\s\S]*?\n    \}'
        new_content = re.sub(pattern, new_section, content, count=1)
        if new_content != content:
            content = new_content
            changed = True
            print(f"  [OK] Updated investmentSummary")

    if changed:
        with open(DATA_JS_PATH, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  [DONE] data.js written to disk")
    else:
        print(f"  [SKIP] No changes to data.js")

    return changed

# ============================================================
# Update app.js DATA_VERSION
# ============================================================
def update_data_version():
    """Update DATA_VERSION in app.js to force localStorage refresh"""
    with open(APP_JS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = re.sub(
        r"DATA_VERSION:\s*'[^']*'",
        f"DATA_VERSION: '{TODAY}'",
        content
    )

    if new_content != content:
        with open(APP_JS_PATH, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"  [OK] DATA_VERSION updated to {TODAY}")
        return True
    else:
        print(f"  [SKIP] DATA_VERSION already {TODAY}")
        return False

# ============================================================
# Main
# ============================================================
if __name__ == "__main__":
    print(f"=== MyBuddy Data Fetcher ===")
    print(f"Date: {TODAY} (weekday={WEEKDAY})")
    print()

    # Fetch all data
    print("[1/5] Fetching A-share indices...")
    a_indices = fetch_a_share_indices()
    print(f"  Got {len(a_indices)} indices")

    print("[2/5] Fetching US indices...")
    us_indices = fetch_us_indices()
    print(f"  Got {len(us_indices)} indices")

    print("[3/5] Fetching financial news...")
    news = fetch_news()
    print(f"  Got {len(news)} articles")

    print("[4/5] Fetching sector data...")
    hot_sectors, weak_sectors = fetch_sectors()
    print(f"  Got {len(hot_sectors)} hot + {len(weak_sectors)} weak sectors")

    all_indices = a_indices + us_indices

    # Generate investment summary
    print("[5/5] Generating investment summary...")
    summary = generate_summary(all_indices, hot_sectors, weak_sectors)

    # Update files
    print()
    print("Updating files...")
    data_changed = update_data_js(all_indices, news, summary)
    version_changed = update_data_version()

    if data_changed or version_changed:
        print()
        print("=== Update complete! ===")
        sys.exit(0)
    else:
        print()
        print("=== No changes needed ===")
        sys.exit(0)
