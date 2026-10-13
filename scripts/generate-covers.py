import os
import pymupdf  # PyMuPDF

pdf_dir = "public/brochures"
covers = [
    ("ergonomic-vacuum-lifters.pdf", "ergonomic-vacuum-lifters-cover.jpg"),
    ("product-overview.pdf", "product-overview-cover.jpg"),
    ("area-gripping.pdf", "area-gripping-cover.jpg"),
    ("vacuum-automation.pdf", "vacuum-automation-cover.jpg")
]

for pdf_name, cover_name in covers:
    pdf_path = os.path.join(pdf_dir, pdf_name)
    cover_path = os.path.join(pdf_dir, cover_name)
    if os.path.exists(pdf_path):
        print(f"Processing {pdf_name}...")
        doc = pymupdf.open(pdf_path)
        page = doc.load_page(0)  # first page
        pix = page.get_pixmap(dpi=130)
        pix.save(cover_path)
        doc.close()
        print(f"Saved {cover_name} - {os.path.getsize(cover_path)/1024:.1f} KB")
    else:
        print(f"Missing {pdf_path}")

print("All covers generated successfully.")
