/* ========================================
   预生成内容素材库
   雅思阅读/听力/写作/口语 + 自媒体选题/案例
   ======================================== */

const ContentLibrary = {

    /* ========== 雅思阅读素材 ========== */
    readings: [
        {
            title: "The Rise of Remote Work Culture",
            source: "Adapted from IELTS Practice",
            level: "Band 7+",
            text: `The concept of remote work has undergone a dramatic transformation over the past decade. Once considered a rare perk offered by progressive companies, telecommuting has become a mainstream practice that reshapes how we think about productivity, collaboration, and work-life balance.

The catalyst for this shift was multifaceted. Technological advancements in cloud computing, video conferencing, and project management tools made it feasible for teams to collaborate seamlessly across different time zones and geographical boundaries. Meanwhile, changing attitudes toward workplace flexibility, particularly among younger generations, created a cultural demand for alternative work arrangements.

Research indicates that remote workers often report higher levels of job satisfaction and productivity. Without the daily commute and office distractions, many employees find they can focus more deeply on complex tasks. However, this model is not without its challenges. Feelings of isolation, blurred boundaries between work and personal life, and the difficulty of maintaining team cohesion are commonly cited concerns.

Companies adopting hybrid approaches—combining remote and in-office days—appear to be finding a middle ground. This model preserves the benefits of flexibility while maintaining opportunities for spontaneous collaboration and social connection. As organizations continue to experiment with these arrangements, the future of work is likely to be characterized by greater adaptability and personalization.`,
            vocab: [
                { word: "telecommuting", meaning: "远程办公" },
                { word: "multifaceted", meaning: "多层面的" },
                { word: "seamlessly", meaning: "无缝地" },
                { word: "cohesion", meaning: "凝聚力" },
                { word: "spontaneous", meaning: "自发的" }
            ]
        },
        {
            title: "Urban Green Spaces and Public Health",
            source: "Adapted from Environmental Science Review",
            level: "Band 7+",
            text: `Urban green spaces—parks, gardens, greenways, and urban forests—are increasingly recognized as essential components of healthy city planning. Far from being mere aesthetic additions, these spaces provide measurable benefits to physical and mental well-being.

Studies conducted across major cities worldwide have demonstrated that access to green spaces correlates with reduced stress levels, lower blood pressure, and decreased rates of anxiety and depression. The mechanisms are both psychological and physiological. Natural environments encourage physical activity, provide spaces for social interaction, and expose urban dwellers to beneficial microbiomes present in soil and vegetation.

Moreover, urban greenery plays a critical environmental role. Trees absorb carbon dioxide, filter air pollutants, and reduce the urban heat island effect—a phenomenon where cities experience significantly higher temperatures than surrounding rural areas. Green roofs and vertical gardens can lower building energy consumption by providing natural insulation.

However, the distribution of green spaces often reflects existing socioeconomic inequalities. Neighborhoods with lower average incomes tend to have less access to quality parks and recreational areas. Addressing this disparity requires deliberate policy interventions, including equitable investment in green infrastructure and community-led urban planning initiatives.`,
            vocab: [
                { word: "aesthetic", meaning: "审美的" },
                { word: "correlates", meaning: "相关联" },
                { word: "microbiomes", meaning: "微生物群落" },
                { word: "disparity", meaning: "差距，不平等" },
                { word: "equitable", meaning: "公平的" }
            ]
        },
        {
            title: "The Psychology of Habit Formation",
            source: "Adapted from Behavioral Science Today",
            level: "Band 7+",
            text: `Understanding how habits form and persist is one of the most practically useful insights from behavioral psychology. Research suggests that approximately 40% of our daily actions are not conscious decisions but habits—automatic behavioral patterns triggered by contextual cues.

The habit loop, a framework developed through decades of research, consists of three components: a cue (trigger), a routine (the behavior itself), and a reward (the positive outcome that reinforces the behavior). This cycle, when repeated consistently, creates neural pathways that make the behavior increasingly automatic over time.

The time required to form a new habit has been widely debated. While the popular claim of "21 days" persists, research by Dr. Phillippa Lally at University College London found that the actual range is much wider—from 18 to 254 days, with an average of 66 days. The variation depends on the complexity of the behavior, individual differences, and the consistency of practice.

Importantly, habits are not erased but replaced. This means that breaking an unwanted habit is most effectively achieved by identifying the cue and reward, then substituting the routine with a healthier alternative. This approach, known as habit substitution, has been successfully applied in areas ranging from smoking cessation to digital addiction treatment.`,
            vocab: [
                { word: "automatic", meaning: "自动的" },
                { word: "cue", meaning: "暗示，触发点" },
                { word: "reinforces", meaning: "强化" },
                { word: "cessation", meaning: "停止，戒除" },
                { word: "substitution", meaning: "替代" }
            ]
        }
    ],

    /* ========== 雅思听力素材（流媒体+外部资源） ========== */
    listenings: [
        {
            title: "CRI 英语环球广播 (24小时直播)",
            context: "中国国际广播电台英语频道，24小时不间断英语广播，涵盖新闻、访谈、文化节目，大陆可直接收听",
            audioUrl: "https://sk.cri.cn/am846.m3u8",
            audioType: "hls",
            audioSource: "CRI English (AM846) 直播",
            audioPage: "https://radio.cgtn.com/",
            level: "All Levels",
            transcript: `CRI English (China Radio International) 是中国国际广播电台的24小时英语广播频道。

频道内容涵盖：
• 整点新闻 (Hourly News) - 每小时5分钟英语新闻
• The Beijing Hour - 每日1小时深度新闻节目
• Round Table - 热点话题讨论
• The Heat - 国际热点辩论
• World Insight - 国际事务深度分析
• The Bridge - 中西文化对话
• Takeaway Chinese - 中文教学节目（英语讲解）

收听建议：
• 泛听：每天通勤或休息时作为背景音，适应英语语速
• 精听：选一段5分钟新闻，逐句听写，对照官网文字稿
• 跟读：模仿播音员语音语调，提升口语

注意：这是直播流，内容实时更新，每次打开都有新内容！`,
            questions: [
                "Listen to the hourly news and write down the top 3 stories.",
                "Choose a talk show segment and summarize the main argument.",
                "Note 5 new vocabulary words or expressions you heard.",
                "What cultural differences are highlighted in today's programming?",
                "Practice shadowing: repeat after the speaker for 2 minutes."
            ]
        },
        {
            title: "CGTN Radio - 精选节目 (可点播)",
            context: "CGTN Radio 提供大量点播节目，含新闻、文化、科技、商业等主题，每集10-60分钟，大陆可直接访问",
            audioUrl: null,
            audioType: "external",
            audioSource: "CGTN Radio 点播节目",
            audioPage: "https://radio.cgtn.com/",
            level: "Band 6+",
            transcript: `CGTN Radio (China Global Television Network Radio) 提供丰富的英语点播节目：

热门节目推荐：
• The Beijing Hour - 每日新闻深度报道 (60分钟)
• Round Table - 中国社会热点讨论 (55分钟)
• The Heat - 国际热点辩论 (26分钟)
• World Insight with Tian Wei - 国际事务分析 (26分钟)
• The Bridge - 中西文化对话 (55分钟)
• China Popcast - 中国流行文化 (45分钟)
• Headline News - 每日头条新闻 (5分钟)

使用方法：
1. 访问 radio.cgtn.com
2. 浏览 NEW EPISODES 或按分类浏览
3. 点击 LISTEN 按钮即可在线收听
4. 部分节目提供 DOWNLOAD 可下载

优势：内容丰富、更新频繁、完全免费、大陆可直接访问`,
            questions: [
                "Choose one episode from 'The Beijing Hour' and summarize the main news stories.",
                "Listen to a 'Round Table' episode and note the different viewpoints discussed.",
                "Pick a 'World Insight' episode and write down key international affairs discussed.",
                "How does CGTN's coverage differ from Western media on the same topic?",
                "Note 10 useful expressions or phrases from the episode."
            ]
        },
        {
            title: "可可英语 - VOA慢速英语 (每日更新)",
            context: "可可英语网站提供VOA慢速英语每日更新，语速适中(约60-70%常速)，适合雅思听力基础训练，大陆可直接访问",
            audioUrl: null,
            audioType: "external",
            audioSource: "可可英语 VOA慢速英语",
            audioPage: "https://www.kekenet.com/broadcast/voaspecial/",
            level: "Band 5-6",
            transcript: `可可英语 (kekenet.com) 是国内最受欢迎的免费英语学习网站之一。

VOA慢速英语栏目特点：
• 每日更新，内容涵盖新闻、科技、健康、教育等
• 语速约为常速英语的60-70%，适合精听训练
• 每篇配有中英双语文本和重点词汇
• 支持在线播放和MP3下载

使用方法：
1. 访问 kekenet.com/broadcast/voaspecial/
2. 选择当天或近期的文章
3. 先盲听2-3遍，尝试抓大意
4. 查看文本，标记生词和不懂的句子
5. 再听一遍，确认理解
6. 跟读模仿语音语调

其他推荐栏目：
• VOA常速英语 - 进阶听力训练
• BBC精选 - 英式英语听力
• 听力微练习 - 每日短篇精听
• 新概念英语 - 系统化听力训练`,
            questions: [
                "Listen to today's VOA Special English and write a 3-sentence summary.",
                "Find and define 5 new vocabulary words from the article.",
                "What is the main news topic of today's broadcast?",
                "Practice reading the transcript aloud, matching the speaker's pace.",
                "Write your opinion on the topic discussed (100 words)."
            ]
        },
        {
            title: "听力课堂 - 多主题英语听力 (海量资源)",
            context: "听力课堂(tingclass.net)提供海量英语听力MP3资源，含雅思托福真题、新概念、VOA、BBC等，大陆可直接访问",
            audioUrl: null,
            audioType: "external",
            audioSource: "听力课堂 tingclass.net",
            audioPage: "https://www.tingclass.net/",
            level: "All Levels",
            transcript: `听力课堂 (tingclass.net) 是国内受欢迎的开放式英语学习网站，提供海量听力资源。

资源分类：
• 雅思听力真题 - 剑桥雅思1-18全套听力MP3+文本
• 托福听力 - TPO真题听力训练
• VOA英语 - 慢速/常速，每日更新
• BBC英语学习 - 6 Minute English等经典节目
• 新概念英语 - 第一至四册完整音频+文本
• 英语有声书 - 经典文学名著有声版
• 商务英语 - BEC考试听力训练
• 英语演讲 - TED演讲音频版

使用方法：
1. 访问 tingclass.net
2. 按分类或搜索找到所需材料
3. 在线播放或下载MP3
4. 配合文本进行精听训练

优势：资源量大、分类清晰、完全免费、大陆可直接访问`,
            questions: [
                "Browse the IELTS section and complete one full listening test.",
                "Choose a 6 Minute English episode and answer the comprehension questions.",
                "Listen to a TED talk (audio) and write a summary.",
                "Find a New Concept English lesson and complete the exercises.",
                "Compare VOA and BBC listening materials - which do you prefer and why?"
            ]
        },
        {
            title: "喜马拉雅 - 高效磨耳朵 (英语播客)",
            context: "喜马拉雅平台英语听力播客，每周一三五日更新，含单词造句、句子反复、英文名著分级阅读等，大陆可直接收听",
            audioUrl: null,
            audioType: "external",
            audioSource: "喜马拉雅 - 高效磨耳朵",
            audioPage: "https://www.ximalaya.com/album/46602128",
            level: "Band 4-7",
            transcript: `喜马拉雅「高效磨耳朵」是一档英语听力训练播客，已更新超过1200期。

节目安排：
• 周一：单词造句磨耳朵 - 10个单词，每个2-5个句子
• 周三：句子反复磨耳朵 - 10个经典句子，适合练语感
• 周五：英文名著分级阅读 - 精选经典名著，配以精彩演播
• 周日：Level 4短文 - 各类话题短文，适合进阶

另一推荐播客：「英语每日一听」
• 每天早上8点更新
• 每天一篇BBC/VOA等听力节目
• 英文字幕，简介附带中文翻译
• 链接：ximalaya.com/album/14812466

使用方法：
1. 下载喜马拉雅APP或在网页端收听
2. 搜索「高效磨耳朵」或「英语每日一听」
3. 按日期选择最新一期
4. 支持倍速播放、定时关闭
5. 适合通勤、睡前泛听`,
            questions: [
                "Listen to this week's Monday episode and write down all 10 words.",
                "Choose a Friday episode and summarize the story in English.",
                "Practice repeating each sentence after the speaker (shadowing).",
                "Note 3 expressions you want to use in your own speaking.",
                "Write a short paragraph using 5 words from today's episode."
            ]
        },
        {
            title: "BBC 6 Minute English (经典雅思听力训练)",
            context: "BBC 6 Minute English是经典英语学习节目，每集6分钟，话题有趣、语速适中、配文本，适合雅思听力Section 3/4训练。通过可可英语等国内平台可直接收听",
            audioUrl: null,
            audioType: "external",
            audioSource: "可可英语 - BBC 6 Minute English",
            audioPage: "https://www.kekenet.com/broadcast/bbc6/",
            level: "Band 6-7",
            transcript: `BBC 6 Minute English 是英国广播公司(BBC)制作的经典英语学习节目。

节目特点：
• 每集约6分钟，两个主持人对话
• 话题涵盖科技、文化、社会、心理学等
• 语速适中，适合雅思听力训练
• 每集配有重点词汇讲解
• 中英双语文本可在线查看

在可可英语收听方法：
1. 访问 kekenet.com/broadcast/bbc6/
2. 选择最新或任意一期
3. 点击播放按钮在线收听
4. 查看下方双语文本和词汇表
5. 支持逐句复读和语速调节

训练建议（精听四步法）：
Step 1: 盲听2遍 - 不看文本，尝试理解大意
Step 2: 听写 - 逐句听写，记录关键词
Step 3: 对照文本 - 标记未听出的部分
Step 4: 跟读 - 模仿语音语调，跟读3遍

其他BBC节目推荐：
• BBC News Report - 新闻听力
• BBC English at Work - 职场英语
• BBC The English We Speak - 地道表达`,
            questions: [
                "Listen to one episode without text and write down the main topic.",
                "What new vocabulary words did you learn? Define each.",
                "Summarize the episode in 3-4 sentences using your own words.",
                "Which part was most difficult to understand? Why?",
                "Write a response to the topic discussed (150 words)."
            ]
        }
    ],

    /* ========== 雅思写作范文 ========== */
    essays: [
        {
            type: "Task 2 - Opinion Essay",
            topic: "Some people believe that universities should focus on providing academic skills, while others think they should prepare students for their future careers. Discuss both views and give your opinion.",
            title: "Balancing Academic Excellence and Career Preparation",
            text: `The role of universities in modern society has been a subject of ongoing debate. While some argue that higher education should prioritize academic knowledge, others contend that universities must equip students with practical career skills. In my view, these objectives are not mutually exclusive, and the most effective educational institutions successfully integrate both.

On the one hand, proponents of academic focus argue that universities are fundamentally centers of learning and research. By concentrating on theoretical knowledge, students develop critical thinking, analytical abilities, and a deep understanding of their chosen fields. These intellectual foundations are valuable not only in academia but also in navigating complex real-world problems. Furthermore, many breakthrough innovations have originated from pure research that had no immediate practical application.

On the other hand, advocates of career-oriented education point to the realities of the modern job market. With increasing competition and rapidly evolving industry requirements, graduates need practical skills that make them employable. Programs that include internships, industry collaborations, and professional certifications can significantly enhance graduates' career prospects. This approach also addresses the concerns of students who invest considerable time and financial resources in their education with the expectation of tangible returns.

In my opinion, the dichotomy between these two perspectives is a false one. The most successful universities already demonstrate that academic rigor and career preparation can coexist. For instance, a computer science curriculum can teach both theoretical algorithms and practical programming skills. Similarly, a literature program can develop critical analysis while also fostering communication abilities valued in numerous professions.

In conclusion, universities should strive to deliver a holistic educational experience that combines intellectual depth with practical relevance. By doing so, they fulfill their dual responsibility to advance knowledge and serve society by producing well-rounded graduates capable of both intellectual contribution and professional success.`,
            analysis: "本文采用经典的四段式结构：引言+双面讨论+个人观点+结论。论证使用举例论证（计算机科学、文学课程）增强说服力。词汇多样性和句型变化较为丰富，适合 Band 7+ 参考。"
        },
        {
            type: "Task 2 - Discussion Essay",
            topic: "In many countries, the amount of crime is increasing. What do you think are the main causes of crime? How can we deal with those causes?",
            title: "Addressing the Root Causes of Rising Crime",
            text: `The upward trend in crime rates observed in numerous countries has become a pressing concern for governments and communities alike. This essay will examine the primary factors contributing to this phenomenon and propose potential solutions.

Several interconnected factors appear to drive the increase in criminal activity. Economic inequality stands out as a fundamental cause. When wealth disparity widens, individuals in lower socioeconomic brackets may turn to crime as a means of survival or out of frustration with perceived injustice. Additionally, unemployment—particularly among young adults—creates conditions where illegal activities become financially attractive alternatives.

Social factors also play a significant role. The breakdown of family structures, lack of positive role models, and insufficient community support systems can lead young people toward criminal behavior. Furthermore, the proliferation of digital technology has created new avenues for crime, including cybercrime, identity theft, and online fraud, which traditional law enforcement frameworks are often ill-equipped to address.

To effectively combat these root causes, a multi-faceted approach is necessary. Governments should prioritize economic policies that reduce inequality, including progressive taxation, accessible education, and vocational training programs. Investment in early childhood education and family support services can address social determinants of crime before they manifest.

Community-based initiatives have also demonstrated effectiveness. Programs that provide mentorship, after-school activities, and skill development for at-risk youth have been shown to reduce recidivism rates. For digital crimes, international cooperation and updated legal frameworks are essential.

In conclusion, while rising crime rates present a complex challenge, addressing the underlying economic and social causes through comprehensive policy measures offers the most sustainable path toward safer societies.`,
            analysis: "本文采用 Problem-Solution 结构。每段聚焦一个核心论点，使用因果论证和举例论证相结合。词汇如 proliferation、recidivism、determinants 体现学术写作能力。适合 Band 7+ 参考。"
        }
    ],

    /* ========== 雅思口语话题 ========== */
    speakingTopics: [
        {
            part: "Part 1",
            topic: "Hometown",
            questions: [
                "Where is your hometown?",
                "What do you like most about your hometown?",
                "Is there anything you dislike about your hometown?",
                "Has your hometown changed much since you were a child?"
            ],
            tips: [
                "回答时给出2-3句话，不要太短也不要太长",
                "使用具体例子来支撑你的观点",
                "自然地展示词汇多样性，但不要生硬",
                "保持轻松的对话语气"
            ],
            vocab: ["coastal city", "rapid development", "close-knit community", "cultural heritage", "vibrant atmosphere"]
        },
        {
            part: "Part 2",
            topic: "Describe a time when you learned a new skill",
            questions: [
                "What the skill was",
                "Why you wanted to learn it",
                "How you learned it",
                "How you felt about the experience"
            ],
            tips: [
                "用1分钟准备时间列出关键词",
                "按时间顺序组织回答，有清晰的开头、中间和结尾",
                "使用过去时态描述经历",
                "加入感受和反思使回答更有深度",
                "目标是持续说话1.5-2分钟"
            ],
            vocab: ["steep learning curve", "out of my comfort zone", "step by step", "sense of achievement", "perseverance"]
        },
        {
            part: "Part 3",
            topic: "Learning and Education",
            questions: [
                "Do you think learning new skills is important at all ages? Why?",
                "How has technology changed the way people learn?",
                "What role should governments play in promoting lifelong learning?",
                "Do you believe practical skills or theoretical knowledge is more important?"
            ],
            tips: [
                "Part 3 需要更抽象、更有深度的回答",
                "展示你能够从多角度分析问题",
                "使用 It depends... / From my perspective... / I would argue that... 等句式",
                "适当使用让步和对比结构"
            ],
            vocab: ["cognitive decline", "adaptability", "democratization of education", "complementary", "pragmatic"]
        }
    ],

    /* ========== 雅思训练计划 ========== */
    studyPlan: [
        {
            skill: "Listening 听力",
            icon: "🎧",
            color: "var(--accent-purple)",
            plan: [
                "每日精听1篇剑桥真题Section 3/4（30分钟）",
                "泛听BBC News / TED Talks（15分钟）",
                "每周完成2套完整听力模考",
                "建立错题本，分析错误原因并复盘",
                "练习速记技巧，提升信息捕捉效率"
            ]
        },
        {
            skill: "Reading 阅读",
            icon: "📖",
            color: "var(--accent-blue)",
            plan: [
                "每日限时完成1篇剑桥真题阅读（20分钟）",
                "精读1篇外刊文章（经济学人/卫报）",
                "积累学术词汇，每日20个新词",
                "练习略读和扫读技巧",
                "分析文章结构和论证逻辑"
            ]
        },
        {
            skill: "Writing 写作",
            icon: "✍",
            color: "var(--accent-teal)",
            plan: [
                "每周完成2篇Task 1 + 2篇Task 2",
                "背诵高分句型和连接词",
                "研究考官范文，分析评分标准",
                "建立写作模板库（开头段、结尾段）",
                "找人批改，重点关注逻辑和语法"
            ]
        },
        {
            skill: "Speaking 口语",
            icon: "🎤",
            color: "var(--accent-amber)",
            plan: [
                "每日口语练习30分钟（自录音复盘）",
                "每周与语伴模拟考试1次",
                "准备Part 2话题卡片（50个）",
                "练习常用表达和话题展开",
                "关注发音、语调和流利度"
            ]
        }
    ],

    /* ========== 精听训练方案 ========== */
    listeningPlan: [
        { step: "第一遍盲听", desc: "不看文本，完整听一遍音频，抓住大意和关键词，记录能听懂的比例" },
        { step: "第二遍精听", desc: "逐句暂停，尝试写下听到的每个词，重点关注连读、弱读和不熟悉的词汇" },
        { step: "对照原文", desc: "对比自己的听写和原文，标记遗漏和错误，分析原因（词汇量/连读/语速）" },
        { step: "第三遍跟读", desc: "看着原文跟读音频，模仿语音语调和节奏，训练口腔肌肉记忆" },
        { step: "第四遍盲听", desc: "不看文本再听一遍，确认之前听不懂的地方现在能听懂，感受进步" },
        { step: "复盘总结", desc: "整理生词、短语和表达，记录到笔记本，定期复习巩固" }
    ],

    /* ========== 自媒体爆款选题（高转化、易变现赛道） ========== */
    vlogTopics: [
        { title: "月入3万的美妆博主好物分享｜这些平价护肤品真的香", desc: "拍一支'好物分享'视频，展示5-8件单价50-200元的护肤品，每件都给出使用感受+成分分析+购买链接。极易插入品牌合作和带货链接，转化率极高", tags: ["美妆护肤", "好物分享", "带货变现", "高转化"] },
        { title: "2025最值得买的5款千元机｜同价位碾压旗舰", desc: "数码测评赛道天花板选题，对比5款1000-2000元手机，跑分+实拍+续航测试。天然适合插入京东/淘宝联盟链接，单条佣金可达数千", tags: ["数码测评", "手机对比", "带货佣金", "高客单价"] },
        { title: "人均50吃出米其林体验｜本地人私藏餐厅清单", desc: "探店3-5家高性价比餐厅，每家拍摄菜品+环境+价格。极易接入大众点评/美团本地生活推广，餐饮商家主动找你合作", tags: ["美食探店", "本地生活", "商家合作", "广告植入"] },
        { title: "30天减脂10斤｜我的饮食+运动完整方案", desc: "记录30天减脂全过程，每天更新饮食和运动。可插入代餐产品、健身器材、运动APP广告，健身赛道用户付费意愿极强", tags: ["健身减脂", "打卡记录", "产品植入", "高复购"] },
        { title: "月薪5000如何理财｜普通人也能做到的被动收入", desc: "理财知识科普类内容，分享基金定投、可转债打新、指数基金等低门槛理财方法。金融产品CPA/CPS佣金极高，单次点击价值大", tags: ["理财知识", "金融变现", "高客单价", "知识付费"] },
        { title: "下班后2小时做副业｜月增收5000的方法合集", desc: "分享3-5个可操作的副业方法（自媒体、电商、技能变现），每个给出具体步骤和收入截图。适合推广知识付费课程和工具类产品", tags: ["副业赚钱", "知识付费", "课程推广", "高转化"] },
        { title: "100元以内提升幸福感的家居好物｜租房党必看", desc: "推荐8-10件百元内家居好物（收纳、氛围灯、桌面配件），每件给出购买链接。家居类商品退货率低，带货佣金稳定", tags: ["家居好物", "百元好物", "带货链接", "低退货率"] },
        { title: "微胖女孩穿搭指南｜这样穿显瘦10斤", desc: "穿搭赛道长青选题，展示3-5套显瘦搭配方案，每套标注单品链接。服装类带货佣金高，且用户复购率极高", tags: ["穿搭时尚", "显瘦搭配", "服装带货", "高复购率"] },
        { title: "新手妈妈待产包清单｜只买对的不买贵的", desc: "母婴赛道超高转化选题，列出15-20件待产必备品，标注价格和购买渠道。母婴产品客单价高、复购周期长，品牌方投放预算充足", tags: ["母婴育儿", "待产包", "品牌合作", "高客单价"] },
        { title: "周末两天一夜｜人均300玩转周边游攻略", desc: "旅行攻略类内容，完整记录交通+住宿+美食+景点，给出总花费。适合接入携程/飞猪/酒店预订广告，旅行类CPA佣金可观", tags: ["旅行攻略", "周边游", "OTA广告", "CPA变现"] },
        { title: "10分钟搞定的工作日快手早餐｜打工人必备", desc: "美食教程类内容，展示3-5款快手早餐做法。天然适合插入厨具、食材、小家电带货链接，厨房用品转化率极高", tags: ["美食教程", "快手早餐", "厨具带货", "高转化"] },
        { title: "自学编程转行｜从零到月薪2万的完整路线", desc: "知识付费赛道顶级选题，分享完整学习路径+资源+时间线。适合推广编程课程（客单价500-5000元），知识付费佣金比例高", tags: ["技能提升", "编程转行", "课程推广", "高客单价"] },
        { title: "拼多多10件好物开箱｜真的有被惊艳到", desc: "开箱测评类内容，购买10件拼多多低价好物逐个开箱测评。反差感强易爆款，每件都可挂购物链接，走量变现", tags: ["开箱测评", "低价好物", "走量变现", "爆款选题"] },
        { title: "极简生活一年｜我只保留了这20件物品", desc: "生活方式类内容，展示极简生活理念+物品清单。适合推广收纳用品、品质生活品牌，品牌调性契合度高", tags: ["极简生活", "生活方式", "品牌合作", "调性契合"] },
        { title: "新手养猫全攻略｜第一次养猫不踩坑指南", desc: "宠物赛道高转化选题，列出养猫必备品+注意事项+省钱攻略。宠物用品复购率极高（猫粮/猫砂/玩具），适合长期带货变现", tags: ["宠物养猫", "新手攻略", "高频复购", "长期变现"] }
    ],

    /* ========== 自媒体对标案例（高变现赛道拆解） ========== */
    vlogCases: [
        {
            title: "平价美妆好物分享｜月入5万的种草密码",
            channel: "某百万粉美妆博主",
            platform: "小红书 + 抖音",
            fans: "120万",
            views: "单条平均10-50万播放",
            analysis: `美妆好物分享是自媒体变现效率最高的赛道之一。该博主以"平价护肤品测评"为核心定位，每月通过带货佣金+品牌合作月入5万+。

【人设拆解】
• 标签：平价美妆达人 / 成分党 / 学生党友好
• 人设核心：只推荐自己用过的平价好物，建立信任感
• 视觉风格：干净的白色背景+产品特写+手写标注价格
• 语言风格：闺蜜推荐口吻+专业成分分析+真实使用感受

【变现模式拆解】
1. 带货佣金（占收入60%）：每条视频挂5-8个商品链接，佣金率10-30%
2. 品牌合作（占收入30%）：国货美妆品牌主动合作，单条报价5000-20000元
3. 知识付费（占收入10%）：推出"美妆博主入门课"，客单价299元

【爆款密码】
• 信任感第一：所有产品都真人出镜试用，不接没用的广告
• 价格锚定：每件产品都标注价格，"XX元就能买到这个效果"
• 对比反差：用大牌平替制造话题，"300元VS30元面霜对比"
• 系列化运营：打造"平价好物"系列IP，用户追更粘性强

【可借鉴框架】
• 选题公式：[平价好物] + [具体场景] + [价格锚定]
• 内容节奏：前3秒展示效果→中间拆解成分→结尾给出购买建议
• 变现路径：短视频种草→商品链接转化→品牌合作升级
• 信任建设：只推荐真用过的产品，建立"不恰烂钱"人设`,
            framework: [
                "开头效果展示（0-3秒）：用before/after对比吸引注意力",
                "产品逐一介绍（3秒-2分）：每件产品展示+成分分析+使用感受+价格",
                "对比反差（穿插）：用大牌平替对比制造话题",
                "购买建议（结尾）：按预算/肤质给出推荐清单",
                "互动引导：评论区问'你的肤质是什么？我帮你推荐'"
            ]
        },
        {
            title: "数码测评赛道｜单条视频佣金破万的秘密",
            channel: "某知名数码测评博主",
            platform: "B站 + 抖音",
            fans: "80万",
            views: "单条平均20-100万播放",
            analysis: `数码测评是自媒体高客单价赛道的天花板。该博主专注千元级数码产品测评，通过京东/淘宝联盟带货，单条视频佣金可达1-3万元。

【人设拆解】
• 标签：客观测评人 / 性价比猎手 / 数码极客
• 人设核心：不收钱测评，只说真话，建立极致信任感
• 视觉风格：桌面拍摄+多角度特写+跑分数据图表
• 语言风格：数据说话+优缺点并列+购买建议明确

【变现模式拆解】
1. 联盟佣金（占收入70%）：京东/淘宝联盟链接，手机类佣金3-5%，客单价1000-3000元
2. 品牌商单（占收入20%）：手机配件/数码品牌合作，单条5000-30000元
3. 内容付费（占收入10%）：深度测评文章付费阅读

【爆款密码】
• 选题精准：只测热门新品/爆款，蹭流量热度
• 对比驱动：同价位5款横向对比，用户决策刚需
• 数据可视化：跑分/续航/拍照样张全部量化对比
• 结论明确：直接给"买/不买"建议，降低决策成本

【可借鉴框架】
• 选题公式：[热门品类] + [价位段] + [横向对比]
• 内容结构：开头结论→中间详细测评→结尾购买建议
• 变现路径：测评视频→联盟链接→品牌商单
• 数据驱动：所有结论都用数据支撑，建立专业感`,
            framework: [
                "开头亮结论（0-5秒）：直接给出排名/推荐，制造悬念",
                "逐个测评（5秒-5分）：外观→性能→续航→拍照→优缺点",
                "横向对比（穿插）：跑分/价格/体验对比图表",
                "购买建议（结尾）：按预算/需求给出明确推荐",
                "链接引导：评论区/简介放购买链接"
            ]
        },
        {
            title: "美食探店｜本地生活变现的王炸赛道",
            channel: "某城市美食探店博主",
            platform: "抖音 + 大众点评",
            fans: "50万",
            views: "单条平均5-30万播放",
            analysis: `美食探店是本地生活变现效率最高的赛道。该博主专注一个城市的平价美食探店，通过大众点评/美团/抖音本地生活推广，月入2-5万。

【人设拆解】
• 标签：本地美食达人 / 人均50专家 / 隐藏餐厅猎人
• 人设核心：只探本地人私藏的好店，不做旅游博主式打卡
• 视觉风格：手持拍摄+菜品特写+价格标注+环境实拍
• 语言风格：接地气+真实评价+有态度的推荐/避雷

【变现模式拆解】
1. 本地生活佣金（占收入50%）：抖音/美团团购链接，每单佣金5-15元
2. 商家合作（占收入40%）：餐厅主动合作推广，单条1000-5000元
3. 平台激励（占收入10%）：抖音本地生活创作者奖励

【爆款密码】
• 地域精准：只做一个城市，本地流量精准度极高
• 价格驱动：主打人均30-80元，决策门槛低，转化率高
• 真实评价：优缺点都说，不全是好评，建立可信度
• 避雷内容：偶尔做"避雷"视频，反差感强易出圈

【可借鉴框架】
• 选题公式：[城市] + [价位段] + [美食类型] + 隐藏/必吃
• 内容结构：门口→环境→菜品逐一品尝→价格总结→推荐指数
• 变现路径：探店视频→团购链接→商家合作
• 本地优势：深耕一个城市，建立本地美食权威人设`,
            framework: [
                "开头钩子（0-3秒）：展示最诱人的菜品特写+人均价格",
                "环境展示（3-15秒）：快速展示餐厅环境和服务",
                "菜品逐一品鉴（15秒-2分）：每道菜特写+口感+评价+价格",
                "总结推荐（结尾）：推荐指数+适合人群+人均消费",
                "团购引导：评论区放团购链接/优惠券"
            ]
        },
        {
            title: "理财知识科普｜金融赛道高客单价变现",
            channel: "某理财知识博主",
            platform: "抖音 + 公众号",
            fans: "30万",
            views: "单条平均3-20万播放",
            analysis: `理财知识是自媒体客单价最高的赛道之一。该博主以"普通人理财入门"为核心定位，通过金融产品推广和知识付费月入3-8万。

【人设拆解】
• 标签：理财规划师 / 普通人理财教练 / 基金定投达人
• 人设核心：把复杂金融知识讲给小白听，降低理解门槛
• 视觉风格：白板/手绘+数据图表+真实收益截图
• 语言风格：通俗易懂+数据支撑+操作性强

【变现模式拆解】
1. 金融产品推广（占收入60%）：基金开户/券商开户CPA，单次30-200元
2. 知识付费（占收入30%）：理财入门课，客单价199-999元
3. 咨询服务（占收入10%）：1对1理财规划咨询，客单价500-2000元

【爆款密码】
• 痛点选题：直击普通人焦虑，"月薪5000怎么理财"
• 数字冲击：用具体收益数字说话，"定投3年赚了XX"
• 操作性强：每条视频都给出可操作的步骤
• 合规意识：声明不构成投资建议，降低法律风险

【可借鉴框架】
• 选题公式：[人群] + [理财痛点] + [解决方案]
• 内容结构：痛点引入→方法讲解→案例展示→操作步骤
• 变现路径：短视频引流→课程转化→金融产品推广
• 信任建设：展示真实收益，声明风险，建立专业可信度`,
            framework: [
                "痛点引入（0-5秒）：用数字或场景制造焦虑",
                "方法讲解（5秒-2分）：通俗解释理财方法+案例",
                "操作步骤（2分-结尾）：给出具体可操作的步骤",
                "风险提示：声明不构成投资建议",
                "引流转化：引导关注公众号/课程链接"
            ]
        }
    ],

    /* ========== 脚本框架模板（自媒体通用） ========== */
    scriptTemplates: [
        {
            section: "开头钩子 (0-5秒)",
            content: "用强烈的画面或数据抓住注意力。可以是：\n• 效果对比：「用了这个一个月后...」\n• 数字冲击：「月入3万的副业方法」\n• 视觉冲击：产品开箱瞬间/使用效果对比/价格标牌特写"
        },
        {
            section: "自我介绍+主题 (5-15秒)",
            content: "简短自我介绍（10秒内），然后引出本期主题。格式：\n「我是XX，专注XX领域。今天给大家分享/测评/探店...」\n保持简洁，不要长篇自我介绍"
        },
        {
            section: "主体内容 (15秒-结束前30秒)",
            content: "按产品/场景/步骤展开：\n• 产品1：展示+使用感受+优缺点+价格\n• 产品2：对比+推荐理由+适合人群\n• 产品3：亮点+使用场景+购买建议\n• 每个产品之间用过渡画面或金句连接"
        },
        {
            section: "价值升华 (结束前30秒)",
            content: "总结这期内容的核心价值：\n• 给出明确的购买/行动建议\n• 按预算/需求分类推荐\n• 分享个人使用心得或踩坑经验"
        },
        {
            section: "结尾引导 (最后10秒)",
            content: "引导互动和转化：\n• 「你觉得怎么样？评论区告诉我」\n• 「购买链接在评论区/简介」\n• 「点赞收藏，下次购物不踩坑」"
        }
    ],

    /* ========== 文案初稿模板（自媒体通用） ========== */
    draftTemplates: {
        titles: [
            "月入3万的美妆好物分享｜这些平价护肤品真的香",
            "2025最值得买的5款千元机｜同价位碾压旗舰",
            "人均50吃出米其林体验｜本地人私藏餐厅清单",
            "30天减脂10斤｜我的饮食+运动完整方案",
            "月薪5000如何理财｜普通人也能做到的被动收入"
        ],
        descriptions: [
            "本期内容：{topic}\n\n只推荐自己用过的真实好物，不恰烂钱。\n每件产品都标注价格和购买渠道，按预算选择不踩坑。\n\n时间轴：\n00:00 开场\n01:30 产品一\n03:45 产品二\n06:00 总结推荐\n\n评论区聊聊：你用过哪些平价好物？",
            "这期带你沉浸式体验{topic}\n\n真实测评，优缺点都说，给你最实在的购买建议。\n从开箱到使用再到总结，一步不落。\n\n购买链接在评论区/简介\n\n收藏不迷路，关注看更多好物推荐！"
        ],
        tags: ["好物推荐", "测评分享", "带货变现", "平价好物", "购买指南", "避坑攻略", "高性价比", "真实测评", "购物清单", "省钱攻略"]
    },

    /* ========== 市场指数（2026-08-04 A股盘中 + 8.3 美股收盘） ========== */
                                                                                                                                                                        marketIndices: [
        { name: "上证指数", code: "SH000001", value: "3927.18", change: "+0.01%", market: "A股", updateTime: "2026-08-15 实时" },
        { name: "深证成指", code: "SZ399001", value: "14354.31", change: "+0.45%", market: "A股", updateTime: "2026-08-15 实时" },
        { name: "创业板指", code: "SZ399006", value: "3626.30", change: "+1.12%", market: "A股", updateTime: "2026-08-15 实时" },
        { name: "沪深300", code: "SH000300", value: "4665.88", change: "+0.04%", market: "A股", updateTime: "2026-08-15 实时" },
        { name: "科创50", code: "SH000688", value: "1717.68", change: "+-0.00%", market: "A股", updateTime: "2026-08-15 实时" },
        { name: "标普500", code: "SPX", value: "7,785.76", change: "+0.36%", market: "美股", updateTime: "2026-08-15 收盘" },
        { name: "纳斯达克", code: "IXIC", value: "26,729.16", change: "+0.14%", market: "美股", updateTime: "2026-08-15 收盘" },
        { name: "道琼斯", code: "DJI", value: "53,732.41", change: "-0.56%", market: "美股", updateTime: "2026-08-15 收盘" },
    ],

    /* ========== 真实财经资讯（2026-08-04更新，含原文链接） ========== */
                                                                                                                                                                        marketNews: [
        {
            title: "英伟达CPO交换机全面量产：能效提升5倍，供应商包括天孚通信",
            summary: "8月14日，英伟达NVIDIA AI Infrastructure官方X账号宣布，Spectrum-X以太网硅光交换机（Ethernet Photonics）现已全面量产，为AI工厂提供下一代Scale-Out（横向扩展）网络...",
            source: "澎湃新闻",
            date: "2026-08-15",
            tag: "美股",
            url: "https://finance.sina.com.cn/jjxw/2026-08-15/doc-ininkmqs1962999.shtml"
        },
        {
            title: "中际旭创等AH股价格倒挂 国际资本重新定价硬科技核心资产",
            summary: "伴随着国际资本持续“买买买”，越来越多硬科技次新股 出现AH价格倒挂。 截至8月13日，共有7家公司H股较A股出现溢价，分别为宁德时代 、澜起科技 、招商银行 、兆易创新 ...",
            source: "21世纪经济报道",
            date: "2026-08-15",
            tag: "A股",
            url: "https://finance.sina.com.cn/roll/2026-08-15/doc-ininkmqs1961968.shtml"
        },
        {
            title: "资管机构角逐德国规模达5000亿欧元养老金历史性转型",
            summary: " 自19世纪末俾斯麦首相创立以来，德国养老金体系规模最大的改革之一即将落地，将为现代基金管理人带来规模庞大的新增可配置资金。",
            source: "环球市场播报",
            date: "2026-08-15",
            tag: "A股",
            url: "https://finance.sina.com.cn/world/2026-08-15/doc-ininkmqt8729053.shtml"
        },
        {
            title: "印度下调8月下半年运输燃料出口税",
            summary: "印度政府一份公告显示，印度下调8月中旬至月底的柴油、汽油以及航空煤油出口关税。 柴油全部消费税由每升25.5卢比下调至24卢比。",
            source: "环球市场播报",
            date: "2026-08-15",
            tag: "A股",
            url: "https://finance.sina.com.cn/world/2026-08-15/doc-ininkmqn3552915.shtml"
        },
        {
            title: "刚刚！持续拉升，空头遭“重锤”！美国经济，生变！又有油轮，遭伊朗袭击！",
            summary: "本文源自：期货日报 一起来看下重要资讯！ 加密货币主要币种持续上涨截至发稿，比特币美元指数上涨0.2%，以太坊上涨0.18%，瑞波币上涨0.74%。",
            source: "滚动播报",
            date: "2026-08-15",
            tag: "宏观",
            url: "https://finance.sina.com.cn/world/2026-08-15/doc-ininkmqs1951926.shtml"
        },
        {
            title: "于东来凌晨发文回应“胖东来再招20名刑释人员”：第一批刑释人员上岗后没有一个离开",
            summary: "8月15日凌晨，胖东来创始人于东来在社交平台发文称：好的环境、好的制度、好的文化。胖东来第一批刑释人员进入岗位以后，没有一个离开...",
            source: "新京报",
            date: "2026-08-15",
            tag: "A股",
            url: "https://finance.sina.com.cn/wm/2026-08-15/doc-ininkmqt8720843.shtml"
        },
        {
            title: "「微特稿」疑似受沙门氏菌污染 美国千万枚鸡蛋被召回",
            summary: "【新华社微特稿】法新社14日报道说，美国一家企业上月自愿召回疑似受沙门氏菌污染的上千万枚鸡蛋。美国食品和药物管理局本周将此定为“一级召回”...",
            source: "新华社",
            date: "2026-08-15",
            tag: "A股",
            url: "https://finance.sina.com.cn/world/2026-08-15/doc-ininkmqn3552498.shtml"
        },
        {
            title: "美团：已有20多个城市正评估“红灯停表”相关试点条件",
            summary: "新京报讯（记者秦胜南）美团“红灯停表”功能日前在北京试点路测。随后美团在北京举行骑手恳谈会听取骑手以及专业意见。另据美团介绍...",
            source: "新京报",
            date: "2026-08-15",
            tag: "A股",
            url: "https://finance.sina.com.cn/jjxw/2026-08-15/doc-ininkmqt8711389.shtml"
        },
    ],

    /* ========== 个股推荐（长线价值 + 超短线热门，参考同花顺/富途moomoo） ========== */
    screeningStocks: [
        // ---- 长线价值股（同花顺券商金股 + 券商研报） ----
        { name: "药明康德", code: "603259", market: "A股", industry: "医药CRDMO", strategy: "长线价值", reason: "8月3日晚全面上调全年业绩指引：收入由513-530亿上调至585-605亿，增速由18%-22%上调至35%-39%。上半年营收289亿同比+38.9%。CXO拐点信号明确，券商8月金股最受青睐", source: "同花顺·券商金股", url: "https://t.10jqka.com.cn/pid_669825086.shtml" },
        { name: "宁德时代", code: "300750", market: "A股", industry: "动力电池", strategy: "长线价值", reason: "券商8月金股最受青睐，全球动力电池市占率第一，麒麟电池量产交付，储能业务高速增长", source: "同花顺·券商金股", url: "https://stock.10jqka.com.cn/20260801/c678604467.shtml" },
        { name: "北方华创", code: "002371", market: "A股", industry: "半导体设备", strategy: "长线价值", reason: "国产半导体设备龙头，受益于晶圆厂扩产周期和国产替代加速。半导体板块8月3日大幅回调后超跌反弹预期强", source: "券商月度金股", url: "https://stock.10jqka.com.cn/20260801/c678604467.shtml" },
        { name: "中微公司", code: "688012", market: "A股", industry: "半导体设备", strategy: "长线价值", reason: "8月3日晚半年报：上半年净利润27-29亿，同比增长282%-311%。刻蚀设备龙头，业绩超预期。科创板回购潮彰显信心", source: "同花顺盘前必读", url: "https://t.10jqka.com.cn/pid_669825086.shtml" },
        { name: "紫金矿业", code: "601899", market: "A股", industry: "有色金属", strategy: "长线价值", reason: "全球资源龙头，铜金产量持续增长。国际油价大跌但黄金白银仍有支撑，资源品长期逻辑不变", source: "券商月度金股", url: "https://stock.10jqka.com.cn/20260801/c678604467.shtml" },
        { name: "金山办公", code: "688111", market: "A股", industry: "AI办公软件", strategy: "长线价值", reason: "办公AI入口，WPS AI商业化加速，业绩最扎实的AI应用标的。AI应用板块8月4日盘中涨1.13%，5日涨6.6%", source: "券商研报", url: "https://t.10jqka.com.cn/pid_669825086.shtml" },
        { name: "同花顺", code: "300033", market: "A股", industry: "金融AI", strategy: "长线价值", reason: "8月4日开盘233元涨0.83%，金融AI入口，毛利率85%，iFinD AI助手商业化进展超预期。5日涨8.89%", source: "同花顺行情", url: "https://news.10jqka.com.cn/20260804/c678639524.shtml" },
        { name: "英伟达", code: "NVDA", market: "美股", industry: "AI芯片/算力", strategy: "长线价值", reason: "8月3日涨近3%，市值重回5万亿美元。美银首选目标价320美元。AMD/Palantir本周财报或成催化剂。前瞻PE 20.3倍", source: "美银研报·富途", url: "https://www.stcn.com/article/detail/4056624.html" },
        { name: "亚马逊", code: "AMZN", market: "美股", industry: "云/AI", strategy: "长线价值", reason: "8月3日涨4.58%，市值首破3万亿美元。AWS收入同比暴增37%超预期，AI驱动云业务加速。Motley Fool 8月首选", source: "证券时报", url: "https://www.stcn.com/article/detail/4056624.html" },
        { name: "谷歌", code: "GOOGL", market: "美股", industry: "AI/云", strategy: "长线价值", reason: "8月3日涨近5%，市值超苹果升至全球第二。云业务持续高增，Gemini模型竞争力提升，广告业务AI赋能", source: "证券时报", url: "https://www.stcn.com/article/detail/4056624.html" },

        // ---- 超短线热门股（同花顺热榜 + 富途moomoo热度榜） ----
        { name: "传智教育", code: "003032", market: "A股", industry: "AI教育", strategy: "超短线", reason: "8月3日6连板，市场空间龙头。AI教育+具身智能+摘帽，AI应用核心人气标的，短线情绪风向标。8月4日能否冲7连板看竞价承接", source: "同花顺盘前必读", url: "https://t.10jqka.com.cn/pid_669825086.shtml" },
        { name: "利欧股份", code: "002131", market: "A股", industry: "AI液冷+数字营销", strategy: "超短线", reason: "8月3日2连板。AI液冷泵进入华为昇腾核心供货序列，数字营销受益AI广告，兼具快手/小红书概念。AI应用板块持续爆发", source: "同花顺盘前必读", url: "https://t.10jqka.com.cn/pid_669825086.shtml" },
        { name: "天娱数科", code: "002354", market: "A股", industry: "AI视频+虚拟人", strategy: "超短线", reason: "8月3日2连板。布局AI视频生成、3D空间智能、虚拟数字人，已接入Kimi测试，半年报预增48%-91%。AI应用+具身智能概念", source: "同花顺盘前必读", url: "https://t.10jqka.com.cn/pid_669825086.shtml" },
        { name: "中大力德", code: "002896", market: "A股", industry: "机器人减速器", strategy: "超短线", reason: "8月3日2连板。宇树产业链标的，受益世界机器人大会预期+宇树8月10日申购。人形机器人板块10股涨停，特斯拉Optimus产能修正至1000万台", source: "同花顺盘前必读", url: "https://t.10jqka.com.cn/pid_669825086.shtml" },
        { name: "盈峰环境", code: "000967", market: "A股", industry: "算力租赁", strategy: "超短线", reason: "8月3日2连板。算力租赁概念，十五五算力网直接投资超4万亿。推理算力缺口3倍，AI需求同比增417%但供给仅增128%", source: "同花顺盘前必读", url: "https://t.10jqka.com.cn/pid_669825086.shtml" },
        { name: "新能股份", code: "未确认", market: "A股", industry: "电力", strategy: "超短线", reason: "8月3日2连板。超强厄尔尼诺形成中，多地用电负荷创历史新高。新型电力系统十五五规划落地，电力板块逆势走强", source: "同花顺盘前必读", url: "https://t.10jqka.com.cn/pid_669825086.shtml" },
        { name: "Palantir", code: "PLTR", market: "美股", industry: "AI数据分析", strategy: "超短线", reason: "本周一公布Q2财报。富途热度榜前列，AI Agent方向核心标的，政府和企业客户双增长。但估值偏高需注意财报后波动", source: "富途牛牛热度榜", url: "https://www.futunn.com/quote/us/most-active-stocks" },
        { name: "AMD", code: "AMD", market: "美股", industry: "AI芯片", strategy: "超短线", reason: "本周二盘后公布Q2财报，本周最大催化剂。服务器CPU收入指引增长70%+，MI450/Helios AI机架是关键变量。财报可能带动整个AI芯片板块", source: "Investing Engineer", url: "https://investingengineer.com/top-10-us-stocks-to-watch-august-3-7-2026" },
        { name: "美光科技", code: "MU", market: "美股", industry: "存储芯片", strategy: "超短线", reason: "8月最佳股票第一名。预期EPS增长785%，前瞻PE仅5.9倍。TrendForce预计Q3 PC DRAM价格上涨15%-20%。存储供应短缺持续", source: "inews24", url: "https://inews24.eu/9-best-stocks-to-buy-now-for-august-2026" },
        { name: "阿里巴巴", code: "BABA", market: "美股", industry: "AI/云/电商", strategy: "超短线", reason: "8月3日涨超4%。发布千问3.8-MAX模型2.4万亿参数，性能比肩Anthropic Fable 5，首个开源Max级权重下周发布。阿里港股大涨7%，南向净买入42亿", source: "华尔街见闻", url: "https://new.qq.com/rain/a/20260804A03PAO00?refer=cp_1009" }
    ],

    /* ========== 投资推荐总结（2026-08-04 实时） ========== */
    /* ========== 投资推荐总结（2026-08-04 实时） ========== */
                                                                                                                                                                        investmentSummary: {
        date: "2026-08-15",
        marketAssessment: "A股方面：上证指数报3927.18点（+0.01%），深证成指报14354.31点（+0.45%），创业板指报3626.30点（+1.12%）。美股方面：标普500报7,785.76（+0.36%），纳斯达克报26,729.16（+0.14%）。",
        hotSectors: [

        ],
        weakSectors: [

        ],
        longTermStrategy: "市场企稳回升，长线布局业绩拐点标的。半年报披露期关注超预期个股，重点配置AI产业链业绩龙头和受益于政策支持的方向。",
        shortTermStrategy: "超短线关注今日热门板块的持续性和扩散方向，顺势而为，注意控制仓位和止损。",
        positionAdvice: "激进型6-7成（聚焦今日强势板块），稳健型4-5成（业绩龙头+红利），保守型2-3成（仅核心资产）",
        riskWarning: "以上内容仅整合公开市场数据，不构成投资建议。股市有风险，投资需谨慎。个股推荐来源为公开信息整合，不代表任何投资建议。",
        sources: [
            { name: "东方财富·行情数据", url: "https://quote.eastmoney.com/" },
            { name: "新浪财经·资讯", url: "https://finance.sina.com.cn/" },
            { name: "Yahoo Finance", url: "https://finance.yahoo.com/" },
        ]
    }
};
