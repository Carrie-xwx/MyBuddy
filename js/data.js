/* ========================================
   预生成内容素材库
   雅思阅读/听力/写作/口语 + Vlog选题/案例
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

    /* ========== 雅思听力素材（含真实音频源） ========== */
    listenings: [
        {
            title: "BBC 6 Minute English - The importance of handwashing",
            context: "BBC Learning English 6分钟英语系列，讨论洗手的重要性，适合雅思听力Section 3/4训练",
            audioUrl: "https://downloads.bbc.co.uk/learningenglish/features/6min/241128_6_minute_english_the_importance_of_handwashing_download.mp3",
            audioSource: "BBC Learning English",
            audioPage: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english",
            level: "Band 6-7",
            transcript: `Welcome to 6 Minute English, the programme where we explore an interesting topic and learn some new vocabulary at the same time. I'm Neil.

And I'm Sam. Today we're talking about the importance of handwashing.

Now, Sam, how many deaths do you think could be prevented each year if everyone washed their hands properly?

Hmm, that's a good question. I'm not sure. Maybe a million?

Well, according to research, proper handwashing could prevent about 1.4 million deaths a year, mostly in developing countries.

That's an incredible number. And it seems so simple, just washing your hands.

It does seem simple, but the key word is 'properly'. Research shows that many people don't wash their hands correctly. The recommended time is 20 seconds, which is about the time it takes to sing 'Happy Birthday' twice.

Interesting. So why is handwashing so effective at preventing disease?

Well, our hands are the main way we transfer germs from surfaces to our bodies. When we touch our eyes, nose, or mouth with unwashed hands, we allow germs to enter our system. Regular handwashing breaks this chain of transmission.

And it's not just about preventing colds and flu. Handwashing can prevent more serious diseases like diarrhoea, pneumonia, and even Ebola.

Absolutely. In fact, handwashing is one of the most cost-effective public health interventions available. It costs almost nothing but saves millions of lives.

So what's the correct way to wash hands?

First, wet your hands with clean water. Then apply soap and rub your palms together. Don't forget the backs of your hands, between your fingers, and under your nails. Keep rubbing for at least 20 seconds. Then rinse and dry thoroughly.

That sounds straightforward enough. But why do so many people still not do it?

Well, there are several reasons. In some places, access to clean water and soap is limited. In other cases, it's about habit and awareness. That's why education campaigns are so important.`,
            questions: [
                "How many deaths could be prevented annually by proper handwashing?",
                "What is the recommended duration for washing hands?",
                "What song can you sing twice to time 20 seconds of handwashing?",
                "Name three diseases that handwashing can help prevent.",
                "What are the three reasons mentioned for people not washing hands?"
            ]
        },
        {
            title: "BBC 6 Minute English - Why we forget things",
            context: "BBC Learning English 6分钟英语系列，讨论记忆和遗忘的科学原理，词汇丰富适合雅思学术听力训练",
            audioUrl: "https://downloads.bbc.co.uk/learningenglish/features/6min/241114_6_minute_english_why_do_we_forget_things_download.mp3",
            audioSource: "BBC Learning English",
            audioPage: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english",
            level: "Band 7+",
            transcript: `Hello and welcome to 6 Minute English. I'm Neil.

And I'm Sam. And today we're talking about memory, or rather, why we forget things.

Now Sam, have you ever walked into a room and completely forgotten why you went in there?

All the time! It's so frustrating. Is there a scientific explanation for this?

Yes, actually there is. It's called the 'doorway effect'. Research suggests that passing through a doorway creates a boundary in our memory, making it harder to recall what we were thinking about before we entered the room.

That's fascinating. So it's not just me being forgetful – my brain is actually compartmentalising information.

Exactly. But forgetting is not always a bad thing. In fact, it's essential for healthy brain function. If we remembered everything, our brains would be overwhelmed with information.

So why do we forget? Is it just because our brains get full?

Not exactly. There are several theories. One is decay theory – the idea that memories naturally fade over time if they're not accessed. Another is interference theory – new information can interfere with old memories.

And then there's motivated forgetting, where we unconsciously forget things that are painful or uncomfortable.

That's right. But the most common reason we forget is simply that we didn't encode the information properly in the first place. If you're not paying attention when someone tells you something, you never really form a memory of it.

So how can we improve our memory?

Well, one technique is called spaced repetition. Instead of trying to learn everything at once, you review information at increasing intervals. This has been shown to be much more effective than cramming.

Another technique is the method of loci, or memory palace. You associate pieces of information with specific locations in a familiar place, like your home.

And of course, getting enough sleep is crucial. During sleep, our brains consolidate memories and clear out unnecessary information.

So forgetting is actually a feature, not a bug, of our brain's design.`,
            questions: [
                "What is the 'doorway effect'?",
                "Is forgetting always bad for the brain? Why or why not?",
                "Name the three theories of forgetting mentioned in the programme.",
                "What is spaced repetition and why is it effective?",
                "Why is sleep important for memory?"
            ]
        },
        {
            title: "VOA Learning English - Technology Report: AI in Education",
            context: "VOA Learning English 慢速英语，讨论AI在教育中的应用，语速适中适合雅思听力训练",
            audioUrl: "https://av.voanews.com/clips/VLE/2024/01/15/01000000-0aff-0242-3fa1-08dc18a0b0bf_hq.mp3",
            audioSource: "VOA Learning English",
            audioPage: "https://learningenglish.voanews.com/",
            level: "Band 5-6",
            transcript: `This is VOA Learning English. Today we report on artificial intelligence and its growing use in education.

Around the world, schools and universities are exploring how AI can help students learn. Some teachers worry that students might use AI tools to write essays or solve math problems without actually learning.

But others see AI as a helpful assistant. For example, AI can create personalized learning plans for each student. It can identify areas where a student needs more practice and provide extra exercises.

At Stanford University, researchers have developed an AI system that can track students' eye movements to understand when they are confused or frustrated. The system then adjusts the difficulty of the material.

Some educators believe AI will eventually replace traditional textbooks. Instead of reading the same material as everyone else, each student would learn from content specially created for them.

However, critics point out that AI systems are only as good as the data they are trained on. If the data contains biases, the AI might teach students in ways that are unfair or incorrect.

Another concern is privacy. AI systems that track students' learning patterns collect a lot of personal data. Who controls this data and how is it protected?

Despite these concerns, the use of AI in education continues to grow. A recent survey found that more than 60 percent of teachers have used some form of AI tool in their classrooms.

Experts say the key is to use AI as a tool to help teachers, not to replace them. The best learning happens when technology and human teachers work together.`,
            questions: [
                "What are two opposing views on AI in education?",
                "How can AI create personalized learning?",
                "What did Stanford researchers develop?",
                "What are the two main concerns about AI in education?",
                "What percentage of teachers have used AI tools in classrooms?"
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

    /* ========== Vlog 爆款选题（基于真实网络热点） ========== */
    vlogTopics: [
        { title: "流浪式留学vlog｜穷到吃不起饭的一天", desc: "延续白日梦想家'流浪式留学'风格，记录用最少预算在留学城市生存一天的真实经历，展示穷但快乐的留学生活", tags: ["流浪式留学", "穷鬼留学", "真实记录", "爆款人设"] },
        { title: "穷鬼留学生省钱攻略｜一年只花8万在英国活下来", desc: "对标萝卜乔乔风格，用具体数字拆解省钱方法——超市临期时间、学生折扣薅羊毛、免费活动日历等", tags: ["穷鬼留学", "省钱攻略", "数字冲击", "可操作干货"] },
        { title: "活人微死人设｜留学生社死合集", desc: "打造'活人微死'人设，收集留学期间最社死的瞬间——课堂走错教室、给教授发错消息、食堂点菜鸡同鸭讲", tags: ["活人微死", "社死现场", "人设打造", "留学日常"] },
        { title: "手势舞×留学日常｜当留学生也开始跳手势舞", desc: "结合2025年手势舞热门趋势，用手势舞配合留学生活场景，如图书馆学习手势舞、超市购物手势舞，用反差感吸引眼球", tags: ["手势舞", "留学日常", "反差搞笑", "热点结合"] },
        { title: "留学vlog｜落地第一天的真实崩溃瞬间", desc: "不美化不滤镜，记录从机场到宿舍的第一个24小时——行李超重、找不到宿舍、手机没电、语言不通的真实崩溃", tags: ["留学落地", "真实记录", "新生必看", "情绪共鸣"] },
        { title: "英国/韩国/美国大学食堂到底多难吃｜留学生吐槽", desc: "对标首尔佬蒯的跨文化碰撞风格，用家乡胃视角吐槽当地大学食堂，制造文化反差笑点", tags: ["跨文化碰撞", "食堂吐槽", "留学日常", "搞笑反差"] },
        { title: "留学生月度开销全公开｜真实账单不藏着", desc: "数据可视化呈现真实生活费，房租/饮食/交通/社交分项列出，配合购物小票截图增强可信度", tags: ["留学开销", "数据公开", "预算参考", "收藏向"] },
        { title: "用东北话/四川话讲留学日常｜方言vlog", desc: "用方言讲述留学生活，将家乡文化与留学地文化碰撞，制造天然喜剧效果和辨识度", tags: ["方言vlog", "跨文化", "喜剧效果", "地域特色"] },
        { title: "留学前vs留学后｜我变了多少", desc: "对比出国前后的外貌、心态、生活习惯、饮食偏好变化，用before/after对比制造视觉冲击和情感共鸣", tags: ["留学变化", "成长记录", "对比反差", "情感共鸣"] },
        { title: "留学生做饭进化史｜从黑暗料理到中华小当家", desc: "记录从泡面都不会煮到能做一桌菜的成长过程，保留翻车镜头增加真实感和娱乐性", tags: ["留学生做饭", "成长记录", "翻车现场", "中华料理"] },
        { title: "教授Office Hour实录｜留学生怎么和教授不尬聊", desc: "第一视角记录和教授交流的完整过程，分享话题准备、沟通技巧和实际体验", tags: ["学术技巧", "教授互动", "干货分享", "留学生活"] },
        { title: "期末考试周生存指南｜我的复习方法和心态调节", desc: "分享高效复习策略、时间管理方法、压力调节技巧，配合图书馆实拍和番茄钟记录", tags: ["期末复习", "学习方法", "考试周", "时间管理"] },
        { title: "留学生宿舍改造｜10磅/100元爆改温馨小屋", desc: "低成本改造宿舍空间，用宜家/亚马逊/淘宝转运的物品打造温馨学习生活环境，给出完整预算清单", tags: ["宿舍改造", "收纳整理", "低成本", "生活美学"] },
        { title: "留学社交破冰｜从社恐到社牛的进化", desc: "记录留学生社交破冰全过程——第一次社团活动、第一次和国际生聚餐、第一次课堂小组讨论的真实体验", tags: ["留学社交", "社恐破冰", "成长记录", "真实体验"] },
        { title: "逛当地超市开箱｜什么值得买什么别踩雷", desc: "逛当地超市，对比价格，推荐留学生必备食材和避坑指南，用开箱形式增加仪式感", tags: ["超市探店", "开箱", "留学生活", "省钱攻略"] }
    ],

    /* ========== Vlog 对标案例（真实账号详细拆解） ========== */
    vlogCases: [
        {
            title: "流浪式留学vlog｜我在英国的日子",
            channel: "白日梦想家",
            platform: "抖音",
            fans: "301.3万",
            views: "单条平均200-500万",
            analysis: `白日梦想家是2024-2025年留学Vlog赛道最火的创作者之一，核心定位是"流浪式留学"——用极低成本、极简生活方式在英国留学，营造出一种"穷但快乐"的真实感。

【人设拆解】
• 标签：英国曼大留学生 / 穷鬼留学生 / 活人微死人设
• 人设核心：不精致、不矫情、真实到令人发笑的"社畜式留学"
• 视觉风格：手机直出、无滤镜、素颜出镜、宿舍凌乱背景
• 语言风格：东北话+英语混搭，自嘲式幽默，金句频出

【内容结构拆解】
1. 开头钩子（0-3秒）：直接用一个"社死"瞬间开场，比如"今天又在超市偷塑料袋被发现了"，制造强好奇心
2. 主题展开（3秒-1分钟）：围绕一个具体事件展开，如"如何用5磅活过一周"、"英国大学食堂到底多难吃"
3. 真实反应（贯穿全片）：保留所有尴尬、失败、社死的瞬间，不剪辑掉"不完美"的画面
4. 金句升华（结尾10秒）：用一句自嘲但有深度的话收尾，如"留学最大的收获就是学会了和自己和解"

【爆款密码】
• "活人微死"人设：不做完美留学生，展示真实的狼狈和窘迫
• 极强共鸣感：每条视频都精准踩中留学生的共同痛点
• 低门槛模仿：拍摄方式简单，普通人也能模仿，但幽默感无法复制
• 评论区互动：故意留"槽点"引发评论区讨论，推高互动率

【可借鉴框架】
• 选题：聚焦"留学生最不想让人知道的窘迫瞬间"
• 节奏：快节奏叙事，每个场景不超过15秒
• 剪辑：保留"废片"——失败镜头反而最出圈
• 互动：每条视频结尾抛出一个"你的留学社死瞬间"话题`,
            framework: [
                "开头钩子（0-3秒）：用一个社死/反差瞬间开场，制造强烈好奇心",
                "主题展开（3秒-1分）：围绕一个具体生活事件，快节奏叙事",
                "真实反应：保留尴尬/失败/社死瞬间，不追求画面完美",
                "金句升华（结尾10秒）：自嘲但有深度的金句收尾，引发共鸣",
                "互动引导：结尾抛出话题，如'你的留学社死瞬间是什么？'"
            ]
        },
        {
            title: "穷鬼留学系列｜一个留学生的生存指南",
            channel: "萝卜乔乔",
            platform: "抖音",
            fans: "单月涨粉370万+",
            views: "单条最高突破2000万",
            analysis: `萝卜乔乔是2025年留学赛道的现象级黑马，单月涨粉370万+，核心爆款逻辑是"穷鬼留学"——把省钱做到极致，变成一种生活哲学和娱乐内容。

【人设拆解】
• 标签：英国曼大留学生 / 极致省钱达人 / 反消费主义代表
• 人设核心：把"穷"变成一种态度和幽默，不是诉苦而是炫耀式省钱
• 视觉风格：超市打折区、学生宿舍厨房、二手市场——全是最接地气的场景
• 语言风格：快语速+夸张表情+数字罗列，信息密度极高

【内容结构拆解】
1. 标题钩子：数字+反差，如"英国留学一年只花8万人民币"、"在伦敦用2磅吃饱一天"
2. 开场（0-5秒）：直接亮出省钱结果或最夸张画面，如"看这堆东西一共才花了1.5磅"
3. 过程展示（5秒-90秒）：详细拆解省钱过程，如超市临期打折时间、哪个超市最便宜、如何薅学校羊毛
4. 对比反差：穿插"国内同等消费是多少"的对比，制造认知冲击
5. 总结+金句："省钱不是穷，是一种生活态度"

【爆款密码】
• 数字冲击：所有内容用具体数字说话，"8万"、"2磅"、"1.5磅"——极简但极具传播力
• 可操作性：每条视频都给出可复制的省钱方法，收藏率极高
• 情绪价值：把"穷"变成可炫耀的事，消解了留学的经济焦虑
• 系列化运营："穷鬼留学"做成系列IP，用户追更粘性强

【可借鉴框架】
• 选题公式：[极致省钱场景] + [具体数字] + [对比反差]
• 标题模板：数字开头+情绪词+结果，如"1磅在英国能买什么？结果震惊了"
• 内容节奏：每15秒一个信息点或笑点，保持观众注意力
• 系列化：将成功选题做成系列，形成IP效应`,
            framework: [
                "标题钩子：数字+反差，如'英国留学一年只花8万'、'2磅吃饱一天'",
                "开场亮结果（0-5秒）：直接展示最震撼的画面或数字",
                "过程拆解（5-90秒）：详细展示省钱方法，可操作性强",
                "对比反差：穿插国内消费对比，制造认知冲击",
                "总结金句：'省钱不是穷，是一种生活态度'"
            ]
        },
        {
            title: "韩国留学日常vlog｜首尔佬蒯的东北民宅生活",
            channel: "首尔佬蒯",
            platform: "抖音",
            fans: "150万+",
            views: "单条平均50-150万",
            analysis: `首尔佬蒯以"韩国留学+东北人"的跨文化碰撞为核心卖点，将韩国留学生活用东北话讲述，创造出独特的喜剧效果。

【人设拆解】
• 标签：韩国留学生 / 东北人在首尔 / 跨文化喜剧人
• 人设核心：用东北人直爽粗犷的性格反衬韩国精致文化，制造持续的文化碰撞笑点
• 视觉风格：韩国街景+东北式吐槽，画面精致但语言接地气
• 语言风格：东北方言为主+韩语关键词穿插，"哎呀妈呀"和"大发"无缝切换

【内容结构拆解】
1. 场景引入（0-10秒）：在韩国某个日常场景开场，如韩国大学食堂、韩国室友家
2. 文化碰撞（10-60秒）：用东北视角解读韩国文化，如"韩国人早上吃米饭？我这东北胃受不了"
3. 对比吐槽：将韩国和中国东北的习惯做对比，制造笑点
4. 温情收尾：在搞笑之后加入一些"其实在韩国也挺好"的温暖瞬间

【爆款密码】
• 跨文化碰撞：东北文化vs韩国文化，天然喜剧效果，无需刻意搞笑
• 方言魅力：东北话自带娱乐属性，降低观众门槛
• 文化共鸣：中国人看韩国文化的好奇心+东北话的亲切感
• 真实感：不做旅游博主式的精致，而是留学生视角的日常

【可借鉴框架】
• 选题：跨文化碰撞是核心，找到你的留学地与家乡的文化反差
• 方言加持：用方言讲述留学故事，增加辨识度和娱乐性
• 对比结构：每个场景都用"这里vs老家"的对比框架
• 温度把控：7分搞笑3分温情，避免纯吐槽失去好感`,
            framework: [
                "场景引入（0-10秒）：在留学地日常场景开场",
                "文化碰撞（10-60秒）：用家乡视角解读当地文化",
                "对比吐槽：将当地和家乡的习惯对比，制造笑点",
                "温情收尾：搞笑后加入温暖瞬间，平衡内容温度"
            ]
        },
        {
            title: "UCL学长留学干货分享｜留学圈懂旺",
            channel: "留学圈懂旺",
            platform: "小红书",
            fans: "12万",
            views: "单篇平均5000-20000赞",
            analysis: `留学圈懂旺是小红书留学赛道的优质创作者，以UCL（伦敦大学学院）学长身份输出留学干货，内容以图文为主，兼顾短视频，是"干货型留学博主"的典型代表。

【人设拆解】
• 标签：UCL学长 / 留学干货输出者 / 伦敦生活分享
• 人设核心：学长带学弟学妹的"过来人"视角，专业但亲切
• 视觉风格：小红书典型排版——大字标题+信息图+分点罗列，精致但不过度
• 语言风格：条理清晰+适度口语化+emoji点缀，适合碎片阅读

【内容结构拆解】
1. 标题：痛点关键词+数字承诺，如"UCL一年30万够吗？真实账单全公开"
2. 封面：手写大字+背景图，信息量大但有层次
3. 正文：分5-8个模块，每模块2-3句话+配图，模块间用分割线
4. 结尾：引导评论区互动，如"你还想了解什么？评论区告诉我"

【爆款密码】
• 干货密度：每篇笔记都有3-5个可立即使用的实用信息点
• 信息可视化：用自制信息图替代纯文字，提升阅读体验和收藏率
• 系列化：UCL申请攻略/伦敦生活/省钱指南等多系列运营
• 评论区运营：每条评论认真回复，形成高质量互动社区

【可借鉴框架】
• 选题：从留学全流程痛点出发——申请、住宿、选课、省钱、就业
• 排版：大字标题+分模块+信息图，提升收藏率
• 系列化：将选题做成系列，提升用户关注动机
• 互动：认真回复每条评论，维护社区氛围`,
            framework: [
                "标题：痛点关键词+数字承诺，如'UCL一年30万够吗？'",
                "封面：手写大字+信息图，信息量大但有层次",
                "正文：分5-8个模块，每模块简洁配图",
                "结尾：引导评论区互动，收集下一期选题"
            ]
        }
    ],

    /* ========== 脚本框架模板 ========== */
    scriptTemplates: [
        {
            section: "开头钩子 (0-5秒)",
            content: "用一个强烈的画面或金句抓住注意力。可以是：\n• 反常识观点：「出国前我以为...结果...」\n• 悬念预告：「这一天发生的事改变了我对留学的看法」\n• 视觉冲击：机场分别/第一次看到宿舍的震惊表情"
        },
        {
            section: "自我介绍+主题 (5-15秒)",
            content: "简短自我介绍（10秒内），然后引出本期主题。格式：\n「我是XX，在XX读XX专业。今天带大家看...」\n保持简洁，不要长篇自我介绍"
        },
        {
            section: "主体内容 (15秒-结束前30秒)",
            content: "按场景或时间线展开：\n• 场景1：背景铺垫（在什么地方、要做什么）\n• 场景2：过程记录（真实体验，保留有意义的对话和反应）\n• 场景3：互动/冲突/发现（让内容有起伏）\n• 场景4：结果/收获（这个经历带来了什么）\n每个场景之间用过渡画面或旁白连接"
        },
        {
            section: "情感升华 (结束前30秒)",
            content: "总结这期内容的感悟和收获：\n• 分享个人成长或心态变化\n• 给观众实用建议或经验总结\n• 表达对未来的期待"
        },
        {
            section: "结尾引导 (最后10秒)",
            content: "引导互动：\n• 「你觉得怎么样？评论区告诉我」\n• 「下期带大家看XX，记得关注」\n• 「点赞收藏，留学路上不迷路」"
        }
    ],

    /* ========== 文案初稿模板 ========== */
    draftTemplates: {
        titles: [
            "留学生第一周真实记录｜落地后的24小时",
            "我在国外的月度开销全公开💰｜真实数据分享",
            "国外上课第一天什么体验？｜留学生vlog",
            "从社恐到社牛：我在国外的社交进化史",
            "留学生做饭翻车现场🍳｜但我没放弃"
        ],
        descriptions: [
            "📝 本期内容：{topic}\n\n出国留学的真实日常，不美化不夸张，记录每一刻真实感受。\n\n如果你也在准备留学或者对海外生活好奇，这期视频一定不要错过！\n\n⏰ 时间轴：\n00:00 开场\n01:30 场景一\n03:45 场景二\n06:00 感悟总结\n\n💬 评论区聊聊：你最关心的留学问题是？",
            "🎬 这一期带你沉浸式体验{topic}\n\n没有滤镜，没有剧本，只有最真实的留学生活。\n从最初的紧张到后来的适应，每一步都值得记录。\n\n👇 互动话题：\n你觉得出国留学最大的挑战是什么？\n\n📌 收藏不迷路，关注看更多留学干货！"
        ],
        tags: ["留学vlog", "留学生活", "真实记录", "海外日常", "留学经验", "vlog日常", "study abroad", "international student", "留学准备", "海外生活"]
    },

    /* ========== 市场指数（真实数据，2026-08-03更新） ========== */
                    marketIndices: [
        { name: "标普500", code: "SPX", value: "7,600.50", change: "+2.53%", market: "美股", updateTime: "2026-08-04 收盘" },
        { name: "纳斯达克", code: "IXIC", value: "25,913.90", change: "+3.94%", market: "美股", updateTime: "2026-08-04 收盘" },
        { name: "道琼斯", code: "DJI", value: "53,178.41", change: "+1.85%", market: "美股", updateTime: "2026-08-04 收盘" },
    ],

    /* ========== 真实财经资讯（2026-08-04更新，含原文链接） ========== */
                    marketNews: [
        {
            title: "泰国电信公司True称中国移动可能会减持少量股份",
            summary: " 泰国电信公司True Corp．周二表示，中国移动正在评估出售在该公司一小部分股份的可能性，这是正常的投资组合管理行为。",
            source: "环球市场播报",
            date: "2026-08-04",
            tag: "A股",
            url: "https://finance.sina.com.cn/stock/usstock/c/2026-08-04/doc-inimchzp5755791.shtml"
        },
        {
            title: "天数智芯早盘涨近9% 天数智芯实现MiniMax H3“开源即适配”",
            summary: "天数智芯（09903）早盘涨近9%，截至发稿，股价上涨8.73%，现报465.60港元，成交额2.28亿港元。 8月3日，MiniMax宣布MiniMax H3模型正式开源。",
            source: "新浪港股",
            date: "2026-08-04",
            tag: "港股",
            url: "https://finance.sina.com.cn/stock/hkstock/marketalerts/2026-08-04/doc-inimchzp5754518.shtml"
        },
        {
            title: "银诺医药-B盘中涨超18% 两处依苏帕格鲁肽α注射液委托生产场地取得PIC/S GMP证书",
            summary: "银诺医药-B（02591）早盘一度涨超18%，截至发稿，股价上涨6.63%，现报7.56港元，成交额3286.93万港元。 8月3日，银诺医药发布公告...",
            source: "新浪港股",
            date: "2026-08-04",
            tag: "港股",
            url: "https://finance.sina.com.cn/stock/hkstock/marketalerts/2026-08-04/doc-inimchzv2208865.shtml"
        },
        {
            title: "CSIS称特朗普屡次未兑现打击威胁 让伊朗认为美国很软弱",
            summary: " 战略与国际问题研究中心（CSIS）中东项目主任Mona Yacoubian表示，在特朗普政府屡次没有兑现其发出的最严厉威胁后，伊朗认为自己在与美国的冲突中占据了上风。",
            source: "环球市场播报",
            date: "2026-08-04",
            tag: "宏观",
            url: "https://finance.sina.com.cn/stock/usstock/c/2026-08-04/doc-inimchzt5436076.shtml"
        },
        {
            title: "壁仞科技早盘涨近7% 完成MiniMax H3大模型推理验证",
            summary: "壁仞科技（06082）早盘涨近7%，截至发稿，股价上涨6.76%，现报33.50港元，成交额9009.45万港元。 据壁仞科技官微消息，8月3日，MiniMax正式开源新一代多模态生成模型MiniMa...",
            source: "新浪港股",
            date: "2026-08-04",
            tag: "港股",
            url: "https://finance.sina.com.cn/stock/hkstock/marketalerts/2026-08-04/doc-inimchzv2207481.shtml"
        },
        {
            title: "康宁杰瑞制药-B早盘涨超12% TROP2/HER3双抗ADC授权出海",
            summary: "康宁杰瑞制药-B（09966）早盘涨超12%，截至发稿，股价上涨12.43%，现报8.32港元，成交额762.18万港元。 康宁杰瑞生物制药宣布，其全资子公司江苏康宁杰瑞生物制药有限公司...",
            source: "新浪港股",
            date: "2026-08-04",
            tag: "港股",
            url: "https://finance.sina.com.cn/stock/hkstock/marketalerts/2026-08-04/doc-inimchzt5433129.shtml"
        },
        {
            title: "再传捷报！赵敬国律师团队代理的投资者诉中青宝证券虚假陈述一案 已有二审胜诉判决 投资者即将获赔成功！",
            summary: "上海市信本律师事务所赵敬国律师团队代理部分投资者诉深圳中青宝互动网络股份有限公司（以下简称“中青宝”）证券虚假陈述案件，迎来新进展，案件二审已经胜诉...",
            source: "市场资讯",
            date: "2026-08-04",
            tag: "A股",
            url: "https://finance.sina.com.cn/stock/gmwq/rightscase/2026-08-04/doc-inimchzm4143030.shtml"
        },
        {
            title: "策略师：黄金结构性牛市未终结，4000美元正是布局良机，不必理会美联储鹰派表态",
            summary: "文章来源：汇通财经 作为市场关注焦点，黄金经历长达数月的调整行情，不少投资者对后市产生分歧。安本集团（abrdn）策略总监指出，金价稳稳守住每盎司4000美元支撑...",
            source: "市场资讯",
            date: "2026-08-04",
            tag: "美股",
            url: "https://finance.sina.com.cn/money/nmetal/hjzx/2026-08-04/doc-inimchzt5429996.shtml"
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

    /* ========== 投资推荐总结（2026-08-04） ========== */
                    investmentSummary: {
        date: "2026-08-04",
        marketAssessment: "今日市场数据获取中。美股方面：标普500报7,600.50（+2.53%），纳斯达克报25,913.90（+3.94%）。",
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
