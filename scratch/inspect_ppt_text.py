import zipfile
import pathlib
import xml.etree.ElementTree as ET

path = pathlib.Path(r"C:/Users/admin/Desktop/AI-Society-Simulator (3).pptx")
print("exists", path.exists(), "size", path.stat().st_size if path.exists() else None)

with zipfile.ZipFile(path) as z:
    names = z.namelist()
    slides = [n for n in names if n.startswith("ppt/slides/slide") and n.endswith(".xml")]
    slides.sort(key=lambda n: int(n.rsplit("slide", 1)[1].split(".xml")[0]))
    print("slides", len(slides))
    ns = {"a": "http://schemas.openxmlformats.org/drawingml/2006/main"}
    for n in slides:
        root = ET.fromstring(z.read(n))
        texts = [t.text or "" for t in root.findall(".//a:t", ns)]
        print("---", n)
        print(" | ".join(texts)[:1600])
