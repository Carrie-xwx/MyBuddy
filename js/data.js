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

    /* ========== 雅思听力素材（含真实音频源） ========== */
    listenings: [
        {
            title: "Cambridge IELTS 2 - Test 1 Section 1 (雅思真题)",
            context: "BBC Learning English 6分钟英语系列，讨论洗手的重要性，适合雅思听力Section 3/4训练",
            audioUrl: "audio/IELTS-2-Test1-Section1.mp3",
            audioSource: "Cambridge IELTS 2 - Test 1 Section 1",
            audioPage: "https://www.ieltspodcast.com/ielts-preparation/cambridge-ielts-2-listening-test-1-section-1/",
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
            title: "Cambridge IELTS 2 - Test 1 Section 3 (雅思真题·学术讨论)",
            context: "BBC Learning English 6分钟英语系列，讨论记忆和遗忘的科学原理，词汇丰富适合雅思学术听力训练",
            audioUrl: "audio/IELTS-2-Test1-Section3.mp3",
            audioSource: "Cambridge IELTS 2 - Test 1 Section 3",
            audioPage: "https://www.ieltspodcast.com/ielts-preparation/cambridge-ielts-2-listening-test-1-section-3/",
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
            title: "Cambridge IELTS 6 - Test 3 Section 1 (雅思真题·社交场景)",
            context: "VOA Learning English 慢速英语，讨论AI在教育中的应用，语速适中适合雅思听力训练",
            audioUrl: "audio/IELTS-6-Test3-Section1.mp3",
            audioSource: "Cambridge IELTS 6 - Test 3 Section 1",
            audioPage: "https://www.ieltspodcast.com/ielts-preparation/cambridge-ielts-6-listening-test-3-section-1/",
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
        },
        {
            title: "Cambridge IELTS 2 - Test 2 Section 2 (雅思真题·独白)",
            context: "剑桥雅思2真题Test 2 Section 2，社交场景独白（旅游/设施介绍），适合训练抓取关键信息的听力能力",
            audioUrl: "audio/IELTS-2-Test2-Section2.mp3",
            audioSource: "Cambridge IELTS 2 - Test 2 Section 2",
            audioPage: "https://www.ieltspodcast.com/ielts-preparation/cambridge-ielts-2-listening-test-2-section-2/",
            level: "Band 6",
            transcript: `[雅思真题 Section 2 听力文本]\n\n本段为旅游信息中心工作人员介绍River View度假村设施的独白。\n考生需捕捉：地点名称、设施开放时间、价格、联系方式等关键信息。\n\n完整题目和答案请访问音频原页面查看。建议练习步骤：\n1. 第一遍：完整听一遍，不看文本，记录大意\n2. 第二遍：分句听写重点信息（数字、时间、地点）\n3. 第三遍：对照 transcript 检查，对照题目订正\n4. 第四遍：跟读模仿语音语调`,
            questions: [
                "本段独白主要介绍了什么场所？",
                "你需要在听力中捕捉哪些类型的具体信息？",
                "Section 2 通常采用什么题型？",
                "如何在听 Section 2 时做笔记最高效？"
            ]
        },
        {
            title: "Cambridge IELTS 6 - Test 2 Section 1 (雅思真题·对话)",
            context: "剑桥雅思6真题Test 2 Section 1，日常对话场景（旅行/活动安排），适合基础阶段精听训练",
            audioUrl: "audio/IELTS-6-Test2-Section1.mp3",
            audioSource: "Cambridge IELTS 6 - Test 2 Section 1",
            audioPage: "https://www.ieltspodcast.com/ielts-preparation/cambridge-ielts-6-listening-test-2-section-1/",
            level: "Band 5-6",
            transcript: `[雅思真题 Section 1 听力文本]\n\n本段为两人日常对话，通常出现在：\n- 旅行信息咨询（订酒店/问路/买票）\n- 活动安排（俱乐部/课程/工作面试）\n- 个人信息（填表/注册/咨询）\n\nSection 1 是雅思听力最简单的部分，语速较慢、信息清晰。\n重点训练：拼写、数字、时间、日期、字母。\n完整题目和答案请访问音频原页面查看。`,
            questions: [
                "Section 1 的对话场景通常是什么类型？",
                "Section 1 主要考查什么信息？",
                "为什么 Section 1 是最容易得分的部分？",
                "如何在听 Section 1 时避免拼写错误？"
            ]
        },
        {
            title: "Cambridge IELTS 6 - Test 3 Section 4 (雅思真题·学术讲座)",
            context: "剑桥雅思6真题Test 3 Section 4，学术讲座独白（学科类），难度最高，语速快、专业词汇多",
            audioUrl: "audio/IELTS-6-Test3-Section4.mp3",
            audioSource: "Cambridge IELTS 6 - Test 3 Section 4",
            audioPage: "https://www.ieltspodcast.com/ielts-preparation/cambridge-ielts-6-listening-test-3-section-4/",
            level: "Band 7+",
            transcript: `[雅思真题 Section 4 听力文本]\n\n本段为学术讲座独白，通常是：\n- 大学课程介绍（某个学科的发展史）\n- 科学研究报告（实验/调查/发现）\n- 行业分析（市场/技术/社会现象）\n\nSection 4 是雅思听力最难的部分，特点是：\n- 单一speaker独白，无对话辅助\n- 语速快，专业词汇多\n- 信息密集，需要快速笔记\n- 通常会先说一个观点，然后举例/数据支持\n\n训练建议：每天精听1篇 Section 4，先听后记关键词，再对照文本找差距。完整题目和答案请访问音频原页面查看。`,
            questions: [
                "Section 4 的语速和 Section 3 相比有什么特点？",
                "Section 4 的讲座通常涉及哪些主题？",
                "为什么 Section 4 是最难的部分？",
                "Section 4 听力训练的关键技巧是什么？"
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
        { name: "上证指数", code: "SH000001", value: "3,805.10", change: "-0.12%", market: "A股", updateTime: "2026-08-04 实时" },
        { name: "深证成指", code: "SZ399001", value: "13,704.72", change: "+1.91%", market: "A股", updateTime: "2026-08-04 实时" },
        { name: "创业板指", code: "SZ399006", value: "3,413.89", change: "+3.37%", market: "A股", updateTime: "2026-08-04 实时" },
        { name: "沪深300", code: "SH000300", value: "4,568.64", change: "+0.56%", market: "A股", updateTime: "2026-08-04 实时" },
        { name: "科创50", code: "SH000688", value: "1,579.08", change: "+1.69%", market: "A股", updateTime: "2026-08-04 实时" },
        { name: "标普500", code: "SPX", value: "7,600.50", change: "+2.53%", market: "美股", updateTime: "2026-08-03 收盘" },
        { name: "纳斯达克", code: "IXIC", value: "25,913.90", change: "+3.94%", market: "美股", updateTime: "2026-08-03 收盘" },
        { name: "道琼斯", code: "DJI", value: "53,178.41", change: "+1.85%", market: "美股", updateTime: "2026-08-03 收盘" }
    ],

    /* ========== 真实财经资讯（2026-08-04更新，含原文链接） ========== */
    marketNews: [
        {
            title: "韩国财长称将致力于改善股市结构和稳定性",
            summary: "韩国财政部长具润哲周二在内阁会议上表示，韩国将致力于改善市场基本面以减轻股市波动，确保其长期和结构性稳定。  具润哲表示，韩国近期出台了针对个股杠杆ETF的补充措施...",
            source: "环球市场播报",
            date: "2026-08-04",
            tag: "A股",
            url: "https://finance.sina.com.cn/stock/usstock/c/2026-08-04/doc-inimchzt5450466.shtml"
        },
        {
            title: "长飞光纤光缆盘中涨超8% 子公司拟出资1.7亿元参设长飞智能基金",
            summary: "长飞光纤光缆（06869）盘中涨超8%，截至发稿，股价上涨5.43%，现报100.90港元，成交额11.51亿港元。 长飞光纤光缆发布公告，公司子公司长飞资本近日与武汉长飞产业基金管理...",
            source: "新浪港股",
            date: "2026-08-04",
            tag: "港股",
            url: "https://finance.sina.com.cn/stock/hkstock/marketalerts/2026-08-04/doc-inimchzp5766083.shtml"
        },
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
        date: "2026-08-04",
        marketAssessment: "今日A股三大指数集体高开后震荡分化，沪指微跌0.12%但深成指+1.91%、创业板指+3.37%、科创50+1.69%大幅反弹。药明康德业绩上调+7%带动CRO板块全线爆发，存储芯片+2.87%反弹，半导体板块经历昨日大跌后明显修复。美股上周五三连阳收涨，科技股财报季预期积极。",
        hotSectors: [
            { name: "医疗服务/CRO", reason: "板块涨幅+5.66%-7.14%居首，药明康德上调全年业绩指引至585-605亿元，百花医药涨停，凯莱英/康龙化成/睿智医药高开", strength: "最强" },
            { name: "F5G/光通信", reason: "F5G概念+3.11%，AI算力需求驱动光通信板块持续景气，CPO/光模块/光纤龙头领涨", strength: "强" },
            { name: "存储器/存储芯片", reason: "板块+2.87%，昨日大跌后技术性反弹，TrendForce预计Q3 PC DRAM价格上涨15%-20%", strength: "中强" },
            { name: "国产软件/信创", reason: "信创+2.30%、国产软件+2.20%、数据中心+2.14%，AI+国产替代双轮驱动", strength: "中强" }
        ],
        weakSectors: [
            { name: "股份制银行/保险", reason: "银行板块-2.06%领跌，工商银行/建设银行/招商银行走低；保险-1.63%，防御板块资金流出", strength: "弱" },
            { name: "电力/白酒/休闲食品", reason: "电力-0.68%、休闲食品-0.65%、白酒等防御板块普遍回调，资金转向成长", strength: "弱" }
        ],
        longTermStrategy: "哑铃型策略：一手AI业绩龙头（金山办公/同花顺/英伟达/AMD/美光），一手红利防御（紫金矿业/五粮液）。半年报披露季重点筛选业绩超预期且回调充分的龙头股。药明康德业绩上调信号明确，CXO板块拐点可期。",
        shortTermStrategy: "超短线关注CRO/医疗服务延续性（药明康德/百花医药/凯莱英），AI应用热门标的（传智教育/利欧股份/天娱数科）波段操作，关注F5G/光通信板块的扩散机会。严格止损不追高，沪指3800点附近震荡整理。",
        positionAdvice: "激进型6-7成（CRO+AI应用龙头），稳健型4-5成（AI业绩龙头+红利防御），保守型2-3成（仅核心资产+半年报超预期）",
        riskWarning: "以上内容仅整合公开市场数据，不构成投资建议。半导体板块昨日大跌后短期波动加大，财报季临近个股波动可能加剧。银行/保险/白酒等防御板块轮动加速需注意节奏。股市有风险，投资需谨慎。",
        sources: [
            { name: "同花顺·金融早报", url: "https://news.10jqka.com.cn/20260804/c678639524.shtml" },
            { name: "证券时报·A股开盘", url: "https://www.stcn.com/article/detail/4056855.html" },
            { name: "腾讯财经·盘面分析", url: "https://new.qq.com/rain/a/20260804A04ZYS00" },
            { name: "东方财富·板块行情", url: "https://quote.eastmoney.com/center/boardlist.html" },
            { name: "富途牛牛·美股热度", url: "https://www.futunn.com/quote/us/most-active-stocks" }
        ]
    }
};
