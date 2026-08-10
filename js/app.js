/* ========================================
   个人一体化工作台 - 核心应用逻辑
   ======================================== */

/* ---------- 存储工具 ---------- */
const Storage = {
    prefix: 'ws_',
    get(key, def) {
        try {
            const v = localStorage.getItem(this.prefix + key);
            return v ? JSON.parse(v) : def;
        } catch { return def; }
    },
    set(key, val) {
        localStorage.setItem(this.prefix + key, JSON.stringify(val));
    },
    remove(key) {
        localStorage.removeItem(this.prefix + key);
    }
};

/* ---------- 工具函数 ---------- */
function formatDate(d) {
    if (typeof d === 'string') d = new Date(d);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        App.toast('已复制到剪贴板');
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        App.toast('已复制到剪贴板');
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ---------- App 控制器 ---------- */
const App = {
    init() {
        this.showDate();
        this.bindNav();
        this.bindSubTabs();
        this.bindGlobalActions();
        this.checkIOSInstall();
        StockModule.init();
        IELTSModule.init();
        PlannerModule.init();
        VlogModule.init();
        this.updateQuickStats();
    },

    // Detect iOS Safari and show "Add to Home Screen" hint
    checkIOSInstall() {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isStandalone = window.navigator.standalone === true ||
            window.matchMedia('(display-mode: standalone)').matches;
        const isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);

        if (isIOS && !isStandalone && isSafari) {
            // Check if user dismissed it recently (24h)
            const dismissed = Storage.get('ios_hint_dismissed');
            if (dismissed) {
                const hours = (Date.now() - dismissed) / 3600000;
                if (hours < 24) return;
            }
            // Show hint after 3 seconds
            setTimeout(() => {
                const hint = document.getElementById('iosInstallHint');
                if (hint) hint.style.display = 'block';
            }, 3000);
        }
    },

    dismissIOSHint() {
        const hint = document.getElementById('iosInstallHint');
        if (hint) hint.style.display = 'none';
        Storage.save('ios_hint_dismissed', Date.now());
    },

    showDate() {
        const now = new Date();
        const days = ['周日','周一','周二','周三','周四','周五','周六'];
        document.getElementById('currentDate').textContent =
            `${formatDate(now)} ${days[now.getDay()]}`;
    },

    bindNav() {
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const mod = btn.dataset.module;
                document.querySelectorAll('.module-view').forEach(v => v.classList.remove('active'));
                document.getElementById('module-' + mod).classList.add('active');
            });
        });
    },

    bindSubTabs() {
        document.querySelectorAll('.sub-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const panel = tab.closest('.module-view');
                panel.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const subId = 'sub-' + tab.dataset.sub;
                panel.querySelectorAll('.sub-panel').forEach(p => p.classList.remove('active'));
                const target = document.getElementById(subId);
                if (target) target.classList.add('active');
            });
        });
    },

    bindGlobalActions() {
        document.getElementById('refreshAllBtn').addEventListener('click', () => {
            StockModule.refreshData();
            IELTSModule.refreshContent();
            VlogModule.refreshTopics();
            this.toast('所有素材已刷新');
            document.getElementById('lastUpdated').textContent = '更新于 ' + new Date().toLocaleTimeString('zh-CN');
        });

        document.getElementById('exportAllBtn').addEventListener('click', () => {
            this.exportAll();
        });
    },

    toast(msg) {
        const el = document.getElementById('toast');
        el.textContent = msg;
        el.classList.add('show');
        clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
    },

    modal(title, bodyHtml, onConfirm) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML = bodyHtml;
        document.getElementById('modalOverlay').classList.add('show');
        if (onConfirm) {
            this._modalConfirm = onConfirm;
        }
    },

    closeModal() {
        document.getElementById('modalOverlay').classList.remove('show');
        this._modalConfirm = null;
    },

    modalConfirm() {
        if (this._modalConfirm) this._modalConfirm();
        this.closeModal();
    },

    updateQuickStats() {
        const wl = Storage.get('watchlist', []);
        const tracker = Storage.get('todayTracker', { listening: 0, reading: 0, writing: 0, speaking: 0 });
        const totalStudy = (tracker.listening || 0) + (tracker.reading || 0) + (tracker.writing || 0) + (tracker.speaking || 0);
        const tasks = Storage.get('tasks_' + formatDate(new Date()), []);
        const done = tasks.filter(t => t.done).length;
        const lib = Storage.get('vlogLibrary', []);

        document.getElementById('statStock').textContent = wl.length;
        document.getElementById('statStudy').textContent = totalStudy + 'h';
        document.getElementById('statTasks').textContent = done + '/' + tasks.length;
        document.getElementById('statTopics').textContent = lib.length;
    },

    exportAll() {
        const data = {
            exportDate: new Date().toISOString(),
            stock: {
                watchlist: Storage.get('watchlist', []),
                notes: Storage.get('stockNotes', []),
                logs: Storage.get('stockLogs', []),
                news: Storage.get('stockNews', []),
                screening: Storage.get('screeningStocks', []),
                marketData: Storage.get('marketData', '')
            },
            ielts: {
                trackerHistory: Storage.get('trackerHistory', []),
                todayTracker: Storage.get('todayTracker', {})
            },
            planner: {
                tasks: Storage.get('tasks_' + formatDate(new Date()), []),
                fixedTasks: Storage.get('fixedTasks', [])
            },
            vlog: {
                library: Storage.get('vlogLibrary', []),
                cases: Storage.get('vlogCases', [])
            }
        };
        const text = JSON.stringify(data, null, 2);
        const blob = new Blob([text], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workstation_export_' + formatDate(new Date()) + '.json';
        a.click();
        URL.revokeObjectURL(url);
        this.toast('数据已导出');
    }
};

/* ========================================
   模块1: 股票研究
   ======================================== */
const StockModule = {
    init() {
        this.prepopulateData();
        this.renderIndices();
        this.renderNews();
        this.renderScreening();
        this.renderInvestmentSummary();
        this.renderWatchlist();
        this.renderNotes();
        this.renderLogs();
        this.loadMarketData();
        // 页面加载后自动获取实时数据
        setTimeout(() => this.fetchRealTimeData(), 500);
    },

    // 首次加载预填充真实数据
    // 数据版本号 — 每次内容库重大更新时递增，强制刷新本地存储
    DATA_VERSION: '2026-08-10',

    prepopulateData() {
        const currentVersion = Storage.get('dataVersion', null);
        const needsRefresh = currentVersion !== this.DATA_VERSION;

        // 市场指数 — 首次访问或版本变更时用 ContentLibrary 的真实数据初始化
        const savedIndices = Storage.get('marketIndices', null);
        if (!savedIndices || needsRefresh) {
            Storage.set('marketIndices', ContentLibrary.marketIndices);
            // 同时填充行情数据文本框
            const dataText = ContentLibrary.marketIndices.map(idx =>
                `${idx.name} ${idx.value} ${idx.change} (${idx.updateTime || ''})`
            ).join('\n');
            Storage.set('marketData', dataText);
        }
        // 财经资讯 — 首次访问或版本变更时刷新
        const savedNews = Storage.get('stockNews', null);
        if (!savedNews || savedNews.length === 0 || needsRefresh) {
            Storage.set('stockNews', ContentLibrary.marketNews || []);
        }
        // 潜力观察个股 — 首次访问或版本变更时刷新（标记为系统生成，刷新时会被实时数据替换）
        const savedScreening = Storage.get('screeningStocks', null);
        if (!savedScreening || savedScreening.length === 0 || needsRefresh) {
            Storage.set('screeningStocks', (ContentLibrary.screeningStocks || []).map(s => ({ ...s, auto: true })));
        }
        // 自媒体案例 — 首次访问或版本变更时刷新
        const savedCases = Storage.get('vlogCases', null);
        if (!savedCases || savedCases.length === 0 || needsRefresh) {
            Storage.set('vlogCases', ContentLibrary.vlogCases.slice());
        }
        // 投资推荐总结 — 首次访问或版本变更时刷新
        if (needsRefresh) {
            Storage.set('investmentSummary', ContentLibrary.investmentSummary || {});
        }
        // 更新版本号
        Storage.set('dataVersion', this.DATA_VERSION);
    },

    refreshData() {
        // 刷新时重新获取实时数据
        this.fetchRealTimeData();
        this.renderWatchlist();
        App.updateQuickStats();
    },

    // ---- 实时数据获取（浏览器端直接拉取，不依赖 GitHub Actions） ----
    async fetchRealTimeData() {
        const today = formatDate(new Date());
        let updated = false;

        const lastUpdatedEl = document.getElementById('lastUpdated');
        if (lastUpdatedEl) lastUpdatedEl.textContent = '正在获取实时数据...';

        // 1. A股指数 — Tencent JSONP（script tag，无 CORS 问题）
        try {
            const aIndices = await this.fetchAShareIndices(today);
            if (aIndices && aIndices.length > 0) {
                const existing = Storage.get('marketIndices', ContentLibrary.marketIndices);
                const usExisting = existing.filter(i => i.market === '美股');
                const newIndices = [...aIndices, ...usExisting];
                Storage.set('marketIndices', newIndices);
                const dataText = newIndices.map(idx =>
                    `${idx.name} ${idx.value} ${idx.change} (${idx.updateTime || ''})`
                ).join('\n');
                Storage.set('marketData', dataText);
                if (document.getElementById('marketDataInput')) {
                    document.getElementById('marketDataInput').value = dataText;
                }
                this.renderIndices();
                updated = true;
                console.log('[实时数据] A股指数更新成功', aIndices.length, '条');
            }
        } catch (e) {
            console.warn('[实时数据] A股指数获取失败:', e.message);
        }

        // 2. 美股指数 — Yahoo Finance via CORS proxy
        try {
            const usIndices = await this.fetchUSIndices(today);
            if (usIndices && usIndices.length > 0) {
                const existing = Storage.get('marketIndices', []);
                const aExisting = existing.filter(i => i.market === 'A股');
                const newIndices = [...aExisting, ...usIndices];
                Storage.set('marketIndices', newIndices);
                const dataText = newIndices.map(idx =>
                    `${idx.name} ${idx.value} ${idx.change} (${idx.updateTime || ''})`
                ).join('\n');
                Storage.set('marketData', dataText);
                if (document.getElementById('marketDataInput')) {
                    document.getElementById('marketDataInput').value = dataText;
                }
                this.renderIndices();
                updated = true;
                console.log('[实时数据] 美股指数更新成功', usIndices.length, '条');
            }
        } catch (e) {
            console.warn('[实时数据] 美股指数获取失败:', e.message);
        }

        // 3. 财经资讯 — 新浪财经 via CORS proxy
        try {
            const news = await this.fetchNews(today);
            if (news && news.length > 0) {
                Storage.set('stockNews', news);
                this.renderNews();
                updated = true;
                console.log('[实时数据] 财经资讯更新成功', news.length, '条');
            }
        } catch (e) {
            console.warn('[实时数据] 财经资讯获取失败:', e.message);
        }

        // 4. 强弱板块 — 东方财富 via CORS proxy
        try {
            const sectors = await this.fetchSectors(today);
            if (sectors && sectors.hot && sectors.hot.length >= 0) {
                this.updateInvestmentSummary(today, sectors);
                this.renderInvestmentSummary();
                updated = true;
                console.log('[实时数据] 板块数据更新成功');
            }
        } catch (e) {
            console.warn('[实时数据] 板块数据获取失败:', e.message);
        }

        // 4.5 个股推荐 — 东方财富实时生成（涨幅榜 + 资金流）
        try {
            const ok = await this.fetchScreeningStocks(today);
            if (ok) updated = true;
            else console.warn('[实时数据] 个股推荐实时生成失败，保留静态种子');
        } catch (e) {
            console.warn('[实时数据] 个股推荐获取失败:', e.message);
        }

        // 5. K线图
        try {
            await this.renderKLineChart();
        } catch (e) {
            console.warn('[实时数据] K线图获取失败:', e.message);
        }

        if (lastUpdatedEl) {
            lastUpdatedEl.textContent = '更新于 ' + new Date().toLocaleTimeString('zh-CN');
        }

        if (updated) {
            App.toast('实时数据已更新');
        }
        return updated;
    },

    // A股指数 — Tencent JSONP（script tag 方式，绕过 CORS）
    fetchAShareIndices(today) {
        return new Promise((resolve, reject) => {
            const symbols = ['sh000001', 'sz399001', 'sz399006', 'sh000300', 'sh000688'];
            const nameMap = {
                'v_sh000001': { name: '上证指数', code: 'SH000001' },
                'v_sz399001': { name: '深证成指', code: 'SZ399001' },
                'v_sz399006': { name: '创业板指', code: 'SZ399006' },
                'v_sh000300': { name: '沪深300', code: 'SH000300' },
                'v_sh000688': { name: '科创50', code: 'SH000688' },
            };
            symbols.forEach(s => { delete window['v_' + s]; });
            const script = document.createElement('script');
            script.src = `https://qt.gtimg.cn/q=${symbols.join(',')}`;
            script.charset = 'gbk';
            script.onload = () => {
                const results = [];
                for (const [varName, info] of Object.entries(nameMap)) {
                    const val = window[varName];
                    if (val && typeof val === 'string') {
                        const parts = val.split('~');
                        if (parts.length > 5) {
                            const current = parts[3];
                            let changePct = parseFloat(parts[32] || parts[6] || '0');
                            const chgSign = changePct >= 0 ? '+' : '';
                            results.push({
                                name: info.name, code: info.code,
                                value: parseFloat(current).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}),
                                change: `${chgSign}${changePct.toFixed(2)}%`,
                                market: 'A股',
                                updateTime: `${today} 实时`
                            });
                        }
                    }
                }
                script.remove();
                symbols.forEach(s => { delete window['v_' + s]; });
                resolve(results);
            };
            script.onerror = () => { script.remove(); reject(new Error('Tencent JSONP load failed')); };
            setTimeout(() => {
                if (document.head.contains(script)) { script.remove(); reject(new Error('Tencent JSONP timeout')); }
            }, 10000);
            document.head.appendChild(script);
        });
    },

    // 美股指数 — Yahoo Finance via CORS proxy
    async fetchUSIndices(today) {
        const proxy = 'https://api.allorigins.win/raw?url=';
        const symbols = [
            { sym: '^GSPC', name: '标普500', code: 'SPX' },
            { sym: '^IXIC', name: '纳斯达克', code: 'IXIC' },
            { sym: '^DJI', name: '道琼斯', code: 'DJI' },
        ];
        const results = [];
        for (const { sym, name, code } of symbols) {
            try {
                const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=5d`;
                const resp = await fetch(proxy + encodeURIComponent(yahooUrl), { signal: AbortSignal.timeout(15000) });
                const data = await resp.json();
                const meta = data?.chart?.result?.[0]?.meta;
                if (meta) {
                    const price = meta.regularMarketPrice || 0;
                    const prev = meta.chartPreviousClose || meta.previousClose || price;
                    let changePct = prev > 0 ? (price - prev) / prev * 100 : 0;
                    const chgSign = changePct >= 0 ? '+' : '';
                    results.push({
                        name, code,
                        value: price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}),
                        change: `${chgSign}${changePct.toFixed(2)}%`,
                        market: '美股',
                        updateTime: `${today} 收盘`
                    });
                }
            } catch (e) {
                console.warn(`[实时数据] 美股 ${name} 获取失败:`, e.message);
            }
        }
        return results;
    },

    // 财经资讯 — 新浪财经 via CORS proxy
    async fetchNews(today) {
        const proxy = 'https://api.allorigins.win/raw?url=';
        const sinaUrl = 'https://feed.mix.sina.com.cn/api/roll/get?pageid=153&lid=2516&k=&num=10&page=1';
        const resp = await fetch(proxy + encodeURIComponent(sinaUrl), { signal: AbortSignal.timeout(15000) });
        const data = await resp.json();
        const articles = data?.result?.data || [];
        const results = [];
        for (const art of articles.slice(0, 10)) {
            let title = (art.title || '').replace(/<[^>]+>/g, '');
            let summary = (art.summary || art.intro || '').replace(/<[^>]+>/g, '') || title;
            const media = art.media_name || '新浪财经';
            const url = art.url || '';
            let dateStr = today;
            const ctime = art.ctime || '';
            if (ctime) {
                if (/^\d+$/.test(ctime)) {
                    dateStr = new Date(parseInt(ctime) * 1000).toLocaleDateString('zh-CN').replace(/\//g, '-');
                } else {
                    dateStr = ctime.slice(0, 10);
                }
            }
            let tag = 'A股';
            const combined = title + ' ' + media;
            if (/美股|纳指|标普|道琼|苹果|英伟达|特斯拉|美联储|Fed|美股|纳市|NYSE|NASDAQ/.test(combined)) tag = '美股';
            else if (/港股|恒生|港元|港交所/.test(combined)) tag = '港股';
            else if (/PMI|GDP|央行|利率|社融|通胀|就业|CPI|PPI|LPR|降息|加息|地缘|关税/.test(combined)) tag = '宏观';
            else if (/半导体|芯片|新能源|光伏|储能|AI|算力|核电|电力|机器人|低空/.test(combined)) tag = '行业';
            results.push({ title, summary: summary.slice(0, 300), source: media, date: dateStr, tag, url });
        }
        return results;
    },

    // 强弱板块 — 东方财富 via CORS proxy
    async fetchSectors(today) {
        const proxy = 'https://api.allorigins.win/raw?url=';
        const baseUrl = 'https://push2.eastmoney.com/api/qt/clist/get';
        const baseParams = 'pn=1&np=1&fltt=2&invt=2&fields=f2,f3,f4,f12,f14&fs=m:90+t:2+f:!50&fid=f3';
        const hot = [], weak = [];
        try {
            const hotUrl = `${baseUrl}?${baseParams}&po=1&pz=5`;
            const hotResp = await fetch(proxy + encodeURIComponent(hotUrl), { signal: AbortSignal.timeout(15000) });
            const hotData = await hotResp.json();
            let items = hotData?.data?.diff || [];
            if (Array.isArray(items) === false && typeof items === 'object') items = Object.values(items);
            for (const item of items.slice(0, 4)) {
                const change = item.f3 || 0;
                hot.push({ name: item.f14 || '', reason: `板块涨幅${change >= 0 ? '+' : ''}${change.toFixed(2)}%`, strength: change > 3 ? '强' : (change > 1 ? '中强' : '中') });
            }
        } catch (e) { console.warn('[板块] 热门板块获取失败:', e.message); }
        try {
            const weakUrl = `${baseUrl}?${baseParams}&po=0&pz=3`;
            const weakResp = await fetch(proxy + encodeURIComponent(weakUrl), { signal: AbortSignal.timeout(15000) });
            const weakData = await weakResp.json();
            let items = weakData?.data?.diff || [];
            if (Array.isArray(items) === false && typeof items === 'object') items = Object.values(items);
            for (const item of items.slice(0, 2)) {
                const change = item.f3 || 0;
                weak.push({ name: item.f14 || '', reason: `板块跌幅${change.toFixed(2)}%`, strength: '弱' });
            }
        } catch (e) { console.warn('[板块] 弱势板块获取失败:', e.message); }
        return { hot, weak };
    },

    // 更新投资总结
    updateInvestmentSummary(today, sectors) {
        const indices = Storage.get('marketIndices', []);
        const aIdx = indices.filter(i => i.market === 'A股');
        const usIdx = indices.filter(i => i.market === '美股');
        const sh = aIdx.find(i => i.name.includes('上证'));
        const sz = aIdx.find(i => i.name.includes('深证'));
        const cy = aIdx.find(i => i.name.includes('创业板'));
        const sp = usIdx.find(i => i.name.includes('标普'));
        const ndq = usIdx.find(i => i.name.includes('纳斯达克'));

        let assessment = '';
        const aParts = [];
        if (sh) aParts.push(`上证指数报${sh.value}点（${sh.change}）`);
        if (sz) aParts.push(`深证成指报${sz.value}点（${sz.change}）`);
        if (cy) aParts.push(`创业板指报${cy.value}点（${cy.change}）`);
        if (aParts.length) assessment += 'A股方面：' + aParts.join('，') + '。';
        const usParts = [];
        if (sp) usParts.push(`标普500报${sp.value}（${sp.change}）`);
        if (ndq) usParts.push(`纳斯达克报${ndq.value}（${ndq.change}）`);
        if (usParts.length) assessment += '美股方面：' + usParts.join('，') + '。';

        const isDown = sh && sh.change && sh.change.startsWith('-');
        let longStrat, shortStrat;
        if (isDown) {
            longStrat = '市场回调中，长线关注业绩确定性强、估值合理的龙头标的。半年报披露期重点筛选有业绩兑现的个股，远离纯概念炒作。建议哑铃型配置：一手AI/科技业绩龙头，一手高股息防御。';
            shortStrat = '超短线宜谨慎，关注今日强势板块的延续性机会，严格止损不追高。回调充分的核心资产可能出现超跌反弹机会。';
        } else {
            longStrat = '市场企稳回升，长线布局业绩拐点标的。半年报披露期关注超预期个股，重点配置AI产业链业绩龙头和受益于政策支持的方向。';
            shortStrat = '超短线关注今日热门板块的持续性和扩散方向，顺势而为，注意控制仓位和止损。';
        }
        if (sectors.hot && sectors.hot.length > 0) {
            const hotNames = sectors.hot.slice(0, 3).map(s => s.name).join('、');
            shortStrat = `超短线关注${hotNames}等板块的延续性，顺势操作，严格止损。`;
        }

        const summary = {
            date: today,
            marketAssessment: assessment || '今日市场数据获取中。',
            hotSectors: sectors.hot || [],
            weakSectors: sectors.weak || [],
            longTermStrategy: longStrat,
            shortTermStrategy: shortStrat,
            positionAdvice: '激进型6-7成（聚焦今日强势板块），稳健型4-5成（业绩龙头+红利），保守型2-3成（仅核心资产）',
            riskWarning: '以上内容仅整合公开市场数据，不构成投资建议。股市有风险，投资需谨慎。',
            sources: [
                { name: '腾讯财经·行情', url: 'https://gu.qq.com/' },
                { name: '新浪财经·资讯', url: 'https://finance.sina.com.cn/' },
                { name: '东方财富·板块', url: 'https://quote.eastmoney.com/' },
                { name: 'Yahoo Finance', url: 'https://finance.yahoo.com/' }
            ]
        };
        Storage.set('investmentSummary', summary);
    },

    // 个股推荐 — 从东方财富实时拉取（涨幅榜 + 主力资金流），动态生成，不再用静态种子
    async fetchScreeningStocks(today) {
        const proxy = 'https://api.allorigins.win/raw?url=';
        const base = 'https://push2.eastmoney.com/api/qt/clist/get';
        // 字段：f2最新价 f3涨跌幅 f12代码 f13市场 f14名称 f62主力净流入(元)
        const mk = (fid, pz) =>
            `${base}?pn=1&np=1&fltt=2&invt=2&fields=f2,f3,f12,f13,f14,f62&fs=m:90+t:2+f:!50&fid=${fid}&po=1&pz=${pz}`;
        const seen = new Set();
        const out = [];

        // 1) 涨幅榜（超短线情绪标的）
        try {
            const resp = await fetch(proxy + encodeURIComponent(mk('f3', 8)), { signal: AbortSignal.timeout(15000) });
            const data = await resp.json();
            let items = data?.data?.diff || [];
            if (!Array.isArray(items) && items && typeof items === 'object') items = Object.values(items);
            for (const it of items.slice(0, 8)) {
                const code = String(it.f12 || '');
                const name = it.f14 || '';
                if (!code || !name || seen.has(code)) continue;
                seen.add(code);
                const pct = parseFloat(it.f3 || 0);
                const market = (it.f13 === 1 || /^([69])/.test(code)) ? 'SH' : 'SZ';
                out.push({
                    name, code: market + code, market: 'A股', industry: '—',
                    strategy: '超短线',
                    reason: `今日涨幅${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%，位列沪深涨幅榜前列，短线情绪与资金关注度最高`,
                    source: '东方财富·实时行情', url: `https://quote.eastmoney.com/${market === 'SH' ? 'sh' : 'sz'}${code}.html`
                });
            }
        } catch (e) { console.warn('[个股推荐] 涨幅榜获取失败:', e.message); }

        // 2) 主力资金净流入排行（长线价值/机构关注）
        try {
            const resp = await fetch(proxy + encodeURIComponent(mk('f62', 6)), { signal: AbortSignal.timeout(15000) });
            const data = await resp.json();
            let items = data?.data?.diff || [];
            if (!Array.isArray(items) && items && typeof items === 'object') items = Object.values(items);
            for (const it of items.slice(0, 6)) {
                const code = String(it.f12 || '');
                const name = it.f14 || '';
                if (!code || !name || seen.has(code)) continue;
                seen.add(code);
                const net = (parseFloat(it.f62 || 0)) / 1e8; // 元→亿元
                const market = (it.f13 === 1 || /^([69])/.test(code)) ? 'SH' : 'SZ';
                out.push({
                    name, code: market + code, market: 'A股', industry: '—',
                    strategy: '长线价值',
                    reason: `主力资金净流入${net >= 0 ? '+' : ''}${net.toFixed(2)}亿元，机构关注度提升，适合逢低布局`,
                    source: '东方财富·资金流向', url: `https://quote.eastmoney.com/${market === 'SH' ? 'sh' : 'sz'}${code}.html`
                });
            }
        } catch (e) { console.warn('[个股推荐] 资金流获取失败:', e.message); }

        if (out.length > 0) {
            // 合并策略：实时数据替换所有系统条目（含旧静态种子），仅保留用户手动添加的个股
            const existing = Storage.get('screeningStocks', []);
            const seedIds = new Set((ContentLibrary.screeningStocks || []).map(s => `${s.code}|${s.name}`));
            // 用户手动添加的 = 不在静态种子库里、且无 auto 标记
            const userStocks = existing.filter(s => !s.auto && !seedIds.has(`${s.code}|${s.name}`));
            const liveStocks = out.map(s => ({ ...s, auto: true }));
            Storage.set('screeningStocks', [...liveStocks, ...userStocks]);
            Storage.set('screeningDate', today);
            this.renderScreening();
            console.log('[个股推荐] 实时生成', liveStocks.length, '只（保留手动', userStocks.length, '只）');
            return true;
        }
        return false;
    },

    // K线图 — 使用 TradingView lightweight-charts
    async renderKLineChart() {
        const container = document.getElementById('klineChart');
        if (!container) return;

        // 动态加载 lightweight-charts
        if (!window.LightweightCharts) {
            await new Promise((resolve, reject) => {
                const s = document.createElement('script');
                s.src = 'https://cdn.jsdelivr.net/npm/lightweight-charts@4.1.3/dist/lightweight-charts.standalone.production.js';
                s.onload = resolve;
                s.onerror = reject;
                document.head.appendChild(s);
            });
        }

        // 获取上证指数日K线数据（Tencent API，JSONP方式）
        const klineData = await this.fetchKLineData('sh000001');
        if (!klineData || klineData.length === 0) {
            container.innerHTML = '<p style="color:var(--text-muted);font-size:12px;text-align:center;padding:20px">K线数据获取失败，请稍后刷新重试</p>';
            return;
        }

        // 清空容器
        container.innerHTML = '';
        const chart = LightweightCharts.createChart(container, {
            width: container.clientWidth,
            height: 320,
            layout: {
                background: { type: 'solid', color: '#1e1e30' },
                textColor: '#9a9ab0',
                fontSize: 11,
            },
            grid: {
                vertLines: { color: '#2a2a40' },
                horzLines: { color: '#2a2a40' },
            },
            timeScale: {
                borderColor: '#2a2a40',
                timeVisible: false,
            },
            rightPriceScale: {
                borderColor: '#2a2a40',
            },
            crosshair: {
                mode: 1,
            },
        });

        const candleSeries = chart.addCandlestickSeries({
            upColor: '#48A878',
            downColor: '#D15757',
            borderUpColor: '#48A878',
            borderDownColor: '#D15757',
            wickUpColor: '#48A878',
            wickDownColor: '#D15757',
        });

        candleSeries.setData(klineData);
        chart.timeScale().fitContent();

        // 响应式
        const resizeObserver = new ResizeObserver(() => {
            chart.applyOptions({ width: container.clientWidth });
        });
        resizeObserver.observe(container);
    },

    // 获取K线数据 — Tencent API (JSONP)
    fetchKLineData(symbol) {
        return new Promise((resolve, reject) => {
            const callbackName = 'kline_cb_' + Date.now();
            window[callbackName] = function(data) {
                delete window[callbackName];
                const script = document.getElementById(callbackName + '_script');
                if (script) script.remove();
                try {
                    const dayData = data?.data?.[symbol]?.day || data?.data?.[symbol]?.qfqday || [];
                    if (!dayData || dayData.length === 0) {
                        // 尝试另一种格式
                        const d = data?.data?.[symbol];
                        if (d && d.day) {
                            const parsed = d.day.map(item => ({
                                time: item[0],
                                open: parseFloat(item[1]),
                                high: parseFloat(item[2]),
                                low: parseFloat(item[3]),
                                close: parseFloat(item[4]),
                            }));
                            resolve(parsed.slice(-120));
                            return;
                        }
                        resolve([]);
                        return;
                    }
                    // qfqday 格式: [date, open, close, high, low, ...]
                    // day 格式: [date, open, close, high, low]
                    const parsed = dayData.map(item => ({
                        time: item[0],
                        open: parseFloat(item[1]),
                        high: parseFloat(item[3] || item[2]),
                        low: parseFloat(item[4] || item[3]),
                        close: parseFloat(item[2] || item[4]),
                    }));
                    resolve(parsed.slice(-120));
                } catch (e) {
                    console.warn('[K线] 数据解析失败:', e);
                    resolve([]);
                }
            };

            const script = document.createElement('script');
            script.id = callbackName + '_script';
            // Tencent K-line API
            script.src = `https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param=${symbol},day,,,120,qfq&callback=${callbackName}`;
            script.onerror = () => {
                delete window[callbackName];
                script.remove();
                reject(new Error('K-line fetch failed'));
            };
            setTimeout(() => {
                if (document.head.contains(script)) {
                    delete window[callbackName];
                    script.remove();
                    reject(new Error('K-line timeout'));
                }
            }, 10000);
            document.head.appendChild(script);
        });
    },

    // ---- 市场概览 ----
    renderIndices() {
        const grid = document.getElementById('indexGrid');
        const saved = Storage.get('marketIndices', null);
        const indices = saved || ContentLibrary.marketIndices;
        grid.innerHTML = indices.map(idx => {
            const changeClass = idx.change && idx.change.startsWith('+') ? 'up' : idx.change && idx.change.startsWith('-') ? 'down' : 'flat';
            return `
                <div class="index-card">
                    <div class="index-name">${escapeHtml(idx.name)} <small>(${escapeHtml(idx.market)})</small></div>
                    <div class="index-value">${escapeHtml(idx.value)}</div>
                    <div class="index-change ${changeClass}">${escapeHtml(idx.change)}</div>
                    ${idx.updateTime ? `<div class="index-time">${escapeHtml(idx.updateTime)}</div>` : ''}
                </div>`;
        }).join('');
    },

    loadMarketData() {
        const saved = Storage.get('marketData', '');
        if (saved) document.getElementById('marketDataInput').value = saved;
    },

    saveMarketData() {
        const text = document.getElementById('marketDataInput').value.trim();
        Storage.set('marketData', text);
        // 尝试解析指数数据
        this.parseMarketData(text);
        App.toast('行情数据已保存');
    },

    parseMarketData(text) {
        if (!text) return;
        const lines = text.split('\n');
        const indices = ContentLibrary.marketIndices.map(i => ({ ...i }));
        lines.forEach(line => {
            // 尝试匹配：名称 数值 涨跌幅
            const match = line.match(/(.+?)[\s,，]+([\d.]+)[\s,，]*([+\-]?[\d.]+%?)/);
            if (match) {
                const name = match[1].trim();
                const value = match[2].trim();
                let change = match[3].trim();
                if (!change.startsWith('+') && !change.startsWith('-') && change !== '—') {
                    change = parseFloat(change) >= 0 ? '+' + change : change;
                }
                const idx = indices.find(i => name.includes(i.name) || i.name.includes(name));
                if (idx) { idx.value = value; idx.change = change; }
            }
        });
        Storage.set('marketIndices', indices);
        this.renderIndices();
    },

    addDataEntry() {
        document.getElementById('marketDataInput').focus();
        App.toast('请在文本框中录入行情数据');
    },

    // ---- 财经资讯 ----
    renderNews() {
        const news = Storage.get('stockNews', []);
        const list = document.getElementById('newsList');
        if (news.length === 0) {
            list.innerHTML = '<div class="empty-state">暂无资讯，点击"添加资讯"手动录入</div>';
            return;
        }
        list.innerHTML = news.map((n, i) => `
            <div class="news-item">
                <div class="news-title">${escapeHtml(n.title)}</div>
                <div class="news-summary">${escapeHtml(n.summary)}</div>
                <div class="news-meta">
                    <span class="news-source">${escapeHtml(n.source || '手动录入')}</span>
                    <span>${escapeHtml(n.date || '')}</span>
                    ${n.tag ? `<span class="news-tag">${escapeHtml(n.tag)}</span>` : ''}
                    ${n.url ? `<a href="${escapeHtml(n.url)}" target="_blank" class="news-link">查看原文 ↗</a>` : ''}
                </div>
                <div class="news-actions">
                    <button class="btn-sm btn-ghost" onclick="StockModule.copyNewsItem(${i})">复制</button>
                    <button class="btn-sm btn-danger" onclick="StockModule.delNews(${i})">删除</button>
                </div>
            </div>`).join('');
    },

    addNews() {
        App.modal('添加财经资讯', `
            <div class="form-group">
                <label>标题</label>
                <input type="text" class="input" id="newsTitle" placeholder="资讯标题">
            </div>
            <div class="form-group">
                <label>摘要概括</label>
                <textarea class="textarea" id="newsSummary" rows="4" placeholder="精简概括资讯核心内容..."></textarea>
            </div>
            <div class="form-group">
                <label>来源</label>
                <input type="text" class="input" id="newsSource" placeholder="如：东方财富/路透社">
            </div>
            <div class="form-group">
                <label>标签</label>
                <input type="text" class="input" id="newsTag" placeholder="如：宏观/行业/公司">
            </div>
            <div class="form-actions">
                <button class="btn-sm btn-outline" onclick="App.closeModal()">取消</button>
                <button class="btn-sm btn-primary" onclick="StockModule.confirmAddNews()">添加</button>
            </div>`);
    },

    confirmAddNews() {
        const title = document.getElementById('newsTitle').value.trim();
        const summary = document.getElementById('newsSummary').value.trim();
        const source = document.getElementById('newsSource').value.trim();
        const tag = document.getElementById('newsTag').value.trim();
        if (!title) { App.toast('请输入标题'); return; }
        const news = Storage.get('stockNews', []);
        news.unshift({ title, summary, source, tag, date: formatDate(new Date()) });
        Storage.set('stockNews', news);
        this.renderNews();
        App.closeModal();
        App.toast('资讯已添加');
    },

    delNews(i) {
        const news = Storage.get('stockNews', []);
        news.splice(i, 1);
        Storage.set('stockNews', news);
        this.renderNews();
        App.toast('已删除');
    },

    copyNewsItem(i) {
        const news = Storage.get('stockNews', []);
        const n = news[i];
        copyToClipboard(`【${n.title}】\n${n.summary}\n来源：${n.source || ''} ${n.date || ''}`);
    },

    copyNews() {
        const news = Storage.get('stockNews', []);
        if (!news.length) { App.toast('暂无资讯'); return; }
        const text = news.map(n => `【${n.title}】\n${n.summary}\n来源：${n.source || ''} ${n.date || ''}`).join('\n\n---\n\n');
        copyToClipboard(text);
    },

    // ---- 潜力观察 ----
    renderScreening() {
        const stocks = Storage.get('screeningStocks', []);
        const body = document.getElementById('screeningBody');
        // 显示更新日期
        const dateEl = document.getElementById('screeningDate');
        if (dateEl) {
            const d = Storage.get('screeningDate', null);
            dateEl.textContent = d ? `更新于 ${d}` : '';
        }
        if (stocks.length === 0) {
            body.innerHTML = '<tr><td colspan="8" class="empty-state">暂无观察个股，点击"添加个股"手动录入</td></tr>';
            return;
        }
        body.innerHTML = stocks.map((s, i) => {
            const stratClass = s.strategy === '长线价值' ? 'strat-long' : s.strategy === '超短线' ? 'strat-short' : 'strat-default';
            const manualTag = s.auto ? '' : ' <span class="manual-tag">手动</span>';
            return `
            <tr>
                <td>${i + 1}</td>
                <td>${escapeHtml(s.name)}${manualTag}</td>
                <td>${escapeHtml(s.code)}</td>
                <td><span class="news-tag">${escapeHtml(s.market)}</span></td>
                <td>${escapeHtml(s.industry)}</td>
                <td>${s.strategy ? `<span class="strat-badge ${stratClass}">${escapeHtml(s.strategy)}</span>` : '—'}</td>
                <td>${escapeHtml(s.reason)}${s.source ? `<div class="screening-source">${escapeHtml(s.source)}${s.url ? ` · <a href="${escapeHtml(s.url)}" target="_blank" class="news-link">查看 ↗</a>` : ''}</div>` : ''}</td>
                <td>
                    <button class="btn-sm btn-ghost" onclick="StockModule.copyScreeningItem(${i})">复制</button>
                    <button class="btn-sm btn-danger" onclick="StockModule.delScreening(${i})">删除</button>
                </td>
            </tr>`;}).join('');
    },

    addScreeningStock() {
        App.modal('添加观察个股', `
            <div class="form-group">
                <label>股票名称</label>
                <input type="text" class="input" id="scName" placeholder="如：贵州茅台">
            </div>
            <div class="form-group">
                <label>代码</label>
                <input type="text" class="input" id="scCode" placeholder="如：600519 / AAPL">
            </div>
            <div class="form-group" style="display:flex;gap:10px">
                <div style="flex:1">
                    <label>市场</label>
                    <select class="select" id="scMarket">
                        <option value="A股">A股</option>
                        <option value="美股">美股</option>
                        <option value="港股">港股</option>
                    </select>
                </div>
                <div style="flex:1">
                    <label>策略类型</label>
                    <select class="select" id="scStrategy">
                        <option value="长线价值">长线价值</option>
                        <option value="超短线">超短线</option>
                        <option value="">未分类</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>所属行业</label>
                <input type="text" class="input" id="scIndustry" placeholder="如：白酒 / 科技">
            </div>
            <div class="form-group">
                <label>观察理由（客观信息）</label>
                <textarea class="textarea" id="scReason" rows="3" placeholder="如：资金持续流入、行业景气度提升、财报超预期等..."></textarea>
            </div>
            <div class="form-group">
                <label>信息来源（可选）</label>
                <input type="text" class="input" id="scSource" placeholder="如：同花顺热榜 / 券商研报">
            </div>
            <div class="form-actions">
                <button class="btn-sm btn-outline" onclick="App.closeModal()">取消</button>
                <button class="btn-sm btn-primary" onclick="StockModule.confirmAddScreening()">添加</button>
            </div>`);
    },

    confirmAddScreening() {
        const name = document.getElementById('scName').value.trim();
        const code = document.getElementById('scCode').value.trim();
        const market = document.getElementById('scMarket').value;
        const strategy = document.getElementById('scStrategy').value;
        const industry = document.getElementById('scIndustry').value.trim();
        const reason = document.getElementById('scReason').value.trim();
        const source = document.getElementById('scSource').value.trim();
        if (!name) { App.toast('请输入股票名称'); return; }
        const stocks = Storage.get('screeningStocks', []);
        stocks.push({ name, code, market, strategy, industry, reason, source });
        Storage.set('screeningStocks', stocks);
        this.renderScreening();
        App.closeModal();
        App.toast('个股已添加');
    },

    delScreening(i) {
        const stocks = Storage.get('screeningStocks', []);
        stocks.splice(i, 1);
        Storage.set('screeningStocks', stocks);
        this.renderScreening();
        App.toast('已删除');
    },

    copyScreeningItem(i) {
        const stocks = Storage.get('screeningStocks', []);
        const s = stocks[i];
        let text = `${s.name}(${s.code}) | ${s.market} | ${s.industry}`;
        if (s.strategy) text += ` | ${s.strategy}`;
        text += `\n观察理由：${s.reason}`;
        if (s.source) text += `\n来源：${s.source}`;
        if (s.url) text += ` (${s.url})`;
        copyToClipboard(text);
    },

    copyScreening() {
        const stocks = Storage.get('screeningStocks', []);
        if (!stocks.length) { App.toast('暂无个股'); return; }
        const text = stocks.map((s, i) => `${i+1}. ${s.name}(${s.code}) | ${s.market} | ${s.industry}${s.strategy ? ' | ' + s.strategy : ''}\n   观察理由：${s.reason}${s.source ? '\n   来源：' + s.source : ''}`).join('\n');
        copyToClipboard(text);
    },

    // ---- 投资推荐总结 ----
    renderInvestmentSummary() {
        const summary = Storage.get('investmentSummary', ContentLibrary.investmentSummary || {});
        const el = document.getElementById('investmentSummary');
        if (!el || !summary || !summary.date) return;

        const strengthClass = (strength) => {
            if (!strength) return '';
            if (strength.includes('最')) return 'strong';
            if (strength.includes('弱')) return 'weak-tag';
            return 'moderate';
        };

        const hotHtml = (summary.hotSectors || []).map(s => `
            <div class="sector-item sector-hot">
                <div class="sector-header">
                    <span class="sector-name">${escapeHtml(s.name)}</span>
                    <span class="sector-strength ${strengthClass(s.strength)}">${escapeHtml(s.strength || '')}</span>
                </div>
                <div class="sector-reason">${escapeHtml(s.reason)}</div>
            </div>`).join('');

        const weakHtml = (summary.weakSectors || []).map(s => `
            <div class="sector-item sector-weak">
                <div class="sector-header">
                    <span class="sector-name">${escapeHtml(s.name)}</span>
                    <span class="sector-strength weak-tag">${escapeHtml(s.strength || '')}</span>
                </div>
                <div class="sector-reason">${escapeHtml(s.reason)}</div>
            </div>`).join('');

        const sourcesHtml = (summary.sources || []).map(s =>
            `<a href="${escapeHtml(s.url)}" target="_blank" class="summary-source-link">${escapeHtml(s.name)} ↗</a>`
        ).join(' ');

        el.innerHTML = `
            <div class="summary-date">更新日期：${escapeHtml(summary.date)}</div>
            <div class="summary-section">
                <div class="summary-label">大盘研判</div>
                <div class="summary-text">${escapeHtml(summary.marketAssessment || '')}</div>
            </div>
            <div class="summary-grid">
                <div class="summary-section">
                    <div class="summary-label label-hot">强势板块</div>
                    ${hotHtml || '<div class="empty-mini">暂无</div>'}
                </div>
                <div class="summary-section">
                    <div class="summary-label label-weak">弱势板块</div>
                    ${weakHtml || '<div class="empty-mini">暂无</div>'}
                </div>
            </div>
            <div class="summary-section">
                <div class="summary-label">长线策略</div>
                <div class="summary-text">${escapeHtml(summary.longTermStrategy || '')}</div>
            </div>
            <div class="summary-section">
                <div class="summary-label">超短线策略</div>
                <div class="summary-text">${escapeHtml(summary.shortTermStrategy || '')}</div>
            </div>
            <div class="summary-section">
                <div class="summary-label">仓位建议</div>
                <div class="summary-text">${escapeHtml(summary.positionAdvice || '')}</div>
            </div>
            <div class="summary-section">
                <div class="summary-label label-risk">风险提示</div>
                <div class="summary-text risk-text">${escapeHtml(summary.riskWarning || '')}</div>
            </div>
            <div class="summary-section">
                <div class="summary-label">参考来源</div>
                <div class="summary-sources">${sourcesHtml || '—'}</div>
            </div>
            <div class="summary-actions" style="margin-top:12px">
                <button class="btn-sm btn-ghost" onclick="StockModule.copyInvestmentSummary()">复制总结</button>
            </div>`;
    },

    copyInvestmentSummary() {
        const summary = Storage.get('investmentSummary', ContentLibrary.investmentSummary || {});
        let text = `投资推荐总结 (${summary.date || '—'})\n\n`;
        text += `【大盘研判】\n${summary.marketAssessment || ''}\n\n`;
        if (summary.hotSectors) {
            text += `【强势板块】\n${summary.hotSectors.map(s => `${s.strength} ${s.name}：${s.reason}`).join('\n')}\n\n`;
        }
        if (summary.weakSectors) {
            text += `【弱势板块】\n${summary.weakSectors.map(s => `${s.strength} ${s.name}：${s.reason}`).join('\n')}\n\n`;
        }
        text += `【长线策略】\n${summary.longTermStrategy || ''}\n\n`;
        text += `【超短线策略】\n${summary.shortTermStrategy || ''}\n\n`;
        text += `【仓位建议】\n${summary.positionAdvice || ''}\n\n`;
        text += `【风险提示】\n${summary.riskWarning || ''}`;
        copyToClipboard(text);
    },

    // ---- 自选股 ----
    renderWatchlist() {
        const wl = Storage.get('watchlist', []);
        const grid = document.getElementById('watchlistGrid');
        if (wl.length === 0) {
            grid.innerHTML = '<div class="empty-state">暂无自选股，点击"添加自选"开始管理</div>';
            return;
        }
        grid.innerHTML = wl.map((s, i) => {
            const changeClass = s.change && s.change.startsWith('+') ? 'up' : s.change && s.change.startsWith('-') ? 'down' : 'flat';
            return `
                <div class="watchlist-card">
                    <div class="wl-name">${escapeHtml(s.name)}</div>
                    <div class="wl-code">${escapeHtml(s.code)} · ${escapeHtml(s.market)}</div>
                    <div class="wl-price">${escapeHtml(s.price || '—')}</div>
                    <div class="wl-change ${changeClass}">${escapeHtml(s.change || '—')}</div>
                    ${s.note ? `<div class="wl-note">${escapeHtml(s.note)}</div>` : ''}
                    <div class="note-actions" style="margin-top:8px">
                        <button class="btn-sm btn-ghost" onclick="StockModule.copyWatchlistItem(${i})">复制</button>
                        <button class="btn-sm btn-danger" onclick="StockModule.delWatchlist(${i})">删除</button>
                    </div>
                </div>`;
        }).join('');
    },

    addWatchlist() {
        App.modal('添加自选股', `
            <div class="form-group">
                <label>股票名称</label>
                <input type="text" class="input" id="wlName" placeholder="如：腾讯控股">
            </div>
            <div class="form-group">
                <label>代码</label>
                <input type="text" class="input" id="wlCode" placeholder="如：00700 / AAPL">
            </div>
            <div class="form-group">
                <label>市场</label>
                <select class="select" id="wlMarket">
                    <option value="A股">A股</option>
                    <option value="美股">美股</option>
                    <option value="港股">港股</option>
                </select>
            </div>
            <div class="form-group">
                <label>当前价格（可选）</label>
                <input type="text" class="input" id="wlPrice" placeholder="如：358.60">
            </div>
            <div class="form-group">
                <label>涨跌幅（可选）</label>
                <input type="text" class="input" id="wlChange" placeholder="如：+2.35%">
            </div>
            <div class="form-group">
                <label>备注</label>
                <textarea class="textarea" id="wlNote" rows="2" placeholder="买入逻辑/观察点/关键价位等"></textarea>
            </div>
            <div class="form-actions">
                <button class="btn-sm btn-outline" onclick="App.closeModal()">取消</button>
                <button class="btn-sm btn-primary" onclick="StockModule.confirmAddWatchlist()">添加</button>
            </div>`);
    },

    confirmAddWatchlist() {
        const name = document.getElementById('wlName').value.trim();
        const code = document.getElementById('wlCode').value.trim();
        const market = document.getElementById('wlMarket').value;
        const price = document.getElementById('wlPrice').value.trim();
        const change = document.getElementById('wlChange').value.trim();
        const note = document.getElementById('wlNote').value.trim();
        if (!name) { App.toast('请输入股票名称'); return; }
        const wl = Storage.get('watchlist', []);
        wl.push({ name, code, market, price, change, note });
        Storage.set('watchlist', wl);
        this.renderWatchlist();
        App.closeModal();
        App.updateQuickStats();
        App.toast('自选股已添加');
    },

    delWatchlist(i) {
        const wl = Storage.get('watchlist', []);
        wl.splice(i, 1);
        Storage.set('watchlist', wl);
        this.renderWatchlist();
        App.updateQuickStats();
        App.toast('已删除');
    },

    copyWatchlistItem(i) {
        const wl = Storage.get('watchlist', []);
        const s = wl[i];
        copyToClipboard(`${s.name}(${s.code}) ${s.market}\n价格：${s.price || '—'}  涨跌：${s.change || '—'}\n备注：${s.note || '无'}`);
    },

    copyWatchlist() {
        const wl = Storage.get('watchlist', []);
        if (!wl.length) { App.toast('暂无自选股'); return; }
        const text = wl.map(s => `${s.name}(${s.code}) ${s.market}  价格:${s.price||'—'}  涨跌:${s.change||'—'}  备注:${s.note||'无'}`).join('\n');
        copyToClipboard(text);
    },

    // ---- 交易笔记 ----
    renderNotes() {
        const notes = Storage.get('stockNotes', []);
        const list = document.getElementById('stockNotesList');
        if (notes.length === 0) {
            list.innerHTML = '<div class="empty-state">暂无笔记，点击"新笔记"开始记录</div>';
            return;
        }
        list.innerHTML = notes.map((n, i) => `
            <div class="note-item">
                <div class="note-header">
                    <span class="note-title">${escapeHtml(n.title)}</span>
                    <span class="note-date">${escapeHtml(n.date)}</span>
                </div>
                <div class="note-body">${escapeHtml(n.body)}</div>
                <div class="note-actions">
                    <button class="btn-sm btn-ghost" onclick="StockModule.copyNote(${i})">复制</button>
                    <button class="btn-sm btn-danger" onclick="StockModule.delNote(${i})">删除</button>
                </div>
            </div>`).join('');
    },

    addNote() {
        App.modal('新建交易笔记', `
            <div class="form-group">
                <label>标题</label>
                <input type="text" class="input" id="noteTitle" placeholder="如：今日操作复盘">
            </div>
            <div class="form-group">
                <label>内容</label>
                <textarea class="textarea" id="noteBody" rows="8" placeholder="记录交易逻辑、市场观察、复盘思考..."></textarea>
            </div>
            <div class="form-actions">
                <button class="btn-sm btn-outline" onclick="App.closeModal()">取消</button>
                <button class="btn-sm btn-primary" onclick="StockModule.confirmAddNote()">保存</button>
            </div>`);
    },

    confirmAddNote() {
        const title = document.getElementById('noteTitle').value.trim();
        const body = document.getElementById('noteBody').value.trim();
        if (!title) { App.toast('请输入标题'); return; }
        const notes = Storage.get('stockNotes', []);
        notes.unshift({ title, body, date: formatDate(new Date()) });
        Storage.set('stockNotes', notes);
        this.renderNotes();
        App.closeModal();
        App.toast('笔记已保存');
    },

    delNote(i) {
        const notes = Storage.get('stockNotes', []);
        notes.splice(i, 1);
        Storage.set('stockNotes', notes);
        this.renderNotes();
        App.toast('已删除');
    },

    copyNote(i) {
        const notes = Storage.get('stockNotes', []);
        const n = notes[i];
        copyToClipboard(`【${n.title}】 ${n.date}\n${n.body}`);
    },

    // ---- 观察日志 ----
    renderLogs() {
        const logs = Storage.get('stockLogs', []);
        const list = document.getElementById('stockLogList');
        if (logs.length === 0) {
            list.innerHTML = '<div class="empty-state">暂无日志，点击"新日志"记录每日观察</div>';
            return;
        }
        list.innerHTML = logs.map((l, i) => `
            <div class="log-item">
                <div class="log-date">${escapeHtml(l.date)}</div>
                <div class="log-body">${escapeHtml(l.body)}</div>
                <div class="note-actions">
                    <button class="btn-sm btn-ghost" onclick="StockModule.copyLog(${i})">复制</button>
                    <button class="btn-sm btn-danger" onclick="StockModule.delLog(${i})">删除</button>
                </div>
            </div>`).join('');
    },

    addLog() {
        App.modal('新建观察日志', `
            <div class="form-group">
                <label>日期</label>
                <input type="date" class="input" id="logDate" value="${formatDate(new Date())}">
            </div>
            <div class="form-group">
                <label>观察内容</label>
                <textarea class="textarea" id="logBody" rows="8" placeholder="记录今日市场观察、板块轮动、资金动向、个人思考等..."></textarea>
            </div>
            <div class="form-actions">
                <button class="btn-sm btn-outline" onclick="App.closeModal()">取消</button>
                <button class="btn-sm btn-primary" onclick="StockModule.confirmAddLog()">保存</button>
            </div>`);
    },

    confirmAddLog() {
        const date = document.getElementById('logDate').value;
        const body = document.getElementById('logBody').value.trim();
        if (!body) { App.toast('请输入内容'); return; }
        const logs = Storage.get('stockLogs', []);
        logs.unshift({ date, body });
        Storage.set('stockLogs', logs);
        this.renderLogs();
        App.closeModal();
        App.toast('日志已保存');
    },

    delLog(i) {
        const logs = Storage.get('stockLogs', []);
        logs.splice(i, 1);
        Storage.set('stockLogs', logs);
        this.renderLogs();
        App.toast('已删除');
    },

    copyLog(i) {
        const logs = Storage.get('stockLogs', []);
        const l = logs[i];
        copyToClipboard(`${l.date}\n${l.body}`);
    },

    copyAll() {
        const parts = [];
        const summary = Storage.get('investmentSummary', ContentLibrary.investmentSummary || {});
        if (summary && summary.date) {
            parts.push('=== 投资推荐总结 ===');
            parts.push(`日期：${summary.date}`);
            parts.push(`大盘研判：${summary.marketAssessment || ''}`);
            if (summary.longTermStrategy) parts.push(`长线策略：${summary.longTermStrategy}`);
            if (summary.shortTermStrategy) parts.push(`超短线策略：${summary.shortTermStrategy}`);
            if (summary.positionAdvice) parts.push(`仓位建议：${summary.positionAdvice}`);
        }
        const indices = Storage.get('marketIndices', ContentLibrary.marketIndices);
        parts.push('\n=== 市场概览 ===');
        parts.push(indices.map(i => `${i.name}: ${i.value} ${i.change}`).join('\n'));
        const news = Storage.get('stockNews', []);
        if (news.length) {
            parts.push('\n=== 财经资讯 ===');
            parts.push(news.map(n => `【${n.title}】${n.summary}${n.url ? '\n链接：' + n.url : ''}`).join('\n'));
        }
        const stocks = Storage.get('screeningStocks', []);
        if (stocks.length) {
            parts.push('\n=== 个股推荐 ===');
            parts.push(stocks.map((s,i) => `${i+1}. ${s.name}(${s.code}) ${s.market} ${s.industry}${s.strategy ? ' ['+s.strategy+']' : ''} - ${s.reason}${s.source ? ' (来源：'+s.source+')' : ''}`).join('\n'));
        }
        const wl = Storage.get('watchlist', []);
        if (wl.length) {
            parts.push('\n=== 自选股 ===');
            parts.push(wl.map(s => `${s.name}(${s.code}) ${s.price||'—'} ${s.change||'—'}`).join('\n'));
        }
        copyToClipboard(parts.join('\n'));
    }
};

/* ========================================
   模块2: 雅思备考
   ======================================== */
const IELTSModule = {
    readingIndex: 0,
    listeningIndex: 0,
    essayIndex: 0,
    speakingIndex: 0,

    init() {
        this.renderReading();
        this.renderListening();
        this.renderPlan();
        this.renderEssay();
        this.renderSpeaking();
        this.renderTracker();
        this.bindTrackerInputs();
    },

    refreshContent() {
        this.newReading();
        this.newListening();
        this.newEssay();
        this.newSpeaking();
    },

    // ---- 每日阅读 ----
    renderReading() {
        const r = ContentLibrary.readings[this.readingIndex % ContentLibrary.readings.length];
        const el = document.getElementById('readingContent');
        el.innerHTML = `
            <div class="reading-title">${escapeHtml(r.title)}</div>
            <div class="reading-meta">来源：${escapeHtml(r.source)} | 难度：${escapeHtml(r.level)}</div>
            <div class="reading-text">${r.text.split('\n').map(p => `<p style="margin-bottom:12px">${escapeHtml(p)}</p>`).join('')}</div>
            <div class="reading-vocab">
                <h4>核心词汇</h4>
                ${r.vocab.map(v => `<div class="vocab-item"><strong>${escapeHtml(v.word)}</strong> — ${escapeHtml(v.meaning)}</div>`).join('')}
            </div>`;
    },

    newReading() {
        this.readingIndex = (this.readingIndex + 1) % ContentLibrary.readings.length;
        this.renderReading();
    },

    copyReading() {
        const r = ContentLibrary.readings[this.readingIndex % ContentLibrary.readings.length];
        copyToClipboard(`${r.title}\n\n${r.text}\n\n核心词汇：\n${r.vocab.map(v => `${v.word} - ${v.meaning}`).join('\n')}`);
    },

    // ---- 听力训练 ----
    renderListening() {
        const l = ContentLibrary.listenings[this.listeningIndex % ContentLibrary.listenings.length];
        const el = document.getElementById('listeningContent');
        let audioHtml = '';
        if (l.audioUrl && l.audioType === 'hls') {
            // HLS live stream - needs hls.js
            audioHtml = `
                <div id="hls-player-container" style="margin-top:10px">
                    <audio id="hls-audio" controls preload="none" style="width:100%"></audio>
                    <p style="font-size:11px;color:var(--text-muted);margin-top:6px">🔴 直播流 · 内容实时更新 · 如无法播放请点击上方链接在源网站收听</p>
                </div>`;
            // Initialize HLS after DOM update
            setTimeout(() => {
                const audio = document.getElementById('hls-audio');
                if (!audio) return;
                const url = l.audioUrl;
                if (audio.canPlayType('application/vnd.apple.mpegurl')) {
                    // Safari native HLS
                    audio.src = url;
                } else if (window.Hls && Hls.isSupported()) {
                    // Chrome/Firefox via hls.js
                    const hls = new Hls();
                    hls.loadSource(url);
                    hls.attachMedia(audio);
                } else {
                    audioHtml = '<p style="color:var(--text-muted);font-size:12px;padding:10px 0">浏览器不支持HLS直播，请点击上方链接在源网站收听</p>';
                    const container = document.getElementById('hls-player-container');
                    if (container) container.innerHTML = audioHtml;
                }
            }, 100);
        } else if (l.audioUrl) {
            // Regular MP3
            audioHtml = `
                <audio controls preload="none" style="width:100%;margin-top:10px">
                    <source src="${l.audioUrl}" type="audio/mpeg">
                    你的浏览器不支持音频播放，请使用<a href="${l.audioUrl}" target="_blank">此链接</a>打开
                </audio>
                <p style="font-size:11px;color:var(--text-muted);margin-top:6px">提示：如无法播放，可能是网络限制，点击上方链接在源网站收听</p>`;
        } else {
            // External resource - no inline player, just link
            audioHtml = `<div style="padding:14px;background:var(--bg-input);border-radius:var(--radius-sm);text-align:center">
                <p style="font-size:13px;color:var(--text-secondary);margin-bottom:8px">📋 此资源需在源网站收听（内容丰富、每日更新）</p>
                <a href="${l.audioPage}" target="_blank" style="display:inline-block;padding:8px 20px;background:var(--accent-purple);color:#fff;border-radius:var(--radius-sm);text-decoration:none;font-size:13px;font-weight:600">前往收听 ↗</a>
            </div>`;
        }
        el.innerHTML = `
            <div class="listen-title">${escapeHtml(l.title)}</div>
            <p class="hint-text">场景：${escapeHtml(l.context)}</p>
            ${l.level ? `<p class="hint-text">难度：${escapeHtml(l.level)}</p>` : ''}
            <div class="listen-audio-player">
                <div class="audio-header">
                    <span class="audio-source">🔊 音频来源：${escapeHtml(l.audioSource || '外部音频')}</span>
                    ${l.audioPage ? `<a href="${l.audioPage}" target="_blank" class="audio-link">查看原文页面 ↗</a>` : ''}
                </div>
                ${audioHtml}
            </div>
            <div class="listen-transcript">
                <h4 style="margin-bottom:8px">听力文本 / 使用指南</h4>
                ${l.transcript.split('\n').map(p => `<p style="margin-bottom:8px">${escapeHtml(p)}</p>`).join('')}
            </div>
            <div class="listen-questions">
                <h4>听力理解练习</h4>
                ${l.questions.map((q,i) => `<div class="listen-q">${i+1}. ${escapeHtml(q)}</div>`).join('')}
            </div>`;
        // 精听方案
        document.getElementById('listeningPlan').innerHTML = ContentLibrary.listeningPlan.map((s,i) => `
            <div class="plan-step">
                <div class="step-num">${i+1}</div>
                <div class="step-text"><strong>${escapeHtml(s.step)}</strong>：${escapeHtml(s.desc)}</div>
            </div>`).join('');
    },

    newListening() {
        this.listeningIndex = (this.listeningIndex + 1) % ContentLibrary.listenings.length;
        this.renderListening();
    },

    copyListening() {
        const l = ContentLibrary.listenings[this.listeningIndex % ContentLibrary.listenings.length];
        let text = `${l.title}\n难度：${l.level || '—'}\n场景：${l.context}`;
        if (l.audioUrl) text += `\n音频链接：${l.audioUrl}`;
        if (l.audioSource) text += `\n音频来源：${l.audioSource}`;
        text += `\n\n听力文本：\n${l.transcript}\n\n练习题：\n${l.questions.map((q,i)=>`${i+1}. ${q}`).join('\n')}`;
        copyToClipboard(text);
    },

    // ---- 训练计划 ----
    renderPlan() {
        const el = document.getElementById('ieltsPlanGrid');
        el.innerHTML = ContentLibrary.studyPlan.map(p => `
            <div class="plan-card" style="border-top-color:${p.color}">
                <h4>${p.icon} ${escapeHtml(p.skill)}</h4>
                <ul>${p.plan.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
            </div>`).join('');
    },

    copyPlan() {
        const text = ContentLibrary.studyPlan.map(p =>
            `【${p.skill}】\n${p.plan.map(i => '  - ' + i).join('\n')}`
        ).join('\n\n');
        copyToClipboard(text);
    },

    // ---- 写作范文 ----
    renderEssay() {
        const e = ContentLibrary.essays[this.essayIndex % ContentLibrary.essays.length];
        document.getElementById('essayContent').innerHTML = `
            <div class="essay-topic">${escapeHtml(e.type)}</div>
            <div class="essay-title">${escapeHtml(e.title)}</div>
            <p class="hint-text">题目：${escapeHtml(e.topic)}</p>
            <div class="essay-text">${e.text.split('\n').map(p => `<p style="margin-bottom:12px">${escapeHtml(p)}</p>`).join('')}</div>
            <div class="essay-analysis">
                <h4>范文分析</h4>
                <p>${escapeHtml(e.analysis)}</p>
            </div>`;
    },

    newEssay() {
        this.essayIndex = (this.essayIndex + 1) % ContentLibrary.essays.length;
        this.renderEssay();
    },

    copyEssay() {
        const e = ContentLibrary.essays[this.essayIndex % ContentLibrary.essays.length];
        copyToClipboard(`题目：${e.topic}\n\n${e.title}\n\n${e.text}\n\n【范文分析】${e.analysis}`);
    },

    // ---- 口语话题 ----
    renderSpeaking() {
        const s = ContentLibrary.speakingTopics[this.speakingIndex % ContentLibrary.speakingTopics.length];
        document.getElementById('speakingContent').innerHTML = `
            <div class="speak-part">${escapeHtml(s.part)}</div>
            <div class="speak-topic">${escapeHtml(s.topic)}</div>
            <div class="speak-questions">
                ${s.questions.map((q,i) => `<div class="speak-q">${i+1}. ${escapeHtml(q)}</div>`).join('')}
            </div>
            <div class="speak-tips">
                <h4>答题技巧</h4>
                <ul>${s.tips.map(t => `<li>${escapeHtml(t)}</li>`).join('')}</ul>
            </div>
            <div class="speak-vocab">
                <h4 style="font-size:13px;color:var(--accent-purple);margin-bottom:6px">推荐词汇</h4>
                ${s.vocab.map(v => `<span class="vocab-tag">${escapeHtml(v)}</span>`).join('')}
            </div>`;
    },

    newSpeaking() {
        this.speakingIndex = (this.speakingIndex + 1) % ContentLibrary.speakingTopics.length;
        this.renderSpeaking();
    },

    copySpeaking() {
        const s = ContentLibrary.speakingTopics[this.speakingIndex % ContentLibrary.speakingTopics.length];
        copyToClipboard(`${s.part} - ${s.topic}\n\n问题：\n${s.questions.map((q,i)=>`${i+1}. ${q}`).join('\n')}\n\n答题技巧：\n${s.tips.map(t=>'  - '+t).join('\n')}\n\n推荐词汇：${s.vocab.join(', ')}`);
    },

    // ---- 学习打卡 ----
    bindTrackerInputs() {
        ['trackListening','trackReading','trackWriting','trackSpeaking'].forEach(id => {
            const el = document.getElementById(id);
            el.addEventListener('input', () => this.updateTrackerTotal());
        });
    },

    updateTrackerTotal() {
        const l = parseInt(document.getElementById('trackListening').value) || 0;
        const r = parseInt(document.getElementById('trackReading').value) || 0;
        const w = parseInt(document.getElementById('trackWriting').value) || 0;
        const s = parseInt(document.getElementById('trackSpeaking').value) || 0;
        const total = l + r + w + s;
        document.getElementById('trackTotal').textContent = total + ' 分钟';
        const today = formatDate(new Date());
        Storage.set('todayTracker', { listening: l, reading: r, writing: w, speaking: s, date: today });
        App.updateQuickStats();
    },

    renderTracker() {
        const tracker = Storage.get('todayTracker', {});
        if (tracker.date === formatDate(new Date())) {
            document.getElementById('trackListening').value = tracker.listening || 0;
            document.getElementById('trackReading').value = tracker.reading || 0;
            document.getElementById('trackWriting').value = tracker.writing || 0;
            document.getElementById('trackSpeaking').value = tracker.speaking || 0;
            this.updateTrackerTotal();
        }
        // 历史
        const history = Storage.get('trackerHistory', []);
        const el = document.getElementById('trackerHistory');
        if (history.length === 0) {
            el.innerHTML = '<div class="empty-state">暂无学习记录，保存后将出现在这里</div>';
        } else {
            el.innerHTML = history.slice(-20).reverse().map(h => `
                <div class="tracker-entry">
                    <div>
                        <div class="te-date">${escapeHtml(h.date)}</div>
                        <div class="te-detail">听${h.listening}分 / 读${h.reading}分 / 写${h.writing}分 / 说${h.speaking}分</div>
                    </div>
                    <div class="te-total">${h.total}分</div>
                </div>`).join('');
        }
    },

    saveTracker() {
        const l = parseInt(document.getElementById('trackListening').value) || 0;
        const r = parseInt(document.getElementById('trackReading').value) || 0;
        const w = parseInt(document.getElementById('trackWriting').value) || 0;
        const s = parseInt(document.getElementById('trackSpeaking').value) || 0;
        const total = l + r + w + s;
        const today = formatDate(new Date());
        const history = Storage.get('trackerHistory', []);
        // 替换今日已有记录
        const idx = history.findIndex(h => h.date === today);
        const entry = { date: today, listening: l, reading: r, writing: w, speaking: s, total };
        if (idx >= 0) history[idx] = entry;
        else history.push(entry);
        Storage.set('trackerHistory', history);
        this.renderTracker();
        App.toast('学习记录已保存（' + total + '分钟）');
    },

    copyAll() {
        const parts = [];
        const r = ContentLibrary.readings[this.readingIndex % ContentLibrary.readings.length];
        parts.push('=== 每日阅读 ===');
        parts.push(r.title + '\n' + r.text);
        const l = ContentLibrary.listenings[this.listeningIndex % ContentLibrary.listenings.length];
        parts.push('\n=== 听力素材 ===');
        parts.push(l.title + '\n' + l.transcript);
        const e = ContentLibrary.essays[this.essayIndex % ContentLibrary.essays.length];
        parts.push('\n=== 写作范文 ===');
        parts.push(e.title + '\n' + e.text);
        const s = ContentLibrary.speakingTopics[this.speakingIndex % ContentLibrary.speakingTopics.length];
        parts.push('\n=== 口语话题 ===');
        parts.push(s.part + ' - ' + s.topic + '\n' + s.questions.join('\n'));
        copyToClipboard(parts.join('\n'));
    }
};

/* ========================================
   模块3: 每日计划
   ======================================== */
const PlannerModule = {
    currentDate: new Date(),

    init() {
        document.getElementById('plannerDate').value = formatDate(this.currentDate);
        document.getElementById('plannerDate').addEventListener('change', (e) => {
            this.currentDate = new Date(e.target.value);
            this.renderTasks();
        });
        this.renderTasks();
        this.renderFixedTasks();
    },

    getKey() {
        return 'tasks_' + formatDate(this.currentDate);
    },

    changeDate(delta) {
        this.currentDate.setDate(this.currentDate.getDate() + delta);
        document.getElementById('plannerDate').value = formatDate(this.currentDate);
        this.renderTasks();
    },

    goToday() {
        this.currentDate = new Date();
        document.getElementById('plannerDate').value = formatDate(this.currentDate);
        this.renderTasks();
    },

    addTask() {
        const text = document.getElementById('taskInput').value.trim();
        const cat = document.getElementById('taskCategory').value;
        const priority = document.getElementById('taskPriority').value;
        if (!text) { App.toast('请输入待办内容'); return; }
        const tasks = Storage.get(this.getKey(), []);
        tasks.push({ text, category: cat, priority, done: false, id: Date.now() });
        Storage.set(this.getKey(), tasks);
        document.getElementById('taskInput').value = '';
        this.renderTasks();
        App.updateQuickStats();
        App.toast('任务已添加');
    },

    renderTasks() {
        const tasks = Storage.get(this.getKey(), []);
        const list = document.getElementById('taskList');
        const done = tasks.filter(t => t.done).length;
        document.getElementById('plannerSummary').textContent = `共 ${tasks.length} 项 · 完成 ${done} 项`;
        App.updateQuickStats();
        if (tasks.length === 0) {
            list.innerHTML = '<div class="empty-state">今日暂无待办，添加一个开始吧</div>';
            return;
        }
        // 按优先级排序
        const order = { high: 0, medium: 1, low: 2 };
        tasks.sort((a,b) => order[a.priority] - order[b.priority]);
        list.innerHTML = tasks.map(t => `
            <div class="task-item ${t.done ? 'done' : ''}">
                <div class="task-checkbox ${t.done ? 'checked' : ''}" onclick="PlannerModule.toggleTask(${t.id})"></div>
                <div class="task-priority ${t.priority}"></div>
                <span class="task-text">${escapeHtml(t.text)}</span>
                <span class="task-cat ${t.category}">${this.catLabel(t.category)}</span>
                <button class="btn-sm btn-danger" onclick="PlannerModule.delTask(${t.id})">删除</button>
            </div>`).join('');
    },

    toggleTask(id) {
        const tasks = Storage.get(this.getKey(), []);
        const t = tasks.find(t => t.id === id);
        if (t) t.done = !t.done;
        Storage.set(this.getKey(), tasks);
        this.renderTasks();
        App.updateQuickStats();
    },

    delTask(id) {
        let tasks = Storage.get(this.getKey(), []);
        tasks = tasks.filter(t => t.id !== id);
        Storage.set(this.getKey(), tasks);
        this.renderTasks();
        App.updateQuickStats();
        App.toast('已删除');
    },

    catLabel(cat) {
        const map = { work: '工作', study: '学习', life: '生活', stock: '股票', other: '其他' };
        return map[cat] || cat;
    },

    copyTasks() {
        const tasks = Storage.get(this.getKey(), []);
        if (!tasks.length) { App.toast('暂无任务'); return; }
        const date = formatDate(this.currentDate);
        const text = `📅 ${date} 待办清单\n\n${tasks.map((t,i) =>
            `${t.done ? '✓' : '□'} ${i+1}. ${t.text} [${this.catLabel(t.category)}]`
        ).join('\n')}\n\n完成 ${tasks.filter(t=>t.done).length}/${tasks.length}`;
        copyToClipboard(text);
    },

    // ---- 固定任务 ----
    renderFixedTasks() {
        const fixed = Storage.get('fixedTasks', []);
        const list = document.getElementById('fixedTaskList');
        if (fixed.length === 0) {
            list.innerHTML = '<div class="empty-state">暂无固定任务，添加每日重复提醒事项</div>';
            return;
        }
        list.innerHTML = fixed.map((f, i) => `
            <div class="fixed-task-item">
                <div class="fixed-task-info">
                    <span class="fixed-task-time">${escapeHtml(f.time || '全天')}</span>
                    <span>${escapeHtml(f.text)}</span>
                    <span class="task-cat ${f.category}">${this.catLabel(f.category)}</span>
                </div>
                <button class="btn-sm btn-danger" onclick="PlannerModule.delFixedTask(${i})">删除</button>
            </div>`).join('');
    },

    addFixedTask() {
        App.modal('添加固定任务提醒', `
            <div class="form-group">
                <label>任务内容</label>
                <input type="text" class="input" id="ftText" placeholder="如：背单词50个">
            </div>
            <div class="form-group">
                <label>提醒时间</label>
                <input type="time" class="input" id="ftTime">
            </div>
            <div class="form-group">
                <label>分类</label>
                <select class="select" id="ftCategory">
                    <option value="study">学习</option>
                    <option value="work">工作</option>
                    <option value="life">生活</option>
                    <option value="stock">股票</option>
                    <option value="other">其他</option>
                </select>
            </div>
            <div class="form-actions">
                <button class="btn-sm btn-outline" onclick="App.closeModal()">取消</button>
                <button class="btn-sm btn-primary" onclick="PlannerModule.confirmAddFixedTask()">添加</button>
            </div>`);
    },

    confirmAddFixedTask() {
        const text = document.getElementById('ftText').value.trim();
        const time = document.getElementById('ftTime').value;
        const category = document.getElementById('ftCategory').value;
        if (!text) { App.toast('请输入任务内容'); return; }
        const fixed = Storage.get('fixedTasks', []);
        fixed.push({ text, time, category });
        Storage.set('fixedTasks', fixed);
        this.renderFixedTasks();
        App.closeModal();
        App.toast('固定任务已添加');
    },

    delFixedTask(i) {
        const fixed = Storage.get('fixedTasks', []);
        fixed.splice(i, 1);
        Storage.set('fixedTasks', fixed);
        this.renderFixedTasks();
        App.toast('已删除');
    }
};

/* ========================================
   模块4: 自媒体创作
   ======================================== */
const VlogModule = {
    topicIndex: 0,

    init() {
        this.renderTopics();
        this.renderCases();
        this.renderLibrary();
    },

    refreshTopics() {
        this.topicIndex++;
        this.renderTopics();
        App.toast('选题已刷新');
    },

    // ---- 爆款选题 ----
    renderTopics() {
        const all = ContentLibrary.vlogTopics;
        // 随机打乱并取10个
        const shuffled = [...all].sort(() => Math.random() - 0.5);
        const list = document.getElementById('topicList');
        list.innerHTML = shuffled.map((t, i) => `
            <div class="topic-item">
                <div class="topic-rank">${i + 1}</div>
                <div style="flex:1">
                    <div class="topic-title">${escapeHtml(t.title)}</div>
                    <div class="topic-desc">${escapeHtml(t.desc)}</div>
                    <div class="topic-tags">${t.tags.map(tag => `<span class="topic-tag">${escapeHtml(tag)}</span>`).join('')}</div>
                </div>
                <div class="topic-actions">
                    <button class="btn-sm btn-ghost" onclick="VlogModule.copyTopic(${i})">复制</button>
                    <button class="btn-sm btn-outline" onclick="VlogModule.saveTopicToLibrary(${i})">收藏</button>
                </div>
            </div>`).join('');
        // 保存当前显示的选题供复制使用
        this._currentTopics = shuffled;
    },

    copyTopic(i) {
        const t = this._currentTopics[i];
        copyToClipboard(`选题：${t.title}\n描述：${t.desc}\n标签：${t.tags.join(', ')}`);
    },

    saveTopicToLibrary(i) {
        const t = this._currentTopics[i];
        const lib = Storage.get('vlogLibrary', []);
        lib.unshift({ type: '选题', title: t.title, body: t.desc, tags: t.tags, date: formatDate(new Date()) });
        Storage.set('vlogLibrary', lib);
        this.renderLibrary();
        App.updateQuickStats();
        App.toast('已收藏到选题库');
    },

    copyTopics() {
        const text = this._currentTopics.map((t, i) =>
            `${i+1}. ${t.title}\n   ${t.desc}\n   标签：${t.tags.join(', ')}`
        ).join('\n');
        copyToClipboard(text);
    },

    // ---- 对标案例 ----
    renderCases() {
        const cases = Storage.get('vlogCases', ContentLibrary.vlogCases);
        const list = document.getElementById('caseList');
        if (cases.length === 0) {
            list.innerHTML = '<div class="empty-state">暂无案例，点击"添加案例"手动录入</div>';
            return;
        }
        list.innerHTML = cases.map((c, i) => `
            <div class="case-item">
                <div class="case-title">${escapeHtml(c.title)}</div>
                <div class="case-channel">
                    <span style="font-weight:600;color:var(--accent-teal)">${escapeHtml(c.channel)}</span>
                    ${c.platform ? `<span class="case-platform">${escapeHtml(c.platform)}</span>` : ''}
                    ${c.fans ? `<span class="case-fans">粉丝 ${escapeHtml(c.fans)}</span>` : ''}
                    ${c.views ? `<span class="case-views">播放 ${escapeHtml(c.views)}</span>` : ''}
                </div>
                <div class="case-analysis" style="white-space:pre-wrap">${escapeHtml(c.analysis)}</div>
                ${c.framework ? `
                <div class="case-framework">
                    <h5>脚本框架拆解</h5>
                    <ul>${c.framework.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
                </div>` : ''}
                <div class="note-actions" style="margin-top:10px">
                    <button class="btn-sm btn-ghost" onclick="VlogModule.copyCase(${i})">复制</button>
                    <button class="btn-sm btn-danger" onclick="VlogModule.delCase(${i})">删除</button>
                </div>
            </div>`).join('');
        this._cases = cases;
    },

    addCase() {
        App.modal('添加对标案例', `
            <div class="form-group">
                <label>视频标题</label>
                <input type="text" class="input" id="caseTitle" placeholder="对标视频标题">
            </div>
            <div class="form-group">
                <label>频道/创作者</label>
                <input type="text" class="input" id="caseChannel" placeholder="频道名称">
            </div>
            <div class="form-group">
                <label>播放量（可选）</label>
                <input type="text" class="input" id="caseViews" placeholder="如：120万+">
            </div>
            <div class="form-group">
                <label>案例分析</label>
                <textarea class="textarea" id="caseAnalysis" rows="4" placeholder="分析视频的内容结构、节奏、亮点等..."></textarea>
            </div>
            <div class="form-group">
                <label>脚本框架拆解（每行一条）</label>
                <textarea class="textarea" id="caseFramework" rows="4" placeholder="开头钩子：...&#10;主体结构：...&#10;结尾升华：..."></textarea>
            </div>
            <div class="form-actions">
                <button class="btn-sm btn-outline" onclick="App.closeModal()">取消</button>
                <button class="btn-sm btn-primary" onclick="VlogModule.confirmAddCase()">添加</button>
            </div>`);
    },

    confirmAddCase() {
        const title = document.getElementById('caseTitle').value.trim();
        const channel = document.getElementById('caseChannel').value.trim();
        const views = document.getElementById('caseViews').value.trim();
        const analysis = document.getElementById('caseAnalysis').value.trim();
        const frameworkText = document.getElementById('caseFramework').value.trim();
        if (!title) { App.toast('请输入标题'); return; }
        const framework = frameworkText ? frameworkText.split('\n').filter(f => f.trim()) : null;
        const cases = Storage.get('vlogCases', ContentLibrary.vlogCases.slice());
        cases.push({ title, channel, views, analysis, framework });
        Storage.set('vlogCases', cases);
        this.renderCases();
        App.closeModal();
        App.toast('案例已添加');
    },

    delCase(i) {
        const cases = Storage.get('vlogCases', []);
        cases.splice(i, 1);
        Storage.set('vlogCases', cases);
        this.renderCases();
        App.toast('已删除');
    },

    copyCase(i) {
        const c = this._cases[i];
        let text = `${c.title}`;
        if (c.channel) text += `\n创作者：${c.channel}`;
        if (c.platform) text += ` | 平台：${c.platform}`;
        if (c.fans) text += ` | 粉丝：${c.fans}`;
        if (c.views) text += ` | 播放：${c.views}`;
        if (c.analysis) text += `\n\n${c.analysis}`;
        if (c.framework) text += '\n\n脚本框架：\n' + c.framework.map(f => '  - ' + f).join('\n');
        copyToClipboard(text);
    },

    copyCases() {
        const text = this._cases.map((c, i) =>
            `${i+1}. ${c.title}\n   ${c.channel} · ${c.views||''}\n   ${c.analysis}`
        ).join('\n\n');
        copyToClipboard(text);
    },

    // ---- 脚本框架 ----
    generateScript() {
        const topic = document.getElementById('scriptTopic').value.trim() || '通用自媒体内容';
        const el = document.getElementById('scriptContent');
        el.innerHTML = ContentLibrary.scriptTemplates.map(t => `
            <div class="script-section">
                <div class="script-label">${escapeHtml(t.section)}</div>
                <div class="script-body">${escapeHtml(t.content.replace(/\{topic\}/g, topic))}</div>
            </div>`).join('');
        App.toast('脚本框架已生成');
    },

    copyScript() {
        const topic = document.getElementById('scriptTopic').value.trim() || '通用自媒体内容';
        const text = ContentLibrary.scriptTemplates.map(t =>
            `【${t.section}】\n${t.content.replace(/\{topic\}/g, topic)}`
        ).join('\n\n');
        copyToClipboard(text);
    },

    // ---- 文案初稿 ----
    generateDraft() {
        const topic = document.getElementById('draftTopic').value.trim() || '好物推荐';
        const titles = ContentLibrary.draftTemplates.titles;
        const descs = ContentLibrary.draftTemplates.descriptions;
        const tags = ContentLibrary.draftTemplates.tags;
        const title = titles[Math.floor(Math.random() * titles.length)];
        const desc = descs[Math.floor(Math.random() * descs.length)].replace(/\{topic\}/g, topic);
        const el = document.getElementById('draftContent');
        el.innerHTML = `
            <div class="draft-section">
                <div class="draft-label">推荐标题</div>
                <div class="draft-body">${escapeHtml(title)}</div>
            </div>
            <div class="draft-section">
                <div class="draft-label">文案描述</div>
                <div class="draft-body">${escapeHtml(desc)}</div>
            </div>
            <div class="draft-section">
                <div class="draft-label">推荐标签</div>
                <div class="draft-tags">${tags.map(t => `<span class="draft-tag">${escapeHtml(t)}</span>`).join('')}</div>
            </div>`;
        App.toast('文案初稿已生成');
    },

    copyDraft() {
        const topic = document.getElementById('draftTopic').value.trim() || '好物推荐';
        const titles = ContentLibrary.draftTemplates.titles;
        const descs = ContentLibrary.draftTemplates.descriptions;
        const tags = ContentLibrary.draftTemplates.tags;
        const title = titles[Math.floor(Math.random() * titles.length)];
        const desc = descs[Math.floor(Math.random() * descs.length)].replace(/\{topic\}/g, topic);
        copyToClipboard(`标题：${title}\n\n描述：\n${desc}\n\n标签：${tags.join(' ')}`);
    },

    // ---- 选题库 ----
    renderLibrary() {
        const lib = Storage.get('vlogLibrary', []);
        const list = document.getElementById('libraryList');
        if (lib.length === 0) {
            list.innerHTML = '<div class="empty-state">选题库为空，从选题列表收藏或手动添加</div>';
            return;
        }
        list.innerHTML = lib.map((item, i) => `
            <div class="library-item">
                <div class="lib-title">${escapeHtml(item.title)}</div>
                <span class="lib-type">${escapeHtml(item.type)}</span>
                ${item.body ? `<div class="lib-body">${escapeHtml(item.body)}</div>` : ''}
                ${item.tags ? `<div class="draft-tags" style="margin-top:6px">${item.tags.map(t => `<span class="draft-tag">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
                <div class="lib-date">${escapeHtml(item.date)}</div>
                <div class="note-actions" style="margin-top:8px">
                    <button class="btn-sm btn-ghost" onclick="VlogModule.copyLibraryItem(${i})">复制</button>
                    <button class="btn-sm btn-danger" onclick="VlogModule.delLibraryItem(${i})">删除</button>
                </div>
            </div>`).join('');
    },

    addToLibrary() {
        App.modal('添加选题/草稿到库', `
            <div class="form-group">
                <label>类型</label>
                <select class="select" id="libType">
                    <option value="选题">选题</option>
                    <option value="脚本草稿">脚本草稿</option>
                    <option value="文案">文案</option>
                    <option value="灵感">灵感笔记</option>
                </select>
            </div>
            <div class="form-group">
                <label>标题</label>
                <input type="text" class="input" id="libTitle" placeholder="标题">
            </div>
            <div class="form-group">
                <label>内容</label>
                <textarea class="textarea" id="libBody" rows="5" placeholder="详细内容..."></textarea>
            </div>
            <div class="form-group">
                <label>标签（逗号分隔）</label>
                <input type="text" class="input" id="libTags" placeholder="好物推荐, 测评, 带货">
            </div>
            <div class="form-actions">
                <button class="btn-sm btn-outline" onclick="App.closeModal()">取消</button>
                <button class="btn-sm btn-primary" onclick="VlogModule.confirmAddToLibrary()">添加</button>
            </div>`);
    },

    confirmAddToLibrary() {
        const type = document.getElementById('libType').value;
        const title = document.getElementById('libTitle').value.trim();
        const body = document.getElementById('libBody').value.trim();
        const tagsText = document.getElementById('libTags').value.trim();
        if (!title) { App.toast('请输入标题'); return; }
        const tags = tagsText ? tagsText.split(/[,，]/).map(t => t.trim()).filter(t => t) : null;
        const lib = Storage.get('vlogLibrary', []);
        lib.unshift({ type, title, body, tags, date: formatDate(new Date()) });
        Storage.set('vlogLibrary', lib);
        this.renderLibrary();
        App.closeModal();
        App.updateQuickStats();
        App.toast('已添加到选题库');
    },

    delLibraryItem(i) {
        const lib = Storage.get('vlogLibrary', []);
        lib.splice(i, 1);
        Storage.set('vlogLibrary', lib);
        this.renderLibrary();
        App.updateQuickStats();
        App.toast('已删除');
    },

    copyLibraryItem(i) {
        const lib = Storage.get('vlogLibrary', []);
        const item = lib[i];
        let text = `【${item.type}】${item.title}`;
        if (item.body) text += '\n' + item.body;
        if (item.tags) text += '\n标签：' + item.tags.join(', ');
        copyToClipboard(text);
    },

    copyAll() {
        const parts = [];
        if (this._currentTopics) {
            parts.push('=== 今日爆款选题 ===');
            parts.push(this._currentTopics.map((t,i) => `${i+1}. ${t.title} - ${t.desc}`).join('\n'));
        }
        const cases = Storage.get('vlogCases', ContentLibrary.vlogCases);
        parts.push('\n=== 对标案例 ===');
        parts.push(cases.map((c,i) => `${i+1}. ${c.title} - ${c.channel}`).join('\n'));
        copyToClipboard(parts.join('\n'));
    }
};

/* ---------- 启动 ---------- */
document.addEventListener('DOMContentLoaded', () => App.init());
