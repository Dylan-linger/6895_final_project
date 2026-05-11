# AI Society Simulator 中期汇报：PPT大纲与讲稿

## 汇报定位

这次中期汇报建议不要把项目包装成“还没做多少”，而是诚实地讲成：

- 核心系统已经打通，已经能跑出完整 simulation、日志和可视化结果
- 当前阶段的重点已经从“能不能做出来”转向“结果是否可信、场景是否丰富、评估是否充分”
- 所以汇报主线应当是：问题定义 -> 系统设计 -> 当前完成度 -> 一次代表性结果 -> 局限与下一步

这样既符合“中期汇报”的要求，也不会因为项目已经比较完整而显得别扭。

---

## 建议页数

建议做 **8 页正文 + 1 页备用页**。

如果老师时间很紧，可以压成 7 页；如果你想更稳一点，保留 8 页最合适。

---

## Slide 1. Title

### 标题
**AI Society Simulator**  
一个基于多智能体交互的 AI 时代社会转型模拟器

### 副标题
- Midterm Progress Report
- 你的名字 / 课程名 / 日期

### 页面内容建议
- 左侧一句问题定义：
  - “当 AI 快速提升生产力时，社会会走向失业、失衡，还是合作与再分配？”
- 右侧放项目 dashboard 截图
  - [outputs/dashboard_20260428_194833.png](D:/6895FINAL/ai-society-sim-main/ai-society-sim-main/outputs/dashboard_20260428_194833.png)

### 讲稿
大家好，我今天汇报的项目是 AI Society Simulator。这个项目关注的不是单个 agent 的任务完成能力，而是一个更宏观的问题：当 AI 持续提升生产力时，不同社会角色会如何互动，制度会如何调整，社会最终会走向冲突、失衡，还是一种更高合作的状态。现在这个系统已经可以完成多年度模拟，并自动生成日志、状态历史和可视化结果。

---

## Slide 2. Motivation & Research Question

### 标题
**为什么要做这个项目？**

### 页面内容建议
- 用 3 个 bullet 即可
- 建议内容：
  - 现有很多 AI 应用只关注个体任务，不关注社会层面的反馈循环
  - AI 影响的不只是效率，还包括就业、分配、信任和治理
  - 我想做一个可配置、可运行、可观察的社会情景探索工具

- 页面底部放一句 research question：
  - **Which variables determine whether AI-driven productivity becomes shared prosperity or concentrated power?**

### 讲稿
这个项目的出发点是，我想研究 AI 带来的不是单点效率提升，而是整个社会系统的联动变化。比如生产力提升之后，收益到底会流向谁；就业、贫富差距、社会信任会不会恶化；制度设计能不能把技术进步转化为更稳定的社会秩序。我的核心研究问题是：到底哪些变量会决定 AI 带来的是共享繁荣，还是权力和财富的进一步集中。

---

## Slide 3. System Overview

### 标题
**系统如何工作？**

### 页面内容建议
建议用一张很简单的流程图，分成 4 层：

1. Agents
2. Forum Discussion
3. World State Update
4. Visualization & Outputs

可以对应讲这几个文件：
- [src/ai_society_sim/agents.py](D:/6895FINAL/ai-society-sim-main/ai-society-sim-main/src/ai_society_sim/agents.py)
- [src/ai_society_sim/simulation.py](D:/6895FINAL/ai-society-sim-main/ai-society-sim-main/src/ai_society_sim/simulation.py)
- [src/ai_society_sim/world.py](D:/6895FINAL/ai-society-sim-main/ai-society-sim-main/src/ai_society_sim/world.py)
- [src/ai_society_sim/viz.py](D:/6895FINAL/ai-society-sim-main/ai-society-sim-main/src/ai_society_sim/viz.py)

### 页面文案建议
- Agents with heterogeneous goals
- Discussion and deal proposals
- Endogenous technology growth
- LLM-based social state transition
- Automatic JSON logs and dashboard generation

### 讲稿
系统整体可以理解成一个年度循环。首先，我们初始化一组异质 agent，包括工人、企业家、立法者、工会、学者、投资人和记者。然后每一年里，AI 能力和总生产力先根据系统内部参数做一次内生增长；接着 agent 会围绕当前世界状态进行讨论、提出联盟或交易、再各自做出决策；最后系统把这些行动汇总给 LLM，让它更新社会层面的状态，比如失业率、贫富差距、信任、合作指数和政策叙事。所有结果会自动保存成 JSON，并生成 dashboard。

---

## Slide 4. Agent & World Design

### 标题
**项目的核心设计：角色异质性 + 世界状态演化**

### 页面内容建议
这页建议左右结构：

- 左边：角色类型
  - Worker
  - Employer
  - Politician
  - Union
  - Academic
  - Investor
  - Journalist

- 右边：关键 state variables
  - unemployment_rate
  - wealth_inequality
  - social_trust
  - worker_power
  - corporate_power
  - innovation_rate
  - cooperation_index
  - total_productivity
  - ai_capability

### 可强调的设计点
- agent 不是同质的聊天机器人，而是有 role / personality / goal
- state update 不是纯规则写死，也不是纯自由生成，而是“技术增长规则 + 社会后果由 LLM 更新”的 hybrid 设计

### 讲稿
这个项目的关键不是让一群 agent 随便对话，而是让他们带着不同身份、目标和利益进入同一个社会环境。比如工人更关心工作稳定和再培训，企业家更关注竞争力和增长，记者则会推动透明和问责。与此同时，世界状态也不是完全由 prompt 编故事，而是采用 hybrid 机制：技术能力和生产力增长由显式公式驱动，而社会后果，比如信任、合作、分配和政策叙事，则由 LLM 根据上下文做更新。这样做的目的是在可控性和开放性之间取得平衡。

---

## Slide 5. Current Progress

### 标题
**目前已经完成了什么？**

### 页面内容建议
建议分成两列：Completed / In Progress

#### Completed
- CLI simulation pipeline 跑通
- YAML config 支持实验参数配置
- 多角色 agent discussion / decision / deal proposal
- 世界状态年度更新
- 自动输出 history / forum / summary / dashboard
- OpenAI-compatible backend 已接通

#### In Progress / Next
- 多次运行统计与结果稳定性分析
- prompt sensitivity / parameter sensitivity
- 更强的 evaluation framework
- 可交互 Web UI

### 可引用文件
- [src/ai_society_sim/cli.py](D:/6895FINAL/ai-society-sim-main/ai-society-sim-main/src/ai_society_sim/cli.py)
- [configs/default.yaml](D:/6895FINAL/ai-society-sim-main/ai-society-sim-main/configs/default.yaml)

### 讲稿
从完成度上看，这个项目的核心闭环已经跑通了。现在我已经有命令行入口、配置文件、agent 交互流程、世界状态更新逻辑，以及自动输出的日志和可视化结果。换句话说，它不是一个停留在概念图层面的设计，而是已经能运行出完整社会轨迹的 prototype。当前还没有完全做完的部分，主要不是功能缺失，而是 evaluation 还不够系统，比如多次运行的统计比较、参数敏感性分析，以及未来更适合展示的交互式界面。

---

## Slide 6. One Representative Run

### 标题
**一次代表性模拟结果**

### 页面内容建议
这一页以结果图为主，少写字。直接放 dashboard 图，再配右侧 4 条 takeaway。

建议 takeaway：
- AI capability: **0.10 -> 0.903**
- Total productivity: **1.00 -> 2.45**
- Wealth inequality: **0.38 -> 0.085**
- Social trust: **0.55 -> 0.974**

也可以再补一条：
- Unemployment rate: **0.06 -> 0.011**

### 数据来源
- [outputs/history_20260428_194832.json](D:/6895FINAL/ai-society-sim-main/ai-society-sim-main/outputs/history_20260428_194832.json)
- [outputs/dashboard_20260428_194833.png](D:/6895FINAL/ai-society-sim-main/ai-society-sim-main/outputs/dashboard_20260428_194833.png)

### 讲稿
这是目前跑出来的一次代表性结果。从这次运行看，AI 能力从 0.10 上升到 0.903，总生产力从 1.0 增长到 2.45；与此同时，失业率下降，贫富差距下降，社会信任、合作指数、社会流动性和工人权力都持续上升。也就是说，这次轨迹呈现的是一个相对乐观的制度适应路径：技术进步并没有自动导致失衡，而是在较强治理与合作机制下转化成了更广泛共享的收益。

---

## Slide 7. Why Did the Simulation Become Optimistic?

### 标题
**为什么这次结果偏乐观？**

### 页面内容建议
不要只说“因为模型这么写了”，而是总结成 3 个机制：

1. 技术增长与合作、创新、治理能力正反馈
2. 论坛讨论中，高频出现“透明度、审计、再培训、工人治理”等叙事
3. 世界状态更新允许“良性适应”发生，而不是预设必然失控

### 证据建议
可以放 2 到 3 条 forum 日志摘录，来自：
- [outputs/forum_20260428_194832.json](D:/6895FINAL/ai-society-sim-main/ai-society-sim-main/outputs/forum_20260428_194832.json)

比如可摘录成短句：
- “Upskilling incentives are crucial...”
- “We need enforceable standards, not slogans.”
- “Worker-owned AI apprenticeship cooperative...”

### 讲稿
这次结果之所以偏乐观，我觉得不是偶然，也不是简单的 prompt 偏置，而是来自三个机制。第一，技术增长本身被建模为受到创新、合作、政府有效性和社会信任共同推动，所以它不是一个孤立变量。第二，agent 讨论里经常形成围绕透明、审计、再培训、利润分享和工人参与的联盟叙事，这会进一步影响世界状态更新。第三，我在 world update 的 prompt 里明确允许良性适应路径出现，而不是把 AI 冲击预设成失控灾难。所以它本质上是一个“制度与协作是否能跟上技术扩散”的模拟，而不是单向悲观叙事。

---

## Slide 8. Limitations and Risks

### 标题
**当前局限：结果有意思，但还不能当预测**

### 页面内容建议
建议列 4 条，保持诚实：

- Single-run result is not robust evidence
- Strong dependence on prompt and model behavior
- Social update still relies heavily on LLM judgment
- No Monte Carlo / baseline comparison yet

### 可以补一句
This is a scenario exploration framework, not a forecasting model.

### 讲稿
我想非常明确地说，这个系统现在更适合被理解为一个 scenario exploration framework，而不是现实预测模型。当前最大的局限有几个：第一，我现在展示的是单次运行结果，还不能说明稳定性；第二，系统对 prompt 和底层模型行为仍然比较敏感；第三，社会状态更新虽然已经被约束在结构化字段里，但本质上仍然依赖 LLM 的判断；第四，我还没有做充分的多次运行对照实验。所以目前最有价值的，不是它给出了“未来会怎样”的答案，而是它提供了一个可以系统比较不同制度路径的实验平台。

---

## Slide 9. Next Steps

### 标题
**下一步：从可运行原型走向可评估研究工具**

### 页面内容建议
建议分三类：

#### Evaluation
- Monte Carlo repeated runs
- parameter sensitivity
- compare optimistic / pessimistic / mixed policy settings

#### Modeling
- richer social network structure
- longer-term memory
- more explicit policy intervention variables

#### Productization
- interactive web UI
- comparative scenario report generation

### 讲稿
下一步我会把重点放在评估和可比较性上，而不是继续无节制地堆功能。最重要的是做多次运行统计、参数敏感性分析，以及不同政策配置之间的场景对比。模型层面，我希望加入更真实的社会网络结构和更长的 agent memory，让互动不只是年度短期反馈。展示层面，则可以做成一个交互式 UI，让用户选择参数、运行情景并比较不同社会路径。

---

## 备用页（Q&A）

### 标题
**Backup: Output Artifacts**

### 页面内容建议
列出输出文件，表示系统确实可复现：

- [outputs/history_20260428_194832.json](D:/6895FINAL/ai-society-sim-main/ai-society-sim-main/outputs/history_20260428_194832.json)
- [outputs/forum_20260428_194832.json](D:/6895FINAL/ai-society-sim-main/ai-society-sim-main/outputs/forum_20260428_194832.json)
- [outputs/summaries_20260428_194832.json](D:/6895FINAL/ai-society-sim-main/ai-society-sim-main/outputs/summaries_20260428_194832.json)
- [outputs/dashboard_20260428_194833.png](D:/6895FINAL/ai-society-sim-main/ai-society-sim-main/outputs/dashboard_20260428_194833.png)

### 讲稿
如果大家对 reproducibility 感兴趣，这个系统每次运行都会自动导出世界状态历史、论坛对话日志、年度总结和 dashboard 图，所以后续也很适合做对比实验和结果复盘。

---

## 一句话汇报主线

如果你想把全场讲得更顺，可以一直抓住这一句：

**我做的不是一个回答单个问题的 agent，而是一个探索“AI 如何重塑社会分配与治理”的多智能体模拟系统。**

---

## 参考其他同学 PPT 后，建议你借鉴的节奏

从你给我的几个参考 PDF 看，中期汇报普遍采用下面这个结构：

1. Project goal / motivation
2. System or architecture
3. Current progress
4. Demo / example result
5. Limitations / next steps

你这个项目最适合沿用这个节奏，但要避免两件事：

- 不要把 PPT 做成纯技术文件列表
- 不要把单次结果讲成“已经证明了某种社会规律”

最好的姿态是：

**系统已经比较完整，当前价值在于展示一个可运行、可扩展、可比较的社会模拟框架。**

---

## 如果你只有 5 分钟

建议每页时间分配：

- Slide 1: 20s
- Slide 2: 35s
- Slide 3: 45s
- Slide 4: 45s
- Slide 5: 40s
- Slide 6: 60s
- Slide 7: 45s
- Slide 8: 35s
- Slide 9: 35s

---

## 如果你想让老师更容易买账

汇报时可以主动说这两句：

1. “我现在展示的是一个 representative run，不把它当作预测结论，而是当作情景探索样本。”
2. “中期之后我最优先补的是 evaluation，而不是继续堆功能。”

这两句会让你的项目显得更像研究型 work，而不是只做了个好看的 demo。
