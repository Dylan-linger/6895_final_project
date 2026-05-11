const fs = require("fs");
const path = require("path");
const PptxGenJS = require("C:/Users/admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pptxgenjs/dist/pptxgen.cjs.js");

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "OpenAI";
pptx.subject = "AI Society Simulator Final Presentation";
pptx.title = "AI Society Simulator - Final Presentation";
pptx.lang = "zh-CN";
pptx.theme = {
  headFontFace: "Microsoft YaHei UI",
  bodyFontFace: "Microsoft YaHei UI",
  lang: "zh-CN",
};
pptx.defineLayout({ name: "LAYOUT_WIDE", width: 13.333, height: 7.5 });

const ROOT = path.resolve(__dirname, "..");
const outDir = path.join(ROOT, "output");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "ai_society_sim_final_report_agent_focused.pptx");
const dashboardPath = path.join(ROOT, "outputs", "dashboard_20260428_194833.png");
const history = JSON.parse(fs.readFileSync(path.join(ROOT, "outputs", "history_20260428_194832.json"), "utf8"));

const first = history[0];
const last = history[history.length - 1];
const delta = (key) => `${fmt(first[key])} -> ${fmt(last[key])}`;

function fmt(v) {
  if (typeof v !== "number") return String(v);
  if (v >= 1.2) return v.toFixed(2);
  return v.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
}

const C = {
  bg: "F7F4EE",
  paper: "FFFDF8",
  ink: "1E2328",
  muted: "667085",
  hair: "D9D3C7",
  blue: "2563EB",
  cyan: "0891B2",
  green: "13A36F",
  orange: "F97316",
  purple: "7C3AED",
  red: "DC3E31",
  yellow: "F3B61F",
  charcoal: "202A33",
  white: "FFFFFF",
};

function addTitle(slide, title, kicker, page) {
  slide.addText(kicker || "AI Society Simulator", {
    x: 0.55, y: 0.34, w: 3.6, h: 0.24,
    fontFace: "Microsoft YaHei UI", fontSize: 8.5, bold: true, color: C.blue,
    charSpace: 0.4, margin: 0,
  });
  slide.addText(title, {
    x: 0.55, y: 0.68, w: 8.3, h: 0.48,
    fontFace: "Microsoft YaHei UI", fontSize: 21, bold: true, color: C.ink,
    margin: 0,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.55, y: 1.28, w: 12.15, h: 0,
    line: { color: C.hair, pt: 1 },
  });
  if (page) addFooter(slide, page);
}

function addFooter(slide, page) {
  slide.addText("EECS 6895 Final Project | Agent-focused report", {
    x: 0.55, y: 7.08, w: 4.2, h: 0.18,
    fontSize: 7.5, color: "8A8174", margin: 0,
  });
  slide.addText(String(page).padStart(2, "0"), {
    x: 12.18, y: 7.05, w: 0.5, h: 0.18,
    fontSize: 8.5, color: "8A8174", margin: 0, align: "right",
  });
}

function addOpenBullet(slide, text, x, y, w, color = C.ink, size = 16) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x, y: y + 0.08, w: 0.08, h: 0.08,
    line: { color, pt: 0 }, fill: { color },
  });
  slide.addText(text, {
    x: x + 0.18, y, w, h: 0.42,
    fontSize: size, color: C.ink, margin: 0, fit: "shrink",
    breakLine: false,
  });
}

function addMetric(slide, x, y, value, label, color) {
  slide.addText(value, {
    x, y, w: 2.3, h: 0.44,
    fontFace: "Microsoft YaHei UI", fontSize: 21, bold: true, color,
    margin: 0, breakLine: false, fit: "shrink",
  });
  slide.addText(label, {
    x, y: y + 0.47, w: 2.28, h: 0.26,
    fontSize: 8.8, color: C.muted, margin: 0, breakLine: false, fit: "shrink",
  });
}

function addPill(slide, text, x, y, w, color, fill) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h: 0.32,
    rectRadius: 0.06,
    line: { color, pt: 0.7 },
    fill: { color: fill || "FFFFFF", transparency: 0 },
  });
  slide.addText(text, {
    x: x + 0.08, y: y + 0.08, w: w - 0.16, h: 0.12,
    fontSize: 7.8, bold: true, color, align: "center", margin: 0, fit: "shrink",
  });
}

function addNotes(slide, lines) {
  if (typeof slide.addNotes === "function") {
    slide.addNotes(lines);
  }
}

function arrow(slide, x, y, w, h, color = C.hair, pt = 1.3) {
  slide.addShape(pptx.ShapeType.line, {
    x, y, w, h,
    line: { color, pt, beginArrowType: "none", endArrowType: "triangle" },
  });
}

function box(slide, x, y, w, h, title, body, color, fill = C.white) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    rectRadius: 0.08,
    line: { color, pt: 1.1 },
    fill: { color: fill },
  });
  slide.addText(title, {
    x: x + 0.14, y: y + 0.14, w: w - 0.28, h: 0.22,
    fontSize: 10.5, bold: true, color, margin: 0, fit: "shrink",
  });
  slide.addText(body, {
    x: x + 0.14, y: y + 0.48, w: w - 0.28, h: h - 0.58,
    fontSize: 8.8, color: C.ink, margin: 0.02, breakLine: false, fit: "shrink",
    valign: "mid",
  });
}

function chip(slide, x, y, label, color) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w: 1.38, h: 0.42,
    rectRadius: 0.08,
    line: { color, pt: 0.8 },
    fill: { color: C.white },
  });
  slide.addText(label, {
    x: x + 0.05, y: y + 0.13, w: 1.28, h: 0.1,
    fontSize: 8.2, bold: true, color, align: "center", margin: 0, fit: "shrink",
  });
}

// 1. Cover
{
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.333, h: 7.5,
    line: { color: C.bg, pt: 0 }, fill: { color: C.bg },
  });
  slide.addText("AI Society\nSimulator", {
    x: 0.62, y: 0.86, w: 5.3, h: 1.6,
    fontFace: "Microsoft YaHei UI", fontSize: 32, bold: true, color: C.ink,
    margin: 0, breakLine: false,
  });
  slide.addText("以多智能体社会互动探索 AI 扩散下的治理、劳动与分配路径", {
    x: 0.65, y: 2.78, w: 5.3, h: 0.65,
    fontSize: 17, color: C.charcoal, margin: 0, breakLine: false, fit: "shrink",
  });
  slide.addText("期末项目汇报 | 8 min以内", {
    x: 0.66, y: 6.45, w: 3.0, h: 0.24,
    fontSize: 10, color: C.muted, margin: 0,
  });
  slide.addShape(pptx.ShapeType.arc, {
    x: 7.0, y: 0.52, w: 4.8, h: 4.8,
    line: { color: C.blue, pt: 1.5, transparency: 10 },
    adjustPoint: 0.28,
  });
  const nodes = [
    ["工人", 8.0, 1.15, C.green], ["企业", 10.28, 1.45, C.orange],
    ["政府", 11.1, 3.45, C.blue], ["媒体", 9.55, 5.05, C.red],
    ["学者", 7.25, 4.25, C.purple],
  ];
  nodes.forEach(([name, x, y, color]) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x, y, w: 0.9, h: 0.9,
      line: { color, pt: 1.2 }, fill: { color: C.white },
    });
    slide.addText(name, {
      x, y: y + 0.32, w: 0.9, h: 0.12,
      fontSize: 9.5, bold: true, color, align: "center", margin: 0,
    });
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 8.75, y: 2.55, w: 2.15, h: 2.15,
    line: { color: C.ink, pt: 1.0 }, fill: { color: C.paper },
  });
  slide.addText("社会状态\n反馈回路", {
    x: 9.02, y: 3.25, w: 1.62, h: 0.38,
    fontSize: 15, bold: true, color: C.ink, align: "center", margin: 0,
  });
  addNotes(slide, [
    "开场控制在45秒：项目不是预测未来，而是搭一个可运行的多智能体社会沙盒。",
    "强调今天重点：agent 如何发言、协商、行动，并推动世界状态变化。",
  ]);
}

// 2. Motivation
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "为什么要用 Agent 模拟 AI 社会转型？", "Motivation", 2);
  slide.addText("核心问题", {
    x: 0.66, y: 1.68, w: 1.4, h: 0.22, fontSize: 10, bold: true, color: C.blue, margin: 0,
  });
  slide.addText("AI 提升生产力之后，真正决定社会走向的不是单个模型能力，而是不同利益主体如何互动。", {
    x: 0.64, y: 2.0, w: 6.1, h: 1.0,
    fontSize: 25, bold: true, color: C.ink, margin: 0, breakLine: false, fit: "shrink",
  });
  addOpenBullet(slide, "工人关注岗位、技能、分配与议价权。", 0.68, 3.48, 5.0, C.green, 14);
  addOpenBullet(slide, "企业关注效率、投资回报与监管成本。", 0.68, 4.05, 5.0, C.orange, 14);
  addOpenBullet(slide, "政府、媒体、工会、学者共同塑造信任与制度。", 0.68, 4.62, 5.8, C.blue, 14);

  slide.addShape(pptx.ShapeType.line, {
    x: 7.2, y: 1.73, w: 0, h: 4.65, line: { color: C.hair, pt: 1 },
  });
  slide.addText("Agent 视角带来的变化", {
    x: 7.65, y: 1.76, w: 3.2, h: 0.28, fontSize: 14, bold: true, color: C.ink, margin: 0,
  });
  const rows = [
    ["静态参数", "动态行为者"],
    ["外生剧情", "论坛讨论 + 交易提案"],
    ["单向更新", "行动影响状态，状态再影响行动"],
  ];
  rows.forEach((r, i) => {
    const y = 2.35 + i * 1.0;
    slide.addText(r[0], { x: 7.68, y, w: 1.8, h: 0.22, fontSize: 13, color: C.muted, margin: 0 });
    arrow(slide, 9.25, y + 0.12, 0.62, 0, C.blue, 1.2);
    slide.addText(r[1], { x: 10.02, y, w: 2.2, h: 0.22, fontSize: 13, bold: true, color: C.ink, margin: 0 });
  });
  addNotes(slide, [
    "约60秒：讲为什么 agent 是核心。AI 社会影响不是只看技术曲线，还要看各角色如何博弈和协作。",
    "把项目定位成情景探索工具，不是现实预测器。",
  ]);
}

// 3. Architecture diagram
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "系统结构图：Agent 驱动的年度反馈循环", "System Architecture", 3);

  box(slide, 0.65, 2.12, 2.1, 1.1, "配置层", "years / rounds\n初始世界状态\n技术增长参数", C.purple, "FBF7FF");
  box(slide, 3.15, 1.62, 2.25, 2.1, "Agent 层", "15 个异质角色\nrole / personality / goal\n短期 memory", C.green, "F1FCF6");
  box(slide, 6.0, 1.62, 2.25, 2.1, "论坛层", "公开发言\nreply_to 互动\n跨角色提案", C.orange, "FFF7ED");
  box(slide, 8.85, 1.62, 2.25, 2.1, "世界模型", "技术内生增长\n社会后果更新\n状态字段裁剪", C.blue, "F3F7FF");
  box(slide, 5.45, 4.7, 2.85, 1.05, "LLM 后端", "生成发言、行动、提案、年度总结", C.red, "FFF5F3");
  box(slide, 10.95, 4.45, 1.75, 1.35, "输出层", "history.json\nforum.json\nsummary.json\ndashboard.png", C.cyan, "F0FDFA");

  arrow(slide, 2.83, 2.66, 0.25, 0, C.hair, 1.2);
  arrow(slide, 5.47, 2.66, 0.45, 0, C.hair, 1.2);
  arrow(slide, 8.32, 2.66, 0.45, 0, C.hair, 1.2);
  arrow(slide, 11.07, 3.06, 0.68, 1.18, C.hair, 1.2);
  arrow(slide, 9.88, 3.82, -5.5, 1.05, C.blue, 1.2);
  arrow(slide, 4.08, 3.77, 2.3, 0.83, C.red, 1.0);
  arrow(slide, 6.82, 4.58, 0.0, -0.74, C.red, 1.0);
  arrow(slide, 7.45, 4.58, 2.15, -0.73, C.red, 1.0);
  addPill(slide, "state -> context", 3.8, 4.25, 1.35, C.blue, "FFFFFF");
  addPill(slide, "actions -> update", 8.4, 4.15, 1.5, C.blue, "FFFFFF");
  addPill(slide, "artifacts", 10.72, 6.03, 1.25, C.cyan, "FFFFFF");

  slide.addText("一年内的关键顺序：技术变化先进入新闻，Agent 基于最新状态讨论、提案、行动，随后世界状态被更新并记录。", {
    x: 0.72, y: 6.42, w: 10.8, h: 0.32,
    fontSize: 12.5, color: C.ink, margin: 0, fit: "shrink",
  });
  addNotes(slide, [
    "约70秒：重点讲这张系统图。强调 agent 层是中心，世界状态不是孤立公式更新，而是接收 agent 行动和提案。",
    "指出输出文件对应用户截图：论坛日志、历史状态、年度摘要、仪表盘。",
  ]);
}

// 4. Agent design
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "Agent 设计：异质角色 + 目标驱动行为", "Agent Layer", 4);
  slide.addText("每个 agent 不是简单标签，而是由四个要素定义：", {
    x: 0.72, y: 1.62, w: 5.8, h: 0.28, fontSize: 14, color: C.ink, margin: 0,
  });
  const parts = [
    ["Role", "社会身份", C.blue],
    ["Personality", "行为倾向", C.purple],
    ["Goal", "利益目标", C.green],
    ["Memory", "短期记忆", C.orange],
  ];
  parts.forEach((p, i) => {
    const x = 0.8 + i * 2.0;
    slide.addText(p[0], { x, y: 2.2, w: 1.5, h: 0.3, fontSize: 17, bold: true, color: p[2], align: "center", margin: 0 });
    slide.addShape(pptx.ShapeType.line, { x: x + 0.18, y: 2.62, w: 1.1, h: 0, line: { color: p[2], pt: 2 } });
    slide.addText(p[1], { x, y: 2.8, w: 1.5, h: 0.24, fontSize: 11, color: C.ink, align: "center", margin: 0 });
  });

  slide.addText("默认角色覆盖 7 类社会力量", {
    x: 0.78, y: 4.1, w: 3.2, h: 0.24, fontSize: 13, bold: true, color: C.ink, margin: 0,
  });
  const chips = [
    ["Workers", C.green], ["Employers", C.orange], ["Politicians", C.blue],
    ["Union", C.red], ["Academic", C.purple], ["Investor", C.yellow], ["Journalist", C.cyan],
  ];
  chips.forEach((c, i) => chip(slide, 0.8 + (i % 4) * 1.62, 4.6 + Math.floor(i / 4) * 0.62, c[0], c[1]));

  slide.addShape(pptx.ShapeType.line, { x: 8.15, y: 1.75, w: 0, h: 4.55, line: { color: C.hair, pt: 1 } });
  slide.addText("Agent 每年执行三类动作", {
    x: 8.62, y: 1.72, w: 3.4, h: 0.28, fontSize: 14, bold: true, color: C.ink, margin: 0,
  });
  box(slide, 8.65, 2.3, 3.2, 0.75, "Discuss", "基于世界状态和论坛上下文发言", C.green, "FFFFFF");
  box(slide, 8.65, 3.35, 3.2, 0.75, "Propose Deal", "向其他类别 agent 提出互利交易", C.orange, "FFFFFF");
  box(slide, 8.65, 4.4, 3.2, 0.75, "Decide", "形成年度战略行动并写入记忆", C.blue, "FFFFFF");
  addNotes(slide, [
    "约60秒：介绍 agent 的定义和行为函数。可以点名几个角色：程序员、护士、企业主、参议员、工会、记者。",
    "强调目标差异让讨论不是同质化文本生成，而是多方利益的互动。",
  ]);
}

// 5. Yearly loop
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "运行流程：Agent 如何改变世界状态？", "Simulation Loop", 5);
  const steps = [
    ["1", "技术更新", "AI capability 与 productivity 内生增长", C.blue],
    ["2", "公共新闻", "技术变化进入论坛上下文", C.cyan],
    ["3", "多轮讨论", "随机抽取不同类别 speaker", C.green],
    ["4", "跨角色提案", "形成合作、谈判或利益交换", C.orange],
    ["5", "年度决策", "每个 agent 输出具体行动", C.purple],
    ["6", "世界更新", "LLM + 规则约束更新社会指标", C.red],
  ];
  steps.forEach((s, i) => {
    const x = 0.78 + (i % 3) * 4.08;
    const y = 1.82 + Math.floor(i / 3) * 2.25;
    slide.addShape(pptx.ShapeType.ellipse, { x, y, w: 0.48, h: 0.48, line: { color: s[3], pt: 1 }, fill: { color: C.white } });
    slide.addText(s[0], { x, y: y + 0.14, w: 0.48, h: 0.1, fontSize: 11, bold: true, color: s[3], align: "center", margin: 0 });
    slide.addText(s[1], { x: x + 0.68, y: y - 0.02, w: 2.2, h: 0.26, fontSize: 15, bold: true, color: C.ink, margin: 0 });
    slide.addText(s[2], { x: x + 0.68, y: y + 0.42, w: 2.75, h: 0.42, fontSize: 10.5, color: C.muted, margin: 0, fit: "shrink" });
    if (i !== 2 && i !== 5) arrow(slide, x + 3.18, y + 0.23, 0.55, 0, C.hair, 1.1);
  });
  arrow(slide, 11.68, 2.05, 0, 2.15, C.hair, 1.1);
  arrow(slide, 8.28, 4.29, -3.62, 0, C.hair, 1.1);
  arrow(slide, 4.24, 4.29, -3.1, 0, C.hair, 1.1);
  slide.addText("这个设计让“讨论文本”不只是展示内容，而是成为下一年状态变化的输入证据。", {
    x: 0.82, y: 6.4, w: 11.0, h: 0.32, fontSize: 13, bold: true, color: C.ink, margin: 0,
  });
  addNotes(slide, [
    "约60秒：从代码流程讲一年怎么跑。这里要说清楚，agent 发言、提案、行动都会作为 world update 的输入。",
    "这就是项目的 agent 核心，而不仅是画几条社会指标曲线。",
  ]);
}

// 6. Outputs
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "输出结果：从 Agent 日志到宏观仪表盘", "Output Artifacts", 6);
  box(slide, 0.75, 1.75, 3.25, 1.0, "forum.json", "谁在何年发言、回复谁、提出什么合作方案", C.orange, "FFF7ED");
  box(slide, 0.75, 3.05, 3.25, 1.0, "history.json", "每年所有数值状态与制度叙事字段", C.blue, "F3F7FF");
  box(slide, 0.75, 4.35, 3.25, 1.0, "summaries.json", "每年 historian-style 自然语言总结", C.green, "F1FCF6");
  box(slide, 0.75, 5.65, 3.25, 0.8, "dashboard.png", "12 个核心指标的趋势可视化", C.purple, "FBF7FF");
  slide.addImage({ path: dashboardPath, x: 4.55, y: 1.58, w: 7.85, h: 5.88 });
  addNotes(slide, [
    "约55秒：对应你给的几张图。说明输出不是只有可视化，还有可追溯的 agent 论坛日志、状态历史和年度总结。",
    "右侧 dashboard 用于结果分析，左侧强调数据链路完整。",
  ]);
}

// 7. Result analysis
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "结果分析：本次运行呈现“协同适应”路径", "Result Analysis", 7);
  addMetric(slide, 0.78, 1.72, delta("ai_capability"), "AI 能力持续上升", C.blue);
  addMetric(slide, 3.42, 1.72, delta("total_productivity"), "总生产力扩大", C.green);
  addMetric(slide, 6.12, 1.72, delta("wealth_inequality"), "财富不平等下降", C.red);
  addMetric(slide, 8.85, 1.72, delta("cooperation_index"), "合作指数上升", C.orange);

  slide.addShape(pptx.ShapeType.line, { x: 0.78, y: 2.78, w: 11.3, h: 0, line: { color: C.hair, pt: 1 } });
  slide.addText("为什么会走向乐观？", {
    x: 0.8, y: 3.18, w: 3.2, h: 0.28, fontSize: 16, bold: true, color: C.ink, margin: 0,
  });
  addOpenBullet(slide, "技术增长由创新、企业投资、合作、政府有效性与社会信任共同推动。", 0.82, 3.78, 6.8, C.blue, 13);
  addOpenBullet(slide, "Agent 讨论反复收敛到 upskilling、透明审计、工人所有权与收益分享。", 0.82, 4.36, 7.1, C.green, 13);
  addOpenBullet(slide, "世界更新允许合作失败，但本轮中制度提案持续强化信任与参与治理。", 0.82, 4.94, 7.1, C.orange, 13);

  slide.addShape(pptx.ShapeType.line, { x: 8.55, y: 3.15, w: 0, h: 2.9, line: { color: C.hair, pt: 1 } });
  slide.addText("代表性 agent 信号", { x: 9.0, y: 3.22, w: 2.8, h: 0.22, fontSize: 13, bold: true, color: C.ink, margin: 0 });
  slide.addText("记者要求公开仪表盘\n工会推动工人所有权\n企业接受透明结果披露\n政府把激励绑定到审计结果", {
    x: 9.0, y: 3.75, w: 2.9, h: 1.7,
    fontSize: 13, color: C.ink, margin: 0.02, breakLine: false, fit: "shrink",
  });
  addNotes(slide, [
    "约70秒：讲结果的主趋势和解释。要避免说这是预测，只说这是一次参数和 prompt 下的情景轨迹。",
    "重点是 agent 的互动让制度从 AI dividend、co-op、audit dashboard 一步步强化。",
  ]);
}

// 8. Limitations and next steps
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "局限与下一步：让 Agent 社会更可检验", "Limitations & Next Steps", 8);
  slide.addText("当前局限", { x: 0.75, y: 1.72, w: 2.0, h: 0.28, fontSize: 15, bold: true, color: C.red, margin: 0 });
  addOpenBullet(slide, "单次运行不能代表稳健结论。", 0.78, 2.28, 4.8, C.red, 14);
  addOpenBullet(slide, "世界更新仍依赖 LLM 判断，缺少外部校准。", 0.78, 2.88, 5.4, C.red, 14);
  addOpenBullet(slide, "Agent 网络结构和长期记忆还比较简化。", 0.78, 3.48, 5.2, C.red, 14);

  slide.addShape(pptx.ShapeType.line, { x: 6.55, y: 1.72, w: 0, h: 4.1, line: { color: C.hair, pt: 1 } });
  slide.addText("下一步", { x: 7.05, y: 1.72, w: 2.0, h: 0.28, fontSize: 15, bold: true, color: C.green, margin: 0 });
  addOpenBullet(slide, "Monte Carlo 多次运行与敏感性分析。", 7.08, 2.28, 4.8, C.green, 14);
  addOpenBullet(slide, "加入 agent 社交网络、长期记忆与声誉机制。", 7.08, 2.88, 5.0, C.green, 14);
  addOpenBullet(slide, "做乐观 / 悲观 / 高监管 / 低监管场景对比。", 7.08, 3.48, 5.0, C.green, 14);
  addOpenBullet(slide, "开发交互式 Web UI，方便调参和查看 agent 轨迹。", 7.08, 4.08, 5.0, C.green, 14);

  slide.addText("Takeaway", { x: 0.78, y: 5.95, w: 1.4, h: 0.22, fontSize: 10, bold: true, color: C.blue, margin: 0 });
  slide.addText("本项目已经完成从多智能体互动、世界状态演化到可视化输出的闭环；后续重点是让这个 agent 社会从“可运行”走向“可比较、可解释、可验证”。", {
    x: 0.78, y: 6.28, w: 11.2, h: 0.42,
    fontSize: 14.2, bold: true, color: C.ink, margin: 0, fit: "shrink",
  });
  addNotes(slide, [
    "约60秒：总结贡献和局限。最后一句落在 agent 社会模拟闭环已经跑通，下一步是稳健性和可解释性。",
  ]);
}

pptx.writeFile({ fileName: outPath });
console.log(outPath);
