import { chromium } from "@playwright/test";
import { PDFDocument } from "pdf-lib";
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

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
  });

  await page.goto("file:///" + htmlFile.replace(/\\/g, "/"), {
    waitUntil: "networkidle",
  });

  // Let initial render complete
  await page.waitForTimeout(500);

  const totalSlides = await page.evaluate(() => {
    return document.querySelectorAll(".slide-container").length;
  });
  console.log(`Found ${totalSlides} slides`);

  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < totalSlides; i++) {
    // Activate slide i and hide chrome
    const actualHeight = await page.evaluate((n) => {
      const slides = document.querySelectorAll(".slide-container");
      slides.forEach((s, idx) => {
        s.classList.toggle("active", idx === n);
        s.style.opacity = idx === n ? "1" : "0";
        s.style.pointerEvents = idx === n ? "all" : "none";
        s.style.overflow = "visible";
      });

      // Reveal animated elements
      const anims = slides[n].querySelectorAll(".animate-in");
      anims.forEach((a) => {
        a.style.opacity = "1";
        a.style.transform = "none";
      });

      // Hide navigation UI
      const nav = document.querySelector(".nav");
      if (nav) nav.style.display = "none";
      const dots = document.querySelector(".dots-nav");
      if (dots) dots.style.display = "none";

      // Return the actual content height of this slide
      return slides[n].scrollHeight;
    }, i);

    await page.waitForTimeout(300);

    // Set viewport to match the slide content exactly (no clipping, no extra space)
    const vpHeight = Math.max(actualHeight, 720);
    await page.setViewportSize({ width: 1280, height: vpHeight });

    // Let layout settle
    await page.waitForTimeout(100);

    // Capture full viewport
    const screenshot = await page.screenshot({ type: "png" });

    // Create a PDF page matching the screenshot's aspect ratio
    // Cap width at 800pt, scale height proportionally
    const pngImage = await pdfDoc.embedPng(screenshot);
    const imgW = pngImage.width;
    const imgH = pngImage.height;
    const maxPageW = 800;
    const scale = imgW > maxPageW ? maxPageW / imgW : 1;
    const pageW = imgW * scale;
    const pageH = imgH * scale;

    const newPage = pdfDoc.addPage([pageW, pageH]);
    newPage.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: pageW,
      height: pageH,
    });

    console.log(`  Slide ${i + 1}/${totalSlides} — ${imgW}x${imgH}px → ${pageW.toFixed(0)}x${pageH.toFixed(0)}pt`);
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPdf, pdfBytes);

  await browser.close();

  const stats = fs.statSync(outputPdf);
  const pageCount = pdfDoc.getPageCount();
  console.log("PDF generated:", outputPdf, `(${(stats.size / 1024).toFixed(0)} KB, ${pageCount} pages)`);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
