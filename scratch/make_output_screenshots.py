import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "final_assets"
OUT.mkdir(parents=True, exist_ok=True)

FONT_PATHS = [
    Path("C:/Windows/Fonts/consola.ttf"),
    Path("C:/Windows/Fonts/CascadiaMono.ttf"),
    Path("C:/Windows/Fonts/lucon.ttf"),
]
FONT_PATH = next((p for p in FONT_PATHS if p.exists()), None)


def load_font(size: int):
    if FONT_PATH:
        return ImageFont.truetype(str(FONT_PATH), size)
    return ImageFont.load_default()


def clip_json(path: Path, count: int, keys=None):
    data = json.loads(path.read_text(encoding="utf-8"))
    rows = data[:count]
    if keys:
        rows = [{k: row.get(k) for k in keys if k in row} for row in rows]
    return json.dumps(rows, ensure_ascii=False, indent=2)


def wrap_line(draw, text, font, max_px):
    words = text.split(" ")
    if len(words) <= 1:
        return [text]
    lines = []
    cur = ""
    for word in words:
        cand = word if not cur else cur + " " + word
        if draw.textlength(cand, font=font) <= max_px:
            cur = cand
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def color_for(line: str):
    stripped = line.strip()
    if stripped.startswith('"year"') or stripped.startswith('"role"') or stripped.startswith('"author"'):
        return "#7EF29D"
    if stripped.startswith('"message"') or stripped.startswith('"summary"'):
        return "#9BD7FF"
    if ":" in stripped and stripped.split(":", 1)[0].strip().startswith('"'):
        return "#7EF29D"
    if any(ch in stripped for ch in "{}[]"):
        return "#FF7AC6"
    return "#E6EDF3"


def render_code_image(text: str, title: str, output: Path, width=2200, height=940):
    img = Image.new("RGB", (width, height), "#0D1117")
    draw = ImageDraw.Draw(img)
    title_font = load_font(36)
    code_font = load_font(25)
    small_font = load_font(20)

    draw.rectangle([0, 0, width, 72], fill="#161B22")
    draw.ellipse([28, 25, 46, 43], fill="#FF5F57")
    draw.ellipse([58, 25, 76, 43], fill="#FFBD2E")
    draw.ellipse([88, 25, 106, 43], fill="#28C840")
    draw.text((130, 19), title, font=title_font, fill="#E6EDF3")
    draw.text((width - 260, 24), "outputs/", font=small_font, fill="#8B949E")

    y = 98
    line_h = 34
    max_px = width - 96
    for raw in text.splitlines():
        chunks = wrap_line(draw, raw, code_font, max_px)
        for idx, chunk in enumerate(chunks):
            if y > height - 42:
                draw.text((36, y), "...", font=code_font, fill="#8B949E")
                img.save(output)
                return
            draw.text((36, y), chunk, font=code_font, fill=color_for(raw))
            y += line_h
        if not chunks:
            y += line_h

    img.save(output)


forum_text = clip_json(
    ROOT / "outputs" / "forum_20260428_194832.json",
    8,
    ["year", "role", "author", "message", "reply_to"],
)
history_text = clip_json(
    ROOT / "outputs" / "history_20260428_194832.json",
    2,
    [
        "year",
        "ai_capability",
        "total_productivity",
        "unemployment_rate",
        "wealth_inequality",
        "average_living_standard",
        "social_trust",
        "worker_power",
        "cooperation_index",
        "public_mood",
        "dominant_narrative",
        "current_policy",
    ],
)
summaries_text = clip_json(
    ROOT / "outputs" / "summaries_20260428_194832.json",
    7,
    ["year", "summary"],
)

render_code_image(forum_text, "forum_20260428_194832.json", OUT / "screenshot_forum.png")
render_code_image(history_text, "history_20260428_194832.json", OUT / "screenshot_history.png")
render_code_image(summaries_text, "summaries_20260428_194832.json", OUT / "screenshot_summaries.png")

print(OUT)
