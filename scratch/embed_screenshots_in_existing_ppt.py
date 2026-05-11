import shutil
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SRC = Path("C:/Users/admin/Downloads/AI-Society-Simulator (1).pptx")
OUT = ROOT / "output" / "AI-Society-Simulator-agent-screenshots-clean.pptx"
ASSET_DIR = ROOT / "output" / "final_assets"

SCREENSHOTS = [
    ("screenshot_forum.png", 5.78, 1.66, 3.10, 1.32),
    ("screenshot_history.png", 9.12, 1.66, 3.10, 1.32),
    ("screenshot_summaries.png", 5.78, 3.30, 6.44, 2.75),
]

EMU = 914400
NS = {
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "rel": "http://schemas.openxmlformats.org/package/2006/relationships",
}
for prefix, uri in NS.items():
    if prefix != "rel":
        ET.register_namespace(prefix, uri)


def q(ns, tag):
    return f"{{{NS[ns]}}}{tag}"


def next_rel_id(root):
    nums = []
    for rel in root.findall(q("rel", "Relationship")):
        rid = rel.get("Id", "")
        if rid.startswith("rId"):
            try:
                nums.append(int(rid[3:]))
            except ValueError:
                pass
    return f"rId{max(nums or [0]) + 1}"


def next_shape_id(root):
    ids = []
    for c_nv_pr in root.findall(".//" + q("p", "cNvPr")):
        try:
            ids.append(int(c_nv_pr.get("id", "0")))
        except ValueError:
            pass
    return max(ids or [0]) + 1


def add_picture(sp_tree, rel_id, shape_id, name, x, y, w, h):
    pic = ET.Element(q("p", "pic"))
    nv_pic_pr = ET.SubElement(pic, q("p", "nvPicPr"))
    ET.SubElement(nv_pic_pr, q("p", "cNvPr"), {"id": str(shape_id), "name": name})
    ET.SubElement(nv_pic_pr, q("p", "cNvPicPr"))
    ET.SubElement(nv_pic_pr, q("p", "nvPr"))

    blip_fill = ET.SubElement(pic, q("p", "blipFill"))
    ET.SubElement(blip_fill, q("a", "blip"), {q("r", "embed"): rel_id})
    stretch = ET.SubElement(blip_fill, q("a", "stretch"))
    ET.SubElement(stretch, q("a", "fillRect"))

    sp_pr = ET.SubElement(pic, q("p", "spPr"))
    xfrm = ET.SubElement(sp_pr, q("a", "xfrm"))
    ET.SubElement(xfrm, q("a", "off"), {"x": str(round(x * EMU)), "y": str(round(y * EMU))})
    ET.SubElement(xfrm, q("a", "ext"), {"cx": str(round(w * EMU)), "cy": str(round(h * EMU))})
    prst = ET.SubElement(sp_pr, q("a", "prstGeom"), {"prst": "roundRect"})
    ET.SubElement(prst, q("a", "avLst"))
    ln = ET.SubElement(sp_pr, q("a", "ln"), {"w": "9525"})
    solid = ET.SubElement(ln, q("a", "solidFill"))
    ET.SubElement(solid, q("a", "srgbClr"), {"val": "1F2937"})

    sp_tree.append(pic)


def ensure_png_default(content_types_root):
    for default in content_types_root.findall("{http://schemas.openxmlformats.org/package/2006/content-types}Default"):
        if default.get("Extension") == "png":
            return
    ET.SubElement(
        content_types_root,
        "{http://schemas.openxmlformats.org/package/2006/content-types}Default",
        {"Extension": "png", "ContentType": "image/png"},
    )


def main():
    if not SRC.exists():
        raise FileNotFoundError(SRC)

    with zipfile.ZipFile(SRC, "r") as zin:
        names = set(zin.namelist())
        slide_path = "ppt/slides/slide6.xml"
        rel_path = "ppt/slides/_rels/slide6.xml.rels"
        ct_path = "[Content_Types].xml"

        slide_root = ET.fromstring(zin.read(slide_path))
        rel_root = ET.fromstring(zin.read(rel_path))
        ct_root = ET.fromstring(zin.read(ct_path))
        ensure_png_default(ct_root)

        sp_tree = slide_root.find(".//" + q("p", "spTree"))
        if sp_tree is None:
            raise RuntimeError("slide6 spTree not found")

        next_id = next_shape_id(slide_root)
        media_count = len([n for n in names if n.startswith("ppt/media/") and not n.endswith("/")])

        new_media = {}
        for idx, (file_name, x, y, w, h) in enumerate(SCREENSHOTS, start=1):
            src_img = ASSET_DIR / file_name
            if not src_img.exists():
                raise FileNotFoundError(src_img)
            with Image.open(src_img) as im:
                if im.format != "PNG":
                    raise RuntimeError(f"{src_img} is not PNG")

            media_count += 1
            media_name = f"ppt/media/final_screenshot_{idx}.png"
            new_media[media_name] = src_img.read_bytes()

            rel_id = next_rel_id(rel_root)
            ET.SubElement(
                rel_root,
                q("rel", "Relationship"),
                {
                    "Id": rel_id,
                    "Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
                    "Target": f"../media/final_screenshot_{idx}.png",
                },
            )
            add_picture(sp_tree, rel_id, next_id, f"Raw output screenshot {idx}", x, y, w, h)
            next_id += 1

        replacements = {
            slide_path: ET.tostring(slide_root, encoding="utf-8", xml_declaration=True),
            rel_path: ET.tostring(rel_root, encoding="utf-8", xml_declaration=True),
            ct_path: ET.tostring(ct_root, encoding="utf-8", xml_declaration=True),
            **new_media,
        }

        with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as zout:
            for item in zin.infolist():
                if item.filename in replacements:
                    zout.writestr(item, replacements.pop(item.filename))
                else:
                    zout.writestr(item, zin.read(item.filename))
            for filename, data in replacements.items():
                zout.writestr(filename, data)

    print(OUT)


if __name__ == "__main__":
    main()
