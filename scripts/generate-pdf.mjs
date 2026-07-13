import { chromium } from "@playwright/test";

import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.resolve(__dirname, "..", "docs");
const htmlFile = path.join(docsDir, "presentacion-hackaton.html");
const outputPdf = path.join(docsDir, "presentacion-miproceso.pdf");

async function main() {
  if (!fs.existsSync(htmlFile)) {
    console.error("HTML not found:", htmlFile);
    process.exit(1);
  }

  let html = fs.readFileSync(htmlFile, "utf-8");

  // Inject CSS to stack all slides vertically for PDF
  const printCss = `
<style>
  .slide-container { position: relative !important; opacity: 1 !important; transform: none !important; height: auto !important; min-height: 100vh !important; page-break-after: always; }
  .slide-container .animate-in { opacity: 1 !important; transform: none !important; }
  .orb, .particle-canvas, .scanline-overlay, .slide-counter, .nav-bar, .dots-nav { display: none !important; }
</style>`;
  html = html.replace("</head>", printCss + "</head>");

  const tmpFile = htmlFile + ".print.tmp.html";
  fs.writeFileSync(tmpFile, html, "utf-8");

  const browser = await chromium.launch({ headless: true, channel: undefined });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  await page.goto("file:///" + tmpFile.replace(/\\/g, "/"), { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  await page.pdf({
    path: outputPdf,
    format: "A4",
    printBackground: true,
    margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
  });

  await browser.close();
  fs.unlinkSync(tmpFile);

  const stats = fs.statSync(outputPdf);
  console.log("PDF generated:", outputPdf, `(${(stats.size / 1024).toFixed(0)} KB)`);
}

main().catch(err => { console.error("Failed:", err); process.exit(1); });
