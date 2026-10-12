import subprocess
import json
import os
from bs4 import BeautifulSoup

def main():
    url = "https://cuet.nta.nic.in/cuetug-2026-syllabus/"
    res = subprocess.run(["curl", "-s", "-L", url], capture_output=True, text=True, check=True)
    html = res.stdout
    
    soup = BeautifulSoup(html, "html.parser")
    table = soup.find("table")
    
    items = []
    if table:
        for tr in table.find_all("tr"):
            th_cells = [th.get_text(strip=True) for th in tr.find_all("th")]
            td_cells = [td.get_text(strip=True) for td in tr.find_all("td")]
            links = [a.get("href") for a in tr.find_all("a")]
            
            if td_cells:
                # Format: [SrNo, Code, SubjectName, Type]
                sr_no = td_cells[0] if len(td_cells) > 0 else ""
                code = td_cells[1] if len(td_cells) > 1 else ""
                name = td_cells[2] if len(td_cells) > 2 else ""
                category = td_cells[3] if len(td_cells) > 3 else ""
                pdf_url = links[0] if links else ""
                
                items.append({
                    "srNo": sr_no,
                    "code": code,
                    "name": name,
                    "category": category,
                    "pdfUrl": pdf_url
                })
                
    os.makedirs("reports", exist_ok=True)
    out_path = "reports/cuet_ug_official_syllabus.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(items, f, indent=2, ensure_ascii=False)
        
    print(f"Extracted {len(items)} subjects to {out_path}")
    for item in items:
        print(f"[{item['category']}] Code {item['code']}: {item['name']} -> {item['pdfUrl']}")

if __name__ == "__main__":
    main()
