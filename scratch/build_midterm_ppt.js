const path = require("path");
const PptxGenJS = require("C:/Users/admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pptxgenjs/dist/pptxgen.cjs.js");

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "OpenAI";
pptx.subject = "AI Society Simulator Midterm Progress Report";
pptx.title = "AI Society Simulator - Midterm Progress Report";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US",
};

const outPath = path.resolve("output", "ai_society_sim_midterm_report.pptx");
const dashboardPath = path.resolve("outputs", "dashboard_20260428_194833.png");

const C = {
  navy: "1E2A44",
  blue: "3E63DD",
  teal: "0F9D8A",
  gold: "D9901A",
  red: "D04A3A",
  ink: "1C2430",
  muted: "5F6B7A",
  light: "F5F7FB",
  line: "D8DFEA",
  white: "FFFFFF",
  green: "2E8B57",
};

function addHeader(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.7, y: 0.45, w: 8.6, h: 0.55,
    fontFace: "Aptos Display", fontSize: 26, bold: true, color: C.ink,
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.7, y: 0.98, w: 9.6, h: 0.35,
      fontFace: "Aptos", fontSize: 11, color: C.muted, margin: 0,
    });
  }
  slide.addShape(pptx.ShapeType.line, {
    x: 0.7, y: 1.28, w: 11.9, h: 0,
    line: { color: C.blue, pt: 1.5 }
  });
}

function addBulletList(slide, items, x, y, w, fontSize = 18, color = C.ink, gap = 0.38) {
  items.forEach((item, idx) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x, y: y + idx * gap + 0.08, w: 0.08, h: 0.08,
      line: { color: C.blue, pt: 0.5 }, fill: { color: C.blue }
    });
    slide.addText(item, {
      x: x + 0.18, y: y + idx * gap, w, h: 0.26,
      fontFace: "Aptos", fontSize, color, margin: 0
    });
  });
}

function addStat(slide, x, y, label, value, color) {
  slide.addText(value, {
    x, y, w: 2.1, h: 0.5,
    fontFace: "Aptos Display", fontSize: 26, bold: true, color,
    margin: 0, align: "left"
  });
  slide.addText(label, {
    x, y: y + 0.5, w: 2.2, h: 0.3,
    fontFace: "Aptos", fontSize: 11, color: C.muted,
    margin: 0, align: "left"
  });
}

function addFooter(slide, pageNum) {
  slide.addText(`AI Society Simulator | Midterm Report`, {
    x: 0.7, y: 7.05, w: 3.0, h: 0.2,
    fontSize: 9, color: "7A8696", margin: 0
  });
  slide.addText(String(pageNum), {
    x: 12.1, y: 7.02, w: 0.35, h: 0.2,
    fontSize: 9, color: "7A8696", margin: 0, align: "right"
  });
}

// Slide 1
{
  const slide = pptx.addSlide();
  slide.background = { color: C.light };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.33, h: 7.5,
    line: { color: C.light, pt: 0 }, fill: { color: C.light }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.33, h: 0.25,
    line: { color: C.navy, pt: 0 }, fill: { color: C.navy }
  });

  slide.addText("AI Society\nSimulator", {
    x: 0.75, y: 0.8, w: 4.8, h: 1.7,
    fontFace: "Aptos Display", fontSize: 25, bold: true, color: C.navy,
    margin: 0, breakLine: false
  });
  slide.addText("Midterm Progress Report", {
    x: 0.78, y: 2.55, w: 3.7, h: 0.35,
    fontFace: "Aptos", fontSize: 18, color: C.blue, margin: 0
  });
  slide.addText("A multi-agent simulation for exploring how AI reshapes productivity, labor, and social governance.", {
    x: 0.78, y: 3.15, w: 4.2, h: 1.1,
    fontFace: "Aptos", fontSize: 18, color: C.ink, margin: 0, valign: "mid"
  });
  slide.addText("EECS 6895 Final Project\nApril 2026", {
    x: 0.78, y: 6.25, w: 2.5, h: 0.5,
    fontFace: "Aptos", fontSize: 11, color: C.muted, margin: 0
  });

  slide.addImage({
    path: dashboardPath,
    x: 5.55, y: 0.8, w: 7.1, h: 5.95
  });
}

// Slide 2
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "Motivation / Problem", "Why simulate society-level AI transition rather than only individual AI tasks?");

  slide.addText("Core question", {
    x: 0.75, y: 1.75, w: 2.2, h: 0.3,
    fontSize: 12, bold: true, color: C.blue, margin: 0
  });
  slide.addText("When AI rapidly increases productivity, what determines whether society moves toward disruption, concentration of power, or coordinated adaptation?", {
    x: 0.75, y: 2.1, w: 5.5, h: 1.3,
    fontFace: "Aptos Display", fontSize: 24, bold: true, color: C.ink, margin: 0
  });

  addBulletList(slide, [
    "AI affects not only efficiency, but also employment, inequality, trust, and governance.",
    "Most AI systems optimize single tasks; they do not model multi-actor social feedback loops.",
    "We need a configurable simulation to explore different institutional responses to AI growth."
  ], 0.78, 4.1, 5.2, 18, C.ink, 0.68);

  slide.addShape(pptx.ShapeType.rect, {
    x: 8.2, y: 1.8, w: 4.2, h: 4.4,
    line: { color: C.line, pt: 1 }, fill: { color: "F7FAFF" }, radius: 0.05
  });
  slide.addText("Target output", {
    x: 8.55, y: 2.15, w: 2.0, h: 0.3,
    fontSize: 13, bold: true, color: C.blue, margin: 0
  });
  addBulletList(slide, [
    "A runnable multi-agent prototype",
    "Structured logs of discussion and yearly state transitions",
    "Scenario-level evidence for how governance choices shape outcomes"
  ], 8.55, 2.65, 3.2, 16, C.ink, 0.72);
  addFooter(slide, 2);
}

// Slide 3
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "System Overview", "High-level yearly simulation loop");

  const steps = [
    ["1", "Initialize\nagents + state"],
    ["2", "Technology\nupdate"],
    ["3", "Forum discussion\nand deal proposals"],
    ["4", "Agent decisions"],
    ["5", "World update\n+ outputs"],
  ];

  steps.forEach((s, idx) => {
    const x = 0.9 + idx * 2.45;
    slide.addShape(pptx.ShapeType.ellipse, {
      x, y: 2.25, w: 0.65, h: 0.65,
      line: { color: C.blue, pt: 1.2 }, fill: { color: "EAF0FF" }
    });
    slide.addText(s[0], {
      x, y: 2.37, w: 0.65, h: 0.2,
      align: "center", fontSize: 18, bold: true, color: C.blue, margin: 0
    });
    slide.addText(s[1], {
      x: x - 0.25, y: 3.05, w: 1.35, h: 0.8,
      align: "center", fontSize: 16, color: C.ink, bold: true, margin: 0
    });
    if (idx < steps.length - 1) {
      slide.addShape(pptx.ShapeType.line, {
        x: x + 0.72, y: 2.57, w: 1.65, h: 0,
        line: { color: C.line, pt: 1.5, beginArrowType: "none", endArrowType: "triangle" }
      });
    }
  });

  slide.addText("Implementation modules", {
    x: 0.8, y: 5.0, w: 2.2, h: 0.25,
    fontSize: 13, bold: true, color: C.blue, margin: 0
  });
  addBulletList(slide, [
    "agents.py: role definitions, discussion, decisions, deal proposals",
    "simulation.py: yearly orchestration loop",
    "world.py: endogenous technology growth + social state update",
    "viz.py: dashboard generation and output artifacts"
  ], 0.8, 5.35, 9.6, 15, C.ink, 0.44);
  addFooter(slide, 3);
}

// Slide 4
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "Current Progress", "The prototype already runs end-to-end from config to visualized output");

  slide.addText("Completed", {
    x: 0.8, y: 1.8, w: 1.8, h: 0.3,
    fontSize: 14, bold: true, color: C.green, margin: 0
  });
  addBulletList(slide, [
    "CLI simulation pipeline",
    "Configurable YAML settings",
    "15 heterogeneous agents with role / goal / memory",
    "Yearly discussion, decisions, and alliance proposals",
    "Structured outputs: history, forum logs, yearly summaries, dashboard"
  ], 0.8, 2.2, 5.0, 17, C.ink, 0.58);

  slide.addText("Still improving", {
    x: 7.0, y: 1.8, w: 2.2, h: 0.3,
    fontSize: 14, bold: true, color: C.gold, margin: 0
  });
  addBulletList(slide, [
    "Repeated-run evaluation",
    "Parameter sensitivity analysis",
    "More diverse scenarios and policy settings",
    "Interactive UI for scenario comparison"
  ], 7.0, 2.2, 4.8, 17, C.ink, 0.62);

  slide.addText("Status summary", {
    x: 0.8, y: 5.75, w: 1.8, h: 0.3,
    fontSize: 13, bold: true, color: C.blue, margin: 0
  });
  slide.addText("The project is no longer just a concept sketch. The main midterm milestone has been reached: we have a runnable social simulation prototype with inspectable outputs.", {
    x: 0.8, y: 6.1, w: 11.2, h: 0.6,
    fontSize: 16, color: C.ink, margin: 0
  });
  addFooter(slide, 4);
}

// Slide 5
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "Representative Output", "One example run from the current system");
  slide.addImage({
    path: dashboardPath,
    x: 0.75, y: 1.6, w: 8.2, h: 4.7
  });

  addStat(slide, 9.45, 1.9, "AI capability", "0.10 -> 0.903", C.blue);
  addStat(slide, 9.45, 2.85, "Total productivity", "1.00 -> 2.45", C.teal);
  addStat(slide, 9.45, 3.8, "Wealth inequality", "0.38 -> 0.085", C.red);
  addStat(slide, 9.45, 4.75, "Social trust", "0.55 -> 0.974", C.green);

  slide.addText("This run shows a relatively optimistic adaptation path: productivity rises while unemployment and inequality fall, and cooperation / trust continue to increase.", {
    x: 0.78, y: 6.52, w: 11.7, h: 0.34,
    fontSize: 15, color: C.ink, margin: 0
  });
  addFooter(slide, 5);
}

// Slide 6
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "Interpretation", "Why did this run become optimistic?");

  addBulletList(slide, [
    "Technology growth is linked to innovation, cooperation, trust, and government effectiveness.",
    "Agent discussions repeatedly surface themes like upskilling, transparency, auditing, and shared governance.",
    "The world-update prompt allows both coordination failures and successful adaptation, rather than assuming collapse."
  ], 0.82, 1.9, 6.0, 18, C.ink, 0.9);

  slide.addText("Selected discussion signals", {
    x: 7.3, y: 1.88, w: 2.5, h: 0.25,
    fontSize: 13, bold: true, color: C.blue, margin: 0
  });
  const quotes = [
    "\"Upskilling incentives are crucial so humans remain central.\"",
    "\"We need enforceable standards, not slogans.\"",
    "\"Launch a worker-owned AI apprenticeship cooperative.\""
  ];
  quotes.forEach((q, idx) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: 7.3, y: 2.3 + idx * 1.15, w: 4.65, h: 0.78,
      line: { color: C.line, pt: 1 }, fill: { color: "F8FAFD" }, radius: 0.04
    });
    slide.addText(q, {
      x: 7.52, y: 2.5 + idx * 1.15, w: 4.2, h: 0.32,
      fontSize: 14, color: C.ink, italic: true, margin: 0
    });
  });
  addFooter(slide, 6);
}

// Slide 7
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "Limitations & Next Steps", "Useful as scenario exploration, not yet a forecasting model");

  slide.addText("Current limitations", {
    x: 0.8, y: 1.9, w: 2.2, h: 0.3,
    fontSize: 14, bold: true, color: C.red, margin: 0
  });
  addBulletList(slide, [
    "This is still a single-run example, not robust statistical evidence.",
    "Results depend on prompt design and base model behavior.",
    "Social state updates still rely heavily on LLM judgment."
  ], 0.8, 2.3, 5.2, 17, C.ink, 0.7);

  slide.addText("Next steps", {
    x: 7.0, y: 1.9, w: 2.0, h: 0.3,
    fontSize: 14, bold: true, color: C.green, margin: 0
  });
  addBulletList(slide, [
    "Monte Carlo repeated runs",
    "Parameter sensitivity analysis",
    "Compare optimistic / pessimistic policy settings",
    "Build an interactive UI for scenario exploration"
  ], 7.0, 2.3, 4.8, 17, C.ink, 0.62);

  slide.addText("Main takeaway", {
    x: 0.8, y: 5.95, w: 2.0, h: 0.25,
    fontSize: 13, bold: true, color: C.blue, margin: 0
  });
  slide.addText("The system already demonstrates a complete multi-agent simulation workflow. The next stage is to make the results more comparable, explainable, and empirically grounded.", {
    x: 0.8, y: 6.28, w: 11.2, h: 0.55,
    fontSize: 16, color: C.ink, margin: 0
  });
  addFooter(slide, 7);
}

pptx.writeFile({ fileName: outPath });
